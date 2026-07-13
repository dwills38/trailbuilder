// Builds rail-icons-emoji-v2.html (the selection artifact Douglas reviews as a
// PDF) from data.json — single source of truth for the id→glyph mapping.
// Run: node design/rail-icons-emoji-v2/build.mjs   (from repo root or anywhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir, 'data.json'), 'utf8'));

// ---- integrity checks: ids unique, set picks resolve, no dupe glyph inside a set
const byId = {};
for (const s of data.slots) for (const c of s.candidates) {
  if (byId[c.id]) throw new Error('dupe id ' + c.id);
  if (!c.id.startsWith(s.prefix + '-')) throw new Error(c.id + ' wrong prefix for ' + s.key);
  byId[c.id] = { ...c, slot: s.key };
}
for (const set of data.sets) {
  const glyphs = new Set();
  for (const s of data.slots) {
    const pick = set.picks[s.key];
    if (!pick) throw new Error('set ' + set.id + ' missing ' + s.key);
    const c = byId[pick];
    if (!c || c.slot !== s.key) throw new Error('set ' + set.id + ': ' + pick + ' not a ' + s.key + ' candidate');
    if (glyphs.has(c.glyph)) throw new Error('set ' + set.id + ' reuses glyph ' + c.glyph);
    glyphs.add(c.glyph);
  }
}
console.log('data ok:', data.slots.length, 'slots,', Object.keys(byId).length, 'candidates,', data.sets.length, 'sets');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const combo = (g) => (g.length >= 4 ? ' combo' : ''); // two-glyph picks (⛰️⏱️, ⬆️⬇️) render smaller

const CSS = `
  @page { size: Letter; margin: 9mm 8mm; }
  :root{
    --dark:#181b20; --dark-fg:#e7ebf0; --dark-line:#2c3138; --dark-mut:#8b95a1;
    --light:#ffffff; --light-fg:#20242b; --light-line:#e2e6ec; --light-mut:#7a828d;
    --page:#f4f6f8; --fg:#1a1e24; --mut:#6b7480; --line:#d6dbe1; --accent:#e8552d; --chip:#eef1f5;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{font:10pt/1.45 "Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:#fff;
       -webkit-print-color-adjust:exact;print-color-adjust:exact}
  .em{font-family:"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif;line-height:1}
  h1{font-size:20pt;margin:0 0 2px;letter-spacing:-.02em}
  h1 .accent{color:var(--accent)}
  h2{font-size:14pt;margin:0 0 8px;letter-spacing:-.01em;border-bottom:2px solid var(--accent);padding-bottom:4px}
  .sub{color:var(--mut);margin:0 0 14px}
  .panel{background:var(--page);border:1px solid var(--line);border-radius:10px;padding:11px 14px;margin:0 0 12px;
         break-inside:avoid}
  .panel h3{margin:0 0 5px;font-size:10.5pt}
  .panel p{margin:0 0 5px}
  .panel ul{margin:4px 0 2px;padding-left:18px}
  .panel li{margin:2px 0}
  code{background:var(--chip);border:1px solid var(--line);padding:0 4px;border-radius:4px;font-size:8.5pt}
  .pagebreak{break-before:page}
  .idb{display:inline-block;font-weight:800;font-size:8pt;letter-spacing:.03em;background:var(--fg);color:#fff;
       border-radius:5px;padding:1px 6px}
  .footer{color:var(--mut);font-size:8pt;margin-top:10px;border-top:1px solid var(--line);padding-top:6px}

  /* ---------- per-slot matrix ---------- */
  .slotblock{border:1px solid var(--line);border-radius:12px;margin:0 0 12px;overflow:hidden;break-inside:avoid;background:#fff}
  .slothead{display:flex;align-items:center;gap:10px;padding:7px 12px;background:var(--page);border-bottom:1px solid var(--line)}
  .slothead .nm{font-weight:800;font-size:11.5pt;letter-spacing:-.01em}
  .slothead .key{font-size:8pt;color:var(--mut)}
  .slothead .grp{font-size:7.5pt;text-transform:uppercase;letter-spacing:.07em;color:#fff;background:var(--accent);
                 border-radius:10px;padding:1px 8px;font-weight:700}
  .slothead .live{margin-left:auto;font-size:8.5pt;color:var(--mut)}
  .cells{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;padding:9px}
  .cells.n5{grid-template-columns:repeat(5,1fr)}
  .cell{border:1px solid var(--line);border-radius:9px;overflow:hidden;display:flex;flex-direction:column;background:#fff}
  .cell .big{display:grid;grid-template-columns:1fr 1fr}
  .cell .big span{display:flex;align-items:center;justify-content:center;height:52px;font-size:30px}
  .cell .big span.combo-wrap{font-size:19px;letter-spacing:1px}
  .cell .big .d{background:var(--dark)}
  .cell .big .l{background:var(--light);border-left:1px solid var(--light-line)}
  /* rail-size mock rows: 13px text + emoji inline, exactly how #rail .chip renders */
  .mini{font-size:13px;line-height:1;padding:5px 8px;white-space:nowrap;overflow:hidden;font-weight:600}
  .mini.d{background:var(--dark);color:var(--dark-fg);border-top:1px solid var(--dark-line)}
  .mini.l{background:var(--light);color:var(--light-fg);border-top:1px solid var(--light-line)}
  .cell .meta{padding:5px 7px 6px;border-top:1px solid var(--line)}
  .cell .meta .row1{display:flex;align-items:center;gap:5px;margin-bottom:2px}
  .cell .meta .cnm{font-size:7.5pt;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cell .meta .why{font-size:7pt;color:var(--mut);line-height:1.3}
  .cell.v1 .meta .row1::after{content:"v1";font-size:6.5pt;font-weight:800;color:var(--accent);
        border:1px solid var(--accent);border-radius:8px;padding:0 5px}

  /* ---------- curated sets ---------- */
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
  .railpane .gh{font-size:8px;text-transform:uppercase;letter-spacing:.09em;font-weight:800;opacity:.5;margin:7px 0 3px}
  .railpane .gh:first-of-type{margin-top:0}
  .rrow{display:flex;align-items:center;gap:8px;font-size:13px;line-height:1;font-weight:600;padding:3.5px 6px;border-radius:7px}
  .rrow .em{width:18px;text-align:center;flex:0 0 18px}
  .rrow .em.combo{font-size:9px;letter-spacing:0}
  .rrow .rid{margin-left:auto;font-size:7px;font-weight:700;opacity:.45;letter-spacing:.03em}
  .rrow.active{color:var(--accent)}
  .railpane.d .rrow.active{background:rgba(232,85,45,.14)}
  .railpane.l .rrow.active{background:rgba(232,85,45,.10)}
`;

