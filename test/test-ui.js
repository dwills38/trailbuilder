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
  ok(!C.partVerified({ id:'x', cat:'saddle', brand:'B', model:'M', price:0 }));   // a component with no verified:true (synthetic — immune to catalog verification churn)
});
test('a kit is verified only when EVERY filled part is verified', function(){
  ok(C.partVerified(C.byId('gs-sram-gx-eagle')), 'GX Eagle mech kit: all 5 fills verified');
  ok(!C.partVerified(C.byId('gs-sram-gx-transmission')), 'GX Transmission kit: the AXS pod shifter stays unverified (SRAM publishes no pod-controller weight), so the kit is not fully verified');
});
test('partVerified is false for null and for a kit with no fills', function(){
  ok(!C.partVerified(null));
  ok(!C.partVerified({ id:'x', cat:'groupset', brand:'B', model:'M', price:0, fills:{} }));
});

/* ---- fisherYatesShuffle(): the "Random" catalog sort's shuffle ----------- */
test('fisherYatesShuffle returns a permutation - same elements, none dropped or duplicated', function(){
  var input = [];
  for(var i=0;i<200;i++) input.push('item-'+i);
  var shuffled = C.fisherYatesShuffle(input.slice(), C.mulberry32(1));
  eq(shuffled.length, input.length);
  var sortedIn = input.slice().sort(), sortedOut = shuffled.slice().sort();
  eq(JSON.stringify(sortedOut), JSON.stringify(sortedIn));
});
test('fisherYatesShuffle with a seeded rng is deterministic (same seed -> same order)', function(){
  var input = []; for(var i=0;i<50;i++) input.push(i);
  var a = C.fisherYatesShuffle(input.slice(), C.mulberry32(42));
  var b = C.fisherYatesShuffle(input.slice(), C.mulberry32(42));
  eq(JSON.stringify(a), JSON.stringify(b));
});
test('fisherYatesShuffle produces different orders across different seeds/calls', function(){
  var input = []; for(var i=0;i<50;i++) input.push(i);
  var a = C.fisherYatesShuffle(input.slice(), C.mulberry32(1));
  var b = C.fisherYatesShuffle(input.slice(), C.mulberry32(2));
  ok(JSON.stringify(a) !== JSON.stringify(b), 'two different seeds produced the identical order (astronomically unlikely for a real shuffle)');
});
test('fisherYatesShuffle mutates and returns the same array (in-place, chainable)', function(){
  var input = [1,2,3,4,5];
  var out = C.fisherYatesShuffle(input, C.mulberry32(7));
  ok(out === input, 'expected the same array reference back');
});
