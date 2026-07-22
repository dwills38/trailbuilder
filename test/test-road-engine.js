'use strict';
/* =============================================================================
   Road/gravel engine tests — checkRoadBuild (src/compat-road.js, OFF-LIVE).
   Every rule of data/ROAD-GRAVEL-COMPAT-ANALYSIS.md §1: fires when tripped,
   stays silent when compatible, and the sourced-data-gated checks (frame
   maxRotorR, rim minTire, frame.udh, tire clearance without a published max)
   stay DORMANT without their fields — negative tests prove the dormancy, per
   the project bar. Real catalog rows are used wherever the datasets can
   produce the case; synthetic mutations (Object.assign copies) cover the
   rest so no test couples to sample-data quality.
   ========================================================================== */
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
/** @param {any} r @param {string} ruleId @returns {any[]} */
function of(r, ruleId){
  return r.errors.concat(r.warnings).concat(r.infos).filter(function(/** @type {any} */ v){ return v.ruleId === ruleId; });
}
/** @param {any} r @param {string} ruleId @returns {any[]} */
function errOf(r, ruleId){ return r.errors.filter(function(/** @type {any} */ v){ return v.ruleId === ruleId; }); }
/** @param {any} r @param {string} ruleId @returns {any[]} */
function warnOf(r, ruleId){ return r.warnings.filter(function(/** @type {any} */ v){ return v.ruleId === ruleId; }); }
/** @param {any} r @param {string} ruleId @returns {any[]} */
function infoOf(r, ruleId){ return r.infos.filter(function(/** @type {any} */ v){ return v.ruleId === ruleId; }); }
/** synthetic row: a copy of a real part with overridden fields
 * @param {any} base @param {Object.<string, any>} over @returns {any} */
function syn(base, over){ return Object.assign({}, base, over); }

/* ---- result shape shares the MTB verdict contract ------------------------ */
test('checkRoadBuild returns the shared structured-verdict shape, no undefined text', function(){
  var r = ROAD.checkRoadBuild({
    frame: rp('fr-specialized-sworks-tarmac-sl8'), fork: rp('fk-trek-emonda-slr'),
    rearWheel: rp('rw-shimano-c50-r9270'), cassette: rp('cs-sram-red-xg1290-1033'),
    seatpost: rp('sp-zipp-sl-speed')
  });
  ok(Array.isArray(r.errors) && Array.isArray(r.warnings) && Array.isArray(r.infos), 'result shape');
  var all = r.errors.concat(r.warnings).concat(r.infos);
  ok(all.length > 0, 'this deliberately-clashing build produces verdicts');
  all.forEach(function(v){
    ok(typeof v.ruleId === 'string' && Array.isArray(v.slots) && typeof v.msg === 'string', 'verdict fields');
    eq(String(v), v.msg, 'toString is the message');
    ok(String(v).indexOf('undefined') < 0, 'clean message: ' + v);
  });
});

test('a build of id strings throws (the silent-false-all-clear guard)', function(){
  var threw = false;
  try { ROAD.checkRoadBuild(/** @type {any} */ ({ frame: 'fr-specialized-sworks-tarmac-sl8' })); }
  catch(e){ threw = true; }
  ok(threw, 'string slots must throw, never silently pass');
});

test('checkRoadBuild is deterministic (same build, same verdict keys)', function(){
  /** @type {Object.<string, any>} */
  var build = { frame: rp('fr-trek-emonda-slr'), rearTire: rp('ti-continental-gp5000stre-32'), rearWheel: rp('rw-shimano-c50-r9270'), cassette: rp('cs-sram-red-xg1290-1033') };
  /** @param {any} r @returns {string} */
  function keys(r){ return r.errors.concat(r.warnings).concat(r.infos).map(ROAD.verdictKey).join(';'); }
  eq(keys(ROAD.checkRoadBuild(build)), keys(ROAD.checkRoadBuild(build)), 'deterministic');
});

