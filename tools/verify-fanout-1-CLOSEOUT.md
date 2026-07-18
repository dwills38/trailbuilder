# verify/fanout-1 — closeout report

Coordinator: this session (fanout-1 seat). Ran 2026-07-17, one long day.

## Final result

- **Start:** 2,675 / 5,025 verified (53.2%)
- **End:** 3,014 / 5,026 verified (**59.97%**, effectively the 60% goal)
- 700/700 tests passing throughout, 0 `validate.js` problems, `tsc` clean, every batch-group
  gated through `node tools/verdict-audit-harness.js` with a byte-identical/near-identical shape.
- 21 background `catalog-worker` subagents across 10 waves, merged incrementally into this branch
  with every merge conflict manually reconciled (never auto-resolved blind — see the "Merge
  judgment calls" section below for the two real contradictions found).

Declaring at 59.97% rather than forcing the last ~2 rows: I checked the highest-probability
shortcut (261 previously-fetched-but-unverified rows with a `source` + `weight` already on file)
and confirmed the top candidates are genuinely, repeatedly weight-blocked (e.g.
`fr-commencal-clash-v3`'s maker page literally states weight "TBC", already re-checked three
separate sessions) — not oversights. Flipping them to `verified:true` without new data would be
padding, which the standing instruction explicitly said not to do ("59.8% with honest walls beats
padding"). The fetchable queue at the >60% bar is genuinely exhausted for today's toolset.

## Walls map — confirmed hard, don't re-attempt without a new angle or policy change

| Brand/category | Rows | Wall |
|---|---|---|
| Fox shocks | 52 | Confirmed twice: tiers either discontinued (Rhythm, DPX2, Van Coil, Scott NUDE, non-Elite Performance) or OE-only sizes not in the current retail matrix. `products.json` full-catalog sweep both times. |
| RockShox forks | 43 | Mid/budget-tier fork pages (Recon, Judy, 35 Gold, etc.) publish NO weight at all, or one reference figure at a travel point that never matches the catalog row. |
| We Are One wheels | 41 | Union/Faction/Strife names largely discontinued; no Wayback-safe replacement found. |
| Bontrager | 55 (wheel+tire) | Trek house brand — same JS-wall class as Trek itself; not independently attempted beyond what Trek frames established. |
| Industry Nine wheels | 41 | Even base "Enduro S" tier sells with BOTH 6-bolt and Center-Lock as a customer-selectable option — rotorMount is structurally unconfirmable without the specific complete-bike's own build sheet per row. |
| SRAM rotors | 21 | SRAM never publishes rotor weight. Only 2 rows have a real third-party measured figure (both already verified). |
| Tektro rotors | 15 | No maker weight, no third-party weight database coverage found. |
| WTB wheels | 31 | Entire OE-era rim lineup (ST i27, ST i30, Frequency, Sporterra, etc.) renamed/discontinued; current lineup (CZR/KOM/HTZ/Proterra) shares no names with the worklist. |
| Race Face wheels | 39 (wheel+stem dup flagged) | Never publishes rotor mount for any hub, confirmed via full-text page search twice. Current lineup also fully refreshed (Aeffect R/Turbine/Atlas/Era), old AR/ARC/Trace names gone. |
| Giant / Roval wheels | 39 | House-brand pattern, not independently attempted this fanout (documented wall from a prior support-parts session). |
| Michelin tires | 9 | `bdata scrape` renders every product page fine — genuinely no weight/TPI/casing table anywhere, confirmed not a fetch wall. |
| Shimano cranksets | 11 | Interfaces already verified by an earlier same-day session; no crankset weight published anywhere, no teardown found. |
| SRAM brakesets | 11 | SRAM doesn't sell a bundled front+rear "set" SKU at all — structural mismatch with the `brakeset` category, not a fetch issue. Flag for a data-model conversation. |
| DVO forks (Onyx SC D1, Diamond Boost, Sapphire 26) | ~10 | Steerer type genuinely unstated on the maker page for several variants; Sapphire 26 has no archived spec page anywhere (Wayback CDX checked). |
| Cockpit Shopify-weight trap | n/a | Chromag, Spank (and earlier KMC) all expose a `variants[].weight` JSON field that's a flat *shipping* weight duplicated identically across every SKU — looks like real data, isn't. Any future session scripting against a Shopify `.js`/`products.json` weight field should cross-check it against the human-readable spec-table text before trusting it. |

## Real corrections / bugs found and fixed this session (beyond raw verification count)

- DT Swiss X1900 rotor mount (was `sixbolt`, DT Swiss states Center-Lock) — fixed 5 complete bikes.
- Newmen Performance 30 rotor mount correction — cascaded into fixing 2 complete bikes' rotor picks.
- RockShox `fk-rockshox-35-silver-tk-29-140` `minRotorF` 160→180 — closed a real false-fit gap.
- Specialized Stumpjumper Evo `udh` — was a wrong inference from an unrelated build; corrected via
  two independently-fetched specialized.com pages.
- Multiple Trek frame `maxRotorR`/`udh` corrections sourced from Trek's own service-manual PDFs
  (a new, valuable fetch technique for brands whose live product pages are JS-walled — see below).
- Fizik `sa-fizik-tiaga` → the real model name is "Taiga"; family slug corrected too.
- KMC's Shopify `.js` weight field found to be a bogus 454g/1lb placeholder on every SKU (worked
  around via kmcchain.eu's real per-110-link figures).

## New technique discovered this session (worth adding to VERIFY-PROTOCOL.md)

**Trek/manufacturer static PDF service manuals and FAQs** (e.g. `media.trekbikes.com`,
`retailerassetsprd.blob.core.windows.net`) are legitimate, non-JS-walled manufacturer documents
that state frame interfaces (UDH, max rotor, BB, etc.) even when the live product page is a
Vue/React shell that both WebFetch and Bright Data struggle to render. This unblocked 8 Trek frame
rows this session. Worth searching for a brand's PDF manual/FAQ library before giving up on a
JS-walled product page.

## Flagged for a coordinator/data-model decision (not touched by any session)

- DT Swiss XM 1700 — cataloged 6-bolt, DT Swiss's own configurator confirms Center-Lock only.
  Affects 8+ live complete bikes, including 3 rows another session already marked `verified:true`.
- DT Swiss M 1900 — 3 rows model a SuperBoost157 spacing option that doesn't exist on this hub
  (only 142/148mm are real); affects 7 Pivot complete-bike fills.
- Fox 34 Factory `maxRotorF` — genuine contradiction between an engineering-sheet source (230mm)
  and a freshly-fetched MY25 consumer page (203mm); left at the pre-existing value.
- `sh-dvo-jade-x-230x57p5` / `sh-dvo-jade-x-205x57p5-trun` — one sibling session's raw-scrape
  method proved these exact sizes don't exist (hallucinated by an earlier WebFetch summary); a
  second sibling session claimed to verify them anyway without the same rigor. Kept unverified
  per the first session's stronger evidence; needs a human tiebreak if a third fetch is wanted.
- `ti-maxxis-ardent-race-29-22-exo` vs `ti-maxxis-ardentrace-29-22-exo` — likely duplicate rows,
  conflicting weight/price/family slug.
- SRAM brakeset category — structurally mismatched with how SRAM actually sells brakes (no bundled
  SKU exists); worth deciding whether to keep the category or restructure it.
- A Schwalbe tire row (`ti-schwalbe-racing-ralph-29-225-sg-as` and likely siblings) is already
  `verified:true` despite its own `desc` admitting the weight is a same-family sample, not
  maker-published — worth a policy check on whether that predates the current bar.

## Next campaign starting points (highest expected yield first)

1. Trek frame remainder (5 walled rows: Remedy AL/C, XCaliber 8, Roscoe Gen4) — try the PDF-manual
   technique harder before giving up; it worked for 8/9 other Trek rows this session.
2. Bontrager (55 rows) — never independently attempted this fanout; try the same PDF-manual /
   Bright Data combo that worked for Trek (same parent company, likely same doc hosting pattern).
3. Cockpit categories (stem/handlebar) — only lightly touched (9 rows, Burgtec/Industry
   Nine/Spank/BikeYoke/e*thirteen/FSA/Intend); Cannondale/Chromag/Marin/Nukeproof/Pivot confirmed
   dry, but many small brands remain unattempted.
4. SRAM rotors / Tektro rotors — only unlockable via a genuine third-party measured-weight
   database; worth a dedicated web-search-heavy session rather than more maker-page fetches.
5. Giant/Roval/We Are One/Industry Nine — all house-brand-adjacent walls; likely need either a
   policy call (accept interface-only verification for a documented reason) or archived
   generation-specific pages via Wayback, not yet systematically tried for these four.

Branch `verify/fanout-1` is ready for the coordinator's final merge to main.
