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

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://dongrielabs.com`) for sitemap and metadata.
3. Deploy.

## Project structure

- `src/app/[locale]/` — Locale-specific pages (en, pt)
- `src/components/` — Layout, sections, UI, shared components
- `src/lib/data/` — Static data (projects, services)
- `src/messages/` — Translations (en.json, pt.json)

## Adding content

- **Projects:** Edit `src/lib/data/projects.ts` and add entries with `slug`, `name`, `type`, `platform`, `techStack`, `description`, and optional `image`, `highlighted`, etc.
- **Copy:** Edit `src/messages/en.json` and `src/messages/pt.json`.
- **Calendly / App Store links:** Replace placeholder `#` and add URLs in the relevant components and project data.
