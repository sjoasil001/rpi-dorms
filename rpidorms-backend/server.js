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
