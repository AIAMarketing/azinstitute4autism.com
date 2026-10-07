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

The generated sitemap contains 97 canonical URLs. Nginx rewrites exist only
for the brief aliases `/aba`, `/autismevaluations`, and `/learnersocialclub`.

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