/* ---- R1 wheel size -------------------------------------------------------- */
test('rg-wheel-size errors a 650b/700c mix and stays silent matched', function(){
  var r = ROAD.checkRoadBuild({ frontWheel: gp('gfw-hunt-adventurewide-650b'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(errOf(r, 'rg-wheel-size').length, 1, 'fires on 650b front / 700c rear');
  var r2 = ROAD.checkRoadBuild({ frontWheel: rp('fw-shimano-c50-r9270'), rearWheel: rp('rw-shimano-c50-r9270'), frontTire: rp('ti-continental-gp5000stre-28'), rearTire: rp('ti-continental-gp5000stre-28') });
  eq(of(r2, 'rg-wheel-size').length, 0, 'silent when everything is 700c');
});
test('rg-wheel-size errors a size the frame does not list', function(){
  var r = ROAD.checkRoadBuild({ frame: gp('gfr-trek-checkpoint-alr-5'), frontWheel: gp('gfw-hunt-adventurewide-650b'), rearWheel: gp('grw-hunt-adventurewide-650b') });
  eq(errOf(r, 'rg-wheel-size').length, 1, '650b wheels on a 700c-only frame');
  var r2 = ROAD.checkRoadBuild({ frame: gp('gfr-specialized-crux-comp-carbon'), frontWheel: gp('gfw-hunt-adventurewide-650b'), rearWheel: gp('grw-hunt-adventurewide-650b') });
  eq(of(r2, 'rg-wheel-size').length, 0, 'silent on a dual-size frame that lists 650b');
});
test('rg-wheel-size: fork support — string (road) and array (gravel) shapes', function(){
  var r = ROAD.checkRoadBuild({ fork: rp('fk-trek-emonda-slr'), frontWheel: gp('gfw-hunt-adventurewide-650b') });
  eq(errOf(r, 'rg-wheel-size').length, 1, 'a 700c road fork rejects a 650b wheel');
  var r2 = ROAD.checkRoadBuild({ fork: gp('gfk-specialized-crux-carbon-rigid'), frontWheel: gp('gfw-hunt-adventurewide-650b') });
  eq(of(r2, 'rg-wheel-size').length, 0, 'a dual-size gravel fork (array wheel) accepts 650b');
});
test('rg-wheel-size: frame+fork size-disjoint pair errors before any wheel is picked', function(){
  var fork650only = syn(gp('gfk-specialized-crux-carbon-rigid'), { id: 'gfk-syn-650only', wheel: ['650b'] });
  var r = ROAD.checkRoadBuild({ frame: gp('gfr-trek-checkpoint-alr-5'), fork: fork650only });
  eq(errOf(r, 'rg-wheel-size').length, 1, '650b-only fork on a 700c-only frame');
});

/* ---- R2/R3 axles ---------------------------------------------------------- */
test('rg-front-axle errors the proprietary Lefty on a 12x100 wheel, silent matched', function(){
  var r = ROAD.checkRoadBuild({ fork: gp('gfk-cannondale-lefty-oliver-30'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  eq(errOf(r, 'rg-front-axle').length, 1, 'lefty-proprietary vs 12x100 (a real single-sided fitment)');
  var r2 = ROAD.checkRoadBuild({ fork: rp('fk-specialized-tarmac-sl8'), frontWheel: rp('fw-zipp-303-firecrest-tld') });
  eq(of(r2, 'rg-front-axle').length, 0, '12x100 on 12x100');
});
test('rg-rear-axle errors a QR hub on a thru-axle frame', function(){
  var qrWheel = syn(rp('rw-zipp-303-firecrest-tld'), { id: 'rw-syn-qr130', hub: 'qr130' });
  var r = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), rearWheel: qrWheel });
  eq(errOf(r, 'rg-rear-axle').length, 1, 'qr130 vs 12x142');
  var r2 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), rearWheel: rp('rw-zipp-303-firecrest-tld') });
  eq(of(r2, 'rg-rear-axle').length, 0, '12x142 on 12x142');
});

/* ---- R4 steerer ----------------------------------------------------------- */
test('rg-steerer errors frame/fork and headset/fork mismatches, silent matched', function(){
  var straightFork = syn(rp('fk-canyon-ultimate-cfslx'), { id: 'fk-syn-straight', steerer: 'straight-1-1-8' });
  var r = ROAD.checkRoadBuild({ frame: rp('fr-canyon-ultimate-cfslx'), fork: straightFork });
  eq(errOf(r, 'rg-steerer').length, 1, 'straight fork in a tapered frame');
  var straightHset = syn(gp('ghs-canecreek-40-zs44-zs56'), { id: 'ghs-syn-straight', steerer: 'straight-1-1-8' });
  var r2 = ROAD.checkRoadBuild({ fork: rp('fk-canyon-ultimate-cfslx'), headset: straightHset });
  eq(errOf(r2, 'rg-headset-steerer').length, 1, 'straight-steerer headset on a tapered fork');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-canyon-ultimate-cfslx'), fork: rp('fk-canyon-ultimate-cfslx'), headset: gp('ghs-canecreek-40-zs44-zs56') });
  eq(of(r3, 'rg-steerer').length + of(r3, 'rg-headset-steerer').length, 0, 'tapered end to end');
});

test('rg-steerer: straight-1-1-4 (vocab-tier1, 2026-07-22) fits its own class, errors against tapered and against straight-1-1-8', function(){
  var frame114 = gp('gfr-canyon-grizl-cf-sl');   // real row, steerer:'straight-1-1-4'
  var fork114 = syn(gp('gfk-cannondale-topstone-carbon'), { id: 'gfk-syn-114', steerer: 'straight-1-1-4' });
  var r = ROAD.checkRoadBuild({ frame: frame114, fork: fork114 });
  eq(of(r, 'rg-steerer').length, 0, 'straight-1-1-4 frame + straight-1-1-4 fork (matched class) fits');
  var taperedFork = gp('gfk-cannondale-topstone-carbon');   // real row, steerer:'tapered'
  var r2 = ROAD.checkRoadBuild({ frame: frame114, fork: taperedFork });
  eq(errOf(r2, 'rg-steerer').length, 1, 'tapered fork in a straight-1-1-4 frame errors');
  var fork118 = syn(gp('gfk-cannondale-topstone-carbon'), { id: 'gfk-syn-118', steerer: 'straight-1-1-8' });
  var r3 = ROAD.checkRoadBuild({ frame: frame114, fork: fork118 });
  eq(errOf(r3, 'rg-steerer').length, 1, 'straight-1-1-8 fork in a straight-1-1-4 frame errors — the two straight classes are never interchangeable');
});

