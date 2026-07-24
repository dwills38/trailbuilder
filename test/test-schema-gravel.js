'use strict';
/* GRAVEL SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema-bmx.js's positive/
   negative pattern for src/schema-gravel.js against data/gravel.js. */
var D = require('../data/gravel.js');
var S = require('../src/schema-gravel.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

var TODAY = new Date('2026-07-17T00:00:00Z');

// a real gravel frame row to clone/mutate for negative tests (throws if the
// catalog somehow ships no frames, rather than silently testing `undefined`)
/** @returns {any} */
function aFrame(){
  var p = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'frame'; });
  if(!p) throw new Error('no gravel frame row found in data/gravel.js');
  return p;
}

test('the real gravel catalog validates clean', function(){
  // uses the live date, not the fixed TODAY below (which is for the
  // negative date-boundary tests) — otherwise this drifts stale every time
  // a session verifies a part with today's real date, same fix test-data.js
  // already applies for the main MTB catalog.
  var probs = S.validateGravelCatalog(D.GRAVEL_PARTS, new Date());
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real gravel part has no problems', function(){
  // uses the live date, not the fixed TODAY below — same staleness fix as
  // the catalog-wide test above: a real row's lastChecked keeps advancing
  // as sessions verify parts, so a hardcoded past TODAY goes stale.
  var p = aFrame();
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab bb value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 'press-fit-mystery' });
  var probs = S.validateGravelPart(bad, TODAY);
  // fix/gravel-bb-steerer-split (2026-07-24): a FRAME's bb is now measured
  // against the `shell` axis, not the retired merged `bb` key — so the
  // assertion names shell. Strictly stronger than the old /not in bb/: it
  // pins WHICH axis the frame side is checked on, which is the whole point
  // of the split (a frame must never be validated against spindle tokens).
  ok(probs.some(function(m){ return /"bb".*not in shell/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified straight-steerer tokens (mirrors road's
// existing straight-1-1-8; straight-1-1-4 is the wider Wilier-class gap) —
// positive (each validates clean) + negative (still an exact-match vocab,
// not a wildcard) coverage for both.
test('straight-1-1-8 steerer is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { steerer: 'straight-1-1-8' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('straight-1-1-4 steerer is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { steerer: 'straight-1-1-4' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab steerer value is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { steerer: 'straight-1-inch' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /steerer.*not in steerer/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified QR rear-axle tokens — 135x9-qr (the
// classic 9mm-skewer class, Marin Nicasio+) and 135x10-qr (the wider
// 10mm-skewer class, Kona Rove AL / Salsa Journeyman) — positive + negative.
test('135x9-qr rear axle is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { rearAxle: '135x9-qr' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('135x10-qr rear axle is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { rearAxle: '135x10-qr' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab rearAxle value is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { rearAxle: '135x12-qr' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /rearAxle.*not in rearAxle/.test(m); }), probs.join('\n'));
});

// engine/gravel-is-mount (2026-07-22): the I.S. frame/fork brake-mount token
// (Marin Nicasio+) and the caliperMount/rotorInterface split of what used to be
// one shared `mount` vocab. Positive + negative on each, and — the point of the
// split — proof the two token sets can no longer leak into each other.
test('is-mount is a valid gravel frame AND fork brakeMount value', function(){
  var frame = aFrame();
  eq(S.validateGravelPart(Object.assign({}, frame, { brakeMount: 'is-mount' }), new Date()).length, 0);
  var fork = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'fork'; });
  if(!fork) throw new Error('no gravel fork row found in data/gravel.js');
  eq(S.validateGravelPart(Object.assign({}, fork, { brakeMount: 'is-mount' }), new Date()).length, 0);
});

test('an out-of-vocab brakeMount is still caught, and post-mount is NOT a frame-side token', function(){
  var frame = aFrame();
  var bad = S.validateGravelPart(Object.assign({}, frame, { brakeMount: 'cantilever' }), TODAY);
  ok(bad.some(function(m){ return /brakeMount.*not in brakeMount/.test(m); }), bad.join('\n'));
  // deliberate: no cataloged GRAVEL frame/fork is post-mount, so the token is
  // withheld on this side rather than added speculatively.
  var pm = S.validateGravelPart(Object.assign({}, frame, { brakeMount: 'post-mount' }), TODAY);
  ok(pm.some(function(m){ return /brakeMount.*not in brakeMount/.test(m); }), pm.join('\n'));
});

test('disc-is / disc-post are valid brakeSystem tokens; a junk value is still caught', function(){
  var frame = aFrame();
  eq(S.validateGravelPart(Object.assign({}, frame, { brakeSystem: 'disc-is' }), new Date()).length, 0);
  var brake = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'brake'; });
  if(!brake) throw new Error('no gravel brake row found in data/gravel.js');
  eq(S.validateGravelPart(Object.assign({}, brake, { brakeSystem: 'disc-post' }), new Date()).length, 0);
  var bad = S.validateGravelPart(Object.assign({}, frame, { brakeSystem: 'disc-is-mount' }), TODAY);
  ok(bad.some(function(m){ return /brakeSystem.*not in brakeSystem/.test(m); }), bad.join('\n'));
});

test('caliperMount/rotorInterface are SPLIT: neither vocab accepts the other\'s tokens', function(){
  var brake = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'brake'; });
  var rotor = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'rotor'; });
  if(!brake || !rotor) throw new Error('no gravel brake/rotor row found in data/gravel.js');
  eq(S.validateGravelPart(Object.assign({}, brake, { mount: 'post-mount' }), new Date()).length, 0, 'post-mount IS a caliper mount');
  // the split's whole purpose: adding post-mount must not have made
  // `mount:'post-mount'` legal on a ROTOR, a value that cannot exist.
  var rotorPm = S.validateGravelPart(Object.assign({}, rotor, { mount: 'post-mount' }), TODAY);
  ok(rotorPm.some(function(m){ return /mount.*not in rotorInterface/.test(m); }), rotorPm.join('\n'));
  var caliperCl = S.validateGravelPart(Object.assign({}, brake, { mount: 'center-lock' }), TODAY);
  ok(caliperCl.some(function(m){ return /mount.*not in caliperMount/.test(m); }), caliperCl.join('\n'));
  eq(S.validateGravelPart(Object.assign({}, rotor, { mount: '6-bolt' }), new Date()).length, 0, '6-bolt is still a rotor interface');
});

