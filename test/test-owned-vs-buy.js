'use strict';
/* OWNED-VS-TO-BUY PLANNER (src/owned-vs-buy.js, committed feature slate) —
   the signed-in "what's left to buy" split's pure model + renderer. The
   model must match ownership by EXACT catalog id through canonicalId
   (retired ids resolve), allocate quantity honestly (one owned unit covers
   one slot, SLOTS order), gate owned-alternative suggestions through the
   injected upgradePlacementDiff (new error = excluded + counted; warning-
   only = suggested 'w' with the engine's messages verbatim), and sum the
   to-buy subtotal from ONLY the missing parts' own MSRPs. The renderer must
   escape every dynamic string and keep the honest framing: matched-by-part
   wording, the hedged no-new-conflicts sentence, disclosed exclusions, the
   app's sample-data disclosure verbatim, never a compatibility guarantee. */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
var OVB = require('../src/owned-vs-buy.js');
var UP = require('../src/upgrade.js');
var P = require('../src/pricing.js');

/** @typedef {import('../src/types.js').Part} Part */
/** @typedef {import('../src/types.js').Build} Build */

/** The real engine pieces, injected the same way index.html injects them
 *  (placementDiff reads checkBuild/verdictKey/SLOTS/altSlotsOf off this
 *  same object — the upgrade-optimizer convention). */
var DEPS = {
  SLOTS: C.SLOTS,
  buildTotals: C.buildTotals,
  byId: C.byId, canonicalId: C.canonicalId,
  placementDiff: UP.upgradePlacementDiff,
  checkBuild: C.checkBuild, verdictKey: C.verdictKey, altSlotsOf: C.altSlotsOf,
  priceBasisLabel: P.priceBasisLabel, priceMsrpConfirmed: P.priceMsrpConfirmed
};

/** Hand-built resolved build (mixing catalog parts and synthetic clones) —
 * the test-upgrade-optimizer.js bl()/clone() convention.
 * @param {Object.<string, Part>} o @returns {Build} */
function bl(o){ return /** @type {Build} */ (/** @type {*} */ (o)); }
/** @param {string} baseId @param {Object.<string, *>} patch @returns {Part} */
function clone(baseId, patch){
  var o = Object.assign({}, part(baseId));
  Object.keys(patch).forEach(function(k){
    var v = patch[k];
    if(v === undefined){ delete (/** @type {*} */(o))[k]; }
    else { (/** @type {*} */(o))[k] = v; }
  });
  return /** @type {Part} */ (o);
}

/** @param {number} n */
function money(n){ return '$' + (n || 0).toLocaleString(); }
var HELPERS = { esc: C.esc, money: money };

/**
 * @param {Object.<string, string>} map slotKey -> part id
 * @param {Object.<string, number>} owned raw part id -> qty
 * @param {Object.<string, string>} [pb]
 */
function model(map, owned, pb){
  return OVB.ownedVsBuyModel(B(map), pb || {}, owned, DEPS);
}

/** @param {ReturnType<typeof model>} m @param {string} slotKey */
function row(m, slotKey){
  var r = m.rows.filter(function(x){ return x.slotKey === slotKey; })[0];
  if(!r) throw new Error('no row for slot ' + slotKey);
  return r;
}

/* The tested golden Megatower build (test-golden.js GOOD) — complete + clean. */
/** @type {Object.<string, string>} */
var GOOD = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };

/* ---- ownership matching -------------------------------------------------- */

test('model: empty inventory — every filled slot is to-buy, subtotal = whole build', function(){
  var m = model(GOOD, {});
  eq(m.empty, false);
  eq(m.inventoryCount, 0);
  eq(m.counts.owned, 0);
  eq(m.counts.toBuy, Object.keys(GOOD).length);
  eq(m.totals.ownedValue, 0);
  eq(m.totals.toBuy, m.totals.build.price);   // no bundle in play: per-part sum = build total
  eq(m.totals.kitGap, false);
});

