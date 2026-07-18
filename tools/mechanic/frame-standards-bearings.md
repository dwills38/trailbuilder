# Frame Standards & Bearings — Mechanic Corpus

**Maturity: foundation, approaching professional** (L1 — see [`CURRICULUM.md`](CURRICULUM.md); a
prior round added L1 BB-shell/headset identification, threading-direction, UDH-history and
creak-diagnosis literacy, then opened L3 with real numeric press-fit interference specs (BB
shell bore tolerance, Chris King headset cup interference) and manufacturer-quoted coverage of
the BB30/PF30 tolerance-stack dispute (FRM-28–33), plus a first L2 fastener-torque table
(FRM-34). **2026-07-18: this round closes three named foundational gaps outright** — the
S.H.I.S. standard's own founding document + full numeric tolerance tables (FRM-36/37), thru-axle
thread standards (FRM-39/40), and SRAM's own UDH engineering drawing + numeric hanger/chainstay
spec (FRM-41/42) — **and deepens L3** with a second and third independent BB-manufacturer's own
numeric bore-tolerance data (Hambini's accept-window table + root-cause corroboration, FRM-43/44)
and Cane Creek's own OE head-tube bore-tolerance spec closing FRM-33's Chris-King-vs-industry
open question (FRM-45). Still short of `professional`: headset locknut torque, UDH-hanger-bolt
torque, and Trek/Cannondale/Cervélo-specific BB figures remain unsourced (FRM-34's own gap), and
most L3 targets beyond press-fit (wheel-building, BMX bearing matrix, brand-specific service
internals) remain open — see "## Gaps").

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

## S.H.I.S. — the standard's own founding document and numeric tables (closes a named gap)

**FRM-36 — S.H.I.S. is a real, dated, jointly-published industry standard (introduced November
2010 by a consortium of headset manufacturers), not an informal shop convention — and its own
text explicitly warns its bore numbers are a rounded CODE, not a measurement.** The original
joint press release (syndicated by Cane Creek, FSA, and other participating headset
manufacturers, hosted via bike24.com/mountainflyermagazine.com mirrors): *"The Standardized
Headset Identification System (S.H.I.S.) creates a common language for describing modern bicycle
headsets... To determine fit, four dimensions are needed: (1) stem-clamp diameter of fork, (2)
crown-race seat diameter of fork, (3) head-tube top inside diameter, and (4) head-tube bottom
inside diameter."* Bearing location/cup-type is one of three letter codes: **EC** (external cup —
bearing outside the frame), **ZS** (ZeroStack/semi-integrated — pressed-in cup, bearing recessed
inside the frame), **IS** (integrated — bearing seats directly in a machined/bonded frame
interface, no separate cup). Park Tool's own SHIS reference repeats the standard's own caveat
directly: *"These are given in whole millimeters, and should be considered as a code, not an
exact measurement"* — e.g. the EC29 code (1″ JIS) actually bores to 29.8–29.9 mm, and EC30 (1″
Pro/Euro) actually bores to 30.0–30.15 mm — two DIFFERENT real diameters both rounding to "30" in
casual conversation, which is exactly the ambiguity FRM-6's bore-token comparison exists to
avoid by comparing the full SHIS code, not a bare "30." *Confidence: confirmed (fetched the
standard's own founding press release + Park Tool's SHIS reference, direct quotes).* Source:
images.bike24.com press-release PDF ("HEADSET MANUFACTURERS PARTNER IN DEVELOPMENT OF NEW
FITMENT IDENTIFICATION SYSTEM," Nov 2010, fetched); mountainflyermagazine.com mirror of the same
release (fetched); parktool.com "Standardized Headset Identification System (aka Headset Code)"
(fetched), 2026-07-18.

**FRM-37 — The full numeric tolerance tables behind every SHIS code (bore ID, cup/bearing OD,
steerer-column OD, crown-race seat OD) are published and specific — the actual engineering data
FRM-6's "bore tokens" fact assumes but does not itself carry.** Selected EC (external-cup) bore
IDs: EC29 = 29.8–29.9 mm, EC30 = 30.0–30.15 mm, EC34 = 33.8–33.95 mm, EC37 = 36.8–36.95 mm, EC44 =
43.90–43.95 mm, EC49 = 49.55–49.6 mm. ZS (ZeroStack) bore IDs: ZS41 = 41.35–41.4 mm, ZS44 =
43.90–43.95 mm, ZS49 = 49.57–49.65 mm, ZS56 = 55.90–55.95 mm. IS (integrated) bearing-seat bore
IDs: IS38 = 38.15–38.25 mm, IS41 = 41.10–41.20 mm, IS42 (Italian/Campagnolo Hiddenset) =
41.95–42.05 mm — **IS41 and IS42 differ by less than a millimeter of bore, a genuine
measurement-error trap** the standard's own tables exist to prevent by forcing a full code name
rather than a rounded "42mm-ish" description. Steering-column (steerer) OD codes: 25.4 (1″
threadless), 28.6 (1-1/8″ threadless — the modern MTB default, FRM-22), 31.8 (1-1/4″), 38.1
(1-1/2″), plus separate threaded variants (25.4-24tpi, 28.6-26tpi, 31.8-26tpi) for legacy threaded
headsets (FRM-21's threaded/threadless split). Crown-race seat OD codes: 26 (1″ Pro/Euro), 27 (1″
JIS), 30 (1-1/8″), 33 (1-1/4″), 40 (1.5″/tapered). An optional stack-height suffix **"H"** (e.g.
"H16" for a 16 mm-tall assembly) may follow either the upper or lower code when a manufacturer
publishes it — the amount of steerer length the headset assembly itself consumes, separate from
bore/steerer fit. *Confidence: confirmed (fetched, two independently-hosted numeric tables —
Park Tool's and Cane Creek's own SHIS poster — agree on every figure checked).* Source:
parktool.com "Standardized Headset Identification System" Tables #1–#5 (fetched); Cane Creek
"SHIS Poster" (bicycleretailer.com-hosted PDF, fetched, tables 1–3 corroborate); the 2010 founding
press release (as FRM-36). Cross-reference: FRM-6, FRM-21, FRM-22.

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

## Thru-axle thread standards (closes a named gap)

**FRM-39 — "12mm thru-axle" names an outside diameter, not a thread standard — three
non-interchangeable thread pitches (M12×1.0 / M12×1.5 / M12×1.75) coexist under that one nominal
diameter, brand-locked, and a wrong-pitch axle simply won't thread in (or cross-threads the
dropout if forced).** Multiple independent axle-fitment vendors (Thruaxle.com, Robert Axle
Project, Ridea) converge on the same three-pitch landscape: *"When thru axles were first being
used there was no standard for the threads. Different companies chose different thread pitches,
including P1.0, 1.5 and 1.75... all three thread pitches are very common"* (Thruaxle.com).
Brand associations gathered across these sources (consistent, but vendor/community tier, not a
single standards-body table): **M12×1.0** — Santa Cruz/Scott (fine thread, e.g. their OEM DT
Swiss-based axles) and Specialized's Syntace X-12 system; **M12×1.5** — Shimano's "E-thru" 12 mm
standard (BMC, Giant, Rocky Mountain and others) and RockShox/SRAM's Maxle (both Stealth and
Ultimate) on many modern MTB forks/frames; **M12×1.75** — the original SRAM/RockShox "Maxle"
(pre-Stealth) system. 15 mm front axles carry their own separate, non-interchangeable pitch set
(M15×1.0 vs M15×1.5), and legacy 14 mm designs use yet another (M14×1.5) — so diameter alone
(12/15 mm) is necessary but not sufficient to confirm a replacement axle fits. *Confidence:
medium-high (convergent vendor/fitment-guide sources, not a single manufacturer standards
document — no governing body publishes a single thru-axle thread-pitch table the way S.H.I.S.
does for headsets).* Source: thruaxle.com "Support/FAQ" (fetched); robertaxleproject.com "What
Axle Do I Need for My Bike?" (fetched, thread-pitch fitment tables); bermstyle.com "Rear Thru
Axle 'Standards' Are Confusing As Hell" (fetched, brand-to-pitch mapping); Ridea thru-axle
measurement guide PDF (mizutanibike.co.jp-hosted, fetched), 2026-07-18.

