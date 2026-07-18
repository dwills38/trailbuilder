'use strict';
/* EMTB CONTAINMENT (OFF-LIVE) — the machine teeth behind CLAUDE.md hard rule 1
   as amended 2026-07-18: e-bikes are CONTAINED to the BuildMyEMTB surface. This
   test enforces the amended rule in BOTH directions so neither half can silently
   rot as either catalog grows:

     A) the MTB catalog (src/compat.js PARTS) carries NO e-field, e-category, or
        e-id — it stays 100% e-bike-free, permanently; and
     B) the e-system actually lives in the e-catalog (data/emtb.js) — every emtb
        row carries the motor + battery block, so e-parts are provably contained
        here rather than scattered.

   A careless future paste of an e-MTB row into src/compat.js (or an e-field onto
   an MTB part) turns this test red. */
var C = require('../src/compat.js');
var ED = require('../data/emtb.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

// e-specific field keys that must NEVER appear on an MTB catalog row. These are
// unambiguously e-only (no legitimate acoustic-MTB part carries them).
var E_FIELDS = ['motor', 'motorBrand', 'motorModel', 'motorTorque', 'motorPower', 'motorPowerPeak',
  'battery', 'batteryWh', 'batteryRemovable', 'rangeExtender', 'rangeExtenderWh', 'assist'];
// e-only category values (belt-and-braces: the amended rule bans e-parts by
// category as well as by field).
/** @type {Object.<string, number>} */
var E_CATS = { emtb: 1, motor: 1, battery: 1, 'e-motor': 1, ebike: 1 };

test('DIRECTION A: no src/compat.js PARTS row carries any e-field', function(){
  /** @type {any[]} */ var PARTS = C.PARTS;
  /** @type {string[]} */ var offenders = [];
  PARTS.forEach(function(p){
    E_FIELDS.forEach(function(f){
      if(f in p) offenders.push(p.id + ' carries e-field "' + f + '"');
    });
  });
  eq(offenders.length, 0, 'MTB catalog must stay e-free (rule 1):\n' + offenders.join('\n'));
});

test('DIRECTION A: no src/compat.js PARTS row uses an e-category or an em- id', function(){
  /** @type {any[]} */ var PARTS = C.PARTS;
  /** @type {string[]} */ var offenders = [];
  PARTS.forEach(function(p){
    if(E_CATS[p.cat]) offenders.push(p.id + ' has e-category "' + p.cat + '"');
    if(typeof p.id === 'string' && /^em-/.test(p.id)) offenders.push(p.id + ' uses the reserved em- (e-MTB) id prefix');
  });
  eq(offenders.length, 0, 'MTB catalog must stay e-free (rule 1):\n' + offenders.join('\n'));
});

test('DIRECTION B: every data/emtb.js row actually carries the e-system', function(){
  /** @type {any[]} */ var EMTB = ED.EMTB_PARTS;
  ok(EMTB.length > 0, 'expected at least one emtb seed row');
  /** @type {string[]} */ var missing = [];
  EMTB.forEach(function(p){
    if(!(typeof p.motorBrand === 'string' && p.motorBrand)) missing.push(p.id + ' missing motorBrand');
    if(!(typeof p.motorTorque === 'number')) missing.push(p.id + ' missing motorTorque');
    if(!(typeof p.batteryWh === 'number')) missing.push(p.id + ' missing batteryWh');
  });
  eq(missing.length, 0, 'e-system must live in the e-catalog:\n' + missing.join('\n'));
});
