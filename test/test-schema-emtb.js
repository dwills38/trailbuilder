'use strict';
/* EMTB SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema-gravel.js's positive/
   negative pattern for src/schema-emtb.js against data/emtb.js. */
var D = require('../data/emtb.js');
var S = require('../src/schema-emtb.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

var TODAY = new Date('2026-07-20T00:00:00Z');

// a real e-MTB row to clone/mutate for negative tests (throws if the catalog
// somehow ships no bikes, rather than silently testing `undefined`)
/** @returns {any} */
function aBike(){
  var p = D.EMTB_PARTS.find(function(x){ return x.cat === 'emtb'; });
  if(!p) throw new Error('no emtb row found in data/emtb.js');
  return p;
}

test('the real emtb catalog validates clean', function(){
  // live date, not the pinned TODAY below — the same staleness fix
  // test-schema-gravel.js and test-schema-road.js carry: real rows'
  // lastChecked keeps advancing, so a hardcoded past TODAY forces
  // workers to backdate (emtb-breadth-1 had to). Pinned TODAY stays
  // for the crafted negative cases below, which need a stable reference.
  var probs = S.validateEmtbCatalog(D.EMTB_PARTS, new Date());
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real emtb bike has no problems', function(){
  var p = aBike();
  eq(S.validateEmtbPart(p, new Date()).length, 0);
});

test('an out-of-vocab motorBrand value is caught', function(){
  var bad = Object.assign({}, aBike(), { motorBrand: 'acme-motors' });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /motorBrand.*not in motorBrand/.test(m); }), probs.join('\n'));
});

test('a missing required field is caught', function(){
  var bad = Object.assign({}, aBike()); delete bad.motorTorque;
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "motorTorque"/.test(m); }), probs.join('\n'));
});

test('a missing required battery field is caught', function(){
  var bad = Object.assign({}, aBike()); delete bad.batteryWh;
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "batteryWh"/.test(m); }), probs.join('\n'));
});

test('an unknown category is rejected', function(){
  var bad = Object.assign({}, aBike(), { cat: 'ebike-motor' });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown emtb category/.test(m); }), probs.join('\n'));
});

test('a bad price is caught', function(){
  var bad = Object.assign({}, aBike(), { price: -5 });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /price must be a number/.test(m); }), probs.join('\n'));
});

test('the suspension<->travelRear cross-rule fires (full with 0 rear travel)', function(){
  var bad = Object.assign({}, aBike(), { suspension: 'full', travelRear: 0 });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /suspension:"full" requires travelRear > 0/.test(m); }), probs.join('\n'));
});

test('the suspension<->travelRear cross-rule fires (hardtail with rear travel)', function(){
  var bad = Object.assign({}, aBike(), { suspension: 'hardtail', travelRear: 150 });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /suspension:"hardtail" requires travelRear === 0/.test(m); }), probs.join('\n'));
});

test('verified:true without a source URL is rejected', function(){
  var bad = Object.assign({}, aBike(), { verified: true, source: undefined, lastChecked: '2026-07-01' });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /valid http\(s\) source URL/.test(m); }), probs.join('\n'));
});

test('verified:true with a future lastChecked is rejected', function(){
  var bad = Object.assign({}, aBike(), { verified: true, source: 'https://example.com/x', lastChecked: '2099-01-01' });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /lastChecked date/.test(m); }), probs.join('\n'));
});

test('verified:true with sourceType:retailer is rejected', function(){
  var bad = Object.assign({}, aBike(), { verified: true, source: 'https://example.com/x', lastChecked: '2026-07-01', sourceType: 'retailer' });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /rejects sourceType/.test(m); }), probs.join('\n'));
});

test('an unknown stray field is caught', function(){
  var bad = Object.assign({}, aBike(), { motorTorqe: 85 });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown field "motorTorqe"/.test(m); }), probs.join('\n'));
});

test('a duplicate id across the catalog is caught', function(){
  var probs = S.validateEmtbCatalog(D.EMTB_PARTS.concat([Object.assign({}, aBike())]), TODAY);
  ok(probs.some(function(m){ return /duplicate id/.test(m); }), probs.join('\n'));
});

