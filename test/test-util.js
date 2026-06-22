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
    o[k] = C.byId(map[k]);
    if(!o[k]) throw new Error('unknown part id in test build: ' + map[k]);
  }
  return o;
}

module.exports = { C: C, B: B };