// vocab-tier1 (2026-07-22): ratified square-taper BB shell token (frame bb
// field) + its matching crank spindle token — positive + negative.
test('square-taper bb is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { bb: 'square-taper' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab bb value distinct from square-taper is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 'octalink' });
  var probs = S.validateGravelPart(bad, TODAY);
  // fix/gravel-bb-steerer-split (2026-07-24): a FRAME's bb is now measured
  // against the `shell` axis, not the retired merged `bb` key — so the
  // assertion names shell. Strictly stronger than the old /not in bb/: it
  // pins WHICH axis the frame side is checked on, which is the whole point
  // of the split (a frame must never be validated against spindle tokens).
  ok(probs.some(function(m){ return /"bb".*not in shell/.test(m); }), probs.join('\n'));
});

test('square-taper is a valid crankset bb value too (same shared bb vocab as the frame field)', function(){
  var crank = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'crankset'; });
  if(!crank) throw new Error('no gravel crankset row found in data/gravel.js');
  var p = Object.assign({}, crank, { bb: 'square-taper' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('square-taper is a valid standalone bb-part spindle value', function(){
  var bbPart = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'bb'; });
  if(!bbPart) throw new Error('no gravel bb-part row found in data/gravel.js');
  var p = Object.assign({}, bbPart, { spindle: 'square-taper' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

// vocab-tier1 (2026-07-22): ratified bsa-73 shell token (Kona Sutra LTD) —
// positive + negative.
test('bsa-73 bb is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { bb: 'bsa-73' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab bb value distinct from bsa-73 is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 'bsa-100' });
  var probs = S.validateGravelPart(bad, TODAY);
  // fix/gravel-bb-steerer-split (2026-07-24): a FRAME's bb is now measured
  // against the `shell` axis, not the retired merged `bb` key — so the
  // assertion names shell. Strictly stronger than the old /not in bb/: it
  // pins WHICH axis the frame side is checked on, which is the whole point
  // of the split (a frame must never be validated against spindle tokens).
  ok(probs.some(function(m){ return /"bb".*not in shell/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified t47a-bbright shell token (Cervelo
// Aspero-5's asymmetric T47/BBright hybrid) — positive + negative.
test('t47a-bbright bb is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { bb: 't47a-bbright' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab bb value distinct from t47a-bbright is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bb: 't47a-road' });
  var probs = S.validateGravelPart(bad, TODAY);
  // fix/gravel-bb-steerer-split (2026-07-24): a FRAME's bb is now measured
  // against the `shell` axis, not the retired merged `bb` key — so the
  // assertion names shell. Strictly stronger than the old /not in bb/: it
  // pins WHICH axis the frame side is checked on, which is the whole point
  // of the split (a frame must never be validated against spindle tokens).
  ok(probs.some(function(m){ return /"bb".*not in shell/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified display-only casing/compound SKU-axis
// tokens (never feed checkBuild) — puregrip (Continental) + light-supple
// (Teravail) — positive + negative.
/** @returns {any} */
function aTire(){
  var p = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'tire'; });
  if(!p) throw new Error('no gravel tire row found in data/gravel.js');
  return p;
}

test('puregrip compound is a valid gravel tire value', function(){
  var tire = aTire();
  var p = Object.assign({}, tire, { compound: 'puregrip' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('light-supple casing is a valid gravel tire value', function(){
  var tire = aTire();
  var p = Object.assign({}, tire, { casing: 'light-supple' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

// vocab-tier1-4c (2026-07-23): ratified display-only Specialized tokens —
// gripton (compound) + 2bliss-ready (casing) — positive.
test('gripton compound is a valid gravel tire value', function(){
  var tire = aTire();
  var p = Object.assign({}, tire, { compound: 'gripton' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('2bliss-ready casing is a valid gravel tire value', function(){
  var tire = aTire();
  var p = Object.assign({}, tire, { casing: '2bliss-ready' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab compound/casing value is still caught', function(){
  var tire = aTire();
  var badCompound = Object.assign({}, tire, { compound: 'ultragrip' });
  ok(S.validateGravelPart(badCompound, TODAY).some(function(m){ return /compound.*not in compound/.test(m); }));
  var badCasing = Object.assign({}, tire, { casing: 'super-supple' });
  ok(S.validateGravelPart(badCasing, TODAY).some(function(m){ return /casing.*not in casing/.test(m); }));
});

// vocab-tier1 (2026-07-22): ratified band-28.6 front-derailleur-mount token
// (clamp-on, not brazed/bolted-boss) — positive + negative.
test('band-28.6 frontDerailleurMount is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { frontDerailleurMount: 'band-28.6' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab frontDerailleurMount value is still caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { frontDerailleurMount: 'band-31.8' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /frontDerailleurMount.*not in frontDerailleurMount/.test(m); }), probs.join('\n'));
});

// vocab-tier1 (2026-07-22): ratified dropoutType field (ported from MTB's
// dropoutType, gravel-scoped to 'sliding' only) — optional, positive +
// negative, plus proof it's absent-safe (no gravel row uses it yet).
test('a frame with no dropoutType is still valid (the field is optional)', function(){
  var frame = aFrame();
  eq(frame.dropoutType, undefined, 'sanity: no live gravel row uses dropoutType yet');
  eq(S.validateGravelPart(frame, new Date()).length, 0);
});

test('sliding dropoutType is a valid gravel frame value', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame, { dropoutType: 'sliding' });
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('an out-of-vocab dropoutType value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { dropoutType: 'horizontal' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /dropoutType.*not in dropoutType/.test(m); }), probs.join('\n'));
});

// rg-smalls-1 (2026-07-22): udh field, GRAVEL_SCHEMA's own version of the MTB
// udh bool — optional here (unlike MTB's required field), same
// positive/negative/absent-safe pattern as dropoutType above.
test('a frame with no udh is still valid (the field is optional)', function(){
  var frame = aFrame();
  var p = Object.assign({}, frame); delete p.udh;
  eq(S.validateGravelPart(p, new Date()).length, 0);
});

test('udh:true and udh:false are both valid gravel frame values', function(){
  var frame = aFrame();
  eq(S.validateGravelPart(Object.assign({}, frame, { udh: true }), new Date()).length, 0);
  eq(S.validateGravelPart(Object.assign({}, frame, { udh: false }), new Date()).length, 0);
});

test('a non-bool udh value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { udh: 'yes' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /udh.*must be true\/false/.test(m); }), probs.join('\n'));
});

test('a missing required field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame); delete bad.rearAxle;
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "rearAxle"/.test(m); }), probs.join('\n'));
});

test('an unknown category is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { cat: 'e-motor' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown gravel category/.test(m); }), probs.join('\n'));
});

test('a bad price is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { price: -5 });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /price must be a number/.test(m); }), probs.join('\n'));
});

test('verified:true without a source URL is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: undefined, lastChecked: '2026-07-01' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /valid http\(s\) source URL/.test(m); }), probs.join('\n'));
});

test('verified:true with a future lastChecked is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2099-01-01' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /lastChecked date/.test(m); }), probs.join('\n'));
});

test('verified:true with sourceType:retailer is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2026-07-01', sourceType: 'retailer' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /rejects sourceType/.test(m); }), probs.join('\n'));
});

test('an unknown stray field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { rearAxel: frame.rearAxle });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown field "rearAxel"/.test(m); }), probs.join('\n'));
});

test('a duplicate id across the catalog is caught', function(){
  var frame = aFrame();
  var probs = S.validateGravelCatalog(D.GRAVEL_PARTS.concat([Object.assign({}, frame)]), TODAY);
  ok(probs.some(function(m){ return /duplicate id/.test(m); }), probs.join('\n'));
});

test('a frontwheel row with no freehub validates clean (a front hub has no driver body)', function(){
  var fw = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'frontwheel'; });
  if(!fw) throw new Error('no gravel frontwheel row found');
  var bad = Object.assign({}, fw); delete bad.freehub;
  eq(S.validateGravelPart(bad, new Date()).length, 0);
});

test('the real gravel catalog no longer fabricates a frontwheel freehub value', function(){
  var withFreehub = D.GRAVEL_PARTS.filter(function(p){ return p.cat === 'frontwheel' && p.freehub != null; });
  eq(withFreehub.length, 0, withFreehub.map(function(p){ return p.id; }).join(', '));
});

test('a dropper diameter of "proprietary" (a rigid-seatpost-only token) is rejected', function(){
  var dp = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'dropper'; });
  if(!dp) throw new Error('no gravel dropper row found');
  var bad = Object.assign({}, dp, { diameter: 'proprietary' });
  var probs = S.validateGravelPart(bad, TODAY);
  ok(probs.some(function(m){ return /"diameter".*not in dropperDiameter/.test(m); }), probs.join('\n'));
});

test('a real dropper diameter still validates clean', function(){
  // uses the live date, not the fixed TODAY above — same staleness fix as
  // the catalog-wide tests near the top of this file: a real row's
  // lastChecked keeps advancing as sessions verify parts.
  var dp = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'dropper'; });
  if(!dp) throw new Error('no gravel dropper row found');
  eq(S.validateGravelPart(dp, new Date()).length, 0);
});

