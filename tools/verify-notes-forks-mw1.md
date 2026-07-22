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
