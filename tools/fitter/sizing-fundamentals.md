# Sizing Fundamentals — Fitter Corpus

**Maturity: foundation** (L1 core complete: the sizing systems, reach/stack, ETT, the legacy
seat-tube measure, maker variance, and the live reach-vs-ETT dispute. No L2 per-discipline
working-out and no L3 proportion depth yet — see Gaps). Read [`INDEX.md`](INDEX.md) first (corpus
rules, tiers, ⚠ GUIDANCE-NOT-PRESCRIPTION, ⚠ DISPUTED, the ID-range rule).

Fact IDs are stable and append-only (`SIZ-n`). Every fact carries its **tier** and, where the
dimension moves something else, a **Couplings** line per the INDEX's organizing principle.

---

## The measurements themselves

**SIZ-1 — Reach and stack are the two coordinates that locate the front end relative to the
cranks, and they are the only frame numbers that mean the same thing on every bike.** *Stack* is
the vertical distance from the centre of the bottom bracket to the top of the head tube; *reach*
is the horizontal distance between those same two points. Because both are measured from the BB —
the one fixed point the rider's feet occupy — they are comparable across brands, across frame
shapes, and even across bike types in a way no tube length is. Cervélo is credited with pushing
them into mainstream use.
- *Couplings:* reach is what a stem length modifies (COC-4); stack is what spacers and bar rise
  modify (COC-7). Neither is changed by saddle position — that is precisely the point.
- *Tier:* B-consensus. Sources: Cyclist *Stack and reach explained*
  (cyclist.co.uk/in-depth/how-to-measure-stack-and-reach); Bike Gremlin
  (bike.bikegremlin.com/5481/stack-and-reach-effective-bicycle-frame-size/); Sage Titanium
  *Bike Design 101* (sagetitanium.com/2024/04/03/bike-design-101-bicycle-stack-and-reach-and-ett/).

**SIZ-2 — Seat-tube-length sizing ("a 54 cm frame") is a legacy measure that no longer indicates
fit.** It dates from level-top-tube lugged frames, where seat-tube length co-varied tightly with
every other dimension. Once sloping top tubes became standard, seat-tube length stopped tracking
the rider's reach or bar height at all, and riders simply run more seatpost to make up height.
Manufacturers' own S/M/L labels are likewise only roughly comparable between models, let alone
between brands.
- *Couplings:* seat-tube length still matters for **two** things it is genuinely load-bearing
  for — standover clearance, and (MTB-specific) how much dropper-post insertion the frame allows.
  Retiring it as a *sizing* number is not the same as it being irrelevant.
- *Tier:* B-consensus. Sources: Cyclist (as SIZ-1); Bike Gremlin (as SIZ-1); Brainy Biker
  *Stack and Reach vs. Seat and Top Tube Length* (brainybiker.com/archives/20995).

**SIZ-3 — Effective top tube (ETT) is the horizontal distance from the head-tube top centre to
where that horizontal line crosses the seat-tube axis.** It was the intermediate fix after
sloping top tubes made actual top-tube length meaningless: it is shape-independent and describes
the *seated* cockpit. Its documented weakness is that it is **not independent of seat-tube
angle** — a slacker seat angle lengthens ETT without the front end moving at all — and it can be
altered after the fact by saddle setback and stem length.
- *Couplings:* ETT ↔ seat-tube angle ↔ saddle setback are entangled by construction; ETT is the
  right number when the question is about **seated pedalling**, wrong when it is about standing.
- *Tier:* B-consensus. Sources: Sage Titanium (as SIZ-1); Brainy Biker (as SIZ-2); Trek
  *What Size Mountain Bike Do I Need?* (trekbikes.com/ca/en_CA/mountain_buyers_guide/size/).

**SIZ-4 — Reach and stack describe only what is in FRONT of the bottom bracket, which is a real
and stated limitation.** Two frames with identical reach can put a seated rider in materially
different positions if their seat-tube angles differ, because seat angle moves the saddle fore/aft
without touching reach or stack. Fitters quoted on this note the industry trend toward slacker
seat angles for comfort makes the caveat more live, not less; a proposal to quote stack and reach
**to the bar centre or the actual contact points** rather than to the head tube exists (Canyon's
"Stack+/Reach+") but has not been adopted across the industry.
- *Couplings:* this is the coupling that makes SIZ-3 and SIZ-1 complements rather than rivals —
  reach/stack for the front end, ETT (or seat angle) for where the seated rider sits behind it.
- *Tier:* B. Source: Cyclist (as SIZ-1), quoting fitter commentary on the seat-tube-angle caveat.

---

## ⚠ DISPUTED — is frame reach or effective top tube the better sizing starting point?

