# verify-notes-tail14 — mtb-tail-14 worker session (2026-07-21)

Scope: unverified MTB rows in `src/compat.js`, categories handlebar/stem/grips/dropper/
seatpost/saddle ONLY. Branch `verify/mtb-tail-14`, worktree
`.claude/worktrees/mtb-tail-14-6042`. Excludes complete-bike rows, wheels, tires.

Two work fronts assigned: (a) Syncros (25-row never-assigned cluster), (b) the
READY-TO-APPLY punch list in `tools/verify-notes-tail13.md`.

## (a) Syncros (25 rows in scope) — partially worked this session

**Key finding confirming tail-13's suspicion: Syncros has renamed/retired several
generation lines.** Current syncros.com lineup (US site, fetched this session) is
Creston (road/gravel), Fraser (MTB bars), Duncan (droppers + rigid posts, "Duncan SL"
and "Duncan 2.0"/"Duncan Dropper 1.5/2.0"), Belcarra V/R 1.0/2.0 (saddles), Tofino V/R
2.0 (saddles), Celista V1.0 (saddle), AM 2.0 / XR 2.0 (stems). There is **no current
"Hixon 2.0"** (only Hixon 1.0/1.5/SL exist per direct search), **no "Kaslo"** saddle,
and **no rigid "Duncan 1.5"** post (only Duncan Dropper 1.5 in various travels, and the
Duncan SL/Duncan 2.0 rigid lines) — these catalog rows are retirement candidates, not
promotable; not touched (no forced/fabricated match, per THE BAR).

Promoted to verified:true (direct syncros.com fetch, USD price + maker weight):
- `sa-syncros-belcarrav2-cutout`: $80→$79.99, 210g→230g (exact name match, "Belcarra
  V2.0 Cut Out", 7x7mm Hollow CrMo rails, 245x140mm)
- `st-syncros-am20-318`: $35→$69.99, 170g→175g (exact name match, "AM 2.0" stem,
  31.8mm clamp, 40/50/60mm lengths at 0°; the stock-bike listing this row originated
  from cited "4° rise" not itemized on the standalone product page — clamp/length,
  the verdict-driving fields, match exactly; angle isn't a stored field here)
- `sp-syncros-duncan20-316-rigid`: $60→$54.99, 230g→283g (exact name match, "Duncan
  2.0" rigid seatpost, two-bolt clamp, offered 27.2mm/31.6mm — this row is the 31.6mm
  variant, confirmed against the catalog diameter field)

Researched, NOT promoted (real current products found, but the exact SKU match to this
catalog's specific row is uncertain — left unverified per THE BAR rather than force a
guess):
- `hb-syncros-fraser20-318-740` (catalog: "Fraser **2.0** XC", $55, 225g): syncros.com's
  current standalone product is named **"Fraser 1.0 XC"** (not 2.0) but shares the
  *exact* weight (225g) and clamp/width (31.8mm/740mm) — could be the same SKU under a
  renamed/relabeled generation, or a genuinely different product; the generation-number
  mismatch is the same ambiguity tail-13 flagged on the Contact TR35/SL naming issue.
  Not touched. Worth a follow-up session cross-checking scott-sports.com OE build
  sheets (which is where this row's data originated) against the current syncros.com
  naming to resolve.
- `gr-syncros-prodh` (Pro DH grips, $18, 90g): confirmed a real current product
  (Jenson USA carries "Syncros Pro DH Lock-on Grips", described as a smaller-diameter/
  ergonomic design) but no syncros.com direct product page URL was located this
  session to pull USD price/weight from the manufacturer directly — not promotable.

Not reached this session (in scope, still Pending): `hb-syncros-hixon2-318`,
`st-syncros-xm15-318`, `sp-syncros-dj15-316`, `sa-syncros-dj15`,
`hb-syncros-hixonic-35-780`, `st-syncros-hixonic-35`, `sa-syncros-tofino15-ti`,
`dp-syncros-duncan25-316-150`, `sa-syncros-tofino25`, `hb-syncros-fraser15-318-740`,
`st-syncros-xr15-318`, `sp-syncros-duncan15-316`, `st-syncros-xc20-318`,
`st-syncros-dh15-318-50`, `sp-syncros-dh20-316`, `sa-syncros-kaslo20`,
`hb-syncros-fraserics-318-740`, `st-syncros-fraserics-318`,
`dp-syncros-duncan15xc-316-100`. Several of these (Hixon 2.0, Kaslo 2.0, DH1.5/DH2.0)
are likely retirement candidates per the naming-drift pattern above — a future session
should search each by exact model name before assuming it's a live SKU worth chasing.

## (b) tail-13 punch list — re-fetched, no new promotions this session

Re-fetched all four brands tail-13 flagged as "research gathered, not yet applied"
before touching anything (the kit-12 lesson: notes go stale).

- **ODI** (`gr-odi-rogue-v21`, `gr-odi-ag2`): re-confirmed odigrips.com prices already
  match this catalog exactly ($32.00, $36.25). Manufacturer still does not publish
  weight for either grip; no new measured-weight source found this session (same walls
  tail-13 hit: Pinkbike AG-2 review 403s, BikeRadar Rogue review doesn't state a
  weight). Weight bar remains unmet — correctly left unverified, no change needed.
- **Wolf Tooth** (`gr-wolftooth-echo-lockon`): current catalog price ($31.95) already
  matches a US-site fetch; the "106g" tech-spec figure remains ambiguous (no explicit
  per/pair qualifier, unlike its Karv/Fat Paw siblings) — not promotable without that
  qualifier. No change.
- **Thomson** (`hb-thomson-elite-35`, `st-thomson-elite-x4-35`/`-318`): re-fetched
  bikethomson.com directly. Prices already match exactly ($134.95 bar, $121.95 stem).
  Confirmed (again) that Thomson's own product pages do NOT publish per-length/per-rise
  weights — only bike-components.de (a retailer) has a weight table, which is
  `sourceType:'retailer'`-rejected on verified rows per THE BAR. Interfaces (clamp,
  width) already correct in the catalog. No promotable outcome; correctly left
  unverified.
- **Ergon** (`sa-ergon-sm10-enduro`): existing row's substitution rationale (SM10
  Enduro → SM Enduro Men's current-equivalent page) re-confirmed still accurate this
  session ($79.95/255g match exactly). No change needed — already correctly sourced.

No brands from this punch list yielded a fresh promotion this session; all four were
already at the best achievable state given real, currently-live manufacturer walls
(no weight publication). Documented here so a future session doesn't re-spend time
re-confirming the same walls.

## Gates

`node validate.js`: 0 problems (3300 verified, 1740 unverified — was 3297/1743 at this
branch's base off origin/main). `npm test`: 988 passed. `npx tsc --noEmit`: clean.
One commit this session (3 Syncros promotions), gated.
