'use strict';
/* ID CONVENTION + ALIASES — ids are brand-qualified and APPEND-ONLY
   (DATA-MODEL-REVIEW.md §3.1): <prefix>-<brand>-<model...>[-gen][-variants].
   The validator enforces charset/prefix/token-count; the brand-token check is a
   non-fatal lint (lintCatalog) that the shipped catalog must keep clean. Retired
   ids resolve through ALIASES so pre-migration share links and verify-job state
   keep working forever. */
var U = require('./test-util.js');
var S = require('../src/schema.js');
var C = U.C, eq = U.eq, ok = U.ok;

test('every catalog id follows the convention: charset, category prefix, >= 3 tokens', function(){
  C.PARTS.forEach(function(p){
    ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id), 'charset: ' + p.id);
    var toks = p.id.split('-');
    eq(toks[0], S.ID_PREFIX[p.cat], 'prefix of ' + p.id);
    ok(toks.length >= 3, 'needs prefix-brand-model tokens: ' + p.id);
  });
});
test('every catalog id is brand-qualified (second token = brand slug): lint-clean', function(){
  var warnings = S.lintCatalog(C);
  eq(warnings.length, 0, 'lint warnings:\n  - ' + warnings.join('\n  - '));
});
test('brandSlug folds case, punctuation and diacritics into one token', function(){
  eq(S.brandSlug('Öhlins'), 'ohlins');
  eq(S.brandSlug('e*thirteen'), 'ethirteen');
  eq(S.brandSlug('DT Swiss'), 'dtswiss');
  eq(S.brandSlug('9point8'), '9point8');
});
test('ALIASES keys are retired ids (never current), values are current catalog ids', function(){
  var keys = Object.keys(C.ALIASES);
  ok(keys.length > 0, 'ALIASES seeded');
  keys.forEach(function(old){
    eq(C.byId(old), null, 'alias key still lives in the catalog: ' + old);
    ok(C.byId(C.ALIASES[old]), 'alias target missing from the catalog: ' + C.ALIASES[old]);
  });
});
test('canonicalId resolves retired ids and passes everything else through', function(){
  eq(C.canonicalId('fr-megatower'), 'fr-santacruz-megatower-cc');   // seeded by the 2026-07 migration
  eq(C.canonicalId('fr-santacruz-megatower-cc'), 'fr-santacruz-megatower-cc');
  eq(C.canonicalId('never-existed'), 'never-existed');
  eq(C.canonicalId(null), null);
});
test('a legacy share-link id resolves to a real part (canonicalId -> byId)', function(){
  var p = C.byId(C.canonicalId('fk-zeb'));
  ok(p, 'legacy fk-zeb resolves');
  eq(p && p.brand, 'RockShox');
  eq(p && p.cat === 'fork' ? p.travel : null, 170);
});
