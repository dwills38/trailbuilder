# verify/cb-sheets-2 — build-sheet re-screen (2026-07-17)

Branch off origin/main (5881c13), fresh worktree. Continuation of `verify/cb-sheets-1`'s
round-1 findings (PROJECT-LOG 2026-07-17 "cb-sheets batch 1 merged"). Scope: raise
completebike build-sheet verification (140/436 at session start); NO e-bikes touched.

## Result: sheet-verified 140 → 141

- **cb-giant-reign-advanced-2 promoted to `verified:true`.** Fresh WebFetch of
  giant-bicycles.com/us/reign-advanced-2-2025 re-confirmed the $4,500 MSRP and every
  stated spec verbatim (Fox 38 Rhythm 170mm fork, Fox Float Performance 205/62.5 shock,
  Shimano SLX drivetrain, Shimano MT520 brakes w/ RT-66 200mm-page/203mm-real-SKU rear
  rotor, Giant TRA 27.5/29 wheels, Maxxis Assegai/Minion DHR II tires) — the row had a
  complete, exact-match build sheet from an earlier grind but was never promoted. This is
  a genuine gap-fill, not new data entry.

## Re-screen of the round-1 "94 correctly unverified" claim: HOLDS

Built a filter over all 296 unverified completebike rows carrying a fetched write-up,
first for price-bar language (~200 hits, too broad), then narrowed to rows with **zero**
soft-inference language ("stand-in", "reused from sibling", "not independently confirmed",
"representative", etc.) — 27 rows. Individually inspected ~15 of those 27 plus several
Santa Cruz rows outside the list. Findings:

- **Confirmed correctly-blocked (re-fetched, still blocked), no action taken:**
  - `cb-canyon-spectral-cf-7` — canyon.com CF 7 still shows "Sold out"/"Unavailable" on a
    fresh fetch, page renders no live price for this specific trim (only a "from $5,099"
    banner for the current lineup). Leave unverified.
  - `cb-gt-zaskar-lt-expert` — gtbicycles.com renders no price field on fresh WebFetch.
    Exa search surfaced retailer listings from $1,800–$2,864 (wildly inconsistent,
    confirms retailer sourcing is unsafe here per policy). Leave unverified.
  - `cb-yt-jeffsy-core3-cf` — yt-industries.com price widget still doesn't render to
    either WebFetch or Exa fetch. **New finding, flagged for a future chip, NOT acted
    on:** the Exa-fetched page also shows brakes as "HAYES DOMINION A4" and a 15.80kg
    weight, which doesn't obviously match the cataloged fill set (sourced from a 2024
    edition) — possible model-year spec drift on the live page vs. what's cataloged.
    Didn't touch fills; a real re-verification would need to re-derive the whole build,
    which is data-entry scope, not this session's re-screen.
  - `cb-orbea-occam-lt-m10` / `cb-orbea-rallon-mteam` / `cb-orbea-oiz-m10` — orbea.com
    confirmed still 403-walled via both WebFetch (documented) and a fresh Exa fetch
    attempt (`CRAWL_HTTP_403`). Didn't spend bdata budget here (see budget note below) —
    the existing vitalmtb.com third-party sourcing is the honest ceiling for now.
  - `cb-evil-following-ls-x0-transmission` (and presumably its Insurgent/Wreckoning/
    Offering siblings) — evil-bikes.com's JS-rendered build page still blocks WebFetch,
    but an Exa **search** (not fetch) surfaced a real evil-bikes.com "Loopholes" spec-sheet
    page for the SRAM X0 Eagle Transmission trim with a DIFFERENT wheel spec (Evil
    Loophole Rim / Industry Nine Hydra hub) and different current pricing ($6,199–$9,749
    across configs) than the cataloged vitalmtb-sourced $8,599 Industry Nine Enduro S
    build. This reads as a current-lineup refresh, not a same-bike price confirmation —
    re-verifying properly would mean re-deriving the whole build against the new page,
    which is out of this session's re-screen scope. Flagged, not touched.

- **Santa Cruz (20 unverified rows, no `source` field on 19 of them):** inspected
  `cb-santacruz-bronson-70` and `cb-santacruz-hightower-r` closely. Both have fully
  fetched, mostly-exact build sheets but genuinely carry non-exact inferences (Bronson 70:
  Reserve 30|TR AL rims documented as a stand-in via RaceFace AR-30 because no matching
  27.5"-rear Reserve 30|TR AL row exists in-catalog — front-only fix possible via the now
  real `fw-reserve-30tr-al-29` row, but doesn't close verification since the rear still
  has no real-part match, and adding a new rear-wheel row is out of this session's scope
  per the brief; Hightower R: headset "advisory only, not independently confirmed for this
  specific kit" + dropper "representative size" + tire tier "reused from sibling, not
  restated on this page"). **`cb-santacruz-highball-r` is already correctly fixed** (uses
  the real `fw-reserve-30tr-al-29`/`rw-reserve-30tr-al-29-hg` pair per the earlier
  `fix/parked-data-items` merge) — no action needed there.

- **Trek (21 bikes, 0 verified) — attempted once per the brief, still walled on price:**
  Exa `web_fetch_exa` on a Trek Roscoe 8 product URL *does* return full spec-table content
  (no 403), and a `bdata scrape` (Web Unlocker) of the same URL also completed — but
  neither surfaces a price field (JS price widget, same pattern as YT/GT). Also: the
  fetched page's fork spec ("RockShox Judy Silver TK") reads differently from what's
  presumably cataloged for the Gen 3 entry — another potential model-year mismatch, not
  chased further. Per the brief's instruction ("attempt ONCE... else skip all 21 Trek
  bikes and log"), skipping the remaining 20 Trek bikes this session.

- **Hightower MY23 crank discrepancy** (`cb-santacruz-hightower-r/-s/-gx-axs-rsv`):
  left untouched per the brief's parked caution — did not fetch the MY23 page this
  session, no changes made to those rows.

## bdata budget note

Account balance was **$1.39** at session start (`bdata budget`). Used exactly one
`bdata scrape` call (the Trek attempt, per explicit instruction) and left the rest of the
budget untouched rather than spending it chasing the Orbea/Evil 403 walls, since WebFetch
+ Exa already answered those (still blocked) without cost.

## Gates

- `node validate.js`: `DATA OK - 5026 parts, 0 problems (2926 verified, 2100 unverified)`
- `npm test`: 699/699 passed
- `npm run typecheck`: clean, no output
- `tools/verdict-audit-harness.js`: unaffected — the only diff is provenance fields
  (`verified`/`lastChecked`/`source`) on one row, which never feed `checkBuild`; probes
  A–E unchanged from a stock run (329 clean / 0 errors on C1, 15/15 on D, etc.)

## Net diff

1 field-promotion (`cb-giant-reign-advanced-2` → `verified:true` + provenance + desc
note). No fills changed, no new part rows, no id changes. 5,026 parts unchanged.
Sheet-verified count: 140 → 141.
