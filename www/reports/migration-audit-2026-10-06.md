# Migration audit — accepted baseline and Phase 1 evidence

Report date: **2026-10-06**, as requested. Application baseline: commit
`147b55c586f1a176050551003af98903901833eb` on `faithful-astro-migration`.

## Evidence dates and interpretation

- **Inherited accepted findings:** the audit accepted in the migration planning
  conversation. Its observations span October 5–6, 2026. The temporary JSON/HTML
  did not retain exact request timestamps; these remain `null` in the durable
  baseline. File modification times were not substituted for observation times.
- **Fresh verified observations:** the shell's UTC clock recorded production
  requests on **2026-10-07, 00:56:33–00:57:25 UTC**. This differs from the report's
  requested date and is intentionally not backdated.
- **Inferences and uncertainty:** route presence does not establish content,
  visual, accessibility, or functional equivalence. Unrequested routes remain
  HTTP-unverified. Sitemap `lastmod` is a discovery hint, not a verified edit date.

Durable evidence:

- [Accepted route baseline](route-baseline-2026-10-06.json): compact extraction of
  the saved inventories and selected HTML metadata/link references; no HTML,
  article bodies, form payloads, or scripts are committed.
- [Current route reconciliation](route-reconciliation-2026-10-07-offline.json):
  fresh production observations reconciled with generated/local routes. Its
  final derivation was validated offline; the original production request times
  and complete request ledger are retained. `mode: offline-reconciliation` does
  not mean the production observations were invented or newly requested offline.
- [Historical migration summary](migration-summary.md): preserved unchanged;
  its earlier completion claims are not current acceptance evidence.

The `/tmp` paths recorded in baseline provenance are historical origins only.
The tool and offline checks do not depend on those files still existing.

## Executive summary

**Inherited finding:** this is a substantial, buildable full-site migration,
not a new scaffold. Most page families exist, but route coverage overstates
readiness. Rendering, factual content, conversion behavior, and SEO need work.

**Fresh route verification:** the core inventory is unchanged: 97 generated
HTML pages, 102 production sitemap URLs, and 92 overlapping routes. Ten
sitemap-listed pages are missing locally. Five generated routes are absent
from the production sitemap; four remain live and one is the `/ar` placeholder.

Phase 1 adds evidence and tooling only. It does not repair rendering, alter
content, activate forms, change indexing, or implement redirects.

## Last known project state

**Inherited, corroborated by unchanged HEAD:** initial migration work landed in
June 2026. The newest local English article publication date was June 1, 2026.
Subsequent work concentrated on fidelity, page-specific layouts, FAQ behavior,
static inquiry drawers, and authoring infrastructure. Astro upgrades occurred
in July. The final August 28 commits enabled Sätteri features, restored Giveback
layout, and included MDX routes in sitemap generation.

Phase 0 fetched both remotes successfully. The migration branch was ahead of
`origin/faithful-astro-migration` by 14 commits and its `github` counterpart by
16; no remote-only commits were found. Local `main` and the reference foundation
branch matched their corresponding remote branches. The pre-existing untracked
`merge-plan.md` remains separate, unapproved merger planning, not migration
implementation authority.

## Current architecture

**Inherited inspection:** Astro 7.1.5, TypeScript, npm, static output, Zod content
collections, Markdown/MDX, plain CSS, and self-hosted fonts remain a suitable
foundation. English/Spanish/Arabic routing and RTL support exist. Some page copy
is rendered from dedicated components rather than its Markdown record.

The source contains 21 English, nine Spanish, and two Arabic page records;
46 English, 12 Spanish, and seven Arabic posts; and one author record per
language. Assets comprise 172 image files, 20 font files, and two PDFs.

**Inherited blocker, deliberately unchanged:** directive parsing removes the
`:1` and `:2` portions of ordinary therapy ratios. The accepted audit reproduced
this despite a passing build. Phase 2 must inspect intentional directive use
before changing the parser and preserve explicit heading IDs.

## Migration coverage

