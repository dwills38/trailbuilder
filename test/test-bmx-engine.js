'use strict';
/* =============================================================================
   BMX engine tests — checkBmxBuild (src/compat-bmx.js, OFF-LIVE).
   Every rule of data/DJ-BMX-COMPAT-ANALYSIS.md section 2a: fires when tripped,
   stays silent when compatible, and the sourced-data-gated checks (gyro tabs,
   dual-cable, tire clearance) stay DORMANT without their fields — negative
   tests prove the dormancy, per the project bar.
   ========================================================================== */
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok, some = U.some;
var BMX = require('../src/compat-bmx.js');
var DATA = require('../data/bmx.js');

/** @param {string} id @returns {any} */
function bp(id){
  var p = DATA.BMX_PARTS.filter(function(x){ return x.id === id; })[0];
  if(!p) throw new Error('unknown BMX part id: ' + id);
  return p;
}
/** @param {any} r @param {string} ruleId @returns {any[]} */
function of(r, ruleId){
  return r.errors.concat(r.warnings).concat(r.infos).filter(function(/** @type {any} */ v){ return v.ruleId === ruleId; });
}

/* ---- result shape shares the MTB verdict contract ------------------------ */
test('checkBmxBuild returns the shared structured-verdict shape', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams') });
  ok(Array.isArray(r.errors) && Array.isArray(r.warnings) && Array.isArray(r.infos), 'result shape');
  var all = r.errors.concat(r.warnings).concat(r.infos);
  all.forEach(function(v){
    ok(typeof v.ruleId === 'string' && Array.isArray(v.slots) && typeof v.msg === 'string', 'verdict fields');
    eq(String(v), v.msg, 'toString is the message');
    ok(String(v).indexOf('undefined') < 0, 'clean message: ' + v);
  });
});

test('a build of id strings throws (the silent-false-all-clear guard)', function(){
  var threw = false;
  try { BMX.checkBmxBuild(/** @type {any} */ ({ frame: 'bmx-fr-kink-williams' })); }
  catch(e){ threw = true; }
  ok(threw, 'string slots must throw, never silently pass');
});

/* ---- BMX-7 wheel size ----------------------------------------------------- */
test('bmx-wheel-size errors on a mixed-size build and stays silent on a matched one', function(){
  var tire24 = /** @type {any} */ (Object.assign({}, bp('bmx-ti-odyssey-pathpro-225'), { id:'bmx-ti-synthetic-24', wheelSize:'24' }));
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), frontTire: tire24 });
  eq(of(r, 'bmx-wheel-size').length, 1, 'fires on 20 vs 24');
  var r2 = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), fork: bp('bmx-fk-odyssey-r32'), frontTire: bp('bmx-ti-odyssey-pathpro-225') });
  eq(of(r2, 'bmx-wheel-size').length, 0, 'silent when everything is 20in');
});

