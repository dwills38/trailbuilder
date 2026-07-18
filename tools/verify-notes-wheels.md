# Wheels cluster verification notes — verify/wheels-1 (2026-07-18)

Scope: frontwheel, rearwheel, rim, fronthub, rearhub only (per assignment).
755 rows in scope at session start, 483 unverified. This session worked a
DT Swiss-focused batch (the family with the clearest per-SKU manufacturer
model-finder pages) plus spot-checks on a handful of `rim` rows. The bulk of
the 483-row backlog (Industry Nine, Bontrager, WTB, Race Face, Giant,
e*thirteen, Roval, Shimano, Halo, Specialized, Alex Rims, Syncros, Marin,
Reserve, Stans, Vitus, Nukeproof, Formula, Zipp, OQUO, Whyte, XLC, Newmen,
Hope, Onyx, Polygon, Focus, Diamondback, Orbea, Hunt, Spank, Norco, and more)
is UNTOUCHED — a future wheels session should continue there.

## Method

dtswiss.com's per-family pages (`/en/wheels/wheels-mtb/<category>/<model>`)
carry a "model finder" section with a full per-SKU matnr table (weight,
axle spacing, brake interface, cassette interface / freehub body, inner
width) once fully rendered. `mcp__exa__web_fetch_exa` renders this on some
fetches but not others (cache-dependent); `bdata scrape -f markdown` reliably
renders it. Where the table wasn't in the fetched output, I retried with
bdata before concluding data doesn't exist.

## Dispositions

### EX 1700 SPLINE (family: dtswiss-ex-1700)

| id | disposition | note |
|---|---|---|
| rw-dtswiss-ex-1700-29 | Verified | matnr WEX1700TEDRSA11693 CL+XD+29in: weight 1044→1030g (was a bikeradar-measured 3rd-party figure, now maker-published) |
| rw-dtswiss-ex-1700-29-hg | Verified | matnr WEX1700TEDBSA13810 — this SKU DOES exist in the current model finder (resolves a prior "not found" note from 2026-07-11); weight 1038→1031g |
| rw-dtswiss-ex-1700-275-xd | Verified | matnr WEX1700TGDRSA11687; weight 1000→984g (was a nominal scale-down estimate) |

### M 1900 SPLINE (family: dtswiss-m1900, Boost110/148 only)

