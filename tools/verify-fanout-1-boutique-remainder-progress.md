# verify/fanout-1-boutique-remainder — progress log

Scope (per the coordinator brief): four small, previously-untouched brand pools —
Öhlins shocks, Spank wheels, SUNringle wheels, Michelin tires. Branch:
`verify/fanout-1-boutique-remainder`, based on origin/main @ 660eb0b.

Baseline at session start: `node validate.js` 2916 verified; `npx vitest run` 699/699.
End of session: 2947 verified (+31); 699/699 unchanged.

## 1. Öhlins shocks — 9/9 verified

All 9 unverified `Öhlins` shock rows (TTX22 m.2 210x55 std + 185x55 trunnion;
TTX2Air base-gen 190x45/210x55/230x65 std + 185x55/205x65 trunnion; TTX2Air m.2
185x55/205x65 trunnion) re-fetched directly from ohlins.com this session
(WebFetch, all resolved cleanly — no wall). Every eye/stroke/mount/spring
value already in the catalog (from a prior gap-fill pass) was confirmed
byte-for-byte on-page.

- `sh-ohlins-ttx2air-190x45` gained a **real per-SKU weight (451g)** —
  ohlins.com states it directly for this exact 190x45 config. Corrected from
  the prior 400g sample.
- The other 8 rows verified interfaces-only under the shocks nominal-weight
  interface-verification exception (VERIFY-PROTOCOL.md) — ohlins.com publishes
  no per-size weight for the rest of the TTX22 m.2 / TTX2Air lines; existing
  sample weights kept, basis noted in `desc`.
- The two TTX2Air m.2 rows' prior-session "flagged for a second look" note
  (mount stated as trunnion-only at every eye length, unlike the std-only
  210/230 base-gen siblings) was re-confirmed verbatim this session — not a
  data error, a real generational change Öhlins made.

No corrections-without-verification; no contradictions with other verified rows.

## 2. Spank wheels — 14/14 verifiable rows verified, 2 stay Skipped

**SPIKE 369 Vibrocore front 29/27.5** (`fw-spank-spike369-29`, `-275`):
re-fetched spank-ind.com directly. The one open item from the prior session —
`rotorMount` not stated on the front wheel's own page — resolved by fetching
the separate SPANK HEX J-Type Front Hub product page
(spank-ind.com/products/spank-hex-j-type-front-hub), which states "DISC
MOUNT: 6-bolt" explicitly for the exact hub laced onto this wheel. Both rows
now `verified:true`.

