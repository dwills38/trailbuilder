# DUP / ID / BROKEN-REF AUDIT — 2026-07-09

**Scope:** read-only audit of `src/compat.js` `PARTS` (1775 rows, 695 verified / 1080
unverified) for the three risks that a fast, many-parallel-session catalog expansion
tends to introduce: (1) duplicate / near-duplicate parts, (2) id-convention violations
vs [`tools/DATA-ENTRY-TEMPLATE.md`](DATA-ENTRY-TEMPLATE.md) §2, (3) broken references
(preset `fills`, golden builds, demo builds, `ALIASES`, `bundledShock`/`forFrames`/
`supersededBy`).

**This audit changed no catalog data** — it is a report only. Gates were green before and
after (see [Gate status](#gate-status)).

---

## TL;DR — the catalog is clean on all three dimensions

| Issue type | Count | Severity |
|---|---:|---|
| **Duplicates** — literal duplicate ids | **0** | — |
| **Duplicates** — exact spec+price+weight dup (distinct ids) | **0** | — |
| **Duplicates** — same product, price/weight-only diff | **0** | — |
| **Duplicates** — same fills preset dup | **0** | — |
| **ID convention** — wrong prefix for category | **0** | — |
| **ID convention** — id brand token ≠ brand slug | **0** | — |
| **ID convention** — charset / too-few-tokens | **0** | — |
| **ID convention** — `family` brand-prefix mismatch | **0** | — |
| **ID convention** — variant-token gap (wheel/travel/width/dia/drop/eye×stroke) | **0** | — |
| **Broken ref** — preset `fills` → missing id (392 checked) | **0** | — |
| **Broken ref** — golden-build id → missing (130 checked) | **0** | — |
| **Broken ref** — demo-build id → missing (118 checked) | **0** | — |
| **Broken ref** — `ALIASES` target not a live id (356 checked) | **0** | — |
| **Broken ref** — `bundledShock` / `forFrames` / `supersededBy` | **0** | — |
| **Observations** (not errors — see below) | **2** | INFO / LOW |

**No fixes are required.** The premise ("likely accidental duplicates and id slips") did
**not** hold — the existing guardrails (see [Why it's clean](#why-the-catalog-is-clean))
absorbed the growth. The only two items below are informational, not defects to merge or
rename.

---

## Methodology (so the zeros are credible, not vacuous)

An analysis harness `require()`d `src/compat.js` + `src/schema.js` and computed:

- **Spec signatures per row**, excluding metadata/descriptive/provenance fields (`id`,
  `desc`, `source`, `weightSource`, `archiveUrl`, `lastChecked`, `verified`, `sourceType`,
  `mfgPn`, `status`, `supersededBy`, `image`, `colors`, `family`, `gen`, `modelYear`,
  `disciplines`, `oemOnly`, `forFrames`). Two ids collapsing to one signature = duplicate
  candidate. Run **with** price+weight (exact dup) and **without** (same-product /
  price-or-weight-only-diff). A third pass excluded `model` too, to catch the same real SKU
  entered under two different model strings.
- **Reference resolution** via `canonicalId()` — a ref is valid if it is a live id *or*
  resolves through `ALIASES` to one. Applied to every preset `fills` value, every id-shaped
  quoted literal in `test/test-golden.js` and `index.html`, every `ALIASES` target, and the
  `bundledShock` / `forFrames` / `supersededBy` fields.
- **ID-convention checks** replicating the validator + lint rules independently (prefix vs
  `ID_PREFIX[cat]`, `idToks[1] === brandSlug(brand)`, charset, ≥3 tokens, family
  brand-prefix) **plus** a variant-token presence check the validator does *not* do: for
  fork/tire/dropper/rotor/shock/wheel, the deterministically-encoded numeric tokens (wheel
  size, travel, width `2.5→25`, diameter `31.6→316`, drop, eye×stroke `62.5→62p5`) must
  appear in the id.

**Harness self-test:** injecting a synthetic exact-dup and a price-only-dup row made the
Tier-1 and Tier-2 detectors fire as expected — so the zero findings are a real property of
the catalog, not a broken detector. **Coverage was non-trivial:** 392 preset-fill refs,
130 golden-build refs, 118 demo-build refs, 356 alias targets, 55 same-brand+model variant
groups all examined.

---

## 1. Duplicates — none

No two ids share an identical spec signature (with or without price/weight), and no preset
shares identical `fills`. The 55 groups of rows sharing `cat + brand + normalized(model)`
are all **legitimate variants** — overwhelmingly droppers split correctly by
`diameter × drop` (the template's mandated split), e.g. the 18 `dp-oneup-v3-*` /
`dp-fox-transfer-*` / `dp-rockshox-reverb-axs-b1-*` rows.

### INFO — 5 pairs of *distinct* products that are fit-identical (expected, not dups)

The "exclude model" pass surfaced 5 pairs that share identical fit specs **and** identical
price+weight but are genuinely different products. This is inherent to the data model: the
engine intentionally can't distinguish a tire's tread pattern, a grip, or a crank's
cosmetics — parts with the same engine-read fields dot the same. **None are duplicates to
merge.** Three of the five are *verified against distinct manufacturer sources*, so the
identical numbers are correctly sourced, not copy-paste:

| Pair | Same numbers | Status |
|---|---|---|
| `ti-continental-kryptotal-fr-29-24-enduro-soft` / `ti-continental-argotal-29-24-enduro-soft` | $80 / 1165 g | ✅ both verified, same Conti Tire-Range PDF — different treads, same published casing weight |
| `cr-truvativ-descendant-carbon` / `cr-truvativ-stylo-carbon` | $310 / 555 g | ✅ both verified, distinct sram.com model pages |
| `gr-chromag-basis` / `gr-chromag-palmskin` | $42 / 104 g | ✅ both verified, distinct chromagbikes.com pages |
| `ti-continental-xynotal-29-24-trail-endurance` / `ti-continental-kryptotal-fr-29-24-trail-endurance` | $82.95 / 1040 g | sample (retailer source) — different treads |
| `fk-xfusion-trace-36-hlr-29-140` / `fk-xfusion-slide-boost-hlr-29-140` | $899 / 2000 g | sample — **different real forks** (Trace 36 vs Slide chassis, distinct product pages); the round $899/2000 g look like placeholder sample numbers on both |

**Recommendation (LOW):** the two *sample* pairs (X-Fusion forks; Conti Xynotal/Kryptotal
Trail) carry byte-identical placeholder-ish price+weight — the verify grind should pin each
independently so two different products don't keep identical made-up numbers. No id/merge
action.

---

## 2. ID-convention violations — none

Every id passes prefix, brand-slug, charset, token-count, `family` brand-prefix, and the
variant-token presence check. (The validator + `lintCatalog` already enforce the first
five and reported 0 warnings; this audit re-derived them independently and added the
variant-token check, also 0.)

### INFO — undocumented Maxxis compound token `mtb` (doc gap, not an error)

The catalog distinguishes bare single-compound MaxxTerra (`compound:'maxxterra'`) from
3C MaxxTerra (`compound:'3c-maxxterra'`) using the id token **`mtb`** for the former and
`mt` for the latter — applied **consistently** across the two bare rows
`ti-maxxis-forekaster-275-24-exo-mtb` and `ti-maxxis-forekaster-29-24-exo-mtb`. This is
correct, non-duplicate data (distinct SKUs, distinct `mfgPn`/weight), but the `mtb` token
is **not listed** in [`DATA-ENTRY-TEMPLATE.md`](DATA-ENTRY-TEMPLATE.md) §2 (which documents
only `mg`/`mt`/`dd` for Maxxis) and reads confusingly like "mtb = mountain bike."

**Recommendation (LOW):** add the `maxxterra` (bare) → `mtb` mapping to the template's
Maxxis compound legend so future entries stay consistent, or pick a clearer token before
the abbreviation spreads. Documentation-only; no data change needed now.

---

## 3. Broken references — none

Every referenced id resolves to a live part (directly or through `ALIASES`):

- **Preset `fills`:** 392 refs across all `groupset`/`wheelset`/`brakeset`/`cockpitset`
  presets — all live. *(Note: the validator's bundle-price lint silently skips a fill it
  can't find, so a dangling fill would NOT fail `node validate.js` — this audit checked
  them explicitly and found none.)*
- **Golden builds** (`test/test-golden.js`): 130 id literals — all live. (These are also
  exercised by the test suite, which passes.)
- **Demo builds** (`index.html`): 118 id literals — all live.
- **`ALIASES`:** 356 entries — every target is a live id; no alias key shadows a live id;
  no alias points at another alias (no chains).
- **`bundledShock`** (frames), **`forFrames`** (OEM shocks, 1 ref), **`supersededBy`**
  (4 refs) — all resolve.

---

## Why the catalog is clean

The negative result is a credit to the existing machinery, which has been running on every
commit through the fast expansion:

1. **`validateCatalog`** rejects literal duplicate ids, wrong prefixes, bad charset, missing
   brand/model, and dangling `bundledShock`/`forFrames`/preset-system-mixing.
2. **`lintCatalog`** warns on brand-slug/`family` mismatches and — crucially — flags two
   same-`family` rows that are identical apart from their id (the copy-paste-dup guard).
   `node validate.js` currently prints **0 warnings**.
3. **Append-only id discipline** + `ALIASES` + `canonicalId()` means corrections retire ids
   rather than reuse them, so refs don't rot.
4. **`npm run typecheck`** (strict, per-category discriminated `Part` union) catches a row
   missing a required field or carrying another category's field.

The one gap this audit covers that the automated guards do **not**: cross-`family`
duplicates (lint's dup check is family-scoped) and broken **preset-fill** refs (silently
skipped by the price lint). Both came back clean.

---

## Gate status

Run on the audit branch (report added, `src/compat.js` untouched):

```
node validate.js   → DATA OK - 1775 parts, 0 problems (695 verified, 1080 unverified).
npm test           → Test Files 13 passed (13) | Tests 357 passed (357)
npx tsc --noEmit   → exit 0 (no output)
```

## Highest-priority items for the coordinator

There are **no correctness fixes** (no dups to merge, no ids to rename, no refs to repair).
Ranked by (low) value:

1. **LOW — sample-data hygiene:** independently verify price+weight for the 2 *sample*
   fit-identical pairs in §1 (X-Fusion Trace/Slide forks; Conti Xynotal/Kryptotal Trail) so
   distinct products stop sharing placeholder numbers. This is verify-grind work, not an
   audit fix.
2. **LOW — docs:** document the Maxxis `mtb` (bare MaxxTerra) compound token in
   `DATA-ENTRY-TEMPLATE.md` §2 (§2, above).
3. **Optional — engine hardening:** if desired, add an explicit preset-`fills` existence
   check to `validateCatalog` so a future dangling fill fails the gate instead of being
   silently skipped by the bundle-price lint. (Not a current bug — all 392 refs are live.)
