# Douglas's Rules & Standing Orders

*A single reference collecting every rule, hard rule, standing order and ruling Douglas has
given for TrailBuilder / BuildMyMTB, so he can read them all in one place. Compiled 2026-07-23.
Quotes are his own words where available. Every entry cites the date and source file it came
from. Nothing here is invented, softened, or "improved" — where two rulings conflict or one
supersedes another, that is flagged explicitly rather than silently resolved.*

---

## 1. Non-negotiable hard rules

These are ranked as absolute — CLAUDE.md calls them "Hard rules (Douglas — non-negotiable)."

### 1.1 No pop-up ads or unsolicited pop-ups, ever
**2026-07-12, verbatim:** *"no unexpected pop up ads and shit"* / *"never a pop up, not for
anything... i hate that so bad, its ruined the internet."* The site loads straight to the data —
never an ad, newsletter/promo/cookie interstitial, or any auto-appearing pop-up, for any reason,
under any monetization pattern.

**Nuance (his own clarification):** click-triggered cards/tabs/modals the user opens themselves
(a part's spec card, the login dialog) are explicitly fine — those aren't pop-ups, the user asked
for them. What's banned is anything that appears *without* the user asking.
— Source: `CLAUDE.md` Hard rule 2; memory `hard-rules-ebikes-popups`.

### 1.2 Catalog scope — all surfaces are equal, first-class catalogs
All six live surfaces (MTB, BMX, road, gravel, EMTB, kit) get the same breadth/depth/verification
investment. MTB is the quality *reference example* other catalogs are held to, **not** a priority
ranked above them — see §4.1 for the full history of this ruling (it changed twice). A genuinely
new bike type still starts off-live (a separate, unwired dataset) until Douglas says go — the one
remaining gate.

**One catalog per surface (Hard rule 1).** Each bike type lives in its own dataset with its own
schema/validator and page — MTB `src/compat.js`, BMX `data/bmx.js`, road `data/road.js`, gravel
`data/gravel.js`, EMTB `data/emtb.js`, kit `src/kit.js` — and catalogs do not bleed into each
other. A bike belongs to the catalog for its own type; that is plain architecture applied
identically to every surface, **not** a restriction on any particular type. The one sanctioned
exception is a genuine crossover bike, which may carry its own row in each relevant catalog with
its own id (§4.x, 2026-07-23). Enforced by `test/test-emtb-containment.js` and the per-catalog
validators.

> **Retired 2026-07-23 (Douglas's word):** there was previously a separate hard rule singling out
> e-bikes as "contained." He directed that it be removed — e-bikes are no longer framed as a
> special case anywhere. E-MTBs live in `data/emtb.js` for exactly the same reason BMX frames live
> in `data/bmx.js`. The full history of that rule's evolution is kept in §4.1 and §7 as a record
> only, not as current policy.
— Source: `CLAUDE.md` Hard rules 1 + 3; memory `mtb-flagship-priority`, `crossover-bike-dual-catalog`.

### 1.3 Work is handed off as paste-ready prompt blocks, never click-chips
**2026-07-18, verbatim:** *"I like chips that I have to copy and paste myself instead of click so
I can make sure it's on the right model and effort. Bake that into the project's rules."* Every
worker task goes to Douglas as a fenced copy-paste prompt block whose first line is a
`[Model, effort]` header, so **he** sets the model and effort in his picker before dispatching.
`spawn_task` click-chips are banned — a chip inherits whatever the picker happens to be set to at
click time, which has silently run grind work on premium models and premium work on Sonnet.
— Source: `CLAUDE.md` Hard rule 4; memory `parallel-work-delivery`.

### 1.4 File containment
**2026-07-18, emphatic:** sessions "can only save and read files inside `D:\MTB Bike Builder`" —
no random folders anywhere else on his drive, ever. Worktrees go at `.claude/worktrees/<unique
name>` inside the project. The harness-managed temp scratchpad is the only exception. Enforced by
a PreToolUse hook (`tools/hooks/guard-worktree-path.js`), hardened twice (2026-07-21, 2026-07-22)
after strays leaked to `D:\` root.
— Source: `CLAUDE.md` Hard rule 5; memory `file-containment-rule`.

### 1.5 Never defeat anti-bot protection or CAPTCHAs
**2026-07-18, verbatim:** *"lets keep it ethical so not to upset any partners. if something
becomes a huge roadblock down the line, let me know and we can revisit."* Never defeat anti-bot
protection or CAPTCHAs, on any brand, for any spec or price — the rule is about the mechanism
(bypassing detection), not the intent (even "public marketing page, low volume" doesn't excuse
it). Rendering JavaScript is *not* circumvention; defeating a bot-wall *is*. An active anti-bot
challenge is a documented wall, not a task to route around — escalate to Douglas if it becomes a
genuine roadblock, never solve it quietly either way.
— Source: memory `fetch-ethics-ruling`.

---

## 2. Product values & data honesty

### 2.1 Unbiased, doubled and load-bearing
**2026-07-11, verbatim:** *"tidy, clean, efficient, good data, easy ui, unbiased,
unfuckingbiased, pleasant design."* The doubled "unbiased" is deliberate.

**Reaffirmed 2026-07-15, verbatim:** *"I want this website to be trustworthy, with accurate
data, no bias, just a tool for users to help them build or have fun."*

**Mission statement (Douglas picked draft B, 2026-07-19, canonical, use verbatim — never
paraphrase into overclaim):** *"BuildMyMTB is a free, unbiased bike-building tool with accurate
data: it tells you whether parts fit together, what they cost, and what they weigh — verified
against the people who make them, favoring no manufacturer, and honest about what it doesn't yet
know."*
— Source: memory `product-values`.

### 2.2 Never fabricate data to fill a field
A missing value beats a plausible-but-invented one, applied to every field, not just compat
verdicts. Concrete rule this produced: `modelYear` is populated only where a product has a real
annual model/generation, maker-sourced — left blank for year-agnostic parts rather than stamped
with a fake year.
— Source: memory `product-values`.

### 2.3 More-info principle
**2026-07-19, verbatim intent:** *"I would want to err on the side of more info (assuming it's
accurate) rather than less… It doesn't mean we have to blow up the interfaces with nonsense no
one cares about though."* Gather every accurate data point liberally; curate at the interface,
not at data-gathering. Data liberal, UI curated.
— Source: memory `product-values`.

### 2.4 Pricing rule — always current MSRP
**2026-07-11:** always use the current manufacturer MSRP, not the launch MSRP — "verified"
requires the price to match the live maker page.
— Source: memory `product-values`.

### 2.5 Manufacturer-bias audits are a standing, recurring process
**2026-07-11, verbatim:** *"keep ethical checks baked in every so often to make sure we aren't
showing bias towards any particular manufacturers."* Periodic ethical audits (Opus) hunting for
brand-favoring logic in the compat engine, catalog data, UI/ordering, and copy. Cadence: after
each major catalog wave and roughly monthly.
— Source: memory `manufacturer-bias-audits`.

### 2.6 Future marketplace must be security-first
Douglas wants an eventual buy/sell marketplace whose hard requirement is being secure against
scammers/fraud from day one — identity/seller verification, escrow or a trusted processor
(never touch card data directly), fraud detection, dispute resolution, moderation.
— Source: memory `product-values`.

### 2.7 Affiliate funding must never bias the product
Affiliate/partner deals may fund the site but must never bias fit verdicts, brand representation,
or default sort.
— Source: memory `product-values`, `manufacturer-bias-audits`.

### 2.8 THE BAR — a wrong verdict is worse than a missing part, in both directions
**Standing doctrine, committed in `COORDINATOR-HANDOFF.md` §3, non-negotiable:** a wrong
compatibility verdict is worse than a missing part — in **both** directions (a false "won't fit"
is as bad as a false "fits"). Any new or strengthened error-tier rule needs a fetched maker
source, a pinning test, and an adversarial audit before it ships. Never weaken a test to make a
change pass — evolve a test only to encode a corrected truth. Catalog ids are append-only:
`ALIASES` retires an id, `status:'discontinued'` + `supersededBy` marks a genuine product
replacement — the two mechanisms are not interchangeable, and using the wrong one for the wrong
case is a mistake to watch for.
— Source: `CLAUDE.md` "The golden rule"; `COORDINATOR-HANDOFF.md` §3 "THE BAR."

### 2.9 The north star, in his own words
**"We are building the best bike website."** All information must be trustable; quality over
speed; patience over rushing a wave to look finished.
— Source: `COORDINATOR-HANDOFF.md` §2.

---

## 3. How work is delivered

### 3.1 Paste-blocks, model+effort headers, ready-only
See §1.4 for the hard rule itself. Two further refinements:

**Chip effort calibration is a deliberate judgment call every time (2026-07-23, verbatim):**
*"moving forward in the project as a whole, make sure any chips are offered with the best
recommended model and effort."* Never default in either direction — not inflated to look
thorough, not lazily downgraded to look cheap. State the WHY in one line whenever going above
medium effort. **"ultracode" is not an effort tier** — it's the keyword that opts a turn into
multi-agent workflow orchestration; reserve it for genuinely broad parallel sweeps.
— Source: memory `chip-effort-calibration`.

**Ready-only delivery (2026-07-23, verbatim):** *"I paste them immediately so i don't forget, so
please hold off on giving me it until it's clear to go."* Never hand Douglas a chip whose
lane is occupied or that must wait on another to merge first — only present a chip the instant
it's clear to dispatch. No previews, no "round after" teasers, no "hold this until X merges."
— Source: memory `chip-delivery-ready-only`.

### 3.2 Workers never prompt Douglas
**2026-07-16:** grind/worker chips must never prompt Douglas for input — decide per THE BAR
(drop/blank/skip + log for the coordinator's report); no `AskUserQuestion` from a worker.
— Source: memory `parallel-work-delivery`.

### 3.3 The coordinator seat coordinates only — never runs tasks
**2026-07-11, reaffirmed emphatically same day, and again 2026-07-18 (verbatim): "I never want
tasks to run in the coordinator... bake that in."** No in-session background `Agent`/subagent
spawned to do task work (audits, grind, features) — that runs the task inside the coordinator
seat, metering against it and bloating its context. No exceptions by inference: even a message
that reads like "you do it" means write paste-ready chip blocks for Douglas to dispatch, unless he
explicitly overrides this rule in so many words. The coordinator's only in-seat work: review,
merge, gates, small direct UI/doc edits, session management, decision packets.
— Source: memory `workflow-preferences`, `parallel-work-delivery`.

### 3.4 Branch → gates → verify → offer merge; he merges
Do work on a branch, verify (four gates + browser when UI), commit with detailed messages, then
present — Douglas says "merge" explicitly (fast-forward preferred, branch deleted after). He
tests personally at `localhost:8123`; always remind him to hard-refresh (Ctrl+Shift+R).
— Source: memory `workflow-preferences`.

**UI/visual auto-ships on green gates (2026-07-11):** a UI worker may push straight to live
`main` once all four gates pass — UI taste is no longer a pre-ship eyeball gate. Schema still
needs his sign-off; security still stages + adversarial-audits + he runs the migration; catalog
data still merges through the coordinator's gates + per-id diff.
— Source: memory `workflow-preferences`.

### 3.5 Answer-first rule
**2026-07-18, corrected twice in one session, verbatim:** *"if i ask a simple question and you
also have another task to do, prioritize answering my question"* and, after a repeat offense,
*"i specifically asked you to start answering my questions first."* Deferred-but-in-the-same-reply
is not compliance — the answer leads, the work follows.
— Source: memory `workflow-preferences`.

### 3.6 Session hygiene: close sessions as you go, use memory liberally
**2026-07-11 standing orders:** (1) a new coordinator session archives the previous coordinator
as its first housekeeping act, no manual ask needed; (2) close finished sessions as you go
(report → harvest → archive) — *"we like to be tidy"*; (3) sweep branches/worktrees/launch.json
entries the moment work lands; (4) code creed baked into every worker brief: *tidy, clean,
efficient, unbreakable*.

**2026-07-18 high-fleet-load grants:** sweep every hour when the fleet is big; use memory
liberally (write/update as events happen, keep it pruned); auto-archive a fully-harvested session
without asking first.

**Archives batch last, never mid-loop (2026-07-21, verbatim):** *"don't wait for me to click the
archive button if other sessions need work, it delays progress, finish up the others as well in
that instance so i can rapidly click them all."* Run the full harvest loop for all pending reports
first, then fire every archive call together in one final batch.
— Source: memory `workflow-preferences`, `parallel-work-delivery`.

### 3.7 Coordinator succession protocol
**2026-07-18:** coordinator sessions are titled "Main Coordinator (Seat N)." At every handoff the
incoming seat automatically archives the predecessor, and gets itself titled "Main Coordinator
(Seat N+1)" — *"so I don't have to manually do it every time."*

**Rule 5 (2026-07-21, permanent, verbatim):** *"make sure any outstanding questions for me will
be saved for the next coordinator... make sure the next coordinator knows to do the same when it
is wrapping up as well."* Every retiring seat consolidates all outstanding Douglas questions into
HANDOFF-CHIPS.md's open-question queue and commits it before writing its handoff block — nothing
may live only in the retiring conversation.
— Source: memory `coordinator-succession-protocol`.

### 3.8 Parallel-session lane boundaries
When more than one long-lived session runs in parallel (Main Coordinator + a business/affiliate
lane), each stays in its lane, checks `list_sessions` before ambiguous work, and uses
`send_message` for anything cross-lane. Standing worker-messaging grant (2026-07-18): the
coordinator may message any session spawned from its chips without per-message pre-asking.
— Source: memory `multi-session-coordination`.

### 3.9 Hardware — don't throttle for resources
**2026-07-10, verbatim:** *"My computer specs are high and I have a ton of memory, so don't be
afraid to use it."* Up to 36GB RAM explicitly granted. Parallelism decisions shouldn't be
conservatively throttled; spawn all disjoint cluster workers simultaneously.
— Source: memory `hardware-capacity`.

### 3.9a PushNotification policy
**Standing rule (Douglas 2026-07-17):** push notifications fire ONLY for merges-gone-live,
decisions-needed, session-errors, and credit-exhaustion — never for routine progress ticks.
— Source: `COORDINATOR-HANDOFF.md`, seat-12 rules; memory `notify-missing-tools`.

### 3.9b Workers use the in-app Browser pane only
**Ruled seat 20 (2026-07-23), his word:** worker sessions use the in-app Browser pane exclusively
for web verification. `claude-in-chrome` drives Douglas's own personal Chrome (with his logged-in
sessions) and is not for worker/grind use. Baked into chip boilerplate.
— Source: `COORDINATOR-HANDOFF.md`, seat-20 rules.

### 3.9c No browser downloads, ever
Standing chip-boilerplate rule (added after Chrome download prompts landed unwanted files in
Douglas's Downloads folder): sessions must never trigger a browser download.
— Source: `COORDINATOR-HANDOFF.md`, seat-19 rules.

### 3.9d Issue-closing requires his explicit, current-turn confirmation
Closing a GitHub issue (`gh issue close`) requires Douglas's explicit, plain confirmation given in
the *current* turn — the permission classifier blocks it if the authorization would have to be
inferred from earlier context.
— Source: `COORDINATOR-HANDOFF.md` §2.

### 3.10 Notify on tool failures and gaps — persistently
**2026-07-12, verbatim:** *"if any tools you need that are available to you but I haven't enabled
them yet, notify me. Persistently even. I want you at your best."* **Extended 2026-07-22:** also
report the moment a connector/plugin fails (credit exhaustion, auth expiry, disconnect) — verify
first-hand before asserting a tool is broken — and flag dead-weight connectors.
— Source: memory `notify-missing-tools`.

---

## 4. Catalog & taxonomy rulings

### 4.1 ⚠ MTB-first priority ruling — changed twice (history matters)
**2026-07-18 (original, verbatim):** *"MTB is the highest priority now, I want to continue to make
that as complete as possible so it's the best reference example for everything else we do. If we
need to pause on the other disciplines due to resources we will."*

**2026-07-22 (first retirement, verbatim):** the pause-other-disciplines clause was retired — all
six live surfaces + striders get *"everyone treated fairly, equal, unbiased... take out any bias i
may have presented."*

**2026-07-23 (made explicit and total, verbatim):** *"stop minimizing e-exposure, i want the EMTB
site to be just as complete as the other sites"* and *"look to see if you have any records of
EMTB or Road bikes being less than equal and remove it."* MTB now stands **only** as the quality
reference example for verification rigor and engine correctness — it is not a priority ranking,
and any lingering "MTB-first / non-MTB design-only / needs-an-ask" framing found anywhere is a
stale artifact to correct on sight, not a live rule.
— Source: memory `mtb-flagship-priority`. *(This is the clearest example of a superseded ruling
in the whole corpus — the 2026-07-18 wording, if read alone, is now wrong.)*

### 4.2 Crossover bikes may live in both catalogs
**2026-07-23, verbatim:** *"appears in both."* A bike that genuinely straddles two disciplines
(e.g. an all-road/gravel adventure bike) gets a row in each relevant catalog, under its own
catalog-prefixed id — not an alias. Tag disciplines **honestly per catalog** — a bike that's
really gravel living in the road catalog gets `['allroad']` only, never an overclaimed `'road'`
tag to match its neighbors.
— Source: memory `crossover-bike-dual-catalog`.

### 4.3 Pricing display policy
**2026-07-16 ruling on a bias-audit finding:**
1. "Save vs. buying parts" is **always** computed from MSRP, never `streetPrice` — a recorded
   sale must not inflate the value badge or reorder "best value" rankings.
2. `streetPrice` is displayed as an explicitly labeled SALE price alongside MSRP — visible, never
   the basis of comparisons.
3. Retailer-exclusive SKUs stay in the catalog, filed under the manufacturer, with the
   exclusivity called out in the model name — never segregated or removed.

**EUR/GBP conversions (2026-07-18):** a row verified against a manufacturer's own EUR/GBP RRP
page is promotable — the stored USD price is the documented RRP conversion with source currency
+ figure noted, never a sale-price conversion.

**Verified badge on a complete bike — RULED (seat 20, 2026-07-23):** option (a) — the bike's own
build sheet and price must be independently verified; each individual fill on the bike shows its
own verification status rather than inheriting the bike's badge. This resolves what
`pricing-display-policy` had recorded as open ("let me come back to this").
— Source: memory `pricing-display-policy`; COORDINATOR-HANDOFF.md seat-20 rulings.

### 4.3a The Token Law — provenance tokens must mean exactly what they say
**Standing doctrine (COORDINATOR-HANDOFF.md, hardened seat 20 after 12 overreach catches in one
seat):** every price/spec provenance token is defined narrowly and must never be stretched:
- `msrp-confirmed` — the literal figure for *this exact SKU*, from the worker's own fetch. Never a
  range, a midpoint, an inference from a sibling SKU, or a converted figure.
- `third-party-listed` — a real, named listing. Never a retained placeholder/sample value dressed
  up as sourced.
- `regional-conversion` — the *maker's own* non-USD figure, converted with a disclosed rate and
  date. Never a retailer's price converted and passed off as maker-sourced.
- `discontinued-no-msrp` — only for a genuinely discontinued product, and only when
  `status:'discontinued'` is set in the same edit. A branch was rejected wholesale (seat 20) for
  stamping this token on 11 still-current products.
- `sourceType:'measured'` — a real scale reading, never a retailer spec line.
- A retained/inherited sample value gets **no token at all** — an untokened value is honest; a
  mistokened one is not.
— Source: COORDINATOR-HANDOFF.md, seat-20 "RULES EARNED" block.

### 4.3b A model-year refresh is a new row — never overwrite
**Ruled seat 20 (2026-07-23), the Canyon Sender CLLCTV MY27 case:** when a model gets a new
model-year refresh (same or changed spec), add it as a **new row** and keep the old one — never
overwrite the existing row. This generalizes the precedent already set by the Surly Straggler:
model-year history is real catalog history, not something to be silently replaced.
— Source: COORDINATOR-HANDOFF.md, seat-20 rulings.

### 4.3c Riese & Müller Superdelite — permanently excluded from EMTB
**Ruled seat 20 (2026-07-23):** the Riese & Müller Superdelite "mountain" variant is a touring
bike, not an e-MTB, despite an EC-conformity PDF labeling it "E-MTB." Douglas overruled that
label — the bike is permanently excluded from `data/emtb.js` and must never be re-added on a
future breadth pass. The exclusion is also noted in the file's own header.
— Source: COORDINATOR-HANDOFF.md, seat-20 rulings.

### 4.4 Catalog inclusion — real part, unfetchable page → include as unverified sample
**2026-07-11:** if a maker page can't be fetched, include the product anyway as a normal
unverified sample row using the best real spec from any credible source — no `verified:true`, no
`source` field. Still a true GAPS entry only if no plausible real spec exists anywhere, or the
part needs a vocabulary value that doesn't exist. Never invent a vocab value. This recurred once
(2026-07-12) when the coordinator reverted to the old strict rule from stale repo docs — the
lesson recorded: when a memory says "flag repo docs for update," actually do the doc edit.
— Source: memory `catalog-unverified-inclusion-policy`.

### 4.5 Verified flag integrity — findings and open rulings
2026-07-18 audit demoted 55 rows for using review/retailer sources, sample fields feeding
`checkBuild`, or a complete-bike price stored on a frame row. **Still open, awaiting Douglas's
ruling:** (1) whether sample/converted prices on 1,000+ verified rows should be formalized as
"price never blocks verification when no US MSRP exists" or demoted en masse; (2) the unwritten
frame interface-verification exception (VERIFY-PROTOCOL only lists shocks/wheels/forks).
— Source: memory `verified-flag-audit-findings`.

### 4.6 Kit Builder (BuildMyRideKit) — decided scope
**2026-07-14, verbatim:** *"I will want a 'KIT Builder' as well. Shoes, Pants/Shorts, Jersey's,
Gloves, Helmets, knee pads, body armour, elbow pads, etc... don't give me any of those chips
yet."* Decided: separate page (not an in-builder section); 12 categories, all optional, none
required (helmet, shoes, jersey, shorts, pants, gloves, knee pads, elbow pads, body armor, neck
brace, shin guards, eyewear) — no hydration, no base layers; no shoe↔pedal bridge (fully
independent of `checkBuild`); cert data is filter + badge only, never a compat verdict.

**Re-affirmed 2026-07-22:** *"no new categories in RideKit for now"* — a proposal to add
hydration/hip packs, socks, rain shells was declined; the 12 categories are the boundary until he
reopens it.
— Source: memory `kit-builder-directive`.

### 4.7 Rider gear always ships last in any builder list
**2026-07-20:** bikes first (live, then coming-soon), BuildMyRideKit always the last button in
any list of the builder family.
— Source: memory `home-page-decisions`.

### 4.8 BMX go-live parameters
**2026-07-17, "BMX go":** depth target ~300 parts / ~40% verified before flip (later revised —
see below); pivotal-seat rule stays a hard ERROR (a proposed veto was declined); button/page
named "BuildMyBMX," not "BMX Builder"; flip pre-authorized without a further approval round once
the bar was met.

**Flip bar revised 2026-07-18 (Option A):** accepted 226 rows / 26.1% verified as the honest
structural ceiling — BMX brands sell completes, not parts, so the verified fraction is
source-limited, not effort-limited.
— Source: memory `bmx-golive`.

### 4.9 The seat position — no bike requires a dropper
**2026-07-22, verbatim:** *"every bike requires some post and DH bikes often have rigid posts."*
The dropper slot and the rigid `seatpost` slot are treated as one physical position; completeness
asks for it once, filled by either. This retired the DH-discipline and `noStockDropper`
exemptions catalog-wide — every frame now requires exactly one seat slot.
— Source: `CLAUDE.md` data-model section (Douglas's ruling recorded there).

### 4.9a Visual theme rule — exactly four, RAD is exempt from site-wide treatments
**Decided 2026-07-14, shipped:** the header banner is "Topo Contours" for light/dark/Loam.
**Standing rule:** RAD is its own theme, keeps its own header/styling, and is exempt from
site-wide visual treatments — no other theme-level exceptions exist. There are exactly **four**
themes (light/dark/Loam/RAD) and no more may be added without his word. His stated taste: green
family settled, Loam is his favorite ("design Loam-first"), simplicity is a value but the current
chrome undershot it.
— Source: memory `style-direction-preferences`; `COORDINATOR-HANDOFF.md` header/theme rule.

### 4.9b Category icons — retired permanently, not redesigned
**2026-07-14:** after five redesign rounds, Douglas killed the category-icon direction entirely —
a realistic component glyph risks resembling one specific manufacturer's part, which is a bias
risk under the load-bearing unbiased value. The sidebar filter rail is text-only. Kept: the green
"🟢 Compatible only" toolbar toggle, which he explicitly still likes. Do not restart the old
icon-redesign effort.
— Source: memory `style-direction-preferences`.

### 4.10 Domain names and naming decisions
Owned domains: `buildmymtb.com` (live), `buildmybmx.com`, `buildmyemtb.com`,
`buildmygravelbike.com`, `buildmyroadbike.com`, `buildmyridekit.com`, `ddubsworks.com`. Road page
name confirmed = BuildMyRoadbike; kit surface rebranded BuildMyKit → **BuildMyRideKit**
(2026-07-19). Deliberately skipped: `buildmyfirstbike.com`/`firstbikefinder.com`,
`buildmytoolbox.com` backorder. **BuildMy\* domain redirects are held until every page is ready —
his word: "do them all at once."** Flip words for road.html + emtb.html were given 2026-07-20
evening under that phrase.
— Source: memory `domain-portfolio`, `home-page-decisions`.

---

## 5. Process & session rules

### 5.1 Answer-first, never-prompt-workers, coordinator-lean — see §3
(Cross-referenced here since they govern both delivery and day-to-day process; see §3.2, §3.3,
§3.5.)

### 5.2 File containment and worktree hygiene — see §1.4

### 5.3 Fetch ethics — see §1.5

### 5.4 Reviewer-grade audit trail
**2026-07-11:** Douglas wants "notes for everything we are doing along the way" so the entire
project can eventually be handed to another engineer/model to independently double-check
everything. The trail must live in the repo (session transcripts and memory don't travel with a
handoff): `PROJECT-LOG.md` (dated append-only log, one entry per wave/decision), `FOR-REVIEWERS.md`
(entry-point/map), `REVIEWER-DOSSIER.md` (comprehensive decision history). **Technical/project
trail only — personal and business material stays out** (real name, LLC/business PDFs,
credit-burn preferences).
— Source: memory `reviewer-audit-trail`.

### 5.5 PDF deliverables always go to one folder
**2026-07-12, consolidated 2026-07-13:** every PDF Douglas requests goes to
`D:/MTB Bike Builder/_PDFs/` — one consistent location. Reusable pipeline:
`scripts/md2pdf.py` (python-markdown → styled HTML → headless Chrome `--print-to-pdf`).
— Source: memory `pdf-deliverables-folder`.

### 5.6 Overnight autonomy
**2026-07-11:** approved running the grind overnight (~01:00→07:00) as long as results are
produced and usage isn't wasted. Night-shift Sonnet grinds + self-merges data rows; the
coordinator integrates and keeps main green, but cannot archive sessions / send_message / ship UI
without his approval overnight — those wait for him.
— Source: memory `product-values`, `parallel-work-delivery`.

### 5.7 Specialist-agent corpora — a proven pattern, with rules
Three (later six) persistent specialist agents exist on one architecture (`tools/<name>/` cited
corpus + `.claude/agents/<name>.md`, Opus, corpus-first, cite-or-decline). **Douglas's bar for the
mechanic specialist (2026-07-17, verbatim):** *"the type that would teach World Cup mechanics"* —
MASTER level. **Coach L4 decision (2026-07-18):** no paid PMBIA/BICP memberships, ever — the
coach's master bar is redefined as public-source-only mastery; do not re-raise the membership
question.
— Source: memory `specialist-corpora`, `mechanic-agent-toolbox`.

---

## 6. Standing reminders he asked for

### 6.1 Home page — do NOT act until he asks
**Standing TODO (2026-07-16):** a proper home page is planned but Douglas must be periodically,
gently reminded — do not build it until he asks. (Partially resolved 2026-07-20: D2c shipped at
`/home`, D2a shipped at ddubsworks.com — but the reminder duty about any *further* home-page work
carries forward until he explicitly closes it.)
— Source: memory `current-work-queue`, `home-page-decisions`.

### 6.2 Re-brainstorm round, due now
**2026-07-19, verbatim:** *"once we get closer to the end, I will want to run another
brainstorming session."* The trigger condition (the 8-feature slate shipping) was met
2026-07-21 — the round is his to schedule; keep reminding gently until he does.
— Source: memory `feature-slate-2026-07-19`.

### 6.3 Supabase pending SQL — remind him repeatedly
**2026-07-21, verbatim:** *"you will need to remind me of the supabase step later, i most likely
wont do it the next time you ask, but make sure that step is recorded."* Reserved-username SQL
seed files only take effect once he runs them (or, since 2026-07-22, authorizes the coordinator
to run them via the Supabase connector — a narrower authorization limited to the committed
`forum-reserved-*.sql` files). Tracking checklist lives in HANDOFF-CHIPS.md item 0.
— Source: memory `supabase-pending-sql`.

### 6.4 Open-questions PDF — never act on an unanswered question
**2026-07-21:** keep a standing PDF of Douglas's outstanding questions at
`_PDFs/OPEN-QUESTIONS.pdf`. A question enters only after being asked, ignored, and asked again —
never on the first ask. **2026-07-22, verbatim:** *"if a question goes unanswered remember to add
it to the pdf file instead of acting on it."* Silence is not consent — an unanswered decision
gets parked and the work it gates stays blocked, never resolved by a "reasonable assumption."
Items are never removed until Douglas rules on them.
— Source: memory `open-questions-pdf`.

### 6.5 Build visualization — ultimate-plan item, not scheduled
**2026-07-19, verbatim:** *"eventually, I want a diagram of a bike so when you are choosing parts
during the build, it adds them to the diagram so you can visualize your build... Make sure that
is part of the ultimate plan."* Do not spawn build chips until he asks; when he does, a
design/scoping round comes first. Standing constraint already baked in: brand-neutral rendering
only (a diagram that makes one maker's part look better than another violates the unbiased
value).
— Source: memory `build-visualization-vision`.

### 6.6 Bug-report monitor — queued, needs his cadence decision
**2026-07-11:** Douglas wants a scheduled monitor that triages new GitHub issues on the wrong-
verdict report pipeline and notifies him. Before building it, get his decision on cadence, notify
method, and notify-only vs. auto-spawn-fix.
— Source: memory `bug-report-pipeline`.

---

## 7. Conflicts and superseded rulings (surfaced, not resolved)

This section exists because the brief for this document specifically asked that any two
conflicting rulings, or any ruling that supersedes an earlier one, be flagged rather than quietly
reconciled. Here is everything found:

1. **MTB-first priority (§4.1).** The 2026-07-18 "MTB is the highest priority" ruling was
   materially changed by the 2026-07-22 and 2026-07-23 rulings. Anyone reading only the
   2026-07-18 wording would be acting on a retired rule. **Status: resolved by the newer rulings
   — flagged here so the superseded wording is never mistaken for current.**

2. **BMX depth/verification bar (§4.8).** The original 2026-07-17 "~300 parts / ~40% verified"
   target was revised 2026-07-18 to "226 rows / 26.1% verified, accepted as the structural
   ceiling." **Status: resolved — the revised bar is current.**

3. **Image sourcing, Tier A vs. Tier B (memory `product-images-priority`).** Douglas gave a
   recorded "Tier B, go, with containment, thin slice first" on 2026-07-18, then — after an
   objection from the Affiliate/Partnerships lane about the containment premise — the decision
   moved to "in final confirm" across three modes, and was finally settled 2026-07-19 as
   **"Tier A only"** — explicitly superseding the earlier Tier B go-word. This is the clearest
   multi-step supersession in the whole corpus; anyone citing the 2026-07-18 Tier B approval
   without the 2026-07-19 correction would be wrong. **Status: resolved — Tier A only is current
   and permanent unless Douglas reopens it.**

4. **Verified-flag pricing policy — genuinely still open.** Whether sample/converted prices on
   over 1,000 already-verified rows should be formalized as acceptable ("price never blocks
   verification when no US MSRP exists") or demoted en masse has **not been ruled on**. This is
   not a conflict between two of his rulings — it's a real open decision waiting on him. See §4.5.

5. **Frame interface-verification exception — genuinely still open.** Frames run an unwritten
   exception in the verification bar (VERIFY-PROTOCOL.md only lists shocks/wheels/forks as
   requiring interface verification) that has never been formally ruled on. See §4.5.

No other direct contradictions were found across CLAUDE.md, COORDINATOR-HANDOFF.md,
HANDOFF-CHIPS.md, and the memory corpus at the time of writing (2026-07-23) — most apparent
"changes" in the source material are refinements or scope-narrowings of an earlier rule (e.g. the
e-bike rule moving from "banned" to "contained" to "contained but fully first-class" to, on
2026-07-23, retired as a special rule altogether — see §1.2), which this
document treats as a single evolving rule with a dated history rather than a conflict.

---

*Sources: `CLAUDE.md`, `COORDINATOR-HANDOFF.md`, `HANDOFF-CHIPS.md`, and the memory index at
`C:\Users\Douglas\.claude\projects\D--MTB-Bike-Builder\memory\` (read-only reference — memory
files are point-in-time observations, not live state; where this document quotes a memory file,
the date given is the date of Douglas's original statement, not the memory's last-modified date).*
