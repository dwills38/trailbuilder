# verify-notes-tail12 — mtb-tail-12 worker session (2026-07-21)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY (wheels/tires/complete bikes owned by parallel workers this pass).
Branch `verify/mtb-tail-12`, worktree `.claude/worktrees/mtb-tail-12-x7k2`.

Starting point: tail-11's brand breakdown (~450 rows not reached). Worked the next-biggest
clusters it named: Bontrager (23), Giant (16, not reached this pass), Cannondale (15),
TranzX (14), Canyon (14), Pivot (14), Specialized (13), PRO (11), Nukeproof (10), Marin (10).

## Disposition: VERIFIED (1 row)

- `gr-pivot-phoenix-factory-lockon` — **pivotcycles.com is no longer wall-blocked** (every
  prior session documented it as an unreachable fetch blocker). FETCHED
  pivotcycles.com/en-us/products/phoenix-factory-lock-on-grips directly: SKU
  PA-BIK-GRP-V1-LCK---BLK, $29.99, "Weighs just 100g per pair" (maker-stated) — the existing
  100g sample was already exactly right; only price corrected 22→29.99. Grips carry no
  verdict-driving fields.

## Disposition: corrected, still UNVERIFIED (weight/material bar unmet or no USD price)

- `hb-newmen-evolutionsl-800-318` — CORRECTED `material:'carbon'` → `'alu'` and
  `weight:230` → `340`. newmen-components.de itself is still unfetchable (JS-rendered), but
  this exact SKU (800mm/31.8mm clamp/40mm rise) is confirmed **aluminum**, not carbon, by two
  independent EU retailers with matching full spec tables (biker-boarder.de SKU 2660206, EAN
  4054571181312; shop.radsporttechnik-mueller.de) both stating Material: Aluminium, 340g —
  further corroborated by the closely-related VGS-variant listing on bike24.de, which
  explicitly discloses "Quelle Gewicht: Hersteller" (weight source: manufacturer) for its own
  339g figure on the same platform. The original row had guessed "carbon" with an unsupported
  230g sample — Newmen's carbon cockpit line uses different naming, this SKU is alloy across
  every source found. Price stays a documented sample (retailer prices are EUR, not a clean
  USD MSRP) — left unverified pending a direct manufacturer/USD-market fetch.

## Disposition: re-attempted this session, wall confirmed unchanged (no promotable result)

- **Trek/Bontrager (23 rows)**: trekbikes.com direct fetch re-tried (p/32843) — still returns
  only nav chrome, no spec content (matches every prior session's documented wall). Not
  re-attempted per-row; this cluster is heavily mined already (audit-cockpit 2026-07-09,
  verify-cockpit-tail/closer 07-10/17, tail-9/10/11) and the wall is unchanged. No further
  action taken on the 23 rows.
- **Cannondale (15 rows)**: all already carry "no standalone cannondale.com product page
  found" from prior sessions — these are OEM-only house-tier cockpit names (Cannondale
  1/2/3/C1/C2, TrailShroom, TaperRidge, etc.) that Cannondale does not sell as independent
  retail SKUs. Confirmed via a fresh cannondale.com gear-store search this session — no
  standalone listing exists for any of these names. No promotable weight source exists.
- **Specialized (13 rows)**: same OEM-only pattern, confirmed again this session — no
  standalone specialized.com product page for any of the 13 (Trail Alloy/Stout/MiniRise
  cockpit, Henge/Bridge/Power-Sport saddles). One row, `dp-specialized-command-post-349-160`,
  carries a prior "SUSPECTED FICTIONAL COMBO" flag (34.9mm/160mm combo not supported by any
  manufacturer or review source) — left as-is, already flagged prominently for the
  coordinator; not independently corrected this session (outside verification scope to
  retire/rewrite a combo without a coordinator call).
- **PRO / Shimano-PRO (11 rows)**: pro-bikegear.com is reachable again (confirmed via the
  Koryak 150/170 dropper pages, PRSP0270-PRSP0275 part numbers) but PRO's own spec tables
  publish Travel/Series/Material/Diameter/Color/Routing/Partnumber only — **no weight field
  exists on the manufacturer's own page**, matching the exact gap already documented on the
  Koryak 120mm siblings (2026-07-18 repromote pass). The `hb-pro-tharsis-35` bar (Tharsis
  3Five 20mm-rise/800mm/35mm/carbon) is confirmed **discontinued from PRO's current lineup**
  (superseded by "Tharsis EVO") — 4 independent retailers (Tredz, Saint Cloud, The PM Cycles,
  Freewheel) converge on 198g for this exact spec, but retailer-quoted-from-spec is not a
  manufacturer/measured source per THE BAR, so not promoted. No PRO rows promoted.
