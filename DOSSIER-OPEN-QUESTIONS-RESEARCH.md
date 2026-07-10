# Dossier Open Questions — Pre-Research Pass

**Date:** 2026-07-10 · **Scope:** every "Ask" line / flagged unverified claim in
[`EXPERT-REVIEW-DOSSIER.md`](EXPERT-REVIEW-DOSSIER.md), researched against **fetched primary
documentation only** (manufacturer pages/PDFs actually retrieved this session — search-result
snippets are never treated as sources, per THE BAR). Rule-area names and numbering mirror
[`tools/MECHANIC-FINDINGS-INTAKE.md`](tools/MECHANIC-FINDINGS-INTAKE.md) §1 so mechanic findings
can be cross-checked line-by-line.

**Purpose:** when the mechanic's findings land, each finding can be laid against this pass. Where
mechanic and research agree → apply fast via the intake checklist. Where they DISAGREE → that
disagreement is the highest-value follow-up question, because one side is wrong about something
we now have a primary source for.

**This pass changes nothing** — no code, schema, test, or catalog edits. Verdict vocabulary used
below: **confirmed** (fetched primary source supports the claim as stated), **partial** (core
supported, an element unsourced or challenged), **refuted** (fetched source contradicts),
**unsourceable** (no primary doc reachable/existing this session). Anything marked *inference*
is reasoning, not source.

## Summary

