'use strict';
/* ROAD SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema-bmx.js's positive/negative
   pattern for src/schema-road.js against data/road.js. */
var D = require('../data/road.js');
var S = require('../src/schema-road.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

/* Live date, not a pinned constant — the same staleness fix test-schema-gravel.js
   got 2026-07-22: real rows' lastChecked keeps advancing as sessions verify parts,
   so a hardcoded past TODAY starts failing the positive tests the day after it's
   written (workers were backdating lastChecked to dodge it — worse). Negative
   tests are date-independent, so the live date is safe everywhere here. */
var TODAY = new Date();

/** @returns {any} */
function aFrame(){
  var p = D.ROAD_PARTS.find(function(x){ return x.cat === 'frame'; });
  if(!p) throw new Error('no road frame row found in data/road.js');
  return p;
}

test('the real road catalog validates clean', function(){
  var probs = S.validateRoadCatalog(D.ROAD_PARTS, TODAY);
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real road part has no problems', function(){
  var p = aFrame();
  eq(S.validateRoadPart(p, TODAY).length, 0);
});

test('an out-of-vocab bb shell value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 'bb30-mtb-token' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /"bb".*not in bbShellRoad/.test(m); }), probs.join('\n'));
});

test('bb90-road / bb30a are accepted (coordinator-authorized widen)', function(){
  var frame = aFrame();
  ['bb90-road', 'bb30a'].forEach(function(shell){
    var p = Object.assign({}, frame, { bb: shell });
    eq(S.validateRoadPart(p, TODAY).length, 0, shell + ' should validate clean');
  });
});

test('pf86 is rejected (retired 2026-07-21, merged into bb86)', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 'pf86' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /"bb".*not in bbShellRoad/.test(m); }), probs.join('\n'));
});

test('a missing required field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame); delete bad.rearAxle;
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "rearAxle"/.test(m); }), probs.join('\n'));
});

test('an unknown category is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { cat: 'e-motor' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown road category/.test(m); }), probs.join('\n'));
});

test('a bad price is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { price: -5 });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /price must be a number/.test(m); }), probs.join('\n'));
});

test('verified:true without a source URL is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: undefined, lastChecked: '2026-07-01' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /valid http\(s\) source URL/.test(m); }), probs.join('\n'));
});

test('verified:true with a future lastChecked is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2099-01-01' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /lastChecked date/.test(m); }), probs.join('\n'));
});

test('verified:true with sourceType retailer is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2026-07-01', sourceType: 'retailer' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /rejects sourceType/.test(m); }), probs.join('\n'));
});

test('an unknown stray field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { rearaxel: frame.rearAxle });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown field "rearaxel"/.test(m); }), probs.join('\n'));
});

test('a duplicate id across the catalog is caught', function(){
  var frame = aFrame();
  var probs = S.validateRoadCatalog(D.ROAD_PARTS.concat([Object.assign({}, frame)]), TODAY);
  ok(probs.some(function(m){ return /duplicate id/.test(m); }), probs.join('\n'));
});

test('a wheel-side brakeSystem token (disc/rim) validates on frontwheel/rearwheel rows', function(){
  var fw = D.ROAD_PARTS.find(function(x){ return x.cat === 'frontwheel'; });
  if(!fw) throw new Error('no road frontwheel row found');
  eq(S.validateRoadPart(fw, TODAY).length, 0);
});

test('a brake-caliper hydraulic/mechanical actuation validates on brake rows', function(){
  var br = D.ROAD_PARTS.find(function(x){ return x.cat === 'brake'; });
  if(!br) throw new Error('no road brake row found');
  eq(S.validateRoadPart(br, TODAY).length, 0);
});

test('verified:true with sourceType:measured requires a weightSource URL', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2026-07-01', sourceType: 'measured' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /sourceType:"measured".*weightSource URL/.test(m); }), probs.join('\n'));
});

test('verified:true with sourceType:measured and a weightSource URL is accepted', function(){
  var frame = aFrame();
  var good = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2026-07-01', sourceType: 'measured', weightSource: 'https://example.com/weight' });
  eq(S.validateRoadPart(good, TODAY).length, 0);
});

test('an out-of-vocab status value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { status: 'banana' });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /status "banana" not in/.test(m); }), probs.join('\n'));
});

