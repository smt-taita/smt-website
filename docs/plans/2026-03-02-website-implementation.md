# St Matt's Taitā Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the single-page church website with hall hire subpage, using the approved design system from `docs/plans/2026-03-02-website-design.md`.

**Architecture:** Next.js 16 App Router with React Server Components. Single `page.tsx` for the home scroller, `/hall-hire/page.tsx` for the content page. Shared layout with Header and Footer. All content is static — no client-side fetching, no database, no CMS.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 (CSS-based config via `@theme inline`), `next/font/google` for Inter.

**Design reference:** `docs/plans/2026-03-02-website-design.md`
**PRD reference:** `docs/prd.md`

---

### Task 1: Design System — Globals, Tokens, Font

**Files:**
- Modify: `src/app/globals.css` (replace entirely)
- Modify: `src/app/layout.tsx` (replace Geist with Inter, update metadata)

**Step 1: Replace `globals.css` with design system tokens**

Replace the entire contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --church-blue: hsl(210, 40%, 20%);
  --church-green: hsl(150, 30%, 30%);
  --church-amber: hsl(35, 85%, 55%);
  --church-slate: hsl(210, 10%, 40%);
  --background: #ffffff;
  --foreground: var(--church-slate);
}

@theme inline {
  --color-church-blue: var(--church-blue);
  --color-church-green: var(--church-green);
  --color-church-amber: var(--church-amber);
  --color-church-slate: var(--church-slate);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-inter);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), system-ui, sans-serif;
}

/* Scroll indicator bounce animation */
@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.animate-gentle-bounce {
  animation: gentle-bounce 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-gentle-bounce {
    animation: none;
  }
}
```

**Step 2: Update `layout.tsx` with Inter font and metadata**

Replace the entire contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "St Matt's Anglican Church Taitā",
  description:
    "One small church with one big heart. Join us Sundays at 9:30 AM, 53 Reynolds Street, Taitā.",
  openGraph: {
    title: "St Matt's Anglican Church Taitā",
    description:
      "One small church with one big heart. Serving the Taitā, Pomare, and Avalon communities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify the build compiles**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: set up design system with church colour tokens and Inter font"
```

---

### Task 2: Shared Components — Header, Footer, SectionHeading

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/SectionHeading.tsx`

**Step 1: Create `src/components/Header.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/smt-logo.jpg"
            alt="St Matt's Taitā logo — a woven cross in black, white, and red"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-church-blue font-semibold text-lg">
            St Matt&apos;s Taitā
          </span>
        </Link>
      </div>
    </header>
  );
}
```

**Step 2: Create `src/components/Footer.tsx`**

```tsx
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-church-blue to-church-green text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo and name */}
          <div className="flex items-center gap-3">
            <Image
              src="/smt-logo.jpg"
              alt="St Matt's Taitā logo"
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
            />
            <span className="font-bold text-xl">
              St Matt&apos;s Anglican Church{" "}
              <span lang="mi">Taitā</span>
            </span>
          </div>

          {/* Addresses */}
          <div className="flex flex-col sm:flex-row gap-6 text-white/90">
            <div>
              <p className="font-semibold text-white">Visit us</p>
              <p>53 Reynolds Street, Taitā</p>
            </div>
            <div>
              <p className="font-semibold text-white">Post</p>
              <p>42 Poole Street, Taitā</p>
            </div>
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/90">
            <a
              href="tel:+64224097237"
              className="hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              022 409 7237
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href="mailto:admin@stmattstaita.org.nz"
              className="hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              admin@stmattstaita.org.nz
            </a>
          </div>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100088895017140"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-church-amber transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Visit our Facebook page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Copyright */}
          <p className="text-white/60 text-sm">
            &copy; 2026 St Matt&apos;s Anglican Church{" "}
            <span lang="mi">Taitā</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Create `src/components/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

export default function SectionHeading({
  children,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <div className="w-24 h-1 bg-gradient-to-r from-church-blue to-church-green rounded-full mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold text-church-blue">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-xl text-church-slate">{subtitle}</p>
      )}
    </div>
  );
}
```

**Step 4: Verify the build compiles**

