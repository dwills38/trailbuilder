'use strict';
/* UPGRADE OPTIMIZER (src/upgrade-optimizer.js, committed feature slate) — the
   $/gram swap ranking's pure model + renderer. The model must rank ONLY
   honest rows (both weights ✓ Verified — the verification bar checks weight;
   candidate strictly lighter; no new compatibility error; buyable new) by
   cost per gram saved on candidate MSRP — never streetPrice — with every
   set-aside candidate counted in a disclosed ledger and unrankable slots
   named with their reason. Ordering is pure math with brand-blind
   deterministic tie-breaks. The renderer must escape every dynamic string
   and keep the honest framing (the "never silently ranked" promise, the
   unbiased-math sentence, the app's sample-data disclosure verbatim, never
   "All compatible"). Swap semantics come from upgrade.js's tested
   upgradePlacementDiff, injected — these tests pass the real one. */
var U = require('./test-util.js');
var C = U.C, B = U.B, part = U.part, eq = U.eq, ok = U.ok, some = U.some;
var UP = require('../src/upgrade.js');
var UO = require('../src/upgrade-optimizer.js');

/** @typedef {import('../src/types.js').Part} Part */
/** @typedef {import('../src/types.js').Build} Build */

/** The real engine pieces, injected the same way index.html injects them.
 * PARTS is swapped per test — the whole point of the DI seam.
 * @param {Part[]} parts */
function depsWith(parts){
  return { PARTS: parts, SLOTS: C.SLOTS,
    partVerified: C.partVerified, partWeight: C.partWeight,
    placementDiff: UP.upgradePlacementDiff,
    checkBuild: C.checkBuild, verdictKey: C.verdictKey, altSlotsOf: C.altSlotsOf, byId: C.byId };
}
var REAL_DEPS = depsWith(C.PARTS);

/** Hand-built resolved build (mixing catalog parts and synthetic clones) —
 * cast through *, the same reason B() exists for the id path: tsc types each
 * Build slot narrowly and part() returns the broad union.
 * @param {Object.<string, Part>} o @returns {Build} */
function bl(o){ return /** @type {Build} */ (/** @type {*} */ (o)); }

/* Same helper shapes the app injects. */
/** @param {number} n */
function money(n){ return '$' + (n || 0).toLocaleString(); }
var HELPERS = { esc: C.esc, money: money };

/** A synthetic candidate cloned off a real catalog part — id/fields tweaked
 * for one test. NEVER pushed into the real catalog; injected via depsWith().
 * @param {string} baseId @param {Object.<string, *>} patch @returns {Part} */
function clone(baseId, patch){
  var o = Object.assign({}, part(baseId));
  Object.keys(patch).forEach(function(k){
    var v = patch[k];
    if(v === undefined){ delete (/** @type {*} */(o))[k]; }
    else { (/** @type {*} */(o))[k] = v; }
  });
  return /** @type {Part} */ (o);
}

/* The verified front-tire test bench: Assegai 29x2.5 EXO+ MaxxGrip (✓ Verified,
   1219 g, $90 MSRP) on a 29" front wheel — the wheel makes a 27.5 candidate an
   engine ERROR, not a silent pass. */
var BENCH = { frontWheel: 'fw-reserve-30-hd-29', frontTire: 'ti-maxxis-assegai-29-25-exop-mg' };
var CUR_W = 1219;

test('model: empty build — empty flag, nothing ranked, nothing excluded', function(){
  var m = UO.upgradeOptimizerModel({}, REAL_DEPS);
  eq(m.empty, true);
  eq(m.rows.length, 0);
  eq(m.slotNotes.length, 0);
  eq(m.rankableSlots, 0);
});

test('model: an honest candidate ranks with exact $/g arithmetic on MSRP', function(){
  // Aspen 29x2.4 EXO Dual: ✓ Verified 756 g, $75 — saves 463 g on the bench.
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([part('ti-maxxis-aspen-29-24-exo-dual')]));
  eq(m.rows.length, 1);
  var r = m.rows[0];
  eq(r.slotKey, 'frontTire');
  eq(r.current.id, 'ti-maxxis-assegai-29-25-exop-mg');
  eq(r.candidate.id, 'ti-maxxis-aspen-29-24-exo-dual');
  eq(r.gramsSaved, CUR_W - 756);
  eq(r.price, 75);
  eq(r.costPerGram, 75 / (CUR_W - 756));
  eq(r.state, 'g');
  eq(r.warnings.length, 0);
  eq(m.rankableSlots, 2);   // the ✓ Verified front wheel is rankable too — it just has no candidates in this pool
});

