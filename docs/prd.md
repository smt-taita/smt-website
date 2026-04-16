# St Matt's Anglican Church Taitā Website — Product Requirement Document

**Version:** 1.0
**Date:** 2026-03-02
**Status:** Draft
**Repository:** github.com/mdshearer/smt-website
**Live URL:** https://smt-website-dusky.vercel.app

---

## Overview

St Matt's Anglican Church Taitā is a small Anglican parish serving the Taitā, Pomare, and Avalon neighbourhoods of Lower Hutt, New Zealand. The parish's identity is captured in a single phrase: "One small church with one big heart." It is deliberately whānau-centred rather than institutional, and its most public expressions of mission are its Kāinga social housing development and its community garden/food forest.

The website's purpose is to provide a warm, accessible, and low-maintenance digital front door for the parish. It must serve three distinct audiences:

1. **People who are curious about attending** — they need to know when and where to show up, and what to expect.
2. **Supporters of the Kāinga housing mission** — they need context on the housing project and a clear, trusted path to donate.
3. **Local community members** — they need to know about the community garden and how to get involved.

The site is not a general church information hub. It does not need a sermon archive, events calendar, or news feed. Its value is in being focused, fast, and frictionless. The benchmark is St David's Anglican Church Naenae (stdavidsnaenae.church), but deliberately smaller and simpler.

The site will be a single-page scroller with five core sections. All content will be effectively static, requiring very infrequent updates.

---

## User Personas

### Persona 1: The Curious Newcomer
A local resident — possibly referred by a neighbour or community programme — who wants to know if this church is a place they would feel welcome. They may have low digital confidence. They are browsing on a mobile phone. They want to know: "What time does church start? Where is it? Will I fit in?"

### Persona 2: The Potential Kāinga Donor
A person who has heard about the housing project — perhaps through Diocese networks, a community newsletter, or word of mouth — and wants to learn more and potentially donate. They need enough context to trust the organisation and clear, specific donation instructions.

### Persona 3: The Community Garden Participant
A Taitā resident who participates in, or wants to join, the Wednesday community garden gatherings. They want to confirm gathering times and feel connected to the vision of the garden.

### Persona 4: The Parish Administrator (Malcolm)
The person responsible for maintaining the site. They have technical capability but limited time. They need the site to require minimal content updates and to perform reliably without ongoing intervention.

---

## User Stories

---

### Story 1: Welcome Hero — First Impression and Orientation

**As a** curious newcomer visiting the site for the first time
**I want** to immediately understand who this community is and feel welcomed
**So that** I can decide within seconds whether this feels like a place I belong

**Acceptance Criteria:**
- [ ] The page loads a full-width hero section as the first visible element, above the fold on both mobile and desktop.
- [ ] The hero displays a high-quality photograph of the garden or upgraded hall that communicates warmth, community, and a lived-in space (not a corporate or formal church aesthetic).
- [ ] The hero displays the parish name "St Matt's Anglican Church Taitā" in a clear, legible heading.
- [ ] The hero displays a bicultural greeting — both Te Reo Māori and English — that reflects the parish's commitment to Te Tiriti and its local community (e.g., "Nau mai, haere mai / Welcome").
- [ ] The hero displays the parish's core mission statement: "One small church with one big heart" or equivalent approved copy.
- [ ] All text overlaid on the hero image maintains a minimum contrast ratio of 4.5:1 against the image background (WCAG 2.1 Level AA), achieved through a text overlay, scrim, or solid text block — not by relying on image content alone.
- [ ] The hero section is responsive and renders correctly on screens from 320px width upward.
- [ ] The hero image is optimised for fast loading: served via Next.js `Image` component with appropriate `sizes`, `priority`, and modern format (WebP/AVIF).
- [ ] The page has correct `<html lang="en">` and metadata (`<title>`, `<meta name="description">`) reflecting the parish name and location.
- [ ] There is a visible scroll indicator or natural visual flow that invites the user to continue scrolling.

---

### Story 2: Sunday Service Information — When and Where to Show Up

**As a** curious newcomer
**I want** to find the service time, location, and what to expect when I arrive
**So that** I can confidently attend without needing to contact anyone first

