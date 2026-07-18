# Mobile Fundamentals

**Maturity: master** (L1+L2 complete + L3 depth on foldable form factors, the Viewport Segments
API and its Baseline status, and large-phone reachability — with a reasoned "no action needed"
recommendation (MOB-45) rather than speculative support; round 4, 2026-07-18)

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

- **MOB-11** — WCAG 2.2 **SC 2.5.2 Pointer Cancellation, Level A**: for single-pointer
  functionality, at least one of — no down-event action, abort/undo available, up-event
  reverses the down-event, or down-event completion is essential (e.g. keyboard-key emulation).
  Rationale: gives a cancellation window against accidental activation (motor/visual/cognitive
  disabilities). *Tier A, fetched https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html
  2026-07-18. Completes the 2.5.x pointer family alongside MOB-3/MOB-9.*

- **MOB-12** — WCAG 2.2 **SC 2.5.3 Label in Name, Level A**: for a UI component whose visible
  label includes text, its accessible name must contain that visible text (capitalization/
  punctuation differences OK). Failing this breaks voice-control users, who speak the visible
  label to activate a control. *Tier A, fetched
  https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html 2026-07-18. Direct constraint
  on any icon-only control or dot whose visible text (if any) diverges from its `aria-label`.*

- **MOB-13** — WCAG 2.2 **SC 2.5.4 Motion Actuation, Level A**: functionality triggered by
  device motion (tilt/shake) must also be operable via a normal UI control, and motion-response
  must be disableable, except where the motion IS the essential function or is relayed through
  an accessibility-supported API. *Tier A, fetched
  https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html 2026-07-18. Currently
  dormant — the site has no motion-triggered UI — but binding if one is ever added (e.g. a
  shake-to-reset gimmick).*

- **MOB-14** — WCAG 2.2 **SC 2.5.6 Concurrent Input Mechanisms, Level AAA**: content must not
  restrict which platform input modality (touch, mouse, keyboard, stylus) a user employs,
  except for essential/security/user-setting reasons. *Tier A, same fetch family,
  https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html 2026-07-18. AAA,
  so guidance not a floor — but directly endorses the site's existing behavior of never
  locking an interaction to touch-only or pointer-only.*

- **MOB-15** — Apple HIG's own **standard-gesture taxonomy** (Gestures page): tap (activate/
  select), drag (move an element), flick (fast scroll/pan), swipe (one-finger = back/reveal;
  four-finger iPad = switch apps), double-tap (zoom in/out), pinch (zoom), touch-and-hold
  (cursor placement in text / rearrange mode). Best practices: use standard gestures rather
  than redefining them (except in immersive/game contexts); never block systemwide
  screen-edge gestures; offer shortcut gestures as a *supplement* to a visible tappable action,
  never as the only way to do something; give immediate feedback and indicate clearly when a
  gesture is unavailable. *Route: developer.apple.com/design/human-interface-guidelines/gestures
  is triple-walled per the INDEX fetchability map, and this round's exa-search-highlight
  attempts on that exact URL returned only the page title (no body text) — the primary itself
  is not currently indexed with body text. Content pinned via a **Tier-D mirror**
  (apple-docs.everest.mt/docs/design/human-interface-guidelines/gestures/, which reproduces the
  current multi-platform HIG structure verbatim) — same re-pin-before-relying posture as MOB-1's
  visionOS note. Re-pin via search-highlight once the primary indexes with text.*

- **MOB-16** — `env(safe-area-inset-*)` requires the viewport meta tag to carry
  `viewport-fit=cover`; without it, iOS Safari never reports nonzero insets (the content is
  already letterboxed behind the safe area, so there's nothing to inset around) — this is
  **not stated by MDN's own env()/"Using environment variables" pages** (checked directly,
  2026-07-18, absent), but is explicit and consistent across two independent Tier-C/D
  practitioner sources (CSS-Tricks "The Notch and CSS", Ben Frain's iPhone X env()
  writeup) describing the same iOS behavior from the `constant()`-to-`env()` transition.
  *Tier C/D corroboration only — softens MOB-8's gap, doesn't resolve it to Tier A. If BuildMyMTB
  ever adds `viewport-fit=cover`, budget for the letterboxing tradeoff it also brings (the
  practitioner sources note this is why Safari added the safe-area insets in the first place).*

