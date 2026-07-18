# VERIFIED-FLAG INTEGRITY AUDIT — 2026-07-18

Adversarial audit of every row carrying `verified:true` across `src/compat.js`,
`src/kit.js` and `data/bmx.js` (with a report-only sweep of `data/striders.js`,
`data/road.js`, `data/gravel.js`). Trigger: `fr-devinci-troy-st` carried
`verified:true` while its own desc conceded the price is "sample … not a frame
MSRP" and the weight is "sample (no frame or complete weight published)".

**Scope at audit time:** 3,017 verified rows in compat.js, 436 in kit.js, 59 in
bmx.js — **3,512 in-scope** (plus 5 strider / 32 road / 26 gravel, report-only).

**Method.** (1) A mechanical language sweep over every verified row's own text
fields (sample/estimated/converted/not-published/proxy/placeholder/assumed/
inferred/carried-over…), 2,184 raw hits, refined to 1,916 price/weight/spec-
anchored hits, every surviving cluster human-read (889 clusters). (2) A
provenance-field sweep (source domain class, sourceType, weightSource,
lastChecked) — 41 hits, all read. (3) 10 verified rows picked pseudo-randomly
across categories (seed 20260718, `mulberry32`) and their cited sources
re-fetched live.

## Headline verdict

The flag is **structurally honest but two-tier**. The overwhelming majority of
"contradiction-looking" language is *deliberate, disclosed convention* (nominal
weights under the interface-verification exceptions; "price = sample (maker
publishes no MSRP)") — not flag abuse. But a bounded set of rows violated the
bar outright — review-site sources, invented verdict-driving fields, another
product's price — and **55 rows were demoted in this branch**. The audit also
surfaced a large *policy gap* (price never formally exempted, but sample prices
sit on well over a thousand verified rows) that is Douglas's call, not an
audit fix.

---

## CRITICAL — demoted in this branch (55 rows, all `src/compat.js`)

Demotion = `verified:true` removed; `source`/`lastChecked` retained as the
factual record of where the data came from (the `fr-yt-jeffsy` pattern for
identical-basis unverified rows); a dated `DEMOTED 2026-07-18 (verified-flag
audit)` note prepended to the desc. No spec/price/weight values were changed —
demotion only reduces the claim.

### N. Flagrant self-contradiction (4) — desc literally opens "UNVERIFIED sample:"

`fr-nukeproof-mega-290-alloy`, `fr-nukeproof-mega-297-carbon`,
`fr-nukeproof-reactor-290-alloy`, `fr-nukeproof-scout-290`

Each desc begins **"UNVERIFIED sample:"** and states interfaces come from the
Vital MTB reprint (nukeproof.com defunct/500) — while the row carried
`verified:true` with `source` = vitalmtb.com. The clearest form of the
Troy-ST failure: the disqualifying note and the flag written in the same breath.

### D2. Review-site / retailer `source` on a verified row (33 more)

THE BAR (VERIFY-PROTOCOL): *"You fetched the manufacturer's own product/spec
page (not a retailer, not a review)."* The catalog's own practice agrees —
`fr-yt-jeffsy` is explicitly UNVERIFIED because its interfaces come from the
fetched Vital table ("below the bar"), and the dealer-sourced Norco hardtail
rows were "left UNVERIFIED per that basis". These rows did the same thing and
set the flag anyway:

- vitalmtb.com-sourced frames: `fr-norco-range-c1`, `fr-pivot-firebird`,
  `fr-kona-process-153`, `fr-orbea-rallon-mteam`, `fr-propain-spindrift-cf`,
  `fr-norco-sight`, `fr-orbea-occam-lt`, `fr-propain-tyee-cf`,
  `fr-propain-tyee-al`, `fr-propain-hugene-cf`, `fr-pivot-mach-6`,
  `fr-trek-procaliber-c-gen3`
- vitalmtb.com-sourced forks: `fk-dvo-onyx-sc-d1-29-160/-170/-180`,
  `fk-dvo-onyx-sc-d1-275-160/-170/-180`, `fk-dvo-onyx-d1-38-29-160/-170/-180`,
  `fk-dvo-onyx-38-d1-29-170`, `fk-ext-era-v2-29-170`,
  `fk-fox-40-factory-29-203`, `fk-fox-38-performance-29-170`
- vitalmtb.com-sourced droppers: `dp-pro-koryak-120-309-120`, `dp-pro-koryak-120-316-120`
- retailer/review-sourced wheels: `fw-dtswiss-exc1501-29` (worldwidecyclery),
  `rw-dtswiss-exc1501-29-xd` (bikeradar review)