**SIZ-5 ⚠ DISPUTED — reputable sources directly contradict each other on whether reach or ETT
should lead a sizing decision. Present both.**

- **Position 1 — reach leads (the mainstream MTB position).** Trek states explicitly that while
  standover and seat-tube length are still worth considering, **reach and ETT matter more**, and
  that because most trail riders prioritise out-of-the-saddle riding, **reach tends to be the
  most helpful metric when comparing sizes across brands**; ETT is characterised as the number
  that matters for seated XC riders prioritising pedalling. This position is echoed across the
  MTB fit literature (Roadman: "reach is usually the deciding factor for MTB"). *Tier: A-mfr +
  B.* Sources: Trek mountain sizing guide (as SIZ-3); Roadman Cycling *MTB Bike Fit Basics*
  (roadmancycling.com/blog/mtb-bike-fit-basics).
- **Position 2 — reach is nearly useless, ETT leads (a framebuilder's dissent, drop-bar
  context).** Seven Cycles argues frame reach "correlates very little to rider fit on drop-bar
  bikes," demonstrating with a published comparison that two Trek models — one their largest
  size, one near their smallest — share essentially identical reach (38.6 vs 38.5 cm) while their
  stacks differ by 11.6 cm, so no rider would cross-shop them. Their charted analysis across ten
  brands claims ETT clusters fit-appropriate frames roughly **twelve times more tightly** than
  reach does. They explicitly state they are agnostic about methodology and that fitters should
  use what works. *Tier: B.* Source: Seven Cycles *Reach Vs. Top Tube Length*
  (sevencycles.com/articles/frame-reach-or-top-tube-length.php).

**What actually separates the two positions — state this whenever the dispute is raised.** Seven's
argument is made about **drop-bar bikes** and about **seated fit**; Trek's is made about
**mountain bikes** and explicitly about **standing, out-of-the-saddle** riding. Both agree that
reach alone, without stack, is meaningless — Seven's headline example is precisely a stack
mismatch. The defensible synthesis the corpus offers is: **reach and stack must be read as a
pair, never singly; which of the pair leads depends on whether the rider is mostly seated
(pedalling-led fit) or mostly standing (handling-led fit)** — which is the discipline question,
handed to `discipline-fit.md` DSC-1. The corpus does **not** declare a winner; the sources have
not converged and pretending otherwise would violate INDEX rule 5.

---

## Maker variance — why a size label is not a size

**SIZ-6 — Size charts are per-manufacturer, per-model, and often per-model-year; a "Medium" is
not a transferable unit.** Even within one brand, a bike sharing a model name can differ
materially between years, and MTB geometry varies more between makers than road, gravel, or tri
geometry does. The practical consequence for a comparison tool: **the geometry chart, not the
size label, is the comparable data.**
- *Couplings:* this is why SIZ-1's brand-independence matters commercially, not just technically —
  reach/stack are the only fields that support honest cross-brand comparison, which is exactly
  the UNBIASED value in INDEX rule 7.
- *Tier:* B + A-mfr. Sources: John Higgins / FitKit Systems *How to Fit a Mountain Bike*
  (fitkitsystems.com/how-to-fit-a-mountain-bike-practical-techniques-and-essential-adjustments/) —
  the year-to-year and MTB-variance claim; Bike Gremlin (as SIZ-1) — the "sizes expressed in seat
  tube length are very unreliable" claim; Specialized *Specialized Size Guide* as a worked example
  of one maker's height→size table.

**SIZ-7 — At least one major maker has abandoned height-based sizing outright in favour of
style-based sizing.** Specialized's **S-Sizing** builds trail-bike size ranges with similar head-
tube lengths and standover heights across sizes, so a rider picks by *desired handling* rather
than by inseam: their own worked example is a 5'8" rider who could ride S2, S3 or S4 — S2 for
nimbleness, S4 for stability at speed, S3 as the balance. They explicitly retain T-shirt sizing's
logic for XC (where pedalling efficiency dominates) and argue it fails the trail rider.
- ⚠ **Vendor label (INDEX rule 7, UNBIASED):** S-Sizing is one manufacturer's proprietary scheme
  and is described here as *what that maker does*, not as an industry standard.
- *Couplings:* S-Sizing is only coherent **because** standover and head-tube length are held
  roughly constant across sizes — it works by making SIZ-2's legacy constraints non-binding so
  reach can vary freely. It is SIZ-1 taken to its conclusion.
- *Tier:* A-mfr. Source: Specialized *S-Sizing* (specialized.com/us/en/s-sizing).

