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

---

# BMX verification wave 5 — 2026-07-20 (verify/bmx-5)

Scope: `data/bmx.js` only. Branch cut fresh off `origin/main` (commit `9fe0465`). Target per the
coordinator's brief: small parts (bars/stems/cranks/pedals/seats/pegs/hubs) on Colony, Mongoose
international, Verde, Sunday, Supercross, United, Radio — first-party static pages, complete-bike
frames allowed under the 2026-07-20 frame-exception ruling's three conditions.

## Before → after

- Before: 75/225 verified (33.3%)
- After: **76/225 verified (33.8%)** — 1 new verification. Bar (40%/90 rows) not reached.

## ★ Scoping finding — the named-brand pool was nearly exhausted before this wave started

Checked unverified-row counts per named brand before researching: **Mongoose (0 unverified),
Verde (0), Sunday (0), Radio (0)** — all fully verified already by waves 1-4. Only **Colony (9)**,
**Supercross BMX (1)**, and **United (1)** had any unverified rows at all — an addressable pool of
**11 rows total**, not enough to reach the 90-row bar (+15 needed) even at a 100% yield. This
matches wave 2/3's own conclusion that Colony/Sunday/Chase/Shadow were "already fully picked
over."

## Verified (1)

- **`bmx-fr-supercross-envyblk2-expertxl`** (Supercross BMX ENVY BLK2 Expert XL frame) —
  raw-`curl`-confirmed on `supercrossbmx.com`'s own product page: the 4-column geometry table
  (Junior/Expert/Expert XL/Expert XXL) gives Expert XL = **20.0in top tube** (exact match), the
  page explicitly states **10mm (3/8") rear axle** for this size, **threaded Euro BB shell**,
  **integrated 1-1/8"-1.5" head tube**, a **removable V-brake system**, and the Shopify JSON
  `price` field is **119595 = $1195.95** (exact match to the existing catalog price). No frame
  weight published anywhere on the page (frame-only SKU, never bundled into a complete bike) —
  verified under the frames no-published-weight exception (case a), weight stays unset.

## Colony (9 targeted, 0 new — every row independently re-confirmed as a genuine wall)

Re-fetched all 9 raw via `curl` (not WebSearch-summary — the phantom-number doctrine) and got
**identical results to waves 2-3's own findings**, byte-for-byte on the specs that matter:

- **Sweet Tooth frame** (`bmx-fr-colony-sweettooth`) — probed 4 plausible colonybmx.com.au product
  slugs; the two that 200'd are a sticker-kit page and an empty/stale placeholder, neither a real
  spec page. Confirmed: not on Colony's own current standalone-frame lineup (wave 1's finding
  stands).
