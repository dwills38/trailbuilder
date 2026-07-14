# DJ + BMX Compatibility Architecture Analysis

**Status:** design doc — **DECIDED + IMPLEMENTED 2026-07-13; DJ LIVE 2026-07-14.**
Douglas signed off the architecture on 2026-07-13 (§5 Q1–Q3 are DECIDED with his answers
verbatim; Q4–Q10 are implemented per this doc's leans as **PROVISIONAL** — he can veto
any of them). The implementation record, including the dormant-rule inventory and what
activates each rule, is **§6** below. **DJ went LIVE on Douglas's 2026-07-14 go-live
word:** the `data/dirt-jump.js` v0.2 rows were folded verbatim into `PARTS` in
`src/compat.js` (the file retired — the live catalog has one home and deploy ships only
`index.html` + `src/`), the `cog`/`seatpost` slots joined `GROUPS` (each its own group,
required only on a `driveMode:'single-speed'` frame), rule 13c now checks rigid-seatpost
diameter (the rule-13 twin), and the `dj` discipline chip joined the UI. **BMX stays
OFF-LIVE:** `src/compat-bmx.js` + `data/bmx.js` are loaded by nothing the site serves.

**Scope:** two new bike types — **dirt-jump hardtails** and **BMX** — for a
"PCPartPicker for bikes" fit-checker. Analyses the REAL mechanical compatibility
dimensions of each, maps them onto the existing 20-rule MTB engine (`src/compat.js`
`checkBuild`), and recommends the engine architecture.

**Grounding note:** every claim below is a real mechanical fact about how these parts
fit. Where a value or interchange is uncertain or standards-fuzzy, it is flagged
**[MECHANIC REVIEW]** — consistent with the project bar: *a false "won't fit" OR a false
"fits" is worse than a missing rule.* Rules land **dormant** and activate per sourced
manufacturer data.

