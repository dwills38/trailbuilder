'use strict';
/* BMX SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema.js's positive/negative
   pattern for src/schema-bmx.js against data/bmx.js. */
var D = require('../data/bmx.js');
var S = require('../src/schema-bmx.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

// The validator's clock: the REAL current date, matching validate.js's own
// behavior — a pinned date here goes stale and skews every future BMX
// verification wave's lastChecked (it bit wave 1 on 2026-07-18). The
// future-date negative below uses a fixed 2099 date, so it stays deterministic.
var TODAY = new Date();

// a real BMX frame row to clone/mutate for negative tests (throws if the
// catalog somehow ships no frames, rather than silently testing `undefined`)
/** @returns {any} */
function aFrame(){
  var p = D.BMX_PARTS.find(function(x){ return x.cat === 'frame'; });
  if(!p) throw new Error('no BMX frame row found in data/bmx.js');
  return p;
}

test('the real BMX catalog validates clean', function(){
  var probs = S.validateBmxCatalog(D.BMX_PARTS, TODAY);
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real BMX part has no problems', function(){
  var p = aFrame();
  eq(S.validateBmxPart(p, TODAY).length, 0);
});

test('an out-of-vocab axle value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { rearAxle: '17mm' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /rearAxle.*not in axle/.test(m); }), probs.join('\n'));
});

/* ---- FRM-61: the two spindle axes must not blur back into one ------------- */
/** @param {string} cat @returns {any} */
function aRow(cat){
  var p = D.BMX_PARTS.find(function(x){ return x.cat === cat; });
  if(!p) throw new Error('no BMX ' + cat + ' row found in data/bmx.js');
  return p;
}
test('a SPLINE COUNT in the diameter field is caught (both categories)', function(){
  ['cranks', 'bb'].forEach(function(cat){
    var bad = Object.assign({}, aRow(cat), { spindleDiameter: '48-spline' });
    var probs = S.validateBmxPart(bad, TODAY);
    ok(probs.some(function(m){ return /spindleDiameter.*not in spindleDiameter/.test(m); }),
      cat + ': ' + probs.join('\n'));
  });
});
test('a DIAMETER in the spline field is caught (both categories)', function(){
  ['cranks', 'bb'].forEach(function(cat){
    var bad = Object.assign({}, aRow(cat), { splinePattern: '24mm' });
    var probs = S.validateBmxPart(bad, TODAY);
    ok(probs.some(function(m){ return /splinePattern.*not in splinePattern/.test(m); }),
      cat + ': ' + probs.join('\n'));
  });
});
test('spindleDiameter is REQUIRED and splinePattern is OPTIONAL on cranks and bb', function(){
  ['cranks', 'bb'].forEach(function(cat){
    var noDia = Object.assign({}, aRow(cat)); delete noDia.spindleDiameter;
    ok(S.validateBmxPart(noDia, TODAY).some(function(m){ return /missing required field "spindleDiameter"/.test(m); }),
      cat + ' must declare its diameter - it is the interface the BB check reads');
    var noSpline = Object.assign({}, aRow(cat)); delete noSpline.splinePattern;
    eq(S.validateBmxPart(noSpline, TODAY).length, 0,
      cat + ': a row whose source never named the spline carries no token, and that is legal (never a guess)');
  });
});
test('the retired single-axis field names are now strays, not silently accepted', function(){
  ok(S.validateBmxPart(Object.assign({}, aRow('cranks'), { spindle: '19mm' }), TODAY)
    .some(function(m){ return /unknown field "spindle"/.test(m); }), 'cranks.spindle is retired');
  ok(S.validateBmxPart(Object.assign({}, aRow('bb'), { spindleFit: '19mm' }), TODAY)
    .some(function(m){ return /unknown field "spindleFit"/.test(m); }), 'bb.spindleFit is retired');
});

