# Phase 6A Library Architecture Proposal

**Decision date:** 2026-10-09 UTC
**Starting checkpoint:** `34d5394b3ce765028a27b9cddd9952de3f09bfe7`
**Status:** proposal only; implementation is not authorized

## A. Executive Decision Summary

### Recommended architecture

1. **Search:** generate one compact JSON document index per language from the
   existing publication manifest and blog collection. Load it on demand and use
   a small dependency-free TypeScript client for normalization, ranking, result
   rendering, URL state, and accessibility. Search title, description, headings,
   category, author display data, and future tags. Do not index full article
   bodies in the first release.
2. **Library pagination:** render ten articles per static page, matching the
   verified production page size. Keep each locale's existing Library root as
   page 1, generate only nonempty `/page/{n}` pages for `n >= 2`, and permanently
   redirect `/page/1` aliases to the corresponding root.
3. **Author archives:** derive localized author pages and their pagination from
   author records plus the same eligible-post catalog. Generate no manually
   maintained post lists. Author roots use explicit author `translationKey`
   relationships; numbered author pages do not become translations merely
   because their numbers match.
4. **Routing and policy:** add archive/search descriptors to the shared route and
   publication model rather than creating a second eligibility system. The
   existing `[...slug].astro` manifest-driven route architecture should dispatch
   content and generated archive kinds from one validated static-path inventory.
5. **Progressive enhancement:** server-rendered paginated Library and author
   pages remain complete navigation without JavaScript. Search is an explicit
   enhancement; without JavaScript the search control is not presented as
   functional and visitors retain normal archive navigation.

This is preferable at the present scale because the three measured metadata
indexes total **42,090 bytes uncompressed, 12,693 bytes gzip, or 10,709 bytes
Brotli** for 65 records. English alone is 26,391/8,036/6,652 bytes. A custom
metadata index keeps queries local, adds no package or service, excludes drafts
at build time, and can implement Spanish/Arabic normalization explicitly. A
full-body prototype would be 474,623 bytes uncompressed and 135,796 bytes gzip;
that additional payload is not justified by a verified visitor requirement.

### Important tradeoffs

- Metadata search will not find a term appearing only in article body copy.
- Dependency-free ranking will be deterministic and understandable but less
  sophisticated than fuzzy/stemmed third-party search.
- Production currently has 55 English articles and six ten-item pages; Astro has
  46 English records and can create only five nonempty pages. The nine missing
  Phase 6C articles must be reconciled before English page 6 and author page 6
  can be accepted. The architecture must not create an empty page or redirect a
  distinct archive page merely to satisfy a route count.
- The current localized author records are structurally usable but their names
  and English-only short descriptions do not reproduce the current Spanish and
  Arabic archive headings/biographies. Author content needs source-supported
  reconciliation and human language review before those archives publish.

### Approval gates

Approval is required for the metadata-only search scope, the `/search`
compatibility behavior, inclusion of accessible noindex syndicated records in
listings/search, pagination/archive indexing and sitemap treatment, author
record changes, and sequencing Phase 6C before final English pagination.

## B. Current Architecture Inventory

### Rendering and routing

- `src/pages/[...slug].astro` asks `getPublicationManifest()` for every eligible
  page/post route and dispatches the three `slug: library` records to separate
  English, Spanish, and Arabic components. There is no generated archive kind.
- `LibraryEnglish.astro`, `LibrarySpanish.astro`, and `LibraryArabic.astro` each
  independently filter the manifest by language, sort by date descending, render
  every eligible post, and repeat a five-item “popular” slice. English alone
  renders an inert `<input type="search">`; no script, form, filtering, state, or
  announcements exist.
- `BlogIndexLayout.astro` supplies shared hero/intro/sidebar layout and delegates
  list contents. `BlogCard.astro` creates localized article URLs and dates, but
  hardcodes Rula Diab's English byline/avatar and does not link to an author
  archive.
- `BlogPostLayout.astro` likewise hardcodes the visible English byline. Its
  BlogPosting JSON-LD independently resolves an exact locale/slug author and
  already fails for missing or ambiguous records.
- The three Library Markdown bodies contain old extracted listing snapshots.
  `[...slug].astro` bypasses these bodies, so they do not render, but they are a
  competing stale representation. Phase 6B should replace them with maintenance
  notes only after the generated Library implementation is accepted.

