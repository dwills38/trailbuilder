# Frame Standards & Bearings — Mechanic Corpus

**Maturity: professional** (L1 — see [`CURRICULUM.md`](CURRICULUM.md); a prior round added L1
BB-shell/headset identification, threading-direction, UDH-history and creak-diagnosis literacy,
then opened L3 with real numeric press-fit interference specs (BB shell bore tolerance, Chris
King headset cup interference) and manufacturer-quoted coverage of the BB30/PF30 tolerance-stack
dispute (FRM-28–33), plus a first L2 fastener-torque table (FRM-34). **2026-07-18: this round
closed every gap the marathon brief named** — the S.H.I.S. standard's own founding document +
full numeric tolerance tables (FRM-36/37), thru-axle thread standards (FRM-39/40), SRAM's own
UDH engineering drawing + numeric hanger/chainstay spec (FRM-41/42) — **plus deepened L3** with
a second and third independent BB-manufacturer's own numeric bore-tolerance data (Hambini,
FRM-43/44) and Cane Creek's own OE head-tube bore-tolerance spec closing FRM-33's open question
(FRM-45) — **and closed the remaining L2 fastener-torque items**: headset locknut + UDH
hanger-bolt torque (FRM-46/47), the BMX bearing-kit matrix (FRM-48), and both Campagnolo's
distinct Ultra-Torque architecture and Shimano's own press-fit BB install/removal procedure
(FRM-49/50) — closing FRM-34's "Shimano/Campagnolo unsourced" gap outright. L1 complete + L2
depth now spans BB/crank/headset/UDH/thru-axle fastener torque across SRAM, Shimano, Campagnolo,
Chris King, and Cane Creek, crossing the CURRICULUM.md bar for `professional`. **2026-07-18
master round 2 closed the UDH revision-history gap outright (FRM-51/52/53)** — the Rev H
engineering drawing's own REVISION RECORD is transcribed line-by-line, giving the A→H change
trail (142/157 OLD added only at Rev F; Rev F is the pivotal hanger→Hangerless-Interface
revision), plus the finding that a rev-aware engine rule cannot be sourced to the bar, so the
engine's revision-blind `udh` boolean stands. What's left toward `master`:
wheel-building/spoke-tension (out of this chapter's scope) and Trek/Cannondale/Cervélo
BB-specific figures (a narrow residual, not a broad brand gap anymore) — see "## Gaps").

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

