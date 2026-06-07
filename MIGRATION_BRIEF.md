# MIGRATION_BRIEF.md

## Task

Migrate the public Arizona Institute for Autism website from a mirrored HubSpot-generated static copy into a clean, maintainable Astro + TypeScript site.

Raw mirrored source:

```txt
./www.azinstitute4autism.com
```

New Astro project target:

```txt
./www
```

The raw mirror was created with:

```sh
wget --mirror --page-requisites --adjust-extension --convert-links --no-parent https://www.azinstitute4autism.com
```

There is no HubSpot export, no HubSpot CLI access, and no HubSpot API access.

Use the local mirror as the primary source.

If internet access is available, also crawl the live public website to catch missing URLs or assets:

```txt
https://www.azinstitute4autism.com
```

The live crawl is only for comparison and gap-filling. The local mirror remains the source of truth.

## High-level goal

Create a new Astro site in `./www` that is:

- Astro-based
- TypeScript-based
- static-hosting friendly
- Markdown-first
- MDX-enabled only when needed
- Front Matter CMS friendly
- multilingual for English, Arabic, and Spanish
- self-hosted for media and assets wherever practical
- SEO-conscious
- accessible
- maintainable
- mostly faithful to the current design
- free of unnecessary HubSpot-generated structure
- prepared for future development and publishing

## Important constraints

Do not modify or delete:

```txt
./www.azinstitute4autism.com
```

Do not depend on:

- HubSpot CLI
- HubSpot API
- HubSpot export files
- a database
- a form backend
- a headless CMS
- Tailwind

Do not hardcode environment-specific deployment assumptions.

Hosting is undecided.

Possible future hosts include:

- Netlify
- nginx
- Cloudflare Pages
- Vercel
- another static host

Use `npm`, not pnpm or yarn.

Use plain CSS with design tokens.

Use Astro image optimization where useful.

Generate nginx rewrite rules for changed URLs.

## Current known requirements

### URL preservation

Preserve existing URL structure exactly whenever possible.

Important paths include:

```txt
/
/aba
/autismevaluations
/learnersocialclub
/client-consultation
/library
/library/post-slug
```

If a URL must change, document it and generate an nginx rewrite.

Do not generate redirects for URLs that remain unchanged.

### Content format

Use file-based Markdown as the default content format.

Use `.md` for most pages and blog posts.

Use `.mdx` only when embedded Astro/React-style components are genuinely needed.

### Front Matter CMS

The content structure should work well with the Front Matter CMS VS Code extension.

Create a `frontmatter.json` file at the Astro project root.

### Forms

Recreate visible forms as styled static HTML.

Do not implement backend submission.

Each form must include TODO comments.

Example:

```html
<form class="form" method="post" action="">
  <!-- TODO: Wire this form to Netlify Forms, a custom API endpoint, or another backend service. -->
  <!-- TODO: Add spam protection before production launch. -->
</form>
```

If original HubSpot form fields cannot be fully recovered, create a reasonable static approximation and document the uncertainty.

### Likes and views

Preserve the like/view counter conceptually.

Known production API base:

```txt
https://api.azinstitute4autism.com
```

Use environment configuration:

```txt
PUBLIC_AIA_API_BASE=https://api.azinstitute4autism.com
```

Add this to `.env.example`.

Do not make the build fail if the API is unavailable.

The like/view feature should degrade gracefully.

### Multilingual

Support:

- English
- Arabic
- Spanish

English is the default.

Use these URL patterns:

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

Arabic pages must use RTL layout.

Arabic HTML:

```html
<html lang="ar" dir="rtl">
```

English HTML:

```html
<html lang="en" dir="ltr">
```

Spanish HTML:

```html
<html lang="es" dir="ltr">
```

Add:

```txt
src/styles/rtl.css
```

If Arabic or Spanish source content is missing, create minimal placeholder content only where needed to demonstrate the structure.

Mark placeholders clearly:

```md
<!-- TODO: Replace this placeholder with reviewed Arabic/Spanish content. -->
```

Do not invent extensive translations.