/* ---- priceBasis: price provenance (Douglas's 2026-07-22 ruling) -----------
   "verified means the pricing was verified too". Same enum + same two-way
   contract as src/schema.js — this pins that gravel didn't drift its own
   variant. */

/** @param {Object} [changes] @returns {any} */
function gravelPbRow(changes){
  var p = Object.assign({}, aFrame(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}

function aFrontWheel(){
  var p = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'frontwheel'; });
  if(!p) throw new Error('no gravel frontwheel row found in data/gravel.js');
  return p;
}
/** @param {Object} [changes] @returns {any} */
function gravelPbWheelRow(changes){
  var p = Object.assign({}, aFrontWheel(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}
test('every priceBasis vocab token is accepted on a verified gravel row', function(){
  S.GRAVEL_VOCAB.priceBasis.forEach(function(token){
    // pair-split-estimate is wheel-only — gravelPbRow's base part is a frame.
    // discontinued-no-msrp needs status:'discontinued' too (the token law).
    /** @type {any} */
    var changes = { priceBasis:token };
    if(token === 'discontinued-no-msrp') changes.status = 'discontinued';
    var row = token === 'pair-split-estimate' ? gravelPbWheelRow(changes) : gravelPbRow(changes);
    eq(S.validateGravelPart(row, TODAY).length, 0, 'expected "' + token + '" to validate');
  });
});
/* ---- TOKEN LAW (2026-07-23): discontinued-no-msrp requires status:'discontinued' ---- */
test('discontinued-no-msrp WITHOUT status:discontinued is rejected on a gravel row (the token law)', function(){
  var probs = S.validateGravelPart(gravelPbRow({ priceBasis:'discontinued-no-msrp' }), TODAY);
  ok(probs.some(function(m){ return /discontinued-no-msrp/.test(m) && /status/.test(m); }), probs.join('\n'));
});
test('discontinued-no-msrp WITH status:discontinued validates clean on a gravel row', function(){
  eq(S.validateGravelPart(gravelPbRow({ priceBasis:'discontinued-no-msrp', status:'discontinued' }), TODAY).length, 0);
});
test('pair-split-estimate validates clean on a gravel frontwheel/rearwheel row, rejected on a frame', function(){
  eq(S.validateGravelPart(gravelPbWheelRow({ priceBasis:'pair-split-estimate' }), TODAY).length, 0);
  var probs = S.validateGravelPart(gravelPbRow({ priceBasis:'pair-split-estimate' }), TODAY);
  ok(probs.some(function(m){ return /pair-split-estimate.*wheel category/.test(m); }), probs.join('\n'));
});

test('gravel priceBasis vocab is IDENTICAL to the live schema.js enum (one definition, mirrored)', function(){
  var core = require('../src/schema.js').VOCAB.priceBasis;
  eq(S.GRAVEL_VOCAB.priceBasis.join('|'), core.join('|'), 'gravel drifted its own priceBasis variant');
});

test('an out-of-vocab priceBasis is caught (gravel)', function(){
  var probs = S.validateGravelPart(gravelPbRow({ priceBasis:'msrp-probably' }), TODAY);
  ok(probs.some(function(m){ return /priceBasis.*not in/.test(m); }), probs.join('\n'));
});

test('priceBasis on an UNVERIFIED gravel row is rejected (a basis is a claim, not decoration)', function(){
  var p = gravelPbRow({ priceBasis:'msrp-confirmed' });
  delete p.verified; delete p.source; delete p.lastChecked;
  var probs = S.validateGravelPart(p, TODAY);
  ok(probs.some(function(m){ return /requires verified:true/.test(m); }), probs.join('\n'));
});

test('STAGED ROLLOUT: a verified gravel row with NO priceBasis stays legal while PRICE_BASIS_STRICT is false', function(){
  eq(S.PRICE_BASIS_STRICT, false, 'PRICE_BASIS_STRICT flipped — the backfill must be complete in EVERY catalog first');
  eq(S.validateGravelPart(gravelPbRow(), TODAY).length, 0);
});

/* ===========================================================================
   THE BB SHELL/SPINDLE SPLIT  (fix/gravel-bb-steerer-split, 2026-07-24 —
   mechanic corpus FRM-62). Before this pass ONE merged `bb` vocab of frame
   SHELL names validated BOTH frame.bb (a shell) and crankset.bb (a SPINDLE),
   which (a) made the M30/30mm spindle interface unenterable and (b) let a
   crank be filed under a shell name. Every test below fails against the
   pre-split schema. schema-road.js has always had this separation.
   ======================================================================== */
/** @returns {any} a real gravel crankset row to clone/mutate */
function aCrank(){
  var p = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'crankset'; });
  if(!p) throw new Error('no gravel crankset row found in data/gravel.js');
  return p;
}
/** @returns {any} a real gravel bottom-bracket row to clone/mutate */
function aBb(){
  var p = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'bb'; });
  if(!p) throw new Error('no gravel bb row found in data/gravel.js');
  return p;
}

