# TrailBuilder Fitter Corpus — CURRICULUM

The bar for this corpus, set by analogy to its siblings (the mechanic's "would teach World Cup
mechanics," the coach's "the coach that teaches certified coaches"): **the fitter that a
professional fitter would find worth reading** — grounded in the actual literature, honest about
where the methods disagree, and never overclaiming a number it cannot support. That is a
multi-round program, not a single grind. This file defines the levels so every future training
round knows what depth it's adding and where the corpus stands. Read after [`INDEX.md`](INDEX.md);
the corpus rules (citation discipline, append-only, ⚠ GUIDANCE-NOT-PRESCRIPTION, ⚠ DISPUTED,
⚠ CONTRADICTION, ⚠ SITE-CONSTRAINTS) apply at every level unchanged.

---

## The four levels

### L1 — Fit fundamentals
The dimensions, the systems, and the named methods: what reach and stack are and why they
replaced seat-tube sizing; the competing saddle-height methods and what each outputs; bar width,
stem length, lever position; the inseam→seat-height logic for kids; how a discipline changes the
answer; the common symptom→fit-cause associations. Sources: peer-reviewed reviews, maker sizing
guides, published fit authorities. **This is the bootstrap seed's target** — broad, correct
coverage of all six chapters with every method labelled and every dispute preserved, not deep
biomechanics.

### L2 — Per-discipline fit depth
The same dimensions, worked out separately for each riding type instead of stated generically:
XC vs trail vs enduro vs DH MTB fit; road race vs road endurance; gravel race vs gravel
adventure; dirt jump and BMX (where "fit" means something different again — a DJ bike is
deliberately undersized and the saddle is not a contact point). Includes the MTB-only variables
no road fit source covers: **suspension sag as a fit input** (it changes stack, seat angle and
effective saddle height under load), dropper-post travel vs seat-tube length as a fit constraint,
and standing-dynamic position vs seated-static position as two separate fits of the same bike.
L2 is where "here is the method" becomes "here is the method *for the bike you're actually on*."

### L3 — Anthropometry & biomechanics depth
The layer beneath the methods — why they output what they output, and where they break:
- **Segment proportions**, not just height: femur/tibia ratio, torso/inseam ratio, ape index, and
  why two riders of identical height need different bikes (Holliday & Swart 2021 is the seed).
- **Joint kinematics** — the knee-angle literature in detail, hip and ankle angles, the
  static-vs-dynamic measurement gap (Millour 2019), and what a given angle range actually
  protects against.
- **Flexibility and mobility as fit inputs** — hamstring and lumbar flexion tests as predictors
  of sustainable drop.
- **Load and force** — patellofemoral compressive force vs saddle height, pedal force
  application, hand/perineal pressure mapping.
- **Sex differences** — the evidence that male-derived formulas measurably fail female riders
  (Encarnación-Martínez 2021), and what the alternatives are.
- **Pediatric development** — motor-control and postural literature behind the balance-bike
  finding, and growth-rate data behind sizing longevity.

### L4 — Fit-diagnosis craft
Practitioner judgment: reading a rider on the bike, the order of adjustments and why order
matters, distinguishing a fit cause from a training-load cause from a pathology, the iteration
loop (change one thing, ride, reassess), and knowing when the answer is "this is not a fit
problem — see a clinician." This is the level that earns the bar, and the level with the
**thinnest public documentation** — the professional fit-certification curricula (Retül, BikeFit,
IBFI) are paid/member-gated, exactly as PMBIA/BICP are for the coach corpus. Expect L4 facts to
lean on labelled Tier-B practitioner writing, to arrive last and slowest, and possibly to hit a
ceiling that only a paid-access decision by Douglas could lift (flagged in INDEX's fetchability
map). **L4 also carries the heaviest ⚠ GUIDANCE-NOT-PRESCRIPTION load** — diagnosis craft written
into a corpus is exactly where a reader is most tempted to treat text as a clinician.

---

## Grading a chapter

Each chapter file carries a **Maturity** line right under its title, one of:

- **foundation** — L1 coverage only (the common case after the bootstrap seed).
- **professional** — L1 complete + meaningful L2 depth (per-discipline working-out, MTB-specific
  variables) across most of the chapter's dimensions.
- **master** — L1 + L2 complete, plus L3 anthropometry/biomechanics depth and (where applicable)
  L4 diagnosis craft.

Grade **honestly** — a chapter with a few deep citations and mostly method-listing is still
`foundation`, not `professional`. Each chapter also ends with a **## Gaps** section: an honest,
specific list of what's missing to reach the next level (e.g. "no crank-length literature yet —
L3 gap" or "no XC-vs-enduro saddle-height differential sourced — L2 gap"). The Gaps list is what
the next training round reads to pick its target.

## Corpus rule: target the weakest chapter

Per [`INDEX.md`](INDEX.md) rule 10 — future training rounds read every chapter's Maturity line +
Gaps list first and prioritize the **weakest-graded chapter(s)**, closing the specific gaps
listed rather than re-covering ground a chapter already has. The corpus climbs toward `master`
evenly instead of over-deepening one dimension while others stay thin.

**One standing exception, by product priority:** `kids-fit.md` powers the **First Bike Finder**,
a real planned surface. If a round must choose between an even climb and closing a kids-fit gap
that blocks that feature, **close the kids-fit gap** — and say in the round's report that the
even-climb rule was deliberately set aside, so the next round can rebalance.
