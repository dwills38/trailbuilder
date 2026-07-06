# REVIEW.md — Correctness audit of the TrailBuilder compatibility engine

**Date:** 2026-07-06 · **Scope:** `src/compat.js` (`checkBuild` rules 1–18 + helpers `compatOf`/`conflictReason`/`buildTotals`/`bundleActive`/`partVerified`), `src/schema.js`, verdict wording in `index.html`, docs. **Audit only — no code or data was changed.**

**Baseline at audit time:** `npm test` → 91/91 pass; `node validate.js` → `DATA OK - 327 parts, 0 problems (46 verified, 281 unverified)`. (Note: the request said `node tests.js`; that file does not exist — the suite runs on Vitest via `npm test` per CLAUDE.md.)

**Method:** every claim about engine behavior below was demonstrated by actually executing the quoted build through `checkBuild`/`compatOf` (probe scripts, not code inspection alone), and every finding then went through an independent adversarial verification pass that re-ran the build and checked the real-world claim against manufacturer sources. 54 raw findings were merged to 29; 28 confirmed, 1 **refuted** (kept below — the refutation prevents a future false-red rule). Severity scale: **Critical** = false green (engine silent or green on a combo that doesn't work), **Major** = false red on a real correct build, or crash, **Minor**, **Nice-to-have**.

---

## PRIORITIZED SUMMARY (worst first)

| # | Sev | Finding | Where |
|---|-----|---------|-------|
| 1 | **Critical** | Mechanical shifter + AXS wireless derailleur (same `system:'sram-eagle'`) passes totally clean — the bike cannot shift at all | rule 3 + data model |
| 2 | **Critical** | Crankset excluded from all drivetrain checks — T-Type Flattop chain + non-T-Type chainring (SRAM-documented hard incompatibility) is silent | rule 3 / rule 7 + schema |
| 3 | **Critical** | No minimum-rotor rule — a 180 mm rotor on a ZEB/Domain (200 mm-native mount, per fetched sram.com specs) is silently green and physically unmountable | rule 10 + schema |
| 4 | **Critical** | Preset dot false green: `compatOf`'s preset path never clears the slots the preset fills, so an incompatible wheelset kit shows green when the same error string already exists | `compatOf` lines 629–639 |
| 5 | **Critical** | Shifter/brake-lever clamp integration unmodeled — the I-Spec-only XT shifter with SRAM brakes passes a full build clean but cannot be mounted as specced | no rule + schema |
| 6 | **Major** | Dots ignore warnings entirely: every warning-class rule (10/12/14/18) renders as green "No conflicts", and the UI legend says green = "fits" | `compatOf`/`conflictReason` + index.html |
| 7 | **Major** | Catalog trap: every SRAM-cassette mullet build is impossible (only 27.5 rear wheel is MicroSpline) — permanent false red on the canonical modern enduro spec | catalog + rules 1/6 |
| 8 | **Major** | Rule 16 hard-errors a shorter-stroke shock with matching eye-to-eye/mount — false red on a real, manufacturer-supported setup | rule 16 |
| 9 | **Major** | Rule 13 hard-errors a smaller dropper that works with a ubiquitous reducing shim — direction-blind | rule 13 |
| 10 | Minor | Rule 9 errors identically on the adapter-solvable direction (6-bolt rotor on CL hub, Shimano SM-RTAD05) and the truly impossible one | rule 9 |
| 11 | Minor | `partVerified` badges presets "✓ Verified" while the billed bundle price/weight are unverified sample numbers | `partVerified` + index.html |
| 12 | Minor | Groupset bundle weights are physically impossible (up to 230 g lighter than their own exact parts) | preset data + `buildTotals` |
| 13 | Minor | `conflictReason` string-dedup masks new conflicts — every 29″ tire dots green on a mullet-only build once a wrong 29″ wheel is present | `conflictReason` + rule 1 wording |
| 14 | Minor | No under-forking check (rule 12 is upper-bound only) | rule 12 |
| 15 | Minor | Rules 2-front/8/11 are dead code — single-valued vocabularies mean they can never fire, and none has a test | rules 2/8/11 + VOCAB |
| 16 | Minor | Rules 14/18 (tire clearance) untriggerable with the current catalog; "activated for 6 frames" doc count is stale (it's 10) | rules 14/18 + docs |
| 17 | Minor | Rule 17 red-dots an OEM shock when *no* frame is picked — inconsistent with rule 4's info-when-frameless convention | rule 17 |
| 18 | Minor | Frameless reverse-mullet (27.5 F / 29 R) passes silently even though no config in the model permits it | rule 1 |
| 19 | Minor | AXS wireless parts are labeled "SRAM Eagle (mechanical)" in spec lines and error text | `LABELS` |
| 20 | Minor | `crankBb` vocab can't represent 30 mm spindles — rule 7 gives factually false BB advice for eeWings/e*thirteen | VOCAB + rule 7 |
| 21 | Minor | No coil-approval check (`shock.spring` validated but read by no rule; frames have no flag) — real per-frame manufacturer constraint | rule 16 area |
| 22 | Minor | No front-tire vs fork crown clearance rule (fork has no `maxTire`) — asymmetric twin of rule 18 | rules 14/18 area |
| 23 | Minor | No dropper insertion-depth/length check — the most common real dropper misfit is unmodeled | rule 13 area |
| 24 | Minor | Doc drift: CLAUDE.md "326 parts / 38 verified", README "7 verified" vs actual 327/46 | docs |
| 25 | Minor | `bundleActive` never checks the preset belongs to the group — reachable today via the share-link hash, silently corrupts totals | `bundleActive` + index.html `readHash` |
| 26 | N-t-h | Rule 7 correct-by-luck; no BB category, so every "complete" build omits a required part; identical info on all 252 crank×frame pairs | rule 7 |
| 27 | N-t-h | SuperBoost-frame + Boost-crank deliberate non-rule is safe but unpinned by any test | rule 7 area + tests |
| 28 | N-t-h | Inventory of display-only fields; `range`/`maxCog` can silently diverge (validator lint gap) | schema/data |
| R | refuted | "52T Eagle derailleur incompatible with 10-50 cassettes" — SRAM documents the opposite; do **not** add this rule | rule 5 |

**What held up under attack:** no crashes anywhere (`checkBuild(undefined)`, `{}`, every single-part build is safe); rule 4's UDH logic and its frameless-info convention; rule 15 (bar/stem); the rear-axle half of rule 2 (correctly reds Boost wheels on the SuperBoost Firebird); rule 5 as written (see refuted finding); rule 17's branch logic; the golden builds; and the deliberately-scoped "No conflicts found" main verdict wording.

---

## 1. Rule-by-rule audit of `checkBuild`

| Rule | Verdict | Notes (findings in §3–§7) |
|------|---------|---------------------------|
| 1. Wheel sizing | Logic correct with a frame present; two gaps | Frameless reverse-mullet passes (#18); part-agnostic error string enables dot masking (#13). |
| 2. Axles | Rear half correct and live; front half dead | Front-axle check can never fire — single-valued vocab (#15). |
| 3. Drivetrain system+speed | Correct for the 4 parts it checks; **blind twice over** | Conflates cable/AXS actuation inside `sram-eagle` (#1, Critical); excludes crankset entirely (#2, Critical). |
| 4. UDH | **Correct.** | Frameless case downgrades to info — the right convention (rule 17 violates it, #17). |
| 5. Cassette vs derailleur maxCog | **Correct as written** | One-sidedness mirrors SRAM's actual compatibility map (see refuted finding). `range` unused (#28). |
| 6. Freehub | Exact-match logic correct | Models the freehub as immutable; with the catalog this creates the mullet trap (#7). |
| 7. BB advisory | Info-only, correct-by-luck | Every DUB/SH24 × BSA73/PF92/T47 pair is servable today (#26); message factually wrong for 30 mm-spindle cranks (#20-adjacent, see #20/#21 numbering below). |
| 8. Brake mount | Dead rule | All parts `'PM'`; PM *size* unmodeled — real protection delegated to rule 10, which lacks a minimum (#3, #15). |
| 9. Rotor interface | Exact-match logic correct; direction-blind | 6-bolt-on-CL is a $20-adapter everyday combo but errors identically to the impossible reverse (#10). |
| 10. Rotor size max | **Max-only, warning-only** | No minimum check → Critical false green (#3); over-max is a manufacturer hard limit yet only warns and is invisible in the dot (#6). |
| 11. Steerer | Dead rule | Single-valued vocab; no test coverage (#15). |
| 12. Fork travel | Upper bound only | No under-forking check (#14); "recommended max" understates a rated, warranty-relevant limit (#6). |
| 13. Dropper diameter | Direction-blind | Smaller-post-with-shim is a false red (#9 in Major list); insertion depth unmodeled (#23). |
| 14. Tire vs rim | Logic fine; **untriggerable** | Widest tire 2.5″, smallest rim max 2.5″, strict `>` — can never fire (#16). |
| 15. Bar/stem clamp | **Correct.** | Live (31.8 and 35 both in catalog). No defects found. |
| 16. Shock fit | Eye/mount correct; stroke direction-blind | Shorter-stroke same-eye shock is a false red (#8). |
| 17. Bundling / OEM | Branches correct | oemOnly errors when frameless, inconsistent with rule 4 (#17); the frameOnly+bundledShock info branch is unreachable with current data (only `fr-enduro` bundles). |
| 18. Frame tire clearance | Logic correct, dormancy honest; untriggerable | No >2.5″ tire exists; "6 frames" comment stale — 10 frames carry `maxTire` (#16). |

Helpers: `compatOf`/`conflictReason` — warnings invisible (#6), preset-path baseline bug (#4, Critical), string-membership dedup (#13). `buildTotals`/`bundleActive` — impossible bundle weights (#12), no group-membership check (#25). `partVerified` — preset badge over unverified bundle numbers (#11). Crash-safety: clean.

---

## 2. CRITICAL findings (false greens)

### #1 — Mechanical shifter + AXS wireless derailleur passes completely clean
- **Severity:** Critical · **Where:** [src/compat.js](src/compat.js) rule 3 (lines 519–529) + catalog (`sft-gx-axs`, `dr-gx-axs` tagged `system:'sram-eagle'`); shifter/derailleur schema has no actuation field.
- **Example:** `checkBuild({shifter: sft-gx-m, derailleur: dr-gx-axs})` → `{"errors":[],"warnings":[],"infos":[]}`. Reverse (`sft-gx-axs` + `dr-gx-m`) also clean; `compatOf(dr-gx-axs, {shifter: sft-gx-m})` → green "No conflicts with your current build". A full otherwise-coherent build (`fr-slash`, `sft-gx-axs`, `dr-gx-m`, `ca-sram-e`, `ch-eagle`, `cr-gx`, `rw-dt`) returns only the rule-7 BB info.
- **Why wrong:** an AXS derailleur has no cable anchor for a trigger to pull; an AXS controller sends radio signals a cable derailleur cannot receive. Neither pairing can shift at all — no adapter exists. Rule 3 compares only `system`+`speeds`, and both actuation types share `sram-eagle`/12. The catalog contains both types today (cable: `sft-gx-m`, `sft-nx`, `dr-gx-m`, `dr-nx`, `dr-x01`; wireless: `sft-gx-axs`, `dr-gx-axs`), so users can assemble this false green from real parts.
- **Fix:** add `actuation: 'cable'|'electronic'` to shifter and derailleur in `schema.js`/`types.js`, tag the catalog, and error in rule 3 when `shifter.actuation !== derailleur.actuation`. Do **not** split the `system` vocab — Eagle cassettes/chains (`ca-sram-e`, `ch-eagle`) are genuinely shared between mechanical and AXS, so a split would false-red them. Negative tests both directions.

### #2 — Crankset excluded from all drivetrain checks (T-Type chain + non-T-Type ring is silent)
- **Severity:** Critical · **Where:** [src/compat.js](src/compat.js) rule 3 (the `dt` array pushes only shifter/derailleur/cassette/chain) + rule 7; `schema.js` crankset has no system/chainring-standard field. The most-reported defect — found independently by 5 of 6 auditors.
- **Example:** `checkBuild({frame: fr-slash, shifter: sft-gx-t, derailleur: dr-gx-t, cassette: ca-sram-t, chain: ch-flattop, crankset: cr-xt})` → zero errors/warnings; only the BB info. Same silence with `cr-gx`/`cr-rf`; `compatOf(cr-xt, …)` → green.
- **Why wrong:** SRAM documents (support.sram.com; corroborated by Wolf Tooth and e*thirteen) that T-Type Flattop chains have unique link shape/pin size and larger rollers and that non-T-Type chainrings are **not compatible** — a published, binary, per-ring hard constraint, unlike the deliberately-rejected chainline rule. The catalog's own `gs-gx-t` preset pairs `cr-x0t` (T-Type), proving the data author knew the constraint the engine can't express; swap to the cheaper XT crank and the dot stays green.
- **Verification correction:** the mirror direction is *not* equally broken — SRAM documents T-Type rings as backward-compatible with Eagle chains. Only `chain.system === 'sram-transmission' && ring not T-Type` should be an error.
- **Fix:** add `ringStd: 't-type'|'standard-12'` to crankset (schema/types/VOCAB), tag `cr-x0t`/`cr-xx-t` as t-type, error on Transmission chain + non-t-type ring. Do not error the reverse. Interim until the field exists: an info whenever a Transmission chain is paired with any crank, so the verdict is at least not silent.

### #3 — No minimum-rotor rule: 180 mm rotor on a ZEB/Domain is silently green
- **Severity:** Critical · **Where:** [src/compat.js](src/compat.js) rule 10 (max-only); schema has no `minRotor`, and `brakeMount:'PM'` carries no size dimension.
- **Example:** `checkBuild({fork: fk-zeb, frontRotor: ro-hs2-180})` → all empty. `checkBuild({fork: fk-domain, frontRotor: ro-cl-180, frontWheel: fw-dt})` → all empty (CL hub matches, so nothing else catches it). `compatOf(ro-hs2-180, {fork: fk-zeb})` → green.
- **Why wrong:** settled per the project's own "only a fetched manufacturer page counts" bar: sram.com model pages state ZEB Ultimate and Domain RC "Minimum Rotor Size: 200mm". Post-mount adapters only space calipers *up*, never down — the caliper sits ~10 mm proud of a 180 rotor. Reachable today: 3 × 180 mm rotors × 4 affected forks (`fk-zeb`, `fk-zeb-275`, `fk-zeb-180`, `fk-domain`). A dissenting auditor's claim of a 180 minimum was refuted against the fetched pages; `fk-38-180` was dropped from the affected list (Fox 38 2021–25 has a 180 mm mount).
- **Side data note:** catalog `fk-domain` has `maxRotorF: 200` but SRAM lists max 220 — a separate sample-data inaccuracy (false-warning channel).
- **Fix:** optional `fork.minRotorF` (later `frame.minRotorR`) per the rule-18 dormant-until-sourced template; error when `fRotor.size < fork.minRotorF` ("smaller than the fork's native mount — no adapter exists"). Populate 200 for the four RockShox ids from the cited pages.

### #4 — Preset dot shows false GREEN when the build already contains a byte-identical error string
- **Severity:** Critical · **Where:** [src/compat.js](src/compat.js) `compatOf` preset path (lines 629–639) vs `conflictReason` (line 618).
- **Example:** build = `{frame: fr-firebird (SuperBoost157), rearWheel: rw-dt (Boost148)}`. `compatOf(ws-reserve, build)` → `{"state":"g","reason":"No conflicts with your current build"}` — and so do **all four** Boost wheelset presets (`ws-dt`, `ws-i9`, `ws-roval`). Applying the preset still leaves "Rear axle mismatch: Frame is SuperBoost 157x12 but Rear wheel hub is Boost 148x12." Control: single-part `compatOf(rw-reserve, same build)` is correctly **red** — the single-part path clears the slot first; the preset path doesn't. Second reproduction: `ws-i9` (MicroSpline) masked by an existing XD-cassette freehub error.
- **Why wrong:** `conflictReason` deletes the tested slot before computing the "before" baseline; the preset path computes `before` with the to-be-replaced parts still in place. Since rule-2/6 strings don't name the offending part, the preset's new conflict is string-identical to the pre-existing one and is filtered as "not new". This fires at the worst moment: the user's wheel doesn't fit, they browse wheelset kits *to fix it*, and every incompatible $1,599 kit shows green. The code comment even claims the preset path "mirrors the single-part path" — it doesn't.
- **Fix:** in the preset branch, build the baseline from a copy of `bld` with every slot in `p.fills` deleted (mirroring `conflictReason`). Longer term: diff errors by structured identity (rule id + slot) instead of display strings — which also fixes #13. Add a test-greying case.

### #5 — Shifter/brake-lever clamp integration unmodeled (I-Spec shifter + SRAM brakes)
- **Severity:** Critical (severity dispute settled upward in verification) · **Where:** no rule touches shifter mounting; shifter schema is `system`+`speeds` only.
- **Example:** `checkBuild({handlebar: hb-fatbar, stem: st-apex, shifter: sft-xt, frontBrake: bk-code, rearBrake: bk-code})` → all empty; a complete 22-slot build with `bk-code` brakes returns only the BB info; `compatOf(sft-xt, …)` → green.
- **Why wrong:** the catalog part is literally named "XT M8100 I-Spec" — an I-Spec EV shifter ships with no handlebar clamp of its own and only bolts to a Shimano I-Spec EV brake lever; SRAM Code levers are MatchMaker X. As specced the shifter attaches to nothing. Cross-brand brake+drivetrain combos are among the most common real enduro builds. The engine's own precedent treats adapter-solvable mismatches as failures (rule 9 errors on 6-bolt/CL; rule 10 warns on oversize) — so total silence here is a false green, even though band-clamp SKUs and Wolf Tooth ShiftMount adapters exist.
- **Fix:** add shifter `clampType` (`'ispec-ev'|'matchmaker'|'band'|'pod'`) and an optional brake lever-integration field; emit a **warning** ("needs the band-clamp version or a ShiftMount-style adapter") when a lever-integrated shifter meets a brake of a different standard. Land dormant, activate as the ~10 shifters + 21 brakes are tagged.

---

## 3. MAJOR findings (false reds and the systemic presentation channel)

### #6 — Dots ignore warnings entirely; UI legend says green = "fits"
- **Severity:** Major · **Where:** `conflictReason`/`compatOf` diff `.errors` only; `CompatState` is `'g'|'r'|'n'`; [index.html:159](index.html:159) legend "Fits your current build", [index.html:192](index.html:192) "green fits, red won't", compatible-first sort ranks warning-tripping parts identically to clean fits.
- **Example:** `checkBuild({fork: fk-mezzer, frontRotor: ro-hs2-220})` → warning "Front rotor: 220mm exceeds the fork max of 203mm" — but `compatOf(ro-hs2-220, {fork: fk-mezzer})` → green, pixel-identical to a perfect part. Same for over-travel forks (`fk-38-180` on `fr-madonna`). Preset path compounds it: a brakeset preset adding two rotor warnings still returns green.
- **Why wrong:** the dot is the primary pick-time signal; warning-level misfits are actively presented as clean fits and only flagged *after* the part is added. A fork's max rotor is a manufacturer hard structural limit (Manitou rates the Mezzer at 203) — arguably rule 10 should be an error outright; rule 12's "recommended max" understates a warranty-voiding rated limit.
- **Fix:** add a fourth dot state `'w'` (yellow): diff the warnings array too; if a part adds no new error but ≥1 new warning, return `{state:'w', reason:<first new warning>}`. Update `types.js`, dot CSS/legend/footer ("green = no conflict found"), sort ranking (g < w < n < r), test-greying, and the preset branch. Separately decide promoting rule 10 to error and rewording rule 12 to "rated max".

### #7 — Every SRAM-cassette mullet build is impossible (catalog trap)
- **Severity:** Major · **Where:** catalog (`rw-dt275` is the only 27.5 rear wheel, `freehub:'MicroSpline'`) interacting with rules 1/6.
- **Example:** `checkBuild({frame: fr-metasx, shifter: sft-gx-t, derailleur: dr-gx-t, cassette: ca-sram-t, chain: ch-flattop, rearWheel: rw-dt275})` → "Freehub mismatch: … needs a SRAM XD freehub, but Rear wheel has Shimano Micro Spline." No selection escapes it: all SRAM cassettes are XD/HG, `fr-metasx`/`fr-hd6` are mullet-only (any 29 rear wheel errors under rule 1). Verified exhaustively — zero error-free SRAM-cassette builds exist on either frame.
- **Why wrong:** the Meta SX and HD6 ship stock with SRAM drivetrains; DT Swiss sells this wheel with an XD freehub body (freehub bodies are swappable, brand-offered options). The error is literally true for the specced part but the product-level effect reads "SRAM Transmission doesn't work on the Meta SX" — a false claim about the real world, including against the app's own flagship `gs-gx-t` preset.
- **Fix:** cheapest — add an XD 27.5 rear wheel (`rw-dt275-xd`; DT sells it) and ideally an XD 27.5 wheelset preset; add a golden SRAM-mullet build test. Long-term: model freehubs as swappable (`freehubOptions` array; rule 6 downgrades to "needs the XD freehub body version of this wheel" when the platform offers one).

### #8 — Rule 16 hard-errors a shorter-stroke shock with matching eye-to-eye and mount
- **Severity:** Major · **Where:** [src/compat.js](src/compat.js) rule 16 line 576 (eye×stroke checked as one exact pair).
- **Example:** `checkBuild({frame: fr-megatower (230×62.5 std), shock: sh-floatx-60 (230×60 std)})` → error "Shock size mismatch: Frame needs 230x62.5mm but Shock is 230x60mm." — identical verdict class to the genuinely unsafe `sh-vivid` (230×65) in the same frame. Also fires on `fr-capra` (230×65) + `sh-floatx-60`, and `sh-sdu-230625` in any 230×65 frame.
- **Why wrong:** physical fit is set by eye-to-eye + mount; a shorter stroke sweeps a strict subset of the designed linkage range (slightly less travel, no over-rotation risk). RockShox/Fox sell the same 230 bodies in 57.5/60/62.5/65 strokes and RockShox officially supports stroke-spacer reduction; frame makers ship stroke-reduced variants. The *longer*-stroke direction (over-rotation, bottom-out contact) is correctly an error but is currently indistinguishable.
- **Fix:** split rule 16 — eye mismatch → error; mount mismatch → error; `stroke > frame.shockStroke` → error; eye+mount match with shorter stroke → **warning** quantifying reduced travel ("~158 mm instead of 165 mm; confirm bottom-out clearance / frame-maker approval"). Tests both directions.

### #9 — Rule 13 hard-errors a smaller dropper that works with a ubiquitous shim
- **Severity:** Major · **Where:** [src/compat.js](src/compat.js) rule 13 line 565 (exact equality).
- **Example:** `checkBuild({frame: fr-megatower (31.6), dropper: dp-pnw (30.9)})` → error, identical in shape to the physically impossible reverse (`fr-strive` 30.9 + `dp-reverb` 31.6). Actual shimable false reds: 2 × 30.9 posts (`dp-pnw`, `dp-command`) on all 18 31.6/34.9 frames, plus 13 × 31.6 posts on the 3 × 34.9 frames.
- **Why wrong:** a smaller post in a larger tube with a ~$15 reducing shim (Problem Solvers, Wolf Tooth) is a common, shop-approved build — PNW's own sizing guide says a too-small post "can use a shim to fit properly" while a too-big post is "physically impossible". The message gives zero hint that one direction is a $15 fix. (Verification correction: PNW *endorses* shimming but doesn't sell a shim; and the catalog's three 34.9 posts red-dotting on smaller frames are the impossible direction and must stay red.)
- **Fix:** direction-aware: `dropper.diameter > frame.seatTube` → error (unchanged); smaller → warning/info "requires a 31.6→30.9 reducing shim (sold separately)". Optionally a shim category later.

---

## 4. Adversarial edge cases — what the tool says vs what's true

All outputs below observed by execution (exact part ids; slot→part-object builds).

| Build (exact ids) | Tool says | Actually true | Finding |
|---|---|---|---|
| `fr-slash` + `sft-gx-t` + `dr-gx-t` + `ca-sram-t` + `ch-flattop` + **`cr-xt`** | No errors/warnings (BB info only) | Flattop chain won't run a non-T-Type ring (SRAM hard doc) — **FALSE GREEN** | #2 |
| `sft-gx-m` + `dr-gx-axs` (or reverse) | All empty; green dot | Bike cannot shift at all — **FALSE GREEN** | #1 |
| `fk-zeb` + `ro-hs2-180` (+ `bk-code`, `fw-reserve`) | All empty; green dot | ZEB min rotor 200 mm (sram.com) — rotor unmountable — **FALSE GREEN** | #3 |
| `{frame: fr-firebird, rearWheel: rw-dt}` → `compatOf(ws-reserve)` | Green: "No conflicts with your current build" | Boost wheelset cannot mount in a SuperBoost frame — **FALSE GREEN dot** on all 4 Boost kits | #4 |
| Full build with `sft-xt` + `bk-code` brakes | All empty | I-Spec EV shifter has no clamp; unmountable as specced — **FALSE GREEN** | #5 |
| `compatOf(ro-hs2-220, {fork: fk-mezzer})` | Green at pick time; warning only after adding | 220 > Manitou's 203 hard max — misleading green | #6 |
| `{frame: fr-metasx, rearWheel: rw-dt}` → `compatOf(ti-dhr-29)` | Green | A 29″ rear tire can never run on a mullet-only frame (masked by identical error string) | #13 |
| `{fork: fk-zeb-275, rearWheel: rw-dt}` (no frame) | All empty | Reverse mullet satisfies no config in the model or reality | #18 |
| `fr-metasx` + GX Transmission + `rw-dt275` | Freehub error, **no selection escapes** | Real bike ships exactly like this (XD body available) — **FALSE RED** | #7 |
| `fr-megatower` + `sh-floatx-60` | Hard error, red dot | Shorter-stroke same-eye shock bolts in; manufacturer-supported — **FALSE RED** | #8 |
| `fr-megatower` + `dp-pnw` | Hard error | Works with a $15 shim any shop would fit — **FALSE RED-adjacent** | #9 |
| `fw-dt` + `ro-hs2-200` | Hard error | Everyday combo with Shimano SM-RTAD05 adapter (one-piece rotors) | #10 |
| `buildTotals` with `gs-gx-m` bundle active | 1670 g | Same five parts weigh 1727 g — impossible number, shown under a ✓ Verified badge | #11, #12 |
| `{frame: fr-spindrift (180), fork: fk-lyrik (160)}` | All empty | Under-forked geometry a shop would flag; some makers publish approved ranges | #14 |
| `fr-strive` + `sh-storia` (coil) | All empty | Per-frame coil approval is a real manufacturer constraint (e.g. Ibis: "not coil-compatible") | #21 |

---

## 5. Real-world correctness

### 5a. Rules that fire a FALSE ERROR on real, correct builds
- **#8** shorter-stroke shock (Major, above).
- **#9** smaller dropper + shim (Major, above).
- **#10** 6-bolt rotor on Center Lock hub — **Minor** · rule 9 lines 551–552. `checkBuild({frontWheel: fw-dt, frontRotor: ro-hs2-200})` errors identically to the impossible `{frontWheel: fw-reserve, frontRotor: ro-cl-203}`. Shimano SM-RTAD05/RTAD10 (~$20, official) mounts 6-bolt rotors on CL hubs (one-piece rotors; not the Hope floating/Trickstuff 2-piece); the reverse has no adapter. 13 of 17 catalog rotors are 6-bolt, so CL-hub wheelsets red an outsized slice of the catalog. Verification kept this at Minor: the specced parts genuinely don't bolt together bare, so it's misleading-by-precedent (rule 10 warns for its adapter case) rather than a strict false red. **Fix:** warning/info with adapter note for 6-bolt-on-CL; keep CL-on-6-bolt an unqualified error.
- **#17** OEM shock red with no frame picked — **Minor** · rule 17 line 588. `compatOf(sh-vivid-oem, {fork: fk-zeb})` → red "not sold separately", while rule 4 in the identical frameless situation gives a green dot + info. Becomes green the moment `fr-enduro` is added. **Fix:** mirror rule 4 — info when `!frame`, error only when a *different* frame is present.
- **#7** the mullet catalog trap (Major, above) — a catalog-completeness false red rather than an engine-logic one.

### 5b. Deliberate non-rules that verification confirmed CORRECT — do not "fix"
- **SuperBoost frame + Boost crank** (`fr-firebird` + `cr-gx` → no error): correct per the documented rejection; commonly ridden this way. Unpinned by any test though (#27): add `eq(chk({frame:'fr-firebird', crankset:'cr-gx'}).errors.length, 0)` with a comment linking the roadmap rejection, so a future session can't "helpfully" add the false error. `chainline` sits in the data as bait.
- **REFUTED finding — rule 5's one-sidedness is right.** An auditor claimed 52T-max Eagle derailleurs are incompatible with 10-50/11-50 cassettes (`dr-gx-m` + `ca-nx` passes clean). Verification found SRAM documents the **opposite**: 520% derailleurs are backward-compatible with 10-50 cassettes (and AXS works with both); the only documented incompatibility is old 50T-max derailleurs with the new 10-52 — which rule 5 already errors on (`dr-nx` + `ca-sram-e`). Adding the proposed check would have *created* a false red. Left here so it isn't re-proposed.

### 5c. Missing rules addable NOW (data exists or is one field away)
- **#1 actuation** and **#2 chainring standard** — the two Critical drivetrain holes; each needs one small enum field.
- **#5 shifter clamp integration** — the constraint is visible in the part's own model name today.
- **#18 frameless reverse-mullet** — `WHEEL_CONFIG` already encodes that front-275/rear-29 satisfies no config; check the pair globally when no frame is present. (Fires never for legit 29/275-in-progress mullets — verified silent.)
- **#4/#13 structured error identity** — engine-internal; no data needed.

### 5d. Missing rules blocked on per-part data (rule-18 dormant template candidates)
| Gap | Data needed | Finding |
|---|---|---|
| Minimum rotor size (Critical today on ZEB/Domain) | `fork.minRotorF` / `frame.minRotorR` from manufacturer pages | #3 |
| Under-forking | `frame.minForkTravel` (published as approved ranges) | #14 |
| Front tire vs fork crown clearance | `fork.maxTire` (Fox/RockShox publish per chassis) | #22 |
| Coil-shock approval | `frame.coilApproved` (manufacturer statements only — e.g. Ibis Ripmo V1 "not coil-compatible") | #21 |
| Dropper insertion depth | `dropper.insertLen` + `frame.maxInsert` + a frame-size concept (app has none) | #23 |
| Tire vs internal-rim-width minimum | sourced thresholds; correctly deferred today | #28 |
| Swappable freehub bodies | `freehubOptions` per wheel platform | #7 |

---

## 6. Data-model gaps (`schema.js`)

- **Missing fields blocking rules:** `actuation` (#1), crank `ringStd` (#2), `minRotorF`/`minRotorR` (#3), shifter `clampType` + brake lever integration (#5), `minForkTravel` (#14), `fork.maxTire` (#22), `coilApproved` (#21), `insertLen`/`maxInsert` + frame size (#23), `freehubOptions` (#7).
- **#20 — `crankBb` vocab can't represent 30 mm spindles** — **Minor** · `VOCAB.crankBb = ['DUB','SH24']`. `cr-eewings` (30 mm spindle, per Cane Creek) and `cr-e13` (proprietary 30 mm P3 Connect, per e*thirteen) are stored as `bb:'DUB'`, so rule 7 tells users they use "a SRAM DUB spindle" — directing them to a BB that physically cannot accept a 30 mm spindle (DUB is 28.99 mm). Compounding: `cr-e13`'s model is named "Plus DUB" — a nonexistent product. **Fix:** add `'30mm'` (and optionally a distinct P3 value — they're mutually incompatible BB families) to the vocab, re-tag both cranks, rename `cr-e13`'s model, extend `LABELS`.
- **#15 — single-valued vocabularies make rules 2-front/8/11 dead code** — **Minor**. All parts are PM/tapered/Boost110 and the validator would reject anything else, so no constructible build can fire the front-axle, brake-mount, or steerer checks (exhaustive cross-product: 0 firing pairs), and greps show zero test coverage for them. Synthetic probes show the dead code is currently *correct* — the risk is latent (a typo ships invisibly; the vocab will eventually widen: 1.8″ steerers, flat-mount creep). "18 rule areas" overstates live coverage by three. **Fix:** unit tests with synthetic raw objects (`checkBuild` accepts them — `{mount:'FM'}`, `{steerer:'straight'}`); document the single-valued vocabs as deliberate.
- **#16 — rules 14/18 untriggerable + stale "6 frames" count** — **Minor**. Widest catalog tire = 2.5″; smallest wheel/frame `maxTire` = 2.5; strict `>` — zero firable combos. Rule 18 was activated specifically to protect 2.5-clearance frames from real 2.6″ tires (Assegai/DHR II/Magic Mary 2.6 all exist) but no such tire is in the catalog. The rule-18 comment and CLAUDE.md say "6 frames"; 10 frames carry `maxTire`. **Fix:** add real 2.6″ tires (verifiable per the existing protocol), correct both counts, and add an invariant test asserting each active warning rule is triggerable by ≥1 real part combination.
- **#28 — display-only fields inventory** — **Nice-to-have**. Confirmed never read by any rule: `chainline` (deliberate), `range`, `pistons`, `ring`, bar `width`/`rise`, stem `length`, `drop`, `intWidth`. All 9 cassettes currently have `range` max == `maxCog`, but nothing enforces it. **Fix:** validator lint `range` max endpoint === `maxCog`; keep the intWidth rule deferred (2.3″ on a 31 mm rim is within normal guidance — verified not a false green).
- **#26 — no BB category** — **Nice-to-have** · rule 7 fires the identical info on all 252 crank×frame pairs and every "complete" build's totals omit a required ~$40–120/~70–100 g part. Correct-by-luck today: every DUB/SH24 × BSA73/PF92/T47 pair is servable with a real BB. **Fix:** either a `bb` category+slot with two-sided match rules, or keep info-only but name the exact standard pair and add a validator guard that every crankBb×frameBb combo stays servable as vocabs grow.

---

## 7. Verdict honesty

- **#6 (the big one):** [index.html:159](index.html:159) "Fits your current build" and [index.html:192](index.html:192) "green fits, red won't" — the dot actually means "adds no new *error*"; warnings are invisible to it. Factual overclaim the moment any warning-class rule is in play.
- **"⚠ Works · N to check"** ([index.html:478](index.html:478), also the share-text variants at :504/:564/:581): "Works" is asserted for warning states that include manufacturer *hard limits* (220 rotor on a 203-max fork). "Check" framing is right; "Works" is not. Suggest "⚠ N thing(s) to check".
- **`compatOf` reason "No conflicts with your current build"** — affirmative wording on the same errors-only diff; inherits every dot problem above.
- **#11 — preset ✓ Verified badge** — **Minor** · `partVerified` returns true for `gs-gx-m` because all 5 fills are verified, but the bundle's own billed price/weight (545/1670 g) carry no provenance and the weight is *provably impossible* (verified parts sum to 1727 g). The validator's "refuses verified:true without a source" gate never applies because the preset never sets `verified:true` itself. The badge tooltip is carefully worded but the "✓ Verified only" filter (title: "verified against a manufacturer spec") surfaces it and the card shows the sample numbers beside the badge. **Fix:** derive preset weight from fills (kills the second unverified number), keep bundle *price* as its own field (discounts are real), and reword the badge ("✓ Parts verified · bundle price estimated").
- **#12 — impossible bundle weights** — **Minor** · `gs-gx-t` 1725 vs 1955 g of its own fills (−230 g), `gs-gx-m` −57 g, `gs-xt` −89 g; the other 12 presets have delta 0, showing the intended invariant. Toggling a preset changes the build's mass with zero physical change. **Fix:** set the three weights to their fill sums; validator invariant `preset.weight === sum(fills.weight)`.
- **#24 — doc drift** — **Minor** · CLAUDE.md line 54 expects "326 parts … 38 verified" and narrates "38 verified so far"; README says "**7 verified so far**"; actual: 327/46 (tests do match the documented 91). Both docs *under*state — no overclaim — but a fresh session following CLAUDE.md will suspect a regression. **Fix:** update or de-hardcode the counts.
- **#19 — "(mechanical)" label on wireless parts** — **Minor** · `LABELS['sram-eagle'] = 'SRAM Eagle (mechanical)'`, so `specSummary(sft-gx-axs)` → "SRAM Eagle (mechanical) . 12s" and every rule-3 error involving AXS Eagle parts calls them mechanical. **Fix:** rename to "SRAM Eagle 12-speed"; surface actuation per part once the #1 field exists.
- **What's honest and should stay:** the main all-clear "✓ No conflicts found" is correctly scoped (per CLAUDE.md's own guidance not to overclaim) — the problem is the *dot layer and legend around it*, not this string.

## 8. Remaining findings

- **#13 — `conflictReason` string-dedup masking** — **Minor** · lines 617–624 + rule 1's part-agnostic message. Build `{frame: fr-metasx, rearWheel: rw-dt}`: `compatOf(ti-dhr-29, build)` → green because the tire's "Unsupported wheel setup…" error is byte-identical to the wheel's pre-existing one. All 21 × 29″ tires dot green for the rear of a mullet-only build. Mitigated (the build-level error stays visible), same root cause as #4. **Fix:** structured error identity (rule + slots) or name the contributing parts in rule 1's message. Caveat from verification: tires green if *either* slot fits, so full slot-awareness may also be needed.
- **#14 — no under-forking check** — **Minor** · `checkBuild({frame: fr-spindrift (travel 180, max 190), fork: fk-lyrik (160)})` → total silence, while the symmetric over-fork warns. ~1° head-angle steepening per 20 mm; some makers publish approved ranges (Propain ships the Spindrift at 180). **Fix:** optional `frame.minForkTravel`, dormant per rule-18 template; prefer sourced data over a heuristic (a `frame.travel`-based guess would false-fire on `fr-dreadnought`, travel 154, commonly forked at 170).
- **#21 — no coil-approval check** — **Minor** · `fr-strive` + `sh-storia` silent; all 9 coil shocks silent on all 21 frames. `shock.spring` is schema-validated but read by no rule. Manufacturer-published constraint (fetched: Ibis Ripmo V1 FAQ — "leverage ratio … not coil-compatible"). **Fix:** optional `frame.coilApproved`, warning when `false` + coil; manufacturer statements only, never leverage-curve guesses.
- **#22 — no front-tire vs fork clearance** — **Minor** · `checkBuild({fork: fk-36, frontTire: ti-assegai-29})` has no fork dimension to check. Fox/RockShox publish max tire per chassis (tech.ridefox.com spec drawings). No live false green at 2.5″, but #16's fix (adding 2.6″ tires) opens this gap — coordinate. **Fix:** optional `fork.maxTire`, dormant warning mirroring rule 18.
- **#23 — no dropper insertion check** — **Minor** · `fr-slash` + `dp-oneup` (210 drop) and `fr-hd6` + `dp-oneup-349` pass green on every frame. Fit is decided by post total length vs per-size usable insertion — both published (OneUp ships a calculator) — but the app has no frame-size concept at all. **Fix:** near-term info on drop ≥ 200 ("verify insertion depth for your frame size"); long-term `insertLen`/`maxInsert` after deciding how to model frame size.
- **#25 — `bundleActive` doesn't check preset↔group** — **Minor (upgraded from Nice-to-have in verification)** · `buildTotals(drivetrain-parts+wheels, {wheels:'gs-gx-m'})` → bills the *wheels* group as the $545 groupset, double-counts the drivetrain, never counts the actual wheels (1145/3397 vs true 1350/3877), no error. Verification found this is **reachable today**: `readHash` (index.html:604–612) restores `presetBy` from the share-link hash and never checks the preset's category, so a crafted/corrupted link corrupts the headline totals silently. **Fix:** `bundleActive` returns false unless `byId(pid).cat === group.preset.cat`; harden `readHash` the same way; negative test in test-pricing.
- **#18 — frameless reverse-mullet** — **Minor** · `{fork: fk-zeb-275, rearWheel: rw-dt}` and tires-only variants silent; `compatOf(rw-dt, {fork: fk-zeb-275})` green. Every real path adds a frame (which errors), hence Minor. **Fix:** when both sizes known and no frame, error if the pair matches no `WHEEL_CONFIG` entry.
- **#17 — OEM-shock frameless red** (detail in §5a).
- **#27 — SuperBoost/Boost-crank regression pin** and **#28 — display-field inventory** (details in §5b/§6). 

---

## Appendix: verification notes worth keeping

- `fk-domain.maxRotorF` is 200 in the catalog; SRAM's page lists 220 max (and 200 **min**) — sample-data error producing a false warning channel (surfaced during #3).
- `cr-e13` is named "Plus DUB"; no such product exists (e*thirteen Plus cranks are 30 mm P3) — surfaced during #20.
- The rule-17 `frameOnly:false` + different-shock warning branch and the oemOnly bidirectional validator checks all behave as documented; the `frameOnly:true`+`bundledShock` info branch is unreachable with current catalog data (only `fr-enduro` bundles a shock) but works when probed synthetically.
- Crash-safety: `checkBuild(undefined)`, `checkBuild({})`, and every single-slot build return cleanly; no rule throws on missing optional fields (`maxTire` guards with `typeof === 'number'`).
- Audit machinery: 6 independent auditors → 54 raw findings → merged to 29 → each adversarially verified by a separate agent that re-executed the example build and checked manufacturer facts (fetched pages, per the project's own evidence bar). One finding refuted (§5b); two severities corrected downward (#10 Major→Minor, #11 Major→Minor), one upward (#25 Nice-to-have→Minor).
