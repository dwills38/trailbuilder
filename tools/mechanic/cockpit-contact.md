# Cockpit & Contact Points — Mechanic Corpus

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

## Grips, saddle

**CKP-7 — Grips and saddle carry only the common fields — no fit rules.** They are fit-trivial:
grips fit any standard bar end; a saddle mounts any standard rail clamp. Modelled as
display/data only (except the BMX pivotal case, CKP-9). *Confidence: confirmed (no rule).*
Source: CLAUDE.md data model; EXPERT-REVIEW-DOSSIER.md (no rule area).

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

### Mismatch failure modes
- **Hard "won't fit":** bar bigger than stem clamp (CKP-1); dropper/post bigger than seat tube
  (CKP-3/5); BMX pivotal seat on a railed post or vice versa (CKP-9).
- **"Works with a shim" (warning + structured fix):** bar smaller than stem clamp (CKP-1, with
  extra carbon-bar caution CKP-2); post smaller than seat tube (CKP-3/5).
- **"Fits the diameter but maybe not the depth" (info, un-checkable today):** long-drop dropper
  on an unknown frame size (CKP-4); post into a curved/interrupted seat tube (CKP-6).
- **Silent-and-fine / preference (must NOT be flagged):** exact-diameter post; any grip/saddle/
  pedal; BMX freecoaster-vs-cassette and gear ratio (CKP-8/10).

### Install-order dependencies
- **Shim goes in before the part is clamped** (CKP-1/3): the reducer sleeve seats in the
  bore/tube first, then the bar/post is clamped to torque against it.
- **Torque-to-spec is the safety gate on the clamp** (CKP-2): carbon bars especially require the
  manufacturer torque — which is why the bar/stem shim carries more caution than the seatpost
  shim even though both are "smaller-in-bigger."
- **Insertion depth is set at install against the frame** (CKP-4/6): the post is inserted to at
  least its minimum-insertion line *and* no deeper than the frame allows — a two-sided install
  constraint the tool can only nudge (info), not verify.

### Wear / setup couplings
- **A shimmed clamp concentrates stress** at the shim seam — a durability reason the bar/stem
  case (CKP-2) is more cautious than seatpost shimming.
- **Dropper actuation is unaffected by the shim** but insertion depth affects the post's stroke
  clearance — a too-shallow insert can bottom the post internals; the CKP-4 info exists because
  this is the most common real dropper misfit.

---

## Open mechanic questions (for the human review — do not act)
- CKP-2: would you shim a 31.8 bar into a 35 stem on an enduro bike (alu? carbon?), or is it a
  hard no? (Hard no → symmetric error; routine → keep the direction-aware warning.)
- CKP-4: at what drop length do you start checking insertion before selling (170 / 185 / 200)?
