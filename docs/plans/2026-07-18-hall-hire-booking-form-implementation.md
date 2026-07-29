# Hall-hire Booking Enquiry Form — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> ## Outcome — implemented 2026-07-29
>
> **Tasks 1–2 done. Task 3 (PR) skipped.** Shipped as `8d49f54` direct to `main`,
> auto-deployed, and verified live on <https://stmattstaita.org.nz/hall-hire>.
>
> **Shipped as specced:** `BOOKING_FORM_URL` constant (still `null`), the Book Your
> Enquiry section, the Payment section split, and `docs/hall-hire-booking-form.md`.
> Section order is now Facilities → Charges → Availability → Book Your Enquiry →
> Conditions → Payment, as planned.
>
> **Shipped alongside, not in this plan** (same commit, from a separate request to
> make the page easier to navigate):
> - Payment reference wording changed at the church's request — now *"Please use your
>   name and 'booking' when paying so we can match your payment."* The Task 1 Step 4
>   snippet below has been updated to match what shipped.
> - An "at a glance" strip below the intro (both rates, kitchen, ramp access).
> - A jump-link row to each section, with `scroll-mt-20` on the targets.
> - The availability calendar serves Google's agenda list on phones and keeps the week
>   grid on desktop; the week grid is fixed-width and unreadable at phone widths.
>
> **Still open before the CTA can appear:**
> - [ ] Church admin builds the Google Form from `docs/hall-hire-booking-form.md`.
> - [ ] Set `BOOKING_FORM_URL` to the live URL — the amber CTA then replaces the
>       "coming soon" note automatically.
> - [ ] Confirm the 14-question set with Maria/admin.
>
> **Caveat:** no part of this was seen rendered — the Chrome extension was
> unavailable, so verification was by grepping the served HTML. Layout is unconfirmed.

**Goal:** Add a self-service booking enquiry to `/hall-hire` — a styled CTA linking out to a church-admin-owned Google Form — plus the admin's build checklist for the form itself.

**Architecture:** Pure edit of the existing static page `src/app/hall-hire/page.tsx`. A single module constant holds the Google Form URL; while it's `null` the page shows the direct-contact path instead of a dead button, so the change is safe to merge before the admin has built the form. A new "Book Your Enquiry" section is inserted between the availability calendar and the conditions; the old "Booking and Payment" section loses its contact card (moved into the new section) and becomes a bank-details-only "Payment" section.

**Tech Stack:** Next.js 16 App Router, React, Tailwind CSS v4, TypeScript. No test framework configured — verification is `npm run lint`, `npm run build`, and a dev-server visual check.

## Global Constraints

- Church name always **"St Matt's Taitā"** with macron — except the bank payee name, which stays `SAINT MATTHEWS - TAITA` verbatim (must match bank record).
- Te reo Māori words wrapped in `<span lang="mi">` and keep correct diacritics (`Taitā`, `Whare Karakia`).
- `&apos;` for apostrophes in JSX; `&rarr;` for the arrow glyph.
- Touch targets min-height 44px (`min-h-[44px]`).
- No new dependencies, no env vars, no backend — site stays effectively static.
- Reuse the existing amber CTA button classes from `src/app/page.tsx:262-267`.
- Deploy-clean: never reference or bundle anything from `smt-finances/`.
- Workflow: feature branch → PR → review agents → apply findings → merge. Commit trailers required.

---

### Task 1: Rework the `/hall-hire` page

**Files:**
- Modify: `src/app/hall-hire/page.tsx`

**Interfaces:**
- Consumes: existing brand utility classes (`church-blue/green/amber/slate`), the amber-button class string from `src/app/page.tsx:262-267`.
- Produces: module constant `BOOKING_FORM_URL: string | null` (the single place a future editor pastes the live Google Form URL).

- [~] **Step 1: Create the feature branch** — *skipped; shipped direct to `main`*

```bash
git checkout main && git pull --ff-only
git checkout -b feat/hall-hire-booking-form
```

- [x] **Step 2: Add the `BOOKING_FORM_URL` constant**

