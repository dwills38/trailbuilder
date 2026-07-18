# Frame Standards & Bearings — Mechanic Corpus

**Maturity: foundation** (L1 — see [`CURRICULUM.md`](CURRICULUM.md); a prior round added L1
BB-shell/headset identification, threading-direction, UDH-history and creak-diagnosis
literacy. **This round opened L3** with real numeric press-fit interference specs (BB shell
bore tolerance, Chris King headset cup interference) and manufacturer-quoted coverage of the
BB30/PF30 tolerance-stack dispute (FRM-28–33) — but L2's fastener torque table is still
untouched and most L3 targets (wheel-building, brand-specific service internals, BMX bearing
matrix) remain open, so the chapter stays `foundation` overall, see "## Gaps").

BB shells · crank spindles · bottom brackets · headset / S.H.I.S. · UDH · frame axle &
clearance · dropout type / single-speed tension · (BMX shells, spindles, crank pieces).
Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline, conventions).

Fact IDs are stable and append-only (`FRM-n`). Confidence is the source's own grading.

---

## Bottom bracket: shell × spindle

**FRM-1 — BB is a real shell×spindle exact-match check once a BB part is picked; advisory when
none is.** The `bb` part carries `shell` (frame standard) + `spindle` (crank interface); both
are exact-match error checks against `frame.bb` and `crankset.bb` once a BB is chosen. With no
BB picked, an info names the spindle + shell and says "BB sold separately." Nothing is blocked
until a BB is present. *Confidence: confirmed (rule 7 build-out).* Source:
EXPERT-REVIEW-DOSSIER.md §7. Engine: rule 7 (`bb-advisory` + the BB exact checks).

**FRM-2 — BSA68 ≡ BSA73 (same threaded standard, two shell widths).** BSA68 and BSA73 share
bearing/cup interfaces — they are the same threaded standard at two widths. The engine was
false-erroring a BB whose `mfgPn` matched the frame's shell purely because the two vocab tokens
differed; fixed to treat BSA68/BSA73 as one compatible thread family. **BSA83 and the press-fit
shells (PF92/PF107/T47) remain exact-match.** *Confidence: confirmed (false-positive fix).*
Source: EXPERT-REVIEW-DOSSIER.md Appendix C2. Open mechanic question: any real case where a
68 mm vs 73 mm BSA shell genuinely needs different BBs (frame-specific spindle length, not the
shell standard)? None found in sourcing.

**FRM-3 — The tightest common pair (30 mm spindle in a BB92/BB86 press-fit shell) IS servable.**
Wheels Mfg's BB86-to-30mm product page: *"Compatible with 30mm diameter spindles and frames
with the following Bottom Bracket Standards (41mm ID BB shell): BB86, BB92, PF24, PF90…"* using
**Enduro Dual-Row ABEC-3** bearings, with the restriction *"Crankset spindle length must be
longer than 104mm when used in a 86.5mm wide BB shell."* So a real warning there would be FALSE —
it's servable, though bearing-life-constrained (the dual-row small-ball design exists because a
30 mm spindle in a 41 mm bore leaves minimal radial space). Also confirmed: **30 mm in PF92 is
servable** (Hope PF41 BB92 30 mm, fetched hopetech.com). *Confidence: medium-high (fetched).*
Source: wheelsmfg.com BB86-to-30mm page + hopetech.com, via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §7;
EXPERT-REVIEW-DOSSIER.md §7. Open mechanic question: which spindle×shell pairs do you actively
talk customers out of (short bearing life)? Any pair you've been unable to source a BB for?

**FRM-4 — Spindle-interface vocab mapping (a data-entry trap).** Map the maker's wording to the
spindle interface, not a brand name: "24mm steel spindle" / Hollowtech II / Cinch steel →
`24mm`; "30mm spindle" (eeWings, Cinch alu, Hope) → `30mm` (note **DUB = 28.99 mm ≠ 30 mm** — do
not conflate); e*thirteen → `p3`. *Confidence: convention.* Source: tools/DATA-ENTRY-TEMPLATE.md
§4.

**FRM-18 — BB shell/bore identification: threaded standards name the SHELL, press-fit standards
name the BORE.** Threaded: English/BSA (1.37″ x 24 tpi, ≈34.8 mm — the 68 mm/73 mm widths FRM-2
already treats as one thread family), Italian (36 mm x 24 tpi, 35 mm shell ID), T47 (47 mm x
1.0 mm, shell widths 68–83 mm — a modern *threaded*-oversized standard). Press-fit standards are
named by the shell BORE, not spindle or shell width — Park Tool: the bore "is the only consistent
and most important part of the press fit system." **PF41** (nominal 41 mm bore) covers
BB86/BB89.5/BB92/BB107/BB121/BB132/PF24/"Shimano Press-Fit"; **PF42** (42 mm bore) covers
BB30/BB30a/BB30ai/BBright Direct Fit; **PF46** (46 mm bore, 68–86 mm shell widths) covers
PF30/PF30a/PF30ai/BB386EVO/OSBB/BBright Press Fit; Trek's proprietary **BB90/BB95** is not a
plain bore at all — an internal bearing retainer built into the shell (like an integrated
headset), 37 mm bearing OD. *Confidence: confirmed (fetched).* Source: parktool.com "Bottom
Bracket Standards and Terminology" (fetched via WebFetch + corroborated via Exa search).

