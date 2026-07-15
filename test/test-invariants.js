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
    ok(c && /^[gwrn]$/.test(c.state), 'state for '+p.id+' iter '+i);
    ok(typeof c.reason === 'string' && c.reason.length > 0, 'reason for '+p.id+' iter '+i);
  }
});
test('a green or yellow dot never hides a newly-introduced error (and green hides no warning), over '+FUZZ+' builds', function(){
  // Dot honesty: if compatOf says green there must be a real placement that adds
  // NO new error AND no new warning; yellow needs a placement that adds no new
  // error (by set membership, not count). Catches a false "fits" - the worst
  // kind of wrong verdict - for both single parts and presets (REVIEW #4/#6).
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
    var state = C.compatOf(p, bld).state;
    if(state !== 'g' && state !== 'w') continue;
    /** A placement is honest for this state: no new error; green also no new warning.
     * @param {Build} base @param {Build} t @returns {boolean} */
    function honest(base, t){
      var before = C.checkBuild(base), after = C.checkBuild(t);
      if(newCount(before.errors, after.errors) !== 0) return false;
      return state === 'w' || newCount(before.warnings, after.warnings) === 0;
    }
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
      clean = honest(pbase, test);
    } else {
      var slots = slotKeys[p.cat] || [];
      clean = slots.some(function(sk){
        /** @type {Build} */ var base = Object.assign({}, bld); delete base[sk];
        /** @type {Build} */ var t = Object.assign({}, base); t[sk] = p;
        return honest(base, t);
      });
    }
    ok(clean, state+' dot but every placement adds a conflict: '+p.id+' (iter '+i+')');
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

/* ---- input guard: id-STRING builds can never silently green ---------------
   Pass-4 regression (2026-07-08): a throwaway script passed the build map as
   slotKey -> id STRING instead of resolved part objects; every field read on a
   string is undefined, so NO rule fired and a rotor-mismatch build was reported
   clean - a silent false all-clear. checkBuild/buildTotals now resolve string
   values through canonicalId()+byId() and THROW on a string matching nothing. */
test('checkBuild on an id-STRING build finds the same conflicts as the resolved build (no silent green)', function(){
  // Center Lock rotor on a 6-bolt front hub - a known-bad combo pinned in test-engine.js.
  var ids = { fork:'fk-rockshox-zeb-ultimate-29-170', frontWheel:'fw-reserve-30-hd-29', frontRotor:'ro-shimano-rtmt800-203-cl' };
  var viaStrings = C.checkBuild(/** @type {any} */ (ids));
  var viaObjects = C.checkBuild(B(ids));
  ok(viaStrings.errors.length > 0, 'string-valued build must not come back clean');
  eq(JSON.stringify(viaStrings), JSON.stringify(viaObjects), 'string and object builds must agree');
});
test('buildTotals on an id-STRING build matches the resolved-object totals', function(){
  var ids = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170' };
  var viaStrings = C.buildTotals(/** @type {any} */ (ids), {});
  var viaObjects = C.buildTotals(B(ids), {});
  ok(viaStrings.price > 0, 'totals must be non-trivial');
  eq(JSON.stringify(viaStrings), JSON.stringify(viaObjects), 'string and object totals must agree');
});
test('a legacy ALIASES id string resolves to its canonical part (ids are append-only)', function(){
  var legacy = 'sh-rockshox-super-deluxe-coil-230x65';   // retired id, kept alive in ALIASES
  var canon = /** @type {string} */ (C.canonicalId(legacy));
  ok(canon !== legacy && !!C.byId(canon), 'test premise: legacy id has a live canonical target');
  var viaAlias = C.checkBuild(/** @type {any} */ ({frame:'fr-raaw-madonna-v22', shock:legacy}));
  var viaCanon = C.checkBuild(B({frame:'fr-raaw-madonna-v22', shock:canon}));
  eq(JSON.stringify(viaAlias), JSON.stringify(viaCanon), 'alias and canonical builds must agree');
});
test('checkBuild and buildTotals THROW on a string matching no part - never a silent green', function(){
  /** @param {() => void} fn @param {string} at */
  function throws(fn, at){
    try{ fn(); }
    catch(e){ ok(String(e).indexOf('matches no catalog part') >= 0, at+' error names the problem: '+e); return; }
    throw new Error(at+': expected a throw for an unresolvable id string');
  }
  throws(function(){ C.checkBuild(/** @type {any} */ ({frame:'fr-definitely-not-a-real-id'})); }, 'checkBuild');
  throws(function(){ C.buildTotals(/** @type {any} */ ({frame:'fr-definitely-not-a-real-id'}), {}); }, 'buildTotals');
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
    // completebike is DELIBERATELY group-less (COMPLETE-BIKES-SCOPE.md §1b):
    // unlike groupset/wheelset/brakeset/cockpitset it must never be billed at
    // its stored price via presetBy - buildTotals stays the a-la-carte
    // component sum even after auto-fill, so the dual-price block can show
    // both numbers side by side. See the dedicated completebike price test below.
    if(p.cat === 'completebike') return;
    var gkey = presetGroup[p.cat]; ok(gkey, p.id+' preset maps to a group');
    /** @type {Object.<string, string>} */ var presetBy = {}; presetBy[gkey] = p.id;
    eq(C.buildTotals(B(p.fills), presetBy).price, p.price, p.id+' bundle price');
  });
});
test('a completebike is NEVER billed as a bundle price - buildTotals stays the component sum even naming it in presetBy', function(){
  C.PARTS.filter(function(p){ return p.cat === 'completebike'; }).forEach(function(p){
    var build = B(p.fills);
    var alaCarte = C.buildTotals(build, {}).price;
    // completebike has no GROUPS entry, so no group key names it in presetBy -
    // buildTotals ignores completebike entirely as a bundle-billing source.
    /** @type {Object.<string, string>} */ var presetBy = { frame: p.id };
    eq(C.buildTotals(build, presetBy).price, alaCarte, p.id+' presetBy cannot make buildTotals substitute the completebike price');
    ok(alaCarte >= p.price, p.id+' a-la-carte component sum ('+alaCarte+') should be >= the complete-bike price ('+p.price+') - the value insight');
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
