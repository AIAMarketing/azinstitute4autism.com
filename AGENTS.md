# AGENTS.md

## Instruction precedence

This file is the authoritative project policy for all editors and AI agents.
`MIGRATION_BRIEF.md` supplies detailed implementation guidance and must be read
with this file. If the two files appear to conflict, follow `AGENTS.md` and
update the conflicting documentation before continuing.

The `migration-foundation` branch is a reference and recovery point only. It is
not the visual or architectural source of truth. Reuse its nonvisual tooling or
content only after verifying it against the live public site.

## Project

New Astro site target:

```txt
./www
```

The live public website is the single source of truth:

```txt
https://www.azinstitute4autism.com
```

Verify content, design, URLs, metadata, assets, and responsive behavior against
the live public site before treating them as authoritative.

## Primary goal

Create a clean, maintainable Astro + TypeScript site in `./www` that faithfully
reproduces the current public site's content, visual design, page structure, and
responsive behavior while replacing HubSpot-generated implementation details
with a future-friendly static site architecture.

This is a fidelity-first migration, not a redesign. The live public site is the
source of truth for both content and presentation. Maintainability must improve
the implementation without materially changing what visitors see.

The new site should be suitable for:

- static hosting
- file-based editing
- Front Matter CMS in VS Code
- future blog posting
- future Spanish and Arabic publishing
- future Netlify, nginx, Cloudflare Pages, or Vercel deployment

## Stack

Use:

- Astro
- TypeScript
- npm
- Markdown-first content
- MDX only when embedded Astro/React-style components are genuinely needed
- Astro content collections
- Zod frontmatter validation
- plain CSS with design tokens
- Astro image optimization where appropriate

Do not use:

- Tailwind
- a database
- a headless CMS
- HubSpot APIs
- HubSpot CLI
- HubSpot-hosted production assets unless unavoidable
- a form backend
- deployment-specific config unless explicitly requested

## Content strategy

Use file-based Markdown as the default content format.

Use `.md` for:

- normal blog posts
- normal service pages
- informational pages
- author profiles

Use `.mdx` only for pages or posts that need embedded components.

The content should be structured to work well with Front Matter CMS in VS Code.

Use these content folders:

```txt
src/content/pages/en
src/content/pages/ar
src/content/pages/es
src/content/blog/en
src/content/blog/ar
src/content/blog/es
src/content/authors/en
src/content/authors/ar
src/content/authors/es
```

## Multilingual requirements

Support:

- English
- Arabic
- Spanish

English is the default language.

URL patterns:

```txt
English:
/
/aba
/autismevaluations
/library/post-slug

Arabic:
/ar
/ar/aba
/ar/autismevaluations
/ar/library/post-slug

Spanish:
/es
/es/aba
/es/autismevaluations
/es/library/post-slug
```

Arabic pages must use:

```html
<html lang="ar" dir="rtl">
```

English pages must use:

```html
<html lang="en" dir="ltr">
```

Spanish pages must use:

```html
<html lang="es" dir="ltr">
```

Add RTL CSS support for Arabic.

Do not invent large Arabic or Spanish translations unless source content is available. Use clearly marked placeholders when needed.

## Design rules

The new site must remain visually faithful to the live public site. Do not
reinterpret, modernize, simplify, or genericize the design unless a specific
change is required for accessibility or reliable responsive behavior.

Preserve each source page's:

- section order and visible content
- typography, font weights, and text hierarchy
- colors, backgrounds, and decorative treatments
- container widths, spacing, alignment, and proportions
- imagery, crops, icons, borders, radii, and shadows
- header, navigation, footer, calls to action, and forms
- desktop and mobile responsive behavior

Reuse exact source assets and locally available fonts wherever practical.
Do not replace distinctive source sections with generic cards, generic heroes,
or a new site-wide layout merely to make component reuse easier.

Use plain CSS with design tokens.

Create reusable Astro components for repeated layout sections.

Component boundaries must follow genuinely repeated source patterns. Distinctive
pages and sections may retain page-specific markup and CSS when abstraction
would reduce fidelity. Do not copy HubSpot's generated DOM or CSS wholesale.

Favor:

- semantic HTML
- reusable components
- organized CSS
- clear data files
- source-faithful spacing
- accessible markup
- predictable file structure

### Visual validation

Before implementing a page family or shared component:

1. Inspect the live page and its HTML, CSS, assets, and responsive behavior.
2. Resolve any discrepancy in favor of the live public site.
3. Record the source structure and important visual details.
4. Identify which patterns are truly shared and which are page-specific.

After implementation, compare the Astro output with the live public site at
representative desktop and mobile viewport widths. Check the full page, not
only the header or first viewport. Fix material differences before treating the
page as complete.

Document intentional visual deviations and their reasons in:

```txt
reports/migration-summary.md
```

## URL and SEO rules

Preserve existing public URL paths whenever possible.

Preserve or document:

- page title
- meta description
- canonical URL
- Open Graph tags
- Twitter card tags
- JSON-LD/schema
- H1
- image alt text
- internal links

Generate nginx rewrite rules only for paths that must change.

Do not create unnecessary redirects for paths that are preserved.

## Assets

Self-host assets wherever practical.

Extract and organize:

- images
- SVGs
- icons
- fonts
- PDFs
- media files
- downloads

Use:

```txt
public/assets/images
public/assets/fonts
public/assets/media
public/assets/downloads
src/assets/images
```

Use `public/assets` for content/frontmatter references.

Use `src/assets` for images imported into Astro components and optimized by Astro.

Document any remaining external asset dependencies.

## Forms

Recreate visible forms as styled static HTML.

Do not implement backend submission.

Every form must include TODO comments, for example:

```html
<!-- TODO: Wire this form to Netlify Forms, a custom API endpoint, or another backend service. -->
<!-- TODO: Add spam protection before production launch. -->
```

## Likes and views

Preserve the AIA like/view counter conceptually.

Use this API base URL as the default:

```txt
https://api.azinstitute4autism.com
```

Do not hardcode it throughout the app.

Use:

```txt
PUBLIC_AIA_API_BASE=https://api.azinstitute4autism.com
```

Add it to `.env.example`.

The component must degrade gracefully when the API is unavailable.

## Validation

After meaningful changes, run:

```sh
npm run build
```

When available, also run:

```sh
npm run audit:links
```

If a command fails, diagnose and fix it when practical.

If it cannot be fixed, document the issue in:

```txt
reports/migration-summary.md
```

## Required reports

Create:

```txt
reports/url-inventory.csv
reports/asset-inventory.csv
reports/seo-audit.md
reports/accessibility-audit.md
reports/broken-links.md
reports/cleanup-log.md
reports/redirect-map.csv
reports/nginx-rewrites.conf
reports/migration-summary.md
```

## Working style

Before large filesystem changes:

1. Inspect the live public site.
2. Inspect the relevant source HTML, CSS, and assets in detail.
3. Summarize the implementation and visual-validation plan.
4. Proceed methodically.

At the end of a task, summarize:

- what changed
- what works
- what needs manual review
- build results
- audit results
- unresolved issues

Prioritize visual fidelity and content correctness while implementing them with
clean, maintainable Astro code. Do not trade away visible source design for a
generic foundation, and do not copy HubSpot-generated implementation merely to
obtain fidelity.
