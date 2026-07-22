'use strict';
/* =============================================================================
   ROAD + GRAVEL COMPATIBILITY ENGINE — checkRoadBuild  (LIVE)
   -----------------------------------------------------------------------------
   *** LIVE: served by road.html (2026-07-20) AND gravel.html (2026-07-21),
   each on Douglas's flip word. *** index.html and bmx.html still never
   reference this file — the MTB/BMX apps are untouched by it.
   Data: data/road.js + data/gravel.js (both live with their pages).

   ARCHITECTURE (data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §3, Option b): ONE shared
   engine serves BOTH future pages (BuildMyRoadBike + BuildMyGravelBike) —
   road and gravel are one mechanical domain (drop-bar disc bikes) whose every
   fit rule is the same rule over different data ranges (§2: no rule is
   road-only or gravel-only). The engine gets its OWN GROUPS/SLOTS/VOCAB over
   a vocab DISJOINT from the MTB tokens (road HG ≠ MTB HG — src/schema.js:88's
   split mandate; flat-mount ≠ the MTB PM/FM tokens), while REUSING the proven
   verdict primitives from src/compat.js (Verdict + verdictKey — shared, never
   copied; the exact compat-bmx.js seam).

   THE BAR (same as the MTB + BMX engines): a false "won't fit" OR a false
   "fits" is worse than a missing rule. Every rule below either (a) rests on a
   definitional standards fact with the source cited at the rule, (b) is a
   WARNING/INFO that cannot false-block, or (c) lands DORMANT behind an
   explicit sourced field (the live MTB rule-18 template) — see per-rule
   notes. Fuzzy thresholds the analysis doc marks [MECHANIC REVIEW] are NOT
   implemented as verdicts; they are recorded at the rule as deferred.
   This week's lesson is applied in-engine: NOTHING is inferred from a stock
   part (the Roscoe-rotor / Cannondale-UDH class of bug) — absence of a field
   means UNKNOWN and stays silent (or an honest INFO), never a verdict.

   DATA-AGNOSTIC like compat-bmx.js: this module never reads a catalog, only
   the build map it is handed, so it serves both datasets (and both pages)
   unchanged. Where data/road.js and data/gravel.js encode the same fact in
   different shapes, the engine reads BOTH:
     - frame clearance: road `maxTire` (number) OR gravel `maxTireByWheel`
       (map keyed by wheel size);
     - fork `wheel`: road string OR gravel array (a gravel fork supports both
       700c and 650b);
   Both catalogs state tire width in MM (the analysis doc's unit trap is
   between road/gravel and the inch-based MTB catalog — never cross-compare).
   ========================================================================== */

/* Shared verdict primitives: in Node (tests/CLI) via require; in a future
   browser page both files load as classic scripts and compat.js's top-level
   declarations are globals (compat.js must load first, the bmx.html pattern). */
/** @type {{Verdict: new (ruleId: string, slots: string[], msg: string, fix?: {kind: string, name: string}) => any, verdictKey: (v: any) => string}} */
var _mtbSharedRoad = (typeof module !== 'undefined' && module.exports)
  ? require('./compat.js')
  : /** @type {any} */ (globalThis);
var RoadVerdict = _mtbSharedRoad.Verdict;
var roadVerdictKey = _mtbSharedRoad.verdictKey;

/* ---- Vocab (documentation + future-validator reference — the engine itself
        compares values, it never gates on this table). Union of the tokens
        src/schema-road.js and src/schema-gravel.js accept today; every token
        whose meaning differs from an MTB token is a NEW value, never a reused
        MTB one (the false-green discipline; ROAD-MODEL.md §4). ------------- */
var ROAD_VOCAB = {
  wheel:        ['700c', '650b'],                          // NOT the MTB 29/275/26/24
  freehub:      ['hg-road', 'hg-l2', 'micro-spline-road', 'xdr', 'n3w', 'campag-11'],  // NOT the MTB HG/XD/MicroSpline
  /* brakeSystem granularities differ by category (schema-road.js note):
     frame/fork/caliper carry disc-flat/disc-post/rim-caliper; brifters carry
     disc-hydraulic/disc-mechanical/rim; wheels carry the coarse disc/rim.
     Rule R17 compares only the disc-vs-rim CLASS, never raw tokens. */
  /* 'disc-is' RECONCILED engine/road-vocab-map (2026-07-22): live in
     GRAVEL_VOCAB.brakeSystem and on the Marin Nicasio+ frame row, whose I.S.
     mount schema-gravel sourced (its own note: "Disc brake, International
     Standard (IS)"). R17 compares only the disc-vs-rim CLASS (roadBrakeClass
     reads the 'disc' prefix), so this changes no verdict — it stops this union
     table from omitting a token the validators accept. */
  brakeSystem:  ['disc-flat', 'disc-post', 'rim-caliper', 'disc-hydraulic', 'disc-mechanical', 'rim', 'disc', 'disc-is'],
  /* road/gravel meaning — NOT the MTB PM/FM tokens. Carries BOTH sides of R18's
     compare: a frame's/fork's `brakeMount` and a caliper's `mount`. 'is-mount'
     RECONCILED engine/road-vocab-map (2026-07-22) — live in GRAVEL_VOCAB.brakeMount
     (frame/fork side) and on the Nicasio+ frame; R18 is already direction-aware over
     it (post-mount caliper = adapter warning, flat-mount caliper = error). No token
     here claims it can appear on both sides: 'is-mount' is frame/fork-side only
     (no I.S. caliper is cataloged), exactly as R18's own note records. */
  /* 'rim-caliper' ADDED schema/vocab-widen-ab (2026-07-22, Douglas-ruled group A) —
     the recessed-nut mount of a pre-disc road caliper. UNLIKE 'is-mount' it is a
     BOTH-SIDES token by construction: the caliper side is live now (Shimano
     BR-R3000, the row this pass unblocks), and the chassis side is dormant until
     a rim-brake frame/fork is sourced (data/road.js's v1 decision is disc-only).
     schema-road's new disc/rim cross-rule keeps the two halves from ever
     disagreeing with their own brakeSystem. R18 never compares this token against
     a disc mount: brakeMountCheck now returns early when the two ends are of
     different brake CLASSES, because R17 already errors on that and "rim-caliper
     vs flat-mount" is not an adapter question. */
  brakeMount:   ['flat-mount', 'post-mount', 'is-mount', 'rim-caliper'],
  /* rearAxle carries BOTH sides of rule R2/R3's exact-match compare: a frame's
     `rearAxle` and a rear wheel's `hub`. RECONCILED engine/road-vocab-lint
     (2026-07-22): '12x148', '135x9-qr' and '135x10-qr' were live in
     GRAVEL_VOCAB.rearAxle and on real data/gravel.js frame rows while this
     union table still listed only the three road tokens — the same
     documentation-vs-validator drift that made R15 silently dormant for
     shimano-grx-10 (see the system note below). Sourcing for each lives at
     GRAVEL_VOCAB.rearAxle in src/schema-gravel.js (Salsa Cutthroat's own
     frame-specs table for 12x148; Marin Nicasio+ / Kona Rove AL / Salsa
     Journeyman spec tables for the two QR classes). Adding them here changes
     NO verdict — the engine compares part values directly and never gates on
     this table — it only stops the table from lying about what the datasets
     hold. NOTE (not this task's fix, flagged to the coordinator): no cataloged
     rear wheel carries a QR `hub`, so a 135x*-qr frame still errors against
     every wheel in R3. That is a TRUE won't-fit over a real catalog gap, not a
     false verdict; the gravel-qr-wheels lane owns it. */
  rearAxle:     ['12x142', 'qr130', 'qr135', '12x148', '135x9-qr', '135x10-qr'],
  /* frontAxle carries BOTH sides of R2's exact-match compare: a fork's `axle`
     and a front wheel's `hub`. 'lefty-proprietary' and '15x100' RECONCILED
     engine/road-vocab-map (2026-07-22) — both are live in GRAVEL_VOCAB.axle and
     on real data/gravel.js FORK rows (one each). They are FORK-SIDE ONLY: no hub
     carries them, and listing them here is not a claim that one could — it is the
     same both-sides-of-one-compare union rearAxle documents above. A Lefty fork
     therefore errors against every cataloged wheel: a TRUE won't-fit over a real
     catalog gap (no Lefty hub is cataloged), not a false verdict.
     DELIBERATELY NOT RECONCILED: GRAVEL_VOCAB.axle also lists '12x142', which NO
     fork row uses and which is REAR spacing — adding it to the FRONT axis would
     document an interface that cannot exist. Flagged to the coordinator as
     suspected dead vocab on the gravel side rather than mirrored here. */
  frontAxle:    ['12x100', 'qr100', 'lefty-proprietary', '15x100'],
  /* steerer = the R4 axis ONLY: frame.steerer vs fork.steerer, and headset.steerer
     vs fork.steerer. DELIBERATELY EXCLUDED: schema-road's steererRG also accepts
     '1-1-8', but every one of the 14 catalog rows carrying that token is a STEM or
     one-piece COCKPIT row (road stem.steerer x11, cockpit.steerer x3), where the
     value means the stem's CLAMP BORE, not a fork's steerer standard — and both
     of those fields are deliberately un-vocab'd in schema-road (plain strings).
     No frame/fork/headset row in either dataset uses it; they all use
     'straight-1-1-8'. R4 reads no stem or cockpit, so the stem-side axis has no
     entry in this table at all (see ROAD_VOCAB_MAP_EXCLUDED). Admitting '1-1-8'
     here would document two spellings of one thing on ONE exact-match axis — the
     pf86/bb86 false-mismatch shape. The suspected duplicate spelling inside
     steererRG is flagged to the coordinator; retiring it is a schema call. */
  steerer:      ['tapered', 'straight-1-1-8',
                 'straight-1-1-4',     // wider constant-diameter (1-1/4in) tube — Canyon Grizl CF SL fork ("Fork steer tube diameter: 1 1/4\""), the Wilier-class gap this file's gravel header comment logged; never conflated with the narrower straight-1-1-8 token
                 // Proprietary non-round steerer SYSTEMS (Douglas-ruled 2026-07-21) — one
                 // token per system, NEVER one shared 'proprietary' token: the rg-steerer /
                 // rg-headset-steerer checks are exact-match, so a shared token would let a
                 // Cannondale Delta fork "fit" a Giant OverDrive frame (false fits). Per-system
                 // tokens make same-system pairs fit and everything else error, truthfully,
                 // with zero engine changes. Precedent: gravel's 'lefty-proprietary' axle.
                 'cannondale-delta',   // Cannondale "Delta" 1-1/8→1-1/4 non-round (SuperSix EVO)
                 'overdrive-aero',     // Giant D-shaped "OverDrive Aero" (TCR/Defy/Propel)
                 'bmc-ics-flat'],      // BMC ICS "flat steerer" — Teammachine SLR 01 owner's manual: ICS-cockpit-only, standard round stems explicitly incompatible
  system:       ['shimano-road-12', 'shimano-road-11', 'shimano-grx-12', 'shimano-grx-11',
                 /* 'shimano-grx-10' RECONCILED engine/road-vocab-lint (2026-07-22): the
                    RX400 2x10 tier landed in GRAVEL_VOCAB.system and on 4 data/gravel.js
                    rows (gravel-depth-3) but reached NEITHER this table NOR
                    ROAD_SYSTEM_CHAIN below — so R15's `wantStd` was `undefined` and the
                    chain-standard check did NOTHING for the whole live GRX-10 tier (a
                    Flattop or Campagnolo chain on an RX400 drivetrain went green). That
                    silent dormancy, not a wrong verdict, is the failure mode
                    test-road-golden.js's vocab lint now guards. */
                 'shimano-grx-10',
                 'sram-axs-road', 'sram-xplr-12', 'sram-xplr-13',
                 /* >>> HARD GUARD — 'sram-apex-mech-12' IS XPLR/FLATTOP ONLY. <<<
                    ROAD_SYSTEM_CHAIN maps this token to 'flattop', which is correct for
                    every row carrying it today (all SRAM Apex XPLR). But the token is
                    NAMED for the whole mechanical Apex tier, and Apex EAGLE is the other
                    half of that tier and takes an EAGLE chain, NOT Flattop — sram.com's
                    own Apex Eagle rear-derailleur page (RD-APX-152-D1) specs
                    "Chain Technology | Eagle" and its feature list says verbatim "Use with
                    Eagle chain" (fetched 2026-07-22). The two tiers even SHARE the
                    mechanical lever SD-APX-D1 ("Works with 12-speed mechanical Apex and
                    Eagle shifters"), so the shifter alone cannot tell them apart — and R15
                    falls back to the shifter when no cassette/RD is picked.
                    THEREFORE: an Apex Eagle row REQUIRES ITS OWN system token (plus its own
                    ROAD_SYSTEM_CHAIN entry and an 'eagle' chainStd token) BEFORE it is
                    entered. Filing one under this token would produce a false "won't fit"
                    against its correct Eagle chain AND a false "fits" for a Flattop chain.
                    The split itself is a coordinator/Douglas call and is queued; until then
                    test-road-golden.js pins that no row under this token is Eagle-tier. */
                 'sram-apex-mech-12',
                 /* 'sram-rival22-11' ADDED road-depth-1 wave (2026-07-22): SRAM Rival 22, a
                    real, still-listed (sram.com/en/sram/road/series/sram-rival) 2x11
                    mechanical road groupset PRE-DATING Flattop — its own model pages
                    (RD-RIV-B1/FD-RIV-B1/FC-RIV-2X11-A1/CS-PG-1130/CN-1170-A1) describe a
                    standard HG-compatible 11-speed chain interface, a genuinely distinct
                    system from sram-apex-mech-12 (T-Type/Flattop, 12-speed) — never conflate. */
                 'sram-rival22-11',
                 'campag-ekar-13', 'campag-12', 'campag-11'],
  /* the road SPLIT of MTB's cable/electronic — the R14 CONTROL axis
     (shifter/FD/RD only). DELIBERATELY NOT WIDENED with 'hydraulic'
     (engine/road-vocab-map, 2026-07-22): GRAVEL_VOCAB.actuation is a MERGED key
     serving shifter/FD/RD **and** brake.actuation **and** dropper.actuation, so
     its 'hydraulic' member is a BRAKE-side value that already lives in
     actuationBrake below — the apparent gap is an artifact of gravel's merged key,
     not a missing token. Adding it here would say a brifter can be 'hydraulic' on
     R14's axis, which is false, and would mask a real future drift. */
  actuation:    ['mechanical', 'di2-wired', 'axs-wireless'],
  actuationBrake: ['hydraulic', 'mechanical'],             // caliper-side axis, distinct from shifter actuation
  chainStd:     ['hg', 'flattop', 'campag'],               // chain `system` field carries these, not a systemRoad token
  /* rotorMount — the R7 axis (rotor.mount vs a wheel's rotorMount). ADDED
     engine/road-vocab-map (2026-07-22): R7 has been live since this engine
     shipped, but the axis had NO entry in this union table at all — the same
     documentation gap class as the tokens reconciled around it, one step worse.
     Both tokens are real and in use (rotor.mount center-lock/6-bolt in both
     datasets; every cataloged wheel is center-lock). Sources on the schema side:
     schema-road's rotorMountRG and schema-gravel's rotorMount + rotorInterface. */
  rotorMount:   ['center-lock', '6-bolt'],
  /* 'pf86' retired 2026-07-21 — merged into 'bb86' (same physical 86.5mm press-fit
     shell, two spellings; see schema-road.js's header note).
     RECONCILED engine/road-vocab-map (2026-07-22), all four from the FRAME/BB-SHELL
     side of R11 (frame.bb + bb.shell), each already sourced where schema-gravel
     accepted it: 't47-86' (GRAVEL_VOCAB.shell AND .bb; 6 frame rows + 1 BB row),
     'pf92' (Salsa Cutthroat's own frame-specs table, "Press Fit BB92, 41 x 92 mm"),
     'bsa-73' (Kona Sutra LTD's own build spec, "B/B SRAM GXP 73mm"), 'square-taper'
     (Marin Nicasio+ frame row). NOTE flagged to the coordinator, not fixed here: the
     Nicasio+'s frame.bb:'square-taper' looks like a mis-fielded value (square taper
     names the BB unit's SPINDLE interface; the frame's shell is threaded) — a
     catalog-data question, out of this pass's scope, so the token is documented as
     accepted-and-in-use rather than quietly dropped.
     DELIBERATELY NOT RECONCILED: GRAVEL_VOCAB.bb also accepts 't47a-bbright', but
     that key is MERGED (it vocabs frame.bb AND crankset.bb — shells and spindles in
     one list) and NO row uses the token, so nothing in the schemas' own usage says
     which side it belongs to. Attributing it by name alone would be exactly the
     guess THE BAR forbids; the data lint will force the decision the day a row
     lands. */
  bbShell:      ['bsa-road', 'bb86', 'bb386evo', 'bbright', 'pf30', 't47-road', 'italian',
                 'bb90-road', 'bb30a', 't47-86', 'pf92', 'bsa-73', 'square-taper'],
  /* 'square-taper' RECONCILED engine/road-vocab-map (2026-07-22) from
     GRAVEL_VOCAB.spindle, which vocabs bb.spindle ONLY — an unambiguous one-field
     key, so the crank-side attribution needs no guess. No cataloged gravel crank or
     BB uses it yet (schema-gravel landed it for shell/spindle-pair completeness);
     it is listed because this table documents what the validators ACCEPT. */
  /* 'gxp' ADDED schema/vocab-widen-ab (2026-07-22) alongside the schema-road
     widening — SRAM's pre-DUB 24/22mm stepped spindle, backed by the Rival 22
     GXP crank row this pass enters (sram.com FC-RIV-2X11-A1: spindle options
     "30mm, GXP"). Never merge with '24mm-road': a GXP non-drive spindle end is
     22mm and seats on the bearing inner race, so a Shimano 24mm BB does not
     take it — merging them would be the pf86/bb86 false-MATCH shape, the
     mirror of the false-mismatch one. */
  crankBb:      ['dub', 'dub-wide', '24mm-road', '30mm', 'ultra-torque', 'square-taper', 'gxp'],
  /* seatpostDia = R12's bore axis, and R12 compares a FRAME's `seatpost` against a
     post's/dropper's `diameter`. 'proprietary' RECONCILED engine/road-vocab-map
     (2026-07-22) as the FRAME-SIDE SENTINEL for an aero/D-shaped bore (R12 branches
     on `frame.seatpost === 'proprietary'`; 29 frame rows carry it). This is not a
     guess about the field-key correspondence: schema-road's own frame.seatpost rule
     states it verbatim — "diameter token (seatpostDiaRG) OR 'proprietary'" — and
     GRAVEL_VOCAB.seatpost lists it. It is NOT a post diameter: schema-road's
     seatpostDiaRG deliberately excludes it on the post side, no cataloged post or
     dropper row carries it, and a round post can never be 'proprietary'. */
  seatpostDia:  ['27.2', '30.9', '31.6', 'proprietary'],
  clamp:        ['31.8', '35'],
  /* 'none' = 1x-only frame (no FD provision) — the only value R16b reads.
     'band-28.6' RECONCILED engine/road-vocab-map (2026-07-22): live in
     GRAVEL_VOCAB.frontDerailleurMount and on 2 frame rows (All-City Gorilla Monsoon,
     Bombtrack Hook EXT — both fetched by the wave that added it). Flagged to the
     coordinator, not merged here: 'band' (schema-road, accepted but used by no row)
     and 'band-28.6' (schema-gravel) look like two spellings of one clamp-on mount,
     the pf86/bb86 shape. No verdict rides on it — R16 checks only 'none' and
     deliberately does NOT match braze-on-vs-band — so this is documentation drift,
     not a live wrong verdict; retiring either token is a schema call. */
  fdMount:      ['braze-on', 'band', 'none', 'band-28.6'],
  rdMount:      ['std-hanger', 'udh-fullmount'],
  chainrings:   ['1x', '2x']
};

