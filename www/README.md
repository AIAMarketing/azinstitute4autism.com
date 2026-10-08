# Arizona Institute for Autism Astro Site

Static Astro + TypeScript migration of the public Arizona Institute for Autism
website.

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

Copy the example environment file when testing the like/view counter or staging
SEO behavior:

```sh
cp .env.example .env
```

The default values are:

```txt
PUBLIC_AIA_API_BASE=https://api.azinstitute4autism.com
PUBLIC_ALLOW_INDEXING=false
```

The site still renders when the AIA API is unavailable. Migration and staging
builds emit `noindex,nofollow` by default. `PUBLIC_ALLOW_INDEXING=true` enables
production publication policy, including per-page noindex exceptions. Exercise
that mode locally with `PUBLIC_ALLOW_INDEXING=true npm run build`; this does
not deploy anything or change environment files. Run `npm run build` afterward
to restore staging output. Only explicitly authorized production deployments
should publish indexing-enabled artifacts.

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
/ar/library
```

### Static Build

Generate the static site with staging indexing protection:

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

### Publication, Canonicals, and Sitemap

`src/utils/publication-policy.ts` owns route eligibility, normalized public
URLs, canonical validation, robots values, and sitemap eligibility.
`src/utils/publication.ts` loads the Astro collections into that manifest.
`src/pages/[...slug].astro` generates every content route from eligible entries,
including home and Library indexes; their existing presentation components are
under `src/components/pages/`. Shared SEO and the generated sitemap use that
same manifest. The route and source-link audits also reuse the policy.

- `draft: true` means unpublished: no generated HTML route in either build mode.
  The Arabic homepage `/ar` remains a draft; published Arabic Library routes
  remain available. Navigation does not link to the unpublished homepage.
- `noindex: true` keeps a published route accessible, emits `noindex,follow`
  in indexing-enabled builds, and excludes it from the sitemap. It defaults
  to `false`. Staging always overrides this with `noindex,nofollow`.
- An omitted `canonical` gets the normalized public URL from `site.json` and
  its local route. A supplied local canonical must match that route. Invalid
  canonicals, duplicate canonical targets, and route collisions fail validation.
- Verified syndicated articles use their existing `canonical` field for the
  external publisher URL. External-canonical routes are excluded from the
  sitemap even when they are not marked noindex. Do not use canonical values
  to create local routes or sitemap locations.
- `src/pages/sitemap.xml.ts` generates `dist/sitemap.xml` on every build.
  Staging emits an empty sitemap and does not advertise it in `robots.txt`.
  Indexing-enabled builds include only eligible, indexable, self-canonical
  local routes. There is no hand-maintained `public/sitemap.xml`.
- `npm run generate:sitemap` is a compatibility command that runs the Astro
  build; it no longer writes a separate public sitemap from frontmatter strings.

The verified noindex exceptions are `/schedule-consultation`, `/employee-portal`,
`/library/community-highlight-meet-rula-diab`, and
`/library/new-aia-scottsdale-office`. The last two also retain their verified
external canonicals. The dated evidence is in `reports/migration-summary.md`.

Run `npm run test:publication` for policy tests and isolated builds of the
actual application in staging and indexing-enabled modes. Fixtures test draft
content, draft home/Library indexes, missing and external canonicals, and
generated head/sitemap consistency without modifying the working site's output.
The policy is TypeScript; Node audit/test commands use `--experimental-strip-types`
for compatibility with the declared Node 22.12 minimum. Dependencies are unchanged.

After publication changes, build and run `npm run audit:routes -- --offline`
before `npm run audit:routes -- --check`. This creates a newly dated local
reconciliation using saved production observations, preserving earlier evidence.
Saved rendered metadata is specific to its build mode: after restoring the
normal staging build, reconcile that output again before checking it.

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

Normal Markdown links remain preferred for ordinary page and article content.

### Stable Heading Links

Astro automatically generates an ID for each Markdown heading. In `.md` files,
when a section needs a stable, editorially controlled fragment link, add an
explicit ID with Sätteri heading-attribute syntax:

```md
## Accepted Insurance Carriers {#accepted-insurance-heading}
```

Link to it with the resulting fragment URL:

```md
[View accepted carriers](/insurance#accepted-insurance-heading)
```

Keep explicit IDs unique within the page, lowercase, and hyphenated. Treat a
published ID as permanent so inbound links do not break when heading text is
edited. The installed MDX parser rejects this shorthand, independently of
directive parsing. In `.mdx` files, use an explicit HTML heading instead:

```mdx
<h2 id="accepted-insurance-heading">Accepted Insurance Carriers</h2>
```

### Markdown Directives

Sätteri directive parsing is disabled. The content corpus has no intentional
container (`:::name`), leaf (`::name`), or text (`:name`) directives, and no
directive transformation plugins are registered. Enabling parsing silently
removed literal text such as `:1` in `1:1`, `:00` in times, and `:Plan` after
an adjacent colon. Heading attributes remain enabled.

Run `npm run test:markdown` after changing the Markdown/MDX configuration. It
builds temporary fixtures and the affected content through the actual Astro
configuration, checking ratios, punctuation, times, URLs, code, and explicit
heading IDs. It makes no production requests and leaves no fixture routes in
the site. Any future directive feature needs compatible rendering and must
preserve these literal-content checks.

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

Use the same nonempty `translationKey` across genuine translated entries in
the **same collection**. The key is an explicit equivalence declaration, not a
URL or an entry reference. Slugs may differ; similar slugs alone never create a
relationship. Do not change keys to manufacture translation pairs.

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

The shared publication manifest supplies both the language switcher and SEO
alternates. A translation set needs at least two eligible members. Drafts,
unpublished placeholders, noindex pages, and external-canonical pages do not
participate. Mark placeholders `draft: true`; `/ar` remains unpublished.
Author records have no generated routes yet and cannot participate.

One member per language per collection/key is allowed, including draft members;
duplicates and blank/whitespace-padded keys fail validation. A lone key is valid
and emits no alternate: it does not assert that a particular missing language
exists. Dangling graph references, wrong-family targets, ineligible targets,
and nonreciprocal links fail validation. The rendered-output regression checks
also fail if an alternate target has no generated HTML file.

Indexing-enabled builds emit the same absolute hreflang links on every member,
including its own language. `x-default` points to the eligible English member
only; sets without one omit it. Staging suppresses hreflang while retaining the
eligible language menu and global `noindex,nofollow`. Unpaired/excluded pages
retain their current-language label without an empty interactive menu.

Run `npm run test:publication`, `npm run build`, and
`PUBLIC_ALLOW_INDEXING=true npm run build` to validate both modes. Finish with
`npm run build` to restore staging. See `reports/migration-summary.md` for
Phase 3B's exact route sets, evidence, and route-audit refresh commands.

Do not publish unreviewed machine translations. Do not invent translations;
substantive translation changes require human language review.

### Edit A Blog FAQ

Posts with live-style FAQ sections use `.mdx` and import:

```mdx
import FAQAccordion from '../../../components/FAQAccordion.astro';
```

Edit the component's `label`, `heading`, and `items` data in the post. Keep
`answer` as plain text for JSON-LD and `answerHtml` as the matching visible
answer. Shared FAQ markup, styling, interaction, and schema generation live in
`src/components/FAQAccordion.astro`.

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

### Google Ads consultation-form conversion handoff

The Google Ads conversion ID, label, and privacy-gated Astro integration
instructions are in
[`reports/google-ads-consultation-conversion.md`](reports/google-ads-consultation-conversion.md).
This is documentation only: **do not install Google tags or conversion snippets**
on health-service pages or turn on enhanced conversions until AIA's
privacy/HIPAA and advertising-policy review explicitly approves the complete
data flow. Count conversions only after the form API confirms success.

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
