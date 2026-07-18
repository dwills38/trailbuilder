# Drivetrain — Mechanic Corpus

**Maturity: foundation, approaching professional** (L1 complete + a growing slice of L2
service-manual depth: the 2026-07-17 first pass landed Shimano XT/XTR derailleur
dealer-manual internals + SRAM Transmission install-torque facts (DRV-27–32); a same-day
second pass closed the Shimano MTB crank/BB dealer-manual gap (DRV-35–36, recovered via
Wayback Machine after three direct-fetch routes failed) and added SRAM mechanical Eagle
derailleur install torque + a confirmed-absence finding on clutch/spring rebuild
documentation (DRV-37–39). Still short of `professional`: no AXS pairing/firmware service,
no freehub internals, no cross-brand torque table beyond the Shimano derailleur/crank and
SRAM derailleur families covered so far — see `## Gaps`.)

Shifter · derailleur · cassette · chain · crank · chainring · freehub/driver bodies ·
single-speed cog. Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline,
the append-only / ⚠ CONTRADICTION conventions).

Fact IDs are stable and append-only (`DRV-n`). Confidence is the source's own grading.

---

## Systems & families

**DRV-1 — Three mutually-incompatible 12-speed MTB systems.** SRAM Eagle (mechanical +
AXS), SRAM Eagle Transmission (T-Type), and Shimano 12-speed are mutually incompatible as
*systems* across shifter/derailleur/cassette/chain. *Confidence: confirmed.*
Source: EXPERT-REVIEW-DOSSIER.md §3a; SRAM 2021 MTB Components Compatibility Map (fetched
PDF, sram.com globalassets) via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §3c/§6.

**DRV-2 — Actuation is a separate axis from system.** A cable trigger cannot drive an AXS
(wireless) derailleur and vice versa, *even within the same Eagle family* — Eagle cassettes
and chains are genuinely shared between mechanical and AXS, so the split is on `actuation`
(cable vs electronic), not on `system`. *Confidence: confirmed.*
Source: EXPERT-REVIEW-DOSSIER.md §3b.

**DRV-3 — AXS controllers are cross-compatible; this is the one exemption to "one system."**
SRAM documents that *all* AXS controllers drive *all* AXS derailleurs — the new Eagle
Transmission Pod controllers work with Eagle AXS drivetrains, and the Eagle AXS controller
works with Transmission. So an *electronic* SRAM controller must NOT be red-flagged against
another SRAM AXS mech by the one-system check. The mechanical mech / cassette / chain still
obey one-system, and the exemption does **not** cross to non-SRAM systems.
*Confidence: confirmed (SRAM support text, browser-read).*
Source: SRAM support.sram.com articles 13820865674011 + 13820000105371, via
EXPERT-REVIEW-DOSSIER.md §3 (this fixed a real false-red — Pod + Eagle-AXS-mech).

