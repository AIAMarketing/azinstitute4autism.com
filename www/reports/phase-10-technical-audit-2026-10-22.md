# Phase 10 — Extended Technical Audit

Date: 2026-10-22 UTC
Status: Local nonproduction audit; no production activation.

## Baseline and scope

The audit started from signed commit `e874b26bb9dc24beb6bce2e83a10e7800e7e12b9` on `faithful-astro-migration`. The index was empty. Existing unstaged Phase 9 work was preserved. The six superseded route-reconciliation reports and root `merge-plan.md` were excluded without reading their contents.

This audit covered the P9-04 counter isolation, P9-03 off/mock form infrastructure, the runtime outbound-request inventory, generated artifacts and local release behavior. No Jotform account mutation, form submission, production API request, analytics event, advertising request, hosting connection or deployment occurred.

## Findings

| ID | Severity | Finding | Evidence and disposition |
| --- | --- | --- | --- |
| A-01 | Fixed | Page hero headings could exceed a 320px viewport on long titles. | Chromium geometry identified 3–17px overflow on consultation/evaluation pages. `PageHero.astro` now constrains the mobile heading to the available width with border-box sizing. Responsive regression passes. |
| A-02 | Fixed | Library two-column grid retained a min-content width at 768px. | Chromium identified an 881px document width caused by `1fr 240px` plus a long-content min-content contribution. `BlogIndexLayout.astro` now uses `minmax(0, 1fr) 240px`. Responsive regression passes. |
| A-03 | Pass | Counter runtime is fail-closed. | `counter-mode.ts` defaults missing/invalid settings to `off`; `LikeViewCounter.astro` emits no API fallback, fetch, credential or cookie behavior in inactive modes. `phase9-nonproduction.test.mjs`, generated artifact inspection and guarded Chromium passed. Live mode has no adapter and remains unavailable. |
| A-04 | Pass | Form runtime is fail-closed. | `form-integration.ts` defaults missing/invalid/live-without-approval to `off`. Off mode emits no native lead form or action; mock mode is local-only. No Jotform URL, Contabo form endpoint, analytics or advertising event was present in generated output. |
| A-05 | Review | Leaflet assets are external automatic requests. | Guarded Chromium intercepted four GET requests to `https://unpkg.com/leaflet@1.9.4/` on Contact pages before transmission. This is existing map behavior, not a production API request; provider/privacy review remains a release gate. |
| A-06 | Review | Existing CentralReach/Jotform links remain operational external links. | `/client-forms` contains established third-party workflow links. They were not navigated or changed. Their owner, access and privacy behavior remain P9 decision work. |
| A-07 | Pending | Real screen-reader, non-Chromium and authorized visual acceptance. | Static DOM and Chromium checks do not constitute assistive-technology or stakeholder approval. |

## Runtime inventory

Local source review found local Library search-index fetches, existing Leaflet/unpkg and OpenStreetMap map dependencies, established CentralReach/Jotform workflow links, and guarded session-storage behavior for the service drawer. No active GA4, Google Ads, GTM or HubSpot tracking script was introduced. Counter and form integrations have no active production origin in off/mock output.

## Tests added or exercised

- `tools/phase10-artifact-verify.mjs` and `tools/phase10-artifact.test.mjs` provide deterministic staging/indexing artifact checks.
- `tools/phase10-release-rehearsal.mjs` exercises a loopback static server, release switch and rollback.
- `tools/phase10-browser-regression.mjs` checks all generated staging routes with guarded requests.
- `tools/phase10-responsive.mjs` checks representative routes at 320, 390, 768, 1024 and 1440px.

The existing Phase 9 isolation tests remain unchanged except for their prior authorized scope. No production configuration was changed.

## Remaining approvals

P9-01 through P9-10 remain pending. In particular, live counter origin/credentials, Jotform Builder settings and activation, consent/measurement, clinical claims, privacy/legal review, hosting topology and production go/no-go require owner evidence. The Phase 8 real screen-reader and fluent-language gates also remain open.