**FRM-40 — Axle LENGTH is not derived from hub spacing by a simple formula — the same
148 mm-spacing (Boost) frame can need different axle lengths depending on dropout counter-sink
and thread engagement depth, and axle torque is a real, manufacturer-published spec, not a
"snug it down" guess.** Thruaxle.com's own caution, stated as a direct warning against a common
mechanic assumption: *"a 12x148 frame does NOT use a 148mm long axle"* — the axle must additionally
span any dropout counter-sinking and the thread engagement length, so two 12×148 (Boost) frames
from different makers can call for different-length axles even at the identical hub spacing.
SRAM's own Suspension user manual (RockShox Maxle, the most common MTB thru-axle) publishes a
real torque spec, not a vague "hand tight": standard Maxle Stealth/Ultimate = **9–13.5 N·m
(80–120 in-lb)** for both 12 mm rear and 15 mm front, but the older/DH-specific **Maxle DH =
12.5–14.7 N·m (110–130 in-lb)** — a materially different (higher) number for a visually similar
part, and SRAM's manual frames both under- and over-tightening as damage risks to the axle,
dropout, AND hub, not just a "spins in the dropout" nuisance. This is the frame/fork-side half of
[`drivetrain.md`](drivetrain.md) DRV-34's cross-component fact (Transmission derailleur impact
behavior depends on correct axle torque) and DRV-47 (an over-torqued thru-axle can crush a DT
Swiss Ratchet EXP freehub's internal spacer) — the axle torque spec genuinely comes from the
frame/fork/axle maker, per SRAM's own guidance in DRV-34, not a single universal number even
within one axle brand's own product line. *Confidence: confirmed (fetched SRAM primary for the
torque figures; thruaxle.com fetched for the length-vs-spacing caution, vendor tier but the claim
itself is a straightforward mechanical fact, not a disputed one).* Source: docs.sram.com
"Suspension" user manual, Maxle section (fetched, multiple fork models); bulls.de-hosted SRAM
Maxle manual PDF (fetched, corroborating the Maxle DH torque figure); thruaxle.com "Support/FAQ"
(as above). Cross-reference: [`drivetrain.md`](drivetrain.md) DRV-34, DRV-47; FRM-11 (UDH
retrofit kits specify their own axle, e.g. RAAW's kit-included 174 mm X12 axle).

## UDH's own engineering drawing (closes a named gap)

**FRM-41 — UDH is not just a marketing concept (FRM-23/24) — it is a real, versioned engineering
drawing with GD&T tolerancing, hosted at SRAM's own universalderailleurhanger.com, and frame
makers are expected to build to it, not to a description.** The drawing
(`90-7518-190-000`, currently revision E, titled "UDH DERAILLEUR HANGER FRAME SPEC") is a 6-sheet
mechanical drawing invoking **ASME Y14.5-2009** geometric dimensioning and tolerancing, with a
published general tolerance table (untoleranced lengths: ±0.1 mm under 6 mm, ±0.2 mm 6–30 mm,
±0.3 mm 30–120 mm, ±0.5 mm 120–400 mm; untoleranced angles ±2°) — i.e. this is a real mechanical-
engineering release document, not a diagram for marketing purposes. It specifies concrete
functional features a compliant frame must include: a **forward rotational stop** (minimum
10 mm² contact area) and a **backward rotational stop** ("can be any kind of protrusion") that
takes up removal torque when the hanger is unscrewed — features whose absence would let the
hanger spin freely under derailleur load or unscrew itself during hanger removal. SRAM's Eagle
Transmission/DH Transmission Frame Fit Specification document reinforces that this is the
authoritative source over any other summary: *"The 'UDH&FULL_MOUNT_RD_FRAME_SPEC.pdf' defines
the dimensional requirements for the Hangerless Interface... A CAD review of your design by the
SRAM drivetrain team is highly recommended"* for any frame maker implementing it — i.e. even
SRAM does not consider a frame-maker's own reading of the drawing sufficient without a CAD
review. *Confidence: confirmed (fetched the drawing PDF directly + SRAM's own frame-fit spec
document referencing it as authoritative).* Source: universalderailleurhanger.com
`90-7518-190-000_E9_RELEASED.pdf` (fetched); sram.com globalassets "Eagle Transmission and DH
Transmission" + "2024 MTB Components" Frame Fit Specifications PDFs (fetched), 2026-07-18.

**FRM-42 — UDH's own conventional-hanger dimensions ARE published with real numbers (hanger
thickness, hardness, dropout radii), and critically, UDH's compatible thru-axle is a SPECIFIC
thread spec (M12×1.0, 12.7 mm thread length) — narrower than FRM-39's general three-pitch
thru-axle landscape.** SRAM's 2024 MTB Frame Fit Specifications publish real numeric hanger
dimensions: hanger material hardness **HRB > 86**; dropout/hanger geometry **L 30–34 mm, X
6.5–9.5 mm, angle A 25°–30°, R1 8–8.5 mm, R2 12.5–14.5 mm, R3 max 0.5 mm**; and hanger
**thickness by axle type — Quick Release: 8–9 mm, Thru Axle: 4.5–5.5 mm (3.5 mm frame slot)** —
a genuinely different hanger thickness depending on which axle system the frame uses, a detail a
mechanic comparing hangers by eye could easily miss. Separately, and more specifically than
FRM-39's general thru-axle thread survey, **SRAM's own UDH User Manual states the UDH-compatible
thru axle must be M12×1.0 thread with a 12.7 mm thread length**, and explicitly punts axle
*length* to the frame maker: *"Thru axle length is dependent on frame specifications. Contact
your retailer or frame manufacturer for more information"* — the same length-isn't-derivable
caution as FRM-40, restated by SRAM specifically for UDH frames. SRAM also documents a minimum
frame requirement independent of the hanger itself: **425 mm minimum chainstay length** for its
MTB drivetrains to function properly, with frames below that requiring the maker's own testing,
and a maximum **27 mm of chainstay growth** (suspension-linkage travel) — both real numeric
constraints on the frame side that a hanger-only compatibility check would miss entirely.
*Confidence: confirmed (fetched, direct SRAM primary numbers).* Source: sram.com globalassets
"2024 MTB Components" Frame Fit Specifications PDF (fetched); sram.com globalassets UDH User
Manual `95-7918-014-100` (fetched, thru-axle thread spec quote). Cross-reference: FRM-39/40.

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

