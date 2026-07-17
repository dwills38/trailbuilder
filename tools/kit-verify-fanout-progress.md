# Kit verify fan-out progress (verify/kit-fanout-1)

Started 2026-07-17. Twin lane to the bike trust grind — src/kit.js ONLY, never touches
src/compat.js (owned by a parallel session).

## Baseline

- Start: 718 kit rows, 293 verified (41%).
- Goal: verified ratio > 55%.

## Phase 0 — reconciliation (DONE)

Checked the stale, unmerged `verify/kit-parts-1` wave (2026-07-16, 8 clusters) against
current main. It diverged before grind #3 (`04da059`) landed on main and never got merged.
Diffed every id it touched against current `src/kit.js`: every correction it made either
matched main byte-for-byte or was independently superseded by a later, better-sourced pass
in grind #2/#3. The `rotational:'rheon'` vocab addition (Kali Protectives) was also already
present. **Nothing to reconcile — working tree stayed clean, no commit made.**
`verify/kit-parts-1` and its cluster sub-branches are safe to archive later (out of scope
for this lane); left untouched.

## Phase 1 — brand fan-out (IN PROGRESS)

Per-brand background workers, proven-fetchable routes from grind 2/3 commit messages:

| Worker | Brands | Status |
|---|---|---|
| A | Troy Lee, Race Face, Kali Protectives | **done, merged** — 21 unverified rows in scope (rest already verified by an earlier pass); 6 newly verified, 1 price correction (jsy-raceface-indy-ss-womens sale $35 -> list $70), 1 discontinued (hm-kaliprotectives-shiva2), 1 left unverified (sold-out inconsistent pricing), rest re-confirmed absent (moto-line/wrong-model). Two moto-vs-MTB scope questions flagged (jsy-troyleedesigns-gp-pro-ls, arm-troyleedesigns-5900) — pending a scope call. |
| B | Alpinestars, Endura, Dakine | **done, merged** — 10 newly verified (8 Alpinestars + 2 Dakine), 0 corrections needed, 12 rows skipped/documented (mostly 404s = likely discontinued), 5 re-confirmation notes. Endura still fully walled (403/429 all session) — sitemap-only corroboration, 0 new verifications; one Endura contradiction flagged for a coordinator with a working fetch path. |
| C | POC, Leatt, 100% | **done, merged** — 32 newly verified across the 3 brands; biggest find: 6 Leatt MTB gloves were wrongly `discontinued` by a prior pass that fetched stale `-sale` clearance URLs instead of the current live SKUs (corrected prices + un-flagged); 2 POC footwear rows correctly discontinued; ~15 skipped (404s/ambiguous, documented) |
| D | Crankbrothers, Ride Concepts, Abus | **done, merged** — all 3 brands were already fully verified by an earlier grind; spot-check re-fetch caught 1 stale price (`sho-crankbrothers-mallet-boa` $220->$219.99) |
| E | Lazer, MET, Smith | **done, merged** — 19/23 rows already verified; the remaining 4 are retired SKUs with no surviving live page, corrected to `status:'discontinued'` with sourced evidence rather than fabricated |

Running total after A/B/C/D/E (phase 1 COMPLETE): **341/718 verified (47.5%)**, all gates green
(validate.js 0 problems, vitest 688/688, tsc clean). Below the 55% goal — phase 2 launched to close
the gap using the bdata/Exa unblockers on brands with the most unverified headroom: Fox (37
unverified), Giro (20), iXS (18), Specialized (16), 100% (15 remaining), Five Ten (7), Endura (7
remaining), POC (7 remaining), Pearl Izumi (5), Bell (4), Alpinestars (4 remaining), Bolle (2).

Open scope questions flagged by workers, not yet resolved (coordinator call): 2 Troy Lee Designs
moto-line rows (`jsy-troyleedesigns-gp-pro-ls`, `arm-troyleedesigns-5900`) — likely out of MTB
scope; 1 Endura evidence contradiction (`jsy-endura-singletrack`/`-ls`, needs a working Endura
fetch path); `jsy-100-hydromatic-ls` likely identity mismatch (current Hydromatic is a $189
jacket, not a $55 jersey).

