# Suspension — Mechanic Corpus

**Maturity: professional** (L1 coverage + the RockShox Suspension Theory Guide's
DAMPER/FRICTION/TUNING sections landed 2026-07-17 (SUS-26–31), followed same-day by a
genuine per-model SERVICE-manual pass — the RockShox 2018-2022 Deluxe service manual
(SUS-32–37: torque table, IFP-depth-by-stroke, oil-fill methods, bottomless-token
limits), Fox's FLOAT X + 36 tech-center pages (SUS-38–41), and the RockShox 2019-2022
Lyrik / 2019-2023 Yari fork service manual (SUS-42). **2026-07-18: the current-generation
(2023-2026) ZEB/Lyrik/Pike fork service manual landed too (SUS-43/44), the same round
recovered SUS-42's originally-garbled 2019-2022 oil-volume table in full (SUS-45), AND
Fox's own current-gen fork (air spring + GRIP X damper, SUS-46) and shock (FLOAT X + DHX,
SUS-47) service manuals proper landed** — both majors now have genuine L2 service-manual
depth across BOTH fork and rear-shock, closing every round-4 pickup point for this
chapter. Now meets CURRICULUM.md's `professional` bar (L1 complete + meaningful L2 depth
across most of the chapter's parts) rather than merely approaching it. Still short of
`master`: coil-shock/coil-fork internals (Vivid/Super Deluxe Coil, RockShox coil fork
options, Fox DHX2/coil variants) are untouched, no unified cross-brand torque-spec table
exists yet, and no L3 kinematics/leverage-ratio depth — see "## Gaps" below.)

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

## Service manual internals (L2 — RockShox Deluxe 2018-2022 + Fox FLOAT X / 36)

**SUS-32 — RockShox Deluxe (2018-2022) piston/lock-piston/seal-head torque values, by
damper-electronics family, cross-confirmed between the manual's summary table AND its
numbered procedure steps (both agree).** Piston nut: **RCT/NUDE/NUDE2/SCOTT RL3 family
= 6.2 N·m (55 in-lb)** via a 12 mm socket (RCT) or the NUDE Piston Bolt Socket
(NUDE/NUDE2/SCOTT RL3); **RT3/RLR/Ultimate Remote/RL/RT/R family = 4.5 N·m (40 in-lb)**
via a 12 mm socket (RT3, 2019-2022 RL/RT) or 10 mm socket (RLR/Ultimate Remote, 2018
RL/RT, R). Lock piston (RCT/NUDE family only) = **4.5 N·m (40 in-lb)** via a 24 mm
open-end wrench on the RCT/NUDE Lock Piston Tool. Seal head/air piston (all variants,
during final bleed/assembly) = **28 N·m (248 in-lb)** via a 17 mm crowfoot. Eyelet
assembly torqued into the air can body = **10 N·m (90 in-lb)**, crowfoot size set by
eyelet type (13 mm standard / 29 mm bearing / 54 mm trunnion). *Confidence: confirmed
(fetched, self-consistent across table + steps).* Source: RockShox "2018-2022 Deluxe /
2020+ Deluxe Nude Traction Control Service Manual" (GEN.0000000006487 Rev D,
sram.com/globalassets/document-hierarchy/service-manuals/rockshox/rear-suspension/
2018-2022-deluxe-service-manual.pdf, fetched 2026-07-17 — downloaded directly, the
file exceeded WebFetch's size cap so it was pulled with curl and read via pdftotext,
still a fetched-primary manufacturer PDF, not a search summary), "Torque Values" table
p.8 + Piston Service steps 18-19 pp.54-55 + Shock Assembly and Bleed step 5 p.60/61.

**SUS-33 — Deluxe IFP insertion depth is a precise per-stroke table, not one number, and
the table itself splits by damper-electronics generation (two different depth curves for
the same nominal strokes).** Family A (2020-2022 Ultimate RCT, 2020-2021 NUDE/2022-2023
NUDE2/SCOTT RL3, 2019-2022 RL/RT) — coarse 4-band table: 35 mm→49.5 mm, 37.5-45 mm→58 mm,
47.5-55 mm→66.5 mm, 57.5-65 mm→75 mm. Family B (2018-2019 RLR/2020-2022 Ultimate Remote,
2018-2020 RT3, 2018 RL/RT, 2018-2022 R) — fine-grained 2.5 mm-step table across the same
35-65 mm stroke range (48.1 mm→73.5 mm), **with an OEM exception**: a Trek PowerFly-specific
50 mm stroke uses 67.2 mm IFP depth instead of the standard 50 mm→60.8 mm figure — the
same "verify the exact offered config, don't interpolate" discipline SUS-13 already
established, now with a documented OEM-specific override inside one nominal stroke.
*Confidence: confirmed (fetched table).* Source: same Deluxe Service Manual, "IFP and
Damper Body Service" p.58-59.

**SUS-34 — Deluxe's two oil circuits use genuinely different fill methods — one
"level-fill," one precision-metered — inside the same rebuild.** The **damper body**
(Maxima PLUSH 7wt Suspension Oil, backwards-compatible with RockShox 7wt) is filled by
**pouring until level with the top of the body** — no cc figure. The **air can**
lubricant (Maxima Extra 15w50 or Maxima PLUSH Dynamic Suspension Lube Light) is
**precision-metered: 1 mL injected before air-can installation, then another 1 mL after
flipping the shock to the damper-body side — 2 mL total**, equivalently described as
"half of the included pillow pack per injection; 1 pillow pack = 2 mL." *Confidence:
confirmed.* Source: same Deluxe Service Manual, Damper Body Service step 2 p.45 (level
fill) + Air Can Installation steps 2-3 p.68 (metered fill).

