'use strict';
/* COMPLETE-BIKE MSRP SAVE/SALE BASIS (2026-07-16 pricing ruling) — pins the
   exact policy the audit (H-2) found unguarded: headline + save always derive
   from MSRP `price`, never `streetPrice`; `streetPrice` surfaces only as a
   labeled "Sale" figure. Full rationale lives in src/pricing.js's header. */
var P = require('../src/pricing.js');
var eq = require('./test-util.js').eq;

/* ---- completeBikeSaveBasis(): headline/save/sale ------------------------ */
test('headline is always the MSRP price, never streetPrice', function(){
  var basis = P.completeBikeSaveBasis({ price:5000, streetPrice:3000 }, 5400);
  eq(basis.headline, 5000);
});
test('save is partsTotal minus MSRP, not minus streetPrice', function(){
  // The exact case the audit flagged: a Pivot Firebird-shaped bike whose
  // streetPrice sale must not inflate the save figure.
  var basis = P.completeBikeSaveBasis({ price:5000, streetPrice:3000 }, 5400);
  eq(basis.save, 400);   // 5400 - 5000, NOT 5400 - 3000 (= 2400)
});
test('sale is streetPrice when present, else null — never a computation basis', function(){
  eq(P.completeBikeSaveBasis({ price:4000, streetPrice:3500 }, 4200).sale, 3500);
  eq(P.completeBikeSaveBasis({ price:4000 }, 4200).sale, null);
});
test('save can be zero or negative (parts total at or below MSRP) — caller decides whether to show it', function(){
  eq(P.completeBikeSaveBasis({ price:5000 }, 5000).save, 0);
  eq(P.completeBikeSaveBasis({ price:5000 }, 4800).save, -200);
});
test('a bike with no streetPrice at all (undefined) reports sale:null, not undefined leaking through', function(){
  eq(P.completeBikeSaveBasis({ price:1000 }, 1100).sale, null);
});

/* ---- msrpCompareAsc/Desc(): sort comparators ----------------------------- */
test('msrpCompareAsc sorts by price ascending', function(){
  var arr = [{price:5000},{price:2000},{price:8000}];
  arr.sort(P.msrpCompareAsc);
  eq(arr.map(function(p){ return p.price; }).join(','), '2000,5000,8000');
});
test('msrpCompareDesc sorts by price descending', function(){
  var arr = [{price:5000},{price:2000},{price:8000}];
  arr.sort(P.msrpCompareDesc);
  eq(arr.map(function(p){ return p.price; }).join(','), '8000,5000,2000');
});
test('a low-streetPrice/high-price bike does not float above a cheaper-MSRP bike under either sort direction', function(){
  // The exact regression the audit asked to pin: streetPrice must be invisible to sort.
  var cheaperMsrp = { price:3000, streetPrice:2900 };   // barely discounted
  var pricierButOnSale = { price:6000, streetPrice:1500 };   // deep "sale", but MSRP still higher
  var arr = [pricierButOnSale, cheaperMsrp];
  arr.sort(P.msrpCompareAsc);
  eq(arr[0], cheaperMsrp, 'cheaper-MSRP bike must sort first under price-asc despite the pricier bike\'s lower streetPrice');
  arr.sort(P.msrpCompareDesc);
  eq(arr[0], pricierButOnSale, 'higher-MSRP bike must sort first under price-desc despite its lower streetPrice');
});
test('comparators treat a missing price as 0 (defensive; never throws)', function(){
  eq(P.msrpCompareAsc({}, {price:100}), -100);
  eq(P.msrpCompareDesc({}, {price:100}), 100);
});

/* ---- priceBasisLabel() / priceMsrpConfirmed(): the ✓-badge PRICE wording ----
   Douglas's 2026-07-22 ruling: "make it so verified means the pricing was
   verified too". Before it, one badge covered the SPEC only — a row could be
   verified against the maker and still carry a sample PRICE with nothing in the
   UI saying so. Every page's provHtml now appends this phrase to the badge's
   title, so the wording is pinned here once instead of drifting per page. */