**Both resolved by worker I (phase 2):** the 2 TLD moto rows were confirmed motocross-only
(no MTB listing anywhere) and removed as out-of-scope; the Endura contradiction was a red
herring (canonical URL path differs from what the sitemap implies — both rows are real,
corrected to list price and verified); `jsy-100-hydromatic-ls` was removed (Hydromatic is
100%'s glove/jacket line, no jersey by that name exists).

## Phase 2 — RESULTS (bdata/Exa retarget)

| Worker | Brands | Result |
|---|---|---|
| F | Fox Racing, Bell | **37/37 Fox rows touched (33 verified), 4/4 Bell verified.** bdata browser_api zone required site-wide (Vista wall total on WebFetch). Several large price-understatement corrections caught (Speedframe Pro, Proframe RS, Launch Pro pads). One near-duplicate SKU pair disambiguated (Union BOA vs Union BOA Flat). |
| G | Giro, Five Ten | **18/20 Giro verified, 4/7 Five Ten verified**, rest correctly `status:'discontinued'` with fetched evidence. bdata required for all of both brands (Vista/DataDome walls). Type correction caught (Tyrant mislabeled full-face -> half-shell). |
| H | Specialized, iXS, Pearl Izumi | **5/5 Pearl Izumi verified** via bdata. Specialized and iXS confirmed as genuinely NEW, structural (not tool) walls: Specialized's price is client-side-widget-only (never in the static/bdata response); iXS has no USD storefront at all (EUR-only, fails THE BAR's US-MSRP requirement) — both correctly left untouched with the finding documented, not worked around. |
| I | Endura retry, Bolle, mop-up, TLD scope | Endura contradiction resolved (2 verified + corrected to list price), 4 more Endura rows -> `discontinued`, 1 removed (no evidence Endura ever sold eyewear); Bolle 2/2 verified via bdata (both prices were understated, one badly: $149->$300); 2 TLD moto rows removed (out-of-scope); `jsy-100-hydromatic-ls` removed (identity mismatch). |

**Merge note:** worker F's branch was cut before workers C/G merged, so its Giro/POC/Leatt rows
(touched only incidentally, near its own Fox/Bell edits) went stale relative to what was already
in `verify/kit-fanout-1`. Resolved 5 merge conflicts by keeping the already-merged (better)
version of every non-Fox/Bell row and F's version of its own Fox/Bell corrections — verified with
a full gate re-run afterward.

## FINAL STATE

**409 / 714 kit parts verified = 57.3%** — past the 55% goal. All gates green:
- `node validate.js` → `DATA OK - 5025 parts, 0 problems` (bike catalog untouched) /
  `KIT OK - 714 kit parts, 0 problems (409 verified, 305 unverified)`
- `npx vitest run` → 24 files, 688 tests passed
- `npx tsc --noEmit` → clean

Row count moved 718 -> 714 (net -4): 2 Troy Lee moto-line rows + 1 `jsy-100-hydromatic-ls`
identity-mismatch row + 1 Endura eyewear ghost row removed, all with fetched evidence
(out-of-scope or never-existed), zero fabrication-driven removals.

Branch `verify/kit-fanout-1` is ready for review — not pushed, not merged to main.

Known dead ends (from grind 2/3, trust unless a genuinely new route is found): Five Ten/Adidas,
Sombrio, SixSixOne (defunct), Bolle, Fox Racing/Giro/Bell (Vista-walled), IXS (EUR-geo),
Specialized (403), Pearl Izumi (404).

Cairn kids' row: left alone, scope pending Douglas.

## Fanout-2 (branch verify/kit-fanout-2, 2026-07-17, seat 12)

