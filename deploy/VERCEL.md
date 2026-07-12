# Deploy Mynanny to Vercel + Supabase

Host the Next.js + Payload CMS app on **Vercel** (free) and PostgreSQL on **Supabase** (free).

---

## Before you push to GitHub

This repo may have `.env`, `node_modules/`, and `.next/` tracked in git. **Fix that first** so secrets and build artifacts are not published.

```bash
# From the project root
git rm -r --cached .env .next node_modules 2>/dev/null || true
git add .gitignore
git commit -m "Add .gitignore and stop tracking env/build artifacts"
```

Verify `.env` is ignored:

```bash
git status   # .env should NOT appear
```

If `.env` was ever pushed to a remote, rotate `PAYLOAD_SECRET` and your database password.

---

## Architecture

```
GitHub  →  Vercel (Next.js + Payload app)
              ↓
         Supabase (PostgreSQL)
```

Vercel does **not** host your database. Supabase provides Postgres only; the app runs on Vercel.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free).
2. **New project** → pick a name, password, and region (choose one close to your users, e.g. `eu-west` or closest to Kenya).
3. Save the **database password** somewhere safe.

### Get the connection string

1. **Project Settings** → **Database**
2. Under **Connection string**, choose **URI**
3. Select **Transaction pooler** (port **6543**) — required for Vercel serverless
4. Copy the URI. It looks like:

   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

5. Append SSL if missing:

   ```
   ?sslmode=require
   ```

Keep the **direct** connection (port 5432) for local `pg_dump` / `psql` only — use the **pooler** URL in production.

---

## 2. Push code to GitHub

If you do not have a remote yet:

```bash
git remote add origin https://github.com/YOUR_USER/mn-site.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New…** → **Project** → import `mn-site`.
3. Framework preset should detect **Next.js** automatically.
4. **Do not deploy yet** — set environment variables first.

### Environment variables

In **Settings → Environment Variables**, add these for **Production** (and Preview if you want):

| Name | Value |
|------|--------|
| `DATABASE_URI` | Supabase **transaction pooler** URI (port 6543) |
| `PAYLOAD_SECRET` | Random string, at least 32 chars (see below) |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-project.vercel.app` (update after first deploy if needed) |

Generate `PAYLOAD_SECRET` locally:

```bash
openssl rand -base64 48
```

5. Click **Deploy**.

---

## 4. Seed the database

After the first successful deploy, populate Supabase with initial content.

**Option A — run seed locally** (easiest):

```bash
# Temporarily point .env at Supabase (use pooler URL)
DATABASE_URI="postgresql://postgres.[ref]:[password]@....pooler.supabase.com:6543/postgres?sslmode=require"
PAYLOAD_SECRET="same-secret-as-vercel"
NEXT_PUBLIC_SERVER_URL="https://your-project.vercel.app"

npm run seed
```

**Option B — run seed from your machine using a one-liner** (without editing `.env`):

```bash
DATABASE_URI="..." PAYLOAD_SECRET="..." NEXT_PUBLIC_SERVER_URL="https://your-project.vercel.app" npm run seed
```

Payload creates tables on first connection; seed adds content and a default admin user.

### Default admin (from seed)

| Field | Value |
|-------|--------|
| Email | `admin@mynanny.co.ke` |
| Password | `changeme123` |

**Change this password immediately** after first login at `https://your-project.vercel.app/admin`.

---

## 5. Verify

1. Open `https://your-project.vercel.app` — frontend should load.
2. Open `https://your-project.vercel.app/admin` — Payload admin login.
3. Submit a test inquiry on the contact form — check **Inquiries** in admin.

---

## 6. Custom domain (optional)

1. Vercel → **Project → Settings → Domains** → add your domain.
2. Update DNS at your registrar (A/CNAME as Vercel instructs).
3. Update `NEXT_PUBLIC_SERVER_URL` in Vercel to `https://yourdomain.co.ke`.
4. Redeploy (or trigger a redeploy from the Deployments tab).

---

## Migrating existing local data (optional)

If you already have content in local Postgres and want to move it to Supabase:

```bash
# Export local database
pg_dump -h localhost -U postgres -d mynanny --no-owner --no-acl > backup.sql

# Import into Supabase (use DIRECT connection, port 5432)
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?sslmode=require" < backup.sql
```

Then skip `npm run seed` or run it only for missing defaults (seed skips existing admin).

---

## Important limitations on Vercel

### Media uploads

Uploaded files are stored on the **local filesystem** by default. On Vercel that storage is **ephemeral** — uploads can disappear on redeploy.

For production CMS uploads, add cloud storage later (Supabase Storage, Cloudflare R2, or S3). Until then, use **external image URLs** in the CMS or rely on seeded/static assets in `public/`.

### Serverless cold starts

Free tier may add a short delay on first request after idle time.

### Connection pooling

Always use Supabase **transaction pooler** (port 6543) for `DATABASE_URI` on Vercel. Direct connections (5432) can exhaust Postgres connection limits.

---

## Redeploy after changes

Push to `main` on GitHub — Vercel redeploys automatically.

Manual redeploy: Vercel dashboard → **Deployments** → **Redeploy**.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails on Vercel | Check build logs; ensure `DATABASE_URI` and `PAYLOAD_SECRET` are set |
| `ECONNREFUSED` / DB errors | Use pooler URL (6543), not direct (5432) |
| Admin login fails | Re-run seed or create user in Supabase SQL / admin |
| Site loads but CMS empty | Run `npm run seed` against Supabase |
| Images from uploads broken | Expected on Vercel without cloud storage — use external URLs |

---

## Env reference

```env
DATABASE_URI=postgresql://postgres.[ref]:[password]@....pooler.supabase.com:6543/postgres?sslmode=require
PAYLOAD_SECRET=<64-char random string>
NEXT_PUBLIC_SERVER_URL=https://your-project.vercel.app
```

Local development keeps using `.env` with localhost Postgres — see `.env.example`.