**FRM-19 — Threaded BB drive-side handedness is a self-tightening design choice, and Italian
breaks the pattern.** English/BSA and T47 both thread the non-drive (left) cup right-hand,
tightening clockwise, and the drive (right) cup **left-hand** ("reverse"), tightening
counterclockwise — pedaling load tends to tighten a reverse-threaded drive cup rather than
loosen it. Italian threads **both** cups right-hand, so the drive-side cup has no
self-tightening protection; Park Tool documents Italian (and French) as "prone to problems due
to the right-threaded fixed cup, which tends to unscrew itself in use," independently
corroborated by Sheldon Brown's crib sheet. The underlying mechanism (Jobst Brandt, hosted on
sheldonbrown.com): a bearing under a rotating/partial-rotating load precesses in the direction
that unscrews a right-hand thread, so the reverse-thread convention exists specifically to
counteract it on the side that carries the rotating chain-tension load. *Confidence: confirmed
(two independently fetched sources agree, includes a direct quote).* Source: parktool.com
"Bottom Bracket Standards and Terminology"; sheldonbrown.com "Threaded Bicycle Bottom Bracket
Crib Sheet" + "Left Hand Threads on Bicycles" by Jobst Brandt (via Exa fetch).

**FRM-20 — Similar-looking threaded BB shells are NOT interchangeable — a wrong-standard cup
fails by falling through or refusing to start.** Sheldon Brown's cross-compatibility table: a
British/ISO cup dropped into an Italian shell "falls through" (Italian bore is larger); an
Italian cup in a British shell "usually won't start" (too large), and even forced, the
drive-side thread direction is opposite (FRM-19). French and Swiss shells share identical thread
dimensions with each other (35 mm x 1 mm) but differ in drive-side handedness — French is
right-hand/self-loosening like Italian, Swiss is left-hand/self-tightening like English —
despite an identical bore, so "it threads a little" is not sufficient confirmation of the right
standard. *Confidence: confirmed (fetched primary reference table).* Source: sheldonbrown.com
"Numbers - Bicycle Crib Sheet" + "Threaded Bicycle Bottom Bracket Crib Sheet" (via Exa fetch).

## Headset / S.H.I.S.

**FRM-5 — Headset steerer acceptance vs fork = exact-match error (rule-11 semantics on the
headset side).** Once a headset part exists, its `steerer` must match the fork's steerer exactly
— the same check rule 11 runs frame-vs-fork. *Confidence: confirmed.* Source:
EXPERT-REVIEW-DOSSIER.md §20 (20a). Engine: rule 20a (`headset-steerer`).

**FRM-6 — Headset cups vs frame head tube compare S.H.I.S. BORE TOKENS ONLY.** In a S.H.I.S.
code (e.g. `ZS44/28.6`), the token **before** the slash is the head-tube bore (the *frame* fact);
the number **after** is the steerer side. Rule 20b compares the **bore tokens only** — because
the frame-side field assumes a tapered steerer, so comparing full codes would false-flag a
straight-steerer-on-tapered-frame combo that isn't the headset's problem. Dormant until a frame
carries sourced `headTubeUpper`/`headTubeLower` (live on 51 catalog frames). *Confidence:
confirmed (the subtle one the review flagged for a second look — every source agrees frame-side
suffixes encode the steerer, which is fork-side info).* Source: EXPERT-REVIEW-DOSSIER.md §20
(20b); the S.H.I.S. standard. Engine: rule 20b (`headset-upper`/`headset-lower`).

**FRM-7 — v1 catalogs COMPLETE headsets only (one purchasable upper+lower SKU).** A "uppers and
lowers sold separately" product (Wolf Tooth ZS, Hope Pick N Mix) is **not** a row — never pair
two separates into a fictitious complete SKU. A headset row's `upper`/`lower` S.H.I.S. suffixes
must agree with its `steerer` (validator cross-rule). *Confidence: convention.* Source:
tools/DATA-ENTRY-TEMPLATE.md §4; EXPERT-REVIEW-DOSSIER.md §20.

**FRM-8 — Frames capture the head-tube side without repurposing the `headset` fit-word.** On a
FRAME page, "56/56 Zero stack" goes into `headTubeUpper`/`headTubeLower`; `headset` stays the
steerer-fit field (`tapered` etc.). Don't repurpose `headset` for S.H.I.S. *Confidence:
convention.* Source: tools/DATA-ENTRY-TEMPLATE.md §4.

**FRM-9 — Pick-a-headset is an advisory INFO, never a sold-separately claim.** Once frame + fork
are both picked but no headset is, an info nudges the user — worded advisory ("many frames ship
with one"), because many frames DO ship a stock headset. Never blocks. *Confidence: confirmed.*
Source: EXPERT-REVIEW-DOSSIER.md §20 (20c). Engine: rule 20c (`headset-advisory`, info).

**FRM-21 — Threaded vs. threadless headsets differ in what SETS preload and what LOCKS it, and
these are two different bolts.** Threaded: fork has a threaded steerer; a separate adjusting
race + locknut thread directly onto the steerer to set and hold preload, and a quill stem
installs independently below them. Threadless: fork has a smooth (unthreaded) steerer; the stem
+ spacers ride on the steerer, and a top-cap bolt (threading into an internal expander/"star
fangled nut") pulls the fork up to set bearing preload. Park Tool flags a common misconception
directly: "the cap and bolt at the top of the stem do not secure the stem onto the steering
column. The bolt(s) on the side of the stem keep the stem from moving" — preload-setting (top
cap) and steerer-clamping (stem pinch bolts) are two separate jobs on a threadless headset, and
loosening the wrong one won't do what a mechanic expects. *Confidence: confirmed (fetched, direct
quote).* Source: parktool.com "How to Adjust a Threadless Headset" (via Exa fetch).

