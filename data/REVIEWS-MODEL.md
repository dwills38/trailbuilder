# REVIEWS-MODEL.md — per-product reviews & ratings (design round)

**Status: DESIGN / OFF-LIVE.** Docs + staged SQL only. Nothing here is wired into
the live app. The SQL (`supabase/reviews.sql`) is staged for Douglas to run when
he says go; no `index.html`/`src/` code ships in this round.

**Directive (Douglas, roadmap ideas — [[product-roadmap-ideas]]):** per-product
reviews, 1–5★ + optional written comment + optional photo, video reviews
eventually. This document designs the data model, the moderation model, and — the
load-bearing piece — **how ratings can be shown without becoming a
manufacturer-bias vector.**

This mirrors the proven house patterns:
[`supabase/schema.sql`](../supabase/schema.sql) (owner-scoped RLS + the
`touch_updated_at` trigger), [`supabase/forum-profiles.sql`](../supabase/forum-profiles.sql)
(the `is_forum_admin()` moderation helper + the server-authoritative-flag guard
trigger), and [`supabase/forum-profiles-rich2.sql`](../supabase/forum-profiles-rich2.sql)
(the public-read / owner-writes-own-path Storage bucket for photos). The browser
glue mirrors [`src/account.js`](../src/account.js) and [`src/forum.js`](../src/forum.js).

---

## 1. Scope of v1

**In:**
- A 1–5 star rating on any **catalog part** (component *or* complete bike — both
  are catalog ids), one review per rider per part.
- Optional short **title** + optional **body** (written review).
- Optional **photos** (0–6), uploaded to a public Storage bucket, owner-scoped.
- Optional **external video link** (YouTube/Vimeo), *not* hosted video.
- **Reader flagging** into a human moderation queue; **admin** hide/edit/delete
  reusing the forum's existing `is_admin`.

**Out (deliberately, v1):**
- Hosted/uploaded video (bandwidth, storage, and moderation cost — external
  embed link only; see §6).
- "Verified purchase" badges — BuildMyMTB processes no transactions (it's an
  affiliate/aggregator), so it *cannot* honestly verify a purchase. Faking that
  badge would be a lie and a bias vector. See §7.4.
- Helpful/upvote counts, threaded replies to reviews, reviewer reputation
  scores — each is a future bias/gaming surface; parked to Decisions (§9).
- Any catalog reordering or engine input from ratings — a **hard firewall**, §7.

---

## 2. Tables (see `supabase/reviews.sql` for the authoritative DDL)

### `reviews` — one row per (user, part)
| column | type | notes |
|---|---|---|
| `id` | uuid pk | |
| `user_id` | uuid | `default auth.uid()`, FK→`auth.users` cascade. Never sent by the client. |
| `part_id` | text | **catalog id** (append-only; see §3). Not FK-validated — the DB doesn't know the catalog, same as `inventory.part_id`. |
| `rating` | int | `check (rating between 1 and 5)`. Required. |
| `title` | text | optional, ≤120 chars. |
| `body` | text | optional, ≤4000 chars. |
| `video_url` | text | optional; CHECK-allowlisted to YouTube/Vimeo (§6). |
| `hidden` | boolean | **admin-only**, server-authoritative (guard trigger, §4). Default false. |
| `created_at`/`updated_at` | timestamptz | `touch_updated_at` keeps updated_at fresh. |
| — | — | `unique (user_id, part_id)` — one review per rider per part. |

The **star rating is required, everything else optional** — a rider can leave a
bare rating, or a rating plus a full write-up with photos and a video link. A
review with no rating is not a thing (rating is the one required signal).

### `review_photos` — 0..N photos per review
Parent-cascade FK to `reviews`. `url` is CHECK-pinned to this project's
`review-photos` public Storage prefix (it can never hold an arbitrary URL — the
same defense as `profiles.avatar_url`). A BEFORE INSERT trigger caps photos at
**6 per review**. `user_id` is denormalized (must equal the parent review's
owner, enforced by the INSERT policy) so the RLS + storage-path checks stay
simple.