**Acceptance Criteria:**
- [ ] A dedicated section presents the Sunday service information as a visually distinct card or panel.
- [ ] The service time is displayed prominently: **9:30 AM, every Sunday**.
- [ ] The worship location is clearly stated: **53 Reynolds Street, Taitā**.
- [ ] The section communicates that coffee and kai (food) follow every service, establishing the welcoming, informal tone.
- [ ] The address is either a tappable link that opens in a maps application on mobile (using `href="https://maps.google.com/?q=53+Reynolds+St+Taita+Lower+Hutt"` or equivalent), or is accompanied by a clear "Get directions" link.
- [ ] The section uses plain, jargon-free language. No liturgical terms or insider language is used without explanation.
- [ ] The section does not include a sermon archive, event calendar, or any dynamic content — it is static.
- [ ] The section is fully readable without JavaScript enabled (content is server-rendered).

---

### Story 3: Kāinga Housing Mission — Build Understanding and Enable Donations

**As a** potential donor who has heard about the housing project
**I want** to understand what Kāinga is, why it matters, and how to donate with confidence
**So that** I can contribute financially to the housing mission knowing my money will be well used

**Acceptance Criteria:**
- [ ] A dedicated section presents the Kāinga housing mission as a visually distinct card or panel.
- [ ] The section includes a brief, plain-English explanation of the housing project: that the parish has built 8 rental homes on church land (4 one-bedroom, 3 two-bedroom, 1 four-bedroom), that they are single-storey homes designed for community, and that tenants are not required to participate in church activities.
- [ ] The section frames the housing project as the parish's primary expression of social justice and community care, consistent with the "walking the talk" narrative.
- [ ] The section includes a clear donation call-to-action with the bank account details:
  - Bank account number: **02-0610-0070823-00**
  - Reference field instruction: use **"housing"** or **"Kainga"**
- [ ] Bank account details are displayed in a visually distinct format (e.g., a highlighted block or callout) to reduce transcription errors.
- [ ] The section notes that donors receive quarterly financial updates, establishing accountability and trust.
- [ ] The section does not collect financial data, personal data, or payment card details. All donations are made via direct bank transfer. No payment gateway or form is required.
- [ ] The section is accessible: all text meets contrast requirements, and the bank details are selectable text (not an image) so they can be copied.
- [ ] The section does not make claims about tax deductibility or charitable status that cannot be verified — if included, such claims must be confirmed accurate before publication.

---

### Story 4: Community Garden and Food Forest — Invite Participation

**As a** Taitā community member interested in the garden
**I want** to understand when gatherings happen, what we do, and why it matters
**So that** I feel welcome to join without needing a formal invitation

**Acceptance Criteria:**
- [ ] A dedicated section presents the community garden and food forest as a visually distinct card or panel.
- [ ] The section communicates the dual gathering rhythm:
  - **Wednesday gatherings** — open to the neighbourhood, shared labour and produce growing skills
  - **Monthly Sunday gatherings** — for the church community, focused on general maintenance and food forest care
- [ ] The section mentions the connection to **A Rocha Aotearoa NZ** and the parish's official Eco Church status, as this lends credibility and context for environmentally motivated participants.
- [ ] The section explains that produce goes to neighbours in need and to Taitā Pātaka Kai (community food pantry).
- [ ] The section frames participation as accessible to anyone — no experience required, no church membership required.
- [ ] The section uses warm, practical language and avoids jargon.
- [ ] The section is static content — no events calendar, registration form, or dynamic data is required.

---

### Story 5: Contact Footer — Make It Easy to Get in Touch

**As any** site visitor who wants to follow up with the parish
**I want** to find contact details and the address quickly, without hunting
**So that** I can reach out, visit, or verify the organisation is real and legitimate

**Acceptance Criteria:**
- [ ] A footer section presents all contact information in a clear, legible layout.
- [ ] The footer includes the official postal/administrative address: **42 Poole Street, Taitā** (noting this may differ from the worship location).
- [ ] The footer includes the worship location address for clarity: **53 Reynolds Street, Taitā**.
- [ ] The footer includes the phone number: **022 409 7237**, displayed as a tappable `tel:` link on mobile.
- [ ] The footer includes the email address: **admin@stmattstaita.org.nz**, displayed as a tappable `mailto:` link.
- [ ] All contact details are selectable text (not images) for accessibility and usability.
- [ ] The footer does not include a contact form — direct contact via phone and email is sufficient given the audience and maintenance constraints.
- [ ] The footer includes a copyright notice referencing St Matt's Anglican Church Taitā.
- [ ] The footer is the terminal element of the single-page layout; there is no separate contact page.

---

### Story 6: Accessibility and Performance — Serve All Audience Members Equally

**As a** site visitor with low digital literacy, older age, or a disability
**I want** the site to be readable, navigable, and fast on any device
**So that** I am not excluded from accessing information about the parish