**SUS-35 — Deluxe damper air/nitrogen charge pressure is model-specific — RCT is
confirmed at 400 psi; the remaining five model families' pressures (350/500/420/350 psi)
are stated in the manual but the exact model↔pressure pairing could NOT be reconstructed
with confidence from the fetched text.** The manual's pressure-bleed step (200 Hour
Service, Shock Assembly and Bleed step 8) lists six model groups — RCT, RT3,
NUDE/NUDE2/RL3/RLR/Ultimate Remote, 2018 RL/RT, 2019-2022 RL/RT, R — against only five
distinct psi values in table order (400, 350, 500, 420, 350), meaning at least one model
group shares a value with an adjacent one and the PDF-to-text table extraction could not
disambiguate which. RCT=400 psi is safe (unambiguous first-row pairing); nitrogen may be
substituted for air with the proper fill equipment. **Do not treat the other five
model↔psi pairings as established** — this is a case for SUS-2/6's "silence beats a
confident wrong fact": re-verify against the manual's actual table graphic (not the
text-extracted layout) before using any pairing beyond RCT for a customer-facing figure.
*Confidence: partial — one value confirmed, five ambiguous by extraction, not by the
source.* Source: same Deluxe Service Manual, Shock Assembly and Bleed step 8 p.61-62.

