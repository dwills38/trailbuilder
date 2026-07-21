'use strict';
/* KIT ID ALIASES/TOMBSTONE CONTRACT — mirrors test-ids.js's ALIASES/canonicalId
   cases (and their BMX port, test/test-bmx-aliases.js) for the Kit Builder
   catalog. KIT_ALIASES + canonicalKitId (src/kit.js) give src/kit.js the same
   APPEND-ONLY id contract the MTB catalog has had since the 2026-07-06
   migration (DATA-MODEL-REVIEW.md §3.1): a retired id never disappears
   silently — a retarget resolves through canonicalKitId to its current row,
   single-hop, no chaining; a plain tombstone (no real successor) resolves to
   nothing and is dropped by the caller rather than throwing. */
var U = require('./test-util.js');
var KIT = require('../src/kit.js');
var eq = U.eq, ok = U.ok;

test('KIT_ALIASES is seeded', function(){
  ok(Object.keys(KIT.KIT_ALIASES).length > 0, 'KIT_ALIASES seeded');
});

test('KIT_ALIASES keys are retired ids (never current), values are current catalog ids', function(){
  var keys = Object.keys(KIT.KIT_ALIASES);
  keys.forEach(function(old){
    eq(KIT.kitById(old), null, 'alias key still lives in the kit catalog: ' + old);
    ok(KIT.kitById(KIT.KIT_ALIASES[old]), 'alias target missing from the kit catalog: ' + KIT.KIT_ALIASES[old]);
  });
});

test('KIT_ALIASES is single-hop: no alias value is itself an alias key', function(){
  var keys = Object.keys(KIT.KIT_ALIASES);
  keys.forEach(function(old){
    ok(keys.indexOf(KIT.KIT_ALIASES[old]) < 0, 'chained alias needs re-flattening: ' + old + ' -> ' + KIT.KIT_ALIASES[old]);
  });
});

test('canonicalKitId resolves retired ids and passes everything else through', function(){
  eq(KIT.canonicalKitId('jsy-fox-ranger-foxguard-ls'), 'jsy-fox-defend');
  eq(KIT.canonicalKitId('jsy-fox-defend'), 'jsy-fox-defend');
  eq(KIT.canonicalKitId('never-existed'), 'never-existed');
  eq(KIT.canonicalKitId(null), null);
  eq(KIT.canonicalKitId(undefined), undefined);
  eq(KIT.canonicalKitId(''), '');
});

test('a legacy id resolves to a real part (canonicalKitId -> kitById)', function(){
  var p = KIT.kitById(KIT.canonicalKitId('jsy-fox-ranger-foxguard-ls'));
  ok(p, 'legacy jsy-fox-ranger-foxguard-ls resolves');
  eq(p && p.brand, 'Fox');
  eq(p && p.cat, 'jersey');
});

test('kit-10 fabricated rows with no real successor are plain tombstones: retired from the catalog with no KIT_ALIASES entry', function(){
  var tombstoned = [
    'sho-troyleedesigns-grind',
    'sho-troyleedesigns-roost',
    'jsy-fasthouse-alloycole-ss',
    'jsy-fasthouse-alloyrufio-ls',
    'sht-royalracing-apex',
    'pnt-poc-resistance-enduro',
    'jsy-7mesh-slab-ls'
  ];
  tombstoned.forEach(function(id){
    eq(KIT.kitById(id), null, 'fabricated row still lives in the kit catalog: ' + id);
    eq(KIT.canonicalKitId(id), id, 'a plain tombstone must not be aliased: ' + id);
    ok(!Object.prototype.hasOwnProperty.call(KIT.KIT_ALIASES, id), 'tombstoned id must not appear in KIT_ALIASES: ' + id);
  });
});