**Acceptance Criteria:**
- [ ] The site meets **WCAG 2.1 Level AA** compliance across all sections.
- [ ] All images include descriptive `alt` text that conveys meaning, not just file names.
- [ ] All interactive elements (links, buttons) have a visible focus indicator and are keyboard-navigable.
- [ ] The site is fully operable without a mouse (keyboard-first navigation).
- [ ] Font sizes are a minimum of 16px for body text across all breakpoints; this is not reduced on mobile.
- [ ] Tap targets on mobile are a minimum of 44x44px.
- [ ] The site achieves a Lighthouse Performance score of 90 or above on mobile.
- [ ] The site achieves a Lighthouse Accessibility score of 95 or above.
- [ ] The site loads the critical above-the-fold content in under 2.5 seconds on a standard mobile connection (Core Web Vitals LCP target).
- [ ] The site does not use autoplaying video or animation that cannot be paused (respects `prefers-reduced-motion`).
- [ ] The site renders correctly on the most common mobile browsers in New Zealand: Chrome for Android and Safari for iOS.

---

### Story 7: Privacy and Legal Compliance — Operate Responsibly

**As the** parish administrator
**I want** the website to meet New Zealand privacy and legal obligations
**So that** the parish is not exposed to regulatory risk

**Acceptance Criteria:**
- [ ] No personally identifiable information (PII) from visitors is collected by the site. There are no contact forms, newsletter sign-ups, or analytics tools that collect user-level data. If any analytics are added in future, they must be privacy-preserving (e.g., aggregated, cookieless).
- [ ] No photographs of identifiable individuals are published on the site without documented consent, in compliance with the **Privacy Act 2020 (NZ)**.
- [ ] If any photographs include minors, written parental consent is required and documented by the parish prior to publication.
- [ ] The site does not set tracking cookies. If third-party scripts are added that set cookies, a cookie consent mechanism compliant with applicable law must be implemented.
- [ ] The bank account details displayed for donations are confirmed accurate before go-live and verified with the parish administrator.
- [ ] The site does not make unsubstantiated claims about tax deductibility for donations.

---

## Design Considerations

No DESIGN-CONSTITUTION.md currently exists in this repository. One should be created before development begins. The following principles are derived from the research and should form the basis of that document.

### Guiding Principles

**1. Warmth over formality.** The site must never feel like a corporate or institutional church website. Typography, imagery, and copy should feel like they come from real people in a real community.

**2. Simplicity over comprehensiveness.** Every element on the page must earn its place. The site serves three narrow purposes; anything that does not serve those purposes is out of scope.

**3. Accessibility is non-negotiable.** The primary audience includes older parishioners, community members with low digital literacy, and people accessing the site on older mobile devices on mobile data. The site must work for them first.

**4. Bicultural by default.** Te Reo Māori greetings and terms (e.g., "whānau", "kai", "Kāinga", "Pātaka Kai") are used naturally and respectfully throughout the site. They are not translated parenthetically unless context makes meaning unclear. The HTML `lang` attribute must be set correctly, and Te Reo terms should use `<span lang="mi">` where appropriate for screen reader compatibility.

**5. Mobile-first layout.** The single-page scroller is designed for a phone screen first and scaled up for desktop. Card-based layout for the five core sections is the recommended pattern.

**6. Low maintenance by design.** Content must be static. No CMS, no dynamic data fetching, no database connections. If copy needs updating once a year, that is acceptable. Monthly updates are a failure of the design.

### Typography
A font pairing that conveys warmth and approachability is preferred over the default Geist typeface. Suggestions for consideration: a humanist sans-serif for body text (e.g., Inter, Source Sans Pro) paired with a slightly more characterful heading typeface. Final font selection should be validated against performance (Google Fonts or self-hosted via `next/font`).

### Colour
A palette grounded in natural tones — greens reflecting the garden, earthy warmth — is appropriate. Avoid the cold blues and greys typical of institutional church websites. A minimum colour contrast ratio of 4.5:1 for normal text and 3:1 for large text must be maintained throughout.

### Photography
High-quality, authentic photographs of the garden, hall interior, and community gatherings will be the primary visual content. Stock photography is not appropriate. Photos must be sourced from the parish with appropriate consent.

### No Dark Mode Requirement
Given the audience and the maintenance constraint, dark mode support is not required for the initial release. The site will render in light mode only.

---

