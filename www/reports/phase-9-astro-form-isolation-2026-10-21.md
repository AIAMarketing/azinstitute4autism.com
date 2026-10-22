# Phase 9 P9-03 — Local Astro Form Isolation

Date: 2026-10-21
Status: Implemented and verified locally; Jotform creation and live integration remain unauthorized.

## Scope

The native empty-action forms were replaced with an explicit fail-closed presentation layer. `PUBLIC_AIA_FORMS_MODE` defaults to `off`; invalid values and `live` without an explicit approval flag resolve to `off`. The runtime currently exposes only `off` and `mock`; no live Jotform adapter or URL exists.

### Modes

- **off:** no native `<form>`, no action, no POST surface, no Jotform resource, disabled controls, and a localized telephone/contact fallback.
- **mock:** local synthetic button states (`success`, `failed`, or `unavailable`) bound by `mock-form.ts`; no persistence, backend, notification, cookie, analytics, or external request.
- **live:** reserved for a separately authorized adapter and approved form IDs. It fails closed today. The historical source-template ID `250727122848156` is not embedded.

The logical route map records nine existing native enquiry instances and five campaign journeys. It is data only and does not activate a submission path.

## Changed files

- `src/utils/form-integration.ts` — typed mode resolver, logical form map, mock-result resolver.
- `src/data/form-integrations.ts` — public mapping export.
- `src/scripts/mock-form.ts` — local mock form and counter interaction binder.
- `src/components/ContactForm.astro` — off/mock presentation with telephone fallback.
- `src/components/FormShell.astro` — off/mock presentation and localized status.
- `src/components/ServiceInquiryDrawer.astro` — off/mock drawer presentation; existing drawer behavior retained.
- `src/layouts/PageLayout.astro` — explicit referral/service logical form mapping.
- `src/utils/form-messages.ts` — localized mock and fallback messages.
- `.env.example` — off-by-default mode, approval flag and mock result settings.
- `tools/seo.test.mjs`, `tools/library.test.mjs`, `tools/phase8-interactions.mjs` — regression assertions for the inactive form surface.
- `tools/phase9-nonproduction.test.mjs` — mode, mapping and source-isolation coverage.

## Mapping

The shared implementation covers `/contact`, `/es/contact`, `/client-consultation`, `/es/client-consultation`, `/schedule-consultation`, `/referrals`, `/aba-therapy`, `/autism-evaluations`, and `/learner-social-club`. The campaign journeys `/lp/aba-therapy`, `/lp/aba-insurance`, `/lp/aba-ahcccs`, `/lp/aba-private-pay`, and `/lp/early-intervention` are mapped to the future Service Consultations form without changing their designs or routes.

## Validation

- `npm run check` — passed (125 files, no diagnostics).
- Markdown 20/20; publication 33/33; SEO 35/35; Library 53/53; routes 10/10; Phase 8 5/5; campaign 11/11; P9 nonproduction 5/5.
- Normal build — passed (128 pages).
- Mock build (`PUBLIC_AIA_FORMS_MODE=mock`, failed fixture) — passed; no Jotform URL or external form request was emitted.
- Guarded Chromium — 41 checks, 0 failures, with the off-mode Spanish form and no-JavaScript checks passing. `productionAttempt: false`; external Leaflet requests were blocked by the test guard.
- Link, image and blog audits — passed with zero findings.
- Explicit offline route reconciliation was regenerated as `reports/route-reconciliation-2026-10-22-offline.json` from saved request evidence and passed its subsequent `--check`; no production crawl was performed. The final normal staging build contained 128 HTML pages, all `noindex,nofollow`, an empty sitemap and zero hreflang links.

## Deferred gates

The owner-created three-form Jotform architecture, field requirements, Builder settings, bilingual behavior, notification privacy, synthetic submission testing, CSP/referrer policy, and production activation remain P9-03/P9-07/P9-09 decisions. No form data reaches Contabo, Google, GA4 or a Jotform endpoint in this batch.
