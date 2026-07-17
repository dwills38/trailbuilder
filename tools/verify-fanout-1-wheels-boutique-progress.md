# verify/fanout-1-wheels-boutique — progress log

Scope: unverified `frontwheel`/`rearwheel`/`fronthub`/`rearhub`/`rim` rows for
We Are One, Industry Nine, Newmen, Spank, e*thirteen (128 rows found at
session start via a PARTS scan). Branch: `verify/fanout-1-wheels-boutique`,
based on origin/main @ a0a4c99 (+ docs 4dde20b/81f2db7).

**Session status: WORKLIST NOT EXHAUSTED.** This brand cluster turned out far
harder than a typical wheel wave — see "Why this cluster is slow" below. One
gated, committed batch landed (commit `bd19f12`); the rest of the 128-row
worklist remains for a follow-up session. Reporting honestly per THE BAR
rather than rushing shallow verifications on the remainder.

## Key structural finding (read this before continuing the grind)

**Industry Nine and We Are One merged operations** (We Are One's carbon rim
tech + Industry Nine's hubs are now sold as one lineup through
industrynine.com; weareonecomposites.com states outright: "ordering has been
streamlined through Industry Nine's website"). Consequences for this catalog:

- We Are One's OLD standalone model names in this catalog — **Union, Faction,
  Strife, Deal (old gen), Sector (old gen), Triad (old gen)** — are mostly
  **discontinued/renamed**. The CURRENT We Are One lineup (per
  weareonecomposites.com) is just: Whisp (XC), Sector, Triad, Deal (DH), Fuse
  (e-MTB, out of scope), Revive 2.0 (gravel), Wanderer (bikepacking), Coup
  (DJ rim). Triad/Sector/Deal carry the OLD names forward but are sold
  through industrynine.com's configurator now, not a standalone product page.
- Industry Nine's own current MTB wheel lineup uses **configurator pages**
  (`industrynine.com/products/<name>-cr` for carbon Triad/Deal) that only
  expose a limited option matrix (front axle options / rear axle / freehub /
  disc mount) with NO per-config weight table on that domain. The
  **per-config spec+weight tables live at `ap.industrynine.com`** (the
  "Design My Wheels" configurator subdomain, e.g.
  `ap.industrynine.com/wheels/mountain/hydra2-enduro-s/`) — static-scrapable
  via `bdata scrape`, and this IS the real spec table (Size/Set Weight/Front
  Weight/Rear Weight/Rim Weight rows, confirmed working this session).
- **Industry Nine sells BOTH 6-Bolt and Center-Lock as customer-selectable
  options** on the same hub model (`ap.industrynine.com/hubs/mountain` lists
  both `Hydra Classic Boost 6B` and `Hydra Classic Boost CL` variants side by
  side). Rotor mount is therefore an OEM-spec CHOICE, not a fixed I9 fact —
  confirming it for a specific catalog row means confirming what the
  specific complete-bike's build sheet states, not just "does I9 offer
  6-bolt" (they always do, for both mount types). This is the main reason
  the Industry Nine batch wasn't finished this session: it needs bike-by-bike
  build-sheet re-checks, not one wheel-family fetch.
- Several e*thirteen wheel families in this catalog (**LG1 Plus Enduro**) are
  discontinued on ethirteen.com — the product URL now redirects to the
  general wheel collection. The CURRENT e*thirteen lineup is the **Grappler**
  family (Grappler Race Alloy, Grappler Sidekick Flux Alloy/Carbon,
  Grappler Sidekick Pro Flux Carbon). LG1 Plus Enduro's interfaces can still
  be checked via a `web.archive.org` snapshot (2021-08 snapshot fetched
  cleanly this session, confirms axle/freehub/weight-set data), but that
  archived page does NOT itemize rotor mount at all — so even with an
  archived maker page, `verified:true` is blocked on that one field. Fixing
  this needs a different source (e13 spec PDF, or the current Grappler specs
  if LG1 Plus was a rebrand of an identical rim/hub chassis — unconfirmed).

## Verified this session (11 rows, all with maker page fetches)

All via `newmen-components.de` configurator pages (bdata scrape — JS-rendered,
WebFetch alone returns marketing copy only) and `ethirteen.com` product pages
(WebFetch fetched cleanly).

| id | what changed | source |
|---|---|---|
| `fw-newmen-beskar30-29` | interfaces confirmed; weight 820->890g (nominal, set-derived) | Newmen Beskar 30 Enduro configurator |
| `rw-newmen-beskar30-29-xd` | interfaces confirmed; weight 960->1050g (nominal, set-derived) | same |
| `fw-newmen-beskar30-light-29` | interfaces confirmed (front weight stays 760g nominal — maker page didn't render a front-specific figure this session) | Newmen Beskar 30 XC configurator |
| `rw-newmen-beskar30-light-29-xd` | interfaces confirmed; weight 900->930g (real maker per-wheel figure, "Gewicht netto: 0.93 kg") | same |
| `fw-newmen-performance30-29` | **CORRECTED** rotorMount CL->sixbolt (Performance 30 is 6-bolt only, no CL SKU exists — the old CL value was a copy-paste from the unrelated Advanced SL sibling); weight 900->925g real maker figure | Newmen Performance 30 Enduro configurator |
| `rw-newmen-performance30-29-hg` | same rotorMount correction; weight 1050->1165g real maker figure | same |
| `rw-newmen-performance30-29-ms` | same rotorMount correction; weight 1050->1165g real maker figure | same |
| `rw-newmen-performance30-29-xd` | same rotorMount correction; weight 1050->1165g real maker figure | same |
| `fw-newmen-forge30-dh-29` | interfaces confirmed; price 275->235 (UVP), weight 1050->1015g real maker figures | Newmen Forge 30 DH configurator |
| `rw-newmen-forge30-dh-275-hg` | interfaces confirmed; price 275->325 (UVP), weight 1330->1115g real maker figures | same |
| `fw-ethirteen-grapplersidekick-flux-dh-alloy-29-20x110` | interfaces confirmed (20x110/6-bolt/30mm); weight 1009g confirmed exact match | ethirteen.com Grappler Sidekick Flux Alloy DH Wheels |
| `rw-ethirteen-grapplersidekick-flux-dh-alloy-275-boost148-hg` | interfaces confirmed; **weight CORRECTED 1177->1167g** (maker's own table assigns 1177g to the 157mm/SuperBoost variant, not the 148mm/Boost one this row represents — the prior vitalmtb-derived figure had conflated the two axle widths) | same |

## Cascading fix (not part of the wheel scope, but required by it)

Correcting Performance 30's rotorMount (CL->sixbolt) broke two **already-verified**
completebikes that had paired Center-Lock rotors with this wheel:
- `cb-cube-reaction-tm-pro` — rotors swapped `ro-shimano-smrt64-203-cl`/`180-cl`
  -> `ro-shimano-smrt66-203-6b`/`180-6b` (same 203/180 sizing cube.eu's own
  build sheet states for the BR-MT520 brakes; the page never itemized rotor
  mount or model, so this was a data-entry inference to begin with).
- `cb-cube-reaction-c62-pro` — rotors swapped `ro-shimano-smrt64-180-cl`/`160-cl`
  -> `ro-shimano-smrt86-180-6b`/`160-6b` (same 180/160 sizing cube.eu states
  for the BR-M8100 XT brakes; SM-RT86 picked as the XT-tier-appropriate
  6-bolt sibling rather than the base SM-RT66 used on the alloy TM sibling).

Both re-verified clean against `node validate.js` + `npx vitest run` (688/688)
+ `npx tsc --noEmit` + `node tools/verdict-audit-harness.js` (0 flags, 329
clean, 15/15+2/2 adversarial) after the fix.

## Corrections without verification (documented but not promoted)

None yet finalized this session beyond the above (which all did earn
`verified:true`). The LG1 Plus Enduro family (4 rows) has an improved weight
source available (archived ethirteen.com page: 27.5" set 1850g, 29" set
1910g) but rotor mount is still unconfirmed by any maker page — left
unchanged rather than churn the weight field without closing the bar. Flag
for whoever picks this up next: apply the wheel nominal-weight exception once
rotor mount is resolved (or accept it will simply stay unverified — the
family may be permanently unconfirmable on rotor mount if e*thirteen never
published it even when the product was current).

## Not yet worked (117 rows remaining of the original 128)

- **Industry Nine** (36 rows total; `fw/rw-industrynine-enduro-s-*`,
  `fw/rw-industrynine-11-enduro-*`, `fw/rw-industrynine-whisp-*`,
  `fw/rw-industrynine-hydra2-dh-*`, `fh/rh-industrynine-*` hub rows,
  `rm-industrynine-endurosv2-*` rims, `fw/rw-industrynine-hydra-reynoldsbl-*`)
  — blocked on the 6-bolt-vs-CL OEM-choice ambiguity described above; each
  row needs its host complete-bike's build sheet re-checked (not just the I9
  wheel family page) to pin the actual shipped rotor mount. `ap.industrynine.com`
  fetches cleanly via bdata and has real per-config weight tables once the
  right SKU page is found — the mechanism works, it's just row-by-row slow.
- **We Are One** (42 rows: Union/Faction/Strife legacy names + current
  Triad/Sector/Deal) — legacy names are very likely discontinued
  (weareonecomposites.com's current site doesn't list them); needs an
  archive.org pass per family before any of these can move, same pattern as
  LG1 Plus Enduro.
- **Spank** (13 rows: SPIKE 369, 359, Spike Race 33/Formula) — not started
  this session; spank-ind.com not yet fetched.
- **e*thirteen** remainder (LG1r DH x8 rows already carry some provenance —
  not re-checked this session; Grappler Core Formula x2 OEM-hub rows
  (Commencal-specific Formula DC-711/MSL-148A hubs — likely unverifiable via
  e13's own site since e13 doesn't sell "Grappler Core" as a complete SKU
  with 3rd-party Formula hubs, would need Commencal's page which doesn't meet
  the wheel-maker-page bar); LG1 Plus Enduro x4 (see above); Grappler Race
  Alloy Enduro/DH families not yet cross-checked against catalog ids.

## Gates (after the one committed batch)

```
node validate.js                    -> DATA OK - 5025 parts, 0 problems (2687 verified, 2338 unverified)
npx vitest run                      -> 24 files, 688/688 passed
npx tsc --noEmit                    -> clean, no output
node tools/verdict-audit-harness.js -> 0 name/field flags, 0 preset conflicts,
                                        329 clean assembles / 0 errors,
                                        5/5 wheel hub+rim substitutions clean,
                                        15/15 adversarial clashes caught,
                                        2/2 compatible partials stayed clean
                                        (section E fork-rotor findings are
                                        pre-existing, unrelated to this batch)
```

No new vocab needed. No `tools/verification-job.json` touched. No excluded
rows (cb-santacruz-highball-r, the Aeffect R stem pair, cb-yeti-sb135-t2/t3)
touched.
