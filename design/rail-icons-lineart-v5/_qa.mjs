// QA contact sheet (not part of the deliverable): every v5 drawing enlarged +
// at 20 px, light + dark, so a screenshot can be eyeballed for mush/collisions.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLOTS, DISC_SLOTS, renderSvg } from './icons.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ALL = [...SLOTS, ...DISC_SLOTS];
let b = '';
for (const s of ALL) {
  for (const ic of s.icons) {
    b += `<div class="c"><b>${ic.id}</b>
      <span class="p lt">${renderSvg(ic, { size: 120 })}</span>
      <span class="p lt">${renderSvg(ic, { size: 20 })}</span>
      <span class="p dk">${renderSvg(ic, { size: 120 })}</span>
      <span class="p dk">${renderSvg(ic, { size: 20 })}</span></div>`;
  }
}
writeFileSync(join(here, '_qa.html'), `<!doctype html><meta charset="utf-8"><style>
body{margin:8px;font:11px "Segoe UI";display:grid;grid-template-columns:repeat(4,1fr);gap:6px;background:#fff}
.c{display:flex;align-items:center;gap:6px;border:1px solid #ddd;padding:4px;border-radius:6px}
.c b{width:44px;flex:none}
.p{display:inline-flex;padding:4px;border-radius:5px}
.p.lt{background:#f6f7f4;color:#1c2321;--icon-accent:#9a3412}
.p.dk{background:#161a18;color:#e6ebe7;--icon-accent:#e0703c}
svg{display:block}
</style><body>${b}</body>`);
console.log('qa sheet written');
