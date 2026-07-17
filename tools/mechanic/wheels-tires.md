# Wheels & Tires — Mechanic Corpus

**Maturity: foundation** (L1 — general-public repair/compat literacy; see
[`CURRICULUM.md`](CURRICULUM.md). This chapter has broad L1 coverage of wheel size, axles, and
tire↔rim fit, plus foundation-level truing/tubeless/lacing terminology as of the 2026-07-17 L1
deepening pass — see "## Gaps" below for what a future L2/L3/L4 round still needs to close.)

Wheel size · hubs · axles · rims · tires · ETRTO envelope · clearance.
Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline, conventions).

Fact IDs are stable and append-only (`WHL-n`). Confidence is the source's own grading.

---

## Wheel-size configuration

**WHL-1 — Front parts agree, rear parts agree, and the front/rear combo must match a config
the frame supports.** Fork/wheel/tire at each end must share a size; the front/rear pair must
be one the frame publishes: 29/29, 27.5/27.5, or **mullet (29 F / 27.5 R)**. With no frame
picked, a pair matching no known configuration (e.g. 27.5 F / 29 R) is rejected. *Confidence:
confirmed.* Source: EXPERT-REVIEW-DOSSIER.md §1; frame makers' published wheel-size options.
Engine: rule 1 (`wheel-config`, `front-wheel-size`, `rear-wheel-size`).

**WHL-2 — "Reverse mullet" (27.5 F / 29 R) hard-reject is structurally safe.** No manufacturer
documents or rates a 27.5-front / 29-rear config; no production frame lists it. The rejection
follows from "the pair must match a config some frame publishes" — 27.5F/29R matches none — not
from a physics claim. *Inference:* a larger rear / smaller front inverts the geometry changes
mullet is chosen for (it steepens the front, raises the rear). *Confidence: unsourceable (can't
prove a negative from primary docs); medium.* Source: DOSSIER-OPEN-QUESTIONS-RESEARCH.md §1.
Open mechanic question: ever seen a deliberate 27.5F/29R build with a defensible use case
(trials / dirt-jump conversions)?

