# Kit verification notes — running log

Free-form notes from the kit (`src/kit.js`) verification grind, one wave per section.
Not a formal protocol — see `tools/VERIFY-PROTOCOL.md` for the actual bar/loop (it's
written for `src/compat.js`'s `tools/verify-job.js` state file, which kit doesn't use;
kit verification is currently ad hoc, cluster-by-brand).

## Kit Wave 4 (2026-07-19, branch `verify/kit-4`)

Scope: helmets, shoes, eyewear. **Helmet category closed**: 31 unverified -> 5 left
(each blocked by a real documented reason, not effort — see below). Shoes: 66 -> 62
unverified (Shimano fully re-scoped; Giro cluster started). Eyewear: untouched, 56
unverified.

### Fetchability by brand (new data points this wave)

- **foxracing.com, giro.com, bellhelmets.com** (same Salesforce Commerce Cloud
  platform, Vista Outdoor family): per-product page has a collapsible
  `<a data-target="#collapseN">Certifications & Weight</a>` tab whose target `<div>`
  holds `"<cert>,<weight>g (Size Medium CPSC/CE)"` as plain text — not always present
  (Giro's Latch shoe has no such tab even though Riddance/Chamber II on the same site
  do). Click via JS (`el.click()`) then read `el.closest('details')`/`getElementById`
  innerText; no need for `computer` screenshots (which reliably time out — use
  `javascript_tool` for all DOM reads on JS-heavy sites).
- **troyleedesigns.com, smithoptics.com, leatt.com** (Shopify): specs live under a
  `<summary>Specifications</summary>` `<details>` block; click the summary via JS to
  populate/reveal it, then read `.closest('details').innerText`. **None of these three
  brands publish per-SKU weight anywhere on their sites** — every verified row from
  them uses a reputable third-party measured figure (`sourceType:'measured'` +
  `weightSource`), same as the Shimano/SRAM-rotor pattern in VERIFY-PROTOCOL.md.
- **specialized.com**: confirmed NOT walled (per CLAUDE.md) — browser pane loads
  clean, weight is inline in Product Details text ("Average weight: NNN grams (size
  medium)"). Straightforward.
- **met-helmets.com**: WebFetch works directly (not JS-blocked) — weight/certs are
  plain text on the page. EU site, prices in €; no reliable USD MSRP page found for
  the one MET row checked (Parachute MCR) — kept an approximate USD conversion, noted
  in `desc`.
- **lazersport.com**: `/global/helmets/off-road/<slug>` pages work, `SPECIFICATIONS`
  section has weight/sizes as plain text (get_page_text finds it, no JS click needed).
  Site shows no USD price anywhere Douglas can see — every Lazer row keeps its prior
  sample price with a note. Lazer's non-KinetiCore ("MIPS") helmet lines are being
  phased out in favor of KinetiCore (their own rotational-EPS system, not MIPS
  licensed) — check the `-kineticore` URL slug if the plain name 404s.
- **kaliprotectives.com**: works directly, weight is plain "WEIGHT: NNN g" text.
  Their MX-market DH lineup churns fast — "Shiva 2.0" (this catalog's row) is gone,
  replaced by "Shiva 3.0 Carbon" and "Shiva Nano"; always check the current
  `/collections/bike` listing before trusting an old model name still exists.
- **adidas.com (Five Ten)**: **BOT-WALLED** — hit a "not a Robot" CAPTCHA challenge via
  the browser pane. Per the fetch-ethics ruling this is a documented wall, not a task
  to route around. Five Ten/adidas rows are untouched this wave; flag for Douglas or a
  future session if Five Ten coverage matters (7 unverified rows).
- **ride100percent.com / 100percent.com**: the brand's site no longer lists ANY MTB
  helmets on its live nav (`/mountainbike` shows only apparel) — the catalog's one
  100% helmet row (Altec) is likely fully discontinued from their own site, not just a
  renamed SKU. Left unverified with a note; don't keep re-chasing it without new
  evidence the product still exists somewhere official.
- **ride.shimano.com**: SPD/BOA info is plain page text (no click needed), but **never
  publishes per-SKU shoe weight** — matches the fork/rotor pattern already documented
  in CLAUDE.md for this brand. The collection page at
  `ride.shimano.com/collections/mountain` is the fastest way to see the *entire*
  current lineup at once (with prices) — use it before touching individual old model
  numbers, since Shimano's shoe naming churns every generation or two (ME/AM/GR lines
  fully retired, replaced by GE "Gravity Enduro" / GF "Gravity Flat"; XC series just
  gets incremented running-change suffixes: 502->503, 702->703, 300->302).

