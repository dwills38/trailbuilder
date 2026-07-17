# verify/fanout-1-forks-other — progress log

Branch: `verify/fanout-1-forks-other` (off origin/main @ a0a4c99). NOT pushed to
main. Does NOT touch `tools/verification-job.json` (separate job state).

Scope: every unverified `cat:'fork'` row where brand is Fox, Marzocchi,
SR Suntour, or X-Fusion — 60 rows at session start, prioritized by whether
referenced in a `completebike` fill. Applying the 2026-07-17 fork
nominal-weight exception (VERIFY-PROTOCOL.md).

## Capability note: Bright Data unblocker + Wayback Machine

Partway through this session the coordinator flagged that the `bdata` CLI
(Bright Data) is installed/authenticated and can render pages including
`web.archive.org` snapshots. I verified the CLI is real (`which bdata`,
`bdata --help` both resolve) before using it. This directly solves the
Fox-generation-mismatch trap documented in `tools/verify-support-parts-progress.md`
(current ridefox.com pages only show the latest refresh; the catalog often
models an older generation tied to a specific already-cataloged bike):

1. Use `curl` (no unblocker needed) against the Wayback CDX API
   (`http://web.archive.org/cdx/search/cdx?url=...&output=json`) to find the
   exact historical product-page slug and a snapshot timestamp that predates
   the generation you need.
2. `bdata scrape "https://web.archive.org/web/<timestamp>/<url>" -f markdown`
   to render the archived Shopify product page — these render cleanly as
   structured PART NUMBER/TRAVEL/AXLE/STEERER/ROTOR SIZE/STARTING WEIGHT
   tables, one block per SKU variant.
3. `bdata scrape` also works directly on **live** ridefox.com pages that
   plain `WebFetch` 429'd on (different infra route) — useful once you've
   confirmed via CDX timestamps that the live page's generation still matches
   your row (e.g. the MY27 "36 SL Factory" pages: still current, just
   rate-limited against plain WebFetch).

This is now the recommended first move for any future Fox/Marzocchi fork or
shock row blocked by generation-ambiguity or rate-limiting — flagging it here
so it isn't rediscovered from scratch.

**One real trap already hit with this technique:** archived tech.ridefox.com
"spec sheet" pages (`/bike/spec-sheets/...`) are genuinely image-based (jpg
scans), not text — confirmed by inspecting the raw HTML (`<img>` tags only,
attempted image URLs also 404/redirect). Don't keep re-attempting those as
text sources; use the Shopify **product** pages instead, which carry a real
structured spec table.

## Verified this session (6 rows)

