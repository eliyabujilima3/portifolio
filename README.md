# Eliya Bujilima — Portfolio Website

A full-stack personal portfolio: a React + TypeScript + Tailwind frontend, and an
Express + Prisma backend powering the contact form and a small admin dashboard.

```
portfolio/
├── frontend/   React + TypeScript + Tailwind + Framer Motion (Vite)
└── backend/    Express + TypeScript + Prisma + SQLite/Postgres/MySQL
```

---

## 1. Quick start

### Backend

```bash
cd backend
npm install
cp .env.example .env          # then edit JWT_SECRET, EMAIL_*, etc.
npx prisma generate
npx prisma migrate dev --name init   # creates the SQLite database + tables
npm run seed                  # creates the first admin login (see .env)
npm run dev                   # starts the API on http://localhost:4000
```

> **Note:** `prisma generate` and `prisma migrate` download a small database
> engine binary the first time — this requires normal internet access. If
> you're running this inside a restricted sandbox/CI environment, run these
> two commands on your own machine or in your normal dev environment first.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env           # defaults to http://localhost:4000/api, fine for local dev
npm run dev                    # starts the site on http://localhost:5173
```

Open **http://localhost:5173** for the site, and **http://localhost:5173/admin**
for the admin login (credentials come from `ADMIN_SEED_EMAIL` /
`ADMIN_SEED_PASSWORD` in the backend `.env`).

---

## 2. Editing your content

Everything shown on the site — bio, education, skills, projects, experience,
certifications, testimonials, services, contact info, social links — lives in
one file:

```
frontend/src/data/content.ts
```

Anything marked `[Placeholder]` in that file should be replaced with your
real details (email, phone, social links, GitHub/live URLs for projects,
testimonials, etc.). Placeholder images live in `frontend/public/` — swap
them for real photos/screenshots with the same filenames, or update the paths
in `content.ts`.

To add your real CV for the "Download CV" button, drop a PDF at
`frontend/public/Eliya_Bujilima_CV.pdf` (matches `profile.resumeUrl` in
`content.ts`), or update that path.

---

## 3. Backend environment variables

All configuration lives in `backend/.env` (copy `.env.example` to start).

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLite by default (`file:./dev.db`). Swap to a Postgres/MySQL connection string for production — see comments in `prisma/schema.prisma`. |
| `JWT_SECRET` | Long random string used to sign admin login tokens. **Change this before deploying.** |
| `EMAIL_HOST/PORT/USER/PASSWORD/FROM/TO` | SMTP details for the "new contact message" email notification. Leave blank to disable email — messages are still saved to the database either way. |
| `ADMIN_SEED_EMAIL/PASSWORD` | Used once by `npm run seed` to create your first admin login. |
| `CORS_ORIGIN` | The frontend URL allowed to call this API. |

**Using Gmail for SMTP:** enable 2-factor auth on the Google account, then
create an "App Password" and use that as `EMAIL_PASSWORD` (a normal Gmail
password will not work).

---

## 4. Admin dashboard

Visit `/admin`, sign in, and you can:
- View all contact messages, newest first
- Search messages by name/email/subject/content
- Mark messages read/unread
- Delete messages
- Export all messages to CSV
- See at-a-glance stats: total, new, read, today's messages

Auth is JWT-based (12-hour expiry by default) with bcrypt-hashed passwords,
plus rate limiting on both the login endpoint and the public contact form to
deter brute-forcing and spam.

---

## 5. Deployment

This project is structured to deploy for free/cheap on:

- **Frontend → [Vercel](https://vercel.com):** import the `frontend/` folder as
  the project root, framework preset "Vite". Set `VITE_API_BASE_URL` to your
  deployed backend URL in Vercel's environment variables.
- **Backend → [Render](https://render.com):** new Web Service pointing at the
  `backend/` folder. Build command: `npm install && npx prisma generate && npm run build`.
  Start command: `npm start`. Add all variables from `.env.example` in Render's
  environment settings.
- **Database → [Railway](https://railway.app), [Supabase](https://supabase.com),
  or [Neon](https://neon.tech):** create a Postgres instance, copy its
  connection string into `DATABASE_URL`, change `provider = "sqlite"` to
  `"postgresql"` in `backend/prisma/schema.prisma`, then run
  `npx prisma migrate deploy` once against that database.

After deploying, update `CORS_ORIGIN` in the backend to your live frontend
URL, and `VITE_API_BASE_URL` in the frontend to your live backend URL.

---

## 6. Tech stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React
Router, React Icons, Axios.

**Backend:** Node.js, Express, Prisma ORM, SQLite (swappable to
PostgreSQL/MySQL), JWT auth, bcrypt, Nodemailer, Zod validation, Helmet,
express-rate-limit, CORS.

**Security measures included:** Helmet security headers, CORS restricted to
one origin, input validation on every endpoint (Zod), SQL-injection
protection (Prisma's parameterized queries), rate limiting on login and
contact endpoints, bcrypt password hashing, JWT-protected admin routes, and a
JSON body-size cap.

---

## 7. What's left for you to do

- [ ] Replace placeholder contact info, social links, and images in `content.ts`
- [ ] Add your real CV PDF and project screenshots
- [ ] Set a strong, unique `JWT_SECRET` before deploying
- [ ] Configure real SMTP credentials (or leave blank if you don't need email alerts)
- [ ] Swap in real testimonials once you have them (or remove the section)
- [ ] Point `DATABASE_URL` at Postgres/MySQL for production if you don't want to ship SQLite
