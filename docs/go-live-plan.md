# St Matt's Taitā Website — Go-Live Plan

**Date:** 2026-07-18
**Status:** Content decisions locked — ready to implement (§1–3). Only go-live mechanics (§4) still need current Vercel/DNS state.
**Trigger:** Maria confirmed final content ("Information to send to Malcs for website")

## Decisions locked (2026-07-18)
- **Bank account name in payment blocks:** use the exact registered payee name
  **`SAINT MATTHEWS - TAITA`** verbatim (no macron, no apostrophe, no "St Matt's") — banks
  match on the registered name, so it must be exact. "St Matt's" stays as the brand everywhere
  else.
- **Monthly rhythm:** GO/INVITE is the **last Sunday of each month** (Maria's copy). Correct the
  Activities card, which currently says "every second month".
- **Execution:** implement §1–3 (content + phone-bug fix) on a branch; run `npm run build` +
  `npm run lint`; show diff before shipping.

The site has been in test mode on Vercel (`smt-website-dusky.vercel.app`) for a while.
This plan captures the content changes Maria confirmed and the steps to fully publish.

---

## 1. Content changes from Maria (mapped to files)

### A. NEW — Welcome popup on site load
Maria: *"New to site description/text (idea is for it to pop up on site as soon as someone
clicks on to it — same as St Matt's Brooklyn)."*

A modal that appears on first visit. Copy:

> **Nau mai, Haere mai!**
> We meet every Sunday at 9.30am at 53 Reynolds St Taitā.
> On the last Sunday of each month, we have a rhythm of GO (where we serve in our
> neighbourhood) or INVITE (where we invite our friends and neighbours to a more relaxed
> church gathering).
> Our time together typically runs for about an hour and a half and includes worship, prayer,
> teaching and reflection for tamariki and adults, discussion, communion, and a kids'
> programme. As well as coffee + good kai afterwards — all welcome!

- **New component** (e.g. `src/components/WelcomeModal.tsx`), rendered from `layout.tsx`.
- Dismiss on close / outside click / Esc; remember dismissal (localStorage) so it doesn't
  nag returning visitors.
- Respect `prefers-reduced-motion`; focus-trap for accessibility; 44px close target.
- Reference pattern: St Matthew's Brooklyn (Wellington) site popup.

### B. New tagline — replaces "One small church with one big heart"
New: **"Transformed by Jesus, Transforming our Neighbourhood."**

Current occurrences to update:
- `src/app/page.tsx:29` — hero subtitle.
- `src/app/layout.tsx:16` — `metadata.description`.
- `src/app/layout.tsx:20` — `openGraph.description`.
- `docs/prd.md` — narrative reference (doc only, update for consistency).

### C. Sunday service description
Maria: *"Little description about what Sunday service involves — see same text as above."*
Same copy as the welcome popup (section A). The homepage "Join Us Sunday" section
(`page.tsx:52–74`) is currently just time + address + "coffee and kai". Expand it to include
the ~1.5hr service description and the monthly GO/INVITE rhythm.

**Decision (locked):** update the Activities "Go Sunday" card (`page.tsx:158–169`) from
*"Last Sunday of every **second** month"* to **last Sunday of each month**, and reflect the
GO/INVITE rhythm (GO = serve the neighbourhood, INVITE = relaxed gathering for friends).

### D. Giving intro — NEW intro text above bank details
Maria's copy:

> St Matt's makes a big difference in our neighbourhood thanks to the generosity of our people.
> If you call this place 'home' and would like to give, here are the details:
> 02-0610-0070823-00, St Matthew's Taitā.
> Add your full name as a reference and all giving is tax deductible with receipts emailed at
> the end of the tax year.

- Add intro paragraph to the giving `<details>` block (`page.tsx:95–112`).
- Account number `02-0610-0070823-00` — **matches** what's live. ✅
- **Account name (locked):** show the exact registered payee name **`SAINT MATTHEWS - TAITA`**
  verbatim. Update it in **both** payment blocks:
  - Giving block `page.tsx:102–104` (currently "St Matt's Taitā").
  - Hall-hire payment block `hall-hire/page.tsx:349–351` (currently "St Matt's Taitā").
  Do **not** apply a macron or apostrophe here — it must match the bank record exactly. "St
  Matt's" remains the brand name everywhere else on the site.

### E. Small Groups — NEW section
Maria's copy:

> We have a number of small groups that are running regularly. If you are keen to be part of
> one, get in contact with Maria (022 409 7237) or Caro (021 124 8354).

- New homepage section (fits well after Activities / before Hall Hire).
- Maria's number `022 409 7237` = the existing church contact number. ✅
- Caro `021 124 8354` — new contact.

---

## 2. Bug found while reviewing (unrelated to Maria, but fix before go-live)

- **Hall-hire phone is missing a digit.** `src/app/hall-hire/page.tsx:327` links
  `tel:+6422409237` (9 digits) — should be `tel:+64224097237` to match the footer and the
  022 409 7237 number. Currently dials a wrong/incomplete number.

---

## 3. Copy conventions to apply to Maria's text

- **Macron on Taitā** everywhere (Maria's source drops it in places).
- **NZ spelling:** "neighbours" not "neighbors" (Maria's INVITE line uses US spelling).
- Wrap te reo Māori (Taitā, kai, tamariki, karakia) in `<span lang="mi">`.
- `&apos;` for apostrophes in JSX; keep "St Matt's" as the brand name.

---

## 4. Publish / go-live checklist (getting out of "test mode")

These are the mechanical steps to make it the real public site. **Need to confirm current
Vercel + DNS state — see open questions.**

- [ ] **Custom domain.** The email (`admin@stmattstaita.org.nz`) and housing subdomain
      (`housing.stmattstaita.org.nz`) already use `stmattstaita.org.nz`, so the domain exists.
      Connect the apex + `www` to this Vercel project and set the canonical redirect.
- [ ] **Remove Vercel Deployment Protection** (password / preview-only), if enabled — that's
      the most likely thing keeping it in "test mode".
- [ ] **Metadata / SEO:** confirm title + description reflect the new tagline; add a proper
      OG image (currently none); verify favicon (`icon.svg` / app icon).
- [ ] **Replace the boilerplate `README.md`** (still the create-next-app default).
- [ ] **Remove unused starter assets** in `public/` (`next.svg`, `vercel.svg`, `globe.svg`,
      `file.svg`, `window.svg`) — optional tidy.
- [ ] Final proof on mobile (primary audience per PRD).
- [ ] `npm run build` + `npm run lint` clean before deploy.

---

## 5. Vercel / DNS state (verified 2026-07-18 via Vercel CLI)

**Access:** Vercel CLI is installed and logged in as `mdshearer`; this folder is linked to the
`smt-website` project (`malcolm-colman-shearers-projects/smt-website`). No extra access needed.

**Current state — why it's still "test mode":** the real domain was never pointed at this site.
- `stmattstaita.org.nz` exists in the Vercel account; DNS managed at **iwantmyname.com**
  (nameservers dns1/2/3.iwantmyname.com).
- Only `housing.stmattstaita.org.nz` is assigned — and it's on the **`smt-housing`** project.
- The apex `stmattstaita.org.nz` + `www` are **not** pointed at Vercel yet (Vercel wants
  `A stmattstaita.org.nz 76.76.21.21`).
- Deployment protection (confirmed via API 2026-07-18): `ssoProtection =
  all_except_custom_domains`, `passwordProtection = null`, `trustedIps = null`. Meaning: the
  `*.vercel.app` URLs are team-gated (hence the "test mode" feel), but **custom domains are
  automatically public**. No protection toggle is needed to go live — attaching the domain is
  sufficient.

**Go-live steps (do after content §1–3 is shipped):**
1. Add `stmattstaita.org.nz` + `www.stmattstaita.org.nz` to the **smt-website** project
   (`vercel domains add …` or dashboard).
2. Add DNS at **iwantmyname** — `A` apex → `76.76.21.21`, `CNAME www` → `cname.vercel-dns.com`.
   *(Needs Malcolm's iwantmyname login — Claude can't reach the registrar.)*
3. Decide apex-vs-www canonical redirect.
   *(No deployment-protection change needed — custom domains are already public; see above.)*
