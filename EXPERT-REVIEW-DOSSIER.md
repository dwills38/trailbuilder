# TrailBuilder — Expert Review Dossier

**For:** a mechanic / suspension tech / bike-industry engineer reviewing the compatibility engine.
**Prepared:** 2026-07-07 · engine state: 19 rule areas + sub-checks, 198 tests, 330 catalog parts (74 verified).
**Time to review:** ~2–3 hours with this document; no code reading required.

## Why you're being asked

TrailBuilder tells people whether bike parts fit together. Its tests prove the engine is
*self-consistent* — they cannot prove the rules are *right about the real world*. That is
what you're for. Every rule below was built from manufacturer documentation, but manufacturer
docs are incomplete, shop practice diverges from them, and we are not mechanics.

**The bar the tool lives by: a wrong verdict is worse than a missing rule** — in both
directions. A false "won't fit" steers someone away from a working build; a false "fits"
sells someone a part that doesn't mount. When in doubt the engine stays silent, and silence
is disclosed ("No conflicts found", never "All compatible").

## What we want from you, per rule

1. **Is the claim true** as stated, in your shop experience — not just per the docs?
2. **Is the tier right?** Error = won't fit, period. Warning = fits/works but check
   something first. Info = FYI. (Warnings show as a yellow dot before a part is added.)
3. **Is the direction right?** Several rules fire only one way on purpose — those are the
   likeliest places we've encoded a subtle wrong belief.
4. **What common misfit did we not check at all?** The gaps list at the end is what we know
   we're missing; the dangerous gaps are the ones we don't.

Mark each rule ✓ (correct), ✗ (wrong — say why), or ~ (right idea, wrong tier/wording/scope).

---

## Rule-by-rule

### 1. Wheel size configuration
**Claims:** front parts (fork/wheel/tire) must agree on size; rear parts likewise; the
front/rear combo must be one the frame supports: 29/29, 27.5/27.5, or mullet (29 F / 27.5 R).
With no frame picked, a pair matching no configuration (e.g. 27.5 F / 29 R) is rejected.
**Tier:** error. **Basis:** frame makers' published wheel-size options per model.
**Ask:** is hard-rejecting reverse-mullet correct, or does some niche legitimately run it?
**Review verdict (2026-07-10): ✓ CONFIRMED correct — no change.** Verdict received via
Douglas. Agrees with the pre-research pass (`DOSSIER-OPEN-QUESTIONS-RESEARCH.md` §1: no maker
publishes or rates a 27.5 F / 29 R configuration; the red follows from the data model). The
hard-reject stands as-is.

### 2. Axles
**Claims:** fork axle must match front hub (everything current is Boost 15×110); frame rear
spacing must match rear hub (Boost 148 vs SuperBoost 157 mismatch = error).
**Tier:** error. **Note:** the front check can't currently fire (every catalog part is
Boost 110) — it's pinned by synthetic tests for the day the vocabulary widens.
**Ask:** SuperBoost frame + Boost rear wheel = error with no adapter path — correct?
**Review verdict (2026-07-10): ✓ CONFIRMED — the error tier stands, no change.** Verdict
received via Douglas with the adapter-kit evidence in hand: the pre-research pass surfaced
(and the coordinator live-verified) the Problem Solvers Super Booster kit — "adapts a 148 x
12mm rear hub to a 157 x 12mm spaced frame (Boost to SuperBoost)", "Requires re-dishing the
rear wheel 4.5mm to the non-drive side". A 4.5 mm re-dish is wheel-building work, not a
bolt-on adapter, so the red is kept rather than softened to a fix-carrying warning. The Ask's
"no adapter path" wording is superseded: a purchasable path EXISTS; it is deliberately not
treated as adapter-tier. (Optional future nicety, not required by this verdict: name the kit
in the error message.)

### 3. Drivetrain family — three checks
- **3a. One system, one speed count** across shifter/derailleur/cassette/chain
  (SRAM Eagle / SRAM Transmission / Shimano 12 are mutually incompatible). Error.