### `review_reports` — reader flags → human queue
`unique (reporter_id, review_id)` (one flag per rider per review). `reason` text
(≤1000). **No auto-action** — this table only accumulates for an admin to read.
See §5.

---

## 3. Catalog ids & aliases (the append-only trap)

`part_id` is an app catalog id — the same kind `inventory.part_id` stores. Ids are
**brand-qualified and append-only**; a correction retires an id into `ALIASES`
(in `src/compat.js`) and the app resolves through `canonicalId()` on read
(share links, inventory, the verify-job all do this).

Reviews must play by the same rule, and there's an aggregation subtlety unique to
reviews:

- **On write:** the client stores `canonicalId(partId)` — never a raw
  possibly-aliased id — so a review is always filed under the surviving id.
- **On read/aggregate:** the client canonicalizes the `part_id` it's querying, so
  reviews filed under an *old* id before a retirement still roll up into the
  canonical part's average and count. (Pre-canonicalization rows, if any ever
  exist, get folded by the read-side `canonicalId()`.)

The database intentionally does **not** validate `part_id` against a part set (it
has no catalog), exactly like inventory — a wrong/stale id is a harmless orphan
review the UI simply never surfaces (no part page queries it). This keeps the DB
catalog-agnostic and lets the catalog evolve without migrations.

---

## 4. Security & the `hidden` flag (mirrors `profiles.is_admin`)

Every write is owner-scoped by RLS (`auth.uid() = user_id`). The one privileged
column, `reviews.hidden`, is **server-authoritative** via the `reviews_guard`
BEFORE INSERT/UPDATE trigger — the exact pattern `profiles_guard` uses for
`is_admin`/`verified_pro`:

- For any real end-user JWT (`auth.uid() IS NOT NULL`) that is **not** an admin,
  the guard forces `hidden = false` on INSERT and `hidden = OLD.hidden` on
  UPDATE. So a rider can never publish-as-hidden, and — critically — can never
  **un-hide a review an admin hid**.
- Admins (`is_forum_admin()`) and the service role bypass the pin, so moderation
  through the app works while ordinary users are locked out.

**Read visibility:** the `reviews` SELECT policy shows non-hidden reviews to
everyone, and a hidden review only to its author (so they know it exists) and to
admins (the moderation view). Because non-admins never *see* hidden rows, the
client's per-part aggregate is computed over exactly the visible set for free —
no separate "exclude hidden" logic to get wrong.

Privilege escalation is impossible: there is no end-user path to `is_admin` (owned
by `forum-profiles.sql`) and none to flipping `hidden`.

---

## 5. Moderation model (free-speech-first — [[forum-automod-philosophy]])

Douglas's forum philosophy applies verbatim to reviews: **guard mechanical abuse
only, never viewpoint.**

- **Never moderated:** a negative opinion, a scathing 1-star, harsh-but-honest
  criticism, profanity, or an unpopular take. A brutal honest review is the whole
  point — it's what keeps the corpus trustworthy and unbiased. Removing negative
  reviews to protect a brand would be the single worst bias we could introduce.
- **Mechanical abuse only** (what an admin acts on): spam/flooding, scam or
  malware links, illegal content, doxxing, impersonation, off-topic garbage.
- **Reports → human queue, never auto-hide on count.** `review_reports` only
  accumulates; **nothing** hides a review at N reports. This is the deliberate
  anti-brigade design — a coordinated flag campaign against an honest negative
  review must not be able to bury it. An admin reads the queue and decides.
- **Two admin tools, different force:**
  - *Hide* (`hidden = true`) — soft: the review card disappears from public view
    and drops out of the aggregate, but the row (and any photo objects) remain.
    Reversible.
  - *Delete* — hard: removes the review row (photos cascade); the admin also
    deletes the storage objects for an abusive image (a hide does **not** remove
    the image bytes — the bucket is public-read, so the honest position is: hide
    hides the *card*, delete removes the *content*). The admin `review-photos`
    storage delete policy exists for exactly this.
