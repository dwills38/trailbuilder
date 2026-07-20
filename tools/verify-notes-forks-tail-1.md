# Fork verification tail — session notes (2026-07-20)

Branch: `verify/mtb-tail-1`. Scope: unverified `cat:'fork'` rows in `src/compat.js`
(143 pending at session start). The task brief referenced `tools/verify-notes-forks-3.md`
listing "27 fork rows with no prior research" — **that file does not exist in the repo**;
this session derived its starting cluster (Fox Rhythm/Performance/Performance-Elite,
SR Suntour entry-XC, Giant, Manitou Circus Expert, Marzocchi) directly from `src/compat.js`.

## Marzocchi Bomber DJ (`fk-marzocchi-bomber-dj-26-100`)

Already `verified:true` (2026-07-17, `verify/fanout-1-forks-other-2`) — re-fetched
`bike.marzocchi.com/products/bomber-dj` this session to double-check: raw page text confirms
axle "20 x 110 non-boost or 15 x 100", "ROTOR SIZE: 180mm", "STEERER: 1.5 T Tapered Steerer",
"Weight Complete Fork: 2,095 grams", $799.00 — all match the existing row exactly. No changes
needed. **No re-verification action taken** (already done, redundant fetch only).

## Manitou Circus Expert (`fk-manitou-circus-expert-26-100`, `fk-manitou-circus-expert-26-100-straight`)

**Wall/gap found, not verified this session.** manitoumtb.com/manitou.com no longer serves a
Circus Expert product page (redirects to the bare Hayes Bicycle root). The current retail page
is `https://hayesbicycle.com/products/my21circusexpert_z` (Hayes Bicycle Group owns Manitou) —
fetched via curl (WebFetch hit an intermittent 503 on this URL; direct curl succeeded, 200).

Confirmed from the page's own Shopify variant JSON (raw-text cross-checked, not summarizer-reported):
- Travel: 100mm variant exists (also 120mm/130mm variants on today's listing — the catalog only
  models the 100mm SKU, which is fine, just noting the page sells more than the catalog row).
- Steerer: both "1.5\" Tapered" and "1-1/8'' " (straight) variants exist — matches the catalog's
  two rows (`tapered` / `straight-dc`) exactly.
- Axle: product tag `Axle_20x110_(Non Boost)` — matches the catalog's `20x110-nonboost`.

**Could NOT confirm on this page:** `maxRotorF` (catalog says 203) and a trustworthy net weight —
no rotor-size spec text found anywhere in the raw HTML (checked around "post mount"/"disc"/"rotor"/
"203"/"180", nothing), and the only weight figures present are per-variant Shopify `weight` JSON
fields (2903–3025g range) which is very likely a **shipping-weight bucket, not net product weight**
(the exact Shopify phantom-number trap this protocol already flags for BMX Shopify rows — a DJ fork
in this class is not usually ~2.9-3.0kg; third-party summaries elsewhere cite ~2134g/4.7lb, which
doesn't match the on-page JSON either, so neither number is trustworthy without a clearer source).

Per THE BAR (item 1, interfaces manufacturer-sourced, no exceptions) I cannot mark `verified:true`
without the rotor spec confirmed — **left unverified, Skipped this session** with this note as the
reason. Axle/steerer/travel already match the catalog exactly, so no data correction was needed
either way. A future pass should try Manitou's PDF spec sheet / owner's manual (if still hosted)
rather than the Shopify retail page, since the retail listing doesn't carry a full spec table.

## Session outcome

- 0 rows newly verified this session (one redundant re-confirm, one documented skip/wall).
- 1 wall: manitoumtb.com Circus Expert product page no longer exists (redirects to Hayes root);
  Hayes Bicycle's Shopify listing lacks a rotor-size spec and its weight field is untrustworthy
  (shipping-weight-bucket suspect).
- No corrections to existing catalog data — everything checked already matched.
- Did not reach the Fox Rhythm/Performance/Performance-Elite, SR Suntour entry-XC, or Giant
  clusters this session (ran out of session budget after the Manitou/Marzocchi pair) — next
  session should pick up there.
