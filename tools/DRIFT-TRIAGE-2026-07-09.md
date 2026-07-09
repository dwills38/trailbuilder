# DRIFT TRIAGE — 2026-07-09

Hand-triage of every row `node tools/drift-check.js` flagged, run against the full
verified set. The drift checker **never edits the catalog** — it writes
`tools/drift-report.json`; this file is the human classification of what it found.
**No `src/compat.js` change was made in this pass** (out of scope for a drift run —
findings are handed to the coordinator).

## Run summary

Full pass over **all 695 verified parts** (0 pending at finish):

| Disposition   | Count | Meaning |
|---------------|------:|---------|
| OK            |  668  | Catalogued price/weight still found on the source page |
| Changed       |   21  | A catalogued number wasn't found on a fetch — **all triaged below** |
| Unfetchable   |    5  | 403 bot-block or a host on the tool's known-unfetchable list |
| Fetch failed  |    1  | HTTP 404 (6 transient 503s cleared on a `reset --failed` retry) |
| **Total**     |  695  | |

### Bottom line

**Zero confirmed real price or weight drift.** All 21 "changed" rows are
**matcher / fetch-fidelity noise** — the catalogued value is either still correct
(and present on the page but missed by the raw-HTML substring fetch), or lives on a
page type / behind a mechanism the plain fetcher can't read. The **real-drift queue
handed to the coordinator is empty.** The only actionable items are
provenance/process (see §4), not catalog price corrections.

---

## 1. Changed rows (21) — per-row triage

All 21 were flagged **"not found on page: price"** (weight was never the trigger —
see the note on loose weight-matching in §5). Grouped by noise category.

### A. Spec / FAQ / support / "buy elsewhere" pages — no price field on that page (11)

The source URL is a spec sheet, FAQ, or support page that structurally carries no
purchase price; the price lives on a separate product/buy page. Catalogued price
neither confirmed nor refuted here — **not drift**.

| Part | Price | What the page shows |
|------|------:|---------------------|
| `fr-santacruz-tallboy-5` | 3949 | Support/spec page — **no price** anywhere (only complete-bike weights). |
| `fr-santacruz-blur-4` | 3549 | Support/spec page — **no price** (only complete-bike weights). |
| `fr-evil-wreckoning-ls` | 3750 | Wreckoning **FAQ** page — tech specs only, **no price**. Weight is sample-grade (skipped by the tool). |
| `fr-intense-tracer-279` | 2999 | Spec page — no Tracer price; the only `$` figure is an unrelated "Tazer starting at **$6,999**" promo banner. |
| `dp-9point8-fall-line-r-309-75` | 349 | Shared specs page — no price; only an unrelated "iNVRS Stud Combos **$71USD**" promo. |
| `dp-9point8-fall-line-r-309-100` | 349 | (same page) |
| `dp-9point8-fall-line-r-309-125` | 349 | (same page) |
| `dp-9point8-fall-line-r-316-75` | 349 | (same page) |
| `dp-9point8-fall-line-r-316-100` | 349 | (same page) |
| `dp-9point8-fall-line-r-316-125` | 349 | (same page) |
| `dp-9point8-fall-line-r-316-150` | 349 | (same page) |
| `pd-wellgo-mg1b` | 72.99 | Wellgo spec page — **no price**; weight "368 g/pr" **matches catalog 368g** ✓. |
| `fr-frameworks-enduro` | 3999 | Source is a 4.8 MB binary/image **tech-doc PDF** — no price text (it's the source for sizes/travel/maxTire, never price). |

> Note: several of these (Evil FAQ, Intense spec, 9point8 specs) *do* carry an
> unrelated `$` figure, so the tool's `looksLikeSpecOrFaqPage` skip (which requires
> the marker phrase **and** no currency figure) didn't fire — hence they surfaced as
> "changed" rather than being auto-skipped. Correct human call: no price on that page.

### B. Price IS on the page and equals the catalog — raw-HTML-vs-rendered fetch artifact (3)

The storefront injects the price via JavaScript. The drift checker's zero-dep raw
`https` fetch gets HTML without it; a rendering fetch (used for triage) sees it, and
it **equals the catalogued value**. Definitively **not drift**.

| Part | Price | Rendered page shows |
|------|------:|---------------------|
| `fk-ext-era-v2-29-170` | 1650 | "**$1,650.00 USD**" — exact match. |
| `dp-pro-koryak-120-309-120` | 289.99 | "**$289.99 USD**" — exact match. |
| `dp-pro-koryak-120-316-120` | 289.99 | "**$289.99 USD**" — exact match. |

### C. Price range — catalog stores a representative single figure inside it (1)

