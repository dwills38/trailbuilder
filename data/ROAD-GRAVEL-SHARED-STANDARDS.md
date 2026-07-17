# ROAD-GRAVEL-SHARED-STANDARDS.md — the layer road and gravel share (OFF-LIVE design doc)

**Status: OFF-LIVE, DESIGN ROUND.** This doc and its companions
(`ROAD-MODEL.md`, `GRAVEL-MODEL.md`, `ROAD-GRAVEL-COMPAT-ANALYSIS.md`) are research +
design for two future drop-bar product lines. **Nothing here is wired into the live MTB
app** (`index.html`, `src/compat.js`, `src/schema.js`) and nothing ships until Douglas's
explicit go-live word — same posture as the BMX spike (`data/BMX-MODEL.md` +
`src/compat-bmx.js`, loaded by nothing the site serves).

**Hard rules carried in (CLAUDE.md):**
1. **NO E-BIKES.** No e-road, no e-gravel, no motor/battery variant appears anywhere below.
   Specifically excluded from every starter set: Specialized Creo/Creo 2, Trek Domane+ /
   Checkpoint+, Cannondale Synapse NEO, Orbea Gain, Scott Addict eRIDE, Cervélo Rouvida,
   and any "SL/light-assist" drop-bar e-bike. If a model exists in both acoustic and e
   trims, **only the acoustic trim** is a candidate.
2. **NO POP-UPS, EVER.** Whatever the road/gravel pages become, they load straight to the
   builder — no interstitial, newsletter, or cookie pop-up.
3. **OFF-LIVE** until Douglas's word; the site may split per type
   (BuildMyRoadBike / BuildMyGravelBike — see the page-name decision below).

Date: 2026-07-17. Author seat: design worker (branch `design/road-gravel-model`).

---

## 0. Why a *shared* standards doc (the thesis)

Road and gravel are **one mechanical domain — drop-bar disc bikes — differentiated by
data, not by rules.** A modern gravel bike *is* a modern road bike with (a) more tire
clearance, (b) more often a 1× drivetrain, and (c) occasionally a suspension fork or
dropper. Every fit rule that matters — freehub body vs cassette, flat-mount brake vs
frame, thru-axle match, front-derailleur capacity, tire vs frame clearance, tapered
steerer vs head tube — is the **same rule** on both, evaluated against **different data
ranges**. This is the exact relationship the project already exploited for dirt-jump
("DJ ≈ trail hardtail minus gears" — `data/DJ-BMX-COMPAT-ANALYSIS.md` §0).

**Consequence, argued fully in `ROAD-GRAVEL-COMPAT-ANALYSIS.md` §3:** the two
consumer-facing *pages* Douglas decided on (BuildMyRoadBike + BuildMyGravelBike) should sit
on **one shared engine + one shared vocab**, filtered by a `discipline:'road'|'gravel'|
'allroad'` tag — **two pages ≠ two engines.** This doc is the catalogue of what that one
shared layer contains, and the short list of places road and gravel genuinely diverge.

---

## 1. What one shared vocab/engine layer serves BOTH

