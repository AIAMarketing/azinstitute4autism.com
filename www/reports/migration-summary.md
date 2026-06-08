# Migration Summary

## Status

A maintainable Astro migration and substantial fidelity-first pass are
implemented. The live public site, not the wget mirror, was used as the
authority for the shared shell, English and Spanish homepages, service-page
family, team page, library indexes, and blog-post family.

## Migrated Content and Assets

- 46 English, 12 Spanish, and 7 Arabic library posts.
- 21 English, 9 Spanish, and 2 Arabic page records.
- One author record per language.
- 167 self-hosted images, 20 font files, and two PDF downloads.
- Current June and May 2026 English library articles are included.

The raw mirror remains untouched. HubSpot-generated wrappers, analytics,
scripts, CSS, query-language duplicates, AMP variants, pagination, and author
archive variants are not carried into the Astro implementation.

## Live-Source Fidelity Pass

Live pages inspected during the pass include:

- English and Spanish homepages
- ABA Therapy, Autism Evaluations, and Learner Social Club
- About, Team, and Client Consultation
- English and Arabic Library indexes
- Representative current library articles

Implemented fidelity work includes:

- Rebuilt the live two-tier header, navigation hierarchy, language controls,
  utility links, footer columns, and contact information.
- Rebuilt the complete English and Spanish homepages in their live section
  order using one reusable Astro component and self-hosted source assets.
- Rebuilt service pages around the live compact title banner and editorial
  presentation, with current visible headings and working calls to action.
- Recovered and restored the live decorative hero imagery for all mapped
  English and Spanish page routes plus every language's library index.
- Restored the consultation form section's injected background image.
- Added a dedicated live-derived team card grid rather than presenting the
  extracted team content as a generic article.
- Rebuilt library indexes and blog-post presentation around the live sidebar,
  article list, byline, featured-image, and counter patterns.
- Converted FAQ-bearing posts to MDX and recreated their live-style accordions
  with a reusable component that emits matching `FAQPage` JSON-LD.
- Replaced generic oversized cards, rounded controls, and marketing heroes
  with live-derived typography, palette, widths, spacing, and compact controls.
- Corrected material live/mirror discrepancies found during the pass,
  including current homepage ESA copy, testimonial content, and ABA copy.

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
- Library-index canonicals and current visible page H1s are explicitly set.
- Extracted image alt text is retained where available.
- Semantic landmarks, skip link, labeled forms, keyboard-operable navigation,
  language/direction attributes, and responsive layouts are present.

## Validation Results

- `npm install --ignore-scripts`: completed; 323 packages audited with one
  moderate advisory. The current shell uses Node `20.17.0`, below the declared
  `>=20.19.0`; `flake.nix` now selects Node 22.
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
- The Astro compiler parsed all 33 `.astro` files successfully.
- `npm run build`: blocked before compilation because this autonomous sandbox
  denies `/etc/hosts`, causing `getaddrinfo EAI_AGAIN localhost`.
- `npm run build:sandbox`: bypasses that DNS lookup and reaches Vite, then the
  sandbox rejects esbuild's required child process with `spawn EPERM`.
- Nix shell verification and `npm audit` retrieval were blocked by sandbox
  proxy/cache network resets.

Run `npm run build` outside the Codex sandbox with Node 20.19+ or Node 22 for
final production-build proof.

## Manual Review

- Perform full-page desktop and mobile visual comparisons for page-specific
  layouts beyond the completed homepage, team, service, library, and article
  families.
- Editorially review extracted long-form content for remaining mirror artifacts,
  stale phone/email references, and heading hierarchy.
- Review all source alt text, keyboard behavior, screen-reader output, and
  contrast with accessibility tooling.
- Have fluent reviewers approve Spanish content and Arabic RTL presentation.
- Select and connect a form backend with spam protection before launch.
- Validate like/view CORS, credentials, and production behavior after deployment.