**WHL-3 [DJ/BMX] — new wheel sizes for off-live types.** DJ is overwhelmingly **26"**
historically, growing **27.5"** ("650b DJ"), some **24"** (junior/park). BMX is **20"** standard,
**24"** cruiser, **18"/16"** junior, niche **26"**. These are additive vocab (`'26'`,`'24'` for
DJ+MTB-cruiser; a disjoint `bmxWheel` set) — inert for existing MTB rows (no MTB frame declares
26"). DJ stays 26-only in the starter dataset until a convertible frame is sourced; no DJ-specific
wheel-swap "convertible" marketing was found in the BMX/DJ research to argue for a mixed config
now. *Confidence: design-doc + community.* Source: data/DJ-BMX-COMPAT-ANALYSIS.md §1a/§4/§5 Q4;
tools/BMX-RULE-SEVERITY-RESEARCH.md Q4.

## Axles

**WHL-4 — Front axle: fork must match front hub; rear axle: frame spacing must match rear
hub.** Boost 15×110 front is the current MTB norm; rear Boost 148 vs SuperBoost 157 is a genuine
error. *Confidence: confirmed.* Source: EXPERT-REVIEW-DOSSIER.md §2. Engine: rule 2
(`front-axle`, `rear-axle`).

**WHL-5 — SuperBoost frame + Boost rear wheel = ERROR, and the "adapter path" is deliberately
NOT adapter-tier.** A purchasable path exists (Problem Solvers "Super Booster" kit: *"adapts a
148 x 12mm rear hub to a 157 x 12mm spaced frame (Boost to SuperBoost)"* — but *"Requires
re-dishing the rear wheel 4.5mm to the non-drive side"*). A 4.5 mm re-dish is **wheel-building
work** (spoke-tension re-balance), not a bolt-on adapter like the rule-9 rotor adapter — so the
error is kept, not softened to a fix-carrying warning. *Confidence: high (kit exists + what it
requires); tier confirmed by review.* Source: problemsolversbike.com Super Booster page
(fetched) via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §2; EXPERT-REVIEW-DOSSIER.md §2. Open mechanic
question: is a Super-Booster conversion an everyday fix or a wheel-rebuild-level job you'd steer
customers away from? Does the re-dish (rotor moves) cause caliper-alignment issues in practice?

**WHL-6 — The 20×110 DH front-axle split is real (Boost vs non-Boost).** See
[`suspension.md`](suspension.md) SUS-15 — `20x110` (Boost DH) and `20x110-nonboost` are two real
standards; the Marzocchi Bomber 58 is genuinely non-Boost. Wheels/hubs must match the fork's
exact token. *Confidence: confirmed.* Source: memory `fork-verification-learnings`.

**WHL-7 [DJ] — DJ axle vocab is broader than enduro's.** DJ forks include 15×100, 9 mm QR,
20 mm through-axle, and 10 mm-bolt variants; DJ rears commonly run **135 QR / 10 mm bolt-on**.
The go-live DJ pass added `frontAxle:'15x100'` (sourced: fetched Pike DJ page) and
`rearAxle:'10x135-bolt'`. *Confidence: design-doc + one sourced datum.* Source:
data/DJ-BMX-COMPAT-ANALYSIS.md §4; §6 implementation record. Open mechanic question: which DJ
front-axle variants are common enough to need first-class vocab?

**WHL-8 [BMX] — peg axle diameter must match the hub axle; direction-aware.** BMX axles are
**3/8" (10 mm) bolt-on** or **14 mm**. A 14 mm peg won't clamp a 10 mm axle; a 10 mm peg won't
fit over a 14 mm axle without an adapter sleeve (many pegs ship both). Direction-aware like the
MTB rotor rule: peg bore < axle = error; peg > axle = warning/info (adapter). **3/8" (9.525 mm)
and 10 mm are treated as ONE token** — the peg *bore* practice treats them identically
("14mm-with-10mm-adapter," never a 3/8"-specific peg). The real 3/8"-vs-10 mm non-interchange
is a **thread-pitch** detail on the axle nut (3/8"×24/26tpi SAE vs 10×1mm metric), which is a
fastener fact adjacent to peg-fit, not modelled. *Confidence: medium (community consensus on
peg-bore practice; thread nuance real but out of scope).* Source: data/DJ-BMX-COMPAT-ANALYSIS.md
§2a (BMX-4); tools/BMX-RULE-SEVERITY-RESEARCH.md Q8.

## Tire ↔ rim (ETRTO envelope)

**WHL-9 — The ETRTO-2024 table gives a defensible tire-width envelope per inner rim width
(floor AND ceiling).** Schwalbe's published ETRTO-2024 combination table (fetched PDF):
- inner rim **21–22 mm** → tire 25–65 mm; **23 mm** → 28–65; **24 mm** → 29–65
- inner rim **25 mm** → tire **29–71 mm**
- inner rim **26–27 mm** → tire **35–71 mm**
- inner rim **28–30 mm** → tire **47–71 mm** (≈ 1.85"–2.8" — a 2.4/2.5/2.6" tire on a 30 mm rim
  is squarely approved)
- inner rim **31–35 mm** → tire **58–83 mm**; **36–40 mm** → 66–95 mm
Plus the hookless note: hookless/straight-side rims may only be combined with TLE/TLR tires
regardless of use. *Confidence: high (fetched table).* Source: Schwalbe ETRTO-2024 combinations
PDF (fetched), via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §14.

**WHL-10 — Maker rim charts knowingly EXCEED ETRTO.** WTB grades pairings
optimal/compatible/not-suggested and states its recommendations *"extend beyond current ETRTO
recommendations, but allow for more optimal performance. Proceed at your own risk."* So the
policy is: ETRTO-2024 as the conservative sample default (warning tier, disclosed as guidance),
maker-published clearance overriding it per row where fetched — the engine's existing pattern.
*Confidence: high (fetched WTB methodology).* Source: wtb.com Tire & Rim Fit chart, via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §14. Open mechanic question: when ETRTO and a rim maker
disagree, which do you follow at the counter — should the tool say "outside ETRTO guidance" even
when the maker blesses the combo?

**WHL-11 — Tire WIDER than the wheel's max = warning; tire TOO NARROW for a wide rim = soft
warning, dormant.** Over-wide is live (2.6" tires exist against 2.5"-max rims). Too-narrow fires
**only** off a maker-published `minTire` on a wheel/rim — never an ETRTO-derived guess — so it
stays dormant until such data is sourced (the thresholds are fuzzy/standards-dependent).
*Confidence: confirmed (rule shape); dormant by data.* Source: EXPERT-REVIEW-DOSSIER.md §14 +
Appendix; engine rule 14 / rule 14c (`front/rear-tire-rim`, `*-tire-rim-min`).

## Tire ↔ frame / fork clearance

**WHL-12 — Rear tire wider than the FRAME's published max = warning; single-figure modelling
matches the maker.** Live on catalog frames with published clearances (Madonnas 2.6, Slash 2.5,
Megatower 2.5, Spire 2.6, SB160 2.6, HD6 2.5, Reign 2.5, Dreadnought 2.6); frames without a
published max stay silent. Santa Cruz publishes ONE clearance figure ("Max Tire Clearance:
2.5\"") and describes the flip-chip **geometry-only** ("lowers the BB by 3.5mm, slackens the
head angle by 0.3 degrees") — so per-setting clearance modelling would *exceed* the maker's
data. Policy for a maker that DOES publish per-setting clearance: `maxTire` = largest published
figure, plus a warning above the stock-setting figure noting the setting may need to change.
*Confidence: high (fetched Santa Cruz Megatower support page).* Source:
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §18; EXPERT-REVIEW-DOSSIER.md §18. Engine: rule 18
(`rear-tire-frame`).

**WHL-13 — Tire vs FORK-crown clearance is a real axis, dormant until fork data is sourced.**
Forks publish per-chassis tire clearance (RockShox ZEB Select lists "Max Tire Width (mm): 81").
The check exists but stays dormant until forks carry sourced `maxTire`. *Confidence: confirmed
(fetched spec line); dormant by data.* Source: sram.com fs-zeb-sel-a2 via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §14/§Bonus; EXPERT-REVIEW-DOSSIER.md §14. Engine:
`front-tire-fork`, dormant.

## Tire identity (data-entry conventions)

**WHL-14 — Casing and compound are brand-native SKU axes, not cross-brand tiers.** A tire's
casing/compound must be entered in the maker's own vocabulary and are **coupled** on some
brands: Continental Kryptotal tiers pair casing+compound (Trail=Endurance, Enduro=Soft,
DH=SuperSoft); Maxxis "EXO+"/"3C MaxxGrip" map to `casing:'exo-plus'`/`compound:'3c-maxxgrip'`.
Do NOT invent a cross-brand toughness tier. One purchasable casing/compound SKU = one row; the
per-SKU published weight is the point of the axes. *Confidence: convention.* Source:
tools/DATA-ENTRY-TEMPLATE.md §4/§5.

**WHL-15 — Verification keeps catching fabricated tire specs.** Past unverified rows contained
four tire sizes that don't exist, weights off by 50–200 g, and a fictional "Kryptotal" that was
really two treads. The whole tire category (23 tires, 8 brands) is now verified against fetched
maker pages/PDFs (Michelin + Specialized remained in the retry queue — JS-rendered/bot-blocked,
now addressable via Bright Data per VERIFY-PROTOCOL). *Confidence: confirmed (audit history).*
Source: EXPERT-REVIEW-DOSSIER.md "What verified means"; CLAUDE.md Provenance.

## Wheel weight basis

**WHL-16 — Wheels weigh per wheel (kit weights are always derived, never stored); the interface
exception applies to combined-weight makers.** Per-wheel weight is the unit; preset/kit weights
are always computed from fills. A wheel row may be `verified:true` on its full interface set
(size, hub spacing, freehub, rotor mount, internal width, max/min tire) with a nominal weight
when the maker publishes only a combined "from Xg" set weight (DT Swiss pattern), noted in
`desc`. *Confidence: policy.* Source: tools/DATA-ENTRY-TEMPLATE.md §5; VERIFY-PROTOCOL.md wheel
extension.

## Tire sizing nomenclature (ISO/ETRTO)

**WHL-17 — The ISO/ETRTO tire-size code is two numbers: width-mm × bead-seat-diameter-mm, and
the second number is the one that must match the rim.** Format is `width-BSD` (e.g. `58-622`).
Sheldon Brown's explainer: *"if this number [BSD] matches, the tire will fit onto the rim; if it
doesn't match, the tire won't fit."* This is why ISO/ETRTO sizing exists at all — traditional
inch-based names ("26 inch") were ambiguous because different real diameters were sold under the
same nominal name. Common MTB/road BSDs: 700C/29er = **622 mm**; 650B/27.5 = **584 mm**; 26"
MTB = **559 mm**. *Confidence: confirmed (fetched).* Source: sheldonbrown.com "Tire Sizing
Systems" (fetched 2026-07-17). This is the naming system *underneath* the catalog's `wheel`
vocab (`'29'`/`'275'`/`'26'`) and underneath WHL-9's width-envelope table — WHL-9 covers how wide
a tire may be on a given rim; this fact covers why a 29" tire and a 27.5" tire are simply
incompatible bead diameters, full stop, regardless of width.

**WHL-18 — ETRTO (European Tyre and Rim Technical Organisation) is the standards body behind the
BSD system, not just a table publisher.** Its stated mission is *"Alignment of national standards
to achieve interchangeability of pneumatic tyres, rims and valves in Europe as far as fitting and
use are concerned,"* with "more than 50 years of standardisation" behind it; it publishes a
Standards Manual, an Engineering Design Information Manual, and a multilingual Technical
Dictionary. *Confidence: confirmed (fetched, org's own site).* Source: etrto.org (fetched
2026-07-17). Context fact for WHL-9/WHL-17 — explains why "ETRTO" is treated as the credible
default envelope in this corpus (a standards body, not one brand's marketing).

## Wheel truing basics

**WHL-19 — "True" means no lateral or radial deviation as the wheel spins; the two axes are
independent and are diagnosed differently.** Park Tool: **lateral trueness** = *"side-to-side
wobbles, or lateral deviations, as the wheel spins"* (viewed head-on); **radial trueness** = *"the
wheel's roundness, or amount of up and down movement as it spins"* (viewed from the side, i.e.
hop/bounce, not wobble). A truing stand's indicator fingers are set against the rim to detect
each independently. *Confidence: confirmed (fetched).* Source: parktool.com "How Wheel Truing
Works" + "Wheel Truing (Lateral & Radial)" (both fetched 2026-07-17).

**WHL-20 — Basic spoke-tension direction rule: tightening a spoke pulls the rim toward that
spoke's hub-flange side; to correct a wobble you tighten the spokes on the side *opposite* the
deviation.** Because spokes are elastic and under tension, "correctly tightened" opposing spokes
suspend the rim in balance around the hub; uneven tension means the wheel won't "stay true...for
very long." Park Tool also flags a common beginner trap: viewed from outside the rim, clockwise
tightens a nipple — but a nipple viewed through a truing stand from the *inside* of the wheel
looks reversed, so "counterclockwise tightens" is a common misread on-stand. *Confidence:
confirmed (fetched).* Source: parktool.com "How Wheel Truing Works" + "Wheel Truing (Lateral &
Radial)" (fetched 2026-07-17). This is foundation depth only — no spoke-tension target
values (kgf), balance/dish tolerances, or fatigue-failure data; that is an L3 gap (see below).

## Tubeless setup basics

**WHL-21 — Tubeless mounting requires a matched tubeless-ready tire + rim + tape + valve, and
the bead seats at high pressure with an audible/visual "pop," not at riding pressure.** Basic
sequence: mount one bead, start the second bead at the valve leaving a gap, add sealant (pour
before finishing the bead, or inject through the valve stem after both beads are seated),
then inflate "to at least the maximum pressure on the label" — an air compressor is
recommended, though a well-designed UST tire can sometimes seat with a floor pump. Sealant needs
time to fully cure and block micro-leaks (immediate for true UST, "hours or days" for other
tubeless-ready systems); the wheel should be spun/oscillated periodically early on to distribute
sealant. Punctures in tubeless tires generally **cannot be patched** the way a tube can, except
specific lined UST systems. *Confidence: confirmed (fetched).* Source: parktool.com "Tubeless
Tire Removal and Installation" (fetched 2026-07-17).

**WHL-22 — Tubeless-ready tires and rims are a matched mechanical system (square bead + hooked
rim channel), and Park Tool explicitly warns against improvising with non-tubeless parts.**
Tubeless-ready tires use a "square shape" bead (vs. the rounded bead on a standard clincher) with
reinforced casing; tubeless-ready rims use a hooked-sidewall channel profile that locks that bead
plus a deeper center channel to ease mounting. Park Tool's own words: *"it is not considered safe
nor reliable to manipulate non-compatible parts in attempting to create a tubeless tire ride."*
Tubeless-specific rim tape and valves are also required, and sealants "aren't necessarily
compatible across brands" — switching sealant chemistry means cleaning the tire first.
*Confidence: confirmed (fetched).* Source: parktool.com "Tubeless Tire Compatibility" (fetched
2026-07-17). **Note for the coordinator:** the catalog/engine currently has **no tubeless
modelling at all** — no `tubeless`/`tubelessReady` field on wheel or tire rows, so this isn't a
⚠ CONTRADICTION (nothing exists to contradict), but it is a real fit-relevant axis the engine is
silent on; flagging as a candidate-rule note, not a rule to add unilaterally.

## Axle standards (identification & history)

**WHL-23 — Quick-release and thru-axle are mechanically different fastening systems, not just a
diameter difference.** A QR skewer is a hollow shaft through a hollow axle: the lever's cam
compresses the dropouts against the hub's cone locknuts (Park Tool: a QR is *"a hollow hub axle
fitted with a shaft, a lever that operates a cam mechanism, and an adjusting nut"*). A thru-axle
instead *"inserts into the hole in...the forkend, passes through the hub, and screws into a
threaded hole in the other forkend"* — the axle itself is structural, not just a clamp. Sheldon
Brown gives the common thru-axle diameters: **12 mm** is the usual thickness; some Shimano
E-Thru axles are **15 mm**; some heavy-duty (DH) applications use **20 mm** — matching the
catalog's `15x110`/`20x110` fork-axle tokens. Thru-axles were adopted mainly for disc-brake
rotor/caliper alignment (no rub-adjustment needed on reinstall) and for the stiffer
fork-to-hub connection suspension forks need under load. *Confidence: confirmed (fetched).*
Source: sheldonbrown.com "Thru Axles" (fetched 2026-07-17); parktool.com "Wheel Removal and
Installation" (fetched 2026-07-17).

**WHL-24 — Hub/frame spacing has widened steadily for over a century; today's Boost/SuperBoost
values (WHL-4/5) are the latest step in a long-running trend, not a one-off.** Sheldon Brown's
documented rear over-locknut-distance (O.L.D.) progression: **110 mm** (older track/single-speed)
→ **114 mm** (3–4-speed internal-gear hubs) → **120 mm** (5-speed) → **126 mm** (6–7-speed road)
→ **130 mm** (7-speed MTB/modern road) → **135 mm** (the page's "current" disc-brake/MTB QR
figure). Front spacing similarly ranged roughly 70–100 mm historically. *Note: this page predates
the Boost/SuperBoost/thru-axle-142+ era the catalog actually stocks (its "current" figures are
QR-135mm-era) — read this as historical trend context for WHL-4/5/WHL-21, not as a current-spec
source; the catalog's 142/148/157 thru-axle facts stay sourced to EXPERT-REVIEW-DOSSIER.md /
manufacturer pages.* Frame spacing itself is measured dropout-inner-face to dropout-inner-face;
a steel frame can be "cold set" (spread) to fit a wider modern hub, aluminum/carbon generally
cannot. *Confidence: confirmed (fetched); dated source flagged explicitly.* Source:
sheldonbrown.com "Bicycle Frame/Hub Spacing" (fetched 2026-07-17).

## Spoke count & lacing (foundation)

**WHL-25 — Spoke crossing pattern is named by how many other same-flange spokes each spoke
crosses ("cross 3", "cross 2", radial = "cross 0"), and radial lacing is a front-wheel-only,
no-hub-brake pattern.** Higher cross numbers lay spokes more tangentially to the hub flange,
which better resists the twisting/torque loads of pedaling and hub braking (drum/coaster/disc
hub brakes — not the same as rim/rotor braking through the frame); lower cross numbers (down to
radial) are more nearly perpendicular. Sheldon Brown states plainly that radial (cross-0) wheels
are *"suitable only for front wheels that don't use hub brakes"* and that drive or hub-brake
wheels *"should never be radially spoked"* because the near-perpendicular angle spikes tension
under torque and risks spoke/hub failure. Typical cross counts by spoke count: 48h → cross 5,
40h → cross 4, 36h → cross 3 or 4, 32h → cross 3, 28h/24h → cross 2. *Confidence: confirmed
(fetched).* Source: sheldonbrown.com "Wheelbuilding" (fetched 2026-07-17). Foundation depth only
— no spoke-tension target/balance numbers or fatigue-failure modelling; that's the L3 gap below.
The catalog has no lacing-pattern field on wheel rows (wheels are sold as complete built wheels),
so this is background knowledge for the mechanic agent, not a fact that feeds `checkBuild`.

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **Wheel size is a whole-end constraint:** fork, hub-wheel, and tire at each end must agree,
  and the two ends together must match a frame config (WHL-1). Size is checked *per end first,
  then as a pair* — a consistent front and a consistent rear can still be an illegal combo.
- **Axle spacing is a three-way lock:** fork↔front-hub, frame↔rear-hub (WHL-4). It sits
  independent of wheel size — a correctly-sized wheel can still be the wrong hub spacing, and a
  SuperBoost/Boost mismatch is wheel-building work to bridge, not a bolt-on (WHL-5).
- **The rim's internal width bounds the tire from both sides** (WHL-9): too wide *and* too
  narrow are real, and the *maker's* published clearance overrides the ETRTO default (WHL-10/11).
- **Tire width is bounded by three separate things:** the rim (WHL-9/11), the frame's rear
  clearance (WHL-12), and the fork crown (WHL-13). A tire can clear the rim and foul the frame,
  or clear the frame and foul the fork — three independent ceilings.
- **Bead-seat diameter (BSD) is the hard wheel-size gate underneath everything else** (WHL-17):
  before width/clearance is even relevant, the tire's BSD number must equal the rim's — this is
  the mechanical reason a 29" tire and a 27.5" tire are simply different objects, not just
  different widths. WHL-1's per-end wheel-size matching is this rule expressed at the catalog's
  `wheel` vocab level.
- **Hub/frame spacing is a moving historical target, and Boost/SuperBoost (WHL-4/5) are just the
  newest values on a decades-long widening trend** (WHL-24) — a mechanic reading an older frame's
  spacing (110–135 mm) is reading an earlier step of the same axis the catalog's 142/148/157
  thru-axle tokens continue.

### Mismatch failure modes
- **Hard "won't fit":** an illegal wheel-size combo / reverse mullet (WHL-1/2); an axle-spacing
  mismatch (WHL-4); a peg bore smaller than the axle (WHL-8).
- **"Works but needs wheel work" (kept as error, not adapter-warning):** SuperBoost frame +
  Boost wheel — a re-dish, not a spacer (WHL-5).
- **"Mounts but out-of-guidance" (warning):** tire wider than rim max / frame max / fork crown
  (WHL-11/12/13); tire narrower than a maker's published rim minimum (WHL-11, dormant).
- **Silent-and-fine:** a tire squarely inside the ETRTO envelope on a legal rim; a legal wheel
  config; matched axle spacing.

### Install-order dependencies
- **Freehub body first, then cassette** — a wheel↔drivetrain dependency; see
  [`drivetrain.md`](drivetrain.md) DRV-9.
- **Rotor interface + adapter follow the hub** — a wheel↔brake dependency; see
  [`brakes.md`](brakes.md) BRK-4/BRK-2.
- **A SuperBoost↔Boost bridge requires re-dishing before the wheel is true** (WHL-5): it's a
  wheel-build step, and the re-dish moves the rotor line — which then interacts with caliper
  alignment.
- **Hookless rims force tubeless tire choice** (WHL-9): a hookless rim constrains the tire type
  before width is even considered.
- **Tubeless setup has its own install order** (WHL-21/22): matched tubeless-ready tire+rim+tape
  +valve first, bead seated at high pressure (not riding pressure) second, sealant added/cured
  third — skipping or reordering these (or mixing non-tubeless-ready parts) is a setup failure
  mode independent of anything `checkBuild` currently checks (no tubeless field exists yet).

### Wear / setup couplings
- **Rim width shapes the tire's real profile:** a wide tire on a narrow rim balloons (squirm,
  burping); a narrow tire on a wide rim squares off (sidewall exposure, pinch risk) — this is
  the physical basis of both WHL-11 directions.
- **Re-dished wheels retension unevenly** — the SuperBoost/Boost bridge (WHL-5) leaves a wheel
  with asymmetric spoke tension, a durability coupling behind keeping it an error.
- **Tire clearance shrinks under load/mud:** published static clearances (WHL-12/13) are the
  ceiling; dynamic clearance is tighter, which is why the tiers are warnings even at the max.
- **Spoke tension degrades with use and is what truing restores** (WHL-19/20): a wheel that was
  correctly built and true at purchase can true itself out of spec over time from riding loads —
  a maintenance coupling with nothing to do with part compatibility, and nothing the catalog
  models (no spoke-tension field on wheel rows).
- **Lacing pattern is chosen for the load path, not looks** (WHL-25): a radially-laced wheel on a
  drive or hub-brake wheel is a wear/failure-mode risk (excess flange tension under torque), which
  is why complete built wheels in the catalog are sold as opaque units rather than modelled by
  lacing pattern.

---

## Gaps

Honest list of what's still missing to climb past **foundation** — for the next training round
to target (per INDEX.md corpus rule 7 / CURRICULUM.md "target the weakest chapter"):

- **No spoke-tension target/balance table or fatigue-failure data — L3 gap.** WHL-19/20/25 cover
  truing *concepts* (lateral/radial, cross patterns) but carry no kgf tension targets, dish
  tolerance numbers, or spoke-fatigue/failure-mode research (CURRICULUM.md's named L3 example).
- **No tubeless sealant chemistry/failure-mode depth — L3 gap.** WHL-21/22 cover setup mechanics
  and the "brands aren't always compatible" warning, but not *why* (latex vs. other sealant
  chemistry, clogging, burp-pressure-by-casing thresholds) — CURRICULUM.md's named L3 example.
- **No hub bearing/press-fit engineering — L2/L3 gap.** Nothing here on cup-and-cone adjustment
  procedure, cartridge-bearing press specs/tolerances, or freehub pawl/ratchet service — this
  chapter covers axle *spacing/diameter* only, not hub internals.
- **No torque-spec table — L2 gap.** Thru-axle, rotor-bolt, and spoke-nipple torque values are
  entirely absent; WHL-23 covers the axle *mechanism*, not install torque.
- **No DT Swiss / SRAM / other hub-brand primary source landed yet for Boost/SuperBoost
  origin.** WHL-4/5's 148/157 facts are sourced (EXPERT-REVIEW-DOSSIER.md + a fetched Problem
  Solvers page); this round tried to fetch a DT Swiss or SRAM primary explainer for the
  Boost-was-introduced-in-2015 history and could not land one cleanly (see report) — still an
  open source-gap, not urgent since the fit-relevant numbers are already sourced elsewhere.
- **No wheel-building procedure depth (lacing order, tensioning sequence, stress-relieving) —
  L3 gap.** WHL-25 gives naming/why, not the how-to-build-a-wheel procedure.
- **BMX/DJ wheel facts (WHL-3/7/8) are still thin relative to MTB** — off-live but same
  foundation bar; a future round could deepen BMX peg/axle and DJ wheel-size sourcing beyond the
  design-doc/community tier they currently carry.
- **No race-day wheel/tire setup judgment (pressure-as-strategy, pit-wheel-swap procedure) —
  L4 gap**, and expected to arrive last per CURRICULUM.md.

## Open mechanic questions (for the human review — do not act)
- WHL-2: any defensible deliberate 27.5F/29R build (trials/DJ conversions)?
- WHL-5: is a Super-Booster 148→157 conversion an everyday fix or a job to steer customers away
  from? Does the re-dish cause caliper-alignment trouble in practice?
- WHL-10: when ETRTO and a rim maker disagree, which do you follow — and should the tool warn
  "outside ETRTO" even when the maker blesses it?
- WHL-7: which DJ front-axle variants are common enough to warrant first-class vocab?
