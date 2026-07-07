# DATA-ENTRY-TEMPLATE — how a part row gets into the catalog

This is the judgment layer for *creating* rows (the companion to
`VERIFY-PROTOCOL.md`, which governs *verifying* them). It exists so the model
ambiguities get decided ONCE, here — not per-row, hundreds of times,
inconsistently. **`src/schema.js` (SCHEMA/VOCAB) is the single source of truth
for which fields exist and which values are legal** — this file tells you how to
map the real market onto them. After every batch: `node validate.js` and
`npm test` must pass.

**The bar (from CLAUDE.md):** a wrong verdict is worse than a missing part.
Never invent a spec to satisfy a required field — if the real value doesn't fit
the vocab, STOP and widen the vocab in `schema.js` (one code change) instead of
shipping a fictitious part (the pre-2026-07 catalog contained two nonexistent
cranks created exactly that way).

---

## 1. What one row is — the flat-SKU model

**One row = one purchasable, fit-distinct configuration** (what PCPartPicker
ships at full scale). Not one "model": the Maxxis Assegai is 25 SKUs on one
page; a ZEB generation is up to 12 fit-distinct configs. Weight, price, and the
provenance trio differ per SKU, so the SKU is the row.

### Split policy — when does a config get its own row?

| Decision | When | Examples |
|---|---|---|
| **New ROW** | Any engine-read field differs (wheel, travel, eye×stroke, mount, diameter, drop, width, casing, compound, freehub, hub, rotor size…), OR price differs, OR the maker publishes a distinct weight | ZEB 29/170 vs 27.5/170; Vivid 230×65 vs 205×62.5; OneUp V3 31.6/210 vs 34.9/210; Assegai EXO+ MaxxGrip vs DoubleDown MaxxGrip |
| **New ROW** | Trim levels — they're how buyers shop | Ultimate vs Select+; Factory vs Performance; Code RSC vs Code Stealth |
| **FIELD only** | Fork `offset` (catalog the stock offset per travel×wheel; handling, not fit/price/weight) | ZEB 44 vs 51 offset |
| **NOTHING** | Color, suspension tune codes (RC2T/HBO, rebound/compression), coil spring rate, decals | — |
| **Sub-object, not rows** | Frame sizes — one price, same interfaces; per-size data goes in `frame.sizes` (`{ M: { seatTubeLen, maxInsert } }`) | RAAW publishes max insertion 220–294 mm across S–XXL |
| **Generations** | A spec-changing generation ⇒ **new rows with new ids**. NEVER mutate an existing row's specs — that silently rewrites the verdicts of every shared build | Megatower V1 = 230×57.5, V2 = 230×62.5: same name, different shocks |

## 2. The id recipe

```
<prefix>-<brand>-<model tokens>[-<gen>][-<variant tokens, fixed order>]
```

- **Charset:** lowercase `[a-z0-9]` tokens joined by `-` (validator-enforced).
- **Prefix** = the category's entry in `ID_PREFIX` (schema.js): fr fk sh fw rw
  ti sft dr ca ch cr bk ro hb st gr dp sa pd gs ws bs co.
- **Brand** = ONE token: lowercase, diacritics folded, punctuation dropped —
  `Öhlins → ohlins`, `e*thirteen → ethirteen`, `DT Swiss → dtswiss`
  (`brandSlug()` in schema.js; the lint warns on mismatch).
- **Model tokens** = the maker's model + trim name, one token per word,
  punctuation folded within a word (`Nine.One → nineone`, `RT-MT800 → rtmt800`,
  `S-Works → sworks`). Leave out the size/config designations — those are
  variant tokens.
- **Numbers in tokens:** drop the dot — width `2.5 → 25`, `2.35 → 235`,
  diameter `31.6 → 316`, clamp `31.8 → 318`, stroke `62.5 → 62p5` (the `p`
  avoids `625` ambiguity in eye×stroke).
- **Variant token order is FIXED per category:**

| Cat | Variant tokens (in order) | Example |
|---|---|---|
| fork | wheel, travel | `fk-rockshox-zeb-ultimate-29-170` |
| shock | eye×stroke, `trun` (trunnion only) | `sh-rockshox-super-deluxe-ultimate-205x60-trun` |
| wheel | wheel size, hub oddity (`157`), freehub when it splits a row (`xd`) | `rw-industrynine-enduro-s-29-157`, `rw-dtswiss-e-1900-275-xd` |
| tire | wheel, width, casing, compound | `ti-maxxis-assegai-29-25-exop-mg` (exop=EXO+, mg=MaxxGrip, mt=MaxxTerra, dd=DoubleDown) |
| rotor | size, mount (`6b`/`cl`) | `ro-sram-hs2-200-6b` |
| bar/stem | clamp (`35`/`318`) | `hb-renthal-fatbar-35` |
| dropper | diameter, drop | `dp-oneup-v3-316-210` |
| cassette | cog range when the code doesn't pin it (`1051`) | `ca-shimano-xt-m8100-1051` |
| derailleur | cage (`sgs`/`gs`) | `dr-shimano-xt-m8100-sgs` |

- **No bare-default ids.** Never mint `fk-zeb` and let "whichever config came
  first" own it forever — every id carries its variant tokens.
- **Ids are APPEND-ONLY.** Never rename, never reuse. A correction retires the
  old id into `ALIASES` (src/compat.js) pointing at the new one; share links and
  the verify-job state resolve through it. Renaming without an alias silently
  breaks share links (readHash drops unknown ids without error).

## 3. Common identity kit (every new row)

