# `data/striders.js` — Fit Validation Pass

**Findings only. No catalog edits were made** (fitter-corpus Boundaries: this seat flags, it never
edits catalog rows or the engine). Run 2026-07-18 against
[`tools/fitter/kids-fit.md`](../tools/fitter/kids-fit.md) and
[`FIRST-BIKE-FINDER-SPEC.md`](FIRST-BIKE-FINDER-SPEC.md).

**Scope:** all **36** `cat:'balancebike'` rows. Each row's `seatMin`/`seatMax`/`bikeWeight` was
run against the fitter's own facts, plus a check for anthropometric plausibility and for blanks
that now matter because the finder makes them load-bearing.

## Headline

> **No row is anthropometrically impossible, and no row appears fabricated.** Every seat height
> sits in a physically sensible relationship to its wheel size and its stated age tier. Reported
> as a clean negative result rather than padded into a finding — the data-entry discipline on this
> file (blanks over guesses, sources named per row) held up under the fit lens.

**The problems are structural, not arithmetic:** the finder needs fields the schema cannot express
(inseam ranges, configuration tags), and one *category* of blank has become load-bearing now that
`seatMin` is a gate rather than a display field.

**14 findings — 3 blocking, 6 material, 5 minor.**

| Severity | Meaning |
|---|---|
| 🔴 **Blocking** | The finder cannot ship correct behaviour without resolving this |
| 🟠 **Material** | Produces misleading output if unaddressed |
| 🟡 **Minor** | Worth fixing; no wrong verdict results |

---

## 🔴 Blocking

### Finding 1 — 4 rows have no `seatMin`/`seatMax`; the gate cannot run on them
`sb-cannondale-kids-trail-balance`, `sb-coop-rev-12`, `sb-kubikes-12`, `sb-propain-bambam`.

All four are **correct entries** — each note explains the maker publishes no seat-height range and
records THE BAR (blank beats a guess). Nothing to fix in the rows. But **32/36 is the finder's real
coverage**, and per spec §3.3 these must surface as *"fit data not published"* — never silently
dropped (that biases results toward spec-publishing makers, an UNBIASED problem) and never
estimated from wheel size (**KID-1** forbids that inference explicitly).

### Finding 2 — `standover` is sourced on **0 of 36** rows
**KID-5**'s standover check has no data anywhere in the catalog. Spec §6 therefore lands the rule
**dormant** on the rule-18 template. Flagged because `STRIDER-MODEL.md` §5 lists `fit-standover` as
a planned rule without noting it currently cannot fire on a single row.

### Finding 3 — 2 rows publish a maker **inseam** range, and the schema cannot hold it
- `sb-coop-rev-12` — REI publishes a **12–17 in child-inseam** fit range.
- `sb-kubikes-12` — publishes a **12.4–15.7 in** recommended inseam range.

Both currently live in **prose `note` text**, invisible to any matcher. This is the sharpest data
finding in the pass: **inseam range is the most directly usable fit datum that exists** — it is
the maker answering **KID-2**'s question in KID-2's own units, with no `seatMin` inference needed.
Both rows are blank-gated by Finding 1 while *carrying the better datum in a comment.*

`src/schema-strider.js` has no `inseamMin`/`inseamMax`. **Flagged to the coordinator as a schema
proposal; not made here** (Boundaries). REI's own kids'-bike guidance is a **KID-1/KID-2** source,
so this is not a fringe convention.

---

## 🟠 Material

### Finding 4 — KID-3's "+2 in" as a hard gate fails **8 of 32** rows
`seatMax ≥ inseam + 2 in`, with implied inseam at the midpoint of KID-2's band:

| Row | Short by |
|---|---|
| `sb-earlyrider-bella-velio` | 46 mm (1.8 in) |
| `sb-schwinn-skip2` | 25 mm (1.0 in) |
| `sb-schwinn-elm` | 13 mm (0.5 in) |
| `sb-woom-1plus-go1plus` | 10 mm (0.4 in) |
| `sb-banwood-first-go`, `sb-chillafish-bmxie2`, `sb-moustache-mercredi-12` | 6 mm (0.2 in) |
| `sb-frog-tadpole-mini` | 5 mm (0.2 in) |

Two of these (`bella-velio`, `woom-1plus`) are **`verified:true` against maker spec tables** — so
this is not bad data, it is the threshold being demanding. Five fail by ≤0.5 in, inside the
measurement noise of spec §2.1's unresolved shoes-vs-barefoot question.

**Confirms spec §4.2: rank on growth room, never exclude on it** — the same shape as the
refinement `kids-fit.md` already recorded for KID-6.

### Finding 5 — the infant tier structurally cannot satisfy KID-3
`sb-earlyrider-bella-velio` (verified): `seatMin` 215 mm, `seatMax` 245 mm — a **30 mm (1.2 in)**
total range. For *any* child it fits, `seatMax` is below `inseam + 2 in`. It fails KID-3 by
construction, because an 8-in-wheel infant bike is a **short-life product by design**.

A growth-room ranking would place it last **every time**, for a design property rather than a
defect — punishing a whole legitimate segment. Spec §4.2 addresses it; noted separately because it
is a *fairness* failure mode, not an accuracy one, and would be easy to miss.

