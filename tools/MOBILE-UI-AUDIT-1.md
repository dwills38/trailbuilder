# Mobile UI Audit #1 — BuildMyMTB live surfaces

**Auditor:** ui-expert (worked from `tools/ui-expert/` corpus, seeded 2026-07-18).
**Branch:** `audit/mobile-ui-1` off `origin/main` @ `7cd8b98`. **Date:** 2026-07-18.
**Status:** findings only — **no UI edits, no push** (INDEX "Boundaries": this corpus flags, it
never implements). All recommendations route to the seat-12 coordinator; taste calls to Douglas.

---

## The bar (how to read severities)

Per corpus INDEX rules 5/6 and "Boundaries": **a shipped pattern is only called a _violation_ when
it testably fails a Tier-A (WCAG AA / platform-vendor) criterion.** NN/g and other Tier-B research
support _recommendations_ and prioritisation, never a "violation" label on their own.

- **CRITICAL** — testable AA failure that blocks or badly degrades the core task on a primary
  surface. *(None found. The site is structurally sound on mobile — see "What's already right".)*
- **HIGH** — testable AA failure (or a near-certain one) on a core signal / default theme, or a
  Tier-B failure with broad task impact.
- **MED** — defensible AA concern softened by a mitigation, or a well-sourced Tier-B recommendation.
- **LOW** — comfort/polish below the Tier-A floor; sourced but low task impact.

**Every finding below is pure CSS / markup / theme-token work. None is engine-adjacent** — `checkBuild`
and the catalog are untouched by every fix here (as the brief predicted).

## Method & envelope

Static preview of the worktree (`python -m http.server`, `--directory` launch.json entry) at **320 /
375 / 768 / 1280 CSS px**. Because headless screenshots time out, every number below is **computed
geometry** (`getBoundingClientRect`, `getComputedStyle`) or **exact WCAG contrast math** from the live
theme tokens (`scratchpad/contrast.js`; sRGB-linearised, **no rounding** per ACC-3). Contrast run
against **all four themes** — `light` (default, no class), `dark`, `rad`, `loam`. **The Pee Wee theme
is NOT on `origin/main` yet**, so four themes, not five. Character-per-line figures use a
`0.5 × font-size` per-glyph approximation (directional, not exact).

Surfaces exercised: `index.html` (builder — rail, chip rows, range sliders, part cards, verdict
dots, build panel, mobileBar), `KitBuilder/index.html`, `bmx.html`, `#guides`, and the three legal
pages (`privacy` / `terms` / `affiliate-disclosure`). **Forum/profile are account-gated** (Supabase
off on localhost) — assessed from source CSS only; flagged in "Coverage gaps".

---

## What's already right (measured — keep these)

These passed and are worth protecting from regressions; several also matter for the UNBIASED value.

- **No horizontal page scroll at 320 px or 375 px** on any surface — `documentElement.scrollWidth ==
  clientWidth`. The WCAG **1.4.10 Reflow (AA)** floor (RSP-3) is met; the two-pane grid collapses to a
  single column by content pressure at ≤768 px (`display:block`, mobileBar shown), exactly RSP-6.
- **All body/UI text clears WCAG 1.4.3 (AA) in all four themes** (ACC-1). Lowest text pair is
  `err on err-bg` = **4.53:1** (light) — still ≥ 4.5. No text-contrast violation anywhere.
- **Viewport meta correct** (MOB-7): `width=device-width, initial-scale=1.0`.
- **Fixed bottom bar respects the safe area** (MOB-8): `#mobileBar` pads
  `calc(12px + env(safe-area-inset-bottom))`.
