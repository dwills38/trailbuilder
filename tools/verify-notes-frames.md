# Frame verification notes — non-runner-state dispositions

Free-form log for frame-row verification passes (per CLAUDE.md, `tools/verification-job.json`
is coordinator-only; this file is where a frame-only pass records its findings).

## verify/spectrek-1 (2026-07-20) — Specialized/Trek re-test

**Task:** re-test whether specialized.com and trekbikes.com are actually bot-walled, per a
stale premise carried in the frames backlog. Answer: **NO, neither is walled.**

### Readable-or-walled verdict

- **specialized.com: READABLE**, always was via a real browser. Confirmed independently this
  session (search results, category pages, and full product/frameset spec+geometry tables all
  render cleanly via the Claude Browser preview pane). Turns out this was already re-tested and
  fully exploited in `verify/fanout-1-trek-specialized-frames` (merged to main 2026-07-17) via a
  Bright Data unblocker route — **all 17 Specialized frame rows are now `verified:true`**. No
  work remained here; confirmed via a fresh independent fetch of the Stumpjumper 15 Alloy
  Frameset page rather than trusting the prior session's claim.
- **trekbikes.com: READABLE**, and the "JS-rendered/fetch-blocked"/"JS wall" notes stamped on
  several Trek rows (dated as recently as 2026-07-18) are a **tooling gap, not a real wall**:
  WebFetch/bdata static scrapes get nav-only HTML because Trek's product-detail "Specs" tab
  (`#tab-productSpecsTabB2C`) **lazy-loads its content on click**, not on page load. A static
  fetcher that doesn't execute the click never sees the spec table; the Claude Browser preview
  pane does (`el.click()` via `javascript_tool`, then re-read `document.body.innerText`). No
  CAPTCHA, no interstitial, no real anti-bot wall was ever encountered on trekbikes.com this
  session — every product/frameset page tried rendered fully after a decline-cookies click. This
  finding should retire the "trekbikes.com fetch-blocked" boilerplate line repeated across many
  Trek `desc` fields catalog-wide (left as-is on rows this pass didn't touch — a future pass can
  sweep them, low priority since the *specs* aren't wrong, just the wall attribution).

### Rows changed this pass (all frame, all Trek — Specialized was already 17/17 on main)

| id | change |
|---|---|
| `fr-trek-remedy-al` | verified:true; weight 3310→3950g (maker M-size, corrects vitalmtb figure) |
| `fr-trek-remedy-c` | verified:true; weight 2630→2620g; +maxTire:2.8 (new field, maker-stated) |
| `fr-trek-xcaliber-8` | verified:true; price 750→799.99 (real frameset SKU exists, contra the prior "completes only" note); weight 2050→2170g; +maxTire:2.4 |
| `fr-trek-roscoe-gen4` | verified:true; maxRotorR 180→203 (was reading the stock rotor size as the ceiling) +minRotorR:180 (new, rule 10b-eligible); weight 2268→2250g; price 699→699.99; udh:true upgraded from third-party-corroborated to direct-manufacturer-confirmed |

Gates run after every row: `node validate.js` (0 problems), `npx vitest run` (757/757), `npx tsc
--noEmit` (clean) — all green after the full batch.

### Left open

- **`fr-trek-slash`** (id, "Slash 9.9", carbon, 2024, no `gen` field) — **0 complete bikes
  reference this row** (`fills.frame` search across the whole catalog returns zero hits) and it
  looks like a pre-split duplicate of the platform now properly modeled as
  `fr-trek-slash-c-gen6`/`fr-trek-slash-al-gen6`/`fr-trek-slash-alloy-gen6` (all three already
  `verified:true`, same `family:'trek-slash'`, same 2024-2025 high-pivot generation). Did not
  touch it or spend a verification fetch on it — guessing which SLR/carbon tier it's meant to
  represent risked planting a wrong weight/price on an orphaned row. **Flagging for the
  coordinator**: either retire it via a documented "superseded, kept per append-only" note (no
  deletion, ids are permanent) or confirm it's meant to model something the gen6 rows don't
  (e.g. the top SLR frame tier) and verify it properly against that specific frameset SKU.
- Did not attempt the generic "trekbikes.com fetch-blocked" wording sweep across untouched Trek
  rows (out of scope for this pass, flagged above).