test('BB split: the merged `bb` vocab key is RETIRED — a frame is measured on shell, a crank on spindle', function(){
  eq(S.GRAVEL_VOCAB.bb, undefined, 'the merged shells+spindles list must be gone, not left behind as a dead key');
  ok(S.GRAVEL_SCHEMA.frame.bb.vocab === 'shell', 'frame.bb is a SHELL standard');
  ok(S.GRAVEL_SCHEMA.crankset.bb.vocab === 'spindle', 'crankset.bb is a SPINDLE interface');
  eq(S.GRAVEL_SCHEMA.bb.shell.vocab, 'shell', 'and a BB bridges the two: its frame-facing side is a shell');
  eq(S.GRAVEL_SCHEMA.bb.spindle.vocab, 'spindle', 'its crank-facing side a spindle');
});

test('BB split: the 30mm/M30 spindle token exists and is accepted on the crank + BB spindle fields', function(){
  ok(S.GRAVEL_VOCAB.spindle.indexOf('30mm') >= 0, 'the token whose absence blocked the Praxis Zayante');
  eq(S.validateGravelPart(Object.assign({}, aCrank(), { bb: '30mm' }), new Date()).length, 0,
    'a 30mm-spindle crank validates');
  eq(S.validateGravelPart(Object.assign({}, aBb(), { spindle: '30mm' }), new Date()).length, 0,
    'and so does a 30mm-spindle bottom bracket');
  /* one spelling per interface, shared with the road side (the pf86/bb86 lesson) */
  var road = require('../src/schema-road.js');
  ok(road.LOCAL_VOCAB.crankBbRoad.indexOf('30mm') >= 0,
    'schema-road has carried this exact spelling since the road wave — gravel matches it, never invents a variant');
});

