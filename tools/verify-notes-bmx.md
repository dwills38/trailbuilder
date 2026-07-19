# BMX verification wave — 2026-07-18 (verify/bmx-1-w2)

Scope: `data/bmx.js` (`BMX_PARTS`) only, per CLAUDE.md hard rule 3 (BMX stays OFF-LIVE;
never load `bmx.js`/`compat-bmx.js` from `index.html`). Branch cut fresh off `origin/main`
(commit `2ff6e6c`), which already contains the 2026-07-17 "depth pass" (`06ce81e`) covering
Profile Racing, GT, Haro (partial), BSD, Colony, Fly Bikes, Total BMX, S&M (partial), Chase —
confirmed via `git merge-base --is-ancestor` before starting, so none of that work is
duplicated here.

**Note on the existing `verify/bmx-1*` branch family:** eleven `verify/bmx-1-*` branches
already exist locally (chase-kink-gt, colony, cult, eclat, fitco-fly, odyssey-a/b, profile,
shadow, smallbrands, wtp-sm-total-bsd) — all confirmed merged into `origin/main` already, so
this session branched as `verify/bmx-1-w2-e850` to avoid the name collision with the
already-existing (and already-merged) `verify/bmx-1`.

## Before → after

- Before: 59/225 verified (26.2%)
- After: **62/225 verified (27.6%)** — 3 new verifications, plus 1 data correction on an
  unverified row.

## Verified (3)

All three via **shop.sundaybikes.com** / **sundaybikes.com** — Sunday's own storefront and
blog domains (manufacturer-first-party, not a retailer):

1. **`bmx-fr-sunday-soundwavev3`** — Sunday Soundwave V3 frame. Product page explicitly states
   "The Mid BB and Headtube is machined..." (confirms `bbShell:'mid'` + `headTube:'integrated-1-1/8'`)
   and "Removable Brake Hardware" (Sunday's u-brake convention, spelled out explicitly as
   "removable u-brake hardware" on sibling Street Sweeper/Darkwave pages on the same site).
   Top tube range and weight (4.9lb = 2222g) match the catalog row exactly.
2. **`bmx-fr-sunday-nightshift`** — same manufacturer-confirmed Mid BB / integrated head tube /
   removable-u-brake convention (shared "Frame Technology" tags across the whole Sunday
   freestyle line on `shop.sundaybikes.com`). Weight (5lb = 2268g) matches exactly.
3. **`bmx-fr-sunday-parkranger`** — confirmed via Sunday's own 2020 launch blog post
   (`sundaybikes.com/2020/03/...`), cross-checked against a retailer's spec table (empirebmx.com)
   that quotes the identical maker copy ("integrated HT and Mid BB shell"). Weight (5lb = 2268g)
   and top-tube range match exactly.

All three: `rearAxle:'14mm'` per BMX-MODEL.md §5 (the BMX-universal modern rear-axle standard,
not independently re-confirmed per row — same convention every other verified BMX frame in
this catalog already uses).

## Correction, not verified (1)

- **`bmx-hb-sandm-racexlt-8`** (S&M Race XLT Bar 8") — `width` corrected from a stale **28.5in**
  to the maker-published **29in** (sandmbikes.com product page for the "S&m Race Xlt Bar
  7.5"-10"" SKU, which this row's "8 inch" variant is drawn from). Left **unverified**: the
  page states one weight *range* (1.68-2.18lb / 762-989g) across the whole 7.5-10in rise
  selection, not a per-rise figure, and this row's existing 762g figure corresponds to the
  7.5in low end, not the 8in rise it's actually cataloged at — no trustworthy per-SKU weight,
  so the verification bar isn't met even though the interface fact (width) is now correct.

## Researched, left unverified/skipped (reasons documented, no catalog edit)

- **S&M Race XLT Stem** (`bmx-st-sm-racexlt`) — sandmbikes.com confirms reach options
  (49/53/55/57mm) and a weight range (10.2/10.5/10.9oz) but the catalog row doesn't pin a
  specific reach variant, so neither price nor weight can be tied to one SKU. Left as-is.
- **S&M "Speedball Bars"** (`bmx-hb-sandm-speedball`) — searched sandmbikes.com's current bar
  lineup (Sand Bar, Slam Bar, 12 Step, Race XLT); no "Speedball Bars" model exists today (only
  a "Speedball Tire"). Likely a discontinued/renamed or misattributed model name. Flagged for a
  human call (rename vs. remove) rather than silently altered — did not touch the row.
- **Subrosa Salinas / Malum / Salvador** (3 frame rows) — subrosabrand.com's own current
  product listing (Om, Rose, Wild Child, MR1/MR2, Simo) does not include any of these three
  models; they only turn up as complete-bike SKUs on third-party distributors (5150bmx.com,
  Source BMX). The Malum retailer page corroborates u-brake mounts and the catalog's 21in top
  tube, but a retailer page doesn't clear THE BAR (manufacturer's own page required). Left
  unverified, no edit — same standard the prior depth-pass already applied elsewhere.
- **Haro Downtown / Downtown DLX** (2 frames) + **Downtown Fork** — harobikes.com's current
  live product page (`downtown-20-2025`) plus the archived 2021/2023 spec tables **fully confirm
  every interface field already in the catalog** (Mid BB, integrated 1-1/8 head tube, 990/u-brake
  mounts, 14mm rear axle, 20.5in top tube) with zero corrections needed. **Not marked verified**
  because Haro sells Downtown only as a complete bike — no frame-only SKU exists, so no
  trustworthy frame-only weight exists to meet bar item 2, and frame is not one of the named
  interface-verification exception categories (shocks/wheels/forks only, per
  `tools/VERIFY-PROTOCOL.md`). Recording the finding here so a future pass doesn't re-research
  this from scratch.
- **Haro Lineage Master** (`bmx-fr-haro-lineage-master`) — this appears to be a discontinued
  20" limited-edition (archived 2018-2020 "Lineage Team Master" / "...Bashguard", some runs as
  small as 150 units per colorway); the current harobikes.com site now uses the "Lineage" badge
  only on 26" cruiser variants (Ground Master 26, Sport Bashguard 26). Top tube in the archive
  varies 20.5-21in across model years, roughly consistent with the catalog's 21in but not a
  confident 1:1 match to one specific year. Left unverified/uncorrected — too much generational
  ambiguity to safely edit.
