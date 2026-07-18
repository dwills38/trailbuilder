# Engine Critical Review — 2026-07-12

**A deep, fresh-eyes, adversarial re-audit of the BuildMyMTB compatibility engine (`checkBuild` in `src/compat.js`).**

**Scope:** every one of the ~20 rule areas / 52 ruleIds, judged for **real-world correctness** — not
self-consistency (the 453-test suite already proves the engine is self-consistent; that was never the
question). The question this review asks of each rule: *can it ship a wrong verdict on a real, buyable
build?* — a false "fits" (silent on a build that physically won't go together) or a false "won't fit"
(a red/yellow on a build a competent mechanic would wave through).

**Method:** seven deep adversarial sub-agents (one per rule cluster + a missing-rules hunt + a
"break-the-engine" red-team), each grounding calls in **fetched manufacturer compatibility
documentation** and running candidate builds through the actual engine. Every headline finding below
was **reproduced against the running engine** and cross-checked by the coordinator. This is a deeper,
adversarial pass than `REVIEW.md` (2026-07-06), `EXPERT-REVIEW-DOSSIER.md`, or
`DOSSIER-OPEN-QUESTIONS-RESEARCH.md` — it deliberately re-opens their "settled" verdicts with fresh
evidence and hunts for buyable builds the engine gets wrong.

**Status:** REVIEW ONLY. No engine code, catalog data, or test was changed. All four gates stay green
(see the end). Every recommended fix lands **separately**, after coordinator + Douglas triage, under
THE BAR: a new or strengthened RED needs a manufacturer source + a pinning test + an adversarial
audit; a false "won't fit" is as bad as a false "fits."

> **THE BAR (verbatim):** a wrong verdict is worse than a missing rule, in **both** directions. A false
> "won't fit" steers someone off a working build; a false "fits" sells someone a part that doesn't
> mount. Error = won't fit, period. Warning = works but check. Info = FYI.

---

## Executive summary

The engine is, overall, **impressively sound** — most of the "try to break it" attacks bounced off,
and the classic traps (Shimano-lever-on-SRAM-caliper hydraulic mismatch; chainring direct-mount
interface) are *designed out of existence* by the atomic-part data model. The **missing-rules hunt
recommends adding no new hard-error rule** — coverage is genuinely thorough.

But the re-audit found **four defects that ship a wrong verdict on real, buyable, catalogued parts
today**, plus two Major latent/data issues:

| # | Severity | Rule | Wrong verdict | One-line |
|---|----------|------|---------------|----------|
| C1 | **Critical** | 8 / 10 (missing brake↔rotor) | **false FIT** | An FM (flat-mount) caliper rated for ≤160 mm rotors builds green with a 180 mm rotor. |
| C2 | **Critical** | 7 `bb-shell` | **false won't-fit** | `BSA68` and `BSA73` are the *same* threaded standard; the engine reds a BB whose `mfgPn` is identical to the "fitting" one. |
| C3 | **Critical** | 15 `bar-stem-clamp` | **false won't-fit** | A 31.8 mm bar in a 35 mm stem is a stocked-shim everyday build; the engine hard-errors it. |
| C4 | **Critical** | 12b `fork-travel-min` | **false won't-fit** | Santa Cruz frames whose cited source says *"we wouldn't recommend… is fine if you prefer"* get a hard "outside the approved range" error. |
| M1 | **Major** | 3 `drivetrain-speeds` | latent false won't-fit | The chain is counted in the speed-equality set, but Flattop chains are *width*-defined not speed-defined — already forcing real SRAM parts out of the catalog. |
| M2 | **Major** | 2 `front-axle` (data) | either direction | The `20x110` Boost-vs-non-Boost split on DH forks (Fox 40 et al.) is under-sourced; the engine is only as right as that per-fork value. |

Minor findings, a missing-rules disposition (all defer/reject, with fresh evidence), a
rule-interaction section, and catalog data-quality items handed to the catalog auditor follow.

---

## Per-rule verdict table

`sound` = adversarially probed, no real-world defect found · `concern` = correct today but a real
latent risk / known limitation · `defect` = ships or will ship a wrong verdict.

| Rule (area) | ruleId(s) | Verdict |
|---|---|---|
| 1 Wheel-size config + mullet | `front-wheel-size`, `rear-wheel-size`, `wheel-config` | **sound** (bead-seat model is correct; reverse-mullet guard correct) |
| 2 Front axle | `front-axle` | **concern** — logic sound; DH `20x110` Boost/non-Boost **data** under-sourced (M2) |
| 2 Rear axle | `rear-axle` | **sound** (142/148/157/150 genuinely distinct; no convertible-dropout frame in catalog) |
| 3a Drivetrain system + AXS exemption | `drivetrain-system` | **sound** (AXS controller cross-family exemption traced, correct) |
| 3 Speeds | `drivetrain-speeds` | **defect (M1)** — chain wrongly in the speed set |
| 3b Actuation | `actuation` | **sound** |
| 3c Chainring standard | `chainring-standard` | **sound** (SRAM-confirmed one-directional; crankset exclusion is correct-by-design) |
| 4 UDH | `udh` | **sound** (retrofit-kit warning tier + frameless info correct) |
| 5 Cassette capacity | `cassette-capacity` | **sound** (one-sided maxCog check correct; total-capacity a parked gap, no failing build) |
| 6 Freehub | `freehub`, `freehub-integrated` | **sound**, minor tier caveat (swappable-driver reality) |
| 7 BB shell | `bb-shell` | **defect (C2)** — BSA68 ≡ BSA73 false red |
| 7 BB spindle | `bb-spindle` | **sound** (DUB/24/30/p3 genuinely distinct) |
| 8 Brake mount PM/FM | `front-brake-mount`, `rear-brake-mount` | **sound** as far as it goes; gap is the missing brake↔rotor ceiling (C1) |
| 9 Rotor interface vs hub | `front/rear-rotor-interface` | **sound** — both adapter directions verified |
| 10 Rotor size max / fork native min | `front/rear-rotor-max`, `front-rotor-min` | **sound** (warning tier correct; the "4 forks warn on 203" worry is a non-issue — those are correct warnings) |
| 10b Frame native rotor min | `rear-rotor-min` | **sound** (dormant-until-sourced, correct physics) |
| 11 Steerer / headset | `steerer` | **concern** — single-enum head tube can't model reducer / "accepts-both"; no live false-positive in an all-tapered catalog |
| 12 Fork travel over-max | `fork-travel` | **concern** — error defensible only where the maker states a hard limit (see C4) |
| 12b Fork travel under-min | `fork-travel-min` | **defect (C4)** — recommendation rendered as hard error |
| 12c Fork travel design | `fork-travel-design` | **sound** (warning + 20 mm grace; threshold still flagged for mechanic review) |
| 13 Dropper vs seat tube | `dropper-diameter`, `dropper-shim`, `dropper-insertion` | **sound** (directions correct; every catalog smaller-post pair has a real reducing shim) |
| 14 Tire vs rim | `front/rear-tire-rim` | **concern** — tier correct; unsourced sample `maxTire` drives real false *warnings* (Minor-3) |
| 14b Front tire vs fork | `front-tire-fork` | **sound** (dormant-until-sourced) |
| 14c Too-narrow tire vs rim | `front/rear-tire-rim-min` | **sound** (dormant; `intWidth` dead-field note, Minor-4) |
| 15 Bar / stem clamp | `bar-stem-clamp` | **defect (C3)** — direction-blind; smaller-bar-in-bigger-clamp is shimmable |
| 16 Rear shock eye / stroke | `shock-size`, `shock-stroke-over`, `shock-stroke-short` | **sound** (eye+mount encoding consistent; directions correct) |
| 16 Shock mount | `shock-mount` | **sound** |
| 16b Coil approval | `coil-approval` | **sound** (dormant, statement-only) |
| 17 Bundling / OEM | `bundled-shock`, `package-only`, `oem-shock` | **sound** |
| 18 Rear tire vs frame | `rear-tire-frame` | **sound** (sourced-`maxTire`-only, warning tier correct) |
| 19 Shifter clamp vs lever | `shifter-mount` | **sound** (now active; I-Spec generations mutually exclusive; warning tier correct) |
| 20a Headset steerer | `headset-steerer` | **sound** |
| 20b Headset cup vs head tube | `headset-upper`, `headset-lower` | **sound** (bore-token comparison safe; every vocab token has a distinct family+bore) |
| 20c Headset advisory | `headset-advisory` | **sound** |

---

## Critical findings

### C1 — Flat-mount caliper rotor ceiling is unmodeled → a false "fits" on a real build

- **Rule / ruleId:** rule 8 area; the real gap is a **missing brake↔rotor rule.** A brake never checks
  its rotor's size against the caliper's own ceiling. Post-mount (PM) callipers are safely
  size-agnostic (an adapter/bracket takes any PM caliper up to any rotor the *mount* allows, and rule
  10 guards the fork/frame max). **Flat-mount (FM) callipers are the exception: the caliper *body*
  has a hard rotor ceiling (FM140/FM160), independent of the frame.**
- **Problem:** on the FM frames in the catalog, the frame's FM `maxRotorR` (180) sits *above* the
  caliper's real ceiling (160), so nothing catches the gap.
- **Failing build (all catalogued, all buyable):**
  `frame: fr-canyon-lux-world-cup-cf` (`brakeMount:'FM'`, `maxRotorR:180`) +
  `rearBrake: bk-shimano-xtr-m9110-fm` (Shimano-documented **140/160 mm rotors only** — the catalog
  row's own `desc` says *"BR-M9110 flat-mount 2-piston, 140/160 rotors"*) +
  `rearRotor: ro-hayes-dseries-180-6b` (180 mm) + any six-bolt rear wheel.
  **Engine verdict (run): `errors: [] warnings: []` → "No conflicts found."**
- **Reality:** the BR-M9110 flat-mount caliper cannot run a 180 mm rotor — Shimano's flat-mount system
  has no FM+40 bracket, and the caliper is rated 140/160. Same trap for any ≤160-rated FM caliper
  (Hope XCR Pro X2 FM, SRAM Level Ultimate FM) + a 180 rotor on an FM frame.
- **Evidence:** Shimano BR-M9110 product listing (140/160 mm rotors; the constraint is even in the
  catalog `desc`). Frame `maxRotorR:180` on `fr-canyon-lux-world-cup-cf`.
- **Fix (needs source + pinning test + audit — this ADDS a red):** add an optional `maxRotor` field to
  the `brake` schema, populated **only** for FM callipers from manufacturer specs (dormant-until-
  sourced, the rule-18 template — leave PM callipers unset so the field never false-fires; PM stays
  delegated to rule 10). New rule: `if(rotor.size > brake.maxRotor) err(...)`. Tier: **error** (the
  caliper genuinely cannot clear the rotor). Interim data-only mitigation (weaker — under-serves the
  Magura MT8 SL FM rated to 180): set the two FM frames' `maxRotorR:160`.

### C2 — `bb-shell` treats BSA68 and BSA73 as incompatible → a false "won't fit"

- **Rule / ruleId:** rule 7 `bb-shell` (exact-match `bb.shell === frame.bb`).
- **Problem:** `BSA68` and `BSA73` are the **same** threaded standard (English 1.37" × 24 tpi). A
  single threaded BB fits both shell widths — a 73 mm shell simply omits the spacers a 68 mm shell
  needs — and "68/73" BBs are sold as **one SKU**. The catalog encodes each such BB with only *one* of
  the two shell values, so pairing it with a frame of the other width hard-errors a physically correct
  build. **Smoking gun:** `bb-sram-dub-bsa68` and `bb-sram-dub-bsa73` carry the **identical**
  `mfgPn: 'BB-DUB-BSA-A1'` — the catalog itself records them as one product.
- **Failing build (catalogued, reachable):**
  `frame: fr-raaw-madonna-v3` (`bb:'BSA73'`) + `crankset: cr-raceface-turbine` (`bb:'30mm'`) +
  `bb: bb-raceface-bsa68-30mm` (model literally *"BSA CINCH 30mm (68/73)"*, `shell:'BSA68'`,
  `spindle:'30mm'`).
  **Engine verdict (run): `err ['BB shell mismatch: Race Face BSA CINCH 30mm (68/73) fits a BSA
  threaded 68 shell but RAAW Madonna V3 has a BSA threaded 73 shell.']`** — the `bb-spindle` check
  correctly passes. Broadly reachable: any `BSA73` frame + any "68/73" BB encoded `BSA68`
  (`bb-raceface-bsa68-24mm/-30mm`, `bb-ethirteen-bsa68-p3`, `bb-sram-dub-bsa68`), and the mirror
  (`fr-commencal-meta-ht-v3`, the catalog's only `BSA68` frame, + `bb-sram-dub-bsa73`).
- **Evidence:** SRAM DUB BSA is sold as a single *"DUB BSA Road/MTB 68/73 mm Bottom Bracket"* (Power
  Meter City; Worldwide Cyclery). Race Face CINCH BSA and Hope/e*thirteen threaded BBs likewise ship
  as one 68/73 unit. The identical `mfgPn` in-catalog is decisive.
- **Fix (this REMOVES a red — the safe direction, but confirm the equivalence):** in rule 7 treat
  `BSA68` and `BSA73` as an equivalence class (match if both ∈ {BSA68, BSA73}); keep `BSA83` (the real
  83 mm DH width) and every `PF*` shell exact. `bb-spindle` needs no change. Tier stays **error** for
  genuine shell mismatches. Pin with a test on the Madonna-V3 + 68/73-BB build.

### C3 — `bar-stem-clamp` is direction-blind → a false "won't fit" on a shimmable build

- **Rule / ruleId:** rule 15 `bar-stem-clamp` (hard-errors on any `bar.clamp !== stem.clamp`).
- **Problem:** the two directions are **not** symmetric — exactly the asymmetry `REVIEW.md #9` already
  made direction-aware for the dropper (rule 13):
  - **35 mm bar + 31.8 mm stem** → correct error (nothing shims a clamp *bigger*).
  - **31.8 mm bar + 35 mm stem** → **shimmable**; a 35→31.8 reducer shim is a standard, maker-sold
    part. Rule 15 hard-errors this = false "won't fit."
- **Failing build (catalogued):** `handlebar: hb-renthal-fatbar-318` (31.8) + `st-renthal-apex-35`
  (35). **Engine verdict (run): `err ['Bar/stem clamp mismatch: Handlebar is 31.8mm but Stem is
  35mm.']`** — identical to the genuinely-impossible reverse (35 bar + 31.8 stem), which also errored,
  confirming the rule can't tell the directions apart.
- **Evidence:** 35↔31.8 handlebar reducer shims are a stocked category from multiple makers — Reverse
  Components Ø35.0→31.8 (*"combine a 31.8 mm handlebar with a 35.0 mm oversize stem"*), Wheels Mfg,
  FARR, Problem Solvers.
- **Fix (this softens a red — safe direction):** mirror rule 13 — `bar.clamp > stem.clamp` → **error**
  (bar too big for clamp); `bar.clamp < stem.clamp` → **warning** `bar-stem-shim` naming the reducer
  shim (ideally with a structured `fix:{kind:'shim'}`, the same precedent as the dropper shim and the
  rotor adapter). Pin both directions.

### C4 — `fork-travel-min` renders a maker *recommendation* as a hard "won't fit"

- **Rule / ruleId:** rule 12b `fork-travel-min` (and the same critique applies to the rule 12 over-max
  error direction on range frames).
- **Problem:** fork travel is categorically different from every other error in the engine — **it never
  prevents assembly.** A fork of any travel bolts to the head tube identically (the steerer/headset
  interface is independent of travel); out-of-range travel only shifts head angle / BB height /
  warranty. So the **error** tier — which everywhere else in the engine means "does not physically fit
  / function" — is miscalibrated here. Worse, for the frames that drive this rule the **cited source
  language is an explicit soft recommendation**, and the engine's message asserts a "maker-approved
  minimum" the source never states.
- **Failing builds (run against the engine, real buyable parts):**
  - `fr-santacruz-hightower-3` (catalog range 150–160, `source` = the SC Hightower 3 support page) +
    `fk-fox-36-factory-29-140` → **`err ['Under-forked: 140mm fork is below Santa Cruz Hightower 3's
    maker-approved minimum of 150mm — outside the approved range …']`**.
  - `fr-santacruz-nomad-6` (range 170–180) + a 160 mm fork → **`err ['Under-forked: 160mm …below…
    170mm']`**.
  - `fr-ibis-hd6` (range 180–190) + `fk-fox-38-factory-29-170` → **`err [fork-travel-min]`** — but the
    Fox 38 is one physical chassis whose travel is set internally in 10 mm steps (air-shaft/spacer,
    Fox & RockShox both document this), and dials to 180 for a ~$0–30 part. The engine hard-errors a
    *setting* as if the *product* were incompatible.
- **Evidence:** the Hightower 3 support page (the row's **own** cited source): *"The Hightower 3
  geometry is based off of a 150mm fork… We wouldn't recommend less travel than that, as the BB will
  get a bit low. Up to 160mm is fine if that's your preference."* The Nomad 6 page: *"…based off of a
  170mm fork… We wouldn't recommend less travel than that… Up to 180mm is fine if that's your
  preference."* "We wouldn't recommend… is fine if you prefer" is BB-height guidance, **not** a
  compatibility limit. Contrast the frames where the error tier *is* defensible: Ibis Ripmo V3
  (*"compatible with 150–170mm forks"*) and Forbidden Dreadnought (*"160mm minimum up to 180mm
  maximum"*) — bounded compatibility statements.
- **Additional facet (coordinator-verified):** `fr-santacruz-megatower-cc` carries the hard-error range
  `170–180` with **no `source` field at all** (`verified:false`) — a hard "won't fit" driven off an
  entirely unsourced number, e.g. `fr-santacruz-megatower-cc + fk-rockshox-lyrik-ultimate-29-160`
  errors "under-forked." The rule 12 design intent (per its own comments) is *"`minForkTravel` exists
  only when maker-published"* — but the schema does not enforce that invariant, and at least this one
  frame violates it.
- **Fix (this softens reds — safe direction; still route through the mechanic review since it re-tiers
  a rule):** split rule 12b by **source language**, not by the presence of a number — a per-frame flag
  (e.g. `forkTravelHard: true`). Maker uses recommendation language ("wouldn't recommend", "based
  around", "prefer") → **warning** ("below the maker's recommended range; lowers BB / steepens head
  angle ~1°/20 mm"). Maker uses hard language ("not compatible", "minimum", "maximum", "rated for") →
  keep the **error**. And require `minForkTravel`/`maxForkTravel`-as-hard-range to carry a `source`
  (the Megatower row should be corrected or its range demoted). This also neutralizes the
  travel-adjustable-fork case.

---

## Major findings

### M1 — `drivetrain-speeds` counts the chain, but Flattop chains are width-defined, not speed-defined

- **Rule / ruleId:** rule 3 `drivetrain-speeds`. The speeds-equality set is built from all of
  shifter/derailleur/cassette/**chain**.
- **Problem:** SRAM's Eagle Transmission **Flattop/T-Type chains are a single width-defined family
  shared across speed counts** — the *same* chain (CN-TTYP-XX-A1) runs both the 12-speed Transmission
  groups and the **7-speed XX Eagle Transmission DH** group (cassette CS-XS-797, 7-speed). Because a
  Flattop chain is tagged `speeds:12`, pairing it with a 7-speed T-Type cassette makes
  `speeds = {12, 7}` → a false **`drivetrain-speeds` "won't fit"** on a genuine, SRAM-sold groupset.
- **Why it's Major not Critical:** it doesn't ship a wrong verdict *today* — because the catalog
  authors **already hit this and worked around it**: the whole XX Eagle Transmission DH group is
  deliberately omitted (in-file comment near `src/compat.js:2393` — *"a 7s T-Type group has no
  in-catalog chain… engine rule 3 counts the chain in the one-speed set, so it would force a false
  speed verdict; flagged for an engine decision"*), and three compatibility-token hacks paper over it
  (`ch-sram-pc-xx1` a physically-11-speed chain tagged `speeds:7`; the KMC X10/X9 tagged to microSHIFT
  speeds; the CUES CN-LG500 chain duplicated as a `speeds:9` sibling row). The rule is being *worked
  around*, not satisfied — it is actively removing real, buyable parts from an MTB parts-compatibility builder.
- **Evidence:** SRAM lists CS-XS-797 as a 7-speed DH cassette and the XX Transmission Flattop chain as
  compatible with it; a single Flattop chain family spans the 12 s and 7 s T-Type groups.
- **Fix:** exclude the chain from the **speed**-equality set (compare speeds across
  shifter/derailleur/cassette — the genuinely speed-indexed parts); **keep** the chain in the *system*
  set (3a) and in 3c. Tier stays **error** for a real shifter/derailleur/cassette speed mismatch. This
  removes the need for the token hacks and unblocks the DH-group coverage. Re-tiers a rule → mechanic
  review, but the manufacturer evidence is unambiguous.

### M2 — DH fork `20x110` Boost-vs-non-Boost split is under-sourced (data, not engine)

- **Rule / ruleId:** rule 2 `front-axle`. The engine logic is **sound**; the exposure is per-fork data.
- **Problem:** the catalog assigns plain `20x110` (= Boost) to `fk-fox-40-factory-29-203`,
  `fk-ohlins-dh38-m2-*`, `fk-xfusion-rv1-38-dh-*`, `fk-srsuntour-durolux-r2c2-29-170`,
  `fk-dvo-onyx-dc-*`, `fk-ext-vaia-*`. But the **Fox 40 shares Fox's 40 mm dual-crown chassis class
  with the Bomber 58**, which Marzocchi (a Fox brand) explicitly labels **non-Boost** — and the market
  is genuinely split on the Fox 40 (a reputable EU retailer lists the 2025 Fox 40 as *"DH 20x110
  Kabolt"* = standard DH; others say Boost; Fox's own tech page is silent on Boost vs non-Boost).
- **Why it matters (both directions):** if the Fox 40 is actually non-Boost, it is mislabeled → a
  **false `front-axle` error** against the correct non-Boost DH wheel (e.g. `fk-fox-40-factory-29-203`
  + `fw-spank-359-29-20x110` [`20x110-nonboost`]) **and** a **false "fits"** against a Boost DH wheel
  (the rotor plane is ~5 mm off).
- **Evidence (fetched):** Marzocchi Bomber 58 page states verbatim *"20x110 DH (non-Boost) axle"* (so
  the `20x110-nonboost` bucket is real and correctly anchored); RockShox BoXXer is clearly branded
  *"20x110mm BOOST"* (so the Boost bucket is real too). The Fox 40's bucket is the unresolved one.
- **Fix (data):** individually verify each `20x110` DH fork's Boost/non-Boost status against a
  manufacturer axle-assembly spec (Fox Kabolt X part numbers differ Boost vs DH) before trusting any
  of these `front-axle` verdicts. Do **not** bulk-assume "modern DH = Boost." Hand to the catalog
  auditor. Tier stays error; the vocab split itself is correct.

---

## Minor findings

- **Minor-1 — Native-180 PM forks missing `minRotorF` silently pass a sub-native rotor (false fit,
  data backfill).** Rule 10 `front-rotor-min` is dormant-until-sourced. A fork with a native
  direct-180 caliper mount but no populated `minRotorF` silently passes a 160 mm rotor that physically
  cannot mount (PM adapters only space *up*). The Lyrik row correctly carries `minRotorF:180`; audit
  the rest of the native-180 forks (Fox 38, Marzocchi Z1 class, etc.) and backfill `minRotorF:180` from
  each maker page. No engine change.
- **Minor-2 — Freehub exact-match reds a swappable-driver wheel (tier caveat).** Many enduro hubs ship
  a user-swappable freehub body (buy an XD / MicroSpline / HG driver for the same hub). The engine
  treats "XD cassette on a MicroSpline wheel" as a hard **error**, when for a swappable-driver wheel it
  is really a buy-a-part situation — closer to the warning + `fix` tier of the rotor-adapter case.
  Defensible only if the catalog means "wheel as sold." Flag for the mechanic review; no code change on
  review authority. (Also latent: the vocab collapses `XD`/`XDR`/`XD-Slim` to `XD` — fine today, too
  coarse if road/DH-slim driver rows are ever added.)
- **Minor-3 — Unsourced sample `maxTire` drives real false *warnings*.** `maxTire` is a *required*
  field on wheels/rims, so rule 14 fires on every wheel+tire pair; many values are sample guidance,
  commonly `2.5`. A 2.6" tire on a 30 mm-internal enduro rim is fine in reality but trips a
  `rear-tire-rim` warning (e.g. `rw-giant-trx-0-29` `maxTire:2.5` + any 2.6" tire — ~48 in the
  catalog). Warning is the *right tier* for a genuine too-wide case; the defect is **data**. Fix:
  don't let an unsourced `maxTire` drive a warning (mirror the dormant-until-sourced pattern used for
  `minTire`), or upgrade the sample values to rim-width-appropriate figures. Low harm (yellow dot), but
  it erodes the trust the product is built on.
- **Minor-4 — `intWidth` is a required field no rule reads (dead field) + the silent too-narrow gap.**
  Internal rim width is required on every wheel/rim yet unused by the engine (only the display helper
  touches it). The ETRTO tire↔rim-width recommended range is only caught by dormant rule 14c (sourced
  `minTire` only), so a 2.2" XC tire on a 30 mm enduro rim passes silently. Deferring an ETRTO-*derived*
  rule is correct per THE BAR, but decide `intWidth`'s fate (wire it into a clearly-sourced range check,
  or mark it display-only/reserved) rather than leaving a misleading required-but-dead field.
- **Minor-5 — Rule 11 single-enum head tube can't model a reducer / "accepts-both" tube (known
  limitation).** `frame.headset` is a single enum, so it can't express a head tube that legitimately
  accepts more than one steerer via a reducing crown race. No live false-positive in the all-tapered
  catalog, and `straight-dc` is specifically dual-crown so the current reds are correct — but the model
  has no room for the reducer case the project already flagged. Confirming it's a data-model limitation,
  not just a rule wording nuance.

---

## Rule-interaction section

- **Rule 11 (`steerer`) + Rule 20a (`headset-steerer`) double up (benign).** With frame + fork +
  headset all picked and a fork-taper mismatch, both fire for the same root cause. Confirmed live:
  both verdicts are *true*, they key on different slot pairs so they carry different `verdictKey`s, and
  nothing is masked — just doubled. Low priority (the triggering build — a dual-crown fork on a trail
  frame — is contrived). If ever tidied, prefer suppressing 20a when 11 already covers the taper.
- **Rule 12b suppresses Rule 12c correctly.** The design-travel warning (12c) is intentionally
  suppressed when the approved-minimum error (12b) has already fired for the same pair — verified, one
  verdict per conflict, no masking of a *different* conflict.
- **`verdictKey` dedup is holding.** The red-team specifically probed for the `REVIEW.md #4/#13`
  byte-identical-string maskings and for a placement-diff false-green; none reproduced. The
  ruleId+slots+msg identity is doing its job.
- **No cross-rule masking of a real error was found.** The one place two rules interact on the same
  parts (11/20a) produces *extra* true verdicts, never a hidden one.

---

## What the engine got right (adversarial coverage-confirmed)

The dedicated red-team pass, running builds through the engine and checking each against manufacturer
docs, confirmed these are **correct** (recorded so the coverage is on the record, and because a review
that only lists defects hides how much the engine gets right):

- **Dual-crown DH forks are properly steerer-gated** — every catalog DH fork (BoXXer, Fox 40,
  Marzocchi 58, Öhlins DH38…) carries `steerer:'straight-dc'`, so rule 11 correctly reds a DH fork on
  a tapered head tube; a 1-1/8" straight steerer genuinely cannot run a tapered tube.
- **T-Type ring + SRAM Eagle chain** → silent = correct (SRAM: T-Type rings are backward-compatible
  with Eagle chains). **Non-T-Type ring + Flattop chain** → rule 3c errors = correct.
- **Mixed front-Shimano / rear-SRAM brakes** → silent = correct (independent hydraulic circuits); the
  atomic-brake model makes the dangerous intra-brake DOT/mineral mismatch un-expressible.
- **Cassette capacity (rule 5)** maxCog-only is correct for 1x; **AXS controller one-system exemption +
  actuation (3b)**, **reverse-mullet guard**, **freehub exact-match**, **direction-aware rotor
  interface + adapter tier**, **rear-axle 142/148/157/150 splits**, and **shock eye/stroke/mount
  direction-awareness** all behaved correctly on every probed build.

**Adversarial convergence / loop status:** seven independent Opus agents (five rule-cluster deep-dives,
a missing-rules hunt, and a dedicated break-the-engine red-team) each constructed adversarial builds
across their scope. They **converged** on the same six findings below; the final dedicated adversarial
round surfaced **no new concrete failing case** beyond the cluster findings (it re-derived C3 with a
second part pairing and re-raised the crankset-exclusion case, which two other agents independently
placed below the error bar). Given that convergence, the adversarial loop is judged **dry**.

---

## Missing rules — disposition (all defer/reject, with fresh evidence)

The missing-rules hunt recommends **adding no new hard-error rule.** Every real incompatibility is
either structurally impossible in this data model, fuzzy enough that a rule would false-fire, or
already covered. Details, each with fetched evidence:

| Candidate | Verdict | Reason / false-error risk |
|---|---|---|
| **Shimano lever + SRAM caliper / DOT-vs-mineral fluid** | **REJECT (impossible today) — but a load-bearing note** | A real, safety-critical incompatibility (DOT dissolves mineral seals → brake failure), but **designed out**: a brake is one complete lever+caliper+hose part per slot; you can never pair a foreign lever and caliper. **If `brake` is ever split into separate lever/caliper slots (or a bleed-kit/hose category is added), a `fluid:'dot'|'mineral'` hard-error rule becomes MANDATORY at that moment** — it would be the single most safety-critical rule in the engine. |
| **Chainring direct-mount interface (8-bolt/3-bolt/Shimano) vs crank** | **REJECT (impossible)** | No separate chainring slot — the crankset carries its ring inline. The one surviving crank↔ring concern (Flattop chain vs non-T-Type ring) is already rule 3c. |
| **Crankset excluded from the drivetrain system/speed set** | **REJECT (correct-by-design)** | Traced exhaustively: T-Type ring + Eagle chain is SRAM-*sanctioned* (silent = correct); standard ring + Flattop chain is caught by 3c; a 12 s narrow-wide ring + 11 s chain runs fine (a crank-in-speed-set rule would **false-fire** this legitimate budget build); T-Type ring + a foreign Shimano 12 s chain is a *wear* caveat, not a maker-documented won't-fit (below the error bar). Leaving the crankset out is right. |
| **Chainline Boost (52) vs SuperBoost (55/56.5)** | **REJECT (false-error risk HIGH)** | SRAM targets **55 mm for both** Boost and SuperBoost with Transmission; non-Transmission is tolerant (52 works, riders run 54–55 on SuperBoost) — the failure mode is chain "tick," not a won't-fit. Every catalog crank already carries the correct chainline for its system, and the danger case (non-Transmission crank on Transmission) is already caught by 3c. A rule keying on axle standard would false-error the SRAM-endorsed common builds. |
| **Chain length / total drivetrain capacity vs cassette + ring** | **REJECT** | For 1x, makers publish max-cog (already rule 5), not a road-style total-capacity number; chain length is a setup step (add/remove links), not a part-compat fact. Redundant + false-fire risk. |
| **Dropper insertion depth vs frame size / min insertion** | **DEFER (correct as today)** | Rule 13b INFOs at `drop>=180`; the real check needs `frame.sizes.maxInsert` + a frame-size picker (both partly staged). A hard rule without per-size data would false-fire. |
| **Seatpost/dropper vs curved/interrupted seat tubes** | **DEFER/REJECT (no data)** | Real but per-frame, rarely a clean published number, overlaps 13b. Keep parked. |
| **Tire vs internal-rim-width (ETRTO range)** | **REJECT for a computed rule; sourced version already exists (14c)** | ETRTO-*derived* thresholds are fuzzy/standards-dependent — computing them makes soft-warning noise on legit setups. The sourced-only dormant design (14 max / 14c min off maker `minTire`) is correct. |
| **ISCG-05 tabs vs chainguide/bash; spoke/nipple/hub for hub+rim; rotor thickness 1.85/2.0/2.3; tire inserts; steerer length vs stack; HG-11 freehub spacer; front-derailleur/2x** | **REJECT / NOTE** | No matching slot/category exists (guide, separate spokes, 2x), or not a maker-documented won't-fit, or requires geometry the app doesn't model. The **1x-only** scope is a sound assumption worth recording (2x would need front-derailleur-vs-frame + 2x-shifter rules). |
| **E-bike motor/drivetrain ratings** | **REJECT (out of scope)** | Unpowered enduro catalog; owner-deprioritized. |

**Two low-risk INFO-tier candidates you *could* add later (never error, so no false won't-fit):**
1. `chainline-advisory` (INFO) when a `SuperBoost157` frame meets a 52 mm-chainline crank — data
   already present. Low value, mild noise; hold.
2. `brake-fluid-advisory` (INFO) — only meaningful if brake slots are ever split; see the load-bearing
   note above.

---

## Catalog data-quality items (for the catalog auditor, not engine defects)

- **`fr-santacruz-megatower-cc`** carries a hard-error fork range `170–180` with **no `source`**
  (`verified:false`) — either source it or demote it (also see C4).
- **DH `20x110` fork Boost/non-Boost** — per-fork verification needed (see M2); Fox 40 is the live
  suspect.
- **Native-180 PM forks** — backfill `minRotorF:180` where missing (see Minor-1).
- **Sample `maxTire:2.5`** on ~20 enduro wheels — upgrade or make non-warning (see Minor-3).
- **`sh-manitou-mara-pro-230x65-trun`** (a 230×65 *trunnion*, source-faithful) has no eye+mount-matching
  frame in the catalog, so it can only ever throw `shock-mount` — un-pairable-clean completeness item.
- **`fr-santacruz-highball`** (`seatTube:27.2`, correct) has no 27.2 mm dropper in the catalog, so the
  required dropper slot always reds — add 27.2 mm droppers (Fox Transfer SL 27.2, OneUp V2 27.2, PNW
  Pine). Engine verdict is *true*; the fix is coverage.
- **`straight-dc` DH frames** (e.g. `fr-commencal-supreme-dh-v5`) carry `headTubeUpper:'ZS56/28.6'`
  (a 1-1/8" *tapered/single-crown* suffix) while `headset:'straight-dc'` — the two fields disagree; no
  false verdict today (rule 11 uses `headset`, 20b uses the bore token) but reconcile before a future
  rule leans on both.

---

## Gate confirmation (review is additive — this doc only)

No engine code, catalog data, or test was changed. Gate results at review time:

- `node validate.js` → **DATA OK — 2016 parts, 0 problems (1480 verified, 536 unverified).**
- `npx vitest run` → **Test Files 15 passed (15) · Tests 453 passed (453).**
- `npx tsc --noEmit` → **clean (exit 0, no output).**
- `node tools/verdict-audit-harness.js` → **no new flags; section D 11/11 adversarial clashes caught,
  0 missed; section E is the pre-existing rotor-max probe (4 fork families warn on a 203 rotor — a
  correct warning, confirmed a non-issue in C1's cluster review).**

---

*Prepared by the engine-critical re-audit, 2026-07-12. Branch `review/engine-critical-2026-07-12`.
Fixes land separately after coordinator + Douglas triage, under THE BAR.*
