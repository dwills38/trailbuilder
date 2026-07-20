'use strict';
/* =============================================================================
   Gravel golden builds — whole real bikes through checkGravelBuild
   (src/compat-gravel.js, OFF-LIVE), the test-bmx-golden.js pattern:
   - a complete 1x SRAM XPLR AXS build that must come back conflict-free,
   - a complete 1x Campagnolo Ekar/N3W build likewise (with only the honest
     BB advisory info — the catalog stocks no Ultra-Torque BB),
   - the dropper variant that must still count as complete,
   - a known-bad build that must fail on every planted conflict.
   CATALOG-GAP note (flagged in this round's report, not worked around here):
   no wheel row carries an hg-road or micro-spline-road freehub, so NO
   conflict-free Shimano-GRX build currently exists in data/gravel.js — the
   golden set is SRAM + Campagnolo until the wheel gap is filled.
   ========================================================================== */
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;
var G = require('../src/compat-gravel.js');
var DATA = require('../data/gravel.js');

/** @param {string} id @returns {any} */
function gp(id){
  var p = DATA.GRAVEL_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown gravel part id: ' + id);
  return p;
}
/** @param {Object.<string, string>} map @returns {Object.<string, any>} */
function GB(map){
  /** @type {Object.<string, any>} */ var o = {};
  Object.keys(map).forEach(function(k){ o[k] = gp(map[k]); });
  return o;
}
/** @param {{errors: any[], warnings: any[]}} r @returns {string} */
function conflicts(r){
  return r.errors.concat(r.warnings).map(function(v){ return v.ruleId + ': ' + v.msg; }).join(' | ');
}
/** @param {Object.<string, any>} build @returns {string[]} */
function missingRequired(build){
  return G.GRAVEL_SLOTS.filter(function(s){ return G.gravelSlotRequired(s, build) && !build[s.key]; })
    .map(function(s){ return s.key; });
}

/* ---- Golden 1: complete 1x SRAM Rival XPLR AXS gravel bike ----------------- */
var RIVAL_XPLR_BUILD = {
  frame: 'gfr-specialized-diverge-comp-carbon',   // 700c+650b, 12x142, flat-mount, bsa-road, 27.2
  fork: 'gfk-specialized-crux-carbon-rigid',      // 12x100, tapered, flat-mount, maxRotorF 160
  frontWheel: 'gfw-dtswiss-g1800-700c',           // 12x100, xdr, center-lock, maxTire 50
  rearWheel: 'grw-dtswiss-g1800-700c',            // 12x142, xdr
  frontTire: 'gti-panaracer-gravelking-sk-700x40',
  rearTire: 'gti-panaracer-gravelking-sk-700x40', // 40mm vs Diverge 700c max 47
  shifter: 'gsft-sram-rival-xplr-axs',            // 12s AXS, 1x (frontShift false), hydraulic
  rearDerailleur: 'grd-sram-rival-xplr-axs-rd',   // 12s AXS, 44T max, std-hanger
  cassette: 'gca-sram-xg1251-1044',               // 10-44 xdr — exactly the RD's cap
  chain: 'gch-sram-xplr-flattop-12',              // Flattop (the SRAM AXS chain std)
  crankset: 'gcr-sram-rival-xplr-axs-1x',         // dub, 1x
  bb: 'gbb-sram-dub-bsa',                         // bsa-road shell, dub spindle
  headset: 'ghs-canecreek-40-zs44-zs56',          // tapered
  frontBrake: 'gbr-sram-rival-axs-brake',         // flat-mount hydraulic
  rearBrake: 'gbr-sram-rival-axs-brake',
  frontRotor: 'gro-shimano-rt-cl800-160-cl',      // 160 center-lock — fork max 160, CL hubs
  rearRotor: 'gro-shimano-rt-cl800-160-cl',
  handlebar: 'ghb-salsa-cowbell-318',
  stem: 'gst-zipp-scsl-100',
  bartape: 'gtp-fizik-vento-microtex-tacky',
  seatpost: 'gsp-zipp-scsl-272',                  // 27.2 in a 27.2 frame
  saddle: 'gsa-fizik-argo-tempo',
  pedals: 'gpd-crankbrothers-candy3'
};