**FRM-35 — Enduro Bearings' own consumer-facing "Bearing Basics" page does NOT publish numeric
ABEC bore/OD tolerance figures — closing the specific open fetch-attempt from the prior gap note,
not the underlying gap.** The page states ABEC ratings run 1–9 (odd numbers only, 9 best) and
that the standard defines *"precisely defined tolerances for inside and outside bearing
diameters, roundness of ball, trueness of races, and the surface finish"* — but gives no actual
mm/µm values on that page, and explicitly frames ABEC rating alone as insufficient to guarantee
cycling-bearing performance (their own marketing angle for Enduro's cycling-specific product
lines). A related search for a numeric shell-bore-vs-bearing-OD press-fit table on Enduro's
industrial-seals division surfaced a generic engineering press-fit-allowance page, not confirmed
to share technical basis with their bike-bearing cups — so it was NOT entered as a fact (corpus
rule 6: a plausible-but-unconfirmed number is worse than the honest gap). **Net effect: FRM-29's
Shimano/SRAM 0.05 mm shell-bore tolerance and FRM-33's Chris King 0.1 mm headset-cup interference
remain the only numeric bike-specific press-fit figures on record; no bearing-maker (as opposed
to frame-standard-maker) numeric tolerance was found despite two separate attempts.** *Confidence:
confirmed (fetched, direct quote) that the source lacks the number — not a confirmed number
itself.* Source: cycling.endurobearings.com "Bearing Basics" (fetched).