**FRM-62 [ROAD/GRAVEL] — a drop-bar BB is the ADAPTER between a frame SHELL and a crank SPINDLE;
the two are orthogonal, and a BB SKU is defined by the (shell, spindle) PAIR — one M30 spindle
runs in NINE different shells via nine different Praxis BBs. The road-side FRM-1 shell×spindle law
carries verbatim to road/gravel; the merged single-axis `bb` vocab cannot represent it.** Praxis's
own "M30 BB Options" page lists ONE spindle interface — *"30mm DRIVE / 28mm NON-DRIVE"* —
compatible with the same M30 cranks (Praxis/InfoCrank/Box BMX/Oval M30, and the Zayante Carbon-GR
gravel crank is a Praxis M30 crank per the M30-BB compatibility list), and then enumerates nine
shell-specific bottom brackets that all carry that identical spindle interface but mount to
different frame shells: **M30-BSA THREADED** (68 mm road / 68·73·83 mm MTN), **M30-BB PF41**
(BB86 road / BB90·92 MTN), **M30-386EVO**, **M30-BBRight**, **M30-BB30/PF30 ROAD** (68 mm),
**M30-BB30/PF30 MTN** (73 mm), **M30-T47 E.B.** (external, 68 mm road / 73 mm MTN), **M30-T47 I.B.**
(internal, 85.5 mm road), **M30-T47 Asym** (76.75 mm). So the SAME spindle (M30) legitimately fits
many shells (BSA, BB86, T47, PF30, 386EVO, BBright) via different BBs, and conversely a single
shell (e.g. a BSA gravel frame) legitimately accepts multiple spindle interfaces — a 24 mm Shimano
GRX crank via a BSA-24 mm BB OR a Praxis M30 crank via the M30-BSA BB. Both facts are exactly
FRM-1/FRM-3's MTB reality (30 mm servable across BB86/BB92/PF92 shells) and FRM-4's spindle-mapping
discipline (DUB 28.99 ≠ 30 mm; M30 ≠ 24 mm), restated on the road/gravel side with a road/gravel
primary. **Direction-aware wrong-verdict cases a single collapsed axis produces (both fire):**
(1) **same shell token, different spindle → FALSE FIT** — force the Praxis Zayante's crank `bb` to
the only available token type (a shell name like `bsa-road`, since no M30/30 mm spindle token
exists) and it becomes byte-identical to a 24 mm Shimano BSA crank; the engine would then PASS the
M30 crank against a 24 mm BSA BB it will NOT physically run in. (2) **one crank, several shells →
FALSE WON'T-FIT** — a crank pinned to one shell token (`bsa-road`) is falsely REJECTED on a BB86 or
T47 gravel frame, though Praxis explicitly sells the M30-PF41 and M30-T47 BBs for precisely that
crank on precisely those shells. **⚠ CONTRADICTION** — collides with `GRAVEL_VOCAB.bb`
(`src/schema-gravel.js`): a single merged axis whose tokens are ALL shell-class names
(`bsa-road`/`bb86`/`t47-86`/…) vocabs BOTH `frame.bb` (a shell) and `crankset.bb` (a spindle), and
the shared drop-bar engine's R11 (`rg-bb-shell` + `rg-bb-spindle`, `src/compat-road.js`)
exact-matches frame-`bb` against crank-`bb` across that one list. There is NO 30 mm/M30
spindle-interface token, so the Praxis Zayante Carbon-GR M30 crank cannot be entered without
mis-fielding a shell name onto a spindle interface — the worker who declined to force it was
correct. Notably the ROAD schema already carries the fix pattern: `ROAD_VOCAB` separates `bbShell`
from `crankBb`, and `crankBb` already lists `'30mm'` alongside `'dub'`/`'24mm-road'`/`'gxp'` — so
gravel is the lagging surface, not a new design question. *Confidence: confirmed — Praxis's own
product page pins the single M30 spindle interface across nine shell-specific BBs directly; the
orthogonality principle is additionally carried by the already-confirmed FRM-1/FRM-3/FRM-4.*
Source: praxiscycles.com "Praxis M30 BB Options" (fetched, "30mm DRIVE / 28mm NON-DRIVE" + the
nine shell-specific model list); Praxis M30-BB compatibility list naming Zayante Carbon among M30
cranks (fetched via search of praxiscycles.com / northwestbicycle.com listings), 2026-07-24.
Cross-reference: FRM-1 (the shell×spindle exact-match law this extends), FRM-3 (one spindle across
multiple shells, MTB), FRM-4 (spindle-interface vocab mapping / DUB≠30 mm trap), FRM-18 (shell
naming), FRM-61 (the structurally identical BMX diameter-vs-spline split). Recommended data-model
action (for the coordinator, not made here): split `GRAVEL_VOCAB.bb` into a frame-side `shell`
axis and a crank-side `spindle` axis — the `shell`/`spindle` GRAVEL_VOCAB keys already exist but
are under-wired; add a `30mm`/`m30` spindle-interface token (mirroring `ROAD_VOCAB.crankBb`'s
`'30mm'`), so R11's crank half compares spindle-to-spindle and its frame half shell-to-shell,
matching the MTB BB's `shell`-vs-`spindle` separation and closing the false red without adding one.

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

## "EX44" resolved — a house-notation variant of EC44, not a distinct S.H.I.S. class

