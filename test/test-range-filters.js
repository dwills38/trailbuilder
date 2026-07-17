'use strict';
/* SLIDER/FILTER COMPOSITION (2026-07-16 headline feature) — pins the generic
   pieces behind index.html's SUBFILTERS/RANGEFILTERS tables: distinct-value
   scanning, bounds, preferred ordering, the float-epsilon range predicate,
   and — the audit's top-flagged gap (H-3) — that two engaged filters compose
   as AND, not OR, and that an out-of-scope/unengaged axis is always a no-op.
   Fixtures are synthetic (not the live catalog) so this suite pins the
   MECHANISM, independent of catalog churn. */
var RF = require('../src/range-filters.js');
var eq = require('./test-util.js').eq, ok = require('./test-util.js').ok;

/* ---- distinctVals() -------------------------------------------------------- */
test('distinctVals collects first-seen distinct values in catalog order, skipping null', function(){
  var parts = [{cat:'fork',travel:160},{cat:'fork',travel:180},{cat:'fork',travel:160},{cat:'fork',travel:null},{cat:'shock',travel:120}];
  var vals = RF.distinctVals(parts, function(p){ return p.cat==='fork'; }, function(p){ return p.travel; });
  eq(vals.join(','), '160,180');
});
test('distinctVals returns an empty array when nothing matches pred', function(){
  eq(RF.distinctVals([{cat:'fork'}], function(p){ return p.cat==='shock'; }, function(p){ return p.travel; }).length, 0);
});

/* ---- numBoundsOf() ---------------------------------------------------------- */
test('numBoundsOf returns the min/max over matching parts', function(){
  var parts = [{cat:'shock',eye:190},{cat:'shock',eye:230},{cat:'shock',eye:210}];
  eq(JSON.stringify(RF.numBoundsOf(parts, function(p){ return p.cat==='shock'; }, function(p){ return p.eye; })), '{"lo":190,"hi":230}');
});
test('numBoundsOf returns null when no part carries the field', function(){
  eq(RF.numBoundsOf([{cat:'shock'}], function(p){ return p.cat==='fork'; }, function(p){ return p.travel; }), null);
});

/* ---- inOrder() -------------------------------------------------------------- */
test('inOrder sorts listed values by the preferred order', function(){
  eq(RF.inOrder(['hardtail','full'], ['full','hardtail']).join(','), 'full,hardtail');
});
test('inOrder places unlisted values after every ordered value, in catalog order', function(){
  eq(RF.inOrder(['ti','carbon','mystery-material','alu'], ['carbon','alu','steel','ti']).join(','), 'carbon,alu,ti,mystery-material');
});

/* ---- rangeMatch() ----------------------------------------------------------- */
test('rangeMatch is true inside the bounds, false outside, with no epsilon', function(){
  ok(RF.rangeMatch(160, 150, 180));
  ok(RF.rangeMatch(150, 150, 180));   // inclusive lo
  ok(RF.rangeMatch(180, 150, 180));   // inclusive hi
  ok(!RF.rangeMatch(149, 150, 180));
  ok(!RF.rangeMatch(181, 150, 180));
});
test('rangeMatch epsilon rescues a half-step value that would otherwise miss its own bound (shockStrokeRange\'s 27.5/32.5 problem)', function(){
  // Without slack, 32.5 checked against hi=32.5 can fail to float rounding;
  // the epsilon exists precisely so a slider's own bound always matches itself.
  ok(RF.rangeMatch(32.5, 27.5, 32.5, 1e-9));
  ok(RF.rangeMatch(27.5, 27.5, 32.5, 1e-9));
});
test('rangeMatch epsilon does not admit a value genuinely outside the range', function(){
  ok(!RF.rangeMatch(33, 27.5, 32.5, 1e-9));
  ok(!RF.rangeMatch(27, 27.5, 32.5, 1e-9));
});

/* ---- subFiltersMatch(): AND composition, out-of-scope pass-through -------- */
/** @param {*} p @param {*} v */
function materialMatch(p, v){ return p.cat!=='frame' || !p.material || p.material===v; }
/** @param {*} p @param {*} v */
function suspensionMatch(p, v){ return p.cat!=='frame' || p.suspension===v; }
var MATERIAL_SF = { id:'frameMaterial', match:materialMatch };
var SUSPENSION_SF = { id:'frameSuspension', match:suspensionMatch };

