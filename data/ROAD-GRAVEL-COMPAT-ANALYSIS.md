# Road + Gravel Compatibility Architecture Analysis (OFF-LIVE design doc)

**Status:** design doc — **DESIGN ROUND, awaiting Douglas's decisions.** Nothing here is
built or wired to the live app; the road/gravel lines stay OFF-LIVE until his go-live word
(CLAUDE.md hard rule 3; the site may later split per type — BuildMyRoadBike /
BuildMyGravelBike). This doc is the direct analogue of `data/DJ-BMX-COMPAT-ANALYSIS.md`.

**Scope:** two new drop-bar bike types — **road** and **gravel** — for a parts-compatibility builder for
bikes" fit-checker. It (1) enumerates the REAL mechanical compatibility rules of drop-bar
disc bikes, backed by manufacturer/authoritative docs, (2) leans a severity per rule and
flags fuzzy thresholds **[MECHANIC REVIEW]**, and (3) recommends the engine architecture,
argued from the rule sets. Slot sets, category schema, vocab drafts, and starter-catalog
shape live in `ROAD-MODEL.md` / `GRAVEL-MODEL.md`; the shared layer in
`ROAD-GRAVEL-SHARED-STANDARDS.md`.

**Grounding note (the project bar):** *a false "won't fit" OR a false "fits" is worse than a
missing rule.* Every rule below either rests on a definitional standards fact, is a
WARNING/INFO that cannot false-block, or lands **dormant → activates per sourced
manufacturer data** (the live MTB engine's rule-18 template). Fuzzy or standards-ambiguous
points are marked **[MECHANIC REVIEW]** and must clear a human mechanic pass before the rule
activates. **No e-bikes** anywhere; **no pop-ups** in whatever UI these pages become.

**Engine recap (the contract we extend/reuse):** `checkBuild(build)` (and the off-live
`checkBmxBuild`) take a map slotKey → resolved Part object and return
`{errors, warnings, infos}` of structured verdicts `{ruleId, slots, msg, fix?}`. Errors =
won't fit; warnings = works but check; infos = notes. Conflict identity is `verdictKey`
(ruleId+slots+msg). `slotRequired()` gates UI completeness (already discipline-aware — drops
`shock` on hardtails, the drivetrain slots on single-speed). `compatOf()` gives the
four-state pick dot. `Verdict`/`verdictKey` are **exported by `compat.js` and reused** by
`compat-bmx.js` (shared, never copied) — the same seam a road/gravel engine uses.

**Sources fetched this session (search summaries lie — only fetched pages count):**
- Shimano 12-speed freehub guide — HG L2 / HG / Micro Spline table
  ([bike.shimano.com](https://bike.shimano.com/stories/article/a-guide-to-shimanos-12-speed-freehubs-and-compatibility.html);
  authoritative dup in the [2025-2026 Compatibility PDF](https://productinfo.shimano.com/pdfs/product/thisyear/2025-2026_Compatibility_v028_en.pdf)).
- SRAM — [XPLR eTap AXS compatibility](https://support.sram.com/hc/en-us/articles/6014226075035-Are-SRAM-XPLR-eTap-AXS-parts-compatible-with-other-SRAM-components)
  and [Rival/Force/RED AXS cross-compat](https://support.sram.com/hc/en-us/articles/6043277756187-Is-Rival-eTap-AXS-compatible-with-SRAM-RED-or-Force-eTap-AXS-parts).
- Campagnolo N3W freehub teardown ([Bikerumor](https://bikerumor.com/campagnolo-n3w-in-detail-how-campys-new-freehub-body-fits-all-10-13-speed-cassettes/)).
- Flat-mount vs post-mount ([CrankSmith](https://www.cranksmith.com/guides/brake-mount-standards);
  [bicycles.stackexchange](https://bicycles.stackexchange.com/questions/44161/)).
- Tire clearance — [Specialized Crux](https://www.specialized.com/us/en/crux-frameset/p/205814) (47c/650b×2.1"),
  [Trek Checkpoint SL Gen 3](https://www.trekbikes.com/us/en_US/FAQ/checkpoint-sl-gen3/) (50 mm),
  [3T Exploro](https://company.3t.bike/wp-content/uploads/2018/08/3T-Exploro-leaflet.pdf) (2.1"/54 mm).

---

## 0. TL;DR

- **Road and gravel are ONE mechanical domain — drop-bar disc bikes — differentiated by
  DATA, not rules.** A gravel bike is a road bike with more tire clearance, more often 1×,
  and occasionally a suspension fork or dropper. Every fit rule is the *same rule* over
  *different data ranges* (the DJ ≈ trail-hardtail insight, applied between road and gravel).
- **~13 of the ~20 rules are MTB rules by SHAPE** (wheel size, axles, steerer, rotor-vs-hub,
  tire clearance, bar/stem clamp, BB-vs-crank) — reused as *patterns* over a **disjoint
  vocab**, with their **own ruleIds** (never reuse an MTB ruleId whose vocab means something
  else — the BMX discipline; the standout trap is **road HG ≠ MTB HG**, `src/schema.js:88`).
- **~7 rules are drop-bar-only** and MTB lacks them entirely: freehub-body-vs-cassette
  (road bodies), **flat-mount** brake, **2× front-derailleur capacity**, **rim-brake-vs-disc
  consistency**, **brifter (integrated lever+shifter) coupling of brake & drivetrain**, the
  **Di2-wired vs AXS-wireless** actuation split, and **SRAM XPLR-13 needs a UDH frame**.
- **Architecture recommendation (decisive): a single shared road+gravel engine
  `checkRoadBuild` in `src/compat-road.js`** — its own GROUPS/SLOTS/VOCAB, reusing the proven
  `Verdict`/`verdictKey`/`compatOf`/`buildTotals` primitives (exactly the `compat-bmx.js`
  seam), **serving BOTH consumer pages** (BuildMyRoadBike + BuildMyGravelBike) via a
  `discipline` tag. **Two pages ≠ two engines. Not extending `checkBuild`; not two engines.**
  Full argument in §3.

---

## 1. The drop-bar rule set

Notation: **[REUSE-SHAPE]** = same logic as a named MTB rule, own ruleId over road/gravel
vocab. **[NEW]** = a rule family the MTB engine doesn't have. Severity is a **lean**;
**[MECHANIC REVIEW]** marks a threshold/interchange that must clear a human pass before
activating.

### 1a. Rules reused in SHAPE from the MTB engine (own ruleIds, disjoint vocab)

**R1 — Wheel size consistency. [REUSE-SHAPE: `wheel-config`]** — ERROR.
Frame (its supported `wheelSizes`), fork, front/rear wheel, and tires must all agree on
`700c` **or** `650b`. Gravel frames often support *both* → "matches one of the frame's
sizes" (the mullet/wheelConfig shape). ruleId `rg-wheel-size`.

**R2 — Front axle: fork vs front hub. [REUSE-SHAPE: `front-axle`]** — ERROR.
`fork.axle` vs `frontWheel.hub` — `12x100` (disc) or `qr100` (rim). ruleId `rg-front-axle`.

**R3 — Rear axle: frame vs rear hub. [REUSE-SHAPE: `rear-axle`]** — ERROR.
`frame.rearAxle` vs `rearWheel.hub` — `12x142` (disc) or `qr130` (rim). ruleId `rg-rear-axle`.

**R4 — Steerer vs head tube. [REUSE-SHAPE: rule 11 + 20]** — ERROR.
`fork.steerer` vs `frame.headTube`/`headset`. Tapered near-universal; `straight-1-1-8` is the
legacy/rim tail. Same S.H.I.S. semantics as MTB rules 11/20. ruleId `rg-steerer`.

**R5 — Freehub body vs cassette. [REUSE-SHAPE: rule 6/6c, direction-aware]** — ERROR /
adapter-WARNING. **The highest-value drop-bar rule and the best-fetched.** The bodies and
their documented interchange (Shimano guide + SRAM + Campagnolo, all fetched):
- **HG L2** ↔ Dura-Ace-9200 12sp cassette **only**; but a DA 12sp cassette *also* fits a
  plain HG body (which takes 11- and 12-speed) → **direction-aware** (HG-L2-only cassette on
  a plain-HG wheel = fine; a plain-HG cassette forced onto HG-L2 = check).
- **HG (road)** ↔ Shimano road/gravel 11- or 12-speed. HG-800/HG-700 road & 11sp-MTB
  cassettes on HG need a **1.85 mm spacer** → adapter-WARNING with a named `fix`
  (`{kind:'adapter', name:'1.85 mm HG spacer'}` — mirrors the live rule-6c XD/XDR fix, *same
  1.85 mm figure*).
- **Micro Spline Road (MSR)** ↔ GRX 1×12 (shares MTB 12sp cassettes 10-45/10-51).
- **XDR** ↔ all SRAM road/gravel AXS 12sp cassettes (10T small cog). **XDR ≠ MTB XD**
  (1.85 mm longer) → XD-on-XDR / XDR-on-XD is the same direction-aware adapter/error question
  the MTB engine already answers.
- **N3W** ↔ native Ekar 13sp (9/10T); fits 10/11/12sp Campagnolo cassettes **with the
  AC21-N3W adapter ring + longer lockring** → INFO/adapter-WARNING (both parts ship with N3W
  wheels).
ruleId `rg-freehub`. Every *other* body↔cassette mismatch (e.g. an XDR cassette on an HG
wheel) is the exact-match ERROR. **[MECHANIC REVIEW: confirm the HG-L2 direction-awareness
and the exact spacer/adapter cases before activating the adapter tier — the exact-match ERROR
side is definitional and safe to ship first; the adapter tiers land dormant until sourced.]**

**R6 — Cassette range vs rear-derailleur capacity. [REUSE-SHAPE: rule 5]** — ERROR/WARNING.
`cassette.maxCog` vs `rearDerailleur.maxCog`, and total capacity vs the 1×/2× spread. SRAM
XPLR RDs pin this hard (fetched): 12sp XPLR → 10-36/10-44/11-44; **13sp XPLR E1 → 10-46
only**. ruleId `rg-rd-capacity`. **[MECHANIC REVIEW: exact max-cog and total-capacity numbers
per RD cage — publish per-part from maker specs; lean ERROR on exceeding a maker-stated max
cog, WARNING on total-capacity edge cases.]**

**R7 — Rotor interface vs hub. [REUSE-SHAPE: rule 9, IDENTICAL]** — ERROR / adapter-WARNING.
Center-Lock rotor on a 6-bolt hub = ERROR; 6-bolt rotor on a Center-Lock hub = adapter
WARNING with a structured `fix`. This is **byte-for-byte the MTB rule 9** (disc road/gravel
hubs use the same two interfaces) — a prime candidate to **factor into a shared helper** both
engines call (see §3). ruleId `rg-rotor-mount`. Disc builds only (skipped when rim-brake).

**R8 — Rotor size vs flat-mount cap. [REUSE-SHAPE: rule 10]** — WARNING/ERROR.
Flat mount "as writ" supports **140/160 only** (fetched: CrankSmith + stackexchange); some
makers run proprietary >160. Lean: WARNING when a rotor exceeds a fork/frame's sourced
`maxRotorF/R`; the 140/160 default cap stays **dormant** per part until a maker publishes its
cap (a wrong hard-160-error would false-block the proprietary-big-rotor bikes). ruleId
`rg-rotor-size`. **[MECHANIC REVIEW: is 160 a safe default cap, or must it be sourced
per-fork? Lean sourced-only — dormant until published.]**

**R9 — Tire vs frame/fork clearance. [REUSE-SHAPE: rule 18 + 14]** — ERROR (frame) /
WARNING (rim). `tire.width` vs `frame.maxTire` / `fork.maxTire`, **dormant until a maker
publishes a max** (rule-18 template). Live examples ready to source: Crux 47 mm (700c) /
2.1" (650b); Checkpoint 50 mm; Exploro 2.1". Road maxes are tight (28–35 mm) and just as
sourced. **Unit trap:** road/gravel tires are **mm**, MTB tires are **inches** — the shared
engine must compare within a discipline's unit. ruleId `rg-tire-clearance`.

**R10 — Bar/stem clamp. [REUSE-SHAPE: rule 15]** — ERROR.
`handlebar.clamp` vs `stem.clamp` (`31.8`/`35`). N/A when a one-piece `cockpit` is picked
(no clamp). ruleId `rg-bar-clamp`.

**R11 — BB shell vs crank spindle. [REUSE-SHAPE: rule 7]** — ERROR.
`bb.shell`↔`frame.bb`, `bb.spindle`↔`crankset.bb` over the **road shell zoo** (BSA/BB86/
BB386EVO/BBRight/PF30/T47). Exact-match, same as MTB rule 7. ruleId `rg-bb`.

**R12 — Seatpost / dropper diameter vs frame. [REUSE-SHAPE: rule 13/13c]** — ERROR (too big)
/ WARNING (shim). Round posts (27.2/30.9/31.6) match the frame bore; **aero/proprietary/
D-shaped posts** are a `proprietary`+`forFrames` LOCK (fits only that frame — the OEM-shock
`forFrames` pattern), never a diameter match. Gravel dropper = same rule. ruleId
`rg-seatpost`. **[MECHANIC REVIEW: proprietary-post lock is definitional per frame; confirm
the aero-post families before shipping the lock.]**

### 1b. Drop-bar-only NEW rule families (the MTB engine has none of these)

**R13 — Drivetrain one-system + one-speed. [NEW ruleId, shape echoes rule 3]** — ERROR.
All geared parts (shifter/brifter, derailleur(s), cassette, chain) share one system + speed
count. **Exemption (fetched):** SRAM states XPLR/road parts include *"all AXS controllers"* as
cross-compatible, and RED/Force/Rival AXS cross-mix (chains 10-28→10-36, cranks, controllers)
— so **all SRAM AXS road controllers drive all SRAM AXS road derailleurs** (the same
electronic-controller exemption the MTB engine grants SRAM AXS). Non-SRAM cross-system stays
ERROR. ruleId `rg-drivetrain-system`.

**R14 — Actuation: mechanical vs Di2-wired vs AXS-wireless. [NEW]** — ERROR.
Road splits electronic into **two incompatible worlds**: Shimano **Di2 (wired)** and SRAM
**AXS (wireless)**. A Di2 lever cannot drive an AXS mech and vice versa, and a mechanical
lever cannot drive an electronic mech. Model `actuation:['mechanical','di2-wired',
'axs-wireless']` (road-specific; MTB's `['cable','electronic']` is too coarse). ruleId
`rg-actuation`. **[MECHANIC REVIEW: cross-generation Di2 (11sp Di2 ↔ 12sp Di2) and mechanical
11↔12 are NOT cross-compatible — confirm the generation matrix; lean ERROR on a speed-count
mismatch, which R13's one-speed check already catches.]**

**R15 — Chain standard vs system. [NEW]** — ERROR.
SRAM **Flattop** is a distinct chain width used **only** by SRAM AXS road (fetched: SRAM
treats "road Flattop chain" separately from Eagle). An HG chain on an AXS-road system, or a
Flattop chain on Shimano/Campagnolo, is wrong. Campagnolo is its own chain std too. Model
`chain.std:['hg','flattop','campag']`. ruleId `rg-chain-std`. Definitional given the system.

**R16 — 2× front-derailleur capacity & 2×-capable controls. [NEW]** — ERROR/WARNING.
A 2× build needs (a) a front derailleur whose capacity covers the chainring tooth difference,
and (b) a shifter/brifter + RD that support a front shift. A 1× control (right-only) can't run
a 2× crank; a 2× FD's capacity must cover the ring diff. The FD slot is **optional** (1× has
none — the DJ-drops-the-derailleur pattern; `slotRequired` handles it). ruleId
`rg-fd-capacity` / `rg-2x-system`. **[MECHANIC REVIEW: exact FD capacity (max tooth diff, ~16T
typical) and front-total-capacity thresholds are fuzzy and maker-specific — land the
"1×-control-can't-drive-2×-crank" definitional half first (ERROR, safe), keep the numeric
capacity half dormant/WARNING until sourced per FD.]**

**R17 — Rim-brake vs disc consistency. [NEW]** — ERROR.
`brakeSystem` must be consistent end-to-end: a `rim-caliper` frame/fork takes rim wheels +
caliper brakes + a rim brifter; a `disc-flat` frame takes disc wheels + flat-mount calipers +
rotors + a hydraulic/disc brifter. Mixing (disc caliper on a rim frame, rim wheel on a disc
build) is a hard ERROR. ruleId `rg-brake-system`. **If Douglas scopes v1 disc-only (§5), this
collapses to a data-consistency guard** but still worth encoding so a stray rim part can't
false-green.

**R18 — Brake mount: flat-mount caliper vs frame/fork. [NEW ruleId, shape echoes rule 8]** —
ERROR. Disc road/gravel is **flat mount** (fetched: Shimano-designed, the road/gravel
standard); a post-mount caliper doesn't bolt to a flat-mount frame without an adapter that
"rarely pays off." `brake.mount` (`flat-mount`) vs `frame/fork.brakeMount`. **Do NOT reuse
the MTB `brakeMount` (`PM`/`FM`)** — different meaning, a false-green generator. ruleId
`rg-brake-mount`. Adapter tier (post→flat) is a dormant WARNING.

**R19 — Brifter integration (lever + shifter are one unit). [NEW]** — ERROR/INFO.
On a drop bar the brake lever and shifter are the **same SKU**, so the brifter's
`brakeSystem` (hydraulic-disc / mechanical-disc / rim) must match the calipers **and** its
`system`+`actuation` must match the derailleur. This *couples the brake and drivetrain slots*
in a way MTB never does. Most of the teeth are already in R13/R14/R17/R18; R19 is the explicit
cross-check that the *one part* satisfies both sides (e.g. a mechanical-disc brifter can't run
hydraulic calipers). ruleId `rg-brifter-brake`. **[MECHANIC REVIEW: the mechanical-disc vs
hydraulic-disc lever/caliper matching — confirm the real non-fit cases; lean ERROR only on a
hydraulic-caliper-with-mechanical-lever mismatch, which is definitional.]**

**R20 — SRAM XPLR-13 needs a UDH full-mount frame. [NEW, direct analog of MTB rule 4]** —
ERROR. Fetched: the 13-speed Rival/Force/RED XPLR E1 rear derailleurs are **UDH full-mount**
(bolt to a UDH dropout, no hanger). A 13sp XPLR RD on a non-UDH frame won't mount — exactly
the shape of the live "SRAM Transmission needs UDH" rule 4. ruleId `rg-xplr-udh`. Definitional
and well-sourced → safe to ship active.

### 1c. DISPLAY-ONLY (compute + show, never a fit verdict)

- **Gear range / gain ratio / low gear** (chainring ÷ cassette) — a tuning number; every
  ratio "fits." Show like price/weight totals; never feed the engine.
- **Tubeless / clincher / tubular** — `tubeless:bool` display (a wrong hard rule here would be
  worse than none — the bar).
- **Pedal style** (road-clip Look/SPD-SL vs SPD) — a shoe/cleat choice, not a bike-fit rule.
- **Bar dims** (reach/drop/flare/width), **cockpit dims**, **crank chainline**, **saddle**,
  **bar tape** — fit-trivial, display only.

### 1d. Completeness (`slotRequired`) — data-driven, no new mechanism

The existing `slotRequired()` pattern covers every road/gravel case with data, no new code
shape: **1× drops the front-derailleur slot** (single-speed-drops-derailleur precedent);
**rim-brake drops the rotor slots**; **road drops the dropper slot** (gravel keeps it
optional); **pedals/bb/headset/cockpit optional** (live MTB precedent). Nothing here requires
a brake-*less* concept (unlike BMX) — road/gravel always brake.

---

## 2. Road vs gravel — one engine, argued from the rules

Every §1 rule fires identically on road and gravel; the *only* differences are data:

| | Road data | Gravel data | New rule? |
|---|---|---|---|
| Wheel size | `700c` | `700c` or `650b` | No — R1, one vocab |
| Tire clearance (R9) | 28–35 mm | 40–57 mm / 2.1" | No — same rule, bigger `maxTire` |
| Front derailleur | usually present (2×) | often absent (1×) | No — R16 just doesn't fire on 1× |
| Cassette small cog | 11T (HG) / 10T (XDR) | 10T / **9T** (Ekar) | No — R5/R6, wider `minCog` vocab |
| Suspension fork | none | rare tail | No — `fork.travel`, dormant fork-travel rule |
| Dropper | none | optional | No — R12, optional slot |

There is **no rule that exists for gravel but not road, or vice versa.** Therefore road and
gravel are **one engine**; the split is a `discipline` tag driving each *page's* catalog
filter. Splitting them into two engines would duplicate all 20 rules + tests and guarantee
drift the first time one is fixed in only one place — the identical argument
`DJ-BMX-COMPAT-ANALYSIS.md` used to reject a separate DJ engine.

---

## 3. THE ARCHITECTURE DECISION — shared engine vs two engines vs extending checkBuild

**Recommendation: Option (b) — a single shared road+gravel engine `checkRoadBuild` in
`src/compat-road.js`, with its own `ROAD_GROUPS`/`ROAD_SLOTS`/`ROAD_VOCAB`, reusing the MTB
verdict primitives, serving BOTH pages (BuildMyRoadBike + BuildMyGravelBike) via a
`discipline` tag.**

The options considered:
- **(a) Extend the existing MTB `checkBuild`** with a `discipline` gate (road/gravel branches).
- **(b) One shared road+gravel engine** `checkRoadBuild` + own GROUPS/SLOTS/VOCAB. ← **PICK**
- **(c) Two engines, road and gravel separately.**

### Why (b) and not (a) — road/gravel is disjoint enough from MTB to earn its own engine

The §1b rule families (flat-mount, 2× FD capacity, rim-vs-disc, brifter coupling, Di2-wired-
vs-AXS-wireless, XPLR-UDH, road freehub bodies) **do not exist in the MTB engine**, and the
§1a reused-shape rules operate over a **disjoint vocab**: `700c`/`650b` not `29`/`275`;
**flat-mount** not `PM`/`FM`; **HG-road/HG-L2/XDR/N3W/MSR** freehubs not `XD`/`MicroSpline`/
`HG`; road systems not Eagle/Transmission; `12x100`/`12x142`/`qr` axles; road actuation
`di2-wired`/`axs-wireless`. Cramming this into `checkBuild` via a `discipline` gate would:
- grow the MTB engine a large branch of rules that **never fire for any MTB build** (2× FD,
  rim brake, brifter, flat-mount) — dead weight and noise in `SLOTS`/`GROUPS`/`VOCAB`;
- **mix disjoint vocab whose tokens collide in meaning** — the single most dangerous case is
  **road HG vs MTB HG** (`src/schema.js:88` literally warns "a road expansion must SPLIT, not
  conflate"): one `freehub:'HG'` token meaning two different bodies is a *false-green
  generator*, precisely the silent-false-verdict failure the project fears most;
- make it trivially easy to **leak a road assumption into an MTB verdict** (or vice-versa) as
  the number of `discipline`-conditional branches grows.

This is the *same* reasoning `DJ-BMX-COMPAT-ANALYSIS.md` §3 used to reject folding BMX into
`checkBuild`. Road/gravel is more MTB-*adjacent* than BMX (it shares disc rotors, thru-axles,
tapered steerers, tire-clearance) — but "adjacent" is not "same vocab," and the freehub trap
alone justifies the separation.

### Why (b) and not (c) — road and gravel share ~90%, so ONE engine, not two

§2 shows no rule is gravel-only or road-only. Two engines duplicate 20 rules + 20 tests and
drift on the first one-sided fix — the tidy/unbreakable creed forbids it. Road+gravel = **one
engine, two pages.** The page split Douglas decided (BuildMyRoadBike / BuildMyGravelBike) is
**presentation** — each page filters the shared catalog on `discipline` and sets its default
tire-clearance expectations — not a second engine. *Two pages ≠ two engines.*

### The one refactor worth doing up front — shared generic helpers (not just primitives)

Road/gravel shares *more* with MTB than BMX does: **R7 (rotor-vs-hub, direction-aware
Center-Lock/6-bolt) is byte-for-byte MTB rule 9**, and R9's tire-clearance comparison and the
adapter-`fix` verdict builder are the same logic over different units/vocab. The BMX engine
already reuses `Verdict`/`verdictKey` from `compat.js` (shared, not copied). For road/gravel,
go one step further and **factor the genuinely-identical helpers** — the direction-aware
rotor-interface check, the "exact-match interface → verdict" builder, the "value > sourced max
→ dormant warning" clearance comparator — into a small shared module (e.g.
`src/compat-core.js`) that **both** `checkBuild` and `checkRoadBuild` import. Shared
primitives **and** shared generic helpers; **forked rule sets + forked vocab.** This is the
"one refactor worth doing up front" the BMX analysis named, and it's more valuable here
because the overlap with MTB is larger.

### Test / maintenance implications (the `compat-bmx.js` playbook)

- A **parallel suite** `test/test-road-engine.js` + `test/test-road-golden.js` against
  `checkRoadBuild` (every rule fires + dormancy negatives; whole real road & gravel bikes that
  must validate clean, incl. a 1× gravel build, a 2× road build, a Di2 build, an AXS build, a
  known-bad build that must fail on each planted conflict — the BMX golden pattern).
- A **separate off-live dataset** `data/road.js` (+ maybe `data/gravel.js`, or one file with a
  `discipline` field) — NOT wired into the live app until Douglas's word (hard rule 3).
- The shared-helper refactor gets its own tests and must leave the **live MTB engine's verdicts
  byte-identical** (the `verdict-audit-harness.js` baseline check the DJ/BMX work used).

### How this fits the "split per type" future

CLAUDE.md anticipates per-type sites (buildmybmx, and now BuildMyRoadBike / BuildMyGravelBike).
Option (b) is the clean on-ramp: road/gravel already lives in its own engine + own dataset +
own vocab + own tests, so (i) splitting the **two pages** onto **two sites** is a filter/deploy
change, and (ii) even splitting the road engine from the gravel engine later — if that were
ever wanted — is trivial because they're data-tagged within one module, not entangled in the
MTB engine. BMX proved the file-move; road/gravel inherits it.

**Caveat to flag (see §5):** the road↔gravel↔allroad↔CX boundary is genuinely fuzzy. Model it
as a **`discipline` tag** (mechanical engine reasons about parts; the tag drives page/filter),
**not** a hard partition — the same reason the DJ analysis preferred a mechanical
`driveMode` flag over a marketing `bikeType` enum.

---

## 4. Vocab / schema deltas checklist (beyond MTB `VOCAB`; put in `ROAD_VOCAB`)

- [ ] `wheel` (road/gravel): `['700c','650b']` — disjoint from MTB `['29','275','26','24']`.
- [ ] `freehub` (road/gravel): `['hg-road','hg-l2','micro-spline-road','xdr','n3w','campag-11']`
      — **split from MTB `freehub`** (`src/schema.js:88` mandate). Direction-aware interchange
      table (R5) as engine-side pair data, not part fields.
- [ ] `brakeSystem`: `['disc-flat','disc-post','rim-caliper']`; `brakeMount`:
      `['flat-mount','post-mount']` (road/gravel meaning — NOT the MTB PM/FM tokens).
- [ ] `rearAxle`: `['12x142','qr130','qr135']`; `frontAxle`: `['12x100','qr100']`.
- [ ] `steerer`: `['tapered','straight-1-1-8']`.
- [ ] `system` (road/gravel): the `systemRoad` list in `ROAD-MODEL.md` §4 (Shimano road 11/12
      + GRX, SRAM AXS road + XPLR 12/13 + Apex, Campagnolo Ekar/12/11).
- [ ] `actuation`: `['mechanical','di2-wired','axs-wireless']` (road SPLIT of MTB's
      `['cable','electronic']`).
- [ ] `chainStd`: `['hg','flattop','campag']`.
- [ ] `bbShell` (road): `['bsa-road','bb86','bb386evo','bbright','pf30','t47-road','italian']`
      — **grow per fetched frame page** (the MTB `frameBb` discipline), not a speculative
      superset.
- [ ] `crankBb` (road): `['dub','dub-wide','24mm-road','30mm']`.
- [ ] `minCog`: allow `9` (Ekar) and `10` (XDR/N3W/MSR) below the HG 11T floor.
- [ ] `seatpostDia`: `['27.2','30.9','31.6']` + a `proprietary`+`forFrames` lock for aero/D.
- [ ] `clamp`: `['31.8','35']`; a `cockpit` category (`integrated:true`, no clamp axis).
- [ ] New part categories/slots per `ROAD-MODEL.md` §2 (`shifter`=brifter pair,
      `frontDerailleur` optional, `cockpit` optional, `bartape`, etc.) + ID prefixes.
- [ ] Frame fields: `wheelSizes[]`, `maxTire`(+`maxTire650b`/map), `brakeSystem`,
      `frontDerailleurMount`, `mount:'udh'` (for R20), aero-post lock.

---

## 5. Product-design questions — DECISIONS-FOR-DOUGLAS

**[HIGH] — architecture & scope:**
1. **Engine architecture sign-off.** Approve Option (b): one shared `checkRoadBuild`
   (`src/compat-road.js`) serving both pages via a `discipline` tag, reusing the MTB verdict
   primitives + a new shared-helper module — **not** extending `checkBuild`, **not** two
   engines. (This is the load-bearing call; everything downstream follows it.)
2. **Road page name** — "BuildMyRoadBike" is unconfirmed (gravel = "BuildMyGravelBike" is
   decided). Confirm or rename.
3. **Rim-brake road scope** — disc-only v1 (recommended; matches gravel, ~halves the
   brake/axle/wheel vocab and drops R17 to a guard), or include rim brake now?

**[MED] — modelling calls (all have a recommended lean; each also carries a
[MECHANIC REVIEW] where a threshold is fuzzy):**
4. **Actuation split** `['mechanical','di2-wired','axs-wireless']` vs the MTB
   `['cable','electronic']` — confirm the finer road split (recommended; R14).
5. **Brifter slot** — one `shifter` holding the L+R pair (recommended) vs split L/R.
6. **Freehub adapter tiers** (R5) — ship the exact-match ERROR side first (definitional, safe)
   and land the HG-L2/XDR/N3W adapter WARNINGs **dormant** until each is sourced+mechanic-
   reviewed? (Recommended — the MTB rule-6c template.)
7. **Flat-mount rotor cap** (R8) — sourced-per-fork only (recommended; a hard 160 default
   would false-block proprietary big-rotor bikes) vs a 140/160 default cap.
8. **FD 2× capacity** (R16) — ship the definitional "1×-control-can't-drive-2×-crank" ERROR;
   keep the numeric capacity threshold dormant/WARNING until sourced per FD? (Recommended.)
9. **Campagnolo depth** — Ekar/N3W-first (recommended) vs full road Campagnolo now.
10. **Cyclocross & allroad** — `discipline` tags on the gravel/road pages (recommended), not
    new engines.

**All [MECHANIC REVIEW] items in §1 must clear a human mechanic/domain-expert pass before the
corresponding rule activates — same bar as the MTB engine.** Rules land dormant; activate per
sourced manufacturer/standards data. The exact-match/definitional halves (R1–R4, R10, R11,
R17, R18, R20, and the ERROR side of R5) are safe to ship active; the adapter tiers and fuzzy
thresholds (R5 adapters, R6 capacity numbers, R8 cap, R16 numbers, R19 mechanical-hydraulic)
stay dormant-until-sourced.