**FRM-54 — "EX44" is Nukeproof's (and at least one other brand's) own house notation for the
standard S.H.I.S. EC44 external-cup class, not a fourth bore-family prefix — closes the Ragley
Big Wig catalog-flag question.** The S.H.I.S. standard's own founding document and Park Tool's
own SHIS reference (FRM-36/37) name exactly three bearing-location prefixes — EC (external cup),
ZS (ZeroStack/semi-integrated), IS (integrated) — and neither source mentions "EX" anywhere;
Park Tool's page was fetched specifically to check this and confirms only EC/ZS/IS. Separately,
a Cane Creek 40-series SKU sold under the code **ZS44/28.6 | EC44/40** (bike24.com) is the exact
same bore/steerer combination the Ragley Big Wig's own spec sheet lists as **ZS44/28.6 | EX44/40**
— same upper, same lower bore number, same steerer size, differing only in whether the lower
prefix is written EC or EX. A UK retailer (bananaindustries.co.uk) lists a Brand-X headset under
the title "ZeroStack ZS44 / EX44 Tapered Headset" while its own product URL slug reads
`zs44-ec44-tapered-headset` — i.e. the retailer's own internal identifier treats EX44 and EC44 as
the same SKU, using EX only in the customer-facing title. A Singletrack Forum discussion
(community-tier, corroborating only) independently reaches the same reading, naming Nukeproof
specifically as the brand that writes "EX44/40" and guessing EX stands for "EXternal cup" — i.e.
the same semantic content as EC, just a different two-letter abbreviation of the same English
phrase. No source found documents any dimensional difference between an EX44 and an EC44 bore.
*Confidence: medium-high (no primary S.H.I.S.-body or Nukeproof engineering document was found
that explicitly says "EX = EC"; the case rests on convergent circumstantial evidence — the
standard's own document excluding EX as a real prefix, a retailer's own SKU/slug treating the two
as identical, and a second retailer's product title conflating them for a matching bore/steerer
spec — not a single authoritative statement of equivalence).* Sources: parktool.com
"Standardized Headset Identification System" (fetched, confirms only EC/ZS/IS exist); bike24.com
Cane Creek 40.ZS44 product page (ZS44/28.6 | EC44/40, same spec as the Ragley's ZS44/28.6 |
EX44/40); bananaindustries.co.uk Brand-X "ZeroStack ZS44 / EX44" listing (product-title EX44,
URL-slug EC44 — same SKU); singletrackworld.com forum thread naming Nukeproof's EX44/40 usage
(community tier, corroborating only). **Recommended catalog action: if/when a Ragley Big Wig (or
any Nukeproof-headset) frame row is entered, record its lower head-tube bore as `EC44` (not a new
`EX44` vocab token) and, if the row wants to preserve the maker's own wording for provenance,
carry the literal "EX44/40" string in a free-text note/source field rather than the vocab-
constrained `headTubeLower` field — do NOT add "EX44" as a new S.H.I.S. vocab value, since no
source establishes it as dimensionally distinct from EC44. What would fully settle this: a
Nukeproof or Ragley technical/service document (not a spec-sheet copy-paste) that either defines
"EX" as its own house abbreviation or gives an EX44 numeric bore tolerance differing from FRM-37's
EC44 figure (43.90–43.95 mm) — not found in this pass.* Cross-reference: FRM-6, FRM-36, FRM-37.

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

## Shimano press-fit BB install/removal (closes the remaining half of FRM-49's gap)

**FRM-50 — Shimano's own press-fit BB (SM-BB72/BB92 family, 86.5 mm shell) install/removal
procedure has NO torque spec at all for the press-fit action itself — it's a qualitative
"press until the gap closes" fit-check, not a numeric target — and removal uses a distinctive
expanding-flap tool struck with a mallet, a genuinely different mechanism from a hex-key
press-fit tool.** Multiple Shimano crank dealer manuals (DM-FC0002, DM-GAFC001, DM-RAFC010,
DM-RAFC001, DM-FC0003 — spanning several crank families that share the same BB) give an
identical press-fit procedure: insert the **SHIMANO original tool TL-BB12**, then *"press fit
the bottom bracket by tightening with a spanner while making sure that the contact surface of
the bottom bracket stays parallel to the contact surface of the bottom bracket shell... Check to
confirm that there is no gap between the bottom bracket and the bottom bracket shell"* — the
install target is a **visual/tactile zero-gap check**, not a torque or force number, a genuine
contrast with FRM-46's headset-locknut and FRM-49's Campagnolo cup torque figures, both of which
DO have numeric targets. Removal uses **tool TL-BB13**, a completely different mechanism from a
standard bearing press: the tool has flexible **flaps** that are manually expanded by pressing a
protruding tip, inserted from the side opposite the cup being removed, pushed in until *"the
collar on the flaps engages with the cup,"* then struck with a **soft-face mallet** to drive the
cup out — closer in spirit to a slide-hammer/expanding-collet puller than a threaded press tool.
Shimano's own manual also flags the cups as single-use: *"Do not reuse the cups as they can be
damaged during removal."* *Confidence: confirmed (fetched, five independent Shimano dealer
manuals describing an identical procedure — internally consistent, not a one-off).* Source:
si.shimano.com DM-FC0002-16 + DM-GAFC001-03 + DM-RAFC010-02/03 + DM-RAFC001-04 + DM-FC0003-09
(all fetched), 2026-07-18. Cross-reference: FRM-49, [`drivetrain.md`](drivetrain.md) DRV-35.

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