| # | Rule area (`ruleId`) | Dossier ask | Provisional verdict | Confidence |
|---|----------------------|-------------|--------------------|------------|
| 1 | Wheel sizing (`wheel-config`) | Hard-reject reverse-mullet OK? | **unsourceable** — no maker supports 27.5F/29R; rejection follows from "matches no frame config" | medium |
| 2 | Axles (`rear-axle`) | SuperBoost + Boost wheel: error with *no adapter path* — correct? | **partial — rationale challenged**: verdict plausibly right, but a Problem Solvers 148→157 kit EXISTS (needs 4.5 mm re-dish) | high (kit's existence), open (tier) |
| 3c | Chainring standard (`chainring-standard`) | One-directionality right? | **confirmed both directions** (SRAM model pages + Wolf Tooth profile page) | high |
| 4 | Transmission needs UDH (`udh`) | Edge cases (aftermarket hangers, conversions)? | **confirmed**; only per-frame retrofit kits, no universal conversion documented | high |
| 5 | Cassette vs derailleur capacity (`cassette-capacity`) | Confirm one-sidedness; b-screw caveat worth a warning? | **confirmed** ("Backwards compatible, works with both 10-50t and new 10-52t" — SRAM); b-screw = setup, mechanic judgment | high / open |
| 6 | Freehub (`freehub`) | Separate-row modeling honest enough? | **confirmed** swappability premise (DT Swiss: tool-free conversion "to any drive train standard"); message wording = judgment | high / open |
| 7 | BB advisory (`bb-advisory`) | Every spindle×shell pair servable? Which deserve a warning? | **partial** — tightest pair (30 mm in BB92) IS servable (Wheels Mfg, dual-row bearings + spindle-length restriction); candidate for the "deserves a warning" slot | medium-high |
| 8 | Brake mounts (`front/rear-brake-mount`) | PM-size delegation to rotor min/max leak? | **confirmed structurally** (SRAM chart: no config below native PM size; spacers/brackets only upward); leak = forks without sourced `minRotorF` (known dormancy) | high |
| 9 | Rotor interface (`front/rear-rotor-interface`) | One-piece-only caveat right? Warning vs info? | **partial** — restriction consistently attributed to the Shimano manual but NOT maker-fetched (all Shimano doc hosts 403); tier = judgment | medium |
| 10 | Rotor size (`*-rotor-max`, `front-rotor-min`) | Promote over-max to error? | **partial** — spec lines re-fetched literal ("Minimum Rotor Size: 200mm / Maximum Rotor Size: 220mm", ZEB Select); tier = judgment call the engine already treats as visible-warning | high (basis) / open (tier) |
| 11 | Steerer (`steerer`) | Model anything before 1.8"? | **confirmed no-action** — 1.8" is real but e-bike-centric (Bikerumor fetched); vocab-widen when e-bikes enter | medium-high |
| 12 | Fork travel (`fork-travel`, `fork-travel-min`) | ~1°/20 mm fair? Tier right? | **partial** — trig inference supports ~0.9°/20 mm; BONUS: fetched Santa Cruz "wouldn't recommend less travel than [170 mm]" = first candidate `minForkTravel` datum | medium (math) |
| 13 | Dropper (`dropper-*`) | Shim=warn, too-big=error right? 200 mm info threshold? | **confirmed** — PNW's own guide states the exact asymmetry; threshold = judgment | high / open |
| 14 | Tire vs rim (`*-tire-rim`, `front-tire-fork`) | Trust ETRTO-style width guidance? | **answered** — Schwalbe-published ETRTO-2024 table fetched (e.g. 28–30 mm rim → 47–71 mm tire); WTB's own chart deliberately exceeds ETRTO ("Proceed at your own risk") | high |
| 15 | Bar/stem clamp (`bar-stem-clamp`) | (No ask — "no known caveats") | **partial — "no caveats" challenged**: Problem Solvers sells a 31.8→35.0 bar shim; asymmetric-shim question now mirrors rule 13 | high (product exists) / open (practice) |
| 16 | Rear shock (`shock-*`) | Linear travel estimate OK? Mention stroke spacers? | **confirmed** — RockShox service manual: Travel Reducers (2.5/5/7.5 mm) official, same body multi-stroke, "consult your frame manufacturer"; linear estimate = inference, fine for a warning | high / medium |
| 17 | Bundling / OEM-only (`bundled-shock` etc.) | (No ask) | **unsourceable this session** (specialized.com wall); app-policy claims | low |
| 18 | Rear tire vs frame (`rear-tire-frame`) | Per-flip-chip clearance worth modeling? | **answered** — Santa Cruz publishes ONE figure ("Max Tire Clearance: 2.5\""), flip-chip described geometry-only; single-figure modeling matches the maker | high |
| 19 | Shifter mount (`shifter-mount`) | Generation matrix right? | **confirmed** — Shimano's own C-157 chart: same-generation only, all cross-gen "−" | high |
| N1 | Non-rule: SuperBoost×Boost chainline | Agree with silence? | **confirmed-keep-silent** — chainline is a real axis (52 vs 55 mm variants on SRAM pages) but NO doc prohibits the mix; a red stays unsupported | medium-high |
| N2 | Non-rule: 52T mech + 10-50 | Agree? | **confirmed** — same SRAM quote as rule 5 | high |
| N3 | Non-rule: disciplines never gate | Agree? | **confirmed** (definitionally; annotation-only) | high |
| N4 | Non-rule: pedals | Agree? | **confirmed** (9/16-20 TPI universal on adult cranks — *inference*, trivial) | high |

**Totals: 23 items — 14 confirmed · 7 partial · 2 unsourceable · 0 engine *verdicts* refuted.**
Two *rationales/wordings* were challenged by fetched sources: rule 2's "no adapter path" and
rule 15's "no known caveats" — both are tier/wording questions for the mechanic, not verdict
reversals. Five bonus sourced data points for dormant/gap work were captured (see §Bonus).

---

## Rule-by-rule

### 1. Wheel sizing — reverse mullet hard-reject (`wheel-config`)

**Ask:** "is hard-rejecting reverse-mullet correct, or does some niche legitimately run it?"

**Provisional answer:** **Unsourceable, but the rejection is structurally safe.** No manufacturer
documentation could be found (or is believed to exist) supporting a 27.5" front / 29" rear
configuration; no production frame lists it among its wheel configurations. The engine's logic
is "the pair must match a configuration some frame publishes" — 27.5F/29R matches none, so the
red follows from the data model rather than from a belief about physics. Web usage of the term
"reverse mullet" is inconsistent (most hits describe ordinary 29F/27.5R mullet), and the only
27.5F/29R chatter is forum experimentation, which is not a source.

**Sources:** none fetchable that address it (absence-of-support is the finding). *Inference:*
larger-rear/smaller-front inverts the geometry changes mullet is chosen for (slacker head angle,
BB drop balance) — steepens the front and raises the rear; no maker ships or rates it.

**Confidence:** medium (can't prove a negative from primary docs).

**Mechanic follow-up:** have you *ever* seen a deliberate 27.5F/29R build with a defensible use
case (trials/dirt-jump conversions?)? If yes, is it something a compatibility tool should permit
with a warning, or correctly reject?

---

### 2. Axles — SuperBoost frame + Boost rear wheel (`rear-axle`)

**Ask:** "SuperBoost frame + Boost rear wheel = error with no adapter path — correct?"

**Provisional answer:** **The error tier is plausibly still right, but the "no adapter path"
rationale is contradicted by a fetched maker page.** Problem Solvers (QBP house brand) sells a
**Super Booster Rear Hub Spacing Kit** whose fetched product page states it *"adapts a 148 x 12mm
rear hub to a 157 x 12mm spaced frame (Boost to SuperBoost)"* and *"Requires re-dishing the rear
wheel 4.5mm to the non-drive side."* A 9 mm spacer kit + 4.5 mm re-dish is a real, purchasable
path — but re-dishing is wheel-building work (spoke tension re-balance), not a bolt-on adapter
like the rule-9 rotor adapter. Third-party kits also exist (Tairin "SuperBooster" 148→157).

**Sources (fetched):**
- https://problemsolversbike.com/products/super-booster-hub-spacing-kit-rear — quotes above.

**Confidence:** high that the kit exists and what it requires; open on the right tier.

**Mechanic follow-up (high value):** in shop practice, is a Super Booster–style conversion an
"everyday fix" (→ rule-9-style warning carrying a structured `fix`) or a wheel-rebuild-level
job most customers shouldn't be steered into (→ keep the error, possibly mention the kit in the
message)? Also: does the kit's rotor-side geometry (re-dish moves the rotor) cause caliper
alignment issues you see in practice? *(Do not soften the red without this answer — THE BAR.)*

---

### 3c. Chainring standard — one-directional (`chainring-standard`)

**Ask:** "is 3c's one-directionality right? Any real-world T-Type ring + Eagle chain problems?"

**Provisional answer:** **Confirmed in both directions by fetched pages.**
- *T-Type ring + Eagle chain = fine (the direction the engine keeps silent):* SRAM's own model
  pages for the Eagle Transmission Direct Mount Chainring (CR-TTYP-DM-D1) and the GX Eagle
  Transmission crankset (FC-GX-D1) both list **"Chain Technology: Eagle, T-Type"** — SRAM itself
  publishes the T-Type ring as compatible with both chain families.
- *Flattop chain + non-T-Type ring = error (the direction the engine reds):* Wolf Tooth's
  tooth-profile compatibility page states its standard profile (Drop-Stop A) is **"Not compatible
  with 12-speed SRAM Transmission (T-Type) and Road Flattop"** chains, and gives the physical
  mechanism for the T-Type-compatible profile: **"Valley between teeth is deeper to accommodate
  larger rollers on Flattop chain."** SRAM's 2021 MTB Compatibility Map (fetched PDF) adds the
  system-level footnote **"Eagle chains are only compatible with SRAM Eagle 1x12 systems."**

**Sources (fetched):**
- https://www.sram.com/en/sram/models/cr-ttyp-dm-d1
- https://www.sram.com/en/sram/models/fc-gx-d1
- https://www.wolftoothcomponents.com/pages/chain-compatibility-by-chainring-tooth-profile (via
  direct HTML retrieval; quotes above)
