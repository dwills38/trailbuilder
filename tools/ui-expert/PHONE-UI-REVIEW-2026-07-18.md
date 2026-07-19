# Phone UI Hard Review + m-dot Decision Packet — 2026-07-18

**Trigger (Douglas, verbatim intent):** "the phone UI is a little clunky. If we need a
m.buildmymtb.com let's do it." Part A answers *why it feels clunky* with measurements;
Part B answers the m-dot question with a recommendation.

**Method & environment.** Live-DOM journey walkthrough (not a re-run of the RES-4 heuristic
evaluation — per RES-14's own caveat) against `origin/main` @ `43c0888`, served locally,
Chromium browser pane at **375×812** and **375×667**, DOM-eval measurements (screenshots time
out headless). Journey walked: land → filter → pick a frame → resolve a warning → share →
read a guide → browse the forum, plus shared-factory spot-checks of `bmx.html` and
`KitBuilder/`. All four themes swept for contrast on the smallest text classes. Corpus
baselines used, not re-asserted: HE-6 (chrome %), HE-7 (forum chip wall), DNS-20/22 (rail
heights), MOB-46/49 (reachability). Boundaries honored: **no `index.html`/`src/**` edits —
every finding is a flag with a fix-ready spec.**

**Severity convention:** 3 = blocks or badly degrades a core journey leg; 2 = real friction,
journey completes; 1 = polish. Frequency = how often the leg is hit in a normal session.

---

## Part A — ranked findings (the clunk list)

### P-1 · Sev 3 × every-search · Searching while scrolled strands the user at the footer

Measured: in the Tires view (27,861 px doc), scrolled to 12,000 px, typing "maxxis" into the
sticky `#search` re-renders the list; the document shrinks to 10,597 px and the browser clamps
scroll to 9,785 px — the user is left staring at the **footer** ("About this prototype…"),
with the results ~9,300 px above and **zero feedback that anything matched**. Search is the
sticky header's whole reason to exist (MOB-49's "acceptable top-zone trade") and the only
practical recovery path inside the multi-10k-px lists — and using it from depth feels broken.

**Fix spec (small):** in `index.html`'s search input handler, after the list re-render, if the
search input has focus (or the value changed), scroll the catalog into view under the header:
`var cat=$('catalog'); window.scrollTo({top: cat.getBoundingClientRect().top + scrollY - header.offsetHeight - 8});`
(instant, matching the guided-flow instant-jump precedent). Acceptance: repeat the measurement;
after typing, the first result card's top sits just below the header. Apply the same to
`bmx.html` and `KitBuilder` if their search shares the pattern.

### P-2 · Sev 3 × every-browse · The category rail is unreachable from depth; no way back up

List lengths measured at 375 px: Complete Bikes **61,418 px** (~75 viewports), Frame 30,184 px,
Tires 27,861 px, KitBuilder **90,726 px**. The category/filter rail sits in normal flow at the
page top; nothing but manual flick-scrolling (dozens of flicks) or search (which strands, P-1)
gets you back to it. There is **no back-to-top control** (verified — the only "top" match in
the DOM is the `hdrTopo` SVG pattern id). PRF-19 recorded the DOM-size side of this; this is
the *navigation* side: on a phone, switching category from mid-list is a chore, so users stop
exploring categories.

**Fix spec (two options, either is a small chip):**
(a) *Minimal:* a fixed "↑ Filters" button, 44×44, bottom-left (above `#mobileBar`, mirroring
its right-side "View ▸"), shown only after `scrollY > 2 * innerHeight` (a scroll-revealed
control the user taps — not an unsolicited overlay; flag to Douglas for the no-popup smell
test anyway). Tap = the P-1 scroll target (rail top under header).
(b) *Structural:* make the category chip row itself `position: sticky; top: <header height>`
at ≤768 px (+44 px permanent chrome — collides with HE-6's 24–29% measurement; only do this
paired with a condense-header-on-scroll pass).
Recommend (a) now; (b) belongs to the PRF-19 pagination/virtualization decision.

### P-3 · Sev 3 × every-conflict · On touch there is no discoverable path to a dot's reason