test('a missing required field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame); delete bad.bbShell;
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "bbShell"/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified 'stealth' seatSystem token (the
// Kink/Mission one-bolt mechanism) — positive + negative.
/** @returns {any} */
function aSeatpost(){
  var p = D.BMX_PARTS.find(function(x){ return x.cat === 'seatpost'; });
  if(!p) throw new Error('no BMX seatpost row found in data/bmx.js');
  return p;
}

test('stealth is a valid BMX seatSystem value (seat and seatpost both)', function(){
  var post = aSeatpost();
  eq(S.validateBmxPart(Object.assign({}, post, { system: 'stealth' }), TODAY).length, 0);
});

test('an out-of-vocab seatSystem value is still caught', function(){
  var post = aSeatpost();
  var bad = Object.assign({}, post, { system: 'quick-release' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /system.*not in seatSystem/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified headTube tokens — integrated-1 (bare
// 1in bore) and integrated-tapered-1-1/8-1.5 (the wider tapered class) —
// positive + negative, on both the frame/fork steerer field and the
// standalone headset's fit field (both share the headTube vocab).
test('integrated-1 and integrated-tapered-1-1/8-1.5 are valid frame headTube values', function(){
  var frame = aFrame();
  eq(S.validateBmxPart(Object.assign({}, frame, { headTube: 'integrated-1' }), TODAY).length, 0);
  eq(S.validateBmxPart(Object.assign({}, frame, { headTube: 'integrated-tapered-1-1/8-1.5' }), TODAY).length, 0);
});

test('integrated-1 is a valid headset fit value', function(){
  var hs = D.BMX_PARTS.find(function(x){ return x.cat === 'headset'; });
  if(!hs) throw new Error('no BMX headset row found in data/bmx.js');
  eq(S.validateBmxPart(Object.assign({}, hs, { fit: 'integrated-1' }), TODAY).length, 0);
});

test('an out-of-vocab headTube value is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { headTube: 'integrated-1-1/4' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /headTube.*not in headTube/.test(m); }), probs.join('\n'));
});

// vocab-race (2026-07-23): race BB shells (bb86/bb30/pf30), race thru-axles
// (15mm/20mm), and the non-integrated threadless external-cup headset
// (threadless-1-1/8). Additive to the shared BMX_VOCAB, so the schema accepts
// them everywhere the field reads that vocab.
test('race press-fit BB shells (bb86/bb30/pf30) are valid bbShell values', function(){
  var frame = aFrame();
  ['bb86', 'bb30', 'pf30'].forEach(function(shell){
    eq(S.validateBmxPart(Object.assign({}, frame, { bbShell: shell }), TODAY).length, 0, shell + ' should validate');
  });
  var bad = Object.assign({}, frame, { bbShell: 'bb47' });
  ok(S.validateBmxPart(bad, TODAY).some(function(m){ return /bbShell.*not in bbShell/.test(m); }), 'a fabricated shell is still caught');
});

test('race thru-axles (15mm/20mm) are valid axle values on frame/fork/wheel', function(){
  var frame = aFrame();
  ['15mm', '20mm'].forEach(function(a){
    eq(S.validateBmxPart(Object.assign({}, frame, { rearAxle: a }), TODAY).length, 0, 'frame.rearAxle ' + a);
  });
  var fork = D.BMX_PARTS.find(function(x){ return x.cat === 'fork'; });
  if(!fork) throw new Error('no BMX fork row');
  eq(S.validateBmxPart(Object.assign({}, fork, { axle: '15mm' }), TODAY).length, 0, 'fork.axle 15mm');
  var fwheel = D.BMX_PARTS.find(function(x){ return x.cat === 'frontWheel'; });
  if(!fwheel) throw new Error('no BMX frontWheel row');
  eq(S.validateBmxPart(Object.assign({}, fwheel, { axle: '20mm' }), TODAY).length, 0, 'frontWheel.axle 20mm');
});

test('pegs stay 10mm/14mm ONLY - the widened axle vocab must not leak into peg bores', function(){
  var peg = D.BMX_PARTS.find(function(x){ return x.cat === 'pegs'; });
  if(!peg) throw new Error('no BMX pegs row');
  ['10mm', '14mm'].forEach(function(a){
    eq(S.validateBmxPart(Object.assign({}, peg, { axleFit: a }), TODAY).length, 0, 'peg axleFit ' + a + ' still valid');
  });
  ['15mm', '20mm'].forEach(function(a){
    var bad = Object.assign({}, peg, { axleFit: a });
    ok(S.validateBmxPart(bad, TODAY).some(function(m){ return /axleFit.*not in pegAxle/.test(m); }), 'a fabricated ' + a + ' peg bore is rejected');
  });
});

test('threadless-1-1/8 (non-integrated external-cup) is a valid headTube/steerer/fit value', function(){
  var frame = aFrame();
  eq(S.validateBmxPart(Object.assign({}, frame, { headTube: 'threadless-1-1/8' }), TODAY).length, 0, 'frame.headTube');
  var fork = D.BMX_PARTS.find(function(x){ return x.cat === 'fork'; });
  if(!fork) throw new Error('no BMX fork row');
  eq(S.validateBmxPart(Object.assign({}, fork, { steerer: 'threadless-1-1/8' }), TODAY).length, 0, 'fork.steerer');
  var hs = D.BMX_PARTS.find(function(x){ return x.cat === 'headset'; });
  if(!hs) throw new Error('no BMX headset row');
  eq(S.validateBmxPart(Object.assign({}, hs, { fit: 'threadless-1-1/8' }), TODAY).length, 0, 'headset.fit');
});

test('an unknown category is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { cat: 'e-motor' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown BMX category/.test(m); }), probs.join('\n'));
});

test('a bad price is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { price: -5 });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /price must be a number/.test(m); }), probs.join('\n'));
});

test('verified:true without a source URL is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: undefined, lastChecked: '2026-07-01' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /valid http\(s\) source URL/.test(m); }), probs.join('\n'));
});

test('verified:true with a future lastChecked is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2099-01-01' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /lastChecked date/.test(m); }), probs.join('\n'));
});

