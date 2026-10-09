# Migration Summary

## Status

A maintainable Astro migration and substantial fidelity-first pass are
implemented. The live public site was used as the authority for the shared
shell, English and Spanish homepages, service-page family, team page, library
indexes, and blog-post family.

## Migrated Content and Assets

- 46 English, 12 Spanish, and 7 Arabic library posts.
- 21 English, 9 Spanish, and 2 Arabic page records.
- One author record per language.
- 167 self-hosted images, 20 font files, and two PDF downloads.
- Current June and May 2026 English library articles are included.

HubSpot-generated wrappers, analytics, scripts, CSS, query-language duplicates,
AMP variants, pagination, and author archive variants are not carried into the
Astro implementation.

## Live-Source Fidelity Pass

Live pages inspected during the pass include:

- English and Spanish homepages
- ABA Therapy, Autism Evaluations, and Learner Social Club
- About, Team, Client Consultation, and Giveback & Donate
- English and Arabic Library indexes
- Representative current library articles

Implemented fidelity work includes:

- Rebuilt the live two-tier header, navigation hierarchy, language controls,
  utility links, footer columns, and contact information.
- Rebuilt the complete English and Spanish homepages in their live section
  order using one reusable Astro component and self-hosted source assets.
- Moved the English and Spanish homepage copy into section-oriented `home:`
  frontmatter blocks so the page is easier to edit in Front Matter CMS.
- Rebuilt service pages around the live compact title banner and editorial
  presentation, with current visible headings and working calls to action.
- Recovered and restored the live decorative hero imagery for all mapped
  English and Spanish page routes plus every language's library index.
- Restored the consultation form section's injected background image.
- Added a dedicated live-derived team card grid rather than presenting the
  extracted team content as a generic article.
- Rebuilt the contact page around the live two-column content/form section and
  full-width Leaflet map while retaining local clickable obfuscated phone
  links.
- Rebuilt the giveback page as four source-faithful full-width sections with
  its original image/copy proportions, fundraiser color band, nonprofit logo,
  emphasis, and external donation calls to action.
- Rebuilt library indexes and blog-post presentation around the live sidebar,
  article list, byline, featured-image, and counter patterns.
- Converted FAQ-bearing posts to MDX and routed their accordions, the
  standalone FAQ page, and the insurance FAQ through one reusable component.
  Each accordion uses the same animated, single-open interaction and a
  component-scoped caret color override; blog and insurance instances also
  emit matching `FAQPage` JSON-LD.
- Restored 32 live-source blog blockquotes with their original emphasis,
  links, fawn backgrounds, spacing, rounded presentation, and quote-mark SVG.
- Replaced generic oversized cards, rounded controls, and marketing heroes
  with live-derived typography, palette, widths, spacing, and compact controls.
- Corrected material live-source discrepancies found during the pass,
  including current homepage ESA copy, testimonial content, and ABA copy.

### Intentional visual deviations

- The homepage and `/insurance` carrier-logo rows intentionally share one
  responsive layout. The first and last logos sit flush with the row edges,
  and the Blue Cross Blue Shield mark is emphasized at 125% of the standard
  desktop logo width, following its treatment on the live homepage rather
  than preserving the live pages' differing row spacing.
- The Community 4 Autism logo on `/donate-autism-giveback` is horizontally
  centered on mobile instead of retaining the live page's left alignment.
- The empty `<h6>` retained by the live `/schedule-consultation` page was
  removed. It had no visible content and generated an empty heading ID in the
  migrated Markdown, so omitting it improves heading semantics and fragment
  integrity without removing page content.

## URLs and Redirects

Clean public URLs are preserved, including:

- `/aba-therapy`
- `/autism-evaluations`
- `/learner-social-club`
- `/client-consultation`
- `/library`
- `/library/post-slug`
- available `/es/...` and `/ar/library/...` routes

Phase 3A replaces the earlier 97-canonical sitemap with publication-policy
output: 92 local URLs in an indexing-enabled build and none in staging.
Nginx rewrites remain limited to the brief aliases `/aba`, `/autismevaluations`,
and `/learnersocialclub`.

## Forms

Visible consultation/contact-style pages render styled static HTML forms with
backend and spam-protection TODO comments. Submission is intentionally
disabled. Appointment and enrollment calls to action route to the static
consultation page rather than retaining the production Jotform backend.

The three English service pages also reproduce the live site's delayed,
right-edge inquiry drawers, including their page-specific enrollment copy,
shared field set, modal overlay, and responsive layout. These drawer forms are
static and their submit controls remain disabled until a production backend
and spam protection are selected; this is an intentional functional and visual
deviation from the live HubSpot form.

## External Dependencies

- The contact page map intentionally matches the live Leaflet/OpenStreetMap
  implementation and loads Leaflet from `unpkg.com` plus map tiles from
  `tile.openstreetmap.org`.

## Multilingual

- Spanish has the full live-derived homepage, translated service pages,
  library index, and available translated posts.
- Arabic has RTL support, a clearly marked placeholder landing page, the live
  library family, and available Arabic posts.
- Language-switcher choices are emitted only when the corresponding Astro
  route exists, preventing dead translated-route links.
- Arabic pages use `lang="ar"` and `dir="rtl"`; English and Spanish use LTR.
- No large Arabic translations were invented.

## Likes and Views

The post counter uses `PUBLIC_AIA_API_BASE`, defaulting to
`https://api.azinstitute4autism.com`. Its contract was verified against the
current live-site script:

- `POST /stats/batch` for likes and views
- `POST /likes` to like
- `DELETE /likes/{slug}` to unlike

It preserves cookie-backed liked state and degrades gracefully if the API is
unavailable.

## SEO and Accessibility

- Canonicals, Open Graph tags, Twitter card tags, semantic titles, and global
  organization JSON-LD are emitted by shared layouts.
- Organization JSON-LD intentionally omits raw `telephone` and `email` fields;
  visible contact details use the Astro obfuscation component to avoid exposing
  plain email and phone targets in rendered HTML.
- Library-index canonicals and current visible page H1s are explicitly set.
- Extracted image alt text is retained where available.
- Semantic landmarks, skip link, labeled forms, keyboard-operable navigation,
  language/direction attributes, and responsive layouts are present.
- Sätteri heading attributes remain enabled. Markdown supports explicit
  fragment IDs such as `{#accepted-insurance-heading}`; the installed MDX
  parser requires HTML heading IDs instead. The earlier claim that MDX also
  supports the shorthand was corrected during Phase 2 (see below).
- Sätteri directive parsing was disabled during Phase 2 after confirming that
  there are no intentional consumers and that it silently removes literal
  colon-containing text. No content or dependency versions were changed.

## Validation Results

- `npm audit --offline`: passed with zero known vulnerabilities under Node
  `24.18.0`; `flake.nix` provides a compatible current Node release.
- `npm run audit:links`: passed with zero broken internal source links. The
  audit now checks generated routes, root-relative references, relative
  Markdown links, and public assets when rendered output is unavailable.
- `npm run audit:images`: passed with no missing mapped page banners, section
  backgrounds, or blog featured images.
- `npm run audit:blog`: passed with no article-header content duplicated in
  blog content and valid MDX FAQ components for 125 questions across 19 posts.
- `npm run generate:sitemap`: passed; generated 97 URLs.
- `npm run generate:redirects`: passed.
- All migration `.mjs` tools and the sandbox DNS helper pass `node --check`.
- The Astro compiler parsed all 49 `.astro` files successfully.
- `npm run build`: passed with zero Astro diagnostics and generated 97 static
  pages.
