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

---

# BMX verification wave 2 — 2026-07-19 (verify/bmx-2)

Scope: `data/bmx.js` only. Branch cut fresh off `origin/main` (commit `e9fdbe8`). Target per
the coordinator's brief: Odyssey/Cult/Colony small parts, flagged by wave 1 as the best
remaining yield.

## Before → after

- Before: 62/225 verified (27.6%)
- After: **66/225 verified (29.3%)** — 4 new verifications, all Colony (colonybmx.com.au is a
  genuinely static/server-rendered WordPress site with real per-product weight text — see the
  "critical finding" below for why Odyssey and Cult yielded zero this session despite heavy
  research effort).

## Verified (4), all colonybmx.com.au (Colony's own site)

1. **`bmx-gr-colony-mountjoy`** (Mountjoy Grips) — "140mm...diameter", plastic push-in bar
   ends (flangeless), "Weight: 124 grams (4.37oz) per pair". **Correction:** length 143→140.
2. **`bmx-pg-colony-oneway`** (Oneway CrMo Peg) — "Forged & machined from 4140 CrMo...", `3/8"
   & 14mm axle slots` (dual-bore, confirms `reducerIncluded:false` at this row's 14mm), "169
   grams each (5.96oz)".
3. **`bmx-pg-colony-jamcircle`** (Jam Circle Peg) — "6061T6 Alloy", `10/14mm with adaptor`
   (native 14mm bore, adaptor steps down to 10mm — confirms `reducerIncluded:false` at 14mm),
   "Weight: 99 grams".
4. **`bmx-rh-colony-wasp`** (Wasp Cassette Hub) — "14mm axle...9T driver...Weight: 469grams
   (16.54oz)" — matches `driverType:'cassette'`/`driverTeeth:9`/`axle:'14mm'` exactly.

All four: price left as the existing sample (colonybmx.com.au is an AU site, no USD shown);
disclosed in each row's `note` per THE PRICE RULE.

## ★ Critical finding: WebSearch/WebFetch can fabricate weight figures that never appear on the cited page — always cross-check with a raw `curl` + `grep` before trusting a number

This cost most of the session's research time and is worth flagging loudly for future waves.

Pattern: ask WebSearch/WebFetch for a spec, it returns a specific, plausible-sounding number
*and cites a real URL* — but the number is not actually present in that page's HTML. Caught
three times this session:

- **Odyssey Calibur V2 Cranks**: WebSearch reported "1lb 11.8oz (≈770-788g)" citing
  `shop.odysseybmx.com/products/odyssey-calibur-v2-bmx-cranks-rustproof-black`. Raw `curl` of
  that exact URL: the only weight-related text on the page is the boilerplate disclaimer
  ("Weights listed may vary slightly per batch"). No number anywhere in the HTML.
- **Odyssey GTX-S Gyro**: WebSearch reported "1.5 oz" citing the shop page. Same result on
  `curl` — no weight number present, only the same disclaimer.
- **Odyssey R32 Forks / Elementary V2 Stem**: WebSearch reported 885g and 230g respectively —
  both suspiciously **matching this catalog's pre-existing unverified sample weights exactly**.
  `curl` of the real product pages' `<meta name="description">` (the actual on-page spec
  summary) shows neither page states a weight at all (R32: "41-Thermal lifetime replacement
  warranty. 32mm traditional offset. 4mm thick dropouts. 3/8″ axle slot." — no weight token).
  The exact-match-to-sample-data is the tell: a model reproducing an existing figure it saw
  associated with this part elsewhere (BMX wiki/forum context in training data, or this
  catalog's own prior git history if that leaked into a search index) rather than reading it
  off the fetched page.

**Consequence for this session:** every Odyssey and Cult verification candidate researched via
WebSearch/WebFetch alone was **abandoned rather than committed**, even where the returned
number looked clean, unless a follow-up raw `curl … | grep` independently reproduced the exact
figure in the page's actual HTML. The 4 Colony verifications above all cleared that second
check (see the `grep` hits quoted in each note). **Protocol suggestion for future waves:**
treat any WebSearch/WebFetch-reported weight as a lead, never a source — the fetched-page
requirement in THE BAR item 1 isn't satisfied until a raw fetch reproduces the literal string.

## Also confirmed real (raw `curl`), but NOT verified — reasons below

- **`bmx-rh-cult-matchv2`** (Cult Match V2 Cassette Hub) — re-checked `cultcrew.com`'s current
  "Crew Cassette Hub" page raw HTML: no weight number present (same shipping-weight-bucket
  problem wave 1 already found, `3629g`, applies to `cultcrew.com` broadly — its Shopify
  storefront doesn't expose real per-SKU weight in page text, unlike `colonybmx.com.au`). No
  change from wave 1's finding.
- **`bmx-st-colony-official`** (Official Stem) — raw-confirmed weight 248g ("Weight: 248 grams
  (8.74oz)") but the page states no clamp diameter anywhere, and `checkBmxBuild`'s bar/stem
  clamp rule reads that field — bar item 1 (interfaces manufacturer-sourced, no exceptions)
  isn't met. Left unverified/unchanged.
- **`bmx-st-colony-variant`** (Variant Stem) — same story: raw-confirmed "52mm reach, 22.5mm
  Rise... Weight: 271 grams (52mm reach) / 234 grams (35mm reach)" but no clamp diameter on
  the page. Left unverified/unchanged.
- **`bmx-hb-colony-rick`** (Rick Bars) — raw-confirmed real specs, but Colony currently sells
  **two** rise/width variants (8.65"/1039g and 9.3"/1056g, both 28.0"-29" wide) and this
  catalog's single generic row (`rise:8, width:29`) doesn't cleanly identify which one it is —
  the classic flat-SKU ambiguity DATA-ENTRY-TEMPLATE.md warns about. Left unverified/unchanged;
  a future pass could split this into two rows per the template's variant-token convention.
- **`bmx-hb-colony-guardian`** (Guardian Bars) — same ambiguity: two real variants (8.8"/864g
  and 9.4"/942g, both 29.0" wide — width matches this row's `width:29` exactly, rise doesn't
  cleanly match either 8.8 or 9.4 against the row's `rise:8`). Left unverified/unchanged.
- **`bmx-rh-colony-wasprace`** (Wasp Race Cassette Hubset) — raw-confirmed "Weight: 560 grams
  for full set (205 grams for front & 355 grams for rear)... ships standard with a 16T cog"
  (confirms `driverTeeth:16`). **Not verified**: it's a genuine front+rear hubSET, and this
  row's `$129.99` price and `cat:'rearWheel'` scope don't cleanly correspond to "rear half of a
  set" — THE PRICE RULE item 3 (a price belonging to a different product is disqualifying)
  applies. Flagged for the same kind of policy call as wave 1's Haro/Mongoose finding, not
  edited.
- **`bmx-fw-colony-wasp`** (Wasp Front Hub) — raw-confirmed weight (284g bare / 305g w/
  guards) but the page's only axle-related text is "Female bolt style with CrMo axle for
  strength" — no diameter number anywhere (a `10mm` string on the page turned out to be "10mm
  bolts only", i.e. the wrench size for the axle bolts, not the axle diameter — worth noting
  since it's an easy misread). This row's existing note claims a sourced "14mm hollow chromoly
  axle" from a past pass; today's page doesn't support that specific number either way. Left
  unchanged (existing unverified sample), flagged for a future pass with a sharper source.

## Odyssey / Cult: researched, zero yield this session

Every Odyssey small part investigated (grips, chains, sprockets, cranks, fork, gyro, stem) hit
one of two walls: (1) `shop.odysseybmx.com`'s Shopify product-level `weight` field is a
shipping-weight bucket, not a net product weight — proven by pulling the raw `.js` variant JSON
for the Trailmix Looseball Pedals (`weight:1361`, i.e. 1.36kg, for a pedal pair that every other
source puts at 340-561g) and by two different grip models (Keyboard v1, Broc) both showing an
identical `weight:141` — a single shop-wide default, not a per-product figure; or (2) the
WebSearch fabrication pattern above. Every Cult small part investigated (grips, pegs, Hi-Fi
stem) hit the same Shopify-weight-bucket wall on `cultcrew.com`, **plus** several catalog model
names no longer match current SKUs (no "Hi-Fi Stem", "AK Grips"/"Alloy Pegs"/"Steel Pegs" don't
map to a single current product — Cult's current lineup uses specific names like "Butter Peg"/
"Doomsday Peg" instead of the generic "Alloy"/"Steel" this catalog uses), mirroring wave 1's Fly
Bikes/Redline discontinued-naming pattern. No catalog edits made for either brand this session.

## Distance to Douglas's 40% (90/225) go-live bar

62→66 this wave (+4). 24 more needed. Given this session's findings, the highest-confidence
path is **NOT** more Odyssey/Cult small parts (both brands' storefronts actively obstruct
weight verification via the Shopify-weight-bucket problem) — it's:

1. **The wave-1 policy question is still the biggest lever and is still open**: extending the
   interface-verification exception to "complete-bike-only frames" (Haro Downtown/DLX, Mongoose
   Legion, likely more in Redline/Subrosa/GT) would promote roughly 6-10 rows immediately.
2. **Brands with real static (non-Shopify-JS) sites are the next best target** —
   `colonybmx.com.au` (WordPress) yielded 4/4 clean this session; the same pattern likely holds
   for other non-Shopify BMX brands not yet swept (worth checking platform type — static HTML
   with a `<meta name="description">` spec summary vs. a Shopify storefront — before spending
   research time on a brand).

---

# BMX verification wave 3 — 2026-07-20 (verify/bmx-3)

Scope: `data/bmx.js` only. Branch cut fresh off `origin/main` (commit `f3e91a4`). Target: sweep
untouched small BMX brands + the remaining Colony/Sunday/Shadow gaps for wave-1/2-style yield.

## Before → after

- Before: 66/225 verified (29.3%)
- After: **67/225 verified (29.8%)** — 1 new verification.

## Verified (1)

- **`bmx-pd-colony-fantom`** (Colony Fantastic Plastic Pedals) — raw-`curl`-confirmed on
  `colonybmx.com.au/products/fantastic-plastic-pedals`: "Looseball axle type only in 9/16″"
  (confirms `spindle:'9/16'`, `platform:'plastic'`) and **"Weight per pair: 371 grams
  (13.08oz)"** — corrected from the prior 350g unverified sample. `sourceType:'manufacturer'`.

## Researched, walls confirmed (no catalog edit — matches/extends wave 1-2 findings)

- **8 untouched small brands swept** (Alienation, Verde, Mankind, Standard Byke Co, Supercross
  BMX, United BMX, Premium BMX, Radio Bikes) via a research sub-agent, then two independently
  raw-`curl`-verified myself per the phantom-number doctrine:
  - **Standard Byke STA** (`bmx-fr-standard-sta`) — raw-confirmed on standardbyke.com: "Mid bb"
    (matches `bbShell:'mid'`), "1/4″ thick 14mm laser cut drop outs" (matches `rearAxle:'14mm'`),
    top-tube options "20.5, 20.75 and 21″" (matches the row's 20.75). **But**: the page's own
    spec list states **"No brake mounts or welded on brake mounts"** as the no-cost-option
    default — directly conflicting with this row's `rearBrakeMount:'u-brake'`. Also, the only
    weight figure found ("Weight: 5.00 LBS") sits in a cart-system field directly next to
    "Shipping: $45.00 (Fixed shipping cost)" — indistinguishable from a shipping-weight bucket,
    the same trap that burned Odyssey/Cult in wave 2. **Not verified** — flagging the
    brake-mount conflict for a human/coordinator call rather than silently editing it; the
    frame's `headTube` field also isn't stated anywhere on the page.
  - **Mankind Sunchaser (Ed Black)** (`bmx-fr-mankind-sunchaser`) — mankindbmx.com's German
    storefront states a weight "2.1 kg bei 21.0″" — i.e. for the **21.0in size**, not this
    row's 20.5in top tube. This exactly matches the row's existing sample weight (2100g),
    which is suspicious (same "search figure matches pre-existing sample" tell as the wave-2
    Odyssey false positives) — **not independently re-fetched by me** (the research sub-agent's
    fetch, not a raw curl), so treat the existing 2100g figure as unconfirmed for the correct
    size, not as newly verified. Left unchanged.
  - **Alienation Sabbath** front/rear wheel — alienationbmx.com's own page confirms the wheel
    actually uses a "Venus Hub," not a distinct "Sabbath" hub, and its weight field is present
    but empty on the page. No usable data.
  - **Verde Cadet/Eon, Supercross Envy RS7/BLK2, United Supreme, Radio Darko** — manufacturer
    pages exist but the sub-agent was rate-limited (HTTP 429) before getting raw text; only
    WebSearch-summary numbers were returned, which per the phantom-number doctrine are NOT
    trustworthy without independent raw confirmation. **Not researched further this session —
    a future wave should retry these with spaced-out requests** (a real lead, not yet cleared).
  - **Premium BMX** — domain (premiumbmxproducts.com) is dead (DNS failure); brand appears to
    have no current standalone site. Likely a permanent skip.
  - Domain corrections for future waves: Verde is at **verdebicycles.com** (not verdebrand.com);
    Standard Byke is at **standardbyke.com** (not standardbykeco.com); United is at
    **unitedbikeco.com** (not unitedbmx.com, unconfirmed).
- **Chase** (`bmx-fr-chase-rsp30` etc., 10 rows) — re-confirmed the existing wall note: no
  standalone-parts section exists on chasebicycles.com. No new research needed, matches prior.
- **Sunday Forecaster/Blueprint frames** — raw-`curl`-confirmed a NEW wall, extending the
  Haro/Mongoose "complete-bike-only" pattern: `shop.sundaybikes.com`'s Frames collection page
  links "Forecaster" and "Blueprint" to `/collections/sunday-bikes-forecaster` and
  `/collections/sunday-bikes-blueprint` — i.e. these are **complete-bike model families**, not
  standalone frame SKUs, on Sunday's own site (which otherwise sells real frame-only products,
  e.g. the wave-1-verified Soundwave/Nightshift/Park Ranger). No frame-only product page exists
  to fetch. Left unverified, no edit.
- **Colony remainder** (Sweet Tooth frame, Cassette Cog 9T, Pivotal Seat, Wasp hubs, Rick/Guardian
  bars, stems) — re-checked; all match the existing documented walls from wave 2 (variant
  ambiguity, no standalone SKU, sold-bundled pricing mismatch, missing clamp spec). No new
  findings, no edits.
- **The Shadow Conspiracy remainder** (MFG Alloy Pegs, Feather Bars) — existing notes already
  document these as discontinued/no-current-SKU-match. Re-confirmed, no new findings.

## Distance to Douglas's 40% (90/225) go-live bar

66→67 this wave (+1). 23 more needed. The small-untouched-brand sweep this session was mostly a
wall (Chase/Sunday/Colony/Shadow already fully picked over by waves 1-2; the 8 newly-swept small
brands split between dead domains, rate-limited fetches, and one real data-quality finding — the
Standard Byke brake-mount conflict). **The two open levers from wave 2 are unchanged and remain
the best path to 40%:**

1. The complete-bike-only-frame policy call (still open, still Douglas's) — now extends to Sunday
   Forecaster/Blueprint in addition to Haro/Mongoose, so the potential yield if approved is larger
   than wave 2 estimated.
2. A retry pass on the rate-limited fetches (Verde, Supercross, United, Radio) with spaced-out
   requests — these are real unresearched leads, not confirmed walls, unlike most of what this
   wave's brand list turned out to be.
