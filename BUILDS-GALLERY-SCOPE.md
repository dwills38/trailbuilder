# Builds Gallery — Scoping Document

**Date:** 2026-07-14 · **Status:** SCOPE ONLY — no code written. · **Origin:** the 2026-07-14
competitive-landscape audit named "completed-builds gallery with one-click share" as
BuildMyMTB's #1 opportunity (Effort L, Fit HIGH): the proven build-gallery habit-loop + SEO
engine, and our biggest current feature gap. Douglas said "scope it."

This document is decision-ready: recommendations are stated with reasons, and §8 lists the
handful of product calls only Douglas can make. Everything else is buildable as written.

---

## 1. What it is

A public **Builds** page on buildmymtb.com: a browsable, searchable grid of user-submitted
completed builds. Each published build gets a **durable public page** showing:

- a **title** and optional **story/description** ("my first enduro build", what it's for, how it rides),
- the **full parts list** (every slot, linked to the catalog's part cards — provenance badges and all),
- **price and weight totals from the real engine** (`buildTotals`) — never self-reported numbers,
- the **compatibility verdict from the real engine** (`checkBuild`) — the whole point: every
  gallery build is a *checked* build, which no competitor can say,
- optionally a **photo** (day-1 or later — Douglas's call, §8),
- a **one-click share** (the existing copy-link pattern, pointed at the build's public URL).

Why it works (the audit's argument): every published build is simultaneously (a) a habit
loop — riders return to publish, browse, and compare; (b) an SEO artifact — a unique page
of real part names, prices, and weights that search engines index; (c) forum fuel — "look
at my build" threads get a canonical thing to link. We already have saved builds and share
links; the gallery is the missing *public* layer on machinery that exists.

**Not in scope, ever, per the hard rules:** no pop-ups anywhere in the flow (publish
confirmation is a user-clicked dialog — fine; nothing auto-appears), no e-bike content
(the catalog gate already guarantees this — the gallery can only contain catalog parts).

## 2. Data model — recommendation: a NEW `gallery_builds` table (snapshot-on-publish), not a flag on `builds`

Two candidate shapes:

| | A. `published` flag on `public.builds` | B. New `public.gallery_builds` table |
|---|---|---|
| Migration | 1 column + rewrite RLS on a live table | 1 new table + policies (additive only) |
| RLS risk | Must open `select` on the private table (`using (published or auth.uid() = user_id)`) — one policy bug leaks every private garage | Private `builds` table untouched; public table is public by construction (the proven `forum_threads` pattern) |
| URL stability | Public page mutates whenever the owner edits the saved build | Publish is a **snapshot** — the public page shows what was published; owner republishes deliberately |
| Public-read shape | Private columns ride along on every public read | Table carries exactly the public fields (title, story, denormalized totals for cheap grid rendering) |

**Recommend B.** The RLS blast-radius argument alone decides it — `builds` is the one table
holding every user's private garage, and the forum already established the repo's pattern
for public-read tables (open `select` to everyone, `insert` to authenticated, modify/delete
to author + `is_forum_admin()`). Snapshot semantics also match user expectation: a shared
URL shouldn't silently change because the owner kept tinkering in their garage.

Proposed columns (final DDL is implementation work, not this doc):

- `id uuid pk` — the public URL key.
- `author_id uuid references auth.users on delete set null` — nullable like the forum, so a
  deleted account leaves the build page up as "former member" (consistent with forum posts).
- `title text not null`, `story text` (length-capped by CHECK, like a forum body).
- `data jsonb not null` — the **same `{b,p}` payload** as share links and saved builds,
  passed through the **same `sanitizeShare()`** on read (catalog id-migration safety comes
  free; this is exactly what `test/test-account-serialize.js` already proves for the garage).
- `total_price numeric`, `total_weight int`, `discipline text`, `wheel_config text` —
  **denormalized at publish time** for grid sorting/filtering without parsing every payload.
  The detail page always recomputes live from `data` (engine output is truth; the
  denormalized copies are display/sort hints only).
- `source_build_id uuid` — optional pointer back to the garage row (for "update my published
  version" = republish snapshot).
- `photo_path text` — nullable, unused until the photo decision (§8).
- `created_at timestamptz`.

RLS: `select using (true)`; `insert to authenticated with check (auth.uid() = author_id)`;
update/delete to author or `is_forum_admin()` (the admin function and flag already exist
from the forum work — moderation reuses them, no new machinery).

## 3. Moderation & abuse surface

What changes vs the private Garage: text and (eventually) images become **world-readable
and search-indexed**. The posture is the forum's, verbatim: **free speech on viewpoints,
guardrails on mechanical abuse only** — spam floods, scam links, illegal content, doxxing.
Never viewpoint or taste policing ("that build is ugly/dumb" is a comment for the forum,
not a moderation matter).

Concrete surface and mitigations:

- **Title/story text** → same treatment as forum bodies: `esc()` on render (already the
  app-wide rule, tested in `test/test-ui.js`), length CHECKs in the schema, links in
  stories rendered as plain text in v1 (no auto-linkification — kills scam-link value
  cheaply without policing anything; revisit later).
- **The parts payload** → already safe: `sanitizeShare()` drops any id that isn't a real
  catalog part in the right slot. A gallery build literally cannot contain arbitrary content.
- **Flood/spam** → a per-user publish cap (e.g. N per day, enforced by a count check in the
  insert policy or a trigger) — mechanical, viewpoint-blind.
- **Photos (when/if approved)** → note: there is **no existing image-upload precedent** —
  profile avatars were deliberately built as preset slugs with a CHECK forbidding URLs, *no
  storage bucket exists*. Photos are net-new infrastructure (Supabase Storage bucket,
  size/count/type caps, author-scoped write policy) and net-new moderation surface (an
  uploaded image can be anything). This is the strongest reason to cut photos from the MVP.
- **Takedown** → admin delete via `is_forum_admin()`, same as the forum.

**Report mechanism — recommend reusing the GitHub-issue pipeline for the MVP.** The app
already has report-to-GitHub wired (`REPORT_REPO`, prefilled `issues/new` URLs, the
`wrong-verdict` label). A "Report this build" link opening a prefilled issue with a
`gallery-report` label costs ~nothing, lands in the queue the coordinator already checks,
and — critically — matches the forum philosophy: reports go to a **human queue**, and
nothing is ever auto-hidden on report count (the anti-brigade rule). A Supabase-native
admin queue is the right long-term shape *if* report volume ever makes GitHub clumsy;
building it day-1 is premature.

## 4. UI surface

- **Nav:** a top-level **"Builds"** entry (rail + mobile), peer of Guides. It's a
  destination page (the SEO/habit surface), not a sub-tab of anything. If a "Community"
  umbrella ever groups Forum + Builds, fold it then — don't invent the umbrella for this.
- **Gallery grid:** reuse the catalog's card pattern (the list cards + verified-badge
  visual language). Card = title, author username (profiles exist), hero stat line (price ·
  weight · wheel config · discipline chip), verified-parts count, photo thumbnail when
  photos exist. Sort: newest first (see §6 for what sort may *never* do). Filters: discipline
  chip row (the existing chip pattern), price band, wheel config.
- **Build detail page:** a read-only rendering of the build — parts table with per-part
  links into the catalog, engine totals, the engine's verdict panel ("No conflicts found",
  or the warnings it carries), title/story, author, published date. Plus two buttons:
  **copy link**, and **"Open in builder"** — loads the payload into the builder exactly like
  a share link does today (this is the habit-loop hook: browse → fork someone's build →
  tweak → publish your own).
- **Submit flow:** a **"Publish to gallery"** button in the builder / Garage, opening a
  user-clicked dialog (title, story, the gate check result). Account required (recommended,
  §8) — publishing is a profile action, and usernames/profiles already exist.
- **Publish gate — recommend: build must be COMPLETE (per `slotRequired`, so DJ
  brakeless-complete and hardtail no-shock logic apply automatically) and have ZERO
  errors. Warnings are allowed** and displayed honestly on the public page as the same
  yellow verdicts the builder shows. Reasons: "every gallery build actually fits" is the
  product's credibility promise, so errors can't publish; but warnings are legitimate
  real-world choices (adapter-tier fits, reducing shims) and hiding them would overclaim —
  the gallery should show the engine's honest output, exactly like the builder does.
  Incomplete "work in progress" builds stay in the private garage (that's what it's for).

## 5. SEO mechanics — concrete

Today's routing is **hash-based** (`#guides`, `#guide/<slug>`, `#b=…`) on a single
`index.html` on GitHub Pages. **Hash fragments are not distinct URLs to crawlers** — Google
treats `/#build/x` and `/#build/y` as the same page. So hash-only gallery pages get ~zero
SEO, which forfeits half the point.

What's actually needed — three tiers:

1. **MVP (no build step): query-param canonical URLs + client-set metadata.**
   Give each public build the URL `https://buildmymtb.com/?g=<id>` (query params ARE
   distinct URLs to crawlers, unlike fragments; a tiny router branch beside `readHash()`
   handles it). On load, the client fetches the row (the table is public-read via the anon
   key — no auth needed), renders the page, and sets `document.title` +
   meta-description + a canonical link tag. Googlebot renders JavaScript, so this content
   is indexable. **Plus a `sitemap.xml`:** a scheduled GitHub Action (daily) queries the
   public table over the Supabase REST endpoint with the anon key and regenerates
   `sitemap.xml` in the Pages artifact — that's how Google *discovers* the URLs, since
   nothing else links each one. This is small, and it is enough to be genuinely indexed.
2. **Later (the "first build step," if rankings warrant it): pre-rendered static stubs.**
   The same scheduled Action writes a minimal static HTML file per build
   (`/builds/<id>.html`: real `<title>`, meta, the parts list as plain HTML, a script that
   hydrates into the full app). This is what the Guides section deferred; it buys
   faster indexing, correct social-share previews (Open Graph tags need server-side HTML —
   client-set OG tags do NOT work for link previews in forums/chat apps), and resilience
   against crawler-rendering flakiness. Note the honest limitation: stubs regenerate on the
   Action's schedule, so a just-published build's *link preview* lags up to a day. Fine.
3. **Not needed:** a server. Everything above stays static-hosting + Supabase.

**Recommendation: ship tier 1 with the MVP** (the sitemap Action is a few dozen lines);
treat tier 2 as a fast-follow **specifically because of social link previews** — for a
feature whose pitch is "one-click share," a build link unfurling as a generic homepage
card in the forum/Discord/Reddit is a real product weakness, not just an SEO nicety.

Also per the audit: cross-link each part's catalog card to "appears in N gallery builds" —
that's the per-part SEO surface (audit idea #10) getting free internal links. Later phase.

## 6. Unbiased-value check — HARD CONSTRAINT

**Gallery ordering, featuring, and visibility must NEVER be influenced by whether a build
contains affiliate-linked parts, which retailers stock its parts, or any monetization
signal.** Sort keys are user-meaningful only: recency, and (if adopted, §8) community
kudos. Any future "featured builds" row is editorial/curated and never sold — the same
line the affiliate-disclosure page already draws for the catalog. This mirrors the
manufacturer-bias audit's affiliate-isolation finding (affiliate data never feeds
`checkBuild`; here, affiliate data never feeds gallery ranking) and should be checked by
the recurring bias audits once the gallery ships. Additionally, engine numbers shown on
gallery pages come from `buildTotals`/`checkBuild` verbatim — a gallery page never
overclaims ("No conflicts found", never "All compatible" — the existing wording rule).

## 7. Effort tiers & build order

**MVP — size: MEDIUM.** (Not small — it's a new public content type with schema, RLS, two
new page views, a publish flow, and the SEO plumbing. But every hard primitive exists:
payload format, sanitizer, auth, profiles, admin flag, card UI, report pipeline.)

1. `gallery_builds` table + RLS + publish caps (schema + `supabase/` migration file).
2. Publish flow in the app (gate: complete + zero errors; title/story dialog).
3. Gallery grid page + build detail page (hash-routed in-app; `?g=` canonical for crawlers).
4. "Open in builder" fork path (reuses the share-link load path).
5. Report-this-build → GitHub issue (`gallery-report` label).
6. Sitemap GitHub Action + client-set title/meta/canonical.
7. Tests, following the garage precedent: publish-payload round-trip through
   `sanitizeShare()`, gate logic (complete + no errors, incl. a DJ brakeless build
   publishing cleanly), denormalized-totals-match-engine, `esc()` on title/story.

**Full vision — size: LARGE (cumulative, in recommended order after MVP):**

1. **Static stub pre-render** for social link previews + stronger SEO (the deferred build
   step; also unlocks correct Open Graph unfurls). *Small-medium.* — first fast-follow.
2. **Photos**: Supabase Storage bucket, caps (size/count/type), author-scoped policies,
   admin takedown, thumbnailing strategy. *Medium.* — gated on Douglas (§8).
3. **Kudos/likes** (if approved): one table, anti-brigade posture (kudos sort is secondary,
   never the default; no auto-anything on counts). *Small.*
4. **Search + richer filters** (brand, part-contains — "show me builds running a ZEB").
   *Small-medium.*
5. **Per-part "appears in N builds"** cross-links on catalog cards (ties into audit idea
   #10, per-part pages). *Small once #4's index exists.*
6. **Forum integration**: paste a gallery URL in a thread → renders as a build card.
   *Small.*

## 8. Decisions (Douglas, 2026-07-14) — ALL SIX SETTLED, MVP UNBLOCKED

1. **Photos: day-1 or fast-follow?** → **DECIDED: fast-follow.** MVP ships with no photo
   upload path (Full-vision #2, gated separately).
2. **Account required to publish, or anonymous?** → **DECIDED: account required.**
3. **Moderation model:** → **DECIDED: post-moderation** (publish instantly, admin removes on
   report via the existing GitHub-issue report pipeline).
4. **Kudos/likes at all?** → **DECIDED: not yet.** MVP ships with zero kudos/likes surface —
   no table, no sort key, no UI. Revisit as Full-vision #3 only if he asks later.
5. **Unpublish behavior:** → **DECIDED: hard delete.** Author unpublish/delete → public URL
   404s; no tombstone. Sitemap Action prunes on the next run.
6. **Publish-gate strictness:** → **DECIDED: build must be complete** (per `slotRequired`,
   zero errors; warnings allowed and shown). No "dream build" exception.

**MVP is now fully decision-complete — nothing here blocks implementation.**

---

*Scoping only — no code, no schema, no branch beyond this document. Prepared by a worker
session, 2026-07-14. Sources read: COMPETITIVE-LANDSCAPE-AUDIT.md (idea #1, §5 SEO),
`src/compat.js` (`sanitizeShare`), `index.html` (share/hash routing, `REPORT_REPO`
pipeline), `supabase/schema.sql` + `forum-profiles*.sql` (builds/forum RLS, admin flag,
avatar-slug precedent), `src/account.js`, CLAUDE.md (hard rules, provenance, conventions).*
