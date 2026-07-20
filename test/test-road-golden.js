'use strict';
/* =============================================================================
   Road/gravel golden builds — whole real bikes through checkRoadBuild
   (OFF-LIVE). A 2x AXS road build, a 1x XPLR gravel build and a 1x Ekar/N3W
   gravel build must check clean AND count as complete; a 2x Di2 road build
   must check clean while roadSlotRequired honestly reports its front
   derailleur missing (no Di2 FD row exists in either dataset yet — a catalog
   GAP, not an engine hole); a deliberately-wrong build must fail on every
   planted conflict. Plus dataset sanity and the off-live containment guard.
   ========================================================================== */
var fs = require('fs');
var path = require('path');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;
var ROAD = require('../src/compat-road.js');
var RD = require('../data/road.js');
var GD = require('../data/gravel.js');

/** @param {string} id @returns {any} */
function rp(id){
  var p = RD.ROAD_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown road part id: ' + id);
  return p;
}
/** @param {string} id @returns {any} */
function gp(id){
  var p = GD.GRAVEL_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown gravel part id: ' + id);
  return p;
}
/** Every roadSlotRequired slot filled? @param {Object.<string, any>} build */
function assertComplete(build){
  ROAD.ROAD_SLOTS.forEach(function(/** @type {any} */ s){
    if(ROAD.roadSlotRequired(s, build)) ok(build[s.key], 'required slot ' + s.key + ' is filled');
  });
}
/** @param {any} r @returns {string} */
function describeConflicts(r){
  return r.errors.concat(r.warnings).map(function(/** @type {any} */ v){ return v.ruleId + ': ' + v.msg; }).join(' | ');
}

/* ---- dataset sanity -------------------------------------------------------- */
test('road+gravel datasets: unique ids, engine-known categories', function(){
  /* dropbar-cleanup-1 item 3: gravel used to lump cat:'derailleur' for BOTH
     front and rear derailleurs while road split frontderailleur/
     rearderailleur (a known dataset divergence this list used to paper
     over with an extra 'derailleur' entry). gravel now matches road's split
     (its gfd-/grd- id prefixes already distinguished them, only the cat
     field was lumped), so every cat in both datasets maps to a real
     ROAD_SLOTS entry — no manual seed needed. */
  /** @type {Object.<string, boolean>} */ var knownCats = {};
  ROAD.ROAD_SLOTS.forEach(function(/** @type {any} */ s){ knownCats[s.cat] = true; });
  /** @type {Object.<string, boolean>} */ var seen = {};
  RD.ROAD_PARTS.concat(GD.GRAVEL_PARTS).forEach(function(/** @type {any} */ p){
    ok(!seen[p.id], 'duplicate id across the two datasets: ' + p.id); seen[p.id] = true;
    ok(knownCats[p.cat], p.id + ' category "' + p.cat + '" maps to no ROAD_SLOTS slot');
    ok(typeof p.price === 'number' && p.price >= 0, p.id + ' price');
    ok(typeof p.brand === 'string' && typeof p.model === 'string', p.id + ' identity');
  });
});

test('vocab discipline: wheel + freehub tokens stay inside ROAD_VOCAB (never an MTB token)', function(){
  RD.ROAD_PARTS.concat(GD.GRAVEL_PARTS).forEach(function(/** @type {any} */ p){
    var wheels = p.wheel == null ? [] : (Array.isArray(p.wheel) ? p.wheel : [p.wheel]);
    wheels.forEach(function(/** @type {string} */ w){
      ok(ROAD.ROAD_VOCAB.wheel.indexOf(w) >= 0, p.id + ' wheel "' + w + '" not a road/gravel token');
    });
    if(p.cat === 'cassette')
      ok(ROAD.ROAD_VOCAB.freehub.indexOf(p.freehub) >= 0, p.id + ' freehub "' + p.freehub + '" not a road/gravel token (MTB tokens are a false-green trap)');
  });
});

