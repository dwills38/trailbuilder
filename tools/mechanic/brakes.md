# Brakes — Mechanic Corpus

**Maturity: professional** (L1 complete + meaningful L2 service-manual depth — see
[`CURRICULUM.md`](CURRICULUM.md)). Broadened 2026-07-17 with Park Tool / Sheldon Brown /
TRP-primary mount-standard, alignment, rotor-hardware and pad/bleed facts. Same-day
follow-up round added a first L2 slice (BRK-28–34): the Shimano XTR/XT/SLX dealer manual's
torque table, wear floors, free-stroke/reach distinction, quantified bed-in procedure, and FM
screw-length table — plus resolved the BRK-17 FM↔PM adapter CONTRADICTION with
manufacturer/maker-primary sources for both directions. **This round (BRK-35–40) upgrades the
grade to `professional`:** mined the SAME Shimano manual's full oil-fill/bleed procedure
(BRK-35, the round-1 stopping point) and diaphragm replacement (BRK-37), established that
Shimano's own dealer manual does NOT document piston/seal-kit service (BRK-36 — a genuine
content gap in Shimano's own docs, now closed as "not published" rather than "unresearched"),
and added a full **second manufacturer's** L2 coverage — SRAM's own service manuals — for the
same caliper/lever/bleed domain: SRAM's three bleed-port mechanisms and double-syringe
push/pull method (BRK-38, with a real cross-brand torque contrast against Shimano), a full
caliper piston/seal-kit rebuild procedure SRAM does publish (BRK-39), and a non-bleed
spongy-lever fix (BRK-40). The chapter now has genuine L2 depth — bleed procedures, torque
tables, and piston/seal service — across its two dominant manufacturers, not just one. Still
short of `master`: no TRP/Hayes/Magura L2 torque/bleed coverage, no L3 specialist depth
(quantified pad-compound heat-fade science) — see `## Gaps` below.

Caliper · rotor · mount standards · adapters · levers · lever↔shifter integration.
Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline, conventions).

Fact IDs are stable and append-only (`BRK-n`). Confidence is the source's own grading.

---

## Caliper mounts

**BRK-1 — Caliper mount must match the fork/frame mount.** Post Mount (PM) and Flat Mount
(FM) are distinct caliper-mounting standards; an FM caliper on a PM fork (and vice versa) is a
genuine non-fit. *Confidence: confirmed.* Source: EXPERT-REVIEW-DOSSIER.md §8 (live on real FM
calipers, e.g. `bk-shimano-xtr-m9110-fm`).

**BRK-2 — Post-mount SIZE (PM160/180/200 native) is not a *mount* fact — it's delegated to
rotor min/max.** Whether a caliper bolts directly or needs a bracket is governed by the native
post size, which the engine handles through the rotor min/max checks (BRK-6/BRK-7), not the
mount-match check. SRAM's own caliper-mounting chart encodes exactly this: per native PM size
(140/160/180/200/203), a hardware config exists **only at the native size ("Direct") and
above** (spacers/brackets space *up*); **every cell below native is a dash — no configuration
exists.** *Confidence: confirmed structurally.* Source: SRAM "Disc Brake Caliper Mounting
Specifications for Road and MTB" (GEN.0000000005232 Rev V, fetched PDF), via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §8; EXPERT-REVIEW-DOSSIER.md §8.

**BRK-3 — A flat-mount caliper can have its OWN rotor-size ceiling, below what the fork/frame
allows.** An FM caliper is often rated for a smaller max rotor than the chassis would permit,
and has no size-up bracket — so exceeding the caliper's own rated max is a hard "won't fit,"
distinct from the chassis rotor-max (which is a warning, BRK-7). *Confidence: confirmed
(fetched maker specs).* Source: Shimano Specifications handbook (productinfo.shimano.com
Ver.2.4/C-461: XTR BR-M9110 FM = 160 mm max) + Magura MT8 SL FM page (160 mm), via
EXPERT-REVIEW-DOSSIER.md Appendix 8b. Engine: live as `front/rear-brake-rotor-max`, error tier,
dormant until a caliper carries a sourced `maxRotor`. ⚠ Note: the Magura fetch **corrected a
catalog row** (`desc` had wrongly claimed "up to 180") and an XC golden build's baked-in false
fit — a live example of a corpus fact catching a wrong catalog assumption. Hope XCR-FM and SRAM
Level-FM ceilings are still unsourced (dormant).

