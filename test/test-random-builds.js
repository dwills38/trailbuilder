'use strict';
/* RANDOM SAMPLE BUILDS — generateSampleBuild() must, across many seeds and every
   theme, produce builds that are (a) COMPLETE per slotRequired (the same frame-
   and rear-wheel-aware completeness the UI uses) and (b) have ZERO checkBuild
   errors. These are the honesty guarantees behind the toolbar's sample buttons:
   they exist to showcase the checker, so a sample build must never be a red one.
   Also pins determinism (same seed -> same build) and the per-theme character
   (mullet is 29/27.5, DH skips the dropper, price bands are ordered). */
var U = require('./test-util.js');
var C = U.C, B = U.B, eq = U.eq, ok = U.ok;

/** @type {string[]} */
var THEME_KEYS = C.SAMPLE_THEMES.map(function(t){ return t.key; });
var SEEDS = 50;

/** Generate for a theme+seed and assert it succeeded, returning the ok-branch
 * (narrowing SampleBuildResult so callers can read .build/.frameId/etc under
 * tsc). The generator's contract is that every theme completes within budget.
 * @param {string} key @param {number} seed
 * @returns {{ok: true, theme: *, build: Object.<string,string>, presetBy: Object.<string,string>, frameId: string, warnings: number}} */
function genOk(key, seed){
  var g = C.generateSampleBuild(key, C.mulberry32(seed));
  if(!g.ok) throw new Error('theme ' + key + ' seed ' + seed + ' failed to generate (ok:false)');
  return g;
}

/** Slots still missing from a resolved build under slotRequired (frame- and
 * rear-wheel-aware), mirroring generateSampleBuild's own final completeness
 * gate and the UI's "N of M required" math. @param {Object.<string,string>} idBuild @returns {string[]} */
function missingSlots(idBuild){
  var build = B(idBuild);
  var frame = build.frame || null;
  var rw = C.effectiveWheel(build, 'rear');
  return C.SLOTS.filter(function(s){
    return C.slotRequired(s, frame, rw) && !C.wheelPositionFilled(build, s.key);
  }).map(function(s){ return s.key; });
}

/* ---- the core property: complete + error-free across seeds x themes ---- */
THEME_KEYS.forEach(function(key){
  test('theme "' + key + '": ' + SEEDS + ' seeded builds are all complete and error-free', function(){
    for(var seed = 1; seed <= SEEDS; seed++){
      var g = genOk(key, seed);
      var res = C.checkBuild(B(g.build));
      eq(res.errors.length, 0, 'theme ' + key + ' seed ' + seed + ' has errors: ' + res.errors.map(String).join(' | '));
      var missing = missingSlots(g.build);
      eq(missing.length, 0, 'theme ' + key + ' seed ' + seed + ' is incomplete, missing: ' + missing.join(','));
      // presets are ignored by design — every slot is an individual part
      eq(Object.keys(g.presetBy).length, 0, 'theme ' + key + ' should not set presetBy');
    }
  });
});

/* ---- determinism: same seed -> byte-identical build ---- */
test('same seed produces the same build (every theme)', function(){
  THEME_KEYS.forEach(function(key){
    var a = genOk(key, 1234);
    var b = genOk(key, 1234);
    eq(JSON.stringify(a.build), JSON.stringify(b.build), 'theme ' + key + ' not deterministic');
    eq(a.frameId, b.frameId, 'theme ' + key + ' frame not deterministic');
  });
});

test('different seeds produce different builds (not a constant)', function(){
  // Across a spread of seeds a theme should yield more than one distinct build.
  THEME_KEYS.forEach(function(key){
    /** @type {Object.<string, boolean>} */ var seen = {};
    for(var seed = 1; seed <= 20; seed++){
      seen[JSON.stringify(genOk(key, seed).build)] = true;
    }
    ok(Object.keys(seen).length > 1, 'theme ' + key + ' produced only one build across 20 seeds');
  });
});

/* ---- per-theme character ---- */
test('mullet builds are 29 front / 27.5 rear', function(){
  for(var seed = 1; seed <= SEEDS; seed++){
    var b = B(genOk('mullet', seed).build);
    eq(b.frontWheel && b.frontWheel.wheel, '29', 'mullet seed ' + seed + ' front wheel not 29');
    eq(b.rearWheel && b.rearWheel.wheel, '275', 'mullet seed ' + seed + ' rear wheel not 275');
    eq(b.frontTire && b.frontTire.wheel, '29', 'mullet seed ' + seed + ' front tire not 29');
    eq(b.rearTire && b.rearTire.wheel, '275', 'mullet seed ' + seed + ' rear tire not 275');
    ok(!!b.frame && (b.frame.wheelConfigs || []).indexOf('mullet') >= 0, 'mullet seed ' + seed + ' frame is not mullet-capable');
  }
});

test('DH builds ship a rigid post, not a dropper (seat exemption retired 2026-07-22 — DH bikes run rigid posts)', function(){
  // The seat position is now required on EVERY frame (Douglas 2026-07-22: "every
  // bike requires some post and DH bikes often have rigid posts"). genOk already
  // asserts the build is complete per slotRequired, so a filled seat is implied;
  // this additionally pins that a DH frame ships the realistic RIGID post
  // (defaultSeatpostCat = 'seatpost' for dh), not a dropper.
  for(var seed = 1; seed <= SEEDS; seed++){
    var g = genOk('dh', seed);
    ok(!!g.build.seatpost, 'dh seed ' + seed + ' must ship a rigid seatpost (the seat position is now required)');
    ok(!g.build.dropper, 'dh seed ' + seed + ' should run a rigid post, not a dropper');
    var frame = B(g.build).frame;
    ok(!!frame && (frame.disciplines || []).indexOf('dh') >= 0, 'dh seed ' + seed + ' frame is not a DH frame');
  }
});

test('hardtail builds have a hardtail frame and no shock (slotRequired exempts it)', function(){
  for(var seed = 1; seed <= SEEDS; seed++){
    var g = genOk('hardtail', seed);
    ok(!g.build.shock, 'hardtail seed ' + seed + ' unexpectedly has a shock');
    var frame = B(g.build).frame;
    ok(!!frame && frame.suspension === 'hardtail', 'hardtail seed ' + seed + ' frame is not suspension:hardtail');
  }
});

test('price bands are ordered: budget < mid < high on average', function(){
  /** @param {string} key @returns {number} */
  function avgPrice(key){
    var sum = 0;
    for(var seed = 1; seed <= SEEDS; seed++){
      sum += C.buildTotals(B(genOk(key, seed).build), {}).price;
    }
    return sum / SEEDS;
  }
  var b = avgPrice('budget'), m = avgPrice('mid'), h = avgPrice('high');
  ok(b < m, 'budget avg ($' + Math.round(b) + ') should be below mid avg ($' + Math.round(m) + ')');
  ok(m < h, 'mid avg ($' + Math.round(m) + ') should be below high avg ($' + Math.round(h) + ')');
});

/* ---- an unknown theme fails cleanly (no throw, ok:false) ---- */
test('an unknown theme returns ok:false without throwing', function(){
  var g = C.generateSampleBuild('nonexistent-theme', C.mulberry32(1));
  eq(g.ok, false);
  eq(g.theme, null);
});
