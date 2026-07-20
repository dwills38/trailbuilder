'use strict';
/* RIDER KIT (Kit Builder) — the kit catalog validates, kitTotals sums correctly,
   the kit schema cross-rules BITE, and kit stays ISOLATED from the bike engine.
   Kit has zero checkBuild rules (decisions #3 + #4), so the "fit verdict" tests
   live elsewhere — here we prove the data contract + totals + isolation. */
var U = require('./test-util.js');
var S = require('../src/schema.js');
var K = require('../src/kit.js');
var eq = U.eq, ok = U.ok, some = U.some;

var TODAY = new Date('2026-07-19T00:00:00Z');
var kitCat = { PARTS: K.KIT_PARTS, SLOTS: K.KIT_SLOTS };
var ctx = S._ctx(kitCat, TODAY);
/** @param {*} part @returns {string[]} */
function probs(part){ return S.validatePart(part, ctx); }
// clone a real kit part and override some fields
/** @param {string} id @param {Object} [changes] @returns {*} */
function over(id, changes){ return Object.assign({}, K.kitById(id), changes); }
// look up a kit part expected to exist (throws otherwise) — the kit analog of
// test-util's part(), keeping tests free of null-checks under strict tsc.
/** @param {string} id @returns {import('../src/types.js').KitPart} */
function kp(id){ var p = K.kitById(id); if(!p) throw new Error('unknown kit part id: ' + id); return p; }

/* ---- the catalog is valid ------------------------------------------------- */
test('the kit seed passes full schema validation (0 problems)', function(){
  var p = S.validateCatalog(kitCat);
  eq(p.length, 0, 'kit data problems:\n  - ' + p.join('\n  - '));
});
test('every one of the 12 kit categories has at least one seed product', function(){
  K.KIT_CATS.forEach(function(cat){
    ok(K.KIT_PARTS.some(function(p){ return p.cat === cat; }), 'no seed product for category ' + cat);
  });
  eq(K.KIT_CATS.length, 12, 'expected 12 kit categories');
});
test('no kit id collides with a bike part id', function(){
  U.C.PARTS.forEach(function(bp){ ok(!K.kitById(bp.id), 'bike id ' + bp.id + ' also exists in the kit catalog'); });
});

/* ---- isolation: kit never enters the bike engine -------------------------- */
test('no kit category is a bike build slot (kit never reaches checkBuild)', function(){
  var bikeSlotCats = U.C.SLOTS.map(function(s){ return String(s.cat); });
  K.KIT_CATS.forEach(function(cat){ ok(bikeSlotCats.indexOf(cat) < 0, 'kit cat ' + cat + ' leaked into bike SLOTS'); });
});
test('no kit part appears in the bike catalog (compat.js PARTS)', function(){
  /** @type {Object.<string, boolean>} */ var kitIds = {}; K.KIT_PARTS.forEach(function(p){ kitIds[p.id] = true; });
  U.C.PARTS.forEach(function(p){ ok(!kitIds[p.id], p.id + ' should not be in the bike PARTS'); });
});
test('every kit slot is optional (kit never gates completeness)', function(){
  K.KIT_SLOTS.forEach(function(s){ eq(s.optional, true, 'kit slot ' + s.key + ' must be optional'); });
});

/* ---- kitTotals ------------------------------------------------------------ */
test('kitTotals of an empty build is zero', function(){
  var t = K.kitTotals({});
  eq(t.price, 0); eq(t.weight, 0); eq(t.missingWeight, false); eq(t.count, 0);
});
test('kitTotals sums price + weight and counts selected pieces', function(){
  var helmet = kp('hm-fox-speedframe-pro'), gloves = kp('glv-fox-dirtpaw');
  var t = K.kitTotals({ helmet: helmet, gloves: gloves });
  eq(t.price, helmet.price + gloves.price);
  eq(t.weight, (helmet.weight || 0) + (gloves.weight || 0));
  eq(t.count, 2); eq(t.missingWeight, false);
});
test('kitTotals flags missingWeight when a selected piece has no weight', function(){
  // a deliberately-partial stub (no weight) — cast past the strict KitPart param
  var t = K.kitTotals(/** @type {*} */ ({ helmet: { id:'x', cat:'helmet', price:100 } }));
  eq(t.price, 100); eq(t.weight, 0); eq(t.missingWeight, true); eq(t.count, 1);
});
test('kitTotals ignores keys that are not real kit slots', function(){
  var t = K.kitTotals(/** @type {*} */ ({ notASlot: { price:999, weight:999 } }));
  eq(t.count, 0); eq(t.price, 0);
});

/* ---- the schema cross-rules BITE (a validator that never fails is worthless) */
test('a valid seed helmet has no problems', function(){
  eq(probs(K.kitById('hm-fox-speedframe-pro')).length, 0);
});
test('helmet type outside its vocab is caught', function(){
  some(probs(over('hm-fox-speedframe-pro', { type:'aero' })), 'type');
});
test('helmet missing its required type is caught', function(){
  var p = over('hm-fox-speedframe-pro'); delete p.type; some(probs(p), 'type');
});
test('shoes missing required soleType is caught', function(){
  var p = over('sho-fiveten-freerider-pro'); delete p.soleType; some(probs(p), 'soleType');
});
test('a cert not valid for the category is caught (helmet cannot carry a body-armor cert)', function(){
  some(probs(over('hm-fox-speedframe-pro', { certs:['en1621-2-l2'] })), 'not valid for a helmet');
});
test('a valid category cert passes (body armor + EN 1621-2 L2)', function(){
  eq(probs(over('arm-fox-baseframe-pro', { certs:['en1621-2-l2'] })).length, 0);
});
test('a neck brace cert is caught — no published standard yet (empty allowed set)', function(){
  some(probs(over('nkb-atlas-vision', { certs:['en1078'] })), 'not valid for a neckbrace');
});
test('rotational on a non-helmet is caught (unknown field — helmet-only)', function(){
  some(probs(over('sho-fiveten-freerider-pro', { rotational:'mips' })), 'unknown field');
});
test('rheon (Kali\'s proprietary rotational system) is a valid helmet rotational value', function(){
  var p = over('hm-poc-cularis', { rotational:'rheon' });
  eq(probs(p).length, 0, 'rheon should validate on a helmet: ' + probs(p).join('; '));
});
test('soleType on a non-shoe is caught (unknown field — shoes-only)', function(){
  some(probs(over('jsy-fox-flexair', { soleType:'flat' })), 'unknown field');
});
test('a cert on a category that carries none is caught (jersey — unknown field)', function(){
  some(probs(over('jsy-fox-flexair', { certs:['cpsc'] })), 'unknown field');
});

/* ---- sizeList + sizeChart ------------------------------------------------- */
test('an empty size list is caught', function(){
  some(probs(over('jsy-fox-flexair', { sizes:[] })), 'sizes');
});
test('a non-string size label is caught', function(){
  some(probs(over('jsy-fox-flexair', { sizes:['S', 42] })), 'size labels');
});
test('a sizeChart measure not allowed for the category is caught', function(){
  // helmet charts may only declare `head`; a `chest` measure is a mis-tagged row
  some(probs(over('hm-fox-speedframe-pro', { sizeChart:{ M:{ chest:[94,99] } } })), 'not allowed for helmet');
});
test('a reversed sizeChart range (lo > hi) is caught', function(){
  some(probs(over('hm-fox-speedframe-pro', { sizeChart:{ M:{ head:[59,55] } } })), 'head');
});
test('a valid seed sizeChart passes (helmet head ranges)', function(){
  eq(probs(K.kitById('hm-fox-speedframe-pro')).length, 0);
});
