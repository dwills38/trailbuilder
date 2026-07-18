'use strict';
/* CLI data validator. Run with:  node validate.js   (or: npm run validate)
   Exits non-zero if the catalog has any problems - run it before committing
   data changes (and add it to CI later). */
var C = require('./src/compat.js');
var S = require('./src/schema.js');
var K = require('./src/kit.js');
var BD = require('./data/bmx.js');
var BS = require('./src/schema-bmx.js');
var SD = require('./data/striders.js');
var SS = require('./src/schema-strider.js');
var GD = require('./data/gravel.js');
var GS = require('./src/schema-gravel.js');

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

/* BMX (OFF-LIVE, data/bmx.js + src/schema-bmx.js) - validated here too so
   `node validate.js` stays the single gate for ALL catalog data, MTB or not.
   Never wired into the live app; a failure here does not affect buildmymtb.com. */
var bmxProblems = BS.validateBmxCatalog(BD.BMX_PARTS);
if(bmxProblems.length){
  console.log('BMX DATA INVALID - ' + bmxProblems.length + ' problem(s):');
  bmxProblems.forEach(function(p){ console.log('  - ' + p); });
  process.exit(1);
}
var bmxVerified = BD.BMX_PARTS.filter(function(p){ return p.verified === true; }).length;
console.log('BMX OK - ' + BD.BMX_PARTS.length + ' parts, 0 problems (' + bmxVerified + ' verified, ' + (BD.BMX_PARTS.length - bmxVerified) + ' unverified).');

/* STRIDER (OFF-LIVE, data/striders.js + src/schema-strider.js) - validated here too
   so `node validate.js` stays the single gate for ALL catalog data. Never wired into
   the live app; a failure here does not affect buildmymtb.com. */
var striderProblems = SS.validateStriderCatalog(SD.STRIDER_PARTS);
if(striderProblems.length){
  console.log('STRIDER DATA INVALID - ' + striderProblems.length + ' problem(s):');
  striderProblems.forEach(function(p){ console.log('  - ' + p); });
  process.exit(1);
}
var striderVerified = SD.STRIDER_PARTS.filter(function(p){ return p.verified === true; }).length;
var striderWithSeat = SD.STRIDER_PARTS.filter(function(p){ return typeof p.seatMin === 'number' && typeof p.seatMax === 'number'; }).length;
console.log('STRIDER OK - ' + SD.STRIDER_PARTS.length + ' bikes, 0 problems (' + striderVerified + ' verified, ' +
  (SD.STRIDER_PARTS.length - striderVerified) + ' unverified, ' + striderWithSeat + '/' + SD.STRIDER_PARTS.length + ' with seat-height range).');

/* GRAVEL (OFF-LIVE, data/gravel.js + src/schema-gravel.js) - validated here too
   so `node validate.js` stays the single gate for ALL catalog data. Never wired
   into the live app; a failure here does not affect buildmymtb.com.
   NOTE (coordination): a sibling road-2 worker may add a parallel ROAD block to
   this file in the same wave - this block is additive-only (new requires above,
   new block here) to keep both merges conflict-light for the coordinator. */
var gravelProblems = GS.validateGravelCatalog(GD.GRAVEL_PARTS);
if(gravelProblems.length){
  console.log('GRAVEL DATA INVALID - ' + gravelProblems.length + ' problem(s):');
  gravelProblems.forEach(function(p){ console.log('  - ' + p); });
  process.exit(1);
}
var gravelVerified = GD.GRAVEL_PARTS.filter(function(p){ return p.verified === true; }).length;
console.log('GRAVEL OK - ' + GD.GRAVEL_PARTS.length + ' parts, 0 problems (' + gravelVerified + ' verified, ' + (GD.GRAVEL_PARTS.length - gravelVerified) + ' unverified).');