- **3b. Actuation:** a cable trigger cannot drive an AXS (wireless) derailleur and vice
  versa, even within the same "system" — Eagle cassettes/chains are genuinely shared
  between mechanical and AXS, so the check is a separate field, not a system split. Error.
- **3c. Chainring standard, one-directional:** a Transmission Flattop chain on a
  non-T-Type chainring is an error (SRAM documents unique link shape/pin/rollers —
  support.sram.com, corroborated by Wolf Tooth and e*thirteen). The REVERSE stays silent
  on purpose: SRAM documents T-Type rings as backward-compatible with Eagle chains.
  Cranks sold without rings (eeWings, Race Face armsets) get an info, not an error.
**Ask:** is 3c's one-directionality right? Any real-world T-Type ring + Eagle chain problems?
**Review verdict (2026-07-10): ✓ CONFIRMED (3a/3b/3c) — with one scope finding spun out of
the reviewer's SRAM citation.** Verdict received via Douglas, who supplied SRAM's own support
text (support.sram.com article 13820865674011 "Can I mix SRAM Eagle AXS Transmission
components with Eagle Drivetrain components", browser-read; the host is fetch-walled to
tooling): *"Eagle Transmission T-Type chainrings are compatible with Eagle chains... However,
Non-T-Type Eagle Drivetrain chainrings are incompatible with Eagle Transmission T-Type
chains"* — direct SRAM confirmation of 3c's one-directionality, strengthening the cited
basis. **The same article's second exception — "All AXS controllers will work with all AXS
derailleurs... the new Eagle Transmission Pod Controllers with Eagle AXS Drivetrain, or the
Eagle Drivetrain controller with Eagle Transmission" (corroborated by article 13820000105371)
— exposed a 3a FALSE RED:** the one-system check red-flagged Pod + Eagle-AXS-mech (and the
reverse), both SRAM-documented as working; reproduced against the live catalog 2026-07-10.
Fix applied as its own finding/commit: electronic SRAM (AXS-family) shifters are exempt from
the one-system set (their real constraint is 3b actuation); mech/cassette/chain still one
system; the exemption does NOT cross to non-SRAM systems.

### 4. SRAM Transmission needs UDH
**Claims:** a direct-mount (UDH) Transmission derailleur on a non-UDH frame = error; with no
frame picked it's a heads-up info, not a red.
**Tier:** error / info. **Basis:** SRAM's UDH requirement; per-frame UDH status web-sourced
for all 21 frames (e.g. the stock RAAW Madonna V2.2 is NOT UDH — RAAW sells a retrofit kit,
so the bare frame correctly rejects it).
**Ask:** any edge cases (aftermarket hangers, frames converted)?
**Review verdict (2026-07-10): ~ RIGHT with a tier refinement** — "if a retrofit kit such as
the RAAW is available, offer an info note or something, don't outright reject; otherwise this
is correct" (Douglas). Resolution: frames with a **maker-documented UDH retrofit kit** get a
WARNING carrying the structured `fix` (the rule-9 adapter tier) instead of the error; frames
without a kit stay a hard error; the frameless info is unchanged. Sourced activation: RAAW's
UDH Retrofit Kit product page (fetched 2026-07-10,
raawmtb.com/en-us/products/udh-retrofit-kit): "we're now offering a UDH retrofit kit to give
your existing Jibb V1, Madonna V2, or Madonna V2.2 compatibility" ($216 — drive-side seatstay
+ UDH hanger + 174 mm X12 axle + dropout insert) → activates on `fr-raaw-madonna-v22` and
`fr-raaw-jibb` (gen V1). Fix landed via branch `dossier-rule4-udh-retrofit`.

### 5. Cassette range vs derailleur capacity — deliberately one-sided
**Claims:** cassette maxCog > derailleur max = error (10-52 cassette on a 50T-max mech).
A 52T-capable derailleur with a 10-50 cassette is **silent on purpose** — an auditor
proposed erroring it and verification found SRAM documents the opposite (520% derailleurs
are backward-compatible with 10-50). The refutation is recorded so it never gets "fixed" in.
**Ask:** confirm the one-sidedness; any b-screw/setup caveat worth a warning?
**Review verdict (2026-07-10): ✓ CONFIRMED — no change.** One-sidedness stands; no b-screw
warning requested (setup guidance stays out of verdicts). Verdict received via Douglas.