- **MOB-17** — Hoober's **primary study**, fetched directly this round (uxmatters.com, the
  author's own venue — not a carrier): 1,333 field observations (ending 2013-01-08) of people
  using phones in the wild; of 780 people touching the screen, **one-handed 49%, cradled
  (two hands, one thumb/finger touching) 36%, two-handed (both thumbs) 15%**. Matches the
  Smashing-carried numbers in MOB-6 exactly — MOB-6's Tier-C-carrier gap is now backed by the
  primary itself. A 2015 follow-up (interactions.acm.org, same author) adds: people
  touch-accuracy is highest at screen center and degrades toward corners/edges (both speed and
  confidence drop), and users constantly shift grip between the three modes as tasks change —
  a static single-grip assumption is wrong by construction. *Tier B (practitioner-published
  primary field research with a stated N and dates), fetched
  https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php and
  https://interactions.acm.org/archive/view/may-june-2015/fingers-thumbs-and-people 2026-07-18.*

- **MOB-18** — The web-native mechanism for MOB-9/gesture conflicts is the CSS `touch-action`
  property: it tells the browser which touch gestures to handle itself (pan/zoom) versus
  release to the page's own `pointer*` event handlers, and reduces input latency by letting the
  browser skip its default gesture-disambiguation delay. Values: `auto` (default, browser
  handles everything), `none`, `pan-x`/`pan-y` (single-axis panning only), `manipulation`
  (pan + pinch-zoom, but suppresses double-tap-to-zoom — the standard choice for a custom
  slider/carousel/draggable control). **Accessibility caveat**: `touch-action: none` can also
  suppress the browser's own pinch-zoom, which is an accessibility regression for low-vision
  users relying on page zoom — never blanket it, scope it to the exact draggable element. *Tier
  A, fetched https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action 2026-07-18. Directly
  actionable for the range sliders `forms-filters-density.md` covers (DNS-5's touch-drag
  surface) and any future swipe-to-compare UI (MOB-9's gap).*

- **MOB-19** — Two independent, complementary levers control which virtual keyboard a touch
  device shows: the `<input type="...">` attribute (`number`, `tel`, `email`, `url`) changes
  both the keyboard **and** the browser's built-in validation/behavior; the `inputmode`
  attribute (`numeric`, `decimal`, `tel`, `email`, `url`, `search`, `none`) changes **only** the
  on-screen keyboard shown, leaving the element's type/behavior/validation untouched — the
  right choice when you want a text input's normal behavior but a numeric-friendly keyboard
  (e.g. a free-text price field that should still allow "$1,200-1,500"). *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode and
  https://web.dev/learn/forms/attributes 2026-07-18. Directly answers the former gap for the
  price/weight filter inputs.*

- **MOB-20** — Site synthesis (labelled inference from the Android gesture-navigation docs,
  developer.android.com/develop/ui/views/touch-and-input/gestures/gesturenav, fetched 2026-07-18,
  plus the well-known iOS edge-swipe-back convention): both major mobile platforms claim the
  **screen's left/right edges** for a system back-navigation swipe that a web page cannot
  intercept or opt out of (Android exposes `systemGestureExclusionRects` for native apps only —
  no web equivalent). Any future custom swipe gesture (swipe-to-compare, swipe-to-dismiss a
  card) must start its hit region **away from the physical screen edges**, or it will silently
  lose the gesture race to the OS back-navigation every time. *Inference, composing two Tier-A/
  platform-vendor facts; flagged as a design constraint, not yet a shipped-pattern check since
  the site has no swipe gestures today.*

---

## Foldables & large-phone reachability (round 4 / master, 2026-07-18)

- **MOB-43 — Foldable form factors and what actually changes.** Two categories: **fold-out**
  phones that open horizontally into a **7.6–10.2″** tablet-sized screen (with a
  phone-sized external display when folded), and **flip** phones that fold vertically clamshell-
  style with a small **1.5–3″** cover screen. The UX consequence is not merely "more pixels":
  the *interaction mode changes with the posture* — **two-handed on the expanded screen,
  one-handed when folded** — and the expanded state unlocks genuinely different use cases
  (media, document reading, split-screen multitasking). NN/g's recorded design guidance:
  **set responsive breakpoints for the unconventional foldable sizes**, increase target sizes in
  tablet mode per Fitts's Law, and — the load-bearing one — **keep workflows consistent across
  postures**: "If primary workflows differ significantly between screen sizes, users may feel as
  if they need to relearn the app." *Tier B, fetched
  https://www.nngroup.com/articles/foldable-smartphones/ 2026-07-18. Note the article does not
  address the crease/hinge's UX impact — that gap is MOB-44's territory, and NN/g does not fill
  it.*

- **MOB-44 — The Viewport Segments API is the hinge-aware mechanism, and it is NOT Baseline.**
  `horizontal-viewport-segments` / `vertical-viewport-segments` media features report the
  segment count (`1` = non-foldable *or* unfolded; `2` = a hinged/folded posture; `>2` =
  multi-fold), and `env(viewport-segment-width|height|top|bottom|left|right <row> <col>)` expose
  each segment's geometry — so the hinge gap is computable as e.g.
  `calc(env(viewport-segment-top 0 1) - env(viewport-segment-bottom 0 0))`. A companion Device
  Posture API reports `continuous` vs `folded`.
  **Status: experimental, explicitly *not* Baseline, "does not work in all widely-used
  browsers"** (Chrome origin-trial territory). *Tier A, fetched
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/vertical-viewport-segments 2026-07-18.*

- **MOB-45 — Recommendation for THIS site: handle foldables via breakpoints, NOT the segments
  API.** Composing MOB-43 + MOB-44 against SITE-CONSTRAINTS, the honest call is **do not adopt
  viewport-segment CSS**. Reasons, in order: it is not Baseline (a no-build-step site with no
  polyfill layer should not depend on origin-trial CSS); the site has **no split-view or
  master-detail layout** that a hinge would bisect — its layouts are a filter rail plus a card
  grid, both of which reflow rather than split; and MOB-43's actually-actionable advice
  (breakpoints, target sizes, workflow consistency) is achievable with plain media queries the
  site already uses. **What a fold-out unfolding to ~7.6–10.2″ does today**: it lands above the
  site's `min-width:769px` breakpoint, so it gets the desktop layout — sticky rail plus grid —
  which is the correct outcome and requires no new code. **This is a "no action needed, and here
  is why" entry, deliberately recorded** so a future round doesn't treat foldable support as an
  unclosed gap. *Corpus judgment, flagged as such; revisit if the segments API reaches Baseline
  or if the site ever ships a genuine two-pane layout.*

- **MOB-46 — Large-phone reachability: the reachable region is a pie, not a band, and it is
  handedness-dependent.** Phone displays have grown from 1.5–2.5″ (pre-iPhone) to **6.1–6.8″**
  today, and the growth has a usability ceiling because larger screens compromise one-handed
  use. Holding a large phone in one hand gives the thumb a **pie-shaped reachable region at the
  bottom and toward the grip side** — its radius set by thumb length, so it varies by hand size
  — while **the far corner diagonally opposite the thumb is the hardest point on the screen**.
  Apple's Reachability (pull the top half down) is a platform-level mitigation, but it works by
  *shrinking the usable screen*, which "defeats the benefit of large screen smartphones."
  *Tier B/C — this is the consensus across the sources surfaced this round (NN/g's mobile
  canon plus the HCI literature on one-handed operation); recorded at the confidence the
  sourcing supports. It refines MOB-17's thumb-zone data for the large-phone case rather than
  replacing it.*
  **Site consequence, stated as a design constraint rather than a finding:** any control that is
  *frequently* used one-handed should sit low and avoid the top corners. The corpus has **not**
  measured where the site's frequently-used mobile controls actually sit — that is a concrete
  next-round audit (and a good usability-test target), not something to assert now.

- **MOB-47 — ⚠ The one foldable case that is a real risk here: posture change is a resize, and
  the site re-renders on resize.** Folding or unfolding fires the same viewport-change machinery
  as a rotation, so a foldable user crossing the `769px` boundary mid-session moves between the
  mobile and desktop layouts **live**. Per MOB-43's consistency guidance, the risk is not the
  layout swap itself (that is correct behaviour) but whether **in-progress state survives it** —
  a partially-filled build, an open dialog, a scrolled filter rail, a mid-edit numeric filter
  field (DNS-21). **Unverified**: the corpus has not tested a live breakpoint crossing with
  state in flight. Flagged as the highest-value *testable* item this chapter produced, since it
  needs only a desktop browser with a resizable window — no foldable hardware. *Explicitly a
  hypothesis, not a finding.*

- **MOB-48 — MOB-47's breakpoint-crossing hypothesis is now RUN, and in-flight state survives
  clean.** Live-driven on the built site (a resizable browser, no foldable hardware needed),
  crossing the `769px` boundary in both directions (desktop→mobile and back) with state
  deliberately in flight:
  - **(a) partially-filled build** (a frame picked, nothing else) — the `#slots` panel content
    was byte-identical before and after the crossing in both directions.
  - **(b) an open dialog** (`#partModal`, opened via the frame's `.sl-part.sl-clickable` row) —
    stayed open, correctly relaid-out at each width (`getBoundingClientRect()` matched the new
    viewport), and its Close button stayed functional after the crossing. (Caveat: this run also
    surfaced that `#compareModal` — a native `<dialog open>` — was left open from an earlier click
    and sat *underneath* `#partModal`, undetected by an `offsetParent` check because the app's
    modals are `position:fixed` — `offsetParent` is reliably `null` for fixed-position elements
    in this browser regardless of visibility, a tooling gotcha for future MOB audits, not a site
    bug. `getComputedStyle().position/display/visibility` is the correct check instead.)
  - **(c) a scrolled filter rail** — the page's `scrollY` (the site scrolls the whole document,
    not an inner rail container) is preserved as a **raw pixel offset** across the crossing, not
    a semantic/content-anchored position: at `scrollY:400` the element under a fixed test point
    was `Complete Bikes` chip pre-crossing and unrelated filter-rail content mid-crossing (mobile
    layout is ~2.2× taller when stacked), then back to `Complete Bikes` on the return crossing
    once the layout matched again. This is standard browser scroll-restoration behavior (pixel
    offset, not scroll-anchored) present on effectively every responsive site without custom
    scroll-anchoring JS — **not a TrailBuilder-specific defect**, just worth knowing it's not
    content-stable mid-crossing.
  - **(d) a mid-edit numeric range-filter field** (DNS-21's Fork-travel min input, focused with
    an unblurred, uncommitted `"15"` typed via a native-setter `input` event) — `document.activeElement`
    stayed the same node and its `.value` stayed `"15"` across both crossings; nothing lost focus
    or reset.
  - **(e) an open routed page** — both `#guide/fork-travel` (a deep guide route) and `#forum`
    (the community view) kept their hash, their content (`#guideArticle` un-hidden with its text
    intact; the forum's "BuildMyMTB Discussions" content) present and rendered correctly across
    both crossings.
  **Net: no defect found.** MOB-47's risk (in-flight state lost on a live breakpoint crossing) does
  not reproduce on any of the five state-in-flight scenarios tested. The resize→re-render
  machinery MOB-47 flagged as risky is, on this evidence, state-preserving. *Tier A for this site
  — directly observed via DOM inspection (`getComputedStyle`, `getBoundingClientRect`,
  `document.activeElement`) pre/post crossing in both directions, not inferred from source reading.*
  **Independently replicated by round 5's heuristic-eval lane the same day** (its run added the
  root cause from source: the layout swap is pure CSS media query — the app's ONLY `resize`
  listener, `index.html:4904–4911`, syncs the `--hdr-h` custom property and renders nothing;
  build state lives in JS/hash independent of layout, and dialogs are native `<dialog>` elements
  the breakpoint CSS restyles but never re-creates). Two independent same-day runs, agreeing
  conclusions = strong corroboration. **Conditional**: the "no risk" answer holds only while the
  app continues to NOT re-render on resize — if a JS resize/orientation handler that rebuilds
  DOM is ever added, this test must re-run.

- **MOB-49 — MOB-46's site-side audit RUN (round 5, 2026-07-18): the persistent mobile controls
  split cleanly into a bottom-zone action and a top-zone search; nothing frequently-used hides
  in the far corners.** Measured at 375×812: exactly two persistent (fixed/sticky) control
  surfaces exist. (1) **`#mobileBar` — the build-status/jump control — is `position:fixed` at
  the bottom edge, full-width 44 px**: squarely inside MOB-46's pie for either hand, and it is
  the control a mid-build user touches most. This is the reachability model working. (2) **The
  `sticky` header (150 px) holds the nav row and the `#search` field (full-width, 34 px tall,
  top ≈ 108 px)** — the top zone is the pie's *worst* region, but a full-width bar is reachable
  at its grip-side end, and search is a deliberate-mode action (typing already demands grip
  adjustment), so this is recorded as an acceptable trade, not a finding. Everything else
  (toolbar toggles, reset, category rail, facet chips, card pick buttons) scrolls in normal
  flow — position is user-controlled, so the pie model doesn't constrain them. **One number
  worth keeping: header 150 + bar 44 = 194 px of permanent chrome ≈ 24% of this viewport (~29%
  on a 667 px phone)** — a density observation for any future header-condense conversation
  (HE-6 in [`HEURISTIC-EVAL-2026-07-18.md`](HEURISTIC-EVAL-2026-07-18.md)), not a reachability
  problem. *Method: computed-style sweep for fixed/sticky + `getBoundingClientRect` on the
  frequently-used controls, live DOM.*

## Gaps (next-round targets)

- ~~MOB-47's breakpoint-crossing test is unrun~~ → **CLOSED round 5 by MOB-48** (two independent
  same-day runs, five in-flight-state scenarios total; everything survives; risk refuted,
  conditional on the app continuing to not re-render on resize). Still genuinely open within it:
  **real foldable hardware** — a physical fold event may differ from a synthetic resize (real
  orientation/`visualViewport` events firing alongside the width change).