### Re-scope vs. discontinued-tag decision rule (used repeatedly this wave)

When a catalog row's exact mfgPn no longer exists on the maker's site:
- If there's a **direct 1:1 successor in the same tier** (XC502->Xc503, GR701->GF600):
  correct the row's `model`/`mfgPn`/specs to the live SKU **under the same id** (ids
  encode a family/tier slug like `sho-shimano-xc5`, not a literal SKU — a running
  change isn't a new product for id purposes).
- If the line was **retired with no clean 1:1 successor** (Shimano's ME/AM merging
  into one GE line spanning three price tiers): tag `status:'discontinued'`, do NOT
  invent a re-scope, leave unverified. Re-scoping ME7/ME5/AM9/AM7 all onto the same
  GE700 row would have made four rows claim to be one SKU — worse than leaving them
  stale.
- If the **whole product category is gone from the brand's site** (100% MTB helmets,
  Kali Shiva 2.0's non-carbon tier): `status:'discontinued'`, note it, move on — don't
  spend more fetch budget chasing a product that isn't sold anywhere findable.

### What's left for the next wave

- **Shoes** (62 unverified): Five Ten (adidas-walled, needs Douglas's call on how to
  proceed — official-channel alternative? accept as permanently blocked?),
  Specialized, Northwave, Fox, Crankbrothers, Ride Concepts, Leatt, O'Neal, Endura,
  POC, Alpinestars, Bontrager, Giant, Sidi, Vaude, iXS, Nukeproof, Scott, remaining
  Giro (Jacket II, Manta, Sector), remaining Troy Lee Designs (Grind, Roost).
- **Eyewear** (56 unverified, untouched this wave): 100%, POC, Smith, Oakley, Leatt,
  Scott + a long tail of smaller brands (Melon, Dragon Alliance, Bliz, Tifosi, Julbo,
  Rudy Project, Bolle, Native, Spy, Optic Nerve, Ryders, Sweet Protection, Alpina,
  Uvex, Cairn, Salice, Von Zipper, Gatorz, Blenders, Torege, EKS, Fly Racing,
  Cratoni). Apparel bar per VERIFY-PROTOCOL (no weight requirement) should make this
  faster per-row than shoes/helmets, but there are a lot of tiny brands to fetch.

## Kit Wave 5 (2026-07-20, branch `verify/kit-5`)

### Tiebreak: kit-3 vs kit-4 disagreement (3 rows, resolved from a fresh fetch each)

Background: `ffef073` (the wave-4 row-block merge) found 3 rows where the kit-4 branch
wanted to un-verify a kit-3-verified row, and deliberately KEPT kit-3's state rather than
silently regress, flagging the conflict for Douglas. Resolved here from a single fresh
fetch per row (browser pane for JS-heavy sites), ignoring both waves' memory:

- **`hm-troyleedesigns-d4-composite-mips`** (TLD D4 Composite MIPS) — **kit-3 was right,
  kit-4 was wrong.** kit-4 claimed troyleedesigns.com "publishes only a line-wide
  1000-1150g range... not a per-SKU figure" and paired sizing (XS/S, M/L, XL/2X).
  Re-fetched `troyleedesigns.com/products/sp24-d4-composite-helmet-w-mips-stealth-black`
  fresh: the page states outright "we were able to get the D4 Composite helmet to
  **1050 grams**" (a specific, per-model figure, not a range) and lists **six individual
  sizes** (XS, SM, MD, LG, XL, 2X) as separate size-selector options, not three paired
  sizes. kit-3's row (1050g, price $469, sizes XS/SM/MD/LG/XL/2X, verified:true) matches
  the fresh fetch exactly — **no catalog change needed**, already correct in `src/kit.js`.
