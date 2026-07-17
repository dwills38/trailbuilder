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
