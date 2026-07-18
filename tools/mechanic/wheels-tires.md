# Wheels & Tires — Mechanic Corpus

**Maturity: professional** (L1 — general-public repair/compat literacy; see
[`CURRICULUM.md`](CURRICULUM.md). This chapter has broad L1 coverage of wheel size, axles, and
tire↔rim fit, plus foundation-level truing/tubeless/lacing terminology as of the 2026-07-17 L1
deepening pass. An **L3 start** landed the same day (WHL-26 through WHL-34: DT Swiss's fetched
spoke-tension target/tolerance tables + quantified stress-relief procedure, and Sapim's fetched
fatigue-test protocols + spoke-breakage causal taxonomy). **2026-07-18 (first pass): hub
bearing/freehub internals landed (WHL-36/37)** — DT Swiss's Ratchet-system freehub service (four
mechanically distinct sub-variants) and Shimano's contrasting cup-and-cone architecture.
**2026-07-18 (second pass): five more facts landed (WHL-38 through WHL-42)** — WHL-38 closed
WHL-35's cross-brand tensiometer problem with two actual fetched conversion charts (Park Tool
TM-1 + a DT Swiss meter's Sapim calibration sheet); WHL-39 deepened tubeless install to real
service-manual numbers (DT Swiss's 75 ml sealant fill / 10-15 cm tape overlap / hand-tight valve,
Stan's tape-width rule); WHL-40 closed the WHL-36/37 gap note by adding Industry Nine's Hydra
service architecture (a third distinct design, tool-free by philosophy) and confirmed Hope uses
generic ISO cartridge bearings; WHL-41 landed the ERD/spoke-length trigonometry formula and
measuring-stick method (an L1 theory gap, not L3, but previously undocumented); WHL-42 landed a
fetched manufacturer restatement of the actual ETRTO/ISO 5775 rim-width×tire-width×pressure
tables (Mavic), the direction-aware TC/TSS compatibility rule, and ENVE's mechanical explanation
of why hookless tubeless works. **2026-07-18 (third pass): WHL-43** landed DT Swiss's official
RWS thru-axle hand-torque spec (15-20 N·m, with a quantified knock-test caveat) and SRAM's own
finding that axle torque functionally couples to Eagle Transmission derailleur behavior, not
just wheel retention — closing the axle install-torque gap this chapter had carried since its
first grind. **Regraded from `foundation` to `professional`** per CURRICULUM.md's bar ("L1
complete + meaningful L2 depth... across most of the chapter's parts") — of this chapter's five
named parts (wheel size, hubs, axles, rims, tires), four now carry real L2/L3 depth: hubs
(WHL-36/37/40, three architectures), axles (WHL-43), rims/wheel-building (WHL-26-35/38/41, an L3
start), and tires (WHL-21/22/39/42, tubeless service depth + a fetched ETRTO restatement). **One
part remains L1-only, which is why this isn't graded `master`:** wheel-size *configuration*
(WHL-1/2/3 — which front/rear combos a frame legally supports) has no service-manual-depth
counterpart of its own; it's a compatibility rule, not a serviceable component, so it may simply
have no L2 tier to climb to — flagged as an open question for the next round rather than assumed.
See "## Gaps" below for what's now closed vs still open.)

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

**WHL-42 — The ETRTO/ISO 5775 standard is paywalled itself, but Mavic publishes a fetchable
technical-manual restatement of its actual rim-width × tire-width × pressure tables, and it
encodes the same direction-aware, "lowest published max wins" pattern this corpus already uses
for other envelope checks.** Mavic's own "ETRTO / ISO Recommended Rim-Tyre Combination" PDF
(technicalmanual.mavic.com, fetched primary, authored in-house) opens by naming its source
plainly: *"This organisation developed the ISO 5775 norm... Authorised tyre and rim compatibility
in the following charts are directly issued from this norm"* — i.e. Mavic is restating, not
inventing, the numbers. It distinguishes **TC (Tubeless Crotchet — hooked, "rim's internal
flanges have hooks to maintain the tyre") from TSS (Tubeless Straight Side — hookless)** and
states the compatibility is direction-aware exactly like WHL-10/11's tire-vs-rim pattern: *"TSS
compatible tyres can usually also be used on TC setups, but TC compatible tyres can't be used
[on] TSS setups"* and *"TSS runs at lower pressures than TC."* The published max-pressure table
itself is granular by both rim internal width (15–100 mm, TC and TSS tracked separately) and
tire width (23–75+ mm) — e.g. for a 700C/29" wheel, a 28 mm tire on a 19 mm-internal TC rim
maxes at 6.73 bar (97.6 psi) but the same tire on the 19 mm TSS variant of that same nominal rim
width maxes at only 5.59 bar (81.1 psi), quantifying "TSS runs lower" rather than leaving it
qualitative. Mavic's own cross-check rule matches WHL-10's engine-pattern reasoning exactly:
*"Don't forget to also check the maximum pressures allowed by both the rim and the tyre. Compare
them with the pressure from the chart and if they are not the same, just use the lowest of the
three."* Continental's own ETRTO-restatement pages (continental-tires.com, fetched primary)
independently confirm the same "lowest value wins" doctrine with a worked example (tire-max 87
psi vs rim-max 101 psi → follow 87 psi) and add a **quantified temperature effect not covered
elsewhere in this chapter: inflation pressure rises roughly 0.17 bar (2.5 psi) per 10°C (18°F)
rise in temperature**, relevant to why a pressure set at the shop can exceed a hookless max by
the time a bike sits in a hot car or garage. ENVE's own hookless explainer (enve.com, fetched
primary) gives the mechanical "why" TC's hook became optional: a tubeless tire's bead is
"quite stiff" and seals against the rim's flat bead-seat shelf via air pressure and friction —
the hook was originally developed for tubed clincher tires with lighter, more elastic Kevlar
beads, not for tubeless — and cites the actual ISO 4210 blow-off test standard: a tire must hold
110% of its stated max pressure (e.g. 5 bar/72.5 psi × 1.10) for five minutes, a test ENVE calls
"widely known to be... inadequate," which is why ENVE's own internal qualification bar for a
TSS-listed tire is stricter — 165% of the ETRTO/ISO max (120 psi against a 72.5 psi stated max in
their example) rather than the ISO minimum of 110%. *Confidence: confirmed (fetched
manufacturer restatements of the standard's actual numbers, three independent makers — Mavic's
full table, Continental's cross-check doctrine, ENVE's mechanical explanation and test-standard
citation — cross-corroborating rather than contradicting); the ISO 5775/4210 documents themselves
were not fetched (paywalled per the task brief), so figures are one hop removed from the primary
standard, the same tier WHL-9/10's Schwalbe/WTB restatements already carry in this chapter.*
Source: technicalmanual.mavic.com "ETRTO / ISO Recommended Rim-Tyre Combination" (fetched PDF);
continental-tires.com "Tire/Rim Combinations | ETRTO Standards" + "Hookless vs. Hooked Rims"
(both fetched); enve.com "Hookless Rim Technology 101" (fetched), all 2026-07-18.

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

**WHL-39 — Rim-tape installation is quantified by two makers with different numbers for the same
step, plus a third maker's install sequence that could only be corroborated at search-summary
tier — a genuine cross-maker torque/spec table does not exist for this step the way CKP-20 built
one for cockpit fasteners.** DT Swiss's own Tubeless Ready Kit User Manual (V2013.11, fetched
primary PDF): start the tape "between the first and the second spoke hole next to the valve
hole," apply it "under tension" and centered in the rim bed, **overlap the tape ends by 10–15
cm** and cut, then mount the valve with the nut **"handtight without using any tools."** Sealant
fill is a stated volume, not "to taste": **"Fill 75 ml of sealing fluid into the tire"** before
seating the rest of the bead, and the sealant itself must be stored "in a dry, dark place at
between 15 and 25 °C" or discarded if it hardens/clumps after shaking. Inflate "quickly to the
lower max. pressure of either the rim or the tire" (the same "lowest of the published maxes
wins" principle WHL-10/42 apply elsewhere), then visually confirm even bead contact around the
full circumference before riding. Stan's NoTubes (stans.com "Tubeless Guide," fetched) gives a
**width rule instead of an overlap figure**: rim tape should be selected "1–2 millimeters wider
than the rim bed itself," sold in 21/25/27/30/33/36 mm widths, and lower tubeless pressures run
"7–10 psi (0.5–0.7 bar) below" equivalent tubed pressures on or off-road. Shimano's dealer
literature (si.shimano.com tubeless install pages, indexed via search-result synthesis — the
primary PDF (SI-0036A) fetched as a valid PDF but rendered with no extractable text on this
round, so this datum is flagged lower-tier pending a cleaner fetch) reportedly specifies
starting the tape opposite the valve and a **~10 cm overlap** — close to but not identical to DT
Swiss's 10–15 cm figure, plus an explicit "genuine SHIMANO tape only, never reused" caution.
*Confidence: confirmed (DT Swiss 75 ml/10-15cm/handtight, fetched primary manual); confirmed
(Stan's 1-2mm width rule, fetched primary page); low/search-summary tier (Shimano's ~10cm figure
— primary PDF fetched but not text-readable this round, see Gaps).* Source: DT Swiss "Tubeless
Ready Kit User Manual V2013.11" (dtswiss.com, fetched PDF via bottico.cz mirror); stans.com
"Tubeless Guide" (fetched); si.shimano.com "Installing and removing tubeless tires" SI-0036A
(fetched as PDF but pictogram-only/non-extractable — corroborating quotes are search-summary
tier only), all 2026-07-18.

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

