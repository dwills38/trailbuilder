# MTB TAIL 9 — wheel/tire verification grind notes (2026-07-21)

Branch: `verify/mtb-tail-9`. Scope: `fw-`/`ti-` (and touched `rw-`) queue items,
frame category deliberately SKIPPED per brief. 9 commits, all four gates clean
after every batch (`node validate.js` 0 problems, `npm test` 988/988, `npm run
typecheck` clean, `node tools/verdict-audit-harness.js` 0 flags/9-9/assemble
clean).

## URL patterns that worked this session

- **DT Swiss**: `dtswiss.com/en/wheels/wheels-mtb/<category>/<model-slug>`
  loads a summary-only page. Its **"Choose model" button is click-triggered**
  (browser pane `javascript_tool` click, not URL-addressable) and opens a
  **model-finder table with real per-SKU net weights** the plain page load
  never shows. This unlocked accurate weights for XM1700, FR1500, F1900,
  M1900 families that prior sessions could only get "from Xg per set"
  summary figures for.
- **Bontrager/Trek**: `trekbikes.com/.../<slug>/p/<id>/` pages render fully
  in the browser pane once the **"Specs" tab is clicked** (`javascript_tool`
  click). The resulting `table tr` DOM has clean `th | td` pairs (`Array.from
  (document.querySelectorAll('table tr'))`) giving separate Front/Rear columns
  with real weights, hub widths, axle sizes, rotor mount, rim width (inner),
  freehub body/cassette-interface. This is the SAME page a prior session
  marked "JS-rendered/fetch-blocked" for WebFetch — the browser pane +
  Specs-tab click cleanly defeats that, no anti-bot circumvention involved.
- **Maxxis**: plain `WebFetch` on `maxxis.com/us/tire/<model>` sometimes
  resolves an ambiguous casing/Tech-column field a prior fetch couldn't parse
  (worked for Minion DHF, Dissector) — worth a quick re-try before assuming a
  wall; failed on Ardent Race (table didn't extract via WebFetch or the
  browser pane's plain `table tr` query this session — likely needs a
  different DOM selector or a click to reveal, not pursued further).

## Disposition summary (this session only)

**Verified (weight/interface corrections from real maker pages), ~28 rows:**
- DT Swiss: `fw/rw-dtswiss-xm1700-275`, `rw-dtswiss-fr-1500-29/275-157-hg`
  (×2), `rh`-none (hubs stayed Skipped, see below)
- DT Swiss F1900: 2 rows corrected + freehub relabeled MicroSpline→HG
  (`rw-dtswiss-f-1900-29/275-157-hg`, old `-ms` ids retired to ALIASES)
- Bontrager tires: SE4/SE5(one point)/SE6/XR1/XR4(×2)/G5(sourced, not
  verified — see gate note) — 8 rows
- Bontrager wheels: Line Pro 30 (29+27.5, front+rear+MS siblings), Line
  Elite 30 (29+27.5 front, 29 rear+MS+HG), Line Comp 30 (29+27.5,
  front+rear+HG+MS), Kovee Elite 30 29in (front+rear) — ~20 rows
- Maxxis: `ti-maxxis-minion-dhf-29-25-mt` (casing:exo resolved)

**Skipped (bar genuinely can't be met, reason recorded in job state), ~35 rows:**
- DT Swiss: E593 (rim-only product, no complete-wheel SKU), LN XC (Canyon
  house name, no DT Swiss retail SKU), XR1700 (genuinely delisted), M1900
  SuperBoost157 ×3 (real but OEM-only, never a DT Swiss retail SKU), rear hub
  350 Boost148 ×2 (interfaces confirmed, no weight published anywhere),
  ~14 OE hand-built hub+rim combos (Roval alloy, WTB rims, komtrail, ex511,
  amln370, fr541/240, e532, custom-148/150 FR1500 points) — no dedicated page
  for the specific assembled wheel exists
- Bontrager tires: XR5-29 (no such SKU width), SE5×2-2.5in (Trek's SE5 line
  never sold a 2.5in width — flagged as a possible sourcing mismatch, not
  altered), Montrose Comp / Brevard Pro XR 27.5 / Sainte-Anne 29x2.2 (no
  compound stated / no matching-size SKU — re-confirmed mtb-tail-8's prior
  findings)
- Bontrager wheels: Line Elite 30 275in rear (XD/MS/HG) — only pages found
  are a different generation (aluminum/HG, model 545381) that doesn't match
  this row's carbon/XD spec; Roscoe/Session/Marlin/X-Caliber OE house wheels
  (Line TLR30, Line DH, Kovee Marlin/X-Caliber OE, Connection) — entry-level
  OE specs sourced from vitalmtb build sheets, no standalone retail page

**Near-dup merges (retired to ALIASES, completebike fills repointed):**
- `fw/rw-bontrager-lineelite-30-275(-xd)` → hyphenated `line-elite` keepers
- `rw-dtswiss-f-1900-29/275-157-ms` → corrected `-hg` ids (freehub was wrong)
- `ti-maxxis-dissector-29-24-mt` → `ti-maxxis-dissector-29-24-exo-mt`

## New vocab added (flagged per instructions)

- `src/schema.js` + `src/types.js`: casing vocab gained **`downhill-strength`**
  (Bontrager G5 Team Issue's DH-tier casing name, printed verbatim on
  trekbikes.com's Specs table) and **`pro-xr`** was retroactively added to
  `types.js` (it existed in `schema.js` from mtb-tail-8 but had never been
  added to the JSDoc typedef — a pre-existing drift, fixed as a drive-by).

## A finding NOT acted on (flagged for a future pass, not fixed here)

DT Swiss's XM1700 wheel family: dtswiss.com's own model-finder states native
`BRAKE INTERFACE: Disc Center Lock` with an included `IS 6-bolt adapter MTB`
— meaning the true native mount is Center-Lock, not the `rotorMount:'sixbolt'`
this catalog's XM1700 rows carry (based on Canyon's OE build-sheet wording).
~10 completebikes use this wheel family with 6-bolt rotor fills. Changing
`rotorMount` to `CL` (matching the M1900 family's already-correct modeling)
would only produce a truthful adapter-tier WARNING via rule 8 on those
builds (not an error), so it's likely a net-correct fix — but it ripples
across ~10 complete-bike rows and is a bigger, more careful project than this
session's scope. Documented in the row's own `desc` for whoever picks it up.

## Current queue state (end of session)

```
Verified   3238   (was 3206 at session start)
Failed     50
Skipped    232   (was 185 at session start)
Remaining  1375   (was 1457 at session start)
Progress   3520/4895 (~72%)
```

Frame category untouched (per brief). Remaining `fw-`/`rw-` pending queue is
now dominated by pure OE-spec builder-generic wheels (Race Face AR30/AR27/ARC30,
Industry Nine, We Are One, Reserve, Halo, Alex Rims, Stan's, WTB rim+hub
combos) — item 3 of the brief ("verify normally where a maker page exists,
else leave honestly unverified") was not reached this session due to time;
a future pass should sample a few (We Are One, Industry Nine, Reserve all
have real maker sites, unlike the mostly-hand-built OE combos already
Skipped here) before bulk-Skipping the rest. The `ti-` tail is down to 50
items (mostly Panaracer/Schwalbe/Kenda/Specialized/WTB/Continental single
rows), untouched this session beyond the Maxxis pair above.
