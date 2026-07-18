# Forms, Filters & Density — dense data on a 375 px screen

**Maturity: master** (L1+L2 complete + L3 craft depth — the dual-slider wiring contract worked
through to an implementable spec against the shipped `rangeRowEl()`, incl. a resolved Tier-A vs
Tier-B conflict (DNS-16) and a violation-grade finding (DNS-17); round 4, 2026-07-18)

OUR hardest problem: the catalog's filter rail, range sliders, chip rows, and data-dense part
lists on phones. Read [`INDEX.md`](INDEX.md) first — the ⚠ SITE-CONSTRAINTS rule (no pop-ups,
no build step, theme tokens, unbiased) binds every pattern here.

## Facts

- **DNS-1** — Forms are **single-column**: "multiple columns interrupt the vertical momentum"
  of completing a form. Labels sit close to their fields (above, on mobile/short forms).
  *Tier B, fetched https://www.nngroup.com/articles/web-form-design/ 2026-07-18.*

- **DNS-2** — Cut fields: "every time you cut a field or question from a form, you increase
  its conversion rate"; eliminate optional fields where possible, and if kept, limit to 1–2
  and label them optional explicitly. *Same fetch as DNS-1.*

- **DNS-3** — Error handling needs **redundant cues** — outline the field AND red text AND
  heavier font — and must preserve the user's erroneous input for correction. Never ship
  Reset/Clear buttons (accidental-wipe risk). *Same fetch as DNS-1. (Redundant-cue also
  satisfies the color-alone rule in ACC-4's note.)*

- **DNS-4** — Field width should telegraph expected input length (match the field to the
  data). *Same fetch as DNS-1. Site note: the min/max numeric filter inputs should be sized
  like 3–4-digit numbers, not full-width.*

- **DNS-5** — Range sliders are drag-dependent UI: WCAG **2.5.7 Dragging Movements (AA)**
  requires a single-pointer non-dragging alternative, and keyboard operability is required
  outright (2.1.1, Level A). A slider without paired numeric inputs or steppers is an AA risk.
  *Tier A base (w3.org/TR/WCAG22 fetch, 2026-07-18) + labelled inference applying it to
  sliders; the canonical accessible slider wiring is ACC-9's un-fetched APG pattern — pin it
  before specifying an implementation.*

- **DNS-6** — Every chip in a chip row is a pointer target, so the MOB-3 floor (24×24 CSS px
  AA; 44 px comfortable per MOB-1/MOB-5) applies to **each chip**, and NN/g's spacing finding
  (MOB-4: spacing cannot rescue undersized targets) applies **between chips**. Density is
  achieved by *collapsing groups*, never by shrinking targets below the floor. *Inference
  composing MOB-3/MOB-4 (labelled).*

- **DNS-7** — Dense data tables are the recognized exception to WCAG reflow (RSP-3): a wide
  table may 2-D-scroll **inside its own container**; the page around it still must not.
  *Tier A (the SC 1.4.10 exception list, w3.org fetch 2026-07-18).*

- **DNS-8** — Sub-navigation scale thresholds (NN/g): **<6 subcategories** → submenu/accordion
  in place; **6–15** → a section menu; **>15** → a category landing page. Applied to filters:
  a facet with a handful of values can sit open; a many-valued facet wants a collapsed
  disclosure, not an endless open chip wall. *Tier B, fetched
  https://www.nngroup.com/articles/mobile-subnavigation/ 2026-07-18 (nav-scoped research,
  filter application is a labelled analogy).*

- **DNS-9** — ⚠ SITE-CONSTRAINTS reminder (normative for this chapter): filter/compare
  patterns from the literature that auto-open overlays, nag, or interstitial are **banned
  regardless of source** (Douglas hard rule 2); progressive disclosure the user opens is the
  compliant shape. *Project rule, CLAUDE.md hard rule 2 — cited as project fact, not external.*

## L2 patterns (round 2, 2026-07-18)

