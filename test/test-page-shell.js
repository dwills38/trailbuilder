/* test-page-shell.js — the shared page chrome (src/page-shell.js).
 *
 * Two jobs:
 *
 *  1. Pin the pure renderer (tbLegalLinksHtml) — the ONE definition of the
 *     legal-link tail, including the ../ base prefix KitBuilder needs.
 *
 *  2. Guard EVERY served page against the drift that actually happened. On
 *     2026-07-23 an audit found five of seven pages missing their legal links
 *     and four missing the analytics beacon — pure copy-paste omissions that
 *     no test could catch, because nothing asserted across pages. This file
 *     asserts across pages: a new .html that forgets its legal footer, or a
 *     hand-edit that desyncs one page's link list from TB_LEGAL_LINKS, fails
 *     CI instead of shipping.
 *
 * The six BUILDER pages mount the tail from page-shell.js. The five STATIC
 * content pages keep it as literal HTML on purpose (they must read correctly
 * with JavaScript off, and legally-required links do not belong behind a
 * script) — so this file checks them against the same canonical list, which
 * is what makes them single-sourced in effect.
 */
const fs = require('fs');
const path = require('path');
const { TB_LEGAL_LINKS, TB_LEGAL_SEP, tbLegalLinksHtml, tbLegalLinksText } = require('../src/page-shell.js');

const ROOT = path.join(__dirname, '..');
/** @param {string} f @returns {string} */
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* Pages that render their catalog from JS and mount the tail via page-shell.js. */
const BUILDER_PAGES = [
  { file: 'index.html',            base: '' },
  { file: 'bmx.html',              base: '' },
  { file: 'road.html',             base: '' },
  { file: 'gravel.html',           base: '' },
  { file: 'emtb.html',             base: '' },
  { file: 'KitBuilder/index.html', base: '../' },
];

/* Static content pages — literal links, must work with JS off. */
const STATIC_PAGES = [
  { file: 'home.html',                base: '' },
  { file: 'about.html',               base: '' },
  { file: 'privacy.html',             base: '' },
  { file: 'terms.html',               base: '' },
  { file: 'affiliate-disclosure.html', base: '' },
];

const ALL_PAGES = BUILDER_PAGES.concat(STATIC_PAGES);

/* The publishable Cloudflare Web Analytics token (committed constant, same
   pattern as REPORT_REPO/src/config.js). Four pages were missing this. */
const BEACON = 'static.cloudflareinsights.com/beacon.min.js';

describe('page-shell: the legal-link renderer', () => {
  it('renders the three legal links, in order, at the site root', () => {
    expect(tbLegalLinksHtml()).toBe(
      '<a href="privacy.html">Privacy</a> · ' +
      '<a href="terms.html">Terms</a> · ' +
      '<a href="affiliate-disclosure.html">Affiliate Disclosure</a>'
    );
  });

  it('applies a base prefix so /KitBuilder/ resolves one level up', () => {
    const html = tbLegalLinksHtml('../');
    expect(html).toContain('href="../privacy.html"');
    expect(html).toContain('href="../terms.html"');
    expect(html).toContain('href="../affiliate-disclosure.html"');
    expect(html).not.toContain('href="privacy.html"');   // no un-prefixed leak
  });

  it('treats a missing/empty base as the site root', () => {
    expect(tbLegalLinksHtml('')).toBe(tbLegalLinksHtml());
    expect(tbLegalLinksHtml(undefined)).toBe(tbLegalLinksHtml());
  });

  it('exposes the same list as plain text', () => {
    expect(tbLegalLinksText()).toBe('Privacy · Terms · Affiliate Disclosure');
  });

  it('keeps the canonical list itself honest', () => {
    expect(TB_LEGAL_LINKS.map((l) => l.href)).toEqual(
      ['privacy.html', 'terms.html', 'affiliate-disclosure.html']
    );
    // The separator is U+00B7, not an ASCII dot or a hyphen.
    expect(TB_LEGAL_SEP).toBe(' · ');
  });

  it('is pure — repeated calls cannot mutate the canonical list', () => {
    const before = JSON.stringify(TB_LEGAL_LINKS);
    tbLegalLinksHtml('../');
    tbLegalLinksHtml('');
    expect(JSON.stringify(TB_LEGAL_LINKS)).toBe(before);
  });
});

describe('page-shell: every served page carries the shared chrome', () => {
  /* The regression that motivated this file. */
  it.each(ALL_PAGES)('$file has the analytics beacon', ({ file }) => {
    expect(read(file)).toContain(BEACON);
  });

  it.each(ALL_PAGES)('$file links all three legal pages', ({ file, base }) => {
    const html = read(file);
    for (const link of TB_LEGAL_LINKS) {
      // Either mounted from page-shell.js, or written literally.
      const literal = html.includes('href="' + base + link.href + '"');
      const mounted = html.includes('data-tb-legal');
      expect(literal || mounted).toBe(true);
    }
  });

  it.each(BUILDER_PAGES)('$file mounts the tail from page-shell.js', ({ file, base }) => {
    const html = read(file);
    expect(html).toContain('<span data-tb-legal></span>');
    expect(html).toContain('<script src="' + base + 'src/page-shell.js"></script>');
  });

  it.each(BUILDER_PAGES)('$file loads page-shell.js after ui-common.js', ({ file, base }) => {
    const html = read(file);
    // ui-common.js owns the pre-paint theme guard and must stay first.
    expect(html.indexOf(base + 'src/ui-common.js'))
      .toBeLessThan(html.indexOf(base + 'src/page-shell.js'));
  });

  it.each(BUILDER_PAGES)('$file no longer hand-writes the legal links', ({ file, base }) => {
    const html = read(file);
    // The whole point: exactly one definition. A hand-written <a> to a legal
    // page in the footer means someone re-introduced the copy.
    for (const link of TB_LEGAL_LINKS) {
      expect(html).not.toContain('<a href="' + base + link.href + '">' + link.label + '</a>');
    }
  });

  it.each(STATIC_PAGES)('$file spells the legal links exactly like the shell', ({ file, base }) => {
    const html = read(file);
    for (const link of TB_LEGAL_LINKS) {
      expect(html).toContain('<a href="' + base + link.href + '">' + link.label + '</a>');
    }
  });

  /* Hard rule 2 — the shell must never introduce an auto-appearing anything. */
  it('page-shell.js opens no dialog, appends nothing to <body>, sets no timer', () => {
    const src = read('src/page-shell.js');
    for (const banned of ['showModal', '.open =', 'appendChild', 'setTimeout',
                          'setInterval', 'window.open', 'insertBefore']) {
      expect(src).not.toContain(banned);
    }
  });
});