### Publication and translation policy

- `publication.ts` combines page and blog collections and delegates route,
  canonical, eligibility, sitemap, collision, and translation validation to
  `publication-policy.ts`.
- Drafts are not generated. Published noindex and external-canonical records are
  generated but excluded from the sitemap and hreflang graph. Staging globally
  emits `noindex,nofollow`, an empty sitemap, and no hreflang.
- Translation equivalence is explicit and collection-scoped through
  `translationKey`; it is never guessed from slugs.
- Authors are intentionally outside the current publication manifest. Author
  records declare locale and translation keys, but no author routes exist.

### Current content inventory

The historical 65-post count remains accurate, but it was independently
recalculated from the current files and frontmatter:

| Language | Records | Generated/non-draft | Noindex + external canonical | Sitemap-eligible | Raw Markdown/MDX body bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| English | 46 | 46 | 2 | 44 | 276,099 |
| Spanish | 12 | 12 | 0 | 12 | 105,272 |
| Arabic | 7 | 7 | 0 | 7 | 41,832 |
| **Total** | **65** | **65** | **2** | **63** | **423,203** |

There are no drafts. The two exceptions are
`community-highlight-meet-rula-diab` and `new-aia-scottsdale-office`; both are
accessible local English routes with verified `noindex` and external canonicals.
Current Library components use `eligible`, not `sitemapEligible`, so all 65
appear in lists.

Every record has title, description, date, author, category, featured image,
canonical, and translation key. All use category `Library`, all have an empty
tags array, none has `updatedDate`, and none supplies image `alt` frontmatter.
The content model can support tags and modification dates later without changing
the archive algorithm. Search should not pretend empty tags add useful ranking.

Equal-date sets exist in both English and Spanish. Current ordering is date
descending with an implicit stable route order inherited from the manifest.
The new catalog should make this explicit: **date descending, then normalized
route/slug ascending**.

### Author inventory and relationships

| Language | Author records | Author slug | Referencing posts |
| --- | ---: | --- | ---: |
| English | 1 | `rula-diab` | 46 |
| Spanish | 1 | `rula-diab` | 12 |
| Arabic | 1 | `rula-diab` | 7 |

The three records share `translationKey: rula-diab`, name `Rula Diab`, one
avatar, and the same short English description. The schema has `name`, `slug`,
optional `description`, optional `avatar`, `lang`, and `translationKey`. It is
sufficient to identify and relate archives, but not to reproduce production's
localized credentialed headings and biographies without content reconciliation.
An optional locale-specific `displayName` is justified for archive presentation
while preserving `name` as the person's name in BlogPosting schema. No multiple-
author field should be added until a real multi-author record requires it.

## C. Production Behavior and URL Evidence

### Method and freshness

`robots.txt` was checked first. It allows the requested public paths. Twenty-nine
bounded sequential GETs were made from **2026-10-09 18:01:51 through 18:02:17
UTC** with no-cache request headers, no redirect following, no authentication,
and no form submission. Requests covered representative roots, first-page
aliases, last pages, first invalid boundaries, author equivalents, and search.
One headless Chromium GET then allowed the existing search JavaScript to render
one result page; it did not submit a form or write to production.

HubSpot responses variously reported `HIT`, `MISS`, or `REVALIDATED` and mostly
identified October 3–4 prerenders. `Cache-Control: no-store, no-cache,
must-revalidate` did not establish origin freshness. Findings are current public
behavior from consistent responses, with potentially cached content. The older
2026-10-07 route report remains historical evidence for URLs not repeated.

### Observed behavior

| Family | Fresh result | Visible results | Navigation / metadata |
| --- | --- | ---: | --- |
| `/library` | 200, `lang=en-us` | 10 | Pages 1–6; page 6 has 5; page 7 is 404 |
| `/es/library` | 200, `lang=es` | 10 | Pages 1–2; page 2 has 2; page 3 is 404 |
| `/ar/library` | 200, `lang=ar dir=rtl` | 7 | One page; page 2 is 404 |
| English author root | 200 | 10 | Pages 1–6; page 6 has 5; page 7 is 404 |
| Spanish author root | 200 | 10 | Pages 1–2; page 2 has 2; page 3 is 404 |
| Arabic author root | 200, RTL | 7 | One page; page 2 is 404 |

