'use strict';
/* DOT / CONFLICT PREDICATE — the compatibility dot the catalog shows
   (g = no conflicts, r = won't fit, n = nothing selected yet). */
var H = require('./test-harness.js');
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, test = H.test, eq = H.eq, some = H.some;
/** @param {Object.<string, string>} buildMap @param {string} id */
var stateOf = function(buildMap, id){ return C.compatOf(part(id), B(buildMap)).state; };

test('empty build -> neutral dots', function(){
  eq(C.compatOf(part('sh-sd-air'), {}).state, 'n');
});
test('Megatower: a fitting shock is green', function(){
  eq(stateOf({frame:'fr-megatower'}, 'sh-sd-air'), 'g');
});
test('Megatower: a trunnion shock is red', function(){
  eq(stateOf({frame:'fr-megatower'}, 'sh-sd-trun'), 'r');
});
test('Megatower: a wrong-size shock is red', function(){
  eq(stateOf({frame:'fr-megatower'}, 'sh-floatx-60'), 'r');
});
test('Enduro: a fitting (package) shock stays green', function(){
  eq(stateOf({frame:'fr-enduro'}, 'sh-floatx-60'), 'g');
});
test('Enduro: its own OEM shock is green', function(){
  eq(stateOf({frame:'fr-enduro'}, 'sh-genie-oem'), 'g');
});
test('Enduro: a wrong-size shock is red', function(){
  eq(stateOf({frame:'fr-enduro'}, 'sh-sd-air'), 'r');
});
test('shared-cat rotor that fits front OR rear -> green', function(){
  eq(stateOf({frontWheel:'fw-reserve', rearWheel:'rw-dt'}, 'ro-cl-203'), 'g');
});
test('Center Lock rotor with two 6-bolt wheels -> red', function(){
  eq(stateOf({frontWheel:'fw-reserve', rearWheel:'rw-reserve'}, 'ro-cl-203'), 'r');
});
test('groupset preset red on a non-UDH frame', function(){
  eq(stateOf({frame:'fr-enduro'}, 'gs-gx-t'), 'r');
});
test('groupset preset green on a UDH frame', function(){
  eq(stateOf({frame:'fr-megatower'}, 'gs-gx-t'), 'g');
});
test('a red dot carries an explanatory reason', function(){
  var c = C.compatOf(part('sh-sd-trun'), B({frame:'fr-megatower'}));
  eq(c.state, 'r'); some([c.reason], 'Shock');
});
