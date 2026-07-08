'use strict';
/* DRIFT-CHECK matching logic — pure functions only, no network. Proves the
   token-matching and disposition classification tools/drift-check.js relies
   on to decide ok / changed / unfetchable / fetch failed. */
var D = require('../tools/drift-check.js');
var eq = require('./test-util.js').eq;
var ok = require('./test-util.js').ok;

/* ---- token generation ------------------------------------------------- */

test('priceTokens gives the plain and comma-grouped forms', function () {
  eq(D.priceTokens(4999).join(','), '4999,4,999');
});
test('priceTokens de-dupes when comma grouping changes nothing', function () {
  eq(D.priceTokens(45).join(','), '45');
});
test('priceTokens rounds fractional prices', function () {
  eq(D.priceTokens(129.99).join(','), '130');
});

test('weightTokens covers grams, kg (1/2dp) and lbs (1dp + rounded)', function () {
  var tokens = D.weightTokens(3200);
  ok(tokens.indexOf('3200') >= 0, 'grams');
  ok(tokens.indexOf('3.20') >= 0, 'kg 2dp');
  ok(tokens.indexOf('3.2') >= 0, 'kg 1dp');
  ok(tokens.indexOf('7.1') >= 0, 'lbs 1dp'); // 3200g ~= 7.05 lb -> rounds to 7.1
  ok(tokens.indexOf('7') >= 0, 'lbs rounded');
});

/* ---- hasAnyToken -------------------------------------------------------- */

test('hasAnyToken finds a substring match', function () {
  ok(D.hasAnyToken('Price: $4,999.00 USD', D.priceTokens(4999)));
});
test('hasAnyToken is false when nothing matches', function () {
  ok(!D.hasAnyToken('Price: $5,499.00 USD', D.priceTokens(4999)));
});

/* ---- sampleGradeFields --------------------------------------------------- */
/* Fixture descs mirror real catalog rows (src/compat.js) — the conventions
   this matcher exists for, not invented phrasings. */

test('sampleGradeFields: plain "price = sample" marks price only', function () {
  var f = D.sampleGradeFields({ desc: 'price = sample' });
  ok(f.price && !f.weight);
});
test('sampleGradeFields: "price = sample (...)" with a reason parenthetical', function () {
  var f = D.sampleGradeFields({ desc: 'price = sample (Continental publishes EUR RRP only, no US MSRP)' });
  ok(f.price && !f.weight);
});
test('sampleGradeFields: slash-list "price/weight/... = sample" marks both', function () {
  var f = D.sampleGradeFields({ desc: 'price/weight/maxRotorR/maxForkTravel = sample' });
  ok(f.price && f.weight);
});
test('sampleGradeFields: "price + maxForkTravel = sample" marks price, not weight', function () {
  var f = D.sampleGradeFields({ desc: 'price + maxForkTravel = sample' });
  ok(f.price && !f.weight);
});
test('sampleGradeFields: converted-currency form marks price', function () {
  var f = D.sampleGradeFields({ desc: 'price (GBP 1,199 frame-only, converted sample) + weight + maxForkTravel = sample (design fork ~120mm)' });
  ok(f.price, 'converted sample = sample-grade price');
  ok(f.weight, 'the "+ weight + ... = sample" tail marks weight too');
});
test('sampleGradeFields: "weight = sample (page lists none)" marks weight only', function () {
  var f = D.sampleGradeFields({ desc: 'weight = sample (page lists none); 60-622 / Super Race / $102 RRP from the fetched schwalbetires.com SKU page' });
  ok(!f.price && f.weight);
});
test('sampleGradeFields: a fetched price beside a sample weight is NOT swept in', function () {
  var f = D.sampleGradeFields({ desc: 'price = fetched pushindustries.com (2026-07-08); weight = sample. Push sells this per bike-model fitment' });
  ok(!f.price, 'price is page-sourced here');
  ok(f.weight);
});
test('sampleGradeFields: "weight/price stay sample-data" marks both', function () {
  var f = D.sampleGradeFields({ desc: 'e*thirteen no longer sells a "Plus"-branded pedal crank, so weight/price stay sample-data' });
  ok(f.price && f.weight);
});
test('sampleGradeFields: "maxTire = sample guidance" marks neither', function () {
  var f = D.sampleGradeFields({ desc: 'maxTire = sample guidance (XC rim); specs from the fetched crankbrothers.com product page' });
  ok(!f.price && !f.weight);
});
test('sampleGradeFields: no desc marks neither', function () {
  var f = D.sampleGradeFields({});
  ok(!f.price && !f.weight);
});