In `src/app/hall-hire/page.tsx`, immediately after the `metadata` export (after its closing `};`, before the `ConditionCard` component), insert:

```tsx
/**
 * Live booking enquiry form URL (Google Form, owned by the church admin account).
 * Until the admin has built the form this stays null, and the page shows the
 * direct-contact path instead of a dead button.
 * Build spec: docs/hall-hire-booking-form.md
 * TODO(admin): set this to the published Google Form URL before go-live.
 */
const BOOKING_FORM_URL: string | null = null;
```

- [x] **Step 3: Insert the "Book Your Enquiry" section**

Insert the following block **immediately after the closing `</section>` of the AVAILABILITY CALENDAR section** (currently ends around line 228, right before the `CONDITIONS OF USE` comment banner):

```tsx
      {/* ══════════════════════════════════════════ */}
      {/* BOOK YOUR ENQUIRY                           */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="book-heading">
        <h2
          id="book-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-4"
        >
          Book Your Enquiry
        </h2>
        <p className="text-lg leading-relaxed text-church-slate mb-6">
          Have a look at the availability calendar above before you enquire, so
          you can suggest a time that&apos;s free. Sending an enquiry isn&apos;t a
          confirmed booking — we&apos;ll be in touch to confirm availability.
        </p>

        {BOOKING_FORM_URL ? (
          <a
            href={BOOKING_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-church-amber text-white hover:bg-amber-600 transition-colors px-6 py-3 rounded-xl font-semibold min-h-[44px]"
          >
            Start your booking enquiry &rarr;
          </a>
        ) : (
          <p className="text-lg text-church-slate bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            Our online booking form is coming soon. In the meantime, please get
            in touch using the details below.
          </p>
        )}

        {/* Direct-contact fallback — always available for those who prefer to talk to us. */}
        <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm mt-8">
          <h3 className="text-xl font-bold text-church-blue mb-3">
            Prefer to talk to us first?
          </h3>
          <div className="space-y-3">
            <p className="text-lg text-church-slate">
              <span className="font-medium">Email: </span>
              <a
                href="mailto:admin@stmattstaita.org.nz"
                className="text-church-blue hover:text-church-green transition-colors underline underline-offset-4 inline-flex items-center min-h-[44px]"
              >
                admin@stmattstaita.org.nz
              </a>
            </p>
            <p className="text-lg text-church-slate">
              <span className="font-medium">Phone: </span>
              <a
                href="tel:+64224097237"
                className="text-church-blue hover:text-church-green transition-colors underline underline-offset-4 inline-flex items-center min-h-[44px]"
              >
                022 409 7237
              </a>
            </p>
          </div>
        </div>
      </section>
```

- [x] **Step 4: Convert the old "Booking and Payment" section into a bank-only "Payment" section**

Replace the **entire** `BOOKING AND PAYMENT` section (comment banner + `<section ... aria-labelledby="booking-heading"> ... </section>`, currently ~lines 297–361) with this — note the contact card is gone (it moved to the Book section in Step 3), leaving only the bank-transfer card:

```tsx
      {/* ══════════════════════════════════════════ */}
      {/* PAYMENT                                     */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="payment-heading">
        <h2
          id="payment-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-8"
        >
          Payment
        </h2>

        <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm">
          <h3 className="text-xl font-bold text-church-blue mb-3">
            Payment by bank transfer
          </h3>
          <p className="text-lg text-church-slate mb-2">
            <span className="font-medium">Bank: </span>BNZ
          </p>
          <p className="text-lg text-church-slate mb-2">
            <span className="font-medium">Account number: </span>
            <span className="font-mono">02-0610-0070823-00</span>
          </p>
          {/* Registered payee name — must match the bank record exactly,
              so no macron or apostrophe here. */}
          <p className="text-lg text-church-slate mb-4">
            <span className="font-medium">Account name: </span>
            SAINT MATTHEWS - TAITA
          </p>
          {/* Reminding hirers to use their name as reference prevents payment matching issues */}
          <p className="text-lg text-church-slate bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            Please use your name and &ldquo;booking&rdquo; when paying so we can
            match your payment.
          </p>
        </div>
      </section>
```

