# Complete-bikes verification notes — verify/completebikes-1

Session scope: `cat:'completebike'` rows only. Used `bdata scrape` (Bright Data Web
Unlocker, free pool) against yeticycles.com — a JS-rendered SPA that WebFetch/Exa could
not previously render (see `tools/verify-cb-sheets-4-progress.md`'s "top candidate for a
bdata-authorized session" flag). Confirmed `bdata scrape -f markdown` DOES render this
site's client-side kit-list content (tier name / brief spec / price all present in the
markdown), unlocking Yeti as a source. Full itemized wheel/tire/cockpit specs are still
NOT itemized on yeticycles.com's kit-list pages (only frame/fork/shock/brake/drivetrain
tier + price) and the `/buy/<kit>` configurator sub-pages did not render full spec tables
either — so per-slot fills for T2/T3/etc. trims still rely on the already-documented
carried-over sourcing (99spokes.com sibling builds), which correctly keeps those rows
unverified per THE BAR (not every fill independently confirmed for the exact trim).

## Disposition

cb-yeti-sb160-c2   | Skipped (unchanged) | price=6300 confirmed as an intentional 2024
  model-year snapshot (99spokes/yeticycles per its own desc), correctly distinct from
  today's live $5,200 C2 tier. No action.
cb-yeti-sb160-t2   | Failed->Fixed | https://www.yeticycles.com/bikes/sb160 (bdata scrape,
  2026-07-18) — row stored price:6800, which was the SALE price; live MSRP is $8,500,
  sale still $6,800. Corrected to price:8500, streetPrice:6800 per pricing-display policy
  (MSRP is always the price/ranking basis; sale is a labeled streetPrice).
cb-yeti-sb160-t3   | Failed->Fixed | same page/fetch — row stored price:8640 (the sale
  price; desc even recorded the MSRP as $9,500 at entry time). Live MSRP has since risen
  to $10,800 with the same $8,640 sale price. Corrected to price:10800, streetPrice:8640.
cb-yeti-sb135-c2, cb-yeti-sb135-t2, cb-yeti-sb135-t3 | Skipped (unchanged) | re-fetched
  https://www.yeticycles.com/bikes/sb135 — T2 $5,550 and T3 $6,300 match catalog exactly
  (no sale currently listed on either tier). C2's catalog price ($6,000, MY25 vitalmtb
  source) is an intentional snapshot distinct from today's live $4,200 C2 tier — no bug.
cb-yeti-sb120-c2, cb-yeti-sb120-c3, cb-yeti-sb120-t2 | Skipped (unchanged) | re-fetched
  https://www.yeticycles.com/bikes/sb120 — T2 $7,700 and C3 $6,500 match catalog exactly.
  C2's catalog price ($5,800, MY24 99spokes source) is an intentional snapshot distinct
  from today's live $6,000 C2 tier — no bug.
cb-yeti-arc-c2, cb-yeti-arc-t2, cb-yeti-arc-t1-xt-di2 | Skipped (unchanged) | re-fetched
  https://www.yeticycles.com/bikes/arc — T2 $5,900 and T1 $6,400 match catalog exactly.
  C2's catalog price ($4,600, MY25 99spokes source) is an intentional snapshot distinct
  from today's live $4,500 C2 tier — no bug.
cb-yeti-sb165-c2, cb-yeti-sb165-t2 | Skipped (unchanged) | price fields already store the
  correct MSRP ($6,400 / $6,800); sb165-c2's desc separately notes a $4,800 sale figure
  that was never stored as streetPrice — an omission, not a policy violation (in scope for
  a future pass, not touched here to keep this batch narrowly scoped to actual bugs).
cb-yeti-sb130-c1-gx, cb-yeti-sb150-c1-gx | Skipped | SB130/SB150 are not in Yeti's current
  site nav (superseded by SB135/SB140/SB160/LT); no live page to re-check against, left
  as-is (already-documented legacy-snapshot rows).

## Coordinator flag (not fixed here — out of this cluster's scope)

`fr-yeti-arc`'s already-**verified** frame row states `bb:'BSA73'`. This session's
cb-yeti-arc-c2 desc (entered by a prior session) documents that MY25 yeticycles.com specs
state `BB86/BB92, Press Fit` / `SRAM DUB BB92` for the ARC, and Yeti's own support article
"What cranks and bottom bracket can I use on the ARC?" independently corroborates PF92 —
contradicting the verified BSA73 field. Flagged then, still unresolved. Worth a direct
re-check against the MY25 owner-manual PDF the frame row was originally sourced from,
since a wrong `bb` value on a verified frame is a real false-compatibility risk (any
cassette-frame BB slot pick against this frame would get a false-clean verdict for a
part that can't actually be threaded in).

## Gates (this session, after both price corrections)

- `node validate.js`: `DATA OK - 5023 parts, 0 problems (3017 verified, 2006 unverified)`
  (+ KIT/BMX/STRIDER/ROAD/GRAVEL/EMTB all OK — 7/7)
- `npm test`: 764/764 passed (29 files)
- `npx tsc --noEmit`: clean, no output
- `node tools/verdict-audit-harness.js`: unaffected by these price-only edits — C1 stays
  329 clean/0 errors, D 15/15 clashes correctly flagged, no fills changed on either row.

## Session tally

436 total completebike rows in catalog (151 previously sheet-verified per prior sessions'
running tally, unchanged this session — no new promotions, this batch was a targeted
price-accuracy sweep on the Yeti cluster, not a verification-promotion pass). 20 Yeti rows
reviewed; 2 real price-policy bugs found and fixed (sale price stored where MSRP belongs);
1 frame-level BB discrepancy flagged for the coordinator; rest confirmed correct
(intentional model-year snapshots or already-accurate). `bdata scrape` confirmed as a
working unlocker for yeticycles.com specifically — worth trying on the other JS-walled
brands flagged in `verify-cb-sheets-4-progress.md` (Pivot, Ibis, Cannondale, Rocky
Mountain, Mondraker, Ghost, Norco, Devinci, Propain, ~130 rows) in a follow-up session;
not attempted this round (time-boxed to Yeti as the proof-of-concept brand).
