'use strict';
/* =============================================================================
   GRAVEL SCHEMA + VALIDATOR  (mirrors src/schema-bmx.js's approach)
   -----------------------------------------------------------------------------
   data/gravel.js (151 rows, landed catalog/gravel-1) had no schema/validator —
   same gap schema-bmx.js closed for data/bmx.js before its pre-flip audit. This
   is the same "bouncer at the door" pattern, scoped to GRAVEL_PARTS with a
   small self-contained GRAVEL_VOCAB (checkRoadBuild in src/compat-road.js is
   the shared drop-bar engine gravel.html runs on).

   data/gravel.js WENT LIVE 2026-07-21 (gravel.html serves it in production).
   This schema file itself is still loaded only by validate.js (the "GRAVEL OK"
   line) and its own test — gravel.html does not load the validator at runtime,
   same as every other catalog's schema file.

   Field sets below are derived from the ACTUAL data: every field name and
   required/optional split was read off the live data/gravel.js rows (a field
   present on 100% of a category's rows is required; anything less is
   optional) cross-checked against data/GRAVEL-MODEL.md §3's schema deltas —
   never invented. Vocab value-sets are the literal distinct values already
   shipped in data/gravel.js rows this session, not guessed standards.
   ========================================================================== */

/** @param {string} v */
function isStr(v){ return typeof v === 'string' && v.length > 0; }
/** @param {any} v */
function isNum(v){ return typeof v === 'number' && isFinite(v); }
/** @param {any} v */
function isBool(v){ return typeof v === 'boolean'; }
/** @param {any} v */
function urlOk(v){ return isStr(v) && /^https?:\/\//.test(v); }
/** @param {any} v @param {Date} today */
function dateOk(v, today){
  if(!isStr(v) || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  var d = new Date(v + 'T00:00:00Z');
  return !isNaN(d.getTime()) && d.getTime() <= today.getTime();
}

/* Self-contained vocab — the literal distinct values shipped in
   data/gravel.js as of the gravel-2 wave (2026-07-17), grouped by field
   family. Widening this needs a real new row backing the value, same
   discipline as compat-bmx.js's BMX_VOCAB. */
/** @type {Object.<string, Array<string|number>>} */
var GRAVEL_VOCAB = {
  wheel:        ['700c', '650b'],
  rearAxle:     ['12x142', '12x148', '135x9-qr', '135x10-qr'],   // '12x148' (Boost, MTB-derived) added gravel-verify-1 (2026-07-21) — the Salsa Cutthroat's own frame-specs table states "Rear Spacing 148 x 12 mm Thru-axle" (a drop-bar-mountain-bike bikepacking platform, not a road-derived 142mm frame); a real, sourced value, not a guess. '135x9-qr'/'135x10-qr' added vocab-tier1 (2026-07-22) — QR (not thru-axle) rear spacing, real on several older/budget gravel platforms this file previously flagged rather than force-fit as 12x142: '135x9-qr' is the classic 9mm-skewer QR standard (a retailer spec table states the Marin Nicasio+'s rear axle verbatim as "135x9mm Quick-Release Axle"); '135x10-qr' is the wider 10mm-skewer class named on this file's Kona Rove AL ("10x135mm rear axle", Joytech-hub spec table) and Salsa Journeyman ("10 x 135mm, QR", Salsa's own archived spec page) rows — two independent makers naming the same 10mm/135mm QR combination, distinct from the narrower 9mm class.
  axle:         ['12x100', '12x142', 'lefty-proprietary', '15x100', '15x110'],
  // '15x110' added catalog/gravel-components-6 (2026-07-24) — a wider front thru-axle spacing
  // distinct from this vocab's existing '15x100' token, real on the current Salsa Cutthroat
  // Carbon V2 Fork (pairs with the Cutthroat frame's own Boost 12x148 rear, already in
  // GRAVEL_VOCAB.rearAxle): worldwidecyclery.com's own fetched spec table states "Front Axle |
  // 15mm Thru x 110mm" verbatim, corroborated identically by treefortbikes.com and
  // aroundthecycle.com's independently-fetched spec tables for the same SKU — three
  // independent retailer echoes of one manufacturer part number (FK6104), not a guess. Backing
  // row: gfk-salsa-cutthroat-carbon-v2 in data/gravel.js.
  hub:          ['12x100', '12x142', '135x9-qr'],   // '135x9-qr' added gravel-qr-wheels (2026-07-22) — the Hunt 4 Season Gravel Disc wheelset's own axle-adapter table states a "Quick Release 9x135mm" rear option verbatim, closing the rg-rear-axle gap on the Marin Nicasio+ (rearAxle:'135x9-qr'). No '135x10-qr' wheel token exists: no fetched manufacturer/retailer page this pass named a 10mm-skewer QR option distinct from the generic/9mm QR class (see grw-hunt-4season-gravel-700c-qr9x135's note) — the Kona Rove AL / Salsa Journeyman-alloy / Surly Straggler classic frames stay unbuildable at the rear-wheel end, an open wall.
  // FRAME/FORK-side brake mount. 'is-mount' added engine/gravel-is-mount
  // (2026-07-22) — I.S. (International Standard), the pre-flat-mount two-bolt
  // disc mount still shipped on budget/touring-derived drop-bar frames. Real,
  // sourced, and previously vocab-blocked: the Marin Nicasio+ row's own note
  // already logged "Disc brake, International Standard (IS)" on both frame and
  // fork (retailer spec table), corroborated by marinbikes.com's own Series
  // 1-vs-2 contrast ("our Series 2 frames up the game with... flat mount
  // brakes" — i.e. the Series 1 Nicasio+ is not flat mount) and by a fetched
  // velonut.com Nicasio review ("The brake mounts on the Nicasio use what's
  // called an IS mount"). Until this token existed the row carried a KNOWN-WRONG
  // 'flat-mount' sample. Engine side: rule R18 in src/compat-road.js is
  // direction-aware over it (post-mount caliper = adapter warning; flat-mount
  // caliper = error). 'post-mount' is deliberately NOT added on this side — no
  // cataloged GRAVEL frame/fork is post-mount (road's schema-road.js
  // brakeMountRG already carries it, and the shared engine handles it).
  brakeMount:   ['flat-mount', 'is-mount'],
  // 'disc-is' / 'disc-post' added engine/gravel-is-mount (2026-07-22), mirroring
  // schema-road.js's existing disc-flat/disc-post granularity convention (a
  // frame/fork/caliper's brakeSystem states its own mount class). 'disc-is' backs
  // the Nicasio+ frame — leaving it 'disc-flat' next to brakeMount:'is-mount'
  // would have kept a false flat-mount claim alive in a second field. 'disc-post'
  // backs the Hope RX4+ Postmount caliper row. Rule R17 compares only the
  // disc-vs-rim CLASS (roadBrakeClass), so neither token changes any verdict.
  brakeSystem:  ['disc-flat', 'disc', 'disc-hydraulic', 'disc-is', 'disc-post', 'disc-mechanical'],
  // 'disc-mechanical' added catalog/gravel-microshift-sword (2026-07-23) — the
  // CABLE/mechanical-disc BRIFTER token, real on the microSHIFT Sword shifter
  // (gsft-microshift-sword-2x10): every prior gravel brifter in this file was
  // hydraulic (disc-hydraulic), but Sword drop-bar levers pull cable ("Compatible
  // with road pull brakes", microshift.com/models/sb-g7020-b/). The token already
  // lived in the shared engine's ROAD_VOCAB.brakeSystem (src/compat-road.js line
  // ~71, documented there as a brifter-side granularity); it just never reached
  // this per-file vocab because no cable-lever gravel row existed yet. Engine
  // rule R19 (brifterBrakeCheck) reads it: roadBrakeClass('disc-mechanical')='disc'
  // and it is not 'disc-hydraulic', so a Sword cable lever behind a HYDRAULIC
  // caliper correctly ERRORS (a true won't-fit — no fluid column to drive) and
  // stays silent against a mechanical-disc caliper.
  bb:           ['bsa-road', 'bb86', 'bb30a', 'pf30', '24mm-road', 'dub', 'dub-wide', 'ultra-torque', 'bbright', 't47-road', 'bb386evo', 't47-86', 'pf92', 'square-taper', 'bsa-73', 't47a-bbright', 't47-73', 'threadfit82-5'],   // 'threadfit82-5' added catalog/gravel-breadth-5 (2026-07-23) — Colnago's own proprietary press-fit-adapter shell standard, real on the G3-X (glory-cycles.com's directly-fetched frameset spec sheet states "Bottom Bracket Type: TheadFit82.5" verbatim, and its own description explains the cups "screw into the frame, creating... space for any Pressfit BB adapter" — a genuinely distinct 82.5mm-shell standard from this vocab's existing 86.5mm-class 'bb86'/'t47-86' tokens, also used on the V3-RS/C64; per THE BAR, force-fitting it onto 'bb86' would misstate a real ~4mm shell-width difference, so it earns its own token rather than being merged. 't47-73' added catalog/gravel-breadth-2 (2026-07-23) — a 73mm-wide threaded T47 shell (MTB-width, like 'bsa-73' is to 'bsa-road'), real on the Curve GMX+ Steel: curvecycling.com's own product page states "T47 BB (73 mm)" verbatim, corroborated identically by a directly-fetched theradavist.com review ("Bottom Bracket: T47 BB (73 mm)"), distinct from the narrower 68mm-class 't47-road' token already in this vocab — same widening discipline as 'bsa-73' (vocab-tier1, 2026-07-22). 'pf86' retired 2026-07-21 — merged into 'bb86' (same physical 86.5mm press-fit shell; see schema-road.js's header note). Fixes the 2 Giant Revolt frames that had NO matching BB row under the old split. 'pf92' added gravel-verify-1 (2026-07-21) — the Salsa Cutthroat's own frame-specs table states "Bottom Bracket Press Fit BB92, 41 x 92 mm", an MTB-style 92mm press-fit shell distinct from every existing gravel BB token (BB86 is 86.5mm). 'square-taper' added vocab-tier1 (2026-07-22) — an older/budget touring-adjacent shell real on the Marin Nicasio+ (a retailer spec table states verbatim "Sealed Cartridge Bearings, Square Taper"), the exact non-fit this file's own header comment previously logged rather than force-fit. 'bsa-73' added vocab-tier1 (2026-07-22) — a 73mm-wide English-threaded MTB-derived shell, real on the Kona Sutra LTD (its own dedicated build spec table states "B/B SRAM GXP 73mm", corroborated by a bikepacking.com review's "73mm bottom bracket shell... 68mm shells be damned"), distinct from the narrower 68mm bsa-road token already in this vocab. 't47a-bbright' added vocab-tier1 (2026-07-22) — an asymmetric T47-threaded shell (Cervelo's own evolution of its BBRight standard, distinct from both the plain 't47-road' and 'bbright' tokens already in this vocab). Directly FETCHED cervelo.com/en-US/bikes/aspero (the manufacturer's own current Aspero platform page): "Aspero uses the asymmetrical T47a threaded bottom bracket we pioneered on R5-CX... allows us to deliver the benefits of BBRight in a more user-friendly form" — corroborated identically by a directly-fetched bikeradar.com Aspero-5 review build table ("Bottom bracket SRAM DUB Wide Ceramic, T47 BBright") and bikerumor.com ("a threaded T47 bottom bracket – well an asymmetric BBRight T47a BB"). No Aspero-5 catalog row was added this pass: the same review's build table also names an "FSA IS2 1-1/4, 45°x45° / 1-1/2, 36°x45°" headset — a 1-1/4-to-1-1/2 tapered class, WIDER than this vocab's existing generic 'tapered' token (which every other tapered gravel frame/fork in this file implicitly means as 1-1/8-to-1-1/2) — outside this pass's ratified steerer scope (only 'tapered'/'straight-1-1-8'/'straight-1-1-4' were ratified), so forcing plain 'tapered' onto it would be a false interface claim; deferred to a future pass alongside a steerer-vocab widening.
  shell:        ['bsa-road', 't47-road', 'bb86', 't47-86'],
  spindle:      ['24mm-road', 'dub', 'square-taper'],   // 'square-taper' added vocab-tier1 (2026-07-22), paired with the bb shell token above — the matching crank-side interface for a square-taper BB shell (no cataloged gravel crank currently uses it; landed for schema completeness alongside the shell token, same discipline as every other shell/spindle pair in this vocab).
  seatpost:     ['27.2', '31.6', '30.9', 'proprietary'],
  // dropperDiameter — split from the 'seatpost' vocab above: a dropper is
  // always a real round tube (never the rigid-seatpost 'proprietary' token,
  // which would falsely validate a dropper diameter that can't exist).
  dropperDiameter: ['27.2', '31.6', '30.9'],
  steerer:      ['tapered', 'straight-1-1-8', 'straight-1-1-4', 'cervelo-d-shaped'],
  /* 'cervelo-d-shaped' ADDED schema/vocab-widen-ab (2026-07-22) — REQUIRED to
     enter the Cervelo Aspero-5, the row that backs this file's previously
     unbacked 't47a-bbright' bb token (Douglas-ruled group B). Cervelo's own
     2026 Aspero-5 service reference (CER-ALB-EX-V1, Frame Code FM164) states
     the steerer verbatim as "Fork Steerer Type: Cervelo D-Shaped" — a genuinely
     non-round tube, not a round tapered one, and its headset bearings are
     Cervelo part numbers (HS-082 1-1/4" 45x45, HS-110 1-1/2" 36x45) rather than
     a S.H.I.S. standard pair. Forcing 'tapered' here would be a FALSE FIT: R4 is
     exact-match, so a round tapered fork/headset would green against this frame
     and no round steerer clamps a D-shaped tube.
     Follows the per-system proprietary-steerer doctrine Douglas ratified
     2026-07-21 for the road side (cannondale-delta / overdrive-aero /
     bmc-ics-flat in schema-road.js): ONE TOKEN PER SYSTEM, never a shared
     'proprietary' value — a shared token would let a Cervelo D-shaped fork
     "fit" a Giant OverDrive Aero frame. NOTE FOR THE COORDINATOR: this token is
     the one part of group B that reaches beyond the literal packet; the only
     alternative was to leave the Aspero-5 unentered and t47a-bbright unbacked. */
  // 'straight-1-1-8' mirrors road's existing token (schema-road.js steererRG) — same
  // 28.6mm/1-1/8in constant-diameter steer tube, now confirmed on multiple gravel rows
  // (see GRAVEL_VOCAB usage sites below) rather than only a road-frame phenomenon.
  // 'straight-1-1-4' is a genuinely different, wider constant-diameter tube (1-1/4in,
  // ~31.75mm) seen stated verbatim on the Canyon Grizl CF SL fork spec ("Fork steer tube
  // diameter: 1 1/4\"") — the same class Wilier's own gravel-adjacent forks were logged
  // against in this file's header comment; never conflated with the narrower 1-1/8 token.
  frontDerailleurMount: ['none', 'braze-on', 'band-28.6'],
  // 'band-28.6' added vocab-tier1 (2026-07-22) — a clamp-on (not brazed/bolted-boss) FD mount
  // at the common 28.6mm seat-tube-adjacent diameter, real on two independently-fetched
  // rows this file previously logged as vocab-blocked rather than force-fit as braze-on:
  // the All-City Gorilla Monsoon ("Front Derailleur Type Band Clamp") and the Bombtrack
  // Hook EXT ("Front derailleur clamp diameter: 28.6 mm", "Frame front derailleur
  // compatible: yes").
  material:     ['alloy', 'steel', 'titanium'],
  // 'sliding' ported from src/schema.js's MTB dropoutType (vocab-tier1, 2026-07-22) — an
  // adjustable-chainstay-length dropout mechanism real on bikepacking-oriented gravel
  // frames this file's header comment previously logged as a schema gap (no dropoutType
  // field existed at all): Salsa's own Fargo product page describes its "Alternator
  // Dropouts" verbatim as "Adjusts chainstay length to modify ride traits and tire fit
  // (with adjustable swing plates)" and "Tensions chain for single-speed use". Landed
  // dormant like MTB's own field — no gravel single-speed/ss-tension rule exists yet,
  // so this is display/annotation only until one does, same land-dormant-then-activate
  // template rule 18/14c already use. Only the one real value ratified this pass; the
  // other three MTB tokens (horizontal/ecc-bb/vertical) are NOT added without their own
  // flagged gravel row.
  dropoutType:  ['sliding'],
  freehub:      ['xdr', 'n3w', 'micro-spline-road', 'hg-road'],
  rotorMount:   ['center-lock'],
  casing:       ['tcs-light', 'tcs-tough', 'zsg', 'shieldwall', 'protection', 'hardwall', 'super-ground', 'exo', 'tubeless-complete', 'trail', 'standard', 'extralight', 'endurance', 'light-supple', '2bliss-ready'],
  compound:     ['fast-rolling', 'high-grip', 'std', 'blackchili', 'smartnet', 'addix-speedgrip', 'addix', 'dual', 'dynamic-rs', 'g2', 'puregrip', 'gripton'],
  // Display-only casing/compound SKU-axis tokens ratified vocab-tier1 (2026-07-22) —
  // brand-native names, never feed checkBuild: 'light-supple' is Teravail's own casing-
  // tier name ("Light & Supple, Black" on the Sparwood 700x56 row's own fetched page,
  // teravail.com/products/sparwood-tire — the row previously fell back to the closest
  // approximation, 'extralight'). 'puregrip' is Continental's own compound name ("PureGrip
  // Compound" on the Terra Trail ShieldWall 650x47 row's own fetched Tire Range PDF — the
  // row previously fell back to 'std'). WTB's own casing-tier naming (TCS Light/TCS Tough,
  // seen on its Breakout MTB tire and used identically across its gravel line) was
  // investigated for a matching gap and found to be FULLY covered already by the existing
  // tcs-light/tcs-tough tokens — no new token added, not a real gap.
  // vocab-tier1-4c (2026-07-23): Specialized's own gravel-tire tier naming closed —
  // 'gripton' (compound) and '2bliss-ready' (casing/bead-tubeless-system) confirmed
  // directly off specialized.com's own current "Pathfinder Pro 2Bliss Ready" product
  // page (fetched via Exa read-through after WebFetch hit the documented specialized.com
  // 403 wall; the returned content is the maker's own page, not a retailer republication —
  // specialized.com/us/en/pathfinder-pro-2bliss-ready/p/157870), which states verbatim:
  // "Compound: GRIPTON®" and "Butyl wrapped bead = 2Bliss Ready" (the tubeless-bead casing
  // system name, the same naming already fetched on this catalog's road.js Cotton TLR rows).
  // The page also names "Flat Protection: Endurant Casing and BlackBelt" — BlackBelt is a
  // real Specialized puncture-belt name, but the casing/compound fields are single-value
  // SKU axes and 2bliss-ready is the tire's actual bead/tubeless-tier identity on this SKU,
  // so BlackBelt was NOT added as a third token (would have no field to occupy without
  // overloading casing away from its bead-system meaning) — flagged for a future pass if a
  // Specialized row ever needs to distinguish a BlackBelt vs non-BlackBelt tier. Backing row:
  // gti-specialized-pathfinderpro-700x42 in data/gravel.js.
  actuation:    ['di2-wired', 'mechanical', 'axs-wireless', 'hydraulic'],
  side:         ['pair'],
  system:       ['shimano-grx-12', 'shimano-grx-11', 'shimano-grx-10', 'sram-xplr-12', 'sram-xplr-13', 'sram-apex-mech-12',
                  'campag-ekar-13', 'sram-axs-road', 'hg', 'flattop', 'campag', 'microshift-sword-10'],
  // 'shimano-grx-10' added gravel-depth-3 (2026-07-22) — the RX400 2x10 tier,
  // confirmed still a current Shimano product line (bike.shimano.com's own GRX
  // series page lists "GRX RX400 10-Speed Mechanical Shifting Options" among
  // its live tiers), was previously unbuildable: no 10-speed system token
  // existed. Real product line, not a force-fit.
  // 'microshift-sword-10' added catalog/gravel-microshift-sword (2026-07-23) —
  // the FIRST microSHIFT drivetrain in this catalog, closing the FD-G7020
  // vocab-gap this file's own header comment (gravel-components-1) logged: a
  // real, current, fully-mechanical 2x-10 drop-bar gravel group (microSHIFT
  // Sword) that had NO matching system token because microSHIFT was
  // unrepresented here. Backed by 4 real rows landed in the SAME wave
  // (gsft-microshift-sword-2x10, gfd-microshift-sword-g7020-brazeon,
  // grd-microshift-sword-g7025l-2x, gca-microshift-sword-g105-11-38), each
  // FETCHED from microshift.com's own model pages. Its chain standard is HG
  // (ROAD_SYSTEM_CHAIN['microshift-sword-10']='hg' in src/compat-road.js, added
  // in the same commit — every Sword page states "compatible with standard 10
  // speed chain"); the drivetrain runs the existing gch-shimano-cn-hg54-10
  // 10-speed HG chain (microSHIFT publishes no Sword-branded chain). This is a
  // road-parity drop-bar group (integrated brifters, HG freehub, HG chain) —
  // the same class as the Shimano GRX mechanical tiers already here, NOT a
  // road-shifter+MTB-mech mullet.
  cage:         ['gs', 'sgs', 'xplr'],
  /* SPLIT engine/gravel-is-mount (2026-07-22) out of one shared `mount` vocab
     that held ['flat-mount','center-lock','6-bolt'] for BOTH brake.mount (a
     CALIPER-to-frame interface) and rotor.mount (a ROTOR-to-hub interface).
     Those token sets never overlap in meaning, and adding 'post-mount' to the
     shared list would newly have let a ROTOR validate as mount:'post-mount' — a
     value that cannot exist. Same reasoning (and same wording) as this file's
     existing frontDerailleurMount/mountRD split. No data change: every gravel
     brake row is 'flat-mount', every rotor row is 'center-lock'/'6-bolt'. */
  caliperMount: ['flat-mount', 'post-mount'],   // brake.mount — 'post-mount' backs the Hope RX4+ Postmount row (hopetech.com's own Gravel/CX page)
  rotorInterface: ['center-lock', '6-bolt'],    // rotor.mount
  mountRD:      ['std-hanger', 'udh-fullmount'],
  minCog:       [9, 10, 11],
  speeds:       [10, 11, 12, 13],
  // 10 added gravel-depth-3 (2026-07-22) alongside 'shimano-grx-10' above —
  // same RX400 tier real-product justification, not a guess.
  chainrings:   ['1x', '2x'],
  ringStd:      ['t-type'],
  clamp:        ['31.8'],
  style:        ['clip'],
  suspension:   ['rigid', 'suspension'],
  // lifecycle (ported from src/schema.js — mirrors its frame lifecycle convention;
  // absent = current). Same 3-value vocab as the live catalog's VOCAB.status.
  status:       ['current', 'discontinued', 'recalled'],
  /* Price provenance — mirrors src/schema.js's VOCAB.priceBasis VERBATIM
     (Douglas's 2026-07-22 ruling: "verified means the pricing was verified
     too"). Absent = a SAMPLE price; present = a disclosed claim, legal only on
     a verified row. 'msrp-confirmed' is the norm; the other five are the
     disclosed exception classes (discontinued / OE-only / non-USD conversion /
     bundled-SKU split, the ratified shift-brake case / third-party-listed).
     Full per-token rationale lives in schema.js — same enum, not a gravel
     variant. Never feeds any compat rule.
     'pair-split-estimate' (2026-07-22) is WHEEL-ONLY — frontwheel/rearwheel —
     a cross-rule below rejects it on any other category.
     'deprioritized-no-price-source' (2026-07-23) — NOT a disclosed price like
     the others; the stored price stays a SAMPLE. Marks a verified row whose
     only source is a maker spec page that structurally never carries a price
     (Shimano/SRAM/Zipp/Campagnolo component pages), so the priceBasis
     burndown wave stops re-fetching it. Full rationale in schema.js. */
  priceBasis:   ['msrp-confirmed', 'discontinued-no-msrp', 'oe-only-no-msrp',
                 'regional-conversion', 'bundle-split-estimate', 'third-party-listed',
                 'pair-split-estimate', 'deprioritized-no-price-source']
};

/* >>> COORDINATOR ROLLOUT SWITCH — DO NOT FLIP. See the identical constant in
   src/schema.js for the full contract. false = a verified row missing
   priceBasis is a counted WARNING (validate.js prints the burndown); true =
   it's a hard error. Flip only when the backfill is done in EVERY catalog. */
var PRICE_BASIS_STRICT = false;

/** @typedef {{type: 'number'|'string'|'bool'|'numArray'|'strArray'|'map'|'numOrNull'|'strOrNull'|'array', vocab?: string, optional?: boolean}} GravelFieldRule */

/* Per-category required/optional field set. Every non-optional field is
   present on 100% of the category's current data/gravel.js rows
   (checked 2026-07-17); `vocab` names a GRAVEL_VOCAB key. */
/** @type {Object.<string, Object.<string, GravelFieldRule>>} */
var GRAVEL_SCHEMA = {
  frame: {
    wheelSizes:{type:'strArray',vocab:'wheel'}, rearAxle:{type:'string',vocab:'rearAxle'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, brakeMount:{type:'string',vocab:'brakeMount'},
    bb:{type:'string',vocab:'bb'}, seatpost:{type:'string',vocab:'seatpost'}, steerer:{type:'string',vocab:'steerer'},
    maxTireByWheel:{type:'map'}, frontDerailleurMount:{type:'string',vocab:'frontDerailleurMount'},
    frameOnly:{type:'bool'}, material:{type:'string',vocab:'material',optional:true},
    gen:{type:'string',optional:true}, dropoutType:{type:'string',vocab:'dropoutType',optional:true},
    // rg-smalls-1 (2026-07-22): mirrors src/schema.js's MTB `udh` field, but
    // optional here (unlike MTB's required bool) — most gravel frames in
    // this catalog have no sourced UDH fact at all, and R20 (rg-xplr-udh)
    // already reads an absent field as "not recorded", never a guess.
    udh:{type:'bool',optional:true}
  },
  fork: {
    wheel:{type:'strArray',vocab:'wheel'}, axle:{type:'string',vocab:'axle'}, steerer:{type:'string',vocab:'steerer'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, brakeMount:{type:'string',vocab:'brakeMount'},
    maxRotorF:{type:'number'}, travel:{type:'number'}, suspension:{type:'string',vocab:'suspension'}
  },
  frontwheel: {
    // freehub is OPTIONAL here (unlike rearwheel): a front hub has no driver
    // body, so it carries no freehub standard at all — a value on this field
    // is fabricated, not a real spec.
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'hub'}, freehub:{type:'string',vocab:'freehub',optional:true},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, rotorMount:{type:'string',vocab:'rotorMount'},
    intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  rearwheel: {
    wheel:{type:'string',vocab:'wheel'}, hub:{type:'string',vocab:'hub'}, freehub:{type:'string',vocab:'freehub'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, rotorMount:{type:'string',vocab:'rotorMount'},
    intWidth:{type:'number'}, maxTire:{type:'number'}
  },
  tire: {
    wheel:{type:'string',vocab:'wheel'}, width:{type:'number'}, casing:{type:'string',vocab:'casing'},
    compound:{type:'string',vocab:'compound'}, tubeless:{type:'bool'}
  },
  shifter: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, actuation:{type:'string',vocab:'actuation'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, side:{type:'string',vocab:'side'}, frontShift:{type:'bool'}
  },
  /* dropbar-cleanup-1 item 3: split from a single shared 'derailleur' cat
     into frontderailleur/rearderailleur, matching src/schema-road.js's split
     (gfd-/grd- id prefixes already distinguished them; only the cat field
     was lumped). mount vocabs diverge too: front takes frontDerailleurMount
     ('none'/'braze-on', shared with frames), rear takes the new mountRD
     ('std-hanger'/'udh-fullmount') — those two token sets never overlap in
     meaning, so keeping them one shared 'mount' vocab risked a FD row
     validating with a hanger-mount token or vice versa. */
  frontderailleur: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, actuation:{type:'string',vocab:'actuation'},
    mount:{type:'string',vocab:'frontDerailleurMount'}, capacity:{type:'number',optional:true}
  },
  rearderailleur: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, actuation:{type:'string',vocab:'actuation'},
    maxCog:{type:'number'}, cage:{type:'string',vocab:'cage'}, mount:{type:'string',vocab:'mountRD'}
  },
  cassette: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}, freehub:{type:'string',vocab:'freehub'},
    minCog:{type:'number',vocab:'minCog'}, maxCog:{type:'number'}
  },
  chain: {
    system:{type:'string',vocab:'system'}, speeds:{type:'number',vocab:'speeds'}
  },
  crankset: {
    bb:{type:'string',vocab:'bb'}, chainrings:{type:'string',vocab:'chainrings'}, ring:{type:'number'},
    ringStd:{type:'strOrNull',vocab:'ringStd',optional:true}, speeds:{type:'number',vocab:'speeds'}, chainline:{type:'number'}
  },
  bb: {
    shell:{type:'string',vocab:'shell'}, spindle:{type:'string',vocab:'spindle'}
  },
  headset: {
    upper:{type:'string'}, lower:{type:'string'}, steerer:{type:'string',vocab:'steerer'}
  },
  brake: {
    mount:{type:'string',vocab:'caliperMount'}, pistons:{type:'number'}, actuation:{type:'string',vocab:'actuation'},
    brakeSystem:{type:'string',vocab:'brakeSystem'}, leverPair:{type:'string'}
  },
  rotor: {
    size:{type:'number'}, mount:{type:'string',vocab:'rotorInterface'}
  },
  handlebar: {
    clamp:{type:'string',vocab:'clamp'}, flare:{type:'number'}, dropBar:{type:'bool'}, width:{type:'number'}
  },
  stem: {
    clamp:{type:'string',vocab:'clamp'}, steerer:{type:'string',vocab:'steerer'}, length:{type:'number'}
  },
  seatpost: {
    // diameter is optional (a proprietary/D-shaped post — BMC URS LT's own
    // aero seatpost, gravel-8 finding — carries no round diameter at all,
    // mirroring src/schema-road.js's seatpost.diameter/proprietary/forFrames pattern).
    diameter:{type:'string',vocab:'seatpost',optional:true}, setback:{type:'number'},
    proprietary:{type:'bool',optional:true}, forFrames:{type:'array',optional:true}
  },
  dropper: {
    diameter:{type:'string',vocab:'dropperDiameter'}, drop:{type:'number'}, actuation:{type:'string',vocab:'actuation'}
  },
  saddle: {},
  pedal: {
    style:{type:'string',vocab:'style'}
  },
  bartape: {}
};

/** @param {string} vocabKey @returns {Array<string|number>|undefined} */
function vocabValues(vocabKey){ return GRAVEL_VOCAB[vocabKey]; }

/** @param {any} p @param {Date} today @returns {string[]} */
function validateGravelPart(p, today){
  /** @type {string[]} */ var probs = [];
  var at = '[' + (p && p.id ? p.id : '?') + ']';
  /** @param {string} m */
  function bad(m){ probs.push(at + ' ' + m); }

  if(!isStr(p.id)) { probs.push('[?] gravel part with missing/blank id'); return probs; }
  if(!isStr(p.cat) || !GRAVEL_SCHEMA[p.cat]) { bad('unknown gravel category "' + p.cat + '"'); return probs; }
  if(!isStr(p.brand)) bad('missing brand');
  if(!isStr(p.model)) bad('missing model');
  if(!/^[a-z0-9-]+$/.test(p.id) || p.id.split('-').length < 3) bad('id must be lowercase "g<cat>-<brand>-<model...>" tokens separated by "-"');

  if(!('price' in p)) bad('missing price');
  else if(!(isNum(p.price) && p.price >= 0)) bad('price must be a number >= 0 (USD MSRP)');
  if('weight' in p && p.weight != null && !(isNum(p.weight) && p.weight >= 0)) bad('weight must be a number >= 0 (grams)');

  // provenance — same contract as schema.js/schema-bmx.js: verified:true
  // needs a real fetched source URL and a non-future lastChecked date.
  if('verified' in p && !isBool(p.verified)) bad('verified must be true/false');
  if(p.verified === true){
    if(!urlOk(p.source)) bad('verified:true requires a valid http(s) source URL');
    if(!dateOk(p.lastChecked, today)) bad('verified:true requires a lastChecked date (YYYY-MM-DD, not in the future)');
    if(p.sourceType === 'retailer') bad('verified:true rejects sourceType:"retailer" (retailer "measured" weights are not accepted)');
    if(p.sourceType === 'measured' && !urlOk(p.weightSource)) bad('sourceType:"measured" requires a weightSource URL');
  } else {
    if('source' in p && p.source != null && typeof p.source !== 'string') bad('source must be a string');
    if('lastChecked' in p && p.lastChecked != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked)) bad('lastChecked must be YYYY-MM-DD');
  }
  // priceBasis — same contract as schema.js: a stated basis is a CLAIM, so it
  // rides only on a verified row (which already forces a real source above);
  // once STRICT flips, a verified row must state one. Sits OUTSIDE the
  // verified/unverified split above because it must fire in BOTH directions.
  if('priceBasis' in p && p.priceBasis != null){
    var pbv = vocabValues('priceBasis');
    if(!isStr(p.priceBasis) || (pbv && pbv.indexOf(p.priceBasis) < 0))
      bad('priceBasis "' + p.priceBasis + '" not in [' + (pbv || []).join(', ') + ']');
    if(p.verified !== true)
      bad('priceBasis "' + p.priceBasis + '" requires verified:true with a real source - an unverified row states no price provenance');
    if(p.priceBasis === 'pair-split-estimate' && ['frontwheel', 'rearwheel'].indexOf(p.cat) < 0)
      bad('priceBasis "pair-split-estimate" is wheel-only (frontwheel/rearwheel) - "' + p.cat + '" is not a wheel category');
    // TOKEN LAW (2026-07-23, mirrors schema.js): discontinued-no-msrp must
    // always travel with status:'discontinued' on the same row.
    if(p.priceBasis === 'discontinued-no-msrp' && p.status !== 'discontinued')
      bad('priceBasis "discontinued-no-msrp" requires status:"discontinued" on the same row (the token law - a discontinued price basis without a discontinued status is a contradiction)');
  } else if(PRICE_BASIS_STRICT && p.verified === true){
    bad('verified:true requires a priceBasis - "verified" must cover the price, not just the spec');
  }
  if('family' in p && p.family != null && !(isStr(p.family) && /^[a-z0-9-]+$/.test(p.family))) bad('family must be a lowercase slug');
  if('modelYear' in p && p.modelYear != null && !(isNum(p.modelYear) && p.modelYear >= 1980 && p.modelYear <= 2100))
    bad('modelYear must be a number between 1980 and 2100');

  // lifecycle (ported from src/schema.js): status is a closed vocab; supersededBy
  // is type-checked here (must be a string, can't self-reference) but its
  // cross-reference against real catalog ids happens in validateGravelCatalog's
  // second pass, same as schema-emtb.js's port — a single-part check can't see
  // sibling ids, and a forward reference (superseding a part later in the array)
  // must not false-positive.
  if('status' in p && p.status != null){
    var statusVals = vocabValues('status');
    if(!isStr(p.status) || !statusVals || statusVals.indexOf(p.status) < 0)
      bad('status "' + p.status + '" not in [' + (statusVals || []).join(', ') + ']');
  }
  if('supersededBy' in p && p.supersededBy != null){
    if(!isStr(p.supersededBy)) bad('supersededBy must be a part id');
    else if(p.supersededBy === p.id) bad('a part cannot supersede itself');
  }

  var spec = GRAVEL_SCHEMA[p.cat];
  Object.keys(spec).forEach(function(field){
    var rule = spec[field];
    var has = field in p && p[field] != null;
    if(!has){
      if(!rule.optional) bad('missing required field "' + field + '"');
      return;
    }
    var v = p[field];
    if(rule.type === 'number' && !isNum(v)) { bad('"' + field + '" must be a number'); return; }
    if(rule.type === 'bool' && !isBool(v)) { bad('"' + field + '" must be true/false'); return; }
    if(rule.type === 'string' && !isStr(v)) { bad('"' + field + '" must be a non-empty string'); return; }
    if(rule.type === 'strArray'){
      if(!Array.isArray(v) || v.length === 0 || !v.every(isStr)) { bad('"' + field + '" must be a non-empty array of strings'); return; }
    }
    if(rule.type === 'map'){
      if(typeof v !== 'object' || v === null || Array.isArray(v)) { bad('"' + field + '" must be an object map'); return; }
      return; // per-wheel-size numeric values, no fixed key set to check
    }
    if(rule.type === 'numOrNull'){
      if(v !== null && !isNum(v)) { bad('"' + field + '" must be a number or null'); return; }
      if(v === null) return; // null is always valid regardless of vocab
    }
    if(rule.type === 'strOrNull'){
      if(v !== null && !isStr(v)) { bad('"' + field + '" must be a string or null'); return; }
      if(v === null) return; // null is always valid regardless of vocab
    }
    if(rule.vocab){
      var vals = vocabValues(rule.vocab);
      /** @type {Array<string|number>} */
      var checkVals = rule.type === 'strArray' ? v : [v];
      checkVals.forEach(function(/** @type {string|number} */ cv){
        if(vals && vals.indexOf(cv) < 0) bad('"' + field + '" value "' + cv + '" not in ' + rule.vocab + ' [' + vals.join(', ') + ']');
      });
    }
  });

  // reject stray fields not in the category's schema or the common set —
  // catches typos (a field spelled differently than every other row).
  /** @type {Object.<string, number>} */
  var COMMON = { id:1, cat:1, brand:1, model:1, price:1, weight:1, note:1, verified:1, lastChecked:1, source:1,
    family:1, modelYear:1, mfgPn:1, sourceType:1, weightSource:1, archiveUrl:1, gen:1, status:1, supersededBy:1,
    priceBasis:1 };
  Object.keys(p).forEach(function(k){
    if(COMMON[k] || spec[k]) return;
    bad('unknown field "' + k + '" for category "' + p.cat + '"');
  });

  return probs;
}

/** @param {any[]} parts @param {Date} [today] @returns {string[]} */
function validateGravelCatalog(parts, today){
  var t = today || new Date();
  /** @type {string[]} */ var probs = [];
  /** @type {Object.<string, boolean>} */ var seenIds = {};
  parts.forEach(function(p){
    if(p && isStr(p.id)){
      if(seenIds[p.id]) probs.push('[' + p.id + '] duplicate id');
      seenIds[p.id] = true;
    }
    probs = probs.concat(validateGravelPart(p, t));
  });
  parts.forEach(function(p){
    if(!p || !isStr(p.id) || p.supersededBy == null) return;
    var at = '[' + p.id + ']';
    if(!seenIds[p.supersededBy]) probs.push(at + ' supersededBy references unknown part "' + p.supersededBy + '"');
  });
  return probs;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GRAVEL_VOCAB: GRAVEL_VOCAB, GRAVEL_SCHEMA: GRAVEL_SCHEMA, PRICE_BASIS_STRICT: PRICE_BASIS_STRICT,
    validateGravelPart: validateGravelPart, validateGravelCatalog: validateGravelCatalog };
}
