# verify/fanout-1-forks-rockshox — progress log

Scope: every unverified `cat:'fork'` row in `src/compat.js` where `brand` is
RockShox or SRAM, applying the 2026-07-17 fork interface-verification
exception (VERIFY-PROTOCOL.md — nominal weight allowed once interfaces are
maker-confirmed). Branch based on `origin/main` @ `a0a4c99`. Does NOT touch
`tools/verification-job.json` (own progress log only, per brief).

## Starting state

84 unverified RockShox/SRAM fork rows (48 of them referenced by at least one
`cat:'completebike'` fills object — prioritized first). Ending state: **43
unverified remain, 41 promoted to `verified:true`** across three commits.

## Method

For each distinct `mfgPn`, fetched `https://www.sram.com/en/service/models/<slug>`
(slug = mfgPn lowercased) — this is the full static spec-matrix page (unlike
`/en/rockshox/models/`, which is JS-thin per prior-session memory). Confirmed
wheel/travel/axle/steerer/brakeMount/maxRotorF/minRotorF match the catalog
row exactly, then either:
- used the maker's per-config weight if one existed for the exact row, or
- kept/adopted a **nominal** weight (the maker's unqualified reference figure,
  or the existing sample if it was itself already scaled from that same
  reference by a prior session), labeled as such in `desc`, per the new
  exception.

Never marked a row verified when the model's own sram.com page states **no
weight at all** for any configuration — the exception licenses using an
existing/approximate figure, not inventing one from nothing.

## Batch 1 — 38 rows verified (commit f1160bb)

Groups with a maker weight point somewhere on their own model page (fetched
this session): Pike Base (FS-PIKE-BSE-C1, 1833g@29/140), Pike Select
(FS-PIKE-SEL-C1, 1778g@29/140), Pike Select+ (FS-PIKE-SELP-C2, 1828g@29/140),
Lyrik Select (FS-LYRK-SEL-D1, 1928g@29/160), Lyrik Select+ (FS-LYRK-SELP-D2,
1968g@29/160), Lyrik Base (FS-LYRK-BSE-D1, 1973g@29/160), BoXXer Base D1
(FS-BXR-BSE-D1, 2840g@200mm/short-crown, stated identical both wheel sizes),
Domain Gold R (FS-DOMN-GR-C1, 2524g@29/160), SID Select (FS-SID-SEL3-D1,
1646g@120), SID Select+ (FS-SID-SLP3-D1, 1562g@120), ZEB R (FS-ZEB-R-A1,
2231g@29/190), ZEB Base (FS-ZEB-BSE-A2, 2341g@29/190), ZEB Select+
(FS-ZEB-SELP-A3, 2295g@29/190). All interfaces confirmed to match the
existing rows exactly — no corrections needed in this batch. Weights kept
as the existing sample-interpolated figures (already derived from these same
maker reference points by prior sessions); desc appended with the fork
exception basis note per row.

## Batch 2 — 2 rows verified (commit fb35c6a)