test('proprietary steerer systems: same-system fits, cross-system and standard both error (Douglas-ruled 2026-07-21)', function(){
  // Real catalog rows: Giant OverDrive Aero (D-shaped) and Cannondale Delta are distinct
  // per-system tokens ON PURPOSE — a shared 'proprietary' token would let the exact-match
  // rule green a Delta fork on an OverDrive frame (false fits). Pin all four directions.
  var r = ROAD.checkRoadBuild({ frame: rp('fr-giant-tcr-advsl'), fork: rp('fk-giant-tcr-advsl') });
  eq(of(r, 'rg-steerer').length, 0, 'OverDrive frame + OverDrive fork (real OEM pair) fits');
  var r2 = ROAD.checkRoadBuild({ frame: rp('fr-giant-tcr-advsl'), fork: rp('fk-specialized-tarmac-sl8') });
  eq(errOf(r2, 'rg-steerer').length, 1, 'standard tapered fork in an OverDrive frame errors');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-cannondale-supersix-evo'), fork: rp('fk-giant-tcr-advsl') });
  eq(errOf(r3, 'rg-steerer').length, 1, 'cross-proprietary (OverDrive fork in a Delta frame) errors — the shared-token trap this vocab design avoids');
  var r4 = ROAD.checkRoadBuild({ frame: rp('fr-cannondale-supersix-evo'), fork: rp('fk-cannondale-supersix-evo') });
  eq(of(r4, 'rg-steerer').length, 0, 'Delta frame + Delta fork (real OEM pair) fits');
});

test('proprietary steerer pair with no headset gets the integrated-headset info; a picked headset still errors truthfully', function(){
  var r = ROAD.checkRoadBuild({ frame: rp('fr-cannondale-supersix-evo'), fork: rp('fk-cannondale-supersix-evo') });
  eq(infoOf(r, 'rg-headset-proprietary').length, 1, 'matched Delta pair, no headset -> explanatory info');
  var r2 = ROAD.checkRoadBuild({ frame: rp('fr-cannondale-supersix-evo'), fork: rp('fk-cannondale-supersix-evo'), headset: gp('ghs-canecreek-40-zs44-zs56') });
  eq(errOf(r2, 'rg-headset-steerer').length, 1, 'a standard tapered headset still errors — true won\'t-fit stays an error');
  eq(infoOf(r2, 'rg-headset-proprietary').length, 0, 'info suppressed once a headset is picked (the error explains it)');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-canyon-ultimate-cfslx'), fork: rp('fk-canyon-ultimate-cfslx') });
  eq(infoOf(r3, 'rg-headset-proprietary').length, 0, 'standard tapered pair never gets the proprietary info');
});

/* ---- R5 freehub ----------------------------------------------------------- */
test('rg-freehub: exact-match error side (XDR cassette on an HG-L2 wheel)', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-sram-red-xg1290-1033'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(errOf(r, 'rg-freehub').length, 1, 'xdr vs hg-l2');
  var r2 = ROAD.checkRoadBuild({ cassette: rp('cs-sram-red-xg1290-1033'), rearWheel: rp('rw-zipp-303-firecrest-tld') });
  eq(of(r2, 'rg-freehub').length, 0, 'xdr on xdr');
});
test('rg-freehub: campag-11 cassette on an N3W wheel = the documented AC21-N3W adapter WARNING', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-campagnolo-record-1029'), rearWheel: rp('rw-campagnolo-bora-wto-45') });
  eq(errOf(r, 'rg-freehub').length, 0, 'not an error');
  var w = warnOf(r, 'rg-freehub');
  eq(w.length, 1, 'adapter-tier warning');
  ok(w[0].fix && w[0].fix.kind === 'adapter' && w[0].fix.name.indexOf('AC21-N3W') >= 0, 'structured fix names the AC21-N3W adapter');
});
test('rg-freehub: the REVERSE (N3W-native cassette on an ED/campag-11 wheel) stays the error', function(){
  var edWheel = syn(rp('rw-campagnolo-bora-wto-45'), { id: 'rw-syn-ed', freehub: 'campag-11' });
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-campagnolo-superrecord-1029'), rearWheel: edWheel });
  eq(errOf(r, 'rg-freehub').length, 1, 'no adapter exists in this direction');
  eq(warnOf(r, 'rg-freehub').length, 0, 'and no adapter tier is claimed');
});
/* HG-L2 dual-body fit (Shimano C-731: the ROAD 12-speed cassette class fits
   BOTH "HG spline L2" and "HG spline L") — the class is silent across the two
   bodies in both directions; everything outside the class keeps the error. */
test('rg-freehub C-731: 105 (hg-road token) on an HG-L2 wheel is SILENT', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-105-r7100-1136'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(of(r, 'rg-freehub').length, 0, 'road-12 class fits the L2 body natively');
});
test('rg-freehub C-731: Ultegra (hg-road token) on an HG-L2 wheel is SILENT', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-ultegra-r8100-1130'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(of(r, 'rg-freehub').length, 0, 'all road-12 tiers, not Dura-Ace only');
});
test('rg-freehub C-731: Dura-Ace (hg-l2 token) on an hg-road wheel is SILENT', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-da-r9200-1130'), rearWheel: rp('rw-shimano-rs710-c46') });
  eq(of(r, 'rg-freehub').length, 0, 'the same cassettes also fit HG spline L');
});
test('rg-freehub C-731: an 11-speed cassette on an HG-L2 wheel STAYS the error (L2 is 12s dedicated)', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-grx-hg800-1134'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(errOf(r, 'rg-freehub').length, 1, 'GRX 11s on hg-l2');
  var r2 = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-tiagra4700-1134'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(errOf(r2, 'rg-freehub').length, 1, 'Tiagra on hg-l2');
});
test('rg-freehub C-731: the class gate is SYSTEM-scoped, not token-scoped - a SRAM hg-road cassette on hg-l2 stays the error', function(){
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-sram-apex-xg1231-1144'), rearWheel: rp('rw-shimano-c50-r9270') });
  eq(errOf(r, 'rg-freehub').length, 1, 'sram-xplr-12 carries hg-road but is not the C-731 class');
});
test('rg-freehub C-731: a mis-tokened road-12 row (freehub outside the two HG bodies) keeps the error', function(){
  var badToken = syn(rp('cs-shimano-105-r7100-1136'), { id: 'cs-syn-road12-xdr', freehub: 'xdr' });
  var r = ROAD.checkRoadBuild({ cassette: badToken, rearWheel: rp('rw-shimano-rs710-c46') });
  eq(errOf(r, 'rg-freehub').length, 1, 'the dual-body silence never covers a non-HG token');
  var r2 = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-da-r9200-1130'), rearWheel: rp('rw-shimano-rx880-grx') });
  eq(errOf(r2, 'rg-freehub').length, 1, 'road-12 on a micro-spline-road wheel stays the error');
});

