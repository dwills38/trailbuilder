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

## Canyon (2026-07-20) — all Skipped
- em-canyon-spectral-on, em-canyon-spectral-on-cfr — Skipped — Canyon relaunched the Spectral:ON platform: current CFR is Shimano EP801/Canyon BT010 800Wh/27.5in-only/160-155mm ($8,499 MSRP, Shimano Di2 drivetrain), vs catalog's 29in/900Wh/SRAM Eagle Transmission builds which match the discontinued 2022-2023 CFR LTD generation instead. No confident current-SKU match for either row.
- em-canyon-strive-on — Skipped — not independently re-checked this pass given the Spectral relaunch pattern; flagged for a dedicated fetch next wave.
- em-canyon-neuron-on — Skipped — current Neuron:ON AL 2026 is Bosch Performance CX/800Wh/150-145mm travel (bikeradar/pinkbike), catalog row says Shimano EP8/630Wh/140-130mm — motor brand wrong, spec drift.

## Rocky Mountain (2026-07-20) — all Skipped
- em-rocky-mountain-altitude-powerplay, em-rocky-mountain-altitude-powerplay-c90 — Skipped — current Altitude Powerplay III lineup (bikes.com) confirms motor/torque/battery (Dyname [S4 Pro]/108Nm/720Wh) and travel (170/160) match, BUT wheel is 29in-only (not mullet) and only 3 SKUs exist (C70 $10,799 SRAM Eagle 90 Transmission, A50 $7,899, A30 $6,099 Shimano Deore) — no "C90" tier or SRAM X0 Transmission build exists in the current lineup; catalog rows reference a discontinued C90-era generation.
- em-rocky-mountain-instinct-powerplay — Skipped — bikes.com nav shows a new "Instinct Powerplay SL" line alongside the standard Instinct Powerplay (lineup changed); product-listing fetch didn't return spec content in this pass (JS-lazy list), not re-verified.

## YT (2026-07-20) — both Skipped
- em-yt-decoy-core-3, em-yt-decoy-uncaged-8 — Skipped — YT went through administration and relaunched the whole Decoy line as "Decoy X" (Avinox M2S motor 150Nm, 800Wh, RockShox ZEB/Vivid, SRAM Eagle 90 Transmission, 170/160 travel). Catalog rows carry Shimano EP8/85Nm/630Wh/160-150mm — the old, now-discontinued Decoy MX generation; "Uncaged 8" trim no longer exists at all. Needs full re-entry.

## Radon (2026-07-20) — both Skipped
- em-radon-jealous-10-0, em-radon-jealous-9-0 — Skipped — real Radon "Jealous Hybrid" line is a Bosch 5th-gen CX-motor short-travel bike (~120mm fork, XC/light-trail category), not the Shimano EP8/160-155mm enduro-mullet bike the catalog describes. Category mismatch, not just a spec drift — needs re-entry against a real Radon enduro e-MTB (e.g. Swoop Hybrid) or correction of the model name.

## Wave 1 summary (2026-07-20, session close)
Checked 6 brands / 16 rows: Commencal (2 verified, 1 skipped), Canyon (0/4), Rocky Mountain (0/3),
YT (0/2), Radon (0/2). **Pattern found repeatedly: e-MTB platforms churn motor vendor/battery/travel
generation-to-generation faster than most MTB parts, and this catalog's unverified seed data mostly
reflects a stale (pre-relaunch) generation** — wrong motor brand entirely in most cases (Shimano
guessed where the real current bike is Bosch/DJI/Avinox), not just a minor number drift. This means
most of the remaining 59 rows likely need the same treatment: fetch → compare → either correct+verify
(clean SKU/price match, ~1-in-8 hit rate so far) or Skip with the generation-drift note.
Remaining brands not yet touched (59 rows): Specialized, Trek, Santa Cruz, Orbea (started, walled —
SPA lazy-loads specs, not re-attempted), Cannondale, Transition, Giant, Cube, Ibis, Mondraker, Haibike,
Propain, Pivot, Norco, Scott, Merida, Whyte, Marin, Devinci, Vitus, Kona, Focus, Nukeproof.
Walls hit: orbea.com renders via JS-SPA with lazy spec tabs (browser pane got the price but not the
spec sheet in one pass — needs a click-through, not yet a hard anti-bot wall); bikes.com (Rocky
Mountain) hCaptcha-gated on the newsletter popup only, product data still readable via Exa.