test('status current/discontinued/recalled all validate clean', function(){
  var frame = aFrame();
  ['current', 'discontinued', 'recalled'].forEach(function(s){
    var p = Object.assign({}, frame, { status: s });
    eq(S.validateRoadPart(p, TODAY).length, 0, s + ' should validate clean');
  });
});

test('a part cannot supersede itself', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { supersededBy: frame.id });
  var probs = S.validateRoadPart(bad, TODAY);
  ok(probs.some(function(m){ return /cannot supersede itself/.test(m); }), probs.join('\n'));
});

test('supersededBy referencing an unknown part id is caught at the catalog level', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { id: frame.id + '-dupe-test', supersededBy: 'no-such-id-anywhere' });
  var probs = S.validateRoadCatalog(D.ROAD_PARTS.concat([bad]), TODAY);
  ok(probs.some(function(m){ return /supersededBy references unknown part/.test(m); }), probs.join('\n'));
});

test('the real road catalog\'s discontinued rows resolve any supersededBy pointer', function(){
  var probs = S.validateRoadCatalog(D.ROAD_PARTS, new Date());
  eq(probs.filter(function(m){ return /supersededBy references unknown part/.test(m); }).length, 0, probs.join('\n'));
});

/* ---- priceBasis: price provenance (Douglas's 2026-07-22 ruling) -----------
   "verified means the pricing was verified too". Same enum + same two-way
   contract as src/schema.js — this pins that road didn't drift its own variant.
   ('bundle-split-estimate' matters most here: STI/hydraulic shift-brake levers
   are priced by the maker as one combined SKU.) */