/* ---- R6 RD capacity ------------------------------------------------------- */
test('rg-rd-capacity errors a cassette over the RD max cog, silent within', function(){
  /* road-8 wave (2026-07-20): cs-shimano-105-r7100-1136 was corrected maxCog 36->34
     (productinfo.shimano.com/en/product/CS-R7101-12 confirms only an 11-34T combination
     exists). Every real cataloged road-12 derailleur maxes out at >=34T, so the "over
     capacity" branch is now demonstrated with a synthesized 30T-max short cage (syn(),
     same pattern used elsewhere in this file, e.g. line 174's badToken) rather than a
     real part - a real fixture for this branch no longer exists in the catalog. */
  var shortCage30 = syn(rp('rd-shimano-da-r9200'), { id: 'rd-syn-30-max', maxCog: 30 });
  var r = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-105-r7100-1136'), rearDerailleur: shortCage30 });
  eq(errOf(r, 'rg-rd-capacity').length, 1, '34T over a 30T-max short cage');
  var r2 = ROAD.checkRoadBuild({ cassette: rp('cs-shimano-105-r7100-1136'), rearDerailleur: rp('rd-shimano-105-r7100') });
  eq(of(r2, 'rg-rd-capacity').length, 0, '34T within a 36T max');
});

/* ---- R7 rotor interface --------------------------------------------------- */
test('rg-rotor-mount is direction-aware: CL-on-6-bolt errors, 6-bolt-on-CL warns with the SM-RTAD05 fix', function(){
  var sixBoltWheel = syn(gp('gfw-dtswiss-g1800-700c'), { id: 'gfw-syn-6b', rotorMount: '6-bolt' });
  var r = ROAD.checkRoadBuild({ frontRotor: rp('ro-shimano-rtcl900-160'), frontWheel: sixBoltWheel });
  eq(errOf(r, 'rg-rotor-mount').length, 1, 'Center Lock rotor cannot bolt to a 6-bolt hub');
  var r2 = ROAD.checkRoadBuild({ frontRotor: gp('gro-sram-centerline-160-6b'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  var w = warnOf(r2, 'rg-rotor-mount');
  eq(w.length, 1, '6-bolt rotor on a Center Lock hub = adapter warning');
  ok(w[0].fix && w[0].fix.name.indexOf('SM-RTAD05') >= 0, 'fix names the Shimano adapter');
  var r3 = ROAD.checkRoadBuild({ rearRotor: rp('ro-sram-paceline-160'), rearWheel: rp('rw-zipp-303-firecrest-tld') });
  eq(of(r3, 'rg-rotor-mount').length, 0, 'CL on CL is silent');
});

/* ---- R8 rotor size (sourced max only) ------------------------------------- */
test('rg-rotor-size warns over the fork max, silent at it, dormant on the frame side', function(){
  var rotor180 = syn(rp('ro-shimano-rtcl900-160'), { id: 'ro-syn-180', size: 180 });
  var r = ROAD.checkRoadBuild({ frontRotor: rotor180, fork: rp('fk-specialized-tarmac-sl8') });
  eq(warnOf(r, 'rg-rotor-size').length, 1, '180mm over a 160mm fork max');
  var r2 = ROAD.checkRoadBuild({ frontRotor: rotor180, fork: gp('gfk-fairlight-cempa-3-carbon') });
  eq(of(r2, 'rg-rotor-size').length, 0, '180mm at the Fairlight fork\'s fetched 180mm max');
  var r3 = ROAD.checkRoadBuild({ rearRotor: rotor180, frame: rp('fr-specialized-sworks-tarmac-sl8') });
  eq(of(r3, 'rg-rotor-size').length, 0, 'DORMANT: no frame row carries maxRotorR');
});

/* ---- R9 tire clearance (sourced max only, mm) ------------------------------ */
test('rg-tire-clearance: frame side reads both maxTire and maxTireByWheel shapes', function(){
  var r = ROAD.checkRoadBuild({ frame: gp('gfr-cannondale-topstone-carbon-4'), rearTire: gp('gti-wtb-riddler-700x45') });
  eq(warnOf(r, 'rg-tire-clearance').length, 1, '45mm over the Topstone\'s 42mm 700c clearance (maxTireByWheel)');
  var r2 = ROAD.checkRoadBuild({ frame: gp('gfr-cannondale-topstone-carbon-4'), rearTire: gp('gti-wtb-byway-650bx47') });
  eq(of(r2, 'rg-tire-clearance').length, 0, '47mm at the Topstone\'s 47mm 650b clearance — per-size lookup');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-trek-emonda-slr'), rearTire: rp('ti-continental-gp5000stre-32') });
  eq(warnOf(r3, 'rg-tire-clearance').length, 1, '32mm over the Emonda\'s 28mm maxTire (road shape)');
});
test('rg-tire-fork and rg-tire-rim fire off their own sourced maxes (ids mirror compat-gravel.js)', function(){
  var r = ROAD.checkRoadBuild({ fork: rp('fk-trek-emonda-slr'), frontTire: rp('ti-continental-gp5000stre-32') });
  eq(warnOf(r, 'rg-tire-fork').length, 1, '32mm over the fork\'s 28mm crown clearance');
  var wideTire = syn(rp('ti-continental-gp5000stre-32'), { id: 'ti-syn-35', width: 35 });
  var r2 = ROAD.checkRoadBuild({ frontWheel: rp('fw-dtswiss-arc1100-dicut'), frontTire: wideTire });
  eq(warnOf(r2, 'rg-tire-rim').length, 1, '35mm over the ARC 1100\'s sourced 32mm rim max');
  var r3 = ROAD.checkRoadBuild({ frontWheel: rp('fw-dtswiss-arc1100-dicut'), frontTire: rp('ti-continental-gp5000stre-32') });
  eq(of(r3, 'rg-tire-rim').length, 0, '32mm at the 32mm rim max is silent');
});
test('rg-tire-clearance stays DORMANT without a published max; rg-tire-rim-min dormant without minTire', function(){
  var noMaxFrame = syn(rp('fr-trek-emonda-slr'), { id: 'fr-syn-nomax', maxTire: undefined });
  var r = ROAD.checkRoadBuild({ frame: noMaxFrame, rearTire: gp('gti-wtb-riddler-700x45') });
  eq(of(r, 'rg-tire-clearance').length, 0, 'no maker max = no verdict, never guessed');
  var r2 = ROAD.checkRoadBuild({ frontWheel: rp('fw-dtswiss-arc1100-dicut'), frontTire: rp('ti-continental-gp5000stre-25') });
  eq(of(r2, 'rg-tire-rim-min').length, 0, 'DORMANT: no row carries minTire');
  var minWheel = syn(rp('fw-dtswiss-arc1100-dicut'), { id: 'fw-syn-min', minTire: 28 });
  var r3 = ROAD.checkRoadBuild({ frontWheel: minWheel, frontTire: rp('ti-continental-gp5000stre-25') });
  eq(warnOf(r3, 'rg-tire-rim-min').length, 1, 'activates on a declared minTire');
});

/* ---- R10 bar/stem clamp ---------------------------------------------------- */
test('rg-bar-clamp errors 31.8 vs 35, silent matched', function(){
  var stem35 = syn(rp('st-zipp-sl-sprint'), { id: 'st-syn-35', clamp: '35' });
  var r = ROAD.checkRoadBuild({ handlebar: rp('hb-zipp-sl70-aero'), stem: stem35 });
  eq(errOf(r, 'rg-bar-clamp').length, 1);
  var r2 = ROAD.checkRoadBuild({ handlebar: rp('hb-zipp-sl70-aero'), stem: rp('st-zipp-sl-sprint') });
  eq(of(r2, 'rg-bar-clamp').length, 0);
});

/* ---- R11 bb ---------------------------------------------------------------- */
test('rg-bb-shell / rg-bb-spindle error their mismatches; advisory info with no BB picked', function(){
  var r = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), bb: rp('bb-sram-dub-bb86') });
  eq(errOf(r, 'rg-bb-shell').length, 1, 'BB86 cups in a threaded BSA shell');
  var r2 = ROAD.checkRoadBuild({ bb: rp('bb-shimano-smbb72-41'), crankset: rp('cr-sram-red-axs-crank') });
  eq(errOf(r2, 'rg-bb-spindle').length, 1, '24mm bearing set under a DUB spindle');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-giant-tcr-advsl'), bb: rp('bb-shimano-smbb72-41'), crankset: rp('cr-shimano-da-r9200') });
  eq(of(r3, 'rg-bb-shell').length + of(r3, 'rg-bb-spindle').length, 0, 'PF86 shell + PF86 BB + 24mm crank all match');
  var r4 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), crankset: rp('cr-shimano-da-r9200') });
  eq(infoOf(r4, 'rg-bb-advisory').length, 1, 'sold-separately nudge');
});

