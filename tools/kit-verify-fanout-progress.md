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

## Fanout-3 (branch verify/kit-fanout-3, 2026-07-17, background worker)

Resumed from the 413/714 baseline (fanout-2's final state). Worked the ~102-row
untouched pool (O'Neal, ION, Scott, Bluegrass, Fasthouse, G-Form, DHaRCO, 7iDP,
Dainese, TSG, Zoic + smaller clusters) per the coordinator's target list.
bdata NOT used (balance too low, ~$1.39, no single wall justified spending it) -
WebFetch + Exa covered everything reached this pass.

**Result: 433/714 kit parts verified (60.6%, +20 rows / +2.8pp from the 57.8%
baseline).** All gates green: `node validate.js` (0 problems, `KIT OK - 714 kit
parts, 0 problems (433 verified, 281 unverified)`), `npx vitest run` (24 files,
700 tests), `npx tsc --noEmit` (clean). One commit per brand cluster.

**Newly verified (20 rows) + corrections by brand:**
- **O'Neal** (4 verified, oneal.com Shopify): Pinned Flat Pedal Shoe ($100->$79.99),
  Element Squadron Jersey (exact match), Element Trail Pant ($90->$119.99 + liner
  false->true + sizes), Element Glove ($18->$24.99). AMX Glove and Session SPD
  left unverified - neither found on the US oneal.com storefront (EU-only).
- **Scott** (1 verified): Grenade Evo Elbow Guard promoted (re-fetched, price/sizes/cert
  already correct). Shoe, 2 shorts, 3 gloves, 1 eyewear row left unverified -
  scott-sports.com is JS-rendered for US product pages (search + direct slugs
  both returned no usable content via WebFetch/Exa this session).
- **Bluegrass** (4 verified via met-helmets.com): Prizma 3D/React/Union gloves
  (price/sizes), and Armour B&S D3O renamed+corrected to "Seamless B&S D3O"
  (EUR190->EUR250, weight 840g sample->580g maker-published S/M, added EN1621-2-L1
  cert). The 3 "Skinny" kneepad/elbowpad rows marked `discontinued` - the line is
  absent from the current met-helmets.com Bluegrass protection catalog (replaced
  by Aura/Arto/3Straps/Big Horn), no successor SKU confirmed by name.
- **Fasthouse** (2 verified via fasthouse.com Shopify): Alloy Mesa LS jersey and
  Fastline 2.0 MTB Pant, both already corrected by a prior pass and now re-fetched
  + promoted. 3 jersey rows (Alloy Cole SS, Alloy Rufio LS, Classic Jersey SS)
  flagged for coordinator review - none of those exact SKU names exist on
  fasthouse.com's current collections (current names are Rally/Mesa/Ronin/
  Sidewinder/Slade/Block for Alloy, and Outland/805/Cartel/Velocity/Mercury for
  Classic) - not verifying possibly-fabricated rows.
- **G-Form** (1 verified via g-form.com Shopify): Pro-Rugged 2 Knee/Shin Guard
  ($89.99->$139.99, sizes corrected to XS-2XL, CE-1621-1 cert added). Pro-X3
  Knee/Vest/Shin and Pro-X shin left unverified - g-form.com rate-limited (429)
  repeatedly; the line may also be transitioning to a newer "X4" generation per
  a "recently viewed" sighting, worth a targeted follow-up.
- **DHaRCO** (3 verified via us.dharco.com, the US-region storefront - dharco.com
  itself defaults to AUD): Tech Party Shirt SS and Race Jersey LS (both re-fetched,
  $82 confirmed), Race Glove ($35->$44.95, sizes S-XL not S-XXL). Trail Glove left
  unverified - no such SKU on the current US men's glove lineup (only Race Glove
  and Gravity Gloves).
- **7iDP** (1 verified via 7idp.com Shopify): Flex Knee (exact price match $84.99,
  sizes confirmed). Flex Suit corrected to `discontinued` - its product URL now
  redirects to the 7idp.com homepage and the current Body collection has no
  full-torso SKU. Flex Knee/Shin Guard left unverified - no distinct product page
  found; the current knee-pad collection has unlabeled items that may or may not
  be it.
