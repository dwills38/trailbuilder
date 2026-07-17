'use strict';
/* PER-SIZE SPEC FORMATTING (frame.sizes -> readable display string) — pins
   known-key labels, the unknown-key fallback, multi-size/multi-field
   joining, and that esc() is applied to hostile keys/values. Filed as U-1 in
   tools/CODE-QUALITY-AUDIT-2026-07-16.md (formatSizes landed after the audit
   branched, so it went unreviewed there). Uses compat.js's real, already-
   tested esc() (see test-ui.js) rather than a stub, so this suite proves the
   SAME escaping the rest of the app relies on is actually wired through. */
var FS = require('../src/format-sizes.js');
var U = require('./test-util.js');
var C = U.C, eq = U.eq;

test('formats a single known-key size', function(){
  eq(FS.formatSizes({ S:{ seatTubeLen:380 } }, C.esc), 'S: 380 mm seat tube');
});
test('joins multiple fields for one size with a comma', function(){
  eq(FS.formatSizes({ M:{ seatTubeLen:410, maxInsert:220 } }, C.esc), 'M: 410 mm seat tube, 220 mm max insert');
});
test('joins multiple sizes with a middle dot', function(){
  eq(FS.formatSizes({ S:{ seatTubeLen:380 }, M:{ seatTubeLen:410 }, L:{ seatTubeLen:440 } }, C.esc),
    'S: 380 mm seat tube · M: 410 mm seat tube · L: 440 mm seat tube');
});
test('an unknown per-size key falls back to its raw key name (never crashes)', function(){
  eq(FS.formatSizes({ S:{ reachMm:410 } }, C.esc), 'S: 410 mm reachMm');
});
test('an empty sizes map returns an empty string', function(){
  eq(FS.formatSizes({}, C.esc), '');
});
test('a size with no fields at all renders just the label with nothing after the colon', function(){
  eq(FS.formatSizes({ S:{} }, C.esc), 'S: ');
});
test('esc() is applied to a hostile size key (no raw markup survives)', function(){
  var out = FS.formatSizes({ '<b>S</b>':{ seatTubeLen:380 } }, C.esc);
  eq(out.indexOf('<') < 0, true);
  eq(out.indexOf('>') < 0, true);
});
test('esc() is applied to a hostile unknown field key', function(){
  var out = FS.formatSizes({ S:{ '<img src=x onerror=alert(1)>':410 } }, C.esc);
  eq(out.indexOf('<') < 0, true);
  eq(out.indexOf('>') < 0, true);
});
