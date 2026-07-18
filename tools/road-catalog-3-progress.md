# Road catalog wave 3 — progress log (branch catalog/road-3, seat 12)

Status: **VERIFICATION-ONLY WAVE.** Picked up an already-worktree-resident, uncommitted
diff from a prior session (Zipp 404 + SRAM RED promotions, gates-clean but never committed
— the branch's git history stopped at `b2e3b05`, same tip as `origin/main`), landed it,
then pushed the SRAM Force AXS tier the same way. No new rows added this pass (see Rows
below). Row count unchanged at 143; verified count 9 → 17.

## Promotions landed (4 commits, this branch)

1. **Zipp 404 Firecrest wheelset** (fw/rw) — fetched
   `sram.com/en/zipp/models/wh-404-ftld-b1`. Corrected model naming (WH-404-FTLD-B1), tire
   clearance (35mm not the prior sample's 50mm), and weight (front/rear split estimated
   off the verified 303 Firecrest's measured front/rear bias, disclosed in the note — no
   split is published on the fetched page).
2. **SRAM RED AXS cassette/chain/crankset** — fetched `sram.com/en/sram/models/
   {cs-xg-1290-e1,cn-red-e1,fc-red-e1}`. Cassette 180g, Flattop chain 249g (114-link
   12-speed config), crankset 545g (172.5mm/48-35T/DUB) — each note names the exact config
   the maker's number applies to.
3. **SRAM Force AXS rear derailleur/chain/brake** — `sram.com/en/sram/models/rd-frc-e-d2`
   confirmed the RD's 36T max-cog / 2x interface (no weight on the page — SRAM's road
   model pages don't publish component weights, same wall as RED/Force noted earlier in
   `data/road.js`). Weight for RD/chain/brake sourced from BikeRadar's independently-weighed
   teardown (`sourceType:'measured'`, per the catalog's third-party-measured policy): RD
   328g (incl. AXS battery), Force Flattop chain 242g, HRD caliper pair 286g.
   **Force cassette and crankset were NOT promoted** — BikeRadar weighed the 10-33T
   cassette (catalog row is 10-30T) and the power-meter crankset (catalog row is the
   non-PM crankset); neither matches the exact SKU in `data/road.js`. Blank beats invented.

## Campagnolo retry (per brief, 2-3 probes max)

One Exa search probe on `campagnolo.com` for the Super Record Wireless cassette: the site
**does fetch cleanly via Exa** (unlike a raw WebFetch, consistent with the SRAM/Shimano
wall pattern already documented in `ROAD-MODEL.md` §5). Confirmed interface facts (N3W
freehub, 12-speed) but the only published weight (210g) is for the 10-25T variant; the
catalog's `cs-campagnolo-superrecord-1029` row is 10-29T. Same mismatch pattern as the
Force cassette above — **no promotion**, logged as a real unblock (campagnolo.com is
fetchable) for a future wave that pulls the matching-cog-range weight or re-SKUs the row
to 10-25T if that's the more common build.

## Rows (frames/wheels/entry-tier/saddle-post depth)

**Not attempted this pass** — the wave budget went to landing + extending the
already-in-flight verification work above, which was gates-clean and otherwise would have
sat uncommitted. Deferred to the next rows-focused wave: Cervelo/Factor frame probe,
DT Swiss ARC/ERC wheels, entry-tier scope check against `ROAD-MODEL.md`, saddle/post depth.

## Gates run this pass

`node validate.js` → `ROAD OK - 143 parts, 0 problems (17 verified, 126 unverified)`.
`npm test` → 735/735 passed (one pre-existing failure fixed: `test/test-schema-road.js`'s
pinned `TODAY` was `2026-07-17`, which made the new `2026-07-18` `lastChecked` dates read
as future — bumped to `2026-07-18`, today's actual date). `npx tsc --noEmit` → clean, exit 0.
All three re-run clean after every commit in this wave.

Branch: `catalog/road-3`, off `origin/main` (worktree `agent-aed39d1a396883e3a`). Never
pushed; 4 commits, no squashing (see `git log catalog/road-3`).
