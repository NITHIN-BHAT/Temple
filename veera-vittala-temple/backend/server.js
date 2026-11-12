/**
 * Temple website API — Express + JSON-file storage (no database setup needed).
 *   GET  /api/content            public: all website content
 *   PUT  /api/content/:section   admin:  update one section (e.g. "sevas")
 *   POST /api/auth/login         returns a JWT for the admin
 *   GET  /api/auth/me            checks the token
 *   POST /api/upload             admin:  upload an image -> { url }
 *   POST /api/contact            public: save an enquiry
 *   GET  /api/messages           admin:  list enquiries
 * In production it also serves the built React app from ../frontend/dist.
 */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback to root .env if present
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const SEED_FILE = path.join(__dirname, '..', 'frontend', 'src', 'data', 'templeData.json');
const DIST_DIR = path.join(__dirname, '..', 'frontend', 'dist');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // plain, or…
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // …bcrypt hash (preferred)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || (!ADMIN_PASSWORD && !ADMIN_PASSWORD_HASH)) {
  console.error('\n✖ Missing JWT_SECRET or ADMIN_PASSWORD in backend/.env — copy .env.example to .env and fill it in.\n');
  process.exit(1);
}

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------- tiny JSON store ----------
const readJson = (file, fallback) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
};
const writeJson = (file, data) => {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file); // atomic replace
};
if (!fs.existsSync(CONTENT_FILE)) {
  writeJson(CONTENT_FILE, readJson(SEED_FILE, {}));
  console.log('• Seeded data/content.json from frontend/src/data/templeData.json');
}

// ---------- app ----------
const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true }));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d' }));

const requireAdmin = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');
  try { req.admin = jwt.verify(token, JWT_SECRET); next(); } catch { res.status(401).json({ error: 'Please sign in again.' }); }
};

// content
app.get('/api/content', (_req, res) => res.json(readJson(CONTENT_FILE, {})));

const SECTIONS = new Set(['meta', 'temple', 'trust', 'about', 'history', 'deities', 'annualSeva', 'development', 'timings', 'sevas', 'festivals', 'announcements', 'gallery', 'location', 'contact', 'donation']);
app.put('/api/content/:section', requireAdmin, (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.has(section)) return res.status(400).json({ error: 'Unknown section.' });
  if (req.body === undefined || req.body === null) return res.status(400).json({ error: 'Empty body.' });
  const content = readJson(CONTENT_FILE, {});
  content[section] = req.body;
  writeJson(CONTENT_FILE, content);
  res.json({ ok: true });
});

// auth
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many attempts. Try again in 15 minutes.' } });
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { username = '', password = '' } = req.body || {};
  const userOk = crypto.timingSafeEqual(Buffer.from(String(username).padEnd(64)), Buffer.from(ADMIN_USERNAME.padEnd(64)));
  const passOk = ADMIN_PASSWORD_HASH
    ? await bcrypt.compare(String(password), ADMIN_PASSWORD_HASH)
    : String(password) === ADMIN_PASSWORD;
  if (!userOk || !passOk) return res.status(401).json({ error: 'Invalid credentials.' });
  const token = jwt.sign({ sub: ADMIN_USERNAME, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});
app.get('/api/auth/me', requireAdmin, (req, res) => res.json({ user: req.admin.sub }));

// uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)),
});
app.post('/api/upload', requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'Image must be under 5 MB.' : err.message });
    if (!req.file) return res.status(400).json({ error: 'Please choose a JPG, PNG or WebP image.' });
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

// contact
const contactLimiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 5, message: { error: 'Too many messages. Please try again later.' } });
const clean = (v, max) => String(v ?? '').trim().slice(0, max);
app.post('/api/contact', contactLimiter, (req, res) => {
  const b = req.body || {};
  const msg = {
    id: crypto.randomUUID(),
    name: clean(b.name, 100), phone: clean(b.phone, 30), email: clean(b.email, 120),
    subject: clean(b.subject, 100) || 'General enquiry', message: clean(b.message, 3000),
    createdAt: new Date().toISOString(),
  };
  if (msg.name.length < 2 || msg.message.length < 5 || (!msg.phone && !msg.email)) {
    return res.status(400).json({ error: 'Please fill in your name, a phone or email, and a message.' });
  }
  const list = readJson(MESSAGES_FILE, []);
  list.unshift(msg);
  writeJson(MESSAGES_FILE, list.slice(0, 1000));
  res.status(201).json({ ok: true });
});
app.get('/api/messages', requireAdmin, (_req, res) => res.json(readJson(MESSAGES_FILE, [])));

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// serve the built frontend (single-server deployment)
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, { maxAge: '7d', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => console.log(`✔ Temple API running on http://localhost:${PORT}`));
