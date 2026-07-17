# Support-parts verification grind — progress log

Branch: `verify/support-parts-1` (feature branch, NOT pushed to main).
Scope: unverified support-part rows added by the complete-bike grinds (5/salvage/6),
prioritized by (a) referenced in `completebike` fills, (b) fetchable maker.
Does NOT touch `tools/verification-job.json` (that job tracks the general verify
grind, not this batch — this file is the resumable state for THIS batch instead).

## Queue snapshot (built 2026-07-16, against origin/main @ 04da059, post-grind-6)

- Catalog-wide unverified: **1942** rows (2579 verified / 4521 total at batch start).
- Referenced by `completebike` fills + unverified: **1003** rows — this is the priority queue.
- Fetchable-brand breakdown of that 1003 (highest-count first): Fox(79), Shimano(52),
  RockShox(45), SRAM(45), DT Swiss(41), Giant(36, walled — house brand, skip),
  Bontrager(43, walled — Trek house brand, skip), WTB(29), Syncros(26), Marin(25),
  Race Face(22), Nukeproof(19), Canyon(18), Roval(17, walled — Specialized house
  brand, skip), Pivot(15, walled — skip), Maxxis(13), Norco(13), plus a long tail.
- Known walls confirmed this session (skip, don't retry without a new approach):
  Specialized(54, JS/403), Giant, Bontrager/Trek, Pivot, Roval — matches CLAUDE.md's
  existing wall list.

## Batch 1 — DONE (10 rows), committed

**DT Swiss E1900 family (4 rows, interface-verified, nominal weight per the
2026-07-14 wheels policy — re-fetched dtswiss.com/en/wheels/wheels-mtb/enduro/e-1900-spline
this session, same page/policy as the already-verified sibling rows):**
- `fw-dtswiss-e-1900-29` — verified, weight/price stay nominal per-wheel estimates.
- `rw-dtswiss-e-1900-29-xd` — verified, same basis.
- `rw-dtswiss-e1900-29-ms` — verified, same basis.
- `rw-dtswiss-e1900-29-hg` — verified, same basis.

**Maxxis tires (6 rows, FETCHED maxxis.com per-model spec table this session —
each correction below is the maker's own SKU-table weight vs. the prior
retailer/interpolated estimate):**
- `ti-maxxis-minion-dhr-ii-275-25-exop-mt` — weight 970 → **1068g** (corrected).
- `ti-maxxis-assegai-29-25-exop-mt` — weight 1210 → **1220g** (corrected).
- `ti-maxxis-rekon-29-26-exo-dual` — weight 960 → **941g** (corrected).
- `ti-maxxis-minion-dhf-275-25-exop-mt` — weight 1130 → **1096g** (corrected).
- `ti-maxxis-minion-dhr2-29-24-exo-dual` — weight 990 → **1040g** (corrected).
- `ti-maxxis-minion-dhr-ii-29-24-exop-mg` — weight 1215 → **1122g** (corrected).

Gates after batch 1: `node validate.js` → 2589 verified / 4521 parts, 0 problems.
`npm test` → 616/616 passed. `npm run typecheck` → clean.

## Contradiction list (for the coordinator)

None found this batch. All corrections above were on rows this session itself
verified for the first time (weight tightened from sample/interpolated to the
maker's exact SKU-table figure) — no interface field (mount/freehub/width) changed,
and no row previously verified by another session was touched.

## Skipped this batch (documented reasons, not retried without new data)

- **Fox shocks/forks (79 rows)**: Fox refreshed its Float X/X2/DHX line for 2026;
  current ridefox.com pages show only the NEW generation, and the catalog's rows
  model OLDER-generation OEM-spec SKUs (specific eye×stroke/travel points tied to
  specific already-cataloged complete bikes). Fetching the current product page
  risks misattributing 2026-generation specs/weights to an older-generation row.
  Needs either an archived/generation-specific page or a size-matrix approach —
  flagged for a follow-up session, not attempted further this batch.
- **SRAM PG-1210 cassette** (`ca-sram-pg1210`): already thoroughly fetched by a
  prior session (sram.com/en/sram/models/cs-pg-1210-a1) — interfaces are certain,
  but the manufacturer page explicitly states no weight is published. Genuinely
  weight-blocked; not re-attempted (would need a third-party MEASURED-weight
  source per the `sourceType:'measured'` policy — not searched for yet).
- **DT Swiss XM1700 family**: fetched dtswiss.com/en/wheels/wheels-mtb/all-mountain/xm-1700-spline
  directly — price/weight ("from $1,142"/"from 1825g") match the catalog's existing
  sample figures, BUT the page's rotor-mount claim was an unreliable AI-summarizer
  inference ("implied by rim design"), not an explicit statement — did not verify
  on that basis. The rows' 6-bolt mount is sourced from Canyon's OE spec page in a
  PRIOR session, not re-fetched by me this session (bar item 1 requires the fetch
  happen in-session) — needs a fresh canyon.com re-fetch to close, not attempted
  this batch for time.
- **DT Swiss X1900/M1900 SuperBoost157 siblings**: base M1900/X1900 families are
  already verified via dtswiss.com's model pages; re-fetched the M1900 page this
  session and it does NOT explicitly list a SuperBoost157 rear-spacing option (only
  the generic combined weight/price). The SuperBoost157 rows' hub-spacing fact comes
  from third-party bike-spec pages (vitalmtb/99spokes), which is solid corroboration
  but not a direct DT-Swiss-page confirmation — left unverified per THE BAR rather
  than force it.
- **Maxxis Dissector / Minion DHF plain-"WT" rows** (`ti-maxxis-dissector-29-24-mt`,
  `ti-maxxis-dissector-29-24-exo-3cmt`, `ti-maxxis-minion-dhf-29-25-mt`): the
  original bike-maker source pages (Whyte) didn't name a casing tier at all, so
  casing was deliberately left unset in the catalog. Maxxis's own SKU table always
  lists a specific casing per weight figure, so I can't pick a weight without also
  picking a casing the original source never stated — would be inventing data.
  Left unverified; a fix would require re-fetching the ORIGINAL bike's page to see
  if it names a casing after all.
- **Maxxis Ardent / Ardent Race**: maxxis.com/us/tire/ardent/ didn't return a
  parseable spec table via WebFetch this session (page structure differs from the
  DHR-II/Assegai/DHF/Rekon pages that worked cleanly) — worth a retry with a
  different fetch approach (e.g. the PDF catalog it references) next session.
- **SRAM rotors (CenterLine/HS2, ~15 rows in this queue)**: SRAM does not publish
  rotor weights (CLAUDE.md-documented wall) — needs `sourceType:'measured'` +
  `weightSource` third-party data, not attempted this batch.
- Everything else in the 1003-row priority queue not listed above: **not yet
  attempted** — Shimano (52, PDF-archive route now unblocked by poppler, high
  priority for next session), RockShox forks (45, same Fox-generation-ambiguity
  risk — check for archived/legacy pages first), remaining SRAM cranksets/brakes/
  derailleurs (many already weight-blocked per CLAUDE.md's documented Shimano/SRAM
  gaps — check `sourceType:'measured'` opportunities), remaining DT Swiss wheel
  families (350, AM LN 370, FR 1500, EX 511, LN XC — not yet fetched), WTB(29),
  Race Face(22), Nukeproof(19), Canyon(18), and the long tail of 1-8-row brands.

## Next session: resume here

1. Re-run the queue-build script (node -e snippet in this session's transcript,
   or rebuild: filter `PARTS` for `cat==='completebike'`, collect `fills` values,
   cross with `!verified`) against current origin/main — grinds/verifications
   keep landing, so re-run rather than trusting this file's counts.
2. Try the poppler PDF route for the 52 Shimano rows (productinfo.shimano.com
   archive editions) — flagged as newly unblocked in the coordinator's handoff.
3. For Fox, look for an archived (Wayback) or generation-specific product page
   before fetching the live ridefox.com pages, to avoid the 2026-refresh trap.
4. For SRAM/Shimano weight-blocked rows, search for reputable third-party
   MEASURED weights (scale-photo databases) to unlock `sourceType:'measured'`.