All six `/page/1` candidates return 200 and show the same ordered article links,
title, and counts as their root rather than redirecting. English trailing slashes
on `/library/` and `/library/author/rula-diab/` return 301 to their no-slash
forms. The inspected archive/listing pages expose no canonical or robots meta;
their pagination/author URLs are absent from the production sitemap.

The author roots display substantial localized bios and credentialed headings:
English `Rula Diab, Clinical Director, M.Ed, BCBA, LBA`, a Spanish localized
equivalent, and an Arabic localized equivalent. These are not represented by
the current local author records and must not be invented from this report.

### Production search

Library search forms use GET `/search` with `term` plus repeated `type=BLOG_POST`
and `type=LISTING_PAGE`. The search page's own form uses `q` and also includes
`SITE_PAGE`. Raw `/search` and `/search?term=autism` HTML contains no results;
the existing HubSpot JavaScript loads them after page load.

A browser-level GET of
`/search?term=autism&type=BLOG_POST&type=LISTING_PAGE` displayed **66 mixed-
language results**, ten per result page, and result offsets `0`, `10`, … `60`.
The first page included English and Spanish Library roots/posts, confirming that
production search is global rather than scoped to the Library page's language.
The search page has no useful document title (raw parsing resolves an SVG title),
canonical, or robots directive. With JavaScript unavailable, production shows
no results.

## D. URL Disposition Matrix

`Current` below means the October 9 check; `historical` means the accepted
October 7 route evidence. Proposed archive pages are self-canonical, indexable,
and sitemap-eligible under the shared policy. `/search` is noindex and excluded.