test('model: exact-id matches split owned vs to-buy, and the subtotals split with them', function(){
  var m = model(GOOD, { 'fk-rockshox-zeb-ultimate-29-170': 1, 'sa-wtb-volt': 1 });
  ok(row(m, 'fork').owned, 'fork must be owned');
  ok(row(m, 'saddle').owned, 'saddle must be owned');
  eq(m.counts.owned, 2);
  eq(m.counts.toBuy, Object.keys(GOOD).length - 2);
  var forkP = part('fk-rockshox-zeb-ultimate-29-170').price, sadP = part('sa-wtb-volt').price;
  eq(m.totals.ownedValue, forkP + sadP);
  eq(m.totals.toBuy, m.totals.build.price - forkP - sadP);
});

test('model: a retired inventory id matches its renamed part through canonicalId', function(){
  // sh-fox-float-x2-230x65 was retired to ALIASES -> the Performance Elite row.
  eq(C.canonicalId('sh-fox-float-x2-230x65'), 'sh-fox-float-x2-perf-elite-230x65');
  var m = model({ frame:'fr-santacruz-megatower-cc', shock:'sh-fox-float-x2-perf-elite-230x65' },
                { 'sh-fox-float-x2-230x65': 1 });
  ok(row(m, 'shock').owned, 'aliased inventory id must cover the renamed part');
  eq(m.inventoryCount, 1);
  eq(m.unknownOwned, 0);
});

test('model: aliased + canonical inventory rows merge quantities, never double-count identity', function(){
  var m = model({ frame:'fr-santacruz-megatower-cc', shock:'sh-fox-float-x2-perf-elite-230x65' },
                { 'sh-fox-float-x2-230x65': 1, 'sh-fox-float-x2-perf-elite-230x65': 2 });
  eq(m.inventoryCount, 1);   // one distinct part
  ok(row(m, 'shock').owned);
});

test('model: an inventory id that matches no catalog part is counted as unknown, not dropped or matched', function(){
  var m = model(GOOD, { 'xx-never-a-part': 1, 'sa-wtb-volt': 1 });
  eq(m.unknownOwned, 1);
  eq(m.inventoryCount, 1);
  eq(m.counts.owned, 1);
});

test('model: zero/negative/garbage quantities own nothing', function(){
  var m = model(GOOD, { 'sa-wtb-volt': 0, 'gr-oneup-lockon': -2, 'pd-oneup-aluminum': NaN });
  eq(m.counts.owned, 0);
  eq(m.inventoryCount, 0);
  eq(m.unknownOwned, 0);   // a bad qty is not an unknown part
});

/* ---- quantity allocation ------------------------------------------------- */

test('model: qty 1 of a part used in two slots covers ONE slot (SLOTS order) — the other is to-buy and says why', function(){
  var m = model(GOOD, { 'bk-sram-code-rsc': 1 });
  ok(row(m, 'frontBrake').owned, 'first slot in SLOTS order gets the unit');
  var rb = row(m, 'rearBrake');
  eq(rb.owned, false);
  eq(rb.qtyShort, true);
  // the to-buy subtotal still charges the second brake
  eq(m.totals.toBuy, m.totals.build.price - part('bk-sram-code-rsc').price);
});

test('model: qty 2 of that part covers both slots', function(){
  var m = model(GOOD, { 'bk-sram-code-rsc': 2 });
  ok(row(m, 'frontBrake').owned);
  ok(row(m, 'rearBrake').owned);
  eq(row(m, 'rearBrake').qtyShort, false);
});

test('model: a qty-short exact match is never suggested as its own alternative', function(){
  var m = model(GOOD, { 'bk-sram-code-rsc': 1 });
  var rb = row(m, 'rearBrake');
  eq(rb.alternatives.filter(function(a){ return a.id === 'bk-sram-code-rsc'; }).length, 0);
});