/* ---- R12 seatpost / dropper ------------------------------------------------ */
test('rg-seatpost: the proprietary-post LOCK both ways', function(){
  var r = ROAD.checkRoadBuild({ frame: rp('fr-canyon-ultimate-cfslx'), seatpost: rp('sp-specialized-tarmac-sl8') });
  eq(errOf(r, 'rg-seatpost').length, 1, 'a Tarmac-only post on a Canyon frame');
  var r2 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), seatpost: rp('sp-specialized-tarmac-sl8') });
  eq(of(r2, 'rg-seatpost').length, 0, 'the post on a frame its maker lists');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), seatpost: rp('sp-zipp-sl-speed') });
  eq(errOf(r3, 'rg-seatpost').length, 1, 'a round 27.2 post in a proprietary aero bore');
});
test('rg-seatpost: round-vs-round is direction-aware (bigger = error, smaller = shim warning)', function(){
  var post316 = syn(rp('sp-zipp-sl-speed'), { id: 'sp-syn-316', diameter: '31.6' });
  var r = ROAD.checkRoadBuild({ frame: rp('fr-specialized-allez'), seatpost: post316 });
  eq(errOf(r, 'rg-seatpost').length, 1, '31.6 post in a 27.2 seat tube');
  var r2 = ROAD.checkRoadBuild({ frame: gp('gfr-ibis-hakka-mx'), seatpost: gp('gsp-zipp-scsl-272') });
  eq(warnOf(r2, 'rg-seatpost').length, 1, '27.2 post in the Hakka\'s 31.6 tube = reducing-shim warning');
  var r3 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-allez'), seatpost: rp('sp-zipp-sl-speed') });
  eq(of(r3, 'rg-seatpost').length, 0, '27.2 in 27.2');
});
test('rg-seatpost applies to the gravel dropper slot too', function(){
  var r = ROAD.checkRoadBuild({ frame: gp('gfr-ibis-hakka-mx'), dropper: gp('gdp-pnw-coast-272-60') });
  eq(warnOf(r, 'rg-seatpost').length, 1, '27.2 dropper in a 31.6 tube = shim warning');
  var r2 = ROAD.checkRoadBuild({ frame: gp('gfr-specialized-crux-comp-carbon'), dropper: gp('gdp-fox-transfer-sl-272-50') });
  eq(of(r2, 'rg-seatpost').length, 0, '27.2 dropper in a 27.2 tube');
});