### Design direction

The new site should be more maintainable while remaining mostly faithful to the current design.

Do not create a messy clone of HubSpot output.

Refactor repeated sections into reusable components.

Use semantic markup.

Use plain CSS with design tokens.

Do not use Tailwind.

## Required target structure

Create this project structure in `./www`:

```txt
www/
  README.md
  package.json
  astro.config.mjs
  tsconfig.json
  .env.example
  frontmatter.json

  public/
    assets/
      images/
      fonts/
      media/
      downloads/
    robots.txt
    sitemap.xml

  src/
    assets/
      images/

    components/
      Header.astro
      Footer.astro
      MainNav.astro
      MobileNav.astro
      LanguageSwitcher.astro
      Hero.astro
      ServiceCard.astro
      BlogCard.astro
      ConsultationCTA.astro
      InsuranceStrip.astro
      LocationCard.astro
      FAQAccordion.astro
      LikeViewCounter.astro
      Seo.astro
      FormShell.astro

    content/
      config.ts

      pages/
        en/
        ar/
        es/

      blog/
        en/
        ar/
        es/

      authors/
        en/
        ar/
        es/

    data/
      navigation.en.json
      navigation.ar.json
      navigation.es.json
      site.json
      redirects.json
      services.json

    layouts/
      BaseLayout.astro
      PageLayout.astro
      BlogPostLayout.astro
      BlogIndexLayout.astro

    pages/
      index.astro
      aba.astro
      autismevaluations.astro
      learnersocialclub.astro
      client-consultation.astro

      ar/
        index.astro
        [...slug].astro

      es/
        index.astro
        [...slug].astro

      library/
        index.astro
        [slug].astro
        page/
          [page].astro

    scripts/
      forms.ts
      navigation.ts
      likes-views.ts

    styles/
      global.css
      variables.css
      typography.css
      layout.css
      components.css
      forms.css
      blog.css
      rtl.css

  tools/
    extract-site.mjs
    crawl-live-site.mjs
    audit-links.mjs
    generate-redirects.mjs
    generate-sitemap.mjs

  original/
    README.md

  reports/
    url-inventory.csv
    asset-inventory.csv
    seo-audit.md
    accessibility-audit.md
    broken-links.md
    cleanup-log.md
    redirect-map.csv
    nginx-rewrites.conf
    migration-summary.md
```

The `original/README.md` file should explain that the raw source mirror lives outside the Astro project at:

```txt
../www.azinstitute4autism.com
```

Do not duplicate the entire raw mirror inside `./www` unless there is a specific reason.

## Initial inspection

Before creating or modifying files, inspect the mirror.

Look for:

- all HTML files
- URL paths
- CSS files
- JS files
- image assets
- SVGs
- fonts
- PDFs
- media files
- blog posts
- blog listing pages
- blog pagination
- author pages
- Arabic pages
- Spanish pages
- sitemap files
- robots.txt
- canonical tags
- Open Graph metadata
- schema/JSON-LD
- forms
- navigation
- footer links
- HubSpot-specific scripts
- analytics/pixel scripts
- like/view counter code
- broken or rewritten local links
- asset references still pointing to remote hosts

Create an initial implementation plan after inspection.

## Astro setup

Create or scaffold the Astro project in:

```txt
./www
```

Use:

```sh
npm create astro@latest www
```

Adjust as needed.

Install and configure only useful dependencies.

Likely useful dependencies:

```txt
astro
@astrojs/mdx
@astrojs/sitemap
typescript
zod
cheerio
fast-glob
gray-matter
turndown
```

Use judgment.

Avoid unnecessary framework bloat.

The final project should support:

- Astro
- TypeScript
- Markdown content collections
- MDX integration
- sitemap generation
- image optimization
- plain CSS imports
- Front Matter CMS editing

## Content collections

Create:

```txt
src/content/config.ts
```

Define collections for:

- pages
- blog
- authors

Use Zod schemas.

### Blog schema

Recommended fields:

