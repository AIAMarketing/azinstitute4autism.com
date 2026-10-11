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
AMP variants, and HubSpot-specific archive implementations are not copied into
Astro. Native static Library pagination is now implemented (Phase 6B.2);
author archives are planned for Phase 6B.3.

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

## Phase 5A — Services, Referrals, and Consultation (2026-10-09 UTC)

Implemented from Phase 4B checkpoint
`4079156776dd6b5a1b4e42b02dd9f680944484dd` on
`faithful-astro-migration`. This section records the implementation and read-only
review; nothing is staged or committed. The shell's actual UTC retrieval date
was October 9. AIA's governing editorial confirmation is dated **October 8,
2026**, as supplied by the user. Earlier reports and production observations
remain historical evidence, not competing authority for the confirmed correction.

### Scope, Authority, and Source Freshness

Inspected all seven English primary pages and all six existing Spanish
counterparts: ABA therapy, autism evaluations, Learner Social Club, services,
client consultation, intake, and English referrals. No Spanish referrals record
exists; none was created. Also inspected English schedule consultation and
insurance; FormShell, ServiceInquiryDrawer, ServicesPage, PageLayout, Button,
shared service data and relevant navigation/CTA code. Publication, translation,
heading, social and structured-data infrastructure was inspected and retained.

AIA explicitly confirmed general ABA eligibility as **18 months through 8
years / 18 meses a 8 años** and superseded broader children/teens descriptions.
This decision governs the in-scope edits even when cached production content
conflicts. It is resolved, not a human-decision blocker. It does not establish
ages for the Academy, Social Club or diagnostic evaluations.

Durable new source evidence:
[`phase-5a-source-evidence-2026-10-09.json`](phase-5a-source-evidence-2026-10-09.json).
It records exact URLs, request times, HTTP status, request/response cache
indicators, body hashes, titles, descriptions, H1s, canonicals, selected source
excerpts and CTA destinations. It contains no complete HTML captures or cookies.

There were **23 successful read-only GETs**: AIA robots, 15 targeted AIA pages,
four cache rechecks, Jotform robots and two bare Jotform destination status
checks. Page requests were sequential with at least 1.1 seconds between them;
redirects were not followed. AIA robots allowed the selected paths. Jotform
robots permits the bare numeric paths; its disallowed tracking-query form
variant was not fetched. No scripts, forms, APIs, authenticated operations,
tracking endpoints or production writes were executed. A web-tool robots
attempt failed before the successful direct retrieval. The independent browser
attempt failed with `Transport closed`; no browser response was obtained.

Every AIA page request sent `Cache-Control: no-cache, max-age=0` and
`Pragma: no-cache`. Responses still carried Cloudflare/HubSpot cache indicators:
`Cache-Control: s-maxage=36000, max-age=5` and
`X-HS-Cache-Control: s-maxage=36000, max-age=0`. `Age`, page `ETag` and
`CF-Cache-Status` were absent; `X-HS-CF-Cache-Status`, `Last-Modified`,
`X-HS-Prerendered`, response Date and CF-Ray are saved where available.
Prerender dates matched Last-Modified. **HTTP 200, MISS and REVALIDATED do not
prove that the underlying prerendered content contains the newest edits.**

Initial source observations (all times UTC, October 9, 2026):

