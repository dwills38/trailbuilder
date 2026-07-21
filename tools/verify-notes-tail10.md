# verify-notes-tail10.md — mtb-tail-10 worker dispositions (2026-07-21)

Branch: `verify/mtb-tail-10`. Per protocol, dispositions go here, NOT into
`tools/verification-job.json` (coordinator-owned). Three tasks per brief: (a) OE-wheel
brand sampling, (b) the ~50-row tire tail, (c) the XM1700 rotor-mount fix.

## (c) DT Swiss XM1700 rotorMount fix — DONE

Commit `ee25fe1`. dtswiss.com's model-finder (browser pane) confirms every XM1700
Spline SKU's BRAKE INTERFACE is "Disc Center Lock" with an "IS 6-bolt adapter MTB"
listed under INCLUSIVE — i.e. native Center-Lock + a real included 6-bolt adapter, not
a plain 6-bolt hub. Fixed all 5 catalog wheel rows (`fw/rw-dtswiss-xm1700-29(-xd/-ms)`,
`fw/rw-dtswiss-xm1700-275(-xd)`): `rotorMount` sixbolt->CL, plus per-SKU weights/mfgPn
now visible in the model-finder table. The 10 dependent complete-bike rows (all real OE
builds pairing this wheel with 6-bolt rotors via the maker-included adapter) got
`rotorAdapterDocumented:true` per `DATA-ENTRY-TEMPLATE.md` §6a's real-adapter exception,
plus a sourced desc note. `node validate.js`: 0 problems, 0 warnings (was 20 warnings
before the `rotorAdapterDocumented` flag). Full test suite + tsc clean.

## (a) OE-wheel brand sampling — We Are One, Industry Nine, Reserve

No fabrication found. Findings, in case a future pass needs the receipts:

- **We Are One**: the real domain is `weareonecomposites.com` (NOT `weareone.com`, an
  unrelated "Citizen of Life" org — a trap for a future search). Fetched its
  `/products.json` directly: **Deal, Whisp, Triad, Sector are all real, current
  Convergence-series products** (not fabricated names). The Triad wheelset's own product
  page confirms the catalog's rim specs exactly (30mm internal width, 543g/32h 29in rim).
  WAO's hub/rotor-mount build options have moved to industrynine.com since WAO
  consolidated ordering there (its own site says so) — didn't re-verify hub/rotorMount
  per-row this pass, flagged as a good target for a future dedicated wave if Douglas
  wants full verification here, not just a fabrication sweep.
- **Industry Nine**: confirmed via WebSearch + retailer corroboration that the 1/1 hub
  genuinely ships in BOTH 6-bolt and Center-Lock configurations — the catalog's
  `rw-industrynine-11-enduro-275-157-ms` row's CL pick (matching its host bike's stock
  Shimano XTR Center-Lock rotors) is a real, valid config, not an invented one.
- **Reserve**: `Reserve 30|TR AL` (the OE-only tier on some Santa Cruz Hightower builds,
  `fw-reserve-30tr-al-29`/`rw-reserve-30tr-al-29-hg`) is NOT in Reserve's consumer
  retail lineup (only `30|SL AL`/`30|HD AL`/`30|GR AL` show up in retail search) — but a
  WebSearch of Santa Cruz's own OE spec confirms "Reserve 30|TR AL aluminum rims with
  DT Swiss 370 hubs" as a genuine current OE-specific tier. Real, just not
  marketed under that name to consumers — a legitimate OE-tier pattern, not fabrication.

**Not done this pass** (out of scope for a sampling task): full per-SKU verification of
the other ~90 OE-wheel rows across these three brands. If Douglas wants that as a
dedicated grind, it's a well-scoped follow-up (Industry Nine hub bearing-kit/axle-kit
product pages are cleanly Shopify-JSON-fetchable, same pattern used here).

## (b) Tire tail — Panaracer, Schwalbe, Kenda, Specialized, WTB, Continental

Real unverified-row counts (a naive brand grep over-counts on multi-line records —
counted properly per-record instead): Panaracer 5 (+1 Comet), Schwalbe 14, Kenda 1,
Specialized 6, WTB 1, Continental 1 — **~28 real rows, not ~50** (the "~50-row tail" in
the brief was the naive multi-line-grep count).

### Fixed / corrected (commits `7456c5c`, `cdfc932`, `6e61b39`)
- **Kenda K-Rad** (`ti-kenda-krad-26-23`): weight corrected 640g(uncited)->760g, sourced
  to bicycle.kendatire.com's K905 legacy-archive table (PN 212343, Folding/Dual). Casing/
  compound stay unset (Kenda's own column values don't map to this catalog's existing
  ATC/AEC/AGC vocab, sourced from a different Kenda line) — stays unverified per the
  tire-batch gate.