- ~~MOB-46's site-side audit is unrun~~ → **CLOSED round 5 by MOB-49**: run; the two persistent
  controls are correctly placed (build bar bottom-fixed, search the acceptable top-zone trade);
  no frequently-used control in the far corners.
- MOB-44 should be **re-checked each round for Baseline status** — MOB-45's "don't adopt it"
  recommendation is explicitly conditional on the API staying non-Baseline. **Re-checked round
  5 (2026-07-18): still "Limited availability" / explicitly not Baseline per MDN — MOB-45
  stands unchanged.**
- MOB-15's Apple HIG Gestures citation still rides on a Tier-D mirror (exa-search-highlight of
  the real developer.apple.com URL returned title-only, no body text, this round) — retry
  periodically in case Exa's index of that page changes.
- MOB-16's `viewport-fit=cover` precondition is Tier-C/D corroborated, not Tier-A confirmed —
  no primary (WebKit blog, Safari release notes) pinned yet.
- Gesture-convention inventory is now seeded (MOB-15/18/20) but not exhaustively cross-referenced
  against every shipped interactive element (dots, sliders, chip rows) — an L2/L3
  pattern-by-pattern audit is future work, not yet a ⚠ CONTRADICTION hunt.
- Android's native `GestureDetector`/predictive-back APIs (fetched this round) are largely
  Kotlin/Java implementation detail with no direct web analogue beyond the touch-slop *concept*
  (MOB-20 captures the actionable edge-swipe consequence; the API surface itself doesn't apply
  to a no-build-step web app and isn't worth further citing here).