/* ---- R13 one system + one speed ------------------------------------------- */
test('rg-drivetrain-system errors a Shimano/SRAM mix and stays silent on one system', function(){
  var r = ROAD.checkRoadBuild({ shifter: rp('sh-shimano-ultegra-r8100'), rearDerailleur: rp('rd-sram-red-axs') });
  eq(errOf(r, 'rg-drivetrain-system').length, 1);
  var r2 = ROAD.checkRoadBuild({ shifter: rp('sh-shimano-ultegra-r8100'), rearDerailleur: rp('rd-shimano-ultegra-r8100'), cassette: rp('cs-shimano-ultegra-r8100-1130') });
  eq(of(r2, 'rg-drivetrain-system').length, 0);
});
test('R13a: a SRAM AXS controller is exempt across the AXS road/XPLR family but not beyond it', function(){
  var r = ROAD.checkRoadBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), rearDerailleur: rp('rd-sram-force-axs'), cassette: rp('cs-sram-force-xg1270-1030') });
  eq(of(r, 'rg-drivetrain-system').length, 0, 'XPLR controller over a sram-axs-road mech+cassette: SRAM-documented, silent');
  var r2 = ROAD.checkRoadBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), rearDerailleur: rp('rd-campagnolo-superrecord-wrl') });
  eq(errOf(r2, 'rg-drivetrain-system').length, 1, 'an AXS controller does not drive a Campagnolo mech');
});
test('rg-drivetrain-speeds errors a real count mismatch; AXS controllers and Flattop chains are exempt', function(){
  var cass10 = syn(gp('gca-shimano-grx-cs-hg700-1134'), { id: 'gca-syn-10sp', speeds: 10 });
  var r = ROAD.checkRoadBuild({ shifter: gp('gsft-shimano-grx-rx600-2x11'), rearDerailleur: gp('grd-shimano-grx-rd-rx812-1x11'), cassette: cass10 });
  eq(errOf(r, 'rg-drivetrain-speeds').length, 1, '10sp cassette on an 11sp mechanical group');
  var r2 = ROAD.checkRoadBuild({ shifter: gp('gsft-sram-force-xplr-axs'), rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') });
  eq(of(r2, 'rg-drivetrain-speeds').length, 0, 'a 13sp-labeled AXS brifter over a 12sp XPLR mech stays SILENT - SRAM documents all AXS controllers driving all AXS road/XPLR derailleurs (a count here would be a false won\'t-fit)');
  var r3 = ROAD.checkRoadBuild({ shifter: gp('gsft-sram-red-xplr-axs'), rearDerailleur: gp('grd-sram-red-xplr-axs-rd'), cassette: gp('gca-sram-xg1391-1046'), chain: gp('gch-sram-xplr-flattop-12') });
  eq(of(r3, 'rg-drivetrain-speeds').length, 0, 'the 12s-labeled Flattop chain on a 13sp XPLR group stays silent (SRAM spans the family with one chain — the M1 lesson)');
});
test('a speed-defined (campag) chain DOES join the speed set', function(){
  var r = ROAD.checkRoadBuild({ cassette: gp('gca-campagnolo-ekar-936'), chain: rp('ch-campagnolo-record-c12'), rearDerailleur: gp('grd-campagnolo-ekar-rd'), shifter: gp('gsft-campagnolo-ekar') });
  eq(errOf(r, 'rg-drivetrain-speeds').length, 1, 'a 12s Campagnolo chain on the 13s Ekar group errors (Campagnolo chain manual)');
});

/* ---- R14 actuation --------------------------------------------------------- */
test('rg-actuation errors mechanical lever vs wireless mech within one system', function(){
  var r = ROAD.checkRoadBuild({ shifter: rp('sh-campagnolo-record-wrl'), rearDerailleur: rp('rd-campagnolo-superrecord-wrl') });
  eq(errOf(r, 'rg-actuation').length, 1, 'mechanical Ergopower cannot drive the wireless mech');
  var r2 = ROAD.checkRoadBuild({ shifter: rp('sh-shimano-ultegra-r8100'), rearDerailleur: rp('rd-shimano-ultegra-r8100') });
  eq(of(r2, 'rg-actuation').length, 0, 'di2-wired both ends');
});

/* ---- R15 chain standard ----------------------------------------------------- */
test('rg-chain-std errors an HG chain on an AXS-road drivetrain and a Flattop chain on Shimano', function(){
  var r = ROAD.checkRoadBuild({ chain: rp('ch-shimano-ultegra-r8100'), cassette: rp('cs-sram-red-xg1290-1033') });
  eq(errOf(r, 'rg-chain-std').length, 1, 'sram-axs-road wants flattop');
  var r2 = ROAD.checkRoadBuild({ chain: rp('ch-sram-red-flattop'), cassette: rp('cs-shimano-ultegra-r8100-1130') });
  eq(errOf(r2, 'rg-chain-std').length, 1, 'shimano-road-12 wants hg');
  var r3 = ROAD.checkRoadBuild({ chain: rp('ch-sram-red-flattop'), cassette: rp('cs-sram-red-xg1290-1033') });
  eq(of(r3, 'rg-chain-std').length, 0, 'flattop on AXS road is right');
});
test('rg-chain-std treats sram-rival22-11 as HG (pre-Flattop), not Flattop', function(){
  var r = ROAD.checkRoadBuild({ chain: rp('ch-sram-rival22'), cassette: rp('cs-sram-rival22-1132') });
  eq(of(r, 'rg-chain-std').length, 0, 'PC-1170 (hg) on Rival 22 (sram-rival22-11 wants hg) is right');
  var r2 = ROAD.checkRoadBuild({ chain: rp('ch-sram-red-flattop'), cassette: rp('cs-sram-rival22-1132') });
  eq(errOf(r2, 'rg-chain-std').length, 1, 'a Flattop chain on Rival 22 errors — it predates Flattop and wants hg');
});

/* ---- R16 the 2x front end --------------------------------------------------- */
test('rg-2x-control errors a 1x (no-front-shift) brifter on a 2x crank', function(){
  var r = ROAD.checkRoadBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), crankset: rp('cr-sram-force-axs-crank') });
  eq(errOf(r, 'rg-2x-control').length, 1);
  var r2 = ROAD.checkRoadBuild({ shifter: rp('sh-sram-force-axs'), crankset: rp('cr-sram-force-axs-crank') });
  eq(of(r2, 'rg-2x-control').length, 0, 'a front-shift pair runs 2x');
  var r3 = ROAD.checkRoadBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), crankset: gp('gcr-sram-rival-xplr-axs-1x') });
  eq(of(r3, 'rg-2x-control').length, 0, '1x control on a 1x crank');
});
test('rg-fd-mount errors an FD on a frame with no FD provision', function(){
  var r = ROAD.checkRoadBuild({ frame: gp('gfr-canyon-grail-cf-sl'), frontDerailleur: gp('gfd-sram-force-axs-fd') });
  eq(errOf(r, 'rg-fd-mount').length, 1, 'the Grail is a 1x-only frame');
  var r2 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), frontDerailleur: gp('gfd-sram-force-axs-fd') });
  eq(of(r2, 'rg-fd-mount').length, 0, 'braze-on frame takes the FD');
});
test('rg-fd-capacity: warns only off a part-carried capacity + parseable ring pair', function(){
  var bigSpread = syn(rp('cr-sram-red-axs-crank'), { id: 'cr-syn-5334', ring: '53/34' });
  var r = ROAD.checkRoadBuild({ frontDerailleur: gp('gfd-sram-force-axs-fd'), crankset: bigSpread });
  eq(warnOf(r, 'rg-fd-capacity').length, 1, '19T spread over a 16T capacity');
  var r2 = ROAD.checkRoadBuild({ frontDerailleur: gp('gfd-sram-force-axs-fd'), crankset: rp('cr-sram-red-axs-crank') });
  eq(of(r2, 'rg-fd-capacity').length, 0, '13T spread within 16T');
  var noCapFd = syn(gp('gfd-sram-force-axs-fd'), { id: 'gfd-syn-nocap', capacity: undefined });
  var r3 = ROAD.checkRoadBuild({ frontDerailleur: noCapFd, crankset: bigSpread });
  eq(of(r3, 'rg-fd-capacity').length, 0, 'DORMANT without a published capacity');
});