/* ---- classifyContent ---------------------------------------------------- */

var FRAME = { price: 4999, weight: 3200 };

test('classifyContent: ok when both price and weight are found', function () {
  var r = D.classifyContent('<p>MSRP $4,999. Frame weight: 3200g (7.1 lb).</p>', FRAME);
  eq(r.status, 'ok');
  eq(r.note, null);
});
test('classifyContent: changed when price is missing', function () {
  var r = D.classifyContent('<p>Frame weight: 3200g.</p>', FRAME);
  eq(r.status, 'changed');
  ok(!!r.note && r.note.indexOf('price') >= 0);
});
test('classifyContent: changed when weight is missing', function () {
  var r = D.classifyContent('<p>MSRP $4,999.</p>', FRAME);
  eq(r.status, 'changed');
  ok(!!r.note && r.note.indexOf('weight') >= 0);
});
test('classifyContent: only checks fields the part actually has', function () {
  var r = D.classifyContent('<p>MSRP $600.</p>', { price: 600 }); // no weight field (e.g. a preset)
  eq(r.status, 'ok');
  eq(r.checks.length, 1);
});

/* ---- classifyContent: sample-grade skip --------------------------------- */

var SAMPLE_PRICE_TIRE = { price: 95, weight: 1389, desc: 'price = sample (page lists no MSRP); 1389g from the fetched maxxis.com SKU table' };

test('classifyContent: a sample-grade price missing from the page is ok, noted as skipped', function () {
  var r = D.classifyContent('<p>Weight: 1389g. No price shown.</p>', SAMPLE_PRICE_TIRE);
  eq(r.status, 'ok');
  ok(!!r.note && r.note.indexOf('price: sample-grade, skipped') >= 0);
  eq(r.checks.length, 1); // only weight was actually checked
  eq(r.checks[0].field, 'weight');
});
test('classifyContent: sample-grade price does not shield a genuinely missing weight', function () {
  var r = D.classifyContent('<p>This product has been discontinued.</p>', SAMPLE_PRICE_TIRE);
  eq(r.status, 'changed');
  ok(!!r.note && r.note.indexOf('not found on page: weight') >= 0);
  ok(!!r.note && r.note.indexOf('price: sample-grade, skipped') >= 0);
});
test('classifyContent: a sample-grade weight is skipped while price is still checked', function () {
  var part = { price: 102, weight: 640, desc: 'weight = sample (page lists none); $102 RRP from the fetched schwalbetires.com SKU page' };
  var r = D.classifyContent('<p>RRP $102. Weight not listed.</p>', part);
  eq(r.status, 'ok');
  ok(!!r.note && r.note.indexOf('weight: sample-grade, skipped') >= 0);
  eq(r.checks.length, 1);
  eq(r.checks[0].field, 'price');
});
test('classifyContent: both fields sample-grade means nothing to check, ok with both noted', function () {
  var r = D.classifyContent('<p>Anything at all.</p>', { price: 3000, weight: 2200, desc: 'price/weight/maxForkTravel = sample' });
  eq(r.status, 'ok');
  eq(r.checks.length, 0);
  ok(!!r.note && r.note.indexOf('price: sample-grade, skipped') >= 0);
  ok(!!r.note && r.note.indexOf('weight: sample-grade, skipped') >= 0);
});
test('classifyContent: a part without sample markers still checks both fields', function () {
  var r = D.classifyContent('<p>MSRP $4,999. Frame weight: 3200g.</p>', { price: 4999, weight: 3200, desc: 'all specs from the fetched maker page' });
  eq(r.status, 'ok');
  eq(r.checks.length, 2);
  eq(r.note, null);
});

/* ---- classifyResult (fetch outcome + content) ---------------------------- */

