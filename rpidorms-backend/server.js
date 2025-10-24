import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// --- security & parsing
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // Vite dev
      "https://your-production-domain.com" // <- replace with your real domain
    ],
    methods: ["POST", "OPTIONS"],
  })
);

// --- basic rate limit: 10 requests / 10 minutes per IP
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

// --- health check (optional)
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

    // sanitize-ish (quick trim)
    const name = from_name.trim().slice(0, 200);
    const email = reply_to.trim().slice(0, 200);
    const body = message.trim().slice(0, 5000);

    // compose
    const mailOptions = {
      from: `"RPI Dorms Contact" <${process.env.MAIL_USERNAME}>`, // must be your Gmail
      to: process.env.MAIL_TO, // where you receive
      subject: `New contact form message from ${name}`,
      text:
`From: ${name} <${email}>

${body}
`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p>${escapeHtml(body).replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: email, // lets you reply directly to the sender
    };

    await transporter.sendMail(mailOptions);

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

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`Mail API listening on :${port}`));



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

    // send email
    await transporter.sendMail({
      from: `"RPI Dorms Verification" <${process.env.MAIL_USERNAME}>`,
      to: rpiEmail,
      subject: "Your RPI Dorms verification code",
      text:
`Your verification code is: ${code}

This code will expire in 10 minutes.
If you did not request this, you can ignore this email.`,
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

    // success: one-time use
    codes.delete(rpiEmail);
    return res.json({ ok: true, message: "Verified." });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ ok: false, error: "Verification failed." });
  }
});