test('subFiltersMatch: an untouched ("all") axis is a no-op', function(){
  var p = { cat:'frame', material:'carbon', suspension:'full' };
  ok(RF.subFiltersMatch([MATERIAL_SF], { frameMaterial:'all' }, p));
});
test('subFiltersMatch: two engaged filters compose as AND, not OR', function(){
  var p = { cat:'frame', material:'carbon', suspension:'full' };
  // Both match -> passes
  ok(RF.subFiltersMatch([MATERIAL_SF, SUSPENSION_SF], { frameMaterial:'carbon', frameSuspension:'full' }, p));
  // One mismatches -> the WHOLE composition fails, proving AND (an OR would still pass on the material match)
  ok(!RF.subFiltersMatch([MATERIAL_SF, SUSPENSION_SF], { frameMaterial:'carbon', frameSuspension:'hardtail' }, p));
  ok(!RF.subFiltersMatch([MATERIAL_SF, SUSPENSION_SF], { frameMaterial:'alu', frameSuspension:'full' }, p));
});
test('subFiltersMatch: an out-of-scope part (wrong cat) always passes every axis, engaged or not', function(){
  var stem = { cat:'stem' };
  ok(RF.subFiltersMatch([MATERIAL_SF, SUSPENSION_SF], { frameMaterial:'carbon', frameSuspension:'full' }, stem));
});
test('subFiltersMatch: an in-scope part with an unknown/absent value passes a material-style (absence-passes) axis', function(){
  var p = { cat:'frame', suspension:'full' };   // no material field
  ok(RF.subFiltersMatch([MATERIAL_SF], { frameMaterial:'carbon' }, p));
});

/* ---- rangeFiltersMatch(): AND composition over sliders -------------------- */
/** @param {*} p @param {number} lo @param {number} hi */
function forkTravelMatch(p, lo, hi){ if(p.cat!=='fork') return true; if(p.travel==null) return true; return RF.rangeMatch(p.travel, lo, hi); }
/** @param {*} p @param {number} lo @param {number} hi */
function tireWidthMatch(p, lo, hi){ if(p.cat!=='tire') return true; if(p.width==null) return true; return RF.rangeMatch(p.width, lo, hi, 1e-9); }
var FORK_TRAVEL_RF = { id:'forkTravelRange', match:forkTravelMatch };
var TIRE_WIDTH_RF = { id:'tireWidthRange', match:tireWidthMatch };

test('rangeFiltersMatch: an untouched (absent) axis is a no-op', function(){
  var fork = { cat:'fork', travel:200 };
  ok(RF.rangeFiltersMatch([FORK_TRAVEL_RF], {}, fork));
});
test('rangeFiltersMatch: two engaged sliders compose as AND across two different cats\' parts', function(){
  var state = { forkTravelRange:{lo:150,hi:170}, tireWidthRange:{lo:2.3,hi:2.6} };
  var forkInRange = { cat:'fork', travel:160 };
  var forkOutOfRange = { cat:'fork', travel:200 };
  var tireInRange = { cat:'tire', width:2.5 };
  var tireOutOfRange = { cat:'tire', width:2.1 };
  ok(RF.rangeFiltersMatch([FORK_TRAVEL_RF, TIRE_WIDTH_RF], state, forkInRange));
  ok(!RF.rangeFiltersMatch([FORK_TRAVEL_RF, TIRE_WIDTH_RF], state, forkOutOfRange));
  ok(RF.rangeFiltersMatch([FORK_TRAVEL_RF, TIRE_WIDTH_RF], state, tireInRange));
  ok(!RF.rangeFiltersMatch([FORK_TRAVEL_RF, TIRE_WIDTH_RF], state, tireOutOfRange));
  // out-of-scope part (a frame) passes both engaged sliders untouched
  ok(RF.rangeFiltersMatch([FORK_TRAVEL_RF, TIRE_WIDTH_RF], state, { cat:'frame' }));
});
