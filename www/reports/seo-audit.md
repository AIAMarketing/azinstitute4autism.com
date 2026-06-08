# SEO Audit

## Preserved

- Canonical clean paths verified from the live public site are preserved for core pages and library posts.
- Extracted titles, meta descriptions, H1 text, featured images, and image alt text are stored in content frontmatter.
- Shared templates emit canonical, Open Graph, and Twitter card metadata.
- Library index layouts emit language-correct canonical URLs.
- Blog posts emit article metadata and semantic publication dates.
- Blog FAQ components emit `FAQPage` JSON-LD derived from the same MDX item
  data used for the visible accordion.
- `robots.txt` and sitemap generation are included.
- The live navigation hierarchy, clean English/Spanish/Arabic routes, and
  current library listing structure were checked against the public site during
  the fidelity pass.
- Page-layout banners use the current visible public H1 rather than the longer
  SEO title, and duplicate extracted page H1s were removed.

## Cleanup

- HubSpot `?hsLang=...` mirror duplicates are excluded from generated routes.
- AMP mirror variants are excluded because Astro pages are responsive and static.
- Blog pagination and author archive variants are not preserved as separate generated pages.
- Brief aliases `/aba`, `/autismevaluations`, and `/learnersocialclub` redirect to preserved source URLs.

## Manual Review

- Verify canonicals for pages not sampled during the live fidelity pass.
- Review titles and descriptions that may have been affected by incorrect HubSpot language canonicals.
- Organization JSON-LD is emitted globally; service-specific schema still
  requires business review.
- Validate social preview images after deployment.
- Add additional page-specific JSON-LD only after business review of the
  appropriate schema.
