# BuildMyMTB — Project Log

## 2026-07-14 — Coordinator seat 8 (succession)

- **Seat 8 seated + seat 7 archived.** New coordinator on `coord/2026-07-14` off `origin/main`
  (`be0b141`), seat-7 worktree/branch pruned. Confirmed nothing left to harvest — seat 7's final
  wave already landed the wheels nominal-weight promotion + WAO Convergence transition + Reserve
  MS retirement. `node validate.js` = 3117 parts / 0 problems / 2293 verified. No open bug issues.
- **Frame-materials accuracy audit MERGED (`b159dc4`) — 1 fix + 11 backfills, CI+Deploy green.**
  Worker fanned out 8 `catalog-worker` sub-agents by brand cluster over all 156 frames. Merged the
  confident set via own-additions-apply: **FIX** `fr-atherton-s200` carbon-alloy→alu (the row's own
  desc said "Alloy lugged DH bike" — S-Series is aluminium tube/lug; carbon-alloy is Atherton's
  A-Series); **11 backfills** (commencal-absolut/kona-process-153/marin-alcatraz/santacruz-jackal/
  specialized-p3/nsbikes-zircus=alu, kona-shonky/dmr-sect/chromag-monk/octaneone-void=steel,
  orbea-occam-lt=carbon). Material→154/156 frames. **HELD** `fr-devinci-wilson-29` at maker-consistent
  `alu` (audit proposed carbon-alloy on editorial Vital MTB citing carbon seatstays + a
  non-structural carbon bashplate; the row's own desc says "Made-in-Canada alloy DH" from a fetched
  devinci.com page — our carbon-alloy token requires the MAKER's wording, the same bar the audit
  correctly used to defer GT). **OPEN JUDGMENT CALL for Douglas:** should editorial confirmation of
  carbon-front/alloy-rear promote to `carbon-alloy` when the maker's page only says "Carbon"? Affects
  `fr-devinci-wilson-29` + `fr-gt-force-carbon`/`fr-gt-sensor-carbon` (kept `carbon`). 2 rows left as
  honest gaps (rockymountain-instinct + trek-top-fuel-gen4 — identical carbon/alloy trims, no
  disambiguator). No e-bikes found (incidental SC "Vala AL" e-bike sighting, not in catalog, flagged).
  material is filter-only (never feeds checkBuild). Session archived; 9 stale `audit/frame-materials*`
  remote branches await a prune (auto-mode gated the remote delete — needs Douglas's OK).
- **Forum riding-style 'dj' migration written** (`supabase/forum-riding-styles-dj.sql`) — DJ went
  live in the catalog but both profile riding-style CHECK constraints (`profiles_riding_style_chk`
  singular + `profiles_riding_styles_chk` plural) still capped at xc/trail/enduro/dh/all, so a DJ
  pick would fail the write. Migration widens both to include 'dj' (idempotent drop+re-add;
  display-only, no policy/trigger touched → escalation-impossible + reserved-names unaffected).
  **Douglas runs it in the Supabase SQL editor.** Committed only — running it does NOT surface a DJ
  pick (the editor arrays `PROFILE_RIDING`/`PROFILE_DISC` still omit dj); the UI 'dj' option is
  held until AFTER he confirms the migration ran, to avoid a pick→constraint-violation race.
- **Icon design-session handoff written** (`ICON-HANDOFF.md`, repo root) — Douglas still dislikes
  the icons after 5 rounds; handoff reframes to a live-render interactive session (Fable/Opus) with
  the two-live-icon-systems inventory, the taste constraints, and the apply targets.
- **Price-drift-remainder chip spawned** `[Sonnet, overnight]` — ~1400 not-yet-checked verified
  rows; non-overlapping with the frame-materials audit (price/lastChecked vs material = field-level).
- **Builds Gallery — ALL SIX decisions made (Douglas): fast-follow photos, account required,
  post-moderation, NO kudos/likes (not just MVP-deferred, "not yet"), hard delete on unpublish,
  publish-gate = complete+zero-errors.** `BUILDS-GALLERY-SCOPE.md` §8 updated to record them —
  MVP is now fully decision-complete. Implementation chip spawned `[Fable/Opus, high]` (schema+RLS
  tier — new `gallery_builds` table, snapshot-on-publish, publish flow, gallery/detail pages,
  fork-to-builder, GitHub-issue reporting, sitemap Action, tests incl. a DJ-brakeless publish
  case). Presents a branch for coordinator review + adversarial RLS audit; does NOT auto-ship;
  Douglas runs the migration himself once reviewed.
- **Affiliate session: LLC name DECIDED — "Dubs Works."** All three clearance checks came back
  clean (PA registry, USPTO exact-wordmark, dubsworks.com domain unregistered); record at
  `LLC-NAME-CLEARANCE-DUBS-WORKS.md` (Affiliate's lane, untracked). Next steps (domain reg, PA
  filing, EIN) are Douglas-only; Affiliate will hand Coordinator a code-shaped request only once
  `Doug@buildmymtb.com` email goes live (the staged `chore/cloudflare-prep` branch is ready for
  that). No action needed here — logged for the cross-session trail per [[multi-session-coordination]].

## 2026-07-14 — Overnight watch (coordinator harvesting while Douglas sleeps)

- **Seat 7 closes clean: fabricated Reserve MS variants retired (`0f1e882`) → 3117 parts / 2293
  verified.** The last running session confirmed rw-reserve-30-hd-29-ms/-275-ms never existed
  (re-fetched Shopify variant JSON: XD-only) — both ALIASed to their real XD siblings, no invented
  successor; applied in-seat (its base predated today's Reserve wave), verify-job tombstoned the
  ids. Every session is now archived, every branch harvested or deliberately held
  (bike-type/kids-striders + dj-bmx, chore/cloudflare-prep, 3 design selection branches,
  honeycomb keepsake). Successor + Affiliate session seed docs are current. End of seat 7.

- **True final wave (Douglas caught 5 more sessions): 3119 parts / 2293 verified (`7cdd9e0`).**
  Wheels nominal-weight policy applied (+7 verified: DT Swiss E1900 x3, Reserve 30HD pair, 31DH
  pair; Giant TRX/Race Face Turbine SL/Zipp Moto checked-not-promoted with reasons) · WAO
  Convergence transition (+21 rows +2 presets; every model judged NEW PRODUCT per WAO's own tech
  page — discontinued+supersededBy, NO aliases; 3 ambiguities flagged; old pages 404 = genuine
  discontinuation) · Reserve 30|SL front maxTire 2.5→2.6 (the chip session verified but never
  committed; applied in-seat with attribution). The wheels worker correctly used spawn_task to
  flag two out-of-scope Reserve issues as chips — the pattern works. Gates green, harness
  byte-identical vs the DJ-era baseline. One session left RUNNING for the successor: "Verify
  rw-reserve-30-hd-29-ms is a real SKU" (suspected fabricated MicroSpline variant — the worker's
  own Shopify-JSON fetch says XD-only; expect a retirement flag).

- **Final wave before succession:** gallery scoping landed (`502d3d4` — snapshot-on-publish model,
  forum-posture moderation, MVP=MEDIUM; 6 decisions queued for Douglas in the handoff) and the
  mobile-only banner shrink AUTO-SHIPPED (`44a7a6c`, <=480px, post-hoc scan clean). Still grinding
  when the next coordinator seats: wheels nominal-weight promotion + WAO Convergence rename chips.
  This coordinator seat (coord/2026-07-12, the 7th) ends here — successor + the new parallel
  Affiliate session both have complete seed docs.

- **Session split: Affiliate session established alongside the Coordinator (Douglas, 2026-07-14).**
  Wrapped the final two loose sessions from the overnight fleet (contrast-fix auto-shipped
  `0024402`; the finishing-kit/mullet breadth session's branch had merged earlier but the session
  itself was missed in that pass — archived now). Executed his four one-liners: (1) wheels
  nominal-weight policy extended in VERIFY-PROTOCOL.md + a grind chip to promote DT Swiss E 1900 +
  sweep similar rows; (2) We Are One Convergence rename-mapping chip (per-model ALIASES-vs-
  discontinued call, not a blanket rename); (3) mobile-only banner-shrink chip (desktop must stay
  pixel-identical); (4) completed-builds-gallery SCOPING chip (document only, the competitive
  audit's #1 idea). Then: rewrote COORDINATOR-HANDOFF.md end-to-end for the two-session era
  (`2c650f8`), authored the standing multi-session-coordination protocol (memory) and a new
  `AFFILIATE-HANDOFF.md` (untracked, repo root) seeding a parallel Affiliate session — its own
  lane (LLC/EIN/Cloudflare/affiliate applications/manufacturer partnerships), explicit
  coordination rule (list_sessions + send_message before ambiguous/shared-file work; Coordinator
  remains the only pusher to main). Ready for Douglas to open both a fresh Main Coordinator
  session and the new Affiliate session whenever he chooses.

- **Douglas back, harvest blessed ("merge" — all 11 already landed).** New directives: (1) **KIT
  BUILDER** coming — rider gear/apparel (shoes, pants/shorts, jerseys, gloves, helmets, knee/elbow
  pads, body armor); the grind will run as idle-time Sonnet chips, but **no kit chips until he
  asks** (memory: kit-builder-directive; kickoff = a data-model round first). (2) Contrast bug
  from his screenshot: the ACTIVE material sub-chip is unreadable on Loam — fix chip spawned
  [Sonnet, low], root-cause class fix across all chip rows, UI auto-ship.

- **MORNING HARVEST COMPLETE — all 11 overnight/day chips landed → 3098 parts / 2286 verified /
  550 tests / 17 guides (main `e4fbb41`, CI+Deploy green throughout).** In merge order:
  quality-backlog `7f80ae6` (schema id-map, isPresetCat/isPresetPart split — genuinely different
  contracts, worker verdict adopted; _slotByKey memo; test table exact) · Shopify wall map
  `2cba0c5` (ZERO flips — every retry brand still walled; FETCH-WALLS doc committed; flags: WAO
  "Convergence" rebrand mapping + extend-nominal-weight-to-wheels policy, both → Douglas) ·
  **DJ GO-LIVE `9769371`** (25 rows into PARTS, dj chip, cog/seatpost slots with inverted
  requiredness, NEW rule 13c = rule 13's geometric twin on a brand-new slot, sample bands exclude
  dj; BMX stays unreferenced; CLAUDE.md conflict resolved as union; suite 489→547; harness delta =
  exactly the 9 DJ frames assembling clean) · frame materials `32880fc` (143/147 backfilled,
  carbon-alloy token maker-verbatim, filter-only contract harness-proven; 9 DJ frames enter
  without material — next-touch backfill) · breadth `566aa82` (+8 rows; worker's audit: the
  2026-07-08 mullet-wheel + finishing-kit queue gaps are otherwise CLOSED — retired) ·
  price-drift `0fb1a8a` (882/2283 checked; ZEB→$1299, SDU→$659, Öhlins TTX22→$929.50, CC 110
  headset→$99.99, Mattoc retailer-sale-price bug→MSRP $1049.99; overlap conflicts resolved
  field-level = sweep PRICE onto landed rows; ~1400 rows remain → follow-up chip candidate) ·
  guides wave 2 `6f710fb` (7 new guides, coordinator accuracy-read all; DJ guide's "not live yet"
  closing REWRITTEN at merge to the live truth; a string-splice tooling fumble was caught by the
  parse check before commit — twice — and fixed) · verify-job re-synced `e4fbb41`. All 8 sessions
  archived; repo swept to seat + shared checkout. **Deferred/flags for Douglas:** phone banner
  costs ~28% of a 375px viewport (worker suggests condense-on-scroll as a future design round);
  forum riding_styles CHECK needs a 'dj' migration (schema tier, his run); WAO rebrand; wheels
  nominal-weight policy; competitive audit's top-5 ideas (builds gallery, price history, verdict
  guides, methodology page, Worldwide Cyclery first + Backcountry caution).

- **Overnight harvest, wake 2 (~04:15 UTC).** Discovered chip-spawned sessions CANNOT send_message
  the coordinator ("no Main Coordinator reachable") — completed workers sit silent; watch checks
  now read transcripts of idle sessions. Landed: (1) **evenness sweep (`eb6871a`)** — 146 forks
  gained maker-published maxTire (RockShox 97/97, Manitou 33/33, Öhlins 21, CC 13, MRP 4 — rule 14
  activates, harness byte-identical = no false fires), ENVE/Spank wheel minTire, and a UNIT BUG
  fix (maxTire compared in inches; 6 DT Swiss F 535 rows carried mm=75, rule silently dead —
  follow-up: audit any maxTire>10 catalog-wide); walls re-confirmed (Fox/DVO/EXT publish no
  fetchable clearance text; SR Suntour states no rotor minimums). (2) **docs coherence
  (`c294edd`)** — NEXT-STEPS rewritten 714→75 lines, FOR-REVIEWERS map current, EXPERT-REVIEW-
  DOSSIER appendix for rules 6c/8b/C2-C4/M1/20 — coordinator accuracy-read EVERY entry in-seat
  (all faithful; one stale M1 line corrected at merge). (3) **Phone-UI worker AUTO-SHIPPED
  (`1d06971`)** mid-harvest per UI tier — post-hoc scan clean (index.html only, no popup-shaped
  patterns; mobile filter carousels, dynamic sticky-header offset for the new tall banner, part-
  modal verdict, touch-target pass); full report pending its session wrap. Main moved during the
  wave — evenness rebased + re-gated before push (the pattern working as designed). Sessions
  archived, branches/worktrees pruned. Still grinding: price-drift, guides, quality-backlog,
  breadth, shopify-retry, DJ go-live, frame-material, competitive audit, phone-UI.

## 2026-07-13 — Coordinator succession + post-wave quality audit shipped

- **TALL TWO-ROW BANNER LIVE (`a0a0070`) + DJ GO-LIVE ordered.** Douglas compared his screenshots:
  the wrapped narrow-width header ("tall", topo contours breathing) beats the single-row desktop
  ("too short") — the <=880px two-row layout (logo/buttons row + full-width search row) is now the
  header at ALL widths; search flex moved into its own rule (the later flex:1 shorthand was
  silently resetting flex-basis — caught at 1900px verification); desktop scroll-margins bumped to
  clear the taller sticky header. Verified at 1900px across all four themes, console clean, gates
  green, CI green. **DJ go-live chip spawned [Fable, high]** ("build the DJ chip"): activates the
  held 555ee7c integration — DJ rows into PARTS, cog/seatpost slots, dj discipline chip — BMX
  stays off-live; engine-tier review + adversarial pass at merge.

- **Icons v5 (refinement round) delivered** (`design/rail-icons-emoji-v2` @ 5a37795;
  `_PDFs/rail-icons-lineart-v5.pdf` sent): 54 drawings — every v4 icon corrected against real
  component photo reference (fork crown/arch/axle, shock piggyback position, derailleur cage
  geometry), one accent element per icon on var(--icon-accent, currentColor) (graceful fallback;
  one CSS line per theme = the whole contract, demoed with each theme's existing accent), plus the
  requested ANTI-SET (solid duotone silhouettes) as a direction check. QA'd at 20px via headless
  contact sheets. Awaiting picks. Both design sessions archived + swept.

- **TOPO CONTOURS BANNER LIVE (`9150847`) — Douglas's style pick from a 9-direction round.**
  Style-directions-v1 worker delivered 9 clickable header directions on a simplicity dial (PDF +
  live switcher); Douglas picked D4 Topo Contours as the default banner for light/dark/Loam and
  declared the STANDING RULE that RAD is its own theme (keeps its checkerboard header; exempt from
  site-wide treatments; exactly four themes, no additions — memory + this log are the record).
  Coordinator extracted D4 from the mockup and shipped: --hdr-bg/--hdr-topo per-theme vars,
  deep-green banner + ~10%-opacity contour SVG pattern (absolute, out-of-flow), html.rad hides it.
  Cross-theme computed-style verification passed (the pane viewport was degenerate 0x0 — layout
  probes were artifacts; the pattern element is out-of-flow by construction). Gates green,
  CI+Deploy green. Mockup branch design/style-directions-v1 kept until the style pass finishes
  (Douglas may pick more elements, e.g. the rail-header contour echo, not shipped yet).

- **DJ/BMX provisional leans CONFIRMED by Douglas (2026-07-13/14): "I don't want to veto these."**
  Q7 (pivotal seat/post = hard error) and Q6 (chain-width mismatch = warning) — and by extension
  the Q4-Q10 lean set — are now DECIDED, not provisional. Next worker on bike-type/dj-bmx flips
  the doc's PROVISIONAL tags to decided with this date. **Icons: v4 line-art direction APPROVED**
  ("getting close... on the right track") with refinement feedback — cleaner/more accurate, a
  little theme-aware color (one accent channel, light demo only), plus one deliberate "anti" set
  as a direction check. v5 chip spawned [Fable, high].

- **Away-grind wave 5 (final): Shimano archive wave [Opus] landed (`adf8aec`) → 2283 verified.**
  Shimano drivetrain 40.8% → **100% verified** (+29 rows) from ONE fetched source: the CURRENT
  productinfo.shimano.com Specifications handbook Ver.2.4 (no archive edition needed this
  generation; pages rendered to PNG because text extraction jumbles the wide tables — route note
  for future waves). 8 maker-weight corrections; Deore/CUES interface-verified with nominal
  weights (Shimano publishes none at those tiers); the long-flagged M8200 clampType resolved to
  ispec-ev from the rendered table (rule-19 warning parity with M8100); XTR 10-51 mfgPn updated to
  the CS-M9101-12 running change, id append-only; test-ui kit fixture swapped to a durably-
  unverified example (contract unchanged). E-bike siblings (STePS, CN-E8000, motor-protection
  shifters) correctly excluded. Gates green in-seat, verify-job re-synced (2394/2926). Bias-audit
  #1 is now CLOSED for shocks AND drivetrain; frames remain the fetch-walled tail. All five
  away-grind sessions harvested + archived; repo tidy (seat + shared checkout only).

- **Away-grind waves 2-4 landed → 3065 parts / 489 tests (`bf975d0`, `5d8fcd4`).** (1) Suspension
  follow-ups: Diamond Boost x4 discontinued (line renamed away), +2 Diamond 36 D1 SL rows (fetched;
  probe-E gains the expected data-accurate DM-180 note), MY27 40 27.5 confirmed; 36 PE 150 retired
  via ALIASES (never purchasable). **SAVE OF THE DAY: the validate gate blocked the 185x55T PE
  retirement — fr-privateer-141-g2 BUNDLES it (its verified page states 185x55 trunnion), so the
  "never existed" call was wrong for retail only; row corrected to the oemOnly/forFrames pattern,
  bad Factory-page verification + wrong discontinued status both removed.** (Coordinator also ate
  two self-inflicted tooling bites here: a regex that mangled escaped quotes in a desc, and a pipe
  that masked a parse failure past an && chain — both caught before push; lesson: never pipe the
  parse check, use string slicing not re.sub templates on descs.) (2) Hardtail push: +6 frames
  (Knolly/Stanton/Ragley/Sonder/Bird/Pipedream); GAPS: Cotic BFe needs an I.S. brakeMount vocab
  decision, On-One defunct, RAAW makes no HT. (3) DH Transmission harvested from a worker that
  committed then died silent — coordinator full-reviewed: CS-XS-797 + RD-XX-DHE + XX DH crank
  inside sram-transmission @ speeds:7 (no schema change; M1 made it work), 4 pinning tests incl.
  7s-vs-12s stays red (489 total). All sessions archived + swept (incl. the D:\-root worktree a
  worker created against the folder rule — future briefs pin .claude/worktrees). Still running:
  the Shimano archive wave [Opus] (branch verify/shimano-archive-wave already committing).

- **Away-grind wave 1 landed: frames-tail re-confirm (`dd594f1`).** 4 rows freshly re-checked
  against maker pages (Skipped stands on all — frame-only weights genuinely unpublished; Devinci
  Wilson product page has 404'd, noted in-row). KEY FINDING: the verification queue's FRAME tail
  is now effectively CLOSED for today's tooling — remaining rows are Specialized/Trek/YT
  fetch-walls or weight-walls; further frame-verification grind is wasted effort until the
  unblocker connector or measured-weight sources appear. FLAG parked: fr-santacruz-highball fetch
  anomaly (12x173.7mm axle + FSA IS-2 headset = likely summarizer misread; row untouched — needs
  one direct/manual page check). Still running from the away-grind tray: hardtail wave, Shimano
  archive wave [Opus], DH Transmission, suspension follow-ups.

- **Rail icons v4 (LITERAL LINE-ART) delivered** (`design/rail-icons-emoji-v2` @ 9223832 pushed;
  `_PDFs/rail-icons-lineart-v4.pdf` sent): 59 hand-drawn stroke-SVG drawings of the actual
  components — 14 slots x 3-4 variants + a matching discipline quintet — one line language,
  currentColor (all 4 themes verified), each shown at ~20px + 3 stroke weights + reduced-detail
  cut, 4 curated full-rail sets. Awaiting Douglas's picks; apply = follow-up chip.

- **MANUFACTURER-PARTNERSHIP-KIT delivered** (`_PDFs/MANUFACTURER-PARTNERSHIP-KIT.pdf` + root .md;
  indexed in _PDFs/README §5). 3 outreach templates (From: Doug@buildmymtb.com, LLC placeholders) ·
  license one-pager (non-exclusive/revocable/display-only/takedown; commits incl. ZERO ranking
  favor) · 15-brand first-wave sheet with contact routes FETCHED from each brand's own site (none
  invented; 8 brands have no public marketing/PR email — general form/phone only, noted) ·
  guardrails citing the bias audit. Fires only after LLC + domain email. Icon saga: rounds 1-3
  (emoji) all rejected — ROOT CAUSE: Unicode has no bike-part glyphs, every candidate was a
  metaphor. Round 4 pivots to Douglas's own words ("an icon of a bike frame for frames") — literal
  component LINE-ART SVGs, chip running [Fable, high]. _PDFs/README design-pick section updated.

- **INCIDENT + RECOVERY (coordinator error, fully repaired, no data lost).** A worktree sweep used
  "clean tree = removable" without cross-checking live sessions and removed the RUNNING
  partnership-kit session's worktree + branch (partial removal also deleted 78 tracked files
  before a lock stopped it). Recovered within minutes: branch ref restored, worktree registration
  hand-rebuilt (.git/worktrees metadata + .git file + reset), all 78 deleted files checked out
  (0 modified / 0 untracked lost — the session hadn't written yet), shared checkout verified
  untouched, no stray commits. Rule added to handoff gotchas: sweep only after cross-checking
  list_sessions cwds. The recurring orphan-worktree hazard now has a documented recovery recipe.

- **Discipline icons v3 delivered** (`design/rail-icons-emoji-v2` @ 087ac1e; `_PDFs/discipline-
  icons-v3.pdf` sent): Douglas rejected rounds 1-2's glyphs and narrowed scope to the 5 discipline
  slots; round 3 = 151 fresh uniquely-numbered candidates (25-30/slot + labeled wildcards, nothing
  previously shown re-offered — build-enforced) + 5 curated quintets. Awaiting his picks (mixable
  across rounds). **Manufacturer partnership program approved as the images/data ENDGAME** (chip
  running): kit = outreach templates + license one-pager + researched first-wave contact sheet;
  fires after LLC + domain email; partners get zero ranking favor (memory + affiliate-push updated).

- **DJ/BMX ARCHITECTURE IMPLEMENTED on the held branch (`555ee7c`, bike-type/dj-bmx — still
  OFF-LIVE, unmerged).** Per the sign-off: driveMode:'single-speed' discriminator in the MTB engine
  (slotRequired drops drivetrain + ALL brake/rotor slots for single-speed frames — the brakeless
  decision), new cog/seatpost categories staged without live GROUPS slots, DJ dataset reshaped to
  the live schema (go-live = PARTS.concat(DJ_PARTS) + two slots); NEW src/compat-bmx.js own engine
  (BMX_VOCAB/GROUPS/SLOTS, gear-ratio display-only) sharing compat.js's exported Verdict — loaded
  by nothing live. Every new rule DORMANT with a documented activation condition (inventory in the
  doc's new §6); worker even proved the live engine byte-identical via the harness AND added an
  in-suite driveMode-absence pinning test. On-branch gates: validate 0 problems · 539/539 tests ·
  tsc clean · harness identical. Worker also caught + dropped a wrong-spec v0.1 row (31.8 BMX stem
  — real BMX is 22.2/25.4) and corrected the bogus 'oversized' clamp token. Q7 (pivotal=ERROR) +
  Q6 (chain-width=warning) surfaced to Douglas as the two provisional calls most worth a veto look.
  CLAUDE.md file-table mention of compat-bmx.js deferred to go-live merge time (worker's note).

- **DJ/BMX ARCHITECTURE SIGNED OFF (Douglas, 2026-07-13).** The three load-bearing calls from
  data/DJ-BMX-COMPAT-ANALYSIS.md §5: (1) Option (b) confirmed — DJ folds into the MTB checkBuild,
  BMX gets its own checkBmxBuild/vocab (the buildmybmx on-ramp); (2) discriminator =
  driveMode:'single-speed' (mechanical flag, not a bikeType enum); (3) brakeless is a valid
  complete build for these types. Q4–Q10 MED/LOW proceed on the doc’s leans as PROVISIONAL
  (vetoable). Implementation chip spawned [Fable, high] — all work stays on the HELD off-live
  branch, every new rule lands DORMANT pending the mechanic-review bar, and the live suite must
  prove behavior-identical (driveMode absence = zero effect).

- **STRIDER SIZING DECIDED by maker consensus (Douglas delegated the call): INSEAM primary.**
  Worker fetched 8 balance-bike makers’ own sizing guidance (Strider/Cleary/REI/Frog unfetchable,
  documented): inseam 4 (Prevelo verbatim “most reliable size indicator”, Guardian, Early Rider,
  Yedoo) · height 3 · age 1 → inseam-vs-seatMin/Max is the model’s primary fit input, child height
  a secondary filter (new heightMin/heightMax fields), age = label only. Citation table in
  data/STRIDERS-MODEL.md §2b; woom/Prevelo/Cruzee maker ranges added (Prevelo seatMax corrected
  356→355 per page). Implemented on the HELD off-live branch bike-type/kids-striders (0670f3a,
  data/-only, gates prove live app untouched). Still unmerged per the off-live rule.
- **Rail icons v2 DELIVERED** (`design/rail-icons-emoji-v2` on origin, a648f76; PDF in _PDFs + sent):
  108 uniquely-numbered candidates (4–6 per rail slot, per-slot prefixes FR-/FK-/…, ID-0 = the
  round-1 glyph) + 4 curated sets; Douglas replies with picks. KEY FINDING for the apply chip: the
  “Refined Emoji” style is NATIVE color emoji (Unicode strings in ICONS/DISC_LABELS in index.html),
  NOT SVGs — applying picks is a string edit; optional vendored Twemoji path noted if pixel-identity
  ever matters. ⚠ Orphan frosty-austin worktree trapped its THIRD worker — the empty dir is now
  deleted outright.

- **Fox LIFECYCLE PASS MERGED (`bd54458`) → 3055 parts / 2256 verified.** All approved dispositions
  landed, every one re-confirmed against 2026-07-13 ridefox.com fetches: fictitious 38-150 pair +
  the two vestigial plain Float X2 ids RETIRED into ALIASES (legacy sh-x2-* aliases re-flattened
  single-hop; fr-frameworks-enduro.bundledShock re-pointed — worker caught the dangling ref);
  vanished sizes + all 10 pre-MY27 36 Factory rows → status discontinued (+supersededBy where a
  MY27 twin exists); NEW verified fk-fox-40-factory-my27-29-203 row (PN 910-21-410, minRotorF 200
  vs the old gen’s 203 — gen split, old row specs untouched); 36 PE 160 source re-anchored to the
  real PE product. Gates green in-seat, CI green. **Residual flags (next Fox pass / mechanic
  queue):** 36 PE 150 (no fetched page supports a 150 PE — discontinued-vs-retire call), the MY27
  40 Factory 27.5 SKU (910-21-417, unaudited), X2 185x55T PE row still verified against the
  Factory page.

- **Bug issue #2 CLOSED (Douglas’s plain OK)** — resolution comment posted (stale-cache diagnosis
  + regression test). **Fox lifecycle pass APPROVED + chip spawned** (retire 38-150 pair, discontinue
  vanished sizes, dedupe Float X2 ids, MY27 40 gen split, provenance fixes — all ALIASES/status,
  append-only). Icon-set PDF re-sent; awaiting his Set #.

- **Fox drift sweep MERGED (`974a33d`).** 19 price corrections + 76 lastChecked re-confirmations
  across verified Fox shocks + forks, every figure from a directly-fetched ridefox.com store product
  JSON. Resolves all three Fox-balance price flags incl. the Float SL Factory tier fix (the $569 was
  the Remote-Up variant; row now $549 with the correct Factory-page source). The 11 fork rows from
  `6f2ca30`: zero drift. Gates green, CI+Deploy green, session archived, branch/worktree pruned.
  **9 LIFECYCLE FLAGS deliberately unapplied (rows untouched), awaiting Douglas's umbrella OK for a
  Fox lifecycle pass:** vanished sizes (Float X Factory 230x57.5 + 185x50T; 38 Factory 275-170/180;
  38 PE 180; 36 SL Factory 120), old-gen 36 Factory rows no longer sold (10 rows → candidate
  status:'discontinued'), two Float X2 duplicate id pairs (→ ALIASES dedupe), MY27 40 Factory is a
  new gen (new row + status on the vitalmtb-sourced 2025 row — also a pre-existing protocol
  anomaly), Float X PE 185x55T row identity questionable (PE-named, Factory-sourced, orphan
  size/price), 36 PE travel rows' provenance mismatch. Plus the already-flagged fictitious
  fk-fox-38-factory-*-150 pair. One coordinated pass fixes all of it via ALIASES/status — never
  mutating verified rows in place.

- **ENGINE RULE 6c LIVE (`021ba42`) — bias #2 CLOSED.** XD cassette on an XDR-driver wheel is now an
  adapter-tier WARNING with a structured fix naming SRAM's 1.85mm spacer (maker source: sram.com
  XD/XDR driver-body explainer, quoted in-code); the reverse direction and every non-XD mismatch stay
  hard errors; LABELS gains XDR. The two verified WTB CZR XDR wheels go red→yellow only vs XD
  cassettes. 8 pinning tests (suite 477→485). **Adversarial audit SUSTAINED on all six angles** —
  auditor independently re-fetched the SRAM explainer AND the WTB spec page (mfgPn+weight match),
  and resolved the hardest edge (T-Type cassettes carry freehub XD: SRAM's model pages label them
  XD and support FAQ 13819655363099 documents T-Type-on-XDR mullets — warning tier correct).
  CLAUDE.md rule-6 summary updated in the same commit. Gates green in-seat, CI+Deploy green.
  Auditor session archived; branch pruned local+origin. ⚠ Orphan-worktree hazard bit AGAIN (two
  sessions assigned the stale frosty-austin folder; the auditor briefly detached the shared checkout
  and correctly restored it) — shared checkout verified clean on claude/zen-blackwell-cfe5d1.
- **PDF consolidation (Douglas's ask):** `_PDFs/` is now the SINGLE home for all 14 project PDFs;
  `_TO-REVIEW/` retired (action index → `_PDFs/README.md`); affiliate runbook status-refreshed
  (legal pages + Guides LIVE, ~3,000 parts) and regenerated; md→PDF pipeline saved as
  `scripts/md2pdf.py`; handoff updated (`cd68854`). Empty stray `D:\tb-profile-contrast` confirmed
  deletable.

- **Bias #3b rotor half CLOSED (`4850484`) → 3058 parts.** The SRAM-rotors follow-up worker
  re-fetched sram.com service pages and found main already carried 22 SRAM rotor rows — exactly ONE
  real SKU was missing (CenterLine 203mm 6-bolt, added; interfaces from the fetched service page,
  honest sample weight/price since SRAM publishes neither per-size). SRAM's current MTB rotor line
  (HS2 / CenterLine / CenterLine X) is now FULLY enumerated; the remaining TRP rotor lead (34 vs
  Shimano 33 / SRAM 24) is real-market SKU count, not catalog bias — no further balancing without
  fabrication. Gates green in-seat, CI+Deploy green. Session archived, branch/worktree pruned.
  Repo back to 8 branches / 2 worktrees (seat + shared checkout).

- **BIAS-REMEDIATION HARVEST COMPLETE → 3057 parts / 2257 verified (`6f2ca30`, sync `58d89c7`).**
  All four finding-chips reported; three landed, one staged: (1) Fox fork balance merged — +11 real
  ridefox.com configs (Podium + 34 SL new families, 36 MY27 gen tokens, SL tiers; eMTB/AWL/gravel
  SKUs excluded per the hard rule; RockShox:Fox row ratio 2.77→2.11, Fox families 9); (2) the
  verification wave's full report confirmed the earlier merge (RockShox shocks now 382/382 = 100%
  verified via sram.com; process gold: `sram.com/en/service/models/<slug>` serves the full static
  size matrix where the rockshox path is JS-thin); (3) `tools/verification-job.json` re-synced
  (2386/2918 processed); (4) **XDR rule 6c STAGED on `engine/xdr-adapter-warning`** — maker source
  fetched (SRAM's XD/XDR driver explainer), 8 pinning tests (485 total on-branch), WTB XDR wheels
  red→yellow only vs XD cassettes — **held for the adversarial-audit chip (queued) before merge**
  (engine tier). Cleanup: 13 worktrees + 26 branches pruned (wave sub-branches, landed feature
  branches, session refs); 4 worker sessions archived. **FLAGS logged for follow-up:** DVO Diamond
  is a NEW generation on dvosuspension.com (36 D1 SL, 29-only, 140-160, DM-180) contradicting the
  4 cataloged Diamond Boost rows → new-gen entry pass, rows untouched; Fox price drifts (38
  Factory $1369, 36 SL $1259 + the 3 shock flags) → combined drift-sweep chip queued;
  `fk-fox-38-factory-29-150`/`-275-150` still cataloged though their own descs say the config
  doesn't exist → ALIASES retirement awaiting Douglas. Residual fork row-skew is partly REAL
  market structure (Fox aftermarket is 29-only/travel-narrow) — accepted, no fabrication.

- **MERGE WAVE ("merge etc"): verification inversion wave 1 + rotor/brake balance → 3046 parts /
  2252 verified (`39297e4`, `6d53f62`).** The WEEKLY usage limit hit mid-fleet (~03:35, reset noon
  ET) — the rotor/brake worker died right after committing; the coordinator content-reviewed and
  landed both finished branches via the own-additions-only pattern, four gates green in-seat,
  harness byte-identical, e-bike scans clean, CI+Deploy green. Details: `verify/inversion-wave-1`
  promoted **352 rows to verified** (all 8 RockShox shock families via sram.com model pages; DVO
  Onyx forks incl. the maxRotorF 220→203 interface correction, re-fetched dvosuspension.com; the
  two orphaned night-verify WIP diffs fully dispositioned — DVO/EXT/Fox-36SL source upgrades
  adopted, Spank weights synced to the fetched spank-ind.com table and honestly left unverified —
  both WIP branches deleted). `expand/rotor-brake-balance` added 28 rows + 2 edits (audit #3b/#4:
  SRAM Motive/Maven/DB/Level/Code + Shimano XTR/MT brakes, RT-MT905 + SM-RT86/64/54/26 rotors via
  the archive-handbook route; Hope XCR FM row now carries road.cc measured weight, sourced facts
  in desc). Verified 1872 → 2252 (+380). SRAM rotors still missing (worker died first) — follow-up
  chip queued. Wave session continues (step 3: verify/dvo-forks in flight); its rs-* sub-branches/
  worktrees prune AFTER it completes.
- **Random tie-break AUTO-SHIPPED by its worker (`b985162`) — post-hoc review PASSED.** Per
  Douglas's "Random!" pick (bias #5): featured sort now tie-breaks on a seeded shuffle — FNV-1a
  (part id) ^ UTC-day seed → one memoized mulberry32 draw (the sample-builds idiom); rank primary,
  presets second, insertion index demoted to collision backstop. Deterministic within a day (no
  keystroke reorder), rotates daily = time-averaged brand fairness. UI tier auto-ship on green
  gates worked as designed; CI+Deploy green.

- **Douglas's decisions (2026-07-13) + execution.** (1) Forum "⚡ E-MTB" discussion category:
  HIDE but KEEP ("don't display for now, but don't remove, we will use that later") — shipped
  `cd79c0f`: `hidden:true` on the vocab entry in src/forum.js + skips in the chip row and
  new-thread picker; existing-thread badges unchanged via forumCategory(); browser-verified on the
  live forum data path (17 categories offered, E-MTB absent from chips + picker, console clean),
  four gates green (harness byte-identical), CI+Deploy green. No-e-bikes rule confirmed
  catalog-parts-scoped (memory updated). (2) Default-sort tie-break (bias #5): Douglas picked
  RANDOM — seeded-stable-shuffle chip queued (UI tier, auto-ships on green gates + browser
  verification). (3) OK given to close bug issue #2 — the `gh issue close` was BLOCKED by the
  permission classifier (indirect authorization); resurfaced to Douglas to confirm plainly or
  close it himself. Also: shared .claude/launch.json swept of 6 entries pointing at pruned
  worktrees/dirs; `tb-coord` (8127 → the coordinator seat) added.

- **Coordinator succession (7th seat).** New coordinator seated on `coord/2026-07-12`
  (inside `.claude/worktrees/`); Main Coordinator 6 archived; the grandfathered `D:/tb-coord-lean`
  seat + its branch removed. Backlog queued as 5 chips: DH Transmission 7s group, Fox drift sweep,
  post-wave code-quality audit, post-wave manufacturer-bias audit, repo-hygiene sweep (~151 stale
  branches / ~53 worktrees). Bug issue #2 (fixed, regression-tested) awaits Douglas's OK to close.
- **POST-WAVE QUALITY AUDIT → two perf fixes LIVE (`0655198`).** Worker audit (branch
  `audit/code-quality-2026-07-13`, report committed as `CODE-QUALITY-AUDIT-2026-07-13.md`) after
  the catalog tripled to 3018: (1) `byId` linear scan → memoized null-prototype id→part index
  (catalog is runtime-immutable — verified zero `PARTS` mutations repo-wide; 10k lookups 102.6ms →
  0.2ms); (2) `renderCatalog` re-ran `resolved()` per PART per render → hoisted to once per render
  (`compatFor(p)` ≡ `compatOf(p, resolved())`, verified; keystroke ~450ms → 9.2ms at 3018 rows).
  Behavior-identical: four gates green in the coordinator seat AND verdict-audit-harness output
  byte-identical to the main baseline. CI + Deploy green. **Report-only backlog:** placementDiff
  baseline-recompute is the next perf lever at ~10× catalog; schema.js O(n²) id lookups
  (validate.js still 0.23s — fix opportunistically); `isPreset` has drifted semantics between
  index.html and schema.js (hazard); CLAUDE.md test table omits test-invariants.js.
  **FLAG for Douglas:** src/forum.js ships an "⚡ E-MTB" DISCUSSION category — catalog rule 1 is
  parts-scoped so this is not a violation, but his explicit "discussion is fine/not fine" is wanted.
- **MANUFACTURER-BIAS AUDIT (post-wave) — report committed as `MANUFACTURER-BIAS-AUDIT-2026-07-12.md`.**
  Read-only worker audit of main @ 5967d12. Affiliate isolation, engine brand-conditionals, guides
  copy, and sample-build mechanism all CHECKED CLEAN. Findings (severity order): (1) HIGH — the
  "✓ Verified only" view inverts market reality (Specialized/Trek/YT frames 0-verified vanish;
  RockShox shocks 8.4% verified vs Fox 76.5%/EXT+CC 100%; SRAM 80.8% vs Shimano 40.8%) — remedy =
  targeted verification waves + the web-unblocker connector; (2) MED-HIGH — XDR freehub hard-errors
  vs every cassette though SRAM documents XD-on-XDR with the 1.85mm spacer → should be a
  direction-aware warning w/ structured fix (chip queued); (3) MED — fork row-share skew (RS 30.2%
  vs Fox 10.9%; fix = Fox variant fill-out, chip queued) + TRP is top brakes+rotors brand at 19.3%
  (fix = Shimano/SRAM rotor coverage incl. RT-MT905, chip queued); (4) MED — rule 8b caliper
  ceiling live on 2 of 4 FM calipers (per-class evenness standing target); (5) MED-LOW — default
  sort tie-breaks on insertion order = data-entry history (neutral-key choice is Douglas's);
  (6-7) LOW — headset near-monoculture (fetch-wall artifact), pinned-fallback build skew.
- **HYGIENE SWEEP LANDED: 154 branches / 54 worktrees → 12 / 3.** Worker content-verified every
  deletion (merge-base ancestry or merge-base-diff grep vs main; every "missing" id traced to a
  documented deliberate drop — 22 EXT e-Storia e-bike rows, 2 fabricated Öhlins trunnions, 1
  Schwalbe e-MTB tire). Coordinator follow-through: the 6 worktrees kept for untracked deliverables
  were verified byte-identical to the shared-checkout root copies and removed; the 2 DIRTY
  night-verify worktrees held real unharvested work — committed as WIP onto their branches
  (`night-verify-suspension-tails`: DVO Onyx maker-page sources + maxRotorF 220→203 correction +
  2 verified promotions, UNREVIEWED — re-verify before merge; `night-verify-rearwheels`: 4 Spank
  weight nudges, no provenance) and folded into the targeted-verification chip; stale
  `audit/code-quality-2026-07-11` deleted (byId memo superseded by `0655198`; its minor _slotByKey
  dedup idea noted here as opportunistic backlog). `feat/catalog-views-fractal-honeycomb` kept as
  the only ref to the removed feature. All three audit/hygiene worker sessions archived.

## 2026-07-12 (evening) — Fable-budget push: shocks merged + engine fixes queued

- **ENGINE CRITICAL FIXES C1–C4 + M1 LIVE (`45f7331`).** All 5 findings from
  ENGINE-CRITICAL-REVIEW-2026-07-12.md landed in harm order, each maker-sourced + pinned (453→477
  tests) + independently adversarially audited (5/5 hold): **C1** new rule 8b `brake.maxRotor`
  (dormant; XTR M9110-FM=160 per fetched Shimano C-461, Magura MT8 SL FM=160 — corrected that row's
  wrong "up to 180" desc AND the golden XC build's own baked-in false fit); **C2** BSA68≡BSA73
  equivalence (false red removed; BSA83/PF exact); **C3** direction-aware bar/stem with a structured
  shim `fix` (mirrors rule 13); **C4** `frame.forkTravelHard` tiered by SOURCE LANGUAGE + validator
  cross-rule (hard requires min+source) — 15 frames hard-tagged verbatim, 3 SC trail frames softened
  per their own re-fetched FAQ, Megatower's unsourced hard red resolved; **M1** chain out of the
  drivetrain SPEED set (stays in system + 3c) — un-hacked the XX-DH workaround. Probe-C assembler
  respects the new caliper ceiling. **BACKLOG:** (1) catalog chip for the now-enterable 7s XX Eagle
  Transmission DH group (CS-XS-797/RD-XX-DHE); (2) mechanic-review queue: the 4 hard-tagged SC frames
  (bare "Fork Compatibility: X–Y" with no softener FAQ) + Nicolai G1's weak accommodation wording;
  (3) Hope XCR-FM + SRAM Level-FM rotor ceilings unsourced (dormant until found).
- **CATALOG MERGE WAVE 4: Fox balance → 3018 parts (`572c441`).** +59 Fox rear shocks (all missing
  current-lineup SKUs via ridefox.com store variant JSON; incl. Live Valve NEO — electronic damper
  for standard frames, AXS precedent, not e-bike). Shock share: RockShox 53.3% → 49.2%, Fox 6.0% →
  13.1% (the UNBIASED balancing pass). VERIFY-PROTOCOL.md gains the decided verified-weight
  subsection (verified = interfaces confirmed; nominal weight OK where makers publish none). Opus
  audit 59/59 independent re-fetch. Gates green. **BACKLOG from its flags:** (1) 2 pre-existing
  verified Float X sizes absent from Fox's current size list (possible page mix-up — re-verify);
  (2) one Float SL row has Factory naming at Performance price; (3) several verified shock prices
  have drifted on Fox's store — a price-refresh drift sweep would catch all three.
- **CATALOG MERGE WAVE 3: rear shocks → 2959 parts (`3095da6`).** `expand/shocks` merged: 108 → 717
  shocks (+609). 5 brand-cluster workers + 5 Opus auditors; audit caught + dropped **2 fabricated
  Öhlins trunnion rows** (210/230 eyes are std-only) and **all 22 EXT e-Storia e-bike rows** (hard
  rule). Interfaces 100% maker-sourced. Gates green. 2350 → 2959 (1813 verified / 1146 unverified).
- **Douglas's shock decisions (executed via coordinator recs):** (1) RockShox 53% skew → merged
  as-is + **Fox balancing pass chip queued** (add real Fox coverage rather than withhold real data);
  (2) verified-weight policy **2a formalized** — `verified:true` = interfaces manufacturer-confirmed,
  nominal weight OK where makers publish none (doc patch to VERIFY-PROTOCOL.md folded into the Fox
  chip); (3) Push Eleven Six skipped (no maker size matrix; per-bike fitment only).
- **Engine-fix chip queued [Fable]:** C1→C2→C3→C4→M1 in harm order, each with maker source +
  pinning test + adversarial audit, per ENGINE-CRITICAL-REVIEW-2026-07-12.md. Coordinator-reviewed
  tier.
- **Earlier today:** profile-input contrast fix live (`d42d379` — white-bg inputs used the theme's
  light --ink; now fixed dark text, all four themes readable); DH-wheels diagnosis fixes live
  (`df9868b` — size-chip no-op on Wheelset tab + honest empty-state; the "0 wheelsets" on the RAAW
  Yalla was CORRECT: Boost148-rear DH frame, no real 20x110+Boost148 bundled SKU exists; 19 front /
  130 rear à-la-carte options DO). Honeycomb/fractal views were shipped then REMOVED at Douglas's
  call (`36ce0d2` revert, his session). 12 orphan D:\tb-* worktrees cleaned; **folder rule: all
  future seats/worktrees INSIDE the project dir**. Folder rename to "Build My MTB" CANCELLED by
  Douglas. Session on Fable to conserve the 9% weekly budget (78% Fable available).

A dated, append-only record of what changed, **why**, and **how it was verified** — so
the project can be handed to an independent reviewer (another engineer or model) who can
trace every decision and re-check it. This is the *running* trail; its companions:

- **`FOR-REVIEWERS.md`** — the reviewer's entry point: what to read, in what order, and how
  to independently verify every claim (the four gates, provenance URLs, the "compatible =
  true" contract). _(being built)_
- **`REVIEWER-DOSSIER.md`** — the comprehensive retroactive decision + verification history.
  _(being built)_
- **Git history** — the ground truth for exact diffs; commit hashes are cited below.
- **`tools/verification-job.json`** — the per-part provenance ledger (verified vs. sample).

**Entry format:** `date` · what changed · why · how it was verified · refs (commit/branch/
issue) · what a reviewer should double-check. Newest first. The coordinator appends one entry
per wave/decision; large reconstructions are handed to a worker session.

---

## 2026-07-11 — Coordinator session (lean-rule correction + owner-task prep)

- **Succession housekeeping.** Archived the outgoing coordinator session ("Main Coordinator
  Old 5"). No other sessions were active.
- **Lean-coordinator rule hardened.** The coordinator seat must **never run tasks in its own
  context** (no coordinator-spawned in-session background `Agent`s — they meter against and
  bloat the seat). Task work is handed to separate worker sessions.
  - _Why:_ this session spawned an in-session background audit agent; Douglas corrected it —
    *"I don't want the coordinator sessions to run tasks. I want to keep them lean to
    coordinate."*
  - _Verified / refs:_ baked into `COORDINATOR-HANDOFF.md` §2 (removed the prior "or background
    agents" license) — commit **`2742ca8`**; and into the Claude memory topic files. The
    in-session agent was stopped and its orphan worktree pruned.
  - _Double-check:_ handoff §2 "How you work" wording.
- **Owner account tasks scoped (blocked on Douglas, by design — his accounts).**
  - _Supabase:_ base forum is already live/migrated; the pending item is the usernames/admin
    layer — run `supabase/forum-profiles.sql`, then the owner admin-grant. Security-reviewed:
    privilege escalation is prevented by a BEFORE trigger that pins `is_admin`/`verified_pro`
    off for every end-user JWT (only the service-role SQL editor can grant). Refs:
    `supabase/SETUP.md` §9, `supabase/forum-profiles.sql`.
    App code is already live and feature-detects the tables (no deploy needed to light it up).
  - _Cloudflare:_ email routing (`Doug@buildmymtb.com` → Gmail) + optional cookieless
    analytics. Runbook: `CLOUDFLARE-SETUP.md`. If analytics is enabled, the privacy page's "no
    third-party analytics" line must be reworded the same day (honesty).
  - _Connectors:_ MCP registry search returned **no** one-click Supabase or Cloudflare
    connector; manual paths remain the recommendation for these one-time tasks.
- **⚠ Stale-branch flag.** `chore/cloudflare-prep` is divergent from current `main` and would
  **revert** the forum-profiles + random-builds work. Do **not** ship it. The contact-email
  swap (`douglas.w.wills@gmail.com` → `Doug@buildmymtb.com` on privacy/terms/affiliate-
  disclosure) is to be **re-derived from current main** once Doug@ routing goes live.
- **Open item — bug #2.** GitHub issue #2 ("Wrong verdict") is still **open**, but its fix is
  already on main (`6ef9b48`; it was a stale-cache report — the catalog was already correct).
  Needs closing with a note.
- **Audit trail established.** This log started; `FOR-REVIEWERS.md` + `REVIEWER-DOSSIER.md`
  handed to a worker session to build.
- **UPDATE (later 2026-07-11) — Supabase forum-profiles migration RUN.** Douglas ran
  `supabase/forum-profiles.sql` and seeded the owner admin profile (`Doug`, `is_admin=true`).
  Forum usernames/profiles/admin-moderation/verified-pro are now LIVE (app code already deployed;
  feature-detects the tables). _Gotcha logged:_ the admin-seed UUID must be single-quoted —
  pasting it bare tripped Postgres `42601: trailing junk after numeric literal`.
  _Next:_ Cloudflare owner task still open; queued forum follow-ups (rich profiles, auto-mod)
  ready to hand off.
- **UPDATE — reviewer audit-trail docs LANDED.** A worker session built `FOR-REVIEWERS.md`
  (entry-point/map) + `REVIEWER-DOSSIER.md` (retroactive decision + verification history, by theme,
  every claim commit-cited). Coordinator-reviewed end-to-end: accurate, honest-toned, technical-only
  (business/personal deliberately excluded — confirmed no leakage), four gates green. Merged this
  commit (only the two new files taken; the worker's branch was based on `75e0304`, one behind, so
  its stale `PROJECT-LOG.md` diff was NOT applied). The dossier honestly self-flags **13
  "reviewer should check"** items — none a live error-rule bug; the actionable follow-ups: stale
  "dead rule" wording for rules 2/8/11 (real DH-fork/FM-brake parts can now fire them) + no
  real-part error-case test for 2/11; `CLAUDE.md` roadmap/test-table prose lags shipped code;
  `MECHANIC-FINDINGS-INTAKE` rule map one behind (no rule 20). Backlogged for a doc-cleanup worker.
- **UPDATE — theme dropdown + 🍂 Loam mode SHIPPED LIVE (`6e2c202`).** Worker converted the
  Light/Dark/RAD toggles into one native `<details>` dropdown mirroring the Sample-builds menu, and
  added `html.loam` (warm forest-floor dark theme, WCAG AA verified). Scope clean (only index.html,
  126+/41−); coordinator independently re-verified gates green (validate 0 · 453 tests · tsc 0).
  ⚠ **Process note:** the worker SELF-SHIPPED to main rather than presenting a branch for Douglas's
  staged eyeball (my prompt had said "present a branch"); it claimed Douglas's launch prompt
  authorized auto-ship-if-sound. Sound + reversible, so left live — but the standing "UI stages for
  Douglas's eyeball first" rule vs. worker auto-ship is a policy question flagged to Douglas
  (unresolved at log time; do NOT bake auto-ship or a worker→coordinator auto-ping into standing
  instructions until Douglas confirms in chat — both were relayed via the worker, not from him).
- **UPDATE — forum-profile UI fix SHIPPED + hardening migration STAGED (`f689857`).** Worker fixed
  the 3 profile-UI bugs (username-as-identity header button; `[object PointerEvent]` guard; header
  auto re-render) + authored `supabase/forum-profiles-hardening.sql` (search_path pins on the 4
  flagged functions + least-privilege EXECUTE on `username_is_reserved`). Cherry-picked onto current
  main (branch was based on `f20c6bf`; a naive merge would have reverted theme/Loam + the reviewer
  docs). UI auto-shipped on green gates (new policy); the `.sql` is inert in-repo — **Douglas runs it
  in Supabase** (security tier). Coordinator independently reviewed the migration: bodies byte-
  identical, `profile_norm` stays IMMUTABLE, REVOKE-from-public can't strip authenticated's direct
  grant, fails CLOSED — escalation still impossible, reserved-names still fire. CONFIRMED SAFE
  (agrees with the worker's in-session auditor). Four gates green.
- **UPDATE — doc-cleanup LANDED (`73a3420`).** Chip refreshed 4 stale docs (CLAUDE.md,
  EXPERT-REVIEW-DOSSIER.md, REVIEW.md, MECHANIC-FINDINGS-INTAKE.md): rules 2/8/11 de-staled
  (rule 8-front + rule 11 now fully live WITH real-part error tests; rule 2-front has live vocab but
  its error case is still synthetic-only), CLAUDE.md roadmap + test-table + rules 10b/14c corrected,
  mechanic-intake rule map extended to rule 20. It independently verified all 12 DATA-MODEL-REVIEW
  §8 catalog items — **10 landed, 1 moot, 1 deliberate; NO un-applied catalog error remains.**
  Docs-only, four gates green, self-merged. Coordinator caught the original brief was wrong (rule 11
  already had a real-part error test — only rule 2-front lacks one). **OPEN (Douglas's call):** add a
  real-part error-case test for rule 2-front? A dual-crown DH fork on a trail wheel is nonsensical —
  coordinator recommends LEAVING it (a contrived test is worse than none).
- **UPDATE — rider profile PAGES shipped (`a37c342`) + rich-profile migration STAGED.** Worker built
  full-page rider profiles (header 👤 → own profile page: avatar/username/✓Pro/member-since/bio/
  riding-style/location + the user's forum threads & replies; forum author names → that rider's
  public read-only page; owner inline editors; preset/initials avatar, no external image URLs).
  Touches index.html + src/account.js + src/forum.js (all app tier). ⚠ The worker pushed to origin as
  branch `feat/user-profile-pages`, NOT main (its "pushed to origin" claim was the feature branch) —
  coordinator cherry-picked `365c67a` onto current main (base `58d5412`, clean). Feature-detects
  (`hasRichProfiles`) so the UI is safe pre-migration; auto-shipped on green gates. Migration
  `supabase/forum-profiles-rich.sql` (adds bio/riding_style/location/avatar columns; idempotent;
  DB-level CHECK constrains avatar to a slug — never a URL; touches NO policy/trigger) — **Douglas
  runs it** (schema tier). Coordinator review + the worker's independent adversarial pass both
  confirm escalation-impossible + reserved-name enforcement still hold. Four gates green.
- **UPDATE — rich profiles v2 shipped (`50f9368`) + Storage migration STAGED.** Worker (correctly
  presented a branch, did NOT self-push) added profile photo UPLOAD (Supabase Storage `avatars`
  bucket, owner-own-path RLS, 2 MiB + image-MIME caps), tagline, multi-select disciplines
  (`riding_styles[]`), experience, current bike, home trails, and social handles (IG/YT/Strava stored
  as handles only, host hardcoded client-side, rel=noopener nofollow). index.html + src/account.js
  (app tier, feature-detected `hasRichProfiles2`). Coordinator independently reviewed the Storage RLS
  + the `avatar_url` CHECK + social-handle charset constraints — SAFE (canonical owner-folder Storage
  pattern; avatar_url DB-locked to the project prefix; no profiles_guard/RLS/trigger change →
  escalation-impossible + reserved-names hold). Worker's adversarial pass agreed; one LOW note (no
  per-user Storage object quota) is optional/non-blocking. Migration `supabase/forum-profiles-rich2.sql`
  (9 columns + CHECKs + the `avatars` bucket + Storage policies) — **Douglas runs** (schema+Storage
  tier). Branched off current main (no stale base). Four gates green.
- **CATALOG MERGE WAVE 1 (2026-07-12): brakes + wheels + tires → 2172 parts.** Reviewed + merged 3
  finished expansion branches onto current main, each applied as its OWN additions only (git-apply of
  the merge-base..branch diff for compat.js/schema.js/types.js) to avoid the stale-base revert since
  all branches are based on old main. `expand/brakes` (+3 MTB brakes: SRAM G2 Ultimate + Shimano
  BR-MT410/MT420 — **DROPPED bk-sram-guide-re as SRAM's e-bike-branded caliper** per the no-e-bikes
  rule; that session predated the rule relay). `expand/wheels` (+109 wheels/wheelsets, all disciplines;
  + `XDR` freehub vocab — WTB CZR road-length driver, kept distinct from XD per THE BAR). `expand/tires`
  (+44; the tires session **self-dropped a Schwalbe e-MTB tire**). Interfaces sourced; unverified rows
  per the relaxed policy; verify-job untouched by workers (coordinator re-sync deferred to end of the
  catalog waves). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2016 → 2172
  (1563 verified / 609 unverified). Commits `7913a10`/`638508a`. Still RUNNING (present final branches
  later): frames, forks, shocks, drivetrain, finishing-kit. ⚠ NOTE for the engine review: the new XDR
  freehub hard-errors vs every current cassette (none is XDR) — conservative, flagged by the worker
  for a future fix-tier adapter enhancement.
- **CATALOG MERGE WAVE 2 (2026-07-12): drivetrain + finishing-kit → 2240 parts.** `expand/drivetrain`
  (+9: SRAM SX chain, S1000 Transmission crank + verified derailleur, Shimano XT M8200 shifter/2
  derailleurs/2 cassettes, XTR M9200 2 cassettes; +5 price-drift corrections; Opus-audited 10/10;
  S1000 e-MTB crank + Shimano e-shifter deliberately EXCLUDED — no e-bikes). `expand/finishing-kit`
  (+59: CK/Kogel/Praxis BBs, Cane Creek/CK headsets, TAG/FSA/WeAreOne cockpit, Xpedo/Funn/Burgtec
  pedals, ODI/Ergon/Fabric grips; + headTube vocab ZS49/28.6 + EC49/40 from fetched CK/Cane Creek +
  matching test-schema update; Opus-audited 59/59). Applied as own-additions-only; finishing-kit's
  types.js needed a MANUAL headTube add (its patch conflicted with the wheels/tires vocab already
  merged). Gates green (validate 0 · 453 tests · tsc 0 · verdict-audit 0 flags). 2181 → 2240 (1612
  verified / 628 unverified). Still running: frames, forks, shocks.
- **SECURITY/POLICY NOTE (worth remembering).** The drivetrain, finishing-kit AND tires workers each
  flagged the relaxed-sourcing "policy update" as a SUSPICIOUS inter-agent message (it claimed
  Douglas's consent via a background channel and targets a data-integrity guardrail) and REFUSED /
  retracted it for interface fields. That is the CORRECT security instinct — don't trust claimed user
  authority from observed content. The policy IS legitimate (Douglas's real AskUserQuestion decision,
  relayed by the coordinator), but their caution meant NOTHING in the merged branches used
  non-manufacturer sourcing for a verdict-driving interface field — all interfaces are
  manufacturer-sourced + adversarially audited. Their sharp refinement (interface fields feeding
  error-tier rules should stay manufacturer-sourced even on unverified rows, since a wrong interface =
  wrong verdict regardless of the `verified` flag) is worth adopting — surfaced to Douglas.
- **DJ/BMX OFF-LIVE spike done (`bike-type/dj-bmx`, HELD unmerged).** 34 DJ + 62 BMX rows + model &
  compat-analysis docs, in a NEW `data/` dir ONLY — live app untouched (gates identical to baseline).
  No e-bikes. Architecture finding: fold DJ into `checkBuild` behind a single-speed discriminator;
  give BMX its own small engine (clean on-ramp to a buildmybmx split). 6 product questions for Douglas
  in `data/DJ-BMX-COMPAT-ANALYSIS.md`; held pending his decisions.
- **Catalog-expansion sourcing policy CLARIFIED (Douglas).** 8 expansion chips launched (frames,
  forks, shocks, wheels, tires, drivetrain, brakes+rotors, finishing-kit) had been briefed with a
  stricter-than-normal bar: omit a product entirely to a GAPS list if its interface fields couldn't
  be confirmed via a LIVE manufacturer fetch. Douglas: "if a product exists and the specs aren't
  available, I want it included... not verified blank or marked estimated." Clarified via
  AskUserQuestion — he picked the safe, already-precedented option: interface fields sourced from
  ANY credible real source (retailer listing, geometry chart, review article), not just a live
  fetch; entered as ordinary unverified/sample data (no `verified:true`, no fake `source`) — the
  SAME state ~1480 of 2016 existing parts are already in. Never a fabricated/invented number with
  zero basis; `verified:true` still requires the real fetched-source bar. GAPS list now means
  "genuinely no plausible real-world spec found anywhere," not "wasn't manufacturer-fetched."
  Policy relayed via send_message to all 8 running sessions. **Root cause:** this exact policy was
  ALREADY set 2026-07-11 (memory `catalog-unverified-inclusion-policy`), but the repo docs still
  stated the strict rule, so the briefs regressed. Fixed for good this time — patched
  `tools/DATA-ENTRY-TEMPLATE.md` with the verified-vs-unverified-breadth distinction so future briefs
  default correct (VERIFY-PROTOCOL's fetched-only rules are correctly about earning `verified:true`).
- **UPDATE — 📚 Buyer's Guides section shipped (`c6cbdbc`).** Chip built a full-page Guides section
  (new `src/guides.js` + index.html) with **10** accurate, brand-neutral compatibility/buyer's guides
  (how-the-checker-works, fork travel, mullet, Boost/SuperBoost, brakes/rotors, cassette/freehub,
  UDH/Transmission, headset S.H.I.S., dropper sizing, rear-shock), each grounded in the real engine
  rules and deep-linkable (`#guide/<slug>`). Coordinator read all 10 — accurate, NO brand favoritism,
  ZERO affiliate links (unbiased value upheld). Worker presented a branch (correct); coordinator
  cherry-picked onto current main + resolved ONE index.html conflict (additive CSS, rich2 vs guides —
  kept both), gates green (validate 0 · 453 tests · tsc 0 incl. guides.js). ⚠ index.html inline script
  isn't gate-covered and this was a hand-resolved merge, so Douglas to eyeball Guides↔profile hash
  nav. Purpose: value-add written content for the AvantLink application. Follow-up flagged: static
  pre-render for real search-SEO would be the project's first build step — deferred, deliberate call.