test('BB split NEGATIVE: a SHELL name on a crank and a SPINDLE name on a frame are both rejected', function(){
  /* THE WHOLE POINT. Under the merged vocab BOTH of these validated clean,
     which is how a 30mm crank could only be entered by writing a shell name
     onto its spindle field — a false interface claim in the data itself. */
  var crankProbs = S.validateGravelPart(Object.assign({}, aCrank(), { bb: 'bsa-road' }), new Date());
  ok(crankProbs.some(function(m){ return /"bb".*not in spindle/.test(m); }),
    'a frame SHELL standard is not a crank spindle interface: ' + crankProbs.join('\n'));
  var frameProbs = S.validateGravelPart(Object.assign({}, aFrame(), { bb: 'dub' }), TODAY);
  ok(frameProbs.some(function(m){ return /"bb".*not in shell/.test(m); }),
    'and a crank SPINDLE interface is not a frame shell: ' + frameProbs.join('\n'));
  var bb30 = S.validateGravelPart(Object.assign({}, aFrame(), { bb: '30mm' }), TODAY);
  ok(bb30.some(function(m){ return /"bb".*not in shell/.test(m); }),
    'specifically: 30mm is a spindle and must NEVER validate as a frame shell: ' + bb30.join('\n'));
});

test('BB split: crankset.chainline is OPTIONAL, matching schema-road (a maker may publish only Q-factor)', function(){
  eq(S.GRAVEL_SCHEMA.crankset.chainline.optional, true);
  var road = require('../src/schema-road.js');
  eq(road.ROAD_SCHEMA.crankset.chainline.optional, true, 'gravel is matching road here, not inventing a looser rule');
  var noChainline = Object.assign({}, aCrank());
  delete noChainline.chainline;
  eq(S.validateGravelPart(noChainline, new Date()).length, 0, 'a crank with no published chainline is enterable');
});

