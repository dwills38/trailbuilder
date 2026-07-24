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

/* ---- BMX-1b THE DIAMETER/SPLINE SPLIT (mechanic ruling FRM-61, 2026-07-24) --
   The spindle used to be ONE enum mixing diameters with a spline count, and
   bmx-bb-spindle exact-matched the tokens. That was wrong in BOTH directions,
   so these three cases pin both of them plus the true non-fit in between. Each
   of the first and third FAILED before the split (a false red); the second is
   the guard that the split did not buy the fix by loosening the real check. */
test('FRM-61 (a): a 48-spline 24mm crank on a 24mm BB raises NO error - the false red is gone', function(){
  var fit24 = bp('bmx-bb-fitbikeco-blunt48spline-24mm');          // 24mm bore, 48-spline spindle
  var cr = /** @type {any} */ (Object.assign({}, bp('bmx-cr-profile-race'),
    { id:'bmx-cr-synthetic-48spline-24', spindleDiameter:'24mm', splinePattern:'48-spline' }));
  var r = BMX.checkBmxBuild({ bb: fit24, cranks: cr });
  eq(of(r, 'bmx-bb-spindle').length, 0, 'same diameter -> fits, whatever the spline says');
  eq(r.errors.length, 0, 'and nothing else fires on the pair either');
});
test('FRM-61 (b): a 48-spline 19mm crank on that same 24mm BB STILL errors - right reason, the diameter', function(){
  var fit24 = bp('bmx-bb-fitbikeco-blunt48spline-24mm');
  var rant = bp('bmx-cr-rant-bangin48');                          // 19mm bore, 48-spline
  eq(rant.spindleDiameter, '19mm', 'the Rant Bangin\' 48 is a 19mm spindle (its own source sentence)');
  eq(rant.splinePattern, '48-spline', 'and a 48-spline one - the same spline as the Fit BB kit');
  var r = BMX.checkBmxBuild({ bb: fit24, cranks: rant });
  var e = of(r, 'bmx-bb-spindle');
  eq(e.length, 1, 'same spline, different bore = a REAL non-fit, still caught');
  ok(/24mm/.test(e[0].msg) && /19mm/.test(e[0].msg), 'and the message names the two diameters: ' + e[0].msg);
});
test('FRM-61 (c): two same-diameter cranks of DIFFERENT spline both fit the one 19mm BB - the BB is spline-agnostic', function(){
  var bb19 = bp('bmx-bb-salt-mid-19');
  var spline48 = /** @type {any} */ (Object.assign({}, bp('bmx-cr-profile-race'),
    { id:'bmx-cr-synthetic-48spline-19', spindleDiameter:'19mm', splinePattern:'48-spline' }));
  var spline8 = /** @type {any} */ (Object.assign({}, bp('bmx-cr-profile-race'),
    { id:'bmx-cr-synthetic-8spline-19', spindleDiameter:'19mm', splinePattern:'8-spline' }));
  eq(of(BMX.checkBmxBuild({ bb: bb19, cranks: spline48 }), 'bmx-bb-spindle').length, 0, '48-spline 19mm in a 19mm BB');
  eq(of(BMX.checkBmxBuild({ bb: bb19, cranks: spline8 }), 'bmx-bb-spindle').length, 0, '8-spline 19mm in the SAME 19mm BB');
});
test('FRM-61: the two axes are separate in the vocab, and no rule reads the spline', function(){
  eq(BMX.BMX_VOCAB.spindleDiameter.indexOf('48-spline'), -1, 'a spline count is not a diameter');
  ok(BMX.BMX_VOCAB.splinePattern.indexOf('48-spline') >= 0, 'it lives on its own axis');
  ok(Object.keys(BMX.BMX_VOCAB).indexOf('spindle') < 0, 'the old conflated enum is gone, not left as a trap');
  /* Behavioural proof that splinePattern feeds NO verdict: flipping only the
     spline on both sides of a full build must not move a single verdict. */
  var base = { frame: bp('bmx-fr-wethepeople-justice'), cranks: bp('bmx-cr-profile-race'), bb: bp('bmx-bb-salt-mid-19') };
  var flipped = { frame: base.frame, bb: /** @type {any} */ (Object.assign({}, base.bb, { splinePattern:'48-spline' })),
    cranks: /** @type {any} */ (Object.assign({}, base.cranks, { splinePattern:'8-spline' })) };
  var a = BMX.checkBmxBuild(base), b = BMX.checkBmxBuild(flipped);
  /** @param {any} r @returns {string} */
  function keys(r){ return r.errors.concat(r.warnings).concat(r.infos).map(BMX.verdictKey).sort().join('|'); }
  eq(keys(b), keys(a), 'mismatched spline patterns change nothing - the BB never sees them');
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
  var r = BMX.checkBmxBuild({ sprocket: bp('bmx-sp-eclat-spline-25'), chain: raceChain });
  eq(r.errors.length, 0, 'warning, never an error');
  eq(r.warnings.filter(function(v){ return v.ruleId === 'bmx-chain-pitch'; }).length, 1);
});
test('bmx-chain-pitch is silent on an all-1/8 drivetrain', function(){
  var r = BMX.checkBmxBuild({ sprocket: bp('bmx-sp-eclat-spline-25'), chain: bp('bmx-ch-kmc-z410'), rearCog: bp('bmx-rc-cult-cassette-9') });
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
  // bmx-pg-colony-oneway (Oneway CrMo Peg, 14mm, reducerIncluded:false) - a 14mm peg
  // with NO reducer on a 10mm front axle warns. (Re-pointed 2026-07-17 off the removed
  // fabricated bmx-pg-bsd-superstar row; a shipped reducer would instead downgrade this
  // to an info - see the next test with bmx-pg-fit-universal.)
  var r = BMX.checkBmxBuild({ pegsFront: bp('bmx-pg-colony-oneway'), frontWheel: bp('bmx-fw-odyssey-vandero') });
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

/* ---- BMX-9 axle match: wheel hub axle vs frame/fork dropout (race, 2026-07-23) */
test('a fatter hub axle than the dropout errors; a thinner one warns with a conversion-axle fix; matched is silent', function(){
  // FRONT: fork dropout vs front-wheel hub axle. Synthetic 15/20mm clones (no
  // race thru-axle wheels ship in the dataset yet - this is the vocab-only pass).
  var fw20 = /** @type {any} */ (Object.assign({}, bp('bmx-fw-odyssey-vandero'), { id:'bmx-fw-synthetic-20', axle:'20mm' }));
  var rErr = BMX.checkBmxBuild({ fork: bp('bmx-fk-odyssey-r32'), frontWheel: fw20 });   // 20mm hub in 10mm dropout
  eq(rErr.errors.filter(function(v){ return v.ruleId === 'bmx-axle'; }).length, 1, 'a 20mm hub axle will not fit a 10mm dropout - ERROR');

  var fork20 = /** @type {any} */ (Object.assign({}, bp('bmx-fk-odyssey-r32'), { id:'bmx-fk-synthetic-20', axle:'20mm' }));
  var rWarn = BMX.checkBmxBuild({ fork: fork20, frontWheel: bp('bmx-fw-odyssey-vandero') });   // 10mm hub in 20mm dropout
  var w = rWarn.warnings.filter(function(v){ return v.ruleId === 'bmx-axle'; });
  eq(rWarn.errors.length, 0, 'the adapter direction is never an error');
  eq(w.length, 1, 'a 10mm hub in a 20mm dropout runs on a conversion axle - WARNING');
  ok(w[0].fix && w[0].fix.kind === 'adapter', 'carries the structured conversion-axle fix');

  var rOk = BMX.checkBmxBuild({ fork: bp('bmx-fk-odyssey-r32'), frontWheel: bp('bmx-fw-odyssey-vandero') });   // 10mm / 10mm
  eq(of(rOk, 'bmx-axle').length, 0, 'matched front axles are silent');
});
test('the rear axle check reads frame.rearAxle vs the rear hub, same direction-aware logic', function(){
  // matched 14/14 (every freestyle build) is silent - the freestyle-byte-identity guard.
  var rOk = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), rearWheel: bp('bmx-rh-cult-matchv2') });   // 14mm / 14mm
  eq(of(rOk, 'bmx-axle').length, 0, 'a matched 14mm freestyle rear end never trips the new rule');
  var frame10 = /** @type {any} */ (Object.assign({}, bp('bmx-fr-kink-williams'), { id:'bmx-fr-synthetic-rear10', rearAxle:'10mm' }));
  var rErr = BMX.checkBmxBuild({ frame: frame10, rearWheel: bp('bmx-rh-cult-matchv2') });   // 14mm hub in 10mm dropout
  eq(rErr.errors.filter(function(v){ return v.ruleId === 'bmx-axle'; }).length, 1, '14mm hub in a 10mm race dropout - ERROR');
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
  var r2 = BMX.checkBmxBuild({ fork: bp('bmx-fk-fitbikeco-tibs'), frontBrake: bp('bmx-br-odyssey-evo25') });
  eq(of(r2, 'bmx-front-brake-mount').length, 0, 'u-brake on u-brake bosses fits');
});

