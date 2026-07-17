# Suspension — Mechanic Corpus

**Maturity: foundation** (L1 coverage + a first L2 slice landed 2026-07-17 — the RockShox
Suspension Theory Guide's DAMPER/FRICTION/TUNING sections, SUS-26–31 — mined for the first
time this round; see [`CURRICULUM.md`](CURRICULUM.md). Still short of `professional`: no
per-model service intervals/oil-volumes/seal-kit part numbers, no torque-spec table — see
"## Gaps" below.)

Fork · rear shock · travel · trunnion/standard eyes · coil approval · fork↔frame bundling.
Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline, conventions).

Fact IDs are stable and append-only (`SUS-n`). Confidence is the source's own grading.

---

## Rear shock fit

**SUS-1 — Eye-to-eye and mount (std vs trunnion) are exact-match errors; stroke is
DIRECTION-AWARE.** Eye-to-eye mismatch = error. Mount mismatch (standard vs trunnion) = error.
Stroke **longer** than the frame's spec = error (over-rotation / bottom-out contact). Stroke
**shorter** with matching eye + mount = **warning** (reduced travel) — makers sell the same
body in multiple strokes and support stroke reduction, so a red there is a false "won't fit."
*Confidence: confirmed (directions).* Source: EXPERT-REVIEW-DOSSIER.md §16. Engine: rule 16.

**SUS-2 — THE TRUNNION-EYE LAW (load-bearing, catches fabricated rows).** Metric rear shocks
come in matched trunnion/standard pairs where the **trunnion eye-to-eye is exactly 25 mm
SHORTER** than the standard-mount equivalent (the trunnion upper mount is integrated into the
shock body). Real pairings: **145T/170S · 165T/190S · 185T/210S · 205T/230S · 225T/250S.**
Consequence:
- **210 / 230 / 250 are STANDARD-mount-only** eye lengths.
- **145 / 165 / 185 / 205 / 225 are the TRUNNION** eye lengths (most also exist as std).
So a `mount:'trunnion'` on a **210 / 230 / 250**-eye row is **almost always fabricated**.
*Confidence: reference law — verified across the catalog; apply against a fetched maker page,
never blindly.* Source: catalog `desc` fields' recurring law + memory
`shock-trunnion-eye-equivalence`. This caught 2 fabricated rows in the 2026-07-11 shock wave
(`sh-ohlins-ttx2air-m2-210x55-trun`, `-230x65-trun` — a "available in trunnion metric lengths"
marketing bullet mis-read into std-only-eye trunnion SKUs; each would have shipped a false
"fits" on a trunnion frame). Öhlins marks genuine trunnion SKUs with a "TM" token in the page
title.

**SUS-3 — 185×55 STANDARD is real — the law is not a blanket drop rule.** 185 is a trunnion eye
length, but a **185×55 *standard*-mount shock genuinely exists** (Öhlins TXC2Air and Cane Creek
Air IL both sell one). The trunnion-eye law tells you where to *suspect* a fabricated mount, not
to auto-drop a maker-confirmed row — always verify against the fetched maker page.
*Confidence: confirmed (near-miss the auditor correctly did NOT flag).* Source: memory
`shock-trunnion-eye-equivalence`; carried in catalog `desc` fields.

