// Rail-icon candidates v5 — the refinement round on the v4 literal line-art.
// Douglas's round-4 feedback: "you are getting close... clean them up, make them
// better, a little more accurate. I would like to see a little color too... think
// about how they can also change color with different modes like dark mode, loam
// mode, rad mode. Include the 1 'anti' set."
//
// What changed vs v4 (per drawing, see each icon's `vs` note):
//   • Geometry re-drawn against manufacturer reference photography (RockShox ZEB +
//     Super Deluxe, SRAM GX derailleur/cassette/crank product images — reference
//     only, nothing traced): fork crowns are forged blocks, the arch sits at the
//     TOP of the lowers, piggyback reservoirs hang off the shock HEAD, derailleur
//     cages are parallel plates flanking the pulleys, cassettes step down in cogs.
//   • Proper arcs/beziers replace polyline approximations; junctions computed.
//   • ONE accent channel: each icon carries exactly one restrained accent element
//     stroked/filled with var(--icon-accent, currentColor). Structure stays on
//     currentColor, so with no theme wiring the icons render exactly like v4.
//     Each site theme sets --icon-accent once (the app already owns per-theme
//     --accent values: light #9a3412, dark #e0703c, loam #e2a94a, rad #00e5ff).
//   • THE ANTI-SET (one per slot): the single contrast direction — solid filled
//     duotone silhouettes; chunky filled masses, negative-space seams and
//     knocked-out details (fill-rule evenodd), zero strokes. NOT line art.
//
// Line language (unchanged from v4): 48×48 viewBox, stroke-only, currentColor,
// round caps/joins, class="fd" = fine detail stripped for the reduced cut.
// Ids continue each slot's v2/v3/v4 numbering (read from v4 mapping.json).

const P = (x) => Math.round(x * 100) / 100;
const pt = (cx, cy, r, deg) => {
  const a = (deg - 90) * Math.PI / 180;
  return [P(cx + r * Math.cos(a)), P(cy + r * Math.sin(a))];
};

// The one accent channel. Fallback = currentColor, so a standalone SVG (or an
// unthemed context) degrades to plain line art with zero wiring.
const ACCENT = 'var(--icon-accent, currentColor)';
const A = ` stroke="${ACCENT}"`;          // accent stroke attr
const AF = ` fill="${ACCENT}" stroke="none"`; // accent fill attr

// n radial ticks from r1 to r2 around (cx,cy); extra = raw attr string
const ticks = (cx, cy, r1, r2, n, off = 0, cls = '', extra = '') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = off + i * 360 / n;
    const [x1, y1] = pt(cx, cy, r1, a), [x2, y2] = pt(cx, cy, r2, a);
    s += `<path${cls ? ` class="${cls}"` : ''}${extra} d="M${x1},${y1} L${x2},${y2}"/>`;
  }
  return s;
};
// n filled dots of radius dr on a circle of radius r
const dots = (cx, cy, r, n, dr, off = 0, cls = '', fill = 'currentColor') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const [x, y] = pt(cx, cy, r, off + i * 360 / n);
    s += `<circle${cls ? ` class="${cls}"` : ''} cx="${x}" cy="${y}" r="${dr}" fill="${fill}" stroke="none"/>`;
  }
  return s;
};
const lacedSpokes = (cx, cy, rHub, rRim, n, lean, cls = '') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = i * 360 / n;
    const dir = i % 2 ? lean : -lean;
    const [x1, y1] = pt(cx, cy, rHub, a + dir * 2.2);
    const [x2, y2] = pt(cx, cy, rRim, a);
    s += `<path${cls ? ` class="${cls}"` : ''} d="M${x1},${y1} L${x2},${y2}"/>`;
  }
  return s;
};
const dot = (x, y, r = 1.2, cls = '', fill = 'currentColor') =>
  `<circle${cls ? ` class="${cls}"` : ''} cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="none"/>`;

// ---- anti-set (filled) helpers --------------------------------------------
const fRect = (x, y, w, h, rx = 0, fill = 'currentColor') =>
  `<rect x="${P(x)}" y="${P(y)}" width="${P(w)}" height="${P(h)}" rx="${rx}" fill="${fill}" stroke="none"/>`;
const fCirc = (cx, cy, r, fill = 'currentColor') =>
  `<circle cx="${P(cx)}" cy="${P(cy)}" r="${P(r)}" fill="${fill}" stroke="none"/>`;
const fPoly = (ptsArr, fill = 'currentColor') =>
  `<path d="M${ptsArr.map(p => `${P(p[0])},${P(p[1])}`).join(' L')} Z" fill="${fill}" stroke="none"/>`;
// circle as a path subpath (for evenodd knockout holes)
const cPath = (cx, cy, r) =>
  `M${P(cx - r)},${P(cy)} a${P(r)},${P(r)} 0 1 0 ${P(2 * r)},0 a${P(r)},${P(r)} 0 1 0 ${P(-2 * r)},0`;
// solid donut: outer disc with an evenodd hole
const ring = (cx, cy, rO, rI, fill = 'currentColor') =>
  `<path d="${cPath(cx, cy, rO)} ${cPath(cx, cy, rI)}" fill="${fill}" fill-rule="evenodd" stroke="none"/>`;

// ---------------------------------------------------------------- FRAME (FR-10…)
const FRAME = [
  {
    id: 'FR-10', name: 'Full-sus, refined marquee',
    vs: 'FR-6 cleaned: top tube now drops toward the seat cluster like a real enduro frame, down tube bows, seatstay curves into the rocker; shock is the accent.',
    why: 'The whole enduro frame — front + rear triangle, rocker, the shock tucked inside the front triangle. The marquee literal read.',
    el:
      '<path d="M36.8,6.5 L41.8,17.5"/>' +                       // slack head tube
      '<path d="M37.7,8.7 Q25,10 12.8,12.5"/>' +                 // top tube, dropping rearward
      '<path d="M12.8,12.5 L18.8,37"/>' +                        // seat tube
      '<path d="M41.3,16.5 Q31.5,28.5 18.8,37"/>' +              // bowed down tube
      '<path d="M18.8,37 L4,32"/>' +                             // chainstay
      '<path d="M4,32 Q8.5,24.5 14.2,18.8"/>' +                  // curved seatstay
      '<path d="M14.2,18.8 L19.8,15.8"/>' +                      // rocker link
      `<rect x="15.25" y="19.8" width="13.9" height="5" rx="2.5" transform="rotate(69.7 22.2 22.3)"${A}/>` +
      dot(19.8, 15.8, 1.3, 'fd') + dot(24.6, 28.8, 1.3, 'fd') +  // shock eyelets
      '<circle cx="18.8" cy="37" r="3.2"/>' +                    // chainring at the BB
      dot(4, 32, 1.2, 'fd') + dot(14.2, 18.8, 1.2, 'fd')         // dropout + rocker pivots
  },
  {
    id: 'FR-11', name: 'Hardtail, refined',
    vs: 'FR-8 cleaned: real junction math, gently sloped top tube, straight stays; the chainring is the accent.',
    why: 'The classic diamond — front triangle + fixed rear. The hardtail LIVE push deserves an honest icon.',
    el:
      '<path d="M36.8,7.5 L41.3,17.5"/>' +
      '<path d="M37.5,9.3 L13.2,12.8"/>' +
      '<path d="M13.2,12.8 L18.8,36.5"/>' +
      '<path d="M41,16.8 Q30.5,27.5 18.8,36.5"/>' +
      '<path d="M18.8,36.5 L3.8,31.2"/>' +
      '<path d="M13.7,15 L3.8,31.2"/>' +
      '<path class="fd" d="M13.2,12.8 L12,7"/>' +                // seatpost stub
      `<circle cx="18.8" cy="36.5" r="3.2"${A}/>` +              // accent chainring
      dot(3.8, 31.2, 1.2, 'fd')
  },
  {
    id: 'FR-12', name: 'Full-sus, sculpted',
    vs: 'FR-9 cleaned: continuous C-curves on the down tube and seatstay, dropped top tube; same honest linkage, accent shock.',
    why: 'The modern-carbon character variant — curved tubes, same anatomy.',
    el:
      '<path d="M36.5,6.5 L41.8,18.5"/>' +
      '<path d="M12.5,14 C20,9.5 30,8 37.4,8.8"/>' +
      '<path d="M12.5,14 L18.2,37.2"/>' +
      '<path d="M41.4,17.6 C34,27 26,33 18.2,37.2"/>' +
      '<path d="M18.2,37.2 L3.8,32.8"/>' +
      '<path d="M3.8,32.8 Q9.8,27 13.9,19.8"/>' +
      '<path d="M13.9,19.8 L19.4,16.4"/>' +
      `<rect x="15" y="20.3" width="13.4" height="4.8" rx="2.4" transform="rotate(70 21.7 22.7)"${A}/>` +
      '<circle cx="18.2" cy="37.2" r="3.2"/>' +
      dot(13.9, 19.8, 1.2, 'fd') + dot(3.8, 32.8, 1.2, 'fd')
  },
  {
    id: 'FR-13', name: 'ANTI: frame plate', anti: true,
    vs: 'Anti-set: the frame as two solid plates with knocked-out triangle windows; accent chainring disc.',
    why: 'Direction check — solid duotone silhouette instead of line art.',
    el:
      `<path d="M12.2,11.8 L38.5,7.5 L19.6,37.5 Z ${''
      }M17.1,14.9 L31.7,12.5 L21.2,29.2 Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>` +
      `<path d="M18.4,36.6 L3.4,31.4 L13.4,16.6 L16.9,25.3 Z ${''
      }M14.2,31.1 L8.6,29.2 L12.4,23.6 L13.6,26.8 Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>` +
      fCirc(19.6, 36.6, 3.6, ACCENT)
  }
];

