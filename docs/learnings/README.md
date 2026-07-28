# Learnings

Two files. Read them before starting work; add to them when you finish something that
surprised you.

- **`mistakes.md`** — things that went wrong, and the rule that stops a repeat.
- **`patterns.md`** — things that worked and are worth doing again.

## Why this exists

This repo sits outside the Optimi setup, so the `/session-learnings` command and the shared
handbook aren't available here. This folder is the local substitute. Nothing automated writes
to it — if it isn't written by hand, it doesn't get written.

## Adding an entry

Append to the bottom of the relevant file, newest last. Copy this shape:

```markdown
## YYYY-MM-DD: One-line claim, stated as the lesson

**What happened:** the concrete situation — file, command, what was expected, what occurred.
Enough that someone who wasn't there can recognise the same situation.

**Rules:**
- What to do instead, phrased as an instruction.

**Triggers:** "phrases", "error strings", "situations" that should make someone re-read this.
```

The **triggers** line is the part that earns its keep — it's how a future reader (human or AI)
finds the entry at the moment it's relevant rather than after repeating the mistake. Use the
words that would actually be in your head or on your screen at the time: an error message, a
phrase from an email, a symptom.

## What belongs here

Something belongs here if it was **non-obvious and will recur**. A trap that cost real time, a
convention that isn't derivable from the code, a fact about how the site is deployed.

What doesn't: anything the code, `CLAUDE.md`, or `git log` already says. Don't restate the
architecture — describe the thing that would have saved you an hour.

Prune entries that stop being true. A stale learning is worse than a missing one, because it
gets trusted.
