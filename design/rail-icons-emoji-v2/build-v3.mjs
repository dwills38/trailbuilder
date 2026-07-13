// Builds rail-icons-v3-disciplines.html (round 3: the five rider-discipline
// slots only, big sweep) from data.json's "v3" section — same single source of
// truth for the id→glyph mapping as round 2 (build.mjs is untouched).
// Run: node design/rail-icons-emoji-v2/build-v3.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir, 'data.json'), 'utf8'));
const v3 = data.v3;

// ---- integrity: v3 ids unique + not colliding with v2; no rejected glyph re-offered
const v2Ids = new Set();
const rejected = new Set(); // every glyph shown in rounds 1-2, any slot, + live glyphs
for (const s of data.slots) {
  if (s.live) rejected.add(s.live);
  for (const c of s.candidates) { v2Ids.add(c.id); rejected.add(c.glyph); }
}
const byId = {};
const slotMeta = {
  disc_all:    { label: 'All disciplines', live: null },
  disc_dh:     { label: 'DH',     live: '⬇️' },
  disc_enduro: { label: 'Enduro', live: '⛰️' },
  disc_trail:  { label: 'Trail',  live: '🌲' },
  disc_xc:     { label: 'XC',     live: '🐇' },
};
for (const s of v3.slots) {
  const seen = new Set();
  for (const c of [...s.candidates, ...s.wildcards]) {
    if (v2Ids.has(c.id) || byId[c.id]) throw new Error('dupe/colliding id ' + c.id);
    if (!c.id.startsWith(s.prefix + '-')) throw new Error(c.id + ' wrong prefix for ' + s.key);
    if (rejected.has(c.glyph)) throw new Error(c.id + ' re-offers rejected glyph ' + c.glyph);
    if (seen.has(c.glyph)) throw new Error('glyph repeated inside ' + s.key + ': ' + c.glyph);
    seen.add(c.glyph);
    byId[c.id] = { ...c, slot: s.key };
  }
}
for (const q of v3.quintets) {
  const glyphs = new Set();
  for (const s of v3.slots) {
    const pick = q.picks[s.key];
    if (!pick) throw new Error('quintet ' + q.id + ' missing ' + s.key);
    const c = byId[pick];
    if (!c || c.slot !== s.key) throw new Error('quintet ' + q.id + ': ' + pick + ' not a ' + s.key + ' candidate');
    if (glyphs.has(c.glyph)) throw new Error('quintet ' + q.id + ' reuses glyph ' + c.glyph);
    glyphs.add(c.glyph);
  }
}
console.log('v3 ok:', v3.slots.length, 'slots,', Object.keys(byId).length, 'candidates,', v3.quintets.length, 'quintets');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const CSS = `
  @page { size: Letter; margin: 9mm 8mm; }
  :root{
    --dark:#181b20; --dark-fg:#e7ebf0; --dark-line:#2c3138;
    --light:#ffffff; --light-fg:#20242b; --light-line:#e2e6ec;
    --page:#f4f6f8; --fg:#1a1e24; --mut:#6b7480; --line:#d6dbe1; --accent:#e8552d; --chip:#eef1f5;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{font:10pt/1.45 "Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:#fff;
       -webkit-print-color-adjust:exact;print-color-adjust:exact}
  .em{font-family:"Segoe UI Emoji","Segoe UI Symbol","Apple Color Emoji","Noto Color Emoji",sans-serif;line-height:1}
  h1{font-size:20pt;margin:0 0 2px;letter-spacing:-.02em}
  h1 .accent{color:var(--accent)}
  h2{font-size:14pt;margin:0 0 8px;letter-spacing:-.01em;border-bottom:2px solid var(--accent);padding-bottom:4px}
  .sub{color:var(--mut);margin:0 0 14px}
  .panel{background:var(--page);border:1px solid var(--line);border-radius:10px;padding:11px 14px;margin:0 0 12px;break-inside:avoid}
  .panel h3{margin:0 0 5px;font-size:10.5pt}
  .panel p{margin:0 0 5px}
  .panel ul{margin:4px 0 2px;padding-left:18px}
  .panel li{margin:2px 0}
  .pagebreak{break-before:page}
  .idb{display:inline-block;font-weight:800;font-size:8pt;letter-spacing:.03em;background:var(--fg);color:#fff;border-radius:5px;padding:1px 6px}
  .footer{color:var(--mut);font-size:8pt;margin-top:10px;border-top:1px solid var(--line);padding-top:6px}

  .slothead{display:flex;align-items:center;gap:10px;padding:7px 12px;background:var(--page);
            border:1px solid var(--line);border-radius:12px 12px 0 0}
  .slothead .nm{font-weight:800;font-size:12.5pt;letter-spacing:-.01em}
  .slothead .key{font-size:8pt;color:var(--mut)}
  .slothead .live{margin-left:auto;font-size:8.5pt;color:var(--mut)}
  .cells{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;padding:9px;border:1px solid var(--line);
         border-top:0;border-radius:0 0 12px 12px;margin:0 0 10px;background:#fff}
  .cell{border:1px solid var(--line);border-radius:9px;overflow:hidden;display:flex;flex-direction:column;background:#fff;break-inside:avoid}
  .cell .big{display:grid;grid-template-columns:1fr 1fr}
  .cell .big span{display:flex;align-items:center;justify-content:center;height:50px;font-size:29px}
  .cell .big .d{background:var(--dark);color:var(--dark-fg)}
  .cell .big .l{background:var(--light);color:var(--light-fg);border-left:1px solid var(--light-line)}
  .mini{font-size:13px;line-height:1;padding:5px 8px;white-space:nowrap;overflow:hidden;font-weight:600}
  .mini.d{background:var(--dark);color:var(--dark-fg);border-top:1px solid var(--dark-line)}
  .mini.l{background:var(--light);color:var(--light-fg);border-top:1px solid var(--light-line)}
  .cell .meta{padding:5px 7px 6px;border-top:1px solid var(--line)}
  .cell .meta .row1{display:flex;align-items:center;gap:5px;margin-bottom:2px}
  .cell .meta .cnm{font-size:7.5pt;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cell .meta .why{font-size:7pt;color:var(--mut);line-height:1.3}

  .wildhead{display:flex;align-items:center;gap:8px;margin:2px 0 6px}
  .wildhead .tag{font-size:7.5pt;text-transform:uppercase;letter-spacing:.07em;color:#fff;background:#6b7480;border-radius:10px;padding:1px 8px;font-weight:700}
  .wildhead .note{font-size:8pt;color:var(--mut)}
  .cells.wild{border-style:dashed;border-radius:12px;border-top:1px dashed var(--line);margin-bottom:14px}

  .setblock{border:1px solid var(--line);border-radius:12px;margin:0 0 12px;overflow:hidden;break-inside:avoid;background:#fff}
  .sethead{display:flex;align-items:baseline;gap:10px;padding:8px 12px;background:var(--page);border-bottom:1px solid var(--line)}
  .sethead .badge{font-weight:800;font-size:10pt;color:#fff;background:var(--accent);border-radius:7px;padding:2px 10px}
  .sethead .nm{font-weight:800;font-size:12pt}
  .sethead .dsc{color:var(--mut);font-size:8.5pt}
  .rails{display:grid;grid-template-columns:1fr 1fr}
  .railpane{padding:10px 12px}
  .railpane.d{background:var(--dark);color:var(--dark-fg)}
  .railpane.l{background:var(--light);color:var(--light-fg);border-left:1px solid var(--line)}
  .railpane .pt{font-size:7pt;text-transform:uppercase;letter-spacing:.09em;font-weight:800;margin:0 0 7px;opacity:.55}
  .rrow{display:flex;align-items:center;gap:8px;font-size:13px;line-height:1;font-weight:600;padding:3.5px 6px;border-radius:7px}
  .rrow .em{width:18px;text-align:center;flex:0 0 18px}
  .rrow .rid{margin-left:auto;font-size:7px;font-weight:700;opacity:.45;letter-spacing:.03em}
  .rrow.active{color:var(--accent)}
  .railpane.d .rrow.active{background:rgba(232,85,45,.14)}
  .railpane.l .rrow.active{background:rgba(232,85,45,.10)}
`;