var S = require('../src/schema.js');
var ok = require('./test-util.js').ok;

test('a confirmed MSRP says so explicitly', function(){
  eq(P.priceBasisLabel({ priceBasis:'msrp-confirmed' }), 'price: MSRP confirmed against the manufacturer');
  ok(P.priceMsrpConfirmed({ priceBasis:'msrp-confirmed' }));
});

test('NO priceBasis reads as "sample" — silence is never confirmation', function(){
  // The core of the ruling: a VERIFIED row whose price was never checked must
  // not inherit the spec badge's credibility.
  var verifiedButSamplePrice = { verified:true, source:'https://example.com/x', lastChecked:'2026-06-01' };
  ok(/sample/.test(P.priceBasisLabel(verifiedButSamplePrice)), 'a verified row with no priceBasis must read as a sample price');
  ok(!P.priceMsrpConfirmed(verifiedButSamplePrice));
  ok(/sample/.test(P.priceBasisLabel({})));
  ok(/sample/.test(P.priceBasisLabel(null)));
  ok(/sample/.test(P.priceBasisLabel(undefined)));
});

test('each disclosed exception class gets its OWN wording, and none claims to be an MSRP', function(){
  var exceptions = ['discontinued-no-msrp','oe-only-no-msrp','regional-conversion','bundle-split-estimate'];
  /** @type {Object.<string, boolean>} */ var seen = {};
  exceptions.forEach(function(token){
    var label = P.priceBasisLabel({ priceBasis:token });
    ok(!seen[label], token + ' reuses another class\'s wording — each exception must name its own reason');
    seen[label] = true;
    ok(!P.priceMsrpConfirmed({ priceBasis:token }), token + ' must NOT count as a confirmed MSRP');
    // an exception is a real, disclosed price — it must never read as a plain
    // confirmed MSRP, and must never silently read as "sample" either
    ok(!/^price: MSRP confirmed/.test(label), token + ' overclaims: it reads as a confirmed MSRP');
  });
});

test('every schema enum token has real wording (no token falls through to the sample default)', function(){
  // The tripwire for adding a token to VOCAB.priceBasis and forgetting the UI:
  // a new token would silently render as "sample", quietly understating a real
  // disclosed price.
  var sampleLabel = P.priceBasisLabel({});
  S.VOCAB.priceBasis.forEach(function(token){
    var label = P.priceBasisLabel({ priceBasis:token });
    ok(label !== sampleLabel, 'priceBasis "' + token + '" has no wording in pricing.js — it falls through to the sample default');
    ok(label.indexOf('price:') === 0, 'priceBasis "' + token + '" wording must start with "price:" for the badge title');
  });
});

test('an unknown/garbage priceBasis degrades to the sample wording, never throws', function(){
  // The schema rejects these, but the UI must stay honest if bad data ever
  // reaches it — understate, never overclaim.
  eq(P.priceBasisLabel({ priceBasis:'msrp-probably' }), P.priceBasisLabel({}));
  eq(P.priceBasisLabel({ priceBasis:'' }), P.priceBasisLabel({}));
  ok(!P.priceMsrpConfirmed({ priceBasis:'msrp-probably' }));
  ok(!P.priceMsrpConfirmed(null));
});

test('the wording is plain text — callers escape it, so it must carry no markup of its own', function(){
  /** @param {string} label */
  function assertPlain(label){
    ok(label.indexOf('<') < 0 && label.indexOf('>') < 0, 'wording must contain no markup: ' + label);
    ok(label.length > 0, 'wording must never be empty (it is interpolated into a title=)');
  }
  S.VOCAB.priceBasis.forEach(function(token){ assertPlain(P.priceBasisLabel({ priceBasis:token })); });
  assertPlain(P.priceBasisLabel({}));   // the no-basis default travels the same path
});