**FRM-34 — Park Tool's own cross-manufacturer torque table gives per-brand bottom-bracket
cartridge and crank-bolt torque, closing a slice of this chapter's L2 fastener-torque gap.**
Bottom bracket (cartridge type, tightening the cups): Shimano 49.1–68.7 N·m, Shimano Hollowtech
II 34.5–49.1 N·m, Campagnolo three-piece 70 N·m, Campagnolo Ultra-Torque cups 35 N·m, FSA
39.2–49 N·m, Race Face 47.5 N·m, Truvativ 33.9–40.7 N·m, White Industries 27 N·m. Crank bolts:
Shimano 34–44 N·m (Octalink XTR 40.3–49 N·m), Campagnolo 32–38 N·m (Ultra-Torque 42 N·m), FSA
34–39 N·m (M14 steel 49–59 N·m), Race Face 54 N·m, Truvativ ISIS 43–47 N·m / square-spindle
38–42 N·m, White Industries 27–34 N·m. Cassette lockring (cross-reference to drivetrain, same
table): Shimano 29.4–49 N·m, SRAM 40 N·m, Campagnolo 50 N·m. Threadless-steerer stem binder
bolts (cockpit cross-reference): Deda 8 N·m, FSA carbon 8.8 N·m, Thomson 5.4 N·m, Race Face
6.2 N·m — a wide per-brand spread that means "torque the stem to spec" has no single universal
number even within one clamp style. *Confidence: confirmed (fetched, manufacturer-sourced
compilation).* Source: parktool.com "Torque Specifications and Concepts" (fetched). Still open
within this same gap: headset locknut/UDH-hanger-bolt torque and Trek/Cannondale/Cervélo-specific
BB figures are not in Park Tool's table and remain unsourced (see `## Gaps`).

## Independent BB-manufacturer tolerance data (Hambini) — corroborates and quantifies FRM-29/30

**FRM-43 — A named press-fit-BB manufacturer (Hambini Engineering) publishes an actual numeric
bore-acceptance table (min/ideal/max hole diameter + max radial runout) per standard — the real
manufacturer accept-window FRM-29's Kogel citation described only qualitatively (±0.20 mm).**
Hambini's own installation guide gives, per BB type, minimum/maximum/ideal frame bore diameter
and maximum radial runout: **BB30/BB30A** 41.97–41.99 mm (ideal 41.98 mm, max runout 0.01 mm);
**BB86/BB92** 40.95–41.00 mm (ideal 40.97 mm, max runout 0.01 mm — corroborating FRM-18/32's
41 mm-bore PF41 family from a third independent manufacturer); **BB386EVO/BBright/PF30/PF30A**
45.95–46.00 mm (ideal 45.97 mm, max runout 0.01 mm — corroborating the 46 mm PF46 family).
Hambini's own root-cause explanation for creaking directly corroborates FRM-30's missing-preload
mechanism from a second, independent named engineer: *"The reality is pressfit has nothing to do
with creaking... The basic reason for the creaking is one of two reasons, either a poor fit or
misalignment"* — traced specifically to carbon monocoque BB shells being bonded from multiple
molded halves without alignment dowels, plus autoclave expansion/contraction the frame maker must
compensate for and often doesn't. Hambini's own published box-and-whisker survey of real frames
(normalized to the BB30/6806 bearing standard) names specific manufacturers' relative dimensional
accuracy, corroborating FRM-29's "some frames run far looser than nominal" finding with a second,
larger comparative dataset rather than one anecdotal range. *Confidence: confirmed (fetched,
direct manufacturer numbers) for the bore-tolerance table; the misalignment root-cause claim is
this manufacturer's own stated engineering opinion, corroborating FRM-30 rather than an
independent physics derivation.* Source: hambini.com "Bottom Bracket Pressfit and Creaking, an
Engineering Analysis" (fetched) + "Hambini Pressfit Bottom Bracket Installation" (fetched, bore
table), 2026-07-18. Cross-reference: FRM-18, FRM-29, FRM-30, FRM-32.

**FRM-44 — T47's extra shell width exists for a specific, quantified reason: shell wall thickness
around the bearing bore, not just "more room" — extending FRM-32's interface-count explanation
with the materials-engineering rationale.** Hambini's T47 engineering guide quantifies the
problem T47 solves: a standard threaded BSA shell (≈35 mm bore) gives roughly **5.5 mm of wall
thickness around a 24 mm steel axle** but only **2.5 mm of wall thickness around a 30 mm
aluminum axle** — since a 30 mm axle needs a 6806 bearing (larger OD) inside the same nominal
BSA shell envelope, T47's larger 47 mm-threaded bore restores **≈6 mm of wall thickness**, "almost
exactly the same as the original 24 mm/BSA combination." This is also why 30 mm aluminum crank
axles exist at all, per Hambini: *"The chosen size of 30mm for aluminum axles is not a sweetspot
for any engineering. It is because the next bearing size up from 6805 that will remotely take the
load happens to be a 6806"* — a licensing/patent-avoidance choice (Shimano's Hollowtech II
6805-bearing/24 mm-steel design is patent-protected) more than an optimization, and 30 mm
aluminum axles trade stiffness for the workaround: *"There are only a few grams in it between a
24mm steel axle and a 30mm aluminum axle."* *Confidence: confirmed (fetched, direct manufacturer
engineering analysis; the patent-motivation claim is Hambini's own informed opinion, not a
primary patent-filing citation — labelled as such).* Source: hambini.com "T47 Bottom Bracket:
Engineering Guide (Threadfit)" (fetched), 2026-07-18. Cross-reference: FRM-32.