/* =============================================================================
   ROAD_VOCAB <-> SCHEMA FIELD-KEY CORRESPONDENCE  (engine/road-vocab-map,
   2026-07-22 — the follow-up engine/road-vocab-lint's report §5 asked for)
   -----------------------------------------------------------------------------
   WHY THIS EXISTS. ROAD_VOCAB is documented as the union of what
   src/schema-road.js (LOCAL_VOCAB) and src/schema-gravel.js (GRAVEL_VOCAB)
   accept. Enforcing that needs an EXPLICIT correspondence between three
   independently-named tables, and the naive assumption "same axis => same key"
   is FALSE in both directions:

     - three GRAVEL_VOCAB keys are MERGED across engine axes — `hub` vocabs both
       wheel ends, `actuation` vocabs shifters AND brake calipers AND droppers,
       `bb` vocabs frame SHELLS and crank SPINDLES — so mapping any of them
       wholesale to one ROAD_VOCAB key would manufacture bogus "gaps";
     - two schema keys carry tokens that belong to NO engine axis: gravel's
       fork-side `axle` holds 'lefty-proprietary'/'15x100' (not hub values), and
       road's `steererRG` holds '1-1-8', which every row using it uses as a STEM
       clamp bore, never as a fork steerer standard.

   THE RESOLUTION, and the rule this table is built on: correspondence is decided
   by the SCHEMAS' OWN USAGE — which (category, field) pairs each vocab key
   actually validates, cross-checked against which fields each engine rule reads
   — never by name similarity. A merged key is mapped through its ROWS (a
   category+field selector), which is unambiguous, rather than through its token
   list, which is not. Where neither route justifies a mapping, the key gets an
   explicit entry in ROAD_VOCAB_MAP_EXCLUDED with the reason, and is NOT guessed:
   a wrong mapping yields either false lint failures or false confidence, and THE
   BAR forbids both exactly as it forbids a false verdict.

   WHAT IT IS FOR. (a) documentation: the union claim above is now checkable
   rather than asserted; (b) test/test-road-golden.js's data-token lint iterates
   `rows` below, so EVERY mapped axis is guarded, not the four the first pass
   could justify; (c) test-road-golden.js also pins that every key of both schema
   vocabs appears here exactly once — mapped or excluded — so a NEW schema vocab
   key cannot land unclassified and silently unlinted.

   WHAT IT IS NOT. It is not a token-superset assertion. `schemaRoad`/
   `schemaGravel` name the keys whose token set belongs to this axis, and
   `schemaShared` names merged keys that only partly do; NOTHING here claims
   every token of a listed key is in the ROAD_VOCAB key (the deliberate
   non-reconciliations are documented at the tokens above: gravel `axle`'s
   '12x142', gravel `bb`'s 't47a-bbright'). It is also, like ROAD_VOCAB itself,
   INERT AT RUNTIME: checkRoadBuild never reads it, so nothing here can change a
   verdict.
   ========================================================================== */
/** A set of catalog rows an axis is measured over: every row whose `cat` is in
 *  `cats`, read at field `field`. Array-valued fields (frame.wheelSizes, a
 *  gravel fork's `wheel`) are checked element-wise by the lint.
 *  @typedef {{cats: string[], field: string}} RoadVocabRowSel */
/** One engine axis: the ROAD_VOCAB key(s) that hold its tokens, the schema vocab
 *  keys that correspond, and the rows that must stay inside it.
 *  @typedef {{key: string, keys?: string[], schemaRoad: string[], schemaGravel: string[],
 *             schemaShared?: string[], rules: string, rows: RoadVocabRowSel[], why: string}} RoadVocabMapEntry */