- **Redline Proline family** (Proline, Proline Flight, Forklift Pro, Roam) — redlinebicycles.com
  confirms Euro BB + integrated head tube across the tiers, but brake spec has visibly drifted
  by year/tier (older listings show V-brake, a 2022 Dan's Comp listing for the same "Proline"
  name shows Avid BB5 disc), and top-tube length differs by tier (Expert 19.5in vs Pro/Pro XL
  20.75-21in) in a way that doesn't cleanly map onto this catalog's single generic "Proline"
  row. Left as the prior pass's existing (retailer-sourced, unverified) notes — did not
  introduce a low-confidence correction into a generationally ambiguous area.
- **Fly Bikes remainder** (Nassau frame, PZ1 cranks, Mid BB, Alloy Sprocket, Vandal Pegs, Glory
  Bars, Pivotal Seat, Radioactive Grips) — re-checked flybikes.com; confirmed the prior
  depth-pass's existing "discontinued/renamed, not in current lineup" findings still hold (no
  new information). No changes made — avoided redundant work.
- **Mongoose Legion L60/L100** — already sourced from mongoose.com (a genuine manufacturer
  page) by the prior pass, but the row's price appears to be the *complete-bike* price on a
  `cat:'frame'` row with `frameOnly:false` (Mongoose doesn't sell Legion frames standalone).
  Flagging this for a policy call rather than editing it myself: per THE PRICE RULE, a price
  belonging to a different product is disqualifying, but frame-only weight/price genuinely
  doesn't exist for a complete-bike-only frame — this may need its own documented exception
  (mirroring the Haro Downtown finding above) rather than a per-row fix.

## Can BMX plausibly reach 40% (Douglas's go-live bar) from available sources?

**Yes, but not from a single more wave at this pace.** 62/225 = 27.6% today; 40% needs 90
verified rows, i.e. 28 more. The clean path forward:

1. **The Haro/Mongoose "complete-bike-only frame" pattern is the biggest lever.** A meaningful
   slice of the unverified 163 rows are frames/parts that are only ever sold bundled into a
   complete bike (Haro Downtown/DLX, Mongoose Legion, likely more in Redline/Subrosa/GT) —
   their *interfaces* are fully confirmable against manufacturer pages, but they fail bar item 2
   (no per-SKU frame weight) under the current rules. **If Douglas extends the existing
   shock/wheel/fork "interface verification" exception (VERIFY-PROTOCOL.md) to this
   "complete-bike-only frame" case**, roughly 6-10 rows found in this session alone would
   immediately promote to verified with zero new research — and the same pattern likely repeats
   across GT, Redline, Subrosa, Mongoose remainder. This is the single highest-leverage
   unblocker for hitting 40%.
2. Absent that policy change, the remaining unverified rows split roughly into: (a) genuinely
   discontinued/renamed models with no current manufacturer page (a real, permanent Skip — Fit
   Bike Co, much of Fly Bikes, S&M Holmes/Speedball), and (b) not-yet-researched small parts
   (grips, pedals, chains, seatposts) across brands like Odyssey/Cult/Colony that still have
   double-digit unverified counts and likely-fetchable DTC sites (thebuildingdistro.com/similar
   for the harder brands, direct brand sites for the easier ones) — a further 1-2 waves focused
   there should clear 28+ rows without hitting the complete-bike-weight wall at all.