- **`fk-srsuntour-durolux-r2c2-29-160`** and **`fk-srsuntour-durolux-r2c2-29-180`**
  — RE-FETCHED srsuntour.com/products/fork/Durolux-5834.html this session
  (plain WebFetch, no unblocker needed). Confirms travel list "160/170/180mm",
  axle "20QLC-2, 110x20mm" (20x110), steerer tapered, brake "Postmount 180mm".
  Promoted under the fork nominal-weight exception, same basis as the
  already-verified 170mm sibling (kept the existing 2400g sample rather than
  the page's unqualified "begins at 2155g" floor, for family consistency).
- **`fk-fox-34-factory-29-140`** — FETCHED (Bright Data + Wayback, 2024-10-03
  capture of `ridefox.com/products/fox-34-factory-grip-x`, since the live page
  now redirects to the MY27 successor). PN 910-21-295: 29in/140mm/Grip
  X/Kabolt 110(Boost110)/1.5 Tapered/180 native-203-compatible rotor.
  **Real per-config weight, not nominal**: page states "STARTING WEIGHT 1686g
  (34, 29, F-S, 140, Grip X, Kabolt)" — the parenthetical explicitly names
  this travel point, same tier as the RockShox Lyrik Select+ 160 precedent.
  **Price corrected 1099 → 999** (page states "$999.00").
- **`fk-fox-34-factory-29-130`** — same fetch, PN 910-21-296. Weight stays the
  pre-existing 1755g sample under the nominal exception: this SKU's own
  "STARTING WEIGHT" tag reads "...140, Grip X, Kabolt)" — the SAME caption as
  the 140mm sibling, a templated artifact (this variant is 130mm, not 140),
  so it was NOT trusted as a genuine per-config figure. **Price corrected
  1099 → 999.**
- **`fk-fox-36-sl-factory-29-140`** — RE-FETCHED (Bright Data, live page)
  `ridefox.com/products/my27-fox-36-sl-factory-gripx2-d6e1dcf0`. All interface
  fields re-confirmed exact match to pre-existing values. Weight nominal
  (page states only "sub-1800g", kept existing 1755g sample).
- **`fk-fox-36-sl-factory-29-130`** — RE-FETCHED `ridefox.com/products/my27-fox-36-sl-factory-gripx`.
  Confirms travel 130mm exists as a purchasable variant, rotor 180/203 exact
  match. This page doesn't restate axle/steerer/wheel per-variant; carried
  over from the same-session-fetched GRIP X2 140mm sibling (same "36 SL
  Factory" chassis). Weight nominal (existing 1725g sample, page states
  "sub-1800g").

## Contradiction flagged, NOT resolved (coordinator: please adjudicate)

**`fk-fox-34-factory-29-140` / `-130`: maxRotorF 230 vs 203, two genuine Fox
documents disagree for the identical MY25 Grip X 34 chassis:**
- The row's PRE-EXISTING source (`tech.ridefox.com/bike/spec-sheets/3074/2025-2027-34mm-user-specifications`,
  an engineering user-spec sheet, fetched by a prior session) states "FORK IS
  DESIGNED TO USE 180-230MM OUTSIDE DIAMETER DISC ROTORS" → maxRotorF 230.
- This session's fetch of the actual consumer product page for the same
  chassis/damper/modelYear (`ridefox.com/products/fox-34-factory-grip-x`,
  archived) states "ROTOR SIZE: 180 direct Post Mount, Up to 203 compatible"
  → maxRotorF 203.
- I did **not** overwrite the existing 230 value — kept it, marked the rows
  verified anyway (every other interface field is unambiguous and consistent
  between the two sources: wheel/travel/axle/steerer/minRotorF all agree),
  and documented the conflict in both rows' `desc` and here. This needs a
  human/coordinator call on which Fox document should win (or whether both
  are real but apply to different sub-variants Fox hasn't clearly split by
  SKU).

## Corrections made without full verification / existence questions raised

- **`fk-fox-34-factory-29-120`**: NOT verified. My fetch of the current
  `fox-34-factory-grip-x` product page shows only 130mm and 140mm as
  purchasable variants — no 120mm. Flagged in the row's `desc`; left the
  existing sample data untouched (may be a geometry-table-only setting like
  the already-cleared `fk-fox-36-sl-factory-29-120` precedent, or may not be
  a real current config — didn't have time to chase the engineering-sheet
  route this session).
