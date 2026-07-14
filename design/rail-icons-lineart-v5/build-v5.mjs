// Build the v5 presentation: HTML (for review + PDF), per-id SVG files, mapping.json.
// Zero deps; node build-v5.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLOTS, DISC_SLOTS, SETS, renderSvg } from './icons.mjs';

const here = dirname(fileURLToPath(import.meta.url));

// The live app's four themes (index.html :root / html.dark / html.loam / html.rad).
// `acc` = what that theme would set --icon-accent to — here simply each theme's
// EXISTING --accent variable value, so the wiring is one CSS line per theme.
const THEMES = [
  { key: 'light', name: 'Light', bg: '#f6f7f4', ink: '#1c2321', chip: '#eef3ef', line: '#e3e6e2', acc: '#9a3412' },
  { key: 'dark',  name: 'Dark',  bg: '#161a18', ink: '#e6ebe7', chip: '#262d29', line: '#3a423d', acc: '#e0703c' },
  { key: 'loam',  name: 'Loam',  bg: '#1a1310', ink: '#f2e8d8', chip: '#30241a', line: '#3c2e22', acc: '#e2a94a' },
  { key: 'rad',   name: 'RAD',   bg: '#150029', ink: '#f4eaff', chip: '#3a1466', line: '#ff2fd0', acc: '#00e5ff' },
];

const ALL_SLOTS = [...SLOTS, ...DISC_SLOTS];
const byId = {};
for (const s of ALL_SLOTS) for (const ic of s.icons) byId[ic.id] = { ...ic, slotKey: s.key, slotLabel: s.label };

// ---- write standalone SVG sources + mapping -------------------------------
mkdirSync(join(here, 'svg'), { recursive: true });
const mapping = {};
for (const s of ALL_SLOTS) {
  for (const ic of s.icons) {
    const f = `svg/${ic.id}.svg`, fr = `svg/${ic.id}.reduced.svg`;
    writeFileSync(join(here, f), renderSvg(ic, { weight: 2.5, detail: 'full', label: `${s.label}: ${ic.name}` }) + '\n');
    writeFileSync(join(here, fr), renderSvg(ic, { weight: 2.5, detail: 'reduced', label: `${s.label}: ${ic.name}` }) + '\n');
    mapping[ic.id] = { slot: s.key, name: ic.name, file: f, reduced: fr, ...(ic.anti ? { anti: true } : {}) };
  }
}
writeFileSync(join(here, 'mapping.json'), JSON.stringify(mapping, null, 2) + '\n');

// ---- presentation HTML ----------------------------------------------------
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sw = (icon, { w = 2.5, d = 'full', size = 20 } = {}) => renderSvg(icon, { weight: w, detail: d, size });

const padStyle = (t) => `background:${t.bg};color:${t.ink};--icon-accent:${t.acc}`;

// A rail chip mock, exactly the app's chip shape: icon + label
const chip = (icon, theme, { size = 15, label = null, d = 'full', w = 2.5, active = false } = {}) => {
  const fg = active ? theme.bg : theme.ink;
  const bg = active ? theme.ink : theme.chip;
  // active chips invert ink/bg; the accent stays the theme accent (it pops either way)
  return `<span class="mockchip" style="background:${bg};color:${fg};--icon-accent:${theme.acc}">` +
    sw(icon, { size, d, w }) + (label ? `<span>${esc(label)}</span>` : '') + `</span>`;
};

let body = '';
body += `<header>
<h1>Rail icons v5 — refined line-art + one accent channel</h1>
<p class="lead">Round 5, the quality pass on the v4 direction you approved. Every drawing was re-checked against
manufacturer product photography (RockShox ZEB &amp; Super Deluxe, SRAM GX drivetrain — <b>reference only, nothing traced</b>):
fork crowns are now forged blocks with the arch at the top of the lowers, the shock's piggyback hangs off the head,
derailleur cage plates run parallel around both pulleys, and curves are real beziers instead of polyline approximations.</p>
<p class="lead"><b>The color ask, kept deliberately small:</b> structure stays on <code>currentColor</code>; each icon adds
exactly ONE accent element on <code>var(--icon-accent, currentColor)</code>. One CSS custom property = the whole theming
contract: each site theme sets it once (below it's simply each theme's existing <code>--accent</code> value), and with no
value set the icons degrade to plain line art. No palettes, no per-icon colors — that stays un-built until you start the designs.</p>
</header>`;