- **`hm-100-altec`** (100% Altec helmet) — **split verdict, catalog corrected.** kit-3
  verified specs (350g, $165, XS/SM+LG/XL sizes) via a Wayback Machine snapshot of
  100percent.com's own product page; kit-4 un-verified it, arguing "100percent.com's
  current site" shows no MTB helmets. Fresh fetch of BOTH: (1) the same Wayback snapshot
  re-confirms weight 350g, price $165, sizes XS/SM + LG/XL verbatim — a genuine, real
  archived manufacturer page, and an archived maker page is an accepted fetch per
  VERIFY-PROTOCOL's Bright Data doctrine (it explicitly sanctions web.archive.org as an
  unblocked source), so kit-3's `verified:true` on the SPECS is correct and stands; (2)
  fresh fetch of `100percent.com/collections/mtb` (the live site, 2026-07-20) confirms
  the MTB collection page today lists ONLY goggles/gloves/sunglasses sub-categories —
  zero helmets, live nav or otherwise. 100% has genuinely exited the MTB helmet category
  entirely (not a renamed SKU). **Fix applied:** kept `verified:true` (the specs ARE
  manufacturer-sourced and correct) and added `status:'discontinued'` (whole-category-gone
  case per the re-scope-vs-discontinued rule) — splitting the difference kit-3 and kit-4
  each got half right: kit-3 was right that the specs are real/verified; kit-4 was right
  that the product is gone from the brand's site.
- **`sho-shimano-xc5`** (Shimano XC5) — **kit-4 was right, kit-3 was stale.** kit-3 had
  `SH-XC502`, $175 (from a 2026-07-17 fetch of `ride.shimano.com/products/sh-xc502`);
  kit-4 wanted `SH-XC503`, $190. Fresh fetch of `ride.shimano.com/collections/mountain`
  (2026-07-20) confirms the plain men's `SH-XC502` SKU no longer exists in the current
  lineup — it underwent the exact running-change pattern already documented in this file
  (XC502->XC503) — only `SH-XC502 WOMEN'S` ($175, a different, still-live SKU) remains.
  `ride.shimano.com/products/sh-xc503` confirms $190, BOA L6C dial, sizes 40-48 (the row's
  old 39-47 range is stale too). **Fix applied:** re-scoped the row to `SH-XC503`/$190/
  sizes 40-48, `lastChecked` bumped, `source` updated to the xc503 product page.

## Kit Wave 6 (2026-07-20, branch `verify/kit-6`)

Scope: eyewear MAIN POOL (the 18 active-unverified rows left after clusters 1-4, i.e.
everything past Melon/Tifosi/Fox/Dragon Alliance/Rudy/Julbo/Adidas/Native/Spy/Optic
Nerve/Sweet Protection) + the shoe tail (Giro remainder, Shimano current-SKU formalization,
a first pass on Specialized/Northwave). Apparel bar per VERIFY-PROTOCOL: **no weight
required** for kit-catalog rows except helmets — this unblocked a lot of already-fetched-
but-never-flagged rows from prior waves (see "quiet backlog" below).

### Eyewear main pool — 18 active rows, disposition

