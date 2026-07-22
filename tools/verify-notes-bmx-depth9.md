# BMX depth-9 notes (2026-07-22)

## Part (a): depth-8's missed freestyle brands — DONE, 9 rows

- **Rant**: rantbmx.com is a marketing/content site; its own "Shop" link redirects to
  `sparkysbrands.com` (the Sparky's Brands parent/distributor that also owns The Shadow
  Conspiracy/Subrosa — Rant's own retail channel, not a third-party). Entered via the raw
  Shopify JSON method: `bmx-cr-rant-bangin48` (48-spline crank, verified), rear+front Party On
  V2 wheels (driver/weight/price verified, axle inferred by catalog convention so left
  unverified), `bmx-se-rant-believe` (pivotal seat, verified).
- **Mission**: `missionbmx.com` is Mission's own domain (a sister brand of Kink, per the file's
  existing brand convention of crediting kinkbmx.com/wethepeoplebmx.de as maker pages) and
  fetched cleanly, so used as primary source over the rate-limited kinkbmx.com. American BB Kit
  (19mm, verified) + Half-Link Chain (1/8, verified).
- **Federal**: **RESOLVED — the live domain is `federalbikes.com`**, not the
  `federalbikeco.com` depth-8 flagged unresolvable. UK storefront (GBP), active with July 2026
  content. Entered: Session Fork (verified interfaces, axle inferred), Vice 2 24mm Cranks
  (fully verified), Boyd V2 frame (topTube/geometry confirmed on Federal's own page, but
  bbShell/headTube/brakeMount/rearAxle are NOT stated there — sourced instead from kunstform.org's
  verbatim echo of Federal's own spec sheet, so left unverified per THE BAR's no-exceptions
  interface rule). GBP→USD conversions noted per THE PRICE RULE in each row.
- **Skipped, tallied, not entered**: Mission's "Carrier Stealth V2 Seat Kit" / "Carrier Seat" use
  Mission's own **Stealth** one-bolt mounting system — the same real third seat-mechanism depth-8
  flagged on Kink's Stealth seats, which the `pivotal`/`standard` binary genuinely can't represent.
  Adds to that tally rather than being force-fit into either token.

Gates after this wave: 7 OK (BMX 313→322), 989/989, tsc clean. Committed
`catalog/bmx-depth-9` (d360748).

## Part (b): race-side depth — WALLS, nothing entered (honest, not forced)

- **Answer BMX**: no distinct official Answer storefront found (only referenced secondhand via
  Dan's Comp / as a component brand inside Supercross's own crank descriptions, e.g. "Answer
  1-piece chain wheel"). Not a maker page — didn't force an entry.
- **Speedline / Supercross BMX**: Speedline Parts is confirmed to be Supercross's own in-house
  race-parts brand (sold on supercrossbmx.com, their own site) — genuinely promising (Killer
  Buzz wheelsets, Expert/Spinners Hollow Pro cranks, Slasher carbon rims all real current SKUs
  with WebSearch-summarized specs looking plausible). **But `supercrossbmx.com` returned HTTP 429
  on every WebFetch attempt this session** (both direct product pages and `.json` product
  endpoints), including after a retry — a genuine bot-protection wall, not a transient rate
  limit on my end (fetch ethics doctrine: document the wall, escalate, never route around it).
  Left unentered rather than trust WebSearch-summary figures for engine-read fields per the
  PHANTOM-NUMBER hazard (no raw-page cross-check was possible).
- **Chase RSP race parts**: per the task brief, chasebicycles.com's no-parts-section wall stands
  (not re-tested — the wall is already well-documented by prior waves) and Excess/J&R
  distributor pages were never used as anything beyond corroboration.
- **GT/Haro race completes**: GT's current race lineup (`gtbicycles.com/collections/bmx-bikes`)
  confirmed via direct fetch: `Speed Series Pro` (already catalogued) plus newly-seen
  `Speed Series Pro XL 24`, `Speed Series Expert`, `Speed Series Expert XL`,
  `Speed Series Junior` — real gaps for a future wave. Fetched `Speed Series Expert`'s own
  Shopify JSON: price ($690.00) confirmed, but BB shell/head tube/brake mount/rear axle are
  **not stated anywhere on the page**, and its Shopify `weight` field reads "1.0 lb" — an
  obvious phantom/shipping-weight-bucket number for a complete bike frame (per the wave-2
  phantom-number doctrine), so not used. Not entered — no confident, maker-sourced interface
  data exists yet for this SKU. Haro's own storefront was reconfirmed already-walled
  (bmx-sweep-3 notes on existing rows: 10-product Freestyle-only current lineup, no race tier).

**Recommendation for a future pass**: if `supercrossbmx.com` is reachable via the browser pane
(rendering JS is not circumvention per the fetch-ethics ruling — it beat an unlocker on Pivot
before), that's the next lever to try for Speedline/Supercross race depth. GT's four new
Speed Series SKUs need a page that actually states BB/head-tube/axle (GT's own product pages
consistently omit these — every existing GT row in the catalog sourced these fields from a
spec-sheet echo elsewhere, not gtbicycles.com directly).