/* ---- BMX-1 BB shell x spindle (via a purchasable BB, the rule-7 pattern) -- */
test('bmx-bb-shell errors a Euro BB in a Mid frame', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), bb: bp('bmx-bb-profile-euro-22') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-bb-shell'; }).length, 1);
});
test('bmx-bb-spindle errors a 19mm BB under a 22mm crank', function(){
  var r = BMX.checkBmxBuild({ bb: bp('bmx-bb-salt-mid-19'), cranks: bp('bmx-cr-odyssey-calibre') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-bb-spindle'; }).length, 1);
});
test('a matching shell+spindle BB is silent; no BB -> advisory info only', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-wethepeople-justice'), cranks: bp('bmx-cr-profile-race'), bb: bp('bmx-bb-salt-mid-19') });
  eq(r.errors.length, 0, 'mid shell + 19mm spindle + Mid-19 BB fits');
  eq(of(r, 'bmx-bb-advisory').length, 0, 'no advisory once a BB is picked');
  var r2 = BMX.checkBmxBuild({ frame: bp('bmx-fr-wethepeople-justice'), cranks: bp('bmx-cr-profile-race') });
  eq(of(r2, 'bmx-bb-advisory').length, 1, 'BB-less build gets the bearing-kit nudge');
  eq(r2.errors.length, 0, 'the nudge is an info, never an error - no shell x spindle matrix guessing');
});

/* ---- BMX-2 crank piece-count ---------------------------------------------- */
test('a 1-piece (Ashtabula) crank errors in a non-American shell', function(){
  var onePiece = /** @type {any} */ (Object.assign({}, bp('bmx-cr-profile-race'), { id:'bmx-cr-synthetic-1pc', pieces:'1-piece' }));
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), cranks: onePiece });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-crank-pieces'; }).length, 1);
});
test('a 3-piece crank in an American shell warns with the conversion-BB fix - unless the conversion BB is picked', function(){
  var american = /** @type {any} */ (Object.assign({}, bp('bmx-fr-kink-williams'), { id:'bmx-fr-synthetic-american', bbShell:'american' }));
  var r = BMX.checkBmxBuild({ frame: american, cranks: bp('bmx-cr-profile-race') });
  var w = r.warnings.filter(function(v){ return v.ruleId === 'bmx-crank-pieces'; });
  eq(w.length, 1, 'adapter-tier warning');
  ok(w[0].fix && w[0].fix.kind === 'adapter', 'carries the structured conversion-BB fix');
  var r2 = BMX.checkBmxBuild({ frame: american, cranks: bp('bmx-cr-profile-race'), bb: bp('bmx-bb-odyssey-american') });
  eq(r2.warnings.filter(function(v){ return v.ruleId === 'bmx-crank-pieces'; }).length, 0, 'the picked American 19mm conversion BB IS the fix');
  eq(r2.errors.length, 0, 'and its own shell/spindle interfaces check clean');
});

/* ---- BMX-3 chain pitch ----------------------------------------------------- */
test('bmx-chain-pitch warns on a 1/8 sprocket with a 3/32 chain (provisional warning tier)', function(){
  var raceChain = /** @type {any} */ (Object.assign({}, bp('bmx-ch-kmc-z410'), { id:'bmx-ch-synthetic-332', pitch:'3/32' }));
  var r = BMX.checkBmxBuild({ sprocket: bp('bmx-sp-profile-race-25'), chain: raceChain });
  eq(r.errors.length, 0, 'warning, never an error');
  eq(r.warnings.filter(function(v){ return v.ruleId === 'bmx-chain-pitch'; }).length, 1);
});
test('bmx-chain-pitch is silent on an all-1/8 drivetrain', function(){
  var r = BMX.checkBmxBuild({ sprocket: bp('bmx-sp-profile-race-25'), chain: bp('bmx-ch-kmc-z410'), rearCog: bp('bmx-rc-cult-cassette-9') });
  eq(of(r, 'bmx-chain-pitch').length, 0);
});

