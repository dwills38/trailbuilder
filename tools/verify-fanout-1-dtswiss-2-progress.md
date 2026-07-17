# verify-fanout-1-dtswiss-2 progress log

Scope: unverified DT Swiss frontwheel/rearwheel rows in src/compat.js (58 rows at start).
Branch: verify/fanout-1-dtswiss-2, based off origin/main @ 6e061c0.

## Method note

DT Swiss's product pages (dtswiss.com/en/wheels/wheels-mtb/<category>/<model>) render their
full per-SKU "model finder" configurator (every wheel-size x axle x freehub SKU, each with its
own material number and exact net weight) via client-side JS. Plain WebFetch only sees the
static shell (nav + summary blurb, no SKU table). `bdata scrape "<url>" -f markdown` renders
the JS and returns the COMPLETE SKU table — this was the key unlock for this batch and should
be the default tool for any future DT Swiss wheel-page fetch.

## Batch 1 — FR 1500 Classic + F 1900 Classic (freeride/downhill line)

Source (both models): bdata-scraped dtswiss.com model-finder tables, confirmed authoritative
manufacturer pages (10-SKU table for FR 1500 Classic, 14-SKU table for F 1900 Classic).

### Verified (12 rows, all interface + maker-stated exact-SKU weight; wheels exception not
even needed here — DT Swiss states a real per-SKU weight for every FR1500/F1900 config, unlike
some sibling families):

- `fw-dtswiss-fr-1500-29` — weight 1100→1008g, mfgPn WFR1500BFEXSA21534
- `fw-dtswiss-fr-1500-275` — weight already exact (962g), mfgPn already set
- `rw-dtswiss-fr-1500-29-157` — weight 1200→1073g, mfgPn WFR1500OFDRSA21540
- `rw-dtswiss-fr-1500-275-157` — weight already exact (1025g, from a prior session's direct
  matnr fetch); promoted unverified→verified (previous session withheld verified:true solely
  over price cleanliness, which is not required by the validator nor by sibling verified DT
  Swiss wheel rows in this catalog — precedent checked before promoting)
- `rw-dtswiss-fr-1500-29-148-hg` — weight 1200→1074g, mfgPn WFR1500TFDBSA28772
- `rw-dtswiss-fr-1500-275-148-hg` — weight 1250→1026g, mfgPn WFR1500THDBSA28771
- `fw-dtswiss-f-1900-29` — weight 1059→1104g, mfgPn W0F1900BFEXSA21558
- `fw-dtswiss-f-1900-275` — weight 1059→1053g, mfgPn W0F1900BHEXSA21549
- `rw-dtswiss-f-1900-29-xd` — weight 1059→1181g, mfgPn W0F1900TFDRSA21560
- `rw-dtswiss-f-1900-29-ms` — weight 1059→1191g, mfgPn W0F1900TFD2SA21559
- `rw-dtswiss-f-1900-29-157-xd` — weight 1059→1190g, mfgPn W0F1900OFDRSA21564
- `rw-dtswiss-f-1900-275-xd` — weight 1059→1128g, mfgPn W0F1900THDRSA21551
- `rw-dtswiss-f-1900-275-ms` — weight 1059→1138g, mfgPn W0F1900THD2SA21550
- `rw-dtswiss-f-1900-275-157-xd` — weight 1059→1138g, mfgPn W0F1900OHDRSA21555
- `fw-dtswiss-f1900-classic-29-dh` — weight 990→1104g, mfgPn W0F1900BFEXSA21558 (same SKU as
  fw-dtswiss-f-1900-29, see duplicate note below)
- `rw-dtswiss-f1900-classic-275-superboost` — weight 1210→1161g, mfgPn W0F1900OHDLSA21554

(Count: 15 verified this batch, not 12 — corrected above list has 15 entries; see git diff
for the authoritative set.)

### Skipped — FABRICATED/non-existent SKU (flagged, left UNTOUCHED per "never silently
overwrite" — genuine correction candidates for a future data-integrity pass, not fixed here
since several are referenced by completebike fills and changing them could shift those
builds' verdicts, which is out of this session's scope):

- `rw-dtswiss-fr-1500-29-150` / `rw-dtswiss-fr-1500-29-150-hg` / `rw-dtswiss-fr-1500-275-150`
  — DT Swiss's FR 1500 Classic configurator has exactly 10 SKUs (4 front, 6 rear: 148-Sram,
  157-Sram, 148-Shimano, for both 29 and 27.5). There is NO "150x12" rear axle option anywhere
  in the current lineup. These three rows appear to be fabricated hub-spacing variants.
