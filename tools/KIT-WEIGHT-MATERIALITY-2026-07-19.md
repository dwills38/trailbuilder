# Kit Weight Materiality — Expert Bench Consult (2026-07-19)

**Question (Douglas, 2026-07-19):** kit apparel no longer needs a verified weight bar except
helmets — "that is the most noticeable difference." Is helmets-only the right line, or do other
worn-gear categories have rider-noticeable weight differences worth keeping the bar for?

**Method.** Three lenses — coach (performance/fatigue), fitter (comfort/fit consequence),
mechanic (mechanical) — each grounded first in its own cited corpus (`tools/coach/`,
`tools/fitter/`, `tools/mechanic/`), then in public sources where the corpus had no answer.
**Finding up front: none of the three corpora currently carry a fact specifically about kit-item
weight** (checked via full-text search of all chapters for helmet/shoe/glove/pack/armor +
weight/fatigue/rotating-mass terms) — this is an honest gap, not a suppressed answer, and is
flagged below per-category rather than papered over.

## Verdict table

| Category | Verdict | Basis |
|---|---|---|
| **Helmet** | **MATTERS** — keep the bar | Public sources (below); mechanism is real and MTB-specific |
| Shoes | MARGINAL | One real study found; effect is small and fit-driven, not weight-driven |
| Body armor / pads | MARGINAL | Bulk/mobility restriction is the documented driver, not weight-in-grams per se |
| Pack / hydration | MARGINAL | Cumulative-fatigue logic is plausible but no direct study found; torso placement is the least-costly location for mass |
| Jersey / shorts | IRRELEVANT | No mechanism, no literature, negligible mass deltas between SKUs |
| Gloves | IRRELEVANT | Corpus discusses gloves only for vibration/hand-numbness (PRB-3/COC context), never weight |
| Eyewear | IRRELEVANT | No mechanism, negligible mass deltas |

## Reasoning by category

**Helmet — MATTERS.** No corpus fact exists (gap, recorded honestly), so this rests on public
sources: helmet mass sits well outside the head's centre of gravity, so every gram there acts on
a lever arm the neck has to counter continuously, not just at impact — practitioner sources
describe a 300–400 g helmet-weight difference producing materially higher neck-muscle exhaustion
over a 4+ hour ride, and note that even helmets with the *same* stated weight can feel different
depending on how the mass is distributed relative to the head's centre of gravity. This is a
sustained, repetitive-motion cost (neck holding the head level over rough terrain for hours),
which is exactly the profile where small mass differences compound — the same logic the fitter
corpus already applies to cumulative-fatigue fit errors (`fitter/discipline-fit.md` DSC context:
"a position that feels fine fresh can be unsafe fatigued"). Douglas's instinct is well supported
independently of the corpora. **Recommend keeping the helmet weight bar as-is.**

**Shoes — MARGINAL, weight is not the load-bearing factor.** A real study (Colorado, cycling
shoes/pedal-interface) found **no significant effect on metabolic cost** of the shoe/pedal system
at submaximal steady-state power (50–150 W) — this is direct counter-evidence to a strong
weight-materiality claim, though it compared shoe/pedal *systems* (clip-in vs flat) rather than
gram-for-gram weight deltas between two clipless shoe SKUs, so it doesn't fully close the
question. The fitter corpus's own honest gap (`fit-problems.md` PRB-8) says the levers for foot
symptoms are **cleat position, sole stiffness and footbed**, not shoe mass — "this corpus has no
foot/cleat chapter" and cannot ground a fit answer here at all. Net: the credible foot-fatigue
driver is stiffness/fit, not weight; a hard weight-verification bar for shoes is not well
supported. **No grounded answer** on the theoretical reciprocating-extremity-mass angle (feet
move with the crank, which in principle costs more per gram than static torso mass, by analogy to
the well-established running-shoe-mass literature) — no MTB-specific pedaling study surfaced this
round; flagged as a genuine gap rather than asserted.

**Body armor / pads — MARGINAL, and weight-in-grams is the wrong proxy even where the effect is
real.** Consumer/practitioner sources agree heavier armor "feels more restrictive to your natural
riding position and causes added fatigue," and describe the design trend as trading bulk for
breathability rather than trading grams for grams. The documented driver is **bulk and mobility
restriction** (a garment property closer to fit/cut than to a scalar weight field), not the raw
number a `weight` field would capture — so even where a real rider-noticeable effect exists, a
weight-verification bar is a weak proxy for it. No grounded answer from the coach corpus (which
only mentions protective gear as a prerequisite-gear note for progressions, never a weight/fatigue
claim) or the mechanic corpus (searched; nothing on armor mass).

**Pack / hydration — MARGINAL.** No direct study surfaced this round (searches returned buying
guides, not research) — an honest gap. The plausible mechanism is cumulative fatigue over a long
ride, consistent with the fitter corpus's general cumulative-fatigue framing for gravel/endurance
riding, but that framing is about **position**, not carried mass, so it doesn't transfer cleanly.
Worth noting for calibration: a pack sits on the torso, near the rider's centre of mass — the
*least* metabolically costly place to carry weight compared to the extremities (feet, head), by
the same general biomechanics logic that makes helmet and shoe mass disproportionately costly.
That argues pack weight matters *less* per gram than helmet weight, even before considering that
no study confirms a performance effect at all.

**Jersey/shorts, gloves, eyewear — IRRELEVANT.** No corpus fact, no mechanism, and the real-world
weight deltas between SKUs in these categories (tens of grams of fabric/lens) are far below any
threshold discussed anywhere in the three corpora or the sources fetched this round. Gloves get
one mention in the fitter corpus, but only for vibration-damping/hand-numbness management
(`fit-problems.md` PRB-3) — never weight.

## Recommended policy line (accept or edit)

> Keep the weight-verification bar on **helmets only**; every other worn-gear category (shoes,
> armor/pads, packs, jerseys/shorts, gloves, eyewear) verifies on provenance + confirmed
> identity/spec fields alone, with the honest caveat that shoe fit/stiffness and armor
> bulk/coverage — not weight — are the categories' real (currently uncataloged) comfort/fatigue
> levers, should a future spec round want to capture them instead.

## Gates

Docs-only change (this file + no code/catalog/policy edits). `node validate.js`, `npm test`,
`npm run typecheck` run clean below (pre-existing repo state; unaffected by this addition).
