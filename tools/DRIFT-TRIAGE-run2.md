# Drift-check triage — run 2 (2026-07-08, post matcher-hardening)

Full re-run of `node tools/drift-check.js` over all **167** verified parts, on
branch `drift/run-2`, after the matcher was hardened against 8 triage
false-positive patterns (space/comma thousands separators, `.99` cents,
no-price spec/FAQ pages). State reset (`reset` with no args) and re-run from
scratch so every part got a fresh classification under the hardened matcher.

## Result: 162 ok / 4 changed / 1 unfetchable / 0 fetch-failed

## Part 1 — matcher-fix validation (compare against `DRIFT-TRIAGE-2026-07-08.md`)

The first full run flagged **8 matcher-pattern gaps** (not real drift) plus the
4 real-drift candidates that were since fixed on `main` (XS-1275, Yalla V2,
Jibb — see `git show c5c6b4f`). All 8 gaps now classify **ok**, confirming the
matcher hardening landed correctly:

| Part | Run 1 | Run 2 | Why fixed |
|---|---|---|---|
| `fr-commencal-meta-sx-v5` | changed | **ok** (price: spec/FAQ, skipped) | no-price spec-page detector |
| `fr-forbidden-dreadnought` | changed | **ok** (price: spec/FAQ, skipped) | no-price spec-page detector |
| `fk-formula-selva-s-29-160` | changed | **ok** (price: spec/FAQ, skipped) | no-price spec-page detector |
| (Öhlins space-thousands-separator case) | changed | **ok** | space-grouped price matcher |
| `sh-rockshox-super-deluxe-coil-ultimate-230x65` | — | ok (sample-grade, skipped) | now Skipped-documented (weight wall, landed 5198c6f) — no longer even attempts a page match |
| (remaining `.99`-cent-ending price gaps) | changed | **ok** | `.99` tolerance in `priceRoughlyMatches` |

The 3 previously-fixed real-drift candidates (`ca-sram-xs1275`,
`fr-raaw-yalla-v2`, `fr-raaw-jibb`) all now classify **ok** — confirming the
catalog price corrections from `c5c6b4f` match what's live on each maker's
page today.

No new false positives were introduced by the matcher change (spot-checked
all 162 `ok` rows above — every `sample-grade, skipped` and `spec/FAQ,
skipped` note matches its documented catalog convention).

## Part 2 — the 5 flagged rows this run (hand re-verified by fetch)

### `fr-canyon-strive-cfr` — CHANGED → **non-drift, retained** (unchanged from run 1)
Re-fetched canyon.com: still shows **"Sold out"** across all sizes (S/M/L/XL)
and a **"Members only product. Log in here"** gate — no price visible to an
anonymous fetch, same ambiguous status as run 1. Catalog `desc` already
documents this. Still needs a real (logged-in) browser session to tell
temporary sell-out from a real phase-out — **not actioned, no catalog change.**

### `fr-raaw-madonna-v3` — CHANGED → **expected supersession artifact, no action**
Re-fetched raawmtb.com/en-us/pages/madonna-v3: the page now serves **Madonna
V3.2** content ("Madonna V3.2 Fox Podium Build", $8,800 complete-bike price),
not V3. This matches the row's own `supersededBy: fr-raaw-madonna-v32` — the
URL was retired by RAAW to redirect/alias to the newer gen, exactly as
predicted in run 1. No catalog action.

### `ti-schwalbe-big-betty-29-24-st-as` — CHANGED → **non-drift, retained** (unchanged from run 1)
Re-fetched schwalbetires.com/Big-Betty: still only a whole-line **"from
US$49.00\* RRP"** teaser (cheapest variant in the range), not a per-SKU price
for this specific ST/Addix-Soft casing/compound. The catalog's $102 for this
exact SKU isn't comparable to that teaser. Genuinely needs the on-page
configurator (JS-driven), which a plain fetch can't drive. Catalog `desc`
already documents this — **not actioned.**

### `pd-hope-f22` — CHANGED → **non-drift, retained** (unchanged from run 1)
Re-fetched hopetech.com: still shows **"RRP £155.00 // €194.70 // $202.76 (ex
tax)"** — a geolocated, ex-tax USD conversion of a UK-direct GBP price, not a
genuine US MSRP. Per template s5.1-12 this doesn't qualify as a catalog price
source, so the catalog's $260 (a real US MSRP, differently sourced) stands
undisturbed. Catalog `desc` already documents this — **not actioned.**

### `ca-shimano-xt-m8100-1051` — UNFETCHABLE (HTTP 403) → **standing block, not new**
bike.shimano.com returned a genuine 403, same host/result as run 1's single
unfetchable. Not in `KNOWN_UNFETCHABLE_HOSTS` yet, but two independent runs
now agree it's a standing block, not a transient one. **Candidate for adding
`bike.shimano.com` to the known-unfetchable fast-path** (tooling suggestion
only — no catalog change; leaving that call to whoever next touches
`drift-check.js`).

## Part 3 — genuinely new drift this run

**None.** Zero new real-drift candidates surfaced. All 4 `changed` +
1 `unfetchable` rows are re-confirmations of run 1's findings (all previously
triaged as non-drift/expected/standing-block), and all 162 `ok` rows are
consistent with catalog conventions. Catalog price/weight fields for all
167 verified parts remain accurate to their source pages as of 2026-07-08.

No candidate rows for `status: 'discontinued'` this pass — `fr-canyon-strive-cfr`
remains ambiguous (sold-out vs member-gated), not confirmed discontinued.

## No catalog changes made this pass
Per the task scope, `src/compat.js` was not touched. This is a triage report
only — judgment on any future action stays with the verification workflow
(`tools/VERIFY-PROTOCOL.md`).