/* ---- owned-alternative suggestions (compat-gated) ------------------------ */

test('model: an owned same-category part that fits cleanly is suggested green on the to-buy slot', function(){
  var m = model(GOOD, { 'pd-raceface-chester': 1 });
  var r = row(m, 'pedals');
  eq(r.owned, false);   // picked pedals differ from the owned ones
  eq(r.alternatives.length, 1);
  eq(r.alternatives[0].id, 'pd-raceface-chester');
  eq(r.alternatives[0].state, 'g');
  eq(r.alternatives[0].warnings.length, 0);
  eq(r.alternatives[0].qty, 1);
});

test('model: a warning-only owned alternative is suggested "w" with the engine message verbatim', function(){
  // 30.9 dropper on the Megatower's 31.6 seat tube = the reducing-shim warning.
  var m = model(GOOD, { 'dp-pnw-loam-309-175': 1 });
  var r = row(m, 'dropper');
  eq(r.alternatives.length, 1);
  eq(r.alternatives[0].state, 'w');
  ok(r.alternatives[0].warnings.length >= 1, 'must carry the engine warning');
  // verbatim = the exact message placementDiff reports for that swap
  var d = UP.upgradePlacementDiff(part('dp-pnw-loam-309-175'), 'dropper', B(GOOD), DEPS);
  eq(r.alternatives[0].warnings[0], String(d.newWarnings[0]));
});

test('model: an owned part whose swap would add a NEW ERROR is excluded and counted, never suggested', function(){
  // A 27.5 fork on the 29-only Megatower = a new wheel-size error.
  var m = model(GOOD, { 'fk-marzocchi-bomber-z1-275-160': 1 });
  var d = UP.upgradePlacementDiff(part('fk-marzocchi-bomber-z1-275-160'), 'fork', B(GOOD), DEPS);
  ok(d.newErrors.length >= 1, 'fixture must actually add an error');
  eq(row(m, 'fork').alternatives.length, 0);
  eq(m.altExcluded, 1);
});

test('model: owned slots get no alternatives, and clean suggestions sort before warning ones', function(){
  var m = model(GOOD, { 'pd-oneup-aluminum': 1, 'pd-raceface-chester': 1 });
  eq(row(m, 'pedals').owned, true);
  eq(row(m, 'pedals').alternatives.length, 0);
  var m2 = model(GOOD, { 'dp-pnw-loam-309-175': 1, 'dp-wolftooth-resolve-309-200': 1 });
  var alts = row(m2, 'dropper').alternatives;
  eq(alts.length, 2);
  for(var i = 1; i < alts.length; i++){
    ok(!(alts[i - 1].state === 'w' && alts[i].state === 'g'), 'g must sort before w');
  }
});

test('model: an owned unit claimed by an exact match elsewhere is not offered as an alternative too', function(){
  // The owned dropper exactly covers the dropper slot in this build; a second
  // build slot of the same category does not exist, but the same unit must
  // not also appear as an alternative anywhere (remaining qty is 0).
  var m = model(GOOD, { 'dp-oneup-v3-316-210': 1 });
  ok(row(m, 'dropper').owned);
  m.rows.forEach(function(r){
    eq(r.alternatives.filter(function(a){ return a.id === 'dp-oneup-v3-316-210'; }).length, 0);
  });
});

/* ---- totals -------------------------------------------------------------- */

test('model: an active kit/bundle sets kitGap — the per-part sums deliberately ignore bundle pricing', function(){
  var pb = { drivetrain: 'gs-sram-gx-eagle' };   // GOOD's drivetrain is exactly this kit's fills
  var m = model(GOOD, {}, pb);
  ok(m.totals.build.price < m.totals.toBuy, 'bundle-billed build total must undercut the per-part sum');
  eq(m.totals.kitGap, true);
  // and without the preset the same build has no gap
  eq(model(GOOD, {}).totals.kitGap, false);
});

