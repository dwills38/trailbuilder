'use strict';
/* Behavior-parity harness for refactor/inline-testability.
   For each extracted module, computes results with the OLD inline-formula
   (hand-copied verbatim from the pre-refactor index.html, captured in this
   file's comments) and the NEW module function, over the REAL catalog, and
   asserts byte-identical output. Exits non-zero on any mismatch. */
var path = require('path');
var ROOT = 'D:/MTB Bike Builder/.claude/worktrees/dreamy-cohen-d4bb74';

var C = require(path.join(ROOT, 'src/compat.js'));
var Pricing = require(path.join(ROOT, 'src/pricing.js'));
var Facets = require(path.join(ROOT, 'src/facets.js'));
var RF = require(path.join(ROOT, 'src/range-filters.js'));
var FS = require(path.join(ROOT, 'src/format-sizes.js'));

var PARTS = C.PARTS, byId = C.byId, buildTotals = C.buildTotals, esc = C.esc;

var failures = 0;
function assertEq(label, oldVal, newVal){
  var o = JSON.stringify(oldVal), n = JSON.stringify(newVal);
  if(o !== n){
    failures++;
    console.log('MISMATCH [' + label + ']: old=' + o + ' new=' + n);
  }
}

/* ---- 1. Complete-bike save/sale basis (H-2) ------------------------------ */
function bikeFillsResolved(p){
  var r = {}; Object.keys(p.fills).forEach(function(k){ r[k] = byId(p.fills[k]); }); return r;
}
var bikes = PARTS.filter(function(p){ return p.cat === 'completebike'; });
console.log('Checking ' + bikes.length + ' complete bikes (save/sale basis)...');
bikes.forEach(function(p){
  var partsTotal = buildTotals(bikeFillsResolved(p), {}).price;
  // OLD (pre-refactor index.html, bikeCardEl + renderCompleteBikeBlock):
  var oldSave = partsTotal - p.price;
  var oldSale = p.streetPrice ? p.streetPrice : null;
  var neu = Pricing.completeBikeSaveBasis(p, partsTotal);
  assertEq('save:' + p.id, oldSave, neu.save);
  assertEq('sale:' + p.id, oldSale, neu.sale);
  assertEq('headline:' + p.id, p.price, neu.headline);
});

/* ---- 1b. MSRP sort comparators ------------------------------------------- */
console.log('Checking price-asc/price-desc sort parity over all ' + bikes.length + ' bikes...');
function oldAsc(a, b){ return ((a.price||0)-(b.price||0)); }
function oldDesc(a, b){ return ((b.price||0)-(a.price||0)); }
var oldSortedAsc = bikes.slice().sort(function(a,b){ return oldAsc(a,b) || 0; }).map(function(p){ return p.id; });
var newSortedAsc = bikes.slice().sort(function(a,b){ return Pricing.msrpCompareAsc(a,b) || 0; }).map(function(p){ return p.id; });
assertEq('sort-asc-order', oldSortedAsc, newSortedAsc);
var oldSortedDesc = bikes.slice().sort(function(a,b){ return oldDesc(a,b) || 0; }).map(function(p){ return p.id; });
var newSortedDesc = bikes.slice().sort(function(a,b){ return Pricing.msrpCompareDesc(a,b) || 0; }).map(function(p){ return p.id; });
assertEq('sort-desc-order', oldSortedDesc, newSortedDesc);

/* ---- 2. Facet derivations over the whole catalog ------------------------- */
console.log('Checking facet derivations over ' + PARTS.length + ' parts...');
function oldBbFamily(shell){
  var BB_FAMILY = { BSA68:'threaded', BSA73:'threaded', BSA83:'threaded', T47:'threaded', PF92:'pressfit', PF107:'pressfit', PF865:'pressfit' };
  return BB_FAMILY[shell] || shell;
}
function oldActuationOf(p){
  if(p.cat==='shifter' || p.cat==='derailleur') return p.actuation || null;
  if(p.cat==='groupset' && p.fills){
    var src = byId(p.fills.shifter) || byId(p.fills.derailleur);
    return src ? (src.actuation || null) : null;
  }
  return null;
}
function oldCbMaterialOf(p){
  if(p.cat!=='completebike' || !p.fills) return null;
  var fr = byId(p.fills.frame);
  return fr ? (fr.material || null) : null;
}
function oldCbActuationOf(p){
  if(p.cat!=='completebike' || !p.fills) return null;
  var src = byId(p.fills.shifter) || byId(p.fills.derailleur);
  return src ? (src.actuation || null) : null;
}
function oldCbFrontTravelOf(p){
  if(p.cat!=='completebike' || !p.fills) return null;
  var fk = byId(p.fills.fork);
  return (fk && typeof fk.travel==='number') ? fk.travel : null;
}
function oldCbRearTravelOf(p){
  if(p.cat!=='completebike' || !p.fills) return null;
  var fr = byId(p.fills.frame);
  if(!fr) return null;
  if(fr.suspension==='hardtail') return 0;
  return typeof fr.travel==='number' ? fr.travel : null;
}
function oldFrameRearTravelOf(p){
  if(p.cat!=='frame') return null;
  if(p.suspension==='hardtail') return 0;
  return typeof p.travel==='number' ? p.travel : null;
}
function oldFrameForkTravelOf(p){
  if(p.cat!=='frame') return null;
  if(typeof p.designForkTravel==='number') return p.designForkTravel;
  return typeof p.maxForkTravel==='number' ? p.maxForkTravel : null;
}
PARTS.forEach(function(p){
  if(p.cat === 'bb') assertEq('bbFamily:' + p.id, oldBbFamily(p.shell), Facets.bbFamily(p.shell));
  assertEq('actuationOf:' + p.id, oldActuationOf(p), Facets.actuationOf(p, byId));
  assertEq('cbMaterialOf:' + p.id, oldCbMaterialOf(p), Facets.cbMaterialOf(p, byId));
  assertEq('cbActuationOf:' + p.id, oldCbActuationOf(p), Facets.cbActuationOf(p, byId));
  assertEq('cbFrontTravelOf:' + p.id, oldCbFrontTravelOf(p), Facets.cbFrontTravelOf(p, byId));
  assertEq('cbRearTravelOf:' + p.id, oldCbRearTravelOf(p), Facets.cbRearTravelOf(p, byId));
  assertEq('frameRearTravelOf:' + p.id, oldFrameRearTravelOf(p), Facets.frameRearTravelOf(p));
  assertEq('frameForkTravelOf:' + p.id, oldFrameForkTravelOf(p), Facets.frameForkTravelOf(p));
});