```ts
title: string
description: string
slug: string
date: Date
updatedDate?: Date
author: string
category?: string
tags?: string[]
featuredImage?: string
alt?: string
canonical?: string
draft?: boolean
lang: 'en' | 'ar' | 'es'
translationKey?: string
```

### Page schema

Recommended fields:

```ts
title: string
description: string
slug: string
canonical?: string
featuredImage?: string
alt?: string
lang: 'en' | 'ar' | 'es'
translationKey?: string
draft?: boolean
```

### Author schema

Recommended fields:

```ts
name: string
slug: string
description?: string
avatar?: string
lang: 'en' | 'ar' | 'es'
translationKey?: string
```

### Example blog post

```md
---
title: "ABA Prompting: A Parent-Friendly Guide"
description: "Learn how ABA prompting helps children build independence through clear support and gradual fading."
slug: "aba-prompting"
date: "2026-05-29"
author: "aia"
category: "ABA Therapy"
tags:
  - ABA therapy
  - autism parenting
featuredImage: "/assets/images/blog/aba-prompting.webp"
alt: "Parent helping a child practice brushing teeth with gentle hand support"
canonical: "https://www.azinstitute4autism.com/library/aba-prompting"
draft: false
lang: "en"
translationKey: "aba-prompting"
---

Article content goes here.
```

## Front Matter CMS configuration

Create:

```txt
frontmatter.json
```

Configure it for the VS Code Front Matter CMS extension.

Register these content folders:

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

Configure content types:

- page
- blog
- author

Use field names aligned with Astro content schemas.

Useful fields:

- title
- description
- slug
- date
- updatedDate
- author
- category
- tags
- featuredImage
- alt
- canonical
- draft
- lang
- translationKey

Choice fields:

```txt
lang: en, ar, es
draft: true, false
```

Make images selectable from:

```txt
public/assets/images
src/assets/images
```

## Design system

Create:

```txt
src/styles/variables.css
src/styles/typography.css
src/styles/layout.css
src/styles/components.css
src/styles/forms.css
src/styles/blog.css
src/styles/rtl.css
src/styles/global.css
```

Infer the current site’s visual language from the mirrored CSS and HTML.

Use design tokens such as:

```css
:root {
  --color-primary: ;
  --color-primary-dark: ;
  --color-secondary: ;
  --color-accent: ;
  --color-background: ;
  --color-surface: ;
  --color-text: ;
  --color-muted: ;
  --color-border: ;

  --font-sans: ;
  --font-heading: ;

  --space-xs: ;
  --space-sm: ;
  --space-md: ;
  --space-lg: ;
  --space-xl: ;

  --radius-sm: ;
  --radius-md: ;
  --radius-lg: ;

  --shadow-sm: ;
  --shadow-md: ;

  --container: ;
}
```

Document assumptions in:

```txt
reports/cleanup-log.md
```

## Components

Create reusable Astro components.

Required components:

```txt
Header.astro
Footer.astro
MainNav.astro
MobileNav.astro
LanguageSwitcher.astro
Hero.astro
ServiceCard.astro
BlogCard.astro
ConsultationCTA.astro
InsuranceStrip.astro
LocationCard.astro
FAQAccordion.astro
LikeViewCounter.astro
Seo.astro
FormShell.astro
```

Header and footer should be driven by JSON files in:

```txt
src/data/
```

Do not hardcode navigation in multiple templates.

## Data files

Create:

```txt
src/data/navigation.en.json
src/data/navigation.ar.json
src/data/navigation.es.json
src/data/site.json
src/data/redirects.json
src/data/services.json
```

Navigation should include primary and footer sections.

Example:

```json
{
  "primary": [
    { "label": "ABA Therapy", "href": "/aba" },
    { "label": "Autism Evaluations", "href": "/autismevaluations" },
    { "label": "Learner Social Club", "href": "/learnersocialclub" },
    { "label": "Library", "href": "/library" },
    { "label": "Contact", "href": "/client-consultation" }
  ]
}
```

## Layouts

Create:

```txt
src/layouts/BaseLayout.astro
src/layouts/PageLayout.astro
src/layouts/BlogPostLayout.astro
src/layouts/BlogIndexLayout.astro
```