- **DNS-10 — Range-slider canonical wiring** (resolves DNS-5's citation gap; site use: the
  fork-travel / price / rotor-size range filters). Full ARIA contract is ACC-10 (`role="slider"`
  + valuenow/min/max + full arrow/Home/End keyboard). **Failure mode at 375 px:** NN/g's slider
  research (Tier B) independently converges on the same worry from the *usability* side, not
  just accessibility — sliders are "subjected to the steering law" (longer/narrower drag path
  = harder to hit precisely) and touch fingers make it worse; NN/g's blunt guidance is **use a
  slider only when the exact value doesn't matter to the user, and never for a value the user
  would type (age, an exact spec number)** — for anything with a "right" numeric answer, prefer
  numeric inputs. *Tier B, fetched https://www.nngroup.com/articles/gui-slider-controls/
  2026-07-18.* Baymard's dual-handle-specific findings (Tier B, fetched
  https://baymard.com/blog/slider-interfaces 2026-07-18) add: (1) a **non-linear scale**
  (biased/log) when the value range isn't evenly useful — flat linear wastes drag distance on
  rarely-picked extremes; (2) dual-handle thumbs need a **visual affordance** (opposing
  arrows/distinct shape) so users don't mistake it for a single-point slider; (3) **disable
  click-to-jump on dual-handle sliders** (a click could ambiguously mean "move nearest handle
  here") — require drag, and say so; (4) **always pair the slider with numeric text-field
  fallback inputs** — this is the same conclusion as DNS-5's WCAG 2.5.7 reading (dragging needs
  a non-drag alternative) arrived at independently from the usability side, so it's now a
  *convergent* Tier-A + Tier-B recommendation, not just an accessibility minimum; (5) **live-
  update the results while dragging** (matches this site's existing real-time-verdict
  philosophy — no "Apply" button needed, which also sidesteps DNS-2/DNS-3's form-friction
  concerns). NN/g adds a placement note that composes with MOB reach-zone data: **labels/values
  must render above or beside the thumb, never below it** — on touch, the dragging finger
  occludes anything below the handle. **Tradeoff record:** text-input fallback costs vertical
  space on an already-dense filter rail; the alternative (slider-only) fails DNS-5's AA floor
  outright, so the fallback is not optional here — it's the accessible-and-usable minimum, not
  a nice-to-have.

