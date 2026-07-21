'use strict';
/* DISCONTINUED ARCHIVE (src/discontinued-archive.js, committed feature slate)
   — the click-opened "what's gone, and what replaced it" view's pure model +
   renderer. The model must include ONLY status:'discontinued' rows (recalled
   and current/absent excluded), resolve supersededBy strictly within its own
   source (never across catalogs), carry a chained successor's own lifecycle
   status, and keep an unresolvable pointer raw instead of dropping it. The
   renderer must escape every dynamic string and keep the honest framing:
   "No recorded successor" (what OUR data records, never "none exists"), the
   raw-id fallback disclosed as such, and the app's sample-data disclosure
   verbatim. */
var U = require('./test-util.js');
var C = U.C, eq = U.eq, ok = U.ok, some = U.some;
var DA = require('../src/discontinued-archive.js');

var modelOf = DA.discontinuedArchiveModel;
var render = DA.renderDiscontinuedArchiveHtml;

/* Same helper shapes index.html injects (esc from compat.js, money = tbMoney). */
/** @param {number} n */
function money(n){ return '$' + (n || 0).toLocaleString(); }
var HELPERS = { esc: C.esc, money: money };

/** A tiny synthetic catalog exercising every lifecycle shape. Categories are
 *  introduced in fork-then-frame order on purpose (order-preservation case). */
/** @type {import('../src/discontinued-archive.js').ArchivePartLike[]} */
var PARTS_A = [
  { id: 'fk-a-old', cat: 'fork', brand: 'Acme', model: 'Fork Mk1', price: 900, modelYear: 2020,
    status: 'discontinued', supersededBy: 'fk-a-new' },
  { id: 'fk-a-new', cat: 'fork', brand: 'Acme', model: 'Fork Mk2', price: 950 },              // current (absent status)
  { id: 'fr-a-v1', cat: 'frame', brand: 'Acme', model: 'Frame', price: 2000, modelYear: 2019,
    status: 'discontinued', supersededBy: 'fr-a-v2' },
  { id: 'fr-a-v2', cat: 'frame', brand: 'Acme', model: 'Frame', price: 2100, modelYear: 2022,
    status: 'discontinued', supersededBy: 'fr-a-v3', verified: true },                        // chained: itself discontinued
  { id: 'fr-a-v3', cat: 'frame', brand: 'Acme', model: 'Frame V3', price: 2200, status: 'current' },
  { id: 'fr-a-dangling', cat: 'frame', brand: 'Zeta', model: 'Ghost', price: 1500,
    status: 'discontinued', supersededBy: 'fr-not-here' },                                    // pointer leaves this source
  { id: 'fr-a-orphan', cat: 'frame', brand: 'Beta', model: 'Orphan', price: 1200,
    status: 'discontinued' },                                                                 // no pointer at all
  { id: 'fr-a-recalled', cat: 'frame', brand: 'Acme', model: 'Bad Batch', price: 1800, status: 'recalled' },
  { id: 'fk-b-rec-succ', cat: 'fork', brand: 'Beta', model: 'Slider', price: 700, modelYear: 2021,
    status: 'discontinued', supersededBy: 'fk-b-rec' },
  { id: 'fk-b-rec', cat: 'fork', brand: 'Beta', model: 'Slider 2', price: 750, status: 'recalled' }  // successor recalled
];

/** A second source whose id space contains the first source's dangling target
 *  — resolution must NOT cross sources. */
/** @type {import('../src/discontinued-archive.js').ArchivePartLike[]} */
var PARTS_B = [
  { id: 'fr-not-here', cat: 'frame', brand: 'Other', model: 'World', price: 1 },
  { id: 'hb-b-old', cat: 'handlebar', brand: 'Bar Co', model: 'Riser', price: 80,
    status: 'discontinued', supersededBy: 'hb-b-new' },
  { id: 'hb-b-new', cat: 'handlebar', brand: 'Bar Co', model: 'Riser 35', price: 90 }
];

/** Find a row anywhere in the model; tests assert presence before use, so the
 *  return is deliberately loose for terse assertions.
 *  @param {import('../src/discontinued-archive.js').ArchiveModel} m
 *  @param {string} id
 *  @returns {*} */
