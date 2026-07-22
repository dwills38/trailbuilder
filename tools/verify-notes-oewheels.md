# OE-spec wheel verification — We Are One / Industry Nine / Reserve (mtb-oewheels-1, 2026-07-21)

Full per-row pass over the ~90-row (80 actually unverified) OE-spec wheel batch from
mtb-tail-10's fabrication sample. Dispositions below; job-file state is the coordinator's
job (not touched here per brief).

## Summary

| Brand | Total rows | Promoted this session | Verified now | Still unverified |
|---|---|---|---|---|
| Reserve | 21 | 6 | 17 | 4 |
| We Are One | 41 | 17 | 17 | 24 |
| Industry Nine | 29 | 3 | 3 | 26 |
| **Total** | **91** | **26** | **37** | **54** |

## Reserve (6 promoted, 4 left unverified)

**Promoted** (fresh reservewheels.com + oneupcomponents.com fetches this session,
wheel interface-verification exception, nominal weight/price disclosed):
- `fw-reserve-30sl-29`, `fw-reserve-30sl-275` — carbon 30|SL front, both sizes.
- `fw-reserve-30hdal-oneup-29`, `rw-reserve-30hdal-oneup-29-ms` — 30|HD AL rim + OneUp hub combo.
- `fw-reserve-30slal-oneup-29`, `rw-reserve-30slal-oneup-29-ms` — 30|SL AL rim + OneUp hub combo.

rotorMount:sixbolt on the OneUp-hub rows is corroborated by multiple retailer SKU titles
("OneUp Components Front Boost 6-Bolt Hub") — OneUp has never shipped a Center-Lock hub;
not textually stated on the maker's own product-spec page, but no CL SKU exists anywhere
in the market to contradict it.

**Left unverified** (re-fetch attempted, both sourced Santa Cruz spec-panel URLs now 404 —
could not re-confirm this session, no fabrication):
- `fw-reserve-30hd-al-29-dh`, `rw-reserve-30hd-al-275-157-hg` (Santa Cruz V10 X01 DH OE spec).
- `fw-reserve-30tr-al-29`, `rw-reserve-30tr-al-29-hg` (Santa Cruz Hightower R OE spec).

## We Are One (17 promoted, 24 left unverified)

**Promoted** (fresh weareonecomposites.com fetches this session — Deal, Sector, Triad
product pages + the all-carbon-wheels-and-rims collection page):
- Deal: `fw-weareone-deal-29`, `fw-weareone-deal-275`, `rw-weareone-deal-29-148-xd`,
  `rw-weareone-deal-29-157-xd`, `rw-weareone-deal-275-148-xd`, `rw-weareone-deal-275-157-xd`.
- Sector: `fw-weareone-sector-29`, `rw-weareone-sector-29-148-xd`, `rw-weareone-sector-29-157-xd`.
- Triad: `fw-weareone-triad-29`, `fw-weareone-triad-275`, `rw-weareone-triad-29`,
  `rw-weareone-triad-29-ms`, `rw-weareone-triad-29-hg`, `rw-weareone-triad-275`,
  `rw-weareone-triad-275-ms`, `rw-weareone-triad-275-hg`.

**Left unverified — softer sourcing** (2 rows): `fw-weareone-deal-29-20x110`,
`fw-weareone-deal-275-20x110`. The 20x110mm DH front axle is inferred from an Industry
Nine Hydra hub end-cap-kit product, not a direct statement on the Deal product page itself.
Flagged as-is by the prior session; still the weakest link in this family, not fabricated.

**Left unverified — discontinued, page 404s** (22 rows): all Faction (6), Strife (8), and
Union (8) rows. **Confirmed this session**: weareonecomposites.com's own live Deal page now
states "Deal wheels and rims are now available at Industry Nine.com" — the Revolution-series
product pages (Union/Strife/Faction) are gone from the live site, matching the discontinued
status already recorded on these rows by a prior pass (2026-07-14 wao-convergence-rename).
No manufacturer page exists to re-confirm against; their existing historical
sourcing (vitalmtb spec guides, outset.bike/competitivecyclist.com retailer listings,
Pinkbike/Blister/Singletracks reviews) stands unchanged.

## Industry Nine (3 promoted, 26 left unverified)

**Promoted**: `fw-industrynine-whisp-29`, `rw-industrynine-whisp-29-ms`,
`rw-industrynine-whisp-29-xd` — Whisp Carbon, re-fetched fresh via
industrynine.com/products/whisp-cr (hub-builder page).

**★ FINDING worth flagging to the coordinator**: Industry Nine and We Are One have
**fully merged into one "2026 lineup"** — industrynine.com's homepage now reads
"// NEW 2026 LINE UP //" and lists Deal / Fuse / Whisp / Wanderer / Triad / Sector Carbon
at a shared base price, all built on WR1 Convergence carbon rims. Whisp is sold under BOTH
brand names for the physically same product (confirmed: identical hub/freehub/rotor option
lists on both weareonecomposites.com's collection page and industrynine.com's builder page).

**Left unverified — old I9-branded lines, pages 404 (26 rows)**: Enduro S (Classic/Hydra,
10 rows), Hydra2 DH (10 rows), Hydra/Reynolds Blacklabel XC (2 rows), 1/1 Enduro (2 rows +
2 more counted above). Every old-style URL tried this session
(`/wheels/mountain/classic-enduro-s/`, `/products/deal`, `/products/hydra2-dh`,
`/products/1-1-enduro-s`) now 404s or redirects into an empty filtered collection
("No products found"). This strongly suggests these product lines were **retired in the
same 2026 brand-merger event** that renamed We Are One's Union→Triad, Faction→Sector,
Strife→Deal — Industry Nine's own legacy hub-tier lineup (Enduro S, Hydra2 DH, etc.)
appears to have been folded into the same unified Deal/Sector/Triad/Whisp/Wanderer/Fuse
range, just sold under two brand names.

**This is a genuine catalog-scale finding, not something this session tried to patch
piecemeal**: the ~90 complete bikes that reference these older Industry Nine SKUs (Pivot,
Norco, Antidote, etc. OE spec sheets) were themselves fetched against the OLD site
structure and are presumably still accurate as a historical record of what those bikes
shipped with — but if Douglas wants the *current-catalog* Industry Nine wheel family
reorganized to match the live 2026 lineup (the way We Are One's family already was on
2026-07-14), that is a deliberate, scoped catalog-restructuring decision, not a
verification-pass fix. Recommend a coordinator packet, not silent re-modeling.

## Gates run after every batch

`node validate.js` (0 problems each time), `npm test` (988/988 passed each time),
`node tools/verdict-audit-harness.js` (clean each time — no rotorMount/hub/freehub/intWidth
*value* actually changed, only provenance fields were added, but the harness was run per the
brief's mandatory-gate rule anyway), `npx tsc --noEmit` (silent, exit 0).
