import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { prisma } from "./db.js";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";



dotenv.config();

const app = express();

// --- security & parsing
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",              // vite dev
      "https://your-production-domain.com", // replace when deployed
    ],
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// --- basic rate limit: 10 requests / 10 minutes per IP (only for contact)
app.use(
  "/api/contact",
  rateLimit({ windowMs: 10 * 60 * 1000, max: 10, standardHeaders: true })
);

// --- mail transport (Gmail SMTP via app password)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 465),
  secure: process.env.MAIL_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

// --- health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- contact endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { from_name, reply_to, message, phone } = req.body || {};

    // honeypot: if "phone" is filled, it's likely a bot
    if (phone) return res.status(200).json({ ok: true });

    // validate
    if (
      !from_name ||
      !reply_to ||
      !message ||
      typeof from_name !== "string" ||
      typeof reply_to !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({ ok: false, error: "Invalid input." });
    }

    const name = from_name.trim().slice(0, 200);
    const email = reply_to.trim().slice(0, 200);
    const body = message.trim().slice(0, 5000);

    await transporter.sendMail({
      from: `"RPI Dorms Contact" <${process.env.MAIL_USERNAME}>`,
      to: process.env.MAIL_TO,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${body}\n`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p>${escapeHtml(body).replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: email,
    });

    return res.status(200).json({ ok: true, message: "Sent" });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ ok: false, error: "Mail send failed." });
  }
});

function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --- simple in-memory store for codes (email -> { code, expiresAt })
const codes = new Map();

// helper: 6-digit code
function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// POST /auth/send-code  { email }
app.post("/auth/send-code", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || typeof email !== "string") {
      return res.status(400).json({ ok: false, error: "Email required." });
    }
    const rpiEmail = email.trim().toLowerCase();
    if (!rpiEmail.endsWith("@rpi.edu")) {
      return res.status(400).json({ ok: false, error: "Use your @rpi.edu email." });
    }

    // rate-limit per email (optional): block resend within 60s
    const existing = codes.get(rpiEmail);
    const now = Date.now();
    if (existing && now < existing.nextSendAllowedAt) {
      const wait = Math.ceil((existing.nextSendAllowedAt - now) / 1000);
      return res.status(429).json({ ok: false, error: `Please wait ${wait}s before resending.` });
    }

    const code = genCode();
    const expiresAt = now + 10 * 60 * 1000; // 10 minutes
    const nextSendAllowedAt = now + 60 * 1000; // 60s cooldown

    codes.set(rpiEmail, { code, expiresAt, nextSendAllowedAt });

    await transporter.sendMail({
      from: `"RPI Dorms Verification" <${process.env.MAIL_USERNAME}>`,
      to: rpiEmail,
      subject: "Your RPI Dorms verification code",
      text: `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.\nIf you did not request this, you can ignore this email.`,
    });

    return res.json({ ok: true, message: "Code sent." });
  } catch (err) {
    console.error("SEND-CODE ERROR:", err);
    return res.status(500).json({ ok: false, error: "Failed to send code." });
  }
});

// POST /auth/verify  { email, code }
app.post("/auth/verify", (req, res) => {
  try {
    const { email, code } = req.body || {};
    if (!email || !code) {
      return res.status(400).json({ ok: false, error: "Email and code required." });
    }
    const rpiEmail = email.trim().toLowerCase();
    const entry = codes.get(rpiEmail);
    if (!entry) {
      return res.status(400).json({ ok: false, error: "No code requested for this email." });
    }
    const now = Date.now();
    if (now > entry.expiresAt) {
      codes.delete(rpiEmail);
      return res.status(400).json({ ok: false, error: "Code expired. Request a new one." });
    }
    if (String(code) !== String(entry.code)) {
      return res.status(400).json({ ok: false, error: "Incorrect verification code." });
    }

    codes.delete(rpiEmail);
    return res.json({ ok: true, message: "Verified." });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ ok: false, error: "Verification failed." });
  }
});

// ==================== SUBMISSIONS API ====================

// Create a submission
app.post("/submissions", async (req, res) => {
  try {
    const { dorm_name, class_year, rating, amenities, review, photo_url } = req.body || {};

    if (!dorm_name || !class_year || !rating || !photo_url) {
      return res.status(400).json({ error: "missing_fields" });
    }
    if (!Array.isArray(amenities) || amenities.length === 0) {
      return res.status(400).json({ error: "amenities_required" });
    }

    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) {
      return res.status(400).json({ error: "invalid_rating" });
    }

    const created = await prisma.submission.create({
      data: {
        dorm_name,
        class_year: Number(class_year),
        rating: r,
        amenities,
        review: review || null,
        photo_url,
      },
      select: { id: true, created_at: true },
    });

    // Cast BigInt -> string for JSON
    return res.json({
      ok: true,
      id: String(created.id),
      created_at: created.created_at,
    });
  } catch (err) {
    console.error("INSERT ERROR:", err);
    return res.status(500).json({ error: "insert_failed" });
  }
});

// List recent submissions
app.get("/submissions", async (_req, res) => {
  try {
    const rows = await prisma.submission.findMany({
      orderBy: { created_at: "desc" },
      take: 20,
    });
    const safe = rows.map((r) => ({ ...r, id: String(r.id) })); // BigInt -> string
    return res.json(safe);
  } catch (err) {
    console.error("READ ERROR:", err);
    return res.status(500).json({ error: "read_failed" });
  }
});

// ==================== /SUBMISSIONS ====================

const port = Number(process.env.PORT || 4000);

//start code here//

// --- Upload middleware setup ---
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 }, // 6 MB max
});

// --- Helper: sanitize filenames ---
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "");
}

// --- Verify required env vars ---
const requiredEnv = [
  "R2_ENDPOINT",
  "R2_ACCESS_KEY",
  "R2_SECRET_KEY",
  "R2_BUCKET",
  "R2_PUBLIC_BASE",
];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
}

// --- Cloudflare R2 S3-compatible client ---
const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

// --- Route: POST /upload-photo ---
app.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "no_file" });
    }

    const { originalname, mimetype, buffer } = req.file;
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(mimetype)) {
      return res.status(400).json({ ok: false, error: "invalid_type" });
    }

    // Generate object key
    const safeName = sanitizeFilename(originalname);
    const key = `${Date.now()}-${safeName}`;

    // Upload to Cloudflare R2
    const cmd = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      CacheControl: "public, max-age=31536000, immutable",
    });

    await r2.send(cmd);

    const publicUrl = `${process.env.R2_PUBLIC_BASE}/${key}`;

    return res.json({ ok: true, url: publicUrl, key });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ ok: false, error: "upload_failed" });
  }
});

app.listen(port, () => console.log(`API listening on :${port}`));