test('golden: the Rival XPLR AXS 1x build is complete and conflict-free', function(){
  var b = GB(RIVAL_XPLR_BUILD);
  var r = G.checkGravelBuild(b);
  eq(r.errors.length, 0, 'no errors, got: ' + conflicts(r));
  eq(r.warnings.length, 0, 'no warnings, got: ' + conflicts(r));
  eq(r.infos.length, 0, 'fully specified build has no advisory left (BB picked, std-hanger RD)');
  eq(missingRequired(b).join(','), '', 'every required slot is filled');
});

/* ---- Golden 2: complete 1x Campagnolo Ekar / N3W build --------------------- */
var EKAR_BUILD = {
  frame: 'gfr-specialized-crux-comp-carbon',      // 1x-only frame (frontDerailleurMount none)
  fork: 'gfk-specialized-crux-carbon-rigid',
  frontWheel: 'gfw-campagnolo-levante-700c',      // n3w
  rearWheel: 'grw-campagnolo-levante-700c',       // n3w, maxTire 47
  frontTire: 'gti-wtb-byway-700x40',
  rearTire: 'gti-wtb-byway-700x40',               // 40 vs Crux 700c max 47, rim max 47
  shifter: 'gsft-campagnolo-ekar',                // 13s mechanical, 1x, hydraulic
  rearDerailleur: 'grd-campagnolo-ekar-rd',       // 13s, 44T max
  cassette: 'gca-campagnolo-ekar-942',            // 9-42 n3w (the Ekar-only 9T small cog)
  chain: 'gch-campagnolo-ekar-13',                // campag chain std
  crankset: 'gcr-campagnolo-ekar-1x',             // ultra-torque — no BB row stocked: bb omitted
  headset: 'ghs-canecreek-40-zs44-zs56',
  frontBrake: 'gbr-campagnolo-ekar-brake',
  rearBrake: 'gbr-campagnolo-ekar-brake',
  frontRotor: 'gro-shimano-rt-cl800-160-cl',
  rearRotor: 'gro-shimano-rt-cl800-160-cl',
  handlebar: 'ghb-salsa-cowchipper-318',
  stem: 'gst-ritchey-wcs-4axis-100',
  bartape: 'gtp-supacaz-super-sticky-kush',
  seatpost: 'gsp-cannondale-carbon-272',
  saddle: 'gsa-wtb-volt',
  pedals: 'gpd-shimano-pd-grx600'
};

test('golden: the Ekar/N3W 1x build is complete and conflict-free (BB advisory info only)', function(){
  var b = GB(EKAR_BUILD);
  var r = G.checkGravelBuild(b);
  eq(r.errors.length, 0, 'no errors, got: ' + conflicts(r));
  eq(r.warnings.length, 0, 'no warnings, got: ' + conflicts(r));
  eq(r.infos.length, 1, 'exactly the BB nudge');
  eq(r.infos[0].ruleId, 'rg-bb-advisory', 'the catalog stocks no Ultra-Torque BB - the nudge is honest');
  eq(missingRequired(b).join(','), '', 'bb is optional - the build is complete without it');
});

/* ---- Golden 3: the dropper variant is still a complete bike ---------------- */
test('golden: swapping the seatpost for a gravel dropper keeps the build complete and clean', function(){
  /** @type {Object.<string, string>} */
  var map = Object.assign({}, RIVAL_XPLR_BUILD);
  delete /** @type {any} */ (map).seatpost;
  map.dropper = 'gdp-rockshox-reverb-axs-xplr-272-50';   // 27.2 in the Diverge's 27.2
  var b = GB(map);
  var r = G.checkGravelBuild(b);
  eq(r.errors.length, 0, 'no errors, got: ' + conflicts(r));
  eq(r.warnings.length, 0, 'no warnings, got: ' + conflicts(r));
  eq(missingRequired(b).join(','), '', 'the dropper fills the seat-tube role (GRAVEL-MODEL §6-3)');
});

