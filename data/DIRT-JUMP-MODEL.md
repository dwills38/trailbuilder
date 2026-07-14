# Dirt Jump (DJ) hardtail — data model

Status: **LIVE since 2026-07-14** (Douglas's DJ go-live word). The companion dataset
(`data/dirt-jump.js` v0.2) was folded verbatim into the live catalog — `PARTS` in
`src/compat.js`, "DIRT JUMP (DJ)" section — and the file retired (the live catalog has
one home, and deploy ships only `index.html` + `src/`). The `cog` + `seatpost` build
slots joined `GROUPS`, and the `dj` discipline chip joined the UI. This doc remains the
research record. Written 2026-07-11.

> **2026-07-13 update — architecture DECIDED + implemented.** Douglas confirmed this doc's
> "adapt the existing engine" recommendation (open question 3) and picked the
> **`driveMode:'single-speed'`** mechanical flag as the discriminator; brakeless/rear-only
> is a confirmed valid COMPLETE build. The live schema gained the DJ deltas (26/24 wheels,
> 15x100 + 10x135-bolt axles, freehub `'single-speed'`, chainWidth/dropoutType/driveMode,
> `cog` + `seatpost` categories) with two dormant engine rules (`ss-chain-width` warning,
> `ss-tension` info), and `data/dirt-jump.js` v0.2 was reshaped to the live schema
> (canonical ids, live-duplicate rows dropped) so go-live is a data flip. The proposed
> DJ_SLOTS list below is superseded: DJ uses the live GROUPS + `slotRequired()` drops.
> See `data/DJ-BMX-COMPAT-ANALYSIS.md` §5 (decisions) + §6 (implementation record) and
> `test/test-dj-singlespeed.js`.

## Scope

DJ hardtails: no-suspension-in-the-rear, usually single-speed, built for jump lines/pump
tracks/slopestyle-adjacent riding. Predominantly 26" wheels; a growing 27.5" contingent; a
few 24" kids/park bikes exist but are out of scope for this pass (same "kids' bikes built
off-live separately" bucket as balance bikes). **No e-bikes** — excluded absolutely, same
as the live MTB rule.

DJ sits **much closer to the existing MTB engine than to BMX**: it has a real suspension
fork, a headset, cassette-style hubs are optional but disc brakes/rotors/tire-clearance are
identical concepts to MTB. The single-speed drivetrain is the one genuinely new domain.

## Per-dimension model: real check vs display-only

### Frame (`dj-frame`)
| Field | Vocab / type | Real compat check? |
|---|---|---|
| `wheel` | `'26'` \| `'275'` | **Yes** — vs front/rear wheel `wheel` field (same rule-1 concept as MTB `wheelConfigs`, just single-size since DJ doesn't run mullet in practice — confirmed no maker publishes a DJ mullet frame) |
| `rearAxle` | `'10x135-bolt'`, `'9x135-qr'`, `'10x135-qr'`, `'12x142'`, `'12x148'` | **Yes** — vs rear wheel axle (same as MTB rule 2b) |
| `dropoutType` | `'horizontal-sliding'` \| `'vertical-hanger'` | **Concept, not yet a hard rule** — see open question below. Horizontal/sliding dropouts let a single-speed chain be tensioned by sliding the wheel; a vertical/derailleur-hanger dropout needs a chain tensioner (or half-link chain) to run single-speed cleanly. Modeled as an *info*, not an error — riders do run tensioners on vertical dropouts routinely, so it's a nudge not a fit failure. |
| `bb` | `'BSA73'`, `'PF30'`, `'BB92'` | **Yes** — vs crank/BB spindle interface, same as MTB `bb` cross-rule. BSA73 threaded is the strong majority (confirmed on Jackal, Shonky, Kona, P.3-2023+); PF30 appears on some older Specialized P.3 model years (pre-2023) — kept as a real historical vocab value, not invented. |
| `headTube` | `'tapered'` \| `'straight-1.125'` | **Yes** — vs fork `steerer` (identical to MTB rule 11) and vs headset `steerer`/bore. Confirmed: Jackal ships mixed-tapered (ZS44/28.6 EC49/40); Shonky/most modern DJ frames are internal tapered; some budget/BMX-adjacent frames still ship straight 1-1/8". |
| `seatTube` | number (mm dia, e.g. 27.2/30.9/31.6) | **Display-only for now** — DJ riders run slammed rigid posts almost universally (dropper is rare/atypical on a DJ hardtail), so a diameter mismatch is a real fit fact but a low-value rule to build first; flagged as future work, same shape as the MTB dropper-diameter rule if droppers get added later. |
| `brakeMount` | `'PM'` \| `'IS'` (rear) | **Yes** — vs rear caliper mount, identical to MTB. Many DJ bikes run **rear brake only, no front** — modeled by making `frontBrake`/`frontRotor` optional build slots (never required), not a special DJ-only field. |
| `maxRotorR` | number (mm) | **Yes** — vs rear rotor size, identical to MTB rule 9/10. |
| `singleSpeedOnly` | bool | **Display-only / informational.** Some DJ frames (Kona Shonky, most pure-DJ steel frames) are effectively single-speed-first with sliding dropouts; others (Jackal, P.3) explicitly support derailleur/geared builds too. Not a hard gate — riders do both — but useful metadata for a future "single-speed" filter. |

### Fork (`dj-fork`)
| Field | Vocab / type | Real check? |
|---|---|---|
| `wheel` | `'26'` \| `'275'` | **Yes** — vs frame `wheel`. |
| `travel` | number (mm), typically 80–140; some rigid (0) | **Display-only today** (no per-frame max/min-travel data sourced yet for any DJ frame — none of the makers researched publish a rated fork-travel range the way MTB frames do). Flagged: could mirror MTB rule 12 once a frame publishes a max. |
| `axle` | `'15x100'`, `'20x110'`, `'10mm-bolt'`, `'9mm-qr'` | **Yes** — vs front wheel axle, identical concept to MTB rule 2a. Confirmed spread: RockShox Pike DJ = 15x100; Marzocchi Bomber DJ = 20x110 (non-boost) *or* 15x100 depending on build; Manitou Circus = 20mm thru-axle; DVO Sapphire (trail fork sometimes DJ'd) = 15x100 Boost. |
| `steerer` | `'tapered'` \| `'straight-1.125'` | **Yes** — vs frame `headTube` and vs headset, identical to MTB rule 11. Confirmed both exist: Pike DJ / Bomber DJ / Circus Expert are all offered in tapered; Circus Expert is *also* offered in straight 1-1/8" (dual SKU) — a real, sourced split, not invented. |
| `brakeMount` | `'PM'` | **Yes** — vs front caliper, identical to MTB. |
| `maxRotorF` | number (mm) | **Yes** — vs front rotor. Confirmed Pike DJ: 160mm min / 220mm max. |

### Headset (`dj-headset`)
Same shape as the live MTB `headset` category (added there 2026-07-10 — this reuses that
template, not a new invention): `upper`/`lower` S.H.I.S. codes + `steerer`. **Real check**:
steerer type vs fork ACTIVE (rule-11 semantics) and bore vs frame head tube (rule-20b
semantics), both dormant until a DJ frame source publishes S.H.I.S. codes beyond the
Jackal's confirmed ZS44/28.6 EC49/40.

### Drivetrain — single-speed (new domain, the one real departure from MTB)
This is genuinely different from the live engine's multi-speed drivetrain rules (system/
speeds/actuation) — DJ is single-speed by convention, so those rules don't apply. Proposed
fields:

| Field | Vocab / type | Real check? |
|---|---|---|
| `dj-crank.spindle` | `'BMX-19mm'`, `'ISIS'`, `'24mm'`, `'DUB'` | **Yes** — vs `dj-bb.spindle`, same shape as MTB crank-vs-BB. Confirmed: Profile Racing (the dominant DJ crank brand) ships 3-piece cranks around splined spindles (19mm on true-BMX product, with 24mm/ISIS/external-BB options common on MTB-adjacent DJ cranks); exact current Profile spindle-width SKU matrix was **not confirmed by a fetched page** in this pass (Profile's site did not surface a clean current spec table via search) — that crank row ships **unverified/sample**, flagged for a follow-up fetch of profileracing.com product pages. |
| `dj-bb.shell` / `dj-bb.spindle` | same vocab as frame `bb` / crank `spindle` | **Yes** — real cross-check, same shape as MTB rule 7. |
| `dj-cog.teeth`, `dj-cog.chainWidth` | number; `'1/8'` \| `'3/32'` | **Yes (concept)** — cog chain-width must match chain width. Modeled as a real rule once both parts carry the field (same "land dormant, activate per confirmed data" pattern as MTB rule 18). |
| `dj-chain.width` | `'1/8'` \| `'3/32'`; `halfLink` bool | **Yes** — vs `dj-cog.chainWidth` and vs crank ring width. 1/8" is the DJ/BMX-derived standard (stronger, wider chain/cog/ring stack); 3/32" (derailleur-chain width) appears on DJ builds that reuse road/MTB derailleur parts. Real, sourced distinction — not invented. |
| `dj-rearwheel.singleSpeed` | bool | **Display/config only** — whether the rear hub is a dedicated single-speed hub (cog threads directly, or a driver + spacer kit on a standard cassette-body hub). Doesn't block anything; informs which cog-mounting story applies. |

### Wheels (`dj-frontwheel` / `dj-rearwheel`)
Same shape as MTB `frontwheel`/`rearwheel`: `wheel`, `hub` (axle), `rotorMount`, `intWidth`,
`maxTire`. **Real checks**: wheel size vs frame/fork (yes), axle vs frame/fork axle (yes),
rotor mount vs caliper (yes) — all direct ports of live MTB rules 1/2/9.

### Tires (`dj-tire`)
`wheel`, `width` (typically 2.1–2.4", DJ tires skew narrower/harder-compound than trail
tires), `compound` (`'slick'`/`'semi-slick'`/`'knobby'` — DJ-specific vocab, not an MTB
value). **Real checks**: wheel-diameter match (yes, hard rule) and width-vs-rim/frame
clearance (yes, same shape as MTB rules 13/18 — dormant until a DJ frame/wheel publishes a
max/min).

### Cockpit / brakes / other
`dj-handlebar`/`dj-stem` (`clamp`, same MTB vocab — real check, direct port), `dj-brake`/
`dj-rotor` (`mount`, `pistons`, `size` — real checks, direct port; **rear-only builds are
normal**, so `frontBrake` is an optional slot, not a required one), `dj-grips`, `dj-seatpost`
(no dropper modeled — DJ posts are rigid, slammed; a diameter-vs-seat-tube check is the same
shape as MTB's dropper rule but with no direction-awareness need since nobody's sizing for
insertion depth on a slammed post), `dj-saddle`, `dj-pedals` (`style`: DJ skews heavily flat-
pedal; clip pedals exist but are a minority — both kept in vocab, no rule since 9/16" thread
fits both crank arms universally, identical to the MTB rule).

## Proposed slot list (`DJ_SLOTS`)

```
frame, fork, headset, frontWheel, rearWheel, frontTire, rearTire,
crankset, bb, cog, chain, frontBrake, rearBrake, frontRotor, rearRotor,
handlebar, stem, grips, seatpost, saddle, pedals
```

Differences from the live MTB slot list: no `shock` (hardtail-only category, no full-sus DJ
exists), no `shifter`/`derailleur`/`cassette` (single-speed — replaced by `cog`/`chain`), no
`dropper` (rigid `seatpost` instead). `frontBrake`/`frontRotor` should be **optional** slots
(many real builds ship rear-brake-only) the same way the live engine already makes the
cassette slot optional for integrated-cassette wheels (`slotRequired` exemption pattern).

## Strong overlap with the live MTB engine (reuse candidates)

Wheel-size match, axle match (front+rear), steerer-vs-headtube-vs-headset, rotor-size-vs-max,
rotor-mount-vs-hub, tire-diameter-match, tire-width-vs-clearance, bar/stem clamp, BB-vs-crank
spindle — **all nine are conceptually identical to existing live rules**, just re-scoped to a
DJ-specific vocab (different axle/travel/BB values, no shock/mullet/multi-speed concepts).

## Recommendation: adapt the existing engine, don't build a new one

**Adapt, don't rebuild.** The overlap above is ~9 of DJ's ~12 real compat dimensions — building
a second `checkBuild`-equivalent from scratch would duplicate logic that's already tested and
correct for the shared dimensions (wheel/axle/steerer/rotor/tire/clamp/BB), and would double
the maintenance surface for zero benefit. The only genuinely new logic is the single-speed
drivetrain (cog-vs-chain width, crank-vs-BB spindle — itself a near-exact port of the existing
crank-vs-BB rule) and the soft dropout/tensioner nudge. When Douglas is ready to wire this in:
extend `SLOTS`/`GROUPS`/`SCHEMA`/`VOCAB` with a `bikeType` discriminator (or a parallel
`DJ_SCHEMA` reusing the same rule *functions* parametrized by vocab) rather than forking
`compat.js` wholesale. This file and `dirt-jump.js` are deliberately shaped so that lift is a
refactor, not a rewrite: field names mirror the MTB fields 1:1 wherever the concept is shared.

## Open product-design questions for Douglas

1. **Single-speed drivetrain modeling** — is `cog`+`chain` (width match) sufficient, or do you
   want a richer "gear-inches" display (front ring teeth ÷ rear cog teeth × wheel diameter),
   common in the DJ/BMX world for comparing gearing across builds?
2. **Dropout type as a compat concept** — should `horizontal-sliding` vs `vertical-hanger` stay
   a soft info (current proposal), or should picking a vertical-dropout frame + no derailleur
   hard-require a `chainTensioner` accessory pick? (Real riders often just use a half-link
   chain instead — three valid solutions to the same problem, which argues for info-level,
   not error-level.)
3. **New engine vs adapted engine** — recommendation above is "adapt"; confirm before any
   real wiring work starts, since it changes whether `SLOTS`/`SCHEMA` grow a `bikeType` axis
   or a fully parallel DJ module gets built.
4. **Rear-brake-only as the default assumption** — confirm `frontBrake`/`frontRotor` should be
   optional slots (proposal above) rather than modeling "brake count" as its own frame field.
5. **27.5" DJ coverage** — the market is still 26"-dominant (every fork/frame sourced this pass
   is 26"); worth flagging that 27.5" DJ frames/forks exist (e.g. some Deity, Fairdale) but
   weren't included in this starter pass — low yield, would need a dedicated follow-up.
6. **Profile Racing crank spindle matrix** — flagged above as unverified/sample; a follow-up
   fetch of profileracing.com's current MTB-crank product pages would let that row (and its
   BB pairing) go from sample to sourced.
