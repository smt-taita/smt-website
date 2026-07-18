# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

St Matt's Anglican Church Taitā — a small community church website in Lower Hutt, New Zealand. Static informational site with two pages: homepage and hall hire.

## Commands

- `npm run dev` — start dev server (Next.js 16, localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint
- No test framework configured

## Architecture

Next.js 16 App Router with Tailwind CSS v4 and TypeScript. All content is static (no CMS, no database, no API routes).

**Pages:** `src/app/page.tsx` (homepage), `src/app/hall-hire/page.tsx` (hall hire details + Google Calendar embed)

**Shared components:** `src/components/` — Header (fixed nav), Footer, SectionHeading (reusable section title with gradient bar), WelcomeModal (first-visit popup, client component, native `<dialog>` + localStorage dismissal)

**Layout:** `src/app/layout.tsx` — Inter font via `next/font`, Header/Footer wrap all pages, `pt-14` on `<main>` accounts for the fixed header height.

## Styling

Tailwind CSS v4 with `@theme inline` in `globals.css`. Brand colours are CSS custom properties exposed as Tailwind utilities:

- `church-blue` — primary (headings, links)
- `church-green` — secondary (accents, hover states)
- `church-amber` — tertiary (CTAs, highlights)
- `church-slate` — body text

Use `border-l-4 border-church-{colour}` card pattern throughout. Rotate colours for visual rhythm (no semantic meaning).

## Content Conventions

- Te reo Māori words wrapped in `<span lang="mi">` for accessibility (e.g., Taitā, kai, mahi, Kāinga)
- Church is "St Matt's" (not "St Matthew's")
- Touch targets minimum 44px (`min-h-[44px]`)
- `&apos;` for apostrophes in JSX
- `prefers-reduced-motion` respected for animations

## Path Alias

`@/*` maps to `./src/*`
