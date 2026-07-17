# verify-fanout-1-final-push — progress log

Branch: `verify/fanout-1-final-push`. Mop-up pass on three smaller remainder
pools per the fanout-1 final-push brief. Baseline (fresh `origin/main` at
session start, commit `c395cb1`): `node validate.js` → 5026 parts, 2957
verified / 2069 unverified (58.83%); `npx vitest run` → 700/700.

## Result summary

**No rows were newly promoted to `verified:true` this session.** All three
pools were re-investigated in depth and every remaining row hit a genuine
THE BAR wall (documented per-row below) — mostly missing per-SKU weight
(tires/droppers) or an unconfirmable interface field (fork brake mount).
One real, valuable outcome: **10 DVO Sapphire fork rows got corrections
without verification** — re-sourced from DVO's own (now-dead, Wayback-archived)
product pages instead of the prior vitalmtb.com retailer basis, fixing a
weight discrepancy and upgrading the source citation, but still blocked from
`verified:true` by one unconfirmable field (brake mount/rotor size — DVO's
own page never states it for this chassis).

Verified count is unchanged: **2957/5026 (58.83%)** — the 60% target
(3016 rows) was not reached this pass. See "Walls hit" for why, and
"Recommendation" for what would actually move this number.

## Pool 1 — Schwalbe tires (14 unverified rows, 0 promoted)

Technique from the brief (schwalbetires.com `/<Model>-<article#>` SKU pages)
was re-applied to every row. Result: **every fetchable SKU page in this
batch states no weight** (unlike the handful of Big Betty/Magic Mary SDH/ST
SKUs a prior session found weight on). Specifically fetched/re-fetched this
session (all confirmed real ETRTO/casing/compound, all confirmed NO weight
field on the page):

- `Racing-Ray-11601100.01` (57-622, Folding, ADDIX SpeedGrip) — no weight
- `Racing-Ralph-11654029.01` (60-622, Folding, ADDIX Speed) — no weight
- `Hans-Dampf-11601108.01` (60-622, Folding, ADDIX Soft) — no weight
- `Nobby-Nic-11654145.01` (62-622, Folding, ADDIX Soft) — no weight
- `Nobby-Nic-11654143.01` (62-622, Folding, ADDIX SpeedGrip) — no weight
- `Racing-Ray-11654028.01` (60-622, Folding, ADDIX SpeedGrip) — no weight
- `Dirty-Dan-11654177`, `Rock-Razor-11601013.01` — re-confirmed prior
  session's finding (no weight), no new information.
- `Magic-Mary-Radial-11654597` / `Magic-Mary-Radial-11654599` (the Trail
  Pro Ultra Soft 29x2.5 / Gravity Pro Soft 27.5x2.5 SKUs) — **still 404**
  even via `bdata scrape` (Bright Data's unlocker gets the same live
  "404 Error" page DVO/Schwalbe itself serves — this is a genuinely dead
  URL, not a fetch-tool limitation). Tried the `GRAVITY-PRO-`/`TRAIL-PRO-`
  prefixed slug variant (works for other SKUs, e.g. `TRAIL-PRO-Magic-Mary-
  11600616.04`, `GRAVITY-PRO-Magic-Mary-Radial-11654684`) but neither
  matches this row's exact width+compound; the site's live "Magic Mary
  Radial" category table is JS-rendered (no static per-SKU links exposed,
  confirmed via raw HTML fetch — no `articleNumber` JSON embedded).
- `Table-Top` (DJ tire) — no live schwalbetires.com page found under any
  slug variant (search returns only retailer listings); likely fully
  retired from Schwalbe's own site.
- `magicmary-29-24`/`bigbetty-29-24` (Performance/OE tier) — Schwalbe's
  budget OE tier has no schwalbetires.com consumer SKU page at all
  (confirmed again this session); no maker source exists for this tier.

**Conclusion: Schwalbe pool is a genuine wall this pass** — none of the 14
rows could clear THE BAR's real-weight requirement for tires (no
nominal-weight exception exists for tires, unlike shocks/wheels/forks).
No catalog edits made to this pool (existing unverified rows' data/desc
were already accurate; re-confirming a negative isn't a correction).

**Flag for the coordinator (pre-existing, not touched):** `ti-schwalbe-
racing-ralph-29-225-sg-as` and several other **already-`verified:true`**
Schwalbe rows in the catalog carry `weight` explicitly marked in their own
`desc` as a same-family SAMPLE ("Weight is a same-family sample (page lists
no weight)") — i.e. verified without a real per-SKU weight. That appears to
predate this session and contradicts the tire weight bar as stated in this
task's brief and in DATA-ENTRY-TEMPLATE.md §5 ("Tires: per-SKU published
weight only"). Not touched (out of this session's scope, and touching an
already-verified row without instruction risks silently overwriting prior
work) — flagging for a coordinator decision on whether to demote or
grandfather.