/* ---- 3. Range-filter matrix: counts under OLD literal predicate vs NEW --- */
console.log('Checking slider filter counts across a range matrix...');
var RANGE_AXES = [
  { label:'forkTravelRange', cat:'fork', field:'travel', eps:0 },
  { label:'shockEyeRange', cat:'shock', field:'eye', eps:0 },
  { label:'shockStrokeRange', cat:'shock', field:'stroke', eps:1e-9 },
  { label:'dropperDropRange', cat:'dropper', field:'drop', eps:0 },
  { label:'tireWidthRange', cat:'tire', field:'width', eps:1e-9 },
  { label:'frameRearTravelRange', cat:'frame', getter:oldFrameRearTravelOf, newGetter:Facets.frameRearTravelOf, eps:0 },
  { label:'frameForkTravelRange', cat:'frame', getter:oldFrameForkTravelOf, newGetter:Facets.frameForkTravelOf, eps:0 },
  { label:'cbFrontTravelRange', cat:'completebike', getter:oldCbFrontTravelOf, newGetter:function(p){ return Facets.cbFrontTravelOf(p, byId); }, eps:0 },
  { label:'cbRearTravelRange', cat:'completebike', getter:oldCbRearTravelOf, newGetter:function(p){ return Facets.cbRearTravelOf(p, byId); }, eps:0 }
];
var TEST_RANGES = [[0,50],[50,100],[100,150],[150,200],[160,180],[0,1000]];
RANGE_AXES.forEach(function(axis){
  var getOld = axis.getter || function(p){ return p.cat===axis.cat ? p[axis.field] : undefined; };
  var getNew = axis.newGetter || getOld;
  var eps = axis.eps;
  TEST_RANGES.forEach(function(range){
    var lo = range[0], hi = range[1];
    var oldCount = PARTS.filter(function(p){
      if(p.cat !== axis.cat) return true;
      var v = getOld(p);
      if(v == null) return true;
      return v >= lo - eps && v <= hi + eps;
    }).length;
    var newCount = PARTS.filter(function(p){
      if(p.cat !== axis.cat) return true;
      var v = getNew(p);
      if(v == null) return true;
      return RF.rangeMatch(v, lo, hi, eps);
    }).length;
    assertEq(axis.label + '@[' + lo + ',' + hi + ']', oldCount, newCount);
  });
});

/* ---- 4. formatSizes over every frame with a `sizes` map ------------------ */
console.log('Checking formatSizes over every sized frame...');
function oldFormatSizes(sizes){
  var SIZE_FIELD_LABELS = { seatTubeLen:'seat tube', maxInsert:'max insert' };
  return Object.keys(sizes).map(function(sz){
    var fields = sizes[sz] || {};
    var bits = Object.keys(fields).map(function(k){ return fields[k]+' mm '+(SIZE_FIELD_LABELS[k] || k); });
    return esc(sz)+': '+esc(bits.join(', '));
  }).join(' · ');
}
var sizedFrames = PARTS.filter(function(p){ return p.cat === 'frame' && p.sizes; });
console.log('  (' + sizedFrames.length + ' sized frames found)');
sizedFrames.forEach(function(p){
  assertEq('formatSizes:' + p.id, oldFormatSizes(p.sizes), FS.formatSizes(p.sizes, esc));
});

/* ---- summary -------------------------------------------------------------- */
if(failures){
  console.log('\n' + failures + ' MISMATCH(ES) FOUND — parity FAILED.');
  process.exit(1);
} else {
  console.log('\nAll parity checks passed — byte-identical old vs new across the full catalog.');
}