// ----------------------------------------------------------------- FORK (FK-9…)
const FORK = [
  {
    id: 'FK-9', name: 'Front view, full anatomy',
    vs: 'FK-5 corrected against the ZEB: the crown is a forged block (not a floating arch line), stanchions are accented and narrower than the lowers, the arch sits at the TOP of the lowers, and the thru-axle gets its lever.',
    why: 'Crown, stanchions, lowers, arch, dropouts, axle — everything a suspension fork is.',
    el:
      '<path d="M21.8,3.5 L21.2,10.5"/><path d="M26.2,3.5 L26.8,10.5"/>' +  // tapered steerer
      '<path d="M13,16 Q24,9.8 35,16 Q24,13 13,16 Z"/>' +                   // forged crown block
      `<path d="M17,16 L17,27"${A}/><path d="M31,16 L31,27"${A}/>` +        // accent stanchions
      '<rect x="14" y="27" width="6" height="14.5" rx="2.8"/>' +            // lowers
      '<rect x="28" y="27" width="6" height="14.5" rx="2.8"/>' +
      '<path d="M20,30.8 Q24,28 28,30.8"/>' +                               // arch at the top of the lowers
      '<path d="M14.6,43.2 L33.4,43.2"/>' +                                 // thru-axle
      dot(13.2, 43.2, 1.5, 'fd')                                            // axle lever
  },
  {
    id: 'FK-10', name: 'Front view, essential',
    vs: 'FK-6 with the two-tone leg: the exposed stanchion segment is the accent, base legs run to the dropouts; still the 20 px banker.',
    why: 'Only the load-bearing lines — crown, legs, arch, dropouts.',
    el:
      '<path d="M24,4 L24,11"/>' +
      '<path d="M13.5,16 Q24,10.5 34.5,16"/>' +                             // crown arch
      `<path d="M17,15 L17,25"${A}/><path d="M31,15 L31,25"${A}/>` +        // accent stanchions
      '<path d="M17,25 L17,41"/><path d="M31,25 L31,41"/>' +                // lowers
      '<path d="M17,28.5 Q24,25.5 31,28.5"/>' +
      dot(17, 42.6, 1.6) + dot(31, 42.6, 1.6)
  },
  {
    id: 'FK-11', name: 'Side view, raked',
    vs: 'FK-8 cleaned: crown block squared to the steerer, accent stanchion, arch hint kept behind the lower.',
    why: 'The mechanic’s side view — one leg raking forward to the dropout eye.',
    el:
      '<path d="M30.5,3.5 L30.5,10.5"/>' +
      '<path d="M25.2,11.2 L35.4,12.9 L34.3,17.6 L24.2,15.9 Z"/>' +
      `<path d="M27.9,17 L26.3,24.2"${A}/>` +                               // accent stanchion
      '<rect x="21.3" y="24.2" width="6.2" height="14.8" rx="3" transform="rotate(10 24.4 31.6)"/>' +
      '<circle cx="22.5" cy="40.9" r="2.2"/>' +                             // dropout eye
      '<path class="fd" d="M29.7,25.7 Q32.9,27.4 32.9,30.6"/>'              // arch behind
  },
  {
    id: 'FK-12', name: 'ANTI: fork mass', anti: true,
    vs: 'Anti-set: steerer + crown + legs as filled masses with a knocked-out crown slot; accent thru-axle bar.',
    why: 'Direction check — the fork as solid shapes.',
    el:
      `<path d="M21.6,3.5 L26.4,3.5 L26.9,9.6 L35.5,12.4 L35.5,17 L34,17 L34,41.6 ${''
      }Q34,43.8 31.8,43.8 L30.2,43.8 Q28,43.8 28,41.6 L28,17.6 L20,17.6 L20,41.6 ${''
      }Q20,43.8 17.8,43.8 L16.2,43.8 Q14,43.8 14,41.6 L14,17 L12.5,17 L12.5,12.4 ${''
      }L21.1,9.6 Z M15.8,13.9 L32.2,13.9 L32.2,15.5 L15.8,15.5 Z" ` +
      'fill="currentColor" fill-rule="evenodd" stroke="none"/>' +
      '<path d="M20,29.5 Q24,26.4 28,29.5 L28,33.3 Q24,30.2 20,33.3 Z" fill="currentColor" stroke="none"/>' +
      fRect(13, 40.2, 22, 2.7, 1.35, ACCENT)                                // accent axle
  }
];

// ---------------------------------------------------------------- SHOCK (SH-10…)
const SHOCK = [
  {
    id: 'SH-10', name: 'Air + piggyback, refined',
    vs: 'SH-6 corrected against the Super Deluxe: the reservoir hangs off the shock HEAD (not mid-body), the shaft carries sag gradation ticks, eyelets read as mounting rings; the reservoir is the accent.',
    why: 'Body, shaft, both eyelets, piggyback — the enduro shock, upright.',
    el:
      '<circle cx="25" cy="5.8" r="2.9"/>' +                     // upper eyelet
      '<path d="M25,8.7 L25,9.6"/>' +
      '<rect x="19.9" y="9.6" width="10.2" height="15.8" rx="3.3"/>' +   // air can
      `<rect x="13.6" y="9.9" width="6.2" height="10.6" rx="3"${A}/>` +  // accent piggyback, bonded to the head
      '<path d="M25,25.4 L25,36.6"/>' +                          // damper shaft
      '<path class="fd" d="M22.9,29.6 L27.1,29.6"/><path class="fd" d="M23.2,32.2 L26.8,32.2"/>' + // sag marks
      '<circle cx="25" cy="39.7" r="2.9"/>' +                    // lower eyelet
      dot(30.8, 11.6, 1.2, 'fd')                                 // rebound adjuster
  },
  {
    id: 'SH-11', name: 'Coil, refined',
    vs: 'SH-7 rebuilt: the spring is now parallel coil turns (the accent — coils are the famously colored part), with a visible damper body under the eyelet and proper spring perches.',
    why: 'The spring wrapped around the shaft between two eyelets — unmistakably a coil.',
    el:
      '<circle cx="24" cy="5.8" r="2.9"/>' +
      '<rect x="20.8" y="9.4" width="6.4" height="5.4" rx="1.8"/>' +      // damper body
      '<path d="M24,14.8 L24,39"/>' +                                     // shaft
      '<path d="M18.5,15.8 L29.5,15.8"/>' +                               // top perch
      `<path d="M17.5,19 L30.5,21.6"${A}/><path d="M17.5,23 L30.5,25.6"${A}/>` +
      `<path d="M17.5,27 L30.5,29.6"${A}/><path d="M17.5,31 L30.5,33.6"${A}/>` + // accent coil turns
      '<path d="M18.5,37.4 L29.5,37.4"/>' +                               // bottom perch
      '<circle cx="24" cy="41.8" r="2.9"/>'
  },
  {
    id: 'SH-12', name: 'ANTI: shock mass', anti: true,
    vs: 'Anti-set: eyelet donuts, solid can + accent reservoir chip, fat shaft bar; seams do the detailing.',
    why: 'Direction check — the shock as solid shapes.',
    el:
      ring(25, 6, 3.4, 1.5) +
      fRect(19.6, 10.6, 10.8, 15.6, 3.4) +
      fRect(12.4, 10.9, 6, 10.4, 3, ACCENT) +
      fRect(23.5, 27.4, 3, 9.4, 1.5) +
      ring(25, 40.4, 3.4, 1.5)
  }
];