test('an unknown stray field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bbshel: frame.bbShell });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown field "bbshel"/.test(m); }), probs.join('\n'));
});

test('a duplicate id across the catalog is caught', function(){
  var frame = aFrame();
  var probs = S.validateBmxCatalog(D.BMX_PARTS.concat([Object.assign({}, frame)]), TODAY);
  ok(probs.some(function(m){ return /duplicate id/.test(m); }), probs.join('\n'));
});

/* ---- status / supersededBy (added alongside BMX_ALIASES, src/compat-bmx.js) */

test('a bad status value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { status: 'sold-out' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /status.*not in/.test(m); }), probs.join('\n'));
});

test('a valid status value passes', function(){
  var frame = aFrame();
  var good = Object.assign({}, frame, { status: 'discontinued' });
  eq(S.validateBmxPart(good, TODAY).length, 0);
});

test('a dangling supersededBy is caught when the catalog id set is known', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { supersededBy: 'bmx-fr-never-existed' });
  var probs = S.validateBmxCatalog(D.BMX_PARTS.map(function(p){ return p.id === frame.id ? bad : p; }), TODAY);
  ok(probs.some(function(m){ return /supersededBy references unknown/.test(m); }), probs.join('\n'));
});

test('a self-referencing supersededBy is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { supersededBy: frame.id });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /supersede itself/.test(m); }), probs.join('\n'));
});

test('a valid supersededBy pointing at a real BMX part passes', function(){
  var frame = aFrame();
  var other = D.BMX_PARTS.find(function(p){ return p.cat === 'frame' && p.id !== frame.id; });
  if(!other) throw new Error('need a second BMX frame row for this test');
  var good = Object.assign({}, frame, { supersededBy: other.id });
  var probs = S.validateBmxCatalog(D.BMX_PARTS.map(function(p){ return p.id === frame.id ? good : p; }), TODAY);
  ok(!probs.some(function(m){ return /supersededBy/.test(m); }), probs.join('\n'));
});

/* ---- priceBasis: price provenance (Douglas's 2026-07-22 ruling) -----------
   "verified means the pricing was verified too". Same enum + same two-way
   contract as src/schema.js — this pins that BMX didn't drift its own variant. */