**FRM-61 [BMX] — spindle DIAMETER and crank-arm SPLINE COUNT are two ORTHOGONAL axes: the BB
constrains the diameter only, and is agnostic to spline. Clarifies/partially supersedes FRM-15's
spindle-list framing, which conflated "48-spline" with a diameter.** In a modern 3-piece BMX
crank the **spline count** (8-spline / 48-spline) describes ONLY the crank-arm↔spindle joint —
capitalbmx's own guide: it is how "the Crank Arms fit snug on the Spindle," whereas the spindle
diameter is separately "the thickness of the Cranks' 'axle' that runs through the Bottom Bracket."
The **diameter** (19 / 22 / 24 / 30 mm) is what the BB bearing bore must match: BMXunion states you
"need a new bottom bracket to match the spindle size" (the bearing bore), never a word about
spline. So a single spindle carries BOTH properties independently, and the SAME spline count ships
in MULTIPLE diameters — proven by the maker's own product data: Fit Bike Co's **"48 Spline
Complete BB Kit (24mm)"** page lists its contents as "1 x 48 Spline 24mm spindle" + "2 x Sealed
24mm bearings" (a 48-spline spindle running in a 24 mm bore), while Rant's **Bangin' 48** crank is
a "19mm 48 spline" spindle and the Rant **Bangin' 8** is 8-spline at the same 19 mm — 48-spline
appearing at both 24 mm and 19 mm, and 8- vs 48-spline appearing at the same 19 mm. Direct
consequences that a single-axis spindle model gets WRONG in BOTH directions: (1) **same spline,
different diameter** — a Fit Blunt (48-spline, 24 mm) and a Rant Bangin' 48 (48-spline, 19 mm) key
identically on "48-spline" yet need different BB bores → a spline-keyed model FALSE-FITS them to a
wrong-bore BB; (2) **same diameter, different spline** — a Rant Bangin' 8 (8-spline, 19 mm) and a
Bangin' 48 (48-spline, 19 mm) both run in the identical 19 mm BB (the BB does not see the spline)
→ a spline-keyed model FALSE-REJECTS a correct BB. The spline only matters crank-arm↔spindle and
spline-drive-sprocket↔spindle, never at the BB interface. **⚠ CONTRADICTION** — collides with the
BMX engine's single-token spindle axis: `BMX_VOCAB.spindle` (`src/compat-bmx.js` line 67) lists
`'48-spline'` inside the same enum as the diameters `'19mm'/'22mm'/'24mm'/'30mm'`, and the
`bmx-bb-spindle` rule (lines 302-303) exact-matches `bb.spindleFit !== cranks.spindle`. A BB
recorded as `24mm` versus a crank recorded as `48-spline` therefore fires "BB spindle mismatch —
won't fit" comparing two DIFFERENT axes — a false red, and the same model could equally false-PASS
a 48-spline/24 mm crank against any `48-spline` BB regardless of bore. *Confidence: confirmed —
manufacturer product data (Fit's own BB-kit spec) pins the 48-spline+24 mm pairing directly;
BMXunion + capitalbmx (BMX-retailer/technical tier, corpus rule 5) supply the diameter-not-spline
BB principle and the spline=arm-interface definition, mutually consistent and matching Fit's own
part.* Source: fitbikeco.com "48 Spline Complete BB Kit 24mm" product page (fetched via search,
"1 x 48 Spline 24mm spindle / 2 x Sealed 24mm bearings"); capitalbmxbrand.com "Buying BMX Cranks"
(fetched — spline = arm-to-spindle joint vs diameter = the axle through the BB); bmxunion.com "What
Size BMX Cranks Do I Need?" (fetched — bearing must match spindle diameter); Rant Bangin' 48 /
Bangin' 8 product listings (sourcebmx.com / americancycle.com, 48-spline at 19 mm + 8-spline at
19 mm), 2026-07-24. Cross-reference: FRM-15 (whose "48-spline American ~22.2 mm" refers to the
LEGACY one-piece/American conflation, not this modern arm-interface axis), FRM-48 (shell×diameter
matrix), FRM-16 (piece-count axis). Recommended data-model action (for the coordinator, not made
here): split the BMX spindle axis into a BB-constrained `spindleDiameter` (19/22/24/30 mm) and a
BB-agnostic `splinePattern` (8-spline / 48-spline / bolt-drive), mirroring the MTB BB's
`shell`-vs-`spindle` separation, so the `bmx-bb-spindle` check compares diameter-to-diameter only.

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

## UDH revision history (master round 2 — L3 frame-standards minutiae)

