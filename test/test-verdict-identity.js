'use strict';
/* VERDICT IDENTITY CONTRACT — the dots and all dedup/diff logic key on
   verdictKey = ruleId + slots + msg (REVIEW.md #4/#13: message TEXT alone is
   not an identity — two different conflicts can raise byte-identical strings).
   The rest of the suite mostly asserts on message substrings, which means a
   regression that corrupts a rule's ruleId or its slots array would slip
   through while silently breaking dot diffing and conflict dedup. This file
   pins ruleId + slots EXACTLY for the slot-identity-sensitive rules: rotor
   interface/size (front vs rear), the shock rules, and the wheel-config rule
   whose slot participation is what un-masks the REVIEW #13 case. */
var U = require('./test-util.js');
var C = U.C, B = U.B, eq = U.eq, ok = U.ok;
/** @typedef {import('../src/types.js').Verdict} Verdict */

/** @param {Object.<string, string>} map */
var chk = function(map){ return C.checkBuild(B(map)); };

/** Exactly one verdict with this ruleId must be present; returns it.
 * @param {Verdict[]} list @param {string} ruleId @returns {Verdict} */
function only(list, ruleId){
  var hits = list.filter(function(v){ return v.ruleId === ruleId; });
  eq(hits.length, 1, 'expected exactly one "' + ruleId + '" verdict, got ' + hits.length +
    ' (present: ' + list.map(function(v){ return v.ruleId; }).join(', ') + ')');
  return hits[0];
}
/** @param {Verdict} v @param {string[]} slots */
function slotsEq(v, slots){
  eq(JSON.stringify(v.slots), JSON.stringify(slots), 'slots of ' + v.ruleId);
}

/* ---- rule 9: rotor interface — front and rear are DISTINCT conflicts ------ */
test('front rotor-interface error carries its ruleId + [frontRotor, frontWheel]', function(){
  var v = only(chk({frontWheel:'fw-reserve-30-hd-29', frontRotor:'ro-shimano-rtmt800-203-cl'}).errors, 'front-rotor-interface');
  slotsEq(v, ['frontRotor','frontWheel']);
});
test('rear rotor-interface error carries its ruleId + [rearRotor, rearWheel]', function(){
  var v = only(chk({rearWheel:'rw-reserve-30-hd-29', rearRotor:'ro-shimano-rtmt800-203-cl'}).errors, 'rear-rotor-interface');
  slotsEq(v, ['rearRotor','rearWheel']);
});
test('adapter-direction warnings (6-bolt on CL) carry the same identity contract', function(){
  var f = only(chk({frontWheel:'fw-dtswiss-ex-1700-29', frontRotor:'ro-sram-hs2-200-6b'}).warnings, 'front-rotor-interface');
  slotsEq(f, ['frontRotor','frontWheel']);
  var r = only(chk({rearWheel:'rw-dtswiss-ex-1700-29', rearRotor:'ro-sram-hs2-200-6b'}).warnings, 'rear-rotor-interface');
  slotsEq(r, ['rearRotor','rearWheel']);
});
test('same rotor model front AND rear -> TWO verdicts with distinct verdictKeys (dedup contract)', function(){
  var res = chk({frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
                 frontRotor:'ro-shimano-rtmt800-203-cl', rearRotor:'ro-shimano-rtmt800-203-cl'});
  var f = only(res.errors, 'front-rotor-interface'), r = only(res.errors, 'rear-rotor-interface');
  ok(C.verdictKey(f) !== C.verdictKey(r), 'front and rear conflicts must never collapse into one');
});

