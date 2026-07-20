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

## Session outcome (Manitou/Marzocchi pass)

- 0 rows newly verified this session (one redundant re-confirm, one documented skip/wall).
- 1 wall: manitoumtb.com Circus Expert product page no longer exists (redirects to Hayes root);
  Hayes Bicycle's Shopify listing lacks a rotor-size spec and its weight field is untrustworthy
  (shipping-weight-bucket suspect).
- No corrections to existing catalog data — everything checked already matched.
- Did not reach the Fox Rhythm/Performance/Performance-Elite, SR Suntour entry-XC, or Giant
  clusters this session (ran out of session budget after the Manitou/Marzocchi pair) — next
  session should pick up there.

---

## Continuation pass — SR Suntour entry-XC, Fox, Marzocchi Bomber Z1/Z2, Giant/Manitou queued

Picked up where the note above left off (Fox/SR Suntour/Giant clusters not yet reached). Ran a
fresh extraction script over `src/compat.js`'s `PARTS` to recount: **79 pending (unverified) fork
rows at this pass's start**, not the 143 the task brief and the prior note above both cite — that
figure appears to have drifted/been wrong from the start; `node validate.js`'s own live count is
the source of truth going forward. Cluster 1 (Fox Rhythm/Performance/Performance-Elite + SR
Suntour entry-XC + Giant + Manitou Circus Expert + Marzocchi) breakdown at this pass's start: Fox
16 rows, SR Suntour 4, Giant 4, Manitou 2 (already covered above — still walled, unchanged),
Marzocchi 2.

### SR Suntour — 3 rows CORRECTED (not verified), rotor-max fixed

`srsuntour.com`'s own per-model spec pages ARE fetchable (via Exa's `web_fetch_exa`/
`web_search_exa` — the prior "no fetchable srsuntour.com page" notes on these rows'
`desc` fields are superseded). Fetched directly:
- `https://www.srsuntour.com/products/fork/XCE28-6330.html`
- `https://www.srsuntour.com/products/fork/XCT30-6259.html`
- `https://www.srsuntour.com/products/fork/XCM-6236.html`

Each page's own **"Brake Mount (Max Rotor DIA.)"** field states **"Postmount 160mm Direct"**
(XCE28, XCT30) or **"Postmount 160mm Direct / V-brake + Postmount 160mm Direct"** (XCM) — no
larger figure is given anywhere on the page. This is the maker's own rated ceiling for the fork
itself (an error-tier field, distinct from — and only coincidentally equal to, before this fix —
the frame's own `maxRotorR`, which is NOT a valid source for a fork's own max-rotor spec).
**Corrected `maxRotorF` 180 -> 160** on:
- `fk-srsuntour-xce28-29-100-qr`
- `fk-srsuntour-xct30-29-100-qr`
- `fk-srsuntour-xcm-29-100-qr`

(`fk-srsuntour-xce-29-100-15qr`, the 4th SR Suntour row in this cluster, already carried
`maxRotorF:160` — left untouched, not re-checked against a fetched page this pass for time
reasons.)

Axle (`9-100mm Dropout` -> `9x100-qr`) and steerer (`1-1/8" (TS), STKM` — TS = threadless
steerer -> `straight`) were also stated on each page and CONFIRM the existing catalog values
(no change needed there).

**NOT marked `verified:true`** on any of the three: each page's stated weight (XCE28: 2600g;
XCM: "starting from 2635g"; XCT30: none shown in this fetch) could not be confidently pinned to
the exact 29"/100mm/QR SKU point cataloged — these SR Suntour generic-model pages appear to span
multiple wheel-size/travel points on one listing without a per-config breakdown, and the existing
catalog weights (2100g / 1980g / 2000g) are meaningfully lower than what the page shows, which is
exactly the kind of mismatch the phantom-number hazard warns about. Rather than guess which
figure is right, weight was left as the existing sample and the rows stay unverified — a
**correction without full verification**, per `VERIFY-PROTOCOL.md`'s "Corrections without
verification are still valuable" paragraph. A future pass should look for an exact-SKU
part-number URL (`SF-XCE28-...` style, one per wheel/travel/axle point — this pattern exists for
other SR Suntour lines per the search results this pass turned up) to close the weight gap and
reach full `verified:true`.

### Fox — WALL (documented, not a task)