**WHL-43 — Thru-axle install is a real torque spec, not "tighten firmly," and SRAM's own support
docs establish that axle torque is functionally coupled to Eagle Transmission's derailleur
behavior, not just wheel retention — closing part of this chapter's long-standing "no general
torque-spec table" gap for the axle mechanism itself.** DT Swiss's official RWS (Ratchet
WheelMounting System) User Manual V2020.11 (dtswiss.com, fetched primary): the lever is hand-
tightened clockwise "as tight as possible by hand," to a stated **minimum 15 N·m / maximum
20 N·m** — a hand-torque range, not a wrench spec, because the RWS is a cam-lever design (WHL-23's
QR/thru-axle distinction extended: RWS is a *threaded* thru-axle with a lever handle, a hybrid of
both mechanisms). DT Swiss gives a field verification method AND explicitly warns about its
limits: lift the wheel off the ground and strike the tire hard from above several times — the
wheel must not loosen or fall out — but **"this test does not guarantee that the RWS is preloaded
with the minimum force of 15 N·m."** SRAM's own support article on Eagle Transmission (support.
sram.com, fetched primary) establishes a direction-aware coupling this chapter didn't have
before: **"Axle torque plays a role in how hard it is to rotate the Eagle Transmission rear
derailleur rearwards with an impact, as well as how hard it is to reset it manually"** — i.e. on
a Transmission-equipped bike, axle torque isn't purely a wheel-retention spec, it also tunes how
the derailleur's impact-absorbing Overload/Reset clutch behaves, so SRAM's guidance is to follow
"the axle torque recommendations specified by your specific bike or axle manufacturer" rather
than publishing one universal number — the same "read the part's own spec, not a generic
standard" pattern `cockpit-contact.md` CKP-12/13 already established for stem clamps. Trek's own
owner's-manual torque page (trekbikes.com, fetched primary) reinforces the general discipline
(over-tightening doesn't add holding power and risks damage; under-tightening risks fatigue
failure) and independently corroborates the ~40 N·m pedal-torque cluster CKP-11/CKP-20 already
carry (**"40-43 N·m"** for pedals) — a third source landing in the same mid-30s-to-low-40s band.
*Confidence: confirmed (DT Swiss's fetched primary manual for the RWS hand-torque range and
knock-test caveat; SRAM's fetched primary support article for the Transmission-behavior coupling;
Trek's fetched primary page for the general torque-safety framing and pedal cross-check).*
Source: DT Swiss "RWS User Manual V2020.11" (dtswiss.com, fetched PDF via bikeshop.no mirror);
support.sram.com "What is the correct torque for my thru axle when using SRAM Eagle Transmission?"
(fetched); trekbikes.com "Owner's manual - torque" (fetched), all 2026-07-18. **Narrowed, not
closed:** this is one thru-axle *system* (DT Swiss RWS) with one real number; bolt-on thru-axles
from other makers (Fox, RockShox, Shimano) were not independently fetched-confirmed this round —
a WebSearch-tier figure surfaced Fox's non-QR front axle at 2.3 N·m, but wasn't corroborated by a
primary fetch, so it's omitted here rather than cited at a tier this chapter's discipline
wouldn't accept.

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

## Hub bearings & freehub internals (L2 — DT Swiss + Shimano hub service manuals)

**WHL-36 — DT Swiss's Ratchet freehub system is NOT a pawl-and-spring mechanism despite the
generic "freehub pawls" language riders use — it's two toothed rings under spring pressure,
and DT Swiss's own manuals document FOUR mechanically distinct Ratchet variants that are not
interchangeable service procedures.** Ratchet (two loose ratchets, seal on the hub side),
Ratchet EXP (one loose + one THREADED ratchet — the threaded ratchet screws into the hub
shell and must be unscrewed with a dedicated tool before the bearing is accessible, "due to
the torque acting on the ring nut during pedaling, the ring tightens while riding... requires
a high force"), Ratchet LN, and Ratchet DEG (with an optional second "DF" ratchet/ring-nut
stage) each have their OWN numbered disassembly sequence in DT Swiss's technical manuals —
picking the wrong manual for a given hub's Ratchet sub-type risks damaging a part the
procedure assumes is absent (e.g., attempting EXP's threaded-ratchet removal tool on a
plain-Ratchet hub that has no threaded ratchet to grip). **Grease quantity is safety-critical,
not cosmetic**: DT Swiss's explicit warning — *"If too much grease is applied on the ratchets,
the actuation of the ratchets may not work. The ratchets may slip during pedaling"* — only a
thin, even layer of the red DT Swiss-specific grease is correct; more is a functional failure,
not just a maintenance nicety (contrast typical bearing grease, where more is rarely harmful).
Hub bearings are sealed cartridge units pressed in/out with a dedicated installation cylinder
(no cup-and-cone preload adjustment exists on these hubs at all — see WHL-37 for the
architecturally different Shimano approach); a drive-side bearing is pressed to protrude
**1-2 mm beyond the ratchet** before final seating, a specific tolerance, not "flush." Freehub
spacer length is a documented failure-mode check, not just a part to reinstall: if a
thru-axle over-tightening has compressed the spacer, DT Swiss gives an exact minimum
length below which it must be replaced — **10.7 mm** (180-hub Ratchet EXP manual) /
**15.4 mm** (Ratchet LN manual, a different hub family with a different-length spacer) —
a spacer shorter than spec presents as a blocked/non-engaging freewheel that looks like a
ratchet fault but is actually a compressed-spacer fault. *Confidence: confirmed (fetched
primary, four separate technical manuals cross-checked for the variant-specific procedure
claim).* Source: DT Swiss "Ratchet Hubs (180, 240, 350) Technical Manual" V2022.09
(dtswiss.com/pmt/…/MAN_WXD10000000896S_WEB_EN_001.pdf, fetched) + "Ratchet EXP Hubs Technical
Manual" V2022.01 + "Ratchet LN Hub Technical Manual" + "Ratchet DEG Hubs Technical Manual"
(all dtswiss.com, fetched 2026-07-18).

**WHL-37 ⚠ potential mechanic-education gap (not a catalog contradiction) — Shimano's hub
architecture is fundamentally different from DT Swiss's, not just a different brand of the
same design: cup-and-cone with a FEEL-ADJUSTED preload, not a sealed press-fit cartridge.**
Shimano's dealer manuals describe tightening a **cone** against the bearing race by hand-feel
("adjust the bearing preload") BEFORE torquing a separate **lock nut** against it to
"double-lock the assembly" — the cone sets play/preload, the lock nut only prevents the cone
from working loose, a two-step adjustment procedure with no DT Swiss equivalent (DT Swiss's
cartridge bearings have no adjustable preload at all — replace the sealed unit, don't tune
it). Lock-nut double-lock torque is genuinely model-specific, not one number: **18-20 N·m**
(front hub, one dealer manual), **17-22 N·m** (freehub, general spec), **15-19 N·m**
specifically for the WH-RX870/WH-RX570 wheel models — three different figures across a
handful of fetched pages, the hub-bearing analog of this chapter's already-established
"don't assume one torque spec generalizes" pattern (mirrors `cockpit-contact.md` CKP-12/13's
bar/stem finding). **Mechanic takeaway with no engine-rule equivalent (this is technique
knowledge, not a `checkBuild` fact — flagged per corpus convention for a genuinely different
kind of fact, not a contradiction to an existing rule):** a mechanic who services a DT Swiss
hub like a Shimano hub (hunting for a cone to adjust) or a Shimano hub like a DT Swiss hub
(assuming the bearing is a sealed drop-in unit with no preload step) will get the job wrong in
opposite ways — over-tightening a DT Swiss cartridge bearing seat that was never meant to be
adjusted, or under/over-preloading a Shimano cone left too loose/tight because no torque spec
alone captures the by-feel step. *Confidence: confirmed (fetched primary, multiple si.shimano.com
dealer manuals).* Source: si.shimano.com "Hub Set (Disc Brake)" (DM-MAHB001, fetched) +
(DM-GAWH001-03, DM-GAWH001-06, DM-HB0003-07, DM-LAHB001-01, DM-RAHB002-02, all si.shimano.com,
fetched 2026-07-18).

**WHL-40 — Closing the WHL-36/37 gap note by name: Industry Nine's own fetched Hydra service
document confirms a THIRD distinct hub architecture (neither DT Swiss's Ratchet toothed-ring nor
Shimano's cup-and-cone), and Hope's parts diagram confirms Hope uses generic ISO-standard
cartridge bearings rather than a proprietary bearing design.** Industry Nine's Hydra service PDF
(industrynine.com/documents/hydraservice.pdf, fetched primary): endcaps pull off by hand (held
by an o-ring, "do not requ[ire tools]"), the freehub then "can be pulled off by hand" with a
counterclockwise twist, and the **drive mechanism's pawls and springs simply "slide out of the
pawl and spring pockets" by hand** once the freehub is off — no threaded ratchet-removal tool
(contrast WHL-36's DT Swiss Ratchet EXP) and no cone/lock-nut preload adjustment (contrast
WHL-37's Shimano). Bearing replacement is straight cartridge press-fit: the document's own
**Bearing Layout Chart names exact ISO bearing part numbers per hub variant** (e.g. 6-bolt
mountain front = 1× 61804 both sides; 6-bolt mountain rear = 1× 15307 drive-side, 1× 61804
non-drive; Micro Spline freehub = 1× 152610 inboard + 2× 6802 outboard), pressed in with the
explicit orientation rule **"grey side of bearing is designed to face outward,"** removed by
tapping the axle from one side to drive out the opposite bearing. Industry Nine states this
tool-free, no-proprietary-parts design as a deliberate product philosophy, not an accident:
their own support-page copy calls it engineered "so that servicing the product is accessible and
intuitive," with "no proprietary tools required" repeated verbatim across both the Hydra and
Torch support pages. Hope Technology's own Pro 5 rear-hub assembly diagram (hopetech.com,
fetched primary) independently confirms the same generic-cartridge pattern on a different maker:
its 150 mm rear hub uses a plain **S6903 (17×30×7 mm) cartridge bearing** — a standard ISO
bearing size sold by any bearing supplier, not a hub-specific part — at both bearing positions,
the same "sealed cartridge, no adjustable preload" family as DT Swiss's architecture (WHL-36)
rather than Shimano's feel-adjusted cup-and-cone (WHL-37). **Mechanic takeaway (technique
knowledge, no `checkBuild` equivalent, per WHL-37's convention):** three major MTB hub brands
now have sourced service architecture, and they split two ways, not three — DT Swiss and Hope
both use sealed non-adjustable cartridge bearings (replace, don't tune), while only Shimano uses
an adjustable cup-and-cone; Industry Nine's Hydra additionally distinguishes itself by needing NO
dedicated tool for the freehub/pawl service step at all, where DT Swiss's Ratchet EXP variant
requires one. *Confidence: confirmed (both fetched primary — I9's own service PDF with named
bearing part numbers, and Hope's own assembly diagram with a named bearing spec).* Source:
industrynine.com "Hydra Service" (documents/hydraservice.pdf, fetched) + "Hydra Product Support"
page (industrynine.com/support/hydra, fetched); hopetech.com "PRO5 Rear Hub Assembly"
(_repository/1/documents/PRO5_157_Assembly.pdf, fetched), all 2026-07-18. **Narrowed, not fully
closed:** hub bearing dimensional press-fit tolerances (bore/shell interference specs, as
opposed to the part number / assembly sequence now sourced for three brands) remain unsourced —
see Gaps, unchanged from the prior round's note.

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

## Spoke-length calculation (ERD theory)

**WHL-41 — Spoke length is a two-step trigonometry problem (law of cosines, then a Pythagorean
correction), and Effective Rim Diameter (ERD) — not the rim's outer or bead-seat diameter — is
the one measurement errors most easily hide in.** Sheldon Brown's site (author John Allen,
fetched primary): the first step applies the law of cosines, `C = √(A² + B² − 2AB·cos θ)`, where
A and B are the hub flange's spoke-hole-circle radius and the rim's spoke-hole-circle radius
(i.e. ERD ÷ 2) and θ is the angle between adjacent spoke holes (set by spoke count and cross
pattern); the second step applies the Pythagorean theorem with a small correction for the hub
flange's offset from the wheel centerline and the spoke hole's own diameter: `L = √(C² + w²) −
d/2`. **ERD is explicitly NOT the rim's outer diameter, the bead-seat diameter (BSD, WHL-17), or
the inner-hoop diameter** — it's "the diameter on which you want the ends of the spokes to lie,"
i.e. the diameter through the point where the spoke nipple head sits, and Sheldon Brown's own
framing (quoting Howard Sutherland) is blunt about why this matters: *"One measurement is worth
50 expert opinions"* — published ERD databases exist and are useful for identification, but
"only after you have mostly laced up a wheel will you discover whether spoke length is correct,"
so measuring your own rim/hub is the professional practice, not a shortcut around it. Park Tool's
own ERD article (parktool.com, fetched primary) gives the practical measuring-stick technique —
two spare spokes with nipples threaded exactly to the nipple's slot-bottom ("a 'perfect' spoke
length would result in the spoke ending just at the bottom of the slot"), inserted into two
holes 180° apart, to derive ERD without a rim database at all — and quantifies the tolerance
window a correct spoke length actually has: too long causes the spoke to protrude past the
nipple (can puncture the rim strip/tube, or run out of threads before reaching final tension);
too short risks inadequate thread engagement and loosening; but the safe window in between is
**"a larger window than you might expect"** — a spoke ending anywhere from filling all the
nipple's threads down to about 4 mm shorter is still "totally acceptable," because bicycle
spokes run a 56 TPI thread (≈0.45 mm pitch per full turn), so a few visible threads below the
nipple represent only ~1.5 mm of reduced engagement out of roughly 10 mm of total thread length
inside a typical nipple. *Confidence: confirmed (both fetched primary — Sheldon Brown/John
Allen's formula derivation and Park Tool's independent measuring-stick method and tolerance
figures corroborate each other without contradiction).* Source: sheldonbrown.com "Measurements
for Bicycle Spoke-Length Calculations" by John Allen (fetched); parktool.com "Measuring
Effective Rim Diameter" (Calvin's Corner blog, fetched), both 2026-07-18. This is the calculation
theory underneath WHL-19/20/25's truing/lacing facts and WHL-17's BSD/ERD distinction — the
catalog has no lacing/ERD fields (wheels are sold complete, per WHL-25's closing note), so this
is mechanic-agent background knowledge, not a `checkBuild` input.

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

**WHL-38 — WHL-35's cross-brand tensiometer problem, now landed as two actual fetched charts:
Park Tool's own 2024 TM-1 conversion table (14 spoke-gauge/material columns) and a DT Swiss
tensiometer's factory calibration sheet issued FOR Sapim spokes — and side by side they prove
the "no universal reading" warning quantitatively, not just in principle.** Park Tool's TM-1
Tension Meter Conversion Table (parktool.com, official PDF, fetched) gives a full deflection-
reading-to-kgf grid across 23 spoke types: steel round 1.4/1.5/1.6/1.7/1.8/2.0/2.3/2.5/2.6 mm,
nine steel bladed profiles, aluminum round/blade, titanium round/bladed, Berd PolyLight, DT
Swiss Revolite, Mavic R2R carbon blade, and three Spinergy PBO profiles — **at the same
deflection reading of 20, a 1.4 mm steel round spoke reads 172 kgf while a 2.0 mm steel round
spoke reads only 70 kgf**, a 2.5x difference at one identical instrument reading, exactly the
"different gauges deflect differently under the same force" mechanism WHL-35 described in the
abstract. Separately, a DT Swiss-brand tension meter's own factory calibration sheet issued
specifically **for Sapim's spoke range** (ref. YD370943, "Customer: SAPIM," fetched via
wheelpro.co.uk) shows the same cross-model spread on ONE tensiometer body: at 120 kg (1.177 kN)
actual tension, the instrument reads **312 for a Sapim G13 (2.30 mm round)** but only **68 for a
Sapim CX-Ray** (bladed aero) — proving the calibration divide isn't just cross-*brand* (a DT
Swiss meter vs a Sapim spoke) but cross-*model within one brand's own range* (thick round vs
thin bladed), a sharper and more concrete version of WHL-35's warning than the prior round could
document. *Confidence: confirmed (both fetched primary tables — Park Tool's official 2024 PDF
and a DT Swiss/Sapim factory calibration document via a wheel-building retailer's tensiometer
support page).* Source: parktool.com "TM-1 Tension Meter Conversion Table" 2024 edition (fetched
PDF); wheelpro.co.uk "sapim_dt_chart.pdf" — DT Swiss tension-meter-to-Sapim-spoke-range
calibration sheet, ref. YD370943 (fetched PDF), both 2026-07-18.

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
- **Hooked (TC) vs hookless (TSS) rim/tire compatibility is direction-aware, the same shape as
  WHL-10's rotor/adapter asymmetry** (WHL-42): a TSS-rated tire can go on either a TC or a TSS
  rim, but a TC-only tire cannot safely go on a TSS rim — one direction is a strict subset of the
  other, not a symmetric either-way pairing, and TSS additionally caps max pressure lower than
  the same nominal size on TC (quantified per rim-width/tire-width cell in WHL-42's fetched
  table).
- **ERD is the hidden variable underneath every spoke-length figure** (WHL-41): WHL-9's tire-width
  envelope and WHL-1's wheel-size matching both describe what fits ON a built wheel, but ERD
  governs whether the wheel gets built correctly in the first place — a rim with the right BSD
  and the right published ETRTO width can still take the wrong spoke length if its ERD was
  guessed rather than measured (WHL-41's "one measurement is worth 50 expert opinions").
- **Axle torque reaches past the wheel into the drivetrain on a Transmission-equipped bike**
  (WHL-43, a wheels↔drivetrain interaction — see [`drivetrain.md`](drivetrain.md)): a correctly-
  torqued axle isn't just wheel retention, it's also part of how SRAM's Eagle Transmission
  derailleur absorbs and recovers from an impact, so under- or over-torquing the axle on a UDH/
  Transmission build is a drivetrain-behavior fault wearing a wheel-fastener's clothes.
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
  DT Swiss's own numbers make the sequence concrete (WHL-39): tape overlaps 10-15 cm and seats
  before the valve is punched through it, the valve nut goes hand-tight only (over-torquing it
  is not the fix for a leaking base), and sealant is a stated 75 ml poured before the second bead
  goes on — inflation to "the lower max of either the rim or the tire" comes last, the same
  lowest-of-the-published-maxes principle WHL-10/42 apply to the rim/tire width and pressure
  envelopes.
- **A DT Swiss Ratchet EXP hub's threaded ratchet must come out before the bearing is
  reachable at all** (WHL-36): the dedicated unscrewing tool is a hard prerequisite step, not
  an optional shortcut — the manual explicitly warns the ring tightens further while riding,
  so a mechanic skipping straight to "pull the bearing" on this specific Ratchet sub-variant
  is stuck until the correct tool and step order is used.
- **Shimano's hub preload is set by FEEL before the lock nut is ever torqued** (WHL-37): the
  cone-then-lock-nut sequence is inherently two-step and order-dependent — torquing the lock
  nut before the cone's play/preload is dialed in locks in whatever (wrong) preload the cone
  happened to be at, the hub-bearing analog of `suspension.md` SUS-21/22/23's "sag before
  damping" install-order rule.
- **Industry Nine's Hydra freehub disassembles in the opposite order from DT Swiss's Ratchet
  EXP** (WHL-40 vs WHL-36): where a Ratchet EXP hub requires a dedicated tool to unscrew a
  threaded ratchet BEFORE the bearing is reachable, a Hydra freehub pulls off by hand with no
  tool at all, and its pawls/springs then lift out of their pockets by hand too — the same
  "check which architecture you're holding before reaching for a tool" caution WHL-37 raised for
  Shimano now applies three ways, not two, and picking the wrong hub's procedure at the wrong
  step (assuming a tool is needed when it isn't, or the reverse) wastes a step either direction.
- **A DT Swiss tensiometer reading must be looked up against the SPOKE actually installed, not
  a spoke-model-agnostic scale** (WHL-38, sharpening WHL-35): the DT-Swiss-for-Sapim calibration
  sheet exists specifically because a generic reading is meaningless without knowing which of
  Sapim's own spoke models (G13 vs CX-Ray, a 4.6x reading spread at identical tension) is on the
  wheel — checking tension is itself an install-order-adjacent step that depends on correctly
  identifying the part before the tool is even used.

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

## Lacing constraints & hub bearing preload (Industry Nine primary docs)

**WHL-44 — A hub manufacturer can PROHIBIT a lacing pattern outright, and can constrain which
way a spoke crosses at the flange — Industry Nine publishes both for Hydra2 classic flanged
hubs.** From i9's own Hydra2 lacing-pattern document:
- **Pattern restriction:** *"28h - 32h Hubs are intended for a 2x or 3x pattern. Radial lacing
  prohibited."* This is a flat manufacturer prohibition, not a recommendation — and it is the
  cleanest available answer to a question this chapter previously had no sourced position on
  (whether radial lacing is a rider preference or a hub-warranty matter). For this hub family it
  is the latter.
- **Crossing orientation at the flange:** the Hydra2 flange is **scalloped**, with alternating
  *"ridge"* and *"valley"* sections, and i9 specifies which one the spoke must cross in:
  *"The first crossing for any spoke will occur in the 'valley' of the flange when laced properly.
  Re-lace if the first spoke crossing is occurring across a 'ridge.'"* — i.e. a wheel can be
  correctly tensioned and true and still be **built wrong**, with the error visible only at the
  flange. This is exactly the kind of lacing-*orientation* fact the chapter's Gaps list named as
  missing, and it is distinct from the lacing *order* question (which spoke goes in which hole
  first), which this document does not answer.
- **A build-time orientation check** that costs nothing: *"When laced the circular Industry Nine
  logo should be visible from the rim's valve drilling."*

Scope honesty: this is **one manufacturer's** hub family, not a general wheel-building law —
radial lacing is legitimate on many front hubs, and nothing here generalises to other brands. The
transferable lesson is procedural: **check the hub maker's own lacing document before choosing a
pattern**, because pattern legality and crossing orientation are per-hub published constraints,
not universal ones. *Confidence: confirmed (fetched manufacturer PDF).* Source: web.archive.org
snapshot of industrynine.com/documents/hydra2-lacing-pattern.pdf (snapshot 20250319161005),
2026-07-18. Cross-reference: WHL-28 (DT Swiss build procedure), DRV-62 (same document set's
freehub internals).

**WHL-45 — Industry Nine builds a deliberate bearing PRELOAD into the hub at assembly that is
designed to be CANCELLED by the axle clamping force — so an i9 hub feeling slightly stiff out of
the frame is correct, not faulty.** i9's own bearing-preload document explains the design:
- **How it's built:** *"The first bearing is pressed into the hub shell, sitting flush with both
  the shell and the axle. The second bearing is pressed onto the axle, sitting flush with the axle
  but not the shell, causing a slight amount of compression on the axle."* That compression
  *"pushes the bearing rings against the balls,"* creating a small, intentional friction.
- **How it's cancelled:** *"When the hub is installed in the frame or fork, the clamping force
  from the mounting system applies pressure to the axle. This counteracts the initial preload,
  relieving pressure on the bearing rings and allowing them to spin freely with minimal friction."*
- **Why it exists** — i9's stated reasoning, which is the genuinely useful engineering content:
  *"Without initial preload, the clamping force alone would over-compress the bearings, leading to
  excessive friction, premature wear, and potential damage."* The preload is a **budget** for the
  clamping force to consume. It also, by i9's account, *"avoids the need for heavier or finicky
  adjustment mechanisms found in other hubs"* — i.e. it is an explicit design alternative to an
  adjustable-preload collar, and the reason i9 hubs have no preload adjuster to look for.

**Diagnostic consequence worth carrying:** spinning an i9 wheel *out of the bike* and judging its
bearings by feel is a **false-negative test** — the preload is supposed to be present then. The
same reasoning inverts a common workshop instinct: a hub that spins perfectly freely out of the
frame may be *under*-preloaded, and will be over-compressed once clamped. This is a
brand-specific design philosophy, clearly labelled as such — it does NOT transfer to
adjustable-preload or cup-and-cone hubs, where free-spinning-in-hand is the correct target.
*Confidence: confirmed (fetched manufacturer PDF; note this document is an engineering-rationale
page — it states the design principle and its reasoning, but publishes no preload FORCE figure or
tolerance, so the quantitative side stays unsourced).* Source: web.archive.org snapshot of
industrynine.com/documents/hydra2-preload-bearing.pdf (snapshot 20250319151602), 2026-07-18.
Cross-reference: DRV-62 (i9 bearing sizes per hubshell type), and `frame-standards-bearings.md`'s
press-fit/interference-fit material.

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
  **WHL-35 explains WHY a cross-brand table is hard, not just unfetched:** dial
  tensiometers read spring deflection, not tension directly, so a DT Swiss reading can't be
  validly compared to a Sapim spoke without each maker's own gauge-specific conversion chart —
  a true cross-brand table needs matched conversion charts as well as matched target numbers,
  raising the bar on what "closing this gap" actually requires. **CLOSED 2026-07-18 (WHL-38) —
  the actual conversion charts WHL-35 called for are now landed:** Park Tool's own 2024 TM-1
  conversion table (23 spoke-type columns) and a DT Swiss tensiometer's factory calibration
  sheet issued specifically for Sapim's spoke range, both fetched primary, quantify the
  cross-gauge divide WHL-35 could only describe in principle (e.g. a 2.5x reading spread between
  1.4mm and 2.0mm steel spokes at one identical deflection reading). Sapim's own numeric
  tension-target table (as opposed to a DT-meter-for-Sapim-spokes calibration sheet, which is a
  different document) is still not sourced — Sapim's site continues to 404 on its own
  spoke-tension-meter pages — so DT Swiss remains the only maker with its own **target** table
  (WHL-26/27), even though the **conversion-chart** gap WHL-35 raised is now closed.
- **Fatigue-failure data — L3 gap, PARTIALLY CLOSED 2026-07-17.** WHL-30/31/32 now carry DT
  Swiss's own load/unload-cycle mechanism (quantified: ~430 cycles/km on a 29" wheel) and named
  under-/over-tension failure directions, plus Sapim's fetched fatigue-test protocols (endurance
  cycle counts, impact energies) and spoke-breakage causal taxonomy. Still missing: a genuine
  **S-N curve** (stress amplitude vs. cycles-to-failure) for a specific spoke gauge/alloy — what's
  sourced is test *methodology* and qualitative failure causes, not a quantitative
  fatigue-life dataset a wheelbuilder could design against.
- **No tubeless sealant chemistry/failure-mode depth — L3 gap, still open.** WHL-21/22/39 now
  cover setup mechanics with real numbers (75 ml sealant fill, 10-15 cm tape overlap, tape-width
  selection, storage temperature) and the "brands aren't always compatible" warning, but not
  *why* (latex vs. other sealant chemistry, clogging mechanism, burp-pressure-by-casing
  thresholds) — CURRICULUM.md's other named L3 example for this chapter, unchanged by this
  round's WHL-39 addition (which deepened the *install* procedure, not the chemistry).
- **Shimano's tubeless-tape SI document (SI-0036A) is a source-quality gap, not a content gap —
  flagged 2026-07-18 (WHL-39).** The PDF fetches successfully (valid PDF, confirmed via `file`)
  but extracts as either blank or as a corrupted/undecodable stream on every tool tried this
  round (WebFetch, Exa fetch, Bright Data scrape + local pdftotext) — likely a pictogram-only
  Shimano SI sheet with no embedded text layer, or a compression scheme the available extractors
  don't support. WHL-39's Shimano figures are search-summary tier as a result. A future round
  with a working PDF-to-image + OCR path (or a text-bearing dealer manual covering the same
  procedure) could upgrade this to fetched-primary.
- **CLOSED 2026-07-18 (WHL-36/37) — hub bearing/freehub internals now sourced for both major
  architectures.** DT Swiss's Ratchet-system freehub service (four mechanically distinct
  sub-variants — Ratchet/EXP/LN/DEG — each with its own disassembly sequence, sealed cartridge
  bearings with no adjustable preload, a safety-critical thin-grease-only warning, and two
  documented minimum spacer lengths for the failure-mode check) and Shimano's architecturally
  different cup-and-cone system (feel-adjusted cone preload set BEFORE a separate lock-nut
  torque, with per-model torque figures ranging 15-22 N·m across the fetched pages). **Narrowed further, CLOSED 2026-07-18 (WHL-40) for the named brand-coverage gap:** Industry
  Nine's Hydra service architecture is now sourced (fetched primary — tool-free freehub/pawl
  service, named ISO cartridge bearing part numbers per hub variant, grey-side-out orientation
  rule) and Hope Technology's generic-cartridge-bearing pattern is independently confirmed
  (S6903 17x30x7mm on the Pro 5 rear hub) — three major MTB hub architectures now sourced (DT
  Swiss Ratchet, Shimano cup-and-cone, Industry Nine/Hope sealed-cartridge). Still open: neither
  DT Swiss's, Shimano's, Industry Nine's, nor Hope's *bearing press-fit tolerance* numbers
  (bore/shell dimensional interference specs, as opposed to the part number / assembly
  *procedure*, now sourced for all four) were found on any fetched page —
  `frame-standards-bearings.md`'s FRM press-fit facts cover BB shells, not hub shells, so this
  remains a real cross-chapter gap. **L2/L3 gap narrowed to: hub bearing dimensional press-fit
  specs only** (the brand-coverage half of this gap is now closed).
