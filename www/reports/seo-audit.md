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
  content catalog. Phase 6C supplied the nine missing source-supported English
  articles, so `/library/page/6` and
  `/library/author/rula-diab/page/6` now derive from the complete 55-record
  English catalog instead of manual route records.
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
- Complete editorial, clinical, and organizational review of the nine Phase 6C
  articles and manually accept both generated English page-6 routes before
  cutover.
- Author archives remain `noindex,follow`, sitemap-excluded, and without
  hreflang pending separate content/indexability approval.
- Add additional page-specific JSON-LD only after business review of the
  appropriate schema.
## Phase 6C.3 article metadata update — 2026-10-12

The complete 74-record Library corpus was compared with the accepted public
evidence after Phase 6C.2. Seven remaining public H1 differences now use the
existing `displayH1` field, and the four truncated English descriptions now
match their full public values. Sixty same-language records received explicit
`updatedDate` values supported by matching BlogPosting metadata in two bounded
evidence passes. The newly translated Arabic antecedent/consequence record is
the sole deliberate omission because the public Arabic route still represents
the superseded article and cannot support a modification date for the new
translation.

The modification metadata does not participate in Library or author sorting;
the catalog remains ordered by original publication date and normalized route.
Article hero descriptions now propagate consistently to rendered image alt,
`og:image:alt`, and `twitter:image:alt`. The two syndicated English records keep
their external canonicals, noindex policy, sitemap exclusion, and other
publication exceptions.

The dated source evidence and complete route matrix are in
`phase-6c3-source-evidence-2026-10-12.json` and
`phase-6c3-metadata-reconciliation-2026-10-12.md`. Public HubSpot timestamps are
recorded as metadata evidence and are not described as proof that every CMS
update was a substantive editorial revision.

## Phase 6C.5 final verification — 2026-10-13

The generated corpus has 121 unique canonical targets, 74 Library articles,
72 eligible BlogPosting entities and 182 visible/schema-aligned FAQ answers on
30 articles. The two syndicated articles retain their external canonicals and
schema exclusions. The play/leisure closing CTA was removed from its last FAQ
answer and restored after the accordion, matching the public component boundary.
All 74 original publication dates match the selected source evidence at calendar
date resolution; 73 supported modification dates remain, with the new Arabic
antecedent/consequence translation intentionally undated as a revision.

The indexing-enabled build retains 107 sitemap URLs, 174 hreflang links on 53
routes and nine noindex author archives. The final staging build restores 121
`noindex,nofollow` pages, an empty sitemap and no hreflang. Nine redirect
definitions remain unchanged and are not activated by this audit. The final
report separates technical readiness from outstanding clinical, translation,
accessibility, landing-page ownership and production-hosting approval gates.

## Phase 7 Spanish privacy publication — 2026-10-14

The recovered `/es/privacy-policy` page adds one self-canonical eligible route
and validates the existing English policy's explicit translation relationship.
Current indexing-enabled totals are 122 HTML routes/unique canonical targets,
108 sitemap URLs and 180 hreflang links across 55 routes. The two policy pages
each expose English, Spanish and x-default; no other relationship changed.
Library inventory/search remains 74 records (55/12/7), with nine author archives
and nine unchanged redirect definitions. Final staging output has 122
noindex,nofollow pages, empty sitemap and zero hreflang. Spanish policy SEO
wording was localized because the observed Spanish source used English metadata;
its legal body and February 2025 date were preserved. Privacy/legal and fluent
Spanish review remain prerequisites for release, independent of technical SEO.
