# Zurisky Portfolio

Personal developer portfolio — Nuxt 3 + TypeScript + Tailwind CSS. Production-ready v1, no CMS, all content in `data/`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run preview  # preview production build
npx nuxt typecheck
npm run lint
```

## Features

- Splash loading screen (once per session, skipped for reduced motion)
- Dark/light theme toggle (persisted) + Indonesian/English switcher (`ID/EN` in navbar & footer, persisted via cookie)
- All UI strings in `i18n/locales/{en,id}.json`; content translations live next to content in `data/*.ts` as `*Id` fields, picked via `composables/useLocaleContent.ts`

## Configure your real links (important)

Open `data/profile.ts` and replace:

- `github` — real GitHub URL
- `linkedin` — real LinkedIn URL
- `email` — real `mailto:` address

Buttons/links with placeholders are automatically hidden so production never shows broken links.
`Contact.vue`, `Navbar.vue`, and `Footer.vue` check for `REPLACE_WITH_REAL`.

## Add your CV

Drop the PDF at `public/cv/Zurisky-Aqsa-CV.pdf` (path configured in `data/profile.ts` → `cvPath`).

## Add your profile photo

Drop the photo at `public/images/profile/photo.webp` (portrait 4:5 works best).
Path is configured in `data/profile.ts` → `photo`. Until then, About shows an
elegant initials monogram — never a broken image.

## Add project screenshots

Drop WebP files into `public/images/projects/<slug>/`, keeping the first file as the cover:

```text
public/images/projects/healthlens/cover.webp
public/images/projects/healthlens/dashboard.webp
...
```

Filenames/alt text are centralized in `data/projects.ts`. Missing files fall back to `public/images/placeholder.svg` — no broken images.

## Deploy (Vercel + custom domain aqsa.my.id)

1. Push to GitHub.
2. Import the repo in Vercel (framework preset: Nuxt.js, build: `npm run build`).
3. In Vercel: Settings → Domains → add `aqsa.my.id` (and `www.aqsa.my.id` if used), then point your DNS to Vercel (A record `76.76.21.21` for apex, or CNAME to `cname.vercel-dns.com` for www — follow Vercel's instructions).
4. Canonical URL + sitemap already use `https://aqsa.my.id` (`nuxt.config.ts`, `public/robots.txt`, `public/sitemap.xml`).
5. Verify: all routes, gallery keyboard nav, dark/light toggle, CV link, SEO meta.

## Project structure

```text
assets/css/main.css  components/*  composables/*  data/*  pages/*  public/images  public/cv  types/
```

## Future (not in v1)

Supabase Auth + Storage admin dashboard for project CRUD and image upload. Architecture is ready: keep content in `data/` so it can later be swapped for API calls.
