# Accessibility — WCAG 2.2 AA as the floor

**Maturity: master** (L1+L2 complete + L4 measurement depth — screen-reader testing doctrine
(ACC-21), a completed live-DOM audit method applied to all nine shipped dialogs (ACC-22) and to
WCAG 2.2's new criteria (ACC-23); round 4, 2026-07-18)

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

- **ACC-16 — WCAG 2.2 SC 3.2.6 Consistent Help, Level A** (new in 2.2). If a page carries any
  of four help mechanisms — human contact details, a human contact mechanism (chat/contact
  form), a self-help option (FAQ/support page), or a fully automated contact mechanism
  (chatbot) — and that mechanism is **repeated across a set of pages**, it must occur **in the
  same order relative to other page content** unless the user initiates a change. The
  requirement is about *serialized* order (reading order), not pixel position, so a responsive
  reflow that moves it visually is fine as long as its relative order holds. Note the shape of
  the obligation: it does **not** require help on every page — only consistency where repeated.
  *Tier A, fetched https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html
  2026-07-18.*

- **ACC-17 — WCAG 2.2 SC 3.3.7 Redundant Entry, Level A** (new in 2.2). Information the user
  already entered (or that was provided to them) and that must be entered **again in the same
  process** is either auto-populated or offered for selection. Three exceptions: re-entry is
  essential, re-entry is required for security, or the earlier information is no longer valid.
  *Tier A, fetched https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html
  2026-07-18.*

- **ACC-18 — WCAG 2.2 SC 3.3.8 Accessible Authentication (Minimum), Level AA** (new in 2.2). No
  step of an authentication process may require a **cognitive function test** (remembering a
  password, solving a puzzle) unless that step offers at least one of: **Alternative** (another
  auth pathway without the test), **Mechanism** (help completing it — password-manager support
  and copy-paste both count), **Object Recognition**, or **Personal Content**. *Tier A, fetched
  https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
  2026-07-18.*

- **ACC-19 — Accessible-name doctrine, web-side pin** (closes ACC-8's standing gap, which cited
  Android docs for a platform-generic principle). All focusable interactive elements need
  accessible names; so do dialogs and structural containers (tables, regions). **Prefer visible
  text as the name** — APG's stated reasons are maintenance, bug-prevention and translation
  cost. The name-calculation precedence is `aria-labelledby` → `aria-label` → native HTML
  (`<label>`, `<caption>`, `<legend>`) → child content → `title`/`placeholder` (lowest quality,
  effectively a fallback not a technique). **`aria-label` is discouraged on elements that name
  from child content** — it *hides* the descendant content from assistive tech — and must not be
  used on paragraphs or list items. Native labelling is preferred where it exists. *Tier A,
  fetched https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/ 2026-07-18.
  **ACC-8 SUPERSEDED IN PART BY ACC-19** for the web-side statement; ACC-8's purpose-not-
  appearance principle stands.*

- **ACC-20 — `aria-live` region doctrine.** `polite` announces at the next graceful pause (end
  of sentence, break in typing) — the correct default for status and result-count updates.
  `assertive` interrupts and may clear the speech queue; MDN's own caution is that an
  interruption "may disorient users," so it is for imperative updates only. `off` (the default)
  announces only if the user is already inside the region. **The live region must exist in the
  DOM before the update happens** — screen readers buffer the tree at load, so a region injected
  together with its first message is commonly missed. `aria-atomic` controls whether the whole
  region or only the changed part is re-read; `aria-relevant` filters which mutation types
  announce; `aria-busy` suppresses announcements mid-batch. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live
  2026-07-18.*

- **ACC-21 — Screen-reader testing doctrine (L4 method).** Developers should learn basic screen
  reader operation — WebAIM's position is that without understanding the interaction model "you
  won't understand what the accessibility challenges are" — but untrained testing is
  *counterproductive* and routinely produces false "this is inaccessible" conclusions. **Neither
  a sighted developer nor a single blind tester is sufficient**: sighted developers miss
  barriers they can see past, and blind testers may not be able to tell *why* broken JavaScript
  is failing them. WebAIM's prescription is a variety of testers with a variety of abilities.
  For tool choice: JAWS/NVDA/VoiceOver are roughly equivalent for web content, so test **at
  least one**, and more for complex JS or PDF content. Test for the common barriers — heading
  structure, image alt text, non-descriptive link names, reading order, table markup. **The
  standing caution: design to principles and guidelines, not to one screen reader's quirks.**
  *Tier A-adjacent (WebAIM), fetched https://webaim.org/articles/screenreader_testing/
  2026-07-18. Site consequence: this corpus and its agent may audit MARKUP against the APG/WCAG
  contract (as ACC-22 does) but may NOT claim a shipped pattern "works with screen readers" —
  that claim needs a real tester, which this project has never run. Recording that honestly is
  the point; see the "Both errors cost" rule in INDEX.md.*

---

## Live-DOM dialog audit (round 4 / master, 2026-07-18) — closes ACC-15's standing gap

**ACC-22** — ACC-15 flagged its own dialog-trap claim as un-audited against the live DOM. This
round audited **all nine** shipped dialogs in `index.html` against the APG modal-dialog contract.
*Method: static audit of the shipped markup and handlers — not a screen-reader session (see
ACC-21's boundary).*

The nine: `reportModal`, `buildModal`, `partModal`, `compareModal`, `specCardModal`, `authModal`,
`garageModal`, `forumNewThreadModal`, `profileModal`.

**PASSES (the load-bearing result — the ACC-15 contract is met by construction):**

1. **All nine are native `<dialog>` opened with `.showModal()`** — never `.show()` (zero
   occurrences of `.show()` in the file). Native modal `showModal()` supplies the APG contract
   at the platform level: the focus trap, `Escape`-to-close, the inert backdrop, and focus
   **return to the invoking element** on close. This is the single best reason the audit came
   back clean — the contract isn't hand-rolled, so it can't drift. *ACC-15's trap/Escape/
   focus-return claims: **verified met**.*
2. **All nine carry `aria-labelledby`, and all nine targets resolve** to exactly one real
   `<h2>` in the dialog (`rmTitle`, `bmTitle`, `pmTitle`, `cmpTitle`, `scTitle`, `authTitle`,
   `garageTitle`, `fntTitle`, `profileTitle` — each `id` appears exactly once). Satisfies
   ACC-15's naming requirement and ACC-19's visible-text-as-name preference.
3. **No dialog auto-opens.** Every `showModal()` call sits inside a click handler or a
   user-invoked `open*()` function. **Hard Rule 2 (no unsolicited pop-ups) holds in the
   dialog layer** — worth stating as a verified fact, not an assumption.
4. **The backdrop-click-to-close idiom is implemented safely.** All nine use
   `if (e.target === this) this.close()`. That idiom has a well-known misfire — a click on the
   dialog's own *padding* has the dialog as its target and dismisses it — but the shipped rule
   at `index.html:461` sets **`padding:0`** on all nine dialog ids, so the failure mode cannot
   occur here. *Recording the precondition matters more than the pass: if anyone ever gives a
   dialog padding, nine dismiss-on-misclick bugs appear at once.*
5. **Verdict/status live regions already exist and are correctly polite.** ACC's round-2 Gaps
   speculated the verdict list "likely wants `aria-live` (unpinned)" — it already has it:
   `#report` is `role="status" aria-live="polite"` (`index.html:1113`), which is exactly the
   ACC-20 default for non-urgent status. Twelve live regions ship in `index.html` and two in
   `bmx.html`; none use `assertive`, matching ACC-20's caution. `#catCount`'s polite region on a
   filter result count is the canonical correct use (polite waits for the typing pause), and
   `#report` correctly omits `aria-atomic`, so a long verdict list re-reads only what changed.
   **Gap resolved as already-correct — no action needed.**

**FINDING 1 — `profileModal` is the only dialog without `autofocus`.** Eight of nine place
initial focus deliberately via an `autofocus` attribute; `profileModal` (`index.html:1471`) has
none, so focus falls to the HTML spec's default (first focusable descendant, else the dialog
box). Not a WCAG failure — focus does enter the dialog either way, so SC 2.4.3/2.4.7 hold — but
it is an **inconsistency against the site's own eight-of-nine convention**, and APG's guidance is
that initial focus should be *chosen*, not defaulted. Tier B/practice grade. **Coordinator
action: add `autofocus` to `profileModal`'s intended first control** to match the other eight.

**FINDING 2 ⚠ CONTRADICTION — `100vh` in the dialog height cap collides with the corpus's own
PLT-6.** `index.html:461` caps all nine dialogs at `max-height:calc(100vh - 32px)`, and
`index.html:738` caps the sticky filter rail at `max-height:calc(100vh - 86px)`. PLT-6 (round 3)
established that `vh` resolves against the **largest** viewport — the chrome-*retracted* size —
so on a mobile browser with the address bar expanded, a full-height element measured in `100vh`
extends **below the visible area**. For a dialog this is materially worse than for ordinary
content: the dialog's action row (`.rm-foot`, holding Close and the primary button) sits at the
*bottom*, which is exactly the part pushed under the browser chrome. It also brushes **SC 2.4.11
Focus Not Obscured (Minimum), AA** (ACC-6) when the focused control is the obscured Close button
— though 2.4.11 exempts obstruction by the *user agent's own* UI, so this is flagged as a
usability + own-doctrine contradiction, **not** asserted as a WCAG violation (the ACC-21/INDEX
"both errors cost" bar). **Coordinator action: `100svh` is the corpus's own PLT-6 recommendation
for "never let content hide behind browser chrome"** — a two-token CSS change at two sites, no
build step, no new dependency.

**NOTE (no action)** — all nine carry `role="dialog" aria-modal="true"` explicitly on a native
`<dialog>`. Both are redundant with the element's implicit semantics under `showModal()`. They
are harmless and arguably defensive against older AT; recording it only so a future round
doesn't "discover" it as a finding.

---

## WCAG 2.2 new-criteria audit (round 4 / master, 2026-07-18)

**ACC-23** — ACC-16/17/18 applied to the shipped site. *Same static-audit method and boundary as
ACC-22.*

- **SC 3.2.6 Consistent Help (A) — PASS.** The site's page set is `index.html`, `bmx.html`,
  `privacy.html`, `terms.html`, `affiliate-disclosure.html`. The only help mechanism present is
  **human contact details** (`Doug@buildmymtb.com`), and it appears on the three legal pages
  only. Those three carry a **byte-identical footer** (Privacy · Terms · Affiliate Disclosure ·
  Back to the app, then the copyright + non-affiliation line), so the repeated mechanism holds
  the same relative order — 3.2.6 satisfied. The two builder pages repeat *no* help mechanism,
  which 3.2.6 does not require them to (see ACC-16's note on the obligation's shape).
  **Standing constraint for future work:** if a contact/support/FAQ link is ever added to
  `index.html` or `bmx.html`, it must land in the **same relative footer position** as on the
  legal pages, or this Level-A criterion breaks across the set. Worth flagging now because the
  parked home-page work and the growing page family (Kit/Road/Gravel/EMTB) are exactly when a
  "Contact" link gets sprinkled inconsistently.
- **SC 3.3.8 Accessible Authentication (Minimum) (AA) — PASS, doubly.** The auth flow does
  present a cognitive function test (`authPassword`, a remembered password), but **two** of the
  four exceptions apply independently: **Alternative** — `authGithub` (GitHub OAuth) and
  `authMagicLink` ("Email me a magic link instead", `signInWithOtp`) are both full auth pathways
  with no memory test; and **Mechanism** — the password field carries
  `autocomplete="current-password"` and the email field `autocomplete="email"`, which is
  precisely the password-manager support the SC names. Nothing blocks paste. *This is a real
  pass, not a technicality: the magic-link route means a user who cannot complete a password
  challenge at all still has a working front door.*
- **SC 3.3.7 Redundant Entry (A) — PASS (narrow surface).** The site has no multi-step process
  that re-asks for previously entered data: sign-in is single-step, the magic-link route reuses
  the email already typed into `authEmail` rather than re-prompting, and the forum
  new-thread/profile dialogs are each single-form. Recorded as a pass **with a small surface** —
  the criterion becomes live the moment a genuine multi-step flow appears (a checkout, a
  multi-page build wizard, or a marketplace listing flow), so re-audit then.

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

**Closed in round 4 (2026-07-18)** — kept as a record, do not re-open:
- ~~ACC-15's dialog-trap claim un-audited against the live DOM~~ → **CLOSED by ACC-22**: all
  nine dialogs audited; contract met by construction (native `<dialog>` + `showModal()`).
- ~~WCAG 2.2's new 3.2.6/3.3.7/3.3.8 not yet seeded~~ → **CLOSED by ACC-16/17/18** (seeded) and
  **ACC-23** (applied to the site; all three pass).
- ~~ACC-8's web-side accessible-name statement needs its own pin~~ → **CLOSED by ACC-19**.
- ~~live regions for verdict updates (unpinned)~~ → **CLOSED by ACC-20** (doctrine) + **ACC-22
  pass 5** (already correctly implemented — the speculation was wrong in the site's favor).

**Still open:**
- **Screen-reader *flows*** — the *doctrine* is now pinned (ACC-21) and live regions are
  verified (ACC-22), but heading-structure and landmark auditing of the shipped pages has not
  been done. That is a concrete, static-auditable next target (`h1`→`h6` order, `<main>`/`<nav>`/
  `<footer>` landmarks, skip-link presence) and does **not** need a real screen reader.
- **A real screen-reader session has never been run on this site.** ACC-21 is explicit that
  markup auditing cannot substitute. This is a recommend-to-Douglas item (it needs a human),
  not a gap a future corpus round can close by fetching.
- The dot-contrast finding (round 2) still needs a coordinator decision + a follow-up fact once
  fixed (append a new fact, don't edit ACC-4's audit).
- **FINDING 1 (profileModal `autofocus`) and FINDING 2 (`100vh` → `100svh`) from ACC-22 are
  open coordinator actions**, not corpus gaps — they close when the app changes, and each
  should get a new confirming fact then.