/* ---- disc vocab widen (depth-4, 2026-07-17) -------------------------------- */
test('bmx-rear-brake-mount errors a u-brake caliper on a disc-mount frame; disc-on-disc is silent', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-redline-prolineflight'), rearBrake: bp('bmx-br-diacompe-990') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-rear-brake-mount'; }).length, 1, 'u-brake caliper does not bolt to disc tabs');
  var r2 = BMX.checkBmxBuild({ frame: bp('bmx-fr-redline-prolineflight'), rearBrake: bp('bmx-br-avid-bb5-bmx') });
  eq(of(r2, 'bmx-rear-brake-mount').length, 0, 'disc caliper on a disc-mount frame fits');
});

/* ---- Q7 pivotal seat/post (provisional) --------------------------------------- */
test('a pivotal seat errors on a standard post, and matches are silent', function(){
  var r = BMX.checkBmxBuild({ seat: bp('bmx-se-cult-pivotal'), seatpost: bp('bmx-sp-odyssey-standard-post') });
  eq(r.errors.filter(function(v){ return v.ruleId === 'bmx-seat-system'; }).length, 1);
  var r2 = BMX.checkBmxBuild({ seat: bp('bmx-se-cult-pivotal'), seatpost: bp('bmx-sp-cult-pivotal-post') });
  eq(of(r2, 'bmx-seat-system').length, 0);
});
test('stealth <-> pivotal (vocab-tier1, 2026-07-22) cross-compatible both directions; stealth vs standard still errors', function(){
  var stealthSeatOnPivotalPost = BMX.checkBmxBuild({ seat: bp('bmx-se-kink-global-stealth'), seatpost: bp('bmx-sp-cult-pivotal-post') });
  eq(of(stealthSeatOnPivotalPost, 'bmx-seat-system').length, 0, 'a Stealth seat fits a Pivotal post (Mission\'s own page)');
  var pivotalSeatOnStealthPost = BMX.checkBmxBuild({ seat: bp('bmx-se-cult-pivotal'), seatpost: bp('bmx-sp-kink-stealth-post') });
  eq(of(pivotalSeatOnStealthPost, 'bmx-seat-system').length, 0, 'a Pivotal seat fits a Stealth post (Kink\'s own page)');
  var stealthSeatOnStandardPost = BMX.checkBmxBuild({ seat: bp('bmx-se-kink-global-stealth'), seatpost: bp('bmx-sp-odyssey-standard-post') });
  eq(stealthSeatOnStandardPost.errors.filter(function(v){ return v.ruleId === 'bmx-seat-system'; }).length, 1, 'a Stealth seat still does not fit a railed standard post');
});