let html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>BuildMyMTB · Discipline Icons — Round 3</title>
<style>${CSS}</style></head><body>

<h1>Build<span class="accent">MyMTB</span> · Discipline Icons — Round 3 (big sweep)</h1>
<p class="sub">Streamlined per your call: the <b>five rider-discipline chips only</b>, with a ton of fresh samples. Nothing from rounds 1–2 is re-offered — every glyph here is new to the board, and ids continue each slot's numbering (you can still reference any old id).</p>

<div class="panel">
<h3>How to reply</h3>
<ul>
<li><b>Per-slot picks:</b> "DA-21, DH-6, DE-13, DT-10, DX-6."</li>
<li><b>A quintet:</b> "Q1" — the last page shows five curated five-icon rails, coherent across the rail.</li>
<li>Mix freely, including ids from rounds 1–2 if one grew on you.</li>
</ul>
<p><b>Wildcard rows:</b> each slot ends with a dashed, grey-tagged row of ~5 monochrome/dingbat marks that bend the emoji style — included because two emoji rounds missed; ignore them freely.</p>
</div>

<div class="panel">
<h3>What each slot is telegraphing (the bar at 20&nbsp;px)</h3>
<ul>
<li><b>All</b> — the union: everything, no filter.</li>
<li><b>DH</b> — steep, descent, gravity, full-face.</li>
<li><b>Enduro</b> — big mountains, timed stages, long days.</li>
<li><b>Trail</b> — forest, flow, singletrack.</li>
<li><b>XC</b> — speed, endurance, lightweight.</li>
</ul>
</div>
`;

// ---------- per-slot matrix ----------
const cellHtml = (c, label) => `<div class="cell">
  <div class="big"><span class="d em">${c.glyph}</span><span class="l em">${c.glyph}</span></div>
  <div class="mini d"><span class="em">${c.glyph}</span> ${esc(label)}</div>
  <div class="mini l"><span class="em">${c.glyph}</span> ${esc(label)}</div>
  <div class="meta"><div class="row1"><span class="idb">${c.id}</span><span class="cnm">${esc(c.name)}</span></div>
  <div class="why">${esc(c.why)}</div></div>
