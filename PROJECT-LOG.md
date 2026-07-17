# BuildMyMTB — Project Log

## 2026-07-17 — cb-sheets batch 1 merged (sheet-verified 134 → 140) · BMX go-live word given

- **Douglas gave the BMX go-live word** (parameters in memory `bmx-golive`): build to ~300 parts /
  ~40% verified then flip; page name "BuildMyBMX"; Kit Builder button renames to "BuildMyKit";
  pivotal-seat ERROR kept; rider-preference research on the [MECHANIC REVIEW] severities. 4 chips
  dispatched (page mount, 2 depth grinds, severity research). Decision packet artifact published.
- **verify/cb-sheets-1 batch 1 merged**: +6 build-sheet promotions (Salsa Timberjack, Canyon
  Neuron CF 8 + Sender CFR Team, Commencal Meta HT V3 + Supreme DH V5, Santa Cruz Hightower R
  MY25 re-fetched). Gates green, harness byte-identical, diff = provenance fields only.
  Worker's finds: 99 rows carry fetched write-ups but stay unverified — 94 correctly (mostly the
  price-on-maker-page bar), ~5 borderline (Whyte 905 price-bar consistency) for a re-screen; Trek
  is a hard 3-tier JS wall (21 bikes — parked for a bdata-render attempt); Hightower MY23/MY24
  crank spec drift flagged NOT acted on (needs the MY23 page). Sheet-verified 140/436.

## 2026-07-17 — verify fanout batch-group 3 merged (verified 2808 → 2868)

- Watch-loop tick harvested `verify/fanout-1` group 3 (9 commits: fox-shocks, suspension-small,
  wheels-boutique-2). Field-level promotions only; 3-way merge over the parked-fix wave preserved
  all 5,026 rows. Gates green (699/699, validate 0 problems, tsc clean), harness BYTE-IDENTICAL.
  Spot-checks: DVO Jade X size matrix exact (trunnion law holds), Reserve 30|HD exact; ridefox.com
  rate-limited (429) — its rows carry the worker's documented fetch logs. Verified 2,808 → 2,868
  (57.1% of 5,026). Worker messaged "continue" toward >60%.

## 2026-07-17 — Douglas's decision wave shipped: parked-data fixes + build-sheet badge + bias-r3 smalls

- Douglas answered the seat-12 decision queue: badge YES, bias smalls YES, parked items FIX,
  monitor = daily 8:52am scheduled triage (created, notify-only-on-actionable), Continental
  Soft=Medium KEPT (middle-of-ladder reasoning), kids-gear + home page stay parked.
- **fix/parked-data-items merged** (chip, e7f3ab7): Highball R wheel repointed to the 6-bolt
  Reserve 30|TR AL pair (SRAM MTH hubs are 6-bolt-only; the old M1900 Center-Lock pick was the
  wrong side); Aeffect R stem dup retired to ALIASES + 3 fills repointed by hand (completebike
  fills don't pass canonicalId); SB135 T2/T3 fills rebuilt from T2's own Vital spec page (+XM 1700
  27.5 wheel rows, Yeti Carbon bar, ODI Elite Pro, Fox Transfer Factory; HS2 rotors 200f/180r;
  Motive Silver kept per Yeti's own kit list over Vital's conflicting G2 claim — maker wins);
  gr-wtb-wafel dup retired to ALIASES. 5,025 → 5,026 parts.
- **ui/cb-verified-badge-bias-smalls merged** (chip, 7715116): new `completeBikeSheetVerified`
  predicate + distinct "🧾 Build-sheet verified" badge (134/436; the ✓-only Complete Bikes landing
  view no longer blanks — bias-r3 HIGH-2 closed); green-dot non-overclaim disclosure line in the
  legend; Schwalbe `bikepark` casing → DH chip; unmapped tire compound/casing values surface under
  a UI-only "Other/unrated" bucket (won't-guess contract untouched — classifiers still never
  guess). +4 tests (699).
- Merged sequentially onto 8df444b, four gates green after both (validate 0 problems ×2 catalogs,
  699/699, tsc clean), verdict harness BYTE-IDENTICAL across both merges, popup scan clean.
  Pushed `8df444b..425f129`.

## 2026-07-17 — Seat 12 seated; verification fan-out batch-group 2 merged (verified 2675 → 2808)

- **Seat 12 coordinator seated** (worktree `coord-2026-07-17`); seat 11 archived after its handoff
  block + succession commit (`1d58c23`) confirmed on main. Hourly watch loop re-armed (session-only).
- **Harvested the pending `verify/fanout-1` batch-group** (31 commits: fanout-1-dvo, -dtswiss,
  -forks-rockshox, -forks-other, -forks-other-2, -mixed, -shimano, -wheels-boutique):
  field-level promotions ONLY, 5,025 rows before and after, no id changes. Bike verified
  2,675 → **2,808** (validate 0 problems; kit 409 unchanged). Four gates green (695/695 tests, tsc
  clean); verdict-audit harness delta = annotation-only (low-rotor-watchlist verified-fractions
  rose: dvo-onyx-sc 1/6→6/6, dvo-diamond-d1sl 0/1→1/1, srsuntour-durolux 1/3→3/3) — ZERO verdict
  movement. Spot-checks: vitalmtb Onyx SC, dvosuspension Diamond D1, sram fs-pike-bse-c1, wtb
  wafel.js all exact; srsuntour.com timed out (worker-documented basis accepted). Worker correctly
  DECLINED the Fox 36 PE MY27 150 promotion (press-only travel point) and left the 3 PARKED items +
  gr-wtb-wafel dup flag untouched (dup noted for a future dedup pass). verification-job.json state
  legit: Verified 2290→2678, Pending grew via auto-sync of the complete-bike-era rows. Merged
  `1d58c23..7289ded`; worker messaged "continue".

## 2026-07-17 — Coordinator seat 11 close-out: trust wave lands (kit 57%, IS fix, bias r3 clean)

Final seat-11 wave, all CI green. **IS-mount adapter tier merged** (`f1685b4` — bias-r3 HIGH-1
closed): the 3 IS frames went 0/104 calipers buildable → 100/104; PM-on-IS = adapter warning with
structured fix (sourced from Shimano DM-SMMA00A + Banshee's and Cotic's own pages); FM-on-IS
correctly stays an error; coordinator adversarially re-verified every direction; harness
byte-identical; 695 tests. **Kit verification fan-out merged** (`3d3be53`): kit 293 → 409 verified
(57.3%, past the 55% goal); the new unblockers revived Fox Racing/Giro/Bell/Five Ten/Pearl Izumi/
Bolle; 6 Leatt gloves un-flagged (stale clearance-URL artifact); 4 rows removed with evidence; two
genuinely structural walls documented (Specialized apparel client-side pricing, iXS no-USD).
**Bias audit r3 merged earlier today** (`4603d38`): no favoritism, both R2 HIGHs resolved/disproved.
**Capability day:** Bright Data CLI (OAuth'd; Specialized + web.archive.org walls dead), Exa MCP
(Trek JS-wall dead), fork nominal-weight policy extended, push notifications enabled, AllTrails +
Canva connectors landed. Two unexpected shutdowns survived with zero merged-work loss (checkpoint
discipline; crash-triage drill now routine). STILL RUNNING at handoff: the bike-catalog
Verification MEGA fan-out (verify/fanout-1 — 2,735+ verified already integrated in its worktree,
Shimano-PDF worker the long pole; seat 12 harvests). Seat 11 → seat 12 handoff written.

## 2026-07-17 — Coordinator seat 11: grind #7 (+100, 436 bikes / 5025 parts) + the structural wave lands

Five lanes wrapped across the overnight ticks, all merged + CI green. **Grind #7 (`d7aec32`):
complete bikes 336 → 436, catalog 5025 parts** — model-year depth (prior-gen platforms with real
archived sheets), thin disciplines (first DJ completebikes, +14 DH, +20 XC race), 8 new makers,
vocab widenings (brakeMount +IS unlocking Cotic/Banshee; +shimano-8/+trp-evo7-dh; 3 headTube codes),
disciplined drops (gearbox drivetrains flagged as a genuine schema gap, not forced). **Coordinator
caught 3 MORE rotor-ceiling conflations at merge review** (the XCM34 class — factory builds warning
against their own stock rotors): XCR34-2CR sibling carry-over + the Focus Thron frame/fork pair
("Post Mount 180mm" = native mount size; Focus ships 203 both ends) — all corrected to the
factory-evidenced floor with in-desc provenance; 1 ambiguous case (Highball R 6-bolt-rotor-vs-CL-hub
— one side is wrong, picking blind would fabricate) HELD + flagged. Also merged this wave:
**testability refactor** (`c3e7f09` — 4 tested modules, +51 tests, parity proven byte-identical
twice); **harness partial-wheel upgrade** (`d97391b` — D 11→15 incl. the C-1 repro pinned, negatives
+ clean-direction guards); **price-drift holds resolved** (`e676e81` — 3 of 4 overturned by fresh
fetches, 1 phantom Maxxis dup retired via ALIASES); **support-parts batches 1–3** (`c9f9970`,
`f2880a0`, `95300e4` — +17 verified, 8 corrections, honest walls documented; session wound down
with the ~980-row remainder triaged for a future per-brand fan-out). Suite now 688 tests.
Open for Douglas: fork nominal-weight policy question; Race Face Aeffect R stem dup; Highball R
rotor/hub adjudication; SB135 T2/T3 fills-granularity; verified-badge + kids-gear decisions; home
page (reminded). All worker sessions archived; only Affiliate remains open.

## 2026-07-16 (evening) — Coordinator seat 11: +138 bikes, a CRITICAL false-fits killed, kit women's breadth

Four workers landed at once; all merged, all CI green.

**MEGA grind #6 (`9378261`): complete bikes 198 -> 336 (+138), catalog 4521 parts.** 6 waves, ~35
parallel catalog-workers, 6 Opus auditor passes (one per wave). Landed 138 not 150+ because genuine
exhaustion set in by wave 5-6 and workers DROPPED rather than fabricate — the right call. Additive
vocab widening for budget-hardtail fitments (rearAxle +Boost141 +135x5-qr, frontAxle +9x100-qr,
steerer +straight, crankBb +powerspline +square-taper, +microshift-advent-mx), each maker-sourced
with an explicit do-not-conflate rationale (conflating any would be a false "fits"). Its auditors
self-caught 6 real defects incl. a fabricated `minRotorR` causing a false rotor ERROR and a Whyte
Secta `udh:false` causing a false Transmission error. Error-tier task resolved: Trek Fuel EX Gen 6
shockMount re-verified via 3 fetches — 185x55 TRUNNION is CORRECT (the 205x60 figure belongs to the
unrelated Gen 7 platform); no change needed. **COORDINATOR CATCH at merge review:** the new
`fk-srsuntour-xcm34-lo-29-130` carried `maxRotorF:160` read off the page's "Postmount 160mm" — that
is the NATIVE mount size, not a rotor ceiling — which made `cb-cannondale-habit-ht-2` warn against
its OWN factory spec (that bike ships a 180mm rotor on that fork). Corrected to 180, matching the
fix this wave's own auditor had already applied to the Fox 32 Rhythm; same conflation, one row
missed. (My first patch attempt broke the desc string on unescaped apostrophes — `node --check`
caught it immediately, exactly why that rule exists.)

**CRITICAL engine fix (`6f4a151`) — the audit's C-1, a false "fits".** `effectiveWheel` returned
null unless BOTH halves of a build-your-own wheel end were picked, silencing rule areas 1/2/6/9/14:
a 20x110 DH hub on a Boost fork returned ZERO errors and a GREEN dot until a rim was added; all 49
hub/rim rows dotted green against any build. The fix agent found a SECOND masking path the audit
missed (`placementDiff` didn't clear mutex partners, so rims dotted against an impossible baseline)
and corrected the audit's own "nothing needs weakening" claim (off by one — one test was retitled,
not weakened). +11 additive tests (616 total). Coordinator-verified the repro by hand: now errors
with correct wording and dots RED; 9 of 49 hub/rim rows correctly red on a 29 Boost build. Harness
BYTE-IDENTICAL — and that is itself the finding: the harness never assembles a partial wheel, so it
had ZERO coverage of this bug's shape and stayed green for C-1's whole lifetime.

**Kit grind #3 (`04da059`):** women's-fit rows 8 -> 19 (real SKUs only), all 8 flagged Dakine rows
dispositioned with evidence (Syncline/Thrillium are now women's-only — retargeted; 3 with no SKU in
either gender marked discontinued), the Alpinestars BNS price conflict closed by re-fetch ($44.95
confirmed), a non-existent TLD "Sprint LS" retargeted to the real Sprint Pro. Honest holds: no Five
Ten women's shoe (sources disagreed), body armor's $93 floor confirmed REAL not a data gap.

**Code-quality audit (`23de72f`, doc-only):** verdict — engine is O(1) in catalog size (no scale
cliff at 10x), no rule violations, `e22189a` confirmed SUPERSEDED (memory corrected, stop chasing
it). Structural finding for Douglas: logic in index.html's inline script can't be unit-tested, so
the week's headline features (MSRP policy, sliders) ship unguarded behind green suites — which is
how C-1 hid.

**Support-parts verification** was blocked by a stray uncommitted diff + stale worktree and
correctly REFUSED to stash/reset someone else's work; the blocker later resolved itself (worktree
clean, and that Canyon work was already on main via grind-5). Session resumed with a rebuilt queue
(1942 unverified rows now) and the poppler unblock. Also this session: poppler-utils proved ALREADY
INSTALLED (the "not installed" blocker was false — documented in VERIFY-PROTOCOL `44688e2`, unblocking
~48 Shimano PDF rows); Douglas's UI round shipped (dual-ended range sliders + complete-bike facets,
two size revisions, rear-travel relabel + frames sliders, per-size specs fix, Kit Builder underline).

## 2026-07-16 — Coordinator seat 11: kit verification merged (+68, 4 fabricated rows purged)

