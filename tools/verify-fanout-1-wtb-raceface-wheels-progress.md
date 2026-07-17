# verify/fanout-1-wtb-raceface-wheels — progress log

Branch: `verify/fanout-1-wtb-raceface-wheels` (feature branch, NOT pushed to main, NOT
merged). Scope: every unverified `cat:'frontwheel'`/`cat:'rearwheel'` row where
`brand` is **WTB** or **Race Face** — 54 rows total (23 Race Face, 31 WTB), built via
an ad hoc node script on `PARTS` (not `tools/verify-job.js`, per the brief). Does NOT
touch `tools/verification-job.json`.

## Headline result: 0 new `verified:true` rows, 1 real correction (2 rows)

This cluster turned out to be almost entirely wall-blocked for full verification —
consistent with (and reconfirmed) the findings already logged in
`tools/verify-fanout-1-mixed-progress.md` from a prior session. Two independent,
compounding walls:

1. **WTB has renamed/discontinued its entire OE-era rim lineup.** Every rim name
   this catalog's rows use (`ST i27`, `ST i30 TCS 2.0`, `ST Light`, `ST i35 TCS 2.0`,
   `STX i25`, `Frequency i30`, `Sporterra i30`, …) 404s on `wtb.com` today —
   confirmed fresh this session (`curl -sL -o /dev/null -w '%{http_code}'` against
   `st-i27`, `st-i30-tcs-2-0`, `st-i25`, `stx-i25`, `frequency-i30`, `st-i35-tcs-2-0`,
   `sporterra-i30`, `st-light` — all 404). WTB's current rim lineup is
   `CZR`/`KOM Light`/`KOM Tough`/`HTZ`/`Proterra` (confirmed live at
   `wtb.com/collections/xc-trail-rims` and `wtb.com/collections/mountain-wheels`).
   None of this worklist's 31 WTB rows use one of the current names, so none of
   their rim specs (intWidth/maxTire) can be independently re-confirmed on a live
   manufacturer page this session.
2. **The OE hubs paired with those rims have no standalone manufacturer page
   either.** `WTB Frequency` (WTB's own OEM-tier hub) has no product page at all
   (`wtb.com/collections/hub-parts` sells only spare parts, no complete hub SKU);
   Novatec's D791SB/D902SB hub family (used on the `wtb-i30-oe`/`wtb-sti30-novatec`
   rows) has a real manufacturer (`novatecusa.net`) but its site is largely
   non-functional this session (product-category pages render empty via both
   WebFetch and `bdata scrape`; direct product-slug guesses 404 or 503). Race
   Face's Trace/Vault hub product pages (`raceface.com/products/trace-j-bend-hub`)
   fetch cleanly but **never state rotor mount anywhere on the page** — re-verified
   this session via full-text `bdata scrape` + grep for "bolt"/"center lock"/"rotor",
   zero hits, matching the prior session's identical finding.

Per THE BAR ("interfaces are ALWAYS manufacturer-sourced — no exceptions"), neither
wall can be worked around: a row needs the maker's OWN page for hub axle/freehub/
rotor-mount AND rim intWidth/maxTire, and for this entire cluster at least one half
of that pair is unreachable.

## Race Face (23 rows) — all Skipped, wall reconfirmed

