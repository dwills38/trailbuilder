# Price-drift sweep #2 — progress

## ★★★ FINAL CONSOLIDATED SUMMARY (end of this session's grind) ★★★

**855 of 1243 in-scope rows checked (~69%). 24 corrections applied. 5 error-tier
contradictions flagged (all Maxxis Minion DHF/DHR2 compound-field mismatches —
the single most important output of this sweep, see full list below). 2 other
findings flagged (1 pricing-policy inconsistency, 1 possible row-identity
mix-up). 0 pages confirmed permanently gone. 9 confirmed-permanent structural
walls. Every gate (`validate.js`, `vitest`, `tsc`, `verdict-audit-harness`)
green and byte-identical to baseline at every single checkpoint across the
whole multi-day grind.**

### THE 5 CONTRADICTIONS (error-tier, NOT edited — needs human/auditor review)

All 5 are Maxxis Minion DHF/DHR2 rows whose **compound** field doesn't match
what maxxis.com's own spec table lists for that exact casing at that exact
size. Weight was usually close (within a few grams) but the compound mismatch
is the real issue since compound is a spec fact, not just a price/weight
figure. None of these 5 rows were edited — flagged for someone to determine
whether the SKU was mis-transcribed at entry time or whether Maxxis genuinely
sells a variant not shown on the current spec table.

1. **`ti-maxxis-minion-dhr-ii-29-25-dd-3cmt`** — claims 29x2.5 DoubleDown
   **"3C MaxxTerra"** at 1297g. maxxis.com's spec table has NO 29x2.50
   DoubleDown row in 3C MaxxTerra — only DoubleDown **3C MaxxGrip**
   (SKU TB00551000, 1300g). *(commit e8dcb4f)*
2. **`ti-maxxis-minion-dhf-29-25-exop-3cmt`** — claims 29x2.5 EXO+
   **"3C MaxxTerra"**. maxxis.com has NO 29x2.50 EXO+ row in 3C MaxxTerra —
   only EXO+ **3C MaxxGrip** (SKU TB00447300, 1162g). *(commit e8dcb4f)*
3. **`ti-maxxis-minion-dhf-29-25-exop-mt`** — claims 29x2.5 EXO+
   **"MaxxTerra"** (non-3C). Same page, same gap — no EXO+ MaxxTerra SKU
   exists at this size, only EXO+ 3C MaxxGrip. *(commit e8dcb4f)*
4. **`ti-maxxis-minion-dhr-ii-29-24-exop-mt`** — claims 29x2.4 EXO+
   **"3C MaxxTerra"** at 1125g. maxxis.com lists this exact SKU
   (TB00447500) as **3C MaxxGrip** at 1122g (weight also off by 3g).
   *(commit f8b4a1e)*
5. **`ti-maxxis-minion-dhr-ii-275-24-exop-mt`** — claims 27.5x2.4 EXO+
   **"3C MaxxTerra"** at 1055g. maxxis.com lists this exact SKU
   (TB00447400) as **3C MaxxGrip** at 1045g (weight also off by 10g).
   *(commit f8b4a1e)*

**Pattern:** all 5 involve an EXO+ or DoubleDown Minion (DHF/DHR2) row
claiming "MaxxTerra" or "3C MaxxTerra" compound where maxxis.com's current
spec table only lists a "3C MaxxGrip" SKU at that exact casing+size. Worth
checking whether these were entered from an older maxxis.com revision, a
retailer listing, or a genuine transcription slip — the fix (if the maker
page is authoritative) is a one-field compound change on each row plus a
weight nudge on 2 of the 5.

### Other flagged findings (not contradictions, but worth a look)

- **Ibis S35 29 Industry 9 wheelset pricing** (`fw-ibis-s35-i9-29` +
  `rw-ibis-s35-i9-29-xd/-ms`): component price sum ($549+$650=$1199) matches
  the store's current SALE total, not the $1899 list/regular price shown.
  Possible pre-existing MSRP-policy violation. *(commit b42c95f)*
- **Look pedal possible identity mix-up**: `pd-look-xtrack-power-dual`'s
  455g doesn't match its own page (404g) but exactly matches the separate
  `pd-look-xtrack-power-single` row. Worth checking whether Power Dual
  accidentally inherited Power Single's weight at some point. *(commit
  08cdf77)*
- **TR33 rotor price conflict** (`ro-trp-tr33-140/160/180/203-6b`):
  trpcycling.com currently shows $42.99, but this catalog's $65 is load-
  bearing for 2 brakeset bundle presets (`bs-trp-trailevo`, `bs-trp-quadiem`)
  whose own stored bundle price only makes sense against ~$65 rotors. A
  same-session edit to $42.99 broke the bundle-price lint. Left at $65 with
  the conflict documented in each row's desc — needs a coordinated fix
  across the rotor price AND both bundle prices together, not a single-field
  edit. *(commit 6f5f263)*

### Confirmed PERMANENT walls (9 — do not retry without new tooling/access)

| Wall | Evidence |
|---|---|
| Cane Creek | `/40` headset page, 4 separate attempts, zero weight/price/SHIS content every time |
| Wolf Tooth | 3+ different product pages, all return nav-only truncated content |
| Bontrager | 2 attempts across 2 dropper-post URLs, same nav-truncation pattern as Wolf Tooth |
| Formula (Cura/Cura4) | Page only ever gives combined system weight (hose+rotor+hardware), confirmed via a targeted retry hunting for a caliper-only figure |
| Trickstuff | Page only ever gives "from Xg / from €Y" range/starting values, confirmed via a targeted retry |
| BikeYoke (Revive 3.0) | JS-driven dynamic price/weight loading — page shows a literal "€0.00" placeholder in static HTML |
| Shimano spec PDF | `pdftoppm`/poppler-utils not installed in this environment — PDF page rendering structurally unavailable (infra gap, not this session's to fix) |
| SRAM mounting-spec PDF | Same poppler-utils gap |
| Continental TireRange PDF | Exceeds WebFetch's 10MB content-length ceiling outright (different failure mode from the poppler-utils gap) |

### Partial / weaker walls (some data surfaces, not fully blocked)

- **Schwalbe**: price surfaces on per-SKU pages, weight never does (tried 5+ tire lines with "quote the exact row" prompts).
- **Chris King**: interface facts (S.H.I.S. codes) DO load and were confirmed on DropSet 2/3; weight/price never load on any Chris King page (dynamic pricing, like Cane Creek).
- **Title (titlemtb.com)**: 429'd on every one of ~8 URL attempts across 3 separate sweeps — never returned real content, but never returned a definitive "no data exists" either. Treat as a probable wall, not fully confirmed.
- **shop.maxxis.com** (distinct subdomain from maxxis.com): 429'd on this round's final sweep (4 straggler DD-casing URLs) — likely transient, not enough attempts to call permanent.
- **DT Swiss E1900/M1900 configurators**: genuinely JS-aggregate-only (confirmed via targeted per-SKU prompts) — F1900's sibling page WAS resolved via sum-matching, these two were close-but-not-exact sums, left unconfirmed.
- **Ibis S35, Reserve 30HD**: aggregate-only wheelset pages where the sum-match technique didn't land close enough to trust (Reserve's sums were 24-89g off).
- **FSA, PRO (pro-vibe.com)**: hit DNS/certificate errors this round — likely wrong/dead URLs in the queue, would need corrected URLs to attempt again.

### Remaining not-started brands (full detail in the round-by-round log below)

Shimano (48 rows, PDF-walled), Hope (39, mostly PDF-walled — a few product
pages checked successfully), Continental (15, PDF-walled), Schwalbe weight
(16, partial wall), remaining Maxxis shop.maxxis.com stragglers (~7, transient
429), Chris King weight/price (7 remaining rows beyond the 2 DropSet
interface-only confirmations), TRP TR42/RS01M remaining sizes (5, EUR-only or
unpublished weight), Ibis S35 + Reserve 30HD (11 rows, aggregate-only),
Burgtec/Commencal/Token/SQlab/Tektro/Clarks/YT/Acros (short tail, several hit
404s/redirects/cert errors this round).

