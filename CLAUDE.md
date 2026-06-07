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
3. Inspect the local mirror.
4. Provide a concise implementation plan.
5. Scaffold or update the Astro project in `./www`.
6. Build extraction, crawl, audit, sitemap, and redirect tools.
7. Extract content, media, metadata, navigation, and forms.
8. Refactor into reusable Astro components.
9. Configure Astro content collections and Front Matter CMS.
10. Add English, Arabic, and Spanish structure.
11. Add RTL CSS for Arabic.
12. Add SEO, sitemap, robots, redirects, and reports.
13. Run build and audits.
14. Fix practical errors.
15. Document incomplete items in `reports/migration-summary.md`.

## Important Claude-specific behavior

Do not rely on a single massive prompt if the same information already exists in `MIGRATION_BRIEF.md`.

When asked to begin migration, first read the relevant project files, then work from the files.

## Safety and preservation

Treat `./www.azinstitute4autism.com` as read-only source material.

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