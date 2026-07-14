# BMX-MODEL.md — BMX data model (OFF-LIVE research + design doc)

**Status: OFF-LIVE.** This document and its companion `data/bmx.js` are a research spike for a
future BMX product line. Nothing here is wired into the live MTB app (`index.html`,
`src/compat.js`, `src/schema.js`). Do not load `bmx.js` from `index.html` until Douglas
explicitly says go. No e-bikes/motors/batteries appear anywhere below — BMX is unpowered.

Date: 2026-07-11.

> **2026-07-13 update — architecture DECIDED + implemented.** Douglas signed off Option
> (b) of `data/DJ-BMX-COMPAT-ANALYSIS.md`: BMX has its own engine, **`src/compat-bmx.js`**
> (`checkBmxBuild` + `BMX_VOCAB`/`BMX_GROUPS`/`BMX_SLOTS`/`bmxSlotRequired` + the
> display-only `bmxGearInfo`/`bmxBuildTotals`), still off-live. The slot/vocab sketches
> in this doc and the ones that lived in `bmx.js` are superseded by that module (single
> source of truth); `bmx.js` is now data-only (`BMX_PARTS`), with the `'oversized'` clamp
> token normalized to `'25.4mm'`. Brakeless is a confirmed valid COMPLETE build; the
> engine never requires a brake. See the analysis doc's §6 for the implementation record
> + dormant-rule inventory, and `test/test-bmx-engine.js` / `test/test-bmx-golden.js`.

---

## 1. Domain overview

BMX splits into two practical sub-disciplines that share most hardware but diverge on frame
geometry and a few parts:

- **Race** — 20" (or 24" cruiser) bikes sized by **top-tube length**, sized to the rider via
  named classes (not by rider inseam/seat-tube the way MTB frames are). Threaded (Euro) bottom
  brackets are common on race frames; V-brake/caliper front brakes; narrow race-slick tires;
  cassette-only rear hubs (freecoasters make no sense mid-sprint).
