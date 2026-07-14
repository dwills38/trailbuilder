#!/usr/bin/env node
'use strict';
/* BuildMyMTB — sitemap.xml generator for the public Builds Gallery.
 *
 * Zero dependencies (Node 18+ global fetch). Prints a sitemap.xml to stdout:
 *   - the homepage,
 *   - one <url> per PUBLISHED gallery build, at its canonical crawlable URL
 *     https://buildmymtb.com/?g=<id> (a query param IS a distinct URL to
 *     crawlers, unlike a #hash — see BUILDS-GALLERY-SCOPE.md §5).
 *
 * It reads the PUBLIC Supabase project URL + anon key straight out of
 * src/config.js (those are publishable values, already shipped in client code —
 * RLS owner-scopes every private row, and gallery_builds is public-read), so the
 * Action needs NO secrets. The gallery_builds table is public-read via the anon
 * key, so no auth is required to list published builds.
 *
 * FAIL-SOFT: any failure (pre-migration table missing, network error, bad
 * config) falls back to a homepage-only sitemap and exits 0, so a hiccup here
 * can never break the deploy. Run: `node tools/gen-sitemap.js > sitemap.xml`.
 */

var fs = require('fs');
var path = require('path');

var SITE = 'https://buildmymtb.com';

/** Pull SUPABASE_URL + SUPABASE_ANON_KEY out of src/config.js (committed public
 *  constants). Regex, not require(), because config.js is a browser script that
 *  declares globals rather than exporting them. */
function readConfig(){
  var txt = fs.readFileSync(path.join(__dirname, '..', 'src', 'config.js'), 'utf8');
  var url = /var\s+SUPABASE_URL\s*=\s*'([^']*)'/.exec(txt);
  var key = /var\s+SUPABASE_ANON_KEY\s*=\s*'([^']*)'/.exec(txt);
  return { url: url && url[1], key: key && key[1] };
}

function xmlEscape(s){
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Build the sitemap XML from a list of {id, created_at} rows. */
function buildSitemap(rows){
  var urls = ['  <url><loc>' + SITE + '/</loc></url>'];
  (rows || []).forEach(function(r){
    if(!r || !r.id) return;
    var loc = SITE + '/?g=' + encodeURIComponent(r.id);
    var lastmod = '';
    if(r.created_at){
      var d = String(r.created_at).slice(0, 10);   // YYYY-MM-DD
      if(/^\d{4}-\d{2}-\d{2}$/.test(d)) lastmod = '<lastmod>' + d + '</lastmod>';
    }
    urls.push('  <url><loc>' + xmlEscape(loc) + '</loc>' + lastmod + '</url>');
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') + '\n</urlset>\n';
}

function main(){
  var cfg;
  try { cfg = readConfig(); } catch(e){ cfg = {}; }
  if(!cfg.url || !cfg.key){
    // No Supabase configured yet — homepage-only sitemap.
    process.stdout.write(buildSitemap([]));
    return;
  }
  var endpoint = cfg.url.replace(/\/+$/, '') +
    '/rest/v1/gallery_builds?select=id,created_at&order=created_at.desc';
  fetch(endpoint, { headers: { apikey: cfg.key, Authorization: 'Bearer ' + cfg.key } })
    .then(function(res){ return res.ok ? res.json() : null; })
    .then(function(rows){ process.stdout.write(buildSitemap(Array.isArray(rows) ? rows : [])); })
    .catch(function(){ process.stdout.write(buildSitemap([])); });
}

// Export the pure builder for potential tests; run when invoked directly.
if (require.main === module) { main(); }
module.exports = { buildSitemap: buildSitemap, readConfig: readConfig };
