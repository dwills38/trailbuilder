'use strict';
/* ACCOUNT / GARAGE SERIALIZATION — a saved build's stored payload is the SAME
   {b:build, p:presetBy} shape as a share link, and it is re-validated through the
   exact same sanitizeShare() on load. This proves the garage inherits share-link
   safety for free: id-migration via canonicalId, the slot-category guard, and the
   preset-belongs-to-its-group guard. No network — pure logic (src/compat.js). */
var U = require('./test-util.js');
var C = U.C, eq = U.eq, ok = U.ok;

/** first catalog id in a category (robust to catalog churn) @param {string} cat @returns {string} */
function firstOf(cat){
  var p = C.PARTS.find(function(x){ return x.cat === cat; });
  if(!p) throw new Error('no catalog part in category ' + cat);
  return p.id;
}
/** a slot key whose expected category is `cat` @param {string} cat @returns {string} */
function slotForCat(cat){
  var s = C.SLOTS.find(function(x){ return x.cat === cat; });
  if(!s) throw new Error('no slot for category ' + cat);
  return s.key;
}
/** @param {string} k @param {string} v @returns {Object.<string,string>} */
function one(k, v){ var o = /** @type {Object.<string,string>} */ ({}); o[k] = v; return o; }

test('a saved build payload round-trips through sanitizeShare unchanged', function(){
  // representative build across simple (slot===cat) and split (slot!==cat) slots
  /** @type {Object.<string,string>} */
  var map = {
    frame: firstOf('frame'), fork: firstOf('fork'), shock: firstOf('shock'),
    frontWheel: firstOf('frontwheel'), rearWheel: firstOf('rearwheel'),
    frontTire: firstOf('tire'), rearTire: firstOf('tire'),
    dropper: firstOf('dropper'), saddle: firstOf('saddle'), pedals: firstOf('pedal')
  };
  var clean = C.sanitizeShare(map, {});
  Object.keys(map).forEach(function(slot){
    eq(clean.build[slot], map[slot], 'slot ' + slot + ' should survive the round-trip');
  });
});

test('a stored preset selection survives when it belongs to its group', function(){
  var gs = C.PARTS.find(function(p){ return p.cat === 'groupset'; });
  if(!gs) throw new Error('catalog has no groupset preset');
  var clean = C.sanitizeShare({}, { drivetrain: gs.id });
  eq(clean.presetBy.drivetrain, gs.id, 'a groupset preset stays on the drivetrain group');
});

test('a retired id in a saved build resolves through canonicalId on load', function(){
  var aliasKey = Object.keys(C.ALIASES)[0];
  ok(aliasKey, 'catalog has at least one alias to test');
  var canon = C.ALIASES[aliasKey];
  eq(C.canonicalId(aliasKey), canon, 'canonicalId maps the retired id');
  var cp = C.byId(canon);
  if(!cp) throw new Error('alias target ' + canon + ' is not a live part');
  var slot = slotForCat(cp.cat);
  var clean = C.sanitizeShare(one(slot, aliasKey), {});
  eq(clean.build[slot], canon, 'the retired id is migrated to its canonical id');
});

test('a category-mismatched id in a saved build is dropped (slot guard)', function(){
  // a tire id parked in the fork slot must NOT load — same guard share links get
  var clean = C.sanitizeShare({ fork: firstOf('tire') }, {});
  eq(clean.build.fork, undefined, 'a tire cannot occupy the fork slot');
});

test('an unknown id in a saved build is dropped', function(){
  var clean = C.sanitizeShare({ frame: 'zz-not-a-real-id' }, {});
  eq(clean.build.frame, undefined, 'an unknown id is silently dropped, never thrown');
});
