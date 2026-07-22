# Fork measured-weight sweep — mw1 (2026-07-21)

Branch: `verify/mtb-forks-measured-1` (no commits — see Outcome).

## Scope

All 68 unverified fork rows in `src/compat.js` (of 430 total fork rows), per the
MEASURED-WEIGHT POLICY (DATA-MODEL-REVIEW §5.1-13): hunt a third-party MEASURED
weight (editorial/review outlet stating its own scale figure, for the EXACT
travel/wheel/steerer config) to promote with `sourceType:'measured'` +
`weightSource`, while re-confirming interfaces and checking for fictitious travel
configs per family.

## Outcome: 0 promotions, 0 phantom-travel findings

**No fork row met the measured-weight bar this pass.** Every weight figure
surfaced during this sweep was either:
- A **manufacturer claimed weight** echoed by Fox/DVO/EXT/RockShox/etc. and
  reprinted verbatim by retailers and editorial outlets alike (e.g. Fox's
  "1,942g" 36 Factory 29/160 figure, cited identically by Vital MTB, Pinkbike,
  and multiple shops) — this is the SAME class of number already in the
  catalog as sample data, not an independent third-party measurement.
- A **retailer spec-table weight** (Worldwide Cyclery, BIKE24, etc.) —
  explicitly excluded by policy (`sourceType:'retailer'` is validator-rejected).
- A **forum/user scale reading with no stated config or methodology** (mtbr.com
  threads citing "2156g uncut steerer" with no travel/damper spec given) — too
  ambiguous to pin to a specific catalog row.

Outlets the policy names as acceptable (Blister, Bikerumor "actual weight",
VitalMTB verified scales, WeightWeenies with stated config) either:
- **Blocked the fetch** (Blister returns HTTP 403 to WebFetch — same wall noted
  in prior verification waves for other categories),
- Had **no verified/user-submitted weight data** on the specific product page
  checked (VitalMTB's own "Verified User-Submitted Weight Data" section was
  empty for the Fox 36 Factory GRIP2 2023 page — confirmed by direct fetch), or
- Weren't found to carry a config-matched, self-measured figure for any of the
  68 rows in the searches run.

