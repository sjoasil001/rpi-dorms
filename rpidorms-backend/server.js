// server.js (ESM)
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';

/* ---------------- Boot log ---------------- */
console.log('Loaded env check:', {
  DB_URL: process.env.DATABASE_URL ? 'postgresql://***' : undefined,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  SMTP_HOST: process.env.SMTP_HOST,
  CWD: process.cwd(),
});

const app = express();

/* ---------------- CORS (FIRST) ---------------- */
const envAllowed = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const defaultAllowed = [
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const allowList = envAllowed.length ? envAllowed : defaultAllowed;

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // curl / same-origin
    if (allowList.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: false,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// 204 for any preflight after CORS set headers
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// JSON body parser
app.use(express.json());

/* ---------------- Prisma (Postgres) ---------------- */
const prisma = new PrismaClient();

/* ---------------- Email Transporter ---------------- */
// Disabled in dev if DEV_DISABLE_EMAIL=true
const transporter =
  !/^true$/i.test(process.env.DEV_DISABLE_EMAIL || '')
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || 'false') === 'true',
        auth:
          process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
      })
    : null;

/* ---------------- Rate Limiter (skip preflight) ---------------- */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
});
app.use(['/auth/','/api/submissions'], limiter);

/* ---------------- Helpers ---------------- */
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const hashCode = (code) =>
  crypto.createHash('sha256').update(code).digest('hex');

const expiresIn = (minutes = 10) =>
  new Date(Date.now() + minutes * 60 * 1000);