- **Cassette Cog 9T** (`bmx-rc-colony-cassette-9`) — re-confirmed no standalone cog SKU exists;
  cogs ship bundled with hubs only (e.g. Wasp Race Hubset's 16T cog).
- **Pivotal Seat** (`bmx-se-colony-pivotal`) — re-confirmed the generic name isn't a real SKU;
  Colony's current seats are all specifically named (Mini Pivotal, Wallwork, Blaster, Paterico).
  Still flagged for a coordinator naming decision, not something to silently guess.
- **Official Stem / Variant Stem** (`bmx-st-colony-official`/`-variant`) — raw-confirmed real
  weights (248g / 271g-234g) but **zero mention of bar-clamp diameter** on either page (searched
  "clamp", "bar", "22.2", "25.4", "31.8" — no hits beyond nav-menu boilerplate). BMX's
  `clamp` field is a genuine two-way vocab (`25.4mm`/`oversized`, not a universal constant like
  rear axle), so this stays a real interface gap, not a formality — left unverified.
- **Wasp Front Hub** (`bmx-fw-colony-wasp`) — raw-confirmed the exact same text wave 2 found:
  "10mm bolts only" is the axle-bolt wrench size, not the axle diameter; no diameter number
  anywhere on the page. Wall confirmed, unchanged.
- **Wasp Race Cassette Hubset** (`bmx-rh-colony-wasprace`) — the product page (and its color-variant
  sub-URLs) still sells this **only as a Front/Rear pair**, no standalone rear-only SKU — the same
  THE PRICE RULE item-3 mismatch (a `rearWheel`-scoped row, price for a bundled set) wave 2 found.
- **Rick Bars / Guardian Bars** (`bmx-hb-colony-rick`/`-guardian`) — raw-confirmed both bars ship in
  2 rise/width variants each (Rick: 8.65in/28.0in-width vs 9.3in/29.0in-width; Guardian: 8.8in vs
  9.4in, both 29.0in-width) and this catalog's single generic row per model doesn't cleanly match
  either variant's rise+width pairing. Same variant-ambiguity wall wave 2 documented; left
  unverified/unchanged.

## United (1 targeted, 0 new)

- **`bmx-fr-united-supreme`** — confirmed Supreme is **not** in unitedbikeco.com's current Frames
  collection (checked the full product-title list: Zuin Miki Fleck, Prime Mover, Pro Model — no
  Supreme). Its only current first-party mention is a discount announcement blog post
  (`.../our-supreme-yellow-turquoise-fade-bmx-is-now-only-259-99`) which carries **no spec
  content** (no BB/head-tube/axle/brake text, just a £259.99 price that doesn't match this row's
  $465 anyway). Per the frame exception's case-(b) condition 1 ("interfaces sourced from the EXACT
  complete bike's fetched maker page"), a discount blurb with zero specs doesn't clear the bar —
  left unverified, no edit.

## Honest reachability call

**40% (90/225) is not reachable from this wave's assigned brand list, full stop — the pool was
already down to 11 addressable rows before this session started, and 10 of those 11 are
confirmed-exhausted walls (re-independently verified, not just re-cited from prior notes).**
Reaching 90 needs either:
1. **A brand-scope expansion beyond this wave's list** — per-brand unverified counts (Odyssey 21,
   Cult 19, Fit Bike Co 17, Fly Bikes 9, Chase 10, S&M 7, Profile Racing 8) are far larger pools,
   but Odyssey/Cult are the documented Shopify-shipping-weight-bucket wall (wave 2) and Chase/Fly
   Bikes/S&M were sample-only per waves 1/3's own findings — none are free wins, but they're the
   only pools left with enough rows to matter.
2. **A policy call, not a research problem**: several genuinely-confirmed-real specs in this wave
   and prior waves (Colony stem clamp diameters, Colony bar variant mapping, Colony hub axle
   diameter) are blocked purely on one missing/ambiguous field on an otherwise-solid manufacturer
   page — no amount of re-fetching will produce a number the page doesn't state.

---

# BMX verification wave 6 — 2026-07-20 (verify/bmx-6)

Scope: `data/bmx.js` only. Branch cut fresh off `origin/main` (commit `ea11e17`). Target per the
coordinator's brief: widen beyond wave 5's near-exhausted pool into the larger unverified brands
— Chase (10), Fly Bikes (9), S&M (7), Profile Racing (8), GT (4), Haro (3), BSD (2), Total BMX (2)
— 45 rows total, raw-`curl`-first per the phantom-number doctrine (no WebSearch-summary trust).

## Before → after

- Before: 76/225 verified (33.8%)
- After: **77/225 verified (34.2%)** — 1 new verification (S&M Pitchfork fork), 2 price
  corrections (Pitchfork + S&M Fat Pivotal Seat). Bar (40%/90 rows) not reached.

## Verified (1) + corrected (1 more, stays unverified)

Both raw-`curl`-confirmed on **sandmbikes.com** (S&M's own site) — see the wave-6 commit for
full detail:

1. **`bmx-fr-sandm-pitchfork`** (fork) — promoted. Real per-size spec table states "2.17 lb
   (.98 kg) 20"" = 980g, exact match to the existing sample weight. **Price corrected 459.99 →
   209.95** (real price for the exact SKU — no-brake-mount, 3/8"/10mm dropout, 20in; the
   990-brake-mount variant on the same page runs $219.95, still nowhere near the old figure).
2. **`bmx-se-sm-fatpivotal`** (seat) — **price corrected 49.95 → 29.95** (real sandmbikes.com
   price, replacing a stale albes.com-retailer figure). **Not verified**: only a generic "1 lbs"
   shipping-box figure exists on the page, no per-product weight — the Odyssey/Cult
   shipping-weight-bucket trap (wave 2 doctrine), and seat isn't an interface-verification-
   exception category.

## Every other targeted row: wall re-confirmed by independent raw fetch (no edits)

**Chase (10/10)** — re-confirmed chasebicycles.com has no parts/shop/components section at all
(home nav = Bikes/Team/Frames/Gear/Technologies only, `/collections/parts` 404s). Identical to
wave 3's finding.

**Fly Bikes (9/9)** — flybikes.com is a custom (non-Shopify) site with no discoverable product
catalog path from its home nav; matches waves 1/3's "discontinued/renamed, not in current
lineup" conclusion for Nassau frame + the PZ1/Mid-BB/sprocket/pegs/bars/seat/grips remainder.

**Profile Racing (8/8)** — all 8 rows were already independently exhausted by the 2026-07-17/18
depth passes (in-repo notes on each row: no matching current SKU name, price, or spec found on
profileracing.com for Race Cranks 22mm, the three sprocket "Race" names, both freecoaster/
cassette cogs, the Elite Front Wheel, or the Race Stem). Re-confirmed via this session's own
research (Column 22mm Crankset search) that Profile's real current crank lineup uses different
naming/specs than this catalog's rows assume — no new edit made, matches the existing notes.

**GT (4/4)** — gtbicycles.com's Freestyle BMX collection (Performer/Slammer/Team/Fueler/Pro
Performer tiers) has no "Fly" frame; its full parts-and-components catalog (2 pages, raw-fetched)
has no "Performer Stem," "Performer Grips," or "Mid BB" product — only differently-named generic
hardware (2pc Performer BMX Bar, BK Elevated/Mallet/NBS stems, Power Series cranks/BB). Wall
confirmed for all 4 rows.