- review/retailer-sourced completebikes (the sheet-verified badge claims the
  MAKER's spec page was transcribed): `cb-devinci-django-carbon-gx`,
  `cb-devinci-django-nx-12s`, `cb-salsa-blackthorn-145-c-deore-12`,
  `cb-propain-spindrift-al-base`, `cb-norco-optic-c2` (vitalmtb),
  `cb-norco-fluid-fs-a1-sram` (thebackcountry.com),
  `cb-forbidden-dreadnought-v2-mx-dreadnought1`,
  `cb-forbidden-druid-v2-29-tier1` (worldwidecyclery)

Several descs argue "Vital reprints maker data" (maker site fetch-blocked).
That may be factually right, but it is exactly the basis the catalog elsewhere
rules below the bar; if Douglas wants a "reputable third-party spec-table"
tier, that is a policy decision (see Recommendations) — until then these can't
carry the same badge as maker-fetched rows.

**Flag while here:** `fk-dvo-onyx-d1-38-29-170` and `fk-dvo-onyx-38-d1-29-170`
appear to be the SAME fork under two ids (token-order variants) — a duplicate-id
cleanup candidate, out of this audit's scope, not actioned.

### D1. Verdict-driving field admitted sample/assumed/inherited (10)

*"Interfaces are ALWAYS manufacturer-sourced — no exceptions"* — the one bar
line with no wiggle room, and these fields feed `checkBuild` verdicts that the
badge tells users to trust:

- `fr-giant-reign-advanced` — maxRotorR "left as documented sample"; UDH via
  "search coverage" (protocol: search snippets never count)
- `fr-canyon-spectral-al` — seatTube/bb/headset carried over from
  `fr-canyon-spectral-cf`, which its own desc calls a **different chassis**
  ("all-new platform … NOT a same-platform pair")
- `fr-specialized-status-2-170` — headset "assumed … not independently
  confirmed"; seatTube/brakeMount/maxRotorR/wheelConfigs retained from the
  Vital cross-check only
- `fr-trek-fuel-ex-c-gen6` — shockEye/Stroke (rule 17) rests entirely on
  Vital + retailer listings; rearAxle/headset also non-maker ("uncontradicted")
- `fr-trek-session-8-29` — rearAxle (157x12) and headset rest on the Vital
  table; everything else is maker-manual-confirmed (one fetch from re-promotion)
- `fr-kona-process-153-carbon` — seatTube/brakeMount/maxForkTravel/wheelConfigs
  "inherited from the alloy sibling … not independently re-confirmed" — and the
  alloy sibling's own basis is Vital (itself demoted above). The maker tech-doc
  PDF confirmed shock/bb/headtube/maxRotorR/rearAxle/udh, so this row is also
  one targeted fetch from re-promotion.
- `fr-commencal-meta-ht-v3`, `fr-commencal-frs`, `fr-commencal-supreme-dh-v5`,
  `fr-commencal-supreme-dh-v52` — maxForkTravel is an admitted sample WITH
  invented headroom above the maker-stated design travel (150→160, 200→203 ×3).
  An invented rating can green-light a fork the maker never approved.
  (Contrast: `fr-commencal-tempo` records max = design exactly — the
  Transition-Scout convention — and is NOT demoted despite its desc's "sample"
  label; `fr-commencal-meta-v5`'s 170 is derived from the maker-stated max
  axle-to-crown, reported below instead.)

### D3. Another product's price stored as the row's own (2)

- `fr-devinci-troy-st` — the named trigger: price $5,499 IS the fetched GX AXS
  complete-bike price stored on the FRAME row; weight invented ("no frame or
  complete weight published"). Note the practiced convention for
  complete-only frames explicitly stores a *reduced frameset-equivalent
  sample* (`fr-canyon-spectral-al`, `fr-canyon-neuron-cf`) — this row violates
  even the drifted bar, not just the written one.
- `fr-transition-sentinel-alloy` — identical failure: $3,999 = the Alloy Eagle
  70 complete price; weight "estimated … for the alloy-vs-carbon penalty".

### D4. Verified completebike whose fills don't match the fetched sheet (2)

- `cb-marin-alpine-trail-1` — sheet states "Fox 36 Rhythm 170mm"; the fill is a
  RockShox Domain Gold RC 170 ("closest sourced substitute … a follow-up worker
  should add the real Fox 36 Rhythm row and correct this fill"). A
  sheet-verified badge over a knowingly wrong stock fork.
- `cb-alutech-fanes29-trailready` — rotor sizes "assumed at the class-standard
  enduro 203/180 split (not stated on the page)", headset a "market-standard OE
  assumption", brake tier substituted, price a EUR conversion.

Contrast case kept verified: `cb-marin-rift-zone-2` handles the same situation
correctly — inferences live on the new PART rows (left unverified there), the
bike's fills match the sheet, price is the real fetched USD list.

---

## Policy findings — REPORT ONLY (Douglas's call, no rows changed)

### P1. Sample PRICES on verified rows are ubiquitous and never formally exempted

THE BAR item 3 says a verified row's price = fetched US MSRP. In practice,
**hundreds of verified rows across every catalog** carry a disclosed sample
price with the flag set, in several self-citing precedent chains:

- "price stays sample (SRAM publishes no MSRP)" — ~360 verified RockShox/SRAM
  shocks, plus SRAM brakes/drivetrain
- "Price $X is a sample (no MSRP published)" — the whole verified Shimano
  handbook set (shifters/derailleurs/cassettes/chains/brakes)
- "price = sample (page lists no MSRP)" — much of the verified tire category
  (Maxxis SKU tables, Hutchinson, Pirelli, Continental EUR-only, WTB sale-only…)
- GBP/EUR→USD conversions on otherwise-verified rows — the in-catalog
  "Cotic/Shan-No5 precedent: a converted price stays a sample even on a
  verified row" chain (Cotic, Production Privée, Antidote, Alutech, Last,
  Privateer; Vitus/Whyte/Rose/Sonder completebikes; many kit/BMX rows)
- retailer-corroborated prices on verified rows (`fr-forbidden-druid-v2`
  "Worldwide Cyclery / Fanatik retail price", DT Swiss "retailer sample"
  wheels, Title/Deity cockpit "US-retailer sample")

This is honest and internally consistent, but the written bar says otherwise,
and the user-facing badge doesn't distinguish "interfaces+weight verified" from
"price also real". **Recommendation:** either (a) formalize in
VERIFY-PROTOCOL: *price never blocks verification when the maker publishes no
US MSRP, provided the basis is stated in desc* (matching the practiced shock/
Shimano/tire convention), and consider surfacing "price is an estimate" in the
part card for such rows; or (b) rule sample-price rows demotable — which would
demote a four-digit number of rows. (a) matches every precedent Douglas has
already let stand.

### P2. The frame category runs on an unwritten interface-verification exception

VERIFY-PROTOCOL formally exempts weight for shocks (2026-07-12), wheels
(2026-07-14) and forks (2026-07-17) — frames are NOT on the list, and
CLAUDE.md's provenance section says weight-less frames ended `Skipped`. Yet
~40+ verified frames carry sample weights under an in-catalog precedent chain
("fr-cotic-solaris precedent: weight absence does not block a frame's verified
status when every interface field is maker-confirmed"; the Santa Cruz
"frame-only weight not published by SC → sample" set; Yeti FAQ rows; etc.).
**Recommendation:** add frames to the protocol's interface-verification list
(the criteria are genuinely met: makers publish full interface data and no
frame-only weight) — or demote the class. Formalizing matches practice.

### P3. Specific rows worth a decision or a follow-up fetch (no action taken)

- `cb-devinci-spartan-gx-axs` — verified completebike whose PRICE is an
  invented "SAMPLE ESTIMATE bracketed between" two other bikes. Memory says
  verified-badge semantics for complete bikes are undecided; an invented
  headline price under any badge deserves a ruling. (Demote or fix price.)
- `fr-commencal-meta-v5` — maxForkTravel 170 derived from the maker-stated max
  axle-to-crown (586mm): maker-based engineering derivation, or below the bar?
  Mechanic-review question.
- `fr-yeti-sb150`, `fr-santacruz-nomad-4` — price AND weight are invented
  "positioned between siblings" estimates (not conversions) on verified rows;
  interfaces are maker-FAQ-sourced. Kept under P1/P2 reading, flagged for the
  price ruling.
- `ti-kenda-nevegal2-29-24-atc-dtc` (spot-verify find) — $97.95 is neither on
  the cited maker page nor given any basis in desc. The only spot-checked row
  with an undocumented field basis.
- `fk-dvo-onyx-d1-38-29-170` vs `fk-dvo-onyx-38-d1-29-170` — apparent
  duplicate ids for the same fork (see D2).
- Report-only catalogs: road (32 verified) and gravel (26) show the same P1
  price-sample pattern in miniature; striders (5) clean on this sweep. Not in
  demotion scope this pass.

### P4. What was clean

- **Zero** `sourceType:'retailer'` on verified rows, **zero** missing
  source/lastChecked, **zero** future dates — the validator's provenance gate
  works.
- **BMX and Kit catalogs: zero demotions.** Every flagged row follows a
  documented convention (kit weight policy, wheels exception, "kept as prior
  unconfirmed sample" prices) — including actively refusing Shopify
  placeholder shipping-weights. The conventions-with-disclosure culture works
  when the convention actually exists.

---

## Spot-verification (10 random verified rows, sources re-fetched 2026-07-18)

| Row | Source | Verdict |
|---|---|---|
| `cb-revel-ritual-sram-eagle90` | revelbikes.com | **SUPPORTED** — $5,999.00 exact; build sheet (ZEB Ultimate 170, Vivid Ultimate, Eagle 90, Maven Silver, Synthesis Alloy, DHF/DHR II) matches fills |
| `ti-kenda-nevegal2-29-24-atc-dtc` | kendatire.com | **PARTIAL** — "862±43g", ATC, dual exact; **price $97.95 not on page, no basis in desc** |
| `ro-trp-rs02m-160-6b` | trpcycling.com | **SUPPORTED** — $47.49 exact, 160mm/6-bolt exact; weight a disclosed sample |
| `st-burgtec-enduro-mk3-35` | burgtec.co.uk | **SUPPORTED** — "42.5mm 152g" verbatim, 35 clamp; $128.99 per burgtec-usa.com (maker's own US store, per desc) |
| `fr-intense-tracer-279` | intensecycles.com | **SUPPORTED** — 205x65 trunnion, BSA73, Boost148, 31.6, max fork 170, max rotor 203, UDH, 2.5 max tire, 3.17kg(S)=3170g all exact |
| `sh-rockshox-vivid-coil-210x50` | sram.com service page | **SUPPORTED** — 210x50 std present in the published size matrix; weight/price disclosed samples per policy |
| `hm-kaliprotectives-dh-invader` | kaliprotectives.com | **SUPPORTED** — "750g / 26.4 oz", CPSC/EN 1078/ASTM DH, RHEON, ~$290 |
| `bk-shimano-xt-m8120` | productinfo.shimano.com PDF | **NOT RE-FETCHED** this session (large PDF; the handbook route is a documented working fetch). Row internally consistent, weight a disclosed sample |
| `pnt-endura-mt500-waterproof` | endurasport.com | **SUPPORTED** — $200.00 exact |
| `elp-endura-mt500-d3o` | endurasport.com | **SUPPORTED** — $110.00 exact |

8/9 fetchable rows fully supported; 1 partial (price basis); 0 contradicted on
any interface or weight. (The seeded shuffle produced no BMX row — noted.)

## Honest reliability estimate

- **Interfaces (what checkBuild reads): high.** Post-demotion, every remaining
  verified row read in this audit traces its engine-facing fields to a maker
  page/PDF, and 9/9 spot-checked rows' interfaces held. The demoted 55
  (~1.6% of 3,512) were the tail that didn't.
- **Weights: high, with disclosed nominal-weight classes** (shocks/forks/
  wheels/kit per written policy; frames per the unwritten P2 convention).
- **Prices: the weak axis.** A verified badge currently does NOT imply a
  maker-confirmed US MSRP for a large minority of rows (P1). Disclosed in
  descs, invisible in the UI. This is the one place the badge materially
  overclaims to users today.
- Bounding: the language sweep only catches rows that *say* something about
  their basis. A row that silently misstates a spec with a clean desc is
  invisible to (1)-(2) and only sampled by (3) — 10 fetches found none, but
  the drift-check tool remains the right ongoing guard for silent rot.

## Gates

`node validate.js` (7 OK), `npm test` (764 passed / 29 files), `npx tsc
--noEmit`, and `node tools/verdict-audit-harness.js` all pass before and after
the demotions. The harness before/after diff is exactly one line — its DVO
Onyx SC probe's informational annotation "(verified 6/6)" → "(verified 0/6)",
i.e. the harness *reporting* the D2 demotion of those six forks. **No error,
warning or info verdict changed** (demotions touch no engine-read field). One test evolved, explicitly per the audit brief:
`test/test-ui.js`'s `completeBikeSheetVerified` cases used
`cb-devinci-django-carbon-gx` (demoted here, D2/vitalmtb) as the verified
exemplar; they now use `cb-revel-ritual-sram-eagle90`, whose maker source was
re-fetched and confirmed in this audit's spot-check. The verified count
encoded nowhere in tests; `tools/verification-job.json` was deliberately left
untouched (its next sync will observe the demotions; its state is
tombstone-safe).
