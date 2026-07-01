'use strict';
/* SCHEMA VALIDATOR — prove the validator actually BITES. A validator that never
   fails is worthless, so these feed it deliberately broken data and require it
   to complain. */
var U = require('./test-util.js');
var S = require('../src/schema.js');
var eq = U.eq, some = U.some;
var C = U.C;

var TODAY = new Date('2026-06-21T00:00:00Z');
var ctx = S._ctx(C, TODAY);
/** @param {*} part @returns {string[]} */
function probs(part){ return S.validatePart(part, ctx); }
// clone a real part and override some fields
/** @param {string} id @param {Object} [changes] @returns {*} */
function over(id, changes){ return Object.assign({}, C.byId(id), changes); }

test('a valid real part has no problems', function(){
  eq(probs(C.byId('fr-megatower')).length, 0);
});
test('missing required field is caught', function(){
  var p = over('fr-megatower'); delete p.wheelConfigs; some(probs(p), 'wheelConfigs');
});
test('bad enum value is caught', function(){
  some(probs(over('fr-megatower', { wheelConfigs:['30'] })), 'wheelConfigs');
});
test('unknown / misspelled field is caught', function(){
  some(probs(over('rw-reserve', { frehub:'XD' })), 'unknown field');
});
test('wrong type is caught', function(){
  some(probs(over('fr-megatower', { seatTube:'big' })), 'seatTube');
});
test('dangling id reference is caught', function(){
  some(probs(over('fr-enduro', { bundledShock:'sh-nope' })), 'bundledShock');
});
test('verified:true without a source is caught', function(){
  some(probs(over('fr-megatower', { verified:true })), 'source');
});
test('verified:true with a future date is caught', function(){
  some(probs(over('fr-megatower', { verified:true, source:'https://x.com/s', lastChecked:'2099-01-01' })), 'lastChecked');
});
test('verified:true with a bogus URL is caught', function(){
  some(probs(over('fr-megatower', { verified:true, source:'notaurl', lastChecked:'2025-01-01' })), 'source');
});
test('verified:true with good provenance passes', function(){
  eq(probs(over('fr-megatower', { verified:true, source:'https://example.com/spec', lastChecked:'2025-01-01' })).length, 0);
});
test('preset filling a wrong-category part is caught', function(){
  var p = over('ws-roval', { fills:{ frontWheel:'fr-megatower', rearWheel:'rw-roval' } });
  some(probs(p), 'category');
});
test('preset with a dangling fill reference is caught', function(){
  var p = over('ws-roval', { fills:{ frontWheel:'fw-nope', rearWheel:'rw-roval' } });
  some(probs(p), 'fw-nope');
});
test('catalog-level: a duplicate id is caught', function(){
  var cat = { PARTS: C.PARTS.concat([ U.part('fr-megatower') ]), SLOTS: C.SLOTS };
  some(S.validateCatalog(cat, TODAY), 'duplicate');
});
test('catalog-level: a groupset that mixes systems is caught', function(){
  var bad = /** @type {any} */ (Object.assign({}, C.byId('gs-gx-t')));
  bad.id = 'gs-bad';
  bad.fills = Object.assign({}, bad.fills, { cassette:'ca-xt' }); // Shimano cassette in a SRAM Transmission group
  var cat = { PARTS: C.PARTS.concat([ bad ]), SLOTS: C.SLOTS };
  some(S.validateCatalog(cat, TODAY), 'system');
});
test('catalog-level: a frame bundling a non-fitting shock is caught', function(){
  var f = /** @type {any} */ (Object.assign({}, C.byId('fr-megatower'), { id:'fr-badbundle', bundledShock:'sh-sd-trun' })); // 205x65 trunnion != 230x65 std
  some(S.validateCatalog({ PARTS: C.PARTS.concat([ f ]), SLOTS: C.SLOTS }, TODAY), 'does not fit');
});
test('catalog-level: an OEM shock with a broken back-link is caught', function(){
  var s = /** @type {any} */ (Object.assign({}, C.byId('sh-vivid-oem'), { id:'sh-badoem', forFrame:'fr-megatower' })); // megatower does not bundle it
  some(S.validateCatalog({ PARTS: C.PARTS.concat([ s ]), SLOTS: C.SLOTS }, TODAY), 'bidirectional');
});