// ---------- cover / how-to ----------
let html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>BuildMyMTB · Rail Icons — Refined Emoji v2</title>
<style>${CSS}</style></head><body>

<h1>Build<span class="accent">MyMTB</span> · Rail Icons — Refined Emoji, Round 2</h1>
<p class="sub">More candidates in the style you picked (set 1, “Refined Emoji”) — every glyph is a native color emoji, zero assets, and every candidate has a reference ID so you can mix and match.</p>

<div class="panel">
<h3>How to reply</h3>
<p>Two ways, mixable:</p>
<ul>
<li><b>Per-slot picks:</b> “FR-1, FK-1, SH-2, rest from Set D.”</li>
<li><b>A whole set:</b> “Set B” (pages 2–3 show four curated sets).</li>
</ul>
<p>Every slot’s <b>ID-0</b> is the round-1 “Refined Emoji” glyph, kept on the board so you can keep the ones you liked. Glyphs marked <b>live</b> are what the site shows today. A follow-up applies your picks to the live rail mechanically.</p>
</div>

<div class="panel">
<h3>What “Refined Emoji style” means here (extracted from round 1)</h3>
<ul>
<li><b>Native color emoji, zero assets</b> — no SVGs, no downloads; the platform’s emoji font draws them. They keep their own colors, so they read on all four site themes (light / dark / RAD) without any theming work.</li>
<li><b>The “refined” part is curation:</b> every glyph must actually read as its part — round 1’s bar was “no cutlery forks, no planet shocks, no plain-circle tires.” Round 2 holds the same bar.</li>
<li><b>Two-glyph combos are allowed</b> sparingly (round 1 used ⛰️⏱️ and ⬆️⬇️) but a single glyph fits the rail better — combos are marked and shown at true size.</li>
<li><b>One honest caveat:</b> emoji render in each visitor’s platform style (Windows / Apple / Android differ slightly). This PDF shows Windows (Segoe UI Emoji) — what you and most desktop visitors see. If pixel-identical icons on every device ever matters, the finalists can be swapped for vendored open-source emoji SVGs (Twemoji/OpenMoji) that look the same everywhere; that’s a later, mechanical follow-up and doesn’t change your picks.</li>
</ul>
</div>