/** a verified baseline row, so these don't ride whatever provenance the live
 * row happens to carry (which drifts with every verification wave) */
/** @param {Object} [changes] @returns {any} */
function bmxPbRow(changes){
  var p = Object.assign({}, aFrame(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}

function aFrontWheel(){
  var p = D.BMX_PARTS.find(function(x){ return x.cat === 'frontWheel'; });
  if(!p) throw new Error('no BMX frontWheel row found in data/bmx.js');
  return p;
}
/** @param {Object} [changes] @returns {any} */
function bmxPbWheelRow(changes){
  /** @type {any} */
  var p = Object.assign({}, aFrontWheel(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}
test('every priceBasis vocab token is accepted on a verified BMX row', function(){
  S.LOCAL_VOCAB.priceBasis.forEach(function(token){
    // pair-split-estimate is wheel-only (frontWheel/rearWheel) — bmxPbRow's base part is a frame.
    // discontinued-no-msrp needs status:'discontinued' too (the token law).
    /** @type {any} */
    var changes = { priceBasis:token };
    if(token === 'discontinued-no-msrp') changes.status = 'discontinued';
    var row = token === 'pair-split-estimate' ? bmxPbWheelRow(changes) : bmxPbRow(changes);
    eq(S.validateBmxPart(row, TODAY).length, 0, 'expected "' + token + '" to validate');
  });
});
/* ---- TOKEN LAW (2026-07-23): discontinued-no-msrp requires status:'discontinued' ---- */
test('discontinued-no-msrp WITHOUT status:discontinued is rejected on a BMX row (the token law)', function(){
  var probs = S.validateBmxPart(bmxPbRow({ priceBasis:'discontinued-no-msrp' }), TODAY);
  ok(probs.some(function(m){ return /discontinued-no-msrp/.test(m) && /status/.test(m); }), probs.join('\n'));
});
test('discontinued-no-msrp WITH status:discontinued validates clean on a BMX row', function(){
  eq(S.validateBmxPart(bmxPbRow({ priceBasis:'discontinued-no-msrp', status:'discontinued' }), TODAY).length, 0);
});
test('pair-split-estimate validates clean on a BMX frontWheel/rearWheel row, rejected on a frame', function(){
  eq(S.validateBmxPart(bmxPbWheelRow({ priceBasis:'pair-split-estimate' }), TODAY).length, 0);
  var probs = S.validateBmxPart(bmxPbRow({ priceBasis:'pair-split-estimate' }), TODAY);
  ok(probs.some(function(m){ return /pair-split-estimate.*wheel category/.test(m); }), probs.join('\n'));
});

test('BMX priceBasis vocab is IDENTICAL to the live schema.js enum (one definition, mirrored)', function(){
  var core = require('../src/schema.js').VOCAB.priceBasis;
  eq(S.LOCAL_VOCAB.priceBasis.join('|'), core.join('|'), 'BMX drifted its own priceBasis variant');
});

test('an out-of-vocab priceBasis is caught (BMX)', function(){
  var probs = S.validateBmxPart(bmxPbRow({ priceBasis:'msrp-probably' }), TODAY);
  ok(probs.some(function(m){ return /priceBasis.*not in/.test(m); }), probs.join('\n'));
});

test('priceBasis on an UNVERIFIED BMX row is rejected (a basis is a claim, not decoration)', function(){
  var p = bmxPbRow({ priceBasis:'msrp-confirmed' });
  delete p.verified; delete p.source; delete p.lastChecked;
  var probs = S.validateBmxPart(p, TODAY);
  ok(probs.some(function(m){ return /requires verified:true/.test(m); }), probs.join('\n'));
});

test('STAGED ROLLOUT: a verified BMX row with NO priceBasis stays legal while PRICE_BASIS_STRICT is false', function(){
  eq(S.PRICE_BASIS_STRICT, false, 'PRICE_BASIS_STRICT flipped — the backfill must be complete in EVERY catalog first');
  eq(S.validateBmxPart(bmxPbRow(), TODAY).length, 0);
});
