# Cockpit & Contact Points — Mechanic Corpus

**Maturity: professional** (L1 coverage across the whole chapter + a cross-brand torque
compilation (CKP-20), joined 2026-07-18 (first pass) by genuine dropper SERVICE-manual depth —
RockShox Reverb AXS and Fox Transfer's hydraulic/IFP internals, CKP-21/22. **2026-07-18 (second
pass, CKP-23 through CKP-27)** extended L2 depth to every other named part of this chapter except
rigid seatpost and BMX: CKP-23 closed the dropper-brand gap (OneUp V2, PNW, BikeYoke Revive —
five dropper families now have real service depth, not two); CKP-24 landed ENVE's own
cross-component torque card plus a five-manufacturer roundtable's converging crash-inspection
doctrine for carbon bars; CKP-25 closed the named headset/stem preload-adjustment gap with Park
Tool's canonical article (and explained exactly why CKP-12/13's top-cap torque figures don't
secure the stem); CKP-26 gave grips a real torque spec and flush-mount safety rule (ODI, the
format's originator); CKP-27 refined CKP-15's saddle-rail-shape contradiction with Specialized's
own torque figures (two-tier by clamp type) and a second, narrower failure mode (clamp-jaw
width). **Regraded from `foundation` to `professional`** per CURRICULUM.md's bar ("L1 complete +
meaningful L2 depth... across most of the chapter's parts") — L2 depth now exists for
handlebar/stem, dropper, grips, saddle, and pedals (5 of this chapter's 8 named parts: handlebar,
stem, grips, dropper, rigid seatpost, saddle, pedals, BMX seat system). **Two parts remain
L1-only, which is why this isn't graded `master`:** rigid seatpost (shares the dropper diameter
rule via CKP-5 but has no service-manual depth of its own) and BMX cockpit (deliberately L1,
off-live per CLAUDE.md hard rule 3). See `## Gaps` for exactly what's still missing at each
level.).

Handlebar · stem · grips · dropper · rigid seatpost · saddle · pedals · (BMX seat system).
Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline, conventions).

Fact IDs are stable and append-only (`CKP-n`). Confidence is the source's own grading.

---

## Handlebar ↔ stem clamp

**CKP-1 — Bar/stem clamp is direction-aware: bar bigger than clamp = error; bar smaller =
shim warning.** 31.8 vs 35 mm is the live pair. A **35 mm bar in a 31.8 mm stem is physically
impossible** (error — no shim goes that way). A **31.8 mm bar in a 35 mm stem is a shimmed
build** (warning naming the reducer shim). This mirrors the dropper-shim pattern exactly.
*Confidence: confirmed (shims are real, sold by Wheels Mfg / Problem Solvers / Reverse).*
Source: EXPERT-REVIEW-DOSSIER.md Appendix C3 (made direction-aware) + §15; Problem Solvers
"31.8 to 35.0mm" handlebar clamp shim (fetched) via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §15.
Engine: rule 15 (`bar-stem-clamp`), warning carries `fix:{kind:'shim', name:'<from>-to-<to>mm
handlebar reducer shim'}`.

**CKP-2 — Bar/stem is safety-critical; shim practice there is less universally endorsed than
seatpost shimming.** The reducer shim exists and works, but the clamp is a torque/clamp-pressure
interface (carbon-bar risk) and **no bar or stem MAKER's doc endorsing the shim was fetched** —
the endorsement is from shim vendors, not the bar/stem maker. So the direction-aware warning is
the tier, but it carries more caution than the seatpost case. *Confidence: high (product
exists); open (whether shop practice justifies it on carbon).* Source:
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §15. Open mechanic question: would you ever shim a 31.8 bar
into a 35 stem on an enduro bike (aluminium? carbon?), or is that a hard no at your bench?

**CKP-19 — Historical bar-clamp diameter progression, and why 35 mm reads as a gap in older
references.** Sheldon Brown's handlebar/stem crib sheet lists 25.4 mm (ISO, *"used on the vast
majority of newer bicycles with upright handlebars"*), 26.0 mm (the Italian standard, drop-bar
specific, "sometimes incorrectly called 'road' size"), and 31.8 mm ("Road oversized") as the
current sizes, plus now-obsolete 22.2/23.8/25/26.4-Cinelli/27-Titan clamp diameters — a longer
lineage than the catalog's live 31.8/35 pair suggests. **35 mm does not appear on this page at
all.** That is not a refutation of CKP-1's 31.8/35 pairing — 35 mm is a newer enduro/DH-oriented
oversize standard that postdates this reference's last coverage of the topic — but it means this
particular source cannot corroborate 35 mm and a fresher citation would be needed to fully pin
its adoption date/rationale. *Confidence: confirmed (fetched) for the sizes listed; the "35mm
postdates this source" framing is corpus-side inference, not a stated fact on the page.* Source:
sheldonbrown.com "Bicycle Handlebar and Stem Dimension Crib Sheet" (fetched 2026-07-17).

**CKP-25 — Closing the named "no headset/stem preload-adjustment procedure" gap: Park Tool's
canonical threadless-headset article gives the full preload mechanism, and it directly explains
WHY the stem's top cap bolt (CKP-12/13's torque figures) is NOT what holds the stem on.** The
load path is a chain, not a single fastener: *"The bolt in the top cap will put pressure on the
stem, which presses on washers below the stem, which press on the bearing races, which press
against the bearings."* Park Tool states the critical distinction explicitly: **"the cap and bolt
at the top of the stem do not secure the stem onto the steering column"** — only the stem's side
pinch bolt(s) do that (CKP-12/13's torque figures apply to those side bolts, not the top cap
bolt). The target adjustment is qualitative but unambiguous: **"as loose as possible with no
play"** — too loose and the bearings rattle/deform under front-tire impacts over time; too tight
and the headset "indexes" or feels notchy from race-surface wear, with no single torque number
governing either failure mode (the top cap bolt is tightened by *feel*, stopping "when any
resistance is felt," then adjusted in **1/8-turn increments** while re-checking play after each
turn — a by-feel, iterative procedure structurally similar to WHL-37's Shimano cone-preload
technique, not a torque-wrench spec). A geometry check underlies the whole procedure: the
steerer tube must sit **~3 mm (1/8") below the top of the stem** so the stem can actually clamp
down onto the spacer stack and transmit pressure to the bearings — if the steerer is flush with
or above the stem top, the preload mechanism has nothing to press against and another spacer is
required first. Diagnosis method: apply the front brake, rock the bike fore-aft with a hand
bridging the head tube and fork crown, and feel for a knock (distinct from suspension-fork-leg
play, which can be mistaken for the same symptom). *Confidence: confirmed (fetched, manufacturer
repair-help primary — the canonical article named in this round's brief).* Source: Park Tool "How
to Adjust a Threadless Headset" (parktool.com, fetched 2026-07-18).

## Install torque & threading basics

**CKP-11 — Pedal threading is direction-aware by design (the classic beginner cross-threading
trap), and it has a real torque spec even though it has no fit rule.** The right pedal is a
standard right-hand thread; the **left pedal is deliberately left-hand threaded** — reversed from
what most first-time mechanics expect. Sheldon Brown's explanation: pedal axle threads are
slightly undersized against the crank's internal threads, which lets precession walk a
right-hand-threaded left pedal loose under pedaling load — *"people's left pedals kept
unscrewing"* was the real-world problem the reversed thread solved (possibly, per the same
source, a Wright-brothers-era fix, though that attribution is held loosely). Park Tool's
install/removal guide gives the practical torque: *"typical torque for pedal thread is about 360
inch-pounds"* (~40 Nm). None of this changes CKP-8 (pedals still carry no `checkBuild` rule — the
thread is universal), but it is exactly the kind of install-order fact a fit-checker's users need
and the catalog can't teach on its own. *Confidence: confirmed (both fetched primaries).* Source:
Park Tool "Pedal Installation and Removal" (parktool.com, fetched 2026-07-17); sheldonbrown.com
"Bicycle Pedals — types, installation, Maintenance" (fetched 2026-07-17).