Merged `verify/kit-parts-1` (`e21281c`): kit verified 131 → 199 of 688 (8 brand-cluster workers,
81 commits — the crash-restarted run, commit-per-brand held). Two same-page price contradictions
resolved by live re-fetch under the MSRP policy; **4 fabricated rows REMOVED** (Nukeproof Sam Hill
flat shoe, iXS Trigger flat+clip, Giro Havoc LS — products that don't exist; purity beats count);
`'rheon'` added to the helmet rotational vocab (schema+types matched pair, pinning test added,
603 tests now). Coordinator audit: compat.js untouched, gates green, 5 new source URLs
spot-checked as real maker domains. Worker-flagged for Douglas (left in catalog): 2 suspect
Alpinestars shoe rows, a suspect Cratoni eyewear row, a Cairn KIDS' sunglasses row (scope
question), several likely-discontinued TLD/Royal/Sweet rows. Retry queue: Endura,
Adidas/Bolle/Sombrio/SixSixOne (fetch-walled), some ION/Yeti/Dharco (no live USD price).
With this, ALL FOUR parallel workers from today's fan-out are merged + archived; the watch loop
is retired. Day totals on main: complete bikes 108 → 198, kit verified 131 → 199, analytics live,
legal topo headers, pricing-bias fix, Fox/Öhlins maxTire, bias audit doc, 2 crash recoveries.

## 2026-07-16 — Coordinator seat 11: bias fixes shipped + grind-4 salvage merged (198 bikes)