- https://www.sram.com/globalassets/document-hierarchy/compatibility-map/mtb/2021-mtb-components-compatibility-map.pdf

**Confidence:** high.

**Caveat worth recording (catalog-vocab risk, not a rule bug):** dual-compatible aftermarket
rings exist — Wolf Tooth Drop-Stop B is published compatible with **both** "12-speed SRAM Eagle"
and "12-speed SRAM Transmission (T-type) Flattop." A future catalog row for such a ring tagged
`ringStd:'standard-12'` would false-red against a Flattop chain. If such rings are ever entered,
`ringStd` needs either the `'t-type'` tag (accurate for chain-fit purposes) or a widened vocab.

**Mechanic follow-up:** any real-world trouble running T-Type rings with Eagle chains (wear,
retention) that SRAM's compatibility listing doesn't capture?

---

### 4. SRAM Transmission needs UDH (`udh`)

**Ask:** "any edge cases (aftermarket hangers, frames converted)?"

**Provisional answer:** **Confirmed.** SRAM's fetched "Understanding UDH and Full Mount" page:
**"Full Mount derailleurs mount to frames that use the UDH interface. If you have Universal
Derailleur Hanger, your bike is ready for any of SRAM's Full Mount derailleurs."** The fetched
GX Transmission derailleur page (RD-GX-E-B1) describes the **"Hangerless Interface, Full Mount
attachment method"** mounting **"around the wheel axle itself … with no hanger required."**
No SRAM doc describes a universal conversion for non-UDH frames; the known edge cases are
**frame-maker retrofit kits** (the catalog already models RAAW's Madonna V2.2 kit), which are
per-frame data (`udh:true` on the converted row), not a rule change. The Transmission Frame Fit
Specification PDF is dealer-login-walled (noted in §Walls), so dropout-geometry fine print
could not be re-verified this session.

**Sources (fetched):**
- https://www.sram.com/en/learn/understanding-udh-and-full-mount
- https://www.sram.com/en/sram/models/rd-gx-e-b1

**Confidence:** high.

**Mechanic follow-up:** have you seen third-party/machined dropout conversions (non-frame-maker)
that actually run Transmission reliably? If those exist in the wild, should the tool still treat
the *stock* frame as non-UDH (we think yes — the row describes the frame as sold)?

---

### 5. Cassette range vs derailleur capacity — one-sided (`cassette-capacity`)

**Ask:** "confirm the one-sidedness; any b-screw/setup caveat worth a warning?"

**Provisional answer:** **One-sidedness confirmed by SRAM's own model pages.** The current GX
Eagle mechanical derailleur page (RD-GX-1-B2) states: **"Backwards compatible, works with both
10-50t and new 10-52t cassettes."** The GX Eagle AXS page (RD-GX-1E-A1) states it **"is
compatible with our new expanded range 10-52t cassette as well as our 10-50t cassette."** So a
52T-capable derailleur with a 10-50 cassette is documented-fine → the engine's silence in that
direction is correct, and the recorded refutation of the old "error both ways" proposal stands.
The other direction (52T cassette on a 50T-max mech) is what the engine already errors on via
`maxCog`, matching the per-model max-tooth spec.

The **b-screw/setup caveat**: SRAM's manuals treat b-gap adjustment as required setup per
cassette (chain-gap tool), i.e. *procedure*, not *compatibility*. Whether that deserves a
warning tier in a fit-checker is a product/mechanic judgment; nothing fetched suggests a
compatibility failure when set up correctly.

**Bonus sourced nuance (new):** the RD-GX-1E-A1 spec table lists **"Max tooth: 52"** and
**"RD Minimum (Cassette): 50"** — SRAM publishes a *minimum* cassette size for that derailleur,
an axis the engine does not model (`derailleur.maxCog` only). *Inference:* pairing a 52T-rated
AXS mech with, say, an 11-42 cassette would be out of SRAM's published envelope and the engine
would stay silent. Candidate future dormant check (`minCog` on derailleurs), data-gated like
rule 18.

**Sources (fetched):**
- https://www.sram.com/en/sram/models/rd-gx-1-b2
- https://www.sram.com/en/sram/models/rd-gx-1e-a1

**Confidence:** high (one-sidedness); open (b-screw tier; minimum-cassette real-world severity).

**Mechanic follow-up:** (a) is the b-gap reset when swapping 10-50→10-52 ever *missed* in ways
that damage parts — i.e., does it earn a warning, or is it just standard install work? (b) Does
anyone actually run big-capacity mechs on small cassettes ("RD Minimum") and does it shift
acceptably — worth modeling or noise?

---

### 6. Freehub vs rear wheel — separate-row modeling (`freehub`)

**Ask:** "is 'needs the XD version of this wheel' (separate row) honest enough, or should the
error message mention body swaps explicitly?"

**Provisional answer:** **The swappability premise is confirmed at the source; the wording
question is a product call.** DT Swiss's fetched Ratchet technology page: **"The no-tool concept
makes it easy to convert the freehub body to any drive train standard"** — conversion kits exist
per standard (HG / XD / Micro Spline) for Ratchet hubs. So the real world is: on major platforms
the freehub is a swappable part, and the catalog's separate-row modeling (one row per offered
config) is factually honest but hides the swap path from the error message. SRAM's 2021
compatibility map (fetched) confirms the cassette-side requirement (Eagle 10-52/10-50 XG
cassettes → XD driver) and notes XD→XDR spacer compatibility (road-relevant only).

