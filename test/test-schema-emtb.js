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
