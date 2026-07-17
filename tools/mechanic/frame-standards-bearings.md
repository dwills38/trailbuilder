# Frame Standards & Bearings — Mechanic Corpus

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

### Wear / setup couplings
- **Tight spindle-in-shell pairs trade bearing life** (FRM-3): 30 mm-in-41 mm-bore is servable
  but bearing-life-constrained vs 24 mm — the durability coupling behind the "which pairs do you
  talk customers out of" question.
- **Press-fit shells + creak:** press-fit BBs (PF92 etc., FRM-2) are more prone to
  creak/service than threaded — a maintenance coupling, not a fit rule.
- **A mis-selected bearing kit (right shell, wrong spindle spacers) runs rough** — the BMX
  shell×spindle matrix (FRM-15) is fundamentally about the *bearing* fit, which is why it was
  left to purchasable-BB exact checks rather than a guessed matrix.

---

## Open mechanic questions (for the human review — do not act)
- FRM-2: any real case where a 68 mm vs 73 mm BSA shell genuinely needs different BBs (frame-
  specific spindle length, not the shell standard itself)?
- FRM-3: which spindle×shell pairs do you actively talk customers out of (short bearing life)?
  Any pair you've been unable to source a BB for?
- FRM-11: do third-party/machined dropout conversions run Transmission reliably in the wild?
- FRM-15 [BMX]: enumerate the real shell×spindle bearing-kit matrix — which combos exist via
  adapter (e.g. American shell + 19 mm spindle) so a future rule doesn't false-error them?