**Haro (3/3)** — Lineage Master and Downtown DLX: harobikes.com's current BMX collection has no
matching product (only Downtown/Downtown 16/18/20/24-2025, matching wave 4's finding that the
plain Downtown frame — already verified under the frame exception — is the only current SKU;
DLX site-search returns zero hits). Downtown Fork: no standalone fork SKU exists on the current
site either (fork sold only as part of the complete Downtown bike) — this is the
complete-bike-only pattern, but the frame exception (VERIFY-PROTOCOL "Extended to FRAMES") is
scoped to `cat:'frame'` only, not forks, so it doesn't apply here. Left unverified, no edit.

**BSD (2/2)** — us.bsdforever.com's current hub lineup is Backstreet Pro / Swerve / West Coaster
/ Front Street Pro; a site search for "mind" returns literally "0 results" (confirmed via the
site's own search endpoint, not just a missing nav link). "Mind" hubs are discontinued. Wall
confirmed for both rows (front + rear).

**S&M remainder (5 of 7, beyond the 2 above)** — Holmes frame, Speedball bars, and Old School
Layback seatpost: site search for each term returns zero product results (confirmed discontinued/
never-existed-under-that-name, matching the Race XLT Bar 8" and Speedball-bars findings wave 1
already logged for the same brand). Race XLT Stem: re-fetched its real current page (found via
search, not previously located) — reach (49/53/55/57mm) and weight (10.2/10.5/10.9oz) are real,
but the page states no bar-clamp diameter anywhere, so it stays unverified under the same
precedent wave 5 applied to the Colony Official/Variant stems (clamp is a genuine two-way vocab
field, not a formality).

**Total BMX (2/2)** — the Rotary Sprocket product URLs found via search both 404 on
totalbmx.com/Shopify (redirect to the site's 404 page), and the live Sprockets collection page
contains zero "rotary" hits — Total's current sprocket lineup is Killabee-only. The "Slim
Pivotal Seat" doesn't exist either; the current Seats collection has "Slim Combo Seat" (a
seat+post integrated combo, a structurally different product) but no standalone pivotal seat by
that name. Both rows confirmed discontinued/renamed, no edit made.

## Honest reachability call (wave 6)

**Still not reachable from this brand list — the wave-5 forecast held.** 44 of the 45 targeted
rows independently re-confirmed as genuine walls (discontinued models, no-current-SKU-match, or
missing a single interface field the engine reads); only 1 new verification and 1 additional
honest price correction came out of the full 8-brand, 45-row sweep. 76→77 (+1); 13 more needed
for 90.

**This wave's finding sharpens wave 5's diagnosis rather than changing it**: the assigned brand
list (Chase/Fly Bikes/Profile Racing/GT/Haro/BSD/Total BMX) is a genuinely *smaller* boutique-BMX
tier than Colony/Sunday/Odyssey/Cult — most of these brands simply don't sell parts standalone
online at all (Chase, Fly Bikes, much of GT), or their catalog has drifted enough since this
data was entered that specific SKU names/specs no longer exist (Profile Racing, Total BMX,
S&M Holmes/Speedball, BSD Mind). Unlike Colony (wave 2/3/5), there is no real-but-blocked
research residue left in this pool — the rows that didn't verify aren't one fetch away from
clearing, they're discontinued products.

**The two paths to 90 remain unchanged and are now the only ones left standing:**
1. A brand-scope expansion to Odyssey/Cult (40 unverified rows combined) — but both are the
   documented Shopify shipping-weight-bucket wall (wave 2); clearing them needs either a policy
   change (accept a shipping-weight bucket as a rough sample, clearly labeled) or a different data
   source entirely (e.g. a third-party measured-weight database per THE BAR item 2b, which so far
   has only been applied to Shimano/SRAM-rotor classes).
2. The still-open policy call from waves 1/2/3/5: several genuinely-confirmed-real specs (Colony
   stem/bar clamp+variant ambiguity) are blocked on one missing field, not a research gap.

---

# BMX verification wave 7 — 2026-07-20 (verify/bmx-7)

Scope: `data/bmx.js` only. Branch cut fresh off `origin/main` (commit `3a6293c`). Target per
Douglas's dispatch: the ~40 unverified Odyssey/Cult small parts, now unblocked by a same-day
ruling extending the interface-verification exception to BMX small parts (see
`tools/VERIFY-PROTOCOL.md`'s new "Extended to BMX small parts" paragraph) - `verified:true` can
attest interfaces alone; the weight field never takes a Shopify shipping-weight figure.

## Before -> after

- Before: 77/225 verified (34.2%)
- After: **90/225 verified (40.0%)** - 13 new verifications. **Bar cleared exactly on the nose.**

## Method

Raw-`curl`'d `shop.odysseybmx.com/products.json` and `cultcrew.com/products.json` (both
Shopify) across their full paginated catalogs (~1170 Odyssey-family products across Fairdale/
BSD/Sunday/Odyssey, ~266 Cult products) to find each row's real current product handle, then
raw-fetched each `/products/<handle>.js` for its description text, tags array, and variants -
never trusting a WebSearch/WebFetch summary per the phantom-number doctrine. New finding this
wave: a Shopify product's `tags` array sometimes carries a structured spec line straight from
the maker's own catalog metadata (e.g. Odyssey's R32 fork page tags include literally
`"Brake Mounts:None"`) - raw first-party JSON, not a fabrication risk, worth checking alongside
the description body.

