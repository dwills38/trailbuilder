# Manufacturer-Bias Audit — 2026-07-12 (post-3018-part wave)

_Read-only worker audit of `origin/main` @ `5967d12` (3018 parts / 1872 verified), run per
Douglas's standing guardrail: periodic audits that the engine, catalog, and UI favor NO
manufacturer. Findings ordered by severity. Every remedy is ADD-real-data — nothing removes real
parts. Committed to the repo by the coordinator as part of the reviewer audit trail._

## 1. HIGH — The "✓ Verified only" view inverts market reality in several categories

The verified-rate spread by brand is now so uneven that the verified-only toggle (a first-class,
trust-branded UI filter) shows a market that doesn't exist:

- **Frames:** Specialized 0/7, Trek 0/5, YT 0/3, Scott 0/2, Cannondale 0/1 verified — the biggest
  mainstream brands VANISH from the verified view while boutique brands (RAAW / Transition / Yeti
  at 100%) fill it.
- **Shocks:** RockShox 32/382 verified (8.4%) vs Fox 78/102 (76.5%), EXT 69/69 and Cane Creek
  64/64 (100%). The verified-only shock view reads: Fox 78, EXT 69, Cane Creek 64, RockShox 32 —
  two boutique brands appear as ~40% of the shock market.
- **Drivetrain:** SRAM 80.8% verified vs Shimano 40.8% — verified-only drivetrain reads ~3:1 SRAM.
- **Forks:** DVO 1/25 (4%) nearly vanishes; X-Fusion 22/22 equals Fox's verified count.

Cause is fetch-walls, not editorial choice, but the user-facing effect is brand distortion behind
a trust-branded toggle. **Remedies:** (a) verification waves TARGETED at the inversions —
RockShox shock tail (SRAM publishes model pages), Shimano via the proven archive-handbook route,
frames via the measured-weight policy where pages are walled; (b) this is the strongest concrete
case yet for the web-unblocker connector gap (Bright Data / Tavily) — Specialized / Trek /
Michelin / Shimano hosts are exactly what it unblocks.

## 2. MEDIUM-HIGH — XDR freehub hard-errors against every cassette; SRAM documents the fix (engine)