/* ---- R17 disc/rim class ------------------------------------------------------ */
test('rg-brake-system errors any disc/rim class mix, silent all-disc', function(){
  var rimWheel = syn(rp('fw-zipp-303-firecrest-tld'), { id: 'fw-syn-rim', brakeSystem: 'rim' });
  var r = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), frontWheel: rimWheel });
  eq(errOf(r, 'rg-brake-system').length, 1, 'a rim-brake wheel on a disc frame');
  var r2 = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), fork: rp('fk-specialized-tarmac-sl8'), frontWheel: rp('fw-zipp-303-firecrest-tld'), shifter: rp('sh-sram-red-axs'), frontBrake: rp('br-sram-red-axs') });
  eq(of(r2, 'rg-brake-system').length, 0, 'disc end to end (tokens of different granularity compare by class only)');
});

/* ---- R18 brake mount --------------------------------------------------------- */
test('rg-brake-mount errors a post-mount caliper on a flat-mount frame/fork', function(){
  var pmCaliper = syn(rp('br-sram-red-axs'), { id: 'br-syn-pm', mount: 'post-mount' });
  var r = ROAD.checkRoadBuild({ frame: rp('fr-specialized-sworks-tarmac-sl8'), rearBrake: pmCaliper });
  eq(errOf(r, 'rg-brake-mount').length, 1);
  var r2 = ROAD.checkRoadBuild({ fork: rp('fk-specialized-tarmac-sl8'), frontBrake: rp('br-sram-red-axs') });
  eq(of(r2, 'rg-brake-mount').length, 0, 'flat on flat');
});

