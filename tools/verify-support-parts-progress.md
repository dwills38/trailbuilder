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

## Batch 2 — DONE (7 rows), committed

Worktree was reset onto `origin/main` @ `c9f9970` first (batch 1 had landed there —
"reset" not "re-apply", per the coordinator's instruction; no local changes lost).

**RockShox shocks (6 rows), promoted via the sram.com/en/service/models/<mfgPn-slug>
pattern (full eye×stroke size matrix per SKU) — all under the shocks
interface-verification exception (nominal, not per-size, weight):**
- `sh-rockshox-super-deluxe-base-205x65-trun` — verified (RS-SDLX-BSE-C2, interface
  re-confirmed, weight/price stay nominal). A prior session had already fetched this
  exact page and left it "sourced-but-not-verified"; promoted this session because
  the policy the prior session cited (VERIFY-PROTOCOL's shocks exception) already
  covers this case — no new data needed, just applying the documented policy.
- `sh-rockshox-super-deluxe-base-210x55` — verified, same basis/page.
- `sh-rockshox-deluxe-select-185x55-trun` — verified (RS-DLX-SEL-C1, newly fetched
  this session; row previously had no weight field at all — added weight:300 as the
  maker's nominal reference figure).
- `sh-rockshox-vivid-select-205x60-trun` — verified (RS-VIVD-SEL-C1), same pattern.
- `sh-rockshox-vivid-ultimate-250x72p5` — verified (RS-VIVD-ULT-C1); weight
  **corrected 750g → 670g** (prior session mirrored a sibling's sample weight
  instead of the maker's own reference figure — this session fetched the page
  directly and used the real number).
- `sh-rockshox-superdeluxe-selectplus-250x70-std` — verified (RS-SDLX-SELP-C1);
  weight **corrected 600g → 450g**. NOTE: the newer C2-gen Super Deluxe Select+
  page tops out at 230mm eyes and does NOT offer 250mm — only the C1 gen does.
  Flag for the coordinator: any OTHER 250mm-eye Super Deluxe Select+ row in the
  catalog that's tagged gen:'C2' (if one exists) would be a genuine spec
  contradiction worth checking; this batch didn't find one but didn't exhaustively
  search for it either.

**RockShox fork (1 row):**
- `fk-rockshox-lyrik-selectplus-29-160` — verified (FS-LYRK-SELP-D2). The SKU-specific
  sram.com SERVICE page (not the generic product page a prior session used) states
  the weight (1968g) directly for the 29in/160mm/Select+ configuration — an EXACT
  match, not the nominal-reference-figure situation shocks/wheels get, so this one
  is a full, unqualified verification (interface AND weight both maker-confirmed
  for this precise SKU). Its 140mm/150mm siblings remain unverified — RockShox's
  page states weight only for the 160mm point, and forks are NOT in CLAUDE.md's
  named interface-verification-exception list (only shocks and wheels are), so the
  strict weight bar applies and blocks those siblings.

Gates after batch 2: `node validate.js` → 2596 verified / 4521 parts, 0 problems.
`npm test` → 616/616. `npm run typecheck` → clean.

## Contradiction list (for the coordinator)

None found. All corrections above (batch 1 + batch 2) were on rows this session
itself verified for the first time (weight tightened from sample/interpolated/
mismatched-reference to the maker's exact figure for the SKU) — no interface field
(mount/freehub/width/travel) changed, and no row previously verified:true by
another session was touched. One thing worth a coordinator glance: the C1-vs-C2
Super Deluxe Select+ gen/size-range split noted above under batch 2.

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

## Batch group 3 — DONE (4 net changes: 1 verified, 3 corrected-but-unverified), committed

Worktree reset onto `origin/main` @ `f2880a0` first (batch 2 had landed; also picked up
`src/tire-classes.js` + its tests from an unrelated concurrent commit — 632 tests now).

**RockShox forks (~15 pages fetched, 0 new verifications):** systematically fetched
every unique mfgPn's `sram.com/en/service/models/<slug>` page for the remaining
referenced-unverified fork rows (Lyrik Base, Pike Select+/Base/Select, ZEB R, SID SL
Select, BoXXer Select, Recon Gold/RL, Recon Silver, Domain, Judy Gold, 35 Gold).
**Finding: RockShox's mid/budget-tier fork pages either publish NO weight at all, or
publish exactly one reference weight tied to a travel/wheel-size point that essentially
never matches this catalog's actual (different-travel) rows.** This matches CLAUDE.md's
existing "Forks are deliberately still flagged" note — confirms it's not a fetchability
gap, it's a real data-availability wall. Forks are NOT in the interface-verification
exception list (only shocks + wheels are, per CLAUDE.md) so the strict weight bar
applies and blocks nearly all of them. **Recommendation: do not keep re-attempting
individual fork rows this way — the hit rate is near zero.** A future push here would
need either (a) a policy decision to extend the interface-verification exception to
forks (a call for Douglas/the coordinator, not this session), or (b) third-party
MEASURED weights per row.

**Shimano BB/crankset (2 PDF editions fetched, 0 verifications):** tried both the
2021-2022 AND 2023-2024 productinfo.shimano.com archive handbooks via the poppler
`pdftotext` route. Found what look like BB-MT501/BB-MT800 weight figures (71g/73g/84g
range) in the 2023-2024 edition, but the PDF's table layout is column-mangled badly
enough by `pdftotext` (multi-column merge, no reliable row/column alignment) that I
could not confidently map a specific weight to a specific shell-width variant (73mm
BSA vs whatever the "84" row is). **Did not force a guess.** Flag for next session:
try `pdftoppm` to rasterize the specific page + visually inspect, or try `-layout`
with a narrower `-x/-y/-W/-H` crop box around just the BB table.

**WTB tires (2 rows, real corrections, but NOT verified — caught by a test gate):**
- `ti-wtb-breakout-comp-29-23`: weight 820g→**1064g**, price $32→**$67.95** (FETCHED
  wtb.com/products/breakout SKU table, exact match).
- `ti-wtb-trailboss-29-225-comp`: weight 800g→**914g**, price $35→**$32.95**, model
  name corrected "TCS Comp"→"Comp" (the Comp tier is wire-bead, not TCS/tubeless —
  the old name conflated WTB's two casing families). FETCHED wtb.com/products/trailboss.
  - **Both initially marked `verified:true`, which broke `test-data.js`'s
    "every VERIFIED tire is pinned to a casing + compound" gate** (WTB's "Comp"
    tier casing/compound aren't cataloged vocab values, so I'd deliberately left
    them unset — same as the established convention on sibling WTB rows — but
    then wrongly marked the row verified anyway). **Caught by running the full
    `npm test` gate before committing, reverted `verified:true` on both, kept the
    corrected weight/price data.** Lesson for future batches: the tire-batch gate
    means WTB's DNA-compound "Comp"-tier tires structurally CANNOT reach
    verified:true under the current vocab, no matter how good the source — don't
    keep attempting them without first widening `casing`/`compound` vocab (a
    schema-level decision, out of scope for a data-only verify session).

**WTB saddle (1 row, verified):**
- `sa-wtb-rocket-cromoly` — verified. Re-fetched wtb.com/products/rocket-1, exact
  match to the figure a sibling row had already cited (331g/$95.95).

**Race Face stem (0 rows, no edit made):** fetched raceface.com/products/aeffect-r-stem
— confirms 35mm clamp, 40mm as a real length option, but the page publishes only ONE
weight (161g) tied to the 50mm length, not the 40mm the catalog rows need. Also
surfaced a **likely duplicate**: `st-raceface-aeffect-r-35-40` and
`st-raceface-aeffectr-35-40` are the same physical product (35mm clamp, 40mm length,
different families `raceface-aeffect-r` vs `raceface-aeffect-r-stem`) with different
sample weights (149g vs 170g) and the same sample price ($45 both). Not fixed this
session (dedup is a data-model call, not a verify-session call) — **flagged for the
coordinator**.

Gates after batch group 3: `node validate.js` → 2597 verified / 4521 parts, 0 problems.
`npm test` → 632/632 (after the tire-gate fix above). `npm run typecheck` → clean.

## Contradiction list (cumulative)

None found across all three sessions. No row previously verified:true by another
session was touched or contradicted. Two things flagged for the coordinator, not
fixed by this session: the Race Face Aeffect R stem likely-duplicate rows (above),
and the C1-vs-C2 Super Deluxe Select+ gen split (batch 2, already checked clean).

## Realistic pace note for the coordinator

Batch groups 1-2 (17 rows) hit a run of clean, high-confidence categories (DT Swiss
E1900 wheels, Maxxis tires, RockShox shocks) where one page fetch reliably produces
one full verification. Batch group 3 shows the OTHER shape of this queue: RockShox
forks and Shimano BBs are genuine, documented data-availability walls (not
fetchability gaps — the pages exist and load fine, they just don't publish the
number needed), and even successful WTB fetches got blocked by the tire vocab gate.
At this per-row research depth (multiple fetches + cross-checks per row to stay
inside THE BAR), reaching deep into the ~980-row remaining queue will keep alternating
between quick wins and hard walls — it will NOT be a steady ~30-rows-per-focused-hour
pace once the easy DT-Swiss/Maxxis/shock-pattern categories are exhausted. Worth
considering whether to keep pushing serially in one session vs. fanning this out to
parallel catalog-worker chips per brand cluster (the project's established pattern
for exactly this kind of large, independent, per-brand grind).

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