test('model: buildTotals passes through untouched', function(){
  var m = model(GOOD, { 'sa-wtb-volt': 1 });
  var t = C.buildTotals(B(GOOD), {});
  eq(m.totals.build.price, t.price);
  eq(m.totals.build.weight, t.weight);
});

/* ---- price-basis provenance (Douglas's 2026-07-22 ruling: a ✓ Verified spec
   is not the same claim as a confirmed MSRP) — the remaining-cost subtotal's
   follow-up. Wording/marking only: the ownership split, allocation and
   subtotal math above are untouched. -------------------------------------- */

test('model: every row\'s part carries priceNote/priceConfirmed from pricing.js, verbatim', function(){
  var m = model(GOOD, {});
  m.rows.forEach(function(r){
    var p = part(r.part.id);
    eq(r.part.priceNote, P.priceBasisLabel(p), r.slotKey + ' priceNote must be priceBasisLabel(part)');
    eq(r.part.priceConfirmed, P.priceMsrpConfirmed(p), r.slotKey + ' priceConfirmed must be priceMsrpConfirmed(part)');
  });
});

test('model: toBuySamplePriced counts only to-buy rows whose price is NOT a confirmed MSRP', function(){
  // Compute the expectation from the parts themselves rather than assuming a
  // catalog-wide state — the original "no priceBasis anywhere" premise went
  // stale the day the priceBasis backfill waves started landing real
  // msrp-confirmed tokens on GOOD's own drivetrain (coordinator fix,
  // 2026-07-22, at the pb-mtb-a merge). The module contract under test is the
  // per-row relationship, not the catalog's backfill progress.
  /** @param {any} m */
  function expectedSample(m){
    return m.rows.filter(function(/** @type {any} */ r){ return !r.owned && !P.priceMsrpConfirmed(part(r.part.id)); }).length;
  }
  var m0 = model(GOOD, {});
  eq(m0.toBuySamplePriced, expectedSample(m0), 'sample tally must equal the to-buy rows whose part lacks a confirmed MSRP');

  // A synthetic confirmed-MSRP saddle, to-buy (nothing owned): the tally must
  // drop by exactly one vs the same build with the plain (sample) saddle.
  var confirmedSaddle = clone('sa-wtb-volt', { priceBasis: 'msrp-confirmed' });
  var m1 = OVB.ownedVsBuyModel(bl(/** @type {*} */ (Object.assign({}, B(GOOD), { saddle: confirmedSaddle }))), {}, {}, DEPS);
  eq(m1.toBuySamplePriced, m0.toBuySamplePriced - 1, 'the confirmed-MSRP saddle must not count toward the sample tally');

  // An OWNED part is excluded from the to-buy subtotal entirely, so its price
  // basis (confirmed or not) must never move toBuySamplePriced.
  var m2 = model(GOOD, { 'sa-wtb-volt': 1 });
  eq(m2.counts.toBuy, Object.keys(GOOD).length - 1);
  eq(m2.toBuySamplePriced, expectedSample(m2), 'owning the saddle just shrinks the to-buy set; the sample tally still matches the per-part relationship');
});

test('model: priceBasis never changes ownership, allocation, or the subtotal totals', function(){
  var plain = model(GOOD, { 'sa-wtb-volt': 1 });
  var confirmedSaddle = clone('sa-wtb-volt', { priceBasis: 'msrp-confirmed' });
  var withBasis = OVB.ownedVsBuyModel(bl(/** @type {*} */ (Object.assign({}, B(GOOD), { saddle: confirmedSaddle }))), {}, { 'sa-wtb-volt': 1 }, DEPS);
  eq(withBasis.counts.owned, plain.counts.owned);
  eq(withBasis.counts.toBuy, plain.counts.toBuy);
  eq(withBasis.totals.ownedValue, plain.totals.ownedValue);
  eq(withBasis.totals.toBuy, plain.totals.toBuy);
  eq(withBasis.totals.kitGap, plain.totals.kitGap);
});

