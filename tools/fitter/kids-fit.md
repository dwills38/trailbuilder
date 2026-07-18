# Kids' Fit — Fitter Corpus

**Maturity: foundation** (L1 core complete and, for the fit-gate facts specifically, the
best-grounded chapter in the corpus — the balance-bike learning claim carries Tier-A peer-reviewed
support and the sizing rules are cross-corroborated. Weight-ratio and size-up doctrine rest on
weaker tiers; growth-rate longevity modelling is absent — see Gaps). Read [`INDEX.md`](INDEX.md)
first (corpus rules, tiers, ⚠ GUIDANCE-NOT-PRESCRIPTION, the ID-range rule).

Fact IDs are stable and append-only (`KID-n`). Every fact carries its **tier** and a
**Couplings** line where the dimension moves something else.

> **⚠ THIS IS THE PRODUCT-CRITICAL CHAPTER.** It is intended to power the **First Bike Finder** —
> the inseam→bike matcher argued for in [`data/STRIDER-ANALYSIS.md`](../../data/STRIDER-ANALYSIS.md)
> and specified in [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md). Everything here was
> written with that use in mind, and §"Readiness for the First Bike Finder" at the end states
> plainly what is and is not computable from this chapter today.

> **⚠ GUIDANCE-NOT-PRESCRIPTION, child-specific.** The reader is a parent making a purchase for
> someone who cannot self-report discomfort reliably. That raises, not lowers, the bar: state
> methods and thresholds with their sources, never assert a specific child's size, and treat
> readiness (KID-8) as a judgment the caregiver makes by observation — not one a chart makes.

---

## The sizing gate: inseam → seat height

**KID-1 — Fit is set by INSEAM against the bike's LOWEST SEAT HEIGHT — not by age, and not by
wheel size.** Age fails because children of the same age have very different inseams; wheel size
fails because two bikes with the same nominal wheel can have completely different seat ranges.
The operative comparison is the child's inseam against the bike's **minimum** seat height. REI
states the same logic for pedal bikes: age is a rough guide at best, and bikes with the same wheel
size vary between manufacturers.
- *Couplings:* wheel size still narrows the *search*; it just does not decide the *fit*. Treat it
  as a coarse filter feeding the real check.