**CKP-12 — Bar/stem faceplate and pinch-bolt torque is a narrow generic band, and carbon bars
need an assembly compound, not just a torque number.** Park Tool's threadless-stem procedure
gives *"a typical torque spec is 4–6Nm"* for both the faceplate bolts and the stem pinch bolts.
For a carbon bar specifically, the same source recommends applying an assembly/friction compound
(their SAC-2) where the bar meets the stem, to raise clamping friction and act as a barrier
between the two materials — torque alone is not the whole carbon-bar install procedure.
*Confidence: confirmed (fetched, manufacturer repair-help primary).* Source: Park Tool
"Stem Removal & Installation: Threadless" (parktool.com, fetched 2026-07-17).

**CKP-13 — There is no single universal carbon-cockpit torque spec — read the parts in hand.**
OneUp's own carbon handlebar/stem system publishes a stricter, product-specific number than Park
Tool's generic band: *"Max Stem Clamp Torque: 6Nm"* and max lever-clamp torque 5 Nm, with an
explicit warning to *"check the torque spec twice before shredding."* Comparing this to CKP-12's
generic 4–6 Nm band shows makers do not converge on one figure — a mechanic (or a future torque-
spec table, L2) needs the number stamped on the actual bar/stem/lever, not a rule of thumb.
*Confidence: confirmed per-source; "no universal spec" is corpus-side inference from comparing
two fetched primaries, not a claim either source makes about the other.* Source: OneUp
Components "Carbon Handlebar & Stem Install Instructions" (can.oneupcomponents.com, fetched
2026-07-17).

**CKP-20 — Park Tool's own cross-manufacturer torque table gives per-brand stem-clamp,
seatpost-clamp, saddle-rail-clamp, and pedal-spindle torque, closing a slice of this chapter's
L2 fastener-torque gap (cross-reference: the same page seeded `FRM-34` for BB/crank/cassette
torque and `BRK-41`-adjacent rotor/caliper torque lives in `brakes.md`).** Threadless-steerer
stem binder bolts: Deda 8 N·m, FSA carbon 8.8 N·m, Syncros cotter-bolt 10.1 N·m, Thomson
5.4 N·m, Time Monolink 5 N·m, Race Face 6.2 N·m. Stem 4-bolt faceplate: Control Tech
13.6–16.3 N·m, Deda magnesium 8 N·m, FSA OS-115 carbon 8.8 N·m, Race Face 6.2 N·m, Thomson
5.4 N·m, Time Monolink 6 N·m — this is the missing cross-brand table CKP-12/13 flagged (Park
Tool's own generic 4–6 N·m band sits below every one of these named-brand figures, and OneUp's
6 N·m carbon spec, CKP-13, lands inside the Deda/FSA range). Seatpost clamp bolts: Campagnolo
4–6.8 N·m, with Park Tool's own note that *"seat posts require only minimal tightening to not
slip downward"* — deliberately looser than a structural clamp. Saddle rail clamp bolts: Shimano
20–30 N·m, Campagnolo 22 N·m, Control Tech two-bolt 16.3 N·m / one-bolt 33.9 N·m, Syncros
5 N·m per bolt, Time Monolink 5 N·m, Truvativ M8 22–24 N·m / M6 6–7.1 N·m — a wide spread by
clamp hardware size, not just brand. Pedal spindle-to-crank: Shimano 35 N·m minimum, Campagnolo
40 N·m, Ritchey 34.7 N·m, Truvativ 31.2–33.9 N·m — this is the second independent source
CKP-11's gap called for, and it corroborates the ballpark (mid-30s N·m) rather than the ~40 N·m
figure CKP-11 cited from a different Park Tool page, itself worth noting as a minor cross-page
inconsistency rather than a contradiction (both are Park Tool, likely reflecting real per-brand
spread rather than an error). *Confidence: confirmed (fetched, manufacturer-sourced
compilation).* Source: parktool.com "Torque Specifications and Concepts" (fetched). Still open:
no dropper-post clamp torque appears on this page (dropper hydraulic/air internals remain a
separate gap, see `## Gaps`).

