# BuildMyMTB — Coordinator Handoff

_Last updated 2026-07-11 (afternoon), right after the domain went live, the BuildMyMTB rebrand
shipped, and the groupset Full/Assembled split landed. Written so a fresh coordinator with zero
context can operate safely. Read this end-to-end before touching git._

---

## 1. TL;DR — current state

- **🚀 LIVE at https://buildmymtb.com** — custom domain, HTTPS, and Supabase auth-redirects all
  completed 2026-07-11; the old `dwills38.github.io/trailbuilder` now redirects here. Repo is still
  `github.com/dwills38/trailbuilder` (the slug is internal plumbing — `REPORT_REPO` — NOT the brand;
  never rename it or bug reporting breaks).
- **Catalog: 2013 parts / 1477 verified (73%)** at handoff. `origin/main` = **af88216**, CI + Deploy
  green. **Always run `node validate.js` + `npm test` for live numbers — never trust doc counts.**
- **The brand is BuildMyMTB** (Douglas locked the exact casing 2026-07-11). All user-facing
  "TrailBuilder" was renamed; the tagline broadened from "enduro parts" to "bike parts". The real
  per-part **Enduro** discipline (filter chip + part `disciplines` data) is untouched — only brand copy
  broadened.
- **Shipped today, each browser-verified on the live domain:** domain cutover (CNAME + a deploy-workflow
  line that publishes it — Pages stages only index.html+src, so a bare CNAME gets dropped without it);
  the **BuildMyMTB rebrand** + bike-parts copy; the **Groupset Full/Assembled split** (new optional
  `assembled` field on the 19 `gs-*` presets, two sub-filter chips "Groupset · Full" / "Groupset ·
  Assembled", a per-row category label, **Eagle 90 promoted verified at the current $735 MSRP**, and 2
  cross-brand crank fixes); +8 master-list frames; night-shift frame expansion (Rocky Mountain Instinct,
  Scott Ransom, Orange Switch); harvested night-shift drivetrain component-price corrections (to current
  MSRP) + 3 fork verified promotions.
- **The board is EMPTY of worker sessions** — all archived. Coordinator seat: **D:/tb-coord2**
  (branch `coord/2026-07-11-succ`). Shared checkout `D:\MTB Bike Builder` stays on `main` — NEVER
  coordinate from it (untracked dossier PDFs + `scripts/` in its root are intentional; never `git add -A`).

## 2. Role & mechanics — Douglas's STANDING ORDERS (non-negotiable)

You **coordinate**; you do not author features. Split all authoring to `spawn_task` chips (recommended
model in the TITLE). His creed for every worker brief: **tidy, clean, efficient, unbiased, good data,
unbreakable.**

- **Succession:** a new coordinator's first act, once oriented, is to `archive_session` the previous
  coordinator. **Close finished worker sessions AS YOU GO** (read report → harvest branch → archive);
  sweep branches/worktrees/launch.json entries the moment work lands. Douglas one-click approves
  archives; he never hunts windows.
- **Coordinate-only:** keep this seat's usage/context low — every substantive change is a chip.
- **Merge workflow per branch:** fetch → scope check → per-id interface-field diff for catalog branches →
  `merge --no-ff` → ALL FOUR gates (`node validate.js` 0 problems / `npx vitest run` all pass /
  `npx tsc --noEmit` clean / `node tools/verdict-audit-harness.js` 0 flags) → fetch + `merge-base
  --is-ancestor origin/main HEAD` → `push origin HEAD:main` → confirm CI + Deploy green → `branch -d`,
  archive session. **Adversarially audit anything feeding an ERROR-tier rule before merge** (frames,
  drivetrain system/actuation, rotor/hub). `catalog-auditor` (Opus) is the pinned agent for that.
- **Data-row catalog branches self-merge through your gates.** **Schema + ALL UI/visual changes get
  STAGED on a local preview port for Douglas's browser eyeball first** — he approves verbatim ("ship it")
  or gives feedback. Always include a hard-refresh (Ctrl+Shift+R) reminder with the localhost link.