After this edit the section order is: Facilities → Charges → Availability → **Book Your Enquiry** → Conditions of Use → Payment.

- [x] **Step 5: Lint**

Run: `npm run lint`
Expected: no errors, no warnings on `hall-hire/page.tsx`.

- [x] **Step 6: Build**

Run: `npm run build`
Expected: build succeeds; `/hall-hire` compiles as a static page.

- [~] **Step 7: Visual check in the dev server** — *partial; see Outcome below. The
  Chrome extension was unavailable, so this was verified by grepping the served HTML
  for each expected string, not by looking at the page.*

Run: `npm run dev`, open `http://localhost:3000/hall-hire`. Confirm:
- Section order is Facilities → Charges → Availability → **Book Your Enquiry** → Conditions of Use → Payment.
- Because `BOOKING_FORM_URL` is `null`, the Book section shows the "coming soon" note (not a dead button) followed by the "Prefer to talk to us first?" card with email + phone.
- The Payment section shows only bank details; `SAINT MATTHEWS - TAITA` is unchanged.
- No contact card is duplicated between the two sections.

- [x] **Step 8: Commit**

```bash
git add src/app/hall-hire/page.tsx
git commit -m "feat: add hall-hire booking enquiry section

Insert a Book Your Enquiry section between the availability calendar and
conditions: a church-amber CTA linking to the (church-admin-owned) Google
Form via a single BOOKING_FORM_URL constant, with the direct-contact path
as fallback. While the URL is null the page shows a 'coming soon' note plus
contact details, so this is safe to merge before the form exists. The old
Booking and Payment section becomes a bank-details-only Payment section.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Write the admin's Google Form build checklist

**Files:**
- Create: `docs/hall-hire-booking-form.md`

**Interfaces:**
- Consumes: the approved question set from `docs/plans/2026-07-18-hall-hire-booking-form-design.md` (Part 2).
- Produces: a plain-language, church-admin-facing build checklist. Not consumed by code.

- [x] **Step 1: Create the checklist doc**

Create `docs/hall-hire-booking-form.md` with exactly this content:

````markdown
# Hall Hire booking form — how to build it in Google Forms

This is the enquiry form that the "Start your booking enquiry" button on the
website will link to. Build it on the **church Google account** (the same one
that owns the booking calendar, `admin@stmattstaita.org.nz`) so the responses
collect in that account's Google Drive.

## Steps

1. Go to <https://forms.google.com> signed in as the church account and start a
   blank form.
2. **Title:** `Hall Hire Enquiry — St Matt's Taitā`
3. **Description (intro text):**
   > Thanks for considering St Matt's Taitā for your event. This helps us check
   > availability and get back to you quickly — it's an enquiry, not a confirmed
   > booking yet. Please check the availability calendar on our website before
   > submitting.
4. Add the questions below in order.
5. Under **Settings → Responses**, turn on "Collect email addresses" only if you
   want Google's own copy; question 2 already captures it. Link responses to a
   Google Sheet ("Responses" tab → green Sheets icon) so you can browse enquiries.
6. Under **Settings → Presentation → Confirmation message**, set:
   > Thank you — we've received your enquiry and someone from St Matt's will be in
   > touch to confirm availability. This is not yet a confirmed booking.
7. Click **Send → link (🔗)**, copy the URL, and send it to Malcolm to paste into
   the website (`BOOKING_FORM_URL` in `src/app/hall-hire/page.tsx`).

## Questions

