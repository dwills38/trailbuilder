# TIER-2 DRIVETRAIN MODELING — DESIGN DOC (decisions for Douglas)

**Date:** 2026-07-22 · **Branch:** `docs/tier2-drivetrain-design` · **Status:** DESIGN ONLY —
no schema, engine, catalog or test file is touched by this branch.

**What this is:** two open drivetrain-modeling questions framed as decision matrices. Every
option carries its blast radius (rules, tests, vocab/schema, catalog rows) and a
recommendation. **The decisions are Douglas's** — nothing here is implemented, and no
recommendation should be read as a commitment.

**THE BAR (unchanged, and it drives every call below):** a false *"won't fit"* OR a false
*"fits"* is worse than a missing rule. Every compatibility claim in this doc is cited to a
**manufacturer** page fetched during this round; third-party sources are labelled as such and
are never load-bearing.

---

## TL;DR for Douglas

| # | Question | Finding | Recommendation |
|---|---|---|---|
| 1 | Gravel mullet drivetrains (road AXS lever → Eagle mech) | SRAM documents **four** distinct mullet configurations, incl. a **mechanical** one the current controller-exemption cannot express. No false verdict exists today — a mullet is simply *unbuildable* in the gravel catalog. | **Option B** — new Eagle system tokens + an explicit, documented cross-pull field. Staged: ship the electronic half first (Option A), which is a ~5-line engine change. |
| 2 | Shimano 11-speed MTB tier (the Honzo's Deore M5100) | **The premise is stale.** `shimano-11` has been in the vocab since 2026-07-07; the full Deore M5100 group has been in the live catalog and ✓Verified since 2026-07-16/21. A complete M5100 build validates **clean** today (proven below). SRAM 11-speed (`sram-11`) is live too. | **Option W** — no vocab work. Two small catalog/doc cleanups: an obsolete `desc` note on `fr-kona-honzo`, and a possible `cb-kona-honzo` complete-bike row. |

Two **pre-existing findings** surfaced while researching Q1 are recorded in §1.7 — they are not
part of either question and need their own call.

---

## §0. Sources

All fetched **2026-07-22** for this doc. `support.sram.com` is WebFetch-403 walled (as the
engine comments already record); everything below came through the Exa lane, per the fetch
doctrine in `tools/VERIFY-PROTOCOL.md`.

**Manufacturer (SRAM) — load-bearing:**

| Tag | URL | The line that matters |
|-----|-----|-----------------------|
| S1 | `support.sram.com/hc/en-us/articles/6053882160027` | "Yes. All AXS components can connect to one another. You can use eTap AXS shift levers to build a drop bar bike with an Eagle AXS drivetrain." |
| S2 | `support.sram.com/hc/en-us/articles/6014352376731` | "The 12-speed AXS road cranksets and chainrings are compatible with **Eagle chains** if paired with an Eagle AXS rear derailleur and Eagle cassette." |
| S3 | `support.sram.com/hc/en-us/articles/13819655363099` | Transmission mullet: "Eagle Transmission can be used with a SRAM AXS Road chainring and crank… You will also need to use the **Transmission T-Type cassette and chain**, and the frame must be Universal Derailleur Hanger (UDH) compatible." |
| S4 | `support.sram.com/hc/en-us/articles/16378128396059` | **Mechanical mullet**: "Yes. Apex mechanical shifters work with **all Eagle mechanical rear derailleurs** when also paired with an Eagle cassette and Eagle chain. An Inline Barrel Adjuster is also required." |
| S5 | `support.sram.com/hc/en-us/articles/6526784724379` | "**No.** Road 12-speed Flattop chains are too narrow for the type of teeth used on a 12-speed Eagle drivetrain… could cause shifting issues and potential derailments underload." |
| S6 | `support.sram.com/hc/en-us/articles/13821170884891` | "**The chain you choose for your bike is determined by your rear derailleur and cassette.**" + "Flattop road 12-speed chains should not be used with an Eagle Transmission rear derailleur and cassette." |
| S7 | `support.sram.com/hc/en-us/articles/16376973379867` | "Apex AXS can be paired with Eagle AXS derailleurs and Apex mechanical shifters can be paired with Apex Eagle rear derailleurs, **Eagle 11-50T, 10-50T, or 10-52T cassette, and Eagle chain**." |
| S8 | `sram.com/en/sram/models/rd-apx-152-d1` (Apex Eagle RD) | Spec table: `Shift Technology = X-Actuation`, `Chain Technology = Eagle`. Bullets: "Works with 12-speed mechanical Apex and Eagle shifters" · "Use with Eagle chain". |
| S9 | `sram.com/en/sram/models/cs-xg-1275-a1` (XG-1275 Eagle 10-50) | `Chain Technology = Eagle`; `Rear Derailleur Mount = MTB, Road, Road L, UDH`. |
| S10 | `sram.com/en/sram/models/cs-pg-1231-d1` (XPLR PG-1231 11-44) | "**Compatible with Flattop chains**" · "For 11-speed road driver bodies" · `Driver body interface = Splined 11`. **This is an XPLR cassette, not an Eagle one** — it is the trap that makes "11-speed driver ⇒ Eagle-capable" false. |
| S11 | `sram.com/globalassets/document-hierarchy/compatibility-map/road/axs-components-compatibility-map.pdf` | Note 1: "Use the approved chain type for the RD and CS." Note 2: on 142 OLD frames, an Eagle/Transmission rear drivetrain must be checked against the **MTB** Frame Fit Specifications. |
| S12 | `sram.com/globalassets/document-hierarchy/compatibility-map/road/road-compatibility-map-2023.pdf` | Driver-body table: "All XD cassettes are compatible to an XDR body by using a **1.85 mm spacer**"; PG-1210 11-50 listed against an 11-speed driver. |

**Third-party (context only, NOT load-bearing):** 3T's "Hacking SRAM AXS drivetrains"
(`3t.bike/blogs/news/gravel-tech-hacking-sram-axs-drivetrains`) and bikepacking.com's Apex
Eagle launch piece. Both independently describe the same Flattop-vs-Eagle chain constraint
that S5/S6/S8 establish from the maker. **No rule below rests on either.**

**Repo evidence** (this worktree, `origin/main` @ `489e732`): `src/compat-road.js`,
`src/compat.js`, `src/schema.js`, `src/schema-gravel.js`, `src/schema-road.js`,
`data/gravel.js`, plus `git log -S` archaeology and a live `checkBuild` probe (§2.1).

---

# §1. QUESTION 1 — Gravel mullet drivetrains

> How should the gravel engine model cross-ecosystem builds where a drop-bar SRAM control
> drives an MTB Eagle rear derailleur?

## 1.1 What SRAM actually documents

SRAM does not document *one* mullet. It documents **four distinct configurations**, and they
differ in ways the model has to respect:

| # | Config | Control | Rear derailleur | Cassette | Chain | Frame req. | Source |
|---|--------|---------|-----------------|----------|-------|-----------|--------|
| M1 | **Eagle AXS mullet** | any AXS road/XPLR lever | Eagle AXS (X01/XX1/GX/X1 AXS) | Eagle 10-50 / 10-52 (XD) | **Eagle** | std hanger | S1, S2 |
| M2 | **Transmission mullet** ("Adventure build") | any AXS road lever | Eagle **Transmission** (T-Type, full-mount) | T-Type | **T-Type** | **UDH** | S3, S6 |
| M3 | **Mechanical mullet** | Apex **mechanical** DoubleTap lever | Apex Eagle / any Eagle **mechanical** RD | Eagle 11-50 / 10-50 / 10-52 | **Eagle** | std hanger | S4, S7, S8 |
| M4 | **Reverse mullet** (flat-bar gravel) | Eagle AXS controller | XPLR AXS RD | XPLR (XDR / 11sp) | **Flattop** | std hanger | S2 |

Three facts run through all four and are the spine of any model:

1. **The chain follows the rear derailleur + cassette — never the shifter.** S6 states it
   verbatim; S5 gives the physical reason (Flattop is too narrow for Eagle tooth profiles);
   S11 note 1 repeats it as a compatibility-map rule.
2. **Mixing chains across the divide is an explicit "No", in both directions** (S5). This is
   the single highest false-*fits* risk in the whole question.
3. **The mechanical mullet is real and maker-blessed** (S4, S8). It works because the Apex
   mechanical lever shares **X-Actuation** cable pull with Eagle mechs — a *physical* pull-ratio
   fact, not a wireless-protocol one.

## 1.2 What the gravel engine does today

`checkRoadBuild` (`src/compat-road.js`, live on `gravel.html` since 2026-07-21) has:

- **R13** (`rg-drivetrain-system`, [compat-road.js:523](src/compat-road.js:523)) — one-system across
  {shifter, FD, RD, cassette}, with an **AXS-controller exemption** gated on
  `shifter.actuation === 'axs-wireless'` **and** `shifter.system ∈ ROAD_SRAM_AXS_SYSTEMS`
  (`['sram-axs-road','sram-xplr-12','sram-xplr-13']`, [compat-road.js:109](src/compat-road.js:109)).
  The exempted shifter also leaves the **speed** set.
- **R15** (`rg-chain-std`, [compat-road.js:585](src/compat-road.js:585)) — chain width standard vs
  system, via `ROAD_SYSTEM_CHAIN` ([compat-road.js:123](src/compat-road.js:123)), with reference
  order **`cassette || rd || shifter`**.
- **R5** (`rg-freehub`, [compat-road.js:390](src/compat-road.js:390)) — exact-match cassette-vs-wheel
  driver body, with two documented exceptions (Shimano HG-L2 dual fit; Campagnolo AC21-N3W adapter).
- **R20** (`rg-xplr-udh`, [compat-road.js:695](src/compat-road.js:695)) — `udh-fullmount` RDs, with
  honesty tiers (sourced-false → error; unknown → info; no frame → info).

**Today's state: there is no false verdict — there is no verdict at all.** `data/gravel.js`
carries **zero** Eagle rows: no Eagle `system` token exists in `ROAD_VOCAB.system` or
`GRAVEL_VOCAB.system`, and **no gravel wheel row carries an `xd` driver** (the freehub vocab is
`xdr`/`n3w`/`hg-road`/`micro-spline-road` only). A mullet build is simply **inexpressible**.

That is honest but not free. The cost is latent and lands the moment gravel complete-bike rows
arrive: a factory mullet bike cannot be filled — **the exact failure mode Q2 documents on the
Kona Honzo** (§2), where a real stock drivetrain was dropped for want of a token.

## 1.3 The load-bearing insight

**R15's existing reference order already implements SRAM's own rule.** `chainRef = cassette || rd
|| shifter` asks the cassette first, then the derailleur — which is precisely S6's *"the chain you
choose is determined by your rear derailleur and cassette."*

Consequence: **adding Eagle entries to `ROAD_SYSTEM_CHAIN` makes R15 correct for mullets with
zero logic change.** A build of {road AXS lever, Eagle AXS mech, Eagle cassette, Flattop chain}
would error against the *cassette's* Eagle requirement — which is exactly S5's "No". This is the
strongest argument that the modeling problem here is a **vocab** problem, not a **rules** problem.

## 1.4 Decision matrix

### Option A — New Eagle system tokens + extend the AXS-controller exemption

Add `sram-eagle-axs` (and `sram-eagle-transmission`) to the road/gravel `system` vocabs and to
`ROAD_SRAM_AXS_SYSTEMS`; add `ROAD_SYSTEM_CHAIN` entries mapping them to new chain standards
`eagle` / `t-type`.

| | |
|---|---|
| **Pros** | Smallest possible change — the exemption machinery already exists and is already sourced from the same SRAM family of articles. Covers M1, M2 and M4 (the reverse mullet needs no extra work: an Eagle AXS controller is already an exempt controller once its token joins the set). R15 becomes correct for free (§1.3). Mirrors the live MTB rule 3a byte for byte, so it is a pattern reviewers already know. |
| **Cons** | **Does not cover M3, the mechanical mullet** — the exemption is gated on `actuation === 'axs-wireless'`, so an Apex mechanical lever on an Apex Eagle mech stays a **false "won't fit"** (a SRAM-documented pairing, S4/S8, reddened). Adding a mechanical case later means touching R13 again. |
| **Blast radius** | **Rules:** R13 only (`ROAD_SRAM_AXS_SYSTEMS` array + tokens). R15 = data-only. **Vocab/schema:** `ROAD_VOCAB.system` + `.chainStd`; `GRAVEL_VOCAB.system`; `schema-road.js` `systemRoad`; `ROAD_VOCAB.freehub` + `GRAVEL_VOCAB.freehub` gain `xd`. **Tests:** `test-road-engine.js` (new mullet cases), `test-road-golden.js` (its freehub-token guard reads `ROAD_VOCAB.freehub` at [test-road-golden.js:68](test/test-road-golden.js:68) — `xd` must be added there or the guard fails), `test-schema-gravel.js`. **Catalog:** ~8–14 new gravel rows (2–3 Eagle AXS RDs, 2–3 Eagle cassettes, 1–2 Eagle chains, plus XD-driver rear wheels). |
| **False-verdict risk** | **False "fits": LOW** provided the chain tokens land with the RD/cassette tokens in the same commit — R15 then blocks the Flattop-on-Eagle case S5 forbids. **If the system tokens ship without the `ROAD_SYSTEM_CHAIN` entries, R15 goes silent** (`wantStd` undefined ⇒ no check) and every Flattop-on-Eagle build turns green. That is the one way this option produces the exact failure S5 warns about, and it is the same silent-dormancy trap already live for `shimano-grx-10` (§1.7-b). **False "won't fit": CERTAIN for M3.** |

### Option B — Option A **plus** an explicit pull-ratio field for the mechanical mullet ★

Everything in A, then model M3 the way SRAM actually explains it: add an **optional, sourced**
`pullRatio` field (e.g. `'x-actuation'`) to shifter and rear-derailleur rows. R13's exemption
becomes: *a shifter leaves the one-system set when it is an exempt AXS controller **or** when it
and the RD declare the same `pullRatio`.*

| | |
|---|---|
| **Pros** | Covers all four documented configurations. Models the **physical** reason rather than a brand list, so it generalises honestly (a future SRAM mechanical lever sharing X-Actuation needs data, not code). Dormant-until-sourced by construction — the live MTB rule-18 template: the field is absent on every existing row, so **nothing changes until a row declares it**. Keeps the "never infer from a stock part" discipline: absence means unknown, not compatible. |
| **Cons** | Larger surface: a new field on two categories across two schemas plus `types.js`. `pullRatio` is a genuinely new concept in this codebase (the MTB engine never needed it — Eagle-to-Eagle is same-system by definition). Needs a per-row source; the Apex Eagle RD page (S8) states `Shift Technology = X-Actuation` explicitly, but not every candidate row will. |
| **Blast radius** | Option A's, **plus**: R13's exemption predicate; `pullRatio` in `schema-road.js` + `schema-gravel.js` (optional, own vocab); `src/types.js`; new negative tests proving a *non*-declaring pair stays an honest error and that the field can never *create* a fit it does not have a source for. |
| **False-verdict risk** | **False "fits": LOW.** The field is opt-in and per-row sourced; an undeclared pair keeps today's one-system error. The residual risk is a **data** risk — mis-tagging a row's `pullRatio` — which the verification protocol already governs. **False "won't fit": LOW** (all four configs covered). |

### Option C — Explicit cross-system compatibility-pair table

No exemption logic at all. A `ROAD_CROSS_SYSTEM` table listing documented `{controllerSystem,
derailleurSystem}` pairs, each with its citation; R13 passes only pairs on the list.

| | |
|---|---|
| **Pros** | Maximum conservatism and the best possible audit trail — every green is one fetched SRAM article, named in the table, in the shape of the existing `ROAD_SYSTEM_CHAIN` and MTB adapter-fact tables. Nothing is inferred from a protocol name or a brand family. |
| **Cons** | Combinatorial maintenance: SRAM's "all AXS controllers work with all AXS derailleurs" (S1) is a *family-level* statement, and enumerating it as pairs re-encodes one sentence as N rows that drift as SRAM adds parts. Every new lever or mech is a code change, not a data change. It also **contradicts the live MTB rule 3a**, which deliberately chose the family exemption over enumeration for exactly this reason — two engines would then model the same SRAM statement two different ways. |
| **Blast radius** | Rules: R13 substantially rewritten. Tests: the existing exemption tests rewritten. Vocab/catalog: same as A. Ongoing: a table entry per SKU family, forever. |
| **False-verdict risk** | **False "fits": LOWEST.** **False "won't fit": MODERATE and growing** — any real pairing not yet enumerated reds out, and the list will always lag SRAM. |

### Option D — Deliberate exclusion, documented

Leave the gravel catalog drop-bar-only. Record the exclusion in `data/GRAVEL-MODEL.md` and add a
`[MECHANIC REVIEW]`-style note at R13 so the next reader knows it was a decision, not an oversight.

| | |
|---|---|
| **Pros** | Zero risk, zero work, zero new tokens. Honest: the catalog says nothing rather than something wrong. Matches how genuinely uncertain areas are already handled across all three engines. |
| **Cons** | Leaves a real and popular build class permanently unbuildable, and **guarantees a repeat of the Honzo failure** (§2) once gravel complete-bikes land: a factory mullet bike would need its whole drivetrain dropped, or the bike skipped. The gap is invisible to users — a mullet rider just finds no parts and no explanation. |
| **Blast radius** | Docs only. |
| **False-verdict risk** | **None either way** — by construction. The cost is coverage, not correctness. |

## 1.5 Recommendation — **Option B, staged**

1. **Stage 1 (small, self-contained):** Option A — Eagle tokens + `ROAD_SRAM_AXS_SYSTEMS` +
   `ROAD_SYSTEM_CHAIN` + `xd` freehub, landed **in one commit with the chain entries** so R15 is
   never silently dormant. Covers M1, M2, M4. Realistically a ~5-line engine diff plus vocab.
2. **Stage 2 (separate branch, separate review):** the `pullRatio` field for M3.

Rationale: Option A alone ships a **known** false "won't fit" against a SRAM-documented product
(S4/S8) — acceptable only as an explicitly-time-boxed intermediate, not as an end state. Option C
would fork this project's own answer to a question the MTB engine has already answered. Option D
is the right call **only if Douglas wants gravel frozen at road-parity** — worth asking, because
it is a legitimate scope decision, not a technical failure.

**Guardrails whichever way this goes:**
- **Never** add an Eagle `system` token without its `ROAD_SYSTEM_CHAIN` entry in the same commit.
- **Never** map an Eagle chain and a Flattop chain to one token (S5 is an explicit "No").
- `xd` must be a **new** token, never conflated with `xdr` — the MTB engine's rule 6c already
  documents these as different bodies needing a 1.85 mm spacer (S12), and `test-road-golden.js`
  will need `xd` added to its `ROAD_VOCAB.freehub` guard.
- M2 (Transmission mullet) requires **UDH** (S3). R20 already handles `udh-fullmount` RDs with
  honesty tiers — but **no gravel frame row carries a `udh` field** (0 of 66), so every such build
  gets the "not recorded in this catalog" INFO. Sourcing `udh` on gravel frames is a
  prerequisite for M2 being genuinely useful, and is its own data task.
- Do **not** model chainline (S3's "must use the wide version of the Road 12-speed crankset").
  It is a maker recommendation phrased as a quality qualifier, and the MTB engine already
  **rejected** a Boost/SuperBoost chainline rule for exactly this reason.

## 1.6 Catalog-row implications (all options that ship anything)

| Category | Rows needed | Notes |
|---|---|---|
| `rearderailleur` | 2–4 | Eagle AXS (M1), Eagle Transmission (M2), Apex Eagle mechanical (M3, `RD-APX-152-D1` — S8 is a clean maker page with a full spec table) |
| `cassette` | 2–3 | Eagle 10-50/10-52 → **XD**; Eagle 11-50 (PG-1210) → 11-speed HG driver (S7, S12). **The 11-50-on-HG case forces the road-HG vs MTB-HG question** — `src/schema.js:88` already warns "a road expansion must SPLIT, not conflate", and this is the first row that tests it in the other direction. |
| `chain` | 1–2 | Eagle 12sp; T-Type. Must carry the new chain-standard token, not `flattop`. |
| `rearwheel` | several | **No gravel wheel currently has an XD driver.** Without them, every Eagle 10-50/10-52 build is R5-blocked. |
| `shifter` | 0–1 | M1/M2/M4 reuse existing AXS levers. M3 needs an Apex mechanical lever row carrying `pullRatio` (Option B only). |
| `crankset` | 0 | Cranksets are outside R13's system and speed sets by design ([compat-road.js:526](src/compat-road.js:526)); road 1x cranks are explicitly approved for mullets (S2, S3). |

## 1.7 Pre-existing findings surfaced by this research (NOT part of Q1 — need their own call)

**(a) `sram-apex-mech-12` conflates two different chain standards.** The token maps to `flattop`
in `ROAD_SYSTEM_CHAIN` ([compat-road.js:127](src/compat-road.js:127)). That is correct for every
row using it today — all three `data/gravel.js` rows and the one `data/road.js` row are Apex
**XPLR** parts, and S10 confirms XPLR PG-1231 is "Compatible with Flattop chains". But the token
is *named* for the whole 12-speed mechanical Apex tier, and Apex **Eagle** is the other half of
that tier and takes an **Eagle** chain (S7, S8). **The moment an Apex Eagle row is entered under
this token, R15 demands a Flattop chain — a false "won't fit" against the Eagle chain SRAM
prescribes, and a false "fits" for the Flattop chain S5 forbids.** No bug exists today; it is a
tripwire under the next data-entry wave. Fix is cheap if taken before then: split into
`sram-apex-xplr-mech-12` / `sram-apex-eagle-mech-12`, or add an explicit "never use for Apex
Eagle" note at the token.

**(b) `ROAD_VOCAB` and `GRAVEL_VOCAB` have drifted, and R15 fails silent when they do.**
`GRAVEL_VOCAB.system` gained `shimano-grx-10` (gravel-depth-3, 2026-07-22) and four
`data/gravel.js` rows use it — but it is **not** in `ROAD_VOCAB.system` and **not** in
`ROAD_SYSTEM_CHAIN`, so R15's `wantStd` is `undefined` for those rows and **the chain-standard
check silently does nothing** for the entire GRX-10 tier. Same for `rearAxle`: `data/gravel.js`
carries `12x148` and `135x10-qr`, neither in `ROAD_VOCAB.rearAxle`. The cause is structural —
`ROAD_VOCAB` is documentation plus a **partial** test guard (`test-road-golden.js` pins only
`wheel` and `freehub`), while `GRAVEL_VOCAB` is the actual validator. Worth considering: extend
the golden test to pin `system` too, and add a lint asserting every `system` token has a
`ROAD_SYSTEM_CHAIN` entry. **This directly protects Q1** — it is the same silent-dormancy failure
mode flagged in Option A's risk row.

---

# §2. QUESTION 2 — Shimano 11-speed MTB tier

> The Honzo's stock Deore M5100 drivetrain has no system token in the MTB vocab.

## 2.1 The premise is stale — the work is already done

**`shimano-11` has been in `VOCAB.system` since 2026-07-07** (`ede27a3`, the Gate-5 vocab-widening
commit; [schema.js:233](src/schema.js:233)).

**The full Deore M5100 group has been in the live MTB catalog since 2026-07-16** (`d3e63ac`,
grind-4 salvage) and was promoted to **✓ Verified** on 2026-07-21 against Shimano's own
`productinfo.shimano.com` spec handbook:

| Row | id | Fields |
|---|---|---|
| Shifter | `sft-shimano-deore-m5100` | `system:'shimano-11'`, `speeds:11`, `actuation:'cable'`, `clampType:'band'` — verified |
| Rear derailleur | `dr-shimano-deore-m5100-sgs` | `system:'shimano-11'`, `speeds:11`, `maxCog:51`, `mount:'hanger'` — verified |
| Cassette | `ca-shimano-deore-m5100-1151` | `system:'shimano-11'`, `speeds:11`, `freehub:'HG'`, `minCog:11`, `maxCog:51` — verified |
| Chain | `ch-kmc-x11` | `system:'shimano-11'`, `speeds:11` — verified |

**Proof it builds clean.** Running the live `checkBuild` against the Honzo frame + its
stock-equivalent fork + the full M5100 group:

```
errors  : []
warnings: []
infos   : [ 'Headset: mounting the RockShox Recon RL 130 in Kona Honzo needs a headset …' ]
```

Zero errors, zero warnings — the only verdict is the standard rule-20c pick-a-headset advisory
that every frame+fork pair gets. Supporting parts are abundant: **125** HG rear wheels and **11**
11-speed cranksets in `PARTS` (and cranksets carry no `system` at all, so rule 3 never gates them).

**What is actually stale is one sentence of prose.** `fr-kona-honzo`'s `desc`
([compat.js:18055](src/compat.js:18055), written 2026-07-16) still reads:

> "…this catalog's system vocab does not yet cover 11-speed Shimano Deore, so no drivetrain fill
> is attempted; an honest gap, not a wrong mapping."

That was true the day it was written and stopped being true the same week. It appears to be the
source of this question.

## 2.2 The SRAM 11-speed half is also already done

`sram-11` went live **2026-07-10** (`645c2a9`) with 8 rows — NX 1x11 and GX 1x11 derailleurs, the
NX 11-speed trigger, PC-1110 chain, PG-1130 11-42 cassette, and three Garbaruk XD 11-speed
cassettes. **The door the question asks about is not just open — it has been walked through
twice.** For completeness, the live `VOCAB.system` is 16 tokens deep and already spans
8/9/10/11/12-speed across five brands.

## 2.3 What is genuinely still open

Only two small items, neither of which is a modeling decision:

| Item | Scope |
|---|---|
| **W1.** The obsolete `desc` sentence on `fr-kona-honzo` | One-line prose correction. Cosmetic, but it has now cost one design round; leaving it invites a third. |
| **W2.** No `cb-kona-honzo` complete-bike row | Only `cb-kona-honzo-esd` exists (GX Eagle 12sp). The base alloy Honzo is a real $1,299 bike whose whole stock group is now catalogued and verified. Filling it is ordinary complete-bike grind work — **no vocab, schema or engine change**. |

## 2.4 Decision matrix

### Option W — Cleanup only ★

| | |
|---|---|
| **Pros** | Matches reality. No engine, schema, vocab or test change. W2 is a normal catalog-grind item that fits an existing wave. |
| **Cons** | None identified. |
| **Blast radius** | W1: one `desc` string. W2: one `completebike` row using existing ids. **Rules: none. Tests: none. Vocab/schema: none.** |
| **Risk** | W2 must re-fetch `konaworld.com/products/honzo` for the current build sheet rather than trusting the 2026-07-16 `desc` — that prose is exactly what proved stale. |

### Option X — Add a new `shimano-11` token

**Not available.** The token exists and eight rows depend on it. Recorded only so the option is
visibly closed.

### Option Y — Model the stock build "another way"

**Rejected, and it must stay rejected.** The alternative considered at entry time was tagging the
M5100 group as `shimano-12`. That is precisely the false-"fits" generator THE BAR forbids: it
would greenlight an 11-speed Deore mech against a 12-speed cassette. The original author's
instinct to leave an honest gap was **correct**; the gap has simply since been filled properly.

### Option Z — Deliberate exclusion

**Moot.** Excluding an 11-speed tier that is live, verified and building clean would mean deleting
16 working rows across two brands.

## 2.5 Recommendation — **Option W**

No vocab work. Fix the one stale sentence (W1); route the Honzo complete-bike row (W2) into the
next complete-bike wave as ordinary grind, re-fetching the maker page rather than trusting the
old `desc`.

**Worth Douglas's attention beyond this ticket:** the failure mode here was not a missing token —
it was a **`desc` field that outlived its own truth and was later read as current state.** Descs
are narrative, timestamped only implicitly, and there are thousands of them. Two cheap mitigations
if he wants one: date-stamp any desc sentence asserting a *catalog-wide* limitation, or prefer
phrasing that describes the row ("no drivetrain fill on this row") over phrasing that describes
the catalog ("the vocab does not cover X"). This is a suggestion, not a proposal — it would need
its own scoping.

---

## §3. Gates

Docs-only branch; run for form.

| Gate | Result |
|---|---|
| `node validate.js` | see report |
| `npm test` | see report |
| `npx tsc --noEmit` | see report |

Recorded in `.claude/worker-reports/t2-drivetrain-design.md`.