/* ---------------- Health ---------------- */
app.get('/health', async (_req, res) => {
  try {
    const [result] = await prisma.$queryRaw`SELECT 1 as ok`;
    res.json({ ok: true, db: result?.ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

/* ---------------- Auth: email code ---------------- */
app.post('/auth/send-code', async (req, res) => {
  try {
    const email = String(req.body.email || '').toLowerCase().trim();
    if (!email.endsWith('@rpi.edu')) {
      return res.status(400).json({ error: 'Please use a valid RPI email address.' });
    }

    const code = generateCode();
    const codeHash = hashCode(code);
    const expiry = expiresIn(10);

    // upsert verification row
    await prisma.emailVerification.upsert({
      where: { email },
      update: { codeHash, expiresAt: expiry, attempts: 0, createdAt: new Date() },
      create: { email, codeHash, expiresAt: expiry, attempts: 0, createdAt: new Date() },
    });

    if (transporter) {
      await transporter.sendMail({
        from: process.env.FROM || 'RPI Dorms <no-reply@example.com>',
        to: email,
        subject: 'Your RPI Dorms verification code',
        text: `Your verification code is: ${code}\nIt expires in 10 minutes.`,
      });
    } else {
      console.log(`[DEV] Verification code for ${email}: ${code}`);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('send-code error:', err);
    res.status(500).json({ error: 'Failed to send code. Please try again.' });
  }
});

app.post('/auth/verify', async (req, res) => {
  try {
    const email = String(req.body.email || '').toLowerCase().trim();
    const code = String(req.body.code || '').trim();
    if (!email || !code) return res.status(400).json({ error: 'Missing email or code.' });

    const rec = await prisma.emailVerification.findUnique({ where: { email } });
    if (!rec) return res.status(400).json({ error: 'No code requested for this email.' });

    if (rec.attempts >= 5) return res.status(429).json({ error: 'Too many attempts. Request a new code.' });
    if (new Date(rec.expiresAt) < new Date()) return res.status(400).json({ error: 'Code expired. Request a new code.' });

    const isMatch = hashCode(code) === rec.codeHash;
    if (!isMatch) {
      await prisma.emailVerification.update({
        where: { email },
        data: { attempts: { increment: 1 } }
      });
      return res.status(400).json({ error: 'Incorrect verification code.' });
    }

    await prisma.verifiedEmail.upsert({
      where: { email },
      update: { verifiedAt: new Date() },
      create: { email, verifiedAt: new Date() },
    });
    await prisma.emailVerification.delete({ where: { email } });

    res.json({ ok: true });
  } catch (err) {
    console.error('verify error:', err);
    res.status(500).json({ error: 'Verification failed. Try again.' });
  }
});

/* ---------------- Uploads & Submissions ---------------- */
// Multer (in-memory)
const upload = multer({ storage: multer.memoryStorage() });

// S3 client (optional; if you aren’t ready, see fallback route below)
const s3 = new S3Client({
  region: process.env.S3_REGION,
  ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true } : {})
});
const BUCKET = process.env.S3_BUCKET;
const PUBLIC_BASE = process.env.S3_PUBLIC_BASE; // e.g., https://<bucket>.s3.amazonaws.com

// POST /api/submissions — multipart/form-data (photo + fields)
app.post('/api/submissions', upload.single('photo'), async (req, res) => {
  try {
    const { dormSlug, classYear, rating, review } = req.body;
    let { amenityNames } = req.body; // can be JSON string or array

    if (!dormSlug || !classYear || !rating || !req.file) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Parse amenities
    if (typeof amenityNames === 'string') {
      try { amenityNames = JSON.parse(amenityNames); } catch { amenityNames = [amenityNames]; }
    }
    if (!Array.isArray(amenityNames)) amenityNames = [];

    // File type check
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type.' });
    }

    // Upload to S3
    const ts = Date.now();
    const safe = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${ts}_${safe}`;

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read' // or use bucket policy/CDN instead
    }));
    const photoUrl = `${PUBLIC_BASE}/${encodeURIComponent(key)}`;

    // Lookups
    const dorm = await prisma.dorm.findUnique({ where: { slug: dormSlug } });
    if (!dorm) return res.status(400).json({ error: 'Unknown dorm' });

    const amenRows = amenityNames.length
      ? await prisma.amenity.findMany({ where: { name: { in: amenityNames } } })
      : [];

    // Create submission
    const created = await prisma.submission.create({
      data: {
        dormId: dorm.id,
        classYear: Number(classYear),
        rating: Number(rating),
        review: review || null,
        photoUrl,
        amenities: { create: amenRows.map(a => ({ amenityId: a.id })) }
      }
    });

    return res.status(201).json({ ok: true, id: created.id });
  } catch (err) {
    console.error('POST /api/submissions error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/* ---------------- Read APIs (fetch later) ---------------- */

// GET /api/v1/submissions?dorm=slug&minRating=4&year=2028&page=1&pageSize=20
app.get('/api/v1/submissions', async (req, res) => {
  try {
    const { dorm, minRating, maxRating, year, page = '1', pageSize = '20', since } = req.query;
    const take = Math.min(parseInt(pageSize, 10) || 20, 100);
    const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * take;

    const where = {
      ...(dorm ? { dorm: { slug: String(dorm) } } : {}),
      ...(year ? { classYear: Number(year) } : {}),
      ...(minRating || maxRating
        ? { rating: {
            gte: minRating ? Number(minRating) : undefined,
            lte: maxRating ? Number(maxRating) : undefined,
          } }
        : {}),
      ...(since ? { updatedAt: { gt: new Date(String(since)) } } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip, take,
        include: { dorm: true, amenities: { include: { amenity: true } } }
      }),
      prisma.submission.count({ where })
    ]);

    res.set('Cache-Control', 'public, max-age=60');
    res.json({ items, page: Number(page), pageSize: take, total });
  } catch (err) {
    console.error('GET /api/v1/submissions error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/v1/insights — aggregates for Insights page
app.get('/api/v1/insights', async (_req, res) => {
  try {
    const byDorm = await prisma.$queryRaw`
      SELECT d.name AS dorm_name,
             COUNT(*)::int AS submissions,
             ROUND(AVG(s.rating)::numeric, 2) AS avg_rating
      FROM "Submission" s
      JOIN "Dorm" d ON d.id = s."dormId"
      GROUP BY d.name
      ORDER BY avg_rating DESC;
    `;

    const amenityPopularity = await prisma.$queryRaw`
      SELECT a.name AS amenity, COUNT(*)::int AS count
      FROM "SubmissionAmenity" sa
      JOIN "Amenity" a ON a.id = sa."amenityId"
      GROUP BY a.name
      ORDER BY count DESC;
    `;

    res.set('Cache-Control', 'public, max-age=300');
    res.json({ byDorm, amenityPopularity });
  } catch (err) {
    console.error('GET /api/v1/insights error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* ---------------- Start ---------------- */
const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);