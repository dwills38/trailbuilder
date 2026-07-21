'use strict';
/* BMX ID ALIASES/TOMBSTONE CONTRACT (OFF-LIVE) — mirrors test-ids.js's
   ALIASES/canonicalId cases for the BMX catalog. BMX_ALIASES + canonicalBmxId
   (src/compat-bmx.js) give data/bmx.js the same APPEND-ONLY id contract the
   MTB catalog has had since the 2026-07-06 migration (DATA-MODEL-REVIEW.md
   §3.1): a retired id never disappears, it resolves through canonicalBmxId to
   its current row, single-hop, no chaining. */
var U = require('./test-util.js');
var BMX = require('../src/compat-bmx.js');
var DATA = require('../data/bmx.js');
var eq = U.eq, ok = U.ok;

/** @param {string|null|undefined} id @returns {any} */
function bmxById(id){ return DATA.BMX_PARTS.filter(function(p){ return p.id === id; })[0] || null; }

test('BMX_ALIASES is seeded', function(){
  ok(Object.keys(BMX.BMX_ALIASES).length > 0, 'BMX_ALIASES seeded');
});

test('BMX_ALIASES keys are retired ids (never current), values are current catalog ids', function(){
  var keys = Object.keys(BMX.BMX_ALIASES);
  keys.forEach(function(old){
    eq(bmxById(old), null, 'alias key still lives in the BMX catalog: ' + old);
    ok(bmxById(BMX.BMX_ALIASES[old]), 'alias target missing from the BMX catalog: ' + BMX.BMX_ALIASES[old]);
  });
});

test('BMX_ALIASES is single-hop: no alias value is itself an alias key', function(){
  var keys = Object.keys(BMX.BMX_ALIASES);
  keys.forEach(function(old){
    ok(keys.indexOf(BMX.BMX_ALIASES[old]) < 0, 'chained alias needs re-flattening: ' + old + ' -> ' + BMX.BMX_ALIASES[old]);
  });
});

test('canonicalBmxId resolves retired ids and passes everything else through', function(){
  eq(BMX.canonicalBmxId('bmx-hb-colony-rick'), 'bmx-hb-colony-rick-93-29');
  eq(BMX.canonicalBmxId('bmx-hb-colony-rick-93-29'), 'bmx-hb-colony-rick-93-29');
  eq(BMX.canonicalBmxId('bmx-hb-colony-guardian'), 'bmx-hb-colony-guardian-88-29');
  eq(BMX.canonicalBmxId('bmx-gr-odyssey-keyboard'), 'bmx-gr-odyssey-aaronross');
  eq(BMX.canonicalBmxId('never-existed'), 'never-existed');
  eq(BMX.canonicalBmxId(null), null);
  eq(BMX.canonicalBmxId(undefined), undefined);
  eq(BMX.canonicalBmxId(''), '');
});

test('a legacy id resolves to a real part (canonicalBmxId -> lookup)', function(){
  var p = bmxById(BMX.canonicalBmxId('bmx-gr-odyssey-keyboard'));
  ok(p, 'legacy bmx-gr-odyssey-keyboard resolves');
  eq(p && p.brand, 'Odyssey');
  eq(p && p.cat, 'grips');

  var rick = bmxById(BMX.canonicalBmxId('bmx-hb-colony-rick'));
  ok(rick, 'legacy bmx-hb-colony-rick resolves');
  eq(rick && rick.brand, 'Colony');
  eq(rick && rick.width, 29);

  var guardian = bmxById(BMX.canonicalBmxId('bmx-hb-colony-guardian'));
  ok(guardian, 'legacy bmx-hb-colony-guardian resolves');
  eq(guardian && guardian.brand, 'Colony');
  eq(guardian && guardian.width, 29);
});
