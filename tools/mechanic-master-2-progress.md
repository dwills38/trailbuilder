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

## Batch 3 — carbon rim doctrine + cross-brand tension (commit `8f0128a`)

Gates: validate **7 OK / 0 problems**, **757 tests passed**, tsc clean.

**WHL-51/52** open and largely close a gap the chapter never had named: **carbon rim
inspection** (it previously held almost no carbon-specific content at all). ENVE's structured
protocol — post-impact standard, damage vocabulary, the "new since your last ride" catch-all,
the pulsing/surging stop-the-ride symptom, handling rules, and the truing-interval principle —
plus two manufacturer-stated failure modes (riding a carbon rim flat; over-pressure, with
Reserve's MTB cap of **50 psi / 3.4 bar**). Honestly scoped: much of ENVE's pre-ride list is
rim-brake-braking-surface material that does not transfer to disc MTB, stated in-fact.

**WHL-49 CORRECTS this round's own batch 2.** WHL-48's "DT Swiss is the only maker publishing a
tension target" was **too strong and is withdrawn**: Reserve publishes one (tight side
**1000–1300 N**) agreeing closely with DT Swiss's disc figures. **The cross-brand tension
comparison is therefore CLOSED**, just not via Sapim. Also flags a source-internal unit error not
to propagate (Reserve labels newtons as "Nm") and, in **WHL-50**, resolves which side the "higher
tightened side" is (front = disc side, rear = driver side; HT/LT rim decals, arrow authoritative).

## Batch 4 — volume-spacer selection + coil spring chart (commit `e28c99c`)

Gates: validate **7 OK / 0 problems**, **757 tests passed**, tsc clean.

**SUS-48/49** close an unnamed gap: *which* volume-spacer part fits. Token selection is keyed to
**model code + air-spring type, never upper-tube diameter** (35 mm uppers appear under all four
token P/Ns; Lyrik differs between DebonAir and Linear XL; Dual Position Air is unique). Rear
hardware **changed architecture by generation**: Token (≤2022) → Ring → **O-ring (Super Deluxe
D1), which has no standalone part number** and ships only in the 100HR/200HR service kits.

**SUS-50** closes the named coil-spring-chart gap from a clean sram.com PDF, render-verified —
scoped honestly to **TK (Coil) entry-tier forks only**, and to **colour/firmness codes, not lb/in
rates**. **SUS-51** corrects the gap's premise: a leverage-adjusted chart **cannot exist for a
fork** (leverage ratio is a rear-linkage property), so the entry is split — fork selection closed,
rear spring-rate-vs-leverage reclassified to the kinematics L3 gap with a note to look at *frame*
makers.

## Batch 5 — Hayes + brake-fluid chemistry (commit `f018894`)

Gates: validate **7 OK / 0 problems**, **757 tests passed**, tsc clean.

**BRK-46/47** close the named Hayes gap — **5/5 major hydraulic makers** now at
manufacturer-primary tier. The CDX route the gap named surfaced only Manitou docs; a plain `curl`
on the Hayes Zendesk attachment worked **first try**. That is now **three** gaps in this chapter
(TRP, Magura, Hayes) that were never source problems. **BRK-47 answers the "bleed fluid-volume
table" item by establishing the table cannot exist**: no maker publishes an ml capacity; all
specify fill fractions and flush-until-clear endpoints, deliberately, because volume varies with
hose length. Declared EXTERNAL.

**BRK-48/49** give the chapter its first **standards-body** source (FMVSS 116 / 49 CFR § 571.116):
dry/wet ERBP minima per grade and the operational definition of "wet" (**3.70 ± 0.05 % water by
weight**), which is the quantitative backbone under the chapter's hygroscopicity claims. BRK-49
records the DOT 5 (silicone) vs DOT 5.1 (non-silicone) trap **and** an explicit
**do-not-transfer caveat**: FMVSS's mandated fluid colours govern motor vehicles only and are
contradicted by real bike products (Magura blue, Shimano red) — fluid family must never be
identified by colour.

## Techniques banked (reusable, recorded in-corpus)

- **si.shimano.com PDFs** 403 to WebFetch, curl **and** Bright Data — whose Web Unlocker silently
  returns a **corrupted PDF binary** rather than failing loudly. The **Wayback `/if_/`
  raw-content route works** and is the method of record for si.shimano.com.
- **Column-scrambled PDF tables:** `pdftoppm -png` at ~160 dpi and read the page as an image.
  Used four times this round (DT Swiss §6.1, both RockShox charts) — **every multi-column spec
  table encountered extracted wrongly as text and correctly as an image.** Treat text extraction
  of a table as unverified by default.
- The UDH frame-builder zip 403s unless requested at its real `/downloads/` path, which must be
  read out of the page HTML.
- **Federal regulation text:** ecfr.gov redirects to an unblock gateway and Bright Data returns
  empty; the **GovInfo CFR XML mirror** (`govinfo.gov/content/pkg/CFR-<year>-title<N>-vol<M>/xml/…`)
  is the working route.
- **Zendesk-hosted manufacturer manuals** (Hayes): scrape the article for its
  `hc/en-us/article_attachments/<id>` link, then plain `curl` that — no escalation needed.