## Headset press-fit — Cane Creek's own OE tolerance spec (closes FRM-33's open question)

**FRM-45 — Cane Creek DOES publish its own numeric head-tube bore tolerance spec for OEM frame
builders, in a document separate from the consumer installation manual — closing FRM-33's open
question with a real number, and it uses a genuinely different tolerancing CONVENTION from Chris
King's flat "≤0.1 mm interference" simplification.** Cane Creek's OE (original-equipment) Head-
Tube Specification Guide, aimed at frame manufacturers rather than end users, publishes per-code
bore tolerances as asymmetric plus/minus windows on the nominal bore, not a single interference
number: Traditional (EC) bores — EC30 = 30.10 (+0/−0.05) mm, EC34 = 33.95 (+0/−0.05) mm, EC49 =
49.61 (+0/−0.04) mm; Semi-Integrated (ZS) bores — ZS41 = 41.40 (+0/−0.05) mm, ZS44 = 44.00
(+0/−0.05) mm, ZS56 = 55.95 (+0/−0.05) mm; Integrated (IS) bores — IS38 = 38.15 (+0.1/−0.0) mm,
IS41 = 41.10 (+0.1/−0.0) mm, IS52 = 52.10 (+0.05/−0.05) mm. This is a genuinely different
tolerancing shape than FRM-33's Chris King figure: Chris King specifies the cup-to-frame
**interference** directly (≤0.1 mm, a single number regardless of nominal bore), while Cane
Creek's OE guide specifies the **frame bore's own tolerance window** the frame maker must
manufacture to — two complementary halves of the same physical joint, not competing claims about
the same measurement. Park Tool's own general (cross-brand) press-tool guidance corroborates the
overall magnitude independently: *"Normal interference is between 0.1mm – 0.2mm. If the press fit
is more than 0.2mm, damage to frame and/or tool may occur... If the difference is between 0.0 -
0.1mm, a Loctite type adhesive is recommended"* — consistent with, and a useful cross-check on,
Chris King's ≤0.1 mm figure from a completely different (tool-maker, cross-brand) source.
*Confidence: confirmed (fetched, direct Cane Creek OE spec numbers + Park Tool corroboration) —
this is an OEM-facing engineering document, not a marketing page, and reads as the genuine
manufacturer standard FRM-33 asked whether Chris King's 0.1 mm was industry-common or
Chris-King-specific: the answer is neither company uses an identical number or convention, but
both land in the same ~0.05–0.2 mm order of magnitude.* Source: Cane Creek "OE Head-Tube
Specification Guide" Revision B (b2b.vpg.no-hosted distributor mirror, fetched); parktool.com
HHP-3 headset-cup-press instructions (fetched), 2026-07-18. Cross-reference: FRM-33.

## Campagnolo Ultra-Torque — a genuinely different BB architecture (closes half of a named L2 gap)

