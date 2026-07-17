# Drivetrain — Mechanic Corpus

**Maturity: foundation**

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

- No SRAM/Shimano derailleur **service-manual internals** (spring tension specs, pulley
  bushing service, clutch-mechanism rebuild/torque tables) — **L2 gap**.
- No **torque-spec table sourced against current SRAM AXS/Transmission or Shimano
  12-speed dealer manuals** — DRV-25's torque figures are legacy/generic
  (Shimano/Campagnolo/Truvativ-era Park Tool data), not confirmed for T-Type/Transmission
  -specific fasteners — **L2 gap**.
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
- No **wear-coupling curve data** (how many chain-wear cycles a cassette/ring actually
  survives, quantified) — this is drivetrain wear science and belongs at **L3** per
  CURRICULUM.md, not this round's target.
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