// ---- accent demo strip -----------------------------------------------------
const demoIds = ['FK-9', 'TI-10', 'SH-11', 'BR-10', 'DP-8'];
body += `<section class="accdemo"><h2>The accent channel under the four live themes</h2>
<p class="lead">Same SVGs, zero code changes between columns — only <code>--icon-accent</code> differs
(Light&nbsp;${THEMES[0].acc} · Dark&nbsp;${THEMES[1].acc} · Loam&nbsp;${THEMES[2].acc} · RAD&nbsp;${THEMES[3].acc}).</p><div class="accgrid">`;
for (const t of THEMES) {
  body += `<div class="acccol" style="${padStyle(t)};border:1px solid ${t.line}"><div class="acct">${t.name} · <code style="background:transparent">${t.acc}</code></div><div class="row">`;
  for (const id of demoIds) body += sw(byId[id], { size: 34 });
  body += `</div><div class="row" style="margin-top:6px">`;
  for (const id of demoIds) body += sw(byId[id], { size: 20 });
  body += `</div></div>`;
}
body += `</div></section>`;

const renderSlotSection = (s, iconsOverride = null) => {
  const icons = iconsOverride || s.icons.filter(ic => !ic.anti);
  if (!icons.length) return '';
  let h = `<section class="slot"><h2>${esc(s.label)} <span class="pfx">${s.prefix}-</span></h2>`;
  for (const ic of icons) {
    h += `<div class="cand">
      <div class="meta"><b class="cid${ic.anti ? ' anti' : ''}">${ic.id}</b> <b>${esc(ic.name)}</b>
      <p class="vs">${esc(ic.vs)}</p><p>${esc(ic.why)}</p></div>
      <div class="cells">
        <div class="cell"><i>rail size, 4 themes + accents</i><div class="row">`;
    for (const t of THEMES) {
      h += `<span class="pad" style="${padStyle(t)}" title="${t.name}">${sw(ic, { size: 20 })}</span>`;
    }
    h += `</div></div>
        <div class="cell"><i>chip, light + dark + loam</i><div class="row">`;
    for (const t of THEMES.slice(0, 3)) {
      h += `<span class="pad" style="background:${t.bg}">${chip(ic, t, { label: s.label })}</span>`;
    }
    h += `</div></div>`;
    if (!ic.anti) {
      h += `<div class="cell"><i>stroke 2.0 / 2.5 / 3.0</i><div class="row">`;
      for (const w of [2.0, 2.5, 3.0]) h += `<span class="pad lt">${sw(ic, { size: 22, w })}</span>`;
      h += `</div></div>
        <div class="cell"><i>reduced detail @20px</i><div class="row">
          <span class="pad lt">${sw(ic, { size: 20, d: 'reduced' })}</span>
          <span class="pad dk">${sw(ic, { size: 20, d: 'reduced' })}</span>
        </div></div>`;
    }
    h += `<div class="cell big"><i>enlarged</i><div class="row">
          <span class="pad lt">${sw(ic, { size: 92 })}</span>
          <span class="pad dk">${sw(ic, { size: 92 })}</span>
        </div></div>
      </div></div>`;
  }
  h += '</section>';
  return h;
};

body += '<h1 class="part">Part 1 — Component slots, refined <span>(2–3 per slot; the quality pass, not another sweep)</span></h1>';
for (const s of SLOTS) body += renderSlotSection(s);

body += '<h1 class="part">Part 2 — Discipline quintet, refined <span>(one per discipline; the terrain line is the accent)</span></h1>';
for (const s of DISC_SLOTS) body += renderSlotSection(s);

body += `<h1 class="part anti">Part 3 — ANTI-SET — direction check <span>(the ONE deliberately different direction:
solid duotone silhouettes — filled masses, knocked-out details, zero strokes. Here to test the line-art call, not to replace it.)</span></h1>`;
for (const s of ALL_SLOTS) {
  const anti = s.icons.filter(ic => ic.anti);
  body += renderSlotSection(s, anti);
}

body += '<h1 class="part">Part 4 — Curated full-rail sets</h1>';
for (const set of SETS) {
  body += `<section class="setsec"><h2>Set ${set.id} — ${esc(set.name)}</h2><p class="lead">${esc(set.desc)}</p><div class="rails">`;
  for (const t of THEMES) {
    body += `<div class="railmock" style="background:${t.bg};border-color:${t.line};--icon-accent:${t.acc}"><div class="railtitle" style="color:${t.ink}">${t.name}</div>`;
    body += `<div class="drow">`;
    for (const ds of DISC_SLOTS) {
      const ic = byId[set.picks[ds.key]];
      body += chip(ic, t, { size: 14, label: ds.label, active: ds.key === 'disc_all' });
    }
    body += `</div><div class="crow">`;
    const ap = byId[set.picks.all_parts];
    body += chip(ap, t, { size: 15, label: 'All parts', active: true });
    for (const s of SLOTS) {
      if (s.key === 'all_parts') continue;
      const ic = byId[set.picks[s.key]];
      body += chip(ic, t, { size: 15, label: s.label });
    }
    body += `</div></div>`;
  }
  body += `</div><details class="ids"><summary>ids in this set</summary><code>${esc(Object.entries(set.picks).map(([k, v]) => `${k}:${v}`).join('  '))}</code></details></section>`;
}