</div>`;

let first = true;
for (const s of v3.slots) {
  const m = slotMeta[s.key];
  html += `<div class="${first ? 'pagebreak' : ''}"></div>
<div class="slothead"><span class="nm">${esc(m.label)}</span><span class="key">${esc(s.key)} · ${s.candidates.length} candidates + ${s.wildcards.length} wildcards</span>
<span class="live">${m.live ? `live today: <span class="em">${m.live}</span>` : 'live today: text only, no icon'}</span></div>
<div class="cells">${s.candidates.map((c) => cellHtml(c, m.label)).join('')}</div>
<div class="wildhead"><span class="tag">Wildcards</span><span class="note">bends the Refined-Emoji style — monochrome / dingbat marks; ignore freely</span></div>
<div class="cells wild">${s.wildcards.map((c) => cellHtml(c, m.label)).join('')}</div>`;
  first = false;
}

// ---------- quintets ----------
html += `<div class="pagebreak"></div><h2>Curated quintets — full discipline-rail previews</h2>
<p class="sub">Five coherent five-icon rails at true rail size (13&nbsp;px), dark and light. The tiny right-hand code is the candidate id — cherry-pick across quintets freely.</p>`;

for (const q of v3.quintets) {
  const pane = (cls) => {
    let out = `<div class="railpane ${cls}"><div class="pt">${cls === 'd' ? 'Dark rail (ships)' : 'Light theme'}</div>`;
    for (const s of v3.slots) {
      const c = byId[q.picks[s.key]];
      out += `<div class="rrow${s.key === 'disc_enduro' ? ' active' : ''}"><span class="em">${c.glyph}</span><span>${esc(slotMeta[s.key].label)}</span><span class="rid">${c.id}</span></div>`;
    }
    return out + `</div>`;
  };
  html += `<div class="setblock">
  <div class="sethead"><span class="badge">${q.id}</span><span class="nm">${esc(q.name)}</span><span class="dsc">${esc(q.desc)}</span></div>
  <div class="rails">${pane('d')}${pane('l')}</div>
</div>`;
}

html += `<div class="footer">BuildMyMTB · discipline-icons-v3 · branch design/rail-icons-emoji-v2 · source of truth: design/rail-icons-emoji-v2/data.json ("v3" section, id → glyph). Reply with per-slot ids and/or a quintet; a follow-up applies picks to DISC_LABELS / the All chip in index.html. No live-app changes were made.</div>
</body></html>`;

const out = path.join(dir, 'rail-icons-v3-disciplines.html');
fs.writeFileSync(out, html);
console.log('wrote', out, (html.length / 1024).toFixed(0) + 'KB');
