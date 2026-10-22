# Phase 9 P9-04 — Likes/Views Isolation

Date: 2026-10-21
Status: Implemented and verified locally; live activation remains prohibited.

## Scope

This batch removes the previous implicit production API fallback from the article engagement component. `LikeViewCounter.astro` now resolves an explicit `off`, `mock`, or future `live` configuration through `src/utils/counter-mode.ts`. The default is `off`; an API URL by itself cannot enable live behavior.

`live` is accepted only when `PUBLIC_COUNTERS_LIVE_APPROVED=true` and the configured origin is HTTPS, then remains fail-closed at runtime because no live adapter is implemented in this batch. `counterModeForRuntime()` exposes only `off` or `mock` until a separately authorized production adapter exists.

## Runtime contract

| Mode | Runtime behavior | Network/cookie behavior |
| --- | --- | --- |
| `off` (default) | Disabled like control, unavailable message, no real metric value | No API request, credential, cookie read or cookie write |
| `mock` | Deterministic local interaction and demo-only status | No external request, persistence, credential or cookie |
| `live` | Fails closed to `off` in this release | No live traffic; future activation requires a separate approval and adapter |

`PUBLIC_COUNTERS_MOCK_RESULT` controls only the deterministic local fixture state. It does not represent a production metric. English, Spanish and Arabic article messages remain localized, including the unavailable state and RTL direction attributes.

## Changed files

- `src/components/LikeViewCounter.astro` — removed fetch/cookie/API fallback and added explicit mode presentation.
- `src/utils/counter-mode.ts` — typed resolver and fail-closed runtime mode.
- `src/scripts/likes-views.ts` — exports the resolver rather than a live client.
- `src/utils/article-messages.ts` — localized unavailable engagement text.
- `src/scripts/mock-form.ts` — deterministic local counter interaction without persistence.
- `.env.example` — documents off-by-default mode, approval flag and mock result.
- `tools/phase9-nonproduction.test.mjs` — mode, source-isolation and deterministic behavior coverage.

## Validation

- `npm run check` — passed (125 files, no diagnostics).
- Existing Markdown, publication, SEO, Library, route, Phase 8 and campaign suites — passed (167 tests total).
- `node --experimental-strip-types --test tools/phase9-nonproduction.test.mjs` — 5/5 passed.
- Normal Astro build — passed (128 pages).
- Mock build with counter/forms mock settings — passed; no external form URL or API URL was emitted.
- Guarded Chromium interaction run — 41 checks, 0 failures, `productionAttempt: false`. The only review result was the pre-existing native dialog/browser focus boundary; no production request was transmitted. Leaflet requests were blocked by the guard.
- A separate loopback Chromium probe opened `/library/aba-therapy-benefits` in off mode: the control was disabled, the unavailable message remained, `document.cookie` stayed empty, and the guarded request list contained zero non-loopback or mutating requests.

## Future approval requirements

P9-04 remains pending. Before any live adapter is implemented, AIA/privacy/security owners must approve the API origin, CORS and credential policy, cookie behavior, environment allowlist, staging isolation, consent implications, and production monitoring. A future live test must use an approved environment and synthetic data; this batch intentionally performs no production API request.