- `rw-dtswiss-fr-1500-29-157-hg` / `rw-dtswiss-fr-1500-275-157-hg` — the configurator shows
  157mm rear ships ONLY with a SRAM XD driver (never Shimano/HG); Shimano/HG is only offered
  at 148mm. These two "157 + HG" rows don't correspond to a real DT Swiss SKU.
  **CONTRADICTION FLAG for the coordinator:** several complete-bike rows use these exact ids
  as fills (`rw-dtswiss-fr-1500-29-150-hg` at line ~15434, `rw-dtswiss-fr-1500-29-157-hg` at
  lines ~8997/~9337/~18134, `rw-dtswiss-fr-1500-275-157-hg` at line ~7448) to pair a
  DT-Swiss-family rear wheel with an HG-driver DH cassette at 150/157mm spacing. If DT Swiss
  truly never sold that combination, those builds are citing a non-existent stock wheel — a
  data-entry issue upstream of this verification pass, not something I've corrected (would
  require re-deriving each affected complete bike's actual stock wheel, out of scope here).
- `rw-dtswiss-f-1900-29-157-ms` / `rw-dtswiss-f-1900-275-157-ms` — the F 1900 Classic
  configurator confirms MicroSpline is only offered at 148mm rear spacing; 157mm ships with
  HG or SRAM XD only, never MicroSpline. These two rows don't correspond to a real SKU. Not
  referenced by any completebike fill (checked), so lower priority to resolve, but flagged.

### Skipped — intentionally-different custom OEM part (left untouched, correctly documented
already by a prior session, not conflated with the standard catalog SKU):

- `rw-dtswiss-fr-1500-275-148-xd` — desc explicitly documents this as a Canyon-custom narrow
  148mm-shell hub with 157mm internal stiffness (a genuinely different physical part from the
  standard-catalog 148/Sram/XD SKU), sourced from canyon.com + nsmb.com. Correctly left
  unverified; did not touch.

### Noted but not touched — likely duplicate rows (flagged only):

- `fw-dtswiss-f-1900-29` (family `dtswiss-f-1900`) and `fw-dtswiss-f1900-classic-29-dh`
  (family `dtswiss-f1900-classic`) both model the identical real SKU (W0F1900BFEXSA21558,
  29in 20x110 front). Both are now verified with the correct weight; the duplication itself
  is a data-model cleanup item for a future pass, not resolved here.
- Already-verified `fw-dtswiss-f1900-classic-275` (weight 950g) does not exactly match the
  maker's stated 990g for the corresponding SKU (F 1900 CLASSIC 27.5 - 30mm IS 15/110mm,
  W0F1900BHIXSA21547) — a ~4% discrepancy. Not touched (already verified:true, out of this
  session's mandate to silently re-edit a previously-verified row); flagged for a future
  accuracy pass.
- Already-verified `rw-dtswiss-f1900-classic-275-hg` (weight 1168g) vs the maker's 1152g for
  the matching SKU (W0F1900THDLSA28717) — similar small discrepancy, flagged, not touched.

## Gates after batch 1

- `node validate.js` → DATA OK - 5026 parts, 0 problems (2913 verified, 2113 unverified)
- `npx vitest run` → 24 test files, 699 passed (699) — matches stated baseline
- `npx tsc --noEmit` → clean, no output
- `node tools/verdict-audit-harness.js` → 0 flags in A/B; C 329 clean/0 errors; C2 5/5; D 15/15;
  D2 2/2; E unchanged (fork-family false-warn list, unrelated to this batch)

Committed as: (see git log on this branch)

## Remaining worklist (to continue)

Still-unverified DT Swiss frontwheel/rearwheel rows after batch 1 (~43 left), grouped by family:
- AM LN 370 (fw/rw)
- 370 Classic / WTB ST Light i30 (fw/rw)
- 350 / WTB KOM Trail i30 (fw/rw)
- M 1900 Spline (rw x2 remaining: 275-157-xd, 29-157-xd/ms)
- XM1700 Spline 275 (fw/rw)
- 370 / Roval Traverse alloy (fw/rw)
- 370 / EX 511 (fw/rw)
- LN XC (fw/rw)
- E593 (fw 29, rw 275-ms)
- FR 541 / 240 hand-built (fw/rw)
- E 532 hand-built (fw/rw)
- XRC 1200 Spline 25/30 (fw x2, rw x4 — front + rear variants)

These "370 / X", "AM LN 370", "FR 541 / 240", "E 532" names look like OEM hub+rim combos (per
the fanout-1-dtswiss session's trap #1 note: DT Swiss's standalone hub product pages are
sometimes a DIFFERENT product) — each needs its own careful hub-page + rim-page cross-check,
not a single combined product page. Continuing next.