- **Pricing rule (2026-07-11):** always use the CURRENT manufacturer MSRP, not launch MSRP;
  `verified:true` requires price = the live maker page. (Eagle 90 shipped at the current $735, not the
  $670 launch price.) **TODO: still needs adding to `tools/VERIFY-PROTOCOL.md` for the grind workers.**
- **Git hygiene:** commit messages via Bash heredoc, no double quotes (PS 5.1 mangles); `git add <paths>`
  only; ids append-only (a correction that changes identity = FLAG + `ALIASES`, never rename).
- **Deliverables Douglas uses offline become PDFs** (untracked repo root + `SendUserFile`).

## 3. THE BAR (unchanged, non-negotiable)

Wrong verdict > missing part, both directions. Specs exist only on FETCHED maker/authoritative pages
(snippets + third-party aggregators lie — vitalmtb is the walled-maker-reprint exception, entered
UNVERIFIED with the wall disclosed). `verified:true` = real maker source URL + non-future date (the
validator enforces this). Retailer weights rejected; editorial teardowns = weight only
(`sourceType:'measured'` + `weightSource`). New/strengthened REDs need a maker source + a pinning test.
**Never weaken a test.** `fr-santacruz-megatower-cc` verified-status is a test fixture. Golden-breaking
corrections get FLAGGED, not applied.

## 4. Immediate queue (ordered)

1. **random-builds — Douglas's ship-or-drop decision.** Branches `stage/random-builds` + `ui-random-builds`
   (6 ahead of main), a compat-aware random sample-build generator staged long ago (preview was :8183),
   never shipped. It's a UI feature awaiting his verdict — stage it fresh for his eyeball and ship or drop.
2. **Frame expansion** from `FRAME-EXPANSION-GAPS.md` (repo root, **~192 missing frames** by discipline,
   the target list). Sonnet grind chip, fetchable makers only (walls in §5), adversarial-audit frames
   before merge. First-cut gap list slightly over-counts — a dedup-refine tightens it.
3. **Verification tail (~536 unverified)** — mostly wall-limited (Specialized/Trek/Norco/Pivot 403s, no
   frame-only weights). Don't manufacture wall-hitting busywork.
4. **Business (Douglas-led; coordinator assists + pre-builds):** NOW UNBLOCKED by the live domain —
   **affiliate signups** (AvantLink/Impact/Amazon; approved feeds license real product images + prices,
   which wire into the built-but-empty `image`/`retailerLinks` schema fields); **LLC formation** (playbook
   delivered: `LLC-AND-GOLIVE-PLAYBOOK.pdf` — he can launch-then-form, form before the marketplace);
   **bike-park stickers** (playbook delivered, crack-and-peel liner is his hard requirement, now prints the
   real URL). Domain shortlist + manufacturer-data playbook PDFs already delivered.
5. **Style pass (queued, Douglas schedules)** — art direction: mountain-panorama header render replacing
   the solid green bar, etc. Single Opus design session; the final layout it lands on now exists.
6. **Housekeeping:** ~24 process-locked orphan worktrees under `.claude/worktrees` (clear on app restart or
   bulk session archive — see [[orphan-worktree-hazard]]); add the current-MSRP rule + the r.jina.ai-proxy
   and archived-handbook fetch routes to `tools/VERIFY-PROTOCOL.md`; headTube vocab gaps flagged by sourced
   pages (ZS49 upper, ZS62 lower, IS41 lower — widen only when a sourced headset needs them);
   preset-wave prerequisites (5 items, honest yield 2/133 — do NOT mass-grind presets).
7. **Future — MARKETPLACE (not scoped):** Douglas wants buy/sell eventually; HARD requirement is
   super-secure-against-scammers (identity/seller verification, escrow or a trusted processor — never touch
   card data directly, fraud detection, dispute resolution, moderation). Security-first from day one.

## 5. Source & fetch map (delta on top of tools/VERIFY-PROTOCOL.md)

