# Responsive Layout

**Maturity: professional** (L1 complete + L2 container-query/fluid-type/intrinsic-layout patterns, round 3, 2026-07-18)

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

- **RSP-8** — RSP-7 resolved: **container queries** are mature, browser-native, plain CSS —
  clears the no-build-step/no-CDN constraint outright. Mechanics: `container-type: inline-size`
  (query the width axis only) or `size` (both axes) declares a containment context;
  `container-name` (or the `container` shorthand) lets a query target a specific named ancestor
  instead of the nearest one; `@container (width > 700px) { … }` writes the actual rule.
  Container-relative units (`cqw`/`cqh`/`cqi`/`cqb`/`cqmin`/`cqmax`) size children proportional
  to the *container*, not the viewport. Fallback for pre-support browsers: plain flexbox/grid +
  an ordinary media query, same as always — container queries are additive, not a replacement
  requiring a rewrite. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries and
  https://web.dev/learn/css/container-queries 2026-07-18.*

- **RSP-9** — When and why to reach for a container query over a media query (web.dev, same
  fetch as RSP-8): a **component** that must look right regardless of where it's placed (a card
  reused in a sidebar vs. the main column) needs a container query, because a media query only
  ever reports the viewport — it can't tell a component which of several possible containers
  it's actually sitting in. A **page-level** layout (the overall column arrangement) is still a
  media-query's natural job. *Direct answer for any future componentized spec-card work; the
  current single-layout build panel doesn't need this today, but a card reused in both the
  catalog grid and a future "compare" view would.*

- **RSP-10** — Fluid typography via `clamp()`: the recommended form is
  `font-size: clamp(1em, 16px + 0.25vw, 1.25em)` — **bounds in `em`/`rem` (relative to the
  user's font-size preference), not raw `px`**, with a small `vw` nudge in the middle term.
  A pure `vw`-only font-size (no `clamp`, no relative unit) breaks page zoom and the user's
  browser font-size setting — WCAG **1.4.4 Resize Text (AA)** implication, since the user can no
  longer resize past what the viewport-relative value dictates. Keep the max bound under ~2.5×
  the min so 200% effective zoom stays reachable. *Tier A, fetched
  https://web.dev/learn/design/typography, https://web.dev/articles/baseline-in-action-fluid-type,
  and https://web.dev/articles/min-max-clamp 2026-07-18. The "smoothness" of fluid scaling is
  reported as invisible to real users (they resize in jumps, not fluidly) — the actual value of
  `clamp()` here is removing hand-picked per-breakpoint sizes, not the interpolation itself.*

- **RSP-11** — Content-driven flex-wrap ("sidebar") pattern for two-region layouts that should
  wrap without a breakpoint: a flex container with `flex-wrap: wrap`; the primary region gets
  `flex-grow: 1`; the secondary region gets `flex-basis: 0`, a large `flex-grow` (so it fills
  remaining space when there's room), and a `min-inline-size` (e.g. `50%`) that forces a wrap
  onto its own line once the container can't satisfy that minimum. This directly matches
  RSP-6's inference about the catalog+build-panel two-pane layout — it's now a **named,
  citable pattern** (the Every Layout "sidebar" composition) rather than pure inference. *Tier
  C (robmc.dev, carrying Andy Bell/Every Layout's technique with working CSS), fetched
  https://robmc.dev/blog/look-mum-no-breakpoints/ 2026-07-18. The underlying flexbox mechanics
  are standard CSS, so the pattern itself is safe to use even though the source tier is C —
  Tier C is illustrating a technique built from Tier-A primitives, not asserting a novel claim.*

- **RSP-12** — Content-driven grid pattern for repeating cards/tiles (the catalog listing):
  `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` produces as many equal-width
  columns as fit at ≥200px each, with **no media query at all** — `auto-fit` collapses empty
  tracks (columns shrink to fill the row), `auto-fill` instead preserves them as empty tracks.
  For full-page multi-region layouts (header/nav/sidebar/content/footer), MDN's own worked
  example uses **named `grid-template-areas` reassigned at 1–2 width breakpoints**, keeping
  elements in source order at each breakpoint (accessibility: tab order stays predictable) and
  warns that `grid-auto-flow: dense` (backfilling gaps) can visually reorder content ahead of
  DOM/tab order — flag before using it. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts
  2026-07-18. Directly actionable for the catalog grid and any future compare-view grid.*

- **RSP-13** — `position: sticky` mechanics (the build panel's likely implementation target):
  requires **at least one explicit inset** (`top`/`right`/`bottom`/`left`) — with all insets
  `auto` it silently behaves as `position: relative`, a common silent-failure mode. It sticks
  within its **containing block** (scrolls away once that block's bottom edge passes) and
  relative to its **nearest scrolling ancestor** — an ancestor with `overflow: hidden/auto/
  scroll` (not just the viewport) becomes that scrolling context, another common cause of
  "sticky isn't sticking." Always creates a new stacking context (z-index implications). *Tier
  A, fetched https://developer.mozilla.org/en-US/docs/Web/CSS/position 2026-07-18.*

- **RSP-14** — CSS print mechanics: a dedicated stylesheet via `<link media="print">` or an
  inline `@media print { }` block; `@page` controls printed-page size/orientation/margins
  (including per-page-position margin boxes like `@top-left`); `beforeprint`/`afterprint` JS
  events let the page adjust UI (e.g. hide interactive chrome) around the print action. *Tier A,
  fetched https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing and
  https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Paged_media 2026-07-18. Not yet
  actionable — the site has no print stylesheet — but a real gap if a "print my build" feature
  is ever requested (a plausible ask for a parts-list product).*

- **RSP-15** — Reader-mode (Safari Reader / Firefox Reader View / the Readability-family
  algorithms they're all forked from) detects "the article" by scoring DOM nodes on paragraph
  length, comma count, and **low link density** (link-heavy blocks are demoted), generally
  requiring the main content to sit inside a semantic wrapper (not raw `<body>`) with several
  substantial (~100+ character) paragraphs; a `<div>` used as a lone paragraph wrapper gets
  auto-promoted, but pages with heavy inline navigation/links inside the content block often
  fail to trigger reader mode at all. *Tier C/D (a practitioner's applied investigation
  synthesizing the open-source Readability algorithm; not a standards body or vendor doc, so
  this only illustrates/softens — never a hard recommendation). Fetched
  https://www.ctrl.blog/entry/browser-reading-mode-content.html and a 2010 investigation
  (mathiasbynens.be/notes/safari-reader) 2026-07-18. Relevant to `src/guides.js` prose pages,
  not the data-grid UI.*

## Gaps (next-round targets)

- Breakpoint-count practice (how many breakpoints real systems carry in production) — L3,
  still unfetched.
- RSP-11's Every-Layout "sidebar" pattern is cited via a Tier-C carrier; the primary
  (every-layout.dev) itself is worth a direct fetch attempt next round.
- No fetched source yet on `grid-template-columns: subgrid` or the newer CSS `masonry` layout
  proposal — L3/emerging, low priority while browser support is incomplete.
- RSP-14/15 (print, reader-mode) are seeded but currently dormant — no shipped feature uses
  either; re-visit if Douglas ever asks for a "print/share my build" or article-reader feature.
