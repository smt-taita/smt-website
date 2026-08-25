# Patterns

Things that worked here and are worth repeating. Format and conventions: `README.md` in this
folder.

---

## 2026-07-29: The printed poster is the source of truth for what's on, and in what order

**What worked:** Maria's feedback was "follow the same order of the week that is on our poster",
with the poster attached. Reading the poster image directly — rather than working from the
prose in her email — surfaced detail the email didn't mention at all: the Whānau Family Support
Services Trust coordination, the Thursday Walter Nash distribution, the $15 co-op bag, and both
pick-up windows.

The poster is what the congregation actually sees on the wall. When the site and the poster
disagree, the poster is right and the site is stale.

**Rules:**
- Ask for the current poster when activity times or ordering change, and read it as an image.
- Order activities by day of the week, matching the poster, rather than by visual balance.
- Content that only exists on the poster is still content — pull it across rather than
  paraphrasing the summary in the email.

**Triggers:** "follow the poster", "what's on", activity times changing, "reorder the
activities", new "What's On" poster from Maria.

---

## 2026-07-29: Publishing a phone number is a decision for the church, not a default

**What worked:** Maria's leadership copy said to "get in contact with a member of the Leadership
Team" without giving numbers, while the poster lists all four mobiles. The site used the
`admin@stmattstaita.org.nz` address and flagged the choice rather than publishing four personal
mobiles unasked.

That turned out to matter in both directions: the Small Groups section (added separately) already
publishes Maria's and Caro's numbers, so the question wasn't "numbers or not" but "whose, and
where" — and two of the four had never been on the public web.

**Rules:**
- A number printed on a poster handed out at church is not thereby cleared for a public website;
  scraping makes the reach different in kind.
- When copy implies contact but omits the contact details, use the shared address and ask —
  don't infer the numbers from another source.
- Check what the site already exposes before deciding. The answer changes.

**Triggers:** "add contact details", "who do people call", pastoral contact, adding a phone
number to any page, "put the leaders on there".

---

## 2026-07-29: Deployment facts that aren't guessable from the repo

**What worked:** Writing the non-obvious deployment shape into `README.md` where the next
person hits it, instead of leaving it only in a dated plan document.

The facts that cost time to establish:

- Hosting is **Vercel** (project `smt-website`), auto-deploying on every push to `main`.
- DNS is **not** at Vercel — it's at **iwantmyname**. The apex points at Vercel via an `A`
  record; `www` is a permanent (308) redirect to the apex.
- The domain also carries **Google Workspace email** (`admin@stmattstaita.org.nz`). MX records
  must be left alone when touching DNS.
- `housing.stmattstaita.org.nz` is a **separate** Vercel project (`smt-housing`) on the same
  domain.
- The `*.vercel.app` URLs are team-gated, which is why the site felt like it was in "test mode";
  custom domains are public automatically, so attaching the domain was the whole go-live step.

**Rules:**
- Check live state with `vercel domains inspect <domain>` and `dig` rather than trusting a plan
  document — a go-live doc is a snapshot, and this one was 11 days stale by the time it was used.
- Registrar changes need Malcolm; everything Vercel-side can be done from the CLI.

**Triggers:** "point it at the domain", "DNS", "go live", "iwantmyname", "www redirect",
"is it live", "add a subdomain", anything touching MX or email.

---

## The three parts of a Google result are controlled by three different things

**Date:** 2026-08-25

A search result has three lines, and they come from three separate places. Reaching for the
meta description fixes only one of them.

| Line in the result | Comes from |
| --- | --- |
| **Site name + favicon** (top) | `WebSite` JSON-LD `name` — **homepage only**; icon from `src/app/icon.svg` |
| **Blue title link** | `<title>`, i.e. `metadata.title` in `layout.tsx` |
| **Grey snippet** | The meta description *if Google likes it*, otherwise text scraped from the page |

Things worth knowing:

- `og:site_name` is **not** the site-name signal for Google — it was already set here and Google
  still showed the bare domain `stmattstaita.org.nz`. `WebSite` structured data is what it reads,
  and it only reads it from the homepage, which is why `WebSiteSchema` renders in `page.tsx`
  rather than sitewide in the layout.
- Keep the `WebSite` `name` short (`St Matt's Taitā`). The full church name is already the title
  on the next line, so using it in both spots just repeats itself.
- The favicon must survive 16px. `smt-logo.jpg` is a hand-drawn cross with hatching and grid
  texture that greys out below ~64px, so `icon.svg` is a flat rebuild of the same mark. Render it
  at 16/24/32px on both white and grey before believing it works — and keep the crossbar above
  centre, or it reads as a first-aid symbol.
- None of this is binding on Google. It picks what it wants; you're supplying better options.
  Deploy, then request re-indexing in Search Console — otherwise it's weeks before anything moves.

**Triggers:** "search result shows the domain instead of our name", "site name in Google",
"favicon in search results", "og:site_name isn't working", "WebSite schema", editing `icon.svg`.