/** @param {Object} [changes] @returns {any} */
function roadPbRow(changes){
  var p = Object.assign({}, aFrame(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}

test('every priceBasis vocab token is accepted on a verified road row', function(){
  S.LOCAL_VOCAB.priceBasis.forEach(function(token){
    eq(S.validateRoadPart(roadPbRow({ priceBasis:token }), TODAY).length, 0, 'expected "' + token + '" to validate');
  });
});

test('road priceBasis vocab is IDENTICAL to the live schema.js enum (one definition, mirrored)', function(){
  var core = require('../src/schema.js').VOCAB.priceBasis;
  eq(S.LOCAL_VOCAB.priceBasis.join('|'), core.join('|'), 'road drifted its own priceBasis variant');
});

test('an out-of-vocab priceBasis is caught (road)', function(){
  var probs = S.validateRoadPart(roadPbRow({ priceBasis:'msrp-probably' }), TODAY);
  ok(probs.some(function(m){ return /priceBasis.*not in/.test(m); }), probs.join('\n'));
});

test('priceBasis on an UNVERIFIED road row is rejected (a basis is a claim, not decoration)', function(){
  var p = roadPbRow({ priceBasis:'msrp-confirmed' });
  delete p.verified; delete p.source; delete p.lastChecked;
  var probs = S.validateRoadPart(p, TODAY);
  ok(probs.some(function(m){ return /requires verified:true/.test(m); }), probs.join('\n'));
});

test('STAGED ROLLOUT: a verified road row with NO priceBasis stays legal while PRICE_BASIS_STRICT is false', function(){
  eq(S.PRICE_BASIS_STRICT, false, 'PRICE_BASIS_STRICT flipped — the backfill must be complete in EVERY catalog first');
  eq(S.validateRoadPart(roadPbRow(), TODAY).length, 0);
});

/* =============================================================================
   RIM-CALIPER WIDENING (schema/vocab-widen-ab, 2026-07-22)
   `pistons` went from unconditionally REQUIRED to conditional on the disc/rim
   class. That is only an improvement if the conditional version is STRICTER,
   so every branch is pinned below — including the two the old shape could not
   express at all (pistons on a rim caliper; a mount contradicting its system).
   ========================================================================== */
/** @param {Object.<string, any>} [over] @returns {any} */
function discBrakeRow(over){
  return Object.assign({ id: 'br-test-disc-caliper', cat: 'brake', brand: 'Test', model: 'Disc Caliper',
    brakeSystem: 'disc-flat', mount: 'flat-mount', pistons: 2, actuation: 'hydraulic', price: 100 }, over || {});
}
/** @param {Object.<string, any>} [over] @returns {any} */
function rimBrakeRow(over){
  return Object.assign({ id: 'br-test-rim-caliper', cat: 'brake', brand: 'Test', model: 'Rim Caliper',
    brakeSystem: 'rim-caliper', mount: 'rim-caliper', reach: 51, actuation: 'mechanical', price: 60 }, over || {});
}

test('rim-caliper: a real rim caliper row validates clean (the shape that used to be impossible)', function(){
  eq(S.validateRoadPart(rimBrakeRow(), TODAY).length, 0);
  var live = D.ROAD_PARTS.find(function(x){ return x.id === 'br-shimano-sora-r3000-caliper'; });
  if(!live) throw new Error('the Sora BR-R3000 row this widening was for is missing from data/road.js');
  eq(S.validateRoadPart(live, TODAY).length, 0, 'and validate clean');
  eq(live.mount, 'rim-caliper'); ok(!('pistons' in live), 'a rim caliper states no piston count');
});

test('rim-caliper: `pistons` is still REQUIRED on a disc row (the widening must not have loosened it)', function(){
  var p = discBrakeRow(); delete p.pistons;
  ok(S.validateRoadPart(p, TODAY).some(function(m){ return /requires "pistons"/.test(m); }),
    'a disc caliper with no piston count must still be rejected');
});

test('rim-caliper: `pistons` on a RIM row is now REJECTED (the old unconditional shape could not catch this)', function(){
  ok(S.validateRoadPart(rimBrakeRow({ pistons: 2 }), TODAY).some(function(m){ return /must not carry "pistons"/.test(m); }));
});

test('rim-caliper: `reach` is rim-only', function(){
  eq(S.validateRoadPart(rimBrakeRow(), TODAY).length, 0, 'reach is legal on a rim caliper');
  ok(S.validateRoadPart(discBrakeRow({ reach: 51 }), TODAY).some(function(m){ return /"reach" is a rim-caliper arch dimension/.test(m); }),
    'and meaningless on a disc caliper');
});

test('rim-caliper: a caliper\'s mount and its brakeSystem may not contradict each other', function(){
  ok(S.validateRoadPart(discBrakeRow({ mount: 'rim-caliper' }), TODAY).some(function(m){ return /contradicts brakeSystem/.test(m); }),
    'a disc caliper cannot bolt to a brake bridge');
  ok(S.validateRoadPart(rimBrakeRow({ mount: 'flat-mount' }), TODAY).some(function(m){ return /must use mount "rim-caliper"/.test(m); }),
    'and a rim caliper cannot take a flat mount');
});

test('rim-caliper: the CHASSIS half of the same agreement is enforced on frames and forks', function(){
  var frame = aFrame();
  ok(S.validateRoadPart(Object.assign({}, frame, { brakeMount: 'rim-caliper' }), TODAY)
      .some(function(m){ return /contradicts brakeSystem/.test(m); }),
    'a disc frame must not acquire a rim mount by copy-paste');
  ok(S.validateRoadPart(Object.assign({}, frame, { brakeSystem: 'rim-caliper' }), TODAY)
      .some(function(m){ return /must use brakeMount "rim-caliper"/.test(m); }),
    'and a rim-brake frame must not keep a flat mount');
  /* dormant-but-correct: the whole rim-brake frame shape validates the day one is sourced */
  eq(S.validateRoadPart(Object.assign({}, frame, { brakeSystem: 'rim-caliper', brakeMount: 'rim-caliper' }), TODAY).length, 0,
    'a genuinely rim-brake frame is expressible - the v1 disc-only catalog is a DATA decision, not a schema wall');
});

test('gxp: the crank spindle token is accepted, and is NOT a spelling of 24mm-road', function(){
  var crank = D.ROAD_PARTS.find(function(x){ return x.id === 'cr-sram-rival22-gxp-5034'; });
  if(!crank) throw new Error('the SRAM Rival 22 GXP crank row this token was added for is missing from data/road.js');
  eq(S.validateRoadPart(crank, TODAY).length, 0);
  eq(crank.bb, 'gxp');
  ok(S.LOCAL_VOCAB.crankBbRoad.indexOf('gxp') >= 0 && S.LOCAL_VOCAB.crankBbRoad.indexOf('24mm-road') >= 0,
    'both tokens exist SEPARATELY - merging them would be a false MATCH on an exact-match axis');
});