All 7 already-`verified:true` Boost110/148 rows had their NOMINAL weight
(the family's own "from 1894g" combined-pair figure, split by ratio) upgraded
to the REAL per-matnr weight now visible in the model finder — a genuine
weight correction on already-verified rows, not a re-verification of
interfaces (those were already correct and unchanged):

| id | matnr | weight before → after |
|---|---|---|
| fw-dtswiss-m1900-29 | W0M1900BEIXSA18980 | 880 → 951g |
| rw-dtswiss-m1900-29-xd | W0M1900TEDRSA18983 | 1010 → 1063g |
| rw-dtswiss-m1900-29-ms | W0M1900TED2SA18981 | 1010 → 1072g |
| rw-dtswiss-m1900-29-hg | W0M1900TEDLSA18982 | 1010 → 1086g |
| fw-dtswiss-m1900-275 | W0M1900BGIXSA18857 | 870 → 896g |
| rw-dtswiss-m1900-275-xd | W0M1900TGDRSA18973 | 1000 → 1008g |
| rw-dtswiss-m1900-275-ms | W0M1900TGD2SA18861 | 1000 → 1017g |

**NOT touched:** rw-dtswiss-m1900-{29,275}-157-{xd,ms} (SuperBoost157 rows).
DT Swiss's current M1900 model finder shows ONLY 142mm and 148mm Boost rear
spacings — no 157/SuperBoost variant exists in the current retail lineup.
The catalog rows were entered on the strength of complete-bike spec pages
(Pivot Firebird/Switchblade/Mach 6) explicitly stating "157" DT Swiss M1900
wheels, which is plausible as an OE-only custom end-cap variant (the catalog
already documents an analogous case: the Canyon Sender's custom Boost148
FR1500 hub). Left Skipped — can't confirm or refute from the retail page,
and I won't guess.

### XRC 1200 SPLINE (family: dtswiss-xrc1200-spline) — Skipped, not fabricated

`fw-dtswiss-xrc1200-spline25-29`, `rw-dtswiss-xrc1200-spline25-29-ms`,
`rw-dtswiss-xrc1200-spline25-29-xd` (the "25mm internal width" rim variant)
and their `ws-` presets: the CURRENT dtswiss.com XRC 1200 SPLINE model finder
lists ONLY the 30mm-internal-width SKUs (matching the already-verified
`*-spline30-*` siblings). No 25mm-width XRC 1200 SKU appears anywhere on the
live page. This may be a discontinued/prior-generation tier or a data-entry
error from before my session — I did not touch these rows (no unilateral
deletes per my brief) but flag it for the coordinator: **these 3 rows +
4 wheelset presets may reference a SKU DT Swiss no longer sells.** Worth a
follow-up check (Wayback Machine for the old dtswiss.com "Spline 25" page)
before deciding to retire them.

### rim category — 5 unverified rows, all genuine walls, left untouched

- `rm-industrynine-endurosv2-{29,275}`: Industry Nine renamed "Enduro S V2"
  to "Enduro 305" — old SKU/name no longer resolves. Already flagged by a
  prior session for a same/different-generation judgment call; not resolved
  this session either (would need I9 archival confirmation).
- `rm-spank-359-29`: RE-CONFIRMED the WEIGHT (g) table cells on
  spank-ind.com/products/spank-359-rim are genuinely empty in the rendered
  page (checked via bdata scrape, which renders JS) — not a fetch failure,
  the page just doesn't publish per-width rim weight. The Shopify variant
  JSON's `"weight":610` field is uniform across every 27.5/29/28H/32H
  variant, which reads as a generic shipping/box weight, not a real
  per-rim mass — did NOT use it (would be fabricating precision the source
  doesn't support).
- `rm-weareone-union-29`: brand a-la-carte rim page 404s across every URL
  variant tried (already tried by a prior session); genuinely discontinued,
  no confirmed Triad-platform rim-only successor SKU exists.
- `rm-raceface-arc25-29`: raceface.com confirms the SKU exists but renders
  one blended weight figure with no per-width breakdown — genuine gap.

## Gates (this session, cumulative)

- `node validate.js`: 0 problems throughout (baseline and after every edit).
- `npm test`: 764/764 passed after the DT Swiss batch commit.
- `npx tsc --noEmit`: clean.
- `node tools/verdict-audit-harness.js`: byte-identical output before/after
  the batch (data-only corrections, no verdict deltas) — captured in the
  session's /tmp before/after files, not committed here.

## What's left (for whoever picks up the wheels cluster next)

- ~470+ unverified rows remain, dominated by We Are One (42), Industry Nine
  (~40 more), Bontrager (38), WTB (31), Race Face (26), Giant (25),
  e*thirteen (21), Roval (19), Shimano (18), Halo (14), Specialized (13),
  Alex Rims (12), Syncros/Marin (11 each), Reserve (10), Stans/Vitus (9 each).
- The DT Swiss family still has unturned stones: E 1900 / F 1900 / FR 1500 /
  E 593 / AM LN 370 / LN XC / 370-Classic hand-built-OE rows (most of these
  are genuinely hand-built hub+rim OE pairings with NO single manufacturer
  SKU page to fetch — the interface-verification exception doesn't apply
  because there's no maker page at all, only the frame-maker's OE build
  sheet, which is a different provenance tier). These would mostly stay
  Skipped even with more session time; don't expect much yield there.
- fronthub/rearhub as standalone-SKU categories (not `fw`/`rw` complete
  wheels) were not specifically targeted this session — worth a dedicated
  pass since a la carte hub pages (DT Swiss, Hope, Industry Nine, Chris King)
  tend to have the cleanest manufacturer spec tables of any wheel-adjacent
  category.
