/* test-garage-page.js — the garage page's pure model + renderers
 * (src/garage-page.js), plus src/cat-labels.js.
 *
 * The garage stopped being a modal on 2026-07-24 and became garage.html.
 * Everything that could be decided without a DOM moved into a pure module so
 * it is testable; this file is that test. It pins the three things that would
 * silently lie to a rider if they broke:
 *
 *   1. A saved build's verdict is checkBuild's own count, and a build that
 *      cannot be read says so rather than reading as clean.
 *   2. An inventory id the catalog no longer knows is shown AS ITS RAW ID and
 *      counted — never dropped, never renamed to something plausible.
 *   3. Every renderer escapes through the injected esc(), and none of them
 *      emits an "all clear".
 */
const {
  GARAGE_UNTITLED, garageBuildsModel, renderGarageBuildsHtml,
  inventoryModel, renderInventoryHtml, renderRecallBannersHtml,
  serviceTargetOptions, renderServiceTargetOptionsHtml
} = require('../src/garage-page.js');
const { TB_CAT_LABEL, tbCatLabel } = require('../src/cat-labels.js');
const { PARTS, byId, nameOf, canonicalId, sanitizeShare, checkBuild, buildTotals } = require('../src/compat.js');

/* Test doubles that behave like the real deps, so the model is exercised
   without dragging the whole catalog into every case. */
/** @param {*} s @returns {string} */
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** @param {*} n @returns {string} */
const money = (n) => '$' + Number(n || 0).toLocaleString();
const FMT = { esc, money };

const FAKE_BUILD_DEPS = {
  /** @param {Record<string,string>} b */
  sanitizeShare: (b) => ({ build: { ...b }, presetBy: {} }),
  /** @param {string} id */
  byId: (id) => ({ id, cat: 'frame', brand: 'X', model: id, price: 100, weight: 10 }),
  checkBuild: () => ({ errors: [], warnings: [], infos: [] }),
  buildTotals: () => ({ price: 1234, weight: 9876 })
};

const FAKE_INV_DEPS = {
  /** @param {string} id */
  canonicalId: (id) => (id === 'old-id' ? 'new-id' : id),
  /** @param {string} id */
  byId: (id) => (id === 'new-id'
    ? { id, cat: 'fork', brand: 'RockShox', model: 'ZEB', price: 999, weight: 2100 }
    : id === 'p-bar'
      ? { id, cat: 'handlebar', brand: 'Race Face', model: 'Next R', price: 150, weight: 220 }
      : null),
  /** @param {{brand:string,model:string}} p */
  nameOf: (p) => p.brand + ' ' + p.model,
  catLabel: tbCatLabel
};

/** The catalog always has these; assert once so tsc stops hedging below. */
/** @param {string} cat @returns {*} */
function firstOfCat(cat) {
  const p = PARTS.find((x) => x.cat === cat);
  if (!p) throw new Error('catalog has no ' + cat);
  return p;
}

describe('cat-labels: the one display map', () => {
  it('names the machine tokens riders never see', () => {
    expect(tbCatLabel('frontwheel')).toBe('Front Wheel');
    expect(tbCatLabel('bb')).toBe('Bottom Bracket');
    expect(tbCatLabel('pedal')).toBe('Pedals');
  });

  it('falls through to the raw token for an unlabelled category', () => {
    // Honest: a new category shows its real name rather than a guess.
    expect(tbCatLabel('gizmo')).toBe('gizmo');
    expect(tbCatLabel('')).toBe('');
  });

  it('covers every cat actually present in the live catalog', () => {
    const cats = new Set(PARTS.map((p) => p.cat));
    for (const c of cats) expect(TB_CAT_LABEL[c]).toBeTruthy();
  });
});