`BaseLayout.astro` should include:

- HTML `lang`
- HTML `dir`
- SEO component
- global styles
- header
- main slot
- footer
- scripts as needed

## SEO component

Create:

```txt
src/components/Seo.astro
```

It should support:

- title
- description
- canonical
- Open Graph tags
- Twitter card tags
- image
- noindex for drafts/placeholders
- language
- direction
- hreflang links where translation relationships are known
- JSON-LD/schema when extracted

Preserve metadata from the mirror wherever possible.

Generate:

```txt
public/sitemap.xml
public/robots.txt
reports/seo-audit.md
```

The SEO audit should include:

- URL
- old title
- new title
- old description
- new description
- canonical
- H1
- notes
- missing metadata

## Routes

Create route files for English primary pages:

```txt
src/pages/index.astro
src/pages/aba.astro
src/pages/autismevaluations.astro
src/pages/learnersocialclub.astro
src/pages/client-consultation.astro
```

Create blog routes:

```txt
src/pages/library/index.astro
src/pages/library/[slug].astro
src/pages/library/page/[page].astro
```

Create multilingual catch-all routes:

```txt
src/pages/ar/index.astro
src/pages/ar/[...slug].astro
src/pages/es/index.astro
src/pages/es/[...slug].astro
```

Implement routing in a clean, maintainable way.

## Extraction scripts

Create:

```txt
tools/extract-site.mjs
tools/crawl-live-site.mjs
tools/audit-links.mjs
tools/generate-redirects.mjs
tools/generate-sitemap.mjs
```

### `extract-site.mjs`

This script should:

- scan the mirror
- identify HTML files
- infer URL paths
- identify page type
- identify blog posts
- identify listing pages
- extract title/meta/H1/body/main content
- extract canonical and Open Graph metadata
- extract schema/JSON-LD where present
- convert blog posts to Markdown where feasible
- create page Markdown where useful
- copy/normalize assets
- rewrite local asset references
- create initial reports

The script does not need to be perfect, but it should be useful and documented.

### `crawl-live-site.mjs`

This script should:

- attempt to crawl the live site if internet is available
- discover URLs from sitemap and internal links
- compare discovered URLs against the mirror
- document missing URLs/assets
- avoid aggressive crawling
- respect the scope of `www.azinstitute4autism.com`

### `audit-links.mjs`

This script should:

- inspect generated content and/or built output
- identify internal links that do not resolve
- identify external links if easy to check
- produce:

```txt
reports/broken-links.md
```

### `generate-redirects.mjs`

This script should:

- read URL inventory and redirect map
- generate nginx rewrite rules
- output:

```txt
reports/nginx-rewrites.conf
```

Use this style:

```nginx
rewrite ^/old-path/?$ /new-path permanent;
```

### `generate-sitemap.mjs`

This script should:

- generate or validate sitemap output
- include language routes where appropriate
- avoid drafts/placeholders if marked noindex

## Asset handling

Extract/download/self-host assets into:

```txt
public/assets/
src/assets/
```

Use `public/assets` for assets referenced directly in Markdown/frontmatter.

Use `src/assets` for component-imported assets and Astro optimization.

Organize:

```txt
public/assets/images/
public/assets/fonts/
public/assets/media/
public/assets/downloads/
```

Normalize filenames where practical:

```txt
hero-home.webp
aba-therapy-child-session.webp
blog-autism-play.webp
aia-logo.svg
```

Do not destroy originals unless they are duplicated and unused.

Create:

```txt
reports/asset-inventory.csv
```

Include:

- original URL/path
- new path
- file type
- used by
- notes

## Forms

Recreate visible forms as styled HTML forms.

Do not implement backend behavior.

Use `FormShell.astro` where useful.

Each form must include TODO comments.

Example:

```html
<form class="form" method="post" action="">
  <!-- TODO: Wire this form to Netlify Forms, a custom API endpoint, or another backend service. -->
  <!-- TODO: Add spam protection before production launch. -->
</form>
```

