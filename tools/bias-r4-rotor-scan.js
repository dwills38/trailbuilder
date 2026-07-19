'use strict';
/* bias-r4-rotor-scan.js — one-off scan: which completebikes' rotor fill
   mount disagrees with their stock wheel's rotorMount. Read-only. Prints
   bike id, maker, wheel brand/rotorMount, current rotor fill id/mount,
   and (if one exists) a same-brand-family rotor row with the correct mount
   so the repoint target is visible at a glance. Run: node tools/bias-r4-rotor-scan.js */

var C = require('../src/compat.js');
var PARTS = C.PARTS;
var byId = C.byId;

var bikes = PARTS.filter(function(p){ return p.cat === 'completebike'; });
var rotors = PARTS.filter(function(p){ return p.cat === 'rotor'; });

var hits = [];
bikes.forEach(function(bike){
  var fills = bike.fills || {};
  ['frontRotor', 'rearRotor'].forEach(function(slot){
    var wheelSlot = slot === 'frontRotor' ? 'frontWheel' : 'rearWheel';
    var rotorId = fills[slot];
    var wheelId = fills[wheelSlot];
    if(!rotorId || !wheelId) return;
    var rotor = byId(rotorId), wheel = byId(wheelId);
    if(!rotor || !wheel) return;
    if(!rotor.mount || !wheel.rotorMount) return;
    if(rotor.mount !== wheel.rotorMount){
      hits.push({
        bike: bike.id, maker: bike.brand, model: bike.model, slot: slot,
        wheelId: wheel.id, wheelBrand: wheel.brand, rotorMount: wheel.rotorMount,
        rotorId: rotor.id, rotorBrand: rotor.brand, rotorSize: rotor.size, rotorMountCur: rotor.mount
      });
    }
  });
});

console.log('=== rotor-fill vs stock-wheel rotorMount mismatches: ' + hits.length + ' ===\n');
var byMaker = {};
hits.forEach(function(h){ (byMaker[h.maker] = byMaker[h.maker] || []).push(h); });
Object.keys(byMaker).sort(function(a,b){ return byMaker[b].length - byMaker[a].length; }).forEach(function(mk){
  console.log(mk + ': ' + byMaker[mk].length);
});
console.log('');
hits.forEach(function(h){
  console.log(h.bike + ' [' + h.maker + ' ' + h.model + '] ' + h.slot + ': wheel ' + h.wheelId + ' (' + h.wheelBrand + ', needs ' + h.rotorMount + ') <- rotor ' + h.rotorId + ' (' + h.rotorBrand + ', ' + h.rotorMountCur + ', ' + h.rotorSize + 'mm)');
});

// candidate replacement rows: same brand family + size, correct mount
console.log('\n=== candidate same-brand replacement rows (brand+size match, correct mount) ===');
hits.forEach(function(h){
  var cands = rotors.filter(function(r){
    return r.brand === h.rotorBrand && r.size === h.rotorSize && r.mount === h.rotorMount;
  });
  console.log(h.bike + ' ' + h.slot + ' needs ' + h.rotorBrand + ' ' + h.rotorSize + 'mm ' + h.rotorMount + ': ' +
    (cands.length ? cands.map(function(c){ return c.id; }).join(', ') : 'NONE FOUND'));
});