**FRM-22 — Headset bore-size adoption history behind today's S.H.I.S. bore families.** Per
Sheldon Brown: 1″ was historically "the vast majority of bikes with threaded headsets"; 1-1/8″
became "a sizable minority," dating to 1990s-era bikes and now the modern mountain-bike default;
1-1/4″ is "mainly used on tandems"; 1.5″ serves "downhill and freeride applications" — the bore
families FRM-6's S.H.I.S. bore-token comparison operates over trace to this adoption history
(1-1/8″ and the tapered 1.5″/1-1/8″ combo now dominate MTB). *Confidence: confirmed (fetched,
direct quotes) — a general/road-history source, not MTB-specific, so treat the size-adoption
dates as historical context, not a current MTB-catalog claim.* Source: sheldonbrown.com headset
standards page (via Exa fetch).

## UDH / Transmission mounting

**FRM-10 — SRAM Transmission (Full Mount) needs a UDH frame.** A direct-mount (UDH) Transmission
derailleur mounts "around the wheel axle itself… with no hanger required" and requires the UDH
interface: *"If you have Universal Derailleur Hanger, your bike is ready for any of SRAM's Full
Mount derailleurs."* On a non-UDH frame it's an error; with no frame picked, a heads-up info.
*Confidence: confirmed.* Source: sram.com "Understanding UDH and Full Mount" + RD-GX-E-B1
(fetched) via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §4; EXPERT-REVIEW-DOSSIER.md §4. Engine: rule 4
(`udh`).

**FRM-11 — A maker-documented UDH RETROFIT KIT downgrades the error to an adapter-warning.**
Frames with a maker-published UDH retrofit kit get a **warning** carrying the structured `fix`
(the rule-9 adapter tier) instead of the hard error; frames without a kit stay a hard error. The
kit is per-frame *data*, not a rule change. First activation: RAAW's UDH Retrofit Kit
(raawmtb.com, fetched — drive-side seatstay + UDH hanger + 174 mm X12 axle + dropout insert,
$216) → activates on the Madonna V2.2 and Jibb V1. No *universal* conversion for non-UDH frames
is documented. *Confidence: confirmed (fetched RAAW page).* Source: EXPERT-REVIEW-DOSSIER.md §4;
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §4. Open mechanic question: do third-party/machined dropout
conversions run Transmission reliably in the wild — and should the tool still treat the *stock*
frame as non-UDH (the row describes the frame as sold)?

**FRM-23 — UDH's published origin: SRAM introduced it in 2019 to solve hanger fragmentation, not
primarily to enable Full Mount (that came later).** SRAM's own account: "The bike shop visit of
the past would typically include a hanger special order... We at SRAM decided to work towards a
more sensible solution... and introduced the Universal Derailleur Hanger, or UDH, in 2019." Full
Mount (hangerless direct-mount, FRM-10's subject) launched in 2023 — a second-order use of the
same interface, not UDH's original purpose. *Confidence: confirmed (fetched, direct quote, SRAM
primary).* Source: sram.com "Understanding UDH and Full Mount" (fetched via WebFetch).

**FRM-24 — A conventional (non-Full-Mount) UDH hanger is drivetrain-brand-agnostic; only Full
Mount is SRAM-specific.** SRAM's own UDH product page states the UDH hanger "works with all
commercially available MTB and E-MTB drivetrains from Shimano to Box to Sunrace" — the standard
replaces the *hanger shape*, not the derailleur mount, for a conventional derailleur. This is
narrower than FRM-10: FRM-10's UDH-required error is specifically about SRAM's hangerless Full
Mount derailleurs (Transmission / RED, Force, Rival XPLR AXS), which "attach[] directly to the
frame and over the drive side dropout" — a *different* mounting method that happens to reuse the
UDH axle interface. A UDH frame running a conventional derailleur of any brand needs no such
gate; only a Full Mount derailleur does. *Confidence: confirmed (fetched, direct quotes).*
Source: sram.com "UDH" product page + "Understanding UDH and Full Mount" (fetched via WebFetch
+ Exa). Cross-reference: FRM-10.

**FRM-25 — SRAM's own guidance: don't confirm UDH by hanger shape alone.** SRAM support
publishes a 3-step verification order: (1) look for the "UDH" logo stamped on the hanger — but
flags that "some brands like Santa Cruz produce their own UDH hangers which can be difficult to
identify" that way; (2) cross-check the frame brand/model/year against SRAM's own Full Mount
Chain Length Guide or Bike Finder; (3) ask the frame manufacturer directly. A mechanic-facing
caution against eyeballing hanger shape as sufficient confirmation of the interface. *Confidence:
confirmed (fetched, SRAM support primary).* Source: support.sram.com "Do I have a UDH on my
bike?" (via Exa fetch).

