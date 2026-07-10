#!/usr/bin/env node
// @ts-nocheck -- Node CLI script working with dynamic external data (fetched
// HTML, JSON state); see tsconfig.json's tools/** exclude note. Required from
// test/test-drift-check.js for its pure matching functions, which is checked
// normally — only this file opts out.
'use strict';
/* =============================================================================
   DRIFT-CHECK — resumable checker for whether verified parts' SOURCE PAGES
   still say what the catalog says.
   -----------------------------------------------------------------------------
   Re-fetches the `source` URL of every `verified:true` catalog part (plain
   `https`/`http`, zero deps) and looks for the catalogued price/weight as
   plain-text substrings on the page. It NEVER writes to the catalog — this
   is a signal for a human to go re-verify, not an auto-corrector. The whole
   point of the verification grind (see tools/VERIFY-PROTOCOL.md) is that a
   "verified" spec is judged by a person against the source; a scraper that
   silently rewrites specs would defeat that on the first false match.

   Per-part disposition (see classifyResult below):
     - ok            price/weight strings still found on the page
     - changed        page fetched fine, but a catalogued number wasn't found
                      (spec or price likely moved — go re-verify by hand)

   Sample-grade skip: a verified row's desc can document that its price or
   weight was never page-sourced (the catalog conventions: "price = sample
   (...)", "price/weight/... = sample", "converted sample", "weight = sample
   (page lists none)"). Looking for such a number on the page is guaranteed
   noise — it was never there — so that token is skipped and the report notes
   e.g. "price: sample-grade, skipped" (see sampleGradeFields below). The
   other token is still checked normally.

   Price matching tolerates storefront formatting noise (psychological ".99"
   pricing, space-grouped thousands with cents — see priceRoughlyMatches) and,
   if still not found, a page reading as spec/FAQ/dealer-network content (a
   tech-spec sheet, an FAQ, a dealer-only brand's listing — see
   looksLikeSpecOrFaqPage) is skipped too, noted as "price: no price field on
   this page (spec/FAQ content), skipped" rather than flagged as drift.
     - unfetchable    blocked (403/429), a bot-check/JS-shell page came back,
                      or the host is a documented standing blocker — NOT
                      retried automatically (see "Retrying" below)
     - fetch failed   a transient problem (DNS, timeout, 5xx, connection
                      reset) — worth retrying later
     - pending        queued, not yet checked this pass

   State lives in tools/drift-report.json (committed), written atomically
   (temp file + rename) after every part so a crash/interrupt loses at most
   the in-flight fetch. Style/shape mirrors tools/verify-job.js on purpose.

   Commands (run from anywhere; state + catalog resolve relative to this file):
     node tools/drift-check.js init            build/merge state from the catalog
     node tools/drift-check.js status          summary only, no network
     node tools/drift-check.js run [--limit n] fetch the next n pending parts (default 20)
     node tools/drift-check.js report          full breakdown, network changed/failed first
     node tools/drift-check.js reset [--failed | <id>]   requeue everything / just
                                                          transient failures / one part

   Retrying: "unfetchable" is a standing disposition (a 403/bot-wall isn't
   going to pass tomorrow) — `reset` with no args DOES requeue it too, since
   sites do unblock, but `reset --failed` requeues only genuine transient
   failures without wasting a run re-hitting a known-blocked host.
   ========================================================================== */

var fs = require('fs');
var path = require('path');
var https = require('https');
var http = require('http');
var C = require(path.join(__dirname, '..', 'src', 'compat.js'));

var STATE_FILE = path.join(__dirname, 'drift-report.json');
var DEFAULT_LIMIT = 20;
var FETCH_TIMEOUT_MS = 12000;
var MAX_REDIRECTS = 5;
var REQUEST_GAP_MS = 250; // be a polite, sequential fetcher — not a hammer
var USER_AGENT = 'TrailBuilder-DriftCheck/1.0 (+https://github.com/dwills38/trailbuilder; catalog drift check, one fetch per part)';

