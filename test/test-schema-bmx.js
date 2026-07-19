'use strict';
/* BMX SCHEMA VALIDATOR (OFF-LIVE) — mirrors test-schema.js's positive/negative
   pattern for src/schema-bmx.js against data/bmx.js. */
var D = require('../data/bmx.js');
var S = require('../src/schema-bmx.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

// The validator's clock: the REAL current date, matching validate.js's own
// behavior — a pinned date here goes stale and skews every future BMX
// verification wave's lastChecked (it bit wave 1 on 2026-07-18). The
// future-date negative below uses a fixed 2099 date, so it stays deterministic.
var TODAY = new Date();

// a real BMX frame row to clone/mutate for negative tests (throws if the
// catalog somehow ships no frames, rather than silently testing `undefined`)
/** @returns {any} */
function aFrame(){
  var p = D.BMX_PARTS.find(function(x){ return x.cat === 'frame'; });
  if(!p) throw new Error('no BMX frame row found in data/bmx.js');
  return p;
}

test('the real BMX catalog validates clean', function(){
  var probs = S.validateBmxCatalog(D.BMX_PARTS, TODAY);
  eq(probs.length, 0, probs.join('\n'));
});

test('a valid real BMX part has no problems', function(){
  var p = aFrame();
  eq(S.validateBmxPart(p, TODAY).length, 0);
});

test('an out-of-vocab axle value is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { rearAxle: '17mm' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /rearAxle.*not in axle/.test(m); }), probs.join('\n'));
});

test('a missing required field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame); delete bad.bbShell;
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /missing required field "bbShell"/.test(m); }), probs.join('\n'));
});

test('an unknown category is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { cat: 'e-motor' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown BMX category/.test(m); }), probs.join('\n'));
});

test('a bad price is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { price: -5 });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /price must be a number/.test(m); }), probs.join('\n'));
});

test('verified:true without a source URL is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: undefined, lastChecked: '2026-07-01' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /valid http\(s\) source URL/.test(m); }), probs.join('\n'));
});

test('verified:true with a future lastChecked is rejected', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { verified: true, source: 'https://example.com/x', lastChecked: '2099-01-01' });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /lastChecked date/.test(m); }), probs.join('\n'));
});

test('an unknown stray field is caught', function(){
  var frame = aFrame();
  var bad = Object.assign({}, frame, { bbshel: frame.bbShell });
  var probs = S.validateBmxPart(bad, TODAY);
  ok(probs.some(function(m){ return /unknown field "bbshel"/.test(m); }), probs.join('\n'));
});

test('a duplicate id across the catalog is caught', function(){
  var frame = aFrame();
  var probs = S.validateBmxCatalog(D.BMX_PARTS.concat([Object.assign({}, frame)]), TODAY);
  ok(probs.some(function(m){ return /duplicate id/.test(m); }), probs.join('\n'));
});
