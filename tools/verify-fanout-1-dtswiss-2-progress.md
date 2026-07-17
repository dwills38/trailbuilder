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

## Batch 2 — XM1700/M1900 investigation (no new verifications, major contradiction found) +
XRC 1200 Spline 30 verified

### MAJOR FLAG for the coordinator: XM 1700 SPLINE rotorMount is wrong catalog-wide

FETCHED (bdata scrape) dtswiss.com's XM 1700 SPLINE page: the model-finder confirms exactly 6
SKUs exist (29/27.5 x {148-Shimano-MicroSpline, 148-Sram-XD} rear + 29/27.5 x {15/110} front),
and **every single one is Disc Center Lock** — there is NO 6-bolt XM1700 SPLINE variant in DT
Swiss's current lineup. But this catalog's XM1700 rows — including the ALREADY-VERIFIED
`fw-dtswiss-xm1700-29`, `rw-dtswiss-xm1700-29-xd`, and `rw-dtswiss-xm1700-29-ms` — all carry
`rotorMount:'sixbolt'`. Per those rows' own desc text, this was a deliberate choice: a prior
session picked XM1700 specifically because it needed a 6-bolt wheel to match a build's SRAM
HS2 6-bolt rotors, explicitly "replacing the prior DT Swiss M1900 pick (a Center-Lock hub that
mismatched the bike's actual 6-bolt SRAM HS2 rotors)" — i.e. it substituted in a wheel that
(per the real DT Swiss page) is ALSO Center-Lock-only, and just asserted 6-bolt to make the
fill work. This is a false interface fact on 5 rows (3 already `verified:true`), and it
masks a real incompatibility on at least 10 complete-bike builds that use this wheel with
6-bolt rotors (cb-forbidden-druid-v2-29-buildkit2, cb-canyon-spectral-cf-8/9,
cb-forbidden-reya-tier2, cb-canyon-neuron-cf-8, cb-rose-root-miller-3, cb-yeti-arc-t1-xt-di2,
cb-unno-dash-race, plus the two EXCLUDED cb-yeti-sb135-t2/t3 builds which use the 275in
siblings — their exclusion from this task's scope suggests this exact issue is already known
upstream).

**Not fixed here** — correcting rotorMount to CL would flip 8+ live complete-bike builds from
green to a rotor-mount error, which is a large blast radius entirely outside "verify DT Swiss
wheel rows" and needs a coordinated decision (re-pick rotors on 8+ builds, or swap in a
different 6-bolt wheel, or something else). Left `fw-dtswiss-xm1700-275` /
`rw-dtswiss-xm1700-275-xd` **unverified/untouched** rather than either (a) verifying them with
the same wrong sixbolt value (compounding the error into more verified:true rows) or (b)
silently fixing rotorMount and letting 8 builds break unannounced.

### MAJOR FLAG: M 1900 SPLINE has no SuperBoost157 option — 3 more fabricated rows

FETCHED (bdata scrape) dtswiss.com's M 1900 SPLINE page: 14 real SKUs, rear spacing is ONLY
142mm or 148mm (Boost) — there is NO 157mm/SuperBoost157 M1900 variant. But
`rw-dtswiss-m1900-275-157-xd`, `rw-dtswiss-m1900-29-157-xd`, and `rw-dtswiss-m1900-29-157-ms`
all carry `hub:'SuperBoost157'`. These are referenced by 7 complete-bike fills, all Pivot
models (SuperBoost157 is Pivot's house rear-axle standard) — same pattern as the FR1500/F1900
fabricated-axle rows in batch 1: a session needed an exact axle match for a specific frame and
built a new DT Swiss row without confirming DT Swiss actually sells that spacing. **Left
unverified/untouched**, flagged for the coordinator (same scope boundary as batch 1: fixing
would mean re-deriving 7 complete bikes' actual wheel picks).

### Verified (2 rows) — XRC 1200 SPLINE 30 (the confirmed-existing family from a prior
session's own citation; only the Spline-30 rim-width variant's exact configurator entries were
independently fetchable this session):

- `fw-dtswiss-xrc1200-spline30-29` — weight 720→597g, mfgPn WXRC120BEIXCA22466
- `rw-dtswiss-xrc1200-spline30-29-ms` / `rw-dtswiss-xrc1200-spline30-29-xd` — weight 840→706g
  each, mfgPn WXRC120TEDRCA22468 (one physical SKU ships XD-mounted with an included MicroSpline
  conversion kit per the model-finder's own filter panel — both freehub variants legitimately
  map to this same SKU)

`fw-dtswiss-xrc1200-spline25-29` and its two rear siblings (25mm rim width) could not be
independently reconfirmed this session — the JS model-finder's default rendered state only
exposed the 30mm-rim configuration; the 25mm variant needs interactive filter-selection that a
one-shot scrape doesn't drive. Left unverified/Skipped, not a fabrication concern (Spline 25 is
a real, dtswiss.com-listed product line per the category overview page), just not indepedently
re-confirmed at the exact-SKU level this session.

