# Brakes — Mechanic Corpus

Caliper · rotor · mount standards · adapters · levers · lever↔shifter integration.
Read [`INDEX.md`](INDEX.md) first (corpus rules, citation discipline, conventions).

Fact IDs are stable and append-only (`BRK-n`). Confidence is the source's own grading.

---

## Caliper mounts

**BRK-1 — Caliper mount must match the fork/frame mount.** Post Mount (PM) and Flat Mount
(FM) are distinct caliper-mounting standards; an FM caliper on a PM fork (and vice versa) is a
genuine non-fit. *Confidence: confirmed.* Source: EXPERT-REVIEW-DOSSIER.md §8 (live on real FM
calipers, e.g. `bk-shimano-xtr-m9110-fm`).

**BRK-2 — Post-mount SIZE (PM160/180/200 native) is not a *mount* fact — it's delegated to
rotor min/max.** Whether a caliper bolts directly or needs a bracket is governed by the native
post size, which the engine handles through the rotor min/max checks (BRK-6/BRK-7), not the
mount-match check. SRAM's own caliper-mounting chart encodes exactly this: per native PM size
(140/160/180/200/203), a hardware config exists **only at the native size ("Direct") and
above** (spacers/brackets space *up*); **every cell below native is a dash — no configuration
exists.** *Confidence: confirmed structurally.* Source: SRAM "Disc Brake Caliper Mounting
Specifications for Road and MTB" (GEN.0000000005232 Rev V, fetched PDF), via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §8; EXPERT-REVIEW-DOSSIER.md §8.

**BRK-3 — A flat-mount caliper can have its OWN rotor-size ceiling, below what the fork/frame
allows.** An FM caliper is often rated for a smaller max rotor than the chassis would permit,
and has no size-up bracket — so exceeding the caliper's own rated max is a hard "won't fit,"
distinct from the chassis rotor-max (which is a warning, BRK-7). *Confidence: confirmed
(fetched maker specs).* Source: Shimano Specifications handbook (productinfo.shimano.com
Ver.2.4/C-461: XTR BR-M9110 FM = 160 mm max) + Magura MT8 SL FM page (160 mm), via
EXPERT-REVIEW-DOSSIER.md Appendix 8b. Engine: live as `front/rear-brake-rotor-max`, error tier,
dormant until a caliper carries a sourced `maxRotor`. ⚠ Note: the Magura fetch **corrected a
catalog row** (`desc` had wrongly claimed "up to 180") and an XC golden build's baked-in false
fit — a live example of a corpus fact catching a wrong catalog assumption. Hope XCR-FM and SRAM
Level-FM ceilings are still unsourced (dormant).

## Rotor interface vs hub

**BRK-4 — Rotor↔hub interface is DIRECTION-AWARE.** A **Center Lock rotor on a 6-bolt hub =
error** (no adapter exists that direction). A **6-bolt rotor on a Center Lock hub = warning**
naming the adapter (Shimano SM-RTAD05-class) — an everyday shop fix, so a hard red there is a
false "won't fit." *Confidence: confirmed (warning tier + direction).* Source:
EXPERT-REVIEW-DOSSIER.md §9. Engine: live as rule 9, the warning carries a structured
`fix:{kind:'adapter', name:'Shimano SM-RTAD05'}`.