- **No general torque-spec table — L2 gap, PARTIALLY CLOSED 2026-07-18 (WHL-43).** WHL-34 already
  had one real number (Sapim TCS nipples: 200+ Nm without twisting); WHL-43 adds the axle side —
  DT Swiss RWS's official hand-torque range (15-20 N·m) and SRAM's Eagle Transmission
  axle-torque-affects-derailleur-behavior coupling. Still missing: bolt-on (non-lever) thru-axle
  torque from Fox, RockShox, or Shimano (a WebSearch-tier Fox figure of 2.3 N·m surfaced but
  wasn't primary-fetched, so it's deliberately not cited in WHL-43); rotor-bolt/cassette-lockring
  torque are covered cross-chapter (`brakes.md` BRK-41, `frame-standards-bearings.md` FRM-34) but
  this chapter's own spoke-nipple/axle pair is now two real data points, not zero.
- **CLOSED 2026-07-18 (WHL-43) — axle install torque, the specific item this Maturity header
  named as the last holdout keeping the chapter graded `foundation`.** See the Maturity header
  above for the reasoning behind the regrade to `professional`. **New open question this closure
  surfaces:** wheel-size *configuration* (WHL-1/2/3) may not have an L2 tier at all — it's a
  compatibility rule about which frame/wheel combos exist, not a serviceable mechanism with its
  own service manual — so a future round should first confirm whether "no L2 fact for wheel-size
  config" is a genuine gap or a category error before spending research time hunting for one.
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
  **— UPDATE 2026-07-18 master round (WHL-44): the lacing-ORIENTATION half is now sourced,**
  and it turned out to be a different (and more verdict-relevant) fact than the lacing-order
  question this gap was written around. Industry Nine's Hydra2 lacing document publishes a hard
  **pattern prohibition** ("Radial lacing prohibited" on 28-32h classic flanged hubs; 2x or 3x
  intended) and a **flange-crossing orientation rule** (first crossing must fall in the scalloped
  flange's "valley", never across a "ridge" — a wheel can be true and correctly tensioned and
  still be built wrong). The generalisable lesson is procedural rather than universal: pattern
  legality is a **per-hub published constraint**, so the hub maker's own lacing document is the
  authority, not a general rule of thumb. **Still genuinely open: lacing ORDER** (which spoke
  enters which hole first / spoke-tree sequencing) and the from-scratch **tensioning** sequence
  on a bare rim. Both remain *unfetched* rather than source-exhausted — Park Tool's wheel-building
  series and DT Swiss's builder documentation are both plausible live leads that this round did
  not spend budget on.