Fetched `raceface.com/collections/wheels` (current lineup: Era/Turbine(SL/R30/R35/
eMTB)/Aeffect R/Atlas/Next R — no `AR 30`/`AR 27`/`ARC 30`/`Turbine SL` standalone
wheelset exists today) and confirmed by direct URL probe that none of
`ar-30-wheelset`/`ar-27-wheelset`/`arc-30-wheelset`/`ar30-wheel`/`arc30-wheel`/
`trace-wheelset` resolve (all 404). "Trace" now names a **hub** (paired with the
current `Aeffect R` rim/wheelset) rather than the old wheelset line the catalog's
`raceface-trace` family models — fetched `raceface.com/products/aeffect-r-wheels`
(30mm internal, 27.5/29, Boost110 front, Boost148/SuperBoost157 rear, HG/XD/
Microspline freehub — all confirmed) and `raceface.com/products/trace-j-bend-hub`
(same axle/freehub data, 188g lightest-config weight) — but **rotor mount is absent
from both pages**, full-text-grepped for "bolt"/"center lock"/"rotor" with zero
hits. Searched for a Race Face-hosted Trace hub install/drift-kit PDF (the same
`res.cloudinary.com/fox-factory` CDN pattern that unlocked the *Vault*-hub Turbine
R 30 wheels in the prior `verify-fanout-1-mixed` session, which states "ISO Standard
6 bolt" for Vault hubs) — no equivalent Trace-hub PDF found on that CDN; a
starbike.com/chrissports.ch-hosted "Trace Hub Service Manual" either 404s or is not
actually a PDF (HTML error page). Net: rotor mount for every Race Face row in this
worklist (`raceface-ar30-factor`, `raceface-turbine-sl`, `raceface-ar27`,
`raceface-ar30`, `raceface-arc30`, `raceface-trace`) remains manufacturer-unconfirmed
— genuinely walled, not a time-budget skip. `raceface-turbine-sl` is additionally
confirmed discontinued (no current product page under any tried slug). All 23 rows
left untouched (existing sample data was already honest/self-flagged as unverified).

## WTB (31 rows) — 1 correction applied, rest Skipped

### Correction: `fw-wtb-sti30-habitht-29` / `rw-wtb-sti30-habitht-29-hg` — rotorMount sixbolt → CL

Both rows use a "Shimano TC500" hub (per the existing vitalmtb.com-sourced desc).
FETCHED `productinfo.shimano.com/pdfs/product/latest/Specifications_en.pdf`
(current Spec Handbook, Ver.2.4, Jun 30 2026) — its "Front Hub (Disc Brake)" table
lists **every** current TC500 SKU (`HB-TC500-12`, `HB-TC500-15`, `HB-TC500-15-B`) as
`Brake type: CENTER LOCK disc brake`; no 6-bolt TC500 variant appears in that table
or in the 2023-2024 archive edition (`2023-2024_Specifications_v028_en.pdf`,
Ver.2.8) either — cross-checked both. The rear side (`FH-TC500-HM-B`/`-HL`/`-MS`)
is likewise Center Lock, 148mm O.L.D. for the Boost `-HM-B` variant matching this
build. The existing row explicitly self-flagged its `sixbolt` value as "not
independently re-confirmed... flagged" — this is that re-confirmation, and it
overturns the original guess. (A sibling family in the catalog, `wtb-sti25-tc500`/
`wtb-stxi25-tc500`, already had `CL` correct for the same hub — this was the one
inconsistent row.) **Not promoted to `verified:true`**: the paired WTB rim
("ST i30 TCS 2.0") is one of the discontinued names above, so intWidth/maxTire
can't be independently re-confirmed this session.

**Side note for the coordinator (out of this branch's scope, NOT touched):** the
same Shimano handbook search turned up `fw-vitus-tc500-29-6b`/
`rw-vitus-tc500-29-6b-hg` (Vitus-branded rows, different worklist) which carry
`rotorMount:'sixbolt'` sourced from `vitusbikes.com`'s own build sheet stating
"6-bolt disc" for a Shimano TC500 hub — but Shimano's own spec handbook shows no
6-bolt TC500 SKU ever existing. This looks like the same class of bike-brand
OE-sheet error as the corrected WTB rows above, but it's a Vitus-brand row outside
this branch's WTB/Race Face scope — flagging rather than fixing.

### Corroborating (not promoting) finds

- **WTB's current-generation complete wheelsets are 6-bolt-only, company-wide.**
  Fetched `wtb.com/collections/mountain-wheels` — every current WTB-branded
  complete wheel (`CZR i30`, `HTZ i30/35/40`, `Proterra Light i27`, `Proterra Tough
  i30`) has "6-bolt" baked into the manufacturer's own product-image filenames
  (e.g. `W045-0256_CZRi30x29wheel_110x15mm_28h_6-bolt_DB_...jpg`). This corroborates
  (but does not manufacturer-page-confirm, since it's a *different*, newer hub than
  the discontinued "WTB Frequency" OEM hub this worklist's rows use) the existing
  "WTB Frequency-series hubs are 6-bolt" convention already documented across
  several rows' `desc` fields (`fw-wtb-frequency-i30-29`, `fw-wtb-sporterra-i30-29`,
  `fw-wtb-frequency3x-sti30-29`) from prior sessions. Left those rows' `sixbolt`
  values as-is (already correctly reasoned, just not maker-page-provable for the
  exact discontinued hub) — did not touch.
- **WTB's current rim pages DO confirm intWidth for two families already in this
  worklist that share a current rim name**: fetched
  `wtb.com/collections/xc-trail-rims/products/kom-light-i30` (30mm inner width,
  confirmed via the page's own spec table) and `.../products/kom-tough-i30` (30mm
  inner width) — both match this catalog's existing `intWidth:30` for
  `wtb-frequency-komlighti30` and `wtb-frequency-koi30`. Rim half confirmed; hub
  half (`WTB Frequency`) still has no standalone page, so still short of the full
  bar — left unverified, not touched (no value already correct to overwrite).
- Fresh 404 checks this session on `st-i35-tcs-2-0`, `sporterra-i30`, `st-light`
  (used by `wtb-sti35tcs20`, `wtb-sporterra-i30`, `wtb-stlight`) confirm those rim
  names are gone too — same wall, no further action.

### Novatec hub path (attempted, dead this session)

`wtb-i30-oe`/`wtb-sti30-novatec` families cite a Novatec D791SB/D902SB hub. Novatec
is a real hub manufacturer with a real domain (`novatecusa.net`), so this looked
like a promising lead distinct from the WTB-Frequency/Race Face dead ends — but the
site itself is largely non-functional this session: `novatecusa.net/product-category/
hubs/enduro/` returns an empty page (both WebFetch and `bdata scrape`), and guessed
product slugs (`d791sb-b15`) 404 or 503. Not pursued further; flagged as a possible
lead for a future session if the site recovers.

## Gates (after the one correction batch)

- `node validate.js` → `DATA OK - 5026 parts, 0 problems (2868 verified, 2158 unverified)`
- `npx vitest run` → `699 passed (699)` — matches the stated baseline exactly, no
  regressions, nothing weakened.
- `npx tsc --noEmit` → clean, no output.
- `node tools/verdict-audit-harness.js` → 0 flags (A), 0 preset conflicts (B), 329/0
  clean assemblies (C) + 5/5 wheel-substitution clean (C2), 15/15 adversarial
  clashes correctly flagged + 2/2 compatible partials clean (D), same 5
  fork-family rotor-max false-warn candidates as baseline (E, unrelated to this
  branch's edits). No shape change from the rotorMount correction — the corrected
  build (`cb-cannondale-habit-ht-1`, which stocks 6-bolt SM-RT86 rotors on what is
  now a Center-Lock-confirmed hub) is not in the harness's ASSEMBLE/ADVERSARIAL
  fixture set, so no verdict-count delta to report; conceptually the correction
  would surface a new rule-9 adapter-tier warning (not an error) on that one real
  bike if it were exercised, which is the *correct* behavior for a CL-hub + 6-bolt
  Shimano-rotor pairing per this engine's documented rule-9 semantics.

## Summary

- **Verified before/after: 2868 → 2868** (no new fully-verified rows this batch —
  both walls documented above block every row in scope from reaching the full bar).
- **Corrections without verification: 2 rows** (`fw-wtb-sti30-habitht-29`,
  `rw-wtb-sti30-habitht-29-hg`, rotorMount sixbolt→CL, Shimano spec-handbook
  sourced).
- **Skipped: 52 rows** (23 Race Face — rotor-mount-never-published + one
  discontinued line; 29 WTB — discontinued rim names and/or no standalone OEM-hub
  page), all with reasons above.
- **Contradictions flagged, not silently overwritten**: the Vitus TC500 6-bolt row
  (out of scope) noted above for the coordinator.
- **Walls hit**: WTB's OE-era rim naming is fully retired (renamed to CZR/KOM/HTZ/
  Proterra); Race Face has never published hub rotor mount on any product page,
  confirmed independently by two separate sessions now; novatecusa.net is largely
  non-functional this session.
