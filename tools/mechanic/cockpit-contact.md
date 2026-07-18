# Cockpit & Contact Points — Mechanic Corpus

**Maturity: foundation** (L1 — general-public repair/compat literacy; see `## Gaps` for the
L2/L3 service-manual depth this chapter still needs).

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

## Grips, saddle

**CKP-7 — Grips and saddle carry only the common fields — no fit rules.** They are fit-trivial:
grips fit any standard bar end; a saddle mounts any standard rail clamp. Modelled as
display/data only (except the BMX pivotal case, CKP-9). *Confidence: confirmed (no rule).*
Source: CLAUDE.md data model; EXPERT-REVIEW-DOSSIER.md (no rule area).

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

---

## Gaps

Specific, honest gaps for a future round — this pass stayed L1 (foundation) by design; none of
the below were in scope this round:

- **PARTIALLY CLOSED this round (CKP-20) — stem-clamp (threadless binder + 4-bolt faceplate),
  seatpost-clamp, saddle-rail-clamp, and pedal-spindle torque now sourced across 6-7 brands
  each from Park Tool's cross-manufacturer compilation** (the same page that seeded `FRM-34` in
  `frame-standards-bearings.md` and is cross-referenced from `BRK-41` in `brakes.md`). Still
  missing: rotor-bolt/caliper-mount torque (now covered in `brakes.md` BRK-41 instead — cross-
  chapter, not this chapter's gap anymore), cassette-lockring/BB (covered in
  `frame-standards-bearings.md` FRM-34 / `drivetrain.md`), and no dropper-post clamp torque
  number exists on the fetched page at all — that stays a real gap (see next bullet).
- **No dropper-post internal service/bleed procedure with exact specs (L2 gap).** This round
  covered external sizing/insertion only (CKP-16/17); the hydraulic/air internals (oil volume,
  IFP position, bleed procedure) that CURRICULUM.md's L2 calls out are untouched.
- **No headset/stem bearing press-fit or preload-adjustment procedure (L2 gap, not this
  chapter's core but touches CKP-1's stem interface).**
- **No saddle-rail-shape / clamp-type field or rule proposal drafted (the CKP-15 contradiction
  is flagged, not resolved).** A follow-up should establish whether the live catalog's saddle
  rows actually carry enough oval/carbon-rail models to justify a schema field — this round only
  found the mechanical fact, not the catalog-impact count.
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

## Open mechanic questions (for the human review — do not act)
- CKP-2: would you shim a 31.8 bar into a 35 stem on an enduro bike (alu? carbon?), or is it a
  hard no? (Hard no → symmetric error; routine → keep the direction-aware warning.)
- CKP-4: at what drop length do you start checking insertion before selling (170 / 185 / 200)?
- CKP-13: given two makers publish different torque numbers for a nominally-same clamp diameter
  (Park Tool's generic 4-6 Nm vs OneUp's carbon-specific 6/5 Nm), should the mechanic agent ever
  surface a torque number at all, or is "always read the part's own spec" the only safe answer?
- CKP-15: is oval/carbon-rail-vs-round-rail-clamp common enough in the live catalog to be worth
  a schema field, or rare enough to leave as a documented gap?