function rowById(m, id){
  var found = null;
  m.sources.forEach(function(s){ s.cats.forEach(function(g){ g.rows.forEach(function(r){ if(r.id === id) found = r; }); }); });
  return found;
}

describe('discontinued-archive model', function(){

  var M = modelOf([{ label: 'Mountain', parts: PARTS_A }]);

  it('includes only status:"discontinued" rows — current, absent and recalled are excluded', function(){
    eq(M.total, 6, 'six discontinued rows in the synthetic catalog');
    ok(!rowById(M, 'fk-a-new'), 'absent-status (current) row excluded');
    ok(!rowById(M, 'fr-a-v3'), 'explicit status:"current" row excluded');
    ok(!rowById(M, 'fr-a-recalled'), 'recalled row excluded — recalls have their own surface');
    ok(!rowById(M, 'fk-b-rec'), 'recalled successor row excluded from the listing itself');
  });

  it('resolves supersededBy within the source: name, id and normalized status', function(){
    var r = rowById(M, 'fk-a-old');
    ok(r && r.successor, 'resolved successor present');
    eq(r.successor.id, 'fk-a-new');
    eq(r.successor.name, 'Acme Fork Mk2');
    eq(r.successor.status, 'current', 'absent status on the successor normalizes to current');
    eq(r.supersededBy, 'fk-a-new', 'raw pointer kept alongside the resolution');
  });

  it('carries a chained successor\'s own lifecycle status', function(){
    var v1 = rowById(M, 'fr-a-v1');
    eq(v1.successor.status, 'discontinued', 'V1 -> V2 where V2 is itself discontinued');
    var v2 = rowById(M, 'fr-a-v2');
    eq(v2.successor.status, 'current', 'V2 -> V3 which is current');
    var rec = rowById(M, 'fk-b-rec-succ');
    eq(rec.successor.status, 'recalled', 'a recalled successor is labeled as such');
  });

  it('keeps an unresolvable pointer raw (successor null) and never invents one', function(){
    var r = rowById(M, 'fr-a-dangling');
    eq(r.successor, null);
    eq(r.supersededBy, 'fr-not-here', 'the raw pointer survives');
    var o = rowById(M, 'fr-a-orphan');
    eq(o.successor, null);
    eq(o.supersededBy, null, 'no pointer at all stays null');
  });

  it('never resolves a pointer across sources', function(){
    var M2 = modelOf([{ label: 'Mountain', parts: PARTS_A }, { label: 'Road', parts: PARTS_B }]);
    var r = rowById(M2, 'fr-a-dangling');
    eq(r.successor, null, 'fr-not-here exists in source B but must not resolve for source A');
    var hb = rowById(M2, 'hb-b-old');
    eq(hb.successor.name, 'Bar Co Riser 35', 'source B resolves inside itself');
    eq(M2.total, 7);
    eq(M2.sources[0].count, 6);
    eq(M2.sources[1].count, 1);
  });

  it('groups by category in the catalog\'s first-appearance order, rows sorted name then year', function(){
    var cats = M.sources[0].cats.map(function(g){ return g.cat; });
    eq(cats.join(','), 'fork,frame', 'fork appears first in the synthetic catalog');
    var frameNames = M.sources[0].cats[1].rows.map(function(r){ return r.id; });
    // Acme Frame (2019) before Acme Frame (2022) — same name, older year first;
    // Beta Orphan and Zeta Ghost follow alphabetically.
    eq(frameNames.join(','), 'fr-a-v1,fr-a-v2,fr-a-orphan,fr-a-dangling');
  });

  it('passes verified and price through untouched', function(){
    var v2 = rowById(M, 'fr-a-v2');
    eq(v2.verified, true);
    eq(v2.price, 2100);
    eq(rowById(M, 'fk-a-old').verified, false, 'absent verified normalizes to false');
  });

  it('handles an empty source and an empty source list', function(){
    eq(modelOf([]).total, 0);
    var E = modelOf([{ label: 'Road', parts: [] }]);
    eq(E.total, 0);
    eq(E.sources[0].count, 0);
  });

  it('is deterministic', function(){
    eq(JSON.stringify(modelOf([{ label: 'M', parts: PARTS_A }])),
       JSON.stringify(modelOf([{ label: 'M', parts: PARTS_A }])));
  });
});

