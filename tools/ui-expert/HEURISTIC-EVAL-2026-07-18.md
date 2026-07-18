# Heuristic Evaluation — BuildMyMTB (Round 5, 2026-07-18)

The corpus's first executed research method: **RES-4, Nielsen's 10 heuristics**, run across the
three shipped surfaces — the **builder** (`index.html` main view), the **forum** (`#forum`), and
the **guides** (`#guides` / `#guide/<slug>`). Method and its limits per
[`research-methods.md`](research-methods.md) RES-4: this is expert inspection, not user
evidence — it finds *candidate* problems; RES-8's user study is what would confirm how they
land with real riders.

**Evaluator:** the ui-expert agent, solo (RES-4's stated envelope: the one L4 method an agent
can execute unaided). **Evaluation base:** `origin/main` @ `2ff6e6c`, live-DOM session against
a local serve at 375×812 and 1280×800, plus code verification of every DOM-observed candidate.
**Severity scale:** Nielsen's 0–4 (0 = not a problem, 1 = cosmetic, 2 = minor, 3 = major,
4 = catastrophe), severity = frequency × impact × persistence.

**Boundary, per INDEX:** findings are FLAGGED for the coordinator, never fixed here. The
violation label is used only where a Tier-A criterion testably fails (INDEX's bar).

---

## Method notes (read before trusting any single finding)

- Every DOM-observed candidate was **verified against the repo source** before being recorded.
  One candidate **died in verification** and is preserved below (§ "False alarms") because the
  lesson generalizes: synthetic `element.click()` fires handlers on `hidden` elements, so a
  scripted probe can "find" a broken flow that no real user can reach. Visibility gating must be
  checked with `hidden`/`offsetParent`, not `querySelectorAll` presence.
- The forum was evaluated **signed out** (the majority visitor state). Signed-in flows (posting,
  moderation) were verified in code only — no writes were made against the production forum.
- Positives are recorded deliberately: a heuristic evaluation that lists only defects invites
  re-litigating settled ground next round.

---

## Findings by severity

### Severity 3 (major)

- **HE-1 — Reset destroys the entire build with no confirmation and no undo. (H3 User control
  & freedom; H5 Error prevention.)** Verified live: clicking `#reset` wipes every picked part
  instantly — `window.confirm` is never called, no toast offers undo, and `history.length` does
  not change on picks or reset (the build hash is written via `replaceState`, consistent with
  NAV-15's anti-flooding doctrine), so **browser Back cannot recover the build** and no other
  recovery path exists. A 20-part build is one mis-tap from gone; on mobile the button sits in
  the scrolling toolbar directly under the sticky header. The `.btn danger` styling signals
  risk but is not an emergency exit. *Checkable: `#reset` click handler in `index.html`; the
  `writeHash` path.* **Recommended shape (coordinator's call):** either a confirm step scaled to
  build size (skip when ≤1 part is picked), or a post-reset undo affordance in the existing
  `role="status"` toast. Note the toast route must stay a passive offer — an overlay demanding
  a decision would collide with hard rule 2.

- **HE-2 — Forum thread rows are keyboard-inaccessible: **violation**, WCAG SC 2.1.1 Keyboard
  (Level A, Tier A). (H4 Consistency & standards.)** Thread rows are built as
  `<div class="grow clickable">` with only `div.onclick` (`index.html:4381–4386`) — no
  `tabindex`, no role, no keydown handler, no inner link. A keyboard-only user (or
  switch/sip-and-puff AT user) can see the thread list but **cannot open any thread**; the only
  alternative path is typing a `#forum/<uuid>` hash by hand, which is not an accessibility-
  supported alternative. This clears INDEX's violation bar: a Tier-A Level-A criterion the
  shipped pattern testably fails. The inconsistency half: the guides surface solved the same
  problem with real `<button class="guide-card">` elements (with `:focus-visible` styling), so
  the repo already contains its own correct pattern. Inner author-name `<button>`s ARE
  focusable, which makes the row's own inaccessibility stranger to an AT user (you can reach
  the author but not the thread). *Fix shape: render the row title as a `<button>` (or make the
  row `role="link"` + `tabindex="0"` + Enter/Space handler), guides-card style.* Recorded as
  **ACC-26** in [`accessibility.md`](accessibility.md) with the ⚠ CONTRADICTION tag.

- **HE-3 — The "All parts" view renders the whole catalog as DOM in one pass: 2,986 cards →
  57,120 DOM nodes, measured live. (H7 Flexibility & efficiency; performance.)** No pagination,
  no incremental "show more," no virtualization — `renderCatalog()` builds every matching card
  synchronously. At 375 px the Complete Bikes category alone produced a 61,046 px-tall document
  (436 cards); "All parts" is ~7× that card count. Chrome's own guidance flags ~1,400 nodes as
  excessive; this is ~40×. DNS-15's INP doctrine governs re-render *frequency* (input vs
  change) but nothing bounds re-render *size*, and the cost grows linearly with the catalog —
  which is actively expanding toward 4,000+ parts. PRF-16's unread field data is exactly what
  would show whether real users feel this today; the trend direction is not in doubt.
  *Checkable: `renderCatalog()` in `index.html`; reproduced by clicking "All parts."* Recorded
  as **PRF-19** in [`performance-perceived.md`](performance-perceived.md).

### Severity 2 (minor)

- **HE-4 — `document.title` is only maintained by the guides view; every other view shows a
  stale or wrong title. (H1 Visibility of system status; H4 Consistency.)** Verified live:
  navigating guides → forum leaves the tab titled "How BuildMyMTB Checks Your Build —
  BuildMyMTB Guides" while reading the forum. The only three `document.title` assignments in
  the app are the guides-index, guide-article, and back-to-builder paths
  (`index.html:4654/4669/4673`); `#forum`, `#inventory`, and `#profile` never set it. Costs:
  wrong tab label among open tabs, mislabeled history/bookmark entries, wrong context announced
  to screen readers on tab switch. *Fix shape: set a per-view title wherever the view router
  toggles sections, reusing the guides pattern.* Recorded as **NAV-18** in
  [`navigation-ia.md`](navigation-ia.md).

- **HE-5 — Guide cards are `<button role="listitem">`: the ARIA role overrides the button role
  for AT, hiding activability. (H4 Consistency & standards.)** `index.html:1254` puts
  `role="list"` on the grid and `role="listitem"` on each `<button class="guide-card">`
  (`:4640`). Native semantics keep the cards focusable and Enter/Space-activatable, but a
  screen reader announces "list item," not "button" — the affordance is silent exactly for the
  users who can't see the hover/focus styling. The list semantics and the control semantics
  want different elements (`<ul><li><button>` or drop the list roles). Severity 2, not a
  Level-A violation (operation still succeeds; the role is misleading rather than blocking).
  Recorded alongside ACC-26's fix chip as **ACC-27**.

- **HE-6 — Mobile permanent chrome: sticky 150 px header + fixed 44 px build bar ≈ 24% of a
  375×812 viewport, more on shorter phones. (H8 Aesthetic & minimalist design.)** Measured
  live: the header (nav row + search) is `position:sticky` full-height at mobile, the build bar
  is fixed at bottom; together 194 px of every scrolled frame. On a 667 px-tall viewport
  (iPhone SE class) that is ~29%. **Deliberately recorded as a measurement, not a
  recommendation** — the topo header is a Douglas taste domain (style memory), and the sticky
  *search* is defensible (MOB-49 notes it's the one top-zone control worth its cost). The
  number is here so any future "should the header condense on scroll?" conversation starts from
  data. No severity beyond 2: content remains fully usable.

- **HE-7 — The forum's category chip wall: 17 always-expanded chips ≈ 460 px at 375 px,
  pushing the first thread below the first contentful viewport. (H8; forms/density.)** A
  signed-out mobile visitor sees ~460 px of category chips (plus header) before any actual
  discussion. DNS-8's >6-value collapse threshold — which the *builder's* facets all stay
  under (DNS-22) — is blown past here (17 values), and unlike the builder rail this row IS the
  page's primary navigation. Same honest caveat as DNS-20 though: collapsing costs
  discoverability (NAV-2), and the forum is young — a "collapse to top-N + More" pattern is
  only worth it if real usage shows category browsing matters less than thread scanning.
  Flagged as a candidate with the measurement attached.

### Severity 1 (cosmetic / hardening)

- **HE-8 — The build-slot Remove button is 21×17 px on desktop — passes SC 2.5.8 only via the
  spacing exception (measured 44 px vertical gap between adjacent targets, 24 px circles don't
  intersect); upsizes correctly to 38×38 on mobile.** Recorded as a **checked non-violation**
  with numbers so future rounds don't re-derive it. Two hardening nits ride along: the
  accessible name is the glyph "×" (name-from-content; `title="Remove"` is only a description —
  AT announces "times" or "multiplication x"), and desktop 21×17 is simply small for a
  destructive-ish action even where conformant. An `aria-label="Remove <part>"` would fix the
  name in one attribute.

- **HE-9 — Guides page heading order inverts (H2 "📚 Guides" page head above the article's
  H1).** Best-practice nit only — WCAG has no ordered-headings requirement; the article's own
  internal structure (H1 → H2 sections) is exemplary. Not worth a fix chip alone; fold into any
  future guides touch.

---

## What the evaluation found RIGHT (recorded so it isn't re-litigated)

- **H1 Visibility of status is a strength.** The verdict panel is `role="status"
  aria-live="polite"`; the toast likewise (`aria-atomic`); pick feedback narrates next steps
  ("✓ <part> — next: Rear Shock. Only parts that don't clash are shown."); forum has distinct
  Loading / error-with-message / two-tier empty states (`index.html:4358–4377`); the signed-out
  forum shows "Read-only right now — sign in to start a thread."
- **H9 Error recovery is a strength where verdicts are concerned:** structured fix-tier
  messages (adapter names), report-a-wrong-verdict CTA directly under the verdict panel.
- **H3 elsewhere:** every dialog is a native `<dialog>` with Close, backdrop-click dismissal
  wired (`:5040`), and Esc via native cancel (ACC-22's audit); per-part × Remove exists on
  every slot; "← All guides" AND "← Back to builder" dual exits in guide articles.
- **H5:** signed-out users cannot *reach* the posting UI at all (`hidden` gating verified —
  see False alarms); crossed numeric bounds resolve deterministically (DNS-21); the share
  sanitizer drops garbage rather than crashing.
- **H6/H10:** the dot legend is persistent (not hover-only); guides are genuine task-oriented
  documentation with honest titles ("what a green build does *not* promise"), per-article
  titles, read-time labels, and `#guide/<slug>` deep links; jargon (S.H.I.S., UDH) has a
  dedicated decoder guide.
- **H2:** verdict copy is mechanic-language by explicit design (EXPERT-REVIEW-DOSSIER), and
  the honest-data values hold everywhere inspected — "No conflicts found" nowhere overclaims.

## False alarms (kept on purpose — the method lesson of the round)

- **"＋ New thread does nothing when signed out" — WRONG, died in verification.** The live probe
  clicked the button via script and observed zero response. The source shows
  `$('forumNewThread').hidden = !inU` (`index.html:4326`) — the button is `hidden` for
  signed-out users, who instead see the sign-in hint; `openForumNewThread()`'s guard
  (`:4482`) is a belt-and-suspenders second layer, and the same gating pattern protects
  Delete-thread (`:1207/:4403`) and the reply box. **A synthetic `.click()` reaches handlers a
  real user cannot** — `querySelectorAll` and `textContent` both see `hidden` elements. Every
  future scripted audit must gate on real visibility before claiming a dead control.

## Round-6 recommendation

The two fix-chips worth the coordinator's immediate attention are **HE-2** (Tier-A violation,
small fix, pattern already in-repo) and **HE-1** (highest user-pain-per-fix-cost). HE-3 is the
one that gets worse by itself as the catalog grinds grow — it wants a design decision (paginate
vs virtualize vs per-category default caps) before the 4,000-part era, informed by PRF-16's
still-unread field data. After those, this document's candidates are exactly the input RES-8's
5-user study should test with humans — heuristic evaluation proposes, users dispose.