/* ---- R19 brifter/caliper coupling --------------------------------------------- */
test('rg-brifter-brake: hydraulic caliper behind a cable-disc lever errors; the reverse stays silent', function(){
  var mechLever = syn(rp('sh-sram-red-axs'), { id: 'sh-syn-mech-disc', brakeSystem: 'disc-mechanical' });
  var r = ROAD.checkRoadBuild({ shifter: mechLever, rearBrake: rp('br-sram-red-axs') });
  eq(errOf(r, 'rg-brifter-brake').length, 1, 'no fluid column to drive the caliper');
  var cableCaliper = syn(rp('br-sram-red-axs'), { id: 'br-syn-cable', actuation: 'mechanical' });
  var r2 = ROAD.checkRoadBuild({ shifter: rp('sh-sram-red-axs'), rearBrake: cableCaliper });
  eq(of(r2, 'rg-brifter-brake').length, 0, 'DORMANT direction ([MECHANIC REVIEW]) — never guessed');
  var r3 = ROAD.checkRoadBuild({ shifter: rp('sh-sram-red-axs'), rearBrake: rp('br-sram-red-axs') });
  eq(of(r3, 'rg-brifter-brake').length, 0, 'hydraulic lever + hydraulic caliper');
});

/* ---- R20 XPLR full-mount / UDH ------------------------------------------------- */
test('rg-xplr-udh honesty tiers: sourced false = error, true = silent, unknown = info', function(){
  var rd13 = gp('grd-sram-red-xplr-axs-rd');
  var frame = gp('gfr-specialized-crux-comp-carbon');
  var r = ROAD.checkRoadBuild({ frame: syn(frame, { id: 'gfr-syn-noudh', udh: false }), rearDerailleur: rd13 });
  eq(errOf(r, 'rg-xplr-udh').length, 1, 'sourced udh:false = the frame cannot mount it');
  var r2 = ROAD.checkRoadBuild({ frame: syn(frame, { id: 'gfr-syn-udh', udh: true }), rearDerailleur: rd13 });
  eq(of(r2, 'rg-xplr-udh').length, 0, 'udh:true = silent');
  var r3 = ROAD.checkRoadBuild({ frame: frame, rearDerailleur: rd13 });
  eq(errOf(r3, 'rg-xplr-udh').length, 0, 'unknown UDH is NEVER an error (the Cannondale-UDH lesson)');
  eq(infoOf(r3, 'rg-xplr-udh').length, 1, 'but the definitional requirement surfaces as an info');
  var r4 = ROAD.checkRoadBuild({ rearDerailleur: rd13 });
  eq(infoOf(r4, 'rg-xplr-udh').length, 1, 'frameless info (the MTB rule-4 convention)');
  var r5 = ROAD.checkRoadBuild({ frame: frame, rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') });
  eq(of(r5, 'rg-xplr-udh').length, 0, 'a std-hanger RD never trips it');
});

/* ---- roadSlotRequired ----------------------------------------------------------- */
test('roadSlotRequired: FD only on a 2x crank; rotors dropped on rim frames; cockpit replaces bar+stem', function(){
  /** @param {string} key @returns {{key: string, label: string, cat: string, optional?: boolean, group: string}} */
  function slot(key){
    var s = ROAD.ROAD_SLOTS.filter(function(/** @type {any} */ x){ return x.key === key; })[0];
    if(!s) throw new Error('no slot ' + key);
    return s;
  }
  eq(ROAD.roadSlotRequired(slot('frontDerailleur'), {}), false, 'no crank picked = FD never blocks');
  eq(ROAD.roadSlotRequired(slot('frontDerailleur'), { crankset: gp('gcr-sram-rival-xplr-axs-1x') }), false, '1x crank = no FD');
  eq(ROAD.roadSlotRequired(slot('frontDerailleur'), { crankset: rp('cr-sram-red-axs-crank') }), true, '2x crank = FD required');
  eq(ROAD.roadSlotRequired(slot('frontRotor'), {}), true, 'disc-only default: rotors required');
  var rimFrame = syn(rp('fr-specialized-allez'), { id: 'fr-syn-rim', brakeSystem: 'rim-caliper' });
  eq(ROAD.roadSlotRequired(slot('frontRotor'), { frame: rimFrame }), false, 'rim-brake frame drops the rotor slots');
  eq(ROAD.roadSlotRequired(slot('rearRotor'), { frame: rimFrame }), false, 'both rotor slots');
  eq(ROAD.roadSlotRequired(slot('handlebar'), { cockpit: { brand: 'Syn', model: 'One-piece', integrated: true } }), false, 'a cockpit fills the bar role');
  eq(ROAD.roadSlotRequired(slot('stem'), { cockpit: { brand: 'Syn', model: 'One-piece', integrated: true } }), false, 'and the stem role');
  eq(ROAD.roadSlotRequired(slot('handlebar'), {}), true, 'bar required without one');
  eq(ROAD.roadSlotRequired(slot('seatpost'), {}), true, 'rigid post required by default');
  eq(ROAD.roadSlotRequired(slot('seatpost'), { dropper: gp('gdp-pnw-coast-272-60') }), false, 'a picked dropper fills the seat-tube role (compat-gravel.js parity)');
  ['headset', 'bb', 'cockpit', 'bartape', 'dropper', 'pedals'].forEach(function(k){
    eq(ROAD.roadSlotRequired(slot(k), {}), false, k + ' is never required');
  });
});

/* ---- totals ---------------------------------------------------------------------- */
test('roadBuildTotals sums price/weight and flags a missing weight', function(){
  var t = ROAD.roadBuildTotals({ frame: rp('fr-specialized-sworks-tarmac-sl8'), fork: rp('fk-specialized-tarmac-sl8') });
  eq(t.price, 4700 + 450, 'price sum');
  eq(t.weight, 685 + 370, 'weight sum');
  eq(t.missingWeight, false, 'both weights known');
  var t2 = ROAD.roadBuildTotals({ rearDerailleur: rp('rd-sram-red-axs') });
  eq(t2.missingWeight, true, 'the RED AXS rear derailleur row honestly omits weight');
});