| Area | Accepted assessment | Remaining work |
| --- | --- | --- |
| Service/conversion pages | Implemented, materially stale in places | Ages, eligibility, program naming, CTA destinations, consultation/referral copy |
| Homepages | Substantial implementation | English HSA/FSA section and metadata; source-specific Spanish reconciliation |
| About, careers, intake, insurance | Sampled substantive copy appeared aligned | Full visual/functional acceptance remains incomplete |
| Team | Implemented but stale | Reconcile names, roles, ordering, images |
| Employee portal | Effectively an empty page body | Human decision on replacement/access behavior |
| Library | 65 local posts; partial index behavior | Nine missing English posts, rewritten articles, search, pagination, authors |
| Spanish | Partial page coverage; 12 Library routes | Privacy page, updated source-supported translations, human language review |
| Arabic | Seven Library posts plus index and homepage placeholder | RTL/content review; intended unpublished homepage policy not implemented |
| SEO | Shared metadata, organization schema, selected FAQs | Publication rules, canonicals, hreflang, article/FAQ schema, social gaps |
| Forms/integrations | Static forms; selected external dependencies | Explicit activation and ownership decisions before launch |

These are inherited content assessments. Phase 1's fresh requests recheck route
and selected metadata evidence, not every paragraph or page layout.

## Route reconciliation

| Measure | Accepted core count | Fresh result |
| --- | ---: | ---: |
| Generated HTML pages | 97 | 97 |
| Production sitemap URLs | 102 | 102 |
| Sitemap/local overlap | 92 | 92 |
| Sitemap URLs missing locally | 10 | 10 |
| Local generated routes absent from sitemap | 5 | 5 |
| Production sitemap additions/removals | — | 0 / 0 |

The final machine inventory has **129 normalized route keys**, including
aliases, utility/archive routes, and the local placeholder. This is not 129
verified production pages. `robots.txt` and `sitemap.xml` are recorded separately
as two generated utilities, not counted among the 97 HTML pages.

Ten sitemap-listed missing routes, all freshly verified HTTP 200:

```text
/es/privacy-policy
/library/does-aba-therapy-replace-school
/library/autism-daily-living-skills-challenges
/library/how-many-hours-aba-child-need
/library/autism-after-school-meltdowns
/library/autism-back-to-school-transition
/library/autism-social-skills-by-age
/library/sleep-issues-autistic-children
/library/halloween-and-autism
/library/picky-eating-autism-parent-guide
```

Fresh checks preserve these sitemap-absent local routes as live:

- `/employee-portal`: HTTP 200.
- `/schedule-consultation`: HTTP 200, source `noindex`.
- `/library/community-highlight-meet-rula-diab`: HTTP 200, external canonical.
- `/library/new-aia-scottsdale-office`: HTTP 200, external canonical.

`/ar` remains HTTP 404 in production. Locally it is **generated, `draft:false`,
and identifiable as placeholder content**. Its intended nonpublication is an
accepted future policy, not current implemented behavior.

All three short aliases remain 301 redirects to their hyphenated service URLs:
`/aba`, `/autismevaluations`, and `/learnersocialclub`.

### Additional discoveries and checking-method differences

- Six author-pagination links were recovered from archived HTML beyond the
  earlier narrative: English `/library/author/rula-diab/page/2` through `/6`, and
  Spanish `/es/library/author/rula-diab/page/2`. They are historical discoveries,
  not evidence of six new publications. All now return 200 in fresh checks.
- English Library pagination pages 3–6, previously only discovered, now return
  200. Search, the campaign page, three author indexes, and both languages'
  page-2 listings also remain verified live.
- Two links were first inventoried in the fresh pass:
  `/library/page/1` and `/library/author/rula-diab/page/1`. They were discovered
  during the final bounded pagination pass and were **not requested**. Do not
  assume either is absent, a 200, or a redirect.
