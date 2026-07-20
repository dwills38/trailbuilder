'use strict';
/* =============================================================================
   Gravel engine tests — checkGravelBuild (src/compat-gravel.js, OFF-LIVE).
   Every rule of ROAD-GRAVEL-COMPAT-ANALYSIS.md §1 as shipped for gravel:
   fires when tripped, stays silent when compatible, and every sourced-data-
   gated check (frame maxRotorR, fork maxTire, frame udh, rim-brake family,
   the no-fork-travel-rule decision) has a DORMANCY negative proving silence
   without data — the project bar (a missing rule beats a wrong one, and a
   dormant rule must be provably dormant).
   ========================================================================== */
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok, some = U.some;
var G = require('../src/compat-gravel.js');
var DATA = require('../data/gravel.js');

/** @param {string} id @returns {any} */
function gp(id){
  var p = DATA.GRAVEL_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown gravel part id: ' + id);
  return p;
}
/** @param {any} r @param {string} ruleId @returns {any[]} */
function of(r, ruleId){
  return r.errors.concat(r.warnings).concat(r.infos).filter(function(/** @type {any} */ v){ return v.ruleId === ruleId; });
}
/** @param {string} id @param {Object.<string, any>} tweaks @returns {any} */
function synth(id, tweaks){
  return /** @type {any} */ (Object.assign({}, gp(id), tweaks));
}

