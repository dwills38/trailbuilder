'use strict';
/* Re-measures finding #1 of BIAS-AUDIT-2026-07-19 after the rotor-fill
   correction wave: per-maker count of complete bikes whose stock build
   raises the front/rear-rotor-interface warning pair on checkBuild. */
var C = require('../src/compat.js');
var bikes = C.PARTS.filter(function(p){ return p.cat === 'completebike'; });

function fillsResolved(bike){
  var build = {};
  Object.keys(bike.fills).forEach(function(slot){ build[slot] = C.byId(bike.fills[slot]); });
  return build;
}

var rotorWarnBikes = [];
bikes.forEach(function(bike){
  var r = C.checkBuild(fillsResolved(bike));
  var hit = r.warnings.filter(function(v){ return String(v.ruleId).indexOf('rotor-interface') >= 0; });
  if(hit.length) rotorWarnBikes.push({ id: bike.id, maker: bike.brand, count: hit.length, documented: !!bike.rotorAdapterDocumented });
});

var byMaker = {};
rotorWarnBikes.forEach(function(b){ (byMaker[b.maker] = byMaker[b.maker] || []).push(b); });

console.log('=== bikes still raising the rotor-interface warning pair: ' + rotorWarnBikes.length + ' (of ' + bikes.length + ') ===\n');
Object.keys(byMaker).sort(function(a, b){ return byMaker[b].length - byMaker[a].length; }).forEach(function(mk){
  var list = byMaker[mk];
  var docCount = list.filter(function(b){ return b.documented; }).length;
  console.log(mk + ': ' + list.length + ' (' + docCount + ' documented no-real-CL-SKU exception' + (docCount === 1 ? '' : 's') + ')');
});
console.log('\nAll ' + rotorWarnBikes.length + ' remaining hits documented (rotorAdapterDocumented:true)? ' +
  rotorWarnBikes.every(function(b){ return b.documented; }));