test('classifyResult: 403 is unfetchable, not fetch failed', function () {
  var r = D.classifyResult(FRAME, { ok: false, statusCode: 403 });
  eq(r.status, 'unfetchable');
});
test('classifyResult: 429 is unfetchable', function () {
  var r = D.classifyResult(FRAME, { ok: false, statusCode: 429 });
  eq(r.status, 'unfetchable');
});
test('classifyResult: 404 is a retryable fetch failure', function () {
  var r = D.classifyResult(FRAME, { ok: false, statusCode: 404 });
  eq(r.status, 'fetch failed');
});
test('classifyResult: 500 is a retryable fetch failure', function () {
  var r = D.classifyResult(FRAME, { ok: false, statusCode: 500 });
  eq(r.status, 'fetch failed');
});
test('classifyResult: network error with no status is a fetch failure', function () {
  var r = D.classifyResult(FRAME, { ok: false, error: 'ETIMEDOUT' });
  eq(r.status, 'fetch failed');
  eq(r.note, 'ETIMEDOUT');
});
test('classifyResult: a short bot-check page is unfetchable, not changed', function () {
  var r = D.classifyResult(FRAME, { ok: true, statusCode: 200, body: 'Please enable JavaScript and reload.' });
  eq(r.status, 'unfetchable');
});
test('classifyResult: a normal 200 page with matching specs is ok', function () {
  var r = D.classifyResult(FRAME, { ok: true, statusCode: 200, body: '<html>MSRP $4,999, 3200g</html>' });
  eq(r.status, 'ok');
});
test('classifyResult: a normal 200 page missing the specs is changed', function () {
  var r = D.classifyResult(FRAME, { ok: true, statusCode: 200, body: '<html>This product has been discontinued.</html>' });
  eq(r.status, 'changed');
});

/* ---- priceRoughlyMatches -------------------------------------------------- */
/* Fixture strings are the literal page-content snippets quoted in
   tools/DRIFT-TRIAGE-2026-07-08.md's (b) table — real storefront formatting
   the exact-token matcher missed. */

test('priceRoughlyMatches: ".99" psychological pricing rounds up to the catalogued dollar (Cane Creek Helm)', function () {
  ok(D.priceRoughlyMatches('Regular price Sale price$1,099.99', 1100));
});
test('priceRoughlyMatches: ".99" pricing again (Cane Creek eeWings)', function () {
  ok(D.priceRoughlyMatches('Regular price Sale price$1,249.99', 1250));
});
test('priceRoughlyMatches: "Prices from :" / "Ex Tax" label with decimal rounding (Renthal Fatbar)', function () {
  ok(D.priceRoughlyMatches('Prices from : $107.85 Ex Tax: $107.85', 108));
});
test('priceRoughlyMatches: space-grouped thousands with cents (Öhlins RXF36)', function () {
  ok(D.priceRoughlyMatches('$1 369.50', 1370));
});
test('priceRoughlyMatches: does not swallow real drift (SRAM XS-1275 $380 -> $275)', function () {
  ok(!D.priceRoughlyMatches('MSRP $275.00 USD, shown twice on the SRAM model page. MSRP $275.00 USD.', 380));
});
test('priceRoughlyMatches: does not swallow a small genuine move (RAAW Yalla V2 +$2)', function () {
  ok(!D.priceRoughlyMatches('$2,926.00', 2924));
});
test('priceRoughlyMatches: false when the text has no price-shaped number at all', function () {
  ok(!D.priceRoughlyMatches('Frame weight: 3200g.', 4999));
});

/* ---- looksLikeSpecOrFaqPage ------------------------------------------------ */

test('looksLikeSpecOrFaqPage: an FAQ page with no currency figure (Forbidden Dreadnought)', function () {
  ok(D.looksLikeSpecOrFaqPage('<h1>Dreadnought FAQs</h1><p>Frequently asked questions about sizing, geometry and warranty.</p>'));
});
test('looksLikeSpecOrFaqPage: a tech-specs page with no currency figure (Commencal Meta SX V5)', function () {
  ok(D.looksLikeSpecOrFaqPage('<h1>FRS Tech Specs</h1><p>Travel: 160mm. Headset: ZS44/ZS56. BB: PF92.</p>'));
});
test('looksLikeSpecOrFaqPage: a dealer-network product page with no currency figure (Formula Selva S)', function () {
  ok(D.looksLikeSpecOrFaqPage("<p>Available through Formula's authorized dealer network. Full specifications below.</p>"));
});
test('looksLikeSpecOrFaqPage: false when a marker phrase appears alongside an actual price', function () {
  ok(!D.looksLikeSpecOrFaqPage('<h1>Tech Specs</h1><p>MSRP $199</p>'));
});
test('looksLikeSpecOrFaqPage: false with no price AND no marker phrase (a normal listing must still flag as changed)', function () {
  ok(!D.looksLikeSpecOrFaqPage('Frame weight: 3200g.'));
});

/* ---- classifyContent: the triage's former false positives, end-to-end ---- */

