# Phase 7 — Nonproduction verification plan supporting Phase 8

Date: 2026-10-14. Baseline: `b5bc95bc2b8e36c58e8b4d8ab4b11391374a7883`.
Planning only: no hosted preview, nginx setup, deployment or integration activation is authorized by this document. Phase 8 acceptance remains pending; Phase 9 decisions and Phase 10 cutover remain distinct.

## Environment choices

| Environment | Purpose / required configuration | Data flows and concerns | Browser/reviewer access | Acceptance / owner / authorization |
|---|---|---|---|---|
| Localhost Astro build/preview | Build staging output, use a loopback-only preview; record commit and Node/npm versions | Counter currently skips localhost/127.0.0.1/::1; maps still load external assets. Forms remain disabled but Enter/no-JS paths need checking. Use synthetic text only. | Local host browser works independently of the autonomous sandbox; remote reviewers cannot assume loopback access. Earlier Chromium/remote browser attempts failed. | Developer and accessibility reviewer verify 390/1440px; separate kickoff for browser sessions, no public deployment. Does not validate nginx/TLS. |
| Isolated local nginx | Serve the exact static artifact using a separately reviewed test config and local TLS/hostname if needed | Non-localhost name can activate counter requests. Network isolation must precede browser loading. No production service credentials. | Host browser/container networking must be demonstrated; not production DNS. | Hosting operator proves nine redirects, query preservation, slashless responses, canonical host/HTTPS and real 404s. Requires explicit test-environment/config authorization. |
| Access-restricted hosted preview | Separate preview origin, access control, staging artifact, reviewed egress restrictions | Noindex is not access control. Production counters/forms/conversions must be unreachable; preview cookies/logging/access controls need review. Do not publish private portal data. | Cross-device and stakeholder access possible after account/access approval; record supported devices. | Owner, hosting operator and privacy reviewer approve origin, access and retention before deployment; Phase 8 reviewers complete checklist. Not authorized in Phase 7. |

## Fail-closed integration isolation prerequisite

`LikeViewCounter.astro` defaults to `https://api.azinstitute4autism.com`, including when the configured value is empty. Outside localhost it issues credentialed POST `/stats/batch` automatically, and POST `/likes` or DELETE `/likes/{slug}` on interaction. Indexing mode is unrelated to these calls.

Proposed future design, not implemented: an explicit integration-enabled setting defaulting off in nonproduction; require an approved nonproduction origin when enabled; reject production origins in preview mode rather than falling back. Use a controlled mock/stub with synthetic responses and no real identifiers. Pair application gating with test-browser/network egress denial of production API and conversion endpoints. Build-time environment verification alone does not prove runtime isolation.

Before any hosted review, demonstrate via request interception/network logs: zero production stats/like requests, zero credentialed production API requests, zero form submissions, zero ad conversions on initial load, navigation, keyboard submission, reset and like interaction. Test a missing/empty/misconfigured API value and API failure. No real patient information or production mutations. P9-03/04/05/09 must authorize any implementation and environment setup.

## External-resource inventory

| Resource | Trigger / current behavior | Review requirement |
|---|---|---|
| unpkg Leaflet CSS/JS | Automatic on EN/ES Contact pages; existing integrity attributes | Dependency availability, browser/network privacy, asset delivery policy; provider unchanged in Phase 7 |
| OpenStreetMap tiles | Automatic when map JS initializes and as map pans/zooms | Tile/request policy, privacy and outage behavior; no change to provider |
| Likes/views API | Automatic stats on non-localhost article pages; like/unlike requires interaction; credentials included and liked cookie may be written | Fail-closed isolation and P9-04 consent/CORS/cookie/write decisions |
| Forms | Empty POST actions and disabled submit buttons; no backend wired | Test implicit Enter, no-JS and script-driven submission against a local interception target; disabled control is not proof of complete isolation |
| Payment providers | User-initiated CareCredit and PatientNotebook links | Owner validates correct accounts/destinations; do not execute payments |
| Indeed / external resources | User-initiated careers and article/reference navigation | Owner verifies destinations; no application or login submission |
| Self-hosted media, search JSON | Same-origin assets; indexes load on demand by locale | No article bodies in search JSON; inspect locale requests without logging visitor queries |
| Contact obfuscation | Local browser decoding into tel/mailto links; activation needs user action | Preserve fallback behavior and contact values; no component rewrite |
| Advertising/analytics | No new instrumentation installed; none authorized | Review actual artifact/request log before claiming no external activity; P9-05 |