- **Freestyle** (park / street / trail / flatland) — 20" wheels almost universally now (24"
  "cruiser" freestyle exists but is a minority), top tube ~20–21.5", Mid or Spanish press-fit
  BBs, U-brake or brakeless, wider tires (2.2–2.4"), and the freecoaster-vs-cassette rear hub
  choice that doesn't exist in race.

Both share: 20" (or 24") wheel size as the frame's defining wheel-size fact, chromoly
construction almost across the board, 1-1/8" integrated headsets (BMX standardized on this
years ago — unlike MTB there is no live headset-standard fragmentation to model), and BB/crank
spindle interfaces that are a genuine "does this bolt together" question (this is where BMX's
compat engine earns its keep, same as MTB's BB/crank rule).

Sources consulted (fetched or searched, all reputable/manufacturer or established BMX retail
tech pages — see per-row `source` in `bmx.js` for the rows actually confirmed against an
official brand page):

- [Guide for Bottom Bracket and Spindle Sizes — BMXmuseum.com Forums](https://bmxmuseum.com/forums/viewtopic.php?id=624522)
- [Types of BMX Bottom Brackets and How to Choose — RMD Blog](https://www.rmdbike.com/bmx-bottom-brackets-types-sizing-and-pro-tips-blog)
- [4 Most Common BMX Bike Bottom Bracket Types — The BMX Dude](https://thebmxdude.com/bmx-bottom-bracket-types/)
- [BMX Frame Sizing Chart — Supercross BMX](https://www.supercrossbmx.com/blogs/news/bmx-frame-sizing-chart)
- [BMX Top Tube Length Guide — The BMX Dude](https://thebmxdude.com/bmx-top-tube-length/)
- [BMX Hub Types Explained — The BMX Dude](https://thebmxdude.com/bmx-hub-types/)
- [A Thorn in your Sidewall: compendium of BMX hub types and gear ratios](https://sidewallthorn.blogspot.com/2009/08/one-of-most-common-questions-about-bmx.html)
- [What BMX Peg Size Do You Need? — The BMX Dude](https://thebmxdude.com/bmx-peg-size/)
- [Are BMX Pegs Universal or Not? — The BMX Dude](https://thebmxdude.com/are-bmx-pegs-universal/)
- [The ULTIMATE BMX Brake Mount guide — Alans BMX](https://alansbmx.com/blogs/news/the-ultimate-bmx-brake-mount-guide)
- [BMX Brake Types & FAQ — Dan's Comp](https://www.danscomp.com/bmx-brake-types-faq/cp1460)
- [Detangler — Wikipedia](https://en.wikipedia.org/wiki/Detangler)
- [BMX Freestyle Detangler Adjustment — Park Tool](https://www.parktool.com/en-us/blog/repair-help/bmx-freestyle-detangler-adjustment)
- Official manufacturer product pages fetched directly: `kinkbmx.com` (Williams frame),
  `wethepeoplebmx.de` (Justice bike), `profileracing.com` (Profile Cranks category) — see §5 and
  the per-row `source` fields in `bmx.js`.

---

## 2. Wheel size & race sizing

- **Wheel size**: `'20'` (standard, both race and freestyle) or `'24'` (cruiser class — race
  cruiser, and a minority of freestyle "cruiser" frames). This is a REAL compat fact: tires,
  rims, and forks/frames all key off it, same role as MTB's `wheelConfigs`.
- **Race size classes** (top-tube-length-driven, not seat-tube): Micro, Mini, Junior, Expert,
  Expert XL, Pro, Pro XL, Pro XXL. Approximate top-tube lengths seen across brands/USA BMX
  guidance: Junior ≈ 18.3", Expert ≈ 18.9", Expert XL ≈ 20", Pro ≈ 20.75", Pro XL ≈ 21",
  Pro XXL ≈ 21.75"+. These are **display/fit-guidance only** — nothing in the compat engine
  needs to know a rider's size class; the frame simply carries its `topTube` (inches) and the
  size-class label is a derived/annotation field for shoppers, exactly like MTB's `disciplines`
  tag (never feeds `checkBuild`-equivalent logic).
- **Freestyle sizing** is not classed the same way — frames just publish a `topTube` (typically
  20–21.5") and riders pick by inseam/preference. Same field, same "display, not compat" role.

## 3. Bottom bracket standards — REAL compat check

Four shell standards, **not interchangeable** (a BB threads/pressed into exactly one shell type):

| Standard | Shell | Notes |
|---|---|---|
| `mid` | 41.275mm (1-5/8") press-fit | The modern default on freestyle frames since ~2000; sealed cartridge bearings press directly into the shell. |
| `spanish` | 37mm press-fit | Older/smaller press-fit standard; functionally like Mid but smaller bore. Not common on new frames but still sold. |
| `american` | 51mm press-fit (outboard bearing cups) | Common on older-school and some race frames; bearings sit outboard in cups. |
| `euro` | Threaded | Threaded shell, seen on race frames from the early '90s to present. |

The crank's **spindle** (axle) diameter — `19mm`, `22mm`, or `24mm` (rarer) — must fit inside the
BB's bearing bore. **This is the real cross-check**, structurally identical to the MTB
`crankset.bb` vs `bb.spindle` rule already in `compat.js`: `frame.bbShell` must equal
`bb.shell`, and `bb.spindleFit` must equal `cranks.spindle`. A BB shell type and a crank spindle
diameter are two independent axes — e.g. a Euro-shell threaded BB can still come drilled for a
19mm or 22mm spindle, so both facts must be modeled and both must match for a real "fits" verdict.

## 4. Cranks — REAL compat check

- **Piece count**: 3-piece (separate spindle + two arms, the modern default), 2-piece (arm+spindle
  one side, splined into the other arm), legacy 1-piece/Ashtabula (one steel forging, arms+spindle
  as a single part, needs its own oversized BB shell — effectively its own ecosystem and out of
  scope for the starter dataset; flagged as an open question below).
- **Spindle diameter**: 19mm (classic, still the racer's choice for weight), 22mm (increasingly
  the freestyle default for durability — "GDH"-style hollow axles), 24mm (rarer, some
  proprietary crank families). Feeds the BB cross-check in §3.
- **Chainring interface**: splined direct-mount (spider integrated to the crank arm, sprocket
  bolts to a spline/bolt pattern) is now the freestyle default; some cranks still take a
  press-on sprocket. Modeled as `cranks.ringMount` (`'spline'`/`'press-on'`) vs
  `sprocket.mount` — REAL check (a splined sprocket won't press onto a press-on crank spider
  and vice versa).

## 5. Rear hub / wheel — REAL compat checks

- **Driver type**: `cassette` (ratchet/pawl driver, freewheels like every other bike — pedal
  forward to drive, coast freely) vs `freecoaster` (rear wheel can spin backward without the
  cranks turning — enables fakie/whiplash tricks; popular in flatland/street/park, absent from
  race). This is a real, load-bearing axis: a **cassette cog** only fits a cassette driver's
  spline, and a **freecoaster's own cog** is specific to that freecoaster body — they are not
  interchangeable. Modeled as `rearHub.driverType` + `rearCog.fitsDriver` (same enum) —
  REAL cross-check.
- **Driver tooth count**: 8/9/10/13T (9T is today's de facto standard; smaller drivers use
  smaller sealed bearings, a durability/display tradeoff, not a fit blocker). Feeds the gearing
  ratio display (§6) together with the sprocket tooth count — DISPLAY-ONLY (no build "won't
  fit" from a tooth-count mismatch; a 25T sprocket over a 9T driver and a 28T sprocket over a
  10T driver both just produce a different ratio, not an incompatibility).
- **RHD / LHD** (right-hand-drive vs left-hand-drive — which side the chain/driver sits):
  rider preference, not a fit blocker as long as the sprocket-side crank arm is the matching
  side. Modeled as `rearHub.side` (`'RHD'`/`'LHD'`/`'both'`) — flagged as an open question below
  (whether to make this a real cross-check against crank drive-side or leave it display-only;
  most modern cranks are handed the same regardless, so leaning display-only).
- **Axle diameter**: 14mm rear axle is the universal modern BMX standard (front is 10mm /
  3/8"). This feeds the peg-fit check (§8) — REAL.

## 6. Gearing — DISPLAY-ONLY (with one real chain-width note)

Sprocket (chainring) tooth count ÷ rear cog/driver tooth count gives the gear ratio (e.g. 25/9,
28/9, 25/10 — all common). This is purely an informational number for the shopper (bigger ratio
= more top speed, less acceleration) — **nothing about a ratio makes a build "not fit"**, so it's
modeled as a derived display field, not a compat rule. The one genuinely mechanical point:
**chain width** must match the sprocket/cog tooth profile — 1/8" chain (freestyle standard,
thicker/stronger) vs 3/32" chain (narrower, lighter, needs 3/32"-cut sprockets/cogs, sometimes
paired with half-link chains for singlespeed chainline tuning). Modeled as `chain.pitch` vs
`sprocket.pitch`/`rearCog.pitch` — flagged as a candidate REAL check (a 3/32 chain will not
sit right on a 1/8-cut sprocket) but, mirroring the MTB catalog's own conservative posture
("a missing rule beats a wrong one"), it ships **dormant** in the starter dataset — every
starter sprocket/cog/chain row is tagged `1/8` (the near-universal freestyle case), so the axis
exists in the schema but doesn't yet drive a real fork-in-the-road verdict. Race-oriented 3/32
rows are a good follow-up once sourced.

## 7. Headset — mostly universal (light REAL check)

Modern BMX has standardized on the **1-1/8" integrated** headset almost across the board (unlike
MTB's fragmented head-tube standards) — so headset compat in BMX is a much smaller surface than
in the MTB catalog. The real check that remains: **fork steerer diameter** must match the
headset/frame head-tube bore, same shape as the MTB rule but with far less vocabulary (BMX
headsets today are essentially always `'integrated-1-1/8'`; older 1" threaded head tubes exist
on vintage frames and are out of scope for this starter set). Modeled as `frame.headTube` /
`fork.steerer` / `headset.fit` all sharing one vocab value.

## 8. Pegs — REAL compat check

Pegs slide onto the wheel axle and are secured by the axle nut; the peg's bore must match the
**axle diameter** it's sliding onto: **10mm / 3/8"** (front axle) or **14mm** (rear axle).
Buying a 10mm peg for a 14mm axle physically cannot install; a 14mm peg on a 10mm axle is loose
and unsafe. Some pegs ship with a 14mm→10mm reducer sleeve (`peg.reducerIncluded` bool),
which is the one place a peg becomes dual-fit. Modeled as `peg.axleFit` (`'10mm'`/`'14mm'`) vs
the wheel's `axle` field on whichever wheel (front/rear) it's mounted to — REAL check, same
shape as the MTB rotor/hub interface rule. Material (`steel`/`alloy`) is DISPLAY-ONLY
(durability/weight tradeoff, not a fit fact).

## 9. Gyro / detangler (freestyle only) — REAL compat check

A gyro (aka detangler/rotor) lets the bars spin a full 360° without twisting the rear brake
cable — it's a three-plate mechanism: a lower plate fixed to the frame/fork crown area, an upper
plate that spins with the stem, and a middle plate that routes the "dual cable" (a cable running
from the gyro up through a **second, upper cable run** to the brake lever, replacing a single
plain brake cable). Real compat facts:
- **Requires a rear (or front) brake actually mounted** — a fully brakeless build has no cable
  to detangle, so a gyro is meaningless without a picked brake. Mirrors the MTB catalog's
  "OEM shock with no frame = info" convention: pick a gyro with no brake picked → an info, not
  an error.
- **Steerer/headset fit**: gyros are sold for a steerer diameter (near-universally 1-1/8"
  threadless on modern freestyle frames; oversized 1.5" tapered kits exist for BMX cruisers with
  tapered head tubes). Modeled as `gyro.steererFit` vs `fork.steerer` — REAL check, same shape
  as §7.
- **Dual-cable routing**: needs the frame/fork to have brake-cable guides positioned for a gyro
  run (virtually all modern U-brake-mount freestyle frames do; some minimalist street/flatland
  frames omit rear brake mounts entirely, which is the brakeless case above). Modeled as
  `frame.brakeMount !== 'none'` being a precondition, folded into the same rule as above rather
  than a separate boolean.

## 10. Brakes — REAL compat check

Three real mount types, not interchangeable, plus the brakeless option:
- **U-brake** ("990", after the original Dia-Compe model) — the freestyle standard; posts are
  9mm and take an M6 bolt; pad arms cross above the tire.
- **V-brake / cantilever** — 8mm posts, M6 bolts; the race-bike default (and some old-school
  freestyle frames use V-brake bosses instead of U-brake — the two are not interchangeable
  despite both sharing the M6 bolt).
- **Caliper** — single central bolt through a hole in the fork/seatstay bridge; cheapest/lowest-
  profile, seen on some entry-level or "brakeless-look" freestyle frames and forks.
- **Brakeless** — many modern street/park frames and forks ship with zero brake bosses at all
  (an intentional design choice for cleaner grinds); picking a brake with a brakeless
  frame/fork is a real "won't mount" error, same shape as the MTB brake-mount rule.

Modeled as `frame.rearBrakeMount` / `fork.brakeMount` (`'u-brake'`/`'v-brake'`/`'caliper'`/
`'none'`) vs `brake.mount` — REAL cross-check.

## 11. Tires — REAL compat check (clearance) + display (casing)

- **Width**: 1.75"–2.4" depending on use; 20x1-1/8" (or 1-3/8") narrow slicks for race, 2.2–2.4"
  wider knobby/park tread for freestyle. Wheel size (`20`/`24`) must match frame/fork — REAL.
  Tire width vs frame/fork max clearance mirrors the MTB rule 14/18 pattern — REAL, but (like
  the MTB catalog) only live where a frame/fork actually publishes a max clearance; a missing
  spec leaves the rule dormant rather than guessing.
- **Casing/tread** (race-slick vs park/street tread) is DISPLAY-ONLY, same role as the MTB
  tire's `casing`/`compound` fields.

## 12. Chain — see §6 (display-oriented, with a dormant real chain-pitch axis)

## 13. Seat / seatpost — REAL compat check (flagged as open question on scope)

Two real axes worth modeling (not yet populated with starter rows — flagged for a follow-up
pass, see §15):
- **Seatpost diameter** (BMX commonly runs 25.4mm / 27.2mm / 28.6mm / 30.9mm depending on
  brand/frame) must match the frame's seat tube bore — REAL, same shape as the MTB
  dropper-diameter rule.
- **Pivotal vs standard clamp**: "Pivotal" is a one-bolt seat+post system (the seat has an
  integrated cinch bracket that clamps directly to a Pivotal-spec post — no separate seat
  rails/clamp); a standard (railed) seat needs a standard clamp-style post. The two systems are
  not cross-compatible — REAL check, structurally like the MTB dropper/seat-tube rule.

## 14. Category field schema (proposed)

Every part: `id, cat, brand, model, price` (USD, sample unless sourced) and usually `weight`
(grams). Shared optional identity fields mirroring the MTB catalog's conventions: `family`,
`modelYear`, `mfgPn`, `discipline` (`'race'`/`'freestyle'`/`'universal'` — annotation only,
never feeds compat), `wheelSize` (`'20'`/`'24'`) where relevant. Provenance fields
(`verified`, `lastChecked`, `source`, `sourceType`) follow the same contract as the MTB catalog:
`verified:true` only with a real fetched source URL + non-future date.

- **frame**: `wheelSize` (`20`/`24`), `bbShell` (`mid`/`spanish`/`american`/`euro`), `headTube`
  (`integrated-1-1/8`), `topTube` (inches), `rearBrakeMount` (`u-brake`/`v-brake`/`caliper`/
  `none`), `rearAxle` (`14mm`, effectively fixed but modeled for completeness), `frameOnly`
  (bool), `discipline`, optional `maxTire` (inches, sourced-only), optional `seatpostDia`.
- **fork**: `wheelSize`, `steerer` (`1-1/8-threadless` etc.), `axle` (`10mm`), `brakeMount`
  (same vocab as frame), optional `maxTire`.
- **headset**: `fit` (matches `frame.headTube`/`fork.steerer` vocab).
- **gyro**: `steererFit`, `cableRouting` (`dual`/`upper-only`).
- **cranks**: `spindle` (`19mm`/`22mm`/`24mm`), `pieces` (`3-piece`/`2-piece`), `ringMount`
  (`spline`/`press-on`), optional `length` (mm, display).
- **bb**: `shell` (matches `frame.bbShell`), `spindleFit` (matches `cranks.spindle`).
- **sprocket**: `teeth`, `mount` (`spline`/`press-on`), `pitch` (`1/8`/`3/32`).
- **rearHub** / **rearWheel**: `driverType` (`cassette`/`freecoaster`), `driverTeeth`, `side`
  (`RHD`/`LHD`/`both`), `axle` (`14mm`).
- **rearCog**: `teeth`, `fitsDriver` (`cassette`/`freecoaster`), `pitch`.
- **frontWheel**: `axle` (`10mm`), `wheelSize`.
- **tires** (front/rear, same `cat:'tire'`): `wheelSize`, `width` (inches), `casing`
  (`race-slick`/`park`), optional `maxPsi`.
- **chain**: `pitch` (`1/8`/`3/32`), `halfLink` (bool).
- **pegs**: `axleFit` (`10mm`/`14mm`), `material` (`steel`/`alloy`), `reducerIncluded` (bool).
- **brakes** (front/rear): `mount` (`u-brake`/`v-brake`/`caliper`).
- **handlebar**: `clamp` (`25.4mm`/`oversized`), `rise`, `width`.
- **stem**: `clamp` (matches bar).
- **seat**: `system` (`pivotal`/`standard`).
- **seatpost**: `diameter`, `system` (`pivotal`/`standard`).
- **grips**: `length`, `flangeless` (bool, display).
- **pedals**: `platform` (`plastic`/`alloy`), `spindle` (`9/16`, universal, display only).

### Slot list (proposed)

`frame, fork, headset, gyro(optional), cranks, bb, sprocket, chain, frontWheel, rearWheel,
frontTire, rearTire, pegsFront(optional), pegsRear(optional), frontBrake(optional),
rearBrake(optional), handlebar, stem, seat, seatpost, grips, pedals`

(`gyro`, `pegsFront`, `pegsRear`, `frontBrake`, `rearBrake` are all optional — brakeless and
peg-less builds are both completely normal and must not be flagged incomplete.)

## 15. Open product-design questions for Douglas

1. **Race vs freestyle as a filter, not two catalogs?** Recommend one BMX catalog with a
   `discipline` tag (mirrors MTB's `disciplines` array) rather than two separate datasets —
   most hardware (cranks, BB, chain, pegs) is shared; only frame/fork/tires/brake-mount and the
   freecoaster-vs-cassette hub choice really diverge.
   
2. **Brakeless builds**: should a fully brakeless build (no front or rear brake picked, common
   and intentional in street/park) show a "No conflicts found" green state exactly like the
   MTB app's all-clear, or should it show a distinct informational note ("this build has no
   brakes — verify local laws/park rules")? MTB has no equivalent "intentionally missing safety
   part" case.

3. **Pegs as 1, 2, or 4 slots?** Real BMX setups run 0/1/2/4 pegs in any combination (e.g. one
   rear peg only). Proposed above as `pegsFront`/`pegsRear` optional single slots (front pair /
   rear pair, matching how MTB treats tires as front/rear not "4 tire slots"), but riders
   commonly mix brands/models left-right — flag if per-side granularity is wanted later.

4. **Gyro as its own optional slot vs a frame/fork "feature flag"?** Proposed as a real
   inventory-able part (own price/weight, sold separately) rather than a boolean, matching how
   the MTB catalog treats `bb`/`headset` as their own purchasable single-slot groups.

5. **1-piece (Ashtabula) cranks**: legacy standard, still ridden on some kids'/entry bikes and
   old-school builds. Excluded from the starter dataset (own BB ecosystem, not modeled) —
   worth a deliberate include/exclude call before a "kids' BMX" or old-school sub-catalog.

6. **RHD/LHD as a real cross-rule or display-only?** Leaning display-only (see §5) — flag if
   Douglas wants it treated as a hard constraint against a handed crank.

7. **24" cruiser scope**: included in the wheel-size vocab but the starter dataset is 20"-only.
   Cruiser race and cruiser freestyle are both real, smaller markets — worth a follow-up pass
   once the 20" catalog is fleshed out.

8. **Chain pitch (1/8 vs 3/32) as a real rule**: proposed dormant per §6 — activate once a
   sourced 3/32 sprocket/cog/chain trio is added, following the MTB catalog's "land dormant,
   activate per sourced part" template (rule 14c / rule 18 precedent).