**FRM-51 — The UDH frame specification is a revision-controlled SRAM engineering drawing
(90-7518-190-000), currently at Rev H, and it carries its own REVISION RECORD block.** This is
the primary artifact behind the whole UDH standard: drawing number **90-7518-190-000**,
**Revision H**, distributed as `UDH&FULL_MOUNT_RD_FRAME_SPEC_REV_H.pdf` inside the
`UDH_And_Full_Mount_Rear_Derailleur_Rev_H.zip` frame-builder package. The zip's internal file
dates are **2023-03**, and it also ships the 3D clearance models
(`UDH&FULL_MOUNT_RD_3D_MODELS.stp`) and a "Possible Hangerless Interface design variants" PDF.
The drawing's revision block names the responsible engineers per revision (THARCKE for E,
TBRAKOWSKI for F/G/H). *Confidence: confirmed (primary engineering drawing fetched and
text-extracted).* Source: universalderailleurhanger.com → `/downloads/UDH_And_Full_Mount_Rear_Derailleur_Rev_H.zip`
(fetched 2026-07-18; note the zip 403s unless requested at its real `/downloads/` path, which
must be read out of the page HTML). Cross-reference: FRM-41, FRM-42.

**FRM-52 — Revision-by-revision, what actually changed (Rev E → H), from the drawing's own
REVISION RECORD.** Verbatim-sourced summary of the recorded changes:

| Rev | Eng. | Recorded change (abridged from the drawing's own wording) |
|---|---|---|
| B | *(from FRM-41)* | ADD: dimensions for **148 mm OLD** frames |
| D | *(from FRM-41)* | ADD: UDH hanger dimensions sheet |
| E | THARCKE | ADD: UDH hanger dimensions (sheet 6); front cable-entrance dummy 90-7518-190-090 (sheets 4 + 5). CHANGE: rear cable *entrance* dummy — **was** rear cable *exit* dummy |
| F | TBRAKOWSKI | ADD: **142 OLD + 157 OLD info (sheet 3)**; **alignment clearance model for UPPER IDLER PULLEY**; **chain-length-calculation / idler-pulley info (sheet 6)**. CHANGE: **geometry of 3D model 90-7518-190-070**; document renamed — `UDH&FULL_MOUNT_RD_FRAME_SPEC` **was** `UDH DERAILLEUR HANGER FRAME SPEC`; **"HANGERLESS INTERFACE" was "UDH/NDG"**; OLD / axle length (sheet 3); sheet 7 was sheet 6 |
| G | TBRAKOWSKI | CHANGE: **OLD / axle length** again; clearance model `90-7518-190-070_REV_G` **was** `_REV_F`. ADD: notes (sheet 4), sheet 6 |
| H | TBRAKOWSKI | CHANGE: **OLD / frame tolerance**; **axle-length tolerance**; geometry of 3D model again; `90-7518-190-070_REV_H` **was** `_REV_G`. DELETE: front cable-entrance dummy view |

*(Rows B and D are carried from FRM-41, which read the **Rev E** drawing; the Rev H drawing's own
record block covers E–H only. The two drawings together give the A→H trail — this is why the
append-only rule pays: neither revision's block alone contains it.)*

**Three readings that matter mechanically.** (1) **OLD coverage EXPANDED across revisions**:
148 mm arrives at Rev B, but **142 mm and 157 mm are only added at Rev F**. UDH was not born
covering all three spacings — the "142/148/157" uniformity that SRAM's current frame-fit
document states is the *end state* of a six-revision progression. (2) The **terminology shift at
Rev F** — "Hangerless Interface" replacing "UDH/NDG", and the document renamed from a *hanger*
spec to a *hanger + full-mount-derailleur* spec — is the documentary moment UDH stopped being
only a replaceable-hanger standard and became the mounting interface Transmission depends on.
**Rev F is the pivotal revision.** (3) The **frame-side dimensions were revised in three
consecutive revisions** (F, G and H all touch OLD / axle length or its tolerance), and Rev F
additionally added the upper-idler-pulley clearance model — i.e. high-pivot frame support is
also a later addition. A frame designed to an early UDH revision is therefore not automatically
dimensioned to the current one. *Confidence: confirmed.* Source: as FRM-51; rows B/D via FRM-41.

**FRM-53 [⚠ note for the coordinator — NOT a contradiction] — The engine's `udh` boolean is
revision-blind, and SRAM publishes no changelog mapping revisions to dates or to frame models.**
FRM-52 establishes that the UDH frame interface changed dimensionally across revisions, which
means "this frame is UDH" is strictly less precise than the standard itself now is. **This is
*not* filed as `⚠ CONTRADICTION`**, for a reason worth recording: SRAM's own frame-fit
specification (GEN.0000000008642 Rev D, © 2026 SRAM) still states UDH applies uniformly to
**142 mm, 148 mm and 157 mm OLD** systems and directs frame builders to the single current spec
package — SRAM does not itself publish a per-revision compatibility split, so a rev-aware engine
rule **could not be sourced to the bar** and would risk a false "won't fit". The honest position
is: the boolean is correct at the tier SRAM documents. Recorded so a future round doesn't
mistake the absence of a rule for an unexamined gap.
**Concrete frame-fit numbers captured from the same document** for the record: axles must be
**bolt-type thru axles, 12 × 1.0 mm thread** ("No option for quick release"); the axle-length
relations are given as **L1 = D + OLD + 17 (−1)** and **L2 = D + OLD + 2 MIN**, with an
**OLD + 7 (−0/+3)** dimension and a stated **tolerance stack-up of 19.9 ± 0.1**. Total chain
growth must not exceed **54 mm for Eagle Transmission** and **90 mm for DH Transmission**.
*Confidence: confirmed.* Source: sram.com Eagle Transmission and DH Transmission FRAME FIT
SPECIFICATIONS, GEN.0000000008642 Rev D (fetched + text-extracted 2026-07-18);
`UDH&FULL_MOUNT_RD_FRAME_SPEC_REV_H.pdf` sheet 3. Cross-reference: FRM-10, FRM-41, FRM-42.

---

## Tapered-steerer CLASSES — "tapered" is not one interface (gravel/road vocab question, 2026-07-24)

**FRM-55 — "Tapered" names a FAMILY, not an interface: S.H.I.S. describes a fork with TWO
independent codes (upper steerer OD + lower crown-race seat OD), and the real market runs at
least four distinct round-tapered combinations.** Park Tool's SHIS reference (fetched, the same
document behind FRM-36/37) states the two-code structure directly — *"A bike may have one headset
standard at the top and a different standard and size on the bottom"* — and gives the two code
tables that make a taper class: **steering-column (stem-clamp) OD** 25.4 (1″) / 28.6 (1-1/8″) /
31.8 (1-1/4″) / 38.1 (1-1/2″), and **fork crown-race seat OD** 26 & 27 (1″) / 30 (1-1/8″) / 33
(1-1/4″) / 40 (1-1/2″). The corresponding head-tube bore IDs are separately toleranced and
genuinely different bores: **IS41 41.10–41.20 mm, IS42 41.95–42.05 mm, IS47 47.05–47.10 mm,
IS49 49.1–49.2 mm, IS52 52.1–52.15 mm** (Park Tool table, fetched this session; IS47 and IS52 are
the two figures FRM-37 did not carry). Because a taper is (upper code, lower code), the classes
are combinatorial, not a single "tapered" value. *Confidence: confirmed (fetched primary,
parktool.com SHIS page, direct quote + tables).* Source: parktool.com "Standardized Headset
Identification System (aka Headset Code)" (fetched 2026-07-24). Cross-reference: FRM-6, FRM-36,
FRM-37.

**FRM-56 — 1-1/4″→1-1/2″ is a genuinely DIFFERENT interface from 1-1/8″→1-1/2″ on BOTH ends, and
one maker documents all three common classes side by side under its own names.** Giant's own
technology page (fetched, maker primary) distinguishes: **OverDrive** road = *"1 1/8-inch top and
1 1/4-inch bottom bearings"*; **OverDrive** mountain = 1-1/8″ top and 1-1/2″ bottom; **OverDrive
2** = *"Oversized headset bearings (1 1/4-inch top and 1 1/2-inch bottom bearings) and a tapered
steerer tube"*, and Giant lists a **"1 1/4-inch stem"** as a required component of the OverDrive 2
system. That last clause is the load-bearing consequence for a fit checker: changing the UPPER of
the taper changes the **stem clamp diameter** (28.6 vs 31.8 mm) as well as the upper head-tube
bore/bearing (IS42-class vs IS47-class), so a 1-1/4″-upper fork is incompatible with both an
ordinary 1-1/8″ head tube AND an ordinary stem. Independently corroborated on the LOWER end by a
maker-primary fitment statement: White Industries' own IS42/IS52 headset page (fetched) says it is
for *"frames with integrated 42mm upper and 52mm lower head tubes"* and requires a tapered **1-1/2″
(40 mm)** fork crown race — a 1-1/4″ (33 mm) crown race does not seat in it. *Confidence: confirmed
(two independently fetched maker-primary pages, direct quotes).* Source: giant-bicycles.com
"OverDrive 2 / OverDrive" technology page (fetched 2026-07-24); whiteind.com IS42/IS52 headset
product page (fetched 2026-07-24). Cross-reference: FRM-55, FRM-57.

**FRM-57 — The interchangeability that DOES exist is direction-aware and never symmetric: a
bigger frame/stem can be shimmed down to a smaller fork, never the reverse.** Two real,
maker-catalogued adapters, both running big→small only: (a) **head-tube side** — Cane Creek's
IS47-to-IS41 headset adapter, described by its listing as a *"Headset adapter for IS47 (1 1/4″ IS)
frames for use with straight 1 1/8″ forks"* (retailer-hosted product description of a Cane Creek
part — retailer tier, corroborating only); (b) **stem side** — Ritchey's own Stem Shim Adaptor
page (fetched, maker primary) states it *"converts forks with a 28.6mm (1″-1/8″) steerer to be
compatible with 31.8mm (1-1/4″) diameter stems"* (and 25.4→28.6), i.e. **small steerer into large
stem clamp**. No maker-catalogued part does the opposite on either end — you cannot add bore to a
head tube or remove material from a steerer, so a 1-1/4″ fork in a 1-1/8″-upper frame, or a
1-1/8″-clamp stem on a 1-1/4″ steerer, is a hard won't-fit. This is the same asymmetry shape as
the engine's dropper-vs-seat-tube rule 13 (too big = error, smaller = shim warning) and the rotor
CL/6-bolt rule. *Confidence: mixed — maker-primary confirmed for the Ritchey stem-shim direction;
medium for the Cane Creek IS47→IS41 head-tube adapter (retailer description of a real Cane Creek
SKU; Cane Creek's own product page for it was not reachable this session).* Source:
ritcheylogic.com "Stem Shim Adaptor" (fetched 2026-07-24); bike-components.de Cane Creek
IS47-to-IS41 adapter listing (fetched 2026-07-24, retailer tier).

**FRM-58 — A real gravel bike documents the 1-1/4″×1-1/2″ class in the maker's own words, and it
is NOT the same fact as the steerer's SHAPE — the two can disagree, which is a live catalog trap.**
Cervélo's own support/spec page for the **Áspero-5 Disc MK1** (fetched, maker primary) states the
headset as **1-1/4″ × 1-1/2″**, with upper bearing **34 × 46.8 × 7, 45°×45°** and lower bearing
**40 × 51.8 × 7.5, 36°×45°** — i.e. an IS47-class upper (46.8 mm OD) over an IS52-class lower
(51.8 mm OD), the exact 1-1/4″→1-1/2″ combination of FRM-56. **However**, the same bike's service
reference (CER-ALB-EX-V1, Frame Code FM164, cited in `src/schema-gravel.js`) states *"Fork Steerer
Type: Cervelo D-Shaped"* — a non-round tube. Both are true and they describe different things: the
1-1/4″×1-1/2″ figure is the **bearing/head-tube envelope**, the D-shape is the **steerer's own
cross-section**. A round 1-1/4″ fork still will not fit this frame and no round stem clamps a
D-shaped tube, so the gravel catalog's existing `cervelo-d-shaped` steerer token is the **correct,
honest** value for this row and must NOT be re-labelled to any round tapered token on the strength
of the "1-1/4 x 1-1/2" headset line. *Confidence: confirmed (fetched Cervélo maker-primary spec
page) for the bearing figures; the D-shaped steerer line is carried from the in-repo citation of
Cervélo's own service reference.* Source: cervelo.com support page "ASPERO-5 DISC MK1" (fetched
2026-07-24); `src/schema-gravel.js` steerer-vocab comment citing Cervélo CER-ALB-EX-V1.
Cross-reference: FRM-56, FRM-59.