test('status:"recalled" validates clean (the recall watcher can mark an e-MTB recalled)', function(){
  var p = Object.assign({}, aBike(), { status: 'recalled' });
  eq(S.validateEmtbPart(p, TODAY).length, 0);
});

test('an out-of-vocab status value is still caught', function(){
  var bad = Object.assign({}, aBike(), { status: 'banana' });
  var probs = S.validateEmtbPart(bad, TODAY);
  ok(probs.some(function(m){ return /status "banana" not in/.test(m); }), probs.join('\n'));
});

/* ---- priceBasis: price provenance (Douglas's 2026-07-22 ruling) -----------
   "verified means the pricing was verified too". Same enum + same two-way
   contract as src/schema.js — this pins that e-MTB didn't drift its own
   variant. ('regional-conversion' matters most here: most e-MTB makers are
   European and publish a EUR price only.) */

/** @param {Object} [changes] @returns {any} */
function emtbPbRow(changes){
  var p = Object.assign({}, aBike(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}

test('every priceBasis vocab token is accepted on a verified emtb row, except the wheel-only pair-split-estimate', function(){
  S.EMTB_VOCAB.priceBasis.forEach(function(token){
    if(token === 'pair-split-estimate') return; // this catalog has no wheel category — see the dedicated rejection test below
    // discontinued-no-msrp needs status:'discontinued' too (the token law).
    /** @type {any} */
    var changes = { priceBasis:token };
    if(token === 'discontinued-no-msrp') changes.status = 'discontinued';
    eq(S.validateEmtbPart(emtbPbRow(changes), TODAY).length, 0, 'expected "' + token + '" to validate');
  });
});
/* ---- TOKEN LAW (2026-07-23): discontinued-no-msrp requires status:'discontinued' ---- */
test('discontinued-no-msrp WITHOUT status:discontinued is rejected on an emtb row (the token law)', function(){
  var probs = S.validateEmtbPart(emtbPbRow({ priceBasis:'discontinued-no-msrp' }), TODAY);
  ok(probs.some(function(m){ return /discontinued-no-msrp/.test(m) && /status/.test(m); }), probs.join('\n'));
});
test('discontinued-no-msrp WITH status:discontinued validates clean on an emtb row', function(){
  eq(S.validateEmtbPart(emtbPbRow({ priceBasis:'discontinued-no-msrp', status:'discontinued' }), TODAY).length, 0);
});
test('pair-split-estimate is rejected on every emtb row (no wheel category exists in this catalog)', function(){
  var probs = S.validateEmtbPart(emtbPbRow({ priceBasis:'pair-split-estimate' }), TODAY);
  ok(probs.some(function(m){ return /pair-split-estimate.*wheel category/.test(m); }), probs.join('\n'));
});

test('emtb priceBasis vocab is IDENTICAL to the live schema.js enum (one definition, mirrored)', function(){
  var core = require('../src/schema.js').VOCAB.priceBasis;
  eq(S.EMTB_VOCAB.priceBasis.join('|'), core.join('|'), 'emtb drifted its own priceBasis variant');
});

test('an out-of-vocab priceBasis is caught (emtb)', function(){
  var probs = S.validateEmtbPart(emtbPbRow({ priceBasis:'msrp-probably' }), TODAY);
  ok(probs.some(function(m){ return /priceBasis.*not in/.test(m); }), probs.join('\n'));
});

test('priceBasis on an UNVERIFIED emtb row is rejected (a basis is a claim, not decoration)', function(){
  var p = emtbPbRow({ priceBasis:'msrp-confirmed' });
  delete p.verified; delete p.source; delete p.lastChecked;
  var probs = S.validateEmtbPart(p, TODAY);
  ok(probs.some(function(m){ return /requires verified:true/.test(m); }), probs.join('\n'));
});

test('STAGED ROLLOUT: a verified emtb row with NO priceBasis stays legal while PRICE_BASIS_STRICT is false', function(){
  eq(S.PRICE_BASIS_STRICT, false, 'PRICE_BASIS_STRICT flipped — the backfill must be complete in EVERY catalog first');
  eq(S.validateEmtbPart(emtbPbRow(), TODAY).length, 0);
});