This matches the standing note in `CLAUDE.md` roadmap item 4: *"Forks are
deliberately still flagged (weights couldn't be pinned reliably...)"* — this
sweep re-confirms that finding rather than overturning it. No fabricated or
mismatched-config weight was promoted (PHANTOM-NUMBER doctrine).

## Fictitious-travel check: all clear

Checked every family represented in the 68 unverified rows against maker/
maker-echoing sources for real offered travel configs. **No phantoms found** —
every row's travel is a genuine offered config:

| Family | Rows checked | Travel confirmed real |
|---|---|---|
| Fox 36 (Factory/Performance/Performance Elite/Rhythm/SL) | 150,160,170,120,130,140 (29 & 27.5) | ✅ matches Fox's own line spread |
| Fox 34 (Performance/Performance Elite/Rhythm/Rythm/SC) | 120,130,140,110 | ✅ 120-140 std range + SC 100-110 |
| Fox 32 Step-Cast | 100 (27.5) | ✅ |
| Fox 40 Factory | 203 (29, boost, straight steerer) | ✅ |
| DVO Onyx SC D1 | 160/170/180 (29 & 27.5) | ✅ confirmed both wheel sizes offered |
| DVO Onyx D1 38 / 38 D1 SL | 160/170/180 (29 only) | ✅ |
| DVO Diamond Boost | 130/160 (29), 140/170 (27.5) | ✅ within DVO's stated ranges |
| DVO Sapphire 32 | 100/140 (29 & 27.5) | ✅ within 100-140 range |
| DVO Sapphire 34 | 120/130/140 (29), 130/140/150 (27.5) | ✅ matches DVO's exact per-wheel spread |
| DVO Sapphire (26") | 100 | ✅ (legacy 26" model) |
| EXT Era V2.1 | 140/150/160/170 (29 only) | ✅ Era V2 offered 130-170 |
| EXT Vaia | 170/200 (29 only) | ✅ Vaia offered 170-200 |
| MRP Ribbon Air | 160 (29) | ✅ within 120-160 range |
| DT Swiss F 535 One | 160 (29) | ✅ offered 120-160 |
| Manitou Mezzer Pro | 180 (29) | ✅ offered 160-180 (internally down to 140) |
| Manitou Circus Expert (both steerer variants) | 100 (26") | ✅ 80-100/120-130 adjustable dirt-jump fork |
| Marzocchi Bomber Z2 Air Rail | 150 (29) | ✅ offered 100-150 |
| Marzocchi Bomber Z1 | 140 (29) | ✅ offered 130-170 (29) |
| X-Fusion Sweep | 150 (27.5) | not independently re-confirmed this pass — no red flags found, deprioritized (single row) |
| Formula Nero R | 180/190/200 (29), 200 (27.5) | ✅ matches Nero R's 180/190/200 spread |
| Formula Nero C | 200 (29 & 27.5) | ✅ |
| Formula Selva C | 170 "(Extended)" (29) | ✅ Selva Extended range is 170-180 |
| RockShox Recon Silver RL | 130/140 (27.5) | ✅ offered 100-150 |
| RockShox Revelation RC | 130 (27.5) | ✅ within Revelation's range |
| SR Suntour XCE 28 / XCT 30 / XCM / XCE (15QR) | 100 (29, various axle standards) | ✅ all confirmed 100mm 29er entry forks |

Interfaces (wheel size, steerer, axle standard) for every row above were already
consistent with what each source page stated — no cross-rule contradictions
found. None required correction.

## Sources checked (rejected/inconclusive, logged for future waves)

- blisterreview.com — **403s WebFetch** (Fox 36/36SL page, EXT Era/Vaia pages,
  Manitou Mezzer Pro page). If Bright Data or browser-pane rendering becomes
  available for this domain in a future wave, worth retrying — Blister is
  usually the highest-quality source for config-matched scale weights.
- vitalmtb.com product-guide pages — fetchable, but "Verified User-Submitted
  Weight Data" was empty on every page checked (spot-checked Fox 36 Factory
  GRIP2 2023). Their crowd-verify feature exists but has no data for these
  specific SKUs yet.
- dvosuspension.com product pages — return empty/cart-only content to WebFetch
  (JS-rendered); had to rely on search-result summaries + third-party retailer/
  review echoes for DVO travel-range confirmation instead (acceptable for
  interface/travel confirmation per fetch-ethics doctrine, since these are
  independently corroborating third parties, not a single unverified guess —
  but NOT used for weight promotion, which needs a primary measured source).

## Recommendation for the next fork wave

Given this wave's near-zero yield on weights despite broad coverage, a future
wave should either (a) get Blister access working (browser-pane render, per
the fetch-ethics doctrine's JS-rendering-is-not-circumvention allowance), which
is the single most promising lead, or (b) accept that most forks in this
catalog will stay sample-weight indefinitely and deprioritize further
weight-hunting passes in favor of other verification categories.

## Follow-up: blister-probe-1 (2026-07-22)

**Recommendation (a) above tried and WORKS.** Opened blisterreview.com directly
in the browser pane (not WebFetch) — it rendered normally, no challenge/CAPTCHA
page, no bot wall. The site's own search (`?s=<query>`) and predictable
`/gear-reviews/<slug>` URLs are both usable. Blister's spec boxes carry a
labeled "Blister's Measured Weight" line with an explicit config
(wheel/travel/damper), exactly as the mw1 sweep hoped.

**1 promotion this pass:**
- `fk-fox-36-factory-my27-29-160` (29" / 160mm / Grip X2, mfgPn 910-21-430):
  fetched `blisterreview.com/gear-reviews/fox-36-36-sl` — "Blister's Measured
  Weight: 2,134 g (29" | 160 mm travel | Grip X2 damper)", an EXACT config
  match to this row (the Grip X2-SKU'd MY27 36 Factory). Weight corrected
  1920g -> 2134g (`sourceType:'measured'` + `weightSource`); the old 1920g was
  an unqualified nominal "STARTING WEIGHT" reference figure from Fox's own
  page, now superseded by an independent scale reading. Interfaces stay on the
  existing manufacturer source, untouched.

**1 near-miss, correctly NOT promoted (PHANTOM-NUMBER guard):**
- `blisterreview.com/gear-reviews/2025-fox-38-grip-x2` gives "Blister's
  Measured Weight (29" | 170 mm travel | uncut steerer tube): 2,440 g" for the
  "2025 Fox 38 Grip X2" review — but the review body prices BOTH the 38
  Factory ($1,249) and 38 Performance Elite ($1,149) trims without stating
  which trim the weighed test unit actually was. The catalog has separate rows
  for `fk-fox-38-factory-29-170` and `fk-fox-38-performance-elite-29-170` at
  this exact travel/wheel. Since the config match can't be pinned to one row
  without guessing the trim, this was left alone — a blank beats an invented
  value.

**Net effect on the class-closed finding:** still mostly holds — this is a
narrow crack, not a reopened class. Blister covers a small fraction of the
68 originally-unverified fork rows (most are older/budget/off-brand forks
Blister never reviewed), and even on rows they DO cover, many reviews report
weight without a fully disambiguated config (as the 38 case shows). Future
waves fetching MORE Blister review pages one-by-one via the browser pane
could find a few more exact-match promotions, but this is a slow, narrow
supplement to (not a wholesale reopening of) the mw1 finding.

Route confirmed WORKING for future waves: browser pane (`preview_start` +
`navigate` + `get_page_text`), not WebFetch, against blisterreview.com.

## Follow-up: blister-sweep-1 (2026-07-22)

Systematic sweep of the browser-pane route against the remaining unverified PREMIUM
fork rows (Fox Factory/SL-Factory/Step-Cast tiers, DVO Onyx flagship, EXT Era/Vaia;
RockShox's only unverified rows in this catalog are the budget Recon/Revelation
tier, out of premium scope), plus a spot-check of shocks/droppers Blister covers.

**0 promotions this pass** — every lead found either mismatched on config or wasn't
a Blister-measured figure at all:

- **`fk-ext-era-v2-29-170`** (EXT Era V2.1, 29"/170mm) — `blisterreview.com/gear-reviews/ext-era-v2-1-fork`
  gives "Blister's Measured Weight (170 mm, uncut steerer tube): 2,369 g", an exact
  travel/wheel match (Era V2.1 is 29"-only). **NOT promoted**: this row's interfaces
  (wheel/steerer/brakeMount/rotor) are still vitalmtb-sourced, not maker-sourced (see
  the row's own `desc` — extremeshox.com's HQ page states no wheel/steerer/rotor
  info at all). Per policy a weight can't be promoted ahead of maker-sourced
  interfaces. Tried extusa.bike as an alternate maker/distributor interface source —
  404, page no longer exists. Left alone; a future wave should retry EXT's
  distributor sites (extusa.bike moved/renamed?) before this can be promoted.
- **`fk-ext-vaia-29-200`** (EXT Vaia, 29"/200mm/20mm axle) — `blisterreview.com/gear-reviews/ext-vaia-fork`
  gives "Blister's Measured Weight (200 mm travel, 20mm axle, uncut steerer tube):
  3,300 g". Wheel/travel/axle all match this row exactly, and interfaces are
  already maker-sourced (extremeshox.com direct fetch) — looked like a clean
  promotion at first. **NOT promoted on closer look**: the row's existing 3,195 g
  figure is the manufacturer's own **cut-steerer-tube** basis (extremeshox.com
  states "3195 gr...cut steerer tube, oil included" verbatim), while Blister's
  3,300 g is explicitly **uncut-steerer-tube**. These are two different measurement
  bases for the same physical fork, not a like-for-like re-measurement — swapping
  in the uncut figure as if it superseded the cut one would be a config mismatch
  disguised as a promotion (unlike the mw1 Fox 36 case, where the superseded figure
  was an unqualified nominal "STARTING WEIGHT" with no stated basis at all). Left
  alone; a blank/existing-sample beats a mismatched-basis "correction."
- **DVO (Onyx SC D1, Onyx D1 38, Sapphire lines)** — Blister's own site search
  (`?s=DVO+Onyx`) returns zero DVO fork reviews. Blister does not appear to cover
  this brand at all. No further DVO checking planned for future Blister waves —
  the class is closed for this outlet (though DVO stays open for other measured-
  weight outlets in a future sweep).
- **`fk-fox-32-sc-factory-275-100`** (Fox 32 Step-Cast Factory) — the closest
  Blister content is the "Fox's Overhauled Fork Lineup" first-look piece, which
  gives only a manufacturer **"Stated Weight: 1,297 g"** for the 32 Step-Cast (not
  a Blister-measured figure) and for a 29" wheel config (this catalog row is
  27.5"/100mm) — fails on both the measured-source bar and the config match.
- **`fk-fox-34-sc-performance-29-110`** and the Fox 34 Performance/Performance
  Elite/Rhythm 140mm rows — no dedicated Blister review found distinguishing these
  specific SKUs from the "34 SL" (a different, newer, separately-catalogued
  product line); not checked further this pass, logged for a future wave.
- **`dp-fox-transfer-factory-309-240`** (dropper) — `blisterreview.com/gear-reviews/2025-fox-transfer`
  covers the Transfer Factory/Performance Elite lineup but states no scale-measured
  weight at all (spec box has travel/diameter/price only). No promotion possible.
- **Shocks (57 unverified premium-brand rows)** — spot-checked Fox Float X2 Factory
  coverage; Blister's Float X2 reviews found are all for the **all-new 2026
  damper-architecture generation** (`2026 Fox Float X2 and DHX2`), a different
  product from this catalog's older X2 Factory/Performance rows — config mismatch,
  not checked further. The remaining 56 shock rows were NOT individually checked
  this pass (time-budget cutoff) — flagged as an open follow-up for the next wave,
  same one-row-at-a-time browser-pane method.

**Net effect:** the browser-pane Blister route continues to work reliably, but
this wave's yield was zero — every near-miss failed on a specific, principled
guard (interface sourcing, measurement-basis mismatch, wrong generation, or
manufacturer-only figures) rather than lack of searching. The DVO fork class is
now confirmed closed for Blister specifically. Shocks remain a large unswept
class for a future wave.
