'use strict';
/* CLI data validator. Run with:  node validate.js   (or: npm run validate)
   Exits non-zero if the catalog has any problems - run it before committing
   data changes (and add it to CI later). */
var C = require('./src/compat.js');
var S = require('./src/schema.js');
var K = require('./src/kit.js');

var problems = S.validateCatalog(C);
if(problems.length){
  console.log('DATA INVALID - ' + problems.length + ' problem(s):');
  problems.forEach(function(p){ console.log('  - ' + p); });
  process.exit(1);
}
var warnings = S.lintCatalog(C);   // non-fatal: style/consistency, never blocks entry
warnings.forEach(function(w){ console.log('  warn: ' + w); });
var verified = C.PARTS.filter(function(p){ return p.verified === true; }).length;
console.log('DATA OK - ' + C.PARTS.length + ' parts, 0 problems' + (warnings.length ? ', ' + warnings.length + ' warning(s)' : '') +
  ' (' + verified + ' verified, ' + (C.PARTS.length - verified) + ' unverified).');

/* Rider Kit (Kit Builder) is its own catalog - validated here so `node validate.js`
   stays the single gate for ALL catalog data. Kit is isolated from the bike engine
   (its parts never enter compat.js's PARTS), so it validates as its own {PARTS,SLOTS}
   against the same schema.js. */
var kitProblems = S.validateCatalog({ PARTS:K.KIT_PARTS, SLOTS:K.KIT_SLOTS });
/* cross-collision guard: a kit id must never equal a bike id (disjoint prefixes make
   this structurally impossible, but assert it - ids are the primary key for share
   links + saved builds across both catalogs). */
/** @type {Object.<string, boolean>} */ var bikeIds = {}; C.PARTS.forEach(function(p){ bikeIds[p.id] = true; });
K.KIT_PARTS.forEach(function(p){ if(bikeIds[p.id]) kitProblems.push('[' + p.id + '] kit id collides with a bike part id'); });
if(kitProblems.length){
  console.log('KIT DATA INVALID - ' + kitProblems.length + ' problem(s):');
  kitProblems.forEach(function(p){ console.log('  - ' + p); });
  process.exit(1);
}
var kitWarnings = S.lintCatalog({ PARTS:K.KIT_PARTS, SLOTS:K.KIT_SLOTS });
kitWarnings.forEach(function(w){ console.log('  kit warn: ' + w); });
var kitVerified = K.KIT_PARTS.filter(function(p){ return p.verified === true; }).length;
console.log('KIT OK - ' + K.KIT_PARTS.length + ' kit parts, 0 problems' + (kitWarnings.length ? ', ' + kitWarnings.length + ' warning(s)' : '') +
  ' (' + kitVerified + ' verified, ' + (K.KIT_PARTS.length - kitVerified) + ' unverified).');
