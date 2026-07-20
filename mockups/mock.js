/* mockups/mock.js — design-round chrome only (untracked, never shipped).
   Tiny theme switcher matching the app's html.<theme> class convention.
   Uses its own storage key so playing with mockup themes never touches the
   real app's saved 'tb-theme'. Loam is the default: this round is designed
   Loam-first per Douglas's standing style preference. */
(function () {
  var KEY = 'tb-mockup-theme';
  var THEMES = ['light', 'dark', 'rad', 'loam'];
  function apply(t) {
    var root = document.documentElement;
    THEMES.forEach(function (x) { root.classList.remove(x); });
    if (t !== 'light') root.classList.add(t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    document.querySelectorAll('.theme-row .btn').forEach(function (b) {
      b.style.outline = b.dataset.theme === t ? '2px solid var(--accent)' : 'none';
    });
  }
  var saved = 'loam';
  try { saved = localStorage.getItem(KEY) || 'loam'; } catch (e) {}
  document.addEventListener('DOMContentLoaded', function () {
    var row = document.createElement('div');
    row.className = 'theme-row';
    row.setAttribute('aria-label', 'Mockup theme picker');
    row.innerHTML =
      '<button class="btn" data-theme="light">☀️</button>' +
      '<button class="btn" data-theme="dark">🌙</button>' +
      '<button class="btn" data-theme="rad">⚡</button>' +
      '<button class="btn" data-theme="loam">🍂</button>';
    row.addEventListener('click', function (e) {
      var b = e.target.closest('[data-theme]');
      if (b) apply(b.dataset.theme);
    });
    document.body.appendChild(row);
    apply(saved);
  });
})();