/* ---- purity / determinism ------------------------------------------------ */

test('model: pure — does not mutate the build, the inventory map, or SLOTS; deterministic', function(){
  var res = B(GOOD);
  var before = JSON.stringify(Object.keys(res));
  var owned = { 'bk-sram-code-rsc': 1, 'pd-raceface-chester': 2 };
  var ownedBefore = JSON.stringify(owned);
  var m1 = OVB.ownedVsBuyModel(res, {}, owned, DEPS);
  var m2 = OVB.ownedVsBuyModel(res, {}, owned, DEPS);
  eq(JSON.stringify(Object.keys(res)), before, 'build mutated');
  eq(JSON.stringify(owned), ownedBefore, 'inventory map mutated');
  eq(JSON.stringify(m1), JSON.stringify(m2), 'not deterministic');
});

test('model: empty build reports empty', function(){
  var m = OVB.ownedVsBuyModel({}, {}, { 'sa-wtb-volt': 1 }, DEPS);
  eq(m.empty, true);
  eq(m.rows.length, 0);
});

/* ---- renderer ------------------------------------------------------------ */

test('render: empty build gets the pick-parts message, nothing else', function(){
  var h = OVB.renderOwnedVsBuyHtml(OVB.ownedVsBuyModel({}, {}, {}, DEPS), HELPERS);
  ok(h.indexOf('Pick some parts first') >= 0);
  ok(h.indexOf('<table') < 0);
});

test('render: escapes every dynamic string (hostile part names, warnings)', function(){
  /** @type {*} */
  var hostile = {
    empty: false, inventoryCount: 1, unknownOwned: 0, altExcluded: 0,
    rows: [{ slotKey: 'fork', slotLabel: '<img src=x onerror=alert(1)>',
      part: { id: 'x', brand: '<script>', model: 'a"b', price: 100 },
      owned: false, qtyShort: false,
      alternatives: [{ id: 'y', brand: '<b>', model: 'z', state: 'w', warnings: ['<svg onload=1>'], qty: 1 }] }],
    counts: { owned: 0, toBuy: 1 },
    totals: { build: { price: 100, weight: 0, missingWeight: false }, ownedValue: 0, toBuy: 100, kitGap: false }
  };
  var h = OVB.renderOwnedVsBuyHtml(hostile, HELPERS);
  ok(h.indexOf('<script>') < 0, 'brand not escaped');
  ok(h.indexOf('<img src=x') < 0, 'slot label not escaped');
  ok(h.indexOf('<svg onload=1>') < 0, 'warning not escaped');
  ok(h.indexOf('&lt;script&gt;') >= 0);
});

test('render: honest framing — matched-by-part wording, hedged suggestions, disclosure verbatim, never a guarantee', function(){
  var m = model(GOOD, { 'sa-wtb-volt': 1, 'pd-raceface-chester': 1, 'dp-pnw-loam-309-175': 1 });
  var h = OVB.renderOwnedVsBuyHtml(m, HELPERS);
  ok(h.indexOf('matched by catalog part, not condition') >= 0, 'summary matched-by-part line');
  ok(h.indexOf('Owned matches are by catalog part id, not condition') >= 0, 'footer matched-by-part line');
  ok(h.indexOf('Specs are illustrative sample data unless a part shows ✓ Verified in the app.') >= 0, 'sample-data disclosure verbatim');
  ok(h.indexOf('among the dimensions we check') >= 0, 'green suggestions stay hedged');
  ok(h.indexOf('All compatible') < 0, 'never the overclaim');
  ok(h.toLowerCase().indexOf('guarantee') < 0, 'never a guarantee');
  ok(h.indexOf('Left to buy') >= 0);
  ok(h.indexOf(money(m.totals.toBuy)) >= 0, 'to-buy subtotal rendered');
});

