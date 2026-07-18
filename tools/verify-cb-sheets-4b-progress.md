# verify/cb-sheets-4b — continuation batch (2026-07-18)

Branch off origin/main (3fcf98c, post-BMX-flip), fresh worktree
`.claude/worktrees/cb-sheets-4b-seat12`. Continuation of round 4 (see
`tools/verify-cb-sheets-4-progress.md` for the main round's findings — that file lives on the
now-merged verify/cb-sheets-4 branch history) after the coordinator merged the first batch and
asked to keep going with the smaller untouched brands, explicitly skipping the JS-walled
brand list (bdata pending a credit top-up).

## Findings

Swept Whyte, Kona, BMC (Shopify `.json` trick via curl), Focus, Radon (x3), Rose, Devinci
(spot-check), Intense (404 on the guessed build-specs URL, not retried further).

**Key discovery: Focus/Radon/Rose/Kona/BMC are NOT JS-build-kit-walled.** Unlike the 10 brands
flagged in the main round-4 doc, these fetch their full build-kit spec sheets cleanly via plain
WebFetch or curl — no bdata needed. Every row checked already had its fills correctly sourced
from a prior session; the value found this batch was entirely in **price drift**, not new
fill data:

### Price corrections (2)

- **cb-whyte-905**: GBP1,699 -> GBP2,099 (whytebikes.com's own Shopify `.json`, all 4 sizes
  confirm uniformly). Stays unverified (non-USD price is this catalog's own established
  reason EU-native-price rows stay unverified, same as Focus/Radon/Rose below).
- **cb-rose-root-miller-2**: $1,943 -> $2,699. The old figure was a USD conversion of EUR1,799
  — which the live page now shows explicitly labeled as a REDUCED sale price, with EUR2,499 as
  the actual RRP. The row was quietly pricing off a sale, not the list price, since whenever it
  was entered. Corrected to the RRP-based conversion at the same ~1.08 rate this catalog already
  uses for EU-maker rows.

### Re-confirmed correct or already-blocked, no change (7)

- **cb-focus-jam-68**: no price on the page (server-rendered configurator, price truly absent)
  — already documented as a price-estimate-blocks-verification case, unchanged.
- **cb-radon-jealous-90**: EUR2,999 unchanged from the live page (exact match) — stays
  unverified per the EU-native-price convention, not a gap.
- **cb-radon-jealous-80**, **cb-radon-cragger-70**: not re-fetched this batch (time-boxed);
  both already carry the same EU-native-price convention note in their own descs.
- **cb-bmc-twostroke-01-two**: price exact ($3,399) but multiple documented Shimano
  generation-adjacent substitutions (M6200->M6100) already block it — no change.
- **cb-kona-process-153-g3**: price exact ($2,599) but the shock is explicitly flagged
  "not independently confirmed for this exact alloy SKU" — no change.
- **cb-kona-honzo-esd**: price exact ($2,399), every fill described as exact/non-substituted
  EXCEPT the tire compound ("EXO/3C MaxxTerra... Kona's page does not name a MaxxGrip/MaxxTerra
  split" — an inference). Same class of gap that blocked 2 Chromag rows in the main round-4
  batch (tire-compound-not-stated) — kept unverified for consistency with that precedent, even
  though it's the row's only open flag. **Worth a second look**: if a future session finds Kona's
  page states the compound elsewhere (spec PDF, different fetch prompt), this is one promotion
  away.
- **cb-devinci-chainsaw-dh-gx**: price exact ($4,499) via a direct devinci.com fetch (confirms
  the round-4-main spot-check) — 6+ documented substitutions already block it, no change.

### Not pursued

- **Intense**: intensecycles.com/pages/m1-expert-build-specs 404'd (WebFetch got 429 earlier,
  curl got a clean 404 — the URL itself is wrong, not a wall). Not worth guessing further URLs
  this batch; the row's own desc already documents a working `intensecycles.com/pages/*` source,
  so a URL-search retry (not a wall-defeat) would be the next move.
- Remaining untouched: Deviate, Airdrop, Bird, Antidote, Production Privee, Last, Stanton, Ari,
  Privateer, Forbidden, Cotic, DMR, Merida, Unno, Diamondback Sync'r, Scott (mostly no-source
  rows or already vitalmtb-sourced) — none attempted this batch, time-boxed to the
  already-sourced brands with the highest promotion odds.

## Tally

Sheet-verified stays at 151/436 this batch (no NEW promotions — every candidate checked already
had a documented blocker independent of price). 2 price corrections landed. 7 rows
re-confirmed correct/already-blocked. The EU-native-price convention (Whyte/Radon/Rose/Focus)
is now clearly a SECOND structural class of "correctly stays unverified forever under current
policy" alongside the JS-build-kit wall — worth flagging to Douglas/coordinator as a policy
question: is a EUR-sourced row ever meant to be promotable, or is USD-only a hard requirement
for `verified:true`? Nothing in schema.js enforces currency, but CLAUDE.md's data model doc
says "price (USD MSRP, sample)" and every EU-brand row's own desc self-imposes the unverified
status for exactly this reason.