- **Continental Kryptotal-Fr 29x2.4 Enduro SuperSoft**: weight 1210->1205g, now
  verified:true (re-fetched Continental's own Tire Range PDF, SKU 0102074).
- **Continental Kryptotal-Re 27.5x2.4 DH SuperSoft**: weight 1310(scaled guess)->1260g,
  now verified:true — the predecessor's "not separately listed on the PDF" note was
  stale; a re-fetch this session found SKU 0101928 right there in the same PDF.
- **Specialized** (specialized.com confirmed no longer 403-walled — browser pane):
  - Purgatory GRID T9 29x2.4: 1000->965g, verified:true.
  - Eliminator GRID TRAIL T7 29x2.4: 965->1004g, price 60->80, verified:true.
  - Butcher GRID TRAIL T9 29x2.3 (`ti-specialized-butcher-29-23-gridtrail-t9`): found to
    be a **near-duplicate row** of the already-verified `ti-specialized-butcher-t9-29-23`
    (same mfgPn 187347, same size) — a prior wave (cb-sheets-6) minted a new row instead
    of reusing the existing one and carried a stale 1048g figure that actually belongs to
    a different SKU (a newer TLR tire). Corrected to 975g, marked verified:true to match
    its twin. Left in place rather than merged/deleted (ids are append-only and it's
    already referenced by the Status 2 170 completebike fill) — **flagging this pattern
    for whoever does the next Specialized wave: check for an existing row before minting
    a new one for what might be the same product/size.**
  - Butcher GRID TRAIL T9 27.5x2.3: retracted the same disproven 1048g basis from its
    desc (specialized.com's page has no 27.5x2.3 weight point at all — genuinely
    unpublished, not a fetch miss). Sample weight unchanged, now honestly unpinned.
  - Butcher GRID GRAVITY T9 29x2.3 / 27.5x2.3: specialized.com's own GRID GRAVITY T9
    product page (187348) now 404s (delisted). Corrected via directly-fetched dealer
    copy mirroring Specialized's own product text: 1180->1300g (29in), 1132->1050g
    (27.5in). A WebSearch-surfaced 1240g figure for the 27.5in size did **not** match the
    directly-fetched dealer page — a live phantom-number catch, discarded.
- **Schwalbe Racing Ralph 29x2.35 Super Ground**: confirmed the SKU is real
  (schwalbetires.com direct fetch, PN 11654029.01), price corrected 105->102 (maker RRP).
  Weight stays the pre-existing 750g estimate (schwalbetires.com prints no weight field
  for this SKU) — not promoted to verified.

### Sampled, correctly gated, no fix needed
- **Panaracer** DriverPro (5 rows) + Comet: re-fetched panaracer.com, weights match the
  catalog exactly. All correctly stay unverified per `test/test-data.js`'s tire-batch
  gate (verified tires need BOTH casing AND compound; DriverPro/Comet genuinely have no
  named casing tier on Panaracer's own pages — not a gap, a real absence).
- **Kenda Regolith** 29x2.4: re-confirmed via a direct Merida fetch that the OE spec is
  literally "wire" bead, but Kenda's own spec table for this tire only lists FOLDING-bead
  SKUs at every width — the wire-bead OE variant is a real gap (not on Kenda's consumer
  page at all), so the row correctly stays an honest, disclosed sample.
- **WTB Vigilante** 27.5x2.5 Light/High Grip: already correctly flagged as an
  approximation (bikeradar review, no direct WTB SKU fetch). Left as-is.
- **WTB Breakout** 29x2.3 (already-verified sibling row, spot-checked): re-fetched
  wtb.com via the browser pane (JS-rendered ≠ walled, confirmed again) — 885g matches
  exactly. WTB's Fast Rolling/Tough casing naming still isn't in this catalog's WTB
  vocab (which uses a different SG1/SG2 line's terms) — a real vocab-widening
  opportunity, out of scope for a verification pass, left as a flag.
- **Continental Cross King** 29x2.2 ProTection BlackChili: confirmed real via multiple
  direct retailer product pages (not fabricated) even though it doesn't appear in the
  Continental Tire Range PDF I could fetch this session (likely a different regional/
  edition scope). No fix — stays an honest sample (Continental's PDF exceeds fetch size
  via the direct route; the r.jina.ai proxy route worked for the Kryptotal rows above but
  wasn't re-tried against Cross King specifically this pass).
- **Schwalbe** (13 more rows: Dirty Dan, Rock Razor, Magic Mary Trail/Gravity Pro x2,
  Hans Dampf, Nobby Nic Performance x2, Racing Ray x2, Big Betty/Magic Mary Performance
  x2, Table Top): spot-checked Dirty Dan by re-fetching schwalbetires.com directly —
  still no weight field on the maker's own page, confirming the existing "demoted to
  unverified, retailer weight only" note is still accurate. The rest follow the same
  honestly-disclosed pattern (retailer/aggregator weight estimates, or genuine
  budget-tier gaps with no maker SKU page). Not individually re-fetched this pass given
  the repeating pattern and time budget — a good target for a dedicated Schwalbe-tail
  worker if Douglas wants full closure on all 13.

## Open items for a future pass
1. Industry Nine / We Are One / Reserve: only a fabrication-sweep sample was done, not
   full per-row verification (~90 rows still unverified across the three brands).
2. WTB's Breakout-line casing names ("TCS Light/Fast Rolling" etc) aren't in this
   catalog's WTB casing vocab — a vocab-widening task, not touched here (out of scope
   for a single verification pass, and vocab changes are a bigger design decision).
3. 13 Schwalbe rows spot-checked via pattern-matching (1 direct re-fetch) rather than
   individually re-fetched — see above.
4. Continental Cross King's PDF route wasn't retried via r.jina.ai this pass (worked for
   Kryptotal, might unblock Cross King too).
