'use strict';
/* =============================================================================
   BMX golden builds — whole real bikes through checkBmxBuild (OFF-LIVE).
   A braked freestyle build and a BRAKELESS freecoaster build must both check
   clean AND count as complete (brakeless is a valid complete build — Douglas's
   explicit 2026-07-13 decision); a deliberately-wrong build must fail on every
   planted conflict. Plus dataset sanity: data/bmx.js rows stay engine-shaped.
   ========================================================================== */
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;
var BMX = require('../src/compat-bmx.js');
var DATA = require('../data/bmx.js');

/** @param {string} id @returns {any} */
function bp(id){
  var p = DATA.BMX_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown BMX part id: ' + id);
  return p;
}
/** Complete per bmxSlotRequired? @param {Object.<string, any>} build */
function assertComplete(build){
  BMX.BMX_SLOTS.forEach(function(s){
    if(BMX.bmxSlotRequired(s)) ok(build[s.key], 'required slot ' + s.key + ' is filled');
  });
}

/* ---- dataset sanity -------------------------------------------------------- */
test('BMX dataset: unique bmx- ids, engine-known categories, sane prices', function(){
  /** @type {Object.<string, boolean>} */ var seen = {};
  /** @type {Object.<string, boolean>} */ var knownCats = {};
  BMX.BMX_SLOTS.forEach(function(s){ knownCats[s.cat] = true; });
  DATA.BMX_PARTS.forEach(function(p){
    ok(!seen[p.id], 'duplicate id ' + p.id); seen[p.id] = true;
    eq(p.id.indexOf('bmx-'), 0, p.id + ' must carry the bmx- namespace (never collides with the live MTB catalog)');
    ok(knownCats[p.cat], p.id + ' category "' + p.cat + '" maps to no BMX_SLOTS slot');
    ok(typeof p.price === 'number' && p.price >= 0, p.id + ' price');
    ok(typeof p.brand === 'string' && typeof p.model === 'string', p.id + ' identity');
  });
});

test('BMX vocab discipline: every enum field value is in BMX_VOCAB', function(){
  DATA.BMX_PARTS.forEach(function(/** @type {any} */ p){
    if(p.wheelSize) ok(BMX.BMX_VOCAB.wheel.indexOf(p.wheelSize) >= 0, p.id + ' wheelSize ' + p.wheelSize);
    if(p.bbShell) ok(BMX.BMX_VOCAB.bbShell.indexOf(p.bbShell) >= 0, p.id + ' bbShell');
    if(p.cat === 'bb') ok(BMX.BMX_VOCAB.bbShell.indexOf(p.shell) >= 0 && BMX.BMX_VOCAB.spindle.indexOf(p.spindleFit) >= 0, p.id + ' bb interfaces');
    if(p.cat === 'cranks') ok(BMX.BMX_VOCAB.spindle.indexOf(p.spindle) >= 0 && BMX.BMX_VOCAB.crankPieces.indexOf(p.pieces) >= 0, p.id + ' crank interfaces');
    if(p.pitch) ok(BMX.BMX_VOCAB.chainPitch.indexOf(p.pitch) >= 0, p.id + ' pitch');
    if(p.axleFit) ok(BMX.BMX_VOCAB.axle.indexOf(p.axleFit) >= 0, p.id + ' axleFit');
    if(p.driverType) ok(BMX.BMX_VOCAB.driverType.indexOf(p.driverType) >= 0, p.id + ' driverType');
    if(p.rearBrakeMount) ok(BMX.BMX_VOCAB.brakeMount.indexOf(p.rearBrakeMount) >= 0, p.id + ' rearBrakeMount');
    if(p.cat === 'brake') ok(BMX.BMX_VOCAB.brakeMount.indexOf(p.mount) >= 0, p.id + ' brake mount');
    if(p.cat === 'handlebar' || p.cat === 'stem') ok(BMX.BMX_VOCAB.clamp.indexOf(p.clamp) >= 0, p.id + ' clamp (the oversized->25.4mm normalization)');
    if(p.cat === 'seat' || p.cat === 'seatpost') ok(BMX.BMX_VOCAB.seatSystem.indexOf(p.system) >= 0, p.id + ' seat system');
  });
});

