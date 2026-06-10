# Pointers · Next.js 15 + next-intl

Bilingual (ES/EN) website built with **Next.js 15 App Router**, **next-intl**, **Tailwind CSS**, and **Framer Motion**.

## Stack
- Next.js 15 + React 19 + App Router
- next-intl (locale routing `/es`, `/en`)
- Tailwind CSS 3
- Framer Motion (animations)
- TypeScript strict

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000 — redirects to `/es`.

## Structure
```
app/
  [locale]/
    layout.tsx        # Locale layout + i18n provider
    page.tsx          # Home
    services/page.tsx
    work/page.tsx
    about/page.tsx
    contact/page.tsx
  layout.tsx          # Root layout (fonts, metadata)
  page.tsx            # Redirects to /es
i18n/
  routing.ts          # Locales config + Link/usePathname helpers
  request.ts          # Server config
messages/
  es.json
  en.json
components/
  header.tsx, footer.tsx, reveal.tsx
  sections/           # Hero, services, work, about, CTA
middleware.ts         # next-intl locale detection
```

## Deploy on Vercel
1. Push the repo to GitHub.
2. Import in Vercel — no env vars needed.
3. Done. Vercel auto-detects Next.js 15.

## i18n
- Default locale: `es`
- Switch language via header (`ES` / `EN`)
- Add a key in `messages/es.json` AND `messages/en.json`, then use `useTranslations('namespace')`

## Customization
- Colors / tokens: `app/globals.css` (`:root` HSL vars)
- Fonts: swap `Inter` in `app/layout.tsx` for `General Sans` (via local font)
- Routes: add a folder under `app/[locale]/your-route/page.tsx`

## License
Proprietary — © Pointers.