// Hosts confirmed (per CLAUDE.md "Verifiability by brand") to return bot-walls
// or JS-only shells to automated fetchers. This is a fast-path only — skips the
// network call entirely — never the sole reason a part is treated as unfetchable;
// runtime 403/429 + JS-shell detection (see classifyResult) covers everything else.
// None of these currently back a verified part's `source` (grep-verified 2026-07-10);
// keep it that way — if a host here ever becomes a real source, delete it from this
// list rather than let it silently skip checks. (2026-07-10: giant-bicycles.com was
// removed for exactly this reason — 3 verified Giant frames now source it, so it must
// be drift-checked at runtime, not silently pre-skipped.)
var KNOWN_UNFETCHABLE_HOSTS = [
  'trekbikes.com', 'norco.com', 'pivotcycles.com', 'specialized.com',
  'roval.com', 'newmen-components.com', 'bontrager.com',
  'pinkbike.com', 'nsmb.com', 'support.sram.com', 'bird.bike'
];

function now() { return new Date().toISOString(); }

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return null; }
}

function isKnownUnfetchableHost(url) {
  var h = hostOf(url);
  if (!h) return false;
  return KNOWN_UNFETCHABLE_HOSTS.some(function (d) { return h === d || h.slice(-(d.length + 1)) === ('.' + d); });
}

/* ---- matching logic (pure, unit-tested with fixtures — no network) ------- */

/** @param {number} price @returns {string[]} */
function priceTokens(price) {
  var n = Math.round(price);
  var out = [String(n)];
  var commas = n.toLocaleString('en-US');
  if (commas !== out[0]) out.push(commas);
  return out;
}

/** @param {number} weightGrams @returns {string[]} */
function weightTokens(weightGrams) {
  var seen = {}; var out = [];
  function add(s) { if (!seen[s]) { seen[s] = true; out.push(s); } }
  add(String(Math.round(weightGrams)));
  add((weightGrams / 1000).toFixed(2));
  add((weightGrams / 1000).toFixed(1));
  var lbs = weightGrams / 453.592;
  add(lbs.toFixed(1));
  add(String(Math.round(lbs)));
  return out;
}

/** @param {string} text @param {string[]} tokens @returns {boolean} */
function hasAnyToken(text, tokens) {
  return tokens.some(function (t) { return text.indexOf(t) >= 0; });
}

// Any comma- or space-grouped decimal number (optional cents): "4,999",
// "1 369.50", "107.85". Deliberately generic — the catalog only stores
// whole-dollar prices, so any such number that rounds to the same dollar
// counts as a match regardless of separator/cents style (see priceRoughlyMatches).
var PRICE_NUMBER_RE = /\d{1,3}(?:[,\s]\d{3})*(?:\.\d{1,2})?/g;

/** Storefronts rarely echo a catalogued whole-dollar price back verbatim:
 *  psychological ".99" pricing ($1,099.99 vs a catalogued $1,100), or a
 *  space-grouped-thousands format with cents (Öhlins' "$1 369.50" vs $1,370).
 *  Scans for ANY price-shaped number in the text and accepts it if rounding
 *  to the nearest whole dollar matches the catalogued price — catching those
 *  formatting variants without loosening real drift (a genuinely different
 *  price rounds to a different dollar and still won't match).
 *  @param {string} text @param {number} price @returns {boolean} */
function priceRoughlyMatches(text, price) {
  var target = Math.round(price);
  var matches = text.match(PRICE_NUMBER_RE);
  if (!matches) return false;
  return matches.some(function (m) {
    var n = parseFloat(m.replace(/[,\s]/g, ''));
    return !isNaN(n) && Math.round(n) === target;
  });
}

var CURRENCY_FIGURE_RE = /[$£€]\s?\d|\d[\d,.\s]*\s?(?:USD|GBP|EUR)\b/i;

/** @param {string} text @returns {boolean} */
function hasCurrencyFigure(text) {
  return CURRENCY_FIGURE_RE.test(text);
}

