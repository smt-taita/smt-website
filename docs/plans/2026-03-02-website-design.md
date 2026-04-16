# St Matt's Taitā Website — Design Document

**Date:** 2026-03-02
**Status:** Approved
**PRD:** docs/prd.md

---

## Design Approach

Full-bleed cards layout: each section is a full-width band alternating between white and soft tinted backgrounds. The hero and footer bookend the page with the shared `church-blue → church-green` gradient. Cards within sections use `rounded-xl` with coloured `border-l-4` accents. The site is a single-page scroller with one additional content page for hall hire.

---

## Design System

### Colour Tokens (from housing.stmattstaita.org.nz)

| Token | Role | Notes |
|---|---|---|
| `church-blue` | Primary — headings, hero gradient start, links | Deep navy |
| `church-green` | Secondary — gradient end, garden accents, success states | Earthy green |
| `church-amber` | Accent — CTAs, highlights, key info callouts | Warm gold |
| `church-slate` | Neutral — body text, subtle backgrounds | Muted grey |

Exact HSL values to be extracted from the housing site CSS and defined as CSS custom properties in `globals.css`, then mapped to Tailwind via `@theme`.

### Typography

- **Font:** Inter via `next/font/google`
- **Weights:** 400 (body), 500 (labels), 600 (subheadings), 700 (headings)
- **Body size:** 16px minimum across all breakpoints (WCAG requirement)
- **Heading scale:** `text-xl` → `text-3xl` → `text-5xl` responsive

### Shared Patterns

- **Gradient accent bar:** `w-24 h-1 bg-gradient-to-r from-church-blue to-church-green rounded-full` — used above section headings
- **Card style:** `bg-white rounded-xl` with `border-l-4` in section-appropriate colour
- **Section padding:** `py-16 md:py-24` with `max-w-4xl mx-auto px-6`
- **Alternating backgrounds:** white → `slate-50` → white → `slate-50`
- **Te Reo terms:** wrapped in `<span lang="mi">` for screen reader compatibility

---

## Page Structure

### Layout Shell

- No sticky nav for v1 — page is short enough to scroll
- Small fixed header: logo (small) + "St Matt's Taitā" left-aligned, minimal
- Shared header/footer component used by both home page and hall hire page
- `<html lang="en">` with appropriate meta tags and OG data

### Home Page — Single-Page Scroller

#### Section 1: Hero (full viewport)

- **Background:** `min-h-screen` gradient `from-church-blue to-church-green` (placeholder for future photo + scrim)
- **Content (centred, stacked):**
  1. Logo in white circle — `w-20 h-20 md:w-28 md:h-28`
  2. `<span lang="mi">Nau mai, haere mai</span>` — lighter, smaller
  3. "Welcome" — below the Te Reo greeting
  4. "St Matt's Anglican Church Taitā" — `text-3xl md:text-5xl font-bold text-white`
  5. "One small church with one big heart" — `text-xl text-white/90`
  6. Subtle animated scroll indicator (chevron, gentle bounce)

#### Section 2: Sunday Rhythm (white background)

- Gradient accent bar above heading
- Heading: "Join Us Sunday"
- Single card with `border-l-4 border-church-amber`
- Large time: "9:30 AM" — `text-4xl font-bold text-church-blue`
- Location: "53 Reynolds Street, Taitā" — tappable Google Maps link
- Warm note: "Every Sunday, followed by coffee and kai together"
- No jargon, no liturgical terms

#### Section 3: Kāinga Housing (slate-50 background)

- Gradient accent bar above heading
- Heading: "St Matt's Kāinga"
- Subheading: "More than housing — we're building community"
- Brief paragraph: 8 homes, single-storey, built by Diocese, tenants welcome but no church obligation
- **Donation callout card** (`bg-white rounded-xl border-2 border-church-blue p-8`):
  - "Support Our Housing Mission"
  - Bank: `02-0610-0070823-00` in `font-mono` highlighted block
  - Reference: "housing" or "Kainga"
  - "Quarterly updates provided to supporters"
- Link to housing site: `housing.stmattstaita.org.nz`

#### Section 4: Community Garden (white background)

- Gradient accent bar above heading
- Heading: "Community Garden & Food Forest"
- Card with `border-l-4 border-church-green`
- A Rocha Eco Church mention
- Two gathering blocks:
  - **Wednesdays** — open to everyone, shared labour, learn to grow food
  - **Monthly Sundays** — church community, maintenance and food forest care
- "Produce shared with neighbours and Taitā Pātaka Kai"
- Warm invite: no experience needed, no membership needed

#### Section 5: Hall Hire (slate-50 background)

- Gradient accent bar above heading
- Heading: "Hall Hire"
- Brief card: 2-3 sentences about facilities being available to community groups
- Pricing mention: "From $15/hour"
- CTA link: "View booking details & conditions" → `/hall-hire`

#### Section 6: Contact Footer (gradient background)

- **Background:** `from-church-blue to-church-green` gradient (bookends with hero)
- Logo (small) + "St Matt's Anglican Church Taitā"
- Two addresses distinguished:
  - "Visit us: 53 Reynolds Street, Taitā"
  - "Post: 42 Poole Street, Taitā"
- Phone: `tel:` link — 022 409 7237
- Email: `mailto:` link — admin@stmattstaita.org.nz
- Facebook icon → `https://www.facebook.com/profile.php?id=100088895017140`
- Copyright: "© 2026 St Matt's Anglican Church Taitā"

---

### Hall Hire Page (`/hall-hire`)

Shares header and footer with home page. Standard content page layout.

#### Content Sections

1. **Page heading:** "Hireage of St Matt's Taitā"
2. **Introduction:** Welcome statement about facilities being a community resource
3. **Facilities:**
   - Hall, Kitchen and Foyer — description and usage notes
   - Front Meeting Room — capacity (~15 people), children's activities available
   - Sacred Space — respectful use guidelines, no food/drink (whare karakia)
4. **Charges table:**
   - Main hall: $20/hour (incl GST)
   - Meeting rooms: $15/hour (incl GST)
   - Full day: negotiated
   - Bond: $100 for daily hire
5. **Conditions of use:**
   - Structured with clear headings for each topic
   - Alcohol, cleaning, rubbish/recycling, storage, damage, parking, power, keys, earthquake procedure
6. **Booking and Payment:**
   - Email: admin@stmattstaita.org.nz
   - Bank: BNZ 02-0610-0070823-00, account name: St Matt's Taitā
   - Key policy

---

## File Structure

```
src/
  app/
    layout.tsx          — shared layout (Inter font, metadata, header, footer)
    page.tsx            — home page (single-page scroller)
    hall-hire/
      page.tsx          — hall hire content page
    globals.css         — Tailwind config, colour tokens, base styles
  components/
    Header.tsx          — small fixed header with logo
    Footer.tsx          — gradient footer with contact info
    SectionHeading.tsx  — reusable heading with gradient accent bar
    DonationCard.tsx    — bank details callout for Kāinga section
public/
    smt-logo.jpg        — parish logo (existing)
```

---

## Accessibility Requirements

- WCAG 2.1 Level AA throughout
- All images: descriptive `alt` text
- Keyboard navigable, visible focus indicators
- Min 16px body text, min 44x44px tap targets
- `prefers-reduced-motion` respected (scroll indicator animation)
- Contrast ratio 4.5:1 minimum for all text
- Lighthouse targets: Performance 90+, Accessibility 95+

---

## Out of Scope (unchanged from PRD)

Sermon archive, events calendar, payment gateway, contact form, user accounts, news feed, dark mode, CMS, search, social media feed embedding.
