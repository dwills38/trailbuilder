'use strict';
/* STRIDER SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema-bmx.js's positive/
   negative pattern for src/schema-strider.js against data/striders.js.

   NOTE (scope): src/schema-strider.js was the one catalog validator with NO
   test file at all — validate.js's "STRIDER OK" line was its only exercise.
   This file was created by the priceBasis work (2026-07-22) and deliberately
   covers only the catalog-clean positive plus the price-provenance contract it
   introduced. The rest of the strider validator (wheel/tire/brake vocab, seat
   ranges, required fields, the stray-field guard) is still UNTESTED — a real,
   pre-existing gap worth its own pass, not something this branch invented. */
var D = require('../data/striders.js');
var S = require('../src/schema-strider.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

/* Live date, not a pinned constant — the same staleness fix test-schema-road.js
   and test-schema-emtb.js carry: real rows' lastChecked keeps advancing as
   sessions verify bikes, so a hardcoded past TODAY starts failing the positive
   tests the day after it's written. The negative cases below are all
   date-independent. */
var TODAY = new Date();

// a real balance-bike row to clone/mutate (throws if the catalog somehow ships
// none, rather than silently testing `undefined`)
/** @returns {any} */
function aBike(){
  var p = D.STRIDER_PARTS.find(function(x){ return x.cat === 'balancebike'; });
  if(!p) throw new Error('no balancebike row found in data/striders.js');
  return p;
}

test('the real strider catalog validates clean', function(){
  var probs = S.validateStriderCatalog(D.STRIDER_PARTS, TODAY);
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real strider bike has no problems', function(){
  eq(S.validateStriderPart(aBike(), TODAY).length, 0);
});

/* ---- priceBasis: price provenance (Douglas's 2026-07-22 ruling) -----------
   "verified means the pricing was verified too". Same enum + same two-way
   contract as src/schema.js — this pins that strider didn't drift its own
   variant. */

/** a verified baseline row, so these don't ride whatever provenance the live
 * row happens to carry (which drifts with every verification wave) */
/** @param {Object} [changes] @returns {any} */
function striderPbRow(changes){
  var p = Object.assign({}, aBike(), { verified:true, source:'https://example.com/spec', lastChecked:'2026-06-01' });
  delete p.sourceType; delete p.weightSource;
  return Object.assign(p, changes || {});
}

test('every priceBasis vocab token is accepted on a verified strider row', function(){
  S.STRIDER_VOCAB.priceBasis.forEach(function(token){
    eq(S.validateStriderPart(striderPbRow({ priceBasis:token }), TODAY).length, 0, 'expected "' + token + '" to validate');
  });
});

test('strider priceBasis vocab is IDENTICAL to the live schema.js enum (one definition, mirrored)', function(){
  var core = require('../src/schema.js').VOCAB.priceBasis;
  eq(S.STRIDER_VOCAB.priceBasis.join('|'), core.join('|'), 'strider drifted its own priceBasis variant');
});

test('an out-of-vocab priceBasis is caught (strider)', function(){
  var probs = S.validateStriderPart(striderPbRow({ priceBasis:'msrp-probably' }), TODAY);
  ok(probs.some(function(m){ return /priceBasis.*not in/.test(m); }), probs.join('\n'));
});

test('priceBasis on an UNVERIFIED strider row is rejected (a basis is a claim, not decoration)', function(){
  var p = striderPbRow({ priceBasis:'msrp-confirmed' });
  delete p.verified; delete p.source; delete p.lastChecked;
  var probs = S.validateStriderPart(p, TODAY);
  ok(probs.some(function(m){ return /requires verified:true/.test(m); }), probs.join('\n'));
});

test('STAGED ROLLOUT: a verified strider row with NO priceBasis stays legal while PRICE_BASIS_STRICT is false', function(){
  eq(S.PRICE_BASIS_STRICT, false, 'PRICE_BASIS_STRICT flipped — the backfill must be complete in EVERY catalog first');
  eq(S.validateStriderPart(striderPbRow(), TODAY).length, 0);
});
