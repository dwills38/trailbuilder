# TrailBuilder — Getting-Started Roadmap

A plan for turning "PCPartPicker, but for enduro mountain bikes" into a live site, written for someone who is comfortable with light scripting but not full-stack development.

## What you have right now

A working prototype: `index.html` plus `compat.js`. Open `index.html` in any browser and you can browse a small catalog of enduro full-suspension parts, add them to a build, and watch it flag incompatibilities in real time (wheel size, axle standards, freehub, rotor mounts, shock fit, dropper diameter, and more). It also totals a sample price, tracks build completeness, and can save/share a build via the URL. There is no install and no server — it all runs in the browser. The specs and prices are illustrative samples, not verified data.

This prototype exists to make the idea concrete and to prove out the one feature that actually matters: the compatibility engine. Everything else is comparatively standard web plumbing.

## The honest reality of the scope you picked

You chose all four features (compatibility checker, catalog with filters, price comparison, save & share) and "go live for others." That's the full PCPartPicker feature set, which is a real software product, not a weekend project. The good news is that it splits cleanly into an easy half and a hard half:

**The easy half** — catalog, filters, and the compatibility checker — needs no server. It's data plus logic, exactly what the prototype already is. You can host it for free and it will work for everyone.

**The hard half** — user accounts, saved builds tied to a person, and live multi-retailer prices — needs a backend: a database, authentication, and either scheduled data jobs or third-party feeds. This is where real cost, complexity, and maintenance live.

The roadmap below front-loads the easy, high-value half so you have something real and shareable quickly, then adds the hard half deliberately.

## The phased plan

**Phase 0 — Prototype (done).** Clickable build tool with a seed catalog and a real compatibility engine. Use it to get feedback from riding buddies and forums. The single most useful question to ask them: "What compatibility mistake have you personally made or nearly made?" Their answers become your rules.

**Phase 1 — Get the model right, then go live cheaply.** Grow the catalog by hand to maybe 150–300 real parts and harden the compatibility rules. Then deploy the static site (still just HTML/JS/data) to free hosting like Netlify, Cloudflare Pages, or GitHub Pages. At this point it's genuinely live and useful, with zero running cost and the catalog + filters + checker all working. This is the milestone to aim for first.

**Phase 2 — Add accounts and saved builds.** This is the jump that needs a backend. For a non-developer the gentlest route is a "backend-as-a-service" like Supabase or Firebase: they give you a database, user login, and an API with very little server code, and have generous free tiers. Builds move from URL links to real saved records people can name and revisit. Budget real learning time here, or pair with a developer / an AI coding assistant for this step specifically.

**Phase 3 — Prices.** Covered in its own section below — it's the messiest part and worth doing last.

**Phase 4 — Community and growth.** User-submitted parts (with moderation), reviews, "builds other people made," compatibility-rule corrections from experts. This is what made PCPartPicker durable, but it only matters once you have visitors.

## The data question (you picked "scrape retailer sites")

Scraping is the obvious instinct, and it can work, but go in with eyes open. I'm not a lawyer, so treat this as practical engineering input, not legal advice, and check anything important with a professional:

- **Terms of service and robots.txt.** Many retailers' terms prohibit automated collection, and ignoring that can get you IP-banned or worse. Check each site's `robots.txt` and terms before scraping it.
- **It's brittle.** Sites change layout constantly; scrapers break and need babysitting. Prices and stock go stale fast, so you'd need to re-scrape frequently.
- **The cleaner alternative: affiliate feeds.** Most big bike retailers run affiliate programs (often via networks like AvantLink, Sovrn/VigLink, Impact, or Amazon Associates). These give you a *structured product feed with prices and links you're allowed to use* — and you earn a commission on click-throughs, which is a natural way to fund the site. This is very likely how a price-comparison MTB site should monetize and source pricing, and it sidesteps most of the scraping headaches.

Recommended approach: **start with a hand-curated seed catalog** (reliable, no legal risk, lets you build now), then **layer in affiliate feeds for pricing** as the scalable path, and treat scraping as a last resort for filling specific gaps where no feed exists, done carefully and respectfully.

## Ways to actually build the "live" version as a non-coder

