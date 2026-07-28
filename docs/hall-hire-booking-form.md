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