test('model: honesty gate — a sample-weight candidate is excluded and counted, never ranked', function(){
  var sample = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-sample-aspen', verified: undefined, source: undefined });
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([sample]));
  eq(m.rows.length, 0);
  eq(m.excluded.sampleWeight, 1);
});

test('model: honesty gate — a slot whose CURRENT part has no verified weight is a named note, never ranked', function(){
  // Hand-built resolved build: the current tire is a sample-weight clone.
  var sampleCur = clone('ti-maxxis-assegai-29-25-exop-mg', { id: 'ti-test-sample-current', verified: undefined, source: undefined });
  var bld = bl({ frontWheel: part('fw-reserve-30-hd-29'), frontTire: sampleCur });
  var m = UO.upgradeOptimizerModel(bld, depsWith([part('ti-maxxis-aspen-29-24-exo-dual')]));
  eq(m.rows.length, 0, 'lighter verified candidates must NOT rank against a guessed baseline');
  eq(m.slotNotes.length, 1);
  eq(m.slotNotes[0].slotKey, 'frontTire');
  ok(m.slotNotes[0].currentName.indexOf('Assegai') >= 0);
  eq(m.rankableSlots, 1);   // the ✓ Verified front wheel stays rankable; only the tire slot is noted
});

test('model: compat gate — a lighter verified candidate that adds an engine ERROR is excluded and counted', function(){
  // 27.5 Minion DHF EXO MT: verified, 945 g (lighter) — but the bench front
  // wheel is 29", so the swap raises a wheel-size error.
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([part('ti-maxxis-minion-dhf-275-23-exo-mt')]));
  eq(m.rows.length, 0);
  eq(m.excluded.addsError, 1);
});

test('model: a warning-adding swap stays ranked at the yellow tier with the engine message verbatim', function(){
  // Megatower (31.6 seat tube) + OneUp V3 31.6 (✓ Verified): a lighter
  // verified 30.9 clone fits with a reducing shim — warning, not error.
  var lighter309 = clone('dp-oneup-v3-316-210', { id: 'dp-test-309-lighter', diameter: 30.9, weight: 438 });
  var bld = bl({ frame: part('fr-santacruz-megatower-cc'), dropper: part('dp-oneup-v3-316-210') });
  var m = UO.upgradeOptimizerModel(bld, depsWith([lighter309]));
  eq(m.rows.length, 1);
  eq(m.rows[0].state, 'w');
  eq(m.rows[0].warnings.length, 1);
  some(m.rows[0].warnings, 'reducing shim');   // the engine's own wording, untouched
  // the frame slot is filled but its part is unverified — named, not silent
  eq(m.slotNotes.length, 1);
  eq(m.slotNotes[0].slotKey, 'frame');
});

test('model: not-lighter and not-buyable and no-price candidates land in the disclosed ledger', function(){
  var heavier = part('ti-maxxis-assegai-29-25-dh-mg');                      // verified, 1480 g
  var disc = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-disc', status: 'discontinued' });
  var recalled = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-recalled', status: 'recalled' });
  var free = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-free', price: 0 });
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([heavier, disc, recalled, free]));
  eq(m.rows.length, 0);
  eq(m.excluded.notLighter, 1);
  eq(m.excluded.notBuyable, 2);
  eq(m.excluded.noPrice, 1);
});

test('model: the part already fitted is not its own upgrade', function(){
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([part('ti-maxxis-assegai-29-25-exop-mg')]));
  eq(m.rows.length, 0);
  // and it isn't counted as excluded either — it isn't a candidate at all
  eq(m.excluded.notLighter + m.excluded.sampleWeight + m.excluded.addsError, 0);
});

test('model: MSRP is the only price basis — streetPrice never feeds the ranking', function(){
  var onSale = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-onsale', streetPrice: 1 });
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([onSale]));
  eq(m.rows.length, 1);
  eq(m.rows[0].price, 75, 'MSRP, not the $1 sale price');
  eq(m.rows[0].costPerGram, 75 / (CUR_W - 756));
});

test('model: ranking is ascending $/g with brand-blind deterministic tie-breaks', function(){
  var a = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-a', weight: CUR_W - 100, price: 100 });  // $1.00/g
  var b = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-b', weight: CUR_W - 400, price: 100 });  // $0.25/g
  var c = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-c', weight: CUR_W - 200, price: 100 });  // $0.50/g
  // ties: same $/g, different saving -> bigger saving first; identical -> id order
  var t1 = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-tie-zz', weight: CUR_W - 50,  price: 25 });   // $0.50/g, 50 g
  var t2 = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-tie-aa', weight: CUR_W - 200, price: 100 }); // $0.50/g, 200 g
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([a, t1, b, c, t2]));
  eq(m.rows.length, 5);
  eq(m.rows[0].candidate.id, 'ti-test-b');
  // $0.50/g block: bigger saving first, then id (ti-test-c and ti-test-tie-aa both save 200 g)
  eq(m.rows[1].candidate.id, 'ti-test-c');
  eq(m.rows[2].candidate.id, 'ti-test-tie-aa');
  eq(m.rows[3].candidate.id, 'ti-test-tie-zz');
  eq(m.rows[4].candidate.id, 'ti-test-a');
  for(var i = 1; i < m.rows.length; i++){
    ok(m.rows[i].costPerGram >= m.rows[i - 1].costPerGram, 'ascending $/g');
  }
});