**SIZ-8 — The documented tiebreaker when a rider is between sizes is proportion and riding
style, not a rule.** Trek's guidance: a longer reach gives a longer wheelbase — more stable,
especially descending fast, and roomier for a rider with a long torso or arms for their height;
a shorter reach is less stable but more nimble and easier to flick, suiting a playful, off-the-
ground style or a rider with a short torso/arms. The MTB-specific corollary reported
independently: if forced to choose, **a slightly longer reach with a shorter stem generally
handles better than a shorter reach with a longer stem**, because the longer front-centre adds
stability on steep terrain.
- *Couplings:* this is the reach↔stem-length trade (COC-4). It is the clearest case in the corpus
  of a frame choice and a component choice being **one decision**, not two.
- *Tier:* A-mfr + B. Sources: Trek mountain sizing guide (as SIZ-3) — proportion and style;
  Roadman Cycling (as SIZ-5) — the longer-reach/shorter-stem corollary and the observation that
  running a stem over ~60 mm may itself indicate the frame reach is too short.

**SIZ-9 ⚠ DISPUTED, vendor-originated — the RAD model proposes that MTB size should be set from a
single bottom-bracket-to-grips distance rather than from frame reach.** Lee McCormack's RideLogic
system defines **R.A.D. (Rider Area Distance)** as the straight-line distance from the BB centre
to the midpoint between the grips — the hypotenuse of the grip-reach/grip-stack triangle — on the
argument that a technical MTB rider is *standing*, so the meaningful dimension is feet-to-hands,
not BB-to-head-tube. Zinn Cycles, which fits using the system, publishes the shortcut **height in
cm × 2.5 ≈ target frame reach in mm** (a 180 cm rider → ~450 mm reach), and notes that on a modern
bike with a short stem and cut steerer, bar rise is nearly the only remaining RAD adjustment — so
frame size must be right at purchase.
- ⚠ **Tier B-vendor label (INDEX rule 7):** RideLogic is a commercial fit system with books,
  calculators and a school; RAD is its proprietary framing. It is included because it is a
  coherent, widely-discussed articulation of the standing-fit idea — not because it is neutral.
- ⚠ **Why DISPUTED:** the ×2.5 shortcut is a **single-variable height formula**, and the Tier-A
  evidence (Holliday & Swart 2021, see SDL-6) is that height alone is a weak predictor compared
  with segment lengths and flexibility. The corpus records RAD as a *documented method with a
  stated derivation*, not as validated.
- *Couplings:* RAD collapses reach, stack, stem, spacers and bar rise into one number — useful as
  a check, but it deliberately discards the information SIZ-4 says reach/stack already omit.
- *Tier:* B-vendor. Sources: Zinn Cycles *Dynamic Mountain Bike Fitting*
  (blog.zinn.bike/dynamic-mountain-bike-fitting); Lee McCormack via Pinkbike
  (pinkbike.com/news/finding-your-sweet-spot-handlebar-width.html) for the RideLogic method's
  framing; John Higgins (as SIZ-6) referring fitters to McCormack's *Dialed* for hands-to-feet fit.

---

## Gaps

Honest list of what is missing to reach `professional` (L2) and beyond:

- **L2 — no per-discipline sizing worked out.** The chapter states reach/stack generically;
  it does not yet carry typical reach ranges by discipline with sourced numbers (only Roadman's
  single unsourced "trail 440–480 mm medium / enduro 460–500 mm" mention, which is deliberately
  not promoted to a fact because no primary backs it). Needs maker geometry charts sampled
  systematically — the **geometrygeeks.bike normalization route is untried** (INDEX fetchability
  map).
- **L2 — suspension sag is entirely absent, and it is MTB's biggest sizing asymmetry.** Sag
  changes stack, effective seat-tube angle and effective saddle height *under load*, meaning a
  static geometry chart describes a bike nobody rides. No road fit source addresses it. This is
  the single most valuable MTB-specific L2 gap in the chapter.
- **L2 — standover and dropper-insertion constraints unwritten.** SIZ-2 names them as the two
  things seat-tube length still governs, then does not develop either. Dropper travel vs
  seat-tube length is a live catalog-adjacent question (the catalog already models `seatTubeLen`
  and `maxInsert` per size).
- **L3 — no segment-proportion depth.** Torso/inseam and femur/tibia ratios, ape index, and why
  identical-height riders need different frames are named in SIZ-8 only as "long torso or arms."
  Holliday & Swart 2021 (cited in `saddle-position.md` SDL-6) is the seed and has not been mined
  here.
- **L3 — no sourced account of how reach/stack interact with head-tube angle and trail** to
  produce handling, so SIZ-8's stability claims rest on maker assertion rather than mechanism.
- **The SIZ-5 dispute is unresolved and may be resolvable.** Neither side has been tested against
  the other's terrain: Seven's twelve-times claim is drop-bar and seated; Trek's is MTB and
  standing. A round that finds a source applying either analysis to the *other* context would
  materially advance this, and it is the highest-value single unknown in the chapter.
