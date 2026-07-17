# verify/fanout-1-fox-shocks-2-smallparts — progress log

Scope: (1) re-sweep the ~52 remaining unverified Fox shock rows against Fox's
current retail lineup; (2) verify unverified KMC chains / Shimano cranksets /
SRAM brakesets. Branch base: origin/main @ 6e061c0.

## Part 1 — Fox shocks (52 unverified rows re-checked, 0 newly verified)

Method: `curl -A "Mozilla/5.0" https://ridefox.com/products.json?limit=250&page=N`
(pages 1-5, 1239 products total, page 6 empty) + per-product
`.js` variant fetch for the 17 current `product_type:"Shocks"` SKUs, plus
targeted term searches (`rhythm`, `rythm`, `dpx2`, `van performance`, `nude`,
`performance elite`, `dhx performance`) across the full catalog dump.

**Result: the prior session's findings still hold today, confirmed 2026-07-17.**
Zero of the 52 rows could be newly verified. Breakdown:

- **Tiers confirmed absent from retail** (no product under that name anywhere
  in the 1239-product full catalog sweep): Float Rhythm/Rythm (both id spellings
  in the catalog), Float DPX2 (all trims), Van Performance Coil, all 5 Scott-OEM
  Nude variants (NUDE TR Factory EVOL, Float X NUDE EVOL, Float Custom EVOL
  Performance [excluded, coordinator flag], Nude 5T EVOL, NUDE 6 EVOL Trunnion),
  DHX Performance (non-Factory), Float/Float X/Float X2 "Performance" (non-Elite,
  non-Factory) — Fox's current lineup only sells Factory + Performance Elite +
  Live Valve NEO tiers for the X/X2 lines, "Float SL Performance Elite" (SL only
  has Factory + Performance, no Elite tier).
- **Tier exists but the exact eye×stroke/mount size is not in the current
  retail size matrix** (OE-only or discontinued size point): DHX2 Factory
  230x62.5 (retail has 230x60/230x65 only), Float X Performance Elite
  185x55-trun and 230x57.5 (current PSE matrix is 190x45/210x50/210x55 only,
  no trunnion sizes at all), Float DPS Factory 185x55-trun (current Factory
  matrix is Imperial-only OE sizes, no trunnion), Float X2 Factory
  205x62.5-trun (retail has 205x60TR/205x65TR only), Float Factory 210x52.5,
  Float Performance 210x50/205x65-trun/190x40/185x52.5-trun, DHX2 Coil
  205x62.5-trun, DPS Performance 210x52.5/210x50/210x55/190x45, Float X
  Factory 185x52.5-trun (Giant OEM)/205x65-trun/165x45-trun, DHX2 Factory
  205x65-trun, Float Performance Elite 210x55/190x45 (this bare "Float
  Performance Elite" tier — not X or SL — is not sold at all; likely a legacy
  name), X2 Performance Elite 250x70, Float X2 Factory 230x57.5, NUDE 6 EVOL
  165x45-trun.

No catalog edits made for Fox shocks — every row's existing `desc` already
correctly flags OE/Giant-OEM/Scott-OEM provenance, so nothing needed
correcting. Confirms Fox's lineup has NOT shifted materially since the prior
`verify/fanout-1-fox-shocks` sweep.

**Flag for coordinator (mirrors the already-known flagged item):**
`sh-fox-floatsl-performanceelite-210x50` has the same tier-name mismatch shape
as the already-flagged `sh-fox-floatsl-performanceelite-165x45-trun` — "Float
SL Performance Elite" is not a tier Fox currently sells (only Float SL Factory
and Float SL Performance exist); this row was NOT touched (left exactly as-is,
still unverified sample) but is worth the same judgment-call review the
coordinator already has queued for its sibling.

## Part 2 — small parts

### KMC chains (13 unverified rows scoped) — 9 verified, 4 skipped

Method: `kmcchain.com` category pages 403 (confirmed, matches prior finding).
`kmcchain.eu` product pages fetch cleanly via `bdata scrape` (Next.js SSR,
publishes per-SKU "Weight per 110 links" + full size/speed-compatibility
spec). `kmcchain.us` (Shopify) fetches via plain `curl -A "Mozilla/5.0"
.../products.json` + `.js` per-product — gives real US MSRP but its `weight`
field is a bogus Shopify shipping placeholder (454g = flat 1lb on every
variant of every product checked — the "grams trust test" trap from memory,
confirmed again here). Real weight came from kmcchain.eu; real US price came
from kmcchain.us.

