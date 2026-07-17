# verify-fanout-1-fox-shocks — progress log

Branch `verify/fanout-1-fox-shocks`, based on origin/main @ 1d58c23. Scope: every
unverified (`verified` absent/false) `cat:'shock'` row where `brand:'Fox'` — 80
rows at session start (re-counted via a small Node script `require`-evaluating
`src/compat.js` in a VM sandbox, not `tools/verify-job.js`, per the brief).
Does NOT touch `tools/verification-job.json`. Not pushed to main.

Excluded per the brief: `cb-santacruz-highball-r`, the two Aeffect R stem
dup ids, `cb-yeti-sb135-t2/t3` fills — none are shocks, none touched.

## Technique this session: `curl` the Shopify JSON directly (no unblocker needed)

`ridefox.com` is Shopify. `curl -A "Mozilla/5.0" https://ridefox.com/products/<handle>.js`
returns the full variant matrix (title/SKU/price/availability) as clean JSON —
no rate-limiting hit this session (unlike prior sessions' 429s), no Bright Data
or Wayback needed for any of the 26 verifications below. `bdata`/Exa were not
needed this session — flagging in case that's a fluke of timing rather than a
permanent unblock.

Discovered the **full current Fox "Shocks" product_type catalog** (17 handles,
confirmed via `ridefox.com/products.json?limit=250` pages 1-5, 1239 total
products across every Fox product line) — this is now the authoritative list
of what Fox actually sells at retail today:

```
floatx2-neo, my27-fox-floatx-neo, fox-float-x-factory, my27-fox-floatx-pse,
my27-fox-dhx-neo, fox-dhx-factory, float-sl-factory, fox-float-dps-factory,
float-x2-performance-elite, float-x2-factory, dhx2-factory,
fox-float-x2-factory-my24 (OLD GEN, still live), fox-float-sl-performance,
fox-float-dps-performance, fox-dhx2-factory-my24 (OLD GEN, still live),
fox-float-performance, fox-float-factory
```

**Confirmed ABSENT from Fox's entire 1239-product catalog** (every product
type, not just Shocks) via handle + title regex sweep: `van` (Van Performance
Coil), `nude` (any Scott NUDE variant), `rhythm`/`rythm`, `dpx2`. These are
firmly OE-only/discontinued/third-party-exclusive — not a fetchability gap,
a confirmed non-existence on Fox's own storefront.

## Verified this session (26 rows, catalog-wide 2675 -> 2701)

All promoted under the **shocks nominal-weight exception** (VERIFY-PROTOCOL.md):
eye/stroke/mount/spring cross-matched against the live Shopify variant JSON I
fetched myself this session (`lastChecked:'2026-07-17'`); weight stays each
row's pre-existing nominal sample (basis already documented in `desc`, now
re-affirmed as "nominal" rather than "not verified").

- **Float X Factory** (`fox-float-x-factory`): `-210x52p5`, `-205x60-trun`,
  `-190x45` — PN 979-01-229/234/227.
- **Float X2 Factory** (`float-x2-factory`): `-210x50`, `-210x52p5`,
  `-230x60`, `-230x62p5`, `-185x55-trun`, `-230x65`, `-250x75`,
  `-225x75-trun` — PN 979-01-204/205/207/208/210/209/213/214.
- **DHX2 Factory** (`dhx2-factory`): `-210x50`, `-230x60`, `-185x55-trun`,
  `-205x60-trun` (id `sh-fox-dhx2-*`, no `-factory-` token but same tier) —
  PN 978-01-604/606/609/610.
- **DHX Factory** (`fox-dhx-factory`): `-210x55`, `-230x60`, `-230x65`,
  `-185x55-trun`, `-205x60-trun`, `-205x62p5-trun` — PN
  960-01-055/056/057/058/059/060.
- **Float SL Factory** (`float-sl-factory`): `-165x40-trun` — PN 972-01-542
  (price corrected, see below).
- **Float DPS Factory** (`fox-float-dps-factory`, imperial-to-metric
  conversion): `-190x51`, `-200x51`, `-184x44` — PN 972-01-474/477/498.
- **Float X Performance Elite** (`my27-fox-floatx-pse`):
  `sh-fox-float-x-performance-elite-210x55` — PN 979-01-238 (price corrected,
  see below).

Several `available:false` (currently out of stock) — still real, currently
listed Fox SKUs with a real PN; stock status doesn't gate verification, only
whether the SKU/interface is genuinely sold.

## Corrections made (price, caught by this session's direct re-fetch)

- **`sh-fox-float-x2-factory-250x75`** and **`-225x75-trun`**: price
  `809 -> 769`. Real Fox pricing quirk: the 4-way HSC-LSC-HSR-LSR DH-tune
  variants are genuinely $40 cheaper than the 2pos-Adj variants on the exact
  same product page — the prior $809 assumed a uniform Factory-tier price.