- **Author self-service:** edit or delete your own review anytime (RLS owner
  policies). Editing bumps `updated_at`; the UI should show an "edited" marker
  (Decisions §9).

Light **anti-spam** that is *mechanical, not viewpoint*: one review per (user,
part) at the DB level; one report per (reporter, review); photo cap of 6. A
per-day review/report rate limit, if wanted, belongs app-side or in a future
lightweight counter — parked to Decisions.

---

## 6. Video (external link only, v1)

`reviews.video_url` accepts a single external link, CHECK-allowlisted to
`youtube.com/watch`, `youtu.be`, or `vimeo.com`. Rationale:

- **No hosting cost or moderation surface** for large media — the platform holds
  and moderates the video; we embed a link.
- **The allowlist is the safety boundary** — an arbitrary URL can't be stored, so
  the field can't be turned into a link-spam/redirect vector. Adding hosts later
  is a one-line CHECK change (guarded, idempotent).
- **Rendering:** the UI turns an allowlisted link into a click-to-load embed (or
  a plain outbound link). Note the no-pop-ups hard rule ([[hard-rules-ebikes-popups]])
  — an embed is user-click-triggered inline, never an auto-playing/auto-opening
  surface.

"Video reviews eventually" (hosted, first-class) is a real future step, but it's
its own project (a `review-videos` bucket with a much larger cap, transcode/
thumbnail pipeline, and heavier moderation). Parked to Decisions §9.

---

## 7. UNBIASED analysis — the load-bearing constraint

The product's doubled, load-bearing value is **UNBIASED** ([[product-values]]):
the tool favors no manufacturer, and affiliate money funds it but never biases
it. A review/rating system is the single most dangerous feature yet built for that
value, because ratings are *inherently* a popularity signal and popularity signals
are exactly how recommendation bias creeps in. Every design choice below exists to
keep reviews **honest annotation** and stop them becoming a ranking/recommendation
vector.

### 7.1 The hard firewall: reviews never touch the engine or the order
- **Reviews never feed `checkBuild`.** A part's compatibility verdict is
  computed only from its physical specs — identical firewall to `disciplines`
  and the tire-classes grouping. A 1-star part is never marked "incompatible"; a
  5-star part never "compatible" because of stars. Compatibility is a *fact*;
  ratings are *opinion*; they never mix.
- **Default catalog ordering is NEVER by rating.** The catalog's default sort
  (price/name/etc.) is unchanged. There is no "sorted by our rating" default and
  no hidden rating term in any default ranking.

### 7.2 If a "sort by rating" view exists, it is opt-in and shrinkage-corrected
- Any rating-based sort must be an **explicit, clearly-labeled user choice**,
  never the default and never the only order.
- When ratings *are* sorted, rank on a **Bayesian shrinkage** estimate, not the
  raw mean: `(v·R + m·C) / (v + m)` where `v` = this part's review count, `R` =
  its mean, `C` = the global catalog mean, `m` = a smoothing constant (e.g. 15).
  This stops a single `5.0 (n=1)` outranking a `4.6 (n=200)` — a raw-mean sort is
  trivially gamed by one or two reviews and structurally favors obscure parts
  with thin data. **Always display the count next to the average** so the reader
  sees the sample size.

### 7.3 No manufacturer-level rollups
- **No "top brands by rating" leaderboard, ever** — not as a feature, not as a
  default sort, not as a filter. Aggregating stars to the manufacturer level is
  the textbook bias vector: popular brands accrue more reviews → look better →
  get recommended → accrue more reviews (a self-reinforcing loop that buries
  smaller makers regardless of merit). Ratings live at the **individual part**
  level and stop there.

### 7.4 Honest presentation, no manufactured trust
- **Show the distribution, not just the mean.** A small 1–5 histogram next to the
  average lets readers judge for themselves and makes a manipulated average
  visible (an all-5s-and-1s split reads very differently from a tight 4.x).