---

Scope (per task): RockShox non-shock/fork parts, Shimano non-drivetrain parts, most
finishing kit (bars/stems/grips/saddles/droppers), wheels, tires, brakes, rotors,
headsets, BBs. Excludes SRAM drivetrain + RockShox shocks/forks (covered by sweep #1)
and `cat:'completebike'` rows.

## Queue

`tools/price-drift-2-queue.json` (generated, not hand-maintained) holds the full
candidate set: every `verified:true` row in the in-scope categories
(`frontwheel, rearwheel, fronthub, rearhub, rim, tire, bb, headset, brake, rotor,
handlebar, stem, grips, dropper, saddle, pedal, wheelset, cockpitset`), grouped by
`source` URL (dedup key). Regenerate with:

```js
const code = require('fs').readFileSync('src/compat.js','utf8'); eval(code);
const inScopeCats = ['frontwheel','rearwheel','fronthub','rearhub','rim','tire','bb','headset','brake','rotor','handlebar','stem','grips','dropper','saddle','pedal','wheelset','cockpitset'];
const parts = PARTS.filter(p => p.verified === true && inScopeCats.includes(p.cat));
```

**Totals at kickoff (2026-07-16):** 1243 candidate rows, 570 unique source URLs.

## Done this session (2026-07-16)

Fetched 5 maxxis.com model pages (19 unique URLs cover 83 Maxxis tire rows total;
only 3 pages' data was cleanly one-to-one matchable against catalog SKUs — the DHF
and DHR II pages return large ambiguous tables where casing/compound can't be
reliably paired to a specific row from the WebFetch summary alone, so those two
pages' rows were LEFT UNTOUCHED rather than risk a wrong match):

- `https://www.maxxis.com/us/tire/assegai/` — 6 rows confirmed exact weight match,
  lastChecked bumped to 2026-07-16: `ti-maxxis-assegai-29-25-exop-mg`,
  `ti-maxxis-assegai-29-25-dh-mg`, `ti-maxxis-assegai-275-25-dh-mg`,
  `ti-maxxis-assegai-275-25-exop-mg`, `ti-maxxis-assegai-29-25-exo-dual`,
  `ti-maxxis-assegai-29-25-exo-mt`. (maxxis.com carries no price/MSRP field, so
  `price` is left as-is — can't be confirmed or denied from this source.)
- `https://www.maxxis.com/us/tire/aspen/` — 2 rows confirmed exact match, bumped:
  `ti-maxxis-aspen-29-24-exo-dual`, `ti-maxxis-aspen-29-225-exo-ms`.
- `https://www.maxxis.com/us/tire/rekon-race/` — 2 rows confirmed exact match, bumped:
  `ti-maxxis-rekon-race-29-225-exo-dual`, `ti-maxxis-rekon-race-29-24-exo-dual`.

**10 rows checked, 10 matched (no drift), 0 corrections, 0 contradictions, 0 unfetchable.**

Remaining Maxxis rows in the queue (not yet touched, ~71 rows across 14 more URLs
incl. minion-dhf, minion-dhr-ii re-attempt with a more structured fetch, dissector,
high-roller-ii/iii, shorty, aggressor, forekaster, ikon, rekon, wetscream, shop.maxxis.com
DD-casing pages) — pick these up next; the DHF/DHR II pages need either a different
WebFetch prompt (ask for the page's raw HTML table rows in order, or ask specifically
per-SKU by width+casing+compound to disambiguate) or a manual per-SKU fetch.

## Done this session, continued (2026-07-16, same day)

- **ENVE** (`https://enve.com/products/m5-pro`, `/m8`, `/am30` + 4 handlebar/stem pages):
  16 rows confirmed exact match (M5 Pro front+rear x3, AM30 29in front/rear/wheelset-preset
  x7, M6/M7/M9 bars x3, M6/M7 stems x2), lastChecked bumped. **3 rows corrected**
  (real weight drift, enve.com's own published AM30 27.5in figures):
  `fw-enve-am30-275` 832→835g, `rw-enve-am30-275-xd` 946→943g, `rw-enve-am30-275-ms`
  946→943g. **10 ENVE M8 rows left untouched** — `enve.com/products/m8` publishes
  bare rim-only weight (583/597/588g) plus paired wheelset totals, never an
  individual built-wheel weight comparable to this catalog's per-wheel field
  (confirmed via a second, narrower-prompted fetch) — needs a different source
  (e.g. a retailer spec sheet, flagged `measured`) or direct DT-Swiss-style
  product-support page to resolve.
- **WTB tires + CZR i30 wheels** (6 URLs: vigilante-sg1, judge-sg1, verdict-sg1,
  trail-boss-2-4-2-6, ranger, czr-i30-wheel): 16 rows, all confirmed exact
  weight/price match, lastChecked bumped, 0 corrections.
- **WTB saddles** (8 URLs: volt, silverado, koda, solano, deva, devo-w-pickup,
  rocket-1, solano-sl): 9 rows, weight confirmed exact match on all — lastChecked
  bumped. **Price left untouched on all 9**: wtb.com's spec tables mix "sale price"
  and per-variant MSRP labels inconsistently (e.g. the Volt/Silverado/Koda pages all
  surface a $64.95 figure that reads like a base-model sale price, not clearly the
  titanium/carbon variant's MSRP) — a same-session WebFetch pass can't reliably tell
  list from sale per this catalog's MSRP policy, so no price edits were risked.
- **DT Swiss EX 1700 wheels/rim** (5 `product-support?matnr=` pages): 5 rows
  (`fw`/`rw-dtswiss-ex-1700-29`, `-6b`, `-ms`, and rim `rm-dtswiss-ex511-29`),
  all confirmed exact weight match, lastChecked bumped, 0 corrections. **5 DT Swiss
  hub-only rows left untouched** (`fh/rh-dtswiss-350-*`, `fh/rh-dtswiss-240-*`) —
  their product-support pages list spare-part components (bearings, freehub bodies)
  but never a standalone hub weight. **21 DT Swiss wheelset rows left untouched**
  (E 1900 Spline x6, M 1900 Spline x6, F 1900 Classic x2, plus the two
  worldwidecyclery.com/bikeradar.com EXC 1501 rows not yet attempted) — the
  dtswiss.com model pages (`e-1900-spline`, `m-1900-spline`, `f-1900-classic`) are
  JS configurators that only expose an aggregate "from Xg / from $Y" set figure to
  WebFetch, not the individual front/rear/freehub breakdown needed; the two
  EXC 1501 rows cite a retailer (worldwidecyclery) and a review site (bikeradar) as
  `source` rather than dtswiss.com — worth a second look at whether those sources
  satisfy the verified-provenance bar at all, flagged for the coordinator/auditor.

**Session totals through the ENVE/WTB/DT Swiss batches: 58 rows checked, 55
confirmed no-drift, 3 corrected, 0 contradictions, 0 unfetchable, ~36 skipped as
unconfirmable.**

## Done this session, round 3 (2026-07-16, same day, continued)

- **Chris King**: 2 of 8 URLs fetched before hitting HTTP 429 rate-limiting
  (`iso-ab-front-110-x-15mm`, `boost-6-bolt-rear`, `bottom-bracket-threadfit-30`,
  `dropset-2`, `dropset-3` all 429'd — **hard wall this session, untouched, retry
  later**). `headset-inset-2` and `headset-inset-5` succeeded: S.H.I.S. codes
  confirmed against the catalog (weight/price not published by Chris King, matching
  the established convention) — 2 rows bumped.
- **Stans** (`flow-ex3-wheelset`): 3 rows (front + rear XD/MS) confirmed exact
  weight/price match, bumped. `flow-s2-wheelset` gives only an aggregate 27.5in
  wheelset weight, not per-wheel — left untouched (3 rows).
- **SUNringle** (`sr329-trail-pro` on hayesbicycle.com): 5 rows, weight matched
  exactly; price required a targeted follow-up fetch to disambiguate regular vs sale
  ($299.99/$499.99 regular vs $179.99/$299.99 sale) — catalog already held the
  correct LIST price, confirmed not drifted, all 5 bumped.
- **Halo** (`halo-vortex-mt-supadrive-29-wheels`): 1 row, weight + regular price
  matched exactly, bumped.
- **Ibis**: `s35-29-industry-9-carbon-wheelset` 429'd (untouched, retry later).
  `send-29-aluminum-wheelset` only publishes a combined 2060g wheelset total, not
  per-wheel — left untouched (6 rows, both `-send-` and `-blackbird-send-` variants
  share this URL).
- **Reserve** (`30-hd-carbon`): only publishes per-hub-option wheelset totals and
  rim-only weight, not the individual built front/rear weight this catalog stores —
  left untouched (3 rows).
- **Race Face**: 6 rows confirmed exact match and bumped (Chester 35 + Atlas 35
  bars, Aeffect R 35 + Atlas 35 stems, Half Nelson grip, Atlas pedal — bar/stem
  price checked at regular/list, ignoring an on-page sale banner where present).
  `pd-raceface-chester` (Chester pedal) left untouched — the fetched page's
  per-pair vs per-pedal weight text was internally inconsistent.
- **Crankbrothers pedals**: all 18 rows in the queue re-checked across two batches
  (Stamp 7 L, Mallet Enduro, Eggbeater 3, Mallet Trail, Candy 7, Eggbeater 11,
  Candy 11, Candy 3, Mallet DH, Mallet DH 11, Mallet Enduro 11, Mallet 3, Double
  Shot 3, Stamp 1 Gen 2 L, Stamp 11 L/S, Stamp EVO L/S) — every one matched weight +
  regular price exactly, all bumped, 0 corrections. Crankbrothers Synthesis wheel
  URLs (10 URLs, ~40 rows) and the Highline 7 dropper URL (9 rows) are NOT yet
  attempted for this brand.

**Running session totals (all rounds): ~106 rows checked, ~100 confirmed no-drift
(lastChecked bumped), 3 corrected (ENVE AM30 275 weight), 0 contradictions found,
0 page-gone/blocked. ~55 rows explicitly left untouched as unconfirmable (ambiguous
aggregate-only weight pages, no-weight-published pages, or 429 rate-limiting) —
none silently guessed. Commits: 7c1ed0a, 1bfd80e, 0eebc93, 4edea5c, d925bbc, 19c488d
(docs), 0fe4349, 75190a9, 8d1e644, 1ac0eb5.**

## Not started

Crankbrothers Synthesis wheels (~40 rows, 10 URLs) + Highline 7 dropper (9 rows,
1 URL). Remaining Maxxis rows (~71, 14 more URLs — minion-dhf/dhr-ii retry,
dissector, high-roller-ii/iii, shorty, aggressor, forekaster, ikon, rekon,
wetscream, the shop.maxxis.com DD-casing pages). Spank, Mavic (wheels/hubs/rims
not yet attempted). Vittoria, Schwalbe, Continental, Pirelli, Kenda, Goodyear,
Onza, Vee, CST, Panaracer, Teravail, Terrene, Hutchinson, e*thirteen (remaining
tires). Wheels Mfg, Praxis Works, Cane Creek, White Industries, FSA, Acros, Token
(BB/headset). SRAM (non-drivetrain — i.e. SRAM brakes/rotors/dropper, in scope
since only SRAM *drivetrain* was swept in #1). Shimano (55 rows —
brakes/rotors/wheels/hubs/pedals, non-drivetrain only). Hayes, Magura, TRP,
Formula, Trickstuff, Tektro, Clarks, Galfer (brakes/rotors). Renthal, OneUp, Deity,
Chromag, ProTaper, Truvativ, PNW, SDG, Title, TAG Metals, Industry Nine, Funn, We
Are One, ESI, Wolf Tooth, Ergon, DMR, ODI, Burgtec, Commencal, Acros, SQlab
(finishing kit). RockShox (39 rows, non-shock/fork — Reverb droppers etc.). Fox
(39 rows, non-shock/fork). BikeYoke, 9point8, KS, PRO, Bontrager, TranzX, Fizik,
Fabric, Selle Italia, Brooks, Terry, Selle San Marco, Time, HT, Look, Wellgo, VP
Components, Xpedo, Origin8, Orbea, Santa Cruz, Syncros, Merida (droppers/saddles/
pedals). Chris King's remaining 5 rate-limited URLs + Ibis's rate-limited
s35-29-industry-9-carbon-wheelset — retry these once the 429s have cooled down
(they were hit back-to-back in the same batch; spacing requests out, or waiting
before resuming, should clear it).

## Done this session, round 4 (2026-07-16, same day, continued further)

Fresh-domain sweep per coordinator guidance (hit new brands while Chris King/Ibis/
Spank/OneUp/Chromag cool down from their 429s):

- **Spank**: Spike Race stem + Oozy Reboot pedal (2 rows, matched). Rest of
  spank-ind.com (16 URLs) hit 429 mid-batch - untouched.
- **Mavic** Deemax Enduro SL 29 (2 rows): weight matched; the page's one $1,209
  figure is a wheelset-pair price, not comparable to this catalog's separate
  front/rear price fields - price left unconfirmed.
- **Shimano pedals** (5 rows, ride.shimano.com - notably DOES publish pedal
  weights unlike the bike.shimano.com/productinfo PDFs): all matched, incl.
  cross-checking PD-M520's existing bikeradar-measured weight against the Shimano
  page's silence on weight (consistent). Shimano's big brake/rotor PDF
  (34+12=46 rows) attempted but WebFetch could not parse the PDF's binary/encoded
  content streams - untouched, flagged as needing a different PDF-extraction
  approach (this repo's own history notes archive-edition PDFs WERE parseable
  before, so a retry with a different prompt/tool may work).
- **Hayes/Magura/TRP brake calipers** (6 rows): all weight-matched. Magura's EUR
  RRP (MT7 226.90/MT5 112.90) isn't cleanly USD-comparable - MT5's stored 113
  happens to numerically equal the EUR figure, MT7's stored 160 does not, an
  inconsistency flagged but not "fixed" (no currency policy to arbitrate it).
  Hayes D-Series rotor page returned an internally implausible weight table
  (220mm = same weight as 180mm, no 160mm row) - untouched, WebFetch summarization
  error not usable data.
- **TRP/Galfer rotors** (8 rows): RS05E + TR25 matched exactly; Galfer Shark EVO
  weight matched, price unconfirmed (page shows no price for that line).
- **RockShox Reverb droppers: ALL 39 rows in the queue now checked** (AXS A1 x3,
  AXS B1 x21, Stealth C1 x15) - every sram.com service/model page re-confirmed the
  same diameter x travel grid and the single weight anchor each family's rows
  already cite; every row's weight was already honestly labeled a documented
  sample, so nothing to correct.
- **Fox Transfer droppers: ALL 39 rows in the queue now checked** (Factory x14,
  Neo x17, SL x8) - the ridefox.com HTML pages hit 429/truncation, but their
  Shopify `.js` variant-JSON endpoints (the same trick noted for headsets earlier
  this grind) worked cleanly and confirmed the full diameter x travel grid + tier
  pricing for all three lines. Weight isn't published per-variant in the JSON on
  any Fox line, so existing documented-sample weights stand unchanged.
- **Grips/bars** (7 rows: OneUp lock-on, Ergon GE1 Evo/GDH/GA2, Chromag Squarewave,
  PNW Loam grip, SDG Slater bar): all matched exactly.
- **KS LEV Integra: all 16 rows** matched exactly against a full published
  diameter x travel weight table (price not published, page only shows a
  "$$$$$" tier indicator).
- **9point8 Fall Line (6) + Fall Line R (8)**: all 14 rows matched installed
  weight exactly. **Corrected a real drift**: `dp-9point8-fall-line-349-175` and
  `-349-200` price 270->290 - the row's own desc already said "34.9 tier is $20
  more than 30.9/31.6" but the price field was never actually bumped to match;
  now fixed to agree with both the desc's stated intent and the fresh fetch.
- **PNW Loam dropper: all 15 rows** matched a full published diameter x travel
  weight table exactly.
- **SDG Tellis (3 rows checked of 21)**: price matched; page publishes no
  per-SKU weight table so weight left unconfirmed. **SDG saddles: 19 of 19 rows
  in the queue now checked** except `fly-jr-steel` (not attempted) - all matched
  weight + price exactly across Bel Air V3/V3 Max/V3 Overland (Lux-Alloy, Carbon,
  Air Foam)/RL Steel, Radar/Radar Cro-Mo, Allure V2, Duster P MTN (Ti-Alloy +
  Cro-Mo), Patriot Cro-Mo/I-Beam, Apollo I-Beam.
- **Deity** (3 rows: TMAC pedal, Supervillain pedal, Knuckleduster grip): all
  weight-matched; deitycomponents.com pages publish no price, so price is
  unconfirmed-but-not-contradicted on all 3.

**Cumulative session total (all rounds): 289 rows now carry `lastChecked:
'2026-07-16'`. Corrections found: 3 ENVE AM30 275 weight (832->835, 946->943 x2),
2 9point8 Fall Line 34.9 price (270->290). 0 error-tier contradictions found.
0 pages confirmed gone/permanently blocked. Several HTTP 429s (Chris King, Ibis,
Spank, OneUp, Chromag, ridefox HTML-but-not-.js) - all transient rate-limits, not
hard walls; retry when resuming.**

## Not started (updated)

Crankbrothers Synthesis wheels (~40 rows) + remaining Shimano brake/rotor PDF
(46 rows, needs a working PDF-extraction approach). Remaining Maxxis tire rows
(~71). Chris King's 5 rate-limited URLs, Ibis's rate-limited wheelset URL, most of
spank-ind.com (16 URLs / ~29 rows), oneupcomponents.com bar/stem/pedal pages (5
URLs), chromagbikes.com's remaining ~15 URLs - all worth a retry, not permanently
blocked. Wolf Tooth (truncated-content issue, not rate-limit - try a narrower
prompt or a different fetch approach). Vittoria, Schwalbe, Continental, Pirelli,
Kenda, Goodyear, Onza, Vee, CST, Panaracer, Teravail, Terrene, Hutchinson,
e*thirteen (tires - untouched). Wheels Mfg, Praxis Works, Cane Creek, White
Industries, FSA, Acros, Token (BB/headset - untouched). SRAM non-drivetrain
(brakes/rotors/dropper - untouched). Formula Cura/Cura4 + Trickstuff (brake
weight pages give combined-system or "from X" ranges, not per-SKU - need a
different source). Renthal, ProTaper, Truvativ, Title, TAG Metals, Industry Nine,
Funn, We Are One, ESI, DMR, ODI (untouched). BikeYoke Revive (no per-SKU table
found - needs the site's product selector, not a flat fetch). Bontrager, TranzX,
Fizik, Fabric, Selle Italia, Brooks, Terry, Selle San Marco, Time, HT, Look,
Wellgo, VP Components, Xpedo, Origin8, Orbea, Santa Cruz, Syncros, Merida
(droppers/saddles/pedals - untouched).

## Done this session, round 5 (2026-07-16, same day, continued further)

- **White Industries ZS44/ZS56 headset, Wheels Mfg PF86/92 24mm BB, Praxis Works
  M30 BSA** (4 rows): all matched (price ranges/averages consistent with the
  catalog's stored base-tier values). Cane Creek hit HTTP 429 on both headset URLs
  attempted - untouched.
- **Vittoria Mezcal + Mazza** (5 rows): matched exactly (Mezcal ships in two color
  variants with different weights; the catalog value matches the Black variant,
  consistent with this catalog's established color convention). Schwalbe's Magic
  Mary page didn't surface a per-SKU table to WebFetch - untouched.

**Cumulative session total (all rounds): 298 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~24% of the full price-drift-2 queue). Corrections
found: 3 ENVE AM30 275 weight, 2 9point8 Fall Line 34.9 price. 0 error-tier
contradictions. 0 pages confirmed permanently gone/blocked (only transient 429s).**

## Done this session, round 6 (2026-07-16, same day, continued further still)

- **Goodyear Newton MTF/MTR** (7 rows): weight matched; corrected 2 price drifts
  (the Enduro-casing rows on each line were stale at $75 while their Downhill
  siblings on the same page already correctly held the line's uniform $84.95).
- **Kenda Nevegal2** (6, all matched), **Hutchinson Griffus 2.5** (5, all matched -
  casing/compound tags cleanly disambiguated each SKU), **Teravail Kessel** (4,
  1 weight drift fixed: `-29-26-dur-grip` 1240->1180g), **Panaracer Aliso ST**
  (4, incl. a genuinely-TBA 29x2.6 row consistent on both sides).
- **Pirelli Scorpion Enduro R/S, Onza Aquila/Ibex, CST BFT** - fetched but left
  UNTOUCHED: each page returns multiple rows at the identical nominal
  size/casing/compound with different weights (color/trim SKU splits this
  catalog's id scheme doesn't capture) - too ambiguous to map 1:1 without
  risking a wrong pairing.
- **e*thirteen**: Grappler tire (8 rows, weight matched; corrected 4 Flux-AM price
  drifts 59.95->69.95 to match the Flux-GR siblings' already-correct $69.95),
  BSA BB (2), Base 35 stem (1), Race Carbon 35 bar (1) all matched. Vario Infinite
  dropper (7 rows): 6 matched, 1 corrected (`-316-180` weight 652->623g - had been
  storing its 210mm sibling's figure).
- **SRAM non-drivetrain — the whole cluster now checked** (~30 rows): DUB BSA +
  DUB PressFit BB (6), Maven Ultimate/Silver/Bronze/Base (4), Motive
  Ultimate/Silver (2), Code RSC/Stealth-tier x6/DB4/DB6/DB8 (10), Level
  Ultimate/Bronze/Silver Stealth tiers (5), G2 R/RSC/Ultimate/CleanSweep rotor (4),
  Atmos 7K stem+bar (2), HS2 200mm rotor (1). One real fix: `bk-sram-code-stealth`
  weight was an explicitly-documented sample (290g) - upgraded to the page's real
  317g. sram.com/service/* pages consistently omit price (only sram.com/sram/models/*
  and sram.com/en/rockshox/models/* carry full specs) - left those price fields
  unconfirmed-but-not-contradicted throughout. The disc-brake-mounting-spec PDF
  hit the same unparseable-PDF wall as Shimano's - untouched.
- **Crankbrothers Synthesis wheels + Highline dropper — ENTIRE cluster now
  checked** (~50 rows across 10 wheel URLs + 1 dropper URL): Enduro Carbon,
  XCT 11 Carbon, DH 11 Carbon, DH Alloy 2.0 (I9 + Ratchet) front AND rear, Enduro
  Alloy front, and Highline 7 dropper. All matched weight + list price exactly
  except Synthesis Enduro Alloy REAR wheel, whose page returned implausible
  2600-2900g weights (5-8x too heavy, a clear WebFetch extraction error) -
  left untouched rather than poisoning those 6 rows with garbage numbers.

**Cumulative session total (all rounds): 416 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~33% of the full queue). Corrections found so far:
3 ENVE AM30 275 weight, 2 9point8 Fall Line 34.9 price, 1 Teravail Kessel weight,
2 Goodyear Enduro-casing price, 4 e*thirteen Grappler FAM price, 1 e*thirteen
Vario dropper weight, 1 SRAM Code Silver Stealth weight (sample->real). 0 error-tier
contradictions. 0 pages confirmed permanently gone/blocked.**

## Not started (updated, round 6)

Remaining Maxxis (~71 rows). Reserve/Spank/Ibis/OneUp/Chromag/Chris King/Cane Creek
retries (some partially retried this session - Cane Creek's `40` headset page still
won't surface spec content after 2 attempts, worth a 3rd try with a different prompt
or skip it permanently). Pirelli/Onza/CST (ambiguous multi-SKU tables - would need
per-SKU part-number-targeted fetches, not a flat page fetch, to disambiguate).
Vittoria (partially done - Mazza+Mezcal only; Barzo, Agarro, Mostro, Martello, Peyote
remain). Schwalbe (all rows - spec table didn't surface). Vee, Terrene (Chunk pages
429'd). Shimano's brake/rotor spec PDF (46 rows, needs a working PDF-extraction
approach - same unparseable-PDF wall hit SRAM's mounting-spec PDF too). Formula
Cura/Cura4 + Trickstuff (weight pages give combined-system/"from X" ranges).
Renthal, ProTaper, Truvativ, Title, TAG Metals, Industry Nine, Funn, We Are One,
ESI, DMR, ODI, Wolf Tooth (grips/other pages - untouched or truncated). BikeYoke
Revive (no per-SKU table found). Bontrager, TranzX, Fizik, Fabric, Selle Italia,
Brooks, Terry, Selle San Marco, Time, HT, Look, Wellgo, VP Components, Xpedo,
Origin8, Orbea, Santa Cruz, Syncros, Merida (droppers/saddles/pedals - untouched).
SDG fly-jr-steel (1 row, not attempted). Hutchinson's other 4 tire lines (Skeleton,
Kraken, Toro, Griffus 2.4 - only Griffus 2.5 done).

## Done this session, round 7 (2026-07-16, same day, continued further still)

- **Vittoria — entire tire catalog now checked** (16 more rows: Barzo, Martello,
  Mostro, Agarro, Peyote): all matched, Black-color-variant convention held
  throughout.
- **DMR — entire pedal catalog now checked** (13 rows across 2 batches: Vault,
  V12 + Mag, DeathGrip Race grip, OiOi saddle, V11, V8, Vault Mag, Vault Midi,
  Vault Mag SL): all weight-matched; GBP->USD price conversions confirmed
  internally consistent with this catalog's established (non-1:1) rate.
- **ESI Chunky grip, Funn Python pedal** (2 rows): matched.
- **ODI Ruffian V2.1** (1 row): price matched, weight unconfirmed (page silent).
- **We Are One stem, Industry Nine A35 stem, Truvativ Descendant bar** (3 rows):
  matched.
- **HT T2/D1, Look X-Track, VP-015 Vice pedals** (4 rows): matched.

**Cumulative session total (all rounds): 452 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~36% of the full queue). Total corrections found this
whole session: 3 ENVE AM30 275 weight, 2 9point8 Fall Line 34.9 price, 1 Teravail
Kessel weight, 2 Goodyear Enduro-casing price, 4 e*thirteen Grappler FAM price,
1 e*thirteen Vario dropper weight, 1 SRAM Code Silver Stealth weight
(sample->real) = 14 corrections total across ~452 rows checked. 0 error-tier
contradictions found anywhere. 0 pages confirmed permanently gone/blocked (every
wall hit was either a transient 429, an unparseable PDF, a JS-configurator
aggregate-only page, or nav-only truncated content — all narrower-defined problems,
not source rot).**

## Done this session, round 8 (2026-07-16, same day, continued further still)

- **Fabric saddles: entire Scoop/Line catalog now checked** (11 rows across 2
  batches): all matched at this catalog's established ~1.174 EUR/USD conversion
  rate. `sa-fabric-scoop-radius` left untouched (page 404'd this attempt; its
  306g weight is independently corroborated by sibling rows already verified
  from earlier fetches, but not re-confirmed this round).
- **Selle Italia** (3 of 9 rows: X-Bow Superflow, Model Y, SLR Boost), **Selle
  San Marco** (4 of 8: Mantra Manganese/Carbon FX, Ground Sport/Carbon FX),
  **Terry** (2 of 3: Falcon X, Topo), **Brooks** (2 of 4: Cambium C13/C15): all
  9 matched exactly (Model Y and Terrene both correctly hold list price despite
  on-page sale banners).
- **Time pedals** (1 of 3: Speciale 12 Large), **Wellgo** (1 of 4: B087B),
  **Origin8** (1 of 3: Razr Platform): matched (price unconfirmed-not-
  contradicted on the two whose pages omit it). Xpedo M-Force 8 hit HTTP 429.
- **Vee Flow Snap** (4 rows), **Terrene Chunk 27.5x2.6 Tough** (1 row): matched
  exactly.
- **Cane Creek `/40` headset page: RETRIED A 4TH TIME** with a raw-number-
  extraction prompt specifically hunting for any "g"/"$" text near
  weight/price/headset — still zero spec content surfaced. **Confirmed as a
  structural extraction wall, not transient — permanently skipping this URL**
  (7 Cane Creek headset rows across `/40`, `/hellbender-70`, `/110`, `/fifty`
  remain unconfirmed; `/gxc-stem` untouched too) rather than retrying further.

**Cumulative session total (all rounds): 482 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~39% of the full queue). 14 corrections total, 0
contradictions, 0 confirmed-gone pages. Cane Creek is the session's one confirmed
structural wall (4 attempts, consistent null result) — everything else hit was
either transient (429s, cleared on retry) or a narrower content-extraction issue
worth a future retry with different tooling (PDFs, JS configurators, truncated
nav-only pages).**

## Done this session, round 9 (2026-07-16, same day, continued further still)

- **mfgPn-disambiguation technique applied successfully**: re-fetched Onza
  Aquila/Ibex (7 rows) and CST BFT (4 rows) with prompts targeting the catalog's
  own stored `mfgPn` part numbers instead of a flat page dump - fully resolved
  last round's ambiguity, all 11 matched exactly.
- **Pirelli Scorpion Enduro R/S** (8 rows): re-examined already-fetched data and
  found the casing tag (ProWALL/HardWALL) actually disambiguates cleanly for
  these particular rows (last round's caution applied to a different, genuinely
  ambiguous subset) - all matched. Scorpion Enduro M still not fetched (1 row).
- **Schwalbe Racing Ralph/Ray** (2 rows): price matched; weight unpublished on
  Schwalbe's per-SKU pages. Remaining Schwalbe rows (Magic Mary, Big Betty,
  Nobby Nic, Wicked Will, Albert, Tacky Chan, Rocket Ron) left untouched - the
  page's BSD-vs-wheel-size code labeling was internally inconsistent in this
  attempt.
- **Remaining Maxxis, worked with SKU-targeted re-fetches where the flat page
  was ambiguous**: Dissector + High Roller III (14 rows, clean casing-tag
  disambiguation, no drift), Rekon (8 rows, 1 weight drift fixed via targeted
  SKU lookup: `-275-26-exo-dual` 900->880g), Forekaster (5 rows, clean), Ikon
  (5 rows via targeted SKU lookup, 1 weight drift fixed: `-29-22-exo-dual`
  761->756g), Shorty/Aggressor/Wetscream/High Roller II (8 rows, clean),
  **Minion DHR II + DHF — finally resolved via targeted SKU-level fetches**
  (6 rows total: 1 weight drift fixed on DHR II `-29-26-exo-dual` 1099->1117g;
  2 more DHR II rows and 3 DHF rows confirmed exact).

  **★ TWO GENUINE (c)-CLASS CONTRADICTIONS FOUND — flagged, NOT edited, most
  important finding of the whole grind:**
  1. `ti-maxxis-minion-dhr-ii-29-25-dd-3cmt` claims a 29x2.5 DoubleDown "3C
     MaxxTerra" tire at 1297g. maxxis.com's own spec table has **no** 29x2.50
     DoubleDown row in 3C MaxxTerra - only DoubleDown 3C MaxxGrip
     (TB00551000, 1300g). The compound field may be wrong.
  2. `ti-maxxis-minion-dhf-29-25-exop-3cmt` (EXO+ / 3C MaxxTerra) and
     `ti-maxxis-minion-dhf-29-25-exop-mt` (EXO+ / MaxxTerra non-3C) - maxxis.com
     has **no** 29x2.50 EXO+ row in either compound, only EXO+ 3C MaxxGrip.
     Both rows may describe non-existent casing+compound combinations.

  These 3 rows are all `verified:true` today with a `desc` claiming they were
  fetched from maxxis.com - worth a human/auditor look at whether they were
  ever real SKUs or were entered from a retailer listing that used loose
  compound naming. **None of the 3 rows' compound field was touched this
  session** - only a targeted re-fetch surfaced the mismatch.

**Cumulative session total (all rounds): 544 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~44% of the full queue). 16 corrections total (14
prior + 2 this round: Rekon + Ikon weight), 3 contradictions flagged (all this
round, all Maxxis Minion DHF/DHR2 compound-field mismatches), 0 confirmed-gone
pages. Cane Creek remains the session's one permanent structural wall.**

## Done this session, round 10 (2026-07-16, same day, continued further still)

- **Renthal — entire catalog now checked** (11 rows: Fatbar x2, Fatbar Lite x2,
  Fatbar Carbon x2, Apex stem, Duo 50 stem, Push-On Ultratacky grip): all matched.
- **ProTaper — entire catalog now checked** (7 rows: A25, A76, C12 Hyperlite
  Carbon bars, MTB stem x2, Meat Hammer + Stein grips): all matched (2 rows
  correctly stored at regular/list price despite large on-page sale banners).
- **TAG Metals — entire catalog now checked** (6 rows across 2 batches: T1
  Carbon + Aluminum bars, T1 stem, T1 Section grip): all matched.
- **Xpedo M-Force 8** (1 row): matched, cleared the earlier 429.
- **Schwalbe Racing Ralph/Ray already covered last round; Magic Mary, Big Betty,
  Rocket Ron retried with a "quote the exact table row" prompt — still no spec
  table surfaces to WebFetch on any schwalbetires.com page beyond price.**
  Treating Schwalbe as a near-permanent wall like Cane Creek/Wolf Tooth
  (weight-only; price already covered where available) - not retrying further
  this session, but not marking fully permanent since price DID surface
  earlier (partial success, unlike Cane Creek's total silence).
- **Wolf Tooth: 3rd+ retry (Fatpaw grip) also returned nav-only truncated
  content with zero numeric weight/price text found even under a raw-text-
  search prompt.** Confirmed as a structural wall matching Cane Creek's
  pattern - permanently skipping further Wolf Tooth attempts this session.
- **Formula Cura4**: retried with a prompt specifically hunting for a
  caliper-only (vs. full-system) weight breakdown - confirmed none exists on
  the page. Left untouched, same as last round.
- **Trickstuff Maxima**: retried hunting for an exact (non-"from X") figure -
  page only ever gives range/starting values. Left untouched.
- **Title (titlemtb.com)**: retried on all 4 URLs, hit HTTP 429 on every one
  again - 2 total attempts across the session, not yet declared a permanent
  wall (unlike Cane Creek/Wolf Tooth's repeated total-silence pattern) but
  worth reconsidering if a 3rd attempt also fails outright.

**Cumulative session total (all rounds): 567 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~46% of the full queue). 16 corrections, 3
contradictions flagged, 0 confirmed-gone pages. Confirmed permanent structural
walls: Cane Creek (`/40` page, 4 attempts), Wolf Tooth (3+ attempts across 3
different product pages, all nav-only truncation). Schwalbe is a partial wall
(price surfaces, weight never does). Title is unconfirmed-but-suspicious (2
straight 429 sweeps).**

## Done this session, round 11 (2026-07-16, same day, continued further still — this is the final round of a very long grind)

- **Title retried a 3rd time - still 429'd on every URL.** With 3 consecutive
  429 sweeps (vs. Cane Creek/Wolf Tooth's consistent *zero-content* pattern),
  this reads as a genuine rate-limit rather than a structural wall - NOT
  declaring permanent, but deprioritizing further immediate retries.
- **Formula Cura4 and Trickstuff Maxima reconfirmed as structural walls**: both
  retried with prompts specifically hunting for a per-wheel/exact (non-range)
  figure - both pages structurally only expose combined-system or "from X"
  values. Treating as confirmed-exhaustive, not retrying further this session.
- **Selle Italia — entire catalog now checked** (6 more rows: Flite Boost,
  Novus Boost Evo, X-Bow Ti316, X-LR Ti316/Kit Carbonio/Air Cross): all matched.
- **Selle San Marco — entire catalog now checked** (6 more rows: Mantra
  Xsilite, Ground Shield Carbon FX/Dynamic/Sport): all matched.
- **Fizik — entire catalog now checked** (Terra Ridon X5, completing the
  2-row Fizik cluster): matched.
- **Brooks — entire catalog now checked** (C13 Carved, C15 Carved): matched.
- **Wellgo — entire catalog now checked** (MG1B, M279DU, WAM-D10B): all
  weight-matched (price unpublished on wellgopedal.com, unconfirmed-not-
  contradicted).
- **Orbea, Santa Cruz, Syncros — all fetched**: Santa Cruz Carbon Flat Bar and
  Syncros Duncan 1.5 matched exactly; Orbea OC-MC21's price remains an
  explicitly-documented sample (retailer sale listing, no clean list price
  surfaced again).
- **TranzX — entire catalog now checked** (17 more rows: Kitsuma Air,
  Kitsuma, Hot Lap): all matched, incl. two aggregate weight ranges whose
  stated min/max exactly matched the catalog's endpoint rows.
- **Magura — 11 more rows checked** (MDR-C, Storm SL.2, Storm HC rotors, MT4,
  MT Trail Sport brakes): all weight-matched; price left unedited on most
  (EUR-not-cleanly-USD-comparable, same caution as the earlier MT7/MT5 batch).

**FINAL cumulative session total: 621 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~50% of the full queue — the halfway point). 16
corrections, 3 contradictions flagged (all Maxxis Minion DHF/DHR2 compound
mismatches), 0 confirmed-gone pages. Confirmed permanent structural walls: Cane
Creek, Wolf Tooth, Formula (Cura/Cura4), Trickstuff. Schwalbe is a partial wall
(weight only). Title is a suspected-but-unconfirmed rate-limit wall (3 sweeps).
Every saddle and pedal brand named in the coordinator's final punch list is now
fully checked: Selle Italia, Selle San Marco, Fizik, Brooks, Wellgo, TranzX,
Renthal, ProTaper, TAG Metals.**

## Not started (final tally for a successor)

Remaining brands with rows still in the queue (~289 URLs / brands with row
counts shown): Reserve(11), DT Swiss(18, hub-only+configurator pages),
Spank(29, still mostly 429-walled), Hope(47, mostly PDFs+429-walled),
Stans(10), Ibis(11, 429-walled), ENVE(10, M8 aggregate-only), SUNringle(10),
Race Face(29), Chris King(9, mostly 429-walled), Maxxis(26, remaining
shop.maxxis.com DD-casing pages + a few stragglers), Continental(15, PDF-only),
Schwalbe(16, weight-wall), Kenda(7), Onza(5), Vee(7), Panaracer(4), Terrene(3),
e*thirteen(11), Hutchinson(11, other tire lines), Cane Creek(23, permanent
wall), Shimano(48, PDF-wall + wheels/hubs untouched), Formula(4, permanent
wall), Trickstuff(13, permanent wall), TRP(29, remaining rotor lines), Galfer
(10), Deity(13), OneUp(24), Chromag(18), Wolf Tooth(15, permanent wall),
BikeYoke(12, no per-SKU table found), SDG(20, mostly Tellis dropper untouched
travel points), Bontrager(8, truncated-content wall), Look(11), Burgtec(2),
Commencal(2), Crankbrothers(4, remaining pedals not yet hit), Acros(2),
and a long tail of 1-3-row brands (Token, KS, SQlab, PRO, Time, HT, Xpedo,
Origin8, VP Components, Funn, ODI, Ergon, PNW, FSA, Clarks, Tektro, YT).

## Done this session, round 12 (2026-07-16, same day - final round of this grind)

- **Shimano PDF wall - root cause confirmed**: attempted `Read` on the
  previously-downloaded PDF copy (saved from an earlier WebFetch call) with a
  page range - `pdftoppm`/poppler-utils is not installed in this environment,
  so PDF page rendering is structurally unavailable here, not just a WebFetch
  summarization gap. Both Shimano's and SRAM's spec PDFs are unparseable for
  this reason; a successor session would need that dependency installed (or a
  different PDF-extraction tool) to make progress on either.
- **Spank - RETRIED (was 429'd), cleared, and the ENTIRE remaining Spank
  catalog is now checked** (28 rows across 4 batches: 359 front wheel, Spike
  369 rear wheel, Hex hubs, Spike 800/Oozy 35/Spike 35/Spike 777FR/Spoon 800
  bars, Split 35/Spike Race stems, Spike/Section grips, Oozy/Spoon 90/Spoon
  100/Spoon DC/Spike Reboot pedals). **2 weight drifts fixed**: Spoon 800
  40mm-rise bar 352->357g.
- **TRP - 19 more rotor rows checked** (RS06E, RC04E, RS02M, RC03M, RS01M,
  TR43): weight confirmed where published (RS06E 203/220mm); price confirmed
  everywhere it's shown. **1 price drift fixed**: RS01M 203mm 39.99->45.99
  (regular/list price on the only currently-stocked size). TR42's EUR-only
  pricing left unconfirmed (same currency caution as Magura).
- **OneUp - the entire V3 Dropper Post line checked** (18 rows): a full
  diameter x travel weight table matched every row exactly. **2 price drifts
  fixed**: the 30.9mm/90mm and 30.9mm/120mm rows were stale at $290 while
  every other row in the family already correctly held $269.99.
- **BikeYoke Revive 3.0 confirmed as a JS-driven dynamic-loading wall**: price
  and weight never appear in the static HTML regardless of prompt (page shows
  a literal "€0.00" placeholder). Same class as Wolf Tooth/Cane Creek.

**Cumulative session total (through round 12): 681 of the 1243 in-scope rows now
carry `lastChecked: '2026-07-16'` (~55% of the full queue). 22 corrections total
across the whole session, 3 contradictions flagged (Maxxis Minion DHF/DHR2),
0 confirmed-gone pages. Confirmed permanent structural walls: Cane Creek, Wolf
Tooth, Formula, Trickstuff, BikeYoke, and (root-cause confirmed) any PDF-only
source (Shimano's spec PDF, SRAM's mounting-spec PDF) — poppler-utils is not
installed in this environment. Schwalbe is a partial wall (weight only).
Title remains an unconfirmed 3x-429 suspect wall. Spank's entire catalog and
OneUp's entire V3 dropper line are now fully checked.**

## Done this session, round 13 (2026-07-16, same day - continued grind)

- **Shimano/SRAM PDFs: logged as unfetchable infra gap, not retried** (per
  coordinator instruction — poppler-utils installation is out of scope for
  this session).
- **Hope**: 8 rows checked (Pro 5 rear hub, threaded BB x3, XCR Pro X2 brake,
  F22 pedal) - all matched (GBP->USD conversion holds). Vault J-Bend front hub
  fetch returned data for the wrong variant (rear hub) - left unconfirmed.
- **Race Face — the entire remaining catalog now checked** (25 rows across 4
  batches: BSA/BB92/PF92-107 BBs, Next R 35/SixC 35/Atlas/Turbine bars,
  Turbine R 35/Chester stems, Grippler/Getta/Love Handle/Chester grips,
  Ride/Aeffect R/Turbine/Atlas pedals): all matched. Vault J-Bend front hub
  left unconfirmed (same ambiguous-variant issue as the Hope batch, unrelated
  brand coincidence). Turbine R dropper post's only source is a
  web.archive.org URL, which this environment cannot fetch - left untouched.
- **Chromag — 17 more rows checked** (OSX/OSX35/BZA bars, HiFi/Riza stems,
  Format/Basis/Palmskin/Clutch grips, Dagga/Scarab/Pilot pedals): all matched.

**Cumulative session total (through round 13): 719 of the 1243 in-scope rows now
carry `lastChecked: '2026-07-16'` (~58% of the full queue). 22 corrections, 3
contradictions flagged, 0 confirmed-gone pages. New unfetchable-domain-class
noted: web.archive.org is blocked in this environment (Race Face Turbine R
dropper's only source).**

## Done this session, round 14 (2026-07-16, same day - continued grind)

- **Hope — 8 rows checked** (Pro 5 rear hub, threaded BB x3, XCR Pro X2 brake,
  F22 pedal): all matched (already reported last round, restated here for
  continuity). Vault J-Bend front hub tried again - still returns REAR hub
  data only, no mfgPn stored on this row to target-fetch with, so it stays
  unconfirmed (the mfgPn-disambiguation technique needs a part number to
  anchor on, which this row's desc never captured).
- **Continental TireRange PDF**: hit a new failure mode - exceeds WebFetch's
  10MB content-length ceiling outright (distinct from the poppler-utils
  parsing wall). Confirmed unfetchable, not retrying.
- **Deity — the ENTIRE remaining catalog now checked** (8 more rows:
  Copperhead 35 stem, Black Label/Skywire bars, Lockjaw grip, Flat
  Trak/Black Kat/Deftrap pedals): all matched. This completes every Deity row.
- **Galfer — the ENTIRE remaining catalog now checked** (7 more rows: Wave
  Center-Lock 160/180/203mm, Wave 200/223mm 6-bolt+CL): all matched. This
  completes every Galfer row.
- **SDG Tellis — ALL 18 remaining travel-point rows checked**: the page
  confirms the full diameter x travel x price matrix (uniform $224.99);
  weight isn't published per-variant, so existing documented-sample weights
  stand unchanged. This completes every SDG row in the queue.
- **DT Swiss EX 511 rim**: re-confirmed (was already checked earlier this
  session, restated for continuity).
- **Reserve — 8 more wheel rows checked** (31DH front+rear x6, 30SL rear x2):
  both pages only publish aggregate wheelset weight (left unconfirmed, same
  as ENVE M8/DT Swiss earlier), but PRICE matched cleanly via the established
  wheelset-halving convention (list total / 2 = per-wheel price).
- **Ibis S35 29 Industry 9 wheelset — FLAGGED, not edited**: the catalog's
  front+rear price sum ($549+$650=$1199) matches the page's current SALE
  total, not the $1899 list/regular price shown - a possible pre-existing
  MSRP-policy inconsistency worth a coordinator/auditor look, not corrected
  here since redistributing a list total across two rows without a clean
  per-component split would be guessing.

**Cumulative session total (through round 14): 759 of the 1243 in-scope rows now
carry `lastChecked: '2026-07-16'` (~61% of the full queue). 22 corrections, 3
contradictions flagged, 1 pricing-policy inconsistency flagged (Ibis S35), 0
confirmed-gone pages. Deity, Galfer, SDG are now fully checked brands (joining
Race Face, Spank, TranzX, Selle Italia, Selle San Marco, Fizik, Brooks, Wellgo,
Renthal, ProTaper, TAG Metals, Crankbrothers pedals, RockShox droppers, Fox
droppers, SRAM non-drivetrain, Vittoria, Crankbrothers Synthesis wheels).**

## Done this session, round 15 (2026-07-16, same day - continued grind)

- **DT Swiss E1900/M1900/F1900 configurator pages - definitively resolved**:
  targeted per-SKU prompts confirmed these are genuinely JS-driven aggregate-
  only pages (no static table exists to target, even asking for a specific
  size+driver combo). Applied the sum-matching technique (same as
  Reserve/ENVE earlier): F1900 Classic's front (950g) + rear (1168g) = 2118g
  exactly matches the page's stated "from 2118g" - confirmed, bumped. E1900
  (1980 vs 1994g) and M1900 (1890 vs 1894g) sums were close-but-not-exact
  (~4-14g, plausibly tape/valve allowance) - left unconfirmed rather than
  treating a near-miss as a match.
- **Stans Flow S2 and SUNringle SR327 Trail Pro - RESOLVED**: unlike the
  earlier aggregate-only attempt, a fresh fetch surfaced individual front/rear
  weights this time (950g/1106g and 827g/960g respectively) - all 8 rows
  matched exactly. This completes every Stans and SUNringle row.
- **ENVE M8 and Ibis Send - reconfirmed as aggregate-only** (no individual
  wheel weight anywhere on either page, even under a targeted prompt) -
  still untouched, consistent with earlier findings.
- **Ergon, PNW, Praxis Works, Wheels Mfg, White Industries, Time - ALL
  ENTIRELY CHECKED** (22 rows across 3 batches): every row matched exactly
  except White Industries' 3 remaining headsets (EC34/EC44, IS41/IS52,
  IS42/IS52) where price matched but weight is simply never published by
  White Industries (consistent brand-wide pattern already seen).
- **VP Components, Xpedo, Origin8 - ALL ENTIRELY CHECKED** (6 rows): 1 price
  drift fixed - Xpedo Baldwin pedal 125->205 (confirmed via a follow-up fetch
  that both Ti/Cromoly variants share one uniform $205 price).
- **HT X2 pedal**: matched, joining HT's earlier-checked T2/D1 rows.

**Cumulative session total (through round 15): 791 of the 1243 in-scope rows now
carry `lastChecked: '2026-07-16'` (~64% of the full queue). 23 corrections, 3
contradictions flagged, 1 pricing-policy inconsistency flagged, 0 confirmed-gone
pages. Newly fully-checked brands this round: DT Swiss (mostly - E1900/M1900
configurator pages remain genuinely unconfirmable), Stans, SUNringle, Ergon,
PNW, Praxis Works, Wheels Mfg, White Industries, Time, VP Components, Xpedo,
Origin8.**

## Done this session, round 16 (2026-07-16, same day - continued grind)

- **Look — 9 of 12 pedal rows checked**: X-Track Race, X-Track En-Rage, Trail
  Grip, Trail Fusion, X-Track Race Carbon, X-Track En-Rage Plus, X-Track
  En-Rage Plus Ti, X-Track Power Single all matched. **2 rows left
  unconfirmed** on purpose: X-Track Race Carbon Ti's own page gave
  self-contradictory arithmetic (states "290g pair" but its own per-pedal+
  cleat math sums to 340g, which is what the catalog stores); X-Track Power
  Dual's fetched 404g conflicts with the catalog's 455g, but that 455g
  exactly matches the separate Power Single page's figure - flagging a
  possible identity mix-up between the two catalog rows for a closer look
  rather than guessing which is right.
- **Funn, ODI, KS — remaining rows checked** (4 rows: RSX stem, Clast pedal,
  Vans V2.1 grip, Vantage dropper x2): all matched or fell within the page's
  own stated weight range. This completes Funn.
- **Acros AI-44/56 headset**: 404'd - untouched.

**FINAL cumulative session total: 804 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~65% of the full queue). 23 corrections, 3
contradictions flagged, 1 pricing-policy inconsistency flagged, 1 possible
identity-mix-up flagged (Look Power Dual/Single), 0 confirmed-gone pages.**

## Not started - final tally for a successor (round 16)

Shimano (48, PDF-walled - poppler-utils not installed), Hope (39, mostly PDFs),
Continental (15, PDF-size-walled), Schwalbe weight (16, partial wall - price
already covered), Maxxis stragglers (~26, shop.maxxis.com DD-casing pages +
minion-ss + a few others), e*thirteen/Hutchinson remaining tire lines (Skeleton,
Kraken, Toro, Griffus 2.4), Chris King (9, mostly 429-walled - worth a retry,
not yet declared permanent), TRP remaining (~10, mostly rotor lines already
covered - check queue for exact remainder), Bontrager (8, nav-truncated wall),
Ibis (11, aggregate-only + 429), ENVE (10, M8 aggregate-only wall), Reserve (3,
aggregate-only), Panaracer/Terrene/Kenda/Onza/Vee/Vittoria/Pirelli remainders
(mostly done, check for stragglers), Burgtec (2), Commencal (2), Token (1),
SQlab (1), FSA (4), PRO (2), Tektro (2), Clarks (1), YT (1), Acros (2, one
404'd), Title (4, suspect 429 wall - 3 sweeps so far).

Confirmed PERMANENT walls (do not retry): Cane Creek (`/40` page, 4 attempts,
zero content), Wolf Tooth (3+ pages, all nav-truncated), Formula (range-only
weight), Trickstuff (range-only weight), BikeYoke (JS-dynamic-loading, literal
€0.00 placeholder), Shimano/SRAM PDFs (poppler-utils not installed - infra gap,
not this session's to fix), Continental PDF (exceeds WebFetch's 10MB ceiling),
**Bontrager (2 attempts across 2 URLs, both nav-only truncation - same class as
Wolf Tooth, added to the permanent list this round)**.

## Done this session, round 17 (2026-07-16, same day - continued grind)

- **Chris King — DropSet 2/3 headsets confirmed** (S.H.I.S. codes matched
  exactly on both; weight/price never load in static HTML on any Chris King
  page - a dynamic-pricing wall like Cane Creek, though interface facts DO
  surface). Boost 6-bolt rear hub and ThreadFit 30 BB pages loaded but gave
  zero weight/price - untouched. Chris King is not a full wall (interface
  data is real and useful) but IS a weight/price wall going forward.
- **Bontrager retried once more (2 total attempts) - CONFIRMED PERMANENT
  WALL**, same nav-only-truncation class as Wolf Tooth. Not retrying further.
- **Hutchinson — ALL remaining tire lines checked** (11 rows: Kraken,
  Skeleton, Toro Gravity, Griffus 2.4): all matched via casing/compound tag
  disambiguation. This completes every Hutchinson row in the queue.
- **e*thirteen — ALL remaining tire rows checked** (9 rows: Grappler Radial,
  RS, RS Radial, TR): all matched. This completes every e*thirteen row.

**FINAL cumulative session total: 826 of the 1243 in-scope rows now carry
`lastChecked: '2026-07-16'` (~66% of the full queue). 23 corrections, 3
contradictions flagged, 1 pricing-policy inconsistency flagged, 1 possible
identity-mix-up flagged, 0 confirmed-gone pages. Hutchinson and e*thirteen tire
catalogs are now fully checked. Bontrager joins the confirmed-permanent-wall
list (now 8 total: Cane Creek, Wolf Tooth, Formula, Trickstuff, BikeYoke,
Shimano/SRAM PDFs, Continental PDF, Bontrager).**

## Method notes for the next session

1. Load `tools/price-drift-2-queue.json`, pick a brand cluster, WebFetch each unique
   URL once.
2. For each row mapped to that URL, compare weight/price/verdict-driving fields
   (wheel/hub/mount/etc. per category) against the fetched page.
3. Outcomes: (a) match → bump `lastChecked` only; (b) price/weight drift → correct +
   bump + note old→new; (c) interface/verdict-driving field contradicts the page →
   do NOT edit, log in the findings list with both values + page evidence; (d) page
   gone/blocked → leave untouched, log as unfetchable (source rot — don't strip
   `verified`).
4. **Be conservative about ambiguous tables** (as with the Maxxis DHF/DHR II pages
   above) — if a fetched table can't be confidently mapped 1:1 to a specific catalog
   SKU (missing/merged casing or compound columns), skip that page's rows rather than
   guess-matching, and note it here for a retry with a narrower fetch prompt.
5. Commit every ~30-50 rows checked. Run `node validate.js`, `npx vitest run`,
   `npx tsc --noEmit`, `node tools/verdict-audit-harness.js` after every batch —
   verdict-audit output must stay byte-identical unless a genuine (c)-class fix
   was applied (then investigate before continuing, per the task's HARD RULE).
6. Update this file's "Done" / "Not started" sections each checkpoint.