/* ---- result shape shares the MTB verdict contract ------------------------ */
test('checkGravelBuild returns the shared structured-verdict shape', function(){
  var r = G.checkGravelBuild({ frame: gp('gfr-specialized-crux-comp-carbon'), fork: gp('gfk-cannondale-lefty-oliver-30'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  ok(Array.isArray(r.errors) && Array.isArray(r.warnings) && Array.isArray(r.infos), 'result shape');
  var all = r.errors.concat(r.warnings).concat(r.infos);
  ok(all.length > 0, 'the Lefty/12x100 build must produce at least one verdict to shape-check');
  all.forEach(function(v){
    ok(typeof v.ruleId === 'string' && Array.isArray(v.slots) && typeof v.msg === 'string', 'verdict fields');
    eq(String(v), v.msg, 'toString is the message');
    ok(String(v).indexOf('undefined') < 0, 'clean message: ' + v);
    ok(v.ruleId.indexOf('rg-') === 0, 'gravel ruleIds are the shared rg-* ids, never MTB ids');
  });
});

test('a build of id strings throws (the silent-false-all-clear guard)', function(){
  var threw = false;
  try { G.checkGravelBuild(/** @type {any} */ ({ frame: 'gfr-specialized-crux-comp-carbon' })); }
  catch(e){ threw = true; }
  ok(threw, 'string slots must throw, never silently pass');
});

/* ---- R1 rg-wheel-size ----------------------------------------------------- */
test('rg-wheel-size errors a mixed 700c/650B pair and stays silent on a matched one', function(){
  var r = G.checkGravelBuild({ frontWheel: gp('gfw-hunt-adventurewide-650b'), rearWheel: gp('grw-dtswiss-g1800-700c') });
  eq(of(r, 'rg-wheel-size').length, 1, 'fires on 650b front / 700c rear');
  var r2 = G.checkGravelBuild({ frontWheel: gp('gfw-dtswiss-g1800-700c'), rearWheel: gp('grw-dtswiss-g1800-700c'),
    frontTire: gp('gti-wtb-byway-700x40'), rearTire: gp('gti-wtb-byway-700x40') });
  eq(of(r2, 'rg-wheel-size').length, 0, 'silent on a matched 700c set');
});
test('rg-wheel-size errors a 650B set on a 700c-only frame, silent on a both-sizes frame', function(){
  var b650 = { frontWheel: gp('gfw-hunt-adventurewide-650b'), rearWheel: gp('grw-hunt-adventurewide-650b'),
    frontTire: gp('gti-wtb-byway-650bx47'), rearTire: gp('gti-wtb-byway-650bx47') };
  var r = G.checkGravelBuild(Object.assign({ frame: gp('gfr-trek-checkpoint-alr-5') }, b650));   // wheelSizes ['700c']
  eq(of(r, 'rg-wheel-size').length, 1, '700c-only frame rejects the 650B set');
  var r2 = G.checkGravelBuild(Object.assign({ frame: gp('gfr-specialized-crux-comp-carbon') }, b650)); // supports both
  eq(of(r2, 'rg-wheel-size').length, 0, 'a 700c+650B frame accepts the 650B set');
});
test('rg-wheel-size errors when the fork does not take the build size', function(){
  var fork700 = synth('gfk-specialized-crux-carbon-rigid', { id: 'gfk-synth-700-only', wheel: ['700c'] });
  var r = G.checkGravelBuild({ fork: fork700, frontWheel: gp('gfw-hunt-adventurewide-650b'), rearWheel: gp('grw-hunt-adventurewide-650b') });
  eq(of(r, 'rg-wheel-size').length, 1, '700c-only fork rejects 650B wheels');
});

/* ---- R2/R3 axles ----------------------------------------------------------- */
test('rg-front-axle: the Lefty proprietary axle honestly errors a generic 12x100 hub', function(){
  var r = G.checkGravelBuild({ fork: gp('gfk-cannondale-lefty-oliver-30'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-front-axle'; }).length, 1);
  var r2 = G.checkGravelBuild({ fork: gp('gfk-specialized-crux-carbon-rigid'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  eq(of(r2, 'rg-front-axle').length, 0, '12x100 fork on a 12x100 hub is silent');
});
test('rg-rear-axle errors a non-12x142 hub against every current frame', function(){
  var qrWheel = synth('grw-dtswiss-g1800-700c', { id: 'grw-synth-qr130', hub: 'qr130' });
  var r = G.checkGravelBuild({ frame: gp('gfr-specialized-diverge-comp-carbon'), rearWheel: qrWheel });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-rear-axle'; }).length, 1);
  var r2 = G.checkGravelBuild({ frame: gp('gfr-specialized-diverge-comp-carbon'), rearWheel: gp('grw-dtswiss-g1800-700c') });
  eq(of(r2, 'rg-rear-axle').length, 0);
});

/* ---- R4 steerer (armed: all current rows are tapered) ---------------------- */
test('rg-steerer and rg-headset-steerer fire on a synthetic straight steerer, silent on tapered', function(){
  var straightFork = synth('gfk-specialized-crux-carbon-rigid', { id: 'gfk-synth-straight', steerer: 'straight-1-1-8' });
  var r = G.checkGravelBuild({ frame: gp('gfr-specialized-crux-comp-carbon'), fork: straightFork, headset: gp('ghs-canecreek-40-zs44-zs56') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-steerer'; }).length, 1, 'fork vs frame');
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-headset-steerer'; }).length, 1, 'headset vs fork');
  var r2 = G.checkGravelBuild({ frame: gp('gfr-specialized-crux-comp-carbon'), fork: gp('gfk-specialized-crux-carbon-rigid'), headset: gp('ghs-canecreek-40-zs44-zs56') });
  eq(of(r2, 'rg-steerer').length + of(r2, 'rg-headset-steerer').length, 0, 'all-tapered is silent');
});

/* ---- R5 rg-freehub --------------------------------------------------------- */
test('rg-freehub errors a Micro Spline Road cassette on an XDR wheel (exact-match, no adapter tier)', function(){
  var r = G.checkGravelBuild({ cassette: gp('gca-shimano-grx-cs-m7100-1045'), rearWheel: gp('grw-dtswiss-g1800-700c') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-freehub'; }).length, 1);
});
test('rg-freehub silent on matched bodies: XDR-on-XDR and N3W-on-N3W', function(){
  var r = G.checkGravelBuild({ cassette: gp('gca-sram-xg1251-1044'), rearWheel: gp('grw-dtswiss-g1800-700c') });
  eq(of(r, 'rg-freehub').length, 0, 'XDR cassette on XDR driver');
  var r2 = G.checkGravelBuild({ cassette: gp('gca-campagnolo-ekar-942'), rearWheel: gp('grw-campagnolo-levante-700c') });
  eq(of(r2, 'rg-freehub').length, 0, 'Ekar on N3W');
});

/* ---- R6 rg-rd-capacity ----------------------------------------------------- */
test('rg-rd-capacity errors a 45T cassette on a 42T-max derailleur, silent at the exact cap', function(){
  var r = G.checkGravelBuild({ cassette: gp('gca-shimano-grx-cs-m7100-1045'), rearDerailleur: gp('grd-shimano-grx-rd-rx812-1x11') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-rd-capacity'; }).length, 1, '45T > 42T max');
  var r2 = G.checkGravelBuild({ cassette: gp('gca-sram-xg1251-1044'), rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') });
  eq(of(r2, 'rg-rd-capacity').length, 0, '44T on a 44T-max RD is exactly in spec');
});
test('rg-rd-capacity is dormant without a stated maxCog', function(){
  var rdNoCap = synth('grd-sram-rival-xplr-axs-rd', { id: 'grd-synth-nocap', maxCog: undefined });
  delete rdNoCap.maxCog;
  var r = G.checkGravelBuild({ cassette: gp('gca-shimano-grx-cs-m7100-1045'), rearDerailleur: rdNoCap });
  eq(of(r, 'rg-rd-capacity').length, 0, 'no sourced cap -> silent, never guessed');
});

/* ---- R7 rg-rotor-mount (direction-aware, the MTB rule-9 logic) ------------- */
test('a 6-bolt rotor on a Center-Lock hub warns with the named adapter (live on catalog rows)', function(){
  var r = G.checkGravelBuild({ frontRotor: gp('gro-sram-centerline-160-6b'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  var w = r.warnings.filter(function(v){ return v.ruleId === 'rg-rotor-mount'; });
  eq(w.length, 1, 'adapter-tier warning');
  ok(w[0].fix && w[0].fix.kind === 'adapter' && w[0].fix.name === 'Shimano SM-RTAD05', 'structured fix names the adapter');
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-rotor-mount'; }).length, 0, 'never an error in this direction');
});
test('a Center-Lock rotor on a 6-bolt hub is a hard error (no adapter exists)', function(){
  var hub6b = synth('grw-dtswiss-g1800-700c', { id: 'grw-synth-6bolt', rotorMount: '6-bolt' });
  var r = G.checkGravelBuild({ rearRotor: gp('gro-shimano-rt-cl800-160-cl'), rearWheel: hub6b });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-rotor-mount'; }).length, 1);
});
test('rg-rotor-mount silent on a matched interface', function(){
  var r = G.checkGravelBuild({ frontRotor: gp('gro-shimano-rt-cl800-160-cl'), frontWheel: gp('gfw-dtswiss-g1800-700c') });
  eq(of(r, 'rg-rotor-mount').length, 0);
});

/* ---- R8 rg-rotor-size (sourced max only; frame side dormant) --------------- */
test('rg-rotor-size warns past the fork\'s stated max and is silent within it', function(){
  var rotor180 = synth('gro-shimano-rt-cl800-160-cl', { id: 'gro-synth-180', size: 180 });
  var r = G.checkGravelBuild({ frontRotor: rotor180, fork: gp('gfk-specialized-crux-carbon-rigid') });   // maxRotorF 160
  eq(r.warnings.filter(function(v){ return v.ruleId === 'rg-rotor-size'; }).length, 1, '180 > 160 warns');
  var r2 = G.checkGravelBuild({ frontRotor: rotor180, fork: gp('gfk-fairlight-cempa-3-carbon') });        // maxRotorF 180
  eq(of(r2, 'rg-rotor-size').length, 0, '180 on a 180-max fork is silent');
});
test('rg-rotor-size rear side is DORMANT (no frame carries maxRotorR) and activates on a sourced value', function(){
  var rotor200 = synth('gro-shimano-rt-cl800-160-cl', { id: 'gro-synth-200', size: 200 });
  var r = G.checkGravelBuild({ rearRotor: rotor200, frame: gp('gfr-specialized-crux-comp-carbon') });
  eq(of(r, 'rg-rotor-size').length, 0, 'no published frame max -> silent (dormant)');
  var frameMax = synth('gfr-specialized-crux-comp-carbon', { id: 'gfr-synth-rmax', maxRotorR: 160 });
  var r2 = G.checkGravelBuild({ rearRotor: rotor200, frame: frameMax });
  eq(r2.warnings.filter(function(v){ return v.ruleId === 'rg-rotor-size'; }).length, 1, 'sourced max activates the rule');
});

/* ---- R9 tires: frame clearance map + rim max; fork side dormant ------------ */
test('rg-tire-clearance warns a 45mm tire past the Grail\'s published 42mm, silent within the Checkpoint\'s 50mm', function(){
  var r = G.checkGravelBuild({ rearTire: gp('gti-wtb-riddler-700x45'), frame: gp('gfr-canyon-grail-cf-sl') });
  eq(r.warnings.filter(function(v){ return v.ruleId === 'rg-tire-clearance'; }).length, 1);
  var r2 = G.checkGravelBuild({ rearTire: gp('gti-wtb-riddler-700x45'), frame: gp('gfr-trek-checkpoint-sl-7') });
  eq(of(r2, 'rg-tire-clearance').length, 0);
});
test('rg-tire-clearance keys on the tire\'s wheel size and stays dormant for an unpublished size', function(){
  // Checkpoint SL 7 publishes only a 700c max (50); its 650B clearance is unknown -> silent, never guessed.
  var r = G.checkGravelBuild({ rearTire: gp('gti-wtb-byway-650bx47'), frame: gp('gfr-trek-checkpoint-sl-7') });
  eq(of(r, 'rg-tire-clearance').length, 0, 'no published 650B number -> dormant');
  // The Topstone publishes 650b:47 -> a 47mm 650B tire is exactly in spec (silent), 53mm synthetic warns.
  var r2 = G.checkGravelBuild({ rearTire: gp('gti-wtb-byway-650bx47'), frame: gp('gfr-cannondale-topstone-carbon-4') });
  eq(of(r2, 'rg-tire-clearance').length, 0, '47 on a 47 max is in spec');
  var wide650 = synth('gti-wtb-byway-650bx47', { id: 'gti-synth-650x53', width: 53 });
  var r3 = G.checkGravelBuild({ rearTire: wide650, frame: gp('gfr-cannondale-topstone-carbon-4') });
  eq(r3.warnings.filter(function(v){ return v.ruleId === 'rg-tire-clearance'; }).length, 1, '53 > 47 warns');
});
test('rg-tire-rim warns past a wheel\'s published max on both ends, silent within it', function(){
  var r = G.checkGravelBuild({ rearTire: gp('gti-wtb-byway-650bx47'), rearWheel: synth('grw-zipp-303-s-700c', { id: 'grw-synth-zipp-650', wheel: '650b' }) }); // maxTire 45
  eq(r.warnings.filter(function(v){ return v.ruleId === 'rg-tire-rim'; }).length, 1, '47 > 45 rim max');
  var r2 = G.checkGravelBuild({ frontTire: gp('gti-wtb-riddler-700x45'), frontWheel: gp('gfw-dtswiss-g1800-700c') });   // maxTire 50
  eq(of(r2, 'rg-tire-rim').length, 0);
});
test('rg-tire-fork is DORMANT (no gravel fork publishes maxTire) and activates on a sourced value', function(){
  var r = G.checkGravelBuild({ frontTire: gp('gti-wtb-riddler-700x45'), fork: gp('gfk-specialized-crux-carbon-rigid') });
  eq(of(r, 'rg-tire-fork').length, 0, 'dormant without data');
  var forkMax = synth('gfk-specialized-crux-carbon-rigid', { id: 'gfk-synth-maxtire', maxTire: 42 });
  var r2 = G.checkGravelBuild({ frontTire: gp('gti-wtb-riddler-700x45'), fork: forkMax });
  eq(r2.warnings.filter(function(v){ return v.ruleId === 'rg-tire-fork'; }).length, 1, 'sourced fork max activates');
});

/* ---- R10 rg-bar-clamp ------------------------------------------------------ */
test('rg-bar-clamp errors a clamp mismatch and is silent on a match', function(){
  var stem35 = synth('gst-zipp-scsl-100', { id: 'gst-synth-35', clamp: '35' });
  var r = G.checkGravelBuild({ handlebar: gp('ghb-salsa-cowbell-318'), stem: stem35 });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-bar-clamp'; }).length, 1);
  var r2 = G.checkGravelBuild({ handlebar: gp('ghb-salsa-cowbell-318'), stem: gp('gst-zipp-scsl-100') });
  eq(of(r2, 'rg-bar-clamp').length, 0);
});

/* ---- R11 rg-bb ------------------------------------------------------------- */
test('rg-bb-shell errors a T47 BB in a BSA frame; rg-bb-spindle errors a Hollowtech BB under a DUB crank', function(){
  var r = G.checkGravelBuild({ bb: gp('gbb-praxis-t47'), frame: gp('gfr-specialized-diverge-comp-carbon') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-bb-shell'; }).length, 1);
  var r2 = G.checkGravelBuild({ bb: gp('gbb-shimano-sm-bb72-bsa'), crankset: gp('gcr-sram-rival-xplr-axs-1x') });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-bb-spindle'; }).length, 1);
});
test('a matching BB is silent; no BB -> advisory info only (never an error)', function(){
  var r = G.checkGravelBuild({ frame: gp('gfr-specialized-diverge-comp-carbon'), crankset: gp('gcr-sram-rival-xplr-axs-1x'), bb: gp('gbb-sram-dub-bsa') });
  eq(of(r, 'rg-bb-shell').length + of(r, 'rg-bb-spindle').length + of(r, 'rg-bb-advisory').length, 0, 'matched BB is fully silent');
  var r2 = G.checkGravelBuild({ frame: gp('gfr-specialized-diverge-comp-carbon'), crankset: gp('gcr-sram-rival-xplr-axs-1x') });
  eq(of(r2, 'rg-bb-advisory').length, 1, 'BB-less build gets the nudge');
  eq(r2.errors.length, 0, 'the nudge is an info');
});

/* ---- R12 rg-seatpost (direction-aware, dropper shares the rule) ------------ */
test('a 27.2 post in the Hakka\'s 31.6 tube warns with a shim fix; a 31.6 post in a 27.2 tube errors', function(){
  var r = G.checkGravelBuild({ seatpost: gp('gsp-zipp-scsl-272'), frame: gp('gfr-ibis-hakka-mx') });
  var w = r.warnings.filter(function(v){ return v.ruleId === 'rg-seatpost'; });
  eq(w.length, 1, 'smaller post -> shim warning');
  ok(w[0].fix && w[0].fix.kind === 'adapter', 'shim is a structured fix');
  var post316 = synth('gsp-zipp-scsl-272', { id: 'gsp-synth-316', diameter: '31.6' });
  var r2 = G.checkGravelBuild({ seatpost: post316, frame: gp('gfr-specialized-diverge-comp-carbon') });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-seatpost'; }).length, 1, 'bigger post -> error');
  var r3 = G.checkGravelBuild({ seatpost: gp('gsp-zipp-scsl-272'), frame: gp('gfr-specialized-diverge-comp-carbon') });
  eq(of(r3, 'rg-seatpost').length, 0, 'matched diameter is silent');
});
test('the dropper slot gets the same direction-aware diameter check', function(){
  var r = G.checkGravelBuild({ dropper: gp('gdp-pnw-coast-272-60'), frame: gp('gfr-ibis-hakka-mx') });
  eq(r.warnings.filter(function(v){ return v.ruleId === 'rg-seatpost' && v.slots.indexOf('dropper') >= 0; }).length, 1);
  var r2 = G.checkGravelBuild({ dropper: gp('gdp-pnw-coast-272-60'), frame: gp('gfr-specialized-diverge-comp-carbon') });
  eq(of(r2, 'rg-seatpost').length, 0);
});

/* ---- R13 one system / one speed + the AXS-controller exemption ------------- */
test('rg-drivetrain-system errors a GRX shifter over an XPLR derailleur', function(){
  var r = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx820-1x12'), rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-drivetrain-system'; }).length, 1);
});
test('rg-drivetrain-speeds errors a same-system speed mismatch (chain and crank stay excluded)', function(){
  var rd13 = synth('grd-sram-red-xplr-axs-rd', { id: 'grd-synth', system: 'sram-xplr-12', speeds: 13 });
  var r = G.checkGravelBuild({ rearDerailleur: rd13, cassette: gp('gca-sram-xg1251-1044') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-drivetrain-speeds'; }).length, 1, '13s RD vs 12s cassette');
  // chain speeds NEVER enter the pool: a 12s flattop chain beside a 13s Ekar-free SRAM 13 set raises no speed error
  var r2 = G.checkGravelBuild({ rearDerailleur: gp('grd-sram-red-xplr-axs-rd'), cassette: gp('gca-sram-xg1391-1046'), chain: gp('gch-sram-xplr-flattop-12') });
  eq(of(r2, 'rg-drivetrain-speeds').length, 0, 'chain excluded from the speed pool ([MECHANIC REVIEW] flag in the engine)');
});
test('the AXS-controller exemption: a 12s SRAM AXS brifter legally drives the 13s XPLR ecosystem', function(){
  var r = G.checkGravelBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), rearDerailleur: gp('grd-sram-red-xplr-axs-rd'), cassette: gp('gca-sram-xg1391-1046') });
  eq(of(r, 'rg-drivetrain-system').length, 0, 'SRAM-documented: all AXS controllers drive all AXS derailleurs');
  eq(of(r, 'rg-drivetrain-speeds').length, 0, 'the controller is speed-agnostic');
});
test('the exemption never crosses brands: an AXS controller on a Shimano drivetrain stays an error', function(){
  var r = G.checkGravelBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), rearDerailleur: gp('grd-shimano-grx-rd-rx822-1x12'), cassette: gp('gca-shimano-grx-cs-m7100-1045') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-drivetrain-system'; }).length, 1);
});

/* ---- R14 rg-actuation ------------------------------------------------------ */
test('rg-actuation errors a mechanical brifter over a wireless derailleur, silent on a match', function(){
  var r = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx820-1x12'), rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-actuation'; }).length, 1);
  var r2 = G.checkGravelBuild({ shifter: gp('gsft-sram-apex-xplr-mech'), rearDerailleur: gp('grd-sram-apex-xplr-rd') });
  eq(of(r2, 'rg-actuation').length, 0);
});

/* ---- R15 rg-chain-std ------------------------------------------------------ */
test('rg-chain-std errors an HG chain on an XPLR drivetrain and a Flattop chain on GRX', function(){
  var r = G.checkGravelBuild({ chain: gp('gch-shimano-cn-m6100-12'), rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-chain-std'; }).length, 1, 'HG on Flattop-only');
  var r2 = G.checkGravelBuild({ chain: gp('gch-sram-xplr-flattop-12'), rearDerailleur: gp('grd-shimano-grx-rd-rx822-1x12') });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-chain-std'; }).length, 1, 'Flattop on HG-only');
});
test('rg-chain-std silent on the documented chain per system (all three families)', function(){
  eq(of(G.checkGravelBuild({ chain: gp('gch-sram-xplr-flattop-12'), rearDerailleur: gp('grd-sram-rival-xplr-axs-rd') }), 'rg-chain-std').length, 0, 'Flattop + XPLR');
  eq(of(G.checkGravelBuild({ chain: gp('gch-shimano-cn-m6100-12'), rearDerailleur: gp('grd-shimano-grx-rd-rx822-1x12') }), 'rg-chain-std').length, 0, 'HG + GRX');
  eq(of(G.checkGravelBuild({ chain: gp('gch-campagnolo-ekar-13'), rearDerailleur: gp('grd-campagnolo-ekar-rd') }), 'rg-chain-std').length, 0, 'Campag + Ekar');
});
test('rg-chain-std falls back to the cassette when no RD is picked', function(){
  var r = G.checkGravelBuild({ chain: gp('gch-shimano-cn-m6100-12'), cassette: gp('gca-sram-xg1251-1044') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-chain-std'; }).length, 1);
});

/* ---- R16 1x/2x definitional halves ----------------------------------------- */
test('rg-2x-system errors a 1x control over a 2x crank and over a front derailleur', function(){
  var r = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx820-1x12'), crankset: gp('gcr-shimano-grx-fc-rx610-2x') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-2x-system'; }).length, 1, '1x control, 2x crank');
  var r2 = G.checkGravelBuild({ shifter: gp('gsft-sram-rival-xplr-axs'), frontDerailleur: gp('gfd-sram-force-axs-fd') });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-2x-system'; }).length, 1, '1x control cannot actuate an FD');
});
test('a real 2x pairing is silent on rg-2x-system; a 2x crank with no FD gets the advisory info', function(){
  var r = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx600-2x11'), crankset: gp('gcr-shimano-grx-fc-rx610-2x'), frontDerailleur: gp('gfd-shimano-grx-fd-rx600-2x') });
  eq(of(r, 'rg-2x-system').length, 0, 'front-shift control + FD + 2x crank');
  var r2 = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx600-2x11'), crankset: gp('gcr-shimano-grx-fc-rx610-2x') });
  eq(of(r2, 'rg-fd-advisory').length, 1, 'pick-an-FD nudge');
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-2x-system'; }).length, 0, 'the nudge is not an error');
});
test('rg-fd-mount errors a front derailleur on a 1x-only (no-mount) frame, silent on a braze-on frame', function(){
  var r = G.checkGravelBuild({ frontDerailleur: gp('gfd-shimano-grx-fd-rx810-2x'), frame: gp('gfr-specialized-crux-comp-carbon') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-fd-mount'; }).length, 1, 'Crux has frontDerailleurMount none');
  var r2 = G.checkGravelBuild({ frontDerailleur: gp('gfd-shimano-grx-fd-rx810-2x'), frame: gp('gfr-specialized-diverge-comp-carbon') });
  eq(of(r2, 'rg-fd-mount').length, 0, 'braze-on frame accepts the FD');
});

/* ---- R17 rg-brake-system (family guard, armed-dormant) --------------------- */
test('rg-brake-system stays silent across today\'s all-disc catalog tokens (family classification, not exact match)', function(){
  var r = G.checkGravelBuild({ frame: gp('gfr-specialized-diverge-comp-carbon'), fork: gp('gfk-specialized-crux-carbon-rigid'),
    frontWheel: gp('gfw-dtswiss-g1800-700c'), rearWheel: gp('grw-dtswiss-g1800-700c'),
    shifter: gp('gsft-sram-rival-xplr-axs'), frontBrake: gp('gbr-sram-rival-axs-brake'), rearBrake: gp('gbr-sram-rival-axs-brake') });
  eq(of(r, 'rg-brake-system').length, 0, 'disc-flat / disc / disc-hydraulic are ONE family');
});
test('rg-brake-system fires the moment a rim-family part enters (armed, not dead)', function(){
  var rimWheel = synth('grw-dtswiss-g1800-700c', { id: 'grw-synth-rim', brakeSystem: 'rim' });
  var r = G.checkGravelBuild({ frame: gp('gfr-specialized-diverge-comp-carbon'), rearWheel: rimWheel });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-brake-system'; }).length, 1);
});

/* ---- R18 rg-brake-mount ---------------------------------------------------- */
test('rg-brake-mount errors a non-flat-mount caliper against today\'s flat-mount frames/forks', function(){
  var pmCal = synth('gbr-shimano-grx-br-rx820', { id: 'gbr-synth-pm', mount: 'post-mount' });
  var r = G.checkGravelBuild({ frontBrake: pmCal, fork: gp('gfk-specialized-crux-carbon-rigid') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-brake-mount'; }).length, 1, 'front');
  var r2 = G.checkGravelBuild({ rearBrake: pmCal, frame: gp('gfr-specialized-diverge-comp-carbon') });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-brake-mount'; }).length, 1, 'rear');
  var r3 = G.checkGravelBuild({ frontBrake: gp('gbr-shimano-grx-br-rx820'), fork: gp('gfk-specialized-crux-carbon-rigid') });
  eq(of(r3, 'rg-brake-mount').length, 0, 'flat-mount on flat-mount is silent');
});

/* ---- R19 rg-brifter-brake (definitional halves only) ----------------------- */
test('rg-brifter-brake errors a hydraulic caliper under a non-hydraulic lever and vice versa', function(){
  var mechLever = synth('gsft-sram-apex-xplr-mech', { id: 'gsft-synth-mechdisc', brakeSystem: 'disc-mechanical' });
  var r = G.checkGravelBuild({ shifter: mechLever, frontBrake: gp('gbr-shimano-grx-br-rx820') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-brifter-brake'; }).length, 1, 'cable lever cannot push fluid');
  var cableCal = synth('gbr-shimano-grx-br-rx820', { id: 'gbr-synth-cable', actuation: 'mechanical' });
  var r2 = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx820-1x12'), rearBrake: cableCal });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-brifter-brake'; }).length, 1, 'hydraulic lever has no cable to pull');
  var r3 = G.checkGravelBuild({ shifter: gp('gsft-shimano-grx-rx820-1x12'), frontBrake: gp('gbr-shimano-grx-br-rx820') });
  eq(of(r3, 'rg-brifter-brake').length, 0, 'hydraulic lever + hydraulic caliper is silent');
});

/* ---- R20 rg-xplr-udh (error dormant; infos live) --------------------------- */
test('rg-xplr-udh: unknown frame UDH status -> INFO never an error; explicit udh:false -> ERROR; frameless -> INFO', function(){
  var r = G.checkGravelBuild({ rearDerailleur: gp('grd-sram-red-xplr-axs-rd'), frame: gp('gfr-trek-checkpoint-sl-7') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'rg-xplr-udh'; }).length, 0, 'unknown status must NEVER hard-error (real UDH frames exist)');
  eq(r.infos.filter(function(v){ return v.ruleId === 'rg-xplr-udh'; }).length, 1, 'honest confirm-UDH nudge');
  var noUdh = synth('gfr-trek-checkpoint-sl-7', { id: 'gfr-synth-noudh', udh: false });
  var r2 = G.checkGravelBuild({ rearDerailleur: gp('grd-sram-red-xplr-axs-rd'), frame: noUdh });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'rg-xplr-udh'; }).length, 1, 'sourced udh:false activates the error');
  var r3 = G.checkGravelBuild({ rearDerailleur: gp('grd-sram-red-xplr-axs-rd') });
  eq(r3.infos.filter(function(v){ return v.ruleId === 'rg-xplr-udh'; }).length, 1, 'frameless convention: info');
});
test('rg-xplr-udh ignores standard-hanger derailleurs entirely', function(){
  var r = G.checkGravelBuild({ rearDerailleur: gp('grd-sram-rival-xplr-axs-rd'), frame: gp('gfr-trek-checkpoint-sl-7') });
  eq(of(r, 'rg-xplr-udh').length, 0);
});

/* ---- the deliberate NON-rule: suspension-fork travel ----------------------- */
test('a suspension gravel fork raises NO travel verdict on any frame (Douglas\'s dormant-by-design decision)', function(){
  var r = G.checkGravelBuild({ fork: gp('gfk-rockshox-rudy-ultimate-xplr-40'), frame: gp('gfr-specialized-diverge-comp-carbon') });
  var travelVerdicts = r.errors.concat(r.warnings).concat(r.infos).filter(function(v){ return /travel/i.test(v.ruleId) || /travel/i.test(v.msg); });
  eq(travelVerdicts.length, 0, 'no fork-travel rule exists — gravel frames publish no rated max');
});

/* ---- completeness (gravelSlotRequired) + totals ---------------------------- */
test('gravelSlotRequired: static optionality + the dropper-fills-the-seatpost drop', function(){
  /** @param {string} key @returns {any} */
  function slot(key){
    var s = G.GRAVEL_SLOTS.filter(function(x){ return x.key === key; })[0];
    if(!s) throw new Error('unknown slot ' + key);
    return s;
  }
  ['frontDerailleur', 'bb', 'headset', 'bartape', 'dropper', 'pedals'].forEach(function(k){
    eq(G.gravelSlotRequired(slot(k), {}), false, k + ' is optional');
  });
  ['frame', 'fork', 'shifter', 'rearDerailleur', 'cassette', 'chain', 'crankset', 'seatpost',
   'frontBrake', 'rearBrake', 'frontRotor', 'rearRotor', 'frontWheel', 'rearWheel'].forEach(function(k){
    eq(G.gravelSlotRequired(slot(k), {}), true, k + ' is required');
  });
  eq(G.gravelSlotRequired(slot('seatpost'), { dropper: gp('gdp-pnw-coast-272-60') }), false,
    'a picked dropper fills the seat-tube role');
});
test('gravelBuildTotals sums price/weight and flags missing weights', function(){
  var t = G.gravelBuildTotals({ frame: gp('gfr-specialized-crux-comp-carbon'), stem: gp('gst-zipp-scsl-100') });
  eq(t.price, 4200 + 90);
  eq(t.weight, 900 + 135);
  eq(t.missingWeight, false);
  var noW = synth('gst-zipp-scsl-100', { id: 'gst-synth-now', weight: undefined });
  delete noW.weight;
  eq(G.gravelBuildTotals({ stem: noW }).missingWeight, true);
});

/* ---- engine fortress: never throws on any single catalog part -------------- */
test('checkGravelBuild never throws with any single catalog part in its natural slot', function(){
  /** @type {Object.<string, string>} */
  var slotByCat = { frame:'frame', fork:'fork', frontwheel:'frontWheel', rearwheel:'rearWheel', tire:'rearTire',
    shifter:'shifter', derailleur:'rearDerailleur', cassette:'cassette', chain:'chain', crankset:'crankset',
    bb:'bb', headset:'headset', brake:'rearBrake', rotor:'rearRotor', handlebar:'handlebar', stem:'stem',
    seatpost:'seatpost', dropper:'dropper', saddle:'saddle', pedal:'pedals', bartape:'bartape' };
  DATA.GRAVEL_PARTS.forEach(function(/** @type {any} */ p){
    var slotKey = slotByCat[p.cat];
    ok(!!slotKey, 'every catalog category maps to a slot: ' + p.cat);
    /** @type {Object.<string, any>} */ var b = {};
    b[slotKey] = p;
    var r = G.checkGravelBuild(b);
    ok(Array.isArray(r.errors) && Array.isArray(r.warnings) && Array.isArray(r.infos), 'well-formed for ' + p.id);
  });
});