// --------------------------------------------------------------- WHEELS (WH-10…)
const WHEELS = [
  {
    id: 'WH-10', name: 'Laced wheel, refined',
    vs: 'WH-6 cleaned: double-wall rim, tangential lacing kept, hub gains its axle line; the hub shell is the accent.',
    why: 'A built wheel — rim, laced spokes, hub — not a generic circle.',
    el:
      '<circle cx="24" cy="24" r="16.6"/>' +
      '<circle class="fd" cx="24" cy="24" r="14"/>' +
      lacedSpokes(24, 24, 3.6, 14, 8, 16) +
      `<circle cx="24" cy="24" r="3.6"${A}/>` +                  // accent hub
      '<path class="fd" d="M19,24 L29,24"/>' +                   // axle
      '<path class="fd" d="M24,40.6 L24,44.2"/>'                 // valve stem
  },
  {
    id: 'WH-11', name: 'Wheel, essential',
    vs: 'WH-7 with the spokes re-angled off vertical (no valve collision) and the accent hub.',
    why: 'Rim, six spokes, hub. The cleanest wheel for the rail.',
    el:
      '<circle cx="24" cy="24" r="16.6"/>' +
      ticks(24, 24, 3.2, 16.6, 6, 15) +
      `<circle cx="24" cy="24" r="3.2"${A}/>`
  },
  {
    id: 'WH-12', name: 'ANTI: wheel disc', anti: true,
    vs: 'Anti-set: solid rim donut, five fat spoke bars, accent hub disc.',
    why: 'Direction check — the wheel as solid shapes.',
    el: (() => {
      let s = ring(24, 24, 16.6, 12.8);
      for (let i = 0; i < 5; i++) {
        const a = i * 72 + 18;
        const [x1, y1] = pt(24, 24, 4.6, a), [x2, y2] = pt(24, 24, 13.2, a);
        const mx = P((x1 + x2) / 2), my = P((y1 + y2) / 2);
        const ang = P(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI);
        s += `<rect x="${P(mx - 4.9)}" y="${P(my - 1.5)}" width="9.8" height="3" rx="1.5" transform="rotate(${ang} ${mx} ${my})" fill="currentColor" stroke="none"/>`;
      }
      return s + fCirc(24, 24, 4.4, ACCENT);
    })()
  }
];

// ----------------------------------------------------------------- TIRE (TI-10…)
const TIRE = [
  {
    id: 'TI-10', name: 'Knobby, face on',
    vs: 'TI-6 with the knob ring promoted to the accent (Douglas’s own example: a tread band) and the side knobs kept as fine detail.',
    why: 'Casing, bead, and a full accent ring of knobs — “aggressive MTB tire” instantly.',
    el:
      '<circle cx="24" cy="24" r="15.2"/>' +
      '<circle cx="24" cy="24" r="9.6"/>' +
      ticks(24, 24, 15.6, 18.4, 14, 13, '', A) +                 // accent tread band
      dots(24, 24, 12.4, 8, 1, 0, 'fd')                          // side knobs
  },
  {
    id: 'TI-11', name: 'Tread crescent',
    vs: 'TI-7 with the outer knob row as the accent and the arcs’ end caps squared.',
    why: 'The tread pattern up close — the thing you actually buy a tire for.',
    el:
      '<path d="M4,42 A38,38 0 0 1 42,4"/>' +
      '<path d="M14.8,42 A27.2,27.2 0 0 1 42,14.8"/>' +
      '<path d="M4,42 L14.8,42"/><path d="M42,4 L42,14.8"/>' +
      (() => {
        let s = '';
        for (let i = 0; i < 4; i++) {                            // outer knob row — accent
          const a = 277 + i * 22;
          const [x, y] = pt(42, 42, 34.4, a);
          s += `<rect x="${P(x - 1.9)}" y="${P(y - 1.9)}" width="3.8" height="3.8" rx="0.9" transform="rotate(${P(a)} ${x} ${y})"${A}/>`;
        }
        for (let i = 0; i < 3; i++) {                            // inner row — fine detail
          const a = 288 + i * 22;
          const [x, y] = pt(42, 42, 29.6, a);
          s += `<rect class="fd" x="${P(x - 1.6)}" y="${P(y - 1.6)}" width="3.2" height="3.2" rx="0.8" transform="rotate(${P(a)} ${x} ${y})"/>`;
        }
        return s;
      })()
  },
  {
    id: 'TI-12', name: 'ANTI: tire donut', anti: true,
    vs: 'Anti-set: solid casing donut with accent knob chips around it.',
    why: 'Direction check — the tire as solid shapes.',
    el: (() => {
      let s = ring(24, 24, 14.8, 9.2);
      for (let i = 0; i < 8; i++) {
        const a = i * 45 + 22.5;
        const [x, y] = pt(24, 24, 17.4, a);
        s += `<rect x="${P(x - 2)}" y="${P(y - 2)}" width="4" height="4" rx="1" transform="rotate(${P(a)} ${x} ${y})" fill="${ACCENT}" stroke="none"/>`;
      }
      return s;
    })()
  }
];

