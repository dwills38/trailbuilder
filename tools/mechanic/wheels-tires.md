# Wheels & Tires — Mechanic Corpus

**Maturity: foundation** (L1 — general-public repair/compat literacy; see
[`CURRICULUM.md`](CURRICULUM.md). This chapter has broad L1 coverage of wheel size, axles, and
tire↔rim fit, plus foundation-level truing/tubeless/lacing terminology as of the 2026-07-17 L1
deepening pass. An **L3 start** landed the same day (WHL-26 through WHL-34: DT Swiss's fetched
spoke-tension target/tolerance tables + quantified stress-relief procedure, and Sapim's fetched
fatigue-test protocols + spoke-breakage causal taxonomy) — still graded `foundation` overall
because the L1 gaps below (torque-spec table, hub bearing/press-fit service) remain untouched and
the L3 depth so far covers only two of the five L3 domains CURRICULUM.md lists for this chapter
(wheel-building/spoke-tension is now underway; tubeless engineering has none). See "## Gaps"
below for what's now closed vs still open.)

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

## Wheel building — spoke-tension engineering (L3 start, 2026-07-17)

*CURRICULUM.md's named L3 example for this chapter — lacing patterns, spoke-tension targets/
balance, dish, fatigue/failure modes. This is the first round to add L3-depth facts; WHL-19/20/25
above stay the L1 concept layer this builds on.*

**WHL-26 — DT Swiss publishes an exact spoke-tension target table in newtons, split by disc vs
rim brake and front vs rear.** DT Swiss's SPLINE wheel line technical manual states (§6.1 Spoke
Tension, "Max./Min. Tolerated Spoke Tension of the Higher Tightened Wheel Side"): **disc-brake
front wheel** max **1200 N**, min **950 N**; **disc-brake rear wheel** max **1300 N**, min
**1050 N**; **rim-brake front wheel** max **1000 N**, min **800 N**; **rim-brake rear wheel** max
**1300 N**, min **1050 N** (identical to disc RW — only the front figure changes between brake
types, i.e. it's the drive/dish-side rear tension that dominates either way). The table also
carries an "Average Spoke Tension" column giving a target band inside the max/min envelope (≈
1000–1150 N disc-FW, ≈1100–1250 N disc-RW, ≈850–950 N rim-FW, ≈1100–1250 N rim-RW) — *this
average-band reading carries lower confidence than the max/min figures*: the source PDF's table
extracted with the average column's row order visibly scrambled by the PDF-to-text conversion, so
the band is a reconstruction, not a direct quote (max/min figures are unambiguous verbatim cells).
*Confidence: confirmed (max/min, fetched primary table); medium (average band, OCR-reconstructed
— flag for a follow-up fetch of the manual's rendered PDF, not the extracted text, to confirm)*.
Source: DT Swiss "SPLINE Technical Manual V2017.03" §6.1 (official DT Swiss document, footer
confirms © DT Swiss AG / www.dtswiss.com; fetched 2026-07-17 as a PDF, mirror hosted at
hollandbikeshop.com since dtswiss.com's own PDF exceeded the fetch tool's size limit).

**WHL-27 — DT Swiss's own dish/run-out tolerance table is tighter for higher-end MTB wheel tiers,
by wheel line.** Same manual, §6.2 Tolerances (horizontal run-out / vertical run-out / off-center
dish, all mm): **MTB XRC** (XC race tier) 0.25 / 0.5 / 0.3; **MTB XR, XM, EX** (trail/enduro
tiers) 0.25 / 0.3 / 0.3; **MTB X, M, E** (entry tiers) 0.3 / 0.4 / 0.4; **Road RC** 0.25 / 0.5 /
0.2; **Road R** 0.25 / 0.3 / 0.2. Dish (off-center) tolerance tightens from 0.4 mm on entry wheels
to 0.2 mm on road-race wheels — the race-tier lines get a materially tighter dish spec, not just
a marketing tier. *Confidence: confirmed (fetched primary table).* Source: same DT Swiss SPLINE
Technical Manual V2017.03 §6.2, fetched 2026-07-17.

**WHL-28 — DT Swiss's stress-relieving procedure is quantified: minimum 4 destress cycles per
build, first one at ~50% of max tension, and the build isn't done until a destress produces zero
further change.** *"SPLINE® wheels should be distressed minimum four times during the building
process. First time at approximately 50% of the maximum spoke tension... After finishing truing,
the wheel should be distressed once again. There should be no more changes in the settings
(spoke tension, radial and axial run out)."* The build loop is: true → destress → re-check
run-out → adjust tension → re-check run-out → repeat until a destress changes nothing. *Confidence:
confirmed (fetched primary procedure).* Source: DT Swiss SPLINE Technical Manual V2017.03 §5.3,
fetched 2026-07-17. This is the concrete mechanical procedure underneath WHL-20's basic
truing-direction concept.

**WHL-29 — DT Swiss's recommended field check interval is every 10 hours of riding (SPLINE
wheels), separate from the hub's 6/12-month service interval.** *"Check spoke tension, run-out
and wear of the wheel"* is listed at a **10 hours of use** interval in the same manual's
maintenance-interval table, distinct from the hub small-service (6 months normal / as-required
extreme conditions) and big-service (12 months) intervals — spoke tension is checked far more
often than the hub is serviced. *Confidence: confirmed (fetched primary table).* Source: DT Swiss
SPLINE Technical Manual V2017.03 §4.2/§5, fetched 2026-07-17.

**WHL-30 — DT Swiss quantifies the load/unload fatigue cycle a spoke sees per wheel rotation, and
names both failure directions (under- and over-tension) mechanically.** DT Swiss's own
"Hand-Built Technology" page: under a seated rider's static load, *"the load is distributed to
almost all spokes in the upper half of the wheel... while the tensions of a few spokes decreases
slightly in the area of the contact patch,"* so *"during a wheel rotation, each spoke is maximally
loaded and unloaded once. On a 29-inch wheel, this happens about 430 times on a one-kilometer-long
track."* Two named failure directions: **under-tension** — *"if the preload is too low overall,
this can lead to spokes being completely unloaded. As a result, the spokes can loosen further and
are charged heavier. The wheel is more unstable overall and the material tires prematurely"* (a
progressive/accelerating failure, not a one-time event); **over-tension at peak load** (e.g. a
jump landing) — *"the force on the spoke would be too high and the spoke would plastically
deform. This over-stretching of the spokes reduces the tensions, and the wheel loses stability"*
— i.e. both directions converge on the same symptom (loss of tension, then instability), which is
exactly why WHL-20's "set as close to max as possible, minimize deviation between spokes" rule
exists: it's the point that minimizes cycle count spent near either failure mode. *Confidence:
confirmed (fetched primary, maker's own mechanism explanation).* Source: dtswiss.com "Hand-Built
Technology" (fetched 2026-07-17).

**WHL-31 — Sapim's Cycling Parts Testing (CPT) department runs quantified wheel-fatigue endurance
tests, not just spoke-level QC — this is real fatigue-cycle data, though it's the test protocol,
not a published S-N curve.** Sapim's own CPT page: **"Wheel fatigue test"** = *"Endurance test
with 750,000 to 12.5 Mio impacts (300 to 5000 km), followed by visual inspection, rotational
accuracy and spoke tension measurements according to DIN or customized"*; **"Sprinter test"** =
*"Alternating axial load with vertical load in a 1000 – 5000 km endurance test, followed by visual
inspection"*; **"Wheel shaker"** = *"a fatigue test to simulate braking and pedaling with
pulsating vertical and horizontal loads"*; **"UCI Drop Test"** = *"a 40 Joule impact test on a
clamped ring, all documented for registration at UCI."* Post-fatigue-test spoke tension is
explicitly re-measured (ties directly to WHL-30's tension-loss-as-failure-symptom mechanism).
*Confidence: confirmed (fetched primary, Sapim's own page); note this is test-methodology data
(cycle/distance/impact-energy protocols), not a published stress-vs-cycles-to-failure curve for a
specific spoke gauge — a true S-N-curve dataset is still not sourced (see Gaps).* Source: sapim.eu
"CPT" (fetched 2026-07-17).

**WHL-32 — Sapim's own FAQ gives a specific taxonomy of where and why spokes break — useful as a
diagnostic checklist, and it names a lacing-pattern-driven failure mode not covered by WHL-25.**
*"Where and when does a spoke break?"* — *"Normally just before the bend"* after years of use;
contributing causes listed: rim damage (*"even the smallest dent can be the cause"*),
non-compatible components, **irregular tension on the spokes**, and a gap in spoke-nipple
alignment. Spoke **head** breakage (uncommon) has three named causes: (1) *"bad positioning of
the head in the hub... puts all the pressure on one side of the bottom of the spoke head"* — the
**"bottle cap effect"**; (2) a hub flange too thick for the spoke's bend length, over-stressing
the head; (3) **wrong cross pattern for the hub** — *"e.g. cross 4 on large flange hubs, the spoke
bend can rub against the adjacent spoke head. This should be avoided"* — a direct, named
lacing-pattern failure mode that sharpens WHL-25's "higher cross = more tangential" fact with a
concrete over-crossing failure case. Spoke **thread** breakage in the nipple is attributed to
spoke/nipple/rim misalignment or wrong spoke length (too long re-threads the nipple under load;
too short also breaks at the thread). Spoke **midsection** breakage on butted/double-butted spokes
is attributed to impact damage from a struck object, sometimes only visible under magnification.
*Confidence: confirmed (fetched primary FAQ, Sapim's own causal taxonomy — qualitative, not a
numeric S-N curve).* Source: sapim.eu "Contact" FAQ (fetched 2026-07-17).

**WHL-33 — Sapim's own guidance: replacing only 1–2 spokes risks repeat breakage nearby, because
one spoke breaking shifts the tension pattern of the whole wheel.** *"Do not forget when the first
spoke breaks, all the other spokes suddenly have a different tension pattern! Also the rim
structure goes out of line... If you only replace 1 or 2 spokes, you can expect these or the
spokes next to them to break again. It is best to re-spoke the entire wheel."* Sapim also flags
hub reuse after a full re-spoke: mount the new spokes in the *opposite* rotational direction from
the original ovalization of the hub's spoke holes, rather than reusing the same worn hole-wear
pattern. *Confidence: confirmed (fetched primary).* Source: sapim.eu "Contact" FAQ (fetched
2026-07-17). This is a direct mechanical basis for WHL-25's closing line about complete built
wheels being sold as opaque units — spoke replacement is itself a whole-wheel-tension operation,
not a per-spoke one.

**WHL-34 — Sapim's Torsion Control System (TCS) spokes are a specific engineered exception to
twist-during-tensioning, quantified in torque (Nm), not tension (N) — the two units aren't
interchangeable and shouldn't be conflated.** *"The secret of the spoke is in the unique square
just above the thread (patented design). With this square it is possible to hold the spoke during
tightening and truing, so it prevents the spoke from twisting. The TCS Spokes can easily be
tightened to more than 200 Nm without twisting."* This is nipple-driving **torque**, a different
physical quantity from the **tension** figures in WHL-26 (torque-to-turn a nipple vs the resulting
axial pull on the spoke) — worth flagging because both are colloquially called "how tight," and a
mechanic reading both numbers side by side could conflate them. *Confidence: confirmed (fetched
primary spec claim).* Source: sapim.eu "Spokes" (fetched 2026-07-17).

**WHL-35 — Mechanical tensiometer theory: a dial-indicator spoke-tension meter (Park Tool
TM-1-style) never reads tension directly — it reads how far a known spring deflects a spoke
sideways, then a spoke-specific conversion table (by gauge/cross-section/material) translates
that deflection into a tension figure.** This is WHY WHL-26's DT Swiss newton table and WHL-34's
Sapim torque figure can't simply be looked up on a generic tensiometer scale without the right
conversion chart for that exact spoke: a round 2.0 mm spoke deflects differently than a bladed
0.9×2.2 mm spoke under the same sideways force, so the same dial reading means different tension
on different spokes. A third-party calibration resource (citing a Birzman conversion chart)
gives one concrete sensitivity figure: **on a high-precision dial indicator, 0.1 mm of
deflection difference corresponds to roughly 100 N (≈9.8 kgf) of tension difference** — useful
as an order-of-magnitude sense of how sensitive the mechanism is, not a universal conversion
(the same source explicitly warns against reusing a chart "across different spoke makers
carelessly," e.g. Sapim CX-Ray vs DT Swiss Aerolite are NOT interchangeable on one chart).
Spring wear over time also drifts the conversion, which is why tensiometer makers ship
recalibration service rather than a fixed lifetime chart. **This directly explains the "DT Swiss
only, no cross-brand comparison" limitation already flagged in `## Gaps`** — it's not just that
Sapim's own numeric table wasn't fetched, it's that even if it were, a DT Swiss tensiometer
reading can't be validly compared to a Sapim spoke's tension without each maker's own
gauge-specific conversion chart; a cross-brand table needs matched conversion charts, not just
matched target-tension numbers. *Confidence: mixed — the deflection-not-tension mechanism and
the never-reuse-across-makers warning are corroborated across sources; the specific
"0.1mm≈100N" figure is attributed to a third-party (Birzman) chart cited by a
spoke-tension-calculator site, not fetched from Birzman/Park Tool directly — flag as
secondary-tier for that one number.* Source: spokecalc.io "Tension meter calibration" (fetched,
citing Birzman); Park Tool TM-1 product/instructions pages (fetched but PDF text-extraction
failed — mechanism description corroborated via search-result synthesis of the product page,
not a direct primary quote, so kept qualitative only here).

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
- **Tension deviation between spokes, not tension level alone, is the fatigue driver** (WHL-30):
  DT Swiss's own mechanism is that both under- and over-tension converge on the same failure
  symptom (progressive tension loss → instability), which is why WHL-20's "set near max, minimize
  spoke-to-spoke deviation" rule and WHL-26's max/min band exist together — a target without a
  tight deviation tolerance is an incomplete spec.
- **A broken spoke is a whole-wheel tension event, not a local one** (WHL-32/33): one spoke
  breaking redistributes tension across every remaining spoke, which is why Sapim recommends
  re-spoking the whole wheel rather than patching 1–2 spokes, and why wrong cross pattern (WHL-32
  head-rub failure) is itself a tension-distribution problem, not a clearance problem.
- **Fatigue-test protocols measure post-test tension, tying wheel-endurance QC directly to the
  tension target** (WHL-31): Sapim's CPT wheel-fatigue and sprinter tests both re-check spoke
  tension after the impact/load cycles — the tension table (WHL-26) isn't just a build-time
  target, it's also the post-durability-test pass/fail reference.

---

## Gaps

Honest list of what's still missing to climb past **foundation** — for the next training round
to target (per INDEX.md corpus rule 7 / CURRICULUM.md "target the weakest chapter"):

- **Spoke-tension target/balance table — L3 gap, PARTIALLY CLOSED 2026-07-17.** WHL-26/27 now
  carry a fetched DT Swiss primary table: exact max/min tension in N by brake type and
  front/rear, plus a dish/run-out tolerance table by wheel tier. Still open: this is **DT Swiss
  only** — no Sapim (or other maker's) own numeric tension-target table was successfully fetched
  (Sapim's site returned 404s on its spoke-tension-meter/checklist pages; only its CPT/FAQ/spokes
  pages were fetchable — see WHL-31/32/33/34); a cross-brand comparison table is still missing.
  The "average tension" band in WHL-26 also carries a lower-confidence OCR-reconstruction caveat
  that a future round should re-verify against the manual's rendered PDF, not extracted text.
  **WHL-35 (this round) explains WHY a cross-brand table is hard, not just unfetched:** dial
  tensiometers read spring deflection, not tension directly, so a DT Swiss reading can't be
  validly compared to a Sapim spoke without each maker's own gauge-specific conversion chart —
  a true cross-brand table needs matched conversion charts as well as matched target numbers,
  raising the bar on what "closing this gap" actually requires.
- **Fatigue-failure data — L3 gap, PARTIALLY CLOSED 2026-07-17.** WHL-30/31/32 now carry DT
  Swiss's own load/unload-cycle mechanism (quantified: ~430 cycles/km on a 29" wheel) and named
  under-/over-tension failure directions, plus Sapim's fetched fatigue-test protocols (endurance
  cycle counts, impact energies) and spoke-breakage causal taxonomy. Still missing: a genuine
  **S-N curve** (stress amplitude vs. cycles-to-failure) for a specific spoke gauge/alloy — what's
  sourced is test *methodology* and qualitative failure causes, not a quantitative
  fatigue-life dataset a wheelbuilder could design against.
- **No tubeless sealant chemistry/failure-mode depth — L3 gap, untouched this round.** WHL-21/22
  cover setup mechanics and the "brands aren't always compatible" warning, but not *why* (latex
  vs. other sealant chemistry, clogging, burp-pressure-by-casing thresholds) — CURRICULUM.md's
  other named L3 example for this chapter.
- **No hub bearing/press-fit engineering — L2/L3 gap, untouched this round.** Nothing here on
  cup-and-cone adjustment procedure, cartridge-bearing press specs/tolerances, or freehub
  pawl/ratchet service — this chapter covers axle *spacing/diameter* only, not hub internals.
- **No general torque-spec table — L2 gap, one data point added.** WHL-34 adds one real number
  (Sapim TCS nipples: 200+ Nm without twisting) but that's a single spoke-system spec, not a
  torque table across thru-axle/rotor-bolt/cassette-lockring/spoke-nipple fasteners; WHL-23 still
  covers the axle *mechanism* only, not install torque.
- **No DT Swiss / SRAM / other hub-brand primary source landed yet for Boost/SuperBoost
  origin.** WHL-4/5's 148/157 facts are sourced (EXPERT-REVIEW-DOSSIER.md + a fetched Problem
  Solvers page); this round tried to fetch a DT Swiss or SRAM primary explainer for the
  Boost-was-introduced-in-2015 history and could not land one cleanly (see report) — still an
  open source-gap, not urgent since the fit-relevant numbers are already sourced elsewhere.
- **Wheel-building procedure depth — L3 gap, PARTIALLY CLOSED 2026-07-17.** WHL-28 now gives DT
  Swiss's real stress-relieving/truing sequence (4x minimum destress, first at ~50% max tension,
  final destress must show zero change) and WHL-29 a real maintenance-check interval (10 hours).
  Still missing: lacing *order* (which spoke goes in which hole first, spoke-tree assembly
  sequencing beyond what WHL-5.3-5.7's step lists show) and a from-scratch tensioning sequence
  (which spokes to bring up first on a bare rim) — this round found the destress/truing loop, not
  the initial lacing-to-tension build order.
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
