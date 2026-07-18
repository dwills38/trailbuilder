# Striders catalog-1 — progress log (branch `catalog/striders-1`)

Off-live kids' balance-bike dataset per `data/STRIDER-MODEL.md` (data model) +
`data/STRIDER-ANALYSIS.md` (product/market analysis). This round is data entry
only — no `checkBalanceFit` engine, no live wiring.

## What landed

- `src/schema-strider.js` — schema/validator for `cat:'balancebike'`, mirroring the
  `src/schema-bmx.js` pattern. `seatMin`/`seatMax`/`frameMaterial` are OPTIONAL (not
  required) per THE BAR — several real bikes only publish a rider-height range, and a
  blank beats a guessed number.
- `data/striders.js` — `STRIDER_PARTS`, 16 real, currently-or-recently-sold balance
  bikes across 12 brands: woom (2), Strider (3), Specialized (2), Cannondale, Prevelo,
  Early Rider, Frog, Retrospec (2), Guardian, LittleBig.
- `validate.js` — wired a fourth gate line ("STRIDER OK"), same pattern as BMX/KIT.

## Verified vs sample

**0 verified, 16 unverified (sample).** Every manufacturer balance-bike page hit a wall
this and the prior research round (Strider 403s; Specialized 403s direct-fetch; woom is
a thin SPA shell over plain WebFetch) — see `data/STRIDER-MODEL.md` section 2's
fetchability table. All 16 rows use the aggregator-sourced spec table already gathered
and cited in that doc (twowheelingtots, Ready Set Pedal, Rascal Rides, Cascade Gear
Reviews, littlebigbikes — each row's `desc` names its source), which the model
explicitly sanctions as a credible UNVERIFIED-sample basis (never `verified:true` —
that still requires a fetched maker page). No time was spent re-fetching maker pages
this round because the fetchability wall was already mapped and confirmed by the prior
design pass; a follow-up grind could revisit woom (Exa reached `/en_US/products/<slug>`
successfully before) and Cannondale (Exa reached the product page) to earn `verified:true`
on those two brands specifically.

## Seat-height coverage

**15/16 (94%)** carry a `seatMin`/`seatMax` range. The one exception — Cannondale Kids
Trail Balance — only publishes a rider-height range (94-107cm); its seat height was left
blank rather than derived/guessed, per THE BAR.

## Walls hit / brands NOT yet added

The market map names ~25 brands; this pass landed the 16 for which the prior research
round had already pulled a credible seat-height figure into `STRIDER-MODEL.md`'s
sample table. NOT yet added (real brands, no sourced seat-height figure pulled yet this
round, so intentionally left out rather than guessed):

- Giant Pre rCarbon — weight (5.1lb) and price known, seat height not found this round.
- Yedoo Too Too, Radio Flyer Ultra Lite, Banana Bike, Bixe, Chillafish — named as budget
  segment in STRIDER-ANALYSIS.md §1a but no per-model spec table row was pulled.
- KUbikes, PUKY, Moustache, Propain (EU brands named in downtown-mag's roundup) — no
  per-model rows pulled.
- Kinderfeets, Wishbone, Banwood (wood/composite gift-tier, DECISIONS FOR DOUGLAS Q7).
- Early Rider Bella Velio / other baby-tier 8-10" bikes beyond Frog Tadpole Mini
  (DECISIONS FOR DOUGLAS Q5).
- Co-op/REI house brand, Electra-class kids' balance bikes — named in the task brief,
  not yet located with a sourced spec.
- Strider Baby 12 (the pre-Classic infant-oriented SKU) and Strider 20x — taxonomy only
  fetched (Bright Data), no per-model spec table pulled.
- Any pedal-conversion kit rows (`cat:'pedalkit'`) — deliberately deferred; MODEL §6/
  ANALYSIS Q4 flags this as a scoping call for Douglas, and the MVP posture in MODEL §4
  is "a missing category beats a noise category."

## Gates (all green at HEAD of this branch)

```
node validate.js              -> DATA/KIT/BMX/STRIDER OK, 0 problems
npm test                      -> 710 passed (710)
npx tsc --noEmit               -> clean
node tools/verdict-audit-harness.js -> unchanged (0 flags; strider data isn't wired
                                        into checkBuild/checkBmxBuild, so it can't
                                        move this needle either way)
```

## Suggested next steps (not done this round — time-budgeted call)

1. Broaden brand coverage (Giant, EU brands, budget-tier, wood/composite) — needs a
   fresh aggregator research pass per brand (same method as this round).
2. Chase `verified:true` on woom + Cannondale via the Exa routes already proven to work
   (STRIDER-MODEL.md §2).
3. Decide + implement `checkBalanceFit` (STRIDER-MODEL.md §5) once Douglas rules on
   DECISIONS FOR DOUGLAS Q1/Q2 (product shape) — this round intentionally stayed data-only.
4. Pedal-kit rows + the `pedalkit-fit` rule (MODEL §6), gated on Q4.