- **Sample-size honesty.** Always show `n`. Never render `5.0` from one review
  with the same visual weight as `4.6` from eighty. Consider suppressing an
  average entirely below a small threshold (e.g. n<3) and just showing "2 ratings"
  — parked to Decisions.
- **No "verified purchase" theatre.** We can't verify purchases, so we don't
  claim to. (A weak proxy — "reviewer owns this part" via inventory, or "has it
  in a saved build" — is *possible* but is not proof of purchase and could itself
  be gamed; if ever shown it must be labeled precisely as what it is, not dressed
  up as "verified buyer". Parked to Decisions.)
- **No editor's/house rating mixed into user stars.** BuildMyMTB does not inject
  its own score into the user aggregate — that would be an opinion vector wearing
  a data costume. User reviews stay visibly user-sourced.

### 7.5 Affiliate firewall (reviews × money)
- A part's **affiliate status must never influence** whether/how its reviews show,
  their ordering, or their prominence. Reviews and `retailerLinks` are
  independent systems ([[affiliate-push]]). An affiliate-partner product gets the
  exact same review UI as a non-partner one.
- **Neutral solicitation.** If review prompts ever exist, they must be *uniform
  across the catalog* — never "review this product" only for affiliate SKUs, or
  only for parts that got a good rating. Selective solicitation silently biases
  the corpus. (v1 has no solicitation mechanism; noting the rule for when it's
  built.)

### 7.6 Anti-astroturf structure
- One review per (user, part) at the DB level — no sockpuppet stacking from one
  account.
- `author_id`/`user_id` is always the real authenticated user (DB default,
  never client-supplied); the owner cannot silently seed brand-flattering
  reviews through the app path (only the service role could, and that would be a
  deliberate, logged act — out of the app's reach).
- Photos/videos are owner-scoped; a review can't attach someone else's media.

### 7.7 Display parity
Every part gets the **same review treatment** regardless of brand, price,
verified status, or affiliate status — same widget, same placement, same rules.
No brand gets a bigger review box or a "featured reviews" slot.

---

## 8. Browser-glue plan (staged — for the go-live round, NOT this one)

When Douglas green-lights wiring it in, the client layer mirrors
`src/account.js`/`src/forum.js` exactly — a new `src/reviews.js` of plain browser
globals over the shared `_sb` client, feature-detected so the app is safe to ship
before the migration runs:

- `reviewsReady()` / a `hasReviews()` 1-row probe (the `hasProfiles`/
  `forumHasCategories` self-healing pattern) so all review UI stays hidden until
  `supabase/reviews.sql` has run.
- `listReviews(partId)` — `canonicalId(partId)` first, then select visible rows +
  photos, newest first, small cap; compute average/count/histogram client-side.
- `myReviewFor(partId)`, `upsertReview(partId, {rating,title,body,video_url})`
  (writes `canonicalId`), `deleteReview(id)`.
- `uploadReviewPhoto(reviewId, file)` — the `uploadAvatar` pattern, path
  `<uid>/<reviewId>/<file>` in the `review-photos` bucket, 5 MiB / image-MIME
  pre-check mirroring the bucket's server-side caps; then `addReviewPhoto(url)`.
- `reportReview(reviewId, reason)`; admin `hideReview`/`deleteReview` reuse the
  forum-admin path.
- A `REVIEWS_ENABLED` committed-constant gate in `src/config.js` (the
  `ACCOUNTS_ENABLED`/`FORUM_ENABLED` pattern).

Pure, testable bits (the shrinkage/aggregate math, the canonicalization, the
video-host allowlist mirror) get a `test/test-reviews.js` — the aggregate math is
exactly the kind of logic that must be unit-pinned so the unbiased display rules
can't silently regress.

---

## 9. Open questions → see `data/REVIEWS-DECISIONS-FOR-DOUGLAS.md`

Everything requiring Douglas's call (min-N to show an average, whether a "sort by
rating" view exists at all, the owns-this proxy, per-day rate limits, hosted video
timing, edited-marker wording, whether complete bikes get reviews in v1) is parked
there — this round decides nothing that's his to decide.
