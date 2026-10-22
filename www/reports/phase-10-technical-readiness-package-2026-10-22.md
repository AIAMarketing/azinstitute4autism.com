# Phase 10 — Technical Readiness Package

Date: 2026-10-22 UTC
Status: Technical handoff prepared; production gates remain open.

## Acceptance matrix

| Area | Evidence | Result | Human/owner gate |
| --- | --- | --- | --- |
| Astro type/check | `npm run check` | Pass, 130 files, 0 diagnostics | None for local build |
| Content/publication | Markdown 20, publication 33, SEO 35, Library 53, routes 10 | Pass, 151 core tests | Content/clinical approvals remain separate |
| Phase 8/campaign/P9 isolation | Phase 8 5, campaign 11, P9 nonproduction 5 | Pass | Language, screen-reader and stakeholder review pending |
| Artifact integrity | staging/indexing verifier | Pass; 128/127 routes, staging 0/0 sitemap/hreflang | Hosting owner verification pending |
| Browser all-route | 128/128 opened | Pass | Non-Chromium and authorized visual review pending |
| Responsive | 110/110 checks | Pass | Human visual acceptance pending |
| Release rehearsal | Node loopback switch/rollback | Pass | nginx/Contabo rehearsal pending |
| Link/image/blog audits | all three audits | Pass, zero findings | None for local audit |
| Offline reconciliation | explicit 2026-10-22 evidence check | Pass; no fresh production crawl | Source freshness remains qualified |
| Screen reader | no real session in this environment | Pending | Authorized AT reviewer |

## Reproducible validation commands

From `www`:

```sh
TMPDIR=/tmp npm run check
npm run test:markdown
npm run test:publication
npm run test:seo
npm run test:library
npm run test:routes
node --test tools/phase8.test.mjs
node --test tools/campaign.test.mjs
node --test tools/phase9-nonproduction.test.mjs
node --test tools/phase10-artifact.test.mjs
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:links
npm run audit:images
npm run audit:blog
node tools/phase10-artifact-verify.mjs --mode=staging
node tools/phase10-release-rehearsal.mjs
```

The final normal staging build was restored after the indexing build. The explicit offline route reconciliation `reports/route-reconciliation-2026-10-22-offline-05-10-47-827Z.json` passed its read-only consistency check using saved request evidence; no unrestricted crawl occurred.

## Phase 10 cutover prerequisites

1. Record a locked Node/npm/toolchain and reproducible artifact manifest.
2. Obtain sanitized Contabo/NixOS/nginx/TLS/DNS/Cloudflare facts.
3. Verify host-local serving, canonical host, redirects, 404s, cache headers and rollback on an approved staging host.
4. Complete Jotform Builder verification, blank-form creation, off/mock testing and privacy/security review before live IDs are mapped.
5. Obtain P9-04 counter origin/credential/consent approval before a live adapter.
6. Resolve P9-05 analytics/advertising measurement and P9-07 privacy/legal approval.
7. Obtain P9-06 clinical/organizational and fluent-language approvals, including Arabic diagrams and Spanish HSA/FSA claims.
8. Complete real screen-reader and authorized visual/non-Chromium acceptance.
9. Name release/rollback owners and record backup/monitoring readiness.
10. Obtain P9-10 go/no-go authorization; then run Phase 10 cutover and post-cutover smoke checks.

## Decision status

P9-01 through P9-10 remain **Pending decision**. No technical feasibility result in this package is an approval. Jotform, counters, analytics, advertising, forms, employee portal, redirects and hosting remain inactive.

## Recommended checkpoint boundaries

Keep the existing Phase 9 implementation, audit tooling and reports as one owner-reviewed technical batch. If a signed checkpoint is requested, stage exact paths only after reviewing the final status and reports. Keep any subsequent host rehearsal, Jotform configuration, counter live adapter and measurement work in separately authorized commits.
