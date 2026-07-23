/* test-mtb-data-split.js — the wiring contract for the 2026-07-23 split of the
   MTB catalog out of src/compat.js into data/mtb.js.

   Unit tests over the engine cannot catch either failure mode this file guards,
   because both live outside JS: a wrong <script> ORDER in index.html and a
   missing staging line in deploy.yml both leave every existing test green while
   the live site breaks. Same "read the shipped page/workflow as text" pattern as
   test-road-golden.js's off-live containment test.

     1) LOAD ORDER — src/compat.js binds `var PARTS = MTB_PARTS_RAW` at load time.
        Tagged after compat.js, PARTS is undefined and the app dies on first
        render. (bmx.html can afford the reverse order: compat-bmx.js holds no
        catalog and only ever receives part objects.)
     2) DEPLOY STAGING — deploy.yml stages `cp -r src` plus each page's data file
        EXPLICITLY. data/mtb.js is not under src/, so without its own cp line the
        flagship page 404s in production while working perfectly locally. */
var fs = require('fs');
var path = require('path');
var C = require('../src/compat.js');
var D = require('../data/mtb.js');
var U = require('./test-util.js');
var eq = U.eq, ok = U.ok;

var root = path.join(__dirname, '..');
/** @param {string} rel @returns {string} */
function read(rel){ return fs.readFileSync(path.join(root, rel), 'utf8'); }

test('data/mtb.js exports MTB_PARTS_RAW and compat.js re-exports it as PARTS', function(){
  ok(Array.isArray(D.MTB_PARTS_RAW), 'data/mtb.js must export an MTB_PARTS_RAW array');
  ok(D.MTB_PARTS_RAW.length > 5000, 'the catalog must actually be there, got ' + D.MTB_PARTS_RAW.length);
  ok(C.PARTS === D.MTB_PARTS_RAW, 'compat.js must re-export the SAME array object, not a copy');
});

test('the catalog carries its presets too (they reference part ids - data side)', function(){
  var presets = C.PARTS.filter(function(/** @type {any} */ p){ return p && p.fills; });
  ok(presets.length > 0, 'preset rows (fills -> part ids) must have moved with the data');
  presets.forEach(function(/** @type {any} */ p){
    Object.keys(p.fills).forEach(function(slot){
      ok(!!C.byId(p.fills[slot]), p.id + ' fills ' + slot + ' with unknown id ' + p.fills[slot]);
    });
  });
});

test('ALIASES/canonicalId stayed on the ENGINE side, next to each other', function(){
  var engine = read('src/compat.js');
  ok(engine.indexOf('var ALIASES = {') >= 0, 'ALIASES belongs in compat.js (table + resolver in one place, the documented compat-bmx.js convention)');
  ok(engine.indexOf('function canonicalId(') >= 0, 'canonicalId belongs in compat.js');
  eq(read('data/mtb.js').indexOf('var ALIASES = {'), -1, 'ALIASES must not be duplicated into the data file');
});

test('the engine file stayed small - the catalog really left it', function(){
  var engineLines = read('src/compat.js').split('\n').length;
  ok(engineLines < 4000, 'src/compat.js is ' + engineLines + ' lines - the catalog leaked back into the engine');
});

test('index.html loads data/mtb.js BEFORE src/compat.js (load order is load-bearing)', function(){
  var html = read('index.html');
  var data = html.indexOf('src="data/mtb.js"');
  var engine = html.indexOf('src="src/compat.js"');
  ok(data >= 0, 'index.html must <script> data/mtb.js');
  ok(engine >= 0, 'index.html must <script> src/compat.js');
  ok(data < engine, 'data/mtb.js must be tagged BEFORE src/compat.js - compat.js binds PARTS at load time');
});

test('deploy.yml stages data/mtb.js (cp -r src does not cover it)', function(){
  var yml = read('.github/workflows/deploy.yml');
  ok(yml.indexOf('cp data/mtb.js _site/data/') >= 0,
    'deploy.yml must stage data/mtb.js explicitly or the flagship page 404s in production');
  ok(yml.indexOf('mkdir -p _site/data') < yml.indexOf('cp data/mtb.js _site/data/'),
    '_site/data must be created before data/mtb.js is copied into it');
});

test('the MTB data file stays MTB-only - no e-bike leak (CLAUDE.md hard rule 1)', function(){
  /** @type {any[]} */ var rows = D.MTB_PARTS_RAW;
  rows.forEach(function(p){
    ok(String(p.id).indexOf('em-') !== 0, p.id + ' looks like an e-MTB id - data/emtb.js is its home');
    ok(!('motor' in p) && !('battery' in p), p.id + ' carries an e-field');
  });
});
