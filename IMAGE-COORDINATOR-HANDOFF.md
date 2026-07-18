# BuildMyMTB — Image Coordinator Handoff

_Created 2026-07-18 by Main Coordinator seat 13, at Douglas's direction: the product-image
program gets its OWN long-lived session so it doesn't compete for attention with catalog/engine/
UI coordination. Read this end-to-end, then `CLAUDE.md`, then the memory topic files named below,
before doing anything._

---

## 0. What you are

You are the **Image Coordinator** — a third long-lived session alongside the **Main Coordinator**
(code/catalog/engine/UI, the only session that pushes code) and the **Affiliate Setup** session
(business/LLC/affiliate networks/manufacturer outreach). You own the **product-image program**
end to end: architecture, the ImageService project, provider strategy, image legal posture,
acquisition workflow, and the eventual wiring of images into the live catalog.

**Douglas's framing (memory `product-images-priority.md`, his words 2026-07-18):** *"You are
underestimating how important images are to users. MTBers and riders alike love seeing different
parts, the color options, etc."* Images are **core product** for this audience — colorway/finish
browsing is primary rider behavior, not decoration on top of the compat engine. He has since
declared images **high priority** and wants them **ASAP**.

### Your lane vs the other two

| Lane | Owns |
|---|---|
| **Main Coordinator** | Catalog data, compat engine, schema, UI/design, all merges to `main`. **The only session that pushes code.** |
| **Image Coordinator (you)** | The image program: ImageService design + build, provider strategy, image legal posture, acquisition/replacement workflow, image metadata model, per-brand image coverage. |
| **Affiliate Setup** | LLC/EIN/banking, affiliate network applications, manufacturer partnership outreach (**including the image-permission ask** — that's their outreach channel, your requirement). |

**Boundary rules:**
- You do **not** push code to `main`. When your work produces a branch that must land in the
  BuildMyMTB repo (e.g. wiring `image` URLs into the catalog, or a UI change to render them), you
  present it to the **Main Coordinator**, who reviews, gates and pushes — exactly like a worker
  branch. The one-pusher rule is intact and load-bearing.
- ImageService itself is a **separate repo** (Douglas's architecture directive) — once it exists,
  you own it directly and the one-pusher rule does not bind you there. Confirm that repo's
  creation and push rights with Douglas before assuming it.
- **Manufacturer image-permission asks go through the Affiliate session**, not you directly —
  they already hold the outreach kit and the relationship. You define WHAT to ask for (asset
  formats, license scope, channel); they run the conversation. Coordinate via `send_message`.
- Both other sessions have been told you exist (2026-07-18).

---

## 1. Where the program stands right now

**Nothing has been built or acquired. Zero images exist.** The catalog's `image` field exists on
parts (`schema.js`/`types.js`, landed 2026-07-07) and is **empty on every row**, deliberately
waiting for exactly this program. No image has ever been fetched, downloaded, or hotlinked.

**Douglas has delivered two specification documents** (both in this conversation's history; the
source PDFs are in `C:\Users\Douglas\Downloads\`):

1. **"Repository & Project Structure"** — the architecture directive. ImageService as a
   completely independent project/repo, **not** a folder inside BuildMyMTB; API-first; a reusable
   platform intended to power images for future sites (road, gravel, BMX, snowboard, ski, camping,
   automotive, electronics). Structure sketch: `API/ Providers/ Processing/ Queue/ Metadata/
   Storage/ Configuration/ Logging/ Tests/ Documentation/`. It owns discovery, source
   prioritization, verification, download, processing, optimization, thumbnails, metadata,
   dedup, replacement workflows, queue, provider orchestration, logging, storage, caching, rate
   limiting. Favor generic naming, config-driven behavior, loose coupling, DI, interface-based
   design, comprehensive docs, automated testing, **extensibility over convenience**. Avoid
   MTB-only assumptions unless isolated behind config/providers.
2. **"Temporary Image Strategy"** — launch-speed directive. Temporary images are explicit
   placeholders giving users a functional experience while official sources are established; they
   are an **intermediate state, never the permanent library**. Long-term priority order: official
   manufacturer APIs > official manufacturer media libraries > affiliate image feeds >
   manufacturer-approved sources. ImageService must track each image's source, its
   temporary-vs-official state, full metadata, and an audit trail; and must **automatically**
   replace a temporary image when a better-tier source appears — archiving the prior version and
   updating metadata with no manual intervention. Acquisition quality rules: highest-quality
   product image available; **avoid** user-generated content, review images, blogs, forums,
   auction sites, social media, watermarked images, and lifestyle photography.

### Main Coordinator's review of that architecture (delivered to Douglas 2026-07-18)

Recorded so you don't re-derive it. **Strengths:** separate repo is right — it keeps BuildMyMTB's
zero-dependency static model untouched while ImageService gets real deps and its own cadence; the
provider interface is the correct shape for the legal reality (manufacturer grants, affiliate
feeds, manual uploads = three providers, one interface — when AvantLink opens ~Nov that's a new
provider, not a new system); API-first + config-driven genuinely supports the multi-site vision
(road/gravel/BMX already exist in the repo).

**Two amendments proposed (test them, don't rubber-stamp):**
1. **The site must never call a live API at page-serve time.** BuildMyMTB is a static,
   zero-runtime-dependency site — that's why it's fast, free to host and can't go down.
   ImageService's API should serve *management/tooling*; the **serving path stays static** —
   processed images publish to CDN URLs carried in the catalog's existing `image` field. If
   ImageService is down, nothing user-facing breaks. This narrows Douglas's "communicate
   exclusively through its public API" to *management*, never the page path.
2. **Enterprise-shaped interfaces, minimal first implementations.** Queue orchestration, rate
   limiting and caching layers are v2+; v1 can use the proven resumable job-file pattern from
   `tools/verify-job.js` (checkpointed, atomic, zero deps). Douglas's own "extensibility over
   convenience" supports this: extensible *interfaces* now, simple *implementations* first.

Also note the architecture PDF sketches `BuildMyMTB/ Backend API/ Database/ Authentication/
Admin/` — most of that **does not exist** (Supabase is the only backend). Treat it as
future-state, not current-state.

---

## 2. ⚠ THE OPEN CONFLICT — read before any acquisition work

**This is the single most important item in this document. Do not let it get resolved by
default, by momentum, or by a spec document.**

Douglas's own affiliate-lane research (2026-07-18, same week, recorded in memory
`product-images-priority.md`) established a standing ruling: **scraping or hotlinking
manufacturer or retailer product images is ruled out** — copyright infringement risk, and it
poisons the manufacturer-partnership lane the Affiliate session is actively preparing. Press-kit
images (editorial-use-only) and own photography were also ruled out.

The **Temporary Image Strategy directive, in practice, requires acquiring maker/retailer product
images without prior permission.** That is in direct tension with the standing ruling.

Two facts stated once, plainly, without drama:
- "Temporary, with intent to replace" does not change the copyright status of a copy while it is
  published.
- DMCA safe harbor principally protects platforms hosting **user**-uploaded content; it is a weak
  shield for images the operator itself downloaded and published. **This warrants a real
  conversation with counsel before Tier B ships** — not an AI judgment call, and nothing in this
  document is legal advice.

**Douglas may legitimately decide launch speed is worth the risk. That is a business call and it
is his to make.** The Main Coordinator's position — inherit it — is only that the decision must be
*made explicitly and on the record*, never absorbed as an unexamined side effect of implementing
a spec.

### The two-tier proposal put to Douglas (awaiting his word)

Also flagged: the Temporary Image Strategy references *"the approved provider order defined
elsewhere in this specification"* — **that document was never delivered to the coordinator.** Ask
Douglas for it; if it doesn't exist, the order below is the proposal awaiting his sign-off.

**Tier A — legal-clean, can start immediately:**
1. **Manufacturer permission fast-track** — the Affiliate session's outreach kit already contains
   the image ask; enthusiast brands (RAAW, Commencal, Cotic class) answer in days–weeks. Each
   "yes" unlocks that brand's entire line as *official* images.
2. **Openly-licensed images** (CC / Wikimedia, attribution preserved) — low coverage, clean.
3. **Affiliate feeds + Amazon PA-API** — the bulk solution; gated on network acceptance (~Nov
   2026 per the AvantLink window).

**Tier B — risk-accepted, ONLY on Douglas's explicit recorded word:** unlicensed temporary
acquisition per his priority order, with containment baked in from day one:
- instant-honor **takedown / opt-out workflow** (propagation time is a design requirement);
- a **partner-brand exclusion list** so outreach never lands on a brand whose images we took;
- **DMCA agent registration** for the LLC;
- **never** strip watermarks or launder image metadata;
- visible **source attribution**.

**Current status: Tier B is DESIGNED-BUT-GATED. Do not implement it in any milestone until
Douglas confirms on the record.** Design it fully so that enabling it is a config flip rather
than a rebuild — that is the whole point of the provider architecture.

---

## 3. Douglas's process for this program (he set it explicitly)

His six steps, with an **approval gate** in the middle:

1. ✅ Review the architecture for strengths/weaknesses/simplifications — **done**, §1 above.
2. ⏳ **Produce the detailed technical design document** — module diagrams, data flow, API
   contracts, database schema, provider interfaces. **This is your immediate next action** (the
   ready-to-dispatch brief is in §5).
3. ✅ Identify risks and tradeoffs (performance, maintainability, testing, legal, scalability) —
   delivered in summary; the TDD deepens it.
4. ⏳ Recommend improvements + any tools/plugins/connectors, **and wait for his approval**.
5. 🔒 **Only after approval** — generate the implementation roadmap with milestones.
6. 🔒 Then begin coding **one milestone at a time**, with tests and documentation.

**Do not skip or blur the gate at step 4.** He wrote it deliberately.

### Recommendations already put to him (steps 4, awaiting answers)

- **New GitHub repo `ImageService`** — his account or the D-Dubs Works org. His creation call, or
  his word to create it via `gh`.
- **Storage: Cloudflare R2 recommended** (already on Cloudflare; zero egress fees) vs **Supabase
  Storage** (already in stack, simpler, egress-billed). The TDD carries the full comparison. If R2
  wins, `wrangler` CLI + an API token is the one new tool needed.
- **`sharp`** for processing, inside ImageService (fine there — separate repo, own conventions).
- **No new connectors needed.** Bright Data / Exa stay **research-only** (verifying provider
  pages) — explicitly *not* image acquisition tools.

### The three one-liners he still owes you

1. **Tier B: confirmed, or Tier A only for now?** (Or: does the "provider order defined
   elsewhere" document exist — please send it.)
2. **If Tier B: are the containment measures in §2 approved as listed?**
3. **May the Affiliate session be pinged now to fast-track image-permission outreach?** (Fastest
   path to real pixels under either tier.)

---

## 4. Rules you inherit (non-negotiable)

- **NO E-BIKES in the MTB catalog, ever** (rule amended 2026-07-18: e-bikes are *contained* to a
  future separate BuildMyEMTB surface; the MTB catalog stays e-free permanently). Image work must
  not introduce e-bike product imagery into MTB rows.
- **NO POP-UPS, EVER** — no image lightbox may auto-appear; click-triggered only.
- **UNBIASED is load-bearing (doubled in his values).** Brands with images will visually outrank
  brands without. **Per-brand image coverage becomes a standing bias-audit dimension**, and skew
  is fixed by *adding* coverage, never by hiding. Temporary-tier acquisition especially risks
  skewing toward easily-acquirable brands — design a coverage report from day one.
- **Never fabricate.** A blank beats an invented value; an absent image beats a wrong-part image.
  Image-to-part matching accuracy is a correctness problem, not a cosmetic one — a photo of the
  wrong variant is a false claim about a product, in the same family as a false compat verdict.
- **Every image carries license provenance** (grantor, date, scope, evidence) — the image-side
  twin of the catalog's `verified`/`source` pattern. Required for official; source URL +
  acquisition basis recorded for temporary.
- **Douglas's code creed:** tidy, clean, efficient, unbreakable.
- **★ WORK DELIVERY — PASTE-READY BLOCKS, NOT CLICK-CHIPS (Douglas, 2026-07-18):** hand every
  worker task to him as a **fenced copy-paste prompt block** led by a `[Model, effort]` header, so
  he controls the model and effort at dispatch time. **Do not use `spawn_task` click-chips** — a
  chip inherits whatever his picker happens to be set to. Also in `CLAUDE.md` (Hard rules) and
  memory `parallel-work-delivery.md`.
- **Never prompt Douglas from a worker session** — bake a never-ask clause into every brief;
  workers decide per THE BAR and log open questions for your report.
- **Workers present branches; they never push.** State the *why* in the brief (the coordinator's
  independent review is the quality gate) — a worker self-pushed once despite the instruction.
- **Unique worktree suffixes in every brief** (shared deterministic paths caused collisions
  twice), and never at `D:\` root; never git-mutate the shared checkout `D:\MTB Bike Builder`
  (it sits on a stale branch pointer by prior accident — leave it).

---

## 5. YOUR IMMEDIATE NEXT ACTION — dispatch the TDD

Paste-ready block below (per the new delivery rule). It is the design round v2, already updated
to fold in the Temporary Image Strategy. **Dispatching it is Douglas's green-light on the
architectural direction in §1** — confirm he's happy with that framing before you send it, since
he may want the Tier A/B answer settled first (the brief handles either way: Tier B is designed
but gated).

```
[Fable, high effort] IMAGESERVICE TECHNICAL DESIGN ROUND v2 — docs only, NO product code, NO
image fetching of any kind. Image Coordinator reviews; Douglas approves before any roadmap/
implementation. Branch design/imageservice-tdd-1 off origin/main in a fresh worktree with a
UNIQUE suffix (img-<4 hex>), never at D:\ root, never the shared checkout. NEVER prompt the user
(no AskUserQuestion — decide per THE BAR and log open questions for the coordinator's report).
NEVER push — present via send_message to the Image Coordinator.

CONTEXT (read in order): (1) IMAGE-COORDINATOR-HANDOFF.md at the repo root — the whole program
brief, especially §1 (architecture + the two coordinator amendments) and §2 (the open legal
conflict and the Tier A/B split). (2) Memory file product-images-priority.md
(C:\Users\Douglas\.claude\projects\D--MTB-Bike-Builder\memory\). (3) CLAUDE.md + the existing
empty `image` field (schema.js/types.js). (4) tools/verify-job.js — the proven resumable
job-file queue pattern.

DELIVERABLE: data/IMAGESERVICE-DESIGN.md (mermaid diagrams inline), a full TDD: module diagram;
end-to-end data flow (acquisition -> processing -> publish -> site render -> replacement); full
API contract (acquisition requests, image/metadata reads, replace/refresh, thumbnails, provider
status, logs, reprocess); database schema INCLUDING the image lifecycle — per-image state
(placeholder | temporary | official), license class + license_provenance (grantor/date/scope/
evidence REQUIRED for official; source URL + acquisition basis for temporary), version history
(replacement ARCHIVES the prior version, never deletes), audit log of every acquisition/
replacement/takedown; the REPLACEMENT AUTOMATION design (trigger: a higher-tier source becomes
available -> auto-replace + archive + metadata update; decide content-addressed vs slot-stable
URLs and DEFEND the choice); a PER-BRAND CONTROL PLANE (exclusion list; takedown/opt-out honored
immediately — propagation time is a design requirement); provider interface (TypeScript-style)
with concrete specs for manual/granted-assets, manufacturer-grant, affiliate-datafeed (Nov,
stub), and a TEMPORARY-ACQUISITION provider that is DESIGNED BUT EXPLICITLY GATED — mark it
DOUGLAS-GATED: DO NOT IMPLEMENT until his recorded confirmation, because its legal basis
conflicts with a standing ruling; design it fully anyway (source ranking per his priority order,
quality rules, dedup, provenance) so the gate is a config flip, not a rebuild. Processing
pipeline spec (sharp; renditions; 10-20KB thumbnail budget; perceptual-hash dedup; NEVER strip
watermarks or launder image metadata). Storage comparison Cloudflare R2 vs Supabase Storage with
a recommendation. Test the two coordinator steers HONESTLY (static serving path — the site never
calls a live API at page-serve time, images are CDN URLs in the catalog `image` field; v1 =
job-file queue before infra queue) — reject either with reasons if your analysis fails them.
RISKS: legal (temporary-tier exposure analysis — factual, no scare language, no legal-advice
framing; DMCA safe-harbor limits for operator-acquired content noted as a fact to verify with
counsel), bias (per-brand coverage skew as a standing audit dimension + a coverage report
design), image-to-part matching accuracy (a wrong-variant photo is a false product claim),
performance (lazy load, explicit dimensions, CLS), testing (provider mocks, golden-file pipeline
tests), scalability. ALTERNATIVES-CONSIDERED for every major call. OPEN QUESTIONS FOR DOUGLAS
(compact, decision-shaped) — the temporary-provider gate is item 1.

BOUNDS: no product code, no repo creation, no schema.js/compat.js/index.html edits, no
tools/verification-job.json touch, no e-bike content, and NO fetching or downloading of any
product image from anywhere. Gates before presenting (no-ops for a docs branch, but prove it):
node validate.js (7 OK lines), npm test, npx tsc --noEmit. Commit per major section. Report:
branch, doc path, top 5 design calls, any coordinator steer you rejected and why, open questions.
```

---

## 6. Operating notes inherited from the coordinator seats

- **Seed a worktree, never work at `D:\` root:** `git fetch origin; git worktree add
  .claude/worktrees/img-<today> -b img/<today> origin/main`.
- **Gates before anything is presented as done:** `node validate.js` (expect 7 OK lines, 0
  problems), `npm test`, `npx tsc --noEmit`. Never trust counts written in docs — they drift; run
  the commands.
- **Cross-session messaging is pre-authorized** (Douglas's standing grant 2026-07-18): message the
  Main Coordinator and Affiliate sessions freely, and they may message you.
- **`_PDFs/` is the single home for every project PDF**; generate via headless Chrome
  `--print-to-pdf`.
- **PushNotification policy:** merges gone live / decisions needed / session errors / credit
  exhaustion **only** — never routine ticks.
- **Keep Douglas's updates SHORT** — action lists and one-liner decisions, not reports.
- **Archive finished worker sessions as you go**; auto-archive is pre-authorized once work is
  fully harvested. Never `git worktree remove` a worktree while any session might still be using
  it (`git worktree list` first) — an orphaned worktree silently falls through to the shared
  checkout.
- **Memory:** write/update topic files as events happen (liberally, keep them tidy). The image
  program's topic file is `product-images-priority.md`; the lane protocol is
  `multi-session-coordination.md`.

---

## 7. Reading list (in order)

1. This document.
2. `CLAUDE.md` — Hard rules + conventions + the data model (note the `image` field).
3. Memory: `product-images-priority.md` (program history + legal rulings),
   `multi-session-coordination.md` (the three-lane protocol), `product-values.md` (UNBIASED is
   doubled and load-bearing), `parallel-work-delivery.md` (paste-block delivery, never-prompt,
   present-don't-push), `affiliate-push.md` (the `image`/`retailerLinks` infra + network timing).
4. `PROJECT-LOG.md` — the 2026-07-18 entries for how the program was kicked off.
5. `COORDINATOR-HANDOFF.md` §SEAT 13 — for the surrounding project state, if you want the wider
   picture.