- **`sh-fox-float-sl-factory-165x40-trun`**: price `369 -> 519`. A prior
  session flagged "the same URL shows $369 one day and $569 the next" as an
  unreconciled discrepancy. Resolved this session: they're **two different
  real Fox products** — `fox-float-sl-performance` sells 165x40-trunnion at
  $369 (PN 972-01-524), while `float-sl-factory` sells the *same interface
  size* at $519 (PN 972-01-542). The row's own id says `-factory-`, so it
  belongs on the Factory-tier page/price, not the Performance one.
- **`sh-fox-float-x-performance-elite-210x55`**: price `499 -> 599`, matched
  directly against `my27-fox-floatx-pse` (PN 979-01-238). This row's eye/
  stroke had been *inferred* from the frame's own page (Fox's own trim page
  prints no dimensions) — now independently corroborated by a direct Fox
  fetch of the Performance Elite product itself, confirming the same 210x55
  size is a genuine current SKU.

## Confirmed OE-only / no-retail-SKU (left unverified/Skipped, not fabricated)

The remaining ~53 rows split into two buckets, both already well-documented
in each row's own `desc` by prior sessions; this session's full-catalog sweep
**corroborates rather than changes** their unverified status:

**(a) Whole tier confirmed absent from Fox's retail catalog** (not just this
size — the tier itself isn't sold under Fox's own brand at all):
- `fox-float-x` **Performance** (non-Elite, non-Factory) — 10 rows
  (`sh-fox-float-x-performance-*`). No `fox-float-x-performance` handle
  exists; only Factory and Performance Elite are real Fox SKUs.
- `fox-float-x2` **Performance** (base tier) — 3 rows
  (`sh-fox-float-x2-performance-*`, plus `sh-fox-x2-performance-elite-250x70-std`
  whose exact 250x70 size also isn't in `float-x2-performance-elite`'s matrix).
- `fox-dhx` **Performance** — 1 row (`sh-fox-dhx-performance-230x62p5`). DHX
  is Factory-only at retail.
- `fox-van` **Van Performance Coil** — 1 row. Confirmed absent from Fox's
  entire 1239-product catalog (not just Shocks).
- `fox-float-rhythm`/`fox-float-rythm` — 3 rows. Confirmed absent
  catalog-wide (matches the prior fork-session finding that Rhythm is
  OE-only across Fox's whole product line, not just forks).
- `fox-float-dpx2` — 3 rows. DPX2 confirmed absent catalog-wide
  (discontinued/superseded by Float X, as prior sessions already concluded).
- `fox-nude-tr`/`fox-nude-scott-oem`/`fox-nude6-scott-oem` — 4 rows. NUDE
  confirmed absent from Fox's own catalog under any name — genuinely a
  Scott-exclusive co-developed shock Fox doesn't sell as a Fox-branded
  product at all.
- Plain **Float Performance Elite** (non-X) — 2 rows
  (`sh-fox-float-performance-elite-210x55`, `sh-fox-float-performance-elite-190x45`).
  No such tier exists for the non-X Float line (only Factory/Performance).
- **Float SL Performance Elite** middle tier, `-210x50` — 1 row
  (`sh-fox-floatsl-performanceelite-210x50`). No 210x50 in either real SL
  tier (Factory or Performance).

**(b) Tier exists at retail, but this exact size doesn't** (confirmed absent
from that tier's live variant matrix, so still genuinely OE-only for this
size specifically):
- `sh-fox-dhx2-factory-230x62p5` (Orbea OE) — dhx2-factory sells 230x60/65,
  not 230x62.5.
- `sh-fox-float-x-perf-elite-185x55-trun` (Privateer OE) and
  `-230x57p5` (Orbea OE) — `my27-fox-floatx-pse` sells only 190x45/210x50/55.
- `sh-fox-float-x2-factory-205x62p5-trun` (Vitus OE) — sells 205x60/65-trun,
  not 62.5.
- `sh-fox-float-factory-210x52p5` (Ibis OE) — fox-float-factory sells
  190x45/210x50/55/185x50/52.5/55-trun, not 210x52.5.
- `sh-fox-float-performance-210x50` (Santa Cruz OE) — fox-float-performance
  sells only 210x55/185x55-trun/190x45.
- `sh-fox-float-performance-205x65-trun` (Marin OE), `-190x40` (Specialized
  OE) — same tier, neither size exists.
