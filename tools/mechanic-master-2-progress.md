# mechanic-master-2 — MASTER round 2 progress

Branch: `tooling/mechanic-master-2`, cut from `origin/main` @ `5466a16` (which already contains
the merged master-1 batches). Worktree: `D:/mtb-worktrees/mm2-4e17`.

**Ownership:** sole mechanic master round (confirmed by the seat-12 coordinator 2026-07-18; the
original master-1 session was stood down after its two batches were merged).

**Scope/bar:** `tools/mechanic/INDEX.md` corpus rules + `CURRICULUM.md` levels. MASTER bar =
cited primary sources across the domain, with remaining unknowns documented as **EXTERNAL**
rather than estimated. This corpus produces facts only — it never edits `src/compat.js`,
`src/schema.js`, the catalog or the tests (INDEX.md "Boundaries").

## Base-state verification (re-done 2026-07-18 on coordinator instruction)

- Read `INDEX.md`, `CURRICULUM.md`, and **every** chapter's Maturity line + `## Gaps` section
  before authoring. All six chapters currently grade **professional**.
- Re-fetched `origin/main` after the coordinator's ownership note: main has advanced to
  `ad49806`, but `git diff HEAD...origin/main -- tools/mechanic/` is **empty** — no
  mechanic-corpus changes landed since my branch point, so the Gaps reading above is current.
  No rebase needed for corpus correctness.
- **Do-not-re-cover list confirmed accurate** against the merged Gaps markers: AXS
  cross-generation compatibility (DRV-56–61), Industry Nine Hydra freehub internals (DRV-62/63,
  WHL-40), and the TRP/Magura brakes L2 gap are all marked CLOSED by master-1. Not revisited.

## ID ranges claimed

Append-only per INDEX.md corpus rule 1. Max ID observed in the merged corpus at round start,
and this round's claim:

| Chapter | Prefix | Max at round start | **Claimed by master-2** |
|---|---|---|---|
| `drivetrain.md` | `DRV` | 63 | **DRV-64 →** |
| `wheels-tires.md` | `WHL` | 45 | **WHL-46 →** |
| `suspension.md` | `SUS` | 47 | **SUS-48 →** |
| `brakes.md` | `BRK` | 45 | **BRK-46 →** |
| `frame-standards-bearings.md` | `FRM` | 50 | **FRM-51 →** |
| `cockpit-contact.md` | `CKP` | 27 | **CKP-28 →** |

## Batch 1 — chain-width tolerances + UDH revision history (commit `b8d9922`)

Gates: validate **7 OK / 0 problems**, **757 tests passed**, tsc clean.

**DRV-64–67** — closed DRV-26's explicit *"not established for 11/12-speed"* flag at the level
the sources support. KMC's manufacturer glossary establishes that 9-, 10-, 11- and 12-speed
chains all share the **1/2"×11/128" internal-width class** (5.2–6.6 mm outer, 1.9 mm max tooth
thickness), making cross-speed substitution a **clearance** question rather than an engagement
one (DRV-64). DRV-65 independently corroborates the schema's `chainWidth` 1/8-vs-3/32 vocabulary
and scopes it — **no contradiction with `ss-chain-width`**. DRV-66 records the limiting finding:
KMC's X11 and X12 carry an *identical* size designation but *different* stated compatibility, so
the designation does **not** license 11↔12 substitution and DRV-26's "one step narrower"
observation must stay historical/lower-tier. DRV-67 captures Shimano's directional-fitting
mandate and declares Shimano exhausted for chain geometry.

**FRM-51–53** — closed the UDH revision-by-revision gap FRM-41 left open. The Rev H frame-spec
drawing (`90-7518-190-000`) carries its own REVISION RECORD; transcribed line-by-line, and
combined with FRM-41's B/D rows it yields an **A→H trail** that neither drawing holds alone.
Findings: **142 and 157 mm OLD were added only at Rev F**; **Rev F is the pivotal revision**
(hanger spec → hanger + full-mount spec; "UDH/NDG" → "Hangerless Interface"; upper-idler-pulley
clearance model added, so high-pivot support is a later addition); F, G and H each revise OLD /
axle length or its tolerance. FRM-53 answers the gap's second half — *does any revision require a
different UDH part for an older frame?* — **NO at the sourceable tier**, and is deliberately
**not** filed as `⚠ CONTRADICTION`: SRAM publishes no per-revision compatibility split, so a
rev-aware engine rule cannot be sourced to the bar and the revision-blind `udh` boolean stands.