**Sources (fetched):**
- https://www.dtswiss.com/en/wheels/wheels-technology/ratchet-ln-technology
- https://www.sram.com/globalassets/document-hierarchy/compatibility-map/mtb/2021-mtb-components-compatibility-map.pdf

**Confidence:** high (swap kits real); open (message wording).

**Mechanic follow-up:** would you rather the red say "…or swap this wheel's freehub body to XD
(sold separately, hub-dependent)"? Is a freehub swap counter-work you'd hand any customer, or
hub-model-dependent enough that naming it risks overpromising (pawl-hub exceptions, e.g. DT 370
needing an upgrade kit first)?

---

### 7. Bottom bracket advisory (`bb-advisory`)

**Ask:** "every current spindle×shell pair is servable with a real BB — will that stay true?
Which pairs deserve a real warning (e.g. 30 mm spindle in PF92)?"

**Provisional answer:** **Partial — the historically tight pair is confirmed servable, with the
caveats that make it the natural "deserves a warning" candidate.** Wheels Manufacturing's fetched
BB86-to-30mm product page: **"Compatible with 30mm diameter spindles and frames with the
following Bottom Bracket Standards (41mm ID BB shell): BB86, BB92, PF24, PF90, BB104/107, PF121,
BPF132"** — using **"Enduro Dual-Row ABEC-3"** bearings, with the restriction **"Crankset spindle
length must be longer than 104mm when used in a 86.5mm wide BB shell."** *Inference:* the
dual-row small-ball design exists precisely because a 30 mm spindle inside a 41 mm bore leaves
minimal radial space — the pair is servable but bearing-life-constrained relative to DUB
(28.99 mm) or 24 mm spindles in the same shell; that matches its reputation. DUB-in-everything
and 24 mm-in-everything remain widely served (SRAM/Shimano ecosystems; not individually
re-fetched — low risk). e*thirteen P3 pairings could not be re-verified (their support host
403s, see §Walls).

**Sources (fetched):**
- https://wheelsmfg.com/bb86-to-30mm-flanged-dual-row-pressfit-86-92-abec-3-bottom-bracket.html

**Confidence:** medium-high.

**Mechanic follow-up:** in shop reality, which spindle×shell pairs do you actively talk
customers out of? Is 30 mm-in-BB92 warning-worthy (short bearing life) or fine for the riding
this tool targets? Any pair you've genuinely been unable to source a BB for?

---

### 8. Brake caliper mounts — PM-size delegation (`front/rear-brake-mount`)

**Ask:** "is delegating PM-size protection to rotor min/max sufficient, or does it leak?"

**Provisional answer:** **Structurally confirmed — the delegation encodes exactly what SRAM's
own mounting chart encodes.** SRAM's fetched "Disc Brake Caliper Mounting Specifications for
Road and MTB" (GEN.0000000005232 Rev V, 2025) Post Mount tables list, per native mount size
(140/160/180/200/203 Post), a hardware configuration **only at the native rotor size ("Direct")
and above it** (spacers "S" / brackets "P": 10 S, 20 S, 20 P, 40 P, 3 S, 17 P…); **every cell
below the native size is a dash — no configuration exists.** That is the same information as
"min rotor = native mount size; adapters only space up," which is what rule 10's `minRotorF`
error implements. **The leak is exactly the documented dormancy:** forks without a sourced
`minRotorF` stay silent (e.g. a 160 mm rotor picked against a 200-native fork with no sourced
minimum would pass) — a data-coverage gap, not a logic gap. Populating `minRotorF` per fork
from maker pages (rule-18 template) closes it incrementally.

**Sources (fetched):**
- https://www.sram.com/globalassets/document-hierarchy/frame-fit-specifications/aftermarket/disc-brake-caliper-mounting-specifications-for-road-and-mtb.pdf

**Confidence:** high.

**Mechanic follow-up:** none needed on the logic; optionally — how often do you see under-size
rotors attempted on 200-native forks (i.e., how urgent is broader `minRotorF` data coverage)?

---

### 9. Rotor interface vs hub — adapter caveat (`front/rear-rotor-interface`)

**Ask:** "the adapter caveat says one-piece rotors only (not Hope floating / two-piece) — right?
Is warning the right tier or should adapters be a quieter info?"