test('model: a tire candidate is judged per position — both tire slots can rank it', function(){
  var bld = B({ frontWheel: 'fw-reserve-30-hd-29', rearWheel: 'rw-reserve-30-hd-29',
    frontTire: 'ti-maxxis-assegai-29-25-exop-mg', rearTire: 'ti-maxxis-assegai-29-25-dh-mg' });
  var m = UO.upgradeOptimizerModel(bld, depsWith([part('ti-maxxis-aspen-29-24-exo-dual')]));
  eq(m.rows.length, 2);
  var slots = m.rows.map(function(r){ return r.slotKey; }).sort();
  eq(slots.join(','), 'frontTire,rearTire');
});

test('model: pure — the build map and its parts are not mutated', function(){
  var bld = B(BENCH);
  var before = JSON.stringify(bld);
  UO.upgradeOptimizerModel(bld, REAL_DEPS);
  eq(JSON.stringify(bld), before);
});

/* ---- real-catalog invariant sweep (the golden Megatower build) ----------- */

/** @type {Object.<string, string>} */
var GOOD = { frame:'fr-santacruz-megatower-cc', fork:'fk-rockshox-zeb-ultimate-29-170', shock:'sh-rockshox-super-deluxe-ultimate-230x62p5', frontWheel:'fw-reserve-30-hd-29', rearWheel:'rw-reserve-30-hd-29',
  frontTire:'ti-maxxis-assegai-29-25-exop-mg', rearTire:'ti-maxxis-assegai-29-25-exop-mg', shifter:'sft-sram-gx-eagle', derailleur:'dr-sram-gx-eagle', cassette:'ca-sram-xg1275', chain:'ch-sram-gx-eagle', crankset:'cr-sram-gx-eagle',
  frontBrake:'bk-sram-code-rsc', rearBrake:'bk-sram-code-rsc', frontRotor:'ro-sram-hs2-200-6b', rearRotor:'ro-sram-hs2-200-6b',
  handlebar:'hb-renthal-fatbar-35', stem:'st-renthal-apex-35', grips:'gr-oneup-lockon', dropper:'dp-oneup-v3-316-210', saddle:'sa-wtb-volt', pedals:'pd-oneup-aluminum' };

test('sweep: every ranked row over the real catalog satisfies every honesty and compat invariant', function(){
  var bld = B(GOOD);
  var m = UO.upgradeOptimizerModel(bld, REAL_DEPS);
  ok(m.rows.length > 0, 'the verified tire bed alone should yield rows');
  m.rows.forEach(function(r){
    var cur = part(r.current.id), cand = part(r.candidate.id);
    ok(C.partVerified(cur), r.candidate.id + ': current must be verified');
    ok(C.partVerified(cand), r.candidate.id + ': candidate must be verified');
    ok(cand.status !== 'discontinued' && cand.status !== 'recalled', 'buyable new only');
    eq(r.gramsSaved, /** @type {number} */(cur.weight) - /** @type {number} */(cand.weight));
    ok(r.gramsSaved > 0, 'strictly lighter only');
    eq(r.costPerGram, r.price / r.gramsSaved);
    eq(r.price, cand.price, 'MSRP basis');
    // re-judge through the same injected diff: never a new error; 'g' really adds nothing
    var d = UP.upgradePlacementDiff(cand, r.slotKey, bld, REAL_DEPS);
    eq(d.newErrors.length, 0, r.candidate.id + ' must add no error');
    eq(r.state, d.newWarnings.length ? 'w' : 'g');
  });
  for(var i = 1; i < m.rows.length; i++){
    ok(m.rows[i].costPerGram >= m.rows[i - 1].costPerGram, 'globally sorted ascending');
  }
  // slots the sweep refuses to rank carry a reason, and none overlaps a ranked slot's rows
  m.slotNotes.forEach(function(n){
    ok(!m.rows.some(function(r){ return r.slotKey === n.slotKey; }), n.slotKey + ' cannot be both noted and ranked');
  });
});

