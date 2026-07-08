# Drift-check triage — first full run, 2026-07-08

First end-to-end run of `tools/drift-check.js` over the whole verified set (165 parts —
previously only smoke-tested on the first 8). Ran in batches of 20 via `npm run verify:drift`;
zero fetch failures, so no `reset --failed` was needed. State: `tools/drift-report.json`
(committed alongside this file).

## Results

| Disposition | Count |
|---|---|
| OK | 150 |
| Changed | 14 |
| Unfetchable | 1 |
| Fetch failed | 0 |
| **Total** | **165** |

All 14 "changed" rows flagged on **price** — weight was never flagged this run. Each is
triaged below by manually re-fetching its `source` URL. **No catalog rows were edited** —
per the task, judgment on what to do with a real drift stays with the verification workflow
(`tools/VERIFY-PROTOCOL.md`); this doc is the queue.

Legend: **(a)** real drift on the maker page — queue for re-verification · **(b)** page
fetched fine but the checker's matcher missed a value that's still effectively there
(formatting/page-type mismatch) · **(c)** product superseded/gone — `status` candidate.

## (a) Real drift — queue for re-verification

| id | catalog price | page price now | delta | source |
|---|---|---|---|---|
| `ca-sram-xs1275` | $380 | **$275** (MSRP, shown twice on the SRAM model page) | −28% | sram.com/en/sram/models/cs-xs-1275-a1 |
| `pd-hope-f22` | $260 | **£155.00 / €194.70 / $202.76 (ex tax)** | −22% (USD) | hopetech.com F22 pedal page |
| `fr-raaw-yalla-v2` | $2,924 | **$2,926.00** | +$2 | raawmtb.com/en-us/pages/yalla-v2 |
| `fr-raaw-jibb` | $1,261 | **from $1,263.00** | +$2 | raawmtb.com/en-us/pages/jibb |

Notes:
- **SRAM XS-1275 and Hope F22** are the two with real, non-trivial magnitude (>20%). Worth a
  human re-check against `tools/VERIFY-PROTOCOL.md` — could be a genuine price move, or the
  original catalog entry was off (Hope's page leads with GBP; the $202.76 is a computed USD
  conversion, so if the row was entered from a different USD source at a different FX rate
  that alone could explain most of the gap — still worth confirming, not editing here).
- **RAAW Yalla V2 and Jibb** both moved by exactly **+$2**, in the same direction, same
  magnitude — reads like a small across-the-board RAAW price bump rather than two unrelated
  changes. Low priority (rounds to the same figure either way) but flagging both together
  since they share a cause.
- `ti-schwalbe-big-betty-29-24-st-as` (catalog $102) shows **"from US$49.00\* RRP"** on
  schwalbetires.com — that's the cheapest-variant teaser price for the whole Big Betty line,
  not the specific 29x2.4 SuperTrail/Addix Soft SKU we catalogued. The real per-SKU price
  needs the on-page configurator (casing/compound selectors), which a plain-text fetch can't
  drive. Not confident enough to call this either real drift or a false alarm — listing it
  here as a re-verification candidate rather than under (b), since $102 vs "from $49" is too
  large a gap to wave off as formatting.

## (b) Page fetched fine, value not actually missing — matcher pattern gaps

None of these are catalog errors; each is a case where the live page states a price
effectively equal to (or never comparable to) the catalog value, but in a shape the
checker's plain-text matcher doesn't recognize. Listed as future-matcher-fix material, not
as verification-queue items.

