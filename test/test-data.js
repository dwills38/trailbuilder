'use strict';
/* DATA INTEGRITY — the real catalog must pass the schema validator.
   The validator (schema.js) is the single source of truth for "valid data";
   this test just asserts the shipped catalog satisfies it. */
var U = require('./test-util.js');
var S = require('../src/schema.js');
var eq = U.eq;

test('catalog passes full schema validation (0 problems)', function(){
  var probs = S.validateCatalog(U.C);
  eq(probs.length, 0, 'data problems:\n  - ' + probs.join('\n  - '));
});