- **Dainese** (4 verified via dainese.com/us/en): Trail Skins Air Knee Guard (exact
  match $85), Rival Pro Knee Guard ($120->$135, sizes add XS), Trail Skins Air
  Elbow Guard (exact match $75, promoted from a prior fetch), Trail Skins Air Vest
  ($150->$139, coverage back->chest-back, sizes add XXL, EN1621-2-L1 cert added,
  weight confirmed as the maker's size-L figure).
- **TSG, Zoic**: no new verifications - TSG's ridetsg.com is EUR-only with a prior
  session's explicit policy note against converting (left as-is, not re-litigated);
  Zoic's zoic.com rate-limited (429) on every direct fetch this session, and its
  "Amp SS" jersey may not exist as a current SKU (only Amp LS found).
- **Northwave, Madison**: attempted, not worked - both are EUR/GBP-only maker
  sites with no confirmed USD storefront reached this session (Northwave retailer
  prices agree around $169.99 but that's not a maker-page source).

**Still open for a future pass:** ION (JS-rendered price, wall), the remaining
Scott/TSG/Zoic/Northwave/Madison rows above, and the rest of the ~102-row pool
not reached this session (7mesh, Club Ride, Mons Royale, Loose Riders, and the
untouched tail of G-Form/eyewear-brand rows).

Branch `verify/kit-fanout-3` ready for coordinator review - not pushed, not merged.

## Fanout-4 (branch verify/kit-fanout-4, 2026-07-18, seat 12)

Resumed from the 433/714 baseline (fanout-3's final state, already merged to main).
Worked the target list: 100% retry, ION, Scott remainder, ~29 smaller untouched
clusters, Fasthouse (skipped - no unclear rows since fanout-3's finding already
covers it cleanly). Single commit, `src/kit.js` only.

**Result: 436/714 kit parts verified (61.1%, +3 rows / +0.5pp from the 60.6%
baseline).** All gates green: `node validate.js` (`KIT OK - 714 kit parts, 0
problems (436 verified, 278 unverified)`), `npx vitest run` (27 files, 735
tests), `npx tsc --noEmit` (clean).

**Newly verified (3 rows) + corrections, G-Form Pro-X3 cluster (g-form.com,
via the Exa fetch tool - plain curl/WebFetch both 503/429'd, consistent with
fanout-3's "rate-limited repeatedly" finding; Exa's render got through):**
- `knp-gform-pro-x3` (Pro-X3 Knee): price $70 -> $74.99, sizes corrected to
  XS-2XL (was S-XL). Page states "PPE II certified" without naming an EN1621
  standard number, so no `certs` token added (doesn't meet the safety-claim
  bar per the shg-flyracing-5pivot precedent already in the file).
- `elp-gform-pro-x3` (Pro-X3 Elbow): price $60 -> $59.99 (a prior pass only
  had this via a WebSearch snippet, now independently fetched), sizes
  corrected to add XS.
- `shg-gform-prox3` (Pro-X3 Shin Guard): price $55 -> $44.99 (maker's own
  regular/list price during an active sale).

**Discontinued (4 rows, fetched evidence, not fabricated):**
- `shg-gform-pro` (plain "Pro Shin Guard") and `shg-gform-prox` ("Pro-X Shin
  Guard", prior gen) - both absent from g-form.com's current shin/knee
  collections; superseded by Pro-X3 and the newer Pro-Rugged 2 (and a new
  "X4" line, confirming fanout-3's speculation about a generation
  transition). Price/weight left as prior sample.
- `sht-monsroyale-momentum2` and `sht-monsroyale-virage` (Mons Royale
  Momentum 2.0 / Virage bike shorts): both names are entirely absent from
  monsroyale.com's current men's/women's bike collections, which are now
  built around the "Diversion" range (Diversion Merino Trail Shorts,
  $179.95, is the current bike short - no direct 1:1 successor by name).
  Price/weight left as prior sample.

**Attempted, left unverified (documented so a future pass doesn't re-derive
the same dead ends):**
- **ION** (8 rows: Scrub AMP/Traze AMP/Seek AMP jerseys+shorts+pant):
  ion-products.com sells each product name across many concurrent SKU
  generations (BAT/non-BAT/Mesh_ine/AFT/2.0/year variants), with prices
  spanning $59.95-$99.99 for ostensibly the same jersey - no clean 1:1 match
  to any sample price found, and guessing a variant risks a false
  "verified" price. Genuinely different problem from a fetch wall.
- **100%** (11 rows: Celium/Ridecamp jerseys+shorts, Ridecamp/Teratec/Fortis
  knee+elbow guards, Tarka Vest, Racecraft2 goggle): individual product-slug
  URLs now 404/redirect to the homepage (matches fanout-2's "Shopify .js
  endpoint 503'd" finding, now presenting as dead links instead), and the
  `/collections/*` pages only render their priced product grid via JS - a
  scrape returns just the static filter-facet sidebar. Confirmed the
  Racecraft2 goggle still exists (1 product under the "Racecraft 2" filter)
  but couldn't reach its priced card this session.
- **Scott** (all remaining rows): re-confirmed scott-sports.com is JS-walled
  for US product pages exactly as fanout-3 found - not re-attempted with a
  new tool this pass, left as-is.
- **Club Ride Apparel** (`jsy-clubrideapparel-fuze-ss`,
  `-cadence-ls`): scraped the full current men's shirt/jersey collection -
  neither "Fuze" (a shorts-only name today) nor "Cadence" appears. Left
  unverified rather than removed - the evidence shows current absence, not
  proof the names never existed.
- **Mons Royale, other rows / Loose Riders / TSG / Northwave / Madison**:
  Loose Riders confirmed EUR-only (its "USD" price is an odd auto-converted
  figure, e.g. "48,02 USD", not a real MSRP) - same policy-pending bucket as
  TSG/Northwave/Madison, left alone per the fanout-4 brief.

**Not reached this pass:** 7mesh/Zoic/Handup/Bliss/Demon/EVS remainder rows
(already carry fanout-1/2/3 investigation notes, reproduced dead ends per a
sample re-check, per protocol not re-attempted), G-Form's remaining rows
(knp-gform-pro-x3/vest family - `arm-gform-pro-x3-vest` walled again this
pass, `knp-100-*` etc. are 100%-branded not G-Form).

Branch `verify/kit-fanout-4` ready for coordinator review - not pushed, not merged.