| Production URL or pattern | Purpose / language | Evidence and existing behavior | Proposed Astro behavior and preservation | Redirect / canonical / indexing | Phase 6B validation |
| --- | --- | --- | --- | --- | --- |
| `/library` | Library page 1, EN | Current 200, 10 results, pages 1–6 | Preserve static page 1 | Self-canonical; index; sitemap; existing EN/ES/AR root hreflang | Generated HTML, canonical, first 10 sorted posts |
| `/es/library` | Library page 1, ES | Current 200, 10 results, pages 1–2 | Preserve static page 1 | Self-canonical; index; sitemap; existing root hreflang | Locale cards/date/labels and two-page navigation |
| `/ar/library` | Library page 1, AR | Current 200, 7 results, RTL | Preserve static one-page archive | Self-canonical; index; sitemap; existing root hreflang | `lang=ar dir=rtl`; no nonexistent page 2 |
| `/library/page/1` | First-page alias, EN | Current 200 duplicate | Preserve incoming URL through **301 to `/library`** | Redirect only; canonical destination `/library`; no HTML/sitemap | Redirect map and no duplicate HTML |
| `/es/library/page/1` | First-page alias, ES | Current 200 duplicate | 301 to `/es/library` | Redirect only | Redirect test |
| `/ar/library/page/1` | First-page alias, AR | Current 200 duplicate | 301 to `/ar/library` | Redirect only | Redirect test |
| `/library/page/2`–`/5` | Library pages, EN | Current 200; `/2` historical/current, `/3`–`/5` historical 200 | Generate nonempty ten-item pages from current corpus | Self-canonical; index; sitemap; no hreflang inferred | Route/card boundaries, prev/next, direct access |
| `/library/page/6` | Library last page, EN | Current 200 with 5 production posts | Generate only after Phase 6C supplies the missing records; do not create empty/redirected substitute | Self-canonical; index; sitemap once real | Phase 6C prerequisite; assert 5 real cards |
| `/library/page/7+` | Invalid future boundary, EN | Current `/7` 404 | Generate only if eligible count later requires it; otherwise 404 | No canonical/sitemap while absent | Beyond-last route absent |
| `/es/library/page/2` | Library last page, ES | Current 200 with 2 | Generate static page | Self-canonical; index; sitemap; no page-number hreflang | Exactly 2 cards today |
| `/es/library/page/3+` | Invalid boundary, ES | Current `/3` 404 | No route until count requires it | 404 while absent | Beyond-last route absent |
| `/ar/library/page/2+` | Invalid boundary, AR | Current `/2` 404 | No route until count requires it | 404 while absent | Beyond-last route absent |
| `/library/author/rula-diab` | Author root, EN | Current 200, localized bio, pages 1–6 | Generate from EN author record and posts after author content reconciliation | Self-canonical; index; sitemap; explicit author-root hreflang only | Author resolution, bio, links, first 10 posts |
| `/es/library/author/rula-diab` | Author root, ES | Current 200, Spanish bio, pages 1–2 | Generate from ES author record; no invented copy | Self-canonical; index; sitemap; author-root hreflang | Human-reviewed source content and route test |
| `/ar/library/author/rula-diab` | Author root, AR | Current 200, Arabic bio, RTL | Generate from AR author record; no invented copy | Self-canonical; index; sitemap; author-root hreflang | RTL and human-reviewed source content |
| `/library/author/rula-diab/page/1` | Author first alias, EN | Current 200 duplicate | 301 to author root | Redirect only | Redirect test |
| `/es/library/author/rula-diab/page/1` | Author first alias, ES | Current 200 duplicate | 301 to ES author root | Redirect only | Redirect test |
| `/ar/library/author/rula-diab/page/1` | Author first alias, AR | Current 200 duplicate | 301 to AR author root | Redirect only | Redirect test |
| `/library/author/rula-diab/page/2`–`/5` | Author pages, EN | Current/historical 200 | Generate from current matching posts | Self-canonical; index; sitemap; no numbered hreflang | Same deterministic chunks as Library today |
| `/library/author/rula-diab/page/6` | Author last page, EN | Current 200 with 5 | Generate after Phase 6C; no empty substitute | Self-canonical; index; sitemap once real | Phase 6C prerequisite |
| `/library/author/rula-diab/page/7+` | Invalid boundary, EN | Current `/7` 404 | 404 until count requires route | Absent from sitemap | Beyond-last route absent |
| `/es/library/author/rula-diab/page/2` | Author last page, ES | Current 200 with 2 | Generate static page | Self-canonical; index; sitemap | Exactly 2 matching posts |
| `/es/library/author/rula-diab/page/3+` | Invalid boundary, ES | Current `/3` 404 | No route until required | 404 | Boundary test |
| `/ar/library/author/rula-diab/page/2+` | Invalid boundary, AR | Current `/2` 404 | No route until required | 404 | Boundary test |
| `/search` | Search shell, global | Current 200; client-rendered; malformed/absent SEO metadata | Preserve one static compatibility route using generated locale indexes and locale filter | Self-canonical path; **noindex,follow**; no sitemap/hreflang | Direct route, empty state, JS/no-JS behavior |
| `/search?term={query}` and repeated `type` | Legacy search state | Current form behavior; mixed-language results | Read `term`; safely ignore legacy `type`; preserve URL and client-render compatible results | Canonical `/search`; noindex; query escaped | Direct-load and XSS/Unicode tests |
| `/search?q={query}` | Search-page form state | Current search page uses `q` | Accept as alias input; normalize to one in-page state without network forwarding | Canonical `/search`; noindex | `q` and `term` equivalence test |
| `/search?...&offset={10n}` | Search pagination state | Browser verified offsets 0–60 | Honor nonnegative multiples of 10 on compatibility route; invalid values normalize to 0 | Canonical `/search`; noindex | Direct page, last/invalid offset tests |
| `/{locale?}/library/` and author trailing slash variants | Normalization | English examples current 301; other variants not individually requested | Host-level 301 to no-slash normalized route | Redirect only | Redirect-map and deployment acceptance test |

## E. Search Alternatives and Comparison

