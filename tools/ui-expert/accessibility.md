# Accessibility — WCAG 2.2 AA as the floor

**Maturity: professional** (L1 complete + L2 ARIA pattern depth, round 2, 2026-07-18)

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

- **ACC-9** — ARIA patterns for composite widgets: **RESOLVED round 2** — see ACC-10 through
  ACC-14 below (slider, disclosure, listbox, combobox, tabs, dialog fetched from the WAI-ARIA
  APG). *Superseded-in-place note, not a new fact ID — ACC-9 stays as the historical record of
  the gap; the content now lives in ACC-10–14 per the append-only rule.*

- **ACC-10 — Slider pattern** (site use: fork-travel / price / rotor-size range filters).
  `role="slider"` + required `aria-valuenow`/`aria-valuemin`/`aria-valuemax` (add
  `aria-valuetext` when the raw number isn't self-explanatory); `aria-label` or
  `aria-labelledby`; `aria-orientation` defaults horizontal. **Keyboard (required, not
  optional):** Right/Up = +1 step, Left/Down = −1 step, Home = min, End = max; Page Up/Down for
  a larger step are optional. Focus sits on the thumb itself. *Tier A, fetched
  https://www.w3.org/WAI/ARIA/apg/patterns/slider/ 2026-07-18. Direct resolution of DNS-5's
  citation gap — this is the canonical wiring a dual-handle range filter must implement, and it
  confirms DNS-5's inference: a slider with no keyboard support is a hard APG/AA miss, not a
  style choice.*

- **ACC-11 — Disclosure pattern** (site use: collapsed facet groups per DNS-8's >15-value
  threshold, mobile filter-rail sections). Control is `role="button"` (a real `<button>`
  satisfies this natively) with `aria-expanded` toggling `true`/`false`; `aria-controls`
  pointing at the content id is optional-but-recommended. **Keyboard:** Enter and Space both
  toggle. Two-element structure only: the button, and the content it reveals — no extra ARIA
  needed on the content itself. *Tier A, fetched
  https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ 2026-07-18.*

- **ACC-12 — Listbox pattern** (site use: any single-pick facet list, e.g. wheel-size or
  drivetrain-system filter chips if restructured as a listbox rather than a chip row).
  `role="listbox"` container, `role="option"` children (optionally grouped under
  `role="group"`). Single-select: `aria-selected` per option; DOM focus and `aria-selected`
  are distinct — moving focus does not imply selection unless "select follows focus" is
  explicitly chosen. **Keyboard:** Arrow keys move focus; Home/End recommended once ≥5 options
  (ties directly to DNS-8's 6-value density threshold); single-character typeahead. Multi-select
  needs `aria-multiselectable="true"` and prefers the no-modifier model: Space toggles the
  focused option, Shift+Arrow navigates-and-toggles, Ctrl+A toggles all. *Tier A, fetched
  https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ 2026-07-18.*

- **ACC-13 — Combobox pattern** (site use: a searchable brand/model picker, if the catalog
  ever outgrows a flat chip row). `role="combobox"` on the text input, `aria-expanded`,
  `aria-controls` → popup id, `aria-activedescendant` → the focused popup item,
  `aria-autocomplete="list"`/`"none"` depending on whether typing filters the list. **Keyboard:**
  Down Arrow (or Alt+Down) opens the popup; Up/Down move within it; Enter accepts and closes;
  Escape closes and returns focus to the input without committing. *Tier A, fetched
  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ 2026-07-18. Site note: combobox is
  heavier than this catalog currently needs (its 25 chip-row filters read closer to
  listbox/disclosure territory) — record this pattern for if/when a facet grows past
  chip-row scale, don't retrofit it pre-emptively.*

- **ACC-14 — Tabs pattern** (site use: any future segmented view, e.g. MTB/BMX/Kit as
  in-page tabs rather than separate pages — currently they are separate pages/URLs, so this is
  dormant). `role="tablist"` / `role="tab"` / `role="tabpanel"`; the active tab carries
  `aria-selected="true"`, inactive tabs `"false"`; each tab's `aria-controls` names its panel.
  **Roving tabindex:** only the active tab is Tab-reachable; arrow keys move among tabs
  (wrapping first↔last), Home/End optional. Activation is either automatic (focus = select, only
  when the panel swap is fast enough not to lag) or manual (Space/Enter commits). *Tier A,
  fetched https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ 2026-07-18.*

- **ACC-15 — Modal dialog pattern** (site use: click-opened cards/modals are the site's
  explicitly-approved pop-up exception per Hard Rule 2/DNS-9 — this is the wiring they must
  use to stay compliant, not just non-intrusive). `role="dialog"` + `aria-modal="true"` +
  `aria-labelledby` (or `aria-label`) naming the dialog. **Focus:** moves into the dialog on
  open (first focusable element, or a `tabindex="-1"` static heading for large/complex content);
  Tab/Shift+Tab must not escape the dialog (full trap, wrapping at both ends); focus returns to
  the invoking element on close. **Keyboard:** Escape closes. A visible, in-sequence close
  button is strongly recommended. *Tier A, fetched
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ 2026-07-18. Note: this is a testable
  floor for the report-a-bug dialog, part spec-card overlay, and login dialog already shipped —
  worth a follow-up audit pass (not done this round) confirming each one traps focus and
  restores it on close; not verified against the live DOM this round, so not tagged
  ⚠ CONTRADICTION without that check.*

## ⚠ CONTRADICTION — compat-dot contrast audit (round 2, 2026-07-18)

Computed WCAG contrast ratios (relative-luminance formula, SC 1.4.11's 3:1 non-text floor) for
the `.dot.g`/`.w`/`.r`/`.n` compat-status dots (hardcoded `#2aa35a`/`#e0a52e`/`#d23b3b`/`#d2d7d1`,
same hex across all four themes per `index.html`'s CSS — these are the dots ACC-4's note
flagged as unaudited) against each theme's `--card`:

| Theme | dot.g (green) | dot.w (yellow/warn) | dot.r (red) | dot.n (grey) |
|---|---|---|---|---|
| light (default) | 3.24 ✅ (barely) | **2.19 ❌** | 4.74 ✅ | **1.46 ❌** |
| dark | 4.82 ✅ | 7.13 ✅ | 3.29 ✅ | 10.68 ✅ |
| loam | 5.26 ✅ | 7.78 ✅ | 3.59 ✅ | 11.67 ✅ |
| rad | 5.50 ✅ | 8.14 ✅ | 3.76 ✅ | 12.20 ✅ |

**⚠ CONTRADICTION vs ACC-4**, light theme only (the default/first-paint theme): `.dot.w`
(the yellow "fits but adds a warning" dot — the state carrying the most decision-relevant
information, since green/red are the poles) sits at **2.19:1 against `--card` (#fff)**, and
`.dot.n` (grey/unselected) at **1.46:1** — both fail SC 1.4.11's 3:1 floor for a meaningful
graphic. `.dot.g` clears at 3.24:1 but with almost no margin (would fail if `--card` shifted a
few points lighter). Root cause: the dot hexes were tuned once and never re-checked per-theme;
dark/loam/rad all clear comfortably (7–12:1) because their darker `--card` values happen to
separate further from the same mid-tone dot colors — light's near-white card is the one
surface these particular hexes don't have enough headroom against. This is exactly the gap
ACC-4's note already named (color-alone + now confirmed sub-floor contrast in the theme most
users see by default) — flagged for the coordinator to triage a light-theme-specific dot-color
or ring-treatment fix; this corpus does not edit `index.html`. *Method: fetched WCAG relative-luminance
formula (w3.org/TR/WCAG22, same fetch as ACC-1), hex values read directly from
`index.html` lines 259–263 (dots) and each theme's `:root`/`html.dark`/`html.loam`/`html.rad`
block, 2026-07-18. Full pairwise numbers (text-color-token vs its own bg, button-white vs
brand, etc.) were also swept — no other pair fell under its applicable floor; the `--line`
border color (~1.2–1.7:1 against `--bg` in every theme) looks alarming in isolation but WCAG
1.4.11 exempts purely decorative dividers, and `--line` is not used as a meaningful-graphic
boundary anywhere found this round, so it is NOT tagged a contradiction — flagged here only so
a future round doesn't re-discover it as a false positive.*

## Gaps (next-round targets)

- Screen-reader *flows* (heading structure, landmarks, live regions for verdict updates) —
  nothing seeded; the verdict list changing on part-pick likely wants `aria-live` (unpinned).
- The dot-contrast finding above needs a coordinator decision + a follow-up corpus entry once
  fixed (append a new fact, don't edit this one).
- ACC-15's dialog-trap claim is un-audited against the live DOM (report dialog, spec-card
  modal, login dialog) — a live-DOM focus-trap check is the natural next round-2/3 task.
- WCAG 2.2's new 3.2.6/3.3.7/3.3.8 (consistent help, redundant entry, accessible auth) not
  yet seeded.
- ACC-8's web-side accessible-name statement (WAI APG) still needs its own pin — ACC-8 currently
  cites Android docs for a platform-generic principle; APG's own wording wasn't fetched this
  round despite fetching five other APG pages.
