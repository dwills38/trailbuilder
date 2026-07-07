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
  eq(probs(C.byId('fr-santacruz-megatower-cc')).length, 0);
});
test('missing required field is caught', function(){
  var p = over('fr-santacruz-megatower-cc'); delete p.wheelConfigs; some(probs(p), 'wheelConfigs');
});
test('bad enum value is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { wheelConfigs:['30'] })), 'wheelConfigs');
});
test('unknown / misspelled field is caught', function(){
  some(probs(over('rw-reserve-30-hd-29', { frehub:'XD' })), 'unknown field');
});
test('wrong type is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { seatTube:'big' })), 'seatTube');
});
test('dangling id reference is caught', function(){
  some(probs(over('fr-specialized-enduro-sworks', { bundledShock:'sh-nope' })), 'bundledShock');
});
test('shifter missing actuation is caught', function(){
  var p = over('sft-sram-gx-eagle'); delete p.actuation; some(probs(p), 'actuation');
});
test('actuation value outside the vocab is caught', function(){
  some(probs(over('dr-sram-gx-eagle-axs', { actuation:'hydraulic' })), 'actuation');
});
test('crankset missing ringStd is caught', function(){
  var p = over('cr-shimano-xt-m8100'); delete p.ringStd; some(probs(p), 'ringStd');
});
test('brake leverClamp outside its own (narrower) vocab is caught', function(){
  some(probs(over('bk-sram-code-rsc', { leverClamp:'band' })), 'leverClamp');
});
test('a frame without the suspension discriminator is caught', function(){
  var p = over('fr-santacruz-megatower-cc'); delete p.suspension; some(probs(p), 'suspension');
});
test('a full-suspension frame missing its shock block is caught', function(){
  var p = over('fr-santacruz-megatower-cc'); delete p.shockEye; some(probs(p), 'shockEye');
});
test('a hardtail carrying shock fields is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { suspension:'hardtail' })), 'must not carry');
});
test('a valid hardtail frame passes (hardtails are enterable now)', function(){
  var p = over('fr-santacruz-megatower-cc', { suspension:'hardtail' });
  delete p.shockEye; delete p.shockStroke; delete p.shockMount; delete p.travel; delete p.bundledShock;
  eq(probs(p).length, 0);
});
test('a disciplines value outside the vocab is caught (ebike is deliberately not one)', function(){
  some(probs(over('fr-santacruz-megatower-cc', { disciplines:['enduro','ebike'] })), 'disciplines');
});
test('an empty disciplines array is caught (absence already means universal)', function(){
  some(probs(over('fr-santacruz-megatower-cc', { disciplines:[] })), 'disciplines');
});
test('bad family slug is caught (must be lowercase slug)', function(){
  some(probs(over('fr-raaw-madonna-v3', { family:'RAAW Madonna' })), 'family');
});
test('modelYear outside the sane range is caught', function(){
  some(probs(over('fr-raaw-madonna-v3', { modelYear:190 })), 'modelYear');
});
test('tire casing outside the vocab is caught', function(){
  some(probs(over('ti-maxxis-assegai-29-25-exop-mg', { casing:'super-gravity' })), 'casing');
});
test('frame sizes with an unknown per-size key is caught', function(){
  some(probs(over('fr-raaw-madonna-v3', { sizes:{ M:{ maxInser:280 } } })), 'unknown key');
});
test('frame sizes with a non-positive value is caught', function(){
  some(probs(over('fr-raaw-madonna-v3', { sizes:{ M:{ maxInsert:0 } } })), 'positive');
});
test('a valid frame sizes map passes', function(){
  // unverified fixture on purpose: the frozen test date predates the verified
  // rows' lastChecked, which would add an unrelated provenance problem
  eq(probs(over('fr-santacruz-megatower-cc', { sizes:{ S:{ seatTubeLen:395, maxInsert:220 }, M:{ maxInsert:245 } } })).length, 0);
});
test('id with the wrong category prefix is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { id:'fk-santacruz-megatower-cc' })), 'prefix');
});
test('id with bad charset (uppercase) is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { id:'fr-SantaCruz-megatower' })), 'lowercase');
});
test('id with too few tokens is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { id:'fr-megatower' })), 'tokens');
});
test('verified:true without a source is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true })), 'source');
});
test('verified:true with a future date is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'https://x.com/s', lastChecked:'2099-01-01' })), 'lastChecked');
});
test('verified:true with a bogus URL is caught', function(){
  some(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'notaurl', lastChecked:'2025-01-01' })), 'source');
});
test('verified:true with good provenance passes', function(){
  eq(probs(over('fr-santacruz-megatower-cc', { verified:true, source:'https://example.com/spec', lastChecked:'2025-01-01' })).length, 0);
});
test('preset filling a wrong-category part is caught', function(){
  var p = over('ws-roval-traverse-hd-29', { fills:{ frontWheel:'fr-santacruz-megatower-cc', rearWheel:'rw-roval-traverse-hd-29' } });
  some(probs(p), 'category');
});
test('preset with a dangling fill reference is caught', function(){
  var p = over('ws-roval-traverse-hd-29', { fills:{ frontWheel:'fw-nope', rearWheel:'rw-roval-traverse-hd-29' } });
  some(probs(p), 'fw-nope');
});
test('catalog-level: a duplicate id is caught', function(){
  var cat = { PARTS: C.PARTS.concat([ U.part('fr-santacruz-megatower-cc') ]), SLOTS: C.SLOTS };
  some(S.validateCatalog(cat, TODAY), 'duplicate');
});
test('catalog-level: a groupset that mixes systems is caught', function(){
  var bad = /** @type {any} */ (Object.assign({}, C.byId('gs-sram-gx-transmission')));
  bad.id = 'gs-bad';
  bad.fills = Object.assign({}, bad.fills, { cassette:'ca-shimano-xt-m8100-1051' }); // Shimano cassette in a SRAM Transmission group
  var cat = { PARTS: C.PARTS.concat([ bad ]), SLOTS: C.SLOTS };
  some(S.validateCatalog(cat, TODAY), 'system');
});
test('catalog-level: a frame bundling a non-fitting shock is caught', function(){
  var f = /** @type {any} */ (Object.assign({}, C.byId('fr-santacruz-megatower-cc'), { id:'fr-badbundle', bundledShock:'sh-rockshox-super-deluxe-205x65-trun' })); // 205x65 trunnion != 230x65 std
  some(S.validateCatalog({ PARTS: C.PARTS.concat([ f ]), SLOTS: C.SLOTS }, TODAY), 'does not fit');
});
test('catalog-level: an OEM shock with a broken back-link is caught', function(){
  var s = /** @type {any} */ (Object.assign({}, C.byId('sh-rockshox-vivid-ultimate-oem-205x60-trun'), { id:'sh-badoem', forFrame:'fr-santacruz-megatower-cc' })); // megatower does not bundle it
  some(S.validateCatalog({ PARTS: C.PARTS.concat([ s ]), SLOTS: C.SLOTS }, TODAY), 'bidirectional');
});
