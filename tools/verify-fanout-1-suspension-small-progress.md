# verify/fanout-1-suspension-small — progress log

Scope: MRP shocks, Manitou forks, DVO fork/shock remainder (per fanout-1 brief).
Base: origin/main @ 1d58c23. Branch: `verify/fanout-1-suspension-small`.

## Before -> after (brand totals, fork+shock rows)

| Brand | Before | After | Delta |
|---|---|---|---|
| MRP | 4/19 verified | 18/19 | +14 |
| Manitou | 34/45 verified | 42/45 | +8 |
| DVO | 15/86 verified | 59/86 | +44 |
| **Total** | **53/150** | **119/150** | **+66** |

## Batch 1 (commit 7816ac0) — MRP Hazzard + Manitou Dorado

- **MRP Hazzard shock, all 14 SKUs verified.** Re-fetched
  mrpbike.com/collections/shocks/products/hazzard directly: confirmed the
  full 14-size eye x stroke x mount matrix (210x50/52.5/55 + 230x57.5/60/
  62.5/65 std; 185x50/52.5/55 + 205x57.5/60/62.5/65 trunnion), coil-only
  spring, $729.95 MSRP across all sizes (matches stored price exactly - no
  correction needed). Weight stays nominal per the shocks
  interface-verification exception: the page's only weight figure (867g at
  230x60) includes a 500lb Enduro SL spring and doesn't match this
  catalog's without-spring convention, so the existing damper-only sample
  weights (500-530g) are kept, basis noted in each desc.
- **Manitou Dorado Pro/Expert 180/190 x 29/27.5 (8 rows) verified.**
  Re-fetched hayesbicycle.com (Manitou's own retail site, already the
  established source for the sibling 203mm rows) for both my22-dorado-pro
  and new-my22-dorado-expert: wheel (27.5/29), travel (180/190/203
  internally adjustable), axle (20x110 Boost), steerer ("1-1/8 Straight"),
  brake mount (Post Mount, 203mm native / 223mm max), max tire (67mm/2.64in)
  all confirmed verbatim, matching every stored field exactly. Weight
  stays nominal per the new 2026-07-17 fork interface-verification
  exception: the page states one weight (2970g Pro / 3120g Expert) not
  tied to a specific travel point among the 180/190/203 options.

### Skipped, not verified (Batch 1 territory)

- **fk-mrp-ribbon-air-29-160**: MRP no longer sells "Ribbon Air" under that
  name (current mrpbike.com lineup: Ribbon SL Rally, Ribbon LT, Ribbon LT
  Coil, Baxter 2, Bartlett, Rock Solid Carbon — confirmed via site search).
  No archive.org snapshot found at any guessed URL
  (`archive.org/wayback/available` returned empty for 3 candidate paths).
  Left unverified; row's existing source (a BikeRadar review) stays as-is,
  no manufacturer page fetchable this session.
- **fk-manitou-mezzer-pro-29-180**: current hayesbicycle.com only sells the
  Mezzer Pro G2 (150/160/170mm, no 180 option) — confirmed by direct fetch
  and a site search for "mezzer pro" (G2, LT Pro G2, Expert only, no
  original-gen listing). This row models the pre-G2 original generation,
  which has no fetchable current manufacturer page. Existing flag in the
  row's desc (maxRotorF possibly wrong, borrowed from G2) stands; left
  untouched.
- **fk-manitou-circus-expert-26-100** / **-straight** (2 rows): the 2010-era
  DJ fork has no live manufacturer page — hayesbicycle.com/products/
  my21circusexpert 404s (confirmed via WebFetch and bdata scrape), no
  archive.org snapshot at that or the manitoumtb.com guess. Site search
  shows only a stale price-listing search hit, no spec page. Left
  unverified; no action taken.

## Batch 2 (commit 7f1228a) — DVO Topaz Gen1/Gen3 + Jade + Jade X shocks

All four shock lines' full manufacturer size matrices were re-fetched
directly from dvosuspension.com and matched exactly against every
remaining unverified row:

- **Topaz Gen 1 (14 rows)**: dvosuspension.com/product/gen-1/ — Standard
  216x63.5/57.5, 200x57/51, 190x50; Trunnion 205x65/62.5/60/57.5,
  185x55/52.5/50, 165x45/42.5/40. Air spring confirmed.
