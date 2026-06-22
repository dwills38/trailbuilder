'use strict';
/* Shared helpers for the test suites. */
/** @typedef {import('../src/types.js').Part} Part */
/** @typedef {import('../src/types.js').Build} Build */
var C = require('../src/compat.js');

// Build a resolved build object from a map of slotKey -> part id.
/** @param {Object.<string, string>} map @returns {Build} */
function B(map){
  /** @type {Build} */ var o = {};
  for(var k in map){
    var part = C.byId(map[k]);
    if(!part) throw new Error('unknown part id in test build: ' + map[k]);
    o[k] = part;
  }
  return o;
}

// Look up a part that is expected to exist (throws otherwise). Keeps tests free
// of `byId(...)` null-checks while staying honest under strict type-checking.
/** @param {string} id @returns {Part} */
function part(id){
  var p = C.byId(id);
  if(!p) throw new Error('unknown part id: ' + id);
  return p;
}

/* ---- assertions ---------------------------------------------------------
   Plain throwing assertions: Vitest reports a thrown Error as a failed test,
   so these need no test-framework coupling. (Vitest's own `test` is provided
   as a global via vitest.config.mjs.) */

/** @param {*} actual @param {*} expected @param {string} [msg] */
function eq(actual, expected, msg){
  if(actual !== expected){
    throw new Error((msg ? msg + ': ' : '') +
      'expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  }
}

/** @param {*} value @param {string} [msg] */
function ok(value, msg){
  if(!value) throw new Error(msg || ('expected truthy, got ' + JSON.stringify(value)));
}

// assert that some string in `arr` contains substring `sub`
/** @param {any[]} arr @param {string} sub @param {string} [msg] */
function some(arr, sub, msg){
  if(!arr.some(function(x){ return String(x).indexOf(sub) >= 0; })){
    throw new Error((msg ? msg + ': ' : '') + 'no item contained "' + sub + '"');
  }
}

module.exports = { C: C, B: B, part: part, eq: eq, ok: ok, some: some };