describe('garageBuildsModel', () => {
  it('reports the engine verdict, not a summary of its own', () => {
    const deps = { ...FAKE_BUILD_DEPS,
      checkBuild: () => ({ errors: [{}, {}], warnings: [{}], infos: [] }) };
    const [row] = garageBuildsModel([{ id: '1', data: { b: { frame: 'f' } } }], deps);
    expect(row.tone).toBe('error');
    expect(row.verdictLabel).toBe('2 conflicts');
  });

  it('singularises one conflict', () => {
    const deps = { ...FAKE_BUILD_DEPS, checkBuild: () => ({ errors: [{}], warnings: [], infos: [] }) };
    expect(garageBuildsModel([{ id: '1', data: {} }], deps)[0].verdictLabel).toBe('1 conflict');
  });

  it('warnings outrank silence but never read as errors', () => {
    const deps = { ...FAKE_BUILD_DEPS, checkBuild: () => ({ errors: [], warnings: [{}, {}], infos: [] }) };
    const [row] = garageBuildsModel([{ id: '1', data: {} }], deps);
    expect(row.tone).toBe('warn');
    expect(row.verdictLabel).toBe('2 to check');
  });

  it('says "No conflicts found" — never "all compatible"', () => {
    const [row] = garageBuildsModel([{ id: '1', data: {} }], FAKE_BUILD_DEPS);
    expect(row.tone).toBe('ok');
    expect(row.verdictLabel).toBe('No conflicts found');
    expect(row.verdictLabel.toLowerCase()).not.toContain('compatible');
  });

  it('keeps an unreadable build, marked unknown rather than clean', () => {
    const deps = { ...FAKE_BUILD_DEPS, sanitizeShare: () => { throw new Error('corrupt'); } };
    const [row] = garageBuildsModel([{ id: '1', name: 'Broken', data: null }], deps);
    expect(row.tone).toBe('unknown');
    expect(row.verdictLabel).toBe('Could not read this build');
    expect(row.name).toBe('Broken');          // still listed — the rider saved it
  });

  it('labels a nameless build once, in one place', () => {
    const rows = garageBuildsModel(
      [{ id: '1', data: {} }, { id: '2', name: '   ', data: {} }], FAKE_BUILD_DEPS);
    expect(rows.map((r) => r.name)).toEqual([GARAGE_UNTITLED, GARAGE_UNTITLED]);
  });

  it('passes totals through and counts filled slots', () => {
    const [row] = garageBuildsModel(
      [{ id: '1', data: { b: { frame: 'f', fork: 'k' } } }], FAKE_BUILD_DEPS);
    expect(row.price).toBe(1234);
    expect(row.weight).toBe(9876);
    expect(row.partCount).toBe(2);
  });

  it('separates completed from in-progress by the stored status only', () => {
    const rows = garageBuildsModel([
      { id: '1', status: 'completed', data: {} },
      { id: '2', status: 'in_progress', data: {} },
      { id: '3', data: {} }
    ], FAKE_BUILD_DEPS);
    expect(rows.map((r) => r.done)).toEqual([true, false, false]);
  });

  it('runs on real saved payloads through the real engine', () => {
    // A payload that came out of the app: real ids, the real sanitizer.
    const frame = firstOfCat('frame');
    const rows = garageBuildsModel(
      [{ id: 'r1', name: 'Real', status: 'in_progress', data: { b: { frame: frame.id }, p: {} } }],
      { sanitizeShare, byId, checkBuild, buildTotals });
    expect(rows[0].partCount).toBe(1);
    expect(rows[0].price).toBeGreaterThan(0);
    expect(['ok', 'warn', 'error']).toContain(rows[0].tone);
  });

  it('is pure — the input rows are not mutated', () => {
    const input = [{ id: '1', name: 'A', data: { b: { frame: 'f' } } }];
    const before = JSON.stringify(input);
    garageBuildsModel(input, FAKE_BUILD_DEPS);
    expect(JSON.stringify(input)).toBe(before);
  });

  it('tolerates an empty/absent row list', () => {
    expect(garageBuildsModel([], FAKE_BUILD_DEPS)).toEqual([]);
    expect(garageBuildsModel(/** @type {*} */ (null), FAKE_BUILD_DEPS)).toEqual([]);
  });
});