- `npm run build:sandbox`: passed; generated 97 static pages.
- Live contact-page structure was inspected in browser at a 1280px desktop
  viewport; local generated HTML was checked for the contact layout, Leaflet
  assets, map container, and obfuscated clickable phone script. Local browser
  rendering was blocked because the Playwright browser cannot reach shell
  loopback servers and blocks `file:` URLs in this environment.
- Nix shell verification and `npm audit` retrieval were blocked by sandbox
  proxy/cache network resets.

## Manual Review

- Perform full-page desktop and mobile visual comparisons for page-specific
  layouts beyond the completed homepage, team, service, library, and article
  families.
- Editorially review extracted long-form content for remaining extraction artifacts,
  stale phone/email references, and heading hierarchy.
- Review all source alt text, keyboard behavior, screen-reader output, and
  contrast with accessibility tooling.
- Have fluent reviewers approve Spanish content and Arabic RTL presentation.
- Select and connect a form backend with spam protection before launch.
- Validate like/view CORS, credentials, and production behavior after deployment.

## Phase 2: Markdown Rendering Repair — 2026-10-07 UTC

These are newly verified local rendering findings. The accepted Phase 1 audit
and route evidence remain unchanged. No production requests were made, no
source content was rewritten, and no dependencies were upgraded.

### Inspection and Cause

Before changing configuration, searched the Markdown/MDX corpus, documentation,
parser configuration, scripts, plugins, layouts, and rendering components for
container, leaf, and inline directives and their consumers. There are no
intentional directives or registered directive transformations. Documentation
examples in code fences, ordinary punctuation, URLs, times, ratios, frontmatter
fields, CSS selectors, and explicit heading IDs are not directive consumers.

For all 100 content files, stripped frontmatter and inspected the installed
Sätteri `markdownToMdast` / `mdxToMdast` output with the original
`headingAttributes: true, directive: true` features. This found 24 unintended
`textDirective` nodes in seven files, with zero container or leaf directives.
Sätteri treats colon suffixes such as `:1`, `:00`, and `:Plan` as inline
directives; without a transformation, the renderer drops those nodes. Astro's
MDX integration inherits the same processor features, so both formats were
affected. The original full build and the failing regression build confirmed
the resulting text loss.

Only `directive` was changed to `false`; `headingAttributes: true` is retained.

| Source under `src/content/` | Restored literal text | Unintended nodes |
| --- | --- | ---: |
| `pages/en/aba-therapy.mdx` | `1:1`, `1:2` in headings and prose | 4 |
| `pages/es/aba-therapy.md` | `1:1`, `1:2` in headings and prose | 4 |
| `blog/en/aba-school-readiness-arizona.mdx` | `1:1`, `1:10` in prose and tables | 4 |
| `blog/es/aba-school-readiness-arizona.mdx` | `1:1`, `1:10` in prose and tables | 3 |
| `pages/en/learner-social-club.mdx` | `4:00 PM – 6:00 PM`, twice | 4 |
| `pages/es/learner-social-club.mdx` | `4:00 p. m. – 6:00 p. m.`, twice | 4 |
| `pages/en/faqs.mdx` | `Opportunities:Plan breaks` | 1 |

### Regression and Generated-Output Verification

`npm run test:markdown` creates a temporary Astro project, loads the real
`astro.config.mjs`, and uses the existing dependencies and copied source
components/content. It builds representative `.md` and `.mdx` fixtures plus
all seven affected collection entries through `astro:content`'s `getEntry` and
`render`. The fixtures never enter the production route tree, and all temporary
files are removed after the run.

The 20 tests cover `1:1`, `1:2`, `1:10`, ordinary spaced and adjacent colon
punctuation, English/Spanish times, plain URLs and link destinations (including
port/query/fragment), inline/fenced code examples, MDX embedded markup, explicit
heading IDs and fragment links, and the affected real content. Before the
configuration change, 14 tests failed and six passed. Afterward, all 20 passed.

The full build still generates 97 pages. Comparing the before/after `<main>`
HTML on all 97 pages found changes only in the seven routes corresponding to
the table above. This comparison normalizes the existing random
`ContactObfuscation` IDs in span attributes and script variables; that component
was not changed. Generated `/aba-therapy` and `/es/aba-therapy` each now contain
both ratios in their headings and prose (two occurrences of each ratio).

All existing explicit IDs remain intact. Four automatically generated service
heading IDs now reflect the restored text:

| Route | Previous generated ID | Corrected generated ID |
| --- | --- | --- |
| `/aba-therapy` | `aba-therapy-1-program` | `aba-therapy-11-program` |
| `/aba-therapy` | `aba-therapy-1-academic-readiness-program` | `aba-therapy-12-academic-readiness-program` |
| `/es/aba-therapy` | `programa-de-terapia-aba-1` | `programa-de-terapia-aba-11` |
| `/es/aba-therapy` | `terapia-aba-1-programa-de-preparación-académica` | `terapia-aba-12-programa-de-preparación-académica` |

No source references to the old IDs were found. Compatibility with production
fragment links remains part of the later URL reconciliation; this repair does
not introduce redirects or edit service content.

The installed MDX parser rejects Markdown's `{#id}` shorthand with directive
parsing either enabled or disabled. This is a pre-existing limitation, not a
regression from the repair. No current content uses that shorthand. Tests
verify Markdown shorthand and MDX's supported `<h2 id="...">` syntax. README
guidance was corrected; a broader parser change is outside this phase.

### Validation

Run from `www/`:

```sh
npm run test:markdown
npm run build
npm run audit:links
npm run audit:blog
git diff --check
```

- Markdown regression tests: 20 passed, zero failures.
- Build: passed; 74 checked files, zero errors/warnings/hints, 97 static pages.
- Link audit: zero broken internal links.
- Blog audit: zero content audit failures.
- Diff whitespace check: passed.
- No changes to application content, dependencies, lockfile, Phase 1 evidence,
  or `merge-plan.md`. No Phase 3 work was started.

## Phase 3A: Route Eligibility, Canonicals, and Indexing — 2026-10-07 UTC

This section records new implementation and verification. Earlier Phase 1
evidence and the Phase 2 checkpoint are preserved. No deployment, form
submission, backend activation, dependency change, content reconciliation,
hreflang, translation-alternate graph, article schema, or FAQ schema work was
performed.

### Publication Architecture

`src/utils/publication-policy.ts` is the shared, framework-independent
TypeScript policy. It derives local routes from collection/language/slug,
normalizes public paths, rejects route collisions (including drafts and utility
paths), validates canonicals, and decides route and sitemap eligibility.
`src/utils/publication.ts` adapts the Astro collections and reads the existing
`PUBLIC_ALLOW_INDEXING` switch. The canonical site origin comes from `site.json`,
also used by Astro configuration.

All content routes now pass through `src/pages/[...slug].astro`. The former
fixed home and Library routes could bypass `draft`; they now use the same
manifest as other pages. The existing Arabic home and three Library index
templates were moved to presentation components, retaining their visible
content. The English/Spanish home component receives its selected entry.
Shared layouts obtain canonical/indexing policy by the actual local route;
individual templates no longer invent or pass canonical strings.