The two verified WTB CZR i30 XDR rear wheels (`rw-wtb-czr-i30-29-xdr`, `rw-wtb-czr-i30-275-xdr`)
hit rule 6's exact-match freehub error against ALL 25 cassettes (no cassette carries freehub XDR)
— the wheels are un-buildable. But SRAM documents that XD cassettes mount on XDR drivers with the
1.85 mm spacer (XDR = XD + 1.85 mm; the spacer ships with drivers/cassettes). Per the engine's own
adapter-tier convention (rotor SM-RTAD05, UDH retrofit kit, bar shim), XD-cassette-on-XDR-wheel
should be a direction-aware WARNING carrying a structured `fix`; XDR-cassette-on-XD stays an error
(doesn't fit). Today's behavior is a false "won't fit" that zeroes out one brand's verified
wheels. **Gate:** fetch SRAM's spacer doc first (the rule-add bar), add engine tests. Nit found
while checking: `LABELS` has no `'XDR'` entry (XD renders "SRAM XD"; XDR renders raw "XDR").

## 3. MEDIUM — Fork + brake/rotor row-share out of line with market; family counts show the cheap fix

- **FORKS (321):** RockShox 97 rows (30.2%) vs Fox 35 (10.9%) — in reality the two are comparable
  leaders. Family-level is already EVEN (RockShox 7 = Fox 7 families); the skew is size-variant
  depth (~13.9 rows/family RS vs 5.0 Fox). Remedy: a Fox fork variant fill-out wave
  (travel/wheel/tier variants per maker size charts) — same template as the shock Fox-balance
  wave, no new model research needed. Boutiques (Manitou 33, Formula 28, Öhlins 27, DVO 25) each
  nearly match Fox today, which reads wrong in the picker.
- **BRAKES+ROTORS (223):** TRP is the TOP brand at 19.3% (43 rows) over SRAM 15.2% and Shimano
  14.3% — the real world is Shimano/SRAM dominant, TRP a solid #3/4. Driver: TRP rotors 34 rows vs
  Shimano 20 / SRAM 22. Concrete starter: the RT-MT905 (6-bolt XTR-tier, published 147/187 g via
  the archive-handbook route) is still uncataloged; more Shimano/SRAM rotor + caliper SKU coverage
  closes the gap with real parts.
- **SHOCKS:** rebalance held at row level (RockShox 49.2% / Fox 13.1%) and family-level Fox now
  LEADS 10 families to RockShox 5 — remaining row skew is RockShox's exhaustive size matrices
  (~76 rows/family) vs Fox's sparse ones (~10). Optional: fill Fox size matrices from maker
  charts; otherwise accept — dots/compatible-only largely neutralize it once a frame is picked.
- **Fine as-is:** tires (Maxxis 23.6% ≈ real market position), frames (top share 7.1%, 41 brands),
  wheels (top 10.6%, 24 brands), cranks (Shimano 16 > SRAM 13), presets (SRAM 52.6% of groupsets
  tracks SRAM's real tier count).

## 4. MEDIUM — Rule 8b flat-mount caliper ceiling live on 2 of 4 FM calipers (engine evenness)

`maxRotor` is populated on `bk-shimano-xtr-m9110-fm` and `bk-magura-mt8-sl-fm` (both 160) but
ABSENT on `bk-hope-xcrpro-x2-fm` and `bk-sram-level-ultimate-fm`. Within one 4-part product class,
the two documented brands red on a 180 rotor while the two undocumented equivalents green — a
shopper comparing them sees Hope/SRAM as "more compatible" purely because they publish less.
Remedy: source Hope's XCR flat-mount rotor guidance + SRAM Level FM (OEM docs); if genuinely
unpublishable, record that in the row desc so the asymmetry is at least deliberate. Same pattern
at lower stakes: `minRotorF` absent on ALL 11 SR Suntour forks (288/321 others carry it); fork
`maxTire` on only 30 forks (RockShox 18 of them → RockShox warns on wide tires where Fox stays
silent); wheel `minTire` only on Hope/Spank/WTB. **Structural note:** dormant-until-sourced
systematically makes BETTER-documented brands show MORE warnings. The architecture is right
(missing rule beats wrong rule) — but per-class evenness (all members of a small class sourced, or
none, with the gap noted in desc) is a cheap standing target for entry waves.

## 5. MEDIUM-LOW — Default "Best match" sort tie-breaks on catalog insertion order (UI)

`SORTS.featured` = compat-rank → presets → PARTS array order (index.html). Before a build exists
all dots are grey, so the default browse order IS data-entry history: the shock tab's first 60
rows are 38% RockShox, the tire tab opens on 5 Maxxis in a row, the fork list's early pages
contain a 24-row DVO block. The append-only catalog makes this sticky: late-added brands sit
permanently below the fold in the default view. Remedy (additive-neutral, hides nothing): change
the final tie-break from insertion index to a neutral key — alphabetical brand+model, or a
per-session/day seeded stable shuffle. Keep compat-rank primary and presets-first; goldens/tests
unaffected (pure UI ordering). **Choice of key is Douglas's call** (alphabetical is predictable
but favors early-alphabet brands every time; a daily-seeded shuffle is time-averaged fair).

## 6. LOW — Headsets: 3 brands, Cane Creek 68.8%

Known fetch-wall artifact (FSA 403, Acros 404, WolfTooth/Hope sell separates). The relaxed
unverified-inclusion policy now permits FSA/Acros complete-headset SAMPLE rows (no verified flag)
— a small batch would fix the near-monoculture. Cane Creek genuinely is the headset market leader,
but not at 69%.

## 7. LOW — Pinned SAMPLE_FALLBACK/golden builds skew RockShox/SRAM

6 of 7 pinned builds run RockShox shocks, 4/7 RockShox forks, 5/7 SRAM drivetrains, 5/7 OneUp
grips. Low severity because the random generator is now the primary path (fallbacks show only on
roll failure) — but they're also the test-golden builds and the "showcase" set. Remedy: diversify
2–3 pinned builds (e.g. a Fox/Öhlins shock, a Shimano drivetrain swap) next time they're touched,
updating test-golden in the same commit.

## Checked clean (for the record)

- **AFFILIATE ISOLATION — CONFIRMED:** 0 of 3018 parts carry `retailerLinks`/`image`;
  `checkBuild`/`compatOf`/`buildTotals` never read either field; no sort ranks by
  monetizable-ness (SORTS = compat/name/price/weight only); links render only inside the
  click-opened part modal with the FTC note + `rel="sponsored nofollow noopener noreferrer"`.
  Watch-item for the future image-sourcing wave: cards with real images will out-salience
  placeholder cards — source images category-by-category, not brand-by-brand, to avoid a
  visual-bias phase.
- **Engine brand-conditional code:** only rule 3a (AXS controller exemption) names a brand's
  systems — backed by SRAM's own support docs, correctly does NOT extend to non-SRAM, and no
  cataloged non-SRAM equivalent exists to exempt. Rule 12's error-vs-warning tiering by maker
  language (Ibis limit-language errors vs Santa Cruz recommendation-language warnings) is faithful
  to sources, not favoritism. Rule 9's fix naming Shimano SM-RTAD05 is "e.g." and the canonical
  product.
- **Guides (`src/guides.js`, all re-read):** brand mentions are factual standard-ownership (XD,
  Center Lock, UDH, LG1r, the Firebird chainline example); adapters named are real products; no
  favoritism in copy; zero affiliate links as promised in the header.
- **`generateSampleBuild`:** mechanism is brand-neutral (fit-filter then price-band sample); it
  inherits catalog row-share skew, so finding #3 is the fix, not a generator change.

**Suggested queue order:** #2 (engine fix, small + testable) → #3 fork/rotor waves (grind) → #1
targeted verification waves (ongoing) → #5 tie-break (one-line UI change, pending Douglas's key
choice) → #4/#6/#7 opportunistic.
