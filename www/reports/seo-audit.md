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

- HubSpot `?hsLang=...` duplicates are excluded from generated routes.
- AMP variants are excluded because Astro pages are responsive and static.
- Historical note: the initial migration did not preserve Blog pagination or
  author archives. Phases 6B.2 and 6B.3 replaced that limitation with generated
  English, Spanish, and Arabic Library/author routes derived from the eligible
  content catalog. The two English page-6 families remain intentionally absent
  until Phase 6C supplies the nine missing source-supported articles.
- Library and author `/page/1` duplicates are represented by nine synchronized
  repository redirect definitions, including the three existing service
  aliases. Redirect activation on deployed hosts remains separately gated.
- `/search` is a static Library-only compatibility route. It is self-canonical,
  `noindex`, sitemap-excluded, and outside the hreflang graph.
- Brief aliases `/aba`, `/autismevaluations`, and `/learnersocialclub` redirect to preserved source URLs.

## Manual Review

- Verify canonicals for pages not sampled during the live fidelity pass.
- Review titles and descriptions that may have been affected by incorrect HubSpot language canonicals.
- Organization JSON-LD is emitted globally; service-specific schema still
  requires business review.
- Validate social preview images after deployment.
- Activate and verify the approved redirects on the intended hosting stack.
- Decide and test host-level no-slash normalization for prerendered routes;
  Astro's static output does not enforce that transport behavior by itself.
- Reconcile the nine missing English articles before accepting
  `/library/page/6` or `/library/author/rula-diab/page/6` for cutover.
- Author archives remain `noindex,follow`, sitemap-excluded, and without
  hreflang pending separate content/indexability approval.
- Add additional page-specific JSON-LD only after business review of the
  appropriate schema.