**359 rear 29/27.5, XD + Micro Spline** (4 rows): re-fetched
spank-ind.com/products/spank-359-vibrocore%E2%84%A2-rear-wheel directly (the
prior session's "JS-rendered, unfetchable" note no longer holds via
`bdata scrape`). Real per-config weights pulled from the spec table:
- 29" Boost148 XD: 1189g (was a 1180g sample)
- 27.5" Boost148 XD: 1141g (was 1180g sample)
- Micro Spline siblings verified per the wheels nominal-weight exception
  (maker's table splits weight by HG/XD only, not MS) — weight kept at the
  XD sibling's real figure as the closest published anchor.
- **Price corrected 400/450 → 480** on all four rows: the maker lists ONE
  uniform $479.99 across every 359 rear variant (27.5/29, both axle specs,
  all three freehub types) — the old per-wheel-size split ($400 vs $450)
  doesn't match the current page. Flagging this as a correction, not silently
  overwritten (documented in each row's `desc`).

**SPIKE 369 rear Micro Spline** (4 rows: 150/157 × 29/27.5): re-fetched
spank-ind.com/products/spank-spike-369-vibrocore-rear-wheel; MS reconfirmed
as a real purchasable variant, 6-bolt/30.5mm interfaces confirmed. Verified
per the wheels nominal-weight exception (same HG/XD-only weight-table gap).

**Spank Spike Race 33 / Formula OEM-hub wheels** (`fw-spank-spikerace33-formula-29`,
`rw-spank-spikerace33-formula-29-hg`) — **stay unverified/Skipped.** These are
OEM-only rim+hub combos (Commencal Meta HT V3 Essential stock spec, sourced
from commencal.com, not Spank's or Formula's own retail pages — no
standalone SKU exists). Checked Formula's own hub-weight data (DC-711 front
hub ≈178g per retailer listings) but that's a hub-only figure, not a
full-wheel weight, and doesn't meet the bar even as a "measured" weight
(retailer spec copy, not a scale-photo/lab figure). No real full-wheel
weight source exists for this exact OEM pairing — left unverified, no change.

## 3. SUNringle wheels — 12/16 verified, 4 stay Skipped

**Duroc SD37 Pro 29** (7 rows: front + rear XD/HG/MS × 148/157): re-fetched
hayesbicycle.com/products/duroc-sd37-pro-29 directly — the prior session's
404 no longer holds (site fix or transient). Real per-wheel weights: front
940g (was 1050 sample), rear 1108g uniform across all freehub/axle variants
(was 1180 sample). `rotorMount` 6-bolt and all three freehub options (HG,
XD, MicroSpline) independently confirmed via the separate Bubba/Super Bubba
rear hub product page (hayesbicycle.com/products/bubbarearhub_z, "6 Bolt"
disc mount + "Shimano HG, SRAM XD, and Microspline" driver options stated
explicitly) — this resolves the prior session's "HG per a Blister Review
quote, possibly historical" uncertainty: HG is a documented **current**
maker-listed option, not just a review-sourced historical claim.

**SR327 Trail Expert 27.5** (5 rows: front + rear XD/MS × 148/157): the US
hayesbicycle.com/products/sr327-trail page 404s, but the identical live
product is served at eu.hayesbicycle.com/products/sr327-trail — fetched
directly, confirming 6-bolt disc mount, 32mm inner width, front 865g / rear
957g (exact match to the existing catalog figures — now real maker numbers,
not search-indexed estimates), and Shimano MicroSpline / SRAM XD freehub.
Price kept at the already-verified SR329 Trail Expert sibling's confirmed
USD figure (the EU page quotes EUR, not this catalog's USD convention) —
price is non-verdict-driving, left unchanged, noted in `desc`.

**Duroc SD37 Comp** (2 rows, `fw-sunringle-duroc-sd37-comp-29` +
`rw-sunringle-duroc-sd37-comp-29-hg`) — **stay unverified/Skipped.** Searched
hayesbicycle.com's current SUNringle Duroc SD37 lineup: only Pro and Expert
tiers are listed today; no "Comp" tier product page found. The existing rows
are sourced from rosebikes.com (the bike maker's own stock-spec line for the
Root Miller 1), which is a legitimate source for confirming the OEM spec
exists, but weight is a carried-over Expert-tier estimate, not a real
Comp-tier figure — no maker page to verify against. No change.

**Duroc 35** (2 rows, `fw-sunringle-duroc35-29-boost110` +
`rw-sunringle-duroc35-29-boost148-ms`) — **stay unverified/Skipped.** Found
and fetched the real Duroc 35 Expert 29" page (via a Wayback snapshot of
hayesbicycle.com/products/duroc-35-expert-29, since the live US page
soft-404s): confirms Boost110 front, 148 Boost rear, 6-bolt SRX hub, 31mm
inner width, front 883g / rear 983g. **But** the catalog rows are sourced
from radon-bikes.de's stock-spec line ("SUNringle Duroc 35, 110/148mm")
which does **not** state a Pro-vs-Expert tier, and Duroc 35 Pro 29" carries a
different real weight (827g front / 1019g rear per hayesbicycle.com) — since
I cannot pin which tier Radon actually specs on the Cragger 7.0, applying
either tier's real weight would be a guess between two different real
numbers, which is worse than the honest existing sample. Left unverified,
reasoning documented in each row's `desc` is unchanged from the prior
session's (still accurate).

## 4. Michelin tires — 0/9 verified (confirmed hard wall, weight-only)

Re-attempted all reachability paths this session: WebFetch on
michelinman.com/bicycle/tires/michelin-wild-enduro-{ms,mh}-racing-line,
michelin-dh22-racing-line, michelin-dh34-racing-line (JS-rendered, no spec
content in the raw fetch); `bdata scrape` on the same four URLs (the
Bright-Data unlocker DOES render the full page this time, unlike a plain
fetch — no 403/blocking wall) but **the rendered HTML itself contains no
weight/TPI/casing spec table at all** for any of the four product pages —
only marketing copy and gallery images. Also fetched
michelinmedia.com/wildenduroewildracinglines/ (the press release already
cited by the existing rows) directly: confirms sizes (29x2.40/27.5x2.40 MS,
29x2.50/27.5x2.50 MH), casing ("dual-ply, 55TPI"), compound ("Magi-X"), and
a relative claim ("10% weight reduction" vs the predecessor) — but **no
absolute per-SKU gram figure anywhere**, confirming this is a genuine
"manufacturer does not publish this data" wall, not a fetch-access wall
(bdata's own unblocker doctrine note in VERIFY-PROTOCOL.md flags Michelin as
a walled target to retarget — retargeted, and it's not the CAPTCHA/bot-wall
kind of block; the data simply isn't published anywhere Michelin serves).

Per VERIFY-PROTOCOL.md/DATA-ENTRY-TEMPLATE.md §5, tires require a real
maker-published **per-SKU** weight — no nominal-weight or third-party-measured
substitute is allowed for this category (unlike shocks/wheels/forks). None of
the 9 Michelin rows can meet that bar today. All 9 stay exactly as they were
(honest unverified samples, retailer/press-coverage-sourced per the relaxed
inclusion policy) — no field changes, no corrections needed, confirmed
Skipped for this session.

## Gates (after every batch)

- `node validate.js`: 0 problems throughout (2916 → 2935 → 2947 verified).
- `npx vitest run`: 699/699 passed, unchanged, every commit.
- `npx tsc --noEmit`: clean, every commit.
- `node tools/verdict-audit-harness.js`: 0 flags (A), 0 preset conflicts (B),
  329 clean / 0 errors + 5/5 wheel-substitution (C), 15/15 adversarial + 2/2
  compatible-partial (D) — unchanged shape across all three commits.

## Corrections summary (for the coordinator's report)

| id | field | before → after | why |
|---|---|---|---|
| `sh-ohlins-ttx2air-190x45` | weight | 400 → 451 | real maker figure found |
| `rw-spank-359-29` | weight, intWidth, price | 1180/31/400 → 1189/30.5/480 | real maker figures |
| `rw-spank-359-29-ms` | weight, intWidth, price | 1180/31/400 → 1189/30.5/480 | real maker figures (XD anchor) |
| `rw-spank-359-275` | weight, price | 1180/450 → 1141/480 | real maker figures |
| `rw-spank-359-275-ms` | weight, price | 1180/450 → 1141/480 | real maker figures (XD anchor) |
| `fw-sunringle-durocsd37pro-29` | weight | 1050 → 940 | real maker figure |
| `rw-sunringle-durocsd37pro-29-*` (6 rows) | weight | 1180 → 1108 | real maker figure |

No verdict-driving field regressed; the `verdict-audit-harness.js` shape is
identical before/after every commit.

## Not attempted / out of scope

Nothing left un-triaged within the four named pools — every unverified row in
each was either verified or explicitly Skipped with a documented reason above.