/* ---- BMX-8 tire clearance: dormant until sourced ------------------------------ */
test('tire clearance warns off a sourced maxTire and stays dormant without one', function(){
  var r = BMX.checkBmxBuild({ frame: bp('bmx-fr-kink-williams'), rearTire: bp('bmx-ti-maxxis-hookworm-25') });
  eq(of(r, 'bmx-tire-clearance').length, 0, 'no maxTire in the dataset -> dormant, never guessed');
  var tight = /** @type {any} */ (Object.assign({}, bp('bmx-fr-kink-williams'), { id:'bmx-fr-synthetic-tight', maxTire:1.9 }));
  var r2 = BMX.checkBmxBuild({ frame: tight, rearTire: bp('bmx-ti-maxxis-hookworm-25') });
  eq(r2.warnings.filter(function(v){ return v.ruleId === 'bmx-tire-clearance'; }).length, 1, 'fires off a maker-published clearance');
});

/* ---- Display-only: gear ratio (Q10) + slot requiredness ------------------------ */
test('gear ratio is computed for display and NEVER appears as a verdict', function(){
  var build = { sprocket: bp('bmx-sp-eclat-spline-25'), rearWheel: bp('bmx-rh-cult-matchv2'), frame: bp('bmx-fr-kink-williams') };
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
