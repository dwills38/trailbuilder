'use strict';
/* APP HELPERS — the escaping + provenance logic the UI (index.html) relies on.
   These used to live untested inside the inline <script>; they now live in
   compat.js so they have one tested source of truth. esc() is the HTML-escape
   applied to every data value the app interpolates into innerHTML (the guard
   against a malicious/typo'd catalog field injecting markup); partVerified()
   decides the green "✓ Verified" badge, including "a kit is verified only when
   every part it fills is verified". */
var U = require('./test-util.js');
var C = U.C, eq = U.eq, ok = U.ok;

/* ---- esc(): HTML escaping ------------------------------------------------- */
test('esc escapes the five HTML-significant characters', function(){
  eq(C.esc('<b>'), '&lt;b&gt;');
  eq(C.esc('a & b'), 'a &amp; b');
  eq(C.esc('"q"'), '&quot;q&quot;');
  eq(C.esc("it's"), 'it&#39;s');
  eq(C.esc('plain text 29x2.5'), 'plain text 29x2.5');
});
test('esc treats null/undefined as empty string (no "null"/"undefined" leaking)', function(){
  eq(C.esc(null), '');
  eq(C.esc(undefined), '');
});
test('esc neutralizes a markup-bearing source URL that still passes the validator regex', function(){
  // urlOk only requires /^https?:\/\/.+/, so this string is "valid" yet hostile.
  var hostile = 'https://x.example/"><img src=x onerror=alert(1)>';
  var out = C.esc(hostile);
  ok(out.indexOf('<') < 0, 'no raw <');
  ok(out.indexOf('>') < 0, 'no raw >');
  ok(out.indexOf('"') < 0, 'no raw "');
});

/* ---- partVerified(): the ✓ badge predicate ------------------------------- */
test('partVerified is true for a verified component', function(){
  ok(C.partVerified(C.byId('ca-sram-xg1275')));   // SRAM XG-1275 cassette — verified
});
test('partVerified is false for an unverified component', function(){
  ok(!C.partVerified(C.byId('fk-rockshox-zeb-ultimate-29-170')));      // RockShox ZEB fork — sample/estimate
});
test('a kit is verified only when EVERY filled part is verified', function(){
  ok(C.partVerified(C.byId('gs-sram-gx-eagle')), 'GX Eagle mech kit: all 5 fills verified');
  ok(!C.partVerified(C.byId('gs-shimano-xt-m8100')), 'XT kit: only the cassette is verified');
});
test('partVerified is false for null and for a kit with no fills', function(){
  ok(!C.partVerified(null));
  ok(!C.partVerified({ id:'x', cat:'groupset', brand:'B', model:'M', price:0, fills:{} }));
});
