# Wheels & Tires — Mechanic Corpus

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

### Wear / setup couplings
- **Rim width shapes the tire's real profile:** a wide tire on a narrow rim balloons (squirm,
  burping); a narrow tire on a wide rim squares off (sidewall exposure, pinch risk) — this is
  the physical basis of both WHL-11 directions.
- **Re-dished wheels retension unevenly** — the SuperBoost/Boost bridge (WHL-5) leaves a wheel
  with asymmetric spoke tension, a durability coupling behind keeping it an error.
- **Tire clearance shrinks under load/mud:** published static clearances (WHL-12/13) are the
  ceiling; dynamic clearance is tighter, which is why the tiers are warnings even at the max.

---

## Open mechanic questions (for the human review — do not act)
- WHL-2: any defensible deliberate 27.5F/29R build (trials/DJ conversions)?
- WHL-5: is a Super-Booster 148→157 conversion an everyday fix or a job to steer customers away
  from? Does the re-dish cause caliper-alignment trouble in practice?
- WHL-10: when ETRTO and a rim maker disagree, which do you follow — and should the tool warn
  "outside ETRTO" even when the maker blesses it?
- WHL-7: which DJ front-axle variants are common enough to warrant first-class vocab?
