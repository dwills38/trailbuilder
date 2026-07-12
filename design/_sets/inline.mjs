// Merges design/_sets/{a,b,c,d}.json into rail-icon-options.html at the marker.
// Run: node design/_sets/inline.mjs   (from repo root)
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'design', '_sets');
const files = ['a.json','b.json','c.json','d.json'];
let sets = [];
for(const f of files){
  const p = path.join(dir, f);
  if(!fs.existsSync(p)){ console.error('MISSING '+f); process.exit(2); }
  const arr = JSON.parse(fs.readFileSync(p,'utf8'));
  if(!Array.isArray(arr)){ console.error('NOT ARRAY '+f); process.exit(2); }
  sets = sets.concat(arr);
}
sets.sort((a,b)=>a.n-b.n);

// integrity check
const KEYS = ['disc_all','disc_dh','disc_enduro','disc_trail','disc_xc',
  'all_parts','frame','fork','shock','wheels','tire','drivetrain','brakes','bb','headset','dropper','cockpit','saddle','pedals'];
let bad = 0;
for(const s of sets){
  const miss = KEYS.filter(k=>!(s.icons && s.icons[k]));
  if(miss.length){ console.error('Set '+s.n+' '+s.name+' MISSING: '+miss.join(', ')); bad++; }
}
console.log('sets:', sets.map(s=>s.n).join(','), '| count:', sets.length);
if(sets.length!==10) console.error('WARNING: expected 10 sets, got '+sets.length);

const htmlPath = path.join(dir, '..', 'rail-icon-options.html');
let html = fs.readFileSync(htmlPath,'utf8');
const marker = '/*__ICON_SETS__*/';
if(!html.includes(marker)){ console.error('marker gone (already inlined?)'); }
const payload = 'var ICON_SETS = ' + JSON.stringify(sets) + ';';
html = html.replace(/\/\*__ICON_SETS__\*\/[\s\S]*?(?=\nvar ICON_SETS = \(typeof)/, marker+'\n'+payload+'\n');
fs.writeFileSync(htmlPath, html);
console.log('inlined into rail-icon-options.html', bad? ('(with '+bad+' incomplete sets)') : '(all complete)');