// ------------------------------------------------------------ DRIVETRAIN (DR-10…)
const DRIVETRAIN = [
  {
    id: 'DR-10', name: 'Cassette + derailleur',
    vs: 'DR-6 corrected against the GX photo: hanger-bolt pivot added, the cage plates now run PARALLEL flanking both pulleys (v4’s plates were offset past each other), stepped inner cogs; the pulleys are the accent.',
    why: 'Cog cluster with the mech and its pulley cage under it — the drivetrain photo every rider knows.',
    el: (() => {
      const C = [16.5, 13.5];
      let s =
        `<circle cx="${C[0]}" cy="${C[1]}" r="10.8"/>` +
        ticks(C[0], C[1], 10.8, 12.5, 14, 0, 'fd') +             // cassette teeth
        `<circle class="fd" cx="${C[0]}" cy="${C[1]}" r="7"/>` +
        `<circle cx="${C[0]}" cy="${C[1]}" r="3.6"/>` +
        '<path d="M21,21.5 L25.6,24.2"/>' +                      // b-link to the knuckle
        dot(21, 21.5, 1.2, 'fd');                                // hanger-bolt pivot
      // cage: parallel plates flanking the two pulleys
      const P1 = [28.5, 30.5], P2 = [34, 40];
      const dx = P2[0] - P1[0], dy = P2[1] - P1[1], L = Math.hypot(dx, dy);
      const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const off = 3.3, ext = 3.1;
      for (const sgn of [1, -1]) {
        const x1 = P(P1[0] + sgn * nx * off - ux * ext), y1 = P(P1[1] + sgn * ny * off - uy * ext);
        const x2 = P(P2[0] + sgn * nx * off + ux * ext), y2 = P(P2[1] + sgn * ny * off + uy * ext);
        s += `<path d="M${x1},${y1} L${x2},${y2}"/>`;
      }
      s += `<circle cx="${P1[0]}" cy="${P1[1]}" r="2.6"${A}/>` + // accent pulleys
           `<circle cx="${P2[0]}" cy="${P2[1]}" r="2.6"${A}/>`;
      return s;
    })()
  },
  {
    id: 'DR-11', name: 'Crank + chainring',
    vs: 'DR-7 cleaned: crank arm re-proportioned to the GX photo (longer, slimmer, pedal boss drawn), 4-arm spider as fine detail; the chainring is the accent.',
    why: 'Chainring with the crank arm reaching for the pedal — the other half of the drivetrain.',
    el:
      `<circle cx="18.5" cy="28.5" r="12.2"${A}/>` +             // accent chainring
      ticks(18.5, 28.5, 12.6, 14.5, 16, 0, 'fd') +               // teeth
      ticks(18.5, 28.5, 5, 12.2, 4, 45, 'fd') +                  // spider arms
      '<circle class="fd" cx="18.5" cy="28.5" r="5"/>' +
      '<rect x="15.05" y="16.8" width="26.9" height="5.4" rx="2.7" transform="rotate(-42 28.5 19.5)"/>' +
      dot(18.5, 28.5, 1.5) + dot(38.3, 10.8, 1.6)                // BB bolt + pedal boss
  },
  {
    id: 'DR-12', name: 'ANTI: drivetrain mass', anti: true,
    vs: 'Anti-set: solid cassette donut with a knocked-out lockring, fat cage bar, accent pulley discs.',
    why: 'Direction check — the drivetrain as solid shapes.',
    el:
      ring(16.5, 14, 11, 6.6) + fCirc(16.5, 14, 3.4) +
      (() => {
        const P1 = [28.5, 30], P2 = [34.5, 40];
        const mx = P((P1[0] + P2[0]) / 2), my = P((P1[1] + P2[1]) / 2);
        const ang = P(Math.atan2(P2[1] - P1[1], P2[0] - P1[0]) * 180 / Math.PI);
        const len = Math.hypot(P2[0] - P1[0], P2[1] - P1[1]) + 9;
        return `<rect x="${P(mx - len / 2)}" y="${P(my - 4)}" width="${P(len)}" height="8" rx="4" transform="rotate(${ang} ${mx} ${my})" fill="currentColor" stroke="none"/>` +
          fCirc(P1[0], P1[1], 2.4, ACCENT) + fCirc(P2[0], P2[1], 2.4, ACCENT);
      })()
  }
];

// ---------------------------------------------------------------- BRAKES (BR-10…)
const BRAKES = [
  {
    id: 'BR-10', name: 'Rotor + caliper',
    vs: 'BR-6 with the spider redrawn as curved arms off an accent center (Douglas’s example: “rotor center”), vent ring kept as fine detail.',
    why: 'The disc with its caliper straddling the rim — braking drawn as the hardware.',
    el: (() => {
      let s = '<circle cx="21.5" cy="26.5" r="15.2"/>' +
        `<circle cx="21.5" cy="26.5" r="4.6"${A}/>`;             // accent rotor center
      for (let i = 0; i < 5; i++) {                              // curved spider arms — accent
        const a = i * 72 + 10;
        const [x1, y1] = pt(21.5, 26.5, 4.6, a);
        const [xc, yc] = pt(21.5, 26.5, 7.6, a + 20);
        const [x2, y2] = pt(21.5, 26.5, 10.6, a + 34);
        s += `<path d="M${x1},${y1} Q${xc},${yc} ${x2},${y2}"${A}/>`;
      }
      s += '<circle class="fd" cx="21.5" cy="26.5" r="12.4" stroke-dasharray="3 3.9"/>' + // vent slots
        '<rect x="24.75" y="10.75" width="15" height="10" rx="3.2" transform="rotate(45 32.25 15.75)"/>' +
        dot(29.2, 13.9, 1.1, 'fd') + dot(34.6, 19.3, 1.1, 'fd'); // caliper bolts
      return s;
    })()
  },
  {
    id: 'BR-11', name: 'Brake lever',
    vs: 'BR-7 cleaned: the blade sweep is one continuous curve to the tip (the accent — it’s the part your finger lives on), hose kept as fine detail.',
    why: 'Master cylinder on the bar, hose, and the lever blade — the cockpit half of the brake.',
    el:
      '<path d="M37.5,19 L45,19"/>' +                            // the handlebar
      '<circle cx="33" cy="19" r="3.8"/>' +                      // bar clamp
      '<rect x="15" y="15.5" width="14.5" height="7" rx="3"/>' + // master cylinder
      `<path d="M15,21.4 Q7.2,23.9 4.4,30.2 L3.8,32.6"${A}/>` +  // accent blade, one sweep
      '<path class="fd" d="M15,17.5 Q8.5,16 6.8,9.5"/>' +        // hose
      dot(16, 21.2, 1.1, 'fd') + dot(33, 19, 1.3, 'fd')          // pivot + clamp bolt
  },
  {
    id: 'BR-12', name: 'ANTI: rotor disc', anti: true,
    vs: 'Anti-set: solid rotor with knocked-out vent holes and center bore; accent caliper block.',
    why: 'Direction check — the brake as solid shapes.',
    el: (() => {
      let d = cPath(21.5, 26.5, 15) + ' ' + cPath(21.5, 26.5, 4.2);
      for (let i = 0; i < 6; i++) {
        const [x, y] = pt(21.5, 26.5, 9.6, i * 60 + 15);
        d += ' ' + cPath(x, y, 1.8);
      }
      return `<path d="${d}" fill="currentColor" fill-rule="evenodd" stroke="none"/>` +
        `<rect x="25.4" y="11.4" width="14" height="9.2" rx="3" transform="rotate(45 32.4 16)" fill="${ACCENT}" stroke="none"/>`;
    })()
  }
];

// -------------------------------------------------------------------- BB (BB-8…)
const BB = [
  {
    id: 'BB-8', name: 'Cartridge, side view',
    vs: 'BB-5 with the spindle stubs promoted to the accent (the crank interface IS the compatibility fact) and cleaner cup notches.',
    why: 'Shell tube, cups at both ends, spindle poking out — the BB as it sits in the box.',
    el:
      '<rect x="13.5" y="19.5" width="21" height="9" rx="2.2"/>' +
      '<rect x="8" y="17" width="5.5" height="14" rx="2"/>' +
      '<rect x="34.5" y="17" width="5.5" height="14" rx="2"/>' +
      `<path d="M3.5,24 L8,24"${A}/><path d="M40,24 L44.5,24"${A}/>` +   // accent spindle
      '<path class="fd" d="M9.6,15 L9.6,17"/><path class="fd" d="M12,15 L12,17"/>' +
      '<path class="fd" d="M36,15 L36,17"/><path class="fd" d="M38.4,15 L38.4,17"/>'
  },
  {
    id: 'BB-9', name: 'Cup face-on',
    vs: 'BB-6 with the bearing balls as the accent and the tool notches evened out.',
    why: 'The bearing cup you actually see: notched tool ring, bearing, spindle bore.',
    el:
      '<circle cx="24" cy="24" r="14.5"/>' +
      ticks(24, 24, 13, 16, 8, 22.5) +
      '<circle cx="24" cy="24" r="8"/>' +
      '<circle cx="24" cy="24" r="3.8"/>' +
      dots(24, 24, 5.9, 6, 0.95, 0, '', ACCENT)                  // accent bearing balls
  },
  {
    id: 'BB-10', name: 'ANTI: cup disc', anti: true,
    vs: 'Anti-set: solid notched ring with knocked-out bearing dots; accent bore disc.',
    why: 'Direction check — the BB as solid shapes.',
    el: (() => {
      let d = cPath(24, 24, 14.5) + ' ' + cPath(24, 24, 8);
      for (let i = 0; i < 8; i++) {
        const [x, y] = pt(24, 24, 11.2, i * 45 + 22.5);
        d += ' ' + cPath(x, y, 1.4);
      }
      return `<path d="${d}" fill="currentColor" fill-rule="evenodd" stroke="none"/>` +
        fCirc(24, 24, 4.6, ACCENT);
    })()
  }
];

