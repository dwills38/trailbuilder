# Striders catalog-3 — progress log (branch `catalog/striders-3`)

Wave 3 of the off-live kids' balance-bike dataset. Picked up mid-branch: this
worktree already carried an uncommitted correction from an earlier attempt
(woom 1 / 1 PLUS verified against the maker pages, fixing the 1 PLUS's wheel
size from 12 to 14in) — that correction is folded into this wave's commits
rather than re-done.

## What landed (28 -> 36 bikes; 1 verified -> 5 verified)

**New rows (8):**
- Early Rider Bella Velio (8in infant-tier, girls'-pattern sibling of the
  Velio) — **verified:true**, maker-fetched.
- Radio Flyer Ultra Lite (12in, magnesium frame) — unverified sample.
- Bixe 12 and Bixe 16 (budget/lightweight Amazon-marketplace tier) —
  unverified sample.
- Strider 20x Sport (20in, top of the Strider convertible range, ages
  8-adult) — unverified sample. Added `'20'` to `STRIDER_VOCAB.wheel` (was
  missing; a real, currently-sold wheel size, not a stand-in).
- KUbikes 12, Moustache Mercredi 12, Propain Bam Bam (3 more EU brands) —
  unverified sample.

**Corrections to existing rows (2):**
- **woom 1** — verified:true against woom.com's own product page (seat
  height 259-353mm/10.2-13.9in, weight 2903g/6lb 6oz, aluminum frame, mini
  V-brake); corrects the prior wave's aggregator-derived numbers.
- **woom 1 PLUS** — verified:true against woom.com; **fixes a real data
  bug** — the prior wave carried `wheel:'12'` for this model, but woom's own
  page confirms 14in wheels (seat height 366-432mm/14.4-17in, weight
  4337g/9lb 9oz).
- **Prevelo Alpha Zero** — verified:true against prevelo.com's own product
  page (Mk III): seat height 277-355mm (was 273-371, aggregator-derived),
  weight 3130g (was 3243g), price $259 (was $239 — the aggregator price was
  stale/wrong).
- **Guardian Balance Bike** — verified:true (partial) against
  guardianbikes.com: weight 3856g and price $149 both matched the existing
  aggregator-sourced numbers exactly; **frameMaterial corrected from steel to
  aluminum** (the maker page states aluminum, the prior wave had it wrong).
  Seat height (318-406mm) is retained from twowheelingtots because the maker
  page states only an 11.5in minimum leg length, not an explicit seat-height
  range — so this row is verified on 3 of 4 identity facts, not all of them;
  said so plainly in `desc` rather than overclaiming full verification.

## First verified:true attempts (the ask: Guardian/Prevelo/Cleary)

- **Guardian** — ✅ maker page fetched cleanly (guardianbikes.com/products/
  balance-bike), 200 OK.
- **Prevelo** — ✅ maker page fetched cleanly (prevelo.com/products/
  alpha-zero), 200 OK, full spec table.
- **Cleary** — ❌ wall, but not a fetch wall: **Cleary Bikes ceased
  operations in 2024** (per twowheelingtots + tikesbikes coverage). Their
  balance bike was the "Starfish" 12in (inseam 14-18in, front+rear hand
  brakes). Since the maker site is gone and the product isn't currently or
  recently sold in the sense the rest of this catalog uses, it was **not
  added** rather than sourced solely from a retailer listing with no live
  maker confirmation possible. Flagging in case Douglas wants a defunct-brand
  policy decision (the MTB catalog's `status`/`supersededBy` fields exist for
  discontinued gear — could extend here later if wanted).
- Bonus: **Early Rider** (Bella Velio) also verified cleanly off
  us.earlyrider.com — wasn't on the requested list but was free while
  researching the Bella/Velio family.

## Verified count: 5/36 (was 1/28)

woom 1, woom 1 PLUS, Prevelo Alpha Zero, Guardian (partial), Early Rider
Bella Velio.

## Seat-height coverage: 32/36 (89%)

