# verify-fanout-1-trek-specialized-frames — progress log

Branch: `verify/fanout-1-trek-specialized-frames`. Base: origin/main @ 5e58d25.
Scope: every unverified `cat:'frame'` row where brand is Trek (~20 rows) or
Specialized (~17 rows). Excluded: `cb-santacruz-highball-r`,
`cb-yeti-sb135-t2/t3` fills (untouched).

## Key method note (worth carrying into future waves)

specialized.com's documented 403 wall is fully beatable via `bdata scrape
"<url>" -f markdown` (Bright Data Web Unlocker) — every Specialized fetch in
this session used it, cleanly, first try.

trekbikes.com's product/frameset pages are **not** reliably beatable this
session, despite the memory note claiming a prior success:
- `bdata scrape` on trekbikes.com returns only the pre-hydration Vue shell
  (nav/footer, `class="no-js"`) — zero spec content, confirmed by dumping the
  raw HTML.
- The Exa `web_fetch_exa` connector rendered exactly **one** trekbikes.com
  page with real spec content (`slash-9-9/p/24331/`) and it reproduced
  identically on a second call — strongly suggesting Exa is serving a
  **pre-existing crawl-cache hit** from an earlier session, not a fresh live
  render. Every other trekbikes.com URL tried this session (10+ distinct
  URLs: frameset-only SKUs, other complete-bike SKUs, Marlin/Roscoe/Fuel EX
  product pages) returned only the nav shell or `CRAWL_LIVECRAWL_TIMEOUT`.
- **The unlock that actually worked for Trek**: Trek publishes real PDF
  **service manuals** and **FAQ documents** on its own CDN
  (`media.trekbikes.com` and `retailerassetsprd.blob.core.windows.net`) —
  these are plain static PDFs, not JS-rendered, and are NOT behind the
  product-page wall. `bdata search "<model> service manual filetype:pdf"`
  reliably surfaces them; `curl` + `pdftotext -layout` extracts the spec
  tables. **Caveat**: several of these PDFs extract with columns/rows
  shifted by `pdftotext -layout` (two side-by-side tables get merged) — cross
  check any surprising number against a rendered page image
  (`pdftoppm -png -r 150 -f N -l N file.pdf out`) before trusting it. This
  caught what would have been a wrong "72.5mm eye-to-eye" reading on the
  Session shock table (real value: 250mm eye / 72.5mm stroke) and a wrong
  fork-travel row-order reading on the Roscoe table.
- One Trek FAQ page (`/FAQ/roscoe-gen4/`) fetched cleanly via Exa with real
  content — FAQ pages may render more reliably than product/frameset pages,
  worth trying first for future Trek rows.

## Specialized — 17/17 verified (complete)

All directly fetched via `bdata scrape` against specialized.com. New
`verified:true` + `lastChecked:2026-07-17` + real `source` URL on every row:

| id | correction |
|---|---|
| `fr-specialized-enduro-sworks` | price 3000→2999.99, weight 3300→3820 (real frame wt) |
| `fr-specialized-status-2-170` | price 2200→1599.99, weight 3800→4770, frameOnly false→true |
| `fr-specialized-demo-race` | price 3500→2999.99, weight 4000→5460, frameOnly false→true |
| `fr-specialized-stumpjumper-15-alloy` | price 2199→2099.99, weight 3400→4310, frameOnly→true |
| `fr-specialized-fuse-29` | price 1200→1000, frameOnly→true, modelYear 2024→2022 (real page's own year) |
| `fr-specialized-epic-8` | price 6200→5999.99, frameOnly→true (only sold as S-Works) |
| `fr-specialized-p3` | price 700→699.99 (MSRP not sale), weight 2300→2060 |
| `fr-specialized-stumpjumper-15` | price 4200→3599.99, weight 3200→2840, frameOnly→true |
| `fr-specialized-chisel` | price 1250→1099.99, weight 1350→1950, frameOnly→true (source corrected to the *hardtail* frameset page — the generic "Chisel Frameset" page is actually the full-suspension EVO) |
| `fr-specialized-chisel-evo` | price 1800→1799.99, weight 2450→2720, frameOnly→true |
| `fr-specialized-stumpjumper-15-evo-alloy` | price 2399→2099.99, weight 3450→4460, frameOnly→true |
| `fr-specialized-stumpjumper-15-evo-carbon` | price 3299→3599.99, weight 3100→2900, frameOnly→true |
| `fr-specialized-epic-world-cup` | price 4500→5999.99, frameOnly→true |
| `fr-specialized-stumpjumper-evo` | **udh true→false** (see below), price 2800→3399.99, weight 3200→3320, frameOnly→true |
| `fr-specialized-epic-8-evo` | price 3200→2999.99, weight 2050→2210, frameOnly→true |
| `fr-specialized-status-2-140` | no field changes — confirmed independently (not carried over from the 170 sibling as before); price/weight stay sample (maker sells this travel tier as completes only) |
| `fr-specialized-rockhopper` | modelYear 2026→2025 (no 2026 refresh found), no other changes |

### Corrections without full verification / flagged contradictions (Specialized)

- **`fr-specialized-stumpjumper-evo` udh true→false** — real correction. Two
  independent specialized.com frameset pages (US `p/199754` + AU `p/224675`,
  the latter explicitly titled "2024 S-Works Stumpjumper EVO Frameset") both
  state plainly *"replaceable derailleur hanger"* with zero UDH language,
  contradicting the prior entry's inference from a Vital-sourced Transmission
  complete-bike build. No completebike currently fills this frame, so no
  existing verdict changed.
- **Two dependent completebike prices adjusted** (not verified rows, flagged
  as placeholders): `cb-specialized-chisel-shimano` (2600→2520) and
  `cb-specialized-stumpjumper-15-sworks` (12000→11480) — both tripped the
  bundle-price-vs-parts-sum lint after their frame's price came down from a
  verified fetch. Real complete-bike MSRPs were found via search (Chisel
  Shimano: $2,599.99 confirmed on specialized.com; Stumpjumper 15 S-Works:
  ~£7,999-10,000 UK, currency conversion too approximate to pin USD) — both
  flagged in their own `desc` for a full component re-price pass.

## Trek — 15/20 verified, 1 skipped (generation trap), 4 walled

| id | outcome |
|---|---|
| `fr-trek-slash-c-gen6` / `-al-gen6` / `-alloy-gen6` | verified via the "Slash Alloy and Carbon — Gen 6" service manual PDF. `-alloy-gen6`: maxRotorR corrected 203→220 (was reading a specific build's smaller stock rotor as the frame max) |
| `fr-trek-fuel-ex-c-gen6` / `-al-gen6` | verified via the 2023 Fuel EX service manual PDF. **maxRotorR corrected 220→203 on both** (prior was an unsourced sample that overstated the true max) |
| `fr-trek-session-8-29` / `-c-29` | verified via the 2022 Session service manual PDF. **udh corrected false→true on both** (manual states plainly "designed to use a Universal Derailleur Hanger (UDH)") |
| `fr-trek-roscoe-gen3` | verified via the 2022 Roscoe service manual PDF. **udh corrected false→true** (same UDH statement) |
| `fr-trek-marlin-7/-4/-5/-6-gen3` | verified via the "2023 Marlin 6, 7, 8" service manual PDF (2023-dated but content matches the Gen 3 spec with zero contradiction — Marlin platform is long-lived). BSA73/31.6mm/180mm-rotor/straight-steerer all confirmed. **Deliberately did NOT bump maxForkTravel 100→120** despite the manual's stated 120mm ceiling — that figure requires an aftermarket headset-kit swap this schema has no field to model; kept the conservative stock figure |
| `fr-trek-top-fuel-gen4` | verified via Trek's own "Top Fuel — Gen 4" service manual PDF. **maxRotorR corrected 180→203**. Manual covers Carbon+Alloy jointly, resolving the prior flag on the (uncataloged) alloy sibling's BB standard — flagged as a DATA-ENTRY opportunity, out of scope here |
| `fr-trek-supercaliber-slr-gen2` | verified via the "2024 Supercaliber SL and SLR" service manual PDF. No corrections; captured opportunistic `maxTire:2.4` and a genuine maker-published `minForkTravel:100` (new field) |
| `fr-trek-full-stache-8` | verified via Trek's own "MY19 and newer Stache FAQ" PDF. **maxRotorR corrected 180→203** |
| `fr-trek-slash` | **SKIPPED — generation-ambiguity trap, do not touch without a follow-up session.** The exact URL Exa cache-served (`slash-9-9/p/24331/`) is confirmed to be an OLDER pre-Gen-6 Slash platform: 150mm rear (ABP linkage, not high-pivot), PF92 BB (not BSA73), RockShox Deluxe RT3 230×57.5mm std shock (not 230×65) — directly contradicting this row's current spec (170mm high-pivot, BSA73, 230×65, mullet, 190mm max fork), which was sourced from a Bikerumor "2024 high-pivot Slash launch" article. Both cannot be the same product. Left completely untouched pending a session that can pin down which generation "Trek Slash 9.9" (no Gen-6 suffix) actually refers to on trekbikes.com today. |
| `fr-trek-remedy-al`, `fr-trek-remedy-c`, `fr-trek-xcaliber-8`, `fr-trek-roscoe-gen4` | **WALLED — no service manual/FAQ PDF found this session** despite targeted searches (`site:media.trekbikes.com Remedy/XCaliber ServiceManual`, `filetype:pdf`, FAQ-pattern guesses). trekbikes.com's product pages didn't render via Exa or bdata for any of these four. Left untouched (still `UNVERIFIED sample`, unchanged). `fr-trek-roscoe-gen4`'s own FAQ page (`/FAQ/roscoe-gen4/`) DID fetch cleanly via Exa but contains no interface numbers (BB/axle/rotor) — only geometry-philosophy Q&A, confirming `maxForkTravel:150` and `wheelConfigs` narratively but not to THE BAR's fetched-manufacturer-confirms-interfaces standard. |

### Duplicate-row flag (Trek)

**`fr-trek-slash-alloy-gen6` and `fr-trek-slash-al-gen6` appear to be
duplicate rows for the same physical product** (Trek's one alloy Slash Gen 6
chassis) — one was entered from the real "Slash AL Gen 6 Frameset" SKU page,
the other from a "Trek Slash 8 Gen 6" complete-bike spec guide. Both are now
independently verified and internally consistent with each other (after
correcting `-alloy-gen6`'s rotor max), but this is a genuine catalog
duplicate. **Not merged/deleted** — ids are append-only and a merge decision
is out of this task's scope. Flagged for a coordinator-level dedup pass.

## Gates

Every commit in this branch passed, at the time of commit:
- `node validate.js` → 0 problems (part count grew from ~4966 baseline
  parts unaffected; verified count climbed batch by batch, ending at 2958
  verified / 2068 unverified out of 5026 parts)
- `npx vitest run` → 699/699 passing throughout (baseline unchanged, no test
  touched)
- `npx tsc --noEmit` → clean throughout
- `node tools/verdict-audit-harness.js` → 0 flags in every section every
  time (A/B/C/D/D2 all clean; section E's 5 fork-family findings are
  pre-existing and untouched by this branch)

## New vocab / schema

None. No new `VOCAB` or `schema.js` values were needed this session — every
real value found (BSA73/83, PF92, Boost148, SuperBoost157, tapered,
straight, straight-dc, 135x5-qr) already existed in the vocabulary.

## Commits (chronological)

1. `verify(frames): Specialized batch 1` — 7 verified (enduro-sworks,
   status-2-170, demo-race, stumpjumper-15-alloy, fuse-29, epic-8, p3)
2. `verify(frames): Specialized batch 2` — 6 verified (stumpjumper-15,
   chisel, chisel-evo, stumpjumper-15-evo-alloy/-carbon, epic-world-cup)
3. `verify(frames): Specialized batch 3` — 4 verified + 1 udh correction
   (stumpjumper-evo, epic-8-evo, status-2-140, rockhopper) — **completes
   Specialized**
4. `verify(frames): Trek batch 1` — 6 verified + 2 udh corrections (Slash
   Gen6 ×3, Session ×2, Roscoe Gen3) via service manual PDFs
5. `verify(frames): Trek batch 2` — 2 verified + 1 rotor-max correction
   (Fuel EX Gen6 ×2)
6. `verify(frames): Trek batch 3` — 4 verified (Marlin Gen3 ladder)
7. `verify(frames): Trek batch 4` — 2 verified + 1 rotor-max correction (Top
   Fuel Gen4, Supercaliber SLR Gen2)
8. `verify(frames): Trek batch 5` — 1 verified + 1 rotor-max correction
   (Full Stache 8)