The compat dot is a `<span role="img">` whose reason lives in `title` — **hover-only; a
finger can never see it**, and the dot has no click handler. On MTB the reason *is* reachable
— buried: tap the 19-px part name → `#partModal` → the verdict line renders inside (verified:
"Fork travel: 150mm exceeds the frame's rated max of 100mm." shows in the modal) — but nothing
on the card signals that path, and family-card titles explicitly say "open a size for why",
advice a phone user can't act on from the tooltip they can't see. **On `bmx.html` the path
does not exist at all**: the BMX card's name is a plain non-interactive `<div>`, there is no
part modal, so a BMX phone user can *never* learn why a dot is red (the check engine's whole
value proposition, silent on touch).

**Fix spec:** make the dot itself the affordance — `<button class="dot …">` (≥24×24 hit box
via padding; visual circle unchanged; keeps the existing `aria-label`), tap = open the part
modal (MTB) with the verdict lines already rendered there; on BMX, tap = open a minimal
click-opened card (allowed by the pop-up rule) listing the `checkBmxBuild` diff lines for that
part — the strings already exist, they're what `title` is set to. Acceptance: at 375 px with a
picked frame, tapping a yellow fork dot shows the travel warning without hovering.

### P-4 · Sev 3 × BMX/Kit-phone · `#mobileBar` never shipped to bmx.html or KitBuilder

On MTB, the fixed bottom build bar (status ✓/⚠/✗ + total + jump) is the reachability model
working (MOB-49). On **`bmx.html`** the build panel sits at doc 27,693 of 28,141 px with **no
fixed bar and no jump** — a phone user picking BMX parts gets no status and must scroll the
entire catalog to see their build. **`KitBuilder/`** is the worst case: kit summary at doc
90,372 of 90,726 px, same absence. In-repo drift, live today, between the three surfaces'
mobile experiences — see also Part B (this is what maintaining parallel surfaces does even
*inside one repo*).

**Fix spec:** port `#mobileBar` + its `.side`-jump handler from `index.html` to both pages.
BMX has `checkBmxBuild` + `bmxBuildTotals` for the verdict/total; Kit has `kitTotals` (no
verdicts — show item count + total). Same fixed bottom placement, same 44 px height, same
`aria-label`. Include P-5's corrected scroll-margin from day one.

### P-5 · Sev 2–3 × every-jump · The mobileBar jump mis-lands (stale scroll constant), and the conflict list it targets isn't actionable

`#mobileBar`'s handler runs `.side.scrollIntoView({block:'start'})`, and `.side` carries
`scroll-margin-top: 393px` — a stale constant (the mobile header measures **150 px**). Result,
measured: tap "View ▸" and the panel top parks 393 px down — sticky header 0–150, then
**243 px of unrelated catalog cards**, then the Compatibility heading mid-screen (on a 667-px
phone it lands ~59% down). The jump *feels* like it half-worked. Reproducible (two runs, both
land 1,969 px with the panel top at 2,362 px).
Second half: the Compatibility panel's conflict rows are **plain text** — "⚠ Fork travel:
160mm exceeds…" offers no tap-through to the offending slot or its category, so *resolving*
means memorizing the conflict, scrolling back up, and re-finding the category (P-2 again).

**Fix spec:** (1) set `.side { scroll-margin-top: <header height + 8px> }` at mobile widths —
better, compute it (`document.querySelector('header').offsetHeight + 8`) or use the existing
CSS var the resize listener maintains; acceptance: after tap, the Compatibility heading sits
directly under the header. (2) Wrap each conflict row's slot names in the existing
`.sl-clickable` pattern (role=button) that jumps to that slot's category chip — the verdict's
`slots` array already names them (`verdictKey` machinery; no engine change).

### P-6 · Sev 2 × every-filter · The category chip carousel hides 11 of 15 categories with zero affordance