// -------------------------------------------------------------- HEADSET (HS-8…)
const HEADSET = [
  {
    id: 'HS-8', name: 'Exploded stack',
    vs: 'HS-5 with the two bearing cups as the accent (the anodized part in every catalog photo) and the crown race arc tightened.',
    why: 'Top cap, spacer, cups, crown race — the headset catalog photo, stacked in order.',
    el:
      '<path d="M17.5,5.5 L30.5,5.5 L28.6,9.3 L19.4,9.3 Z"/>' +
      '<rect x="18.5" y="12.4" width="11" height="3.2" rx="1.3"/>' +
      `<rect x="14" y="19.5" width="20" height="4.8" rx="1.9"${A}/>` +   // accent upper cup
      `<rect x="14" y="28.2" width="20" height="4.8" rx="1.9"${A}/>` +   // accent lower cup
      '<path d="M15.5,41.3 Q24,36.6 32.5,41.3"/>' +
      '<path class="fd" d="M19.5,24.3 L21,26.7 M28.5,24.3 L27,26.7"/>'   // taper hint
  },
  {
    id: 'HS-9', name: 'Cups on the steerer',
    vs: 'HS-7 with the inner bearing races promoted from fine detail to the accent.',
    why: 'The two bearing assemblies on the steerer they let spin.',
    el:
      '<path d="M24,3.5 L24,44.5"/>' +
      '<ellipse cx="24" cy="13.5" rx="11" ry="4"/>' +
      '<ellipse cx="24" cy="34.5" rx="11" ry="4"/>' +
      `<ellipse cx="24" cy="13.5" rx="5.5" ry="2"${A}/>` +
      `<ellipse cx="24" cy="34.5" rx="5.5" ry="2"${A}/>`
  },
  {
    id: 'HS-10', name: 'ANTI: stack mass', anti: true,
    vs: 'Anti-set: the stack as filled chips with knocked-out bore slots; accent cups.',
    why: 'Direction check — the headset as solid shapes.',
    el:
      fPoly([[17, 4.5], [31, 4.5], [28.6, 9.5], [19.4, 9.5]]) +
      fRect(18.5, 12.2, 11, 3.4, 1.4) +
      `<path d="M14,19 h20 v5.2 h-20 Z M21.5,20.6 h5 v2 h-5 Z" fill="${ACCENT}" fill-rule="evenodd" stroke="none"/>` +
      `<path d="M14,27.9 h20 v5.2 h-20 Z M21.5,29.5 h5 v2 h-5 Z" fill="${ACCENT}" fill-rule="evenodd" stroke="none"/>` +
      '<path d="M14.8,42.6 Q24,36.8 33.2,42.6 L33.2,44.2 Q24,38.8 14.8,44.2 Z" fill="currentColor" stroke="none"/>'
  }
];

// -------------------------------------------------------------- DROPPER (DP-8…)
const DROPPER = [
  {
    id: 'DP-8', name: 'Dropper, refined',
    vs: 'DP-6 with the seal collar as the accent (the anodized collar on real posts), clamp bolt added, actuator kept.',
    why: 'Head, stanchion, seal collar, lower with the cable actuator.',
    el:
      '<rect x="19.9" y="3.6" width="8.2" height="3.8" rx="1.5"/>' +
      '<rect x="21.6" y="7.4" width="4.8" height="13"/>' +
      '<path class="fd" d="M24,10 L24,18"/>' +                   // stanchion key line
      `<rect x="17.9" y="20.4" width="12.2" height="4.6" rx="1.8"${A}/>` + // accent collar
      '<rect x="19.4" y="25" width="9.2" height="17" rx="1.8"/>' +
      '<path class="fd" d="M19.4,39.8 L15,39.8 L15,43.6"/>'      // actuator
  },
  {
    id: 'DP-9', name: 'Dropper + travel arrows',
    vs: 'DP-5 with the travel arrows as the accent (literal motion = the accent channel) and the post proportions matched to DP-8.',
    why: 'The telescoping post with its travel drawn beside it.',
    el:
      '<rect x="15.9" y="3.6" width="8.2" height="3.8" rx="1.5"/>' +
      '<rect x="17.6" y="7.4" width="4.8" height="13"/>' +
      '<rect x="13.9" y="20.4" width="12.2" height="4.6" rx="1.8"/>' +
      '<rect x="15.4" y="25" width="9.2" height="17" rx="1.8"/>' +
      `<path d="M37,14 L37,34"${A}/>` +
      `<path d="M33.8,17.2 L37,14 L40.2,17.2"${A}/>` +
      `<path d="M33.8,30.8 L37,34 L40.2,30.8"${A}/>`
  },
  {
    id: 'DP-10', name: 'ANTI: post mass', anti: true,
    vs: 'Anti-set: telescoping filled chips — head, stanchion, accent collar, lower with a knocked-out slot.',
    why: 'Direction check — the dropper as solid shapes.',
    el:
      fRect(19.7, 3.5, 8.6, 4, 1.6) +
      fRect(21.7, 8.7, 4.6, 11.2) +
      fRect(17.7, 21.1, 12.6, 4.8, 1.9, ACCENT) +
      `<path d="M19.3,27.1 h9.4 v16.4 h-9.4 Z M23,29.5 h2 v7 h-2 Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>`
  }
];

// -------------------------------------------------------------- COCKPIT (CP-8…)
const COCKPIT = [
  {
    id: 'CP-8', name: 'Riser bar + stem, front',
    vs: 'CP-5 with true riser-bend beziers (v4’s were lopsided), faceplate bolts kept, and the grips as the accent.',
    why: 'The rise of the bar with the stem clamped at center — the cockpit as the rider faces it.',
    el:
      '<path d="M4,13.5 C8,13.5 10.5,17.5 15.5,18.6 L32.5,18.6 C37.5,17.5 40,13.5 44,13.5"/>' +
      `<path d="M4,13.5 L9.8,13.5"${A}/><path d="M38.2,13.5 L44,13.5"${A}/>` + // accent grips
      '<rect x="20.4" y="18.6" width="7.2" height="9" rx="2.2"/>' +
      '<rect class="fd" x="21.8" y="27.6" width="4.4" height="5.6"/>' +  // steerer stub
      dot(22.5, 22.6, 1, 'fd') + dot(25.5, 22.6, 1, 'fd')               // faceplate bolts
  },
  {
    id: 'CP-9', name: 'Bar + stem, top down',
    vs: 'CP-6 with the backsweep curve retuned and the bar-end grip segments as the accent.',
    why: 'Backswept bar, stem reaching forward, steerer clamp — the top-down shot.',
    el:
      '<path d="M4.5,15.5 Q24,8 43.5,15.5"/>' +
      `<path d="M4.5,15.5 L10.3,13.3"${A}/><path d="M37.7,13.3 L43.5,15.5"${A}/>` + // accent grips
      '<rect x="20.4" y="12.2" width="7.2" height="14" rx="2.6"/>' +
      '<path class="fd" d="M20.4,16.8 L27.6,16.8"/>' +           // faceplate split
      '<circle cx="24" cy="31.5" r="5"/>' +
      dot(24, 31.5, 1.4, 'fd')
  },
  {
    id: 'CP-10', name: 'ANTI: cockpit mass', anti: true,
    vs: 'Anti-set: filled bar sweep band + accent stem block with a knocked-out faceplate slot.',
    why: 'Direction check — the cockpit as solid shapes.',
    el:
      '<path d="M4,16.5 Q24,8.5 44,16.5 L44,13.4 Q24,5.4 4,13.4 Z" fill="currentColor" stroke="none"/>' +
      `<path d="M20.6,17.5 h6.8 q2.4,0 2.4,2.4 v9.2 q0,2.4 -2.4,2.4 h-6.8 q-2.4,0 -2.4,-2.4 v-9.2 q0,-2.4 2.4,-2.4 Z ${''
      }M21.2,21.5 h5.6 v1.8 h-5.6 Z" fill="${ACCENT}" fill-rule="evenodd" stroke="none"/>` +
      fCirc(24, 37.4, 4.6)
  }
];

