// Rail-icon candidates v4 — hand-drawn literal component line-art.
// Douglas's direction after three emoji rounds: "why can't there be an icon of a
// bike frame for frames, a bike fork for forks, etc." — Unicode has no bike-component
// glyphs, so this round drops emoji entirely and draws the ACTUAL parts.
//
// Line language (one cohesive system):
//   • 48×48 viewBox, stroke-only, currentColor, round caps/joins.
//   • One stroke width per rendering (the presentation shows 2.0 / 2.5 / 3.0).
//   • Fine-detail elements carry class="fd" — stripping them yields the same
//     drawing at a reduced detail level that must survive ~20 px rail size.
//   • Tiny fills are allowed ONLY as fill="currentColor" (pivot dots, pins) so
//     all four site themes keep working; most fd-tagged.
//   • Brand-neutral: generic full-sus/hardtail silhouettes, no manufacturer shapes.
//
// Ids continue each slot's established numbering from data.json (v2 components,
// v3 disciplines).

const P = (x) => Math.round(x * 100) / 100;
const pt = (cx, cy, r, deg) => {
  const a = (deg - 90) * Math.PI / 180;
  return [P(cx + r * Math.cos(a)), P(cy + r * Math.sin(a))];
};
// n radial ticks from r1 to r2 around (cx,cy), starting at angle off
const ticks = (cx, cy, r1, r2, n, off = 0, cls = '') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = off + i * 360 / n;
    const [x1, y1] = pt(cx, cy, r1, a), [x2, y2] = pt(cx, cy, r2, a);
    s += `<path${cls ? ` class="${cls}"` : ''} d="M${x1},${y1} L${x2},${y2}"/>`;
  }
  return s;
};
// n filled dots of radius dr on a circle of radius r
const dots = (cx, cy, r, n, dr, off = 0, cls = '') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const [x, y] = pt(cx, cy, r, off + i * 360 / n);
    s += `<circle${cls ? ` class="${cls}"` : ''} cx="${x}" cy="${y}" r="${dr}" fill="currentColor" stroke="none"/>`;
  }
  return s;
};
// tangentially-laced spokes: each spoke leaves the hub offset by `lean` degrees
const lacedSpokes = (cx, cy, rHub, rRim, n, lean, cls = '') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = i * 360 / n;
    const dir = i % 2 ? lean : -lean;                 // alternate cross direction
    const [x1, y1] = pt(cx, cy, rHub, a + dir * 2.2);
    const [x2, y2] = pt(cx, cy, rRim, a);
    s += `<path${cls ? ` class="${cls}"` : ''} d="M${x1},${y1} L${x2},${y2}"/>`;
  }
  return s;
};
const dot = (x, y, r = 1.2, cls = '') =>
  `<circle${cls ? ` class="${cls}"` : ''} cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;

// ---------------------------------------------------------------- FRAME (FR-6…)
const FRAME = [
  {
    id: 'FR-6', name: 'Full-sus, shock visible',
    why: 'The whole enduro frame: front + rear triangle, rocker, and the shock tucked inside the front triangle — the marquee literal read.',
    el:
      // head tube (slack, with a little extension above the top tube), top/seat/down tubes
      '<path d="M35.5,6.5 L41.5,20"/>' +
      '<path d="M12,12 L36.5,8.8"/>' +
      '<path d="M12,12 L18,37.5"/>' +
      '<path d="M41.5,20 L18,37.5"/>' +
      // rear triangle: chainstay low and long, seatstay up to the rocker pivot on the seat tube
      '<path d="M18,37.5 L3.5,32.5"/>' +
      '<path d="M3.5,32.5 L13.7,19"/>' +
      // rocker link driving a steeply-set shock inside the triangle (clear of every tube)
      '<path d="M13.7,19 L19,15.5"/>' +
      '<rect x="14.75" y="18.6" width="13" height="4.8" rx="2.4" transform="rotate(68 21.25 21)"/>' +
      '<circle class="fd" cx="18.7" cy="14.6" r="1.4"/>' +
      '<circle class="fd" cx="24" cy="27.6" r="1.4"/>' +
      '<circle cx="18" cy="37.5" r="3"/>' +                // chainring at the BB — the "it's a bike" anchor
      dot(3.5, 32.5, 1.2, 'fd') + dot(13.7, 19, 1.2, 'fd')
  },
  {
    id: 'FR-7', name: 'Full-sus, compact',
    why: 'Same anatomy tuned for the smallest read: linkage kept, shock as a single strut, zero fine detail.',
    el:
      '<path d="M35,7.5 L41,20.5"/>' +
      '<path d="M12.5,13 L36,9.5"/>' +
      '<path d="M12.5,13 L18.5,37"/>' +
      '<path d="M41,20.5 L18.5,37"/>' +
      '<path d="M18.5,37 L4,32"/>' +
      '<path d="M4,32 L14.2,19.5"/>' +
      // shock strut dropped steeply from the rocker point into the triangle
      '<path d="M14.2,19.5 L21.5,28.5"/>' +
      dot(14.2, 19.5, 1.5) + dot(21.5, 28.5, 1.5) +
      '<circle cx="18.5" cy="37" r="3"/>'                  // chainring at the BB
  },
  {
    id: 'FR-8', name: 'Hardtail diamond',
    why: 'The classic diamond frame — front triangle + fixed rear triangle. Honest for the hardtail push coming to LIVE.',
    el:
      '<path d="M35.5,7.5 L41,20"/>' +          // head tube
      '<path d="M12.5,13 L36.5,9.5"/>' +        // top tube
      '<path d="M12.5,13 L18.5,36.5"/>' +       // seat tube
      '<path d="M41,20 L18.5,36.5"/>' +         // down tube
      '<path d="M18.5,36.5 L3.5,31.5"/>' +      // chainstay
      '<path d="M13,15 L3.5,31.5"/>' +          // seatstay
      '<path class="fd" d="M12.5,13 L11.5,7.5"/>' + // seatpost stub
      '<circle cx="18.5" cy="36.5" r="3"/>' +       // chainring at the BB
      dot(3.5, 31.5, 1.2, 'fd')
  },
  {
    id: 'FR-9', name: 'Full-sus, sculpted tubes',
    why: 'The modern-carbon character variant: curved down tube, dropped top tube, same honest linkage.',
    el:
      '<path d="M35.5,6.5 L41.5,20"/>' +
      '<path d="M12,13.5 Q25,7.5 36.5,8.8"/>' +      // dropped top tube
      '<path d="M12,13.5 L18,37.5"/>' +
      '<path d="M41.5,20 Q31,27 18,37.5"/>' +        // curved down tube
      '<path d="M18,37.5 L3.5,33"/>' +
      '<path d="M3.5,33 Q9.5,26.5 13.8,19.5"/>' +    // curved seatstay
      '<path d="M13.8,19.5 L19,16"/>' +
      '<rect x="15" y="18.95" width="12.5" height="4.6" rx="2.3" transform="rotate(66 21.25 21.25)"/>' +
      '<circle cx="18" cy="37.5" r="3"/>' +                // chainring at the BB
      dot(13.8, 19.5, 1.2, 'fd')
  }
];

// ----------------------------------------------------------------- FORK (FK-5…)
const FORK = [
  {
    id: 'FK-5', name: 'Front view, full anatomy',
    why: 'Crown, stanchions, lowers with the arch, dropouts and axle — everything a suspension fork is.',
    el:
      '<path d="M24,3.5 L24,10"/>' +                        // steerer
      '<path d="M13,16 Q24,9.5 35,16"/>' +                  // arched crown
      '<path d="M17,14 L17,24"/><path d="M31,14 L31,24"/>' + // stanchions
      '<rect x="14.2" y="24" width="5.6" height="17" rx="2.6"/>' +  // lowers
      '<rect x="28.2" y="24" width="5.6" height="17" rx="2.6"/>' +
      '<path d="M19.8,28.5 Q24,25 28.2,28.5"/>' +           // arch
      '<path class="fd" d="M13.5,42.5 L34.5,42.5"/>'        // thru-axle across the dropouts
  },
  {
    id: 'FK-6', name: 'Front view, essential',
    why: 'The same fork with only the load-bearing lines — crown, legs, arch, axle. Tuned to win at 20 px.',
    el:
      '<path d="M24,4 L24,12"/>' +
      '<path d="M14,13 L34,13"/>' +
      '<path d="M17,13 L17,40"/><path d="M31,13 L31,40"/>' +
      '<path d="M17,27 Q24,23.5 31,27"/>' +
      dot(17, 41.5, 1.6) + dot(31, 41.5, 1.6)
  },
  {
    id: 'FK-7', name: 'Front view, machined',
    why: 'Chunkier take: boxed crown, tapered double-line steerer, wide lowers — industrial confidence.',
    el:
      '<path d="M22,4 L22,11.5"/><path d="M26,4 L26,11.5"/>' +   // tapered steerer
      '<rect x="13" y="11.5" width="22" height="5" rx="2"/>' +   // crown
      '<path d="M16.5,16.5 L16.5,23.5"/><path d="M31.5,16.5 L31.5,23.5"/>' +
      '<rect x="13.6" y="23.5" width="5.8" height="18" rx="2.8"/>' +
      '<rect x="28.6" y="23.5" width="5.8" height="18" rx="2.8"/>' +
      '<path d="M19.4,28 Q24,24.8 28.6,28"/>' +
      '<path class="fd" d="M24,4 L24,7" stroke-dasharray="1.6 2.2"/>'
  },
  {
    id: 'FK-8', name: 'Side view, raked',
    why: 'A mechanic’s side view: crown block, one leg raking forward to the dropout eye — the experimental fourth take.',
    el:
      '<path d="M30.5,3.5 L30.5,10.5"/>' +               // steerer
      '<path d="M25,11.5 L35,13 L34,17.5 L24,16 Z"/>' +  // crown block (side)
      '<path d="M28,17.5 L26.5,24.5"/>' +                // stanchion
      '<rect x="21.3" y="24.5" width="6" height="14.5" rx="2.9" transform="rotate(9 24.3 31.7)"/>' + // raked lower
      '<circle cx="22.6" cy="41" r="2.1"/>' +            // dropout eye
      '<path class="fd" d="M29.5,26 Q32.5,27.5 32.5,30.5"/>'  // arch hint behind
  }
];

// ---------------------------------------------------------------- SHOCK (SH-6…)
const SHOCK = [
  {
    id: 'SH-6', name: 'Air shock + piggyback',
    why: 'Body, damper shaft, both eyelets and the piggyback reservoir — the enduro shock, upright.',
    el:
      '<circle cx="21.5" cy="6.5" r="2.8"/>' +
      '<rect x="16.5" y="10.5" width="10" height="15" rx="3.4"/>' +
      '<rect x="29.5" y="11.5" width="6.5" height="10.5" rx="3.2"/>' +
      '<path d="M26.5,14.5 L29.5,14.5"/>' +
      '<path d="M21.5,25.5 L21.5,36"/>' +
      '<circle cx="21.5" cy="39.5" r="2.8"/>' +
      '<path class="fd" d="M16.5,13 L13.5,11"/>'          // air valve
  },
  {
    id: 'SH-7', name: 'Coil shock',
    why: 'The spring wrapped around the shaft between two eyelets — unmistakably a coil.',
    el:
      '<circle cx="24" cy="5.5" r="2.8"/>' +
      '<path d="M24,8.5 L24,40"/>' +
      '<path class="fd" d="M18,11.5 L30,11.5"/>' +        // preload collar
      '<path d="M17.5,14 L30.5,17 L17.5,20 L30.5,23 L17.5,26 L30.5,29 L17.5,32 L30.5,35"/>' +
      '<circle cx="24" cy="42.5" r="2.8"/>'
  },
  {
    id: 'SH-8', name: 'Air shock, laid flat',
    why: 'The shock mounted horizontally with the reservoir slung underneath — as it sits in a lot of frames.',
    el:
      '<circle cx="6.5" cy="22" r="2.8"/>' +
      '<rect x="10.5" y="17" width="15" height="10" rx="3.4"/>' +
      '<rect x="12" y="30" width="10.5" height="6.5" rx="3.1"/>' +
      '<path d="M15,27 L15,30"/>' +
      '<path d="M25.5,22 L38.5,22"/>' +
      '<circle cx="41.5" cy="22" r="2.8"/>' +
      '<path class="fd" d="M13,17 L11,14"/>'              // air valve
  },
  {
    id: 'SH-9', name: 'Shock, essential',
    why: 'Eyelet – can – shaft – eyelet. The fewest strokes that are still a rear shock; the 20 px banker.',
    el:
      '<circle cx="24" cy="7" r="3"/>' +
      '<rect x="18.5" y="11.5" width="11" height="16" rx="3.8"/>' +
      '<path d="M24,27.5 L24,37"/>' +
      '<circle cx="24" cy="40" r="3"/>'
  }
];

// --------------------------------------------------------------- WHEELS (WH-6…)
const WHEELS = [
  {
    id: 'WH-6', name: 'Laced wheel',
    why: 'Double-wall rim, hub, and tangentially-laced spokes — a built wheel, not a generic circle.',
    el:
      '<circle cx="24" cy="24" r="16.5"/>' +
      '<circle class="fd" cx="24" cy="24" r="13.8"/>' +
      lacedSpokes(24, 24, 3.4, 13.8, 8, 16) +
      '<circle cx="24" cy="24" r="3.4"/>' +
      '<path class="fd" d="M24,40.5 L24,44"/>'            // valve stem
  },
  {
    id: 'WH-7', name: 'Wheel, essential',
    why: 'Rim, six spokes, hub. The cleanest possible wheel for the rail.',
    el:
      '<circle cx="24" cy="24" r="16.5"/>' +
      ticks(24, 24, 3, 16.5, 6, 0) +
      '<circle cx="24" cy="24" r="3"/>'
  },
  {
    id: 'WH-8', name: 'Wheelset pair',
    why: 'Front + rear together, side by side — the slot sells wheelSETS, and the pair says so.',
    el:
      '<circle cx="12.3" cy="24" r="10.4"/>' +
      '<circle cx="35.7" cy="24" r="10.4"/>' +
      ticks(12.3, 24, 2.2, 10.4, 5, 0, 'fd') +
      ticks(35.7, 24, 2.2, 10.4, 5, 36, 'fd') +
      '<circle cx="12.3" cy="24" r="2.2"/>' +
      '<circle cx="35.7" cy="24" r="2.2"/>'
  },
  {
    id: 'WH-9', name: 'Wheel, race build',
    why: 'Deep rim bed and a crossed 12-spoke lacing — the detailed showcase variant.',
    el:
      '<circle cx="24" cy="24" r="16.5"/>' +
      '<circle cx="24" cy="24" r="13.2"/>' +
      lacedSpokes(24, 24, 3.6, 13.2, 12, 20, 'fd') +
      '<circle cx="24" cy="24" r="3.6"/>' +
      '<path class="fd" d="M19.2,24 L28.8,24"/>'          // axle through hub
  }
];

// ----------------------------------------------------------------- TIRE (TI-6…)
const knobRing = (cx, cy, r1, r2, n, off = 0, cls = '') => ticks(cx, cy, r1, r2, n, off, cls);
const TIRE = [
  {
    id: 'TI-6', name: 'Knobby tire, face on',
    why: 'Casing, bead and a full ring of knobs sticking out of the tread — reads “aggressive MTB tire” instantly.',
    el:
      '<circle cx="24" cy="24" r="15"/>' +
      '<circle cx="24" cy="24" r="9.5"/>' +
      knobRing(24, 24, 15.4, 18.6, 12, 15) +
      dots(24, 24, 12.2, 8, 1, 0, 'fd')                   // side knobs
  },
  {
    id: 'TI-7', name: 'Tread crescent',
    why: 'A section of tread up close: the casing band with alternating knob blocks — the pattern you actually buy a tire for.',
    el:
      '<path d="M4,42 A38,38 0 0 1 42,4"/>' +
      '<path d="M14.8,42 A27.2,27.2 0 0 1 42,14.8"/>' +
      '<path d="M4,42 L14.8,42"/><path d="M42,4 L42,14.8"/>' +
      // knob blocks between the arcs — two alternating rows
      (() => {
        // band runs 270° (left edge) → 360° (top edge) around center (42,42)
        let s = '';
        const C = [42, 42];
        for (let i = 0; i < 4; i++) {                     // outer knob row
          const a = 277 + i * 22;
          const [x, y] = pt(C[0], C[1], 34.4, a);
          s += `<rect x="${P(x - 1.9)}" y="${P(y - 1.9)}" width="3.8" height="3.8" rx="0.9" transform="rotate(${P(a)} ${x} ${y})"/>`;
        }
        for (let i = 0; i < 3; i++) {                     // inner row, offset — fd
          const a = 288 + i * 22;
          const [x, y] = pt(C[0], C[1], 29.6, a);
          s += `<rect class="fd" x="${P(x - 1.6)}" y="${P(y - 1.6)}" width="3.2" height="3.2" rx="0.8" transform="rotate(${P(a)} ${x} ${y})"/>`;
        }
        return s;
      })()
  },
  {
    id: 'TI-8', name: 'Tire, block tread ring',
    why: 'Face-on tire with the tread drawn as a bold dashed lug ring — the calm middle ground.',
    el:
      '<circle cx="24" cy="24" r="15.5"/>' +
      '<circle cx="24" cy="24" r="12.4" stroke-dasharray="3.4 3.1"/>' +
      '<circle cx="24" cy="24" r="9"/>'
  },
  {
    id: 'TI-9', name: 'Tread crescent, essential',
    why: 'The crescent with simple siping ticks across the band — the reduced twin of TI-7.',
    el:
      '<path d="M4,42 A38,38 0 0 1 42,4"/>' +
      '<path d="M14.8,42 A27.2,27.2 0 0 1 42,14.8"/>' +
      '<path d="M4,42 L14.8,42"/><path d="M42,4 L42,14.8"/>' +
      (() => {
        let s = '';
        for (let i = 0; i < 5; i++) {
          const a = 274 + i * 17;
          const [x1, y1] = pt(42, 42, 27.2, a), [x2, y2] = pt(42, 42, 38, a);
          s += `<path d="M${x1},${y1} L${x2},${y2}"/>`;
        }
        return s;
      })()
  }
];

// ------------------------------------------------------------ DRIVETRAIN (DR-6…)
const DRIVETRAIN = [
  {
    id: 'DR-6', name: 'Cassette + derailleur',
    why: 'Toothed cog cluster with the mech and its pulley cage hanging under it — the drivetrain photo every rider knows.',
    el:
      '<circle cx="16" cy="14" r="10.5"/>' +
      ticks(16, 14, 10.5, 12.3, 12, 0, 'fd') +            // cassette teeth
      '<circle cx="16" cy="14" r="6.5"/>' +
      '<circle class="fd" cx="16" cy="14" r="3"/>' +
      '<path d="M21,23.5 L25.5,26.5"/>' +                 // b-link
      '<circle cx="27.5" cy="29.5" r="2.5"/>' +           // upper pulley
      '<circle cx="34.5" cy="39.5" r="2.5"/>' +           // lower pulley
      '<path d="M24.4,32.1 L31.4,42.1"/>' +               // cage inner plate
      '<path d="M30.6,26.9 L37.6,36.9"/>' +               // cage outer plate
      dot(27.5, 29.5, 0.9, 'fd') + dot(34.5, 39.5, 0.9, 'fd')
  },
  {
    id: 'DR-7', name: 'Crank + chainring',
    why: 'Chainring teeth with the crank arm reaching for the pedal — the other half of the drivetrain.',
    el:
      '<circle cx="19" cy="28" r="12"/>' +
      knobRing(19, 28, 12.4, 14.6, 16, 0, 'fd') +
      '<circle class="fd" cx="19" cy="28" r="5"/>' +
      '<rect x="16" y="17" width="24" height="5.2" rx="2.6" transform="rotate(-41 28 19.6)"/>' +
      dot(19, 28, 1.5) + dot(37.5, 11.5, 1.5, 'fd')
  },
  {
    id: 'DR-8', name: 'Chain links',
    why: 'Three links of chain, plates and pins — macro-photography of the part itself.',
    el: (() => {
      // chain axis at -30°, pin spacing 11.4, from (10.5,31.5) up-right
      const ax = Math.cos(-30 * Math.PI / 180), ay = Math.sin(-30 * Math.PI / 180);
      const pts = [];
      for (let i = 0; i < 4; i++) pts.push([P(10.5 + i * 11.4 * ax), P(31.5 + i * 11.4 * ay)]);
      let s = '';
      // outer plates (links 0-1 and 2-3), inner plate (1-2, narrower)
      const plate = (a, b, h, cls) => {
        const mx = P((a[0] + b[0]) / 2), my = P((a[1] + b[1]) / 2);
        const w = 11.4 + h * 0.95;
        return `<rect${cls ? ` class="${cls}"` : ''} x="${P(mx - w / 2)}" y="${P(my - h / 2)}" width="${P(w)}" height="${h}" rx="${h / 2}" transform="rotate(-30 ${mx} ${my})"/>`;
      };
      s += plate(pts[0], pts[1], 9.6);
      s += plate(pts[1], pts[2], 6.6);
      s += plate(pts[2], pts[3], 9.6);
      for (const [x, y] of pts) s += `<circle class="fd" cx="${x}" cy="${y}" r="1.7"/>`;
      return s;
    })()
  },
  {
    id: 'DR-9', name: 'Cassette stack',
    why: 'The cassette seen from behind — a staircase of cogs from the big ring down to the lockring.',
    el: (() => {
      let s = '';
      const widths = [32, 27.6, 23.4, 19.4, 15.6, 12, 8.6];
      widths.forEach((w, i) => {
        const y = P(38 - i * 4.3);
        s += `<path${i % 2 ? ' class="fd"' : ''} d="M${P(24 - w / 2)},${y} L${P(24 + w / 2)},${y}"/>`;
      });
      s += '<path class="fd" d="M21.5,7.5 L26.5,7.5"/>';   // lockring
      return s;
    })()
  }
];

// ---------------------------------------------------------------- BRAKES (BR-6…)
const BRAKES = [
  {
    id: 'BR-6', name: 'Rotor + caliper',
    why: 'The disc with its caliper straddling the rim — braking drawn as the hardware, not a stop sign.',
    el:
      '<circle cx="21" cy="27" r="15"/>' +
      '<circle cx="21" cy="27" r="5"/>' +
      ticks(21, 27, 5, 10, 5, 12, 'fd') +                  // spider arms
      '<circle class="fd" cx="21" cy="27" r="10.5" stroke-dasharray="3 4"/>' +  // vent slots
      '<rect x="24.1" y="11.4" width="15" height="10" rx="3" transform="rotate(45 31.6 16.4)"/>' +
      dot(28.9, 13.7, 1.1, 'fd') + dot(34.3, 19.1, 1.1, 'fd')
  },
  {
    id: 'BR-7', name: 'Brake lever',
    why: 'Master cylinder clamped to the bar, hose, and the blade your finger lives on — the cockpit half of the brake.',
    el:
      '<path d="M37,20 L45,20"/>' +                        // the handlebar it clamps to
      '<circle cx="33" cy="20" r="4"/>' +                  // bar clamp
      dot(33, 20, 1.3, 'fd') +
      '<rect x="14.5" y="16.5" width="14.5" height="7" rx="3"/>' +   // master cylinder
      '<path d="M14.5,22 Q7,24.5 4,31"/>' +                // blade sweep
      '<path class="fd" d="M4,31 L3.5,33"/>' +             // blade tip flick
      '<path class="fd" d="M14.5,18 Q8,16.5 6.5,9.5"/>' +  // hose
      dot(15.5, 21.5, 1.1, 'fd')                           // pivot
  },
  {
    id: 'BR-8', name: 'Rotor, detailed',
    why: 'The rotor alone: curved spider arms, vent-slot ring, splined center — jewelry for the brakes slot.',
    el: (() => {
      let s = '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="4.5"/>';
      for (let i = 0; i < 5; i++) {                        // curved spider arms
        const a = i * 72 + 10;
        const [x1, y1] = pt(24, 24, 4.5, a);
        const [xc, yc] = pt(24, 24, 8, a + 22);
        const [x2, y2] = pt(24, 24, 11.5, a + 38);
        s += `<path d="M${x1},${y1} Q${xc},${yc} ${x2},${y2}"/>`;
      }
      s += '<circle class="fd" cx="24" cy="24" r="13.6" stroke-dasharray="4 3.4"/>';
      return s;
    })()
  },
  {
    id: 'BR-9', name: 'Rotor + caliper, essential',
    why: 'Disc, hub, caliper — nothing else. Built to stay crisp at 20 px.',
    el:
      '<circle cx="22" cy="26" r="14.5"/>' +
      '<circle cx="22" cy="26" r="4.5"/>' +
      '<rect x="25.5" y="10.9" width="14" height="9.6" rx="3" transform="rotate(45 32.5 15.7)"/>'
  }
];

// -------------------------------------------------------------------- BB (BB-5…)
const BB = [
  {
    id: 'BB-5', name: 'Cartridge, side view',
    why: 'Shell tube, cups at both ends, spindle poking out — the whole bottom bracket as it sits in the box.',
    el:
      '<rect x="13.5" y="19.5" width="21" height="9" rx="2"/>' +
      '<rect x="8" y="17" width="5.5" height="14" rx="2"/>' +
      '<rect x="34.5" y="17" width="5.5" height="14" rx="2"/>' +
      '<path d="M3.5,24 L8,24"/><path d="M40,24 L44.5,24"/>' +
      '<path class="fd" d="M9.5,15 L9.5,17"/><path class="fd" d="M12,15 L12,17"/>' +
      '<path class="fd" d="M36,15 L36,17"/><path class="fd" d="M38.5,15 L38.5,17"/>'
  },
  {
    id: 'BB-6', name: 'Cup face-on, tool notches',
    why: 'The bearing cup you actually see: notched ring for the BB tool, bearing, spindle bore.',
    el:
      '<circle cx="24" cy="24" r="14.5"/>' +
      ticks(24, 24, 13, 16, 8, 22.5) +
      '<circle cx="24" cy="24" r="8"/>' +
      '<circle cx="24" cy="24" r="3.8"/>' +
      dots(24, 24, 5.9, 6, 0.9, 0, 'fd')                   // bearing balls
  },
  {
    id: 'BB-7', name: 'Threaded shell, exploded',
    why: 'Both cups floating off a threaded shell with the spindle line through — the install diagram.',
    el:
      '<rect x="16" y="19" width="16" height="10" rx="1.5"/>' +
      '<path class="fd" d="M19,19 L17.5,29"/><path class="fd" d="M23.5,19 L22,29"/>' +
      '<path class="fd" d="M28,19 L26.5,29"/>' +
      '<rect x="5.5" y="17" width="6" height="14" rx="2"/>' +
      '<rect x="36.5" y="17" width="6" height="14" rx="2"/>' +
      '<path class="fd" d="M2.5,24 L46,24" stroke-dasharray="2.6 3"/>'
  }
];

// -------------------------------------------------------------- HEADSET (HS-5…)
const HEADSET = [
  {
    id: 'HS-5', name: 'Exploded stack',
    why: 'Top cap, spacer, upper cup, lower cup, crown race — the catalog photo of every headset, stacked in order.',
    el:
      '<path d="M17.5,6 L30.5,6 L28.5,10 L19.5,10 Z"/>' +          // top cap
      '<rect x="18.5" y="13.5" width="11" height="3.4" rx="1.3"/>' + // spacer
      '<rect x="14" y="21" width="20" height="4.6" rx="1.8"/>' +   // upper cup
      '<rect x="14" y="29.5" width="20" height="4.6" rx="1.8"/>' + // lower cup
      '<path d="M15.5,42 Q24,37.5 32.5,42"/>' +                    // crown race
      '<path class="fd" d="M19.5,25.6 L21,28 M28.5,25.6 L27,28"/>'  // upper-cup taper hint
  },
  {
    id: 'HS-6', name: 'Bearing ring',
    why: 'The sealed cartridge bearing itself, in perspective — races and balls.',
    el:
      '<ellipse cx="24" cy="17.5" rx="14" ry="5.5"/>' +
      '<ellipse class="fd" cx="24" cy="17.5" rx="8" ry="3.1"/>' +
      '<path d="M10,17.5 L10,26.5"/><path d="M38,17.5 L38,26.5"/>' +
      '<path d="M10,26.5 A14,5.5 0 0 0 38,26.5"/>' +
      dots(24, 29.2, 0, 1, 1.1, 0, 'fd') +
      dot(17, 28.2, 1.1, 'fd') + dot(31, 28.2, 1.1, 'fd')
  },
  {
    id: 'HS-7', name: 'Cups on the steerer',
    why: 'The two bearing assemblies threaded onto the steerer tube they let spin — upper and lower.',
    el:
      '<path d="M24,3.5 L24,44.5"/>' +
      '<ellipse cx="24" cy="13.5" rx="11" ry="4"/>' +
      '<ellipse cx="24" cy="34.5" rx="11" ry="4"/>' +
      '<ellipse class="fd" cx="24" cy="13.5" rx="5.5" ry="2"/>' +
      '<ellipse class="fd" cx="24" cy="34.5" rx="5.5" ry="2"/>'
  }
];

// -------------------------------------------------------------- DROPPER (DP-5…)
const DROPPER = [
  {
    id: 'DP-5', name: 'Dropper + travel arrows',
    why: 'Two-stage telescoping post with the up-down travel drawn beside it — literal part, literal motion.',
    el:
      '<rect x="15.5" y="4" width="8" height="4" rx="1.6"/>' +      // head clamp
      '<rect x="17.25" y="8" width="4.5" height="13"/>' +           // upper tube
      '<rect x="13.5" y="21" width="12" height="4.6" rx="1.6"/>' +  // collar
      '<rect x="15" y="25.6" width="9" height="16.5" rx="1.6"/>' +  // lower tube
      '<path d="M36,14 L36,34"/>' +
      '<path d="M32.5,17.5 L36,14 L39.5,17.5"/>' +
      '<path d="M32.5,30.5 L36,34 L39.5,30.5"/>'
  },
  {
    id: 'DP-6', name: 'Dropper, clean',
    why: 'The post alone — head, stanchion, seal collar, lower with the cable actuator nub.',
    el:
      '<rect x="20" y="3.5" width="8" height="4" rx="1.6"/>' +
      '<rect x="21.75" y="7.5" width="4.5" height="13"/>' +
      '<path class="fd" d="M24,10 L24,18"/>' +                      // stanchion key line
      '<rect x="18" y="20.5" width="12" height="4.6" rx="1.6"/>' +
      '<rect x="19.5" y="25.1" width="9" height="17" rx="1.6"/>' +
      '<path class="fd" d="M19.5,39.5 L15,39.5 L15,43.5"/>'         // actuator
  },
  {
    id: 'DP-7', name: 'Dropper + saddle',
    why: 'The post wearing its saddle — the read nobody can miss.',
    el:
      '<path d="M12,9.5 C17,5.5 28,5 34,8 C36,9 35.5,10.5 33,11 C26,12.5 16,12 12,10.5 Z"/>' +
      '<rect x="20.5" y="13" width="6" height="3.6" rx="1.4"/>' +
      '<rect x="21.75" y="16.6" width="4.5" height="9.4"/>' +
      '<rect x="18" y="26" width="12" height="4.4" rx="1.6"/>' +
      '<rect x="19.5" y="30.4" width="9" height="13" rx="1.6"/>'
  }
];

// -------------------------------------------------------------- COCKPIT (CP-5…)
const COCKPIT = [
  {
    id: 'CP-5', name: 'Riser bar + stem, front',
    why: 'The rise of the bar with the stem clamped at center — the cockpit as the rider faces it.',
    el:
      '<path d="M4,14 C10,14 12.5,19 18,19.5 L30,19.5 C35.5,19 38,14 44,14"/>' +
      '<path class="fd" d="M4,16.8 L10.5,16.8"/><path class="fd" d="M37.5,16.8 L44,16.8"/>' + // grips
      '<rect x="20.5" y="19.5" width="7" height="9" rx="2.2"/>' +
      '<rect class="fd" x="21.75" y="28.5" width="4.5" height="6"/>' +   // steerer stub
      dot(22.6, 23, 1, 'fd') + dot(25.4, 23, 1, 'fd')
  },
  {
    id: 'CP-6', name: 'Bar + stem, top down',
    why: 'Backswept bar, stem reaching forward, steerer clamp — the top-down cockpit shot.',
    el:
      '<path d="M5,15.5 Q24,8.5 43,15.5"/>' +
      dot(5.5, 15.3, 1.4, 'fd') + dot(42.5, 15.3, 1.4, 'fd') +   // bar ends
      '<rect x="20.5" y="12.5" width="7" height="14" rx="2.6"/>' +
      '<path class="fd" d="M20.5,17 L27.5,17"/>' +                // faceplate split
      '<circle cx="24" cy="31.5" r="5"/>' +
      dot(24, 31.5, 1.4, 'fd')
  },
  {
    id: 'CP-7', name: 'Stem side + bar section',
    why: 'The mechanic’s side view: spacer stack, stem body, bar in cross-section.',
    el:
      '<path d="M29.5,8.5 L36,8.5"/>' +
      '<rect x="29.5" y="10" width="6" height="16" rx="1.6"/>' +
      '<path class="fd" d="M29.5,14 L35.5,14"/><path class="fd" d="M29.5,18 L35.5,18"/>' +
      '<path d="M29.5,11.5 L15,15.5 L15,21 L29.5,17.5"/>' +
      '<circle cx="13" cy="18" r="4.6"/>' +
      dot(13, 18, 1.3, 'fd')
  }
];

// --------------------------------------------------------------- SADDLE (SA-6…)
const SADDLE = [
  {
    id: 'SA-6', name: 'Saddle + rails, side',
    why: 'Tall rounded rear, long slim nose, rail loop underneath — the rails are what make it a saddle, not a blob.',
    el:
      '<path d="M5.5,17.5 C10,15.5 14,15.5 18,17 C25,19.5 33,20.5 40,20.5 C43,20.5 44,21.7 42.5,23 C40,25 33,25.8 26,25.5 C17,25.2 7,23.5 5,20.5 C4.3,19.3 4.5,18.2 5.5,17.5 Z"/>' +
      '<path d="M12,25.2 C12,29.5 15,31.5 19,31.5 L27,31.5 C31,31.5 33.5,29.5 33.5,25.7"/>'
  },
  {
    id: 'SA-7', name: 'Saddle, top view',
    why: 'The teardrop from above with the pressure-relief channel.',
    el:
      '<path d="M24,4.5 C28.5,9.5 32.5,17.5 32.5,27 C32.5,36.5 29,43.5 24,43.5 C19,43.5 15.5,36.5 15.5,27 C15.5,17.5 19.5,9.5 24,4.5 Z"/>' +
      '<ellipse class="fd" cx="24" cy="27" rx="2.2" ry="7.5"/>'
  },
  {
    id: 'SA-8', name: 'Saddle, essential',
    why: 'One sweeping profile and two rail stubs — the reduced twin of SA-6.',
    el:
      '<path d="M5,22 C13,15.5 30,15 43,21 C43,23.5 36,25.5 26,25.5 C16,25.5 7,24.5 5,22 Z"/>' +
      '<path d="M14,25.5 L14,30.5"/><path d="M32,25.5 L32,30.5"/>'
  }
];

// --------------------------------------------------------------- PEDALS (PD-5…)
const PEDALS = [
  {
    id: 'PD-5', name: 'Flat pedal, top view',
    why: 'Platform, spindle, traction pins — the flat pedal exactly as you look down at it.',
    el:
      '<rect x="9" y="13" width="30" height="22" rx="4.5"/>' +
      '<path d="M3,24 L9,24"/>' +
      '<path class="fd" d="M9,21.6 L39,21.6"/><path class="fd" d="M9,26.4 L39,26.4"/>' +
      dot(14.5, 17.5, 1.1, 'fd') + dot(24, 17.5, 1.1, 'fd') + dot(33.5, 17.5, 1.1, 'fd') +
      dot(14.5, 30.5, 1.1, 'fd') + dot(24, 30.5, 1.1, 'fd') + dot(33.5, 30.5, 1.1, 'fd')
  },
  {
    id: 'PD-6', name: 'Flat pedal, side view',
    why: 'The thin platform on its spindle with pins standing proud — the profile every shin remembers.',
    el:
      '<rect x="6" y="21.8" width="36" height="6" rx="3" transform="rotate(-4 24 24.8)"/>' +
      '<circle cx="24" cy="24.8" r="2.1"/>' +                         // spindle end
      '<path d="M12,20.1 L12,17"/><path d="M24,19.3 L24,16.2"/>' +    // traction pins
      '<path d="M36,18.4 L36,15.3"/>' +
      '<path class="fd" d="M17.5,19.7 L17.5,17.4"/><path class="fd" d="M30.5,18.9 L30.5,16.6"/>'
  },
  {
    id: 'PD-7', name: 'Clipless pedal, top view',
    why: 'Small body, wire bails front and rear, cleat pocket — the clip-in option.',
    el:
      '<rect x="15" y="12" width="18" height="24" rx="5"/>' +
      '<path d="M3,24 L15,24"/>' +
      '<path d="M18,12 Q24,7.5 30,12"/>' +
      '<path d="M18,36 Q24,40.5 30,36"/>' +
      '<rect class="fd" x="20.5" y="19" width="7" height="10" rx="2.4"/>'
  }
];

// ------------------------------------------------------------ ALL PARTS (AP-6…)
const ALLPARTS = [
  {
    id: 'AP-6', name: 'Parts grid',
    why: 'Four mini components — wheel, frame, fork, cog — one per quadrant: literally “all the parts”.',
    el:
      '<circle cx="13" cy="13" r="7"/>' + ticks(13, 13, 1.8, 7, 6, 0, 'fd') + dot(13, 13, 1.2, 'fd') +
      '<path d="M29,19 L35,8.5 L41,19 Z"/>' +
      '<path d="M9,27.5 Q13,25 17,27.5"/><path d="M9,27.5 L9,40"/><path d="M17,27.5 L17,40"/>' +
      '<circle cx="35" cy="34" r="5.5"/>' + ticks(35, 34, 5.7, 7.6, 8, 0, 'fd') + dot(35, 34, 1.2, 'fd')
  },
  {
    id: 'AP-7', name: 'The whole bike',
    why: 'Every part in its place — the complete build this site exists to check.',
    el:
      '<circle cx="11" cy="33" r="8.5"/>' +
      '<circle cx="37" cy="33" r="8.5"/>' +
      '<path d="M18,16 L33.5,14.5"/>' +                    // top tube
      '<path d="M18,16 L22,33"/>' +                        // seat tube
      '<path d="M33.5,14.5 L22,33"/>' +                    // down tube... (see note)
      '<path d="M22,33 L11,33"/>' +                        // chainstay
      '<path d="M18,16 L11,33"/>' +                        // seatstay
      '<path d="M33.5,14.5 L37,33"/>' +                    // fork
      '<path class="fd" d="M17.5,15.5 L17,12.5 M14.5,12 L20,12"/>' +   // seatpost + saddle
      '<path class="fd" d="M34,14 L33,10.5 M31,11 L36,10"/>' +         // stem + bar
      '<circle class="fd" cx="22" cy="33" r="2.4"/>'
  },
  {
    id: 'AP-8', name: 'Exploded build',
    why: 'The parts floating apart before assembly — a build in progress.',
    el:
      '<circle cx="9.5" cy="37" r="7"/>' + dot(9.5, 37, 1.2, 'fd') +
      '<circle cx="38.5" cy="37" r="7"/>' + dot(38.5, 37, 1.2, 'fd') +
      '<path d="M17,24 L24,12 L31,24 Z"/>' +               // frame triangle floating
      '<path class="fd" d="M6,9 Q10,6.5 14,9"/>' +         // saddle chip
      '<path class="fd" d="M34,9 Q38,6.5 42,9"/>' +        // bar chip
      '<circle class="fd" cx="24" cy="33.5" r="3.4"/>'     // cog between the wheels
  }
];

// ------------------------------------------------------- DISCIPLINES (secondary)
// One line language with the component icons: same stroke, same caps. A rider on a
// minimal bike; the terrain line under the bike carries the discipline.
// Bike module bits are inlined per pose (poses differ enough that sharing hurts).

const DISC_ALL = [
  {
    id: 'DA-36', name: 'Rider, neutral trail', slot: 'disc_all',
    why: 'Neutral ready position on flat ground — every discipline starts here.',
    el:
      '<circle cx="13.5" cy="34" r="6.5"/><circle cx="36" cy="34" r="6.5"/>' +
      '<path d="M13.5,34 L21,22 L26.5,22 L24,34 Z"/>' +          // frame hint
      '<path d="M24,34 L13.5,34"/>' +
      '<path d="M33,20.5 L36,34"/>' +                            // fork
      '<path d="M21,22 L20,17.5 L27,10.5"/>' +                   // seat mast + rider back
      '<circle cx="29.5" cy="8" r="2.6"/>' +                     // head
      '<path d="M27,11 L33,19.5"/>' +                            // arm to bar
      '<path class="fd" d="M31.5,19 L34.5,18"/>' +               // bar tick
      '<path d="M22,20 L24.5,27 L23.5,31.5"/>' +                 // leg to pedal
      '<path class="fd" d="M2,43.5 L46,43.5"/>'
  },
  {
    id: 'DA-37', name: 'Rider, no terrain', slot: 'disc_all',
    why: 'The same neutral rider with no ground line — quietest all-rounder.',
    el:
      '<circle cx="13.5" cy="35" r="6.5"/><circle cx="36" cy="35" r="6.5"/>' +
      '<path d="M13.5,35 L21,23 L26.5,23 L24,35 Z"/>' +
      '<path d="M33,21.5 L36,35"/>' +
      '<path d="M21,23 L20,18.5 L27,11.5"/>' +
      '<circle cx="29.5" cy="9" r="2.6"/>' +
      '<path d="M27,12 L33,20.5"/>' +
      '<path d="M22,21 L24.5,28 L23.5,32.5"/>'
  }
];

const DISC_DH = [
  {
    id: 'DH-36', name: 'Steep descent', slot: 'disc_dh',
    why: 'Hips back, arms long, front wheel below the rear — pointed down something serious.',
    el:
      '<g transform="rotate(24 24 24)">' +
      '<circle cx="12.5" cy="31" r="6.3"/><circle cx="34.5" cy="31" r="6.3"/>' +
      '<path d="M12.5,31 L19.5,20 L25,20 L23,31 Z"/>' +
      '<path d="M31.5,17.5 L34.5,31"/>' +
      '<path d="M19.5,20 L16.5,13.5 L23,8"/>' +                  // rider pushed BACK
      '<circle cx="25.5" cy="6" r="2.5"/>' +
      '<path d="M23,8.5 L31.5,16.5"/>' +
      '<path d="M18,16 L22.5,24 L22,28.5"/>' +
      '<path class="fd" d="M2,38.3 L46,38.3"/>' +                // slope under the wheels (rotates with the bike)
      '</g>'
  },
  {
    id: 'DH-37', name: 'Descent, no terrain', slot: 'disc_dh',
    why: 'The tilted DH rider alone — the slope is in the bike.',
    el:
      '<g transform="rotate(24 24 25)">' +
      '<circle cx="12.5" cy="32" r="6.3"/><circle cx="34.5" cy="32" r="6.3"/>' +
      '<path d="M12.5,32 L19.5,21 L25,21 L23,32 Z"/>' +
      '<path d="M31.5,18.5 L34.5,32"/>' +
      '<path d="M19.5,21 L16.5,14.5 L23,9"/>' +
      '<circle cx="25.5" cy="7" r="2.5"/>' +
      '<path d="M23,9.5 L31.5,17.5"/>' +
      '<path d="M18,17 L22.5,25 L22,29.5"/>' +
      '</g>'
  }
];

const DISC_ENDURO = [
  {
    id: 'DE-37', name: 'Big mountain', slot: 'disc_enduro',
    why: 'Attack position over rolling steeps with a peak on the horizon — up it under your own power, down it flat out.',
    el:
      '<path class="fd" d="M3,12.5 L10,4.5 L17,12.5"/>' +        // the peak behind, clear of the rider
      '<g transform="rotate(12 24 26)">' +
      '<circle cx="13" cy="33" r="6.3"/><circle cx="35" cy="33" r="6.3"/>' +
      '<path d="M13,33 L20,22 L25.5,22 L23.5,33 Z"/>' +
      '<path d="M32,19.5 L35,33"/>' +
      '<path d="M20,22 L18.5,16.5 L25.5,10"/>' +
      '<circle cx="28" cy="7.8" r="2.5"/>' +
      '<path d="M25.5,10.5 L32,18.5"/>' +
      '<path d="M20.5,19 L23.5,26 L23,30.5"/>' +
      '</g>' +
      '<path class="fd" d="M2,40 Q12,36.5 22,40.5 T44,45"/>'     // rolling descent under the wheels
  },
  {
    id: 'DE-38', name: 'Attack position', slot: 'disc_enduro',
    why: 'The mildly-tilted attack rider alone — between Trail’s flow and DH’s plunge.',
    el:
      '<g transform="rotate(12 24 25)">' +
      '<circle cx="13" cy="33" r="6.3"/><circle cx="35" cy="33" r="6.3"/>' +
      '<path d="M13,33 L20,22 L25.5,22 L23.5,33 Z"/>' +
      '<path d="M32,19.5 L35,33"/>' +
      '<path d="M20,22 L18.5,16.5 L25.5,10"/>' +
      '<circle cx="28" cy="7.8" r="2.5"/>' +
      '<path d="M25.5,10.5 L32,18.5"/>' +
      '<path d="M20.5,19 L23.5,26 L23,30.5"/>' +
      '</g>'
  }
];

const DISC_TRAIL = [
  {
    id: 'DT-36', name: 'Flow line', slot: 'disc_trail',
    why: 'Upright and easy over a rolling wave of singletrack.',
    el:
      '<circle cx="13.5" cy="32" r="6.3"/><circle cx="35.5" cy="32" r="6.3"/>' +
      '<path d="M13.5,32 L20.5,21 L26,21 L24,32 Z"/>' +
      '<path d="M32.5,18.5 L35.5,32"/>' +
      '<path d="M20.5,21 L20,16 L26.5,9.5"/>' +                  // upright back
      '<circle cx="29" cy="7.2" r="2.5"/>' +
      '<path d="M26.5,10 L32.5,17.5"/>' +
      '<path d="M21.5,19 L24,25.5 L23.5,29.5"/>' +
      '<path class="fd" d="M2,42 Q12,37.5 22,42 T42,42.5 L46,42"/>'  // flowy wave
  },
  {
    id: 'DT-37', name: 'Cruiser, no terrain', slot: 'disc_trail',
    why: 'The upright trail rider alone.',
    el:
      '<circle cx="13.5" cy="33" r="6.3"/><circle cx="35.5" cy="33" r="6.3"/>' +
      '<path d="M13.5,33 L20.5,22 L26,22 L24,33 Z"/>' +
      '<path d="M32.5,19.5 L35.5,33"/>' +
      '<path d="M20.5,22 L20,17 L26.5,10.5"/>' +
      '<circle cx="29" cy="8.2" r="2.5"/>' +
      '<path d="M26.5,11 L32.5,18.5"/>' +
      '<path d="M21.5,20 L24,26.5 L23.5,30.5"/>'
  }
];

const DISC_XC = [
  {
    id: 'DX-36', name: 'Racer tuck', slot: 'disc_xc',
    why: 'Flat back, low over the bars, elbows in — pure speed.',
    el:
      '<circle cx="13.5" cy="33" r="6.3"/><circle cx="35.5" cy="33" r="6.3"/>' +
      '<path d="M13.5,33 L20.5,22 L26,22 L24,33 Z"/>' +
      '<path d="M32.5,19.5 L35.5,33"/>' +
      '<path d="M20.5,22 L21.5,15.5 L31,12.5"/>' +               // flat low back
      '<circle cx="33.5" cy="11.5" r="2.4"/>' +
      '<path d="M30,13.5 L33,19"/>' +                            // tucked arm
      '<path d="M22.5,19.5 L25,26 L24,30.5"/>' +
      '<path class="fd" d="M3,15 L10,15"/><path class="fd" d="M2,20 L8,20"/>' +   // speed lines
      '<path class="fd" d="M4,25 L9,25"/>'
  },
  {
    id: 'DX-37', name: 'Tuck, no speed lines', slot: 'disc_xc',
    why: 'The tuck alone — the pose carries it.',
    el:
      '<circle cx="13.5" cy="33" r="6.3"/><circle cx="35.5" cy="33" r="6.3"/>' +
      '<path d="M13.5,33 L20.5,22 L26,22 L24,33 Z"/>' +
      '<path d="M32.5,19.5 L35.5,33"/>' +
      '<path d="M20.5,22 L21.5,15.5 L31,12.5"/>' +
      '<circle cx="33.5" cy="11.5" r="2.4"/>' +
      '<path d="M30,13.5 L33,19"/>' +
      '<path d="M22.5,19.5 L25,26 L24,30.5"/>'
  }
];

export const SLOTS = [
  { key: 'frame',      label: 'Frame',          prefix: 'FR', live: '🚲', icons: FRAME },
  { key: 'fork',       label: 'Fork',           prefix: 'FK', live: '🍴', icons: FORK },
  { key: 'shock',      label: 'Rear Shock',     prefix: 'SH', live: '🪐', icons: SHOCK },
  { key: 'wheels',     label: 'Wheels',         prefix: 'WH', live: '🛞', icons: WHEELS },
  { key: 'tire',       label: 'Tires',          prefix: 'TI', live: '⚫', icons: TIRE },
  { key: 'drivetrain', label: 'Drivetrain',     prefix: 'DR', live: '⚙️', icons: DRIVETRAIN },
  { key: 'brakes',     label: 'Brakes',         prefix: 'BR', live: '🛑', icons: BRAKES },
  { key: 'bb',         label: 'Bottom Bracket', prefix: 'BB', live: '🔩', icons: BB },
  { key: 'headset',    label: 'Headset',        prefix: 'HS', live: '🎧', icons: HEADSET },
  { key: 'dropper',    label: 'Dropper Post',   prefix: 'DP', live: '📐', icons: DROPPER },
  { key: 'cockpit',    label: 'Cockpit',        prefix: 'CP', live: '🔧', icons: COCKPIT },
  { key: 'saddle',     label: 'Saddle',         prefix: 'SA', live: '🪑', icons: SADDLE },
  { key: 'pedals',     label: 'Pedals',         prefix: 'PD', live: '👟', icons: PEDALS },
  { key: 'all_parts',  label: 'All parts',      prefix: 'AP', live: null, icons: ALLPARTS },
];

export const DISC_SLOTS = [
  { key: 'disc_all',    label: 'All disciplines', prefix: 'DA', live: null,  icons: DISC_ALL },
  { key: 'disc_dh',     label: 'DH',              prefix: 'DH', live: '⬇️', icons: DISC_DH },
  { key: 'disc_enduro', label: 'Enduro',          prefix: 'DE', live: '⛰️', icons: DISC_ENDURO },
  { key: 'disc_trail',  label: 'Trail',           prefix: 'DT', live: '🌲', icons: DISC_TRAIL },
  { key: 'disc_xc',     label: 'XC',              prefix: 'DX', live: '🐇', icons: DISC_XC },
];

// Curated full-rail sets (component slots + disciplines)
export const SETS = [
  {
    id: 'L1', name: 'Workshop literal',
    desc: 'The most anatomically complete drawing per slot — the catalog-photo rail.',
    picks: {
      frame: 'FR-6', fork: 'FK-5', shock: 'SH-6', wheels: 'WH-6', tire: 'TI-6',
      drivetrain: 'DR-6', brakes: 'BR-6', bb: 'BB-6', headset: 'HS-5', dropper: 'DP-6',
      cockpit: 'CP-6', saddle: 'SA-6', pedals: 'PD-5', all_parts: 'AP-7',
      disc_all: 'DA-36', disc_dh: 'DH-36', disc_enduro: 'DE-37', disc_trail: 'DT-36', disc_xc: 'DX-36'
    }
  },
  {
    id: 'L2', name: 'Rail-first',
    desc: 'Every slot’s cleanest 20 px winner — built for the rail, still literal.',
    picks: {
      frame: 'FR-7', fork: 'FK-6', shock: 'SH-9', wheels: 'WH-7', tire: 'TI-8',
      drivetrain: 'DR-6', brakes: 'BR-9', bb: 'BB-6', headset: 'HS-5', dropper: 'DP-6',
      cockpit: 'CP-6', saddle: 'SA-8', pedals: 'PD-5', all_parts: 'AP-6',
      disc_all: 'DA-37', disc_dh: 'DH-37', disc_enduro: 'DE-38', disc_trail: 'DT-37', disc_xc: 'DX-37'
    }
  },
  {
    id: 'L3', name: 'Mechanic’s bench',
    desc: 'The insider views — side profiles, exploded stacks, macro chain — for riders who wrench.',
    picks: {
      frame: 'FR-8', fork: 'FK-7', shock: 'SH-7', wheels: 'WH-9', tire: 'TI-7',
      drivetrain: 'DR-9', brakes: 'BR-7', bb: 'BB-5', headset: 'HS-7', dropper: 'DP-5',
      cockpit: 'CP-7', saddle: 'SA-7', pedals: 'PD-6', all_parts: 'AP-8',
      disc_all: 'DA-36', disc_dh: 'DH-36', disc_enduro: 'DE-37', disc_trail: 'DT-36', disc_xc: 'DX-36'
    }
  },
  {
    id: 'L4', name: 'Recommended blend',
    desc: 'Best single read per slot: marquee drawings where they hold 20 px, essential twins where they don’t.',
    picks: {
      frame: 'FR-6', fork: 'FK-6', shock: 'SH-6', wheels: 'WH-6', tire: 'TI-6',
      drivetrain: 'DR-6', brakes: 'BR-6', bb: 'BB-6', headset: 'HS-5', dropper: 'DP-7',
      cockpit: 'CP-6', saddle: 'SA-6', pedals: 'PD-5', all_parts: 'AP-7',
      disc_all: 'DA-36', disc_dh: 'DH-36', disc_enduro: 'DE-37', disc_trail: 'DT-36', disc_xc: 'DX-36'
    }
  }
];

// Render an icon def to a standalone SVG string.
// weight: stroke width; detail: 'full' | 'reduced' (reduced strips class="fd" elements)
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