| Part | Price | Page shows |
|------|------:|------------|
| `fk-dvo-onyx-sc-d1-29-170` | 999 | Range "**$785.00 to $1,074.00**" (no per-travel breakdown). $999 is a documented mid-tier interpolation **within** the range (see the row's `desc`). Weight "2,150 g" **matches catalog** ✓. |

### D. FX-converted / ex-tax / line-level "from" teaser — not the US-MSRP per-SKU price (2)

| Part | Price | Page shows |
|------|------:|------------|
| `pd-hope-f22` | 260 | "RRP £155.00 // €194.70 // **$202.76 (ex tax)**" — a geolocated ex-tax FX conversion, not a US MSRP. Weight "360g per pair" **matches** ✓. $260 = prior US-market MSRP, retained. |
| `ti-schwalbe-big-betty-29-24-st-as` | 102 | Only a whole-line "**from US$49.00\* RRP**" starting-price teaser; the per-casing/compound SKU price ($102) needs the on-page configurator a plain fetch can't drive. |

### E. Member-gated / sold-out / frame-only-price-not-exposed (2)

| Part | Price | Page shows |
|------|------:|------------|
| `fr-canyon-strive-cfr` | 4999 | "**Members only product. Log in here**", "**Sold out**", "**Unavailable**" across all sizes — no anonymous price. Can't confirm **or** refute $4,999. |
| `fr-raaw-madonna-v3` | 2599 | Page now shows only a complete-build price ("**from $8,804.00**"); the frame-only $2,599 isn't exposed to an anonymous en-us fetch. Frame **weight 3.9 kg confirmed** (matches catalog 3900g) — that's why only price flagged. |

---

## 2. Unfetchable (5) — cannot be auto-checked (not classified as drift)

| Part | Price | Why | Notes |
|------|------:|-----|-------|
| `ca-shimano-xt-m8100-1051` | 185 | Shimano **403** bot-block (documented standing blocker). | Interface source; Shimano publishes no component weights anyway (weight already measured/sample per policy). |
| `fr-giant-glory-advanced` | 3499 | `giant-bicycles.com` is on the tool's `KNOWN_UNFETCHABLE_HOSTS` (skipped without a network call). | The static PDF **is** reachable via a rendering fetch — it's a spec sheet with **no price** (so $3,499 was never page-sourced from it; spec-doc noise, not drift). |
| `fr-giant-trance-x-advanced` | 3200 | Same host-policy skip. | Product page, host-blocked. |
| `pd-vpcomponents-vice` | 90 | vpcomponents.com **403** bot-block. | Interface source. |
| `pd-vpcomponents-aim` | 60 | vpcomponents.com **403** bot-block. | Interface source. |

---

## 3. Fetch failed (1) — HTTP 404

| Part | Price | Finding |
|------|------:|---------|
| `sft-sram-sx-eagle` | 40 | Source model-detail URL `sram.com/en/sram/models/sl-sx-1-a1` returns **404** to automated fetches. **The price is correct**: the SRAM SX Eagle **series** page (`/sram/mountain/series/sx-eagle`) still lists the SL-SX-1-A1 Trigger Shifter as a **current** product at **$40** — matches the catalog. This is a **broken/bot-404'd provenance link, not a price change.** |

> The other 6 fetch-failures in the first pass were transient **HTTP 503s**
> (spank-oozy-35, ethirteen-race-carbon-35, chromag-hifi-318, protaper-mtbstem ×2,
> ergon-gdh); a `reset --failed` + re-run returned all 6 to **OK**.

---

## 4. Action items for the coordinator

**Real price/weight-drift queue: EMPTY.** No catalog price/weight edit is warranted
from this pass. The items below are provenance/process, not corrections:

1. **`sft-sram-sx-eagle` — dead source URL (P2, provenance only).** The model-detail
   page 404s; the price ($40) is confirmed still current via SRAM's SX Eagle series
   page. Consider re-pointing `source` to
   `https://www.sram.com/en/sram/mountain/series/sx-eagle` (which resolves), or
   re-fetch the model URL from a real browser session to confirm it's a bot-404.
2. **`fk-ext-era-v2-29-170` — possible weight nudge (P3, unconfirmed).** Vital now
   lists **2,275 g** for the 170mm/uncut config vs the catalogued **2341 g** (the row
   cites blisterreview + enduro-mtb at 2341 g). The drift tool does not reliably check
   weight (§5), so this surfaced only in manual triage — worth a look on next
   fork-verification pass, but **not** confirmed drift.
3. **Stale code comment in `tools/drift-check.js` (P3, housekeeping).**
   `KNOWN_UNFETCHABLE_HOSTS` says *"None of these currently back a verified part's
   `source` (grep-verified 2026-07-08)."* That's now **out of date**: two verified
   frames added since (`fr-giant-glory-advanced`, `fr-giant-trance-x-advanced`) use
   `giant-bicycles.com`, so the tool silently skips them. Either update the comment or
   reconsider whether the static-PDF Giant source should be exempt from the host skip.
4. **No action needed** on categories A–E in §1 — they are the tool's known
   false-positive shapes (spec/FAQ pages, JS-injected prices, ranges, FX teasers,
   gated pages). Many already carry a `desc` drift-flag note from the 2026-07-08 pass.

---

## 5. Method & caveats

- **Every "changed" row was re-fetched from its own `source` URL** during triage
  (a rendering fetch, which reads JS-injected content the drift tool's raw-HTML
  fetch can't) and classified by hand as real drift vs noise.
- **Price matching** (the meaningful signal): the tool looks for the whole-dollar
  price as a substring, tolerating `.99` rounding and separator styles
  (`priceRoughlyMatches`). Its blind spots — all seen above — are JS-injected prices,
  price ranges, non-US/FX/ex-tax figures, configurator-gated per-SKU prices, and
  pages with no price field.
- **Weight matching is very loose and near-useless as a drift signal:** the token set
  includes the rounded-pounds integer (e.g. `"5"`), which is a substring of almost any
  HTML page, so weight is "found" on essentially every fetch. Weight drift therefore
  effectively cannot be caught by this tool — any weight re-check must be manual
  (that's how the EXT ERA note in §4 was found).
- **`drift-report.json` is committed** with the full pass state; re-run
  `node tools/drift-check.js report` for the live per-part breakdown.
