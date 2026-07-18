# TrailBuilder UI/UX Corpus — CURRICULUM

Defines the levels so every future training round knows what depth it is adding and where the
corpus stands. Read after [`INDEX.md`](INDEX.md); the corpus rules (citation discipline,
append-only, ⚠ CONTRADICTION, ⚠ SITE-CONSTRAINTS) apply at every level unchanged. Mirrors the
mechanic and coach corpora's CURRICULUM files.

---

## The four levels

### L1 — Fundamentals
The testable floors and load-bearing conventions every screen must meet: **touch-target
minimums** (WCAG 2.5.8 / Apple 44 pt / Android 48 dp), **thumb-reach**, **viewport/safe-area**,
**WCAG 2.2 AA** (contrast, focus, reflow, motion), **content-driven breakpoints**, the
**never-horizontal-scroll rule**, **Core Web Vitals budgets**, core **form/nav research** (NN/g).
Sources: standards bodies + platform vendors + NN/g. **This is the bootstrap seed's target.**

### L2 — Applied patterns
The named patterns that make dense data work: disclosure/progressive-filtering patterns for
filter rails, accessible range-slider and chip-row implementations (WAI-ARIA APG), responsive
data-table strategies, comparison-view patterns, empty/loading/error states, sticky-element
behavior, hash-route deep-linking conventions. L2 depth means: for each pattern, the canonical
accessible implementation, its failure modes at 375 px, and the tradeoff record.

### L3 — Craft depth
The judgment layer under the patterns: typography systems and vertical rhythm without
webfonts, spatial density theory (when compact beats comfortable), color-system design across
themes, motion design under `prefers-reduced-motion`, dark-mode contrast math, perceived-
performance choreography (skeletons vs spinners — and what the research actually shows),
internationalization/RTL awareness. Leans on Tier-B/C with Tier-A anchors.

### L4 — Measurement & research methods
How to *know* instead of guess: usability-test design at small N, task-based benchmark
metrics, funnel/analytics interpretation (the site has Cloudflare Web Analytics only — no
per-user tracking), A/B constraints on a static site, heuristic-evaluation method (Nielsen's
10), accessibility audit method (WCAG-EM), field CWV monitoring. This is what turns the agent
from "cites standards" into "designs the study that settles a dispute."

---

## Grading a chapter

Each chapter carries a **Maturity** line under its title:

- **foundation** — L1 coverage only (the expected state after the bootstrap seed).
- **professional** — L1 complete + meaningful L2 pattern depth (canonical implementations with
  failure modes and tradeoffs) across most of the chapter's scope.
- **master** — L1+L2 complete, plus L3 craft and/or L4 measurement depth on the chapter's
  domains.

Grade **honestly** — a chapter with one L2 pattern and mostly L1 floors is still `foundation`.
A pattern documented without its accessibility contract does not count toward maturity at all.
Each chapter ends with a **## Gaps** section the next round reads to pick its target.

## Current state (bootstrap round, 2026-07-18)

| Chapter | Level | Maturity | Note |
|---|---|---|---|
| `mobile-fundamentals.md` | L1 | foundation | seeded — target floors, thumb-zone data, viewport/safe-area |
| `responsive-layout.md` | L1 | foundation | seeded — breakpoint strategy, reflow, wrap rules; container queries stubbed |
| `accessibility.md` | L1 | foundation | seeded — WCAG 2.2 AA numeric floor + practice notes; ARIA patterns are the big L2 gap |
| `forms-filters-density.md` | L1→L2 | foundation | seeded — NN/g form canon + density-vs-floor interactions; the slider/chip APG patterns are the L2 gap |
| `navigation-ia.md` | L1 | foundation | seeded — hidden-nav cost data, subnav thresholds |
| `performance-perceived.md` | L1 | foundation | seeded — CWV budgets + no-build-step implications |
| `platform-conventions.md` | L1 | foundation | seeded — the three-convention decision rule |

## Corpus rule: target the weakest chapter

Restated from [`INDEX.md`](INDEX.md) rule 7: future rounds read every chapter's Maturity +
Gaps first and prioritize the weakest-graded chapter(s). The standing round-2 priority is
**`forms-filters-density.md` to professional** (it is OUR hardest live problem) via the
WAI-ARIA APG slider/listbox/disclosure patterns + Baymard filtering research.
