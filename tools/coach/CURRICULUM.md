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

## Current state (bootstrap round, 2026-07-17)

| Chapter | Level | Maturity | Note |
|---|---|---|---|
| `fundamentals.md` | L1 | foundation | seeded — position/balance/vision core facts |
| `braking-traction.md` | L1 | foundation | seeded — progressive braking, grip budget, front-brake primacy |
| `cornering.md` | L1→L2 | professional | round 2 (2026-07-17) added dedicated berm-line + switchback progressions (COR-9/10); pivot/cutty family for ultra-tight switchbacks flagged not laddered (COR-10b) |
| `climbing-descending.md` | L1→L2 | foundation | seeded — incl. the ⚠ DISPUTED weight-back item |
| `terrain-features.md` | L2 | professional | 2026-07-17 round 2: full Prereq/Gear/Progression for pumping, front/rear wheel lifts, manual, bunny hop, drops, jumps, rock gardens/roots; switchback/chute cues + biomechanics still gaps |
| `discipline-craft.md` | L3 | foundation | 2026-07-17 round 2: XC/enduro/DH/DJ each got a sourced core-craft fact; still short of full L2-style progressions per discipline |
| `coaching-methodology.md` | L4 | foundation | seeded — IDEA / What-Why-How / lesson format / error detection |

## Corpus rule: target the weakest chapter

Restated from [`INDEX.md`](INDEX.md) rule 9: future training rounds read every chapter's Maturity
line + Gaps list first and prioritize the **weakest-graded chapter(s)** — currently the two
skeletons (`terrain-features.md` for L2, `discipline-craft.md` for L3) — closing the specific
listed gaps rather than re-covering ground a chapter already holds. This keeps the corpus climbing
toward "master" evenly instead of over-deepening one skill family while others stay thin.