body += `<footer><p>BuildMyMTB — rail-icon candidates v5 (refined line-art + accent channel + anti-set) ·
${Object.keys(mapping).length} drawings · branch <code>design/rail-icons-emoji-v2</code> · no live-app changes.
Reply with ids (e.g. “FR-10, FK-10, SH-10…”), a set (“R1 but wheels WH-11”), or “anti” thoughts.</p></footer>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<title>BuildMyMTB — rail icons v5, refined + accent</title>
<style>
  :root{--ink:#1c2321;--soft:#566058;--line:#e3e6e2}
  *{box-sizing:border-box}
  body{font:14px/1.45 "Segoe UI",system-ui,sans-serif;color:var(--ink);margin:0;padding:28px 34px;background:#fff}
  h1{font-size:22px;margin:0 0 6px}
  h1.part{font-size:18px;margin:34px 0 8px;padding-top:14px;border-top:3px solid var(--ink);page-break-before:always}
  h1.part span{font-size:12.5px;font-weight:500;color:var(--soft)}
  h1.part.anti{border-top-color:#9a3412;color:#9a3412}
  .lead{color:var(--soft);font-size:12.5px;max-width:880px;margin:4px 0}
  section.slot,section.setsec,section.accdemo{margin:14px 0 20px;page-break-inside:avoid}
  section.slot h2,section.setsec h2,section.accdemo h2{font-size:15px;margin:0 0 6px;border-bottom:1.5px solid var(--line);padding-bottom:4px}
  .pfx{color:var(--soft);font-weight:600;font-size:12px}
  .accgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
  .acccol{border-radius:12px;padding:10px 12px}
  .acct{font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:700;margin-bottom:7px;opacity:.8}
  .cand{display:flex;gap:14px;padding:8px 0;border-bottom:1px dashed var(--line);page-break-inside:avoid}
  .meta{flex:0 0 230px}
  .meta .cid{display:inline-block;background:#1c2321;color:#fff;border-radius:5px;padding:1px 7px;font-size:11.5px;margin-right:5px}
  .meta .cid.anti{background:#9a3412}
  .meta p{margin:4px 0 0;font-size:11px;color:var(--soft)}
  .meta p.vs{color:#1f6f4a;font-weight:600}
  .cells{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}
  .cell i{display:block;font-style:normal;font-size:9.5px;color:var(--soft);text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px}
  .row{display:flex;gap:5px;align-items:center}
  .pad{display:inline-flex;align-items:center;justify-content:center;padding:5px;border-radius:7px;border:1px solid var(--line)}
  .pad.lt{background:#f6f7f4;color:#1c2321;--icon-accent:#9a3412}
  .pad.dk{background:#161a18;color:#e6ebe7;--icon-accent:#e0703c}
  .pad svg{display:block}
  .mockchip{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:5px 11px;font-size:11.5px;font-weight:600;white-space:nowrap}
  .mockchip svg{display:block;flex:none}
  .rails{display:flex;flex-direction:column;gap:10px}
  .railmock{border:1px solid;border-radius:12px;padding:10px 12px}
  .railtitle{font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:700;margin-bottom:6px;opacity:.75}
  .drow,.crow{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0}
  .ids{margin-top:6px}
  .ids summary{font-size:11px;color:var(--soft);cursor:pointer}
  .ids code{font-size:10.5px;color:var(--soft)}
  header{margin-bottom:10px}
  footer{margin-top:26px;border-top:1.5px solid var(--line);padding-top:8px;color:var(--soft);font-size:11.5px}
  code{background:#eef3ef;border-radius:4px;padding:0 4px}
  @media print{ body{padding:10mm 8mm} .cand{break-inside:avoid} section.slot{break-inside:auto} }
</style></head><body>${body}</body></html>`;

writeFileSync(join(here, 'rail-icons-lineart-v5.html'), html);
console.log(`built: ${Object.keys(mapping).length} drawings, ${SLOTS.length + DISC_SLOTS.length} slots, ${SETS.length} sets`);
