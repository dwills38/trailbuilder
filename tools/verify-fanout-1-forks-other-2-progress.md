# verify/fanout-1-forks-other-2 — progress log

Branch: `verify/fanout-1-forks-other-2`, built fresh off `origin/main` @ a0a4c99
(the same base as the prior `verify/fanout-1-forks-other` branch) with that
branch's single commit (`af9ebb8`, 6 forks verified: SR Suntour Durolux x2,
Fox 34/36SL Factory x2) cherry-picked on top cleanly (it applied with zero
conflicts — the prior branch's tip sat directly on this base). This continues
that session's documented remaining worklist (~50 unattempted rows). NOT
pushed to main. Does NOT touch `tools/verification-job.json`.

Read first: `tools/VERIFY-PROTOCOL.md` (THE BAR + the 2026-07-17 fork
nominal-weight exception), `tools/DATA-ENTRY-TEMPLATE.md`, and the prior
`tools/verify-fanout-1-forks-other-progress.md` (Wayback-CDX + `bdata scrape`
technique, the Fox 34 rotor-max contradiction, known walls).

## New technique this session: curl beats bdata/rate-limits on several targets

For Marzocchi (`bike.marzocchi.com`) and X-Fusion (`www.xfusionshox.com`),
**plain `curl -A "Mozilla/5.0"` worked directly** — no Bright Data unblocker
needed, and the prior session's Marzocchi 429 rate-limit is gone. Both sites
are Shopify (Marzocchi) or a custom CMS (X-Fusion) that embed a full
`"variants":[...]` JSON blob (SKU/price/title per variant) directly in the
server-rendered HTML — `curl` + a small Node script to locate and
`JSON.parse` that one array is far cheaper and more reliable than
scrape-then-grep on the rendered markdown. Node must be pointed at a
Windows-style path (Git Bash's `/c/...` paths do not resolve for the
`node.exe` binary itself) — copy fetched files into the scratchpad
`C:\Users\...` path before parsing with `node -e`.

For `ridefox.com` (Shopify), the same trick applies when the live page still
resolves (curl finds the `"variants":[...]` blob directly, no need for
`bdata scrape -f markdown` or Wayback). Only fall back to Wayback + `bdata
scrape` when the live product page 404s/redirects to the homepage (very
common on Fox's site — old chassis pages get retired without a redirect
rule, they just render the homepage content at the old URL, no 404 status).

## Verified this session (13 rows, 2681 -> 2693 catalog-wide verified count)

- **`fk-fox-34-performance-elite-29-130`** — FETCHED (Wayback+bdata, the
  live URL 404s to the homepage) PN 910-21-294. Price corrected 949->899.
  Same maxRotorF 230-vs-203 contradiction as the Factory-tier siblings,
  kept 230, documented again (not re-litigated).
- **`fk-fox-32-sc-performance-29-100`** — promoted under the fork exception
  (a prior session had already fetched+documented everything but hadn't
  applied the now-live exception); re-fetched to confirm still live.
- **`fk-fox-34-sc-factory-29-120`** — FOUND the dedicated product page via
  Wayback CDX (`fox-34-factory-sc-grip-sl`, live 404s to homepage now); PN
  910-21-298 gives a REAL per-config weight (1422g — the caption's own
  damper name, "Grip SL", matches this SKU exactly, unlike every other
  templated-caption trap hit this session). Price corrected
  1199(estimate)->1019.
- **`fk-fox-36-factory-my27-29-150` / `-160`** — independently confirmed
  wheel/axle/steerer via a second Grip-X-only product listing sharing the
  MY27 chassis; promoted, weight replaced with the page's own unqualified
  1920g reference figure.
- **`fk-marzocchi-bomber-dj-26-100`** — direct curl confirms the real
  product; **CORRECTED axle `20x110` -> `20x110-nonboost`** (maker page
  states "20 x 110 non-boost" explicitly — this vocab distinction was
  already settled for the Bomber 58 and applies here too). Price corrected
  749->799; weight 2095g confirmed exact.
- **`fk-xfusion-slant-dj-26-100`** — RESOLVES a prior-session-flagged
  discrepancy (the MY26 OEM catalog PDF lists no 100mm Slant DJ point).
  The maker's own product-DETAIL page (a different, older CMS section of
  the X-Fusion site) states "Travel: 160mm (ITA 100/120/140/160mm)" —
  100mm is a real factory ITA setting. Promoted; weight corrected to the
  page's 1900g nominal figure. **Rotor floor (180mm native, per the same
  page) deliberately NOT added** — it would false-error the
  `cb-scott-voltage-yz01` golden build's real, cross-corroborated 160mm
  stock rotor. Caught by `npm test` mid-batch, reverted, documented in the
  row's `desc` instead of encoded as a field. **This is the one real
  regression this session hit — see "Process note" below.**