| Approach | Quality / languages | Payload and build | Accessibility / privacy | Maintenance | Decision |
| --- | --- | --- | --- | --- | --- |
| Generated metadata JSON + custom TypeScript | Explicit field weighting; deterministic Unicode normalization; Spanish accent and Arabic mark handling tested locally; no stemming/fuzzy by default | Current all-language index 42,090 raw / 12,693 gzip; one small client module; ordinary Astro static endpoints | Full control of semantic form/status/focus; queries stay in browser except legacy `/search` URLs; no third party | Small project-owned helper and tests; transparent failure modes | **Recommended** |
| MiniSearch-style client index | Built-in field boost, prefix, fuzzy matching, suggestions | Adds dependency and serialized index/client code; exact project payload not measured because no package was installed | Local/private and static; UI still project-owned | Better relevance features, but tokenizer/fuzzy behavior needs locale tuning and dependency upkeep | Defer until measured search-quality failures justify it |
| Pagefind-style post-build search | Indexes rendered pages after Astro, separates indexes by document language, supports static hosting | Adds post-build executable/runtime bundles and tends toward full-page text; changes build/deployment pipeline | Local/private; UI can be accessible but requires integration; no server | Strong general-site search, but broader than this Library and duplicates manifest eligibility/filter work | Reject for current 65-record Library; reconsider for verified site-wide full-text search |
| External hosted search/API | Potentially strongest ranking/analytics | Network/service dependency and operational credentials | Visitor terms leave the site; logging, consent, retention, failure, and cost concerns | Highest operational burden | Reject under static/data-minimization requirements |

The proposed index stores route, locale, title, description, headings, category,
future nonempty tags, author display name/slug, and publication date. It excludes
article body HTML, unpublished content, likes/views, and sensitive or runtime
data. Featured images need not be duplicated; result cards can use the existing
article metadata or omit thumbnails in the compact search view.

Normalization should use Unicode NFKC, locale-aware lowercasing, collapsed
whitespace, and Unicode punctuation separators. A secondary comparison key may
fold Latin combining marks so `evaluacion` finds `evaluación`, and remove Arabic
tashkeel/tatweel so marked and unmarked forms match, while preserving original
display text. Do not apply English stemming to Spanish or Arabic. Rank exact
title phrase, title tokens, heading matches, description, category/tags, and
author in that order; break equal scores by date descending then route ascending.
Prefix matching should require a minimum token length. Empty queries render the
normal archive; no-result queries announce zero and offer clear/reset.

## F. Pagination and Author Architecture

### Shared catalog

Add a pure `library-catalog` module that accepts the existing publication
manifest and author records and returns:

- eligible posts grouped by locale;
- explicit deterministic ordering;
- ten-item page slices and nonempty page descriptors;
- exact locale/slug author resolution with duplicate/missing validation;
- author archive descriptors derived from post relationships;
- compact locale search records.

It must not read extracted Library Markdown listing bodies or maintain manual
post arrays. Current accessible noindex/external-canonical posts remain listable
because that is established behavior, while drafts remain absent. An author
archive should require a valid locale author record and at least one eligible
post, including at least one sitemap-eligible post before the archive itself can
be indexable.

### Static route generation

Extend the manifest-driven static-path inventory with validated generated route
descriptors (`library-page`, `author-index`, `author-page`, `search`) and run
their canonical, collision, robots, and sitemap state through reusable Phase 3A
policy functions. Do not hand-author content records for numbered pages. The
catchall renderer can dispatch descriptor kinds to shared Library/archive
components while preserving content routes and collision detection.

Page 1 is always the unnumbered root. Next/previous and numbered links are real
anchors with localized accessible labels, `aria-current="page"` on the current
page, and no links to nonexistent pages. Invalid numbers, zero, negative values,
nonintegers, unknown author slugs, authors with no eligible posts, and pages past
the end produce no static route and therefore 404.

Search temporarily replaces the visible page list with all-language-appropriate
matching results and hides the archive pager; clear/reset restores the original
server-rendered page. Adding, removing, drafting, or changing an article updates
search and page chunks in one build without manual index edits.

### Author presentation

Resolve the author once by exact locale and slug. Reuse the same resolution in
BlogCard, BlogPostLayout, BlogPosting schema, and author archives. Add an optional
locale-specific `displayName` only to preserve the published credentialed archive
heading; retain `name` for the Person entity. The existing description/avatar can
drive the bio after source reconciliation. Build must fail on missing or duplicate
locale/slug records. Do not treat authors as team members or infer employment.

### Route-count model

With the current 46/12/7 corpus and ten items per page:

| Addition | HTML routes | Sitemap URLs | Hreflang links |
| --- | ---: | ---: | ---: |
| `/search` | +1 | 0 | 0 |
| Library pages 2+ (4 EN, 1 ES) | +5 | +5 | 0 |
| Three author roots | +3 | +3 | +12 if explicit author equivalence is approved |
| Author pages 2+ (4 EN, 1 ES) | +5 | +5 | 0 |
| **Projected current total** | **96 + 14 = 110** | **92 + 13 = 105** | **174 + 12 = 186** |

This current-corpus model intentionally lacks the two distinct English page-6
routes. If all nine Phase 6C English posts are ordinary eligible/indexable
records, those posts add nine HTML/sitemap URLs and produce one more Library and
one more author page. The combined projection becomes **121 HTML routes** and
**up to 116 sitemap URLs**. Exact counts must be recalculated from final policy;
new translation relationships could separately affect hreflang.

## G. Multilingual and SEO Design

- Each JSON index contains one locale only. Embedded Library search never mixes
  languages. The `/search` compatibility page may search all locales but must
  expose an explicit locale filter and label result language.
- Components receive localized labels/messages; none are generated by machine
  translation. Missing copy blocks implementation for that locale rather than
  falling back silently to English.
- Arabic uses the existing `lang=ar dir=rtl` layout. Pagination order, arrows,
  search icon placement, result counts, focus order, and mixed Latin/Arabic text
  require RTL browser testing. Use `Intl.DateTimeFormat`/`Intl.NumberFormat` with
  the page locale; keep machine-readable dates stable.
- Existing Library roots retain their explicit three-language translation set.
  Numbered pages do not receive hreflang because page N contains different
  records across locales.
- Author roots may participate only through the author collection's explicit,
  validated `translationKey`, with reciprocal published archives and English as
  `x-default`. Numbered author pages receive no hreflang.
- `/search` has no translation graph and is noindex. JSON endpoints and redirect
  sources never enter the sitemap.
- Generated archive pages self-canonicalize to normalized local URLs and use the
  staging/production robots switch. Page 2+ and author archives are recommended
  as indexable and sitemap-eligible to remain consistent with Phase 3A's “all
  eligible self-canonical local routes” rule. This intentionally improves on
  production's missing canonicals and sitemap omission and requires approval.
- LanguageSwitcher uses only the validated graph. It must not construct page-N,
  author, or search equivalents from route shape.

## H. Accessibility and Progressive Enhancement

- Render complete cards and archive pagination on the server.
- Hide/reveal the enhanced search form only after its script initializes; include
  a `<noscript>` explanation and links to the three Library roots. Do not show a
  control that appears functional when JavaScript is unavailable.
- Use an explicit label, native search input, submit button, and clear button.
  Preserve browser keyboard behavior; Escape may clear only when documented and
  must not trap focus.
- Announce result counts/no-results through a persistent `aria-live="polite"`
  status. Do not announce on every keystroke without debouncing.
- Keep focus in the input while typing. On explicit submission, move focus to a
  results heading only when that improves navigation; clearing returns to the
  input and restores the original archive.
- Use real result links and real pagination anchors. Mark current page with
  `aria-current`; give previous/next localized accessible names; maintain visible
  focus indication and adequate touch targets.
- New embedded searches should store state in a URL fragment to avoid sending
  terms to the static server while retaining share/back-forward behavior. The
  legacy `/search?term=` compatibility route necessarily sends its query and
  should document that static-host access logs may retain it.

## I. Performance and Deployment

Expected static output is three JSON files such as
`/assets/search/library-en.json`, `library-es.json`, and `library-ar.json`, one
compiled client module, the generated HTML archives, and redirect-map entries.
Load only the current locale index on first interaction; `/search` can load the
selected locale and additional indexes only when requested. Cache fingerprinted
client code immutably and JSON with normal deploy revalidation so new posts are
visible after a release.

No database, persistent process, server-side search, external query service,
environment variable, or production API is required. The result works on nginx,
the current Nix environment, a Raspberry Pi serving static files, the existing
VPS, and conventional static hosts. Build cost is a small pass over content and
JSON serialization. Redirect behavior remains a deployment concern and must be
validated against the selected host; Phase 6A changes no nginx/Nix/deployment
file.

## J. Proposed Phase 6B Implementation Checkpoints

### 6B.1 — Shared catalog and search assets