The sitemap is an Astro endpoint generated alongside HTML. Its locations come
from eligible local route URLs, never canonical strings. The old public
sitemap copy was removed. `generate:sitemap` delegates to the Astro build
instead of maintaining a separate frontmatter-regex generator. Route discovery
and the source-link audit fallback reuse the shared publication policy; route
evidence now records eligibility, noindex, policy canonical, external-canonical
status, and production sitemap eligibility separately from rendered metadata.

The sole new frontmatter/schema field is `noindex`, a boolean defaulting to
false. Existing `draft` and `canonical` fields cover the remaining rules.

### Verified Exceptions and Read-Only Production Evidence

Six successful GET requests were made between **02:42:02 and 02:42:08 UTC**:
`robots.txt` first, then the five routes below. Requests were sequential, at
least one second apart, with redirects not followed. Robots allowed these
paths. No publisher pages, forms, or production APIs were requested. The web
tool could not retrieve robots.txt; the direct GET succeeded. All five route
observations agree with the accepted saved production evidence; these are
new checks, not silent revisions to historical findings.

| Route | Fresh HTTP / robots evidence | Implemented exception | Production sitemap |
| --- | --- | --- | --- |
| `/ar` | 404 at 02:42:08 | Existing placeholder marked `draft: true`; no HTML route | Excluded |
| `/schedule-consultation` | 200 / `noindex` at 02:42:04 | `noindex: true`; accessible, self-canonical | Excluded |
| `/employee-portal` | 200 / `noindex` at 02:42:05 | `noindex: true`; accessible, self-canonical | Excluded |
| `/library/community-highlight-meet-rula-diab` | 200 / `noindex` at 02:42:06 | `noindex: true`; external canonical retained | Excluded |
| `/library/new-aia-scottsdale-office` | 200 / `noindex` at 02:42:07 | `noindex: true`; external canonical retained | Excluded |

The exact verified external canonical targets are:

- [VoyagePhoenix original](https://voyagephoenix.com/interview/community-highlights-meet-rula-diab-of-arizona-institute-for-autism/)
- [Scottsdale.org original](https://www.scottsdale.org/airpark/features/integrity-empowerment-and-excellence-arizona-institute-for-autism-expands-to-new-office/article_79c31a18-2f35-11ee-9459-6f29f5a08420.html)

Only five content files changed, all in frontmatter: the Arabic home draft
flag, four noindex flags, and the two external canonical values. Portal access
and replacement behavior remain unchanged and deferred to human decision.

### Before / After and Output Verification

| Behavior | Before Phase 3A | After Phase 3A |
| --- | --- | --- |
| Route publication | Collection routes filtered drafts; fixed indexes bypassed them | Every content route uses the same eligibility manifest |
| Generated HTML | 97 pages, including `/ar` placeholder | 96 pages; only `/ar` removed |
| Canonical handling | Optional unchecked values passed by templates; syndicated posts self-canonicalized | Exactly one normalized self canonical, or the verified external exception; missing ordinary values derive from the route |
| Indexing-enabled robots | All pages defaulted to indexable | 92 `index,follow`; four verified `noindex,follow` exceptions |
| Staging robots | Global `noindex,nofollow` | Global protection retained on all 96 pages; no page override |
| Sitemap | Static list of 97 frontmatter canonicals | 92 eligible local URLs when indexing is enabled; empty in staging |
| Robots sitemap advertisement | Environment dependent | Still advertised only in the indexing-enabled build |

Published noindex pages remain accessible. An external canonical independently
excludes a page from the sitemap; it does not automatically invent a noindex
directive. The two real syndicated articles explicitly retain their verified
noindex status. Invalid/relative/unsafe canonicals, local targets that disagree
with the route or public origin, duplicate published canonical targets, and
route collisions fail validation. Duplicate frontmatter keys also fail parsing.

The language menu now uses eligible routes without a hardcoded `/ar` entry.
The Arabic header logo falls back to the existing English homepage while its
localized homepage is unpublished. No hreflang or new translation relationships
were introduced. Main content text, titles, and H1s are unchanged on all 96
retained routes. There are no stylesheet or asset changes.

The indexing-enabled local artifact was checked at **02:54:56 UTC**: all 96
heads matched their manifest canonicals/robots; 92 local sitemap URLs; no `/ar`.
The final ordinary build restores staging output with 96 noindex pages and
zero sitemap locations. No environment files or deployment configuration changed.

### Regression Coverage and Reproduction

`npm run test:publication` passes **19 tests** covering normal publication,
draft exclusion, accessible noindex pages, external canonicals independently
of noindex, normalized/missing/malformed/duplicate canonicals, cross-collection
and cross-locale collisions, reserved routes, staging protection, and all five
verified exceptions. Generated-head checks reject absent, duplicate, and invalid
canonical tags. It builds the actual application in temporary directories in
both environment modes, then additionally marks a home and Library index as
drafts and confirms their routes disappear. The tests never change real source,
environment configuration, or `dist`.

Validation from `www/`, in the requested order (with evidence refresh steps):

```sh
npm run test:publication
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
npm run audit:links
npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
git diff --check
```

All required commands passed. Each build checked 71 files with zero errors,
warnings, or hints, and generated 96 HTML pages. The link audit found zero
broken internal links. Existing regression suites also passed: 20 Markdown
tests and nine route-audit tests. Dependencies and the lockfile are unchanged.
The source-only link fallback also passed in an isolated directory with zero
broken links. The `generate:sitemap` compatibility command was verified using
Astro's public build API, followed by another normal staging build.

The final durable local reconciliation is
[`route-reconciliation-2026-10-07-offline-04-11-25-151Z.json`](route-reconciliation-2026-10-07-offline-04-11-25-151Z.json).
It reuses the earlier 70 production request records with their original
observation dates; neither offline reconciliation made new production requests.
Only the final staging reconciliation is retained in the repository; the
intermediate indexing reconciliation was moved to temporary storage after its
checks. The six targeted requests described above are separate fresh evidence.

The normalized discovery inventory remains 129 routes, with 102 URLs in the
saved production sitemap. Local generated routes decrease from 97 to 96;
sitemap/local overlap stays 92, and the ten sitemap-listed live-only routes
remain outstanding. `/ar` remains visible in the inventory as draft,
ineligible, not generated, and verified absent on production. Earlier audit
files retain their historical facts.

No new human publication-policy decision is needed for Phase 3A. Human gates
for portal access, forms/backends, analytics/consent, landing-page ownership,
and conflicting service facts remain deferred. Phase 3B was not started.

## Phase 3B: Explicit Translation Relationships and Hreflang — 2026-10-07 UTC

This section records new work after the accepted Phase 3A structural review.
Earlier audit findings and implementation history above remain historical.
Starting branch: `faithful-astro-migration`; HEAD: `1e1aafa`. The only commit
after Phase 3A (`cd097d0`) added the conversation transcript. The Phase 1 and
Phase 2 checkpoints remain `60c534d` and `ea2f1ea`. This work is not committed.

### Inspection and Policy

The existing manifest owns every generated content route and already supplies
eligibility, normalized local URL, canonical, noindex, external-canonical and
sitemap eligibility. Inspection found 32 page records, 65 blog records and
three author records, all declaring `translationKey`. No hreflang was emitted.
The language switcher was the only equivalent-route guesser: it removed a
language prefix and tried the same URL suffix in all languages. The Header's
locale-home fallback is navigation, not a translation relationship, and remains
unchanged.

`createPublicationManifest` in `src/utils/publication-policy.ts` now groups
explicit keys within each collection. It attaches one validated `translations`
array to every eligible member of a multilingual set. Each reference contains
the declared language and the target's actual manifest route and absolute URL.
It never derives an equivalent from a slug, filename or URL suffix.

Participation reuses `sitemapEligible`: a generated/published entry that is
indexable and self-canonical under the production policy. At least two eligible
languages are required. All members, including drafts, are checked for duplicate
language declarations before filtering; two entries for the same collection,
key and language fail validation. The graph validator rejects dangling targets,
wrong collection/key/language/URL, ineligible endpoints, duplicate languages,
missing self references and nonreciprocity. All members share the same complete,
ordered set, so reciprocity is generated rather than manually maintained.

**Grouping versus missing references:** `translationKey` is an optional grouping
label, not a pointer or a list of required locales. A singleton remains valid
and emits no alternates; it does not assert that a Spanish/Arabic record exists.
An absent referenced graph node fails policy validation; an absent referenced
HTML file fails rendered-output validation. A typo that creates a new singleton
or deletion of the last counterpart cannot be distinguished from intentionally
standalone content by this schema. No new required-target field or guessed
language requirement was introduced.

The existing optional `translationKey` schema now rejects empty and
whitespace-padded values in pages, blog and authors. There are no new frontmatter
fields and **no content/frontmatter edits**. Placeholders must remain drafts;
the only marked content placeholder is `/ar`, already `draft: true`.

### Current Explicit Sets

The existing declarations produce **24 sets / 53 participating routes**:
nine page sets (19 routes) and 15 blog sets (34 routes). English contributes
24 members, Spanish 21, Arabic eight. There are 19 two-language sets and five
three-language sets. The following inventory lists actual local routes, not
inferred URLs. A dash means there is no eligible declared counterpart.

| Collection / key | English | Spanish | Arabic |
| --- | --- | --- | --- |
| pages / index | `/` | `/es` | — |
| pages / library | `/library` | `/es/library` | `/ar/library` |
| pages / aba-therapy | `/aba-therapy` | `/es/aba-therapy` | — |
| pages / aba-therapy-intake-process | `/aba-therapy-intake-process` | `/es/aba-therapy-intake-process` | — |
| pages / autism-evaluations | `/autism-evaluations` | `/es/autism-evaluations` | — |
| pages / client-consultation | `/client-consultation` | `/es/client-consultation` | — |
| pages / contact | `/contact` | `/es/contact` | — |
| pages / learner-social-club | `/learner-social-club` | `/es/learner-social-club` | — |
| pages / services | `/services` | `/es/services` | — |
| blog / aba-school-readiness-arizona | `/library/aba-school-readiness-arizona` | `/es/library/aba-school-readiness-arizona` | — |
| blog / aba-school-readiness-guide | `/library/aba-school-readiness-guide` | — | `/ar/library/aba-school-readiness-guide` |
| blog / autism-evaluation-diagnosis-arizona-parent-guide | `/library/autism-evaluation-diagnosis-arizona-parent-guide` | `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | — |
| blog / autism-evaluation-what-to-expect | `/library/autism-evaluation-what-to-expect` | `/es/library/autism-evaluation-what-to-expect` | — |
| blog / autism-family-self-care-tips | `/library/autism-family-self-care-tips` | `/es/library/autism-family-self-care-tips` | — |
| blog / autism-self-advocacy-skills-aba | `/library/autism-self-advocacy-skills-aba` | `/es/library/autism-self-advocacy-skills-aba` | `/ar/library/autism-self-advocacy-skills-aba` |
| blog / behavior-management-functions-guide | `/library/behavior-management-functions-guide` | — | `/ar/library/behavior-management-functions-guide` |
| blog / emotional-regulation-aba | `/library/emotional-regulation-aba` | `/es/library/emotional-regulation-aba` | — |
| blog / enhancing-generalization-skills | `/library/enhancing-generalization-skills` | `/es/library/enhancing-generalization-skills` | — |
| blog / executive-functioning-skills-autism | `/library/executive-functioning-skills-autism` | `/es/library/executive-functioning-skills-autism` | `/ar/library/executive-functioning-skills-autism` |
| blog / first-then-cards-autism-transitions | `/library/first-then-cards-autism-transitions` | `/es/library/first-then-cards-autism-transitions` | `/ar/library/first-then-cards-autism-transitions` |
| blog / parents-guide-to-autism-and-aba | `/library/parents-guide-to-autism-and-aba` | `/es/library/parents-guide-to-autism-and-aba` | — |
| blog / positive-reinforcement-techniques | `/library/positive-reinforcement-techniques` | `/es/library/positive-reinforcement-techniques` | `/ar/library/positive-reinforcement-techniques` |
| blog / proactive-reactive-aba-strategies-guide | `/library/proactive-reactive-aba-strategies-guide` | — | `/ar/library/proactive-reactive-aba-strategies-guide` |
| blog / social-pragmatic-communication-autism | `/library/social-pragmatic-communication-autism` | `/es/library/social-pragmatic-communication-autism` | — |

Excluded: `/ar` is draft and uses `home`, not the published home set's `index`
key; its key was not changed. `/schedule-consultation`, `/employee-portal`,
`/library/community-highlight-meet-rula-diab`, and
`/library/new-aia-scottsdale-office` remain noindex; the latter two also retain
external canonicals. None can be a source or target. Three `authors:rula-diab`
records share a key but have no generated author routes and do not enter the
graph. The other 39 indexable routes have no eligible translated counterpart.
Live-only Spanish privacy, author/archive/search routes and missing languages
are not manufactured. There are no additional current URL-matched published
pairs lacking explicit keys; different-slug and unkeyed same-slug fixtures test
that future content will not be guessed.

### SEO, Navigation and Default Language

`Seo.astro` calls the shared `hreflangLinksFor` helper. An indexing-enabled build
emits absolute alternate URLs, including the page itself, on each set member.
English is the project's established default; `x-default` points to that set's
eligible English member, never an unrelated homepage. A set without eligible
English omits `x-default` (covered with Spanish/Arabic fixtures and excluded
English fixtures). All 24 current sets have an eligible English member.

This follows [Google's localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
on fully qualified, reciprocal, self-referencing alternates and an appropriate
default. Staging emits no hreflang; its global `noindex,nofollow` and empty
sitemap remain intact. The graph still supplies local language navigation.

`LanguageSwitcher.astro` uses those same manifest equivalents and the entry's
declared language for its active label. It constructs no counterpart URLs.
Labels, SVG and CSS are unchanged. Without a translation set, it retains the
current-language label but emits no empty menu, focusable trigger or listbox
promise. Existing translated sets keep self and equivalent links. Header and
route/template dispatch code are unchanged.

### Fresh Production Observations

Six read-only GETs on **2026-10-07 23:00:32–23:00:38 UTC**, at least one second
apart, checked robots first and then these five pages. Robots permitted the
paths; all six responses were HTTP 200, with no redirects followed. No forms,
APIs, broad crawl or production writes were used; no production HTML is added
to the repository. These checks supplement, rather than rewrite, earlier audit
evidence.

| Observed page | Check time UTC | Declared production alternates |
| --- | --- | --- |
| `/` | 23:00:33 | en `/`, es `/es/`, x-default `/` |
| `/library` | 23:00:35 | en-us `/library`, es `/es/library`, ar `/ar/library` |
| `/library/autism-self-advocacy-skills-aba` | 23:00:36 | en-us, es, ar, x-default English |
| `/es/library/autism-self-advocacy-skills-aba` | 23:00:37 | en-us, es, ar, x-default English |
| `/ar/library/autism-self-advocacy-skills-aba` | 23:00:38 | en-us, es, ar, x-default English |

The article's three observations reference the same three full article paths
listed in the set inventory. The homepage and article use English defaults.
Production's Library index has no x-default; the local policy adds its real
English index as the default, consistent with the approved rule. Library
production labels English `en-us`; local output uses the existing content
language `en`, without inventing regional variants. Relationships are based on
explicit existing content declarations, supported by these targeted checks;
this is not a new full content reconciliation or linguistic-fluency approval.

### Validation and Structural Review

`npm run test:publication`: **33 passed**, including the original 19 Phase 3A
tests and 14 translation tests. Coverage includes different-slug equivalence,
unrelated matching slugs, collection boundaries, all publication exclusions,
malformed/duplicate keys, dangling graph/generated references, reciprocity,
self references, default eligibility and identical switcher/SEO membership.
Isolated real-Astro builds exercise staging, indexing and draft home/Library
indexes without changing the real content or deploying anything.

The requested validation sequence passed (offline refreshes keep source
fingerprints current without making discovery requests):

```sh
cd www
npm run test:publication
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
npm run audit:links
npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
git diff --check
```

All three regular build invocations checked 71 files with zero errors, warnings
or hints, and generated 96 HTML routes. The link audit found zero broken links.
At 23:02:40 UTC, the indexing artifact had 92 sitemap entries, 92 indexable
pages and four noindex exceptions, with 174 hreflang links on 53 routes across
24 sets. Canonicals matched the pre-change artifact on every retained route.
At 23:03:49 UTC, the final staging artifact had 96 `noindex,nofollow` pages,
zero sitemap entries and zero hreflang links. Every language menu matched the
graph. Route set, titles, canonical URLs, language/direction and main content
matched the pre-change artifact; the main-content comparison excludes script
nodes and normalizes whitespace and existing random contact-obfuscation IDs.

The final durable route evidence is
[`route-reconciliation-2026-10-07-offline-23-03-24-581Z.json`](route-reconciliation-2026-10-07-offline-23-03-24-581Z.json).
It preserves the original 70 production request records and observation times.
The discovery inventory remains 129 routes, production sitemap inventory 102,
local generated 96, local/sitemap overlap 92 and live-sitemap local omissions
10. Those production counts are historical discovery evidence, not the local
92-entry production-policy sitemap. The intermediate indexing reconciliation
is retained only in temporary storage; both modes are reproducible above.

The diff is confined to the shared publication policy, translation-key schema
validation, switcher, SEO component, existing publication tests, README, this
report and the final dated route reconciliation. No content/frontmatter, route
templates, styles, dependencies, environment files or deployment settings were
changed. No Phase 3A blocker or accounting defect was found. The original
`merge-plan.md` remains untracked with SHA-256
`015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.

No new human publication-policy decision is required. Existing decisions about
employee access, campaign ownership, forms, analytics/consent and conflicting
eligibility claims remain deferred. Substantive future translations require
human language review. Phase 4A, article/FAQ schema, content reconciliation,
visual fidelity and deployment work were not started. Stop for review before
any Phase 3B checkpoint commit.

## Phase 4A — Display Headings and Social Metadata (2026-10-08)

This section records new implementation and observations after checkpoint
`32112edbde7f90d01becf5d420ff189bf8b7e6ec` on `faithful-astro-migration`.
Earlier audit and phase sections remain historical evidence. Phase 4B,
substantive content reconciliation, Library features and deployment are outside
this milestone. No changes have been staged or committed; stop for acceptance
of the implementation and structural review.

### Inspection and Architecture

Before changes, articles used `title` for both document title and H1. Regular
pages used `serviceTitles`, `pageTitles`, then the part of `title` preceding
`|`. Home and Library components owned their headings. `Seo.astro` already
handled OG metadata and Twitter title/description/card, but lacked
`twitter:image`; it emitted content language codes as `og:locale`. Publication,
robots, canonical, sitemap, hreflang and LanguageSwitcher membership were
already governed by the Phase 3A/3B manifest and remain so.

The shared pages/blog Zod schema now accepts optional `displayH1`. It must be a
string containing non-whitespace text. Omission preserves existing behavior;
empty, whitespace-only and non-string explicit values fail validation. Both
Front Matter CMS content types expose the field. No author or social-specific
schema fields were added.

- BlogPostLayout selects `displayH1 ?? title` for its existing H1 only.
- PageLayout selects `displayH1 ?? bannerTitle` only at PageHero. All existing
  heading maps and fallbacks remain intact. Form and contact heading props
  continue to receive the original banner title, avoiding collateral changes.
- HomePage passes the optional override to HomeHero. Without one, existing
  source heading HTML, including line breaks, is preserved. An override is
  escaped plain text and replaces the single H1, never adds another one.
- BlogIndexLayout reads the current manifest entry for an explicit H1 override.
  Its existing title prop continues to control the document/social titles and
  default H1. Existing locale-specific Library template titles are unchanged.

Cards, navigation labels, related-post text, article bodies, styles and client
code are unchanged. No content routes, policy fields or translation pairs were
added. The unpublished Arabic homepage remains unpublished.

### Newly Verified Heading Evidence

Two batches of read-only production requests on 2026-10-08 respected robots
and spaced page requests by at least one second. Nine GETs total comprised two
robots checks and seven article checks across four unique article URLs. All
returned HTTP 200; no redirects were followed, forms submitted, APIs called or
production assets downloaded. Three article checks were repeated with the
document-title selector restricted to `head title`, excluding inline SVG title
elements from the initial extraction. Only the corrected document titles below
are used as heading evidence. No production HTML captures are committed.

| Production URL | Observation UTC | Document title | Visible H1 | Local action |
| --- | --- | --- | --- | --- |
| [English self-advocacy](https://www.azinstitute4autism.com/library/autism-self-advocacy-skills-aba) | 2026-10-08 21:11:28 | Unlock Independence for Children with Autism Through ABA Self‑Advocacy | Guide to Teaching Self‑Advocacy in ABA | Add this `displayH1` only to `src/content/blog/en/autism-self-advocacy-skills-aba.md` |
| [Spanish self-advocacy](https://www.azinstitute4autism.com/es/library/autism-self-advocacy-skills-aba) | 2026-10-08 21:11:29 | Desbloqueando la independencia para niños con autismo a través de la autodefensa ABA | Guía para enseñar la autodefensa en el ABA | Add this `displayH1` only to `src/content/blog/es/autism-self-advocacy-skills-aba.md` |
| [Arabic self-advocacy](https://www.azinstitute4autism.com/ar/library/autism-self-advocacy-skills-aba) | 2026-10-08 21:11:30 | دليل تعليم مهارات الدفاع عن النفس في ABA | دليل تعليم مهارات الدفاع عن النفس في ABA | No change; existing title-to-H1 fallback is correct |

The English nonbreaking hyphen and Spanish heading are copied from the current
source, not newly translated. These are the only two content-record edits;
each adds one frontmatter line. Titles, descriptions, images, bodies and
translation declarations are untouched. This is not a linguistic review of
the translations or a broader certification of content currency.

A separate targeted check of
[`/library/aba-school-readiness-arizona`](https://www.azinstitute4autism.com/library/aba-school-readiness-arizona)
at **2026-10-08 21:07:17 UTC** found current OG title
“ABA School Readiness in Arizona: A Parent Guide” and H1
“ABA School Readiness for Autistic Children in Arizona.” The existing local
title is “ABA School Readiness in Arizona | AIA Preparatory Academy (Ages 2–6).”
The current live description also discusses classroom participation and
individualized ABA. This is fresh evidence of broader drift requiring later
content reconciliation; that record is intentionally unchanged in Phase 4A.

### Social Metadata and Locale

`Seo.astro` uses a small `socialImageUrl` helper to resolve existing image paths
against the configured public origin in `src/data/site.json`. It never uses a
preview request host or an article's external canonical as the asset base.
Absolute HTTP(S) image URLs are supported; blank selections produce no image,
and invalid URLs, non-HTTP(S) schemes or embedded credentials fail validation.

Image pages now emit matching absolute `og:image` and `twitter:image` once
each, retaining `summary_large_image`. Non-image pages emit neither image nor
image-alt metadata and retain `summary`. Existing image selection is unchanged:
article featured images and regular-page featured images/banner fallbacks are
preserved. No homepage image is invented merely because a hero image exists.
The real artifact has **90 image cards and six summary cards** in each mode.
Every emitted local social image resolves to an existing public asset.

BaseLayout forwards existing `alt` only when the selected image is the entry's
`featuredImage`. Seo emits both `og:image:alt` and `twitter:image:alt` only for a
nonblank description with a selected image. An unrelated banner fallback never
inherits that description. The current local pages/blog corpus has no
nonempty featured-image `alt` values, so no real image-alt tags are fabricated;
isolated fixtures prove the supported path in all three languages. Production
self-advocacy pages do have social alt descriptions. Importing those into local
content and reviewing visible image descriptions remain later content work.

`og:title`, `og:description`, `og:url`, `og:type`, Twitter title/description and
card selection otherwise retain their behavior. Articles remain `article` and
other pages `website`. No structured-data types were added.

The [Open Graph protocol](https://ogp.me/) defines the optional `og:locale` as
`language_TERRITORY`. Existing generic `en`, `es` and `ar` values were removed;
neither the frontmatter nor inspected production articles establish regional
assignments, and those production articles emit no `og:locale`. Omission avoids
inventing regions. Open Graph documents `en_US` as its default when omitted,
so intentional Spanish/Arabic social-region targeting remains an unresolved
human localization choice, not a claim that omission supplies it. HTML `lang`,
RTL/LTR direction, hreflang and `x-default` are unchanged.

### Validation

`npm run test:seo`: **12 passed**. Tests use the actual content schema, layouts,
SEO component and Astro configuration in temporary copies, covering:

- Original article H1 fallback and explicit override in en/es/ar; independent
  document/social/card titles; both production-supported records.
- Existing service, regular-page and derived headings; single H1; homepage
  inline heading markup and explicit home/Library overrides.
- Absolute root/path-relative and external image URLs, invalid/blank URLs,
  preview-host isolation, paired image metadata, existing alt and absent alt,
  no-image fallback, article type and language/direction.
- Shared publication-policy results on every generated fixture route in
  staging/indexing: canonical, robots, sitemap, hreflang and switcher targets,
  including all noindex/external-canonical exceptions and absent `/ar`.
- Actual failed content builds for `displayH1` values `""`, spaces, newline/tab
  and a number. Markdown records and an MDX service record exercise rendering.

The first test run exposed a fixture path using `.md` for the existing MDX ABA
service record; that test-only path was corrected before continuing. There
were no remaining test failures. `npm run test:publication`: **33 passed**,
unchanged from Phase 3B.

Completed commands, from `www/`:

```sh
npm run test:seo
npm run test:publication
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
npm run audit:links
npm run audit:blog
npm run audit:images
npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
git diff --check
```

Each normal/indexing build checked 73 files with **zero errors, warnings or
hints**, and generated **96 HTML routes**: 67 English, 21 Spanish, eight Arabic.
Link audit: **zero broken internal links**. Blog audit: **zero failures**.
Image audit: **zero missing mapped page images**; the generated social-image
check additionally verified all selected local image files. These are local
artifact checks, not verification of every external URL or social-platform
preview/cache behavior.

| Artifact | Checked UTC, 2026-10-08 | HTML routes | Sitemap URLs | Robots | Hreflang |
| --- | --- | ---: | ---: | --- | --- |
| Indexing-enabled local build | 21:16:30 | 96 | 92 | 92 `index,follow`; four `noindex,follow` | 174 links on 53 routes, same 24 explicit sets |
| Final normal staging build | 21:17:16 | 96 | 0 | All 96 `noindex,nofollow` | Zero links |

All 96 canonicals match the pre-change artifact and the shared policy. The
four exceptions remain `/schedule-consultation`, `/employee-portal`,
`/library/community-highlight-meet-rula-diab` and
`/library/new-aia-scottsdale-office`. Neither they nor unpublished `/ar` enter
the alternate graph or production-policy sitemap. Social URLs do not affect
route eligibility or canonical selection.

An all-route semantic comparison against the pre-change staging artifact found
exactly the two supported H1 changes. Remaining body markup, navigation and
scripts match after normalizing whitespace and existing random contact IDs;
H1 text is compared separately. Remaining head markup also matches after
excluding the intended social-tag differences and mode-dependent robots and
hreflang. No title, description, existing OG image, URL, direction, client
behavior or JSON-LD changes were introduced.

The final durable reconciliation is
[`route-reconciliation-2026-10-08-offline.json`](route-reconciliation-2026-10-08-offline.json).
It refreshes the application fingerprint and final staging output using the
same 70 saved production requests and their original observation dates. No
route-discovery network requests were made. The new targeted heading checks
above supplement that historical discovery evidence rather than overwrite it.
Counts remain 129 discovered routes, 102 historical production sitemap routes,
96 local routes, 92 overlapping routes and 10 production-sitemap routes absent
locally. The historical 102 is distinct from the local policy's 92. The
intermediate indexing reconciliation was moved to temporary storage before
the final staging reconciliation; prior committed evidence files are intact.

### Read-only Structural Review and Scope

The complete Phase 4A change set contains 17 files:

| Classification | Files relative to `www/` | Reason |
| --- | --- | --- |
| Schema/editor configuration | `src/content.config.ts`, `frontmatter.json` | Optional validated heading field on pages/blog and CMS exposure |
| Presentation | `src/layouts/BlogPostLayout.astro`, `src/layouts/PageLayout.astro`, `src/layouts/BlogIndexLayout.astro`, `src/components/pages/HomePage.astro`, `src/components/home/HomeHero.astro` | Explicit single-H1 override, preserving each template's default |
| SEO | `src/components/Seo.astro`, `src/layouts/BaseLayout.astro`, **new** `src/utils/seo.ts` | Paired absolute social images, conditional existing alt, removal of unsupported generic OG locales |
| Tests | **new** `tools/seo.test.mjs`, `package.json` | Actual Astro/schema regression coverage and `test:seo`; no dependency changes |
| Content metadata | `src/content/blog/en/autism-self-advocacy-skills-aba.md`, `src/content/blog/es/autism-self-advocacy-skills-aba.md` | One source-supported frontmatter line per record |
| Documentation/evidence | `README.md`, this report, **new** `reports/route-reconciliation-2026-10-08-offline.json` | Editing rules, dated evidence/results, current offline fingerprint |

No changes to publication-policy code, route dispatch, LanguageSwitcher,
Header, styling, dependency versions/lockfile, environment or deployment
configuration are required. Existing audit-generated link/blog/image reports
are unchanged. Employee-portal implementation, the separate Ads project and
all unrelated files remain untouched. The pre-existing untracked
`merge-plan.md` retains SHA-256
`015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.

No blocking Phase 3A/3B defect was found. Deferred work includes broader title,
content and image-alt reconciliation, regional social locale decisions,
article/FAQ schema, and human language review where substantive translations
change. No Phase 4B work or commit is authorized by this implementation review.

## Phase 4B — Article and FAQ Structured Data (2026-10-08)

Implemented on `faithful-astro-migration`, starting from
`4ed01d7d288b249bd028a492e534d3d91adad6f7`. The working tree initially contained
only the unrelated untracked `merge-plan.md`. The current history has the
Phase 4A change set after two Ads documentation commits; this phase does not
alter or incorporate that handoff work. Earlier milestone sections remain
historical evidence. Nothing in this phase is staged or committed.

### Existing Implementation and New Production Evidence

Inspection covered BlogPostLayout, BaseLayout, FAQAccordion, FaqPage, all FAQ
component consumers, content schemas, the three author records, publication
helpers, the existing SEO tests, and the plan's Phase 4B acceptance criteria.
The initial generated artifact had 96 routes, one existing MedicalOrganization
block per route, no BlogPosting blocks, and 20 FAQPage blocks: 125 questions in
19 English/Spanish MDX articles and two insurance questions. Those 127 schema
answers matched their rendered answers after whitespace normalization.

`/faqs` was different: its rendered Markdown/MDX source contained 70 unique
direct H3 questions, but FAQAccordion received no `items`. Browser code grouped
the H3s and following siblings into accordions at runtime, so the server emitted
no FAQPage. This was a missing schema path, not a reason to replace the working
accordion, its interaction code, or its content.

Nine read-only production GETs on **2026-10-08 21:57:43–21:57:53 UTC** comprised
robots first and the eight targeted pages below. Robots allowed these paths;
all responses were HTTP 200, requests were at least one second apart, and no
redirects were followed. No forms, APIs, production writes or broad crawl were
used. Production HTML stayed in temporary storage.

| Production page | Observation UTC | Relevant findings |
| --- | --- | --- |
| [English self-advocacy](https://www.azinstitute4autism.com/library/autism-self-advocacy-skills-aba) | 21:57:44 | BlogPosting headline uses the SEO title, not display H1; Rula Diab author; published `2024-12-02T07:00:00.000Z`, modified `2026-10-03T20:47:43.625Z` |
| [Spanish self-advocacy](https://www.azinstitute4autism.com/es/library/autism-self-advocacy-skills-aba) | 21:57:45 | BlogPosting, localized Rula Diab byline; published `2026-04-09T03:36:24.000Z`, modified `2026-04-09T03:36:32.552Z`; current visible date is April 9, 2026 |
| [Arabic self-advocacy](https://www.azinstitute4autism.com/ar/library/autism-self-advocacy-skills-aba) | 21:57:47 | BlogPosting, localized Rula Diab byline; published `2024-12-02T07:00:00.000Z`, modified `2025-09-09T01:34:16.718Z` |
| [Standalone FAQs](https://www.azinstitute4autism.com/faqs) | 21:57:48 | One FAQPage with 70 questions |
| [Insurance](https://www.azinstitute4autism.com/insurance) | 21:57:49 | One FAQPage with two questions; local question/answer text matches the production schema after normalization |
| [School readiness](https://www.azinstitute4autism.com/library/aba-school-readiness-arizona) | 21:57:51 | BlogPosting plus FAQPage with nine questions; local article has seven older questions |
| [Community interview](https://www.azinstitute4autism.com/library/community-highlight-meet-rula-diab) | 21:57:52 | `noindex`, external Voyage Phoenix canonical; HubSpot still supplies BlogPosting with AIA-logo publisher and Rula Diab author |
| [Office article](https://www.azinstitute4autism.com/library/new-aia-scottsdale-office) | 21:57:53 | `noindex`, external Scottsdale Airpark canonical; same generic HubSpot authorship/publisher pattern |

Current source checks support the shared metadata structure and selected
records; they do not certify the currency of all 65 local articles. Identified
date/copy drift is explicitly deferred below, not silently reconciled.

### Article Architecture and Publication Exceptions

`src/utils/structured-data.ts` holds the schema builders and an HTML-safe JSON
serializer. BlogPostLayout consumes the existing manifest publication record
and authors collection and emits one BlogPosting through BaseLayout's existing
head slot. BaseLayout's MedicalOrganization block is unchanged.

BlogPosting includes canonical `@id` (`#article`), `url`, `mainEntityOfPage`, the
existing SEO `title` as `headline`, language, declared publication day, and
optional nonblank description, featured image and explicit modification day.
Image resolution reuses Phase 4A's public-origin helper. Display H1 does not
replace the SEO title. No body text, keywords, publisher, credentials, original
publication claim or missing image is fabricated.

Author resolution requires exactly one record with the article's declared
author slug and language. Its `name` supplies a Person name. Missing/ambiguous
references fail, rather than silently substituting Rula Diab or an English
record. Existing authors all identify Rula Diab. Author URLs are omitted because
the repository does not yet generate author archives. No author records or
frontmatter/schema fields changed.

Dates use the precision actually supplied by current records: calendar days.
`updatedDate` is emitted only when explicitly present; all current records lack
it. Neither build time, Git dates nor recently observed HubSpot update times
are substituted. Modification before publication fails validation.

Both article and FAQ builders reuse the manifest's **record-level
`sitemapEligible`** gate. Drafts, noindex and external-canonical records emit
neither new type. The two syndicated articles above therefore receive no
invented original author/publisher claim, even though production HubSpot emits
generic article schema there. Their external canonicals, noindex and global
site organization block remain intact. `/schedule-consultation` and
`/employee-portal` likewise emit neither type; `/ar` remains unpublished.

The record gate is independent of `PUBLIC_ALLOW_INDEXING`. Eligible records
emit schema in both build modes for local testing, while staging retains its
global noindex protection, empty sitemap and absent hreflang. Schema does not
make a record indexable or create translation relationships.

### FAQ Verification and Corrections

FAQAccordion remains the single FAQ schema producer. Its existing supplied-item
markup, CSS, animation, search and runtime grouping code are preserved.

- Schema answers derive from the HTML actually rendered by the component,
  using `answerHtml` when present or the same `answer` fallback. This prevents
  a stale duplicate plain-text field from contradicting the visible answer.
  Entity decoding and block separators preserve readable text; nonvisible
  script/style/template and explicitly hidden nodes are excluded.
- FaqPage renders its existing slot once, displays that same HTML, and passes
  it to FAQAccordion as `sourceHtml`. The builder groups direct H3 questions
  and following siblings just as the unchanged browser enhancement does.
  Nested H4/H5 headings and lists stay inside their answer. All 70 questions
  are now described in server JSON-LD, including with JavaScript disabled.
- A runtime-only selector without server source emits no invented FAQ schema.
  Supplied items cannot be mixed with a runtime source. Empty groups emit none.
- Schema IDs use the manifest canonical. Any retained component canonical prop
  must agree with it; conflicting values fail. Existing canonical props and
  article content are unchanged.
- Empty questions/answers and duplicate questions fail. A request-scoped
  `Astro.locals` claim rejects a second FAQ schema-producing accordion on the
  same page. Separate rendered pages do not share this state. Existing
  organization, article and FAQ blocks coexist with distinct entity IDs.
- JSON-LD escapes `<` so script-like text cannot terminate its HTML script
  element. This is exercised in both helper and rendered-article fixtures.

Result: **21 FAQPage blocks, 197 questions** (125 article, two insurance, 70
standalone), and **63 BlogPosting blocks** (65 articles minus two syndicated
exceptions). No unrelated schema types or new organization entities were added.

### Date-Display Defect Found During Validation

The build host uses `America/Phoenix`. Existing article/card date formatting
converted date-only frontmatter through that timezone: declared `2024-12-02`
appeared as December 1 despite the machine-readable time retaining December 2.
That would make the new schema disagree with the displayed calendar day.

The minimal correction adds `timeZone: 'UTC'` to the two existing article/card
formatters. It preserves declared dates, formatting options and locale, and
does not update any article to match a newer production publication date. On
this host it corrects **130 labels**: 65 article dates and 65 Library-card dates.
SEO tests explicitly build under `America/Phoenix` and compare both visible
formats with each record's declared date in all three languages. This is a
rendering-consistency fix within Phase 4B, distinct from Phase 6C date research.

### Phase 6C Drift and Remaining Uncertainty

- Spanish self-advocacy still declares `2024-12-02` locally, while the current
  production article declares/displays April 9, 2026. Its local publication
  record was not rewritten. Reconcile translation publication history in
  Phase 6C; do not mistake the timezone repair for this separate correction.
- English school-readiness has seven older local FAQ items around the former
  academy/program description. Production has nine questions about current
  school-readiness skills and ABA's relationship to school. Its shared academy
  question also has a different answer. Title/content/FAQ reconciliation stays
  in Phase 6C; no answers or Library bodies changed here.
- Production article modification timestamps and localized bylines are richer
  than current local records. They were observed but not imported into otherwise
  unreconciled records. No claim of full current-content parity is made.
- The 70 standalone questions are derived from actual rendered local source.
  Text extraction shows punctuation/HTML-spacing differences from production;
  this milestone is not a sentence-by-sentence clinical/content review.

Schema.org still defines [BlogPosting](https://schema.org/BlogPosting) and
[FAQPage](https://schema.org/FAQPage). Google's
[article documentation](https://developers.google.com/search/docs/appearance/structured-data/article)
supports applicable, source-backed properties without requiring fabricated
optional fields. Its [current changelog](https://developers.google.com/search/updates)
records removal of FAQ rich results beginning May 7, 2026 and removal of that
feature's documentation in June. This implementation preserves semantic FAQ
markup and source fidelity; it makes no promise of Google FAQ rich results.

The browser tool returned `Transport closed`, so interactive desktop/mobile
checks could not run. The accordion's client code and CSS are unchanged, and
all-route rendered comparisons verify content/markup, scripts and style content.
Browser interaction/visual confirmation and external rich-result tooling remain
manual checks; no remote validator submission or deployment was performed.

### Validation and Artifact Invariants

Final `npm run test:seo`: **22 passed**, comprising the 12 Phase 4A tests plus
10 structured-data/date tests. Coverage includes en/es/ar articles, absent
optional metadata, declared/modified dates, exact author resolution, noindex,
external canonical and draft exclusions, every rendered FAQ answer, the
standalone runtime source, empty/unknown sources, multiple JSON-LD blocks,
duplicate/conflicting schema failures, safe serialization and timezone behavior.
`npm run test:publication`: **33 passed** with no changes to that suite.

An initial standalone-FAQ assertion incorrectly compared sibling text without
block-boundary whitespace. The assertion was corrected and extraction now
explicitly preserves block separators. After the date-display defect was found
and fixed, the full tests/build/audit sequence was rerun successfully:

```sh
cd www
npm run test:seo
npm run test:publication
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
npm run audit:links
npm run audit:blog
npm run audit:images
npm run build
npm run audit:routes -- --offline
npm run audit:routes -- --check
git diff --check
```

Both normal builds and the indexing-enabled build checked 74 files with zero
errors, warnings or hints. Link, blog and mapped-image audits each reported
zero failures. All selected article schema images resolve to local public assets.

| Final artifact | Verified UTC, 2026-10-08 | HTML routes | Sitemap URLs | Robots | Hreflang |
| --- | --- | ---: | ---: | --- | --- |
| Indexing-enabled local | 22:21:40 | 96 | 92 | 92 `index,follow`; four `noindex,follow` | 174 links on 53 routes, unchanged 24 sets |
| Normal staging, restored | 22:22:24 | 96 | 0 | All 96 `noindex,nofollow` | Zero links |

The route set remains 67 English, 21 Spanish and eight Arabic. All 96 canonicals,
non-schema metadata, H1s, HTML language/direction and translation choices match
the starting artifact/policy. Existing MedicalOrganization objects match on
all 96 routes. Body markup and scripts match after accounting for the explicit
date-label fix, added JSON-LD, whitespace and pre-existing random contact IDs.
All inline CSS declarations and stylesheet URLs are unchanged. Astro moved the
unchanged FAQ stylesheet link relative to an unrelated inline insurance-style
block after making FAQ rendering asynchronous; no selectors/declarations changed.

The final durable evidence is
[`route-reconciliation-2026-10-08-offline-22-22-25-260Z.json`](route-reconciliation-2026-10-08-offline-22-22-25-260Z.json).
It reuses all 70 historical discovery requests with their observation times.
Route rows/totals remain unchanged: 129 discovered routes, historical production
sitemap 102, local generated 96, overlap 92, and ten historical sitemap routes
missing locally. Intermediate indexing evidence stayed in temporary storage;
the prior committed audit evidence remains intact. No fresh crawl was made to
refresh fingerprints; the targeted schema observations above are separately dated.

### Read-only Structural Review

The complete Phase 4B change set has nine files, all relative to `www/`:

| Classification | File | Purpose |
| --- | --- | --- |
| Structured-data core, new | `src/utils/structured-data.ts` | Publication-gated builders, author validation, visible FAQ extraction, safe JSON serialization |
| Article presentation/schema | `src/layouts/BlogPostLayout.astro` | Typed article entry, head-slot BlogPosting, calendar-day formatting |
| Date presentation | `src/components/BlogCard.astro` | Same calendar-day correction for Library cards |
| Existing FAQ producer | `src/components/FAQAccordion.astro` | Shared builder, manifest canonical validation, rendered-source support, duplicate guard; client script/styles unchanged |
| Runtime FAQ source bridge | `src/components/pages/FaqPage.astro` | Render slot once for both visible source and server schema |
| Regression coverage | `tools/seo.test.mjs` | Extend existing actual-Astro tests; no parallel publication policy |
| Editing documentation | `README.md` | Schema/date/FAQ rules and known reconciliation boundaries |
| Milestone evidence | `reports/migration-summary.md` | This dated implementation and review record |
| Offline evidence, new | `reports/route-reconciliation-2026-10-08-offline-22-22-25-260Z.json` | Final source fingerprint with preserved production discovery |

No content/frontmatter records, content schemas, dependencies, publication or
translation policy, routing, deployment files, employee-portal work or Ads
handoff files were modified. `merge-plan.md` remains untracked and unchanged,
SHA-256 `015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.
There is no new blocking policy question; Phase 6C must resolve the documented
content/date drift. Stop for implementation/diff acceptance before any checkpoint
commit. Phase 5A has not started.