**DRV-4 — T-Type chain ↔ chainring is ONE-DIRECTIONAL.** A Transmission (Flattop / T-Type)
chain on a *non-T-Type* chainring is a genuine incompatibility (SRAM documents a unique link
shape / pin / roller size). The reverse — a T-Type ring run with an Eagle chain — is
**fine**: SRAM publishes T-Type rings as backward-compatible with Eagle chains. Cranks sold
without a ring (armset-only, e.g. eeWings, Race Face armsets) carry no ring standard and get
an info, not an error. *Confidence: confirmed both directions.*
Source: SRAM support.sram.com art. 13820865674011 (*"Eagle Transmission T-Type chainrings
are compatible with Eagle chains… Non-T-Type Eagle Drivetrain chainrings are incompatible
with Eagle Transmission T-Type chains"*); sram.com model pages CR-TTYP-DM-D1 + FC-GX-D1
(both list "Chain Technology: Eagle, T-Type"); Wolf Tooth tooth-profile page (*"Valley
between teeth is deeper to accommodate larger rollers on Flattop chain"*).
Via EXPERT-REVIEW-DOSSIER.md §3c + DOSSIER-OPEN-QUESTIONS-RESEARCH.md §3c.

**DRV-5 — Dual-compatible aftermarket rings exist (a catalog-vocab trap, not a rule bug).**
Wolf Tooth's Drop-Stop B profile is published compatible with *both* 12-speed SRAM Eagle
and 12-speed SRAM Transmission (T-Type) Flattop chains. A future catalog row for such a ring
tagged `ringStd:'standard-12'` would false-red against a Flattop chain — it needs the
`'t-type'` tag (accurate for chain-fit) or a widened vocab. *Confidence: confirmed (product
exists).* Source: Wolf Tooth chain-compatibility page, via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §3c.

## Cassette ↔ derailleur capacity

**DRV-6 — Capacity is checked ONE-SIDED, on purpose.** A cassette whose largest cog exceeds
the derailleur's rated max cog = incompatible (e.g. a 10-52 cassette on a 50T-max mech). The
reverse — a 52T-capable derailleur run with a 10-50 cassette — is **documented fine** and must
stay silent: SRAM states its 520%/big-cage mechs are backward compatible. An auditor once
proposed erroring this reverse case; it was refuted and the refutation is pinned so it is not
"fixed" back in. *Confidence: confirmed.*
Source: SRAM RD-GX-1-B2 (*"Backwards compatible, works with both 10-50t and new 10-52t
cassettes"*) + RD-GX-1E-A1 model pages, via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §5;
EXPERT-REVIEW-DOSSIER.md §5.

**DRV-7 — SRAM also publishes a *minimum* cassette size per derailleur (not modelled).**
The GX AXS mech page lists "Max tooth: 52" **and** "RD Minimum (Cassette): 50" — a floor the
engine does not model (`derailleur.maxCog` only). Pairing a 52T-rated mech with a small
(e.g. 11-42) cassette is out of SRAM's published envelope; the engine stays silent. Candidate
future dormant `minCog`-on-derailleur check, data-gated like rule 18. *Confidence: confirmed
(spec line); real-world severity open.* Source: sram.com RD-GX-1E-A1, via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §5 + §Bonus.

**DRV-8 — b-gap / b-screw is *setup*, not compatibility.** SRAM manuals treat b-gap
adjustment (chain-gap tool) as required install per cassette, not a fit failure. Nothing
fetched suggests a compatibility failure when set correctly — so it does not earn a verdict
tier. Open mechanic question: is the 10-50→10-52 b-gap reset ever *missed* in ways that
damage parts (→ warning), or is it routine install? *Confidence: confirmed (it's procedure);
tier open.* Source: DOSSIER-OPEN-QUESTIONS-RESEARCH.md §5.

## Freehub / driver bodies

**DRV-9 — Freehub standard must match the cassette; bodies are swappable in reality.** A
cassette's freehub type (HG / XD / MicroSpline) must match the rear wheel's driver. The
engine treats the freehub as fixed per wheel row and models each offered config as a separate
row — factually honest, because on major platforms the freehub body is a **swappable part**
(DT Swiss Ratchet: *"The no-tool concept makes it easy to convert the freehub body to any
drive train standard"* — conversion kits per standard). Caveat for any "just swap it" message:
some hubs need an upgrade kit first (e.g. pawl-hub / DT 370 exceptions). *Confidence: confirmed
swappability; message wording is a product call.*
Source: DT Swiss Ratchet technology page (fetched) + SRAM 2021 compatibility map, via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §6; EXPERT-REVIEW-DOSSIER.md §6.

**DRV-10 — XD cassette on an XDR driver = spacer, not a mismatch (the one carve-out).** XDR
is 1.85 mm longer than XD; SRAM's own driver-body explainer documents that **every XD
cassette fits an XDR driver with a 1.85 mm spacer** behind the cassette. This is an
adapter-tier warning (structured `fix`), not a hard error. The reverse (an XDR-only cassette
on a plain XD driver) and every other freehub mismatch stay hard errors. T-Type cassettes
carry an XD-labelled freehub spec on SRAM's model pages and are commonly run on XDR-driver
wheels via the same spacer (the mullet/mixed case). *Confidence: confirmed (SRAM's own
number).* Source: SRAM XD/XDR driver-body explainer + support FAQ 13819655363099, via
EXPERT-REVIEW-DOSSIER.md §6c (Appendix). Engine: this IS live as rule 6c.

**DRV-11 [DJ] — single-speed rear cog rides a standard freehub via a spacer kit.** A DJ/
single-speed cog mounts either (a) on a splined cassette driver with a single-speed conversion
spacer kit — *any* XD/HG/MicroSpline freehub works, you are just spacing one cog — or (b) a
dedicated thread-on single-speed hub, or (c) a BMX-style driver (rare on DJ). So for DJ the
freehub interface is a **permissive/soft** check, not the MTB cassette-freehub hard error; the
common case is "standard freehub + SS spacer kit." *Confidence: design-doc mechanical fact.*
Source: data/DJ-BMX-COMPAT-ANALYSIS.md §1c (DJ-2). Engine: wheels may carry
`freehub:'single-speed'` (cassette slot exempt; a picked cassette errors) — live-dormant.

## Single-speed & chain width

**DRV-12 [DJ/BMX] — chainring, rear cog, and chain must share a width class.** Single-speed
runs either a **1/8"** chain (track/BMX-derived, tougher) or a **3/32"** chain
(derailleur-width, used with narrow-wide rings on converted MTB drivetrains). Ring, cog, and
chain should all match. A width mismatch **runs but poorly / with side-play / faster wear** —
it does not fail outright. *Confidence: medium (real firsthand community reports; no maker
publishes chain/sprocket width-tolerance bulletins).* Engine tier: **WARNING** (`ss-chain-width`
MTB / `bmx-chain-pitch` BMX). Source: data/DJ-BMX-COMPAT-ANALYSIS.md §1c (DJ-1);
tools/BMX-RULE-SEVERITY-RESEARCH.md Q6.

**DRV-13 [DJ/BMX] — the width mismatch is DIRECTION-DEPENDENT (candidate refinement).**
Community reports split by direction: a **1/8" (wider) chain on 3/32" (narrower) sprockets**
is widely tolerated — riders ran it for months with no drops, the only downside "side play /
not ideal." A **3/32" (narrower) chain on 1/8" sprockets** is the direction people actually
report chain-retention trouble. This mirrors how the MTB engine already treats rotor/freehub
mismatches direction-aware (rules 9 / 6c). A candidate future refinement, **not** a severity
change — consensus does NOT support hardening to an error either way. *Confidence: medium
(forum consensus; internally inconsistent sources → the failure mode is component-dependent,
not a clean binary).* Source: Bike Forums + MTBR threads via tools/BMX-RULE-SEVERITY-RESEARCH.md
Q6 (community tier, explicitly labelled).

**DRV-14 [BMX] — the chain removed from the speed-count set is a modelling fix.** SRAM Flattop
/ T-Type chains are defined by **width**, not a discrete speed count the way a cassette or
derailleur is. Counting the chain in the "must all be the same speed count" set forced real
SRAM Transmission builds (e.g. a 7-speed DH Transmission group) out as a false "won't fit." The
chain participates in the drivetrain *system* check but not the speed-count comparison.
*Confidence: confirmed (modelling-category error, not a judgment call).* Source:
EXPERT-REVIEW-DOSSIER.md Appendix M1. Engine: fixed `45f7331`.

## Chainline (deliberate NON-rule)

**DRV-15 — SuperBoost frame + Boost-chainline crank is NOT an error.** Chainline is a real,
published axis (SRAM crank pages list e.g. "Chainline: 55.0mm"; 52 mm variants exist across
the DUB line), but **no fetched manufacturer document prohibits running a Boost-chainline
crank in a SuperBoost frame** — and such builds are commonly ridden (e.g. Pivot Firebird with
Boost cranks). A naive "SuperBoost frame needs a SuperBoost crank" rule would false-red real,
sold builds. The `chainline` field is display-only bait; the non-rule is pinned by a test.
*Confidence: confirmed-keep-silent.* Open mechanic question: on SuperBoost builds with 52 mm
cranks, do you observe chainrub in the lowest cogs / accelerated wear, or nothing? Source:
EXPERT-REVIEW-DOSSIER.md "Deliberate NON-rules" #1 + DOSSIER-OPEN-QUESTIONS-RESEARCH.md N1.

## Derailleur adjustment basics (setup, not compatibility)

**DRV-16 — Derailleur H/L limit screws are safety stops, not compatibility.** The high
(H) and low (L) limit screws stop the derailleur's inward/outward travel so the chain
cannot be shifted off the smallest cog into the frame (H) or off the largest cog into
the spokes (L) — a crash-prevention adjustment, not a fit/compatibility check, and set
independent of cassette range. *Confidence: confirmed.* Source: Park Tool "Rear
Derailleur Adjustment" (parktool.com/en-us/blog/repair-help/rear-derailleur-adjustment,
fetched) — *"The main purpose for the limit screw is to prevent the chain from going
into the spokes or into the frame"*; corroborated by Shimano
si.shimano.com/en/dm/RARD010/adjust_rear_derailleur (fetched).

**DRV-17 — B-tension screw sets guide-pulley-to-cog gap; extends DRV-8.** The B-screw
(body-angle screw) adjusts the gap between the derailleur's upper guide pulley and the
cassette, checked in the smallest-chainring/largest-cog combination; Park Tool states
most road/MTB derailleurs want a **5–6 mm gap** here, measured with a hex wrench. Too
tight = noisy/slow shifting into the largest cog; too loose = sloppy shifting. Same
"setup, not compatibility" territory as DRV-8's b-gap reset. *Confidence: confirmed.*
Source: Park Tool "Rear Derailleur Adjustment" (fetched) — *"road and mountain bike
derailleurs require a gap between 5 and 6 millimeters."*

**DRV-18 — Community claim: published derailleur capacity/max-cog specs run
conservative (informs DRV-7's open question, community tier only).** A recurring
practitioner claim (Harris Cyclery/Sheldon Brown's derailleur page, plus a detailed
bicycles.stackexchange answer) is that manufacturer-rated capacity and max-cog figures
are deliberately conservative for liability reasons, and that maxing out the B-tension
screw lets some derailleurs run noticeably larger cassettes than spec (one example
claims a short-cage mech rated to 27T running a 36T cog). **This can only ever soften
or inform the corpus's open question on DRV-7's minimum-cog floor and cannot justify
loosening an engine error on its own** (INDEX.md rule 2 / the bar). *Confidence:
community-consensus, explicitly labelled — no manufacturer document confirms exceeding
its own published max-cog rating.* Source: sheldonbrown.com/harris/derailers-rear.html
(fetched) — *"the rated chain-wrap capacity is very conservative"*;
bicycles.stackexchange.com/questions/7264 (fetched, community answer).

**DRV-19 — Total derailleur capacity formula (industry-standard math, extends
DRV-6/7).** Capacity in teeth = (largest chainring − smallest chainring) + (largest
cassette cog − smallest cassette cog); a derailleur's rated capacity must be ≥ this sum
for the gearing to run without excess/insufficient chain slack. This is the general
form behind the engine's one-sided `cassette.maxCog` vs `derailleur.maxCog` check
(DRV-6) and SRAM's separate minimum-cog floor (DRV-7) — the engine models only the
*cog* side, not the *combined chainring+cog* capacity sum (today's catalog is
single-chainring/1x, so chainring difference is 0 and the cases collapse to the
already-checked cog-only comparison). *Confidence: confirmed (identical formula
independently published by two sources).* Source: Wolf Tooth Components "Derailleur
Link Tech Page" (wolftoothcomponents.com/pages/roadlink-tech-page, fetched);
sheldonbrown.com/derailleur.html (fetched, matching worked example).

## Wear & maintenance basics

**DRV-20 — Chain-wear replacement threshold tightens as speed count rises.** Park
Tool's general guidance (its CC-4.2 chain checker, rated for 5-to-13-speed chains, is
explicitly listed as compatible with SRAM T-Type/Flattop and Shimano XTR 12-speed
chains): replace a single-speed chain at ~1.0% elongation, a 5-to-10-speed chain at
~0.75%, and an 11-speed-or-more chain (which covers every chain the live catalog's
`shimano-12`/`sram-eagle`/`sram-transmission` systems use) at ~0.5% — tighter tolerance
because narrower modern chains have less material to spare before they start damaging
cogs. Riding a chain past this point accelerates cassette and chainring wear (ties to
the wear-coupling note already in INTERACTIONS). *Confidence: confirmed (tool-maker
guidance, explicitly caveats "every drivetrain manufacturer has their own
specifications").* Source: Park Tool "When to Replace a Worn Chain"
(parktool.com/en-us/blog/repair-help/when-to-replace-a-chain-on-a-bicycle, fetched) +
CC-4.2 product page (fetched).

**DRV-40 — Zero Friction Cycling's measured chain-wear-cycle data quantifies WHY MTB chains
wear faster than road chains, giving DRV-20's 0.5% threshold a real km-lifespan range instead
of just a percentage.** ZFC's own methodology (per its published test-brief page): a KMC
digital chain-wear checker measuring to 0.01 mm accuracy across an 8-link span (six such
measures per 53-link test section), run across a claimed 300,000+ km of controlled chain-wear
testing. The measured result: an MTB chain typically reaches the 0.5% replacement threshold at
**~800–1,200 km**, versus **~3,000–5,000 km** for a dry-condition road chain — roughly a
3-4x lifespan gap driven by grit contamination and wet/mud conditions accelerating pin-bore
wear, not a difference in the chains themselves. Separately, the elongation-to-distance
mapping: 0.5% wear ≈ 1.5 mm growth over a 12-inch/24-link span, 0.75% ≈ 2.3 mm, 1.0% ≈ 3.1 mm
— the physical basis for graduated checkers like the Park Tool CC-3.2/CC-4 DRV-20 already
cites. **Tier note (corpus rule 5):** ZFC's own test-brief/data PDFs are image-based and did
not extract via WebFetch (tried twice — `Chain-Longevity-Testing-Full-test-brief.pdf` and
`chainlongevitypg2.pdf`, both scanned/JPEG-embedded, no OCR text layer); the numbers above are
attributed to ZFC by name but fetched from a secondary source (componentry.app's chain-wear
guide) that cites ZFC's testing, not the ZFC page itself — **measured-source tier, one hop
removed from primary**, not the same confidence as a directly-fetched manufacturer page. A
future round should retry ZFC's PDFs with an OCR-capable tool, or find ZFC's own text-based
results table (their site mentions "Chain efficiency and wear life data consol v4" as a
separate PDF, not yet attempted). *Confidence: measured/third-party, one hop from primary.*
Source: componentry.app "How to Measure Chain Stretch" (fetched), citing Zero Friction Cycling
(zerofrictioncycling.com.au) test data by name.

## Cassette, freehub & crank service basics

**DRV-21 — Cassette install: splines fit one way only; lockring torques to ~40 Nm;
chain whip is removal-only.** A freehub body's splines carry one abnormally wide gap
that only the cassette's correspondingly wide spline seats into, so a cassette stack
physically cannot be installed in the wrong rotational orientation. The lockring that
retains the stack is torqued to roughly **40 Nm** (Park Tool: *"about a 50 pound...
pull holding the wrench 8 inches from the lockring tool"*). A chain whip is required to
hold the cogs stationary while the lockring is *removed* (its rotation direction is
opposite the pawls' drive direction) but is **not needed on install** — the freehub's
own ratcheting pawls resist the tightening direction. *Confidence: confirmed.* Source:
Park Tool "Cassette Removal and Installation"
(parktool.com/en-us/blog/repair-help/cassette-removal-and-installation, fetched).

**DRV-22 — Threaded freewheels (cogs + ratchet as one threaded unit) are a distinct,
still-current system, not just a legacy one.** Besides the cassette/freehub system this
corpus otherwise assumes (DRV-9/DRV-10), some bikes — Park Tool specifically calls out
"older bikes, lower-end bikes, and many e-bikes" — use a threaded **freewheel**: the
sprockets and ratcheting mechanism thread on as one piece directly onto plain hub
threads, and unlike a cassette, worn cogs are not individually serviceable (replace the
whole freewheel). Field test: remove the wheel and spin the cogs backward — if the
tool-fitting/splines spin with the cogs it's a freewheel; if the fitting stays still
while the cogs spin, it's a cassette. *Confidence: confirmed.* Source: Park Tool
"Determining Cassette / Freewheel Type"
(parktool.com/en-us/blog/repair-help/determining-cassette-freewheel-type, fetched);
sheldonbrown.com/free-k7.html (fetched, same identification test).

**DRV-23 — Older 3-piece crank spindle interfaces (square taper, Octalink, ISIS Drive)
are three separate, non-interchangeable standards.** Predating today's catalog's
DUB/24mm/30mm/p3 crank-`bb` vocab, three historical splined/tapered spindle families
exist: plain **square taper**, Shimano's 8-spline **Octalink**, and the
industry-consortium 10-spline **ISIS Drive**. Park Tool states directly that Octalink
and ISIS Drive "do not interchange for either cranks or spindles," and a square-taper
crank cannot mount on either splined spindle type. Not modelled in the live catalog
vocab (all current cranksets use the newer external-BB families) — background knowledge
for older/entry-level bike questions the mechanic agent may still be asked. *Confidence:
confirmed.* Source: Park Tool "Three-Piece Crank Removal and Installation"
(parktool.com/en-us/blog/repair-help/crank-removal-and-installation-three-piece,
fetched).

**DRV-24 — Self-extracting ("one-key release") crank pullers hide spline alignment — an
install-order caution.** Many two- and three-piece cranks use a self-extracting system
where the puller is built into a threaded retaining ring under the crank-bolt cap;
convenient for removal, but the crank-to-spindle spline mesh can't be visually checked
during installation the way an open-spline crank can be, so a misaligned press-on can
damage the crank. Park Tool's own guidance for a doubtful fit: remove the retaining cap,
seat the crank by hand/eye first, then reinstall the cap. *Confidence: confirmed.*
Source: Park Tool "Crank Removal and Installation: Self-Extracting"
(parktool.com/en-us/blog/repair-help/crank-removal-and-installation-self-extracting,
fetched).

**DRV-25 — Chainring bolts torque far lower than the crank bolt; narrow-wide tooth
profile is why 1x needs no chain device.** Chainring bolts (Shimano steel spec ≈70–95
in-lb / ~8–11 Nm) are torqued roughly an order of magnitude below the crank-arm-to-
spindle bolt (≈300–450+ in-lb / 34–50 Nm) — over-torquing a chainring bolt to
"crank-bolt" levels can strip or crack it. Separately, the alternating-width
("narrow-wide"/"thick-thin") tooth profile used on modern 1x chainrings is specifically
shaped to grip alternating chain rollers/inner-link gaps tightly enough that a
chain-retention device became unnecessary for most riders — the same mechanical
principle behind DRV-4's T-Type tooth-shape note. *Confidence: confirmed (torque table
is a tool-maker spec sheet; narrow-wide mechanism is well-established industry design,
corroborated by the Wolf Tooth tooth-profile source already cited at DRV-4).* Source:
Park Tool "Torque Specifications and Concepts"
(parktool.com/en-us/blog/repair-help/torque-specifications-and-concepts, fetched); MBR
"How to fit your narrow wide chainring" (mbr.co.uk, fetched — enthusiast-press tier,
cited only for the "no chain device required" framing).

## Derailleur service internals (L2 — Shimano dealer manual)

**DRV-27 — Shimano XT/XTR (RD-M8000/RD-M9000) mounting + cable torque table, sourced
from the dealer manual, not a tool-maker generic chart.** Derailleur-hanger mounting bolt
(bracket-to-hanger): **8–10 N·m**. Cable-fixing bolt (securing the inner cable at the
derailleur): **6–7 N·m**. Guide-pulley and tension-pulley bolts: **2.5–5 N·m** each
(direction-marked — check the rotation arrow on the pulley before installing). Plate
stopper pin (removed to service the plate/spring): **1 N·m**. Plate unit cover bolts:
**1–1.5 N·m**. These supersede DRV-25's Park Tool generic figures for this specific
family/generation — a manufacturer dealer manual beats a tool-maker's cross-brand table
when both exist. *Confidence: confirmed (fetched Shimano dealer manual).* Source:
si.shimano.com DM-RD0004-09 "XTR RD-M9000 / DEORE XT RD-M8000 Dealer's Manual" (fetched
2026-07-17, si.shimano.com/en/pdfs/dm/RD0004/DM-RD0004-09-ENG.pdf).

**DRV-28 — The clutch/friction mechanism has a documented, narrow adjustment torque, and
a separate check torque — mixing the two damages the unit.** RD-M8000/M9000's clutch
friction is *adjusted* with a 2 mm hex on the friction-adjustment bolt, and Shimano's
manual explicitly warns: *"Do not adjust the friction with torques of 0.25 N·m or
higher. Turning the bolt excessively may cause damage."* Once adjusted, the resulting
friction is *checked* — a completely different, much higher number — with a 5 mm hex or
Hexalobular #30 in the left plate: **3.5–5.4 N·m**. These are not the same measurement:
one is how hard you turn the adjuster, the other is how much resistance the clutch then
presents. *Confidence: confirmed.* Source: DM-RD0004-09 (as DRV-27).

**DRV-29 — Grease placement inside the clutch is direction-specific; misapplied grease
kills friction.** Servicing the plate axle/clutch (plate and plate-tension-spring
replacement) calls for premium grease (Shimano Y04110000) on the plate axle — but the
manual marks one specific zone "do not apply grease" with the note: *"If grease is
applied, grease will get on the inner surface of the roller clutch and friction will be
lost."* Same caution repeated for the chain-stabilizer grease service (Y04121000/
Y04120800): keep grease off the roller-clutch inner surface or the clutch stops holding
tension. *Confidence: confirmed.* Source: DM-RD0004-09 (as DRV-27).

**DRV-30 — B-tension/stroke adjustment has a cog-count-dependent target gap, refining
DRV-17's flat 5–6 mm figure for this family.** RD-M8000/M9000's own manual splits the
guide-pulley-to-largest-cog clearance by cassette size: **5–6 mm when the largest
sprocket is 42T or smaller, 8–9 mm when it's 46T or smaller** — checked with the rear
suspension at its greatest extension on full-suspension frames (an install-order note:
the clearance moves as suspension compresses, so it must be checked at max extension,
not sag). Park Tool's cross-brand DRV-17 figure (5–6 mm) is the smaller-cassette case
only. *Confidence: confirmed.* Source: DM-RD0004-09 (as DRV-27).

**DRV-31 — Wrong-side chain threading through the plate has a dedicated
derailment-prevention feature, and there is exactly one correct side.** The rear
derailleur's plate assembly carries a chain-derailment-prevention pin/plate; the manual
instructs threading the chain through the derailleur body "from the side of the chain
derailment prevention plate" and warns that threading it through the wrong side can
damage the chain or derailleur. This is an install-order fact distinct from the
general chain-length/link-count guidance already in the corpus. *Confidence: confirmed.*
Source: DM-RD0004-09 (as DRV-27).

## SRAM Eagle AXS Transmission — install differs structurally from mechanical/AXS Eagle

**DRV-32 — Transmission has NO high/low limit screws and no B-tension screw; a
"Setup Key" + "Setup Cog" replace them, and this is a genuine mechanism difference, not
just a missing-feature simplification.** Because Transmission direct-mounts to the UDH
(no derailleur hanger to absorb tolerance), SRAM's electronic system handles limit
setting once the derailleur is mounted; the physical **Setup Key**, in the position
matched to the specific bike/chainstay via SRAM's Full Mount Chain Length Guide, paired
with a **Setup Cog**, lets chain-gap be pre-adjusted on a repair stand **without sag**
so the gap is correct once the bike is loaded and ridden. A mechanic trained only on
DRV-16/17's H/L-screw and B-screw workflow (mechanical Eagle) has nothing to adjust by
feel on a Transmission derailleur — the corresponding step is picking the right Setup
Key position, not turning a screw. *Confidence: confirmed (SRAM support).* Source:
support.sram.com articles 13819432732187 ("...doesn't have high limit, low limit, or
B-Adjust screws...") + 13819204710811 ("What does the Setup Key do...") + 13819063203611
("How do I install SRAM Eagle AXS Transmission?"), fetched 2026-07-17.

**DRV-33 — Transmission's mounting-bolt torque was revised upward mid-production, and
SRAM's own support desk documents the correction.** Some early-production Eagle AXS
Transmission derailleurs shipped with a bolt physically marked "25 Nm," but SRAM's
current guidance is **35 Nm** — SRAM's stated reason: *"we found that 35nm helped the
Transmission have a lower probability of losing chain tension. This is not a safety
concern, and the bolt is otherwise the same."* A mechanic reading the bolt's own marking
on an early unit needs to know to override it. ⚠ Flag for the catalog/corpus: any future
DRV-25-style torque table for Transmission mounting bolts should cite 35 Nm, not a value
copied off the bolt head. *Confidence: confirmed (SRAM support, explicit
correction notice).* Source: support.sram.com article 13819512988827, fetched 2026-07-17.

**DRV-34 — Thru-axle torque is functionally coupled to Transmission's derailleur, not
just the wheel — a cross-system dependency unique to this family.** Because the
Transmission derailleur mounts directly to (and pivots against) the UDH interface that
the thru-axle also clamps, SRAM states axle torque "plays a role in how hard it is to
rotate the Eagle Transmission rear derailleur rearwards with an impact, as well as how
hard it is to reset it manually" — under-torquing the axle doesn't just risk the wheel,
it changes how the derailleur's impact-absorption behaves. SRAM's guidance is to follow
the *frame or axle maker's* torque spec, not a drivetrain-side number — a genuine
cross-component dependency the mechanical-Eagle chapter facts (DRV-16 H/L screws) have
no equivalent for. *Confidence: confirmed (SRAM support).* Source: support.sram.com
article 13819403761051, fetched 2026-07-17.

## SRAM mechanical (cable-actuated) Eagle rear derailleur — install torque + clutch-service status (L2)

**DRV-37 — Mechanical Eagle rear derailleur install torque table, including the UDH "Half
Mount" e-MTB/pedelec variant.** SRAM's own "1x MTB Mechanical Derailleurs User Manual"
(covers the SX/NX/GX/X01 mechanical Eagle family plus the UDH-direct S100) gives: hanger
mounting bolt **11 N·m (97 in-lb)**, with an explicit "do not grease the mounting bolt or
hanger threads" caution (the opposite instruction from a lubricated fastener); cable-anchor
bolt (T25) **4.5 N·m (40 in-lb)**. A separate optional install path — the **UDH Half
Mount** plate, used to run a traditional-hanger-style mechanical derailleur on a UDH-only
frame for e-MTB/pedelec applications — adds its own hardware: the UDH bolt itself
**25 N·m (221 in-lb)**, explicitly **left-hand threaded**, installed with NO washer between
the plate and bolt (a stray washer is called out as wrong); the B-bolt in that configuration
**10–12 N·m (88–106 in-lb)**. This is a genuinely different mechanical assembly from
Transmission's UDH Full Mount (DRV-32) — Half Mount still uses a conventional derailleur
body with H/L and B-tension adjustment (DRV-16/17), UDH only replaces the hanger interface,
whereas Transmission replaces the whole limit-setting mechanism. *Confidence: confirmed
(fetched SRAM user/service manual).* Source: sram.com
`/globalassets/document-hierarchy/user-manuals/sram-mtb/drivetrain/1x-mtb-mechanical-derailleurs-user-manual.pdf`
(fetched 2026-07-17 via the RD-X0-1-B1 service-models page's Manuals section — same fetch
route DRV-27/32 established for the SRAM/Shimano service catalogs).

**DRV-38 — SRAM's mechanical Eagle "Cage Lock" is a wheel-removal convenience latch, NOT a
clutch-tension adjuster — the opposite mechanism from Shimano's Shadow Plus friction dial
(DRV-28).** The manual's Cage Lock section only describes rotating the derailleur cage
forward and pressing a button to hold it in the extended position for easier wheel removal,
with an explicit pinch-point warning that the cage "is spring loaded and will return...
rapidly" when released — nothing in the mechanical Eagle manual describes an adjustable
clutch friction setting analogous to Shimano's 2 mm-hex friction-adjust bolt. A mechanic
trained on Shimano's adjustable-clutch workflow (DRV-28) has no equivalent control to reach
for on mechanical Eagle — the cage-tension spring is fixed, not field-adjustable.
*Confidence: confirmed (absence corroborated across the fetched manual's full Cage Lock
description — no adjustment step present).* Source: SRAM 1x MTB Mechanical Derailleurs
User Manual (as DRV-37), "Cage Lock" section.

**DRV-39 — No manufacturer-published clutch-spring or pulley-bushing rebuild procedure
exists for mechanical/AXS Eagle derailleurs — a confirmed absence, not an unfetched
document.** Following the DRV-9-style fetch protocol (WebFetch → search → Bright Data), the
SRAM service-models pages for RD-X0-1-B1/RD-GX-1-B1/RD-NX-1-B1/RD-SX-1-A1/RD-90-A1 were
checked; each links only the install/adjustment user manual (DRV-37) plus the drivetrain
adjustment-tools PDF and compatibility maps — no "Service Manual" tier document covering
internal disassembly, spring replacement, or pulley-bushing service was found on any of
them, and a support.sram.com search for spring/clutch service returns no manufacturer FAQ,
only community threads (bikewrench/Vital MTB forum posts, not fetched as a source — per
INDEX.md rule 3 a forum thread is not quotable as a corpus fact without being explicitly
labelled community-tier, and none of these were pulled in far enough to source a specific
procedure). SRAM's public position, inferred from the *absence* of a documented procedure
across every model this round checked, is that the clutch/spring cartridge is treated as a
sealed, non-user-serviceable unit — worn units get replaced, not rebuilt from spec. This
mirrors DRV-33/34's "SRAM tells you the frame/axle-maker's number, not a rebuild spec" shape
but for a part with apparently no published spec at all. *Confidence: confirmed-absence
(a real, repeated fetch attempt found nothing, which is different from "not yet tried" —
see INDEX.md rule 6, "not established" is the honest entry here).* This L2 gap for SRAM's
side is now closed as *investigated and genuinely unsourceable*, not left as an unattempted
TODO — it should not be re-attempted the same way in a future round without a new lead
(e.g. a leaked/community teardown video cited explicitly as community-tier, or a SRAM patent
filing, neither pursued this round).

## Crank / bottom bracket install torque (L2 — Shimano dealer manual, closes the prior DM-MBFC001-04 gap)

**DRV-35 — Shimano Deore-through-XT Hollowtech II crank + threaded/press-fit BB torque
table, recovered via a Wayback Machine snapshot after three direct-fetch routes failed.**
Two-bolt Hollowtech II left-crank-arm pinch bolts (FC-M8000/M7000/M6000/M617/MT500/MT600/
MT700 — Deore through XT, both threaded and press-fit BB families): **12–14 N·m**,
tightened alternately in stages (not each bolt fully at once), with a re-check after ~100 km
(60 mi) of riding — a wear-in step distinct from a one-time install torque. A separate,
much lighter **preload bolt** at the crank-arm/axle wide-groove joint is set to
**0.7–1.5 N·m** *before* the two pinch bolts are brought to spec — mixing these two torques
up (over-tightening the preload bolt to pinch-bolt spec) is the same "two different
numbers for two different steps" trap as DRV-28's Shimano derailleur clutch
adjust-vs-check split. Threaded BB cups (SM-BB52/BB-MT501/BB-MT500-PA): **35–50 N·m**.
Press-fit BB (BB-MT800/BB-MT801/BB-MT800-PA): pressed in with a spanner + hex wrench per a
shell-width/spacer table, not torque-specified (interference fit, not a threaded joint).
Pedals: **35–55 N·m** (right crank = right-hand thread, left crank = left-hand thread — the
one crank-family joint where thread handedness flips side-to-side). *Confidence: confirmed
(fetched Shimano dealer manual).* Source: si.shimano.com DM-MBFC001-04 "Deore XT / SLX /
Deore / Non-Series MTB Crankset Dealer's Manual," recovered via
`web.archive.org/web/20250327103340/https://si.shimano.com/en/pdfs/dm/MBFC001/DM-MBFC001-04-ENG.pdf`
(fetched 2026-07-17 — the live si.shimano.com URL still 403s direct `curl`/WebFetch; the
Wayback snapshot serves the identical PDF cleanly via `pdftotext`, no encryption issue this
time, unlike the Bright-Data-returned copy from the prior round). This is the first sourced
crank-bolt/BB torque table from a Shimano dealer manual — DRV-25's Park Tool figures
(≈34–50 N·m crank bolt, ≈8–11 N·m chainring bolt) were cross-brand generic; DRV-35/36
supersede them for this specific Shimano family the same way DRV-27 superseded DRV-25 for
XT/XTR derailleurs.

**DRV-36 — Chainring bolt torque is position-dependent (largest/middle vs. smallest ring),
not one flat number — refines DRV-25's single generic figure for this Shimano family.**
DM-MBFC001-04's per-model chainring-replacement tables show the tightening torque differs
by *which* ring is being bolted, not just by crank family: on the double-chainring
FC-M8000-2/M7000-11-2/MT700-2/MT600-2 group the **largest chainring is 12–14 N·m** and the
**smallest chainring is 16–17 N·m**; on the FC-M6000-2/MT500-2 (Deore-tier) group *both*
rings are **16–17 N·m**; on the FC-M617 double the largest is 12–14 N·m and the smallest is
16–17 N·m (same split as the M8000 group); on the triple-chainring FC-M8000-3/
FC-M7000-10-3 the **largest+middle rings share 10–12 N·m** while the **smallest ring is
16–17 N·m**; on the triple FC-MT500-3/FC-M6000-3 it's the reverse assignment of numbers —
**smallest ring 16–17 N·m, largest+middle 12–14 N·m**. A mechanic applying one flat
chainring-bolt torque across a whole crank family risks over- or under-torquing whichever
ring the family puts in the *other* bracket. *Confidence: confirmed (same fetched dealer
manual as DRV-35).* Source: DM-MBFC001-04 (as DRV-35), "Replacing chainrings" sections.

## Chain width — historical cross-speed tolerance

**DRV-26 [refines the DRV-12/13 pattern to geared drivetrains] — Historically,
chain-width substitution across speed counts is direction-asymmetric, the same shape as
the single-speed finding.** Sheldon Brown's reference states a chain **one step
narrower** than a system's nominal speed count "rarely presents any problem" (e.g. a
9-speed chain on an 8-speed cassette) — shifting may be slightly less crisp, but it
runs — while a chain **wider** than nominal "will not fit between adjacent sprockets"
and can jam. This documentation covers systems up through roughly 9/10-speed; it does
**not** address 11- or 12-speed chains (narrower still, per the DRV-25/DRV-4
tooth-geometry context), so applicability to the live catalog's
`shimano-12`/`sram-eagle`/`sram-transmission` rows is **not established** — flagged as
an open question, not applied. *Confidence: confirmed for the documented speed range
(5-to-10-speed); explicitly not established for 11/12-speed — do not extrapolate.*
Source: sheldonbrown.com/speeds.html (fetched) — *"A chain one size narrower than
standard rarely presents any problem"*; sheldonbrown.com/gloss_ch.html (fetched, width
figures table).

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **System is the master constraint.** Shifter + derailleur + cassette + chain are one
  interlocking set: pull ratio (system) AND actuation (cable/AXS) must both agree (DRV-1,
  DRV-2). The single documented loosening is electronic SRAM controllers driving any AXS mech
  (DRV-3).
- **The chain is the quiet linchpin.** It couples to the cassette/system (width + pull) *and*
  to the chainring standard (DRV-4). A chain can be "right" for the cassette and *wrong* for
  the ring (Flattop chain on a non-T-Type ring) — the two constraints are independent, so
  check both.
- **Cassette range is bounded by the derailleur (one way only)** — the mech's max cog is the
  ceiling; the floor (DRV-7) exists in SRAM's spec but is unmodelled.
- **The rear wheel's freehub gates which cassettes mount at all** (DRV-9) — this is a
  *wheel*↔*cassette* constraint that sits upstream of the drivetrain-family checks.
- **Derailleur capacity is chainring-difference + cog-difference, not cog-max alone**
  (DRV-19) — the engine checks only the cassette/derailleur cog-max side (DRV-6); a
  future multi-chainring catalog row would need the combined formula, not just today's
  1x-collapsed case.

### Mismatch failure modes (how it actually fails)
- **Hard "won't fit / won't index":** wrong system or wrong actuation (DRV-1/2); Flattop chain
  on a non-T-Type ring (DRV-4); cassette larger than mech capacity (DRV-6); wrong freehub body
  (DRV-9, except the XD-on-XDR spacer case DRV-10).
- **"Runs but poorly" (warning-shaped):** single-speed chain-width mismatch — side-play,
  noise, faster wear, occasional drops in the bad direction (DRV-12/13); XD-on-XDR without the
  spacer sits skewed; a geared chain ridden past its speed-specific wear threshold
  (DRV-20) still shifts but silently accelerates cassette/ring wear — same "runs but
  degrades" shape.
- **Silent-and-fine (must NOT be flagged):** T-Type ring + Eagle chain (DRV-4 reverse);
  big-cage mech + small cassette (DRV-6 reverse); Boost crank in a SuperBoost frame (DRV-15).

### Install-order dependencies
- **Transmission's install order has no screw-adjustment step where mechanical Eagle has
  one** (DRV-32): mount derailleur → set Setup Key/Cog → pair via AXS app, versus
  mechanical Eagle's mount → set H/L screws (DRV-16) → set B-screw (DRV-8/17). A mechanic
  reaching for a hex key to "set the limits" on a Transmission derailleur is solving a
  problem that doesn't exist on this family.
- **Thru-axle torque must be set to the frame/axle maker's spec, not skipped or
  guessed, before trusting Transmission's impact behavior** (DRV-34) — this is upstream
  of the derailleur itself but directly changes how it performs under impact.
- **Chain threading has one correct side through the plate** (DRV-31): route it through
  the derailment-prevention-plate side, checked at install, not fixable by adjustment
  after the fact.
- **b-gap after any cassette swap** (DRV-8): the chain-gap must be reset when moving between
  cassette sizes — it is install, not compatibility, but a missed reset shifts badly.
- **Freehub body swap precedes cassette fit** (DRV-9): if the wheel is the wrong driver, the
  body is changed *first* (and some hubs need an upgrade kit before they can accept the new
  body at all).
- **Single-speed chain tension is set at install** via dropout type (see
  [`frame-standards-bearings.md`](frame-standards-bearings.md) — a vertical dropout needs a
  tensioner or half-link; horizontal/sliding/ecc-BB set tension by moving the wheel/BB).
- **Cassette install has exactly one orientation, no chain whip needed** (DRV-21): the
  wide spline gap makes wrong-orientation install physically impossible; the chain whip
  is a removal-only tool since installation direction is the pawls' own drive direction.
- **Self-extracting crank pullers hide the spline fit** (DRV-24): unlike open-spline
  cranks, misalignment isn't visible during the press-on, so a doubtful fit should be
  checked cap-off first.
- **Crank-arm pinch bolts have a two-step torque, not one** (DRV-35): a light preload bolt
  (0.7–1.5 N·m) is set before the two pinch bolts reach final spec (12–14 N·m) — install
  order, not just a target number. Chainring bolts then add a *third*, position-dependent
  number per DRV-36, so a single crank install touches three distinct torque specs.
- **Mechanical Eagle's UDH "Half Mount" is a different install path from Transmission's UDH
  Full Mount** (DRV-37 vs. DRV-32): Half Mount keeps the conventional hanger-style
  derailleur body (H/L screws, B-tension) and only swaps the hanger interface, so a
  mechanic who has just serviced a Transmission derailleur's Setup-Key workflow should not
  assume the same steps apply to a Half-Mount mechanical Eagle build on the same frame.

### Wear couplings
- **Chain–cassette–ring wear as a set:** a worn chain accelerates cassette and ring wear; the
  three are replaced as a coupled system, which is why a width or standard mismatch (DRV-4,
  DRV-12) that "runs" still costs — it wears the whole set faster.
- **Width mismatch → retention:** the direction-dependence in DRV-13 is fundamentally a
  tooth-engagement/retention issue that shows up as wear and drops, not an instant failure.
- **Chain-wear threshold tightens with speed count** (DRV-20): 0.5% for 11+-speed chains
  vs 0.75% for 10-and-under vs 1.0% single-speed — narrower modern chains have
  proportionally less material margin before they start chewing the cassette/rings.
- **DRV-26 extends the DRV-12/13 direction-asymmetric pattern to geared drivetrains:** a
  narrower-than-nominal chain tends to just run less crisply; a wider-than-nominal chain
  tends to jam outright — the same shape as the single-speed chain-width finding, though
  only confirmed historically through ~10-speed.

---

## Gaps

- **Closed 2026-07-17 round 2 (DRV-35–36):** the Shimano MTB crank/BB dealer manual
  DM-MBFC001-04 gap flagged at the end of round 1 (WebFetch 403, Exa PDF-crawl timeout,
  Bright-Data-returned PDF encrypted/unopenable) is now resolved — the same PDF, fetched
  through a Wayback Machine snapshot of the si.shimano.com URL instead of the live host,
  extracted cleanly with `pdftotext` with no encryption issue. Full crank-bolt/preload-bolt/
  BB/pedal/position-dependent-chainring-bolt torque table is sourced (DRV-35–36),
  superseding DRV-25's cross-brand Park Tool figures for this Shimano family the same way
  DRV-27 did for XT/XTR derailleurs. **Lesson for future rounds:** when a live si.shimano.com
  PDF 403s or returns corrupted bytes, check `web.archive.org` for a snapshot of the exact
  PDF URL *before* escalating to a different Bright Data zone — it resolved this gap in one
  step.
- **Partially closed 2026-07-17 round 2 (DRV-37–39):** SRAM mechanical (cable-actuated)
  1x Eagle rear derailleur install torque (mounting bolt, cable anchor, UDH Half Mount
  bolt/B-bolt for the e-MTB path) is now sourced (DRV-37), and the "Cage Lock is not a
  clutch adjuster" contrast with Shimano's DRV-28 is documented (DRV-38). **Genuinely
  still open, now confirmed rather than merely unattempted:** no manufacturer-published
  clutch-spring or pulley-bushing rebuild procedure exists for mechanical/AXS Eagle
  derailleurs — checked across five SRAM service-model pages (RD-X0-1-B1, RD-GX-1-B1,
  RD-NX-1-B1, RD-SX-1-A1, RD-90-A1) plus a support.sram.com search, all coming up with
  install/adjustment documents only (DRV-39). This is now a confirmed-absence finding, not
  a re-fetch candidate — a future round would need a genuinely new lead (patent filing,
  an explicitly-labelled community teardown) rather than repeating the same service-page
  search. **L2 gap: closed as "not established," not reopened as unattempted.**
- No **chain-wear tolerance table cross-checked against SRAM/Shimano's own published
  %** — DRV-20 is tool-maker (Park Tool) guidance, explicitly caveated as "every
  manufacturer has their own specifications" — **L2 gap**.
- No **AXS pairing/firmware/electronic-service** facts (battery service, pairing
  procedure, firmware-update compatibility across derailleur generations) — **L2 gap**.
- No **freehub/driver-body internal service** (pawl/spring rebuild, DT Swiss
  Ratchet/Ratchet EXP internals, drag/service intervals) beyond the swap-kit-exists fact
  (DRV-9) — **L2 gap**.
- DRV-26's chain-width cross-tolerance is sourced only through ~10-speed; **no sourced
  data for 11/12-speed narrow-chain substitution tolerance** — explicitly flagged not
  established, a candidate for a dedicated fetch in a future round.
- **PARTIALLY CLOSED this round (DRV-40) — Zero Friction Cycling km-lifespan data (MTB
  ~800-1,200 km vs road ~3,000-5,000 km to 0.5% wear, 300,000+ km test basis) sourced via a
  secondary citation (componentry.app), since ZFC's own PDFs are image-based and didn't
  extract.** Still missing: a genuine cassette/ring wear-cycle survival curve (how many chain
  changes a cassette tolerates before ITS wear crosses a threshold) — DRV-40 has the chain side
  of the wear-coupling but not the cassette/ring side; **L3 gap, narrowed not closed**. A future
  round should also retry ZFC's own PDFs with OCR, or find their "data consol v4" table.
- No **lubrication chemistry** (wet/dry lube selection, wax-based chain treatment
  tradeoffs) — **L3 gap**.
- DRV-18's capacity-conservative claim is community-tier only; **no manufacturer
  document confirms a specific over-capacity/over-max-cog safety margin** — stays an
  open question, not a modelling candidate, until sourced at confirmed tier.
- No **BB30/PF30/press-fit crank-spindle press-tolerance depth**, no **spoke/wheel-build
  wear-adjacent drivetrain science** — **L3 gap** (out of this chapter's core scope but
  noted since crank/BB touches both `drivetrain.md` and
  `frame-standards-bearings.md`).

## Open mechanic questions (for the human review — do not act)
- DRV-8: does a missed b-gap reset on a cassette swap earn a warning, or is it routine install?
- DRV-7: does anyone run big-capacity mechs on small (below-minimum) cassettes, and does it
  shift acceptably — worth modelling or noise?
- DRV-13: should the single-speed chain-width warning become direction-aware (wide-on-narrow
  tolerated, narrow-on-wide flagged), matching rules 9 / 6c?
- DRV-15: real-world behaviour of Boost-chainline cranks in SuperBoost frames.
- DRV-18: is there ANY manufacturer document (not just community/forum consensus) that
  states an explicit safety margin above published max-cog/capacity ratings? Without one
  this stays community tier only and cannot inform the DRV-7 minimum-cog question beyond
  "informative."
- DRV-26: does the historical narrower-chain-tolerated / wider-chain-jams pattern hold
  at 11/12-speed, or has narrow-chain tolerance collapsed at today's tooth spacing? No
  source found either way — needs a dedicated fetch, not an inference.
