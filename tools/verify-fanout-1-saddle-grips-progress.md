# verify-fanout-1-saddle-grips — progress log

Branch: `verify/fanout-1-saddle-grips`. Scope: previously-untouched `saddle`/`grips`
category pair, prioritized ODI/Ergon grips and Specialized/Ergon/Fizik/Selle Italia
saddles, per the coordinator's final-push-to-60% brief. THE BAR: a real per-SKU
weight (maker-stated, or `sourceType:'measured'`+`weightSource` for a genuinely
*measured* editorial figure — "on our scales" wording, not a spec caption) is
required for `verified:true`; no nominal-weight shortcut for these categories.

## Verified this session (8 rows)

| id | before | after | source |
|---|---|---|---|
| `sa-specialized-bridge` | $150/321g, unverified | $149.99/324g (155mm), verified | specialized.com/us/en/bridge-comp-with-mimic/p/187404 (fetched via Bright Data — 403 direct-wall confirmed dead) |
| `sa-specialized-power-comp` | $100/247g, unverified | $149.99/249g (155mm), verified | specialized.com/us/en/power-comp/p/155836 |
| `sa-specialized-phenom-comp` | $92/254g, unverified | $149.99/265g (155mm), verified | specialized.com/us/en/phenom-comp/p/156636 |
| `sa-specialized-bridge-sport` | $60/321g, unverified sample | $69.99/325g (155mm), verified | specialized.com/us/en/bridge-sport/p/174747 |
| `sa-specialized-power-pro-mirror` | $180/230g, unverified | $349.99/251g (155mm), verified | specialized.com/us/en/power-pro-with-mirror/p/205611 |
| `gr-ergon-gxr` | $35/65g, unverified | $28.07/80g (Small), verified | ergonbike.shop/products/gxr |
| `gr-ergon-ge10-evo` | $40/95g, unverified | $39.95/119g, verified | ergonbike.shop/products/ergon-ge1-evo (GE10 = Ergon's prior name for the current GE1 Evo, already documented in-row) |
| `gr-ergon-ga20` | $35/95g, unverified | $34.95/107g, verified | ergonbike.shop/products/ergon-ga2 (GA20 has no standalone current product page; same older-name/current-name pattern as GE10→GE1 Evo) |

Note on representative size: Specialized/Ergon publish per-size weights (2-3
widths); this catalog's `saddle`/`grips` schema carries one `weight` field, so
the middle (3-size) or first-listed (2-size) width was entered as the
catalog's representative figure, per this catalog's existing convention
(`sa-specialized-bridge-sport`'s prior "midpoint" note).

## Corrections without verification (weight bar unmet, other fields fixed)

- `sa-fizik-tiaga` (id unchanged, append-only): **model name typo fixed "Tiaga" → "Taiga"** (the real fi'zi:k model name; confirmed via theproscloset.com, mtbiker.shop, and the Focus Jam 6.9 build-sheet coverage). `family` updated `fizik-tiaga` → `fizik-taiga` (only one reference, grep-checked). Weight corrected 280→271g per multiple corroborating retailer listings (Regular size, 262×135mm, Cr-Mo round rails) — fizik.com no longer merchandises this model (reads as discontinued: not in current collections, no live product page found), so it stays an honest unverified sample.
- `gr-odi-elite-pro`: SKU corrected `D33EPB-B`→`D33EPBR-B` per the re-fetched odigrips.com page (may be a colorway-specific suffix). Weight bar re-confirmed unmet (BikeRadar's "102g" mention is an unattributed spec caption, not a measured claim — checked verbatim, no "on our scales" wording).
- `gr-odi-f1-vapor` / `gr-odi-f1-float`: captured `mfgPn` (`D06FVB` / `D06FFB`) opportunistically; weight bar unmet (maker states only a relative "~30% lighter" claim, no absolute figure).

## Genuine walls (re-confirmed, left as prior unverified samples)

- **ODI grips (whole brand, this session's sample): odigrips.com never publishes an absolute per-SKU weight** on any product page checked (Elite Pro, Rogue V2.1, AG-2, Elite Motion, Longneck V2.1, F-1 Vapor, F-1 Float) — confirms the prior sessions' finding. Checked BikeRadar/MBR for a genuinely *measured* ("on our scales") figure per model (the bar this catalog already meets for `gr-odi-vans-v21`) — found NONE beyond the existing Vans V2.1 row. `gr-odi-rogue-v21` and `gr-odi-ag2` already carry careful prior-session notes (SKU reconfirmed, measured-weight search exhausted) — left untouched rather than re-litigated with a possibly-different colorway SKU scrape.
- `gr-ergon-gfr1`, `gr-ergon-gd1-evo` (standard, non-Factory trims): ergonbike.shop's own standard-trim pages (`ergon-gfr1`, `ergon-ergon-gd1_evo`) confirm price ($34.95 both, exact match to catalog) but publish **no weight** for the non-Factory tier (only the pricier Factory siblings state weight: GFR1 Factory has no weight either; GD1 Evo Factory = 145g, a different/heavier trim than these rows model). Left unverified.
- `sa-specialized-henge-comp`: the US product page (`p/155702`) now 404s and the model doesn't appear on specialized.com's current collections; a handful of non-US regional domain URLs for the same product id also failed to render (redirect-to-homepage / fetch error). Reads as discontinued from Specialized's current lineup but not certain enough to assert `status:'discontinued'`. Left unverified.
- `sa-specialized-bridge-expert-mimic`, `sa-specialized-power-sport`: re-confirmed these are OE-only trims with **no standalone specialized.com product page** (only ever cited via complete-bike spec sheets on third-party sites like vitalmtb.com). Genuine wall, left unverified — consistent with the existing in-row notes from a prior session.
- **Selle Italia (whole brand, this session's sample): confirmed a lineup-wide rename/refresh.** `selleitalia.com/model-x/` now **redirects to a renamed "Novus Boost Evo Sport Greentech"** product (280g/$59.90) rather than serving a page for "Model X" — ambiguous whether this is the same SKU rebranded or a genuinely different product, so left untouched rather than risk mismatching the spec to the wrong product. "X3 Boost" has **no current product page** on selleitalia.com either (site search returns only the newer Novus/SLR-Boost-TM/SLR-Boost-TI316-Superflow lines). "SLR Boost Fill" (Ti rails, non-Superflow) similarly has no current page — Selle Italia's whole catalog appears to have moved from the old Fill/plain naming to the current Superflow naming since these rows were entered. All 4 target Selle Italia rows (`sa-selleitalia-model-x`, `sa-selleitalia-x3-boost`, `sa-selleitalia-slr-boostfill-ti`, `sa-selleitalia-slr-boost`) left unverified/unchanged this session — didn't want to guess a mapping onto the wrong current-line SKU.
- Fizik (Terra Alpaca, Vento Argo X5, Terra Aidon X5, Terra Ridon X1): fizik.com's Shopify-style product pages (`fizik.com/us_en/*.html`, `fizik.com/en-us/products/*`) either 404'd or rendered only site-navigation chrome (no product spec block) for the specific SKUs checked this session; left unverified/unchanged (no confident correction to make beyond what prior sessions already documented).

## Gates (mid-batch checkpoint, after the 8 verifications + corrections above)

- `node validate.js`: **DATA OK - 5026 parts, 0 problems (2997 verified, 2029 unverified)**
- `npx vitest run`: **700 passed (700)** — matches the pre-session baseline exactly, nothing weakened
- `npx tsc --noEmit`: clean, no output
- `node tools/verdict-audit-harness.js`: 0 flags (A/B), 329 clean assembles (C), 15/15 + 2/2 adversarial (D), E unchanged (saddle/grips carry no verdict-driving fields, so none of this session's edits could move E)

## Overall ratio after this batch

2997/5026 = 59.63% (kit unaffected: 433/714 = 60.6%, kit was already >60%).
Session moved the bike-catalog ratio from 59.47% → 59.63% (+8 verified rows,
+0 net unverified since none were newly added — pure conversions).
