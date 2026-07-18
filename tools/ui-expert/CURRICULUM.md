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

## Current state (round 3, 2026-07-18)

| Chapter | Level | Maturity | Note |
|---|---|---|---|
| `mobile-fundamentals.md` | L1+L2 | **professional** | round 3 — WCAG 2.5.x family completed (2.5.2/2.5.3/2.5.4/2.5.6), Apple HIG gesture taxonomy, `touch-action`/`inputmode` web mechanisms, Hoober's primary study fetched directly |
| `responsive-layout.md` | L1+L2 | **professional** | round 3 — container queries resolved, fluid-type clamp() pattern, Every-Layout sidebar wrap + CSS Grid auto-fit/minmax, sticky mechanics, print + reader-mode seeded |
| `accessibility.md` | L1+L2 | **professional** | round 2 — WAI-ARIA APG ingested (slider/disclosure/listbox/combobox/tabs/dialog, ACC-10–15); resolved ACC-9; produced a theme-wide compat-dot contrast audit (⚠ CONTRADICTION: light-theme dot.w/dot.n fail SC 1.4.11) |
| `forms-filters-density.md` | L1+L2 | **professional** | round 2 — slider/disclosure/listbox patterns applied to the filter rail (DNS-10–12) + Baymard filter research (DNS-13/14) |
| `navigation-ia.md` | L1+L2 | **professional** | round 3 — card-sorting/tree-testing methods, breadcrumb canon + WCAG G65 markup, search-vs-browse synergy, History API + confirmed hashchange back-behavior |
| `performance-perceived.md` | L1+L2 | **professional** | round 3 — INP subpart mechanism (input/processing/presentation delay), NN/g's 0.1/1/10s canon, skeleton-vs-spinner research (mixed, informational-leaning), bfcache, font-display + script defer/async doctrine, CLS seeded |
| `platform-conventions.md` | L1+L2 | **professional** | round 3 — NN/g web-form canon, the 100vh trap resolved (svh/lvh/dvh), overscroll-behavior for modal/dialog scroll containment, PWA installability criteria |

## Corpus rule: target the weakest chapter

Restated from [`INDEX.md`](INDEX.md) rule 7: future rounds read every chapter's Maturity +
Gaps first and prioritize the weakest-graded chapter(s). Round 2 (2026-07-18) took
`accessibility.md` and `forms-filters-density.md` to professional via the WAI-ARIA APG
ingest (slider/disclosure/listbox/combobox/tabs/dialog) and Baymard/NN/g filter research, plus
a theme-contrast contradiction-hunt (see `accessibility.md`'s ⚠ CONTRADICTION section). Round 3
(2026-07-18) took the remaining five chapters — `mobile-fundamentals.md`, `responsive-layout.md`,
`navigation-ia.md`, `performance-perceived.md`, `platform-conventions.md` — from foundation to
professional in the corpus's own weakest-first order, each via a fetched-source L2 pass (see
each chapter's own facts and citations for detail).

**All seven chapters are now professional.** No chapter is "weakest" relative to the others
anymore — the corpus has climbed evenly, per rule 7's own intent. The next round's honest choice
is between two directions, not a chapter pick:

1. **Push toward master (L3/L4)** on whichever chapter's own Gaps list is richest in
   still-unfetched, genuinely load-bearing questions (several chapters flag specific unfetched
   primaries this round: RSP's Every-Layout primary, PLT-2's still-inference-grade decision
   rule, NAV's unrun card-sort/tree-test on the site's own nav, PRF's still-missing field CWV
   data).
2. **Chase ⚠ CONTRADICTION hunts** the way `accessibility.md`'s round-2 theme-contrast audit did
   — cross-checking a chapter's own facts against the shipped app for a concrete, coordinator-
   actionable finding, rather than adding more citations for their own sake.

Do not manufacture a "master" grade to look finished — CURRICULUM's own grading rule requires
L3 craft-depth or L4 measurement-method depth, not just more L1/L2 facts, and several chapters
(navigation-ia, performance-perceived especially) are honest about needing a real study or
real field data before they'd earn it.