**BRK-5 — The CL→6-bolt adapter is ONE-PIECE ROTORS ONLY.** The SM-RTAD05-class adapter
cannot be used with a 6-bolt rotor that is itself installed on an aluminium carrier
(two-piece / floating rotors, e.g. Shimano SM-RT86/RT76, Hope floating). *Confidence: partial
— the restriction is consistently attributed to Shimano's SM-RTAD05 dealer manual but could
NOT be maker-fetched (every Shimano doc host 403'd); treat as corroborated manual text, not a
fetched primary.* Source: SM-RTAD05 manual text quoted across multiple mirrors (*"cannot be
used with the 6-bolt disc brake rotor that is installed with an aluminum adapter
(SM-RT86/RT76)"*), via EXPERT-REVIEW-DOSSIER.md §9 + DOSSIER-OPEN-QUESTIONS-RESEARCH.md §9.
**Bench close-out still open:** a physical SM-RTAD05 box/manual check, and whether Hope
floating / alloy-carrier 6-bolt rotors genuinely won't seat on the adapter.

## Rotor size

**BRK-6 — Rotor BELOW a fork/frame's native post-mount size = ERROR.** Adapters/brackets only
space calipers **up**; a rotor smaller than the native mount physically cannot be brought into
alignment (BRK-2). E.g. a 180 mm rotor on a 200-native ZEB/Domain mount. Live only where the
fork/frame publishes a sourced minimum. *Confidence: confirmed.* Source: SRAM RockShox model
pages state "Minimum Rotor Size" verbatim (ZEB/Domain = 200), via EXPERT-REVIEW-DOSSIER.md §10;
engine rule 10 (`front-rotor-min`) + rule 10b (frame-side, live on the Cotic Solaris's sourced
`minRotorR`).

**BRK-7 — Rotor ABOVE the frame/fork's published max = WARNING (a deliberate tier choice).**
An over-max rotor *does mount* — exceeding a published max is out-of-spec / warranty-relevant,
not won't-mount — so it is a warning (surfaced as a yellow pick-dot), not an error. This is a
judgment call the review explicitly confirmed: *"overmax should be a warning, below native size
should be an error/incompatible."* *Confidence: high on basis; tier is the mechanic's call, and
was confirmed.* Source: SRAM RockShox model pages ("Minimum Rotor Size: 200mm / Maximum Rotor
Size: 220mm", ZEB Select re-fetched) + SRAM caliper-mounting PDF footnote (*"Consult the fork
or frame manufacturer's specifications before installing…"*), via
DOSSIER-OPEN-QUESTIONS-RESEARCH.md §10; EXPERT-REVIEW-DOSSIER.md §10.

**BRK-8 — Fork native post-mount size changed ACROSS GENERATIONS (a real trap).** The same
fork model name can have a different native mount by generation — do not assume:
- **Fox 38 / 36:** pre-2027 gen = 180 mm native post mount (up to 230 with adapter); the MY27
  "36 AM"/38 generation bumped native to **200 mm direct** (up to 230). So `min180` vs `min200`
  is generation-dependent within one model name.
- **RockShox by stanchion:** SRAM pages state "Minimum Rotor Size" verbatim — ZEB/Domain
  (38 mm) = 200 min / 220 max; Lyrik/Pike/SID (35 mm) = 180 / 220; SID SL (32 mm) = 160 / 200.
*Confidence: confirmed (fetched SRAM pages; Fox split from the fork-verification wave).*
Source: fork-verification wave 2026-07-10 (memory: fork-verification-learnings), carried in the
catalog `desc` fields with the fetched sram.com model-page citations.

**BRK-9 — 220 mm rotors are speced for 4-piston calipers.** SRAM's caliper-mounting PDF states
*"The 220 mm diameter rotor is designed for use with a 4-piston caliper."* Not modelled — a
candidate rotor-size-vs-caliper-`pistons` info/warning (data is present on brake rows).
*Confidence: confirmed (fetched).* Source: SRAM caliper mounting PDF (GEN.0000000005232 Rev V),
via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §Bonus.

## Lever ↔ shifter integration

**BRK-10 — I-Spec generations are mutually incompatible; a lever may accept several standards.**
A lever-integrated shifter (I-Spec EV / II / B, MatchMaker — it ships with no bar clamp of its
own) paired with brakes that accept none of its standards needs the band-clamp version or a
ShiftMount-style adapter. Shimano's own chart marks **only same-generation pairings compatible;
every cross-generation cell is "−".** One matching lever is enough (levers accept multiple
standards). *Confidence: confirmed.* Source: Shimano productinfo.shimano.com chart **C-157**
("Compatibility of I-SPEC shifter and brake lever"), via DOSSIER-OPEN-QUESTIONS-RESEARCH.md §19;
EXPERT-REVIEW-DOSSIER.md §19. Engine: rule 19 (`shifter-mount`), warning tier, dormant until
parts are tagged. Note: Shimano documents a partial path — a clamp-band shifter can join I-SPEC
levers *"if the upper body is replaced with an integral unit."*

## BMX braking (off-live)

**BRK-11 [BMX] — U-brake bosses are the standard; brakeless is a valid complete build.** BMX
brakes: **U-brake** (mounts on frame/fork U-brake bosses/posts — the standard), 990/V-brake
(older, different boss spacing), caliper (race/some freestyle), or **brakeless**. A U-brake
needs U-brake bosses; a bossless frame is brakeless-only (or needs a mount adapter). This is
the BMX analog of MTB rule 8 but over a **completely different mount vocab** — do NOT reuse the
disc `brakeMount` (`PM`/`FM` are meaningless here). *Confidence: design-doc mechanical fact.*
Source: data/DJ-BMX-COMPAT-ANALYSIS.md §2a (BMX-6); brakeless confirmed as a valid complete
build (Douglas 2026-07-13, decision 3). Engine: `bmx-front/rear-brake-mount`, off-live module.

**BRK-12 [BMX] — a gyro/detangler is opt-in and has coupled requirements.** A gyro lets the
bars spin 360° without tangling the rear brake cable. It requires (a) a frame/fork with rotor
tabs / gyro provision, (b) a dual-cable ("upper/lower") U-brake, and (c) a gyro-compatible /
dual-cable lever or splitter. The engine must **never require a brake** — modern brakeless
street BMX is common; the gyro is entirely opt-in. *Confidence: design-doc fact; dormant until
a frame explicitly declares `gyroTabs:false` (absence = unknown = silent).* Source:
data/DJ-BMX-COMPAT-ANALYSIS.md §2a (BMX-5). Engine: `bmx-gyro-tabs`/`bmx-gyro-cable`, dormant.

---

## INTERACTIONS (the organizing principle)

*What constrains what, how mismatches fail, install-order dependencies, wear couplings.*

### What constrains what
- **The chassis (fork/frame) sets three brake facts at once:** the mount standard (BRK-1),
  the native post size → rotor floor (BRK-6), and the published rotor ceiling (BRK-7). A
  caliper choice is only valid against all three.
- **The rotor sits between two independent constraints:** its *interface* must match the hub
  (BRK-4, direction-aware), and its *size* must sit within [native-min, published-max] of the
  chassis (BRK-6/7) **and** within the caliper's own rated max (BRK-3). A rotor can satisfy the
  hub interface and still be out of size range, or vice versa — check both axes.
- **Generation gates the rotor floor** (BRK-8): the same fork name can move its native mount
  across model years, so the min-rotor constraint is generation-specific, not model-specific.

### Mismatch failure modes
- **Hard "won't fit":** PM↔FM mount mismatch (BRK-1); CL rotor on a 6-bolt hub (BRK-4); rotor
  below native mount (BRK-6); rotor above a flat-mount caliper's own ceiling (BRK-3).
- **"Works with an adapter" (warning + structured fix):** 6-bolt rotor on a CL hub → SM-RTAD05
  adapter, *one-piece rotors only* (BRK-4/BRK-5).
- **"Mounts but out-of-spec" (warning / yellow dot):** rotor above the chassis published max
  (BRK-7) — mounts fine, warranty/structural caution.
- **Silent-and-fine:** rotor at or above native mount and within max, matching interface.

### Install-order dependencies
- **Adapter/bracket selection follows rotor size** (BRK-2): you pick the rotor, *then* the
  spacer/bracket that spaces the caliper up to it — and there is no bracket that spaces *down*,
  which is exactly why BRK-6 is an error not a warning.
- **The CL↔6-bolt adapter's rotor-type restriction is checked before ordering** (BRK-5): a
  two-piece/floating 6-bolt rotor won't seat on the RTAD05-class adapter, so the adapter path
  is only valid for one-piece rotors.
- **Rotor bed-in after any rotor OR pad change** — a fresh rotor/pad pairing must be bedded;
  it's install procedure, not a compatibility verdict.

### Wear couplings
- **Rotor thickness ↔ pad ↔ caliper:** a worn-thin rotor changes lever throw and pad
  clearance; rotor and pads wear as a pair against the caliper. Not a fit rule, but the reason
  a "works" mismatch (e.g. a slightly-skewed adapter stack) accelerates pad/rotor wear.
- **Bigger rotor = more leverage + heat capacity:** the reason over-max is *chosen* (more
  braking) despite being out-of-spec — the tradeoff behind BRK-7's warning tier.

---

## Open mechanic questions (for the human review — do not act)
- BRK-5: physical confirmation that two-piece / floating 6-bolt rotors (Hope, alloy-carrier)
  won't seat on the SM-RTAD05-class adapter; and confirm warning (not info) is the right tier.
- BRK-7: would you refuse to assemble an over-max build (→ error), or build it with a
  signed-waiver conversation (→ keep warning)?
- BRK-3: sourced max-rotor ceilings for Hope XCR-FM and SRAM Level-FM calipers.
- BRK-2: how often are under-size rotors attempted on 200-native forks (urgency of broader
  `minRotorF` data coverage)?