| Axis | Shared? | Notes |
|---|---|---|
| **Wheel size** (`700c`, `650b`) | ✅ shared | Road is ~always 700c; gravel is 700c **or** 650b. One `wheel` vocab covers both. 650b on a gravel frame is the same "fits one of the frame's wheel sizes" rule as MTB mullet/wheelConfig. |
| **Thru-axle standards** (12×100 front / 12×142 rear, flat-mount disc) | ✅ shared | The dominant modern disc road+gravel standard is identical: 12×100 front, 12×142 rear. Rim-brake road QR (9×100 / 10×130) is a road-only legacy tail (§4). |
| **Brake mount — flat mount** | ✅ shared | Flat mount is *the* road **and** gravel disc standard, designed by Shimano ([CrankSmith](https://www.cranksmith.com/guides/brake-mount-standards); [bicycles.stackexchange](https://bicycles.stackexchange.com/questions/44161/)). Same caliper-vs-frame rule for both. |
| **Steerer / head tube** (tapered 1-1/8→1-1/2 near-universal) | ✅ shared | Same tapered standard as modern MTB; the existing `steerer` vocab (`tapered`) already covers it. Straight 1-1/8 is a legacy/rim-brake tail. |
| **Freehub body** (HG road, XDR, Micro Spline/MSR, Campagnolo N3W) | ✅ shared | Road and gravel draw from the *same* freehub set. The split that matters is **road HG ≠ MTB HG** (see §2) — a distinction `src/schema.js:88` already anticipates in a comment. |
| **Drivetrain systems** (Shimano 12sp road, GRX, SRAM AXS road, XPLR, Campagnolo Ekar) | ✅ shared | GRX is Shimano-road-compatible; XPLR is road-AXS; Ekar spans both. Gravel groupsets are road groupsets with wider cassettes — see §3. |
| **Front-derailleur / 2× capacity** | ✅ shared | Both run 2× (road more) and 1× (gravel more). Same FD-capacity rule; the *data* leans 1× on gravel. |
| **Tire vs frame clearance** | ✅ shared **rule**, different ranges | Road frames publish ~28–35 mm max; gravel frames 40–57 mm (700c) or ~2.1" (650b). One rule (MTB rule-18 shape), per-frame `maxTire`. |
| **Bar/stem clamp** (31.8 mm standard, 35 mm emerging) | ✅ shared | Same clamp-diameter rule as MTB rule 15, drop-bar vocab. Integrated cockpits are a shared wrinkle (§4). |
| **Seatpost diameter / dropper** | ✅ shared | Round 27.2/30.9/31.6 posts + a growing gravel-dropper segment. Same diameter rule as MTB rule 13/13c. Aero/proprietary posts are a per-frame lock (§4). |
| **Bottom bracket shell vs crank spindle** | ✅ shared | Same rule-7 shape; the shell **vocab** expands (BSA/BB86/BB386EVO/BBRight/PF30/T47 — §4). |
| **Pedals** (interface-trivial) | ✅ shared | Road-clip (Look Keo / Shimano SPD-SL) vs SPD is a **shoe/cleat** preference, not a bike-fit rule — display-only, same as MTB pedals. |

**Bottom line:** ~90% of the fit surface is one shared engine + one shared vocab. The
divergences below are all *data*, not new rule families — except the two genuinely
drop-bar-only axes (rim brake vs disc; brifter integration) covered in
`ROAD-GRAVEL-COMPAT-ANALYSIS.md`.

---

## 2. The one trap that must be modelled right: **road HG ≠ MTB HG freehub**

`src/schema.js:88` already carries the warning in a code comment:

> `freehub: [..., 'HG', ...]   // 'HG' = MTB-length HG spline (a road expansion must SPLIT, not conflate)`

The current MTB `freehub:'HG'` token means the **MTB-length Hyperglide** spline. Road/gravel
Hyperglide is a **different body** and must be its own token(s). Confirmed against the
**Shimano 12-speed freehub guide** ([bike.shimano.com](https://bike.shimano.com/stories/article/a-guide-to-shimanos-12-speed-freehubs-and-compatibility.html);
authoritative table also in the [Shimano 2025-2026 Compatibility PDF](https://productinfo.shimano.com/pdfs/product/thisyear/2025-2026_Compatibility_v028_en.pdf)):

| Freehub | Designed for | Compatible cassettes | Cog range | Splines |
|---|---|---|---|---|
| **HG L2** | 2×12 premium road | **12-speed DURA-ACE 9200 only** | 11–34T | 18 |
| **HG (road/gravel)** | 12- & 11-speed road & gravel | Shimano road/gravel 11- **or** 12-speed | 11–46T | 9 |
| **Micro Spline (a.k.a. MSR, Micro Spline Road)** | GRX **1×12** gravel | Shares Shimano **MTB** 12-speed cassettes (10-46/10-51) | 10–51T | — |

Fetched facts to encode as rules/notes:
- **HG L2 is Dura-Ace-9200-only**, but Dura-Ace 12sp cassettes are *backward*-compatible
  with plain HG freehubs (which take both 11- and 12-speed). → a `direction-aware` freehub
  rule, exactly like the MTB XD/XDR rule-6c pattern.
- **HG-800 / HG-700 road cassettes and 11-speed MTB cassettes on an HG freehub need a
  1.85 mm spacer** (Shimano-stated). This is *the same 1.85 mm spacer number* the MTB
  engine already names in rule-6c's structured `fix` — a clean precedent for an
  adapter-tier warning with a named part.
- **GRX 1×12 (RX820/RX610) uses Micro Spline** and shares MTB cassettes; GRX 2×12 uses the
  HG road body with 11-34/11-36 ([elite-wheels MSR explainer](https://www.elite-wheels.com/technology/new-msr-freehub-standard-for-shimano-grx/);
  corroborated by [Specialized Crux Comp](https://www.specialized.com/us/en/crux-comp-shimano-grx/p/4223483) spec "GRX 12-speed").

**Non-Shimano freehubs in the same shared vocab:**
- **SRAM XDR** — the driver for all SRAM road/gravel AXS 12-speed cassettes (10-tooth
  small cog). *Not* the MTB **XD** — XDR is 1.85 mm longer; an XD-on-XDR / XDR-on-XD
  mismatch is the same adapter-vs-error direction question the MTB engine already handles
  for XD/XDR (rule 6c). SRAM road cassettes require XDR (SRAM service docs; the road-AXS
  cross-compat article notes the "11-speed HG driver → XDR" upgrade question directly:
  [support.sram.com Rival/RED/Force](https://support.sram.com/hc/en-us/articles/6043277756187-Is-Rival-eTap-AXS-compatible-with-SRAM-RED-or-Force-eTap-AXS-parts)).
- **Campagnolo N3W** — Campagnolo's forward-*and*-backward-compatible body; native to
  Ekar 13-speed (9/10T small cogs), and fits 10/11/12-speed Campagnolo cassettes with the
  **AC21-N3W adapter ring + a longer lockring** (both included with N3W wheels)
  ([Bikerumor N3W teardown](https://bikerumor.com/campagnolo-n3w-in-detail-how-campys-new-freehub-body-fits-all-10-13-speed-cassettes/)).

So the shared `freehub` vocab for the road+gravel engine is roughly:
`['hg-road', 'hg-l2', 'micro-spline-road', 'xdr', 'n3w', 'campag-11']` — **split cleanly
from the MTB `['XD','MicroSpline','HG',...]`** rather than reusing tokens. (Whether the two
engines *literally* share one `freehub` vocab object with a superset of tokens, or each
keeps its own, is an implementation call in the analysis doc — the tokens themselves must
not collide in meaning.)

---

## 3. Where road and gravel diverge (all DATA, handled by one tagged engine)

| Divergence | Road | Gravel | Modelled as |
|---|---|---|---|
| **Tire clearance** | ~28–35 mm (700c) | 40–57 mm 700c **or** ~2.1"/54 mm 650b | per-frame `maxTire` (number) — one rule, dormant-until-sourced (MTB rule-18 template) |
| **1× vs 2×** | mostly 2× | often 1× (GRX 1×12, XPLR 1×12/13, Ekar 1×13) | data — the FD-capacity rule simply doesn't fire on a 1× build |
| **Wheel size** | ~always 700c | 700c or 650b | one `wheel` vocab; frame declares its size(s) |
| **Suspension fork** | none (rigid) | rare but real (RockShox Rudy XPLR, Fox 32 TC, Cannondale Lefty Oliver) | fork gains an optional `travel` (0 = rigid); a "front suspension" note, not a new category |
| **Dropper post** | ~never | growing (gravel-specific short-travel droppers) | optional `dropper` slot; road build just leaves it empty |
| **Gearing philosophy** | close-ratio, 11-28/11-34 | wide-range, 10-44/10-46/10-52, sub-1:1 | display/annotation (gear range), never a fit verdict |
| **Groupset badging** | 105/Ultegra/Dura-Ace, Rival/Force/RED, Chorus/Record | GRX, XPLR, Ekar, Apex | a `discipline` tag on the part; the *systems* overlap mechanically |

None of these is a new rule family. Each is either a per-frame/per-part data field or a
tag the page uses to filter its catalog — which is exactly why one engine serves both
pages.

---

## 4. Legacy / edge tails to decide scope on (flagged, not assumed)

These exist in the real market but bloat the vocab; each is a scope call for Douglas
(collected in DECISIONS-FOR-DOUGLAS):

- **Rim-brake road** (dual-pivot caliper, QR 9×100/10×130 wheels, straight 1-1/8 steerer).
  A whole parallel brake+axle+wheel world. Still sold new at entry level and huge in the
  used market. **This is the single biggest "how far back do we go" scope question for
  road** — it roughly doubles the brake/axle/wheel vocab. Gravel is essentially all-disc,
  so gravel is unaffected.
- **Integrated cockpits** (one-piece aero bar/stem, e.g. Roval, Enve, brand-proprietary).
  A "bar" and "stem" that are one SKU; the clamp rule is N/A because there's no clamp. Model
  as a combined `cockpit` part or a bar with `integrated:true` — flagged.
- **Aero / proprietary / D-shaped seatposts** (Specialized, Trek IsoSpeed, Giant, Canyon).
  Not a round-diameter fit; the post only fits *that* frame. Model as `seatpost` with a
  `proprietary:true` + `forFrames` lock (mirrors the MTB OEM-shock `forFrames` pattern),
  never a round-diameter match.
- **Campagnolo 11/12-speed mechanical** (Chorus/Record/Super Record) — its own freehub +
  its own everything. Include now or defer? (Ekar/N3W is the gravel-relevant Campagnolo;
  road Campagnolo is a smaller slice of the US market this site targets.)
- **Cyclocross** as a distinct discipline vs folding into gravel/road. CX bikes are
  mechanically ~gravel (disc, thru-axle, drop bar) with tighter clearance (UCI 33 mm) — a
  `discipline` tag on the gravel page, not a third engine. Flagged.

---

## 5. DECISIONS-FOR-DOUGLAS (shared layer)

1. **Road page name.** Gravel's page is **decided: "BuildMyGravelBike"**. Road's is
   **likely "BuildMyRoadBike" but UNCONFIRMED** (per the kickoff brief). Flagging so it's
   not assumed downstream — the model docs use "BuildMyRoadBike" as a placeholder only.
2. **One shared engine vs two — confirm the thesis.** This doc (and the analysis doc)
   recommend **one `compat-road.js` engine serving both pages**, differentiated by a
   `discipline` tag. Please confirm before implementation — it's the load-bearing
   architectural call. (Reasons in `ROAD-GRAVEL-COMPAT-ANALYSIS.md` §3.)
3. **Rim-brake road scope.** Include rim-brake road (doubles brake/axle/wheel vocab), or
   **disc-only** for v1 (matches gravel, far tidier)? Recommend **disc-only v1**, rim brake
   as a sourced follow-up — but it's your call given the used-market size.
4. **Campagnolo depth.** Model road Campagnolo (Chorus/Record/Super Record + Campag-11
   freehub) now, or start with **Ekar/N3W only** (the gravel-relevant Campagnolo) and add
   road Campagnolo later? Recommend Ekar-first.
5. **Cyclocross.** Fold CX into the gravel page as a `discipline` tag (recommended), or skip
   CX entirely for v1?
6. **Allroad / "endurance" bikes** (e.g. Domane, Synapse, Défy) — a road-page tag, or their
   own filter? They're mechanically road; recommend a `discipline:'allroad'` **tag on the
   road page**, no new machinery.

See `ROAD-MODEL.md`, `GRAVEL-MODEL.md`, and `ROAD-GRAVEL-COMPAT-ANALYSIS.md` for the
per-type slot sets, full rule set, vocab drafts, starter-catalog shape, and the architecture
recommendation.
