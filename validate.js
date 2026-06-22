'use strict';
/* CLI data validator. Run with:  node validate.js   (or: npm run validate)
   Exits non-zero if the catalog has any problems - run it before committing
   data changes (and add it to CI later). */
var C = require('./src/compat.js');
var S = require('./src/schema.js');

var problems = S.validateCatalog(C);
if(problems.length){
  console.log('DATA INVALID - ' + problems.length + ' problem(s):');
  problems.forEach(function(p){ console.log('  - ' + p); });
  process.exit(1);
}
var verified = C.PARTS.filter(function(p){ return p.verified === true; }).length;
console.log('DATA OK - ' + C.PARTS.length + ' parts, 0 problems (' + verified + ' verified, ' + (C.PARTS.length - verified) + ' unverified).');