### Finding 6 — convertible seat ranges span a mode change, and no field marks it
`sb-strider-14x` (381–559), `sb-littlebig-3in1` (305–508), `sb-strider-20x-sport` (545–840) carry
`convertsToPedal:true`. `sb-wishbone-recycled-3in1` (229–508, the catalog's widest at 11 in) is a
**trike→balance** convertible and carries **no flag at all**.

The top of each range is reached only in a **different configuration** — for the pedal
convertibles, a configuration where **KID-2's feet-flat gate does not apply** (**KID-8/KID-9**).
Presenting the full span as balance-bike growth room credits a bike with longevity reachable only
by changing category. The schema cannot express which configuration a figure describes.
See spec §7.

### Finding 7 — 2 rows publish rider **height**, not inseam
`sb-cannondale-kids-trail-balance` (94–107 cm) and `sb-propain-bambam` (90–110 cm) use
`heightMin`/`heightMax`. **KID-1** is explicit that fit is set by inseam and that proxies fail;
converting height→inseam needs anthropometric data the corpus does not have (the same missing
growth data as spec §4.1). **Do not convert.** These stay in the "fit data not published" group
until an inseam or seat figure is sourced.

### Finding 8 — `sb-strider-20x-sport` is out of "first bike" scope
`seatMax` 840 mm (33.1 in), stated **ages 8–adult**, **25.8 lb**. For KID-6's 30% target it needs
an **≈86 lb** rider. It is correctly entered and genuinely a balance bike, but it is not a *first*
bike, and a finder that returned it for a toddler inseam would look broken. Recommend an explicit
scope bound (inseam ceiling or an age-tier tag) rather than special-casing the row.

### Finding 9 — `sb-chillafish-bmxie2` carries `brake:'none'` but has a real footbrake
The note is honest about it: the schema's `brake` vocab is hand/coaster only, so an integrated
**footbrake** had no representable value and the row records `'none'` rather than misrepresent it
as a hand brake. Correct entry under the constraint — but **braking is safety-relevant** to a
finder (**KID-8**: the brake is what replaces the foot at the pedal transition), and a
brake-filtering UI would report this bike as brakeless. Vocab gap; flagged to the coordinator.

---

## 🟡 Minor

### Finding 10 — `brakeReach` sourced on **1 of 36** rows
Only `sb-guardian-balance-bike` (`'short'`, SureStop sized for small hands). **Lever reach for
small hands is a genuine safety variable** — a child who cannot reach the lever cannot brake —
and `kids-fit.md` names it an explicit **L2 gap** (unwritten in the corpus, connecting to COC-12).
Both the *knowledge* and the *data* are missing; the finder cannot check it today.

### Finding 11 — identical seat specs across sibling trims
`sb-strider-12-classic` / `sb-strider-12-pro` (279–406) and `sb-retrospec-cub` /
`sb-retrospec-cub-plus` (292–381). Plausible — sibling trims routinely share a frame and post,
and the Retrospec note says so directly. Flagged only as a **low-confidence spot-check** candidate
if these rows are ever verified; aggregator tables do sometimes copy a figure across a lineup.

### Finding 12 — "range" is not a uniform concept across rows
`sb-strider-12-sport` shows `seatMax` 432 mm stock while its note records **~483 mm with the XL
post**; `sb-yedoo-tootoo` mentions an optional extended post to ~19.5 in; `sb-wishbone-*` reaches
its max only via a **frame flip**. So `seatMax − seatMin` mixes *stock*, *accessory-extended* and
*reconfigured* ranges. Since spec §4 makes range the headline longevity metric, the comparison is
not strictly like-for-like. Recommend the finder rank on **stock** range only and mention
accessory extension as prose.

### Finding 13 — 5 of 36 rows verified; uncertainty display is load-bearing
Verified: `sb-woom-1-go1`, `sb-woom-1plus-go1plus`, `sb-prevelo-alpha-zero`,
`sb-guardian-balance-bike`, `sb-earlyrider-bella-velio`. The other **31 are aggregator-sourced
unverified sample data** — expected and disclosed (maker pages are walled; Strider 403s), but it
means **86% of fit verdicts would rest on unverified numbers.** Spec §9.6 requires that be shown,
not buried. Note `sb-guardian-balance-bike` is **partially** verified — maker page confirms
weight/price/frame/brake, but its **seat heights are still aggregator-carried**, i.e. the verified
badge does not cover the fit-critical fields on that row.

### Finding 14 — two `wheel` values are approximations, disclosed in notes
`sb-puky-lr-m` records `wheel:'8'` for an actual **8.8 in** wheel (nearest vocab value);
`sb-kinderfeets-classic` infers `'12'` where the maker publishes none. Both are honestly noted and
**fit-irrelevant** (**KID-1**: wheel size does not decide fit; `STRIDER-MODEL.md` §4 marks it
display-only). Recorded only so nobody later "corrects" the finder using these as fit inputs.

---

## Summary for the coordinator

**Flagged, not changed** (Boundaries — this seat does not edit catalog, schema, or engine):

| # | Ask | Type |
|---|---|---|
| 3 | `inseamMin`/`inseamMax` fields — 2 rows already carry the data in prose | schema proposal |
| 6 | A configuration/mode tag so convertible seat ranges are unambiguous | schema proposal |
| 9 | `brake` vocab lacks a foot-operated value | vocab gap |
| 2, 10 | `standover` (0/36) and `brakeReach` (1/36) — targeted sourcing | data grind |
| 8 | An explicit scope bound for the finder's upper age tier | product decision |

**No ⚠ CONTRADICTION with a live engine rule or catalog assumption was found** — consistent with
`kids-fit.md`'s own cross-check result. The strider dataset is off-live design data, and nothing
here collides with `src/compat.js`.