**SUS-36 — Deluxe's Bottomless Tuning tokens cap volume-reduction the same way Fox's
volume spacers do (cross-brand pattern, see SUS-39/SUS-40's Fox equivalent) — a hard
maker-stated maximum, not a "more is always fine" knob.** Standard Bottomless Tokens:
max 3. The higher-reduction "Gnar Dog Token" (equivalent to 2.5 Bottomless Tokens) may
only be installed **one at a time**, must be the **first** token nearest the eyelet, and
when installed caps additional Bottomless Tokens at 2 (not 3). NUDE/NUDE2/SCOTT RL3
dampers ship with factory tokens the manual explicitly says **not** to remove. A
"Sonar Token" variant ships factory-installed in certain Specialized OEM shocks,
standard-eyelet-only, not sold separately. *Confidence: confirmed.* Source: same Deluxe
Service Manual, "Bottomless Tuning" pp.39-40.

**SUS-37 — RockShox's Deluxe manual does not publish a frame-side shock mounting-bolt
torque spec — it explicitly defers to the bike manufacturer.** The eyelet/bushing
mounting hardware install section (p.70-71) covers pin/spacer press-fit assembly and
says only "reinstall the shock to your bicycle frame according to the bicycle
manufacturer's instructions" — no N·m figure. This means SUS-29's "over-tightened
mounting bolt binds the eyelet rather than rotating freely" caution is real, but the
actual torque number to avoid it is a **frame-maker spec, not a shock-maker spec** —
relevant if a future torque-spec table gap-fill goes looking for one number and finds
none, because none exists at the shock-maker level. *Confidence: confirmed (fetched
absence).* Source: same Deluxe Service Manual, "Mounting Hardware Installation" p.70-71.

**SUS-38 — Fox FLOAT X (2022+) publishes an IFP depth table keyed to reservoir SIZE
(not stroke, unlike RockShox's per-stroke Deluxe table) plus a fixed IFP pressure.**
IFP height: Short reservoir 33 ±1.25 mm, Medium 37 ±1.25 mm, Long 41 ±1.25 mm,
XL 45 ±1.25 mm. IFP pressure: **150 psi ±10 psi, the same figure across all 2022+
FLOAT X shocks** regardless of reservoir size (contrast RockShox's Deluxe, which varies
damper pressure by model per SUS-35). Seal kits: 803-01-727 (air sleeve, 2022+),
803-04-251 (damper rebuild Gen 2, 2024+). Damper oil: FOX 4wt Suspension Fluid
(025-03-063, 1 L bottle). Air-chamber oil: FOX 20wt Gold (025-03-072). Base valve bolt
torque: **60 in-lb (6.8 N·m)**. *Confidence: confirmed (fetched maker page, current
generation).* Source: FOX "FLOAT X Part Information" (tech.ridefox.com/bike/
parts-drawings/3051/float-x-part-information, fetched via Exa 2026-07-17 — WebFetch on
tech.ridefox.com's underlying JSON-driven page did not resolve cleanly, per the prior
Gaps note; Exa's markdown render succeeded, same fetch-tier as WebFetch per
VERIFY-PROTOCOL.md's doctrine) + "2022-2026 FLOAT X Rebuild" (tech.ridefox.com/bike/
service-procedures/1139/2022-2026-float-x-rebuild, same fetch), step 13.

**SUS-39 — Fox 36 fork bath-oil volumes are circuit-specific and differ by an order of
magnitude between air and damper side, and by damper type on the damper side.** All
air-side bath: **10 cc FOX 20wt Gold oil**. FIT4 damper-side bath: **15 cc FOX 20wt
Gold**. GRIP/GRIP2 VVC damper-side bath: **40 cc 5wt FOX Teflon-infused oil** — nearly
3x the FIT4 volume, a genuinely different damper architecture needing more bath fluid,
not a typo. Damper cartridge oils differ from bath oils: FIT4 and GRIP/GRIP2 VVC
cartridges use 5wt Teflon-infused oil (025-03-023) for the sealed cartridge itself,
separate from the bath. *Confidence: confirmed (fetched maker page).* Source: FOX
"36mm Part Information" (tech.ridefox.com/bike/parts-drawings/2802/36mm-part-information,
fetched via Exa 2026-07-17), "Oil Information" table.

**SUS-40 — Fox 36 FLOAT NA3 Glidecore air-spring rebuild (2026+) torque spec chain, and
its metered air-chamber oil charge.** Capture Plate onto Neg Plate Housing: 50 in-lb
(no N·m given). Upper piston onto lower piston (28 mm socket): 80 in-lb. Base stud into
shaft (12 mm crowfoot): **50 in-lb (5.7 N·m)**. Topcap into fork crown (6-point
chamfer-less 26 mm socket): **220 in-lb (24.8 N·m)**. Bottom nuts (after lower-leg
reassembly): air-spring side **50 in-lb (5.7 N·m)**; damper side **110 in-lb (12.4 N·m)
for GRIP X/GRIP X2 dampers, 150 in-lb (16.9 N·m) for GRIP dampers** — a damper-family-
dependent bottom-nut torque, the fork-side analog of SUS-32's damper-family-dependent
shock torques. Air-chamber charge: **3 cc FOX 20wt Gold oil** injected into the main
air chamber through the top of the upper tube before topcap reinstall (compare SUS-34's
RockShox metered air-can fill — both makers meter the air-side lubricant precisely
while treating the damper-side fill more loosely). Red Loctite 262/263 is used at
different threaded joints (never both) — 262 inside the shaft at the base stud, 263 at
the Capture Plate and piston threads. *Confidence: confirmed (fetched maker page,
current generation, cross-checked across three near-identical 2026/2026-2027/2026-SL
NA3 Glidecore rebuild pages that share the same torque figures).* Source: FOX "2026
36 FLOAT NA3 Glidecore Air Spring Rebuild" and "2026-2027 36 FLOAT NA3 Glidecore Air
Spring Rebuild" (tech.ridefox.com/bike/service-procedures/3075/…, fetched via Exa
2026-07-17).

**SUS-41 — Fox's own current-generation service interval, fetch-CONFIRMED, resolves
(partially) the prior round's open question.** Both the FLOAT X shock and the 36mm fork
part-information pages state a single **"Full Service 125 Hours"** interval for the
current generation — matching the higher end of the 30-50 h/125 h band that SUS-25
flagged from third-party shop citations it could not independently confirm. **This is
not a full reconciliation**: it's one current "Full Service" figure with no shorter-
interval tier shown on these pages (unlike RockShox's SUS-24 two-tier 50 h/200 h
structure, or the older Fox "011" owner's-manual edition's split lower-leg-oil-vs-
air-sleeve tiers) — whether Fox still publishes a shorter interim check interval
elsewhere wasn't found this round. Treat as a partial close of SUS-25's gap: the 125 h
figure is now fetch-confirmed for current FLOAT X/36, not just third-party-cited.
*Confidence: confirmed (fetched, current generation) for the 125 h figure; open whether
a shorter interim interval exists elsewhere.* Source: FOX "FLOAT X Part Information"
and "36mm Part Information" (tech.ridefox.com, fetched via Exa 2026-07-17), "Maintenance
Information" / "Service Interval" rows.

**SUS-42 — RockShox's own fork SERVICE manual (2019-2022 Lyrik / 2019-2023 Yari) is now
fetched, closing the specific "RockShox fork service manuals remain unmined" target the prior
round flagged as this chapter's next L2 step.** Full torque table extracted cleanly: air
spring shaft nut 3.3 N·m, top caps 28 N·m, bottom bolts 7.3 N·m, Bottomless Token bolts 4 N·m,
Charger-damper-into-cartridge-tube (Yari) 9 N·m, rebound damper seal head (Charger 2/2.1,
Lyrik) 5.1 N·m, DPA adjuster-knob retaining nut 2 N·m, plus five sub-2 N·m set-screw/retaining
figures for compression knobs and remote spools — a genuinely fork-specific torque table,
distinct from (and more granular than) the rear-shock table SUS-32/40 already carry. The
manual's recommended-interval structure mirrors the rear-shock two-tier pattern: every-ride
wipe-down, 50-hour lower-leg service, 200-hour full damper+spring service. **Oil volume/
lubricant table only partially usable:** the extracted text preserves lubricant TYPE per
circuit cleanly (Maxima PLUSH 3wt for Charger dampers' bleed, PLUSH Dynamic Suspension Lube
Light/Heavy for DebonAir upper/lower legs, RockShox 5wt for Motion Control) and one clean
figure — Motion Control lower-leg oil: **100-106 mm oil height, 180 mL** — but the per-model
mL/height numbers for the DebonAir/Charger rows collapsed into an unreadable column jumble on
extraction (a table-layout artifact, not a source ambiguity like SUS-35's). **Fully recovered
2026-07-18 — see SUS-45**: the Charger-family rows weren't actually garbled data, they were
genuinely bleed-only (no oil-height/volume figure exists for them at all); Motion Control's
100-106mm/180mL was the only numeric fill that row-type ever carried, so SUS-42's one clean
figure was in fact the complete Motion Control answer. *Confidence: confirmed (fetched primary)
for the torque table and the oil figures (both now complete via SUS-45).* Source: sram.com
"2019-2022 Lyrik 2019-2023 Yari Service Manual"
(GEN.0000000007193 Rev C, fetched via Exa after the raw PDF exceeded WebFetch's size limit).
Still open (at the time SUS-42 was written): the CURRENT-generation (2023-2026) combined
ZEB/Lyrik/Pike manual exists at sram.com but is too large to fetch even via Exa's default
extraction. **Closed this round — see SUS-43/44.** Coil-fork service (RockShox's own coil
options) and Fox's fork-side service manual (vs. the part-info pages SUS-41 used) remain
unattempted.

**SUS-43 — RockShox's CURRENT-GENERATION combined fork service manual (2023-2026 ZEB /
2023-2027 Pike / 2023-2026 Lyrik, GEN.0000000007161 Rev C) is now fetched and mined,
closing the SUS-42 "too large to fetch" gap.** The raw PDF (33 MB, 187 pages) exceeded
both WebFetch's and Exa's extraction caps, exactly as SUS-42 flagged — resolved by
`curl -L`-ing the direct sram.com PDF URL to disk and running `pdftotext` locally. Full
Torque Values table (page 10) extracted cleanly and cross-checked two ways: `pdftotext
-raw` (row-major, Part/Tool/Torque triples in source order) against a rendered page image
read directly — both agree exactly. Selected figures (all N·m): air spring top cap
(DebonAir+ or Dual Position Air) 28.2, Bottomless Token 3.9, ButterCups housing (upper-
to-lower, air spring or damper side) 14.1, piston nut — compression damper (Charger 3 /
3.1) 1.1, piston nut — rebound damper (Charger 3 / 3.1) 3.2, sealhead-to-cartridge-tube
(Charger RC / Rush RC) 16.9, sealhead-to-cartridge-tube (Charger 3 two-piece) 14.1, lower
leg bottom bolt (air spring + damper) 7.3, lower leg plug 1.9, Maxle Stealth 9-13.5, fender
bolt 0.3. This is a genuinely distinct, current-generation table from SUS-42's 2019-2023
figures — several parts share the same N·m value across generations (e.g. Bottomless Token,
ButterCups/top-cap family at 28.2/14.1) but the current Charger 3/3.1 piston-nut and
sealhead figures are new part numbers not present in the prior-gen table. *Confidence:
confirmed (fetched primary, cross-verified via two independent extraction methods).*
Source: sram.com "2023-2026 ZEB and Lyrik 2023-2027 Pike Service Manual"
(GEN.0000000007161 Rev C), fetched via direct PDF download + local `pdftotext`/
`pdftoppm` 2026-07-18.

**SUS-44 — The current-gen Oil Volume and Lubricant table (same manual, page 11) is
mostly-sparse BY DESIGN, not by extraction failure — confirmed by reading the rendered
table image directly, not by text extraction.** Unlike SUS-42's 2019-2023 table (garbled
by a `pdftotext -layout` column-alignment artifact), this table's text-extraction
"sparseness" is real: `pdftotext -raw` and a rendered-page visual read agree that the
Damper Upper Tube oil VOLUME (mL) cell is genuinely blank for every fork/tier in the
table — RockShox publishes the upper-tube damper oil WEIGHT (7wt for Charger 3.1 RC2 /
Charger 3 RC2 / Delta RC; 3wt for Charger RC / Rush RC) but not a fill volume in mL for
any current-gen damper, a real change from SUS-32's rear-shock tables which do carry
volumes. Three numeric fills ARE published — Damper Lower Leg oil volume **30 mL**,
Spring Upper Tube oil volume **3 mL (+) / 1 mL (−)**, Spring Lower Leg oil volume
**15 mL** — but **CORRECTION to an earlier draft of this fact: these are NOT a
table-wide constant.** A dedicated crop isolating just the numeric columns across the
full row range (`pdftoppm -r 400`, `-x/-y/-W/-H` to trace exact row alignment) shows the
RC/RC2-tier rows (Ultimate/Select+/Select/Base × Charger 3/3.1/RC/Rush RC, both ZEB and
Lyrik/Pike) have blank Volume(mL) cells throughout — ruling out a constant spanning the
*whole* table. The three numbers sit specifically at the **2027 ZEB (A3) Base Delta RC**
row. Whether they also apply to the externally-identical **2027 Lyrik (D2) Base Delta
RC** row (same damper, same lubricant TYPE labels — Lube Medium / Lube Heavy / SG920
Grease) could NOT be confirmed: a crop of that row's Volume(mL) cells shows them blank
too, and because the ZEB and Lyrik Delta RC rows are non-adjacent in the table (the
2023+ Lyrik (D1)/Pike (C1) block sits between them), one merged cell cannot literally
span both — so a "published for ZEB only" reading and a "merged but my crop cut it off"
reading are both consistent with what's on the page. **Treat 30/3/1/15 mL as confirmed
for the ZEB (A3) Base Delta RC row only; not confirmed for Lyrik (D2) Base Delta RC** —
per corpus rule 6, silence beats guessing they're shared. Lubricant *type* (not
volume) does vary, and it varies specifically at one tier boundary: every RC/RC2-tier
damper (Ultimate/Select+/Select/Base's Charger 3, Charger 3.1, Charger RC, Rush RC) uses
Maxima PLUSH Dynamic Suspension Lube **Light** (damper lower leg) / **Heavy** (spring
upper tube, universal) with **SRAM Butter Grease** on the air-piston, while the newest
Base-tier **Delta RC** damper (2027 ZEB (A3) and 2027 Lyrik (D2)) switches to Maxima PLUSH
Dynamic Suspension Lube **Medium** (both damper and spring lower leg) with **Maxima SG920
Grease** on the air-piston — a real service-relevant distinction (wrong lube grade on a
Delta RC lower leg service is a documented-vs-guessed error, not interchangeable with the
RC/RC2 spec). One asymmetry confirmed by direct visual read, not assumed symmetric: the
Damper Upper Tube Volume cell reads **"Bleed"** (no numeric fill, bleed-only procedure)
for the **2027 ZEB (A3) Base Delta RC** row specifically; the equivalent **2027 Lyrik (D2)
Base Delta RC** row's same cell is blank, not "Bleed" — the manual does not state the
Lyrik Delta RC's upper-tube damper service method in this table at all. Spring type is
DebonAir+ across nearly every row, with a Dual Position Air variant offered alongside
DebonAir+ specifically on 2023+ ZEB (A2) Select and Base tiers. *Confidence: confirmed
(fetched primary; every value in this fact was cross-checked against a directly-rendered
page image, not inferred from ambiguous extracted text — the corpus rule 6 "not
established" bar was the reason for the extra verification step, not skipped because of
it).* Source: same manual as SUS-43, page 11 "Oil Volume and Lubricant" table.

**SUS-45 — SUS-42's flagged "garbled" 2019-2022 Lyrik / 2019-2023 Yari oil-volume table
is now fully recovered, closing that gap — and the recovery reveals the collapse was a
genuine text-extraction failure this time (unlike SUS-44's superficially-similar
sparseness), fixed the same way: `pdftoppm -png -r 250` + direct image read of manual page
11.** Full table: every **Charger-family damper** (Charger 2, Charger 2.1, Charger RC —
i.e. every RC2/RCT3/RCT R/RC/RC R tier Lyrik and the Yari RC's "Charger RC" option) is
**bleed-only** — Maxima PLUSH 3wt oil weight, no oil height, Volume cell reads **"Bleed"**
literally, matching the current-gen table's RC/RC2-tier pattern in SUS-44. Every **Motion
Control damper** (Yari RC 2019-2020, Yari RC / Yari (29+) RC 2021-2023 — the non-Charger
option) carries the one figure SUS-42 already had right: RockShox 5wt oil, **100-106 mm
oil height, 180 mL**. Three more values are universal constants across the whole table
(same merged-cell convention as SUS-44's current-gen table): Damper Lower Leg oil
(Maxima PLUSH Dynamic Suspension Lube Light) volume **10 mL**; Spring Upper Tube oil
(Maxima PLUSH Dynamic Suspension Lube Heavy) volume **3 mL (+) / 1 mL (−)** — identical
figures to SUS-44's current-gen table, confirming the spring-side fill hasn't changed
across generations; Spring Lower Leg oil (Maxima PLUSH Dynamic Suspension Lube Light)
volume **10 mL**. Grease is SRAM Butter Grease on the air piston, universal (no SG920
alternative exists in this generation — SUS-44's Delta RC/SG920 pairing is current-gen
only). A footnote (*) clarifies "Oil Height" is measured from the crown top down to the
oil, not from the lower-leg bottom. *Confidence: confirmed (fetched primary, recovered by
direct image read after two text-extraction methods both collapsed the table).* Source:
sram.com "2019-2022 Lyrik 2019-2023 Yari Service Manual" (GEN.0000000007193 Rev C), same
PDF SUS-42 cited, re-fetched via direct download + local `pdftoppm` 2026-07-18.

**SUS-46 — Fox's own current-gen FORK service manual (not the part-info pages SUS-41
used) is fetched and mined for both halves of the fork: air spring and damper.** Unlike
RockShox's PDF manuals, Fox publishes these as numbered step-by-step web pages at
tech.ridefox.com/bike/service-procedures/ — some are text throughout (fetched cleanly via
Exa after WebFetch returned only the parts/tools lists and warnings, not the numbered
steps), while others genuinely defer the actual procedure to an embedded video with no
text fallback (confirmed dead end, not a fetch failure — see the tier note below). The
**2026-2027 36SL FLOAT NA3 Glidecore air spring rebuild** (text, 25 numbered steps) gives:
base stud torque 50 in-lb (5.7 N·m) with red Loctite 262 on the shaft threads, main air
chamber fill 3 cc of FOX 20wt Gold oil, topcap torque 220 in-lb (24.8 N·m), lower-leg
bottom nuts 50 in-lb (5.7 N·m) each side. The **2025-2026 GRIP X damper rebuild** (text,
23 numbered steps — Fox's current-gen damper, a genuine SERVICE-manual-depth text page
unlike the older/other-size-fork "2017-2027 GRIP Damper Rebuild" page which defers
entirely to video) gives: LSR check housing 9 in-lb, check-shim T6 Torx fastener 4 in-lb,
piston base 30 in-lb, HSC adjust-hat set screws 2.5 in-lb (0.3 N·m), piston bolt 17 in-lb,
damper fill FOX 4wt oil to the level of the bleed holes, topcap 100 in-lb (11.3 N·m) with
blue Loctite 243 on the threads. **Tier note (corpus rule 5):** the older-generation "GRIP
Damper Rebuild (32/34/36/38/40mm)" page was checked and confirmed to have NO text
procedure at all — both WebFetch and Exa return only the required-parts/tools list and
safety warnings, with the actual numbered steps stated to live "in the video"; this is a
Fox documentation-format choice (video-only for that specific page), not a tool
limitation, and a future round should not re-attempt fetching that particular page's
steps as text — an OCR/video-transcription tool would be needed, not a better fetcher.
*Confidence: confirmed (fetched primary, numbered procedure text, current-gen pages).*
Source: tech.ridefox.com "2026-2027 36SL FLOAT NA3 Glidecore Air Spring Rebuild"
(service-procedures/3065) + "2025-2026 GRIP X Damper Rebuild" (service-procedures/2934),
both fetched via Exa 2026-07-18.

**SUS-47 — Fox's own current-gen SHOCK service manual (FLOAT X and DHX, 2022-2026) is
fetched too, and it exposes a genuine cross-model torque difference on a part the
manual itself calls shared.** Both manuals open with "many assemblies are shared between
the FLOAT X and DHX shocks... some images... may show a [the other] shock" — yet the
**shaft eyelet install torque is NOT the same number between them**: FLOAT X eyelet
110 in-lb (12.4 N·m) vs. DHX eyelet 245 in-lb (27.7 N·m), both with red Loctite 277 on
the first 2-3 threads — more than double, on a part described as shared design. This is
exactly the kind of cross-model torque-generalization trap `cockpit-contact.md` CKP-12/13
and `wheels-tires.md` WHL-37 already documented in other categories — worth flagging
explicitly since the manual's own "shared assemblies" language could mislead a mechanic
into assuming a shared torque too. Other current-gen figures, common to both where the
procedures overlap (both use FOX 4wt Suspension Fluid): base valve bolt 60 in-lb (6.8
N·m), main piston bolt 80 in-lb (9.0 N·m), reservoir-to-body 240 in-lb (27.1 N·m) with
blue Loctite 243, IFP bleed screw 7-8 in-lb (0.8-0.9 N·m), air fill cap 3 in-lb (0.3
N·m). IFP pressure is set during vacuum-bleed fill, not just measured: DHX's procedure
sets it to **150 psi** at final assembly. A "stuck down" failure-mode test is documented
for both (pressurize to 250 psi/17 bar after fully releasing positive-chamber air; if the
shock doesn't fully extend, it's stuck down and must NOT be serviced further — contact an
Authorized Service Center) — a genuine safety-relevant diagnostic fact with no RockShox
rear-shock equivalent sourced in this chapter yet. *Confidence: confirmed (fetched
primary, numbered procedure text, current-gen pages).* Source: tech.ridefox.com
"2022-2026 FLOAT X Rebuild" (service-procedures/1139) + "2022-2026 DHX Rebuild"
(service-procedures/1140), both fetched via Exa 2026-07-18.

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
- **Damper-family (not just model line) sets its own torque and fill numbers within one
  product** (SUS-32/40): a Deluxe RCT piston nut torques differently than an RT3 on the
  *same* shock body; a 36's GRIP-damper bottom nut torques differently than its GRIP X/X2
  sibling — service data is keyed to the internal damper electronics, not the outer part
  name alone.

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
- **IFP position must be set BEFORE the shock is bled and pressurized, and its correct depth
  itself depends on a different variable per brand** (SUS-33/38): RockShox keys IFP depth to
  **shock stroke**; Fox keys it to **reservoir size**. Getting the IFP order or reference wrong
  produces a shock with the wrong effective negative-chamber volume before a single air-pressure
  reading is even taken — an install-order dependency invisible from the outside once assembled.
- **The two oil circuits in one shock/fork can have genuinely different fill disciplines within
  the SAME rebuild** (SUS-34/39/40): RockShox's damper body is a level-fill (no cc figure) while
  its air can is metered to 1 mL twice; Fox's fork bath oil is metered by circuit (10/15/40 cc)
  while its air-chamber charge is a separate 3 cc metered shot — assuming one fill method applies
  uniformly across a single product is a real service-order trap.

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

## Volume-reduction hardware + coil spring selection (master round 2, batch 4)

**SUS-48 — RockShox Bottomless Token part-number selection is keyed to MODEL CODE and SPRING
TYPE, not to upper-tube diameter — a 35 mm fork can take any of three different tokens.** SRAM
publishes a dedicated Bottomless Tokens selection chart (GEN.0000000006401 **Rev V**, © 2026
SRAM), and its structure defeats the intuitive assumption. Reading the chart:

| Token P/N | Applies to | Upper tube |
|---|---|---|
| **11.4018.032.000** | BoXXer, Lyrik, PIKE, Psylo, Revelation, SID, Yari (Solo Air / DebonAir / DebonAir+); BoXXer, Domain, ZEB (DebonAir / DebonAir+); ZEB (Linear XL) | 35 **and** 38 |
| **11.4018.032.003** | Bluto, REBA, Recon Gold, Revelation, RS-1, SID, SID SL (Solo Air / DebonAir / DebonAir+); **35 Gold** (DebonAir); **Lyrik** (Linear XL) | 32 **and** 35 |
| **11.4018.114.000** | **35 Silver** (Solo Air) | 35 |
| **11.4018.032.004** | PIKE, Lyrik, Yari, ZEB — **Dual Position Air only** | 35 and 38 |

**The load-bearing observations:** (1) **35 mm upper tube appears under all four part numbers** —
tube diameter alone never determines the token. (2) A single fork *model* is not decisive either:
**Lyrik takes 11.4018.032.000 with DebonAir but 11.4018.032.003 with Linear XL**, so the
**air-spring type** is a required input. (3) **Dual Position Air forks take a unique token**
(...004) across both 35 and 38 mm platforms. (4) PIKE 2014 (Solo Air 35) had a token that is now
**Discontinued**, superseded by 11.4018.032.000 — a generational trap of the same family as the
fork rotor-mount traps this corpus already records.
**⚠ Corpus-discipline note (a live example of rule 2):** a search-result summary for this exact
document asserted *"The Pike has a maximum of 35 bottomless tokens, while the ZEB has a maximum
of 38"* — a misreading of the **UPPER TUBE (mm)** column as a token count. The rendered chart
shows this document contains **no maximum-token-count data at all**; it is a part-number
selection chart. *Search-result summaries lie* — the fetched, rendered page is the only
admissible source. *Confidence: confirmed (fetched + rendered primary chart).* Source: sram.com
"Bottomless Tokens" GEN.0000000006401 Rev V, pp.1–2 (fetched and **rendered** 2026-07-18 — the
text extraction column-scrambles, the WHL-46 `pdftoppm` method resolves it). Cross-reference:
SUS-36, SUS-39, SUS-40.

**SUS-49 — RockShox rear-shock volume-reduction hardware CHANGED ARCHITECTURE across generations:
token → ring → o-ring, and the newest part is service-kit-only.** From the same chart's rear-shock
tables, three mechanically distinct volume-reduction parts coexist by generation:
- **Bottomless TOKEN** — Deluxe and Super Deluxe **≤ 2022** (Solo Air / DebonAir): P/N
  11.4118.042.001 and 11.4118.051.002, plus one **Discontinued** variant.
- **Bottomless RING** — MegNeg / Monarch / Monarch Plus (Solo Air / DebonAir): 11.4118.042.000;
  and Deluxe / Super Deluxe with the **Linear XL air can sleeve**: 11.4118.051.012.
- **O-RING** — Super Deluxe **D1** (Linear XL air can sleeve), and critically: *"This product is
  only available in the 100HR and 200HR service kits."* **There is no standalone part number** —
  a current-generation Super Deluxe's volume spacer cannot be bought on its own.

**Practical consequence for a mechanic:** "add a volume spacer to a Super Deluxe" is not one
procedure with one part — the correct hardware depends on generation *and* air-can type, and on
the newest generation it is only obtainable bundled in a service kit. This is a concrete,
sourced instance of the generational-trap pattern. *Confidence: confirmed.* Source: as SUS-48
(p.2). Cross-reference: SUS-36 (Deluxe token maxima), SUS-40.

**SUS-50 [CLOSES the named "no numeric coil-spring-rate selection chart" gap, at the tier the
source actually supports] — RockShox's coil spring chart is now sourced from a clean sram.com
PDF and render-verified; it is a rider-weight→colour/firmness chart, NOT a lb/in rate table.**
The gap recorded that this chart "surfaced this round only via a third-party (yumpu) mirror, not
a clean fetchable sram.com page/PDF — skipped rather than cited from a mirror," and suggested a
targeted re-fetch. Done: it is §"Coil Spring Rates" (p.13) of SRAM's **2025 Front Suspension
Specifications**, fetched directly from sram.com and rendered:

| Rider weight | Spring |
|---|---|
| < 140 lb (< 63 kg) | Silver — X-Soft |
| 140–160 lb (63–72 kg) | Yellow — Soft |
| 160–180 lb (72–81 kg) | Red — Medium |
| 180–200 lb (81–90 kg) | Blue — Firm |
| 200–220 lb (90–99 kg) | Black — X-Firm |

**Scope, stated honestly — this is a narrower close than the gap's wording implied.** The chart
covers **only TK (Coil) entry-tier forks**: Judy Silver (FS-JDYS-TK-A3), Judy (FS-JDY-TK-B1),
Psylo Silver R (FS-PSYL-SR-A1 / SRF-A1) and Recon Silver (FS-RCNS-TK-D1). RockShox's
enduro/trail forks in this catalog's bands are **air**, so no coil chart exists for them. It also
gives **colour/firmness codes, not spring rates in lb/in** — the numeric rate is not published.
*Confidence: confirmed (fetched + rendered primary).* Source: sram.com "2025 Front Suspension
Specifications" p.13 (fetched and rendered 2026-07-18).

**SUS-51 [premise correction — for the Gaps list, not the engine] — the "frame-leverage-adjusted
coil chart" the gap asked for is a REAR-SHOCK concept and cannot exist for a fork.** The gap
filed "rider weight + frame leverage ratio → lb spring recommendation" as one item spanning
SUS-50's fork chart. Those are two different problems: a **fork's** coil spring acts essentially
directly on the axle path (no linkage multiplication), so a fork spring chart is correctly keyed
to rider weight alone — which is exactly what SUS-50 shows RockShox publishing. **Leverage ratio
is a property of a rear suspension linkage**, so a leverage-adjusted spring-rate chart is
inherently a *frame*-specific, rear-shock document — it would have to come from the frame maker,
not the suspension maker, which is why no fork-side source satisfies it. **Recommended Gaps
restructure:** treat "fork coil spring selection" (CLOSED, SUS-50) and "rear coil spring rate vs
frame leverage ratio" (still open, and correctly an L3 *frame*/kinematics item alongside the
existing leverage-ratio gap) as separate entries. *Confidence: confirmed as a mechanical premise;
the recommendation itself is corpus housekeeping, not a sourced claim.* Cross-reference: SUS-17,
SUS-50, and the chapter's open leverage-ratio/kinematics gap.

---

## Gaps

Honest list of what a future round needs to close to move this chapter past `foundation`:

- **Closed 2026-07-17 (SUS-26–31): the RockShox Suspension Theory Guide's DAMPER (p.14),
  FRICTION (p.21) and TUNING (p.26) sections are now mined** — damper construction/
  displacement-compensation design choices, shim/check-valve mechanics, low/high-speed
  circuit separation (incl. lockout/platform), bushing length↔stiffness↔friction coupling,
  five named failure modes (fade/aeration/emulsification/cavitation/hydraulic-lock/
  spiking), and three named tuning misconceptions.
- **Closed same day, 2026-07-17 (SUS-32–41): the RockShox 2018-2022 Deluxe rear-shock
  SERVICE manual (flagged as the next target in the prior Gaps entry) is now fetched and
  mined** — full torque table (piston nut, lock piston, seal head, eyelet-to-can) cross-
  confirmed against the numbered procedure steps, per-stroke IFP-depth tables split by
  damper-electronics generation, the level-fill-vs-metered-fill oil discipline, and
  Bottomless/Gnar Dog token limits. **Fox's tech.ridefox.com service-procedures and
  parts-drawings pages were also fetched this round** (via Exa, after WebFetch failed on
  the JSON-driven page structure — resolving the prior round's "Fox site structure
  resisted a clean fetch" note) for FLOAT X (IFP-by-reservoir, seal-kit PNs, base-valve
  torque) and the 36 fork (bath-oil volumes by circuit, NA3 Glidecore air-spring rebuild
  torque chain, current-gen service interval). **CLOSED 2026-07-17 (SUS-42): RockShox's own
  2019-2022 Lyrik/2019-2023 Yari fork service manual is fetched** — full torque table landed
  cleanly; the oil-volume table only partially extracted at the time (one clean Motion
  Control figure, the DebonAir/Charger rows garbled by a table-layout artifact).
  **FULLY CLOSED 2026-07-18 (SUS-43/44/45), both this chapter's named round-4 pickup
  points:** (1) the CURRENT-gen (2023-2026) combined ZEB/Lyrik/Pike manual — previously
  "too large to fetch" via WebFetch/Exa — is now fetched by `curl -L`-ing the raw PDF to
  disk and running `pdftotext`/`pdftoppm` locally instead (the same lesson as SUS-42's
  Wayback-snapshot fix for DRV-35: when a hosted fetch tool's size cap is the blocker,
  downloading the file and processing it locally sidesteps the cap entirely). Full
  current-gen torque table sourced (SUS-43). (2) SUS-42's own garbled 2019-2022 table is
  now fully recovered too (SUS-45), using the same download-and-process-locally approach.
  **Lesson for future rounds, learned from doing both tables two different ways:** when a
  table's numbers look shifted or missing after `pdftotext` (`-layout` OR `-raw`), don't
  assume it's unrecoverable — render the specific page with `pdftoppm -png -r 250-400`
  (crop with `-x/-y/-W/-H` for a close read) and read it as an image. This resolved BOTH
  the current-gen table (SUS-44, where the apparent sparseness turned out to be genuine —
  the RC/RC2-tier rows really do publish no mL figures at all, not an extraction failure;
  the 3 numbers the table DOES carry pin to the ZEB Delta RC row specifically, corrected
  from an earlier draft of SUS-44 that read them as a table-wide constant before checking
  the Lyrik Delta RC row's own cells) and the 2019-2022 table (SUS-45, where it genuinely was a
  `pdftotext` column-collapse artifact and the image read recovered every cell). Text
  extraction and image reading can fail in different ways on the same PDF; when one gives
  a suspiciously sparse or jumbled table, try the other before citing "not established."
  **CLOSED 2026-07-18 (SUS-46/47) — Fox's own current-gen fork (air spring + GRIP X
  damper) and shock (FLOAT X + DHX) SERVICE manuals proper are fetched**, closing the
  "part-info pages only" gap SUS-41 left open. One page format caveat worth remembering:
  Fox's OLDER/other-size-fork "GRIP Damper Rebuild (32/34/36/38/40mm)" page is video-only
  with no text procedure at all (confirmed dead end, both WebFetch and Exa agree) — the
  CURRENT-gen "GRIP X Damper Rebuild" page that superseded it for text purposes is a full
  numbered-step text page; if a future round needs the older GRIP/GRIP2 damper's exact
  torques, that will need an OCR/video-transcription tool, not a better fetcher. Still
  open: coil-shock/coil-fork service internals (RockShox Super Deluxe Coil, Fox
  DHX2/coil variants, Öhlins/EXT/Cane Creek) remain untouched — **L2 gap narrowed to:
  coil-shock/coil-fork service manual only.**
