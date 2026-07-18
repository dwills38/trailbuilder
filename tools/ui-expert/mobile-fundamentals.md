# Mobile Fundamentals

**Maturity: professional** (L1 complete + L2 gesture/input-control patterns, round 3, 2026-07-18)

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

## Gaps (next-round targets)

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
