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

module.exports = { C: C, B: B, part: part };