Document form assumptions and missing backend work in:

```txt
reports/migration-summary.md
```

## Like/view counter

Create:

```txt
src/components/LikeViewCounter.astro
src/scripts/likes-views.ts
```

Use:

```txt
PUBLIC_AIA_API_BASE=https://api.azinstitute4autism.com
```

Add `.env.example`:

```txt
PUBLIC_AIA_API_BASE=https://api.azinstitute4autism.com
```

The frontend should:

- fetch counts when possible
- allow like/unlike behavior if the existing API supports it
- not break the page when the API is unavailable
- avoid blocking static builds
- document any uncertainty in the migration summary

## Accessibility

Improve obvious accessibility issues while preserving the design.

Check for:

- missing alt text
- multiple H1s
- skipped heading levels
- unlabeled form fields
- low-contrast text
- missing button labels
- empty links
- keyboard navigation issues
- missing nav labels
- mobile menu accessibility
- language and direction attributes

Create:

```txt
reports/accessibility-audit.md
```

## Reports

Create all of these:

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

### `migration-summary.md`

Include:

- what was successfully migrated
- what was approximated
- what requires manual review
- pages migrated
- blog posts migrated
- media copied
- external dependencies remaining
- forms requiring backend integration
- multilingual placeholder status
- SEO issues found
- accessibility issues found
- broken links
- build results
- recommended next steps

## Package scripts

Add scripts similar to:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "extract": "node tools/extract-site.mjs",
    "crawl": "node tools/crawl-live-site.mjs",
    "audit:links": "node tools/audit-links.mjs",
    "generate:sitemap": "node tools/generate-sitemap.mjs",
    "generate:redirects": "node tools/generate-redirects.mjs"
  }
}
```

If `astro check` requires an additional package, install/configure the needed package or adjust the script appropriately.

## README

Create:

```txt
www/README.md
```

It should explain:

- what the project is
- where the raw mirror lives
- how the migration was performed
- how to install dependencies
- how to run local dev
- how to build
- how to preview
- how to add a blog post
- how to add a page
- how to add an Arabic translation
- how to add a Spanish translation
- how to edit navigation
- how to configure the likes/views API base URL
- how forms are currently handled
- where reports live
- how to review nginx rewrites

Include:

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Build and validation

After implementation, run:

```sh
npm install
npm run build
npm run audit:links
```

Fix errors when practical.

If something cannot be completed, document it in:

```txt
reports/migration-summary.md
```

## Acceptance criteria

The migration is successful when:

- `./www` contains a working Astro project
- `npm run build` succeeds or unresolved build issues are clearly documented
- main public pages render locally
- blog posts are migrated into file-based Markdown where feasible
- Markdown files work with Front Matter CMS
- MDX is available but not overused
- media is self-hosted wherever practical
- current URL paths are preserved wherever possible
- nginx rewrite rules are generated for changed paths
- forms are styled and marked with TODO backend comments
- the like/view counter is isolated and environment-configured
- English, Arabic, and Spanish structure exists
- Arabic RTL support exists
- CSS is organized into design-token-based plain CSS files
- reusable Astro components exist
- SEO metadata is preserved or documented
- audit/report files exist
- README explains how to continue development

## Working order

Proceed methodically:

1. Read `AGENTS.md`.
2. Read `CLAUDE.md`, if using Claude Code.
3. Read this `MIGRATION_BRIEF.md`.
4. Inspect `./www.azinstitute4autism.com`.
5. Summarize a concise implementation plan.
6. Scaffold Astro in `./www`.
7. Build extraction/reporting scripts.
8. Extract pages, blog posts, assets, metadata, navigation, and forms.
9. Refactor repeated sections into Astro components.
10. Configure content collections and Front Matter CMS.
11. Add multilingual structure.
12. Add SEO, sitemap, robots, and redirects.
13. Add reports.
14. Run build and audits.
15. Fix errors.
16. Summarize what changed and what still needs manual review.

Prioritize a clean, maintainable foundation over a messy pixel-perfect clone.