/** @type {RoadVocabMapEntry[]} */
var ROAD_VOCAB_MAP = [
  { key: 'wheel', schemaRoad: ['wheelRG'], schemaGravel: ['wheel'], rules: 'R1',
    rows: [ {cats: ['frame'], field: 'wheelSizes'},
            {cats: ['fork', 'frontwheel', 'rearwheel', 'tire'], field: 'wheel'} ],
    why: 'Both schemas vocab the identical five fields with identical token sets. A frame states its sizes as an ARRAY (wheelSizes) and a gravel fork\'s `wheel` is an array too — R1 reads both shapes, so the lint checks elements, never the array.' },

  { key: 'freehub', schemaRoad: ['freehubRG'], schemaGravel: ['freehub'], rules: 'R5',
    rows: [ {cats: ['frontwheel', 'rearwheel', 'cassette'], field: 'freehub'} ],
    why: 'Both sides of R5\'s compare (a cassette\'s required body vs the rear wheel\'s driver) share one token set in both schemas. frontwheel.freehub is in the selector because schema-gravel accepts it (optional) — a front hub has no driver, so any value there is a data error the lint would catch as an out-of-vocab token only if it were one; its real guard is schema-gravel\'s own note.' },

  { key: 'brakeSystem', schemaRoad: ['brakeSystem', 'brakeSystemWheel'], schemaGravel: ['brakeSystem'], rules: 'R17, R19',
    rows: [ {cats: ['frame', 'fork', 'frontwheel', 'rearwheel', 'shifter', 'brake'], field: 'brakeSystem'} ],
    why: 'TWO road keys, ONE gravel key, one ROAD_VOCAB key — deliberate, and already ROAD_VOCAB.brakeSystem\'s documented shape: the granularity differs per category (frame/fork/caliper disc-flat|disc-post|disc-is, brifters disc-hydraulic|disc-mechanical|rim, wheels the coarse disc|rim), which is why R17 compares only the disc-vs-rim CLASS via roadBrakeClass and never raw tokens. The union is the axis; the per-category subsets stay the schemas\' job.' },

  { key: 'brakeMount', schemaRoad: ['brakeMountRG'], schemaGravel: ['brakeMount', 'caliperMount'], rules: 'R18',
    rows: [ {cats: ['frame', 'fork'], field: 'brakeMount'},
            {cats: ['brake'], field: 'mount'} ],
    why: 'Both sides of R18\'s compare, under two different FIELD names: the mount lives on frame/fork as `brakeMount`, on the caliper as `mount`. schema-gravel splits the two sides into two keys (brakeMount = frame/fork, caliperMount = caliper) where schema-road uses one; both are the same axis. The `mount` field is category-scoped here because three OTHER categories also use a field called `mount` (FD, RD, rotor) on three unrelated axes — the exact trap a field-name-only lint would fall into.' },

  { key: 'rearAxle', schemaRoad: ['rearAxleRG'], schemaGravel: ['rearAxle'], schemaShared: ['hub'], rules: 'R3',
    rows: [ {cats: ['frame'], field: 'rearAxle'},
            {cats: ['rearwheel'], field: 'hub'} ],
    why: 'Both sides of R3 (frame.rearAxle vs rearwheel.hub). GRAVEL_VOCAB.hub is SHARED, not mapped: it vocabs frontwheel.hub AND rearwheel.hub in one list, so treating it as the rear axis would report its front-only \'12x100\' as a bogus rear-axle gap (and vice versa on frontAxle). Mapping it by ROWS instead of by tokens resolves it exactly — the row\'s category says which end it is.' },

  { key: 'frontAxle', schemaRoad: ['frontAxleRG'], schemaGravel: ['axle'], schemaShared: ['hub'], rules: 'R2',
    rows: [ {cats: ['fork'], field: 'axle'},
            {cats: ['frontwheel'], field: 'hub'} ],
    why: 'Both sides of R2 (fork.axle vs frontwheel.hub). GRAVEL_VOCAB.axle vocabs fork.axle only, so it IS this axis — but it holds fork-side-only values (\'lefty-proprietary\', \'15x100\'), which is why this table is explicit that a listed token is not a claim it can appear on both sides. Same shared-`hub` reasoning as rearAxle.' },

  { key: 'steerer', schemaRoad: ['steererRG'], schemaGravel: ['steerer'], rules: 'R4 (rg-steerer, rg-headset-steerer)',
    rows: [ {cats: ['frame', 'fork', 'headset'], field: 'steerer'} ],
    why: 'R4 reads frame/fork/headset ONLY. Both schema keys map here outright — but each ALSO reaches a stem: schema-gravel vocab-checks stem.steerer against its `steerer` key, and schema-road parks the stem-side token \'1-1-8\' in steererRG while leaving stem.steerer itself un-vocab\'d. A stem\'s CLAMP BORE is not a fork\'s steerer standard (the two datasets do not even spell it alike — road stems say \'1-1-8\', gravel stems say \'tapered\'), and R4 never reads a stem, so stem/cockpit rows are OUT of the selector. Those two sub-uses are recorded as pseudo-entries in ROAD_VOCAB_MAP_EXCLUDED — an excluded SUB-USE of a mapped key, which is not the same thing as a key shared between two mapped axes.' },

  { key: 'system', keys: ['system', 'chainStd'], schemaRoad: ['systemRoad'], schemaGravel: ['system'], rules: 'R13, R15',
    rows: [ {cats: ['shifter', 'frontderailleur', 'rearderailleur', 'cassette', 'chain'], field: 'system'} ],
    why: 'TWO ROAD_VOCAB keys against ONE schema key in each file, because a CHAIN row\'s `system` carries its width standard (hg/flattop/campag) rather than a drivetrain group — both schemas therefore list the chain standards inside their system vocab. R13 reads the drivetrain tokens, R15 the chain standards; the union is what a `system` field may legally hold. This is the mapping the first pass already proved out, restated here so the table is complete.' },

  { key: 'actuation', schemaRoad: ['actuationRG'], schemaGravel: [], schemaShared: ['actuation'], rules: 'R14',
    rows: [ {cats: ['shifter', 'frontderailleur', 'rearderailleur'], field: 'actuation'} ],
    why: 'The CONTROL axis (mechanical vs Di2-wired vs AXS-wireless). schemaGravel is EMPTY on purpose: GRAVEL_VOCAB.actuation is a merged key spanning this axis, the brake axis and the dropper remote, so no gravel key corresponds one-to-one — it is mapped by rows through this entry and the actuationBrake entry, and its dropper use is excluded. This is why the drift audit\'s "actuation is missing hydraulic" item is an ARTIFACT, not a gap: \'hydraulic\' is the brake axis\'s token and already lives in actuationBrake.' },

  { key: 'actuationBrake', schemaRoad: ['actuationBrake'], schemaGravel: [], schemaShared: ['actuation'], rules: 'R19 (brifterBrakeCheck)',
    rows: [ {cats: ['brake'], field: 'actuation'} ],
    why: 'The caliper axis (hydraulic vs mechanical). schema-road keeps it as its own key for exactly the reason this table needs — its own note: the value sets "do not overlap" with the shifter axis, so accepting a shifter-side token on a brake row (or vice versa) must stay impossible. schema-gravel merged the two, so the split is recovered here by row category.' },

  { key: 'bbShell', schemaRoad: ['bbShellRoad'], schemaGravel: ['shell'], schemaShared: ['bb'], rules: 'R11 (rg-bb-shell)',
    rows: [ {cats: ['frame'], field: 'bb'},
            {cats: ['bb'], field: 'shell'} ],
    why: 'The FRAME-shell half of R11. schema-road\'s bbShellRoad vocabs frame.bb + bb.shell together, and GRAVEL_VOCAB.shell vocabs bb.shell alone — both unambiguous. GRAVEL_VOCAB.bb is SHARED: it vocabs frame.bb (a shell) AND crankset.bb (a spindle) from one list holding both kinds, so its tokens can only be attributed by the row that uses them. That is why \'t47a-bbright\', which no row uses, is deliberately left unattributed.' },

  { key: 'crankBb', schemaRoad: ['crankBbRoad'], schemaGravel: ['spindle'], schemaShared: ['bb'], rules: 'R11 (rg-bb-spindle), rg-bb-advisory',
    rows: [ {cats: ['crankset'], field: 'bb'},
            {cats: ['bb'], field: 'spindle'} ],
    why: 'The CRANK-spindle half of R11 — the mirror of bbShell, sharing the same merged GRAVEL_VOCAB.bb. Note the field trap this resolves: a CRANKSET\'s `bb` is a spindle interface while a FRAME\'s `bb` is a shell standard, i.e. the same field name on two different axes, disambiguated only by category.' },

  { key: 'seatpostDia', schemaRoad: ['seatpostDiaRG'], schemaGravel: ['seatpost', 'dropperDiameter'], rules: 'R12, R12/dropper',
    rows: [ {cats: ['frame'], field: 'seatpost'},
            {cats: ['seatpost', 'dropper'], field: 'diameter'} ],
    why: 'Both sides of R12, which compares a frame\'s bore against a rigid post\'s AND a dropper\'s diameter. The frame side is asymmetric and the schemas say so themselves: schema-road types frame.seatpost as a loose string whose comment reads "diameter token (seatpostDiaRG) OR \'proprietary\'", and GRAVEL_VOCAB.seatpost lists \'proprietary\' — so the sentinel is a frame-side member of this axis, never a post diameter (schema-gravel\'s dropperDiameter split exists for the same reason).' },

  { key: 'clamp', schemaRoad: ['clampRG'], schemaGravel: ['clamp'], rules: 'R10',
    rows: [ {cats: ['handlebar', 'stem'], field: 'clamp'} ],
    why: 'Both sides of R10\'s bar-vs-stem compare; identical field and meaning in both schemas.' },

  { key: 'fdMount', schemaRoad: ['frontDerailleurMount'], schemaGravel: ['frontDerailleurMount'], rules: 'R16b',
    rows: [ {cats: ['frame'], field: 'frontDerailleurMount'},
            {cats: ['frontderailleur'], field: 'mount'} ],
    why: 'The frame\'s FD provision and the FD\'s own mount type — one axis, two field names, same key name in both schemas. R16b reads only \'none\' (no provision) and deliberately does NOT match braze-on against band, so the braze-on/band/band-28.6 tokens are documentation here, not verdict inputs.' },

  { key: 'rdMount', schemaRoad: ['mountRD'], schemaGravel: ['mountRD'], rules: 'R20 (rg-xplr-udh)',
    rows: [ {cats: ['rearderailleur'], field: 'mount'} ],
    why: 'The RD\'s dropout interface; R20 fires on \'udh-fullmount\'. One-sided by nature — the frame side of that rule is a boolean `udh` field, not a token, so it is not part of this axis.' },

  { key: 'chainrings', schemaRoad: ['chainringsRG'], schemaGravel: ['chainrings'], rules: 'R16a, roadSlotRequired',
    rows: [ {cats: ['crankset'], field: 'chainrings'} ],
    why: 'The 1x/2x discriminator. It drives completeness (roadSlotRequired drops the FD slot on a 1x crank) as well as R16a, so a stray token here would silently change what "complete" means.' },

  { key: 'rotorMount', schemaRoad: ['rotorMountRG'], schemaGravel: ['rotorMount', 'rotorInterface'], rules: 'R7',
    rows: [ {cats: ['frontwheel', 'rearwheel'], field: 'rotorMount'},
            {cats: ['rotor'], field: 'mount'} ],
    why: 'Both sides of R7 (rotor.mount vs the wheel hub\'s rotorMount) — the axis that had no ROAD_VOCAB key at all until this pass. schema-gravel splits the sides (rotorMount = wheels, rotorInterface = rotor) for its own stated reason: a ROTOR must never validate as \'post-mount\'. Worth the lint on its own account — schema-road leaves rearwheel.rotorMount un-vocab\'d, so this selector is currently that field\'s ONLY guard.' }
];

/* Schema vocab keys DELIBERATELY NOT mapped to any engine axis. Every key of
   LOCAL_VOCAB and GRAVEL_VOCAB must appear here or in ROAD_VOCAB_MAP exactly once
   (test-road-golden.js pins it), so a new key cannot land unclassified. An entry
   here is a decision with a reason, never an oversight — and for the two entries
   that exist BECAUSE a mapping would have been wrong, the reason is the finding. */
/** `pseudo: true` marks an entry that is NOT a vocab key but a documented
   EXCLUDED SUB-USE of a key mapped above (a merged key one of whose fields
   belongs to no engine axis) — the completeness pin skips those, so they can
   never be mistaken for a key that exists.
   @typedef {{schema: 'road'|'gravel', key: string, pseudo?: boolean, why: string}} RoadVocabExclusion */
/** @type {RoadVocabExclusion[]} */
var ROAD_VOCAB_MAP_EXCLUDED = [
  /* --- the two that a naive superset lint would have got WRONG ------------- */
  { schema: 'road', key: 'steererRG_stemSide', pseudo: true, why: 'NOT A KEY OF ITS OWN — recorded here because steererRG (mapped to `steerer` above) additionally accepts \'1-1-8\', and the STEM/COCKPIT side of that token is excluded from the steerer axis. All 14 rows carrying \'1-1-8\' are road stem.steerer (11) or cockpit.steerer (3), both of which schema-road leaves un-vocab\'d as plain strings; no frame/fork/headset row in either dataset uses it (they all use \'straight-1-1-8\'), and R4 reads no stem or cockpit. Mapping it in would put two spellings of one interface on a single exact-match axis — the pf86/bb86 false-mismatch shape. Flagged to the coordinator as a suspected duplicate spelling inside steererRG; retiring it is a schema call, not this pass\'s.' },
  { schema: 'gravel', key: 'steerer_stemSide', pseudo: true, why: 'NOT A KEY OF ITS OWN — the gravel half of the exclusion above. GRAVEL_VOCAB.steerer (mapped to the `steerer` axis) additionally vocabs stem.steerer, where the cataloged rows carry \'tapered\' — a stem clamping the 1-1/8in upper section of a tapered steerer, i.e. the stem\'s clamp bore rather than the fork\'s steerer standard. R4 reads no stem, the two datasets spell this axis differently (gravel \'tapered\' vs road \'1-1-8\'), and folding stems into the R4 selector would put two unrelated meanings on one exact-match compare.' },
  { schema: 'gravel', key: 'dropperDiameter_actuation', pseudo: true, why: 'NOT A KEY OF ITS OWN — records that GRAVEL_VOCAB.actuation\'s DROPPER use (dropper.actuation) is excluded from both actuation axes. A dropper remote\'s actuation is a third meaning of the word: no engine rule reads it (R14 covers shifter-vs-derailleur, brifterBrakeCheck covers the caliper), and schema-road has no dropper category at all, so there is no road-side counterpart to correspond to. Its live values happen to overlap ROAD_VOCAB.actuation (\'mechanical\'/\'axs-wireless\'), which is precisely why mapping it by token similarity would have looked right and been wrong.' },

  /* --- non-engine axes: real data, but no rule reads them ------------------ */
  { schema: 'road', key: 'side', why: 'shifter.side (left/right/pair) — inventory/packaging fact. No rule reads it; the engine models the brifter PAIR as one slot.' },
  { schema: 'gravel', key: 'side', why: 'shifter.side — the same packaging axis as schema-road\'s `side`, excluded for the same reason: no rule reads it, and this engine models the brifter pair as a single slot.' },
  { schema: 'road', key: 'cage', why: 'rearderailleur.cage (short/medium/long/xplr/mullet) — R6 uses the RD\'s numeric maxCog, never the cage name.' },
  { schema: 'gravel', key: 'cage', why: 'rearderailleur.cage — the same axis as schema-road\'s `cage`, excluded for the same reason: R6 reads the RD\'s numeric maxCog, never the cage name.' },
  { schema: 'road', key: 'ringStdRG', why: 'crankset.ringStd. The MTB engine has a T-Type-chainring-vs-Transmission-chain rule; this engine has NO ringStd rule, so the axis is unread. Recorded as a coverage note for the mechanic review — adding a rule is a separate, sourced decision, and a lint over an unread axis would imply coverage that does not exist.' },
  { schema: 'gravel', key: 'ringStd', why: 'crankset.ringStd — the same axis as schema-road\'s `ringStdRG`, excluded for the same reason: this engine has no chainring-standard rule at all, so linting the axis would imply coverage that does not exist.' },
  { schema: 'road', key: 'pedalStyleRoad', why: 'pedal.style. Pedal threading is universal 9/16in, so no pedal rule exists in any of this project\'s engines.' },
  { schema: 'gravel', key: 'style', why: 'pedal.style — the same axis as schema-road\'s `pedalStyleRoad`, excluded for the same reason: pedal threading is universal 9/16in, so no pedal rule exists in any engine here.' },
  { schema: 'road', key: 'discipline', why: 'disciplines[] — filter/annotation only, never a verdict input (the same contract src/schema.js states for the MTB catalog).' },
  { schema: 'gravel', key: 'material', why: 'frame.material (alloy/steel/titanium) — a display and filter facet. No rule reads frame material, and schema-road has no counterpart key at all, so there is nothing to correspond to.' },
  { schema: 'gravel', key: 'casing', why: 'tire.casing — a brand-native SKU axis (every maker names its own casing tiers), display and filter only. R9 reads a tire\'s numeric width, never its casing.' },
  { schema: 'gravel', key: 'compound', why: 'tire.compound — a brand-native SKU axis like `casing`, display and filter only; no rule reads rubber compound.' },
  { schema: 'gravel', key: 'suspension', why: 'fork.suspension (rigid/suspension) — descriptive; no road/gravel rule branches on it.' },
  { schema: 'gravel', key: 'dropoutType', why: 'frame.dropoutType — landed dormant by its own wave (no gravel single-speed/chain-tension rule exists), display only until one does.' },

  /* --- numeric axes: not tokens ------------------------------------------- */
  { schema: 'gravel', key: 'speeds', why: 'NUMERIC. ROAD_VOCAB holds string token sets only; R13 compares speed COUNTS arithmetically, so a token list would be the wrong shape for it. schema-gravel enumerating the counts it accepts is its own business.' },
  { schema: 'gravel', key: 'minCog', why: 'cassette.minCog — NUMERIC, excluded for the same reason as `speeds`: ROAD_VOCAB holds string token sets, while R6 compares cog counts arithmetically.' },

  /* --- provenance/lifecycle: catalog metadata, not interfaces -------------- */
  { schema: 'road', key: 'status', why: 'Lifecycle (current/discontinued/recalled) — catalog metadata, never a fit input.' },
  { schema: 'gravel', key: 'status', why: 'Lifecycle — the same axis as schema-road\'s `status`, excluded for the same reason: catalog metadata (current/discontinued/recalled), never a fit input.' },
  { schema: 'road', key: 'priceBasis', why: 'Price provenance — catalog metadata recording how a price was established. Never a fit input, and deliberately never an engine axis: pricing must not reach checkRoadBuild.' },
  { schema: 'gravel', key: 'priceBasis', why: 'Price provenance — the same axis as schema-road\'s `priceBasis`, excluded for the same reason: catalog metadata, never a fit input.' }
];

