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
const { TB_LEGAL_LINKS, TB_LEGAL_SEP, tbLegalLinksHtml, tbLegalLinksText,
        TB_FAMILY, TB_FAMILY_HERE_NOTE, tbFamilyMenuItemsHtml } = require('../src/page-shell.js');

const ROOT = path.join(__dirname, '..');
/** @param {string} f @returns {string} */
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* Pages that render their catalog from JS and mount the tail via page-shell.js. */
const BUILDER_PAGES = [
  { file: 'index.html',            base: '',     famId: 'mtb' },
  { file: 'bmx.html',              base: '',     famId: 'bmx' },
  { file: 'road.html',             base: '',     famId: 'road' },
  { file: 'gravel.html',           base: '',     famId: 'gravel' },
  { file: 'emtb.html',             base: '',     famId: 'emtb' },
  { file: 'KitBuilder/index.html', base: '../',  famId: 'kit' },
  /* garage.html (2026-07-24) is not a BUILDER, but it is a served page with the
     same header and footer chrome, so it takes the same guards. It marks 'mtb'
     as current: it is BuildMyMTB's garage. */
  { file: 'garage.html',           base: '',     famId: 'mtb' },
];

/* Static content pages — literal links, must work with JS off. */
const STATIC_PAGES = [
  { file: 'home.html',                base: '' },
  { file: 'about.html',               base: '' },
  { file: 'privacy.html',             base: '' },
  { file: 'terms.html',               base: '' },
  { file: 'affiliate-disclosure.html', base: '' },
];

/* Every page the site serves. Only `file`/`base` are read here, so the two
   lists are narrowed to that shape before joining. */
const ALL_PAGES = BUILDER_PAGES.map(({ file, base }) => ({ file, base }))
  .concat(STATIC_PAGES.map(({ file, base }) => ({ file, base })));

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

  it.each(BUILDER_PAGES)('$file mounts the family switcher as its own id', ({ file, famId }) => {
    const html = read(file);
    expect(html).toContain('<span data-tb-family="' + famId + '"></span>');
    // Exactly one switcher per page, and its <details>/.fam-pop wrapper stays
    // in the markup (each page's inline handler resolves #famMenu at parse
    // time, and the wordmark/mission legitimately differ per page).
    expect(html.split('data-tb-family=').length - 1).toBe(1);
    expect(html).toContain('<details class="fam-menu" id="famMenu">');
    expect(html).toContain('<div class="fam-pop" role="menu"');
  });

  /* ONE builders control (Douglas 2026-07-24). index.html used to offer the
     same six surfaces THREE ways: the wordmark's hidden <details>, a 🏁
     BuildMyBMX button and a 🧰 BuildMyRideKit button. The switcher is now the
     explicit "🚲 Builders ▾" control and the standalone buttons are gone.
     Scoped to index.html on purpose — the other five builders still carry the
     old wordmark menu until the replication chip lands, and a cross-page
     assertion here would fail for work that has not been done yet. Widen this
     to BUILDER_PAGES at replication. */
  it('index.html has no standalone per-surface nav buttons', () => {
    const html = read('index.html');
    expect(html).not.toContain('id="bmxNavBtn"');
    expect(html).not.toContain('id="kitBuilderNavBtn"');
    // …and no hand-written link to a sibling builder outside the mounted list.
    for (const f of TB_FAMILY) {
      if (f.href === '' || f.id === 'about') continue;   // About keeps its own header button
      expect(html).not.toContain('href="' + f.href + '"');
    }
  });

  it.each(['index.html', 'garage.html'])('%s labels the builders control in words, not just an icon', (file) => {
    const html = read(file);
    // .hdr-long hides a label on phones; the primary nav control must not be
    // a bare emoji there (that is the hidden affordance we just removed).
    expect(html).toMatch(/id="buildersBtn"[^>]*>🚲 Builders /);
  });

  /* THE DEPLOY TRAP. Every root .html the site serves needs its own cp line in
     deploy.yml or it 404s in production while working perfectly on localhost —
     the file's own comments warn about it, and CNAME/about.html/home.html each
     learned it the hard way. The TB_FAMILY check below covers pages in the
     Builders menu; garage.html is reached from the header instead, so it needs
     its own assertion. */
  it.each(['garage.html'])('%s is staged by deploy.yml', (file) => {
    expect(read('.github/workflows/deploy.yml')).toContain('cp ' + file + ' _site/');
  });

  /* Accounts-gated pages must be kept out of search results — the page itself
     shows nothing without a session, but the URL should not be indexed. */
  it('garage.html is noindex (private, account-gated content)', () => {
    expect(read('garage.html')).toContain('name="robots" content="noindex"');
  });

  it.each(BUILDER_PAGES)('$file no longer hand-writes the family menu', ({ file }) => {
    const html = read(file);
    const famPop = html.split('<div class="fam-pop"')[1].split('<div class="fam-mission"')[0];
    expect(famPop).not.toContain('<a ');   // the whole point: one list, one place
  });
});

