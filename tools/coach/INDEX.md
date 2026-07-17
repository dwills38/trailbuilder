# TrailBuilder Coach Corpus — INDEX

The **mtb-coach** specialist's cited knowledge library. This is the entry point:
the agent (`.claude/agents/mtb-coach.md`) loads THIS file first, decides which
chapter(s) the question touches, and pulls only those.

**Purpose.** TrailBuilder is a fit-checker; the coach is the *rider-development* layer beside
it. Its bar (Douglas, 2026-07-17) is **master level — "the coach that teaches certified
coaches."** A skills answer must be built from **sourced coaching facts and safe
progressions**, not model memory, and must survive across sessions and models. A confident
wrong *technique* cue is worse than "the corpus doesn't cover this" — because a rider acts on
it, at speed, on terrain. That is the same discipline the mechanic corpus applies to fit facts,
carried into a domain where the failure mode is a crash rather than a part that won't mount.

**Sibling corpus.** This mirrors [`tools/mechanic/INDEX.md`](../mechanic/INDEX.md) exactly in
structure and discipline — same append-only stable IDs, same fetched-source citation bar, same
facts-not-wholesale-text rule, same flag-never-edit engine boundary. Read that INDEX too if you
work across both; the differences are only the two coach-specific additions below (the
SAFETY-FIRST PROGRESSION rule and the honest tacit-layer disclaimer) and the source-tier
adaptation (§ "What counts as a source here").

**Organizing principle — PROGRESSIONS.** The mechanic corpus is organized around INTERACTIONS
(parts fail in combination). Skills are the same: a rider does not "have a corner" — they have a
*ladder* of prerequisite movements that a corner assembles. Every chapter is built around a
**PROGRESSIONS** section: the prerequisite skills each entry depends on, the ordered steps that
build it, the common errors and their corrections, and the way skills couple (vision feeds
cornering; braking control gates descending; the manual gates drops). A cue in isolation is
useful; the *order* in which cues are safe to introduce is what a coach actually needs.
Progressions are the spine, not an appendix.

---

## Corpus rules (non-negotiable)

1. **Append-only.** Every fact carries a **stable ID** (`FND-1`, `COR-3`, …). Never renumber,
   never rewrite in place. A correction is a **new fact** that references and supersedes the old
   one (`COR-1 SUPERSEDED BY COR-42`) — the same discipline as the catalog's `ALIASES` and the
   mechanic corpus. History stays legible; a future reader sees what changed and why.