<div class="panel">
<h3>Reading the matrix (pages 4+)</h3>
<p>Each candidate cell shows the glyph <b>enlarged</b> on the dark rail and on light, then <b>at true rail size</b> (13&nbsp;px, exactly how the rail chip renders it) on both, with its ID and a one-line reason. Slots are grouped: 5 discipline filters, then “All parts” and the 13 category chips — one icon per rail slot.</p>
</div>
`;

// ---------- curated sets ----------
html += `<div class="pagebreak"></div><h2>Curated sets — full rail previews</h2>
<p class="sub">One icon per slot, no glyph reused inside a set, shown at true rail size on the dark rail (how it ships) and on light. The tiny right-hand code in each row is the candidate ID — cherry-pick across sets freely.</p>`;

const discSlots = data.slots.filter((s) => s.group === 'Discipline');
const catSlots = data.slots.filter((s) => s.group === 'Category');

for (const set of data.sets) {
  const pane = (cls) => {
    let out = `<div class="railpane ${cls}"><div class="pt">${cls === 'd' ? 'Dark rail (ships)' : 'Light theme'}</div>`;
    out += `<div class="gh">Discipline</div>`;
    for (const s of discSlots) {
      const c = byId[set.picks[s.key]];
      out += `<div class="rrow${s.key === 'disc_enduro' ? ' active' : ''}"><span class="em${combo(c.glyph)}">${c.glyph}</span><span>${esc(s.label)}</span><span class="rid">${c.id}</span></div>`;
    }
    out += `<div class="gh">Category</div>`;
    for (const s of catSlots) {
      const c = byId[set.picks[s.key]];
      out += `<div class="rrow${s.key === 'frame' ? ' active' : ''}"><span class="em${combo(c.glyph)}">${c.glyph}</span><span>${esc(s.label)}</span><span class="rid">${c.id}</span></div>`;
    }
    return out + `</div>`;
  };
  html += `<div class="setblock">
  <div class="sethead"><span class="badge">Set ${set.id}</span><span class="nm">${esc(set.name)}</span><span class="dsc">${esc(set.desc)}</span></div>
  <div class="rails">${pane('d')}${pane('l')}</div>
</div>`;
}

// ---------- per-slot matrix ----------
html += `<div class="pagebreak"></div><h2>Per-slot candidate matrix</h2>
<p class="sub">Every candidate for every rail slot. ID-0 = round-1 “Refined Emoji” glyph; <b>live</b> = what index.html ships today.</p>`;

for (const s of data.slots) {
  const n = s.candidates.length;
  html += `<div class="slotblock">
  <div class="slothead"><span class="grp">${esc(s.group)}</span><span class="nm">${esc(s.label)}</span><span class="key">${esc(s.key)}</span>
  <span class="live">${s.live ? `live today: <span class="em">${s.live}</span>` : 'live today: text only, no icon'}</span></div>
  <div class="cells${n === 5 ? ' n5' : ''}">`;
  for (const c of s.candidates) {
    const isV1 = c.id.endsWith('-0');
    html += `<div class="cell${isV1 ? ' v1' : ''}">
      <div class="big"><span class="d em${combo(c.glyph) ? ' combo-wrap' : ''}">${c.glyph}</span><span class="l em${combo(c.glyph) ? ' combo-wrap' : ''}">${c.glyph}</span></div>
      <div class="mini d"><span class="em">${c.glyph}</span> ${esc(s.label)}</div>
      <div class="mini l"><span class="em">${c.glyph}</span> ${esc(s.label)}</div>
      <div class="meta"><div class="row1"><span class="idb">${c.id}</span><span class="cnm">${esc(c.name)}</span></div>
      <div class="why">${esc(c.why)}</div></div>
    </div>`;
  }
  html += `</div></div>`;
}

html += `<div class="footer">BuildMyMTB · rail-icons-refined-emoji-v2 · branch design/rail-icons-emoji-v2 · source of truth: design/rail-icons-emoji-v2/data.json (id → glyph). Reply with per-slot IDs and/or a set letter; a follow-up chip applies the picks to ICONS / DISC_LABELS / the All-parts chip in index.html. No live-app changes were made.</div>
</body></html>`;

const out = path.join(dir, 'rail-icons-emoji-v2.html');
fs.writeFileSync(out, html);
console.log('wrote', out, (html.length / 1024).toFixed(0) + 'KB');