- Fetch fine: sram.com (+rockshox) model pages (gold for SRAM/RockShox weights + MSRP), canecreek,
  chrisking, wolftooth, commencal `/frame-*`, canyon, RAAW, transition, ibis, santacruz SUPPORT pages,
  privateer, cotic, scott-sports, knolly, evil FAQ, rockymountain, devinci, GT, nicolai/geometron,
  spank-ind.com (non-www), hopetech PDFs, contrabikes, intensecycles, rideframeworks, kmcchain.us,
  galfer/hayes/magura/TRP/trickstuff.
- Shimano: component weights NOT published; `bike.shimano.com`/`mtb.shimano.com` 403/DNS-fail;
  `productinfo.shimano.com` archived-edition handbook PDFs are the pay route (period-correct RT-MT rotor
  columns); measured-weight policy covers Shimano/rotors/forks.
- Walls: specialized (site-wide 403), trek/norco/pivot/giant/propain (JS/403), FSA 403, Acros 404,
  We Are One password-walled, onyxrp 403, orbea WAF-403, web.archive.org unreachable from tooling,
  athertonbikes 403, devinci has no live per-model pages for older gens (Wilson 29).
- Vitalmtb-reprint precedent: for a walled/dead maker, an unverified-sample row sourced to vitalmtb is
  acceptable IF every verdict-driving field is corroborated + the wall is disclosed in the desc
  (fr-atherton-s200 / fr-devinci-wilson-29 / fr-specialized-epic-8 precedent).

## 6. Gotchas (hard-won)

- **The deploy workflow stages ONLY `index.html` + `src/`** into `_site` — a `cp CNAME _site/` line keeps
  the custom domain alive (Pages drops it if the CNAME isn't in the published artifact). Same trap would
  bite any new root file you need served.
- Supabase login redirects are **origin-based** in `src/account.js` (`location.href`) — they auto-adapt to
  any domain; only the Supabase dashboard allow-list needs the domain added.
- Browser-pane screenshots time out here — DOM-eval via `javascript_tool` is the verification path.
  buildmymtb.com serving over HTTPS is confirmed via `location.origin` in a page eval.
- Empty/rebased branches look "unmerged": after a coordinator rebase, `branch -d` fails ("not fully
  merged") though the content is on main — confirm with a content grep, then `branch -D`.
- The app hops the shared checkout onto `claude/*` branches / detached HEADs as sessions spawn — harmless;
  reattach `main` between waves, never mid-wave. Run `git worktree list` before switching branches.
- Night-shift-style orchestrators can go idle-dry and leave AGENT branches unpushed (harvested this session:
  `night-groupset-components`, `night-verify-suspension-tails-2`) — after archiving a grind session, grep
  `git branch` for un-harvested `night-*`/agent branches before declaring done.
- `buildTotals` skips a bundled group's non-fill slots (why BB + headset are their own optional groups).
- tsc "union too complex": the `// @ts-ignore` above `var PARTS_RAW` is the only working fix.
- Chips inherit the model PICKER at click time regardless of the title — keep the default picker on Sonnet;
  flip up only for the coordinator seat. Verify running orchestrators' model via `get_session`.

## 7. Session log — 2026-07-11 (this coordinator)

Harvested the overnight run (rail-refine, budget-demo fix, list package) → shipped the always-visible rail +
inch labels, the visible Reset + category sub-filters (fork travel / shock stroke+spring / dropper dia+drop
/ bar dia / BB threaded-pressfit / drivetrain elec-mech), DH-first disciplines → coordinated overnight fleet
(night shift, expansion, PDFs) → delivered LLC/domain/manufacturer-data playbooks → **domain cutover
(buildmymtb.com live)** → groupset SKU audit → **Groupset Full/Assembled split** (Eagle 90 verified $735 +
crank fixes) → **BuildMyMTB rebrand + bike-parts copy** → harvested stranded night-shift branches. Main
never went red; every push deployed green; every schema/UI change was staged for Douglas's eyeball or he
said ship-it directly.