// Explicit spec/FAQ/dealer-network marker phrases — a page that says one of
// these AND shows no currency figure at all is almost certainly a page TYPE
// that never carries a purchase price (a tech-spec sheet, an FAQ, a
// dealer-only brand's product page), not a product listing that lost its
// price. Deliberately requires the positive marker (see looksLikeSpecOrFaqPage)
// so a normal listing whose price silently vanished (discontinued, etc.)
// still reports as changed.
var SPEC_OR_FAQ_MARKER_RE = /frequently asked questions|\bfaqs?\b|\btech(?:nical)? specs?\b|\bspecifications\b|authorized dealer network/i;

/** A catalogued price that's genuinely absent from a spec-sheet/FAQ/
 *  dealer-network page isn't drift — it's the checker looking at a page
 *  type that never had a price field to begin with (Commencal's
 *  `/tech-*.html` pages, a brand FAQ page, a dealer-only brand's product
 *  page). Narrow on purpose: requires an explicit marker phrase, not just
 *  "no price found" — a normal product page whose price disappeared (e.g.
 *  discontinued) has neither a marker nor a price and must still flag as
 *  changed, so absence alone can't be the signal.
 *  @param {string} html @returns {boolean} */
function looksLikeSpecOrFaqPage(html) {
  return SPEC_OR_FAQ_MARKER_RE.test(html) && !hasCurrencyFigure(html);
}

/** Which of a part's price/weight does its desc document as sample-grade
 *  (never sourced from the page)? Matches the catalog's established desc
 *  conventions — a field-name list ending "= sample" ("price = sample (...)",
 *  "price/weight/maxForkTravel = sample", "price + maxForkTravel = sample"),
 *  the "stay(s) sample" variant ("weight/price stay sample-data"), and the
 *  converted-currency form ("price (GBP 1,199 frame-only, converted sample)").
 *  A field sourced elsewhere in the same desc is NOT caught: in
 *  "price = fetched ...; weight = sample" only weight matches, because the
 *  list left of "= sample" cannot cross '=', ';', '(' etc.
 *  @param {{desc?:string}} part @returns {{price:boolean, weight:boolean}} */
function sampleGradeFields(part) {
  var d = part.desc || '';
  var fields = { price: false, weight: false };
  function markList(list) {
    var names = list.toLowerCase().split(/[/+\s]+/);
    if (names.indexOf('price') >= 0) fields.price = true;
    if (names.indexOf('weight') >= 0) fields.weight = true;
  }
  var m;
  var eqRe = /([A-Za-z][\w/+ ]*?)\s*=\s*sample/g;
  while ((m = eqRe.exec(d))) markList(m[1]);
  var stayRe = /([A-Za-z][\w/+ ]*?)\s+stays?\s+sample/g;
  while ((m = stayRe.exec(d))) markList(m[1]);
  if (/price\s*\([^)]*converted sample/i.test(d)) fields.price = true;
  return fields;
}

/** Does the fetched page still say what the catalog says? Price is checked
 *  whenever present (always, per schema); weight only if the part has one
 *  (frame-only rows, presets, etc. may not). A field the desc documents as
 *  sample-grade (see sampleGradeFields) is skipped — its absence from the
 *  page is expected, not drift — and noted instead of checked. Price also
 *  tolerates storefront formatting noise (see priceRoughlyMatches) and, if
 *  still not found, a page that reads as spec/FAQ/dealer-network content
 *  (see looksLikeSpecOrFaqPage) is skipped too rather than flagged as drift.
 *  @param {string} html @param {{price?:number, weight?:number, desc?:string}} part
 *  @returns {{status:'ok'|'changed', checks:{field:string,found:boolean}[], note:?string}} */