describe('page-shell: the family switcher', () => {
  it('lists exactly the live surfaces, in order, plus About last', () => {
    expect(TB_FAMILY.map((f) => f.id)).toEqual(
      ['mtb', 'bmx', 'road', 'gravel', 'emtb', 'kit', 'about']
    );
  });

  it('marks the current page, and only the current page', () => {
    const html = tbFamilyMenuItemsHtml('road', '');
    expect((html.match(/class="here"/g) || []).length).toBe(1);
    expect((html.match(/aria-current="page"/g) || []).length).toBe(1);
    expect(html).toContain('<a class="here" href="road.html" role="menuitem" aria-current="page">'
      + '🚴 BuildMyRoadbike <span class="fam-soft">— ' + TB_FAMILY_HERE_NOTE + '</span></a>');
  });

  it('marks nothing when the current id is unknown or omitted', () => {
    for (const cur of [undefined, '', 'strider']) {
      expect(tbFamilyMenuItemsHtml(cur, '')).not.toContain('class="here"');
    }
  });

  it('sends the MTB entry to the site root, from either depth', () => {
    expect(tbFamilyMenuItemsHtml('bmx', '')).toContain('<a href="/" role="menuitem">🚵 BuildMyMTB</a>');
    expect(tbFamilyMenuItemsHtml('kit', '../')).toContain('<a href="../" role="menuitem">🚵 BuildMyMTB</a>');
  });

  it('prefixes every non-root entry for /KitBuilder/', () => {
    const html = tbFamilyMenuItemsHtml('kit', '../');
    for (const f of TB_FAMILY) {
      if (f.href === '') continue;
      expect(html).toContain('href="../' + f.href + '"');
    }
  });

  it('escapes the About note rather than emitting a raw ampersand', () => {
    const html = tbFamilyMenuItemsHtml('mtb', '');
    expect(html).toContain('mission, family &amp; what verified means');
    expect(html).not.toMatch(/family & what/);
  });

  it('renders one anchor per surface and nothing else', () => {
    const html = tbFamilyMenuItemsHtml('mtb', '');
    expect((html.match(/<a /g) || []).length).toBe(TB_FAMILY.length);
    expect(html).not.toContain('<script');
    expect(html).not.toContain('<div');
  });

  it('is pure and deterministic', () => {
    const a = tbFamilyMenuItemsHtml('gravel', '');
    const b = tbFamilyMenuItemsHtml('gravel', '');
    expect(a).toBe(b);
    expect(TB_FAMILY.map((f) => f.id).join()).toBe('mtb,bmx,road,gravel,emtb,kit,about');
  });

  /* Hard rule 3: a new bike type stays OFF-LIVE until Douglas gives the word.
     Adding a row here is part of a go-live, never a way to preview one — so
     every surface listed must be a page that actually ships. */
  it.each(TB_FAMILY.filter((f) => f.href !== ''))('$id points at a page that exists', ({ href }) => {
    const target = href === 'KitBuilder/' ? 'KitBuilder/index.html' : href;
    expect(fs.existsSync(path.join(ROOT, target))).toBe(true);
  });

  it.each(TB_FAMILY.filter((f) => f.href !== ''))('$id is staged by deploy.yml', ({ href }) => {
    // A page in the menu that deploy.yml never copies is a 404 in production.
    const deploy = read('.github/workflows/deploy.yml');
    const target = href === 'KitBuilder/' ? 'KitBuilder/index.html' : href;
    expect(deploy).toContain('cp ' + target + ' _site/');
  });
});

describe('page-shell: hard rule 2', () => {
  /* Hard rule 2 — the shell must never introduce an auto-appearing anything. */
  it('page-shell.js opens no dialog, appends nothing to <body>, sets no timer', () => {
    const src = read('src/page-shell.js');
    for (const banned of ['showModal', '.open =', 'appendChild', 'setTimeout',
                          'setInterval', 'window.open', 'insertBefore']) {
      expect(src).not.toContain(banned);
    }
  });
});