### 6. Cassette freehub vs rear wheel
**Claims:** exact-match required (XD / MicroSpline / HG). Known modeling limitation:
freehub bodies are actually SWAPPABLE on most platforms, but the engine treats them as
fixed per wheel row; we mitigate by cataloging the maker's offered configs as separate rows
(e.g. the DT E 1900 27.5 exists in both MicroSpline and XD rows).
**Tier:** error. **Ask:** is "needs the XD version of this wheel" (separate row) honest
enough, or should the error message mention body swaps explicitly?
**Review verdict (2026-07-10): ✓ CONFIRMED — separate-row modeling is honest enough; no
message change.** Verdict received via Douglas.

### 7. Bottom bracket — advisory only
**Claims:** no BB category exists yet; every crank×frame pair gets an info naming the
spindle standard (DUB / 24 mm / 30 mm / e*13 P3) and the frame shell (BSA73 / PF92 / T47)
and saying "BB sold separately". Nothing is ever blocked.
**Ask:** every current spindle×shell pair is servable with a real BB — will that stay true?
Which pairs deserve a real warning (e.g. 30 mm spindle in PF92)?
**Review verdict (2026-07-10): ✓ advisory CONFIRMED; the warning question answered by
BUILDING THE BB CATEGORY** ("this is correct but I am not sure which pairs deserve a real
warning. Can you add a bottom bracket category?" — Douglas). Resolution (branch
`bb-category`): a real `bb` part category (shell × spindle) with exact rule-7 error checks
once a BB is picked; the advisory still fires (and only) when none is. Servability is now
proven by purchasable rows instead of guessed — notably the Ask's own example: **30 mm in
PF92 IS servable** (fetched hopetech.com: Hope PF41 BB92 30 mm, 77 g, $124.27), so a real
warning there would have been FALSE. 8 sourced starter rows (SRAM DUB BSA 73/83 + PressFit
92/107; Hope Threaded 68/73 and PF41 BB92, each in 24 mm + 30 mm). Still advisory-only:
p3 spindles (e*13 sourcing pending), 24/30 mm in DH shells, BSA68/PF865/T47.

### 8. Brake caliper mounts
**Claims:** caliper mount must match fork/frame mount. Currently every part is post-mount,
so the check can't fire (pinned synthetically). **Post-mount SIZE (PM160/180/200 native) is
NOT modeled** — the protection comes from rule 10's min/max rotor checks instead.
**Ask:** is delegating PM-size protection to rotor min/max sufficient, or does it leak?

### 9. Rotor interface vs hub — direction-aware
**Claims:** a Center Lock rotor on a 6-bolt hub = error, no adapter exists. A 6-bolt rotor
on a Center Lock hub = **warning** naming the adapter (Shimano SM-RTAD05-class, one-piece
rotors only) — an everyday shop fix, so a hard red was a false "won't fit".
**Ask:** the adapter caveat says one-piece rotors only (not Hope floating / two-piece) —
right? Is warning the right tier or should adapters be a quieter info?

### 10. Rotor size — max (warning) and native-mount minimum (error)
**Claims:** rotor above the frame/fork's published max = warning ("exceeds the max").
Rotor BELOW a fork's native post-mount size = **error**: adapters only space calipers UP,
so a 180 rotor on a 200-native ZEB/Domain mount physically cannot work (sram.com states
"Minimum Rotor Size: 200mm" for those forks; populated only where fetched).
**Ask:** should over-max be promoted to error? It's a manufacturer structural limit, but
it *mounts* — we kept it a warning and made warnings visible as yellow dots. Judgment call.