/* ---- rule 10: rotor size — max keys on fork (front) vs FRAME (rear) ------- */
test('front rotor-max warning is [frontRotor, fork]; rear is [rearRotor, frame]', function(){
  var res = chk({fork:'fk-dvo-onyx-sc-d1-29-170', frame:'fr-commencal-meta-sx-v5',
                 frontRotor:'ro-sram-hs2-220-6b', rearRotor:'ro-sram-hs2-220-6b'});
  slotsEq(only(res.warnings, 'front-rotor-max'), ['frontRotor','fork']);
  slotsEq(only(res.warnings, 'rear-rotor-max'), ['rearRotor','frame']);
});
test('front rotor-min error is [frontRotor, fork]', function(){
  var v = only(chk({fork:'fk-rockshox-zeb-ultimate-29-170', frontRotor:'ro-sram-hs2-180-6b'}).errors, 'front-rotor-min');
  slotsEq(v, ['frontRotor','fork']);
});

/* ---- rule 16/17: shock rules — all fit conflicts are [shock, frame] ------- */
test('shock-size error is [shock, frame]', function(){
  slotsEq(only(chk({frame:'fr-yt-capra-core4', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'}).errors, 'shock-size'), ['shock','frame']);
});
test('shock-stroke-over error is [shock, frame]', function(){
  slotsEq(only(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-vivid-ultimate-230x65'}).errors, 'shock-stroke-over'), ['shock','frame']);
});
test('shock-stroke-short warning is [shock, frame]', function(){
  slotsEq(only(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-fox-float-x-230x60'}).warnings, 'shock-stroke-short'), ['shock','frame']);
});
test('shock-mount error is [shock, frame]', function(){
  slotsEq(only(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-super-deluxe-205x65-trun'}).errors, 'shock-mount'), ['shock','frame']);
});
test('package-only warning is [frame, shock]; oem-shock error is [shock, frame]', function(){
  slotsEq(only(chk({frame:'fr-specialized-enduro-sworks', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'}).warnings, 'package-only'), ['frame','shock']);
  slotsEq(only(chk({frame:'fr-santacruz-megatower-cc', shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun'}).errors, 'oem-shock'), ['shock','frame']);
});
test('frameless OEM-shock info is [shock] alone (the frameless convention, REVIEW #17)', function(){
  slotsEq(only(chk({shock:'sh-rockshox-vivid-ultimate-oem-205x60-trun'}).infos, 'oem-shock'), ['shock']);
});
test('bundled-shock info with no shock picked is [frame] alone', function(){
  slotsEq(only(chk({frame:'fr-specialized-enduro-sworks'}).infos, 'bundled-shock'), ['frame']);
});

/* ---- the REVIEW #13 masking class, pinned at the verdict level -------------
   A 29in rear WHEEL on the mullet-only Meta SX raises the wheel-config error;
   adding a 29in rear TIRE raises a byte-identical MESSAGE — the only thing
   making it a distinct conflict (so the tire's dot can't hide behind the
   wheel's pre-existing error) is the tire's slot joining the slots array. */
test('wheel-config: the rear tire JOINING the conflict changes slots (and so verdictKey), message unchanged', function(){
  var without = only(chk({frame:'fr-commencal-meta-sx-v5', rearWheel:'rw-dtswiss-ex-1700-29'}).errors, 'wheel-config');
  var withTire = only(chk({frame:'fr-commencal-meta-sx-v5', rearWheel:'rw-dtswiss-ex-1700-29', rearTire:'ti-maxxis-assegai-29-25-exop-mg'}).errors, 'wheel-config');
  slotsEq(without, ['frame','rearWheel']);
  slotsEq(withTire, ['frame','rearWheel','rearTire']);
  eq(withTire.msg, without.msg, 'the messages really are byte-identical - that is the point');
  ok(C.verdictKey(withTire) !== C.verdictKey(without), 'identity must differ via slots');
});

/* ---- verdicts still stringify to their message (UI interpolation contract) */
test('a structured verdict stringifies to its msg', function(){
  var v = only(chk({frame:'fr-yt-capra-core4', shock:'sh-rockshox-super-deluxe-ultimate-205x60-trun'}).errors, 'shock-size');
  eq(String(v), v.msg);
});
