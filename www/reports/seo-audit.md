# SEO Audit

## Preserved

- Canonical clean paths from the mirror are preserved for core pages and library posts.
- Extracted titles, meta descriptions, H1 text, featured images, and image alt text are stored in content frontmatter.
- Shared templates emit canonical, Open Graph, and Twitter card metadata.
- Blog posts emit article metadata and semantic publication dates.
- `robots.txt` and sitemap generation are included.

## Cleanup

- HubSpot `?hsLang=...` mirror duplicates are excluded from generated routes.
- AMP mirror variants are excluded because Astro pages are responsive and static.
- Blog pagination and author archive variants are not preserved as separate generated pages.
- Brief aliases `/aba`, `/autismevaluations`, and `/learnersocialclub` redirect to preserved source URLs.

## Manual Review

- Verify every extracted canonical URL against production before launch.
- Review titles and descriptions that may have been affected by incorrect HubSpot language canonicals.
- Add organization and service JSON-LD after business details are approved.
- Validate social preview images after deployment.