**SUS-4 — Stroke reduction is real and manufacturer-supported; travel is NOT estimated
linearly.** RockShox's service manual documents Travel Reducers (2.5 / 5 / 7.5 mm), the same
shock body spanning multiple strokes, and some shocks shipping with a reducer *"as required for
a particular bicycle frame."* BUT: the engine deliberately **does not** compute reduced travel
as `frame.travel × (stroke/design)` — real linkages are progressive/digressive, so a linear
estimate is wrong. The shorter-stroke warning **names the frame's designed travel and defers to
the maker's supported strokes** rather than quoting a computed figure. *Confidence: confirmed
(stroke reduction); the linear estimate was removed on purpose.* Source: RockShox 2023+ Super
Deluxe service manual (GEN.0000000007157, fetched PDF — *"Travel Change (optional): Travel
within the shock stroke range is changeable by installing a Travel Reducer…"*, and *"Before
increasing or reducing shock travel (stroke), consult your frame manufacturer…"*), via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §16; EXPERT-REVIEW-DOSSIER.md §16 (review directive: *"don't
estimate the travel, find out what travel the frames ship with"*).

**SUS-5 — Coil-shock approval is per-frame and maker-stated only.** A coil shock on a frame
whose maker states "not coil-compatible" warns. This is **dormant** and populated **only from
explicit maker statements** — never from a leverage-curve guess (a false red there would steer
riders off working builds). *Confidence: confirmed policy.* Source: EXPERT-REVIEW-DOSSIER.md
§16. Engine: `coil-approval`, dormant until a frame declares `coilApproved:false`.

**SUS-6 — A shock on a hardtail is a clean error.** A `suspension:'hardtail'` frame takes no
rear shock; the engine rejects one cleanly (the shock block is forbidden on hardtail frames by
a schema cross-rule). *Confidence: confirmed.* Source: EXPERT-REVIEW-DOSSIER.md §16 (hardtail
guard); CLAUDE.md data model (`suspension` discriminator).

## Coil-shock weight basis

**SUS-7 — Coil shocks weigh WITHOUT the spring (a comparability convention).** For catalog
weight comparability, a coil shock's weight = damper **without** spring. RockShox quotes the
Super Deluxe Coil *with* a 350 lb spring (convert/flag it); EXT quotes the Storia V4 *without*
("Spring Sold Separately"). The basis is noted in `desc`, and `soldWithout` records the
exclusion. *Confidence: convention (data-entry policy).* Source: tools/DATA-ENTRY-TEMPLATE.md §5.

## Spring types — air vs coil (theory basics)

**SUS-17 — Coil springs are linear-rate; air springs are progressive.** A coil spring's
compression force rises **linearly** with stroke (1 inch of stroke needing 200 lb → 2 inches
needs 400 lb). An air spring's force rises **exponentially** through the stroke, because
compressing the piston into a fixed amount of trapped air halves the remaining volume
repeatedly, doubling pressure each time. This is *why* the catalog's coil-approval rule (SUS-5)
is per-frame: a frame's leverage curve is tuned around one spring-force curve shape, and
swapping families changes that shape. *Confidence: confirmed (manufacturer physics
explainer).* Source: RockShox "Suspension Theory Guide" (sram.com/globalassets/…
/rockshox/suspension-theory-guide.pdf, fetched) — *"A coil spring has a linear spring
rate… Unlike linear coil springs, air springs have a progressive spring curve."*

**SUS-18 — Coil spring rate is set by wire diameter and wire length only; coil bind and coil
set are the two coil-specific failure/limit modes.** Thicker wire = higher rate; longer wire =
lower rate (coil diameter/spacing set physical dimensions, not rate). **Coil bind** = coils
touching each other, hard-capping travel once reached. **Coil set** = a fatigued coil that no
longer returns to full length after sustained compression — it doesn't change the spring rate,
but enough coil set brings coils closer together and can reduce *usable* travel before bind.
Relevant mechanic takeaway: a coil shock that feels like it's lost travel/got harsher over a long
service life may be coil set, not a damper fault. *Confidence: confirmed.* Source: RockShox
Suspension Theory Guide (fetched), pages 4–6.

**SUS-19 — Coil preload fine-tunes sag; it is NOT a substitute for the correct spring rate.**
Preloading a coil (compressing it before stroke begins via the shock's preload collar) raises
breakaway force and stiffens initial feel without changing the spring's rate — it's a small
sag trim, not a way to correct a spring that's grossly too soft or too stiff for the rider/frame.
*Confidence: confirmed.* Source: RockShox Suspension Theory Guide (fetched), page 6.

**SUS-20 — Air spring "progression" is tunable via chamber volume — smaller volume = steeper
ramp-up, larger volume = more linear/gradual curve.** This is the mechanical basis for volume
spacers/tokens: reducing the air chamber's volume raises the spring's late-stroke ramp for more
bottom-out resistance, without touching starting (sag) pressure. *Confidence: confirmed.*
Source: RockShox Suspension Theory Guide (fetched), pages 9–11 — *"A larger air chamber… creates
an air spring with a larger volume and more gradual spring curve. If the volume of the same air
spring is reduced, the pressure increases more rapidly."*

## Sag & setup basics

**SUS-21 — RockShox's own sag targets split by air-spring family: 25% for Solo Air rear
shocks, 30% for DebonAir rear shocks, ±5% rider preference.** Setup procedure per RockShox's
FAQ: open the damper fully, pressurize from empty to 100 psi and cycle the shock 5× to
equalize positive/negative air chambers, then pressurize to roughly the rider's total weight in
lbs as a psi starting point (e.g. 160 lb rider → ~160 psi) before checking sag. *Confidence:
confirmed (manufacturer FAQ).* Source: RockShox support FAQ "How much air should I have in my
RockShox rear shock for my rider weight?" (support.rockshox.com, fetched) — *"The correct sag
percentage for Solo Air shocks is 25%. The correct sag for DebonAir shocks is 30%… Sag can be
set +/- 5% as preferred."*

**SUS-22 — Fox's own guidance instead gives ONE uniform starting-point number — 25% sag for
both fork and rear shock — then adjusts by riding style.** More sag (lower pressure) for
DH/shuttle-style riding; less sag (higher pressure) for XC/all-mountain. Sag is read off an
o-ring or zip tie on the stanchion/shock body. Note this is a genuinely different number from
RockShox's split 25/30% rear-shock guidance (SUS-21) — two manufacturers publishing different
own-brand starting points, not a data conflict to resolve (sag/setup is outside `checkBuild`'s
scope entirely — no engine rule or catalog field this could contradict). *Confidence: confirmed
(manufacturer page).* Source: Fox "Achieving Correct Air Pressure with Sag" (tech.ridefox.com,
fetched).

**SUS-23 — RockShox's post-pressurization equalization procedure, and how "sag" is
distinguished from "travel used."** After setting starting pressure, RockShox has the rider
cycle the fork ~25–30% of its travel (or the rear shock 5–8 times, ~15% of travel — 35% for
Vivid Air) to equalize the positive/negative air chambers before final pressure checks. Separately,
a **sliding o-ring against the wiper seal** tracks how much travel gets *used* on a real ride
(distinct from the static sag measurement) — RockShox's own guidance: *"Ideally, you use most of
your travel while riding — occasional bottom outs on bigger impacts is normal."* *Confidence:
confirmed.* Source: RockShox "Suspension Welcome Guide" (sram.com/en/rockshox/learn/, fetched).

## Service intervals (general awareness — not a repair procedure)

**SUS-24 — RockShox's official interval bands: forks 50 h (lower leg) / 100–200 h (lower leg +
air/coil spring + damper, model-year dependent); rear shocks 50 h (air can) / 100 h or 200 h
(air can + damper, varies by model — Monarch/Vivid/Kage at 100 h, Deluxe/Super Deluxe at
200 h).** *Confidence: confirmed (manufacturer FAQ + official interval chart, both fetched).*
Source: RockShox support FAQ "How often should I service my RockShox product?"
(support.rockshox.com) + "SRAM/RockShox Service Interval Counter Mat"
(sram.com/globalassets/document-hierarchy/service-manuals/sramrockshox-service-interval-counter-mat.pdf),
both fetched. Both note intervals shift with terrain/riding style/skill level and vary by
product + model year — treat as a *band*, not a fixed number, the same discipline SUS-13 applies
to travel SKUs.

**SUS-25 — Fox's published intervals (one manual edition, dated) for comparison: air-spring
forks (32/36, F-Series/FLOAT/TALAS) — lower-leg oil + FLOAT air-chamber fluid every 100 h or
annually; coil-spring forks (36 VAN, 40) — lower-leg oil every 30 h; rear shocks (FLOAT/DHX) —
air-sleeve + fluid service every 100 h or annually. Harsher conditions (wet/mud, DH racing,
winter) shorten all of these, unquantified.** *Confidence: partial — fetched from one specific
Fox owner's-manual edition ("011"); Fox interval figures are known to move across manual
editions/model years (third-party shop summaries cite different 30–50 h / 125 h bands for newer
generations that this pass could not independently fetch-confirm) — treat as directionally
right, not a pinned current-year figure.* Source: Fox "Service Intervals"
(tech.ridefox.com/fox_tech_center/owners_manuals/011/Content/Service_Intervals.html, fetched).

## Damper & friction internals (L2 — RockShox Suspension Theory Guide)

**SUS-26 — A damper's job is converting kinetic energy to heat via oil-flow restriction,
built from five parts, and the shaft's own mass forces a displacement-compensation
design choice.** Damper body (fluid chamber) + fluid (oil, the damping medium) + piston
(carries the flow ports) + seal head (keeps oil in, seals around the moving shaft) +
damper shaft (couples to the suspension) are the five basic elements. Because the shaft
has mass and introduces it into an already oil-full chamber as it moves, every damper
must accommodate that displaced volume somehow — three designs exist: **open system**
(oil displaces to any open cavity — simplest, lowest heat buildup, doubles as lubricant
for non-damper parts, but oil can aerate/mix with air); **closed system with an IFP**
(internal floating piston, spring-backed, seals oil away from an air/gas charge —
separates oil from air to reduce aeration and lets the IFP absorb thermal expansion, at
the cost of system complexity and a breakaway force from the IFP's own gas pressure);
**closed system with a bladder** (same separation benefit as an IFP, without the
breakaway force); **through-shaft** (shaft mass enters one side while leaving the
other simultaneously, eliminating the need for displacement compensation at all).
*Confidence: confirmed (manufacturer engineering-education document).* Source: RockShox
"Suspension Theory Guide" pp.14–15 (sram.com/globalassets/document-hierarchy/
service-manuals/rockshox/suspension-theory-guide.pdf, fetched 2026-07-17 — the same doc
SUS-13's spring theory content already cites; this round mined the DAMPER/FRICTION/
TUNING sections (pp.14–27) flagged as the clean pickup point in the prior Gaps entry).

**SUS-27 — Shims and check valves are how a fixed piston geometry produces
speed-sensitive, direction-separated damping — the mechanical basis for every
external clicker.** Port size can be fixed at manufacture, mechanically varied (a needle/
sleeve blocking more or less of the port), or governed by **shims** — sprung discs
stacked over a port that flex open past a pressure threshold, tunable in combination and
further adjustable by preloading the shim stack's spring. A **check valve** (built from
shims or a sprung valve) forces oil through *different* ports on compression vs rebound
so adjusting one circuit doesn't change the other — this is the physical reason a
compression clicker doesn't touch rebound feel and vice versa. **Blow-off** behavior
(how hard an impact has to be before a circuit "gives") is set by how much spring
preload backs the check valve: more preload requires more oil pressure — i.e. a harder
hit — to open it. *Confidence: confirmed.* Source: Suspension Theory Guide p.16
(fetched, as SUS-26).

**SUS-28 — Low-speed and high-speed damping are genuinely separate circuits gated by
oil pressure, not two names for the same adjuster — and this is why a fork can have
independent LSC/HSC clickers.** **Low-speed circuits** regulate the primary port at low
pressure (slow compression from weight shifts, cornering, transitions; and beginning-
stroke rebound near top-out under low spring force). **High-speed circuits** are a
secondary, blow-off-gated path that only activates once oil pressure climbs high enough
— fast compression (bump impacts, drop/jump landings) or ending-stroke rebound deep in
travel under high spring force. **Lockout** and **platform** damping are both high-speed-
circuit variants: lockout restricts flow until a preset force threshold is overcome;
platform is the same mechanism with an *adjustable* threshold, so a lighter platform
setting locks out small bumps but still yields to a real impact, and a firmer setting
needs a bigger hit to open. *Confidence: confirmed.* Source: Suspension Theory Guide
pp.17–19 (fetched, as SUS-26).

**SUS-29 — Bushing length trades stiffness for friction the same direction — longer is
both stiffer AND lower-friction per unit wear, which is why higher-end/longer-travel
chassis use longer bushings, not just bigger tubes.** A bushing's contact-surface area
scales with its length; more contact area spreads the same total friction over more
surface (reducing wear rate) while also increasing overlap between the moving parts
(increasing chassis stiffness) — the two benefits are coupled, not independent design
knobs. Separately: **glide rings** do double duty as both an oil-flow-metering damping
element (SUS-26/27's territory) *and* a piston-to-tube bushing; **rear-shock mounting
bolt torque is friction-relevant, not just a clamping spec** — RockShox states directly
that an over-tightened shock mounting bolt will **bind rather than rotate freely at the
eyelet**, causing premature bushing wear and enough shock-body flex to leak oil, distinct
from SUS-1's eye-to-eye/stroke fit checks. *Confidence: confirmed.* Source: Suspension
Theory Guide pp.21–22 (fetched, as SUS-26).

**SUS-30 — Named failure modes a mechanic should recognize by symptom: fade,
aeration/emulsification, cavitation, hydraulic lock, and spiking — five distinct causes
that can all present as "damping feels wrong."** **Fade** = temperature-driven: oil
heats from friction, viscosity drops, damping drops — reversible on cooling, but repeated
heat cycling permanently degrades the oil (replace, don't just wait for it to cool).
**Aeration** = gas mixing into the oil as bubbles under rapid cycling, changing damping
characteristics until the bubbles have time to rise back out at rest; if it goes on long
enough, aeration becomes **emulsification** — a *permanent* suspension of gas/contaminant
in the oil that no longer separates by gravity or settling, a genuine oil-replacement
condition, not a temporary one. **Cavitation** = sudden pressure swings causing bubbles
to violently collapse/fracture or oil to vaporize and then collapse — produces
noise/shockwave and can physically damage parts, not just soften damping. **Hydraulic
lock (hydra-lock)** = the shaft's displaced oil volume has nowhere to go (wrong oil
volume or contamination blocking the compensator), so the shaft physically cannot
enter the system — the damper locks solid, not just stiff. **Spiking** = port sizing
can't keep up with a very fast stroke, so oil pressure briefly spikes at the ports,
giving a sudden harsh damping feel on sharp hits distinct from a genuine high-speed-
compression tune. *Confidence: confirmed.* Source: Suspension Theory Guide p.20
(fetched, as SUS-26).

**SUS-31 — Three tuning-adjustment interactions RockShox explicitly names as
misconceptions — each is a case where one control masks rather than fixes another.**
(1) **Coil preload compensates for an undersized spring rate only by adding a required
breakaway force** — it can make suspension *feel* firmer initially, but risks harsh
top-out, premature coil set, and premature coil bind (which physically shortens usable
travel as the coils stack before the shaft finishes its stroke) — it is not a substitute
for the correct spring rate. (2) **Spring rate and rebound damping must be adjusted
together** — the spring is what generates rebound force, so a spring-rate change without
a proportional rebound-damping change leaves rebound mistuned even though nothing about
the damper itself changed. (3) **Compression damping cannot substitute for an undersized
spring** — it can make the suspension *feel* firmer on hits, but because compression
damping doesn't support the rider's static weight, the bike still sags too much and
loses usable travel; it also risks a harsh feel on hard impacts if pushed far enough to
mask the real problem. Sag/spring setup is explicitly the step to finalize *before*
tuning any damping circuit, matching this chapter's Sag & setup section. *Confidence:
confirmed.* Source: Suspension Theory Guide pp.26–27 "Common Tuning Misconceptions"
(fetched, as SUS-26).

## Fork travel vs frame

**SUS-8 — Over-travel fork vs frame rated max = WARNING; where a maker publishes an APPROVED
RANGE, outside it is an ERROR both directions.** Baseline: a fork exceeding the frame's rated
max is a warning ("exceeds the frame's rated max" — worded *rated*, not recommended, because
it's warranty-relevant). Where the maker publishes an approved travel range (`minForkTravel`,
sourced across ~15 makers — Ibis 150–170, Forbidden 160–180, HD6 180–190, SC V10 200–203…), a
fork **outside** the range is a **hard error in both directions**. Frames *without* a published
range keep the softer honest tiers. *Confidence: sourced-strict, review-confirmed.* Source:
EXPERT-REVIEW-DOSSIER.md §12 (review directive: *"any forks under or over what the manufacturer
recommends should be incompatible"*). Engine: rule 12/12b.

**SUS-9 — "Recommendation" wording vs "hard limit" wording changes the TIER.** A maker whose
own text reads as advisory (Santa Cruz's FAQ: *"We wouldn't recommend less travel than
[170 mm]… Up to 180mm is fine if that's your preference"*) should **warn**, not error, outside
the range; a maker stating a firm/warranty limit gets a hard error. The engine encodes this as
`frame.forkTravelHard` (a boolean set from the source's own language). 15 frames were tagged
hard per their verbatim source; 3 Santa Cruz trail frames softened per their re-fetched FAQ.
*Confidence: confirmed (fetched Santa Cruz text).* Source: EXPERT-REVIEW-DOSSIER.md Appendix C4;
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §12. **Still open for the mechanic:** 4 Santa Cruz frames
whose source is a bare "Fork Compatibility: X–Y mm" line with no softening language, and the
Nicolai G1's "weak accommodation" wording — should bare-range wording default hard or soft?

**SUS-10 — Under-forking is NOT guessed from a heuristic.** A shorter-than-designed fork warns
**only** when a frame carries a maker-published minimum. No travel-based heuristic is used:
high-pivot frames (e.g. Forbidden Dreadnought) ship 154 mm rear travel with 170 mm forks, so a
"fork must be ≥ rear travel" guess would false-fire. *Confidence: confirmed policy.* Source:
EXPERT-REVIEW-DOSSIER.md §12. Engine: `fork-travel-min` live per-frame as `minForkTravel` is
sourced; rule 12c warns >20 mm below `designForkTravel` (20 mm grace for deliberate builds).

**SUS-11 — Geometry rule of thumb: ~1° head-angle change per 20 mm axle-height change.**
Raising/lowering the front axle by *h* pivots the frame about the rear contact patch;
Δangle ≈ arcsin(h / wheelbase). For h = 20 mm and enduro wheelbases ≈ 1230–1280 mm →
arcsin(20/1250) ≈ **0.92°** — "~1° per 20 mm" is accurate to a decimal for this catalog's
bikes (fork-length change ≈ 1:1 with travel change on a given chassis). *Confidence: inference
(math shown); no maker publishes the ratio generically — it's geometry, not a spec.* Source:
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §12. Open mechanic question: is ~1°/20 mm the number you'd
quote a customer?

## Fork native mount / rotor (cross-reference)

**SUS-12 — A fork's native post-mount size (and thus its min rotor) can change across
generations.** See [`brakes.md`](brakes.md) BRK-8 — the Fox 38/36 pre-2027 (180 native) vs MY27
(200 native) split, and the RockShox by-stanchion min/max table — because it is a *fork* fact
that drives a *brake* rule. *Confidence: confirmed.* Source: fork-verification wave 2026-07-10
(memory `fork-verification-learnings`), carried in catalog `desc` with sram.com/ridefox.com
citations.

**SUS-13 — Verify a fork travel is a REAL offered config, not interpolated.** Makers do not
sell every travel between the endpoints: the Fox 38 has **no 150 mm** (160/170/180 only); a
Manitou Mezzer Pro "180" is not an offered SKU on Hayes' listing (150/160/170 only). Fabricated
in-between travels are a real catalog hazard — always confirm the exact SKU exists.
*Confidence: confirmed (fetched maker listings).* Source: memory `fork-verification-learnings`.

**SUS-14 — 1.8" tapered steerers are real but e-MTB-centric — no action for this catalog yet.**
The 1.8" ("SuperTaper") steerer ships, but on e-MTBs (stiffness/aesthetics). The exact-match
steerer/headset model absorbs it with a one-token vocab widening when e-bikes enter (they are a
declared non-modelled gap). *Confidence: medium-high.* Source: Bikerumor SR Suntour 1.8
SuperTaper coverage (fetched), via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §11. Open mechanic
question: seeing 1.8 on any *non*-e enduro frames yet?

## Fork axle / weight (cross-reference)

**SUS-15 — The 20×110 DH front-axle split is REAL, not a data error.** `20x110` = "20×110
Boost (DH)" and `20x110-nonboost` = "20×110 standard (DH, non-Boost)" are two real standards.
Most DH forks + all DH wheels use `20x110` (Boost); the **Marzocchi Bomber 58 is genuinely
non-Boost** (a dedicated Industry Nine "Hydra2 20×110 Non-Boost" hub was added to pair it). Do
NOT "fix" the 58 to `20x110` — it would orphan that hub and conflate two real standards. See
[`wheels-tires.md`](wheels-tires.md) for the axle-matching rule. *Confidence: confirmed (X-Fusion
RV1 38 DH page says "110x20mm Boost Axle"; the 58 confirmed non-Boost).* Source: memory
`fork-verification-learnings`.

**SUS-16 — Fork (and shock) weights verify on interfaces even when the weight stays nominal.**
Makers tie one fork weight to one travel/wheel/damper config (RockShox lists one reference
figure never tied to the catalog row's travel point; Fox/budget pages often none). Per the
2026-07-17 policy, a fork row may be `verified:true` on its **interfaces** (wheel, travel, axle,
steerer, brake mount, max/min rotor) with a **nominal weight** noted in `desc`; a per-config or
`sourceType:'measured'` weight wins when it exists. Same exception already applied to rear
shocks (most verified shocks carry nominal weights) and wheels. *Confidence: policy.* Source:
tools/VERIFY-PROTOCOL.md "Interface verification" + fork extension (Douglas 2026-07-17).

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **The frame is the master constraint for the shock:** eye-to-eye, mount type, *and* the
  supported stroke range all come from the frame (SUS-1). The trunnion-eye law (SUS-2) is a
  *consistency* constraint that couples eye length to mount type — they are not independent, so
  a claimed 250×75 *trunnion* is self-contradictory before you even look at the frame.
- **The frame also bounds fork travel** (SUS-8/9/10): rated max, an approved range (if
  published), and — separately — a published minimum. The *tier* of a travel violation is set
  by the maker's own *wording* (SUS-9), not just the numbers.
- **Fork travel couples to geometry, which couples to the whole bike:** more/less travel moves
  the head angle (~1°/20 mm, SUS-11), which is *why* over/under-forking is warranty-relevant
  rather than a pure fit question — the frame maker rates a travel because it defines the
  geometry they designed and warranty.
- **A fork's native mount couples suspension to braking** (SUS-12): the fork you pick sets the
  min rotor size — a brakes constraint that originates on the fork, and shifts by generation.
- **A frame's leverage curve is engineered around a spring-force SHAPE, not just a size**
  (SUS-17): coil is linear, air is progressive, so per-frame coil approval (SUS-5) is really
  asking "was this leverage curve designed around a linear-force input?" — the shape mismatch,
  not just "does a coil shock physically bolt on," is the underlying reason.

### Mismatch failure modes
- **Hard "won't fit":** wrong shock eye-to-eye or mount (SUS-1); a longer-than-spec stroke
  (over-rotation / bottom-out contact); a shock on a hardtail (SUS-6); a fork outside a
  *published approved range* on a hard-limit frame (SUS-8/9).
- **"Fabricated spec" (data error, not a build outcome):** a trunnion mount on a std-only eye
  (SUS-2) — the row itself is wrong; it would ship a false "fits."
- **"Works but reduced / out-of-spec" (warning):** shorter-than-spec stroke → less travel
  (SUS-1/4); over-travel fork on a soft-limit frame (SUS-8); a coil shock on a maker-flagged
  non-coil frame (SUS-5).
- **Silent-and-fine:** a shorter fork within a published range; a 185×55 *standard* shock where
  the frame takes it (SUS-3).

### Install-order dependencies
- **Stroke is set before the shock is fit to the frame** (SUS-4): a Travel Reducer + washer is
  installed in the shock to land on the frame's supported stroke — and *"consult your frame
  manufacturer"* precedes it, because the frame's design determines allowable stroke.
- **Air vs coil spring is chosen against the frame's leverage/approval** (SUS-5): coil approval
  is checked before fitting a coil, and never inferred from the curve.
- **Fork lower-leg / air-spring service and travel changes are maintenance-order coupled** — an
  internal travel spacer changes travel *and* the geometry it implies (SUS-11).
- **Spring/sag is set before damping is tuned** (SUS-21/22/23): both RockShox's and Fox's own
  procedures set air pressure/sag FIRST (with an equalization-cycle step), then rebound/compression
  are dialed in against that baseline — damper settings tuned against the wrong sag are being
  tuned against a moving target.

### Damper-internal couplings (new this round)
- **Low-speed and high-speed circuits are pressure-gated, not two labels for one
  adjuster** (SUS-28) — this is *why* independent LSC/HSC clickers don't interact: they
  physically govern different oil paths that only both open once stroke speed/pressure
  crosses a threshold.
- **A damper's failure modes have distinct causes that produce similar-sounding
  symptoms** (SUS-30) — "damping feels off" could be heat-driven fade (reversible),
  aeration en route to permanent emulsification (oil-replacement condition), a
  contamination-driven hydraulic lock (damper physically won't move), or spiking
  (a sharp-hit artifact, not a tune problem) — misdiagnosing which one sends the part
  to the wrong fix.
- **Bushing length is a shared knob for stiffness AND friction/wear, not a tradeoff
  between them** (SUS-29) — longer bushings are simultaneously stiffer and lower-wear,
  which is why higher-end/longer-travel chassis use longer bushings rather than treating
  stiffness and durability as opposing choices.
- **Tuning one control to compensate for another masks rather than fixes the
  underlying mismatch** (SUS-31): coil preload for an undersized spring risks coil
  bind/premature top-out; compression damping for an undersized spring leaves the bike
  still sagging too deep even though impacts feel firmer. Both interactions mean a
  mechanic reading "feels harsh" or "feels soft" off the bike alone can misattribute a
  spring-rate problem to a damper-tune problem.

### Wear / setup couplings
- **Reduced stroke changes the leverage the frame sees** — running a frame at a non-design
  stroke shifts where in the travel it operates, which is why SUS-4 defers to maker-supported
  strokes rather than a computed figure.
- **Over-forking loads the frame beyond its rated envelope** — the warranty framing of SUS-8 is
  a durability/fatigue coupling, not just a geometry preference.
- **Coil vs air changes the spring curve** the frame was tuned for — the reason coil approval
  (SUS-5) is a per-frame maker statement, not a universal.
- **Coil set is a fatigue failure mode distinct from damper wear** (SUS-18): a coil shock
  feeling harsher/shorter-travel after years of service may need a spring check before a damper
  teardown — misdiagnosing coil set as a damper fault sends the part to the wrong service step.
- **Service cadence and stroke/travel settings interact** — a shock run at a reduced stroke
  (SUS-4) or a fork/shock overdue for its interval band (SUS-24/25) both change how the
  suspension behaves independent of anything the compat engine checks; a "green" build says
  nothing about maintenance state.

---

## Gaps

Honest list of what a future round needs to close to move this chapter past `foundation`:

- **Closed 2026-07-17 (SUS-26–31): the RockShox Suspension Theory Guide's DAMPER (p.14),
  FRICTION (p.21) and TUNING (p.26) sections are now mined** — damper construction/
  displacement-compensation design choices, shim/check-valve mechanics, low/high-speed
  circuit separation (incl. lockout/platform), bushing length↔stiffness↔friction coupling,
  five named failure modes (fade/aeration/emulsification/cavitation/hydraulic-lock/
  spiking), and three named tuning misconceptions. **Still open:** this is theory-guide
  depth (how a generic damper works and fails), not a per-model **SERVICE**-manual (oil
  volumes, seal-kit part numbers, exact shim-stack specs, step-by-step rebuild procedure
  for a specific Fox/RockShox model). A future round targeting a specific service manual
  (e.g. a 2018-2022 Deluxe rear-shock service manual, also found this round at
  sram.com/globalassets/document-hierarchy/service-manuals/rockshox/rear-suspension/
  2018-2022-deluxe-service-manual.pdf but not yet fetched/mined) is the next L2 layer.
  **L2 gap remaining, narrower than before.**
- **No torque-spec table** for shock hardware (mounting bolts, air-can/end-cap torque, travel
  spacer bolts) or fork hardware (axle pinch bolts, crown bolts, air-spring top-cap torque).
  **L2 gap.**
- **Fox service intervals are pinned to one dated manual edition ("011")** — SUS-25 flags that
  third-party shop pages cite different current-generation bands (30–50 h / 125 h) this pass
  could not independently fetch-confirm from ridefox.com/tech.ridefox.com directly (site
  structure resisted a clean current-edition fetch). Re-fetch the current owners-manual edition
  and reconcile. **L1 completeness gap** (not L2 — this is still "what's the number," not
  service internals).
- **No numeric coil-spring-rate selection chart** (rider weight + frame leverage ratio → lb
  spring recommendation). RockShox publishes a "Suspension Fork Coil Spring Chart" but it surfaced
  this round only via a third-party (yumpu) mirror, not a clean fetchable sram.com page/PDF —
  skipped rather than cited from a mirror. Worth a targeted re-fetch attempt (possibly via Bright
  Data if WebFetch/Exa can't reach the primary PDF). **L1/L3 gap** (a *general* selection
  heuristic is arguably L1; a *frame-leverage-adjusted* chart is L3 wheel/suspension-tuner
  territory).
- **sheldonbrown.com checked and confirmed thin for this chapter, as the curriculum predicted** —
  its suspension-adjacent content is 1990s Cannondale Headshok elastomer-fork service (an
  obsolete non-air/coil design), not applicable to this catalog's modern air/coil MTB suspension.
  Not re-attempted; future rounds shouldn't re-try this site for this chapter.
- **No leverage-ratio / kinematics engineering detail** — how a frame's linkage produces a
  progressive vs. linear (or mixed) rear-suspension rate curve, and how that curve interacts with
  air vs. coil spring choice beyond the qualitative SUS-17 note. **L3 gap** (frame-engineer
  territory, not generalist).
- **No suspension-tuning-as-race-strategy notes** — pressure/rebound trade-offs for race
  conditions, pit-stop rebuild/swap procedures, what actually breaks under World Cup loads.
  **L4 gap** — the furthest-out level per CURRICULUM.md, expected to arrive last.

## Open mechanic questions (for the human review — do not act)
- SUS-9: should a bare "Fork Compatibility: X–Y mm" line (no softening language) default to a
  hard error or a soft warning? (4 Santa Cruz frames + Nicolai G1 flagged.)
- SUS-11: is ~1°/20 mm the number you'd quote at the counter?
- SUS-4: is a ±3–5 mm error in a quoted reduced-travel figure acceptable, or should the message
  drop the number entirely? Should it name "Travel Reducer" (RockShox-specific) on other makers?
- SUS-14: 1.8" steerers appearing on any non-e enduro frames yet?