## Batch 2 — spoke-tension verification + Sapim exhaustion (commit `9ac6fc9`)

Gates: validate **7 OK / 0 problems**, **757 tests passed**, tsc clean.

**WHL-46** — carried out the verification action WHL-26 requested. §6.1 of the DT Swiss SPLINE
manual was located at PDF p.66 and **rasterised with `pdftoppm` and read as an image** instead of
text-extracted, defeating the column-scrambling that had forced a medium grade. **All four
average-tension bands matched the reconstruction exactly**; WHL-26 upgraded *medium → confirmed*.

**WHL-48** — **SOURCE-EXHAUSTION / EXTERNAL.** The cause behind two rounds of "Sapim 404s" is
identified: Sapim **migrated `sapim.be` → `sapim.eu`** (old URLs 301 to a domain where they 404),
and the live `sapim.eu/downloads/` page is **behind a registration wall**. A Wayback CDX sweep of
`sapim.be*` returns **no archived Sapim PDFs at all**, and surviving archived checklists are
**images, not tables**. No account was registered. A cross-brand tension-*target* comparison is
therefore not achievable from public sources; **DT Swiss stands as the only maker publishing
one.** Flagged so future rounds do not re-attempt this by URL-guessing.

**WHL-47** — one narrow successor gap opened: a later manual revision (V2017.07) appears to carry
an **expanded §6.2 tolerance table keyed to inner rim width** (<30 mm vs >30 mm) that WHL-27's
V2017.03-based table lacks. **Figures deliberately NOT transcribed** — the copy obtained was
truncated and could not be render-verified, so per corpus rule 6 the revision difference is
recorded and the numbers are not.

## Techniques banked (reusable, recorded in-corpus)

- **si.shimano.com PDFs** 403 to WebFetch, curl **and** Bright Data — whose Web Unlocker silently
  returns a **corrupted PDF binary** rather than failing loudly. The **Wayback `/if_/`
  raw-content route works** and is the method of record for si.shimano.com.
- **Column-scrambled PDF tables:** `pdftoppm -png` at ~160 dpi and read the page as an image.
- The UDH frame-builder zip 403s unless requested at its real `/downloads/` path, which must be
  read out of the page HTML.

## Source-exhaustion declarations

- **Shimano, for chain geometry** — both chain dealer manuals (DM-MACN001-07 12-speed,
  DM-CN0001-07 11-speed) read end-to-end; **neither publishes any width, pin length or
  dimensional table**. They document orientation and tooling only.
- **Sapim, for tension targets** — see WHL-48.
- **Remaining EXTERNAL:** no maker publishes a per-SKU chain outer width in mm, nor a cross-speed
  substitution tolerance; SRAM publishes no UDH revision *dates* or frame-model↔revision mapping,
  and distributes only the current revision.

## Engine impact

**Nothing contradicted an engine rule this round.** Three rules gained supporting citations
(`ss-chain-width` via DRV-65; the `udh` requirement via FRM-51/52; the revision-blindness of
`udh` positively justified by FRM-53). No `⚠ CONTRADICTION` filed, and one was explicitly
*declined* on bar grounds (FRM-53).

## Remaining brief items (not yet started)

11/12-speed chain widths ✅ · UDH revision history ✅ · spoke-tension charts ✅ — then:
carbon rim/bar inspection doctrine · suspension tuning-range depth (volume spacers, the
Suspension Theory Guide's advanced sections) · brakes bleed fluid-volume table completion +
DOT/mineral chemistry · L4 race-craft where public sources exist (race-mechanic interviews =
Tier-B, labelled).