## Technical Constraints

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript. This is fixed.
- **Styling:** Tailwind CSS v4. This is fixed. No additional CSS-in-JS library should be introduced.
- **Component library:** No shadcn/ui or other component library is currently installed. Components should be built with Tailwind CSS utilities. A component library may be added if the complexity justifies it, but is not required for this scope.
- **Deployment:** Vercel with GitHub auto-deploy from the `main` branch. The build must pass `next build` cleanly.
- **Rendering:** All five sections must be server-rendered (React Server Components). No client-side data fetching. No `"use client"` directive unless strictly necessary for interactivity (e.g., a mobile navigation menu).
- **Images:** All images must be served through the Next.js `Image` component with appropriate `alt`, `width`, `height`, and `sizes` props. No raw `<img>` tags.
- **No database:** The site is fully static. No Supabase, no API routes, no server actions are required for initial scope.
- **No CMS:** Content is hardcoded in the application. If content management becomes a requirement in future, that is a separate project.
- **Dependencies:** The dependency footprint should be kept minimal. No heavy third-party libraries for functionality that can be achieved with native HTML, CSS, or small Tailwind utilities.
- **Note on package.json:** The `package.json` currently lists `react: "19.2.3"` as a dependency. The project description references "Next.js 16" but the actual version in `package.json` is `next: "16.1.6"`. All development should reference the actual installed versions.

---

## Out of Scope

The following are explicitly excluded from this PRD. They may be addressed in future PRDs.

- **Sermon archive or podcast feed** — not required, no audio/video hosting
- **Events calendar** — the gathering schedule is static; no dynamic calendar is needed
- **Online giving / payment gateway** — donations are via direct bank transfer only
- **Contact form** — direct contact via phone and email is sufficient
- **User accounts or member portal** — not required
- **News or announcements feed** — not required for launch
- **Whakahaere compliance schedule** — this is an admin-facing tool, not a public-facing feature; may be addressed in a separate internal tool
- **AED location section** — deferred until the AED is installed (target 2028)
- **Insurance and H&S documentation pages** — internal admin, out of scope
- **Diocese reporting schedule** — internal admin, out of scope
- **Search functionality** — the site is too small to require search
- **Multi-language versions** — Te Reo terms are integrated naturally into English content; a full Te Reo version of the site is not in scope
- **Social media integration / feed embedding** — not required; social links in footer are acceptable if the parish has active accounts
- **Dark mode** — not required for initial release
- **CMS integration** — not required for initial release

---

## Success Metrics

Success for this project is defined by qualitative and technical outcomes, not traffic volume.

| Metric | Target | How to Measure |
|---|---|---|
| Lighthouse Performance (mobile) | Score 90 or above | Lighthouse audit in Chrome DevTools or CI |
| Lighthouse Accessibility | Score 95 or above | Lighthouse audit |
| Core Web Vitals LCP (mobile) | Under 2.5 seconds | Vercel Speed Insights or PageSpeed Insights |
| WCAG 2.1 Level AA compliance | Full compliance across all sections | Manual audit + axe DevTools browser extension |
| Accurate contact and service information | Zero errors on go-live | Manual review by parish administrator before launch |
| Bank account details verified | Confirmed correct before go-live | Sign-off from parish administrator |
| Photo consent documentation | All published photos covered | Consent records held by parish |
| Maintenance burden | No unplanned content updates required in first 6 months | Administrator feedback |
| Visitor comprehension (qualitative) | New visitors can identify service time and location within 10 seconds | Informal usability test with 2–3 community members unfamiliar with the site |

---

## Open Questions — Resolved

| # | Question | Resolution |
|---|---------|------------|
| 1 | **Photography** | Photo placeholders for now. Real photos to be added later with consent. |
| 2 | **Te Reo copy** | Ready — reviewer available. |
| 3 | **Mission statement copy** | Ready — "One small church with one big heart" confirmed. |
| 4 | **Charitable status claim** | To be confirmed — not blocking for launch. |
| 5 | **Social media** | Facebook: https://www.facebook.com/profile.php?id=100088895017140 — link in footer. |
| 6 | **Domain** | Custom domain confirmed — `stmattstaita.org.nz` will be configured. |
| 7 | **Analytics** | Not required for initial release. |
| 8 | **Quarterly update process** | To be confirmed — not blocking for launch. |

## Assets

- **Logo:** `public/smt-logo.jpg` — a stylised woven cross in black, white, and red with tukutuku-inspired patterning, reflecting the parish's bicultural identity. Should be used in the header/hero and as the favicon (converted to appropriate formats).