- *Tier:* C-aggregator + A-mfr-adjacent, corroborating the repo's existing record. Sources:
  icebike *Balance Bike Size Chart* (icebike.org/balance-bike-size-chart/); REI *The Ultimate
  Guide to Buying a Kids' Bike* (rei.com/learn/expert-advice/kids-bikes-how-to-choose.html);
  corroborates [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3.1–3.2, which records the
  same rule from twowheelingtots and Ready Set Pedal.

**KID-2 — The threshold: the bike's minimum seat height should sit slightly BELOW the child's
inseam, so the child sits with both feet FLAT and knees slightly bent.** The repo's existing model
records the quantified form: **min seat height ≈ 0.5–1.5 inches below inseam** (so a 13" inseam
wants a minimum seat height of about ≤12.5"). The fetched aggregator states the same rule
qualitatively and supplies the **observable test that matters more than the arithmetic**: the
child sits, puts both feet flat, and pushes **without tiptoeing**. Tiptoeing while seated means
the bike is too tall — full stop.
- ⚠ **The observable test is the authority; the numeric band is the shortcut.** A finder tool
  should output the numeric match *and* tell the parent to verify by the feet-flat check, because
  inseam measurement technique varies (icebike specifies measuring **in shoes**, floor to crotch,
  child standing straight; the repo's model and other guides commonly measure barefoot — a real
  ~10–15 mm discrepancy, recorded honestly rather than resolved).
- *Couplings:* this is the **gate**. Nothing else in the chapter matters if it fails: a child who
  cannot flat-foot the bike cannot self-start, cannot foot-brake, and cannot learn balance on it.
- *Tier:* C-aggregator + repo-doc-corroborated. Sources: icebike (as KID-1);
  [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3.2 (recording twowheelingtots /
  Ready Set Pedal).

**KID-3 — Growth room is measured by the seat-height RANGE, and that range is the product's
real longevity claim.** The repo model records the rule: **maximum seat height ≥ inseam + ~2
inches** for the bike to last, and identifies **(seatMax − seatMin)** as the headline metric a
parent actually cares about — "how many years does this bike last" — noting woom's ~5" of range
and Strider's 11"→17" (→19" with an XL post) are marketed on exactly this. The fetched aggregator
independently advises looking for a **longer seatpost range** for children in the upper inseam
bands.
- *Couplings:* range is in direct tension with KID-4 — the temptation range creates is to buy a
  bike whose *minimum* is too high because its *maximum* looks generous. Range only counts once
  the KID-2 gate passes.
- *Tier:* C-aggregator + repo-doc. Sources: [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md)
  §3.3; icebike (as KID-1).

**KID-4 — "Buy a size up so they grow into it" is a documented parent mistake, and the sources are
unanimous.** A balance bike whose minimum seat sits above the child's inseam cannot be ridden
safely and **teaches fear rather than balance**, killing the confidence the balance-bike stage
exists to build. REI carries the same warning for pedal bikes, quoting its own product specialist
on the pull of buying a bike to grow into and stating the counter-rule: for new riders especially,
buy the bike that fits **now** so they can ride comfortably and confidently while learning — a
well-fitting bike is easier to handle, safer and more fun.
- ⚠ **This is the single most actionable fact in the chapter for the First Bike Finder.** The
  tool's most valuable output may be a *refusal*: "this bike does not fit your child yet."
  Per the UNBIASED value (INDEX rule 7), that refusal must be given even when it costs a sale.
- *Tier:* B + C-aggregator, multi-source consensus. Sources: REI (as KID-1); icebike (as KID-1);
  [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3.5.

---

## Standover

**KID-5 — Standover must clear the inseam, and a very low standover is what lets the youngest
children mount unaided.** For **pedal** bikes REI gives a quantified target: the child stands over
the top tube with feet on the ground and there should be about **2–4 inches of clearance** between
crotch and top tube. For **balance** bikes the repo model records that standover should likewise
clear the inseam, and that the very low standovers on some models (woom/Guardian ≈ 7") are
specifically what allows the smallest toddlers to get on and off by themselves.
- ⚠ **The 2–4" figure is a pedal-bike number and should not be transplanted onto balance bikes
  without saying so** — balance-bike frames are step-through-low by design and the binding
  constraint there is seat height (KID-2), not top-tube clearance.
- *Couplings:* standover is the one place where the legacy seat-tube/frame-height dimension
  (SIZ-2) still genuinely governs, in children's fit as in adults'.
- *Tier:* B (REI, pedal-bike figure) + repo-doc (balance-bike rule). Sources: REI (as KID-1);
  [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3.6.

---

## Bike weight against body weight

**KID-6 — Bike weight relative to the CHILD'S body weight is a real fit variable, and the
commonly-cited ceiling is ~30%.** The repo model records **≤30% of the child's body weight**
(twowheelingtots' threshold), noting Cannondale states its own "Kid-Correct Weight ≤ 30–40%", so
a 30 lb toddler wants roughly a **≤7–9 lb** bike — which is why carbon (~4.4 lb) and alloy
(~6.6 lb) models command a premium and a 12.5 lb Strider 14x reads as heavy for the category. USA
Cycling supplies the independent arithmetic and the **mechanism**: balance bikes typically run
**6–9 lb** against **12–15 lb** for a pedal bike of the same 12" wheel size, so for a 25 lb child
that is **24–36%** versus **48–60%** of body weight. Their stated why: a lighter bike is easier to
get moving and easier to stride uphill, so the child rides further before tiring.
- ⚠ **REFINEMENT to the repo model, recorded rather than silently corrected (INDEX rule 1).** USA
  Cycling's own figures put a *typical* balance bike at **24–36%** of a 25 lb child's weight —
  i.e. straddling the 30% line, with a substantial share of ordinary, perfectly good bikes landing
  **above** it. The repo's "≤30%" is therefore best read as a **quality target that many real
  bikes miss**, not a pass/fail fit gate. A finder tool that hard-rejected everything over 30%
  would reject much of the market. **Recommend: surface weight ratio as a graded comparison
  signal, not a filter.** This is a refinement, **not a ⚠ CONTRADICTION** — the sources agree on
  the direction and the mechanism, and `data/STRIDER-MODEL.md` §3.4 already presents the figure as
  guidance rather than a rule.
- *Couplings:* weight ratio ↔ the balance-bike-vs-pedal-bike decision (KID-7): the weight advantage
  is a large part of *why* the balance bike works, not an independent virtue.
- *Tier:* A-mfr-adjacent (USA Cycling, a national governing body, publishing its own guidance) +
  repo-doc. Sources: USA Cycling *Balance Bike vs. Training Wheels*
  (usacycling.org/article/balance-bike-vs-training-wheels);
  [`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3.4.

---

## Balance bikes, training wheels, and the transition to pedals

**KID-7 — Peer-reviewed evidence supports the balance bike over training wheels for reaching
independent cycling, and the effect size reported is large.** A retrospective study found that
practising on a balance bicycle results in **earlier onset of independent cycling** than practising
on a bike with training wheels — and, critically, that this held **independently of** the age at
which practice began: children who used *both* started at the same age as balance-bike-only
children but achieved independent cycling **later**, indicating the *type* of practice matters, not
just accumulated hours. A subsequent controlled study (2024) using inertial sensors and
largest-Lyapunov-exponent analysis found the balance bike affords **greater functional variability**
during practice, supporting more adaptive responses when transitioning to a pedal bike, and cites a
retrospective finding of independent cycling on average **1.81 years earlier**. The proposed
mechanism across both: a balance bike requires the child to actively maintain an upright
orientation by coordinating body lean and steering from the outset, whereas training wheels
outsource balance and can even train a habitual lean that causes a fall once removed.
- ⚠ **Fairness note, and it matters for UNBIASED framing:** USA Cycling explicitly states that
  **both** balance bikes and training wheels are effective and safe ways to teach a child, that
  there is no right or wrong choice, and that training wheels retain real advantages —
  they fit almost any bike (cheap if you already own one), can be removed at any time, and suit an
  older or bigger child for whom finding a well-fitting balance bike is hard. The literature shows
  balance bikes are **more efficient**, not that training wheels fail.
- ⚠ **Contrasting Tier-B voice, recorded for honesty:** Wirecutter reports that among the cycling
  educators, manufacturers and teachers it interviewed, **not one defended training wheels** —
  a stronger position than either USA Cycling's or the literature's.
- *Tier:* A (both studies) + A-mfr-adjacent (USA Cycling) + B (Wirecutter). Sources: Zeuwts et al.,
  *Mastering balance: The use of balance bicycles promotes the development of independent cycling*
  (PMC9310799); *Learning to Cycle: Why Is the Balance Bike More Efficient than the Bicycle with
  Training Wheels? The Lyapunov's Answer* (PMC11676224); USA Cycling (as KID-6); NYT Wirecutter
  *What's the Secret to Teaching Your Kid to Ride a Bike?*
  (nytimes.com/wirecutter/reviews/advice-teaching-bike-riding/). Studies retrieved via PubMed
  Central.

**KID-8 — Readiness for pedals is judged by demonstrated balance and braking, not by age.** The
sequence a child works through on a balance bike is documented: walking the bike while seated →
longer strides → gliding between steps → coasting with both feet up, with slowing achieved by
dragging the feet. Readiness for a pedal bike follows the *completion* of that sequence — REI
places it commonly around age 4–5 while stating that starting on a balance bike often lets a family
**skip training wheels entirely**; the aggregator states the criterion more usefully as
**confidence and braking readiness matter more than age**, and notes a confident 5-year-old may
skip a larger balance bike and move straight to a small pedal bike.
- ⚠ **A real hardware consequence of the transition, not just a milestone:** children sit **higher**
  on pedal bikes than balance bikes, because the cranks need ground clearance to rotate — including
  through turns. That means a child moving to pedals **can no longer necessarily flat-foot the
  bike**, which is precisely why pedal bikes for young children need hand brakes, coaster brakes,
  or both: foot-braking stops being available. The KID-2 gate does not transfer unchanged across
  the transition.
- *Couplings:* this is the chapter's sharpest coupling — the fit rule that governs the balance-bike
  stage (feet flat) is *structurally impossible* to preserve on a pedal bike, and the brake is what
  replaces it. A finder tool must not apply one stage's gate to the other's bikes.
- *Tier:* A-mfr-adjacent (USA Cycling, the crank-clearance mechanism and brake consequence) + B
  (REI) + C-aggregator (icebike). Sources: USA Cycling (as KID-6); REI (as KID-1); icebike (as
  KID-1).

**KID-9 — Pedal-bike fit adds two checks the balance-bike stage does not have.** Once pedals are
involved: **seat height** should let the legs be **slightly bent at the bottom of the pedal
stroke** (the child should also sit comfortably and be able to see around them — kids' bikes are
deliberately upright); and **handlebar reach** should let the child sit and grip the bars with only
a **slight bend in the elbows**. Look for adjustable seat height and handlebars, and note some kids'
bikes offer extended seatposts or frames for extra growth room.
- ⚠ Note this seat-height rule is the *adult* rule (a slight knee bend at the bottom — cf. SDL-3/
  SDL-4) applied to children, **and it directly conflicts with the balance-bike feet-flat gate** —
  a bike set to KID-9 will not let the child flat-foot. That is expected and correct for a pedal
  bike; it is stated explicitly here because a naive finder tool carrying one rule across both
  categories would produce dangerous output.
- *Tier:* B. Source: REI (as KID-1).

**KID-10 — Helmet fit is a non-negotiable part of the first-bike purchase, from the first ride.**
USA Cycling states the ground rule plainly: parents and children should wear helmets **during every
ride**, and explicitly rejects the "we survived without them" reasoning on the grounds that
concussion is better understood now than it was. The aggregator lists skipping helmet fit among the
common first-bike mistakes — the first balance-bike ride still needs a fitted helmet.
- *Tier:* A-mfr-adjacent (USA Cycling) + C-aggregator. Sources: USA Cycling (as KID-6); icebike
  (as KID-1).

---

## Cross-check against `data/STRIDER-MODEL.md` (required by the bootstrap brief)

The brief required this chapter be grounded against the existing sizing section in
[`data/STRIDER-MODEL.md`](../../data/STRIDER-MODEL.md) §3 and any contradiction flagged. Result:

**No ⚠ CONTRADICTION found.** All six of that document's sizing points were independently
corroborated by sources fetched this round:

| STRIDER-MODEL §3 point | This chapter | Status |
|---|---|---|
| 1. Inseam→seat height, not wheel size or age | KID-1 | ✅ corroborated (icebike, REI) |
| 2. Min seat ≈ 0.5–1.5" below inseam, feet flat | KID-2 | ✅ corroborated + **observable test added** (no tiptoeing) |
| 3. Max seat ≥ inseam + ~2"; range = longevity | KID-3 | ✅ corroborated (icebike) |
| 4. Bike weight ≤ 30% of child's body weight | KID-6 | ⚠️ **refined, not contradicted** — see below |
| 5. "Don't buy a size up" | KID-4 | ✅ corroborated, and strengthened by REI |
| 6. Standover should clear the inseam | KID-5 | ✅ corroborated, + REI's 2–4" **pedal-bike** figure |

**The one refinement (KID-6).** USA Cycling's own arithmetic places typical balance bikes at
24–36% of a 25 lb child's body weight, so the ≤30% threshold is one that many ordinary, good bikes
exceed. The recommendation to the coordinator is that a First Bike Finder treat weight ratio as a
**graded comparison signal**, not a hard filter. This is a *refinement of how to apply* the number,
not a disagreement about the number or its direction — hence no ⚠ CONTRADICTION tag, per INDEX
rule 6, which reserves that tag for collisions with a **catalog assumption or engine rule**. The
strider work is an off-live design doc, not a live engine, and nothing here collides with it.

**Two additions this chapter makes that §3 does not carry**, both material to the product:
- **The peer-reviewed basis for the balance-bike recommendation (KID-7).** §3 argues the sizing
  science; it does not cite the learning-outcome literature. That literature is strong, and it is
  the strongest available answer to a parent asking "why not just get training wheels?"
- **The transition discontinuity (KID-8/KID-9).** The feet-flat gate cannot survive the move to
  pedals, because crank clearance forces a higher seat and the brake replaces the foot. Any tool
  spanning both categories must switch rules at that boundary.

---

## Readiness for the First Bike Finder — honest assessment

**What this chapter can support TODAY, computationally:**
- ✅ **The core match.** Given a child's inseam and a bike's `seatMin`/`seatMax`, KID-2 and KID-3
  yield a fits-now verdict plus a growth-room estimate. `data/STRIDER-MODEL.md` §4 already
  specifies `seatMin`/`seatMax`/`standover`/`bikeWeight`/`weightLimit` as fields, so the chapter's
  logic and the proposed schema **already line up** — no new field is required for the core match.
- ✅ **The refusal case (KID-4).** "This bike does not fit your child yet" is well-sourced,
  consensus-backed, and is the highest-value output the tool has.
- ✅ **Weight-ratio comparison (KID-6)**, as a graded signal, given the child's weight — with the
  30% figure presented as a target rather than a gate.
- ✅ **Standover check (KID-5)** where `standover` is sourced, and the balance-vs-pedal
  category-switch rule (KID-8/KID-9) as guardrail logic.
- ✅ **The "why a balance bike" explainer (KID-7)** with peer-reviewed citations — genuinely
  differentiating content, and honest enough to state training wheels also work.

**What it CANNOT support today, and would need before shipping:**
- ❌ **Longevity in years.** KID-3 gives seat *range*, but converting range → "this lasts ~2 years"
  needs **pediatric growth-rate data** (inseam growth per year by age), which this chapter does not
  have. Either source it (CDC/WHO growth references are public and fetchable) or express longevity
  only in inches of remaining range — **never guess a number of years**.
- ❌ **Inseam measurement standardization.** KID-2 records a live discrepancy: icebike says measure
  **in shoes**, other guides barefoot. That is ~10–15 mm — comparable to the entire 0.5–1.5"
  threshold band. **The tool must specify one method in its own instructions** and apply it
  consistently, or its arithmetic is not meaningful. This is a blocking decision, and it is a
  **DECISION FOR DOUGLAS** in the same register as `data/STRIDER-ANALYSIS.md`'s parked list.
- ❌ **Readiness assessment (KID-8) is not computable** and should not be presented as if it were.
  It is caregiver observation — the tool can describe the milestone sequence, not evaluate it.
- ❌ **Per-bike verified data.** The chapter supplies the *logic*; the *rows* do not exist. Per
  `data/STRIDER-MODEL.md` §2, maker pages are heavily walled (Strider 403s and times out) and
  aggregators are the practical route — but the project's `verified:true` bar still requires a
  fetched maker page. Expect most initial rows to be honest unverified sample data under the
  existing catalog inclusion policy.

**Verdict: the fit LOGIC for the First Bike Finder is ready; the DATA and two decisions are not.**
The blocking items are (a) pick an inseam measurement standard, (b) decide whether longevity is
expressed in inches or requires sourcing growth data, and (c) the catalog grind. None of the three
is a knowledge gap in this chapter — they are product decisions and data work, which is the
healthiest possible state for a bootstrap round to leave a product-critical chapter in.

---

## Gaps

Honest list of what is missing to reach `professional` (L2) and beyond:

- **L2 — pediatric growth-rate data absent**, blocking any longevity-in-years claim (see above).
  Public CDC/WHO growth references should be fetchable; this is the highest-value single gap.
- **L2 — the inseam measurement discrepancy is recorded but unresolved** (shoes vs barefoot).
  Needs either a authoritative source settling it or an explicit project convention.
- **L2 — pedal-bike fit is thin.** KID-9 is one REI paragraph. Crank length for children, brake
  **lever reach for small hands** (named as a secondary axis in `data/STRIDER-MODEL.md` §3 and
  never developed), and standover targets by bike type are all unwritten. Lever reach is
  particularly notable: it is a genuine safety variable — a child who cannot reach the lever cannot
  brake — and it connects directly to COC-12.
- **L2 — pedal-conversion kits unaddressed here.** `data/STRIDER-MODEL.md` §6 identifies these as
  the *one* real part-to-part compatibility rule in the whole niche; this chapter covers the
  readiness question (KID-8) but not the hardware.
- **L3 — no motor-development depth.** KID-7 cites the outcome studies; the underlying postural-
  control and anticipatory-adjustment literature (Cain et al., Kavanagh et al., both referenced
  within the fetched papers) has not been read. This is where "why 1.81 years" would be answered.
- **L3 — no injury/epidemiology data for children specifically.** The adult overuse literature in
  `fit-problems.md` does not transfer; children's cycling injuries are predominantly traumatic
  rather than overuse, and nothing here is sourced on that.
- **L3 — nothing on children with disabilities or atypical development**, an area with real
  adaptive-cycling literature and a population for whom fit matters more, not less.
- **L4 — no craft layer.** Teaching progression, how to tell a fit problem from a fear problem in a
  child who cannot articulate either, and how a shop actually fits a kid are all unwritten. The
  coach corpus's methodology chapter is the model here and a cross-link is likely warranted.
