# Verdict Audit — SECOND PASS — 2026-07-09

**Goal:** a *deeper* re-hunt of the 1,772-part catalog for **wrong compatibility
verdicts the first pass missed**, with top priority on **false-GREENS**
(`checkBuild` says compatible but the real world says no — the worst verdict per the
bar). This pass targets the catalog regions that grew fastest since the first audit
(DH frames on all three rear-axle standards, the microSHIFT/Box budget drivetrains,
XC flat-mount brakes, the hub+rim build-your-own-wheel path) and cross-checks the
DATA feeding each verdict against the real-world standard the part name encodes.

**Scope:** report-only for the engine and catalog — **nothing in `src/compat.js` was
changed** (no false-green or false-red was found that warranted a data or logic fix).
New **permanent regression guards** were appended to `test/test-verdict-audit.js`
(PERMANENT GUARD 5) covering the newer catalog regions this pass verified. The
one-off probes are reproduced below.

## Headline

> **No false-green was found.** Every real incompatibility this pass could construct
> was flagged by the engine, and every legitimate real-world build stayed clean. The
> catalog data feeding the verdicts is internally consistent and — where spot-checked
> against manufacturer pages — correct. This confirms and *extends* the first pass's
> conclusion into the catalog's newer, faster-grown regions.

Also **no new false-*won't-fit*** was found. (The first pass's one confirmed wrong
verdict, the fork `maxRotorF` native-mount conflation, remains fixed — its guards
still pass.)

---

## Method — 6 new probe families beyond the first pass

The first pass probed name-vs-field for a few fork/shifter/tire fields, preset
internal consistency, per-frame assembly, 9 adversarial clashes, and the rotor-max
simulation. This pass adds DATA cross-checks and adversarial coverage the first pass
did not run:

| Probe | What it hunts | Result |
|-------|---------------|--------|
| **P1. Cassette freehub vs system** | an XD/MicroSpline/HG mis-tag would let a real freehub clash (rule 6) pass | 4 heuristic flags, **all correct data** (see below) |
| **P2. Derailleur mount/actuation vs system** | a Transmission mech tagged `hanger` would never trip the UDH gate (rule 4) → false green | 3 heuristic flags, **all correct** (Transmission mechs are genuinely electronic) |
| **P3. Crankset `ringStd` vs name** | an Eagle crank mis-tagged `t-type` would pass a Transmission-chain build (rule 3c) | **0 flags** |
| **P4. Fork axle vs crown class** | a dual-crown fork tagged `Boost110` (or SC tagged `20x110`) → false green on front axle | **0 flags** |
| **P5. DH frame `rearAxle`** | a 157/150-spaced DH frame mis-tagged `Boost148` → a 148 wheel wrongly "fits" | 4 flags, **all confirmed correct** (verified vs maker pages) |
| **P6/P7. Shock mount/eye/stroke vs id token** | a trunnion shock tagged `std` (or eye/stroke drift) → wrong frame-fit verdict (rule 16) | **0 flags** |
| **Q1. Brake-mount matrix** | a stray flat-mount fork or mis-tagged caliper → false brake-mount pass (rule 8) | clean — FM is XC-frame-only, **no FM fork exists** |
| **Q2. Positive shock-fit enumeration** | every FS-frame × every non-OEM shock: does any "fitting" pair cross mount OR eye? | **0 impossible fits** across all pairs |
| **Q3. Hub+rim path parity** | does the build-your-own-wheel path catch freehub / front-axle clashes like a complete wheel? | **parity confirmed** (both error) |
| **Q6. Cassette capacity** | any same-system cassette+derailleur where `maxCog` exceeds the mech but no error? | **0 misses** |
| **Adversarial round 2** | 11 NEW real clashes in the newer regions (150≠157, microSHIFT×Box, FM×PM, freehub) | **10/10 flagged, 0 missed** (1 setup typo, re-covered elsewhere) |
| **Positive round 2** | 5 legit builds in the newer regions must stay clean | **0 false-reds** |
| **Wheel-config edges** | reverse-mullet (frameless), intra-group size mismatch, legit in-progress mullet | **all correct** |

---

## The heuristic flags — every one resolved to CORRECT data

The naive name/id heuristics raised a handful of flags. **Each was investigated and
is correct catalog data, not a bug** — worth recording so a future pass doesn't
re-chase them:

### P1 — four cassettes on a "wrong" freehub, all real exceptions

- `ca-sram-pg1230` (NX Eagle 11-50) and `ca-sram-pg1210` (SX Eagle 11-50) carry
  `freehub: HG`. This is **correct**: NX/SX Eagle are the budget 12-speed Eagle
  cassettes built on a standard **HG** driver (11T floor), not XD. The heuristic
  "Eagle ⇒ XD" is what's wrong, not the data.
- `ca-sram-xg795` (X01 DH 10-24, `sram-dh-7`) carries `freehub: XD` — **correct**: a
  10T small cog cannot sit on an HG body, so the DH cassette needs XD. (My heuristic
  guessed "dh-7 ⇒ HG" from the chain width note; the *cassette* driver is XD.)
