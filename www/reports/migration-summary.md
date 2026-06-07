# Migration Summary

## Status

The Astro migration foundation is implemented with repeatable extraction,
content collections, multilingual routes, reusable components, self-hosted
assets, static forms, SEO metadata, and link/report tooling.

## Migrated Content and Assets

- 96 canonical mirrored records were extracted.
- 46 English, 12 Spanish, and 7 Arabic library posts were migrated.
- 31 mirrored core/language pages plus one clearly marked Arabic landing-page
  placeholder were created.
- 171 self-hosted source files were copied, including canonical and deduplicated
  responsive images, SVGs, local fonts, and two PDF downloads.

## Source Scope

- Raw mirror: `../../www.azinstitute4autism.com`
- Mirror files inspected: 876
- Canonical pages and posts are extracted from clean `.html` files.
- HubSpot query-language duplicates, AMP files, pagination, and author archive
  variants are intentionally excluded from generated routes.

## Preserved URLs

Actual clean mirror URLs are preserved, including `/aba-therapy`,
`/autism-evaluations`, `/learner-social-club`, `/client-consultation`,
`/library`, and clean `/library/post-slug` paths. Brief aliases are documented
as redirects.

## Forms

Visible consultation/contact-style pages render a static form. It has no
backend, contains production TODO comments, and clearly tells users to call.

## Multilingual

Existing Spanish pages/posts and Arabic posts are extracted into language
collections. Arabic routes render with `lang="ar"` and `dir="rtl"`. No large
translations were invented.

## Likes and Views

The library post template includes a resilient counter component using
`PUBLIC_AIA_API_BASE`, defaulting to `https://api.azinstitute4autism.com`.
Failures display neutral fallback values and do not affect builds.

## Unresolved

- Extracted content needs editorial review for HubSpot artifacts and heading hierarchy.
- Forms require a backend and spam protection.
- API endpoint contract for likes/views requires production verification.
- Live-site comparison may be limited by sandbox network certificate behavior.
- Visual comparison and browser testing are required before production launch.
- Deployment-specific redirects are intentionally limited to nginx output.
- The mirror references `AIALanding_BG_V2.jpg` and `hero-library-index.webp`
  remotely but does not contain those files; missing featured-image references
  are omitted rather than retained as external production dependencies.

## Validation Results

- `npm install`: attempted with the repository Nix shell and an existing
  Nix-store Node/npm runtime. Blocked because the autonomous sandbox network
  proxy cannot verify the npm registry certificate
  (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`).
- `npm run build`: attempted; blocked because Astro could not be installed.
- `npm run audit:links`: source-level audit runs and documents that rendered
  output is unavailable until the build succeeds.
- Tool syntax: all `.mjs` migration tools pass `node --check`.
- Asset references: no missing local asset references remain in extracted
  Markdown content.
- Live crawl: attempted; blocked by the sandbox network certificate behavior.
