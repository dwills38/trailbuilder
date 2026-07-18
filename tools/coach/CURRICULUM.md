# TrailBuilder Coach Corpus — CURRICULUM

Douglas's bar (2026-07-17): the coach should become **"the coach that teaches certified
coaches" — master level**, not a hobbyist FAQ. That is a multi-round program, not a single
grind. This file defines the levels so every future training round knows what depth it is adding
and where the corpus currently stands. Read after [`INDEX.md`](INDEX.md); the corpus rules
(citation discipline, append-only, ⚠ SAFETY-FIRST PROGRESSION, ⚠ DISPUTED, ⚠ CONTRADICTION) apply
at every level unchanged. It mirrors the mechanic corpus's [`CURRICULUM.md`](../mechanic/CURRICULUM.md).

**The through-line at every level: SAFETY-FIRST PROGRESSION.** Deeper does not mean "harder tricks
listed faster." A master-level entry is one whose *ladder and error-correction are complete*, not
one that reaches the flashiest maneuver. L4 is reached by teaching the coach how to build the
ladder — not by documenting a bigger jump.

---

## The four levels

### L1 — Foundation (core skills)
The skills every rider needs before anything else, taught to beginners and re-taught to everyone:
**body position** (neutral & ready/attack), **balance & vision**, **braking**, **traction**,
**climbing**, **descending**, **cornering** (flat/bermed/off-camber). Sources: certification-body
public method (PMBIA six-skill pyramid, BICP 16 fundamentals), established coaching authorities
(REI, BikeRadar, evo/Fluidride, BetterRide, promountainbike, Liv, coach blogs). **This is the
bootstrap seed + the first training round's target** — broad, safe coverage of the core-skill
chapters' progressions, not deep discipline internals.

### L2 — Advanced trail
The maneuvers that make a rider a *trail* rider, each gated by an L1 prerequisite ladder:
**pumping**, **wheel lifts** (front/rear), **manuals**, **bunny hops**, **rolling & committed
drops**, **jumps** (tabletop → gap progression), **switchbacks**, **steeps & chutes**, **rock
gardens & roots**. L2 is where SAFETY-FIRST bites hardest — these are the skills a page can most
easily present dangerously by skipping rungs. L2 depth means: for each maneuver, the full
introduce→develop→commit progression, the prerequisites named, the gear/terrain envelope, the
canonical errors and their corrections, and the "you are not ready if…" gate. Sources: Tier-B
coach breakdowns + certification L2 method (where reachable).

### L3 — Specialist / discipline craft
Depth beyond general trail coaching — the discipline-specific application a racer or park rider
needs that a generalist doesn't:
- **XC race technique** — efficiency, seated-power climbing, race-line economy, remounts.
- **Enduro** — transition/stage management, pacing, line memory, fatigue-state technique.
- **DH race technique** — high-speed line choice, braking-point discipline, terrain-at-speed.
- **DJ / pump-track / park** — airtime control, whips/tricks foundations, transition reading.
- **The biomechanics *why*** (Tier-C): braking dynamics, centre-of-mass management, traction
  physics, vision/perception under load — the mechanism layer under the L1/L2 cues.
L3 leans more on Tier-B/C and labelled practitioner sources; discipline race craft is thinner in
public documentation than L1/L2.

### L4 — Coaching-the-coach (race-craft of teaching)
Practitioner judgment about *teaching itself* — the level that earns the "would teach certified
coaches" bar:
- **Teaching models** — IDEA progression (Introduce/Develop/Experiment), What/Why/How skill
  introduction, the explain→demo→practice(≥60%)→feedback lesson format (PMBIA method).
- **Skill diagnosis & error detection** — reading a rider, isolating the *root* error (not the
  symptom), the BICP error-detection-&-correction discipline.
- **Progression design** — building a bespoke ladder for a rider/group, site selection, goal
  setting, session sequencing.
- **Group & risk management** — terrain selection for safety, managing mixed-ability groups,
  the go/no-go call.