function classifyContent(html, part) {
  var sample = sampleGradeFields(part);
  var checks = [];
  var notes = [];
  if (typeof part.price === 'number') {
    if (sample.price) {
      notes.push('price: sample-grade, skipped');
    } else {
      var priceFound = hasAnyToken(html, priceTokens(part.price)) || priceRoughlyMatches(html, part.price);
      if (!priceFound && looksLikeSpecOrFaqPage(html)) {
        notes.push('price: no price field on this page (spec/FAQ content), skipped');
      } else {
        checks.push({ field: 'price', found: priceFound });
      }
    }
  }
  if (typeof part.weight === 'number') {
    if (sample.weight) notes.push('weight: sample-grade, skipped');
    else checks.push({ field: 'weight', found: hasAnyToken(html, weightTokens(part.weight)) });
  }
  var missing = checks.filter(function (c) { return !c.found; }).map(function (c) { return c.field; });
  if (missing.length) notes.unshift('not found on page: ' + missing.join(', '));
  return {
    status: missing.length ? 'changed' : 'ok',
    checks: checks,
    note: notes.length ? notes.join('; ') : null
  };
}

var JS_SHELL_RE = /enable javascript|access denied|are you a human|attention required|cloudflare|captcha|just a moment/i;

/** Combine a fetch outcome (or fetch error) with content matching into one
 *  disposition. Pure function of its inputs — no I/O — so it's fixture-testable.
 *  @param {{price?:number, weight?:number}} part
 *  @param {{ok:true,statusCode:number,body:string}|{ok:false,statusCode?:number,error?:string}} outcome
 *  @returns {{status:string, httpStatus:?number, note:?string, checks:?object[]}} */
function classifyResult(part, outcome) {
  if (!outcome.ok) {
    if (outcome.statusCode === 403 || outcome.statusCode === 429) {
      return { status: 'unfetchable', httpStatus: outcome.statusCode, note: 'blocked (HTTP ' + outcome.statusCode + ')', checks: null };
    }
    if (outcome.statusCode) {
      return { status: 'fetch failed', httpStatus: outcome.statusCode, note: 'HTTP ' + outcome.statusCode, checks: null };
    }
    return { status: 'fetch failed', httpStatus: null, note: outcome.error || 'network error', checks: null };
  }
  if (outcome.body.length < 2000 && JS_SHELL_RE.test(outcome.body)) {
    return { status: 'unfetchable', httpStatus: outcome.statusCode, note: 'bot-check / JS-only page returned', checks: null };
  }
  var c = classifyContent(outcome.body, part);
  return { status: c.status, httpStatus: outcome.statusCode, note: c.note, checks: c.checks };
}

/* ---- network (plain https/http, zero deps) -------------------------------- */

