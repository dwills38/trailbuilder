# Responsive Layout

**Maturity: master** (L1+L2 complete + L3 craft depth — the Every Layout primary pinned,
breakpoint-count practice sourced, and the site's own three thresholds audited against both,
yielding the intrinsic-layout-beats-breakpoints doctrine (RSP-19); round 4, 2026-07-18)

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

---

## Breakpoint practice & the Every Layout primary (round 4 / master, 2026-07-18)

- **RSP-16 — The Every Layout "Sidebar" pattern, pinned from the primary** (closes RSP-11's
  Tier-C-carrier gap; every-layout.dev **fetches cleanly**, contrary to the round-3 assumption
  that it might be walled). The pattern makes a two-element layout wrap **without any media
  query**, responding to its *container* rather than the viewport:
  ```css
  .with-sidebar { display: flex; flex-wrap: wrap; gap: 1rem; }
  .sidebar      { flex-basis: 20rem; flex-grow: 1; }
  .not-sidebar  { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }
  ```
  **Mechanism:** the enormous `flex-grow: 999` on the main element makes it consume all free
  space, squashing the sidebar down to its `flex-basis` ideal width. `min-inline-size: 50%` is
  the wrap trigger — once the main element would be forced below half the container, flex-wrap
  drops the sidebar onto its own line. Every Layout's justification for choosing 50% is that a
  sidebar stops being a sidebar once it is no longer the narrower of the two elements.
  *Tier B (primary, the pattern's authors), fetched https://every-layout.dev/layouts/sidebar/
  2026-07-18.*

- **RSP-17 — Breakpoint count: NN/g's actual practice numbers** (closes the chapter's L3
  breakpoint-count gap). NN/g reports that designers "usually accommodate only 2–3 breakpoints"
  in practice, constrained by design resources, while noting that more breakpoints allow finer
  adaptation. The suggested starting frame is four T-shirt tiers — **extra-small ≤500 px
  (mobile), small 500–1200 px (tablet), medium 1200–1400 px (laptop), large ≥1400 px
  (monitor)** — but the selection method is explicitly **audience-driven**: analyse the device
  range your own visitors actually use and set the values to fit them, rather than adopting the
  tiers verbatim. *Tier B, fetched
  https://www.nngroup.com/articles/breakpoints-in-responsive-design/ 2026-07-18. Note this
  complements rather than contradicts the chapter's existing content-driven-breakpoint doctrine:
  NN/g gives the resourcing reality and a starting frame; the content-driven rule decides where
  each line actually falls.*

### Live-DOM breakpoint audit

- **RSP-18 — ✅ The site carries three breakpoint thresholds, and the count is right.**
  `index.html` uses `max-width:480px`, `max-width:768px`, `max-width:880px` and the
  complementary `min-width:769px` — i.e. **three distinct thresholds**, landing squarely in
  RSP-17's "2–3 in practice." Each is content-derived rather than device-derived, which is what
  the chapter's existing doctrine asks for:
  - **880 px** is where `.layout` (`grid-template-columns: 210px minmax(0,1fr) 330px` — rail,
    catalog, build panel) stops fitting three columns and becomes `display:block`; the rail also
    flips to a horizontally-scrolling chip strip there. That is precisely RSP-16's reasoning
    generalised to three columns: the layout changes when the sidebars can no longer be the
    narrow elements.
  - **768 px** scopes the mobile touch-target enlargements (the 38 px slider thumbs of DNS-21's
    row), deliberately leaving desktop density untouched.
  - **480 px** adds a further squeeze for the smallest phones.
  **No breakpoint above 880 px, and none is needed** — see RSP-19. *Site audit.*

- **RSP-19 — ✅ Intrinsic layout is why this site needs no upper breakpoints — record as
  doctrine.** RSP-17's frame suggests tiers at 1200 px and 1400 px, and the site has neither.
  That is not an omission: the wide-viewport behaviour is handled *intrinsically* instead.
  `.grid` is `repeat(auto-fill, minmax(236px, 1fr))`, so the card grid adds columns on its own
  as space allows, and `.layout`'s middle track is `minmax(0, 1fr)`, so the catalog column
  absorbs all extra width while the two fixed rails stay put. **The general rule this yields:
  every layout axis handled intrinsically (`auto-fill`/`minmax`/flex-basis, or RSP-16's
  pattern) is a breakpoint you never have to write, test, or maintain in four themes.** The
  three breakpoints that remain exist because they change layout *structure* (three columns to
  one, touch sizing on), which intrinsic sizing genuinely cannot express. *Corpus synthesis of
  RSP-16/17/18 against the shipped CSS; flagged as the corpus's own framing.*

- **RSP-20 — Do NOT retrofit RSP-16's Sidebar pattern onto `.layout` — an honest
  non-recommendation.** The pattern is defined for **two** elements (sidebar + main), and its
  wrap trigger (`min-inline-size: 50%`) encodes a two-element assumption. The site's main layout
  has **three** tracks with *two* fixed rails flanking a fluid centre, and the desired collapse
  is all-three-to-stacked at one threshold — not an independent per-sidebar wrap, which is what
  a flex-wrap version would produce (the build panel could wrap while the filter rail did not,
  giving a two-column intermediate state nobody designed). The existing CSS Grid + single 880 px
  breakpoint expresses the intended behaviour more directly and more predictably.
  **Where RSP-16 *is* the right tool here: any future two-element component** (an article body
  with a table-of-contents rail, a form with a help panel) — reach for it there instead of
  adding a fourth breakpoint. *Corpus judgment; recorded because "we now have the primary" is
  not the same as "we should use it," and a future round should not read RSP-16 as a mandate.*

## Gaps (next-round targets)

- ~~Breakpoint-count practice~~ → **CLOSED round 4 by RSP-17** (NN/g: 2–3 in practice, four
  T-shirt tiers as a starting frame, audience-driven selection) and applied in RSP-18/19.
- ~~RSP-11's Every-Layout "sidebar" pattern is cited via a Tier-C carrier~~ → **CLOSED round 4
  by RSP-16**: every-layout.dev fetches cleanly and the primary is now pinned with the actual
  CSS. See **RSP-20** for why the pattern is nonetheless *not* recommended for `.layout`.
- No fetched source yet on `grid-template-columns: subgrid` or the newer CSS `masonry` layout
  proposal — L3/emerging, low priority while browser support is incomplete.
- RSP-14/15 (print, reader-mode) are seeded but currently dormant — no shipped feature uses
  either; re-visit if Douglas ever asks for a "print/share my build" or article-reader feature.