| Field | Rule |
|---|---|
| `family` | **Mandatory.** Generation-agnostic platform slug: brand slug + platform, trim/gen/variants dropped (`rockshox-zeb`, `maxxis-assegai`, `fox-float-x`, `oneup-dropper`). Shared across categories when the platform genuinely spans them (`sram-gx-eagle` on shifter/derailleur/chain/crank/kit). Omit only when the platform is unidentifiable (a no-name sample rotor) — never guess. |
| `gen` | Mandatory **when the source shows one** — maker's own code, free string (`B1`, `C2`, `V3.2`, `m.2`). |
| `modelYear` | When the page states it. Number. |
| `mfgPn` | Mandatory **when the source spec table shows one** (Maxxis Part #, SRAM model code like `RD-GX-E-B1` — it's the sram.com model-page slug, uppercased). On a 25-SKU page, "the Assegai" is not a verifiable claim; "Part # ETB000123" is. Also the join key for the future drift-checker. |
| `price` | **Manufacturer US MSRP in USD** (see §5.1-12 — semantics pinned; street/converted prices don't go in this field). |

## 4. Manufacturer wording → vocab mapping

The traps that produce wrong rows if mapped naively:

| The page says | Enter | NOT |
|---|---|---|
| "T-Type cable actuation" / Eagle 90/70 Transmission | `system:'sram-transmission'` + `actuation:'cable'` + `mount:'udh-direct'` | `sram-eagle` (different pull ratio — false green) |
| "AXS" trigger/pod on Eagle (non-T-Type) | `system:'sram-eagle'` + `actuation:'electronic'` | a new system value |
| "Super Boost" / "DH 157" hub | `SuperBoost157` | a new `157DH` value (refuted — one fitment standard) |
| Maxxis "EXO+", "3C MaxxGrip" | `casing:'exo-plus'`, `compound:'3c-maxxgrip'` (brand-native values) | a cross-brand toughness tier |
| Continental Kryptotal tiers | casing+compound come COUPLED (Trail=Endurance, Enduro=Soft, DH=SuperSoft) — enumerate the brand's values in VOCAB before its batch | mixing freely |
| "24mm steel spindle" / Hollowtech II / Cinch steel | `bb:'24mm'` (spindle interface) | `DUB` or a brand name |
| "30mm spindle" (eeWings, Cinch alu, Hope) | `bb:'30mm'` | `DUB` (28.99 mm ≠ 30 mm) |
| "rings sold separately" / armset-only crank | omit `ring`, set `ringStd:null` | fabricating a ring standard (made a live false red) |
| "56/56 Zero stack" headset | `headset:'tapered'` still (steerer-fit field) | repurposing `headset` for SHIS |
| Trunnion sizes (185/205/225×…) | `mount:'trunnion'` | guessing from eye number |

When a REAL part needs a value the vocab lacks (a steel crank spindle, a
LinkGlide cassette): **stop the batch, add the vocab value in schema.js +
types.js with a test, then continue.** A missing value blocks entry; an invented
mapping ships a false verdict.

## 5. Weight conventions (verified weights must be comparable)

- **Coil shocks:** weight = damper **without** spring. RockShox quotes the
  Super Deluxe Coil *with* a 350 lb spring — convert/flag it; EXT quotes Storia
  V4 without ("Spring Sold Separately"). Note the basis in `desc`.
- **AXS/electronic parts:** without battery (SRAM's own convention — RD-GX-E-B1
  lists 470 g "without Battery").
- **Brakes:** the maker's per-brake figure, config noted in `desc` (prefer the
  rear-brake figure: "362 g rear, organic pads, no rotor").
- **Tires:** per-SKU published weight only (the whole point of the casing/
  compound axes).
- **Pedals/grips:** per pair. **Wheels:** per wheel (kit weights are always
  derived from the fills — never stored).
- Record what the quoted figure excludes in `soldWithout`
  (`battery`/`charger`/`spring`/`rotor`/`mounting-hardware`) and note the
  quoted config in `desc`.

## 6. Capture opportunistically (the page-visit asymmetry)

The expensive unit at scale is the **manufacturer-page visit**, not the schema
edit. While you're on the page anyway, capture what it publishes into fields
that exist; DATA-MODEL-REVIEW §5.2 lists the rest (they land through Phase
0.5 — check SCHEMA before writing them):

- **frame:** `maxTire` (rule 18 activates per frame), `sizes` (seatTubeLen /
  maxInsert per size), `bundledShock`
- **fork:** `minRotorF` (native mount minimum)
- **tire:** `casing` + `compound` (mandatory for new tire rows)
- **everything:** `family`/`gen`/`mfgPn`, provenance trio when verifying

## 7. Provenance quick reference

- `verified:true` requires `source` (real URL) + `lastChecked` (not future) —
  validator-enforced.
- **Only a FETCHED manufacturer page counts for interfaces. Search-result
  summaries lie** — they've been wrong about shock sizes, seatpost diameters
  and rotor maxes in this very catalog.
- **Measured-weight policy (decided 2026-07):** a reputable third-party
  measured weight is accepted **for the weight only** — set
  `sourceType:'measured'` + `weightSource` URL (validator-enforced).
  Interfaces stay manufacturer-sourced; `sourceType:'retailer'` is rejected on
  verified rows. Full rules in VERIFY-PROTOCOL.md.
- Capture `status` (`discontinued`/`recalled`) and `supersededBy` while on the
  page; `archiveUrl` a Wayback snapshot for load-bearing sources.
- New parts enter as **unverified sample data** unless verified in the same
  sitting; they join the verify-job queue automatically (`npm run verify:status`).