## Dropout type / single-speed tension

**FRM-12 [DJ] — a single-speed has no derailleur to take up slack, so tension comes from the
dropout.** Chain tension is set by one of: **horizontal/track dropouts** (slide the wheel),
**sliding dropouts / eccentric BB**, or a **vertical dropout + chain tensioner** (or an even/
"magic" gear ratio + **half-link chain**). A vertical-dropout single-speed frame with no
tensioner provision needs a tensioner. *Confidence: design-doc mechanical fact.* Source:
data/DJ-BMX-COMPAT-ANALYSIS.md §1c (DJ-2). Engine: `ss-tension` INFO, dormant (every current DJ
frame is `'sliding'`); `frame.dropoutType` ∈ {horizontal, sliding, ecc-bb, vertical}.

**FRM-13 [DJ] — `driveMode:'single-speed'` drops the geared slots (and, by decision, all brake
slots) from completeness.** A single-speed frame drops shifter/derailleur/cassette/dropper AND
all four brake/rotor slots from completeness — **brakeless is a valid complete build** (Douglas
2026-07-13). The mechanical fact (no derailleur) is captured in `driveMode`, not a marketing
`bikeType`. A geared part on a single-speed frame is **deliberately NOT** errored — convertible
frames are real, so that contradiction verdict awaits the mechanic review. *Confidence: confirmed
(decision).* Source: data/DJ-BMX-COMPAT-ANALYSIS.md §5 Q2/Q3 + §6; CLAUDE.md.

## Frame axle / clearance (cross-reference)

**FRM-14 — Rear axle spacing and rear-tire clearance are frame facts.** See
[`wheels-tires.md`](wheels-tires.md) WHL-4/WHL-5 (rear axle: frame vs hub) and WHL-12 (rear tire
vs frame max) — both originate on the frame. *Confidence: confirmed.* Source:
EXPERT-REVIEW-DOSSIER.md §2/§18.

## Creak diagnosis basics

**FRM-26 — Cadence, not felt location, is the first creak differential.** Park Tool's diagnostic
rule: a creak/squeak occurring once per pedal revolution is "probably located in the crankset and
pedal area"; a creak every 2–3 revolutions "may be in the chain"; a noise present while NOT
pedaling "is likely elsewhere" (wheels, headset, saddle, frame). This matters because creaks are
notoriously mislocalized by ear — carbon frames especially transmit sound far from its true
source — so cadence correlation is the reliable first triage step before disassembling anything.
*Confidence: confirmed (fetched Park Tool); the cadence-differential framework is independently
corroborated as standard shop practice by a separate repair-diagnosis piece using the identical
approach — community/shop tier, corroborating only, per corpus rule 6.* Source: parktool.com
"Troubleshooting a Noisy Drivetrain" (fetched via WebFetch); community corroboration:
watchmy.bike "Where does that creak come from?" (community/shop tier).

**FRM-27 — BB and headset are both common creak sources, each with a distinct fix and a distinct
isolation test.** BB: on a THREADED shell, a creak usually means an undertorqued cup/lockring —
Park Tool's spec is to retighten "to at least 35 Nm"; on a PRESS-FIT shell, a creak usually means
interference-fit slop between the bearing adapter and the bore, fixed by removing and
reinstalling the adapter with a retaining/bearing compound rather than by torque (there's no
thread to tighten). Headset: play/creak is isolated by pulling the front brake hard and rocking
the bike fore-and-aft while grabbing the fork — but Park Tool warns the same test can be
confounded by loose brake-caliper-arm play or, on suspension forks, leg play, so a positive
result there isn't headset-conclusive on its own. *Confidence: confirmed (fetched Park Tool, both
BB and headset diagnostics).* Source: parktool.com "Troubleshooting a Noisy Drivetrain"
(fetched via WebFetch); parktool.com "How to Adjust a Threadless Headset" (via Exa fetch).

## Bearing press-fit tolerances / BB30-PF30 tolerance-stack dispute (L3)

**FRM-28 — Component makers publish frame-shell bore specs for their OWN press-fit standards;
Shimano is the outlier that publishes only cup dimensions, not a frame-shell tolerance.**
BikeRadar's 2014 survey collected official prescribed shell dimensions/tolerances direct from
Cannondale (BB30), FSA (BB386EVO), Cervélo (BBright) and SRAM (PressFit30, PressFit GXP); Trek
declined to share BB90/95 dimensions. Shimano PR (Nick Legan, quoted directly): *"Shimano does…
only provide the dimensions of our bottom brackets. It is up to the frame manufacturers to
determine the best frame dimensions from there… because of the high level of variability with
different frame materials and construction processes."* Praxis's Adam Haverstock, on the
consequence: *"SRAM gives a measurement/dimension doc to follow and Shimano does not. So it's all
left to subjective interpretation of the engineer/factory… Inherently, some bottom brackets fit
better in some frames than others due to this. It's a nightmare to be honest."* *Confidence:
confirmed (fetched, direct manufacturer/vendor quotes).* Source: bikeradar.com "AngryAsian: The
ultimate creaky bottom bracket fix" (2014, via Exa fetch).