This is the level with the **thinnest public documentation** (certification curricula are
member-walled — see INDEX's fetchability map), so expect L4 facts to lean on certification-body
*method* pages, labelled practitioner tiers, and — where Douglas approves paid access — the
gated curricula themselves. It arrives last and slowest.

---

## Grading a chapter

Each chapter file carries a **Maturity** line right under its title, one of:

- **foundation** — L1 coverage only (the common case after the bootstrap seed and first round).
- **professional** — L1 complete + meaningful L2 depth (full maneuver progressions with
  prerequisites, gear envelopes, and error-correction) across most of the chapter's skills.
- **master** — L1 + L2 complete, plus L3 discipline depth and/or L4 coaching-methodology depth on
  the chapter's domains, with biomechanics (Tier-C) grounding where it exists.

Grade **honestly** — a chapter with a few L2 progressions and mostly L1 cues is still
`foundation`, not `professional`. A maneuver documented **without its safety ladder does not
count toward maturity at all** — an incomplete rung is a gap, not depth. Each chapter ends with a
**## Gaps** section: an honest, specific list of what's missing to reach the next level (e.g.
"no gap-jump progression past tabletop — L2 gap" or "no braking-dynamics biomechanics source —
L3 gap"). The Gaps list is what the next round reads to pick its target.

## Current state (round 4, 2026-07-18)

| Chapter | Level | Maturity | Note |
|---|---|---|---|
| `fundamentals.md` | L1→L2 | professional | round 3 (2026-07-18) added FND-8 (vision drill depth: near/far scanning, target-fixation correction) and FND-9 (bike-body-separation staged drill, tied to COR-12/13 physics) |
| `braking-traction.md` | L1→L2 | professional | round 3 (2026-07-18) added BRK-12 (measured modulation drill with stick-marked milestones) and BRK-13 (wet-root/mud split-braking + lean-angle-scaled front-brake reduction) |
| `cornering.md` | L1→L2 | professional | round 2 added dedicated berm-line + switchback progressions (COR-9/10); round 3 (2026-07-18) unblocked and laddered the stoppie-pivot family (COR-15/16), superseding COR-10b's withheld status — the "cutty" controlled-slide technique remains flagged-not-laddered |
| `climbing-descending.md` | L1→L2 | professional | round 4 (2026-07-18) closed technical climbing (CLD-11/12/13: ledges, loose-surface traction, switchbacks), off-camber traverses (CLD-14/15), the steep-roll→committed-chute three-rung ladder (CLD-16, cross-referenced against CLD-8/9/10 physics), and extended-descent fatigue/brake-fade craft (CLD-17, cross-referencing `mechanic/brakes.md` BRK-25 rather than duplicating it) — no fresh ⚠ DISPUTED item surfaced; CLD-4/5 remains the corpus's canonical example |
| `terrain-features.md` | L2 | professional | round 2: full Prereq/Gear/Progression for pumping, front/rear wheel lifts, manual, bunny hop, drops, jumps, rock gardens/roots; round 3 (2026-07-18) closed the TER-10 committed-chute gap; L3 discipline application + fuller biomechanics still gaps |
| `discipline-craft.md` | L3 | professional | round 2 seeded one core-craft fact per discipline; round 3 (2026-07-18) added a second sourced fact per discipline (XC pacing, enduro stage-day logistics, DH line-choice process + maximal braking, the whip) — each discipline still short of a full 3+-fact progression *set* (see the chapter's Gaps) |
| `coaching-methodology.md` | L4 | professional | round 4 (2026-07-18) L4 public-source closeout: added the Training Wheel model + public assessment-progression bullets (CCH-9), BICP's own tiered coach-certification ladder (CCH-10), the NSCA "FIX IT" evidence-based error-correction framework (CCH-11), Hossner et al.'s peer-reviewed functional root-cause/personal-style framework (CCH-12), contextual-interference motor-learning research sharpening CCH-7 (CCH-13), and the "Challenge by Choice" group/risk-management model (CCH-14). **Per Douglas's 2026-07-18 decision, the walled graded rubrics (PMBIA's full six skills, BICP's named 16 + Minimum Ride Standard) are now PERMANENTLY out of scope — not a pending gap** — the chapter is graded `professional` against a public-source-master ceiling, honestly short of `master` on the still-open L2/L3 teaching-progression-for-a-specific-maneuver gap |

## Corpus rule: target the weakest chapter

Restated from [`INDEX.md`](INDEX.md) rule 9: future training rounds read every chapter's Maturity
line + Gaps list first and prioritize the **weakest-graded chapter(s)**. After round 4 (2026-07-18),
**all seven chapters are now `professional`** — the corpus has climbed evenly off its bootstrap
seed with no chapter left at `foundation`. The next round should pick its target from each chapter's
individual Gaps list rather than a single chapter-level weakest-link (there isn't one anymore):
`terrain-features.md`'s L3 discipline application, `discipline-craft.md`'s thin per-discipline
fact sets, `climbing-descending.md`'s root-garden climbing/XC-efficiency gaps, and
`coaching-methodology.md`'s L2/L3 teaching-progression-for-a-specific-maneuver and
mixed-ability-group-sequencing gaps are the strongest remaining candidates for a push toward
`master`. Reaching `master` corpus-wide is the next real milestone, not another `foundation` chapter
to rescue.