/* ---- off-live containment (CLAUDE.md hard rule 3) -------------------------- */
test('OFF-LIVE: nothing the site serves loads compat-road.js or the road/gravel data', function(){
  var root = path.join(__dirname, '..');
  ['index.html', 'bmx.html'].forEach(function(page){
    var html = fs.readFileSync(path.join(root, page), 'utf8');
    ok(html.indexOf('compat-road') < 0, page + ' must not load the road engine');
    ok(html.indexOf('data/road.js') < 0 && html.indexOf('data/gravel.js') < 0, page + ' must not load road/gravel data');
  });
});

/* ---- golden 1: 2x SRAM RED AXS road build (complete, conflict-free) -------- */
test('golden: S-Works Tarmac SL8 / RED AXS 2x12 road build is complete and conflict-free', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: rp('fr-specialized-sworks-tarmac-sl8'),
    fork: rp('fk-specialized-tarmac-sl8'),
    frontWheel: rp('fw-zipp-303-firecrest-tld'),
    rearWheel: rp('rw-zipp-303-firecrest-tld'),
    frontTire: rp('ti-continental-gp5000stre-28'),
    rearTire: rp('ti-continental-gp5000stre-28'),
    shifter: rp('sh-sram-red-axs'),
    frontDerailleur: gp('gfd-sram-force-axs-fd'),   // the only AXS-road FD row lives in the gravel dataset — one shared engine, one shared parts pool
    rearDerailleur: rp('rd-sram-red-axs'),
    cassette: rp('cs-sram-red-xg1290-1033'),
    chain: rp('ch-sram-red-flattop'),
    crankset: rp('cr-sram-red-axs-crank'),
    bb: gp('gbb-sram-dub-bsa'),
    frontBrake: rp('br-sram-red-axs'),
    rearBrake: rp('br-sram-red-axs'),
    frontRotor: rp('ro-sram-paceline-160'),
    rearRotor: rp('ro-sram-paceline-160'),
    handlebar: rp('hb-zipp-sl70-aero'),
    stem: rp('st-zipp-sl-sprint'),
    bartape: rp('bt-fizik-vento-microtex-tacky'),
    seatpost: rp('sp-specialized-tarmac-sl8'),
    saddle: rp('sd-fizik-antares-versus-r3'),
    pedals: rp('pd-look-keo-blade-carbon')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);
  var t = ROAD.roadBuildTotals(build);
  ok(t.price > 0 && t.weight > 0, 'totals accumulate');
});

/* ---- golden 2: 1x SRAM Rival XPLR gravel build (complete, conflict-free) ---- */
test('golden: Crux / Rival XPLR AXS 1x12 gravel build is complete and conflict-free', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: gp('gfr-specialized-crux-comp-carbon'),
    fork: gp('gfk-specialized-crux-carbon-rigid'),
    frontWheel: gp('gfw-dtswiss-g1800-700c'),
    rearWheel: gp('grw-dtswiss-g1800-700c'),
    frontTire: gp('gti-wtb-riddler-700x37'),
    rearTire: gp('gti-wtb-riddler-700x37'),
    shifter: gp('gsft-sram-rival-xplr-axs'),
    rearDerailleur: gp('grd-sram-rival-xplr-axs-rd'),
    cassette: gp('gca-sram-xg1251-1044'),
    chain: gp('gch-sram-xplr-flattop-12'),
    crankset: gp('gcr-sram-rival-xplr-axs-1x'),
    bb: gp('gbb-sram-dub-bsa'),
    frontBrake: gp('gbr-sram-rival-axs-brake'),
    rearBrake: gp('gbr-sram-rival-axs-brake'),
    frontRotor: gp('gro-shimano-rt-cl800-160-cl'),
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowbell-318'),
    stem: gp('gst-zipp-scsl-100'),
    bartape: gp('gtp-fizik-vento-microtex-tacky'),
    seatpost: gp('gsp-zipp-scsl-272'),
    saddle: gp('gsa-wtb-volt')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);   // no frontDerailleur: a 1x crank never requires one
});