- `/es` returns 301 to `/es/` without redirect following. The original audit
  followed redirects and recorded the final 200. This is a transport observation
  difference, **not established evidence that production changed**. The tool
  records the Location and does not compare unavailable redirect-body metadata
  as if title/canonical fields had been deleted.

There are 21 verified HTTP-200 routes outside the sitemap, including the four
already represented locally. The route report distinguishes these from 59
overlapping sitemap-listed routes not individually HTTP-verified in this pass.

## Significant content changes preserved from the accepted audit

These findings remain historical evidence pending page-specific reconciliation:

1. [ABA](https://www.azinstitute4autism.com/aba-therapy) and
   [referrals](https://www.azinstitute4autism.com/referrals) differed from local
   ages/eligibility copy; the individual ABA program described 18 months–8 years.
2. English/Spanish [school readiness](https://www.azinstitute4autism.com/library/aba-school-readiness-arizona)
   changed from academy promotion to a broader guide; the fall-break article
   also changed materially.
3. The [English homepage](https://www.azinstitute4autism.com/) added HSA/FSA
   information absent locally. That does not itself justify new JSON-LD.
4. The [team listing](https://www.azinstitute4autism.com/team) differed from
   local names; website differences do not prove employment status.
5. Spanish privacy content and nine English articles were absent locally.
6. `/lp/early-intervention` existed with an API-backed form; its ownership remains
   a separate decision from full-site migration.

## SEO / URL risks

**Inherited findings, not repaired:** syndicated articles self-canonicalize
locally despite external production canonicals; hreflang is absent; BlogPosting
and standalone FAQPage schema are missing; display H1 is conflated with SEO
title; publication exceptions are not modeled; and the separate sitemap
generator extracts canonical strings without adequate publication exclusions.

Global staging noindex currently protects all generated pages. Turning indexing
on would not implement the intended `/ar` or `/schedule-consultation` exceptions.
Archive/search routes lack implementations or explicit redirect dispositions.
Existing nginx rewrites are report artifacts, not deployed routing behavior.

The route audit does not enforce these future policies or label overlaps as
content-aligned. It records observed behavior for subsequent milestones.

## Forms / analytics / external integrations

**Inherited findings:** production uses Jotform, HubSpot forms, a campaign API,
Google Analytics/consent setup, and Ahrefs analytics. Astro has disabled static
forms, configurable counters, payment links, video, and Leaflet/OpenStreetMap.
Form and tracking parity is incomplete. No legal compliance conclusion is made.

Phase 1 used raw GET requests only. It did not execute production JavaScript,
submit forms, contact form/counter APIs, unlock the portal, or fetch external
canonical publishers. Same-origin GET form actions were recorded as discovery
references (for example `/search`); no field values were submitted.

## Technical debt, sequence, and human gates

Keep the existing foundation. Resume through individually reviewed milestones:
Markdown rendering; route/publication policy; genuine translation relationships;
display/social/article/FAQ metadata; high-impact service and homepage facts;
Library capability design and content batches; source-supported multilingual
work; detailed visual/accessibility QA; and eventual cutover preparation.

Library search, pagination, and author routes are required capabilities. Inspect
the Astro architecture before selecting search technology; do not copy HubSpot
implementation details by default. Correct material service facts before
extensive pixel-level matching. Substantive translation changes finish ready
for human language review, not self-approved fluency.

Human decisions remain required for employee access, campaign ownership,
production form activation, analytics/consent architecture, and conflicting
public eligibility claims. None is authorized as implementation by this report.

## Reproducing the route reconciliation

Run from `www/`, using the already installed project dependencies:

```sh
npm run build
npm run test:routes
npm run audit:routes
npm run audit:routes -- --check
```

- `audit:routes` requires existing build output. It reads source page/post
  records and generated HTML; discovers through robots.txt, sitemap(s), five
  locale/index seeds, links, and targeted checks; then writes a new dated JSON.
- It uses sequential same-origin GET requests, at least 750 ms between starts
  (or the applicable robots crawl-delay), 15-second timeouts, ten sitemap and
  80-request limits. It records redirects without following them and stops
  network work on 429, 5xx, or a network failure. Incomplete discovery exits
  nonzero with evidence where available; inability to establish robots policy
  stops before page discovery.
- Known tracking parameters and trailing slashes are normalized. Unknown and
  semantic query parameters, their ordering, and fragments are preserved.
  Fragment references share one HTTP route and are not fetched separately.
  Arbitrary query variants are not automatically crawled.
- Only 404/410 establish verified absence. Sitemap omission, redirects, blocked
  requests, and network failures never do. Locale and canonical come from HTML
  where actually inspected; unrequested metadata is not invented.
- Normalized route rows retain local counterparts, discovery sources/times,
  request statuses/times, metadata where collected, and a route-level
  disposition. The request ledger separately dates each discovery document.
- Subsequent runs create new files; they do not overwrite the accepted baseline
  or prior snapshots. Baseline hashes protect the inherited evidence identity.

Offline validation of this exact snapshot, with no network or writes:

```sh
npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-07-offline.json
```

After intentional local changes, rebuild and reconcile against the same saved
production evidence without making production requests:

```sh
npm run build
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-07-offline.json
npm run audit:routes -- --check
```

`--check` defaults to the snapshot with the latest `generatedAt`. It verifies
the application source/asset fingerprint and recomputes route rows, totals, and
baseline comparisons. It fails on mismatches or saved discovery warnings. It
does **not** certify that production has remained unchanged since observation.
Build before capture when application files changed: the tool requires `dist`
but cannot prove that an arbitrary pre-existing build was produced from the
current source. Application fingerprints exclude this audit tooling and reports.

## Phase 1 validation and remaining uncertainty

- Focused offline tests cover normalization, meaningful queries/fragments,
  deduplication, classification, placeholders, redirects, external canonicals,
  inherited comparisons, and robots handling.
- Fresh discovery performed 70 requests: one robots, one sitemap, 68 pages.
  Responses: 65 HTTP 200, four 301, one 404. No failures or discovery warnings.
  One additional preflight `robots.txt` GET preceded the tool run and is not
  counted in its request ledger; no other production requests were made in Phase 1.
- The sitemap membership and ten missing content routes match the accepted
  baseline. Known gaps remain findings; they do not make a consistent inventory
  fail its offline check.
- Per-page content/layout parity, full accessibility testing, linguistic review,
  external integrations, and the two newly discovered `/page/1` behaviors remain
  outside this milestone's verification.
- `npm run test:routes`: **9/9 passed**, entirely offline.
- `npm run audit:routes`: **passed**, with the fresh observations above.
- `npm run audit:routes -- --offline --evidence ...`: **passed**, retaining the
  same production observations while validating final comparison logic. The
  superseded preliminary generated artifact was not retained in the repository.
- `npm run audit:routes -- --check`: **passed** against the final saved snapshot,
  including after the final build; no network requests or file writes.
- `npm run build`: **passed**, 97 pages, zero errors/warnings/hints.
- `npm run audit:links`: **passed**, zero broken internal links; the existing
  broken-links report remained byte-for-byte unchanged.
- `git diff --check`: **passed**. Application source, assets, Astro configuration,
  dependency declarations, lockfile, and existing migration reports are unchanged.
  The package manifest adds only the two audit/test commands.
- All 97 generated pages retain the saved baseline titles, descriptions,
  canonicals, headings, JSON-LD, and main-content text after normalizing existing
  randomly generated contact-obfuscation IDs. Whole-output hashes differ because
  `ContactObfuscation.astro` already uses `Math.random()` for those IDs; byte
  identity is not claimed. No application behavior change was introduced.
- `merge-plan.md` remains untracked and unchanged. Before/after SHA-256:
  `015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.

**Recommendation:** Phase 2 is the next useful milestone, subject to approval.
The ratio defect remains unchanged. Search the complete Markdown/MDX corpus and
directive consumers before altering parsing; retain explicit heading IDs and
add rendered Markdown/MDX regression coverage. No Phase 2 work was performed.