- **Nukeproof (10 rows)**: nukeproof.com is reachable for complete-bike spec pages but no
  standalone product page was found for any of the 10 Horizon/Neutron cockpit rows this
  session (only OE build-sheet mentions). Multiple retailers (dcbikes.com.sg, Skinnergate,
  Cruz E Bikes, Dan's cykel o skid, One Planet Adventure) all independently cite "290g (25mm
  rise version)" for `hb-nukeproof-horizon-v2-35` — matches the catalog's existing sample
  exactly, but again retailer-relayed, not a direct manufacturer/measured fetch. Not promoted.
- **TranzX (14 rows)**: na.tranzx.com is reachable (confirmed via the retail Kitsuma product
  line) but every one of these 14 rows is an OE-only house SKU (Reverse, +Rad, JD-YSI34,
  YSI05-RAD, YSP23JL, SLR LE, etc.) with **no standalone na.tranzx.com page under that exact
  name** — confirmed again this session. These OE names simply aren't sold/spec'd standalone;
  no further promotion possible without a different approach (e.g. a bike-maker's own weighed
  build sheet, not attempted this pass).
- **Canyon (14 rows)**: canyon.com/en-us/gear/components/posts-and-clamps/ fetched directly —
  confirms SP0070/SP0081/G5/HB0073/Iridium/ST0039 are genuinely **not sold as standalone
  retail SKUs** (only S/L-tier premium seatposts like SP0077/SP0078 appear in the gear store).
  99spokes.com aggregates what reads like Canyon's own spec copy for SP0081 (668g at 31.6mm,
  638g at 34.9mm) but this is a third-party aggregator, not a direct canyon.com fetch or a
  disclosed measured source — per this catalog's established precedent (aggregator-sourced
  weight doesn't meet THE BAR even when the interface facts are maker-confirmed), not
  promoted. Flagging for a future session: 99spokes may be worth a standing WebFetch check
  across other OE-only clusters (Trek/Bontrager, Giant) since it appears to carry maker-spec
  data that direct fetches of those sites can't reach.
- **Marin (10 rows)**: all confirmed OE-only, no standalone marinbikes.com product pages —
  same pattern as every other house-cockpit cluster this session.
- **Pivot (remaining 12 of 14 rows)**: pivotcycles.com is reachable again (see the promoted
  grips row above) but a search for standalone Phoenix handlebar/stem/saddle product pages
  turned up only bike-model pages and the grips — Pivot appears to no longer sell the
  Phoenix cockpit (bar/stem/saddle) as standalone SKUs, only the grips. A 2017 Pivot
  press-release/bikerumor launch article gives PRO's own CLAIMED weights (135g for the 35mm
  Enduro/Trail stem, 131g for the 60mm XC stem, bar/stem/grip system "as low as 430g" total,
  no individual bar weight given) — maker-claimed via a corroborating source, but not a direct
  current product-page fetch; flagged here rather than promoted, since it's a different (and
  weaker) sourcing tier than the grips' direct fetch.

## Browser-pane candidates tail-11 flagged (re-attempted)

- `gr-sdg-slater` — sdgcomponents.com/products/slater-grip 404s directly; the adult "Slater"
  grip appears **discontinued from SDG's current site** (only "Slater Jr Grip" remains in the
  live Grips collection). Opened the browser pane and confirmed the redirect-to-homepage
  behavior. The existing 42g/$20 sample is independently re-confirmed by a third source this
  session (kshcycles.com.my: "Lightweight, only 42g") but since the product is gone from the
  manufacturer's own site, there's no live manufacturer page left to verify against. Left
  unverified — a genuine wall (discontinued-from-source), not a skip-for-laziness.
- `hb-newmen-evolutionsl-800-318` / Newmen configurator — see the CORRECTED disposition above;
  didn't need the browser pane in the end, WebFetch/Exa found full retailer spec tables
  directly.

## Not reached (in-scope, still Pending)

Giant (16 rows) and the ~90 remaining 1-9-row brands were not attempted this session (time
budget spent confirming/re-confirming the Bontrager/Cannondale/Specialized/PRO/Nukeproof/
TranzX/Canyon/Marin walls, which mostly hold unchanged from tail-11). A future session should
prioritize: (1) Giant house cockpit (Contact/Connect lines) — not yet attempted directly;
(2) re-trying pivotcycles.com and pro-bikegear.com and nukeproof.com and na.tranzx.com and
canyon.com per-row now that all five are confirmed reachable again this session (the wall
notes on individual rows may be stale even where no promotion was found this pass); (3) the
99spokes.com lead for OE-only clusters, flagged above.