/* ---- golden 3: 1x Campagnolo Ekar / N3W gravel build (complete, conflict-free) */
test('golden: Aspero / Ekar 13sp N3W gravel build is complete and conflict-free (BB advisory info only)', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: gp('gfr-cervelo-aspero-disc'),
    fork: gp('gfk-cervelo-aspero-carbon'),
    frontWheel: gp('gfw-campagnolo-levante-700c'),
    rearWheel: gp('grw-campagnolo-levante-700c'),
    frontTire: gp('gti-wtb-byway-700x40'),
    rearTire: gp('gti-wtb-byway-700x40'),
    shifter: gp('gsft-campagnolo-ekar'),
    rearDerailleur: gp('grd-campagnolo-ekar-rd'),
    cassette: gp('gca-campagnolo-ekar-936'),
    chain: gp('gch-campagnolo-ekar-13'),
    crankset: gp('gcr-campagnolo-ekar-1x'),
    frontBrake: gp('gbr-campagnolo-ekar-brake'),
    rearBrake: gp('gbr-campagnolo-ekar-brake'),
    frontRotor: gp('gro-shimano-rt-cl800-160-cl'),
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowchipper-318'),
    stem: gp('gst-ritchey-wcs-4axis-100'),
    seatpost: gp('gsp-cannondale-carbon-272'),
    saddle: gp('gsa-fizik-argo-tempo')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  eq(r.infos.filter(function(/** @type {any} */ v){ return v.ruleId === 'rg-bb-advisory'; }).length, 1,
    'no Ultra-Torque BB row exists yet, so the sold-separately nudge fires (an info, not a block)');
  assertComplete(build);
});

/* ---- golden: Checkpoint SL 7 / GRX RX820 1x12 gravel build — proves the
   micro-spline-road wheel gap (dropbar-cleanup-1 item 2) is closed */
test('golden: Checkpoint SL 7 / GRX RX820 1x12 gravel build is complete and conflict-free', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: gp('gfr-trek-checkpoint-sl-7'),
    fork: gp('gfk-trek-checkpoint-isospeed-carbon'),
    frontWheel: gp('gfw-shimano-grx-rx880-700c'),
    rearWheel: gp('grw-shimano-grx-rx880-700c'),
    frontTire: gp('gti-wtb-riddler-700x37'),
    rearTire: gp('gti-wtb-riddler-700x37'),
    shifter: gp('gsft-shimano-grx-rx820-1x12'),
    rearDerailleur: gp('grd-shimano-grx-rd-rx822-1x12'),
    cassette: gp('gca-shimano-grx-cs-m7100-1045'),
    chain: gp('gch-shimano-cn-m6100-12'),
    crankset: gp('gcr-shimano-grx-fc-rx820-1x'),
    bb: gp('gbb-shimano-sm-bb52-bb86'),
    frontBrake: gp('gbr-shimano-grx-br-rx820'),
    rearBrake: gp('gbr-shimano-grx-br-rx820'),
    frontRotor: gp('gro-shimano-rt-cl800-160-cl'),
    rearRotor: gp('gro-shimano-rt-cl800-160-cl'),
    handlebar: gp('ghb-salsa-cowbell-318'),
    stem: gp('gst-ritchey-wcs-4axis-100'),
    seatpost: gp('gsp-thomson-elite-272'),
    saddle: gp('gsa-wtb-volt')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  assertComplete(build);   // no frontDerailleur: a 1x crank never requires one
});