// --------------------------------------------------------------- SADDLE (SA-9…)
const SADDLE = [
  {
    id: 'SA-9', name: 'Saddle + rails, side',
    vs: 'SA-6 with a smoother shell spline and the rail loop as the accent (Ti rails!).',
    why: 'Tall rounded rear, slim nose, rail loop underneath — the rails make it a saddle.',
    el:
      '<path d="M5.2,17.8 C9.5,15.4 14,15.4 18,16.9 C25,19.4 33,20.4 39.8,20.4 C42.8,20.4 43.8,21.7 42.3,23 C39.8,25 33,25.8 26,25.5 C17,25.2 7.2,23.4 5,20.6 C4.2,19.4 4.4,18.4 5.2,17.8 Z"/>' +
      `<path d="M12,25.4 C12,29.6 15,31.6 19,31.6 L27,31.6 C31,31.6 33.5,29.6 33.5,25.8"${A}/>`
  },
  {
    id: 'SA-10', name: 'Saddle, top view',
    vs: 'SA-7 with the pressure-relief channel as the accent.',
    why: 'The teardrop from above.',
    el:
      '<path d="M24,4.5 C28.5,9.5 32.5,17.5 32.5,27 C32.5,36.5 29,43.5 24,43.5 C19,43.5 15.5,36.5 15.5,27 C15.5,17.5 19.5,9.5 24,4.5 Z"/>' +
      `<ellipse cx="24" cy="27" rx="2.2" ry="7.5"${A}/>`
  },
  {
    id: 'SA-11', name: 'ANTI: saddle mass', anti: true,
    vs: 'Anti-set: filled shell with a knocked-out top line; accent rail loop band.',
    why: 'Direction check — the saddle as solid shapes.',
    el:
      `<path d="M5.2,16.8 C9.5,14.4 14,14.4 18,15.9 C25,18.4 33,19.4 39.8,19.4 C43.4,19.4 44.6,21.4 42.6,23.2 C39.8,25.6 33,26.6 26,26.3 C17,26 6.8,24.2 4.6,20.8 C3.6,19.2 4,17.6 5.2,16.8 Z ${''
      }M9,18.4 C13,16.9 16,17.1 19.5,18.3 C24,19.9 30,20.8 35,20.9 L35,22.2 C29,22.3 22,21.5 16,19.9 C13.4,19.2 10.8,18.9 9,19.3 Z" ` +
      'fill="currentColor" fill-rule="evenodd" stroke="none"/>' +
      `<path d="M12,26.8 C12,31 15,33 19,33 L27,33 C31,33 33.5,31 33.5,27.2 L30.7,27.2 C30.7,29.6 29,30.3 27,30.3 L19,30.3 C17,30.3 14.8,29.6 14.8,26.8 Z" fill="${ACCENT}" stroke="none"/>`
  }
];

// --------------------------------------------------------------- PEDALS (PD-8…)
const PEDALS = [
  {
    id: 'PD-8', name: 'Flat pedal, top view',
    vs: 'PD-5 with the traction pins as the accent (colored pins are a real thing) and the platform chamfers kept.',
    why: 'Platform, spindle, pins — the flat pedal as you look down at it.',
    el:
      '<rect x="9" y="13" width="30" height="22" rx="4.5"/>' +
      '<path d="M3,24 L9,24"/>' +
      '<path class="fd" d="M9,21.6 L39,21.6"/><path class="fd" d="M9,26.4 L39,26.4"/>' +
      dot(14.5, 17.5, 1.1, '', ACCENT) + dot(24, 17.5, 1.1, '', ACCENT) + dot(33.5, 17.5, 1.1, '', ACCENT) +
      dot(14.5, 30.5, 1.1, '', ACCENT) + dot(24, 30.5, 1.1, '', ACCENT) + dot(33.5, 30.5, 1.1, '', ACCENT)
  },
  {
    id: 'PD-9', name: 'Flat pedal, side view',
    vs: 'PD-6 corrected: pins now stand proud on BOTH faces (real flats are double-sided), accent pins.',
    why: 'The thin platform on its spindle — the profile every shin remembers.',
    el:
      '<rect x="6" y="21.8" width="36" height="6" rx="3" transform="rotate(-4 24 24.8)"/>' +
      '<circle cx="24" cy="24.8" r="2.1"/>' +
      `<path d="M12,20.2 L12,17.2"${A}/><path d="M24,19.4 L24,16.4"${A}/><path d="M36,18.5 L36,15.5"${A}/>` +
      `<path class="fd" d="M12,29.5 L12,32.5"${A}/><path class="fd" d="M36,27.8 L36,30.8"${A}/>`
  },
  {
    id: 'PD-10', name: 'ANTI: pedal slab', anti: true,
    vs: 'Anti-set: filled platform with a knocked-out spindle slot; accent pin dots.',
    why: 'Direction check — the pedal as solid shapes.',
    el:
      `<path d="M9,13.5 h30 q4.5,0 4.5,4.5 v12 q0,4.5 -4.5,4.5 h-30 q-4.5,0 -4.5,-4.5 v-12 q0,-4.5 4.5,-4.5 Z ${''
      }M8.5,22.6 h31 v2.8 h-31 Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>` +
      dot(15, 18, 1.5, '', ACCENT) + dot(24, 18, 1.5, '', ACCENT) + dot(33, 18, 1.5, '', ACCENT) +
      dot(15, 30, 1.5, '', ACCENT) + dot(24, 30, 1.5, '', ACCENT) + dot(33, 30, 1.5, '', ACCENT)
  }
];

// ------------------------------------------------------------ ALL PARTS (AP-9…)
const ALLPARTS = [
  {
    id: 'AP-9', name: 'The whole bike, refined',
    vs: 'AP-7 cleaned: the down tube now actually runs head tube → BB (v4’s note admitted it didn’t), wheels get fine-detail spokes, accent chainring.',
    why: 'Every part in its place — the complete build this site exists to check.',
    el:
      '<circle cx="11" cy="33" r="8.5"/>' +
      '<circle cx="37" cy="33" r="8.5"/>' +
      ticks(11, 33, 2, 8.5, 4, 20, 'fd') + ticks(37, 33, 2, 8.5, 4, 65, 'fd') +
      '<path d="M18,16 L33.5,14.5"/>' +                          // top tube
      '<path d="M18,16 L22,33"/>' +                              // seat tube
      '<path d="M33.5,14.5 L22,33"/>' +                          // down tube
      '<path d="M22,33 L11,33"/>' +                              // chainstay
      '<path d="M18,16 L11,33"/>' +                              // seatstay
      '<path d="M33.5,14.5 L37,33"/>' +                          // fork
      '<path class="fd" d="M17.5,15.5 L17,12.5 M14.5,12 L20,12"/>' +
      '<path class="fd" d="M34,14 L33,10.5 M31,11 L36,10"/>' +
      `<circle cx="22" cy="33" r="2.4"${A}/>`                    // accent chainring
  },
  {
    id: 'AP-10', name: 'Parts grid',
    vs: 'AP-6 with the mini-cog center as the accent and the mini-fork legs shortened so the quadrants balance.',
    why: 'Four mini components — wheel, frame, fork, cog — literally “all the parts”.',
    el:
      '<circle cx="13" cy="13" r="7"/>' + ticks(13, 13, 1.8, 7, 6, 0, 'fd') + dot(13, 13, 1.2, 'fd') +
      '<path d="M29,19 L35,8.5 L41,19 Z"/>' +
      '<path d="M9,28 Q13,25.5 17,28"/><path d="M9,28 L9,39.5"/><path d="M17,28 L17,39.5"/>' +
      '<circle cx="35" cy="34" r="5.5"/>' + ticks(35, 34, 5.7, 7.6, 8, 0, 'fd') +
      dot(35, 34, 1.6, '', ACCENT)
  },
  {
    id: 'AP-11', name: 'ANTI: parts grid mass', anti: true,
    vs: 'Anti-set: the same four-quadrant grid as solid chips; accent cog.',
    why: 'Direction check — the grid as solid shapes.',
    el:
      ring(13, 13, 7.2, 3.6) + fCirc(13, 13, 1.6) +
      `<path d="M28.5,19.5 L35,8 L41.5,19.5 Z M32.6,16.9 L35,12.7 L37.4,16.9 Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>` +
      '<path d="M8,27.2 Q13,24 18,27.2 L18,30.4 Q13,27.2 8,30.4 Z" fill="currentColor" stroke="none"/>' +
      fRect(7.6, 31.8, 3.2, 8.2, 1.6) + fRect(15.2, 31.8, 3.2, 8.2, 1.6) +
      (() => {
        let d = cPath(35, 34, 6.4) + ' ' + cPath(35, 34, 2.4);
        return `<path d="${d}" fill="${ACCENT}" fill-rule="evenodd" stroke="none"/>`;
      })()
  }
];

