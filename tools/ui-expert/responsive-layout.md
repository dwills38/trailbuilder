# Responsive Layout

**Maturity: foundation** (L1 seed, 2026-07-18)

Breakpoint strategy, container vs media queries, wrap behavior, the never-horizontal-scroll
rule. Read [`INDEX.md`](INDEX.md) first.

## Facts

- **RSP-1** — Breakpoints are **content-driven, never device-driven**: "let the content
  determine how its layout changes to fit the container" — don't define breakpoints by device
  class, brand, or OS. Process: design for the small screen first, then widen until a
  breakpoint becomes necessary. *Tier A, fetched
  https://web.dev/articles/responsive-web-design-basics 2026-07-18.*

- **RSP-2** — Fixed pixel widths force horizontal scrolling on small screens; use flexible
  units and flexbox/grid/multicol that adapt to the viewport. *Tier A, same fetch as RSP-1.*

- **RSP-3** — WCAG 2.2 **SC 1.4.10 Reflow, Level AA**: content must present without
  two-dimensional scrolling at **320 CSS px width** (vertical-scroll content) / 256 CSS px
  height (horizontal-scroll content), excepting content that requires 2-D layout (large data
  tables, maps). *Tier A, fetched https://www.w3.org/TR/WCAG22/ 2026-07-18. This is the
  never-horizontal-scroll rule's testable form: **the page body must pass at 320 px**; a wide
  spec table may scroll inside its own container under the exception.*

- **RSP-4** — Readability: an ideal text column holds **70–80 characters per line** (~8–10
  English words); cap text measure rather than letting prose span a wide viewport. *Tier A
  (web.dev citing classic readability theory), same fetch as RSP-1. Applies to the guides
  (`src/guides.js`) and legal pages more than to the data grid.*

- **RSP-5** — WCAG 2.2 **SC 1.4.12 Text Spacing, AA**: layout must survive user overrides of
  line-height to 1.5× font size, paragraph spacing 2×, letter spacing 0.12×, word spacing
  0.16× — i.e. containers must not clip or overlap when text gets roomier. Fixed-height
  chips/buttons with tight overflow are the canonical failure. *Tier A, fetched
  https://www.w3.org/TR/WCAG22/ 2026-07-18.*

- **RSP-6** — Site synthesis (labelled inference): the builder's two-pane desktop layout
  (catalog + build panel) must collapse to a single column by content pressure, not at an
  "iPhone width"; the test matrix is 320 px (RSP-3 floor), 375 px (the density benchmark the
  curriculum names), and the point where the two panes' *content* starts to fight — wherever
  that falls. *Inference from RSP-1 + RSP-3.*

- **RSP-7** — Container queries vs media queries: **not established from a fetched source this
  round.** The seed round fetched no container-query primary (MDN/web.dev pages exist and
  fetch cleanly — queued). Do not recommend container queries from memory; note that any
  recommendation must also clear the no-build-step constraint (they are plain CSS, so likely
  fine — but pin browser-support facts first). *Honest gap, per INDEX rule 6.*

## Gaps (next-round targets)

- RSP-7: fetch MDN container-queries + browser-support data — the un-seeded half of this
  chapter's charter.
- No sourced wrap-behavior facts yet (flex-wrap patterns for chip rows) — L2, feeds
  `forms-filters-density.md`.
- No sourced sticky-positioning guidance (the build panel and section headers) — L2.
- Breakpoint-count practice (how many breakpoints real systems carry) — L3.