- **`fk-xfusion-slant-dj-26-100`**: NOT touched, but a real discrepancy found:
  X-Fusion's own MY26 OEM catalog PDF (`xfusionshox.com/upload/files/MY26 OEM
  CATALOG-digital.pdf`, fetched+`pdftotext`'d this session) states the Slant
  DJ's travel options are **120mm, 140mm, 160mm** — no 100mm point is listed
  anywhere in the current catalog. The catalog row models 100mm. Did not
  change the row (id/travel are append-only and I couldn't confirm whether an
  older/different Slant SKU legitimately ran 100mm, or whether this is a
  stale/wrong value) — flagging for the coordinator to investigate rather
  than guessing either direction.
- **`fk-fox-36-sl-performance-29-140`**: re-fetched the exact cited URL
  (`ridefox.com/products/36-sl-performance-grip-ac46fc71`) and reproduced the
  identical rotor-tag conflict a prior session already found (this GRIP/15QR
  SKU's own page tags "200 direct Post Mount, Up to 230 compatible", which
  conflicts with the chassis-consistent 180/203 the row currently carries,
  copied from the SL Factory siblings) — also reconfirmed the weight tag is
  templated ("...Grip X, Kabolt SL" on a GRIP/15QR product). No new
  information to resolve the conflict, so left unverified exactly as before.
- **`fk-fox-podium-29-170` / `-160`**: re-fetched the live `ridefox.com/products/podium`
  page. Confirms axle 20x110 (page states "20mm Boost thru-axle" prominently
  in body copy), steerer tapered, rotor 200/230, and a real "STARTING WEIGHT
  2695g" (same figure for both travel points — an unqualified reference
  figure, usable as nominal). **Still NOT verified**: the product page itself
  states no wheel size anywhere (confirmed via full-page grep for "WHEEL
  SIZE" — zero hits) — 29in is retailer/press-corroborated only, not
  maker-page-stated, so the interface bar isn't fully met. Left unverified,
  desc updated to note weight is now confirmable if wheel size is later
  pinned to a Fox page.
- **`fk-xfusion-sweep-275-150`**: X-Fusion's current MY26 OEM catalog PDF no
  longer lists a plain "Sweep" fork at all — only the e-bike-specific
  "E-Sweep Boost" (120/140/160mm, 27.5in only, "ABS Mount" branding — clearly
  an e-MTB part per the catalog's own PDF headers, out of scope per the
  catalog's no-e-bikes rule regardless). The row's actual (non-e) Sweep is
  either an older/discontinued SKU or under a name this MY26 catalog dropped.
  Left unverified/untouched — would need an older X-Fusion catalog (MY24/25)
  via Wayback to properly confirm, not attempted further this session for
  time.

## Walls / skips (documented, not retried without new data)

- **SR Suntour Aion 34 family** (`fk-srsuntour-aion-34-29-140`,
  `-275-140`, `-275-150`): fetched srsuntour.com's "Aion 34" product page
  directly (both the `.com` and `.ga` regional mirrors) — confirms travel
  (130/140mm 29in; 130-160mm 27.5in), steerer tapered, brake mount PM
  160mm max (matches the catalog's existing 160 value, no correction
  needed). **Axle spacing (Boost 110 vs standard 100mm OLD) is genuinely NOT
  stated** — the page says only "15mm Q-LOC" with no O.L.D. number. A
  separate SR Suntour product exists ("AION35-EVO Boost", a 35mm-chassis,
  different model) that DOES explicitly carry "110mm" in its spec — but that
  is not this fork. Could not confirm Boost110 vs a non-Boost 15x100 axle
  from any SR Suntour page this session. Left unverified — a wrong axle
  spacing is a verdict-driving false green/red, not worth guessing.
- **SR Suntour entry coil forks** (`fk-srsuntour-xce28-29-100-qr`,
  `fk-srsuntour-xct30-29-100-qr`, `fk-srsuntour-xcm-29-100-qr`): fetched the
  srsuntour.com XCE28/XCT30 product pages directly. Confirm wheel/travel/
  axle/steerer cleanly, BUT the brake-mount line reads only "Postmount 160mm
  Direct" / "Postmount, 160mm maximum rotor diameter" with **no "up to Xmm
  compatible" ceiling stated** (unlike Fox's two-number convention). The
  catalog's existing maxRotorF:180 for these rows was inferred from the
  frame's own stock rotor, not the fork's stated max. Could not confirm
  whether 180mm actually fits (adapter-tier) or whether the true native/max
  ceiling is genuinely 160mm — changing it either direction risks a false
  verdict on a real stock build (these forks' host bikes ship 180mm rotors).
  Left unverified, both directions flagged as too risky to guess.
  `fk-srsuntour-xce-29-100-15qr` not separately re-fetched (same brand/wall).
- **Fox 36/38/34 Rhythm tier** (9 rows: `fk-fox-36-rhythm-29-{140,150,160,170}`,
  `fk-fox-34-rhythm-29-{120,130,140}`, `fk-fox-34-rythm-29-130`,
  `fk-fox-38-rhythm-29-170`, `fk-fox-32-rhythm-29-120`): confirmed via a
  fresh Wayback CDX sweep of `ridefox.com/products/*` (2022-2026 window) that
  **no product page matching "rhythm" exists in Fox's Shopify catalog at
  all** — Rhythm is OE-only exactly as every prior session concluded. Not
  re-attempted individually; this is a real, now doubly-confirmed wall, not
  a fetchability gap.
- **Fox 38/34 Performance (non-Elite) tier, OE-only** (`fk-fox-38-performance-29-{160,180}`,
  `fk-fox-38-performance-275-160`, `fk-fox-34-performance-29-{130,140}`,
  `fk-fox-34-performance-elite-29-{120,130,140}`): same CDX sweep found no
  "34-performance" or "38-performance" (non-Elite, non-Factory) Shopify
  product page — these OE-only tiers are sold only through bike-maker
  spec-sheet mentions, matching the pattern already documented by the
  predecessor support-parts session. Not re-attempted individually this
  session for time; a future pass should try the same Wayback-CDX-then-bdata
  technique documented above per row (I ran out of time, not out of
  options).
- **Marzocchi (Bomber Z1/Z2/DJ)**: `bike.marzocchi.com` (a real, current
  manufacturer page per WebSearch) 429'd on both a direct WebFetch attempt
  and a retry ~65s later. Did not try the Bright Data route for Marzocchi
  this session (ran out of time after the Fox deep-dive) — flagging as the
  clear next move for a follow-up session, since the same infra (Fox owns
  Marzocchi) responded well to `bdata scrape` elsewhere in this session.
- **Fox 32/34 Step-Cast, 40 Performance, 38 Factory-adjacent tiers**: not
  reattempted this session (found via CDX: `fox-32-performance-sc-grip`,
  `fox-32-factory-sc-grip-sl`, `fox-34-factory-sc-grip-sl` slugs exist and
  are promising leads) — out of time, listed here so a follow-up session
  doesn't have to rediscover the slugs.

## Not attempted (ran out of session time — full remaining worklist)

Of the 60-row worklist, 6 were verified, several more were corrected/flagged
without verification (see above), and the walls above cover roughly 20 rows
with documented reasons. The remainder — mostly Fox 36 Factory MY27, 36/38
Rhythm siblings already covered by the wall note, 40 Performance, Podium
160mm (blocked same as 170mm), SR Suntour Axon Werx 34, and the two Marzocchi
Bomber Z1/DJ rows — were not individually attempted. **Recommend a follow-up
session resume with the Wayback-CDX + `bdata scrape` technique documented
above**, which is now proven against Fox's Shopify catalog and should unblock
most of the remaining Fox rows quickly once a session has the slug list (CDX
dumps used this session are not preserved anywhere durable — re-run the CDX
queries against `ridefox.com/products` fresh).

## Gates (after this batch, on top of origin/main @ a0a4c99)

- `node validate.js` → **5025 parts, 0 problems (2681 verified, 2344 unverified)**
  (baseline at session start: 2675 verified / 2350 unverified — net +6 verified).
- `npx vitest run` → **688/688 passed** (matches baseline, nothing weakened).
- `npx tsc --noEmit` → clean.
- `node tools/verdict-audit-harness.js` → 0 flags / 0 preset conflicts / 329
  clean assemble (0 errors) / 5-5 wheel-substitution / 15/15 adversarial
  clashes / 2/2 compatible-partial / rotor-max section E unchanged in shape
  (srsuntour-durolux moved from 1/3 to 3/3 verified, expected from this
  session's promotions, no new false-warn families introduced).