// ------------------------------------------------------- DISCIPLINES (refined)
// Same line language; the terrain line is the accent — that's the part that IS
// the discipline. Rider anatomy smoothed: bezier backs, elbow bends, knee bends.

const DISC_ALL = [
  {
    id: 'DA-38', name: 'Rider, neutral trail', slot: 'disc_all',
    vs: 'DA-36 with a bezier back, a bent arm, and the ground line as the accent.',
    why: 'Neutral ready position on flat ground — every discipline starts here.',
    el:
      '<circle cx="13.5" cy="34" r="6.5"/><circle cx="36" cy="34" r="6.5"/>' +
      '<path d="M13.5,34 L21,22.5 L26.5,22.5 L24,34 Z"/>' +
      '<path d="M33,21 L36,34"/>' +
      '<path d="M21,22.5 L20.2,18 C22.5,13.5 25.5,11 28.8,9.8"/>' +   // seat mast + curved back
      '<circle cx="31.2" cy="8.2" r="2.6"/>' +
      '<path d="M28.8,10.6 C31,13 32.6,16.4 33.4,19.6"/>' +           // arm with a bend
      '<path class="fd" d="M31.8,19.2 L35.2,18.4"/>' +                // bar tick
      '<path d="M21.8,20.5 L24.3,27 L23.6,31.5"/>' +                  // leg to pedal
      `<path d="M2,43.5 L46,43.5"${A}/>`                              // accent ground
  }
];

const DISC_DH = [
  {
    id: 'DH-38', name: 'Steep descent', slot: 'disc_dh',
    vs: 'DH-36 with the smoothed rider (hips further back, curved spine) and the slope as the accent.',
    why: 'Hips back, arms long, pointed down something serious.',
    el:
      '<g transform="rotate(24 24 24)">' +
      '<circle cx="12.5" cy="31" r="6.3"/><circle cx="34.5" cy="31" r="6.3"/>' +
      '<path d="M12.5,31 L19.5,20 L25,20 L23,31 Z"/>' +
      '<path d="M31.5,17.5 L34.5,31"/>' +
      '<path d="M19.5,20 L16.2,14.2 C18.4,10.4 20.8,8.6 23.2,7.9"/>' + // hips back, curved spine
      '<circle cx="25.7" cy="6.4" r="2.5"/>' +
      '<path d="M23.2,8.6 C26.4,10.4 29.6,13.6 31.3,16.7"/>' +
      '<path d="M17.8,16 L22.3,24 L21.8,28.5"/>' +
      `<path d="M2,38.3 L46,38.3"${A}/>` +                            // accent slope
      '</g>'
  }
];

const DISC_ENDURO = [
  {
    id: 'DE-39', name: 'Big mountain', slot: 'disc_enduro',
    vs: 'DE-37 with the smoothed attack rider and the rolling descent as the accent; the peak stays fine detail.',
    why: 'Attack position over rolling steeps with a peak on the horizon.',
    el:
      '<path class="fd" d="M3,12.5 L10,4.5 L17,12.5"/>' +
      '<g transform="rotate(12 24 26)">' +
      '<circle cx="13" cy="33" r="6.3"/><circle cx="35" cy="33" r="6.3"/>' +
      '<path d="M13,33 L20,22 L25.5,22 L23.5,33 Z"/>' +
      '<path d="M32,19.5 L35,33"/>' +
      '<path d="M20,22 L18.5,16.5 C21,12.6 23.6,10.7 26,10.1"/>' +
      '<circle cx="28.4" cy="8.1" r="2.5"/>' +
      '<path d="M26,10.8 C28.4,12.6 30.8,15.6 31.8,18.4"/>' +
      '<path d="M20.5,19 L23.5,26 L23,30.5"/>' +
      '</g>' +
      `<path d="M2,40 Q12,36.5 22,40.5 T44,45"${A}/>`                 // accent rolling descent
  }
];

const DISC_TRAIL = [
  {
    id: 'DT-38', name: 'Flow line', slot: 'disc_trail',
    vs: 'DT-36 with the upright rider smoothed and the flow wave as the accent.',
    why: 'Upright and easy over a rolling wave of singletrack.',
    el:
      '<circle cx="13.5" cy="32" r="6.3"/><circle cx="35.5" cy="32" r="6.3"/>' +
      '<path d="M13.5,32 L20.5,21 L26,21 L24,32 Z"/>' +
      '<path d="M32.5,18.5 L35.5,32"/>' +
      '<path d="M20.5,21 L20,16 C22.4,11.8 25,9.9 27.4,9.4"/>' +
      '<circle cx="29.8" cy="7.4" r="2.5"/>' +
      '<path d="M27.4,10.1 C29.4,12.2 31.4,15.2 32.3,17.6"/>' +
      '<path d="M21.5,19 L24,25.5 L23.5,29.5"/>' +
      `<path d="M2,42 Q12,37.5 22,42 T42,42.5 L46,42"${A}/>`          // accent flow wave
  }
];

const DISC_XC = [
  {
    id: 'DX-38', name: 'Racer tuck', slot: 'disc_xc',
    vs: 'DX-36 with the flat-back tuck smoothed and the speed lines as the accent.',
    why: 'Flat back, low over the bars, elbows in — pure speed.',
    el:
      '<circle cx="13.5" cy="33" r="6.3"/><circle cx="35.5" cy="33" r="6.3"/>' +
      '<path d="M13.5,33 L20.5,22 L26,22 L24,33 Z"/>' +
      '<path d="M32.5,19.5 L35.5,33"/>' +
      '<path d="M20.5,22 C21,17.6 25.4,14 30.6,12.9"/>' +             // flat low back
      '<circle cx="33.3" cy="11.9" r="2.4"/>' +
      '<path d="M30.2,13.8 L33,19"/>' +
      '<path d="M22.5,19.5 L25,26 L24,30.5"/>' +
      `<path d="M3,15 L10,15"${A}/><path d="M2,20 L8,20"${A}/><path d="M4,25 L9,25"${A}/>`  // accent speed lines
  }
];

