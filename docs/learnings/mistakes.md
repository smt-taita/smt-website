# Mistakes to Avoid

Things that went wrong here, and the rule that stops a repeat. Check before implementing.
Format and conventions: `README.md` in this folder.

---

## 2026-07-29: A photo can be upright in every viewer you check and still render sideways in a browser

**What happened:** Maria's Easter cross photo arrived as `IMG_1254.heic`. Converting it to
JPEG produced a file that looked correct — the Read tool showed it upright, and `sips` reported
sensible dimensions — so it was committed and deployed. In the browser it appeared rotated 90°.

The pixels were upright. The file still carried the **EXIF orientation tag (`6`)** inherited
from the original HEIC, which tells a browser to rotate a further 90° clockwise on render. Every
tool that normalises EXIF (macOS Preview, the Read tool, most image viewers) showed it correctly
and hid the very tag causing the problem.

The instinct on being told "it needs rotating left" is to rotate the pixels. That would have
made it *look* right in the browser while being wrong in anything that ignores EXIF — and wrong
again the moment a build step stripped the metadata. **The fix was to clear the tag, not to
rotate the image.**

**Rules:**
- Converting HEIC → JPEG does **not** clear EXIF orientation. Check the tag explicitly; don't
  infer it from how the image looks in a viewer.
- Verify orientation by reading the tag value, not by eye. Dimensions agreeing with the pixels
  (1200×1600) tells you nothing about the tag.
- Before committing a phone photo: bake any rotation into the pixels, then set the orientation
  tag to `1`. Pixels and tag must agree, so no consumer can disagree with another.
- When a rendered image is wrong but every local viewer shows it right, suspect metadata before
  suspecting the pixels.

**Triggers:** "photo is sideways", "rotate the image", "needs rotating left/right", "image looks
fine locally but wrong on the site", adding any `.heic`/phone photo to `public/`, "orientation".

---

## 2026-07-29: The remote had six commits we didn't have, and the conflict landed in content someone had just confirmed

**What happened:** Work started from a local `main` that looked clean and current. After
committing, the push was rejected — the remote had moved ahead by six commits, including
`feat: Maria's confirmed go-live content`, which rewrote large parts of `src/app/page.tsx`: a new
hero tagline, the expanded Sunday description, the giving copy, the `GO & INVITE` rename, and a
whole new Small Groups section.

The rebase conflicted exactly where both sides had added a section after the activities grid.
Resolving it carelessly — taking one side — would have silently deleted content Maria had
already signed off on.

**Rules:**
- `git fetch` before starting content work, not after committing. A clean `git status` says
  nothing about the remote.
- When a rebase conflicts on a content file, resolve by reading **both** sides for intent. Two
  sections competing for the same slot usually both belong; the conflict is about ordering, not
  about which one survives.
- After resolving, diff the result against both parents and state explicitly what was kept from
  each. On copy that a stakeholder has approved, silent loss is the expensive failure.

**Triggers:** "push rejected", "fetch first", "updates were rejected", "remote contains work",
starting any content change, "rebase conflict in page.tsx".

---

## 2026-07-29: Verifying a change without the browser — what a build passing does and doesn't prove

**What happened:** Several changes this session (a two-column photo layout, social preview tags)
were shipped with the Chrome extension unavailable, so nothing was ever seen rendered. `npm run
build` passing proves the JSX compiles — it proves nothing about layout, and the OG tags in dev
render `localhost` URLs that would look broken while actually being fine.

What did work: `curl`ing the running server and grepping the served HTML for the specific tags
and content, and checking the **production** build (`next start`) rather than dev for anything
involving absolute URLs.

**Rules:**
- Don't report a visual change as verified when only the build was checked. Say which parts are
  unverified and name the check that would close the gap.
- For metadata and absolute URLs, verify against `next start` on the production build — the dev
  server substitutes its own origin and will mislead you in both directions.
- Grepping served HTML for an expected string is a real check and costs seconds. Prefer it over
  assuming.

**Triggers:** "does it look right", shipping a layout change, "og:image", "metadataBase",
"verified" when no browser was available, "check the meta tags".

---

## A first-in-DOM popup can hijack the Google search snippet

**Date:** 2026-08-25

**What happened:** The homepage's Google result showed a stitched, half-broken snippet —
"We meet every Sunday at 9:30 AM at 53 Reynolds Street, Taitā. a half and includes worship,
prayer, 022 409 7237|admin@stmattstaita.org.nz" — despite a correct `<meta name="description">`
being live and correct. The instinct is to blame the metadata. The metadata was fine.

The real cause: `<WelcomeModal />` was rendered first inside `<body>` in `layout.tsx`, so the
first prose in the served HTML was the popup's copy, not the page's. A `<dialog>` without the
`open` attribute is hidden to a visitor but fully present in the DOM, and Google used it as its
snippet source — then tacked on the footer's contact line to fill out the length.

Fix: render `<WelcomeModal />` last, after `<Footer />`. A `<dialog>` moves to the browser's
top layer when `showModal()` is called, so DOM order has no effect on how it looks or behaves.

**Rules:**
- A meta description is a *suggestion*. Google builds its own snippet whenever the page's own
  text looks like a better answer — so the top-of-DOM text has to read well on its own.
- When a snippet looks wrong, extract the served HTML's visible text and read the first ~300
  characters. That's the candidate pool. Don't start by rewriting the metadata.
- Client components rendered "somewhere in the layout" have an SEO position, not just a visual
  one. Put chrome (modals, banners, toasts) after the content they overlay.

**Triggers:** "search preview looks wrong", "Google is showing the wrong description", "snippet
is truncated/garbled", adding a modal or banner to `layout.tsx`, "meta description is ignored".
