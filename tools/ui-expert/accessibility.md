# Accessibility — WCAG 2.2 AA as the floor

**Maturity: foundation** (L1 seed, 2026-07-18)

Contrast math, focus states, ARIA patterns, reduced motion, screen-reader flows. Read
[`INDEX.md`](INDEX.md) first. **AA is the floor this site aims at; only Tier-A criteria may be
called "violations."**

## Facts

- **ACC-1** — WCAG 2.2 **SC 1.4.3 Contrast (Minimum), AA**: text contrast **≥ 4.5:1**; large
  text **≥ 3:1**. **SC 1.4.6 (AAA)**: 7:1 / 4.5:1. *Tier A, fetched
  https://www.w3.org/TR/WCAG22/ 2026-07-18.*

- **ACC-2** — Large text = **18 pt+ (≈24 px), or 14 pt+ bold (≈18.67 px)** (WebAIM's
  statement of the WCAG definition). *Tier A-adjacent (WebAIM), fetched
  https://webaim.org/articles/contrast/ 2026-07-18.*

- **ACC-3** — **No rounding** in contrast math: 4.47:1 fails AA — "you cannot round a contrast
  ratio up to 4.5:1" (WebAIM's example: `#777` on white). *Same fetch as ACC-2.*

- **ACC-4** — WCAG 2.2 **SC 1.4.11 Non-text Contrast, AA**: UI components and meaningful
  graphics need **≥ 3:1** against adjacent colors. *Tier A, fetched
  https://www.w3.org/TR/WCAG22/ 2026-07-18. Direct constraint on the compatibility DOTS: the
  green/yellow/red/grey dot ring/fill must clear 3:1 against the card background in **all
  three themes** — and per WebAIM (same fetch as ACC-2) color alone must not carry meaning, so
  the dot's meaning needs a non-color channel too (hover reason exists; a shape/label channel
  is the gap).*

- **ACC-5** — Non-underlined links are a contrast trap: they need **3:1 against surrounding
  body text** AND 4.5:1 against the background, which WebAIM calls near-impossible to satisfy
  broadly — underline (or otherwise non-color-mark) links in body copy. *Tier B practice
  guidance, same fetch as ACC-2.*

- **ACC-6** — WCAG 2.2 **SC 2.4.7 Focus Visible, AA**: keyboard focus must be visible on all
  keyboard-operable UI. **SC 2.4.11 Focus Not Obscured (Minimum), AA**: the focused component
  must not be *entirely* hidden by author content (sticky headers/panels are the canonical
  offender). *Tier A, fetched https://www.w3.org/TR/WCAG22/ 2026-07-18. Site note: every
  custom control (chips, dots, part rows) must keep a visible `:focus-visible` style in all
  themes; the sticky build panel must not fully cover a focused element.*

- **ACC-7** — `prefers-reduced-motion: reduce` detects the OS-level "minimize non-essential
  motion" setting; such motion "can trigger discomfort" for people with vestibular disorders.
  Pattern: default animation, then a same-specificity later `@media (prefers-reduced-motion:
  reduce)` block that removes or replaces the motion. Baseline-supported since 2020. *Tier A,
  fetched https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
  2026-07-18. WCAG hook: SC 2.3.3 Animation from Interactions is **AAA** (nice, not floor) —
  but honoring the media query is the established practice bar.*

- **ACC-8** — Accessible names describe **purpose and outcome, not appearance**; no
  role-redundant text ("Submit", not "Submit button"); list items need unique names;
  decorative graphics are explicitly hidden from the tree. *Tier A (Google), fetched
  https://developer.android.com/guide/topics/ui/accessibility/apps 2026-07-18 — stated for
  Android but the naming principles are platform-generic; re-pin the web-side statement (WAI
  APG) next round.*

- **ACC-9** — ARIA patterns for composite widgets (sliders, listboxes, disclosure,
  tablist): **not established this round** — the WAI-ARIA Authoring Practices were not fetched.
  Do not specify `role`/`aria-*` wiring from memory; fetch
  https://www.w3.org/WAI/ARIA/apg/patterns/ first. *Honest gap — this is the chapter's
  single biggest hole, and it gates the L2 work in `forms-filters-density.md`.*

## Gaps (next-round targets)

- ACC-9: ingest WAI-ARIA APG (slider, disclosure, listbox, tabs, dialog) — top priority.
- Screen-reader *flows* (heading structure, landmarks, live regions for verdict updates) —
  nothing seeded; the verdict list changing on part-pick likely wants `aria-live` (unpinned).
- Theme audit method: a contrast sweep of the three themes' tokens against ACC-1/ACC-4 would
  make a good first `⚠ CONTRADICTION`-hunting round (produce findings for the coordinator,
  not edits).
- WCAG 2.2's new 3.2.6/3.3.7/3.3.8 (consistent help, redundant entry, accessible auth) not
  yet seeded.
