// dev-only: zoomed contact sheet for self-review (not part of the deliverable)
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLOTS, DISC_SLOTS, renderSvg } from './icons.mjs';

const here = dirname(fileURLToPath(import.meta.url));
let b = '';
for (const s of [...SLOTS, ...DISC_SLOTS]) {
  for (const ic of s.icons) {
    b += `<div class="c"><div class="t">${ic.id} ${ic.name}</div>` +
      renderSvg(ic, { size: 150 }) +
      `<span class="s">${renderSvg(ic, { size: 20 })}${renderSvg(ic, { size: 20, detail: 'reduced' })}</span></div>`;
  }
}
writeFileSync(join(here, '_inspect.html'),
  `<!doctype html><meta charset="utf-8"><style>body{font:11px system-ui;margin:8px;display:flex;flex-wrap:wrap;gap:6px;background:#f6f7f4;color:#1c2321}.c{border:1px solid #ccc;padding:4px;background:#fff}.t{font-weight:700;margin-bottom:2px}.s{display:inline-flex;gap:4px;vertical-align:top;margin-left:6px;background:#eee;padding:2px}</style>${b}`);
console.log('inspect sheet written');