test('sweep: deterministic — two runs produce byte-identical models', function(){
  var bld = B(GOOD);
  eq(JSON.stringify(UO.upgradeOptimizerModel(bld, REAL_DEPS)),
     JSON.stringify(UO.upgradeOptimizerModel(bld, REAL_DEPS)));
});

/* ---- renderer ------------------------------------------------------------ */

test('render: empty build — the hedged pick-parts-first sentence, no table', function(){
  var h = UO.renderUpgradeOptimizerHtml(UO.upgradeOptimizerModel({}, REAL_DEPS), {}, HELPERS);
  ok(h.indexOf('Pick some parts first') >= 0);
  ok(h.indexOf('<table') < 0);
});

test('render: the honest-framing sentences are present verbatim', function(){
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([part('ti-maxxis-aspen-29-24-exo-dual')]));
  var h = UO.renderUpgradeOptimizerHtml(m, {}, HELPERS);
  ok(h.indexOf('no brand is favored') >= 0, 'the unbiased-math sentence');
  ok(h.indexOf('sale prices never affect the ranking') >= 0, 'the MSRP-basis sentence');
  ok(h.indexOf('among the dimensions we check') >= 0, 'the engine-coverage hedge');
  ok(h.indexOf('Specs are illustrative sample data unless a part shows ✓ Verified in the app.') >= 0,
     'the app disclosure verbatim');
  ok(h.indexOf('All compatible') < 0, 'never the overclaim');
});

test('render: exclusions and unrankable slots are disclosed, never silent', function(){
  var sample = clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-sample-2', verified: undefined, source: undefined });
  var sampleCur = clone('dp-oneup-v3-316-210', { id: 'dp-test-cur-sample', verified: undefined, source: undefined });
  var bld = bl({ frontWheel: part('fw-reserve-30-hd-29'),
    frontTire: part('ti-maxxis-assegai-29-25-exop-mg'), dropper: sampleCur });
  var m = UO.upgradeOptimizerModel(bld, depsWith([sample, part('ti-maxxis-aspen-29-24-exo-dual')]));
  var h = UO.renderUpgradeOptimizerHtml(m, {}, HELPERS);
  ok(h.indexOf('never silently ranked') >= 0, 'the sample-weight tally names the promise');
  ok(h.indexOf('Not rankable') >= 0);
  ok(h.indexOf('has no ✓ Verified weight') >= 0, 'the slot note says why');
});

test('render: the display cap is disclosed with the remainder count', function(){
  /** @type {Part[]} */ var pool = [];
  for(var i = 0; i < 25; i++){
    pool.push(clone('ti-maxxis-aspen-29-24-exo-dual', { id: 'ti-test-cap-' + (i < 10 ? '0' : '') + i, weight: 700 + i }));
  }
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith(pool));
  eq(m.rows.length, 25);
  var h = UO.renderUpgradeOptimizerHtml(m, { limit: 20 }, HELPERS);
  ok(h.indexOf('and 5 more') >= 0, 'the remainder is disclosed');
  ok(h.indexOf('showing the top 20') >= 0);
});

test('render: warning rows carry the engine message; hostile strings are escaped', function(){
  var hostile = clone('ti-maxxis-aspen-29-24-exo-dual',
    { id: 'ti-test-hostile', brand: '<script>alert(1)</script>', model: '"><img onerror=x>' });
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([hostile]));
  eq(m.rows.length, 1);
  var h = UO.renderUpgradeOptimizerHtml(m, {}, HELPERS);
  ok(h.indexOf('<script>alert(1)') < 0, 'brand escaped');
  ok(h.indexOf('<img onerror') < 0, 'model escaped');
  ok(h.indexOf('&lt;script&gt;') >= 0);
  // and a real warning row renders its engine message
  var lighter309 = clone('dp-oneup-v3-316-210', { id: 'dp-test-309-l2', diameter: 30.9, weight: 438 });
  var bld2 = bl({ frame: part('fr-santacruz-megatower-cc'), dropper: part('dp-oneup-v3-316-210') });
  var m2 = UO.upgradeOptimizerModel(bld2, depsWith([lighter309]));
  var h2 = UO.renderUpgradeOptimizerHtml(m2, {}, HELPERS);
  ok(h2.indexOf('reducing shim') >= 0, 'the warning text rides along verbatim');
  ok(h2.indexOf('⚠') >= 0);
});

test('render: no rows but a filled build — the hedged none-found sentence, never an all-clear', function(){
  var m = UO.upgradeOptimizerModel(B(BENCH), depsWith([]));
  var h = UO.renderUpgradeOptimizerHtml(m, {}, HELPERS);
  ok(h.indexOf('No honestly rankable upgrades') >= 0);
  ok(h.indexOf('All compatible') < 0);
});