/** Tokens of the named ROAD_VOCAB key(s), for the lint and any caller that needs
 *  an axis's legal values. Throws on an unknown key so a typo in the map is a
 *  loud failure, never a silently-empty allow-list (an empty list would make the
 *  lint pass everything — the exact silent-dormancy shape this table exists to
 *  kill). @param {string[]} keys @returns {string[]} */
function roadVocabTokens(keys){
  /** @type {string[]} */ var out = [];
  keys.forEach(function(k){
    var vals = /** @type {any} */ (ROAD_VOCAB)[k];
    if(!Array.isArray(vals)) throw new Error('ROAD_VOCAB has no key "' + k + '" (ROAD_VOCAB_MAP is out of sync with the table it maps)');
    out = out.concat(vals);
  });
  return out;
}

/** The ROAD_VOCAB key(s) an entry's rows are measured against — `keys` when an
 *  axis spans more than one (only `system`, which spans system + chainStd),
 *  otherwise the entry's own key. @param {RoadVocabMapEntry} e @returns {string[]} */
function roadVocabMapKeys(e){ return e.keys || [e.key]; }

/* SRAM AXS road/XPLR family — the R13 controller-exemption set. SRAM documents
   Rival/Force/RED AXS road parts as cross-compatible ("all AXS controllers")
   and XPLR as part of that ecosystem:
   https://support.sram.com/hc/en-us/articles/6043277756187 (Rival/Force/RED cross-compat)
   https://support.sram.com/hc/en-us/articles/6014226075035 (XPLR cross-compat)
   Both fetched for data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §1b R13. */
var ROAD_SRAM_AXS_SYSTEMS = ['sram-axs-road', 'sram-xplr-12', 'sram-xplr-13'];

/* Chain standard demanded by each drivetrain system (rule R15). Sources:
   - SRAM road/XPLR (incl. mechanical Apex): Flattop is the documented road
     chain family — the fetched sram.com model pages for RD-APX-1-D1 /
     CS-XG-1251-D1 / CS-XG-1271-D1 state "Flattop-chain compatible", and SRAM
     treats "road Flattop chain" as its own width standard distinct from Eagle
     (support.sram.com, fetched — analysis doc §1b R15).
   - Shimano road/GRX: HG chains per productinfo.shimano.com C-charts /
     Compatibility PDF (fetched — analysis doc source list).
   - Campagnolo: its own chain standard; the fetched Campagnolo 12s/11s chain
     technical manual mandates Campagnolo-only pairing
     (campagnolo.com Technical manual_11s_12s_chain, fetched 2026-07-18).

   EVERY system token in ROAD_VOCAB.system / GRAVEL_VOCAB.system MUST have an
   entry here, and every value must be a ROAD_VOCAB.chainStd token. A missing
   entry does not fail loudly — R15 reads `ROAD_SYSTEM_CHAIN[ref.system]`, gets
   `undefined`, and the whole chain-standard check goes SILENTLY DORMANT for
   that tier (every chain, right or wrong, turns green). That is exactly how
   shimano-grx-10 shipped inert. test-road-golden.js now lints both directions;
   NEVER widen a system vocab without adding its entry in the SAME commit. */
/** @type {Object.<string, string>} */
var ROAD_SYSTEM_CHAIN = {
  'shimano-road-12': 'hg', 'shimano-road-11': 'hg',
  'shimano-grx-12': 'hg', 'shimano-grx-11': 'hg',
  /* 'shimano-grx-10' (GRX RX400 2x10) -> 'hg', ADDED engine/road-vocab-lint
     (2026-07-22), closing the silent-dormancy gap described above. Shimano's
     OWN product page for the tier's rear derailleur states the chain family as
     a spec field: bike.shimano.com/en-EU/product/component/grx-10-speed/RD-RX400.html
     lists "SERIES | GRX 10-speed", "Rear speeds | 10" and
     "Compatible chain | HG-X 10-speed" (fetched 2026-07-22 — bike.shimano.com
     is WebFetch-403 walled, so this came through the Exa lane per the fetch
     doctrine). HG-X is Shimano's HG chain family, so the coarse chainStd token
     is 'hg' — the same value every other Shimano road/GRX tier carries.
     Corroborated by productinfo.shimano.com/en/compatibility/C-454 (already
     cited elsewhere in this repo), whose RD-RX400 row lists only CN-HG* chains
     (CN-HG95 / CN-HG94 / CN-HG75 / CN-HG74 / CN-HG54). This engine's chainStd
     axis is width-class only, never speed count — the 10-vs-11-vs-12-speed
     distinction is R13's speed check, not R15's. */
  'shimano-grx-10': 'hg',
  'sram-axs-road': 'flattop', 'sram-xplr-12': 'flattop', 'sram-xplr-13': 'flattop',
  'sram-apex-mech-12': 'flattop',
  'sram-rival22-11': 'hg',
  'campag-ekar-13': 'campag', 'campag-12': 'campag', 'campag-11': 'campag'
};

/* ---- Groups / slots (ROAD-MODEL.md §2). frontDerailleur / rotors are
        DYNAMICALLY required (roadSlotRequired below): a 1x build has no FD
        (the DJ drops-the-derailleur precedent) and a rim-brake build has no
        rotors — the §1d completeness table. bb/headset/cockpit/bartape/
        dropper/pedals are statically optional (live MTB precedent). --------- */
/** @typedef {{key: string, label: string, cat: string, optional?: boolean}} RoadSlotDef */
/** @type {Array<{key: string, label: string, slots: RoadSlotDef[]}>} */
var ROAD_GROUPS = [
  { key:'frame', label:'Frame', slots:[ {key:'frame', label:'Frame', cat:'frame'} ] },
  { key:'fork', label:'Fork', slots:[ {key:'fork', label:'Fork', cat:'fork'} ] },
  { key:'headset', label:'Headset', slots:[ {key:'headset', label:'Headset', cat:'headset', optional:true} ] },
  { key:'wheels', label:'Wheels', slots:[
      {key:'frontWheel', label:'Front Wheel', cat:'frontwheel'},
      {key:'rearWheel', label:'Rear Wheel', cat:'rearwheel'} ] },
  { key:'tires', label:'Tires', slots:[
      {key:'frontTire', label:'Front Tire', cat:'tire'},
      {key:'rearTire', label:'Rear Tire', cat:'tire'} ] },
  { key:'drivetrain', label:'Drivetrain', slots:[
      /* one shifter slot = the L+R brifter pair (ROAD-MODEL.md §2 lean —
         brifters are bought as pairs; the one-tire-category convention) */
      {key:'shifter', label:'Shifter/Brake Levers', cat:'shifter'},
      {key:'frontDerailleur', label:'Front Derailleur', cat:'frontderailleur'},   // required only on a 2x crank (roadSlotRequired)
      {key:'rearDerailleur', label:'Rear Derailleur', cat:'rearderailleur'},
      {key:'cassette', label:'Cassette', cat:'cassette'},
      {key:'chain', label:'Chain', cat:'chain'},
      {key:'crankset', label:'Crankset', cat:'crankset'} ] },
  /* bb: its own optional single-slot group (the live MTB bb/headset pattern —
     buildTotals must not skip it as an unbundled group slot; the rg-bb
     advisory info nudges until one is picked) */
  { key:'bb', label:'Bottom Bracket', slots:[ {key:'bb', label:'Bottom Bracket', cat:'bb', optional:true} ] },
  { key:'brakes', label:'Brakes', slots:[
      {key:'frontBrake', label:'Front Caliper', cat:'brake'},
      {key:'rearBrake', label:'Rear Caliper', cat:'brake'},
      {key:'frontRotor', label:'Front Rotor', cat:'rotor'},   // dropped on a rim-brake frame (roadSlotRequired)
      {key:'rearRotor', label:'Rear Rotor', cat:'rotor'} ] },
  { key:'cockpit', label:'Cockpit', slots:[
      {key:'handlebar', label:'Handlebar', cat:'handlebar'},   // not required when a one-piece cockpit is picked
      {key:'stem', label:'Stem', cat:'stem'},
      {key:'cockpit', label:'One-piece Cockpit', cat:'cockpit', optional:true},
      {key:'bartape', label:'Bar Tape', cat:'bartape', optional:true} ] },
  { key:'seat', label:'Seat', slots:[
      {key:'seatpost', label:'Seatpost', cat:'seatpost'},
      {key:'dropper', label:'Dropper Post', cat:'dropper', optional:true},   // gravel-only pick; never required
      {key:'saddle', label:'Saddle', cat:'saddle'} ] },
  { key:'pedals', label:'Pedals', slots:[ {key:'pedals', label:'Pedals', cat:'pedal', optional:true} ] }
];
/** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */
var ROAD_SLOTS = ROAD_GROUPS.reduce(function(a, g){
  return a.concat(g.slots.map(function(s){ return Object.assign({group: g.key}, s); }));
}, /** @type {Array<{key: string, label: string, cat: string, optional?: boolean, group: string}>} */ ([]));

/* Is this slot required for a "complete" road/gravel build? UI-completeness
   only — never a fit verdict (the compat.js slotRequired contract). The
   §1d data-driven drops:
   - frontDerailleur: required ONLY when the picked crankset is 2x (inverted
     requiredness, the DJ cog/seatpost pattern — a 1x or crankless build never
     blocks on it, and a 2x build without an FD is genuinely incomplete);
   - frontRotor/rearRotor: dropped on a rim-brake frame (no rotors exist);
     required otherwise, incl. the no-frame default (disc-only v1 data);
   - handlebar/stem: dropped when a one-piece cockpit fills both roles;
   - seatpost: dropped when a (gravel) dropper fills the seat-tube role — a
     dropper-equipped gravel build is complete (src/compat-gravel.js's own
     round-1 drop, adopted for shared-engine parity).
   NOTE: ROAD-MODEL.md §2 stars fd/rotors as statically optional while the
   analysis doc §1d specifies these data-driven drops; §1d is implemented
   (flagged as an open question in this round's report). */
