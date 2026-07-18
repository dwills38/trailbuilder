# Platform Conventions — iOS HIG vs Material vs web-native

**Maturity: foundation** (L1 seed, 2026-07-18)

When to follow which convention set, for a web app used on both platforms. Read
[`INDEX.md`](INDEX.md) first.

## Facts

- **PLT-1** — The two platform floors diverge on numbers but agree on direction: Apple asks
  **44×44 pt** hit targets (MOB-1), Google asks **48×48 dp** (MOB-2); both are vendor guidance
  sitting above WCAG's 24 px AA requirement (MOB-3). A cross-platform web app that designs to
  the **stricter applicable figure** (≈48 px for primary touch controls) satisfies all three.
  *Composition of MOB-1/2/3 (labelled inference; the component numbers are Tier A).*

- **PLT-2** — Decision rule for a web product (labelled inference, seeded as the chapter's
  working doctrine until an L2 source refines it): **web-native conventions first** — links
  look like links (ACC-5), the browser's own Back/scroll/zoom behaviors are never hijacked
  (MOB-9's gesture requirements point the same way), form controls stay real form controls
  unless a custom control carries its full ARIA contract (ACC-9 gap). Platform HIGs override
  web habit only where the *hardware* makes them load-bearing: target sizes (PLT-1), safe
  areas (MOB-8), thumb reach (MOB-6). Do not simulate iOS or Material *cosmetics* on the web —
  the site has its own theme system and impersonating a platform buys nothing. *Inference over
  Tier-A component facts; explicitly flagged for an L2 source (e.g. NN/g on platform
  conventions for web apps).*

- **PLT-3** — Android formalizes a text-contrast tier split the same way WCAG does: <18 sp
  (or <14 sp bold) text needs **4.5:1**, larger text 3:1 — i.e. the WCAG numbers restated in
  sp. Useful as evidence the AA contrast floor is cross-vendor consensus, not just W3C. *Tier
  A, fetched https://developer.android.com/guide/topics/ui/accessibility/apps 2026-07-18.*

- **PLT-4** — Fetch-route facts for this chapter's own sources (operational, from the INDEX
  fetchability map): Apple HIG pages are triple-walled (WebFetch shell / Exa-crawl error /
  Bright Data Forbidden) — pin HIG facts via **Exa search highlights** of the HIG page text.
  Google-side guidance: use **developer.android.com** (fetches clean); m3.material.io is
  walled. *Operational fact, established by direct attempts 2026-07-18.*

## Gaps (next-round targets)

- PLT-2 needs a real source (it is currently doctrine-grade inference).
- Nothing pinned on iOS Safari specifics (100vh behavior, rubber-band scroll, tap-highlight)
  — the practical platform-quirk layer, L2.
- Nothing on desktop conventions (hover affordances, pointer `cursor` semantics, keyboard
  shortcuts) — L2.
- Material's own M3 pages remain unpinned (walled); if a future round needs an M3-specific
  fact (state layers, elevation), find the developer.android.com or research-blog carrier.