**FRM-59 — ⚠ CONTRADICTION (vocab-tier, gravel + road): a single generic `tapered` token cannot
represent the taper classes FRM-55/56 establish, and the engine's exact-match steerer rule turns
that collapse into wrong verdicts in BOTH directions.** `src/schema-gravel.js` `GRAVEL_VOCAB.steerer`
= `['tapered','straight-1-1-8','straight-1-1-4','cervelo-d-shaped']`, and the gravel/road engine
(`src/compat-road.js`) compares frame `steerer` vs fork `steerer` as an exact match (the same field
is also read on `stem` and `headset` rows). With one `tapered` value: a 1-1/4″→1-1/2″ fork and a
1-1/8″→1-1/2″ frame both read `tapered` and would return a **false "fits"** (per FRM-56 the upper
bore, the upper bearing and the stem clamp all differ); conversely, workers refusing to enter
1-1/4″-upper frames rather than mislabel them means those bikes are **absent from the catalog**,
which is the honest-but-costly failure mode. This is a **vocab/data-model** contradiction, not an
engine-logic one — the exact-match rule is correct; the value space it compares is too coarse.
Flagged for the coordinator per `tools/MECHANIC-FINDINGS-INTAKE.md`; **this corpus proposes, it
does not edit.** *Confidence: confirmed (the vocab list and the exact-match semantics are both
read directly from the repo; the mechanical distinctness is FRM-56's fetched maker primaries).*
Source: `src/schema-gravel.js` (GRAVEL_VOCAB.steerer + its own comment block), `src/compat-road.js`;
mechanical basis FRM-55/56/57. Cross-reference: FRM-5, FRM-6, FRM-56.

**FRM-60 — Naming: manufacturers describe a taper by its two INCH sizes, upper-first, not by a
brand or a bare "tapered" — so a vocab token should carry both ends.** Every maker-primary fetched
this session names the pair, never a single word: Giant *"1 1/8-inch top and 1 1/2-inch bottom"* /
*"1 1/4-inch top and 1 1/2-inch bottom"*; Cervélo *"1-1/4″ X 1-1/2″"*; White Industries *"42mm
upper and 52mm lower"*. The industry's own machine-readable form for the same information is the
S.H.I.S. pair (e.g. `IS42/28.6 | IS52/40` vs `IS47/31.8 | IS52/40`), which the catalog already
models *separately* on the frame side (`headTubeUpper`/`headTubeLower` on MTB frames, FRM-8) — so
the mechanic-honest naming for a fork-side taper token is a two-ended one, e.g. `tapered-1-1-8-1-1-2`
and `tapered-1-1-4-1-1-2`, mirroring the existing `straight-1-1-8` / `straight-1-1-4` convention
already in `GRAVEL_VOCAB` rather than inventing a new naming style. *Confidence: confirmed
(naming observed verbatim across four independently fetched maker/standard sources).* Source: as
FRM-55/56/58. Cross-reference: FRM-8, FRM-37.

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
- **PARTIALLY CLOSED (FRM-41) → CLOSED 2026-07-18 master round 2 (FRM-51/52/53) — UDH
  revision-by-revision history, this chapter's named remainder.** FRM-41 had sourced the drawing
  at Rev **E** and left open "a full mapping of which physical dimension changed at which
  revision letter." That mapping is now transcribed line-by-line from the **Rev H** drawing's own
  REVISION RECORD block (`90-7518-190-000`, obtained from the frame-builder zip at
  universalderailleurhanger.com), giving an **A→H trail** when combined with FRM-41's B/D rows —
  neither drawing's block contains the whole history alone.
  **The substantive findings:** 148 mm OLD arrives at Rev B but **142 mm and 157 mm are only
  added at Rev F**, so UDH's spacing uniformity is an end state, not an origin; **Rev F is the
  pivotal revision** (it also renames the document from a *hanger* spec to a *hanger +
  full-mount-derailleur* spec, replaces "UDH/NDG" with "Hangerless Interface", and adds the
  upper-idler-pulley clearance model — i.e. high-pivot support is a later addition); and
  **F, G and H each revise OLD / axle length or its tolerance.**
  **The second open half of the old gap — "whether any revision requires a different UDH part
  for an older frame" — is answered NO at the sourceable tier and filed in FRM-53:** SRAM's
  current frame-fit specification (GEN.0000000008642 Rev D) still states UDH applies uniformly
  across 142/148/157 OLD and publishes no per-revision compatibility split, so a rev-aware engine
  rule **cannot be sourced to the bar** and the engine's revision-blind `udh` boolean is correct
  at the tier SRAM documents. Deliberately **not** filed as `⚠ CONTRADICTION`.
  **Remaining EXTERNAL:** SRAM publishes no changelog mapping revision letters to *dates* or to
  *frame models*, and only the current revision's package is distributed (older revs are not
  archived publicly). Revision *dates* and any frame-model↔revision mapping are therefore
  unobtainable from public sources — recorded as external rather than inferred.
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
- **CLOSED 2026-07-18 (FRM-49/50) — Shimano AND Campagnolo BB service internals.**
  Campagnolo's own dealer manuals source the bearings-on-the-crank-arm architecture, the
  wave-washer shell-tolerance mechanism, cup/central-bolt/chainring-screw torque figures, and a
  left-hand-thread titanium-bolt exception (FRM-49). Shimano's own dealer manuals (five
  independent PDFs, consistent) source the press-fit BB install/removal procedure — notably a
  qualitative zero-gap fit-check rather than a torque number for the press-fit action, plus the
  TL-BB12/TL-BB13 tool mechanism (FRM-50). Both proprietary systems this gap named are now
  sourced; remaining brand-specific BB depth (Trek BB90/95 service, other minor brands) is a
  narrower residual, not the original broad gap.
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