- **Topaz Gen 3 (9 rows)**: dvosuspension.com/product/topaz-gen-3/ —
  Metric 190x40/42.5/45, 210x50/52.5/55, 230x60/62.5/65; Trunnion
  165x40/42.5/45, 185x50/52.5/55, 205x60/62.5/65. Air spring confirmed.
  (One row, 230x65, is referenced by a completebike's fills.)
- **Jade X (11 rows)**: dvosuspension.com/product/jade-x/ — Metric
  230x65/60/57.5, 210x55/52.5/50; Trunnion 205x65/62.5/60/57.5,
  185x55/52.5/50. Coil spring, sold without spring, confirmed.
  **Correction**: all 11 rows carried a stale $550 sample price;
  corrected to $499 to match the page and the two already-verified Jade X
  siblings (230x65, 205x65-trun), which already had 499.
- **Jade (10 rows)**: dvosuspension.com/product/jade/ — Metric
  210x50/55, 230x60/65, 250x70; Trunnion 185x50/52.5, 205x60, 225x70/75.
  Coil spring confirmed. $399 MSRP matched, no correction needed.
  (One row, 230x65, is referenced by a completebike's fills.)

All weights stay nominal per the shocks interface-verification exception
(no per-size weight published on any of these four pages beyond the
reference figures already used by verified siblings, e.g. Topaz Gen 3's
one stated 492g figure for the 205x60-trun config specifically).

### Fetch-reliability note (not a data problem, logged for the record)

An initial WebFetch of dvosuspension.com/product/jade/ with a normal
prompt summarized the dropdown and appeared to omit the 250x70/225x70/
225x75 sizes, which conflicted with the prior 2026-07-11 session's desc
text claiming they were directly confirmed. A second fetch demanding the
literal, unsummarized dropdown text confirmed all three sizes are real
and currently sold — the first fetch's summarization simply dropped them,
not a data error. Documented in case a future session hits the same
apparent conflict.

## Not attempted / explicitly out of scope this session

The remaining 27 unverified DVO fork rows were investigated but NOT
verified — every one is blocked by a genuine THE BAR gap, not left for
lack of time:

- **Onyx SC D1 (5 rows: 160/180 x29, 160/170/180 x27.5)**: dvosuspension.com
  no longer sells an "Onyx SC D1" product page — the only live page found
  is Onyx SC D2 OEM (29in ONLY, 160-180mm), which explicitly does not cover
  the D1 generation or any 27.5in option. The existing verified sibling
  (fk-dvo-onyx-sc-d1-29-170) is sourced from vitalmtb.com's product guide,
  not dvosuspension.com directly - that's a legacy source basis this
  session did not re-litigate (out of scope: touching an already-verified
  row). No current manufacturer page for the D1 generation exists to
  extend that basis to the remaining 5 rows. Left unverified.
- **Diamond Boost (4 rows)**: already correctly marked `status:'discontinued'`
  by a prior session (2026-07-13) with interfaces sourced partly from
  vitalmtb.com/reviews (axle, steerer) rather than a DVO page - fails bar
  item 1 ("interfaces are ALWAYS manufacturer-sourced, no exceptions").
  Confirmed this session that dvosuspension.com's current shop still
  doesn't sell anything under the "Diamond Boost" name. Left unverified,
  matching the prior session's own correct judgment - no action needed.
- **Diamond 36 D1 SL (3 rows: 140/150/160, all 29in)**: re-fetched
  dvosuspension.com/product/diamond-d1-2024/ directly and confirmed wheel,
  travel range, axle, and brake mount/rotor — but the page does NOT state
  a steerer type (tapered vs straight) anywhere; confirmed by a follow-up
  fetch asking specifically for steerer text ("The page does not explicitly
  state the steerer tube type or diameter"). Steerer is a verdict-driving
  interface field (rule 11/20a), so bar item 1 is not met. The existing
  `steerer:'tapered'` value is an inference (correctly left unverified by
  the prior 2026-07-13 session, which flagged the exact same gap). Left
  unverified.
- **Onyx 38 D1 SL (1 row, referenced by a completebike) / Onyx D1 38
  (3 rows)**: same steerer gap. Re-fetched dvosuspension.com/product/
  onyx-d1-38/ (the URL both catalog families cite) and confirmed travel,
  axle, and brake mount, but steerer type is unstated on the page (fetch
  explicitly confirmed this). Also flagging a probable **duplicate-family
  concern for the coordinator**: `dvo-onyx-d1-38` (2023, $1187, 2310g) and
  `dvo-onyx-38` (2024 "D1 SL", $1149, 2529g) both cite the same
  dvosuspension.com/product/onyx-d1-38/ URL, which today serves only the
  "Onyx 38 D1 SL" content matching the `dvo-onyx-38` family. No separate
  live page for the distinct older `dvo-onyx-d1-38` chassis was found -
  it may be a consolidated/renamed product with two family slugs in this
  catalog, or a genuinely separate discontinued model. Not resolved this
  session; recommend a coordinator review before further data entry on
  either family. Left both unverified.
- **Sapphire 32 (4 rows) / Sapphire 34 (6 rows) / Sapphire 26in (1 row)**:
  no current dvosuspension.com product page exists for any Sapphire fork —
  site search for "sapphire" returns only spare-parts listings
  (air-shaft-assembly, bottom-case-assembly, etc.), no main product page.
  Consistent with a fully discontinued line with no fetchable spec page.
  Left unverified.

## Gates (both batches)

- `node validate.js`: 0 problems throughout (2689 -> 2741 verified parts
  across the session).
- `npx vitest run`: 695/695 passed both times (matches the stated 695
  baseline — no test weakened or added).
- `npx tsc --noEmit`: clean (no output) both times.
- `node tools/verdict-audit-harness.js`: A/B/C/C2/D/D2 all clean both
  times (0 flags, 0 preset conflicts, 329/0 assemble errors, 15/15
  adversarial catches, 2/2 partial-wheel non-regressions). Section E
  (rotor-max informational notes) is pre-existing and unrelated to this
  session's rows (dvo-diamond-d1sl, dvo-onyx-sc, srsuntour families — none
  touched this session).

## New vocab

None needed — every row used existing schema/vocab values.

## Rows explicitly NOT touched (per brief exclusions)

cb-santacruz-highball-r, the Race Face Aeffect R stem dup pair,
cb-yeti-sb135-t2/t3 fills, tools/verification-job.json,
fr-santacruz-megatower-cc, test/test-golden.js.