/* ===========================================================================
   TAPERED-STEERER CLASSES (same wave — mechanic corpus FRM-55/56/60)
   ======================================================================== */
test('steerer: the three two-ended taper classes are accepted, and bare "tapered" is retained as legacy', function(){
  ['tapered-1-1-8-1-1-2', 'tapered-1-1-4-1-1-2', 'tapered-1-1-8-1-1-4'].forEach(function(tok){
    ok(S.GRAVEL_VOCAB.steerer.indexOf(tok) >= 0, tok + ' must be a legal steerer value');
    // live date, not the fixed TODAY: a real row's lastChecked keeps advancing
    // (the same staleness fix the positive tests above already apply)
    eq(S.validateGravelPart(Object.assign({}, aFrame(), { steerer: tok }), new Date()).length, 0,
      tok + ' must validate on a real frame row');
  });
  ok(S.GRAVEL_VOCAB.steerer.indexOf('tapered') >= 0,
    'bare "tapered" STAYS legal: ~120 rows carry it and re-labelling them would assert an unsourced interface');
});

test('steerer: NO bulk migration happened — the legacy rows still carry bare "tapered"', function(){
  /* The policy is promote-on-re-sourcing, one row at a time. A wave that
     "helpfully" renamed them would have asserted ~120 interfaces nobody
     checked; this pins that it did not, and that no row silently claims a
     class instead. */
  var legacy = D.GRAVEL_PARTS.filter(function(p){ return p.steerer === 'tapered'; });
  ok(legacy.length > 50, 'the legacy population is still there (' + legacy.length + ' rows), un-relabelled');
  var classed = D.GRAVEL_PARTS.filter(function(p){ return typeof p.steerer === 'string' && p.steerer.indexOf('tapered-') === 0; });
  eq(classed.length, 0, 'and NO row claims a specific class yet — each promotes only on its own re-sourcing');
});

test('steerer NEGATIVE: a plausible-looking but unratified taper spelling is still caught', function(){
  var probs = S.validateGravelPart(Object.assign({}, aFrame(), { steerer: 'tapered-1-5-8-1-1-2' }), TODAY);
  ok(probs.some(function(m){ return /"steerer".*not in steerer/.test(m); }), probs.join('\n'));
});