### Skipped — hand-built OE hub+rim combos, no fetchable standalone DT Swiss product page

Checked and confirmed (or already documented by their existing desc) that these rows model an
OE-only hub+rim pairing that DT Swiss does not sell as a branded/catalogued complete wheel —
the "370" hub's only current standalone dtswiss.com page
(`/en/components/hubs-and-rws/hubs-mtb/370`) is confirmed to be the **DJ-only hub** (Front
wheel 370 DJ NODISC, Rear wheel 370 DJ DBIS single-speed bolt-on 135mm) — the exact trap #1
documented by the prior fanout-1-dtswiss session. There is no other fetchable DT Swiss page for
the enduro/trail-tier "370"/"350" hub used in these OE combos, so bar item 1 (manufacturer
interface confirmation) cannot be met beyond what the bike-maker's own page already states
(already cited in each row's existing desc). Left unverified, no further action:

- `fw-dtswiss-amln370-29` / `rw-dtswiss-amln370-29-ms` (Canyon Stoic 4 OE)
- `fw-dtswiss-370classic-wtbstlight-i30-29` / `rw-dtswiss-370classic-wtbstlight-i30-29-ms`
  (Ghost Riot Trail CF Pro OE)
- `fw-dtswiss-350-komtrail-i30-29` / `rw-dtswiss-350-komtrail-i30-29-xd` (Kona Process 153 OE)
- `fw-dtswiss-370-ex511-29` / `rw-dtswiss-370-ex511-29-hg` (Commencal Meta HT V3 OE)
- `fw-dtswiss-370-roval-alloy-29` / `rw-dtswiss-370-roval-alloy-29-xd` (Specialized Stumpjumper
  15 Expert OE)
- `fw-dtswiss-lnxc-29` / `rw-dtswiss-lnxc-29-ms` (Canyon Grand Canyon AL 8 OE, "LN XC" naming)
- `fw-dtswiss-e593-29` / `rw-dtswiss-e593-275-ms` (Commencal Meta SX V5 OE — the E 593 RIM has
  its own dtswiss.com page already cited confirming intWidth/weight, but the 370-family hub's
  axle/rotor-mount facts still rest on the bike-maker page, same limitation)
- `fw-dtswiss-fr541-240-29` / `rw-dtswiss-fr541-240-29-xd` (Last Coal V4 OE, hand-built)
- `fw-dtswiss-e532-29` / `rw-dtswiss-e532-29-hg` (Alutech Fanes 29 OE, hand-built)

## Gates after batch 2

- `node validate.js` → DATA OK - 5026 parts, 0 problems (2916 verified, 2110 unverified)
- `npx vitest run` → 24 test files, 699 passed (699)
- `npx tsc --noEmit` → clean
- `node tools/verdict-audit-harness.js` → unchanged shape (0/0/329-0/5-5/15-15/2-2, same E list)

## Remaining worklist (to continue)

After batches 1+2: 17 rows verified total (15 + 2... see git log for the exact per-commit
diff), remainder of the original 58-row worklist is now fully triaged:
- 5 rows FABRICATED/non-existent SKU, flagged, untouched (FR1500 family, batch 1)
- 2 rows FABRICATED/non-existent SKU, flagged, untouched (F1900 family, batch 1)
- 1 row intentionally-different custom OEM part, correctly left as-is (batch 1)
- 5 rows Center-Lock-only wheel wrongly tagged 6-bolt catalog-wide (XM1700), left untouched -
  MAJOR FLAG, not fixed (blast radius outside scope)
- 3 rows FABRICATED SuperBoost157 M1900 variant, flagged, untouched (batch 2)
- 3 rows XRC 1200 Spline 25 — not independently reconfirmable this session (JS default-state
  limitation), left unverified
- 18 rows hand-built OE hub+rim combos with no fetchable standalone DT Swiss product page for
  the exact hub used (370/350 family) — left unverified, no further action possible without a
  DT Swiss page that doesn't exist for these combos

This exhausts the tractable subset of the 58-row DT Swiss wheel worklist. Every remaining
unverified row has a documented reason it cannot currently clear THE BAR, rather than being
merely unattempted.