Resumed from the 409/714 baseline (fanout-1's final state, already merged to main).
Discovery step: of the 305 unverified rows, 199 already carried a detailed
`UNVERIFIED`/`discontinued` investigation note from fanout-1 (re-checking a sample
of these against fresh searches reproduced the same dead ends byte-for-byte, e.g.
Race Face Diffuse SS / Trigger LS / Ruxton Pant / Khyber Glove / Flank Core - all
still absent from raceface.com's current collections). Only 106 rows across ~33
brands had never been investigated; effort went there.

**Shimano shoes (12 rows) + 1 jersey - the only cluster fully worked this pass:**
- Verified (4): XC502 ($100->$175, closure velcro->boa), GE700 ($150->$190), GE500
  ($150, exact match), XC903 ($480, exact match) - all against ride.shimano.com,
  weight kept as prior sample per the kit weight policy.
- Flagged `status:'discontinued'` (5): GR701, AM902, AM702, GR901, ME502 - all
  2020/2021-lineup SKUs absent from ride.shimano.com's current Gravity collection;
  bike.shimano.com's own "Shimano's New Gravity Footwear Family" article confirms
  the GE900/GE700/GE500/GF400 line replaced them. Manufacturer-sourced supersession
  evidence, not a fabricated guess.
- Left unverified with documented findings (3): XC702 (current live page under that
  slug now serves "SH-XC703" at $260 - SKU renumbering, not blindly renamed),
  XC300 (retailers agree on $125 MSRP vs the $90 sample but the live
  ride.shimano.com price couldn't be extracted - flagged as a likely correction for
  a future pass), ME702 (retailer-cited $220 vs $200 sample, same issue), Explorer
  SS jersey (no current "Explorer" jersey found on ride.shimano.com; a same-named
  2021 collection existed but its jerseys were called Myoka/Kita, not Explorer).

**Attempted, not worked (walled/ambiguous, documented above for the next pass):**
100% (Shopify .js endpoint 503'd mid-session; EU retailer prices for
Teratec/Fortis/Racecraft2 don't cleanly convert to a US MSRP), Bontrager/Trek
(trekbikes.com is JS-rendered - WebFetch, Exa's live-crawl, and `bdata scrape`
markdown mode all returned the page shell with no price; needs `bdata browser`
session mode, not attempted this pass), Nukeproof (UK-only brand, no direct USD
storefront found, only GBP retailer listings with inconsistent conversions).
O'Neal, ION, Scott and the remaining ~29 smaller brand clusters (Bluegrass,
DHaRCO, Dainese, Alpinestars, G-Form, 7iDP, EVS, TSG, eyewear brands, etc.) were
not reached this pass - still open for fanout-3.

**Result: 413/714 kit parts verified (57.8%, +4 rows / +0.5pp from the 57.3%
baseline).** All gates green: `node validate.js` (0 problems), `npx vitest run`
(24 files, 699 tests), `npx tsc --noEmit` (clean). Single commit, `src/kit.js` only.

Branch `verify/kit-fanout-2` ready for coordinator review - not pushed, not merged.

## Phase 2 — bdata unblocker retarget (queued after phase 1 lands)

Per main commit `4dde20b` (2026-07-17): `bdata` CLI (Bright Data) is installed +
authenticated locally, beats bot-walls (`bdata scrape "<url>" -f markdown`). This
reopens several confirmed dead ends for kit: Fox Racing/Giro/Bell (Vista wall),
Five Ten/Adidas (DataDome), Bolle, Pearl Izumi, Specialized apparel, IXS
(geo-wall — bdata exits US IPs). Sombrio/SixSixOne stay dead (defunct companies).
Bar unchanged — a bdata-fetched maker page counts exactly like WebFetch; search
snippets never count. Use ~5,000 shared credits/month sparingly (WebFetch first,
bdata only where it fails).

Second unblocker per main commit `81f2db7` (2026-07-17): Exa MCP tools
(`web_search_exa`/`web_fetch_exa`) render JS-walled pages plain WebFetch can't.
Fetch doctrine: **WebFetch → Exa (JS walls, e.g. Pearl Izumi/ION-class) → bdata
(hard bot-walls: Five Ten/Vista brands + geo-walls)** — preserve the bdata
credit pool for what only it can reach. Bar unchanged.
