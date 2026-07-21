# Striders Verification Wave 1b — verify-notes

Branch: `verify/striders-1b` | Worktree: `.claude/worktrees/st1-7aa0` | Base: fresh `origin/main`
Scope: `data/striders.js` only (36 balance bikes). Ran per `tools/VERIFY-PROTOCOL.md`'s bar
(manufacturer page + trustworthy weight required for `verified:true`; a blank beats a guess on
`seatMin`/`seatMax`), with the fetch-ethics order WebFetch → Exa → browser pane.

## Before / after

| | Before | After |
|---|---|---|
| Verified | 5 / 36 | 28 / 36 |
| Unverified | 31 / 36 | 8 / 36 |
| With a seat-height range | 32 / 36 | 32 / 36 (unchanged — no guessing) |

`node validate.js` → `STRIDER OK - 36 bikes, 0 problems (28 verified, 8 unverified, 32/36 with
seat-height range).` `npm test` → 844/844 passing. Committed per brand (12 commits on this branch).

## Walls hit (raw-text / fetch pattern)

- **striderbikes.com 403s direct `WebFetch`** — as flagged in memory. Exa's `web_search_exa`/
  `web_fetch_exa` reached the same manufacturer URLs successfully (its crawler isn't blocked the
  same way), so all live Strider product pages (12 Sport, 12 Pro, 14x, 20x Sport) were verified
  against the maker's own domain, not a retailer mirror. Treated as a legitimate maker-page fetch
  since the content came from `striderbikes.com` itself, just via a different fetch path.
- **specialized.com 403s direct `WebFetch`**, same Exa workaround, same treatment.
- **Strider 12 Classic is DISCONTINUED** — no page survives on striderbikes.com; Performance
  Bicycle and FortNine both list the exact SKU as "Discontinued". Kept the row (real, formerly-sold
  model) but it can't be verified against a live maker page — stays `unverified` with the
  discontinuation documented in `note`.
- **Several makers publish no bike weight at all** (Puky, Kinderfeets, Chillafish, Giant, Bixe,
  Schwinn Skip 2): per THE BAR item 2, `verified:true` needs a maker-stated or reputable-measured
  weight. These rows got their other fields (seat height, price, frame material, tire, brake)
  corrected/confirmed against the maker page or best-available independent sources but stayed
  unverified rather than borrow a non-bar-compliant weight.
- **Guardian-row "verified (partial)" precedent reused** for makers that publish weight/price/
  interfaces but not an adjustable seat-height range (Specialized Hotwalk/Hotwalk Carbon,
  Cannondale, Early Rider Big Foot 12, Frog Tadpole Mini, Schwinn Elm, Yedoo TooToo/YooToo): marked
  `verified:true`, seat height retained from the prior aggregator source, discrepancy documented.

## The 4 rows missing seat-height ranges (all pre-existing, all intentional per THE BAR)

- `sb-cannondale-kids-trail-balance` — Cannondale publishes only a rider-height range (94-107cm).
- `sb-coop-rev-12` — REI publishes only a child-inseam range (12-17in).
- `sb-kubikes-12` — KUbikes publishes only a recommended-inseam/height figure.
- `sb-propain-bambam` — Propain fits by rider height (90-110cm), not seat height.

All four were re-confirmed against the maker's own page this wave; none acquired a fabricated
seat-height figure.

## Real corrections made (not just provenance upgrades)

- **Strider 14x / 20x Sport**: `frameMaterial` was "aluminum", maker states steel.
- **Retrospec Cub Plus**: `frameMaterial` was "steel", maker states aluminum.
- **Bixe 16**: `frameMaterial` was "aluminum" (maker: steel) AND `brake` was "rear-hand" (maker/
  independent reviews: no brake) AND price was a stale $90 (maker MSRP: $110).
- **Frog Tadpole Mini**: `brake` was "rear-hand", maker states brakes front AND rear (dual-hand).
- **Specialized Hotwalk / Hotwalk Carbon**: `tire` was "air", maker's "Rhythm Lite" tire is
  airless/flat-free (mapped to "foam").
- **Puky LR M**: `tire` was "solid-rubber", maker states EVA foam tire.
- **Propain Bam Bam**: `price` was EUR249 — a copy/transcription error duplicating the Moustache
  Mercredi 12 row's price; the maker's own EN+DE pages both state EUR179. `tire` was "rubber-foam",
  maker lists pneumatic VEE tires (mapped to "air").
- Multiple stale sample prices corrected to current maker MSRPs (Strider 12 Sport/Pro, Early Rider
  Big Foot 12, Frog Tadpole Mini, Retrospec Cub/Cub Plus, Specialized Hotwalk, Schwinn Elm, KUbikes
  weight).

## Not touched

- 5 rows already `verified:true` from prior waves (woom x2, Prevelo, Guardian, Early Rider Bella
  Velio) — spot-checked for internal consistency only, not re-fetched.
- The 8 rows that remain unverified (Strider 12 Classic, Puky LR M, Kinderfeets Classic, Chillafish
  BMXie2, Schwinn Skip 2, Giant Pre, Bixe 12, Bixe 16) all have a documented reason (discontinued
  model or no maker-published weight) rather than a skipped/incomplete lookup.