## Pool 2 — TranzX droppers (12 unverified rows, 0 promoted)

Re-checked na.tranzx.com and tranzx.com (the Taiwan HQ site, `tranzx.com/
product/10dropperpost/*.html` — same host a prior session used) for every
remaining OE-only model code. Findings:

- `tranzx.com/product_10_dropper_post.html` lists the FULL current product
  index: only `ysp01v, ysp07, ysp12, ysp15, ysp16j, ysp18p, ysp19, ysp20j,
  ysp22, ysp29, ysp36, ysp38j, ysp39j`. None of this pool's model codes
  (`YSI34`, `YSI60QL`, `JD-YSI05J`, `+Rad`, `YSI-05 +RAD`, `SLR LE`,
  `YSP23JL`) appear in that index — confirming (again) that these are
  OEM-only names TranzX doesn't sell/spec under its own consumer site,
  exactly as each row's existing `desc` already documented.
- The one near-match, `dp-tranzx-jdysp39kl-349-170` (JD-YSP39KL, 34.9/170),
  DOES correspond to a real current product page: `tranzx.com/product/
  10dropperpost/ysp39j.html` (JD-YSP39J). Fetched directly: confirms
  33.9/34.9mm OD and travel options 100/125/150/170mm (170mm at length
  496mm) exist as a real SKU family — but the page's ONLY weight data is
  per-**length**, not per-travel-point-of-interest: "650g/33.9×456mm" and
  "685g/34.9×456mm", where 456mm = the **150mm**-travel length, not the
  496mm/**170mm** length this catalog row models. No weight is published
  for the 496mm/170mm cell specifically. Left unverified (real weight bar
  not met for the exact travel point); no catalog edit made (the existing
  diameter/travel value is already correct per this page, no correction
  needed).
- All remaining rows (`Reverse` ×2, `YSI34` ×2/×3 incl. `JD-YSI34`,
  `YSI60QL`, `JD-YSI05J`, `+Rad`, `YSI-05 +RAD`, `SLR LE`, `YSP23JL`)
  confirmed to have no na.tranzx.com/tranzx.com product page under any
  name tried — matching each row's own pre-existing desc.

**Conclusion: TranzX pool is a genuine wall this pass.** No catalog edits.

## Pool 3 — DVO forks (15 unverified rows, 0 promoted, 10 corrected)

Current unverified DVO fork rows are exactly `dvo-diamond-boost` (4 rows)
and `dvo-sapphire-32`/`dvo-sapphire-34`/`dvo-sapphire-26` (11 rows) — the
`dvo-diamond-d1sl`/`dvo-onyx-*` rows the prior `suspension-small` session
flagged as steerer-blocked are now ALL `verified:true` in the catalog
(resolved by a later wave, not this session — confirmed via `node -e`
inspection at session start, not re-litigated).

### New angle that worked: Wayback CDX search for DVO's OWN dead product pages

The live dvosuspension.com no longer serves spec tables for Sapphire 32/34
(confirmed re-fetched 2026-07-17 — the page loads but shows only a "no item
in cart" widget, no spec content). Used the Wayback CDX API
(`web.archive.org/cdx/search/cdx?url=dvosuspension.com/fork/sapphire-32*`)
to find archived captures of DVO's own marketing/spec pages (not the
`/product/` store pages, which the prior session already tried and found
spec-free) — `bdata scrape` on the Wayback URLs renders them cleanly.

**Found and fetched, DVO's own page, 2019-05-05 capture:**
`dvosuspension.com/fork/sapphire-32/` states: Travel 100-140mm (matches
catalog), Stanchions 32mm, Wheel 29/27.5, Axle 15x110mm QR, **Weight: 1880
grams** (one flat figure — catalog had it split 1870g/1905g by wheel size,
sourced from vitalmtb.com), Steerer Options: Tapered Alloy (confirms the
existing `tapered` value), Crown offset 27.5=44mm/29=51mm (not a tracked
field). **Does NOT state a brake mount type or rotor size anywhere**
("Lowers: Magnesium, Disc Only" is the only brake-adjacent text).

**Found and fetched, DVO's own page, 2019-01-22 capture:**
`dvosuspension.com/fork/sapphire-d1/` (branded "Sapphire 34 D1" — this
catalog's `dvo-sapphire-34` family) states: Travel 27.5=130-150mm /
29=120-140mm (matches catalog exactly), Stanchions 34mm Tapered Alloy,
Crown 27.5=42mm/29=44mm offset, Axle 15x110mm, Weight 1900 grams (matches
catalog exactly, no change), Steerer Options: Tapered Alloy. Same gap:
**no brake mount / rotor size stated.**

### Corrections applied (all 10 Sapphire rows, still unverified)

- `fk-dvo-sapphire-32-*` (4 rows): weight corrected 1870/1905 → **1880g**
  (the manufacturer's single stated figure, replacing the prior vitalmtb
  per-wheel-size split); `source` upgraded from the vitalmtb.com retailer
  guide to the DVO-archived page; `lastChecked` bumped to 2026-07-17;
  `desc` rewritten to document the correction and the remaining gap.
- `fk-dvo-sapphire-34-*` (6 rows): weight unchanged (1900g already matched
  the manufacturer figure exactly); `source`/`lastChecked`/`desc` upgraded
  the same way.
- `brakeMount:'PM'`/`maxRotorF:180`/`minRotorF:160` **left unchanged** on
  all 10 rows (still the vitalmtb-sourced/inferred values) — **this is
  the one remaining gap blocking `verified:true`** per bar item 1
  ("interfaces are ALWAYS manufacturer-sourced, no exceptions"), even
  though every other DVO fork family already verified in this catalog
  (`dvo-onyx-sc`, `dvo-diamond-d1sl`, `dvo-onyx-d1-38`, `dvo-onyx-dc`) is
  also PM — a very strong same-brand convention, but not this-chassis
  manufacturer confirmation, so not promoted on that inference alone.

### Confirmed still-dead ends (no new information, not re-edited)

- **Diamond Boost (4 rows):** Wayback CDX for `dvosuspension.com/fork/
  diamond-boost-d1` returns only a single `301` redirect capture, never a
  `200` with real content — DVO's own site never hosted a live spec page
  under this name at any point in its crawl history. Consistent with the
  prior session's finding that "Diamond Boost" is an OEM-only badge name,
  sourced only from vitalmtb reviews. Left unverified, no edit.
- **Sapphire 26 (1 row, DJ-listed 100mm):** No `sapphire*26*` or `fork/
  sapphire` archive entry of any kind pre-dates the D1 generation — this
  very old (pre-2016) 26in chassis appears to have no crawled DVO page at
  all. Left unverified, no edit (already flagged in-row as an open
  DIRT-JUMP-MODEL.md question, not re-litigated).

## Gates (this session, single batch)

- `node validate.js`: **0 problems**, 2957 verified / 2069 unverified
  (unchanged from baseline — no new `verified:true` rows this pass).
- `npx vitest run`: **700/700 passed** (matches stated baseline exactly;
  no test added, removed, or weakened).
- `npx tsc --noEmit`: clean, no output.
- `node tools/verdict-audit-harness.js`: A 0 flags / B 0 preset conflicts /
  C 329 clean, 0 errors / C2 5/5 / D 15/15 / D2 2/2 — identical shape to a
  clean baseline run. Section E (rotor-max informational, pre-existing)
  unrelated to any row touched this session (no DVO family newly crossed
  into Section E; the two DVO families already listed there — `dvo-
  diamond-d1sl`/`dvo-onyx-sc` — were untouched, and Sapphire never appears
  in Section E since it isn't `verified:true`).

## New vocab

None needed.

## Overall verified ratio

**2957/5026 = 58.83%** (unchanged from session start; the 60%/3016 target
was not reached this pass — see Recommendation below).

## Recommendation for the next session

All three assigned pools are genuinely exhausted for THIS session's method
(re-verified, no false negatives found). To close the remaining ~59-row gap
to 60%, the next session should NOT re-attempt Schwalbe/TranzX/DVO-Sapphire
without a materially different angle (e.g. a Schwalbe PDF spec sheet if one
exists, or contacting a different Schwalbe distributor site with per-SKU
weight tables) — instead it should open a NEW smaller-brand pool the
2026-07-17 fork/wheel/shock nominal-weight exceptions haven't been swept
against yet, or revisit the flagged pre-existing-verified-without-real-
weight Schwalbe rows noted above (a coordinator policy decision, not a
re-verification task).

## Rows explicitly NOT touched (per brief exclusions)

`cb-santacruz-highball-r`, `cb-yeti-sb135-t2`/`t3` fills,
`tools/verification-job.json`, `fr-santacruz-megatower-cc`,
`test/test-golden.js`.