/** @param {{key: string, optional?: boolean}} slot @param {Object.<string, any>|null|undefined} build @returns {boolean} */
function roadSlotRequired(slot, build){
  if(slot.optional) return false;
  var b = build || {};
  if(slot.key === 'frontDerailleur')
    return !!(b.crankset && b.crankset.chainrings === '2x');
  if(slot.key === 'frontRotor' || slot.key === 'rearRotor'){
    if(b.frame && typeof b.frame.brakeSystem === 'string' && b.frame.brakeSystem.indexOf('rim') === 0) return false;
    /* WIDENED schema/vocab-widen-ab (2026-07-22): the frame is not the only part
       that can settle this. Once a RIM caliper is picked at an end, that end has
       no rotor to buy — and with no rim-brake FRAME cataloged yet (data/road.js's
       v1 disc-only decision), the frame test alone would have told a Sora
       rim-brake build it was "incomplete" until it bought two rotors it can
       never fit. Per-end, because the ends are independent slots.
       Completeness only — never a fit verdict (the slotRequired contract); a
       genuinely mixed disc/rim build is R17's ERROR, not this function's
       business. */
    var endBrake = b[slot.key === 'frontRotor' ? 'frontBrake' : 'rearBrake'];
    if(endBrake && typeof endBrake.brakeSystem === 'string' && endBrake.brakeSystem.indexOf('rim') === 0) return false;
    return true;
  }
  if((slot.key === 'handlebar' || slot.key === 'stem') && b.cockpit) return false;
  if(slot.key === 'seatpost' && b.dropper) return false;
  return true;
}

/* Input honesty guard (the compat.js resolveBuild lesson, via compat-bmx.js):
   a build of id STRINGS would trip no rule at all — every field read is
   undefined — and return a silent false all-clear. This engine holds no
   catalog, so strings are simply rejected. */
/** @param {Object.<string, any>|null|undefined} build @returns {Object.<string, any>} */
function resolveRoadBuild(build){
  /** @type {Object.<string, any>} */ var out = {};
  var src = build || {};
  Object.keys(src).forEach(function(k){
    var v = src[k];
    if(typeof v === 'string') throw new TypeError('road build.' + k + ' is a string ("' + v + '") - pass part objects, not ids (this engine holds no catalog to resolve them).');
    if(v) out[k] = v;
  });
  return out;
}

/** @param {any} p @returns {string} */
function roadNameOf(p){ return p ? (p.brand + ' ' + p.model) : ''; }

/** The frame's max tire width (mm) for a given wheel size — reads BOTH data
 *  shapes: road `maxTire` (number, single-size frames) and gravel
 *  `maxTireByWheel` (map keyed '700c'/'650b'). Returns null when the maker
 *  published no figure for that size (rule stays dormant — never guessed).
 *  @param {any} frame @param {string|null} wheelSize @returns {number|null} */
function roadFrameMaxTire(frame, wheelSize){
  if(!frame) return null;
  if(frame.maxTireByWheel && wheelSize != null && typeof frame.maxTireByWheel[wheelSize] === 'number')
    return frame.maxTireByWheel[wheelSize];
  if(typeof frame.maxTire === 'number' && !frame.maxTireByWheel) return frame.maxTire;
  return null;
}

/** Does this fork support this wheel size? Fork `wheel` is a string
 *  (data/road.js) or an array (data/gravel.js — dual-size gravel forks).
 *  @param {any} fork @param {string} size @returns {boolean} */
function roadForkTakesWheel(fork, size){
  if(!fork || fork.wheel == null) return true;   // no declared size = unknown, stays silent
  if(Array.isArray(fork.wheel)) return fork.wheel.indexOf(size) >= 0;
  return fork.wheel === size;
}

/** disc-vs-rim CLASS of a brakeSystem token (rule R17 compares classes only —
 *  the per-category token granularities must never be cross-compared raw).
 *  @param {any} v @returns {'disc'|'rim'|null} */
function roadBrakeClass(v){
  if(typeof v !== 'string') return null;
  if(v.indexOf('disc') === 0) return 'disc';
  if(v.indexOf('rim') === 0) return 'rim';
  return null;
}

/* =============================================================================
   checkRoadBuild(build) -> { errors, warnings, infos } of shared Verdicts.
   build: slotKey (see ROAD_SLOTS) -> part object from data/road.js /
   data/gravel.js field conventions. Rules R1..R20 of
   data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §1 — each rule cites its source and
   states its activation/dormancy. Errors = won't fit; warnings = works but
   check; infos = notes.
   ========================================================================== */