/** @param {string} url @param {number} redirectsLeft @returns {Promise<{ok:true,statusCode:number,body:string}|{ok:false,statusCode?:number,error?:string}>} */
function fetchOnce(url, redirectsLeft) {
  return new Promise(function (resolve) {
    var lib = url.indexOf('https:') === 0 ? https : http;
    var req = lib.get(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,*/*' }, timeout: FETCH_TIMEOUT_MS }, function (res) {
      var status = res.statusCode || 0;
      if (status >= 300 && status < 400 && res.headers.location && redirectsLeft > 0) {
        res.resume();
        var next;
        try { next = new URL(res.headers.location, url).toString(); } catch (e) { resolve({ ok: false, statusCode: status, error: 'bad redirect location' }); return; }
        resolve(fetchOnce(next, redirectsLeft - 1));
        return;
      }
      var chunks = [];
      var total = 0;
      var MAX_BYTES = 2 * 1024 * 1024; // 2MB is plenty to find a price/weight string
      res.on('data', function (d) {
        total += d.length;
        if (total <= MAX_BYTES) chunks.push(d);
      });
      res.on('end', function () {
        var body = Buffer.concat(chunks).toString('utf8');
        resolve(status >= 200 && status < 300 ? { ok: true, statusCode: status, body: body } : { ok: false, statusCode: status });
      });
      res.on('error', function (err) { resolve({ ok: false, error: err.message }); });
    });
    req.on('timeout', function () { req.destroy(); resolve({ ok: false, error: 'timeout after ' + FETCH_TIMEOUT_MS + 'ms' }); });
    req.on('error', function (err) { resolve({ ok: false, error: err.message }); });
  });
}

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

/** @param {import('../src/types.js').Part} part @returns {Promise<{status:string,httpStatus:?number,note:?string,checks:?object[]}>} */
function checkPart(part) {
  if (isKnownUnfetchableHost(part.source)) {
    return Promise.resolve({ status: 'unfetchable', httpStatus: null, note: 'known-blocked host (skipped network call — see KNOWN_UNFETCHABLE_HOSTS)', checks: null });
  }
  return fetchOnce(part.source, MAX_REDIRECTS).then(function (outcome) { return classifyResult(part, outcome); });
}

/* ---- state ----------------------------------------------------------------- */

function blankState() { return { version: 1, created: now(), updated: now(), limitDefault: DEFAULT_LIMIT, results: {} }; }

function load() { return fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) : null; }

function save(state) {
  state.updated = now();
  var tmp = STATE_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 1));
  fs.renameSync(tmp, STATE_FILE);
}

/** verified:true parts with a source URL — the population this tool checks. Presets
 *  (groupset/wheelset/etc.) derive weight from fills and are never verified rows
 *  themselves (same convention as tools/verify-job.js's PRESET_CATS exclusion). */
function verifiedParts() {
  return C.PARTS.filter(function (p) { return p.verified === true && typeof p.source === 'string' && p.source; });
}

/* Merge the live catalog into state: new verified parts join as pending; parts
 * that left the verified set (unverified again, or removed from the catalog)
 * are marked retired — kept for history, excluded from the queue/counts. */
function sync(state) {
  var seen = {};
  verifiedParts().forEach(function (p) {
    seen[p.id] = true;
    if (!state.results[p.id]) {
      state.results[p.id] = { status: 'pending', httpStatus: null, note: null, checkedAt: null, url: p.source, checks: null };
    } else {
      state.results[p.id].url = p.source;
      if (state.results[p.id].retired) { delete state.results[p.id].retired; }
    }
  });
  Object.keys(state.results).forEach(function (id) {
    if (!seen[id] && !state.results[id].retired) { state.results[id].retired = true; }
  });
}

function pendingIds(state) {
  return Object.keys(state.results).filter(function (id) { return !state.results[id].retired && state.results[id].status === 'pending'; });
}

function counts(state) {
  var c = { pending: 0, ok: 0, changed: 0, unfetchable: 0, 'fetch failed': 0, retired: 0, total: 0 };
  Object.keys(state.results).forEach(function (id) {
    var r = state.results[id];
    if (r.retired) { c.retired++; return; }
    c[r.status] = (c[r.status] || 0) + 1;
    c.total++;
  });
  return c;
}

function summary(state) {
  var c = counts(state);
  console.log('=== drift-check summary ===');
  console.log('OK           ' + c.ok);
  console.log('Changed      ' + c.changed);
  console.log('Unfetchable  ' + c.unfetchable);
  console.log('Fetch failed ' + c['fetch failed']);
  console.log('Pending      ' + c.pending);
  console.log('Total        ' + c.total + (c.retired ? ('  (+' + c.retired + ' retired, history-only)') : ''));
  if (c.changed) console.log('\n⚠ ' + c.changed + ' part(s) changed on their source page — run `node tools/drift-check.js report` for details.');
}

function requireState() {
  var state = load();
  if (!state) { console.error('No drift-check state. Run: node tools/drift-check.js init'); process.exit(1); }
  sync(state);
  return state;
}

function arg(flag) { var i = process.argv.indexOf(flag); return i >= 0 ? process.argv[i + 1] : null; }
function has(flag) { return process.argv.indexOf(flag) >= 0; }

/* ---- CLI --------------------------------------------------------------- */

function main() {
  var cmd = process.argv[2];

  if (cmd === 'init') {
    var state = load() || blankState();
    sync(state);
    save(state);
    console.log('Drift-check state ' + (fs.existsSync(STATE_FILE) ? 'updated' : 'created') + ' at ' + path.relative(process.cwd(), STATE_FILE));
    summary(state);
    return Promise.resolve();

  } else if (cmd === 'status') {
    var state = requireState();
    save(state);
    summary(state);
    return Promise.resolve();

  } else if (cmd === 'run') {
    var state = requireState();
    var limit = parseInt(arg('--limit'), 10);
    if (!limit || limit < 1) limit = state.limitDefault || DEFAULT_LIMIT;
    var ids = pendingIds(state).slice(0, limit);
    if (!ids.length) {
      console.log('Nothing pending. Run `node tools/drift-check.js reset` to start a fresh pass, or `report` to see the last results.');
      save(state);
      return Promise.resolve();
    }
    console.log('Checking ' + ids.length + ' part(s)...');
    var chain = Promise.resolve();
    ids.forEach(function (id, i) {
      chain = chain.then(function () {
        var part = C.byId(id);
        return checkPart(part).then(function (result) {
          state.results[id].status = result.status;
          state.results[id].httpStatus = result.httpStatus;
          state.results[id].note = result.note;
          state.results[id].checks = result.checks;
          state.results[id].checkedAt = now();
          save(state); // persist after every part — a crash loses at most one in-flight fetch
          console.log('  [' + (i + 1) + '/' + ids.length + '] ' + id + '  -> ' + result.status + (result.note ? '  (' + result.note + ')' : ''));
          return i < ids.length - 1 ? sleep(REQUEST_GAP_MS) : null;
        });
      });
    });
    return chain.then(function () { summary(state); });

  } else if (cmd === 'report') {
    var state = requireState();
    save(state);
    var byStatus = { changed: [], 'fetch failed': [], unfetchable: [], ok: [], pending: [] };
    Object.keys(state.results).forEach(function (id) {
      var r = state.results[id];
      if (r.retired) return;
      (byStatus[r.status] || (byStatus[r.status] = [])).push(id);
    });
    console.log('=== drift-check report ===');
    ['changed', 'fetch failed', 'unfetchable', 'pending', 'ok'].forEach(function (status) {
      var ids = byStatus[status] || [];
      if (!ids.length) return;
      console.log('\n' + status.toUpperCase() + ' (' + ids.length + '):');
      ids.forEach(function (id) {
        var r = state.results[id];
        console.log('  ' + id + (r.note ? '  - ' + r.note : '') + (r.checkedAt ? '  [' + r.checkedAt + ']' : ''));
      });
    });
    return Promise.resolve();

  } else if (cmd === 'reset') {
    var state = requireState();
    var target = process.argv[3];
    var ids;
    if (target === '--failed') {
      ids = Object.keys(state.results).filter(function (id) { return !state.results[id].retired && state.results[id].status === 'fetch failed'; });
    } else if (target && target.indexOf('--') !== 0 && state.results[target]) {
      ids = [target];
    } else if (!target) {
      ids = Object.keys(state.results).filter(function (id) { return !state.results[id].retired; });
    } else {
      console.error('Usage: reset [--failed | <part-id>]');
      process.exit(1);
      return Promise.resolve();
    }
    ids.forEach(function (id) { state.results[id].status = 'pending'; });
    save(state);
    console.log('Requeued: ' + (ids.length ? ids.length + ' part(s)' : '(none)'));
    return Promise.resolve();

  } else {
    console.log('Usage: node tools/drift-check.js <init|status|run [--limit n]|report|reset [--failed | <id>]>');
    console.log('See the header of this file for what each disposition means.');
    process.exit(cmd ? 1 : 0);
    return Promise.resolve();
  }
}

if (require.main === module) {
  main().catch(function (err) { console.error(err); process.exit(1); });
}

module.exports = {
  priceTokens: priceTokens, weightTokens: weightTokens, hasAnyToken: hasAnyToken,
  priceRoughlyMatches: priceRoughlyMatches, looksLikeSpecOrFaqPage: looksLikeSpecOrFaqPage,
  sampleGradeFields: sampleGradeFields,
  classifyContent: classifyContent, classifyResult: classifyResult,
  isKnownUnfetchableHost: isKnownUnfetchableHost, hostOf: hostOf
};