/* ---- Golden 4: the known-bad build must fail on every planted conflict ----- */
test('golden negative: every planted conflict is flagged', function(){
  var bad = {
    frame: gp('gfr-specialized-crux-comp-carbon'),        // frontDerailleurMount 'none'
    fork: gp('gfk-cannondale-lefty-oliver-30'),           // lefty-proprietary axle
    frontWheel: gp('gfw-hunt-adventurewide-650b'),        // 650b + 12x100 hub (vs Lefty)
    rearWheel: gp('grw-dtswiss-g1800-700c'),              // 700c -> mixed pair; xdr driver
    frontTire: gp('gti-wtb-byway-650bx47'),
    rearTire: gp('gti-wtb-riddler-700x45'),
    shifter: gp('gsft-shimano-grx-rx820-1x12'),           // mechanical GRX 1x
    frontDerailleur: gp('gfd-shimano-grx-fd-rx810-2x'),   // FD on a no-mount frame + 1x control
    rearDerailleur: gp('grd-sram-rival-xplr-axs-rd'),     // AXS XPLR vs the GRX shifter
    cassette: gp('gca-shimano-grx-cs-m7100-1045'),        // micro-spline-road on an xdr wheel; 45T > 44T RD cap
    chain: gp('gch-shimano-cn-hg601-11'),                 // HG chain on a Flattop drivetrain
    crankset: gp('gcr-shimano-grx-fc-rx610-2x'),          // 2x under a 1x control
    bb: gp('gbb-praxis-t47'),                             // t47 shell in a bsa frame; dub spindle vs hollowtech crank
    frontBrake: gp('gbr-shimano-grx-br-rx820'),
    rearBrake: gp('gbr-shimano-grx-br-rx820'),
    frontRotor: gp('gro-sram-centerline-160-6b'),         // 6-bolt on a center-lock hub -> adapter warning
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowbell-318'),
    stem: gp('gst-zipp-scsl-100'),
    seatpost: /** @type {any} */ (Object.assign({}, gp('gsp-zipp-scsl-272'), { id: 'gsp-synth-316', diameter: '31.6' })), // 31.6 in a 27.2 tube
    saddle: gp('gsa-wtb-volt'),
    pedals: gp('gpd-shimano-pd-grx600')
  };
  var r = G.checkGravelBuild(bad);
  var errIds = r.errors.map(function(v){ return v.ruleId; });
  var warnIds = r.warnings.map(function(v){ return v.ruleId; });
  ['rg-wheel-size', 'rg-front-axle', 'rg-freehub', 'rg-rd-capacity', 'rg-drivetrain-system',
   'rg-actuation', 'rg-chain-std', 'rg-2x-system', 'rg-fd-mount', 'rg-bb-shell', 'rg-bb-spindle',
   'rg-seatpost'].forEach(function(id){
    ok(errIds.indexOf(id) >= 0, 'expected error ' + id + ' - errors were: ' + errIds.join(', '));
  });
  ok(warnIds.indexOf('rg-rotor-mount') >= 0, 'expected the 6-bolt-on-Center-Lock adapter warning');
});

/* ---- catalog sanity: the goldens only reference real catalog rows ---------- */
test('golden builds reference only ids that exist in data/gravel.js', function(){
  Object.keys(RIVAL_XPLR_BUILD).forEach(function(k){ gp(/** @type {any} */ (RIVAL_XPLR_BUILD)[k]); });
  Object.keys(EKAR_BUILD).forEach(function(k){ gp(/** @type {any} */ (EKAR_BUILD)[k]); });
});