- **Likely files:** new `src/utils/library-catalog.ts`; JSON endpoint(s);
  `LibrarySearch.astro` and client script; existing Library components/layout;
  tests and README/report.
- **Work:** derive eligible locale catalogs, explicit sort, metadata-only index,
  normalization/ranking, locale messages, embedded search, and `/search`
  compatibility route. Replace inert English input; add Spanish/Arabic controls.
- **Dependencies:** approval of search fields, legacy route behavior, and
  noindex-record inclusion. No package dependency recommended.
- **Acceptance:** all search cases pass; JSON contains no drafts/body; current
  route count increases by one for `/search`; search remains noindex/out of
  sitemap; normal Library works without JavaScript.
- **Validation:** `test:library`, SEO/publication suites, both builds, route/link
  audits, browser keyboard/RTL/JS-disabled checks.

### 6B.2 — Library pagination and first-page redirects

- **Likely files:** catalog helper, route manifest/catchall dispatch, shared
  Library renderer/pager, redirect generator/map, tests/reports.
- **Work:** ten-item chunks, page 2+ descriptors, root page 1, invalid-page 404,
  six page-1 redirects, localized pagination. Remove bypassed listing snapshots
  from the three Library bodies only after rendered acceptance.
- **Prerequisite:** Phase 6C must supply the nine missing English records before
  `/library/page/6` can pass preservation acceptance. If Phase 6C is not ready,
  stop this checkpoint with five English pages rather than fabricating content.
- **Acceptance:** every page has unique real content, explicit sort, valid
  canonicals/robots/sitemap state, no empty pages, and production URLs through
  current last pages.

### 6B.3 — Author model, archive roots, and byline links

- **Likely files:** author schema/records, catalog/route descriptors, new author
  archive presentation, BlogCard, BlogPostLayout, structured-data resolution
  helper, tests/report.
- **Work:** optional `displayName`, source-supported localized bios/headings,
  exact locale/slug resolution, archive pages/pagination, and shared linked
  bylines. Preserve BlogPosting attribution semantics.
- **Dependencies:** source reconciliation and human Spanish/Arabic review;
  approval of author-root hreflang and sitemap policy.
- **Acceptance:** roots and all nonempty numbered routes resolve; missing,
  duplicate, zero-post, and invalid authors fail/404 appropriately; no manual
  article arrays; no employment claims.

### 6B.4 — URL and SEO reconciliation

- **Likely files:** existing redirect generation/report outputs, publication
  tests, route-audit evidence; no hosting config until separately authorized.
- **Work:** add exact page-1/trailing normalization decisions, verify canonical,
  robots, sitemap, collisions, invalid boundaries, search noindex, and preserve
  all known paths.
- **Acceptance:** disposition matrix is executable and audited; no redirect to a
  generic Library root for a distinct page 2+ URL; staging safeguards remain.

### 6B.5 — Multilingual, accessibility, and performance acceptance

- **Likely files:** focused tests/report and only defect fixes in approved
  components.
- **Work:** English/Spanish/Arabic search, localized counts/dates, RTL pager,
  screen-reader announcements, keyboard/focus, JS-off browse, payload checks,
  mobile/desktop browser review.
- **Acceptance:** no fabricated translation routes; index sizes recorded; no
  external query transmission; complete build/audit matrix passes.

Each checkpoint must be an isolated reviewable diff. Failed validation stops the
sequence. Phase 6C content changes should remain a separate checkpoint even if
they are scheduled between 6B.1 and 6B.2.

## K. Test Matrix

