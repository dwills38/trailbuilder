'use strict';
/* Shared helpers for the test suites. */
var C = require('../src/compat.js');

// Build a resolved build object from a map of slotKey -> part id.
function B(map){
  var o = {};
  for(var k in map){
    o[k] = C.byId(map[k]);
    if(!o[k]) throw new Error('unknown part id in test build: ' + map[k]);
  }
  return o;
}

module.exports = { C: C, B: B };