/* ---- BMX-3b cog vs driver --------------------------------------------------- */
test('a freecoaster cog errors on a cassette hub (body-specific, maker-documented)', function(){
  var r = BMX.checkBmxBuild({ rearCog: bp('bmx-rc-profile-freecoaster-10'), rearWheel: bp('bmx-rh-cult-matchv2') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-cog-driver'; }).length, 1);
});
test('freecoaster vs cassette is a PREFERENCE info, never a conflict (Q5 lean)', function(){
  var r = BMX.checkBmxBuild({ rearWheel: bp('bmx-rh-odyssey-clutchv2'), rearCog: bp('bmx-rc-profile-freecoaster-10') });
  eq(r.errors.length, 0, 'matching freecoaster cog + hub fits');
  eq(of(r, 'bmx-freecoaster').length, 1, 'the rider-preference note is an info');
});

/* ---- BMX-4 peg bore vs axle (direction-aware) ------------------------------- */
test('a 10mm-bore peg on a 14mm axle is an error (will not slide over)', function(){
  var peg10 = /** @type {any} */ (Object.assign({}, bp('bmx-pg-cult-alloy'), { id:'bmx-pg-synthetic-10', axleFit:'10mm' }));
  var r = BMX.checkBmxBuild({ pegsRear: peg10, rearWheel: bp('bmx-rh-cult-matchv2') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-peg-axle'; }).length, 1);
});
test('a 14mm peg on a 10mm front axle warns with the reducer-sleeve fix', function(){
  // bmx-pg-bsd-superstar (14mm, reducerIncluded:false) - swapped 2026-07-17 off the
  // Odyssey MPEGs row after verification found MPEGs actually SHIPS its reducer
  // (shop.odysseybmx.com), which downgrades this scenario to an info (see the next test).
  var r = BMX.checkBmxBuild({ pegsFront: bp('bmx-pg-bsd-superstar'), frontWheel: bp('bmx-fw-odyssey-vandero') });
  var w = r.warnings.filter(function(v){ return v.ruleId === 'bmx-peg-axle'; });
  eq(w.length, 1);
  ok(w[0].fix && w[0].fix.kind === 'adapter', 'structured reducer-sleeve fix');
});
test('a 14mm peg that SHIPS its reducer downgrades to an info', function(){
  var r = BMX.checkBmxBuild({ pegsFront: bp('bmx-pg-fit-universal'), frontWheel: bp('bmx-fw-odyssey-vandero') });
  eq(r.warnings.length, 0);
  eq(r.infos.filter(function(v){ return v.ruleId === 'bmx-peg-axle'; }).length, 1, 'included reducer = info, not warning');
});
test('matching peg and axle diameters are silent', function(){
  var r = BMX.checkBmxBuild({ pegsRear: bp('bmx-pg-odyssey-grandstand-14'), rearWheel: bp('bmx-rh-cult-matchv2') });
  eq(of(r, 'bmx-peg-axle').length, 0);
});

/* ---- BMX-5 gyro: dormant tabs/dual-cable checks + live brakeless info ------- */
test('gyro tab + dual-cable checks fire ONLY on explicit sourced negatives', function(){
  var noTabs = /** @type {any} */ (Object.assign({}, bp('bmx-fr-kink-williams'), { id:'bmx-fr-synthetic-notabs', gyroTabs:false }));
  var r = BMX.checkBmxBuild({ gyro: bp('bmx-gy-odyssey-g3kit'), frame: noTabs, rearBrake: bp('bmx-br-diacompe-990') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-gyro-tabs'; }).length, 1, 'maker-stated no-tabs frame errors');
  var singleCable = /** @type {any} */ (Object.assign({}, bp('bmx-br-diacompe-990'), { id:'bmx-br-synthetic-single', dualCable:false }));
  var r2 = BMX.checkBmxBuild({ gyro: bp('bmx-gy-odyssey-g3kit'), frame: bp('bmx-fr-kink-williams'), rearBrake: singleCable });
  eq(r2.errors.filter(function(v){ return v.ruleId === 'bmx-gyro-cable'; }).length, 1, 'maker-stated single-cable brake errors');
});
test('gyro checks stay DORMANT without the sourced fields (absence = unknown)', function(){
  var r = BMX.checkBmxBuild({ gyro: bp('bmx-gy-odyssey-g3kit'), frame: bp('bmx-fr-kink-williams'), rearBrake: bp('bmx-br-diacompe-990') });
  eq(r.errors.length, 0, 'no gyroTabs/dualCable field anywhere in the dataset -> silent, never guessed');
});
test('a gyro on a brakeless build gets the no-gyro-needed info', function(){
  var r = BMX.checkBmxBuild({ gyro: bp('bmx-gy-odyssey-gtxs'), frame: bp('bmx-fr-colony-sweettooth') });
  eq(of(r, 'bmx-gyro-brakeless').length, 1);
  eq(r.errors.length, 0);
});

/* ---- BMX-6 brake vs bosses --------------------------------------------------- */
test('a U-brake errors on a V-brake race frame', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-redline-proline'), rearBrake: bp('bmx-br-diacompe-990') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-rear-brake-mount'; }).length, 1);
});
test('any brake errors on a bossless (brakeless-only) frame, in its own words', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-colony-sweettooth'), rearBrake: bp('bmx-br-odyssey-evo25') });
  var e = r.errors.filter(function(v){ return v.ruleId === 'bmx-rear-brake-mount'; });
  eq(e.length, 1);
  some([e[0]], 'no rear brake bosses');
});
test('a bossless frame with no brake picked reads as by-design (info), never a nag', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-colony-sweettooth') });
  eq(of(r, 'bmx-brakeless').length, 1);
  eq(r.errors.length, 0);
});
test('front brake vs fork bosses: error on a brakeless fork, silent on a match', function(){
  var r = BMX.checkBmxBuild({ fork: bp('bmx-fk-merritt-cnc'), frontBrake: bp('bmx-br-odyssey-evo25') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-front-brake-mount'; }).length, 1, 'bossless fork');
  var r2 = BMX.checkBmxBuild({ fork: bp('bmx-fk-odyssey-r32'), frontBrake: bp('bmx-br-odyssey-evo25') });
  eq(of(r2, 'bmx-front-brake-mount').length, 0, 'u-brake on u-brake bosses fits');
});

/* ---- Q7 pivotal seat/post (provisional) --------------------------------------- */
test('a pivotal seat errors on a standard post, and matches are silent', function(){
  var r = BMX.checkBmxBuild({ seat: bp('bmx-se-cult-pivotal'), seatpost: bp('bmx-sp-odyssey-standard-post') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-seat-system'; }).length, 1);
  var r2 = BMX.checkBmxBuild({ seat: bp('bmx-se-cult-pivotal'), seatpost: bp('bmx-sp-cult-pivotal-post') });
  eq(of(r2, 'bmx-seat-system').length, 0);
});

/* ---- BMX-8 tire clearance: dormant until sourced ------------------------------ */
test('tire clearance warns off a sourced maxTire and stays dormant without one', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), rearTire: bp('bmx-ti-maxxis-hookworm-25') });
  eq(of(r, 'bmx-tire-clearance').length, 0, 'no maxTire in the dataset -> dormant, never guessed');
  var tight = /** @type {any} */ (Object.assign({}, bp('bmx-fr-kink-williams'), { id:'bmx-fr-synthetic-tight', maxTire:2.3 }));
  var r2 = BMX.checkBmxBuild({ frame: tight, rearTire: bp('bmx-ti-maxxis-hookworm-25') });
  eq(r2.warnings.filter(function(v){ return v.ruleId === 'bmx-tire-clearance'; }).length, 1, 'fires off a maker-published clearance');
});

