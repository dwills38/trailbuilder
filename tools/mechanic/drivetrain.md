# Drivetrain — Mechanic Corpus

**Maturity: professional** (L1 complete + L2 service-manual depth now spans most of the
chapter's parts: the 2026-07-17 first pass landed Shimano XT/XTR derailleur dealer-manual
internals + SRAM Transmission install-torque facts (DRV-27–32); a same-day second pass closed
the Shimano MTB crank/BB dealer-manual gap (DRV-35–36, recovered via Wayback Machine after
three direct-fetch routes failed) and added SRAM mechanical Eagle derailleur install torque +
a confirmed-absence finding on clutch/spring rebuild documentation (DRV-37–39). **2026-07-18:
Zero Friction Cycling's own chain-wear-testing PDFs, previously misdiagnosed as image-only,
are fetched and mined directly (DRV-41/42)** — real per-model km-to-wear figures with their
worst-case-lubricant caveat, plus the HARDCHROME/Vickers-hardness metallurgy behind SRAM
Eagle's tier gap. **2026-07-18 second same-day pass (DRV-43–51) closes the AXS
pairing/firmware/battery-service gap, lands DT Swiss Ratchet EXP freehub internal service,
cross-checks chain-wear % against SRAM's own 0.8% spec, sources the genuine SRAM Eagle
Transmission Service Manual's rebuild/cross-compatibility rules, and sources the Shimano
BB-spacer chainline-adjustment mechanism** — with this pass, L2 depth now covers every major
part family in this chapter (shifter/electronics, derailleur ×3 SRAM tiers + Shimano, cassette/
freehub, chain, crank/BB/chainline), crossing the CURRICULUM.md bar for `professional`.
**Same-day third pass (DRV-52–55) closes two more named L3 gaps**: the cassette/ring wear-cycle
survival curve (named SRAM/Shimano rep quotes + a controlled Friction Facts efficiency test) and
lubrication chemistry (a controlled multi-thousand-km ZFC test program quantifying wet/dry/
wax-emulsion/immersive-wax lubricant categories). What's left toward `master` is narrower now:
no cross-generation AXS firmware-compatibility table, no Shimano-MicroSpline/Hope freehub
internals, and real L4 race-craft content is still thin (one tangential pro-team chain-interval
note in DRV-42) — see `## Gaps`. **2026-07-18 master round 2 closed the chain-width item**
(DRV-64–67): 9–12-speed chains share one internal-width class, so cross-speed substitution is a
clearance question, not an engagement one — with Shimano declared source-exhausted for chain
geometry and the 11↔12 substitution question explicitly NOT promoted into an engine allowance.)

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
removed from primary**, not the same confidence as a directly-fetched manufacturer page.
**Correction 2026-07-18 (see DRV-41/42): the "image-based, no OCR text layer" diagnosis was
wrong** — WebFetch's HTML-conversion path apparently couldn't parse these PDFs, but a direct
`curl` download + `pdftotext` extracts real text cleanly from all four ZFC PDFs tried
(the two named here, plus `chainlongevitypg1.pdf` and a "Chain efficiency and wear-life
data consol v3" PDF — the "v4" this note speculated about doesn't exist; v3 is current).
The chain-model-specific km figures are still chart bar-heights, not printed numbers, so
those needed a rendered-page image read (same technique as `suspension.md` SUS-44/45), not
OCR. *Confidence: measured/third-party, one hop from primary — superseded by DRV-41's
directly-fetched primary figures for the specific chain models DRV-41 covers; retained here
for the general MTB-vs-road km-range framing DRV-41 does not restate.* Source:
componentry.app "How to Measure Chain Stretch" (fetched), citing Zero Friction Cycling
(zerofrictioncycling.com.au) test data by name.

**DRV-41 — Zero Friction Cycling's own longevity-test charts (primary source, fetched
directly) give per-model km-to-0.5%-wear figures, but under a deliberately WORST-CASE
lubricant — read the number alongside that caveat or it will be cited out of context.**
ZFC's test protocol (from its own full test-brief PDF): a chain-on-test is joined
half-and-half with a control chain (usually Shimano Ultegra) via master links, run on a
rig, and measured two ways — the KMC digital chain-wear checker (8-link span, 0.01mm
accuracy, 6 measures averaged across a 53-link test section) and a separate true-elongation
single-span measure once the chain is removed. The **control lubricant is White Lightning
Epic Ride, deliberately chosen because independent Friction Facts testing ranked it 55th of
55 lubricants for efficiency** — ZFC's own words: "a poor performing lubricant with a high
wear rate is desired for chain longevity testing to quickly assess the chains resistance to
wear." Every km figure below is therefore a **worst-case-lubricant, controlled-rig**
baseline, not a real-world trail-riding figure — this is also why these numbers (thousands
of km) sit far above DRV-40's ~800-1,200 km real-world MTB range: DRV-40's figure includes
trail grit/mud contamination that a bench-rig test with a single (if poor) lubricant does
not replicate; the two figures describe different conditions, not a contradiction. Reading
the "Digital Chain Wear Checker" chart directly (bar heights, approximate to the nearest
~50-100 km): **SRAM Eagle XX1/XO1 12-speed ~5,000+ km** (bars are extrapolated past the
chart's 5,000 km ceiling), **Shimano XTR CM9100 12-speed ~3,300 km**, **SRAM Eagle GX
12-speed ~2,050 km**, **SRAM Eagle NX 12-speed ~1,950 km**, down to **Shimano HG40 8-speed
~1,050 km** (the lowest of every chain tested). The separate "pure elongation only" chart
reads higher for every model (e.g. Eagle XX1/XO1 ~6,700 km) because it excludes the
digital checker's double-counted roller-bore/bushing wear at the span's two entry
points — **the two ZFC charts are not measuring the same thing, and citing a number
without naming which chart it came from is a citation error.** *Confidence: confirmed
(fetched primary, chart bar-heights read from a directly-rendered page image, not OCR or
a third-party citation) for the figures named; approximate by nature of a bar-chart
read (±~100 km), not a printed table value.* Source: zerofrictioncycling.com.au
`chainlongevitypg1.pdf` + `Chain-Longevity-Testing-Full-test-brief.pdf` (both fetched
directly via `curl`, page image rendered via `pdftoppm`), 2026-07-18.

**DRV-42 — SRAM Eagle's XX1/XO1-vs-GX/NX wear-life gap has a named metallurgical cause:
HARDCHROME treatment, present on the top two tiers only.** ZFC's consolidated chain-data
page states plainly: "GX level chains do not have HARDCHROME and wear VASTLY faster vs
X01 & XX1 level chains" (ZFC rates this "VERY HIGH" confidence) — directly explaining the
~2,050/1,950 km GX/NX figures vs ~5,000+ km XX1/XO1 figures in DRV-41 as a treatment
difference, not test noise. The same page's general hardness-science section (Vickers
scale) gives the underlying mechanism: untreated chain steel is typically ~150-300
Vickers, chromium-carbide plating runs ~1,000-1,800 Vickers, and titanium-nitride plating
~1,800-2,200 Vickers — a 5-10x hardness increase on treated wear surfaces, which is the
metallurgical reason a hardchrome/nitride-treated chain outlasts an untreated one at the
same nominal price/speed tier. This is the L3 "chain vs cassette vs ring wear-coupling"
gap's metallurgy half — still missing (per DRV-40's gap note) is the cassette/ring side of
that coupling. **Tangential L4 race-craft note, same source:** World Tour road teams
replace chains at ~500-1,000 km — partly a breakage-safety margin, partly to replace the
chain before its low-friction surface coating abrades off. *Confidence: confirmed (fetched
primary) for the HARDCHROME claim and Vickers figures (both stated as fact on ZFC's page,
not hedged as ZFC's own estimate); the 500-1,000 km pro-team figure is ZFC's own
practitioner-tier claim, not independently corroborated — labelled accordingly.* Source:
zerofrictioncycling.com.au "Chain efficiency and wear-life data consol v3" PDF (fetched
directly via `curl`) + `Chain-Longevity-Testing-Full-test-brief.pdf`, 2026-07-18.

## Cassette/chainring wear-cycle survival curve (closes a named L3 gap)

**DRV-52 — Named SRAM and Shimano representatives (not just aggregator sites) confirm a real
chain:cassette:chainring wear-life RATIO — a cassette survives roughly 2–4 on-time chain
changes, and chainrings outlast the cassette by a further 2–4× — plus the actual field
diagnostic each maker's own rep recommends for judging "is it worn yet."** SRAM's Chris McKenney,
quoted directly in a road.cc feature: *"The easiest way to determine if your cassette is worn out
is to install a new chain. If the chain skips under pedalling load then it's time for a new
cassette"* — the same fresh-chain-as-diagnostic-tool principle independently described by a
community source (watchmy.bike) as the mechanism behind the ratio: *"Once a chain wears past its
threshold, it reshapes the cassette teeth to match its stretched pitch. After that, a new chain
on the old cassette skips under load."* McKenney separately describes the chainring failure mode
by name — *"chainring teeth slowly take on the shape of a shark's fin in use"* — and gives the two
practical symptoms: an inner ring is worn when a clean new chain **chain-sucks** (fails to release
at the bottom of the stroke); an outer ring is worn when running rough or shifting inconsistently.
Shimano's Ben Hillsdon, same article, confirms the underlying reason to keep the chain on schedule
in the maker's own words: *"A worn out chain will also wear out your cassette and chainring
teeth... Doing so can extend the lifetime of your cassette and chainrings, which in the end will
save you money."* Neither maker publishes a specific km/mile figure — road.cc's own framing states
why: *"there are too many variables involved, such as the conditions you ride in... whether the
correct lube was used... maintenance intervals and rider shift patterns"* — so the **ratio**
(chains-per-cassette, cassettes-per-chainring-set) is the durable, maker-endorsed fact; a specific
km number is aggregator-tier (community sites converge on roughly 2–4 chains/cassette,
2–6 chains/chainring-set, e.g. watchmy.bike's "10,000 km road cassette life if every chain is
caught on time") and should be labelled community/aggregator, not manufacturer, confidence.
*Confidence: confirmed (named SRAM/Shimano reps, direct quotes, for the ratio-and-mechanism
claim and the field diagnostic); community/aggregator tier (labelled) for specific km figures.*
Source: road.cc "Are your chainrings and cassette worn?" (fetched, Chris McKenney/SRAM +
Ben Hillsdon/Shimano direct quotes); watchmy.bike "Cassette and Chainrings: When the Chain Forces
You to Replace Them Too" + "How Long Do Bike Parts Actually Last?" (fetched, community-tier
km figures, explicitly labelled), 2026-07-18.

**DRV-53 — A controlled lab test (Friction Facts, published via CeramicSpeed) measures that worn
ring/cog teeth contribute FAR LESS drivetrain friction loss than chain elongation does — the
quantified reason DRV-20's wear-threshold discipline targets the chain, not the cassette/ring, as
the thing to watch closely.** Friction Facts' controlled rig test (twelve real chains — 2 new,
10 shop-discarded "worn" — each run against both a new and a worn ring/cog set, at 250 W rider
output): *"Chain elongation correlates to frictional losses in a generally linear manner"* at an
average rate of **2.02 watts per 1% of chain elongation**, while *"the use of a new ring/cog
compared to an old ring/cog decreased overall frictional losses by [only] 0.10 to 0.33 watts"* —
roughly an order of magnitude smaller effect than a single percentage point of chain wear. The
test's own conclusion states the asymmetry directly: *"frictional losses were predominantly
dependent upon the amount of elongation seen in the chain, whereas the wear level of the ring/cogs
had a much less significant effect."* This gives DRV-20's chain-wear-threshold discipline its
quantified justification: the chain is the correct thing to measure and replace on schedule not
just because it's cheapest, but because its wear state dominates the actual efficiency/wear-
coupling outcome — a worn ring/cog is a real cost (DRV-52's replacement-cascade) but a much
smaller drag/efficiency contributor than the elongated chain riding on it. *Confidence: confirmed
(fetched, a genuine controlled instrumented test, not a marketing claim — Friction Facts is an
independent test lab, the data republished by CeramicSpeed with methodology intact).* Source:
ceramicspeed.com "Drivetrain Efficiency Test: Old vs. New" (fetched, full methodology + data
table), 2026-07-18. Cross-reference: DRV-20.

## Lubrication chemistry (closes a named L3 gap)

**DRV-54 — Chain lubricants split into four mechanically distinct categories with fundamentally
different contamination behavior, and the core divide is solid vs. liquid, not brand or price —
a controlled multi-thousand-km rig test (Zero Friction Cycling, thousands of km per product,
alternating clean/dry-dust/wet/extreme-contamination blocks with no chain cleaning, only
re-lubrication) quantifies the difference rather than asserting it.** The four categories: **wet
(liquid) drip lubes** — oil-based, penetrate easily, but stay liquid indefinitely, so abrasive
contamination that enters stays suspended in the lubricant grinding against chain metal
continuously; **dry drip lubes** — very low actual-lubricant fraction by volume (≈10%), so they
test with *higher* friction losses than wet lubes despite the "dry" marketing, because they
provide little real lubrication while still gathering some contamination; **wax-emulsion drip
lubes** (e.g. Squirt, Smoove, Grax) — wax carried in a water base that evaporates, leaving a
semi-solid "plastic" residue with real contamination resistance but real penetration/gunk-up
issues; **immersive (solid/paraffin) wax** — the chain is fully removed and hot-dipped, coating
every internal sliding surface in a solid film that leaves "chain metal out of the equation" for
wear purposes until the film wears thin. The mechanical reason solid wax outperforms liquid
lubricants at contamination resistance: paraffin wax is a **shedding** lubricant — abrasive grit
that penetrates gets physically abraded OFF the chain along with the wax film it's embedded in,
whereas a liquid lubricant has no equivalent self-cleaning mechanism and simply accumulates
contamination as an increasingly abrasive slurry between the chain's moving surfaces.
*Confidence: confirmed (fetched, a genuine multi-thousand-km controlled instrumented test
program, not a marketing page — methodology explicitly documented: zero/dry-dust/wet/extreme
contamination blocks, defined re-lubrication points, no cleaning during test).* Source:
zerofrictioncycling.com.au "Lubricant Testing" + "The best lubricant in the world is......" +
"Key Learnings from Lubricant Testing Round 1" (all fetched), 2026-07-18.

**DRV-55 — The lubricant-category difference is quantified, not just described: immersive
waxing tests at roughly 3–5× the chain/drivetrain-parts lifespan of a decent drip lubricant, and
~10× lower wear than top-tier WET drip lubes specifically under dry-dust contamination — and
the re-wax/re-lube INTERVAL matters as much as the lubricant choice itself.** ZFC's own summary
of its test program: *"Due to above factors, you will typically attain circa 3 to 5 times the
chain and drivetrain parts lifespan vs medium to decent drip lubricants"* for immersive waxing,
and separately, comparing dry-dust contamination-block wear specifically: *"Immersive wax is
circa 10x lower wear than even the top 5 wet drip lubricants tested. It is not even a close
competition."* The re-application interval is itself a major variable, independent of which
product is used: ZFC's own modelling states *"General best practice is circa 300km — testing has
shown a distinct increase in friction and wear from around that mark. If one re-waxes at around
300km... chain lifespans to 0.5% wear are typically circa 15,000km on good chains. Push
re-waxing to circa 500km, this drops to around 8,000 to 10,000km"* — a roughly 50% lifespan cut
from doubling the re-application interval on the SAME product. The underlying principle, stated
directly and load-bearing for wet-conditions riding specifically: *"Water is the great transport
medium to bring... abrasive contamination deep inside your chain... It is extremely important to
remember that pretty much whatever abrasive contamination the water brought into your chain &
lubricant is not going anywhere unless you remove it"* — i.e. after a wet ride, adding more
lubricant on top of a contaminated chain does not fix the problem; the contamination must be
physically reset (full solvent flush for a drip lube, or a re-wax for immersive wax — ZFC frames
the re-wax as strictly easier: "pop chain off and put into wax pot" vs. "flushing litres of
solvent through your chain"). *Confidence: confirmed (fetched, the same controlled test program
as DRV-54) for the category-comparison figures; the specific 15,000 km/8-10,000 km re-wax-interval
lifespan figures are the test operator's own stated modelling/extrapolation from block data, not
a single directly-measured full-lifespan run — labelled as the source's own synthesis, still a
confirmed-tier source, not community/aggregator.* Source: zerofrictioncycling.com.au "The best
lubricant in the world is......" + "Immersive Wax Vs Drip Lubricant contamination and wear
modelling" (both fetched), 2026-07-18.

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

## Chain-wear threshold — manufacturer figures vs. tool-maker guidance (closes a named gap)

**DRV-48 — SRAM's own published Eagle/T-Type replacement threshold is 0.8% elongation, a full
0.3 percentage points LOOSER than DRV-20's Park Tool-sourced 0.5% figure for 11-speed-or-more
chains — the two are genuinely different numbers from different tiers, not a rounding
difference, and a mechanic should follow the chain's own maker spec over the generic tool-maker
guidance where they conflict.** SRAM's support article states plainly: *"Replace the chain when
it reaches 0.8% on an approved chain checker"* (support.sram.com, "When should I replace my SRAM
Eagle chain?"), and SRAM's own Chains user manual repeats the identical figure for its general
chain line: *"Replace your chain at 0.8% elongation to maintain performance and limit wear to the
cassette and chainring."* This directly narrows DRV-20's caveat ("every drivetrain manufacturer
has their own specifications") with a real number: for the live catalog's `sram-eagle` and
`sram-transmission` systems specifically, 0.8% is SRAM's own bar, not Park Tool's blanket
11-speed-or-more 0.5%. **Shimano, by contrast, does not appear to publish an explicit percentage
figure at all** — Shimano's own TL-CN42 chain-wear-indicator product materials and its "How to
Check Your Chain Length" consumer article describe only a physical go/no-go action ("the teeth of
the chain gauge completely fall into the chain... then it is time to replace the chain") with no
stated elongation percentage; the widely-repeated "Shimano's threshold is ~0.5%" claim traces to
third-party tool comparisons (a Zero Friction Cycling product page, a bicycles.stackexchange
community answer) reverse-engineering the tool's physical dimensions, not a Shimano-published
number — so for `shimano-12`, DRV-20's 0.5% figure remains Park Tool-tier only, genuinely
unconfirmed at the manufacturer level despite a real, careful search. *Confidence: confirmed
(fetched SRAM support + user manual, direct quotes, two independent SRAM documents agreeing) for
the SRAM 0.8% figure; confirmed-absence (not merely unfetched) for a Shimano-published
percentage.* Source: support.sram.com article 5928711817755 ("When should I replace my SRAM
Eagle chain?") + docs.sram.com "Chains" user manual (models cn-xx-1-a1, fetched); bike.shimano.com
"How to Check Your Chain Length" (fetched, corroborating the no-percentage-stated pattern);
zerofrictioncycling.com.au Shimano TL-CN-42 product page + bicycles.stackexchange.com/questions/
81876 (community-tier, cited only for the reverse-engineered ~0.5% estimate, explicitly labelled
as such), 2026-07-18.

## SRAM AXS electronic service — pairing, firmware, battery (L2, closes a named 2026-07-18 gap)

**DRV-43 — AXS pairing is a physical button-press handshake done OUTSIDE the app, with a strict
primary-component-starts-and-ends structure; re-pairing is required on ANY component swap but
NOT on a mere battery swap.** SRAM's AXS Pairing Guide: pairing "is done using the physical
components, not in the AXS app." Each system has exactly one **primary** component (the
derailleur, in every drivetrain/Transmission case fetched) that starts and ends the session; all
others join as **secondary**. Procedure: (1) press-and-hold the primary's AXS button until its
LED blinks green *slowly*, release; (2) press-and-hold each secondary's AXS button until ITS LED
blinks green *quickly*, release — order among secondaries doesn't matter (except Pod controllers,
which SRAM calls out as position-order-sensitive via video, not text); (3) press-and-release the
primary's button to end the session, or let it time out after 30 seconds. **Any time a component
is added, removed, or inadvertently left out, the WHOLE pairing process must be repeated for every
component** — not just the changed one. By contrast, SRAM's Road AXS/XPLR user manual states
explicitly the pairing process does **not** need to be repeated when batteries are removed or
replaced — battery service and component service are different events with different consequences.
For two-controller setups (e.g. a Pod + a Reverb AXS dropper), whichever controller is paired
*first* becomes the default "right" controller in the app. *Confidence: confirmed (fetched SRAM
support + user manual, direct procedure).* Source: sram.com/en/learn/mountain/how-to-guides/
axs-pairing-guide (fetched); support.sram.com articles 6030638484507 ("How do I pair my AXS
components together?") + 13819504361371 ("How do I pair my SRAM Eagle AXS Transmission system?");
docs.sram.com "Road AXS and XPLR AXS" user manual (fetched), 2026-07-18.

**DRV-44 — AXS firmware updates run per-component, in the app, gated by a physical button press
distinct from pairing's press — mixing up press-and-hold (pairing) with press-and-release
(firmware) is the most likely mechanic error here.** SRAM's firmware-update procedure: wake the
primary component, select it in the AXS app, select "New Firmware Available" → "Install," then
**press the component's AXS button for two seconds or less** (a press-and-release, NOT the
press-and-hold used for pairing, DRV-43) to actually start the flash; the LED blinks rapidly
during install and the app/screen must not be exited mid-update. **Firmware must be checked and
installed on each individual component separately** — there is no fleet-wide "update all" action;
the mechanic repeats the whole select-component → check → install loop once per part in the
system. A pointed operational caution appears twice in SRAM's own text: **"if a component no
longer shifts or actuates following an AXS App interaction [including a firmware update],
complete the System Pairing process"** — i.e. a firmware update can silently break pairing, and
the fix is DRV-43's full re-pair, not a firmware re-flash. The Beta/Alpha firmware channel uses
an even more specific warning: a single press-and-release starts the beta install, and SRAM
explicitly warns **"Do NOT Press-and-Hold the AXS button to start the [beta firmware] update"**
— confirming the two gestures (hold=pairing, release=firmware) are a real, documented
distinction, not incidental UI language. *Confidence: confirmed (fetched SRAM support, direct
quotes).* Source: support.sram.com articles 6030691329307 ("How do I update firmware using the
AXS App?") + 6030678012187 ("How do I install firmware through the AXS Beta and Alpha
Programs?"), fetched 2026-07-18.

**DRV-45 — AXS battery status is a simple 3-state LED/app code, and a full charge takes about an
hour with a fast-enough 15-minute top-up to matter trailside.** Pressing a component's AXS button
for ≤2 seconds flashes its LED: **green = Good, red = Low, rapidly-flashing red = Critically Low**
(a red/green *alternating* flash is unrelated to battery — it signals a rejected shift). The AXS
app mirrors the same three states as a ring around the component icon. SRAM's own charge-time
figure: **"AXS Batteries charge from fully depleted to fully charged in approximately one hour"**,
and explicitly frames a partial top-up as trailhead-viable: *"a quick fifteen minutes on the
charger... might be all you need."* *Confidence: confirmed (fetched SRAM support, direct quote).*
Source: support.sram.com article 6030792022171 ("How do I check the battery levels of my AXS
components?"), fetched 2026-07-18.

## Freehub / driver-body internal service (L2, closes a named gap — DT Swiss Ratchet EXP)

**DRV-46 — DT Swiss Ratchet EXP freehub service is a genuine user/dealer-serviceable rebuild
(spacer → spring → ratchet → washer stack), gated by a strict thin-layer-only, ONE-specific-grease
rule — over-greasing causes the freehub to SLIP, not just run rough.** DT Swiss publishes three
tiers of its own documentation for this system — a **User Manual** (install/use only), a
**Technical Manual** (full maintain/spare-parts/technical-data reference), and a dedicated
**Maintenance Manual** (the freewheel-system rebuild procedure specifically) — a mechanic should
reach for the Maintenance Manual tier for this job, not the User Manual. The rebuild: remove end
caps → pull the freewheel body → the internal stack is spacer, spring, ratchet (loose), washer,
seated in that order in the freewheel body. DT Swiss's own DANGER-level warning: **"If too much
grease is applied on the ratchets, the actuation of the ratchets may not work. The ratchets may
slip during pedaling"** — the fix is a thin, even layer of the **red DT Swiss special grease
only** (a different, named-specific grease from the "DT Swiss universal grease" used elsewhere on
the same hub) brushed onto the ratchet teeth. Ratchets showing heavy wear are replaced immediately,
not serviced further — DT Swiss frames this as a binary (fine to keep running vs. replace outright),
no intermediate "worn but usable" guidance given. *Confidence: confirmed (fetched DT Swiss
technical/maintenance manuals, direct quotes).* Source: dtswiss.com Ratchet EXP Technical Manual
PDF (`MAN_HXD10000003111S_WEB_EN_001.pdf`, fetched) + Ratchet EXP Maintenance Manual (via
manualslib.com mirror of the same DT Swiss document, fetched), 2026-07-18.

**DRV-47 — DT Swiss's own Ratchet EXP maintenance interval is condition-dependent (annual vs.
quarterly), and warranty is explicitly conditioned on following it — a fact with real
recommendation weight, not just a service-tip.** DT Swiss's published maintenance-notice page:
*"Maintenance of our hubs is recommended annually when used under normal conditions, and every 3
months when used under extreme conditions (regular driving in dust, rain, snow or frequent
transport in the rain)... In case of problems caused by insufficient or no maintenance, we reserve
the right to refuse warranty claims."* Separately, DT Swiss's own trouble-shooting table names a
specific install-order failure that couples to axle torque (cross-reference
[`frame-standards-bearings.md`](frame-standards-bearings.md)'s thru-axle facts): **"Freewheel is
blocked"** can be caused by an internal spacer "compressed by overtightening the thru axle," with
a numeric field check — *"If the spacer is shorter than 10.7 mm, it must be replaced"* — i.e. an
over-torqued thru-axle can crush a freehub-internal part, a cross-component failure mode
independent of the axle's own torque spec. DT Swiss also separately documents a real, named
manufacturing defect on Ratchet EXP specifically (identifiable by a "0" or "9" digit in the
hub's production code): surface-finish variance on early-production ratchets causing premature
wear and engagement restriction, remedied by free inspection/service through a DT Swiss Service
Center — a confirmed, maker-acknowledged reliability issue, not a community rumor. *Confidence:
confirmed (fetched DT Swiss maintenance-notice page + maintenance manual troubleshooting table,
direct quotes).* Source: dtswiss.com/en/ratchet-exp-maintenance-notice (fetched) + DT Swiss
Ratchet EXP Maintenance Manual troubleshooting section (as DRV-46), 2026-07-18.

## SRAM Eagle Transmission — rebuild depth beyond install (L2, closes a named gap)

**DRV-49 — SRAM publishes a genuine Eagle Transmission SERVICE Manual, distinct from the
installation-focused User Manual DRV-32/33/34 already cite, with modular down-to-small-parts
rebuild kits and one real cross-tier compatibility rule: the cage assembly is universal, but the
skid plate/parallelogram/battery-lever are NOT.** SRAM's own rebuildability page states T-Type
derailleurs have "an unmatched level of rebuildability, with modular rebuild kits available down
to the smallest parts," and names the specific kits available per tier: Cage Assembly, Mounting
Bolt + Frame Sleeve, Cover/Skid Plate, Pulley Wheels, Setup Key/Cage Lock — with Eagle 90/70
(the cable-actuated Transmission tiers, DRV-50) additionally offering Inner/Outer Link, Bushing,
P-Knuckle, and (Eagle 90 only) B-Knuckle kits, a deeper individual-part rebuild than the AXS
tiers list. SRAM's own service-video descriptions state the cross-compatibility rule directly and
by exception: *"GX and S1000 parallelogram parts are NOT compatible with SRAM Transmission XXSL,
XX, and XO derailleurs"* and the same exclusion for skid plates and battery latches — **but**
*"The derailleur cage replacement and damper assembly are interchangeable between SRAM
Transmission XXSL, XX, X0, GX and S1000 derailleurs"* — i.e. the single most commonly serviced
part (cage, hit in a crash) is deliberately cross-tier compatible while the tier-specific
cosmetic/structural parts are not. This directly answers DRV-39's mechanical-Eagle finding (no
service manual exists for that family) by contrast: Transmission's genuinely different mounting
mechanism (DRV-32) comes with a genuinely different, real service-manual tier that mechanical
Eagle lacks. *Confidence: confirmed (fetched SRAM primary — rebuildability page + service-manual
table of contents + linked service videos' own on-screen compatibility callouts).* Source:
sram.com/en/learn/eagle-transmission-rebuildability (fetched); docs.sram.com Eagle Transmission
Service Manual (`5jblJ4SRpeHwjcuWG1vPy4`, "derailleur-service" section, fetched); SRAM TECH
YouTube "SRAM GX and S1000 Eagle Transmission Rear Derailleur Rebuild" +
"SRAM XXSL, XX, and XO Eagle Transmission Rear Derailleur Rebuild" (video descriptions, fetched);
support.sram.com article 13828179402267 ("How do I replace the cage assembly..."), 2026-07-18.

**DRV-50 — "Mechanical Transmission" (Eagle 70/90) is a THIRD family distinct from both "AXS
Transmission" (DRV-32) and "mechanical Eagle" (DRV-37) — a genuine naming trap for a mechanic
reading spec sheets casually.** SRAM's rebuildability page splits every Transmission derailleur
into an "AXS" tab and a "Mechanical" tab — the Mechanical tab covers Eagle 90 and Eagle 70, which
are cable-actuated (no battery/electronics) **but still use the hangerless Full Mount / UDH
direct-mount design** that defines Transmission (DRV-10's frame prerequisite, DRV-32's
Setup-Key/no-limit-screws mechanism) — they are NOT the conventional-hanger "mechanical Eagle"
family DRV-37/38 describe (SX/NX/GX/X01 mechanical derailleurs + the UDH Half Mount adapter
plate). A mechanic hearing "mechanical Eagle Transmission" needs to ask which of these two
genuinely different derailleur designs is meant — one bolts to a conventional hanger and adjusts
with H/L screws (DRV-37), the other direct-mounts around the axle with no hanger and no
limit-screw adjustment at all (Eagle 70/90, same as AXS Transmission per DRV-32) — sharing only
the word "mechanical." *Confidence: confirmed (fetched, SRAM's own AXS/Mechanical tab
structure directly implies the shared Full-Mount design for both Transmission tabs).* Source:
sram.com/en/learn/eagle-transmission-rebuildability (as DRV-49); cross-reference DRV-32/37.

## Chainline is physically set by a BB spacer stack, not a fixed crank spec (refines DRV-15)

**DRV-51 — Shimano's own crank/BB dealer manuals show chainline is actually set at install time
by choosing a spacer combination (0.7 mm / 1.8 mm / 2.5 mm) at the bottom bracket, not fixed by
the crank model alone — a real adjustment mechanism behind DRV-15's "chainline is real but not a
catalog rule" finding.** Multiple Shimano crank dealer manuals (DM-LAFC001, DM-GAFC001,
DM-RAFC010 — Cues/utility and step-through crank families) publish an explicit spacer-selection
table keyed to BB shell width (68/73 mm) and whether a chain case/chain device is fitted: a
2.5 mm spacer alone, or a combined 1.8 mm + 0.7 mm stack (**explicitly interchangeable with a
single 2.5 mm spacer** — "A 1.8 mm spacer and 0.7 mm spacer can be used together instead of a
2.5 mm spacer"), selects the axle's effective position in the shell and therefore the chainline,
before the crank arm and chainring are ever installed. This is the mechanical answer to DRV-15's
open question about chainline in non-nominal frames: chainline on a Shimano-spec build is not a
single fixed number stamped on the crank, it is a spacer-stack decision made at BB-install time,
which is also why a naive "chainring standard determines chainline" rule would be too simple even
before considering frame-side SuperBoost/Boost variance. *Confidence: confirmed (fetched Shimano
dealer manuals, direct spacer-table data); scope caveat: these specific manuals cover
Cues/utility-crank families, not the XT/XTR performance MTB cranks DRV-35/36 already source — a
future round should confirm whether XT/XTR press-fit/threaded BB families use an equivalent
spacer table (not checked this round).* Source: si.shimano.com DM-LAFC001-04 + DM-GAFC001-03 +
DM-RAFC010-02 (fetched); si.shimano.com SI-1L60A-003-ENG (chain-device spacer table,
corroborating), 2026-07-18. Cross-reference: DRV-15.

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
- **A freehub's internal spacer couples it to axle torque, not just to the cassette**
  (DRV-47) — an over-torqued thru-axle can compress a DT Swiss Ratchet EXP's internal
  spacer and block the freewheel, a cross-component failure the freehub's own spec sheet
  cannot predict in isolation.
- **Chainline is set by a BB spacer stack, not read off a crank spec sheet** (DRV-51) —
  which is part of why DRV-15's SuperBoost/Boost non-rule holds: the same crank can land
  at different chainlines depending on spacer choice at install, so a frame-standard-vs-
  crank-standard rule was always checking the wrong layer.

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
- **AXS pairing and AXS firmware updates use two different button gestures, and doing one
  can silently undo the other** (DRV-43/44): pairing is a press-and-HOLD per component, done
  outside the app; firmware install is a press-and-RELEASE, done inside the app — and SRAM's
  own text warns a firmware update (or any app interaction) can leave a component needing a
  full re-pair. A mechanic should always re-verify pairing as the last step after any
  firmware work, not assume it survived.
- **DT Swiss Ratchet EXP's freehub rebuild has an install-order-sensitive grease step**
  (DRV-46): grease goes on the ratchet teeth in a thin layer of ONE named grease before the
  spring/spacer/washer stack is closed up — too much (or the wrong) grease doesn't show up
  as a fit problem, it shows up as slipping under load, so the install order (clean → thin
  correct-grease layer → reassemble) is itself the fix, not a torque or tolerance spec.

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

## AXS cross-generation compatibility (closes a named master-tier gap)

**DRV-56 — SRAM states the AXS controller↔derailleur matrix is FULLY cross-compatible, in its
own words — this is the manufacturer-primary source behind the engine's one-system exemption
for electronic SRAM controllers.** SRAM's Rider Support article, verbatim: *"All AXS controllers
will work with all AXS derailleurs. So, you can use the new Eagle Transmission Pod Controllers
with Eagle AXS Drivetrain, or the Eagle Drivetrain controller with Eagle Transmission."* The
AXS Component Compatibility Map corroborates this structurally rather than by prose: it lists
**one shared System Controller table** (`EC-AXS-POD-D1`, `EC-AXS-PODU-D1`, `EC-AXS-PODR-D1`,
`EC-GX-AXS-A1`, `EC-AXS-ROCK-A1`, the `EC-BLIP-B1` wireless button, …) that serves *both* the
MTB rear-derailleur column and the Road rear-derailleur column — controllers are not segmented
by drivetrain family anywhere in the document. **Engine status: CONFIRMS a live rule, no
contradiction.** `compat.js`'s drivetrain one-system rule already exempts electronic SRAM
controllers from the one-system check while keeping them red on non-SRAM systems; that exemption
was previously carried on the project's own reading of SRAM's documentation, and is now pinned to
a fetched SRAM page plus the compatibility map that shows the same thing in table form.
*Confidence: confirmed (fetched manufacturer support article + fetched manufacturer compatibility
PDF, two independent SRAM documents agreeing).* Sources:
support.sram.com/hc/en-us/articles/13820865674011 (fetched via Bright Data — the host 403s
WebFetch) + sram.com/globalassets/document-hierarchy/compatibility-map/road/axs-components-compatibility-map.pdf
(GEN.0000000005877 Rev AC, © 2026 SRAM, fetched directly and text-extracted), 2026-07-18.

**DRV-57 — Eagle Transmission (T-Type) and Eagle Drivetrain are, as a family, NOT
backward-compatible — with exactly two documented exceptions, and the chainring exception is
DIRECTIONAL.** SRAM: *"No. Generally speaking, Eagle Transmission components are not backward
compatible with Eagle Drivetrain components."* The two stated exceptions: (1) **controllers**
(DRV-56), and (2) **chainrings, one direction only** — *"Eagle Transmission T-Type chainrings are
compatible with Eagle chains, so they can be used on Eagle Drivetrains when mounted to an Eagle
Transmission crankset. However, Non-T-Type Eagle Drivetrain chainrings are incompatible with
Eagle Transmission T-Type chains."* So: T-Type ring + Eagle chain = **fine**; non-T-Type ring +
T-Type chain = **incompatible**. **Engine status: CONFIRMS the live rule's direction, no
contradiction.** `compat.js`'s `chainring-standard` error fires only inside a T-Type-chain guard
and only when `crankset.ringStd !== 't-type'` — i.e. exactly the direction SRAM documents as
broken, staying silent on the reverse direction SRAM documents as fine. The rule was already
direction-aware; this is its manufacturer citation. *Confidence: confirmed (fetched manufacturer
support article).* Source: support.sram.com/hc/en-us/articles/13820865674011 (Bright Data),
2026-07-18. Cross-reference: DRV-56, DRV-58, DRV-59.

**DRV-58 — A T-Type cassette on an Eagle Drivetrain derailleur is not merely "won't index" — SRAM
documents it as causing physical interference and FRAME damage, and gives the geometric reason.**
SRAM: *"No. SRAM Eagle Transmission cassettes are designed, tested, and optimized for use with
T-Type components only. Transmission's unique Hangerless Interface places the T-Type cassette
farther outboard, utilizing space previously occupied by the Universal Derailleur Hanger.
Installation of an Eagle Transmission cassette on a bike with an Eagle Drivetrain derailleur will
lead to interference, binding, and damage to the frame and surrounding components."* The
mechanically load-bearing part is the **outboard cassette shift**: the hangerless interface
reclaims the UDH's axial space, so the T-Type stack does not sit where a hanger-mounted mech
expects it. **Engine status: already covered — no new rule needed.** The catalog models these as
distinct `system` values (`sram-transmission` vs `sram-eagle`), so the existing one-system rule
already raises a hard error on this pairing; this fact upgrades the *justification* for that
error from "different system" to a manufacturer-documented frame-damage mechanism, which is well
above the bar for keeping it an error. *Confidence: confirmed (fetched manufacturer support
article).* Source: support.sram.com/hc/en-us/articles/22387919584411 (Bright Data), 2026-07-18.
The reverse direction is separately documented and also negative: *"No. Eagle Transmission
Flattop chains have unique design features to optimize their use with the full X-Sync technology
of the Eagle Transmission cassette."* (support.sram.com/hc/en-us/articles/22387529286427, fetched).

**DRV-59 — Quick-link (PowerLock) interchangeability across SRAM chain families is a real,
manufacturer-documented failure mode driven by PIN LENGTH — not a fungible small part.** SRAM:
*"No. Each chain has a unique link shape and pin size. Eagle Drivetrain Chains and PowerLocks
have longer pins and if used on a T-Type chain they will have side-to-side movement. Using a
PowerLock meant for a different chain will lead to compromised functionality or failure."*
T-Type PowerLock part numbers are published: **00.2518.059.006** (black) and **00.2518.059.008**
(black PVD — physical vapor deposition, SRAM's stated reason being *"increased strength and
durability"*). This is a genuinely new dimension for the corpus: the catalog models chains but
not their quick-links, and a rider swapping a T-Type chain with a spare Eagle PowerLock has a
documented failure path. **Not a rule candidate** — quick-links are not a build slot and the
catalog carries no PowerLock rows; recorded as mechanic knowledge, not as an engine finding.
*Confidence: confirmed (fetched manufacturer support article, part numbers stated on-page).*
Source: support.sram.com/hc/en-us/articles/26180202731931 (Bright Data), 2026-07-18.

**DRV-60 — The AXS Component Compatibility Map is the authoritative, model-code-level
cassette-range and cross-family table, and it documents THREE intra-T-Type exceptions that a
naive "all T-Type parts interoperate" model would get wrong.** The map splits MTB into two
mechanical families with explicit min/max cog and cassette lists:
- **Eagle Drivetrain** (`RD-XX-1E-A1`, `RD-X0-1E-A1`, `RD-GX-1E-A1`, `RD-X-1E-A1`,
  `RD-S500-E-B1`) — max cog **50–52T**; cassettes 11-50 / 10-50 / 10-52 (`CS-PG-1230-A1`,
  `CS-PG-1210-A1/B1`, `CS-XG-1299-A#/B1/C1`, `CS-XG-1295-A#/B1`, `CS-XG-1275-A1/B1/C1`).
- **Eagle Transmission** (`RD-XX-SLE-B1`, `RD-XX-E-B1`, `RD-X0-E-B1`, `RD-GX-E-B1`,
  `RD-S1000-E-A1`, `RD-XX-DHE-A1`) — **52T max / 24T min**; cassettes 10-52 (`CS-XS-1299-A1`,
  `CS-XS-1297-A1`, `CS-XS-1295-A1`, `CS-XS-1275-A1`, `CS-XS-1270-A1`) and 11-24
  (`CS-XS-797-A1`, `CS-XS-797S-A1` — the DH cassettes).

The three exceptions **inside** the T-Type family, quoted from the map's own notes:
1. *"The RD-DH-A1 is not designed to be used with the XXSL chain."* — a T-Type mech that
   excludes one specific T-Type chain (`CN-TTYP-XXSL-A1`).
2. *"The FC-XX-DH-A1 55mm chainline version is compatible with all T-Type cassettes. The
   FC-XX-DH-A1 56.5mm chainline version is only compatible with the CS-XS-797S-A1 and
   CS-XS-797-A1 cassettes."* — the same crank part number in two chainline variants with
   *different* cassette compatibility.
3. *"The RD-XX-DHE-A1 is compatible with any T-Type crank and chainring with a 55 mm chainline."*
   — a derailleur whose compatibility is stated in terms of **chainline**, not system.

⚠ **Note for the coordinator (not a contradiction — a modelling limit).** Exceptions 2 and 3 are
real manufacturer-documented compatibility facts that the current schema **cannot express**:
`chainline` is explicitly a display-only field that never feeds `checkBuild`, and there is no
chain-level exclusion field. These cases are DH-specific (`RD-XX-DHE-A1`/`FC-XX-DH-A1`) and none
of those part numbers are in the catalog today, so nothing is mis-verdicting **now** — but if DH
T-Type parts are ever catalogued, a green verdict would be unearned on these three pairings.
Filed as a scope note for `MECHANIC-FINDINGS-INTAKE.md`, not a rule proposal.

The map also pins a real **firmware version gate**, the only hard version number SRAM publishes
in it: ANT+ head-unit functionality requires *"the RD firmware is 2.46.5 or greater and the AXS
App is iOS v 2.13.0 / Android v 2.10.1 or greater."* Note this is a **telemetry/head-unit**
threshold, not a shifting-compatibility threshold — SRAM documents no firmware version below
which AXS controllers and derailleurs stop shifting together, consistent with DRV-56's
unconditional cross-compatibility claim. *Confidence: confirmed (fetched manufacturer PDF,
GEN.0000000005877 Rev AC, © 2026 SRAM; every quoted note read from the extracted document text,
not a summary).* Source:
sram.com/globalassets/document-hierarchy/compatibility-map/road/axs-components-compatibility-map.pdf,
2026-07-18.

**DRV-61 — SRAM documents Eagle Transmission as compatible with Super Boost frames, via a DUB
Wide crank rather than a Super Boost crank — bearing directly on the deliberately-REJECTED
chainline rule.** SRAM: *"Yes. As long as your frame is compatible with the Hangerless Interface,
you will be able to use the Eagle Transmission DUB Wide cranksets instead of a Super Boost
crankset."* — directing the reader to the DUB MTB bottom-bracket compatibility chart's "MTB Wide"
crankset option for their frame's shell standard. **Engine status: SUPPORTS the existing decision
to NOT add a rule.** `CLAUDE.md`'s coverage roadmap records "Crankset chainline vs frame (Boost vs
SuperBoost)" as **REJECTED for now** on the grounds that a naive "SuperBoost frame needs a
SuperBoost crank" rule would fire a false error. This is manufacturer confirmation of exactly
that reasoning: SRAM's own answer to "Super Boost frame + Transmission?" is *yes, with a
non-SuperBoost crank*. The rejection stands, now on a fetched maker source rather than inference.
This partially addresses open question **DRV-15** (real-world behaviour of Boost-chainline cranks
in SuperBoost frames): it confirms the maker sanctions a non-SuperBoost crank in a SuperBoost
frame for this family, though it does not give per-frame chainline tolerances in general.
*Confidence: confirmed (fetched manufacturer support article).* Source:
support.sram.com/hc/en-us/articles/14257316183707 (Bright Data), 2026-07-18. Cross-reference:
DRV-15, and `CLAUDE.md` coverage-roadmap "REJECTED for now".

## Non-DT freehub internals (partially closes a named master-tier gap)

**DRV-62 — Industry Nine's pawl-and-drivering freehub architecture is now sourced at
manufacturer-primary tier from i9's own service guides, closing the i9 half of the "non-DT
freehub internals" gap for SERVICE depth.** From the Hydra2 and Torch hub-service guides
(i9's own documents), the mechanically load-bearing facts:
- **Architecture.** A pawl-and-drivering freehub (contrast DT Swiss's face-ratchet Star/EXP
  design already covered in this chapter): pawls live in **pawl pockets** in the freehub body,
  each backed by its own spring in a spring-hole, engaging a **drivering** pressed in the hub
  shell. The Torch guide names its drivering explicitly as a **"120 point drive ring."**
- **Service posture.** Both guides open with i9's stated design claim: *"Regular service and
  maintenance is simple and can be performed with basic tools readily available to the home or
  shop mechanic - no proprietary tools are required."* Pawls and springs *"easily slide out of
  the pawl and spring pockets"* by hand once the freehub is off — no press or special tool for
  the ratchet mechanism itself (unlike bearing work, which does need a press).
- **Lubrication is a documented SOUND/DRAG tuning choice, not just maintenance** — this is a
  genuine practitioner fact and i9 states both directions: *"Apply grease to drivering and pawls
  to quiet the freehub sound. Apply oil to drivering and pawls to increase the freehub sound."*
  The specified product family is **Dumonde Tech freehub grease/oil**; the assembly step is
  *"a few drops of Dumonde Tech Freehub Oil to the drivering, pawls, and freehub seal, as well as
  a thin film of grease to the axle."*
- **Endcap sealing uses a different lubricant class on purpose:** **marine (waterproof) grease**
  on the front face of the bearing seal before the endcap goes on, i9's stated reason being that
  it *"will create a membrane"* — a water-exclusion barrier, not a friction lubricant. Grease
  squeezing out at the endcap edges on assembly is documented as expected, not an error.
- **Bearing sizes are published per hubshell/freehub type** (metric cartridge codes, so
  cross-checkable at a bearing supplier). Hydra2: 15 mm Native Mountain Front 61903/61903;
  20 mm Native Mountain Front 61805/61805; MicroSpline freehub 152610 inboard / 31802 outboard;
  XD, HG, SS freehub 152610 inboard / 15267 outboard. Torch: 6-bolt Mountain Front 61804/61804;
  6-bolt Mountain Rear 61903 drive / 61804 non-drive; Center Lock Mountain Front 18307/18307;
  Center Lock Mountain Rear 61903/61903; Lefty Front 61902/61805; Torch XD/HG/MicroSpline
  freehub 31803 inboard / 61803 outboard. Bearings are directional in assembly — *"note grey side
  of bearing is designed to face outward."*
- **A caution worth carrying:** the Torch guide flags that *"any service requiring removal of the
  120 point drive ring"* is beyond routine service — the drivering is a pressed part, not a
  user-serviceable one, even though the pawls in front of it are.

*Confidence: confirmed (fetched manufacturer service PDFs, text-extracted). Fetch route worth
recording: industrynine.com's live PDF URLs return an HTML bot-wall page to `curl` and 403/429 to
WebFetch, and the Shopify product pages are JS-thin to Bright Data — but the **Wayback CDX index**
(`web.archive.org/cdx/search/cdx?url=industrynine.com/documents*`) lists i9's whole document
library, and the snapshots extract cleanly with `pdftotext`. This is the same Wayback-beats-the-wall
route that closed the Shimano DM-MBFC001-04 gap in round 2.* Sources:
web.archive.org snapshot of industrynine.com/documents/hydra2-service-guide.pdf (snapshot
20250405140045) + industrynine.com/documents/torchservice_dec22.pdf (snapshot 20240410150726),
2026-07-18. Cross-reference: WHL-44, WHL-45 (the same document set's wheel-building and
bearing-preload content, filed in `wheels-tires.md`).

**DRV-63 — NOT ESTABLISHED at primary tier: Industry Nine Hydra's headline "690 points of
engagement" figure.** The 690-POE/0.52° claim is repeated consistently across retailers, reviews
and search summaries, and i9's own *Torch* service guide does pin that family at a "120 point
drive ring" (DRV-62) — but **no fetched i9 page or PDF stating 690 for Hydra was obtained this
round**: the live product/tech pages are Shopify JS-rendered (Bright Data returned the nav shell
with no spec text), `industrynine.com/pages/hydra` has **no Wayback snapshot at all**, and the
archived Hydra document set is exploded-view diagrams and service steps that describe the
mechanism without quoting an engagement count. Per corpus rule 2 (*search-result summaries lie*)
and rule 6 (*silence beats a confident wrong fact*), the figure is **recorded as unestablished
rather than asserted**. This is an *unfetched* gap, not a source-exhausted one — a future round
with a rendering fetch (or an i9 print catalogue snapshot, several of which are in the Wayback
index) would likely close it. *Confidence: not established.* Attempted 2026-07-18.

---

## Chain width — the 11/12-speed tolerance question (master round 2)

**DRV-64 [closes the DRV-26 "11/12-speed not established" flag at the standards level] — All
9-, 10-, 11- and 12-speed derailleur chains share ONE internal-width class; the speed count
changes the OUTER width, not the roller/inner width.** KMC — a chain manufacturer supplying
Shimano-, SRAM- and Campagnolo-compatible chains — publishes three internal-width classes on its
own glossary, all sharing the universal 1/2" pitch (*"The pitch … is the same for all common
chains with 1/2""*):

| Class | Designation | Published outer-width range | Applies to | Max sprocket/ring tooth thickness |
|---|---|---|---|---|
| Wide | 1/2" × 1/8" | 8–10 mm | single-speed / internally-geared only | 3 mm |
| Narrow | 1/2" × 3/32" | 7.0–7.8 mm | single-speed **and** derailleur up to 8-speed | ~2–2.3 mm |
| Super narrow | 1/2" × 11/128" | **5.2–6.6 mm** | **9-, 10-, 11- and 12-speed** | **1.9 mm** |

The mechanically load-bearing consequence: **an 11-speed and a 12-speed chain are in the same
internal-width class.** They engage the same roller geometry; what differs is the outer plate
width, which is what has to pass *between adjacent sprockets*. So the DRV-26 direction-asymmetry
(narrower-than-nominal runs; wider-than-nominal jams) is now sourced as a **clearance** problem
across 9–12, not an engagement problem — which is exactly the shape DRV-26 predicted but could
not source above ~10-speed. *Confidence: confirmed (fetched manufacturer glossary).* Source:
kmcchain.eu/service/glossary (fetched 2026-07-18). Cross-reference: DRV-12, DRV-13, DRV-25,
DRV-26.

**DRV-65 [supports the engine's `ss-chain-width` 1/8-vs-3/32 classes] — KMC's class table
independently corroborates the two width classes the schema encodes for single-speed, and
scopes them.** The schema's `chainWidth` vocabulary (`1/8` / `3/32`) matches KMC's two
non-super-narrow classes exactly. KMC additionally scopes them: **1/8" is single-speed/IGH
*only***, while **3/32" covers single-speed *and* derailleur systems up to 8-speed**. That
asymmetry means the two values are not simply "BMX vs DJ" — a 3/32" single-speed drivetrain uses
a width class shared with geared drivetrains, whereas 1/8" is genuinely single-speed-only. **No
contradiction with the engine**: `ss-chain-width` fires only when ring/cog/chain disagree, which
this source supports. *Confidence: confirmed.* Source: kmcchain.eu/service/glossary (fetched
2026-07-18). Cross-reference: DRV-12, DRV-13; engine rule `ss-chain-width`.

**DRV-66 — Chain makers scope each chain SKU to a speed count even within the shared
super-narrow class — the compatibility statement is per-SKU, not per-class.** KMC's own product
pages state scope in compatibility prose rather than millimetres: the X11 is *"1/2"x11/128" |
Compatibility: SHIMANO, Campagnolo and SRAM 11 speed drivetrain systems | 1x11, 2x11, 3x11"*,
and the X12 is *"1/2"x11/128""* with *"Compatibility : SHIMANO, SRAM and all other 12 speed
drivetrains | 1x12 ; 2x12"*. Both carry the identical size designation and different stated
compatibility. **Reading for the corpus:** the size designation does *not* establish
interchangeability; the manufacturer's per-SKU compatibility line governs. This is why DRV-26's
"one step narrower rarely presents a problem" must stay a **historical, lower-tier** observation
and must not be promoted into an engine allowance for 11↔12 substitution. *Confidence: confirmed
(fetched manufacturer product pages); note KMC publishes no per-SKU millimetre width — the mm
figures exist only as the class range in DRV-64.* Source:
kmcchain.com/en/product/bicycle-chain-x11-11-speed and
kmcchain.com/en/product/bicycle-chain-x12-12-speed (both fetched 2026-07-18).

**DRV-67 [L2 install fact] — Shimano 11- and 12-speed chains are DIRECTIONAL and both dealer
manuals mandate orientation; neither manual publishes any width dimension.** Shimano's 12-speed
chain dealer manual (CN-M9100 / M8100 / M7100 / M6100) states the chain *"has a front side and a
reverse side and must be fitted in the correct orientation"*, the front being the marked outer
side. The 11-speed manual carries the same requirement for CN-HG901-11 / HG900-11 / HG701-11 /
HG700-11 / HG601-11 / HG600-11 / E8000-11: *"these have a forward side and a reverse side and
must be fitted in the correct orientation."* (The same manual also restricts CN-E8000-11 to
single front chainrings.) **Source-exhaustion declaration:** both manuals were read end-to-end
after text extraction and **neither contains a chain width, pin length, or any dimensional
table** — Shimano documents orientation and tooling, not chain geometry. Shimano is therefore
*exhausted* as a source for the mm-level 11/12 width question; DRV-64's KMC class table is the
best manufacturer-tier figure obtainable. *Confidence: confirmed.* Source: si.shimano.com
DM-MACN001-07-ENG (12-speed) and DM-CN0001-07-ENG (11-speed), both fetched 2026-07-18 **via
Wayback** (`web.archive.org/web/…if_/…`) — si.shimano.com serves an Akamai 403 to WebFetch, curl
*and* Bright Data's Web Unlocker (which returns a corrupted binary for PDFs); the Wayback `if_`
raw-content route is the working method for si.shimano.com PDFs and is the reusable technique
from this round.

---

## Single-speed chain width — the severity question settled (round 3, 2026-07-21)

**DRV-68 [UPGRADES DRV-12 from community tier to MANUFACTURER tier, and gives DRV-13's
direction asymmetry a dimensional mechanism] — KMC states the ring/cog/chain width match as a
compatibility requirement in its own words, and publishes the mating TOOTH THICKNESS for each
width class.** DRV-12 recorded the ring/cog/chain width-match rule at *medium* confidence
because *"no maker publishes chain/sprocket width-tolerance bulletins."* That is no longer
true — KMC's glossary publishes both the requirement and the numbers, re-fetched verbatim this
round:

- **The requirement, in KMC's own words:** *"When choosing a chain, the chain width (1/8",
  3/32", 11/128") and the thickness of the chainring and sprocket must always match."* And
  again on the Sprocket entry: *"The thickness of the sprocket and the dimensions of the chain
  (wide 1/8", narrow 3/32" or super narrow 11/128") must be matched."*
- **Wide (1/2 × 1/8"):** *"only for single speed/internal geared bikes"*, overall width
  8–10 mm — *"Matching chainrings and sprockets have **3 mm** tooth thickness."*
- **Narrow (1/2 × 3/32"):** single-speed **and** derailleur to 8-speed, width 7.0–7.8 mm —
  *"Matching chainrings and sprockets have approx. **2 – 2.3 mm** tooth thickness."*
- **Super narrow (1/2 × 11/128"):** 9–12 speed, width 5.2–6.6 mm — *"Chainrings and sprockets
  must not exceed **1.9 mm** thickness **in order to fit into the chain's inner links**."*

**The mechanism DRV-13 was missing.** That last clause names the failure as *fitting into the
inner links* — an interference between sprocket thickness and the chain's internal width. Apply
it across the two single-speed classes and the asymmetry falls out of the numbers:
- **1/8" chain on 3/32" sprockets** (chain sized for 3 mm teeth, given 2–2.3 mm teeth): the
  sprocket is *thinner* than the chain expects. Nothing interferes; the chain sits with side
  play. This is exactly the direction DRV-13's community reports call *"side play / not ideal"*
  and riders tolerate for months.
- **3/32" chain on 1/8" sprockets** (chain sized for ~2–2.3 mm teeth, given 3 mm teeth): the
  sprocket is *thicker* than the chain's inner-link gap. This is the direction DRV-13's reports
  associate with chain-retention trouble, and KMC's clause explains why.

**Severity reading — deliberately NOT a hardening recommendation.** The engine's `ss-chain-width`
warning tier is now **manufacturer-backed rather than provisional**, and the maker's phrasing
("must always match") supports keeping it firing in both directions. But it should stay a
**warning, not an error**, for two honest reasons: KMC's tooth figures are *class ranges* with
its own hedge (*"approx. 2 – 2.3 mm"*), not per-SKU dimensions, and the real-world reports in
DRV-13 describe a *retention/wear* failure, not a part that cannot be installed. Per
`MECHANIC-FINDINGS-INTAKE.md` §2 a hard red needs a document saying it will not fit; KMC's says
it will not *match*. *Confidence: confirmed (fetched manufacturer glossary) for the requirement
and the tooth-thickness figures; the direction reading is confirmed-mechanism applied to
medium-tier field reports, so it inherits their tier.* Source: kmcchain.eu/service/glossary
(re-fetched 2026-07-21; same page as DRV-64/65, mined for a different table this round).
Cross-reference: DRV-12, DRV-13, DRV-64, DRV-65; engine rule `ss-chain-width` (MTB) /
`bmx-chain-pitch` (BMX).

---

## Gaps

- **CLOSED 2026-07-18 master round (DRV-56–61) — AXS cross-generation compatibility, the
  gap this chapter carried as its headline master-tier remainder.** Sourced from SRAM's own
  documents at two independent levels: five Rider Support articles (fetched via Bright Data —
  support.sram.com 403s WebFetch) and the **AXS Component Compatibility Map PDF**
  (GEN.0000000005877 Rev AC, © 2026 SRAM, fetched directly from sram.com and text-extracted).
  What landed: the verbatim controller-universality statement behind the engine's electronic-SRAM
  one-system exemption (DRV-56); the Transmission↔Eagle-Drivetrain non-backward-compatibility
  rule with its two exceptions and the DIRECTIONAL chainring asymmetry that confirms
  `chainring-standard`'s existing direction-awareness (DRV-57); the frame-damage mechanism behind
  the T-Type-cassette-on-Eagle-mech error, i.e. the hangerless interface's outboard cassette
  placement (DRV-58); PowerLock pin-length non-interchangeability with published part numbers
  (DRV-59); the model-code-level cassette-range table plus **three intra-T-Type exceptions**
  (DRV-60); and manufacturer confirmation that Transmission works on Super Boost frames via a
  DUB Wide crank, which independently supports keeping the chainline rule REJECTED (DRV-61).
  **Three engine rules gained manufacturer citations and NONE were contradicted.**
  **A real finding for the coordinator, filed in DRV-60:** two of the three intra-T-Type
  exceptions are stated in terms of **chainline**, which the schema explicitly cannot use for
  verdicts (`chainline` is display-only), and one is a chain-level exclusion the schema has no
  field for. No live mis-verdict today — the affected part numbers (`RD-XX-DHE-A1`,
  `FC-XX-DH-A1`, `CN-TTYP-XXSL-A1`) are all absent from the catalog — but it is a known
  unearned-green if DH T-Type parts are ever catalogued.
  **Honest remainder on this gap:** SRAM publishes **no shifting-compatibility firmware floor**
  at all. The only hard version numbers in the compatibility map are a *telemetry* threshold
  (RD firmware 2.46.5 / AXS app iOS 2.13.0 / Android 2.10.1 for ANT+ head units). Per-derailleur
  firmware *changelogs* (e.g. the MicroAdjust and cassette-mapping firmware releases) exist as
  individual support articles but were not individually mined this round — a narrow, specific
  follow-up, not a broad gap. The load-bearing compatibility question ("does controller
  generation X drive derailleur generation Y") is **answered and closed**: unconditionally yes,
  within AXS.
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
- **CLOSED 2026-07-18 (DRV-48) — chain-wear tolerance cross-checked against SRAM's own
  published %.** SRAM's own support article + Chains user manual both give **0.8%** for
  Eagle/T-Type — a real, confirmed number, and looser than DRV-20's Park Tool-sourced
  0.5% blanket figure for 11-speed-or-more chains. **Still genuinely open: Shimano
  publishes no percentage at all** (confirmed absence, not unfetched) — the ~0.5%
  commonly cited for Shimano is a third-party reverse-engineering of the TL-CN42 tool's
  dimensions, not a Shimano number. A future round could try si.shimano.com dealer
  manuals specifically for the CN0001/CN0002 chain family (fetched for DRV-48 but the
  numeric spec wasn't found there either) before concluding it's unpublished for good.
- **CLOSED 2026-07-18 (DRV-43–45) — AXS pairing/firmware/battery-service facts.** The
  pairing handshake (primary/secondary structure, hold-vs-release button distinction,
  when re-pairing is/isn't required), the firmware-update procedure (per-component, the
  "if it stops shifting after an app interaction, re-pair" caution), and battery LED/app
  status codes + charge time are now sourced directly from SRAM support + the Road
  AXS/XPLR user manual. **Still open:** firmware-update *compatibility* across derailleur
  generations (e.g. does an old Eagle AXS mech need a firmware floor to pair with a new
  Pod controller) — no cross-generation compatibility table fetched this round; treat as
  a narrower residual L2 gap, not the original broad one.
- **CLOSED 2026-07-18 (DRV-46/47) — DT Swiss Ratchet EXP freehub internal service**,
  closing the freehub/driver-body internals slice of this gap for DT Swiss specifically:
  the spacer/spring/ratchet rebuild stack, the grease-type-and-amount warning (wrong
  grease or too much = slip, not just noise), the annual/quarterly maintenance-interval
  + warranty conditioning, and a documented manufacturing defect (production-code-
  identifiable early Ratchet EXP surface-finish wear issue). **Still open: Shimano
  MicroSpline/HG freehub internals and Hope/Industry Nine pawl-hub service** — this
  round covered DT Swiss only (the brand with the most complete public technical/
  maintenance-manual tier); other brands' freehub rebuild depth remains an L2 gap.
  **— UPDATE, PARTIALLY CLOSED 2026-07-18 (DRV-62): the Industry Nine half is now done at
  manufacturer-primary tier** (Hydra2 + Torch service guides: pawl/spring pocket architecture,
  the named "120 point drive ring", per-hubshell bearing-size tables, the grease-vs-oil
  freehub-sound tuning choice, marine-grease endcap sealing, and the pressed-drivering
  service boundary), via the Wayback CDX route now documented in DRV-62. This also gives the
  corpus its first **pawl-and-drivering** freehub architecture to set against DT Swiss's
  face-ratchet design, which was the mechanically interesting part of the gap.
  **Genuinely still open: Shimano MicroSpline/HG freehub internals and Hope pawl-hub
  service** — neither attempted this round (the round's fetch budget went to the SRAM AXS
  cross-generation gap and the i9 document library). Both remain *unfetched*, NOT
  source-exhausted: Shimano's si.shimano.com dealer manuals are known-reachable via the
  Wayback route (DRV-35/36 precedent) and Hope publishes technical documents, so a future
  round should treat these as live leads rather than walls. **Also open and now confirmed as a
  specific miss rather than a vague one: the Hydra "690 points of engagement" figure is
  NOT ESTABLISHED at primary tier — see DRV-63** for exactly what was tried and what the
  remaining lead is (i9 print-catalogue snapshots in the Wayback index).
- **CLOSED 2026-07-18 master round 2 (DRV-64–67) — the 11/12-speed chain-width tolerance
  question, which DRV-26 had explicitly flagged "not established".** Closed at the level the
  sources actually support, and no further: KMC's manufacturer glossary establishes that
  **9-, 10-, 11- and 12-speed chains all share the 1/2"×11/128" internal-width class (outer
  range 5.2–6.6 mm, max tooth thickness 1.9 mm)**, so cross-speed substitution is a *clearance*
  question between adjacent sprockets, not a roller-engagement one (DRV-64) — the shape DRV-26
  predicted but could not source above ~10-speed. KMC's class table also independently
  corroborates the schema's `chainWidth` 1/8-vs-3/32 vocabulary and scopes it (1/8" is
  single-speed/IGH-only; 3/32" spans single-speed *and* ≤8-speed derailleur) — **DRV-65,
  supporting `ss-chain-width` with no contradiction.** DRV-66 records the limiting finding:
  KMC's X11 and X12 carry the **identical** size designation but **different** stated
  compatibility, so the designation does not establish interchangeability and DRV-26's
  "one step narrower" observation must stay historical/lower-tier — **it must not be promoted
  into an engine allowance for 11↔12 substitution.**
  **Source-exhaustion declaration (Shimano):** both Shimano chain dealer manuals (12-speed
  DM-MACN001-07, 11-speed DM-CN0001-07) were extracted and read in full; **neither publishes any
  chain width, pin length, or dimensional table at all** — Shimano documents orientation and
  tooling only (DRV-67 captures the directional-fitting mandate it *does* state). Shimano is
  exhausted for mm-level chain geometry. **Remaining EXTERNAL:** no manufacturer publishes a
  per-SKU outer width in mm for 11- vs 12-speed chains, and no maker publishes a cross-speed
  substitution *tolerance*; a definitive mm figure would require physical measurement, which is
  outside this corpus's fetched-source bar. Recorded as external rather than estimated.
- **CLOSED 2026-07-18 (DRV-41/42), this chapter's named round-4 pickup point — Zero Friction
  Cycling's own PDFs are fetched directly and mined.** The prior round's "image-based, no OCR
  text layer" diagnosis was a WebFetch-specific false negative — a direct `curl` download +
  `pdftotext` extracts real text from all four ZFC PDFs (the two DRV-40 named, plus
  `chainlongevitypg1.pdf` and the "consol v3" data page; no "v4" exists). Per-model km-to-0.5%-
  wear figures (chart bar-heights, read from a rendered page image) now replace DRV-40's
  one-hop componentry.app citation for the specific chains DRV-41 names, WITH the load-bearing
  caveat DRV-40 lacked: ZFC's control lubricant is deliberately the worst-tested one (55th/55),
  so every figure is a worst-case-lubricant bench-rig baseline, not a real-world number — this
  is *why* the ZFC chart's thousands-of-km figures don't contradict DRV-40's 800-1,200 km
  real-world MTB range (different test conditions, not competing claims). DRV-42 adds the
  metallurgical cause of SRAM Eagle's XX1/XO1-vs-GX/NX gap (HARDCHROME plating, Vickers-hardness
  sourced). **CLOSED 2026-07-18 (DRV-52/53) — the cassette/ring wear-cycle survival curve.**
  Named SRAM (Chris McKenney) and Shimano (Ben Hillsdon) representatives confirm the real
  chain:cassette:chainring wear-life ratio (cassette survives ~2–4 on-time chain changes,
  chainrings a further 2–4× that) and the field diagnostic each maker recommends (fresh-chain
  skip test for cassettes, shark-fin tooth shape + chain-suck for chainrings); a controlled
  Friction Facts/CeramicSpeed lab test separately quantifies WHY the chain (not the ring/cog)
  is the thing to watch — chain elongation costs ~2.02 W per 1% at 250 W, while old-vs-new
  ring/cog only costs 0.10–0.33 W, an order of magnitude smaller effect. **L3 gap closed** — a
  km-specific number stays aggregator-tier by the makers' own admission (too many variables), but
  the ratio-and-mechanism claim is now manufacturer-confirmed, not just community-inferred.
- **CLOSED 2026-07-18 (DRV-54/55) — lubrication chemistry.** A controlled multi-thousand-km
  test program (Zero Friction Cycling) sources the four-category taxonomy (wet drip / dry drip /
  wax-emulsion drip / immersive solid wax) and the shedding-vs-non-shedding mechanical
  distinction, plus quantified figures: immersive waxing tests at 3–5× the lifespan of a decent
  drip lube and ~10× lower wear than top wet drips under dry-dust contamination, and the
  re-application interval itself materially changes chain lifespan (300 km vs 500 km re-wax
  intervals: ~15,000 km vs ~8,000–10,000 km chain life on the same product) — closing the named
  L3 gap with a real, quantified mechanism rather than "wax is better" folklore.
- DRV-18's capacity-conservative claim is community-tier only; **no manufacturer
  document confirms a specific over-capacity/over-max-cog safety margin** — stays an
  open question, not a modelling candidate, until sourced at confirmed tier.
- No **BB30/PF30/press-fit crank-spindle press-tolerance depth**, no **spoke/wheel-build
  wear-adjacent drivetrain science** — **L3 gap** (out of this chapter's core scope but
  noted since crank/BB touches both `drivetrain.md` and
  `frame-standards-bearings.md`).
- **CLOSED 2026-07-18 (DRV-49/50) — SRAM Eagle Transmission full-mount rebuild/service
  depth beyond install torque.** A genuine SRAM Service Manual (distinct from the
  install-focused User Manual DRV-32-34 already source) is now cited, with the real
  cross-tier compatibility rule (cage assembly universal, skid-plate/parallelogram/
  battery-lever tier-locked) and the "Mechanical Transmission" (Eagle 70/90) naming trap
  vs. "mechanical Eagle" (DRV-37) resolved. **Partially closed (DRV-51) — chainline is
  now sourced as a real spacer-stack adjustment mechanism** for Shimano Cues/utility
  crank families; **still open: whether XT/XTR performance MTB cranks (DRV-35/36) use an
  equivalent spacer-selection table** — not checked this round, a narrow, specific
  follow-up rather than a broad chainline-service gap.

## Open mechanic questions (for the human review — do not act)
- DRV-8: does a missed b-gap reset on a cassette swap earn a warning, or is it routine install?
- DRV-7: does anyone run big-capacity mechs on small (below-minimum) cassettes, and does it
  shift acceptably — worth modelling or noise?
- DRV-13 [now MANUFACTURER-BACKED by DRV-68, 2026-07-21 — the question is narrower, not
  answered]: KMC's published per-class tooth thicknesses (1/8" ↔ 3 mm, 3/32" ↔ 2–2.3 mm) supply
  the interference mechanism for the asymmetry, so "wide-on-narrow tolerated, narrow-on-wide
  flagged" now has a dimensional basis rather than only forum reports. **The remaining question
  is a shop-judgment one:** would you fit a 3/32" chain to a 1/8" cog and send a customer out on
  it (→ keep one warning both directions), or is that a refuse-to-build (→ direction-aware, red
  one way)? The corpus recommends keeping the single warning tier absent a maker document that
  says it will not fit.
- DRV-15: real-world behaviour of Boost-chainline cranks in SuperBoost frames.
- DRV-18: is there ANY manufacturer document (not just community/forum consensus) that
  states an explicit safety margin above published max-cog/capacity ratings? Without one
  this stays community tier only and cannot inform the DRV-7 minimum-cog question beyond
  "informative."
- DRV-26: does the historical narrower-chain-tolerated / wider-chain-jams pattern hold
  at 11/12-speed, or has narrow-chain tolerance collapsed at today's tooth spacing? No
  source found either way — needs a dedicated fetch, not an inference.