- **No unified cross-brand torque-spec table** exists yet as a standalone reference (the
  values are now IN the chapter, SUS-32/SUS-40, but scattered across per-model facts
  rather than collected into one lookup table). Worth a follow-up pass to compile once
  RockShox fork data lands too, so the table is genuinely cross-brand/cross-part rather
  than shock-only. **L2 completeness gap** (data exists, presentation doesn't yet).
- **Fox service intervals: PARTIALLY reconciled 2026-07-17 (SUS-41).** The current-
  generation "125 Hours" full-service figure is now fetch-confirmed directly from
  tech.ridefox.com (FLOAT X and 36 part-info pages), resolving the top half of SUS-25's
  30-50 h/125 h ambiguity. **Still open:** whether Fox publishes a shorter interim-check
  interval for the current generation (RockShox's two-tier 50 h/200 h structure has no
  confirmed Fox equivalent from these two pages) — SUS-25's older "011" owner's-manual
  edition is the only source found so far for any lower-tier Fox number, and it's still
  unreconciled against current-gen. **L1 completeness gap, narrowed.**
- **~~No numeric coil-spring-rate selection chart~~ — SPLIT IN TWO 2026-07-18 master round 2, and
  the fork half is CLOSED (SUS-50/51).** The old single entry conflated two different problems;
  SUS-51 records why. Restructured:
  - **(a) Fork coil spring selection — CLOSED (SUS-50).** The targeted re-fetch this gap asked
    for succeeded: the chart is §"Coil Spring Rates" (p.13) of SRAM's **2025 Front Suspension
    Specifications**, fetched from a clean sram.com PDF (no mirror needed) and **render-verified**.
    Rider weight → colour/firmness: <140 lb Silver/X-Soft · 140–160 Yellow/Soft · 160–180
    Red/Medium · 180–200 Blue/Firm · 200–220 Black/X-Firm. **Honestly narrower than the gap's
    wording implied:** it covers **only TK (Coil) entry-tier forks** (Judy, Judy Silver, Psylo
    Silver R, Recon Silver) — this catalog's trail/enduro RockShox forks are air, so no coil chart
    exists for them — and it publishes **colour codes, not lb/in rates**. The numeric rate remains
    unpublished; treat that as EXTERNAL.
  - **(b) Rear coil spring rate vs frame leverage ratio — still OPEN, and reclassified.** SUS-51
    establishes this was never a fork question: a fork spring acts ~directly on the axle path, so
    keying it to rider weight alone is *correct*, whereas **leverage ratio is a rear-linkage
    property**. A leverage-adjusted spring-rate chart is therefore inherently a **frame-maker**
    document, not a suspension-maker one — which is why no fork-side source could ever have
    satisfied it. **Belongs with the leverage-ratio/kinematics L3 gap below**, and a future round
    should look at frame makers' own spring-rate calculators rather than at RockShox/Fox.
- **sheldonbrown.com checked and confirmed thin for this chapter, as the curriculum predicted** —
  its suspension-adjacent content is 1990s Cannondale Headshok elastomer-fork service (an
  obsolete non-air/coil design), not applicable to this catalog's modern air/coil MTB suspension.
  Not re-attempted; future rounds shouldn't re-try this site for this chapter.
- **NEW, CLOSED on arrival 2026-07-18 master round 2 (SUS-48/49) — volume-reduction hardware
  SELECTION, a gap this chapter had not named.** SUS-36/39/40 already covered token *maxima* and
  their tuning effect, but nothing covered **which token part actually fits a given fork or
  shock**. SRAM's Bottomless Tokens chart (GEN.0000000006401 Rev V) is now fetched and rendered:
  selection is keyed to **model code + air-spring type**, never to upper-tube diameter — **35 mm
  uppers appear under all four token part numbers**, Lyrik takes a *different* token with Linear
  XL than with DebonAir, and Dual Position Air forks take a unique one. On the rear, the hardware
  **changed architecture by generation** — Bottomless Token (Deluxe/Super Deluxe ≤2022) →
  Bottomless Ring (MegNeg/Monarch; Linear XL air cans) → **O-ring (Super Deluxe D1), which has no
  standalone part number and is *"only available in the 100HR and 200HR service kits."***
  **Still open (narrow):** no equivalent Fox volume-spacer selection/part-number chart was sought
  this round — the obvious symmetric follow-up.
  **Also recorded as a rule-2 case study:** a search summary of this very document reported
  "Pike max 35 tokens / ZEB max 38", which is the **UPPER TUBE (mm)** column misread as a count.
  The document contains no max-count data at all. Cheap reminder that only the rendered primary
  counts.
- **No leverage-ratio / kinematics engineering detail** — how a frame's linkage produces a
  progressive vs. linear (or mixed) rear-suspension rate curve, and how that curve interacts with
  air vs. coil spring choice beyond the qualitative SUS-17 note. **L3 gap** (frame-engineer
  territory, not generalist).
- **No suspension-tuning-as-race-strategy notes** — pressure/rebound trade-offs for race
  conditions, pit-stop rebuild/swap procedures, what actually breaks under World Cup loads.
  **L4 gap** — the furthest-out level per CURRICULUM.md, expected to arrive last. **Attempted
  2026-07-18 master round 2 and blocked; recorded so it isn't re-attempted blindly.** SRAM's
  "Suspension Setup and Tuning Guide" URL
  (`sram.com/globalassets/document-hierarchy/tuning-manuals/suspension-setup-and-tuning-guide-english.pdf`)
  **is not a PDF** — it serves an HTML redirect to the `docs.sram.com` Suspension User Manual,
  which this chapter has already mined (SUS-26–31). So there is **no separate RockShox
  race-tuning document** behind that name; the setup guidance is the user manual. **Next route:**
  suspension-brand *race-support* or *athlete-setup* material (Fox Factory Racing / RockShox
  SRAM Racing), or labelled **Tier-B** race-mechanic interviews — the latter deliberately not
  harvested this round (see the parallel note in `wheels-tires.md`'s L4 gap for the reasoning:
  a thin practitioner pass risks dressed-up consensus, which rule 2 forbids). The chapter's
  cross-reference for what WAS landed at L4 this round is `wheels-tires.md` **WHL-53** (the UCI
  feed/technical-assistance-zone regulatory frame).

## Open mechanic questions (for the human review — do not act)
- SUS-9: should a bare "Fork Compatibility: X–Y mm" line (no softening language) default to a
  hard error or a soft warning? (4 Santa Cruz frames + Nicolai G1 flagged.)
- SUS-11: is ~1°/20 mm the number you'd quote at the counter?
- SUS-4: is a ±3–5 mm error in a quoted reduced-travel figure acceptable, or should the message
  drop the number entirely? Should it name "Travel Reducer" (RockShox-specific) on other makers?
- SUS-14: 1.8" steerers appearing on any non-e enduro frames yet?
- SUS-35: the Deluxe damper-pressure table's model↔psi pairing beyond RCT=400 psi needs
  re-verification against the manual's actual table graphic (the text extraction couldn't
  disambiguate 5 values across 6 model groups) — worth a follow-up if any customer-facing
  figure beyond RCT is ever needed.