**Engine recap (the contract we're extending):** `checkBuild(build)` takes a map of
slotKey → resolved Part object and returns `{errors, warnings, infos}` of structured
verdicts `{ruleId, slots, msg, fix?}`. Errors = won't fit; warnings = works but check;
infos = notes. Conflict identity is `verdictKey` (ruleId+slots+msg). `slotRequired()`
gates UI completeness (already discipline-aware: it drops the `shock` slot on
`suspension:'hardtail'` frames and the `dropper` slot on `dh` frames). `compatOf()`
gives the four-state pick dot (green/yellow/red/grey). Data is gated by `schema.js`
(`SCHEMA` per-category field rules + `VOCAB` allowed values).

---

## 0. TL;DR

- **DJ** is a single-speed hardtail MTB minus the shock and minus the geared drivetrain.
  ~80% of its real fit checks are existing MTB rules that already fire correctly
  (wheel size, axle match, steerer/headset, rotor interface + size, brake mount, tire
  clearance, BB shell vs crank spindle). The delta is: **suppress** the geared-drivetrain
  rules, and **add** two small single-speed rules (cog/chain width, chain-tensioning vs
  dropout type).
- **BMX** shares almost nothing structurally with MTB: 20"/24" wheels, no derailleur,
  BMX-specific BB shells + crank spindles + hubs, driver/cog + sprocket + single-speed
  chain, pegs, U-brake/gyro. Its genuine mechanical checks are a **different, small rule
  set** over a **different vocab**. Reusing MTB ruleIds would be dishonest.
- **Architecture recommendation (decisive): Option (b).** DJ folds into the existing MTB
  `checkBuild` behind a `bikeType`-aware suppression of the geared-drivetrain rules (it
  already has the `suspension:'hardtail'` discriminator and hardtail frames in-catalog).
  **BMX gets its own small `checkBmxBuild` engine + its own GROUPS/SLOTS/VOCAB.** Rationale
  and the future-split argument in §3.

---

## 1. Dirt Jump (DJ) — real compatibility dimensions

DJ bikes are **single-speed rigid-rear hardtails**: a hardtail frame, a short-travel
single-crown fork (typically **80–100 mm**, e.g. RockShox Pike DJ / Argyle, Marzocchi
DJ), one chainring + one rear cog, and usually a **single rear brake** (many DJ bikes run
no front brake by rider choice — that's a *rider* decision, not a fit constraint). They
use standard MTB interfaces almost everywhere: threaded/press-fit MTB BB shells, tapered
or straight 1-1/8" steerers, 6-bolt/Center-Lock disc hubs, Boost or non-Boost 100/110mm
front and 135QR/142x12/Boost148 rear axles depending on model.

**Consequence:** DJ is the *cheapest* new type to support because it is a hardtail MTB
with the gears removed. The existing engine already models hardtails.

### 1a. Existing MTB rules that apply AS-IS (reuse the ruleId unchanged)

| Dimension | Fields fed | Verdict | Reuse ruleId? |
|---|---|---|---|
| Front/rear wheel size consistency + vs frame `wheelConfigs` | `frame.wheelConfigs`, `fork.wheel`, wheel `wheel`, tire `wheel` | error | ✅ `wheel-config`, `front-wheel-size`, `rear-wheel-size` |
| Front axle: fork vs front wheel hub | `fork.axle`, `frontwheel.hub` | error | ✅ `front-axle` |
| Rear axle: frame vs rear wheel hub | `frame.rearAxle`, `rearwheel.hub` | error | ✅ `rear-axle` |
| Steerer vs frame headset acceptance | `fork.steerer`, `frame.headset` | error | ✅ rule 11 (`steerer`) |
| Headset S.H.I.S. bore vs frame head tube | `headset.upper/lower`, `frame.headTubeUpper/Lower` | error/info | ✅ rule 20a/20b/20c |
| Brake caliper mount vs frame/fork | `brake.mount`, `frame.brakeMount`, `fork.brakeMount` | error | ✅ rule 8 (`front-brake-mount`/`rear-brake-mount`) |
| Rotor interface vs hub (direction-aware) | `rotor.mount`, wheel `rotorMount` | error / adapter-warning | ✅ rule 9 |
| Rotor size vs fork/frame max (+ min where sourced) | `rotor.size`, `fork.maxRotorF`, `frame.maxRotorR` | warning/error | ✅ rule 10 / 10b |
| Tire width vs rim clearance / min-rim | `tire.width`, wheel `maxTire`/`minTire` | warning | ✅ rule 14 / 14c |
| Rear tire vs frame clearance | `rTire.width`, `frame.maxTire` | error | ✅ rule 18 (dormant until sourced) |
| Bar/stem clamp diameter | `handlebar.clamp`, `stem.clamp` | error | ✅ rule 15 |
| BB shell vs crank spindle (when BB slot filled) | `bb.shell`↔`frame.bb`, `bb.spindle`↔`crankset.bb` | error | ✅ rule 7 |

**Note on DJ wheel size:** DJ is overwhelmingly **26"** historically, with a growing
**27.5"** ("650b DJ") segment, and some 24" (junior/park). **26" is NOT in the MTB
`VOCAB.wheel` (`['29','275']`).** Adding `'26'` (and probably `'24'`) to the wheel vocab
is a required schema delta (see §4). This is purely additive — no MTB frame declares 26",
so it stays inert for MTB. **[MECHANIC REVIEW: confirm DJ wheel-size split — 26 vs 27.5
vs 24 as separate `wheel` values, and whether a "26/27.5 convertible" DJ frame needs a
`wheelConfigs`-style multi-value like mullet does.]**

### 1b. Rules that need ADAPTATION (suppress or narrow for single-speed)

DJ has **no derailleur, no multi-cog cassette, no shifter, no UDH-for-Transmission**. The
geared-drivetrain rule family must be **suppressed**, not fired-and-passed:

- **Rule 3 (one-system / one-speed), rule 3b (actuation), rule 3c (T-Type chainring vs
  Transmission chain):** N/A — there is no shifter/derailleur pair. Suppress.
- **Rule 4 (SRAM Transmission needs a UDH frame):** N/A — no Transmission mech. Suppress.
  DJ frames should **not** be required to declare `udh`.
- **Rule 5 (cassette range vs derailleur capacity):** N/A — no derailleur, single cog.
  Suppress.
- **Rule 6 / 6b (cassette freehub vs rear wheel / integrated cassette):** *Partially*
  relevant. A DJ single-speed cog still needs a **driver interface** on the rear hub, but
  it's a **single-speed spacer kit on a standard freehub** OR a **dedicated single-speed
  hub / screw-on/thread-on cog**. This is NOT the MTB cassette-freehub rule. See 1c.
- **`slotRequired` for DJ:** the `shifter`, `derailleur`, `cassette` slots should be
  **dropped from completeness** exactly as `shock` is dropped for hardtails today. The
  clean mechanism already exists in `slotRequired()`.

Rules that stay but with **different data ranges** (no code change, just catalog values):

- **Fork travel vs frame max (rule 12/12b/12c):** STILL APPLIES. DJ frames publish a
  `maxForkTravel` (often ~100–120 mm — over-forking a DJ hardtail wrecks the head angle
  and can void the frame). DJ forks are 80–100 mm. The existing rule fires correctly on
  `fork.travel` vs `frame.maxForkTravel`. Keep it. `minForkTravel`/`designForkTravel`
  stay dormant-until-sourced as today.
- **Dropper vs seat tube (rule 13):** DJ bikes almost never run a dropper (slammed
  seatposts, fixed), but the rule is harmless if the slot is simply usually empty. Make
  the `dropper` slot **optional / non-required** for DJ (again, `slotRequired` pattern).

### 1c. NEW rules DJ needs (single-speed specific)

Both are small, and both should land **dormant → activate per sourced data**, per the
project bar.

**NEW Rule DJ-1 — single-speed cog width vs chain width.**
Single-speed drivetrains run either a **1/8"** chain (traditional, track/BMX-derived,
tougher) or a **3/32"** chain (derailleur-width, used with narrow-wide single rings on
converted MTB drivetrains). The **front chainring**, **rear cog**, and **chain** must all
share a width class. A 1/8" cog with a 3/32" chain (or vice-versa) runs poorly / skips.
- Fields: a new `chainWidth` enum (`'1/8'` | `'3/32'`) on single-speed `cog`, `chainring`
  (or single-speed `crankset`), and `chain`.
