# Research & Measurement Methods (L4)

**Maturity: professional** (L4 method canon seeded and applied to the corpus's own parked
questions; round 4, 2026-07-18 — new chapter)

How to *know* instead of guess. Read [`INDEX.md`](INDEX.md) first for corpus rules and tiers.

**Why this chapter exists.** Rounds 1–4 produced seven chapters of sourced facts and a set of
live-DOM audits. What they could not produce is an answer to any question of the form *"which of
these is better for our users?"* — every such question got **parked**: the dual-thumb affordance
(DNS-19), skeleton-vs-spinner (PRF-8), whether dialogs should be Back-dismissible on mobile
(NAV-17), whether facets should collapse (DNS-20). Parking them was correct — asserting an
unmeasured preference is exactly the failure the corpus exists to prevent. But "parked forever"
is not a good outcome either. **This chapter is the machinery for un-parking them**, and for
giving Douglas's taste decisions real method behind them when he wants it.

**Boundary, unchanged.** This chapter describes how to run studies. It does not claim any study
has been run. **No usability test, screen-reader session, or A/B test has ever been conducted on
BuildMyMTB** (see ACC-21 for the screen-reader case). Every "our site" entry below is a *study
design*, not a result.

---

## Facts — the method canon

- **RES-1 — The 5-user finding, stated precisely (and its exceptions).** Nielsen & Landauer's
  model is `problems found = N × (1 − L)^n`, where `N` is the total number of problems in the
  design and `L` is the proportion a single user finds — empirically about **31%**. Five users
  surface roughly **85%** of usability problems; the curve flattens hard after that, and
  Nielsen's blunt summary is that past the fifth user you observe the same findings repeatedly.
  **The real recommendation is not "test 5" but "don't spend 15 users on one study"** — run
  three studies of five across design iterations instead, fixing between rounds, because deeper
  problems (information architecture) only surface once surface problems are cleared.
  **Exceptions, which matter more than the headline:** distinct user groups need **3–4 per
  group**; **quantitative** studies need **~20**; **card sorting** needs **~15**. *Tier B,
  fetched https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ 2026-07-18.*
  ⚠ **Do not cite "5 users" as license for a quantitative claim.** Five users tells you *what is
  broken*, never *how often* or *by how much* — a distinction the site's own honest-data values
  make load-bearing (see RES-7).

- **RES-2 — Thinking-aloud: the default method, and its real failure modes.** The participant
  narrates their thoughts continuously while working. NN/g has ranked it the top usability
  method for decades on the grounds that human behaviour changes far slower than technology.
  **Advantages:** no equipment (a facilitator and notes), a handful of users takes about a day,
  works from paper prototype to live site, and — the underrated one — it is **robust**: a
  poorly-run thinking-aloud study still yields usable findings, whereas a poorly-run
  quantitative study can be silently invalid. **Drawbacks, all of which bite here:**
  verbalising is unnatural and participants go quiet; participants **curate** — they narrate
  once they've worked out what's happening, so you get a tidied account rather than the
  confusion itself; and **facilitator bias is the dominant risk**, especially when the
  facilitator doesn't notice they've caused it. **Facilitation rule:** stay quiet, prompt only
  "keep talking," never ask leading or clarifying questions that redirect behaviour — and when
  you *do* bias a segment, discard that segment rather than reasoning around it. *Tier B,
  fetched https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/ 2026-07-18.*

- **RES-3 — Task-scenario design: three rules, and the wording trap.** A task must be
  **realistic** (goal-shaped, not hyper-specific: "buy a pair of shoes under $40", not "purchase
  orange Nike running shoes"), **actionable** (the participant *does* it — self-reported data is
  markedly less accurate than observed behaviour, so never "tell me where you'd click"), and
  **clue-free** (no interface vocabulary, no step lists — naming a control or a screen biases
  the run and destroys the finding). Give enough context to work independently, without
  revealing *how*. *Tier B, fetched
  https://www.nngroup.com/articles/task-scenarios-usability-testing/ 2026-07-18.* **This is the
  single easiest thing to get wrong on this site**, because the domain vocabulary and the UI
  vocabulary are the same words — "compatible", "build", "verified", "conflict". A task that
  says "check whether the parts are compatible" has just told the participant which feature to
  use. RES-8's drafted tasks are written specifically to dodge this.

