# sites/ — pages for domains other than buildmymtb.com

This repo's GitHub Pages deploy (`.github/workflows/deploy.yml`) serves one custom
domain — the `CNAME` file pins it to `buildmymtb.com`. GitHub Pages allows exactly one
custom domain per Pages site, so any page meant for a *different* domain Douglas owns
(ddubsworks.com, buildmyridekit.com, etc.) can't just be added to the root and go live
on its own domain — it needs its own hosting target.

`sites/<domain-slug>/` holds the source for one such page, self-contained (no
dependency on `src/` or any app page — those ship only to buildmymtb.com). Nothing
under `sites/` is staged by `deploy.yml` today.

**To actually put one live**, when Douglas is ready to point a domain at its page:
1. Pick a static host for that page (a second GitHub Pages repo, Netlify, Cloudflare
   Pages, etc. — GitHub Pages itself can't serve two custom domains from one repo).
2. Publish `sites/<domain-slug>/index.html` there.
3. Point the domain's DNS at that host.

## Current pages

- `ddubsworks/index.html` — the maker's page for **ddubsworks.com**, the company site
  behind the BuildMy family (D2a, home-page round 2, Douglas-approved 2026-07-20).