**FRM-29 — THE tolerance-stack dispute, in one number: the nominal spec is 0.05 mm; real-world
frames commonly miss it by 4–10×.** Shimano and SRAM both specify an identical 0.05 mm allowable
tolerance on bottom-bracket-shell bore diameter (BikeRadar's engineering column: "about the width
of a human hair"). Kogel Bearings founder Ard Kessels, in a 2021 Bikerumor manufacturer Q&A,
independently confirms the same spec and quantifies the gap between spec and practice: *"The
diameter between the largest and smallest acceptable size in a Press Fit 30 bottom bracket is
only 0.05mm. In the real world, at Kogel we consider any frame that is +/-0.20mm workable. We
have seen production frames that are off by 0.50mm. Carbon cannot be produced to the same
precision as metal parts and to think it can be done at scale within 1/20 of a millimetre is
wishful thinking."* This IS the tolerance-stack dispute the curriculum names: the published
standard is real and tight, but carbon-frame manufacturing routinely runs an order of magnitude
looser than it in production, and a BB maker's *practical* accept-window (Kogel's ±0.20 mm) is
itself 4× the nominal spec just to ship a working product. No catalog field models frame-shell
bore tolerance today, so this is background engineering context, not a ⚠ CONTRADICTION.
*Confidence: confirmed (two independently fetched sources agree, one a named press-fit-BB
manufacturer founder).* Source: bikeradar.com "AngryAsian: I've had it with press-fit bottom
brackets" (2013); bikerumor.com "AASQ #118: Press Fit bottom bracket design with Kogel, BB
Infinite, Hope and C-Bear" (2021, Ard Kessels/Kogel), both via Exa fetch.

**FRM-30 — Why press-fit creaks, mechanically: no axial clamping force, so cup/bearing can
micro-move under load — and that movement is itself frame damage, not just noise.** Hope
Technology design engineer Sam Gibbs, same Bikerumor Q&A: *"there is no axial clamping force when
compared to a threaded BB; this means the cups are much more likely to move relative to each
other when under load and as the BB shell flexes. If any relative movement does occur between the
cup/bearing and the frame, however small, this will cause wear resulting in permanent damage to
the frame and your BB will always creak!"* This is the WHY behind FRM-27's press-fit creak note —
a threaded BB's lockring supplies a preload a press-fit shell structurally cannot; Hope's own
fix is a threaded center tube that pulls both press-fit cups together to restore some clamping
force. *Confidence: confirmed (fetched, direct named-engineer quote).* Source: bikerumor.com AASQ
#118 (Sam Gibbs/Hope Technology, via Exa fetch). Cross-reference: FRM-27.

**FRM-31 — A press-fit-BB manufacturer's own diagnostic order treats "it's the BB" as the LAST
conclusion, not the first.** BB Infinite COO Gary Mailhiot (same Q&A), on target-fixation
misdiagnosis: most bikes brought in with "my bottom bracket is creaking" are not actually a BB
problem. His prescribed order: don't name the suspected part to the mechanic (avoid priming);
always test-ride first; check skewers/thru-axles first ("an A-numero-uno place for a creak to
hide"); then swap to flat pedals with no cleats and re-test; keep test-riding through the whole
process; never install a press-fit BB with plain grease, always a proper retaining compound
(movement = creak, so anything that lets the cup creep will eventually creak regardless of
tolerance). This extends FRM-26's cadence-based creak triage with a press-fit-specific diagnostic
sequence sourced directly from a PF-BB manufacturer. *Confidence: confirmed (fetched, direct
named-executive quote) — manufacturer Q&A tier, treat as medium-high per corpus rule 5 (not a
formal service manual, but attributed and specific).* Source: bikerumor.com AASQ #118 (Gary
Mailhiot/BB Infinite, via Exa fetch). Cross-reference: FRM-26.

