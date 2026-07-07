'use strict';
/* ENGINE FORTRESS — properties that must hold for EVERY part and a large number
   of pseudo-random builds. These don't assert specific compatibility verdicts
   (test-engine.js does that); they lock down the engine's structural contract:
   it never throws, never returns malformed output, is deterministic, and every
   preset/lookup is internally consistent. A regression that crashes the engine
   or makes a verdict non-deterministic gets caught here. */
var U = require('./test-util.js');
var C = U.C, B = U.B, eq = U.eq, ok = U.ok;

/** @typedef {import('../src/types.js').Part} Part */
/** @typedef {import('../src/types.js').Build} Build */

/* ---- helpers ------------------------------------------------------------- */
/** @type {Object.<string, Part[]>} */
var byCat = {};
C.PARTS.forEach(function(p){ (byCat[p.cat] = byCat[p.cat] || []).push(p); });

// deterministic PRNG (LCG) so any fuzz failure is reproducible from its seed
/** @param {number} seed @returns {() => number} */
function rng(seed){ var s = seed >>> 0; return function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

/** Build a pseudo-random (possibly partial, possibly nonsensical) build.
 * @param {() => number} rand @returns {Build} */
function randomBuild(rand){
  /** @type {Build} */ var b = {};
  C.SLOTS.forEach(function(s){
    if(rand() < 0.5){ var list = byCat[s.cat] || []; if(list.length) b[s.key] = list[Math.floor(rand() * list.length)]; }
  });
  return b;
}

/** @typedef {import('../src/types.js').Verdict} Verdict */

/** @param {{errors:Verdict[],warnings:Verdict[],infos:Verdict[]}} r */
function assertResultShape(r){
  ok(r && Array.isArray(r.errors) && Array.isArray(r.warnings) && Array.isArray(r.infos), 'checkBuild result shape');
}
/** @type {Object.<string, boolean>} */
var VALID_SLOTS = {};
C.SLOTS.forEach(function(s){ VALID_SLOTS[s.key] = true; });
/** Every verdict must be structurally sound AND display-clean. @param {Verdict} v @param {string} at */
function assertVerdict(v, at){
  ok(typeof v.ruleId === 'string' && v.ruleId.length > 0, 'ruleId ' + at);
  ok(Array.isArray(v.slots) && v.slots.length > 0, 'slots ' + at);
  v.slots.forEach(function(s){ ok(VALID_SLOTS[s], 'unknown slot "' + s + '" in ' + v.ruleId + ' ' + at); });
  var m = String(v);
  ok(typeof v.msg === 'string' && v.msg.length > 0 && m === v.msg, 'msg/toString ' + at);
  ok(m.indexOf('undefined') < 0 && m.indexOf('NaN') < 0 && m.indexOf('[object') < 0, 'clean message ' + at + ': ' + m);
}

var FUZZ = 300;

/* ---- lookups & display --------------------------------------------------- */
test('byId round-trips every catalog part, and returns null for unknown ids', function(){
  C.PARTS.forEach(function(p){ eq(C.byId(p.id), p, 'byId('+p.id+')'); });
  eq(C.byId('definitely-not-a-real-id'), null);
  eq(C.byId(''), null);
});
test('part ids are unique', function(){
  /** @type {Object.<string, boolean>} */ var seen = {};
  C.PARTS.forEach(function(p){ ok(!seen[p.id], 'duplicate id '+p.id); seen[p.id] = true; });
});
test('nameOf and specSummary return non-empty strings for every part (never throw)', function(){
  C.PARTS.forEach(function(p){
    var n = C.nameOf(p); ok(typeof n === 'string' && n.length > 0, 'nameOf '+p.id);
    var s = C.specSummary(p); ok(typeof s === 'string' && s.length > 0, 'specSummary '+p.id);
  });
});

/* ---- checkBuild contract -------------------------------------------------- */
test('checkBuild on an empty build is clean and well-formed', function(){
  var r = C.checkBuild({});
  assertResultShape(r);
  eq(r.errors.length, 0); eq(r.warnings.length, 0); eq(r.infos.length, 0);
});
test('checkBuild never throws and is deterministic over '+FUZZ+' random builds', function(){
  var rand = rng(20260628);
  for(var i = 0; i < FUZZ; i++){
    var b = randomBuild(rand);
    var a = C.checkBuild(b), c = C.checkBuild(b);
    assertResultShape(a);
    eq(JSON.stringify(a), JSON.stringify(c), 'checkBuild deterministic (seed iter '+i+')');
  }
});
test('every verdict is structurally sound with a clean message, over '+FUZZ+' builds', function(){
  // A rule that interpolates a missing/misread field leaks "undefined" or "NaN"
  // into the verdict text; a rule with a bad ruleId/slots list breaks the dot
  // diffing. This catches both classes over the whole catalog.
  var rand = rng(0xBADF00D);
  for(var i = 0; i < FUZZ; i++){
    var r = C.checkBuild(randomBuild(rand));
    assertResultShape(r);
    [r.errors, r.warnings, r.infos].forEach(function(arr){
      arr.forEach(function(v){ assertVerdict(v, '(iter '+i+')'); });
    });
  }
});

/* ---- compatOf contract ---------------------------------------------------- */
test('compatOf is neutral on an empty build for every part', function(){
  C.PARTS.forEach(function(p){ eq(C.compatOf(p, {}).state, 'n', 'compatOf('+p.id+', {})'); });
});
test('compatOf returns a valid state + reason, never throws, over random builds', function(){
  var rand = rng(777);
  for(var i = 0; i < FUZZ; i++){
    var b = randomBuild(rand);
    var p = C.PARTS[Math.floor(rand() * C.PARTS.length)];
    var c = C.compatOf(p, b);
    ok(c && /^[grn]$/.test(c.state), 'state for '+p.id+' iter '+i);
    ok(typeof c.reason === 'string' && c.reason.length > 0, 'reason for '+p.id+' iter '+i);
  }
});
test('a green dot never hides a newly-introduced conflict, over '+FUZZ+' builds', function(){
  // Dot honesty: if compatOf says green, there must be a real placement that adds NO
  // new error (by set membership, not error count). Catches a false "fits" - the
  // worst kind of wrong verdict - for both single parts and presets.
  /** @type {Object.<string, string[]>} */ var slotKeys = {};
  C.SLOTS.forEach(function(s){ (slotKeys[s.cat] = slotKeys[s.cat] || []).push(s.key); });
  // Diff by verdictKey, matching the engine's own dot diffing (string identity
  // was the REVIEW #4/#13 masking bug).
  /** @param {Verdict[]} before @param {Verdict[]} after @returns {number} */
  function newCount(before, after){
    var keys = before.map(C.verdictKey);
    return after.filter(function(e){ return keys.indexOf(C.verdictKey(e)) < 0; }).length;
  }
  var rand = rng(24680);
  for(var i = 0; i < FUZZ; i++){
    var bld = randomBuild(rand);
    if(Object.keys(bld).length === 0) continue;
    var p = C.PARTS[Math.floor(rand() * C.PARTS.length)];
    if(C.compatOf(p, bld).state !== 'g') continue;
    var clean = false;
    if('fills' in p && p.fills){
      var pf = p.fills;
      // Baseline clears the slots the preset fills (same contract as the
      // single-part branch below) - diffing against the un-cleared build would
      // excuse errors masked by a byte-identical pre-existing string (REVIEW #4).
      /** @type {Build} */ var pbase = Object.assign({}, bld);
      Object.keys(pf).forEach(function(s){ delete pbase[s]; });
      /** @type {Build} */ var test = Object.assign({}, pbase);
      Object.keys(pf).forEach(function(s){ test[s] = /** @type {Part} */ (C.byId(pf[s])); });
      clean = newCount(C.checkBuild(pbase).errors, C.checkBuild(test).errors) === 0;
    } else {
      var slots = slotKeys[p.cat] || [];
      clean = slots.some(function(sk){
        /** @type {Build} */ var base = Object.assign({}, bld); delete base[sk];
        /** @type {Build} */ var t = Object.assign({}, base); t[sk] = p;
        return newCount(C.checkBuild(base).errors, C.checkBuild(t).errors) === 0;
      });
    }
    ok(clean, 'green dot but every placement adds a conflict: '+p.id+' (iter '+i+')');
  }
});

/* ---- buildTotals contract ------------------------------------------------- */
test('buildTotals on an empty build is zeroed', function(){
  var t = C.buildTotals({}, {});
  eq(t.price, 0); eq(t.weight, 0); eq(t.missingWeight, false);
});
test('buildTotals never throws and stays non-negative over random builds', function(){
  var rand = rng(31337);
  for(var i = 0; i < FUZZ; i++){
    var t = C.buildTotals(randomBuild(rand), {});
    ok(typeof t.price === 'number' && t.price >= 0, 'price >= 0 iter '+i);
    ok(typeof t.weight === 'number' && t.weight >= 0, 'weight >= 0 iter '+i);
    ok(typeof t.missingWeight === 'boolean', 'missingWeight bool iter '+i);
  }
});

/* ---- presets are internally consistent ----------------------------------- */
test("every preset's own parts are mutually compatible (its fills build cleanly)", function(){
  C.PARTS.forEach(function(p){
    if(!('fills' in p) || !p.fills) return;
    var r = C.checkBuild(B(p.fills));
    eq(r.errors.length, 0, p.id+' fills have internal conflicts: '+r.errors.join('; '));
  });
});
test('every preset is billed as its bundle price when its exact fills are chosen', function(){
  /** @type {Object.<string, string>} */ var presetGroup = {};
  C.GROUPS.forEach(function(g){ if(g.preset) presetGroup[g.preset.cat] = g.key; });
  C.PARTS.forEach(function(p){
    if(!('fills' in p) || !p.fills) return;
    var gkey = presetGroup[p.cat]; ok(gkey, p.id+' preset maps to a group');
    /** @type {Object.<string, string>} */ var presetBy = {}; presetBy[gkey] = p.id;
    eq(C.buildTotals(B(p.fills), presetBy).price, p.price, p.id+' bundle price');
  });
});
test("every preset fill points at an existing part of the slot's category", function(){
  /** @type {Object.<string, string>} */ var slotCat = {};
  C.SLOTS.forEach(function(s){ slotCat[s.key] = s.cat; });
  C.PARTS.forEach(function(p){
    if(!('fills' in p) || !p.fills) return;
    var fills = p.fills;
    Object.keys(fills).forEach(function(slot){
      var c = C.byId(fills[slot]);
      ok(c, p.id+' fills '+slot+' -> missing part '+fills[slot]);
      ok(c && slotCat[slot] === c.cat, p.id+' fills '+slot+' expects '+slotCat[slot]+' got '+(c && c.cat));
    });
  });
});