### 11. Steerer / headset
**Claims:** fork steerer must match frame (everything current is tapered 1.5–1.125;
check pinned synthetically). **Ask:** anything worth modeling before 1.8" steerers arrive?
**Review verdict (2026-07-10): ✓ CONFIRMED — nothing to model before 1.8" arrives** (widen
the vocab when it does). Verdict received via Douglas.

### 12. Fork travel vs frame — rated max (warning) + approved minimum (dormant)
**Claims:** fork travel above the frame's rated max = warning ("exceeds the frame's rated
max" — worded as rated, not recommended, because it's warranty-relevant). UNDER-forking
warns only when a frame carries a maker-published minimum (none does yet — deliberately no
heuristic: high-pivot frames like the Dreadnought ship 154 mm travel with 170 forks, so a
travel-based guess would false-fire).
**Ask:** ~1° head-angle steepening per 20 mm is the number we quote — fair? Tier right?

### 13. Dropper vs seat tube — direction-aware + insertion nudge
**Claims:** post bigger than the tube = error (physically impossible). Post SMALLER than
the tube = warning naming the exact reducing shim ("31.6-to-30.9 mm, sold separately") —
shop-approved everyday practice (Wolf Tooth/Problem Solvers; PNW's own sizing guide
endorses shimming). Posts with ≥200 mm drop additionally get an INFO pointing at the
maker's insertion calculator, because the app has no frame-size concept yet and insertion
depth is the most common real dropper misfit we cannot check.
**Ask:** shim = warning, too-big = error — right? Is the 200 mm info threshold sensible?

### 14. Tire vs rim width + fork crown clearance
**Claims:** tire wider than the wheel's max = warning (active — 2.6" tires exist in the
catalog against 2.5"-max rims). Tire wider than the FORK's published chassis clearance =
warning, dormant until forks carry sourced data (Fox/RockShox publish per chassis).
**Not modeled:** too-NARROW tire on a wide rim (thresholds are fuzzy/standards-dependent —
deferred pending sourcing).
**Ask:** rim maxTire values are partly sample guidance, not maker data (flagged per row) —
how much do you trust ETRTO-style width guidance as a default?

### 15. Handlebar / stem clamp
**Claims:** 31.8 vs 35 mm mismatch = error. No known caveats; both live in the catalog.
**Review verdict (2026-07-10): ✓ CONFIRMED as-is.** Verdict received via Douglas. (For the
record: the pre-research pass found maker-sold 31.8→35 bar shims exist — the "no known
caveats" wording is softened by that observation; no engine change requested or made, and
the shim question stays a parked mechanic follow-up in `DOSSIER-OPEN-QUESTIONS-RESEARCH.md`.)