**FRM-49 — Campagnolo's Ultra-Torque system puts the bearings ON THE CRANK ARMS, not in the
cups — the opposite architecture from every other BB system this chapter covers — and uses a
wave washer to absorb shell-width variance instead of a fixed-depth press.** Campagnolo's own
dealer technical manual: *"The cups contain no bearings. The bearings are inserted into the cups
as the arms are installed. Each arm has one-half of the spindle"* — so removing the crank pulls
the bearing out WITH it (Park Tool's own service walkthrough: a C-clip retains the pressed
cartridge bearing on the right-arm spindle, removed with a small screwdriver before a dedicated
bearing puller extracts it). A **wave washer** sits under the left-side bearing specifically to
absorb BB-shell-width manufacturing variance — Campagnolo's own tolerance for the common English/
BSC shell is stated as **67.2–68.8 mm**, and the wave washer (not a shim stack, unlike Shimano's
spacer approach, DRV-51) is the mechanism that takes up that range. Two independent torque
figures, both confirmed from Campagnolo's own manual: BB cup install = **35 N·m (310 in-lb)**
each side (Park Tool's independent service page states an identical 310 in-lb, corroborating);
central crank-joining bolt = **42–60 N·m (372–531 in-lb)** — with an explicit exception: *"the
titanium central screw FC-SR008 mounted exclusively on the Ultra Torque Super Record 12v
crankset... has a LEFT-HAND thread (to tighten, turn anti-clockwise, to loosen, turn
clockwise)"* — a single specific SKU within one crank family that reverses the tightening
direction of every other Ultra-Torque bolt, a genuine mechanic trap if handled on autopilot.
Chainring retaining screws torque to **8 N·m (71 in-lb)**, and Campagnolo explicitly instructs
replacing the screws (not just re-tightening) every time the chainrings are changed. Campagnolo's
own shell-compatibility table gives real dimensions corroborating (and extending, with a fourth
independent manufacturer) FRM-18/32's bore-family data: BB86 = 86.5×41 mm, BB30 = 68×42 mm,
PF30 = 68×46 mm, BBright = 79×46 mm, BB386 = 86.5×46 mm — matching the PF41/PF42/PF46 bore
families exactly. *Confidence: confirmed (fetched Campagnolo's own dealer technical manuals,
direct quotes, cross-checked against Park Tool's independent Ultra-Torque service page).*
Source: campagnolo.com dealer PDFs "Technical manual — bottom bracket cup" (Rev03, fetched) +
"12s Crankset Technical manual — Ultra-Torque" (Rev04, fetched); bikeshop.no-hosted Campagnolo
13-speed frame-spec manual (fetched, shell table); parktool.com "Campagnolo Ultra-Torque and
Record Group" + "Crank & Bottom Bracket Removal & Installation: Campagnolo Ultra-Torque" (both
fetched, corroborating), 2026-07-18. Cross-reference: FRM-18, FRM-32, [`drivetrain.md`](drivetrain.md) DRV-51.

## Headset locknut + UDH hanger-bolt torque (closes FRM-34's remaining named gap)

**FRM-46 — Threaded-headset locknut torque IS in Park Tool's cross-manufacturer table (FRM-34
undersold this — the fact was there, just not read closely enough last round), plus a separate
generic rule-of-thumb figure from Park Tool's own adjustment procedure.** Park Tool's "Torque
Specifications and Concepts" table lists, under Headset/Handlebar/Saddle/Seatpost: **threaded
headset locknut, Chris King Gripnut type: 14.6–17 N·m (130–150 in-lb); Tange-Seiki: 24.5 N·m
(217 in-lb)** — a real per-brand spread, consistent with FRM-34's other findings that "torque the
X to spec" rarely has one universal number even within one component class. Separately, Park
Tool's dedicated "How to Adjust a Threaded Headset" procedure gives a generic field figure for
when the exact brand spec isn't known: *"This locknut should be torqued to roughly 20 Nm. Using
perceived effort on the wrench held about 6″/15 cm from the center of the nut, apply about 30
pounds/13.6 kg of pressure"* — a practical hand-feel calibration, not just a number, useful when
no torque wrench fits the wide locknut flats. The 20 Nm generic figure sits between the two named
brands' spec'd range (14.6–24.5 N·m), consistent with it being a reasonable field default rather
than a specific-brand override. *Confidence: confirmed (fetched Park Tool, direct quotes/table).*
Source: parktool.com "Torque Specifications and Concepts" (fetched, corrects FRM-34's own
"not in Park Tool's table" claim — the table does cover threaded headset locknuts, this chapter
simply hadn't quoted that row yet); parktool.com "How to Adjust a Threaded Headset" (fetched),
2026-07-18.

**FRM-47 — The UDH hanger bolt has one specific, confirmed manufacturer torque (25 N·m), is
LEFT-HAND (reverse) threaded, must NEVER be greased, and needs a reversible torque wrench — four
distinct, easily-missed facts about what looks like an ordinary bolt.** SRAM's own UDH User
Manual states plainly: *"Install the UDH bolt through the washer and into the UDH hanger
threads. Tighten the bolt to the specified torque. The UDH hanger bolt is left-hand threaded"*
and separately: *"Do NOT apply grease to the UDH hanger inner threads or the UDH bolt outer
threads. A reversible (left-hand and right-hand thread) torque wrench MUST be used to ensure
proper left-hand thread bolt torque."* The manual's torque table gives the number directly:
**25 N·m (221 in-lb)** — independently corroborated by BikeRadar's own hands-on UDH guide
(*"SRAM specifies a 25Nm torque... Because the UDH bolt is reverse-threaded, tighten it in
anti-clockwise orientation"*). The SRAM mechanical-Eagle derailleur manual (DRV-37's source)
confirms the identical 25 N·m figure applies to the UDH bolt in the Half Mount configuration too
(same bolt, same hardware, whether the derailleur behind it is Full Mount Transmission or a
Half-Mount conventional mechanical derailleur) — a mechanic reaching for a standard (right-hand)
torque wrench, or defaulting to "grease all threads," gets this one wrong in both directions at
once. This is the UDH-specific fastener FRM-34's gap named as missing; it sits alongside FRM-19's
reverse-thread-for-self-tightening pattern (BB shells) as a second, independent instance of
reverse threading on a rotating-load bicycle joint — though here the mechanism is grease-free
rather than the BB's grease-normal convention, another easy cross-contamination mistake for a
mechanic who just serviced a threaded BB. *Confidence: confirmed (fetched SRAM primary — the UDH
User Manual, two independent hosted mirrors agreeing — plus BikeRadar corroboration).* Source:
sram.com globalassets UDH User Manual `95-7918-014-100` (fetched, as FRM-42); mtb-news.de-hosted
mirror of the same manual (fetched, cross-check); bikeradar.com "SRAM UDH explained" (fetched);
sram.com globalassets "1x MTB Mechanical Derailleurs User Manual" (as DRV-37, fetched,
Half Mount UDH bolt torque table), 2026-07-18. Cross-reference: FRM-19, FRM-34,
[`drivetrain.md`](drivetrain.md) DRV-37.

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

**FRM-48 [BMX] — the real shell×spindle bearing-kit matrix FRM-15 flagged as an open question is
now enumerated, converging across three independent BMX shops, including the MTB-shell-via-
adapter combos a BMX-only view would miss.** LuxBMX's own compatibility table gives real shell
IDs and full shell×spindle Y/N matrix: **Euro/BSA** (34.92 mm ID, threaded) accepts 19 mm, 22 mm,
24/22 mm SRAM, 24 mm Shimano-thru, and 30 mm Praxis/Box spindles; **USA** (51 mm ID) accepts only
19 mm, 22 mm, and the legacy 23.8 mm (15/16″)/24 mm-freestyle spindles — no modern 24 mm-thru or
30 mm option; **Spanish** (37 mm ID) accepts only 19 mm/22 mm; **Mid** (41.275 mm ID) accepts
19 mm, 22 mm, and 23.8 mm/24 mm-freestyle — the same spindle set as USA, different shell OD.
Genuinely new depth beyond FRM-15: modern race/pro BMX frames increasingly borrow **MTB press-fit
shells outright** — BB86/92 (41 mm ID) and BB30/PF30 (42/46 mm ID) accept the SAME 19 mm/22 mm
BMX spindles as Mid, PLUS 24/22 mm SRAM, 24 mm Shimano-thru, and 30/28 mm or 35/33 mm Box/Praxis
options that Mid does NOT accept — i.e. a BB86-shelled BMX race frame has a strictly WIDER
spindle-compatibility envelope than a traditional Mid-shelled freestyle frame, not a different
one. Named BMX-specific bearing part numbers corroborate the shell-ID convergence from a second
shop: Mid-19 mm uses an "R12 2RS" bearing (41 mm OD), Spanish-19/22mm uses a "6904" bearing
(37 mm OD) — matching LuxBMX's 41 mm/37 mm shell IDs exactly. *Confidence: medium-high (three
independent BMX-parts retailers converge on identical shell IDs and the Y/N compatibility
matrix — shop/retail tier per corpus rule 5, not a BMX-standards-body or frame-manufacturer
document, but internally consistent and specific enough to be actionable).* Source:
help.luxbmx.com "BMX Bottom Bracket Measurements" (fetched, full matrix table);
bmxdirect.net "BMX Hub and Crank Bearing sizes" (fetched, bearing part numbers); soulcyclebmx.com
"Bottom Bracket Sizes" (fetched, corroborating shell OD figures), 2026-07-18. Cross-reference:
FRM-15.

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
- **The thru-axle is a THIRD, independent constraint threading through both the frame/fork and
  the hub** (FRM-39/40): diameter (12/15 mm) alone doesn't confirm fit — thread pitch
  (M12×1.0/1.5/1.75) must also match, axle length is not derivable from hub spacing alone, and
  UDH specifically narrows this to one pitch (M12×1.0, FRM-42) — a genuinely different, tighter
  constraint than the general thru-axle landscape.
- **S.H.I.S.'s bore-token comparison (FRM-6) rests on real, asymmetric numeric tolerance
  windows, not round numbers** (FRM-37/45): two codes that both round to "42 mm" (IS41 vs IS42)
  differ by less than a millimeter of actual bore — the standard's insistence on full codes
  over casual descriptions is exactly what prevents that ambiguity from becoming a wrong part.

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
  headset-cup figure (Chris King: 0.1 mm interference). **2026-07-18: FRM-43 adds a SECOND named
  BB manufacturer's (Hambini) own numeric bore-accept-window table** (min/ideal/max + max radial
  runout per BB30/BB86/BB92/PF30 family), independently corroborating the 41 mm/46 mm bore
  families and giving a real (not anecdotal) frame-to-frame variance dataset via Hambini's own
  box-and-whisker manufacturer survey. **FRM-45 closes the Cane Creek open question directly**:
  Cane Creek's OE Head-Tube Specification Guide publishes its own numeric bore-tolerance windows
  (a different tolerancing convention from Chris King's flat interference number, corroborated in
  magnitude by Park Tool's general 0.1–0.2 mm guidance). **Still open: FSA's own press-spec
  (not fetched this round) and a bearing-maker's OUTER-RACE manufacturing-tolerance table** — FRM-35
  already confirmed Enduro Bearings' consumer page doesn't publish one; the remaining path is a
  bearing-maker B2B/OEM spec sheet, not another consumer-page attempt.
- **CLOSED this round — BB30/PF30 tolerance-stack dispute (L3, was gap #4).** FRM-29/30/32 cover
  the dispute from three angles: the spec-vs-reality gap (FRM-29), the missing-preload mechanism
  (FRM-30), and the interface-count engineering distinction (FRM-32) — sourced from BikeRadar's
  manufacturer survey and a Bikerumor Q&A naming Hope/Kogel/BB Infinite/C-Bear engineers by name.
- **PARTIALLY CLOSED this round (FRM-41) — UDH revision history.** The engineering drawing
  itself (`90-7518-190-000`) is now sourced at revision **E**, with its own changelog visible in
  the drawing header (revision B added dimensions for "148 OLD frames," revision D added the
  UDH hanger dimensions sheet) — confirming the spec HAS revised since 2019 and giving concrete
  revision markers. **Still open:** a full mapping of which physical dimension changed at which
  revision letter, and whether any revision requires a different UDH part for an older frame —
  the drawing's own revision-history table (sheet 1) was read but not transcribed line-by-line
  this round; a future pass could extract it fully.
- **CLOSED this round — S.H.I.S. standard's own founding document + numeric tables (L1/L3
  gap named in the marathon brief).** FRM-36 sources the actual 2010 joint press release + Park
  Tool/Cane Creek's own numeric bore/steerer/crown-race tolerance tables (FRM-37) — the standard
  itself, not just secondary descriptions of it.
- **CLOSED this round — thru-axle thread standards (gap named in the marathon brief).**
  FRM-39/40 cover the three-pitch (M12×1.0/1.5/1.75) landscape, the axle-length-≠-hub-spacing
  trap, and real manufacturer torque specs (SRAM Maxle 9–13.5 N·m standard / 12.5–14.7 N·m DH).
  **Still open:** no single standards-body thread-pitch table exists (unlike S.H.I.S.) — the
  brand-to-pitch mapping is convergent vendor/community-tier sourcing, not one manufacturer
  document; flagged as such, not overclaimed as confirmed-tier.
- **CLOSED this round — UDH mechanical/dimensional spec drawing (gap named in the marathon
  brief).** FRM-41/42 source the actual engineering drawing (ASME Y14.5 GD&T, rotational-stop
  functional requirements) plus SRAM's numeric hanger dimensions, hanger thickness by axle type,
  the UDH-specific M12×1.0/12.7mm thru-axle thread spec, and the 425 mm minimum-chainstay /
  27 mm max-growth frame requirements.
- **CLOSED 2026-07-18 (FRM-46/47) — headset locknut torque and UDH hanger-bolt torque, the
  two items FRM-34 named as still missing.** Headset locknut: Park Tool's own cross-manufacturer
  table (Chris King Gripnut 14.6–17 N·m, Tange-Seiki 24.5 N·m) plus a 20 N·m generic field figure
  from Park Tool's adjustment procedure — this data was in Park Tool's torque page all along;
  FRM-34 simply hadn't quoted that row. UDH hanger bolt: a clean, confirmed **25 N·m**, left-hand
  (reverse) threaded, explicitly NO grease, requiring a reversible torque wrench — sourced
  directly from SRAM's UDH User Manual and cross-checked against BikeRadar and the mechanical-
  Eagle Half-Mount manual (same bolt, same torque, either derailleur family). **Rotor-bolt
  torque remains sourced in `brakes.md` (BRK-41), not this chapter — correct as a
  cross-reference, not a gap.** Trek/Cannondale/Cervélo-specific BB figures remain unsourced —
  the narrowest residual slice of FRM-34's original gap.
- **CLOSED 2026-07-18 (FRM-48) — BMX bearing-kit matrix.** FRM-15's open mechanic question is
  now answered with a real shell×spindle matrix (Euro/USA/Spanish/Mid shell IDs × 19/22/24/30 mm
  spindle compatibility), converging across three BMX-parts retailers, PLUS the previously-
  unconsidered MTB-shell-via-adapter angle (BB86/92/BB30/PF30 shells on race-BMX frames accept a
  WIDER spindle range than traditional Mid shells). **Tier note:** this is shop/retail-tier
  convergent sourcing, not a manufacturer or standards-body document — appropriately labelled
  medium-high confidence, not confirmed, per corpus rule 5. Engine decision (FRM-15) to skip
  matrix-level verdicts in favor of purchasable-BB exact checks stands; this closes the
  knowledge gap without implying a rule change.
- **PARTIALLY CLOSED 2026-07-18 (FRM-49) — Campagnolo Ultra-Torque service internals.**
  Campagnolo's own dealer manuals now source the genuinely different bearings-on-the-crank-arm
  architecture, the wave-washer shell-tolerance mechanism, cup/central-bolt/chainring-screw
  torque figures, and the left-hand-thread titanium-bolt exception on one specific SKU. **Still
  open: Shimano proprietary press-fit BB service internals specific to this chapter** (DRV-35 in
  `drivetrain.md` covers Shimano crank-side torque, but a frame-side press/removal procedure for
  Shimano's own press-fit BB families hasn't been sourced here) — narrowed from "Shimano AND
  Campagnolo" to "Shimano only," still L2.
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
- FRM-15/48 [BMX]: the shell×spindle matrix is now sourced at shop-tier (FRM-48) — does a
  mechanic reviewer confirm the retailer-convergent Y/N table against manufacturer catalogs
  before any future rule leans on it for more than a no-BB advisory?
- FRM-19/20: any documented case of a BB shell that's ambiguous between two national standards
  at the measurement level (not just visually) — i.e. where measuring alone isn't enough and a
  stamped marking or maker confirmation is required?
- FRM-24: does the catalog's `udh` boolean need a THIRD state (conventional-UDH-only vs.
  Full-Mount-verified) now that FRM-24 shows those are different claims, or is "has a UDH
  interface" sufficient for both engine purposes today?