- **`fk-srsuntour-axon-werx-34-29-100/-110/-120`** (3 rows) — re-fetched the
  prior session's already-good source (still live, unchanged); promoted
  all three under the fork exception.
- **`fk-srsuntour-xcr34-2cr-29-130`** — directly fetched srsuntour.com's
  XCR-34-Boost page; confirms 130mm is a real listed setting. maxRotorF
  corrected 180->203 for consistency with the already-corrected 140mm
  sibling (same chassis/mount, same "bare Postmount 180mm" maker text
  the sibling's own history already reconciled via a real stock-build
  203mm rotor).
- **`fk-fox-34-performance-29-130`** — FETCHED (Wayback+bdata) the
  standalone `fox-34-performance-grip` product (live 404s to homepage);
  PN 910-21-314 is the ONLY consumer SKU for this tier (140mm has none).
  Price corrected 849(estimate)->599. Same 230-vs-203 rotor contradiction,
  kept 230 for consistency.

## Process note: a fork-exception promotion broke a golden build, caught and fixed

Adding `minRotorF:180` to `fk-xfusion-slant-dj-26-100` (following the
maker page's stated native-mount floor) failed `test/test-golden.js` and
`test/test-invariants.js` — `cb-scott-voltage-yz01` (a real, independently
cross-corroborated build) ships this exact fork with a 160mm front rotor.
Reverted the field addition immediately, kept the row `verified:true` (every
OTHER interface field is still manufacturer-confirmed) and documented the
conflict in the row's own `desc` instead. This is exactly the scenario
`tools/VERIFY-PROTOCOL.md` warns about (real stock builds sometimes
contradict a maker's stated "native minimum") — the gate caught it before
commit, which is the system working as intended. Flagging the mechanism here
in case a future session is tempted to add `minRotorF` to this row again.

## Corrections made (rotor-max chassis-consistency, not new-source-driven)

- `fk-fox-32-sc-factory-275-100`: **naming discrepancy flagged, not
  resolved** — the row's own pre-existing source URL literally says
  "fox-32-step-cast-**performance**-series", not Factory, contradicting the
  row's own model/id. Fetched the real Factory-tier product directly this
  session (Wayback) and confirmed it sells ONLY 29in (no 27.5in variant
  anywhere) — so even setting the tier-name question aside, no 27.5in
  Factory SKU exists on Fox's current site. Left unverified/unchanged
  (append-only), flagged for the coordinator to reconcile.

## Walls / gaps confirmed this session (left unverified, not fabricated)

- **`fk-fox-34-performance-elite-29-140` / `-120`**: only ONE Performance
  Elite 34 product exists on ridefox.com (the 130mm SKU, now verified).
  The 34-collection's own marketing copy states the chassis spans
  "130mm-140mm" but no 140mm Performance Elite PN/page could be found via
  CDX + collection-page sweep. 120mm isn't in the stated chassis range at
  all. Both likely OE-only/bike-maker-spec-sheet-only configs.
- **`fk-fox-34-performance-29-140`**: confirmed the 130mm-only wall (the
  "34 Performance" tier's only consumer PN is the 130mm one, now verified).
- **`fk-fox-36-performance-elite-my27-29-150`**: the "36 PSE Grip X"
  product (all 3 fresh captures through 2025-10-09) sells ONLY the
  160mm/29in default; no 150mm option anywhere. Press coverage
  (singletrackworld) claims a 140/150/160mm range but that's not
  maker-page-confirmed for this row's specific travel point.
- **`fk-fox-36-performance-29-150/-170/-275-150`**: both current "36
  Performance" damper-tier product listings (GRIP and GRIP X) sell ONLY
  160mm/29in — re-confirmed via live + Wayback fetches through
  2025-10-09. OE-only wall, same pattern as Rhythm.
- **`fk-marzocchi-z2-airrail-29-150`**: DIRECTLY fetched
  `bike.marzocchi.com/products/bomber-z2` (confirms "Rail damper" =
  this row's Air Rail identity). The live variant JSON lists SIX SKUs:
  29"/120, 29"/130, 29"/140 (x2 colors), 27.5"/140, 27.5"/150 — **no
  29"/150mm combo exists**; 150mm travel is 27.5in-only. This row's $499
  price exactly matches the real 27.5"/150 SKU, not any 29in one (all
  $529) — a real cross-wheel-size mismatch, flagged not fixed.
- **`fk-marzocchi-bomber-z1-29-140`**: direct fetch of
  `bike.marzocchi.com/products/bomber-z1` lists exactly five real SKUs
  (29"/150, 29"/160 x2 colors, 27.5"/160, 27.5"/100-DJ) — no 140mm point
  in ANY wheel size. This row's 140mm + $849 don't match any real Z1 SKU.
  Flagged for the coordinator, not changed (id/travel append-only).
- **`fk-xfusion-sweep-275-150`**: all three current Sweep Boost
  damper-tier pages (HLR/RCP/RC) confirm axle/steerer/rotor, but NONE
  list 150mm as an ITA travel step (100/120/140/160 or 120/140/160 only)
  — despite the Marin Rift Zone 1's own build sheet stating "150mm"
  verbatim. Left unverified, real discrepancy documented.
- **Fox 36/38/34 Rhythm tier** (9 rows total) — triple-confirmed via a
  fresh 3000-row CDX dump of `ridefox.com/products/*`: zero "rhythm" hits.
  Firmly OE-only, not re-attempted individually (already well documented
  by two prior sessions).
- **Fox 38/34 Performance (non-Elite) tier, OE-only** — re-confirmed via
  the same CDX dump: only "38-factory-grip-x2" and
  "38-performance-elite-grip-x2" exist for the 38; no plain "38
  performance" MTB slug (only unrelated truck-shock listings share the
  "performance" keyword). Same conclusion for the plain "34 Performance"
  at 140mm (see above) — not reattempted individually beyond what's
  logged above for time.
- **SR Suntour Aion 34 family** (3 rows) — not reattempted this session
  (prior session's wall: axle spacing genuinely unstated on any fetched
  page). Still true per the section E rotor-max harness output
  (`srsuntour-aion-34 x5 maxRotorF=160 < std 180 (verified 2/5)` — the 3
  unverified rows are these).
- **SR Suntour entry-coil forks** (XCE28/XCT30/XCM/XCE-15QR, 4 rows) —
  not reattempted (prior session's wall: no "up to Xmm compatible"
  ceiling stated on any fetched page, only a bare "postmount Xmm max").
- **Fox Podium 170/160** — not reattempted (prior session's wall: no
  wheel-size tag anywhere on the fetched product page, confirmed via
  full-page grep).
- **Fox 36 SL Performance / Performance Elite 140** — not reattempted
  (already-documented rotor-tag conflict from the prior session: both
  products tag "200/230" while the SL Factory siblings tag "180/203" for
  the identical chassis — a real, unresolved Fox-catalog inconsistency,
  not a fetch gap).
- **Fox 34 Step-Cast Performance 110/120** — no dedicated Performance-tier
  (non-Factory, non-SL) product/PN found this session either (only the
  Factory tier's product page was locatable); not reattempted beyond the
  initial CDX sweep for time.
- **`fk-fox-34-floatsc-performanceelite-29-110`** (Giant OEM trim) — not
  reattempted; low ROI (single-bike OE-only tune), already reasonably
  documented from a prior session.
- **`fk-fox-40-performance-29-203`** — confirmed via CDX that Fox sells no
  standalone "40 Performance" consumer product (only Factory and Podium
  Gold); already had a retailer source from a prior session, consistent
  with the OE-only pattern. Not reattempted further.

## Not attempted (ran out of session time)

Fox 38 Performance 275/160, 29/180, 29/160 (all three OE-only, already
well documented, low marginal value re-attempting); Fox 34 Rhythm x3 +
32 Rhythm + 38 Rhythm (Rhythm wall, see above); Fox 36 Rhythm x5 (same
wall). These are all firmly-established walls, not fetchability gaps —
a future session would need a genuinely new technique (not more CDX
sweeps) to move them.

## Gates (after every batch, cumulative through this whole session)

- `node validate.js` → **5025 parts, 0 problems (2693 verified, 2332
  unverified)** (session start after cherry-pick: 2681 verified — net
  +12 verified this session across 4 commits).
- `npx vitest run` → **688/688 passed** (one transient regression during
  batch 2 — see "Process note" above — caught and reverted before commit;
  every commit's own gate run is clean).
- `npx tsc --noEmit` → clean after every commit.
- `node tools/verdict-audit-harness.js` → 0 flags / 0 preset conflicts /
  329 clean assemble (0 errors) / 5/5 wheel-substitution / 15/15
  adversarial clashes / 2/2 compatible-partial, unchanged after every
  commit. Section E (rotor-max) shape unchanged (same 5 fork families
  still flagged, same reasons — SR Suntour Aion/Durolux/xce, DVO
  Diamond/Onyx, none touched this session).

## Commits this session (4, on `verify/fanout-1-forks-other-2`)

1. `832c918` — batch 1: Fox 34 PE/SC + 36 Factory MY27 (5 verified)
2. `07a7a05` — batch 2: Marzocchi retry + X-Fusion Slant DJ (2 verified)
3. `cb3e29c` — batch 3: SR Suntour Axon Werx + XCR34 130 (4 verified)
4. `98dca7b` — batch 4: Fox 34 Performance 130 + wall confirmations (1 verified)