- **CLOSED 2026-07-18 master round (WHL-45) — hub bearing PRELOAD philosophy**, a real L3
  bearing-engineering fact this chapter had no sourced position on. Industry Nine publishes both
  the mechanism (second bearing pressed flush to axle but not shell, deliberately compressing the
  axle) and the design intent (the axle clamping force **cancels** that preload, so the preload is
  a budget for clamping load rather than a defect). The practitioner consequence is the valuable
  part and it inverts a common workshop instinct: **judging an i9 hub's bearings by spinning it
  out of the frame is a false-negative test** — stiffness there is correct, and a hub that spins
  perfectly freely in the hand may be under-preloaded. Explicitly labelled brand-specific: it does
  NOT transfer to adjustable-preload or cup-and-cone hubs. **Remaining sub-gap:** i9's document is
  an engineering-rationale page and publishes **no preload force figure or tolerance band**, so
  the quantitative side is unsourced — and given that makers generally treat assembly preload as
  internal manufacturing spec rather than published data, this specific number is a **likely
  source-exhausted** target, not an obvious re-fetch. Cross-brand preload comparison (Hope's and
  DT's adjustable-collar approaches) is a genuine and probably fetchable follow-up.
- **BMX/DJ wheel facts (WHL-3/7/8) are still thin relative to MTB** — off-live but same
  foundation bar; a future round could deepen BMX peg/axle and DJ wheel-size sourcing beyond the
  design-doc/community tier they currently carry.
- **No race-day wheel/tire setup judgment (pressure-as-strategy, pit-wheel-swap procedure) —
  L4 gap**, and expected to arrive last per CURRICULUM.md.
- **CLOSED 2026-07-18 (WHL-41) — spoke-length/ERD calculation theory, a previously-undocumented
  L1 gap.** The trigonometric derivation (law of cosines + Pythagorean correction) and the
  practical measuring-stick method for deriving ERD without a rim database are now sourced from
  two independent fetched primaries (Sheldon Brown/John Allen, Park Tool) that corroborate each
  other. Still missing: dish/offset-specific spoke-length variants (the two-flange-distance case
  for a disc-brake front or a cassette-dished rear needs the same formula applied twice with
  different `w` values — WHL-41 states the formula handles this via the flange-to-centerline
  term but doesn't walk a worked dished-wheel example), and no spoke-length calculator's specific
  rounding/safety-margin convention (round down vs round to nearest even mm) was sourced.
- **CLOSED 2026-07-18 (WHL-42) — a fetched manufacturer restatement of the actual ETRTO/ISO 5775
  numeric tables, closing a real gap this chapter had (WHL-9/10/17/18 established the standard's
  existence and Schwalbe/WTB's width-envelope restatements, but no source had actually shown the
  standard's own rim-width × tire-width × pressure grid before this round).** Mavic's full table
  was only read for the 700C/29" tubeless sheet (page 4 of the source PDF) — the 650B/27.5",
  26", and tube-type sheets (pages 5-9) exist in the same document but weren't individually
  transcribed this round, a narrow-but-real completeness gap for a future pass. The ISO
  5775/4210 standards themselves remain unfetched (paywalled, per this round's brief) — every
  figure in WHL-42 is one hop removed via a manufacturer's own restatement, the same tier this
  chapter already carries for WHL-9/10.

## Open mechanic questions (for the human review — do not act)
- WHL-2: any defensible deliberate 27.5F/29R build (trials/DJ conversions)?
- WHL-5: is a Super-Booster 148→157 conversion an everyday fix or a job to steer customers away
  from? Does the re-dish cause caliper-alignment trouble in practice?
- WHL-10: when ETRTO and a rim maker disagree, which do you follow — and should the tool warn
  "outside ETRTO" even when the maker blesses it?
- WHL-7: which DJ front-axle variants are common enough to warrant first-class vocab?