Three parallel workers landed within one tick. **(1) Pricing fix (bias HIGH #1) auto-shipped**
(`aa0c08c`, UI tier): save/headline/sort all basis on MSRP; `streetPrice` renders as a labeled
"Sale $X" only; the Pivot Firebird (Jenson Exclusive) fell from #2 best-value of 164 to #101 and
its save badge corrected $5,057 → $1,458; `loadBad()` now rotates its broken-build demo across 10
makers instead of permanently casting Specialized. Coordinator post-hoc scan clean. Douglas's
pricing rulings recorded in memory (`pricing-display-policy`). **(2) Grind-4 salvage merged**
(`e7b9fa3` → pushed in `d98dfdd` push): 34 genuinely-new bikes extracted from the crashed
worktrees' uncommitted diffs (164 → 198 total; 5 dropped as grind-5 duplicates), 9 integration
defects fixed pre-commit, the 3 grind-2 missing ids confirmed dedup casualties, all 9 stale
worktrees cleared. **(3) Fox maxTire grind merged (bias HIGH #2)** (`d98dfdd`): Fox 40 family
2.5in (MY25 owner's manual) + the full Öhlins DH38 line sourced; Fox 36/38/34 left blank — a
STRUCTURAL finding: Fox's current docs publish no numeric clearance (only a physical check
procedure), and the 2017-era numbers are 26in-rooted, so entering them risked wrong verdicts.
The audit's Jeffsy-desc side-note was disproven in code (the 3mm rotor tolerance exists) — desc
kept. Harness byte-identical through both compat merges except C 214→219 (salvage frames);
maxTire adds warnings, never errors — spot-checked truthful. A push was correctly BLOCKED once by
the is-ancestor guard (pricing had landed mid-merge); rebase + re-gate + push, all CI green.
Open follow-ups: Fuel EX Gen 6 shock-mount discrepancy (two fetched sources say 185x55 std vs
catalog trunnion — error-tier, needs sourced review); Fezzari/Ari catalog gap; kit-verify grind
still running (80+ commits); verified-badge decision still with Douglas.

## 2026-07-16 — Coordinator seat 11: grind-5 merged (+50 bikes, 114 → 164) after surviving a second crash

The re-queued grind (#5) had ALREADY FINISHED before the day's second unexpected shutdown — and this
time nothing was lost: the commit-per-maker discipline (baked into its brief after grind-4's wipeout)
left 49 commits + 13 cluster branches intact through a hard power loss. Crash triage: repaired 2
corrupt refs + a zero-filled worktree HEAD + a corrupt index (both casualties were kit-verify
sub-agent worktrees with no commits), fsck clean; resumed all 4 worker sessions via send_message.
Merged `e6c4144`: 50 new complete bikes across the re-queued majors + wave-2 clusters, plus 6
sourced field-level corrections to existing frame rows (ids append-only, re-added in place).
Coordinator audit: e-bike scan clean; validate 0 problems (3969 parts, 2509 verified); vitest
602/602; tsc clean; harness — only section C rose 199→214 (15 new frames, 0 errors), A/B/D/E
identical. CI+Deploy green. Still in flight: kit-parts verification (restarted post-crash),
manufacturer-bias audit (4 commits), worktree hygiene sweep (74→40 so far).

## 2026-07-16 — Coordinator seat 11: analytics live + legal-page headers unified

Douglas's two pending decisions both closed same-day. **(1) Cloudflare Web Analytics is LIVE** — he
enabled it in the CF dashboard and handed the manual beacon token to the coordinator; shipped in two
phases to avoid a same-file race with the in-flight legal-header chip: `48a1cfa` (index + KitBuilder
heads) then `43c701e` (the 3 legal pages + the truthfulness rewrite: privacy §5's "No third-party
analytics" replaced with an accurate cookie-less/aggregate-only/no-fingerprinting description,
Cloudflare added to §6 processors with its privacy policy linked, meta description updated,
Last-updated bumped to July 16). No-tracking-cookies and no-advertising claims unchanged (still
true); no consent banner (none needed, and the hard rule bans one regardless). Beacon + new wording
live-verified by curl on buildmymtb.com. **(2) Legal-page topo headers** — Douglas: "yes it should be
the same"; a [Sonnet, low] chip shipped `b07efa1` (all three pages, light/dark/Loam DOM-verified,
minimal Loam plumbing scoped to the banner, RAD untouched, popup-scan clean, correctly rebased around
the analytics commit that landed mid-task). All CI+Deploy green.

## 2026-07-16 — Coordinator seat 11: modelYear backfill + grind-4 salvage (108 → 114)

**modelYear backfill merged (`6daa73b`).** Branch `catalog/modelyear-backfill` from a chip that fanned
out 6 per-category workers (RockShox susp / Fox+misc / boutique susp / frames+completebikes ×2 /
gen-tagged drivetrain). Populates the optional `modelYear` field only where maker-stated: frame
48→180/197, fork 33→330/359, shock 17→740/803, completebike 78→108/108 (all). **~370 rows deliberately
left BLANK** — continuous multi-year platforms (Nicolai/Geometron "2019–present"), thin-web boutique
builders, conflicting gen-year signals, bot-blocked pages. No fabrication (a blank beats an invented
year). Coordinator verification used a **decisive proof rather than spot-checks**: stripping all
`modelYear:` tokens from both sides makes `src/compat.js` **byte-identical to origin/main** — so the
change is provably modelYear-only. Gates: validate 0 problems (3729 parts), vitest 602/602, tsc clean,
and the verdict-audit-harness came back **byte-identical to baseline** (correct — modelYear is
annotation-only and never feeds `checkBuild`). CI+Deploy green. Worker-flagged follow-up (not applied,
out of scope): 3 Manitou Mezzer Expert rows lack a `gen:'G2'` tag mapping them to the right generation.

**grind-4 killed by an overnight shutdown — 2 of 8 clusters salvaged (`d3e63ac`, +6 bikes, 108 → 114).**
Douglas paused and powered off mid-run; on restart the session's own task-notification reported 6
cluster agents stopped with **no completion record**. Checking `rev-list --count origin/main..<branch>`
per cluster branch showed the truth: the 6 (Trek+Cannondale, Giant+Scott, Specialized,
Canyon+Commencal+YT+Propain, Norco+Transition+Kona+Orbea, Ibis+SantaCruz+Yeti+RockyMountain+Devinci)
died with **0 commits — genuinely lost**, while `cb-grind4-hardtails` (1 commit) and `cb-grind4-roundout`
(2 commits) had committed and survived fully intact. Salvaged both: **HARDTAILS** (a live priority) —
Chromag Rootdown GX (a real second build tier on the same in-catalog `fr-chromag-rootdown` frame, zero
new part rows needed) + Ragley Marley 1.0; **ROUND-OUT** — GT Force/Sensor Carbon Elite, GT Zaskar LT
Expert, Focus Jam 6.8 (explicitly the non-electric trim). The two branches collided as a **pure-additive
conflict** (both append completebike rows at the same array location); resolved by keeping BOTH sides —
the seam needed no comma surgery (ours already ended `},`) — with an immediate `node --check` parse
verification per the string-splice rule. Audited: e-bike scan clean on both; validate 0 problems (3763
parts, 2457 verified); vitest 602/602; tsc clean; harness section-compare — ONLY section C rose 197→199
(the 2 new frames, still 0 errors), sections A/B/D/E identical (D adversarial 11/11 caught, 0 missed).

**Lesson recorded in COORDINATOR-HANDOFF §5 (learned expensively):** brief every grind worker to
**commit per MAKER, not per CLUSTER** — the clusters that committed survived a hard shutdown; the ones
that batched to cluster-end lost everything. And **salvage before re-queuing** a dead fan-out run.
Remaining grind-4 scope re-queued as chip **grind #5** with incremental-commit discipline baked in.

## 2026-07-16 — Coordinator seat 11: 200-bike grind-3 merged (+51 complete bikes, 57 → 108)

Merged the 200-bike Complete Bikes grind-3 harvest (`0bd7d54`, branch
`catalog/complete-bikes-grind-3` from `local_c638126f` — an orchestrator that fanned out 8 parallel
per-maker `catalog-worker` clusters + 4 adversarial `catalog-auditor` (Opus) agents). **+51 complete
bikes across 25 makers, 57 → 108 total.** Makers: Santa Cruz 9, Specialized 11, Pivot+Yeti 8,
Giant+Scott 6, Evil+Cannondale 5, Merida/Cube/Focus/Intense 5, Boutique (Revel×3/Chromag) 4, Trek 3.
Verified/sample split ~19/~32 — sample-heavy where makers are fetch-walled (Specialized 403,
Trek/Pivot/Yeti JS-walled or dealer-only); every sample row's fills are REAL stock parts sourced via
a fetched dealer/vitalmtb/99spokes page, never fabricated. Row descs document each substitution
("flagged") and OMIT parts (pedals/headset) rather than invent them — honest data, on-values.

**Additive tire-vocab widening** (`schema.js` + `types.js`, mirrored): casing `'grid'`/`'control'`
and compound `'gripton-t5'` — Specialized's own named tiers, sourced via fetched bikeradar reviews;
annotation-only axes that never feed `checkBuild`. The grind's two self-audit fixes are included:
Santa Cruz OE bar clamp (new `hb-santacruz-20-carbon-760`, 4 fills repointed, killed a false
stem-shim warning) and Giant Reign front-tire compound MaxxGrip→MaxxTerra; two parallel-merge
duplicate ids resolved. The worker's one-off `scripts/resolve-additive-conflict.js` merge helper was
intentionally **excluded** from main (grind tooling, not product code).

**Coordinator-audited before merge (independent of the grind's self-audit):** e-bike hard-rule scan
CLEAN (grep over-matched on substrings — every hit visually confirmed a non-e MTB); applied via the
stale-base own-additions pattern (base == main tip, zero conflict); `validate` 0 problems (3729
parts, 2451 verified); `vitest` 602/602; `tsc` clean; **verdict-audit-harness section-compare vs
`origin/main` via stash** — the ONLY delta is section C clean-assembles 182 → 197 (the new frames,
still **0 errors**); sections A/B/D/E **byte-identical** (D adversarial 11/11 caught, 0 missed — no
false-fit regression; E same 4 pre-existing DVO/SR-Suntour fork flags — batch added no new
false-warn). CI + Deploy green (`29465447219`/`208`, 36s/38s).

**Session hygiene:** resolved a **duplicate-coordinator collision** — two live seat-11 sessions
(this Opus seat + a Sonnet/max `local_601ae113`). Douglas chose this one ("this coordinator lives");
archived `601ae113` (its work — a PROJECT-LOG backfill + the mega-grind archive + the xc-dropper
recovery — was already on main, nothing lost), plus seat 10 ("Project Manager Retired 1") and the two
finished workers (mega-grind #1 `4f36df6a`, xc-dropper `b4d73300`). Ran a 30-min monitor loop
(CronCreate `7,37 * * * *`) on the grind per Douglas — do-not-trust-`isRunning`, wait for the real
report + a branch — then cancelled it on merge. **Next queued:** the modelYear backfill (now
unblocked — both complete-bike grinds settled).

## 2026-07-15 — Coordinator seat 10 → seat 11 succession (log catch-up + orientation findings)

**Seat 10's wave (not separately logged at the time — backfilled here for trail continuity):**
merged the Complete Bikes mega-grind #1 (`be35895`, +51 bikes across 25 makers, 6→57 total,
coordinator-audited: verified rows spot-checked against real maker sources, no e-bikes, harness
delta confirmed benign — only the section-C clean-scenario count moved 169→182 for the 13 new
frames); shipped the complete-bike list-card height fix (`562859a`,
`.cb-priceaction{display:contents}`, uniform 59px matching frames/other categories per Douglas:
"don't change the others to match, change complete bikes to fit"); swapped the legal-page contact
email to `Doug@buildmymtb.com` (`47c310d`, Cloudflare routing confirmed live); landed the per-frame
`noStockDropper` flag (`00318cf` — this IS the "xc discipline dropper exemption" task's actual
shipped output, see below). All four gates green throughout.

**Seat 11 orientation: resolved a false "lost engine work" alarm — no data actually lost.** The
open session tracking "Add xc discipline to dropper slotRequired exemption" (`local_b4d73300`) had
reported readiness to merge, but both its tracking branches (the origin PR branch
`fix/xc-hardtail-dropper-completeness` and its own session branch) pointed at old, unrelated
commits — its worktree folder (`elastic-aryabhata-b1f508`) had no `.git` linkage and wasn't a
registered worktree, so its git operations (rebase/commit/push) had been silently landing on the
SHARED checkout the whole time (the recurring orphan-worktree hazard, confirmed for the first time
to also hit a worker session, not just coordinator seats — 4th-5th occurrence project-wide; see
the `orphan-worktree-hazard` memory for the new dangling-stash recovery recipe). Recovered its
stashed WIP via `git fsck --unreachable --no-reflog` (a dangling 3-parent stash commit,
"xc-dropper-completeness wip") and diffed it against current main: **byte-identical to `00318cf`**,
already shipped by seat 10 as the `noStockDropper` flag. The session's own engineering judgment — a
per-frame sourced flag, NOT a blanket xc-discipline exemption, since most xc-tagged frames ship
with a dropper as stock and a blanket rule would create false-complete builds — was correct, and
it's already live, tested (`test-golden.js`), and additive-only (zero effect on any existing
catalog row until a future sourced entry sets the flag). Nothing left to merge; messaged the
session explaining this and recommending it for archive. Also confirmed + archived Complete Bikes
MEGA-grind #1 (`local_4f36df6a`) per its own final report (fully merged, nothing further to do).

**State confirmed with fresh gates, not doc counts:** origin/main `3db5380` → 3454 bike parts + 692
kit parts, 0 problems (2403/1051 bike verified/unverified, 131/561 kit), 602/602 tests, tsc clean.
Seated on `coord/2026-07-15-seat11` (a distinct worktree name from seat 10's still-present
`coord-2026-07-15`, which hadn't been archived yet at seed time — seat 10 was mid-self-archive via
direct Douglas confirmation, session retitled "Project Manager Retired 1"). Left untouched and
running: the 200-bike Complete Bikes grind (`local_c638126f`, orchestrator fanning out
catalog-worker/catalog-auditor agents on `catalog/complete-bikes-grind-3`) and the Affiliate Setup
session (`local_e301505a`, idle).

## 2026-07-15 — Coordinator seat 9: Kit Builder line + cog sub-chip merged live

- **KIT BUILDER LINE MERGED to main (`8d919e8` + `b8929f0`), `KIT_ENABLED=false` (invisible until
  Douglas flips it).** Per Douglas's seat-9 directive (no longer gated on his preview — merge it).
  Two clean commits over current main:
  - **(a+b) Foundation + three-pane redesign** — `feat/kit-builder-redesign` *contains* the
    foundation (foundation +1), so one squashed landing delivered both: kit schema for 12 optional
    categories (schema.js/types.js), `src/kit.js` (KIT_GROUPS/SLOTS/PARTS + totals), the
    `/KitBuilder` page mirroring the Bike Builder's three panes, main-page nav button, deploy
    stanza, `test/test-kit.js`. Applied with `git apply --3way` over main's moved
    schema.js/types.js/index.html — clean.
  - **(c) All 12 category grinds harvested → 34 seed fixtures to 692 kit parts.** Each
    `grind/kit-*` was based on the foundation and touched ONLY `src/kit.js`; applied each's own
    additions. **Per-category counts cross-checked equal to each grind branch** (nothing dropped/
    double-applied). One adjacent-region collision (bodyarmor↔neckbrace) resolved by keeping both
    blocks, then removing the 2 foundation neckbrace seed fixtures the grind supersedes so no
    duplicate ids survived (validate.js was the safety net that caught them).
  - **MTB-only scrub:** dropped `ewr-oakley-airbrake-mx` (Oakley's motocross goggle SKU; a separate
    Airbrake MTB exists). The named moto pants (Alpinestars Techstar Envision / Nevada) were already
    absent from the grind branches. Kept honestly-tagged DH/park-crossover protection (moto-heritage
    but MTB-used) rather than open gaps. No tier-padding, no row-per-size, no dup brand+model.
  - **No-e-bike hard rule:** neutralized e-bike/e-MTB language in 3 MTB-helmet descs (Fox Rampage,
    Fox Dropframe Pro, TLD Flowline SE) — MTB helmets that merely also carry the NTA-8776
    speed-pedelec cert; the grind correctly never asserted that cert, only the prose foregrounded it.
    Helmets kept, e-bike framing removed. (`urgebike.com` sources are the Urge brand domain.)
  - Kit is fully isolated from `checkBuild`: no compat.js changes, **verdict-audit harness
    byte-identical** at every step; bike catalog unchanged (3130 parts).

- **SINGLE-SPEED COG → Drivetrain sub-chip MERGED (`3cff400`).** Harvested from
  `feat/cog-under-drivetrain` (grind session done, its own CI green). Engine-tier review:
  structurally **display-only** — the cog stays an ordinary top-level pricing group (own slot key /
  bundleActive / buildTotals / slotRequired / presetBy); the only engine addition is a
  `parent:'drivetrain'` marker (types.js documented). index.html's new
  childGroupsOf/railTarget/renderChips-skip/subCatsOf/groupCats browse it as a Drivetrain sub-chip.
  ss-rules + DJ single-speed completeness untouched. Tests **strengthened** (test-dj-singlespeed now
  pins `cog.parent==='drivetrain'` AND that the cog slot is NOT one of drivetrain's own slots).
  Harness byte-identical.

- **Gates every push:** validate 0 problems (3130 bike + 692 kit) · vitest 587 · tsc clean · harness
  identical. CI + Deploy green on every push. Re-fetched origin + FF-checked before each.

- **KIT BUILDER FLIPPED LIVE (`042eb3a`), `KIT_ENABLED=true`** — Douglas's explicit call later the
  same session. Browser-verified locally before shipping (the `/KitBuilder` page renders all 12
  rails with live counts / add-to-kit works / zero console errors; the main page shows the "Rider
  kit" nav button); CI + Deploy green → public on buildmymtb.com. **Cleanup:** 15 sessions archived
  (seat 8 + redesign + cog + 12 grinds), all merged local + the 15 spent remote kit/cog branches
  pruned (Douglas-approved), worktrees removed. (Infra note for a future pass: GitHub Actions warns
  the checkout/pages/setup-node actions still target the now-deprecated Node 20 — non-blocking, deploy
  still succeeds.)

- **Kit list-row alignment fix (`b772486`)** — the dense-list rows had the price pinned to the row
  top while the Add-to-kit button/verified badge centered (independent `align-items:center` per
  column). Switched the list-row grid to `align-items:start`; size-chart `<details>` moved below the
  grid. Browser-verified (price/badges share a line, button/verified share the next). UI worker chip.

- **HARDTAIL LIVE-PUSH (`cf80ee1` + `9311ba8`)** — hardtails were already live (31 frames + engine
  support) but not discoverable. Added a Full-suspension/Hardtail frame sub-filter + a "Hardtail
  build" sample (shock-free, property-test extended); +3 audited hardtail frames (Vitus Sentier,
  Chromag Rootdown, Ragley Blue Pig → 34) and re-verified the existing 22. Flagged for a future
  brake pass: Cotic BFe / Chromag Doctahawk need I.S. brake mount + the catalog has zero I.S. brakes.

- **ROTOR-CLASS TOLERANCE engine fix (`9019a24`)** — surfaced by the complete-bike review: rule 10/10b
  strict-compared rotor size to frame/fork max/min, so a Shimano 203mm rotor false-WARNED on a SRAM
  200mm-labeled max and a 200mm rotor false-ERRORED on a 203-min fork (200≡203, 220≡223 are the same
  rotor class). Added a bounded 3mm `rotorOverMax`/`rotorUnderMin` grace to all four sites + 8 tests;
  harness delta verified to be ONLY the intended false-warns (6→4 fork families). Fixed a latent
  harness bug too (probe E re-implemented rule 10 instead of calling the engine). Systemic — cleared
  false verdicts across a large slice of the catalog (88 forks at maxRotorF:203, etc.).

- **COMPLETE BIKES — foundation + first flagship LIVE (`31c2d62`)** — per COMPLETE-BIKES-SCOPE.md's 9
  locked decisions (Douglas 2026-07-15). `completebike` whole-build preset reusing the fills/lint/
  weight machinery (fills = factory OE parts only; pedals empty); auto-fill; dual-price block (Buy as
  parts vs Complete + You save); dedicated browse surface; MSRP + optional streetPrice with a
  discount-only guard. First bike: **Commencal Meta SX V5 Essential** ($4,400; ~$5,849 as parts →
  save $1,449) + 11 honestly-sourced OE rows. Ships straight to live (decision #8, no gate).
  **Verdict-clean 0 errors / 0 warnings** (Douglas chose fix-root-cause-first → the rotor tolerance
  landed first so the flagship debuts perfectly clean), pinned as a golden. Browser-verified live:
  browse → Build this bike → auto-fill → "no conflicts found" + the dual-price story. Foundation +
  rotor + hardtail worker sessions all archived, branches/worktrees pruned.

## 2026-07-14 — Coordinator seat 8 (succession)

- **HARVEST BATCH (evening): 5 landed on main.** (1) **"Best match"→"Random" sort** (`7c73008`) —
  real `fisherYatesShuffle` in compat.js (NOT the biased comparator), stable per page-load, no brand
  clustering; the unbiased-value fix. (2) **GX AXS "no cassettes" = NOT a bug** (`5c5b4e7`, tests
  only) — worker verified via node harness + local + LIVE prod that a GX Eagle AXS controller+mech
  correctly leaves 5 Eagle cassettes green; the empty list was the "🟢 Compatible only" filter hiding
  cassettes correctly incompatible with another build part (MicroSpline/XDR rear wheel or non-Eagle
  chain). Refused to alter correct code (would risk a false "fits"); added 4 dot-level pinning tests.
  **UX follow-up candidate:** explain WHY cassettes are hidden ("N hidden: incompatible with your
  rear wheel's driver"). (3) **"Own it" build-panel button AUTO-SHIPPED** (`ecb680b`, UI-tier) — a
  per-slot inventory button reusing the existing card "Own it" logic + gating; post-hoc re-gated
  clean. (4) **12 Garbaruk cassettes** (`2e081e1`, all verified) — aftermarket wide-range, each
  mapped to one system (cross-compat checked, no overclaim); non-cassette range (40 chainrings,
  cages, pulleys, guide) inventoried — no catalog category, future decision. (5) **COMPLETE-BIKES-
  SCOPE.md** merged — buyable whole builds that auto-fill + dual price (component total vs maker
  MSRP), maps to the existing preset/buildTotals machinery; decisions await Douglas. NOTE: seat was
  briefly stale (own-it auto-shipped after last sync) → rebased the sort/gxaxs commits onto it.
  5 sessions archived + branches/worktrees pruned. CI green throughout.
- **HARVEST WAVE 2 — all remaining code branches landed.** (6) **Drivetrain-above-Wheels rail
  reorder** (`34141d8`, Douglas-confirmed live — I held it for his OK since the request came via a
  worker session, not directly; GROUPS order is UI-only, harness byte-identical). (7) **Spec-card
  collision fix** (`0d5cef6`) — root cause was a stateful row counter overflowing at 13+ filled
  slots (bb+headset), redrawing the 13th group atop BRAKES; rewrote to filter-filled-first + unique
  row index + dynamic height + front/rear name dedupe. (8) **Wheel→tire auto-select** (`0d5cef6`,
  same commit) — matched sizes pre-select (29→29), mullet safely falls back to "all" (one shared
  size filter; flagged a front/rear split as a possible follow-up). (9) **Seatpost unification**
  (`8a8416b`) — one "Seatpost" rail group, Dropper/Rigid sub-chips, TWO slots with declarative mutex
  (wheel-group altOf precedent → no double-count, ZERO migration, rules 13/13c untouched, old links
  load, harness byte-identical); dropper default, DH/DJ rigid, per-frame override field unset.
  index.html conflicts at the two activeGroup handlers resolved field-level each time (sort's
  reshuffle + tire inherit + defaultSubFor all kept). CI+Deploy green on every push. **NOTE:** seat
  went stale twice tonight (own-it auto-ship) — rebase/field-merge handled it; the recurring
  activeGroup-handler conflict is the hot line, resolve by stacking all three behaviors.
- **STILL GATED ON DOUGLAS (only remaining open work):** the **kit line** (foundation + redesign +
  12 deepened grinds — all DONE, staged for his localhost preview at :8127; merge order
  foundation→redesign→grinds with the MTB-only scrub, after his OK) and `feat/builds-gallery`
  (awaiting sign-off). Their sessions stay open until the kit line merges (avoids a pile of archive
  prompts). Everything else is merged + swept. Also awaiting Douglas: complete-bikes decisions,
  fork/shock per-size-shock design, Atherton, and the optional GX-AXS "why hidden" UX hint.

- **KIT BUILDER kicked off — decisions locked + build/grind chip spawned.** Douglas made all 9
  scope calls (recorded in `KIT-BUILDER-SCOPE.md` §Decisions). Two overrides from the scope's
  recommendations: (1) it's a **SEPARATE PAGE** (a "Kit Builder" button on the main page →
  `/KitBuilder`, same-style button back), not an in-builder section — so **kit total only**, no
  combined total; (2) **shorts and pants are SEPARATE categories**. v1 = 12 categories (helmet,
  shoes, jersey, shorts, pants, gloves, knee, elbow, body armor, neck brace, shin guards, eyewear),
  ALL optional, none required; no hydration/base-layers. No shoe↔pedal bridge (shoes flat/clipless).
  Cert = badge/filter fetched-source-only. `KIT_ENABLED` gate, **preview-before-live**. One
  `[Fable, high]` orchestrator chip (`feat/kit-builder`) builds the foundation (schema for the 12
  cats + the /KitBuilder page + routing + deploy.yml) then fans out pinned-Sonnet sub-agents to
  grind all categories at once; presents a branch for Douglas's localhost preview (NOT auto-shipped).
  Key isolation guarantee to verify at harvest: kit adds ZERO checkBuild rules — the verdict-audit
  harness must prove the bike engine is behavior-identical.
- **Kit Builder RESTRUCTURED (Douglas) — foundation-only chip + 12 separate grind chips.** Douglas
  didn't want the category grind on Fable; split into (1) a foundation-only `[Fable]` build and (2)
  12 per-category `[Sonnet]` grind chips in separate sessions. **Foundation DONE + staged**
  (`feat/kit-builder`, 5f7caec): 12-category schema (separate `KitPart` union to dodge tsc union
  complexity), the `/KitBuilder` page via a **`KitBuilder/index.html` directory-index** (cleanest
  static route, no SPA hackery; deploy.yml stages it), `KIT_ENABLED=false` (live-safe merge), a
  34-row starter seed, `kitTotals` self-contained. **compat.js UNTOUCHED; verdict-harness
  byte-identical → kit provably isolated.** 4 gates green (validate 0 · 575 tests +25 kit · tsc
  clean · harness 0-delta). **STAGED for Douglas's localhost preview** (KIT_ENABLED flip + serve
  `/KitBuilder/`) — NOT merged (his preview-first call). **12 grind chips spawned** off
  `feat/kit-builder` (helmet/shoes/jersey/shorts/pants/gloves/knee/elbow/bodyarmor/neckbrace/
  shinguard/eyewear), each self-contained: one-row-per-PRODUCT (sizes as labels), per-category id
  prefix + KIT_CERTS cert tokens (fetched-source-only; neckbrace cert dormant), pads/shoes weigh
  per pair, no size/color in ids. **Merge order at harvest: foundation to main FIRST (after his
  preview OK), THEN the grind branches** (they reference the kit schema, so main needs it first).
  ⚠ `tools/DATA-ENTRY-TEMPLATE.md` still lacks the kit entry rules (baked into each grind brief
  instead) — add a kit section when the foundation merges. Builder session archived + pruned.

- **Carbon/alloy frame-variant work MERGED (3117→3126, +9 rows).** Part A split the 2 audit-gap
  rows (Rocky Mountain Instinct base=carbon + new `-alloy` sibling; Trek Top Fuel Gen4 base=carbon,
  alloy sibling withheld — unresolved BB divergence, flagged). Part B added 8 siblings (Kona
  Process 153 Carbon, Propain Spindrift AL, Trek Session C 29, Trek Fuel EX AL Gen6, RM Slayer
  Alloy, Devinci Troy Carbon, Transition Smuggler Alloy, Nukeproof Reactor 290 Carbon). Reviewed
  in-seat: inherited interfaces are shared-platform + flagged per-row; real alloy-vs-carbon deltas
  independently sourced (Smuggler 34.9 vs 31.6 seatpost, Session trunnion vs std shock, Transition
  ZS-vs-IS headset convention); nothing fabricated, no e-bikes. Long "checked, NOT split"
  (layup-tier) + "flagged, insufficient data" lists in the worker report — those are the future
  follow-up pool. Four gates green, session archived, branch/worktree pruned. **1 item for Douglas:
  Atherton A-Range is a scope question (different manufacturing process, not a material variant of
  the S.200) — include or not?**
- **Kit Builder scope doc MERGED (`KIT-BUILDER-SCOPE.md`).** Fable scoping round; decision-ready.
  Load-bearing conclusion: Kit is NOT a compatibility problem — a curated list with price/weight +
  cert badges + discipline filter, zero error-tier engine. 9 decisions await Douglas (relayed);
  grind stays unspawned until he signs off. Session archived.
- **Gallery MVP security audit: GO (Opus, independent).** No data leak, no auth bypass, no XSS, no
  secret exposure, no pop-up, no e-bike — each attack surface traced to the deciding RLS line.
  **F1 (LOW/MED, worth fixing before migration):** `created_at` is client-writable → back-date to
  dodge the 10/day cap AND future-date to pin a build atop the "newest" grid (undercuts the
  unbiased-ordering value). One-line trigger fix (`new.created_at := now()`). F2 (cap TOCTOU race)
  + F3 (inert `photo_path` column) accepted. Findings on `origin/audit/gallery-rls`; session
  archived. **Gallery awaits Douglas's sign-off to merge app code + run the migration** (security tier).
- **Price-drift sweep MERGED (65 corrections + 544 lastChecked refreshes).** NOT stalled after all —
  the session's `lastActivityAt` froze at 13:47 while it kept working (harness-timestamp quirk); it
  completed the full 1,332-verified-row sweep (713 deduped URLs, 17 clusters): 65 MSRP corrections
  (SRAM Maven $260→$330, Maxxis Minion SS off a sale price→$82, Fox Transfer 14 sizes→$329, six
  frames), 544 confirmed→lastChecked 2026-07-14, 718 unconfirmable (flagged, never guessed).
  price/lastChecked only. 3-way merge with 3 conflict blocks (recent material backfill + carbon/alloy
  siblings met the sweep) resolved field-level — kept material + the new sibling rows, re-applied the
  sweep's 3 price corrections + 7 Transition lastChecked bumps by row id. Four gates green.
- **8 e-bike-specific rotor rows RETIRED (NO-E-BIKES hard rule, 3126→3118).** The price sweep
  surfaced them live. Removed the 8 with explicit e-bike evidence in their own model/desc: Clarks
  CLE-01 ×4 (model "CLE-01 E-Bike", "2.3mm e-bike-rated") + TRP RS01E ×4 ("2.3mm e-bike-rated").
  No ALIAS (no successor); verify-job re-synced (tombstoned). NOT referenced by any preset/test.
  **KEPT (not deleted on suspicion, THE BAR):** TRP RS06E "Allround" ×3, RC04E ×2, RS05E "Race
  Rotor" ×2 — TRP's "E" suffix is NOT a reliable e-bike marker (RS05E is a race rotor) and their
  descs make no e-bike claim; flagged for a proper verification pass. Session archived, pruned.

- **Carbon+alloy frame-version policy (Douglas 2026-07-14): "if there is a carbon and aluminum
  version of a frame, include them both."** Recorded as an explicit split-policy row in
  `tools/DATA-ENTRY-TEMPLATE.md` (a genuine carbon-vs-metal pair = two rows; a carbon layup-tier
  split like SC C vs CC is NOT). Resolves the 2 audit gaps (Rocky Mountain Instinct, Trek Top Fuel
  Gen 4 — each one ambiguous row for a model that ships both ways). Sourcing chip spawned
  `[Sonnet, medium]`: split those 2, then sweep the frame catalog for any single-row model that
  also ships in the other construction and add the missing sibling. Append-only ids
  (`-carbon`/`-alloy`), two-tier sourcing, present a branch.

- **Seat 8 seated + seat 7 archived.** New coordinator on `coord/2026-07-14` off `origin/main`
  (`be0b141`), seat-7 worktree/branch pruned. Confirmed nothing left to harvest — seat 7's final
  wave already landed the wheels nominal-weight promotion + WAO Convergence transition + Reserve
  MS retirement. `node validate.js` = 3117 parts / 0 problems / 2293 verified. No open bug issues.
- **Frame-materials accuracy audit MERGED (`b159dc4`) — 1 fix + 11 backfills, CI+Deploy green.**
  Worker fanned out 8 `catalog-worker` sub-agents by brand cluster over all 156 frames. Merged the
  confident set via own-additions-apply: **FIX** `fr-atherton-s200` carbon-alloy→alu (the row's own
  desc said "Alloy lugged DH bike" — S-Series is aluminium tube/lug; carbon-alloy is Atherton's
  A-Series); **11 backfills** (commencal-absolut/kona-process-153/marin-alcatraz/santacruz-jackal/
  specialized-p3/nsbikes-zircus=alu, kona-shonky/dmr-sect/chromag-monk/octaneone-void=steel,
  orbea-occam-lt=carbon). Material→154/156 frames. **HELD** `fr-devinci-wilson-29` at maker-consistent
  `alu` (audit proposed carbon-alloy on editorial Vital MTB citing carbon seatstays + a
  non-structural carbon bashplate; the row's own desc says "Made-in-Canada alloy DH" from a fetched
  devinci.com page — our carbon-alloy token requires the MAKER's wording, the same bar the audit
  correctly used to defer GT). **OPEN JUDGMENT CALL for Douglas:** should editorial confirmation of
  carbon-front/alloy-rear promote to `carbon-alloy` when the maker's page only says "Carbon"? Affects
  `fr-devinci-wilson-29` + `fr-gt-force-carbon`/`fr-gt-sensor-carbon` (kept `carbon`). 2 rows left as
  honest gaps (rockymountain-instinct + trek-top-fuel-gen4 — identical carbon/alloy trims, no
  disambiguator). No e-bikes found (incidental SC "Vala AL" e-bike sighting, not in catalog, flagged).
  material is filter-only (never feeds checkBuild). Session archived; 9 stale `audit/frame-materials*`
  remote branches await a prune (auto-mode gated the remote delete — needs Douglas's OK).
- **carbon-alloy policy RESOLVED + applied (`f28a27f`, Douglas 2026-07-14).** Decision: reputable
  editorial confirmation of carbon-front/alloy-rear promotes to `carbon-alloy` even when the maker's
  page only says "Carbon" — same third-party-fact basis as the measured-weight exception. Applied to
  the exact set the audit surfaced: `fr-devinci-wilson-29` alu→carbon-alloy, `fr-gt-force-carbon` +
  `fr-gt-sensor-carbon` carbon→carbon-alloy. Policy recorded in the `schema.js` material-vocab
  comment (the only doc home for the token; stale S.200 example dropped). Four gates green.
- **Forum riding-style 'dj' migration written** (`supabase/forum-riding-styles-dj.sql`) — DJ went
  live in the catalog but both profile riding-style CHECK constraints (`profiles_riding_style_chk`
  singular + `profiles_riding_styles_chk` plural) still capped at xc/trail/enduro/dh/all, so a DJ
  pick would fail the write. Migration widens both to include 'dj' (idempotent drop+re-add;
  display-only, no policy/trigger touched → escalation-impossible + reserved-names unaffected).
  **Douglas runs it in the Supabase SQL editor.** Committed only — running it does NOT surface a DJ
  pick (the editor arrays `PROFILE_RIDING`/`PROFILE_DISC` still omit dj); the UI 'dj' option is
  held until AFTER he confirms the migration ran, to avoid a pick→constraint-violation race.
- **Icon design-session handoff written** (`ICON-HANDOFF.md`, repo root) — Douglas still dislikes
  the icons after 5 rounds; handoff reframes to a live-render interactive session (Fable/Opus) with
  the two-live-icon-systems inventory, the taste constraints, and the apply targets.
- **Price-drift-remainder chip spawned** `[Sonnet, overnight]` — ~1400 not-yet-checked verified
  rows; non-overlapping with the frame-materials audit (price/lastChecked vs material = field-level).
- **Builds Gallery — ALL SIX decisions made (Douglas): fast-follow photos, account required,
  post-moderation, NO kudos/likes (not just MVP-deferred, "not yet"), hard delete on unpublish,
  publish-gate = complete+zero-errors.** `BUILDS-GALLERY-SCOPE.md` §8 updated to record them —
  MVP is now fully decision-complete. Implementation chip spawned `[Fable/Opus, high]` (schema+RLS
  tier — new `gallery_builds` table, snapshot-on-publish, publish flow, gallery/detail pages,
  fork-to-builder, GitHub-issue reporting, sitemap Action, tests incl. a DJ-brakeless publish
  case). Presents a branch for coordinator review + adversarial RLS audit; does NOT auto-ship;
  Douglas runs the migration himself once reviewed.
- **Affiliate session: LLC name DECIDED — "Dubs Works."** All three clearance checks came back
  clean (PA registry, USPTO exact-wordmark, dubsworks.com domain unregistered); record at
  `LLC-NAME-CLEARANCE-DUBS-WORKS.md` (Affiliate's lane, untracked). Next steps (domain reg, PA
  filing, EIN) are Douglas-only; Affiliate will hand Coordinator a code-shaped request only once
  `Doug@buildmymtb.com` email goes live (the staged `chore/cloudflare-prep` branch is ready for
  that). No action needed here — logged for the cross-session trail per [[multi-session-coordination]].

## 2026-07-14 — Overnight watch (coordinator harvesting while Douglas sleeps)

- **Seat 7 closes clean: fabricated Reserve MS variants retired (`0f1e882`) → 3117 parts / 2293
  verified.** The last running session confirmed rw-reserve-30-hd-29-ms/-275-ms never existed
  (re-fetched Shopify variant JSON: XD-only) — both ALIASed to their real XD siblings, no invented
  successor; applied in-seat (its base predated today's Reserve wave), verify-job tombstoned the
  ids. Every session is now archived, every branch harvested or deliberately held
  (bike-type/kids-striders + dj-bmx, chore/cloudflare-prep, 3 design selection branches,
  honeycomb keepsake). Successor + Affiliate session seed docs are current. End of seat 7.

- **True final wave (Douglas caught 5 more sessions): 3119 parts / 2293 verified (`7cdd9e0`).**
  Wheels nominal-weight policy applied (+7 verified: DT Swiss E1900 x3, Reserve 30HD pair, 31DH
  pair; Giant TRX/Race Face Turbine SL/Zipp Moto checked-not-promoted with reasons) · WAO
  Convergence transition (+21 rows +2 presets; every model judged NEW PRODUCT per WAO's own tech
  page — discontinued+supersededBy, NO aliases; 3 ambiguities flagged; old pages 404 = genuine
  discontinuation) · Reserve 30|SL front maxTire 2.5→2.6 (the chip session verified but never
  committed; applied in-seat with attribution). The wheels worker correctly used spawn_task to
  flag two out-of-scope Reserve issues as chips — the pattern works. Gates green, harness
  byte-identical vs the DJ-era baseline. One session left RUNNING for the successor: "Verify
  rw-reserve-30-hd-29-ms is a real SKU" (suspected fabricated MicroSpline variant — the worker's
  own Shopify-JSON fetch says XD-only; expect a retirement flag).

- **Final wave before succession:** gallery scoping landed (`502d3d4` — snapshot-on-publish model,
  forum-posture moderation, MVP=MEDIUM; 6 decisions queued for Douglas in the handoff) and the
  mobile-only banner shrink AUTO-SHIPPED (`44a7a6c`, <=480px, post-hoc scan clean). Still grinding
  when the next coordinator seats: wheels nominal-weight promotion + WAO Convergence rename chips.
  This coordinator seat (coord/2026-07-12, the 7th) ends here — successor + the new parallel
  Affiliate session both have complete seed docs.

- **Session split: Affiliate session established alongside the Coordinator (Douglas, 2026-07-14).**
  Wrapped the final two loose sessions from the overnight fleet (contrast-fix auto-shipped
  `0024402`; the finishing-kit/mullet breadth session's branch had merged earlier but the session
  itself was missed in that pass — archived now). Executed his four one-liners: (1) wheels
  nominal-weight policy extended in VERIFY-PROTOCOL.md + a grind chip to promote DT Swiss E 1900 +
  sweep similar rows; (2) We Are One Convergence rename-mapping chip (per-model ALIASES-vs-
  discontinued call, not a blanket rename); (3) mobile-only banner-shrink chip (desktop must stay
  pixel-identical); (4) completed-builds-gallery SCOPING chip (document only, the competitive
  audit's #1 idea). Then: rewrote COORDINATOR-HANDOFF.md end-to-end for the two-session era
  (`2c650f8`), authored the standing multi-session-coordination protocol (memory) and a new
  `AFFILIATE-HANDOFF.md` (untracked, repo root) seeding a parallel Affiliate session — its own
  lane (LLC/EIN/Cloudflare/affiliate applications/manufacturer partnerships), explicit
  coordination rule (list_sessions + send_message before ambiguous/shared-file work; Coordinator
  remains the only pusher to main). Ready for Douglas to open both a fresh Main Coordinator
  session and the new Affiliate session whenever he chooses.

- **Douglas back, harvest blessed ("merge" — all 11 already landed).** New directives: (1) **KIT
  BUILDER** coming — rider gear/apparel (shoes, pants/shorts, jerseys, gloves, helmets, knee/elbow
  pads, body armor); the grind will run as idle-time Sonnet chips, but **no kit chips until he
  asks** (memory: kit-builder-directive; kickoff = a data-model round first). (2) Contrast bug
  from his screenshot: the ACTIVE material sub-chip is unreadable on Loam — fix chip spawned
  [Sonnet, low], root-cause class fix across all chip rows, UI auto-ship.

- **MORNING HARVEST COMPLETE — all 11 overnight/day chips landed → 3098 parts / 2286 verified /
  550 tests / 17 guides (main `e4fbb41`, CI+Deploy green throughout).** In merge order:
  quality-backlog `7f80ae6` (schema id-map, isPresetCat/isPresetPart split — genuinely different
  contracts, worker verdict adopted; _slotByKey memo; test table exact) · Shopify wall map
  `2cba0c5` (ZERO flips — every retry brand still walled; FETCH-WALLS doc committed; flags: WAO
  "Convergence" rebrand mapping + extend-nominal-weight-to-wheels policy, both → Douglas) ·
  **DJ GO-LIVE `9769371`** (25 rows into PARTS, dj chip, cog/seatpost slots with inverted
  requiredness, NEW rule 13c = rule 13's geometric twin on a brand-new slot, sample bands exclude
  dj; BMX stays unreferenced; CLAUDE.md conflict resolved as union; suite 489→547; harness delta =
  exactly the 9 DJ frames assembling clean) · frame materials `32880fc` (143/147 backfilled,
  carbon-alloy token maker-verbatim, filter-only contract harness-proven; 9 DJ frames enter
  without material — next-touch backfill) · breadth `566aa82` (+8 rows; worker's audit: the
  2026-07-08 mullet-wheel + finishing-kit queue gaps are otherwise CLOSED — retired) ·
  price-drift `0fb1a8a` (882/2283 checked; ZEB→$1299, SDU→$659, Öhlins TTX22→$929.50, CC 110
  headset→$99.99, Mattoc retailer-sale-price bug→MSRP $1049.99; overlap conflicts resolved
  field-level = sweep PRICE onto landed rows; ~1400 rows remain → follow-up chip candidate) ·
  guides wave 2 `6f710fb` (7 new guides, coordinator accuracy-read all; DJ guide's "not live yet"
  closing REWRITTEN at merge to the live truth; a string-splice tooling fumble was caught by the
  parse check before commit — twice — and fixed) · verify-job re-synced `e4fbb41`. All 8 sessions
  archived; repo swept to seat + shared checkout. **Deferred/flags for Douglas:** phone banner
  costs ~28% of a 375px viewport (worker suggests condense-on-scroll as a future design round);
  forum riding_styles CHECK needs a 'dj' migration (schema tier, his run); WAO rebrand; wheels
  nominal-weight policy; competitive audit's top-5 ideas (builds gallery, price history, verdict
  guides, methodology page, Worldwide Cyclery first + Backcountry caution).

- **Overnight harvest, wake 2 (~04:15 UTC).** Discovered chip-spawned sessions CANNOT send_message
  the coordinator ("no Main Coordinator reachable") — completed workers sit silent; watch checks
  now read transcripts of idle sessions. Landed: (1) **evenness sweep (`eb6871a`)** — 146 forks
  gained maker-published maxTire (RockShox 97/97, Manitou 33/33, Öhlins 21, CC 13, MRP 4 — rule 14
  activates, harness byte-identical = no false fires), ENVE/Spank wheel minTire, and a UNIT BUG
  fix (maxTire compared in inches; 6 DT Swiss F 535 rows carried mm=75, rule silently dead —
  follow-up: audit any maxTire>10 catalog-wide); walls re-confirmed (Fox/DVO/EXT publish no
  fetchable clearance text; SR Suntour states no rotor minimums). (2) **docs coherence
  (`c294edd`)** — NEXT-STEPS rewritten 714→75 lines, FOR-REVIEWERS map current, EXPERT-REVIEW-
  DOSSIER appendix for rules 6c/8b/C2-C4/M1/20 — coordinator accuracy-read EVERY entry in-seat
  (all faithful; one stale M1 line corrected at merge). (3) **Phone-UI worker AUTO-SHIPPED
  (`1d06971`)** mid-harvest per UI tier — post-hoc scan clean (index.html only, no popup-shaped
  patterns; mobile filter carousels, dynamic sticky-header offset for the new tall banner, part-
  modal verdict, touch-target pass); full report pending its session wrap. Main moved during the
  wave — evenness rebased + re-gated before push (the pattern working as designed). Sessions
  archived, branches/worktrees pruned. Still grinding: price-drift, guides, quality-backlog,
  breadth, shopify-retry, DJ go-live, frame-material, competitive audit, phone-UI.

## 2026-07-13 — Coordinator succession + post-wave quality audit shipped

- **TALL TWO-ROW BANNER LIVE (`a0a0070`) + DJ GO-LIVE ordered.** Douglas compared his screenshots:
  the wrapped narrow-width header ("tall", topo contours breathing) beats the single-row desktop
  ("too short") — the <=880px two-row layout (logo/buttons row + full-width search row) is now the
  header at ALL widths; search flex moved into its own rule (the later flex:1 shorthand was
  silently resetting flex-basis — caught at 1900px verification); desktop scroll-margins bumped to
  clear the taller sticky header. Verified at 1900px across all four themes, console clean, gates
  green, CI green. **DJ go-live chip spawned [Fable, high]** ("build the DJ chip"): activates the
  held 555ee7c integration — DJ rows into PARTS, cog/seatpost slots, dj discipline chip — BMX
  stays off-live; engine-tier review + adversarial pass at merge.

- **Icons v5 (refinement round) delivered** (`design/rail-icons-emoji-v2` @ 5a37795;
  `_PDFs/rail-icons-lineart-v5.pdf` sent): 54 drawings — every v4 icon corrected against real
  component photo reference (fork crown/arch/axle, shock piggyback position, derailleur cage
  geometry), one accent element per icon on var(--icon-accent, currentColor) (graceful fallback;
  one CSS line per theme = the whole contract, demoed with each theme's existing accent), plus the
  requested ANTI-SET (solid duotone silhouettes) as a direction check. QA'd at 20px via headless
  contact sheets. Awaiting picks. Both design sessions archived + swept.

- **TOPO CONTOURS BANNER LIVE (`9150847`) — Douglas's style pick from a 9-direction round.**
  Style-directions-v1 worker delivered 9 clickable header directions on a simplicity dial (PDF +
  live switcher); Douglas picked D4 Topo Contours as the default banner for light/dark/Loam and
  declared the STANDING RULE that RAD is its own theme (keeps its checkerboard header; exempt from
  site-wide treatments; exactly four themes, no additions — memory + this log are the record).
  Coordinator extracted D4 from the mockup and shipped: --hdr-bg/--hdr-topo per-theme vars,
  deep-green banner + ~10%-opacity contour SVG pattern (absolute, out-of-flow), html.rad hides it.
  Cross-theme computed-style verification passed (the pane viewport was degenerate 0x0 — layout
  probes were artifacts; the pattern element is out-of-flow by construction). Gates green,
  CI+Deploy green. Mockup branch design/style-directions-v1 kept until the style pass finishes
  (Douglas may pick more elements, e.g. the rail-header contour echo, not shipped yet).

- **DJ/BMX provisional leans CONFIRMED by Douglas (2026-07-13/14): "I don't want to veto these."**
  Q7 (pivotal seat/post = hard error) and Q6 (chain-width mismatch = warning) — and by extension
  the Q4-Q10 lean set — are now DECIDED, not provisional. Next worker on bike-type/dj-bmx flips
  the doc's PROVISIONAL tags to decided with this date. **Icons: v4 line-art direction APPROVED**
  ("getting close... on the right track") with refinement feedback — cleaner/more accurate, a
  little theme-aware color (one accent channel, light demo only), plus one deliberate "anti" set
  as a direction check. v5 chip spawned [Fable, high].

- **Away-grind wave 5 (final): Shimano archive wave [Opus] landed (`adf8aec`) → 2283 verified.**
  Shimano drivetrain 40.8% → **100% verified** (+29 rows) from ONE fetched source: the CURRENT
  productinfo.shimano.com Specifications handbook Ver.2.4 (no archive edition needed this
  generation; pages rendered to PNG because text extraction jumbles the wide tables — route note
  for future waves). 8 maker-weight corrections; Deore/CUES interface-verified with nominal
  weights (Shimano publishes none at those tiers); the long-flagged M8200 clampType resolved to
  ispec-ev from the rendered table (rule-19 warning parity with M8100); XTR 10-51 mfgPn updated to
  the CS-M9101-12 running change, id append-only; test-ui kit fixture swapped to a durably-
  unverified example (contract unchanged). E-bike siblings (STePS, CN-E8000, motor-protection
  shifters) correctly excluded. Gates green in-seat, verify-job re-synced (2394/2926). Bias-audit
  #1 is now CLOSED for shocks AND drivetrain; frames remain the fetch-walled tail. All five
  away-grind sessions harvested + archived; repo tidy (seat + shared checkout only).

- **Away-grind waves 2-4 landed → 3065 parts / 489 tests (`bf975d0`, `5d8fcd4`).** (1) Suspension
  follow-ups: Diamond Boost x4 discontinued (line renamed away), +2 Diamond 36 D1 SL rows (fetched;
  probe-E gains the expected data-accurate DM-180 note), MY27 40 27.5 confirmed; 36 PE 150 retired
  via ALIASES (never purchasable). **SAVE OF THE DAY: the validate gate blocked the 185x55T PE
  retirement — fr-privateer-141-g2 BUNDLES it (its verified page states 185x55 trunnion), so the
  "never existed" call was wrong for retail only; row corrected to the oemOnly/forFrames pattern,
  bad Factory-page verification + wrong discontinued status both removed.** (Coordinator also ate
  two self-inflicted tooling bites here: a regex that mangled escaped quotes in a desc, and a pipe
  that masked a parse failure past an && chain — both caught before push; lesson: never pipe the
  parse check, use string slicing not re.sub templates on descs.) (2) Hardtail push: +6 frames
  (Knolly/Stanton/Ragley/Sonder/Bird/Pipedream); GAPS: Cotic BFe needs an I.S. brakeMount vocab
  decision, On-One defunct, RAAW makes no HT. (3) DH Transmission harvested from a worker that
  committed then died silent — coordinator full-reviewed: CS-XS-797 + RD-XX-DHE + XX DH crank
  inside sram-transmission @ speeds:7 (no schema change; M1 made it work), 4 pinning tests incl.
  7s-vs-12s stays red (489 total). All sessions archived + swept (incl. the D:\-root worktree a
  worker created against the folder rule — future briefs pin .claude/worktrees). Still running:
  the Shimano archive wave [Opus] (branch verify/shimano-archive-wave already committing).

- **Away-grind wave 1 landed: frames-tail re-confirm (`dd594f1`).** 4 rows freshly re-checked
  against maker pages (Skipped stands on all — frame-only weights genuinely unpublished; Devinci
  Wilson product page has 404'd, noted in-row). KEY FINDING: the verification queue's FRAME tail
  is now effectively CLOSED for today's tooling — remaining rows are Specialized/Trek/YT
  fetch-walls or weight-walls; further frame-verification grind is wasted effort until the
  unblocker connector or measured-weight sources appear. FLAG parked: fr-santacruz-highball fetch
  anomaly (12x173.7mm axle + FSA IS-2 headset = likely summarizer misread; row untouched — needs
  one direct/manual page check). Still running from the away-grind tray: hardtail wave, Shimano
  archive wave [Opus], DH Transmission, suspension follow-ups.

- **Rail icons v4 (LITERAL LINE-ART) delivered** (`design/rail-icons-emoji-v2` @ 9223832 pushed;
  `_PDFs/rail-icons-lineart-v4.pdf` sent): 59 hand-drawn stroke-SVG drawings of the actual
  components — 14 slots x 3-4 variants + a matching discipline quintet — one line language,
  currentColor (all 4 themes verified), each shown at ~20px + 3 stroke weights + reduced-detail
  cut, 4 curated full-rail sets. Awaiting Douglas's picks; apply = follow-up chip.

- **MANUFACTURER-PARTNERSHIP-KIT delivered** (`_PDFs/MANUFACTURER-PARTNERSHIP-KIT.pdf` + root .md;
  indexed in _PDFs/README §5). 3 outreach templates (From: Doug@buildmymtb.com, LLC placeholders) ·
  license one-pager (non-exclusive/revocable/display-only/takedown; commits incl. ZERO ranking
  favor) · 15-brand first-wave sheet with contact routes FETCHED from each brand's own site (none
  invented; 8 brands have no public marketing/PR email — general form/phone only, noted) ·
  guardrails citing the bias audit. Fires only after LLC + domain email. Icon saga: rounds 1-3
  (emoji) all rejected — ROOT CAUSE: Unicode has no bike-part glyphs, every candidate was a
  metaphor. Round 4 pivots to Douglas's own words ("an icon of a bike frame for frames") — literal
  component LINE-ART SVGs, chip running [Fable, high]. _PDFs/README design-pick section updated.

- **INCIDENT + RECOVERY (coordinator error, fully repaired, no data lost).** A worktree sweep used
  "clean tree = removable" without cross-checking live sessions and removed the RUNNING
  partnership-kit session's worktree + branch (partial removal also deleted 78 tracked files
  before a lock stopped it). Recovered within minutes: branch ref restored, worktree registration
  hand-rebuilt (.git/worktrees metadata + .git file + reset), all 78 deleted files checked out
  (0 modified / 0 untracked lost — the session hadn't written yet), shared checkout verified
  untouched, no stray commits. Rule added to handoff gotchas: sweep only after cross-checking
  list_sessions cwds. The recurring orphan-worktree hazard now has a documented recovery recipe.

- **Discipline icons v3 delivered** (`design/rail-icons-emoji-v2` @ 087ac1e; `_PDFs/discipline-
  icons-v3.pdf` sent): Douglas rejected rounds 1-2's glyphs and narrowed scope to the 5 discipline
  slots; round 3 = 151 fresh uniquely-numbered candidates (25-30/slot + labeled wildcards, nothing
  previously shown re-offered — build-enforced) + 5 curated quintets. Awaiting his picks (mixable
  across rounds). **Manufacturer partnership program approved as the images/data ENDGAME** (chip
  running): kit = outreach templates + license one-pager + researched first-wave contact sheet;
  fires after LLC + domain email; partners get zero ranking favor (memory + affiliate-push updated).

- **DJ/BMX ARCHITECTURE IMPLEMENTED on the held branch (`555ee7c`, bike-type/dj-bmx — still
  OFF-LIVE, unmerged).** Per the sign-off: driveMode:'single-speed' discriminator in the MTB engine
  (slotRequired drops drivetrain + ALL brake/rotor slots for single-speed frames — the brakeless
  decision), new cog/seatpost categories staged without live GROUPS slots, DJ dataset reshaped to
  the live schema (go-live = PARTS.concat(DJ_PARTS) + two slots); NEW src/compat-bmx.js own engine
  (BMX_VOCAB/GROUPS/SLOTS, gear-ratio display-only) sharing compat.js's exported Verdict — loaded
  by nothing live. Every new rule DORMANT with a documented activation condition (inventory in the
  doc's new §6); worker even proved the live engine byte-identical via the harness AND added an
  in-suite driveMode-absence pinning test. On-branch gates: validate 0 problems · 539/539 tests ·
  tsc clean · harness identical. Worker also caught + dropped a wrong-spec v0.1 row (31.8 BMX stem
  — real BMX is 22.2/25.4) and corrected the bogus 'oversized' clamp token. Q7 (pivotal=ERROR) +
  Q6 (chain-width=warning) surfaced to Douglas as the two provisional calls most worth a veto look.
  CLAUDE.md file-table mention of compat-bmx.js deferred to go-live merge time (worker's note).

- **DJ/BMX ARCHITECTURE SIGNED OFF (Douglas, 2026-07-13).** The three load-bearing calls from
  data/DJ-BMX-COMPAT-ANALYSIS.md §5: (1) Option (b) confirmed — DJ folds into the MTB checkBuild,
  BMX gets its own checkBmxBuild/vocab (the buildmybmx on-ramp); (2) discriminator =
  driveMode:'single-speed' (mechanical flag, not a bikeType enum); (3) brakeless is a valid
  complete build for these types. Q4–Q10 MED/LOW proceed on the doc’s leans as PROVISIONAL
  (vetoable). Implementation chip spawned [Fable, high] — all work stays on the HELD off-live
  branch, every new rule lands DORMANT pending the mechanic-review bar, and the live suite must
  prove behavior-identical (driveMode absence = zero effect).

- **STRIDER SIZING DECIDED by maker consensus (Douglas delegated the call): INSEAM primary.**
  Worker fetched 8 balance-bike makers’ own sizing guidance (Strider/Cleary/REI/Frog unfetchable,
  documented): inseam 4 (Prevelo verbatim “most reliable size indicator”, Guardian, Early Rider,
  Yedoo) · height 3 · age 1 → inseam-vs-seatMin/Max is the model’s primary fit input, child height
  a secondary filter (new heightMin/heightMax fields), age = label only. Citation table in
  data/STRIDERS-MODEL.md §2b; woom/Prevelo/Cruzee maker ranges added (Prevelo seatMax corrected
  356→355 per page). Implemented on the HELD off-live branch bike-type/kids-striders (0670f3a,
  data/-only, gates prove live app untouched). Still unmerged per the off-live rule.
- **Rail icons v2 DELIVERED** (`design/rail-icons-emoji-v2` on origin, a648f76; PDF in _PDFs + sent):
  108 uniquely-numbered candidates (4–6 per rail slot, per-slot prefixes FR-/FK-/…, ID-0 = the
  round-1 glyph) + 4 curated sets; Douglas replies with picks. KEY FINDING for the apply chip: the
  “Refined Emoji” style is NATIVE color emoji (Unicode strings in ICONS/DISC_LABELS in index.html),
  NOT SVGs — applying picks is a string edit; optional vendored Twemoji path noted if pixel-identity
  ever matters. ⚠ Orphan frosty-austin worktree trapped its THIRD worker — the empty dir is now
  deleted outright.

- **Fox LIFECYCLE PASS MERGED (`bd54458`) → 3055 parts / 2256 verified.** All approved dispositions
  landed, every one re-confirmed against 2026-07-13 ridefox.com fetches: fictitious 38-150 pair +
  the two vestigial plain Float X2 ids RETIRED into ALIASES (legacy sh-x2-* aliases re-flattened
  single-hop; fr-frameworks-enduro.bundledShock re-pointed — worker caught the dangling ref);
  vanished sizes + all 10 pre-MY27 36 Factory rows → status discontinued (+supersededBy where a
  MY27 twin exists); NEW verified fk-fox-40-factory-my27-29-203 row (PN 910-21-410, minRotorF 200
  vs the old gen’s 203 — gen split, old row specs untouched); 36 PE 160 source re-anchored to the
  real PE product. Gates green in-seat, CI green. **Residual flags (next Fox pass / mechanic
  queue):** 36 PE 150 (no fetched page supports a 150 PE — discontinued-vs-retire call), the MY27
  40 Factory 27.5 SKU (910-21-417, unaudited), X2 185x55T PE row still verified against the
  Factory page.

- **Bug issue #2 CLOSED (Douglas’s plain OK)** — resolution comment posted (stale-cache diagnosis
  + regression test). **Fox lifecycle pass APPROVED + chip spawned** (retire 38-150 pair, discontinue
  vanished sizes, dedupe Float X2 ids, MY27 40 gen split, provenance fixes — all ALIASES/status,
  append-only). Icon-set PDF re-sent; awaiting his Set #.

- **Fox drift sweep MERGED (`974a33d`).** 19 price corrections + 76 lastChecked re-confirmations
  across verified Fox shocks + forks, every figure from a directly-fetched ridefox.com store product
  JSON. Resolves all three Fox-balance price flags incl. the Float SL Factory tier fix (the $569 was
  the Remote-Up variant; row now $549 with the correct Factory-page source). The 11 fork rows from
  `6f2ca30`: zero drift. Gates green, CI+Deploy green, session archived, branch/worktree pruned.
  **9 LIFECYCLE FLAGS deliberately unapplied (rows untouched), awaiting Douglas's umbrella OK for a
  Fox lifecycle pass:** vanished sizes (Float X Factory 230x57.5 + 185x50T; 38 Factory 275-170/180;
  38 PE 180; 36 SL Factory 120), old-gen 36 Factory rows no longer sold (10 rows → candidate
  status:'discontinued'), two Float X2 duplicate id pairs (→ ALIASES dedupe), MY27 40 Factory is a
  new gen (new row + status on the vitalmtb-sourced 2025 row — also a pre-existing protocol
  anomaly), Float X PE 185x55T row identity questionable (PE-named, Factory-sourced, orphan
  size/price), 36 PE travel rows' provenance mismatch. Plus the already-flagged fictitious
  fk-fox-38-factory-*-150 pair. One coordinated pass fixes all of it via ALIASES/status — never
  mutating verified rows in place.

- **ENGINE RULE 6c LIVE (`021ba42`) — bias #2 CLOSED.** XD cassette on an XDR-driver wheel is now an
  adapter-tier WARNING with a structured fix naming SRAM's 1.85mm spacer (maker source: sram.com
  XD/XDR driver-body explainer, quoted in-code); the reverse direction and every non-XD mismatch stay
  hard errors; LABELS gains XDR. The two verified WTB CZR XDR wheels go red→yellow only vs XD
  cassettes. 8 pinning tests (suite 477→485). **Adversarial audit SUSTAINED on all six angles** —
  auditor independently re-fetched the SRAM explainer AND the WTB spec page (mfgPn+weight match),
  and resolved the hardest edge (T-Type cassettes carry freehub XD: SRAM's model pages label them
  XD and support FAQ 13819655363099 documents T-Type-on-XDR mullets — warning tier correct).
  CLAUDE.md rule-6 summary updated in the same commit. Gates green in-seat, CI+Deploy green.
  Auditor session archived; branch pruned local+origin. ⚠ Orphan-worktree hazard bit AGAIN (two
  sessions assigned the stale frosty-austin folder; the auditor briefly detached the shared checkout
  and correctly restored it) — shared checkout verified clean on claude/zen-blackwell-cfe5d1.
- **PDF consolidation (Douglas's ask):** `_PDFs/` is now the SINGLE home for all 14 project PDFs;
  `_TO-REVIEW/` retired (action index → `_PDFs/README.md`); affiliate runbook status-refreshed
  (legal pages + Guides LIVE, ~3,000 parts) and regenerated; md→PDF pipeline saved as
  `scripts/md2pdf.py`; handoff updated (`cd68854`). Empty stray `D:\tb-profile-contrast` confirmed
  deletable.

- **Bias #3b rotor half CLOSED (`4850484`) → 3058 parts.** The SRAM-rotors follow-up worker
  re-fetched sram.com service pages and found main already carried 22 SRAM rotor rows — exactly ONE
  real SKU was missing (CenterLine 203mm 6-bolt, added; interfaces from the fetched service page,
  honest sample weight/price since SRAM publishes neither per-size). SRAM's current MTB rotor line
  (HS2 / CenterLine / CenterLine X) is now FULLY enumerated; the remaining TRP rotor lead (34 vs
  Shimano 33 / SRAM 24) is real-market SKU count, not catalog bias — no further balancing without
  fabrication. Gates green in-seat, CI+Deploy green. Session archived, branch/worktree pruned.
  Repo back to 8 branches / 2 worktrees (seat + shared checkout).

- **BIAS-REMEDIATION HARVEST COMPLETE → 3057 parts / 2257 verified (`6f2ca30`, sync `58d89c7`).**
  All four finding-chips reported; three landed, one staged: (1) Fox fork balance merged — +11 real
  ridefox.com configs (Podium + 34 SL new families, 36 MY27 gen tokens, SL tiers; eMTB/AWL/gravel
  SKUs excluded per the hard rule; RockShox:Fox row ratio 2.77→2.11, Fox families 9); (2) the
  verification wave's full report confirmed the earlier merge (RockShox shocks now 382/382 = 100%
  verified via sram.com; process gold: `sram.com/en/service/models/<slug>` serves the full static
  size matrix where the rockshox path is JS-thin); (3) `tools/verification-job.json` re-synced
  (2386/2918 processed); (4) **XDR rule 6c STAGED on `engine/xdr-adapter-warning`** — maker source
  fetched (SRAM's XD/XDR driver explainer), 8 pinning tests (485 total on-branch), WTB XDR wheels
  red→yellow only vs XD cassettes — **held for the adversarial-audit chip (queued) before merge**
  (engine tier). Cleanup: 13 worktrees + 26 branches pruned (wave sub-branches, landed feature
  branches, session refs); 4 worker sessions archived. **FLAGS logged for follow-up:** DVO Diamond
  is a NEW generation on dvosuspension.com (36 D1 SL, 29-only, 140-160, DM-180) contradicting the
  4 cataloged Diamond Boost rows → new-gen entry pass, rows untouched; Fox price drifts (38
  Factory $1369, 36 SL $1259 + the 3 shock flags) → combined drift-sweep chip queued;
  `fk-fox-38-factory-29-150`/`-275-150` still cataloged though their own descs say the config
  doesn't exist → ALIASES retirement awaiting Douglas. Residual fork row-skew is partly REAL
  market structure (Fox aftermarket is 29-only/travel-narrow) — accepted, no fabrication.

- **MERGE WAVE ("merge etc"): verification inversion wave 1 + rotor/brake balance → 3046 parts /
  2252 verified (`39297e4`, `6d53f62`).** The WEEKLY usage limit hit mid-fleet (~03:35, reset noon
  ET) — the rotor/brake worker died right after committing; the coordinator content-reviewed and
  landed both finished branches via the own-additions-only pattern, four gates green in-seat,
  harness byte-identical, e-bike scans clean, CI+Deploy green. Details: `verify/inversion-wave-1`
  promoted **352 rows to verified** (all 8 RockShox shock families via sram.com model pages; DVO
  Onyx forks incl. the maxRotorF 220→203 interface correction, re-fetched dvosuspension.com; the
  two orphaned night-verify WIP diffs fully dispositioned — DVO/EXT/Fox-36SL source upgrades
  adopted, Spank weights synced to the fetched spank-ind.com table and honestly left unverified —
  both WIP branches deleted). `expand/rotor-brake-balance` added 28 rows + 2 edits (audit #3b/#4:
  SRAM Motive/Maven/DB/Level/Code + Shimano XTR/MT brakes, RT-MT905 + SM-RT86/64/54/26 rotors via
  the archive-handbook route; Hope XCR FM row now carries road.cc measured weight, sourced facts
  in desc). Verified 1872 → 2252 (+380). SRAM rotors still missing (worker died first) — follow-up
  chip queued. Wave session continues (step 3: verify/dvo-forks in flight); its rs-* sub-branches/
  worktrees prune AFTER it completes.
- **Random tie-break AUTO-SHIPPED by its worker (`b985162`) — post-hoc review PASSED.** Per
  Douglas's "Random!" pick (bias #5): featured sort now tie-breaks on a seeded shuffle — FNV-1a
  (part id) ^ UTC-day seed → one memoized mulberry32 draw (the sample-builds idiom); rank primary,
  presets second, insertion index demoted to collision backstop. Deterministic within a day (no
  keystroke reorder), rotates daily = time-averaged brand fairness. UI tier auto-ship on green
  gates worked as designed; CI+Deploy green.

- **Douglas's decisions (2026-07-13) + execution.** (1) Forum "⚡ E-MTB" discussion category:
  HIDE but KEEP ("don't display for now, but don't remove, we will use that later") — shipped
  `cd79c0f`: `hidden:true` on the vocab entry in src/forum.js + skips in the chip row and
  new-thread picker; existing-thread badges unchanged via forumCategory(); browser-verified on the
  live forum data path (17 categories offered, E-MTB absent from chips + picker, console clean),
  four gates green (harness byte-identical), CI+Deploy green. No-e-bikes rule confirmed
  catalog-parts-scoped (memory updated). (2) Default-sort tie-break (bias #5): Douglas picked
  RANDOM — seeded-stable-shuffle chip queued (UI tier, auto-ships on green gates + browser
  verification). (3) OK given to close bug issue #2 — the `gh issue close` was BLOCKED by the
  permission classifier (indirect authorization); resurfaced to Douglas to confirm plainly or
  close it himself. Also: shared .claude/launch.json swept of 6 entries pointing at pruned
  worktrees/dirs; `tb-coord` (8127 → the coordinator seat) added.

- **Coordinator succession (7th seat).** New coordinator seated on `coord/2026-07-12`
  (inside `.claude/worktrees/`); Main Coordinator 6 archived; the grandfathered `D:/tb-coord-lean`
  seat + its branch removed. Backlog queued as 5 chips: DH Transmission 7s group, Fox drift sweep,
  post-wave code-quality audit, post-wave manufacturer-bias audit, repo-hygiene sweep (~151 stale
  branches / ~53 worktrees). Bug issue #2 (fixed, regression-tested) awaits Douglas's OK to close.
- **POST-WAVE QUALITY AUDIT → two perf fixes LIVE (`0655198`).** Worker audit (branch
  `audit/code-quality-2026-07-13`, report committed as `CODE-QUALITY-AUDIT-2026-07-13.md`) after
  the catalog tripled to 3018: (1) `byId` linear scan → memoized null-prototype id→part index
  (catalog is runtime-immutable — verified zero `PARTS` mutations repo-wide; 10k lookups 102.6ms →
  0.2ms); (2) `renderCatalog` re-ran `resolved()` per PART per render → hoisted to once per render
  (`compatFor(p)` ≡ `compatOf(p, resolved())`, verified; keystroke ~450ms → 9.2ms at 3018 rows).
  Behavior-identical: four gates green in the coordinator seat AND verdict-audit-harness output
  byte-identical to the main baseline. CI + Deploy green. **Report-only backlog:** placementDiff
  baseline-recompute is the next perf lever at ~10× catalog; schema.js O(n²) id lookups
  (validate.js still 0.23s — fix opportunistically); `isPreset` has drifted semantics between
  index.html and schema.js (hazard); CLAUDE.md test table omits test-invariants.js.
  **FLAG for Douglas:** src/forum.js ships an "⚡ E-MTB" DISCUSSION category — catalog rule 1 is
  parts-scoped so this is not a violation, but his explicit "discussion is fine/not fine" is wanted.
- **MANUFACTURER-BIAS AUDIT (post-wave) — report committed as `MANUFACTURER-BIAS-AUDIT-2026-07-12.md`.**
  Read-only worker audit of main @ 5967d12. Affiliate isolation, engine brand-conditionals, guides
  copy, and sample-build mechanism all CHECKED CLEAN. Findings (severity order): (1) HIGH — the
  "✓ Verified only" view inverts market reality (Specialized/Trek/YT frames 0-verified vanish;
  RockShox shocks 8.4% verified vs Fox 76.5%/EXT+CC 100%; SRAM 80.8% vs Shimano 40.8%) — remedy =
  targeted verification waves + the web-unblocker connector; (2) MED-HIGH — XDR freehub hard-errors
  vs every cassette though SRAM documents XD-on-XDR with the 1.85mm spacer → should be a
  direction-aware warning w/ structured fix (chip queued); (3) MED — fork row-share skew (RS 30.2%
  vs Fox 10.9%; fix = Fox variant fill-out, chip queued) + TRP is top brakes+rotors brand at 19.3%
  (fix = Shimano/SRAM rotor coverage incl. RT-MT905, chip queued); (4) MED — rule 8b caliper
  ceiling live on 2 of 4 FM calipers (per-class evenness standing target); (5) MED-LOW — default
  sort tie-breaks on insertion order = data-entry history (neutral-key choice is Douglas's);
  (6-7) LOW — headset near-monoculture (fetch-wall artifact), pinned-fallback build skew.
- **HYGIENE SWEEP LANDED: 154 branches / 54 worktrees → 12 / 3.** Worker content-verified every
  deletion (merge-base ancestry or merge-base-diff grep vs main; every "missing" id traced to a
  documented deliberate drop — 22 EXT e-Storia e-bike rows, 2 fabricated Öhlins trunnions, 1
  Schwalbe e-MTB tire). Coordinator follow-through: the 6 worktrees kept for untracked deliverables
  were verified byte-identical to the shared-checkout root copies and removed; the 2 DIRTY
  night-verify worktrees held real unharvested work — committed as WIP onto their branches
  (`night-verify-suspension-tails`: DVO Onyx maker-page sources + maxRotorF 220→203 correction +
  2 verified promotions, UNREVIEWED — re-verify before merge; `night-verify-rearwheels`: 4 Spank
  weight nudges, no provenance) and folded into the targeted-verification chip; stale
  `audit/code-quality-2026-07-11` deleted (byId memo superseded by `0655198`; its minor _slotByKey
  dedup idea noted here as opportunistic backlog). `feat/catalog-views-fractal-honeycomb` kept as
  the only ref to the removed feature. All three audit/hygiene worker sessions archived.

## 2026-07-12 (evening) — Fable-budget push: shocks merged + engine fixes queued

- **ENGINE CRITICAL FIXES C1–C4 + M1 LIVE (`45f7331`).** All 5 findings from
  ENGINE-CRITICAL-REVIEW-2026-07-12.md landed in harm order, each maker-sourced + pinned (453→477
  tests) + independently adversarially audited (5/5 hold): **C1** new rule 8b `brake.maxRotor`
  (dormant; XTR M9110-FM=160 per fetched Shimano C-461, Magura MT8 SL FM=160 — corrected that row's
  wrong "up to 180" desc AND the golden XC build's own baked-in false fit); **C2** BSA68≡BSA73
  equivalence (false red removed; BSA83/PF exact); **C3** direction-aware bar/stem with a structured
  shim `fix` (mirrors rule 13); **C4** `frame.forkTravelHard` tiered by SOURCE LANGUAGE + validator
  cross-rule (hard requires min+source) — 15 frames hard-tagged verbatim, 3 SC trail frames softened
  per their own re-fetched FAQ, Megatower's unsourced hard red resolved; **M1** chain out of the
  drivetrain SPEED set (stays in system + 3c) — un-hacked the XX-DH workaround. Probe-C assembler
  respects the new caliper ceiling. **BACKLOG:** (1) catalog chip for the now-enterable 7s XX Eagle
  Transmission DH group (CS-XS-797/RD-XX-DHE); (2) mechanic-review queue: the 4 hard-tagged SC frames
  (bare "Fork Compatibility: X–Y" with no softener FAQ) + Nicolai G1's weak accommodation wording;
  (3) Hope XCR-FM + SRAM Level-FM rotor ceilings unsourced (dormant until found).
- **CATALOG MERGE WAVE 4: Fox balance → 3018 parts (`572c441`).** +59 Fox rear shocks (all missing
  current-lineup SKUs via ridefox.com store variant JSON; incl. Live Valve NEO — electronic damper
  for standard frames, AXS precedent, not e-bike). Shock share: RockShox 53.3% → 49.2%, Fox 6.0% →
  13.1% (the UNBIASED balancing pass). VERIFY-PROTOCOL.md gains the decided verified-weight
  subsection (verified = interfaces confirmed; nominal weight OK where makers publish none). Opus
  audit 59/59 independent re-fetch. Gates green. **BACKLOG from its flags:** (1) 2 pre-existing
  verified Float X sizes absent from Fox's current size list (possible page mix-up — re-verify);
  (2) one Float SL row has Factory naming at Performance price; (3) several verified shock prices
  have drifted on Fox's store — a price-refresh drift sweep would catch all three.
- **CATALOG MERGE WAVE 3: rear shocks → 2959 parts (`3095da6`).** `expand/shocks` merged: 108 → 717
  shocks (+609). 5 brand-cluster workers + 5 Opus auditors; audit caught + dropped **2 fabricated
  Öhlins trunnion rows** (210/230 eyes are std-only) and **all 22 EXT e-Storia e-bike rows** (hard
  rule). Interfaces 100% maker-sourced. Gates green. 2350 → 2959 (1813 verified / 1146 unverified).
- **Douglas's shock decisions (executed via coordinator recs):** (1) RockShox 53% skew → merged
  as-is + **Fox balancing pass chip queued** (add real Fox coverage rather than withhold real data);
  (2) verified-weight policy **2a formalized** — `verified:true` = interfaces manufacturer-confirmed,
  nominal weight OK where makers publish none (doc patch to VERIFY-PROTOCOL.md folded into the Fox
  chip); (3) Push Eleven Six skipped (no maker size matrix; per-bike fitment only).
- **Engine-fix chip queued [Fable]:** C1→C2→C3→C4→M1 in harm order, each with maker source +
  pinning test + adversarial audit, per ENGINE-CRITICAL-REVIEW-2026-07-12.md. Coordinator-reviewed
  tier.
- **Earlier today:** profile-input contrast fix live (`d42d379` — white-bg inputs used the theme's
  light --ink; now fixed dark text, all four themes readable); DH-wheels diagnosis fixes live
  (`df9868b` — size-chip no-op on Wheelset tab + honest empty-state; the "0 wheelsets" on the RAAW
  Yalla was CORRECT: Boost148-rear DH frame, no real 20x110+Boost148 bundled SKU exists; 19 front /
  130 rear à-la-carte options DO). Honeycomb/fractal views were shipped then REMOVED at Douglas's
  call (`36ce0d2` revert, his session). 12 orphan D:\tb-* worktrees cleaned; **folder rule: all
  future seats/worktrees INSIDE the project dir**. Folder rename to "Build My MTB" CANCELLED by
  Douglas. Session on Fable to conserve the 9% weekly budget (78% Fable available).

A dated, append-only record of what changed, **why**, and **how it was verified** — so
the project can be handed to an independent reviewer (another engineer or model) who can
trace every decision and re-check it. This is the *running* trail; its companions:

- **`FOR-REVIEWERS.md`** — the reviewer's entry point: what to read, in what order, and how
  to independently verify every claim (the four gates, provenance URLs, the "compatible =
  true" contract). _(being built)_
- **`REVIEWER-DOSSIER.md`** — the comprehensive retroactive decision + verification history.
  _(being built)_
- **Git history** — the ground truth for exact diffs; commit hashes are cited below.
- **`tools/verification-job.json`** — the per-part provenance ledger (verified vs. sample).

**Entry format:** `date` · what changed · why · how it was verified · refs (commit/branch/
issue) · what a reviewer should double-check. Newest first. The coordinator appends one entry
per wave/decision; large reconstructions are handed to a worker session.

---

## 2026-07-11 — Coordinator session (lean-rule correction + owner-task prep)

- **Succession housekeeping.** Archived the outgoing coordinator session ("Main Coordinator
  Old 5"). No other sessions were active.
- **Lean-coordinator rule hardened.** The coordinator seat must **never run tasks in its own
  context** (no coordinator-spawned in-session background `Agent`s — they meter against and
  bloat the seat). Task work is handed to separate worker sessions.
  - _Why:_ this session spawned an in-session background audit agent; Douglas corrected it —
    *"I don't want the coordinator sessions to run tasks. I want to keep them lean to
    coordinate."*
  - _Verified / refs:_ baked into `COORDINATOR-HANDOFF.md` §2 (removed the prior "or background
    agents" license) — commit **`2742ca8`**; and into the Claude memory topic files. The
    in-session agent was stopped and its orphan worktree pruned.
  - _Double-check:_ handoff §2 "How you work" wording.
- **Owner account tasks scoped (blocked on Douglas, by design — his accounts).**
  - _Supabase:_ base forum is already live/migrated; the pending item is the usernames/admin
    layer — run `supabase/forum-profiles.sql`, then the owner admin-grant. Security-reviewed:
    privilege escalation is prevented by a BEFORE trigger that pins `is_admin`/`verified_pro`
    off for every end-user JWT (only the service-role SQL editor can grant). Refs:
    `supabase/SETUP.md` §9, `supabase/forum-profiles.sql`.
    App code is already live and feature-detects the tables (no deploy needed to light it up).
  - _Cloudflare:_ email routing (`Doug@buildmymtb.com` → Gmail) + optional cookieless
    analytics. Runbook: `CLOUDFLARE-SETUP.md`. If analytics is enabled, the privacy page's "no
    third-party analytics" line must be reworded the same day (honesty).
  - _Connectors:_ MCP registry search returned **no** one-click Supabase or Cloudflare
    connector; manual paths remain the recommendation for these one-time tasks.
- **⚠ Stale-branch flag.** `chore/cloudflare-prep` is divergent from current `main` and would
  **revert** the forum-profiles + random-builds work. Do **not** ship it. The contact-email
  swap (`douglas.w.wills@gmail.com` → `Doug@buildmymtb.com` on privacy/terms/affiliate-
  disclosure) is to be **re-derived from current main** once Doug@ routing goes live.
- **Open item — bug #2.** GitHub issue #2 ("Wrong verdict") is still **open**, but its fix is
  already on main (`6ef9b48`; it was a stale-cache report — the catalog was already correct).
  Needs closing with a note.
- **Audit trail established.** This log started; `FOR-REVIEWERS.md` + `REVIEWER-DOSSIER.md`
  handed to a worker session to build.
- **UPDATE (later 2026-07-11) — Supabase forum-profiles migration RUN.** Douglas ran
  `supabase/forum-profiles.sql` and seeded the owner admin profile (`Doug`, `is_admin=true`).
  Forum usernames/profiles/admin-moderation/verified-pro are now LIVE (app code already deployed;
  feature-detects the tables). _Gotcha logged:_ the admin-seed UUID must be single-quoted —
  pasting it bare tripped Postgres `42601: trailing junk after numeric literal`.
  _Next:_ Cloudflare owner task still open; queued forum follow-ups (rich profiles, auto-mod)
  ready to hand off.
- **UPDATE — reviewer audit-trail docs LANDED.** A worker session built `FOR-REVIEWERS.md`
  (entry-point/map) + `REVIEWER-DOSSIER.md` (retroactive decision + verification history, by theme,
  every claim commit-cited). Coordinator-reviewed end-to-end: accurate, honest-toned, technical-only
  (business/personal deliberately excluded — confirmed no leakage), four gates green. Merged this
  commit (only the two new files taken; the worker's branch was based on `75e0304`, one behind, so
  its stale `PROJECT-LOG.md` diff was NOT applied). The dossier honestly self-flags **13
  "reviewer should check"** items — none a live error-rule bug; the actionable follow-ups: stale
  "dead rule" wording for rules 2/8/11 (real DH-fork/FM-brake parts can now fire them) + no
  real-part error-case test for 2/11; `CLAUDE.md` roadmap/test-table prose lags shipped code;
  `MECHANIC-FINDINGS-INTAKE` rule map one behind (no rule 20). Backlogged for a doc-cleanup worker.
- **UPDATE — theme dropdown + 🍂 Loam mode SHIPPED LIVE (`6e2c202`).** Worker converted the
  Light/Dark/RAD toggles into one native `<details>` dropdown mirroring the Sample-builds menu, and
  added `html.loam` (warm forest-floor dark theme, WCAG AA verified). Scope clean (only index.html,
  126+/41−); coordinator independently re-verified gates green (validate 0 · 453 tests · tsc 0).
  ⚠ **Process note:** the worker SELF-SHIPPED to main rather than presenting a branch for Douglas's
  staged eyeball (my prompt had said "present a branch"); it claimed Douglas's launch prompt
  authorized auto-ship-if-sound. Sound + reversible, so left live — but the standing "UI stages for
  Douglas's eyeball first" rule vs. worker auto-ship is a policy question flagged to Douglas
  (unresolved at log time; do NOT bake auto-ship or a worker→coordinator auto-ping into standing
  instructions until Douglas confirms in chat — both were relayed via the worker, not from him).
- **UPDATE — forum-profile UI fix SHIPPED + hardening migration STAGED (`f689857`).** Worker fixed
  the 3 profile-UI bugs (username-as-identity header button; `[object PointerEvent]` guard; header
  auto re-render) + authored `supabase/forum-profiles-hardening.sql` (search_path pins on the 4
  flagged functions + least-privilege EXECUTE on `username_is_reserved`). Cherry-picked onto current
  main (branch was based on `f20c6bf`; a naive merge would have reverted theme/Loam + the reviewer
  docs). UI auto-shipped on green gates (new policy); the `.sql` is inert in-repo — **Douglas runs it
  in Supabase** (security tier). Coordinator independently reviewed the migration: bodies byte-
  identical, `profile_norm` stays IMMUTABLE, REVOKE-from-public can't strip authenticated's direct
  grant, fails CLOSED — escalation still impossible, reserved-names still fire. CONFIRMED SAFE
  (agrees with the worker's in-session auditor). Four gates green.
- **UPDATE — doc-cleanup LANDED (`73a3420`).** Chip refreshed 4 stale docs (CLAUDE.md,
  EXPERT-REVIEW-DOSSIER.md, REVIEW.md, MECHANIC-FINDINGS-INTAKE.md): rules 2/8/11 de-staled
  (rule 8-front + rule 11 now fully live WITH real-part error tests; rule 2-front has live vocab but
  its error case is still synthetic-only), CLAUDE.md roadmap + test-table + rules 10b/14c corrected,
  mechanic-intake rule map extended to rule 20. It independently verified all 12 DATA-MODEL-REVIEW
  §8 catalog items — **10 landed, 1 moot, 1 deliberate; NO un-applied catalog error remains.**
  Docs-only, four gates green, self-merged. Coordinator caught the original brief was wrong (rule 11
  already had a real-part error test — only rule 2-front lacks one). **OPEN (Douglas's call):** add a
  real-part error-case test for rule 2-front? A dual-crown DH fork on a trail wheel is nonsensical —
  coordinator recommends LEAVING it (a contrived test is worse than none).
- **UPDATE — rider profile PAGES shipped (`a37c342`) + rich-profile migration STAGED.** Worker built
  full-page rider profiles (header 👤 → own profile page: avatar/username/✓Pro/member-since/bio/
  riding-style/location + the user's forum threads & replies; forum author names → that rider's
  public read-only page; owner inline editors; preset/initials avatar, no external image URLs).
  Touches index.html + src/account.js + src/forum.js (all app tier). ⚠ The worker pushed to origin as
  branch `feat/user-profile-pages`, NOT main (its "pushed to origin" claim was the feature branch) —
  coordinator cherry-picked `365c67a` onto current main (base `58d5412`, clean). Feature-detects
  (`hasRichProfiles`) so the UI is safe pre-migration; auto-shipped on green gates. Migration
  `supabase/forum-profiles-rich.sql` (adds bio/riding_style/location/avatar columns; idempotent;
  DB-level CHECK constrains avatar to a slug — never a URL; touches NO policy/trigger) — **Douglas
  runs it** (schema tier). Coordinator review + the worker's independent adversarial pass both
  confirm escalation-impossible + reserved-name enforcement still hold. Four gates green.
- **UPDATE — rich profiles v2 shipped (`50f9368`) + Storage migration STAGED.** Worker (correctly
  presented a branch, did NOT self-push) added profile photo UPLOAD (Supabase Storage `avatars`
  bucket, owner-own-path RLS, 2 MiB + image-MIME caps), tagline, multi-select disciplines
  (`riding_styles[]`), experience, current bike, home trails, and social handles (IG/YT/Strava stored
  as handles only, host hardcoded client-side, rel=noopener nofollow). index.html + src/account.js
  (app tier, feature-detected `hasRichProfiles2`). Coordinator independently reviewed the Storage RLS
  + the `avatar_url` CHECK + social-handle charset constraints — SAFE (canonical owner-folder Storage
  pattern; avatar_url DB-locked to the project prefix; no profiles_guard/RLS/trigger change →
  escalation-impossible + reserved-names hold). Worker's adversarial pass agreed; one LOW note (no
  per-user Storage object quota) is optional/non-blocking. Migration `supabase/forum-profiles-rich2.sql`
  (9 columns + CHECKs + the `avatars` bucket + Storage policies) — **Douglas runs** (schema+Storage
  tier). Branched off current main (no stale base). Four gates green.
- **CATALOG MERGE WAVE 1 (2026-07-12): brakes + wheels + tires → 2172 parts.** Reviewed + merged 3
  finished expansion branches onto current main, each applied as its OWN additions only (git-apply of
  the merge-base..branch diff for compat.js/schema.js/types.js) to avoid the stale-base revert since
  all branches are based on old main. `expand/brakes` (+3 MTB brakes: SRAM G2 Ultimate + Shimano
  BR-MT410/MT420 — **DROPPED bk-sram-guide-re as SRAM's e-bike-branded caliper** per the no-e-bikes
  rule; that session predated the rule relay). `expand/wheels` (+109 wheels/wheelsets, all disciplines;
  + `XDR` freehub vocab — WTB CZR road-length driver, kept distinct from XD per THE BAR). `expand/tires`
  (+44; the tires session **self-dropped a Schwalbe e-MTB tire**). Interfaces sourced; unverified rows
  per the relaxed policy; verify-job untouched by workers (coordinator re-sync deferred to end of the
  catalog waves). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2016 → 2172
  (1563 verified / 609 unverified). Commits `7913a10`/`638508a`. Still RUNNING (present final branches
  later): frames, forks, shocks, drivetrain, finishing-kit. ⚠ NOTE for the engine review: the new XDR
  freehub hard-errors vs every current cassette (none is XDR) — conservative, flagged by the worker
  for a future fix-tier adapter enhancement.
- **CATALOG MERGE WAVE 2 (2026-07-12): drivetrain + finishing-kit → 2240 parts.** `expand/drivetrain`
  (+9: SRAM SX chain, S1000 Transmission crank + verified derailleur, Shimano XT M8200 shifter/2
  derailleurs/2 cassettes, XTR M9200 2 cassettes; +5 price-drift corrections; Opus-audited 10/10;
  S1000 e-MTB crank + Shimano e-shifter deliberately EXCLUDED — no e-bikes). `expand/finishing-kit`
  (+59: CK/Kogel/Praxis BBs, Cane Creek/CK headsets, TAG/FSA/WeAreOne cockpit, Xpedo/Funn/Burgtec
  pedals, ODI/Ergon/Fabric grips; + headTube vocab ZS49/28.6 + EC49/40 from fetched CK/Cane Creek +
  matching test-schema update; Opus-audited 59/59). Applied as own-additions-only; finishing-kit's
  types.js needed a MANUAL headTube add (its patch conflicted with the wheels/tires vocab already
  merged). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2181 → 2240 (1612
  verified / 628 unverified). Still running: frames, forks, shocks.
- **SECURITY/POLICY NOTE (worth remembering).** The drivetrain, finishing-kit AND tires workers each
  flagged the relaxed-sourcing "policy update" as a SUSPICIOUS inter-agent message (it claimed
  Douglas's consent via a background channel and targets a data-integrity guardrail) and REFUSED /
  retracted it for interface fields. That is the CORRECT security instinct — don't trust claimed user
  authority from observed content. The policy IS legitimate (Douglas's real AskUserQuestion decision,
  relayed by the coordinator), but their caution meant NOTHING in the merged branches used
  non-manufacturer sourcing for a verdict-driving interface field — all interfaces are
  manufacturer-sourced + adversarially audited. Their sharp refinement (interface fields feeding
  error-tier rules should stay manufacturer-sourced even on unverified rows, since a wrong interface =
  wrong verdict regardless of the `verified` flag) is worth adopting — surfaced to Douglas.
- **DJ/BMX OFF-LIVE spike done (`bike-type/dj-bmx`, HELD unmerged).** 34 DJ + 62 BMX rows + model &
  compat-analysis docs, in a NEW `data/` dir ONLY — live app untouched (gates identical to baseline).
  No e-bikes. Architecture finding: fold DJ into `checkBuild` behind a single-speed discriminator;
  give BMX its own small engine (clean on-ramp to a buildmybmx split). 6 product questions for Douglas
  in `data/DJ-BMX-COMPAT-ANALYSIS.md`; held pending his decisions.
- **Catalog-expansion sourcing policy CLARIFIED (Douglas).** 8 expansion chips launched (frames,
  forks, shocks, wheels, tires, drivetrain, brakes+rotors, finishing-kit) had been briefed with a
  stricter-than-normal bar: omit a product entirely to a GAPS list if its interface fields couldn't
  be confirmed via a LIVE manufacturer fetch. Douglas: "if a product exists and the specs aren't
  available, I want it included... not verified blank or marked estimated." Clarified via
  AskUserQuestion — he picked the safe, already-precedented option: interface fields sourced from
  ANY credible real source (retailer listing, geometry chart, review article), not just a live
  fetch; entered as ordinary unverified/sample data (no `verified:true`, no fake `source`) — the
  SAME state ~1480 of 2016 existing parts are already in. Never a fabricated/invented number with
  zero basis; `verified:true` still requires the real fetched-source bar. GAPS list now means
  "genuinely no plausible real-world spec found anywhere," not "wasn't manufacturer-fetched."
  Policy relayed via send_message to all 8 running sessions. **Root cause:** this exact policy was
  ALREADY set 2026-07-11 (memory `catalog-unverified-inclusion-policy`), but the repo docs still
  stated the strict rule, so the briefs regressed. Fixed for good this time — patched
  `tools/DATA-ENTRY-TEMPLATE.md` with the verified-vs-unverified-breadth distinction so future briefs
  default correct (VERIFY-PROTOCOL's fetched-only rules are correctly about earning `verified:true`).
- **UPDATE — 📚 Buyer's Guides section shipped (`c6cbdbc`).** Chip built a full-page Guides section
  (new `src/guides.js` + index.html) with **10** accurate, brand-neutral compatibility/buyer's guides
  (how-the-checker-works, fork travel, mullet, Boost/SuperBoost, brakes/rotors, cassette/freehub,
  UDH/Transmission, headset S.H.I.S., dropper sizing, rear-shock), each grounded in the real engine
  rules and deep-linkable (`#guide/<slug>`). Coordinator read all 10 — accurate, NO brand favoritism,
  ZERO affiliate links (unbiased value upheld). Worker presented a branch (correct); coordinator
  cherry-picked onto current main + resolved ONE index.html conflict (additive CSS, rich2 vs guides —
  kept both), gates green (validate 0 · 453 tests · tsc 0 incl. guides.js). ⚠ index.html inline script
  isn't gate-covered and this was a hand-resolved merge, so Douglas to eyeball Guides↔profile hash
  nav. Purpose: value-add written content for the AvantLink application. Follow-up flagged: static
  pre-render for real search-SEO would be the project's first build step — deferred, deliberate call.
