/* ==========================================================================
   page-shell.js — the ONE definition of the page chrome that is genuinely
   shared across every BuildMy surface. Loaded via a classic <script src>
   (no build step, no import/ESM, no CDN — the src/ui-common.js convention).

   WHY THIS FILE EXISTS
   The builder pages were hand-copied from each other, so anything living in
   the chrome had to be edited six times. That is not hypothetical: on
   2026-07-23 five of seven pages were found missing their legal links, and
   four were missing the analytics beacon. Both were copy-paste omissions.
   This file makes the affected blocks single-source so the next edit lands
   once.

   WHAT IS *NOT* HERE, AND WHY (measured 2026-07-23, not assumed)
   The efficiency review's "the pages are 82% identical" is a PAIRWISE
   maximum — road.html vs gravel.html, two files cut from each other days
   apart. Across all six builders the genuinely identical surface is far
   smaller: 9% of the <style> blocks, 24% of the <header>s, and index.html
   shares under 36% with any sibling. In particular the theme token blocks
   (:root / html.dark / html.loam / html.rad) have 3-5 genuinely DIFFERENT
   variants per page — hoisting them would mean reconciling real visual
   differences, not de-duplicating. They stay per-page on purpose.

   So the scope here is deliberately narrow: the blocks that are one thing
   semantically AND have actually drifted.

   HARD RULE 2 (no pop-ups): everything this file renders is inert in-page
   markup. It opens nothing, floats nothing, and appends nothing to <body>.
   ========================================================================== */

/* ---- The canonical legal links ------------------------------------------
   Order and wording are the compliance surface; every page shows exactly
   this list. Paths are ROOT-RELATIVE-ish: they are joined onto a per-page
   base prefix ('' at the site root, '../' from /KitBuilder/), because the
   site is served as plain static files and KitBuilder lives one level down.
   -------------------------------------------------------------------------- */
/** @type {ReadonlyArray<{href:string,label:string}>} */
var TB_LEGAL_LINKS = [
  { href: 'privacy.html',              label: 'Privacy' },
  { href: 'terms.html',                label: 'Terms' },
  { href: 'affiliate-disclosure.html', label: 'Affiliate Disclosure' }
];

/** The separator between legal links. U+00B7; several pages previously wrote
 * it as the `&middot;` entity, which is the same character — unified here so
 * the rendered text is identical everywhere.
 * @type {string} */
var TB_LEGAL_SEP = ' · ';

/** Render the legal-link tail as an HTML fragment.
 *
 * Callers own whatever sits AROUND it (a leading separator, a wrapping <p>,
 * the page's own nav links) — this returns only the three links, so each
 * page's existing footer prose and layout are untouched.
 *
 * @param {string} [base] path prefix to the site root ('' at root, '../' from
 *   a subdirectory). Defaults to '' — the site root.
 * @returns {string} escaped-by-construction HTML (no interpolated user data)
 */
function tbLegalLinksHtml(base) {
  var b = base || '';
  return TB_LEGAL_LINKS.map(function (l) {
    return '<a href="' + b + l.href + '">' + l.label + '</a>';
  }).join(TB_LEGAL_SEP);
}

/** The plain-text form of the tail — what a reader actually sees. Used by the
 * guard test to check the STATIC content pages (privacy/terms/about/…) carry
 * the same list, without asserting on their markup.
 * @returns {string} */
function tbLegalLinksText() {
  return TB_LEGAL_LINKS.map(function (l) { return l.label; }).join(TB_LEGAL_SEP);
}

/* ---- The BuildMy family switcher ----------------------------------------
   The list of live surfaces, in the order they appear in every header menu.

   THIS is the block that cost six edits per go-live: BMX (2026-07-17), road
   + EMTB (2026-07-20) and gravel (2026-07-21) each had to be hand-added to
   every other page's menu, and any page that got missed silently stopped
   offering the new surface. One list now.

   Only the LIVE surfaces belong here. A genuinely-new bike type stays OFF-LIVE
   — its own dataset, not wired into any page — until Douglas gives the word
   (CLAUDE.md hard rule 3). Adding a row here is part of a go-live, never a
   way to preview one.

   `href` is joined onto the page's base prefix. The MTB entry's empty href
   means "the site root", which is '/' from the root and '../' from
   /KitBuilder/ — both land on index.html.
   -------------------------------------------------------------------------- */
/** @type {ReadonlyArray<{id:string,href:string,icon:string,name:string,note?:string}>} */
var TB_FAMILY = [
  { id: 'mtb',    href: '',             icon: '🚵', name: 'BuildMyMTB' },
  { id: 'bmx',    href: 'bmx.html',     icon: '🏁', name: 'BuildMyBMX' },
  { id: 'road',   href: 'road.html',    icon: '🚴', name: 'BuildMyRoadbike' },
  { id: 'gravel', href: 'gravel.html',  icon: '🌾', name: 'BuildMyGravelBike' },
  { id: 'emtb',   href: 'emtb.html',    icon: '⚙️', name: 'BuildMyEMTB' },
  { id: 'kit',    href: 'KitBuilder/',  icon: '🧰', name: 'BuildMyRideKit' },
  { id: 'about',  href: 'about.html',   icon: 'ℹ️', name: 'About BuildMy',
    note: 'mission, family & what verified means' }
];