- **The whole part card is a large tap target** — `card.addEventListener('click', … open())`
  (index.html:2375/2588/2662). So the 19 px `.name` button is **not** a MOB-3 problem: the same
  "view details" function has a 288×122 px equivalent target (MOB-3's equivalent-control exception).
- **Body links are underlined** (ACC-5) — verified `text-decoration: underline` on legal-page links.
- **Themes are thoroughly overridden** — every `#fff` control fill (search, `.btn`, `.chip.sub`,
  forum/profile inputs) is swapped to `var(--card)` in `html.dark` / `html.rad` / `html.loam` blocks,
  so there is **no unreadable white-input bug** on the dark themes (checked all three explicitly).
- **Header nav is the NN/g "combo" pattern** (NAV-1): Community, BuildMyKit, BuildMyBMX and Guides are
  visible labelled controls with a "More options" overflow — the sourced win over a fully-hidden
  hamburger, and it already scales the page family.
- **`#guides` is clean** — 42 cards, **zero sub-44 px targets**, no overflow, ~48 chars/line.
- **A touch-readable compat reason already exists** — `.pm-compat` (index.html:577) surfaces the dot's
  reason as text on card-open, from the 2026-07-14 phone audit. Good precedent; extend it (see HIGH-1).

---

## Findings

| # | Sev | Area | Cited basis | Engine-adjacent? |
|---|-----|------|-------------|------------------|
| HIGH-1 | HIGH | Compat dots: contrast + colour-alone | ACC-4 (1.4.11 AA) + ACC-4 colour-alone note (WCAG 1.4.1 A) | No — CSS + tiny markup |
| MED-1 | MED | Form-field / control boundaries faint | ACC-4 (1.4.11 AA) | No — `--line` token |
| MED-2 | MED | Selected-card state ring < 3:1 (dark/loam) | ACC-4 (1.4.11 AA, "states") | No — CSS/token |
| MED-3 | MED | Range sliders: no non-drag numeric path | DNS-5 / MOB-9 (2.5.7 AA risk) | No — markup + CSS |
| MED-4 | MED | Category chip row scrolls ~4 screens | DNS-8 (NN/g) + NAV-1 (NN/g) | No — CSS |
| MED-5 | MED | 16 px cross-page/back nav links | MOB-3 (2.5.8 AA) + MOB-5 | No — CSS |
| LOW-1 | LOW | Sub-44 px comfortable targets | MOB-1/MOB-5/MOB-6 (guidance) | No — CSS |
| LOW-2 | LOW | Desktop legal/guide prose ~100 ch/line | RSP-4 (web.dev) | No — CSS |
| LOW-3 | LOW | No `prefers-reduced-motion` guard | ACC-7 (practice bar; SC 2.3.3 is AAA) | No — CSS |
| LOW-4 | LOW | Focus ring weak on dark/loam | ACC-6 (2.4.7 AA — "visible") | No — CSS/token |

### HIGH-1 — Compatibility dots fail non-text contrast on the default theme, and carry meaning by colour alone
**Surfaces:** builder + bmx grid/list part cards (the product's central signal).
**Measured (exact, no rounding).** Dots are fixed colours (`.dot.g/.w/.r/.n` = `#2aa35a / #e0a52e /
#d23b3b / #d2d7d1`, index.html:260-263) — deliberately theme-independent (line 31), which is a sound
instinct, but they are never tuned to the background and the 1 px `rgba(0,0,0,.15)` ring is far too
faint to be the boundary. Against the **light** `--card` (`#fff`):

| dot | ratio | ACC-4 3:1 |
|---|---|---|
| 🟡 warn (`w`) | **2.19:1** | **FAIL** |
| ⚪ neutral (`n`) | **1.46:1** | **FAIL** |
| 🟢 ok (`g`) | 3.24:1 | marginal pass |
| 🔴 err (`r`) | 4.74:1 | pass |

(dark/loam/rad all pass — lowest is err 3.29:1 on dark.) So on the **default theme**, the "fits, but
check a warning" and "not evaluated" states are effectively invisible to low-vision users — a testable
**WCAG 1.4.11 (AA)** failure on a core UI graphic (ACC-4 names the dots as its direct constraint).
**Second issue, all themes:** compat state is conveyed by **hue alone** at 11 px — same size, same
shape, same position. That is the **colour-alone** problem ACC-4's note calls out (the WebAIM/WCAG
**1.4.1 Use of Color, Level A** principle); a red/green-colourblind rider cannot distinguish
compatible from conflicting on a grid scan. Existing mitigations (the `.pm-compat` text line on
card-open, compatible-first sort, and the bmx dot's `title`) help on drill-in but **not** the
at-a-glance grid.
**Fix sketch (CSS + ~1 markup token):** (a) give every dot a boundary that clears 3:1 on all four
`--card`s — e.g. a `~1.5px` ring at `rgba(0,0,0,.45)` (light) / `rgba(255,255,255,.5)` (dark themes,
via a `--dot-ring` token) — cheaper than changing the fixed fills and preserves the theme-independent
semantics; and (b) add a **non-colour channel**: a tiny glyph inside/beside the dot (✓ / ! / ✕ / – ) or
a distinct fill texture, so state survives greyscale. No pop-up, token-routed, unbiased. **Not
engine-adjacent.**

### MED-1 — Form-field and control boundaries fall below 3:1
**Surfaces:** search box, report/forum/profile inputs, `.btn`, `.chip.sub` (all themes; worst on
light).
**Measured.** `--line` vs its adjacent background: light **1.17–1.26:1**, loam **1.30–1.40:1**, dark
**1.51–1.70:1** (only rad passes, where `--line` is the magenta brand). WCAG **1.4.11 (AA)** names text
input fields explicitly: an input whose only boundary is a sub-3:1 border on a same-value background is
the canonical failure — the light-theme search box (`#fff` on `#f6f7f4`, `#e3e6e2` border) has no 3:1
edge at all. **Ranked MED, not HIGH**, because labels/placeholders/icons give secondary
identification, softening the strict reading.
**Fix sketch:** introduce a slightly stronger border token for interactive controls (a `--line-strong`
at ≥3:1 vs `--card` per theme) and use it on inputs/buttons/chips; leave purely decorative dividers on
`--line`. Token-only. **Not engine-adjacent.**

### MED-2 — Selected part-card ring is below 3:1 on dark & loam
**Surfaces:** builder/bmx `.pcard.selected`.
**Measured.** Selection state = `border-color:var(--brand)` + a faint `rgba(31,111,74,.16)` shadow.
`--brand` vs `--card` = **2.55:1 (dark)**, **2.87:1 (loam)** — under the ACC-4 3:1 for a component
**state** indicator. (rad adds a glow; light passes at 6.12:1.)
**Fix sketch:** on dark/loam, thicken the selected ring and/or switch it to `--accent` (which clears
3:1) and firm up the shadow. Token/CSS. **Not engine-adjacent.**

### MED-3 — Range sliders have no non-dragging / precise-entry path
**Surfaces:** builder RANGEFILTERS (e.g. travel, weight, price).
**Assessed.** Dual native `<input type=range>` + a **display-only** "lo–hi" readout — **no numeric
entry, no steppers** (index.html:2176-2229). Native ranges are keyboard-operable (arrow keys →
satisfies **2.1.1, A**) and browser track-click gives a single-pointer non-drag move, so this is an
**AA _risk_, not a confirmed violation** (DNS-5 is a labelled inference over **2.5.7 Dragging, AA**;
the authoritative wiring is the un-fetched WAI-ARIA APG slider pattern — ACC-9 gap). Real usability
cost stands regardless: the **thumb is 14×14 px** (index.html:153) — a hard precise-drag target on a
phone (MOB-4).
**Fix sketch:** add paired **numeric inputs** (or +/- steppers) bound to the same min/max state — a
non-drag path *and* a precision path in one. Pin the ARIA against the APG before shipping (fetch
`w3.org/WAI/ARIA/apg/patterns/slider-multithumb`). **Not engine-adjacent** (range-filters.js logic is
untouched).

### MED-4 — The category filter chip row scrolls ~4 screen-widths horizontally
**Surfaces:** builder (375 px). **Measured.** `.chips` category row = 15 chips,
`flex-wrap:nowrap; overflow-x:auto`, **scrollWidth 1283 px in a 317 px container** (content right edge
1251 px ≈ 3.3 screens off-canvas). The discipline row (6 chips) also scrolls slightly. Notably the
**sub-filter chips already `flex-wrap:wrap`** — so the pattern is inconsistent. NN/g's subnav
thresholds (DNS-8) put ~15 items in the "section-menu / landing-page" band, not an endless strip, and
hidden/off-screen items carry a measured discoverability cost (NAV-1). Tier-B → recommendation.
**Fix sketch:** wrap the category/discipline rows like `.subchips` already do, **or** keep the scroll
but add a visible affordance (edge fade + count) so users know more exist. Pure CSS. **Not
engine-adjacent.**

### MED-5 — Cross-page / back nav links are 16 px tall (under the AA floor)
**Surfaces:** `KitBuilder` and `bmx.html` — "← Bike Builder", "BuildMyKit →". **Measured** h ≈ **16 px**
(no vertical padding), width 70–76 px. That is **under WCAG 2.5.8's 24 px (AA) floor** (MOB-3) with no
large equivalent target and, as standalone nav (not inline prose), the inline exception is a stretch.
Primary cross-page navigation deserves the 44 px comfortable target (MOB-5) besides.
**Fix sketch:** add vertical padding so the tap box is ≥44 px (visual text can stay 16 px). CSS. **Not
engine-adjacent.**

### LOW-1 — Comfortable-target shortfalls (all ≥24 px AA-OK; below the 44/48 px guidance)
Sub-filter chips **38 px**, search input **34 px**, `.pick` buttons **40 px**, "More options" 42 px
wide, footer legal links 20–40 px. All clear the WCAG 2.5.8 floor (MOB-3) — **not violations** — but sit
under Apple 44 pt / Android 48 dp and NN/g's ~1 cm (MOB-1/2/4); PLT-1 says designing to ≈48 px satisfies
all three. Given ~75% of interaction is thumb-driven (MOB-6), nudging primary controls up improves
one-handed use. CSS.

### LOW-2 — Desktop legal/guide prose runs ~97–103 characters per line
Legal body column is `max-width:820px` → ~**100 ch/line** at 1280 px, above RSP-4's **70–80** readable
ideal (web.dev, Tier-A). Mobile is fine (~42–49 ch). Desktop-only, readability polish.
**Fix:** cap the prose measure (~`65–70ch` / ~680 px). CSS.

### LOW-3 — No `prefers-reduced-motion` guard
No `@media (prefers-reduced-motion: reduce)` block exists (index.html). Present motion is subtle (meter
fill, toast fade), and the WCAG hook (SC 2.3.3) is **AAA**, so this is below the floor — but ACC-7 says
honouring the query is the established practice bar, and it's cheap insurance before any richer future
animation (e.g. an animated topo header).
**Fix:** one media block that neutralises the transitions. CSS.

### LOW-4 — Focus ring is weak (though present) on dark & loam
`:focus-visible{outline:2px solid var(--brand)}` is wired on every custom control (chips, name, pick,
range, guide-card, linklike) — **2.4.7 (AA) "visible" is met** — but `--brand` vs `--card` is 2.55:1
(dark) / 2.87:1 (loam), so the ring is faint. (2.4.13 Focus Appearance's 3:1 is AAA, not a floor.)
**Fix:** switch the dark/loam focus outline to `--accent` (clears 3:1) or add an offset/second ring. CSS.

---

## Per-surface summary

| Surface | 375 px overflow | Notable | Verdict |
|---|---|---|---|
| `index.html` builder | none | HIGH-1 dots; MED-1/2/3/4; LOW-1/3/4 | sound; dots are the priority |
| `KitBuilder` | none | MED-5 (16 px back link); LOW-1 | clean |
| `bmx.html` | none | HIGH-1 dots; MED-5; LOW-1 | mirrors builder system |
| `#guides` | none | — (zero sub-44 targets) | **clean** |
| `privacy/terms/affiliate` | none | LOW-2 (desktop line length) | clean on mobile |
| forum / profile | not tested (auth-gated) | CSS: single-column (DNS-1), 44×44 avatar picks, `--line` inputs (MED-1) | see gaps |

## Coverage gaps (honest, per INDEX rule 6)

- **Forum & profile pages are account-gated** (Supabase off on localhost) — not exercised at runtime.
  Source CSS looks compliant (single-column forms per DNS-1; 44×44 `.prof-avpick`), but the live 375 px
  layout, keyboard flow and input contrast are **unverified** — re-audit once accounts run locally.
- **APG slider wiring (ACC-9) unpinned** — MED-3's exact `role`/`aria-*` fix must wait on fetching the
  WAI-ARIA Authoring Practices; do not specify it from memory.
- **No field CWV** — perceived-performance (INP on part-pick → `checkBuild` re-render) not measured
  here; that is PRF-2's separate round.
- Character-per-line figures are approximate (glyph-width heuristic); contrast figures are exact.

---

## TOP-5 for Douglas (taste-level, compact)

1. **The compat dots are the one real accessibility gap.** On the default (Light) theme the yellow
   "check-this" dot and the grey "no data" dot are almost invisible, and colour is the *only* thing that
   tells the four states apart — a colourblind rider can't read the grid. Cheap fix that keeps your look:
   a crisper ring around each dot + a tiny ✓ / ! / ✕ mark inside it. Everything else is minor.
2. **Bump the small tap things up a touch.** Sub-filter chips, the search box, "Build this bike", and the
   little "← Bike Builder" links are a bit small for thumbs (some at 16 px). None are broken — just add
   padding so they're comfy one-handed. Pure polish.
3. **Give the sliders a number box.** The min/max sliders have no way to type an exact value, and the grab
   handle is tiny on a phone. A small numeric field next to each slider fixes precision *and* accessibility
   at once.
4. **The long filter chip row hides most of itself.** The category chips run ~4 phone-screens wide with no
   hint there's more — either let them wrap (like the material chips already do) or add a fade/arrow.
5. **The structure is genuinely solid — no fires.** No sideways scrolling, text contrast passes on all four
   themes, the safe-area and collapsing layout are done right, and your nav already follows the researched
   best pattern. This is a tidy base; the list above is refinement, not rescue.

*(Everything above is CSS / theme-token / small-markup work; the compatibility engine and catalog are
untouched by every recommendation.)*