**BRK-13 — Post Mount (PM) geometry: two threaded posts, 74mm center spacing, caliper bolts
directly on.** PM is "the mountain bike standard" — the caliper attaches straight to two
threaded posts perpendicular to the axle, no adapter needed at native size (consistent with
BRK-2's "Direct" cell). *Confidence: partial — a shop technical guide, not a manufacturer/
standards-body page, but a plain structural/geometric fact.* Source: CrankSmith "Disc Brake
Mount Standards & Compatibility" (fetched 2026-07-17).

**BRK-14 — Flat Mount (FM) geometry: caliper sits flush; rear bolts straight through the
chainstay, front usually needs a plate to toggle 140/160mm.** FM is the newer road/gravel-
derived standard; unlike PM the caliper body sits flat against the frame/fork rather than
standing off two posts. *Confidence: partial (same shop-guide source, structural fact).*
Source: CrankSmith (fetched 2026-07-17).

**BRK-15 — I.S. (International Standard) mount: unthreaded tabs, no direct-bolt caliper
exists, an adapter is mandatory.** IS predates post mount; a caliper physically cannot bolt
to bare IS tabs — every IS-mount chassis needs an IS-to-PM (or IS-to-FM) adapter, and
current-production IS-native calipers are effectively gone from the market. *Confidence:
confirmed — corroborated by two independently fetched sources.* Sources: sheldonbrown.com
"Bicycle Disc Brakes" (*"You MUST use an adapter"*) + CrankSmith, both fetched 2026-07-17.
**This affirms, rather than contradicts, engine behavior already live**: rule 8's IS branch
(`front-brake-mount`/`rear-brake-mount` in `src/compat.js`) already turns a PM-caliper-vs-
IS-chassis mismatch into a warning with a structured adapter `fix` (naming Shimano
SM-MA-F/R160P/S) instead of a hard error — this fact is the first corpus citation backing
that coded behavior, which previously had none. Live on `fr-banshee-paradox-v3` (IS rear)
and other IS-mount catalog frames.

**BRK-16 — IS-to-PM adapters are rotor-size-specific and only ever space UP.** Labeling
follows one of two conventions — "IS to 180mm" (target rotor size direct) or a native→target/
offset format ("180PM to 200PM" / "+20mm") — but both encode the same thing: a "+20mm"
adapter moves a 140mm-native mount up to 160mm, or 160 up to 180. No adapter spaces a mount
*down*, which is the same floor logic BRK-2/BRK-6 already model as a hard error. *Confidence:
community-consensus (two independently fetched shop/enthusiast guides, not manufacturer-
primary, but internally consistent).* Sources: The Lost Co "Mountain Bike Brake Adapters
Explained" + CrankSmith, both fetched 2026-07-17.

**BRK-17 [SUPERSEDED BY BRK-28/29 — see below] ⚠ CONTRADICTION candidate — an
FM-caliper-on-PM-chassis adapter may exist; the reverse (PM caliper on FM chassis)
reportedly does not.** CrankSmith states "FM to PM: Yes, adapters exist but appear bulky"
against "PM to FM: No viable solution — insufficient clearance for the caliper body."
*Confidence: partial/community-consensus — a single shop-blog claim, not
manufacturer-documented, and the "A to B" direction wording is genuinely ambiguous from
the fetched text.* Source: CrankSmith (fetched 2026-07-17). **This round's follow-up
(BRK-28/29) found manufacturer/maker-primary sources for BOTH directions, refuting
CrankSmith's "PM to FM: no viable solution" half of this claim** — kept here, retired-not-
deleted, per the corpus's append-only/supersession convention (INDEX.md rule 1).

**BRK-28 — RESOLVES BRK-17, direction 1: Shimano's own SM-MA adapter line has a
dedicated "Flat mount type" section — a Flat Mount chassis DOES take a Post Mount
caliper, manufacturer-confirmed.** Shimano's SM-MA dealer manual (DM-SMMA00A-01) has
three top-level sections by *chassis* mount type: "Post mount type," "International-
standard mount type," and **"Flat mount type"** (p.14) — the flat-mount-chassis section
lists five adapter part numbers (SM-MA-F140P/D, SM-MA-F160P/D front; SM-MA-R140P/D,
SM-MA-R160P/D, SM-MA-R160D/D rear), each named for a Flat Mount chassis fitted with a
Post Mount caliper (matching third-party retail listings of the same SKUs as "SM-MA
Flatmount to Postmount" / "Post-Mount Caliper to Flat Mount Frame Adapter"). This is a
genuine, currently-cataloged Shimano product — not a niche/expensive boutique part.
*Confidence: confirmed (fetched Shimano dealer manual, cross-checked against retail SKU
listings for the same part numbers).* Source: si.shimano.com DM-SMMA00A-01 "Mount
Adapter" dealer's manual (si.shimano.com/en/pdfs/dm/SMMA00A/DM-SMMA00A-01-ENG.pdf,
fetched 2026-07-17).

**BRK-29 — RESOLVES BRK-17, direction 2: Wolf Tooth's Post-to-Flat-Mount adapter lets a
Post Mount chassis take a Flat Mount caliper, directly refuting CrankSmith's "no viable
solution" claim for this direction.** Wolf Tooth Components (a mainstream aftermarket
component maker, not a random third party) sells a "Post to Flat Mount Brake Adapter,"
described on its own product page as letting "flat mount brakes be added to a frame or
fork that was designed for post mount brakes" — explicitly marketed for running a road
groupset (flat-mount caliper) on a mountain-bike frame (post-mount chassis), the exact
pairing CrankSmith claimed had no viable solution. It is a **+20mm-only** adapter (140
native → 160 rotor, 160 native → 180 rotor, 180 native → 200 rotor — same "adapters only
space up" law as BRK-16), needs a minimum 13 mm clearance between the top of the brake
boss and the frame/fork, and is explicitly NOT compatible with Fox Step Cast forks (a
named clearance exception, not just a generic caveat). *Confidence: confirmed (fetched
maker product page with tech specs — a real physical SKU, not a blog claim); "tested with
SRAM and Shimano brakes" is the maker's own compatibility claim.* Source:
wolftoothcomponents.com/products/post-to-flat-mount-brake-adapter (fetched 2026-07-17).
**⚠ Flag for the coordinator, now upgraded from "unresolved" to "resolved, needs an
engine decision":** `src/compat.js` rule 8's `else` branch (PM-caliper-on-IS-chassis is
the only adapter-warning today, BRK-15) hard-errors every FM↔PM pairing. BRK-28/29 show
real adapters exist in **both** directions — the CONTRADICTION is confirmed, not just
suspected. Whether to add adapter-warning branches for FM-chassis+PM-caliper (BRK-28) and
PM-chassis+FM-caliper (BRK-29) is a product/severity call (do you want the tool to
recommend a specific bulky/clearance-caveated adapter, or keep these as hard errors on
the theory that most riders shouldn't go down this path) — **not resolved here**, per
this corpus's do-not-modify-the-engine discipline. Still live-relevant: 2 FM-mount rear
frame rows exist in the catalog today.

## Rotor interface vs hub

**BRK-4 — Rotor↔hub interface is DIRECTION-AWARE.** A **Center Lock rotor on a 6-bolt hub =
error** (no adapter exists that direction). A **6-bolt rotor on a Center Lock hub = warning**
naming the adapter (Shimano SM-RTAD05-class) — an everyday shop fix, so a hard red there is a
false "won't fit." *Confidence: confirmed (warning tier + direction).* Source:
EXPERT-REVIEW-DOSSIER.md §9. Engine: live as rule 9, the warning carries a structured
`fix:{kind:'adapter', name:'Shimano SM-RTAD05'}`.

**BRK-5 — The CL→6-bolt adapter is ONE-PIECE ROTORS ONLY.** The SM-RTAD05-class adapter
cannot be used with a 6-bolt rotor that is itself installed on an aluminium carrier
(two-piece / floating rotors, e.g. Shimano SM-RT86/RT76, Hope floating). *Confidence: partial
— the restriction is consistently attributed to Shimano's SM-RTAD05 dealer manual but could
NOT be maker-fetched (every Shimano doc host 403'd); treat as corroborated manual text, not a
fetched primary.* Source: SM-RTAD05 manual text quoted across multiple mirrors (*"cannot be
used with the 6-bolt disc brake rotor that is installed with an aluminum adapter
(SM-RT86/RT76)"*), via EXPERT-REVIEW-DOSSIER.md §9 + DOSSIER-OPEN-QUESTIONS-RESEARCH.md §9.
**Bench close-out still open:** a physical SM-RTAD05 box/manual check, and whether Hope
floating / alloy-carrier 6-bolt rotors genuinely won't seat on the adapter.

**BRK-21 — Independent reconfirmation of BRK-4/BRK-5's direction.** Park Tool states the same
one-way rule plainly: a 6-bolt rotor can be adapted onto a Center Lock hub, but *"not possible
to adapt a center lock to 6-bolt."* This is a second, independently-fetched trade-reference
source for the exact direction already coded as rule 9 and cited to Shimano's SM-RTAD05
manual (BRK-4/BRK-5) — corroboration, not a new claim. *Confidence: confirmed.* Source: Park
Tool "Disc Brake Rotor Removal & Installation" (fetched 2026-07-17).

## Caliper alignment & rotor hardware

**BRK-18 — Hydraulic caliper self-centering procedure.** Loosen both caliper mounting bolts
until the caliper body floats freely side-to-side; squeeze the brake lever (hydraulic
pressure pushes the pads onto the rotor and centers the caliper); snug the bolts while still
holding the lever, then release; torque to final spec (Park Tool's own worked example: "about
6–8 Nm"). If rub persists after centering, loosen one bolt and nudge the caliper by hand
toward the rub side until there's an even gap on both sides. *Confidence: confirmed.* Source:
Park Tool "Hydraulic Disc Brake Alignment" (fetched 2026-07-17).

**BRK-19 — Rotor rub has several root causes besides misalignment.** Park Tool's own
troubleshooting list, beyond a mis-centered caliper: a loose/improperly-seated wheel or
through-axle, hub bearing play (rock the wheel to check), a bent rotor (*"a significantly
bent rotor will make alignment difficult or impossible"* — true before attempting BRK-18),
loose rotor mounting bolts/lockring, or dirt/dust making the caliper pistons stick.
*Confidence: confirmed.* Source: Park Tool "Hydraulic Disc Brake Alignment" (fetched
2026-07-17).

**BRK-20 — Rotor mounting hardware + torque (illustrative, not a full spec table).** 6-bolt
rotors use Torx-pattern bolts (commonly T25) tightened in a star/skip-a-bolt pattern, "typical
torque... about 4–6 Nm" per Park Tool's worked example. Center Lock rotors thread onto a
splined driver and are secured by a single lockring torqued much higher (Park Tool's own
example: "40 Nm"), tightened with either an external-notch tool (e.g. Shimano-style, needs a
BBT-9/69.4/169-class tool) or an internal-spline tool (FR-5.2-class) depending on lockring
design — "consult manufacturer specs as they vary." **Never grease or oil rotor bolts or the
lockring**: heat from braking can wick the lubricant outward onto the braking surface and
contaminate it. *Confidence: confirmed (Park Tool's own numbers, explicitly flagged by Park
Tool itself as illustrative, not universal).* Source: Park Tool "Disc Brake Rotor Removal &
Installation" (fetched 2026-07-17). See `## Gaps` — a real per-manufacturer/per-generation
torque table is an L2 target, not covered by this one trade-reference example.

**BRK-22 — Rotor truing tolerance.** A rotor is judged "adequately true" once its wobble
against a fixed reference is smaller than the thickness of a business card (Park Tool's own
field test); for shop dial-indicator work the guide's worked example targets a tighter ~0.2mm
variance. A visibly bent/tacoed rotor should be trued (or replaced) before attempting the
BRK-18 alignment procedure — per BRK-19, a badly bent rotor can make alignment "difficult or
impossible" regardless of caliper position. *Confidence: confirmed.* Source: Park Tool "Disc
Brake Rotor Truing" (fetched 2026-07-17).

## Rotor size

**BRK-6 — Rotor BELOW a fork/frame's native post-mount size = ERROR.** Adapters/brackets only
space calipers **up**; a rotor smaller than the native mount physically cannot be brought into
alignment (BRK-2). E.g. a 180 mm rotor on a 200-native ZEB/Domain mount. Live only where the
fork/frame publishes a sourced minimum. *Confidence: confirmed.* Source: SRAM RockShox model
pages state "Minimum Rotor Size" verbatim (ZEB/Domain = 200), via EXPERT-REVIEW-DOSSIER.md §10;
engine rule 10 (`front-rotor-min`) + rule 10b (frame-side, live on the Cotic Solaris's sourced
`minRotorR`).

**BRK-7 — Rotor ABOVE the frame/fork's published max = WARNING (a deliberate tier choice).**
An over-max rotor *does mount* — exceeding a published max is out-of-spec / warranty-relevant,
not won't-mount — so it is a warning (surfaced as a yellow pick-dot), not an error. This is a
judgment call the review explicitly confirmed: *"overmax should be a warning, below native size
should be an error/incompatible."* *Confidence: high on basis; tier is the mechanic's call, and
was confirmed.* Source: SRAM RockShox model pages ("Minimum Rotor Size: 200mm / Maximum Rotor
Size: 220mm", ZEB Select re-fetched) + SRAM caliper-mounting PDF footnote (*"Consult the fork
or frame manufacturer's specifications before installing…"*), via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §10; EXPERT-REVIEW-DOSSIER.md §10.

**BRK-8 — Fork native post-mount size changed ACROSS GENERATIONS (a real trap).** The same
fork model name can have a different native mount by generation — do not assume:
- **Fox 38 / 36:** pre-2027 gen = 180 mm native post mount (up to 230 with adapter); the MY27
  "36 AM"/38 generation bumped native to **200 mm direct** (up to 230). So `min180` vs `min200`
  is generation-dependent within one model name.
- **RockShox by stanchion:** SRAM pages state "Minimum Rotor Size" verbatim — ZEB/Domain
  (38 mm) = 200 min / 220 max; Lyrik/Pike/SID (35 mm) = 180 / 220; SID SL (32 mm) = 160 / 200.
*Confidence: confirmed (fetched SRAM pages; Fox split from the fork-verification wave).*
Source: fork-verification wave 2026-07-10 (memory: fork-verification-learnings), carried in the
catalog `desc` fields with the fetched sram.com model-page citations.

**BRK-9 — 220 mm rotors are speced for 4-piston calipers.** SRAM's caliper-mounting PDF states
*"The 220 mm diameter rotor is designed for use with a 4-piston caliper."* Not modelled — a
candidate rotor-size-vs-caliper-`pistons` info/warning (data is present on brake rows).
*Confidence: confirmed (fetched).* Source: SRAM caliper mounting PDF (GEN.0000000005232 Rev V),
via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §Bonus.

**BRK-26 — Rotor diameter IS leverage, quantified.** TRP's own technical column frames
rotor-upsizing as lengthening the stopping lever arm: moving from a 203mm to a 223mm rotor
adds "10 mm" of radius — a proportionally larger mechanical advantage — which is why riders
upsize rotors for more power/heat capacity rather than change caliper models. This is the
mechanical "why" behind BRK-7/BRK-9's warning-tier tradeoff already in this chapter (bigger
rotor = more leverage + heat capacity, chosen deliberately despite being out-of-spec).
*Confidence: confirmed (manufacturer-primary — TRP is the caliper/rotor maker, not a
third-party shop).* Source: TRP "Everything You Need to Know about TRP Brake Pads and
Rotors" (trpcycling.com, fetched 2026-07-17).

## Caliper/rotor/hose service internals (L2 — Shimano dealer manual)

**BRK-30 — Shimano's current XTR/XT/SLX hydraulic disc brake torque table, sourced from
the dealer manual, not a trade-reference generic chart.** Rotor lock ring (both internal-
and external-spline types, via TL-LR15 or TL-FC36): **40 N·m**. Caliper mounting screw
(post-mount and IS-mount-with-adapter, both front and rear): **6–8 N·m**. Pad axle:
**0.2–0.4 N·m** on BR-M9100/M9120, **1–1.5 N·m** on BR-M8100/M8120/M7100/M7120 — a
real cross-tier difference, not a typo (the higher-tier caliper uses a lighter axle
torque). Brake-hose flare nut at the lever: **5–7 N·m**. Flat-mount caliper fixing
screws (both the direct-to-frame screw C and the mount-bracket screw B): **6–8 N·m**.
These supersede BRK-20's single trade-reference's illustrative numbers for this specific
family/generation — a fetched dealer manual beats a generic cross-brand table, same
precedent as DRV-27 in `drivetrain.md`. *Confidence: confirmed (fetched Shimano dealer
manual).* Source: si.shimano.com DM-MADBR01-07 "Hydraulic Disc Brake XTR/DEORE XT/SLX
Dealer's Manual" (si.shimano.com/en/pdfs/dm/MADBR01/DM-MADBR01-07-ENG.pdf, fetched
2026-07-17).

**BRK-31 — Rotor and pad have HARD numeric wear-replacement floors, not just a
"replace when worn" advisory, and the two floors are independently checked.** Shimano's
manual states outright: do not use a brake pad at **0.5 mm or less** thickness; do not
use a rotor at **1.5 mm or less** thickness, or once "the aluminum surface becomes
visible" (on rotors with an aluminum carrier) — either condition alone is a stated crash
risk ("may break, and result in serious injury"), independent of the other part's
condition. This is a genuinely different fact from BRK-24's bed-in mechanism or BRK-25's
heat-fade model — it's a hard go/no-go floor, not a performance curve. *Confidence:
confirmed.* Source: DM-MADBR01-07 (as BRK-30).

**BRK-32 — Free stroke and reach are two independently-adjustable lever geometries that
solve different problems, and adjusting one can require re-checking the other.** **Free
stroke** = the lever travel between its rest position and the point the pads first
contact the rotor (adjusted by a dedicated free-stroke screw; not present on every
lever — Shimano's manual states BL-M9100/M7100/BL-T8100 have no free-stroke adjustment
at all). **Reach** = the distance between the lever's rest position and the handlebar
(a separate reach screw/knob). Shimano's manual explicitly notes that free-stroke
adjustment "moves only the initial position of the brake lever" — if the goal is
changing where the pad-engagement *point* sits relative to the handlebar (not just how
far the lever travels before it does anything), a reach adjustment is also required.
Confusing the two ("my lever engages too close to the bar" vs "my lever has too much
dead travel before it bites") sends a mechanic to the wrong screw. *Confidence:
confirmed.* Source: DM-MADBR01-07 (as BRK-30). Closes part of `brakes.md`'s prior Gap
entry on lever ergonomics/adjustment literacy.

**BRK-33 — The bed-in procedure has a specific, quantified repeat count and a
same-caution as BRK-24/BRK-31: too much force too early is the failure mode, not too
little.** Shimano's own bed-in steps: accelerate to moderate speed on a flat, obstacle-
free area, apply **one brake at a time** down to walking speed, repeat **at least 20
times** for front and 20 for rear, done separately (not simultaneously) — braking force
increases progressively through the repetitions. The manual's explicit caution is to be
"careful... especially when you bed in the front brake" (a front lock-up during bed-in
is the named risk, consistent with BRK-elsewhere's front-brake-lockover-the-bars
caution already in this chapter). This gives BRK-24's "rotor surface is left raw to
accept pad-material transfer" mechanism its concrete procedure. *Confidence: confirmed.*
Source: DM-MADBR01-07 (as BRK-30).

**BRK-34 — A flat-mount caliper's frame-side fixing screw length is FRAME-THICKNESS-
DEPENDENT, not a single universal length — a real install-time measurement, not a spec
lookup.** Shimano publishes a length table keyed to measured frame thickness at the
mount (10 mm frame → 23 mm screw / Y8N208000, 15 mm → 28 mm / Y8N208050, 20 mm → 33 mm /
Y8N208010, 25 mm → 38 mm / Y8N208020, 30 mm → 43 mm / Y8N208030, 35 mm → 48 mm /
Y8N208040), and instructs checking the screw's protruding length is exactly **13 mm**
past the frame with a screw-length selector tool before final install — using the wrong
length either fails to engage enough thread or bottoms out before clamping. This is a
frame-specific measurement step with no single "the" answer, distinct from every other
torque/size fact in this chapter which is a fixed spec. *Confidence: confirmed.* Source:
DM-MADBR01-07 (as BRK-30).

**BRK-35 — Shimano's full oil-fill + air-bleed procedure (this round's pickup point from
BRK-30's drain-only coverage) is a syringe-push + funnel-fill + gravity-flow + rapid-tap
sequence with two distinct end-of-procedure torques.** After draining (bleed screw + O-ring
removed, no funnel), the fill/bleed sequence: (1) insert the oil funnel (TL-BR003) into the
lever's bleed-screw hole with **no oil stopper**; (2) at the caliper's bleed nipple, thread on
the TL-BR001 syringe+tube (nipple cap off, 7 mm box wrench holding the nipple body), loosen
the nipple 1/4 turn, and push the syringe plunger to feed oil **up** into the lever funnel
until bubble-free oil emerges from the funnel — never depress the lever while adding oil, or
air gets drawn in and the process must restart; (3) temporarily tighten the nipple; (4) swap to
a bag+tube (no syringe) at the nipple and loosen it again to let oil/air flow **down** by
gravity into the bag, topping up the funnel as its level drops so air never re-enters (tapping
the reservoir/caliper with a non-marring handle, or repositioning the caliper, can help
dislodge stuck bubbles); (5) once no more bubbles exit, temporarily tighten the nipple, then
with the lever depressed, rapidly loosen/tighten the nipple in **~0.5-second pulses, repeated
2-3 cycles**, to dislodge air trapped inside the caliper body itself — a mechanically distinct
step from the gravity flow in (4); (6) final-tighten the bleed nipple to **4-6 N·m**; (7)
operate the lever repeatedly and check stiffness, then tilt the lever **30° up** and **30°
down** from horizontal and re-check stiffness/bubbles at each angle (air pockets can hide at
one lever orientation and not another) — repeat from step 4 if the lever isn't stiff; (8) cap
the funnel with the oil stopper (O-ring side facing down), remove the funnel+stopper as one
unit, install the bleed screw+O-ring and tighten **until oil overflows** (confirms no air
remains in the reservoir tank) to **0.5-1 N·m** — explicitly do **not** operate the lever at
this final step, since doing so risks drawing air back into the cylinder. *Confidence:
confirmed (fetched Shimano dealer manual, full text of pp.40-45).* Source: DM-MADBR01-07 (as
BRK-30), "SHIMANO genuine mineral oil replacement › Adding SHIMANO genuine mineral oil and
bleeding air." Closes the round-1 Gaps entry that stopped at the drain step.

**BRK-36 — Shimano's own "Caliper piston maintenance" procedure (p.50) is piston
CENTERING/re-seating only — it documents no piston removal, no seal replacement, and no
seal part numbers.** The entire documented procedure is: remove pads, push both pistons
straight back with a flat tool (oil funnel attached to the lever throughout, to avoid
diaphragm damage from oil pressure — the same caution as pad replacement), reinstall pads,
then pump the lever and visually confirm the pistons re-extend evenly; if uneven, repeat.
There is no "remove piston / replace piston seal" step anywhere in this dealer manual — a
genuine content gap relative to SRAM's caliper rebuild coverage (BRK-39), not a research
miss: the manual's own table of contents lists only "Caliper piston maintenance" and
"Replacing the diaphragm" as caliper-internals sections, nothing else. *Confidence: confirmed
(fetched full manual text, absence verified against the table of contents).* Source:
DM-MADBR01-07 (as BRK-30), p.50. **This closes (as "not published by Shimano," not
"unresearched") the round-1 Gaps entry asking for Shimano caliper-piston seal-kit service** —
Shimano's dealer manual simply doesn't cover piston/seal replacement the way SRAM's does.

**BRK-37 — Shimano diaphragm replacement requires draining first, has a low reassembly
torque, and uses TWO different diaphragm part numbers depending on lever model.** Procedure
(p.52-54): drain the mineral oil (per BRK-30's drain steps) → loosen (not fully remove) the
lever's cap fixing screw → remove the bleed screw+O-ring → push the cap+diaphragm out through
the now-empty bleed-screw hole with a thin screwdriver or hex wrench → pull them free by hand
→ separate the cap from the old diaphragm → attach the SAME cap to a NEW diaphragm, aligning
molded diagonal alignment marks → insert the new diaphragm (locating its protrusion into the
lever body's groove) → tighten the cap fixing screw to **0.2-0.3 N·m** while pushing the cap
flush against the lever body, explicitly cautioned not to over-tighten → then perform the full
BRK-35 oil-fill-and-bleed procedure (a diaphragm swap always empties/re-airs the system, same
logic as any hose replacement). Part numbers are lever-model-specific, not universal: **BL-M9100
(magnesium lever) = Y8WM9801T**; **BL-M9120 / BL-M8100 / BL-T8100 / BL-M7100 = Y1XK9801T**.
*Confidence: confirmed.* Source: DM-MADBR01-07 (as BRK-30), pp.52-54.

## SRAM caliper/bleed service internals (L2 — SRAM service manuals)

**BRK-38 — SRAM's bleed mechanism is fundamentally different from Shimano's: a closed
double-syringe push/pull loop, not a gravity/funnel fill, and it comes in THREE distinct
caliper bleed-port styles needing different tools.** SRAM identifies "Bleeding Edge" (push-fit
quick-connect port, opened/closed with a 4 or 5 mm hex on the port valve itself), "Threaded
Bleeding Edge" (the syringe threads directly into a T10-Torx bleed screw's hole), and
"Non-Bleeding Edge" (older calipers, syringe threads into a plain bleed port) — each with its
own prep steps in the same manual. The bleed itself never uses gravity flow or a funnel the
way Shimano's mineral-oil system does (BRK-35): a full syringe is mounted at the lever, an
empty/near-empty syringe at the caliper, and fluid is cycled by alternately depressing the
lever-side plunger (pushes fluid + trapped air toward the caliper syringe) and drawing back on
it (pulls fresh fluid from the caliper syringe back through the system), repeated until only a
few small bubbles remain — a closed-loop push/pull, not a one-way top-up. Final bleed-port/
bleed-screw torque across ALL THREE port styles and across DOT and mineral-oil SRAM MTB
manuals alike is **1.6 N·m (14 in-lb)** — notably lower than Shimano's 4-6 N·m bleed-nipple
spec (BRK-35), a genuine cross-brand torque difference worth flagging for anyone reaching for
"the" bleed-nipple torque without checking brand first (not itself an engine `checkBuild`
concern — torque isn't a modeled field — but a real mechanic trap). *Confidence: confirmed
(fetched SRAM docs.sram.com manuals, cross-checked across the DOT MTB and Mineral Oil MTB bleed
manuals, both giving the identical 1.6 N·m figure).* Sources: docs.sram.com "DOT Fluid MTB Disc
Brake Hose Shortening and Bleed Manual" + "Mineral Oil MTB Disc Brake Installation, Hose
Shortening, and Bleed Manual" (both fetched 2026-07-17).

**BRK-39 — SRAM DOES publish a full caliper piston/seal-kit rebuild procedure (the gap
Shimano's manual leaves open per BRK-36), with a piston-seal-vs-o-ring grease rule that is
itself direction-aware.** SRAM's G2 RE (and by the same service-manual family, Code/Guide RE)
service manual documents full piston removal (compressed air puffed into the caliper's fluid
port pops each piston out — pointed at a rubber mat, eye protection mandatory, the largest
piston first, then the smaller), old piston-seal removal (pierce with a pick, discard), new
piston-seal installation (DOT 5.1 fluid — never grease — wetted, seated into the bore groove
with a non-metallic pick), and reassembly: new banjo O-rings, caliper body bolts torqued to
**8.5-10.1 N·m (75-90 in-lb)**, all from a purchasable "Caliper Service Kit" (with an optional
separate "Caliper Piston Kit" if the pistons themselves, not just seals, need replacing).
**Grease is explicitly banned on the piston seals specifically** ("grease will reduce the
clearance gap between the pads and rotors when the brake is released") even though DOT-
compatible grease IS used elsewhere in the same rebuild (banjo threads, compression fittings)
— a within-one-service direction-aware distinction, not a blanket no-grease rule. Separately:
if the system is ever contaminated with the WRONG fluid family (mineral oil in a DOT caliper,
or DOT 5 instead of DOT 5.1/4), the manual's remedy is not "flush and refill" — it requires
replacing **all seals, the bladder, AND the hose**, i.e. cross-family contamination is treated
as parts-destroying, not just a fluid mixup (reinforces BRK-27's "never share bleed kits
between families," with the failure consequence now quantified). *Confidence: confirmed
(fetched SRAM service manual).* Source: sram.com "2023 G2 RE Service Manual"
(GEN.0000000007229 Rev A, fetched 2026-07-17).

**BRK-40 — SRAM has a documented non-bleed fix for spongy/excessive lever throw, meant to be
tried BEFORE assuming a full bleed is needed.** "Brake Pad Advancement": remove the pads,
insert two old/take-off rotors into the caliper's rotor slot as spacers, squeeze the lever
repeatedly to advance both pistons out until they contact the spacer rotors, remove the
rotors, press the pistons back into the caliper with a plastic tire lever (never a metal
tool — the same piston-damage caution as Shimano's flat-tool rule), repeat the advance/retract
cycle once more, then reinstall pads and re-check lever feel; only if there's still no
improvement does the manual point to a full bleed. This is a genuinely different fix from a
bleed (no fluid is added or removed) — it re-seats pistons that have crept unevenly, which
produces the same symptom (spongy/long lever throw) a low-fluid or air-in-system bleed issue
does, so misdiagnosing one as the other wastes a bleed kit on a problem it won't fix.
*Confidence: confirmed.* Source: sram.com "2023 G2 RE Service Manual" (as BRK-39), "Brake Pad
Advancement."

**BRK-41 — SRAM's own fastener torque table for rotor bolts, Center Lock lockring, and caliper
mounting: 6-bolt rotor bolts 6.2 N·m (55 in-lb), tightened one turn at a time in an alternating
(star) pattern with threadlock-prepped bolts; Center Lock rotor lockring 40 N·m using a Ø44 mm
16-notch external BB tool; Post Mount / IS Mount caliper mounting bolts 9.5 N·m (84 in-lb); and a
mount-bolt thread-engagement minimum of 9–13 mm when a caliper is bolted straight to a fork/frame
(with or without a bracket/spacer) — SRAM's manual calls this out as a stated crash-risk warning,
not a routine spec line, because under-engagement lets the caliper detach.** This is a genuine L2
torque-table entry (`CURRICULUM.md`'s L2 bar) alongside the existing Shimano (4–6 N·m bleed
nipple) and SRAM bleed-port (1.6 N·m, BRK-38) and G2 RE body-bolt (8.5–10.1 N·m, BRK-39) torque
facts already on record — rotor/caliper-mount torque was the one fastener family this chapter
hadn't sourced yet. *Confidence: confirmed (fetched primary PDF, exact figures + install sequence
quoted).* Source: sram.com "User Manual — MTB Disc Brakes and Shifters" (fetched PDF,
`document-hierarchy/user-manuals/sram-mtb/brakes-and-shifters/`, mined with `pdftotext -layout`
per the round-3 pickup note).

## Pad compounds & bleed basics

**BRK-23 — Pad compound is a three-way tradeoff (organic/resin vs sintered/metallic vs
semi-metallic).** Per Park Tool's own comparison: organic/resin pads give the strongest
initial bite and the longest *rotor* life, but wear fastest themselves and perform worst in
wet/muddy conditions; sintered/metallic pads last longest (pad-side) in dry conditions and
hold up better wet, but bite less initially, wear the *rotor* faster, and run noisier;
semi-metallic splits the difference on every axis. *Confidence: confirmed.* Source: Park Tool
"Disc Brake Pad Removal & Installation" (fetched 2026-07-17). Park Tool also flags that
"there may be compatibility issues with certain rotor material and pad material
combinations" — check maker warnings on packaging; not itself a sourced spec, so not modelled
further here (see `## Gaps`).

**BRK-24 — Rotor surface finish exists specifically to let bed-in work.** After a rotor blank
is cut, it gets a "centerless circular grind" that both flattens the braking track and leaves
a raw finish that lets pad material transfer onto the rotor during the bed-in process; too
smooth a grind starves the pad of a bite surface, too rough causes uneven material transfer
("kind of like the way wind causes ripples in a sand dune"), which shows up as shudder/
vibration under braking. This is the mechanical reason a fresh rotor+pad pairing needs a
bed-in procedure — already noted as an install-order fact in this chapter's INTERACTIONS
section, but previously without a cited mechanism. *Confidence: confirmed (manufacturer-
primary).* Source: TRP "Everything You Need to Know about TRP Brake Pads and Rotors"
(trpcycling.com, fetched 2026-07-17).

**BRK-25 — Pad heat has three named phases: ramp-up, sweet spot, falloff/fade.** Friction
rises through a ramp-up phase as the pad first contacts the rotor, peaks in a compound-
specific "sweet spot" temperature band (higher friction coefficient, more bite), then past
that point enters falloff: the pad surface glazes/melts and bite drops off — the mechanical
basis of brake fade on long descents. *Confidence: confirmed for the qualitative phase model
(manufacturer-primary); no quantified per-compound temperature thresholds were published on
this page — that stays an L3 gap (see `## Gaps`).* Source: TRP (trpcycling.com, fetched
2026-07-17).

**BRK-27 — Hydraulic brake fluid is NOT interchangeable across systems.** Two families exist:
mineral-oil systems (Shimano, Magura, TRP, Tektro, Clarks, Promax per Park Tool's own bleed-
kit compatibility list) and DOT-fluid systems (SRAM, Formula, Hayes, Hope). Park Tool's own
warning: *"Never use DOT brake fluid in brakes designed for mineral oil, or vice versa,"* and
never share bleed kits between the two families because "mixing fluids can cause damage to
components and lead to brake failure." *Confidence: confirmed.* Source: Park Tool "How to
Bleed Shimano Flat Bar Hydraulic Brakes" (fetched 2026-07-17). **Not a `checkBuild` fit
issue** — fluid type is a service consumable inside one caliper's own sealed system, not a
cross-part compatibility question between purchasable catalog rows — but flagged as a known
schema gap: `brake` parts carry no `fluidType` field today, so the mechanic agent should
answer fluid-type questions from this fact rather than inferring one from `brand`/`mount`.

## Lever ↔ shifter integration

**BRK-10 — I-Spec generations are mutually incompatible; a lever may accept several standards.**
A lever-integrated shifter (I-Spec EV / II / B, MatchMaker — it ships with no bar clamp of its
own) paired with brakes that accept none of its standards needs the band-clamp version or a
ShiftMount-style adapter. Shimano's own chart marks **only same-generation pairings compatible;
every cross-generation cell is "−".** One matching lever is enough (levers accept multiple
standards). *Confidence: confirmed.* Source: Shimano productinfo.shimano.com chart **C-157**
("Compatibility of I-SPEC shifter and brake lever"), via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §19;
EXPERT-REVIEW-DOSSIER.md §19. Engine: rule 19 (`shifter-mount`), warning tier, dormant until
parts are tagged. Note: Shimano documents a partial path — a clamp-band shifter can join I-SPEC
levers *"if the upper body is replaced with an integral unit."*

## BMX braking (off-live)

**BRK-11 [BMX] — U-brake bosses are the standard; brakeless is a valid complete build.** BMX
brakes: **U-brake** (mounts on frame/fork U-brake bosses/posts — the standard), 990/V-brake
(older, different boss spacing), caliper (race/some freestyle), or **brakeless**. A U-brake
needs U-brake bosses; a bossless frame is brakeless-only (or needs a mount adapter). This is
the BMX analog of MTB rule 8 but over a **completely different mount vocab** — do NOT reuse the
disc `brakeMount` (`PM`/`FM` are meaningless here). *Confidence: design-doc mechanical fact.*
Source: data/DJ-BMX-COMPAT-ANALYSIS.md §2a (BMX-6); brakeless confirmed as a valid complete
build (Douglas 2026-07-13, decision 3). Engine: `bmx-front/rear-brake-mount`, off-live module.

**BRK-12 [BMX] — a gyro/detangler is opt-in and has coupled requirements.** A gyro lets the
bars spin 360° without tangling the rear brake cable. It requires (a) a frame/fork with rotor
tabs / gyro provision, (b) a dual-cable ("upper/lower") U-brake, and (c) a gyro-compatible /
dual-cable lever or splitter. The engine must **never require a brake** — modern brakeless
street BMX is common; the gyro is entirely opt-in. *Confidence: design-doc fact; dormant until
a frame explicitly declares `gyroTabs:false` (absence = unknown = silent).* Source:
data/DJ-BMX-COMPAT-ANALYSIS.md §2a (BMX-5). Engine: `bmx-gyro-tabs`/`bmx-gyro-cable`, dormant.

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **The chassis (fork/frame) sets three brake facts at once:** the mount standard (BRK-1),
  the native post size → rotor floor (BRK-6), and the published rotor ceiling (BRK-7). A
  caliper choice is only valid against all three.
- **The rotor sits between two independent constraints:** its *interface* must match the hub
  (BRK-4, direction-aware), and its *size* must sit within [native-min, published-max] of the
  chassis (BRK-6/7) **and** within the caliper's own rated max (BRK-3). A rotor can satisfy the
  hub interface and still be out of size range, or vice versa — check both axes.
- **Generation gates the rotor floor** (BRK-8): the same fork name can move its native mount
  across model years, so the min-rotor constraint is generation-specific, not model-specific.
- **IS-mount chassis constrain differently than PM/FM**: an IS-mount frame/fork has NO native
  direct-bolt caliper at all (BRK-15) — every build against it is adapter-mediated from the
  start, which is why the engine models PM-on-IS as a warning+fix rather than the plain
  mount-match error it uses everywhere else (BRK-1).

### Mismatch failure modes
- **Hard "won't fit":** PM↔FM mount mismatch (BRK-1); CL rotor on a 6-bolt hub (BRK-4); rotor
  below native mount (BRK-6); rotor above a flat-mount caliper's own ceiling (BRK-3).
- **"Works with an adapter" (warning + structured fix):** 6-bolt rotor on a CL hub → SM-RTAD05
  adapter, *one-piece rotors only* (BRK-4/BRK-5); PM caliper on an IS-mount chassis → a
  rotor-size-specific IS-to-PM adapter (BRK-15/BRK-16) — already coded as rule 8's IS branch.
- **"Mounts but out-of-spec" (warning / yellow dot):** rotor above the chassis published max
  (BRK-7) — mounts fine, warranty/structural caution.
- **Silent-and-fine:** rotor at or above native mount and within max, matching interface.
- **Confirmed uncoded adapter path (resolved this round, not yet an engine decision):**
  real adapters exist for BOTH an FM chassis + PM caliper (BRK-28, Shimano SM-MA) and a
  PM chassis + FM caliper (BRK-29, Wolf Tooth) — today the engine's rule 8 `else` branch
  treats every FM↔PM pairing as a plain hard error like any other mount mismatch, with no
  adapter-warning branch the way IS gets one. Live-relevant: 2 FM-mount frame rows exist
  in the catalog today (BRK-17/28/29).

### Install-order dependencies
- **Adapter/bracket selection follows rotor size** (BRK-2): you pick the rotor, *then* the
  spacer/bracket that spaces the caliper up to it — and there is no bracket that spaces *down*,
  which is exactly why BRK-6 is an error not a warning. IS-to-PM adapters follow the identical
  logic with concrete offsets (BRK-16: a "+20mm" adapter takes 140→160 or 160→180, never down).
- **The CL↔6-bolt adapter's rotor-type restriction is checked before ordering** (BRK-5): a
  two-piece/floating 6-bolt rotor won't seat on the RTAD05-class adapter, so the adapter path
  is only valid for one-piece rotors.
- **A bent rotor must be trued before caliper alignment is attempted** (BRK-19/BRK-22): chasing
  rub by re-centering a caliper against a rotor that's still out-of-true beyond "a business
  card's thickness" wastes the mechanic's time — true or replace the rotor first, then align.
- **Rotor bed-in after any rotor OR pad change** — a fresh rotor/pad pairing must be bedded;
  it's install procedure, not a compatibility verdict. BRK-24 now cites the mechanism: the
  rotor's factory surface grind is specifically left raw enough to accept pad-material transfer
  during bed-in, which is what a bed-in procedure is physically doing.
- **Bleed fluid selection precedes any bleed** (BRK-27): mineral-oil and DOT-fluid systems use
  different bleed kits and must never be mixed — a service-procedure fact, not a purchasable-
  parts compatibility question, so it stays out of `checkBuild`.
- **A spongy-lever fix has a cheaper first move than a full bleed** (BRK-40): SRAM's own
  troubleshooting order is piston re-seating (no fluid touched) before assuming air/low fluid
  and reaching for a bleed kit — the same symptom, two different root causes, checked cheapest
  first.
- **Piston-seal contamination with the wrong fluid family is not cleanable** (BRK-39, sharpens
  BRK-27): SRAM's own remedy for mineral-oil-in-a-DOT-caliper (or vice versa) is full seal +
  bladder + hose replacement, not a flush — the fluid-family mixing failure mode BRK-27 already
  named now has its concrete parts-replacement cost attached.
- **Diaphragm replacement is bleed-order-dependent both ways** (BRK-37): drain fully before
  opening the lever cap (can't push the diaphragm out through an oil-filled bleed-screw hole
  cleanly), and always re-bleed (BRK-35) after — mirrors the existing hose-replacement /
  bleed-order note above, now with the diaphragm as a second trigger for a mandatory re-bleed.

### Wear couplings
- **Rotor thickness ↔ pad ↔ caliper:** a worn-thin rotor changes lever throw and pad
  clearance; rotor and pads wear as a pair against the caliper. Not a fit rule, but the reason
  a "works" mismatch (e.g. a slightly-skewed adapter stack) accelerates pad/rotor wear.
- **Bigger rotor = more leverage + heat capacity:** the reason over-max is *chosen* (more
  braking) despite being out-of-spec — the tradeoff behind BRK-7's warning tier. BRK-26
  quantifies the leverage side (a 203→223mm swap is +10mm of lever radius); BRK-25 names the
  heat side (pushing a pad past its "sweet spot" into falloff/fade).
- **Pad compound is its own wear-vs-performance coupling** (BRK-23): organic pads trade pad
  life for rotor life and bite; sintered pads trade the reverse. Neither choice is a
  compatibility fact (any compound bolts into any caliper of the right model) — it's a
  wear/performance tradeoff the mechanic advises on, not a `checkBuild` verdict.

---

## Gaps

Honest list of what a future round should close, per `CURRICULUM.md`'s "target the weakest
chapter" rule — this chapter is graded `professional` as of this round, not yet `master`:

- **CLOSED 2026-07-17 (BRK-35–37): the Shimano bleed procedure gap is fully closed.** The
  round-1 stopping point (drain steps mined, "Adding SHIMANO genuine mineral oil and bleeding
  air" not yet mined) is now sourced in full — exact torques (bleed nipple 4-6 N·m, bleed
  screw 0.5-1 N·m), the funnel/syringe/gravity-flow/rapid-tap step sequence, and the 30°-tilt
  double-check. Diaphragm replacement (p.52-54) is also now sourced, including its two
  lever-model-specific part numbers. **Caliper-piston seal-kit service for Shimano specifically
  is now closed as "not published by Shimano"** (BRK-36) — the dealer manual's own "Caliper
  piston maintenance" section is piston-centering only, no seal replacement documented; this
  is a genuine content gap in Shimano's own docs, not a research miss.
- **CLOSED 2026-07-17 (BRK-38–40): SRAM's own bleed-kit/torque specs and caliper piston/seal-
  kit service are now sourced**, fetched directly from docs.sram.com and sram.com service
  manuals — the three bleed-port mechanisms (Bleeding Edge / Threaded Bleeding Edge /
  Non-Bleeding Edge) and double-syringe push/pull method, the 1.6 N·m bleed-port/bleed-screw
  torque (a real cross-brand contrast against Shimano's 4-6 N·m), the full G2 RE-family
  caliper piston/seal rebuild (8.5-10.1 N·m body-bolt torque, DOT-5.1-not-grease piston seals,
  contamination-requires-full-replacement), and a non-bleed spongy-lever fix. This closes the
  "SRAM-side is unresearched" half of the prior gap entry — SRAM now has genuine L2 depth on
  par with Shimano's.
- **Still open: TRP/Hayes/Magura torque and bleed-procedure coverage.** This chapter's L2
  depth is Shimano + SRAM only — the two dominant manufacturers, but not the whole market.
  TRP's own site 429-rate-limited on a second direct WebFetch (recovered via Exa for the pad/
  rotor article, but a dedicated bleed/torque spec page was never reached); Hayes has no
  fetchable FAQ/spec page found; Magura's owner's-manual PDF fetched but came back
  corrupted/unreadable through the fetch tool. Worth a retry with Bright Data if the shared
  budget allows, per `VERIFY-PROTOCOL.md` doctrine. L2 gap, narrower than before (2/5 major
  hydraulic brake makers now fully covered).
- **No quantified pad-compound heat-fade science** — BRK-25's ramp-up/sweet-spot/falloff model
  is qualitative only; no actual temperature thresholds per compound, no fade-recovery
  behavior, no rotor metallurgy/heat-treatment facts. L3 gap.
- **No wheel-builder-tier / bearing-tolerance-tier depth anywhere in this chapter** (caliper
  bore tolerances, piston-seal material science, rotor heat-treatment metallurgy) — L3 gap,
  same tier as the pad-compound gap above; nothing sourced yet.
- **TRP/Hayes/Magura minimum-native-rotor-size data could not be cleanly sourced this round.**
  TRP's own site 429-rate-limited on a second direct WebFetch (recovered via Exa for the pad/
  rotor article, but a dedicated spec page was never reached); Hayes has no fetchable FAQ/spec
  page found; Magura's owner's-manual PDF fetched but came back corrupted/unreadable through
  the fetch tool. BRK-3's Hope XCR-FM/SRAM Level-FM gap (noted since the seed) is unchanged.
  Worth a retry with Bright Data if the shared budget allows, per `VERIFY-PROTOCOL.md` doctrine.
- **Closed 2026-07-17: BRK-17's FM↔PM adapter direction is now resolved** (BRK-28/29,
  manufacturer/maker-primary sources for both directions) — the remaining item is a
  coordinator/engine decision (add adapter-warning branches to rule 8's `else`?), not a
  research gap. Still live-relevant: 2 FM-mount catalog frames exist today.
- **Partially closed 2026-07-17: lever ergonomics.** BRK-32 sourced the free-stroke-vs-
  reach distinction (two independent adjustments, which lever models lack free-stroke
  entirely) directly from the Shimano dealer manual. **Still open:** bite-point contact
  knobs (SRAM's terminology/mechanism, not covered — this round was Shimano-only) and
  lever-blade material/shape (carbon vs alloy blade flex, tool-free reach vs Allen-key
  reach across brands). L1 gap, narrower than before.
- **No rim-brake-era mechanical detail** beyond the one sheldonbrown.com paragraph fetched for
  BRK-15's context (cantilever/V-brake history) — acceptable for now since TrailBuilder's
  catalog is disc-only, but flagged in case a future non-MTB expansion needs it.

## Open mechanic questions (for the human review — do not act)
- BRK-5: physical confirmation that two-piece / floating 6-bolt rotors (Hope, alloy-carrier)
  won't seat on the SM-RTAD05-class adapter; and confirm warning (not info) is the right tier.
- BRK-7: would you refuse to assemble an over-max build (→ error), or build it with a
  signed-waiver conversation (→ keep warning)?
- BRK-3: sourced max-rotor ceilings for Hope XCR-FM and SRAM Level-FM calipers.
- BRK-2: how often are under-size rotors attempted on 200-native forks (urgency of broader
  `minRotorF` data coverage)?
- BRK-17 [ANSWERED by BRK-28/29 — question now moot, replaced below]: which direction (if
  either) does a real FM↔PM adapter actually serve? **Answer: both directions have real
  adapters** (Shimano SM-MA for FM-chassis+PM-caliper; Wolf Tooth Post-to-Flat-Mount for
  PM-chassis+FM-caliper).
- BRK-28/29 (new): given real adapters exist both directions, should rule 8's `else`
  branch gain TWO new adapter-warning branches (mirroring BRK-15's IS-to-PM warning), or
  should FM↔PM stay a hard error on the theory that these are niche/bulky/clearance-
  caveated parts most riders shouldn't be steered toward? This is a severity/product call,
  not a fit-fact question — the mechanical fact (adapters exist) is now settled either way.