`fk-rockshox-zeb-r-29-180` and `fk-rockshox-sid-selectplus-29-100` had no
`source` field at all despite already-documented sram.com research in their
desc text. Added `source`, `verified:true`, `lastChecked:'2026-07-17'`.
`sid-selectplus-29-100`: re-fetching fs-sid-slp3-d1 confirmed the page's own
travel list is "100mm, 110mm, 120mm" — 100mm is a real retail travel point on
this chassis (superseding a prior session's note that it was OE-only-inferred).

## Batch 3 — 3 Psylo rows verified + 2 corrections (commit fb35c6a, same commit as batch 2)

Found the Psylo Gold RC (`FS-PSYL-GRC-A1`) and Psylo Silver RC
(`FS-PSYL-SRC-A1`) sram.com service pages via WebSearch — not previously
located by any prior session (their desc said "no standalone consumer page
located").

**Corrections (verdict-driving field, both Psylo Gold RC rows):**
- `fk-rockshox-psylo-gold-rc-29-140`: `maxRotorF` 203 → **220** (the prior
  value was a class-typical guess with no maker source); added
  `minRotorF:180`.
- `fk-rockshox-psylo-gold-rc-29-160`: same correction, same reason.
- Post-correction `verdict-audit-harness` E-section no longer lists either
  Psylo Gold RC row among the false-rotor-warn families (it did list them
  implicitly before via the 203 value — confirmed the correction is a net
  safety improvement, not just neutral).

Weights: replaced retailer/estimate figures with the maker's unqualified
reference figures — 2786g (Psylo Silver RC, "29in full fender compatible
Maxle Light" config) and 2320g (Psylo Gold RC, same config wording) — per the
fork exception, since neither figure is tied to a specific travel point.

## Batch 4 — 1 correction, no new verification (commit 5bfbd03)

`fk-rockshox-35-silver-tk-29-140`: found the 35 Silver TK sram.com page
(`FS-35S-TK-A1`, not previously located). Page states Minimum Rotor Size
**180mm**; the row carried `minRotorF:160`, copied from a sibling that itself
never stated 160 (the correct `fk-rockshox-35-gold-rl-29-130`/`150` siblings
already carry 180). **This was a live false-fit risk**: a 160–179mm rotor
would have incorrectly passed rule 10b (native-mount minimum) on this row.
Corrected to 180. The page states **no weight for any configuration**, so
the fork exception has nothing to anchor a nominal figure to — the row stays
unverified/sample despite the interface fix landing regardless (a correction
doesn't require verification to be worth making).

## Contradiction check

No row previously `verified:true` by an earlier session was touched, edited,
or contradicted. `fr-santacruz-megatower-cc`, the Race Face Aeffect R stem
dup pair, and `cb-yeti-sb135-t2`/`t3` fills were untouched per the exclusion
list.

## Remaining 43 unverified rows (Skipped — no maker weight found anywhere)

Systematically fetched or re-confirmed each of these families' own sram.com
service page this session; **every one publishes NO weight figure at all**
for any configuration of that specific model (not just "not for this exact
travel point" — genuinely none), so the fork exception has no maker anchor
to apply, per-config or nominal:

| mfgPn / model | rows | page checked |
|---|---|---|
| FS-BXR-SEL-D2 (BoXXer Select D2) | 6 | fetched — no weight |
| FS-BXR-ULT-D2 (BoXXer Ultimate D2) | 6 | fetched — no weight |
| FS-RCNS-RL-D1 (Recon Silver RL) | 2 (+2 more below, NOPN) | fetched — no weight |
| FS-RCN-RL-B1 (Recon RL) | 1 | fetched — no weight |
| FS-RCNG-RL-C1 (Recon Gold RL) | 1 | fetched — no weight |
| FS-JDYG-RL-A3 (Judy Gold RL) | 1 | fetched — no weight |
| FS-SIDS-SEL3-E1 (SID SL Select) | 2 | fetched — no weight |
| FS-35S-TK-A1 (35 Silver TK) | 1 | fetched — no weight (interface correction made, see above) |
| "35 Gold RL" (FS-35G-RL-A2) | 4 | fetched — no weight |
| Judy Silver TK (FS-JDYS-TK-A3, guessed slug) | 5 | fetched — no weight |
| Revelation RC (found FS-RVL-RC-A1 via search) | 3 | fetched — no weight; maxRotorF 203 already correct, no min stated on page |
| Yari RC (FS-YARI-RC-B3) | 3 | fetched — no weight |
| Recon Silver RL 27.5in rows (same FS-RCNS-RL-D1 family, no page-level split) | 2 | same page, no weight |

**No sram.com page located at all** (genuinely OE-only tiers, or ambiguous
naming that didn't resolve to a confident single service-page match —
did NOT guess a slug and force a fetch that could misattribute another
model's data):
- `fk-rockshox-sid-29-110` ("SID 110, Carbon 2" — bare citation, no tier
  suffix on the source bike page, no matching sram.com model found)
- `fk-rockshox-sid-base-29-110`, `fk-rockshox-sid-base-29-120` (SID Base is
  OEM-only, confirmed no standalone page by a prior session and re-confirmed
  this session)
- `fk-rockshox-reckon-rl-29-140` ("Reckon" — WebSearch confirms RockShox's
  actual product line is "Recon", not "Reckon"; the OE bike-page citation is
  real but doesn't map to a distinct sram.com model)
- `fk-rockshox-lyrik-select-rc-29-160` ("Lyrik Select RC" doesn't match any
  found Lyrik service-page name exactly — closest candidates were older-gen
  "Lyrik RC"/"Lyrik RC2" C1-chassis pages, which is a different generation
  from this row's context; did not force a match)
- `fk-rockshox-lyrik-ultimate-29-170` — the current Lyrik Ultimate D2 chassis
  page (fs-lyrk-ult-d2, already used for the verified 140/150/160mm Ultimate
  siblings) lists travel options "140mm, 150mm, 160mm" only; 170mm is not an
  option on that page, so this row's interfaces can't be maker-confirmed on
  the current chassis page at all (its own desc already documents it as a
  press-covered "2027 model year" travel point) — correctly stays unverified,
  not just weight-blocked.

## Note on pre-existing anomaly (not touched, flagged for the coordinator)

`fk-rockshox-lyrik-ultimate-29-140/150/275-140/150/275-160` are already
`verified:true` (lastChecked 2026-07-07/2026-07-10, source fs-lyrk-ult-d2)
carrying **interpolated** weights (1950/1990/1900/1940/1980g) even though the
model page states a weight only for the 29in/160mm config (2028g, which the
29-160 row correctly carries flat). This predates today's fork exception —
it looks like an earlier session verified interpolated-weight fork rows
before the exception existed, which (if true) would have been out of policy
at the time. Per the brief ("if you find a contradiction, STOP and document
it separately, do not silently change"): **not touched, not re-verified,
just flagged here** — worth a coordinator look, since it may mean the
strict pre-2026-07-17 fork freeze had at least one earlier exception already
in practice for this specific chassis.

## Gates (checked after every batch, still clean at the end)

- `node validate.js` → `DATA OK - 5025 parts, 0 problems (2716 verified, 2309 unverified)`
- `npx vitest run` → `688 passed (688)` (baseline unchanged, nothing weakened)
- `npx tsc --noEmit` → clean, no output
- `node tools/verdict-audit-harness.js` → 0 flags on A/B/D, 329/0 on C-assemble,
  5/5 C2, 15/15 D, 2/2 D2; E-section unchanged aside from the Psylo Gold RC
  rows dropping off it (a correction-driven improvement, not a regression)

## Commits on this branch (`verify/fanout-1-forks-rockshox`, off `origin/main`@`a0a4c99`)

1. `f1160bb` — 38 rows verified (batch 1)
2. `fb35c6a` — 2 rows verified + 3 Psylo rows verified/corrected (batches 2-3)
3. `5bfbd03` — 1 correction, no new verification (35 Silver TK minRotorF)
