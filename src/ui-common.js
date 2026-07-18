/* ==========================================================================
   ui-common.js — helpers shared between index.html (the Bike Builder) and
   KitBuilder/index.html: the theme system and money formatting. Loaded via a
   classic <script src> (no build step, no import/ESM — same vendoring
   convention as src/account.js and src/vendor/**).

   Deliberately NOT here: esc() (compat.js already owns it as the tested
   source of truth for the Bike Builder; Kit Builder keeps its own copy
   in-page since it deliberately never loads compat.js — see KitBuilder's
   head comment), and provHtml/badgesHtml/chartHtml — Kit Builder's
   provenance/size-chart rendering is its own logic (kit-specific messaging,
   sizeChart tables) with no counterpart in index.html, so there is nothing
   to de-duplicate there.
   ========================================================================== */

/* Hex tint for the mobile browser-chrome <meta name="theme-color">, one per
   theme. The single source both the pre-paint guard below and each page's
   theme toggle read from. */
var TB_THEME_META = {light:'#16523a',dark:'#123f2b',rad:'#150029',loam:'#1e4a30',peewee:'#8f0c22'};

/** @param {number} n @returns {string} */
function tbMoney(n){ return '$' + (n||0).toLocaleString(); }

/** Which of the five theme classes is live on <html> right now.
 * @returns {'light'|'dark'|'rad'|'loam'|'peewee'} */
function tbCurrentTheme(){
  var c = document.documentElement.classList;
  return c.contains('rad') ? 'rad' : c.contains('loam') ? 'loam' : c.contains('dark') ? 'dark' : c.contains('peewee') ? 'peewee' : 'light';
}

/** Switch the <html> theme class, persist it, and sync the meta tint. Purely
 * the shared core — callers still handle their own page-specific UI (button
 * marking, toasts, re-renders, closing a menu).
 * @param {'light'|'dark'|'rad'|'loam'|'peewee'} name */
function tbApplyTheme(name){
  var root = document.documentElement.classList;
  root.remove('dark', 'rad', 'loam', 'peewee');
  if (name !== 'light') root.add(name);
  try { localStorage.setItem('tb-theme', name); } catch(e) {}
  var meta = document.getElementById('metaThemeColor');
  if (meta) meta.setAttribute('content', TB_THEME_META[name] || TB_THEME_META.light);
}

/* Apply the saved (or first-visit OS-preferred) theme BEFORE first paint so a
   dark-mode user never sees a light flash. Runs immediately, at parse time —
   this file MUST be loaded via a classic (non-async/defer) <script src> in
   <head>, positioned after the #metaThemeColor <meta> tag so it already
   exists in the DOM when this runs. Self-contained (no other function
   dependency) so it stays correct even if the rest of this file changes. */
(function(){
  var t = null; try { t = localStorage.getItem('tb-theme'); } catch(e) {}
  // First visit (no stored choice) follows the OS preference.
  if (t === null && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) t = 'dark';
  // light = no class; dark/rad/loam/peewee map 1:1 to an <html> class.
  if (t === 'dark' || t === 'rad' || t === 'loam' || t === 'peewee') document.documentElement.classList.add(t);
  var m = document.getElementById('metaThemeColor');
  if (m) m.setAttribute('content', TB_THEME_META[t] || TB_THEME_META.light);
})();