`foxracing.com/en/34-mtb-fork/`, `/36-mtb-fork/`, and `ridefox.com/bike/34` all returned
404/503 on direct WebFetch. `ridefox.com/products/<slug>` pages ARE fetchable via Exa
(`web_fetch_exa`), e.g. `https://ridefox.com/products/36-performance-gripx-51992604` (confirmed:
36 Performance GRIP, PART 910-21-349, 15QRx110 axle, 1.5 Tapered steerer, 200mm direct/230mm max
rotor — for the 29"/160mm point) and `https://ridefox.com/products/34-sl-factory-gripsl`. The
blocker isn't the site itself — it's that **each `ridefox.com/products/<slug>` URL resolves to
ONE specific travel/wheel/color SKU and the static fetch only surfaces that one variant's spec
table** (the on-page travel/wheel selector is JS-driven and doesn't expose sibling SKUs' spec
tables in the fetched markdown). None of the 16 pending Fox Rhythm/Performance/Performance-Elite
rows' exact `<slug>` could be reliably guessed/confirmed to match the cataloged travel point
within this pass's time budget (e.g. the current-generation `36-performance-gripx` page only
lists a 160mm/29" SKU, while the catalog also carries a `36-performance-29-170` row whose 170mm
travel point may not even be a current-catalog SKU for that tier — needs the exact slug or a
tech.ridefox.com spec-sheet PDF, not guessed). **Left unverified, no changes made.** A future pass
should try `tech.ridefox.com`'s spec-sheet PDFs (`2025-2027 34mm/36mm User Specifications` turned
up in search — not fetched this pass for time reasons) which look like the right per-generation
source instead of guessing product-page slugs one at a time.

### Marzocchi Bomber Z1 / Z2 (distinct from the already-verified Bomber DJ above) — WALL

`bike.marzocchi.com/products/bomber-z1` (manufacturer page, fetched via Exa) gives TRAVEL:
100/150/160mm, WHEEL 27.5"/29", AXLE 15QRx110, STEERER 1.5 Tapered, ROTOR SIZE 180mm (native
mount only), Weight 2109g — but **the catalog's `fk-marzocchi-bomber-z1-29-140` row claims
140mm travel, which the current-generation product page's own variant selector does NOT list**
(only 100/150/160 appear as selectable options, though one feature bullet elsewhere on the same
page says "44mm rake in 140, 150, 160mm travel (29)" — a direct self-contradiction on the maker's
own page, most likely leftover copy from a prior generation). Given this ambiguity, per THE BAR
and the phantom-number hazard, **did not touch this row** rather than guess which figure is
stale. Also: neither `bike.marzocchi.com` nor the AU/CA regional mirrors' dedicated spec pages
(`/pages/bomber-z1-specs`, `/pages/bomber-z2-specs`) state an explicit "max compatible rotor"
figure distinct from the native 180mm/160mm mount size — `maxRotorF` (an error-tier field) could
not be confirmed for either Marzocchi row (`fk-marzocchi-z2-airrail-29-150` similarly: maker page
gives ROTOR SIZE 160mm native mount, no stated max). **Left unverified, no changes made.**

### Giant — NOT REACHED this pass

Ran out of time budget before fetching giant-bicycles.com's own fork spec pages for the 4 Giant
rows (STL34, Crest34, SXC32-2, SXC32-3). Flagging for the next pass — Giant's own bike-model
pages have already proven fetchable elsewhere in this catalog (see the Giant Talon 4 fork desc
in `src/compat.js`, sourced from `giant-bicycles.com/us/talon-4-2027` directly), so a similar
fetch for Giant's fork-specific model pages is likely tractable.

## Gates run after the SR Suntour edits (all passed)

```
node validate.js                        -> DATA OK - 5032 parts, 0 problems (3100 verified, 1932 unverified)
npm test                                 -> 33 test files, 838 tests passed
npx tsc --noEmit                         -> clean, no output
node tools/verdict-audit-harness.js      -> A:0 flags, B:0, C:337 clean/0 errors, D:15/15, D2:2/2 (E is informational, pre-existing unrelated families)
```

No new vocab needed this pass.

## Overall session outcome (both passes combined)

- 0 rows newly `verified:true`.
- 3 corrections landed (SR Suntour `maxRotorF` 180->160 x3), each documented in its own row's
  `desc` and above.
- Manitou Circus Expert (both rows) and both Marzocchi Bomber Z1/Z2 rows: documented walls, no
  changes (Marzocchi Bomber DJ was already verified prior to this branch and re-confirmed clean).
- Fox (16 rows) and Giant (4 rows): not reached / walled by the one-SKU-per-URL slug problem —
  next pass should try `tech.ridefox.com` PDFs for Fox and `giant-bicycles.com` model pages
  (already proven fetchable in this catalog) for Giant.
- Fork category overall remains a harder class to verify at scale than shocks/wheels/frames: none
  of Fox/SR Suntour/Marzocchi publish a single page enumerating every SKU's spec table the way
  `sram.com/en/service/models/<slug>` does for shocks.