`#chips` at 375 px: content 1,283 px in a 317 px viewport — **4× hidden overflow** — with
`scrollbar-width: none`, no fade mask, no scroll-snap, no arrow. A phone user sees the row end
at "Rear Shock" and has no signal that Brakes, Seatpost, Cockpit, Pedals… exist (NAV-2's
hidden-content cost, applied to the primary catalog nav). Same pattern on `#discChips`
(406/317), BMX (441/314), Kit (402/314). The forum's chip block *wraps* instead — opposite
trade (HE-7's 460-px wall) — so the factory currently ships both extremes.

**Fix spec (pick one):**
(a) *Affordance-only (pure CSS):* right-edge fade on scrollable chip rows —
`mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent)` — plus
`scroll-snap-type: x proximity` and stop hiding the scrollbar on touch (`scrollbar-width:
thin`). Tokens only, no layout change.
(b) *Structural:* let `#chips` wrap to 2 rows at ≤480 px (~88 px vs 44 px; the rail scrolls
away with the page, and DNS-22 measured the whole filter block at ≤323 px — 44 px more does
not approach a viewport). Kills the hidden overflow entirely; matches the forum's
always-visible convention.
Recommend (b) for `#chips` (primary nav should not hide), (a) for the minor rows.

### P-7 · Sev 2 × every-slider-use (iOS) · Sub-16px form controls trigger iOS focus-zoom

Inventory: 8 controls on `index.html` (the range rows' `<input type=number>` at **12 px** font
+ the `<input type=range>` at 13.3 px), 1 on KitBuilder (`#kSort` select, 13 px). Mobile
Safari zooms the viewport when a focusable text control's font-size is under 16 px — the
classic "tap a price field and the whole page lurches in, then stays zoomed" clunk.
(Precondition measured in DOM; the zoom itself is documented platform behavior, not observed —
no iOS device in this rig. `inputmode="numeric"` is already correctly set.)

**Fix spec:** at ≤768 px, `input[type=number], select { font-size: 16px }` (or
`font-size: max(16px, 1em)` globally); keep the 43-px field width via padding/width tokens.
One CSS rule; acceptance: no control computes under 16 px at mobile widths (the P-A audit
script's zoom-trap query returns 0).

### P-8 · Sev 2 × constant · The two primary per-card affordances are 19–20 px tall

Visible-target audit, Complete Bikes landing view: **607 interactive elements under 24 px** in
one view — dominated by `button.name` (the *only* path to part details/verdicts: 19 px tall)
and the `🧾 Build-sheet verified` / `✓ Verified` source links (19–20 px). Same on Kit (437)
and BMX (64); the build panel's `.sl-part sl-clickable` detail rows are 19 px too. Most
instances *pass SC 2.5.8 only via the spacing exception* (measured ≥30 px vertical gap to the
next target in a card — the HE-8 precedent: checked non-violation), so this is a **usability
flag, not a violation claim**: Apple's 44 pt / Android's 48 dp guidance exists because 19 px
is a genuine thumb-miss zone, and this is the tap a user makes most.

**Fix spec:** hit-area padding, visuals unchanged:
`.pcard .name, .sl-part.sl-clickable { padding-block: 6px; margin-block: -6px; }` (→ ≥31 px
hit box), same treatment for `.sheet-ver`/`.ver` links (`padding: 12px 4px; margin: -12px
-4px`). Pure CSS, no layout shift (negative margins cancel the growth). Acceptance: re-run the
small-target query; `.name`/`.ver`/`.sl-part` no longer appear.

### P-9 · Sev 2 × every-modal · Dialogs ship no scroll containment (⚠ CONTRADICTION with PLT-7)

Measured on the open `#partModal`: `overscroll-behavior: auto` on the dialog AND its `.rm-body`
inner scroller; `body` stays scrollable behind. On touch, scrolling past the modal body's end
chains to the page — close the modal and you've lost your place in the list. This directly
contradicts the corpus's own PLT-7 (Tier A, MDN): `overscroll-behavior: contain` on a modal's
scrollable body is the canonical containment.

**Fix spec:** `dialog[open], dialog[open] .rm-body { overscroll-behavior: contain; }` — one
rule, all nine dialogs (ACC-22's audit enumerated them). Optionally
`html:has(dialog[open]) { overflow: hidden }` for full background lock (check `:has()` against
the no-build-step browser floor — Baseline since 2023, fine).

### P-10 · Sev 2 × every-forum-visit · Forum: the 460-px chip wall + known open items, re-confirmed live on main

Re-measured, unchanged from the corpus baselines: **18 category chips ≈ 460 px** at 375 px
before the first thread (first thread top at doc 753 px — a signed-out phone visitor sees zero
discussion in the first viewport, HE-7); thread rows are still click-only `<div class="grow
clickable">` (tabindex −1, no role — **ACC-26, the Level-A keyboard violation, still
unfixed**); `document.title` still stale outside guides (landed on #forum, the tab still reads
the last guide's title — NAV-18). Nothing new to add — this review's contribution is
confirming they're all still live on `43c0888` and that the chip wall is the forum's dominant
phone clunk. Fix chips already specced in HEURISTIC-EVAL-2026-07-18.md; HE-7's collapse
pattern ("top-N + More", a click-opened disclosure) remains the candidate.

### P-11 · Sev 1–2 · Internal verification-log prose renders in the consumer part modal

`#partModal` for the Fox 36 Performance 150 renders, verbatim: *"seat-12 fork wave: FETCHED
'User Spec: 2026 Fox 36 29in Fork' CAD sheet directly at full resolution (Fox Factory Inc.
title block, tech.ridefox.com/…) - the current MY26 36 chassis (superseding the older
2023-2025 doc)…"* — the verify-grind's internal notes, wall-of-text, in a phone modal where
space is scarce. Receipts-transparency is a site value; internal jargon ("seat-12 fork wave")
is not the receipt. Flag for a product call: keep the source link + date visible, fold the
prose behind a click-opened "Verification notes ▸" disclosure (allowed — user-triggered), or
strip the grind-jargon prefix at entry time.

### P-12 · Sev 1 · Small-text floor

`.kind` 10 px, `.est` 11 px, `.spec` 12 px. All pass AA contrast in all four themes (worst
measured 4.87:1, dark-theme `.kind`; Loam best at 7.9–8.1:1) — recorded as a *measured
non-violation* so nobody re-litigates contrast; 10 px on a phone is simply at the legibility
floor and worth a bump whenever the card layout is next touched. No chip needed now.

### Strengths observed (settled ground, don't re-litigate)

- **The guided flow is genuinely good on phone**: adding a frame auto-advances to Fork with an
  aria-live announcement ("✓ Fox 36 Factory 160 — next: Rear Shock…"), the family → sizes
  drill-down has a 44-px "← All Fork" back affordance, and `#mobileBar` updates verdict/total
  live (⚠ amber state confirmed).
- **Modal ergonomics at 375 px are right**: top-anchored, 90–96% height, Close is 44 px tall
  at the *bottom* (thumb zone), `100svh`-based sizing (ACC-22's fix holding).
- **All four themes pass AA on the smallest text** (P-12 numbers) — the theme system's
  contrast discipline is holding on OLED dark.
- Search/status discipline: "Showing N of M parts" + build-status `role=status` regions
  announce correctly.
- No horizontal document scroll anywhere at 375 px (builder, BMX, Kit) — the
  never-horizontal-scroll rule holds.

**Method note (kept per RES-14's lesson):** two real pointer clicks on a family-name button
appeared to fail mid-session; a controlled retest (fresh scroll, fresh ref read, immediate
click) activated correctly — the failures were stale click coordinates in the test harness,
**not** a product bug. Gate real-click findings on a controlled retest before reporting.

---

## Part B — the m-dot decision packet

**Question:** should BuildMyMTB ship a separate `m.buildmymtb.com`?

**What the evidence says an m-dot would buy.** Go down the Part A list and ask "does this need
a separate mobile site?": every finding is a scroll-target fix, a CSS hit-area/font-size/fade
rule, a stale constant, or porting an existing component (`#mobileBar`) between pages. **None
of the twelve requires a second site; all twelve are small patches to the responsive site.**
The two structural pressures — 24–29% permanent chrome (HE-6) and 60–90k-px lists (PRF-19) —
are *design decisions* (condense-on-scroll, pagination/virtualization) that an m-dot would
still have to make; a separate host doesn't dodge them, it duplicates where they get solved.

**What an m-dot would cost this specific codebase.**
- **Drift, guaranteed.** No build step means an m-dot is a hand-maintained fork of three
  already-large HTML surfaces over a catalog that changes daily. The repo already demonstrates
  the failure mode *internally*: `bmx.html` and `KitBuilder` — same factory, same repo — have
  already drifted out of the mobile pattern (P-4: no mobileBar; P-3: no detail modal). A
  separate host doubles every future fix, forever, or the mobile site quietly rots.
- **SEO/canonical burden.** Google Search Central (fetched 2026-07-18,
  developers.google.com/search/mobile-sites/mobile-seo/separate-urls): Google "recommends
  Responsive Web Design because it's the easiest design pattern to implement and maintain";
  separate URLs demand correct bidirectional `rel=canonical`/`rel=alternate` pairs, UA
  redirects, and a dedicated troubleshooting section of error cases (wrong canonical targets,
  redirect mismatches, missing equivalents). All burden, no ranking upside.
- **Share links break at the seam.** Builds live in the URL hash (`#b=…`). Fragments are never
  sent to the server, so host-level redirects must be client-side UA sniffs that carefully
  re-attach the fragment — a phone user opening a desktop-shared link (or vice versa) is
  exactly where that goes wrong. Share links are a core loop; putting a host boundary in the
  middle of them is self-harm.
- **Two surfaces × four themes × the no-popup/UNBIASED rules** — every audit (bias, a11y,
  heuristic) runs twice.

**Middle paths, honestly assessed.**
- **Fix-the-responsive-site (the Part A chip list):** removes the actual reported clunk at
  ~6 small chips of effort. This is the evidence-backed move.
- **Mobile-first restructure within the one codebase** (condense header on scroll to reclaim
  HE-6's 24–29%; sticky category row; per-surface mobile layout in the existing ≤768 px
  breakpoint): the real "make phone feel first-class" investment, still one codebase, no SEO/
  share-link cost. This is where m-dot energy should go *if* Douglas wants more than the fixes.
- **PWA / add-to-home-screen** (PLT-8 criteria already seeded): cheap to add later; solves
  "feels like an app," not "is clunky." Not the current complaint.

**Recommendation (for a five-minute decision):**

> **Recommended: no m-dot. Ship the Part A fix list on the responsive site** — the six chips
> under "Immediate fix chips" below. Effort: each is a half-day Sonnet chip; the whole list
> is roughly a week of parallel chips. Douglas gains: every named clunk gone, one codebase,
> share links and SEO untouched, and the no-popup/unbiased rules audited once.
>
> **Runner-up: the mobile-first restructure inside the existing site** (condense-on-scroll
> header + sticky category row + the PRF-19 list-rendering decision). Effort: 1–2 weeks,
> design-review-gated, touches the chrome Douglas has taste opinions on (topo header —
> route mockups to him). Douglas gains: the structural 24–29%-chrome and infinite-list
> problems solved, phone experience genuinely first-class, still one site.
>
> An m-dot delivers less than either path at strictly higher permanent cost (two sites to keep
> honest daily on a no-build-step stack, canonical/redirect upkeep, share links crossing
> hosts). If phone traffic data (PRF-16, Douglas-only) later shows mobile dominating AND the
> runner-up proves insufficient, revisit — that evidence does not exist today.

---

## Immediate fix chips (dispatch-ready order)

1. **P-1 + P-5a** — search-strand scroll fix + correct `.side` scroll-margin (same scroll
   plumbing, one chip, index + bmx + Kit).
2. **P-4** — port `#mobileBar` to `bmx.html` and `KitBuilder` (carries P-5a's constant).
3. **P-3** — tappable dots (MTB: opens existing modal; BMX: minimal verdict card).
4. **P-7 + P-8** — the CSS-only pass: 16-px form controls, hit-area padding on
   `.name`/`.ver`/`.sl-part`, P-9's `overscroll-behavior: contain`.
5. **P-6** — `#chips` two-row wrap at ≤480 px + fade affordance on the minor chip rows.
6. **P-2a** — the "↑ Filters" scroll-revealed button (flag the no-popup smell test to Douglas
   in the PR description; it is a user-tapped control, not an overlay).

Already-queued elsewhere (do not duplicate): ACC-26 forum keyboard fix, HE-1 reset confirm,
HE-7 forum chip collapse, NAV-18 title sync, PRF-19 list-rendering decision.

**Corpus updates from this review:** MOB-50/51/52/53 (mobile-fundamentals), DNS-23/24
(forms-filters-density), NAV-19 (navigation-ia), PLT-16 (platform-conventions, ⚠
CONTRADICTION vs PLT-7), PRF-20 (performance-perceived) — appended in their chapters with this
file as the measurement record.