/* ---- Display-only: gear ratio (Q10) + slot requiredness ------------------------ */
test('gear ratio is computed for display and NEVER appears as a verdict', function(){
  var build = { sprocket: bp('bmx-sp-profile-race-25'), rearWheel: bp('bmx-rh-cult-matchv2'), frame: bp('bmx-fr-kink-williams') };
  var g = BMX.bmxGearInfo(build);
  ok(g && Math.abs(g.ratio - 2.78) < 0.01, '25T / 9T driver = ~2.78');
  ok(g && g.rollout && g.rollout > 170 && g.rollout < 180, 'rollout ~ 20in x ratio x pi');
  var r = BMX.checkBmxBuild(build);
  r.errors.concat(r.warnings).concat(r.infos).forEach(function(v){
    ok(v.ruleId.indexOf('gear') < 0, 'no gear-ratio verdict exists (every ratio fits)');
  });
  eq(BMX.bmxGearInfo({ frame: bp('bmx-fr-kink-williams') }), null, 'null until sprocket + cog are known');
});

test('brakes, gyro and pegs are never required; core slots are (Douglas 2026-07-13)', function(){
  /** @type {Object.<string, boolean>} */ var req = {};
  BMX.BMX_SLOTS.forEach(function(s){ req[s.key] = BMX.bmxSlotRequired(s); });
  ['frontBrake','rearBrake','gyro','pegsFront','pegsRear','bb','rearCog','headset','grips']
    .forEach(function(k){ eq(req[k], false, k + ' must be optional'); });
  ['frame','fork','cranks','sprocket','chain','frontWheel','rearWheel','frontTire','rearTire','handlebar','stem','seat','seatpost','pedals']
    .forEach(function(k){ eq(req[k], true, k + ' stays required'); });
});
