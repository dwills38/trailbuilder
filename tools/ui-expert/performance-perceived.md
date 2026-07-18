# Performance & Perceived Performance

**Maturity: foundation** (L1 seed, 2026-07-18)

LCP/INP budgets, no-build-step constraints, font/paint behavior. Read [`INDEX.md`](INDEX.md)
first.

## Facts

- **PRF-1** — **LCP budget**: good **≤ 2.5 s**, poor > 4.0 s, judged at the **75th percentile**
  of page loads across mobile+desktop. LCP candidates: `img`, `image`-in-`svg`, `video`
  poster/first-frame, `url()` background images, and block-level text elements. *Tier A,
  fetched https://web.dev/articles/lcp 2026-07-18. Site note: with no hero imagery, this
  site's LCP element is almost certainly a text block — LCP is then gated by CSS/JS arrival
  and first render, not image loading.*

- **PRF-2** — **INP budget**: good **≤ 200 ms**, needs-improvement 200–500 ms, poor > 500 ms,
  at the 75th percentile. *Tier A, fetched https://web.dev/articles/inp 2026-07-18. Site
  note: the INP-critical interactions here are part-pick → `checkBuild` + full re-render, and
  filter changes over the whole catalog; keeping those handlers under ~200 ms **on a mid-range
  phone** as the catalog grows is this site's principal performance contract.*

- **PRF-3** — Site synthesis (labelled inference from PRF-1 + the repo's conventions): the
  no-build-step/no-CDN/vendored stack is performance-*friendly* by construction — no
  third-party font/CDN round-trips, one origin — and the classic `<script>` chain
  (`compat.js` etc.) is render-blocking by default, which keeps first paint behind catalog
  parse. Measurement (PRF-5 gap) must precede any restructuring recommendation. *Inference,
  labelled.*

- **PRF-4** — No webfonts is a font-performance *win*: system fonts render with zero network
  cost and no FOUT/FOIT window. **The FOUT/FOIT taxonomy and `font-display` details are
  unpinned this round** — irrelevant while the no-webfont constraint holds; pin only if that
  constraint is ever revisited. *Status note, not a fact.*

- **PRF-5** — Skeleton screens vs spinners and perceived-wait research: **not established this
  round** — no primary fetched. Do not assert "skeletons feel faster" from memory; the
  research record is genuinely mixed and needs fetching. *Honest gap.*

## Gaps (next-round targets)

- Field measurement: no CWV data exists for buildmymtb.com (Cloudflare Web Analytics measures
  traffic, and any RUM/CWV capability it has is unverified). Pinning real LCP/INP numbers is
  the first actionable round-2 step — recommend-to-coordinator, not implement.
- Perceived-performance literature (PRF-5).
- Long-task/main-thread guidance (web.dev "optimize INP") unfetched — the mechanism layer
  under PRF-2.
- CLS not seeded at all (the third Core Web Vital) — low risk on a stable-layout app, but the
  numbers should be pinned for completeness.
