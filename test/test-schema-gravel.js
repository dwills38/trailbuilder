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
  ok(probs.some(function(m){ return /bb.*not in bb/.test(m); }), probs.join('\n'));
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
  ok(probs.some(function(m){ return /bb.*not in bb/.test(m); }), probs.join('\n'));
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
  ok(probs.some(function(m){ return /bb.*not in bb/.test(m); }), probs.join('\n'));
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
  var dp = D.GRAVEL_PARTS.find(function(x){ return x.cat === 'dropper'; });
  if(!dp) throw new Error('no gravel dropper row found');
  eq(S.validateGravelPart(dp, TODAY).length, 0);
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

test('every priceBasis vocab token is accepted on a verified gravel row', function(){
  S.GRAVEL_VOCAB.priceBasis.forEach(function(token){
    eq(S.validateGravelPart(gravelPbRow({ priceBasis:token }), TODAY).length, 0, 'expected "' + token + '" to validate');
  });
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
