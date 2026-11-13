# Dongrie Labs — Website

Website for Dongrie Labs, a solo AI-powered software studio.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **next-intl** (EN / PT)
- **TypeScript**

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/en` by default.

## Build

```bash
npm run build
npm start
```

## Contact form

Submissions are `POST`ed to `/api/contact`, validated with Zod, stored in Supabase, and emailed to the owner with Resend. WhatsApp is only a secondary button. If the required environment variables are missing, or the database or email send fails, the API returns an error and the form keeps the WhatsApp fallback so the message is not dropped silently.

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | yes | Project URL (Settings → API). Server-only. |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | `service_role` secret. Never expose it as `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | yes | Resend API key. |
| `CONTACT_FROM_EMAIL` | yes | From address Resend will accept. Quote it if it contains spaces. |
| `CONTACT_TO_EMAIL` | no | Notification recipient. Defaults to `goncalo.dongrie05@gmail.com`. |

### 1. Database

In the Supabase SQL editor, run [`supabase/contact_leads.sql`](supabase/contact_leads.sql) once. It creates `public.contact_leads`, enables row level security with no anon policies, and allows inserts only through the service role.

### 2. Email

1. Create a Resend API key and set `RESEND_API_KEY`.
2. Until the domain is verified, set `CONTACT_FROM_EMAIL="Dongrie Labs <onboarding@resend.dev>"`. Resend only delivers that sender to the email on the Resend account, so use that address as `CONTACT_TO_EMAIL` while testing.
3. For production, add the domain in Resend, publish the DNS records they show (SPF and DKIM), wait until the domain is verified, then set `CONTACT_FROM_EMAIL="Dongrie Labs <hello@dongrielabs.com>"` (any address on the verified domain).

The in-memory rate limit (5 requests per 10 minutes per IP) applies to each server instance. The honeypot field is `company_url`.

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://dongrielabs.com`) for sitemap and metadata.
3. Set the contact-form variables above (Settings → Environment Variables) and redeploy.

## Project structure

- `src/app/[locale]/` — Locale-specific pages (en, pt)
- `src/components/` — Layout, sections, UI, shared components
- `src/lib/data/` — Static data (projects, services)
- `src/messages/` — Translations (en.json, pt.json)

## Adding content

- **Projects:** Edit `src/lib/data/projects.ts` and add entries with `slug`, `name`, `type`, `platform`, `techStack`, `description`, and optional `image`, `highlighted`, etc.
- **Copy:** Edit `src/messages/en.json` and `src/messages/pt.json`.
- **Calendly / App Store links:** Replace placeholder `#` and add URLs in the relevant components and project data.