// ---- anti-set disciplines: filled rider silhouettes -------------------------
const antiRider = (tilt, terrain) =>
  `<g transform="rotate(${tilt} 24 25)">` +
  ring(13, 32.5, 6.6, 3.2) + ring(35, 32.5, 6.6, 3.2) +
  '<path d="M13,32.5 L20.2,21.3 L26.2,21.3 L23.8,32.5 Z M17.6,29.7 L21.4,23.9 L23.4,23.9 L22.2,29.7 Z" fill="currentColor" fill-rule="evenodd" stroke="none"/>' +
  '<path d="M31.6,18.8 L35.8,32.2 L33.2,32.9 L29.6,19.4 Z" fill="currentColor" stroke="none"/>' +
  // torso + head as one blob
  '<path d="M19.2,21.5 L18,15.9 C20.4,11.5 24,9.2 27.2,8.7 L28.8,11.5 C25.6,12.4 22.8,14.8 21.6,18 L22.4,21.5 Z" fill="currentColor" stroke="none"/>' +
  fCirc(30, 7.6, 3) +
  '<path d="M27.6,10.4 L32.4,17.8 L30.2,19.3 L25.6,12.2 Z" fill="currentColor" stroke="none"/>' +
  '</g>' +
  (terrain ? `<path d="${terrain}" fill="${ACCENT}" stroke="none"/>` : '');

const DISC_ANTI = [
  { id: 'DA-39', name: 'ANTI: rider mass', slot: 'disc_all', anti: true,
    vs: 'Anti-set: the neutral rider as filled masses; accent ground bar.',
    why: 'Direction check.', el: antiRider(0, 'M2,42.4 h44 v2.4 h-44 Z') },
  { id: 'DH-39', name: 'ANTI: descent mass', slot: 'disc_dh', anti: true,
    vs: 'Anti-set: the DH rider as filled masses, tilted; accent slope bar.',
    why: 'Direction check.', el: antiRider(24, 'M2,47.4 L43,29.2 L44,31.4 L3,49.6 Z') },
  { id: 'DE-40', name: 'ANTI: enduro mass', slot: 'disc_enduro', anti: true,
    vs: 'Anti-set: the attack rider as filled masses; accent rolling bar.',
    why: 'Direction check.', el: antiRider(12, 'M2,41.2 Q13,37.6 24,41.6 T46,44.4 L46,46.6 Q35,44.8 24,43.8 Q13,42.8 2,43.6 Z') },
  { id: 'DT-39', name: 'ANTI: trail mass', slot: 'disc_trail', anti: true,
    vs: 'Anti-set: the trail rider as filled masses; accent wave bar.',
    why: 'Direction check.', el: antiRider(0, 'M2,42.6 Q12,38.6 22,42.6 T44,42.8 L44,45 Q34,43 24,44.6 Q12,46.4 2,44.8 Z') },
  { id: 'DX-39', name: 'ANTI: XC mass', slot: 'disc_xc', anti: true,
    vs: 'Anti-set: the XC rider as filled masses; accent speed bars.',
    why: 'Direction check.', el: antiRider(0,
      'M3,14 h7 v2.2 h-7 Z M2,19.4 h6 v2.2 h-6 Z M4,24.8 h5 v2.2 h-5 Z') }
];

export const SLOTS = [
  { key: 'frame',      label: 'Frame',          prefix: 'FR', icons: FRAME },
  { key: 'fork',       label: 'Fork',           prefix: 'FK', icons: FORK },
  { key: 'shock',      label: 'Rear Shock',     prefix: 'SH', icons: SHOCK },
  { key: 'wheels',     label: 'Wheels',         prefix: 'WH', icons: WHEELS },
  { key: 'tire',       label: 'Tires',          prefix: 'TI', icons: TIRE },
  { key: 'drivetrain', label: 'Drivetrain',     prefix: 'DR', icons: DRIVETRAIN },
  { key: 'brakes',     label: 'Brakes',         prefix: 'BR', icons: BRAKES },
  { key: 'bb',         label: 'Bottom Bracket', prefix: 'BB', icons: BB },
  { key: 'headset',    label: 'Headset',        prefix: 'HS', icons: HEADSET },
  { key: 'dropper',    label: 'Dropper Post',   prefix: 'DP', icons: DROPPER },
  { key: 'cockpit',    label: 'Cockpit',        prefix: 'CP', icons: COCKPIT },
  { key: 'saddle',     label: 'Saddle',         prefix: 'SA', icons: SADDLE },
  { key: 'pedals',     label: 'Pedals',         prefix: 'PD', icons: PEDALS },
  { key: 'all_parts',  label: 'All parts',      prefix: 'AP', icons: ALLPARTS },
];

export const DISC_SLOTS = [
  { key: 'disc_all',    label: 'All disciplines', prefix: 'DA', icons: [...DISC_ALL,    DISC_ANTI[0]] },
  { key: 'disc_dh',     label: 'DH',              prefix: 'DH', icons: [...DISC_DH,     DISC_ANTI[1]] },
  { key: 'disc_enduro', label: 'Enduro',          prefix: 'DE', icons: [...DISC_ENDURO, DISC_ANTI[2]] },
  { key: 'disc_trail',  label: 'Trail',           prefix: 'DT', icons: [...DISC_TRAIL,  DISC_ANTI[3]] },
  { key: 'disc_xc',     label: 'XC',              prefix: 'DX', icons: [...DISC_XC,     DISC_ANTI[4]] },
];

// Curated full-rail sets
export const SETS = [
  {
    id: 'R1', name: 'Refined marquee',
    desc: 'The most anatomically complete refined drawing per slot — the catalog-photo rail, now with one accent each.',
    picks: {
      frame: 'FR-10', fork: 'FK-9', shock: 'SH-10', wheels: 'WH-10', tire: 'TI-10',
      drivetrain: 'DR-10', brakes: 'BR-10', bb: 'BB-9', headset: 'HS-8', dropper: 'DP-8',
      cockpit: 'CP-8', saddle: 'SA-9', pedals: 'PD-8', all_parts: 'AP-9',
      disc_all: 'DA-38', disc_dh: 'DH-38', disc_enduro: 'DE-39', disc_trail: 'DT-38', disc_xc: 'DX-38'
    }
  },
  {
    id: 'R2', name: 'Refined essential',
    desc: 'Every slot’s cleanest 20 px winner from the refined round.',
    picks: {
      frame: 'FR-10', fork: 'FK-10', shock: 'SH-10', wheels: 'WH-11', tire: 'TI-10',
      drivetrain: 'DR-10', brakes: 'BR-10', bb: 'BB-9', headset: 'HS-9', dropper: 'DP-8',
      cockpit: 'CP-9', saddle: 'SA-9', pedals: 'PD-8', all_parts: 'AP-10',
      disc_all: 'DA-38', disc_dh: 'DH-38', disc_enduro: 'DE-39', disc_trail: 'DT-38', disc_xc: 'DX-38'
    }
  },
  {
    id: 'X1', name: 'ANTI-SET — direction check',
    desc: 'The one deliberately different direction: solid duotone silhouettes (filled masses, knocked-out details), NOT line art. A contrast check, not a recommendation.',
    picks: {
      frame: 'FR-13', fork: 'FK-12', shock: 'SH-12', wheels: 'WH-12', tire: 'TI-12',
      drivetrain: 'DR-12', brakes: 'BR-12', bb: 'BB-10', headset: 'HS-10', dropper: 'DP-10',
      cockpit: 'CP-10', saddle: 'SA-11', pedals: 'PD-10', all_parts: 'AP-11',
      disc_all: 'DA-39', disc_dh: 'DH-39', disc_enduro: 'DE-40', disc_trail: 'DT-39', disc_xc: 'DX-39'
    }
  }
];

// Render an icon def to a standalone SVG string.
export function renderSvg(icon, { weight = 2.5, detail = 'full', size = null, label = '' } = {}) {
  let inner = icon.el;
  if (detail === 'reduced') {
    inner = inner.replace(/<(path|circle|rect|ellipse|g)[^>]*class="fd"[^>]*\/>/g, '')
                 .replace(/<(path|circle|rect|ellipse)[^>]*class="fd"[^>]*><\/\1>/g, '');
  }
  const dim = size ? ` width="${size}" height="${size}"` : '';
  const a11y = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"${dim} fill="none" stroke="currentColor" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round"${a11y}>${inner}</svg>`;
}
