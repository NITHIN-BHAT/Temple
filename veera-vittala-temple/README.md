# Shri Veera Vittala Mukyaprana Temple – Website

Website for **Shri Veera Vittala Mukyaprana Temple (ಶ್ರೀ ವೀರ ವಿಟ್ಟಲ ಮುಖ್ಯಪ್ರಾಣ ದೇವಸ್ಥಾನ)**, Jalwalli, Honnavar taluk, Uttara Kannada, Karnataka 581334.

React + Vite + Tailwind CSS + Framer Motion + Lucide + React Router, with an optional Express API that powers the admin dashboard.

---

## ✏️ How to edit the content (start here)

**Everything on the site comes from one file:**

```
frontend/src/data/templeData.json
```

- Change any text, timing, seva, price, festival or phone number there and save. The site updates.
- Items with `"sample": true` are **placeholder content** and show a small "To be confirmed" tag. Once you confirm the real detail, edit it and set `"sample": false`.
- When all details are real, set `"meta": { "showSampleNotice": false }`. All sample tags and the notice then disappear.
- **Times** are 24-hour `"HH:MM"` (e.g. `"17:30"`). **Dates** are `"YYYY-MM-DD"`. Upcoming events that have passed are hidden automatically.
- **Photos:** put images in `frontend/public/images/` and set e.g. `"src": "/images/temple-front.jpg"` (gallery), `"image"` (deities) or `"heroImage"` (home page background). An empty value `""` shows a labelled "Photo coming soon" panel.
- **Phone:** the placeholder `+91 00000 00000` stays hidden on the site until you replace it.
- **Donation:** keep `"enabled": false` until the temple provides official bank or UPI details. The online-payment button stays disabled.
- **Colours and fonts:** `frontend/tailwind.config.js`.

You can also use the **Admin Dashboard** at `/admin`, which needs the backend. It edits the same data through forms and supports photo upload. Without the backend, the dashboard opens in *offline* mode: make your edits, click **Export JSON**, then replace `templeData.json` with the downloaded file.

---

## ▶️ Run locally

Requires **Node.js 18+**.

```bash
# 1. install
npm run install:all

# 2. configure the admin login
cp backend/.env.example backend/.env      # then edit ADMIN_PASSWORD and JWT_SECRET

# 3. start (two terminals)
npm run dev:backend      # API  → http://localhost:5000
npm run dev:frontend     # site → http://localhost:5173   (admin: /admin)
```

The frontend also runs on its own (`npm run dev:frontend`). It then uses `templeData.json` directly, and the contact form opens the visitor's email app instead of sending to the server.

On first start the backend copies `templeData.json` into `backend/data/content.json`, and admin edits are saved there from then on. Enquiries are saved to `backend/data/messages.json` and uploaded photos to `backend/uploads/`. To reset the content to `templeData.json`, delete `backend/data/content.json` and restart.

---

## 🚀 Deploy

### Option A: static site only (simplest, free)
Netlify / Vercel / Cloudflare Pages:
- Root directory: `frontend` · Build command: `npm run build` · Output: `dist`
- Page-refresh rewrites are already included (`public/_redirects` for Netlify, `vercel.json` for Vercel).
- To update content, edit `templeData.json` and redeploy. The admin dashboard runs in offline/export mode.

### Option B: full site and admin on one server (Render, Railway, a VPS)
```bash
npm run install:all
npm run build            # builds frontend/dist
npm start                # Express serves the API AND the built site on $PORT
```
Set the environment variables `ADMIN_USERNAME`, `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`) and `JWT_SECRET`.
**Important:** use a host with a **persistent disk** for `backend/data` and `backend/uploads`. Otherwise edits and photos are lost when you redeploy.

### Option C: frontend and backend on separate hosts
Host the frontend on Netlify or Vercel with the env var `VITE_API_URL=https://your-api.example.com`. Host the backend on Render with `CORS_ORIGIN=https://your-site.example.com`.

---

## 📁 Folder structure

```
veera-vittala-temple/
├── package.json               # convenience scripts
├── frontend/
│   ├── index.html             # SEO meta, fonts, favicon
│   ├── tailwind.config.js     # brand colours & fonts
│   ├── vite.config.js
│   ├── vercel.json            # Vercel SPA rewrite
│   ├── public/
│   │   ├── images/            # ← put temple photos here
│   │   ├── _redirects         # Netlify SPA rewrite
│   │   └── robots.txt
│   └── src/
│       ├── data/templeData.json        # ← ALL WEBSITE CONTENT
│       ├── App.jsx                     # routes
│       ├── context/ContentContext.jsx  # loads content (API → JSON fallback)
│       ├── hooks/usePageMeta.js        # per-page SEO title/description
│       ├── lib/                        # api helper, time/date utils
│       ├── components/
│       │   ├── layout/   # Navbar, Footer, Layout, SampleNotice
│       │   ├── ui/       # Reveal, SectionHeading, PageHero, SmartImage, Lightbox…
│       │   ├── shared/   # TimingsCard, UpcomingEvents, MapEmbed, ContactForm
│       │   └── art/TempleIllustration.jsx  # hero artwork until a real photo is added
│       └── pages/        # Home, About, Deities, Seva, Festivals, Timings,
│           │             # Gallery, Location, Contact, Donate, NotFound
│           └── admin/    # AdminLogin, AdminDashboard, FieldEditor (auto-generates forms)
└── backend/
    ├── server.js         # Express API (JWT auth, uploads, enquiries, rate limits)
    ├── .env.example
    ├── data/             # content.json + messages.json (created at runtime)
    └── uploads/          # uploaded photos
```

## 🔎 What is verified vs sample

| Verified (Google Maps listing / village records) | Sample: please confirm |
|---|---|
| Temple name (English & Kannada), plus code 7G5C+3M4, coordinates 14.25764° N 74.52171° E | History, traditions, significance text |
| Jalwalli village, Honnavar taluk, Uttara Kannada, PIN 581334 | Deities beyond the two in the temple's name |
| Architecture seen in visitor photos (tiled hall, paved courtyard, carved doors, silver prabhavali) | Timings and daily schedule |
| Google rating 4.9 from 32 reviews (Nov 2026) | Sevas, prices, festivals and dates |
| Route via the Honnavar–Jog road and Dibbanagal comes from a visitor review: confirm it locally | Phone, email, committee, nearby distances |

No photos of the temple are included. The photos on Google Maps belong to the people who uploaded them, so add photos the temple owns or has permission to use.
