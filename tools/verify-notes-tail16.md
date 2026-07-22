# verify-notes-tail16 — mtb-tail-16 worker session (2026-07-22)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY. Branch `verify/mtb-tail-16`, worktree
`.claude/worktrees/mtb-tail-16-x7k2`. No drivetrain rows, no complete bikes, no wheels/tires.

Assignment: continue tail-13's punch list minus what tail-14/15 already settled
(ODI/Wolf Tooth/Thomson/Ergon at their weight-publication ceiling; Syncros closed). Work:
SDG, Cane Creek, X-Fusion, KS, Fizik, Prologo, Selle Italia, DMR, Chromag, Burgtec, Spank,
Renthal, Title, Deity, plus reachable 1-9-row brands.

**Spank and Deity: already 100% verified** (24 rows checked, all `verified:true` from a
prior session) — nothing to do, not mentioned in tail-13's punch list because they'd
already been closed out.

## Promotions this session (14 rows -> verified:true)

- `sa-sdg-belair-v3-steel` — weight already exact (318g), price 59.99->74.99
- `sa-sdg-ifly-20` — real I-Beam racing saddle (155g/$89.99), corrects a mistaken
  Gravity-collection weight sample (230g); prior session's family-guess was simply wrong
- `dp-ks-lev-ci-316-175` — kssuspension.com's spec table now publishes a real 31.6mm/175mm
  weight (486g) where an earlier fetch saw "TBD"
- 4x `dp-xfusion-manic-*` (309-150/349-170/316-170/316-150) — xfusionshox.com's own
  per-travel weight table (465/575/570/627g @ 100/125/150/170mm, not split by diameter)
- `sa-fizik-terra-alpaca`, `sa-fizik-terra-aidon-x5`, `sa-fizik-vento-argo-x5` — all three
  direct fizik.com fetches, clean weight+price