| Area | Scenario | Test level | Expected result |
| --- | --- | --- | --- |
| Search | Empty/whitespace query | Unit + browser | Normal archive restored; no false zero-result state |
| Search | No match, one match, many matches | Unit + generated browser fixture | Correct deterministic count/order and polite announcement |
| Search | Case, repeated whitespace, punctuation | Unit | Normalized equivalent matches |
| Search | `evaluación`/`evaluacion` and Spanish punctuation | Unit + browser | Accent-folded key matches; original text displayed |
| Search | Arabic marked/unmarked query and punctuation | Unit + RTL browser | Diacritics/tatweel do not block intended match; direction stays RTL |
| Search | Clear/reset, back/forward, direct fragment | Browser | State and original page restore predictably |
| Search | Keyboard/focus/screen reader | Browser/manual assistive review | Native operation, visible focus, stable focus, live count |
| Search | JavaScript disabled | Generated HTML + browser | Paginated browse works; honest no-search message |
| Search | Draft/unpublished fixture | Unit + integration | Absent from JSON/results; body content never leaked |
| Search | Legacy `term`, `q`, `type`, valid/invalid `offset` | Integration + browser | Compatibility route safely normalizes and remains noindex |
| Pagination | First, middle, last page | Unit + generated HTML | Correct slices, count, prev/next/current links |
| Pagination | Page 1 aliases | Redirect test | Locale/author-specific 301 to root |
| Pagination | Beyond-last, zero, negative, noninteger | Route integration | No generated route; 404 |
| Pagination | Zero posts / one page | Unit | No archive for zero-post author; no pager for one page |
| Pagination | Equal publication dates | Unit | Date descending then route ascending |
| Pagination | Add/remove/draft post | Fixture build | Page counts/routes/index update without manual edits |
| Author | Existing author with multiple posts | Unit + HTML | Localized record and correctly ordered posts |
| Author | New author / zero eligible posts | Fixture build | New route derives automatically only with eligible posts |
| Author | Missing/duplicate locale record | Unit + build failure | Explicit actionable validation error |
| Author | Invalid slug and page boundary | Route integration | 404; no leakage |
| Author | Localized records and links | HTML + browser | Card/article links use matching locale archive |
| SEO | Canonical/robots/sitemap | Publication unit + both builds | Shared policy exactly matches generated descriptors |
| SEO | Hreflang | Unit + HTML | Roots only when explicitly equivalent; never page-number guessing |
| SEO | Staging versus indexing | Build integration | Global noindex/empty sitemap/no hreflang restored at end |
| Routing | Known production URLs/redirects | Route audit | Every matrix row matches route or redirect evidence |
| Quality | Internal links/assets | Existing audits | No broken links or missing images |

## L. Human-decision Register

### Established project policy

- Static Astro, Markdown/MDX content collections, TypeScript, Zod, no database or
  headless CMS, no form/search backend, and no invented translations.
- Publication eligibility, canonicals, robots, sitemap, explicit translation
  relationships, staging protection, and external-canonical exceptions remain
  governed by Phases 3A/3B.
- Search, pagination, and author archives are required visitor capabilities;
  HubSpot internals need not be copied.

### Codex recommendations requiring approval

1. Approve dependency-free generated metadata JSON search and defer full-body,
   fuzzy, and stemmed search until measured failures justify them.
2. Approve ten posts per page, unnumbered page-1 canonicals, and locale-specific
   301 redirects from all six `/page/1` aliases.
3. Approve `/search` as a preserved noindex compatibility page accepting `term`,
   `q`, legacy `type`, and `offset`; embedded Library search remains locale-only.
4. Approve indexable, self-canonical, sitemap-listed page 2+ and author archives,
   even though HubSpot omits those URLs from its sitemap and canonical markup.
5. Approve retaining accessible noindex/external-canonical articles in lists and
   internal search, matching current Astro behavior; they remain excluded from
   sitemap/hreflang and preserve their metadata.
6. Approve explicit author-root hreflang from author `translationKey`, with no
   hreflang for numbered pages.
7. Approve an optional localized `displayName` author field and a separate
   source-supported author-content reconciliation with human Spanish/Arabic
   review.
8. Approve scheduling the nine-post Phase 6C reconciliation before pagination
   and author page-6 acceptance. No empty or misleading page 6 should ship.

### Not yet verified or intentionally deferred

- Production-cache timestamps do not prove origin freshness.
- Search query frequency and the value of body-only/fuzzy matching have not been
  measured; no analytics should be added to answer this without consent review.
- Exact hosting redirect syntax remains undecided and must be validated for the
  selected deployment target.
- Current author records are not adequate evidence for localized biography copy.
- Phase 6C publication/indexing/translation status for the nine missing posts is
  unknown, so the post-6C route projection is an upper-bound model.

No Phase 6B implementation, dependency installation, redirect, content edit, or
deployment change is authorized by this proposal.
