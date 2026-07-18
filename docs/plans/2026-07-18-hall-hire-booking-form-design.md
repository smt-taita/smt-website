# Hall-hire booking enquiry form — design

**Date:** 2026-07-18
**Status:** Approved (design), pending implementation
**Author:** Malcolm + Claude Code (brainstorming session)

## Goal

Give prospective hall hirers a self-service **booking enquiry** on the `/hall-hire`
page so they answer the key qualifying questions up front, cutting the email
back-and-forth with the church admin. This is the *first step* of the booking flow
— it produces a well-structured enquiry, **not** a confirmed booking. The admin
still confirms availability and issues keys.

## Key decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Submission backend | **Google Form** (embed pattern already used for the calendar) | Zero code, zero cost, zero maintenance. Responses auto-collect into a Google Sheet the admin can browse. Fits persona 4 (maintainer with limited time). |
| Form ownership | **Church admin Google account** builds it (the account that owns the booking calendar, `admin@stmattstaita.org.nz`) | Responses land in the church's own Drive/Sheet — cleanest for privacy and ongoing admin control. Claude writes the build spec; the admin builds it (~15 min). |
| Form display | **Styled "Start your booking enquiry →" button** linking out (new tab) | The availability calendar is already a tall iframe; a second stacked iframe makes the page very long. A link-out gives the form Google's full mobile-responsive UI and keeps the page short. |
| Spam protection | Handled by Google Forms (Google account gating / built-in) | No custom backend, so no honeypot/Turnstile needed. |

## Part 1 — Page flow & placement

**Current order:** Facilities → Charges → Availability (calendar) → Conditions of Use → Booking & Payment.

**New order:** Facilities → Charges → **Availability (calendar)** → **Book your enquiry** → Conditions of Use → Payment details.

Rationale: the calendar and the booking action become one contiguous step —
*see what's free → enquire straight away*. Conditions/keys/earthquake detail move
below as reference material.

The new **Book** block contains:
- A one-line nudge above the button: *"Have a look at the availability calendar
  above before you enquire, so you can suggest a time that's free."*
- The primary CTA: a branded **"Start your booking enquiry →"** button
  (church-amber, min-height 44px) opening the Google Form in a new tab
  (`target="_blank"`, `rel="noopener noreferrer"`).
- A **"Prefer to talk to us first?"** fallback keeping the existing email + phone
  — the human path is not removed.

Bank/payment details stay exactly as-is. The registered payee name
`SAINT MATTHEWS - TAITA` stays verbatim (no macron, no apostrophe — must match the
bank record).

## Part 2 — Google Form question set (admin build spec)

**Form title:** Hall Hire Enquiry — St Matt's Taitā

**Form intro text:**
> Thanks for considering St Matt's Taitā for your event. This helps us check
> availability and get back to you quickly — it's an enquiry, not a confirmed
> booking yet. Please check the availability calendar on our website before
> submitting.

(Macron on Taitā, per house style.)

| # | Question | Type | Required | Options / notes |
|---|----------|------|----------|-----------------|
| 1 | Your name | Short answer | ✅ | |
| 2 | Email | Short answer | ✅ | Enable email-format validation |
| 3 | Phone | Short answer | ✅ | |
| 4 | Group or organisation name (if any) | Short answer | — | Blank for private hirers |
| 5 | What's the event? (a sentence on what you're planning) | Paragraph | ✅ | |
| 6 | Which space do you need? *(select all that apply)* | Checkboxes | ✅ | Main hall, kitchen & foyer ($20/hr) · Front meeting room ($15/hr, ~15 people) · Sacred Space – Whare Karakia (prior arrangement, no food or drink) · Not sure, need advice |
| 7 | One-off or regular booking? | Multiple choice | ✅ | One-off · Regular (recurring) |
| 8 | Preferred date (or start date if regular) | Date | ✅ | |
| 9 | If regular, how often? (e.g. every Tuesday morning) | Short answer | — | |
| 10 | Start time | Time | ✅ | |
| 11 | Finish time | Time | ✅ | |
| 12 | Is this a full-day hire? (by negotiation, $100 refundable bond) | Multiple choice | ✅ | Yes · No |
| 13 | Expected number of people | Short answer | ✅ | |
| 14 | Anything else we should know? | Paragraph | — | |

**Confirmation message (after submit):**
> Thank you — we've received your enquiry and someone from St Matt's will be in
> touch to confirm availability. This is not yet a confirmed booking.

**Deliberately omitted:** an alcohol question. The house rule is effectively no
alcohol (permitted only with prior written permission from the Vicar's Warden), so
asking every hirer adds friction for no gain. The condition remains documented in
the Conditions of Use section on the page.

All facts above derive from the current `/hall-hire` page content (spaces, rates,
bond, kitchen-for-50). Confirm with Maria/admin before the form goes live.

## Part 3 — Repo changes (static-safe)

- Edit `src/app/hall-hire/page.tsx`:
  - Reorder sections per Part 1.
  - Add the enquiry CTA block (nudge + button) immediately after the Availability
    calendar section.
  - Restructure the existing "Get in touch to book" card into the
    "Prefer to talk to us first?" fallback; keep bank/payment details unchanged.
- The Google Form URL lives in a single clearly-marked constant with a `TODO`
  placeholder until the admin builds the form and sends the real link — nothing
  ships pointing at a dead link.
- No new dependencies, no env vars, no backend. Site stays effectively static.
- Deliver the Part 2 spec to the admin as a build checklist (this doc, or an
  extracted `docs/hall-hire-booking-form.md`).

## Constraints honoured

- Church name always "St Matt's Taitā" with macron (except the bank payee name).
- Te reo Māori (`Taitā`, `Whare Karakia`) keeps correct diacritics; wrap in
  `<span lang="mi">` on the page.
- Touch targets ≥44px.
- `&apos;` for apostrophes in JSX.
- Deploy-clean: no `smt-finances/` content anywhere near this.

## Out of scope

- Confirmed-booking / payment collection (stays manual via bank transfer).
- Calendar write-back (admin adds confirmed bookings to the Google Calendar by hand).
- Any backend, database, or auth.

## Workflow

Feature branch → PR → review agents → apply findings → merge to main. Commits/PRs
carry the Claude Code trailers.