describe('renderGarageBuildsHtml', () => {
  const model = garageBuildsModel([
    { id: '1', name: '<img src=x onerror=alert(1)>', status: 'in_progress', data: {} },
    { id: '2', name: 'Done one', status: 'completed', data: {} }
  ], FAKE_BUILD_DEPS);

  it('escapes a hostile build name', () => {
    const html = renderGarageBuildsHtml(model, FMT);
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;img src=x');
  });

  it('renders both sections with their counts', () => {
    const html = renderGarageBuildsHtml(model, FMT);
    expect(html).toContain('In progress');
    expect(html).toContain('Completed');
    expect(html).toContain('Reopen');        // the completed row's toggle
    expect(html).toContain('Mark complete'); // the in-progress row's toggle
  });

  it('offers the service button only when the table exists', () => {
    expect(renderGarageBuildsHtml(model, FMT, { serviceLog: false })).not.toContain('data-a="svc"');
    expect(renderGarageBuildsHtml(model, FMT, { serviceLog: true })).toContain('data-a="svc"');
  });

  it('points an empty garage at the builder rather than showing nothing', () => {
    const html = renderGarageBuildsHtml([], FMT);
    expect(html).toContain('No saved builds yet');
    expect(html).toContain('Save to garage');
  });

  it('carries the verdict in TEXT, not only in the dot colour', () => {
    const html = renderGarageBuildsHtml(model, FMT);
    expect(html).toContain('No conflicts found');
    expect(html).toContain('gdot-ok');
  });
});

describe('inventoryModel', () => {
  it('resolves a retired id through canonicalId', () => {
    const m = inventoryModel([{ id: 'r1', part_id: 'old-id', qty: 2 }], FAKE_INV_DEPS);
    expect(m.rows[0].known).toBe(true);
    expect(m.rows[0].partId).toBe('new-id');
    expect(m.rows[0].name).toBe('RockShox ZEB');
    expect(m.rows[0].qty).toBe(2);
  });

  it('keeps an unknown part as its raw id, counted and disclosed', () => {
    const m = inventoryModel([{ id: 'r1', part_id: 'gone-forever', qty: 1 }], FAKE_INV_DEPS);
    expect(m.rows.length).toBe(1);              // never dropped
    expect(m.rows[0].known).toBe(false);
    expect(m.rows[0].name).toBe('gone-forever');// never renamed to a plausible part
    expect(m.rows[0].price).toBe(null);         // no fabricated price
    expect(m.unknownCount).toBe(1);
  });

  it('sorts by category then name, unknown rows last', () => {
    const m = inventoryModel([
      { id: '1', part_id: 'gone', qty: 1 },
      { id: '2', part_id: 'p-bar', qty: 1 },
      { id: '3', part_id: 'new-id', qty: 1 }
    ], FAKE_INV_DEPS);
    expect(m.rows.map((r) => r.name)).toEqual(['RockShox ZEB', 'Race Face Next R', 'gone']);
  });

  it('counts UNITS, not rows', () => {
    const m = inventoryModel([
      { id: '1', part_id: 'new-id', qty: 2 },
      { id: '2', part_id: 'p-bar', qty: 3 }
    ], FAKE_INV_DEPS);
    expect(m.totalUnits).toBe(5);
  });

  it('treats a missing or nonsense qty as one', () => {
    const m = inventoryModel([
      { id: '1', part_id: 'p-bar' },
      { id: '2', part_id: 'new-id', qty: 0 }
    ], FAKE_INV_DEPS);
    expect(m.rows.every((r) => r.qty === 1)).toBe(true);
  });

  it('does not leak its internal sort key into the rows', () => {
    const m = inventoryModel([{ id: '1', part_id: 'p-bar', qty: 1 }], FAKE_INV_DEPS);
    expect('_cat' in m.rows[0]).toBe(false);
  });

  it('runs against the real catalog helpers', () => {
    const real = firstOfCat('tire');
    const m = inventoryModel([{ id: 'r', part_id: real.id, qty: 2 }],
      { canonicalId, byId, nameOf, catLabel: tbCatLabel });
    expect(m.rows[0].known).toBe(true);
    expect(m.rows[0].name).toBe(nameOf(real));
    expect(m.rows[0].meta).toContain('Tires');
    expect(m.unknownCount).toBe(0);
  });
});

