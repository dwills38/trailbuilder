'use strict';
/* DATA INTEGRITY — the real catalog must pass the schema validator.
   The validator (schema.js) is the single source of truth for "valid data";
   this test just asserts the shipped catalog satisfies it. */
var U = require('./test-util.js');
var S = require('../src/schema.js');
var eq = U.eq, ok = U.ok;

test('catalog passes full schema validation (0 problems)', function(){
  var probs = S.validateCatalog(U.C);
  eq(probs.length, 0, 'data problems:\n  - ' + probs.join('\n  - '));
});

test('every VERIFIED tire is pinned to a casing + compound (the tire-batch gate)', function(){
  // A verified tire weight is only meaningful per SKU (one page lists 25 SKUs
  // spanning ~500 g); rows entered without the axes are guaranteed retouches.
  var pinned = U.C.PARTS.filter(function(p){ return p.cat === 'tire' && p.verified === true; });
  ok(pinned.length >= 6, 'expected the six verified Maxxis tires');
  pinned.forEach(function(t){ ok(t.cat === 'tire' && t.casing && t.compound, t.id + ' missing casing/compound'); });
});