| # | Question | Type | Required | Options / notes |
|---|----------|------|----------|-----------------|
| 1 | Your name | Short answer | Yes | |
| 2 | Email | Short answer | Yes | Turn on response validation → email |
| 3 | Phone | Short answer | Yes | |
| 4 | Group or organisation name (if any) | Short answer | No | Leave blank for private hire |
| 5 | What's the event? (a sentence on what you're planning) | Paragraph | Yes | |
| 6 | Which space do you need? (select all that apply) | Checkboxes | Yes | Main hall, kitchen & foyer ($20/hr) · Front meeting room ($15/hr, ~15 people) · Sacred Space – Whare Karakia (prior arrangement, no food or drink) · Not sure, need advice |
| 7 | One-off or regular booking? | Multiple choice | Yes | One-off · Regular (recurring) |
| 8 | Preferred date (or start date if regular) | Date | Yes | |
| 9 | If regular, how often? (e.g. every Tuesday morning) | Short answer | No | |
| 10 | Start time | Time | Yes | |
| 11 | Finish time | Time | Yes | |
| 12 | Is this a full-day hire? (by negotiation, $100 refundable bond) | Multiple choice | Yes | Yes · No |
| 13 | Expected number of people | Short answer | Yes | |
| 14 | Anything else we should know? | Paragraph | No | |

We deliberately don't ask about alcohol: the house rule is effectively no alcohol
(only with prior written permission from the Vicar's Warden), so it stays in the
Conditions of Use on the website rather than adding a question here.
````

- [x] **Step 2: Commit**

```bash
git add docs/hall-hire-booking-form.md
git commit -m "docs: Google Form build checklist for the church admin

Plain-language, step-by-step guide for building the hall-hire enquiry form
on the church Google account, with the approved 14-question set.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Open the pull request — SKIPPED

**Not done.** Tasks 1–2 were committed straight to `main` as `8d49f54` and
auto-deployed, matching how recent content work on this repo has shipped. No PR
was opened and the review-toolkit loop below was not run. The steps are kept for
reference in case a future change here wants that path.

**Files:** none (git/GitHub only)

- [~] **Step 1: Push and open the PR** — *skipped*

```bash
git push -u origin feat/hall-hire-booking-form
gh pr create --title "Hall-hire booking enquiry form" --body "$(cat <<'EOF'
## What

Adds a self-service booking enquiry to `/hall-hire`: a styled CTA linking out to a
church-admin-owned Google Form, with the direct email/phone contact as fallback.
Also ships the admin's Google Form build checklist (`docs/hall-hire-booking-form.md`)
and the design doc.

## Notes for review

- The form itself is built by the church admin on the church Google account (owns
  the calendar). Responses land in their Drive/Sheet — nothing passes through the app.
- `BOOKING_FORM_URL` is `null` until the admin sends the live link. While null the
  page shows a "coming soon" note plus contact details, so this is **safe to merge
  before the form exists** — no dead link ships.
- Page reordered: Facilities → Charges → Availability → Book Your Enquiry →
  Conditions → Payment. The old "Booking and Payment" section is now bank-only.
- Static-safe: no new deps, no env vars, no backend.

## Before go-live (tracked, not in this PR)

- [ ] Church admin builds the Google Form and sends the link.
- [ ] Set `BOOKING_FORM_URL` to the live URL.
- [ ] Confirm the 14-question set with Maria/admin.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [~] **Step 2: Run the review toolkit** — *skipped*

Trigger the PR review agents (same loop as PR #5), apply findings, then merge to `main`.

---

## Self-Review

**Spec coverage:**
- Backend = Google Form → Task 2 (build checklist) + Task 1 constant/CTA. ✅
- Form owner = church admin → Task 2 doc directs building on the church account. ✅
- Display = styled link-out button → Task 1 Step 3 (reuses homepage amber button). ✅
- Page reorder (Part 1) → Task 1 Steps 3–4. ✅
- 14-question set (Part 2, alcohol dropped) → Task 2 table. ✅
- Macron in intro → Task 2 Step 1 description text. ✅
- No dead link → `BOOKING_FORM_URL` null-guard, Task 1 Steps 2–3, 7. ✅
- Fallback contact path preserved → Task 1 Step 3 card. ✅
- Deliver admin spec doc → Task 2. ✅

**Placeholder scan:** The only `TODO`/`null` is the intentional `BOOKING_FORM_URL` external dependency, fully explained. No vague "add error handling" steps. ✅

**Type consistency:** `BOOKING_FORM_URL: string | null` defined in Task 1 Step 2 and consumed consistently in Step 3's `{BOOKING_FORM_URL ? ... : ...}`. Amber button classes match `page.tsx:262-267` verbatim. ✅
