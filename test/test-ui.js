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

/* ---- completeBikeSheetVerified(): the distinct "build-sheet verified" badge
   predicate (bias-r3, 2026-07-17) — asks whether the BIKE ROW's own
   verified/source fields are set (the sheet was fetched from the maker), never
   whether every individual part it fills is itself verified (that's still
   partVerified, and stays almost always false for a completebike — most
   catalog components aren't independently verified yet). ---------------- */
test('completeBikeSheetVerified is true for a complete bike whose own row is verified', function(){
  ok(C.completeBikeSheetVerified(C.byId('cb-devinci-django-carbon-gx')));
});
test('completeBikeSheetVerified is false for a complete bike whose own row is not verified, even if some fills are', function(){
  ok(!C.completeBikeSheetVerified(C.byId('cb-rose-scrub-dc3')));
});
test('completeBikeSheetVerified is false for null and for a non-completebike part', function(){
  ok(!C.completeBikeSheetVerified(null));
  ok(!C.completeBikeSheetVerified({ id:'x', cat:'saddle', brand:'B', model:'M', price:0, verified:true, lastChecked:'2026-01-01', source:'https://example.com' }));
});
test('completeBikeSheetVerified and partVerified are genuinely different claims for the same bike', function(){
  var cb = C.byId('cb-devinci-django-carbon-gx');
  ok(C.completeBikeSheetVerified(cb), 'the bike row itself is verified');
  ok(!C.partVerified(cb), 'but not every one of its ~20 fills is independently verified yet — partVerified stays false');
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

/* ---- parseRouteHash(): the site-wide hash router's pure parser (NAV-16) --
   index.html's routeHash() calls this to decide which full-page view (if any)
   a hash names; kept pure/exported so the parsing itself is unit-testable
   without a DOM. Covers every route the router owns plus the "not a routed
   page" cases (build hash, empty, garbage) it must fall through on. -------- */
test('parseRouteHash recognizes the guides index and a guide article', function(){
  eq(C.parseRouteHash('#guides').view, 'guides');
  var g = C.parseRouteHash('#guide/tire-width-fitment');
  eq(g.view, 'guide'); eq(g.slug, 'tire-width-fitment');
});
test('parseRouteHash recognizes the forum thread list and a specific thread', function(){
  eq(C.parseRouteHash('#forum').view, 'forum');
  var t = C.parseRouteHash('#forum/abc-123');
  eq(t.view, 'forumThread'); eq(t.id, 'abc-123');
});
test('parseRouteHash recognizes inventory and a profile id', function(){
  eq(C.parseRouteHash('#inventory').view, 'inventory');
  var p = C.parseRouteHash('#profile/9f3a7c');
  eq(p.view, 'profile'); eq(p.id, '9f3a7c');
});
test('parseRouteHash decodes a percent-encoded slug/id', function(){
  eq(C.parseRouteHash('#guide/a%2Fb').slug, 'a/b');
  eq(C.parseRouteHash('#forum/thread%20one').id, 'thread one');
  eq(C.parseRouteHash('#profile/rider%20name').id, 'rider name');
});
test('parseRouteHash treats the build hash, empty hash, and unrecognized hashes as NOT a routed page', function(){
  eq(C.parseRouteHash('#b=eyJiIjp7fX0=').view, null);
  eq(C.parseRouteHash('').view, null);
  eq(C.parseRouteHash(null).view, null);
  eq(C.parseRouteHash(undefined).view, null);
  eq(C.parseRouteHash('#nonsense').view, null);
});
test('parseRouteHash requires a non-empty id after #forum/ and #profile/ (a bare trailing slash is not a route)', function(){
  eq(C.parseRouteHash('#forum/').view, null);
  eq(C.parseRouteHash('#profile/').view, null);
});