- Verdict: **warning** (it physically turns but runs badly / wears fast) — **[MECHANIC
  REVIEW: is a 1/8 chain on a 3/32 cog a hard error or a warning? Consensus is "runs but
  not ideal"; I lean warning.]**
- Reuse ruleId? **No** — this is not the multi-speed one-system rule. New ruleId
  `ss-chain-width`.

**NEW Rule DJ-2 — rear cog mounting vs hub driver / dropout tensioning.**
Two coupled facts:
  1. **Cog mounting:** a single-speed cog mounts either (a) on a splined cassette driver
     via a **single-speed conversion spacer kit** (any XD/HG/MicroSpline freehub works —
     you're just spacing one cog), or (b) on a dedicated **thread-on single-speed hub**,
     or (c) is part of a **BMX-style driver** (rare on DJ). The catalog should model DJ
     single-speed as "standard freehub + SS spacer kit" for the common case, so **the
     freehub interface is a soft/permissive check, not a hard cassette-freehub error.**
  2. **Chain tensioning vs dropout type:** a single-speed has no derailleur to take up
     chain slack, so tension comes from one of: **horizontal/track dropouts** (slide the
     wheel), **sliding dropouts / eccentric BB**, or a **vertical dropout + chain
     tensioner** (or an even/magic-gear-ratio + **half-link chain**). A DJ frame with
     **vertical dropouts and no tensioner provision** run single-speed needs a tensioner.
- Fields: new `dropoutType` enum on DJ frame (`'horizontal'` | `'sliding'` | `'ecc-bb'` |
  `'vertical'`); a `tensioner` boolean/part or `halfLink` flag on the build.
- Verdict: **info/warning** — "vertical dropouts: add a chain tensioner or use a
  half-link chain to set single-speed tension." Not an error (it *can* be made to work).
- Reuse ruleId? **No** — new ruleId `ss-tension`.

**DJ frame BB / crank:** DJ uses **standard MTB BB shells** (BSA68/73 threaded, some
press-fit) and standard MTB crank spindles (DUB/24mm/30mm). Rule 7 (BB shell vs crank
spindle) applies AS-IS. No delta beyond possibly BSA68 already being in `frameBb` vocab
(it is — hardtails ship it).

---

## 2. BMX — real compatibility dimensions

BMX is **structurally alien** to MTB. It is a single-speed, 20" (or 24" "cruiser", 18"/16"
junior) bike with BMX-specific standards throughout: BMX BB shells, 3-piece cranks with a
fat spindle, a driver-or-freecoaster rear hub, a single front sprocket + rear cog/driver,
a **1/8" chain**, pegs, and (optionally) a U-brake with a gyro/detangler. **Almost none of
the MTB ruleIds apply.** BMX wants its own rule set and its own vocab.

### 2a. Genuine mechanical checks (real fit rules)

**BMX-1 — BB shell vs crank spindle + bearing set. [CORE]**
BMX frame BB **shells** (by inner diameter / bearing style):
  - **Mid** (~41 mm ID, press-in bearings) — the modern default.
  - **Spanish** (~37 mm ID, press-in) — older/some park frames.
  - **American** (~51 mm ID, loose/caged cups) — old-school, still on some frames.
  - **Euro** (threaded, ~68 mm, external-cup) — rare, some race/flatland.
BMX crank **spindles** are **19 mm** (most modern, Odyssey/Profile-derived), **22 mm**
(Profile/Primo big-spindle), or **24 mm** (Shimano-ish, some brands); older **48-spline
American** = 1" (~22.2). The **frame shell + spindle diameter together select the bearing
set** (a Mid shell with a 19 mm spindle needs Mid-19 bearings; Mid-22 needs different
bearings/spacers). So the real check is a **shell × spindle → bearing-kit** compatibility.
- Fields: `frame.bmxBb` (Mid/Spanish/American/Euro); `crank.spindle` (19/22/24 mm);
  optionally a `bb.bmx` part carrying `shell` + `spindle`.
- Verdict: **error** if shell can't physically take that spindle+bearing combo; **info**
  ("needs Mid-19 bearing set") when it fits but the bearing kit is spindle-specific.
- **[MECHANIC REVIEW: enumerate the real shell×spindle bearing-kit matrix; some combos
  (e.g. American shell + 19 mm spindle via adapter) exist and shouldn't false-error.]**

**BMX-2 — crank piece-count vs frame BB. [CORE]**
- **3-piece** (spindle + 2 arms; modern standard, uses one of the shells above),
  **2-piece** (one-arm-plus-spindle; rare, some cheap complete-bike cranks),
  **1-piece** (Ashtabula — spindle+arms one forging, needs a wide **American** shell only).
- Real rule: a **1-piece crank fits ONLY an American (Ashtabula) shell.** A 3-piece crank
  needs a Mid/Spanish/Euro shell + matching bearings. Putting a 1-piece into a Mid frame,
  or a 3-piece into an American-only 1-piece frame without a converter, is a real error.
- Fields: `crank.pieces` (1/2/3); combined with BMX-1's shell.
- Verdict: **error** (1-piece↔Mid is physically impossible without a converter cup).

**BMX-3 — rear driver/cog vs sprocket, chain width. [CORE]**
- Rear drive is either a **cassette hub** (a small driver, 9T–14T, ratchet in the hub) or
  a **freecoaster** (internal clutch that lets you roll backward without pedaling — a
  different hub entirely). Both take a **driver cog** (often 9T/10T for cassette,
  integral on some).
- The **front sprocket** (23T–28T typical, or 25T "bolt drive") + **rear driver cog** +
  **chain** must all be the same **chain width**: BMX is overwhelmingly **1/8"**, but some
  run **3/32"** (lighter race setups, "half-link" 1/8"). Mixing 1/8" sprocket with a 3/32"
  chain runs badly.
- Fields: `sprocket.chainWidth`, `driver.cog`/`cog.chainWidth`, `chain.chainWidth` (all
  `'1/8'`|`'3/32'`); hub `driveType` (`cassette`|`freecoaster`|`freewheel`).
- Verdict: **warning** (chain-width mismatch runs but not ideal). Driver/cog tooth count
  vs sprocket = **DISPLAY** (gear ratio), not a fit check — see 2b.
- **[MECHANIC REVIEW: is a freewheel (old thread-on) vs freehub-driver distinction worth
  modeling, or legacy enough to skip? Freecoaster vs cassette is NOT a fit conflict with
  the sprocket — it's a rider preference; only flag it as an info.]**

**BMX-4 — peg axle diameter vs hub axle. [CORE]**
- Pegs slide over the **axle** and must match its diameter: BMX axles are **3/8" (10 mm)
  bolt-on** (older/front, some rear) or **14 mm** (modern rear, many front). A 14 mm peg
  won't clamp a 10 mm axle and a 10 mm peg won't fit over a 14 mm axle (needs an adapter
  sleeve).
- Fields: `hub.axleDia` (10mm/14mm), `peg.axleDia` (10mm/14mm, or "universal w/ adapter").
- Verdict: **error** if peg bore < axle (won't go on); **warning/info** if peg > axle
  (needs the supplied adapter sleeve — many pegs ship both). Direction-aware, like the MTB
  rotor rule.
- **[MECHANIC REVIEW: confirm the 3/8" vs 10 mm nuance — 3/8" (9.525 mm) and 10 mm are
  used loosely/interchangeably in BMX marketing; treat as one token unless a real
  non-fit exists.]**

**BMX-5 — gyro/detangler requires rotor-tab frame+fork + dual-cable brake. [CORE]**
- A **gyro (detangler)** lets the bars spin 360° without tangling the rear brake cable. It
  requires: (a) a frame/fork with **rotor tabs / a headset with rotor provision** (the
  gyro sits at the head tube), and (b) a **dual-cable ("upper/lower") U-brake** setup, and
  (c) a **gyro-compatible / dual-cable lever** or a splitter. A gyro on a single-cable
  brake, or on a frame with no gyro tabs, doesn't work.
- Fields: `frame.gyroTabs` (bool), `brake.gyroReady`/`dualCable` (bool), a `gyro` part.
- Verdict: **error** if a gyro is in the build but the frame lacks tabs or the brake isn't
  dual-cable; **info** ("brakeless: no gyro needed") when there's no rear brake.
- **[MECHANIC REVIEW: modern brakeless street BMX is common; ensure the engine never
  *requires* a brake — brakeless is a valid complete build. Gyro is opt-in.]**

**BMX-6 — brake type vs frame/fork mounts. [CORE]**
- BMX brakes: **U-brake** (mounts on frame/fork **U-brake bosses / posts**, the standard),
  **990/V-brake** (older, different boss spacing), **caliper** (race/some freestyle), or
  **brakeless** (no brake). A U-brake needs U-brake bosses; a frame with **no bosses** is
  brakeless-only (or needs a mount adapter). Rear U-brake bosses can be **top-mount or
  under-chainstay ("under-mount").**
- Fields: `frame.brakeMountBmx` (u-brake-bosses / none / caliper), `fork.brakeMountBmx`,
  `brake.type` (u-brake / caliper / v-brake / none).
- Verdict: **error** if brake type ≠ available bosses; **info** for brakeless frames.
- This is the BMX analog of MTB rule 8 but with a **completely different mount vocab** —
  do NOT reuse `brakeMount` (`PM`/`FM` are disc standards; meaningless here).

**BMX-7 — wheel size vs frame/fork. [CORE, simple]**
- 20" is standard; 24" "cruiser", 18"/16" junior, 26" "trails/cruiser" niche. Frame + fork
  + wheels + tires must agree, and the frame/fork are built around a size.
- Fields: `wheel`/`wheelSize` = `20`|`24`|`18`|`16` (+ maybe 26 for BMX cruiser).
- Verdict: **error** on mismatch. Same *shape* as MTB `wheel-config` but a disjoint vocab
  (`20`/`24`/... not `29`/`275`). Reuse the *pattern*, not the ruleId.

**BMX-8 — tire width vs rim/frame clearance.**
- BMX tires are **20 x 1.75–2.4"** (freestyle wide, race narrow). Rim internal width and
  frame/fork clearance bound the tire. Same *shape* as MTB rule 14/18, different units
  (inches vs the MTB mm), so effectively a new rule over BMX vocab. **Warning.**

**BMX-9 — headset (mostly display).**
- Modern BMX is near-universally **integrated (Campy-style) 1-1/8" headset** in a
  45×45 head tube. Occasionally **mid** or older threaded. In practice almost always fits;
  model as an **info/display** unless a real integrated-vs-threaded mismatch is sourced.
  **[MECHANIC REVIEW: is threaded BMX (old-school flatland/race) common enough to warrant
  a real headset-type rule, or display-only?]**

### 2b. DISPLAY-ONLY (compute + show, never a fit verdict)

- **Gear ratio / gain ratio:** front sprocket ÷ rear driver cog (e.g. 25/9 ≈ 2.78,
  "rollout" in inches). This is a *tuning* number, not a fit check — every ratio
  "fits." Show it, like the MTB build's price/weight totals. **Never** feed `checkBmxBuild`.
- **Freecoaster vs cassette:** a rider *preference* (coaster = roll backwards). Not a
  conflict with any other part. Info at most.
- **Peg count / placement (2 vs 4):** rider preference, not a fit rule (beyond BMX-4 axle
  diameter).
- **Bar dimensions (rise/width/backsweep), grip choice, seat/post combo, tire tread:**
  fit-trivial; display only. (BMX seatpost + seat are often a 1-piece "pivotal" or
  "combo" — a *pivotal seat needs a pivotal post* is arguably a real small rule;
  **[MECHANIC REVIEW: model pivotal-vs-railed seat/post as a real rule or leave display?]**)

---

## 3. THE ARCHITECTURE DECISION — one adapted engine vs own engines

**Recommendation: Option (b) — DJ folds into the existing MTB `checkBuild`; BMX gets its
own `checkBmxBuild` with its own GROUPS/SLOTS/VOCAB.**

### Why (b) and not (a) one mega-engine or (c) three separate engines

**DJ ≈ MTB hardtail minus gears.** The overlap is overwhelming (§1a: 12 existing rules
apply verbatim). The engine already carries a `suspension:'hardtail'` discriminator, real
hardtail frames, and a `slotRequired()` that *already* drops slots per bike character
(shock for hardtails, dropper for DH). Folding DJ in means:
  - Add a frame-level discriminator (`bikeType:'dj'` or a `driveMode:'single-speed'`
    flag; see below) that `slotRequired()` consults to drop `shifter`/`derailleur`/
    `cassette` (mirrors the existing shock/dropper drops — a ~3-line change of the kind
    already proven).
  - Gate the geared-drivetrain rule family (rules 3/3b/3c, 4, 5) on the drivetrain slots
    being present — **they already no-op when those slots are empty** (`if(dt.length>1)`,
    `if(cassette && derailleur)` guards), so DJ single-speed builds mostly fall through
    cleanly *today*. The main work is adding the two DJ single-speed rules (DJ-1, DJ-2)
    and the `26`/`24` wheel values.
  - Every MTB rule DJ reuses stays **one implementation, one test** — no divergence risk.

Forcing DJ into its own engine (option c) would **duplicate** wheel-size, axle, steerer,
brake-mount, rotor, tire, bar/stem, and BB-vs-crank logic — 12 rules copied, 12 tests
copied, and guaranteed drift the first time one is fixed in only one place. That
contradicts the project's tidy/unbreakable creed and the "keep the UI + engine sharing
`compatOf`/`buildTotals`" convention.

**BMX is genuinely alien.** Its rules (BB shell×spindle×bearing, crank piece-count,
driver/sprocket/1-8" chain, pegs, gyro, U-brake bosses) share **zero** ruleIds with MTB
and operate over a **disjoint vocab** (Mid/Spanish/American shells; 19/22/24 mm spindles;
10/14 mm axles; 1/8"/3/32" chain; 20/24" wheels; U-brake bosses). Cramming BMX into the
MTB engine via a `bikeType` gate (option a) would mean the MTB `checkBuild` grows a large
branch of rules that never fire for any MTB or DJ build, its `SLOTS`/`GROUPS` sprout
BMX-only slots (pegs, gyro, sprocket) that are noise for every MTB user, and `VOCAB` mixes
disc-brake and U-brake mount tokens. That's a maintenance and correctness hazard: the more
a single function's rules are conditional on `bikeType`, the easier it is to leak a BMX
assumption into an MTB verdict (or vice-versa) — exactly the silent-false-verdict failure
the project fears most.

A **separate `checkBmxBuild`** (same structured-verdict shape `{ruleId, slots, msg, fix?}`,
same `{errors, warnings, infos}` return, its own small `BMX_GROUPS`/`BMX_SLOTS`/`BMX_VOCAB`
in `src/compat-bmx.js`) gives BMX a clean, independently-testable rule set while **reusing
the proven verdict infrastructure** (`Verdict`, `verdictKey`, the four-state `compatOf`
pattern, `buildTotals` for price/weight, and the `sanitizeShare`/serialization plumbing).
The shared *primitives* stay shared; only the *rules* fork.

### Maintenance / test implications

- **DJ:** extends existing test files (`test-engine.js` gains DJ single-speed cases;
  `test-golden.js` gains a couple of whole real DJ bikes that must validate clean). No new
  test harness. `schema.js` grows a `dj` frame variant + the SS fields; `validate.js`
  unchanged in shape.
- **BMX:** a **parallel** small suite (`test-bmx-engine.js`, `test-bmx-golden.js`) against
  `checkBmxBuild`, plus BMX rows in a **separate off-live dataset** (per CLAUDE.md hard
  rule 3: DJ/BMX are built OFF-LIVE, a separate dataset NOT wired into the live app).
  Because it's a separate function over separate data, it can be developed, tested, and
  even shipped as its own thing without any risk to the live MTB engine.
- **Shared code discipline:** factor the verdict primitives (`Verdict` class, `verdictKey`,
  the compat-dot state machine, `buildTotals`) so both engines import them rather than
  copy them. That is the one refactor worth doing up front.

### How this fits the "site may split per type (buildmybmx)" future

CLAUDE.md hard rule 3 explicitly anticipates splitting per type (e.g. `buildmybmx`).
Option (b) is the **cleanest on-ramp** to that split: BMX already lives in its own
engine + own dataset + own vocab + own tests, so lifting it into a standalone
`buildmybmx` site is a **file move**, not a disentangling project. DJ, being MTB-adjacent,
naturally stays on the main MTB site (it's a mountain-bike discipline). If DJ ever needs
its own destination, the `bikeType` discriminator already isolates its catalog rows.

**One caveat to flag:** the choice between a frame-level **`bikeType`** enum
(`mtb`/`dj`/...) vs a narrower **`driveMode:'single-speed'`** flag matters. `driveMode`
is more composable (a single-speed *trail* hardtail is a real thing) and keeps the engine
reasoning about the mechanical fact (no derailleur) rather than a marketing category. I
lean **`driveMode` for the drivetrain suppression + a light `bikeType` tag for
filtering/UI**, but flag it as an open product-design question (§5).

---

## 4. Vocab / schema deltas checklist (beyond MTB `VOCAB`)

### DJ (small — mostly additive to existing MTB vocab)
- [ ] `VOCAB.wheel`: add `'26'` and `'24'` (DJ + BMX-cruiser sizes). Additive; inert for
      existing MTB parts. Update `WHEEL_CONFIG` if DJ convertibles need multi-size configs.
- [ ] New `VOCAB.chainWidth`: `['1/8','3/32']` — on single-speed cog/chainring/chain.
- [ ] New `VOCAB.dropoutType`: `['horizontal','sliding','ecc-bb','vertical']` — DJ frame.
- [ ] New single-speed part categories/fields: a single-speed `cog` (tooth count +
      `chainWidth` + mount), a single-speed `chainring`/`crankset` (`chainWidth`), a
      `chain` that can carry `chainWidth`, an optional `tensioner`.
- [ ] Frame drivetrain discriminator: `driveMode:'single-speed'` (or `bikeType:'dj'`) so
      `slotRequired()` drops `shifter`/`derailleur`/`cassette`.
- [ ] DJ front axles: confirm existing `frontAxle` covers 100 mm QR / 15x100 / Boost110
      DJ forks — **[MECHANIC REVIEW: DJ forks include 20 mm through-axle and 9 mm QR
      variants; the MTB `frontAxle` vocab (`Boost110`/`20x110`/`20x110-nonboost`) may need
      `15x100`, `9mmQR`, `10mm-bolt`.]**
- [ ] DJ rear axles: confirm `rearAxle` covers **135 QR / 10 mm bolt-on** (common on DJ) —
      likely a new value beyond the MTB `Boost148`/`SuperBoost157`/`142x12`/`150x12`.

### BMX (large — a mostly-disjoint new vocab; put in `BMX_VOCAB`)
- [ ] `bmxBb` (frame shell): `['mid','spanish','american','euro']`.
- [ ] `bmxSpindle` (crank spindle): `['19mm','22mm','24mm','48-spline']`.
- [ ] `crankPieces`: `['1','2','3']`.
- [ ] `bmxAxle` (hub/peg axle dia): `['10mm','14mm']` (a.k.a. 3/8" ↔ 10 mm treated as one).
- [ ] `bmxDriveType`: `['cassette','freecoaster','freewheel']`.
- [ ] `chainWidth`: `['1/8','3/32']` (shared with DJ if the engines share primitives).
- [ ] `bmxWheel`: `['20','24','18','16','26']`.
- [ ] `bmxBrakeMount`: `['u-brake-bosses','990-v','caliper','none']` (frame/fork bosses).
- [ ] `bmxBrakeType`: `['u-brake','v-brake','caliper','none']`.
- [ ] `bmxHeadset`: `['integrated-45x45','mid','threaded']` (mostly display).
- [ ] `gyroTabs` (frame bool), `dualCable`/`gyroReady` (brake bool), a `gyro` part.
- [ ] Seat/post: `seatMount`: `['pivotal','railed','combo']` — for the pivotal-post rule
      IF adopted (§2b).
- [ ] New part categories: `sprocket`, `driver`/`cog`, `peg`, `gyro`, BMX `hub` (with
      `driveType`+`axleDia`), BMX `crank` (with `spindle`+`pieces`), BMX `bb`. New
      `BMX_GROUPS`/`BMX_SLOTS` (frame, fork, wheels, tires, cranks, BB, sprocket, driver,
      chain, pedals, bars, stem, grips, seat, post, brake, gyro, pegs).
- [ ] ID prefixes for the new categories (extend `ID_PREFIX` or a BMX-local map).

---

## 5. Product-design questions — DECIDED 2026-07-13 (Q1–Q3 by Douglas; Q4–Q10 provisional per lean)

1. **[HIGH] Engine split sign-off — ✅ DECIDED 2026-07-13.** Douglas, verbatim: *"go with
   your recommendation."* → Option (b) stands: DJ folds into the MTB `checkBuild`; BMX
   gets its own `checkBmxBuild` (now `src/compat-bmx.js`) + off-live dataset.
2. **[HIGH] `driveMode` vs `bikeType` discriminator — ✅ DECIDED 2026-07-13.** Douglas,
   verbatim: *"drivemode single speed flag."* → the schema carries the mechanical
   `driveMode:'single-speed'` flag (absence = geared); no marketing `bikeType` enum.
3. **[HIGH] Brakeless is a valid complete build — ✅ DECIDED 2026-07-13.** Douglas,
   verbatim: *"confirm."* → `slotRequired()` never requires a brake on a
   `driveMode:'single-speed'` frame, and `bmxSlotRequired()` never requires any brake
   slot; the BMX engine's `bmx-brakeless` info marks a bossless frame as by-design.
4. **[MED] DJ wheel-size scope — PROVISIONAL (implemented per §4's checklist).**
   `'26'` + `'24'` added to the wheel/wheelConfig vocab + `WHEEL_CONFIG` (single-size
   configs); the starter dataset stays 26-only, and no 26/27.5-convertible frame is
   modeled until one is sourced. Douglas can veto/extend.
5. **[MED] BMX driver/freecoaster depth — PROVISIONAL (lean implemented).** Cassette +
   freecoaster modeled; `'freewheel'` is a vocab token only (no rows, no rules) until
   sourced. Freecoaster vs cassette = the `bmx-freecoaster` INFO, never a conflict.
6. **[MED] Chain-width mismatch severity — PROVISIONAL (lean implemented).** WARNING in
   both engines (`ss-chain-width` in the MTB engine, `bmx-chain-pitch` in BMX): it turns
   but runs poorly. **[MECHANIC REVIEW]** may harden or soften.
7. **[MED] Pivotal seat/post rule — PROVISIONAL (modeled as a REAL rule).** The doc had
   no firm lean; implemented as the `bmx-seat-system` ERROR because the non-fit is
   definitional (a pivotal seat physically cannot clamp a railed post and vice versa).
   Flagged for Douglas/mechanic veto if either prefers display-only.
8. **[LOW] Peg axle nuance — PROVISIONAL (lean implemented).** 3/8" ≡ 10 mm as ONE
   token (`'10mm'`); no real non-fit between them is documented.
9. **[LOW] BMX headset — PROVISIONAL (lean implemented).** Display-only: NO headset
   rule fires; the `headTube`/`fit` tokens are data capture. A real
   integrated-vs-threaded rule joins only if a sourced mismatch case appears.
10. **[LOW] Gear-ratio display — PROVISIONAL (lean implemented).** `bmxGearInfo()`
    computes ratio + rollout for display, exported beside `bmxBuildTotals()`; it never
    feeds `checkBmxBuild` (tested).

**All mechanical claims flagged [MECHANIC REVIEW] must clear a human mechanic/domain-expert
pass before the corresponding rule activates** — same bar as the MTB engine: a false
"won't fit" or false "fits" is worse than a missing rule. Land rules dormant; activate per
sourced manufacturer/standards data.

---

## 6. Implementation record (2026-07-13, branch `bike-type/dj-bmx`)

Everything below landed with all four gates green: `node validate.js` 0 problems, the
full Vitest suite, `tsc --noEmit` clean, and `node tools/verdict-audit-harness.js`
output **byte-identical** to origin/main's baseline — the live engine's behavior is
untouched.

### DJ → MTB engine (`src/compat.js` + `src/schema.js` + `src/types.js`)

- **Schema/vocab (all inert for the live catalog — no live row carries any of it):**
  wheel/wheelConfig `'26'`/`'24'` (+ `WHEEL_CONFIG` entries), frontAxle `'15x100'`
  (sourced: the fetched Pike DJ page), rearAxle `'10x135-bolt'`, freehub
  `'single-speed'` (wheel/hub-side only; cassette cross-rule rejects it), discipline
  `'dj'`, new vocabs `driveMode`/`chainWidth`/`dropoutType`, frame fields
  `driveMode`+`dropoutType` (optional), chain + crankset gain the
  geared-OR-single-speed split (cross-rules keep geared rows exactly as strict as
  before), new `cog` + `seatpost` categories (schema + types + ID prefixes `cg-`/`sp-`;
  **no live GROUPS slot** — the slots join only at go-live).
- **`slotRequired()`:** `driveMode:'single-speed'` drops
  shifter/derailleur/cassette/dropper **and all four brake/rotor slots** (decision 3);
  a `freehub:'single-speed'` rear wheel exempts the cassette slot (integrated-cassette
  pattern).
- **Geared-rule suppression (§1b):** rules 3/3b/3c/4/5 already no-op with the slots
  empty; additionally a single-speed chain (no `system`) stays OUT of rule 3's
  one-system set, and rule 3c handles a ringStd-less single-speed crank without
  printing `undefined`. NOT implemented (deliberately): an error for a geared part
  picked onto a `driveMode:'single-speed'` frame — convertible frames are real, so
  that contradiction verdict awaits the mechanic review.
- **The DJ dataset** (`data/dirt-jump.js` v0.2) was reshaped to the LIVE schema with
  canonical ids — go-live is `PARTS.concat(DJ_PARTS)` plus adding the cog/seatpost
  slots to GROUPS. Rows duplicating live parts were dropped (Cane Creek 40, Race Face
  BSA BB, the verified live `cr-raceface-ride`, SLX brake, ODI grips, WTB Silverado,
  OneUp pedals, and the v0.1 "Odyssey Elementary 31.8 stem", which was a wrong spec).
  `test/test-dj-singlespeed.js` proves the concat validates with 0 problems, adds no
  lint warnings, and that a whole real DJ build (DMR Sect, rear-brake-only) checks
  clean and counts complete.

### BMX engine (`src/compat-bmx.js`, off-live — loaded by nothing the site serves)

`checkBmxBuild` + `BMX_VOCAB`/`BMX_GROUPS`/`BMX_SLOTS`/`bmxSlotRequired`, sharing the
MTB `Verdict`/`verdictKey` primitives (now exported by compat.js — shared, not copied).
Display-only: `bmxGearInfo()` (ratio/rollout) + `bmxBuildTotals()`. `data/bmx.js`
became data-only (its v0.1 slot/vocab sketch folded into the engine; the bogus
`'oversized'`-vs-`'25.4mm'` clamp split normalized to `'25.4mm'`). Note one vocab
correction vs §4's draft: crank spindles include **`'30mm'`** (the VERIFIED Profile
Elite AL rows). Tests: `test/test-bmx-engine.js` (every rule fires + dormancy
negatives) and `test/test-bmx-golden.js` (a braked golden build, a **brakeless**
golden build that must count complete, and a known-bad build that must fail on every
planted conflict).

### Dormant-rule inventory (ruleId → what activates it)

| Rule | Tier | Status | Activates on |
|---|---|---|---|
| `ss-chain-width` (MTB) | warning | dormant live | ≥2 of ring/cog/chain carrying `chainWidth`, mismatched — no live part carries the field; severity is the Q6 **[MECHANIC REVIEW]** |
| `ss-tension` (MTB) | info | dormant live | a frame with `driveMode:'single-speed'` AND sourced `dropoutType:'vertical'` (every current DJ frame is `'sliding'`) |
| `driveMode` slotRequired drops (MTB) | completeness only | dormant live | a frame row carrying `driveMode:'single-speed'` (off-live DJ rows only) |
| rule 6 vs `freehub:'single-speed'` (MTB) | error | dormant live | a wheel row carrying the new freehub token (off-live DJ wheel only) |
| rule 3c single-speed-crank branch (MTB) | error | dormant live | a Transmission chain picked with a `chainWidth` crank |
| `bmx-gyro-tabs` / `bmx-gyro-cable` | error | **dormant** in the BMX engine | an EXPLICIT sourced `frame.gyroTabs:false` / `brake.dualCable:false` — absence = unknown = silent (no dataset row carries either) |
| `bmx-tire-clearance` | warning | **dormant** in the BMX engine | a maker-published `maxTire` on a BMX frame/fork/rim (none sourced) |
| `bmx-crank-pieces` | error / adapter-warning | live-in-module, dormant-by-data | a 1-piece crank row or an American-shell frame row entering the dataset |
| BMX-1 shell×spindle **matrix** | — | **not built** | replaced by the purchasable-BB exact checks (`bmx-bb-shell`/`bmx-bb-spindle`) + the no-BB advisory info — no matrix guessing, no false error possible; reopen only if the mechanic review wants matrix-level verdicts |
| `bmx-headset` | — | not modeled | Q9: a sourced integrated-vs-threaded mismatch case |
| Definitional BMX rules (`bmx-wheel-size`, `bmx-bb-shell`, `bmx-bb-spindle`, `bmx-cog-driver`, `bmx-peg-axle`, `bmx-rear/front-brake-mount`, `bmx-seat-system`, `bmx-chain-pitch`) | per §2a | active within the off-live module | already gated: the whole module ships to nothing until Douglas's go-live word |
