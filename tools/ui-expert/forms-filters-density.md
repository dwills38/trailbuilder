# Forms, Filters & Density — dense data on a 375 px screen

**Maturity: professional** (L1 + L2 pattern layer, round 2, 2026-07-18)

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

## Gaps (next-round targets)

- A sourced pattern for the part-list card at 375 px (what data survives, what folds).
- Responsive data-table strategies (column priority, row-to-card collapse) — currently only
  the DNS-7 exception is pinned, not any positive pattern.
- Touch-keyboard optimization for numeric filters (`inputmode`, `type`) — with MOB gaps.
- DNS-11's live-DOM check (are filter-rail disclosures real `<button>`s?) — not verified this
  round, corpus-only research.
- L3 depth: none of this chapter's craft-layer judgment calls (when compact density genuinely
  beats comfortable spacing, beyond the DNS-6/DNS-8 floors) are sourced yet — Baymard's broader
  product-list benchmark (member-walled past the blog-post layer) is the likely next unlock.