/** The soft note marking the page you are already on. */
var TB_FAMILY_HERE_NOTE = "you're here";

/** Minimal HTML-text escape for the one interpolated string (the About note's
 * ampersand). Everything else in TB_FAMILY is author-controlled plain text.
 * @param {string} s @returns {string} */
function tbEscText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Render the family switcher's menu items — the <a> run that goes inside an
 * existing `.fam-pop`. Deliberately NOT the whole <details>: each page keeps
 * its own wordmark, summary and mission line, which legitimately differ (emtb
 * brands its header BuildMyEMTB and carries the longer mission text). What is
 * shared is the LIST, and that is what this returns.
 *
 * @param {string} [current] the TB_FAMILY id of the page being rendered; that
 *   entry is marked `here` / aria-current. Unknown or omitted marks nothing.
 * @param {string} [base] path prefix to the site root ('' or '../').
 * @returns {string}
 */
function tbFamilyMenuItemsHtml(current, base) {
  var b = base || '';
  return TB_FAMILY.map(function (f) {
    var href = f.href === '' ? (b || '/') : b + f.href;
    var here = f.id === current;
    var note = here ? TB_FAMILY_HERE_NOTE : f.note;
    return '<a' + (here ? ' class="here"' : '') + ' href="' + href + '" role="menuitem"'
      + (here ? ' aria-current="page"' : '') + '>'
      + f.icon + ' ' + f.name
      + (note ? ' <span class="fam-soft">— ' + tbEscText(note) + '</span>' : '')
      + '</a>';
  }).join('\n        ');
}

/* ---- Browser mount -------------------------------------------------------
   Fills every `<span data-tb-legal></span>` placeholder on the page, and
   replaces every `<span data-tb-family="<id>"></span>` with the menu items
   (replaces, not fills, so the anchors stay direct children of `.fam-pop`
   exactly as the hand-written markup had them — the CSS targets `.fam-pop a`).

   Base-path detection is DERIVED, never configured per page: this script
   reads its own <script src> (…/src/page-shell.js) and keeps whatever came
   before 'src/'. So KitBuilder's `../src/page-shell.js` yields '../' with no
   per-page attribute to forget — the exact class of mistake this file exists
   to prevent. A page may still override explicitly with data-base="…".

   Mounted only on the six BUILDER pages, which render their catalog from JS
   and are already blank without it. The static content pages (privacy.html,
   terms.html, about.html, affiliate-disclosure.html, home.html) keep their
   legal links as literal HTML on purpose — those pages must read correctly
   with JavaScript off, and legally-required links are the last thing to put
   behind a script. test/test-page-shell.js checks THOSE pages against
   TB_LEGAL_LINKS above, so they are still single-sourced in effect: the
   canonical list is one place, and CI fails if any page drifts from it.
   -------------------------------------------------------------------------- */

/** @type {string} */
var TB_SHELL_BASE = '';

(function () {
  /* Reached through globalThis (the src/compat-bmx.js browser-path idiom) so
     this file stays type-checked under the Node-lib tsconfig instead of being
     excluded like src/ui-common.js — the pure builders above are the part
     worth checking, and they would go dark with a whole-file exclusion. */
  var doc = /** @type {any} */ (globalThis).document;
  if (!doc) return;                              // Node (tests) — nothing to mount.

  // Derive the base prefix from this file's own URL.
  var me = doc.currentScript && doc.currentScript.getAttribute('src');
  if (me) TB_SHELL_BASE = me.replace(/src\/page-shell\.js.*$/, '');

  /** @param {any} el @returns {string} */
  function baseOf(el) {
    var b = el.getAttribute('data-base');
    return b === null ? TB_SHELL_BASE : b;
  }

  function mount() {
    var legal = doc.querySelectorAll('[data-tb-legal]');
    for (var i = 0; i < legal.length; i++) {
      legal[i].innerHTML = tbLegalLinksHtml(baseOf(legal[i]));
    }
    var fam = doc.querySelectorAll('[data-tb-family]');
    for (var j = 0; j < fam.length; j++) {
      var el = fam[j];
      // outerHTML, so the <a>s end up as direct children of .fam-pop.
      el.outerHTML = tbFamilyMenuItemsHtml(el.getAttribute('data-tb-family'), baseOf(el));
    }
  }

  // The placeholders sit in the footer, parsed long after this <head> script,
  // so wait for the parser. The footer is below the fold on every page, so
  // there is no visible reflow.
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

/* ---- Export for Node tests (ignored by the browser) ---------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TB_LEGAL_LINKS: TB_LEGAL_LINKS, TB_LEGAL_SEP: TB_LEGAL_SEP,
    tbLegalLinksHtml: tbLegalLinksHtml, tbLegalLinksText: tbLegalLinksText,
    TB_FAMILY: TB_FAMILY, TB_FAMILY_HERE_NOTE: TB_FAMILY_HERE_NOTE,
    tbFamilyMenuItemsHtml: tbFamilyMenuItemsHtml };
}
