# St Matt's Taitā — Church Website

The website for St Matt's Anglican Church Taitā, a small community church in Lower Hutt,
New Zealand.

**Live:** https://stmattstaita.org.nz

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm run lint     # ESLint
```

There is no test framework configured.

## What's here

Next.js 16 (App Router) with Tailwind CSS v4 and TypeScript. Everything is static — no CMS,
no database, no API routes. Content changes are code changes.

```
src/app/page.tsx            homepage
src/app/hall-hire/page.tsx  hall hire details + Google Calendar embed
src/app/layout.tsx          shared shell (header, footer, fonts, metadata)
src/components/             Header, Footer, SectionHeading, WelcomeModal
public/                     logo and photography
```

`src/app/opengraph-image.jpg` and `twitter-image.jpg` are the social link previews, picked up
automatically by Next.js via its file conventions.

## Deployment

Hosted on Vercel (project `smt-website`), deployed automatically on every push to `main`.

DNS is managed at **iwantmyname**, not Vercel — the apex `stmattstaita.org.nz` points at
Vercel via an `A` record, and `www` is a permanent redirect to the apex. The domain also
carries Google Workspace email (`admin@stmattstaita.org.nz`), so **leave the MX records
alone** when changing DNS.

`housing.stmattstaita.org.nz` is a separate Vercel project (`smt-housing`) on the same domain.

## Conventions

See `CLAUDE.md` for the full set. The ones that bite most often:

- The church is **"St Matt's"**, never "St Matthew's" — except the bank payee name, which must
  read `SAINT MATTHEWS - TAITA` exactly to match the bank record.
- Te reo Māori words are wrapped in `<span lang="mi">` so screen readers pronounce them
  correctly. Keep the macron on **Taitā**.
- NZ spelling ("neighbours", not "neighbors").
- Touch targets are at least 44px; `prefers-reduced-motion` is respected.
- Photos from phones often carry an EXIF rotation tag. Bake the rotation into the pixels and
  clear the tag before committing, or browsers and build tools will disagree about which way
  up the image goes.

## Background

Planning and content decisions live in `docs/` — including the go-live plan and the hall-hire
booking form design.