/** @param {Object.<string, any>|null|undefined} build @returns {{errors: any[], warnings: any[], infos: any[]}} */
function checkRoadBuild(build){
  /** @type {any[]} */ var errors = [];
  /** @type {any[]} */ var warnings = [];
  /** @type {any[]} */ var infos = [];
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function err(ruleId, slots, msg){ errors.push(new RoadVerdict(ruleId, slots, msg)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg @param {{kind: string, name: string}} [fix] */
  function warn(ruleId, slots, msg, fix){ warnings.push(new RoadVerdict(ruleId, slots, msg, fix)); }
  /** @param {string} ruleId @param {string[]} slots @param {string} msg */
  function info(ruleId, slots, msg){ infos.push(new RoadVerdict(ruleId, slots, msg)); }

  var b = resolveRoadBuild(build);
  var frame = b.frame, fork = b.fork, hset = b.headset,
      fW = b.frontWheel, rW = b.rearWheel, fTire = b.frontTire, rTire = b.rearTire,
      shifter = b.shifter, fd = b.frontDerailleur, rd = b.rearDerailleur,
      cassette = b.cassette, chain = b.chain, crankset = b.crankset, bb = b.bb,
      fBrake = b.frontBrake, rBrake = b.rearBrake, fRotor = b.frontRotor, rRotor = b.rearRotor,
      bar = b.handlebar, stem = b.stem, cockpit = b.cockpit,
      seatpost = b.seatpost, dropper = b.dropper;

  /* R1. Wheel size — every size-carrying part must agree on ONE size (700c or
        650b; no road/gravel analogue of the MTB mullet config exists as a
        maker-sold standard, so a mixed pair is definitional non-fit), the fork
        must support that size, and a frame must list it in wheelSizes.
        Definitional; ERROR. Own ruleId over the disjoint vocab — never the
        MTB wheel-config ruleId. */
  /** @type {Array<[string, string, string]>} */ var ws = [];
  if(fW && fW.wheel != null) ws.push(['Front wheel', fW.wheel, 'frontWheel']);
  if(rW && rW.wheel != null) ws.push(['Rear wheel', rW.wheel, 'rearWheel']);
  if(fTire && fTire.wheel != null) ws.push(['Front tire', fTire.wheel, 'frontTire']);
  if(rTire && rTire.wheel != null) ws.push(['Rear tire', rTire.wheel, 'rearTire']);
  /** @type {string|null} */ var buildSize = null;
  if(ws.length){
    var wsSizes = ws.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(wsSizes.length > 1)
      err('rg-wheel-size', ws.map(function(x){ return x[2]; }),
        'Wheel size mismatch: ' + ws.map(function(x){ return x[0] + ' = ' + x[1]; }).join(', ') + '. A road or gravel build runs one wheel size end to end.');
    else buildSize = wsSizes[0];
  }
  if(buildSize && fork && fork.wheel != null && !roadForkTakesWheel(fork, buildSize))
    err('rg-wheel-size', ['fork'].concat(ws.map(function(x){ return x[2]; })),
      'Wheel size mismatch: ' + roadNameOf(fork) + ' is a ' + (Array.isArray(fork.wheel) ? fork.wheel.join('/') : fork.wheel) + ' fork but the build is ' + buildSize + '.');
  if(buildSize && frame && Array.isArray(frame.wheelSizes) && frame.wheelSizes.indexOf(buildSize) < 0)
    err('rg-wheel-size', ['frame'].concat(ws.map(function(x){ return x[2]; })),
      'Unsupported wheel size: ' + roadNameOf(frame) + ' supports ' + frame.wheelSizes.join(' / ') + ', but this build is ' + buildSize + '.');
  /* frame+fork with no wheels/tires yet: a size-disjoint pair can already be
     rejected (a 700c-only fork cannot serve a 650b-only frame). */
  if(!buildSize && frame && fork && Array.isArray(frame.wheelSizes) && fork.wheel != null){
    var forkSizes = Array.isArray(fork.wheel) ? fork.wheel : [fork.wheel];
    var anyShared = frame.wheelSizes.some(function(/** @type {string} */ s){ return forkSizes.indexOf(s) >= 0; });
    if(!anyShared)
      err('rg-wheel-size', ['frame', 'fork'],
        'Wheel size mismatch: ' + roadNameOf(frame) + ' supports ' + frame.wheelSizes.join(' / ') + ' but ' + roadNameOf(fork) + ' is a ' + forkSizes.join('/') + ' fork.');
  }

  /* R2/R3. Axles — exact-match thru-axle/QR specs (12x100/12x142 the disc
        standard; definitional). ERROR. Same SHAPE as the MTB axle rules over
        the disjoint road axle vocab. */
  if(fork && fW && fW.hub != null && fork.axle != null && fork.axle !== fW.hub)
    err('rg-front-axle', ['fork', 'frontWheel'], 'Front axle mismatch: ' + roadNameOf(fork) + ' takes a ' + fork.axle + ' hub but ' + roadNameOf(fW) + ' is ' + fW.hub + '.');
  if(frame && rW && rW.hub != null && frame.rearAxle != null && frame.rearAxle !== rW.hub)
    err('rg-rear-axle', ['frame', 'rearWheel'], 'Rear axle mismatch: ' + roadNameOf(frame) + ' takes a ' + frame.rearAxle + ' hub but ' + roadNameOf(rW) + ' is ' + rW.hub + '.');

  /* R4. Steerer — fork vs frame head tube, and headset vs fork. Exact-match
        over ['tapered','straight-1-1-8'] (definitional: a tapered steerer
        does not enter a straight 1-1/8 head tube; the reducer-cup direction
        for a straight fork in a tapered frame is real but stays an honest
        ERROR pending the mechanic review — no adapter tier is claimed
        without a documented product, and no catalog row can currently
        produce the pairing). ERROR. */
  if(frame && fork && frame.steerer != null && fork.steerer != null && frame.steerer !== fork.steerer)
    err('rg-steerer', ['frame', 'fork'], 'Steerer mismatch: ' + roadNameOf(fork) + ' has a ' + fork.steerer + ' steerer but ' + roadNameOf(frame) + ' takes ' + frame.steerer + '.');
  if(hset && fork && hset.steerer != null && fork.steerer != null && hset.steerer !== fork.steerer)
    err('rg-headset-steerer', ['headset', 'fork'], 'Headset steerer mismatch: ' + roadNameOf(hset) + ' accepts a ' + hset.steerer + ' steerer but ' + roadNameOf(fork) + ' is ' + fork.steerer + '.');
  /* Proprietary-steerer integrated-headset info (coordinator, 2026-07-21 —
     post-wave-audit M1 resolution): for the per-system non-round steerers
     (cannondale-delta / overdrive-aero) NO complete aftermarket headset SKU
     exists — the maker services these via bearing kits only (oem-posts-1
     wave researched both: Cannondale sells Delta service parts, not a
     complete headset; Giant's OverDrive Aero has aftermarket bearing kits
     only, and this catalog's "complete headsets only" rule excludes those).
     The rg-headset-steerer mismatch ERRORS above stay — a standard headset
     genuinely does not fit these steerers, and downgrading a true won't-fit
     would be a false-fits change. This info fires on the matched OEM
     frame+fork pair with no headset picked, so the rider understands why
     every cataloged headset shows red rather than reading it as a catalog
     gap. */
  if(frame && fork && !hset && frame.steerer != null && frame.steerer === fork.steerer &&
     (frame.steerer === 'cannondale-delta' || frame.steerer === 'overdrive-aero' || frame.steerer === 'bmc-ics-flat'))
    info('rg-headset-proprietary', ['frame', 'fork'], roadNameOf(frame) + ' uses the maker\'s own integrated headset for its proprietary steerer (serviced via bearing kits); aftermarket complete headsets do not fit, so no cataloged headset will show as compatible.');

  /* R5. Freehub body vs cassette — the highest-value drop-bar rule (Shimano
        12-speed freehub guide + SRAM XDR + Campagnolo N3W, all fetched for
        the analysis doc). The exact-match ERROR side ships active
        (definitional). ONE adapter tier ships, because the maker documents
        the adapter as a stocked product: a classic Campagnolo ED-body
        ("campag-11") cassette mounts an N3W wheel with Campagnolo's own
        AC21-N3W adapter ring + longer lockring (campagnolo.com sells AC21-N3W;
        fetched via the cs-campagnolo-record-1029 verification —
        campagnolo.com CCSSUPERRECORD12S page + the Bikerumor N3W teardown
        cited in the analysis doc). The REVERSE (an N3W-native 9/10T cassette
        on the longer ED body) has no adapter and stays the ERROR.
        HG-L2 DUAL-BODY FIT (Shimano C-731 compatibility chart,
        productinfo.shimano.com, fetched verbatim 2026-07-20): the chart's
        matrix marks "HG spline L2 (ROAD 12-speed dedicated)" ✔ for the
        ROAD 12-speed cassette CLASS — all tiers (Dura-Ace/Ultegra/105),
        not Dura-Ace only (the bike.shimano.com article's "Dura-Ace only"
        wording predates the Ultegra/105 12s launches) — and the same
        cassettes also ✔ on "HG spline L" (our 'hg-road'). So a Shimano
        ROAD 12-speed cassette fits BOTH bodies natively — no adapter, no
        caveat — whichever of the two tokens its row carries; the pairing
        is SILENT. The class gate is deliberately narrow: BOTH tokens must
        be in {hg-road, hg-l2} (a road-12 row mis-tokened e.g. 'xdr' keeps
        the error rather than gaining a false "fits"), and non-road-12
        cassettes on an L2 wheel keep the exact-match ERROR — C-731 calls
        L2 "ROAD 12-speed dedicated", so an 11-speed cassette on hg-l2 is
        a true won't-fit. The HG 1.85mm-spacer tier stays [MECHANIC REVIEW]
        and is deliberately NOT softened here (a wrong adapter claim is a
        false "fits"). */
  if(cassette && rW && cassette.freehub != null && rW.freehub != null && cassette.freehub !== rW.freehub){
    var hgRoadBodies = ['hg-road', 'hg-l2'];
    if(cassette.system === 'shimano-road-12' && cassette.speeds === 12
       && hgRoadBodies.indexOf(cassette.freehub) >= 0 && hgRoadBodies.indexOf(rW.freehub) >= 0){
      /* silent — C-731 dual-body fit, see the rule note above */
    }
    else if(cassette.freehub === 'campag-11' && rW.freehub === 'n3w')
      warn('rg-freehub', ['cassette', 'rearWheel'],
        'Freehub adapter needed: ' + roadNameOf(cassette) + ' fits Campagnolo\'s classic ED freehub body, and ' + roadNameOf(rW) + ' has the shorter N3W body - Campagnolo\'s AC21-N3W adapter ring (with its longer lockring) mounts it.',
        {kind: 'adapter', name: 'Campagnolo AC21-N3W adapter'});
    else
      err('rg-freehub', ['cassette', 'rearWheel'],
        'Freehub mismatch: ' + roadNameOf(cassette) + ' needs a ' + cassette.freehub + ' freehub body but ' + roadNameOf(rW) + ' has a ' + rW.freehub + ' body.');
  }

  /* R6. Cassette range vs rear-derailleur capacity — maker-published max
        low sprocket (e.g. the fetched SRAM XPLR pages: 12sp 10-44 / 13sp
        10-46 only; Campagnolo Record "11 to 34 teeth"). Exceeding a
        maker-stated max cog = ERROR. Total-capacity math stays out
        ([MECHANIC REVIEW] — no RD row carries a total-capacity figure). */
  if(cassette && rd && typeof cassette.maxCog === 'number' && typeof rd.maxCog === 'number' && cassette.maxCog > rd.maxCog)
    err('rg-rd-capacity', ['cassette', 'rearDerailleur'], 'Cassette too big: ' + cassette.maxCog + 'T cassette exceeds the ' + roadNameOf(rd) + ' max of ' + rd.maxCog + 'T.');

  /* R7. Rotor interface vs hub — byte-for-byte the MTB rule 9 (disc road/
        gravel hubs use the same two interfaces; analysis doc calls it
        IDENTICAL). DIRECTION-AWARE: a Center-Lock rotor cannot bolt to a
        6-bolt hub (ERROR); a 6-bolt rotor mounts a Center-Lock hub with a
        documented one-piece-rotor adapter (Shimano SM-RTAD05) -> adapter-tier
        WARNING with the structured fix (adapter facts are engine-side pair
        data, never part fields — the compat.js convention). */
  /** @param {any} rotor @param {any} wheel @param {string} rotorSlot @param {string} wheelSlot @param {string} endLabel */
  function rotorMountCheck(rotor, wheel, rotorSlot, wheelSlot, endLabel){
    if(!rotor || !wheel || rotor.mount == null || wheel.rotorMount == null || rotor.mount === wheel.rotorMount) return;
    if(rotor.mount === 'center-lock' && wheel.rotorMount === '6-bolt')
      err('rg-rotor-mount', [rotorSlot, wheelSlot], endLabel + ' rotor mismatch: a Center Lock rotor cannot bolt to ' + roadNameOf(wheel) + '\'s 6-bolt hub.');
    else if(rotor.mount === '6-bolt' && wheel.rotorMount === 'center-lock')
      warn('rg-rotor-mount', [rotorSlot, wheelSlot], endLabel + ' rotor: 6-bolt rotor on a Center Lock hub needs a Center Lock adapter (e.g. Shimano SM-RTAD05; fits one-piece rotors only).', {kind: 'adapter', name: 'Shimano SM-RTAD05'});
    else
      err('rg-rotor-mount', [rotorSlot, wheelSlot], endLabel + ' rotor mismatch: ' + roadNameOf(rotor) + ' is ' + rotor.mount + ' and ' + roadNameOf(wheel) + '\'s hub is ' + wheel.rotorMount + '.');
  }
  rotorMountCheck(fRotor, fW, 'frontRotor', 'frontWheel', 'Front');
  rotorMountCheck(rRotor, rW, 'rearRotor', 'rearWheel', 'Rear');

  /* R8. Rotor size vs sourced fork/frame max — fires ONLY off a part-carried
        maxRotorF/maxRotorR (the rule-18 template; the doc's [MECHANIC REVIEW]
        rejected a hard 140/160 flat-mount default cap because proprietary
        >160 mounts exist — a default would false-block them). WARNING tier
        (the doc's lean; matches the MTB rule-10 oversize warning). Every
        current fork row carries a sourced/convention maxRotorF (160, or the
        Fairlight Cempa's fetched 180); no frame row carries maxRotorR yet, so
        the frame side is dormant. */
  if(fRotor && fork && typeof fork.maxRotorF === 'number' && typeof fRotor.size === 'number' && fRotor.size > fork.maxRotorF)
    warn('rg-rotor-size', ['frontRotor', 'fork'], 'Front rotor size: ' + fRotor.size + 'mm exceeds ' + roadNameOf(fork) + '\'s ' + fork.maxRotorF + 'mm flat-mount max.');
  if(rRotor && frame && typeof frame.maxRotorR === 'number' && typeof rRotor.size === 'number' && rRotor.size > frame.maxRotorR)
    warn('rg-rotor-size', ['rearRotor', 'frame'], 'Rear rotor size: ' + rRotor.size + 'mm exceeds ' + roadNameOf(frame) + '\'s ' + frame.maxRotorR + 'mm max.');

  /* R9. Tire clearance — dormant-until-sourced everywhere (the rule-18
        template): fires only off a maker-published max on the specific frame
        (maxTire / per-size maxTireByWheel), fork (maxTire), or rim (maxTire).
        WARNING tier: the live MTB engine ships frame clearance as a warning
        (rear-tire-frame) and clearance is a rub/mud-room fact, not an
        assembly impossibility — the analysis doc's ERROR lean for the frame
        side is flagged to the mechanic review rather than adopted (severity
        divergence recorded in this round's report). Units: mm on both
        catalogs (never compare against the inch-based MTB data). 14c-shape
        minimum (wheel.minTire) lands dormant — no row carries it. */
  /* ruleIds mirror src/compat-gravel.js's split exactly (rg-tire-clearance =
     frame, rg-tire-fork = fork crown, rg-tire-rim = rim) so the coordinator's
     road/gravel reconciliation is line-comparable. */
  /** @param {any} tire @param {number|null} max @param {string} ruleId @param {string} tireSlot @param {string} hostSlot @param {any} host @param {string} what */
  function tireClearanceCheck(tire, max, ruleId, tireSlot, hostSlot, host, what){
    if(tire && host && typeof max === 'number' && typeof tire.width === 'number' && tire.width > max)
      warn(ruleId, [tireSlot, hostSlot], 'Tire clearance: ' + tire.width + 'mm tire is wider than ' + roadNameOf(host) + '\'s ' + max + 'mm ' + what + ' max.');
  }
  tireClearanceCheck(rTire, roadFrameMaxTire(frame, rTire && rTire.wheel), 'rg-tire-clearance', 'rearTire', 'frame', frame, 'frame');
  tireClearanceCheck(fTire, (fork && typeof fork.maxTire === 'number') ? fork.maxTire : null, 'rg-tire-fork', 'frontTire', 'fork', fork, 'fork');
  tireClearanceCheck(fTire, (fW && typeof fW.maxTire === 'number') ? fW.maxTire : null, 'rg-tire-rim', 'frontTire', 'frontWheel', fW, 'rim');
  tireClearanceCheck(rTire, (rW && typeof rW.maxTire === 'number') ? rW.maxTire : null, 'rg-tire-rim', 'rearTire', 'rearWheel', rW, 'rim');
  if(fTire && fW && typeof fW.minTire === 'number' && typeof fTire.width === 'number' && fTire.width < fW.minTire)
    warn('rg-tire-rim-min', ['frontTire', 'frontWheel'], 'Front tire width: ' + fTire.width + 'mm is below the wheel maker\'s recommended minimum of ' + fW.minTire + 'mm for this rim.');
  if(rTire && rW && typeof rW.minTire === 'number' && typeof rTire.width === 'number' && rTire.width < rW.minTire)
    warn('rg-tire-rim-min', ['rearTire', 'rearWheel'], 'Rear tire width: ' + rTire.width + 'mm is below the wheel maker\'s recommended minimum of ' + rW.minTire + 'mm for this rim.');

  /* R10. Bar/stem clamp — exact-match 31.8/35 (definitional). ERROR.
        Naturally N/A for a one-piece cockpit (it has no clamp fields, so
        nothing fires on it). */
  if(bar && stem && bar.clamp != null && stem.clamp != null && bar.clamp !== stem.clamp)
    err('rg-bar-clamp', ['handlebar', 'stem'], 'Clamp mismatch: ' + roadNameOf(bar) + ' is ' + bar.clamp + 'mm but ' + roadNameOf(stem) + ' clamps ' + stem.clamp + 'mm.');

  /* R11. BB shell vs frame + BB spindle vs crank — the MTB rule-7 pattern
        over the road shell zoo: with a purchasable BB picked, both of its
        interfaces are exact definitional checks; with none picked, an
        advisory INFO nudges (the BB is genuinely sold separately on
        framesets). ERROR / INFO. */
  if(bb && frame && bb.shell != null && frame.bb != null && bb.shell !== frame.bb)
    err('rg-bb-shell', ['bb', 'frame'], 'BB shell mismatch: ' + roadNameOf(bb) + ' fits a ' + bb.shell + ' shell but ' + roadNameOf(frame) + ' has a ' + frame.bb + ' shell.');
  if(bb && crankset && bb.spindle != null && crankset.bb != null && bb.spindle !== crankset.bb)
    err('rg-bb-spindle', ['bb', 'crankset'], 'BB spindle mismatch: ' + roadNameOf(bb) + ' takes a ' + bb.spindle + ' spindle but ' + roadNameOf(crankset) + ' runs a ' + crankset.bb + ' spindle.');
  if(!bb && crankset && frame && crankset.bb != null && frame.bb != null)
    info('rg-bb-advisory', ['crankset', 'frame'], 'Bottom bracket: ' + roadNameOf(crankset) + ' has a ' + crankset.bb + ' spindle - pick the matching ' + frame.bb + '-shell / ' + crankset.bb + ' bottom bracket for this frame (sold separately).');

  /* R12. Seatpost (and gravel dropper) vs frame — DIRECTION-AWARE, the MTB
        rule-13 physics + shim doctrine, plus the proprietary/aero-post LOCK:
        - a proprietary post fits ONLY the frames its maker made it for
          (forFrames — the OEM-shock pattern); any other frame = ERROR;
        - a proprietary-post frame takes no generic round post = ERROR
          (definitional: the aero/D-shape bore is not a round 27.2/30.9/31.6);
        - round-vs-round: bigger post in a smaller bore = ERROR; smaller post
          in a bigger bore = reducing-shim WARNING (shop-approved practice —
          the MTB rule-13 doctrine, Problem Solvers/Wolf Tooth shims). */
  /** @param {any} post @param {string} postSlot @param {string} label */
  function postCheck(post, postSlot, label){
    if(!post || !frame) return;
    if(post.proprietary === true){
      if(Array.isArray(post.forFrames) && post.forFrames.indexOf(frame.id) >= 0) return;
      err('rg-seatpost', [postSlot, 'frame'], label + ' mismatch: ' + roadNameOf(post) + ' is a proprietary post made for specific frames, and ' + roadNameOf(frame) + ' is not one of them.');
      return;
    }
    if(frame.seatpost === 'proprietary'){
      if(post.diameter != null)
        err('rg-seatpost', [postSlot, 'frame'], label + ' mismatch: ' + roadNameOf(frame) + ' takes only its own proprietary (aero/D-shaped) post - a round ' + post.diameter + 'mm post does not fit.');
      return;
    }
    var frameDia = parseFloat(frame.seatpost), postDia = parseFloat(post.diameter);
    if(isNaN(frameDia) || isNaN(postDia)) return;
    if(postDia > frameDia)
      err('rg-seatpost', [postSlot, 'frame'], label + ' too big: ' + roadNameOf(frame) + '\'s seat tube is ' + frame.seatpost + 'mm but ' + roadNameOf(post) + ' is ' + post.diameter + 'mm - a bigger post cannot fit a smaller tube.');
    else if(postDia < frameDia)
      warn('rg-seatpost', [postSlot, 'frame'], label + ' shim needed: a ' + post.diameter + 'mm post in a ' + frame.seatpost + 'mm seat tube works with a ' + frame.seatpost + '-to-' + post.diameter + 'mm reducing shim (sold separately).', {kind: 'adapter', name: frame.seatpost + '-to-' + post.diameter + 'mm seatpost shim'});
  }
  postCheck(seatpost, 'seatpost', 'Seatpost');
  postCheck(dropper, 'dropper', 'Dropper');

  /* R13. Drivetrain: one system + one speed. Systems set = shifter + both
        derailleurs + cassette. The CHAIN is out of the system set (its
        `system` field carries the chainStd axis — rule R15 owns it) and the
        CRANKSET is out of both sets (SRAM's own model pages list the XPLR
        cranks as "12/13-speed" dual-rated — counting a single stored number
        would false-red a genuine SRAM pairing; the MTB engine's M1 lesson).
        R13a AXS-controller exemption: SRAM documents ALL AXS road/XPLR
        controllers as driving all AXS road/XPLR derailleurs (support.sram.com
        6043277756187 + 6014226075035, fetched) — a wireless shifter in a SRAM
        AXS road family is exempt from the one-system set, but stays an honest
        error on a non-SRAM system. */
  /** @type {Array<[string, any, string]>} */ var dt = [];
  if(shifter) dt.push(['Shifter', shifter, 'shifter']);
  if(fd) dt.push(['Front derailleur', fd, 'frontDerailleur']);
  if(rd) dt.push(['Rear derailleur', rd, 'rearDerailleur']);
  if(cassette) dt.push(['Cassette', cassette, 'cassette']);
  if(dt.length > 1){
    var axsCtrl = !!(shifter && shifter.actuation === 'axs-wireless' && ROAD_SRAM_AXS_SYSTEMS.indexOf(shifter.system) >= 0);
    var dtSys = axsCtrl ? dt.filter(function(x){ return x[1] !== shifter; }) : dt;
    var systems = dtSys.map(function(x){ return x[1].system; }).filter(function(v, i, a){ return v != null && a.indexOf(v) === i; });
    /* the SRAM AXS cross-compat also spans the road/XPLR system tokens
       themselves for the CONTROLLER only — mech vs cassette must still agree,
       EXCEPT that SRAM's XPLR pages document 12sp XPLR mechs on AXS road
       cranks/controllers; mech-vs-cassette stays one-system (a 13sp XPLR mech
       over a 12sp road cassette is caught by the speed check anyway). */
    if(systems.length > 1)
      err('rg-drivetrain-system', dtSys.map(function(x){ return x[2]; }),
        'Drivetrain mismatch: ' + dtSys.map(function(x){ return x[0] + ' = ' + x[1].system; }).join(', ') + '. Shifter, derailleurs and cassette must be one system.');
    else if(axsCtrl && systems.length === 1 && ROAD_SRAM_AXS_SYSTEMS.indexOf(systems[0]) < 0)
      err('rg-drivetrain-system', dt.map(function(x){ return x[2]; }),
        'Drivetrain mismatch: ' + dt.map(function(x){ return x[0] + ' = ' + x[1].system; }).join(', ') + '. A SRAM AXS controller only drives SRAM AXS derailleurs.');
    /* One speed count. The AXS CONTROLLER leaves the speed set too (same
       exemption, same sources): SRAM documents all AXS road/XPLR controllers
       driving all AXS road/XPLR derailleurs — the brifter is a speed-agnostic
       wireless button, and a 13sp-labeled XPLR lever over a 12sp XPLR mech is
       a SRAM-documented pairing (counting it would be a false "won't fit";
       src/compat-gravel.js round 1 exempts it identically). The chain joins
       the speed set ONLY when it is speed-defined by its maker: Campagnolo's
       chain manual mandates 12s chains for 12s drivetrains only (fetched
       PDF), and Shimano's C-charts pair HG chains per speed count — but SRAM
       documents ONE Flattop family across its 12sp road and 13sp XPLR
       groups, so a flattop chain is width-defined and stays out (counting it
       would false-red a genuine SRAM-documented pairing — the MTB engine's
       M1 lesson, road edition). */
    /** @type {Array<[string, any, string]>} */ var dtSpeed = dtSys.slice();
    if(chain && typeof chain.speeds === 'number' && chain.system !== 'flattop') dtSpeed.push(['Chain', chain, 'chain']);
    var speeds = dtSpeed.map(function(x){ return x[1].speeds; }).filter(function(v, i, a){ return v != null && a.indexOf(v) === i; });
    if(speeds.length > 1)
      err('rg-drivetrain-speeds', dtSpeed.map(function(x){ return x[2]; }),
        'Speed mismatch: ' + dtSpeed.map(function(x){ return x[0] + ' ' + x[1].speeds + 's'; }).join(', ') + '. The drivetrain must share one speed count.');
  }

  /* R14. Actuation — mechanical vs Di2-wired vs AXS-wireless are three
        mutually incompatible control worlds (a Di2 lever cannot drive an AXS
        mech, a mechanical lever cannot drive either electronic mech; the
        road split of the MTB cable/electronic axis). Exact-match ERROR
        between the shifter and each derailleur. */
  if(shifter && rd && shifter.actuation != null && rd.actuation != null && shifter.actuation !== rd.actuation)
    err('rg-actuation', ['shifter', 'rearDerailleur'], 'Actuation mismatch: ' + roadNameOf(shifter) + ' is ' + shifter.actuation + ' but ' + roadNameOf(rd) + ' is ' + rd.actuation + '. Mechanical, Di2-wired and AXS-wireless controls do not interchange.');
  if(shifter && fd && shifter.actuation != null && fd.actuation != null && shifter.actuation !== fd.actuation)
    err('rg-actuation', ['shifter', 'frontDerailleur'], 'Actuation mismatch: ' + roadNameOf(shifter) + ' is ' + shifter.actuation + ' but ' + roadNameOf(fd) + ' is ' + fd.actuation + '. Mechanical, Di2-wired and AXS-wireless controls do not interchange.');

  /* R15. Chain standard vs system — a chain's `system` is its width standard
        (hg / flattop / campag), and each drivetrain system demands one (the
        ROAD_SYSTEM_CHAIN table above, sources there). ERROR — definitional
        given the system. Reference part order: cassette, then rear
        derailleur, then shifter (first geared part carrying a system). */
  var chainRef = cassette || rd || shifter;
  if(chain && chain.system != null && chainRef && chainRef.system != null){
    var wantStd = ROAD_SYSTEM_CHAIN[chainRef.system];
    if(wantStd && chain.system !== wantStd)
      err('rg-chain-std', ['chain', cassette ? 'cassette' : (rd ? 'rearDerailleur' : 'shifter')],
        'Chain mismatch: a ' + chainRef.system + ' drivetrain runs a ' + wantStd + ' chain, but ' + roadNameOf(chain) + ' is ' + chain.system + '.');
  }

  /* R16. 2x front end. Three teeth, in confidence order:
        16a (ERROR, definitional): a 1x control (frontShift:false — no left
        shift mechanism exists in the lever) cannot run a 2x crank.
        16b (ERROR, definitional): a frame with NO front-derailleur provision
        (frontDerailleurMount:'none' — sourced per frame) gives an FD nowhere
        to mount (the BMX bossless-frame pattern). Braze-on vs band matching
        is deliberately NOT checked — band-clamp adapters for braze-on FDs
        are a real stocked class and no current row carries 'band', so an
        exact-match would guess ([MECHANIC REVIEW]).
        16c (WARNING, data-gated): chainring tooth difference vs the FD's
        maker-published capacity — fires only when the FD row carries
        capacity/maxChainringDiff AND the crank's ring pair parses ('48/35').
        WARNING tier per the doc's lean (capacity numbers are maker-specific
        and the current figures are sample-grade — [MECHANIC REVIEW]). */
  if(crankset && crankset.chainrings === '2x' && shifter && shifter.frontShift === false)
    err('rg-2x-control', ['shifter', 'crankset'], '1x control on a 2x crank: ' + roadNameOf(shifter) + ' has no front-shift mechanism, so it cannot run ' + roadNameOf(crankset) + '\'s two chainrings.');
  if(fd && frame && frame.frontDerailleurMount === 'none')
    err('rg-fd-mount', ['frontDerailleur', 'frame'], 'No front-derailleur mount: ' + roadNameOf(frame) + ' has no front-derailleur provision (1x-only frame) - the ' + roadNameOf(fd) + ' has nowhere to mount.');
  if(fd && crankset && crankset.chainrings === '2x'){
    var fdCap = typeof fd.capacity === 'number' ? fd.capacity : (typeof fd.maxChainringDiff === 'number' ? fd.maxChainringDiff : null);
    var ringPair = typeof crankset.ring === 'string' ? crankset.ring.split('/') : [];
    if(fdCap != null && ringPair.length === 2){
      var ringDiff = Math.abs(parseInt(ringPair[0], 10) - parseInt(ringPair[1], 10));
      if(isFinite(ringDiff) && ringDiff > fdCap)
        warn('rg-fd-capacity', ['frontDerailleur', 'crankset'], 'Front derailleur capacity: ' + roadNameOf(crankset) + '\'s ' + crankset.ring + ' rings are ' + ringDiff + 'T apart, over the ' + roadNameOf(fd) + '\'s ' + fdCap + 'T capacity.');
    }
  }

  /* R17. Rim-brake vs disc consistency — brakeSystem must be one CLASS
        (disc or rim) end to end; a rim wheel on a disc build (or any mix)
        is a hard non-fit. Compares CLASSES only via roadBrakeClass — the
        per-category token granularities (disc-flat vs disc-hydraulic vs
        disc) are never cross-compared raw (schema-road.js's own warning).
        ERROR. With the disc-only v1 data this is a guard: it fires only if
        a stray rim part enters, exactly as the analysis doc intends. */
  /** @type {Array<[string, 'disc'|'rim', string]>} */ var bs = [];
  /** @param {any} p @param {string} label @param {string} slot */
  function pushBrakeClass(p, label, slot){
    var c = p && roadBrakeClass(p.brakeSystem);
    if(c) bs.push([label, c, slot]);
  }
  pushBrakeClass(frame, 'Frame', 'frame');
  pushBrakeClass(fork, 'Fork', 'fork');
  pushBrakeClass(shifter, 'Levers', 'shifter');
  pushBrakeClass(fW, 'Front wheel', 'frontWheel');
  pushBrakeClass(rW, 'Rear wheel', 'rearWheel');
  pushBrakeClass(fBrake, 'Front brake', 'frontBrake');
  pushBrakeClass(rBrake, 'Rear brake', 'rearBrake');
  if(bs.length > 1){
    var classes = bs.map(function(x){ return x[1]; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    if(classes.length > 1)
      err('rg-brake-system', bs.map(function(x){ return x[2]; }),
        'Brake system mismatch: ' + bs.map(function(x){ return x[0] + ' = ' + x[1]; }).join(', ') + '. Disc and rim-brake parts do not mix on one build.');
  }

  /* R18. Brake mount: caliper vs frame/fork — flat-mount is the road/gravel
        disc standard (Shimano-designed; CrankSmith + bicycles.stackexchange
        fetched for the analysis doc) and a caliper of the wrong mount class
        does not bolt to it as built. Exact-match ERROR by default, with the
        DIRECTION-AWARE ADAPTER TIERS ported from the live MTB rule 8
        (src/compat.js; bias-audit 2026-07-17 HIGH-1, the same rule-9/6-bolt-
        on-Center-Lock template):

        POST-MOUNT CALIPER ON AN I.S. MOUNT -> adapter-tier WARNING with a
        structured `fix`, never a false "won't fit". I.S. (International
        Standard) is the pre-flat-mount two-bolt disc mount, and the
        size-specific I.S.-to-post-mount bracket is a stocked, current
        manufacturer product from more than one maker:
          - Shimano's SM-MA-F###P/S line, whose code decodes Front / ###mm
            rotor / Post caliper / Standard(I.S.) mount (si.shimano.com
            DM-SMMA00A) — the same citation the MTB rule rests on;
          - Hope's own brake-mounts page (hopetech.com/products/brakes/
            accessories/brake-mounts/, FETCHED 2026-07-22) states verbatim:
            "International Standard: We offer two mounts for International
            Standard fittings-HBIS20- this mount lifts the caliper allowing you
            to fit a 20mm larger disc- HBIS40- ...40mm larger disc" — and Hope
            sells the post-mount drop-bar caliper (RX4+ Postmount) those mounts
            carry, so the whole path is one maker's catalog.
        The bracket is SIZE-SPECIFIC (rotor size + front/rear end), so the
        message names one concrete example instead of promising a universal
        part. Live case this unblocks: the Marin Nicasio+ (gfr-marin-nicasio-
        plus), whose rear brake slot was a guaranteed hard error whatever you
        picked while every cataloged caliper was flat-mount — a fetched
        velonut.com Nicasio review describes exactly this real-world build ("the
        Promax Render R brakes, which are post-only, are mounted with a
        post-to-IS adaptor"). This unblocks that frame's BRAKE end only; its
        135x9-qr rear spacing still has no matching wheel in data/gravel.js, a
        separate data-coverage gap this rule neither fixes nor masks.

        EVERY OTHER PAIR STAYS AN ERROR (mirroring the MTB rule's asymmetry):
          - FLAT-MOUNT caliper on an I.S. mount: flat-mount->I.S. has no
            mainstream maker path (the MTB rule's research found only a
            boutique A.S. Solutions part, rotor-size-limited and explicitly
            "not compatible with all IS frames/forks"), so claiming a fix would
            itself be a false "fits". It gets its own message because this is
            the LIVE mismatch a gravel rider will actually hit — it points at
            the documented post-mount path instead of a bare "mismatch".
          - An I.S. CALIPER on any other mount: kept as the generic error and
            dormant (no 'is-mount' token exists on the caliper side of
            GRAVEL_VOCAB/schema-road's brakeMountRG, and no I.S. caliper is
            cataloged) — but the branch order above is direction-aware NOW, so
            it is already correct the day one is entered (the rule-9 precedent).
        FLAT-MOUNT <-> POST-MOUNT, BOTH DIRECTIONS -> adapter-tier WARNINGS
        (Douglas ruled option A, 2026-07-22, re-opening the deferral this rule
        shipped with; the divergence from MTB rule 8 is closed and the two
        engines now agree). This is a PORT, not new research: the citations and
        the caveat wording are MTB rule 8's own, from mechanic corpus BRK-28/29
        (2026-07-17/18), which resolved the earlier BRK-17 contradiction by
        finding a mainstream maker path in EACH direction:
          - POST-MOUNT caliper on a FLAT-MOUNT chassis -> Shimano's SM-MA
            adapter line has a dedicated "Flat mount type" section listing
            flat-mount-chassis/post-mount-caliper part numbers (SM-MA-F140P/D,
            SM-MA-F160P/D front; SM-MA-R140P/D, SM-MA-R160P/D, SM-MA-R160D/D
            rear) — si.shimano.com DM-SMMA00A-01 "Mount Adapter" dealer's
            manual, the same document the I.S. tier above rests on. Rotor-size-
            specific, so the message names one example rather than promising a
            universal part.
          - FLAT-MOUNT caliper on a POST-MOUNT chassis -> Wolf Tooth's Post to
            Flat Mount Brake Adapter (wolftoothcomponents.com, fetched
            2026-07-17), a real mainstream SKU. Its message MUST keep both of
            the maker's caveats, because they are what make this a "check it"
            and not a clean fit: the adapter only steps the rotor size UP
            (+20 mm — 140 native -> 160, 160 -> 180, 180 -> 200) and it needs
            sufficient boss clearance (the maker states a 13 mm minimum and
            names Fox Step Cast forks as incompatible).
        The analysis doc's older "rarely pays off" line described cost/faff, not
        fitment — it never was a fits-with-adapter finding either way, so it
        neither blocked this nor supports reverting it.
        WHAT THIS DOES NOT TOUCH: the I.S. tier above (2026-07-22) is unchanged,
        and FM-caliper-on-I.S. stays an ERROR below — flat-mount->I.S. still has
        no mainstream maker path (only the boutique A.S. Solutions part, rotor-
        size-limited and explicitly "not compatible with all IS frames/forks"),
        so a `fix` there would itself be a false "fits".
        LIVE REACH: every gravel/road frame and fork in the catalog is
        flat-mount, and the one post-mount caliper (Hope RX4+ Postmount) was a
        guaranteed hard error against all of them — that whole cross-product is
        now a yellow adapter warning. The reverse direction (a flat-mount
        caliper on a post-mount chassis) is dormant-but-correct: no road/gravel
        frame or fork row is post-mount yet.
        Applied symmetrically to the rear (frame) and front (fork) mount. */
  /** @param {any} caliper @param {any} mountPart @param {string} caliperSlot @param {string} mountSlot @param {string} endLabel @param {string} adapterEg @param {string} fmAdapterEg */
  function brakeMountCheck(caliper, mountPart, caliperSlot, mountSlot, endLabel, adapterEg, fmAdapterEg){
    if(!caliper || !mountPart) return;
    var cm = caliper.mount, pm = mountPart.brakeMount;
    if(cm == null || pm == null || cm === pm) return;   // dormant without either field
    /* CLASS GUARD (schema/vocab-widen-ab, 2026-07-22, with the rim-caliper
       widening). A disc caliper against a rim-brake chassis (or the reverse) is
       not a MOUNT question at all — R17 already errors on the class mismatch in
       the words that actually explain it, and "rim-caliper vs flat-mount" adds
       only a second, mount-shaped restatement that invites an adapter reading
       where no adapter exists. Both sides must state a known class for this to
       bite, so an unknown/absent brakeSystem leaves the mount check exactly as
       it was. NO EXISTING VERDICT CHANGES: every road/gravel frame, fork and
       caliper cataloged before this pass is disc, so the two classes could not
       differ. */
    var ccls = roadBrakeClass(caliper.brakeSystem), mcls = roadBrakeClass(mountPart.brakeSystem);
    if(ccls && mcls && ccls !== mcls) return;
    if(cm === 'post-mount' && pm === 'is-mount')
      warn('rg-brake-mount', [caliperSlot, mountSlot],
        endLabel + ' brake mount: ' + roadNameOf(caliper) + ' is a post-mount caliper and ' + roadNameOf(mountPart) + ' has an I.S. (International Standard) mount - fits with a size-specific I.S.-to-post-mount adapter (e.g. Shimano ' + adapterEg + ', or Hope HBIS20/HBIS40), matched to your rotor size.',
        {kind: 'adapter', name: 'I.S.-to-post-mount caliper adapter, ' + endLabel.toLowerCase() + ' (rotor-size-specific, e.g. Shimano ' + adapterEg + ')'});
    else if(cm === 'post-mount' && pm === 'flat-mount')
      warn('rg-brake-mount', [caliperSlot, mountSlot],
        endLabel + ' brake mount: ' + roadNameOf(caliper) + ' is a post-mount caliper and ' + roadNameOf(mountPart) + ' has a flat mount - fits with a Shimano SM-MA flat-mount-to-post-mount adapter (e.g. ' + fmAdapterEg + '), matched to your rotor size.',
        {kind: 'adapter', name: 'flat-mount-to-post-mount caliper adapter, ' + endLabel.toLowerCase() + ' (e.g. Shimano ' + fmAdapterEg + ')'});
    else if(cm === 'flat-mount' && pm === 'post-mount')
      warn('rg-brake-mount', [caliperSlot, mountSlot],
        endLabel + ' brake mount: ' + roadNameOf(caliper) + ' is a flat-mount caliper and ' + roadNameOf(mountPart) + ' has a post mount - fits with a post-mount-to-flat-mount adapter (e.g. Wolf Tooth Post to Flat Mount); the adapter only steps the rotor size up (+20mm) and needs sufficient boss clearance.',
        {kind: 'adapter', name: 'post-mount-to-flat-mount caliper adapter, ' + endLabel.toLowerCase() + ' (e.g. Wolf Tooth Post to Flat Mount)'});
    else if(cm === 'flat-mount' && pm === 'is-mount')
      err('rg-brake-mount', [caliperSlot, mountSlot],
        endLabel + ' brake mount mismatch: ' + roadNameOf(caliper) + ' is a flat-mount caliper and ' + roadNameOf(mountPart) + ' has an I.S. (International Standard) mount. The adapters makers publish for an I.S. mount take a POST-mount caliper (Shimano SM-MA-*P/S, Hope HBIS20/HBIS40) - pick a post-mount caliper for this frame/fork.');
    else
      err('rg-brake-mount', [caliperSlot, mountSlot], endLabel + ' brake mount mismatch: ' + roadNameOf(caliper) + ' is ' + cm + ' and ' + roadNameOf(mountPart) + ' takes ' + pm + ' calipers.');
  }
  brakeMountCheck(rBrake, frame, 'rearBrake', 'frame', 'Rear', 'SM-MA-R160P/S', 'SM-MA-R160P/D');
  brakeMountCheck(fBrake, fork, 'frontBrake', 'fork', 'Front', 'SM-MA-F160P/S', 'SM-MA-F160P/D');

  /* R19. Brifter/caliper coupling — on a drop bar the brake lever and shifter
        are ONE SKU, so the levers' brake system must be able to actuate the
        calipers. Only the DEFINITIONAL direction ships (the doc's explicit
        lean): a HYDRAULIC caliper behind a non-hydraulic lever has no fluid
        column to drive it — ERROR. The reverse (cable caliper on a hydraulic
        lever) and mechanical-disc lever/caliper matching are [MECHANIC
        REVIEW] and stay silent. Rim-lever-vs-disc-caliper mixes are already
        R17's class error. */
  /** @param {any} caliper @param {string} slot @param {string} endLabel */
  function brifterBrakeCheck(caliper, slot, endLabel){
    if(!caliper || !shifter || caliper.actuation !== 'hydraulic') return;
    if(typeof shifter.brakeSystem === 'string' && roadBrakeClass(shifter.brakeSystem) === 'disc' && shifter.brakeSystem !== 'disc-hydraulic')
      err('rg-brifter-brake', ['shifter', slot], endLabel + ' brake mismatch: ' + roadNameOf(caliper) + ' is hydraulic but ' + roadNameOf(shifter) + ' is a ' + shifter.brakeSystem + ' lever - a cable lever cannot drive a hydraulic caliper.');
  }
  brifterBrakeCheck(fBrake, 'frontBrake', 'Front');
  brifterBrakeCheck(rBrake, 'rearBrake', 'Rear');

  /* R20. SRAM full-mount (UDH) rear derailleur vs frame — the 13sp XPLR E1
        RDs bolt to a UDH dropout with no hanger ("Requires frame with UDH
        interface" on the fetched RD-FRC-1E-E1 / RD-RED-1E-E1 pages); the
        direct analogue of the live MTB rule 4. HONESTY TIERS, because no
        road/gravel frame row carries a udh field yet and inferring UDH
        absence would repeat this week's Cannondale-UDH bug:
        - frame.udh === false (sourced) -> ERROR;
        - frame.udh === true -> silent;
        - frame present, udh UNKNOWN -> INFO (the requirement is definitional
          and worth surfacing, but the frame's compatibility is unrecorded —
          an info cannot false-block);
        - no frame -> INFO (the MTB rule-4 frameless convention). */
  if(rd && rd.mount === 'udh-fullmount'){
    if(frame && frame.udh === false)
      err('rg-xplr-udh', ['frame', 'rearDerailleur'], 'Frame not UDH: ' + roadNameOf(rd) + ' is a hangerless full-mount derailleur that bolts only to a UDH dropout, and ' + roadNameOf(frame) + ' has a standard hanger.');
    else if(frame && frame.udh !== true)
      info('rg-xplr-udh', ['frame', 'rearDerailleur'], 'Check UDH: ' + roadNameOf(rd) + ' mounts only a UDH dropout, and ' + roadNameOf(frame) + '\'s UDH compatibility is not recorded in this catalog - confirm it on the maker\'s page.');
    else if(!frame)
      info('rg-xplr-udh', ['rearDerailleur'], 'Heads-up: ' + roadNameOf(rd) + ' is a hangerless full-mount derailleur and needs a UDH-compatible frame.');
  }

  return { errors: errors, warnings: warnings, infos: infos };
}

/* Price/weight totals — road/gravel has no bundle presets yet, so this is a
   plain sum (same {price, weight, missingWeight} shape as the MTB
   buildTotals / bmxBuildTotals). */
/** @param {Object.<string, any>|null|undefined} build @returns {{price: number, weight: number, missingWeight: boolean}} */
function roadBuildTotals(build){
  var b = resolveRoadBuild(build);
  var price = 0, weight = 0, missing = false;
  Object.keys(b).forEach(function(k){
    var p = b[k];
    if(typeof p.price === 'number') price += p.price;
    if(typeof p.weight === 'number') weight += p.weight; else missing = true;
  });
  return { price: Math.round(price * 100) / 100, weight: weight, missingWeight: missing };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ROAD_VOCAB: ROAD_VOCAB, ROAD_GROUPS: ROAD_GROUPS, ROAD_SLOTS: ROAD_SLOTS,
    ROAD_VOCAB_MAP: ROAD_VOCAB_MAP, ROAD_VOCAB_MAP_EXCLUDED: ROAD_VOCAB_MAP_EXCLUDED,
    roadVocabTokens: roadVocabTokens, roadVocabMapKeys: roadVocabMapKeys,
    ROAD_SYSTEM_CHAIN: ROAD_SYSTEM_CHAIN, ROAD_SRAM_AXS_SYSTEMS: ROAD_SRAM_AXS_SYSTEMS,
    roadSlotRequired: roadSlotRequired, checkRoadBuild: checkRoadBuild,
    roadBuildTotals: roadBuildTotals, roadFrameMaxTire: roadFrameMaxTire,
    roadForkTakesWheel: roadForkTakesWheel, roadBrakeClass: roadBrakeClass,
    verdictKey: roadVerdictKey
  };
}