describe('renderInventoryHtml', () => {
  it('escapes a hostile part name from an unresolvable id', () => {
    const m = inventoryModel([{ id: '1', part_id: '<script>x</script>', qty: 1 }], FAKE_INV_DEPS);
    const html = renderInventoryHtml(m, FMT);
    expect(html).not.toContain('<script>x');
    expect(html).toContain('&lt;script&gt;');
  });

  it('discloses unknown parts instead of quietly listing them', () => {
    const m = inventoryModel([{ id: '1', part_id: 'gone', qty: 1 }], FAKE_INV_DEPS);
    const html = renderInventoryHtml(m, FMT);
    expect(html).toContain('no longer in the catalog');
    expect(html).toContain('not guessed a replacement');
  });

  it('says nothing about unknown parts when there are none', () => {
    const m = inventoryModel([{ id: '1', part_id: 'p-bar', qty: 1 }], FAKE_INV_DEPS);
    expect(renderInventoryHtml(m, FMT)).not.toContain('no longer in the catalog');
  });

  it('offers no service button for a part the catalog cannot resolve', () => {
    // A record keyed to an unresolvable id would render as a raw slug forever.
    const m = inventoryModel([{ id: '1', part_id: 'gone', qty: 1 }], FAKE_INV_DEPS);
    expect(renderInventoryHtml(m, FMT, { serviceLog: true })).not.toContain('data-a="svc"');
  });

  it('tells an empty inventory where parts come from', () => {
    const html = renderInventoryHtml({ rows: [], unknownCount: 0, totalUnits: 0 }, FMT);
    expect(html).toContain('No parts yet');
    expect(html).toContain('Add this build');
  });
});

describe('renderRecallBannersHtml', () => {
  const NOTICE = [{
    partId: 'p-bar',
    note: {
      hazard: 'Can crack <unexpectedly>',
      scopeNote: 'Serials 001–999 only',
      remedy: 'Stop riding; contact the dealer',
      sourceUrl: 'https://example.invalid/recall',
      sourceLabel: 'CPSC notice'
    }
  }];
  const DEPS = { esc, byId: FAKE_INV_DEPS.byId, nameOf: FAKE_INV_DEPS.nameOf };

  it('names the part and escapes the ledger text', () => {
    const html = renderRecallBannersHtml(NOTICE, DEPS);
    expect(html).toContain('Race Face Next R');
    expect(html).toContain('&lt;unexpectedly&gt;');
    expect(html).toContain('Serials 001–999 only');   // the honest scope, verbatim
  });

  it('renders NOTHING when there is nothing to report', () => {
    // Never an "all clear": the ledger only knows recalls it has a citation
    // for, and silence is not proof of safety.
    expect(renderRecallBannersHtml([], DEPS)).toBe('');
    expect(renderRecallBannersHtml(/** @type {*} */ (null), DEPS)).toBe('');
  });

  it('falls back to the raw id when the part left the catalog', () => {
    const html = renderRecallBannersHtml([{ ...NOTICE[0], partId: 'gone' }], DEPS);
    expect(html).toContain('gone');
  });
});

describe('serviceTargetOptions', () => {
  const builds = garageBuildsModel([{ id: 'b1', name: 'Trail bike', data: {} }], FAKE_BUILD_DEPS);
  const inv = inventoryModel([
    { id: 'i1', part_id: 'p-bar', qty: 1 },
    { id: 'i2', part_id: 'p-bar', qty: 1 },   // same part twice
    { id: 'i3', part_id: 'gone', qty: 1 }
  ], FAKE_INV_DEPS).rows;

  it('offers builds first, then each owned part once', () => {
    const opts = serviceTargetOptions(builds, inv);
    expect(opts.map((o) => o.value)).toEqual(['build:b1', 'part:p-bar']);
  });

  it('never offers a part the catalog cannot resolve', () => {
    expect(serviceTargetOptions(builds, inv).some((o) => o.id === 'gone')).toBe(false);
  });

  it('groups and escapes the rendered options', () => {
    const html = renderServiceTargetOptionsHtml(serviceTargetOptions(builds, inv), FMT);
    expect(html).toContain('<optgroup label="Builds">');
    expect(html).toContain('<optgroup label="Parts you own">');
    const hostile = serviceTargetOptions(
      garageBuildsModel([{ id: 'x', name: '</option><b>hi', data: {} }], FAKE_BUILD_DEPS), []);
    expect(renderServiceTargetOptionsHtml(hostile, FMT)).not.toContain('</option><b>');
  });

  it('says what to do first when there is nothing to service', () => {
    expect(renderServiceTargetOptionsHtml([], FMT)).toContain('Save a build or add a part first');
  });
});

describe('garage-page: hard rule 2', () => {
  it('opens nothing, appends nothing, schedules nothing', () => {
    const src = require('fs').readFileSync(require('path').join(__dirname, '../src/garage-page.js'), 'utf8');
    for (const banned of ['showModal', 'appendChild', 'setTimeout', 'setInterval',
                          'window.open', 'insertBefore', 'document.']) {
      expect(src).not.toContain(banned);
    }
  });
});