**CKP-24 — ENVE's own torque card gives a real cross-component carbon-cockpit spec (closing part
of CKP-13's "no universal spec" complaint with ENVE's actual numbers), and a five-manufacturer
roundtable converges on the SAME crash-inspection doctrine independently, which is a stronger
signal than any single maker's advice.** ENVE's Component Torque Specs page (support.enve.com,
fetched primary): **thru-axle fork bolt 8 N·m; fork steerer tube 5.5 N·m; saddle rail clamp bolt
5.5 N·m; clip-on/aero handlebar clamp 5.5 N·m; one-piece handlebar steerer bolt 5.5 N·m** — a
single-source, single-brand table across five different clamp types, useful precisely because it
lets a mechanic sanity-check whether a mixed ENVE cockpit's numbers cluster (they do, mostly at
5.5 N·m) or vary sharply (the fork thru-axle at 8 N·m is the outlier). Separately, Bikerumor's
AASQ roundtable (fetched primary) put the same question to five manufacturers simultaneously
(Race Face/Easton Cycling, RideFarr/Farr, Fasst Co, Ritchey Logic, Hope Technology) —
**"Do I need to replace carbon handlebars every time I crash?"** — and every one answered "not
automatically, but inspect" rather than either "always replace" or "carbon is fine, ignore it" —
independent convergence across five competing brands, not one company's marketing position.
Race Face/Easton: *"stop riding the bar immediately and have a service professional... check for
damage... checking for evidence of delamination, or broken fibers"*; Ritchey Logic (the most
absolute of the five): *"I would advise inspecting bars after every crash, and any evidence of
marring of the carbon should warrant a replacement"*; RideFarr/Farr gives a field-test technique
with no tools: *"check the surface for any cracks... apply pressure on the bar to see if there is
any deformation. You can typically hear a cracking noise upon applying the pressure if the bar has
indeed failed"*; Fasst Co and Hope both frame it as routine-inspection-not-automatic-replacement
("inspect the bar for any gouges, scratches, cracks, or abnormalities... make inspecting any
composite component part of your routine maintenance" / "look for any tell tale signs of
delamination or damage after any crashes"). On overloading a bar with many clamped controls,
Race Face/Easton's answer sharpens CKP-1's clamp-diameter logic: *"round areas where controls and
grips are installed are designed to handle manufacturer specified torque ratings... areas that
are outside this — riser areas... are not designed for clamping"* — i.e. the failure mode from an
overloaded bar isn't the clamp diameter being wrong, it's a control clamped somewhere on the tube
that was never engineered as a clamping surface at all, a distinct hazard CKP-1/2's diameter-only
framing doesn't cover. Farr adds a concrete safety-margin number: their control-clamping zone
"is tested to roughly 30% above the torque requirements of the related items." *Confidence:
confirmed (ENVE's fetched official torque page; the Bikerumor roundtable is a fetched primary
journalistic piece directly quoting five named manufacturer representatives, not a search-summary
synthesis — each brand's words are individually attributed).* Source: support.enve.com "Component
Torque Specs" (fetched); bikerumor.com "AASQ #113: Carbon Handlebar Tech w/ RideFarr, RaceFace,
Ritchey, Fasst & Hope" (fetched), both 2026-07-18.

**CKP-14 — Grip install/removal is a technique, not a fit rule — but carbon bars change the safe
removal method.** Lock-on grips just loosen/tighten a collar bolt (2.5/3/4 mm hex); slip-on grips
are removed with an air gap + rubbing-alcohol lubricant, or as a last resort cut off — **except
on carbon bars**, where Park Tool warns cutting is unsafe because *"scoring the surface will
weaken the handlebar"* (steel/aluminum bars only take cosmetic damage from the same cut).
Installation mirrors removal: alcohol as a lubricant, full evaporation before riding.
*Confidence: confirmed (fetched, manufacturer repair-help primary).* Source: Park Tool
"Handlebar Grip Installation (Flat Bars)" (parktool.com, fetched 2026-07-17).

## Dropper ↔ seat tube

**CKP-3 — Dropper diameter is direction-aware: bigger than the tube = error; smaller = shim
warning.** A post **bigger** than the seat tube is physically impossible (error). A post
**smaller** than the tube = warning naming the exact reducing shim ("31.6-to-30.9 mm, sold
separately") — shop-approved everyday practice, endorsed in the dropper maker's own sizing
guide. *Confidence: confirmed (direction) — from the maker the rule cites.* Source: PNW "How to
Choose a Dropper Post" (fetched: *"if you purchase a dropper post that is too big in diameter,
it's physically impossible for it to fit… If… too small in diameter, you can use a shim"*), via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §13; EXPERT-REVIEW-DOSSIER.md §13. Engine: rule 13
(`dropper-diameter`, `dropper-shim`).

**CKP-4 — Long-drop droppers add an insertion-depth INFO (threshold set to 180 mm).** Posts
with ≥180 mm drop add an info pointing at the maker's insertion calculator — insertion depth is
the most common real dropper misfit the app *cannot* check (it has no frame-size concept yet).
The threshold was moved 200 → **180 mm** on review. *Confidence: confirmed (direction);
threshold is a UX judgment dial.* Source: EXPERT-REVIEW-DOSSIER.md §13 (*"I would make the
threshold 180mm"*); PNW max-insertion measurement method (fetched) via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §13. Engine: `dropper-insertion`, info, boundary pinned
(180 fires, 175 silent). Open mechanic question: at what drop length do you *start* checking
insertion before selling — 170 / 185 / 200?

**CKP-5 [DJ] — the rigid `seatpost` slot gets the SAME direction-aware diameter check.** DJ/
single-speed bikes run a rigid post (droppers stay their own category). Rule 13c applies the
same too-big-errors / smaller-shim-warning check to the rigid `seatpost` slot. *Confidence:
confirmed (rule twin).* Source: data/DJ-BMX-COMPAT-ANALYSIS.md §1b/§6; CLAUDE.md. Engine: rule
13c (`seatpost`), live since DJ go-live 2026-07-14.

**CKP-6 — Insertion vs curved/interrupted seat tubes is a known un-checked gap.** Seatpost
insertion into frames with bends or interrupted seat tubes (linkage frames) is not modelled —
it needs a frame-size / insertion-depth concept. Backlogged nice-to-have. *Confidence:
confirmed gap.* Source: EXPERT-REVIEW-DOSSIER.md "Known gaps".

**CKP-16 — The two diameters that matter today are 30.9 and 31.6 mm.** Park Tool's own
dropper-compatibility guide: *"the most common dropper post diameters are 30.9 mm and 31.6
mm"*, with adapter shims sold to step a smaller post up to a larger tube (the same direction as
CKP-3's shim warning). This grounds CKP-3/5's direction-aware rule in the two real-world values
the catalog's `diameter` field is almost always one of. *Confidence: confirmed (fetched,
manufacturer repair-help primary).* Source: Park Tool "Determining Dropper Post Size and
Compatibility" (parktool.com, fetched 2026-07-17).

**CKP-17 — Measuring frame max-insertion at face value overstates what actually fits; makers
build in a safety margin.** OneUp's own dropper-length calculator instructs riders to measure
max insertion depth (insert a rigid post/tape measure until it hits an obstruction), then
*"reduce measurement by 10-15mm to ensure fitment"* — because inserting a post to the literal
maximum can create tight/sharp cable routing that blocks the dropper's actuation, not just a
clearance problem. This sharpens CKP-4/6's "un-checkable insertion depth" gap: even a mechanic
measuring by hand needs to subtract a margin, not just compare raw numbers — a data point for
any future frame-insertion-depth field/rule. *Confidence: confirmed (fetched, manufacturer
primary); the 10-15mm figure is OneUp's own practice and may not generalize numerically to
every dropper brand.* Source: OneUp Components "Dropper Post Length Calculator"
(oneupcomponents.com, fetched 2026-07-17).

**CKP-18 — Carbon and metal seat tubes/posts are not interchangeable maintenance-wise, beyond
the diameter check the engine already runs.** Sheldon Brown's seatpost-size database: *"using a
carbon-fiber seatpost in a metal frame, or vice versa, invites problems"* — metal posts need
grease in the seat tube, carbon posts should NOT be greased (grease lets a carbon post slip and
invites over-clamping to compensate), and a metal seatpost clamp can crush/damage a carbon post
if torqued the way a metal post tolerates. This is a maintenance/technique fact, not a new
diameter rule — CKP-3/5's direction-aware diameter check is unaffected — but it is a real fit-
adjacent hazard the engine's plain `diameter` number can't see (no material field on seatpost/
dropper rows today). *Confidence: confirmed (fetched, though sheldonbrown.com is a personal
reference site rather than a manufacturer/standards body — treated here as a reputable
community-consensus-tier source, one level below a maker page).* Source: sheldonbrown.com
"Seatpost Size Database" (fetched 2026-07-17).

## Dropper internals (L2 — RockShox Reverb AXS + Fox Transfer service manuals)

**CKP-21 — RockShox Reverb AXS's hydraulic damping circuit uses an IFP the same way a
fork/shock damper does (cross-reference SUS-26/33/38), and its IFP height is a clean
linear function of travel — travel + 5 mm, every size.** Reverb AXS IFP height (H)
by travel/post length: 100 mm travel (340 mm post) → 105 mm; 125 mm (390 mm) → 130 mm;
150 mm (440 mm) → 155 mm; 170 mm (480 mm) → 175 mm — each exactly **travel + 5 mm**, a
cleaner per-size relationship than any fork/shock IFP table this corpus has mined (those
are stepped bands, not a formula — SUS-33). Fill method is **Maxima Racing Oils Serene
Hydraulic Seatpost Fluid, poured until it overflows level with the top of the upper
post** — a level-fill, not a metered-cc figure, the same convention SUS-34 documented for
RockShox's rear-shock damper body (a cross-brand-line, cross-product RockShox pattern:
IFP-side fills are metered/precise, level-fills apply where "full to the brim" is the
spec). Service is a genuine **three-tier structure** — 50-hour (vent-valve/seal
lubrication), 200-hour (top cap + seal-head bushing replacement), 600-hour (full inner
shaft + sealhead + IFP rebuild) — richer than any fork/shock interval table this chapter
or `suspension.md` has sourced (those top out at two tiers, SUS-24). **The Reverb AXS
XPLR variant is mechanically different, not just a length option**: it runs an **air**
spring (charged via a shock pump, "Air Assembly Installation") rather than the standard
Reverb AXS's pure-hydraulic actuation — a dropper-family split worth flagging if the
catalog ever needs a dropper `spring`/`actuation` field, the same shape as SUS-17's
air-vs-coil rear-shock split. *Confidence: confirmed (fetched primary, both service
manuals).* Source: sram.com "2020-2022 Reverb AXS Service Manual"
(sram.com/globalassets/document-hierarchy/service-manuals/rockshox/seatposts/
2020-2022-reverb-axs-service-manual-english.pdf, fetched) + "2022+ Reverb AXS XPLR
Service Manual" (same path, xplr variant, fetched).

**CKP-22 — Fox Transfer's hydraulic circuit differs from RockShox Reverb AXS in three
concrete ways: nitrogen (not oil-fill-only) IFP pressurization, a damper-oil weight that
changed between generations, and a genuinely different documented service-interval
CADENCE from Fox's own fork/shock line.** IFP chamber charge: **325 psi nitrogen**
(2021-2024, filled slowly over ~30 seconds — "charging too quickly can damage the
Sealhead assembly," a caution with no RockShox Reverb equivalent in the fetched text).
Damper oil is generation-specific, not universal: **FOX 1.5wt Synthetic Oil** (2021-2024
Transfer) vs. **FOX 2.5wt Suspension Fluid** (2025-2027 Transfer) — a genuine viscosity
change across generations, the dropper-post analog of SUS-39's fork-generation oil-weight
differences. IFP-chamber top-off after main fill: 1-1.5 cc FOX FLOAT Fluid (matches
SUS-40's fork air-chamber metered-shot convention). Selected torques: bleed/fill screws
0.3-1.0 N·m (2-9 in-lb), anti-tamper top-cap screw 1.2 N·m (11 in-lb, 2021-2024), base
lug (2025-2027) **30 in-lb (3.4 N·m) tightened COUNTER-CLOCKWISE** — a reverse-thread
torque direction worth flagging explicitly, the dropper-post cousin of CKP-11's reversed
left-pedal thread. **Service cadence is 125-hour intermediate / 300-hour full rebuild**
— the 125 h figure matches Fox's own current-gen fork/shock "Full Service 125 Hours"
figure (SUS-41) almost too neatly to be coincidence: Fox appears to standardize on a
125-hour intermediate-service cadence across its fork, shock, AND dropper lines, a
cross-product convention RockShox does not share (Reverb AXS's CKP-21 three-tier
50/200/600h structure has no 125h step at all). Fox publishes TWO parallel procedures
for the same rebuild — "Fox Tool Set" (vacuum-fill machine) and "Common Shop Tools"
(gravity-fill + manual cycling, no vacuum) — a documentation choice RockShox's Reverb
manual does not mirror (one procedure only). *Confidence: confirmed (fetched primary,
multiple service-procedure pages, cross-checked figures consistent across the
2021-2024 and 2025-2027 generations where both exist).* Source: tech.ridefox.com
"2025-2027 Transfer 300 Hour Full Rebuild (Fox Tool Set)" (service-procedures/3022),
"2025-2027 Transfer 300 Hour Full Rebuild (Common Shop Tools)" (service-procedures/2924),
"2025-2027 Transfer 125 Hour Intermediate Service" (service-procedures/2991),
"2021-2024 Transfer Seatpost Rebuild" (service-procedures/2859), all fetched 2026-07-18.

**CKP-23 — Closing the CKP-21/22 gap note by name: OneUp's V2, PNW's internally-routed line, and
BikeYoke's Revive all publish full service depth, and comparing all three against RockShox/Fox
(CKP-21/22) shows the dropper-internals split isn't hydraulic-vs-air, it's cartridge-vs-hydraulic
architecture — a third distinct family, not a variation on the first two.** OneUp's V2 rebuild
guide (can.oneupcomponents.com, fetched primary): the entire drop mechanism is a **sealed,
swappable air cartridge** (part 14) rather than an in-post hydraulic circuit — the whole
20-minute rebuild is disassemble-to-the-cartridge, swap seals/bushings/guide pins around it, and
reinstall, with **no IFP or oil fill step at all** inside the post itself (the cartridge is
serviced as a sealed sub-assembly, corroborated by a third-party teardown source calling it the
"non-serviceable" cartridge). Air pressure is checked, not set from empty, at the end: **"the
pressure should be 250-300 psi when the post is fully extended"** — a pressure band, not a single
number, and the seat-clamp rear bolt torques to **8 N·m (70 in-lb)**, closing a dropper-specific
torque number this chapter's CKP-20 compilation didn't have. Service cadence is two-tier like
RockShox's (CKP-21) but at different hour counts: **50-100 h clean-and-grease, 250-350 h full
rebuild** — neither matches Reverb AXS's 50/200/600h nor Transfer's 125/300h, a third distinct
cadence. PNW's own maintenance guide (pnwcomponents.com, fetched primary) states its droppers
are "designed to be serviceable at home with minimal mechanical experience **and no proprietary
tools needed**" (the same tool-free design philosophy WHL-40 found in Industry Nine's hub
service), names the **dust wiper drying out** as the specific failure mechanism that necessitates
service (not a generic "gets dirty" framing), gives a **6-8 month / 50-hour service interval**
matching OneUp's low-end figure almost exactly, and explicitly warns against certain lubricants:
*"try to stay away from Park Tool PPL Grease or any generic thick bearing/assembly grease"* in
favor of PNW's own Gold Grease, Slickoleum, SRAM Butter, or Buzzy's Slick Honey — a real
cross-brand lubricant-compatibility caution this chapter didn't have before. BikeYoke's Revive
manual (bikeyoke.com, fetched primary PDF) is the outlier architecture: Revive is marketed as
**"bleedless bleeding"** via a dedicated bleed port/button rather than a full teardown for routine
air-in-the-system symptoms, and its remote-lever install torques are stated in the same manual —
**1.5 N·m max on the remote clamp pinch bolt**, with I-Spec adapter hardware torqued separately
(1 N·m barrel-nut pin, 4 N·m mounting screws) — a dropper-remote torque family this chapter also
lacked. *Confidence: confirmed (all three fetched primary manufacturer pages/PDFs).* Source:
can.oneupcomponents.com "Dropper Post V2 Service - Rebuild" (fetched); pnwcomponents.com "How to
Maintain Your Dropper Post" (fetched); bikeyoke.com "Manual Revive Max/Revive" (Manual_Revive_
final.pdf, fetched), all 2026-07-18.

## Grips, saddle

**CKP-7 — Grips and saddle carry only the common fields — no fit rules.** They are fit-trivial:
grips fit any standard bar end; a saddle mounts any standard rail clamp. Modelled as
display/data only (except the BMX pivotal case, CKP-9). *Confidence: confirmed (no rule).*
Source: CLAUDE.md data model; EXPERT-REVIEW-DOSSIER.md (no rule area).

**CKP-26 — "Grips are fit-trivial" (CKP-7) is true for the bar-end interface but not for install
technique: lock-on grips have a real torque spec and a real flush-mount safety rule, sourced from
ODI, the maker credited with inventing the format.** ODI's own v2.1 install instructions
(odigrips.com, fetched primary): the lock-jaw clamp bolt (a 3 mm hex) torques to **40-45 in-lb
(4.5-5.0 N·m)**, with an explicit caution that this figure "may vary based on bar material and
variations in bar diameter" — the same per-part-not-per-standard caution CKP-13 already applies
to bar/stem clamps. The flush-mount rule is a stated safety requirement, not a preference:
*"Be sure that the grips slide all the way onto the bar so that the inside end of the grip is
touching the end of the handlebar... Failure to install the grips flush to the end of the
handlebar can lead to grip failure and/or injury"* — i.e. a grip riding short of the bar end is a
genuine failure mode, not just untidy. Single- vs dual-clamp is a real design axis with a
stated trade-off, corroborated by a retailer buyer's guide (community/retail tier, not
manufacturer-primary): dual-clamp (both ends locked) was the original lock-on format when ODI
introduced it, but "a majority of brands now only use one lock on clamp on the inside of the
grip" because the outer clamp "can cause discomfort and pain in your hand" over a long ride at
the heel of the palm — security is traded for comfort, not a free upgrade either direction.
*Confidence: confirmed (ODI's fetched primary install page for the torque spec and flush-mount
rule); community/retail tier (Worldwide Cyclery buyer's guide) for the single-vs-dual-clamp
historical framing and trade-off, not independently corroborated by a second manufacturer this
round.* Source: odigrips.com "v2.1 Lock-On Grip Installation Instructions" (fetched);
worldwidecyclery.com "MTB Lock On Grips Buyer's Guide" (fetched), both 2026-07-18.

**CKP-15 ⚠ CONTRADICTION (refines CKP-7) — Saddle rail SHAPE is not universally interchangeable;
"any standard rail clamp" only holds for round rails.** Park Tool's saddle install guide: round
metal rails are the default, *"7 mm in diameter"* and *"42 mm apart center to center"* — the
shape CKP-7's "fit-trivial" claim implicitly assumes. But *"saddle rails made of carbon fiber
may be oval in shape, not round"* (commonly 7×9 or 7×10 mm), and Park Tool states plainly that
*"not every low-profile saddle will be compatible with every seatpost"* — an oval/carbon-rail
saddle needs a post clamp built for that shape. This contradicts CKP-7's blanket "a saddle
mounts any standard rail clamp" for the oval/carbon case specifically: **catalog collision** —
neither `saddle` nor the post/dropper carries a rail-shape or clamp-type field (see CLAUDE.md
data model, "saddle: just the common fields"), so today's catalog has no way to flag this
mismatch even in principle, and no engine ruleId exists to flag either (there's simply no rule
here to contradict the *tier* of — this is a coverage gap the corpus surfaces, not a wrong
verdict the engine is currently giving). Routed to the coordinator per INDEX.md rule 4: is this
common enough in the live catalog's saddle rows to warrant a `railShape` field + rule, or stays
a documented gap? *Confidence: confirmed (fetched, manufacturer repair-help primary) for the
dimensions and the compatibility caution; the catalog-coverage implication is corpus-side
analysis.* Source: Park Tool "How to Remove and Install a Bike Saddle" (parktool.com, fetched
2026-07-17).

**CKP-27 — Refining CKP-15 with the manufacturer's own numbers: Specialized's carbon-rail saddle
guide independently confirms the round-vs-oval rail/clamp mismatch AND gives the actual torque
figures AND a second, narrower mismatch CKP-15 didn't have — clamp-jaw WIDTH, not just rail
shape.** Specialized's official instruction guide (media.specialized.com, fetched primary PDF):
*"DO NOT use a seatpost with a side-load clamp mechanism for 7mm round rails. Specialized
recommends seatposts with vertical-load clamps or Specialized seatposts with 7x9mm side-load
clamps"* — the same round-vs-oval clamp-type mismatch CKP-15 sourced from Park Tool, now
independently confirmed by a saddle *maker* rather than a tool maker, with the added detail that
*"a seatpost with rail grooves that are of a larger or smaller diameter than the 7mm diameter
specified"* is also explicitly prohibited — i.e. even a correctly-round clamp can be the wrong
size. **Torque is genuinely two-tier by clamp type, not one number:** vertical-load clamp
**80 in-lbf (9.0 N·m)**; side-load clamp **120 in-lbf (13.5 N·m)** — a 50% higher spec for the
side-load design, and Specialized states the same "lowest published number wins" cross-check
principle this corpus already uses elsewhere (WHL-10/39/42): *"If the seatpost's torque
recommendation exceeds the saddle's recommendation, always use the lower torque recommendation."*
**A second, distinct failure mode CKP-15 didn't cover:** clamp-jaw axial reach — *"DO NOT allow
the clamp mechanism to clamp the rails beyond the straight section of the rails, where the rails
start to curve upward"* and *"DO NOT use a clamp mechanism with a split upper clamp that measures
beyond the recommended range of 38-40mm"* — a saddle with the *correct* rail shape and diameter
can still fail if the clamp's jaw is wider than the rail's straight section, gripping the curved
part instead (a stress-riser/leverage failure, not a shape-mismatch one). Specialized frames the
stakes bluntly: *"failure to follow any Warning may result in a catastrophic failure of the
saddle,"* and separately warns that carbon-rail damage from a crash is "difficult to visually
identify" — surface dents/gouges/scratches are disqualifying even without a visible crack,
converging with CKP-24's carbon-bar inspection doctrine (the same "you can't always see composite
damage" caution, now confirmed on a second component category by a second manufacturer).
*Confidence: confirmed (fetched, manufacturer-primary instruction guide — the PDF required a
direct-download fallback after two fetch tools returned empty/blocked results, but the retrieved
document is Specialized's own multi-language official guide, unambiguously primary-tier once
readable).* Source: Specialized "Carbon Rail Saddle Instruction Guide" (media.specialized.com,
fetched PDF), 2026-07-18. **Still open (per CKP-15's original question):** whether oval/carbon-
rail saddles are common enough in the live catalog to justify a `railShape`/`clampWidth` schema
field remains a coordinator decision — this round sharpens the mechanical facts, not the
catalog-coverage count.

## Pedals

**CKP-8 — Pedals have NO compatibility rules — 9/16"-20 TPI fits every adult crank.** The
9/16"-20 TPI thread is universal on adult cranks; pedals are pairs (flat/clip). Confirmed as a
deliberate non-rule. *Confidence: confirmed (trivial inference — no maker publishes "our pedals
fit cranks" pages because it's universal).* Source: EXPERT-REVIEW-DOSSIER.md "Deliberate
NON-rules" #4; DOSSIER-OPEN-QUESTIONS-RESEARCH.md N4. (Weight basis: per pair — DATA-ENTRY §5.)

## BMX seat system (off-live)

**CKP-9 [BMX] — pivotal vs railed seat/post is a hard ERROR (a connector-shape mismatch).** BMX
seat systems must match: pivotal-with-pivotal, railed-with-railed. A **pivotal seat bolts
through a single centre hole from underneath (no clamp)**; a **railed seat has two rails gripped
by a toothed two-plate clamp on the post** — there is no partial-fit, no reducing shim, no
direction where one seats onto the other's mount. This is the one BMX seating question that is
genuinely binary (unlike the "runs poorly" spectrum elsewhere). *Confidence: high (uniform shop/
mechanic-guide agreement; mechanically obvious).* Source: The BMX Dude "BMX Seat Post Types"
(*"You need to match the seat and post system… Seat posts aren't cross-compatible with different
BMX seat types"*); Waller BMX; BMXmuseum threads — via tools/BMX-RULE-SEVERITY-RESEARCH.md Q7 +
data/DJ-BMX-COMPAT-ANALYSIS.md §2b. Engine: `bmx-seat-system` ERROR, off-live module. The
[MECHANIC REVIEW] flag on this is **cleared** — every source agrees.

**CKP-10 [BMX] — bar/grip/seat dimensions and freecoaster-vs-cassette are DISPLAY-only.** Bar
rise/width/backsweep, grip choice, tire tread, and the freecoaster-vs-cassette hub choice are
rider preference, not fit conflicts. Freecoaster vs cassette is *"not about which hub is
better… which hub matches the way the bike actually gets ridden"* — INFO at most, never a
conflict. Hardening it would mislead users into reading one option as a worse "fit." *Confidence:
high (every source frames it as preference).* Source: tools/BMX-RULE-SEVERITY-RESEARCH.md Q5/Q10;
data/DJ-BMX-COMPAT-ANALYSIS.md §2b. Engine: `bmx-freecoaster` INFO (never a conflict);
`bmxGearInfo()` display-only, never feeds `checkBmxBuild`.

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **Clamp diameter is a two-part interface, direction-aware:** the *larger* part can never
  accept the smaller-clamp side (bar-in-stem, CKP-1) — the shim only ever fills the gap when the
  part is *smaller* than the bore. The same asymmetry governs dropper-in-seat-tube (CKP-3) and
  BMX pivotal-vs-railed (CKP-9, except there is no shim at all — it's a shape mismatch).
- **The seat tube constrains the post two ways:** *diameter* (a fit rule, CKP-3/5) and
  *insertion depth* (an un-modelled gap because it needs frame geometry, CKP-4/6). A post can
  pass the diameter check and still not insert far enough on a small frame.
- **Contact points mostly DON'T constrain anything** (CKP-7/8/10): grips, saddle, pedals, and
  BMX cosmetic dimensions are deliberately rule-free — the value is knowing *not* to invent a
  rule there, which would false-red universal fits.
- **Saddle rail SHAPE constrains the post clamp** (CKP-15) the same way bar/dropper diameter
  does — but the catalog has no field to check it, so it's a known-unmodelled interface, not a
  dormant rule like CKP-4/6's insertion depth.
- **Pedal thread handedness constrains install direction, not fit** (CKP-11): both pedals fit
  either crank arm's 9/16"-20 bore (CKP-8's universal thread holds), but the LEFT pedal must be
  driven counter-clockwise or it cross-threads — a procedural constraint, not a compatibility one.
- **Saddle rail clamping is constrained by THREE independent things, not one** (CKP-15/27):
  diameter (7mm round vs 7x9mm oval — a shape mismatch), and now also clamp-jaw axial reach (a
  correctly-shaped, correctly-sized rail can still fail if the clamp's jaw is wider than the
  rail's straight section and grips the curved part instead). A saddle can pass two of the three
  checks and still fail the third.
- **The headset's bearing preload is constrained by GEOMETRY before it's constrained by torque**
  (CKP-25): the steerer must sit ~3mm below the stem top or the top-cap-bolt load path has
  nothing to press against — a precondition the stem-clamp torque figures (CKP-12/13/20) assume
  is already satisfied and don't themselves check.

### Mismatch failure modes
- **Hard "won't fit":** bar bigger than stem clamp (CKP-1); dropper/post bigger than seat tube
  (CKP-3/5); BMX pivotal seat on a railed post or vice versa (CKP-9).
- **"Works with a shim" (warning + structured fix):** bar smaller than stem clamp (CKP-1, with
  extra carbon-bar caution CKP-2); post smaller than seat tube (CKP-3/5).
- **"Fits the diameter but maybe not the depth" (info, un-checkable today):** long-drop dropper
  on an unknown frame size (CKP-4); post into a curved/interrupted seat tube (CKP-6); measuring
  max insertion at face value without OneUp's 10-15mm safety margin (CKP-17).
- **Silent-and-fine / preference (must NOT be flagged):** exact-diameter post; any grip/saddle/
  pedal; BMX freecoaster-vs-cassette and gear ratio (CKP-8/10).
- **Shape mismatch invisible to today's schema:** oval/carbon saddle rails on a round-rail-only
  post clamp (CKP-15) — same failure family as CKP-9's BMX pivotal/railed mismatch, but
  un-flagged because neither the saddle nor post/dropper category carries a rail-shape field.

### Install-order dependencies
- **Shim goes in before the part is clamped** (CKP-1/3): the reducer sleeve seats in the
  bore/tube first, then the bar/post is clamped to torque against it.
- **Torque-to-spec is the safety gate on the clamp** (CKP-2): carbon bars especially require the
  manufacturer torque — which is why the bar/stem shim carries more caution than the seatpost
  shim even though both are "smaller-in-bigger."
- **Insertion depth is set at install against the frame** (CKP-4/6): the post is inserted to at
  least its minimum-insertion line *and* no deeper than the frame allows — a two-sided install
  constraint the tool can only nudge (info), not verify.
- **Torque spec is per-product, not per-standard** (CKP-12/13): a 31.8mm clamp doesn't imply one
  torque number — the generic 4-6 Nm band (Park Tool) and a specific maker's stricter 6 Nm/5 Nm
  (OneUp) both apply to the *same nominal clamp diameter*, so install order is "read the part's
  own spec," not "look up the standard."
- **Pedal handedness is checked at the FIRST turn of the wrench, not after** (CKP-11): threading
  the left pedal clockwise (the "natural" direction) starts cross-threading immediately — there
  is no shim or fix-tier for a cross-threaded crank arm, only a repair (a `TAP-6`-style
  re-tap or a helicoil), so this is a pure install-order/technique fact, never a `checkBuild`
  candidate.
- **Carbon bars need lubricant/compound choice matched to the removal or install method**
  (CKP-2/14): cutting is banned outright on carbon (scores and weakens the bar); alcohol-as-
  lubricant is the safe technique for both slip-on grip removal and installation.
- **A dropper's IFP must be set/pressurized in the correct order relative to the main oil
  fill, the same discipline `suspension.md` documents for forks/shocks** (CKP-21/22): both
  Reverb AXS and Transfer bleed/fill the main chamber first, THEN set IFP height/charge —
  getting this backwards produces a post with the wrong effective spring/damping behavior
  before a single stroke is cycled, invisible from outside once reassembled (the dropper-post
  instance of SUS-33/38's install-order point).
- **Reverse-thread torque isn't unique to pedals** (CKP-11/22): Fox Transfer's 2025-2027 base
  lug tightens COUNTER-CLOCKWISE — a mechanic defaulting to "righty-tighty" on an unfamiliar
  dropper risks the same cross-threading failure mode CKP-11 already flags for the left pedal.
- **The headset's top-cap bolt is tightened by FEEL first, THEN the stem's side pinch bolts lock
  the result in place — reversing this order defeats the adjustment** (CKP-25): torquing the
  side pinch bolts before the top cap bolt has found "as loose as possible with no play" locks in
  whatever (wrong) preload existed at that moment, the cockpit-chapter analog of WHL-37's
  Shimano-cone-before-lock-nut sequence and SUS-21/22/23's "sag before damping" rule.
- **A dropper's service architecture determines what "rebuild" even means, and picking the wrong
  brand's procedure wastes the whole step** (CKP-21/22/23): RockShox/Fox both open an IFP-based
  hydraulic circuit that needs oil-fill-then-IFP-charge sequencing, while OneUp's V2 swaps a
  sealed, non-openable air cartridge as one unit and BikeYoke's Revive resets air-in-the-system
  symptoms via a dedicated bleed button rather than a teardown at all — a mechanic reaching for
  IFP tools on a OneUp post, or a full teardown on a Revive, is solving the wrong problem for
  that specific architecture.

### Wear / setup couplings
- **A shimmed clamp concentrates stress** at the shim seam — a durability reason the bar/stem
  case (CKP-2) is more cautious than seatpost shimming.
- **Dropper actuation is unaffected by the shim** but insertion depth affects the post's stroke
  clearance — a too-shallow insert can bottom the post internals; the CKP-4 info exists because
  this is the most common real dropper misfit.
- **Carbon vs metal seatpost/dropper needs opposite lubrication practice** (CKP-18): metal wants
  grease in the seat tube, carbon explicitly does not (grease lets it slip, inviting over-torque
  to compensate, which then risks crushing the carbon tube wall) — a wear/maintenance coupling
  the diameter-only fit check can't see.
- **Dropper service cadence is NOT a single cross-brand number** (CKP-21/22): RockShox Reverb
  AXS runs a three-tier 50/200/600-hour structure while Fox Transfer runs a two-tier
  125/300-hour structure that happens to share Fox's own fork/shock 125h figure (SUS-41) — a
  mechanic reading one brand's interval sticker onto the other brand's post would be wrong in
  both directions (too frequent for Reverb's 200h step, too infrequent for Transfer's 125h).
  OneUp adds a fourth cadence (50-100h clean/250-350h rebuild) and PNW a fifth framing entirely
  (event-driven — "it will tell you when it needs to be loved" — with a 6-8 month/50h floor
  rather than a hard ceiling), so a cross-brand dropper fleet genuinely has no shared service
  calendar (CKP-23).
- **A crash-damage inspection habit generalizes across every carbon contact point, and five
  independent makers converging on the same doctrine is the strongest signal this chapter has**
  (CKP-24/27): carbon bars (five brands: Race Face, RideFarr, Fasst Co, Ritchey, Hope) and carbon
  saddle rails (Specialized) both warn that composite damage is "difficult to visually identify"
  and both recommend inspection-not-automatic-replacement after impact — a mechanic who applies
  the same post-crash composite check to a bar, a saddle, AND (per CKP-2/14's existing facts) a
  dropper/seatpost is applying one coherent habit across the whole cockpit, not three unrelated
  rules of thumb.

---

## Gaps

Specific, honest gaps for a future round — the 2026-07-18 second pass closed several of the
gaps below (CKP-23 through CKP-27); what remains is now concentrated in rigid seatpost and BMX
depth, plus a handful of narrower cross-check items:

- **PARTIALLY CLOSED this round (CKP-20) — stem-clamp (threadless binder + 4-bolt faceplate),
  seatpost-clamp, saddle-rail-clamp, and pedal-spindle torque now sourced across 6-7 brands
  each from Park Tool's cross-manufacturer compilation** (the same page that seeded `FRM-34` in
  `frame-standards-bearings.md` and is cross-referenced from `BRK-41` in `brakes.md`). Still
  missing: rotor-bolt/caliper-mount torque (now covered in `brakes.md` BRK-41 instead — cross-
  chapter, not this chapter's gap anymore), cassette-lockring/BB (covered in
  `frame-standards-bearings.md` FRM-34 / `drivetrain.md`); dropper-post clamp torque is now
  CLOSED (CKP-23's OneUp 8 N·m seat-clamp figure and BikeYoke's 1.5 N·m remote-lever figure),
  and grip-clamp torque is now CLOSED too (CKP-26's ODI 4.5-5.0 N·m figure) — the only fastener
  family from this bullet's original scope still without a number is the rigid `seatpost` slot's
  own clamp (distinct from the dropper's, see the rigid-seatpost bullet below).
- **CLOSED 2026-07-18 (CKP-21/22) — dropper-post internal service/bleed procedure now
  sourced for both majors.** RockShox Reverb AXS (IFP height = travel + 5mm exactly, level-fill
  hydraulic circuit, 3-tier 50/200/600h interval, the XPLR variant's air-spring split) and Fox
  Transfer (325 psi nitrogen IFP charge, generation-specific damper-oil weight 1.5wt→2.5wt,
  125/300h interval matching Fox's own fork/shock cadence, a reverse-thread base-lug torque).
  **CLOSED 2026-07-18, second pass (CKP-23) — OneUp, PNW, and BikeYoke dropper internals are now
  sourced.** OneUp V2's sealed-cartridge architecture (a third distinct family alongside RockShox's
  hydraulic-IFP and Fox's nitrogen-IFP designs), PNW's tool-free service philosophy and named
  dust-wiper failure mechanism, and BikeYoke Revive's bleedless-bleed-button architecture (a
  fourth, mechanically distinct approach) are all fetched-primary now — five dropper families
  total have real service depth. **Still open:** neither OneUp's, PNW's, nor BikeYoke's numbers
  were cross-checked against a second independent source (the same "first fetch came through
  clean, no ambiguity to flag, but no second-source corroboration pass yet" caveat this bullet
  already carried for RockShox/Fox); and PNW's air-cartridge internal structure (as opposed to
  its external service steps and pressure spec) wasn't found on the fetched maintenance page —
  PNW may be closer to OneUp's sealed-cartridge design or may differ, unconfirmed either way.
- **CLOSED 2026-07-18, second pass (CKP-25) — headset/stem preload-adjustment procedure now
  sourced.** Park Tool's canonical threadless-headset article gives the full load-path mechanism
  (top cap bolt → stem → spacers → bearing races → bearings), the by-feel 1/8-turn iterative
  adjustment procedure, the ~3mm steerer-below-stem-top geometry precondition, and the explicit
  fact that the top cap bolt does NOT secure the stem (only the side pinch bolts do — clarifying
  which bolt CKP-12/13's torque figures actually apply to). **Still open:** headset bearing
  press-fit tolerances (bore/cup interference specs, as opposed to the adjustment *procedure*,
  now sourced) remain unsourced — the same press-fit-vs-procedure gap `wheels-tires.md` WHL-40
  flagged for hub bearings; a future round could look for a shared cross-chapter source (headset
  cups and hub bearings are both pressed cartridge/cup fits, possibly sharing a press-fit theory
  reference even though the parts differ).
- **PARTIALLY CLOSED 2026-07-18, second pass (CKP-27) — the CKP-15 contradiction now carries real
  torque numbers and a second failure mode (clamp-jaw width) from a saddle manufacturer
  (Specialized), not just a tool maker (Park Tool).** Still open, exactly as before: whether the
  live catalog's saddle rows carry enough oval/carbon-rail models to justify a `railShape` /
  `clampWidth` schema field is a coordinator decision this round did not attempt to answer —
  CKP-27 sharpened the mechanical facts and torque figures, not the catalog-impact count.
- **No cross-brand bar-clamp-diameter-by-year adoption timeline (L3-adjacent gap).** CKP-19
  found that 35mm postdates Sheldon Brown's crib sheet but did not source WHEN 35mm was
  introduced or by which maker first (a genealogy fact, not a fit fact — lower priority).
- **CLOSED this round — pedal torque now cross-checked.** CKP-20's Park Tool "Torque
  Specifications" page gives Shimano 35 N·m minimum / Campagnolo 40 N·m / Ritchey 34.7 N·m /
  Truvativ 31.2–33.9 N·m, corroborating CKP-11's ballpark from a second Park Tool page rather
  than a second manufacturer — still one source-site, so genuinely independent (Shimano's own
  dealer-manual) cross-verification remains a lower-priority follow-up.
- **BMX cockpit (grips/bar/seat dimensions, CKP-10) got no new L1 pass this round** — this
  training targeted the live-catalog side of the chapter; a BMX-specific cockpit deepening stays
  queued behind the BMX go-live grind.
- **NEW gap named explicitly 2026-07-18 (second pass) — rigid `seatpost` has no service-manual
  depth of its own, the reason this chapter is graded `professional` and not `master`.** CKP-3/5
  give the rigid seatpost slot the same direction-aware diameter check as a dropper (rule 13c),
  and CKP-16/18 cover sizing/material maintenance facts, but no rigid-post-specific install
  torque, insertion-depth safety margin, or maker service doctrine was sourced this round — every
  torque/service fact this round landed (CKP-23-27) was dropper, bar/stem, grip, or saddle
  specific. A future round should look for a rigid-post maker's own install guide (Thomson,
  Ritchey, or a DJ-focused brand given rule 13c's DJ/single-speed use case) the way CKP-20 found
  Park Tool's cross-brand torque table for other fasteners.

## Open mechanic questions (for the human review — do not act)
- CKP-2: would you shim a 31.8 bar into a 35 stem on an enduro bike (alu? carbon?), or is it a
  hard no? (Hard no → symmetric error; routine → keep the direction-aware warning.)
- CKP-4: at what drop length do you start checking insertion before selling (170 / 185 / 200)?
- CKP-13: given two makers publish different torque numbers for a nominally-same clamp diameter
  (Park Tool's generic 4-6 Nm vs OneUp's carbon-specific 6/5 Nm), should the mechanic agent ever
  surface a torque number at all, or is "always read the part's own spec" the only safe answer?
- CKP-15: is oval/carbon-rail-vs-round-rail-clamp common enough in the live catalog to be worth
  a schema field, or rare enough to leave as a documented gap?