**FRM-32 — The BB30 vs PF30 engineering distinction is interface COUNT, not just bore size — PF30
literally stacks one more interference fit than BB30.** Wheels Manufacturing's own technical
pages (manufacturer-primary, not a search summary): **BB30** is "direct-fit" — the bearing outer
race presses straight into a 42 mm-ID frame bore, ONE interference interface (bearing-to-shell).
**PF30** uses a 46 mm-ID frame bore that takes a pressed-in cup (often aluminum or composite),
and the bearing then presses into THAT cup — TWO interference interfaces stacked in series
(cup-to-shell, then bearing-to-cup), which is the literal mechanical meaning of "tolerance stack"
in this dispute: PF30 compounds two press-fit tolerance windows instead of BB30's one, at the
cost of an extra interface that can itself work loose. Both use 68 mm (road) / 73 mm (mtb) shell
widths; SRAM's own DUB manual (fetched) also documents an 83 mm PF30 downhill width. Wheels Mfg
also confirms the neighboring bore families that corroborate FRM-18's Park Tool numbers from a
second manufacturer-primary source: BB86/BB92 = 41 mm ID (matches FRM-18's PF41 family); Trek
BB90/95 = 37 mm ID direct-fit, with Trek "moving away from BB90/95 to… PF92" (= BB92's 41 mm ID
shell). BB30 also uses thin spacers/a wave washer between bearing and crank arm to micro-adjust
chainline — a wear/setup detail, not a fit spec. *Confidence: confirmed (fetched manufacturer
technical pages + SRAM's own DUB installation manual).* Source: wheelsmfg.com "BB30 Technical
Info", "PF30 Technical Info", "Three Common Bottom Bracket Misconceptions" (all fetched via Exa);
SRAM/Wheels Mfg-hosted "DUB Cranksets and Bottom Brackets" user manual (via Exa fetch: BB30 =
42 mm ID, PF30/BB386 = 46 mm ID, PressFit(GXP) = 41 mm ID). Cross-reference: FRM-18.

**FRM-33 — Chris King's headset cup + fork-crown-race press-fit spec: no more than 0.1 mm
(0.004″) of interference, for BOTH the head-tube cups and the crown-race baseplate.** Chris
King's own installation manuals (NoThreadSet, GripNut — fetched, identical wording across
models): *"The proper press fit should be with no more than .1mm (.004") of interference. See
table below for head tube bore specifications. Do not file or otherwise remove material from the
cups to make them fit."* — and the identical 0.1 mm figure repeats for the crown-race baseplate
press. The head tube bore must be reamed/faced true first (manuals specify a minimum ream depth
into the head tube before pressing). This is the headset-side answer to the chapter's L3 target:
a headset cup's target interference (0.1 mm) is roughly double the *nominal* BB-shell-bore
tolerance window PF30 specifies (FRM-29's 0.05 mm), consistent with a bonded/pressed cup carrying
different load direction and duty than a BB shell's rotating-bearing bore. *Confidence: confirmed
(fetched, direct quotes, consistent across two Chris King headset manuals).* Source: Chris King
NoThreadSet + GripNut installation manuals (fetched via Exa: manualsnet.com and circles-jp.com
PDF-hosted copies of Chris King's own manual text). Open mechanic question: Cane Creek and FSA
publish their own headset service manuals with cup press-fit specs — not yet fetched for this
chapter; worth a follow-up pass to confirm whether 0.1 mm is a Chris-King-specific number or an
industry-common headset figure.

## BMX frame/crank standards (off-live)

**FRM-15 [BMX] — BB shell + crank spindle diameter together select the bearing set.** BMX frame
BB **shells**: **Mid** (~41 mm ID, press-in — modern default), **Spanish** (~37 mm ID, press-in),
**American** (~51 mm ID, loose/caged cups — old-school), **Euro** (threaded ~68 mm, external-cup
— rare). Crank **spindles**: **19 mm** (modern default), **22 mm** (Profile/Primo), **24 mm**,
older **48-spline American** (~22.2 mm) — and **30 mm** exists (the verified Profile Elite AL
rows). The real check is shell × spindle → bearing kit (a Mid shell with a 19 mm spindle needs
Mid-19 bearings; Mid-22 needs different bearings/spacers). *Confidence: design-doc + verified
rows.* Source: data/DJ-BMX-COMPAT-ANALYSIS.md §2a (BMX-1) + §6 (30 mm correction). Engine
decision: the shell×spindle *matrix* was **NOT built** — replaced by purchasable-BB exact checks
(`bmx-bb-shell` / `bmx-bb-spindle`) + a no-BB advisory info, so no matrix-guessing false error is
possible; reopen only if the mechanic review wants matrix-level verdicts.

**FRM-16 [BMX] — crank piece-count vs shell: a 1-piece crank fits ONLY an American shell.** BMX
cranks are **3-piece** (spindle + 2 arms, modern standard, Mid/Spanish/Euro shell), **2-piece**
(rare), or **1-piece** (Ashtabula — spindle+arms one forging, needs the wide **American** shell
only). A 1-piece in a Mid frame, or a 3-piece in an American-only frame without a converter cup,
is a real error. *Confidence: design-doc mechanical fact.* Source: data/DJ-BMX-COMPAT-ANALYSIS.md
§2a (BMX-2). Engine: `bmx-crank-pieces`, live-in-module (dormant by data — activates on a
1-piece crank or American-shell frame row).

**FRM-17 [BMX] — headset is display-only unless a sourced integrated-vs-threaded mismatch
appears; the real constraint is FRAME×headset, not FORK×headset.** Modern BMX is near-universally
integrated (Campy-style) 1-1/8" in a 45×45 head tube. The one hard-mismatch people expect is an
**integrated headset in a non-integrated frame** (no machined bearing seat) — a real frame×headset
non-fit. But **fork choice is NOT the constraint**: any fork works with an integrated headset once
the correct bottom race is pressed on it (*"You don't need an integrated fork for an integrated
headset"*). So the eventual rule, if added, is scoped **frame×headset only** — mirroring the MTB
engine's own frame-side (20b) vs fork-side (20a) split. *Confidence: medium (one detailed forum
thread; corroborated by the MTB S.H.I.S. precedent).* Source: BMXmuseum "Integrated headset vs
non-integrated fork" thread, via tools/BMX-RULE-SEVERITY-RESEARCH.md Q9;
data/DJ-BMX-COMPAT-ANALYSIS.md §2a (BMX-9). Engine: not modelled (display capture only).

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **The BB is a three-body interface:** frame shell ↔ BB ↔ crank spindle (FRM-1). The frame
  picks the shell; the crank picks the spindle; the BB is the *bridge* that must match both — and
  the shell+spindle *together* select the bearing kit (FRM-3, and the BMX matrix FRM-15). A
  frame and crank can each be "fine" and still need a specific BB to join them.
- **The head tube is a two-sided S.H.I.S. interface:** frame bore (upper + lower) ↔ headset cups
  ↔ fork steerer (FRM-5/6). Rule 20a checks the *steerer* side, 20b the *bore* side — two
  independent axes, which is exactly why the comparison is bore-tokens-only (FRM-6): mixing them
  would leak a fork fact into a frame check.
- **UDH is a frame property that gates the derailleur** (FRM-10): Transmission's mounting method
  makes the frame's hanger interface a hard prerequisite — and a per-frame retrofit kit is the
  only documented way to bridge it (FRM-11).
- **The dropout gates single-speed drivetrains** (FRM-12): with no derailleur, the frame's
  dropout type *is* the tensioning system — a drivetrain constraint that lives on the frame.
- **A threaded BB shell is a two-axis constraint (diameter/pitch AND handedness), not one**
  (FRM-18/19/20): even a cup whose thread diameter matches can be the wrong standard if the
  drive-side handedness doesn't — British/T47 reverse-thread the drive cup, Italian/French don't.
- **A press-fit BB's tolerance stack is literally interface count** (FRM-32): BB30 has one
  interference interface (bearing-to-shell); PF30 adds a second in series (cup-to-shell,
  bearing-to-cup) — more interfaces, more places for the nominal-vs-real-world gap (FRM-29) to
  compound.
- **UDH's conventional hanger and Full Mount are two different constraints on the same interface**
  (FRM-23/24): a plain UDH hanger gates nothing brand-specific (FRM-24), but Full Mount's
  hangerless clamp (FRM-10) is a harder, SRAM-specific gate riding the same physical interface.

### Mismatch failure modes
- **Hard "won't fit":** BB shell ≠ crank spindle interface without a matching BB (FRM-1);
  Transmission mech on a non-UDH frame with no kit (FRM-10); a 1-piece crank in a non-American
  BMX shell (FRM-16); an integrated BMX headset in a non-integrated frame (FRM-17).
- **"False red to avoid":** BSA68 vs BSA73 treated as different (FRM-2); a warning on 30 mm-in-
  BB92, which is servable (FRM-3); DUB conflated with 30 mm (FRM-4).
- **"Works with a per-frame kit" (adapter-warning):** UDH retrofit on a documented frame (FRM-11).
- **Silent-and-fine / advisory:** matching shell/spindle with a correct BB (info "sold
  separately" until picked, FRM-1); pick-a-headset nudge (FRM-9); a geared part on a
  single-speed frame — deliberately not errored (FRM-13).
- **"Fits loosely but is wrong" — the identification trap:** a wrong-standard threaded BB cup
  either falls through (bore too big) or won't start (bore too small); where it DOES start, the
  drive-side handedness can still be backwards (FRM-19/20) — "it threaded a little" is not
  confirmation.

### Install-order dependencies
- **Bearing kit is selected from shell+spindle before the BB is pressed/threaded** (FRM-3/15):
  the same shell takes different bearings per spindle diameter, so the spindle must be known first.
- **The headset bottom race is pressed on the fork before the fork enters the head tube** (FRM-17,
  and MTB equivalently) — which is why fork choice does NOT constrain an integrated headset: the
  race adapts any fork.
- **UDH hanger / retrofit hardware installs before the Full Mount derailleur** (FRM-10/11): the
  frame's axle interface must be UDH-ready before the mech can mount around the axle.
- **Single-speed chain tension is set at wheel/BB install via the dropout** (FRM-12): tension is
  a build step, not a component spec — a vertical dropout forces a tensioner into the build.
- **A threadless headset's preload-set step and steerer-clamp step happen in a fixed order**
  (FRM-21): the top cap sets bearing preload with the stem bolts loose, and only THEN do the stem
  pinch bolts lock the assembly — doing it out of order (or mistaking one bolt for the other)
  is the single most common threadless-headset mis-adjustment.

### Wear / setup couplings
- **Tight spindle-in-shell pairs trade bearing life** (FRM-3): 30 mm-in-41 mm-bore is servable
  but bearing-life-constrained vs 24 mm — the durability coupling behind the "which pairs do you
  talk customers out of" question.
- **Press-fit shells + creak:** press-fit BBs (PF92 etc., FRM-2) are more prone to
  creak/service than threaded — a maintenance coupling, not a fit rule. **The root mechanism is
  the missing preload** (FRM-30): a threaded BB's lockring supplies axial clamping force a
  press-fit shell structurally lacks, so any relative cup/frame movement — however small —
  becomes progressive wear, not just noise; retaining compound (never plain grease, FRM-31)
  substitutes for the missing mechanical preload.
- **Diagnosing a creak by ear alone risks misattributing it to the BB** (FRM-31 extends FRM-26):
  a PF-BB manufacturer's own protocol treats "it's the bottom bracket" as the conclusion of a
  process of elimination (skewers/axles, then pedals, always with a test ride), not the starting
  assumption — mirrors FRM-26's cadence-differential caution against mislocalizing creaks by ear.
- **A mis-selected bearing kit (right shell, wrong spindle spacers) runs rough** — the BMX
  shell×spindle matrix (FRM-15) is fundamentally about the *bearing* fit, which is why it was
  left to purchasable-BB exact checks rather than a guessed matrix.
- **A reverse-threaded (self-tightening) BB cup masks under-torque for longer than a right-hand
  cup would** (FRM-19): English/T47 drive cups tighten themselves slightly under pedaling load,
  so a marginal install can run OK for a while before creaking — vs. an Italian drive cup, which
  self-loosens from day one if under-torqued (FRM-27's threaded-BB creak fix applies to both, but
  the failure timeline differs by standard).

---

## Gaps

Honest list of what's still missing for this chapter to grade above `foundation` (see
[`CURRICULUM.md`](CURRICULUM.md) for the level definitions) — for a future training round to
close, most-specific first:

- **CLOSED this round — BB shell bore-tolerance / bearing-press-spec numbers (L3, was gap #1).**
  FRM-29 lands the actual number (0.05 mm Shimano/SRAM nominal shell-bore tolerance) AND the
  real-world variance dispute (Kogel's ±0.20 mm practical accept-window, 0.50 mm seen in
  production) from a named press-fit-BB manufacturer founder. FRM-33 lands the equivalent
  headset-cup figure (Chris King: 0.1 mm interference). **Still open within this sub-area:** no
  Cane Creek/FSA headset press-spec fetched yet (FRM-33's open question), no systematic
  frame-to-frame bore variance data beyond Kogel's anecdotal range, and no bearing outer-race
  (as opposed to shell-bore) manufacturing-tolerance table from a bearing maker (Enduro Bearings'
  cycling-specific technical pages were not successfully fetched this round — only its
  industrial-seals division's generic press-fit-allowance table turned up in search, and that
  wasn't fetched/entered since it's not confirmed to be the same technical basis as their
  bike-bearing cups).
- **CLOSED this round — BB30/PF30 tolerance-stack dispute (L3, was gap #4).** FRM-29/30/32 cover
  the dispute from three angles: the spec-vs-reality gap (FRM-29), the missing-preload mechanism
  (FRM-30), and the interface-count engineering distinction (FRM-32) — sourced from BikeRadar's
  manufacturer survey and a Bikerumor Q&A naming Hope/Kogel/BB Infinite/C-Bear engineers by name.
- **No UDH revision history across frame generations (L3 gap, unchanged).** FRM-23–25 cover
  UDH's origin and verification method, but not whether the physical UDH spec itself has revised
  since 2019 (dimensional changes, axle-interface tweaks) — `CURRICULUM.md` names this explicitly
  under "Frame-standards minutiae." Not attempted this round.
- **No torque-spec table for BB/headset/UDH-hanger fasteners beyond the two ad-hoc numbers
  already on record (35 Nm BB lockring, FRM-27; ~20 Nm threaded-headset locknut, mentioned in the
  Park Tool threaded-headset-adjustment page but not yet entered as a fact).** A full fastener
  torque table (stem bolts, rotor bolts, cassette lockring, BB, headset, UDH hanger bolt) is
  explicitly L2 (`CURRICULUM.md`) — not attempted this round; still the chapter's biggest L2 gap.
- **No BMX bearing-kit matrix (L2/L3 gap, pre-existing, unchanged).** FRM-15's open mechanic
  question (enumerate the real shell×spindle bearing-kit matrix, incl. adapter combos) is still
  open — this round did not attempt it; it needs either manufacturer bearing-catalog data or a
  shop interview, not general web literacy.
- **No Shimano/Campagnolo/other-brand press-fit or proprietary BB service internals (L2 gap,
  unchanged).** This round's press-fit sourcing (Park Tool, Wheels Mfg, SRAM, Chris King) covers
  identification/naming/interference-spec for the SRAM/generic/Chris-King side well now, but not
  Shimano- or Campagnolo-specific service procedures or torque specs — full service-manual
  coverage stays L2.
- **Headset creak isolation (FRM-27) has no equivalent BB-vs-frame-crack differential test
  sourced yet** — Park Tool's noisy-drivetrain page mentions frame cracks as a creak source
  ("A crack in a weld... can also cause a creaking sound") but this round did not source a
  dedicated crack-vs-BB-creak isolation procedure; flagged for a future pass rather than guessed.
- **No wheel-building / spoke-tension L3 coverage (pre-existing, out of this chapter's scope —
  lives in `wheels-tires.md` if pursued).** Listed here only because `CURRICULUM.md` names it
  alongside bearings/press-fit under the same L3 "Specialist domains" heading.

## Open mechanic questions (for the human review — do not act)
- FRM-2: any real case where a 68 mm vs 73 mm BSA shell genuinely needs different BBs (frame-
  specific spindle length, not the shell standard itself)?
- FRM-3: which spindle×shell pairs do you actively talk customers out of (short bearing life)?
  Any pair you've been unable to source a BB for?
- FRM-11: do third-party/machined dropout conversions run Transmission reliably in the wild?
- FRM-15 [BMX]: enumerate the real shell×spindle bearing-kit matrix — which combos exist via
  adapter (e.g. American shell + 19 mm spindle) so a future rule doesn't false-error them?
- FRM-19/20: any documented case of a BB shell that's ambiguous between two national standards
  at the measurement level (not just visually) — i.e. where measuring alone isn't enough and a
  stamped marking or maker confirmation is required?
- FRM-24: does the catalog's `udh` boolean need a THIRD state (conventional-UDH-only vs.
  Full-Mount-verified) now that FRM-24 shows those are different claims, or is "has a UDH
  interface" sufficient for both engine purposes today?
