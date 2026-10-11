# AIA Astro Migration — Living Session Handoff

**Last updated:** October 10, 2026 (UTC)
**Repository:** `AIAMarketing/azinstitute4autism.com`
**Working branch:** `faithful-astro-migration`
**Last accepted implementation:** Phase 6B.5 — Multilingual, RTL, Accessibility, and Performance Acceptance
**Verified pre-commit parent:** `8192ea71c47a7163b40a7fad144ebbd2523282d1`
**Implementation checkpoint:** the commit containing this handoff update; obtain its actual SHA from Git history
**Next planned milestone:** Phase 6C — Missing English Library Article Reconciliation

> This is a short orientation document. Repository policy, code, and the dated
> evidence in `www/reports/migration-summary.md` remain authoritative. Verify the
> branch and Git history before starting new work.

## Accepted implementation state

- Phase 5C Team reconciliation: `34d5394b3ce765028a27b9cddd9952de3f09bfe7`.
- Phase 6A Library architecture proposal: `76a035424dc5245443476b168d8c91ea62eed27b`;
  its later ratification in the migration summary controls implementation.
- Phase 6B.1 multilingual static search: `b20c253383440598c2d07bf6f852906ac00c42df`.
- Phase 6B.2 Library pagination: `6f5ac3c0d233cee5fbbb62be79bc6909e6bec183`.
- Phase 6B.3 author archives and linked bylines: `8646792d46a8a117ef617f5dd2582c2550b45d19`.
- Phase 6B.4 URL/SEO reconciliation: `8192ea71c47a7163b40a7fad144ebbd2523282d1`.
- Phase 6B.5 is accepted in the checkpoint containing this handoff. The file
  intentionally does not invent that containing commit's SHA.

### Phase 6B.5 accepted behavior

- Shared visitor navigation resolves only eligible publications and remains
  separate from SEO hreflang. Ordinary content uses explicit translation
  relationships; author archives use validated locale records and author
  translation keys. Numbered archive choices go to locale roots without
  claiming page-number equivalence.
- English, Spanish, and Arabic desktop, mobile, footer, logo, and Tour links use
  valid locale destinations or visibly identified cross-language fallbacks.
  `/ar` remains unpublished; Arabic Home explicitly falls back to English `/`.
- The author language selector uses native disclosure semantics and real links.
  The Arabic footer retains RTL layout while phone, email, and address values
  use narrow LTR bidi isolation.
- The shared address is two structured lines and renders with one explicit line
  break. Contact obfuscation remains unchanged; reversed no-JavaScript strings
  are intentional fallbacks, and generated scripts decode the approved phone
  and email destinations.
- Skip-link and mobile-menu labels are localized. The user completed the manual
  browser checklist across languages, desktop/mobile layouts, keyboard focus,
  search, RTL, and the final address refinement. No real screen-reader session
  was performed.
- Search remains dependency-free, local, metadata-only, and demand-loaded. The
  three indexes contain 46 English, 12 Spanish, and seven Arabic records
  (44,407 raw bytes and 13,382 gzip bytes total); the shared client is 6,539 raw
  bytes and 2,651 gzip bytes.
- Validation passed with zero Astro diagnostics; 37 Library, 34 SEO, 33
  publication, 20 Markdown, and 10 route tests; both build modes; clean
  route/link/image/blog audits; and final offline reconciliation from 70 saved
  requests. The accepted baseline remains 110 HTML routes, eight author
  archives, 97 indexing-enabled sitemap URLs, 174 hreflang links across 53
  routes, 65 Library records, three search indexes, nine redirects, and 133
  offline dispositions. Final staging has 110 `noindex,nofollow` pages, an empty
  sitemap, and no hreflang.
- No production deployment, redirect activation, or cutover is authorized.

## Next: Phase 6C — Missing English Library Article Reconciliation

Reconcile the nine missing English articles from current, traceable source
content through a separately authorized implementation and review. Preserve the
Markdown-first content model and existing publication policy. Do not fabricate
articles, dates, translations, metadata, assets, or pagination. Until the
articles are reconciled, `/library/page/6` and
`/library/author/rula-diab/page/6` remain cutover blockers and must not be
created, copied from page 5, or redirected to unrelated pages.

## Outstanding pre-cutover requirements

1. Perform a real screen-reader acceptance session.
2. Obtain fluent Spanish and Arabic review of operational copy and localized
   author biographies.
3. Obtain AIA approval of public author credentials, role, and biography claims
   where required.
4. Keep author archives `noindex,follow`, sitemap-excluded, and hreflang-excluded
   until the indexing, sitemap, and hreflang decisions receive explicit review.
5. On the eventual Contabo VPS, verify slashless canonical serving, HTTPS
   preservation, activation of the nine repository redirects, query-string
   preservation, locale destinations, loop avoidance, and real 404 behavior.
6. Complete Phase 6C before accepting either missing English page-6 route.
7. Treat cached HubSpot/CDN responses cautiously; preserve source timestamps and
   distinguish inherited evidence from fresh origin verification.

## Working protocol

1. Read repository-root `AGENTS.md`, `MIGRATION_BRIEF.md`, this handoff, and the
   relevant migration-summary sections before new work.
2. Implement only an explicitly authorized milestone, then report validation and
   a read-only structural diff before staging or committing.
3. After explicit acceptance, create a narrow local checkpoint. Do not push or
   deploy automatically.
4. Do not activate forms, analytics, advertising, search logging, production
   redirects, or new PHI flows without separate authorization.
5. Preserve the user-owned untracked root `merge-plan.md`: do not read, edit,
   move, stage, delete, or checksum it. Its previously reported SHA-256 is
   historical evidence only:
   `015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.