**Provisional answer:** **Partial — direction and adapter existence are solid; the one-piece
restriction is consistently attributed to Shimano's manual but could not be maker-fetched this
session.** Every Shimano documentation host 403'd (si.shimano.com PDFs, productinfo product
pages render empty, manual mirrors blocked — §Walls). Multiple independent mirrors/search
surfaces of the SM-RTAD05 manual consistently quote: the adapter *"cannot be used with the
6-bolt disc brake rotor that is installed with an aluminum adapter (SM-RT86/RT76)"* (i.e.
two-piece/alloy-carrier rotors), plus a note that the adapter's structure allows *"more play
than normal"* with possible pad/caliper interference — **treat both as unverified-this-session
manual text, not fetched fact.** The engine's current message ("fits one-piece rotors only") is
consistent with that text and with the adapter's design purpose.

**Sources:** none fetched that state the restriction (documented wall). Direction/adapter
existence already sourced in-repo (REVIEW.md #10 lineage).

**Confidence:** medium.

**Mechanic follow-up (good bench question):** (a) confirm from a physical SM-RTAD05 box/manual
or shop practice: do two-piece 6-bolt rotors (Hope floating, alloy-carrier) genuinely not seat
on the RTAD05-class adapter? (b) Tier: given the manual's own play/interference caveat, we lean
**warning is right, not info** — agree?

---

### 10. Rotor size — over-max tier (`front/rear-rotor-max`, `front-rotor-min`)

**Ask:** "should over-max be promoted to error? It's a manufacturer structural limit, but it
*mounts* — we kept it a warning and made warnings visible as yellow dots. Judgment call."

**Provisional answer:** **The factual basis is re-confirmed literal; the tier genuinely is a
judgment call, and the current design is defensible.** Re-fetched ZEB Select model page spec
lines: **"Minimum Rotor Size: 200mm"** and **"Maximum Rotor Size: 220mm"** — the min drives the
rule-10 error (physically unmountable below native), the max is a published limit on a part that
*would* physically mount. SRAM's fetched caliper-mounting PDF frames rotor sizing as
recommendation-plus-maker-limits: its rider-weight/discipline chart carries the footnote
*"Consult the fork or frame manufacturer's specifications before installing…"* (rotor sizes
"have compatibility limitations on many forks and frames"). *Inference:* exceeding a published
max is out-of-spec/warranty rather than won't-mount — which is the definition of the engine's
warning tier ("fits/works but check something first"), now surfaced pre-pick as a yellow dot.

**Sources (fetched):**
- https://www.sram.com/en/rockshox/models/fs-zeb-sel-a2
- https://www.sram.com/globalassets/document-hierarchy/frame-fit-specifications/aftermarket/disc-brake-caliper-mounting-specifications-for-road-and-mtb.pdf

**Confidence:** high on the basis; the tier is explicitly the mechanic's call.

**Mechanic follow-up:** would you refuse to assemble an over-max build (→ error), or build it
with a signed-waiver conversation (→ warning)? Your answer decides the tier; we default to
keeping the warning.

---

### 11. Steerer / headset — 1.8" horizon (`steerer`)

**Ask:** "anything worth modeling before 1.8\" steerers arrive?"

**Provisional answer:** **No action needed for this catalog yet.** The 1.8" tapered steerer is
real and shipping but e-bike-centric. Fetched Bikerumor coverage of SR Suntour's "1.8 SuperTaper"
explicitly frames it as an eMTB stiffness/aesthetics standard ("if you're into eMTB…"), with
adoption on e-MTBs (RockShox and SR Suntour make 1.8 forks; e-bikes like Giant Reign E+/Trek
Rail use it per editorial coverage). E-bike ratings are already a declared non-modeled gap in
the dossier. The engine's exact-match `steerer`/`headset` model absorbs the new standard with a
one-token vocab widening (`'18taper'` or similar) + rows, when e-bikes enter the catalog —
nothing structural to pre-build.

**Sources (fetched):**
- https://bikerumor.com/sr-suntour-introduces-1-8-supertaper-steerer-tubes-and-upgrades-their-air-springs/

**Confidence:** medium-high.

**Mechanic follow-up:** are you seeing 1.8 on any *non*-e enduro frames yet?

---

### 12. Fork travel vs frame — the ~1°/20 mm number (`fork-travel`, `fork-travel-min`)

**Ask:** "~1° head-angle steepening per 20 mm is the number we quote — fair? Tier right?"

**Provisional answer:** **The number is sound as a rule of thumb (inference, shown work):**
raising/lowering the front axle by *h* pivots the frame about the rear contact patch;
Δangle ≈ arcsin(h / wheelbase). For h = 20 mm and enduro wheelbases ≈ 1230–1280 mm:
arcsin(20/1250) ≈ **0.92°** — "~1° per 20 mm" is accurate to within a decimal for the bikes this
catalog targets (fork-length change per travel change is ~1:1 on a given chassis). No maker doc
states the ratio generically (it's geometry, not a spec); we found none to cite and none is
needed for a warning-tier message. **Tier:** over-travel = warning matches the "mounts but
warranty-relevant" framing of rule 10 (same reasoning, same tier).

**Bonus — first candidate `minForkTravel` datum (dormant rule 12b):** Santa Cruz's fetched
Megatower support page states: **"Our geometry is based off of a 170mm fork with a 42 or 44mm
offset. We wouldn't recommend less travel than that, as the BB will get a bit low. Up to 180mm
is fine if that's your preference."** That is a maker-published travel floor in *recommendation*
wording ("wouldn't recommend"), vs the rule's "approved minimum" framing — activating on it is a
policy question (soft recommendation vs rated minimum), flagged for the mechanic/Douglas rather
than acted on.

**Sources (fetched):**
- https://www.santacruzbicycles.com/pages/product-support/megatower-2-my24 (the bonus datum)

**Confidence:** medium (inference; math shown).

**Mechanic follow-up:** (a) is ~1°/20 mm the number you'd quote a customer? (b) Should
"maker *recommends* ≥170 mm" wording activate the under-fork warning, or does the rule need
strictly *rated* minimums?

---

### 13. Dropper vs seat tube — direction + insertion nudge (`dropper-*`)

**Ask:** "shim = warning, too-big = error — right? Is the 200 mm info threshold sensible?"

**Provisional answer:** **The direction-aware split is confirmed in a dropper maker's own
words.** PNW's fetched "How to Choose a Dropper Post" guide: **"If you happen to purchase a
dropper post that is too small in diameter for your bike, you can use a shim to get it to fit
properly."** and **"if you purchase a dropper post that is too big in diameter, it's physically
impossible for it to fit your bike and it will need to be exchanged."** — exactly the engine's
error/warning asymmetry, from the maker the rule already cites. The same fetched guide walks
max-insertion measurement (*"Measure from the top of the seat collar down to anything in the
frame's seat tube that would stop the dropper post from inserting further"*), supporting the
insertion-depth info nudge as the honest stand-in while the app lacks a frame-size concept.
**The ≥200 mm threshold is a judgment value** — insertion problems also occur at 150–170 mm
drops on small frames; 200 is where they become common on *any* size. No source defines a
threshold; it's a UX dial.

**Sources (fetched):**
- https://www.pnwcomponents.com/blogs/news/how-to-choose-a-dropper-post

**Confidence:** high (direction); open (threshold).

**Mechanic follow-up:** at the counter, at what drop length do you *start* checking insertion
before selling — 170? 185? 200? (We'll match the info threshold to that.)

---

### 14. Tire vs rim width — trusting ETRTO defaults (`*-tire-rim`, `front-tire-fork`)

**Ask:** "rim maxTire values are partly sample guidance, not maker data (flagged per row) — how
much do you trust ETRTO-style width guidance as a default?"

**Provisional answer:** **The ETRTO envelope is now a fetched, quotable table — a defensible
conservative default; maker charts knowingly exceed it.** Schwalbe's published ETRTO-2024
combination table ("Possible combinations of tire widths and inner rim widths", fetched PDF,
read from the rendered table):
- inner rim **21–22 mm** → tire 25–65 mm; **23 mm** → 28–65 mm; **24 mm** → 29–65 mm
- inner rim **25 mm** → tire **29–71 mm**
- inner rim **26–27 mm** → tire **35–71 mm**
- inner rim **28–30 mm** → tire **47–71 mm** (≈ 1.85"–2.8" — a 2.4/2.5/2.6" tire on a 30 mm rim
  is squarely approved)
- inner rim **31–35 mm** → tire **58–83 mm**; **36–40 mm** → 66–95 mm
- plus the hookless note: *"Hookless or straight side rims may only be combined with TLE/TLR
  tires… regardless of intended use."*

The table defines **both a floor and a ceiling** per rim width — the deferred "tire too narrow
for rim" gap now has a hard source for its thresholds. Counterpoint, fetched from WTB's Tire &
Rim Fit methodology: WTB grades pairings optimal/compatible/not-suggested and states its
recommendations *"extend beyond current ETRTO recommendations, but allow for more optimal
performance. Proceed at your own risk."* — i.e., the industry's own charts deliberately run
wider than ETRTO. **Provisional policy answer:** ETRTO-2024 as the sample-row default (warning
tier, disclosed as guidance), maker-published clearance overriding it per row where fetched —
which is the engine's existing pattern.

**Sources (fetched):**
- https://www.schwalbe.com/media/f5/9b/3e/1716878352/Reifen_Felgenkombination_ETRTO_EN_(2).pdf
- https://www.wtb.com/pages/tire-rim-fit-chart

**Confidence:** high.

**Mechanic follow-up:** when ETRTO and a rim maker disagree (WTB-style "compatible but beyond
ETRTO"), which do you follow at the counter? Should the tool say "outside ETRTO guidance" even
when the maker blesses the combo?

---

### 15. Handlebar / stem clamp (`bar-stem-clamp`)

**Ask:** none in the dossier ("No known caveats; both live in the catalog.") — but research
turned up a caveat worth putting in front of the mechanic.

**Provisional answer:** **"No known caveats" is challenged: a maker-sold shim path exists for
one direction.** Problem Solvers' fetched Handlebar Clamp Shims page lists a **"31.8 to 35.0mm
(55mm Length)"** shim among its offerings and describes the line as *"Varieties available to
adapt 25.4, 26.0, 31.8, and 35.0mm stems for use with 22.2, 25.4, 26.0, and 31.8mm bars."* — a
31.8 mm bar can be shimmed into a 35 mm stem (WOOdman sells an equivalent). The reverse (35 bar
in 31.8 stem) is physically impossible. That is the same asymmetry shape as rule 13's dropper
shim. **We are NOT proposing a change** — the bar/stem interface is safety-critical
(carbon-bar clamp pressure, torque specs), shim practice there is far less universally endorsed
than seatpost shimming, and no *bar or stem maker's* doc endorsing it was fetched. Recorded so
the mechanic rules on it rather than it living as an unexamined "no caveats."

**Sources (fetched):**
- https://problemsolversbike.com/products/handlebar-clamp-shims

**Confidence:** high (the product exists); open (whether practice justifies a direction-aware
warning).

**Mechanic follow-up (tier question):** would you ever shim a 31.8 bar into a 35 stem on an
enduro bike (aluminum? carbon?), or is that a hard no at your bench? Hard no → rule stays a
symmetric error and we record why; routine → direction-aware warning like rule 13.

---

### 16. Rear shock — stroke direction + travel math (`shock-*`)

**Ask:** "travel is estimated linearly (frame travel × stroke ratio) — close enough for a
warning? Should shorter-stroke mention stroke spacers specifically?"

**Provisional answer:** **The stroke-reduction premise is confirmed in RockShox's own service
manual; the linear estimate is a reasonable warning-tier approximation (inference).** The
fetched 2023+ Super Deluxe service manual (GEN.0000000007157): **"Travel Change (optional):
Travel within the shock stroke range is changeable by installing a Travel Reducer and washer"**
— Travel Reducers come in **2.5 / 5 / 7.5 mm**, the same shock length covers multiple strokes
(e.g. 205/230 length spanning multiple listed strokes in its table), and some shocks ship with a
reducer installed *"as required for a particular bicycle frame."* The manual's own caution
matches the engine's warning text: **"Before increasing or reducing shock travel (stroke),
consult your frame manufacturer. Frame size and design determine allowable shock travel
(stroke). Too much travel (stroke) can cause damage to the shock or bicycle frame."**
- *Linear estimate:* rear travel ≈ frame travel × (stroke / design stroke) assumes a constant
  leverage ratio; real frames are progressive/digressive, so the true figure deviates by a few
  mm. For a quantified *warning* ("~158 mm instead of 165 mm") that's honest precision —
  *inference, mechanic to sanity-check.*
- *Naming:* RockShox's term is **"Travel Reducer"** — if the message names the mechanism, prefer
  "stroke/travel reducer spacers" over bare "stroke spacers" to match maker vocabulary.

**Sources (fetched):**
- https://www.sram.com/globalassets/document-hierarchy/service-manuals/rockshox/rear-suspension/2023-super-deluxe-service-manual.pdf

**Confidence:** high (stroke reduction supported); medium (linear estimate adequacy).

**Mechanic follow-up:** is a ±3–5 mm error in the quoted reduced-travel figure acceptable at
warning tier, or should the message drop the number and just say "less travel"? And should it
mention Travel Reducers by name (RockShox-specific) when the shock is from another maker?

---

### 17. Frame + shock bundling / OEM-only (`bundled-shock`, `package-only`, `oem-shock`)

**Ask:** none explicit.

**Provisional answer:** **Unsourceable this session.** The exemplar rows (Specialized Enduro
package-only) sit behind a documented fetch wall (specialized.com), and the rule encodes
commercial packaging facts rather than physical fit — the mechanic review has little to add
beyond "does the shop see these sold apart?" No research finding.

**Confidence:** low (nothing new).

**Mechanic follow-up:** only if convenient — do package-only frames (Enduro-style) ever reach
you as bare frames through distribution, making the "you'll still pay for the bundle" warning
misleading?

---

### 18. Rear tire vs frame clearance — flip-chip modeling (`rear-tire-frame`)

**Ask:** "Megatower's 2.5 is the 'stock setting' figure (flip-chip dependent) — is per-setting
clearance worth modeling, or is stock-setting honest enough?"

**Provisional answer:** **Single-figure modeling matches what the maker actually publishes —
the premise that Santa Cruz qualifies clearance per chip setting did not survive the fetch.**
The fetched Megatower 2 MY24 support page states **"Max Tire Clearance: 2.5\""** as one
unqualified figure, and describes the flip-chip purely geometrically: **"This setting lowers the
BB by 3.5mm, slackens the head angle by 0.3 degrees…"** — no per-position clearance is
published. So per-setting clearance modeling would *exceed* available maker data (nothing to
source it from), and the current single-value `maxTire:2.5` is exactly the maker's claim. The
dossier's "stock setting" hedge can be relaxed to "maker-published single figure" for this frame
when the dossier is next annotated. (If some *other* frame maker publishes per-chip clearance,
the rule-18 dormant template can carry the *more conservative* figure — same silence-beats-guess
policy.)

**Sources (fetched):**
- https://www.santacruzbicycles.com/pages/product-support/megatower-2-my24

**Confidence:** high.

**Mechanic follow-up:** none needed — unless you know a maker that *does* publish per-chip
clearance (then: model the conservative one?).

---

### 19. Shifter clamp vs brake-lever integration (`shifter-mount`)

**Ask:** "generation matrix right? Adapter-tier wording fair?"

**Provisional answer:** **Generation matrix confirmed by Shimano's own compatibility chart.**
Fetched productinfo.shimano.com chart **C-157 ("Compatibility of I-SPEC shifter and brake
lever")**: only same-generation pairings are marked compatible (✔); **every cross-generation
combination (EV×II, II×EV, B×EV, B×II, …) is marked "−"** — I-Spec generations are mutually
incompatible exactly as the engine treats them. The chart also notes clamp-band shifters can
join I-SPEC levers *"if the upper body is replaced with an integral unit"* (Shimano's own
partial-conversion path). The warning message's "band-clamp version or a ShiftMount-style
adapter" wording is consistent with the aftermarket (Wolf Tooth ShiftMount converts shifter
mount standards; product line not fetched this session — known but unneeded given C-157).
Warning tier (not error) matches reality: the drivetrain works; the mounting is what needs a
part swap/adapter.

**Sources (fetched):**
- https://productinfo.shimano.com/en/compatibility/C-157

**Confidence:** high.

**Mechanic follow-up:** wording only — is "ShiftMount-style adapter" the phrase you'd use, or
do you quote band-clamp swaps first?

---

## Deliberate NON-rules — research check

### N1. SuperBoost frame + Boost-chainline crank: NO error — **confirmed-keep-silent**
Chainline is a real published axis (fetched SRAM crank pages list e.g. **"Chainline: 55.0mm"**
on the GX Transmission crank; 52 mm variants exist across the DUB line), but **no fetched maker
document prohibits running a Boost-chainline crank in a SuperBoost frame** — and the pinned
rationale (a naive rule false-reds real, commonly-sold builds) stands unrebutted. Silence stays
correct under THE BAR: adding that red would require a manufacturer compatibility doc nobody
appears to publish. *Mechanic follow-up:* what do you actually observe on SuperBoost builds with
52 mm-chainline cranks — chainrub in the lowest cogs, accelerated wear, or nothing?

### N2. 52T-max derailleur + 10-50 cassette: NO error — **confirmed**
Same fetched SRAM quote as rule 5 ("Backwards compatible, works with both 10-50t and new
10-52t cassettes"). The recorded refutation of the old proposal is now double-sourced.

### N3. Disciplines never gate fit — **confirmed (definitional)**
Annotation-only by design; no physical-fit doc could contradict it because intended use does not
change interfaces. Nothing to research.

### N4. Pedals: no compat rules — **confirmed (trivial inference)**
9/16"-20 TPI is the universal adult crank/pedal thread; no primary doc fetched because no maker
publishes "our pedals fit cranks" pages. Zero-risk.

---

## Bonus: new sourced data captured in passing (feeds gaps / dormant rules)

| Datum | Source (fetched) | Feeds |
|---|---|---|
| **"The 220 mm diameter rotor is designed for use with a 4-piston caliper."** | SRAM caliper mounting PDF (GEN.0000000005232 Rev V) | NEW gap candidate: rotor size vs caliper `pistons` (info/warning, data present on brake rows) |
| **"RD Minimum (Cassette): 50"** (per-derailleur minimum cassette size) | sram.com RD-GX-1E-A1 model page | NEW dormant-check candidate: derailleur `minCog` (engine models `maxCog` only) |
| **"Max Tire Width (mm): 81"** on the ZEB Select | sram.com/en/rockshox/models/fs-zeb-sel-a2 | Rule 14b (front tire vs fork chassis) — RockShox publishes per-model fork tire clearance; activation data exists for sourced fork rows |
| **"We wouldn't recommend less travel than [170 mm]… Up to 180mm is fine."** (Megatower) | santacruzbicycles.com Megatower 2 MY24 support page | Rule 12b under-forking — first maker-published travel floor seen; *recommendation* wording, activation is a policy call |
| ETRTO-2024 rim↔tire envelope incl. **minimum** tire width per rim | Schwalbe ETRTO combinations PDF | The deferred "tire too narrow for rim" gap now has sourceable thresholds |

## Fetch walls hit this session (extends the §7 handoff map)

- `support.sram.com`, `support.ethirteen.com`, `manualzz.com`, `manua.ls` — **403** (Zendesk/manual mirrors).
- `si.shimano.com/en/pdfs/**` — **403** to both WebFetch and curl (UA-spoofed). `productinfo.shimano.com` *product* pages render as JS shells, **but its `compatibility/C-###` chart pages fetch fine** (C-157 worked) — useful pattern for future Shimano questions.
- `web.archive.org` — blocked by the harness itself (no Wayback fallback).
- SRAM **frame-fit-specifications** PDFs (`eagle-transmission-frame-fit-specifications.pdf`) — redirect to SRAM dealer login (auth0). The *aftermarket* document tree (`globalassets/document-hierarchy/...`) fetches fine.
- `docs.sram.com` publications viewer — JS shell, no static text.
- Large PDFs (>10 MB, e.g. Super Deluxe service manual) exceed WebFetch's cap — **curl + local `pdftotext` works** (poppler is installed on this machine; `pdftoppm` renders tables that pdftotext garbles).
- `wheelsmfg.com` category pages render nav-only; **product pages fetch fine**. `wolftoothcomponents.com` long pages truncate in WebFetch; **curl + HTML-strip works**.
- `santacruzbicycles.com` main bike pages carry no spec text; **`/pages/product-support/<model>` pages are spec-rich and fetch fine** (re-confirms the in-catalog discovery note).

*Prepared by the dossier-research pass, 2026-07-10. No engine, schema, test, or catalog changes accompany this document.*