### 16. Rear shock fit — direction-aware stroke + coil approval
**Claims:** eye-to-eye mismatch = error. Mount (std vs trunnion) mismatch = error. Stroke
LONGER than the frame's spec = error (over-rotation / bottom-out contact). Stroke SHORTER
with matching eye+mount = **warning** quantifying reduced travel ("~158 mm instead of
165 mm") — makers sell the same body in multiple strokes and RockShox supports stroke
reduction, so a red was a false "won't fit". A coil shock on a frame whose maker states
"not coil-compatible" warns (dormant — populated only from maker statements, never
leverage-curve guesses). Hardtails cleanly reject any shock.
**Ask:** travel is estimated linearly (frame travel × stroke ratio) — close enough for a
warning? Should shorter-stroke mention stroke spacers specifically?

### 17. Frame + shock bundling / OEM-only
**Claims:** package-only frames (e.g. Specialized Enduro) warn when you pick a different
shock ("you'll still pay for the bundle"); OEM-only shocks error on the wrong frame and
give an info when no frame is picked yet.
**Review verdict (2026-07-10): ✓ CONFIRMED — no change.** Verdict received via Douglas.

### 18. Rear tire vs frame clearance
**Claims:** rear tire wider than the frame's published max = warning. ACTIVE on 10 catalog
frames (8 models) with manufacturer-published clearances (Madonnas 2.6, Slash 2.5,
Megatower 2.5 stock, Spire 2.6, SB160 2.6, HD6 2.5, Reign 2.5, Dreadnought 2.6); frames
without a published max stay silent by design.
**Ask:** Megatower's 2.5 is the "stock setting" figure (flip-chip dependent) — is
per-setting clearance worth modeling, or is stock-setting honest enough?
**Review verdict (2026-07-10): ✓ CONFIRMED with a data policy** — "use the largest tire size
available; if it's larger than the stock setting, give a warning that settings may need to
change" (Douglas). Checked same day against the re-fetched Santa Cruz Megatower support page:
SC publishes ONE clearance figure ("Max Tire Clearance: 2.5\"" / "Designed for 29\" x 2.5\"
max" — constant across flip-chip settings), so stock IS the largest published figure and the
row is already correct; no change. The policy is recorded for any frame whose maker DOES
publish per-setting clearances: `maxTire` = largest published figure, plus a warning above
the stock-setting figure noting the flip-chip/setting may need to change.

### 19. Shifter clamp vs brake-lever integration
**Claims:** a lever-integrated shifter (I-Spec EV/II/B, MatchMaker — ships with no bar
clamp of its own) paired with brakes that accept none of its standards = warning ("needs
the band-clamp version or a ShiftMount-style adapter"). I-Spec generations are treated as
mutually incompatible; a lever may accept several standards; one matching lever is enough.
**Ask:** generation matrix right? Adapter-tier wording fair?

---

## Deliberate NON-rules — please confirm, don't "fix"

1. **SuperBoost frame + Boost-chainline crank: NO error.** Commonly ridden (e.g. Firebird
   with Boost cranks); a naive chainline rule would be a false red. Pinned by a test so a
   future session can't add it. The `chainline` field is display-only bait. **Agree?**
2. **52T-max derailleur + 10-50 cassette: NO error** (see rule 5 — SRAM documents backward
   compatibility; an auditor's proposed rule was refuted and recorded).
3. **Ride discipline (XC/trail/enduro/DH) NEVER gates fit** — a DH tire physically fits an
   XC bike. Disciplines are filter/annotation only.
4. **Pedals: no compat rules** — 9/16" thread fits every crank.

## What "verified" means in the data

- **Verified (74 of 330):** every spec set from a **fetched manufacturer page/document**
  (never search summaries — they've been wrong about shock sizes, seatpost diameters and
  rotor maxes in this exact catalog), plus a dated source URL. Weights for makers who
  publish none (Shimano, SRAM rotors, Fox shocks) may come from a reputable third-party
  **measured** figure for the exact SKU — flagged `measured` with its own URL; retailer
  listings are rejected. Everything else is clearly badged **sample data** in the app.
- Verification keeps catching fabricated sample specs — four tire sizes that don't exist,
  weights off by 50–200 g, a fictional "Kryptotal" that's really two treads. Assume
  unverified rows contain more of the same.

## Known gaps — please rank by real-world danger

| Gap | Status |
|---|---|
| Dropper insertion depth vs frame size | Info nudge only; real check needs a frame-size concept |
| Bottom bracket as a real part/rule | Advisory info only (see rule 7) |
| Tire too narrow for rim | Not checked (thresholds unsourced) |
| Under-forking | Rule exists, dormant — no frame publishes a minimum yet |
| Coil approval per frame | Rule exists, dormant — needs maker statements |
| Front tire vs fork crown | Rule exists, dormant — needs fork clearance data |
| Post-mount native size | Not modeled (delegated to rotor min/max) |
| Chain length / ring size vs derailleur capacity | Not checked |
| Seatpost insertion vs curved/interrupted seat tubes | Not checked |
| E-bike-specific ratings | Not modeled at all |

**The most valuable thing you can tell us is the misfit you see weekly that isn't anywhere
in this document.**

## How to report

Pre-deploy: annotate this file, or use the app's **⚐ Report a wrong verdict** button (any
build state can be flagged; it produces a copyable reproduction report with a share link).
Post-deploy those reports become pre-filled GitHub issues.