describe('discontinued-archive on the real catalog', function(){
  var M = modelOf([{ label: 'Mountain', parts: C.PARTS }]);

  it('lists every discontinued PARTS row, and only those', function(){
    var expect = C.PARTS.filter(function(p){ return p.status === 'discontinued'; });
    ok(expect.length > 0, 'the live catalog has discontinued rows');
    eq(M.total, expect.length);
    expect.forEach(function(p){ ok(rowById(M, p.id), p.id + ' present in the archive'); });
  });

  it('every supersededBy pointer in the live catalog resolves (the validator guarantees it)', function(){
    M.sources[0].cats.forEach(function(g){ g.rows.forEach(function(r){
      if(r.supersededBy) ok(r.successor, r.id + ' -> ' + r.supersededBy + ' resolves');
    }); });
  });
});

describe('discontinued-archive renderer', function(){

  var M = modelOf([{ label: 'Mountain', parts: PARTS_A }]);
  var HTML = render(M, HELPERS);

  it('renders every row with its successor line', function(){
    some([HTML], 'Acme Fork Mk1', 'row name rendered');
    some([HTML], 'Superseded by <b>Acme Fork Mk2</b>', 'resolved successor named');
    some([HTML], '(also discontinued)', 'chained discontinued successor disclosed');
    some([HTML], '(recalled)', 'recalled successor disclosed');
    some([HTML], '<code>fr-not-here</code>', 'dangling pointer shown raw');
    some([HTML], '(not in this catalog)', 'dangling pointer disclosed as unresolved');
  });

  it('keeps the honest framing: "No recorded successor" states our data, never nonexistence', function(){
    some([HTML], 'No recorded successor.', 'the exact recorded-successor wording');
    ok(HTML.indexOf('no successor exists') < 0, 'never claims nonexistence');
  });

  it('carries the app\'s sample-data disclosure verbatim', function(){
    some([HTML], 'Specs are illustrative sample data unless a part shows ✓ Verified in the app.',
      'disclosure sentence unchanged');
  });

  it('shows the ✓ Verified marker only on verified rows', function(){
    eq((HTML.match(/da-verified/g) || []).length, 1, 'exactly the one verified synthetic row');
  });

  it('labels source headings only for multi-source models', function(){
    ok(HTML.indexOf('da-source') < 0, 'single source: no source heading');
    var M2 = render(modelOf([{ label: 'Mountain', parts: PARTS_A }, { label: 'Road', parts: PARTS_B }]), HELPERS);
    ok(M2.indexOf('da-source') >= 0 && M2.indexOf('Mountain') >= 0 && M2.indexOf('Road') >= 0,
      'multi source: both labeled');
    ok(M2.indexOf('across 2 catalogs') >= 0, 'summary counts the catalogs');
  });

  it('escapes every dynamic string (hostile brand/model/id/label)', function(){
    var HOSTILE = [
      { id: 'x-<img src=x onerror=alert(1)>', cat: '<script>cat</script>', brand: '<b>Evil</b>', model: '"quoted" & <i>model</i>',
        price: 5, status: 'discontinued', supersededBy: 'x-<script>gone</script>' }
    ];
    var h = render(modelOf([{ label: '<script>src</script>', parts: HOSTILE }, { label: 'Two', parts: [] }]), HELPERS);
    ok(h.indexOf('<script>') < 0, 'no raw script tag survives');
    ok(h.indexOf('<img') < 0, 'no raw img tag survives');
    ok(h.indexOf('<b>Evil</b>') < 0, 'brand escaped');
    ok(h.indexOf('&lt;b&gt;Evil&lt;/b&gt;') >= 0, 'escaped form present');
  });

  it('renders the empty state for a catalog with nothing discontinued', function(){
    var h = render(modelOf([{ label: 'Road', parts: [] }]), HELPERS);
    some([h], 'No discontinued parts on record', 'empty state');
    ok(h.indexOf('da-row') < 0, 'no rows rendered');
  });

  it('uses the injected catLabel when provided, raw cat otherwise', function(){
    var withLabel = render(M, { esc: C.esc, money: money, catLabel: function(c){ return c === 'fork' ? 'Forks' : c; } });
    ok(withLabel.indexOf('Forks') >= 0, 'injected label used');
    ok(HTML.indexOf('>fork <') >= 0 || HTML.indexOf('fork') >= 0, 'raw cat key fallback');
  });
});