**Verified (9):**
| id | price | weight | source basis |
|---|---|---|---|
| ch-kmc-x11 | $33 (was $30) | 260g (was 257) | kmcchain.us/products/x11 (Grey $33) + kmcchain.eu/products/x11-silver-black-long (260g/110 links) |
| ch-kmc-x11-microshift-advent-mx | $33 | 260g | same physical X11 SKU as above |
| ch-kmc-x10ept | $55 (was $35) | 263g (was 270) | kmcchain.us/products/x10 (EcoProteQ $55) + kmcchain.eu/products/x10-ept (263g) |
| ch-kmc-z8p3 | $14.30 (was $12) | 316g (was 290) | kmcchain.us/products/z8-3 + kmcchain.eu/products/z8-silver-grey (EU site calls it plain "Z8", tags/specs match US Z8.3 exactly) |
| ch-kmc-z8p3-acolyte | $14.30 | 316g | same physical Z8.3 chain |
| ch-kmc-x9ept-9 | $46.20 (was $30) | 287g (was 280) | kmcchain.us/products/x9 ("EcoProteQ" variant IS listed — **corrects the prior session's finding that no EPT SKU existed**) + kmcchain.eu/products/x9-silver |
| ch-kmc-xglide-9 | $38.50 (was $18) | 305g (was 290) | kmcchain.us/products/xglide (Gray) + kmcchain.eu/products/xglide-grey. kmcchain.eu states xGlide is explicitly "9- to 11-speed" compatible as ONE physical SKU — confirms the catalog's 3-way speed split (9/10/11) shares one real product |
| ch-kmc-xglide-10 | $38.50 (was $22) | 305g (was 280) | same xGlide SKU |
| ch-kmc-xglide-11 | $38.50 (was $20) | 305g (was 285) | same xGlide SKU |

Price corrections are notable: catalog samples were budget-aftermarket
guesses; KMC's own US storefront prices are meaningfully higher across the
board ($27.50-$60.50 depending on finish, vs $12-$35 sampled). All corrected
to the real kmcchain.us MSRP for the finish tier matching the row's existing
description (plain/base tier for plain rows, EcoProteQ/EPT tier for EPT rows).

**Skipped (4) — bar not met, no changes made:**
- `ch-kmc-z410`, `ch-kmc-z510` — neither name exists as a current KMC **chain**
  product on kmcchain.us or kmcchain.eu; both names ONLY resolve to
  **connector** (master-link) SKUs today (`kmcchain.us/products/z510` =
  "Z510 Connector", type:"connector"). Current 1/8" single-speed/BMX chains
  KMC actually sells: Z1 Wide EcoProteQ, S1, K1/K1SL, HL1, B1H, 415/415H,
  City Hunter, KK710 Wide. Could not confirm "Z410"/"Z510" as real chain
  model names via a fetched manufacturer page this session — left exactly as
  they were (existing samples, already honest about being unverified). Not
  renamed (ids are append-only; a rename call is the coordinator's, not
  mine) — flagging here rather than guessing.
- `ch-kmc-x11-cues` — Giant's own OE build sheets call this chain "KMC X-11"
  even though it's paired with Shimano CUES (LinkGlide). Given KMC's real
  LinkGlide-compatible product is branded "xGlide" (verified above, confirmed
  9-11-speed on kmcchain.eu), this row's "X-11" naming is almost certainly
  Giant's own OE shorthand, not a distinct KMC SKU — but I did not re-fetch
  giant-bicycles.com myself this session to confirm, so left unverified per
  THE BAR (no fabricated confirmation). Judgment call logged, no data changed.
- `ch-kmc-x11-trp-evo7-dh` — the TRP EVO7 DH pairing claim (from TRP's own
  literature + an mbaction.com review) was not re-fetched from trpcycling.com
  this session, so I can't extend `verified:true` to it even though KMC's own
  X11 page (fetched above) shows plausible/close price+weight figures. Left
  unchanged.

### Shimano cranksets (11 unverified rows) — not reached this session

### SRAM brakesets (11 unverified rows) — not reached this session

Ran out of session time after the Fox re-sweep + KMC chain batch; cranksets
and brakesets are next up for a follow-on session using the same doctrine
(Shimano archive-PDF route for crankset weights via `pdftotext -layout`,
sram.com service/model pages for brakeset bundle confirmation).

## Gates (after this batch)

- `node validate.js` → 0 problems (5026 parts, 2906 verified / 2120 unverified)
- `npx vitest run` → 699 passed (699) — matches stated baseline, unchanged
- `npx tsc --noEmit` → clean
- `node tools/verdict-audit-harness.js` → 0 flags (A), 0 preset conflicts (B),
  329 clean / 0 errors + 5/5 wheel-sub clean (C), 15/15 clashes + 2/2 clean
  partials (D), same 5 known rotor-max false-warn fork families as before (E,
  unrelated to this batch's edits — pre-existing, informational only)
