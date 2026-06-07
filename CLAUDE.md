@AGENTS.md

# CLAUDE.md

## Claude Code instructions

This project is intended to be worked on with Claude Code.

Before starting the HubSpot-to-Astro migration, read:

```txt
MIGRATION_BRIEF.md
```

Then inspect:

```txt
./www.azinstitute4autism.com
```

and create the new Astro site in:

```txt
./www
```

Do not modify or delete:

```txt
./www.azinstitute4autism.com
```

## Expected workflow

For the migration task:

1. Read `AGENTS.md`.
2. Read `MIGRATION_BRIEF.md`.
3. Inspect the live public site as the single source of truth.
4. Inspect the local mirror as a convenient extraction aid and identify
   relevant discrepancies.
5. Inspect the relevant live HTML, CSS, assets, and responsive behavior.
6. Provide a concise implementation and visual-validation plan.
7. Scaffold or update the Astro project in `./www`.
8. Build extraction, crawl, audit, sitemap, and redirect tools.
9. Extract content, media, metadata, navigation, and forms.
10. Refactor genuinely repeated patterns into reusable Astro components.
11. Compare rendered pages with the live site at desktop and mobile widths.
12. Configure Astro content collections and Front Matter CMS.
13. Add English, Arabic, and Spanish structure.
14. Add RTL CSS for Arabic.
15. Add SEO, sitemap, robots, redirects, and reports.
16. Run build and audits.
17. Fix practical errors.
18. Document incomplete items and intentional visual deviations in
    `reports/migration-summary.md`.

## Important Claude-specific behavior

Do not rely on a single massive prompt if the same information already exists in `MIGRATION_BRIEF.md`.

When asked to begin migration, first read the relevant project files, then work from the files.

## Safety and preservation

Treat `./www.azinstitute4autism.com` as read-only source material.

Treat the live public site as the single content and visual source of truth.
Use the mirror only as a convenient local extraction and inspection aid. When
the live site and mirror disagree, follow the live site and document material
discrepancies. This migration is not a redesign. Do not substitute a generic
visual system for the live design.

Treat the `migration-foundation` branch as reference-only. Do not use it as the
visual baseline.

Do not delete or overwrite raw source assets.

Do not remove files unless you are certain they are generated output in `./www`.

Do not make assumptions about form backend behavior. Forms must remain static with TODO comments.

Do not invent large Spanish or Arabic translations. Create placeholders only when source content does not exist.

## Commands

Use npm.

Expected commands after setup:

```sh
npm install
npm run dev
npm run build
npm run preview
npm run audit:links
```

If any command fails, investigate and fix when practical.

If unresolved, document the issue in:

```txt
www/reports/migration-summary.md
```

## Completion summary

When finished, report:

- files and folders created
- content migrated
- pages and posts extracted
- assets copied or converted
- forms recreated
- multilingual structure status
- like/view counter status
- SEO status
- redirect status
- build status
- audit status
- manual review items