- **The strongest process lesson of the round, now proven four times across two chapters
  (TRP, Magura, Hayes, Zero Friction):** before recording a document as walled or corrupt, try
  the direct download + `pdftotext`. Fetch-tool artifacts have masqueraded as source exhaustion
  repeatedly in this corpus.

## Source-exhaustion declarations

- **Shimano, for chain geometry** — both chain dealer manuals (DM-MACN001-07 12-speed,
  DM-CN0001-07 11-speed) read end-to-end; **neither publishes any width, pin length or
  dimensional table**. They document orientation and tooling only.
- **Sapim, for tension targets** — see WHL-48 (domain migration + registration wall). Note the
  *inference* drawn from it was later corrected by WHL-49; the exhaustion itself stands.
- **Bleed fluid volumes in ml** — none of the five sourced brake makers publishes a system
  capacity; fill fractions and flush-until-clear endpoints are the manufacturer-specified form,
  deliberately, because volume varies with hose length (BRK-47).
- **Carbon damage-mode engineering** — no maker publishes a delamination-detection method, tap
  test, or cosmetic-vs-structural crack threshold; every maker routes that judgment to its
  warranty department. Likely EXTERNAL; a future round should test composites-industry/standards
  sources rather than bike-brand pages.
- **Remaining EXTERNAL:** per-SKU chain outer width in mm and any cross-speed substitution
  tolerance; UDH revision *dates* and frame-model↔revision mapping (SRAM distributes only the
  current revision); coil spring rates in lb/in (RockShox publishes colour codes only);
  per-product actual fluid boiling points (FMVSS gives grade *minima*, and bicycle fluids are not
  FMVSS-bound) and any mineral-oil boiling standard.

## Engine impact

**Nothing contradicted an engine rule across five batches.** Three rules gained supporting
citations (`ss-chain-width` via DRV-65; the `udh` requirement via FRM-51/52; the
revision-blindness of `udh` positively justified by FRM-53). **No `⚠ CONTRADICTION` filed**, and
one was explicitly *declined* on bar grounds (FRM-53). Zero coordinator intake items.

## Self-correction log (kept deliberately — corpus rule 1)

- **WHL-48 → corrected by WHL-49 (same round).** "DT Swiss is the only maker publishing a
  tension target" was an over-generalisation from a single-brand exhaustion; Reserve publishes
  one. Lesson recorded in the chapter Gaps: *an exhaustion finding about one brand is not
  evidence about the field — check a third party before generalising.*
- **SUS-51** corrects a *pre-existing* Gaps premise (fork vs rear-shock leverage ratio) rather
  than a fact — recorded so the restructured gap doesn't look like scope drift.

## Batch 6 — L4 race-craft (commit `590e8f2`)

Gates: validate **7 OK / 0 problems**, **757 tests passed**, tsc clean.

**WHL-53** lands the corpus's first L4 race-craft fact at **governing-body tier**: a World Cup
XCO pit is regulated as a **feed/technical assistance zone** with credentialed, quota-limited
access (season-long FTA passes and *"separated space"* for registered Elite MTB teams; venue
credentials on a rider-count quota). This is the *precondition* for the "pit-wheel-swap
procedure" the wheels-tires L4 gap named — a swap is only possible where a mechanic may stand
with the spare. Scope caveat stated in-fact: the obtained document is the **19-page 2019
amendments excerpt**, not the complete Part 4, so FTA *conduct* articles are **not** sourced.

**The rest of L4 stays OPEN — but as a documented finding, not an assumption.** Four independent
routes were tried and their blockers recorded in-chapter:
1. **UCI full Part 4** — `uci.org/regulations` is JS-rendered (WebFetch *and* Bright Data return
   the nav shell); Wayback holds only amendment excerpts and 1-page stubs. *Next route: a national
   federation's static mirror, or `docs.uci.org` by document ID.*
2. **ENVE pressure guidance** — JS-rendered calculator, no static text. *Next route: a
   calculator's published methodology page rather than the calculator.*
3. **SRAM "Suspension Setup and Tuning Guide"** — that URL is **not a PDF**; it HTML-redirects to
   the `docs.sram.com` Suspension User Manual this corpus already mined (SUS-26–31). **There is no
   separate RockShox race-tuning document behind that name** — recorded in suspension.md.
4. **Reserve** — publishes maximum pressures only, not situational guidance.

**Assessment:** CURRICULUM.md predicted L4 would be the thinnest-documented level and arrive last.
This round confirms that **empirically** and refines it: the blockers were **JS-rendering and
partial archiving, not absence of knowledge**. **Tier-B practitioner content was deliberately NOT
harvested** — doing it properly means named practitioners on the record, and a thin pass would
have produced exactly the dressed-up consensus rule 2 forbids. The recommended shape of the next
attempt is recorded alongside the blockers.

## Brief status — COMPLETE

11/12-speed chain widths ✅ · UDH revision history ✅ · spoke-tension charts ✅ · carbon
rim/bar inspection ✅ · suspension tuning-range depth ✅ · brakes bleed volumes + DOT/mineral
chemistry ✅ · L4 race-craft ✅ *(first fact landed + honest source-availability finding; the
level remains open by design, with next routes documented)*.

**Round totals:** 6 batches, 8 commits, **20 new facts** (DRV-64–67, WHL-46–53, SUS-48–51,
BRK-46–49, FRM-51–53). Every commit gated green. Zero engine contradictions; zero coordinator
intake items.