4 blanks, all deliberate (THE BAR — a blank beats a guess):
- Cannondale Kids Trail Balance (from wave 1) — rider-height range only.
- Co-op Cycles REV 12 (from wave 2) — inseam range only.
- KUbikes 12 (new) — recommended-inseam range only (12.4-15.7in), no
  seat-height figure found in any fetchable source.
- Propain Bam Bam (new) — maker fits by rider height (90-110cm per
  downtown-mag.com; `heightMin`/`heightMax` used), not seat height.

## Strider Baby 2-in-1 rocker — GAPS-logged, not entered as a row

Researched striderbikes.com/rocking-bikes/12-sport/ (200 OK). The "2-in-1
Rocking Bike" is **not a distinct balance-bike model** — it's the existing
Strider 12 Sport (already `sb-strider-12-sport` since wave 1) bundled with a
separate rocking base accessory (its own weight/dimensions, ages 6mo-2yr in
rocker mode). The `balancebike` schema has no field for "ships with an
add-on base/accessory" and the balance-bike-mode spec (seat height,
weight, tire, brake) is identical to the row that already exists. Adding a
second row for it would either (a) duplicate an existing bike under a
different id, which the append-only/no-duplicate-real-bikes convention
doesn't cleanly support, or (b) require a schema extension (an
`accessoryBundle` or similar field) that's out of scope for a data-entry
wave. Logged here as the category question rather than forced into either
shape — Strider 14x (also a real conversion product, but a genuinely
different bike, not a bundle) was added back in wave 1; Strider 20x
(genuinely different) is added this wave. Same non-decision applies to the
Strider 12 Pro 2-in-1 bundle (not entered for the same reason).

## Not yet added (walls / time-budget, real brands still missing)

- Early Rider's wood-tier siblings (Lite $99, Bonsai $159, Classic $119,
  Belter 12 $269, Charger 12) — found via us.earlyrider.com/collections/
  balance-bikes-1 but not entered this round (time-budget call; Bella Velio
  was the specifically-requested family).
- Radio Flyer Air Ride (steel sibling of the Ultra Lite, $79.99) — named in
  the same review as Ultra Lite but not entered (only one Radio Flyer model
  requested).
- Bixe 16 Pro (a separate, heavier trim of the 16in Bixe — twowheelingtots
  cites 13-14.9lb) — only the base Bixe 16 (12lb) was pinned to a clean
  source table; the Pro trim's weight wasn't independently confirmed, so it
  was left out rather than conflated with the base model.
- Cleary Starfish — real, discontinued 2024, not added (see above).
- Strider Baby 2-in-1 / 12 Pro 2-in-1 rocking-base bundles — GAPS-logged
  above, not a missing-data issue but a schema-shape question.

## Gates (all green at HEAD of this branch)

```
node validate.js   -> DATA/KIT/BMX/STRIDER/ROAD/GRAVEL OK, 0 problems
                      (STRIDER OK - 36 bikes, 0 problems, 5 verified,
                      31 unverified, 32/36 with seat-height range)
npm test           -> 735 passed (735)
npx tsc --noEmit   -> clean
```

## Suggested next steps (not done this round)

1. Early Rider wood-tier siblings (Lite/Bonsai/Classic/Belter/Charger) — all
   found this round with clean specs at us.earlyrider.com/collections/
   balance-bikes-1, just not entered (budget).
2. Decide a defunct-brand policy (Cleary and similar) — extend the
   `status`/`supersededBy` pattern from the MTB catalog, or leave defunct
   brands out entirely per current practice.
3. Rule on the Strider rocking-base bundle question (schema extension vs.
   leave undated) before any more "2-in-1" SKUs come up.
4. Continue chasing `verified:true` — Radio Flyer, Bixe, KUbikes, Moustache,
   Propain, Strider are all still aggregator-sourced; several (Radio Flyer,
   Strider) have maker sites that may be directly fetchable and weren't
   tried this round (time-budget call, focus was the 3 requested brands +
   new-model research).
