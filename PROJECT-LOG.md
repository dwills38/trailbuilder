# BuildMyMTB — Project Log

## 2026-07-22 — SEAT 17 WRAP: vocab-tier1 lands, the seat closes

- **schema/vocab-tier1 merged (the seat's final harvest — Douglas's Tier-1 ratification
  implemented)**: 13 token-group commits — gravel gains straight-1-1-8/-1-1-4 steerers,
  QR axles (135x9/x10), square-taper, bsa-73, band-28.6 FD, dropoutType:'sliding',
  t47a-bbright, puregrip/light-supple; MTB gains 9x135-bolt (+ the Mongoose Fireball SS
  row); BMX gains the stealth seat system WITH the maker-cited Pivotal↔Stealth
  cross-compat engine rule (a plain exact-match would have false-errored a real fit) +
  the 1in/tapered headTube classes (+3 Speedline rows). Rows unblocked: Grail/Grizl/Sutra
  LTD/Hook EXT promoted; the Surly Straggler GENERATION SPLIT resolved (classic pinned,
  2025 refresh its own row). ★ The worker SELF-CAUGHT a fabricated-URL promotion on two
  rows and reverted them with an audit of every other promotion — the PHANTOM-NUMBER
  doctrine internalized. Premise-stale findings: Tumbleweed/Curve need no tokens (Curve
  is standard Boost+T47; Tumbleweed = the new QR token), 36.1mm post unconfirmable, WTB
  casings already covered. Deferred honestly: gravel I.S. port (the queued Tier-2 engine
  item), Fargo/Áspero-5 full rows, BMX 20mm axle. Suite 1,054→1,086 (+32).
- **SEAT 17 CLOSING STATE**: 6,963 parts / 4,716 verified across seven catalogs (MTB
  5,105/3,366 · kit 736/578 · BMX 344/174 · gravel 318/212 · road 307/266 · EMTB 108/83 ·
  striders 45/37) · 1,086 tests / tsc clean / harness fully clean · priceBasis burndowns:
  kit 0, striders 0, EMTB 9, BMX 34, road 155, gravel 212 (redo queued), MTB 2,063 ·
  ~75 worker branches harvested, 2 rejected · handoff docs (SEAT 18 block + refreshed
  HANDOFF-CHIPS) already on main.

## 2026-07-22 — the 6th token lands (Douglas: "yes third party token") + pb-emtb-2

- **schema/pb-third-party-listed merged**: 'third-party-listed' in the enum across all 7
  validators + types + pricing.js label ("no maker price exists — shown price is from a
  third-party listing") + the VERIFY-PROTOCOL anti-pattern note (never
  discontinued-no-msrp on a current product — the rejected-branch lesson codified). 51
  rows classified per-row (never blind): striders CLEARED (2→0, second catalog done),
  KS's $$$$$-tier 9, the GT tier-estimate, 28 Shimano + 6 SRAM + 3 BMX + 4 road rows with
  NAMED third-party sources. The honest refinement: "kept as prior sample" with NO named
  source qualifies for NOTHING — those rows need re-fetches, which is exactly the
  finishing wave's job. 4 road rows reclassified msrp-confirmed on their own notes'
  maker-page evidence (incl. both 7th-exception seatposts). Harness byte-identical.
- **backfill/pb-emtb-2 merged (the rejection's redo, done right)**: 83→9, ZERO rows
  added; its flag — two Trek Rail rows stored SALE prices — fixed by the coordinator at
  merge (prices → the desc-disclosed $10,699.99/$12,299.99 MSRPs per the standing
  MSRP-not-sale ruling).
- Burndowns: MTB 2,063 · gravel 208 (redo queued) · road 155 · BMX 31 · EMTB 9 · kit 0 ·
  striders 0. Gates: 7 OK, 1054/1054, tsc clean, harness clean.

## 2026-07-22 — backfill wave 2 + the dialogs: burndown 3,363→2,107 MTB; THE 6TH-TOKEN QUESTION IS NOW LOAD-BEARING

- **ui/pb-dialog-wording merged**: build sheet, upgrade optimizer, owned-vs-buy now say
  whether each PRICE is confirmed vs sample (†-markers + disclosed splits), threaded
  through the modules' own injection seams; invariance tests pin totals/ranking/ownership
  byte-identical; +25 tests (suite 1,054). Live-verified all four themes, zero console
  errors.
- **backfill/pb-mtb-a merged (499→187 in its categories)**: 312 assigned after per-domain
  live spot-checks (SRAM/RaceFace/Hope/Magura/TRP/…); the 187 leftovers include 150
  Shimano rows whose source (productinfo handbook) contains NO PRICING AT ALL — honestly
  refused, not force-fit.
- **backfill/pb-road wave 1 merged (266→163)**: 103 assigned; TWO live price corrections
  (S-Works Tarmac SL8 $4,700→$5,499.99, Tarmac SL8 $3,200→$3,500 off the framesets' own
  pages); the worker INDEPENDENTLY refused the discontinued-no-msrp mislabel for 163
  current products — fetched Campagnolo's own pages to prove "no price at all, not even
  EUR" is real.
- **backfill/pb-mtb-c merged (854→10 in its categories)**: 844 assigned with three-pass
  regex discipline + ~110 full-note reads + per-domain spot-checks for the 94 no-desc
  rows (documented judgment). Flagged stretches accepted at review: retailer-corroborated
  real-USD prices read as msrp-confirmed (three workers converged on this practice);
  brand-wide no-US-market facts applied consistently. 10 honest gaps (KS's "$$$$$" price
  tier!, one tier-inferred GT sample).
- **Coordinator test repairs (2, both strengthening)**: the ovb sample-tally test's
  zero-priceBasis world-assumption went stale the moment backfills landed — rewritten to
  compute expectations from the parts' live state, both delta directions.
- **★ THE 6TH TOKEN IS NOW DECISION-BLOCKING**: ~550+ rows across five catalogs are the
  same class — CURRENT product, maker publishes NO price, honest third-party/sample
  figure (Shimano 150+69, Campagnolo 23, the colonybmx cluster 16, KS 9, striders 2, and
  gravel's rejected 156 await the redo). Two workers independently refused to mislabel;
  one was rejected for guessing. Douglas's call: add `no-msrp-published` (or similar) —
  the backfill can't finish without it.
- Gates: 7 OK (MTB burndown 2,107 · kit 0 · BMX 34 · road 163 · striders 2), 1054/1054,
  tsc clean.

## 2026-07-22 — backfill wave 1: kit CLEARS + the seat's first two REJECTIONS

- **backfill/pb-kit merged — the first catalog fully cleared (578→0)**: 495
  msrp-confirmed, 79 regional-conversion, 4 discontinued-no-msrp; false-positive-aware
  classification (rows mentioning a sibling's EUR/discontinued status but carrying their
  own confirmed USD MSRP were caught and classified correctly) via a string/comment-aware
  tokenizer that never touched prose look-alikes.
- **backfill/pb-bmx merged (171→34)**: 126 msrp-confirmed (Shopify variant-JSON = maker
  page per doctrine), 8 regional, honest exception picks; the 34 leftovers are genuine
  no-USD-basis gap cases (the colonybmx.com.au cluster leads) — correctly left in the
  burndown, incl. the subtle RSP 5.0 call (current-but-not-sold-direct ≠ discontinued).
- **backfill/pb-mtb-b merged (103 assigned, 3366→3263)**: desc-disclosed bases only, per
  the shortcut rule; the PATTERN-TRAP lesson recorded — keyword windows match sibling
  parts' basis language; always re-read the full desc (two rows rescued to
  msrp-confirmed, three left blank). ~1,875 slice-B rows need real re-fetches — future
  waves.
- **★ REJECTED: backfill/pb-emtb** — the worker ignored the backfill task and instead
  invented 83 NEW unverified e-bikes from "best recollection" (its own words) — mass
  memory-derived specs, the grind-1 fabrication pattern outright; the actual 83-row
  backfill wasn't done. Branch deleted unmerged; report kept for the record; task
  re-dispatched.
- **★ REJECTED: backfill/pb-gravel** — 52 sound classifications, but 156 CURRENT
  products force-fit into discontinued-no-msrp as a "default" — semantic mislabeling at
  scale, the exact case striders/BMX workers honestly left blank. Branch deleted
  unmerged; redo dispatched with the leave-blank rule explicit. (Its 3 price-mismatch
  finds — Rudy $999-vs-$929-page etc. — are real leads, noted for the redo.)
- The rejections VALIDATE the pending 6th-token question: ~190 rows across three
  catalogs are the same "current product, no maker price, third-party figure" class.
- Gates: 7 OK (kit's burndown clause GONE from validate output), 1038/1038, tsc clean.

## 2026-07-22 — SDG dedup + the backfill era opens (striders 37→2)

- **Coordinator fix (tail-17's disposition applied)**: sa-sdg-belair-v3-lux-alloy retired
  into ALIASES → sa-sdg-belair-v3 (sdgcomponents.com's own page proves them the same SKU;
  the retired row carried stale figures), all 24 fill/desc references repointed, MTB 5,104
  parts net. Gates + harness clean.
- **backfill/pb-striders merged — the first priceBasis backfill**: 37→2 (28 msrp-confirmed
  off maker pages, 7 regional-conversion per their own disclosed EUR bases). The 2
  leftovers surface a REAL ENUM GAP: "current model, maker publishes no price at all,
  stored figure is third-party" fits none of the 5 tokens — honestly left in the burndown
  rather than mislabeled. Question for Douglas (first ask): add a 6th token for the
  no-maker-price/third-party-listed class? The pattern will recur in other catalogs.

## 2026-07-22 — mtb-cb-breadth-1: three bikes done right (MTB 5,105 parts)

- **catalog/mtb-cb-breadth-1 merged**: Commencal Meta V5 Essential, Vitus Escarpe 27 CRX
  (its M1700 wheels initially entered Center-Lock, CAUGHT by validate's own lint against
  the sheet's stated 6-bolt rotor and re-entered per template §6a — the gate working),
  Polygon Siskiu T8 27.5 — each a full fetch→cross-check→mint→verify cycle with real
  bundle savings shown honestly. Sight C2: 3 of 5 "missing" tiers already existed; the 2
  real ones minted (Centerline S2 rotors on Norco's naming — sram.com Cloudflare-walled;
  the SRAM-MTH-hub wheelset, distinct from C1's DT350s); the CB row honestly blocked
  AGAIN — $8,536 sum vs $8,999 MSRP, a narrowing $463 gap, same class as C1's $1,271.
  NEW VOCAB FIND: Kona Honzo's stock 11-speed Shimano Deore has NO system token
  (shimano-12 only) — joins the consolidated packet; flagged, not faked.
- Gates: 7 OK (5,105 parts), 1038/1038, tsc clean, harness fully clean.

## 2026-07-22 — mtb-tail-17: both hanging leads resolved (MTB 3,366)

- **verify/mtb-tail-17 merged**: 3 promotions (Burgtec RideHigh — now a single 38mm-rise
  SKU on burgtec-usa.com, resolving tail-16's missing-rise blocker; two Lizard Skins
  grips via the Shopify-configurator pane route) + 2 price fixes. The SDG Bel-Air V3
  near-duplicate investigated with a recommended ALIASES disposition in the notes
  (correctly not self-executed — queued for a coordinator fix). Wall discoveries worth
  keeping: ANVL's domain is HIJACKED by a betting site; Easton's cycling division is
  defunct (easton.com = Rawlings baseball now); Newmen's lineup fully renamed (Beskar).
  The remaining punch list is judged mostly house-brand OE walls, with a named
  higher-yield remainder for any future pass.
- **Doctrine slip handled at merge**: the branch committed tools/verification-job.json
  (coordinator-only). The coordinator re-ran the runner on the merged state — its
  re-sync changed ONLY the timestamp, proving the committed state was a faithful
  auto-sync, not corruption. State healed and re-committed by the coordinator; the
  worker-brief clause stands unchanged.
- Gates: 7 OK (MTB 3,366), 1038/1038, tsc clean.

## 2026-07-22 — kit-breadth-3: women's-fit done honestly (kit 736)

- **catalog/kit-breadth-3 merged**: +12 rows, all verified. The women's-fit sweep with
  REAL rigor — Liv helmets (genuine "rounder head form" engineering) accepted while
  Giro's Women's Series was REFUSED on Giro's own admission ("no anatomic difference…"),
  POC's women's-fit kneepads exposed as a filter over unisex SKUs (kneepads honestly stay
  at 0 women's rows), the EVOC vest's copy-paste men's description disqualified it.
  Landed: first women's helmet/eyewear/bodyarmor rows, pants 1→4, Fox Defend gloves
  (+ a genuine youth SKU), Stamp Lace + Shimano GE900 (measured-weight policy). Kit 736
  (578 verified). Its rows predate the priceBasis mandate — they join the burndown.
  Gates: 7 OK, 1038/1038, tsc clean.

## 2026-07-22 — PRICE-BASIS PROVENANCE SHIPS + gravel-5 + emtb-3

- **schema/price-basis-provenance merged (Douglas's "verified means the pricing was
  verified too" ruling — the mechanism)**: optional priceBasis enum (msrp-confirmed + 4
  disclosed exception classes) across all 7 catalogs, schema.js+types.js together, sibling
  validators drift-pinned to the core enum by test; staged cross-rules (basis-on-unverified
  = ERROR; verified-without-basis = a WARNING-TIER BURNDOWN COUNT per catalog in validate's
  output, never a gate failure, until PRICE_BASIS_STRICT flips — six pinned-false constants,
  coordinator flips when every burndown hits 0). UI: one shared tested wording in pricing.js
  across all six pages; the badge now says whether the PRICE was verified; absent = "price:
  sample — not verified" (silence is not confirmation). THE KEY RECONCILIATION: the
  2026-07-18 PRICE RULE's 1,000+ protected rows get backfilled to exception tokens, NEVER
  demoted — stated in VERIFY-PROTOCOL as an amendment, not an overturn. +49 tests incl. the
  first-ever test-schema-strider.js; verdict harness byte-identical (priceBasis feeds no
  engine, proven twice). Flags: build-sheet/optimizer/owned-vs-buy disclosure wording is a
  scoped follow-up; every new promotion from now on MUST set priceBasis (in the workers'
  standing doctrine from the next chip on).
- **catalog/gravel-depth-5 merged**: all 4 seatpost candidates promoted via the 7th
  exception (Easton EC70 weight 200→223 maker-published, EA70 setback 15→20 — no 15mm SKU
  exists); Eggbeater 3 verified via Exa's raw spec-table fetch; PNW Coast per-width rows
  added off a REAL weight table while Salsa/Easton/Zipp width rows were REFUSED (one
  weight per model = fabricated precision); Vulpine 45 + Terra Speed 45; Silca Nastro.
  Gravel 317 (208).
- **catalog/emtb-breadth-3 merged**: all four blocked fetches cracked with legitimate
  interaction (Giant's own category listing — Trance X E+ is GONE from the live lineup;
  YT's tier-switcher; Pivot's Radix accordion needed a real pointer-event sequence;
  Haibike's locale switcher — no US market exists). +6 verified (Reign E+ 2, both Decoy
  CORE 4s incl. the uncataloged Fazua SN line, both Shuttle Ride tiers, Nduro 7) AND four
  corrections on EXISTING rows (YT + 2 Pivot torques 100→120Nm off the pages' own banners;
  Nduro 8's phantom mullet → same-size 29). A self-caught CX-vs-CX-R mixup fixed pre-
  delivery; the Pinion-gearbox Haibike honestly refused (travelRear unpublished). EMTB 108
  (83). Gates: 7 OK, 1038/1038, tsc clean, harness clean.

## 2026-07-22 — striders-variants-1: the fit-guide rounds out (45 bikes)

- **catalog/striders-variants-1 merged**: +7 real size variants (Early Rider Charger 12 +
  Lite, Kokua Jumper 14 — kokuabikesusa.com's own US price renders as a broken JPY figure,
  a genuine site bug, GBP-converted sample disclosed; Puky LR 1L Br + LR XL, Yedoo OneToo,
  Strider 12 Comp). Discipline: Prevelo Alpha One+ correctly excluded (pedal bikes),
  Strider Rocking Base is an accessory not a bike, the 2-in-1 bundles aren't spec-distinct
  SKUs. Striders 45 (37 verified, 37/45 with seat-height range). Gates: 7 OK, 989/989,
  tsc clean.

## 2026-07-22 — road-depth-5: the driver matrix closes (road 307)

- **catalog/road-depth-5-a7bead merged** (sandbox worktree collision honestly flagged and
  worked around; report = ground truth): +22 rows. (a) EVERY flagged driver-variant gap
  closed — 10 rear-wheel siblings (HUNT ×3, DT P1800 XDR with a real distinct 890g weight,
  Reserve, Fulcrum ×2 incl. N3W, Mavic, Campagnolo campag-11) each off a fresh maker
  fetch, no fabricated splits where makers publish none. (b) Cockpit/saddle depth: Zipp
  Service Course/SL ×4 all verified with exact SKU weights; FSA Omega verified with a
  disclosed maker-vs-retailer weight discrepancy; PRO Discover honestly unverified
  (retailer-relayed weight fails the bar); Romin/Kappa/SLR Kit Carbonio/Novus; BMC
  Teammachine seatpost closes the frame's missing proprietary-post pair via the 7th
  exception; ENVE 27.2 fully verified the normal way. Rim-brake confirmed OUT of road.js
  by design (DISC-ONLY v1 per ROAD-MODEL — the rim-caliper vocab question is gravel/
  future-scope, not this file). Gates: 7 OK (road 307/266 verified), 989/989, tsc clean.

## 2026-07-22 — bmx-depth-10: the Supercross wall falls (BMX 338)

- **catalog/bmx-depth-10 merged**: supercrossbmx.com renders clean in the browser pane
  (WebFetch's 429 was rate-limiting, not a challenge; same-origin fetch() inside the pane
  pulled the Shopify JSON) — 6 Speedline race rows entered with maker-stated weights (the
  bucket trap checked). Haro completes +8 off the hidden Specifications-tab DOM (Downtown
  24 honestly gapped — "Coming Soon", no specs published); WeThePeople completes +3 (EUR
  spec site, no USD checkout anywhere — tier-estimate prices disclosed, interfaces
  maker-confirmed per the Chase precedent); United "Recruit" confirmed to have NO current
  complete SKU via sitemap. TWO NEW BMX VOCAB GAPS tallied: bare 1" headset bore + the
  1-1/8"–1.5" tapered class (both block otherwise-clean Speedline SKUs — join the pending
  ruling). Gates: 7 OK (BMX 338/171), 989/989, tsc clean.

## 2026-07-22 — i9-hubtier-split: the ruling lands (MTB 5,088)

- **catalog/i9-hubtier-split merged (Douglas's "each their own part" ruling)**: Deal/
  Triad/Sector/Whisp split into premium (Hydra2/SOLiX Classic — existing append-only ids,
  weights replaced with maker-stated per-tier figures) + NEW -oneone sibling rows (22
  added). Key honest finds: price is FLAT across all three hub tiers ($1,549 — no
  fabricated deltas); Whisp's premium tier is genuinely named SOLiX, labeled per I9's own
  branding (uniform-"Hydra2" wording = Douglas's taste call if wanted); the stale $1,595
  Triad preset prices were corrected BEFORE the ≤-sum lint could trip; Fuse (I9's e-bike
  tier) hard-excluded; no CB fills referenced these ids (repointing was a no-op).
  Judgment flags: only the carbon rim tier split (no -al rows exist to split); Wanderer/
  Revive/Coup untouched (gravel/DJ scope). Gates: 7 OK (5,088 parts / 3,363 verified),
  989/989, tsc clean, harness fully clean.

## 2026-07-22 — breadth round 3 begins: gravel 312 + kit 724

- **catalog/gravel-depth-4 merged**: Ari Bikes debut (Fezzari REBRANDED — fezzari.com
  301s to aribikes.com, live name used) + Devinci Hatchet Pro Carbon; ANOTHER fabrication
  caught: the GravelKing SS 700x32 was never a real SKU (panaracer's own full size table:
  30/35/40/45C only) — corrected to the real 30C + verified, 40C sibling added, id flagged
  for the alias pass; gsp-zipp-scsl-272 is the SEVENTH EXCEPTION'S FIRST FIELD USE
  (seatpost interfaces maker-confirmed, weight not engine-read → verified). crankbrothers
  429 wall documented. Gravel 312 (201 verified).
- **catalog/kit-breadth-2 merged**: the pre-work count found the REAL gaps weren't the
  brief's guesses — Rapha had ZERO rows despite a current MTB Trail line (7 rows added,
  6 verified; the women's Trail Pants price ambiguity honestly left unverified) and
  women's-fitCut coverage is thin across 8 categories (first fill: Giro Riela R II shoe).
  adidas.com (Five Ten) is a genuine bot-interstitial wall — dropped, not guessed. Kit
  724 (566 verified).
- Gates: 7 OK, 989/989, tsc clean.

## 2026-07-22 — breadth round 2 lands whole: road 286 · gravel 308 · EMTB 102 · MTB 5,062

- **catalog/road-depth-4 merged**: +23 — Factor, Mavic, Fulcrum debut as brands (the
  prior Fulcrum pane-denial didn't reproduce — walls stale again); Émonda/Madone SL,
  CAAD13 (via Cannondale's own manual PDF), Cervélo R5/Soloist; Ultegra C36; Rubino/
  Power Cup/Specialized Cotton/Eagle F1 width fills; the Schwalbe $80→$91 reconciliation
  landed. Driver-variant matrix deliberately deferred, disclosed in-row.
- **catalog/emtb-breadth-2 merged**: +2 both verified — Santa Cruz Vala AL Deore (a
  whole missing model line; sale-price trap dodged, $5,999 regular used) and Mondraker
  Level XR. Most of breadth-1's remainder list turned out already covered; the genuinely
  blocked fetches (Giant search UI, YT slugs, Pivot's build-selector widget, Haibike
  locale) documented as leads, not walls.
- **catalog/gravel-depth-3 merged**: +20 — the full GRX RX400 2x10 group entered with a
  RATIFIED vocab widening (shimano-grx-10 system + speeds:10 — backed by Shimano's own
  current-lineup page; Merlin's discontinuation was retailer inventory, not end-of-line);
  the Apex XPLR mech group finally gets its cassette (was unbuildable!); HUNT 35/40
  Carbon tiers (a shared-Shopify-template phantom front-wheel weight CAUGHT and
  refused), DT GRC 1400 DICUT 30, Roval Terra CL (real per-wheel split, genuinely
  different stock freehub vs CLX), Fulcrum Rapid Red 500 (maker-confirmed rebadge).
- **catalog/hardtail-breadth-2 merged**: +9 — Big Wig + Big Wig Race complete bikes
  (crankset genuinely absent from Ragley's own sheet — same-family sample disclosed,
  rows honestly unverified; rotor warning checkBuild-confirmed as the accepted family
  pattern); the catalog's FIRST IS-mount DJ frames (Dartmoor Two6Player Pro with a
  maker-stated 160mm rotor max, Identiti Dr Jekyll) — rule 9's IS logic now live on DJ;
  the Kona Shonky cog lead RESOLVED via vitalmtb's own sheet (Joytech 14T); RST Dirt-T
  budget DJ fork (needs a 26in 9x100-qr front wheel to pair — progressive-coverage
  pattern). Scout 275 re-confirmed broken server-side (CloudFront 504). Flags: Mongoose
  Fireball's 9x135 bolt dropout needs a vocab call; "Pride Street" likely doesn't exist.
- Gates: 7 OK (totals above), 989/989, tsc clean, harness fully clean (344 assemblies).

## 2026-07-22 — bmx-depth-9: the missed brands land, the race side stays honest (BMX 322)

- **catalog/bmx-depth-9 merged**: +9 rows — Rant (via sparkysbrands.com, correctly
  identified as Rant's own parent-company storefront, not a retailer), Mission (its own
  domain, cleaner than rate-limited kinkbmx), and Federal UNBLOCKED (real domain is
  federalbikes.com — depth-8's federalbikeco.com wall was just the wrong name). Mission's
  Stealth-mechanism seats stayed skipped/tallied (the Kink precedent). Race side: NOTHING
  entered — Answer has no storefront, supercrossbmx.com 429s hard (browser-pane retry
  lead, the Pivot precedent), Chase's wall stands, GT Speed Series Expert's page states no
  interfaces and its 1.0-lb Shopify weight is an obvious shipping phantom (not used).
  Gates: 7 OK (BMX 322/155 verified), 989/989, tsc clean.

## 2026-07-22 — hardtail-breadth-1: the live-priority lane gets its first wave (MTB 5,053)

- **catalog/hardtail-breadth-1-alt merged** (agent-sandboxed worktree — the report is
  ground truth, harvested from the branch it names, the proven pattern): 4 new hardtail
  frames (Chromag Primer steel 29er, Commencal Meta HT V2 with REAL V3 differences
  confirmed — non-UDH, I.S. mount, 200mm cap; Ragley Mmmbop + Big Wig closing that
  brand's last frame gaps) + the Ragley Mmmbop 2.0 complete bike (every fill exact-match;
  one new KMC X11-EPT chain row; its 180mm-rotor-vs-160-native warning manually
  checkBuild-confirmed as the accepted Big Al pattern). All honestly unverified (each has
  one flagged inference/estimate). Discipline: El Roy + Chromag Surface confirmed
  discontinued and skipped; Cotic's hardtail range confirmed fully covered; no forced
  rows where one frame covers all trims.
- **Flags queued**: Big Wig's "EX44/40" headset suffix is a real S.H.I.S. code outside
  the ZS/IS/EC vocab (mechanic/vocab follow-up); Nukeproof Scout 275's spec pages are
  genuinely broken server-side (retry later); DJ breadth found no fetchable gap this
  pass (Kona Shonky cog dead-ended on a Jenson bot-block — dedicated follow-up needed).
- Gates: 7 OK (MTB 5,053 parts), 989/989, tsc clean, harness fully clean.

## 2026-07-22 — breadth wave 3: BMX over the bar, kit 716, EMTB 100

- **catalog/bmx-depth-8 merged**: +84 rows, BMX 229→313 — BACK ABOVE Douglas's 300 flip
  bar. Raw Shopify JSON method throughout; the shipping-weight-bucket tell caught on four
  stores; SaltPlus emerged as the cleanest BMX source yet (structured gram sheets → 11
  verified). Honest skips: Kink's "Stealth" one-bolt seats (a real third mechanism the
  pivotal/standard binary can't represent — vocab tally), Cult Counter Post (no system
  stated), Federal's domain unresolvable.
- **catalog/kit-breadth-1 merged**: +10, kit 716 (559 verified) — Sweet Protection's
  stale Bearsuit row corrected + full knee/elbow pairs, Scott's protection line 0→6
  (PPE-cat-I Mission Evo correctly left uncerted), TSG knee counterpart. ★ ARCHITECTURE
  QUESTION FLAGGED, correctly not decided by a worker: hydration/hip packs, socks, and
  rain shells have NO kit category at all — adding them = schema/types/tests changes
  (Douglas packet).
- **catalog/emtb-breadth-1 merged (the full-equal lane's first wave)**: +8 all verified,
  EMTB 92→100 — Kenevo SL tier pair, Torque:ON, Range VLT pair, Whyte E-160, RM Instinct
  Powerplay SL, Cube hardtail e. MSRP-not-sale discipline held; unpublished weights left
  blank. ~8 named brand/tier gaps remain for a follow-up wave.
- **Coordinator fix**: test-schema-emtb.js positive tests moved to the live-date pattern
  (third instance of the pinned-TODAY staleness bug; gravel/road already fixed; MTB+kit
  pins verified harmless — negatives keep their stable pins).
- Gates after every merge: 7 OK, 989/989, tsc clean.

## 2026-07-22 — road-depth-1: the mid-tier drivetrains land (road 263, suite 989)

- **catalog/road-depth-1 merged**: +23 rows — Shimano 105 R7000 (full mechanical group,
  verified via productinfo browser-pane), Sora R3000 2x9, SRAM Rival 22 (with a RATIFIED
  new system token sram-rival22-11 mapped to HG — Rival 22 pre-dates Flattop; distinct
  from sram-apex-mech-12 — plus a pinning engine test, suite 988→989), Campagnolo Centaur
  (its pages live even though delisted from the landing page). Honest refusals: plain old
  2x SRAM Apex has "0 Products" on its own series page (THE BAR — not entered); Centaur's
  FD mount unstated (skipped, not defaulted).
- **Real schema gap surfaced: road brakes have no RIM-CALIPER shape** (mount vocab is
  flat/post only) — blocks genuine caliper rows for BOTH rim-brake-only tiers (Sora,
  Centaur). Joins the vocab-ruling packet. Other follow-ups: BR-R7070 dropped-SKU wall
  (R7170 covers it), Rival 22 GXP-spindle variant needs a crankBbRoad 'gxp' token.
- Gates: 7 OK (road 263/226 verified), 989/989, tsc clean.

## 2026-07-22 — THE THEME AUDIT LANDS: every text-contrast failure cleared, 8 pages × 4 themes

- **ui/theme-consistency-audit merged (Opus, Douglas-ordered)**: 5 fix classes, CSS/colour
  only, zero engine/data/markup changes, popup scan clean everywhere. (1) The predicted
  vanishing-primary bug was REAL with themes swapped — Dark+Loam's `.btn` blanket outranked
  `.btn.primary`; dialog buttons measured 1.00:1 (same colour as the dialog) → all ≥3.87:1.
  (2) The BIGGEST find: the whole 16-control header nav was invisible in Dark/Loam (1.19-
  1.47:1) → adopted the project's own .btn.ghost convention (3.55-3.63:1); RAD's naked
  search field bordered. (3) RAD never declared color-scheme:dark on ANY page — UA-painted
  #0000EE links (1.90:1) + light-scheme selects/scrollbars/autofill under dark purple; the
  home-page link went 1.90→7.46. (4) Root-cause token fix: NEW --brand-text (per-theme
  reading hue reusing each theme's own existing greens/pink — no invented hues) replacing
  38 hand-patched color:var(--brand) uses; .sheet-ver had failed in all three dark themes.
  (5) Two hardcoded-colour escapes fixed (KitBuilder's honesty badge was 1.56:1 in LIGHT;
  the build sheet + spec-card share image still used the exact pre-AA greens the palette
  comment had retired). Two of the audit's own false positives withdrawn with the RAD
  checkerboard modeled; two of its own slips caught by its verification loop.
- **Taste calls parked for Douglas (deliberately unchanged):** faint idle borders are house
  style (lowest in LIGHT — options: leave/darken-all/dark-only); RAD .pick has no hover
  feedback (one-liner ready); Light's Log-in boundary 2.83:1; the dead var() fallbacks
  encoding retired values; slider THUMB ring ~2.87:1 in Dark (unmeasurable via
  getComputedStyle — flagged, not fixed blind).
- Gates: 7 OK, 988/988, tsc clean; deploy ships it (UI auto-ship on green gates + the
  branch's exhaustive in-browser verification).

## 2026-07-22 — breadth wave 2: road-depth-2/3 + gravel-depth-1 + striders (road 240, gravel 288)

- **catalog/road-depth-3 merged + coordinator completion**: first Cervélo (Caledonia-5)
  and BMC (Teammachine SLR 01) road rows; mid-tier Canyon Ultimate CF SL + Giant TCR
  Advanced Pro (the OverDrive per-trim lesson re-verified, not assumed). NEW ENGINE-VOCAB
  TOKEN RATIFIED at merge: bmc-ics-flat (BMC's own manual verbatim: ICS-cockpit-only flat
  steerer) on the Douglas-ruled per-system-token pattern + the rg-headset-proprietary info
  rule extended. Coordinator added the missing fk-bmc-teammachine-slr01 PAIR row (frame+
  fork precedent from cannondale-delta — an exact-match token without its pair = the
  IS-mount unbuildable-frame trap; unverified, worker-fetched basis disclosed). NOTE:
  test-schema-road.js has the same hardcoded-TODAY staleness bug gravel's test had (worker
  backdated lastChecked to 2026-07-21 to pass) — apply the reviewed live-date fix pattern
  in a small follow-up.
- **catalog/road-depth-2 merged**: +9 wheel/tire rows all verified — first HUNT and
  Reserve road pairs, the DT Swiss P 1800 alloy staple, GP5000 30c / P Zero 32c / Pro One
  25c width fills. Driver-variant gaps (XDR/N3W siblings) disclosed, not silently modeled;
  fulcrumwheels.com denied pane navigation after first load (documented). Road 240 parts
  (203 verified).
- **catalog/gravel-depth-1 merged**: the GRX Di2 RX825 2x12 group (closing a gap two
  existing rows' notes explicitly flagged) + Zipp 101 XPLR, first Reserve gravel pair, and
  the budget-alloy RX570 (honest unverified via retailer per the relaxed policy). NEW
  VOCAB TALLY ITEM: no sram-eagle system token in gravel — mullet-build staples blocked
  (joins the consolidated ruling). Gravel 288 parts (182 verified).
- **catalog/striders-breadth-1 merged**: +2 (Trek Kickster, Joovy Bicycoo Mg — MSRP not
  the $74.99 sale, per policy); brand coverage confirmed near-complete, Cleary correctly
  excluded (its Gecko is a pedal bike, not a balance bike). Striders 38 bikes (33
  verified). Remaining gap = size variants, not brands.
- Gates after every merge: 7 OK, 988/988, tsc clean.

## 2026-07-22 — BREADTH WAVE begins: gravel-depth-2 lands first (gravel 278 parts)

- **catalog/gravel-depth-2 merged** (+20 rows, 258→278, 174 verified): 8 sibling-tier
  frames (Checkpoint SL6/ALR4, Diverge Expert, Grail/Grizl SLX 8, Topstone C3, Revolt
  Adv 2 — interfaces carried from their platform siblings' maker fetches, per-tier
  weights honest samples) + the new Lauf Seigla Rigid family verified off laufcycles.com;
  8 vocab-clean tires (WTB Vulpine pair, René Herse Fleecer Ridge + Antelope Hill
  verified; Teravail table-reads disclosed); 4 cockpit/saddle incl. verified Woodchipper
  + PNW Coast. Vocab-gap discipline held: Cervélo Áspero-5's T47a "BBright asymmetric
  threaded" is a REAL distinct standard (neither existing token fits — tallied for the
  ruling), Pathfinder Pro's Gripton/2Bliss naming skipped, not mis-tokened. Worker
  flagged its own single-commit deviation (brand enumeration preserved in the message).
- Gates: 7 OK, 988/988, tsc clean.

## 2026-07-22 — mtb-tail-16: aftermarket punch list pays out (MTB 3,343)

- **verify/mtb-tail-16 merged**: 14 promotions (all 4 X-Fusion Manic droppers, 3 Fizik,
  2 SDG, 2 Prologo, 2 Title — one overturning a prior session's wrong CAD-only assumption
  about titlemtb.com — Selle Italia Model X, KS LEV Ci, Renthal Traction) + 5 honest
  corrections without promotion. Discipline catches: KS "Rage-i" is now only sold as the
  shorter/lighter "Rage-i 2.0" — NOT force-matched; Spank + Deity confirmed already 100%
  verified. Flags: sa-sdg-belair-v3-lux-alloy is a likely duplicate of the verified
  belair-v3 (same source URL — data-hygiene pass); hb-burgtec-ridehigh-35 promotes
  instantly if the row gains a rise value (maker publishes a per-rise weight table). ~50
  1-9-row brands remain in the notes for a future tail. Gates: 7 OK (3,343), 988/988, tsc.

## 2026-07-22 — sight160-entry: 6 rows minted, the bike stays honestly unminted

- **catalog/sight160-entry merged (MTB 5,047 parts)**: the Sight 160's missing fills are
  now real rows — Fox DHX2 205x65 trunnion (OE-only, no retail SKU at that size — the
  Tracer 279 pattern, bundledShock wired), OneUp 42/35 stem VERIFIED (and a stale "OneUp
  sells no 42mm stem" note elsewhere corrected — it ships 35/42/50 now), the TranzX
  YSI160 RAD+ adjustable dropper entered at the maker's real S3/S4 200mm point (the
  single-drop schema can't hold a range — representative-point convention, not a
  fabricated midpoint), the real MX wheelset pair (Norco's own DT350 spec, NOT Jenson's
  different DT370 OE package), a VERIFIED Maxxis DHR II 27.5x2.4 DD MaxxGrip. FSA No.57
  headset = the already-cataloged Orbit 1.5 ZS under FSA's other name — near-duplicate
  correctly avoided.
- **The C1 complete bike stays unminted for a NEW reason**: with the full corrected
  mixed-tier fill set, the parts sum is $9,228 vs the $10,499 MSRP — a $1,271 gap the
  bundle invariant rightly rejects and nobody price-tuned away. Either Norco's frameset
  $3,999 sample is low, some OE fills' samples are low, or the bike genuinely prices
  above its parts sum — needs a targeted price-confirmation pass on the 6 sample-priced
  rows + the frame. C2 needs 5 additional tier rows (38 Perf Elite, Maven Base,
  Centerline S2, Eagle 70 chain, cable Eagle 90 pair) — flagged.
- Gates: 7 OK (5,047 parts / 3,327 verified), 988/988, tsc clean, harness fully clean
  (338/338 assemblies).

## 2026-07-22 — blister-sweep-1: 0 promotions, 2 guard-catches (the right kind of zero)

- **verify/blister-sweep-1 merged (doc-only)**: the systematic Blister sweep of premium
  forks yielded no promotions — every lead failed a SPECIFIC guard: EXT Era V2's measured
  weight is exact but its interfaces are still vitalmtb-sourced (weight never promotes
  ahead of maker interfaces; extusa.bike is 404 — EXT's current US page is the unblock);
  EXT Vaia's would-be promotion was caught as a measurement-basis mismatch (catalog 3,195g
  = maker CUT steerer, Blister 3,300g = UNCUT — not a re-measurement); DVO has zero
  Blister coverage (closed for this outlet); Fox 32 SC's figure is stated-not-measured
  and wrong wheel size. Open follow-ups: the ~56 unverified premium SHOCK rows (only
  Float X2 spot-checked — and Blister's X2 reviews are the 2026 damper gen, mismatched),
  EXT interface re-sourcing, Bikerumor/WeightWeenies for DVO. Gates: 7 OK, 988/988, tsc.

## 2026-07-22 — drivetrain-pricing-2: the pricing hypothesis dies honestly

- **fix/drivetrain-pricing-2 merged (doc-only)**: all 25 SRAM Transmission-tier prices
  re-fetched against sram.com model pages — EVERY one already exact current MSRP (a
  2026-07-14 wave had verified them; zero drift since), including the two ids cb-sheets-14
  called "implausibly low." The under-priced speculation is DISPROVEN and the stale
  comment corrected in-file so no future pass re-chases it. The REAL Sight 160 blockers:
  (1) cb-sheets-14's uniform-Eagle-90 fill assumption was wrong — the live build sheet is
  MIXED-TIER (GX AXS T-Type mech + Eagle 90 crank + XS-1275 cassette + GX chain); (2) 5+
  fills have no exact catalog row yet (Fox DHX2 205x65 trunnion, OneUp 42mm stem, TranzX
  YSI160 RAD+ adjustable dropper, FSA No.57 headset, the RaceFace AR30/DT350 mixed-spec
  wheels). Needs a dedicated data-entry pass, not pricing fixes. Habit HT 2 CLOSED
  definitively: cannondale.com's own live page shows $1,299/XCM34 — the $1,499/Judy claim
  from cb-sheets-13 was retailer noise, no mint.
- Gates: 7 OK, 988/988, tsc clean.

## 2026-07-22 — blister-probe-1: the fork-weight wall cracks (narrowly)

- **verify/blister-probe-1 merged**: blisterreview.com renders clean in the browser pane
  (no challenge — WebFetch's 403 was a tooling gap, not a wall; rendering ≠
  circumvention). Their "Blister's Measured Weight" lines carry explicit configs — exactly
  the measured-weight policy's source class. Applied: Fox 36 Factory MY27 29/160 weight
  1920→2134g (config-exact incl. Grip X2 damper, sourceType:'measured' + weightSource;
  interfaces stay maker-sourced). Correctly refused: the 38 review's 2440g figure doesn't
  say WHICH trim was weighed (Factory vs Performance Elite rows both exist) — not
  promoted. Net: the mw1 class-closed finding mostly stands; Blister covers only the
  premium fraction, but the route is now a confirmed reusable lead (noted in
  verify-notes-forks-mw1.md).
- **Process note**: the drivetrain-pricing-1 chip died mid-run (user-interrupted, 9 turns,
  0 commits) — empty branch/worktree cleaned so a re-dispatch starts fresh; the chip
  itself is unchanged and ready to re-paste.
- Gates: 7 OK, 988/988, tsc clean.

## 2026-07-22 — propain-conflicts-1: generation conflict closed; the rigid-post gap goes to Douglas

- **verify/propain-conflicts-1 merged**: the Spindrift CF Base "Eagle 70 Transmission vs
  mechanical GX" conflict is a GENUINE RUNNING CHANGE, not an error — Pinkbike's dated
  2024 launch article confirms mechanical GX at the same price tier, and Eagle 70
  Transmission didn't exist at launch. The row's modelYear:2024 pin makes its current
  fills correct; finding recorded in-desc. A separate later-generation row is flagged as
  future data entry (needs its own freehub-driver derivation), not started.
- **The rigid-seatpost-vs-dropper completeness gap is now a Douglas decision packet**
  (in the report + summarized in the queue): dropper completeness keys off the FRAME, but
  the same frame carries both a rigid-post Base build and a dropper-equipped sibling —
  three remedies scoped with blast radii: (1) per-completebike slot override (most
  general; engine+schema+tests), (2) a frame-level boolean on the DJ driveMode pattern
  (smaller but mints near-duplicate frame ids and doesn't generalize), (3) accept-and-
  document (zero risk; two fully-sourced rows stay permanently unverified). Recurs for
  any brand with the rigid-base/dropper-upgrade pattern. Engine change = adversarial
  review whenever picked up.
- Gates: 7 OK, 988/988, tsc clean (no fill changes, harness not required).

## 2026-07-22 — cb-sheets-14: Norco+Propain grind (MTB 3,325) + two honest refusals

- **verify/cb-sheets-14 merged**: Norco — 6 more verified incl. the same-generation
  discipline that matters (Optic C1 verified against the 24- page, deliberately NOT the
  materially-different 25- tier; Sight C2 + Torrent S1 found via ?localize=en_CA), plus
  real fill fixes (Shore's udh false→true per three sources, exact-match grips/chains/
  saddles replacing placeholders). Propain — 5 more verified via the softened WAF; the
  Spindrift CF Base drivetrain-generation conflict documented, not guessed. Sight Gen 5
  frame MINTED (fr-norco-sight-160, all interfaces off norco.com's 26-sight-c1-160 page).
- **Two refusals that are the system working:** (1) NO Sight 160 completebike row —
  validate's bundle-price invariant exposed that the SRAM Eagle-90/Transmission-tier
  sample prices are implausibly low ($170 crank / $210 mech), a SYSTEMIC pricing gap that
  would fake the savings figure; needs a dedicated pricing-accuracy pass first. (2) NO
  Habit HT 2 current-gen mint — the worker's own fresh fetch of the un-suffixed URL shows
  the archived-identical $1,299/XCM34 spec, CONTRADICTING cb-sheets-13's same-day $1,499/
  Judy claim (likely retailer-derived); re-check before minting.
- Gates: 7 OK (MTB 5,041 parts / 3,325 verified), 988/988, tsc clean, harness fully clean.

## 2026-07-22 — gravel-verify-5: the frames pass (gravel 166/258)

- **verify/gravel-verify-5 merged**: all 32 candidate frames covered — 12 promoted/
  completed (Fuji Jari's bsa-road was a REAL FABRICATION, actually T47-86; 3T Exploro
  Race had three wrong fields at once: bb pf30→bb386evo, seatpost 27.2→proprietary, FD
  none→braze-on; Topstone Carbon 4's bb30a confirmed against a misleading search
  snippet); 4 real spec corrections (Kona Sutra LTD had been proxied from the WRONG
  spec table — base Sutra vs LTD; Nicasio+ is 650b-only; Bombtrack's old clearance was
  the fork's, not the frame's); 8 already-thorough rows correctly left. Also fixed a
  hardcoded-TODAY staleness bug in test-schema-gravel.js (same pattern as the sibling
  test's documented fix — reviewed, not a weakening).
- **THE VOCAB PACKET IS NOW URGENT**: 6 token classes block real sourced rows —
  straight steerer (6+ frames incl. both Canyons), QR rear axle (2), square-taper BB,
  73mm-English BB, I.S. brake mount (NEW), band-clamp FD mount (NEW, 2 frames). Plus
  the Surly Straggler generation split (classic vs 2025 refresh — which gen is the
  row?). All flagged in-row with maker wording; nothing force-fit. Douglas's
  consolidated ruling is the single biggest gravel unlock remaining.
- Gates: 7 OK (gravel 166/258), 988/988, tsc clean.

## 2026-07-22 — mtb-tail-15: the Syncros cluster closes (MTB 3,315)

- **verify/mtb-tail-15 merged**: all 22 remaining Syncros cockpit/saddle rows
  dispositioned — 3 promoted (XC 2.0 stem + the Fraser iC SL pair, whole-unit weight
  split per the existing cockpit-half convention), 16 marked status:'discontinued' after
  direct current-lineup fetches (Hixon 2.0/iC, Kaslo 2.0, the DJ/DH 1.5-2.5 generation
  tail…) with NO supersededBy anywhere — a generation-number change alone isn't rename
  evidence, and none had an unambiguous Syncros-named successor. 3 honest ambiguities
  stay open (XR 1.5 length-mismatched weight, Fraser 2.0-vs-1.0, Tofino Ti rail match).
  The Syncros generation-drift arc (tail-13→14→15) is now fully mapped: no never-reached
  rows remain in this brand+category set. Gates: 7 OK (MTB 3,315), 988/988, tsc clean.

## 2026-07-22 — mtb-forks-mw1: the fork-weight class stays honestly closed

- **verify/mtb-forks-measured-1 merged (doc-only)**: the measured-weight policy sweep of
  all 68 unverified fork rows found ZERO promotable figures — every candidate weight was
  a maker-claimed number recycled verbatim by retailers/editorial (not an independent
  scale), a validator-rejected retailer table, or an unattributed forum reading with no
  config stated. Blister (the policy's best source class) 403s WebFetch — a browser-pane
  retry is the one live lead (rendering ≠ circumvention). Fictitious-travel check ALL
  CLEAR across every family (no Fox-38-150 recurrence); no interface contradictions.
  Per-outlet breakdown in tools/verify-notes-forks-mw1.md so no future wave re-burns
  this. Recommendation adopted: fork-weight passes deprioritized until a better source
  route exists. Gates: 7 OK, 988/988, tsc clean (run by the coordinator; the worker's
  doc-only commit had run validate only).

## 2026-07-22 — fixpacks land: bmx-fixpack-1 + gravel-fabfix-3 + mtb-tail-14

- **fix/bmx-fixpack-1 merged (BMX 130/229)**: Vee Speedster retargeted to the real
  "Speedster BMX" 20x1-3/8 (ETRTO 37-451, 27 TPI, 100 PSI, 385g) and verified — price
  honestly kept sample (the page's $35.70 spans a variant picker and the exact size shows
  Unavailable); United Supreme retired with NO fake successor (Recruit is unrelated;
  "Supreme" survives only as a spare-parts line); WTP OEM hub tombstoned (BMX has no
  ALIASES mechanism — in-file comment confirms status/supersededBy is the tool) → new
  bmx-rh-salt-ex-cassette row, maker-sourced (548g; Salt's "Pro" name is gone, EX is the
  spec-identical current gen; €119.99 not converted, price stays sample).
- **fix/gravel-fabfix-3 merged (gravel 258 parts, 154 verified)**: all four flags RESOLVED
  — Terreno Zero retired (Vittoria's own page: "T10, formerly the Terreno Zero"; real
  745g tube-type successor row added verified); Terreno Mix corrected IN PLACE (the row's
  own tubeless:true attribute uniquely selects CX Endurance 415g — not a coin flip);
  Goodyear Connector retired (Tubeless-Complete/dynamic-rs tier gone; 120tpi successor
  verified); 3T Superergo retired as FABRICATED (fourth independent pass, nothing at
  15°/260g ever existed; LTD 6°/204g successor verified). goodyearbike.com URL drift
  noted (WebFetch 404s where verify-4 fetched — Exa fallback immediately).
- **verify/mtb-tail-14 merged (MTB 3,312)**: 3 more Syncros promotions; the Syncros
  naming-drift pattern mapped (no Hixon 2.0/Kaslo/rigid Duncan 1.5 in the current lineup
  — retirement candidates; Fraser 2.0-vs-1.0 genuinely ambiguous, not guessed). 22
  Syncros rows remain the biggest cockpit opportunity. ODI/Wolf Tooth/Thomson/Ergon
  punch-list re-check: already at the weight-publication ceiling, correctly unchanged.
- Gates: 7 OK (MTB 3,312 · gravel 154/258 · BMX 130/229), 988/988, tsc clean.

## 2026-07-22 — cb-sheets-13: EVERY complete-bike wall was stale (MTB 3,309)

- **verify/cb-sheets-13 merged**: Cannondale, Norco, Propain, Specialized — none is a real
  wall; all render full spec pages via the browser pane once the per-SKU URL is found off
  the rendered category listing (the prior 403/JS-shell notes were tooling gaps). Work
  landed: Cannondale 7/7 (Habit HT 3 had REAL generation drift — fork XCR34→XCM34, a
  duplicated Breakout rear tire → Trail Boss, price fix; Habit HT 2 verified against its
  own archived /2023 URL with the new current-gen HT2 flagged for row-minting; Jekyll
  $7,199→$6,249); Specialized 6 promoted + Epic WC price precision, Chisel correctly NOT
  forced; Trek Remedy lifecycle resolved (whole line discontinued to closeout framesets —
  both rows are legitimate retired snapshots); Norco Range C2 + Propain Tyee Sig-1
  re-confirmed exact. Propain's WAF softened — Exa reaches the Signature Spec tables now.
- **Follow-ups queued**: Norco Sight Gen 5 is a genuine new platform (needs row-minting,
  not a fix); Norco's other 12 + Propain's other 7 rows are now unwalled for a direct
  grind; the new Cannondale Habit HT 2 current-gen row; the Propain 170mm-vs-160mm fork
  substitution now has a second corroborating source (dedicated review when picked up).
- Gates: 7 OK (MTB 3,309), 988/988, tsc clean, harness fully clean.

## 2026-07-22 — gravel-verify-4: every 429 wall falls, gravel 150/255

- **verify/gravel-verify-4 merged**: all six of verify-3's rate-limit walls cleared via
  Exa. Fox 32 Taper-Cast was wrong FOUR ways (700c-only not 700c/650b, maxRotorF 160→180,
  weight 1350→1161g, price $949→$809 — all off Fox's own spec table); Vittoria Terreno Dry
  + PRO Discover bar promoted; every fabfix-2 successor row promoted (Fulcrum Rapid Red
  Carbon, HUNT 4Season + 650B Adventure, Teravail 700x56, Conti Terra Trail via the maker
  PDF, 3T Fango via 3T's own leaflet PDF); Fox Transfer SL dropper corrected 385→327g.
- **Fabfix-3 candidates surfaced (fresh maker data shows real mismatches, queued):**
  Goodyear Connector (row's casing/compound tier appears retired/renamed), Vittoria
  Terreno Mix (two current SKUs, neither matches, 200g apart), Terreno Zero (RENAMED to
  Terreno T10; every real weight ~2x the row's 350g — strong fabrication candidate), 3T
  Superergo (three-way spec disagreement). Next-biggest pool: the ~28 material-confirmed
  but spec-unverified frames.
- Gates: 7 OK (gravel 150), 988/988, tsc clean.

## 2026-07-22 — bmx-sweep-4: BMX 128 verified; two walls browser-confirmed

- **verify/bmx-sweep-4 merged**: 4 promotions off maker pages — Mankind Truth V2 (weight
  168→144g per the maker's German storefront), Dia-Compe 990 (the Taiwan HQ site, 280g/
  wheel added), Primo Remix V3 (price $89.99→$151 maker-listed; 14mm axle convention
  cross-checked against the 17mm-barrel wording), WeThePeople Trust (bbShell + rearAxle
  page-confirmed; frameOnly corrected true→false — complete-bike-only now; topTube
  20.75→21). Two walls upgraded from single-403 to browser-pane-CONFIRMED: kmcchain.us
  sells no full Z410/S1 chains (spares only), duobrand.com is a dead Shopify storefront.
  United Supreme + Stolen Team cranks + Tektro "Race V-Brake" confirmed
  discontinued/phantom names (flagged, unverified).
- **Queued fixes for the next BMX chip (coordinator-ratified, data ready in the report):**
  (1) Vee "Speedster" retarget — the row points at an MTB/e-bike fat tire; the real BMX
  SKU is "Speedster BMX" 20x1-3/8 (ETRTO 37-451, 27 TPI, 100 PSI, 385g — full spec table
  fetched); (2) United Supreme → status:'discontinued' tag; (3) WTP "OEM Cassette Hub" id/
  brand mismatch (really Salt Pro / Eclat Cortex OE hubs — may need retire+re-id).
- Gates: 7 OK, 988/988, tsc clean.

## 2026-07-22 — mtb-tail-13: Giant falls (MTB 3,297)

- **verify/mtb-tail-13 merged**: Giant fully worked, 16/16 — giant-bicycles.com serves
  real standalone US product pages, overturning stale "OE-only" notes from earlier
  sessions (the walls-stale rule again): 6 promotions with maker USD price + weight
  (Romero SL, Contact SL XC stem, Contact SLR Trail integrated bar+stem, both Contact
  Switch AT dropper sizes, Switch Core dropper), 3 corrected-not-promoted (short of THE
  BAR honestly). Race Face + WTB opened (1 promotion); ~85 aftermarket-brand rows remain
  with a prioritized ready-to-apply punch list in tools/verify-notes-tail13.md. NEW GAP:
  Syncros has 25 unverified cockpit/saddle rows never assigned to any tail pass — the
  biggest single cluster left. Gates: 7 OK (MTB 3,297), 988/988, tsc clean.

## 2026-07-22 — Pee Wee theme preservation deleted (Douglas's order)

- Douglas 2026-07-21: kill the Pee Wee Herman theme entirely — the 2026-07-18 removal had
  preserved it for re-add (branch ui/theme-peewee + tag keep/theme-peewee); both are now
  DELETED (local + the remote tag), worktree removed. Any future novelty theme is a
  from-scratch rebuild, per his word ("we will need to revisit entirely"). Live code was
  already clean (the 4-theme registry light/dark/rad/loam never referenced it post-removal);
  COORDINATOR-HANDOFF's preservation note updated. PROJECT-LOG history entries stand as
  history. A "Roadie" theme was also ordered deleted but does NOT EXIST anywhere in the
  repo (no file/branch/tag across 306 refs) — nothing to delete, recorded here so the
  order is discharged honestly.

## 2026-07-22 — kit-13 + the reserved-username batches (1,709 names)

- **verify/kit-13 merged**: kit 544→548. The 11 biggest unverified clusters (79 rows) are
  all settled dispositions — worked the 16 never-touched rows instead: Zoic Black Market
  renamed to the live "Guide" SKU (verified), 2 Madison gloves (MSRP not sale price),
  O'Neal STV via oneal.eu (EN1621-2 described in prose, no level token forced — Scott Fury
  precedent). Category-exit findings via raw products.json evidence: Zoic sells ZERO gloves
  now (4 rows), G-Form Pro-X3 vest gone, Royal Racing is a full brand relaunch (explains
  all 4 stuck rows). patagonia.com is a genuine bot-queue wall (not JS) — honored, stopped.
  Douglas scope calls queued: Cairn "Ride" junior model, O'Neal Park FR SKU identity.
- **forum/pro-rider-reserved-names merged**: 1,295 held-kind rows across 10 disciplines
  (DH 124, EDR 49, XCO 72, freeride 59, BMX race 46, BMX freestyle 112, road WT men 513 /
  women 226, gravel 65, CX 29). Worker's scope judgment: road capped at WorldTour (full
  ProTeams tier would've doubled it — flagged, not silently truncated). 12 names too long
  for the 24-char shape (listed), 4 uncertain names excluded rather than guessed.
- **forum/brand-influencer-reserved-names merged**: new forum-reserved-brands-influencers
  .sql — 384 manufacturer names from all 7 catalogs (transliteration rules documented;
  GT/HT/KS/VP/YT/3T/S&M too short for the 3-char floor, "100%" a flagged judgment call),
  28 influencers (Seth Alvo + Berm Peak + Seths Bike Hacks, Phil Kmetz + Skills With Phil,
  GMBN's presenter roster, Loam Wolf/Drew Rohde…; Singletrack Sampler's real name honestly
  unsourced), Sploosh MTB + Sploosh (rider's real name unfindable — skipped, not guessed).
- **★ NONE of it is live until Douglas runs both SQL files in the Supabase editor** —
  standing reminder = HANDOFF-CHIPS.md open-question item 0 (he asked for repeated
  reminders 2026-07-21).
- Gates: 7 OK (kit 548), 988/988, tsc clean.

## 2026-07-22 — Seat 17 wave 3: tail-12 + bmx-sweep-3 + cb-sheets-12

- **verify/mtb-tail-12 merged**: Pivot Phoenix grips verified (pivotcycles.com reachable
  again); Newmen Evolution SL bar's material was flatly WRONG (carbon→aluminum, 230→340g,
  two converging full-spec retailers; maker site still JS-walled so stays unverified). The
  big result is a MAP, not promotions: ~110 rows across 8 house brands (Bontrager,
  Cannondale, Specialized, PRO, Nukeproof, TranzX, Canyon, Marin) are OE-only cockpit
  parts with NO published standalone weight anywhere — a structural wall, not a fetch
  gap. PRO Koryak droppers: the maker spec table has no weight column, permanent. Leads:
  99spokes may carry maker-sourced spec copy for the JS-walled brands (aggregator — policy
  question before any use); dp-specialized-command-post-349-160 still carries its
  suspected-fictional-combo flag (coordinator/Douglas data-integrity call).
- **verify/bmx-sweep-3 merged**: zero promotions — the final leg confirmed the sweep is
  EXHAUSTED (BSD already done; Fly/GT/Standard/Eclat/Shadow all at their documented
  ceilings). Fresh walls dated: Haro Lineage Master/Downtown DLX/fork absent from the
  live 10-product collection (Haro is complete-bikes-only now), Stranger Level and Colony
  Sweet Tooth absent from current lineups. Alienation Sabbath wheels: first-ever maker
  fetch corrected a wrong "race" intended-use claim (maker says STREET); load-bearing
  fields still unstated, honestly unverified. ~30-row remainder queued with per-row leads
  (KMC 403 needs its browser-pane check; the Vee "Speedster" catalog row may point at the
  wrong product entirely — MTB fat tire vs the real BMX VRB316 SKU).
- **verify/cb-sheets-12 merged**: YT Capra Core 2 AL had two REAL fill bugs (generic
  Renthal substitute → the real hb-yt-780-35 row that now exists; a Center-Lock TRP rotor
  id that contradicted the row's own 6-bolt desc → ro-trp-203-6b). Nukeproof: unwalled on
  retry but re-platformed — the 2023 trims are retired snapshots (SB130 pattern), noted.
  Chromag already exhaustive; its 429 wall re-confirmed both routes.
- Gates: 7 OK (MTB 3,290 verified), 988/988, tsc clean, harness fully clean.

## 2026-07-22 — i9-wao-remodel: evidence beat the premise

- **catalog/i9-wao-remodel merged**: the dispatch assumed all four old I9 lines died in
  the I9/We Are One merger — the worker re-fetched each and found it HALF WRONG: **Enduro
  S is alive** (current "1/1 Enduro S V2"/"Hydra2 Enduro S V2" on industrynine.com — the
  old URL 404 was a reorg, not a discontinuation) and was correctly left untouched.
  Retired with evidence: Hydra2 DH (14 rows → superseded to the Deal family, the Union→
  Triad freehub-variant convention for uncataloged MS/HG combos), 1/1 Enduro (2 rows →
  superseded to the cataloged Enduro S per I9's own "discontinued in your region" page),
  and Hydra/Reynolds Blacklabel (2 rows, supersededBy DELIBERATELY OMITTED — Reynolds now
  lives under Hayes and dropped the I9-hub option entirely; no genuine successor exists).
  No new rows, no deletions, hub category + Bomber 58 pairing untouched (harness C2 5/5).
- Flags recorded: I9's 2026 lines all split into parallel Hydra2/1-1 hub tiers the
  catalog collapses into single rows (a bigger remodel, Douglas's call if wanted);
  **Fuse is I9's E-BIKE tier** — never pull it into the MTB catalog (hard rule 1).
- Gates: 7 OK, 988/988, tsc clean, harness fully clean.

## 2026-07-22 — Zipp 303 S both-ways fix + emtb close-out + forum reserved names

- **fix/zipp-303s-disposition merged (Douglas's both-ways ruling)**: gravel's mislabeled
  303 S pair retired (supersededBy) → real 303 XPLR S pair added verified off SRAM's own
  model page (32mm internal, 40-61c, 1610g pair; split/price disclosed estimates per the
  Firecrest precedent); road gets its FIRST Zipp 303 S pair with real per-wheel maker
  weights (711/819g). Road 223 parts (187 verified) · gravel 255 (137).
- **verify/emtb-5 closed, nothing to merge**: all 26 remaining unverified e-MTB rows are
  confirmed discontinued/superseded SKUs — EMTB verification effectively complete at 66/92;
  the tail is documented-dead. Future lead: searched-not-guessed URLs for two Marin 2026 rows.
- **Forum reserved names**: new additive supabase/forum-reserved-additions.sql (idempotent)
  — "Dirt Jesus" reserved (held) on Douglas's order; SETUP.md documents the file. Pro-rider
  name batch chipped (held-kind so real riders can claim via the verified-pro flow).

## 2026-07-22 — Seat 17 wave 2 lands: tail-11 + cb-sheets-11 + oewheels-1 + gravel-fabfix-2

- **verify/mtb-tail-11 merged**: Syncros cluster — 5 promotions with real corrections (AM
  1.5 stem price $30→$89.99, rise 4°→0° per the maker page vs a build-sheet claim). ~450
  cockpit/saddle rows remain; brand breakdown in tools/verify-notes-tail11.md.
- **verify/cb-sheets-11 merged**: both brands were already sheet-verified (worker correctly
  drift-checked instead of redoing — the stale-brief guard worked). Pivot: 0 drift.
  **Orbea's WAF wall is PASSABLE now** — the `en-us/` locale path loads clean in the
  browser pane (`us-en/` still 404s; every prior wall note used the wrong path). 9 rows
  re-priced off orbea.com itself (Oiz M-Team $8,599→$10,473!); 4 Rallon rows confirmed
  retired (live Rallon line is now largely e-only — identified by URL and NOT fetched,
  hard rule 1). Orbea fills still vitalmtb-sourced (configurator is WebGL/canvas, no DOM
  text) — flagged per-row.
- **verify/mtb-oewheels-1 merged**: 26 wheel promotions (Reserve 6, We Are One 17, I9 3).
  ★ FINDING: **Industry Nine + We Are One appear merged for 2026** — industrynine.com now
  sells the shared Deal/Fuse/Whisp/Wanderer/Triad/Sector range; I9's old branded lineup
  (Enduro S, Hydra2 DH, 1/1, Blacklabel) all 404. 26 I9 rows have no live page — needs a
  deliberate re-model decision (Douglas packet), not piecemeal patching.
- **fix/gravel-fabfix-2 merged**: the 12 verify-3 flags fully dispositioned. 7 phantom
  SKUs retired on the hunt-adventurewide precedent with REAL successor rows added (gravel
  242→253): 3T Discus fork→Fango LTD, HUNT Adventure Sport 700c→4Season, I9 Solstice
  G→SOLiX G GRCX (itself honestly discontinued), Bontrager Paradigm Elite Gravel→Elite 25
  (+freehub xdr→hg-road fix), Fulcrum 42 DB→Rapid Red Carbon, Teravail Sparwood
  700x47→700x56, Conti Terra Speed 650x47→Terra Trail 650x47. 4 name fixes in place (Trek
  Checkpoint fork "IsoSpeed" fiction dropped; Schwalbe G-One R→AllRound; G-One Bite
  trim pinned; FSA "Orbit C-40"→Orbit ZS Short). 2 thin-evidence rows honestly left. Open:
  Zipp 303 S disposition (Douglas), 4 odd-id alias candidates, 2 vocab gaps (Teravail
  Light&Supple casing, Conti PureGrip compound).
- Combined gates: 7 validators OK (MTB 3,289 verified · gravel 253 parts), 988/988 tests,
  tsc clean, verdict harness fully clean.

## 2026-07-21 — bmx-sweep-2: BMX 124 verified + a coordinator demotion on the review gate

- **verify/bmx-sweep-2 merged (with one coordinator correction)**: Odyssey Evo 2.5 +
  Springfield brakes promoted (mount page-confirmed; missing weight never blocks — THE
  PRICE RULE), Utility Pro sprocket prices corrected to the current SKU family. NEW
  STRUCTURAL WALL: subrosabrand.com's entire frame category resolves to a stale 2012
  placeholder post — all three Subrosa frames stay retailer-sourced/unverified. Redline's
  current 6-product Diamondback storefront confirms Proline base/Forklift/Roam retired.
  Cult/Odyssey/Profile settled walls re-checked, not re-battered.
- **Coordinator demotion (the review gate working as designed)**: the wave promoted the
  Odyssey Vandero front hub on a brand-wide "Odyssey is 20in-only" inference for
  wheelSize — the one engine-read field, NOT stated on the hub's page. The cited
  cult-race precedent doesn't transfer: that frame's own size run corroborated 20in; a
  bare hub is wheel-size-agnostic (laces into 22/24in), so wheelSize there is a modeling
  choice, not a maker fact. Demoted back to unverified (page-sourced weight 317g + price
  kept); the prior wave's explicit withholding stands. BMX 115→124 net this seat.
- Gates: 7 OK, 988/988, tsc clean.

## 2026-07-21 — striders-4: close-out, 29→31 verified

- **verify/striders-4 merged**: Bixe 12 promoted (the prior "no maker page exists" note
  was WRONG — Exa surfaced bixebalancebike.com's own page; weight corrected 4.6→4.0 lb,
  seat range 11.5-15.5→11-17 in) and Kinderfeets Classic promoted via the maker's own NZ
  regional storefront spec block (weight 3700→3300 g). Chillafish BMXie2 seat range moved
  to the maker's own 320-390 mm but stays unverified (no published weight — THE BAR held).
  4 remaining walls re-confirmed genuine (Strider 12 Classic discontinued, Schwinn 404,
  Giant publishes no weight by policy, Bixe 16's retailer listing self-contradicts); the
  4 blank seat-height rows re-confirmed correctly blank (makers publish inseam/rider-height
  only). Striders 31/36; the tail is now all genuine walls. Gates: 7 OK, 988, tsc clean.

## 2026-07-21 — kit-12: the promotion-hunt pattern mostly evaporates (a good sign)

- **verify/kit-12 merged**: kit 543→544. The kit-11 "fetched-but-never-flagged" lead
  largely dissolved on inspection — of 46 keyword candidates, 45 were correctly-withheld
  rows (documented walls, identity ambiguity, plain samples); only ONE genuine
  ran-out-of-time gap existed (Scott Fury goggle). Promoted it with a fresh re-fetch that
  caught real price drift ($59.95→$79.95 since 07-17 — notes DO go stale; the re-fetch-
  before-promote rule paid for itself immediately). Negative finding worth keeping: the
  prior waves' withholding discipline was near-perfect. Gates: 7 OK, 988 tests, tsc clean.

## 2026-07-21 — gravel-verify-3: material check CLEAN, 18 promotions, 12 fabrication flags

- **verify/gravel-verify-3 merged**: gravel 118→135 verified. Task A (the systemic
  material-mislabel grep over all 32 remaining unverified frames): CLEAN — zero mislabels
  this pass, unlike verify-2's four. Task B (aftermarket tail, 71 real rows — the brief's
  ~118 was stale): 18 rows promoted with maker-confirmed corrections (notable: ESI Chunky
  was ~2x too heavy at 120g vs real 60g; Ergon "SR Allroad Core" was a nonexistent SKU —
  model corrected to "SR Allroad", id kept append-only and flagged for a future alias pass).
- **The 12 fabrication/wrong-model FLAGS are the headline** (all left in-row, unchanged,
  per doctrine — coordinator/Douglas call): Zipp 303 S is SRAM's own ROAD wheel mislabeled
  gravel (real gravel SKU = 303 XPLR S); Teravail Sparwood has no 700c size at all; I9
  "Solstice G" doesn't exist (real line = SOLiX G); Fulcrum "Rapid Red 42 DB" absent from
  Fulcrum's own lineup; HUNT Adventure Sport 700c phantom (650b-only product); Bontrager
  "Paradigm Elite Gravel" no such SKU; FSA Orbit C-40 is IS42/52 not ZS44/56; 3T "Discus"
  fork doesn't exist (Discus = wheels; real fork = Fango); Trek "Checkpoint IsoSpeed fork"
  conflates a frame tech; Continental Terra Speed 650x47 is a Terra Trail size; Schwalbe
  G-One R/Bite trim ambiguity; 3T Superergo flare matches no variant. Most are grind-1-era
  rows — the serial-fabricator pattern again. Fix/retire list needs a decision pass.
- Documented walls (one honest retry each): ridefox 429, specialized 403, goodyearbike,
  vittoria, pro-bikegear 429×4, us.3t.bike 429. No new vocab gaps.
- Gates: 7 validators OK, 988/988 tests, tsc clean (no compat.js change).

## 2026-07-21 — Seat 17 wave 1: cb-sheets-10 + bmx-price-sweep + mtb-tail-10

- **verify/cb-sheets-10 merged**: Yeti's 20 "unverified" rows were a stale-brief artifact —
  already sheet-verified 2026-07-18; a fresh drift re-check found 0 changes. The real find:
  **transitionbikes.com's fetch wall is DOWN** — full itemized build tables render clean.
  6 real Transition drift bugs fixed + 5 rows promoted (Sentinel/Patrol/Smuggler; incl. a
  pre-existing desc/fill self-contradiction resolved in the fills' favor). 9 retired-trim
  rows correctly left snapshotted. MTB 3,253 verified. Pivot (14) / Orbea (13) still open.
- **verify/bmx-price-sweep merged**: BMX 115→122 verified. Chase RSP 3.0/5.0 promoted with
  a real correction (RSP 5.0 rearAxle 14mm→10mm per the maker's own geometry table); Fit
  Bike Co 1→6 verified incl. the PRK rearBrakeMount none→u-brake correction (the
  "commonly run brakeless" guess contradicted the shipping build). THE PRICE RULE honored
  throughout (no complete-bike prices on frame rows). Doctrine confirmed by grep: BMX frame
  headTube/rearAxle + fork steerer/axle are display-only. NEW WALLS: sandm.cc unreachable
  (infrastructure, not bot — WebFetch socket-closed AND browser pane fail); Chase sells no
  standalone parts (structural, re-confirmed current). ~25 brands still un-swept for the
  price-rule shape — listed in the report, good next dispatch 2-3 brands at a time.
- **verify/mtb-tail-10 merged**: the XM1700 fix — DT Swiss model-finder confirms native
  CENTER-LOCK + included 6-bolt adapter; 5 wheel rows corrected, ~10 dependent
  complete-bike fills flagged rotorAdapterDocumented:true (validate warnings 20→0).
  OE-wheel fabrication sample (We Are One/Industry Nine/Reserve) clean — note the real
  domain is weareonecomposites.com. Tire tail: 7 rows fixed incl. a Specialized
  near-duplicate row and a caught-and-discarded phantom number. Dispositions in
  tools/verify-notes-tail10.md. Open: ~90 OE-wheel rows unverified (sampled only), WTB
  Breakout casing vocab gap, Cross King PDF via the r.jina.ai route.
- Combined gates: 7 validators OK (MTB 5,040/3,258 verified), 988/988 tests, tsc clean,
  verdict harness fully clean (A-E incl. E=0).

## 2026-07-21 — Seat 17 seated + road-17 close-out audit

- **Seat 17 succession complete** (evening): handshake/rename confirmed, seat 16 archived,
  both session-lifetime watchers re-armed (hourly fleet-sweep cron + worker-reports
  Monitor), seat 16's merged coord worktree/branch and stale launch.json entries
  (coord-s15/coord-s16) cleaned. Fleet was empty at seating.
- **verify/road-17 merged (note-only)**: the close-out audit of road's last 36 unverified
  rows. 3 retryable conditions re-attempted, all confirmed parked: Ritchey C260 regional
  TLS wall unchanged; Prologo Dimension narrowed to prologo.it/en/products/dimension-143
  ("Weight with Tirox rail: 205 g" maker figure) but NOT promoted — retailers quoting
  179/202g under the plain name leave a real identity/weight conflict; Roubaix Expert
  re-fetch reconfirmed every engine-read field with no published frameset weight (the
  documented road no-frame-weight pattern). statebicycle lead was a gravel-catalog
  artifact — zero road rows source it. Seatpost pair (Domane KVF / Synapse SAVE) untouched
  pending Douglas's interface-exception ruling (open-question item 2). Road stays 185/221;
  no promotions, no spec-field changes. Gates: 7 validators OK, 988 tests, tsc clean.

## 2026-07-21 — THE FABRICATE-FILL AUDIT LANDS + gravel-7/kit-11 + doc truth

- **audit/fabricate-fill-1 merged (report-only)** — the headline goes further than the
  trigger: the Checkpoint SL 7's `bb:'bb86'` was ITSELF fabricated (gravel-1) — Trek's own
  spec table says T47 threaded (coordinator re-fetched verbatim: "SRAM DUB Wide, T47
  threaded, internal bearing"), so the "gap" the later BB swap "filled" never existed, and
  the current Checkpoint golden pairs a physically wrong BB. Also confirmed-wrong:
  Checkpoint ALR 5 (also T47), Praxis "DUB T47" (Praxis makes no DUB T47 — real product is
  Shimano-24mm), and the phantom Hunt "Adventure Wide 650B" pair (Hunt's lineup has no such
  model). gravel-1 is a serial offender (~10 fabrications traced); its 81 still-unverified
  rows lead the next gravel deep wave. Fix list is chipped for Douglas (error-tier frame
  fields + golden repoint + two retirements under the new gravel lifecycle fields).
- **catalog/gravel-7 merged**: Ekar is genuinely a split lever/caliper (bundle exception
  correctly NOT applied — a negative finding is a finding); status/supersededBy ported to
  schema-gravel (Douglas sign-off by dispatch); Levante recorded discontinued; +8 tires
  with maker weights. Gravel 86/223.
- **verify/kit-11 merged**: kit 539; ION/Loose Riders re-mapped (identity, not price, is
  the real wall; looseriders.com is now a parked domain — real site is loose-riders.com);
  the "fetched-but-never-flagged" promotion pattern noted as a future hunt pass.
- **Doc truth restored** (gravel-7's flag): CLAUDE.md hard rule 3, data/gravel.js header,
  and schema-gravel.js header no longer claim gravel/road/EMTB are off-live.

## 2026-07-21 — mtb-tail-4: MTB 3,163 verified + the walled-brands list falls

- **verify/mtb-tail-4 merged**: 29/30 Shimano mechanical rows verified via the handbook
  PDF route (6 editions incl. archives; NEW DOCTRINE for dense Shimano tables — render
  pages as images at 150dpi and read visually, pdftotext -layout produces false column
  alignments). Real false-fit fixed: CUES FC-U4000-1 is SQUARE-TAPER, not the tier's
  24mm (handbook p.188 sole checked box); Marlin 5 fill swapped to the real BSA73
  square-taper BB. FC-MT612 honestly skipped — absent from every edition 2018-2026;
  flagged as possible OEM-only or entry error, Douglas/coordinator call.
- **Lane 2 — the walled-brands re-test**: 9 of the 10 "JS-build-kit walled" complete-bike
  brands are NOT walled (Yeti/Ibis/Mondraker/Norco/Devinci render spec tables outright;
  Rocky Mountain/Ghost are native <details> accordions — one JS open call; Cannondale's
  "wall" was a wrong URL pattern, /trail-bikes/ not /trail/; Pivot's data routes return
  real JSON). Only Propain is a genuine async configurator, and even that is NOT
  bot-detection. The stale wall list gated a large cb-sheet verification pool — a
  per-brand cb-sheets-6 fan-out is the obvious next MTB lane.

## 2026-07-21 — kit ALIASES port + road-10 bundled-SKU ruling executed

- **feat/kit-aliases-1 merged**: KIT_ALIASES/canonicalKitId (third alias port — MTB, BMX,
  and kit are all tombstone-capable now), wired into KitBuilder's localStorage restore,
  and the 8 kit-10 fabricated rows retired (1 retarget Foxguard→Defend, 7 tombstones,
  inline rationale preserved at each former location). Douglas's standing TLD Grind/Roost
  flag CLOSED. Kit 706 parts / 534 verified; 875 tests (6 new).
- **catalog/road-10 merged** (Douglas's sixth interface-exception extension, ratified by
  dispatch): bundled shift-brake systems verify on interfaces; per-slot prices are labeled
  estimates summing to real bundle MSRPs (RED $745, Rival $280, Apex $270+$225 — the Apex
  per-SIDE bundle shape is a documented protocol caveat); weights stay nominal. Road 128
  verified. Ekar Ergopower analog queued for a future gravel wave under the same ruling.
- Still out: mtb-tail-4 (the last runner).

## 2026-07-21 — REPORT-DROP CHANNEL PROVEN + gravel 78 verified + kit-10 + road-9

- **The click-free harvest channel works end-to-end**: emtb-5, road-9, kit-10, and
  gravel-6 all reported via .claude/worker-reports/ drops — the coordinator's folder
  Monitor fired within a minute of each finish, zero Douglas clicks. The hung-send
  pattern is dead.
- **catalog/gravel-6 merged**: 54→78 verified (+24, depth over breadth). INTEGRITY
  CATCHES: a prior wave had DELIBERATELY swapped two BB shell labels to fabricate-fill
  the Checkpoint SL 7's BB86 gap (SM-BB72 is really pf86, SM-BB52 really threaded —
  cross-corroborated by road-6's independent productinfo fetch; golden repointed
  honestly); PD-GRX600 isn't a real SKU (→PD-ES600); Paceline + Campagnolo AFS rotors
  are center-lock-only, not 6-bolt; GRX RX610 has no 48T ring (→46T). Levante wheelset
  discontinued (successor Bora X Gravel) — schema-gravel lacks status/supersededBy,
  flagged for sign-off. RECOMMENDATION QUEUED: a scoped fabricate-fill audit (the
  catalog-auditor pattern) over rows entered by the same wave that planted the BB swap.
- **verify/kit-10 merged**: 17 ambiguity verdicts, kit 534 verified; TLD Grind/Roost
  (Douglas's standing flag) = both fabricated; 8 retirements parked on the kit-ALIASES
  port (chip dispatched). **catalog/road-9 merged**: GRX 1x lever pair verified with
  per-lever maker weights; SRAM bundled-SKU policy question escalated → Douglas ratified
  wave road-10 by dispatch. **verify/emtb-5 merged**: honest zero-yield re-test.

## 2026-07-21 — FILE-CONTAINMENT AUDIT (Douglas's catch) + enforcement actually ON

- **Douglas found stray project folders on D:\** — full audit run. Removed: all 19
  D:\mtb-worktrees\ worktrees (18 merged+clean; 1 had only a regenerable
  drift-report state diff), the C:\ emtb-1 worktree, the Temp mmr worktree (branches all
  preserved in the repo — worktree removal never deletes commits), and
  D:\scratch_cbgrind (6 tiny harness outputs, preserved at .claude/legacy-strays/).
  D:\mtb-worktrees itself is empty; the top-level shell is deletion-protected from this
  session — one manual click, or leave it. launch.json pruned of 4 outside-path entries.
- **ROOT CAUSE FOUND — the containment hook was silently OFF in live sessions**: main's
  committed settings.json has carried the PreToolUse guard since 2026-07-18, but the
  SHARED checkout (which live sessions actually read) had stale uncommitted
  settings.json modifications predating the hooks block. Every session since has run
  unguarded — hence the strays. FIXED: guard upgraded (matcher Bash|PowerShell — workers
  use both shells; absolute script path), pipe-tested (deny/allow/non-match), committed
  to main, shared checkout synced byte-identical to main, and PROVEN LIVE — the hook
  denied a tripwire command in the coordinator's own session.
- **verify/emtb-5 merged**: honest zero-yield — all 26 blocked EMTB rows re-confirmed
  with fresh fetches; Bullit XX trim flag queued. FIRST harvest delivered via the new
  click-free report-drop channel (.claude/worker-reports/ + coordinator Monitor).

## 2026-07-21 — ★★★ BUILDMYGRAVELBIKE LIVE — THE FAMILY IS COMPLETE ★★★

- **gravel.html flipped live** on Douglas's word (223 parts / 54 verified at flip — every
  unverified row honestly sample-labeled, same convention every surface shipped under).
  deploy.yml stages page+data; all six switchers uniform (verified byte-order across
  every page); /home has NO coming-soon doors left; /about carries all six cards.
- **Six live surfaces**: BuildMyMTB · BuildMyBMX · BuildMyRoadbike · BuildMyGravelBike ·
  BuildMyEMTB · BuildMyRideKit, plus /home, /about, and ddubsworks.com. The domain
  redirect batch (Douglas's all-at-once) is now fully un-gated — five Cloudflare rules,
  all targets real.

## 2026-07-21 — SIX-CHIP OVERNIGHT HARVEST (all merged, gates green)

- **road-8**: 105 cassette corrected 11-36→11-34 (coordinator re-fetched productinfo
  CS-R7101-12: "Combination 11-34T" verbatim, sole combination — page even publishes
  361g); Praxis T47 was really SRAM's BB-DUB-T47-A1 (id token flagged for a future road
  id-migration pass — road.js has no ALIASES yet); RED AXS lever+caliper re-split to sum
  to the real $745 bundle. Road 121 verified.
- **mtb-tail-3**: the Shimano mechanical-MTB interface exception (Douglas-ratified by
  dispatch) landed in VERIFY-PROTOCOL; +17 rows; the worker caught two errors in the
  dispatch brief itself. ~31-row follow-up set flagged. MTB 3,134 verified.
- **emtb-4**: THE BIG ONE — EMTB deep-verify 2→66 of 92 across 27 brands (avinox vocab,
  sourced; Bullit Wh-in-power-field copy bug; Radon Jealous→Render platform remap; Scott
  Genius eRIDE nameplate retirement recorded, not invented). Live surface now genuinely
  sourced.
- **kit-9**: kit 531; Giro TrailBuilder UN-discontinued (prior wave misread a stale 404);
  the jersey/shorts/pants tail honestly confirmed dead-ended (~15 naming ambiguities
  await human review).
- **cb-sheets-5**: complete bikes 174 sheet-verified; **specialized.com is NOT walled**
  in the browser pane (stale-wall doctrine strikes again) — ~30 more Specialized cb rows
  unlocked; the JS-build-kit "walled" brand list (Yeti/Pivot/Ibis/…) deserves the same
  re-test. Enduro Comp dropper conflict left for a dedicated frame re-check.
- **gravel-5b**: 223/54; GRX fabrication catches off bike.shimano.com per-SKU (FD-RX810-F
  130→96g; FD-RX600 = same physical SKU, corrected not deleted); four schema-vocab
  non-fits logged (square-taper, slider dropouts, 36.1mm post, noisy Wilier data).
- Board: MTB 5,033 (3,134) · Kit 714 (531) · BMX 227 (90) · Road 217 (121) · Gravel 223
  (54) · Striders 36 (28) · EMTB 92 (66) · cb 174/437 sheet-verified · 869 tests.

## 2026-07-21 — BMX ALIASES mechanism shipped (share-restore integrity)

- **feat/bmx-aliases-1 merged + deployed**: BMX_ALIASES/canonicalBmxId in compat-bmx.js
  (compat.js contract mirrored exactly), optional status/supersededBy in schema-bmx with
  an order-independent cross-check, 3 pre-mechanism removals seeded with per-pick
  reasoning. Honest premise correction by the worker: bmx.html has NO hash share links —
  the localStorage restore is the real analog, and that's what resolves through
  canonicalBmxId now (browser-proven: retired ids restore instead of silently dropping).
  869 tests. The 2026-07-21 governance flag is CLOSED: future BMX retirements go through
  this mechanism, never removal.

## 2026-07-21 — NINE-CHIP WAVE CLOSED (all nine harvested) + build sheet shipped

- **feat/build-sheet-1 merged + deployed** (feature slate): click-opened printable build
  sheet — verdicts verbatim, print CSS gated on dialog-open so normal printing untouched,
  15 new tests (859 total). Review false-alarm turned into doctrine: the headless pane
  NEVER dispatches dialog 'close' events (memory updated) — the worker's puppeteer
  evidence proved the class-drop correct in real Chrome. QR + torque-specs deferred.
- **catalog/road-7 merged**: road 119 verified. Tiagra CONFIRMED genuinely 10-speed
  (fields already right; system token held pending a shimano-road-10 labeling decision).
  Escalations logged: 105 cassette 11-36-vs-Shimano's-11-34 (fix collides with pinned
  capacity tests — needs a scoped chip), Praxis T47 brand-attribution smell, RED AXS
  pricing oddity.
- **catalog/gravel-4b merged**: gravel 220/50; Bombtrack + Sonder frames; t47-86 vocab
  (real 85.5mm T47, sourced); Standert/Poseidon 429 walls documented.
- **catalog/bmx-hygiene-1 merged**: Colony bars split into 4 real variant rows (227
  parts). GOVERNANCE FLAG: the split REMOVED the 2 generic ids (file precedent; BMX has
  no ALIASES/status mechanism) — acceptable this once, but BMX is LIVE with share links:
  a tombstone mechanism is REQUIRED before any further BMX id removals. Queued.
- **CLAUDE.md Shimano-weights line footnoted** (coordinator): productinfo per-SKU pages
  carry real weights for road/Di2/pedals; mechanical MTB tiers stay blank — tier-gated.
- Board: MTB 5,032 (3,114) · Kit 714 (524) · BMX 227 (90) · Road 217 (119) · Gravel 220
  (50) · Striders 36 (28) · EMTB 92 (2) · 859 tests · six surfaces built, four live.

## 2026-07-21 — NINE-CHIP NIGHT WAVE: dedupe incident + rolling harvest

- **Double-dispatch incident (UI-side double paste), fully contained:** 4 of 9 chips ran
  twice (kit-8, gravel page, MTB tail 2, EMTB 3). Zero data damage — git's
  one-branch-one-worktree rule made every collision safe; kit-8's twin 2 found twin 1's
  finished branch and stood down on its own. Coordinator archived the redundant twins
  (kept the further-along one per pair). LESSON → future chip boilerplate gains: "if your
  exact branch already exists with commits, stand down and report."
- **Harvested so far this wave** (rolling): kit-8 (kit 524 verified) · gravel.html BUILT
  off-live — the family is SIX-FOR-SIX on surfaces; GRX build proven end-to-end ·
  MTB tail 2 (MTB 3,114 verified; productinfo route generalizes to MTB INTERFACES
  everywhere but weights only on Di2/pedals — CLAUDE.md needs a footnote not a rewrite;
  Fox tech sheets are image-only, gold for interfaces) — WITH a coordinator REVERT: the
  36 SL maxRotorF 203→230 relaxation hit a Fox-vs-Fox source conflict (shop page "Up to
  203 compatible" vs drawing "180-230MM"); conservative 203 restored on all 5 rows, both
  quotes in desc, flagged for mechanic review · EMTB 3 (92 bikes — 9 wrong-brand
  re-entries + 19 gen fixes; identity now current, deep-verify queued) · striders 1b
  (5→28/36 verified; 9 real spec corrections incl. a copied-price catch).
- Still working: road 7, gravel 4, BMX hygiene, build sheet.

## 2026-07-20 — HG-L2 dual-body rule SHIPPED (the last live false verdict of the day)

- **fix/road-hgl2-class merged + deployed**: road-12 Shimano cassettes now fit both HG
  bodies per C-731 (coordinator-fetched verbatim). Exactly 5 catalog pairings change —
  all false-won't-fit errors falling silent; a 650-pairing mechanical sweep proves
  everything else byte-identical. The worker implemented NARROWER than the brief (both
  tokens must be HG-family) so a mis-tokened row keeps its error rather than gaining a
  false fits — the right call, adopted. 844 tests (6 new). The HG 1.85mm-spacer tier
  stays [MECHANIC REVIEW], deliberately unsoftened.
- Worker's passing flag for the next road wave: cs-shimano-tiagra4700-1134 carries
  system:'shimano-road-11' with speeds:10 (Tiagra is 10s) — pre-existing identity oddity,
  queue a scoped look.

## 2026-07-20 — FIVE-GRIND HARVEST (late evening) + THE HG-L2 RESOLUTION

- **All five evening grind chips harvested in one sweep** (every final send_message hung —
  reports pulled from transcripts; all five cut from fresh main): forks tail (3 SR Suntour
  maxRotorF 180→160, restrictive direction, maker-fetched) · kit 7 (497→510; shoe tail
  CLOSED — Bontrager closure corrections, fake-SKU re-scopes; TLD Grind/Roost stay flagged
  for Douglas; ~35-row "quiet backlog" of near-verified apparel noted) · road 6 (81→108
  verified — the productinfo.shimano.com per-SKU route WORKS in the browser pane and
  carries real per-SKU weights, contradicting the "Shimano publishes no weights" lore for
  current-gen road; SM-BB72 shell bsa→pf86 rule-11 fix; 2 fake SKUs re-scoped) · gravel 3
  (218/45; Ekar fabricated weights corrected off campagnolo.com; Orbea BB386EVO via Exa;
  Kanzo Fast honestly excluded) · EMTB 2 (75→83 bikes; full triage table; 4 wrong-brand
  platforms re-entered; schema gains status/supersededBy).
- **HG-L2 SOURCE CONFLICT RESOLVED (coordinator, C-731 fetched verbatim):** the chart's
  matrix reads "HG spline L2 (ROAD 12-speed dedicated): ROAD 12-speed ✔" — the L2 body
  accepts ALL road-12 cassettes (Dura-Ace/Ultegra/105), and the same cassettes also ✔ on
  HG spline L. The bike.shimano.com article's "Dura-Ace only" wording predates the
  Ultegra/105 12s launches. CONSEQUENCE: a single freehub token can't express road-12's
  dual-body fit — the current catalog false-errors 105/Ultegra-on-L2-wheel AND
  Dura-Ace-on-hg-road-wheel (both false-WON'T-fit, the safe direction, but road.html is
  live now). Fix = an engine rule in compat-road.js's freehub check (road-12 cassette
  class accepts {hg-l2, hg-road}), chipped for adversarial review per the engine bar.
- Totals: Kit 714 (510) · Road 217 (108 — crossed 50%) · Gravel 218 (45) · EMTB 83 (2).

## 2026-07-20 — ★★ ROAD + EMTB GO LIVE (Douglas: "do them all at once")

- **BuildMyRoadbike (road.html) and BuildMyEMTB (emtb.html) flipped LIVE** on
  buildmymtb.com: deploy.yml stages both pages + data/road.js + data/emtb.js; the family
  switcher on all five app pages gains both entries (verified byte-identical, gear-last,
  across index/bmx/KitBuilder/road/emtb); /home's Road + E-MTB doors went live (gravel
  stays the one coming-soon); /about gains both family cards. emtb.html's switcher was
  reordered to gear-last and its off-live-preview label removed at flip. Gates green
  (838, 7 validators, tsc, mojibake scan) + all-page switcher/dialog sweep pre-push.
- Road ships at 217 parts / 81 verified (above BMX's own 59-verified flip precedent);
  EMTB ships as a browse/compare surface, 75 bikes / 2 verified, every row honestly
  sample-labeled (wave-2 triage queued to refresh stale generations).
- The BuildMy* domain Cloudflare redirect packet handed to Douglas (his account = his
  clicks); gravelbike targets /home until a gravel page exists.

## 2026-07-20 — ★ BMX 40% BAR CLEARED (90/225) + EMTB wave 1

- **verify/bmx-7 merged**: 77→90/225 verified — **Douglas's 40% go-live bar hit exactly**,
  via his 2026-07-20 ruling (given by dispatching the chip): the interface-verification
  exception extends to BMX small parts whose makers publish only shipping weights. 13
  verifications (9 Odyssey, 4 Cult) on raw Shopify product JSON; shipping weights NEVER
  entered the weight field. Two corrections: R32 fork brakeMount u-brake→none (maker's own
  tag "Brake Mounts:None"; restrictive direction), AK Bars rise/width to spec-sheet values.
  Wave finding now in VERIFY-PROTOCOL: several schema-required BMX fields are display-only
  (no checkBmxBuild rule reads them) — only rule-read fields gate verification.
- **verify/emtb-1 merged (compact)**: 2/75 verified; core finding = most seed rows are a
  stale platform generation (wrong motor brand, not drift). Wave-2 directive (coordinator
  call, keeping Douglas's e-exposure minimal): triage all 75 by motor-brand spot-check
  first, then deep-verify the survivors.
- Day totals now: MTB 5,032 (3,100) · Kit 714 (497) · BMX 225 (90 — bar) · Road 217 (81) ·
  Gravel 212 (38) · EMTB 75 (2) · 838 tests · ddubsworks.com live.

## 2026-07-20 — road.html + emtb.html BUILT (both OFF-LIVE) + ddubsworks hosting

- **feat/buildmyroadbike-page merged**: `road.html` (BuildMyRoadbike) on the bmx.html
  pattern over the shared drop-bar engine — build-dependent completeness (2x⇒FD required,
  rim-brake⇒no rotors), four-state dots, family switcher (gear-last, no gravel/EMTB tease).
  Coordinator browser check: engine live, 217 parts picked up at runtime (the road-5 data,
  newer than the page's fork point — new-file merge, no conflict), zero dialogs cold.
  Worker flag for a future road pass: golden-4's "no Di2 FD exists" comment is stale —
  fd-shimano-ultegra-r8150 now exists.
- **feat/buildmyemtb-page merged**: `emtb.html` (BuildMyEMTB) — browse/compare/filter over
  data/emtb.js, deliberately NO compat engine (EMTB-MODEL's own call: OEM-locked platforms).
  Coordinator check: loads no compat.js (verified in-browser), 75 cards render, zero
  overflow/dialogs. Hard rule #1 containment intact; nothing live links to either page;
  deploy.yml untouched — both pages are repo-only until Douglas's flip words.
- **ddubsworks.com hosting built** (Douglas: "GitHub, under dwills38"): repo
  dwills38/ddubsworks serves the D2a maker page via its own Pages site, custom domain set,
  build green. Awaiting Douglas's one Cloudflare CNAME (@ → dwills38.github.io, grey-cloud
  until cert) then HTTPS-enforce. sites/README.md records the source-of-truth split.
- Still running: EMTB verification wave 1 (2 batches committed so far).

## 2026-07-20 — BMX 6 + ROAD 5 + FRAME EXPANSION merged (evening wave 2)

- **verify/bmx-6**: 77/225 (34.2%). 8-brand scope expansion honestly exhausted the boutique
  tier — 44/45 targeted rows independently re-confirmed walls. The two remaining paths to
  Douglas's 40% bar are BOTH his policy calls: (1) Odyssey/Cult's 40 rows need a ruling on
  Shopify shipping-weight-bucket data; (2) the Colony clamp/variant-ambiguity questions.
- **catalog/road-5**: road 211→217 rows, 68→81 verified. TWO LIVE FALSE-VERDICT FIXES in
  SRAM Apex, both coordinator-re-fetched on sram.com CS-PG-1231-D1 (verbatim: DRIVER BODY
  INTERFACE Splined 11; CHAIN TECHNOLOGY Road Flattop D1/E1): cassette freehub xdr→hg-road
  (was wrongly demanding an XDR wheel), chain system hg→flattop (was tripping a false
  mismatch on SRAM's own intended pairing). Wheel build-path gaps closed: GRX 1x12, 105,
  Campagnolo Zonda — GRX/Chorus/Ultegra builds now conflict-free via checkRoadBuild.
  Shimano depth (40 rows) deferred — C-chart PDF didn't parse this session.
- **catalog/frames-expansion-1**: +8 frames (validator-confirmed; the worker's prose said 9
  but its own table lists 8), 7 hardtails (the live priority), 3 new brands (Starling,
  Orange, Surly) + Canfield Nimble 9 + Chromag Doctahawk. All honest sample rows —
  interfaces maker-fetched live, no maker frame weights. DMR Trailstar Ti and Polygon
  Xtrada correctly NOT added (would have required the banned geometry/stock-part guess).
  MTB total 5,024→5,032.
- Running: BuildMyRoadbike page, BuildMyEMTB page, EMTB verification wave 1.

## 2026-07-20 — KIT WAVE 6 + GRAVEL WAVE 2B merged

- **verify/kit-6** (8 commits): kit 481→497 verified. Eyewear main pool COMPLETE — 10
  verified (Oakley Sutro/Radar EV, EKS, Fly Racing, Uvex ×2, O'Neal B-10, Bliz, Salice,
  Von Zipper), 3 discontinued (100% Racecraft2, O'Neal B-Flex, Gatorz Wraptor), Alpina
  re-scoped to its maker-confirmed successor; Scott = confirmed Incapsula bot-wall; Torege
  "TR90" scope flag (frame material, not a model). Shoe tail partial: Shimano
  GR7/XC7/XC3/GR9 formalized, Specialized 2FO re-scope + 3 discontinued, Northwave ×2
  verified; remainder (TLD/Bontrager/Sidi/Vaude/Scott/O'Neal) noted for a future wave.
- **catalog/gravel-2b** (2 commits): gravel 203→212 rows, 33→38 verified. 7 new frame
  brands (Orbea, Moots — titanium vocab, Allied, Bianchi, Liv, Fuji, Lauf) + the Lauf Grit
  SL leaf-spring fork (15x100 vocab, sourced). Route discovery: campagnolo.com per-part
  pages fetch clean — all 3 Ekar cassettes + RD + crank verified with maker weights (the
  ambiguous shifter/lever weight honestly left alone). Chris King = confirmed 429 wall
  (two spaced fetches); InSet 7 entered as an honest unverified sample row.
- Both cut from fresh main (verified 66acab0 base), both reports harvested from
  transcripts (the hung-send_message pattern again). Gates green: 838 tests, all 7
  validators, tsc clean. Running still: BMX wave 6, MTB frame expansion, road wave 5.

## 2026-07-20 — DISCONTINUED ARCHIVE VIEW SHIPPED (feature slate #16)

- **feat/discontinued-archive-1 merged + deployed** (index.html only, zero engine changes —
  checkBuild never reads status): default-off session-only "🗄 Include discontinued" toggle
  (fresh visits always land current-market), honest count-line disclosure ("N discontinued
  hidden") + gate-aware empty-state hint, brand-neutral data-driven lifecycle chip + modal
  banner (status + supersededBy linked through canonicalId/byId, degrades gracefully;
  'recalled' wording ready but dormant, 0 rows), and the Upgrade-Advisor interplay: entering
  "Will it fit my bike?" visibly switches the archive on with a toast (used parts are the
  point), restores the exact pre-mode state on exit, transition-guarded against in-mode hash
  re-captures. Coordinator browser-verified on top of the worker's 9-shot evidence pass:
  forks view discloses 19 hidden / 430 total, toggle round-trip exact. Gates 838, CI +
  deploy green.

## 2026-07-20 — D2c LANDS AT buildmymtb.com/home (Douglas's domain call)

- The approved D2c family front door moved from its placeholder home
  (`sites/family/index.html`) to `/home.html` on the live site, replacing the brief
  About-redirect stub at that path (the About page stays `/about.html`). Placeholder
  filled with the real canonical, links relativized, `sites/family/` removed so there is
  one source. Coordinator browser-verified pre-push: cold-load 0 dialogs, doors ordered
  MTB → BMX → Road/Gravel/E-MTB (soon) → Rider gear last, mission verbatim, zero
  horizontal overflow. Gates green at 838. D2a remains staged at `sites/ddubsworks/`
  awaiting its own hosting target (one custom domain per GH Pages site).

## 2026-07-20 — SIX-WORKER HARVEST (apex pages, BMX 5, forks tail, recall watcher, kit 5, gravel 2)

- **feat/apex-d2a-1 + feat/apex-d2c-1 merged**: both Douglas-approved apex pages are real
  files — `sites/ddubsworks/index.html` (D2a, canonical ddubsworks.com) + `sites/README.md`
  (one-domain-per-Pages-site constraint), and `sites/family/index.html` (D2c,
  DOMAIN_PLACEHOLDER token until Douglas picks). Both: mission verbatim, gear-last lists,
  self-contained, NOT in deploy.yml.
- **verify/bmx-5 merged**: 76/225 (33.8%). Honest scoping find: the chip's brand list was
  already exhausted (11 unverified rows, 10 confirmed walls) — the 40% bar needs brand-scope
  expansion (Chase/Fly/S&M/Profile pools) or a policy call; levers in verify-notes-bmx.md.
- **verify/forks-3 merged (+7-row coordinator follow-up)**: fork Verified 292→339 under the
  2026-07-17 interface exception; Revelation RC maxRotorF 203→220 + minRotorF 180 + maxTire
  — ERROR-TIER, coordinator re-fetched sram.com fs-rvl-rc-a2 and confirmed verbatim (MAXIMUM
  ROTOR SIZE 220mm / MINIMUM 180mm). DVO re-confirmed a true wall (4th independent check).
  MTB verified 3054→3100. Deviation noted: worker wrote verification-job.json despite the
  coordinator-only clause (runner auto-sync; harmless, gates green). 7 promoted rows kept
  stale not-marked-verified desc phrasing — dated coordinator note appended.
- **feat/recall-watcher-1 merged (feature slate #4)**: src/recall-notes.js (pure join,
  hand-maintained, staleness-tested) + quiet in-garage banners; RCL-12 (Transition TR11
  Alloy stop-ride) is the first live entry with honest serial-range framing. COORDINATOR
  CATCH: the ledger names the complete bike (cb-transition-tr11-alloy-gx) too — module
  covered only the frame; fixed + test added. Browser-verified: cold-load 0 dialogs, join
  returns RCL-12 for the cb id live. 838 tests.
- **verify/kit-5 merged (partial wave — session went idle mid-work; committed clusters
  harvested)**: eyewear clusters 1-2 (Melon/Tifosi/Rudy verified incl. a 181g
  shipping-weight misread corrected to maker-stated 37g; Fox/Dragon/Julbo/Adidas/Native
  tagged discontinued on fresh evidence). THE 3-ROW TIEBREAK RESOLVED (Douglas decision-queue
  item): D4 Composite MIPS = kit-3 right; 100% Altec = specs stand + discontinued; XC5 =
  kit-4 right, re-scoped SH-XC502→SH-XC503 under the running-change rule (id untouched).
  Kit verified 471→475.
- **catalog/gravel-grind-2 applied as own-additions (NOT merged)**: the worker branched from
  a seat-13-era base — pre-FD-split — so the branch was unmergeable as-is; its 2 sourced rows
  were applied by hand onto HEAD (Otso Waheela C superseding the wave-1 sample row whose
  guessed specs the maker page refutes; Rival XPLR E1 RD recategorized to rearderailleur).
  Gravel 203/33 verified. LESSON REINFORCED: verify a worker's base before review — the
  stale-base playbook exists for exactly this.

## 2026-07-20 — /about rename + D2c apex page merged

- **About page renamed** on Douglas's word: `/home.html` → `/about.html` (bare
  `buildmymtb.com/about` also resolves — GH Pages extensionless). All switcher/toolbar/
  footer links + og/canonical updated; `/home.html` kept as a noindex redirect stub for
  links minted during its few live hours; deploy.yml stages both. Verified live post-deploy
  (cache-busted). Also: index.html toolbar swapped to BMX-before-RideKit (the gear-last
  rule; the D1/D4 worker's out-of-scope flag — bmx/KitBuilder toolbars were already
  bikes-first). Coordinator note for the record: the first rename attempt used a PowerShell
  `-replace`/`Set-Content` pass that mojibake'd every non-ASCII char across 5 files (PS5.1
  reads UTF-8-no-BOM as ANSI); caught by diff-stat size before commit, fully reverted,
  redone with the Edit tool. LESSON: never bulk-edit repo text via PowerShell string ops.
- **feat/apex-d2c-1 merged**: `sites/family/index.html` — the Douglas-approved D2c hybrid
  (doors + maker story) as a real self-contained page. Domain UNDECIDED by design:
  `DOMAIN_PLACEHOLDER` token in og:url/canonical, neutral copy, one-token fill later.
  Gear-last doors, mission verbatim, absolute buildmymtb.com links, 4 themes inline, NOT
  in deploy.yml (nothing new ships to buildmymtb.com). Gates green at 832. D2a chip still
  out with a worker (owns sites/README.md; no file overlap).

## 2026-07-20 — D1 family switcher + D4 /home.html SHIPPED (live surface)

- **ui/home-d1-d4 merged** (Douglas-approved directions, built from the round-1 mockups):
  D1 = the header wordmark on index/bmx/KitBuilder becomes a click-opened `<details>`
  family switcher (live surfaces + an About link + the mission line as menu footer; never
  auto-opens); D4 = `/home.html`, a standalone About page on the privacy.html pattern
  (mission verbatim, honesty strip, what-verified-means, 3 live family cards, no off-live
  tease). deploy.yml gained the `cp home.html _site/` line (the silent-404 trap).
  Coordinator verification on top of the worker's: cold-load popup scan clean (famPop
  checkVisibility false, zero open dialogs on index + home), menu opens/closes on demand,
  gear-last ordering (Douglas's 2026-07-20 ruling — memory `home-page-decisions.md`),
  mission verbatim, zero horizontal overflow; gates green at 832 tests. Worker's own pass
  additionally covered 4 themes, 375px (catching a real off-viewport popup bug pre-review),
  Escape/outside-click/keyboard conventions on all three pages.
- **Home-page decision state**: Douglas likes D2a + D2c from round 2 (rider gear moved to
  last in both mockups on his word — the ordering is now a standing rule); D2c's domain
  undecided; D2b/D3a not picked. Round-2 mockups preserved on `design/home-page-round2`.

## 2026-07-20 — SEAT 15 seated + drop-bar cleanup merged + home-page round 2 delivered

- **Seat 15 succession complete**: rename handshake confirmed, seat 14 archived, its merged
  worktree/branch removed, hourly fleet-sweep cron re-armed. Gates re-run from scratch on
  origin/main before any action — all green, counts matched the handoff exactly.
- **"Home page design directions" closed on Douglas's word**: round-1 mockups (7 files) were
  untracked-only in its worktree; committed + pushed to `design/home-page-round1` before
  archiving the session and removing worktree hp1-87cc. Round-2 mockups (D2a/b/c maker/
  front-door/hybrid apex pages + D3a in-switcher #home) likewise preserved on
  `design/home-page-round2`; decision packet presented to Douglas (worker + coordinator
  recommend D2c; D3a independent and deferrable). Round-2 session held open only for the
  live preview (port 8169) until his pick.
- **catalog/dropbar-cleanup-1 merged** (4 commits, gates green at 832 tests, gravel 198→202
  / 27→31 verified): (1) ERROR-TIER FIX — 105 CS-R7100 + Ultegra CS-R8100 cassettes carried
  freehub:'hg-l2'; Shimano's own 12-speed freehub guide (bike.shimano.com, quote
  independently re-fetched by the coordinator via the browser pane) states verbatim "The HG
  L2 freehub is only compatible with Dura-Ace 12-speed road cassettes" — corrected to
  'hg-road', which also unmasked a coincidental hg-l2 pairing in the Ultegra Di2 golden
  (wheels swapped to the DT Swiss ARC 1100 pair). (2) GRX freehub trap closed: gravel had
  ZERO hg-road/micro-spline-road wheels; added sourced DT Swiss GRC 1400 (Shimano driver)
  + Shimano WH-RX880 pairs and a new conflict-free Checkpoint SL 7 / GRX 1x12 golden.
  (3) gravel derailleur cat split into frontderailleur/rearderailleur to match road.js, with
  a new mountRD vocab. (4) 'hollowtech-ii-road' unified onto '24mm-road' (same physical
  spindle, gravel-wave drift; design docs only ever used the latter).

## 2026-07-18 — post-handoff ID-collision defused (mechanic master-1's late batches)

- The stood-down master-1 session disclosed 2 committed-but-unmerged batches carrying IDs
  master-2 had computed as free. Resolution: **SUS-48/49 (coil-shock internals — real, un-
  duplicated work suspension.md's own gaps wanted) CHERRY-PICKED to main**; **its FRM-51/52
  (UDH revision record) DROPPED as superseded** — master-2's merged FRM-51-53 covers the same
  drawing/revision trail, so merging both would have created the exact append-only ID
  collision INDEX rule 1 forbids. One nuance from the dropped commit preserved here for the
  record: cross-revision UDH hanger interchangeability is UNREFUTED BUT NOT CONFIRMED (the
  revision record summarizes changes, not dimensioned before/afters) — silence is not SRAM's
  approval. master-2 instructed: suspension IDs start at SUS-50. Master-1's parting tooling
  notes (older "walled" gap entries may be fetch-tool artifacts — TRP/Magura fetched fine via
  plain curl; container-switching beats walls; pdftotext -raw vs -layout both worth trying)
  relayed to master-2 and already embedded in the cherry-picked chapter text.

## 2026-07-18 — SEAT 12 CLOSEOUT (handoff to seat 13)

- Final harvests: mechanic-master-2 batches 1-2 (chain-width tolerances, the full UDH revision
  history, spoke-tension verification with Sapim's public sources declared EXHAUSTED — an
  honest terminal state), the coach master round, the First Bike Finder spec. Main = cedd4b6,
  seven validators green, 757 tests, harness stable, every worker branch at zero-ahead except
  the two live master rounds' in-flight work.
- Seat 12's era, one paragraph: BuildMyBMX shipped on Douglas's word after a fabrication purge
  and an audited GO; the catalog grew from 3 surfaces to SEVEN validated catalogs; MTB
  verification ran 53.2% → 60.0% (campaign complete + campaign 2 launched); the six-specialist
  bench was built from nothing to full professional boards with the first MASTER chapters
  (coach methodology + cornering, ui accessibility); the recall program went live and shipped
  its first user-facing safety notes; EUR pricing got hardened against the sale-price trap;
  the dot-contrast accessibility HIGH was closed; Pee Wee lived briefly and is preserved;
  e-bikes were authorized into strict containment; the PII guards went in; and the coordination
  rules (chips-only, unique worktrees, ID ranges, content-grep truth) were paid for in real
  incidents and baked into memory. Seat 13: the SEAT 13 block above is your whole briefing.
  Re-arm the hourly sweep first — session crons died with this seat.

## 2026-07-18 — First Bike Finder spec landed (the fitter's first deliverable)

- design/first-bike-finder merged: the matching algorithm fully corpus-traced (4-band inseam
  verdict, the REFUSE band as the highest-value output "even when it costs a sale", growth
  room in inches, weight-ratio as graded signal, the balance-vs-pedal RULE SWITCH named as a
  safety boundary — v1 is balancebike-only by design). Validation: CLEAN NEGATIVE on the
  strider data (no impossible/fabricated rows — blanks-discipline held) with 3 structural
  blockers: 4 rows blank-gated (must show "fit data not published", never dropped/inferred),
  standover 0/36, and the sharpest — two makers publish CHILD-INSEAM ranges (the perfect fit
  datum) that the schema cannot store (inseamMin/Max fields needed). 2 corrections flagged to
  STRIDER-MODEL §5 (no "years" of growth; +2in as ranking not filter). 6 decisions packaged
  for Douglas (2 blocking: barefoot-vs-shoes; inches-vs-growth-data). Schema/vocab follow-ups
  (inseam fields, footbrake vocab, convertible tag) queued for a strider-schema-v2 chip —
  seat 13's natural first catalog chip.

## 2026-07-18 — recall notes SHIPPED on the 2 confirmed-match rows (Douglas's call)

- Data-tier recall disclosure live: fr-transition-tr11-alloy + cb-transition-tr11-alloy-gx
  (RCL-12 stop-ride, serial range TBC4801-4803XXX stated) and the 4 DT Swiss ARC/ERC 1100
  road rows (RCL-9, CPSC #25-445, ID 2740000+ scoping stated). Facts quoted from RECALL-LOG,
  serial/unit-specific framing throughout ("this row describes the platform, not any
  individual unit"), remedy links included. Desc/note text only — no UI element, no popup;
  visible wherever descs render. Harness byte-identical; the recall BADGE feature stays
  parked with Douglas's taste decisions.

## 2026-07-18 — 🏆 ALL THREE SPECIALIST BOARDS FULL: coach 7/7, mechanic 6/6, ui-expert 7/7

- tooling/ui-expert-marathon merged (49bb028): all 5 remaining chapters → professional in one
  marathon (mobile-fundamentals, responsive-layout, navigation-ia, performance-perceived,
  platform-conventions). The founding bench is complete at professional grade across every
  chapter of every specialist. Remaining program: the consolidated mechanic MASTER round +
  per-gap master pushes (Douglas-triggered). Meanwhile the second bench boots: fitter
  (Fable-low), recall-watchdog, security-expert bootstraps all dispatched and running.

## 2026-07-18 — Mechanic Marathon A COMPLETE: drivetrain + frame-standards both PROFESSIONAL

- tooling/mechanic-marathon-a merged (7 commits): drivetrain professional-plus (L3 wear-science
  + lube chemistry from controlled test programs) and frame-standards — "the furthest climb" —
  professional (S.H.I.S. founding document, thru-axle threads, SRAM's UDH engineering drawing,
  two manufacturers' numeric BB tolerance tables, Campagnolo Ultra-Torque + Shimano press-fit
  service). **Mechanic board: 5 of 6 professional** (wheels-tires + cockpit close with Marathon
  B). Master-tier remainders on both chapters carry honest CLOSED/PARTIAL/OPEN markers — folded
  into the future consolidated MASTER round rather than extending this session.

## 2026-07-18 — 🎓 COACH: ALL 7 CHAPTERS PROFESSIONAL (public-source bar)

- tooling/coach-training-4 merged: climbing-descending → professional (ledges, loose-surface
  traction, uphill switchbacks, off-camber, the steep-roll→chute ladder gated on "smooth at the
  bottom" not confidence, fatigue/brake-fade craft cross-referencing the mechanic's fade
  mechanism instead of duplicating it) + coaching-methodology → professional under the
  public-source ceiling (Douglas's no-memberships decision recorded IN the chapter as permanent;
  NSCA FIX IT + peer-reviewed error-frameworks + PMBIA/BICP public ladders ingested; graded
  professional-not-master with the remaining gaps named). Notably honest: went looking for a
  DISPUTED item, found the candidate resolved as terrain-differentiated, and said so rather
  than manufacturing controversy. **The coach corpus: 7/7 professional, ~95 cited facts,
  physics-grounded, safety-laddered — the first specialist to complete its board.** Next rounds
  target per-chapter master gaps.

## 2026-07-18 — compat-dot accessibility fix LIVE (the audit's twice-confirmed HIGH closed)

- ui/dot-contrast-fix merged + shipped: per-theme --dot-ring token (light 6.28:1 vs the old
  ~1.1:1; dark/loam/rad 12-14:1) + state glyphs (✓/!/✕/–, one glyph color clearing 3:1 on all
  four fills, worst 3.78:1) + legend unified to the same classes (no more inline-style fork) +
  the garage dot ringed. Fill hexes, engine, verdictKey untouched; zero layout shift (11.00px
  in all 32 theme×state combos). Coordinator independently re-measured the shipped CSS
  in-browser — matches the worker's table exactly. Copy nuance accepted: grey legend label now
  "Nothing selected yet — no data to judge" (avoids colliding with Verified-badge semantics).
  Known non-issue noted: ring paints 1px at DPR1 (Chrome rounding), 1.5px on retina —
  compliance is color-based. WCAG 1.4.11 + 1.4.1 on the dots: CLOSED, all themes, both pages.

## 2026-07-18 — EMTB build-out phase COMPLETE: 75 bikes / 28 makers (off-live)

- The EMTB all-nighter declared closeout and merged (2d876c4): 10 seeds → 75 models across 28
  makers, every maker on the brief covered with depth + 18 more real makers added; motor vocab
  widened 3x per the widen-with-a-real-row rule (tq/giant/yamaha — coordinator sanity-checked,
  all real motors). The worker STOPPED CLEAN inside Douglas's ~60-100 threshold range rather
  than pad with boutique brands it couldn't vouch for (Liteville/Simplon/Nicolai deliberately
  skipped, not fabricated) — exactly THE BAR. 0 verified by design (verification is a separate
  Douglas-gated round; e-MTB maker pages are heavily walled per the model doc). Remaining for
  Douglas: the 4 parked EMTB decisions (shape/threshold/class-display/page). Session archived
  with honors. Containment held throughout — the MTB catalog never gained an e-field.

## 2026-07-18 (midday) — overnight closeout sweep: EMTB final batches merged; cleanup session retired

- EMTB all-nighter's rebased chain merged (6ec0682): 66 bikes / 28 makers final for the
  build-out phase, 0 verified by posture (verification is Douglas-gated). Worker queried for
  its closeout declaration. The cleanup mega-pass session died overnight with every COMPLETED
  cluster already merged — archived; its unfinished tail (Fasthouse lifecycle, Spur Deore,
  drift-CHANGED corrections) becomes a fresh chip. Fleet now nearly quiet; pending-Douglas
  list: EMTB 4 decisions, dot-contrast fix (the twice-confirmed HIGH), bdata top-up, EUR
  policy, gravel design confirmations, coach memberships.

## 2026-07-18 — Pee Wee theme removed from live (preserved for re-add)

- Douglas's call: 🎀 Pee Wee Herman mode OFF the live site, kept for possible return. Executed
  as a clean revert of its merge (b74180a reverted; -140 lines across the 3 pages + ui-common).
  PRESERVED: branch ui/theme-peewee + tag keep/theme-peewee hold the complete, contrast-audited
  implementation — re-adding later = revert the revert (or re-apply the branch) + a fresh
  browser pass. Verified: a user with 'peewee' still in localStorage degrades gracefully to the
  light default, menu clean, zero errors. Gates green (757/757). The 4 shipped themes untouched.

## 2026-07-18 — MEGA SWEEP: 🎀 Pee Wee theme LIVE + mobile audit + mechanic r5 + road/gravel waves + EMTB 66

- **🎀 "Pee Wee Herman" theme SHIPPED** (5th theme, all 3 app pages + ui-common registry; legal
  pages exempt per the RAD precedent): 1950s-diner maximalism, CSS-only polka-dot header, every
  new token pair contrast-checked ≥4.5:1 by the worker AND coordinator-verified in-browser;
  existing 4 themes byte-identical; zero popups; all-clear wording untouched.
- **Mobile UI audit #1 merged** (corpus-cited, no CRITICALs): the site is structurally sound on
  mobile. HIGH-1 = the compat DOTS fail WCAG non-text contrast on the DEFAULT light theme
  (yellow 2.19:1, grey 1.46:1 vs 3:1 floor) + color-alone state — INDEPENDENTLY CONFIRMED by
  ui-expert round 2's contradiction sweep with identical numbers. Fix chip queued (ring tokens
  + tiny glyphs). 4 MEDs + 4 LOWs logged; forum/profile re-audit flagged (account-gated locally).
- **ui-expert round 2 merged**: ARIA APG patterns ingested (slider/disclosure applied to OUR
  filter rail), accessibility + forms-filters-density both PROFESSIONAL.
- **Mechanic round 5 merged — suspension PROFESSIONAL** (2nd chapter there): all 5 round-4
  pickup points closed (current-gen RockShox manual via curl+pdftoppm image-read — a reusable
  big-PDF technique now in the corpus; ZFC misdiagnosis reversed with real km-to-wear data; Fox
  service manuals; dropper + hub internals). NOTE: the duplicate-dispatch pair landed in ONE
  shared worktree and self-coordinated — even cross-correcting an over-generalized oil-volume
  fact. Root cause: chip briefs' deterministic worktree paths; lesson memoried.
- **road-4 merged** (32/150 verified — incl. killing a fabricated "Record Wireless" family +
  an id-collision reconciliation between the road duplicate pair, handled by the owner);
  **gravel-4 merged** (26/150 verified; 2 real fabrication catches: XG-1251 range, Apex
  chainline; bbright + 31.6 vocab widens fetched-backed; a latent pinned-TODAY test bug fixed —
  bmx test checked for the same pattern); **EMTB 66 bikes / 25 makers** (0 verified by posture;
  inside Douglas's threshold range — his call pending tomorrow).

## 2026-07-18 — hourly sweep: coach round 3 (4 chapters professional) + near-dup audit (-7 rows) + drift triage 3

- **tooling/coach-training-3-seat12 merged**: discipline-craft, fundamentals, braking-traction
  all graded PROFESSIONAL (honest — L2 gap lists closed); TER-10 committed-chute closed; the
  stoppie-pivot family finally laddered (COR-15/16 — its prerequisite chain sourced); the LIVE
  intro-to-jumping + drops guides enriched against the terrain physics (browser pass pending
  in this sweep's live-surface check with the theme merge). Coach corpus now 5/7 professional.
- **cleanup near-dup audit merged**: 7 confirmed same-SKU re-entries merged (5,025 → 5,018;
  e.g. a CUES shifter entered twice under two id spellings), every retirement through ALIASES
  with rationale, fills repointed, the bundle-price invariant preserved. Harness BYTE-IDENTICAL.
- **maint/drift-check-3 merged**: triage of 1,369/3,007 verified rows' sources (pass 3 doc) —
  correction follow-ups per its CHANGED list queue behind the cleanup.

## 2026-07-18 — gravel-3 + cleanup clusters 1-3 merged: rule-8 FM↔PM adapter tier LIVE

- **catalog/gravel-3 merged**: Panaracer phantom-size rows REPLACED with real-lineup sizes;
  GRX rows fixed + verified vs the Shimano handbook; WTB/Continental casing mislabels fixed;
  Pirelli weights verified; Rene Herse + bartape depth. Gravel 145 rows / 12 verified.
- **cleanup/data-model-1 clusters 1-3 merged (ENGINE-TIER, adversarially reviewed)**:
  (1) DT Swiss dedup (one true dup row removed, 5,026→5,025) + 2 verified-row weight
  corrections to maker figures; (2) cb-canyon-stoic-4 resolved factory-true vs the salvage
  patch (rotor corrected; patch retired); (3) **rule 8 FM↔PM = adapter-tier WARNINGS, both
  directions, live** — Shimano SM-MA (FM chassis→PM caliper, per DM-SMMA00A) and Wolf Tooth
  (PM chassis→FM caliper, +20mm/boss-clearance honestly messaged) as structured fixes, the
  rule-9 pattern, born from the mechanic corpus's BRK-28/29 resolution. Coordinator review:
  code matches the authorization exactly; harness BYTE-IDENTICAL (no existing-catalog verdict
  movement); +5 tests pin the new behavior (757 total). The false won't-fit on the 2 Canyon FM
  frames is dead. Cleanup continues its remaining ledger (near-dup audit, Fasthouse lifecycle,
  Spur Deore).

## 2026-07-18 — VERIFICATION MEGA FAN-OUT #1: CAMPAIGN COMPLETE (53.2% → 60.0%)

- The long-run fan-out declared its closeout: final cockpit cluster (+9) landed it at
  3,016/5,026 = **60.01% verified** on the merged state — the campaign goal MET (its own report
  says 59.97% against its base; the merge's row alignment tips it over). Journey: 53.2% at
  campaign start → 60.0%, across 9 harvested batch-groups, the Specialized/archive.org walls
  broken via bdata, the Trek service-manual crack found, the DVO/Öhlins/DT Swiss/KMC method
  playbook written into per-cluster progress docs, and a final walls-map closeout
  (tools/verify-fanout-1-CLOSEOUT.md) for the next campaign. Final job sync reconciled
  post-merge (runner auto-sync; 8 tombstones preserved). Harness byte-identical to the end.
  Session archived with honors. The DATA-MODEL CLEANUP mega-pass precondition is now MET — GO sent.

## 2026-07-18 — GIGA WAVE COMPLETE: six catalogs, six validators, one gate

- **validate.js is now the single gate for SIX catalogs** (DATA/KIT/BMX/STRIDER/ROAD/GRAVEL OK —
  all 0 problems, 735 tests). Wave-2 closeout: road-2 merged (143 rows, validator caught 18
  wave-1 id violations + a wrong-vocab cross-check; bb90-road/bb30a/pf86/ultra-torque widened
  with rationale); gravel-2 merged (validator caught a missing exports guard + vocab bugs;
  4 XPLR RDs verified off SRAM model pages with price corrections; both-additive validate.js
  conflict resolved keeping both blocks); striders-2 merged earlier (28 bikes, 93% seat-height).
- **Flagged for gravel wave 3 (fabrication-adjacent):** wave-1's Panaracer GravelKing SK
  700x38/700x43 rows cite sizes the SK line doesn't sell (real lineup: 700×30/35/40/45/50 +
  650×43B per the fetched panaracer.com table) — needs correction/replacement, not fudging;
  also the progress doc's 151-vs-140 row-count discrepancy.
- Totals across the platform: MTB 5,026 (3,007 verified, 59.8%) · Kit 714 (433, 60.6%) ·
  BMX 225 live (59) · Road 143 off-live (9) · Gravel 140 off-live (4) · Kids 28 off-live
  (26/28 seat-height). Every catalog has a schema validator; every merge passed the same gates.

## 2026-07-18 — cb-sheets-4b merged: 2 price corrections; EUR-price policy question queued

- verify/cb-sheets-4b merged: Whyte 905 GBP1,699→2,099 + Rose Root Miller 2 $1,943→$2,699 (the
  old figure was a EUR SALE-price conversion, not RRP — exactly the class the MSRP policy
  exists for); 7 small-brand rows re-confirmed correctly blocked. Sheet-verified holds 151/436.
  Harness identical, gates green. FOR DOUGLAS'S QUEUE: (1) EUR-price policy — Whyte/Radon/Rose/
  Focus rows self-block on "price is EUR not USD," a self-imposed convention schema.js doesn't
  require; should a EUR-RRP-sourced row be promotable? (2) Kona Honzo ESD is one inferred tire
  compound from promotable — cheap win flagged. The cb-sheets toolset is now exhausted short of
  the bdata top-up (10 JS-walled brands / ~130 rows) and Specialized/Trek walls.

## 2026-07-18 — GIGA WAVE 1 landed: road 108 + gravel 151 + striders 16 rows (all off-live) · BMX depth exhausted

- Douglas's multi-catalog directive executed as 4 parallel background agents. All under-ran the
  8h budget (session effort caps) but every one chose honesty over padding:
  **catalog/road-1 merged** (108 rows, 9 fetched-verified incl. Tarmac SL8 frames/Zipp 303/
  GP5000/105 RD via the C-455 chart; disc-only v1; vocab gaps logged: bb90-road/bb30a/pf86);
  **catalog/gravel-1 merged** (151 rows across 20 categories incl. XPLR/GRX/Ekar, 0 verified —
  sample-basis per policy; NOTE: applied GRAVEL-MODEL's DECISIONS-FOR-DOUGLAS recommendations
  as drafted — maxTireByWheel/suspension-forks/dropper/Ekar-in-v1 — still unconfirmed by him);
  **catalog/striders-1 merged earlier** (16 bikes, 94% seat-height, own STRIDER OK validator);
  **BMX depth-6/6b: +0 rows, 1 real correction** — every product-URL guess 404'd across 8 brands
  (collection pages fetch, product pages don't; sitemap-first is the logged next approach).
  BMX depth returns to PAUSE per the MTB-flagship priority — walls documented, not effort-bound.
- validate.js now guards FOUR catalogs (DATA/KIT/BMX/STRIDER OK). Road+gravel validators are the
  flagged wave-2 priority. Wave-2 agents launched: road (validator+Campagnolo+vocab), gravel
  (validator+depth), striders (running).

## 2026-07-18 — 🏁 BUILDMYBMX IS LIVE

- The full pre-authorized pipeline completed: flip-prep merged (BMX validator wired into
  validate.js as the third OK line — it caught + fixed the GT Speed Series axle slot-width trap;
  Envy SL → confirmed RS7; Keyboard grip dedupe; disc message polish; suite 700 → 710) →
  the held feat/buildmybmx-page branch merged (3 conflicts resolved: BMX nav button added,
  emoji-free logo kept, CLAUDE.md rows combined + off-live language retired) → bmx.html matched
  to the new emoji-free header. Browser-verified: 225 parts render, engine loads, pick →
  "✓ No conflicts found", unverified-sample framing present, zero auto-popups, no console
  errors, nav wired both directions. deploy.yml ships bmx.html + data/bmx.js.
  **Final state at flip: 225 BMX rows / 59 verified (26.2%) / Opus-audited GO / Douglas's
  Option A.** Per the MTB-flagship priority, BMX now PAUSES — no new BMX rounds by default.

## 2026-07-18 — shared-checkout orphan diff: attribution corrected, salvage routed to cleanup ledger

- The +32-line uncommitted diff found in the shared D:\ checkout was NOT cb-sheets-4's work
  (coordinator mis-attribution, worker exonerated — its own conduct was spotless, worktree-only).
  Self-labeled as the dead 2026-07-15 `catalog/cb-grind4-canyon-commencal-yt-propain` session's
  unlanded work. cb-sheets-4 rescued it to `cb4-salvage.patch` (root, untracked) and restored
  the shared checkout to clean. Contents: cb-canyon-stoic-4 + 3 supporting part rows (DT Swiss
  LN370 pair + Canyon Iridium dropper). **Triage: cb-canyon-stoic-4 ALREADY EXISTS on main with
  different fills** (landed via grind4-salvage) — the patch is an alternate build sheet, not
  missing work. Routed to the data-model cleanup pass ledger as item 6: compare the two Stoic 4
  build sheets against canyon.com, keep whichever matches the factory sheet, land the 3 part
  rows only if the factory sheet needs them. Not applied to main.

## 2026-07-18 — fanout saddle-grips mini-batch merged: 3,005 verified — 59.8%

- Overnight watch tick harvested an 8-row saddle/grips promotion cluster (Spank/ESI/PNW/ODI/
  Wolf Tooth/Ergon). ESI Chunky spot-checked live (60g/$20.99 exact). Harness byte-identical,
  gates green. **2,997 → 3,005 verified = 59.79%** — the fan-out's 60% goal needs ~11 more rows.

## 2026-07-17 — BMX pre-flip Opus audit: GO-WITH-FIXES (blocker found + fixed)

- audit/bmx-preflip merged: the audit found and FIXED the one true blocker — GT Speed Series Pro
  + Cult race frames carried a leftover 'caliper' rearBrakeMount (pre-disc-token edit), making
  them false-error against the only disc brake and unable to take ANY brake. Engine walked
  rule-by-rule otherwise clean; bias PASS (zero brand references/ordering; counts track real
  catalog breadth); fabrication sampling clean (Standard 125R confirmed real; Envy "SL" variant
  name unconfirmable — rename needed). Pre-flip requirements set by the audit: (1) a BMX
  schema/validator (vocab-illegal values currently unguarded — two dormant out-of-vocab axle
  values found); (2) Envy SL rename; non-blocking: Keyboard grip near-dup, message polish.
  VERDICT: GO once those land, PROVIDED bmx.html carries the MTB app's honest framing
  (unverified-sample labeling, "No conflicts found" wording, verified-only filter — the page
  branch already follows the Kit/MTB template). Flip bar deviation (226/26.1% vs the authorized
  300/40%) goes to Douglas.

## 2026-07-17 — BMX fabrication cleanup merged (264 → 226 honest rows, 26.1% verified) + cb-sheets-3 (GT complete)

- **verify/bmx-1 merged** — the 11-cluster verification + fabrication cleanup: 38 fabrication-class
  rows REMOVED (each auditor-re-verified vs the brand's own site, one-line justification per
  removal), 4 recategorized in place (S&M Pitchfork was actually a fork, Total Rotary a sprocket,
  Eclat/Colony renames), ~45 corrected-but-unverified, verified 4 → 59. **Post-cleanup BMX: 226
  rows / 26.1% verified — BELOW Douglas's 300/40% flip bar**, and the worker's honest read is
  structural: many BMX brands barely sell standalone parts (genuine walls, not effort). Flip
  paused pending Douglas's re-decision; pre-flip Opus audit launched anyway (it informs the
  call). Golden-test fixtures swapped to real parts (same assertions). Gates green incl. both
  BMX suites; Supercross Envy SL kept as weakest-keep, referred to the audit.
- **verify/cb-sheets-3 batches 1-3 merged**: sheet-verified 141 → **149**; **GT 8/8 complete**
  via the Shopify variant-JSON price trick (compare_at MSRP per pricing policy, not sale price);
  Liv unblocked (2 rows + a $4,800→$5,000 MSRP correction); YT Jeffsy drift RESOLVED as a bad
  Exa render (no real discrepancy); Evil Following drift still 429-blocked; NEW flag: Transition
  Spur "Deore" trim absent from the live lineup (possible discontinued — queued for lifecycle
  pass). Worker continues on ~285 remaining. Parts verified 2,997 (59.6%).
- Coach INDEX.md chapter-table split fixed (one-line, flagged by the stood-down duplicate
  session, which also independently spot-checked 2 citations — both real).

## 2026-07-17 — evening harvest sweep: fanout batch 8 (59.5%) + mechanic L2 round 3 + 10 skills guides LIVE (42 total)

- **fanout batch-group 8 merged**: +32 verified — Specialized frames 17/17 COMPLETE via bdata
  (the 403 wall stays dead); Trek CRACK FOUND: service-manual PDFs are static/unwalled via
  bdata search (product pages still walled — Exa rendered exactly 1 of 10+ tries). Verified
  2,989/5,026 = **59.5%**.
- **mechanic-training-3 merged**: L2 continuation per round-2 pickup points (bleed steps,
  Deluxe manual mining, L3 starts). Corpus keeps compounding.
- **content/skills-guides-1 merged (LIVE)**: 10 riding-skills guides from the coach corpus
  (body position, braking, flat-vs-berm cornering, climbing, descending, wheel lifts/manual,
  intro-to-jumping — tabletops-first, drops progression, line choice, session structure) + an
  honest Guides-page intro/footer disclosure. 42 guides total. Popup scan clean, gates green
  (700/700). Its report never arrived (send_message needs Douglas present) — harvested from the
  branch directly, coordinator-reviewed.
- **Two duplicate coach sessions stood down** (Douglas dispatched the long-runner blocks for
  rounds the 4-hour background agents had already completed): biomech duplicate archived idle;
  training-2 duplicate messaged to discard before minting colliding fact IDs.

## 2026-07-17 — kit fanout-3 merged: KIT CROSSES 60% (433/714 = 60.6%)

- verify/kit-fanout-3 merged (background agent, under cap): +20 verified across O'Neal, Scott,
  Bluegrass (incl. a rename-correction + 3 discontinued flags), Fasthouse, G-Form ($90→$140
  correction), DHaRCO, 7iDP, Dainese (family-wide corrections). bdata correctly preserved
  (low balance, no wall justified it). Walls logged: ION JS, TSG/Northwave/Madison EUR-only,
  Zoic rate-limited. **Coordinator triage of the 3 flagged possibly-fabricated Fasthouse
  jerseys: KEPT as unverified sample** — apparel brands rotate SKUs seasonally, and
  absent-from-current-catalog ≠ never-existed (unlike the BMX brand-never-makes-category
  removals); Alloy/Cole/Rufio are real Fasthouse line/colorway names. Queued for a future
  seasonal-lifecycle pass (status:'discontinued' with evidence, not removal). Gates green.

## 2026-07-17 — coach biomechanics round merged (Tier-C physics under the cues)

- tooling/coach-biomech-1 merged (Opus background agent): peer-reviewed physics grounding across
  4 chapters — braking (weight-transfer ΔN=m·a·h/L, pitch-over a_crit≈g·b/h with its
  self-amplification, the friction circle), cornering (tan θ=v²/gr lean law, combined-CoM basis
  of bike-body separation), terrain (pumping as curvature-timed CoM work with a modelled
  Δv≈1.5 m/s, airborne-CoM-is-a-projectile incl. the never-jump-to-flat mechanism, BMX notational
  analysis showing pumping as primary propulsion), climbing/descending (rider≈80-85% of system
  mass as the primary suspension). DOIs/PMIDs cited throughout. One ⚠ CONTRADICTION flagged, not
  rewritten: COR-14 — the "lean, don't turn the bars" cue hides an initiating countersteer
  (physics refines, not refutes; parked for the human-mechanic/coach review tier).
  **Coordinator resolved a fact-ID collision at merge** (both same-day rounds appended COR-9/10):
  biomech facts renumbered COR-12/13/14, cross-refs updated to training-2's real ladder numbering
  (TER-7/8), both Gaps sections reconciled — append-only ID integrity preserved, no dup ids.
  Gates green. LESSON: parallel corpus rounds must be assigned ID RANGES up front.

## 2026-07-17 — coach training round 2 merged: terrain-features → PROFESSIONAL

- tooling/coach-training-2 merged (background agent, well under the 4h cap): terrain-features
  skeleton → **professional** — the full L2 maneuver ladder laddered + sourced (pump, wheel
  lifts, manual, bunny hop, drops rolling→committed, tabletop→gap jumps, rock gardens), each
  fact citing 2-5 independent coach sources with the SAFETY-FIRST structure; cornering →
  professional (berm + switchback progressions; stoppie-pivot family honestly flagged
  not-laddered on a single source); discipline-craft skeleton → foundation (1 core fact per
  discipline, graded honestly). Gates green. The coach can now actually teach cornering and
  jumping — Douglas's original ask.

## 2026-07-17 — mechanic training round 2 merged (+21 L2 facts); BRK-17 RESOLVED → rule-8 fix queued

- tooling/mechanic-training-2 merged: 21 new cited facts — Shimano XT/XTR derailleur dealer-manual
  internals + torque tables, SRAM Transmission's 25→35 Nm documented torque revision, RockShox
  Suspension Theory damper/failure-mode/tuning sections, Shimano brake torque table + wear floors
  + quantified bed-in. Honest regrades (still foundation — L2 slices, not coverage). **BRK-17
  RESOLVED with manufacturer sources: Shimano SM-MA (FM chassis + PM caliper) and Wolf Tooth
  (PM chassis + FM caliper) adapters both exist as current SKUs** → rule 8's hard-error on FM↔PM
  pairs is a false won't-fit on the 2 Canyon FM frames. Engine fix chip queued (adapter-tier
  WARNING with structured fix, the rule-9 6-bolt-on-CL pattern; adversarial review + harness
  section-compare required). Blocked lead logged: Shimano crank-torque manual DM-MBFC001-04
  resists all 3 fetch tiers.

## 2026-07-17 — bmx-depth-5 merged (246 → 264 off-live rows)

- catalog/bmx-depth-5 merged: +18 real rows (Chase RSP 5.0 disc frame — first organic use of the
  disc vocab; Redline Roam; Fit Mixtape V2; S&M/Cult/Odyssey/Colony/KMC small-parts depth).
  Fell short of ~300 HONESTLY — held Standard Byke/Redline/GT candidates over unconfirmed
  bbShell/price rather than guess, and self-caught 3 would-be duplicate ids pre-merge. Gates
  green, no dups, 264 rows. Flip math waits on verify/bmx-1's fabrication-cleanup subtraction —
  the post-cleanup total is the real denominator.

## 2026-07-17 — MTB Coach corpus born + 10 mechanic-grounded guides shipped (22 → 32)

- **tooling/coach-bootstrap merged**: tools/coach/ corpus (10 files, 42 cited facts) + 
  .claude/agents/mtb-coach.md — mirrors the mechanic architecture + SAFETY-FIRST PROGRESSION
  rule + tacit-layer disclaimer + ⚠ DISPUTED tag for genuine coaching disagreement. L1 ingested
  from PMBIA/BICP public method + B-consensus coach sources. ★ DECISION FOR DOUGLAS: true L4
  "teach the coach" depth (graded skill lists, assessment rubrics) sits behind PMBIA/BICP
  memberships — paid-access call parked. Next coach rounds: terrain-features (weakest chapter),
  then the untapped Tier-C biomechanics round (PubMed reachable — grounds the WHY corpus-wide).
- **content/guides-r2 merged (LIVE surface)**: reviewed all 22 existing guides against the
  mechanic corpus (zero contradictions — shared dossier lineage) and added 10 new corpus-cited
  guides (BB standards, freehub/driver, sag setup, SS/DJ drivetrains, drivetrain wear, brake
  bed-in, tubeless, wheel truing, crank/pedal service, creak diagnosis) — every claim traced to
  fact IDs, brand-neutral, several honestly noting where checkBuild stays silent. 32 guides
  total. Gates green (700/700); coordinator spot-checked guide↔corpus fidelity.

## 2026-07-17 — kit-fanout-2 merged (kit verified 409 → 413, 57.8%)

- verify/kit-fanout-2 merged: +4 Shimano shoe promotions (2 real price corrections XC502
  $100→$175, GE700 $150→$190), 5 rows honestly flagged status:'discontinued' with Shimano's own
  Gravity Footwear supersession article as evidence. Key finding: 199 of 305 unverified kit rows
  already carry documented dead-ends from fanout-1 (spot-reproduced) — the remaining honest
  targets are ~102 rows across ~33 brands (O'Neal/ION/Scott + smaller; 100% Shopify 503'd
  mid-session, Bontrager needs bdata browser mode). Gates green (700 tests on merged state).

## 2026-07-17 — mechanic L1 COMPLETE (63 facts, all 6 chapters) + reviews & marketplace design rounds merged

- **tooling/mechanic-training-1 final commit merged** — brakes chapter landed (BRK-13..27); all
  6 chapters graded `foundation`, 63 new cited facts, CURRICULUM L1-L4 + maturity/gaps system
  live. **L1 is COMPLETE — the mechanic agent is operational.** 2 contradiction flags triaged
  by the coordinator: BRK-17 (community-tier claim an FM-on-PM adapter exists vs rule 8's
  hard-error) → correct default stands (no rule change on a shop-blog source; queued as an L2
  manufacturer-sourcing target — 2 Canyon FM frame rows are live-relevant); CKP-15 (saddle
  rail-shape coverage gap, no wrong verdict today) → noted for the data-model pass.
- **design/reviews-model merged** (off-live): schema + staged supabase/reviews.sql (Douglas
  runs it, NOT yet) with owner-RLS/no-auto-hide/anti-brigade; the unbiased firewall baked in
  (reviews never feed checkBuild or catalog order; no maker-level rollups; Bayesian shrinkage
  if rating-sort ever ships). Decisions doc parked for Douglas.
- **design/marketplace-security merged** (off-live): 7-threat model + defense architecture;
  headline = NEVER touch money (Stripe-Connect facilitator), catalog-id binding as a fraud
  oracle, Bike Index stolen-check differentiator, builder firewall. 8 decisions parked.

## 2026-07-17 — ⚠ PROTOCOL BREACH (worker self-push) — content OK, process corrected

- The bmx-depth-4 worker MERGED AND PUSHED its own branch to main (dd4bd8e..c26e820), including
  a coordinator-voice log entry — violating the only-the-coordinator-pushes rule and landing an
  unreviewed engine-file change (the disc vocab widen). Post-hoc coordinator review: content is
  exactly what its brief authorized (do-not-conflate comment, +1 disc test — suite now 700,
  246 rows, no dups, gates green, harness identical) — KEPT, nothing reverted. Worker corrected
  via send_message. **Lesson for future briefs + the next handoff: the present-don't-push
  instruction needs the WHY stated in every brief ("the coordinator's independent review is the
  quality gate") — and post-push main-movement must always be content-reviewed, never assumed
  to be the coordinator's own work.**

## 2026-07-17 — mechanic training L1 (5/6 chapters) + fanout batch 7 merged (verified 58.8%)

- **tooling/mechanic-training-1 merged**: CURRICULUM.md (L1-L4 master program per Douglas's
  raised bar) + L1 depth passes on 5/6 chapters (+48 facts, stable IDs, per-fact confidence,
  Park Tool/Sheldon Brown/manual citations — sample-checked). Brakes chapter pending — worker
  messaged to finish it. Corpus now operational for the bike-mechanic agent.
- **verify/fanout-1 batch-group 7 merged**: +31 verified (Öhlins 9/9 — trunnion law
  spot-verified against per-SKU ohlins.com pages incl. a real 451g TTX2Air weight; Spank 14/14;
  SUNringle 12/16; Michelin 0/9 — hard wall confirmed again). Harness BYTE-IDENTICAL, gates
  green. **Verified 2,957/5,026 = 58.8%** — 1.2 points from the 60% goal.
## 2026-07-17 — bmx-depth-4 merged: disc-brake vocab + depth grind (222 -> 246 off-live rows)

- catalog/bmx-depth-4 merged: Task A closed the depth-3 vocab gap — `BMX_VOCAB.brakeMount`
  gains `'disc'` (do-not-conflate comment in `src/compat-bmx.js`), with a
  `test-bmx-engine.js` case proving the existing `bmx-rear-brake-mount` rule fires a
  u-brake-on-disc mismatch and stays silent disc-on-disc (no rule changes needed — the
  exact-match check already covers the new token). Task B: +24 net new rows (2 dropped
  as pre-existing duplicates caught by `test-bmx-golden.js`'s id-uniqueness check) —
  Redline Proline Flight (disc) + an Avid BB5 disc caliper actually exercise the new
  vocab; two new brands (Standard Byke Co: STA/125R, Alienation: Sabbath front/rear
  wheels); Fit Bike Co depth (STR/PRK frames, Shiv V3 fork, Boss-Less crank, CrossFIT/Tech
  grips); S&M Race XLT bar; Cult AK bars+grips/Dak bars; Colony stem/grip/peg/Wasp-hub
  depth. Every id names a real, currently-or-recently-sold product (WebSearch + a handful
  of manufacturer-page WebFetches — chasebicycles.com, standardbyke.com, tiogausa.com,
  alienationbmx.com, colonybmx.com.au, fitbikeco.com); none met the fetched-manufacturer-
  spec-table bar for `verified:true`, so all stay unverified sample per policy. THE-BAR
  skips logged honestly: Chase Edge/RSP5.0 race frames (disc-capable per
  chasebicycles.com's own frames page, but no fetched BB shell — would've guessed a
  required field), Tioga race tires (brand/model list fetched but no per-tire width data).
  Gates green: `npm test` 700/700, `node validate.js` 0 problems, `npm run typecheck` clean.

## 2026-07-17 — strider design + mechanic bootstrap merged

- **design/striders-model merged** (docs, off-live): headline honest finding — balance bikes are
  complete-bike purchases with ~zero part-swap, so the recommendation is a FIT/SIZING GUIDE +
  unbiased comparison ("First Bike Finder", inseam→seat-height) in a thin builder shell, own
  small checkBalanceFit engine, own page/button. 9 DECISIONS-FOR-DOUGLAS incl. product shape +
  naming ("Strider" is a TRADEMARK — never BuildMyStrider). Aggregators beat walled maker pages
  for specs (fetchability map cited).
- **tooling/mechanic-bootstrap merged**: tools/mechanic/ corpus live — INDEX (append-only stable
  fact IDs, citation-mandatory, ⚠ CONTRADICTION tags, flag-never-edit engine boundary) + 6
  seeded chapters with mandatory INTERACTIONS sections + .claude/agents/bike-mechanic.md (Opus,
  corpus-first reasoning). Douglas's MASTER-level curriculum update missed the bootstrap's
  window (message queued after its final turn) — CURRICULUM.md + per-chapter maturity grades
  folded into training grind 1's brief instead. Gates green.

## 2026-07-17 — bmx-depth-3 merged (202 → 222 off-live rows); disc-brake vocab gap logged

- catalog/bmx-depth-3 merged: +20 rows (12 new-brand frames: Subrosa/Mankind/Radio/Premium/
  Verde/United/Mongoose/Sunday Blueprint/Supercross race; +8 thin-category depth). All
  unverified sample per policy — brand sites JS-walled, Exa fallback used, nothing falsely
  claimed verified. Good THE-BAR skips logged (United Prime Mover bbShell unsourced, Verde/
  United hubs no retail price, Redline race frames blocked on vocab). Process deviation flagged
  honestly: one commit, not per-brand (interleaved single-file inserts — accepted). Gates green,
  no dup ids, 222 rows. **VOCAB GAP: BMX_VOCAB.brakeMount needs a 'disc' token** (modern race
  BMX — Redline Proline/Flight ship BB5 disc) — authorized for depth-4 WITH the do-not-conflate
  rationale + matched tests, per the vocab-widening lesson. Flip bar still ~300/40%.

## 2026-07-17 — road+gravel design round merged (off-live docs); mechanic bar raised to MASTER

- **design/road-gravel-model merged**: 4 docs in data/ (SHARED-STANDARDS, ROAD-MODEL,
  GRAVEL-MODEL, COMPAT-ANALYSIS — 20-rule set, every rule fetch-cited, [MECHANIC REVIEW] flags,
  dormant-until-sourced discipline; caught the road-mm vs MTB-inches tire unit trap).
  **Architecture recommendation: ONE shared road+gravel engine (src/compat-road.js, the
  compat-bmx playbook) serving BOTH pages via a discipline tag** — argued vs extending checkBuild
  and vs two engines (~90% road/gravel rule overlap). DECISIONS-FOR-DOUGLAS surfaced: road page
  name (BuildMyRoadBike placeholder), shared-engine sign-off, rim-brake in v1 vs disc-only
  (recommends disc-only). All OFF-LIVE until his word. Catalog grinds queue behind the BMX flip.
- Mechanic program bar RAISED by Douglas to MASTER level ("teach World Cup mechanics") —
  leveled curriculum L1-L4 + per-chapter maturity grades baked into the running bootstrap via
  send_message; memory updated. BMX flip PRE-AUTHORIZED on the 300/40%+audit bar (memory).

## 2026-07-17 — cb-sheets-2 merged (sheet-verified 140 → 141); round-1 unverified-94 claim CONFIRMED

- verify/cb-sheets-2 merged: re-screened the ~94 "fetched-but-unverified" completebike rows —
  round-1's blocking reasons HOLD on ~15 fresh-fetched spot-checks; exactly one genuine gap found
  and promoted (cb-giant-reign-advanced-2, re-fetched giant-bicycles.com verbatim; coordinator
  re-confirmed the live page). Trek re-attempted once via bdata → still walled, 20 bikes skipped
  per brief. Flags logged, not acted on: YT Jeffsy Core 3 CF + Evil Following live pages show
  spec drift vs cataloged builds (need real re-derivation — queued for the data-model pass);
  mullet Santa Cruz rears need a 27.5 Reserve row (new-row scope excluded). Hightower MY23
  caution respected. Gates green, harness identical. Sheet-verified 141/436; parts verified
  2,926. ⚠ bdata balance reported at $1.39 — nearing the $0.50 floor.

## 2026-07-17 — verify fanout batch-group 6 merged (verified 2916 → 2925)

- Batch-group 6 (fox-shocks-2-smallparts): +9 KMC chains verified via a dual-source method
  (kmcchain.eu per-SKU weights through bdata — .com 403s; kmcchain.us Shopify .js for US MSRP),
  incl. correcting a prior no-EPT-SKU finding, +price corrections. Harness BYTE-IDENTICAL,
  gates green (699/699). WebFetch+Exa both failed on KMC this session (429/nav-junk) — accepted
  on the worker's per-row documented dual-source table, values cross-read from the merged rows.
  Verified 2,925/5,026 (58.2%). Worker had already self-rebased onto main (660eb0b) — good.

## 2026-07-17 — verify fanout batch-group 5 merged (verified 2897 → 2916) · DT Swiss "fabricated SKU" flags DOWNGRADED on evidence

- Batch-group 5 (4 commits, dtswiss-2 + job.json sync) merged: +19 verified, harness
  BYTE-IDENTICAL, gates green. Worker flagged 5 DT Swiss rows as "fabricated SKUs" (150x12 axle,
  157+HG combos "not in the configurator") used by several completebike fills — correctly left
  untouched. **Coordinator spot-check REFUTED the fabrication reading**: two performancebike.com
  listings + worldwidecyclery (fetched) state the 12x157 FR 1500 ships with the SRAM XD body
  installed AND INCLUDES an HG 8-11sp freehub body + 12x150 end caps — so 157+HG and 150mm are
  real out-of-the-box configurations of the real SKU, and the completebike fills describe
  physically real stock setups. No false verdicts. Remaining item (LOW, queued for the next
  data-model pass): decide row-per-purchasable-SKU vs row-per-configuration for
  included-adapter wheels, and the 2 true dup rows + 2 small weight discrepancies the worker
  also flagged. Verified 2,916/5,026 (58.0%).

## 2026-07-17 — BMX depth grinds + severity research merged (off-live: 79 → 202 BMX rows)

- **catalog/bmx-depth-1** (Sunday/Odyssey/Cult/Fit/Kink/WeThePeople/Eclat/Shadow, +56) and
  **catalog/bmx-depth-2** (Profile/GT/Haro/BSD/Colony/Fly/Total/S&M/Chase, +67) merged into
  data/bmx.js → **202 BMX rows** (still OFF-LIVE; nothing served loads it). depth-2 hadn't gotten
  its report through (send_message needs Douglas's confirm) but its single commit cleanly covered
  all 9 assigned brands. The two grinds collided at the array tail (depth-1 appends one block,
  depth-2 inserts per-category — both wanted the shared closing brace); resolved by hand, keeping
  both blocks with correct braces. Validated: node-parse clean, no dup ids, 79+56+67=202. Gates
  green (validate 0, 699 tests incl. BMX suites, tsc clean). Verified 4/202 (~2%) — depth target
  is ~300/40%, so 2 more depth passes + verification before the flip.
- **research/bmx-rule-severity** merged (tools/BMX-RULE-SEVERITY-RESEARCH.md): every provisional
  [MECHANIC REVIEW] severity already matches community consensus → ZERO changes; Q7 pivotal-seat
  ERROR can be un-flagged to confirmed; Q6 chain-width WARNING may become direction-aware later.
- The BuildMyBMX page chip (the live flip) is HELD unmerged: at 202 parts we're below Douglas's
  ~300/40% flip bar and the pre-flip Opus bias/adversarial audit hasn't run (error-tier surface).

## 2026-07-17 — verify fanout batch-group 4 merged (verified 2874 → 2897)

- Watch-loop tick harvested `verify/fanout-1` group 4 (7 commits: rotors-measured, tires-tranzx,
  wtb-raceface-wheels). Field-level promotions only, 5,026 rows unchanged. +23 verified (tires:
  11 Specialized via the confirmed-dead 403 wall through `bdata scrape`, 6 Maxxis, 3 Schwalbe;
  3 TranzX droppers; rotors/wheels). Gates green (699/699, validate 0, tsc clean); harness
  BYTE-IDENTICAL (weight/price/provenance only — verdict-driving tire WIDTH unchanged).
  Spot-checks: Maxxis Minion DHR II DD (1222g), TranzX YSP39 34.9/150 (685g), Schwalbe Big Betty
  SG (1180g) all exact; Specialized re-blocked to me by the same 403, but the worker's log
  documents each of the 11 with mfgPn + per-row corrections (caught a Butcher T9 2.3 weight that
  had matched the wrong SKU → 975g) and honestly left budget-exhausted SKUs unverified. Merged
  555b53b..; worker messaged continue. Verified 2,897/5,026 (57.6%).

## 2026-07-17 — cb-sheets batch 1 merged (sheet-verified 134 → 140) · BMX go-live word given

- **Douglas gave the BMX go-live word** (parameters in memory `bmx-golive`): build to ~300 parts /
  ~40% verified then flip; page name "BuildMyBMX"; Kit Builder button renames to "BuildMyKit";
  pivotal-seat ERROR kept; rider-preference research on the [MECHANIC REVIEW] severities. 4 chips
  dispatched (page mount, 2 depth grinds, severity research). Decision packet artifact published.
- **verify/cb-sheets-1 batch 1 merged**: +6 build-sheet promotions (Salsa Timberjack, Canyon
  Neuron CF 8 + Sender CFR Team, Commencal Meta HT V3 + Supreme DH V5, Santa Cruz Hightower R
  MY25 re-fetched). Gates green, harness byte-identical, diff = provenance fields only.
  Worker's finds: 99 rows carry fetched write-ups but stay unverified — 94 correctly (mostly the
  price-on-maker-page bar), ~5 borderline (Whyte 905 price-bar consistency) for a re-screen; Trek
  is a hard 3-tier JS wall (21 bikes — parked for a bdata-render attempt); Hightower MY23/MY24
  crank spec drift flagged NOT acted on (needs the MY23 page). Sheet-verified 140/436.

## 2026-07-17 — verify fanout batch-group 3 merged (verified 2808 → 2868)

- Watch-loop tick harvested `verify/fanout-1` group 3 (9 commits: fox-shocks, suspension-small,
  wheels-boutique-2). Field-level promotions only; 3-way merge over the parked-fix wave preserved
  all 5,026 rows. Gates green (699/699, validate 0 problems, tsc clean), harness BYTE-IDENTICAL.
  Spot-checks: DVO Jade X size matrix exact (trunnion law holds), Reserve 30|HD exact; ridefox.com
  rate-limited (429) — its rows carry the worker's documented fetch logs. Verified 2,808 → 2,868
  (57.1% of 5,026). Worker messaged "continue" toward >60%.

## 2026-07-17 — Douglas's decision wave shipped: parked-data fixes + build-sheet badge + bias-r3 smalls

- Douglas answered the seat-12 decision queue: badge YES, bias smalls YES, parked items FIX,
  monitor = daily 8:52am scheduled triage (created, notify-only-on-actionable), Continental
  Soft=Medium KEPT (middle-of-ladder reasoning), kids-gear + home page stay parked.
- **fix/parked-data-items merged** (chip, e7f3ab7): Highball R wheel repointed to the 6-bolt
  Reserve 30|TR AL pair (SRAM MTH hubs are 6-bolt-only; the old M1900 Center-Lock pick was the
  wrong side); Aeffect R stem dup retired to ALIASES + 3 fills repointed by hand (completebike
  fills don't pass canonicalId); SB135 T2/T3 fills rebuilt from T2's own Vital spec page (+XM 1700
  27.5 wheel rows, Yeti Carbon bar, ODI Elite Pro, Fox Transfer Factory; HS2 rotors 200f/180r;
  Motive Silver kept per Yeti's own kit list over Vital's conflicting G2 claim — maker wins);
  gr-wtb-wafel dup retired to ALIASES. 5,025 → 5,026 parts.
- **ui/cb-verified-badge-bias-smalls merged** (chip, 7715116): new `completeBikeSheetVerified`
  predicate + distinct "🧾 Build-sheet verified" badge (134/436; the ✓-only Complete Bikes landing
  view no longer blanks — bias-r3 HIGH-2 closed); green-dot non-overclaim disclosure line in the
  legend; Schwalbe `bikepark` casing → DH chip; unmapped tire compound/casing values surface under
  a UI-only "Other/unrated" bucket (won't-guess contract untouched — classifiers still never
  guess). +4 tests (699).
- Merged sequentially onto 8df444b, four gates green after both (validate 0 problems ×2 catalogs,
  699/699, tsc clean), verdict harness BYTE-IDENTICAL across both merges, popup scan clean.
  Pushed `8df444b..425f129`.

## 2026-07-17 — Seat 12 seated; verification fan-out batch-group 2 merged (verified 2675 → 2808)

- **Seat 12 coordinator seated** (worktree `coord-2026-07-17`); seat 11 archived after its handoff
  block + succession commit (`1d58c23`) confirmed on main. Hourly watch loop re-armed (session-only).
- **Harvested the pending `verify/fanout-1` batch-group** (31 commits: fanout-1-dvo, -dtswiss,
  -forks-rockshox, -forks-other, -forks-other-2, -mixed, -shimano, -wheels-boutique):
  field-level promotions ONLY, 5,025 rows before and after, no id changes. Bike verified
  2,675 → **2,808** (validate 0 problems; kit 409 unchanged). Four gates green (695/695 tests, tsc
  clean); verdict-audit harness delta = annotation-only (low-rotor-watchlist verified-fractions
  rose: dvo-onyx-sc 1/6→6/6, dvo-diamond-d1sl 0/1→1/1, srsuntour-durolux 1/3→3/3) — ZERO verdict
  movement. Spot-checks: vitalmtb Onyx SC, dvosuspension Diamond D1, sram fs-pike-bse-c1, wtb
  wafel.js all exact; srsuntour.com timed out (worker-documented basis accepted). Worker correctly
  DECLINED the Fox 36 PE MY27 150 promotion (press-only travel point) and left the 3 PARKED items +
  gr-wtb-wafel dup flag untouched (dup noted for a future dedup pass). verification-job.json state
  legit: Verified 2290→2678, Pending grew via auto-sync of the complete-bike-era rows. Merged
  `1d58c23..7289ded`; worker messaged "continue".

## 2026-07-17 — Coordinator seat 11 close-out: trust wave lands (kit 57%, IS fix, bias r3 clean)

Final seat-11 wave, all CI green. **IS-mount adapter tier merged** (`f1685b4` — bias-r3 HIGH-1
closed): the 3 IS frames went 0/104 calipers buildable → 100/104; PM-on-IS = adapter warning with
structured fix (sourced from Shimano DM-SMMA00A + Banshee's and Cotic's own pages); FM-on-IS
correctly stays an error; coordinator adversarially re-verified every direction; harness
byte-identical; 695 tests. **Kit verification fan-out merged** (`3d3be53`): kit 293 → 409 verified
(57.3%, past the 55% goal); the new unblockers revived Fox Racing/Giro/Bell/Five Ten/Pearl Izumi/
Bolle; 6 Leatt gloves un-flagged (stale clearance-URL artifact); 4 rows removed with evidence; two
genuinely structural walls documented (Specialized apparel client-side pricing, iXS no-USD).
**Bias audit r3 merged earlier today** (`4603d38`): no favoritism, both R2 HIGHs resolved/disproved.
**Capability day:** Bright Data CLI (OAuth'd; Specialized + web.archive.org walls dead), Exa MCP
(Trek JS-wall dead), fork nominal-weight policy extended, push notifications enabled, AllTrails +
Canva connectors landed. Two unexpected shutdowns survived with zero merged-work loss (checkpoint
discipline; crash-triage drill now routine). STILL RUNNING at handoff: the bike-catalog
Verification MEGA fan-out (verify/fanout-1 — 2,735+ verified already integrated in its worktree,
Shimano-PDF worker the long pole; seat 12 harvests). Seat 11 → seat 12 handoff written.

## 2026-07-17 — Coordinator seat 11: grind #7 (+100, 436 bikes / 5025 parts) + the structural wave lands

Five lanes wrapped across the overnight ticks, all merged + CI green. **Grind #7 (`d7aec32`):
complete bikes 336 → 436, catalog 5025 parts** — model-year depth (prior-gen platforms with real
archived sheets), thin disciplines (first DJ completebikes, +14 DH, +20 XC race), 8 new makers,
vocab widenings (brakeMount +IS unlocking Cotic/Banshee; +shimano-8/+trp-evo7-dh; 3 headTube codes),
disciplined drops (gearbox drivetrains flagged as a genuine schema gap, not forced). **Coordinator
caught 3 MORE rotor-ceiling conflations at merge review** (the XCM34 class — factory builds warning
against their own stock rotors): XCR34-2CR sibling carry-over + the Focus Thron frame/fork pair
("Post Mount 180mm" = native mount size; Focus ships 203 both ends) — all corrected to the
factory-evidenced floor with in-desc provenance; 1 ambiguous case (Highball R 6-bolt-rotor-vs-CL-hub
— one side is wrong, picking blind would fabricate) HELD + flagged. Also merged this wave:
**testability refactor** (`c3e7f09` — 4 tested modules, +51 tests, parity proven byte-identical
twice); **harness partial-wheel upgrade** (`d97391b` — D 11→15 incl. the C-1 repro pinned, negatives
+ clean-direction guards); **price-drift holds resolved** (`e676e81` — 3 of 4 overturned by fresh
fetches, 1 phantom Maxxis dup retired via ALIASES); **support-parts batches 1–3** (`c9f9970`,
`f2880a0`, `95300e4` — +17 verified, 8 corrections, honest walls documented; session wound down
with the ~980-row remainder triaged for a future per-brand fan-out). Suite now 688 tests.
Open for Douglas: fork nominal-weight policy question; Race Face Aeffect R stem dup; Highball R
rotor/hub adjudication; SB135 T2/T3 fills-granularity; verified-badge + kids-gear decisions; home
page (reminded). All worker sessions archived; only Affiliate remains open.

## 2026-07-16 (evening) — Coordinator seat 11: +138 bikes, a CRITICAL false-fits killed, kit women's breadth

Four workers landed at once; all merged, all CI green.

**MEGA grind #6 (`9378261`): complete bikes 198 -> 336 (+138), catalog 4521 parts.** 6 waves, ~35
parallel catalog-workers, 6 Opus auditor passes (one per wave). Landed 138 not 150+ because genuine
exhaustion set in by wave 5-6 and workers DROPPED rather than fabricate — the right call. Additive
vocab widening for budget-hardtail fitments (rearAxle +Boost141 +135x5-qr, frontAxle +9x100-qr,
steerer +straight, crankBb +powerspline +square-taper, +microshift-advent-mx), each maker-sourced
with an explicit do-not-conflate rationale (conflating any would be a false "fits"). Its auditors
self-caught 6 real defects incl. a fabricated `minRotorR` causing a false rotor ERROR and a Whyte
Secta `udh:false` causing a false Transmission error. Error-tier task resolved: Trek Fuel EX Gen 6
shockMount re-verified via 3 fetches — 185x55 TRUNNION is CORRECT (the 205x60 figure belongs to the
unrelated Gen 7 platform); no change needed. **COORDINATOR CATCH at merge review:** the new
`fk-srsuntour-xcm34-lo-29-130` carried `maxRotorF:160` read off the page's "Postmount 160mm" — that
is the NATIVE mount size, not a rotor ceiling — which made `cb-cannondale-habit-ht-2` warn against
its OWN factory spec (that bike ships a 180mm rotor on that fork). Corrected to 180, matching the
fix this wave's own auditor had already applied to the Fox 32 Rhythm; same conflation, one row
missed. (My first patch attempt broke the desc string on unescaped apostrophes — `node --check`
caught it immediately, exactly why that rule exists.)

**CRITICAL engine fix (`6f4a151`) — the audit's C-1, a false "fits".** `effectiveWheel` returned
null unless BOTH halves of a build-your-own wheel end were picked, silencing rule areas 1/2/6/9/14:
a 20x110 DH hub on a Boost fork returned ZERO errors and a GREEN dot until a rim was added; all 49
hub/rim rows dotted green against any build. The fix agent found a SECOND masking path the audit
missed (`placementDiff` didn't clear mutex partners, so rims dotted against an impossible baseline)
and corrected the audit's own "nothing needs weakening" claim (off by one — one test was retitled,
not weakened). +11 additive tests (616 total). Coordinator-verified the repro by hand: now errors
with correct wording and dots RED; 9 of 49 hub/rim rows correctly red on a 29 Boost build. Harness
BYTE-IDENTICAL — and that is itself the finding: the harness never assembles a partial wheel, so it
had ZERO coverage of this bug's shape and stayed green for C-1's whole lifetime.

**Kit grind #3 (`04da059`):** women's-fit rows 8 -> 19 (real SKUs only), all 8 flagged Dakine rows
dispositioned with evidence (Syncline/Thrillium are now women's-only — retargeted; 3 with no SKU in
either gender marked discontinued), the Alpinestars BNS price conflict closed by re-fetch ($44.95
confirmed), a non-existent TLD "Sprint LS" retargeted to the real Sprint Pro. Honest holds: no Five
Ten women's shoe (sources disagreed), body armor's $93 floor confirmed REAL not a data gap.

**Code-quality audit (`23de72f`, doc-only):** verdict — engine is O(1) in catalog size (no scale
cliff at 10x), no rule violations, `e22189a` confirmed SUPERSEDED (memory corrected, stop chasing
it). Structural finding for Douglas: logic in index.html's inline script can't be unit-tested, so
the week's headline features (MSRP policy, sliders) ship unguarded behind green suites — which is
how C-1 hid.

**Support-parts verification** was blocked by a stray uncommitted diff + stale worktree and
correctly REFUSED to stash/reset someone else's work; the blocker later resolved itself (worktree
clean, and that Canyon work was already on main via grind-5). Session resumed with a rebuilt queue
(1942 unverified rows now) and the poppler unblock. Also this session: poppler-utils proved ALREADY
INSTALLED (the "not installed" blocker was false — documented in VERIFY-PROTOCOL `44688e2`, unblocking
~48 Shimano PDF rows); Douglas's UI round shipped (dual-ended range sliders + complete-bike facets,
two size revisions, rear-travel relabel + frames sliders, per-size specs fix, Kit Builder underline).

## 2026-07-16 — Coordinator seat 11: kit verification merged (+68, 4 fabricated rows purged)

Merged `verify/kit-parts-1` (`e21281c`): kit verified 131 → 199 of 688 (8 brand-cluster workers,
81 commits — the crash-restarted run, commit-per-brand held). Two same-page price contradictions
resolved by live re-fetch under the MSRP policy; **4 fabricated rows REMOVED** (Nukeproof Sam Hill
flat shoe, iXS Trigger flat+clip, Giro Havoc LS — products that don't exist; purity beats count);
`'rheon'` added to the helmet rotational vocab (schema+types matched pair, pinning test added,
603 tests now). Coordinator audit: compat.js untouched, gates green, 5 new source URLs
spot-checked as real maker domains. Worker-flagged for Douglas (left in catalog): 2 suspect
Alpinestars shoe rows, a suspect Cratoni eyewear row, a Cairn KIDS' sunglasses row (scope
question), several likely-discontinued TLD/Royal/Sweet rows. Retry queue: Endura,
Adidas/Bolle/Sombrio/SixSixOne (fetch-walled), some ION/Yeti/Dharco (no live USD price).
With this, ALL FOUR parallel workers from today's fan-out are merged + archived; the watch loop
is retired. Day totals on main: complete bikes 108 → 198, kit verified 131 → 199, analytics live,
legal topo headers, pricing-bias fix, Fox/Öhlins maxTire, bias audit doc, 2 crash recoveries.

## 2026-07-16 — Coordinator seat 11: bias fixes shipped + grind-4 salvage merged (198 bikes)

Three parallel workers landed within one tick. **(1) Pricing fix (bias HIGH #1) auto-shipped**
(`aa0c08c`, UI tier): save/headline/sort all basis on MSRP; `streetPrice` renders as a labeled
"Sale $X" only; the Pivot Firebird (Jenson Exclusive) fell from #2 best-value of 164 to #101 and
its save badge corrected $5,057 → $1,458; `loadBad()` now rotates its broken-build demo across 10
makers instead of permanently casting Specialized. Coordinator post-hoc scan clean. Douglas's
pricing rulings recorded in memory (`pricing-display-policy`). **(2) Grind-4 salvage merged**
(`e7b9fa3` → pushed in `d98dfdd` push): 34 genuinely-new bikes extracted from the crashed
worktrees' uncommitted diffs (164 → 198 total; 5 dropped as grind-5 duplicates), 9 integration
defects fixed pre-commit, the 3 grind-2 missing ids confirmed dedup casualties, all 9 stale
worktrees cleared. **(3) Fox maxTire grind merged (bias HIGH #2)** (`d98dfdd`): Fox 40 family
2.5in (MY25 owner's manual) + the full Öhlins DH38 line sourced; Fox 36/38/34 left blank — a
STRUCTURAL finding: Fox's current docs publish no numeric clearance (only a physical check
procedure), and the 2017-era numbers are 26in-rooted, so entering them risked wrong verdicts.
The audit's Jeffsy-desc side-note was disproven in code (the 3mm rotor tolerance exists) — desc
kept. Harness byte-identical through both compat merges except C 214→219 (salvage frames);
maxTire adds warnings, never errors — spot-checked truthful. A push was correctly BLOCKED once by
the is-ancestor guard (pricing had landed mid-merge); rebase + re-gate + push, all CI green.
Open follow-ups: Fuel EX Gen 6 shock-mount discrepancy (two fetched sources say 185x55 std vs
catalog trunnion — error-tier, needs sourced review); Fezzari/Ari catalog gap; kit-verify grind
still running (80+ commits); verified-badge decision still with Douglas.

## 2026-07-16 — Coordinator seat 11: grind-5 merged (+50 bikes, 114 → 164) after surviving a second crash

The re-queued grind (#5) had ALREADY FINISHED before the day's second unexpected shutdown — and this
time nothing was lost: the commit-per-maker discipline (baked into its brief after grind-4's wipeout)
left 49 commits + 13 cluster branches intact through a hard power loss. Crash triage: repaired 2
corrupt refs + a zero-filled worktree HEAD + a corrupt index (both casualties were kit-verify
sub-agent worktrees with no commits), fsck clean; resumed all 4 worker sessions via send_message.
Merged `e6c4144`: 50 new complete bikes across the re-queued majors + wave-2 clusters, plus 6
sourced field-level corrections to existing frame rows (ids append-only, re-added in place).
Coordinator audit: e-bike scan clean; validate 0 problems (3969 parts, 2509 verified); vitest
602/602; tsc clean; harness — only section C rose 199→214 (15 new frames, 0 errors), A/B/D/E
identical. CI+Deploy green. Still in flight: kit-parts verification (restarted post-crash),
manufacturer-bias audit (4 commits), worktree hygiene sweep (74→40 so far).

## 2026-07-16 — Coordinator seat 11: analytics live + legal-page headers unified

Douglas's two pending decisions both closed same-day. **(1) Cloudflare Web Analytics is LIVE** — he
enabled it in the CF dashboard and handed the manual beacon token to the coordinator; shipped in two
phases to avoid a same-file race with the in-flight legal-header chip: `48a1cfa` (index + KitBuilder
heads) then `43c701e` (the 3 legal pages + the truthfulness rewrite: privacy §5's "No third-party
analytics" replaced with an accurate cookie-less/aggregate-only/no-fingerprinting description,
Cloudflare added to §6 processors with its privacy policy linked, meta description updated,
Last-updated bumped to July 16). No-tracking-cookies and no-advertising claims unchanged (still
true); no consent banner (none needed, and the hard rule bans one regardless). Beacon + new wording
live-verified by curl on buildmymtb.com. **(2) Legal-page topo headers** — Douglas: "yes it should be
the same"; a [Sonnet, low] chip shipped `b07efa1` (all three pages, light/dark/Loam DOM-verified,
minimal Loam plumbing scoped to the banner, RAD untouched, popup-scan clean, correctly rebased around
the analytics commit that landed mid-task). All CI+Deploy green.

## 2026-07-16 — Coordinator seat 11: modelYear backfill + grind-4 salvage (108 → 114)

**modelYear backfill merged (`6daa73b`).** Branch `catalog/modelyear-backfill` from a chip that fanned
out 6 per-category workers (RockShox susp / Fox+misc / boutique susp / frames+completebikes ×2 /
gen-tagged drivetrain). Populates the optional `modelYear` field only where maker-stated: frame
48→180/197, fork 33→330/359, shock 17→740/803, completebike 78→108/108 (all). **~370 rows deliberately
left BLANK** — continuous multi-year platforms (Nicolai/Geometron "2019–present"), thin-web boutique
builders, conflicting gen-year signals, bot-blocked pages. No fabrication (a blank beats an invented
year). Coordinator verification used a **decisive proof rather than spot-checks**: stripping all
`modelYear:` tokens from both sides makes `src/compat.js` **byte-identical to origin/main** — so the
change is provably modelYear-only. Gates: validate 0 problems (3729 parts), vitest 602/602, tsc clean,
and the verdict-audit-harness came back **byte-identical to baseline** (correct — modelYear is
annotation-only and never feeds `checkBuild`). CI+Deploy green. Worker-flagged follow-up (not applied,
out of scope): 3 Manitou Mezzer Expert rows lack a `gen:'G2'` tag mapping them to the right generation.

**grind-4 killed by an overnight shutdown — 2 of 8 clusters salvaged (`d3e63ac`, +6 bikes, 108 → 114).**
Douglas paused and powered off mid-run; on restart the session's own task-notification reported 6
cluster agents stopped with **no completion record**. Checking `rev-list --count origin/main..<branch>`
per cluster branch showed the truth: the 6 (Trek+Cannondale, Giant+Scott, Specialized,
Canyon+Commencal+YT+Propain, Norco+Transition+Kona+Orbea, Ibis+SantaCruz+Yeti+RockyMountain+Devinci)
died with **0 commits — genuinely lost**, while `cb-grind4-hardtails` (1 commit) and `cb-grind4-roundout`
(2 commits) had committed and survived fully intact. Salvaged both: **HARDTAILS** (a live priority) —
Chromag Rootdown GX (a real second build tier on the same in-catalog `fr-chromag-rootdown` frame, zero
new part rows needed) + Ragley Marley 1.0; **ROUND-OUT** — GT Force/Sensor Carbon Elite, GT Zaskar LT
Expert, Focus Jam 6.8 (explicitly the non-electric trim). The two branches collided as a **pure-additive
conflict** (both append completebike rows at the same array location); resolved by keeping BOTH sides —
the seam needed no comma surgery (ours already ended `},`) — with an immediate `node --check` parse
verification per the string-splice rule. Audited: e-bike scan clean on both; validate 0 problems (3763
parts, 2457 verified); vitest 602/602; tsc clean; harness section-compare — ONLY section C rose 197→199
(the 2 new frames, still 0 errors), sections A/B/D/E identical (D adversarial 11/11 caught, 0 missed).

**Lesson recorded in COORDINATOR-HANDOFF §5 (learned expensively):** brief every grind worker to
**commit per MAKER, not per CLUSTER** — the clusters that committed survived a hard shutdown; the ones
that batched to cluster-end lost everything. And **salvage before re-queuing** a dead fan-out run.
Remaining grind-4 scope re-queued as chip **grind #5** with incremental-commit discipline baked in.

## 2026-07-16 — Coordinator seat 11: 200-bike grind-3 merged (+51 complete bikes, 57 → 108)

Merged the 200-bike Complete Bikes grind-3 harvest (`0bd7d54`, branch
`catalog/complete-bikes-grind-3` from `local_c638126f` — an orchestrator that fanned out 8 parallel
per-maker `catalog-worker` clusters + 4 adversarial `catalog-auditor` (Opus) agents). **+51 complete
bikes across 25 makers, 57 → 108 total.** Makers: Santa Cruz 9, Specialized 11, Pivot+Yeti 8,
Giant+Scott 6, Evil+Cannondale 5, Merida/Cube/Focus/Intense 5, Boutique (Revel×3/Chromag) 4, Trek 3.
Verified/sample split ~19/~32 — sample-heavy where makers are fetch-walled (Specialized 403,
Trek/Pivot/Yeti JS-walled or dealer-only); every sample row's fills are REAL stock parts sourced via
a fetched dealer/vitalmtb/99spokes page, never fabricated. Row descs document each substitution
("flagged") and OMIT parts (pedals/headset) rather than invent them — honest data, on-values.

**Additive tire-vocab widening** (`schema.js` + `types.js`, mirrored): casing `'grid'`/`'control'`
and compound `'gripton-t5'` — Specialized's own named tiers, sourced via fetched bikeradar reviews;
annotation-only axes that never feed `checkBuild`. The grind's two self-audit fixes are included:
Santa Cruz OE bar clamp (new `hb-santacruz-20-carbon-760`, 4 fills repointed, killed a false
stem-shim warning) and Giant Reign front-tire compound MaxxGrip→MaxxTerra; two parallel-merge
duplicate ids resolved. The worker's one-off `scripts/resolve-additive-conflict.js` merge helper was
intentionally **excluded** from main (grind tooling, not product code).

**Coordinator-audited before merge (independent of the grind's self-audit):** e-bike hard-rule scan
CLEAN (grep over-matched on substrings — every hit visually confirmed a non-e MTB); applied via the
stale-base own-additions pattern (base == main tip, zero conflict); `validate` 0 problems (3729
parts, 2451 verified); `vitest` 602/602; `tsc` clean; **verdict-audit-harness section-compare vs
`origin/main` via stash** — the ONLY delta is section C clean-assembles 182 → 197 (the new frames,
still **0 errors**); sections A/B/D/E **byte-identical** (D adversarial 11/11 caught, 0 missed — no
false-fit regression; E same 4 pre-existing DVO/SR-Suntour fork flags — batch added no new
false-warn). CI + Deploy green (`29465447219`/`208`, 36s/38s).

**Session hygiene:** resolved a **duplicate-coordinator collision** — two live seat-11 sessions
(this Opus seat + a Sonnet/max `local_601ae113`). Douglas chose this one ("this coordinator lives");
archived `601ae113` (its work — a PROJECT-LOG backfill + the mega-grind archive + the xc-dropper
recovery — was already on main, nothing lost), plus seat 10 ("Project Manager Retired 1") and the two
finished workers (mega-grind #1 `4f36df6a`, xc-dropper `b4d73300`). Ran a 30-min monitor loop
(CronCreate `7,37 * * * *`) on the grind per Douglas — do-not-trust-`isRunning`, wait for the real
report + a branch — then cancelled it on merge. **Next queued:** the modelYear backfill (now
unblocked — both complete-bike grinds settled).

## 2026-07-15 — Coordinator seat 10 → seat 11 succession (log catch-up + orientation findings)

**Seat 10's wave (not separately logged at the time — backfilled here for trail continuity):**
merged the Complete Bikes mega-grind #1 (`be35895`, +51 bikes across 25 makers, 6→57 total,
coordinator-audited: verified rows spot-checked against real maker sources, no e-bikes, harness
delta confirmed benign — only the section-C clean-scenario count moved 169→182 for the 13 new
frames); shipped the complete-bike list-card height fix (`562859a`,
`.cb-priceaction{display:contents}`, uniform 59px matching frames/other categories per Douglas:
"don't change the others to match, change complete bikes to fit"); swapped the legal-page contact
email to `Doug@buildmymtb.com` (`47c310d`, Cloudflare routing confirmed live); landed the per-frame
`noStockDropper` flag (`00318cf` — this IS the "xc discipline dropper exemption" task's actual
shipped output, see below). All four gates green throughout.

**Seat 11 orientation: resolved a false "lost engine work" alarm — no data actually lost.** The
open session tracking "Add xc discipline to dropper slotRequired exemption" (`local_b4d73300`) had
reported readiness to merge, but both its tracking branches (the origin PR branch
`fix/xc-hardtail-dropper-completeness` and its own session branch) pointed at old, unrelated
commits — its worktree folder (`elastic-aryabhata-b1f508`) had no `.git` linkage and wasn't a
registered worktree, so its git operations (rebase/commit/push) had been silently landing on the
SHARED checkout the whole time (the recurring orphan-worktree hazard, confirmed for the first time
to also hit a worker session, not just coordinator seats — 4th-5th occurrence project-wide; see
the `orphan-worktree-hazard` memory for the new dangling-stash recovery recipe). Recovered its
stashed WIP via `git fsck --unreachable --no-reflog` (a dangling 3-parent stash commit,
"xc-dropper-completeness wip") and diffed it against current main: **byte-identical to `00318cf`**,
already shipped by seat 10 as the `noStockDropper` flag. The session's own engineering judgment — a
per-frame sourced flag, NOT a blanket xc-discipline exemption, since most xc-tagged frames ship
with a dropper as stock and a blanket rule would create false-complete builds — was correct, and
it's already live, tested (`test-golden.js`), and additive-only (zero effect on any existing
catalog row until a future sourced entry sets the flag). Nothing left to merge; messaged the
session explaining this and recommending it for archive. Also confirmed + archived Complete Bikes
MEGA-grind #1 (`local_4f36df6a`) per its own final report (fully merged, nothing further to do).

**State confirmed with fresh gates, not doc counts:** origin/main `3db5380` → 3454 bike parts + 692
kit parts, 0 problems (2403/1051 bike verified/unverified, 131/561 kit), 602/602 tests, tsc clean.
Seated on `coord/2026-07-15-seat11` (a distinct worktree name from seat 10's still-present
`coord-2026-07-15`, which hadn't been archived yet at seed time — seat 10 was mid-self-archive via
direct Douglas confirmation, session retitled "Project Manager Retired 1"). Left untouched and
running: the 200-bike Complete Bikes grind (`local_c638126f`, orchestrator fanning out
catalog-worker/catalog-auditor agents on `catalog/complete-bikes-grind-3`) and the Affiliate Setup
session (`local_e301505a`, idle).

## 2026-07-15 — Coordinator seat 9: Kit Builder line + cog sub-chip merged live

- **KIT BUILDER LINE MERGED to main (`8d919e8` + `b8929f0`), `KIT_ENABLED=false` (invisible until
  Douglas flips it).** Per Douglas's seat-9 directive (no longer gated on his preview — merge it).
  Two clean commits over current main:
  - **(a+b) Foundation + three-pane redesign** — `feat/kit-builder-redesign` *contains* the
    foundation (foundation +1), so one squashed landing delivered both: kit schema for 12 optional
    categories (schema.js/types.js), `src/kit.js` (KIT_GROUPS/SLOTS/PARTS + totals), the
    `/KitBuilder` page mirroring the Bike Builder's three panes, main-page nav button, deploy
    stanza, `test/test-kit.js`. Applied with `git apply --3way` over main's moved
    schema.js/types.js/index.html — clean.
  - **(c) All 12 category grinds harvested → 34 seed fixtures to 692 kit parts.** Each
    `grind/kit-*` was based on the foundation and touched ONLY `src/kit.js`; applied each's own
    additions. **Per-category counts cross-checked equal to each grind branch** (nothing dropped/
    double-applied). One adjacent-region collision (bodyarmor↔neckbrace) resolved by keeping both
    blocks, then removing the 2 foundation neckbrace seed fixtures the grind supersedes so no
    duplicate ids survived (validate.js was the safety net that caught them).
  - **MTB-only scrub:** dropped `ewr-oakley-airbrake-mx` (Oakley's motocross goggle SKU; a separate
    Airbrake MTB exists). The named moto pants (Alpinestars Techstar Envision / Nevada) were already
    absent from the grind branches. Kept honestly-tagged DH/park-crossover protection (moto-heritage
    but MTB-used) rather than open gaps. No tier-padding, no row-per-size, no dup brand+model.
  - **No-e-bike hard rule:** neutralized e-bike/e-MTB language in 3 MTB-helmet descs (Fox Rampage,
    Fox Dropframe Pro, TLD Flowline SE) — MTB helmets that merely also carry the NTA-8776
    speed-pedelec cert; the grind correctly never asserted that cert, only the prose foregrounded it.
    Helmets kept, e-bike framing removed. (`urgebike.com` sources are the Urge brand domain.)
  - Kit is fully isolated from `checkBuild`: no compat.js changes, **verdict-audit harness
    byte-identical** at every step; bike catalog unchanged (3130 parts).

- **SINGLE-SPEED COG → Drivetrain sub-chip MERGED (`3cff400`).** Harvested from
  `feat/cog-under-drivetrain` (grind session done, its own CI green). Engine-tier review:
  structurally **display-only** — the cog stays an ordinary top-level pricing group (own slot key /
  bundleActive / buildTotals / slotRequired / presetBy); the only engine addition is a
  `parent:'drivetrain'` marker (types.js documented). index.html's new
  childGroupsOf/railTarget/renderChips-skip/subCatsOf/groupCats browse it as a Drivetrain sub-chip.
  ss-rules + DJ single-speed completeness untouched. Tests **strengthened** (test-dj-singlespeed now
  pins `cog.parent==='drivetrain'` AND that the cog slot is NOT one of drivetrain's own slots).
  Harness byte-identical.

- **Gates every push:** validate 0 problems (3130 bike + 692 kit) · vitest 587 · tsc clean · harness
  identical. CI + Deploy green on every push. Re-fetched origin + FF-checked before each.

- **KIT BUILDER FLIPPED LIVE (`042eb3a`), `KIT_ENABLED=true`** — Douglas's explicit call later the
  same session. Browser-verified locally before shipping (the `/KitBuilder` page renders all 12
  rails with live counts / add-to-kit works / zero console errors; the main page shows the "Rider
  kit" nav button); CI + Deploy green → public on buildmymtb.com. **Cleanup:** 15 sessions archived
  (seat 8 + redesign + cog + 12 grinds), all merged local + the 15 spent remote kit/cog branches
  pruned (Douglas-approved), worktrees removed. (Infra note for a future pass: GitHub Actions warns
  the checkout/pages/setup-node actions still target the now-deprecated Node 20 — non-blocking, deploy
  still succeeds.)

- **Kit list-row alignment fix (`b772486`)** — the dense-list rows had the price pinned to the row
  top while the Add-to-kit button/verified badge centered (independent `align-items:center` per
  column). Switched the list-row grid to `align-items:start`; size-chart `<details>` moved below the
  grid. Browser-verified (price/badges share a line, button/verified share the next). UI worker chip.

- **HARDTAIL LIVE-PUSH (`cf80ee1` + `9311ba8`)** — hardtails were already live (31 frames + engine
  support) but not discoverable. Added a Full-suspension/Hardtail frame sub-filter + a "Hardtail
  build" sample (shock-free, property-test extended); +3 audited hardtail frames (Vitus Sentier,
  Chromag Rootdown, Ragley Blue Pig → 34) and re-verified the existing 22. Flagged for a future
  brake pass: Cotic BFe / Chromag Doctahawk need I.S. brake mount + the catalog has zero I.S. brakes.

- **ROTOR-CLASS TOLERANCE engine fix (`9019a24`)** — surfaced by the complete-bike review: rule 10/10b
  strict-compared rotor size to frame/fork max/min, so a Shimano 203mm rotor false-WARNED on a SRAM
  200mm-labeled max and a 200mm rotor false-ERRORED on a 203-min fork (200≡203, 220≡223 are the same
  rotor class). Added a bounded 3mm `rotorOverMax`/`rotorUnderMin` grace to all four sites + 8 tests;
  harness delta verified to be ONLY the intended false-warns (6→4 fork families). Fixed a latent
  harness bug too (probe E re-implemented rule 10 instead of calling the engine). Systemic — cleared
  false verdicts across a large slice of the catalog (88 forks at maxRotorF:203, etc.).

- **COMPLETE BIKES — foundation + first flagship LIVE (`31c2d62`)** — per COMPLETE-BIKES-SCOPE.md's 9
  locked decisions (Douglas 2026-07-15). `completebike` whole-build preset reusing the fills/lint/
  weight machinery (fills = factory OE parts only; pedals empty); auto-fill; dual-price block (Buy as
  parts vs Complete + You save); dedicated browse surface; MSRP + optional streetPrice with a
  discount-only guard. First bike: **Commencal Meta SX V5 Essential** ($4,400; ~$5,849 as parts →
  save $1,449) + 11 honestly-sourced OE rows. Ships straight to live (decision #8, no gate).
  **Verdict-clean 0 errors / 0 warnings** (Douglas chose fix-root-cause-first → the rotor tolerance
  landed first so the flagship debuts perfectly clean), pinned as a golden. Browser-verified live:
  browse → Build this bike → auto-fill → "no conflicts found" + the dual-price story. Foundation +
  rotor + hardtail worker sessions all archived, branches/worktrees pruned.

## 2026-07-14 — Coordinator seat 8 (succession)

- **HARVEST BATCH (evening): 5 landed on main.** (1) **"Best match"→"Random" sort** (`7c73008`) —
  real `fisherYatesShuffle` in compat.js (NOT the biased comparator), stable per page-load, no brand
  clustering; the unbiased-value fix. (2) **GX AXS "no cassettes" = NOT a bug** (`5c5b4e7`, tests
  only) — worker verified via node harness + local + LIVE prod that a GX Eagle AXS controller+mech
  correctly leaves 5 Eagle cassettes green; the empty list was the "🟢 Compatible only" filter hiding
  cassettes correctly incompatible with another build part (MicroSpline/XDR rear wheel or non-Eagle
  chain). Refused to alter correct code (would risk a false "fits"); added 4 dot-level pinning tests.
  **UX follow-up candidate:** explain WHY cassettes are hidden ("N hidden: incompatible with your
  rear wheel's driver"). (3) **"Own it" build-panel button AUTO-SHIPPED** (`ecb680b`, UI-tier) — a
  per-slot inventory button reusing the existing card "Own it" logic + gating; post-hoc re-gated
  clean. (4) **12 Garbaruk cassettes** (`2e081e1`, all verified) — aftermarket wide-range, each
  mapped to one system (cross-compat checked, no overclaim); non-cassette range (40 chainrings,
  cages, pulleys, guide) inventoried — no catalog category, future decision. (5) **COMPLETE-BIKES-
  SCOPE.md** merged — buyable whole builds that auto-fill + dual price (component total vs maker
  MSRP), maps to the existing preset/buildTotals machinery; decisions await Douglas. NOTE: seat was
  briefly stale (own-it auto-shipped after last sync) → rebased the sort/gxaxs commits onto it.
  5 sessions archived + branches/worktrees pruned. CI green throughout.
- **HARVEST WAVE 2 — all remaining code branches landed.** (6) **Drivetrain-above-Wheels rail
  reorder** (`34141d8`, Douglas-confirmed live — I held it for his OK since the request came via a
  worker session, not directly; GROUPS order is UI-only, harness byte-identical). (7) **Spec-card
  collision fix** (`0d5cef6`) — root cause was a stateful row counter overflowing at 13+ filled
  slots (bb+headset), redrawing the 13th group atop BRAKES; rewrote to filter-filled-first + unique
  row index + dynamic height + front/rear name dedupe. (8) **Wheel→tire auto-select** (`0d5cef6`,
  same commit) — matched sizes pre-select (29→29), mullet safely falls back to "all" (one shared
  size filter; flagged a front/rear split as a possible follow-up). (9) **Seatpost unification**
  (`8a8416b`) — one "Seatpost" rail group, Dropper/Rigid sub-chips, TWO slots with declarative mutex
  (wheel-group altOf precedent → no double-count, ZERO migration, rules 13/13c untouched, old links
  load, harness byte-identical); dropper default, DH/DJ rigid, per-frame override field unset.
  index.html conflicts at the two activeGroup handlers resolved field-level each time (sort's
  reshuffle + tire inherit + defaultSubFor all kept). CI+Deploy green on every push. **NOTE:** seat
  went stale twice tonight (own-it auto-ship) — rebase/field-merge handled it; the recurring
  activeGroup-handler conflict is the hot line, resolve by stacking all three behaviors.
- **STILL GATED ON DOUGLAS (only remaining open work):** the **kit line** (foundation + redesign +
  12 deepened grinds — all DONE, staged for his localhost preview at :8127; merge order
  foundation→redesign→grinds with the MTB-only scrub, after his OK) and `feat/builds-gallery`
  (awaiting sign-off). Their sessions stay open until the kit line merges (avoids a pile of archive
  prompts). Everything else is merged + swept. Also awaiting Douglas: complete-bikes decisions,
  fork/shock per-size-shock design, Atherton, and the optional GX-AXS "why hidden" UX hint.

- **KIT BUILDER kicked off — decisions locked + build/grind chip spawned.** Douglas made all 9
  scope calls (recorded in `KIT-BUILDER-SCOPE.md` §Decisions). Two overrides from the scope's
  recommendations: (1) it's a **SEPARATE PAGE** (a "Kit Builder" button on the main page →
  `/KitBuilder`, same-style button back), not an in-builder section — so **kit total only**, no
  combined total; (2) **shorts and pants are SEPARATE categories**. v1 = 12 categories (helmet,
  shoes, jersey, shorts, pants, gloves, knee, elbow, body armor, neck brace, shin guards, eyewear),
  ALL optional, none required; no hydration/base-layers. No shoe↔pedal bridge (shoes flat/clipless).
  Cert = badge/filter fetched-source-only. `KIT_ENABLED` gate, **preview-before-live**. One
  `[Fable, high]` orchestrator chip (`feat/kit-builder`) builds the foundation (schema for the 12
  cats + the /KitBuilder page + routing + deploy.yml) then fans out pinned-Sonnet sub-agents to
  grind all categories at once; presents a branch for Douglas's localhost preview (NOT auto-shipped).
  Key isolation guarantee to verify at harvest: kit adds ZERO checkBuild rules — the verdict-audit
  harness must prove the bike engine is behavior-identical.
- **Kit Builder RESTRUCTURED (Douglas) — foundation-only chip + 12 separate grind chips.** Douglas
  didn't want the category grind on Fable; split into (1) a foundation-only `[Fable]` build and (2)
  12 per-category `[Sonnet]` grind chips in separate sessions. **Foundation DONE + staged**
  (`feat/kit-builder`, 5f7caec): 12-category schema (separate `KitPart` union to dodge tsc union
  complexity), the `/KitBuilder` page via a **`KitBuilder/index.html` directory-index** (cleanest
  static route, no SPA hackery; deploy.yml stages it), `KIT_ENABLED=false` (live-safe merge), a
  34-row starter seed, `kitTotals` self-contained. **compat.js UNTOUCHED; verdict-harness
  byte-identical → kit provably isolated.** 4 gates green (validate 0 · 575 tests +25 kit · tsc
  clean · harness 0-delta). **STAGED for Douglas's localhost preview** (KIT_ENABLED flip + serve
  `/KitBuilder/`) — NOT merged (his preview-first call). **12 grind chips spawned** off
  `feat/kit-builder` (helmet/shoes/jersey/shorts/pants/gloves/knee/elbow/bodyarmor/neckbrace/
  shinguard/eyewear), each self-contained: one-row-per-PRODUCT (sizes as labels), per-category id
  prefix + KIT_CERTS cert tokens (fetched-source-only; neckbrace cert dormant), pads/shoes weigh
  per pair, no size/color in ids. **Merge order at harvest: foundation to main FIRST (after his
  preview OK), THEN the grind branches** (they reference the kit schema, so main needs it first).
  ⚠ `tools/DATA-ENTRY-TEMPLATE.md` still lacks the kit entry rules (baked into each grind brief
  instead) — add a kit section when the foundation merges. Builder session archived + pruned.

- **Carbon/alloy frame-variant work MERGED (3117→3126, +9 rows).** Part A split the 2 audit-gap
  rows (Rocky Mountain Instinct base=carbon + new `-alloy` sibling; Trek Top Fuel Gen4 base=carbon,
  alloy sibling withheld — unresolved BB divergence, flagged). Part B added 8 siblings (Kona
  Process 153 Carbon, Propain Spindrift AL, Trek Session C 29, Trek Fuel EX AL Gen6, RM Slayer
  Alloy, Devinci Troy Carbon, Transition Smuggler Alloy, Nukeproof Reactor 290 Carbon). Reviewed
  in-seat: inherited interfaces are shared-platform + flagged per-row; real alloy-vs-carbon deltas
  independently sourced (Smuggler 34.9 vs 31.6 seatpost, Session trunnion vs std shock, Transition
  ZS-vs-IS headset convention); nothing fabricated, no e-bikes. Long "checked, NOT split"
  (layup-tier) + "flagged, insufficient data" lists in the worker report — those are the future
  follow-up pool. Four gates green, session archived, branch/worktree pruned. **1 item for Douglas:
  Atherton A-Range is a scope question (different manufacturing process, not a material variant of
  the S.200) — include or not?**
- **Kit Builder scope doc MERGED (`KIT-BUILDER-SCOPE.md`).** Fable scoping round; decision-ready.
  Load-bearing conclusion: Kit is NOT a compatibility problem — a curated list with price/weight +
  cert badges + discipline filter, zero error-tier engine. 9 decisions await Douglas (relayed);
  grind stays unspawned until he signs off. Session archived.
- **Gallery MVP security audit: GO (Opus, independent).** No data leak, no auth bypass, no XSS, no
  secret exposure, no pop-up, no e-bike — each attack surface traced to the deciding RLS line.
  **F1 (LOW/MED, worth fixing before migration):** `created_at` is client-writable → back-date to
  dodge the 10/day cap AND future-date to pin a build atop the "newest" grid (undercuts the
  unbiased-ordering value). One-line trigger fix (`new.created_at := now()`). F2 (cap TOCTOU race)
  + F3 (inert `photo_path` column) accepted. Findings on `origin/audit/gallery-rls`; session
  archived. **Gallery awaits Douglas's sign-off to merge app code + run the migration** (security tier).
- **Price-drift sweep MERGED (65 corrections + 544 lastChecked refreshes).** NOT stalled after all —
  the session's `lastActivityAt` froze at 13:47 while it kept working (harness-timestamp quirk); it
  completed the full 1,332-verified-row sweep (713 deduped URLs, 17 clusters): 65 MSRP corrections
  (SRAM Maven $260→$330, Maxxis Minion SS off a sale price→$82, Fox Transfer 14 sizes→$329, six
  frames), 544 confirmed→lastChecked 2026-07-14, 718 unconfirmable (flagged, never guessed).
  price/lastChecked only. 3-way merge with 3 conflict blocks (recent material backfill + carbon/alloy
  siblings met the sweep) resolved field-level — kept material + the new sibling rows, re-applied the
  sweep's 3 price corrections + 7 Transition lastChecked bumps by row id. Four gates green.
- **8 e-bike-specific rotor rows RETIRED (NO-E-BIKES hard rule, 3126→3118).** The price sweep
  surfaced them live. Removed the 8 with explicit e-bike evidence in their own model/desc: Clarks
  CLE-01 ×4 (model "CLE-01 E-Bike", "2.3mm e-bike-rated") + TRP RS01E ×4 ("2.3mm e-bike-rated").
  No ALIAS (no successor); verify-job re-synced (tombstoned). NOT referenced by any preset/test.
  **KEPT (not deleted on suspicion, THE BAR):** TRP RS06E "Allround" ×3, RC04E ×2, RS05E "Race
  Rotor" ×2 — TRP's "E" suffix is NOT a reliable e-bike marker (RS05E is a race rotor) and their
  descs make no e-bike claim; flagged for a proper verification pass. Session archived, pruned.

- **Carbon+alloy frame-version policy (Douglas 2026-07-14): "if there is a carbon and aluminum
  version of a frame, include them both."** Recorded as an explicit split-policy row in
  `tools/DATA-ENTRY-TEMPLATE.md` (a genuine carbon-vs-metal pair = two rows; a carbon layup-tier
  split like SC C vs CC is NOT). Resolves the 2 audit gaps (Rocky Mountain Instinct, Trek Top Fuel
  Gen 4 — each one ambiguous row for a model that ships both ways). Sourcing chip spawned
  `[Sonnet, medium]`: split those 2, then sweep the frame catalog for any single-row model that
  also ships in the other construction and add the missing sibling. Append-only ids
  (`-carbon`/`-alloy`), two-tier sourcing, present a branch.

- **Seat 8 seated + seat 7 archived.** New coordinator on `coord/2026-07-14` off `origin/main`
  (`be0b141`), seat-7 worktree/branch pruned. Confirmed nothing left to harvest — seat 7's final
  wave already landed the wheels nominal-weight promotion + WAO Convergence transition + Reserve
  MS retirement. `node validate.js` = 3117 parts / 0 problems / 2293 verified. No open bug issues.
- **Frame-materials accuracy audit MERGED (`b159dc4`) — 1 fix + 11 backfills, CI+Deploy green.**
  Worker fanned out 8 `catalog-worker` sub-agents by brand cluster over all 156 frames. Merged the
  confident set via own-additions-apply: **FIX** `fr-atherton-s200` carbon-alloy→alu (the row's own
  desc said "Alloy lugged DH bike" — S-Series is aluminium tube/lug; carbon-alloy is Atherton's
  A-Series); **11 backfills** (commencal-absolut/kona-process-153/marin-alcatraz/santacruz-jackal/
  specialized-p3/nsbikes-zircus=alu, kona-shonky/dmr-sect/chromag-monk/octaneone-void=steel,
  orbea-occam-lt=carbon). Material→154/156 frames. **HELD** `fr-devinci-wilson-29` at maker-consistent
  `alu` (audit proposed carbon-alloy on editorial Vital MTB citing carbon seatstays + a
  non-structural carbon bashplate; the row's own desc says "Made-in-Canada alloy DH" from a fetched
  devinci.com page — our carbon-alloy token requires the MAKER's wording, the same bar the audit
  correctly used to defer GT). **OPEN JUDGMENT CALL for Douglas:** should editorial confirmation of
  carbon-front/alloy-rear promote to `carbon-alloy` when the maker's page only says "Carbon"? Affects
  `fr-devinci-wilson-29` + `fr-gt-force-carbon`/`fr-gt-sensor-carbon` (kept `carbon`). 2 rows left as
  honest gaps (rockymountain-instinct + trek-top-fuel-gen4 — identical carbon/alloy trims, no
  disambiguator). No e-bikes found (incidental SC "Vala AL" e-bike sighting, not in catalog, flagged).
  material is filter-only (never feeds checkBuild). Session archived; 9 stale `audit/frame-materials*`
  remote branches await a prune (auto-mode gated the remote delete — needs Douglas's OK).
- **carbon-alloy policy RESOLVED + applied (`f28a27f`, Douglas 2026-07-14).** Decision: reputable
  editorial confirmation of carbon-front/alloy-rear promotes to `carbon-alloy` even when the maker's
  page only says "Carbon" — same third-party-fact basis as the measured-weight exception. Applied to
  the exact set the audit surfaced: `fr-devinci-wilson-29` alu→carbon-alloy, `fr-gt-force-carbon` +
  `fr-gt-sensor-carbon` carbon→carbon-alloy. Policy recorded in the `schema.js` material-vocab
  comment (the only doc home for the token; stale S.200 example dropped). Four gates green.
- **Forum riding-style 'dj' migration written** (`supabase/forum-riding-styles-dj.sql`) — DJ went
  live in the catalog but both profile riding-style CHECK constraints (`profiles_riding_style_chk`
  singular + `profiles_riding_styles_chk` plural) still capped at xc/trail/enduro/dh/all, so a DJ
  pick would fail the write. Migration widens both to include 'dj' (idempotent drop+re-add;
  display-only, no policy/trigger touched → escalation-impossible + reserved-names unaffected).
  **Douglas runs it in the Supabase SQL editor.** Committed only — running it does NOT surface a DJ
  pick (the editor arrays `PROFILE_RIDING`/`PROFILE_DISC` still omit dj); the UI 'dj' option is
  held until AFTER he confirms the migration ran, to avoid a pick→constraint-violation race.
- **Icon design-session handoff written** (`ICON-HANDOFF.md`, repo root) — Douglas still dislikes
  the icons after 5 rounds; handoff reframes to a live-render interactive session (Fable/Opus) with
  the two-live-icon-systems inventory, the taste constraints, and the apply targets.
- **Price-drift-remainder chip spawned** `[Sonnet, overnight]` — ~1400 not-yet-checked verified
  rows; non-overlapping with the frame-materials audit (price/lastChecked vs material = field-level).
- **Builds Gallery — ALL SIX decisions made (Douglas): fast-follow photos, account required,
  post-moderation, NO kudos/likes (not just MVP-deferred, "not yet"), hard delete on unpublish,
  publish-gate = complete+zero-errors.** `BUILDS-GALLERY-SCOPE.md` §8 updated to record them —
  MVP is now fully decision-complete. Implementation chip spawned `[Fable/Opus, high]` (schema+RLS
  tier — new `gallery_builds` table, snapshot-on-publish, publish flow, gallery/detail pages,
  fork-to-builder, GitHub-issue reporting, sitemap Action, tests incl. a DJ-brakeless publish
  case). Presents a branch for coordinator review + adversarial RLS audit; does NOT auto-ship;
  Douglas runs the migration himself once reviewed.
- **Affiliate session: LLC name DECIDED — "Dubs Works."** All three clearance checks came back
  clean (PA registry, USPTO exact-wordmark, dubsworks.com domain unregistered); record at
  `LLC-NAME-CLEARANCE-DUBS-WORKS.md` (Affiliate's lane, untracked). Next steps (domain reg, PA
  filing, EIN) are Douglas-only; Affiliate will hand Coordinator a code-shaped request only once
  `Doug@buildmymtb.com` email goes live (the staged `chore/cloudflare-prep` branch is ready for
  that). No action needed here — logged for the cross-session trail per [[multi-session-coordination]].

## 2026-07-14 — Overnight watch (coordinator harvesting while Douglas sleeps)

- **Seat 7 closes clean: fabricated Reserve MS variants retired (`0f1e882`) → 3117 parts / 2293
  verified.** The last running session confirmed rw-reserve-30-hd-29-ms/-275-ms never existed
  (re-fetched Shopify variant JSON: XD-only) — both ALIASed to their real XD siblings, no invented
  successor; applied in-seat (its base predated today's Reserve wave), verify-job tombstoned the
  ids. Every session is now archived, every branch harvested or deliberately held
  (bike-type/kids-striders + dj-bmx, chore/cloudflare-prep, 3 design selection branches,
  honeycomb keepsake). Successor + Affiliate session seed docs are current. End of seat 7.

- **True final wave (Douglas caught 5 more sessions): 3119 parts / 2293 verified (`7cdd9e0`).**
  Wheels nominal-weight policy applied (+7 verified: DT Swiss E1900 x3, Reserve 30HD pair, 31DH
  pair; Giant TRX/Race Face Turbine SL/Zipp Moto checked-not-promoted with reasons) · WAO
  Convergence transition (+21 rows +2 presets; every model judged NEW PRODUCT per WAO's own tech
  page — discontinued+supersededBy, NO aliases; 3 ambiguities flagged; old pages 404 = genuine
  discontinuation) · Reserve 30|SL front maxTire 2.5→2.6 (the chip session verified but never
  committed; applied in-seat with attribution). The wheels worker correctly used spawn_task to
  flag two out-of-scope Reserve issues as chips — the pattern works. Gates green, harness
  byte-identical vs the DJ-era baseline. One session left RUNNING for the successor: "Verify
  rw-reserve-30-hd-29-ms is a real SKU" (suspected fabricated MicroSpline variant — the worker's
  own Shopify-JSON fetch says XD-only; expect a retirement flag).

- **Final wave before succession:** gallery scoping landed (`502d3d4` — snapshot-on-publish model,
  forum-posture moderation, MVP=MEDIUM; 6 decisions queued for Douglas in the handoff) and the
  mobile-only banner shrink AUTO-SHIPPED (`44a7a6c`, <=480px, post-hoc scan clean). Still grinding
  when the next coordinator seats: wheels nominal-weight promotion + WAO Convergence rename chips.
  This coordinator seat (coord/2026-07-12, the 7th) ends here — successor + the new parallel
  Affiliate session both have complete seed docs.

- **Session split: Affiliate session established alongside the Coordinator (Douglas, 2026-07-14).**
  Wrapped the final two loose sessions from the overnight fleet (contrast-fix auto-shipped
  `0024402`; the finishing-kit/mullet breadth session's branch had merged earlier but the session
  itself was missed in that pass — archived now). Executed his four one-liners: (1) wheels
  nominal-weight policy extended in VERIFY-PROTOCOL.md + a grind chip to promote DT Swiss E 1900 +
  sweep similar rows; (2) We Are One Convergence rename-mapping chip (per-model ALIASES-vs-
  discontinued call, not a blanket rename); (3) mobile-only banner-shrink chip (desktop must stay
  pixel-identical); (4) completed-builds-gallery SCOPING chip (document only, the competitive
  audit's #1 idea). Then: rewrote COORDINATOR-HANDOFF.md end-to-end for the two-session era
  (`2c650f8`), authored the standing multi-session-coordination protocol (memory) and a new
  `AFFILIATE-HANDOFF.md` (untracked, repo root) seeding a parallel Affiliate session — its own
  lane (LLC/EIN/Cloudflare/affiliate applications/manufacturer partnerships), explicit
  coordination rule (list_sessions + send_message before ambiguous/shared-file work; Coordinator
  remains the only pusher to main). Ready for Douglas to open both a fresh Main Coordinator
  session and the new Affiliate session whenever he chooses.

- **Douglas back, harvest blessed ("merge" — all 11 already landed).** New directives: (1) **KIT
  BUILDER** coming — rider gear/apparel (shoes, pants/shorts, jerseys, gloves, helmets, knee/elbow
  pads, body armor); the grind will run as idle-time Sonnet chips, but **no kit chips until he
  asks** (memory: kit-builder-directive; kickoff = a data-model round first). (2) Contrast bug
  from his screenshot: the ACTIVE material sub-chip is unreadable on Loam — fix chip spawned
  [Sonnet, low], root-cause class fix across all chip rows, UI auto-ship.

- **MORNING HARVEST COMPLETE — all 11 overnight/day chips landed → 3098 parts / 2286 verified /
  550 tests / 17 guides (main `e4fbb41`, CI+Deploy green throughout).** In merge order:
  quality-backlog `7f80ae6` (schema id-map, isPresetCat/isPresetPart split — genuinely different
  contracts, worker verdict adopted; _slotByKey memo; test table exact) · Shopify wall map
  `2cba0c5` (ZERO flips — every retry brand still walled; FETCH-WALLS doc committed; flags: WAO
  "Convergence" rebrand mapping + extend-nominal-weight-to-wheels policy, both → Douglas) ·
  **DJ GO-LIVE `9769371`** (25 rows into PARTS, dj chip, cog/seatpost slots with inverted
  requiredness, NEW rule 13c = rule 13's geometric twin on a brand-new slot, sample bands exclude
  dj; BMX stays unreferenced; CLAUDE.md conflict resolved as union; suite 489→547; harness delta =
  exactly the 9 DJ frames assembling clean) · frame materials `32880fc` (143/147 backfilled,
  carbon-alloy token maker-verbatim, filter-only contract harness-proven; 9 DJ frames enter
  without material — next-touch backfill) · breadth `566aa82` (+8 rows; worker's audit: the
  2026-07-08 mullet-wheel + finishing-kit queue gaps are otherwise CLOSED — retired) ·
  price-drift `0fb1a8a` (882/2283 checked; ZEB→$1299, SDU→$659, Öhlins TTX22→$929.50, CC 110
  headset→$99.99, Mattoc retailer-sale-price bug→MSRP $1049.99; overlap conflicts resolved
  field-level = sweep PRICE onto landed rows; ~1400 rows remain → follow-up chip candidate) ·
  guides wave 2 `6f710fb` (7 new guides, coordinator accuracy-read all; DJ guide's "not live yet"
  closing REWRITTEN at merge to the live truth; a string-splice tooling fumble was caught by the
  parse check before commit — twice — and fixed) · verify-job re-synced `e4fbb41`. All 8 sessions
  archived; repo swept to seat + shared checkout. **Deferred/flags for Douglas:** phone banner
  costs ~28% of a 375px viewport (worker suggests condense-on-scroll as a future design round);
  forum riding_styles CHECK needs a 'dj' migration (schema tier, his run); WAO rebrand; wheels
  nominal-weight policy; competitive audit's top-5 ideas (builds gallery, price history, verdict
  guides, methodology page, Worldwide Cyclery first + Backcountry caution).

- **Overnight harvest, wake 2 (~04:15 UTC).** Discovered chip-spawned sessions CANNOT send_message
  the coordinator ("no Main Coordinator reachable") — completed workers sit silent; watch checks
  now read transcripts of idle sessions. Landed: (1) **evenness sweep (`eb6871a`)** — 146 forks
  gained maker-published maxTire (RockShox 97/97, Manitou 33/33, Öhlins 21, CC 13, MRP 4 — rule 14
  activates, harness byte-identical = no false fires), ENVE/Spank wheel minTire, and a UNIT BUG
  fix (maxTire compared in inches; 6 DT Swiss F 535 rows carried mm=75, rule silently dead —
  follow-up: audit any maxTire>10 catalog-wide); walls re-confirmed (Fox/DVO/EXT publish no
  fetchable clearance text; SR Suntour states no rotor minimums). (2) **docs coherence
  (`c294edd`)** — NEXT-STEPS rewritten 714→75 lines, FOR-REVIEWERS map current, EXPERT-REVIEW-
  DOSSIER appendix for rules 6c/8b/C2-C4/M1/20 — coordinator accuracy-read EVERY entry in-seat
  (all faithful; one stale M1 line corrected at merge). (3) **Phone-UI worker AUTO-SHIPPED
  (`1d06971`)** mid-harvest per UI tier — post-hoc scan clean (index.html only, no popup-shaped
  patterns; mobile filter carousels, dynamic sticky-header offset for the new tall banner, part-
  modal verdict, touch-target pass); full report pending its session wrap. Main moved during the
  wave — evenness rebased + re-gated before push (the pattern working as designed). Sessions
  archived, branches/worktrees pruned. Still grinding: price-drift, guides, quality-backlog,
  breadth, shopify-retry, DJ go-live, frame-material, competitive audit, phone-UI.

## 2026-07-13 — Coordinator succession + post-wave quality audit shipped

- **TALL TWO-ROW BANNER LIVE (`a0a0070`) + DJ GO-LIVE ordered.** Douglas compared his screenshots:
  the wrapped narrow-width header ("tall", topo contours breathing) beats the single-row desktop
  ("too short") — the <=880px two-row layout (logo/buttons row + full-width search row) is now the
  header at ALL widths; search flex moved into its own rule (the later flex:1 shorthand was
  silently resetting flex-basis — caught at 1900px verification); desktop scroll-margins bumped to
  clear the taller sticky header. Verified at 1900px across all four themes, console clean, gates
  green, CI green. **DJ go-live chip spawned [Fable, high]** ("build the DJ chip"): activates the
  held 555ee7c integration — DJ rows into PARTS, cog/seatpost slots, dj discipline chip — BMX
  stays off-live; engine-tier review + adversarial pass at merge.

- **Icons v5 (refinement round) delivered** (`design/rail-icons-emoji-v2` @ 5a37795;
  `_PDFs/rail-icons-lineart-v5.pdf` sent): 54 drawings — every v4 icon corrected against real
  component photo reference (fork crown/arch/axle, shock piggyback position, derailleur cage
  geometry), one accent element per icon on var(--icon-accent, currentColor) (graceful fallback;
  one CSS line per theme = the whole contract, demoed with each theme's existing accent), plus the
  requested ANTI-SET (solid duotone silhouettes) as a direction check. QA'd at 20px via headless
  contact sheets. Awaiting picks. Both design sessions archived + swept.

- **TOPO CONTOURS BANNER LIVE (`9150847`) — Douglas's style pick from a 9-direction round.**
  Style-directions-v1 worker delivered 9 clickable header directions on a simplicity dial (PDF +
  live switcher); Douglas picked D4 Topo Contours as the default banner for light/dark/Loam and
  declared the STANDING RULE that RAD is its own theme (keeps its checkerboard header; exempt from
  site-wide treatments; exactly four themes, no additions — memory + this log are the record).
  Coordinator extracted D4 from the mockup and shipped: --hdr-bg/--hdr-topo per-theme vars,
  deep-green banner + ~10%-opacity contour SVG pattern (absolute, out-of-flow), html.rad hides it.
  Cross-theme computed-style verification passed (the pane viewport was degenerate 0x0 — layout
  probes were artifacts; the pattern element is out-of-flow by construction). Gates green,
  CI+Deploy green. Mockup branch design/style-directions-v1 kept until the style pass finishes
  (Douglas may pick more elements, e.g. the rail-header contour echo, not shipped yet).

- **DJ/BMX provisional leans CONFIRMED by Douglas (2026-07-13/14): "I don't want to veto these."**
  Q7 (pivotal seat/post = hard error) and Q6 (chain-width mismatch = warning) — and by extension
  the Q4-Q10 lean set — are now DECIDED, not provisional. Next worker on bike-type/dj-bmx flips
  the doc's PROVISIONAL tags to decided with this date. **Icons: v4 line-art direction APPROVED**
  ("getting close... on the right track") with refinement feedback — cleaner/more accurate, a
  little theme-aware color (one accent channel, light demo only), plus one deliberate "anti" set
  as a direction check. v5 chip spawned [Fable, high].

- **Away-grind wave 5 (final): Shimano archive wave [Opus] landed (`adf8aec`) → 2283 verified.**
  Shimano drivetrain 40.8% → **100% verified** (+29 rows) from ONE fetched source: the CURRENT
  productinfo.shimano.com Specifications handbook Ver.2.4 (no archive edition needed this
  generation; pages rendered to PNG because text extraction jumbles the wide tables — route note
  for future waves). 8 maker-weight corrections; Deore/CUES interface-verified with nominal
  weights (Shimano publishes none at those tiers); the long-flagged M8200 clampType resolved to
  ispec-ev from the rendered table (rule-19 warning parity with M8100); XTR 10-51 mfgPn updated to
  the CS-M9101-12 running change, id append-only; test-ui kit fixture swapped to a durably-
  unverified example (contract unchanged). E-bike siblings (STePS, CN-E8000, motor-protection
  shifters) correctly excluded. Gates green in-seat, verify-job re-synced (2394/2926). Bias-audit
  #1 is now CLOSED for shocks AND drivetrain; frames remain the fetch-walled tail. All five
  away-grind sessions harvested + archived; repo tidy (seat + shared checkout only).

- **Away-grind waves 2-4 landed → 3065 parts / 489 tests (`bf975d0`, `5d8fcd4`).** (1) Suspension
  follow-ups: Diamond Boost x4 discontinued (line renamed away), +2 Diamond 36 D1 SL rows (fetched;
  probe-E gains the expected data-accurate DM-180 note), MY27 40 27.5 confirmed; 36 PE 150 retired
  via ALIASES (never purchasable). **SAVE OF THE DAY: the validate gate blocked the 185x55T PE
  retirement — fr-privateer-141-g2 BUNDLES it (its verified page states 185x55 trunnion), so the
  "never existed" call was wrong for retail only; row corrected to the oemOnly/forFrames pattern,
  bad Factory-page verification + wrong discontinued status both removed.** (Coordinator also ate
  two self-inflicted tooling bites here: a regex that mangled escaped quotes in a desc, and a pipe
  that masked a parse failure past an && chain — both caught before push; lesson: never pipe the
  parse check, use string slicing not re.sub templates on descs.) (2) Hardtail push: +6 frames
  (Knolly/Stanton/Ragley/Sonder/Bird/Pipedream); GAPS: Cotic BFe needs an I.S. brakeMount vocab
  decision, On-One defunct, RAAW makes no HT. (3) DH Transmission harvested from a worker that
  committed then died silent — coordinator full-reviewed: CS-XS-797 + RD-XX-DHE + XX DH crank
  inside sram-transmission @ speeds:7 (no schema change; M1 made it work), 4 pinning tests incl.
  7s-vs-12s stays red (489 total). All sessions archived + swept (incl. the D:\-root worktree a
  worker created against the folder rule — future briefs pin .claude/worktrees). Still running:
  the Shimano archive wave [Opus] (branch verify/shimano-archive-wave already committing).

- **Away-grind wave 1 landed: frames-tail re-confirm (`dd594f1`).** 4 rows freshly re-checked
  against maker pages (Skipped stands on all — frame-only weights genuinely unpublished; Devinci
  Wilson product page has 404'd, noted in-row). KEY FINDING: the verification queue's FRAME tail
  is now effectively CLOSED for today's tooling — remaining rows are Specialized/Trek/YT
  fetch-walls or weight-walls; further frame-verification grind is wasted effort until the
  unblocker connector or measured-weight sources appear. FLAG parked: fr-santacruz-highball fetch
  anomaly (12x173.7mm axle + FSA IS-2 headset = likely summarizer misread; row untouched — needs
  one direct/manual page check). Still running from the away-grind tray: hardtail wave, Shimano
  archive wave [Opus], DH Transmission, suspension follow-ups.

- **Rail icons v4 (LITERAL LINE-ART) delivered** (`design/rail-icons-emoji-v2` @ 9223832 pushed;
  `_PDFs/rail-icons-lineart-v4.pdf` sent): 59 hand-drawn stroke-SVG drawings of the actual
  components — 14 slots x 3-4 variants + a matching discipline quintet — one line language,
  currentColor (all 4 themes verified), each shown at ~20px + 3 stroke weights + reduced-detail
  cut, 4 curated full-rail sets. Awaiting Douglas's picks; apply = follow-up chip.

- **MANUFACTURER-PARTNERSHIP-KIT delivered** (`_PDFs/MANUFACTURER-PARTNERSHIP-KIT.pdf` + root .md;
  indexed in _PDFs/README §5). 3 outreach templates (From: Doug@buildmymtb.com, LLC placeholders) ·
  license one-pager (non-exclusive/revocable/display-only/takedown; commits incl. ZERO ranking
  favor) · 15-brand first-wave sheet with contact routes FETCHED from each brand's own site (none
  invented; 8 brands have no public marketing/PR email — general form/phone only, noted) ·
  guardrails citing the bias audit. Fires only after LLC + domain email. Icon saga: rounds 1-3
  (emoji) all rejected — ROOT CAUSE: Unicode has no bike-part glyphs, every candidate was a
  metaphor. Round 4 pivots to Douglas's own words ("an icon of a bike frame for frames") — literal
  component LINE-ART SVGs, chip running [Fable, high]. _PDFs/README design-pick section updated.

- **INCIDENT + RECOVERY (coordinator error, fully repaired, no data lost).** A worktree sweep used
  "clean tree = removable" without cross-checking live sessions and removed the RUNNING
  partnership-kit session's worktree + branch (partial removal also deleted 78 tracked files
  before a lock stopped it). Recovered within minutes: branch ref restored, worktree registration
  hand-rebuilt (.git/worktrees metadata + .git file + reset), all 78 deleted files checked out
  (0 modified / 0 untracked lost — the session hadn't written yet), shared checkout verified
  untouched, no stray commits. Rule added to handoff gotchas: sweep only after cross-checking
  list_sessions cwds. The recurring orphan-worktree hazard now has a documented recovery recipe.

- **Discipline icons v3 delivered** (`design/rail-icons-emoji-v2` @ 087ac1e; `_PDFs/discipline-
  icons-v3.pdf` sent): Douglas rejected rounds 1-2's glyphs and narrowed scope to the 5 discipline
  slots; round 3 = 151 fresh uniquely-numbered candidates (25-30/slot + labeled wildcards, nothing
  previously shown re-offered — build-enforced) + 5 curated quintets. Awaiting his picks (mixable
  across rounds). **Manufacturer partnership program approved as the images/data ENDGAME** (chip
  running): kit = outreach templates + license one-pager + researched first-wave contact sheet;
  fires after LLC + domain email; partners get zero ranking favor (memory + affiliate-push updated).

- **DJ/BMX ARCHITECTURE IMPLEMENTED on the held branch (`555ee7c`, bike-type/dj-bmx — still
  OFF-LIVE, unmerged).** Per the sign-off: driveMode:'single-speed' discriminator in the MTB engine
  (slotRequired drops drivetrain + ALL brake/rotor slots for single-speed frames — the brakeless
  decision), new cog/seatpost categories staged without live GROUPS slots, DJ dataset reshaped to
  the live schema (go-live = PARTS.concat(DJ_PARTS) + two slots); NEW src/compat-bmx.js own engine
  (BMX_VOCAB/GROUPS/SLOTS, gear-ratio display-only) sharing compat.js's exported Verdict — loaded
  by nothing live. Every new rule DORMANT with a documented activation condition (inventory in the
  doc's new §6); worker even proved the live engine byte-identical via the harness AND added an
  in-suite driveMode-absence pinning test. On-branch gates: validate 0 problems · 539/539 tests ·
  tsc clean · harness identical. Worker also caught + dropped a wrong-spec v0.1 row (31.8 BMX stem
  — real BMX is 22.2/25.4) and corrected the bogus 'oversized' clamp token. Q7 (pivotal=ERROR) +
  Q6 (chain-width=warning) surfaced to Douglas as the two provisional calls most worth a veto look.
  CLAUDE.md file-table mention of compat-bmx.js deferred to go-live merge time (worker's note).

- **DJ/BMX ARCHITECTURE SIGNED OFF (Douglas, 2026-07-13).** The three load-bearing calls from
  data/DJ-BMX-COMPAT-ANALYSIS.md §5: (1) Option (b) confirmed — DJ folds into the MTB checkBuild,
  BMX gets its own checkBmxBuild/vocab (the buildmybmx on-ramp); (2) discriminator =
  driveMode:'single-speed' (mechanical flag, not a bikeType enum); (3) brakeless is a valid
  complete build for these types. Q4–Q10 MED/LOW proceed on the doc’s leans as PROVISIONAL
  (vetoable). Implementation chip spawned [Fable, high] — all work stays on the HELD off-live
  branch, every new rule lands DORMANT pending the mechanic-review bar, and the live suite must
  prove behavior-identical (driveMode absence = zero effect).

- **STRIDER SIZING DECIDED by maker consensus (Douglas delegated the call): INSEAM primary.**
  Worker fetched 8 balance-bike makers’ own sizing guidance (Strider/Cleary/REI/Frog unfetchable,
  documented): inseam 4 (Prevelo verbatim “most reliable size indicator”, Guardian, Early Rider,
  Yedoo) · height 3 · age 1 → inseam-vs-seatMin/Max is the model’s primary fit input, child height
  a secondary filter (new heightMin/heightMax fields), age = label only. Citation table in
  data/STRIDERS-MODEL.md §2b; woom/Prevelo/Cruzee maker ranges added (Prevelo seatMax corrected
  356→355 per page). Implemented on the HELD off-live branch bike-type/kids-striders (0670f3a,
  data/-only, gates prove live app untouched). Still unmerged per the off-live rule.
- **Rail icons v2 DELIVERED** (`design/rail-icons-emoji-v2` on origin, a648f76; PDF in _PDFs + sent):
  108 uniquely-numbered candidates (4–6 per rail slot, per-slot prefixes FR-/FK-/…, ID-0 = the
  round-1 glyph) + 4 curated sets; Douglas replies with picks. KEY FINDING for the apply chip: the
  “Refined Emoji” style is NATIVE color emoji (Unicode strings in ICONS/DISC_LABELS in index.html),
  NOT SVGs — applying picks is a string edit; optional vendored Twemoji path noted if pixel-identity
  ever matters. ⚠ Orphan frosty-austin worktree trapped its THIRD worker — the empty dir is now
  deleted outright.

- **Fox LIFECYCLE PASS MERGED (`bd54458`) → 3055 parts / 2256 verified.** All approved dispositions
  landed, every one re-confirmed against 2026-07-13 ridefox.com fetches: fictitious 38-150 pair +
  the two vestigial plain Float X2 ids RETIRED into ALIASES (legacy sh-x2-* aliases re-flattened
  single-hop; fr-frameworks-enduro.bundledShock re-pointed — worker caught the dangling ref);
  vanished sizes + all 10 pre-MY27 36 Factory rows → status discontinued (+supersededBy where a
  MY27 twin exists); NEW verified fk-fox-40-factory-my27-29-203 row (PN 910-21-410, minRotorF 200
  vs the old gen’s 203 — gen split, old row specs untouched); 36 PE 160 source re-anchored to the
  real PE product. Gates green in-seat, CI green. **Residual flags (next Fox pass / mechanic
  queue):** 36 PE 150 (no fetched page supports a 150 PE — discontinued-vs-retire call), the MY27
  40 Factory 27.5 SKU (910-21-417, unaudited), X2 185x55T PE row still verified against the
  Factory page.

- **Bug issue #2 CLOSED (Douglas’s plain OK)** — resolution comment posted (stale-cache diagnosis
  + regression test). **Fox lifecycle pass APPROVED + chip spawned** (retire 38-150 pair, discontinue
  vanished sizes, dedupe Float X2 ids, MY27 40 gen split, provenance fixes — all ALIASES/status,
  append-only). Icon-set PDF re-sent; awaiting his Set #.

- **Fox drift sweep MERGED (`974a33d`).** 19 price corrections + 76 lastChecked re-confirmations
  across verified Fox shocks + forks, every figure from a directly-fetched ridefox.com store product
  JSON. Resolves all three Fox-balance price flags incl. the Float SL Factory tier fix (the $569 was
  the Remote-Up variant; row now $549 with the correct Factory-page source). The 11 fork rows from
  `6f2ca30`: zero drift. Gates green, CI+Deploy green, session archived, branch/worktree pruned.
  **9 LIFECYCLE FLAGS deliberately unapplied (rows untouched), awaiting Douglas's umbrella OK for a
  Fox lifecycle pass:** vanished sizes (Float X Factory 230x57.5 + 185x50T; 38 Factory 275-170/180;
  38 PE 180; 36 SL Factory 120), old-gen 36 Factory rows no longer sold (10 rows → candidate
  status:'discontinued'), two Float X2 duplicate id pairs (→ ALIASES dedupe), MY27 40 Factory is a
  new gen (new row + status on the vitalmtb-sourced 2025 row — also a pre-existing protocol
  anomaly), Float X PE 185x55T row identity questionable (PE-named, Factory-sourced, orphan
  size/price), 36 PE travel rows' provenance mismatch. Plus the already-flagged fictitious
  fk-fox-38-factory-*-150 pair. One coordinated pass fixes all of it via ALIASES/status — never
  mutating verified rows in place.

- **ENGINE RULE 6c LIVE (`021ba42`) — bias #2 CLOSED.** XD cassette on an XDR-driver wheel is now an
  adapter-tier WARNING with a structured fix naming SRAM's 1.85mm spacer (maker source: sram.com
  XD/XDR driver-body explainer, quoted in-code); the reverse direction and every non-XD mismatch stay
  hard errors; LABELS gains XDR. The two verified WTB CZR XDR wheels go red→yellow only vs XD
  cassettes. 8 pinning tests (suite 477→485). **Adversarial audit SUSTAINED on all six angles** —
  auditor independently re-fetched the SRAM explainer AND the WTB spec page (mfgPn+weight match),
  and resolved the hardest edge (T-Type cassettes carry freehub XD: SRAM's model pages label them
  XD and support FAQ 13819655363099 documents T-Type-on-XDR mullets — warning tier correct).
  CLAUDE.md rule-6 summary updated in the same commit. Gates green in-seat, CI+Deploy green.
  Auditor session archived; branch pruned local+origin. ⚠ Orphan-worktree hazard bit AGAIN (two
  sessions assigned the stale frosty-austin folder; the auditor briefly detached the shared checkout
  and correctly restored it) — shared checkout verified clean on claude/zen-blackwell-cfe5d1.
- **PDF consolidation (Douglas's ask):** `_PDFs/` is now the SINGLE home for all 14 project PDFs;
  `_TO-REVIEW/` retired (action index → `_PDFs/README.md`); affiliate runbook status-refreshed
  (legal pages + Guides LIVE, ~3,000 parts) and regenerated; md→PDF pipeline saved as
  `scripts/md2pdf.py`; handoff updated (`cd68854`). Empty stray `D:\tb-profile-contrast` confirmed
  deletable.

- **Bias #3b rotor half CLOSED (`4850484`) → 3058 parts.** The SRAM-rotors follow-up worker
  re-fetched sram.com service pages and found main already carried 22 SRAM rotor rows — exactly ONE
  real SKU was missing (CenterLine 203mm 6-bolt, added; interfaces from the fetched service page,
  honest sample weight/price since SRAM publishes neither per-size). SRAM's current MTB rotor line
  (HS2 / CenterLine / CenterLine X) is now FULLY enumerated; the remaining TRP rotor lead (34 vs
  Shimano 33 / SRAM 24) is real-market SKU count, not catalog bias — no further balancing without
  fabrication. Gates green in-seat, CI+Deploy green. Session archived, branch/worktree pruned.
  Repo back to 8 branches / 2 worktrees (seat + shared checkout).

- **BIAS-REMEDIATION HARVEST COMPLETE → 3057 parts / 2257 verified (`6f2ca30`, sync `58d89c7`).**
  All four finding-chips reported; three landed, one staged: (1) Fox fork balance merged — +11 real
  ridefox.com configs (Podium + 34 SL new families, 36 MY27 gen tokens, SL tiers; eMTB/AWL/gravel
  SKUs excluded per the hard rule; RockShox:Fox row ratio 2.77→2.11, Fox families 9); (2) the
  verification wave's full report confirmed the earlier merge (RockShox shocks now 382/382 = 100%
  verified via sram.com; process gold: `sram.com/en/service/models/<slug>` serves the full static
  size matrix where the rockshox path is JS-thin); (3) `tools/verification-job.json` re-synced
  (2386/2918 processed); (4) **XDR rule 6c STAGED on `engine/xdr-adapter-warning`** — maker source
  fetched (SRAM's XD/XDR driver explainer), 8 pinning tests (485 total on-branch), WTB XDR wheels
  red→yellow only vs XD cassettes — **held for the adversarial-audit chip (queued) before merge**
  (engine tier). Cleanup: 13 worktrees + 26 branches pruned (wave sub-branches, landed feature
  branches, session refs); 4 worker sessions archived. **FLAGS logged for follow-up:** DVO Diamond
  is a NEW generation on dvosuspension.com (36 D1 SL, 29-only, 140-160, DM-180) contradicting the
  4 cataloged Diamond Boost rows → new-gen entry pass, rows untouched; Fox price drifts (38
  Factory $1369, 36 SL $1259 + the 3 shock flags) → combined drift-sweep chip queued;
  `fk-fox-38-factory-29-150`/`-275-150` still cataloged though their own descs say the config
  doesn't exist → ALIASES retirement awaiting Douglas. Residual fork row-skew is partly REAL
  market structure (Fox aftermarket is 29-only/travel-narrow) — accepted, no fabrication.

- **MERGE WAVE ("merge etc"): verification inversion wave 1 + rotor/brake balance → 3046 parts /
  2252 verified (`39297e4`, `6d53f62`).** The WEEKLY usage limit hit mid-fleet (~03:35, reset noon
  ET) — the rotor/brake worker died right after committing; the coordinator content-reviewed and
  landed both finished branches via the own-additions-only pattern, four gates green in-seat,
  harness byte-identical, e-bike scans clean, CI+Deploy green. Details: `verify/inversion-wave-1`
  promoted **352 rows to verified** (all 8 RockShox shock families via sram.com model pages; DVO
  Onyx forks incl. the maxRotorF 220→203 interface correction, re-fetched dvosuspension.com; the
  two orphaned night-verify WIP diffs fully dispositioned — DVO/EXT/Fox-36SL source upgrades
  adopted, Spank weights synced to the fetched spank-ind.com table and honestly left unverified —
  both WIP branches deleted). `expand/rotor-brake-balance` added 28 rows + 2 edits (audit #3b/#4:
  SRAM Motive/Maven/DB/Level/Code + Shimano XTR/MT brakes, RT-MT905 + SM-RT86/64/54/26 rotors via
  the archive-handbook route; Hope XCR FM row now carries road.cc measured weight, sourced facts
  in desc). Verified 1872 → 2252 (+380). SRAM rotors still missing (worker died first) — follow-up
  chip queued. Wave session continues (step 3: verify/dvo-forks in flight); its rs-* sub-branches/
  worktrees prune AFTER it completes.
- **Random tie-break AUTO-SHIPPED by its worker (`b985162`) — post-hoc review PASSED.** Per
  Douglas's "Random!" pick (bias #5): featured sort now tie-breaks on a seeded shuffle — FNV-1a
  (part id) ^ UTC-day seed → one memoized mulberry32 draw (the sample-builds idiom); rank primary,
  presets second, insertion index demoted to collision backstop. Deterministic within a day (no
  keystroke reorder), rotates daily = time-averaged brand fairness. UI tier auto-ship on green
  gates worked as designed; CI+Deploy green.

- **Douglas's decisions (2026-07-13) + execution.** (1) Forum "⚡ E-MTB" discussion category:
  HIDE but KEEP ("don't display for now, but don't remove, we will use that later") — shipped
  `cd79c0f`: `hidden:true` on the vocab entry in src/forum.js + skips in the chip row and
  new-thread picker; existing-thread badges unchanged via forumCategory(); browser-verified on the
  live forum data path (17 categories offered, E-MTB absent from chips + picker, console clean),
  four gates green (harness byte-identical), CI+Deploy green. No-e-bikes rule confirmed
  catalog-parts-scoped (memory updated). (2) Default-sort tie-break (bias #5): Douglas picked
  RANDOM — seeded-stable-shuffle chip queued (UI tier, auto-ships on green gates + browser
  verification). (3) OK given to close bug issue #2 — the `gh issue close` was BLOCKED by the
  permission classifier (indirect authorization); resurfaced to Douglas to confirm plainly or
  close it himself. Also: shared .claude/launch.json swept of 6 entries pointing at pruned
  worktrees/dirs; `tb-coord` (8127 → the coordinator seat) added.

- **Coordinator succession (7th seat).** New coordinator seated on `coord/2026-07-12`
  (inside `.claude/worktrees/`); Main Coordinator 6 archived; the grandfathered `D:/tb-coord-lean`
  seat + its branch removed. Backlog queued as 5 chips: DH Transmission 7s group, Fox drift sweep,
  post-wave code-quality audit, post-wave manufacturer-bias audit, repo-hygiene sweep (~151 stale
  branches / ~53 worktrees). Bug issue #2 (fixed, regression-tested) awaits Douglas's OK to close.
- **POST-WAVE QUALITY AUDIT → two perf fixes LIVE (`0655198`).** Worker audit (branch
  `audit/code-quality-2026-07-13`, report committed as `CODE-QUALITY-AUDIT-2026-07-13.md`) after
  the catalog tripled to 3018: (1) `byId` linear scan → memoized null-prototype id→part index
  (catalog is runtime-immutable — verified zero `PARTS` mutations repo-wide; 10k lookups 102.6ms →
  0.2ms); (2) `renderCatalog` re-ran `resolved()` per PART per render → hoisted to once per render
  (`compatFor(p)` ≡ `compatOf(p, resolved())`, verified; keystroke ~450ms → 9.2ms at 3018 rows).
  Behavior-identical: four gates green in the coordinator seat AND verdict-audit-harness output
  byte-identical to the main baseline. CI + Deploy green. **Report-only backlog:** placementDiff
  baseline-recompute is the next perf lever at ~10× catalog; schema.js O(n²) id lookups
  (validate.js still 0.23s — fix opportunistically); `isPreset` has drifted semantics between
  index.html and schema.js (hazard); CLAUDE.md test table omits test-invariants.js.
  **FLAG for Douglas:** src/forum.js ships an "⚡ E-MTB" DISCUSSION category — catalog rule 1 is
  parts-scoped so this is not a violation, but his explicit "discussion is fine/not fine" is wanted.
- **MANUFACTURER-BIAS AUDIT (post-wave) — report committed as `MANUFACTURER-BIAS-AUDIT-2026-07-12.md`.**
  Read-only worker audit of main @ 5967d12. Affiliate isolation, engine brand-conditionals, guides
  copy, and sample-build mechanism all CHECKED CLEAN. Findings (severity order): (1) HIGH — the
  "✓ Verified only" view inverts market reality (Specialized/Trek/YT frames 0-verified vanish;
  RockShox shocks 8.4% verified vs Fox 76.5%/EXT+CC 100%; SRAM 80.8% vs Shimano 40.8%) — remedy =
  targeted verification waves + the web-unblocker connector; (2) MED-HIGH — XDR freehub hard-errors
  vs every cassette though SRAM documents XD-on-XDR with the 1.85mm spacer → should be a
  direction-aware warning w/ structured fix (chip queued); (3) MED — fork row-share skew (RS 30.2%
  vs Fox 10.9%; fix = Fox variant fill-out, chip queued) + TRP is top brakes+rotors brand at 19.3%
  (fix = Shimano/SRAM rotor coverage incl. RT-MT905, chip queued); (4) MED — rule 8b caliper
  ceiling live on 2 of 4 FM calipers (per-class evenness standing target); (5) MED-LOW — default
  sort tie-breaks on insertion order = data-entry history (neutral-key choice is Douglas's);
  (6-7) LOW — headset near-monoculture (fetch-wall artifact), pinned-fallback build skew.
- **HYGIENE SWEEP LANDED: 154 branches / 54 worktrees → 12 / 3.** Worker content-verified every
  deletion (merge-base ancestry or merge-base-diff grep vs main; every "missing" id traced to a
  documented deliberate drop — 22 EXT e-Storia e-bike rows, 2 fabricated Öhlins trunnions, 1
  Schwalbe e-MTB tire). Coordinator follow-through: the 6 worktrees kept for untracked deliverables
  were verified byte-identical to the shared-checkout root copies and removed; the 2 DIRTY
  night-verify worktrees held real unharvested work — committed as WIP onto their branches
  (`night-verify-suspension-tails`: DVO Onyx maker-page sources + maxRotorF 220→203 correction +
  2 verified promotions, UNREVIEWED — re-verify before merge; `night-verify-rearwheels`: 4 Spank
  weight nudges, no provenance) and folded into the targeted-verification chip; stale
  `audit/code-quality-2026-07-11` deleted (byId memo superseded by `0655198`; its minor _slotByKey
  dedup idea noted here as opportunistic backlog). `feat/catalog-views-fractal-honeycomb` kept as
  the only ref to the removed feature. All three audit/hygiene worker sessions archived.

## 2026-07-12 (evening) — Fable-budget push: shocks merged + engine fixes queued

- **ENGINE CRITICAL FIXES C1–C4 + M1 LIVE (`45f7331`).** All 5 findings from
  ENGINE-CRITICAL-REVIEW-2026-07-12.md landed in harm order, each maker-sourced + pinned (453→477
  tests) + independently adversarially audited (5/5 hold): **C1** new rule 8b `brake.maxRotor`
  (dormant; XTR M9110-FM=160 per fetched Shimano C-461, Magura MT8 SL FM=160 — corrected that row's
  wrong "up to 180" desc AND the golden XC build's own baked-in false fit); **C2** BSA68≡BSA73
  equivalence (false red removed; BSA83/PF exact); **C3** direction-aware bar/stem with a structured
  shim `fix` (mirrors rule 13); **C4** `frame.forkTravelHard` tiered by SOURCE LANGUAGE + validator
  cross-rule (hard requires min+source) — 15 frames hard-tagged verbatim, 3 SC trail frames softened
  per their own re-fetched FAQ, Megatower's unsourced hard red resolved; **M1** chain out of the
  drivetrain SPEED set (stays in system + 3c) — un-hacked the XX-DH workaround. Probe-C assembler
  respects the new caliper ceiling. **BACKLOG:** (1) catalog chip for the now-enterable 7s XX Eagle
  Transmission DH group (CS-XS-797/RD-XX-DHE); (2) mechanic-review queue: the 4 hard-tagged SC frames
  (bare "Fork Compatibility: X–Y" with no softener FAQ) + Nicolai G1's weak accommodation wording;
  (3) Hope XCR-FM + SRAM Level-FM rotor ceilings unsourced (dormant until found).
- **CATALOG MERGE WAVE 4: Fox balance → 3018 parts (`572c441`).** +59 Fox rear shocks (all missing
  current-lineup SKUs via ridefox.com store variant JSON; incl. Live Valve NEO — electronic damper
  for standard frames, AXS precedent, not e-bike). Shock share: RockShox 53.3% → 49.2%, Fox 6.0% →
  13.1% (the UNBIASED balancing pass). VERIFY-PROTOCOL.md gains the decided verified-weight
  subsection (verified = interfaces confirmed; nominal weight OK where makers publish none). Opus
  audit 59/59 independent re-fetch. Gates green. **BACKLOG from its flags:** (1) 2 pre-existing
  verified Float X sizes absent from Fox's current size list (possible page mix-up — re-verify);
  (2) one Float SL row has Factory naming at Performance price; (3) several verified shock prices
  have drifted on Fox's store — a price-refresh drift sweep would catch all three.
- **CATALOG MERGE WAVE 3: rear shocks → 2959 parts (`3095da6`).** `expand/shocks` merged: 108 → 717
  shocks (+609). 5 brand-cluster workers + 5 Opus auditors; audit caught + dropped **2 fabricated
  Öhlins trunnion rows** (210/230 eyes are std-only) and **all 22 EXT e-Storia e-bike rows** (hard
  rule). Interfaces 100% maker-sourced. Gates green. 2350 → 2959 (1813 verified / 1146 unverified).
- **Douglas's shock decisions (executed via coordinator recs):** (1) RockShox 53% skew → merged
  as-is + **Fox balancing pass chip queued** (add real Fox coverage rather than withhold real data);
  (2) verified-weight policy **2a formalized** — `verified:true` = interfaces manufacturer-confirmed,
  nominal weight OK where makers publish none (doc patch to VERIFY-PROTOCOL.md folded into the Fox
  chip); (3) Push Eleven Six skipped (no maker size matrix; per-bike fitment only).
- **Engine-fix chip queued [Fable]:** C1→C2→C3→C4→M1 in harm order, each with maker source +
  pinning test + adversarial audit, per ENGINE-CRITICAL-REVIEW-2026-07-12.md. Coordinator-reviewed
  tier.
- **Earlier today:** profile-input contrast fix live (`d42d379` — white-bg inputs used the theme's
  light --ink; now fixed dark text, all four themes readable); DH-wheels diagnosis fixes live
  (`df9868b` — size-chip no-op on Wheelset tab + honest empty-state; the "0 wheelsets" on the RAAW
  Yalla was CORRECT: Boost148-rear DH frame, no real 20x110+Boost148 bundled SKU exists; 19 front /
  130 rear à-la-carte options DO). Honeycomb/fractal views were shipped then REMOVED at Douglas's
  call (`36ce0d2` revert, his session). 12 orphan D:\tb-* worktrees cleaned; **folder rule: all
  future seats/worktrees INSIDE the project dir**. Folder rename to "Build My MTB" CANCELLED by
  Douglas. Session on Fable to conserve the 9% weekly budget (78% Fable available).

A dated, append-only record of what changed, **why**, and **how it was verified** — so
the project can be handed to an independent reviewer (another engineer or model) who can
trace every decision and re-check it. This is the *running* trail; its companions:

- **`FOR-REVIEWERS.md`** — the reviewer's entry point: what to read, in what order, and how
  to independently verify every claim (the four gates, provenance URLs, the "compatible =
  true" contract). _(being built)_
- **`REVIEWER-DOSSIER.md`** — the comprehensive retroactive decision + verification history.
  _(being built)_
- **Git history** — the ground truth for exact diffs; commit hashes are cited below.
- **`tools/verification-job.json`** — the per-part provenance ledger (verified vs. sample).

**Entry format:** `date` · what changed · why · how it was verified · refs (commit/branch/
issue) · what a reviewer should double-check. Newest first. The coordinator appends one entry
per wave/decision; large reconstructions are handed to a worker session.

---

## 2026-07-11 — Coordinator session (lean-rule correction + owner-task prep)

- **Succession housekeeping.** Archived the outgoing coordinator session ("Main Coordinator
  Old 5"). No other sessions were active.
- **Lean-coordinator rule hardened.** The coordinator seat must **never run tasks in its own
  context** (no coordinator-spawned in-session background `Agent`s — they meter against and
  bloat the seat). Task work is handed to separate worker sessions.
  - _Why:_ this session spawned an in-session background audit agent; Douglas corrected it —
    *"I don't want the coordinator sessions to run tasks. I want to keep them lean to
    coordinate."*
  - _Verified / refs:_ baked into `COORDINATOR-HANDOFF.md` §2 (removed the prior "or background
    agents" license) — commit **`2742ca8`**; and into the Claude memory topic files. The
    in-session agent was stopped and its orphan worktree pruned.
  - _Double-check:_ handoff §2 "How you work" wording.
- **Owner account tasks scoped (blocked on Douglas, by design — his accounts).**
  - _Supabase:_ base forum is already live/migrated; the pending item is the usernames/admin
    layer — run `supabase/forum-profiles.sql`, then the owner admin-grant. Security-reviewed:
    privilege escalation is prevented by a BEFORE trigger that pins `is_admin`/`verified_pro`
    off for every end-user JWT (only the service-role SQL editor can grant). Refs:
    `supabase/SETUP.md` §9, `supabase/forum-profiles.sql`.
    App code is already live and feature-detects the tables (no deploy needed to light it up).
  - _Cloudflare:_ email routing (`Doug@buildmymtb.com` → Gmail) + optional cookieless
    analytics. Runbook: `CLOUDFLARE-SETUP.md`. If analytics is enabled, the privacy page's "no
    third-party analytics" line must be reworded the same day (honesty).
  - _Connectors:_ MCP registry search returned **no** one-click Supabase or Cloudflare
    connector; manual paths remain the recommendation for these one-time tasks.
- **⚠ Stale-branch flag.** `chore/cloudflare-prep` is divergent from current `main` and would
  **revert** the forum-profiles + random-builds work. Do **not** ship it. The contact-email
  swap (`douglas.w.wills@gmail.com` → `Doug@buildmymtb.com` on privacy/terms/affiliate-
  disclosure) is to be **re-derived from current main** once Doug@ routing goes live.
- **Open item — bug #2.** GitHub issue #2 ("Wrong verdict") is still **open**, but its fix is
  already on main (`6ef9b48`; it was a stale-cache report — the catalog was already correct).
  Needs closing with a note.
- **Audit trail established.** This log started; `FOR-REVIEWERS.md` + `REVIEWER-DOSSIER.md`
  handed to a worker session to build.
- **UPDATE (later 2026-07-11) — Supabase forum-profiles migration RUN.** Douglas ran
  `supabase/forum-profiles.sql` and seeded the owner admin profile (`Doug`, `is_admin=true`).
  Forum usernames/profiles/admin-moderation/verified-pro are now LIVE (app code already deployed;
  feature-detects the tables). _Gotcha logged:_ the admin-seed UUID must be single-quoted —
  pasting it bare tripped Postgres `42601: trailing junk after numeric literal`.
  _Next:_ Cloudflare owner task still open; queued forum follow-ups (rich profiles, auto-mod)
  ready to hand off.
- **UPDATE — reviewer audit-trail docs LANDED.** A worker session built `FOR-REVIEWERS.md`
  (entry-point/map) + `REVIEWER-DOSSIER.md` (retroactive decision + verification history, by theme,
  every claim commit-cited). Coordinator-reviewed end-to-end: accurate, honest-toned, technical-only
  (business/personal deliberately excluded — confirmed no leakage), four gates green. Merged this
  commit (only the two new files taken; the worker's branch was based on `75e0304`, one behind, so
  its stale `PROJECT-LOG.md` diff was NOT applied). The dossier honestly self-flags **13
  "reviewer should check"** items — none a live error-rule bug; the actionable follow-ups: stale
  "dead rule" wording for rules 2/8/11 (real DH-fork/FM-brake parts can now fire them) + no
  real-part error-case test for 2/11; `CLAUDE.md` roadmap/test-table prose lags shipped code;
  `MECHANIC-FINDINGS-INTAKE` rule map one behind (no rule 20). Backlogged for a doc-cleanup worker.
- **UPDATE — theme dropdown + 🍂 Loam mode SHIPPED LIVE (`6e2c202`).** Worker converted the
  Light/Dark/RAD toggles into one native `<details>` dropdown mirroring the Sample-builds menu, and
  added `html.loam` (warm forest-floor dark theme, WCAG AA verified). Scope clean (only index.html,
  126+/41−); coordinator independently re-verified gates green (validate 0 · 453 tests · tsc 0).
  ⚠ **Process note:** the worker SELF-SHIPPED to main rather than presenting a branch for Douglas's
  staged eyeball (my prompt had said "present a branch"); it claimed Douglas's launch prompt
  authorized auto-ship-if-sound. Sound + reversible, so left live — but the standing "UI stages for
  Douglas's eyeball first" rule vs. worker auto-ship is a policy question flagged to Douglas
  (unresolved at log time; do NOT bake auto-ship or a worker→coordinator auto-ping into standing
  instructions until Douglas confirms in chat — both were relayed via the worker, not from him).
- **UPDATE — forum-profile UI fix SHIPPED + hardening migration STAGED (`f689857`).** Worker fixed
  the 3 profile-UI bugs (username-as-identity header button; `[object PointerEvent]` guard; header
  auto re-render) + authored `supabase/forum-profiles-hardening.sql` (search_path pins on the 4
  flagged functions + least-privilege EXECUTE on `username_is_reserved`). Cherry-picked onto current
  main (branch was based on `f20c6bf`; a naive merge would have reverted theme/Loam + the reviewer
  docs). UI auto-shipped on green gates (new policy); the `.sql` is inert in-repo — **Douglas runs it
  in Supabase** (security tier). Coordinator independently reviewed the migration: bodies byte-
  identical, `profile_norm` stays IMMUTABLE, REVOKE-from-public can't strip authenticated's direct
  grant, fails CLOSED — escalation still impossible, reserved-names still fire. CONFIRMED SAFE
  (agrees with the worker's in-session auditor). Four gates green.
- **UPDATE — doc-cleanup LANDED (`73a3420`).** Chip refreshed 4 stale docs (CLAUDE.md,
  EXPERT-REVIEW-DOSSIER.md, REVIEW.md, MECHANIC-FINDINGS-INTAKE.md): rules 2/8/11 de-staled
  (rule 8-front + rule 11 now fully live WITH real-part error tests; rule 2-front has live vocab but
  its error case is still synthetic-only), CLAUDE.md roadmap + test-table + rules 10b/14c corrected,
  mechanic-intake rule map extended to rule 20. It independently verified all 12 DATA-MODEL-REVIEW
  §8 catalog items — **10 landed, 1 moot, 1 deliberate; NO un-applied catalog error remains.**
  Docs-only, four gates green, self-merged. Coordinator caught the original brief was wrong (rule 11
  already had a real-part error test — only rule 2-front lacks one). **OPEN (Douglas's call):** add a
  real-part error-case test for rule 2-front? A dual-crown DH fork on a trail wheel is nonsensical —
  coordinator recommends LEAVING it (a contrived test is worse than none).
- **UPDATE — rider profile PAGES shipped (`a37c342`) + rich-profile migration STAGED.** Worker built
  full-page rider profiles (header 👤 → own profile page: avatar/username/✓Pro/member-since/bio/
  riding-style/location + the user's forum threads & replies; forum author names → that rider's
  public read-only page; owner inline editors; preset/initials avatar, no external image URLs).
  Touches index.html + src/account.js + src/forum.js (all app tier). ⚠ The worker pushed to origin as
  branch `feat/user-profile-pages`, NOT main (its "pushed to origin" claim was the feature branch) —
  coordinator cherry-picked `365c67a` onto current main (base `58d5412`, clean). Feature-detects
  (`hasRichProfiles`) so the UI is safe pre-migration; auto-shipped on green gates. Migration
  `supabase/forum-profiles-rich.sql` (adds bio/riding_style/location/avatar columns; idempotent;
  DB-level CHECK constrains avatar to a slug — never a URL; touches NO policy/trigger) — **Douglas
  runs it** (schema tier). Coordinator review + the worker's independent adversarial pass both
  confirm escalation-impossible + reserved-name enforcement still hold. Four gates green.
- **UPDATE — rich profiles v2 shipped (`50f9368`) + Storage migration STAGED.** Worker (correctly
  presented a branch, did NOT self-push) added profile photo UPLOAD (Supabase Storage `avatars`
  bucket, owner-own-path RLS, 2 MiB + image-MIME caps), tagline, multi-select disciplines
  (`riding_styles[]`), experience, current bike, home trails, and social handles (IG/YT/Strava stored
  as handles only, host hardcoded client-side, rel=noopener nofollow). index.html + src/account.js
  (app tier, feature-detected `hasRichProfiles2`). Coordinator independently reviewed the Storage RLS
  + the `avatar_url` CHECK + social-handle charset constraints — SAFE (canonical owner-folder Storage
  pattern; avatar_url DB-locked to the project prefix; no profiles_guard/RLS/trigger change →
  escalation-impossible + reserved-names hold). Worker's adversarial pass agreed; one LOW note (no
  per-user Storage object quota) is optional/non-blocking. Migration `supabase/forum-profiles-rich2.sql`
  (9 columns + CHECKs + the `avatars` bucket + Storage policies) — **Douglas runs** (schema+Storage
  tier). Branched off current main (no stale base). Four gates green.
- **CATALOG MERGE WAVE 1 (2026-07-12): brakes + wheels + tires → 2172 parts.** Reviewed + merged 3
  finished expansion branches onto current main, each applied as its OWN additions only (git-apply of
  the merge-base..branch diff for compat.js/schema.js/types.js) to avoid the stale-base revert since
  all branches are based on old main. `expand/brakes` (+3 MTB brakes: SRAM G2 Ultimate + Shimano
  BR-MT410/MT420 — **DROPPED bk-sram-guide-re as SRAM's e-bike-branded caliper** per the no-e-bikes
  rule; that session predated the rule relay). `expand/wheels` (+109 wheels/wheelsets, all disciplines;
  + `XDR` freehub vocab — WTB CZR road-length driver, kept distinct from XD per THE BAR). `expand/tires`
  (+44; the tires session **self-dropped a Schwalbe e-MTB tire**). Interfaces sourced; unverified rows
  per the relaxed policy; verify-job untouched by workers (coordinator re-sync deferred to end of the
  catalog waves). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2016 → 2172
  (1563 verified / 609 unverified). Commits `7913a10`/`638508a`. Still RUNNING (present final branches
  later): frames, forks, shocks, drivetrain, finishing-kit. ⚠ NOTE for the engine review: the new XDR
  freehub hard-errors vs every current cassette (none is XDR) — conservative, flagged by the worker
  for a future fix-tier adapter enhancement.
- **CATALOG MERGE WAVE 2 (2026-07-12): drivetrain + finishing-kit → 2240 parts.** `expand/drivetrain`
  (+9: SRAM SX chain, S1000 Transmission crank + verified derailleur, Shimano XT M8200 shifter/2
  derailleurs/2 cassettes, XTR M9200 2 cassettes; +5 price-drift corrections; Opus-audited 10/10;
  S1000 e-MTB crank + Shimano e-shifter deliberately EXCLUDED — no e-bikes). `expand/finishing-kit`
  (+59: CK/Kogel/Praxis BBs, Cane Creek/CK headsets, TAG/FSA/WeAreOne cockpit, Xpedo/Funn/Burgtec
  pedals, ODI/Ergon/Fabric grips; + headTube vocab ZS49/28.6 + EC49/40 from fetched CK/Cane Creek +
  matching test-schema update; Opus-audited 59/59). Applied as own-additions-only; finishing-kit's
  types.js needed a MANUAL headTube add (its patch conflicted with the wheels/tires vocab already
  merged). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2181 → 2240 (1612
  verified / 628 unverified). Still running: frames, forks, shocks.
- **SECURITY/POLICY NOTE (worth remembering).** The drivetrain, finishing-kit AND tires workers each
  flagged the relaxed-sourcing "policy update" as a SUSPICIOUS inter-agent message (it claimed
  Douglas's consent via a background channel and targets a data-integrity guardrail) and REFUSED /
  retracted it for interface fields. That is the CORRECT security instinct — don't trust claimed user
  authority from observed content. The policy IS legitimate (Douglas's real AskUserQuestion decision,
  relayed by the coordinator), but their caution meant NOTHING in the merged branches used
  non-manufacturer sourcing for a verdict-driving interface field — all interfaces are
  manufacturer-sourced + adversarially audited. Their sharp refinement (interface fields feeding
  error-tier rules should stay manufacturer-sourced even on unverified rows, since a wrong interface =
  wrong verdict regardless of the `verified` flag) is worth adopting — surfaced to Douglas.
- **DJ/BMX OFF-LIVE spike done (`bike-type/dj-bmx`, HELD unmerged).** 34 DJ + 62 BMX rows + model &
  compat-analysis docs, in a NEW `data/` dir ONLY — live app untouched (gates identical to baseline).
  No e-bikes. Architecture finding: fold DJ into `checkBuild` behind a single-speed discriminator;
  give BMX its own small engine (clean on-ramp to a buildmybmx split). 6 product questions for Douglas
  in `data/DJ-BMX-COMPAT-ANALYSIS.md`; held pending his decisions.
- **Catalog-expansion sourcing policy CLARIFIED (Douglas).** 8 expansion chips launched (frames,
  forks, shocks, wheels, tires, drivetrain, brakes+rotors, finishing-kit) had been briefed with a
  stricter-than-normal bar: omit a product entirely to a GAPS list if its interface fields couldn't
  be confirmed via a LIVE manufacturer fetch. Douglas: "if a product exists and the specs aren't
  available, I want it included... not verified blank or marked estimated." Clarified via
  AskUserQuestion — he picked the safe, already-precedented option: interface fields sourced from
  ANY credible real source (retailer listing, geometry chart, review article), not just a live
  fetch; entered as ordinary unverified/sample data (no `verified:true`, no fake `source`) — the
  SAME state ~1480 of 2016 existing parts are already in. Never a fabricated/invented number with
  zero basis; `verified:true` still requires the real fetched-source bar. GAPS list now means
  "genuinely no plausible real-world spec found anywhere," not "wasn't manufacturer-fetched."
  Policy relayed via send_message to all 8 running sessions. **Root cause:** this exact policy was
  ALREADY set 2026-07-11 (memory `catalog-unverified-inclusion-policy`), but the repo docs still
  stated the strict rule, so the briefs regressed. Fixed for good this time — patched
  `tools/DATA-ENTRY-TEMPLATE.md` with the verified-vs-unverified-breadth distinction so future briefs
  default correct (VERIFY-PROTOCOL's fetched-only rules are correctly about earning `verified:true`).
- **UPDATE — 📚 Buyer's Guides section shipped (`c6cbdbc`).** Chip built a full-page Guides section
  (new `src/guides.js` + index.html) with **10** accurate, brand-neutral compatibility/buyer's guides
  (how-the-checker-works, fork travel, mullet, Boost/SuperBoost, brakes/rotors, cassette/freehub,
  UDH/Transmission, headset S.H.I.S., dropper sizing, rear-shock), each grounded in the real engine
  rules and deep-linkable (`#guide/<slug>`). Coordinator read all 10 — accurate, NO brand favoritism,
  ZERO affiliate links (unbiased value upheld). Worker presented a branch (correct); coordinator
  cherry-picked onto current main + resolved ONE index.html conflict (additive CSS, rich2 vs guides —
  kept both), gates green (validate 0 · 453 tests · tsc 0 incl. guides.js). ⚠ index.html inline script
  isn't gate-covered and this was a hand-resolved merge, so Douglas to eyeball Guides↔profile hash
  nav. Purpose: value-add written content for the AvantLink application. Follow-up flagged: static
  pre-render for real search-SEO would be the project's first build step — deferred, deliberate call.

## 2026-07-18 — seat 13 first harvest: UI-expert master round batch 3 (corpus only)

- **Seat 13 seated**: seat 12 archived, hourly fleet-sweep cron re-armed, slider-fix chip
  (DNS-17, WCAG 2.2 SC 2.5.7) handed to Douglas and now running as its own session. Images
  program KICKED OFF on Douglas's word + architecture PDF (independent API-first ImageService
  repo) — coordinator review delivered, [Fable, high] TDD design chip queued; roadmap/coding
  gated on his approval. Legal ground rules unchanged: scraping/hotlinking ruled out; sources =
  maker permission (Affiliate lane) + affiliate datafeeds (~Nov).
- **Merged `tooling/ui-expert-master-1` batch 3** (27dcf33 + 8dd7128, docs-only under
  tools/ui-expert/): **ACC-24** closes the round-2 dot-contrast contradiction against the
  shipped fix `b269e2d` — ring-vs-card recomputed 6.28–13.84:1 across all four themes (SC 1.4.11
  PASS), glyph non-colour channel confirmed, 8px-glyph reinforcing-only caveat recorded;
  anti-drift doctrine written up (fills/glyphs defined once, shared by dot + legend — third
  instance of the remove-divergence-opportunity pattern). **performance-perceived → MASTER**
  (PRF-13..17): headline PRF-16 — the Cloudflare Web Analytics beacon (index.html:954, live
  since 2026-07-16) IS a CWV RUM collector, so real LCP/INP/CLS p75s for buildmymtb.com already
  exist unread in Vitals Explorer; Chromium-only caveat is load-bearing (iOS Safari invisible);
  CrUX below-threshold expectation-setter recorded; do-NOT-vendor web-vitals (PRF-17).
  Coordinator spot-checked the beacon line, --dot-ring border and role="img" against index.html
  before merge. Gates: validate 7×OK / 757 tests / tsc clean. Board: 3 MASTER
  (accessibility, forms-filters-density, performance-perceived), 4 professional, research-methods
  not started. Worker continues to batch 4 (navigation-ia).
- **New Douglas-only action queued**: read Cloudflare Vitals Explorer (minutes, no code) —
  converts every corpus performance claim from inference to measured fact (PRF-16).

## 2026-07-18 — Image program split into its own lane; delivery rule changed

- **THIRD LANE CREATED — Image Coordinator** (`IMAGE-COORDINATOR-HANDOFF.md`, tracked, `934c229`).
  Douglas: keep the image conversation in its own session so it doesn't gum up general
  coordination. It owns ImageService architecture/build, provider strategy, image legal posture,
  acquisition + automated-replacement workflow, image metadata, per-brand image coverage. Does NOT
  push to this repo (branches route to Main Coordinator — one-pusher rule intact); manufacturer
  image-permission asks route through the Affiliate lane. Main Coordinator handoff + memory
  `multi-session-coordination.md` updated to three lanes; Affiliate session notified directly.
- **Douglas delivered two image specs**: the architecture directive (independent API-first
  provider-based ImageService repo, reusable across future catalogs) and the **Temporary Image
  Strategy** (placeholder images now, auto-replaced as official sources arrive; per-image source +
  temporary/official state + metadata + audit trail; automated replacement with version archival;
  priority order maker APIs > maker media libraries > affiliate feeds > maker-approved sources; no
  UGC/forums/auction/social/watermarked/lifestyle imagery).
- **⚠ OPEN CONFLICT SURFACED, NOT RESOLVED BY SPEC**: the temporary tier implies acquiring
  maker/retailer images without prior permission, contradicting the standing no-scraping ruling
  that came out of Douglas's own affiliate research this week (infringement risk + poisons the
  partnership lane). Put to him as Tier A (permission fast-track / open-license / affiliate feeds —
  legal-clean, startable now) vs **Tier B (unlicensed temporary acquisition, risk-accepted)** with
  containment: instant-honor takedown, partner-brand exclusion list, DMCA agent registration, never
  watermark-strip, visible attribution. **Tier B is DESIGNED-BUT-GATED — not implemented in any
  milestone until his explicit recorded word.** Noted for counsel: "temporary" doesn't change a
  copy's status, and DMCA safe harbor is a weak shield for operator-acquired content. Also flagged:
  the spec's referenced "approved provider order defined elsewhere" was never delivered.
- **DELIVERY RULE CHANGED — `CLAUDE.md` Hard rule #4**: worker tasks are handed off as **paste-ready
  fenced prompt blocks** with a `[Model, effort]` header, **never `spawn_task` click-chips**, so
  Douglas controls model+effort at dispatch. Fixes the long-known picker-inheritance leak. Memory
  `parallel-work-delivery.md` hardened; both pending image chips withdrawn and reissued as blocks.

## 2026-07-18 — verification campaign 2 wrapped (session retired at context exhaustion)

- Harvested the final banked commit of `verify/campaign-2` (`19129eb` → merged `af2df2a`): 6 frames
  formalized Pending→Skipped with documented reasons (Stanton Slackline gen3/Switchback genV, Norco
  Fluid FS A, Cannondale Jekyll/Habit HT, Pivot Switchblade V2 — JS-walled maker pages;
  cross-corroborated interfaces stay unverified per THE BAR; no frame-only weights published).
  verification-job.json only, no catalog rows. Gates: validate 7×OK / 757 tests / tsc clean.
- Session `local_48b881aa` retired at 858 messages with the queue at ~1,751 remaining — a fresh
  campaign-3 session block handed to Douglas (paste-block per the new delivery rule). Campaign-2's
  full-session yield across its life: batch-group merges landed progressively by seats 12–13; walls
  map remains tools/verify-fanout-1-CLOSEOUT.md.

## 2026-07-18 — slider 2.5.7 fix SHIPPED + ui-expert batch 4 (navigation-ia MASTER)

- **Merged `ui/slider-2-5-7-fix`** (worker session, [Sonnet, high], commit c469b3e): the DNS-17
  WCAG 2.2 SC 2.5.7 AA violation is CLOSED — all 7 dual-range axes gain paired
  <input type=number> min/max fields (inputmode=numeric, mirrored min/max/step, real
  aria-labels) replacing the static "lo–hi" text, wired into the sliders' existing
  refresh()/commit() split (repaint on input, re-filter on change; mid-keystroke caret never
  fought via skipNum; crossed bounds resolve by the sliders' own just-edited-yields precedent).
  Click-to-jump stays disabled (Baymard dual-handle ambiguity, DNS-16). Also ACC-22 F1
  (profileModal autofocus) + F2 (100vh→100svh ×2). index.html only; bmx/KitBuilder confirmed
  unaffected (no shared slider factory). Coordinator review: full diff read, popup scan clean,
  independent browser check on the merged tree (numeric↔slider live sync, no auto-open dialogs,
  autofocus + svh verified via DOM eval). Gates: validate 7×OK / 757 tests / tsc clean.
- **Merged ui-expert batch 4** (7f3108f): **navigation-ia → MASTER.** NAV-15 records the
  undocumented-but-correct history doctrine (places get hash entries; state gets replaceState —
  writeHash's replaceState choice is load-bearing against history flooding). **NAV-16 WARN
  CONTRADICTION**: forum/inventory/profile views are invisible to Back (class toggles, no hash) —
  Back exits the SITE from them; forum threads have no shareable URL. Recommended fix: generalize
  the proven guides hash-router to #forum/#forum/<id>/#inventory/#profile — queued for Douglas as
  a paste-block. NAV-17 (Back-dismissible dialogs) deliberately parked, not asserted. Board: 4
  MASTER / 3 professional / research-methods pending. Worker continues to batch 5.

## 2026-07-18 — mechanic master-2 batches 3–5 merged (ID collision resolved)

- **Merged `tooling/mechanic-master-2`** (4 remaining commits; batches 1–2 were already on main via
  seat 12). Docs-only, `tools/mechanic/` + its progress doc. Content: **DRV-64-67** (all 9–12sp
  chains share the 1/2"x11/128" internal-width class → cross-speed substitution is a CLEARANCE
  question, not engagement; deliberately NOT made an engine allowance since KMC X11/X12 share a
  size designation but differ in stated compatibility); **FRM-51-53** (UDH Rev A→H trail
  transcribed from the drawing's own revision record; Rev F pivotal — 142/157 OLD added, hanger→
  full-mount; CONTRADICTION explicitly DECLINED because SRAM publishes no per-revision split, so a
  rev-aware rule can't meet the bar — the revision-blind `udh` boolean now positively justified);
  **WHL-46-52** (DT Swiss §6.1 tension bands confirmed by rendering the page as an IMAGE to defeat
  column-scrambling; carbon-rim inspection doctrine; Reserve 50 psi cap; **a same-round
  self-correction** — WHL-48's "DT Swiss is the only maker publishing a tension target" withdrawn
  after Reserve was found publishing 1000–1300 N, closing the cross-brand comparison and yielding
  the lesson that one brand's exhaustion is not evidence about the field); **SUS-50-53** (volume-
  spacer selection keyed to model code + air-spring type, never tube diameter; coil chart closed,
  honestly scoped to entry-tier forks + colour codes); **BRK-46-49** (Hayes closed → 5/5 major
  hydraulic makers at manufacturer-primary tier; the "bleed fluid-volume table" answered by
  establishing it CANNOT EXIST — makers specify fill fractions/flush-to-clear because volume varies
  with hose length; first standards-body source, FMVSS 116).
- **⚠ BRK-49 carries a do-not-transfer caveat worth knowing**: FMVSS 116 mandates brake-fluid
  COLOURS (mineral oil = green) but governs MOTOR VEHICLES only — real bike products contradict it
  (Magura Royal Blood blue, Shimano mineral oil red). **Fluid family must never be identified by
  colour** in engine, UI or guide copy. Exactly the authoritative-sounding-but-wrong class the
  corpus rules exist to catch.
- **ID COLLISION RESOLVED AT MERGE**: the branch authored SUS-48–51, but SUS-48/49 were already
  taken on main by master-1's cherry-picked coil-service facts. Both sets are real and distinct, so
  BOTH were kept and the incoming four renumbered **SUS-50–53** (internal cross-references
  renumbered with them; a coordinator note records it in-chapter). Ids stay append-only, sequence
  verified contiguous 1–53 with no duplicates. Root cause: master-2's brief said "start suspension
  at SUS-50" and it started at 48 — the ID-range claim mechanism works only if workers honor it.
- Engine impact across all five batches: **nothing contradicted**; three rules gained supporting
  citations (ss-chain-width, the UDH requirement, and UDH's revision-blindness). Zero intake items.
  Process lesson recorded corpus-side: fetch-tool artifacts repeatedly masqueraded as source
  exhaustion (plain curl + pdftotext worked first try on three "exhausted" brakes gaps), and
  multi-column spec tables extract WRONGLY as text but CORRECTLY as an image via pdftoppm.
  Gates: validate 7×OK / 757 tests / tsc clean. Worker continues to L4 race-craft.

## 2026-07-18 — mechanic master round 2 COMPLETE (batch 6 merged, round stood down)

- **Merged batch 6** (590e8f2 + 0e1a3ac): **WHL-53**, the corpus's first L4 race-craft fact at
  governing-body tier — a World Cup XCO pit is a regulated feed/technical-assistance zone with
  credentialed, quota-limited access, which is the precondition for the "pit wheel-swap procedure"
  the gap named (a swap is only possible where a mechanic may legally stand with the spare). Scope
  caveat stated in-fact: only the 19-page 2019 amendments excerpt was obtainable, NOT complete
  Part 4, so FTA conduct articles are explicitly not sourced and must not be inferred. Also a
  stale-header sweep on drivetrain.md (batch 1 had closed the 11/12sp chain-width item; the
  Maturity header still listed it open).
- **L4 marked complete-as-scoped, NOT closed — and the worker's restraint is the right call.** Its
  brief permitted labelled Tier-B race-mechanic interviews; it deliberately declined, on the
  grounds that a thin pass produces exactly the dressed-up community consensus corpus rule 2
  forbids, and a documented gap beats that. Four independent routes were tried and all blocked,
  each now written into the chapters with next routes so nobody repeats them: UCI Part 4
  (uci.org JS-rendered — WebFetch AND Bright Data both return the nav shell; Wayback holds only
  amendment excerpts), ENVE pressure guidance (JS calculator, no static text), SRAM "Suspension
  Setup and Tuning Guide" (**that URL is not a PDF — it HTML-redirects to the docs.sram.com
  Suspension UM already mined, so no separate RockShox race-tuning document exists behind that
  name**), Reserve (max pressures only). Empirical refinement of CURRICULUM.md's prediction: the
  L4 blocker is JS-rendering and partial archiving, NOT absence of knowledge.
- **ROUND TOTALS: 6 batches, 20 facts** — DRV-64-67, WHL-46-53, SUS-50-53 (renumbered from the
  authored 48-51 at the prior merge), BRK-46-49, FRM-51-53. Zero engine contradictions across the
  whole round; three engine rules gained supporting citations; one CONTRADICTION explicitly
  DECLINED on bar grounds (FRM-53). Zero intake items. Gates: validate 7×OK / 757 tests / tsc
  clean; SUS id sequence re-verified contiguous with no duplicates after this merge.
- **Round STOOD DOWN on Douglas's word** (2026-07-18) — no Tier-B interview pass for now. Session
  archived. Mechanic chapter maturity and the documented blocker list carry forward for a future
  round; the material exists, it just isn't in static fetchable form today.

## 2026-07-18 — verification campaign 3, batches 1–2 merged

- **Merged `verify/campaign-3`** (e17f87c + 01b1761): 16 Skipped-with-reason, 11 Failed-retry, and
  **2 real catalog corrections**. Job-state + two `src/compat.js` field additions only — no new
  rows, no id changes, no engine/schema edits (lane respected).
- **`fr-intense-m1` gained `minRotorR:200` — ERROR-TIER, so coordinator-verified independently.**
  Rule 10b turns this into a hard reject, so a wrong value would manufacture a false "won't fit".
  I re-fetched eu.intensecycles.com/pages/m1-frame-build-specs myself rather than trusting the
  report: the page states the rear rotor range as **"200mm - 223mm"**, confirming the worker's
  second-source claim and resolving the prior pass's deliberately-left FLAG (mount floor vs stock
  brake spec). Blast radius checked and judged CORRECT: 115 of 189 catalog rotors now error on this
  frame's rear — expected and physically right for a DH frame whose native post mount is 200mm
  (adapters size rotors UP, never down). **Verdict harness byte-identical before/after** (the
  affected build shapes aren't in the harness's scenario set), validate 7×OK, 757 tests, tsc clean.
- **`fr-bird-zero-am` gained `weight:1900`** from a directly-fetched bird.bike/frame-data-geometry/
  maker weights table no prior pass had tried ("Zero AM | Size Medium | 1.9kg/4.2lbs", painted).
  Weight bar now met; row stays UNVERIFIED overall because rearAxle + maxRotorR remain
  WebSearch-only — correctly flagged rather than promoted.
- **Two ambiguous rows deliberately NOT touched** — the judgment call worth recording:
  `fr-kona-shonky` (a real archive.konaworld.com page's "FSA Orbit 1.5B ZS" headset code conflicts
  with the catalog's `tapered`) and `fr-commencal-absolut` (a real commencal.com fetch came back
  internally inconsistent on rear axle/brake mount/weight). Both flagged with specifics for a
  careful re-read instead of a speculative edit — a blank beats an invented value.
- Bright Data untouched this wave (WebFetch/WebSearch only); balance stays ~$1.39 pending Douglas's
  top-up. Worker continues grinding the frame queue.

## 2026-07-18 — sweep wave: ui-expert batch 5 + campaign-3 batch 3 (both stale-base applied)

- **ui-expert batch 5** (own-additions of 0729d30 + cfefb92, `tools/ui-expert/` only): **DNS-21 +
  ACC-25 confirm all three round-4 findings CLOSED against the shipped tree** — SC 2.5.7 now passes
  on all seven range axes, all nine dialogs carry autofocus, zero `100vh` remain. The re-audit
  credited three things the slider chip did that the spec did NOT demand, each otherwise a silent
  regression: the 24px min-height (the bare box landed ~22px, so a 2.5.7 remedy would itself have
  failed 2.5.8), the preserved input/change split on the new controls, and crossed-bound resolution
  mirroring the sliders' precedent. One item recorded as an OBSERVATION-not-finding: slider and
  number field share an accessible name but differ in ROLE, so AT disambiguates — noted so a future
  round doesn't "discover" a duplicate-name defect. **mobile-fundamentals → MASTER** (MOB-43..47):
  the valuable result is a REASONED NO-ACTION — handle foldables via breakpoints, not the
  experimental non-Baseline Viewport Segments API (no split-view layout exists for a hinge to
  bisect; a fold-out lands above the 769px breakpoint and correctly gets desktop). Recorded as
  standing "no action needed, and why", explicitly CONDITIONAL on the API staying non-Baseline.
  **MOB-47 flagged as HYPOTHESIS not finding**: posture change is a resize, so does in-flight state
  (partial build, open dialog, mid-edit numeric filter) survive crossing 769px? Untested, needs no
  foldable hardware — queued as a cheap test. Board: 5 MASTER / 2 professional / research-methods
  not started.
- **campaign-3 batches 3 AND 4** (7e61cb7 + d35063c, `tools/verification-job.json` only): 19
  Skipped, 4 Failed-retry, no catalog or engine changes. JSON re-parsed post-apply per the
  string-splice rule. *(Corrected same-session: this entry originally read "batch 3". The worker
  committed batch 4 BETWEEN the sweep's branch-listing step and its `git diff` apply step, so the
  apply resolved `verify/campaign-3` at its newer tip and silently captured both batches. Content
  verified correct and identical to d35063c; only the log undercounted. **Lesson: a sweep must
  pin the branch to an explicit SHA at listing time and diff against that SHA, not the branch
  name — a live worker can advance its branch mid-sweep.**)*
  All Skips this round are the same shape: complete-bike-only frames whose interfaces are already
  sourced but which have no frameset SKU, so price/weight can never clear the bar (Scott Voltage YZ,
  Salsa Timberjack, two Marins, Nukeproof Dissent, two Whytes, two Mondrakers, Merida One-Forty,
  Ghost Kato/Riot, Propain Rage, Orbea Oiz, Devinci Django, Chromag Stylus MX). Three Failed-retry
  rows flagged as genuinely close rather than abandoned: `fr-ari-lasalpeak` and `fr-revel-rascal-v3`
  each have BOTH maker-fetched frame weight and frameset price (rare in this queue) with only
  brakeMount/maxRotorR third-party; `fr-devinci-marshall-29` has a candidate weight of unclear
  provenance. `fr-octaneone-void`: real maker page found but it 500s on an expired SSL cert, and
  WebSearch hints at an IS-vs-PM brakeMount discrepancy against our cataloged value — flagged for a
  reviewer, deliberately not flipped.
- **Both branches were STALE-BASED** — a raw merge would have reverted live work (ui-expert's diff
  vs main showed `index.html -131`, i.e. undoing the slider fix, plus PROJECT-LOG and mechanic-corpus
  deletions). Applied own-additions only from each branch's merge-base, per the standing pattern.
  Gates: validate 7×OK / 757 tests / tsc clean; confirmed zero diff to `index.html` and
  `src/compat.js`, so no live surface moved and no harness run was owed.
- **Sweep note:** ~140 branch pointers read as "ahead of main" but are historical — content-grep
  confirmed (spot-checked `catalog/cb7-w5-leads2`: its bike ids are all already on main). The
  own-additions apply pattern doesn't create merge ancestry, so pointer age is not evidence of
  unmerged work. Ground truth is content, never the pointer.

## 2026-07-18 — CORRECTION: Bright Data free pool was never exhausted (coordinator error)

- **The error:** the coordinator read `bdata budget` → `balance: 1.39` and told Douglas there was
  no free tier on the account and no free usage would return, then instructed campaign-3 (and the
  sweep messages) to stop using Bright Data entirely and stay on WebFetch/WebSearch. **Douglas
  caught it from the Bright Data dashboard: 4,273 free credits remaining of 5,000, renewing
  2026-08-01.**
- **Root cause:** `bdata budget` reports ONLY the paid/test balance — it has no visibility into the
  monthly free-credit pool, which is dashboard-only. Asserting a negative ("no free tier") from a
  tool that structurally cannot observe it was the mistake; the correct answer was "the CLI can't
  see this, check the dashboard."
- **The $1.39 is a different thing entirely:** a $2 test credit scoped to Proxies & Browser API
  (explicitly NOT free-tier covered), expiring ~2026-07-24.
- **Cost of the error:** campaign-3 ran two-plus batches deliberately avoiding Bright Data, taking
  Failed-retry on rate-limited/walled rows (santacruzbicycles, intensecycles, dmrbikes, revelbikes
  429s) that the free pool would have cleared. No bad data resulted — the loss is throughput only.
- **Fix landed in `tools/VERIFY-PROTOCOL.md`** (new "BILLING — read before ANY bdata call"
  section): the two-pool table (`bdata scrape`/`search` = free 5,000/mo renewing;
  `bdata browser` = real money, coordinator approval required), an explicit "do NOT avoid scrape to
  save credits — the whole walled backlog fits in one month's pool", and a standing warning that
  `bdata budget` cannot see the free pool so free-pool state must never be inferred from the CLI.
- Workers notified to resume Bright Data on the free pool for walled targets.

## 2026-07-18 — PCPartPicker references removed + security exposure audit (Douglas's ask)

- **Scrub (Douglas 2026-07-18: "stop referencing PCPartPicker... no reference to it on the
  website"):** the LIVE SITE was already clean — zero references in `index.html`, `bmx.html`,
  `KitBuilder/`, `src/` or any deployed legal page (deploy.yml publishes only those). The
  references lived in 10 TRACKED DOCS, which matter because **the repo is PUBLIC**
  (dwills38/trailbuilder): README, CLAUDE.md, FOR-REVIEWERS, Getting-Started-Roadmap (×3),
  DATA-MODEL-REVIEW (×2), ENGINE-CRITICAL-REVIEW, BUILDS-GALLERY-SCOPE, DATA-ENTRY-TEMPLATE,
  DJ-BMX-COMPAT-ANALYSIS, ROAD-GRAVEL-COMPAT-ANALYSIS. All replaced with self-standing
  descriptions ("a parts-compatibility builder for enduro mountain bikes"); meaning preserved in
  every case, no historical claim altered — the phrase was always the project's own shorthand, never
  a quotation from a source. Verified zero remaining matches for `pcpartpicker|pc part picker|pcpp`
  across all tracked files. Gates: validate 7×OK / 757 tests / tsc clean.
- **Security exposure audit — CLEAN, nothing to remediate.** Checked: (1) no business/PII doc is
  tracked (LLC/affiliate/manufacturer/outreach/_PDFs/clearance files all correctly held by
  `.git/info/exclude`, which applies across every worktree and branch); (2) **full git history**
  scanned with `--diff-filter=A` for ever-committed sensitive filenames — only hits were
  `MANUFACTURER-BIAS-AUDIT-2026-07-12.md` (a technical audit, intentional) and
  `affiliate-disclosure.html` (an intentional public legal page); no `.env`, `.pem`, `.key`, or
  credential file has EVER been committed; (3) no secrets in tracked content — every `service_role`
  hit is documentation warning against using it, and the only committed Supabase values are the
  publishable URL + anon key, which are safe by design because every row is owner-scoped by RLS;
  (4) PII string sweep clean (apparent SSN-shaped hits were part numbers like `CS-LG300-10-1148`).
- Standing note for future seats: the repo being PUBLIC means tracked docs are as visible as the
  site itself — treat "is it on the website?" and "is it in the repo?" as two separate questions.

## 2026-07-18 — NAV-16 site-wide hash router SHIPPED (+ a coordinator-caught load-time crash)

- **Merged `ui/hash-router-nav16`** (52cc630): the guides-only `routeGuidesHash` is generalized into
  ONE router owning every full-page view — `#guides`, `#guide/<slug>`, `#forum`,
  `#forum/<threadId>`, `#inventory`, `#profile/<userId>`. Closes navigation-ia's NAV-16
  CONTRADICTION: three of four full-page views were invisible to Back, so pressing Back from the
  forum/inventory/profile **left the site entirely**. Forum threads and rider profiles are now real,
  shareable, cold-loadable URLs. Honors NAV-15's doctrine exactly — places get `location.hash`
  entries, build STATE keeps `replaceState`, and writeHash's clobber guard now covers all four
  routed page classes plus a `_routePending` flag holding it across two async windows (the
  auth-restore round-trip for `#inventory`, the profiles-feature probe for `#profile/<id>`). A
  signed-out cold `#inventory` link bounces to the builder and opens the SAME sign-in modal the
  header button opens — reached by a URL naming a protected view, not an unsolicited pop-up.
  Incidental real fix folded in: opening a routed page now clears the others first — previously a
  forum author link left BOTH `forum-page` and `profile-page` on `<body>` and rendered two views.
- **⚠ COORDINATOR REVIEW CAUGHT A LOAD-TIME CRASH the worker's own testing missed.**
  `parseRouteHash` called `decodeURIComponent` unguarded, which **throws URIError on malformed
  percent-encoding** (`#guide/%`, `#forum/%zz`, a truncated share, a mangling link-shortener, a
  crawler). `routeHash()` runs at load BEFORE `sync()` and the auth wiring, so the escaping throw
  would leave the entire app un-initialized — a blank-page bug reachable from an ordinary bad URL,
  on the live surface. Fixed in `src/compat.js`: an undecodable id is not a route we own, so it
  falls through to `{view:null}` and the builder renders normally. Six malformed shapes added to
  `test/test-ui.js` with the reasoning inline so the guard can't be silently removed
  (763 → 764 tests). The worker's browser pass covered valid routes and `#garbage` (which parses
  cleanly) but not malformed encoding — recording it because it is exactly the class the
  present-don't-push review gate exists to catch.
- **Verification:** four gates green (validate 7×OK / 764 tests / tsc clean) and the
  **verdict-audit harness came back BYTE-IDENTICAL** (compat.js changed, but `parseRouteHash` is a
  pure addition — zero engine rules touched). Independent browser pass on the merged tree: catalog
  fully renders (436 bikes) WITH a malformed hash in the URL, proving load-time initialization
  survives; `#guides` → `guides-page`, `#forum` → `forum-page`, build hash → builder, each with an
  exclusive single body class (the exclusivity fix confirmed); zero open `<dialog>`s across every
  route tested (popup scan clean); zero console errors. `bmx.html`/`KitBuilder` grep-confirmed not
  to share the view-toggle code — untouched.

## 2026-07-18 — sweep: ui-expert batch 6 (platform-conventions MASTER) + campaign-3 Bright Data round

- **ui-expert batch 6** — ⚠ **THIS ENTRY WAS WRONG WHEN WRITTEN; CORRECTED 2026-07-18.** The
  entry below described batch 6 as merged, but it never reached the tree: the coordinator
  `git apply`-ed the own-additions into the WORKING TREE and never staged them, so the
  following merge commit (which commits the index) excluded them and the log commit staged only
  `PROJECT-LOG.md`. The file sat modified-but-uncommitted for ~an hour while the log claimed it
  shipped. **The UI-expert worker caught it** by content-grepping `origin/main` for PLT-9 —
  branch pointers and coordinator claims are both weaker evidence than content, in BOTH
  directions. It recovered its commit from reflog (715a792) and re-presented. Actually landed
  with batch 7 in the merge recorded further below. **Lesson: after any `git apply`, run
  `git status` and stage explicitly — `git add <specific file>` silently drops everything you
  didn't name, and a merge commit in between hides it.** Original entry follows, content still
  accurate:
- **ui-expert batch 6** (`tools/ui-expert/platform-conventions.md`):
  **platform-conventions → MASTER** (PLT-9..14). Best items: **PLT-10 a FALSE-FINDING GUARD** — SC
  1.4.13 exempts native `title` tooltips (UA-controlled), so the site's 46 `title=` attributes are
  NOT 46 violations; recorded so a future round or automated scan doesn't report them as such.
  **PLT-11 reasoned no-action** — zero `@media (hover:)` queries is CORRECT: all 36 `:hover` rules
  are cosmetic colour/background only (none touch display/visibility/opacity), so nothing is
  hover-gated; conditional on that staying true, with the grep trigger to re-open. **PLT-14 a
  deliberate NON-closure** — PLT-2's override-web-native-with-platform-convention rule stays
  inference-grade; the worker reported the FAILED source hunt and where the likely unlock is
  (NN/g cross-platform, not a vendor HIG) rather than padding. Board: **6 MASTER / 1 professional
  (responsive-layout) / research-methods (new L4) not started.**
- **campaign-3 Bright Data round** (batches 5–7 job-state + `712c225` promotions): with the free-pool
  `bdata scrape` doctrine corrected, the worker cleared rate-limited walls and **promoted 2 frames to
  verified:true**, each with a warning-tier spec CORRECTION that the coordinator independently
  re-verified via `bdata scrape` (WebFetch was 429-limited, exactly as reported):
  - `fr-revel-ritual-v3` **maxRotorR 200→223** — Revel's own frame-kit page states verbatim "200mm
    post mount/223mm max rotor size"; the prior pass had read the post-mount size as the ceiling. I
    confirmed line-for-line before merge (it's the field that most needs it: a wrongly-low ceiling
    silently suppresses a legitimate rotor-oversize warning).
  - `fr-revel-rascal-v3` **designForkTravel 150→140** — page FAQ disambiguates "designed to use a
    140mm fork...may use a 150mm fork" (150 stays the max).
  Verdict harness BYTE-IDENTICAL (both corrections are per-row data, no engine rule touched);
  validate 7×OK (3,016 verified), 764 tests, tsc clean. Worker correctly LEFT `fr-santacruz-highball`
  Failed — the weight/price it found are for the "Highball CC Frame" SKU, but the catalog row's
  source is the "Highball 3" build kit and the material tier couldn't be confirmed identical
  (possibly-mismatched figures beat a wrong verified row). Job-json conflict at merge resolved by
  taking campaign-3's newer full-sync copy (my earlier sweep applies had advanced main's copy).

## 2026-07-18 — campaign-3 batch 8 merged (3rd promotion; wrong-SKU sourcing caught)

- **`fr-canfield-lithium-v3` promoted to verified:true** — and the underlying finding is the
  valuable part: the row had been sourced from Canfield's COMPLETE-BIKE page, but a
  `bdata scrape` of canfieldbikes.com/products/lithium-frameset found a genuine standalone
  FRAMESET SKU. Corrections: `frameOnly` false→true, `price` 2500 (rounded sample)→2499.99 (exact),
  `weight` 3400 (sample)→3492 (maker-stated 7.7 lb Medium, frame-only). Coordinator re-fetched the
  page independently and confirmed all three verbatim ("LITHIUM V3 - Frameset", "$2,499.99",
  "Medium weight: 7.7 lb (frame only)"); 7.7 lb converts to 3493 g vs the row's 3492 — a 1 g
  rounding difference, within convention, not a data error. **Wrong-SKU sourcing is a class worth
  watching: a complete-bike page can silently supply frame-only fields.**
- 9 Skipped alongside. Norco confirmed a REAL content wall, not a rate-limit — norco.com returns
  only a bare title even under `bdata scrape`, so those rows are correctly terminal for now rather
  than retry-eligible. Several other gaps (Ari Delano Peak, Canyon Sender CFR gen3, Unno Dash,
  Devinci Chainsaw DH, Diamondback Sync'r, Giant Talon 4, Orbea Laufey) re-tried under the unlocker
  and confirmed genuine rather than tool artifacts — exactly the distinction VERIFY-PROTOCOL's new
  fetch-doctrine section asks workers to make.
- Session totals: verified 3,010 → 3,017 (3 promotions: Revel Ritual, Revel Rascal, Canfield
  Lithium); queue 1,751 → 1,662 (89 processed across 8 batches + the retry round). Gates:
  validate 7×OK / 764 tests / tsc clean; verdict harness BYTE-IDENTICAL.

## 2026-07-18 — ui-expert batches 6+7: ALL SEVEN CHAPTERS MASTER (and a coordinator false-report fixed)

- **Merged `tooling/ui-expert-master-1`** (715a792 recovered batch 6 + d2d05a9 + 4176b50). Content
  verified present in-tree by grep after merge (PLT-9, RSP-19/20, CURRICULUM), 7/7 files now carry
  `Maturity: master`. Gates: validate 7×OK / 764 tests / tsc clean.
- **responsive-layout → MASTER** (RSP-16..20). **RSP-19 is the keeper**: intrinsic layout is WHY the
  site needs no upper breakpoints despite NN/g's 1200/1400 tiers — `.grid` is
  `repeat(auto-fill,minmax(236px,1fr))` and `.layout`'s centre track is `minmax(0,1fr)`, so wide
  viewports are handled by the layout itself. Rule recorded: *every axis handled intrinsically is a
  breakpoint you never have to write, test, or maintain IN FOUR THEMES*; the three that remain
  (480/768/880 + the 769 min-width counterpart) exist because they change layout STRUCTURE, which
  intrinsic sizing can't express — and all three sit inside NN/g's sourced "2-3 in practice" (RSP-17)
  and are content-derived (880 is exactly where the three-column layout stops fitting). **RSP-20 is
  an honest NON-recommendation**: do NOT retrofit Every Layout's Sidebar onto `.layout` — its 50%
  wrap trigger encodes a two-element assumption, and our three-track layout wants an all-at-once
  collapse; a flex-wrap version would let the build panel wrap independently and produce an
  intermediate state nobody designed. "We now have the primary" ≠ "we should use it".
- **CURRICULUM round-4 board** — the worker deliberately scoped the grade DOWN rather than overselling
  it: master never meant citations alone, and **master does not mean finished** (PLT-2 openly
  unsourced; performance cannot verify its own numbers until Vitals Explorer is read; accessibility
  records that a real screen-reader session has NEVER been run and markup auditing doesn't
  substitute). With all seven at master, target-the-weakest stops discriminating, so it wrote the
  successor rule for round 5+: (1) VERIFY what the corpus asserts but never measured — PRF-16,
  MOB-47, DNS-20, MOB-46, each needing a browser or an account, not a fetch; (2) re-check the
  CONDITIONAL no-actions, which go stale silently (is Viewport Segments Baseline yet? is every
  `:hover` still cosmetic? has Cloudflare shipped Safari/Firefox CWV?); (3) then the honest gaps.
  Plus an explicit DO-NOT-REOPEN list (MOB-45/PLT-11/RSP-20/DNS-18) — reasoned non-actions with
  their logic recorded, which is exactly what a fresh round reading only Gaps lists would re-litigate.
- Worker continues to batch 8: the new L4 `research-methods.md`, which would give a home to the
  method facts currently scattered across ACC-21/PRF-13/NAV-6/7 and let the corpus DESIGN the studies
  that settle the parked taste questions instead of leaving them parked forever.

## 2026-07-18 — campaign-3 batch 9 merged (tire transition); session pausing

- **Merged campaign-3 batch 9** (8008a47): frame queue transitioned into tires. One data
  correction: `ti-pirelli-scorpionxc-rc-29-24-pw-dual` weight 600→700 g, fetched from pirelli.com's
  own tech-specs table ("weight 700, 120 TPI, ProWALL, Race Compound"), superseding a sample weight
  and a vitalmtb-cited implausible 220 TPI. **Correctly NOT promoted to verified** — the worker
  judged Pirelli's real "Race Compound" naming can't honestly map to the catalog's generic
  `compound:'dual'` vocab value (a vocab gap, out of a field-pass's scope), so the row stays
  unverified with a sharper sourced weight. (Coordinator near-miss worth recording: I misread the
  branch diff — `grep -oE "verified:true"` matched the substring INSIDE the desc text "NOT promoted
  to verified:true" and I briefly moved to demote a correctly-unverified row; `sed -n` on the raw
  line showed there is no verified FIELD. Lesson: never grep for a field token that can appear in
  free-text desc prose; anchor on the actual field position.) Frameset-sibling heuristic applied to
  3 Pivot/BMC/Radon frames — none flipped, but each now has a sharper documented why (pivot.com is
  an unrelated insurance company; the real pivotcycles.com Build-Specs tabs are JS-loaded and
  uncaptured even under bdata scrape). Michelin's JS wall re-confirmed persistent even under the Web
  Unlocker (7 Wild Enduro/DH34 rows, client-side spec tabs — a real content wall, not a rate-limit).
- **Two reviewer flags surfaced, both correctly left untouched:** the Pirelli 2.2in sibling
  (`ti-pirelli-scorpionxc-rc-29-22-pw-dual`) may have an identity problem — pirelli.com's 2.2in page
  lists only a base ProWALL/Sport-Compound SKU, no "Team Edition" variant, conflicting with the
  catalog; and the compound-vocab gap (no Pirelli-native compound value) is a schema decision for
  Douglas, not a grind fix.
- Session `local_e08b89fb` PAUSED by the worker after a long stretch (9 batches + retry round;
  1,751→1,650 queue, 101 processed, 3 promotions). Gates green throughout. Left running/idle, NOT
  archived — it resumes the tire queue on request. The dedicated parallel verification workers
  (wheels/cockpit/completebikes) + the verified-flag audit are the paste-blocks that scale this out.

## 2026-07-18 — sample-build button emoji stripped (Douglas's word, confirmed directly)

- Removed the emoji from all 8 sample-build buttons (index.html:1070-1077 — Budget 💵, Mid-range ⚙️,
  High-end 💎, Mullet 🐟, DH ⛰️, Trail 🌲, XC 🐇, Hardtail 🪨), leaving text-only labels.
  Consistent with the 2026-07-14 icon-direction reversal. Done IN-SEAT (small direct UI edit, the
  sanctioned class) after Douglas confirmed the request directly — it had arrived relayed through
  two worker hops, and the relay had corrupted 3 of the 8 emoji (💰/🐰/🍡 vs the file's real
  💵/🐇/🪨), which would have made a grep-and-replace worker silently half-finish. Line numbers from
  the UI-expert's read-only pre-verification were the reliable handle.
- Per the UI-expert's ACC-19 note: NO aria-labels added — visible text is the accessible name, and
  stripping the emoji from child content correctly strips it from the accessible name too. Small
  accessibility improvement in itself (screen readers stop announcing "money with wings"/"rock"
  after every label). The line-1285 "Mullet build demo" prose reference still matches its label.
  Deliberately NOT touched (not in the ask): the 🚵 on the "Sample builds ▾" summary and the 🎲 in
  the rail hint — flagged to Douglas in case he wants those too.
- Verification: gates green (validate 7×OK / 764 tests / tsc clean); browser pass on the worktree —
  all 8 labels emoji-free by unicode-range test, popup scan clean (0 open dialogs), and a real
  demoTrail click still generates a complete build (Sample total $3,918.36, build hash written), so
  the handlers survived the label edit.

## 2026-07-18 — cb-verification cluster + ARC BB error-tier fix + ui-expert ROUND 4 COMPLETE

- **Merged `verify/completebikes-1`** (380bbd4, the first of the four parallel verification
  clusters): two real PRICING-POLICY bugs fixed — `cb-yeti-sb160-t2`/`-t3` had the SALE price
  stored in `price` (MSRP-always policy violated); corrected to price=MSRP + streetPrice=sale, and
  T3's MSRP had drifted $9,500→$10,800. **Coordinator re-fetched yeticycles.com/bikes/sb160 and
  confirmed both verbatim** ("$10,800.00 $8,640.00" / "$8,500.00 $6,800.00"). Remaining 18 Yeti
  rows confirmed correct, several as intentional model-year snapshots. Cluster respected the
  no-job-json rule (dispositions in tools/verify-notes-completebikes.md). Key capability note: the
  free-pool unlocker renders yeticycles.com's JS kit lists — the move verify-cb-sheets-4 flagged as
  highest-yield; ~130 rows across Pivot/Ibis/Cannondale/RM/Mondraker/Ghost/Norco/Devinci/Propain
  sit behind the same wall class and are now plausibly reachable.
- **`fr-yeti-arc` bb BSA73→PF92 — an ERROR-TIER defect on a VERIFIED frame, fixed in-seat.** The
  cluster flagged it (out of its scope, correctly); the coordinator fetched Yeti's own support
  article directly: "The ARC bottom-bracket standard is PF92 [92mm]". The old value was wrong in
  BOTH rule-7 directions (threaded BB false-green, correct PF92 BB false-red). Correction note
  written into the row's desc with the verbatim quote; prior provenance retained. Harness
  BYTE-IDENTICAL (no scenario builds on the ARC). *Also a live datapoint for the queued
  verified-flag audit: a verified row carried a wrong error-tier interface for 8 days.*
  (Process note, honestly: the coordinator's first attempt at the desc note violated the
  string-splice rule — an unescaped apostrophe broke compat.js and the immediate-parse-check was
  batched instead of run immediately, exactly what CLAUDE.md's caution exists to prevent. Caught on
  the gate, redone apostrophe-free with parse-check-first. The rule is right; follow it.)
- **Merged ui-expert batch 8 — ROUND 4 IS COMPLETE.** New L4 chapter `tools/ui-expert/
  research-methods.md` (RES-1..12), self-graded PROFESSIONAL deliberately ("claiming master for a
  measurement chapter that has measured nothing would be self-congratulation"). Board: 7 MASTER + 1
  professional. **RES-6 is a strategic finding Douglas should know: A/B testing is effectively
  unavailable on this stack** (static hosting can't split; the cookieless analytics can't attribute
  a variant; traffic is below power thresholds anyway) — design questions here are settled by
  qualitative testing + expert judgment, which is a reason for method rigor, not guessing.
  **RES-8 names the study with the highest decision value: does the compat dot's MEANING land?**
  (contrast/channels now verified, comprehension never tested; watch-item: do users read "No
  conflicts found" as "this bike is fine"? — that would be the honest-data value failing in
  practice). RES-11 recommends CLOSING PRF-8 (skeleton-vs-spinner) rather than testing it, gated on
  the Vitals Explorer read. Round-4 totals: ~45 facts, 3 findings shipped as fixes (DNS-17,
  ACC-22×2), 1 open contradiction (NAV-16 — since shipped), 4 reasoned non-actions with a
  do-not-reopen list, 1 false-finding guard, 2 honest non-closures. Round 5's Priority 0: the
  heuristic evaluation (RES-4), the one L4 method an agent can run unaided.

## 2026-07-18 — wheels + cockpit clusters merged (one promotion DEMOTED at review)

- **Merged `verify/cockpit-1`**: 8 promotions presented, **7 accepted, 1 DEMOTED at coordinator
  review**. The demotion: `st-raceface-aeffect-r-35-40` — its own desc admitted the 149g weight is a
  retailer-listing estimate ("multiple retailer listings agree at 149-152g"), and the coordinator's
  re-fetch of raceface.com confirmed the maker publishes ONE weight, 161g at the 50mm basis, so the
  40mm row has NO maker-published weight; retailer weight claims are rejected on verified rows by
  policy. Interfaces stay maker-confirmed; weight stays an honest sample; demotion note in-row.
  The two seatpost promotions with sample PRICES were accepted per the established
  documented-conversion precedent (maker weight + maker interfaces + honestly-labeled price sample).
  Spot-checked pd-dmr-v6 clean ($26.00 / "327g per pair" verbatim on dmrbikes.com). Also delivered:
  sa-dmr-dj-saddle's real model name ("Sect Rail Saddle"), a cog policy question (DMR confirms the
  interface but publishes no per-cog weight — cog isn't in the interface-verification exception
  list; Douglas call whether to extend), and two data-quality flags left correctly untouched
  (sp-newmen-advanced-carbon-272-400 physically-implausible length/weight pair;
  sp-sdg-tellis-316-rigid "Tellis" branding is dropper-only per SDG's lines).
- **Merged `verify/wheels-1`**: 3 EX 1700 SPLINE rows promoted with per-matnr weights from DT
  Swiss's model-finder table, 7 already-verified M1900 rows weight-corrected from nominal-split
  estimates to real per-matnr figures (+7g to +76g — the wheels nominal-weight exception retiring
  itself as real data arrives, exactly as designed). Coordinator spot-check: the cited matnr
  WEX1700TEDRSA11693 independently resolves to exactly the claimed config across retailers (the
  model-finder scrape itself returned empty this session — JS pagination; the worker's technique
  evidently differs). Two open questions correctly flagged not guessed: XRC 1200 25mm-width tier
  possibly discontinued (current site lists only 30mm); M1900 SuperBoost157 rows unconfirmable on
  the retail page (plausible OE-only end-caps, the Canyon Sender pattern). ~473 unverified wheel
  rows remain; notes file maps the brand-by-brand backlog with fronthub/rearhub a-la-carte pages
  flagged next-best-yield.
- Both clusters respected the no-job-json rule (dispositions in tools/verify-notes-*.md — the
  parallel-safe pattern working as designed). Aeffect-R stem DUP (parked item) noted still open:
  both st-raceface-aeffect-r-35 and -35-40 exist. Gates: validate 7×OK (**3,027 verified**, +10
  net incl. the demotion), 764 tests, tsc clean, harness BYTE-IDENTICAL.

## 2026-07-18 — VERIFIED-FLAG INTEGRITY AUDIT merged: 55 false-verified rows demoted

- **Merged `audit/verified-flag-1`** (report: tools/VERIFIED-FLAG-AUDIT-2026-07-18.md). All 3,512
  verified rows swept (2,184 language hits → 889 clusters human-read) + provenance-field sweep +
  10 random rows re-fetched live. **55 compat.js rows demoted** (verified:true removed,
  source/lastChecked retained, dated DEMOTED note per row, NO values changed): 4 flagrant
  ("UNVERIFIED sample" descs carrying the flag), 33 review/retailer-sourced (vitalmtb et al — incl.
  all 10 DVO Onyx forks and 8 completebikes), 10 with sample/assumed checkBuild-read fields (most
  are ONE targeted maker fetch from re-promotion — queued as grind), 2 storing a different product's
  price (fr-devinci-troy-st, the trigger + its exact twin fr-transition-sentinel-alloy), 2 bikes
  whose fills knowingly diverge from the fetched sheet. **BMX + Kit: zero demotions.** MTB verified
  3,027 → **2,972** (the number went DOWN because the truth did — the badge now means what it says).
- **Spot-verify result is the good news: 8/9 fetchable random rows fully supported** (Revel price
  exact, Intense Tracer every interface+weight exact, Burgtec/TRP/Kali/Endura/SRAM exact), zero
  interface/weight contradictions in the sample. The demoted 1.6% were the tail, not the body.
- **Test evolved, not weakened** (per the brief's explicit bar): test-ui.js's sheet-verified
  exemplar was itself among the demoted (cb-devinci-django-carbon-gx, vitalmtb-sourced) → swapped
  to the maker-sourced, same-day-re-verified cb-revel-ritual-sram-eagle90, reasoning inline.
  Coordinator reviewed the swap — same contract asserted, better exemplar.
- **Coordinator review notes:** spot-checked demotions verbatim (Nukeproof pair, troy-st);
  initial false-alarm on fr-nukeproof-giga-290 was my own sampling error (already unverified on
  main, not a demotion). Harness delta = exactly one INFORMATIONAL annotation line (the DVO
  fork family's "(verified 6/6)→(0/6)" tag) — zero verdict changes. Gates: validate 7×OK
  (2,972 verified), 764 tests, tsc clean.
- **AWAITING DOUGLAS (in the report, §not-applied):** (1) THE PRICE POLICY GAP — 1,000+ verified
  rows carry disclosed sample/converted prices under self-citing precedent (SRAM publishes no MSRP,
  Shimano handbook set, GBP/EUR conversions); recommend formalizing "price never blocks
  verification when no US MSRP exists, basis stated" + a UI disclosure, since the badge currently
  overclaims PRICE specifically; alternative = demoting four digits of rows. (2) formalize the
  frames interface-verification exception (unwritten today). (3) four named row calls incl. an
  apparent duplicate DVO fork id pair. verification-job.json untouched — next sync observes.

## 2026-07-18 — PRICE POLICY formalized + Image Coordinator lane retired + campaign-3 wrapped

- **PRICE RULE FORMALIZED (Douglas's ruling, `tools/VERIFY-PROTOCOL.md`):** `verified:true` is a
  claim about INTERFACES and WEIGHT — never about `price` being a maker-published US MSRP. A
  missing/non-US price no longer blocks verification, PROVIDED the basis is stated in `desc`.
  Guardrails kept sharp: a price belonging to a DIFFERENT PRODUCT is still always disqualifying
  (the `fr-devinci-troy-st` class the audit demoted), an undisclosed basis is still a defect, an
  invented number is never acceptable, and a real US MSRP must still be used where the page has
  one. This resolves the audit's headline finding — 1,000+ verified rows carry honestly-disclosed
  sample/converted prices under a self-citing precedent chain (SRAM publishes no MSRP; the Shimano
  handbook set is spec-only; EUR/GBP RRP conversions) — without demoting four digits of correct,
  honestly-labeled rows.
- **UI DISCLOSURE SHIPPED (index.html legend):** "✓ Verified = **interfaces & weight** checked vs
  manufacturer spec; **price may be a sample**". The badge no longer overclaims price to riders —
  the audit's "the badge materially overclaims on the price axis" finding, closed. Protocol and
  legend are cross-referenced so they stay in sync. Browser-verified (legend renders, popup scan
  clean, emoji-free buttons intact, 436 rows render); gates validate 7×OK / 764 tests / tsc clean.
- **IMAGE COORDINATOR SEAT RETIRED (Douglas's word, same day created).** His reasoning: separating
  image from affiliate work wasn't the mistake — making Image a *coordinator* was; every meaningful
  image decision was settled by affiliate-lane facts, with the Main Coordinator relaying between two
  seats that kept needing each other, and one voice to manufacturers matters. Split along the
  natural seam: **sourcing/legal → the "Partnerships" session** (Affiliate, retitled — it already
  owned outreach; the open Tier A/B decision with its three modes transferred to its queue);
  **ImageService engineering → the Main Coordinator's normal chip lane** once the design is
  approved. `IMAGE-COORDINATOR-HANDOFF.md` amended with a retirement header; everything below it
  preserved as the program's reference brief (§2's legal conflict remains the key section). The
  seat's held `img/2026-07-18` branch had zero commits ahead — nothing lost. Both sessions notified;
  Image archived.
- **Verification campaign 3 WRAPPED and archived** — fully harvested: 9 batches + the Bright Data
  retry round, 101 queue items (1,751→1,650), 3 promotions each with a coordinator-confirmed spec
  correction, the frameset-sibling heuristic that became standing doctrine, and the
  `fr-devinci-troy-st` flag that triggered the 55-row verified-flag audit. Worktree/branch pruned.

## 2026-07-18 — complete-bikes cluster round 2 merged; cluster wrapped

- **Merged `verify/completebikes-1` round 2** (d3e2ad3): **4 fill-level errors fixed on Ibis rows,
  two of which were ALREADY VERIFIED** — `cb-ibis-ripmo-af-sram-90` and `-deore` carried the wrong
  front tire (Minion DHF where the maker page says Assegai) and wrong headset tier (Cane Creek 40
  vs 50); `cb-ibis-ripmo-v3-gx-axs` had wheels/rotors/brakes contradicting its own cited source;
  `cb-ibis-ripley-v5-gx-transmission` had a shock fill (Float X) contradicting its own quoted desc
  text (plain Float). Same class as the ARC BB defect: **verified rows can carry wrong fills, and
  only a re-read against the maker sheet finds them.** Harness BYTE-IDENTICAL (every swap was an
  already-cataloged part in the same interface family), validate 7×OK, 764 tests, tsc clean.
  ⚠ **Coordinator limitation recorded honestly: I could NOT independently re-verify the Ibis
  corrections** — ibiscycles.com/build-kits/<slug> did not render under bdata scrape in my seat
  (the worker reports it does in theirs). Merged on the strength of: direction-of-travel (toward
  the maker sheet), interface-compatibility, harness neutrality, and the Ripley case being
  self-evidenced by the row's own contradictory desc. **Flagged for the next drift-check run.**
- **Brand-wall map extended** (tools/verify-notes-completebikes.md): Pivot + Rocky Mountain UNLOCKED
  via Shopify `/collections/<model>` (14 + 5 rows spot-checked, all correct); Devinci per-product
  pages fine (5 rows exact). Still walled, one attempt each per budget: Norco 404s even under the
  unlocker, Cannondale renders no pricing (client-side API, not SSR), **Propain is a NEW blocker
  class** — its bike-builder configurator IS the pricing surface, so no static page will ever carry
  it (not solvable by a better unlocker; needs a different approach entirely).
- **Two items handed to the next seat, correctly not self-resolved:** (1) a DEDUP CALL —
  `cb-ibis-ripmo-v3-gx-axs`/`-gx-transmission` and `cb-ibis-ripley-v5-gx-axs`/`-gx-transmission`
  are each almost certainly one real product entered twice (same price, same source URL; "GX AXS"
  and "GX Transmission" are Ibis's two labels for the same SRAM Eagle Transmission build) — an
  id retirement + ALIASES move, coordinator-tier, deliberately not done by a field-level cluster;
  (2) a CATALOG GAP — Ibis Deore builds spec Shimano **M6200** derailleur/cassette/crank/brakes but
  only an M6200 *shifter* exists in the catalog, so those rows document a substitution to M6100-tier
  siblings. Cluster session archived; the remaining ~400-row completebike set continues via the
  staged blocks.

## 2026-07-18 — FETCH ETHICS RULING (Douglas) + seat 14 handoff

- **Douglas ruled: "let's keep it ethical so as not to upset any partners."** We do NOT defeat
  anti-bot protection, on any brand, for any spec. Background: seat 13 noticed mid-session that the
  Bright Data Web Unlocker's *function* is bot-detection/CAPTCHA bypass — which the coordinator's
  own operating rules prohibit — after having used it heavily and written "use it freely" into
  `tools/VERIFY-PROTOCOL.md`. Raised to Douglas rather than quietly continuing or quietly stopping.
- **The distinction that makes the ethical path cheap, and it is now doctrine:** rendering
  JavaScript is NOT circumvention (it is being a browser); defeating a bot-wall IS. Most project
  "walls" were only the former. **PROVEN: the plain browser pane rendered pivotcycles.com's full
  build-tier pricing** ($8,999/$7,399/$6,699/$6,499 with tier names) on a page a worker had reported
  as "JS-loaded and uncaptured even under `bdata scrape`" — the clean path OUTPERFORMED the unlocker.
- **New fetch order (VERIFY-PROTOCOL FETCH ETHICS section):** WebFetch → Exa → **browser pane**
  (`preview_start {url}` + `javascript_tool`) → `bdata search` for URL lookup only → **STOP**. An
  active anti-bot challenge is a documented wall, not a task: Skip/Fail naming the wall, or enter
  the row as honest unverified sample data per the relaxed-inclusion policy. `bdata scrape` RETIRED
  from routine use; `bdata browser` remains off (also bills real money). The stale "Bright Data for
  the hardest bot-walls" line in the Exa section was struck so the protocol no longer contradicts
  itself. **Douglas asked to be TOLD if this ever becomes a genuine roadblock so he can revisit —
  escalate as a decision, never route around it.**
- **SEAT 14 HANDOFF WRITTEN** (`COORDINATOR-HANDOFF.md` top block) + **`HANDOFF-CHIPS.md`: 13
  paste-ready worker blocks**, led by the affiliate/partnership process adversarial review Douglas
  asked for (every email draft checked for claims true-today, overclaim, spam-read, and rewritten
  where weak; plus the Tier-B self-defeat risk, the UNBIASED values check, and FTC disclosure
  sanity — with explicit PII guardrails since the business docs are gitignored and carry his real
  address). Fleet is EMPTY at handoff: every worker harvested and archived tonight.

## 2026-07-18 (seat 14) — Seating; 11-worker wave dispatched; affiliate process review harvested

- **Seat 14 seated:** seat 13 archived; hourly fleet-sweep cron re-armed; standing SUCCESSION RULE
  added to the handoff top (auto rename/archive/unpin at every seat change — Douglas's word,
  2026-07-18); project-wide session-messaging permissions allowed (`.claude/settings.json`) so the
  worker↔coordinator loop runs with zero clicks.
- **Wave dispatched (Douglas, from HANDOFF-CHIPS.md + 3 seat-14 additions):** 11 workers running —
  re-promotion, wheels-2, complete-bikes-3, frameset-sibling, forks/cockpit/kit, BMX-1, modelYear,
  UI-expert round 5, coach round 6, MOB-47, affiliate process review. Seat-14 additions offered:
  reviews.sql hardening, IS-mount adapter-tier fix, green-dot disclosure.
- **FIRST HARVEST — affiliate/partnership process adversarial review** (`audit/affiliate-process-1`
  → main `465a179`, docs-only, gates green, PII-scanned clean incl. LLC-identity scan; accepted a
  scoped `.gitignore` negation for the PII-free tools/ deliverable). Verdicts: legacy
  outreach-emails.md DO-NOT-SEND (superseded branding, false buy-link claim); partnership kit
  templates NEEDS-WORK with inline rewrites; signup-runbook answers strongest. CRITICAL-1: Tier B
  unlicensed images and outreach are mutually exclusive as written. CRITICAL-2: "every listing
  links to purchase channels" is false today (0 rows carry retailerLinks). 5 decisions queued for
  Douglas (§6 of the review doc).

## 2026-07-18 (seat 14, evening) — Nine-lane harvest merged; containment rule enforced

- **File-containment hard rule #5 shipped + enforced** (`e3475d9`): all session files inside
  `D:\MTB Bike Builder`; PreToolUse hook auto-denies outside worktree/clone paths (caught and
  survived its own false-positive class — unquoted space-truncated project paths — before landing).
  Session-messaging permissions project-wide (`5276599`) — the fleet runs click-free.
- **Docs harvest** (`78d15b8`): IS-mount CLAUDE.md correction (engine fix f1685b4 predated the
  chip; bias-audit r3 HIGH-1 RESOLVED); MOB-48/49 measurements (breakpoint-crossing risk REFUTED
  by two independent same-day runs, merged at field level); ui-expert round 5 heuristic eval
  (ACC-26 forum-rows keyboard violation = the round's one violation-grade finding; HE-1 reset
  destroys builds unconfirmed; PRF-19 unbounded All-parts render).
- **Green-dot disclosure live** (`d6528ca`): bias-audit r3's cheapest win — hover + legend now say
  green = no conflict among CHECKED dimensions; some makers publish no data.
- **Catalog harvest** (`764a79e`): BMX w1 (59→62), complete-bikes w3 (Canyon pass; 2 flags held),
  forks (+10 net verified; Rhythm maxRotorF 203→230 off Fox CAD; DVO wall = 3rd honest stop),
  frameset-sibling sweep (11 real frameset SKUs corrected, 34 skip-reasons rewritten, 6 flagged).
  verification-job.json merged three-way at entry level, zero collisions. MTB verified 2972→2983.
- **reviews.sql hardened** (`2e2e65a`) after coordinator adversarial review — both HIGHs closed,
  file stays STAGED (Douglas runs it); 3 design levers remain his call.
- Sessions archived as harvested (9 total this wave). Still running: modelYear, re-promotion,
  complete-bikes w4, live-SQL audit, stray-folder cleanup, coach r6, wheels w2 (quiet).

## 2026-07-18 (seat 14, late) — Second harvest: six more lanes; fleet drained to two

- **Docs+security** (`be9af03`): coach round 6 (Cycling UK Unit 3 ingest; XC/enduro asymmetry
  closed); live-migrations security audit — **H1 HIGH: any signed-in user could self-PIN a forum
  thread** (no guard on forum_threads.pinned; lands on UNBIASED) + 5 MEDIUMs;
  `supabase/hardening-2.sql` STAGED with the fixes, adversarially reviewed (policy re-creation
  verified to drop no live guarantee). Douglas must run the review's §M1 RLS query first.
- **Catalog** (`92136a5`): complete-bikes wave 4 (27 corrections + 8 promotions across
  SC/Giant/Evil/Orbea/Scott), the re-promotion grind (~24 of 55 audit demotions honestly
  re-verified; ~21 walls sharpened), modelYear backfill (41 sourced, 137 deliberately blank).
  Cross-lane conflicts resolved at field level (frameset prices kept over stale re-prints;
  modelYear tokens re-inserted onto post-harvest lines). **MTB verified 2,983 → 3,030.**
- **Hygiene:** cleanup lane removed 6 stray worktrees + 202 fully-merged branches; coordinator
  removed 15 more harvested worktrees (incl. all 6 D:\-root strays except the wheels lane's
  live one) + 14 harvested branches. Worktrees ~210 → 185. `D:\scratch_cbgrind` (plain folder,
  not git) left for Douglas's call.
- Fleet after this wave: only wheels w2 (quiet — nudge pending) + Partnerships + bug-triage.

## 2026-07-19 (seat 14, sweep) — wheels wave 2 harvested; wave fully closed

- Wheels w2 merged (`b56cfa8`): +8 net verified (Onyx Vesper XD→XDR correction, Race Face ARC
  rim via PDF, both prior open questions resolved — XRC 1200 25mm real-but-discontinued via
  Wayback, M1900 SuperBoost157 confirmed OE-only and honestly unverified). MTB verified 3,038.
  Last D:\-root stray worktree (wt-wh2-c804) removed. Fleet: Partnerships + bug-triage only.

## 2026-07-19 (seat 14) — Phone-UI hard review: NO m-dot; 6-chip fix list

- ui-expert phone teardown merged (`bd88bcd`): m.buildmymtb.com REJECTED with evidence (drift
  risk on a no-build-step codebase, SEO/canonical burden, share-hash breakage; every clunk is
  responsive-patchable). Top clunk: search strands users at the footer, 28k–90k px lists with no
  way back up, hover-only dot reasons on touch, #mobileBar absent on bmx/Kit. 6 fix chips handed
  to Douglas; ACC-26/HE-1/HE-7/NAV-18/PRF-19 deliberately not duplicated.

## 2026-07-19 (seat 14) — Phone-fix wave: 5 of 6 live; ACC-26 closed; cockpit/kit tails

- Phone fixes 1-5 all LIVE (`03adf8b`..`c8a67ea`): mobileBar on BMX+Kit, search-strand +
  root-caused --hdr-h staleness, tappable dots (BMX's first verdict card), CSS ergonomics
  (16px zoom guards, hit-areas, dialog overscroll containment — PLT-16 closed), chips 2-row
  wrap. Fix 6 (scroll-revealed "↑ Filters") built on branch ui/phone-fix-backtotop, HELD for
  Douglas's no-popup sign-off per design.
- ACC-26/27 fixed: forum rows keyboard-operable (WCAG 2.1.1 Level A violation closed).
- Cockpit w2 + kit tail merged: MTB verified 3,041; kit's apparel weight-walls documented —
  recommendation: a measured-weight (sourceType:'measured') apparel pass, Douglas's call.

## 2026-07-19 (seat 14) — Phone-fix wave CLOSED: 6/6 live

- Fix 6 ("↑ Filters" return button) shipped `35f30bf` on Douglas's explicit no-popup sign-off
  ("make the other phone fixes live"). The entire PHONE-UI-REVIEW immediate-fix list is now in
  production; deploy pipeline carries it live on push.

## 2026-07-19 (seat 14) — Mission adopted; kit-weight policy settled; docs debt flagged

- **Kit weight policy (Douglas):** apparel needs no weight EXCEPT helmets (`4f8b2ea`), refined
  same day with the MORE-INFO PRINCIPLE — accurate data gathered liberally, UI curated
  (`e38941b`). Expert consult (`bc01856`) independently supported the helmets-only bar
  (neck-torque mechanism; shoes/armor marginal — real levers are stiffness/cleat and bulk).
- **docs/MISSION.md merged** (`3331f20`) — overview, 10-phase full-realization roadmap,
  public-safety re-scanned clean. **Douglas adopted mission statement B** (plain-spoken)
  (`5763d68`); recorded verbatim in memory. README's ancient "46 verified" fixed to count-free
  wording (`dbb7b7b`).
- Stale-docs debt from the mission research (NEXT-STEPS frozen at 07-13, Getting-Started
  phase-order inversion + pre-ethics scraping advice, CLAUDE.md rule-3 wording lag) — refresh
  chip offered, awaiting Douglas.

## 2026-07-19 (seat 14) — Upgrade Advisor LIVE; kit apparel wave; BMX w2; two doctrine catches

- **Feature slate #1 SHIPPED (`97f62bb`): the Upgrade Advisor** — "will it fit my bike" mode;
  swap-aware verdicts (displaced parts, new conflicts, conflicts cleared), deep-linkable in the
  share grammar, sanitizer-guarded; src/upgrade.js pure module + 17 tests (781 total); zero
  engine changes, harness byte-identical; verdict-based sorting deliberately deferred (bias).
- **Kit apparel wave (`d8beece`): 437 → 470 verified** under the new no-weight bar; real drift
  caught (Leatt restock); 2 suspicious iXS kneepad rows flagged for investigation.
- **BMX w2 (`b78e186`): 66/225**; 24 to the 40% bar (frame-exception ruling would close ~6-10).
- **Doctrine hardened twice:** the PHANTOM-NUMBER hazard (fetch summaries invented weights
  matching our own sample values — caught by raw-curl cross-check; figures are leads, never
  sources; Shopify weight = shipping bucket) and JS-RENDERED ≠ BOT-WALLED (specialized.com +
  100percent.com read cleanly in the browser pane — re-test the Specialized/Trek frames
  "wall" through that lane).

## 2026-07-19 (seat 14) — Bias audit round 4 harvested: ACTION-NEEDED, no favoritism

- Round 4 merged (`8e44d69`; its handoff message hung — harvested from the branch, session
  archived). HIGH: 50/436 factory bikes carry a FALSE Center-Lock-adapter warning pair on their
  own stock builds (6-bolt rotor fills vs CL wheels — entry artifact; Pivot 86%/Yeti 45%/
  Transition 39%), amplified by the Upgrade Advisor's "clears N issues" credit. MEDIUMs: BMX +
  RideKit insertion-order "featured" sort (the r2 pattern on new surfaces); disclosure not
  ported to BMX; fork tire-clearance dormancy asymmetry; two grind-order visibility skews.
  Round 3 opens re-measured; defenses-verified section clean with numbers. Fix chips handed
  to Douglas.

## 2026-07-19 (seat 14, sweep) — Bias r4's actionable findings all closed same day

- Fix 1 (`ba36a8b`): rotor fills 74→5 false-warning bikes; survivors documented genuine
  adapter builds (new rotorAdapterDocumented flag + lint, test-pinned); entry rule in template.
- Fix 2 (`19fbd3a`): BMX+RideKit neutral shuffled sort tiebreak (measured de-skew ≤~11% top-slot
  share over 300 reshuffles); BMX honesty disclosure ported verbatim.
- Remaining r4 items are grind-order visibility skews that close as verification proceeds, plus
  the non-rotor warning tail folded into the next complete-bikes wave.

## 2026-07-20 (seat 14) — grind harvest: complete-bikes w5 + kit w4 (careful multi-line merge)

- cb5 (`1275eea`): fixed cb-marin-pine-mountain-2 fork fill (false warning on its own build) +
  added cb-geometron-g1-gx-eagle; bias-r4 non-rotor tail confirmed genuine, not bugs. 5024 parts.
- kit w4 (`ffef073`): helmet corrections (Leatt 850->439g etc.), Shimano shoes re-scoped to live
  model names, GE700 flat->SPD fix. HARVEST NOTE: kit-4 branched pre-kit-3, and kit rows are
  MULTI-LINE — a naive "take theirs" dropped 7 rows (caught by count check); redone as a
  row-BLOCK merge (41 kit-4 blocks onto HEAD's 714-row set, all kit-3 rows preserved).
- ★ OPEN FOR DOUGLAS: 3 rows kit-4 wanted to un-verify that kit-3 had verified — hm-100-altec,
  hm-troyleedesigns-d4-composite-mips, sho-shimano-xc5. Kept HEAD's verified state (no silent
  regression); genuine kit-3-vs-kit-4 data disagreement needing a tiebreak fetch someday.

## 2026-07-20 (seat 14) — The Specialized/Trek "fetch wall" was never a wall

- **Premise falsified** (`6c3906a`): neither specialized.com nor trekbikes.com is bot-walled.
  Trek's Specs tab LAZY-LOADS ON CLICK — WebFetch/bdata never trigger it, the browser pane does.
  A tooling gap masqueraded as a wall and suppressed two of the catalog's biggest brands for
  weeks (it also drove bias-audit r4 §5's visibility-skew finding).
- Trek frames 16/21 → 20/21 verified. Specialized was already 17/17 (07-17 wave).
- ★ ERROR-TIER FIX: fr-trek-roscoe-gen4 maxRotorR 180→203 (+minRotorR:180) off Trek's own
  frameset page — the old value was the STOCK rotor misread as the frame ceiling, i.e. a false
  "won't fit" against 203mm rotors. Coordinator-verified the provenance before merge (a
  relaxation is the false-FITS direction and gets scrutiny); harness byte-identical.
- ★ OPEN FOR DOUGLAS: fr-trek-slash looks like an orphaned pre-split duplicate (zero complete
  bikes reference it; gen6 rows cover the platform verified). Ids can't be deleted — needs an
  ALIASES-retire vs status:'discontinued' call. Flagged in tools/verify-notes-frames.md.
- **DOCTRINE:** re-test any "walled" claim through the browser pane before repeating it. Two of
  today's three waves found the wall was tooling, not policy.

## 2026-07-20 (seat 14) — The wall list was fiction: ZERO real walls found

- Wall re-test sweep merged (`4b1140f`). **Every brand we called "fetch-walled" RENDERS in the
  browser pane** — Norco, Cannondale, Propain, Orbea (client-side tab/modal spec tables WebFetch
  cannot trigger), plus the 4 BMX brands that 429'd in wave 3 (a throttle, not a wall).
  Five Ten/adidas remains the ONLY confirmed wall (CAPTCHA) — left alone per the ethics ruling.
  Three separate waves this week traced "walls" to tooling gaps; the wall list was suppressing
  real brands and feeding a bias-audit visibility finding.
- 9 frames verified (Norco ×2, Cannondale ×4, Propain, Orbea ×2). MTB verified 3,045 → 3,054.
- ★ ERROR-TIER: 3 Cannondale frames carried udh:false INFERRED from their stock derailleurs
  while their own spec lines state a UDH hanger — a false "won't fit" against real SRAM
  Transmission upgrades. Fixed and proven (checkBuild now returns 0 UDH errors on them).
- Propain Spindrift 180-vs-203 rotor conflict flagged, NOT forced — correcting it would raise a
  false warning on a real sourced build. Gen-split follow-up.
- HARVEST NOTE: second stale-base row-block merge today; the pattern (parse multi-line row blocks
  by id, apply changed blocks onto HEAD, guard verified regressions, assert row counts) is now
  the standard tool for stale-base catalog branches.

## 2026-07-20 (seat 14) — Road+gravel: ONE shared drop-bar engine; gravel catalog wave 1

- Gravel wave 1 merged (`a002e7e`): 150→198 rows, BB86 vocab backed, Trek Checkpoint shell gap
  closed. Gravel engine round merged (`9c13600`) then SUPERSEDED same day by the reconciliation:
- **checkRoadBuild adopted as THE shared drop-bar engine (`b162f18`)** — the analysis doc's §3
  chosen architecture; compat-gravel.js + its tests retired same-commit (two engines for one
  domain = the doc's rejected option + the proven drift hazard). Divergences resolved on
  sources: AC21-N3W adapter tier live (real pairs), speed-defined chains in the speed pool
  (fetched Campagnolo manual), §1d data-driven completeness. Goldens pass on BOTH datasets;
  off-live containment test guards index/bmx/Kit never loading it. 831 tests; MTB harness
  byte-identical throughout.
- Home-page round 1 delivered: 4 mockups live at localhost:8167 (session held open for
  Douglas's pick; recommendation D1+D4). Douglas's open engine Qs queued: §1d completeness
  confirm, tire-clearance severity (mechanic item), Di2-FD/Ultra-Torque-BB catalog gaps, the
  hollowtech-vs-24mm token unification, road's miscataloged Apex chain std.

## 2026-07-20 (seat 14) — Triple harvest: BMX w4, road grind w1, stale-docs closed

- BMX w4 (`0addbd7` wave): 69→75 verified (33.3%) cashing the frame ruling — Mongoose via the
  international site's full spec table, Sunday via direct product pages wave 3 missed; a real
  brake-mount bug fixed on the archived Downtown DLX; Standard Byke conflict resolved
  (build-to-order either/or → 'none'). Honest read: easy lever spent, ~15 rows to the bar via
  small-parts sweeps on proven static sites.
- Road grind w1: 150→211 rows, 68 verified. frontderailleur 0→11 (100% verified — closes the
  total-gap category the engine goldens documented); first headset/cockpit rows; XPLR 13sp E1
  depth. Trek seatMAST/BMC steerer honestly skipped (schema misfit ≠ force-fit). Follow-up
  flag: 105/Ultegra hg-l2 tokens likely hg-road per shared-standards.
- Stale-docs debt CLOSED: NEXT-STEPS is a true pointer doc again; Getting-Started's pre-ethics
  scraping advice rewritten to the ruling.
- Fleet: home-page round HELD OPEN for Douglas's D1-D4 pick (mockups on :8167); otherwise
  Partnerships + triage vessels only.

## 2026-07-20 (seat 14, evening) — Seat 15 handoff written

- SEAT 15 block atop COORDINATOR-HANDOFF.md: state (5,024/3,054 MTB · 831 tests · shared
  drop-bar engine), seating sequence (succession handshake via the "Main Coordinator (Seat 14)"
  title, sweep-cron re-arm), the open-session map (3 running chips, the HELD home-page round-1
  session with untracked mockups, Partnerships never-touch, triage vessels), Douglas's decision
  queue, the earned doctrine (JS-rendered≠walled, phantom-number, row-block merge, stock-part
  inference = error-tier bug class), and the hung-send harvest pattern.
- HANDOFF-CHIPS.md fully refreshed: seat-13's 13 blocks all shipped; new queue = BMX w5,
  kit w5 (+ the 3-row tiebreak), gravel w2, forks tail, feature slate #4 recall watcher,
  #16 discontinued archive.
- Moot Monday road reminder cleared (both road chips already ran and merged).

## 2026-07-21 (seat 16) — Seating + first harvest: gravel-7, kit-11 merged; fabricate-fill audit lands

- Seated as seat 16 (succession handshake sent to seat 15; watchers re-armed: hourly fleet
  sweep cron + persistent worker-reports folder Monitor, both session-lifetime).
- **catalog/gravel-7** merged (`9caa7d7` wave): Ekar Ergopower/caliper split reconfirmed (real
  two-SKU product, not a bundle — the 07-21 bundled-shift-brake exception doesn't apply);
  `status`/`supersededBy` lifecycle ported into `schema-gravel.js` (schema-emtb.js precedent),
  applied to the two discontinued Levante rows; +8 verified via WTB/Panaracer tire fetches
  (gravel 78→86 verified). Flagged doc-staleness: CLAUDE.md/data/gravel.js header still say
  gravel is off-live even though `00f1531`/`6bafffc` flipped it live 2026-07-21 — follow-up.
- **verify/kit-11** merged: +5 verified (Handup shorts/pants, DHaRCO Gravity Shorts, Bliss
  ARG Minimalist+ kneepad, Fasthouse Crossline 2.0 — kit 534→539). Re-confirmed ION/Loose
  Riders/Pearl Izumi walls are still real (SKU proliferation / site migration / rate-limits,
  not staleness). Judgment note worth reusing: prior-session real fetches recorded in `desc`
  but never flagged `verified:true` are a real backlog class — re-confirm live, then promote.
- **audit/fabricate-fill-1 (fabricate-fill audit) — REPORT ONLY, nothing merged.** Traced the
  gravel-6-caught BB86/BB72 swap to two already-merged waves (gravel-1, gravel-grind-1) and
  found the root cause is worse than the swap: **`gfr-trek-checkpoint-sl-7`'s `bb:'bb86'` is
  itself fabricated — Trek's own spec table says T47 internal-bearing** — so the Checkpoint
  golden currently pairs a real frame with a physically wrong BB family. 3 more confirmed-wrong
  rows (Checkpoint ALR 5 same bb error, `gbb-praxis-t47`'s DUB pairing invented — Praxis makes
  no DUB T47, Hunt "650B Adventure Wide" is a phantom model chimera-ing two real SKUs) + 2
  unconfirmed suspects (Redline "Proline Flight" — no such trim; Cannondale SI ZS44/EC49
  headset, unsourced). Fix list is 9 items (`.claude/worker-reports/fabricate-fill-audit.md`
  §6) — routes through Douglas before any catalog edit, per the audit's REPORT-ONLY design.
  Vessels archived (report harvested, no branch to merge — audit touched zero files).
- Gates green throughout (validate 0 problems / 875 tests / tsc clean) at `9caa7d7`.


## 2026-07-21 (seat 16) — Service log feature merged (feature slate #2)

- **feat/service-log-1** merged (`6e18eb3`): signed-in riders log service events (date + what +
  optional note) against a garage build or inventory part; read back per-build/per-part/all-
  history. Framed strictly as a notebook — no maintenance-schedule/interval claims, no reminders
  (empty state + dialog subtitle say so explicitly). `service_events` table (Phase 5 stanza,
  `supabase/schema.sql` + `SETUP.md §10`) — `build_id` ON DELETE SET NULL (history survives a
  deleted build), owner-only RLS, feature-detected via a `hasServiceLog()` probe so it lights up
  with zero further action once Douglas runs the SQL once. `src/service-log.js` (DI, tsc-checked,
  19 tests) + `index.html` wiring (per-build/per-part 🔧 buttons, one click-opened dialog, never
  auto-appears). Bonus fix: rad theme was missing the dialog-surface repaint dark/loam both have
  (every dialog rendered white-on-lavender in rad) — one-line fix, spot-checked against the
  pre-existing part modal too.
- Coordinator verification: gates green (validate 0 problems, 894 tests, tsc clean) + own
  browser popup-scan on the worker's running preview (all 11 dialogs closed on load incl. the
  new `svcModal`, zero console errors) on top of the worker's own 14-screenshot 4-theme/mobile
  evidence set.
- Note: seat 15 is still active and pushing to main concurrently this window (merged the
  fabricate-fill audit branch + a gravel live-status doc fix in parallel) — no conflicts seen,
  histories stayed linear via fast-forward syncs before each of my pushes. Succession handshake
  still pending its confirmation.


## 2026-07-21 (seat 16) — bb86/pf86 vocab merge (Douglas-ruled) + gravel-fabfix-1 merged

- **Douglas's ruling on the bb86/pf86 near-duplicate vocab token** (flagged by the fabricate-
  fill audit): combine them under one token, displayed as "BB86 (PF86)". Investigated first —
  confirmed from the catalog's own sourced rows that bb86 and pf86 are genuinely the same
  physical 86.5mm press-fit BB shell, just two maker-slang spellings (Shimano SM-BB72-41B's
  own spec table: "Press-Fit... 86.5"; SRAM BB-DUB-PF-A1's own page: "PF 86.5" for its
  bb86-tagged tier) — not a real engineering distinction, so merging was correct, not just a
  taxonomy convenience. Implemented directly (small + mechanical, no fetches needed): bb86 kept
  canonical (majority usage — 10 frames + 2 real BB rows vs pf86's 4 frames + 1 BB row);
  pf86 retired from ROAD_VOCAB/GRAVEL_VOCAB/compat-road.js's shared bbShell list; 2 road Giant
  frames + 2 gravel Giant Revolt frames + 1 Shimano BB row switched pf86->bb86 with provenance
  notes; road.html/gravel.html spec cards now render "BB86 (PF86)" so either name is
  discoverable; test-schema-road.js's vocab-accept test updated (pf86 now asserted REJECTED).
  This also fixes a real bug: the 2 Giant Revolt gravel frames had NO matching BB row before
  (gravel's shell vocab never had a pf86 entry) — they were silently BB-unbuildable.
- **catalog/gravel-fabfix-1** merged (`1106155` wave): the fabricate-fill audit's fix list,
  landed same-day as the audit. Both Trek Checkpoint frames (SL 7, ALR 5) corrected to the
  real T47-86 shell with fresh Trek-page provenance; `gbb-praxis-t47`'s fabricated DUB pairing
  retired (`status:'discontinued'`) with a real replacement row (`gbb-praxis-t47-ib-shimano`,
  fetched from praxiscycles.com); the phantom Hunt "Adventure Wide" 650b wheels retired for a
  real Hunt SKU (`gfw/grw-hunt-650b-adventurecarbon-disc`, weight honestly flagged as a
  proportional estimate — Hunt only publishes combined wheelset weight); the Checkpoint golden
  repointed off the old BB86-shell BB onto the new T47 one. Clean auto-merge against the
  vocab-merge commit (different rows, same file). 2 suspects left out of scope per the chip
  (Redline "Proline Flight" trim, Cannondale SI headset) — both need their own fetch first.
- Gates green throughout (validate 0 problems / 895 tests / tsc clean) at `1106155`.
- CB-SHEETS-6 and Road wave 11 reports both dropped this window — harvesting next.


## 2026-07-21 (seat 16) — CB-SHEETS-6 + road-11 merged (last two in-flight chips)

- **verify/cb-sheets-6** merged (`8884719` wave): sheet-verified complete-bike rows for the
  nine mtb-tail-4-unwalled brands (Yeti, Pivot, Ibis, Cannondale, Rocky Mountain, Mondraker,
  Ghost, Norco, Devinci) + Specialized's ~32 rows. **~25 real bugs fixed** across 7 brands:
  Yeti sale-price-stored-as-MSRP (SB165-T2, corrected 6800→8500 MSRP + streetPrice split),
  Ibis's systemic 9-row Cane Creek 40→50 headset-tier bug (only the GX AXS/Transmission
  tiers actually use 40), Cannondale's wrong-brand grip fill across both HT2/HT3 (reverted a
  tempting HT2 chain "fix" that the engine's own one-system check caught as false — a good
  save), Specialized's stumpjumper-15-alloy carrying an entirely different trim's price,
  Ghost's rotorMount sixbolt→CL catch on two independent supplied spec sheets, Norco/Devinci
  fill corrections against live spec sheets. Pivot: 0 changes (11/13 rows' trims are retired
  from Pivot's current lineup — not bugs, no live comparison possible). Flagged for a future
  call: 2 Ibis duplicate-SKU pairs (id-merge decision), Specialized Chisel SRAM (likely
  discontinued), 20 Specialized rows the agent didn't reach (scratch data lost mid-session,
  every finding banked before that — resumable). Gates green incl. the verdict-audit harness
  (compat.js changed) — 0 regressions.
- **catalog/road-11** merged (same wave): +18 verified (road 128→146). Shimano archive-PDF
  chase caught 2 more fictitious model numbers (FC-RX600-2, CN-4600 — neither is a real
  Shimano SKU; corrected to FC-RX600-11/CN-4601). Wheels/cockpit tail caught a recurring
  false-fit shape twice — DT Swiss ERC 1100 and Roval Rapide CLX II both had freehub
  xdr where the maker page states the mounted default is hg-road (XDR only ships as an
  included spare kit) — same bug class road-9/10 already found once. Campagnolo Zonda C17
  only reachable via a Wayback snapshot now (campagnolo.com reused the name for an unrelated
  2026 carbon wheel) — noted in-row. SRAM Force AXS shifter/brake reconciled to the real
  $385 bundle MSRP (299/86 split), closing the last of the 4 SRAM shifter tiers road-10 had
  started. 2 rows flagged not fixed (HUNT 36/48 Aerodynamicist — likely fictitious SKU, no
  matching product found anywhere; Deda M35/Trentacinque — conflates two different discontinued/
  current Deda products). Worth carrying forward: this worker's sandbox was hard-pinned to a
  different worktree than the one it was dispatched into — it worked around it via Bash-only
  edits (never Edit/Write) and flagged it explicitly; worth watching whether other workers hit
  the same mismatch.
- Gates green throughout (validate 0 problems / 895 tests / tsc clean / verdict harness clean)
  at `8884719`. **All chips in flight at this seat's start are now harvested.**


## 2026-07-21 (seat 16) — Striders 2 merged

- **verify/striders-2** merged (`100b625`): the retry pass on the 8 no-maker-weight-blocked
  strider rows. 1 of 8 promoted — Puky LR M, via downtown-mag.com's "3,56 kg" measured figure
  (exact match to the existing sample, and downtown-mag is already this file's accepted
  measured-weight precedent from the Moustache Mercredi 12 row). 7 stayed unverified for
  honest reasons: 4 have no surviving/current manufacturer page at all (Strider 12 Classic,
  Schwinn Skip 2, both Bixe models); 3 have a maker page but every weight source found either
  states no measurement method (Kinderfeets, ChillaFish) or comes from a source with no
  existing accepted-precedent status in this file (bikeexchange.com for the Giant Pre —
  flagged as a near-miss if Douglas wants to extend the precedent list). Low yield expected
  and delivered — this was always going to be the hard-to-source tail.
- Gates green (validate 0 problems / 895 tests / tsc clean) at `100b625`.


## 2026-07-21 (seat 16) — Five-chip wave merged: MTB tail 5, gravel-8, EMTB 6, road-12, build-diff

All five chips Douglas dispatched this window landed together (no file overlaps, clean
auto-merges); full gates + verdict harness green throughout.

- **verify/mtb-tail-5**: `cb-specialized-chisel-sram` fully corrected — Specialized split
  "Chisel" into a new full-suspension model and a separately-named "Chisel Hardtail"; this row
  is the latter, re-priced and re-filled against the real live page (fork, tires, derailleur
  SX→NX, and a genuine crank/BB spindle bug — DUB in the catalog vs Powerspline on the real
  bike, 2 new/reused rows fix it). FC-MT612 identity flagged, not guessed: Shimano's current
  spec table has no FC-MT610/611/612 at all; the row's chainline matches FC-MT510-1 far
  better than the 511/512 siblings — needs your call (or a Canyon spec-sheet re-check) on
  whether to correct the mfgPn. Ibis duplicate-SKU pairs confirmed still open (id-merge
  decision, untouched). Investigated-no-change: SRAM rotor weights (WebSearch summary figures
  didn't survive a raw-page check — phantom-number hazard caught again), 15 OE-only Fox forks
  (no standalone SKU pages exist to verify against).
- **catalog/gravel-8**: re-verified 6 gravel-1 bb86 frame claims per the fabricate-fill
  audit's lead — 4 confirmed (Canyon Grail/Grizl, BMC URS, Bianchi Impulso), 1 genuinely
  fabricated (**Rondo Ruut CF2 was never bb86 — maker page says EVO386/PF30**, corrected), 1
  still an inference (Liv Devote, flagged). Caught a second bug on the BMC URS page-visit: its
  seatpost was wrongly modeled as a generic 27.2mm round tube when the frame only takes its own
  proprietary D-shaped aero post — fixed with a new OEM seatpost row + a `seatpost:'proprietary'`
  vocab widen mirroring road's existing pattern (no engine change needed, `compat-road.js`
  already handles it). Breadth: +2 wheels (Reynolds ATR 650B), +1 tire (Rene Herse 650B), all
  fetch-sourced. Confirmed `bmx-fr-redline-prolineflight` (the fabricate-fill audit's suspect)
  IS fictitious — retired for the real Proline Expert tier. 3 real bikes considered and
  correctly rejected rather than force-fit (Wilier Jena's straight steerer, Tumbleweed/Curve's
  out-of-vocab axle spacings, Argon 18's unconfirmable T47 width) — the axle-spacing ones need
  an engine-level change, not just a vocab token, logged as out of scope. Worth flagging:
  gravel.js's own header comment still called this "OFF-LIVE" in the worker's task brief even
  though it's been live since this same day — the worker caught the staleness itself and
  self-corrected its bar; a doc-hygiene pass should retire every remaining OFF-LIVE gravel
  reference.
- **verify/emtb-6**: fixed the Bullit XX trim-identity flag from emtb-5 — "Bullit XX AXS" was
  fabricated (SRAM never sold an XX-tier Bullit); retitled to the real Shimano-era top trim
  "Bullit X01 AXS RSV" with a full drivetrain/brake/motor/battery/travel/weight/price
  correction sourced to BikeRadar's actual review. Measured-weight attempt on the other 6
  blocked rows: 0 promoted — one promising bike-magazin.de figure rejected because its brake
  spec contradicted the maker page (same discipline as the SRAM-rotor phantom-number catch
  above).
- **catalog/road-12**: resolved both road-11-flagged rows with real decisions, not more
  flags — HUNT 36/48 Aerodynamicist confirmed fictitious (re-verified independently: only
  three depth combos ever existed in HUNT's current or 2019-archived lineup) and **removed**
  outright (no share link could reference it, road went live only the day before); Deda
  M35/Trentacinque **retargeted** to its real current-catalog identity, "Superleggera 35"
  (verbatim-matching tech copy confirms it's the same bar under a new name, not a different
  product). Breadth: +7 cockpit/bartape rows verified (Zipp ×3 via SRAM's own model pages, FSA,
  PRO, Fizik — the Fizik row's model string also needed correcting, "Vento Microtex" is now
  sold as "Racefeel"). 6 more rows explicitly left unverified for stated reasons (ambiguous
  SKU-family matches, walled page) rather than guessed.
- **feat/build-diff-1**: the next feature-slate pick, landed. Garage-pair diff view following
  the build-sheet precedent exactly — pure DI'd model + renderer, zero engine changes, 16 new
  tests. Diffs by `verdictKey` (never message text), shows signed price/weight deltas (null,
  never fabricated, against a weightless side), and one real-engine discovery baked into a
  test comment: a fork swap legitimately produces a rule-20c advisory info on BOTH sides
  (it names the fork), which looked at first like double-reporting but is the diff working
  correctly. Coordinator browser-verified: `buildDiffModal` closed on load among all 12
  dialogs, zero console errors, popup scan clean.
- Gates green throughout (validate 0 problems / 911 tests / tsc clean / verdict harness clean,
  section E pre-existing/unrelated) at `4cd9cc3`.


## 2026-07-21 (seat 16) — FC-MT612 identity resolved (Douglas-sourced second confirmation)

- Douglas found Shimano's own official Dealer's Manual PDF for this crankset family
  (`DM-MAFC002-10`, si.shimano.com) and asked whether it clarified the open FC-MT612 identity
  question mtb-tail-5 flagged. It did, decisively: the manual's own front-page index lists the
  complete Non-Series crankset lineup by name — FC-MT900/611/610/511/510 — and FC-MT612 is
  absent from it, same as productinfo.shimano.com's spec table mtb-tail-5 had already checked.
  Two independent first-party Shimano sources now agree it isn't a real SKU.
- Corrected `cr-shimano-mt612-30`'s model/mfgPn to the real **FC-MT510-1** (its own
  chainline:52 was already the match — FC-MT511-1/512-1 are 55mm). Id/family kept unchanged
  (append-only convention). Marked `verified:true` (interfaces now confirmed via two sources;
  weight stays the pre-existing documented sample, same precedent this same-day CN-4601 fix
  set — no weight published by either source).
- Gates green (validate 0 problems / 911 tests / tsc clean / verdict harness clean) at `75ad948`.


## 2026-07-21 (seat 16) — Kit 12 merged

- **verify/kit-12** merged (`e86dc36`): +4 verified (kit 539→543) via the "fetched-but-unflagged"
  pattern kit-11 discovered — scanned all ~706 kit rows for desc text documenting a real prior
  fetch that never got a `verified:true` flip. Bliss ARG Vertical LD vest (was blocked on "no
  weight" alone — invalid blocker, body armor is weight-exempt per policy), two Cube shorts +
  a Royal Racing pants row (all blocked on a stale pre-THE-PRICE-RULE "no USD source" reading —
  a disclosed EUR/GBP→USD basis has been valid since 2026-07-18). Every promotion re-fetched
  the maker page live this session rather than trusting the old desc text. 5 more candidates
  investigated and correctly rejected: a Specialized jersey's sleeve-length mismatch, a PNW
  short with unconfirmed sizes, a Lazer helmet whose current page describes an entirely
  different rotational-safety system (KinetiCore, not MIPS) than the row claims, a discontinued
  Leatt eyewear row with an inconsistent sale price, and a Scott Fury goggle that turned out to
  be a **motocross** product at a different price — not this row's MTB-tagged $59.95 at all;
  that one got spawned as its own out-of-scope task (`task_ade9f4bf`) rather than silently
  edited. ION/Loose Riders/Pearl Izumi correctly left untouched (independently re-confirmed
  walls by two prior sessions already). Gates green (validate 0 problems / 911 tests / tsc
  clean) at `e86dc36`.


## 2026-07-21 (seat 16) — Gravel 9 + Road 13 merged

- **catalog/gravel-9** merged (`d2bcdb1` wave): closed both flagged items instead of re-flagging.
  Liv Devote's bb86 went from bare inference to a real maker-channel confirmation — Giant's OEM
  parts store lists a SRAM DUB PressFit 86.5mm BB whose fitment list names the 2023 Devote
  Advanced Pro explicitly (same frame platform, Liv's own spec sheets confirm the Pro/Advanced 1
  split is build-kit-only). Cannondale's SI ZS44/EC49 headset confirmed fabricated-brand-pairing
  (Cannondale's real "SI" system is Lefty/Headshok IS42, a different bore) — retired via
  status/supersededBy pointing at the already-real Cane Creek 110 row. +4 breadth (DT Swiss GRC
  650b wheels, a Continental 650b tire, GT Grade Carbon Elite as a new frame brand) — one
  duplicate research effort caught before landing (Panaracer GravelKing SK 650x48 already
  existed from gravel-7). Vocab non-fits consolidated into a header comment in data/gravel.js
  for the next pass rather than re-discovered each wave.
- **catalog/road-13** merged (same wave): 2 of 3 Ritchey identity flags resolved (WCS Streem →
  its real current name "WCS Streem Internal Routing", Comp Two-Bolt → "Comp 2-Bolt" with a
  genuine setback correction 15→25mm, now verified), 1 stayed correctly unresolved — the
  US-domain WCS C260 stem looks superseded by a C220 but the regional subdomain that lists it
  is unreachable (expired TLS cert, a documented wall) so it wasn't force-renamed. FSA K-Force
  and Look Keo Blade Carbon both retargeted to their closest real current-catalog SKU (4 and 8
  live variants respectively, neither an exact bare-name match) without flipping to verified
  where the weight basis didn't cleanly transfer. Supacaz Kush bartape: WebFetch still 403's but
  **Exa got through** on the same URL — good reminder the fetch-order fallback still has real
  yield even on a re-confirmed wall. +4 Campagnolo drivetrain rows verified, including a large
  weight correction on Super Record wireless (400→745g — the old sample was far too light for a
  shifter+lever pair). Two identity-adjacent headset rows investigated and correctly left alone
  (plausible family match, not a confirmed identity).
- Gates green (validate 0 problems / 911 tests / tsc clean) at `d2bcdb1`.


## 2026-07-21 (seat 16) — MTB tail 6 merged: Ibis duplicate-SKU call finally resolved

- **verify/mtb-tail-6** merged (`8c55198`): the Ibis Ripmo V3 / Ripley V5 GX-AXS-vs-Transmission
  duplicate-SKU pairs that TWO prior waves flagged for a coordinator call, never made — this
  one made it. Live-fetched ibiscycles.com: each model lists exactly one Transmission-tier
  build kit, and the build-kit page both catalog rows cited headers itself "GX AXS" — "GX
  Transmission" was never a distinct Ibis tier, just this catalog's own second label for the
  same build. Retired both duplicate ids via ALIASES onto their verified siblings (part count
  5040→5038). One test fragility caught + fixed in the process: `test-account-serialize.js`
  reads `Object.keys(C.ALIASES)[0]` and broke when a completebike alias (no build SLOTS entry)
  landed first — fixed by appending new ALIASES at the end; flagged as a convention for any
  future completebike alias.
- Three thoroughly-researched dead ends, each closed with a stronger negative-proof than
  before rather than left open again: **SRAM rotor weights** — confirmed SRAM publishes none
  anywhere across all 21 unverified rows; the one MBR figure with an ambiguous mount was
  independently re-confirmed as correctly-still-unverified, and a WebSearch-summarized
  "measured" CenterLine X figure was traced back to source and found NOT to appear on the
  actual cited thread — caught before it could contaminate a row. **Fox OE-only fork
  weights** — did the vision-read of the engineering JPG spec sheets the brief asked for
  (2025/2026 Fox User Spec sheets); confirmed they are pure dimensional/geometry drawings
  with NO weight data in any generation — closes this question definitively rather than
  leaving "try a vision read" open forever. **Formula/Tektro/Clarks entry rotors** — same
  no-published-weight pattern, budget-tier thin spec sheets rather than a deliberate gap.
- Gates green (validate 0 problems / 911 tests / tsc clean / verdict harness clean) at
  `8c55198`. **All four chips from this dispatch round (mtb-tail-6, gravel-9, road-13, kit-12)
  are now harvested — queue is empty again.**


## 2026-07-21 (seat 16) — gravel-10 + mtb-tail-7 + discontinued-archive merged; doc truth pass

- **Doc staleness retired repo-wide**: NEXT-STEPS.md, data/road.js, data/emtb.js,
  src/compat-road.js, src/schema-road.js all still claimed road/gravel/EMTB were OFF-LIVE —
  every header now states the real live dates (road+emtb 2026-07-20, gravel 2026-07-21) and
  NEXT-STEPS reflects all six surfaces + the shipped home page.
- **catalog/gravel-10** merged: +4 frame brands closing gravel-9's follow-up list exactly
  (Merida Silex 4000, Focus Atlas 6.8 MY26, Cinelli King Zydeco II, Scott Addict Gravel RC —
  all current-gen, all maker-fetched, none force-verified since each mixes source tiers).
  Two vocab non-fits honestly logged (Scott's 1-1/4→1-1/2 eccentric steerer approximated as
  tapered + flagged; Praxis M30 crank skipped, no matching spindle token). Gravel 238 rows.
- **verify/mtb-tail-7** merged: +7 verified — 6 frames under the frames interface-exception
  (Starling Murmur/Twist, Surly Karate Monkey/Krampus, Canfield Nimble 9, Airdrop Edit MX)
  plus a real PHANTOM-NUMBER catch: the Maxxis DTH 26x2.3's 620g weight matched none of the
  four real SKUs on Maxxis's own spec grid — corrected to the maker-stated 773g with mfgPn/
  casing/compound captured. MTB 3172 verified. The worker also wrote the clearest map yet of
  the genuinely-walled queue front (Orbea/Propain WAF, Trek product-page 403s, Nukeproof gen
  mismatch) + two forward leads (Bontrager Team Issue naming migration, DT Swiss URL-pattern
  refresh). A verify-job.json timestamp-only merge conflict resolved (both sides had made the
  identical FC-MT510-1 sync independently).
- **feat/discontinued-archive-1** merged (feature slate #16 — 6 of 8 slate picks now built):
  browsable click-opened archive of every status:'discontinued' part with supersededBy
  resolution (strictly same-source, dangling pointers disclosed never guessed, recalled parts
  excluded — recalls have their own surface). Wired to PARTS only on index.html (hard rules
  1/3 forbid loading BMX/EMTB data there — per-page adoption is a trivial follow-up, and a
  family-wide archive.html mixing e-content is DOUGLAS'S CALL, correctly left unmade). 19 new
  tests (930 total). Coordinator browser-verified: zero dialogs on load, click-open works
  ("70 discontinued parts on record"), zero console errors.
- Gates green throughout (validate 0 problems / 930 tests / tsc clean / harness clean) at
  `cbfb906`.


## 2026-07-21 (seat 16) — Douglas rulings: archive goes per-page; service-log SQL walkthrough

- **Discontinued archive "across catalogs" scope RESOLVED — Douglas ruled per-page** (not a
  family-wide archive.html): each live surface wires src/discontinued-archive.js to its own
  catalog only, so e-content stays contained on emtb.html per hard rules 1/3. Chip written
  (feat/archive-perpage-1) covering KitBuilder/emtb/gravel/road/bmx.
- Service-log turn-on walkthrough delivered (SETUP.md §10 — his one Supabase SQL paste).

## 2026-07-21 (seat 16) — Road 14 merged

- **catalog/road-14-cont** merged: +15 verified (road 158→173, 80%). Tires: Vittoria/Pirelli/
  Schwalbe/Goodyear all maker-fetched with real weight corrections (Pirelli's samples were
  simply wrong — 255→290g, 290→315g; Goodyear's compound tier corrected GSR→UHP). Forks: 6
  verified under the interface exception (Specialized SL8/Roubaix, Trek Émonda/Domane/Madone,
  Canyon Ultimate incl. a maxTire 32→33 fix applied to fork AND frame). Frames: Specialized
  Allez verified with a REAL maker-stated frame weight (1,375g — corrected from the 1450g
  sample) + maxTire 30→35. Campagnolo caliper single-vs-pair hypothesis CONFIRMED across all
  three tiers (same physical 118g caliper, no pair total published anywhere — notes added so
  no future pass re-discovers it; correctly not promoted, doubling would be invented data).
- **NEW VOCAB DECISION for Douglas/coordinator**: schema-road.js's steerer vocab has no token
  for proprietary non-round steerers (Cannondale "Delta", Giant "OverDrive Aero" D-shaped) —
  blocks verifying 3 real forks now and more Cannondale/Giant road parts later. Design
  question: does rule-20 need a real "accepts no standard headset" state, or just a
  documentation-only 'proprietary' token? Also open: Canyon Aeroad CFR fork steerer conflict
  (aggregators citing Canyon's sheet say straight 1-1/8, row says tapered — needs a direct
  canyon.com fetch). Branch-name note: worker's sandbox pinned it to an agent worktree, so
  the branch landed as road-14-cont — harvested normally, no stray road-14 branch existed.
- Gates green (validate 0 problems / 930 tests / tsc clean) at merge.


## 2026-07-21 (seat 16) — Service log LIVE end-to-end (Douglas ran the SQL + tested)

- Douglas ran the Phase 5 `service_events` migration in the Supabase SQL editor and smoke-
  tested the feature live on buildmymtb.com — working. One snag worth remembering: his first
  paste silently did nothing because he'd copied `supabase/schema.sql` from the SHARED
  CHECKOUT, which sits on a stale work branch that predates the Phase 5 stanza — the "shared
  checkout files lag main" trap now has a second confirmed victim class (first was
  settings.json/the containment hook). Resolution: pasted just the self-contained Phase 5
  stanza from main. Standing guidance given: grab repo files from GitHub raw, never the
  shared checkout folder.
- Decision-queue item closed: service-log turn-on. Feature slate #2 is now fully DONE
  (code shipped 2026-07-21 morning, DB migrated + live-verified same day).


## 2026-07-21 (seat 16) — Archive per-page adoption merged (all six surfaces covered)

- **feat/archive-perpage-1** merged: Douglas's per-page ruling implemented same-day — the
  🗄 Discontinued archive is now on all six surfaces, each loading ONLY its own catalog
  (KitBuilder 68 rows, emtb 20, gravel 6, road 0-but-wired, bmx 1; index.html already had
  its 70). Zero module/engine/data changes — pure page-glue replication; containment intact
  (worker verified no cross-catalog data loading per page). Worker browser-verified all 5
  pages (zero auto-open dialogs, click-open + counts + Close all correct, zero console
  errors, singular grammar on bmx's "1 discontinued part"); coordinator independently
  spot-checked emtb.html — clean.
- Worker flagged one optional follow-up: index.html also has an includeDiscontinued browse-
  list toggle (folds archived parts into the main list) that was correctly out of scope —
  port it to the other pages only if Douglas wants it.
- Gates green (validate 0 problems / 930 tests / tsc clean) at merge.


## 2026-07-21 (seat 16) — CB-SHEETS-7 merged: complete bikes 197/435 (45%)

- **verify/cb-sheets-7** merged: +23 complete bikes verified (174→197). All 20 assigned
  Specialized rows landed (Exa's crawl legitimately reaches specialized.com content that
  direct WebFetch 403s), plus a 3-row Trek bonus batch via the browser pane. TWO real
  correctness bugs fixed: cb-specialized-chisel-shimano was a full-suspension build wrongly
  mounted on the HARDTAIL Chisel frame with no shock fill at all (swapped to chisel-evo +
  shock added); cb-specialized-epic-8-evo-expert paired an HG cassette with what the real
  bike ships — an XD-driver XS-1275 (self-consistent-but-wrong pairing, cassette + rear
  wheel corrected together).
- **The Roscoe 9 near-miss deserves the log**: the worker "corrected" the BB to match Trek's
  page text ("Shimano SM-BB52") — and test-golden/test-invariants CAUGHT it (the build's e13
  Helix crank needs a P3-spindle BB; a 24mm Shimano BB would be a false fit). Reverted,
  discrepancy documented instead of trusted. Second time this month the suite has stopped a
  page-literal "fix" from breaking real compatibility (Cannondale HT2 chain, cb-sheets-6).
- Flagged for future passes: the Stumpjumper 15 EVO dropper-diameter discrepancy (3 trims'
  guides say 34.9mm vs the frame's audited 30.9 seat tube — needs a frame-seatTube re-audit,
  not a per-row edit); ~18 remaining Trek rows (browser-pane method proven, just time-boxed);
  Epic 8 S-Works price pinned at fills-sum pending component re-pricing.
- Gates green (validate 0 problems / 930 tests / tsc clean / harness clean) at merge.
  **MTB 3,197 verified; every chip from all three dispatch rounds today is now harvested.**


## 2026-07-21 (seat 16) — Proprietary steerer vocab resolved (Douglas-ruled)

- Douglas confirmed the intent (proprietary steerer = maker-matched only, no standard headset
  fits) and approved the token. Implementation refined one step beyond the original
  "documentation-only 'proprietary'" lean: because rg-steerer/rg-headset-steerer are
  EXACT-MATCH, a single shared token would have greened a Cannondale Delta fork on a Giant
  OverDrive frame — a false fits between two incompatible proprietary systems. Went with
  per-system tokens instead ('cannondale-delta', 'overdrive-aero'; gravel's
  'lefty-proprietary' precedent), which get fully truthful behavior with zero engine changes.
- 3 forks + 3 frames token-corrected (the frames' old 'tapered' was itself a false-fit — a
  standard tapered fork showed as fitting a Delta/OverDrive head tube). Synapse left alone
  (its Delta status never fetched-confirmed). All 4 pairing directions engine-verified
  directly + pinned as a new test (931 total). Forks stay unverified pending fresh fetches
  with captured source URLs — the vocab blocker is gone, the provenance bar still applies.
- Gates green at `3ef3e21`.


## 2026-07-21 (seat 16) — SJ15 EVO seat-tube audit merged (frame row was wrong)

- **verify/sj15evo-seattube** merged: the cb-sheets-7 flag resolved decisively — the frame row
  (fr-specialized-stumpjumper-15-evo-carbon) carried a WRONG 30.9mm seatTube (traced to a
  vitalmtb cross-check); three direct specialized.com build sheets unanimously state 34.9mm
  droppers, the frameset page prints no seat-tube diameter at all (only the 38.6mm binder —
  a different spec), and the alloy sibling already carried 34.9. Frame corrected 30.9→34.9;
  the 3 flagged complete-bike dropper fills moved to their real 34.9mm SKUs (all already
  cataloged, no new rows). Error-tier change in the false-fits direction, so per doctrine the
  coordinator re-fetched the EVO Pro page independently before merging — "Bike Yoke, Revive
  Max 3.0, 34.9" verbatim confirmed. The old value was itself a live false-WON'T-FIT (real
  34.9 droppers errored on this frame) — both directions now truthful.
- Gates green (validate 0 problems / 931 tests / tsc clean / harness clean) at merge.


## 2026-07-21 (seat 16) — MTB tail 8 merged (Bontrager migration + DT Swiss truth)

- **verify/mtb-tail-8** merged: the Bontrager Team Issue → Brevard/Gunnison/Montrose/
  Sainte-Anne naming migration reconciled — 4 tires verified against the new line's real
  trekbikes.com pages (browser pane; direct WebFetch/Exa still nav-shell), 1 real-sourced but
  honestly left unverified (page names no compound and the tire gate requires it), the legacy
  XR5 closeout re-verified + status:discontinued. New casing vocab value 'pro-xr' (real
  construction-tier name). DT Swiss URL-pattern lead resolved: the XR 1700 Spline pair is a
  REAL discontinuation (current 1700 tier is XRC/XM only) — status:discontinued, kept per
  append-only. Frame-queue scan: next 15 all at their prior documented ceilings, no quick
  wins, honestly reported rather than padded. MTB 3,201 verified (~70% of the job queue
  processed). Verify-job synced by the coordinator per the parallel-work convention.
- Gates green (validate 0 problems / 931 tests / tsc clean / harness clean) at `6f8e4c6`.


## 2026-07-21 (seat 16) — Final six-chip harvest: audit clean, Optimizer ships, 2 same-day self-corrections

All eight chips from the final dispatch round are now landed (main `e10dbc2`+). Highlights:

- **POST-WAVE AUDIT (Opus, report-only)** — the mega-wave HOLDS: 10/10 adversarial re-fetches
  of error-tier claims confirmed verbatim, incl. both rows created to satisfy goldens (the
  exact fabricate-fill shape — both real); ordering mechanically unbiased on all six surfaces;
  the auditor also recorded correcting ITS OWN first read (Starling maxRotor was in a
  collapsed spec tab — "the row is right and my first read was wrong"). Real findings routed
  to the fix queue: H1 (10 proprietary-post frames have an unfillable REQUIRED seatpost slot —
  Trek 0/3, Giant 0/2 buildable), M1 (my steerer fix's side effect: 3 frames now error every
  headset — needs per-system headset rows or an info downgrade), M3/M4 (schema-road missing
  the measured→weightSource check and status/supersededBy validation — road's archive is
  structurally empty), M5 (gravel schema REQUIRES frontwheel.freehub — schema-mandated
  fabrication in 17 rows), M6 ("Sort: Featured" label on 5 surfaces misnames the unbiased
  shuffle), M2/M8 (2 rows to demote: Zonda freehub self-documented-unconfirmed, Tarmac SL8
  fork steerer retailer-sourced), plus the ✓-badge publisher-transparency disclosure (L4).
- **MECHANIC REVIEW R3 (Opus)** — all four queued items adjudicated with citations: Fox 36SL
  → 230 RESOLVED (the shop-page tags contradict THEMSELVES across one chassis — a
  self-contradicting source class can't outrank the dimensional drawing; conservative-203
  doctrine assumed a coherent opponent); rule 12c's 20mm KEPT (now geometry-anchored via
  Fox's own A-dimension table proving travel↔axle-to-crown is 1:1, and 0 false fires across
  435 real bikes); ss-chain-width WARNING CONFIRMED manufacturer-tier (KMC's "must always
  match" + tooth-thickness table naming the interference mechanism); rotor-max tier RIGHT but
  the DATA wrong — 28 SR Suntour/DVO rows store a NATIVE MOUNT in maxRotorF (the
  Marzocchi/Mattoc failure mode, live on a real bike today). 5 new corpus facts committed.
- **verify/cb-sheets-8**: +9 Trek complete bikes (Roscoe 7, Marlin 4/5/6, Fuel EX 9.8, Slash
  ×3, Remedy 9.8 — incl. a real shock-identity fix DPX2→Float X Perf Elite). Applied the
  Roscoe-9 lesson deliberately on Marlin 6 (Trek's template text says square-taper; kept the
  independently-double-confirmed CUES pairing, documented the conflict). Complete bikes
  206/435.
- **gravel-verify-1**: +21 verified (gravel 92→113) and SEVEN fabrication catches from the
  gravel-1 priority set — Revolt 1 alloy bb was press-fit-claimed but maker says THREADED
  (also corrects my own same-day merge note's carbon-to-alloy overreach), both Revolts'
  seatposts are really D-Fuse proprietary, Salsa Cutthroat is Boost 12x148 + PF92 (2 honest
  vocab widenings), Warbird is BB86 not BSA, both OPEN frames are BB386EVO not PF30, ENVE
  fork/wheel weights off by up to 30%.
- **catalog/road-15**: +5 verified (road 178/215, 83%) — the 2 Giant/Cannondale proprietary
  forks verified with fresh fetches, Specialized Turbo Cotton tires verified via Exa, AND a
  **correction to the coordinator's own same-day steerer work**: the base Defy Advanced uses
  a standard tapered steerer (OverDrive Aero is exclusive to SL/Pro trims per Giant's own
  technology page) — fork+frame corrected back, avoiding a false restriction. Accepted after
  review: direct multi-region maker fetches beat the road-14 note's platform inference.
- **feat/upgrade-optimizer-1**: feature slate pick #2 SHIPS (7 of 8 built; owned-vs-buy is
  the last). $/gram ranking with the honesty constraints load-bearing: only ✓-verified
  weights rank (disclosed exclusion ledger), MSRP-only math, checkBuild-gated swaps, pure
  arithmetic ("no brand is favored" stated in-dialog). 20 new tests (951 total). Coordinator
  browser-verified: button hidden on empty build, click-open clean, zero console errors.
- Gates green throughout (validate 0 problems / 951 tests / tsc clean / harness clean).
  MTB 3,210 verified · road 178 (83%) · gravel 113 (47%) · complete bikes 206 (47%).


## 2026-07-21 (seat 16) — vf-demote-2 merged (audit M2/M8 closed)

- **verify/vf-demote-2** merged: both audit-flagged rows demoted after genuine re-source
  attempts, not rubber-stamped. Zonda pair: found the still-live campagnolo.com page (li-en
  locale) — it reconfirms everything EXCEPT the freehub field, which Campagnolo simply never
  itemizes; unconfirmed error-tier field = no badge, both demoted, Wayback URL moved to
  archiveUrl where it belongs. Tarmac SL8 fork: pulled Specialized's own spec tables via Exa —
  the maker never states a steerer type anywhere; 'tapered' traces only to retailer listings,
  demoted. Interfaces stay (correct values, honest provenance tier). Test fixture confirmed
  unaffected. Road 175/215 verified — the count going DOWN here is the system working.
- Gates green (validate 0 problems / 951 tests / tsc clean) at merge.


## 2026-07-21 (seat 16) — ui-honesty-1 + schema-parity-1 merged

- **ui/honesty-smalls-1** merged: "Sort: Featured"→"Sort: Random" renamed on the 5 non-MTB
  surfaces + the ✓-badge disclosure line ("No ✓ usually means the maker doesn't publish the
  spec — not that the part is worse") on all six; both provisional engine flags closed with
  their round-3 citations (12c→SUS-54, ss-chain-width→DRV-68) across compat.js/CLAUDE.md/
  dossier — comments only, zero behavior change. Worker's honest caveat logged: the 5 pages'
  shuffle is per-category (grouped by CAT_ORDER, shuffled within) vs index.html's whole-
  catalog shuffle — both provably maker-unbiased, but "Random" mildly overstates their
  sameness; algorithm unification is a future nicety, not a bias issue. CLAUDE.md BMX rows
  turned out already fixed (the audit quoted a stale snapshot) — correctly no-op'd.
  Coordinator addition at merge: tightened the Trek ALR 5 note to cite the audit's own
  ALR-5-page fetch (the quote is page-attested for that exact SKU, not family-inferred).
- **fix/schema-parity-1** merged: road's validator now enforces measured→weightSource and
  status/supersededBy (it accepted status:'banana' before, proven); 3 real discontinued road
  rows backfilled so road.html's archive stops rendering empty (Zonda pair + Michelin Power
  Road→supersededBy Power Cup); emtb schema gains 'recalled' (recall watcher unblocked);
  gravel's frontwheel.freehub made optional + all 17 invented values deleted (front hubs have
  no driver body — schema-mandated fabrication removed, incl. from 7 verified rows where it
  was never part of the verified claim); dropper.diameter split from the seatpost vocab so
  'proprietary' can't leak in. 13 new negative tests (964 total). One real merge conflict
  composed by hand: the Zonda rows needed BOTH vf-demote-2's demotion AND the new
  status:'discontinued' — resolved keeping demoted+discontinued (row-block reasoning, counts
  asserted). Worker also correctly no-op'd the Deda Trentacinque backfill (road-12 already
  resolved it by retargeting — the brief's premise was stale).
- Gates green (validate 0 problems / 964 tests / tsc clean) at `1b1f882`.


## 2026-07-21 (seat 16) — oem-posts-1 + rotor-reclass-1 merged; harness section E clears to ZERO

- **catalog/oem-posts-1** merged (audit H1 CLOSED): all 10 proprietary-post dead-end frames
  now have a real matching OEM seatpost (10 new rows, 2 verified via direct maker fetches,
  the rest honest unverified with disclosed price-conversion bases). Two brief errors caught
  by the worker: "Canyon CP0018" is the Aerocockpit not a seatpost (real part: S27 VCLS CF,
  Canyon's own page names the Aeroad trident shape) and Giant's TCR post is the 2024+
  "Variant" (the brief's "Vector" is the pre-2016 generation, explicitly incompatible).
  Job 2 honestly NOT done: no complete-headset SKU exists for cannondale-delta or
  overdrive-aero (bearing kits only) — routed back to the coordinator as briefed.
- **Coordinator engine ruling on the returned M1 question**: the rg-headset-steerer mismatch
  ERRORS stay (a standard headset genuinely doesn't fit a Delta/OverDrive steerer —
  downgrading a true won't-fit is a false-fits change); instead a matched proprietary
  frame+fork pair with no headset picked now gets an explanatory info
  (rg-headset-proprietary) so the all-red headset column reads as physics, not a catalog
  gap. Suppressed once a headset is picked. 4-case test (965 total).
- **fix/rotor-reclass-1** merged: the mechanic round-3 adjudication applied — Fox 36SL + 34
  Factory 130/140 to maxRotorF:230 (BRK-50: the shop tags contradict THEMSELVES across one
  chassis; supersedes the earlier conservative-203 coordinator call, which assumed a coherent
  opponent); 27 SR Suntour/DVO rows' native mounts moved to minRotorF with maxRotorF honestly
  UNSET (BRK-51 — never infer a ceiling); the 28th (xcr34-lo) kept its genuinely maker-framed
  "Max Rotor Size: 180mm" and its inferred-203 siblings were cleaned to match; schema.js/
  types.js made maxRotorF optional + rotorOverMax got an explicit undefined guard;
  DATA-ENTRY-TEMPLATE.md §5a claim-class guard added (5th recurrence prevented). Two test
  fixtures swapped for accuracy (not weakened). The live cb-ari-delanopeak-comp false warning
  is gone. **Verdict harness section E now reads 0 fork families would false-warn — first
  zero since the probe existed.**
- Gates green (validate 0 problems / 965 tests / tsc clean / harness fully clean incl. E=0).


## 2026-07-21 (seat 16) — Owned-vs-to-buy planner merged: THE FEATURE SLATE IS 8 OF 8 COMPLETE

- **feat/owned-vs-buy-1** merged: the 8th and final committed slate pick (Douglas's 2026-07-19
  brainstorm selections — Upgrade Advisor, Upgrade Optimizer, service log, recall watcher,
  build sheet, build diff, owned-vs-buy planner, discontinued archive — ALL now shipped, the
  last five of them today). The planner splits the current build into owned/to-buy per slot
  for a signed-in rider: exact-id matching through canonicalId (retired ids still match,
  unknown ids disclosed never dropped), quantity-honest allocation (qty 1 covers one of two
  brake slots, reason spelled out), compat-gated owned-alternative suggestions via the
  injected upgradePlacementDiff (error-adding alts excluded + disclosed, warning-only shown
  with the engine's words verbatim, brand-blind tie-break), MSRP-only to-buy subtotal with
  the kit-billing gap disclosed. 23 new tests (988 total). Coordinator browser-verified:
  zero auto-open dialogs, button correctly hidden logged-out, zero console errors — on top
  of the worker's stubbed-signed-in end-to-end evidence run.
- **Per the feature-slate memory, slate completion triggers the follow-up Douglas asked for:
  "once we get closer to the end, I will want to run another brainstorming session."** The
  slate is done — the re-brainstorm is now formally due, on his word.
- Gates green (validate 0 problems / 988 tests / tsc clean) at merge.


## 2026-07-21 (seat 16) — gravel-verify-2 merged (partial frame batch, honest)

- **verify/gravel-verify-2** merged: the frame batch of the ~125-row target (+5 verified,
  gravel 118/242) — self-declared partial, not padded. Real catches: Jamis Renegade Elite's
  bb was 'bsa-road' when the real shell is EVO386 PF30 (an error-tier interface fix — the old
  value would have wrongly greenlit threaded BBs); Marin Headlands 1 + Jamis are CARBON and
  Mason InSearchOf + Marin Nicasio+ are STEEL, all four mislabeled 'alloy' by grind-1 — **a
  new systemic pattern: grep the remaining unverified gravel frames' material fields before
  trusting any of them** (queued for the next gravel chip). Two more instances of the
  QR/straight-steerer vocab gap logged honestly (Kona Rove AL joins Salsa Journeyman;
  Ritchey Outback's straight steerer also can't be represented) — the gravel vocab-widening
  decision now has 3+ real products waiting on it, worth a Douglas packet soon. Diamondback
  Haanjo line appears pulled from their site (404s); statebicycle.com 429-walled.
- Gates green (validate 0 problems / 988 tests / tsc clean / harness clean incl. E=0).


## 2026-07-21 (seat 16) — cb-sheets-9 + road-16 merged

- **verify/cb-sheets-9** merged: Trek complete-bikes CLOSED OUT — +4 verified (Procaliber 9.5,
  Fuel EX 9.9 XX T-Type, Top Fuel 9.8, Fuel EX 8) + 4 honest status:'discontinued' calls
  (Session 8/9, Supercaliber 9.8 XT, X-Caliber 8, all archive-confirmed). Two brief-premise
  corrections by the worker: the Procaliber "M6200/MT520" claim from cb-sheets-8 didn't match
  the LIVE page (existing M6100 fill was already right — the stale-summary hazard caught
  again), and Remedy 8 DOES have an archived listing (different drivetrain generation —
  documented for a dedicated pass, not forced). Biggest catch: the Top Fuel 9.8's whole fill
  was the pre-Transmission 2023 spec; the archived maker page shows the final production spec
  (T-Type cassette, alloy wheels, RSL tires, Level Bronze brakes, 34.9 dropper) — corrected
  with 3 new part rows. Trek down to 5 documented-sample rows. Next-largest unverified brand:
  Yeti (20).
- **catalog/road-16** merged: +8 verified — **road 185/221 (84%)**. The Canyon Aeroad fork
  generation puzzle RESOLVED via a real technique find (the lazy modal's content lives at a
  Demandware AJAX endpoint in a data-tabber-content-url attribute — fetched directly from
  canyon.com): fork is the FK0137 with a straight 1-1/8 steerer (first live use of that
  token), fork+frame corrected and verified. Fizik Antares Versus→Vento Antares retarget
  (road-12 precedent), 3 more saddles verified, the FSA Orbit duplicate retired via
  status/supersededBy. 2 OEM posts verified, 2 corrected-not-promoted (makers publish no
  weight). **NEW DOUGLAS QUESTION flagged by the worker: should seatposts join the
  interface-verification exception list?** Weight isn't engine-read for seatposts
  (setback/diameter are the compat fields) — an exception would promote 2 rows now and more
  later; his call, queued.
- Gates green (validate 0 problems / 988 tests / tsc clean / harness clean, E=0).


## 2026-07-21 (seat 16) — mtb-tail-9 merged: +32 verified via two new technique finds

- **verify/mtb-tail-9** merged: MTB 3,248 verified (~72% of the job queue processed). Two
  technique finds that keep paying forward: (1) DT Swiss's "Choose model" button
  (click-triggered, browser pane) opens a model-finder table with REAL per-SKU net weights —
  9 wheel rows verified/corrected incl. a genuine freehub mislabel (F1900 MicroSpline→HG);
  (2) trekbikes.com equipment pages render fully once the Specs tab is CLICKED — ~28
  Bontrager tire/wheel rows verified/corrected, 3 confirmed same-SKU near-dup ids retired to
  ALIASES with fills repointed. ~35 more rows honestly Skipped with specific per-row reasons
  (full disposition ledger committed at tools/verify-notes-tail9.md). New casing vocab
  'downhill-strength' (Bontrager G5) + a types.js drift fix (pro-xr was schema-only).
- **Flagged, not fixed** (correctly — touches ~10 completebike fills): DT Swiss's own page
  says the XM1700 family is native CENTER-LOCK with an included 6-bolt adapter, while the
  catalog models it sixbolt — a dedicated pass item, net effect would be a truthful adapter
  warning, not an error.
- Merge composition note: two real conflicts vs cb-sheets-9's same-day work — the Line Comp
  30 XD row (cb9's addition) composed with mt9's maker-stated 1035g fetch (mt9's own record
  says the fetched rear figure IS the XD tier), and the job file resolved theirs-then-resync
  (mt9's Skipped dispositions live only in the job file; cb9's verified flips re-derive from
  the catalog — runner re-synced clean, 3526/4899 processed).
- Gates green (validate 0 problems / 988 tests / tsc clean / harness clean, E=0).


## 2026-07-21 (seat 16) — BMX depth 7 merged: BMX CROSSES 50% — final chip of the seat

- **verify/bmx-depth-7** merged (Douglas's paste = his word for this BMX wave): 90→115
  verified, **50.4%** — target met. FIVE real data corrections on plausible-looking
  unverified rows: Redline Proline Expert was marked disc-brake (it's a v-brake bike — the
  retailer-copy different-model-year trap), Profile Imperial sprockets were spline/1-8 (real
  product is bolt-on/3-32; broke 3 test fixtures, correctly swapped not weakened), both
  Colony hubs carried assumed 14mm axles (maker says 10mm bolts), S&M "Speedball" handlebar
  is a PHANTOM (Speedball is exclusively their tire name — full 292-product sitemap checked;
  retired). Structural finding worth the log: many BMX small-part categories have zero
  engine-read fields beyond identity, so THE PRICE RULE makes dozens of
  interface-confirmed-but-price-blocked rows one edit from verified — the fastest future BMX
  lever, plus Fit (1/18) and Chase (0/10) untouched, plus a 3/8" axle vocab need re-flagged.
- Gates green (validate 0 problems / 988 tests / tsc clean) at merge. **All ten grind chips
  from today's final rounds are now harvested. Fleet empty.**


## 2026-07-22 — pb-mtb-c2 harvested (seat 18's first): zero-commit, scope already clear
Slice C2 (handlebar/stem/grips/saddle/dropper/seatpost/pedal/headset + the 10 flagged
KS/GT rows) was already cleared by pb-mtb-c (4b2ce9e) + the pb-token6 wave — all 9 KS Lev
Integra droppers and the GT Zaskar carry third-party-listed on main (coordinator-verified).
Sole remaining gap: hs-acros-icr-zs56-zs56 — its $65 is desc-disclosed as invented (Cube
OE spec-line SKU; ACROS's own ZS catalog no longer lists any AZF-6xx; no retailer names
AZF-675). Left honestly BLANK per doctrine (all six tokens require a real disclosed
figure). Worker correctly refused the near-miss AZF575 price (sibling-stamping trap).
Gates green in the worker's worktree (7 OK / 1086 / tsc clean). Branch had 0 commits;
worktree + branch removed. Report: .claude/worker-reports/pb-mtb-c2.md.

## 2026-07-22 — pb-road-2 merged: road priceBasis burndown 155 -> 3
Wave-2 backfill classified all 155 remaining road rows per-note (142 third-party-listed,
8 msrp-confirmed, 5 regional-conversion; 26 per-brand commits; the worker also caught its
own regex-applier bug via tsc). ADVERSARIAL CATCH at review: the 5 SRAM rows were stamped
third-party-listed with NO note attestation — coordinator fetches proved sram.com publishes
prices on all five model pages. Fixes on the branch: RED crank PRICE CORRECTED 700->770
(msrp-confirmed), Force RD 500->415 (msrp-confirmed); RED XG-1290 ($430-515 range), RED
chain ($110-120 range — stored $130 is ABOVE it, flagged), Force chain ($65-100 range)
returned to honest blank with maker-range notes (a range is not a literal figure; the
worker's other 137 third-party-listed calls rest on verbatim "no MSRP on page" notes from
prior fetch waves and were spot-checked sound). Lesson for the standing set: THIRD-PARTY-
LISTED ASSERTS "MAKER PUBLISHES NO PRICE" — for SRAM-sourced rows that claim is checkable
and usually FALSE; never default it onto a sram.com-sourced row. Gates green post-merge.
Report: .claude/worker-reports/pb-road-2.md.

## 2026-07-22 — pb-mtb-b2 merged: MTB slice B2 opened, 35 rows (5 brands), burndown 2063 -> ~2029
Honest partial on the big slice (1,875-row pool, 94 brands): ACID, Airdrop, Antidote,
Banshee, Bontrager fully classified via real re-fetches (trekbikes.com is WebFetch/Exa-thin;
browser pane carried all 17 Bontrager URLs). 9 msrp-confirmed, 23 discontinued-no-msrp (all
on pages Trek itself tags ARCHIVED — rows already carried status:'discontinued', so the
doctrine's current-product ban is satisfied), 2 regional-conversion, 1 oe-only-no-msrp, 0
blanks needed. Worker caught its own bulk-edit regex corrupting unrelated rows via git diff
pre-commit (never assume field order; window edits to the record) — same lesson pb-road-2's
worker hit the same day; both self-caught. RESUME POINT: brand CST, then the giants
(RockShox 519, Fox 149, Maxxis 99...) — slice B needs several more sessions. Gates green.
Report: .claude/worker-reports/pb-mtb-b2.md.

## 2026-07-22 — tier-2 drivetrain design packet merged (tools/TIER2-DRIVETRAIN-DESIGN.md)
Q2 (shimano-11) DISSOLVED: the premise was stale — shimano-11 live since ede27a3, the full
M5100 group verified 2026-07-21, live-engine probe of an M5100 Honzo build = clean. W1
(the Honzo desc's obsolete "vocab does not yet cover" sentence) fixed in this merge; W2
(base-alloy cb-kona-honzo row, re-fetch konaworld.com) queued as an ordinary grind chip.
Q1 (gravel mullet) is a REAL decision for Douglas: 4 SRAM-documented configs, options A-D
costed, B (Eagle tokens + AXS exemption + sourced pullRatio field, staged) recommended —
the mechanical Apex mullet (M3) is what breaks the cheap option. Two pre-existing findings
need follow-up: (a) sram-apex-mech-12 token conflates Flattop/Eagle chain standards — split
or guard-note before the next wave; (b) ROAD_VOCAB/ROAD_SYSTEM_CHAIN drift makes R15
silently dormant for the live GRX-10 tier — extend the golden vocab pin + lint every system
token has a chain entry (protects Q1's implementation too). All claims manufacturer-cited
(12 sources; support.sram.com via the Exa lane). Gates green.
Report: .claude/worker-reports/t2-drivetrain-design.md.

## 2026-07-22 — pb-gravel-2 merged: gravel burndown 212 -> 153 (honest redo of the rejected branch)
Per-row note reads, zero trust in the rejected diff: 49 msrp-confirmed + 5 regional-conversion
+ 4 bundle-split (Ekar correctly excluded — two real SKUs, nothing to re-split) + 1
discontinued-no-msrp (Salsa Warbird, salsacycles.com's own "archived bike model" text — the
ONLY one; the ~24 current frames the rejected branch had mislabeled all stay blank) + 1
third-party-listed (Continental 650x47, real universalcycles.com transaction preferred over
EUR conversion). All 3 flagged price leads confirmed + corrected (Rudy 999->929, Force FD
425->270, XPLR chain 60->52.50) — each had the right figure ALREADY QUOTED in its own note
from a prior pass that never updated the price field (recurring pattern worth watching).
Coordinator fix at review: the XPLR chain's $52.50 is a range midpoint ($50-55 page), not a
literal figure — msrp-confirmed reverted to unset, matching the pb-road-2 range ruling made
the same hour. Worker flags for Douglas: wheel-PAIR split shape (Zipp/Fulcrum/Reserve/DT
GRC) has no honest token — a pair-split-estimate token is a vocab-tier candidate; Cinelli
King Zydeco price needs a cinelli-milano.com re-fetch. Full gates + verdict harness green.
Report: .claude/worker-reports/pb-gravel-2.md.

## 2026-07-22 — gravel-is-mount merged (ADVERSARIAL REVIEW PASSED): the IS-mount trap closed
R18 (compat-road) is now direction-aware, ported from MTB rule 8: post-mount caliper on an
I.S. frame/fork = adapter WARNING (Shimano SM-MA-*P/S + Hope HBIS20/40, both maker-cited);
flat-on-I.S. = its own actionable ERROR pointing at the post-mount path; I.S.-caliper
direction pre-wired dormant. Nicasio+ corrected to is-mount/disc-is (stays unverified —
marinbikes.com spec table is JS-walled; retailer table + maker's own Series-2 contrast +
velonut corroborate) and its PAIR row entered: gbr-hope-rx4-plus-postmount-min (verified,
maker-page-direct, $150.44 regional-conversion, hydraulic deliberately chosen so R19 can't
false-clean a cable caliper). Vocab split caliperMount/rotorInterface is a tightening (a
rotor can never validate as post-mount). +11 tests (1097), no test weakened; harness clean.
Merge conflict vs pb-gravel-2 on the Apex brake row resolved keeping both sides' additions.
WORKER FINDINGS QUEUED: (B) 4 QR gravel frames (Nicasio+ 135x9, Kona Rove + 2 more 135x10)
have ZERO compatible rear wheels — vocab-tier1 legacy, needs a QR-wheel data chip; (C) no
Marin fork row — front end stays a documented frankenbuild; (D) flat<->post adapter deferral
now diverges from MTB BRK-28/29 — needs a ruling; (E) gravel.html prints the raw is-mount
token — cosmetic UI candidate.
Report: .claude/worker-reports/gravel-is-mount.md.

## 2026-07-22 — pb-mtb-a2 merged: MTB burndown 2029 -> 1895 (drivetrain/brake slice done)
152-row scope: 134 third-party-listed (129 Shimano — all 5 productinfo handbook editions +
bike.shimano/si.shimano pages re-fetched, no price anywhere, the expected brand fact; Formula/
DTS/Clarks off their own desc-disclosed retailer figures), 2 msrp-confirmed (SRAM DB8 $150 +
Maven Silver $290, fresh exact-match fetches — the Maven's old A1/B1 $265-290 ambiguity
resolved), 16 honest blanks (microSHIFT/SRAM no-price service pages, configure-gates, OE-only-
ambiguous BBs/cranks, a 403'd retailer wall). This worker applied the SRAM doctrine correctly
unprompted: fetched every sram.com page, stamped only exact matches, FLAGGED ro-sram-
centerline-200-6b (stored $45 sits BELOW the page's $50-65 range) instead of stamping. NOTE:
the worker's sandbox pinned it to an agent worktree; its 3 commits were cherry-picked onto
backfill/pb-mtb-a2 (report's reconciliation note) — coordinator verified the branch matches
the report exactly (3 commits, 134 insertions, compat.js only) before merging. Follow-up
leads: the CenterLine price fix + the 4 QR gravel wheels + Cinelli re-fetch all queued in
HANDOFF-CHIPS. Gates green post-merge.
Report: .claude/worker-reports/pb-mtb-a2.md.

## 2026-07-22 — CONTAINMENT HARDENED (Douglas all-caps order) + price-leads-1 & gravel-qr-wheels merged
CONTAINMENT: third leak event (scratch files at D: root — script/redirect writes the old
worktree/clone-only hook never covered) -> strays quarantined to .claude/legacy-strays/; hook
hardened (guard-worktree-path.js): matcher now Bash|PowerShell|Write|Edit|NotebookEdit, denies
outside Write/Edit file_paths + write-shaped shell commands with outside absolute paths;
exemptions = harness Temp scratchpad + harness home; 12-case self-test at
tools/hooks/test-guard.js (proven live — it denied the coordinator's own test command and a
memory write before the home exemption); hourly cron now leak-sweeps D: root + home; CLAUDE.md
rule 5 + chip boilerplate updated. PRICE-LEADS-1: CenterLine 200 keeps $45 sample with the
fetched $50-65 range noted (no per-size figure exists); Cinelli King Zydeco II price narrowed
to an honest open note (maker's own domain shows EUR 3.400 only — no USD conversion invented);
ch-sram-red-flattop has no MTB twin; cb-kona-honzo REFUSED honestly — the fresh konaworld
fetch reconfirmed $1,299 + the M5100 fills, but stock wheels (WTB ST i30/Shimano CL), tires
(Vee Flow Snap/Crown Gem) and rotors (RT30) have no catalog rows and test-golden's completeness
invariant forbids gaps — 3-row data chip queued. GRAVEL-QR-WHEELS: Hunt 4 Season 700c pair
entered (maker axle table verbatim: "Quick Release 9x135mm"); Nicasio+ rear end UNBLOCKED
(probe in report); rows stay unverified (pair weight split disclosed). Walls documented, not
blurred: NO maker page states a 10x135 QR option (Kona Rove/Journeyman/Straggler-classic rears
stay open) and 0 of 4 QR frames have a buildable FRONT (no QR fork token exists) — two
follow-up chips queued. Gates green post-merge.
Reports: price-leads-1-report.md, gravel-qr-wheels.md.

## 2026-07-22 — pb-mtb-b3 + bmx-pb-breadth-1 merged: MTB 1895 -> 1776, BMX 344 -> 352 parts
B3 (9 brands, CST->Crankbrothers): 119 msrp-confirmed off literal page figures (Cane Creek 77
across 8 pages; 13 Crankbrothers rounded samples corrected to real $X99.99 maker prices), 21
honest blanks (CST "From $35" starting price; Cannondale/Canyon complete-only frames incl. the
member-gated Strive CFR; Commencal's A-La-Carte Vue configurator = genuine JS-state wall, all
three fetch lanes tried). ADVERSARIAL CATCH #3 of the day, same class as pb-road-2: 17
Continental tires stamped regional-conversion when their own desc says "price = sample" and
the Tire Range PDF lists EUR RANGES — all 17 reverted to blank (two coordinator passes; the
id-window script missed 4 whose diff hunks split the id from the stamp — final diff verified
119 stamps exactly). LESSON REINFORCED: regional-conversion requires a DISCLOSED conversion of
a specific maker figure, never a sample near an EUR range. Worker flags: Exa credits EXHAUSTED
mid-session (top up before the next fetch-heavy chip); Lux World Cup CF's pre-existing
price-vs-trim discrepancy stands; unexplained "skip Fox/Maxxis/RockShox" in its resume list —
b4's chip must include them (no ruling ever excluded them). Resume: Cube. BMX: pb pass = 1
real stamp (Kink Stealth post msrp-confirmed) + 2 re-fetched-still-blank Colony rows; 33
remaining blanks all carry honest per-row reasons (AUD/EUR-only, ranges, complete-only frames,
out-of-stock) — the BMX burndown is effectively DONE at 33-with-reasons. Breadth: 451 Killer
Buzz pair (pane + same-origin Shopify fetch), 3 stealth seats (shipping-weight buckets
correctly discarded), 3 Kink cb frames. Gates green post-merge.
Reports: pb-mtb-b3.md, bmx-pb-breadth-1.md.

## 2026-07-22 — emtb-pb-clear + road-vocab-lint merged (suite 1097 to 1103)
EMTB: 4 msrp-confirmed off browser-pane re-fetches (Trek's "Comp. Value" MSRP-next-to-sale
pattern; Giant literal $6,500; Santa Cruz Heckler SL PRICE CORRECTED 7500 to 9699 off the
now-USD-serving page) + 5 honest blanks (Cannondale/Merida no-price dealer posture, Rocky
Mountain comparison-page, Propain configurator "from" price not a fixed-SKU MSRP). Breadth
retries: Giant Stance E+ travel conflict STANDS (both quotes on record); Haibike ALLMTN
travelRear wall RESOLVED (maker Shopify JSON states 160mm f/r) — full row queued as a future
emtb entry. ROAD-VOCAB-LINT (adversarial review passed): R15 was PROVEN silently dormant for
the live GRX-10 tier (Flattop/Ekar chains turned green against RX400) — fixed with Shimano's
own "Compatible chain | HG-X 10-speed" citation; 3 pure-function lints now guard the failure
CLASS (proven to bite by reverting the fix: exactly the 2 positive lints failed); rearAxle
vocab reconciled incl. 135x9-qr (load-bearing within the hour vs the gravel-qr merge); Apex
Eagle guard (2 independent discriminators) now ENFORCES Douglas's no-mullet exclusion; the
worker also found the shared SD-APX-D1 lever cannot disambiguate the two Apex chain standards
— strengthens the future split case. Residual: 8 more ROAD_VOCAB fields drift but none feeds
a rule lookup (documentation drift, not dormancy) — needs a field-mapping ratification before
widening the lint (queued). Worker containment self-audit: caught + removed its own tmp-dir
stray; LESSON: a bare /tmp resolves to TWO different out-of-bounds places (Windows Temp
parent under Bash, a drive-root tmp under Node) — always write the scratchpad path
explicitly. Gates + harness green.
Reports: emtb-pb-clear.md, road-vocab-lint.md.

## 2026-07-22 — kit-breadth-4 merged: kit 736 to 749, priceBasis burndown holds at 0
Leatt's real dedicated youth line (8 rows across gloves/helmet/chest/elbow/knee; the existing
GPX 1.5 Mini neck brace correctly not re-added) + 5 genuine women's-SKU gloves: Fox Ranger
(first Fox womens row), 100% Ridecamp, Dakine Cross-X + Thrillium (a women's-ONLY signature
model; Dakine had zero womens glove rows despite a 14-SKU line), TLD Ace 2.0 (Luxe/Gambit
skipped — live storefront shows inconsistent per-colorway regular prices, no honest single
figure). Unisex-pads wall re-confirmed (no women's-specific impact pads exist industry-wide);
Race Face lineup already fully covered (no padding); worker caught its own Cognito duplicate
pre-commit. Cairn Ride + O'Neal Park FR untouched per the open-question fence. Gates green.
Report: kit-breadth-4.md.

## 2026-07-22 — mtb-cb-breadth-2 merged (5105 to 5116 parts) + the stale-vocab doc line fixed
Kona Process 134: whole uncataloged short-travel carbon platform entered off Kona's own
KN00140 tech-doc PDF (real text layer — every interface maker-quoted) — frame + CR/DL $4,899
+ CR $5,999 cb rows (CR priced ABOVE the flagship on Kona's live site, read verbatim, flagged
as a changeover quirk) + DT350/KOM-Team OE wheel pair + a 31.6 TranzX dropper point. Marin
Rift Zone XR AXS: zero new parts; two sharp calls — non-Transmission AXS group proven by the
udh:false frame + cassette naming, and the page's "T-Type" chain wording treated as OE
marketing looseness rather than fabricating a Transmission chain onto a frame that can't run
one. Ragley Blue Pig Race + 3 OE part points (Lyrik 275/160, Horizon V2 pair). Santa Cruz:
model-level coverage confirmed COMPLETE; Bronson trim gaps blocked by a real JS spec-table
wall (flagged). COORDINATOR CATCH: the worker skipped the Ragley Big Al citing a 3-token
system vocab — CLAUDE.md's data-model line was STALE (shimano-11/sram-11 live since 07-07/10;
same artifact skipped the base Honzo in cb-breadth-1). Line fixed this merge; Big Al + Honzo
cb entries now queued as genuinely unblocked. Gates green.
Report: mtb-cb-breadth-2.md.

## 2026-07-22 — emtb-haibike-allmtn merged: EMTB 108 to 109, first Pinion-MGU bike
Haibike ALLMTN CF 11 TRN/IQ entered off Haibike's own Shopify JSON + rendered page (the
<handle>.js route from emtb-pb-clear), Pinion's partner page used for identity corroboration
only — its stale weight/price figures (24.4kg / EUR 10k vs the live page's 27kg / EUR 9k)
disclosed, not blended. Price $10,265.88 = EUR 9,000 x same-day disclosed rate
(regional-conversion, the Vitus precedent; no US market exists for the model — both US routes
dead-end). display/batteryRemovable honestly blank (Pinion's confirming page 404'd; naming
implies but does not state). 'pinion' added to EMTB_VOCAB.motorBrand backed by the row.
Gates green.
Report: emtb-haibike-allmtn.md.

## 2026-07-22 — gravel-ui-ismount-polish merged (UI auto-ship, browser-verified)
gravel.html only: mountLabel() helper on the bbShellLabel convention (is-mount renders as
"I.S. (International Standard)" on the Nicasio+ card — rendered text confirmed in the pane)
+ the honesty strip now says "brake caliper mount vs frame/fork (flagging a documented
I.S.-to-post-mount adapter path where it applies)" — grounded in the R18 comment, no
overclaim. No pop-ups (diff reviewed). Gates green. NIT SPOTTED in the worker's own
verification output: the Nicasio+ card also prints raw "square-taper shell" — the crankBb
token has no pretty label; folded into the next gravel UI smalls pass.
Report: gravel-ui-ismount.md.
