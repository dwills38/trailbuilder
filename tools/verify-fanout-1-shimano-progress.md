# verify-fanout-1-shimano — progress log

Branch: `verify/fanout-1-shimano` (based on origin/main @ a0a4c99). Scope: every
unverified Shimano row in `src/compat.js`, all categories.

Baseline: 2675 verified / 5025 parts. Starting Shimano-brand unverified count: 95
(95 unverified brake/rotor/bb/crankset/shifter/derailleur/cassette/chain/wheel/
pedal/preset rows).

## Key sources discovered this session

- **productinfo.shimano.com archive PDF** (2023-2024 MTB Spec Handbook):
  `https://productinfo.shimano.com/pdfs/product/archive/2023-2024_Specifications_v028_en.pdf`
  — 308 pages, `pdftotext -layout` column-mangles the wide spec tables badly
  (confirmed the prior session's finding) but `pdftoppm -r 200` rasterization +
  visual read works cleanly. Contains full BB (p.68-69), Crankset (p.57-60+),
  Disc Brake Rotor (p.248-249), Brake Lever (p.21-24), and Brake Caliper
  (p.49-52) tables with per-model interfaces AND, for the mid/upper tiers,
  **maker-published average weight** (both caliper-only and "kit for front
  800mm w/ pad, w/o adapter, w/ 2 screws" — used the kit figure as the
  catalog's per-brake-SKU weight).
- **productinfo.shimano.com "latest" edition** (current, Ver 2.4, Jun 30 2026):
  `https://productinfo.shimano.com/pdfs/product/latest/Specifications_en.pdf`
  — already cited by an earlier session (bk-shimano-xt-m8100 commit). Covers
  newer models the 2023-24 archive doesn't (BR-M8220, BR-MT600, BR-M9200/9220/
  8200/6200 families). Brake tables p.33-37.
- bike.shimano.com: still fully 403-blocked from this environment (confirmed
  fresh, matches every prior session's finding). productinfo.shimano.com's own
  `/en/product/<sku>` pages are JS-rendered Next.js 404 shells when curled
  directly — not usable without the PDF route.

## Verified this session (bar fully met: interface + maker/measured weight)

| id | field corrected | source |
|---|---|---|
| bb-shimano-mt801-bsa73 | weight already matched (84g) | 2023-24 handbook p.68 |
| bb-shimano-smbb71-pf92-24mm | weight 72->71 | 2023-24 handbook p.68 |
| ro-shimano-rt86-203-6b | weight already matched (187g) | 2023-24 handbook p.248 |
| bk-shimano-xtr-m9120 | weight 270->262 (kit) | 2023-24 handbook p.248-249* |
| bk-shimano-xtr-m9110-fm | weight 220->203 (kit) | 2023-24 handbook p.248-249* |
| bk-shimano-xt-m8220 | weight 290->310 (kit) | latest handbook p.33 |

(*brake caliper tables are on p.49-52 of the archive PDF, not the rotor pages —
corrected page cite in the commit message vs above; see compat.js desc text
for the exact page number per row.)

## Corrected but stay UNVERIFIED (interface fetch-confirmed; Shimano publishes
no weight for this tier, no reputable *measured* source found — bb/brake/rotor
are not in VERIFY-PROTOCOL's nominal-weight-exception list, so no weight =
no verified badge, per THE BAR)

bb-shimano-mt501-bsa73, bb-shimano-mt501-bsa68, bb-shimano-smbb52-bsa73-24mm,
ro-shimano-rt66-180-6b, ro-shimano-rt66-203-6b, ro-shimano-rt66-160-6b,
ro-shimano-rt26-180-6b, ro-shimano-rt26-160-6b, ro-shimano-rt10-180-cl,
ro-shimano-rt10-160-cl, bk-shimano-mt410, bk-shimano-mt420, bk-shimano-mt400,
bk-shimano-mt200, bk-shimano-m6120, bk-shimano-mt600.

## Data-quality flags for the coordinator (NOT resolved this session — out of
verification scope, needs a data-entry/consolidation decision)

Confirmed via BOTH fetched Shimano handbooks (2023-24 archive AND 2026
latest) that **BR-MT201, BR-MT401, BR-MT501 do not exist as caliper model
numbers** — those are the corresponding **BL-*** lever model numbers
(BL-MT201, BL-MT401, BL-MT501), each paired with a same-tier caliper that
already has its own catalog row:

- `bk-shimano-mt201` (2-pist PM) -> real caliper is **BR-MT200** -> likely a
  DUPLICATE of `bk-shimano-mt200`. model/mfgPn corrected in place; NOT merged
  (id is append-only, and merging/removing is a data-entry decision, not a
  verification one). Flagged in the row's desc.
- `bk-shimano-mt401` (2-pist PM) -> BL-MT401 pairs with BOTH BR-MT410 (2-pist)
  and BR-MT420 (4-pist); since this row is 2-piston it maps to **BR-MT410**
  -> likely a DUPLICATE of `bk-shimano-mt410`. Corrected + flagged.
- `bk-shimano-mt501` (2-pist PM) -> real caliper is **BR-MT500**. No existing
  `bk-shimano-mt500` row exists, so this is NOT a duplicate — just corrected
  model/mfgPn in place (still unverified, weight unpublished).

Recommend a follow-up chip: decide whether to retire mt201/mt401 into
ALIASES pointing at mt200/mt410 (checking build-fill references first).

## Gates after this batch (BB + rotor + brake, commit b322c1b)

- `node validate.js`: 2681 verified / 5025 parts, 0 problems (was 2675).
- `npx vitest run`: 688/688 passed (baseline 688, unchanged).
- `npx tsc --noEmit`: clean.
- `node tools/verdict-audit-harness.js`: A=0, B=0, C=329 clean/0 errors,
  C2=5/5, D=15/15, D2=2/2. Section E (rotor-max false-warn report) shows 5
  PRE-EXISTING fork families (dvo-diamond-d1sl, dvo-onyx-sc, srsuntour-aion-34,
  srsuntour-durolux, srsuntour-xce) — unrelated to this session's Shimano-only
  changes, not introduced by this batch.

## Next up (not yet done)

crankset (12), shifter (8), derailleur (7), cassette (6), chain (1),
frontwheel/rearwheel/wheelset (19), pedal (2), groupset/brakeset (15 presets).