test('render: qty-short, kit-gap, excluded-suggestion and unknown-item notes appear when (and only when) real', function(){
  var m = model(GOOD, { 'bk-sram-code-rsc': 1, 'fk-marzocchi-bomber-z1-275-160': 1, 'xx-never-a-part': 3 },
                { drivetrain: 'gs-sram-gx-eagle' });
  var h = OVB.renderOwnedVsBuyHtml(m, HELPERS);
  ok(h.indexOf('already counted for another slot') >= 0, 'qty-short note');
  ok(h.indexOf('kit/bundle price') >= 0, 'kit-gap note');
  ok(h.indexOf('would add a compatibility conflict') >= 0, 'excluded-suggestion note');
  ok(h.indexOf('no longer match') >= 0, 'unknown-item note');
  var clean = OVB.renderOwnedVsBuyHtml(model(GOOD, { 'sa-wtb-volt': 1 }), HELPERS);
  ok(clean.indexOf('already counted') < 0);
  ok(clean.indexOf('kit/bundle price') < 0);
  ok(clean.indexOf('would add a compatibility conflict') < 0);
  ok(clean.indexOf('no longer match') < 0);
});

test('render: a sample-priced to-buy row is marked † with the pricing.js wording, and the subtotal note names the split', function(){
  var m = model(GOOD, {});   // empty inventory: every real catalog row here is sample-priced
  ok(m.toBuySamplePriced > 0, 'fixture must actually have sample-priced to-buy rows');
  var h = OVB.renderOwnedVsBuyHtml(m, HELPERS);
  ok(h.indexOf('ovb-pnote') >= 0, 'the † marker renders for a sample-priced to-buy row');
  ok(h.indexOf(C.esc(P.priceBasisLabel({}))) >= 0, 'the sample-price wording rides the marker\'s title');
  ok(h.indexOf('to-buy price') >= 0 && h.indexOf('sample data') >= 0, 'the subtotal disclosure names the split');
});

test('render: an owned part\'s price basis never renders a † marker (it is out of the to-buy subtotal)', function(){
  var m = model(GOOD, { 'sa-wtb-volt': 1 });
  var h = OVB.renderOwnedVsBuyHtml(m, HELPERS);
  var ownedRowHtml = h.split('ovb-r-owned')[1].split('</tr>')[0];
  eq(ownedRowHtml.indexOf('ovb-pnote'), -1, 'owned rows never carry the to-buy price-basis marker');
});

test('render: when every to-buy row has a confirmed MSRP, no † marker and no sample-price note appear', function(){
  /** @type {*} */
  var allConfirmed = {
    empty: false, inventoryCount: 0, unknownOwned: 0, altExcluded: 0,
    rows: [{ slotKey: 'saddle', slotLabel: 'Saddle',
      part: { id: 'x', brand: 'B', model: 'M', price: 40, priceNote: P.priceBasisLabel({ priceBasis:'msrp-confirmed' }), priceConfirmed: true },
      owned: false, qtyShort: false, alternatives: [] }],
    counts: { owned: 0, toBuy: 1 },
    totals: { build: { price: 40, weight: 0, missingWeight: false }, ownedValue: 0, toBuy: 40, kitGap: false },
    toBuySamplePriced: 0
  };
  var h = OVB.renderOwnedVsBuyHtml(allConfirmed, HELPERS);
  eq(h.indexOf('ovb-pnote'), -1);
  eq(h.indexOf('sample data, not a confirmed manufacturer MSRP'), -1);
});

test('render: empty inventory gets the add-parts nudge; a stocked one does not', function(){
  ok(OVB.renderOwnedVsBuyHtml(model(GOOD, {}), HELPERS).indexOf('Your inventory is empty') >= 0);
  ok(OVB.renderOwnedVsBuyHtml(model(GOOD, { 'sa-wtb-volt': 1 }), HELPERS).indexOf('Your inventory is empty') < 0);
});
