# TrailBuilder Mechanic Corpus — INDEX

The **bike-mechanic** specialist's cited knowledge library. This is the entry point:
the agent (`.claude/agents/bike-mechanic.md`) loads THIS file first, decides which
chapter(s) the question touches, and pulls only those.

**Level.** The corpus is a leveled program, L1 (foundation) → L4 (race-craft) — see
[`CURRICULUM.md`](CURRICULUM.md) for the level definitions and how a chapter is graded. Each
chapter states its current **Maturity** and an honest **## Gaps** list.

**Purpose.** TrailBuilder's whole value is that a "compatible" verdict is *true*. The
engine's tests prove it is self-consistent; they cannot prove its rules are right about
the real world (see [`EXPERT-REVIEW-DOSSIER.md`](../../EXPERT-REVIEW-DOSSIER.md) "Why
you're being asked"). This corpus is the durable, cited record of real mechanical fit
facts — so a mechanic question is answered from sourced facts, not model memory, and so
the answer survives across sessions and models.

**Organizing principle — INTERACTIONS.** Parts are catalogued in isolation, but they
*fail* in combination. Every chapter is built around an **INTERACTIONS** section:
what constrains what, the mismatch failure modes, install-order dependencies, and wear
couplings. A fact about a single part is useful; a fact about how two parts *behave
together* is what a fit-checker actually needs. Interactions are the spine, not an
appendix.

---

## Corpus rules (non-negotiable)

1. **Append-only.** Every fact carries a **stable ID** (`DRV-1`, `BRK-3`, …). Never
   renumber, never rewrite in place. A correction is a **new fact** that references and
   supersedes the old one (`DRV-1 SUPERSEDED BY DRV-42`) — the same discipline as the
   catalog's `ALIASES`. History stays legible; a future reader can see what changed and why.

2. **Every fact carries a fetched-source citation.** The gold standard is a **fetched
   manufacturer or standards-body page/PDF** — never a search-result summary (the
   project's oldest hard-won lesson: *search-result summaries lie*, and have been wrong
   about shock sizes, seatpost diameters, and rotor maxes in this very catalog). A fact
   seeded from a repo doc carries **both** the repo doc AND the primary URL that doc
   records, so the chain to the manufacturer source is never lost. A fact from a lower
   tier (forum/shop/community consensus) is **explicitly labelled as such** with its
   confidence — it never gets dressed up as manufacturer fact.

3. **Facts + citations only — never wholesale-copied text.** Paraphrase the mechanical
   claim; a short quoted phrase under attribution is fine to pin exact wording (e.g. a
   manufacturer's own "Minimum Rotor Size: 200mm"), but a chapter is a distilled record,
   not a reproduction of the source pages.

4. **⚠ CONTRADICTION tag.** When a corpus fact contradicts a **catalog assumption, an
   engine rule, or its tier/direction**, tag the fact `⚠ CONTRADICTION` and state exactly
   which engine `ruleId` / catalog field it collides with. That tag is a signal to the
   **coordinator** — this corpus never edits the engine (see "Boundaries" below); it flags.

5. **Carry the source's own confidence.** The seed docs grade claims
   **confirmed / partial / unsourceable / inference** (fetched-primary vs. reasoned) — keep
   that grading on the fact. A geometry inference ("~1°/20 mm") is not the same tier as a
   fetched spec line, and the fact should say so.

6. **Provenance mirrors the catalog bar.** A false "won't fit" and a false "fits" are
   *both* worse than a missing fact. When the sources genuinely disagree or nothing was
   fetched, the honest entry is "not established" — silence beats a confident wrong fact.

7. **Corpus rule — target the weakest chapter.** The corpus is leveled (L1 foundation → L4
   race-craft; see [`CURRICULUM.md`](CURRICULUM.md)). Every chapter carries a **Maturity**
   line and a **## Gaps** section. A new training round reads every chapter's Maturity +
   Gaps first and prioritizes the weakest-graded chapter(s), closing the specific gaps
   listed rather than re-covering ground a chapter already has — the corpus should climb
   toward "master" evenly, not deepen one system while others stay thin.

---

## Boundaries (what this corpus and its agent may and may not do)

- **Knowledge, not code.** The corpus and the mechanic agent produce **facts and
  recommendations only**. They **never** edit `src/compat.js`, `src/schema.js`, the
  catalog rows, or the tests. Rule activation / tier changes stay behind the **human
  mechanic review** and the coordinator's gated apply process
  ([`tools/MECHANIC-FINDINGS-INTAKE.md`](../MECHANIC-FINDINGS-INTAKE.md) is that process).
- **Recommendations route through the coordinator.** A `⚠ CONTRADICTION` or a proposed new
  rule is a note for the coordinator to triage against the intake template — not a change
  to make.
- **The bar is unchanged.** Adding or strengthening an engine *error* needs a manufacturer
  compatibility doc. Shop/forum consensus can support *softening* or an *info/warning*, or
  a direction-aware refinement, but never a new hard red on its own (this mirrors
  `MECHANIC-FINDINGS-INTAKE.md` §2's "Reading change type against the bar").

---

## Chapters

| Chapter | Covers | Key interactions |
|---|---|---|
| [`drivetrain.md`](drivetrain.md) | shifter · derailleur · cassette · chain · crank · chainring · freehub/driver bodies · single-speed cog | system/actuation matching, chain↔ring standard, cassette range vs mech capacity, freehub↔cassette, chainline |
| [`brakes.md`](brakes.md) | caliper · rotor · mount standards · adapters · levers · lever↔shifter integration | mount match, rotor interface (CL/6-bolt) direction-awareness, rotor-size min/max, caliper rotor ceiling, I-Spec generations |
| [`suspension.md`](suspension.md) | fork · rear shock · travel · trunnion/standard eyes · coil approval | fork travel vs frame, the trunnion-eye law, stroke direction-awareness, shock↔frame bundling |
| [`wheels-tires.md`](wheels-tires.md) | wheel size · hubs · axles · rims · tires · ETRTO | wheel-config consistency, axle spacing, tire↔rim (ETRTO), tire↔frame/fork clearance |
| [`cockpit-contact.md`](cockpit-contact.md) | handlebar · stem · grips · dropper · seatpost · saddle · pedals | bar/stem clamp, dropper diameter + insertion, seatpost shim direction, pedal thread universality |
| [`frame-standards-bearings.md`](frame-standards-bearings.md) | BB shells · crank spindles · bottom brackets · headset/S.H.I.S. · UDH · frame axle & clearance · dropout/single-speed tension | shell×spindle→bearing, S.H.I.S. bore tokens, UDH-for-Transmission, dropout tensioning |

**Off-live note.** BMX and DJ single-speed facts live in the chapters they mechanically
belong to (BMX BB shells in `frame-standards-bearings.md`, BMX drive in `drivetrain.md`,
etc.), each tagged `[BMX]` / `[DJ]`. Per CLAUDE.md hard rule 3 the BMX engine is off-live;
the *knowledge* is catalogued now (BMX go-live was given 2026-07-17), the *rules* stay
where they are until the coordinator activates them.

---

## Seed provenance (where this corpus's first facts came from)

Every chapter was seeded 2026-07-17 from in-repo, already-cited knowledge — mined and
consolidated with the citations intact:

- [`EXPERT-REVIEW-DOSSIER.md`](../../EXPERT-REVIEW-DOSSIER.md) — the rule-by-rule mechanic
  packet + its 2026-07-10 review verdicts and 2026-07-12 appendix.
- [`DOSSIER-OPEN-QUESTIONS-RESEARCH.md`](../../DOSSIER-OPEN-QUESTIONS-RESEARCH.md) — the
  fetched-primary research pass behind those verdicts (the URL trail).
- [`tools/BMX-RULE-SEVERITY-RESEARCH.md`](../BMX-RULE-SEVERITY-RESEARCH.md) — the BMX
  community-consensus severity check.
- [`data/DJ-BMX-COMPAT-ANALYSIS.md`](../../data/DJ-BMX-COMPAT-ANALYSIS.md) — the DJ/BMX
  mechanical-dimensions design doc.
- [`tools/VERIFY-PROTOCOL.md`](../VERIFY-PROTOCOL.md) +
  [`tools/DATA-ENTRY-TEMPLATE.md`](../DATA-ENTRY-TEMPLATE.md) — the verification bar,
  weight-basis conventions, and manufacturer-wording→vocab mapping (domain notes).
- The catalog's own `desc` fields' recurring laws — the **trunnion-eye law**, the
  **fork rotor-mount generational traps**, and the **freehub/driver standards** — carried
  with the fetched sources those descs record.

The seed is a *floor*, not a ceiling: the mechanic agent appends every newly verified fact.