/* ---- golden 4: 2x Shimano Ultegra Di2 road build — clean, honestly incomplete */
test('golden: Ultimate CF SLX / Ultegra Di2 checks clean; the missing Di2 FD is an honest completeness gap', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: rp('fr-canyon-ultimate-cfslx'),
    fork: rp('fk-canyon-ultimate-cfslx'),
    frontWheel: rp('fw-dtswiss-arc1100-dicut-38'),
    rearWheel: rp('rw-dtswiss-arc1100-dicut-38'),
    frontTire: rp('ti-continental-gp5000stre-28'),
    rearTire: rp('ti-continental-gp5000stre-28'),
    shifter: rp('sh-shimano-ultegra-r8100'),
    rearDerailleur: rp('rd-shimano-ultegra-r8100'),
    cassette: rp('cs-shimano-ultegra-r8100-1130'),
    chain: rp('ch-shimano-ultegra-r8100'),
    crankset: rp('cr-shimano-ultegra-r8100'),
    frontBrake: rp('br-shimano-ultegra-r8100'),
    rearBrake: rp('br-shimano-ultegra-r8100'),
    frontRotor: rp('ro-shimano-rtcl800-160'),
    rearRotor: rp('ro-shimano-rtcl800-160'),
    handlebar: rp('hb-pro-vibe-superlight'),
    stem: rp('st-pro-vibe'),
    seatpost: rp('sp-canyon-vcls-cp0018'),
    saddle: rp('sd-selleitalia-slr-boost')
  };
  var r = ROAD.checkRoadBuild(build);
  eq(r.errors.length, 0, 'no errors: ' + describeConflicts(r));
  eq(r.warnings.length, 0, 'no warnings: ' + describeConflicts(r));
  var fdSlot = ROAD.ROAD_SLOTS.filter(function(/** @type {any} */ s){ return s.key === 'frontDerailleur'; })[0];
  eq(ROAD.roadSlotRequired(fdSlot, build), true,
    'the 2x crank makes the FD slot required — neither dataset has a Di2 FD row yet (catalog GAP, reported), so this build is honestly incomplete');
});

/* ---- known-bad build ------------------------------------------------------- */
test('known-bad build fails on every planted conflict', function(){
  /** @type {Object.<string, any>} */
  var build = {
    frame: rp('fr-trek-emonda-slr'),                       // 700c, maxTire 28, proprietary post
    frontWheel: gp('gfw-hunt-adventurewide-650b'),         // 650b vs the 700c rear -> rg-wheel-size
    rearWheel: rp('rw-shimano-c50-r9270'),                 // hg-l2
    rearTire: rp('ti-continental-gp5000stre-32'),          // 32mm over the Emonda's 28mm -> rg-tire-clearance
    cassette: rp('cs-sram-red-xg1290-1033'),               // xdr on the hg-l2 wheel -> rg-freehub
    shifter: rp('sh-shimano-da-r9200'),                    // di2-wired Shimano...
    rearDerailleur: rp('rd-sram-red-axs'),                 // ...vs a wireless SRAM mech -> rg-drivetrain-system + rg-actuation
    chain: rp('ch-shimano-ultegra-r8100'),                 // hg chain on the sram-axs-road cassette -> rg-chain-std
    frontRotor: gp('gro-sram-centerline-160-6b'),          // 6-bolt on the CL 650b hub -> rg-rotor-mount adapter warning
    seatpost: rp('sp-zipp-sl-speed')                       // round post in the proprietary bore -> rg-seatpost
  };
  var r = ROAD.checkRoadBuild(build);
  /** @param {string} ruleId @param {'errors'|'warnings'} tier */
  function planted(ruleId, tier){
    ok(r[tier].some(function(/** @type {any} */ v){ return v.ruleId === ruleId; }), ruleId + ' must fire as a ' + tier.slice(0, -1));
  }
  planted('rg-wheel-size', 'errors');
  planted('rg-freehub', 'errors');
  planted('rg-drivetrain-system', 'errors');
  planted('rg-actuation', 'errors');
  planted('rg-chain-std', 'errors');
  planted('rg-seatpost', 'errors');
  planted('rg-tire-clearance', 'warnings');
  planted('rg-rotor-mount', 'warnings');
  ok(r.errors.length >= 6, 'at least the six planted errors are present');
});
