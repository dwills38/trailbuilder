# Reviews & ratings — DECISIONS FOR DOUGLAS

Open questions from the reviews design round ([`data/REVIEWS-MODEL.md`](REVIEWS-MODEL.md)
+ staged [`supabase/reviews.sql`](../supabase/reviews.sql)). Nothing here is
decided — these are the calls that are yours. The design ships a sensible default
for each so it's buildable either way; your answer just confirms or flips it.

Grouped by how much they matter to the load-bearing **UNBIASED** value.

---

## A. Unbiased-display calls (highest stakes)

1. **Is there a "sort catalog by rating" view at all?**
   Default in the design: **no default sort by rating; if offered, opt-in only +
   shrinkage-corrected + count always shown.** A raw-mean sort is trivially gamed
   and structurally favors thin-data parts. Fine to ship with *no* rating sort at
   all in v1 (safest). → Ship no rating-sort, or opt-in-only-with-shrinkage?

2. **Minimum sample size before an average is shown.**
   Proposal: below **n<3**, show the count only ("2 ratings"), not a star average,
   so a lone 5.0 never masquerades as a settled score. → Agree on n<3, or a
   different threshold (or always show it)?

3. **"Owns this / built with this" proxy label.**
   We can't verify purchase (no transactions). We *could* label a reviewer who has
   the part in their inventory or a saved build — but that's weak and gameable, and
   must never be dressed up as "verified buyer". → Show a precise, honest label
   like "has this in their garage", or show nothing (design default = nothing)?

4. **Manufacturer-level rollups — confirming the ban.**
   The design forbids any "top brands by rating" leaderboard/sort/filter as a
   textbook bias vector. → Confirm we never build brand-level rating rollups.
   (Default: banned.)

---

## B. Scope / product calls

5. **Do complete bikes get reviews in v1, or components only?**
   The schema supports any catalog id (both). → Both from day one, or components
   first / complete bikes later?

6. **Hosted video timing.** v1 = external YouTube/Vimeo link only (no hosting).
   "Video reviews eventually" (uploaded, first-class) is its own project — a
   `review-videos` bucket + transcode/thumbnail + heavier moderation. → Is v1
   external-link-only acceptable, and when (if) do we want hosted video?

7. **Photo count per review.** Design caps at **6**. → Good, or higher/lower?

8. **Written-review length cap.** Design: body ≤4000 chars, title ≤120. → OK?

---

## C. Moderation / anti-abuse calls (mechanical-only, per your free-speech philosophy)

9. **Per-day rate limits.** The DB already enforces one review per (user, part)
   and one report per (reporter, review). Do you also want a *per-day* cap on new
   reviews/reports per account (extra flood protection)? Default: **no** — the
   per-part uniqueness already blocks the obvious spam, and a day cap is pure
   mechanical throttling if we add it. → Add a per-day cap, or leave it?

10. **Edited-review marker.** When an author edits a review, show an "edited"
    marker (and/or the edit time)? Default: **yes, show "edited"** (honesty).
    → Confirm wording / whether to show the timestamp.

11. **Moderation queue surfacing.** Reports land in an admin-only `review_reports`
    queue (read via SQL / a future admin view), never auto-acting. Same as the
    forum today. Do you want the reviews queue tied into the same
    monitor/notify idea parked for the forum ([[bug-report-pipeline]]), or handled
    manually for now? Default: **manual, same as forum.**

---

## D. Future surfaces (noted, not for v1 — flag if you want any pulled forward)

- Helpful/upvote counts on reviews (a gaming surface — deliberately out).
- Threaded replies to a review (moderation load — out; the forum covers discussion).
- Reviewer reputation/level (bias + gaming surface — out).
- Review solicitation prompts (must be catalog-uniform if ever built — no
  mechanism in v1).
- Cross-linking a review to the reviewer's public profile
  ([[forum-usernames-reqs]] rich profiles) — natural fit, easy later.

---

**Reminder of the standing guardrail** ([[manufacturer-bias-audits]]): whenever
reviews do go live, they warrant a bias audit pass — ratings are the most likely
feature to leak a manufacturer preference into the UI, so the periodic ethical
audit should explicitly cover review display + ordering once it's built.