Before verifying anything, cross-checked which fields are ACTUALLY read by `checkBmxBuild`
(`src/compat-bmx.js`) vs schema-required-but-display-only, since the wave-2/5 notes had been
treating some display-only fields as load-bearing gates:
- **Display-only (confirmed via grep - no rule references them):** fork/headset `steerer`/`fit`
  (line 62's own comment: "no headset rule fires"), handlebar/stem `clamp` (line 64: "display-only
  ... no clamp rule" - `checkBmxBuild` doesn't even destructure `handlebar`/`stem` from the build),
  gyro `steererFit`/`cableRouting`, handlebar `rise`/`width`, pedal `platform`/`spindle` (pedals
  carry zero compat rules of any kind).
- **Load-bearing (a rule genuinely reads it, confirmed by grep):** wheel `wheelSize`/`axle`, fork/
  frame `brakeMount`, chain/sprocket/rearCog `pitch` (two real values, 1/8 vs 3/32 - genuinely
  two-way, unlike clamp), seat/seatpost `system`, crank `spindle`/`pieces`/`ringMount`, bb `shell`/
  `spindleFit`, headset none (dormant).
This matters: several wave-2/5 rows were left unverified purely because a *display-only* field
(steererFit, clamp) wasn't stated on the maker page - that was never actually blocking, and this
wave's clarified reading is now recorded in `VERIFY-PROTOCOL.md` for future sessions.

## Verified (13)

**Odyssey (9), all shop.odysseybmx.com:**

1. **`bmx-fk-odyssey-r32`** (R32 fork) - **brakeMount CORRECTED `u-brake` -> `none`**: the page's
   own Shopify tags state `"Brake Mounts:None"` verbatim. Axle (10mm) and weight (885g) both
   raw-confirmed in the spec list text ("Weight: 1lb 15.2oz (885 grams)") - a real per-SKU figure,
   independently corroborated as NOT the JSON shipping-weight-bucket field (which separately shows
   2268g on the same product). Fixed a stale test fixture in `test/test-bmx-engine.js` that had
   used this fork as a "u-brake bosses" positive-match example - swapped to
   `bmx-fk-fitbikeco-tibs`, which genuinely carries `u-brake`.
2. **`bmx-cr-odyssey-calibre`** (Calibur v2 Cranks) - spindle/pieces/ringMount all raw-confirmed;
   no maker weight, stays sample.
3. **`bmx-bb-odyssey-mid-22`** / 4. **`bmx-bb-odyssey-mid-19`** (Mid BB, both spindle variants) -
   raw-confirmed as the same product's two variant options ("fit all 19mm or 22mm crank
   spindles... press-fit Mid BB frames"); no weight field on either row.
5. **`bmx-sp-odyssey-standard-post`** (Tripod Seat Post) - diameter (25.4mm) explicit in the spec
   list; system:'standard' consistent with the railed (non-pivotal) design described.
6. **`bmx-ch-odyssey-seance`** (Bluebird Half-Link Chain) - pitch explicit ("1/2 x 1/8 size")
   and half-link construction both raw-confirmed.
7. **`bmx-gy-odyssey-g3kit`** / 8. **`bmx-gy-odyssey-gtxs`** (Gyro G3 Kit, GTX-S Gyro) -
   dual-cable design and price confirmed; steererFit/cableRouting are display-only so their
   unconfirmed values don't gate. GTX-S's JSON weight field (227g) had no description-text
   corroboration, so NOT trusted per the phantom-number doctrine - weight stays sample.
9. **`bmx-pd-odyssey-trailmix`** (Trailmix Looseball Pedals) - platform ("Alloy" tag + "Aluminum
   body") and spindle (explicit "Spindle: 9/16 inch" spec line) both raw-confirmed; pedals carry
   zero `checkBmxBuild` rules at all, so this is the cleanest possible case. The 1361g JSON weight
   is the exact shipping-bucket figure wave 2 already caught on this SKU - correctly not carried
   over.

**Cult (4), all cultcrew.com:**

10. **`bmx-hs-cult-integrated`** (Integrated Headset -> real product "Headset"/`og-headset`) -
    `fit` is display-only (no BMX headset rule fires at all), so its unconfirmed value doesn't
    gate; price ($27.99) matches. No weight field on the row.
11. **`bmx-se-cult-paddedpivotal`** (Padded Pivotal Seat -> real product "Kevlar Padded Seat") -
    raw-confirmed "only available in pivotal" (system:'pivotal' is the one field the
    bmx-seat-system rule reads); price ($44.99) matches exactly.
12. **`bmx-se-cult-vansoldschool`** (x Vans Old School Pro Pivotal Seat -> real product "Cult x
    Vans Old Skool Seat") - raw-confirmed "pivotal seat" in the description; price ($44.99)
    matches exactly.
13. **`bmx-hb-cult-ak`** (AK Bars) - **rise CORRECTED 8.0 -> 10.0, width CORRECTED 28.75 -> 30.0**:
    the maker's own spec list states 30in width, 12deg backsweep, 2deg upsweep, 10in rise
    verbatim, both figures were wrong. clamp is display-only (handlebar/stem aren't even read by
    `checkBmxBuild`), so its unconfirmed value doesn't gate. Price ($79.99) matches.

All 13 rows' JSON `weight` variant fields were checked and discarded where present (907g/1361g/
2268g/6804g - round-number Shopify shipping-bucket defaults, several literally identical across
unrelated products on the same store) except the two cases (R32 fork, Trailmix pedals) where the
real weight was independently corroborated in the description's own spec-list text, not the JSON
field.

## Researched, NOT verified - genuine walls, no edit

- **Cult small parts with no current-SKU match:** Dak Bars, Dak Grips (no "Dak Bars"/"Dak Grips"
  product exists on cultcrew.com - current Dak-branded items are Frame/Sprocket/Pedal only, same
  discontinued-naming pattern as prior waves), Spline Drive Sprocket 28T (current sprocket lines
  are NWO/DAK Guard, neither literally "Spline Drive"), generic Pivotal Seat (still no plain
  $29.99 SKU - the current lineup's cheapest pivotal seat is $44.99, matching wave 4's finding).
- **Cult NWO Sprocket 25T/28T** - teeth confirmed exactly (25t/28t/30t real variants), but pitch
  (a genuine two-way vocab field, 1/8 vs 3/32, unlike clamp) is never stated on the page
  ("Compatible with all BMX chains" is the closest text) - stays unverified, consistent with the
  Odyssey Utility Pro Sprocket 30T call below.
- **Odyssey Utility Pro Sprocket 30T** - re-confirmed teeth (30T, sprocket-only variant) and
  price, but pitch still unconfirmed (no maker statement, no tag) - same call as wave 4, left
  unverified.
- **Odyssey Vandero Pro Front Hub** - axle confirmed, but `wheelSize` (load-bearing, rule 1) is
  never stated on a hub-only product page (hubs aren't sized) - genuinely unconfirmable from this
  source, left unverified per wave 4's original reasoning (re-confirmed, not overridden).
- **Odyssey Elementary Stem / Elementary Stem V2, Cult Hi-Fi Stem, Cult Dak Grips** - no matching
  current-SKU product found in either store's full product listing (discontinued/renamed),
  matching prior waves' conclusion.
- **Odyssey Keyboard v1 Grip (Aaron Ross), BROC Bar** - grip colorway exists but the specific
  "Aaron Ross" trim wasn't isolated with confidence in the time available; BROC bar wasn't found
  under that name (only BROC seat/grip/stem SKUs). Left unchanged, a real lead for a future pass.

## Distance to Douglas's 40% (90/225) go-live bar

77->90 this wave (+13). **Bar cleared exactly on the nose (90/225 = 40.0%).**

---

# BMX hygiene pass — 2026-07-20 (catalog/bmx-hygiene-1)

Scope: `data/bmx.js` only, per the coordinator's brief — NOT a verification wave (the 40%
bar was already cleared by wave 7 above). Target: the Colony variant-ambiguity set flagged
across waves 2/3/5 (see "Also confirmed real (raw curl), but NOT verified" above and its
wave-5 re-confirmation) — products sold in 2+ rise/width variants behind one generic catalog
row. A grep of the whole notes file for this pattern turned up exactly two candidates, both
Colony bar models (`bmx-hb-colony-rick`, `bmx-hb-colony-guardian`); the Colony stem pair
(Official/Variant) is a *different* wall (missing clamp-diameter field, not a rise/width
split) and was left untouched.

## Rows before -> after

225 -> 227 (net +2: 2 generic rows removed, 4 variant-specific rows added).

## Split map

| Old (removed) | New rows | Source of split fields |
|---|---|---|
| `bmx-hb-colony-rick` (rise:8, width:29 guess) | `bmx-hb-colony-rick-865-28` (8.65in / 28.0in / 1039g), `bmx-hb-colony-rick-93-29` (9.3in / 29.0in / 1056g) | colonybmx.com.au, raw-curl-confirmed by BMX verify waves 2/3/5 (not re-fetched this pass) |
| `bmx-hb-colony-guardian` (rise:8, width:29 guess) | `bmx-hb-colony-guardian-88-29` (8.8in / 29.0in / 864g), `bmx-hb-colony-guardian-94-29` (9.4in / 29.0in / 942g) | same |

Both old ids retired by removal (not `status`/`supersededBy` or `ALIASES`): BMX has neither
mechanism — `src/schema-bmx.js`'s `COMMON` field allowlist has no `status`/`supersededBy`
entry, and BMX carries no `ALIASES`/`canonicalId` table (that's MTB-only, `src/compat.js`).
Editing `src/schema-bmx.js` to add them was out of this pass's scope (`data/bmx.js` +
this file only). Confirmed via grep across `data/`, `src/`, `test/` that neither old id was
referenced anywhere before removal — same check the file's own prior
`bmx-gr-odyssey-keyboard` removal (2026-07-17) applied, which is the precedent this pass
follows. New ids are net-new strings, so the append-only rule (never reuse a retired id)
still holds even without a formal alias record.

Price on all 4 new rows is unchanged from the old row's danscomp.com (retailer) figure,
carried forward per variant since no manufacturer per-variant USD price was found — none of
the 4 rows are `verified:true` (weight/rise/width are real colonybmx.com.au numbers per the
prior waves' raw-curl findings, but this pass didn't re-fetch them itself, and price
provenance doesn't clear THE BAR). Verified count is unchanged at 90 (now 90/227, a smaller
share of a slightly larger catalog) — expected for a hygiene pass, not a verification wave.

## Gates

`node validate.js`: **DATA OK / KIT OK / BMX OK (227 parts, 0 problems, 90 verified) / STRIDER
OK / ROAD OK / GRAVEL OK / EMTB OK**. `npm test`: **844 passed (844)**. `npm run typecheck`:
clean, no output.