| id | catalog price | page price now | pattern |
|---|---|---|---|
| `fk-canecreek-helm-mkii-air-29-160` | $1,100 | "Regular price Sale price$1,099.99" | catalog rounds to nearest dollar; page uses `.99` psychological pricing. Matcher should accept `$X99.99` as equivalent to a `$(X+1)00`-rounded catalog value (or catalog rows should store the exact cents). |
| `cr-canecreek-eewings-allmountain` | $1,250 | "Regular price Sale price$1,249.99" (also "Sold out") | same `.99` rounding pattern, same brand/storefront (Cane Creek's Shopify theme). |
| `hb-renthal-fatbar-35` | $108 | "Prices from : $107.85" / "Ex Tax: $107.85" | rounding (107.85→108) plus a "Prices from :" / "Ex Tax" label the matcher isn't stripping. Page also notes the item is "currently unavailable for purchase from renthal.com, Contact your local Renthal Stockist" — Renthal sells direct-to-consumer rarely; not new, not drift. |
| `fk-ohlins-rxf36-m2-29-160` | $1,370 | "$1 369.50" | Öhlins' site uses a **space** as the thousands separator plus cents (`1 369.50`), not the comma-grouped format (`1,370`) the matcher's number-format list expects. Value matches within rounding. |
| `fr-commencal-meta-sx-v5` | $2,600 | *(no price on page)* | Commencal's `/tech-*.html` pages are spec-only — geometry/frame assembly/components, never a price. Wrong page *type* for a price check, not page drift; this was already flagged as expected in the original 8-part smoke test before this full run. |
| `fr-forbidden-dreadnought` | $3,700 | *(no price on page)* | source is `forbiddenbike.com/faqs/dreadnought-faqs/` — an FAQ page, spec/Q&A content only, never carried a price. Same "wrong page type" class as Commencal above. |
| `fk-formula-selva-s-29-160` | $850 | *(no price on page)* | rideformula.com product pages show specs/reviews/downloads but no retail price — Formula prices through dealers, not direct. |

Suggested matcher improvement (not implemented here — out of scope, `tools/drift-check.js`
logic wasn't touched): tolerate `.99`-ending prices against a whole-dollar catalog value, and
recognize space-grouped thousands (`1 234.56`) alongside the comma-grouped formats already
handled. The three "no price on page" rows aren't a matcher problem at all — they're
correctly reporting the truth (no price string exists on that page); if we want them to stop
showing as "changed" every run, the fix is either picking a different `source` URL that
actually carries price, or documenting the price as sample-grade in the row's `desc` (the
same convention already used elsewhere in the catalog for currency-converted/non-page-sourced
prices), so `drift-check.js`'s existing sample-grade skip applies.

## (c) Superseded / discontinued signal

| id | catalog price | what the page shows now | verdict |
|---|---|---|---|
| `fr-raaw-madonna-v3` | $2,599 (frame kit) | `raawmtb.com/en-us/pages/madonna-v3` now serves **"Madonna V3.2 Fox Podium Build"** complete-bike content at "from $8,796.00" — no separate frame-kit price | Expected, not alarming: this row is already marked `supersededBy: "fr-raaw-madonna-v32"` in the catalog. RAAW's `/madonna-v3` URL has been repointed to the newer V3.2 generation's page, so it can no longer independently verify the V3 frame-kit price. No action needed — the catalog already models this correctly via `supersededBy`; noting it here only because it's the mechanism behind the "changed" flag, and as a heads-up that this source URL is now stale for future drift runs too (it'll keep flagging "changed" every time since the frame-kit price it's checking for no longer appears on this URL at all). |
| `fr-canyon-strive-cfr` | $4,999 (frame kit) | canyon.com shows **"Sold out"** across all four sizes (S/M/L/XL) and **"Members only product. Log in here."** — no price visible to an anonymous fetch | Ambiguous, needs a human look. Could be: (1) genuinely sold out/between production runs (Canyon direct-sale model does this), (2) regionally gated pricing that requires a logged-in session, or (3) a signal the CFR trim is being phased out in favor of a newer Strive generation — can't distinguish from a plain-text fetch. Recommend the verification queue re-check with a real browser session (per `CLAUDE.md`'s Chrome-extension exception list) rather than marking `status:'discontinued'` off this alone. |

## Not required but worth flagging: the 1 unfetchable

`ca-shimano-xt-m8100-1051` → `bike.shimano.com/.../CS-M8100-12.html` → **HTTP 403**, both to
`drift-check.js`'s own fetcher and to a manual re-fetch just now. This confirms it's a
genuine, repeatable bot-block, not a one-off. `bike.shimano.com` is **not** currently in
`drift-check.js`'s `KNOWN_UNFETCHABLE_HOSTS` fast-path list — worth adding if it keeps coming
back 403 on future runs (would save a wasted fetch each time), but not actioned in this pass
since it's tool-logic, not catalog data, and out of this task's scope.

## Summary for whoever picks up the verification queue

Prioritized re-check list, highest-value first:
1. **SRAM XS-1275 cassette** ($380 → $275 on SRAM's own page, −28%)
2. **Hope F22 pedal** ($260 → ~$203 USD-equivalent on Hope's page, −22%)
3. **Schwalbe Big Betty 29x2.4 ST** ($102 vs an unclear "from $49" teaser — needs the
   configurator, not a plain fetch)
4. **RAAW Yalla V2 + Jibb** (+$2 each — low priority, likely a small blanket price bump)
5. **Canyon Strive CFR** — needs a real browser session to see past the member-gate/sold-out
   state; may also be worth a `status` conversation once confirmed either way

Everything in the (b) table needs no catalog change — the pages back up the catalogued
prices, just in shapes the checker doesn't parse yet. `fr-raaw-madonna-v3`'s "changed" flag
is an artifact of the source URL now serving the superseding generation's page; the catalog's
`supersededBy` field already has this right.