Run: `npm run build`
Expected: Build succeeds (components aren't used yet but should compile).

**Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: add Header, Footer, and SectionHeading shared components"
```

---

### Task 3: Home Page — Hero Section

**Files:**
- Modify: `src/app/page.tsx` (replace entirely)
- Modify: `src/app/layout.tsx` (add Header to layout)

**Step 1: Add Header to layout**

In `src/app/layout.tsx`, import and add `Header` inside `<body>` before `{children}`. Add `pt-14` to body or a wrapper to offset the fixed header.

```tsx
import Header from "@/components/Header";
// ... existing imports

// Inside the body:
<body className={`${inter.variable} font-sans antialiased`}>
  <Header />
  <main className="pt-14">
    {children}
  </main>
</body>
```

**Step 2: Replace `page.tsx` with Hero section**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen bg-gradient-to-br from-church-blue to-church-green flex items-center justify-center -mt-14">
        <div className="text-center text-white px-6 py-24">
          <div className="mx-auto mb-8 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white p-2 flex items-center justify-center">
            <Image
              src="/smt-logo.jpg"
              alt="St Matt's Taitā logo — a woven cross in black, white, and red"
              width={112}
              height={112}
              className="rounded-full"
              priority
            />
          </div>
          <p className="text-lg md:text-xl text-white/80 mb-1" lang="mi">
            Nau mai, haere mai
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-6">Welcome</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
            St Matt&apos;s Anglican Church{" "}
            <span lang="mi">Taitā</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            One small church with one big heart
          </p>

          {/* Scroll indicator */}
          <div className="mt-16 animate-gentle-bounce" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-white/60"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
```

**Step 3: Verify the build and visually check**

Run: `npm run build`
Expected: Build succeeds.

Run: `npm run dev` (on port 5001)
Check: http://localhost:5001 — hero should show gradient background, logo, bicultural greeting, heading, tagline, and scroll indicator.

**Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: add hero section with bicultural greeting and scroll indicator"
```

---

### Task 4: Home Page — Sunday Rhythm Section

**Files:**
- Modify: `src/app/page.tsx` (add section after Hero)

**Step 1: Add Sunday Rhythm section below the Hero closing `</section>` tag**

```tsx
{/* Sunday Rhythm */}
<section className="bg-white py-16 md:py-24">
  <div className="max-w-4xl mx-auto px-6">
    <SectionHeading>Join Us Sunday</SectionHeading>
    <div className="bg-white rounded-xl border-l-4 border-church-amber p-8 shadow-sm">
      <p className="text-4xl md:text-5xl font-bold text-church-blue mb-4">
        9:30 AM
      </p>
      <p className="text-lg mb-2">
        <a
          href="https://maps.google.com/?q=53+Reynolds+Street+Taita+Lower+Hutt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-church-blue hover:text-church-green transition-colors underline underline-offset-4"
        >
          53 Reynolds Street, <span lang="mi">Taitā</span>
        </a>
      </p>
      <p className="text-church-slate text-lg">
        Every Sunday, followed by coffee and{" "}
        <span lang="mi">kai</span> together.
      </p>
    </div>
  </div>
</section>
```

Add the SectionHeading import at the top of `page.tsx`:
```tsx
import SectionHeading from "@/components/SectionHeading";
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Sunday Rhythm section with service time and location"
```

---

### Task 5: Home Page — Kāinga Housing Section

**Files:**
- Create: `src/components/DonationCard.tsx`
- Modify: `src/app/page.tsx` (add section)

**Step 1: Create `src/components/DonationCard.tsx`**

```tsx
export default function DonationCard() {
  return (
    <div className="bg-white rounded-xl border-2 border-church-blue p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-church-blue mb-4">
        Support Our Housing Mission
      </h3>
      <div className="bg-slate-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-church-slate mb-1">Bank account</p>
        <p className="font-mono text-lg font-semibold text-church-blue select-all">
          02-0610-0070823-00
        </p>
      </div>
      <p className="text-church-slate mb-2">
        Reference: <span className="font-semibold">&quot;housing&quot;</span> or{" "}
        <span className="font-semibold">&quot;Kainga&quot;</span>
      </p>
      <p className="text-sm text-church-slate">
        Quarterly updates provided to all supporters.
      </p>
    </div>
  );
}
```

**Step 2: Add Kāinga section to `page.tsx` after Sunday Rhythm**

```tsx
{/* Kāinga Housing */}
<section className="bg-slate-50 py-16 md:py-24">
  <div className="max-w-4xl mx-auto px-6">
    <SectionHeading subtitle="More than housing — we're building community">
      St Matt&apos;s <span lang="mi">Kāinga</span>
    </SectionHeading>
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <p className="text-lg text-church-slate leading-relaxed mb-4">
          Eight warm, dry homes built on our church site by the Anglican
          Diocese — four one-bedroom, three two-bedroom, and one
          four-bedroom — providing affordable housing for families and
          individuals in{" "}
          <span lang="mi">Taitā</span>.
        </p>
        <p className="text-lg text-church-slate leading-relaxed mb-6">
          Single-storey and designed for community, our{" "}
          <span lang="mi">Kāinga</span> residents are welcome
          neighbours with no obligation to participate in church
          activities.
        </p>
        <a
          href="https://housing.stmattstaita.org.nz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-church-blue hover:text-church-green transition-colors font-medium underline underline-offset-4"
        >
          Read the full Kāinga story &rarr;
        </a>
      </div>
      <DonationCard />
    </div>
  </div>
</section>
```

Add the DonationCard import at the top of `page.tsx`:
```tsx
import DonationCard from "@/components/DonationCard";
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/components/DonationCard.tsx src/app/page.tsx
git commit -m "feat: add Kāinga housing section with donation card"
```

---

### Task 6: Home Page — Community Garden Section

**Files:**
- Modify: `src/app/page.tsx` (add section)

**Step 1: Add Community Garden section after Kāinga**

```tsx
{/* Community Garden */}
<section className="bg-white py-16 md:py-24">
  <div className="max-w-4xl mx-auto px-6">
    <SectionHeading>Community Garden &amp; Food Forest</SectionHeading>
    <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm mb-6">
      <p className="text-sm font-medium text-church-green mb-4">
        Official Eco Church with A Rocha Aotearoa NZ
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-church-blue text-lg mb-2">
            Wednesdays
          </p>
          <p className="text-church-slate">
            Open to everyone in the neighbourhood. Come along for
            shared mahi in the garden and learn to grow your own
            kai.
          </p>
        </div>
        <div>
          <p className="font-semibold text-church-blue text-lg mb-2">
            Monthly Sundays
          </p>
          <p className="text-church-slate">
            Church <span lang="mi">whānau</span> gather for
            general maintenance and food forest care.
          </p>
        </div>
      </div>
    </div>
    <p className="text-church-slate text-lg leading-relaxed">
      Produce is shared with neighbours in need and{" "}
      <span lang="mi">Taitā Pātaka Kai</span>. No
      experience needed — everyone is welcome.
    </p>
  </div>
</section>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Community Garden section with gathering schedule"
```

---

### Task 7: Home Page — Hall Hire Teaser Section

**Files:**
- Modify: `src/app/page.tsx` (add section)

**Step 1: Add Hall Hire teaser after Community Garden**

```tsx
{/* Hall Hire */}
<section className="bg-slate-50 py-16 md:py-24">
  <div className="max-w-4xl mx-auto px-6">
    <SectionHeading>Hall Hire</SectionHeading>
    <div className="bg-white rounded-xl border-l-4 border-church-amber p-8 shadow-sm">
      <p className="text-lg text-church-slate leading-relaxed mb-4">
        Our hall and meeting rooms are available for community groups
        across <span lang="mi">Taitā</span>, Pomare, and Avalon.
        From $15/hour.
      </p>
      <a
        href="/hall-hire"
        className="inline-flex items-center bg-church-amber text-white hover:bg-amber-600 transition-colors px-6 py-3 rounded-xl font-semibold min-h-[44px]"
      >
        View booking details &amp; conditions
      </a>
    </div>
  </div>
</section>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Hall Hire teaser section with link to details page"
```

---

### Task 8: Home Page — Add Footer to Layout

**Files:**
- Modify: `src/app/layout.tsx` (add Footer)

**Step 1: Import and add Footer to layout**

In `src/app/layout.tsx`, import Footer and add it after `</main>`:

```tsx
import Footer from "@/components/Footer";
// ... existing imports

// Inside the body, after </main>:
<Footer />
```

**Step 2: Verify build and visual check**

Run: `npm run build`
Expected: Build succeeds.

Run dev server and check: all 5 home sections visible with gradient footer at bottom.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add gradient contact footer to shared layout"
```

---

### Task 9: Hall Hire Page

**Files:**
- Create: `src/app/hall-hire/page.tsx`

**Step 1: Create the hall hire page**

Create `src/app/hall-hire/page.tsx` with the full hall hire content. This is a standard content page using SectionHeading and the shared layout (Header + Footer come from layout.tsx automatically).

The page should contain:
- Page metadata with title "Hall Hire | St Matt's Anglican Church Taitā"
- Heading: "Hireage of St Matt's Taitā"
- Introduction paragraph about facilities being a community resource
- **Facilities section** with three subsections: Hall/Kitchen/Foyer, Front Meeting Room, Sacred Space
- **Charges table** rendered as an HTML `<table>` or a styled list: main hall $20/hr, meeting rooms $15/hr, full day negotiated, bond $100
- **Conditions of use** with clear h3 headings: Alcohol, Cleaning, Rubbish/Recycling, Storage, Damage, Car Parking, Power, Keys, Earthquake procedure
- **Booking section**: email link to admin@stmattstaita.org.nz, bank details (02-0610-0070823-00), key policy
- Back link to home page

All content comes verbatim from the hall hire text provided by Malcolm (stored in conversation context). Use `prose`-style typography: `text-lg leading-relaxed text-church-slate` for body, `text-xl font-bold text-church-blue` for h3s.

The page layout: white background, `max-w-4xl mx-auto px-6 py-16 md:py-24`, with SectionHeading at top and gradient accent bars between major sections.

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with `/hall-hire` as a static route.

**Step 3: Visual check**

Run dev server, navigate to http://localhost:5001/hall-hire
Check: content renders, header and footer appear, back link works.

**Step 4: Commit**

```bash
git add src/app/hall-hire/
git commit -m "feat: add Hall Hire page with facilities, charges, and conditions"
```

---

### Task 10: Final Polish — Build, Lint, Push

**Files:**
- Possibly minor fixes across any file

**Step 1: Run lint**

Run: `npm run lint`
Expected: No errors. Fix any that appear.

**Step 2: Run production build**

Run: `npm run build`
Expected: Clean build with all routes listed.

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: lint and build fixes"
```

(Skip if no changes needed.)

**Step 4: Push to GitHub**

```bash
git push origin main
```

Vercel will auto-deploy from the push. Check https://smt-website-dusky.vercel.app to verify the deployed site.

**Step 5: Verify deployment**

Check the live site loads correctly with all sections and the hall hire page.