**Verified (10):** Oakley Sutro ($203) and Radar EV Path ($244) — oakley.com never
publishes weight, confirmed via browser pane (WebFetch 403s this domain). EKS Brand Lucid
($109) and Fly Racing Zone ($44.95) — both already had real fetched prices from prior
waves but were missing the `verified:true` flag; simply formalized under the no-weight
policy. Uvex Sportstyle 227 and Athletic CV — both EUR99.95 RRP on uvex-sports.com (no US
price exists; Athletic CV is a real bike-specific colorway the site files under its Ski
Goggles nav, not a scope error). O'Neal B-10 — oneal.com (US) sells no eyewear at all;
fetched oneal.eu instead (same manufacturer, different region — not a wall, just a
regional catalog gap). Bliz Breeze — inspected the raw price DOM element directly
(`pdp-js-price` class) to confirm EUR109 is the STANDING price despite an always-on
"FLASH SALE" countdown banner (Bliz apparently runs one continuously per its own page
script's `Settings.FlashSales`) — don't take flash-sale banners at face value, check the
actual price element. Salice 016 RW — confirmed current on salice.co.uk at $137
(standard mirror lens; the site categorizes by lens-color name, not the "RW" designation
retailers use, so the RW-specific SKU couldn't be pinned exactly). Von Zipper Approach —
already had a real fetched price from wave 5-ish; formalized.

**Re-scoped (1):** Alpina "Ram HR Q-Lite" → "Ram 2.0 Q-Lite" — the maker's own page states
outright "the evolution of the popular Ram: the Ram 2.0", a clean running-change signal
(same pattern as Shimano's numbered-SKU successions). EUR79.95 RRP.

**Newly discontinued (3):** 100% Racecraft2 — genuinely gone from the current MTB goggle
lineup (ARMEGA/ACCURI 2/STRATA 2/ARmatic/Barstow); survives only as an accessory-
compatibility tag on replacement lenses. O'Neal B-Flex — gone from oneal.eu's current
B-10/20/22/30/33/50/55/Zero lineup. Gatorz Wraptor — both `/collections/wraptor` and
`/collections/wraptor-frame` return "COLLECTION IS EMPTY"; no successor in the current
12-model lineup (Revenant/Wraith/Sentix/Blastshield/Warhawk/Rig/Havok/Marauder/Magnum/
Delta/Specter/Skyhook).

**Confirmed walled / scope-flagged, left untouched (4):** Scott Shield and Scott Fury
Goggle — scott-sports.com is a genuine Incapsula bot-wall (browser pane navigation itself
was denied), consistent with prior waves' finding; not re-attempted further per the fetch-
ethics ruling. Cairn Ride — already flagged in a prior wave as likely a kids'/junior model,
not the adult MTB glasses the row claims; left as-is, still needs a Douglas scope call.
Torege "TR90 Polarized Sport" — **new finding this wave**: TR90 is Torege's common frame
MATERIAL used across its entire current lineup (Theseus/Pure/Quietness/Unique/Fantastic/
Apollo/Highway/Dreamy Lake, all named products at $35-47), not a standalone model with that
exact name. Flagged for the same kind of scope decision as Cairn Ride rather than guessing
which named product it should map to.

This closes out the eyewear main pool from CLAUDE.md's wave-4/5 backlog list. Remaining
eyewear backlog (untouched, low priority / tiny brands not yet attempted): none from the
original wave-4 list remain unattempted — every brand named there (100%, POC, Smith, Leatt,
Scott + the long tail) has now been through at least one fetch attempt across waves 4-6.

### Shoe tail

**Giro:** `sho-giro-manta` checked and confirmed already correctly `status:'discontinued'`
from a 2026-07-17 wave (real historical SKU, no current men's/unisex Manta on giro.com —
only a Women's Manta Lace, a different closure). No further Giro work needed this wave;
Sector and other Giro rows are already verified from prior waves.

**Shimano — formalized, no new fetches needed:** `sho-shimano-gr7` (SH-GF600, $180),
`sho-shimano-xc7` (SH-XC703, $260), `sho-shimano-xc3` (SH-XC302, $140), and
`sho-shimano-gr9` (SH-GF800, $200) all ALREADY carried the correct current-SKU model name
and price from prior re-scoping waves — a fresh fetch of `ride.shimano.com/collections/
mountain` re-confirmed every price exactly, so these just needed the `verified:true` flag
formalized under the no-weight-required policy. The ME/AM lines' discontinued tags
(`sho-shimano-me702/me502/am9/am7`) were spot-checked and remain correct (GE line has no
clean 1:1 successor for any of them).

**Specialized — full current 16-shoe MTB lineup pulled** (specialized.com renders cleanly
in the browser pane; WebFetch 403s it, per the established JS-rendered-not-walled
distinction): `sho-specialized-2fo-flat-2` re-scoped to "2FO Roost Flat" ($119.99, direct
same-tier successor). `sho-specialized-rime-2-0`, `sho-specialized-2fo-cliplite`, and
`sho-specialized-sworks-2fo-roost` confirmed gone with **no** clean 1:1 successor (Rime's
naming resets to "1.0" rather than continuing past 2.0 — don't force-map a reset onto a
successor; 2FO Cliplite has no equivalent clipless XC/trail tier left; 2FO Roost carries no
S-Works trim) — all three tagged `discontinued` rather than guessed.

**Northwave — partial:** `sho-northwave-clan-2` (EUR149.99->$162 sample) and
`sho-northwave-enduro-mid-2` (EUR179.99->$194 sample) already had real fetched EUR prices
from a 2026-07-16 wave; converted to disclosed-basis USD and formalized verified. Left
untouched: `sho-northwave-rockit-2` (the row's exact name maps ambiguously between "Rockit"
and "Rockit Plus" on the current site — a prior wave already flagged this, not re-resolved)
and `sho-northwave-origin-plus-2` (product URL guesses all 404'd this session; no working
page found — needs a fresh site-search pass, not a URL guess, next time).

**Not attempted this wave** (next wave's shoe-tail scope): remaining Northwave ambiguity
above, Troy Lee Designs (Grind, Roost), O'Neal Session SPD, POC Resistance Strong Mid/Ultra
Clipless (already discontinued from a prior wave, not re-verified), Bontrager (Rally,
Foray, Flatline), Giant Line (already discontinued), Sidi Dust, Vaude AM Moab, Scott Sport
Crus-r Flat BOA. Five Ten stays untouched per the confirmed adidas.com CAPTCHA wall.

### Quiet backlog worth knowing about

Several rows across prior waves had a real manufacturer-fetched price recorded in `desc`
(sometimes with `source`/`lastChecked` already set) but were never flagged `verified:true`
— likely because the weight bar blocked them before the 2026-07-19 kit-apparel policy
relaxed it. Worth a scan for more of these before spending fetch budget on brand-new
brands: they're free verifications, no research needed, just re-confirm-and-flag.

## Wave 7 (2026-07-20) — shoe-tail finish + gloves quiet-backlog

Branch `verify/kit-7`. Scope: close out the shoe-tail list wave 6 left open, then
continue into the gloves quiet backlog by yield. Kit went 497 -> 510 verified this wave
(7 commits, all gated: `node validate.js` + `npm test` clean after every commit).

### Shoe tail — CLOSED OUT

**Northwave Rockit 2 / Origin Plus 2 — both resolved.** Northwave's site paginates its
category grids (page 2 needs a `?p=2&page=2` link click, not just a URL guess — WebFetch
alone only ever sees page 1, which is why this sat ambiguous since kit-fanout-1). A full
browser-rendered sweep of both Trail/All-Mountain (37 SKUs) and XC (37 SKUs) pages settled
it: **"Rockit 2" has never existed** — only plain "Rockit" (EUR129.99, closeout) and
"Rockit Plus" (EUR149.99, standing SKU) do. Re-scoped to Rockit Plus, formalized verified.
**"Origin Plus 2"'s URL now 404-redirects** to the XC category page, and no matching SKU
is in the current 37-item grid (the category copy still name-drops it as filler text —
don't trust category-page marketing copy over the actual product grid). Tagged
discontinued.

**Bontrager Rally/Foray/Flatline — all three verified, two had real spec errors.**
trekbikes.com serves all three as live CLOSEOUT SKUs (comp. value = full list price, use
that not the clearance price). **Rally was mis-cataloged**: it's actually a clipless
2-bolt-SPD shoe with a hook-and-loop strap, not the flat/lace shoe the row claimed —
a genuine data error, not just a stale price. Foray's closure was wrong too (ratchet ->
boa, single L6 dial). Flatline was already correct, just needed price/size updates. Noted
in passing: Trek has started rebranding this footwear line as "Trek Foray" ($169.99) as a
parallel SKU — didn't touch it, flagging for whoever eventually does a Trek-branded pass.

**Sidi Dust — resolved via site search, not URL guessing.** "MTB Dust" is real but is
a technical-gravel/MTB crossover shoe ($369.99), not the XC race tier the row assumed
("Sidi Tecno ratchet closure" was invented — this model uses a dial-and-cable system,
mapped to `boa`). Lesson: Sidi's collection pages don't surface every model in the grid
(compare the ALL-TERRAIN and XC category sweeps, neither showed Dust) — the site's own
search (`sidi.com/en-us/search?q=...`) found it when category browsing didn't. Worth
trying search-first on future Sidi rows before declaring a model doesn't exist.

**Vaude AM Moab — disambiguated to "AM Moab Gravity."** VAUDE sells several AM Moab
variants (Mid Winter STX, Tech, Mid STX II, Gravity) — the row's 390g/shoe + canvas/suede
spec only matches Gravity. EUR137 -> $149 USD sample per THE PRICE RULE (still no US
store).

**Scott Sport Crus-r Flat BOA — discontinued, and the 2026-07-17 blocker is now explained.**
scott-sports.com's search box doesn't submit via a URL query param or a plain click (it's
a JS SPA that needs its own event wiring); browsing the two real category URLs
(`/products/bike-equipment-mw-all-mountain-cycling-shoes`, `/products/bike-equipment-mw-mtb-shoes`,
found via `document.querySelectorAll('a')` on the homepage, not guessed) was the way in.
No men's Crus-r Flat BOA or plain Crus-r BOA survives — only four women's Crus-r BOA
variants remain, all on clearance.

**O'Neal Session SPD — resolved.** Never existed; re-scoped to "Pinned SPD" (the real
clipless cousin of the already-cataloged Pinned Flat row), $99.99 confirmed, lace closure
(was wrongly velcro).

**Troy Lee Designs Grind/Roost — re-attempted, same conclusion as kit-5/6.** Homepage nav
has zero shoe/footwear links; a fresh site-search finds nothing. Still a likely-fabricated
pair of rows pending a coordinator/Douglas call on whether to retarget them at a real
Five Ten x TLD SKU or remove them. Not re-verified, not touched further this wave — see
the existing FLAG text on both rows.

**Five Ten** — not re-attempted (confirmed adidas.com CAPTCHA wall per kit-6).

### Gloves quiet-backlog (by yield, after shoe tail closed)

Six rows already carried a real fetched price with a disclosed conversion basis from
earlier waves but were stuck unverified purely because their maker page publishes no
per-glove weight — a bar THE KIT-APPAREL POLICY (Douglas 2026-07-19) retired. Re-confirmed
each live and formalized `verified:true`: O'Neal Matrix ($24.99), Fly Racing Kinetic
($32.95), Royal Racing Apex (re-scoped to "Apex Glove - LTD Edition" — that's the only
current SKU family despite the name, GBP29.99), Royal Racing Core (GBP24.99 + velcro
closure), HandUp Most Days ($29.00, stretch-cuff not velcro), Fist Handwear Stocker
(AUD49.95). **This "quiet backlog" pattern (flagged in kit-6's notes) is real and cheap —
worth another sweep across jerseys/shorts/pants/protection before spending fetch budget on
brand-new brands.** A grep for the pattern (`Corrected|confirmed exactly|CORRECTED` in
`desc` without `verified:true`) turned up ~35 more candidates across jsy/sht/pnt/glv/elp/
arm/shg/ewr not reached this wave.

ZOIC's three unverified gloves (Ether/Empire/Sarge) were re-checked and still can't
formalize: zoic.com's own site currently has **no glove category or product pages at
all** (homepage nav has zero glove links, guessed URLs 404) — the brand appears to have
stopped selling gloves direct, retailer-only now. Stays retailer-sourced, unverified.

Sweet Protection Hunter Mid/Race gloves — re-checked, still dead product-id URLs
(828052/828051.html). Confirmed via search the current lineup is exactly three tiers
(Hunter, Hunter Light, Hunter Pro), no Mid/Race at any price. Tagged discontinued rather
than guessing which tier "Race" was meant to become.

Sombrio's four remaining glove rows (Vanquish/Spun/Cartel/Epik) — not re-attempted, prior
waves already established no live Sombrio storefront exists at all.

### Not attempted this wave (next wave's scope)

The ~35-candidate quiet-backlog list beyond gloves (jerseys/shorts/pants/protection/
eyewear/armguards/shinguards — grep `Corrected|confirmed exactly|CORRECTED` in `desc`
without `verified:true` across `src/kit.js`). Remaining gloves not yet attempted at all:
everything past `glv-clubride-ladyfinger` alphabetically in the unverified set (Club Ride,
Dharco, and the rest of the ZOIC apparel line).

## Wave 8 (2026-07-20) — quiet backlog formalized

Branch `verify/kit-8`. Scope per the wave-7 grep pattern refined to the real signal (a
row carrying `source:` + `lastChecked:` but no `verified:true` — the actual "real fetched
data, only missing the flag" shape; the literal `Corrected|confirmed exactly` string match
undercounted). That scan found **18 candidates** on a fresh `origin/main` pull (most of
wave 7's ~35 estimate had already been formalized by intervening waves before this one
started). Re-fetched every candidate's source URL fresh this session (never promoted on a
stale prior-wave fetch alone, per THE BAR) — **14 promoted to `verified:true`, 2 commits,
both gated clean** (`node validate.js` + `npm test`).

**Promoted (14):** Pearl iZUMi Summit SS jersey, 7mesh Roam Shirt LS jersey, 7mesh
Glidepath Short/Pant, 7mesh Slab Short (cataloged as "Slab Enduro Short"), 7mesh Farside
Short, EVS Option elbow pad, Demon Hyper X D3O elbow, POC Spine VPD 2.0 Vest, Demon
FlexForce X V7 impact top, EVS Sports Sport Vest, EVS Sports Vex Roost Guard, EVS R3 Race
Collar, Answer Apex knee/shin guard. Two real spec drifts caught in the process: EVS
Option elbow pad was missing its "Mini" size tier (page lists Mini/Youth/Adult, row only
had Youth/Adult); Demon Hyper X D3O elbow's price was off by a cent ($70 vs the actual
$69.99).

**Category weight-field convention, confirmed by grepping existing verified rows before
touching anything:** jersey/shorts/pants/neckbrace/shinguard categories **omit** the
`weight` field entirely when promoting a row whose page never published one (matches
e.g. `jsy-raceface-indy`, `nkb-leatt-gpx-15-mini`); elbowpad/bodyarmor categories instead
**keep the prior sample weight** with a "kept as the existing sample per the kit weight
policy" note (matches e.g. `elp-dainese-trailskins-air`, `arm-fox-baseframe-pro`). Two
different established conventions in the same file — followed whichever one the row's own
category already uses, didn't invent a third.

**EUR-conversion precedent applied once:** `arm-poc-spine-vpd-2-0-vest` was blocked on a
"price is EUR-sourced, stays a sample" note from its original pass, but the SAME EUR
maker-price situation is already accepted as `verified:true` elsewhere in the bodyarmor
category (`arm-bluegrass-armour-lite`, `arm-ixs-flow-upper`, `arm-sweetprotection-back-
protector-vest-2`, all converted at a disclosed ~1.08 USD/EUR and formalized verified).
Re-fetched, confirmed the 230 EUR price still holds, converted to $248 on that same
disclosed basis, and promoted for consistency with its own category's precedent.

**Left unpromoted, 4 candidates — real blockers, not a missing flag:**
- `sht-cube-cmpttrail` / `sht-cube-cmpttmtrail` — these two explicitly cite a *different*
  rule than the EUR-conversion one above ("no-USD-source rule... left unverified" — no
  disclosed-basis conversion attempted, unlike the armor precedent). This reads like it
  may be the same kind of stale/inconsistent call the POC row above turned out to be, but
  shorts/pants has no existing EUR-converted-and-verified precedent to point to the way
  bodyarmor did, so this wave didn't unilaterally overrule it. **Flagging for a coordinator/
  Douglas call: should the bodyarmor EUR-conversion convention extend to apparel, or is
  apparel deliberately held to a stricter USD-source-only bar?** If yes, these two (and any
  other apparel rows blocked the same way) are a quick follow-up wave.
- `hm-lazer-jackal-mips` — genuinely blocked: lazersport.com shows no USD price anywhere
  for this discontinued line, not just a missing weight. Re-confirmed still the case.
- `ewr-leatt-velocity-40` — the fetched page shows an Obsolete/clearance SKU with a price
  that "varies by colorway" and no stable MSRP (only a $24.99 sale price seen) - a genuine
  price-instability blocker, not a weight-only one. Left unverified.

### Not attempted this wave (next wave's scope)

Gloves past `glv-clubride-ladyfinger` (Club Ride, Dharco, rest of ZOIC) — still open from
wave 7, untouched again this wave since the quiet-backlog scan took priority. The
`Corrected|confirmed exactly|CORRECTED`-without-`verified:true` grep pattern from wave 7's
estimate is now unreliable (undercounts and overcounts vs the real `source`-without-
`verified` signal) — future waves should use the `source:` + no `verified:true` scan
instead when hunting for more quiet-backlog rows.

## Wave 9 (2026-07-20) — jersey/shorts/pants dead-end confirmation + protection/gloves yield

Branch `verify/kit-9`. Scope per dispatch: jerseys, shorts, pants, protection leftovers, then
the gloves tail, prioritized by yield. Kit went 527 -> 531 verified this wave (4 commits, all
gated clean: `node validate.js`, `npm test`, `npx tsc --noEmit`, `node
tools/verdict-audit-harness.js` after every commit).

**Reconnaissance finding (important for future dispatches): jerseys/shorts/pants are NOT
fresh ground.** A full read of all 39 unverified jersey rows + 29 shorts + 14 pants (82 rows)
found every single one already carries a detailed `desc` documenting a real fetch attempt from
waves 4-8 (`UNVERIFIED`, `ATTEMPTED`, `RESOLVED...discontinued`, `FLAG for coordinator review`,
`Checked <date>: no live storefront`, etc.) — the maker's own site was searched and the exact
SKU name genuinely could not be confirmed, or the brand has no live storefront at all (Sombrio,
SixSixOne 403-wide). These are documented walls, not missed rows — re-attempting them without
new information (a new maker URL, a brand relaunch) would just re-run the same dead ends prior
waves already ran. **Recommendation for the next apparel-scope dispatch: don't re-grind
jerseys/shorts/pants from scratch — either (a) hand Douglas the ~15 "FLAG for coordinator
review" rows for a naming-ambiguity ruling (Fasthouse Alloy Cole/Rufio/Classic, Royal Racing
Turbulence/Impact/Apex, TLD Ruckus SS, Sweet Protection Hunter Enduro — these need a human
picking which real current SKU the row should re-scope to, not another fetch), or (b) target
brand-new brands not yet in the catalog at all.**

**Protection + gloves — real yield found, 7 rows verified (source freshly fetched this
session for every one, none promoted on a stale prior-wave fetch alone per THE BAR):**

- **TSG (`elp-tsg-joint-sleeve`, `shg-tsg-bmx`, `shg-tsg-tempera2`)** — ridetsg.com's Shopify
  storefront (`/shop/<slug>/<sku>`) fetches cleanly and the maker-stated weights (291g/461g/
  524g) matched the catalog's existing sample figures exactly, confirming those were accurately
  captured by a prior wave's fetch even though `verified:true`/`source` were never set. Prices
  are EUR-only (no US storefront) — converted at the catalog's existing ~1.08 USD/EUR
  disclosed-basis precedent (same one wave-8 used for the bodyarmor EUR class) and promoted.
- **EVS Option Knee/Shin Guard** — evs-sports.com (`/products/copy-of-option-knee-pad`) fetches
  cleanly (first WebFetch attempt hit a transient 429, Exa's `web_fetch_exa` succeeded on retry).
  Real price is $30 (row had a stale $26 sample) and the maker sells Mini/Youth/Adult, not just
  Adult — both corrected. No weight published; not required under the kit-apparel policy.
- **O'Neal Flow Elbow Guard** — oneal.com/products/flow-elbow-guard confirms the row's existing
  $59.99 / M-L-XL exactly; only the provenance flag was missing (a genuine quiet-backlog row).
- **Club Ride Lady Finger Glove** — the row's `/products/lady-finger-glove` URL 404s; the real
  live slug is `/products/womens-gloves` (found via search, not guessed) - confirms $30 and
  S/M/L exactly. Formalized.
- **Giro Trail Builder Glove — a real CORRECTION, not just a formalize.** A prior wave (kit-6ish)
  tagged this `status:'discontinued'` off a stale collection-page 404. The direct product page
  (`giro.com/p/trail-builder-mountain-bike-gloves/350020000200000026.html`) is live and
  purchasable: MSRP $27.95 (was a stale $30 sample), sizes XS-XXL (was S-XXL, missing XS).
  **Lesson: a 404 on a collection/listing URL is not proof a product is gone — always try the
  direct product-page URL (found via search) before tagging `discontinued`,** the same trap the
  Northwave-pagination and TLD-D4-range findings already caught in earlier waves.

### Not attempted this wave (next wave's scope)

- The rest of the `source:`-without-`verified:true` quiet backlog beyond what's listed above
  (a fresh scan would find the count — wave 8 found 18, this wave's protection/gloves sweep took
  6 of the easy ones plus 1 real correction; scan again before assuming the well is dry).
- Gloves past `glv-clubride-ladyfinger` alphabetically (Club Ride's other rows if any, Dharco,
  ZOIC) — still not reached across three waves now.
- kneepad (13 unverified), bodyarmor (10), shinguard (9 remaining after this wave's 2), shoes
  (18, TLD Grind/Roost off-limits per Douglas's flag), eyewear (16) — all still at their wave-6/7
  disposition, not re-touched this wave.
- Madison gloves (DTE, Flux) — madison.co.uk redirects to freewheel.co.uk (retailer, not maker);
  the apparent maker domain madison.cc renders JS-only (WebFetch/Exa both returned an empty
  shell) — worth a browser-pane attempt next time, not re-tried here.
