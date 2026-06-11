# Arizona Institute for Autism Astro Site

Static Astro + TypeScript migration of the public Arizona Institute for Autism
website. The read-only source mirror is located at
`../www.azinstitute4autism.com`.

## Quick Start

Run commands from this directory:

```sh
cd www
npm install
npm run dev
```

Astro prints the local development URL, normally:

```txt
http://localhost:4321
```

The development server watches source files and refreshes the browser after
edits. Stop it with `Ctrl+C`.

Do **not** run `npm run extract` during normal editing. Extraction regenerates
migrated Markdown from the raw mirror and can overwrite editorial changes.

## Environment Setup

Requirements:

- Node.js 20.19 or newer; the Nix shell currently supplies Node.js 22
- npm

This repository also has a Nix development shell at the repository root:

```sh
cd ..
nix --extra-experimental-features "nix-command flakes" develop
cd www
npm install
```

Copy the example environment file when testing the like/view counter:

```sh
cp .env.example .env
```

The default value is:

```txt
PUBLIC_AIA_API_BASE=https://api.azinstitute4autism.com
```

The site still renders when that API is unavailable.

## View And Build

### Development Server

Use this while editing:

```sh
npm run dev
```

Useful development URLs include:

```txt
/
/aba-therapy
/autism-evaluations
/learner-social-club
/client-consultation
/library
/es
/es/library
/ar
/ar/library
```

### Production Build

Generate the static production site:

```sh
npm run build
```

The autonomous Codex sandbox denies `/etc/hosts`, so its Node runtime cannot
resolve `localhost`. Use this equivalent validation command only inside that
sandbox:

```sh
npm run build:sandbox
```

Build output is written to:

```txt
dist/
```

### Preview Production Output

After a successful build:

```sh
npm run preview
```

Astro prints the preview URL, normally `http://localhost:4321`.

### Validate Before Committing

```sh
npm run build
npm run audit:links
npm run audit:images
npm run audit:blog
```

The link audit reads `dist/` after a successful build. If rendered output is
unavailable, it audits generated source routes, relative and root-relative
Markdown links, and public assets instead. It writes:

```txt
reports/broken-links.md
```

## Editing Content

Normal content editing happens in Markdown:

```txt
src/content/pages/en
src/content/pages/es
src/content/pages/ar
src/content/blog/en
src/content/blog/es
src/content/blog/ar
src/content/authors/en
src/content/authors/es
src/content/authors/ar
```

Page and post frontmatter is validated by `src/content.config.ts`.

Example:

```md
---
title: "Example Article"
description: "Short search and social description."
slug: "example-article"
canonical: "https://www.azinstitute4autism.com/library/example-article"
lang: "en"
translationKey: "example-article"
featuredImage: "/assets/images/example.webp"
alt: "Descriptive image alt text"
date: "2026-06-07"
author: "rula-diab"
category: "Library"
tags:
  - ABA Therapy
draft: false
---

Article content goes here.
```

Set `draft: true` while preparing unpublished content.

### Links And Buttons

Use normal Markdown links for links within prose:

```md
Read the [ABA therapy guide](/aba-therapy) for more information.
```

Prose links render as the live site's orange inline links. Do not place an
ordinary Markdown link on its own line merely to make it look like a button.

Use `.mdx` and the `Button` component only for a source-verified call to action:

```mdx
import Button from '../../../components/Button.astro';

<Button href="/client-consultation">Request an Appointment</Button>
<Button href="/services" variant="outlined">Explore Services</Button>
<Button href="https://example.com" target="_blank">External Action</Button>
```

Available `Button` variants are `filled` (default), `outlined`, and `light`.
Available sizes are `default` and `small`. A `_blank` target automatically adds
`rel="noopener noreferrer"`.

Use the optional `Link` component only when an inline link needs an explicit
variant or target:

```mdx
import Link from '../../../components/Link.astro';

<Link href="/library" variant="strong">Browse the library</Link>
```

Normal Markdown links remain preferred for ordinary page and article content.

### Front Matter CMS

The project includes `frontmatter.json` for the Front Matter CMS VS Code
extension. Open the `www` folder as the editor workspace so its content folders
and media paths resolve correctly.

### Edit The Homepage

The English and Spanish homepages are driven from the structured `home:`
frontmatter block in:

```txt
src/content/pages/en/index.md
src/content/pages/es/index.md
```

`HomePage.astro` renders those named sections in order. Use the section names
as the editing surface:

```txt
hero
servicesIntro
benefits
skills
insurance
esa
financialHelp
process
director
testimonials
```

Keep homepage copy in those named blocks so the page remains easy to scan in
Front Matter CMS and VS Code. `src/content.config.ts` validates the structure.

### Images And Downloads

Store content-referenced assets in:

```txt
public/assets/images
public/assets/downloads
public/assets/media
```

Reference public assets from Markdown using root-relative paths:

```md
![Descriptive alt text](/assets/images/example.webp)
```

Use `src/assets/images` for images imported directly by Astro components and
processed by Astro.

### Components And Styling

Reusable page sections are in:

```txt
src/components
src/layouts
```

Global styles and design tokens are in:

```txt
src/styles/variables.css
src/styles/global.css
src/styles/rtl.css
```

Navigation, services, redirects, and site details are in:

```txt
src/data
```

## Adding Content

### Add An English Blog Post

1. Create `src/content/blog/en/post-slug.md`.
2. Add valid frontmatter and article Markdown.
3. Place referenced images in `public/assets/images`.
4. Run `npm run dev` and view `/library/post-slug`.
5. Run the production validation commands before committing.

### Add A Translation

Use the same `translationKey` across translated entries:

```txt
src/content/blog/en/post-slug.md
src/content/blog/es/post-slug.md
src/content/blog/ar/post-slug.md
```

The URLs become:

```txt
/library/post-slug
/es/library/post-slug
/ar/library/post-slug
```

Arabic routes automatically render with `lang="ar"` and `dir="rtl"`.

Do not publish unreviewed machine translations. Clearly mark placeholders.

### Edit A Blog FAQ

Posts with live-style FAQ sections use `.mdx` and import:

```mdx
import FAQAccordion from '../../../components/FAQAccordion.astro';
```

Edit the component's `label`, `heading`, and `items` data in the post. Keep
`answer` as plain text for JSON-LD and `answerHtml` as the matching visible
answer. Shared FAQ markup, styling, interaction, and schema generation live in
`src/components/FAQAccordion.astro`.

## Mirror Extraction Workflow

The mirror is read-only source material. Never modify:

```txt
../www.azinstitute4autism.com
```

Only rerun extraction when intentionally refreshing migrated content from the
mirror. Commit or back up editorial changes first.

Dependency-free extraction:

```sh
npm run extract
```

Full Cheerio/Turndown extraction:

```sh
npm run extract:full
```

After extraction:

```sh
npm run extract:blog-footers
npm run generate:sitemap
npm run generate:redirects
npm run build
npm run audit:links
npm run audit:images
npm run audit:blog
```

Extraction regenerates content files, copied assets, and inventories. Review
the complete Git diff before accepting it. Extraction may recreate FAQ-bearing
posts and CTA-bearing pages as Markdown; restore their `FAQAccordion` and
`Button` MDX blocks before accepting the result. `npm run audit:blog` reports
plain Markdown FAQ sections.

`npm run extract:blog-footers` preserves the extracted previous/next and
similar-post relationships in `src/data/blog-footers.json`, then removes those
footer fragments from article prose so `BlogPostFooter.astro` can render them.

## Reports And Utilities

Migration reports are stored in `reports/`.

Useful commands:

```sh
npm run crawl:live
npm run generate:sitemap
npm run generate:redirects
npm run audit:links
```

The live crawl is optional and may fail in restricted network environments.

## Forms

Forms are intentionally static and do not submit anywhere. Before production:

1. Select a form backend.
2. Connect the forms.
3. Add spam protection.
4. Test validation, confirmation, and failure states.

## Troubleshooting

### `astro: command not found`

Dependencies are not installed:

```sh
npm install
```

### npm TLS or certificate errors

Do not disable npm certificate verification. Run `npm install` from a normal
host terminal or trusted development environment with working CA certificates.

### Link audit says build output is unavailable

Build first:

```sh
npm run build
npm run audit:links
npm run audit:images
npm run audit:blog
```

### A content page is missing

Check:

- its Markdown file is in the correct language/content folder
- `draft` is `false`
- `slug` is unique within that language and content type
- frontmatter satisfies `src/content.config.ts`
