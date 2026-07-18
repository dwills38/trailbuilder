# Mobile Fundamentals

**Maturity: foundation** (L1 seed, 2026-07-18)

Touch-target minimums, thumb-reach zones, gesture conventions, viewport/safe-area handling.
Read [`INDEX.md`](INDEX.md) first for corpus rules and tiers.

## Facts

- **MOB-1** — Apple HIG: on a touchscreen, buttons need a hit target of **at least 44×44 pt**;
  spacing around a button matters for distinguishing it across touch/pointer/focus input.
  *Tier A (Apple HIG "Buttons"), pinned via exa-search-highlight of
  https://developer.apple.com/design/human-interface-guidelines/buttons — developer.apple.com
  is a hard fetch wall (see INDEX fetchability map). Fetched 2026-07-18. Scope: iOS/touch;
  visionOS raises it to 60×60 pt per an Apple dev-forum quote of the HIG (Tier-D carrier —
  re-pin from the primary before relying on the visionOS number).*

- **MOB-2** — Android/Google: each interactive element should have a touch target of **at
  least 48×48 dp**; "larger is even better." Smaller targets are acceptable only for precise
  pointer input (mouse/trackpad). *Tier A, fetched
  https://developer.android.com/guide/topics/ui/accessibility/apps 2026-07-18. This is the
  Google-side primary; m3.material.io is fetch-walled.*

- **MOB-3** — WCAG 2.2 **SC 2.5.8 Target Size (Minimum), Level AA**: pointer targets at least
  **24×24 CSS px**, with an undersized target allowed only if a 24 px spacing circle doesn't
  intersect another target (plus inline/equivalent/essential exceptions). WCAG **2.5.5
  (Enhanced), AAA** raises it to **44×44 CSS px**. *Tier A, fetched
  https://www.w3.org/TR/WCAG22/ 2026-07-18. This is the only *legal-floor-tier* number here;
  MOB-1/MOB-2 are vendor guidance above it.*

- **MOB-4** — NN/g research recommendation: touch targets **≥ 1 cm × 1 cm** physical
  (≈0.4 in), grounded in fingertip width (1.6–2 cm average) and thumb impact area (~2.5 cm)
  per Parhi/Karlson/Bederson; size AND spacing both required — spacing cannot compensate for
  undersized targets. Primary calls-to-action, on-the-move use, children and seniors all push
  the size *up*. *Tier B, fetched https://www.nngroup.com/articles/touch-target-size/
  2026-07-18. Physical-size framing (cm), so px equivalents vary with device DPI.*

- **MOB-5** — Practical synthesis of MOB-1..4 for this site: the working floor for BuildMyMTB
  touch UI is **44 CSS px minimum height for tappable rows/buttons on touch layouts**, with
  WCAG's 24 px as the never-below hard floor for secondary/inline targets. *Inference from
  Tier-A sources (labelled inference, not a fetched fact). ⚠ Any audit claim of "violation"
  must cite MOB-3, the only AA requirement.*

- **MOB-6** — Grip/thumb data (Hoober/Clark): **49%** of people hold their phone one-handed;
  **~75% of interactions are thumb-driven**. Screen zones split into easy-reach (bottom/center),
  stretch, and hard-to-reach (top corners, opposite side); frequent actions belong in the
  easy-reach zone, infrequent/destructive ones can live in hard-reach. *Tier C carrying Tier-B
  research data, fetched
  https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/
  2026-07-18. Hoober's primary study is an L2 re-pin target.*

- **MOB-7** — The viewport meta tag `width=device-width, initial-scale=1` is required for
  mobile layout: it matches the page to the screen's device-independent-pixel width and sets a
  1:1 CSS-px:DIP relationship regardless of orientation. *Tier A, fetched
  https://web.dev/articles/responsive-web-design-basics 2026-07-18.*

- **MOB-8** — `env(safe-area-inset-top/right/bottom/left)` give the safe distance from each
  viewport edge; they are `0` on a plain rectangular viewport and become >0 px when a notch,
  rounded corner, or occupying UI feature intrudes. Canonical use: pad fixed bottom bars by
  `calc(base + env(safe-area-inset-bottom))`. *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/env 2026-07-18. Note: the MDN excerpt did
  not state the `viewport-fit=cover` precondition — commonly required for nonzero insets on
  iOS; **not established** from a fetched source yet, re-pin before relying on it.*

- **MOB-9** — WCAG 2.2 **SC 2.5.1 Pointer Gestures, Level A**: any function operated by a
  multipoint or path-based gesture (pinch, swipe-path) must also be operable by a single
  pointer without the path-based gesture. WCAG **2.5.7 Dragging Movements, AA**: drag-dependent
  functionality needs a non-dragging single-pointer alternative. *Tier A, fetched
  https://www.w3.org/TR/WCAG22/ 2026-07-18. Direct constraint on any future swipe-to-compare
  or drag-reorder UI — and on the existing range sliders (see DNS-5).*

- **MOB-10** — WCAG 2.2 **SC 1.3.4 Orientation, AA**: content must not lock to a single
  display orientation unless essential. *Tier A, fetched https://www.w3.org/TR/WCAG22/
  2026-07-18.*

## Gaps (next-round targets)

- Hoober's primary study (uxmatters articles) unfetched — MOB-6 rides on a Tier-C carrier.
- visionOS/60 pt number rides on a forum quote (MOB-1 note).
- `viewport-fit=cover` precondition for MOB-8 not established from a primary.
- No gesture-convention inventory yet (what swipe/long-press mean per platform) — L2.
- No sourced guidance on touch keyboards (input types, `inputmode`) — L2, matters for the
  price/weight filters.
