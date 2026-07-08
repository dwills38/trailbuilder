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