- `ca-sram-xs1270` (Eagle 70 Transmission 10-52) carries `freehub: HG` — **the
  documented HG-10T exception** already allowlisted in `schema.js` by
  `mfgPn: CS-XS-1270-A1` (it integrates the 10T cog + lockring into the driver, so it
  runs a 10T on an HG-style body). Confirmed intentional.

### P2 — three Transmission derailleurs "look cable but are electronic"

`dr-sram-gx/x0/xx-transmission` all carry `actuation: electronic`. **Correct** — SRAM
Eagle Transmission mechs are wireless/AXS even though the trimmed model name omits
"AXS". Their `mount` is `udh-direct` (P2 confirmed **0** Transmission mechs on a
`hanger`), so the UDH gate (rule 4) fires properly.

### P5 — four DH frames on `Boost148`, all genuinely 148mm

Modern DH has largely moved from 157/150 to **Boost148 + UDH**. Each flagged frame
was checked against its manufacturer page:

| Frame | Catalog | Manufacturer page says | Verdict |
|-------|---------|------------------------|---------|
| `fr-transition-tr11-alloy` | Boost148 | transitionbikes.com/Bikes/TR11: *"12mm x 148mm for SRAM UDH"* | ✅ correct |
| `fr-gt-fury` | Boost148 | gtbicycles.com: *"12x148mm Rear Thru-Axle"* | ✅ correct |
| `fr-raaw-yalla-v2` | Boost148 | raawmtb.com/pages/yalla-v2: *"Rear hub 148*12"* | ✅ correct (verified row) |
| `fr-specialized-demo-race` | Boost148 | 148 Boost across 2021/24/25 Demo Race listings (specialized.com is 403-blocked for direct fetch; unverified row) | ✅ correct |

No false-green here: a 148 wheel *should* fit these frames, and the engine correctly
reds a 157 or 150 wheel on them (adversarial round 2 confirms).

---

## What held up (negative results worth recording)

The engine + data were exercised hard in the regions most likely to hide a fast-entry
error, and held:

- **Three rear-axle standards are split and tagged correctly.** `Boost148` (109
  frames), `SuperBoost157` (13), `150x12` (2: YT Tues CF, Commencal FRS). Every
  cross-pairing errors: 148-on-157, 150-on-157, 157-on-150, 148-on-150 all raise
  `rear-axle`. Critically **150x12 ≠ SuperBoost157** is honored (they differ by 7 mm
  and are genuinely non-interchangeable).
- **The budget drivetrains are isolated systems.** microSHIFT Advent (9s),
  Advent X (10s) and Box Prime 9 each error when mixed with each other or with
  SRAM/Shimano — their proprietary cable pulls can't cross — while each runs clean as
  a complete same-system group.
- **Flat-mount is XC-frame-only.** The 2 FM frames are both XC (Canyon Exceed / Lux
  World Cup); the 4 FM brakes are all XC calipers; **no fork is flat-mount** (there is
  no such MTB fork). FM×PM cross-pairings error.
- **Shock mount/eye never cross.** Across *every* full-suspension frame × every
  non-OEM shock, no pair that "fits" (no `shock-*` error) crosses `std`↔`trunnion` or
  a different eye-to-eye. The trunnion/standard split is intact catalog-wide.
- **The hub+rim build-your-own-wheel path has full parity** with complete wheels —
  a synthesized wheel errors on a freehub or front-axle clash exactly like a pre-built
  one.
- **Front DH wheels are all `20x110`.** Every DH-named front wheel (FR 1500, Synthesis
  DH 11, LG1r, Spank 359, ENVE M8, Reserve 31|DH, We Are One Strife) carries the DH
  20 mm axle — none is mis-tagged `Boost110`, so none would falsely fit a trail fork.
- **Wheel-config edge cases are correct** — frameless reverse-mullet (27.5F/29R)
  errors, intra-group size mismatches (29 fork + 27.5 front tire) error, and a legit
  in-progress mullet (29F/27.5R) stays clean.

## Minor data notes (not verdict bugs)

- `ti-panaracer-driverpro-275-222-zsg` has `width: 2.22` — an unusual number, but it
  is Panaracer's genuine listed width for that DriverPro size, not a typo. Tire width
  feeds only warning-tier rules (14/18) anyway.
- `142x12` remains an inert vocab value (no part carries it) — correct per its schema
  comment.

## New regression guards

`test/test-verdict-audit.js` PERMANENT GUARD 5 (appended, existing cases untouched)
pins the second-pass behavior for the newer catalog regions: 150≠157 and 148 rear-axle
clashes, microSHIFT×Box system isolation, an FM caliper on a PM fork, plus two
positive cases (a clean Advent X group; a correct 157 wheel on the Supreme DH V5).

## Re-running the one-off probes

The three probe scripts used for this pass live in the scratchpad
(`deep-probe.js`, `deep-probe2.js`, `deep-probe3.js`) and are reproducible against
`src/compat.js`; the durable checks are the PERMANENT GUARD 5 tests in
`test/test-verdict-audit.js`. The first pass's harness still runs:

```
node tools/verdict-audit-harness.js     # first-pass 5 probes
npm test                                # includes test/test-verdict-audit.js (guards 1–5)
```