/* ---- golden 1: braked freestyle build -------------------------------------- */
test('golden braked freestyle build (Kink Williams) - zero errors, zero warnings, complete', function(){
  var build = {
    frame: bp('bmx-fr-kink-williams'),            // mid shell, u-brake bosses, 14mm rear, 20in - VERIFIED row
    fork: bp('bmx-fk-odyssey-r32'),               // 20in, 10mm, u-brake bosses
    headset: bp('bmx-hs-cult-integrated'),
    cranks: bp('bmx-cr-odyssey-calibre'),         // 3-piece, 22mm
    bb: bp('bmx-bb-totalbmx-mid-22'),             // mid shell, 22mm - matches frame + cranks
    sprocket: bp('bmx-sp-odyssey-utilitypro-30'), // 30T, 1/8
    chain: bp('bmx-ch-kmc-z410'),                 // 1/8
    frontWheel: bp('bmx-fw-odyssey-vandero'),     // 20in, 10mm
    rearWheel: bp('bmx-rh-cult-matchv2'),         // cassette 9T driver, 14mm
    frontTire: bp('bmx-ti-odyssey-pathpro-225'),
    rearTire: bp('bmx-ti-odyssey-pathpro-24'),
    rearBrake: bp('bmx-br-diacompe-990'),         // u-brake on u-brake bosses (rear-only - normal)
    pegsRear: bp('bmx-pg-odyssey-grandstand-14'), // 14mm pegs on the 14mm rear axle
    handlebar: bp('bmx-hb-sandm-speedball'),
    stem: bp('bmx-st-odyssey-elementary'),
    grips: bp('bmx-gr-odyssey-aaronross'),
    seat: bp('bmx-se-cult-pivotal'),
    seatpost: bp('bmx-sp-cult-pivotal-post'),     // pivotal + pivotal
    pedals: bp('bmx-pd-odyssey-twistedpro')
  };
  var r = BMX.checkBmxBuild(build);
  eq(r.errors.map(String).join('\n'), '', 'zero errors');
  eq(r.warnings.map(String).join('\n'), '', 'zero warnings');
  assertComplete(build);
  var g = BMX.bmxGearInfo(build);
  ok(g && Math.abs(g.ratio - (30/9)) < 0.01, 'display gear ratio 30/9');
  var t = BMX.bmxBuildTotals(build);
  ok(t.price > 0, 'summed price');
});

/* ---- golden 2: BRAKELESS freecoaster street build --------------------------- */
test('golden BRAKELESS freecoaster build (Colony Sweet Tooth) - clean AND complete without any brake', function(){
  var build = {
    frame: bp('bmx-fr-colony-sweettooth'),        // bossless - brakeless by design
    fork: bp('bmx-fk-merritt-cnc'),               // bossless fork
    headset: bp('bmx-hs-salt-pro'),
    cranks: bp('bmx-cr-profile-race'),            // 3-piece, 19mm
    bb: bp('bmx-bb-salt-mid-19'),                 // mid, 19mm
    sprocket: bp('bmx-sp-profile-race-25'),       // 25T 1/8
    chain: bp('bmx-ch-odyssey-seance'),           // 1/8 half-link
    frontWheel: bp('bmx-fw-fitbikeco-oem'),       // 20in, 10mm
    rearWheel: bp('bmx-rh-odyssey-clutchv2'),     // freecoaster, 14mm, 9T
    rearCog: bp('bmx-rc-profile-freecoaster-10'), // freecoaster cog on a freecoaster hub
    frontTire: bp('bmx-ti-duo-svs'),
    rearTire: bp('bmx-ti-odyssey-aitken'),
    pegsFront: bp('bmx-pg-fit-universal'),        // 14mm pegs, reducer INCLUDED -> info on the 10mm front
    pegsRear: bp('bmx-pg-fit-universal'),
    handlebar: bp('bmx-hb-fitbikeco-vh'),
    stem: bp('bmx-st-cult-hi-fi'),
    grips: bp('bmx-gr-odi-longneck'),
    seat: bp('bmx-se-wethepeople-team'),         // pivotal (swapped 2026-07-17: the prior bmx-se-odyssey-fedaykin row was removed as fabricated)
    seatpost: bp('bmx-sp-cult-pivotal-post'),
    pedals: bp('bmx-pd-shadow-metalalloy')
  };
  var r = BMX.checkBmxBuild(build);
  eq(r.errors.map(String).join('\n'), '', 'zero errors - brakeless is never an error');
  eq(r.warnings.map(String).join('\n'), '', 'zero warnings - the shipped peg reducer is an info');
  // the brakeless-by-design note + the freecoaster preference note + the peg
  // reducer note are exactly the kind of INFO a builder wants to see
  ok(r.infos.some(function(v){ return v.ruleId === 'bmx-brakeless'; }), 'brakeless-by-design info');
  assertComplete(build);   // completeness NEVER asks for a brake (decision 3, 2026-07-13)
});

/* ---- known-bad build: every planted conflict must fire ----------------------- */
test('a deliberately wrong BMX build fails on every planted conflict (no false fits)', function(){
  var r = BMX.checkBmxBuild({
    frame: bp('bmx-fr-redline-proline'),          // euro shell, v-brake bosses
    bb: bp('bmx-bb-salt-mid-19'),                 // mid BB in a euro shell -> bmx-bb-shell
    cranks: bp('bmx-cr-odyssey-calibre'),         // 22mm crank on the 19mm BB -> bmx-bb-spindle
    rearBrake: bp('bmx-br-odyssey-evo25'),        // u-brake on v-brake bosses -> bmx-rear-brake-mount
    rearWheel: bp('bmx-rh-cult-matchv2'),         // cassette hub...
    rearCog: bp('bmx-rc-profile-freecoaster-10'), // ...with a freecoaster cog -> bmx-cog-driver
    seat: bp('bmx-se-cult-pivotal'),
    seatpost: bp('bmx-sp-odyssey-standard-post')  // pivotal seat on a standard post -> bmx-seat-system
  });
  var ids = r.errors.map(function(v){ return v.ruleId; });
  ['bmx-bb-shell', 'bmx-bb-spindle', 'bmx-rear-brake-mount', 'bmx-cog-driver', 'bmx-seat-system']
    .forEach(function(rule){ ok(ids.indexOf(rule) >= 0, 'missing expected error ' + rule + ' (a miss here is a false "fits")'); });
});