There's no single right answer; the trade-off is control vs. effort:

- **Keep coding it as a static site + a backend-as-a-service (Supabase/Firebase).** Most control, lowest cost, real learning curve. The compatibility logic stays exactly the JavaScript you already have.
- **Use an AI coding assistant to extend it incrementally.** Tools like this one, or Claude Code / Cursor, can write and modify the code with you describing what you want. Realistic for someone at your level, especially building on the existing prototype.
- **No-code platforms (Bubble, Softr, Glide + Airtable).** Fast for catalog/accounts/filters, but the custom compatibility logic is awkward to express — it's the one thing these tools fight you on. Possible, not ideal for your differentiator.
- **Partner with or hire a developer** for Phase 2 specifically, and stay owner of the product/data. Often the highest-leverage spend once you've validated interest with the free Phase 1 site.

## Enduro compatibility reference (the rules that matter)

This is your core domain knowledge — the dimensions a real checker must model. The prototype already encodes most of these:

- **Wheel size** — 29, 27.5, or mixed/"mullet" (29 front / 27.5 rear). Frame, fork, wheels, and tires must agree. *Mullet adds front/rear modeling and is a deliberate v-next item.*
- **Rear axle / hub spacing** — Boost 148×12 vs SuperBoost 157×12 (e.g., some Specialized frames). Frame and rear hub must match.
- **Front axle** — almost universally Boost 15×110 on modern enduro forks/hubs.
- **Freehub body** — SRAM XD vs Shimano Micro Spline vs older HG. The cassette/drivetrain dictates which freehub the wheel needs.
- **Brake rotor interface** — 6-bolt vs Center Lock. Rotors/brakes must match the hubs (adapters exist but are worth flagging).
- **Caliper mount & rotor size** — post mount on enduro; rotor size capped by frame/fork rating (often 200–220mm).
- **Headset / steerer** — tapered (1.5"–1.125") is the modern norm; legacy straight steerers are a mismatch.
- **Rear shock fit** — eye-to-eye × stroke (e.g., 230×65, 230×60, 205×65) and mount type (standard eyelet vs trunnion). Frame-specific.
- **Fork travel** — must be within the frame's rated max (over-forking affects geometry and warranty).
- **Bottom bracket** — BSA threaded 73mm, PressFit 92, T47. Cranks must match (usually bought separately).
- **Seatpost / dropper** — diameter (30.9 / 31.6 / 34.9mm) must match the seat tube; insertion depth and max drop limited by frame.
- **Bar/stem clamp** — 35mm vs 31.8mm.

## Suggested next steps

1. Open the prototype, click **"Load a sample build ✓"** and **"Show a clash ✗"** to see the checker working, then build something yourself.
2. Decide the Phase 1 target catalog size and which brands matter most to you.
3. Get 5–10 riders to try it and tell you what compatibility traps they'd want caught.
4. When ready, I can help with any of: expanding the catalog with verified specs/prices, adding mullet/mixed-wheel support, researching specific affiliate programs, or setting up free hosting so it's genuinely live.

## Parked ideas (planned, not now)

- **Ride categories — enduro / trail / downhill.** Tag frames and parts by discipline so the catalog and the compatibility rules can be filtered per category. (Requested for later.)
- **TypeScript migration** of the engine + data — the next "solidify" step after the schema/validator.

## Progress so far

- Component-level builds (drivetrain / wheels / brakes / cockpit) with groupset / wheelset / brake-set / cockpit presets that quick-fill the parts.
- Compatibility engine (17 rules): wheel size, axles, drivetrain system/speed, UDH/Transmission, freehub, rotor interface & size, steerer, fork travel, dropper diameter, bar/stem clamp, rear-shock fit, and frame–shock bundling.
- Green / red / grey compatibility dots, catalog sorted compatible-first.
- Component **weights** + **groupset (bundle) pricing** with a running sample total and estimated build weight.
- **Mullet** (29 front / 27.5 rear) on mullet-capable frames; front and rear tires are separate slots.
- A real repo: 64-test suite (`node tests.js`) plus a data validator (`node validate.js`) with provenance fields.

*Reminder: all catalog data in the prototype is sample data for demonstration and must be verified before anyone relies on it.*