- **RES-4 — Heuristic evaluation (Nielsen's 10) is an inspection method, not a substitute for
  users.** Experts inspect the interface against ten principles: (1) visibility of system
  status, (2) match between system and real world, (3) user control and freedom, (4) consistency
  and standards, (5) error prevention, (6) recognition rather than recall, (7) flexibility and
  efficiency of use, (8) aesthetic and minimalist design, (9) help users recognise/diagnose/
  recover from errors, (10) help and documentation. **It finds problems without recruiting
  anyone** — which is why an agent *can* run it — but it yields expert judgment, not evidence of
  real behaviour. *Tier B, fetched https://www.nngroup.com/articles/ten-usability-heuristics/
  2026-07-18. Heuristic #3 is already load-bearing in this corpus as NAV-13.*
  **Consequence worth stating plainly: heuristic evaluation is the only method on this list a
  corpus round can execute unaided.** Everything else needs humans. That makes it the natural
  next round's work — and it also caps what such a round can honestly claim.

- **RES-5 — Method selection: what each method can and cannot answer.** Composing RES-1–4 with
  the method facts already scattered across the corpus (ACC-21 screen-reader testing, PRF-13
  lab/RUM/CrUX, NAV-6/7 card sorting and tree testing):

  | Question shape | Method | Not this |
  |---|---|---|
  | "Why does this confuse people?" | thinking-aloud, 5 users (RES-1/2) | analytics — it shows *that*, never *why* |
  | "How often / how much?" | quantitative, ~20 users, or field data (PRF-13/14) | 5-user studies (RES-1's caveat) |
  | "Do our labels/groupings match their mental model?" | card sort, ~15 (NAV-6/7, RES-1) | asking people if the labels are clear |
  | "Can they find X in our nav?" | tree test (NAV-7) | testing on the live UI, which confounds nav with visual design |
  | "Is it accessible?" | WCAG audit + real AT users (ACC-21) | either one alone |
  | "Is it fast for real users?" | field RUM at p75 (PRF-13/14/16) | Lighthouse (lab only) |
  | "Which variant performs better?" | A/B test | **unavailable here — see RES-6** |

- **RES-6 — ⚠ A/B testing is effectively unavailable on this stack, and that constrains what
  can ever be settled by numbers.** The site is a static build on GitHub Pages fronted by
  Cloudflare, with Cloudflare Web Analytics as its only telemetry. Three independent blockers:
  (a) there is **no server-side request splitting** — the deploy serves one set of files to
  everyone; (b) Cloudflare Web Analytics is **cookieless with no custom events and no variant
  dimension** (PRF-14), so even a client-side coin-flip could not be *attributed* to an
  outcome; (c) traffic volume is almost certainly below the threshold for statistical power on
  anything but a huge effect — the same volume problem that keeps the site out of CrUX (PRF-15).
  A client-side split plus a third-party experimentation service could technically be vendored,
  but it would add a critical-path script (PRF-17's objection), likely need cookies or storage
  (against the site's privacy posture), and still lack the traffic to conclude anything.
  **Honest position: for the foreseeable future, design questions on this site are settled by
  qualitative testing and expert judgment, not by experiment.** That is a reason to invest in
  RES-1/2/3 rigour, not a reason to guess. *Corpus judgment composing PRF-14/15/17 with the
  deploy architecture; flagged as the corpus's own reasoning.*

- **RES-7 — Small-N studies produce findings, not statistics — a house rule.** Because the site's
  values forbid overclaiming (INDEX's honest-data rule; the app says "No conflicts found", not
  "All compatible"), any study this project runs must report in the same register. **Say:** "4 of
  5 participants did not realise the dot was explaining a conflict." **Never say:** "80% of users
  don't understand the dots" — five people cannot support a percentage about users in general.
  This is the reporting discipline that keeps a 5-user study honest, and it is the same
  both-errors-cost logic the corpus applies to verdicts. *Corpus rule, derived from RES-1's
  stated limits.*

---

## Study designs for this corpus's own parked questions

Each parked item below is written as a runnable design. **None has been run.** Priority order is
by decision value, not by ease.

- **RES-8 — The highest-value study this site could run: does the compatibility dot communicate?**
  This is not on the parked list — it is upstream of everything the product claims. The dot is
  the core interaction, it carries four states, and its meaning was tuned by developers who
  already knew what it meant. ACC-24 confirmed the *contrast* and the non-colour channel are now
  correct; nobody has ever checked whether the *meaning* lands.
  **Method:** thinking-aloud, 5 users (RES-1), remote or in-person, ~30 min.
  **Recruit:** mountain bikers who have never used the site; per RES-1's exception, if
  experienced home-mechanics and newcomers are expected to differ, 3–4 of *each* rather than 5
  mixed.
  **Tasks, written clue-free per RES-3** (note none of them names a feature, a colour, or the
  word "compatible"):
  1. "You're building an enduro bike around a frame you already own — this one. Get it to the
     point where you'd be comfortable ordering the parts."
  2. "You've got about $4,000. Show me how you'd decide what to spend it on."
  3. *(after they have hit at least one warning state naturally)* "Talk me through what the
     screen is telling you right now."
  **What to watch for, not ask about:** do they notice the dots unprompted; do they distinguish
  yellow (fits, but warns) from green; do they seek the *reason* and can they reach it on their
  device (PLT-12's touch asymmetry is a live hypothesis here); do they read "No conflicts found"
  as "this bike is fine" — which would be the honest-data value failing in practice, the single
  most consequential possible finding.
  **Report per RES-7.**

- **RES-9 — DNS-19, the dual-thumb affordance.** *Parked because it is a taste call with no
  sourced answer.* **Method:** fold into RES-8 rather than running separately — a range filter
  is naturally exercised by task 2, and a dedicated study for a thumb glyph is not worth a
  recruit. **Watch:** does the participant discover that both ends move? Do they use the numeric
  fields (DNS-21) instead of dragging, and on which device class? **Decision rule agreed in
  advance:** if ≥2 of 5 never discover the second thumb, the affordance is worth Douglas's
  attention; if 0–1, the live "min – max" label is doing the job and RSP-20-style
  "we have the pattern, we don't need it" applies.

- **RES-10 — DNS-20, should facets collapse?** *Parked pending measurement.* **This one is not a
  usability study first — it is a measurement.** Capture the rail's rendered height and
  per-facet value counts at 375 px (needs only a browser), compare against DNS-8's thresholds,
  and only if the rail proves genuinely unreachable does it become a design question. Running a
  study before the measurement would be spending humans on arithmetic.

- **RES-11 — PRF-8, skeleton vs spinner.** *Parked as an untested lean.* **Honest assessment:
  this is the weakest candidate on the list and should be deprioritised.** It is a
  quantitative-perception question (RES-5), so a 5-user study cannot settle it and ~20 users is
  disproportionate for a loading affordance; A/B is unavailable (RES-6); and PRF-16's unread
  field data may show the site's loading states are fast enough that the question is moot.
  **Recommended: read Vitals Explorer first (PRF-16), then most likely close RES-11 as
  not-worth-testing.** Recorded so a future round doesn't treat it as owed work.

- **RES-12 — NAV-17, should dialogs be Back-dismissible on mobile?** *Parked because the source
  study doesn't establish the threshold.* **Method:** this is answerable by observation inside
  RES-8 at zero extra cost — task 1 and 2 both open dialogs on a phone. **Watch:** when a
  participant on a phone wants to leave a dialog, what do they reach for first — the Close
  button, the backdrop, or the system Back gesture? **Decision rule:** if participants reach for
  Back and are ejected from the site, NAV-17 graduates from candidate to finding; if they use
  Close or the backdrop, NAV-17 closes as a non-issue and NAV-15's anti-flooding doctrine stands
  unchallenged.

- **RES-13 — MOB-46, do frequently-used mobile controls sit in the reachable region?** *Parked as
  an unrun audit.* **Method: expert inspection, not a study** — overlay the reachable-pie model
  on screenshots at 375 px and mark which frequently-used controls fall outside it. An agent can
  do this from the CSS and a rendered page. Only escalate to a user study if the inspection finds
  something and the fix is contested.

---

## Gaps (next-round targets)

- **A heuristic evaluation (RES-4) has never been run on this site** — and it is the *only*
  method here an agent can execute unaided. That makes it the obvious next round's work:
  ten heuristics × the builder, forum, and guides surfaces, findings flagged per the usual
  boundary. It would also very likely surface candidates RES-8 should then test with humans.
- No source is pinned yet on **remote/unmoderated testing** or on **recruiting**, which is the
  practical blocker for RES-8 (Douglas would need 5 mountain bikers who haven't seen the site).
  A future round should pin NN/g's remote-testing guidance so the recommendation is actionable
  rather than aspirational.
- **Quantitative method depth is thin**: RES-1 gives the ~20-user figure and RES-5 the routing,
  but nothing is pinned on task-success metrics, time-on-task, or SUS. Low priority while RES-6
  holds — the site cannot act on quantitative results anyway.
- **RES-6 should be re-checked** if the site ever moves off static hosting or gains real traffic;
  both blockers are architectural, not permanent.
- Nothing here is a corpus *finding* — this chapter is entirely method and design. Its Gaps close
  by someone **running** something, which is a recommend-to-Douglas action, not a fetch.
