# AGENTS.md

## Project

This repository contains a mirrored copy of the Arizona Institute for Autism website.

Raw mirror source:

```txt
./www.azinstitute4autism.com
```

New Astro site target:

```txt
./www
```

The mirror was created with:

```sh
wget --mirror --page-requisites --adjust-extension --convert-links --no-parent https://www.azinstitute4autism.com
```

Do not modify, move, rename, or delete `./www.azinstitute4autism.com`.

Treat the mirror as read-only raw source material.

## Primary goal

Create a clean, maintainable Astro + TypeScript site in `./www` that reproduces the current public site as faithfully as practical while replacing HubSpot-generated structure with a future-friendly static site architecture.

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

The new design should be mostly faithful to the current site while becoming more maintainable.

Use plain CSS with design tokens.

Create reusable Astro components for repeated layout sections.

Do not create a messy page-by-page clone of HubSpot output.

Favor:

- semantic HTML
- reusable components
- organized CSS
- clear data files
- consistent spacing
- accessible markup
- predictable file structure

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

1. Inspect the mirror.
2. Summarize the implementation plan.
3. Proceed methodically.

At the end of a task, summarize:

- what changed
- what works
- what needs manual review
- build results
- audit results
- unresolved issues

Prioritize a clean, maintainable foundation over a pixel-perfect but messy clone.