| Source URL | Request time | HTTP | X-HS-CF-Cache-Status | Last-Modified (GMT) |
| --- | --- | ---: | --- | --- |
| [/aba-therapy](https://www.azinstitute4autism.com/aba-therapy) | 01:26:21 | 200 | HIT | Sat, 03 Oct 2026 23:27:01 GMT |
| [/autism-evaluations](https://www.azinstitute4autism.com/autism-evaluations) | 01:26:22 | 200 | HIT | Sat, 03 Oct 2026 23:13:18 GMT |
| [/learner-social-club](https://www.azinstitute4autism.com/learner-social-club) | 01:26:23 | 200 | HIT | Sat, 03 Oct 2026 23:13:14 GMT |
| [/services](https://www.azinstitute4autism.com/services) | 01:26:25 | 200 | HIT | Sat, 03 Oct 2026 23:13:23 GMT |
| [/referrals](https://www.azinstitute4autism.com/referrals) | 01:26:26 | 200 | HIT | Sat, 03 Oct 2026 23:45:35 GMT |
| [/client-consultation](https://www.azinstitute4autism.com/client-consultation) | 01:26:28 | 200 | HIT | Sun, 04 Oct 2026 00:00:00 GMT |
| [/aba-therapy-intake-process](https://www.azinstitute4autism.com/aba-therapy-intake-process) | 01:26:29 | 200 | HIT | Sat, 03 Oct 2026 23:13:15 GMT |
| [/es/aba-therapy](https://www.azinstitute4autism.com/es/aba-therapy) | 01:26:30 | 200 | HIT | Sat, 03 Oct 2026 23:13:14 GMT |
| [/es/autism-evaluations](https://www.azinstitute4autism.com/es/autism-evaluations) | 01:26:32 | 200 | MISS | Sat, 03 Oct 2026 23:13:12 GMT |
| [/es/learner-social-club](https://www.azinstitute4autism.com/es/learner-social-club) | 01:26:33 | 200 | MISS | Sat, 03 Oct 2026 23:13:22 GMT |
| [/es/services](https://www.azinstitute4autism.com/es/services) | 01:26:35 | 200 | REVALIDATED | Sat, 03 Oct 2026 23:13:22 GMT |
| [/es/client-consultation](https://www.azinstitute4autism.com/es/client-consultation) | 01:26:36 | 200 | REVALIDATED | Sun, 04 Oct 2026 00:00:44 GMT |
| [/es/aba-therapy-intake-process](https://www.azinstitute4autism.com/es/aba-therapy-intake-process) | 01:26:38 | 200 | MISS | Sat, 03 Oct 2026 23:13:18 GMT |
| [/schedule-consultation](https://www.azinstitute4autism.com/schedule-consultation) | 01:26:39 | 200 | REVALIDATED | Sat, 03 Oct 2026 23:13:23 GMT |
| [/insurance](https://www.azinstitute4autism.com/insurance) | 01:26:41 | 200 | HIT | Sat, 03 Oct 2026 23:13:18 GMT |

Rechecks at 01:28:06–01:28:10 used the same headers and the permitted unique
query `?migration_review=20261009T0130` on `/aba-therapy`, `/es/aba-therapy`,
`/client-consultation` and `/schedule-consultation`. All four returned HIT with
identical extracted text and metadata to their initial responses. This does
not guarantee an origin refresh. In particular, schedule consultation still
returned “children and teens,” contradicting the newer AIA instruction; it is
classified as potentially stale. Other responses corroborate the approved ABA
ages and removal of teens from both client-consultation pages. Origin freshness
remains inconclusive overall. No production change is inferred from response
status alone.

### Page-by-page Reconciliation

In this table, **P** means a newly retrieved production response with origin
freshness inconclusive (see the exact request time above). **E** means AIA's
confirmed October 8 editorial instruction. P/E records do not assert cache
bypass success. CTA resolutions are detailed separately below.

| Route / language | Claim or element | Previous Astro state | Retrieved production state | Editorial requirement | Source time / freshness | Resolution and notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/aba-therapy` en | Individual 1:1 age | “children aged 2 to 8 years” | “children aged 18 months to 8 years” | “18 months through 8 years” | P 01:26:21 + E; origin inconclusive, decision confirmed | Changed to “children aged 18 months through 8 years” |
| `/aba-therapy` en | Section heading | “Behavioral Services We Offer” | “Services We Offer” | — | P 01:26:21; origin inconclusive | Changed label; explicitly retain `behavioral-services-we-offer` ID to preserve existing fragment URLs |
| `/aba-therapy` en | Group program | 1:2 Academic Readiness, ages 2–6, AIA Preparatory Academy© | Same distinct program, ratios, range and branding | General age rule does not override this program | P 01:26:21 | Retained paragraphs, electives and 2–6 range; no clinical claims added |
| `/es/aba-therapy` es | General/1:1 eligibility | “personas de 2 a 17 años de edad, que han sido diagnosticadas”; “niños de 2 a 8 años” | General introduction says children; 1:1 says “niños de 18 meses a 8 años” | “18 meses a 8 años” | P 01:26:30 + E | Changed introduction to “niños de 18 meses a 8 años de edad, que han sido diagnosticados” and 1:1 to approved age phrase; preserves paragraph structure |
| `/es/aba-therapy` es | Academy branding | Link label “Academia Preparatoria AIA©” | Proper name “AIA Preparatory Academy©” | — | P 01:26:30; origin inconclusive | Use source-supported proper name; retain existing `https://aiaprep.org/` destination and 2–6 group-program range |
| `/autism-evaluations` en | Meta description | Ends at “support your child” | Ends at “support your child's unique development.” | — | P 01:26:22; origin inconclusive | Restore the complete source description; title and H1 unchanged |
| `/autism-evaluations` en; `/es/autism-evaluations` es | Diagnostic services | Separate ASD, ADHD and combined evaluation; ADOS discussion | Same offerings and clinical descriptions | Do not inherit ABA ages | P 01:26:22 / 01:26:32 | Body retained. “Children of all ages” describes the tool; it is not verified clinic eligibility. No clinic age limits, staffing or prerequisites invented |
| `/learner-social-club` en; `/es/learner-social-club` es | Age, schedule, payment and enrollment | Ages 8–17; 4–6 PM Mon/Wed or Wed; private pay; potty training; 30-day pause notice; one-day trial by email | Matches retrieved page content and metadata in each language | Separate program | P 01:26:23 / 01:26:33 | All facts retained. Only enrollment CTA destination changes; availability still requires confirmation before activation |
| `/services` en; `/es/services` es | Services, geography/options and clinical copy | In-center/school/home, early intervention, academic readiness, supervision, parent consultation; “1 in 36 … each year” | Matches retrieved content, including the prevalence wording | Do not manufacture service availability | P 01:26:25 / 01:26:35 | Retained. English body is owned by ServicesPage, not its MDX slot. No need to edit either English duplicate. Clinical statistic held for review rather than silently replacing it |
| `/es/services` es | Home breadcrumb | `/` | `/es/?hsLang=es` | Keep published language routing | P 01:26:35 | Changed to `/es`; existing Spanish service/consultation links remain localized, rather than copying production English paths with `hsLang=es` |
| `/referrals` en | Referral audience | “educational and therapeutic programs for children ages 2-17” | Same sentence with “18 months to 8 years” | Confirmed range is general ABA, not every program | P 01:26:26 + E | “ABA therapy programs for children ages 18 months through 8 years”; explicitly limits the claim to ABA. Existing provider/insurer collaboration and reporting descriptions retained |
| `/client-consultation` en | Audience/introduction | “Here at”; two “children and teens” references | “At”; both references say “children” | Approved ABA age and audience | P 01:26:28 + E | Source intro “At”; remove teens; ABA services sentence specifies “children aged 18 months through 8 years.” No-wait-list and existing Phoenix-area geography retained pending operational confirmation |
| `/es/client-consultation` es | Audience | Two “niños y adolescentes” references | Both say “niños” | Approved Spanish ABA age/audience | P 01:26:36 + E | Remove “y adolescentes”; ABA sentence specifies “niños de 18 meses a 8 años.” Remaining Spanish copy unchanged |
| `/aba-therapy-intake-process` en; `/es/aba-therapy-intake-process` es | Intake steps and CTA | Six steps; verification of insurance, copays and required authorizations; final label is plain text | Same six-step process with final consultation link | No new universal prerequisites | P 01:26:29 / 01:26:38 | Steps and insurance wording retained; restore styled linked CTA using existing local consultation pages. No intake packet/submission functionality added |
| `/schedule-consultation` en | Audience | Two “children and teens” references | Same superseded wording despite recheck | E overrides stale response | P 01:26:39 / recheck 01:28:10, potentially stale + E | Remove teens and explicitly state ABA age range in ABA services sentence. Retain noindex, existing geography/contact details and disabled form; do not treat response as fresh editorial authority |
| `/insurance` en | Plans/payment and FAQ | Logo list and existing ECHO/ESA FAQ claims | Same visible carrier logos/FAQ text | No plan-to-plan generalization | P 01:26:41; origin inconclusive | Unchanged; independently compared this page rather than assuming service/form fields establish every plan's coverage. Participation/coverage details remain unverified |

No article, FAQ answer, homepage, team or portal content was changed. No new
Spanish records, translations or translation keys were introduced. All page
titles and visible H1s remain unchanged. The evaluation description is the only
frontmatter value changed. Changes to metadata values use the existing SEO
pipeline; no schema-generation rule or organization data changed.

### CTA Reconciliation and Disabled Forms

Bare production Jotform destinations `231638510219149` and `250727122848156`
returned HTTP 200 at 01:30:34 and 01:30:35 respectively. These were GET status
checks only, with response bodies/scripts unused; availability does not approve
collection or establish form field/backend equivalence. The referral query
variant was not requested because of Jotform robots policy.

| Route(s) | Production label / destination | Previous Astro label / destination | Implemented migration destination / verification | Integration dependency |
| --- | --- | --- | --- | --- |
| `/aba-therapy`, `/autism-evaluations` | “Make an Appointment” → `https://form.jotform.com/231638510219149` | Same label and external URL | Same label → `/client-consultation`; generated destination exists, live consultation 200 | Existing disabled consultation shell; this is an inquiry path, not a booked appointment |
| `/es/aba-therapy` | “Hacer una cita” → same Jotform | Same label as unlinked text | Same label → `/es/client-consultation`; generated/live 200 | Same disabled shell; human Spanish form review still needed |
| `/es/autism-evaluations` | “Programar una cita” → same Jotform | Same label as unlinked text | Same label → `/es/client-consultation`; generated/live 200 | Evaluation intake/backend not implemented |
| Both Learner Social Club routes | “Enroll Now” → same Jotform (English label also on Spanish production) | Same label/external URL | Same label → corresponding English/Spanish consultation page; both resolve | Does not enroll or reserve a place; backend and service-specific process remain gated |
| Both Social Club routes, trial inquiry | One-day trial via obfuscated `info@azinstitute4autism.com` | Same address/ContactObfuscation behavior | Retained; no email sent | Trial availability must be confirmed by AIA |
| `/services` | “Consult with a Client Advocate” / “Get a Free Consultation” → `/client-consultation?hsLang=en` | Same labels → `/client-consultation` | Retained normalized local destination; resolves | Disabled consultation shell |
| `/es/services` | “Consulte con un Defensor del Cliente” → `/es/client-consultation?hsLang=es`; “Programe una consulta gratuita” → English path with `hsLang=es` | Both labels → `/es/client-consultation` | Retain existing real Spanish destination; resolves | Do not guess language from a query parameter |
| `/referrals` | “Refer a Client” → `https://form.jotform.com/231638510219149?hsCtaAttrib=203953990377` | Unlinked “Refer a Client”; existing disabled FormShell below | Same label → `#form-title`; exactly one matching element in generated page | Safe static referral placeholder; clinical referral workflow/required fields still need approval |
| Both intake routes | “Take the First Step” → `/client-consultation?hsLang=en` or `?hsLang=es` | Same unlinked label | `/client-consultation` or `/es/client-consultation`; both resolve | Starts inquiry, does not submit the described learner packet |
| Both client-consultation routes | Embedded Jotform `250727122848156` | Disabled local FormShell | Unchanged disabled shell; no embed, submit or success state added | Production form/backend/privacy approval outstanding |
| `/schedule-consultation` and service drawers | Production HubSpot/runtime form behavior; not executed | Disabled forms and call fallback | Retained; submission buttons disabled, no action destination, existing preventDefault handlers | Field parity, availability, clinical routing and backend require separate scoped activation |

The intentional temporary deviation is routing conversion links to existing
local disabled inquiry pages instead of third-party lead collection. Existing
form text explicitly states “Online submission is not yet connected” and offers
the existing phone fallback. No functioning submission is implied by the target.
Buttons retain source labels (including untranslated labels already present in
Spanish production); no new marketing or translation wording was invented.

Five `.md` records became `.mdx` because they now genuinely embed the existing
Button component: English referrals and intake, Spanish ABA, evaluations and
intake. Their collection IDs/slugs/public routes do not change. No routing or
layout conditionals were added. Existing Button styling is reused. FormShell,
ServiceInquiryDrawer, client scripts, fields, privacy behavior and form handlers
are unchanged. Production promises about callbacks/availability are retained
as source copy, not enabled functionality; they need review before activation.

### Repository-wide Eligibility Language Audit

Searched the full application source (pages/blog/authors, frontmatter, schema,
components, shared data and navigation), plus CMS configuration, for hyphen/en
and em-dash ranges, “to”/“a”/“hasta,” ages/years/months, Spanish niños/adolescentes,
English children/teens and Arabic age/adolescent terms. A broad semantic pass
produced 204 candidate lines, including non-eligibility words in code. Context
review excludes biographies, testimonials, generic developmental examples,
clinical research ages and historical reports from current AIA eligibility
corrections. Prior reports and baseline JSON are preserved, not globally replaced.
Locations below refer to the Phase 4B starting checkpoint unless marked current.

| Classification | File / location (relative to `www/`) | Exact relevant wording | Meaning, resolution and assigned phase |
| --- | --- | --- | --- |
| Corrected within Phase 5A | `src/content/pages/en/aba-therapy.mdx:27` | “children aged 2 to 8 years” | ABA 1:1 → confirmed 18 months through 8 years |
| Corrected within Phase 5A | `src/content/pages/es/aba-therapy.md:12,24` (now `.mdx`) | “personas de 2 a 17 años de edad”; “niños de 2 a 8 años” | General ABA/1:1 → approved Spanish range and agreement |
| Corrected within Phase 5A | `src/content/pages/en/referrals.md:14` (now `.mdx`) | “programs for children ages 2-17” | Referral ABA eligibility → confirmed range, explicitly scoped to ABA |
| Corrected within Phase 5A | `src/content/pages/en/client-consultation.md:10,14` | “children and teens”; “ABA therapy for children and teens” | Remove superseded audience; explicit ABA range |
| Corrected within Phase 5A | `src/content/pages/es/client-consultation.md:10,14` | “niños y adolescentes”; “terapia ABA para niños y adolescentes” | Remove superseded audience; explicit approved Spanish range |
| Corrected within Phase 5A | `src/content/pages/en/schedule-consultation.mdx:33,37` | “children and teens diagnosed with autism” | Correct despite potentially stale retrieval; noindex retained |
| Legitimate program-specific requirement | Both ABA page records, group-program paragraph (en:37, es:34 before rename) | “children aged 2 to 6 years”; “niños de 2 a 6 años” | Academic Readiness 1:2, supported by separate live program sections; retained |
| Legitimate program-specific requirement | Both Social Club records, descriptions and en:43 / es:50 | “8–17 years”; “jóvenes de 8 a 17 años” | Club ages, separate from ABA; retained, with private-pay distinction |
| Legitimate program-specific requirement | `src/data/services.json:16` | “Social and emotional learning opportunities for children and teens.” | Sociological card links specifically to the 8–17 Club; not general ABA; retained |
| Potentially outdated, deferred to another phase | `src/content/pages/en/index.md:14,23` | “clinical care for children and teens who have an autism diagnosis”; “ABA Therapy Services for Children and Teens Diagnosed with Autism Spectrum Disorder” | General ABA/homepage claims; **Phase 5B**, untouched |
| Potentially outdated, deferred to another phase | `src/content/pages/es/index.md:14,23` | “atención clínica experta para niños y adolescentes con diagnóstico de autismo”; “Servicios de terapia ABA para niños y adolescentes diagnosticados con TEA” | Spanish homepage general ABA claims; **Phase 5B**, source/language review in **Phase 7** as needed; untouched |
| Potentially outdated, deferred to another phase | `src/content/blog/en/aba-therapy-summer-routine-tips.mdx:20,149` | “resources tailored for children ages 2–17”; “In-clinic ABA therapy for children ages 2–8” | General AIA/ABA claims; **Phase 6C**. Club-specific “In-clinic Social Learners Club for ages 8-17” at :151 is separate and retained |
| Potentially outdated, deferred to another phase | `src/content/blog/en/community-highlight-meet-rula-diab.md:31,33,39` | “clinical care for children and teens diagnosed with Autism Spectrum Disorders”; “Our range of services for children and teens includes:”; “ABA Therapy Services for Children & teens” | Syndicated interview/ABA claims; **Phase 6C**, including original-source/editorial treatment; external canonical and noindex preserved |
| Potentially outdated, deferred to another phase | `src/content/blog/en/aba-school-readiness-arizona.mdx:2,3,18,154,155` | “AIA Preparatory Academy (Ages 2–6)”; “We currently serve children ages 2 to 6 who are in their most critical years of early development.” | Academy-specific range is not automatically wrong, but article was rewritten live (Phase 4B evidence). **Phase 6C**, not globally changed to ABA range |
| Potentially outdated, deferred to another phase | `src/content/blog/es/aba-school-readiness-arizona.mdx:2,3,18,72,154,155` | “Academia Preparatoria AIA (2 a 6 años)”; “Actualmente atendemos a niños de 2 a 6 años que se encuentran en sus años más críticos de desarrollo temprano.” | Same program/context distinction; **Phase 6C**, human language review/**Phase 7** where needed |
| Potentially outdated, deferred to another phase | `src/data/blog-footers.json:352,551` and `src/content/pages/es/library.md:14` | “Ya se inscriben alumnos: Academia Preparatoria AIA para niños de 2 a 6 años” | Related/popular Library titles reflecting the older article; **Phase 6C**, untouched |
| Potentially outdated, deferred to another phase | `src/data/blog-footers.json:629,749,948,959,1237,1657,1671,1724,1761` | “Now Enrolling: AIA Preparatory Academy for Children Ages 2–6” | Library links/title drift, not proof of wrong program eligibility; **Phase 6C** |
| Unresolved and requiring additional factual verification | `src/content/pages/en/tour.md:88` | “Learner Teen Group Area” | Room description may relate to the Club; no inference that ABA serves teens. Later scoped tour review, unchanged |
| Unresolved and requiring additional factual verification | `src/content/pages/en/client-forms.mdx:82,83` | “Step 4a: Print & Sign (Age 2 - 5)”; “Step 4b: Print & Sign (Ages 6+)” | Diagnostic paperwork bands, not general ABA eligibility; later forms/evaluation review, unchanged |

Context exclusions, deliberately not labeled ABA eligibility errors:
`en/faqs.mdx:34` discusses learners of any age and generic intervention evidence;
`en/early-signs-autism-by-age.mdx` discusses 12–24 months / 2–4 years;
en/es diagnostic-guide tables discuss 2–4 years;
en/es/ar executive-functioning articles discuss developmental stages including
adolescence (`en:82,96,110,112`; corresponding translated sections);
homepage testimonials mention starting at 21 months. No Arabic AIA ABA
eligibility claim matching the superseded range was identified. None of these
files was edited, and this screening is not a clinical or linguistic certification.

### Human-decision / Factual-verification Register

These are held questions for later reconciliation or activation, not reasons
to defer the already-confirmed ABA age correction:

| Area | Evidence / limitation | Current safe disposition and decision needed |
| --- | --- | --- |
| Program availability | Both ABA pages retain 2–6 Academic Readiness/Academy; both Club pages retain 8–17 and schedules; drawer claims enrollment open | Preserve distinct source-supported ranges. Confirm present enrollment, electives and schedules operationally before activating inquiries; do not infer closure or new ages from unrelated Library rewrites |
| Insurance participation | Insurance page shows BCBS, Aetna, Optum, Tricare, AHCCCS and United Healthcare logos. Local drawer specifically lists United Healthcare AHCCCS and additional payment choices; live runtime form fields were not executed/recovered | Logos do not prove all AHCCCS plans or all offered services are covered. Retain existing plan-specific wording; AIA billing must confirm exact networks, service coverage, authorizations, referrals and diagnostic prerequisites. No universal coverage rule added |
| Service geography / waits | Client pages claim no wait list and Phoenix-area coverage; schedule page additionally claims Tucson in-home service; its audience copy demonstrably conflicts with E | No new locations, wait times or staffing claims. Existing geography/wait copy held pending operational confirmation; inquiry drawer's guarantee language is also unverified, not strengthened |
| Clinical/evaluation claims | Services pages retain “1 in 36 … each year”; evaluations describe multidisciplinary teams and ADOS for children of all ages | Public page text is not independent clinical validation. Clinical owner should verify statistic/annual wording, actual evaluation staffing, accepted patient ages and referral/diagnosis requirements; no clinical replacement was invented |
| Referrals / intake | Production referrals uses a general Jotform; local generic FormShell cannot establish clinician referral fields or delivery workflow. Intake describes packets but has no functioning packet collection | Referral CTA exposes the disabled existing local form; intake goes to the local consultation page. Approve routing, required fields and privacy before backend activation; no successful referral or completed intake is implied |
| CTA/form backend | Production Jotform URLs resolve; local forms explicitly unavailable | Review the intentional local inquiry destinations as part of this milestone. Production collection, callback promises, backend choice and privacy approval remain separately gated; no Ads tags or analytics added |
| Contact freshness | Potentially stale schedule page retains `info@abaclinicaz.com`, whereas Club inquiry uses `info@azinstitute4autism.com` | Different addresses alone do not prove an error. Keep existing source-backed addresses, confirm intended consultation contact with AIA in a scoped follow-up |

### Multilingual Review Register

- **Explicitly approved wording:** Spanish ABA 1:1 and consultation now use
  `18 meses a 8 años`. The ABA introduction replaces `personas ... diagnosticadas`
  with `niños ... diagnosticados`, preserving grammatical agreement. Both
  consultation references remove `y adolescentes`. These implement AIA's
  approved correction, not invented translations. Have a human Spanish editor
  review the revised sentences before publication; fluency is not self-approved.
- **Source-supported proper name:** `Academia Preparatoria AIA©` becomes
  `AIA Preparatory Academy©`, matching Spanish production; no curriculum claim
  or destination changed. Include this branding choice in language review.
- **Existing labels retained:** `Hacer una cita`, `Programar una cita`, `Enroll Now`
  and `Take the First Step` match the corresponding production labels. The last
  two remain English on Spanish pages; do not fabricate translations here.
- **Existing form limitation:** FormShell's explanatory copy/fields are English
  even on the Spanish consultation route. No sourced Spanish form was available
  from the unexecuted embed. Additional form localization belongs to a separately
  supported review (Phase 7/form milestone), not speculative translation now.
- Spanish evaluation body, Club rules, intake steps and existing translations
  otherwise remain intact. The services breadcrumb now correctly links to `/es`.

### Validation and Existing Test-harness Defect

The first `test:markdown` invocation failed in suite setup with
`Route is not published: /school-en`. Phase 4B's FAQ component resolves the
publication manifest from Astro.url, but the older Markdown test rendered real
FAQ-bearing content at synthetic aliases. An isolated copy of the **untouched
4079156 checkpoint** reproduced exactly the same failure. This was not caused
by the Phase 5A content changes.

The bounded correction is in `tools/markdown.test.mjs`: keep test aliases as
lookup keys but render each real record at its actual language/collection URL.
All original 20 assertions remain. No parser, FAQ, publication rule, route file
or application code was changed to make the test pass. No failure was ignored.

`tools/seo.test.mjs` adds four actual-Astro regression tests covering approved
general ABA ages/audiences, retained program ranges/ratios/payment distinctions,
14 CTA/breadcrumb cases with real route/fragment targets, disabled forms,
language/direction, one H1 and the repaired evaluation description. The existing
22 SEO tests and 33 publication tests remain. The old ABA section fragment is
also asserted. Tests use temporary copies; no fixture routes enter `dist`.

| Check | Final result |
| --- | --- |
| `npm run test:seo` | 26 passed; zero failures/skips |
| `npm run test:publication` | 33 passed; zero failures/skips |
| `npm run test:markdown` | 20 passed after the verified baseline fixture correction; zero failures/skips |
| `npm run build` (initial normal) | Passed; 96 HTML routes; zero Astro check errors/warnings/hints |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed; 96 routes, 92 sitemap URLs, 174 hreflang links across 53 pages |
| `npm run audit:routes -- --check` | Passed against newly generated offline evidence in each build mode |
| `npm run audit:links` | Zero broken internal links |
| `npm run audit:blog` | Zero blog content audit failures |
| `npm run audit:images` | Zero missing mapped page images |
| `npm run build` (final normal) | Passed; 96 routes, all `noindex,nofollow`, empty sitemap, no hreflang |
| `git diff --check` | Passed |

Source fingerprint refreshes used `npm run audit:routes -- --offline`, never a
new crawl. The final saved reconciliation is
[`route-reconciliation-2026-10-09-offline.json`](route-reconciliation-2026-10-09-offline.json).
All 70 historical discovery requests, original observation dates, baseline and
summary totals are preserved by deep comparison. Changed local rows reflect
five source-extension changes and the repaired description, not newly discovered
production routes. Historical totals remain 129 discovered route keys, 102
production-sitemap entries, 96 generated local routes, 92 overlaps and ten
historical sitemap routes missing locally. Do not confuse that historical
102-entry inventory with the current local 92-entry production-policy sitemap.
The intermediate indexing reconciliation is retained only under `/tmp`.

All-route generated HTML comparison against the starting staging artifact
confirmed identical route sets, canonicals, document titles, visible H1s,
HTML languages/directions, JSON-LD objects and header/language-switcher links.
All stable pre-existing main-content IDs remain; random contact-obfuscation IDs
are excluded. Visible prose differs only on the six eligibility/heading pages;
other edits change links or the one description without changing their labels.
There are no new images, styles, layout components or client scripts. MD-to-MDX
conversion preserves headings, paragraphs and lists apart from the documented
CTA conversion; existing styled Button markup is reused.

The indexing artifact was checked at **01:34:18 UTC**; the restored staging
artifact was independently checked at **03:33:00 UTC**. The later check time
reflects resumed work, not a new production observation. Production mode still
has 92 `index,follow` routes and the same four `noindex,follow` exceptions.
`/ar` remains unpublished, and all noindex/external-canonical exclusions persist.
All 63 BlogPosting, 21 FAQPage and 96 existing organization blocks are unchanged.
No publication, canonical, schema, robots, sitemap or translation policy changed.

Browser-level desktop/mobile validation could not run because the browser
transport was unavailable. Generated HTML, existing CSS reuse, one-H1/ID checks,
link and image checks support the content review; they do not certify visual
or interactive browser fidelity. No claim of completed pixel matching is made.

### Read-only Structural Review and File Inventory

There are **18 logical changed/new files**, including five `.md` → `.mdx`
conversions (23 paths in an unstaged status listing). All paths below are
relative to `www/`:

| Classification | Files | Why required |
| --- | --- | --- |
| English content | `src/content/pages/en/aba-therapy.mdx`, `autism-evaluations.mdx`, `client-consultation.md`, `learner-social-club.mdx`, `schedule-consultation.mdx` | Confirmed ABA facts, one source heading/description and safe local CTAs |
| English content conversions | `src/content/pages/en/referrals.md` → `.mdx`; `aba-therapy-intake-process.md` → `.mdx` | Use the existing Button component for previously inert CTA labels; referral range correction |
| Spanish content | `src/content/pages/es/client-consultation.md`, `learner-social-club.mdx`, `services.mdx` | Approved audience/age correction, local enrollment destination, localized breadcrumb |
| Spanish content conversions | `src/content/pages/es/aba-therapy.md` → `.mdx`; `autism-evaluations.md` → `.mdx`; `aba-therapy-intake-process.md` → `.mdx` | Approved ages/source branding and existing-label Button CTAs, with stable record identity |
| Regression coverage | `tools/seo.test.mjs`, `tools/markdown.test.mjs` | Four focused service tests; restore original Markdown suite compatibility with accepted Phase 4B |
| Dated evidence, new | `reports/phase-5a-source-evidence-2026-10-09.json` | Cache-aware targeted observations, separate from historical audit |
| Offline reconciliation, new | `reports/route-reconciliation-2026-10-09-offline.json` | Refresh local source evidence without rewriting production observations |
| Milestone report | `reports/migration-summary.md` | This reconciliation, audit, decisions, validation and review |

Reviewed changes do not touch dependencies, application configuration, shared
SEO/publication/translation/schema code, FormShell, ServiceInquiryDrawer,
ServicesPage, shared service data, homepage, Library, team, employee portal,
Ads handoff/landing pages, consent, analytics, deployment or Git configuration.
No routes, H1 fields or translation relationships were added. No forms were
activated, submitted or connected. No files are staged; no commit or push was
made. Phase 5B and all other reconciliation phases remain unstarted.

The existing untracked `merge-plan.md` remains unchanged, SHA-256:
`015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.

## Phase 5B — Homepage Content Reconciliation (2026-10-09 UTC)

Implemented on `faithful-astro-migration`, starting at the accepted Phase 5A
checkpoint `051fb7c1081614329dd65cf9e72a496d851b2c37`. This section records a
new observation and implementation milestone; it does not replace the earlier
audit or Phase 5A evidence. Scope is the English `/` and Spanish `/es` homepages,
their section model/components, focused tests and documentation. Detailed visual
fidelity remains Phase 8. No changes are staged or committed.

### Evidence, Dates and Cache Limitations

Evidence labels used below:

- **E — Implemented from confirmed AIA editorial requirements:** the user's
  organizational confirmation dated **2026-10-08**: general ABA eligibility is
  **18 months through 8 years / 18 meses a 8 años**; general ABA audience wording
  referring to children and teens is superseded. This decision is resolved.
- **P — Implemented from production evidence:** exact content observed in this
  phase's bounded public GET responses. Publication on the retrieved page is
  verified; current origin freshness and underlying business eligibility are
  not independently established.
- **R — Retained because current content is supported:** existing content matches
  those retrieved responses, subject to the same cache limitations.
- **D — Deferred due to uncertainty:** needs factual/operational or language review.
- **O — Outside Phase 5B scope:** preserved for its assigned later milestone.

New machine-readable evidence:
[`phase-5b-source-evidence-2026-10-09.json`](phase-5b-source-evidence-2026-10-09.json).
It records exact URLs, UTC timestamps, status, selected cache headers, body
hashes, source metadata/headings, section order, important copy, lists, images
and alt text, CTA destinations, before/after field changes and output checks.
Raw HTML, cookies and broad production captures are not committed.

| Request | Retrieval UTC, 2026-10-09 | Status / cache evidence |
| --- | --- | --- |
| `https://www.azinstitute4autism.com/robots.txt` | 03:47:42 | 200; HIT; permits these homepage/asset requests; avoids disallowed preview/cache-buster paths |
| `https://www.azinstitute4autism.com/` | 03:48:03.652341 | 200; `X-HS-CF-Cache-Status: HIT`; Last-Modified and X-HS-Prerendered `2026-10-03 23:58:31 GMT` |
| `https://www.azinstitute4autism.com/es` | 03:48:05.022332 | 301 to `https://www.azinstitute4autism.com/es/`; Cache-Control `max-age=120` |
| `https://www.azinstitute4autism.com/es/` | 03:48:06.491271 | 200; HIT; Last-Modified and X-HS-Prerendered `2026-10-04 00:02:11 GMT` |
| `https://www.azinstitute4autism.com/?migration_review=20261009T0348` | 03:48:07.882981 | 200; HIT; byte-identical to first English response |
| `https://www.azinstitute4autism.com/es/?migration_review=20261009T0348` | 03:48:09.218681 | 200; HIT; byte-identical to first Spanish response |
| `https://www.azinstitute4autism.com/hubfs/hsa-fsa-accepted.png` | 03:51:40.337258 | 200 PNG; `CF-Cache-Status: HIT`; Age `1891407`; Last-Modified `2026-07-07 19:44:58 GMT`; ETag recorded in JSON |

Seven successful HTTP requests, including the redirect response and image;
no production writes, script execution, submissions, API calls or broad crawl.
Homepage requests were sequential, at least 1.1 seconds apart, with
`Cache-Control: no-cache, max-age=0` and `Pragma: no-cache`. HTML responses have
`Cache-Control: s-maxage=36000, max-age=5`,
`X-HS-Cache-Control: s-maxage=36000, max-age=0`, `Server: cloudflare` and CF-Ray
identifiers. Age, ETag and CF-Cache-Status were absent on those HTML responses.
The first web-retrieval attempt for robots failed; direct retrieval succeeded.
An independent browser attempt failed with `Transport closed`.

**Fresh retrieval is not proof of fresh origin content.** The English hero
still says “children and teens,” even though its services headings and metadata
have changed. The Spanish hero already says “niños,” but the duplicated
responsive services headings disagree: one still says “niños y adolescentes.”
AIA's E correction governs both local homepages. Query variants and no-cache
headers did not establish origin freshness; retries stopped after one recheck
per language. Other source-backed copy is carried forward with these limitations.

### English / Spanish Section Inventory and Resolution

All existing YAML sections were inspected, including headings, body text,
list order, image filenames/alt text and CTA references. Paragraph/list text
comparison normalized whitespace and typographic apostrophes; existing local
editorial formatting, descriptive alt text and historical quotations are retained.
No existing section was found to have been removed in either retrieved page.

| Order | Section | English comparison / resolution | Spanish comparison / resolution | Classification |
| --- | --- | --- | --- | --- |
| 1 | Hero | Preserve eyebrow, H1 markup, image, geography and CTA; remove “and teens” from body despite stale source | Preserve eyebrow, H1 markup, image, geography and CTA; remove “y adolescentes,” also matching source hero | E; remaining fields R |
| 2 | Services introduction / commitments | Replace old audience heading with ABA-specific approved age range; add source word “Treatment” to “Integrated Therapy”; retain five service items and seven commitment items/order | Replace old audience heading with approved Spanish range; retain five services, seven commitments, images and source-supported existing wording | E, P, R |
| 3 | Benefits | Heading, subheading, four benefits, video URL/title/image supported; retained | Own published wording, four benefits and same video retained | R |
| 4 | Skills | Six skills and icons/order supported; retained | Six existing translated labels/icons/order supported; retained | R |
| 5 | Insurance | Heading/body and six carrier logos supported; retained | Own heading/body and same six logos supported; retained | R, D for coverage verification |
| 6 | ESA | Heading, one paragraph, dollar range and ADE image supported; retained | Own published heading/paragraph and ADE image supported; retained | R, D for eligibility/amounts |
| 7 EN only | HSA/FSA | Missing locally; add exact published heading/paragraph and local copy of image, after ESA and before financial help | No equivalent in retrieved Spanish page; omit entirely | P; no invented translation |
| 8 EN / 7 ES | Financial help | Existing heading, uninsured assistance/pay-over-time paragraph and CTA supported; retained | Own existing heading, paragraph and CTA supported; retained | R, D for program availability |
| 9 EN / 8 ES | Process | Six cards present but inert locally; restore links and two incomplete source labels | Six source labels already match; restore links to Spanish intake headings | P; explicit local destination adaptation |
| 10 EN / 9 ES | Clinical director | Heading, quote, Rula Diab name/credentials/photo/signature supported; unchanged | Own published heading/quote/name/credentials preserved | R |
| 11 EN / 10 ES | Testimonials | Update heading “What Clients Are Saying” → “What Clients Say”; all 11 quotations/authors unchanged | Existing heading “Lo que dicen los clientes” and same 11 published English quotations unchanged | P for EN heading; R for quotes |
| 12 EN / 11 ES | BACB/CASP logos | Missing locally; restore unlinked image row immediately after testimonials | Same row published; restore with exact source alt text, which is English | P |

The logo row is inside production `<main>`, before the global footer, not a
footer redesign. Its images already exist locally. No invented membership or
certification paragraph, link or organization schema accompanies them.

### Exact Substantive Copy and Metadata Changes

All P observations refer to the two homepage timestamps above; E refers to
2026-10-08. Full previous/current field values are also in the evidence JSON.

| Route / field | Previous Astro | Resolution / source |
| --- | --- | --- |
| `/`, title | `ABA Therapy Near Me \| Arizona Institute for Autism \| Scottsdale` | P: `Scottsdale ABA Therapy for Children \| Arizona Institute for Autism` |
| `/`, description | `Arizona Institute for Autism: center for behavioral health & education services located in Scottsdale. We serve individuals with Autism and their families.` | P: `Arizona Institute for Autism: center for behavioral health & education services in Scottsdale. We serve children diagnosed with autism and their families.` |
| `/`, hero body phrase | `clinical care for children and teens who have an autism diagnosis` | E: `clinical care for children who have an autism diagnosis`; remaining sentence/geography untouched |
| `/`, services heading | `ABA Therapy Services for Children and Teens Diagnosed with Autism Spectrum Disorder` | E: `ABA Therapy Services for Children 18 Months Through 8 Years Diagnosed with Autism Spectrum Disorder`; production removes “and Teens,” while the explicit range comes from E |
| `/`, commitment item | `Integrated Therapy` | P: `Integrated Therapy Treatment` |
| `/`, process step 3 | `Fill and Sign an Intake Packet` | P: `Fill and Sign a Client Intake Packet` |
| `/`, process step 4 | `Verify Billing and Insurance` | P: `Verify Billing and Insurance Information and Benefits` |
| `/`, testimonials heading | `What Clients Are Saying` | P: `What Clients Say` |
| `/es`, hero body phrase | `atención clínica experta para niños y adolescentes con diagnóstico de autismo` | E + P: `atención clínica experta para niños con diagnóstico de autismo` |
| `/es`, services heading | `Servicios de terapia ABA para niños y adolescentes diagnosticados con TEA` | E: `Servicios de terapia ABA para niños de 18 meses a 8 años diagnosticados con TEA` |

Both visible H1s are unchanged: English `Behavioral Health & Special Education`
(with its existing line breaks) and Spanish `Salud Mental y Educación Especial`.
Spanish title and description remain its own published values; they were not
translated from the revised English metadata. The age range appears only in
ABA-specific headings, not imposed on evaluations, the Social Club or other
services. Historical testimonials, including the “21 months year old” statement,
are untouched. This resolves the four homepage findings deferred by Phase 5A;
its original eligibility audit remains intact as historical evidence.

### English HSA/FSA Implementation and Source Qualifications

Exact published heading:
**Health Savings Accounts (HSA) & Flexible Spending Accounts (FSA)**.

Exact substantive paragraph (only source nonbreaking whitespace normalized):

> Many families can also utilize their HSA and FSA to fund care, which allow you to pay for qualified clinical services using pre-tax dollars. The Arizona Institute for Autism (AIA) accepts Health Savings Account and Flexible Spending Account cards directly, making it easier to manage out-of-pocket costs for your learner's treatment. If you participate in one of these employer-sponsored or individual accounts, you can seamlessly apply your available funds toward tuition and fees for our ABA programs.

The optional `home.hsaFsa` content block uses `heading`, `body`, `image` and
`imageAlt`, validated through the existing Zod homepage model. Its dedicated
`HomeHsaFsa.astro` component renders after ESA/before financial help, matching
production: image left (5/12), text right (7/12), tinted background, one heading
and one paragraph. A single-column layout applies below 760px. The exact
500×425 source PNG is self-hosted as `public/assets/images/hsa-fsa-accepted.png`
(40,208 bytes), SHA-256
`25d1a0c6ed1e156e0861071fa409b5b6908b7f3b02407066a0d3b7014b25c195`.
Source alt `hsa-fsa-accepted` is preserved. The artwork itself says
“HSA APPROVED FSA”; it is published artwork, not an independent certification.

The qualifiers “Many families,” “qualified clinical services” and “If you
participate” are preserved. The section does not claim every expense is eligible,
provide a payment form, collect card data, load third-party scripts or add any
JSON-LD. Spanish has no `hsaFsa` block and renders no empty placeholder.

`home.logos` is a separate optional `items: [{ file, alt }]` block for the
observed final image row. Both optional sections are also supported by the
existing `sections:` discriminated union. Existing homepage records without
these blocks still render. `home.process.steps[].href` is optional; old steps
without destinations remain plain content. The existing process-card wrappers,
equal-height script, labels and styling remain except for accessible links and
focus indication. README documents all new editing fields.

### CTA Reconciliation

Production link labels/destinations are recorded verbatim in the evidence JSON.
No production form was submitted or activated. The four destination pages were
HTTP 200 in Phase 5A's **2026-10-09 01:26:28–01:26:38 UTC** observations; those
checks are explicitly inherited, not claimed as new Phase 5B retrievals.
Generated local destinations and every new fragment are checked by regression
assertions; all links/images pass local audits.

| CTA / locale | Production destination | Previous Astro | Intended Astro / verification |
| --- | --- | --- | --- |
| EN `Get Started`, `Schedule an Assessment` (commitments), `Request an Appointment` | `https://www.azinstitute4autism.com/client-consultation?hsLang=en` | Same labels, `/client-consultation` | Retain local route; all three links resolve; disabled form remains explicitly unavailable |
| ES `Empezar`, `Programar una evaluación` (commitments), `Solicitar cita` | `https://www.azinstitute4autism.com/client-consultation?hsLang=es` | Same labels, `/es/client-consultation` | Retain real Spanish route rather than copying the production English-path destination; disabled form remains unavailable |
| Six EN process cards | `/aba-therapy-intake-process#first-step` through `#sixth-step` | Plain labels, no links | Add links to existing EN intake heading IDs below; step 3/4 labels corrected as above |
| Six ES process cards | English-path `/aba-therapy-intake-process#first-step` through `#sixth-step`, with Spanish labels | Plain labels, no links | Add links to existing Spanish intake heading IDs below; labels unchanged |
| Learner journey video, both | `https://www.youtube-nocookie.com/embed/EczPH1jx9mc?si=beestOCaO4tL7Re6` | Same existing VideoCard destination | Retained; not played/fetched; privacy/loading behavior unchanged |

Intake destination mapping preserves section intent without editing the
out-of-scope intake records or copying nonexistent local HubSpot fragment IDs:

| Step / production fragment | EN local fragment on `/aba-therapy-intake-process` | ES local fragment on `/es/aba-therapy-intake-process` |
| --- | --- | --- |
| 1 / `first-step` | `1-complete-the-learner-information-form` | `1-complete-el-formulario-de-información-del-estudiante` |
| 2 / `second-step` | `2-speak-with-an-aia-client-advocate` | `2-hable-con-un-defensor-del-cliente-de-aia` |
| 3 / `third-step` | `3-fill-out-and-sign-the-client-intake-packet` | `3-complete-y-firme-el-paquete-de-admisión-del-cliente` |
| 4 / `fourth-step` | `4-verify-insurance-and-billing-information` | `4-verificar-la-información-del-seguro-y-la-facturación` |
| 5 / `fifth-step` | `5-schedule-your-childs-assessment` | `5-programa-la-evaluación-de-tu-hijo` |
| 6 / `sixth-step` | `6-collaborate-on-a-personalized-care-plan` | `6-colaborar-en-un-plan-de-atención-personalizado` |

No new route, redirect or form-activation behavior is introduced. Existing
consultation forms continue to state that online submission is not connected;
backend, privacy and workflow decisions remain separately gated.

### Human-decision and Multilingual Review Registers

| Classification / area | Supported observation | Uncertainty / action |
| --- | --- | --- |
| R + D — Insurance | Both homepages explicitly name BCBS AZ, Aetna, Optum, Tricare, **United Healthcare AHCCCS**, UnitedHealth; six logos match | Retain exact plan-specific wording. AIA billing must confirm products, networks, authorization/diagnosis/referral requirements and covered services; no inference that all AHCCCS or all insurer products are accepted. Carries forward Phase 5A's gate |
| R + D — ESA | Both sources give `$4,000 – $6,500` annually and say eligible families can apply funds to ABA tuition; ADE-vendor wording matches | Preserve existing qualified source wording, not a guarantee. Verify current award amounts, vendor status and eligible programs/expenses with AIA/ADE before public launch; no universal ESA eligibility inferred |
| P + D — HSA/FSA | EN source says AIA accepts account cards and funds may apply toward qualified care and ABA tuition/fees | Exact published copy/art retained. AIA billing/account administrators must verify card acceptance, eligible expenses and any additional qualifications; source alone does not establish reimbursement/tax eligibility. No independent financial advice or promise added |
| R + D — Financial assistance | Both sources describe assistance for the uninsured and paying over time | Eligibility, current availability and terms remain unverified. No financing product, universal approval, interest rate or new payment integration invented |
| R + D — Geography / availability | Existing Phoenix-area city list and in-center/in-home program commitments match retrieved sources | Current staffing, openings and service availability still need operational confirmation under Phase 5A's register; no new claims added |
| D — CTA/backend | Local EN/ES consultation and intake routes exist and resolve | Forms stay disabled. Backend, consent, privacy, callback/packet workflow and activation require separate authorization |
| D — Spanish language review | Hero removes `y adolescentes`; services heading inserts explicitly approved `18 meses a 8 años` | Human Spanish editor should review the two revised sentences in context. This is approved wording applied narrowly, not a fabricated translation or self-approved fluency |
| P + D — Spanish source differences | Spanish metadata/section wording differs; no HSA/FSA section; English testimonials and new logo alt text are published that way | Preserve differences. Human language/accessibility review may later localize source-supported alt text/quotes; no translations invented here |
| O — Detailed fidelity / unrelated content | HSA and logos get scoped responsive CSS; other component styling retained | Phase 8 full-page desktop/mobile comparison, spacing/crops/typography and any shared header/footer reconciliation remain outstanding; Library, services beyond 5A, employee portal and Ads work untouched |

There is **no unresolved human decision about general ABA ages or the removal
of the superseded audience wording**. Remaining questions above concern separate
financial, operational, language or integration facts.

### Validation and Reproduction

Run from `www/`:

```sh
npm run test:seo
npm run test:publication
npm run test:markdown
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
# Refresh local fingerprint using saved evidence, without any live crawl:
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-09-offline.json
npm run audit:routes -- --check
npm run audit:links
npm run audit:images
npm run audit:blog
npm run build
# Preserve a separate reconciliation of the restored staging artifact:
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-09-offline.json
npm run audit:routes -- --check
git diff --check
```

The tool creates a new timestamp-suffixed report rather than overwriting existing
evidence. This phase retains the final staging reconciliation as
[`route-reconciliation-2026-10-09-offline-03-57-29-199Z.json`](route-reconciliation-2026-10-09-offline-03-57-29-199Z.json).
The intermediate indexing reconciliation was moved to `/tmp` after its check.
All **70 inherited production requests**, observation timestamps, production
route records, original baseline and summary totals were preserved by deep
comparison. No new production crawl was used to refresh the fingerprint.
Only the local `/` route record changes title/description; generated route keys
are unchanged. Historical discovery still has 129 route keys and 102 source
sitemap URLs; those are not the current local 92-entry production-policy sitemap.

| Check | Result |
| --- | --- |
| `test:seo` | **30 passed**, including four new homepage tests and all earlier SEO/service cases |
| `test:publication` | **33 passed** |
| `test:markdown` | **20 passed** |
| Initial normal, indexing-enabled, final normal builds | All pass; each **96 routes**, Astro check **0 errors / 0 warnings / 0 hints** |
| `audit:routes -- --check` | Pass for indexing and restored staging evidence; offline, no network |
| `audit:links` | **0 broken internal links** |
| `audit:images` | **0 missing mapped page images**; focused test also checks every homepage `<img>` asset |
| `audit:blog` | **0 failures** |
| `git diff --check` | Pass |
| Browser | Unavailable: `Transport closed`; no browser-level visual/interactive verification claimed |

The first SEO run found two incorrect assumptions in the new tests: an Astro
script/style node intervenes after testimonials, and the process and commitment
CTAs share an assessment label. Assertions now check the next content element
and distinguish consultation links from process links. Rerun passed all 30 tests;
no application defect or relaxed route/eligibility requirement was involved.

Four focused tests cover valid/incomplete homepage schema input, present/absent
optional blocks, old unlinked steps, approved ABA ranges and absent superseded
audiences, retained 11 historical testimonials, source metadata, section order,
English-only HSA/FSA and its qualifications, final logo row, one H1, same-language
CTA routes and all 12 real intake IDs, disabled destination forms, local image
files and absence of financial JSON-LD. Optional blocks/links are removed only
inside the existing temporary fixture build to verify backward compatibility.
Existing tests exercise publication metadata in both modes without duplicating
its policy implementation.

| Generated-output invariant | Indexing-enabled, checked 03:56:49 UTC | Final staging, checked 03:57:28 UTC |
| --- | --- | --- |
| HTML routes | **96**, identical route set | **96**, identical route set |
| Sitemap URLs | **92** | **0** |
| Hreflang | **174 links / 53 pages** | **0 links** |
| Robots | Existing 92 indexable / four noindex exceptions | Every page **`noindex,nofollow`** |
| Canonicals, languages/directions, visible H1s | Unchanged across all routes | Unchanged across all routes |
| JSON-LD | Unchanged: 96 MedicalOrganization, 63 BlogPosting, 21 FAQPage | Same objects/counts |

All-route comparison against the starting staging artifact confirmed unchanged
header/footer/language-switcher destinations and unrelated main text; scripts
and styles are excluded from visible-text comparison (contact-obfuscation IDs
are randomized). Only `/` and `/es` change body copy. Only `/` changes title,
description and their existing social-metadata projections. No canonical,
indexing, translation, x-default, sitemap, display-H1, social-metadata or
structured-data policy implementation changed. `/ar` stays unpublished; all
four noindex/external-canonical exceptions remain excluded as before.

### Read-only Structural Diff Review and Complete File Inventory

**13 files: eight modified, five new.** Paths below are relative to `www/`.

| Classification | File | Reason |
| --- | --- | --- |
| English content | `src/content/pages/en/index.md` | Approved audience/range, source metadata/labels, HSA/FSA, intake links and logo data |
| Spanish content | `src/content/pages/es/index.md` | Two approved audience/range edits, existing-label Spanish intake links and source logo data; no HSA/FSA |
| Content model | `src/types/home-sections.ts` | Optional HSA/FSA and logo blocks plus optional process destinations; no Schema.org additions |
| Homepage composition | `src/components/pages/HomePage.astro` | Render optional sections in observed order, including legacy sections-array support |
| Homepage presentation | `src/components/home/HomeProcess.astro` | Link existing process-card content to validated local intake sections; preserve fallback and client script |
| Homepage presentation, **new** | `src/components/home/HomeHsaFsa.astro` | Source-oriented image/text layout with narrow responsive CSS |
| Homepage presentation, **new** | `src/components/home/HomeLogos.astro` | Optional source image row after testimonials, responsive and unlinked |
| Source asset, **new** | `public/assets/images/hsa-fsa-accepted.png` | Exact self-hosted published PNG; provenance/hash above |
| Regression tests | `tools/seo.test.mjs` | Four homepage tests within existing temporary Astro build suite; prior tests preserved |
| Editing documentation | `README.md` | New optional homepage fields and valid locale/fragment destinations |
| Milestone report | `reports/migration-summary.md` | This dated section; earlier history untouched |
| Source evidence, **new** | `reports/phase-5b-source-evidence-2026-10-09.json` | Cache-aware read-only observations, exact changes and verification |
| Offline audit, **new** | `reports/route-reconciliation-2026-10-09-offline-03-57-29-199Z.json` | Updated local fingerprint/metadata; inherited production evidence unchanged |

Reviewed scope excludes services/intake source records, Library, team, employee
portal, separate Ads landing pages, global navigation/footer, deployment,
dependencies/lockfile, Git configuration, form components/backends, analytics,
consent and payment integration. No new translation relationships or fabricated
Spanish sections were introduced. No staging, commit, push or Phase 5C work.

`merge-plan.md` remains untracked and unchanged, verified SHA-256:
`015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.

Tracked-file diff summary (`git diff --stat`; five new files are listed above
and are not included by Git until staged):

```text
 www/README.md                             |   7 +
 www/reports/migration-summary.md          | 324 ++++++++++++++++++++++++++++++
 www/src/components/home/HomeProcess.astro |  17 +-
 www/src/components/pages/HomePage.astro   |   8 +
 www/src/content/pages/en/index.md         |  37 +++-
 www/src/content/pages/es/index.md         |  18 +-
 www/src/types/home-sections.ts            |  14 ++
 www/tools/seo.test.mjs                    | 114 +++++++++++
8 files changed, 526 insertions(+), 13 deletions(-)
```

## Phase 5C — Team Content Reconciliation (2026-10-09 UTC)

Phase 5C reconciles the English `/team` route with the roster and supporting
content currently presented by the public Team page. It does not infer hiring,
departure, promotion, employment status, or dates from differences between the
two sites. No Spanish Team record exists, and none was created.

### Sources, Retrieval, and Freshness

The source page was `https://www.azinstitute4autism.com/team`. `robots.txt` was
retrieved first at **2026-10-09 17:11:37 UTC** and allows `/` while disallowing
HubSpot preview and `hsCacheBuster` patterns. Two bounded, sequential Team-page
GETs were made at **17:11:39** and **17:11:40 UTC** using `Cache-Control:
no-cache, max-age=0` and `Pragma: no-cache`; the second used a unique audit query.
Both returned HTTP 200 and byte-identical bodies (SHA-256
`246f1afc7ebee26cf855f79fd82b3b734c717969bcd8e00361108d68af867adf`).

Both responses reported `x-hs-cf-cache-status: HIT`, `cache-control:
s-maxage=36000, max-age=5`, `x-hs-cache-control: s-maxage=36000, max-age=0`,
`Last-Modified: Sat, 03 Oct 2026 23:13:20 GMT`, and the same
`x-hs-prerendered` timestamp. Neither supplied `Age`, `ETag`, or
`CF-Cache-Status`. A separate current web rendering agreed on the ordered
roster, copy, links, and image assignments. The evidence is therefore
classified **potentially cached but consistently publicly presented**. No
contradictory public version was found; cache-bypass headers and the query are
not treated as proof of an origin-fresh response.

Ten roster/hero image requests and one social-image request were read-only and
sequential. No authentication, form submission, production API call, or write
occurred. Raw production HTML, cookies, and removed public entries are not
committed. Detailed headers, hashes, source strings, asset mappings, and
limitations are preserved in
[`phase-5c-source-evidence-2026-10-09.json`](phase-5c-source-evidence-2026-10-09.json).

Repository inspection covered `PageLayout.astro`, `PageHero.astro`,
`BaseLayout.astro`, `Seo.astro`, `TeamPage.astro`, `ContactObfuscation.astro`,
`Button.astro`, `content.config.ts`, `team.md`, `page-visuals.ts`, shared site
data, the publication manifest/policy, the route manifest, and the existing SEO
tests. The Phase 5A/5B reports, project instructions, migration brief, README,
and accepted migration history were also reviewed.

### Roster Reconciliation

Names, credentials, capitalization, roles, group order, member order, and image
assignments below reproduce the public presentation. “Removed” means only that
the entry is removed from the migrated public roster because the current
published page does not display it.

| Group / order | Previous rendered Astro roster | Public roster at 17:11 UTC | Resolution |
| --- | --- | --- | --- |
| 1. Board Certified Behavioral Analysts & Psychologists | Rula Diab, BCBA, LBA, M.Ed — Clinical Director; Jennifer Espinoza, MAOL/ABA — Clinical BCBA; Timirah Clay, M.Psy/ABA — Clinical BCBA | Rula Diab, BCBA, LBA, M.Ed — Clinical Director; Jennifer Espinoza, MAOL/ABA — Clinical BCBA | Retain first two in published order; remove Timirah Clay entry from migrated public roster |
| 2. Clinical Support | Carol Harrington, A.A. Spec. Ed. — Clinical Manager; Rachel Crosby — Clinical Administrator; Jennifer Bonefont, B.A. Psy — Clinical Client Advocate Supervisor | Jennifer Bonefont, B.A. Psy — Clinical Client Advocate Supervisor | Retain Jennifer Bonefont; remove Carol Harrington and Rachel Crosby entries from migrated public roster |
| 3. Clinical Case Supervisors | Rachael Sanchez, BS, M Psy/ABA — Clinical Supervisor | Same | Retain exactly |
| 4. Clinical Education Specialists | Mahima Bedi — Clinical Instructor | Same | Retain exactly |
| 5. ABA Clinic Management | Mariah Marley — Claims Billing; Eney Garcia, BA — Accounts Billing; Ayah Shahbander — Human Resources; Barbara Samanich, BFA — Creative Marketing Developer | Same names, credentials, roles, and order | Retain exactly; restore its missing parent heading and closing statement |

The page now renders **nine unique member cards**. No credentials were added or
normalized from outside sources, and no blog author record was changed.

### Photographs and Metadata

The hero and all nine rendered portraits are byte-for-byte matches to the
current source images. The hero is 1200×428; each portrait is 342×456. Existing
local filenames remain assigned to the same published person:

| Person / use | Local asset | Result |
| --- | --- | --- |
| Team hero | `hero-meet-the-aia-team.webp` | Existing exact match retained |
| Rula Diab | `team-rula-diab.webp` | Existing exact match retained |
| Jennifer Espinoza | `team-jennifer-espinoza.webp` | Existing exact match retained |
| Jennifer Bonefont | `team-jennifer-bonefont.webp` | Existing exact match retained |
| Rachael Sanchez | `team-rachael-sanchez.webp` | Existing exact match retained |
| Mahima Bedi | `team-mahima-bedi.webp` | Existing exact match retained |
| Mariah Marley | `team-mariah-marley.webp` | Existing exact match retained |
| Eney Garcia | `team-eney-garcia.webp` | Existing exact match retained |
| Ayah Shahbander | `team-ayah-shahbander.webp` | Existing exact match retained |
| Barbara Samanich | `team-barbara-samanich.webp` | Existing exact match retained |

Every card uses the pictured person's name as concise alt text and explicit
342×456 intrinsic dimensions. The three now-unreferenced historical portrait
files were not deleted; destructive asset cleanup is outside this milestone.

The title, description, canonical, H1, and `og:type=website` already matched and
remain unchanged. Production supplies `AIALanding_BG_V2.jpg` as the Team social
image with alt `learn more about arizona institute for autism`. An exact 2200×1146
JPEG copy is now self-hosted at `public/assets/images/AIALanding_BG_V2.jpg`
(SHA-256 `3036a9dc996b8ccd4672451fcc83b31b0421db4413f20d891f64f47d7707d6a8`)
and referenced through existing `featuredImage`/`alt` fields. It contains no
executable or unexpected embedded content by file-type inspection.

### Headings, Supporting Copy, Careers, and Contact

The intro heading, organization/location line, and paragraph already matched
production and were moved unchanged into the structured source. The component
now restores the published **Our ABA Care Team** section heading above **ABA
Clinic Management** and its closing statement, **ABA's leading experts in
special education and clinical care.** Repeated production module labels named
“Our Creative Team” are hidden by production CSS and were not presented as
visible headings or migrated.

Heading structure is now one page H1 from `PageHero`, H2s for major Team and
careers sections, H3s for roster groups, and H4s for member names. The existing
card appearance and responsive wrapping are retained; this is a semantic and
content correction rather than a Phase 8 visual redesign.

Production labels the careers CTA **View Open Positions** and links to
`/careers?hsLang=en`. Astro retains the equivalent safe local `/careers` route;
the route exists and the link audit passes. No recruiting form or integration
was activated.

Production has an internal HR-email inconsistency: the no-script fallback says
`hr [at] abaclinicaz [dot] com`, while its executable script makes both the
visible text and `mailto:` destination `hr@azinstitute4autism.com`. Astro
retains that active destination and now derives its obfuscated fallback from
the same value: `hr [at] azinstitute4autism [dot] com`. Regression coverage
decodes `ContactObfuscation` data and proves displayed/underlying values agree.
The shared public phone, info email, and Scottsdale address match production
and were not changed.

### Content Architecture Decision

Before this phase, `TeamPage.astro` hardcoded the rendered roster while
`team.md` contained a separate extracted roster that `PageLayout.astro` bypassed.
The two sources could drift without any validation. The smallest durable fix is
a validated `team:` object in the existing English Team record:

- `team-page.ts` defines required intro, groups, members, careers/contact, local
  CTA, and nonempty strings, and rejects duplicate member names.
- `content.config.ts` exposes that optional page field through the existing Zod
  content collection.
- `PageLayout.astro` requires the object for the dedicated English Team route
  and passes it to `TeamPage.astro`.
- `TeamPage.astro` is presentation-only and maps the structured data into the
  existing cards and sections.
- the bypassed Markdown body contains only a maintenance comment; it no longer
  presents a competing roster.

This keeps the route and metadata in the established Front Matter CMS-compatible
record without a general component refactor. Future editors maintain one roster.
No Spanish record or translation relationship was manufactured.

### Human-decision Register and Deliberate Deferrals

| Topic | Evidence / resolution | Remaining action |
| --- | --- | --- |
| Source freshness | Direct recheck and independent current rendering agree; both direct bodies are an October 3 HubSpot cache HIT | Confirm roster operationally before launch if the cache date is material; no conflicting entry was guessed |
| Credentials and group membership | Reproduced verbatim from the current public page | AIA remains responsible for factual credential/role review; no outside directory was used |
| HR contact | Active production script consistently uses `hr@azinstitute4autism.com`; stale fallback uses another domain | Current active value is implemented. AIA may confirm the legacy fallback domain can be retired before launch |
| Unused portraits | Three prior entries are absent from current public presentation | Files remain unreferenced; later asset cleanup may remove them after a repository-wide usage review |
| Visual fidelity | Static HTML, CSS, dimensions, semantic structure, links, and assets validated | Full desktop/mobile comparison, crops, spacing, keyboard interaction, and hover fidelity remain Phase 8 work |

There are no unresolved image assignments in the implemented nine-member
roster. No roster difference is characterized as a personnel event.

### Validation and Generated-output Invariants

Run from `www/`:

```sh
npm run test:seo
npm run test:publication
npm run test:markdown
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-09-offline-03-57-29-199Z.json
npm run audit:routes -- --check
npm run audit:links
npm run audit:images
npm run audit:blog
npm run build
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-09-offline-03-57-29-199Z.json
npm run audit:routes -- --check
git diff --check
```

The final offline reconciliation is
[`route-reconciliation-2026-10-09-offline-17-20-21-008Z.json`](route-reconciliation-2026-10-09-offline-17-20-21-008Z.json).
It reuses all **70** saved production observations and makes no production
requests. Historical discovery remains 129 normalized routes and 102 source
sitemap URLs. The local generated count stays 96; the production-policy overlap
stays 92. An intermediate indexing-mode reconciliation was moved to `/tmp`.

| Check | Result |
| --- | --- |
| `test:seo` | **34 passed**, including four Phase 5C Team tests |
| `test:publication` | **33 passed** |
| `test:markdown` | **20 passed** |
| Initial normal, indexing-enabled, final normal builds | All passed; each generated **96 routes**; Astro check **0 errors / 0 warnings / 0 hints** |
| `audit:routes -- --check` | Passed in indexing and final staging modes using offline evidence |
| `audit:links` | **0 broken internal links** |
| `audit:images` | **0 missing mapped page images** |
| `audit:blog` | **0 failures** |
| `git diff --check` | Passed |
| Browser validation | Attempted, but Playwright returned `Transport closed`; no browser-level desktop/mobile claim is made |

The four focused Team tests validate the structured source and reject duplicate
names, blank text, and external careers destinations; validate every group,
member, role, order, local image, WebP signature, intrinsic dimensions, and alt;
validate one H1, heading hierarchy, restored copy, careers CTA, and decoded
contact agreement; and preserve title, description, canonical, robots, social
image, language/direction, hreflang behavior, and absence of `/es/team` in both
build modes.

| Generated-output invariant | Indexing-enabled | Final staging |
| --- | --- | --- |
| HTML routes | **96**, route set unchanged | **96**, route set unchanged |
| Sitemap URLs | **92** | **0**, empty XML urlset |
| Hreflang | **174 links across 53 pages** | **0 links** |
| Robots | Existing publication policy; Team `index,follow` | Every route `noindex,nofollow` |
| Team canonical | `https://www.azinstitute4autism.com/team` | Same |
| Team language/direction | `en` / `ltr` | Same |
| Team H1 | Exactly one | Exactly one |

No route, canonical, robots, sitemap, translation, hreflang, display-H1,
BlogPosting, FAQPage, organization-schema, analytics, form, advertising, or
deployment policy implementation changed. The only new metadata projection is
the source-supported Team social image through Phase 4A's existing machinery.

### Read-only Structural Diff Review and File Inventory

Phase 5C has **11 files: seven modified and four new**, all under `www/`:

| Classification | File | Purpose |
| --- | --- | --- |
| Editing documentation | `README.md` | Documents the single structured Team source |
| Presentation | `src/components/pages/TeamPage.astro` | Renders validated roster/copy, semantic hierarchy, matching contact, and existing card styles |
| Content schema | `src/content.config.ts` | Registers optional Team page data in the existing page schema |
| Content metadata/data | `src/content/pages/en/team.md` | Current nine-member roster, supporting copy, careers data, and social image; removes competing body roster |
| Route presentation | `src/layouts/PageLayout.astro` | Requires and passes Team data only for the established English Team route |
| Regression tests | `tools/seo.test.mjs` | Four focused generated-output/schema tests in the existing suite |
| Milestone documentation | `reports/migration-summary.md` | This dated review; prior evidence retained |
| Content schema, **new** | `src/types/team-page.ts` | Zod model and duplicate-member validation |
| Source asset, **new** | `public/assets/images/AIALanding_BG_V2.jpg` | Exact published Team social image |
| Source evidence, **new** | `reports/phase-5c-source-evidence-2026-10-09.json` | Cache-aware observations, roster, assets, corrections, and validation |
| Offline audit, **new** | `reports/route-reconciliation-2026-10-09-offline-17-20-21-008Z.json` | Updated local fingerprint with inherited production evidence |

Scope review found no homepage, service, consultation, Library, author,
employee-portal, Ads, navigation/footer, dependency/lockfile, deployment,
analytics, tracking, form/backend, or future-phase changes. No file is staged.

`merge-plan.md` remains untracked and unchanged. Its verified SHA-256 is
`015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.

## Phase 6A — Library Architecture Decision (2026-10-09 UTC)

**Starting checkpoint:** `34d5394b3ce765028a27b9cddd9952de3f09bfe7`.
This is a research and decision milestone. It changes no Library implementation,
content, dependency, route, redirect, publication rule, or deployment file.

### Scope and Method

Inspected the catchall route, all three Library index components,
`BlogIndexLayout`, `BlogCard`, `BlogPostLayout`, content/author schemas, all blog
and author records, publication policy/manifest, structured-data author
resolution, SEO/publication tests, route-audit tooling, Library page records,
README, migration instructions, accepted reports, and the latest offline route
reconciliation.

Production `robots.txt` was checked before 29 bounded sequential GETs from
**2026-10-09 18:01:51–18:02:17 UTC**. Requests covered Library/author roots,
first-page aliases, representative/last/invalid pages in all three languages,
trailing-slash examples, `/search`, and one search query. No redirects were
followed, forms submitted, authentication used, or production writes made. One
headless Chromium GET verified client-rendered search results.

Responses variously reported HubSpot `HIT`, `MISS`, or `REVALIDATED` and mostly
October 3–4 prerenders. They establish consistent current public behavior, not
origin freshness. Historical October 7 observations remain intact and support
the intervening English page 3–5/author page 3–5 statuses without repeat calls.

### Current Inventory and Confirmed Behavior

- **65 blog records:** 46 English, 12 Spanish, seven Arabic.
- All 65 are non-draft and generated. Two English syndicated records are
  accessible `noindex` external-canonical exceptions, leaving **63 sitemap-
  eligible posts**.
- Every post has title, description, date, author, category, featured image,
  canonical, and translation key. Tags are empty on all 65; no post declares
  `updatedDate` or image-alt frontmatter.
- Every post uses author slug `rula-diab`. There is one author record per
  language, all sharing explicit translation key `rula-diab`.
- Current indexes sort date descending only; stable manifest order implicitly
  breaks equal dates by route. They render every locale post in one list.
- English alone has an inert search input. Spanish/Arabic have no search control.
  No local pagination or author routes exist.
- The three Library Markdown bodies contain bypassed historical listing
  snapshots, creating a stale competing representation even though they do not
  render.
- Production uses ten posts per page: English 55 posts/six pages, Spanish 12/two,
  Arabic seven/one. Author archives have the same counts because all posts are
  currently attributed to Rula Diab.
- All six `/page/1` Library/author aliases return duplicate 200 content. English
  trailing-slash examples return 301 to no-slash roots. First invalid page
  boundaries return 404.
- Production search is a JavaScript-rendered GET `/search` flow. A browser query
  for `autism` returned 66 mixed-language blog/listing results, ten per offset
  page. Raw HTML contains no results and production supplies no useful search
  canonical/robots/title.

### Architecture Recommendation

Generate one small metadata-only JSON search index per language from a new
shared Library catalog based on the existing publication manifest. Use a
dependency-free TypeScript client with Unicode-aware English/Spanish/Arabic
normalization, weighted deterministic matching, accessible result state, and no
external query service. Current measured aggregate metadata is 42,090 bytes raw,
12,693 gzip, or 10,709 Brotli; a raw-body prototype is 474,623/135,796 gzip and
is not recommended without a verified need.

Use the same catalog for ten-item static Library and author pagination, explicit
date-descending/route-ascending sorting, author validation, and generated route
descriptors integrated with the shared publication policy. Page 1 remains each
root; `/page/1` becomes a locale-specific permanent redirect. Invalid or empty
pages are not generated. Numbered pages never gain hreflang from matching page
numbers. Author roots may use explicit author translation keys after localized
author content is source-reconciled and reviewed.

The complete proposal, alternatives, current evidence, URL disposition matrix,
route-count model, multilingual/RTL/SEO design, accessibility behavior, Phase 6B
checkpoints, test matrix, and decision register are in
[`phase-6a-library-architecture.md`](phase-6a-library-architecture.md).

### Route Implications and Sequencing

With the current corpus, the proposed `/search`, five numbered Library pages,
three author roots, and five numbered author pages would add 14 HTML routes:
**96 → 110**. Under the recommended policy, sitemap URLs would be **92 → 105**.
Validated author-root equivalence would add 12 hreflang links: **174 → 186**.
Redirect aliases add no HTML routes.

The current corpus can generate only five nonempty English pages. Production
page 6 and author page 6 contain real distinct content. Phase 6C's nine missing
English posts must therefore precede final pagination acceptance; no empty page,
generic-home redirect, or fabricated record is recommended. If all nine are
ordinary indexable records, the combined upper-bound projection is 121 HTML
routes and 116 sitemap URLs; exact policy and translation relationships must be
recomputed from the reconciled records.

### Validation

| Check | Result |
| --- | --- |
| Normal `npm run build` | Passed; Astro check 0 errors/warnings/hints; 96 HTML routes |
| `npm run audit:routes -- --check` | Passed offline against `route-reconciliation-2026-10-09-offline-17-20-21-008Z.json`; no network/writes |
| Indexing-enabled evidence build | Passed; 96 routes, 92 sitemap URLs, 174 hreflang links across 53 pages |
| Final normal build | Passed; restored staging output |
| Final staging safeguards | 96 routes; global `noindex,nofollow`; empty sitemap; no hreflang |

### Decisions Awaiting Approval

1. Metadata-only dependency-free search rather than full-body/Pagefind/client
   library search.
2. Ten posts per page and permanent page-1 alias redirects.
3. Preserved noindex `/search` compatibility for `term`, `q`, legacy `type`, and
   `offset`, while embedded Library search remains locale-scoped.
4. Indexable, self-canonical, sitemap-listed numbered/archive pages.
5. Continued listing/search visibility for the two accessible noindex syndicated
   pages, preserving current Astro behavior.
6. Explicit author-root hreflang, optional localized author `displayName`, and
   source-supported author bio reconciliation with human language review.
7. Phase 6C content sequencing before English page-6 acceptance.

No functional source file, dependency, route, redirect rule, content record,
Nix/nginx/deployment configuration, publication policy, or generated application
behavior was changed in Phase 6A.

## Phase 6A Architecture Ratification — October 9, 2026

The Phase 6A proposal was ratified against checkpoint
`76a035424dc5245443476b168d8c91ea62eed27b` with the following decisions. The
original proposal remains preserved as historical architecture research;
these later decisions govern Phase 6B implementation.

1. **Search architecture approved.** Library search uses the existing content
   collections and publication manifest, locale-specific static JSON indexes,
   and dependency-free project-owned TypeScript. Initial fields are title,
   description, headings, category, author display information, publication
   date, and future nonempty tags. Full-body indexing, fuzzy matching,
   stemming, hosted services, query logging, and third-party dependencies remain
   deferred or disallowed.
2. **Library pagination approved for a later checkpoint.** The agreed model is
   ten posts per page, publication date descending, normalized route ascending
   as a stable tie-breaker, the unnumbered root as page 1, nonempty generated
   pages 2+, and HTTP 301 redirects from `/page/1` aliases. Phase 6B.1 does not
   implement this decision.
3. **Legacy `/search` approved with a narrower initial scope.** It preserves
   `term`, `q`, repeated `type`, and `offset` compatibility but searches only
   Library articles. It is `noindex`, sitemap-excluded, and outside the
   hreflang graph. This intentional Library-only behavior differs from
   HubSpot's broader production site search.
4. **Archive indexing policy modified.** Future numbered Library pages are
   self-canonical, indexable, and sitemap-eligible. Future author roots and
   numbered author pages are initially `noindex,follow` and omitted from the
   sitemap. This replaces the proposal's recommendation to index all archive
   pages immediately. Phase 6B.1 creates no author routes.
5. **Syndicated-article handling approved.** The two accessible English records
   `community-highlight-meet-rula-diab` and `new-aia-scottsdale-office` remain
   available in Library listings and internal search while retaining their
   external canonicals, `noindex`, sitemap exclusion, and hreflang exclusion.
6. **Author-root hreflang conditionally approved for later work.** It requires
   explicit validated author translation keys plus eligible, indexable author
   roots. Numbered author pages never receive hreflang merely from matching page
   numbers. Because author archives initially remain `noindex`, Phase 6B.1 adds
   no author hreflang.
7. **Author content model approved for later work.** An optional localized
   `displayName` may reproduce source-supported archive headings, while the
   person's actual name remains the BlogPosting Person attribution. Biography
   reconciliation and substantive Spanish/Arabic edits require source evidence
   and human language review. Phase 6B.1 uses the existing author schema.
8. **Phase 6C sequencing approved with a cutover constraint.** Pagination may
   precede reconciliation of the nine missing English articles, but no records
   or empty pages may be fabricated. Production `/library/page/6` and
   `/library/author/rula-diab/page/6` cannot be accepted as migrated until
   Phase 6C supplies the necessary source-supported content.

The ratification therefore modifies four material recommendations in the
original proposal: `/search` initially searches Library content rather than the
whole site; author archives begin as `noindex` and outside the sitemap;
author-root hreflang waits for later content and indexing approval; and Library
pagination may be implemented before Phase 6C even though production page-6
acceptance may not. Only the search-related parts of Decisions 1, 3, and 5 were
authorized for Phase 6B.1. Pagination, author archives, redirects, and Phase 6C
content retain separate review gates.

## Phase 6B.1 — Shared Library Catalog and Search — October 9, 2026

**Starting checkpoint:** `76a035424dc5245443476b168d8c91ea62eed27b`

### Scope and Architecture

Phase 6B.1 implements one shared Library catalog, three generated static search
indexes, progressively enhanced locale-scoped search on the three Library
roots, and a static `/search` compatibility page. It adds no pagination or
author archive routes, changes no article body or date, installs no dependency,
and sends no query to an external service.

`src/utils/library-catalog.ts` is the single reusable catalog layer. It consumes
generated blog entries from the Phase 3A publication manifest, resolves authors
from the existing localized author records, and returns immutable metadata
records separated by locale. It includes route-eligible accessible records even
when they are `noindex` or externally canonicalized, while excluding drafts and
other non-generated records. Results sort by publication date descending and
normalized local route ascending; duplicate routes, missing authors, and
ambiguous authors fail explicitly. That ordering and data shape can be reused by
the later approved pagination work without maintaining a second article list.

The catalog extracts bounded Markdown/MDX headings while ignoring fenced code,
component syntax, and non-heading body content. A record contains only:

- stable local URL and locale;
- title and description;
- at most 50 meaningful headings, each capped at 300 characters;
- category and future nonempty tags;
- localized author name and slug; and
- publication date.

It does not serialize article bodies, rendered HTML, canonicals, form data,
visitor data, analytics identifiers, credentials, cookies, draft metadata, or
runtime secrets. `src/utils/library.ts` adapts the pure catalog to Astro content
collections and memoizes it for a build. The JSON endpoint at
`src/pages/assets/search/library/[locale].json.ts` creates deterministic UTF-8
assets for `en`, `es`, and `ar` on every build.

### Search Normalization and Ranking

`src/utils/library-search.ts` owns DOM-independent matching and compatibility
query parsing. It applies Unicode NFKC normalization, locale-aware lowercasing,
collapsed whitespace, punctuation normalization, Spanish accent-insensitive
matching, and removal of Arabic combining marks and tatweel while preserving
original display text. It does not stem or fuzzily rewrite words. Documented
partial-token matching begins at three characters to accommodate useful prefix
and attached-particle matches without turning short tokens into broad matches.

All normalized query terms must match. Deterministic weights favor an exact
title phrase, then title tokens, headings, description, category/tags, and
author metadata. Equal scores sort by publication date descending and route
ascending. Empty or whitespace-only input restores ordinary browsing. Unusual
punctuation and Unicode input, no matches, one match, multiple matches, and
cleared queries are covered by the focused test suite.

### Embedded Library Search

`LibrarySearch.astro` supplies the shared accessible interface for `/library`,
`/es/library`, and `/ar/library`. Each root loads only its own locale index on
the first real search. The existing server-rendered list remains complete (46
English, 12 Spanish, seven Arabic) because ten-item pagination is deferred.
Search state uses a `#search=` fragment, supports direct links and browser
back/forward navigation, and avoids sending embedded queries to a static server.
Clearing a query restores the server-rendered list and its pre-search fragment.

Controls become visible only after successful client initialization. The
ordinary listing and links remain available without JavaScript; a `<noscript>`
message describes the limitation. A failed index request reports the error but
does not hide or blank the archive. The component uses a visible label, native
search input, submit and reset controls, visible focus styles, result heading,
and a polite live region. It moves focus predictably after submission/reset,
does not trap focus, and creates all query/result text with DOM `textContent`
rather than unsanitized HTML.

English, Spanish, and Arabic use locale-scoped indexes and existing route
conventions. Arabic retains `lang="ar"`, `dir="rtl"`, RTL input/result
presentation, and logical DOM focus order. The source-supported control labels
`Search`, `Buscar`, and `بحث` are retained. Newly introduced Spanish and Arabic
operational microcopy (loading, errors, counts, reset, and no-results text) is
functionally complete but requires human language review; it is not represented
as professionally reviewed translation.

### Legacy `/search` Compatibility

The generated `/search` page states that it searches AIA Library articles,
rather than promising HubSpot's global-page search. `term` has precedence over
`q` when both are present; repeated legacy `type` values are accepted as
compatibility inputs but do not broaden the corpus. Visitors may search all
three indexes or explicitly filter by English, Spanish, or Arabic. A narrow
filter fetches only the selected index. Results use ten-item offset pages;
nonnegative multiples of ten are accepted, and invalid, negative,
non-numeric, non-multiple, or beyond-range offsets normalize to a valid state
without exposing nonexistent records.

The page is static, self-canonical to
`https://www.azinstitute4autism.com/search`, `noindex,follow` in an
indexing-enabled build, excluded from the sitemap, and excluded from hreflang.
The final staging build applies the global `noindex,nofollow` safeguard. Its
no-JavaScript fallback explains the requirement and links to all three working
Library roots. Query-string values can appear in ordinary server logs, unlike
fragment-based embedded queries; the page documents that privacy distinction.
No cookies, local search history, analytics, query logging, external API,
HubSpot forwarding, or persistent backend was added.

The route is integrated through the existing publication-policy API using the
small synthetic descriptor in `search-publication.ts`; it does not introduce a
second robots/canonical/sitemap policy. The publication manifest and sitemap
continue to represent content-backed routes only. The existing two syndicated
articles remain accessible in listings and search while their external
canonicals, `noindex`, sitemap exclusion, and hreflang exclusion remain intact.

### Generated Asset Measurements

Measurements were taken from the final generated JSON assets using local gzip
and Brotli compression:

| Locale | Records | Raw bytes | Gzip bytes | Brotli bytes |
| --- | ---: | ---: | ---: | ---: |
| English | 46 | 28,003 | 7,973 | 6,632 |
| Spanish | 12 | 10,170 | 3,427 | 2,969 |
| Arabic | 7 | 6,234 | 1,982 | 1,625 |
| **Total** | **65** | **44,407** | **13,382** | **11,226** |

The total is 2,317 raw bytes and 689 gzip bytes above Phase 6A's prototype,
primarily because the implemented records carry validated author objects,
bounded extracted headings, and their final endpoint representation. It remains
a metadata-only index. The final shared client module is 6,539 bytes raw, 2,651
bytes with gzip, and 2,312 bytes with Brotli. Measurements use `gzip -9 -n` and
`brotli -q 11`. Ordinary Library visits fetch no index until a search starts,
embedded searches fetch one locale, and filtered legacy searches avoid unused
locale assets. All query processing occurs in the browser.

### Validation and Browser Evidence

| Check | Result |
| --- | --- |
| `npm run test:library` | Passed: 16 tests covering real catalogs/build output, publication exclusions, syndicated inclusion, authors, sorting, headings, Unicode matching, legacy state, SEO, and safe client rendering |
| `npm run test:seo` | Passed: 34 tests |
| `npm run test:publication` | Passed: 33 tests |
| `npm run test:markdown` | Passed: 20 tests |
| Normal `npm run build` | Passed: Astro check reported 0 errors, warnings, or hints; 97 HTML routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed: 97 HTML routes, 92 sitemap URLs, 174 hreflang links across 53 pages |
| `npm run audit:routes -- --check` | Passed after the normal offline reconciliation process recorded the intentional `/search` route; no new production crawl |
| `npm run audit:links` | Passed: 0 broken internal links |
| `npm run audit:images` | Passed: 0 missing images |
| `npm run audit:blog` | Passed: 0 failures |
| Final normal `npm run build` | Passed and restored staging output: all 97 pages `noindex,nofollow`, empty sitemap, no hreflang |
| `git diff --check` | Passed |

The preserved-production offline reconciliation is
`route-reconciliation-2026-10-09-offline-20-22-09-196Z.json`: 129 reconciled
routes, 97 locally generated routes, and 70 inherited production verification
requests. It preserves the earlier observations rather than asserting a new
production crawl.

Chromium DevTools Protocol checks exercised the generated static site at desktop
and a 390-by-844 mobile Arabic viewport. They confirmed that an ordinary Library
visit loads no JSON; direct fragments and Enter submission work; reset and
back/forward restore state; failed JSON loading leaves 46 English cards usable;
JavaScript-disabled English retains all 46 cards and working links; the legacy
page honors `term` precedence and ten-result offsets; a Spanish filter fetches
only the Spanish index; and Arabic results/input remain RTL without horizontal
overflow. These checks also observed correct focus movement and live status
updates. No screenshots or browser artifacts were added to the repository.

The user also completed the full manual browser acceptance checklist against the
built static site served through the project's nginx/reverse-proxy environment
at `https://aia.web3app.dev`; every checklist item passed. Results display the
clear heading “Library Search Results,” keyboard submission moves focus to that
results region, the next Tab reaches the first result, and the browser focus
indicator remains visible. That intentional results-region focus behavior was
accepted without an additional accessibility correction. This acceptance did
not claim testing with a specific screen reader, and a separate Astro preview
run was unnecessary because the built output had already been tested through
the existing static-serving environment.

### Publication, Route, and Scope Invariants

- Generated HTML routes changed only from 96 to **97** for `/search`.
- The indexing-enabled sitemap remains **92** URLs.
- Indexing-enabled hreflang remains **174** links across **53** routes.
- `/search` is self-canonical, `noindex,follow`, sitemap-excluded, and has no
  hreflang in the indexing-enabled build.
- Final staging output contains **97** globally `noindex,nofollow` pages, an
  empty sitemap, and no hreflang.
- The three generated JSON assets are static assets, not HTML routes.
- No new article, numbered Library, author, or translation route exists.
- Canonicals, existing Library-root translation relationships, publication
  eligibility, syndicated exceptions, BlogPosting/FAQPage rules, author
  attribution, Header, Footer, LanguageSwitcher, forms, and integrations are
  unchanged.

Phase 6B.1 deliberately did not implement Library pagination, `/page/1`
redirects, author archives, author schema/biography changes, article/date
reconciliation, production redirects, Phase 6C records, hosting configuration,
analytics, or an external search service.

### Changed-File Inventory

Modified files:

- `package.json` — adds the focused `test:library` command.
- `src/components/pages/LibraryEnglish.astro`
- `src/components/pages/LibrarySpanish.astro`
- `src/components/pages/LibraryArabic.astro` — consume the shared catalog and
  mount the reusable search enhancement while retaining complete SSR listings.
- `src/layouts/BlogIndexLayout.astro` — narrowly scoped search/result styling.
- `src/utils/publication-policy.ts` — broadens the existing descriptor's data
  type for fields already consumed by the catalog; policy behavior is unchanged.
- `src/utils/publication.ts` — resolves the `/search` utility descriptor through
  the existing publication API.
- `tools/publication.test.mjs` and `tools/seo.test.mjs` — include the deliberate
  `/search` route in route and SEO invariants.
- `reports/migration-summary.md` — records ratification, implementation, and
  validation evidence.

New files:

- `src/utils/library-catalog.ts`
- `src/utils/library-search.ts`
- `src/utils/library.ts`
- `src/utils/search-publication.ts`
- `src/components/LibrarySearch.astro`
- `src/pages/assets/search/library/[locale].json.ts`
- `src/pages/search.astro`
- `tools/library.test.mjs`
- `reports/route-reconciliation-2026-10-09-offline-20-22-09-196Z.json`

### Remaining Review Items

1. Human language review is required for the newly introduced Spanish and
   Arabic search-state/accessibility microcopy. This does not change or invent
   article translations.
2. The intentional Library-only scope of `/search` should remain visible to
   stakeholders because it differs from production HubSpot global search.
3. Pagination, page-1 redirect rules, noindex author archives, eventual author
   indexability/hreflang, author biographies, and Phase 6C page-6 content remain
   separate approved or conditional checkpoints and are not implemented here.

## Phase 6B.2 — Library Pagination and Page-1 Redirects (2026-10-10)

### Scope and Starting State

Phase 6B.2 started from checkpoint
`b20c253383440598c2d07bf6f852906ac00c42df` on
`faithful-astro-migration`. It implements deterministic, static pagination for
the three existing Library roots and repository-level redirect definitions for
their first-page aliases. It does not add Library articles, author routes,
author metadata, production hosting configuration, or deployment changes.

The Phase 6B.1 catalog was recalculated from the repository rather than from
historical counts. It contains 46 eligible English records, 12 Spanish records,
and seven Arabic records. The two accessible English syndicated records remain
in that listing catalog despite retaining their external canonicals and
`noindex` publication treatment.

### Shared Pagination and Route Integration

`src/utils/library-pagination.ts` is a pure, reusable layer over the existing
catalog. Its page size is ten. It reports total items, nonempty page count,
current slice, and previous/next page numbers; rejects unsafe, non-integer,
zero, negative, and beyond-last page numbers; and maps page 1 back to the
unnumbered locale root. An empty root is a valid archive state, while no empty
numbered page is generated. Tests show that adding, removing, drafting, or
republishing catalog records changes the generated page inventory without a
manual route list.

The content publication manifest remains independent of the Library catalog.
`getLibraryPaginationManifest()` first receives the completed content manifest,
then derives the catalog and generated page descriptors from it.
`getRoutePublicationManifest()` composes and sorts those two inventories for
static route generation and sitemap output. This ordering avoids a recursive
manifest/catalog dependency. Generated pages reuse their locale's Library root
entry for presentation, while their publication descriptor supplies the
numbered route, self-canonical URL, eligibility, sitemap status, and page
metadata. The reserved `/{locale?}/library/page` families are checked against
content routes before generation, so content cannot silently shadow an archive
or alias.

The generated current-corpus inventory is:

| Language | Eligible articles | Routes and card counts |
| --- | ---: | --- |
| English | 46 | `/library` (10), `/library/page/2` (10), `/library/page/3` (10), `/library/page/4` (10), `/library/page/5` (6) |
| Spanish | 12 | `/es/library` (10), `/es/library/page/2` (2) |
| Arabic | 7 | `/ar/library` (7); no numbered page |

The implementation intentionally generates no `/page/1` HTML, English page 6,
Spanish page 3, Arabic page 2, page 0, leading-zero alias, decimal page, or
beyond-last page. Those absent paths fall through to the static host's 404
behavior.

### Rendering, Navigation, and Search

The three locale components now render the page slice returned by the shared
helper. Existing heroes, introductory content, cards, article URLs, featured
images, popular-post lists, and search controls remain in place. Page-specific
document titles append `Page N` or the existing locale's equivalent; the
visible root H1 is unchanged and remains unique. `BlogIndexLayout.astro` accepts
the heading separately from the document title so a numbered title does not
alter the source heading.

`LibraryPagination.astro` renders server-side anchors for previous, next, and
each valid page. Page 1 always links to the unnumbered root. The current link
uses `aria-current="page"`; the navigation has a locale-specific accessible
label, visible focus styles, 44-pixel minimum targets, wrapping layout, and no
disabled or nonexistent links. Arabic retains document RTL direction and
logical DOM focus order. The newly introduced Spanish and Arabic pagination
labels are functional but remain ready for human language review rather than
being represented as professionally reviewed translations.

The ordinary cards and pager share one archive wrapper. Phase 6B.1 search still
loads the full locale JSON index, including when initiated on a numbered page.
While search is active it hides both that page's cards and pager. Reset restores
the same numbered page without navigating to page 1. Direct fragments and
browser Back/Forward preserve the expected state. If index loading fails, the
page slice and pager remain usable. With JavaScript disabled, cards and real
pagination links remain fully navigable and the search enhancement stays
honestly unavailable. Legacy `/search` query and offset behavior is unchanged.

The historical Markdown listing snapshots remain bypassed and were not edited;
the catalog remains the only rendered listing source.

### First-Page Alias Redirect Definitions

The existing generator and redirect registry retain the three service aliases
and add exactly these definitions:

| Source | Destination | Status |
| --- | --- | ---: |
| `/library/page/1` | `/library` | 301 |
| `/es/library/page/1` | `/es/library` | 301 |
| `/ar/library/page/1` | `/ar/library` | 301 |

`src/data/redirects.json`, `reports/redirect-map.csv`, and
`reports/nginx-rewrites.conf` are generated from the same source definitions.
Tests reject duplicate sources, redirect loops, altered service aliases,
generated alias HTML, or alias sitemap entries.

An isolated `nginx:latest` container served the generated static output with
the generated snippet mounted read-only. Each alias returned HTTP 301 with its
exact path-only `Location`, following each redirect ended at HTTP 200 without a
loop, `/library/page/2` returned 200, and `/library/page/6` returned 404. The
container was stopped after the check. These results validate the repository
definitions and compatible nginx behavior only. Neither the NixOS reverse
proxy nor the deployed staging/production configuration was changed; activation
and host-level verification remain explicitly gated.

### Publication and SEO Results

The three Library roots preserve their existing self-canonicals and reciprocal
root hreflang relationships. Each generated numbered page is self-canonical,
`index,follow` in the local indexing-enabled build, present in that sitemap,
and deliberately has no hreflang. The five routes increase the generated HTML
count from 97 to 102 and the production-policy sitemap count from 92 to 97.
Hreflang remains 174 links across the same 53 routes.

The existing article routes, article canonicals, syndicated exceptions,
BlogPosting and FAQPage output, `/search` noindex behavior, LanguageSwitcher,
Header, Footer, forms, and integrations are unchanged. The final normal build
restored all 102 pages to global `noindex,nofollow`, an empty sitemap, and no
hreflang.

The saved-production offline reconciliation is
`reports/route-reconciliation-2026-10-10-offline-02-51-44-711Z.json`. It records
102 locally generated routes and reuses the existing 70 production requests
without making network requests or changing the historical observations. Its
production sitemap figures describe the preserved discovery baseline, not the
local indexing-enabled sitemap assertion above.

### Browser and Redirect Validation

A local Astro preview of the generated static artifact was exercised through
headless Chromium at desktop and 390-by-844 mobile viewports. Thirty-six focused
checks covered all three Library roots, English pages 2, 3, and 5, Spanish page
2, visible-link navigation, boundary controls, exact card counts, unique H1s,
mobile wrapping and overflow, Arabic RTL, and direct numbered URLs.

On `/library/page/3`, search found an article outside that ten-card slice,
hid cards and pagination, and restored the original page-3 archive on reset.
Direct search fragments and browser Back/Forward worked. Representative Spanish
search also used its full locale catalog. A blocked index request retained the
archive and pager. With JavaScript disabled, page-3 cards, article links, and
pagination remained available while search stayed unavailable. No claim is
made for a particular screen reader. The deployed `aia.web3app.dev` host was not
changed or used as evidence that the new redirect definitions are active.

### Automated Validation

| Check | Result |
| --- | --- |
| `npm run test:library` | Passed: 25 tests, including pagination boundaries, real corpus slices, route growth/removal, collisions, rendering, navigation, search, redirects, and SEO |
| `npm run test:seo` | Passed: 34 tests |
| `npm run test:publication` | Passed: 33 tests |
| `npm run test:markdown` | Passed: 20 tests |
| Normal `npm run build` | Passed: Astro check reported 0 errors, warnings, or hints; 102 HTML routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed: 102 HTML routes, 97 sitemap URLs, 174 hreflang links across 53 routes |
| `npm run audit:routes -- --check` | Passed after the established offline reconciliation procedure; no production requests |
| `npm run audit:links` | Passed: 0 broken internal links |
| `npm run audit:images` | Passed: 0 missing mapped page images |
| `npm run audit:blog` | Passed: 0 blog content audit failures |
| Final normal `npm run build` | Passed: 102 pages, all `noindex,nofollow`, empty sitemap, no hreflang |
| `git diff --check` | Passed |

### Cutover Blockers and Deferred Work

1. Production exposes `/library/page/6`, but the repository still lacks the
   nine source-supported English articles assigned to Phase 6C. No empty page,
   placeholder record, or misleading redirect was created. Phase 6C remains a
   production-cutover prerequisite for accepting that URL.
2. Production's English author page 6 depends on the same missing corpus and on
   Phase 6B.3 author archive implementation. No author route or author redirect
   was added here.
3. Activation and HTTP verification of the three first-page redirects on the
   intended hosting stack require a separately approved hosting change.
4. The Spanish and Arabic pagination navigation strings require human language
   review. No article translation or translation relationship changed.

### Changed-File Inventory

Modified files:

- `reports/migration-summary.md` — this implementation, evidence, validation,
  and cutover record.
- `reports/nginx-rewrites.conf`, `reports/redirect-map.csv`, and
  `src/data/redirects.json` — generated first-page alias definitions while
  preserving the three service aliases.
- `src/components/pages/LibraryEnglish.astro`,
  `src/components/pages/LibrarySpanish.astro`, and
  `src/components/pages/LibraryArabic.astro` — deterministic locale page slices,
  pager integration, and separate numbered document titles.
- `src/layouts/BlogIndexLayout.astro` — separates the H1 from numbered document
  titles and makes cards plus pager one search visibility boundary.
- `src/pages/[...slug].astro` — generates and renders composed numbered routes.
- `src/pages/sitemap.xml.ts` — uses the composed eligible route manifest.
- `src/utils/publication.ts` — composes content and generated Library page
  descriptors through the existing publication API.
- `tools/generate-redirects.mjs` — adds the three approved Library aliases.
- `tools/library.test.mjs`, `tools/publication.test.mjs`, and
  `tools/seo.test.mjs` — focused pagination, routing, search, redirect,
  publication, sitemap, and metadata regression coverage.

New files:

- `src/utils/library-pagination.ts` — pure pagination and generated publication
  descriptors.
- `src/components/LibraryPagination.astro` — accessible locale-aware pager.
- `reports/route-reconciliation-2026-10-10-offline-02-51-44-711Z.json` —
  reproducible offline route evidence using the preserved production baseline.

No package dependency, article body, author record, content date, form,
analytics, advertising, production hosting, employee-portal, or unrelated page
was changed. Author archives, author biographies, Phase 6C content, page-1
author aliases, and production deployment remain outside this checkpoint.

## Session Transition Handoff — October 9, 2026

After verifying the pushed Phase 6B.2 checkpoint
`6f5ac3c0d233cee5fbbb62be79bc6909e6bec183` on branch
`faithful-astro-migration` (parent `b20c253383440598c2d07bf6f852906ac00c42df`,
18 changed files), a short, continually maintained handoff was added at
[`reports/SESSION_HANDOFF.md`](SESSION_HANDOFF.md). The handoff identifies
Phase 6B.3 as the next milestone, links to controlling instructions and
accepted ratification decisions, and lists known Phase 6C content gaps,
localization review, and pending redirect-host activation. It is an orientation
index, not a replacement for this dated migration evidence.

This is a **documentation-only transition checkpoint**. No application code,
publication rules, search or pagination behavior, redirect definitions, or
hosting/deployment configuration were changed; no build or browser-test result
is claimed for this documentation update.

## Phase 6B.3 — Author Archives and Linked Bylines (2026-10-10)

### Scope and Starting State

Phase 6B.3 was implemented for review from branch
`faithful-astro-migration` at starting HEAD
`0957c06a18726a01531f5b46a1d74bc67aa58f60`. The last completed
implementation checkpoint remains Phase 6B.2 at
`6f5ac3c0d233cee5fbbb62be79bc6909e6bec183`; the later starting HEAD is the
documentation-only session-handoff commit. This milestone adds generated
author archives and linked bylines. It does not implement author redirects,
make author pages indexable, add the nine Phase 6C articles, change deployment,
or alter Library search semantics.

The existing catalog was recalculated at 46 English, 12 Spanish, and seven
Arabic eligible articles. All 65 records reference the exact locale-specific
`rula-diab` author record. The two accessible syndicated English records remain
in the catalog and author archive listings while retaining their existing
article-level external canonicals, `noindex`, sitemap exclusion, hreflang
exclusion, and structured-data exclusion.

### Public Source Evidence and Limits

The three published roots were inspected with bounded, read-only requests:

- `https://www.azinstitute4autism.com/library/author/rula-diab`
- `https://www.azinstitute4autism.com/es/library/author/rula-diab`
- `https://www.azinstitute4autism.com/ar/library/author/rula-diab`

Normal and explicit revalidation requests ran from `2026-10-10T03:22:53Z`
through `2026-10-10T03:23:00Z`, at least one second apart. All returned 200,
`Cache-Control: no-store, no-cache, must-revalidate`, Cloudflare as the server,
and `x-hs-cache-config: BrowserCache-5s-EdgeCache-0s`. HubSpot reported October
3 prerenders and matching `Last-Modified` values: English at
`2026-10-03T23:13:21Z`, Spanish at `23:13:18Z`, and Arabic at `23:13:19Z`.
Normal, revalidation, desktop-browser, and mobile-browser observations agreed.
That agreement establishes the observed public representation but does not
prove uncached origin freshness or independently verify the biographical,
credential, role, or employment claims.

The evidence file
`reports/phase-6b3-source-evidence-2026-10-10.json` preserves request metadata,
titles, descriptions, headings, biography transcriptions, avatar mapping,
pagination links, popular-post observations, and desktop/mobile measurements.
No cookies, credentials, authenticated requests, forms, APIs, or production
writes were used.

The author records reproduce the observed locale-specific credentialed
headings and one-paragraph biographies. The underlying identity remains `Rula
Diab` in every locale. Spanish and Arabic text is a traceable transcription of
the public source and remains ready for human language review; it is not
represented as a professionally approved translation. The source 755-by-755
JPEG replaces the old 100-by-100 derivative at the existing local asset path
`/assets/images/rula-diab-avatar.jpg`; its SHA-256 is
`0ea7b2c2d4e4a5e23b375ffa9ebbcf658e0cf5898f43c3a5506a80db86fa974a`.

### Author Model and Resolution

`src/utils/authors.ts` now provides one exact `(locale, author slug)` resolver
for the catalog, cards, full posts, BlogPosting generation, and archives. It
validates supported locale, a safe single-segment Unicode slug, nonblank
identity and optional display name, description type, and a normalized local
avatar path. Duplicate, missing, invalid, or ambiguous references fail with an
actionable build error. The resolver returns the underlying `name`, optional
presentation `displayName`, biography data, avatar, and computed locale archive
route. It does not consult Team records or infer employment, credentials, or
translation equivalence.

The author content schema and Front Matter CMS configuration add the optional
`displayName`. `name` continues to hold the person's identity. BlogPosting
continues to emit `author: { "@type": "Person", "name": "Rula Diab" }`; the
credentialed display string is used only in visible headings and bylines. No
unsupported author URL, credential, employer, `sameAs`, or Team relationship
was added to JSON-LD.

### Archive Generation and Rendering

`src/utils/author-archives.ts` composes author descriptors only after the
content manifest and shared eligible Library catalog exist. It groups catalog
records by exact locale and declared author slug, resolves each author through
the shared resolver, and reuses `paginateLibraryItems()` with the existing
ten-item page size and date-descending/normalized-route-ascending order. It
generates only nonempty pages and detects reserved author-family route
collisions, including ineligible content records, as well as duplicate
canonical targets. This preserves the manifest-first composition order and
does not create a recursive catalog/publication dependency.

The current generated route inventory is:

| Locale | Eligible author articles | Generated routes and card counts |
| --- | ---: | --- |
| English | 46 | `/library/author/rula-diab` (10), pages 2–4 (10 each), page 5 (6) |
| Spanish | 12 | `/es/library/author/rula-diab` (10), page 2 (2) |
| Arabic | 7 | `/ar/library/author/rula-diab` (7) |

These eight routes are derived rather than hardcoded. A newly referenced valid
author gains an archive automatically; an author with no eligible posts gains
none. No `/page/1`, English page 6, Spanish page 3, Arabic page 2, malformed
page number, beyond-last page, or unknown-author route is generated.

The catchall renderer distinguishes the synthetic author descriptor before
rendering ordinary page or article content. `AuthorArchive.astro` uses the
existing Library hero, shared `BlogCard`, shared pagination component, author
record body, catalog, and locale shell. It preserves one H1, uses the author
heading as H2, renders the verified portrait and biography, retains the
catalog's sidebar treatment, and preserves Arabic `lang="ar" dir="rtl"`.
Numbered pages have distinct titles while retaining the same visible archive
headings. Pagination uses real links, root page-one URLs, previous/next
boundaries, `aria-current="page"`, localized labels, 44-pixel targets, and
visible keyboard focus. It remains fully usable without JavaScript.

The production Popular Posts links are an editorial selection and differ from
the current repository's five newest eligible posts. The new archive reuses the
same deterministic catalog-derived sidebar behavior already used by the three
Astro Library indexes rather than introducing a second manually maintained
article list. Exact production sidebar selection remains a content-fidelity
review item and should be reconciled together with the Phase 6C corpus rather
than hardcoded here.

### Linked Bylines and Existing Library Behavior

`BlogCard.astro` and `BlogPostLayout.astro` no longer hardcode one English
credential string and avatar. Both resolve the article's exact locale/slug
author, display the source-supported localized presentation name and avatar,
and link it with `rel="author"` to the corresponding local archive. Decorative
adjacent avatars retain empty alternatives; archive portraits use the
localized display heading. Article titles, Read More links, dates, bodies,
canonicals, and publication metadata are unchanged. Tests reject nested links
and verify visible focus.

Phase 6B.1 search indexes, legacy `/search`, and Phase 6B.2 Library slices are
unchanged. Search on a numbered Library page still covers the full locale
catalog, hides the ordinary cards and pager while active, and restores that
same page on reset. No search feature was added to author archives. No search
logging, external service, analytics, query transmission, cookies, or backend
was introduced.

### Publication and SEO Results

Every author descriptor is eligible for static generation but carries
`noindex: true`, no external canonical, no translation edges, and no sitemap
eligibility. In the indexing-enabled build all eight pages are self-canonical,
emit `noindex,follow`, have no hreflang, and remain absent from the 97-URL
sitemap. Existing Library-root hreflang stays unchanged. Production source
pages exposed no canonical or robots meta in the captured HTML; the local
self-canonical/noindex behavior is the ratified migration policy rather than a
claim that HubSpot currently emits it.

The indexing-enabled build produced 110 HTML routes, 97 sitemap URLs, and 174
hreflang links across 53 routes. The eight new author routes explain the change
from the Phase 6B.2 total of 102; sitemap and hreflang totals do not change.
Existing article canonicals, syndicated exceptions, BlogPosting and FAQPage
rules, Library pagination metadata, `/search`, and global publication controls
remain unchanged.

The route audit first reported the expected source-fingerprint mismatch. The
established offline procedure then generated
`reports/route-reconciliation-2026-10-10-offline-03-48-54-074Z.json`, reusing all 70 saved
production requests with no new production fetches, and its subsequent
`--check` passed. The reconciliation records 110 locally generated routes and
preserves historical production observations rather than rewriting them.

### Automated and Browser Validation

| Check | Result |
| --- | --- |
| `npm run check` | Passed: 90 Astro files, 0 errors, warnings, or hints |
| `npm run test:library` | Passed: 31 tests, including resolver validation, eight exact archive routes, 46/12/7 slices, growth/removal, collisions, rendering, bylines, SEO, and search regression |
| `npm run test:seo` | Passed: 34 tests, including identity-versus-display-name BlogPosting coverage |
| `npm run test:publication` | Passed: 33 tests |
| `npm run test:markdown` | Passed: 20 tests |
| Normal `npm run build` | Passed: 110 HTML routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed: 110 HTML routes, 97 sitemap URLs, 174 hreflang links across 53 routes |
| `npm run audit:routes -- --check` | Passed after offline reconciliation; no live requests |
| `npm run audit:links` | Passed: 0 broken internal links |
| `npm run audit:images` | Passed: 0 missing mapped page images |
| `npm run audit:blog` | Passed: 0 blog content audit failures |

Headless Chromium performed 39 focused checks against the built static output
through local Astro preview. Coverage included English first/final pages,
Spanish first/final pages, Arabic root, exact card counts, titles/canonicals and
robots, no hreflang, local assets, locale and direction, desktop and 390-by-844
mobile overflow, profile sizing, pager boundaries, card and full-post byline
navigation in all three languages, keyboard Tab focus and visible focus on the
author link, no-JavaScript archive and pager navigation, and unchanged
full-catalog Library search/reset behavior. Source and local desktop screenshots
were inspected from temporary files and are not committed. No particular
screen reader or user-performed manual acceptance is claimed.

The final validation step restores the normal staging artifact. Its expected
and verified safeguards are 110 HTML pages, all `noindex,nofollow`, an empty
sitemap, and no hreflang.

### Redirect Boundary, Deferred Work, and Human Review

No author alias was added to the redirect registry. The intended future
Phase 6B.4 definitions remain:

- `/library/author/rula-diab/page/1` → `/library/author/rula-diab` (301)
- `/es/library/author/rula-diab/page/1` → `/es/library/author/rula-diab` (301)
- `/ar/library/author/rula-diab/page/1` → `/ar/library/author/rula-diab` (301)

No duplicate page-one HTML exists. Repository or host activation and HTTP
verification of these aliases remain separately gated. No distinct later page
is redirected to an earlier page.

Outstanding review items are:

1. Human language review of the source-transcribed Spanish and Arabic display
   headings, biographies, and existing pagination labels.
2. Independent organizational review of the public biographical, credential,
   and role claims if AIA requires factual approval beyond faithful source
   reproduction. Author attribution does not establish Team membership.
3. Phase 6C's nine missing English articles remain required before either
   production `/library/page/6` or `/library/author/rula-diab/page/6` can be
   accepted for cutover. No substitute route or content was fabricated.
4. Exact production Popular Posts selection should be reconsidered after the
   Phase 6C corpus is complete.
5. Author archive indexability, sitemap eligibility, and author-root hreflang
   remain later human-decision gates. This milestone intentionally emits none.

### Changed-File Inventory

Modified files:

- `frontmatter.json` — optional author presentation-name field.
- `public/assets/images/rula-diab-avatar.jpg` — verified full-size source
  portrait at the existing local path.
- `src/components/BlogCard.astro` — resolved, linked locale byline and avatar.
- `src/components/LibraryPagination.astro` — narrow author-root route support
  through the shared pager.
- `src/content.config.ts` — validated optional display name and author identity
  fields.
- `src/content/authors/en/rula-diab.md`,
  `src/content/authors/es/rula-diab.md`, and
  `src/content/authors/ar/rula-diab.md` — observed display headings and public
  biography transcriptions.
- `src/layouts/BlogPostLayout.astro` — resolved, linked full-post byline.
- `src/pages/[...slug].astro` — author-descriptor rendering dispatch.
- `src/utils/library-catalog.ts` — uses the shared exact author resolver.
- `src/utils/publication.ts` — composes author descriptors after content and
  Library pagination.
- `src/utils/structured-data.ts` — shared resolver while retaining underlying
  Person identity.
- `tools/library.test.mjs`, `tools/publication.test.mjs`, and
  `tools/seo.test.mjs` — archive, resolver, byline, route, publication, schema,
  and generated-HTML regression coverage.
- `reports/migration-summary.md` — this dated implementation and review record.

New files:

- `src/utils/authors.ts` — shared author validation and resolution.
- `src/utils/author-archives.ts` — derived author archive publications.
- `src/components/pages/AuthorArchive.astro` — source-specific archive
  presentation.
- `reports/phase-6b3-source-evidence-2026-10-10.json` — dated production and
  source-asset evidence.
- `reports/route-reconciliation-2026-10-10-offline-03-48-54-074Z.json` — reproducible offline
  route reconciliation.

No package dependency, article body/date, Team record, Library search index,
redirect definition, form, analytics, advertising, consent, employee portal,
deployment, or unrelated site content was changed. `reports/SESSION_HANDOFF.md`
was intentionally left at Phase 6B.2 during implementation review; checkpoint
acceptance advances it separately without inventing the containing commit SHA.

### Manual Acceptance and Newly Observed Deferred Defects (2026-10-10)

The user completed and accepted the Phase 6B.3 manual browser checklist after
the automated review. Manual coverage included English, Spanish, and Arabic
author archives; first and final pagination pages; biography and portrait
presentation; card and full-post byline links; mobile layouts; Arabic RTL
archive layout; keyboard focus; and preservation of existing Library behavior.
This user acceptance is separate from the 39 automated headless Chromium
checks. It does not establish screen-reader testing, professional Spanish or
Arabic language review, or organizational verification of credentials,
biographical claims, roles, or employment.

The accepted validation baseline remains 110 generated HTML routes, including
eight author archive routes; 97 indexing-enabled sitemap URLs; 174 hreflang
links across 53 routes; all eight author routes self-canonical,
`noindex,follow`, sitemap-excluded, and hreflang-excluded; and the final staging
build globally `noindex,nofollow` with an empty sitemap and no hreflang. The 31
Library, 34 SEO, 33 publication, and 20 Markdown tests passed, as did the link,
image, blog, and saved-evidence offline route audits. No new production crawl
was performed for checkpoint acceptance.

Broader user inspection subsequently identified three open multilingual
defects. They do not invalidate the accepted core author-archive implementation
and were not changed during checkpoint preparation:

1. **Arabic footer contact presentation — Phase 6B.5.** On Arabic pages,
   articles, and author archives, RTL direction disrupts the visual presentation
   of Latin-script telephone, email, and address content. The shared footer may
   require explicit direction isolation and RTL-aware formatting. This is a
   user-observed presentation defect; its precise code-level cause still needs
   targeted verification.
2. **Author archive language selector — high-priority pre-cutover navigation
   defect; targeted remediation and Phase 6B.5 verification.** The selector in
   the Arabic author archive header appeared unresponsive. Code inspection
   suggests a likely architectural cause: the committed LanguageSwitcher uses
   `publication.translations`, while author descriptors deliberately have no
   SEO translation relationships during their initial `noindex` period. This
   is a hypothesis, not a completed runtime diagnosis. A correction must
   distinguish visitor navigation through explicitly validated locale author
   records and translation keys from SEO hreflang. Author hreflang, sitemap
   inclusion, or indexing must not be enabled as a workaround.
3. **Language-appropriate navigation destinations — Phase 6B.5.** From an
   Arabic author archive, Library should prefer `/ar/library` rather than the
   English `/library` when that published route exists. The committed MainNav
   currently falls back to English navigation for Arabic despite
   `navigation.ar.json`; Spanish is partly localized, and the footer retains
   English-path assumptions. A later correction must cover desktop, mobile,
   and footer navigation; validate actual published destinations; define
   explicit fallback behavior; avoid guessed translated routes; and preserve
   the approved SEO translation policy. The navigation behavior is
   user-observed; the cited code paths are inspection hypotheses pending the
   scoped remediation.

Phase 6B.4 remains the next milestone for URL and SEO reconciliation, including
the deferred author `/page/1` aliases. Phase 6B.5 follows for multilingual,
RTL, accessibility, and performance acceptance, including the three defects
above. The nine missing English articles remain Phase 6C work and continue to
block final acceptance of the two production page-6 URL families.

## Phase 6B.4 — URL, Canonical, Sitemap, and Redirect Reconciliation (2026-10-10)

Implemented on `faithful-astro-migration` from accepted checkpoint
`8646792d46a8a117ef617f5dd2582c2550b45d19`. This milestone reconciles the
generated route inventory and SEO output, adds the approved author page-one
aliases, and makes repository redirects part of the repeatable offline route
matrix. It does not activate hosting rules, add content, change publication
eligibility, or address the Phase 6B.5 multilingual defects.

### Evidence and URL Dispositions

No production request or crawl was made. The new reconciliation reuses the 70
saved requests and original observation times from
[`route-reconciliation-2026-10-10-offline-03-48-54-074Z.json`](route-reconciliation-2026-10-10-offline-03-48-54-074Z.json).
The Phase 6A source investigation remains separate supporting evidence: 29
bounded public GETs from **2026-10-09 18:01:51–18:02:17 UTC** observed all six
Library/author `/page/1` candidates as duplicate HTTP 200 pages. The older
October 7 route evidence directly observed the three legacy service aliases as
matching 301 redirects. These observations describe HubSpot behavior and do
not establish origin freshness or deployment of the new rules.

The repeatable schema-2 result is
[`route-reconciliation-2026-10-10-offline.json`](route-reconciliation-2026-10-10-offline.json).
It inventories 110 generated HTML routes and nine repository redirects across
133 reconciled route/query records. Each redirect source now carries its
destination, status, reason, discovery sources, saved HTTP evidence where
available, and an explicit disposition. The three service aliases classify as
`local-and-production-redirect`; the six page-one aliases classify as
`local-redirect-production-unverified` in this inherited October 7 evidence.
The report records repository definitions, not deployed-host activation.

| URL family | Local disposition | SEO / preservation result |
| --- | --- | --- |
| `/library`, `/es/library`, `/ar/library` | Preserved generated roots | Self-canonical, indexable and sitemap-eligible in the indexing build; existing explicit root hreflang retained |
| English Library pages 2–5; Spanish page 2 | Preserved generated pages | Self-canonical, indexable, sitemap-eligible; no numbered-page hreflang |
| Eight current author roots/pages | Generated but deliberately `noindex` | Self-canonical `noindex,follow`; sitemap- and hreflang-excluded |
| Six Library/author `/page/1` aliases | Approved repository 301 definitions | No HTML, canonical, sitemap, or hreflang entity at the source path |
| `/search` and supported `term`, `q`, repeated `type`, `lang`, and `offset` state | Preserved static Library-only compatibility route | `/search` self-canonical, `noindex,follow`, sitemap- and hreflang-excluded; query state remains client-side and escaped |
| Three legacy service aliases | Preserved repository 301 definitions | Exact existing destinations and statuses retained |
| Two syndicated English articles | Accessible external-canonical records | Still `noindex`, sitemap- and hreflang-excluded; remain in Library/author listings |
| `/library/page/6` and `/library/author/rula-diab/page/6` | Verified production routes, missing locally | Phase 6C cutover blockers; no empty page, copied page 5, or redirect substitute |
| Page 0, negative/decimal/leading-zero/beyond-last pages, unknown authors | Intentionally absent | No generated output, sitemap entry, metadata, or concealment redirect |
| Draft and unpublished records, including `/ar` | Intentionally excluded | Publication policy unchanged |

The 102 sitemap routes in the offline report are the preserved historical
production discovery baseline. They are not the local policy sitemap, which
contains 97 URLs in the indexing-enabled build. Sitemap omission is not used
as proof that a production URL is absent. `reports/url-inventory.csv` remains
the historical extracted content-file inventory; its `source_file` model does
not represent synthetic archives, utility routes, or redirect-only aliases, so
it is not presented as the current complete disposition matrix.

### Redirect Registry and Validation

`tools/generate-redirects.mjs` remains the single redirect definition source.
It now rejects unnormalized paths, duplicate sources, non-301 definitions,
empty reasons, locale-changing destinations, self-redirects, chains/cycles,
generated-source collisions, and destinations missing from the generated
route inventory. It writes deterministic JSON, CSV, and nginx artifacts.

The existing service and Library definitions are unchanged. These three author
aliases complete the current nine-rule registry:

| Source | Destination | Status |
| --- | --- | ---: |
| `/library/author/rula-diab/page/1` | `/library/author/rula-diab` | 301 |
| `/es/library/author/rula-diab/page/1` | `/es/library/author/rula-diab` | 301 |
| `/ar/library/author/rula-diab/page/1` | `/ar/library/author/rula-diab` | 301 |

These aliases are intentionally explicit for the one current referenced
author. A future author must first have a real eligible generated archive; its
page-one alias can then be deliberately added and validated rather than being
created for zero-post or nonexistent author records.

An isolated `nginx:latest` container served the normal local static build with
the generated snippet. All nine definitions returned HTTP 301 with exact
locale-preserving `Location` values; following each ended at HTTP 200 without a
loop. A `term=autism` query on `/library/page/1` was preserved at
`/library?term=autism`. Both Library and
author page 2 returned 200. Both English page-6 gaps, page 0, leading-zero page
aliases, an unknown author, and an invalid author page returned 404. `nginx -t`
passed. This validates the repository artifacts under a compatible isolated
server only; neither deployed staging nor production nginx was changed. The
[nginx rewrite module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html)
documents that the generated `permanent` flag returns HTTP 301.

### Trailing-Slash Reconciliation

The public canonical model remains no-slash except `/`, enforced by
`normalizeRoute`, canonical validation, and `trailingSlash: 'never'`. Phase 6A
observed current English `/library/` and `/library/author/rula-diab/` requests
returning 301 to their no-slash forms on October 9. The other locale and
numbered trailing-slash variants were not individually requested. Historical
October 7 evidence also records HubSpot redirecting `/es` to `/es/`, so the
source host is not evidence of one universal no-slash transport policy.

The [Astro configuration reference](https://docs.astro.build/en/reference/configuration-reference/#trailingslash)
states that prerendered-page trailing slashes are handled by the hosting
platform and may not follow the Astro setting. A neutral isolated nginx
`try_files` configuration returned 200 for both slash
and no-slash versions of the same local Library and author files. No broad
rewrite was added: it could affect assets, the root URL, query strings, or
utility endpoints without deployment-specific validation. The proposed cutover
behavior is a bounded host rule that preserves `/`, assets and queries while
redirecting non-root page-directory trailing slashes to the established
no-slash canonicals. Activation and full English/Spanish/Arabic verification
remain part of the hosting gate.

### Canonical, Robots, Sitemap, Hreflang, and Schema Results

The indexing-enabled build produced 110 HTML files and 110 unique canonical
targets. Every local canonical used the public origin and normalized pathname;
the two syndicated pages retained their external canonicals. No redirect source
generated HTML or appeared in the sitemap. Numbered pages never canonicalized
to a root or another page.

The indexing-enabled sitemap contained exactly 97 unique local URLs. It
excluded all eight author archives, `/search`, redirect sources, drafts, both
external-canonical articles, invalid pages, and both Phase 6C page-6 gaps.
Ordinary and numbered Library pages were `index,follow`; author archives and
`/search` were `noindex,follow`; existing page-level noindex rules remained.

Hreflang remained 174 links across 53 routes. The three Library roots retained
their validated relationships; numbered Library pages, author archives,
`/search`, noindex/external-canonical routes, and redirect aliases emitted
none. Existing English `x-default` selection and all article/service
translation sets were unchanged. BlogPosting Person attribution, FAQPage
eligibility, titles, descriptions, H1 behavior, article dates, and syndicated
schema exclusions also remained unchanged.

The final normal build restored 110 pages with `noindex,nofollow`, an empty
sitemap, and zero hreflang links.

### Validation and Review

| Check | Result |
| --- | --- |
| `npm run check` | Passed: 90 Astro files; 0 errors, warnings, or hints |
| `npm run test:library` | Passed: 33 tests, including the exact nine-rule registry, synchronized artifacts, invalid redirect graphs, generated target/source validation, SEO exclusion, pagination, archives, and search |
| `npm run test:seo` | Passed sequentially: 34 tests |
| `npm run test:publication` | Passed sequentially: 33 tests |
| `npm run test:markdown` | Passed: 20 tests |
| `npm run test:routes` | Passed: 10 tests, including redirect-aware classification and reconciliation |
| Normal `npm run build` | Passed twice; 110 generated HTML routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed; 110 routes, 97 sitemap URLs, 174 hreflang links on 53 routes |
| Generated-output SEO inspection | Passed: 110 unique canonicals; all redirect, author, search, pagination, syndicated, sitemap, robots, and hreflang assertions |
| `npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-10-offline.json` | Passed with no network or writes |
| `npm run audit:links` | Passed: 0 broken internal links |
| `npm run audit:images` | Passed: 0 missing mapped page images |
| `npm run audit:blog` | Passed: 0 blog content audit failures |
| Isolated nginx HTTP verification | Passed: nine exact 301s, valid final targets, preserved query, distinct pages, expected 404 boundaries, valid config |
| Headless Chromium | Passed: eight representative desktop DOM loads and two 390×844 loads across Library, author, search, syndicated, English, Spanish, and Arabic routes |
| `git diff --check` | Passed after the final acceptance and handoff documentation updates |

An initial attempt to run the SEO and publication fixture suites concurrently
caused their temporary Astro content collections to cross-contaminate. That
parallel result was discarded. Running the established commands sequentially
passed all 34 and 33 tests without source changes. A first ad hoc generated-
output inspection requested unavailable Python `bs4`; the equivalent project-
dependency Cheerio inspection then passed. Browser checks establish page-load,
DOM metadata, language/direction, and responsive-viewport execution; they are
not a manual visual or screen-reader acceptance claim.

### Changed Files and Deferred Decisions

Modified files:

- `tools/generate-redirects.mjs` — approved aliases, structural validation,
  and deterministic artifact serializers.
- `src/data/redirects.json`, `reports/redirect-map.csv`, and
  `reports/nginx-rewrites.conf` — synchronized nine-rule outputs.
- `tools/audit-routes.mjs` — redirect-aware local inventory, dispositions,
  schema-2 evidence, and audit-tool fingerprinting.
- `tools/audit-routes.test.mjs` and `tools/library.test.mjs` — focused route,
  redirect, generated-output, and failure-mode regressions.
- `reports/seo-audit.md` — corrected current pagination/archive/search state
  while preserving the historical omission.
- `reports/migration-summary.md` — this dated implementation record.

New file:

- `reports/route-reconciliation-2026-10-10-offline.json` — schema-2,
  redirect-aware reconciliation based on saved evidence and current output.

`reports/SESSION_HANDOFF.md` was advanced only during the separately authorized
Phase 6B.4 acceptance/transition step. No content record, route generator,
publication policy, layout, component, dependency, Nix/nginx host configuration,
form, analytics, advertising, consent, employee portal, or deployment file
changed.

Manual review before checkpoint approval should cover the nine redirect source
and destination pairs in the generated reports; representative root/numbered
Library and author canonicals; `/search` noindex behavior; both page-6 404 gaps;
and the documented difference between repository rules and deployed-host
activation. A later hosting review must decide and test bounded no-slash
normalization. Phase 6C still supplies nine English articles. Phase 6B.5 still
owns the three accepted multilingual defects and human language review. Author
archive indexing, sitemap participation, and hreflang remain unapproved.

### Checkpoint Acceptance and Deferred Hosting Behavior (2026-10-10)

The user authorized the Phase 6B.4 checkpoint after reviewing the completed
implementation and automated evidence. This acceptance does not claim that the
user independently repeated every suggested manual URL check.

The user tested the existing staging URLs `/search`, `/library`,
`/library/page/2`, `/es/library`, and `/ar/library/author/rula-diab`; all five
redirected to trailing-slash URLs. The detailed `/search` observation was:

1. `https://aia.web3app.dev/search` returned HTTP 301 to
   `http://aia.web3app.dev/search/`.
2. `http://aia.web3app.dev/search/` returned HTTP 301 to
   `https://aia.web3app.dev/search/`.
3. The final HTTPS response returned HTTP 200.

This behavior is attributed to the temporary Docker/nginx static-serving and
reverse-proxy arrangement. The user explicitly deferred changes to that
environment. Phase 6B.4 accepts Astro's slashless canonical policy and the nine
validated repository redirect definitions. The observed redirect chain does
not block this checkpoint, but it is not accepted production behavior and is
not described as fixed.

Production configuration on the Contabo VPS must be separately implemented and
verified before cutover. It must serve canonical slashless HTML paths without
unnecessary redirects; avoid HTTPS-to-HTTP redirects; normalize trailing-slash
variants consistently with the accepted canonical policy; preserve query
strings and locale-specific destinations; avoid chains and loops; implement
the approved repository redirects; return appropriate 404 responses for
nonexistent routes; treat `/` as the root exception; and verify real HTTP
behavior rather than configuration syntax alone. Staging and production
indexing safeguards must remain in place until their separately approved
transitions. No nginx, Docker, NixOS, Contabo, Cloudflare, HubSpot, DNS, Astro
canonical, or deployment configuration changed during checkpoint preparation.

## Phase 6B.5 — Multilingual, RTL, Accessibility, and Performance Acceptance (2026-10-10)

### Scope, Source Review, and Reported Defects

Work began from checkpoint `8192ea71c47a7163b40a7fad144ebbd2523282d1` and was limited to visitor-language navigation, locale-aware shared navigation, Arabic footer bidi presentation, focused regressions, and acceptance evidence. No content, author biography, publication-policy, sitemap, canonical, redirect, dependency, or deployment change was made.

Bounded read-only inspection covered the published English, Spanish, and Arabic Rula Diab author roots and the Arabic Library root. The pages exposed the three author-locale roots and retained the source labels `Welcome to`, `All Post`, and `Popular Posts` in English on the Spanish and Arabic author presentations. These observations are useful presentation evidence, but HubSpot/CDN prerender freshness remains inconclusive. A later header-only verification attempt at `2026-10-11T02:03:14Z`–`02:03:15Z` could not complete certificate verification in the local curl environment and is not presented as independent origin evidence. No full production crawl or production write occurred.

The three accepted defects and demonstrated code causes were:

1. **Author language selector.** `LanguageSwitcher.astro` used only `publication.translations`. Author archives deliberately have no SEO translations while noindex, leaving an empty/nonworking selector. A native `details`/`summary` disclosure now receives a separately validated visitor-navigation model. Author roots use exact locale records and explicit author `translationKey` identity; numbered archives offer the other locale roots as clearly labeled section navigation rather than claiming page-number equivalence. Ordinary content still uses only the validated content translation graph. `/search` and untranslated articles receive no fabricated choices. This adds no author hreflang, sitemap entry, or indexability.
2. **Locale-aware shared navigation.** `MainNav.astro` explicitly selected English data for Arabic (`ar: en`), while the footer and header used fixed English destinations. A shared `visitor-navigation.ts` resolver now validates every internal destination against the eligible route manifest, prefers exact locale routes or explicit content translations, and marks deliberate cross-language fallbacks. Desktop, mobile, footer, logo, and Tour destinations share that policy. The unpublished `/ar` placeholder remains absent: the visible Arabic Home item and logo explicitly fall back to the published English `/` route. From `/ar/library/author/rula-diab`, Library now resolves to `/ar/library`; Spanish and English resolve to their corresponding roots. No locale prefix is guessed.
3. **Arabic footer bidi presentation.** Mixed Latin phone, email, and postal-address strings inherited the page RTL direction. Narrow `bdi`/`dir="ltr"` boundaries and scoped `direction`, `text-align`, and `unicode-bidi: isolate` rules now protect those values while the footer remains RTL. Existing contact values, obfuscation scripts, `tel:`/`mailto:` behavior, icons, and reversed-text no-JavaScript fallbacks remain intact.

### Visitor Navigation and Language Matrix

| Source context | English destination | Spanish destination | Arabic destination | Classification |
| --- | --- | --- | --- | --- |
| Rula Diab author root | `/library/author/rula-diab` | `/es/library/author/rula-diab` | `/ar/library/author/rula-diab` | Exact validated author equivalents for visitor navigation; still no SEO hreflang |
| Numbered Rula Diab archive | English author root | Spanish author root | Arabic author root | Section-root navigation; page numbers are not translation equivalents |
| Numbered Library page | `/library` | `/es/library` | `/ar/library` | Section-root navigation; no numbered-page hreflang |
| Current-language Library menu | `/library` | `/es/library` | `/ar/library` | Exact eligible locale destination |
| Spanish translated service/menu item | Validated English route | Validated `/es/...` route | Published Arabic equivalent when one exists; otherwise labeled source-language fallback | Exact translation or explicit fallback |
| Arabic Home/logo | `/` | not applicable in Arabic context | `/` labeled as an English fallback because `/ar` is unpublished | Explicit fallback; no `/ar` route fabricated |
| Untranslated article | No unrelated language choices | No unrelated language choices | No unrelated language choices | Language indicator remains static and honest |
| `/search` | `/search` only | language filtering inside `/search` | language filtering inside `/search` | No page-equivalence menu or hreflang invented |

Fallback annotations expose the destination language through visible text, `hreflang`, and accessible labels without incorrectly marking the localized link label itself as another language. External payment-provider links remain intentional external destinations.

### Accessibility, Localization, RTL, and Progressive Enhancement

The selector now uses native disclosure behavior, actual anchors, a localized accessible name, current-language state, 44-pixel minimum trigger height, visible focus styles, Escape-to-close enhancement, logical positioning, and RTL-aware menu placement. It remains usable without JavaScript. Mobile navigation also uses native disclosure behavior, localized Menu labels, visible focus, and Escape-to-close enhancement. The skip link is localized for English, Spanish, and Arabic.

Generated-output checks verified published destinations for all internal desktop, mobile, footer, and language links; `lang="ar"`/`dir="rtl"` on Arabic pages; no `/ar` link; three isolated Arabic contact values; no listbox misuse; no empty interactive language trigger; and static navigation without JavaScript. Existing Library cards, pagination, search result focus/status code, fragment history, accent/Arabic normalization, full-locale search, and legacy query behavior remain covered by the Library suite. Date rendering continues to use the record locale and UTC, with machine-readable `datetime` values, so calendar dates do not shift by host timezone.

No local Chromium/Playwright/Puppeteer executable or package and no screen reader were available. Consequently, this phase does not claim new browser screenshots, touch testing, visual overflow inspection, assistive-technology speech output, or manual screen-reader acceptance. Generated HTML, CSS, component source, semantic DOM assertions, focus styles, no-JavaScript structure, and existing regression fixtures were used instead. The user should still inspect desktop and 390×844 layouts and complete fluent Spanish/Arabic and screen-reader review before cutover.

The source-published author labels `Welcome to`, `All Post`, and `Popular Posts` were retained in English in all locales rather than inventing translations. Spanish/Arabic fallback notices, the Arabic menu label, skip link, language label, and section-root explanation use straightforward operational wording and remain flagged for human language review. Author biographies, credentials, article bodies, Team records, and marketing claims were untouched.

### Performance and Privacy Evidence

The static search architecture remains dependency-free and local. Final generated assets measured:

| Asset | Records | Raw bytes | Gzip bytes | Brotli bytes |
| --- | ---: | ---: | ---: | ---: |
| English JSON index | 46 | 28,003 | 7,973 | 6,632 |
| Spanish JSON index | 12 | 10,170 | 3,427 | 2,969 |
| Arabic JSON index | 7 | 6,234 | 1,982 | 1,625 |
| **Index total** | **65** | **44,407** | **13,382** | **11,226** |
| Shared Library search client | — | 6,539 | 2,651 | 2,312 |

Representative raw/gzip HTML sizes were: English Library 49,001/9,642; Spanish Library 50,910/9,847; Arabic Library 43,494/9,209; English author root 49,687/9,216; Spanish author root 52,973/9,697; Arabic author root 47,119/9,155; and `/search` 19,158/5,182 bytes.

Source and regression inspection confirm that embedded search returns before `fetch` for an empty query and requests only its one locale index on the first real search. `/search` requests one selected locale or the three indexes only when `all` is explicitly selected. Navigation changes add no preload, search request, query transmission, analytics, cookie, external provider, or article-body/private-data exposure. No executable browser was available for a network-panel trace, so request behavior is source- and regression-verified rather than presented as browser-observed.

### Publication Invariants and Validation

The indexing-enabled build remained at 110 HTML routes, including eight author archives; 97 sitemap URLs; 174 hreflang links across 53 routes; 65 Library records; three locale JSON indexes; and nine repository redirects. Its robots distribution was 97 `index,follow` and 13 intentional `noindex,follow`. Author archives remained self-canonical, noindex, sitemap-excluded, and hreflang-excluded. The search route, syndicated exceptions, BlogPosting Person identity, FAQPage rules, Library pagination, external canonicals, and explicit translation graph were unchanged. Neither `/ar` nor either Phase 6C page-6 route was generated.

The final normal build restored all 110 HTML pages to `noindex,nofollow`, an empty sitemap, and zero hreflang links.

| Check | Result |
| --- | --- |
| `npm run check` | Passed: 91 Astro files; zero diagnostics |
| `npm run test:library` | Passed sequentially: 37 tests |
| `npm run test:seo` | Passed sequentially: 34 tests |
| `npm run test:publication` | Passed sequentially: 33 tests |
| `npm run test:markdown` | Passed: 20 tests |
| `npm run test:routes` | Passed: 10 tests |
| Normal `npm run build` | Passed twice; final artifact is the normal staging build with 110 routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed; 110 routes, 97 sitemap URLs, 174 hreflang links across 53 routes |
| `npm run audit:links` | Passed after final build: zero broken internal links |
| `npm run audit:images` | Passed after final build: zero missing mapped page images |
| `npm run audit:blog` | Passed after final build: zero failures |
| Offline route reconciliation | Final `route-reconciliation-2026-10-11-offline-03-01-25-775Z.json` generated after the address refinement from the 70 saved requests with no network access; explicit consistency check passed for 133 dispositions, 110 generated routes, and nine redirects |
| Generated-output and payload inspection | Passed for language/direction, navigation destinations, disclosure semantics, footer isolation, robots, sitemap, hreflang, index counts, and asset sizes |
| `git diff --check` | Passed before documentation; repeated in the final structural review |

One attempted concurrent Library/publication run produced the known shared-fixture interference (118 transient routes and missing fixture output). That result was discarded. Both suites passed independently and sequentially without an application-code correction. The inherited shell `TMPDIR` pointed at an inaccessible prior Nix temporary directory, so fixture commands used `TMPDIR=/tmp`; this was an environment correction, not a project change.

### Files, Boundaries, and Remaining Review

Modified implementation and test files:

- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/LanguageSwitcher.astro`
- `src/components/MainNav.astro`
- `src/components/MobileNav.astro`
- `src/layouts/BaseLayout.astro`
- `src/utils/authors.ts`
- `tools/library.test.mjs`
- `tools/publication.test.mjs`

New implementation/evidence files:

- `src/utils/visitor-navigation.ts`
- `reports/route-reconciliation-2026-10-11-offline-03-01-25-775Z.json`

Documentation updated in this phase:

- `reports/accessibility-audit.md`
- `reports/migration-summary.md`

The living `reports/SESSION_HANDOFF.md` was deliberately not advanced before acceptance. No author/content record, biography, publication rule, sitemap rule, canonical, redirect, dependency, form, analytics, advertising, consent, employee portal, hosting, or deployment file changed.

Manual acceptance should cover the three author roots and their language disclosure; a numbered English and Spanish author page returning to locale roots; English/Spanish/Arabic Library navigation; the Arabic Home fallback; desktop/mobile/footer destinations and fallback labels; Arabic footer phone, email, address, and activation with JavaScript enabled/disabled; keyboard and Escape behavior for both disclosures; skip-link focus; embedded and legacy search states/history/status; first/final pagination pages; Arabic RTL wrapping and horizontal overflow at desktop and approximately 390×844; and representative localized dates.

Remaining work includes fluent Spanish and Arabic review of operational wording and biographies; organizational review of author credentials/claims where required; manual screen-reader and browser/touch acceptance; the nine Phase 6C English articles and both page-6 cutover gaps; the deferred author-archive indexing, sitemap, and hreflang decision; and separate Contabo/nginx activation and validation of slashless canonical serving, approved redirects, HTTPS behavior, query preservation, and 404 handling. No hosting rule was activated.

### Final Footer Address Refinement (2026-10-10)

Following manual acceptance of the Phase 6B.5 browser checklist, the shared `site.address` value was changed from one string to `line1` and `line2` fields. The footer now renders `8901 E Raintree Dr Ste 160,` and `Scottsdale, AZ 85260` on two intentional lines with an explicit `<br>` inside an LTR `<bdi>`. English, Spanish, and Arabic generated footers use the same punctuation and line structure; the surrounding Arabic footer remains RTL, and existing phone/email isolation is unchanged. The only runtime `site.address` consumer was `Footer.astro`. Organization JSON-LD already used separate `PostalAddress` properties and remains semantically unchanged. The historical Phase 5C source-evidence address was inspected but appropriately left unchanged.

The user's contact-page observation was made with JavaScript disabled through uBlock Origin. The reversed phone and email strings are the intentional static `ContactObfuscation` fallbacks. The English and Spanish contact-page MDX records and `ContactObfuscation.astro` were therefore left unchanged. A generated-page JavaScript execution harness ran all six contact/footer obfuscation scripts on the English contact page and recovered the expected `tel:+14806877099`, `tel:+16027080429`, and `mailto:info@azinstitute4autism.com` links and visible values; this is a local script/DOM-harness regression, not a new screen-reader claim.

Focused generated-output assertions passed for one English, one Spanish, and one Arabic route, including exact two-line text, one explicit break, nested LTR direction, and preserved navigation. Sequential validation passed with 91 Astro files and zero diagnostics; 37 Library, 34 SEO, 33 publication, 20 Markdown, and 10 route tests; normal and indexing-enabled builds; and clean link, image, and blog audits. The indexing build retained 110 HTML routes, eight author archives, 97 sitemap URLs, and 174 hreflang links across 53 routes. The final normal build restored all 110 pages to `noindex,nofollow`, with an empty sitemap and no hreflang. Because the source fingerprint changed, `route-reconciliation-2026-10-11-offline-03-01-25-775Z.json` was created from the existing 70 saved requests without network access, and its explicit consistency check passed. No prior evidence file was overwritten.

### Manual Acceptance and Checkpoint Disposition (2026-10-10)

The user completed and accepted the full Phase 6B.5 browser checklist, including English, Spanish, and Arabic navigation; author-root language disclosure; desktop and mobile layouts; Arabic RTL presentation; keyboard focus; search behavior; and the final two-line footer address. This manual acceptance is separate from the automated and generated-output evidence above. No real screen-reader session was performed or claimed.

The final source-matching reconciliation artifact is `route-reconciliation-2026-10-11-offline-03-01-25-775Z.json` (source fingerprint `639a8bcdf9f710fa1444393ce7eab9588a93144ed3045d4a2d758734a9fe530c`). The earlier `route-reconciliation-2026-10-11-offline.json` records the intermediate pre-address source fingerprint and is superseded checkpoint evidence; it remains an excluded local untracked file rather than being deleted or committed.

Outstanding pre-cutover review remains limited to a real screen-reader session; fluent Spanish and Arabic review of operational copy and author biographies; organizational approval of public author credentials, role, and biography claims where required; the deferred author-archive indexing, sitemap, and hreflang decisions; Contabo/nginx slashless serving, HTTPS, redirect, query, and 404 verification; and the nine Phase 6C English articles needed for both page-6 routes. No deployment or cutover was authorized.