- `sh-fox-dhx2-205x62p5-trun` (Norco OE) — dhx2-factory has 205x60-trun only.
- `sh-fox-float-dps-performance-*` (210x52.5/210x50/210x55/190x45, 5 rows,
  various OE) and `sh-fox-dps-performance-elite-evol-lv-*` (2 rows) —
  fox-float-dps-performance's matrix is imperial+165x40/185x55-trun only;
  none of these metric std sizes convert to a matrix entry.
- `sh-fox-float-x-factory-185x52p5-trun` (Giant OE), `-205x65-trun` (Pivot
  Firebird OE), `-165x45-trun` (Pivot Trail 429 OE) — fox-float-x-factory's
  matrix doesn't include these three exact sizes.
- `sh-fox-float-x2-factory-230x57p5` (Unno OE) — float-x2-factory sells
  230x60/62.5/65, not 57.5.
- `sh-fox-float-performance-185x52p5-trun` (Liv/Giant OE) — same tier as
  above, size not in matrix.
- `sh-fox-floatsl-performanceelite-165x45-trun` (Giant OE) — **flagged
  separately below, not a clean absence.**

## Flagged for the coordinator — NOT resolved, NOT silently changed

- **`sh-fox-floatsl-performanceelite-165x45-trun`**: the row claims
  "Performance Elite" tier at 165x45-trunnion. That EXACT interface (165x45
  trunnion, air) **does exist** as a real current Fox SKU — but under the
  **Factory** tier name (`float-sl-factory`, PN 972-01-573, $549, Evol
  LV+3pos-Adj), not "Performance Elite" (no such SL tier exists at all, per
  the full sweep above). I did not verify this row: doing so would mean
  either (a) claiming a Fox "Performance Elite" product that doesn't exist,
  or (b) silently reclassifying the row to Factory tier/pricing without a
  human call. Interface fit is real and buildable; the tier-name/price
  fields are the open question. Recommend the coordinator decide whether to
  retier this row to Factory (id is append-only, so a rename would need an
  `ALIASES` entry) or leave it as an honest unverified sample.
- **`sh-fox-float-custom-evol-performance-185x55-trun`** (Scott Genius 930,
  `oemOnly:true`, `forFrames:['fr-scott-genius-alloy']`): this row's exact
  interface (185x55 trunnion, air) **also matches** a real retail Fox Float
  Performance SKU (PN 972-01-534, $379, non-X, plain "Float" family) — i.e.
  Fox does sell this exact eye/stroke/mount at retail under its own generic
  Performance tier, which would seem to contradict the row's `oemOnly:true`
  claim that it's Scott-exclusive. I deliberately did NOT verify or flip
  `oemOnly` this session: Scott's own page calls it a "Custom" tune
  (different valving from the generic retail Performance damper), and
  `oemOnly`/`forFrames` gate other engine behavior I didn't want to touch
  without a coordinator call on a shock-verification-scoped branch. Flagging
  the interface-match finding here rather than silently overwriting a
  deliberate prior-session judgment call.

## Contradictions with already-verified rows

None found. No previously-`verified:true` Fox shock row's weight/price/
interface was contradicted by this session's fresh fetches (the one
previously-partially-sourced row, `sh-fox-float-x2-factory-230x65`, had
`lastChecked`/`source` set to a Santa Cruz page but no `verified:true` —
promoted cleanly this session with a direct Fox source added alongside the
existing Santa Cruz corroboration, nothing removed).

## Gates (after the one commit this session)

- `node validate.js`: **0 problems** (2701 verified / 2324 unverified,
  catalog-wide; up from 2675 verified at session start).
- `npx vitest run`: **695/695 passed** (baseline unchanged from origin/main).
- `npx tsc --noEmit`: clean, no output.
- `node tools/verdict-audit-harness.js`: 0 NAME-vs-FIELD flags, 0 preset
  conflicts, 329/329 assemble-clean (0 errors), 5/5 wheel-substitution clean,
  15/15 adversarial clashes correctly flagged, 2/2 compatible-partials
  correctly clean. (The rotor-max section's 5 pre-existing fork-family
  false-warn notes are unrelated to this session's shock rows — untouched.)

## Summary

- Fox shocks unverified at session start: **80**.
- Verified this session: **26** (all under the shocks nominal-weight
  exception; 3 real price corrections found and fixed).
- Confirmed-still-correctly-unverified (OE-only/no-retail-SKU, corroborated
  not re-litigated): **52**.
- Flagged for coordinator judgment (interface real, tier/oemOnly question
  open): **2** (`sh-fox-floatsl-performanceelite-165x45-trun`,
  `sh-fox-float-custom-evol-performance-185x55-trun`).
- 26 + 52 + 2 = 80. Worklist exhausted — every row was researched and
  classified; nothing was skipped for lack of time.

No new vocab needed. No id renames. No test weakened.
