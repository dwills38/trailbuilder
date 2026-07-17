# Drivetrain — Mechanic Corpus

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

### Mismatch failure modes (how it actually fails)
- **Hard "won't fit / won't index":** wrong system or wrong actuation (DRV-1/2); Flattop chain
  on a non-T-Type ring (DRV-4); cassette larger than mech capacity (DRV-6); wrong freehub body
  (DRV-9, except the XD-on-XDR spacer case DRV-10).
- **"Runs but poorly" (warning-shaped):** single-speed chain-width mismatch — side-play,
  noise, faster wear, occasional drops in the bad direction (DRV-12/13); XD-on-XDR without the
  spacer sits skewed.
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

### Wear couplings
- **Chain–cassette–ring wear as a set:** a worn chain accelerates cassette and ring wear; the
  three are replaced as a coupled system, which is why a width or standard mismatch (DRV-4,
  DRV-12) that "runs" still costs — it wears the whole set faster.
- **Width mismatch → retention:** the direction-dependence in DRV-13 is fundamentally a
  tooth-engagement/retention issue that shows up as wear and drops, not an instant failure.

---

## Open mechanic questions (for the human review — do not act)
- DRV-8: does a missed b-gap reset on a cassette swap earn a warning, or is it routine install?
- DRV-7: does anyone run big-capacity mechs on small (below-minimum) cassettes, and does it
  shift acceptably — worth modelling or noise?
- DRV-13: should the single-speed chain-width warning become direction-aware (wide-on-narrow
  tolerated, narrow-on-wide flagged), matching rules 9 / 6c?
- DRV-15: real-world behaviour of Boost-chainline cranks in SuperBoost frames.
