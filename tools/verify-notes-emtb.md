# EMTB verification wave 1 — dispositions

Scope: `data/emtb.js` only (75 rows, 0 verified at start). Per-brand batches,
gated + committed individually. Follows `tools/VERIFY-PROTOCOL.md` (raw-text
phantom-number check, THE PRICE RULE, frame/complete-bike exception where
relevant) and FETCH ETHICS (no anti-bot circumvention; JS-render via browser
pane is fine).

Format per row: `id — Verified|Skipped|Failed — one-line reason`.


## Commencal (2026-07-20)
- em-commencal-meta-power-sx — Verified — Meta Power SX V4 Bosch Essential; motor/battery/drivetrain/brakes corrected (was stale Shimano-EP801/SRAM guess; real bike is Bosch CX/Shimano SLX); price $6,500 matched exactly.
- em-commencal-meta-power-sx-signature — Verified — Bosch Signature build; corrected to Bosch CX/Shimano XT; price $8,000 and weight 24.2kg both matched exactly, strong identity confirmation.
- em-commencal-meta-power-29 — Skipped — current lineup shows this line renamed/consolidated into "Meta Power AM Shimano Essential" (EP800/630Wh matches loosely) but travel (170/155 vs catalog 150/140), drivetrain (SLX vs GX Eagle) and price ($6,900 MSRP vs catalog $5,500) don't match closely enough to confirm SKU identity — spec drift, needs re-entry not just a provenance stamp.
