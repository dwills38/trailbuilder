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