2. **Every fact carries a fetched-source citation.** The gold tier is a **fetched certification-
   body curriculum / standard or an established coaching authority's published technique page**
   — never a search-result summary alone (the project's oldest lesson: *summaries lie*). Where a
   fact rests on multiple independent coaching sources agreeing, cite them as a **consensus** and
   say so — cross-corroboration is how a technique claim earns its tier here (see § "What counts
   as a source"). A fact seeded from a repo doc carries both the repo doc AND the primary URL.

3. **Facts + progressions, never wholesale text.** Paraphrase the cue and the movement; a short
   quoted phrase under attribution is fine to pin exact wording (a coach's own "heavy feet, light
   hands"), but a chapter is a distilled record, not a reproduction of the source pages. One quote
   per answer, under 15 words, attributed — the project's copyright discipline.

4. **⚠ SAFETY-FIRST PROGRESSION (coach-specific, load-bearing).** *Every skill entry MUST carry
   three things:* its **Prerequisites** (the skills that must already be solid), its
   **Gear context** (the protective equipment and terrain the progression assumes), and its
   ordered **Progression steps** (introduce → develop → commit, never straight to the committed
   version). **No entry may present a skill in a way that skips the ladder** — no "here's how to
   hit a 4-foot drop" without the wheel-lift / rolling-drop / small-drop rungs beneath it and the
   gear/terrain the step assumes. When a source teaches a skill without its prerequisites, the
   corpus **adds the missing rungs** (cited) rather than reproducing the shortcut. A cue that is
   safe for an advanced rider and dangerous for a beginner is **tagged with the level it belongs
   to.** This rule exists because the failure mode of this corpus is injury, not inconvenience.

5. **⚠ DISPUTED tag for coaching disagreements.** Coaching is not settled science; reputable
   authorities genuinely disagree (the "get your weight back" descent cue is the canonical
   example — see `CLD` chapter). When sources conflict, tag the fact `⚠ DISPUTED`, present
   **both** positions with their sources and the terrain/level each applies to, and do **not**
   collapse them into one confident cue. A false certainty in a disputed area is itself an error.

6. **⚠ CONTRADICTION tag (engine/catalog boundary).** If a coaching fact ever collides with a
   TrailBuilder **catalog assumption or engine rule** (e.g. a technique that presumes a component
   behavior the catalog models differently), tag it `⚠ CONTRADICTION`, name the exact `ruleId` /
   catalog field, and hand it to the **coordinator**. This corpus never edits the engine (see
   "Boundaries"); it flags. This will be rare — the coach is a rider layer, not a fit layer.

7. **Carry the source's own confidence and the direction/terrain it applies to.** A cue is almost
   never universal: it is right *for this terrain, this speed, this level* and wrong outside it
   (weight-centred vs weight-back is the same cue at different gradients). State the envelope. A
   symmetric answer to an asymmetric reality is a bug — exactly as in the mechanic corpus.

8. **Both errors cost — and the honest floor is "not established."** A false "this is safe to
   try" sends a rider off a ladder rung they haven't earned; a false "you can't do that yet"
   stalls a rider who could. When sources genuinely disagree or nothing was fetched, the honest
   entry is "not established — here's what would settle it." Silence beats a confident wrong cue.

9. **Target the weakest chapter.** Future training rounds read every chapter's **Maturity** line
   and **## Gaps** list first (defined in [`CURRICULUM.md`](CURRICULUM.md)) and prioritize the
   **weakest-graded chapter(s)**, closing the listed gaps rather than re-deepening a strong one.
   The corpus climbs toward "master" evenly.

---

## The honest tacit-layer disclaimer (read before trusting any answer)

Riding skill has a **coachable, documentable layer** and a **tacit, felt layer**. This corpus is
a record of the **documented coachable layer only** — the cues, sequences, errors, and
progressions that certification bodies and established coaches put in words. It is **not** a
substitute for:

- **In-person coaching and real-time error detection.** A cue on a page cannot watch your outside
  foot, feel your braking, or catch the one habit holding you back. The whole reason
  certification bodies exist is that *error detection & correction on a live rider* is the skill —
  and it is not reducible to text.
- **The felt/tacit layer.** Balance, grip-at-the-limit, timing, and "when it's right" are learned
  in the body, not read. The corpus can describe the target; it cannot transfer the feel.
- **Your own progression and terrain judgment.** Every entry assumes appropriate gear, appropriate
  terrain, and that you have the prerequisite skills solid. The corpus states those assumptions; it
  cannot verify them for you.

An answer from this corpus is **cited coaching knowledge to inform practice and lesson design**,
delivered with its level and gear/terrain envelope — never a warranty that a maneuver is safe for
a given rider on a given day. Where a maneuver carries real injury risk, the corpus says so and
names the rung beneath it, but the rider (and, ideally, a coach on site) owns the go/no-go.

---

## What counts as a source here (tier adaptation)

Riding technique is not a "manufacturer spec," so the mechanic corpus's "fetched manufacturer
page = gold" maps onto coaching as a **tiered authority ladder**. Label the tier of every claim:

- **Tier A — certification-body curriculum / standard** (PMBIA, BICP/ICP, national federations):
  the closest thing to a governing standard. *Caveat learned in the bootstrap ingest: the
  detailed curricula are largely **member-walled** (icp.bike Minimum Ride Standards is
  purchase-gated; PMBIA course manuals are member-only). Public **methodology** — the IDEA
  progression, the six-skill pyramid, What/Why/How — is available via the bodies' own pages and
  reputable secondary coverage; cite it as certification-body method, and mark where the detail
  is walled.*
- **Tier B — established coaching authority, published technique page** (e.g. BikeRadar skills,
  evo/Fluidride academy, BetterRide, Lee McCormack / RideLogic, REI Expert Advice, dedicated
  coach sites with a named author and a coherent method). A single Tier-B page is a real source.
- **Tier B-consensus — multiple independent Tier-B sources agreeing.** The strongest tier this
  domain usually offers for a technique fact; treat a cue corroborated across ≥3 independent,
  method-serious sources as high-confidence, and say "consensus."
- **Tier C — biomechanics / sports-science literature.** Primary research (journal / PubMed) that
  grounds *why* a cue works (traction, centre-of-mass, braking dynamics). Highest rigor for
  mechanism, thinnest coverage of MTB specifically — mostly an L3/L4 deepening source.
- **Tier D — community/forum/rider-lore.** Real but lowest; usable to describe a "feels like"
  spectrum or flag that riders disagree, **never** to assert a safe-to-attempt progression on its
  own. Label it plainly.

**The safety bar mirrors the mechanic's engine bar:** presenting a maneuver as *safe to attempt
at a given level* (the coach's analog of a hard "fits") needs Tier-A/B-consensus support and its
full SAFETY-FIRST ladder. Community lore can *soften* ("some riders find…"), add nuance, or flag
a dispute — but never promote a rider up the ladder on its own.

---

## Boundaries (what this corpus and its agent may and may not do)

- **Knowledge, not code.** The corpus and the coach agent produce **facts, progressions, and
  lesson recommendations only.** They **never** edit `src/compat.js`, `src/schema.js`, the catalog
  rows, or the tests. Anything touching the engine/catalog is **flagged** (`⚠ CONTRADICTION`),
  not changed.
- **No prescribing to a specific rider's body/injury.** The coach teaches technique and
  progression; it does not give individual medical, injury-rehab, or fitness-prescription advice.
  When a question is really "is this safe for *my* knee/back," the honest answer names the limit
  and points to a professional.
- **Recommendations route through the coordinator** — a proposed new chapter, a cross-link to the
  fit engine, or a `⚠ CONTRADICTION` is a note for the coordinator to triage, not a change to make.

---

## Chapters

| Chapter | Covers | Level | Key progressions |
|---|---|---|---|
| [`fundamentals.md`](fundamentals.md) | body position (neutral/ready-attack) · balance · vision · bike-body separation | L1 | position→balance is the base of every other skill; vision feeds cornering & descending |
| [`braking-traction.md`](braking-traction.md) | braking (front/rear, modulation, bracing) · traction & the grip budget · surface reading | L1 | progressive braking → threshold control → brake-then-turn; the "grip budget" gates cornering |
| [`cornering.md`](cornering.md) | flat · bermed · off-camber corners · line choice · (switchbacks →L2) | L1→L2 | vision + outside-foot + bike-body separation assemble the corner; berms vs flat vs off-camber |
| [`climbing-descending.md`](climbing-descending.md) | climbing technique · descending · steeps · weight distribution by gradient | L1→L2 | centred base → gradient-driven weight shift → steep-roll commitment; the weight-back ⚠ DISPUTE |
| [`terrain-features.md`](terrain-features.md) | pumping · manuals · wheel lifts · drops · jumps · rock gardens · switchbacks · steeps | L2 | wheel-lift → pump/manual → rolling drop → small drop → jump; the ladder that MUST NOT be skipped |
| [`discipline-craft.md`](discipline-craft.md) | XC · enduro · DH race technique · DJ/pump-track/park basics | L3 | discipline-specific application of L1/L2 skills under race/park constraints |
| [`coaching-methodology.md`](coaching-methodology.md) | teaching models (IDEA, What/Why/How) · skill diagnosis · error detection · progression & lesson design | L4 | how a coach *builds* the ladder for a rider — the "teach the coach" layer |

**Level note.** The chapter level marks where its *core* content sits; each chapter is graded
separately for **Maturity** (foundation/professional/master) in its own header — see
[`CURRICULUM.md`](CURRICULUM.md). A chapter can be `foundation`-mature even at an L1 level if
depth is still thin.

---

## Seed provenance (where this corpus's first facts came from)

Seeded 2026-07-17 in the coach-bootstrap round, via a fetched L1 ingest of the four core-skill
areas plus the certification-body methodology, cross-corroborated across independent sources:

- **Certification bodies (Tier A, methodology):** PMBIA (six-skill pyramid; IDEA progression;
  What/Why/How; ~60% practice) and BICP/ICP (16 L1 Fundamental Skills; Minimum Ride Standard;
  error detection & correction) — public method pages + reputable secondary coverage; the detailed
  curricula are member-walled (recorded in the L2–L4 fetchability map below).
- **Established coaching authorities (Tier B / B-consensus):** REI Expert Advice
  (neutral & ready position, braking, climbs/descents), BikeRadar (attack position, braking),
  mtbtechniques.co.uk (progressive braking, front/rear balance), evo/Fluidride (steep-descent
  "throne" / flexion-creates-extension), BetterRide (front-brake primacy, the weight-back
  correction), promountainbike.com (descending & cornering breakdowns), Liv Cycling and
  coachlevi.com (climbing body position), and a multi-source cornering consensus
  (promountainbike / thetoliver / WildSide / DavidMTB / Bike Network).
- Every fact records its fetched URL(s) and tier; the ⚠ DISPUTED weight-back item records **both**
  sides. The seed is a **floor, not a ceiling** — the coach agent appends every newly verified fact.

## L2–L4 fetchability map (for the next rounds)

- **L4 instructor curricula are the standout wall.** PMBIA course manuals = member-only; BICP/ICP
  Minimum Ride Standards & skill-demo videos = purchase-gated. The *methodology* is public; the
  *graded skill lists and assessment rubrics* need a membership or a member contact. Flag to
  Douglas as a potential paid-access decision for true L4 depth.
- **Tier-B coach sites fetch well via Exa** (promountainbike, evo, BikeRadar, coach blogs).
  **REI times out on WebFetch and Exa's crawler returned CRAWL_NOT_FOUND** on the article URL —
  but Exa **search highlights** surface REI content reliably; use search-highlight for REI.
- **L3 discipline race-craft** is partially fetchable (Red Bull, pro-coach blogs, team content)
  but thinner and more community-tiered; expect Tier-B/D mix.
- **Tier-C biomechanics** (braking dynamics, centre-of-mass, traction) — **first pass done
  2026-07-17 (biomechanics round):** braking weight-transfer + pitch-over critical deceleration +
  friction-circle (BRK-8..11), steady-turn lean angle `tan θ = v²/gr` + countersteer (COR-9..11),
  pumping-as-CoM-work + jump projectile motion (TER-11..13), rider-as-suspension + vibration cost +
  gradient weight-transfer (CLD-8..10). Sources reachable via PubMed MCP (Miller, Gotardi, Cowell)
  and Exa (Klug, Skatulla/Maier, Cain, Golembiewski, Kogelbauer, Meijaard). Still thin: MTB-specific
  loose-surface tyre/traction data (models are firm-surface/road-biased).