test('classifyContent: Cane Creek Helm MkII Air .99 pricing is ok', function () {
  var r = D.classifyContent('Regular price Sale price$1,099.99', { price: 1100 });
  eq(r.status, 'ok');
});
test('classifyContent: Cane Creek eeWings .99 pricing (also "Sold out") is ok', function () {
  var r = D.classifyContent('Regular price Sale price$1,249.99 Sold out', { price: 1250 });
  eq(r.status, 'ok');
});
test('classifyContent: Renthal Fatbar 35 rounding + "Prices from :" / "Ex Tax" label is ok', function () {
  var r = D.classifyContent('Prices from : $107.85 Ex Tax: $107.85', { price: 108 });
  eq(r.status, 'ok');
});
test('classifyContent: Öhlins RXF36 space-thousands-with-cents is ok', function () {
  var r = D.classifyContent('<p>$1 369.50</p>', { price: 1370 });
  eq(r.status, 'ok');
});
test('classifyContent: Commencal Meta SX V5 tech-specs page (no price on page) is ok, noted as skipped', function () {
  var r = D.classifyContent('<h1>FRS Tech Specs</h1><p>Travel: 160mm. Headset: ZS44/ZS56. BB: PF92.</p>', { price: 2600 });
  eq(r.status, 'ok');
  ok(!!r.note && r.note.indexOf('price: no price field on this page') >= 0);
  eq(r.checks.length, 0);
});
test('classifyContent: Forbidden Dreadnought FAQ page (no price on page) is ok, noted as skipped', function () {
  var r = D.classifyContent('<h1>Dreadnought FAQs</h1><p>Frequently asked questions about sizing, geometry and warranty.</p>', { price: 3700 });
  eq(r.status, 'ok');
  ok(!!r.note && r.note.indexOf('price: no price field on this page') >= 0);
});
test('classifyContent: Formula Selva S dealer-network page (no price on page) is ok, noted as skipped', function () {
  var r = D.classifyContent("<p>Available through Formula's authorized dealer network. Full specifications below.</p>", { price: 850 });
  eq(r.status, 'ok');
  ok(!!r.note && r.note.indexOf('price: no price field on this page') >= 0);
});
test('classifyContent: a spec-marker page that DOES show a different price still flags as changed', function () {
  var r = D.classifyContent('<h1>Tech Specs</h1><p>MSRP $199</p>', { price: 250 });
  eq(r.status, 'changed');
  ok(!!r.note && r.note.indexOf('not found on page: price') >= 0);
});

/* ---- classifyContent: genuine drift from the triage must still flag ------ */

test('classifyContent: SRAM XS-1275 real drift ($380 -> $275) still flags as changed', function () {
  var r = D.classifyContent('MSRP $275.00 USD, shown twice on the SRAM model page. MSRP $275.00 USD.', { price: 380 });
  eq(r.status, 'changed');
});
test('classifyContent: Hope F22 real drift ($260 -> ~$203 USD-equivalent) still flags as changed', function () {
  var r = D.classifyContent('£155.00 / €194.70 / $202.76 (ex tax)', { price: 260 });
  eq(r.status, 'changed');
});
test('classifyContent: RAAW Yalla V2 small genuine move (+$2) still flags as changed', function () {
  var r = D.classifyContent('<p>$2,926.00</p>', { price: 2924 });
  eq(r.status, 'changed');
});
test('classifyContent: RAAW Jibb small genuine move (+$2) still flags as changed', function () {
  var r = D.classifyContent('<p>from $1,263.00</p>', { price: 1261 });
  eq(r.status, 'changed');
});

/* ---- known-unfetchable host matching ------------------------------------- */

test('isKnownUnfetchableHost matches an exact host', function () {
  ok(D.isKnownUnfetchableHost('https://www.trekbikes.com/us/en_US/bikes/some-frame'));
});
test('isKnownUnfetchableHost matches a subdomain of a known host', function () {
  ok(D.isKnownUnfetchableHost('https://ca.trekbikes.com/us/en_US/bikes/some-frame'));
});
test('isKnownUnfetchableHost does not match an unrelated host', function () {
  ok(!D.isKnownUnfetchableHost('https://www.sram.com/en/sram/models/some-part'));
});
test('isKnownUnfetchableHost does not false-positive on a host that merely contains the string', function () {
  ok(!D.isKnownUnfetchableHost('https://nottrekbikes.com/foo'));
});