- `sa-prologo-proxim-w450`, `gr-prologo-proxim-xshred` — direct prologo.it fetches
- `sa-selleitalia-model-x` — selleitalia.com's "Model X Leaf" Greentech trim; matches a
  315g figure a prior session had already sourced (cited in the row's old desc) but never
  actually applied to the fields
- `hb-title-form-carbon-35`, `st-title-dm1-35` — direct titlemtb.com fetches; a prior
  session wrongly assumed titlemtb.com only shows CAD pricing (it shows USD directly) and
  substituted a retailer price instead
- `gr-renthal-traction` — renthal.com Traction Medium page, cross-confirmed by Merlin Cycles

## Price/weight corrections without promotion (bar not fully met)

- `st-canecreek-eesilk-sl-318` — price 149.99->199.99 (a 2026-07-10 audit note had flagged
  this as stale but never actually fixed the field — re-fetched canecreek.com to confirm
  before correcting)
- `sa-prologo-dimension-ndr` — price 90->139 (prologo.it); weight left alone, the NDR spans
  3 real rail-trim weights (Nack 165g/Tirox 212g/T4.0 232g) and no trim is named anywhere
  this row is sourced from — a phantom-number risk, not touched
- `sa-selleitalia-slr-boost` — price 270->299.90 (every TI316 "Boost" SKU independently
  found on selleitalia.com prices at exactly $299.90 regardless of sub-trim); weight stays
  sample, real trims span 173-220g and this row's "Fill" naming isn't confirmed against any
  specific one
- `st-chromag-hifi-bsx-318-40` — price 65->84 (hlc.bike + VitalMTB spec DB both confirm
  this exact SKU); weight (200g) independently corroborated by VitalMTB too but
  chromagbikes.com itself was rate-limited (HTTP 429) this session, so kept unverified
- `st-burgtec-mk3-directmount-35-50` — weight 156->140g (universalcycles.com's exact
  per-SKU "Weight: 140g (50mm reach)" listing replaces an unsourced carried-over guess);
  retailer-only figure, THE BAR stays unmet

## Researched, no promotable result (walls confirmed or re-confirmed)

- `gr-sdg-thrice-31` — sdgcomponents.com re-fetched, still no pair/single weight qualifier
  (same wall tail-earlier sessions hit)
- `sp-sdg-tellis-316-rigid` — no standalone "Tellis (not dropper)" rigid post SKU exists on
  sdgcomponents.com; the site sells only the Tellis V2 dropper + I-Beam rigid posts
- `dp-sdg-tellis-v2-316-150` — price already matched ($224.99); sdgcomponents.com states no
  per-size weight for the Tellis V2 dropper at all (any diameter/travel)
- `sp-sdg-v2comp-349` — no "V2 Comp" seatpost SKU found anywhere on sdgcomponents.com;
  likely a retired/OE-only name from the original Devinci Chainsaw DH build sheet
- `sa-sdg-belair-v3-lux-alloy` — **flagged as a likely duplicate**: the fetched
  sdgcomponents.com/products/bel-air-v3-lux-alloy page (236g/$104.99) is an EXACT match to
  the already-cataloged, already-verified `sa-sdg-belair-v3` row. This row (270g/$70) may be
  a stray duplicate entry under a near-identical name — not touched to avoid corrupting
  either row; flagging for a future data-hygiene pass to confirm and possibly retire one.
- `dp-canecreek-al-316-150` — no live "AL" dropper product on canecreek.com (the brand
  currently sells only eeSilk suspension seatposts + Thudbuster); likely a legacy/OE-only
  Cotic build-sheet name
- `dp-ks-ragei-349-170`, `dp-ks-ragei-316-170` — **generation mismatch confirmed**:
  kssuspension.com now sells only "Rage-i 2.0", which the manufacturer's own comparison
  table states is a genuinely shorter/lighter redesign vs the plain "Rage-i" these rows are
  named for (10.3mm shorter at the head alone) — not a safe weight/price match, left alone
- `dp-ks-900i-316-150`, `dp-kindshock-900i-349-170`, `dp-kindshock-900i-316-150` — KindShock
  / EXA Form has no findable official manufacturer product site; only retailer weight ranges
  (~465-670g depending on source) exist, none meeting THE BAR
- `sa-fizik-terra-ridon-x1` — fizik.com's current MTB collections no longer merchandise the
  Ridon line at all (re-confirmed, same finding as an earlier session)
- `sa-fizik-tiaga` — re-confirmed discontinued, not in fizik.com's current MTB trail
  saddle collection
- `sa-prologo-dimension` — same trim-ambiguity as Dimension NDR but across an even wider
  family (Dimension 143 / Dimension Space / Dimension Tour de France, each with different
  price+weight-per-trim); not touched
- `sa-selleitalia-x3-boost` — no "X3 Boost" product found anywhere on current
  selleitalia.com; possibly discontinued/renamed
- `sa-selleitalia-slr-boostfill-ti` — a used-marketplace listing (mtbiker.cz) selling a
  part pulled off the exact same Orbea Oiz this row is sourced from confirms "Fill" is a
  real distinct naming (not a typo for "X-Cross"), ~190g, but no manufacturer page for that
  exact "Fill" SKU was found — not promoted, real figures for adjacent trims span 173-220g
- DMR `hb-dmr-sect-bar`, `st-dmr-cnc-35`, `sp-dmr-dj-272` — confirmed these are generic
  OE-spec components on the DMR Sect Pro complete bike (dmrbikes.com's own complete-bike
  spec sheets list them only as "DMR 31.8mm Aluminium 740mm 1.5in Rise" etc, no dedicated
  branded product page) — not independently-sold SKUs, not promotable
- `gr-dmr-sect-grips` — DMR *does* sell this standalone (dmrbikes.com, €13.95, interfaces
  match) but the only weight (100g) is retailer-sourced (Halfords UK), not manufacturer —
  THE BAR unmet
- `st-chromag-hifi-35`, `st-chromag-riza-35` — re-confirmed prior sessions' price findings
  (already correct, no drift); still no manufacturer weight for these specific clamp/length
  combos
- `gr-burgtec-bartender-pro-bryceland` — burgtec-usa.com/burgtec.co.uk publish dimensions
  only, no weight; two retailer figures found (90g, "0.131kg"/131g) are inconsistent with
  each other and one is clearly a shipping-box weight, not the grip — correctly left unset
- `hb-burgtec-ridehigh-35` — burgtec-usa.com publishes a real per-rise weight table
  (38mm:312g / 50mm:338g / 65mm:373g / 80mm:378g) but this catalog row stores no `rise`
  field to match against, so no safe promotion — flag for a future session: add a `rise`
  value (the Transition TR11 source build sheet may specify) then this promotes cleanly

## Not reached this session (in-scope, still Pending)

Given the breadth of the "remaining 1-9-row brands" tail — ANVL, Answer, Antidote, Ari,
BikeYoke, Bird, Cotic, DEUX, Diamondback, Easton, Eightpins, Entity, Evil, Fabric, Focus,
Forbidden, Ground Fiftyone, Hope, Ibis, Intense, Iridium, Kona, Liv, Lizard Skins, Mondraker,
Natural Fit, Newmen, OC Mountain Control, Onoff, PMG, PNW, Peaty's, Polygon, Post Moderne,
Privateer, Production Privee, Radon, Ragley, Revel, Rocky Mountain, Rose, Selle Royal,
Sensus, Sixpack, Sonder, Stanton, Straitline, Supacaz, TwinWorks, VP, Velo, Vitus, Yeti — none
of these were reached this session; the named priority list (SDG through Title) filled the
available time.

## Gates

`node validate.js`: 0 problems throughout (3327 -> 3341 verified across the session's
commits, 1714 -> 1700 unverified). `npx vitest run`: 988 passed, every commit. `npx tsc
--noEmit`: clean, every commit. Eight commits this session (SDG, Cane Creek, X-Fusion,
KS/KindShock, Fizik, Prologo, Selle Italia, Chromag+DMR, Title+Renthal+Burgtec), each
individually gated.
