# TrailBuilder Mechanic Corpus — CURRICULUM

Douglas's bar (2026-07-17, mid-bootstrap): the corpus should eventually be **"the type that
would teach World Cup mechanics"** — not a hobbyist FAQ. That is a multi-round program, not a
single grind. This file defines the levels so every future training round knows what depth it's
adding and where the corpus currently stands. Read after [`INDEX.md`](INDEX.md); the corpus
rules (citation discipline, append-only, ⚠ CONTRADICTION) apply at every level unchanged.

---

## The four levels

### L1 — Foundation
General-public repair/compat literacy: what fits what, common failure modes, install-order
basics. Sources: Park Tool repair-help library, sheldonbrown.com, brand tech/FAQ pages, and this
project's own prior research docs (`EXPERT-REVIEW-DOSSIER.md`,
`DOSSIER-OPEN-QUESTIONS-RESEARCH.md`, etc.). **This is the bootstrap seed + the first training
grind's target** — broad coverage of the six chapters' core interactions, not deep internals.

### L2 — Full service-manual depth
Complete manufacturer dealer/service-manual coverage, per generation, including the internals a
shop mechanic opens up for: SRAM service PDFs (derailleur/shifter service, AXS pairing/firmware,
crank/BB installation torque), Shimano dealer manuals (si.shimano.com PDFs — brake bleed
procedures, freehub service, Di2/wireless pairing), Fox and RockShox **full damper/air-spring
service** (not just external travel/mount specs — compression/rebound circuit internals, oil
volumes, seal kits), and **torque-spec tables** across all fastener interfaces (stem bolts, rotor
bolts, cassette lockring, BB, headset). L2 is where "fits" becomes "fits, and here's how it's
correctly installed/serviced."

### L3 — Specialist domains
Depth that exceeds general dealer manuals — the stuff a wheel builder, a suspension tuner, or a
frame engineer knows that a generalist shop mechanic doesn't:
- **Wheel building / spoke-tension engineering** — lacing patterns, spoke-tension targets and
  balance, dish, fatigue/failure modes.
- **Bearings / press-fit tolerances** — BB shell bore tolerances, bearing press specs, creak
  diagnosis, interference-fit engineering (not just "which shell fits which spindle").
- **Frame-standards minutiae** — the generational/regional variants inside a single nominal
  standard (e.g. the BB30/PF30 tolerance-stack disputes, UDH revision history).
- **Drivetrain wear science** — chain elongation measurement, wear-coupling curves (chain vs
  cassette vs ring life), lubrication chemistry.
- **Tubeless engineering** — rim-bed/bead-hook tolerances, sealant chemistry and failure modes,
  pressure/burp thresholds by casing.

### L4 — Race-craft
Practitioner judgment under competition constraints: race-day prep checklists, pit-stop
procedures, failure-mode prevention (what actually breaks under World Cup loads and how
top-tier mechanics preempt it), tire/pressure/suspension setup as race strategy rather than fit
compatibility. This is the level that earns the "would teach World Cup mechanics" bar — it's
also the level with the thinnest public documentation, so expect L4 facts to lean more on
labelled community/practitioner tiers than L1-L2's manufacturer-primary sources, and to arrive
last and slowest.

---

## Grading a chapter

Each chapter file carries a **Maturity** line right under its title, one of:

- **foundation** — L1 coverage only (the common case after the bootstrap seed and the first
  training round).
- **professional** — L1 complete + meaningful L2 depth (service-manual internals, torque specs)
  across most of the chapter's parts.
- **master** — L1 + L2 complete, plus L3 specialist depth on the chapter's domains and (where
  applicable) L4 race-craft notes.

Grade **honestly** — a chapter with a few deep L2 facts and mostly L1 coverage is still
`foundation`, not `professional`. Each chapter also ends with a **## Gaps** section: an honest,
specific list of what's missing to reach the next level (e.g. "no RockShox damper-internals
service data yet — L2 gap" or "no spoke-tension target table — L3 gap"). The Gaps list is what
the next training round reads to pick its target, per the corpus rule below.

## Corpus rule: target the weakest chapter

Added to [`INDEX.md`](INDEX.md)'s corpus rules — future training rounds read every chapter's
Maturity line + Gaps list first and prioritize the **weakest-graded chapter(s)**, closing the
specific gaps listed rather than re-covering ground a chapter already has. This keeps the corpus
climbing toward "master" evenly instead of over-deepening one system while others stay thin.