- **DNS-11 — Disclosure-driven facet collapsing** (resolves part of DNS-8's application gap;
  ties DNS-8's >15-value threshold to a concrete, accessible mechanism). Use ACC-11's disclosure
  pattern (native `<button>` + `aria-expanded` + a following content block) as the collapse
  mechanism for any facet crossing DNS-8's 6-value line, rather than a bespoke show/hide div —
  the native-button route gets Enter/Space keyboard support for free and needs no extra ARIA
  wiring. **Failure mode:** a disclosure whose trigger isn't a real `<button>` (a styled `<div
  onclick>`) silently drops keyboard operability — a common APG-violation shape worth checking
  against the live filter rail in a future round.

- **DNS-12 — Listbox vs chip-row for single-select facets** (resolves the "restructured as a
  listbox" possibility ACC-12 flagged). The current chip-row pattern (a row of `.chip` buttons,
  one active) is *not* an APG listbox and doesn't need to become one — APG's own listbox pattern
  is for a taller, often-scrolling option set with roving focus, which is heavier machinery than
  a short, always-visible chip row needs. **Tradeoff record:** adopt listbox semantics only if a
  facet's chip count grows past what a single row can hold at 375 px without wrapping
  awkwardly (DNS-6/DNS-8 territory) — until then, a chip row where each chip independently
  satisfies MOB-3's 24 px floor and carries a real `aria-pressed`/`aria-selected` state is
  simpler and equally accessible. *Labelled inference composing ACC-12 + DNS-6/DNS-8, no direct
  source recommends chip-rows over listbox — this is the corpus's own judgment call, flagged as
  such.*

- **DNS-13 — The 5 essential filter facets** (Baymard, general e-commerce — apply with
  judgment, not verbatim, since BuildMyMTB is a compatibility-first parts catalog, not a general
  storefront): **price, user-rating average, color, size, and brand** are the five shoppers
  reach for across verified benchmarks. *Tier B, fetched
  https://baymard.com/blog/5-essential-filters 2026-07-18.* Site mapping: price and brand map
  directly (both exist); "size" maps to this catalog's spec-driven filters (wheel size, travel,
  BB standard — TrailBuilder's whole reason to exist is spec-fit, a size analog); color and
  user-ratings don't apply today (no color variants tracked, no reviews per the roadmap's
  parked ratings idea) — **not a gap to fill, a genuine "doesn't apply to this product type"**
  per the corpus's not-established-is-honest rule.

- **DNS-14 — Filters vs. facets** (terminology + when faceted nav earns its cost). A single
  filter narrows on one dimension; **faceted navigation is multiple filters that together
  describe a content set's dimensions** — appropriate for large, multi-dimensional catalogs, but
  NN/g explicitly cautions "make sure that users truly do need faceted navigation... before
  investing in it," since more facets raise interaction cost. *Tier B, fetched
  https://www.nngroup.com/articles/filters-vs-facets/ 2026-07-18.* Site note: the parts catalog
  (wheel size × travel × BB × brake mount × …) is a textbook faceted-nav case — the corpus
  already assumes this shape is earned, not questions it; DNS-8's collapse-thresholds are what
  keep faceted nav's interaction cost bounded at 375 px.

---

## The dual-slider wiring contract (round 4 / master, 2026-07-18)

DNS-10 established *what* the literature says about dual-handle sliders. This section is the
**implementable spec** for the seven range axes actually shipped in `index.html`'s
`RANGEFILTERS` — Fork travel, Front travel, Rear travel, Dropper drop, Tire width, Shock
eye-to-eye, Stroke (shock travel) — audited against that contract. *Method: static audit of the
shipped `rangeRowEl()` factory and its CSS, per ACC-21's boundary. Recommendation-grade: this
corpus does not edit `index.html`.*

- **DNS-15 — WCAG 2.2 SC 2.5.7 Dragging Movements, AA — the exact contract** (upgrades DNS-5
  from labelled inference to a pinned reading). Normative: all functionality operated by
  dragging must be achievable **by a single pointer without dragging**, unless dragging is
  essential or the behaviour is user-agent-determined and unmodified by the author. Two things
  the Understanding page settles that DNS-5 could only infer:
  1. **Keyboard operability does NOT satisfy 2.5.7.** W3C is explicit — keyboard equivalence
     for a drag operation does not meet the SC "unless that equivalent keyboard operation also
     provides controls that can be clicked or tapped with a pointer." Arrow-key support on a
     native range input is a 2.1.1 (Level A) matter and buys nothing here.
  2. **W3C names click-on-the-track as *the* canonical compliant alternative for a range
     slider**: while the thumb is dragged, "an alternative pointer method to change the value is
     to click/tap anywhere on the slider track to move the thumb to that position."
  *Tier A, fetched https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
  2026-07-18.*

- **DNS-16 — ⚠ Tier-A vs Tier-B conflict: click-to-jump.** DNS-10 carries Baymard's
  recommendation (3) to **disable click-to-jump on dual-handle sliders**, because a track click
  is ambiguous about which of two thumbs should move. DNS-15 establishes that a track click is
  W3C's own named remedy for 2.5.7. **These directly conflict on a dual-handle slider.**
  Resolution under INDEX's tier rules — a Tier-A AA criterion is a testable floor, a Tier-B
  usability finding is a recommendation, so **the floor wins**: a dual slider may not simply
  drop click-to-jump and stop there. But it does not have to *re-enable* the ambiguous
  behaviour either, because Baymard's own recommendation (4) — **paired numeric fallback
  inputs** — restores a single-pointer, non-drag path to any value and satisfies 2.5.7 while
  keeping the track click disabled. **Both sources are satisfiable at once; the numeric
  fallback is the joint solution.** *Corpus judgment composing DNS-15 (Tier A) with DNS-10's
  Baymard findings (Tier B), flagged as the corpus's own reasoning, not a sourced rule.*

### Live-DOM audit of `rangeRowEl()`

**PASSES — and the reason is the same structural lesson as ACC-22's dialogs:**

1. **Each handle is a real `<input type="range">`**, not a `role="slider"` div. Two are overlaid
   per row. As with `showModal()`, the platform supplies ACC-10's entire ARIA + keyboard
   contract — `valuenow`/`valuemin`/`valuemax`, arrows, Home/End, PageUp/PageDown — with no
   hand-rolled wiring to drift. **Any future range axis must use this factory, not a bespoke
   div-slider.**
2. **The pair is wrapped in `role="group"` with an `aria-label`**, and each input carries a
   distinct accessible name (`"Minimum — <heading>"` / `"Maximum — <heading>"`). This is the
   correct dual-slider grouping and satisfies ACC-19's unique-name requirement — a real
   strength, since "two unlabelled sliders in a row" is the common failure shape.
3. **The reset button is properly named** (`aria-label="Reset <heading> to the full range"`) and
   is `hidden` unless the axis is actually narrowed — so it never advertises a no-op.
4. **Coincident-thumb handling is solved and documented.** When both thumbs land on the same
   value, only the top-`z-index` one is grabbable; `refresh()` promotes whichever thumb sits in
   the *less crowded* half of the track. This is the known weak point of the overlaid-native-
   input technique and the shipped mitigation is the standard one.
5. **The `input`/`change` split is exemplary and should be treated as doctrine.** `input` (which
   fires continuously mid-drag) repaints only that row's own label, fill and thumb z-index;
   `change` (once, on release or arrow-key commit) is what re-filters the 3000-row catalog, and
   deliberately skips `renderSubFilters()` so a keyboard user's focus is never torn out from
   under them mid-interaction. **Cross-reference PRF:** this is a textbook INP defence — the
   expensive work is moved off the continuous-input path — arrived at independently of the
   performance chapter.
6. **Baymard (5), live-update-while-dragging: partially met, for a documented reason.** The
   *label and fill* update live; the *result set* updates on release. Recorded as a **tradeoff,
   not a defect** — live-refiltering 3000 rows per pointermove is exactly what pass 5 avoids.
   The user still gets continuous numeric feedback while dragging, which is the part of
   Baymard's finding that carries the usability benefit.

- **DNS-17 — ⚠ CONTRADICTION (violation-grade): the shipped dual sliders fail SC 2.5.7 (AA).**
  `.range-input` is set `pointer-events:none`, with only `::-webkit-slider-thumb` /
  `::-moz-range-thumb` opting back into `pointer-events:auto` (`index.html` ~line 152–160). That
  is the trick that makes two overlaid full-width inputs work at all — but its effect is that
  **the only pointer-reachable part of the control is the thumb, and the only way to change a
  value with a pointer is to drag it.** Clicking the track does nothing (the underlying
  `.range-track` div has no handler). Neither exception rescues it: dragging is not *essential*
  (W3C's own text offers track-click as the alternative — DNS-15), and the user-agent exception
  is closed precisely *because* the author modified the native behaviour with that CSS. The
  reset button is not an alternative either — it reaches exactly one value (the full range), not
  the arbitrary values the filter exists to set.
  **This clears INDEX's bar for the word "violation": a Tier-A AA criterion that the shipped
  pattern testably fails.** It affects all seven axes, since they share one factory.
  **Recommended fix, for a coordinator fix-chip** — implement DNS-16's joint resolution rather
  than re-enabling click-to-jump: add the **paired numeric inputs** DNS-10 already called "not
  optional." Concretely, per row: two `<input type="number">` (min and max) bound to the same
  values as the two range inputs, each with `inputmode="numeric"`, `min`/`max`/`step` mirroring
  the slider, a real `<label>` (or `aria-label` matching the slider's name), and a `change`
  handler sharing the slider's existing commit path. This costs the vertical space DNS-10's
  tradeoff record already anticipated — on a rail that is already dense. **Placement caveat: do
  NOT plan to hide the numeric pair behind a disclosure.** DNS-20 establishes the rail has no
  disclosure mechanism to fold them into, and more importantly a 2.5.7 alternative that is
  itself hidden behind an extra interaction is a poor remedy. Prefer reusing the row's existing
  horizontal space — the live "min – max" label is already rendered there and the numeric inputs
  can *replace* it, since two number fields showing the same values state the range at least as
  clearly as static text. That makes the fix roughly space-neutral. *Severity note: this is the highest-
  confidence accessibility finding the corpus has produced — unlike ACC-22's `100vh` item, which
  was deliberately NOT called a violation, this one has an explicit normative sentence and an
  explicitly-closed exception behind it.*

- **DNS-18 — Non-linear scale (Baymard 1): not applicable to these axes, checked.** Baymard
  recommends a biased/log scale where the value range isn't evenly useful — the canonical case
  being price, where most inventory clusters low and the top decile wastes most of the drag
  distance. **None of the seven shipped axes has that shape**: fork/front/rear travel, dropper
  drop, tire width, shock eye-to-eye and stroke are all narrow, physically-bounded engineering
  ranges whose values are near-uniformly distributed across real parts. Linear is correct here.
  *Recorded so a future round doesn't apply Baymard (1) mechanically.* **This flips if a price
  range slider is ever added** — price is precisely the distribution Baymard's finding is about,
  and per DNS-10's NN/g half, price is also a value users often want to *type*, so a price axis
  should ship with numeric inputs from day one regardless of DNS-17's outcome.

- **DNS-19 — Dual-thumb affordance (Baymard 2): open, low confidence.** Baymard asks for a
  visual affordance distinguishing a dual-handle slider from a single-point one (opposing
  arrows, distinct thumb shape). The shipped thumbs are plain circles, identical for min and
  max. Whether that actually confuses users *here* is unmeasured, and the mitigating context is
  real — the row carries a live "min – max" text label, so the two-valued nature is stated in
  words even if the thumbs don't signal it. **Flagged as a candidate, explicitly not a finding**
  — it is a visual-taste call (Douglas's, per INDEX) and would be a good subject for the
  usability-test method rather than a corpus assertion. Note the constraint interaction if it
  ever ships: at the 38 px mobile thumb size, an arrow glyph has room; at the 14 px desktop
  thumb it does not.

- **DNS-20 — DNS-11's live-DOM check, run: the filter rail ships NO disclosures at all.**
  `index.html` contains exactly **one** `aria-expanded` in the entire file — the header's "More
  options" (`moreMenuBtn`) menu, which is not a filter facet. DNS-11 asked whether the rail's
  disclosures were real `<button>`s; the answer is that the premise doesn't hold — **no facet
  collapsing is implemented**, so DNS-8's >6-value collapse threshold is currently unenforced in
  the shipped rail, and every facet renders fully expanded.
  **This is not automatically a defect** and is deliberately not tagged a violation: an
  always-visible facet is more discoverable than a collapsed one (NAV-2's hidden-navigation
  cost applies to facets too), and the cost only becomes real when the rail's total height makes
  the *lower* facets unreachable in practice at 375 px. That threshold is measurable and has not
  been measured. **Recommended next step is a measurement, not a change:** capture the rail's
  rendered height and per-facet value counts at 375 px, compare against DNS-8's threshold, and
  only then decide whether collapsing earns its discoverability cost. Recorded here so DNS-11's
  gap closes honestly — *the check was run and returned "the pattern isn't there," which is a
  different and more useful answer than "the buttons are wired wrong."*
  **Consequence for DNS-11:** its guidance (use ACC-11's native-`<button>` disclosure, never a
  styled `<div onclick>`) remains the correct spec for *if* collapsing is ever added — it is now
  forward-looking guidance rather than a description of shipped code, and DNS-11 should be read
  that way.

## Gaps (next-round targets)

- A sourced pattern for the part-list card at 375 px (what data survives, what folds).
- Responsive data-table strategies (column priority, row-to-card collapse) — currently only
  the DNS-7 exception is pinned, not any positive pattern.
- Touch-keyboard optimization for numeric filters (`inputmode`, `type`) — with MOB gaps.
- ~~DNS-11's live-DOM check (are filter-rail disclosures real `<button>`s?)~~ → **CLOSED round 4
  by DNS-20**: run, and the rail has no disclosures at all. DNS-11 is forward-looking spec.
- L3 depth: partially addressed round 4 (DNS-15–19 work the slider craft layer end-to-end), but
  the *density* judgment call proper — when compact genuinely beats comfortable, beyond the
  DNS-6/DNS-8 floors — is still unsourced. Baymard's broader product-list benchmark
  (member-walled past the blog-post layer) is the likely next unlock.
- **DNS-20's measurement is unrun**: rail rendered height + per-facet value counts at 375 px,
  which is what would settle whether facet collapsing is earned. Needs a browser, not a fetch.
- **DNS-17 is an open coordinator fix-chip** (SC 2.5.7 numeric fallback across all seven range
  axes), not a corpus gap — it closes when the app changes; append a confirming fact then.
- DNS-19 (dual-thumb visual affordance) is parked as a Douglas taste call + a usability-test
  candidate, deliberately not a corpus assertion.