Social links and aiaprep.org references are user-initiated navigation, not evidence of an approved integration. Static SVG embedded artwork does not call an external image provider.

## Reproducible build procedure (proposal)

`package.json` requires Node >=22.12.0; `flake.nix` supplies Node 24. README's older Node 20.19/22 statement was corrected in Phase 7. No package or lockfile was upgraded.

For a separately approved clean nonproduction checkout: record signed commit, Node/npm versions and lockfile; use `npm ci`; run the sequential suites and build; store artifact checksum, build-mode/env inventory (no secrets) and audit results. Pin the operational toolchain before release. `PUBLIC_*` configuration is public, never a secret store. `PUBLIC_ALLOW_INDEXING=false` for preview; build-time indexing-enabled tests must not overwrite the final staging artifact. Canonicals continue to reference the accepted public host, not preview. Do not read/commit private `.env` values.

Use `TMPDIR=/tmp` when the Nix temporary directory is inaccessible. Existing `build:sandbox` is an environment workaround, not a new production build architecture. Use ASTRO_TELEMETRY_DISABLED=1 in automated validation; no application tracking is added. No production automation is implemented here.

## Reviewer record (all Pending)

For every row record reviewer, date, device/browser/screen reader, viewport, result, evidence link and unresolved issue. Automated HTML assertions do not fill these fields.

| Review | Routes / checks | Reviewer | Date / device / viewport | Result | Evidence / issue |
|---|---|---|---|---|---|
| Spanish policy | `/es/privacy-policy` and EN counterpart: full policy, ten sections, links, contact fallback, language switch | Pending | Pending | Pending | Privacy/legal + fluent reviewer |
| Forms | `/es/contact`, `/es/client-consultation`, EN contact/consultation/referrals: Spanish labels, disabled notice, focus, no-JS/Enter isolation | Pending | 1440px / 390px pending | Pending | Synthetic data only; request interception |
| Map | `/es/contact`: Spanish landmark, tiles/zoom/marker, keyboard and outage behavior | Pending | Pending | Pending | Third-party requests reviewed |
| Arabic archives | `/ar/library/author/rula-diab`: credentials reading order, labels, biography, section-root language links | Pending | Pending | Pending | Fluent Arabic and screen reader |
| Library tip | `/es/library/positive-reinforcement-techniques`: meaning, quotation examples and layout | Pending | Pending | Pending | Fluent Spanish and clinical/editorial |
| Phase 6C major translations | ES school readiness; AR antecedent/consequence and all three diagrams: compare English, scroll regions, tables, FAQs | Pending | 1440px / 390px pending | Pending | Do not infer review from SVG rasterization |
| Shared shell / page families | EN/ES homes, services, intake, Contact, Library, English page 6 and author page 6: skip link, disclosures, navigation, overflow, no-JS | Pending | Pending | Pending | Full-page review, not hero only |
| Assistive technology | Landmarks/headings, form labels/descriptions, map, FAQ, language navigation, RTL and diagrams with a real screen reader | Pending | Pending | Pending | Name assistive technology and version |

## Exit and stop conditions

Phase 8 needs recorded browser/accessibility results and disposition of failures. No environment is production-ready merely because the static build passes. Any real submission, production API request or tracking attempt in preview is a failed isolation check: stop testing that environment and report it. Do not repair hosting or activate integrations without a separately approved scope. P9-10 and Phase 10 govern final launch and rollback authorization.
