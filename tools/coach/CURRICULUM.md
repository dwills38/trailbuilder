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

## Current state (round 5, 2026-07-18 — the master round)

**Round 5 summary.** Two chapters reached **master**: `coaching-methodology.md` (both gaps its own
round-4 grade named as the reasons it fell short are closed — CCH-15 maneuver-specific teaching,
CCH-16 go/no-go, CCH-17 mixed-ability group management, CCH-18 the MTB motor-learning finding) and
`cornering.md` (COR-17's low-grip cue set, COR-18's terramechanics cross-check). `discipline-craft.md`
closed three of four named gaps (DSC-11 race-craft, DSC-12 DH compression loads, DSC-13 the scrub)
but stays `professional` because XC and enduro still carry only two facts each.
`terrain-features.md` gained TER-14 (wet/loose) and stays `professional`.

**Two corpus-wide corrections came out of this round, both recorded in `INDEX.md`:**
1. **The "instructor curricula are walled" premise was over-generalized** from PMBIA/BICP. National
   federations and national leader awards publish curriculum-grade material free and public —
   Cycling UK's full 10-unit MTB Leader Resource, NICA's coach education, NZQA 30678, GSMBC's
   teaching method. **Cycling UK Unit 3 (Instructing Riding Skills) is likely the richest unfetched
   L4 target in the corpus.**
2. **MTB-specific motor-learning research appears not to exist** in the biomedical indexes, and in
   the nearest comparable sports the contextual-interference effect fails to replicate. That bounds
   how strongly practice-design claims may be stated. Do not re-run the PubMed hunt (CCH-18).

| Chapter | Level | Maturity (round 5) | Round-5 change |
|---|---|---|---|
| `fundamentals.md` | L1→L2 | professional | no new facts; FND-9's body-lean/bike-lean gap now has its *qualitative* half answered via COR-17/COR-18 (direction and driver sourced; no numeric threshold exists) |
| `braking-traction.md` | L1→L2 | professional | no new facts; BRK-10's grip budget gained its **first loose-surface corroboration** via COR-18's ATV friction-ellipse result (mechanism only, scale-caveated) |
| `cornering.md` | L1→L2 | **master** | COR-17 (low-grip loose/dust/wet/off-camber cue set, B-consensus, with an inverting terrain envelope) + COR-18 (terramechanics cross-check qualifying COR-12) |
| `climbing-descending.md` | L1→L2 | professional | unchanged this round |
| `terrain-features.md` | L2 | professional | TER-14 (wet/loose grip model + approach/run-out craft); wet takeoff/in-air technique recorded as **not established** |
| `discipline-craft.md` | L3 | professional | DSC-11 race-craft, DSC-12 DH compression/G-outs, DSC-13 the scrub — all Tier B interviews, labelled; XC/enduro asymmetry holds the grade |
| `coaching-methodology.md` | L4 | **master** (public-source ceiling) | CCH-15, CCH-16, CCH-17, CCH-18 |

## Round 6 (2026-07-18)

**Round 6 summary.** Closed both of round 5's named priorities. `discipline-craft.md`: DSC-14 (XC
technical race-line efficiency) and DSC-15 (enduro fatigue-state technique degradation — which also
supplies DSC-3's first independent corroboration) bring every discipline to three fetched facts,
closing the specific asymmetry that held the chapter at `professional`; DSC-16 separately closed
DSC-11's own named remainder, actual pit/mechanic race procedure. `coaching-methodology.md`: mined
Cycling UK Unit 3 as round 5 flagged — CCH-19 (the 4 E's, a session-level gate above the existing
teaching-model stack, Maslow-grounded), CCH-20 (positive-framing error correction +
how/what/where/when/why feedback), CCH-21 (games-first/incidental-learning session design, narrowing
but not closing the session-plan-template gap).

**Grading note:** `discipline-craft.md` stays `professional`, not `master`, despite closing the
asymmetry — DSC-6 (Tier-C biomechanics) is still unfetched, and the CURRICULUM's own master bar for
this chapter requires biomechanics grounding where it exists. `coaching-methodology.md` stays
`master` (public-source ceiling, unchanged) — CCH-19/20/21 are new depth within an already-master
chapter, not a maturity change, and they are honestly flagged single-source (Cycling UK Unit 3
only) pending future corroboration.

| Chapter | Level | Maturity (round 6) | Round-6 change |
|---|---|---|---|
| `fundamentals.md` | L1→L2 | professional | no change |
| `braking-traction.md` | L1→L2 | professional | no change |
| `cornering.md` | L1→L2 | master | no change |
| `climbing-descending.md` | L1→L2 | professional | no change |
| `terrain-features.md` | L2 | professional | no change — round 7's clearest target (see below) |
| `discipline-craft.md` | L3 | professional | DSC-14, DSC-15, DSC-16 — XC/enduro asymmetry closed, pit/mechanic procedure closed; DSC-6 biomechanics is now the specific gap holding `master` |
| `coaching-methodology.md` | L4 | master (public-source ceiling) | CCH-19, CCH-20, CCH-21 (Cycling UK Unit 3) |

### Where round 7 should go
1. **`terrain-features.md` is now the clearest remaining target** — it has had no new facts since
   TER-14 (round 5) and its L3 discipline application + the manual/preload force-curve physics gap
   (named since the bootstrap round) are both still open.
2. **`discipline-craft.md`'s DSC-6 (Tier-C biomechanics)** — the specific, named reason the chapter
   stays `professional` despite every discipline now carrying three facts; a strong standalone
   target since it would deepen facts corpus-wide, not just this chapter (same argument the chapter's
   own Gaps section has made since the bootstrap round).
3. **Corroborate single-source depth facts**: CCH-15 (Triangle of Success, two of three axes),
   COR-15/16 (stoppie pivot), DSC-10 (whip), DSC-13 (scrub), DSC-14/DSC-15 (XC line efficiency,
   enduro fatigue craft — new this round), and CCH-19/20/21 (all single-source to Cycling UK Unit 3
   — new this round, no independent corroboration yet).
4. **Cycling UK Units 1 (Ride Preparation) and 8 (Dealing with Emergencies)** remain unmined, as does
   NZQA unit standard 30678 — the national-federation-source vein round 5 opened and round 6 mined
   one unit of is not exhausted.

## Superseded state (round 4, 2026-07-18)

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

**Round 6 update (2026-07-18):** two chapters remain `master` (`coaching-methodology.md`,
`cornering.md`) and five remain `professional`, but `discipline-craft.md`'s round-5 weakness (the
XC/enduro fact-count asymmetry) is now closed — see "Round 6" above. **`terrain-features.md`, with
no new facts since round 5, is the weakest link entering round 7** (see "Where round 7 should go"
above).

**Round 5 update (2026-07-18):** two chapters are now `master` (`coaching-methodology.md`,
`cornering.md`) and five remain `professional`. The rule therefore bites again in its original form —
there IS a weakest link now, and it is **`discipline-craft.md`** (see "Where round 6 should go"
above). The paragraph below describes the round-4 situation and is kept for history.

---

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
