# Phase 9 — Decision register

Recorded: 2026-10-14 (source review began October 13). Prepared during Phase 7; no decision or integration is approved by this register. Owner roles are proposed responsibilities, not assigned individuals. Every item is **Pending decision**. A technical option is not approval; translation is not legal/clinical sign-off; browser acceptance is not deployment authorization.

## P9-01 — Landing-page ownership

- **Status:** Pending decision
- **Current implementation:** Public /lp/early-intervention; hours article provisionally points to /client-consultation; not approved equivalents.
- **Evidence:** [phase-6c5-final-library-acceptance-2026-10-13.md](phase-6c5-final-library-acceptance-2026-10-13.md)
- **Options:** Keep separate campaign ownership with an approved link; or separately scope migration/integration.
- **Risk if unresolved:** Broken campaign journey or misleading substitute.
- **Decision owner role:** Site/campaign owner
- **Required reviewers:** Privacy and marketing
- **Dependencies:** Campaign repository ownership, approved CTA and form destination
- **Acceptance criteria:** Approved route disposition and exact target; end-to-end synthetic nonproduction journey; no silent redirect.
- **Impacted routes/systems:** /lp/early-intervention; /library/how-many-hours-aba-child-need; /client-consultation
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-02 — Employee portal

- **Status:** Pending decision
- **Current implementation:** Metadata-only route; staff/management two-level workflow unresolved.
- **Evidence:** [employee-portal-migration-brief-2026-10-08.md](employee-portal-migration-brief-2026-10-08.md)
- **Options:** Owner-accepted legacy encrypted-content model after risk review; or separately designed server/edge protection with two authorization levels.
- **Risk if unresolved:** Loss of staff workflows or exposure of protected content.
- **Decision owner role:** AIA operations and portal owner
- **Required reviewers:** Privacy/security
- **Dependencies:** Protected-content inventory, access model, credential distribution/revocation
- **Acceptance criteria:** Unauthorized requests cannot obtain protected content under chosen approved model; staff/management separation, rotation and recovery tested.
- **Impacted routes/systems:** /employee-portal; clinical-operations links
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-03 — Form/API ownership

- **Status:** Pending decision
- **Current implementation:** Shared form controls disabled; empty actions; no backend.
- **Evidence:** [../src/components/FormShell.astro](../src/components/FormShell.astro)
- **Options:** Approved existing provider; or separately scoped backend with explicit ownership and data contract.
- **Risk if unresolved:** Lost inquiries, accidental collection, unsafe retention or ambiguous failure.
- **Decision owner role:** AIA intake/operations owner
- **Required reviewers:** Privacy/legal/security
- **Dependencies:** Field necessity, recipient, spam controls, retention/access, failure handling, P9-07/09
- **Acceptance criteria:** Synthetic nonproduction submission success/failure, no-JS/Enter behavior, access and retention documented; explicit activation approval.
- **Impacted routes/systems:** Contact, consultation, referrals, service drawer
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-04 — Likes/views API

- **Status:** Pending decision
- **Current implementation:** Production-origin fallback; non-localhost credentialed stats POST and interaction writes; cookies.
- **Evidence:** [../src/components/LikeViewCounter.astro](../src/components/LikeViewCounter.astro)
- **Options:** Disable in nonproduction by default; approved isolated mock/test API; production behavior only after review.
- **Risk if unresolved:** Preview mutations, credentials or tracking reach production.
- **Decision owner role:** API/service owner
- **Required reviewers:** Privacy/security
- **Dependencies:** Origin allowlist, CORS, credentials, cookies, consent, API contract
- **Acceptance criteria:** Empty/missing config fails closed; blocked production egress; read/write/outage and cookie behavior verified without production writes.
- **Impacted routes/systems:** Article counters; api.azinstitute4autism.com
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-05 — Analytics and advertising

- **Status:** Pending decision
- **Current implementation:** No new tracking installed or conversions activated.
- **Evidence:** [phase-7-nonproduction-verification-plan-2026-10-14.md](phase-7-nonproduction-verification-plan-2026-10-14.md)
- **Options:** Remain disabled; or approve consent-aware GA4/Google Ads event design and scoped implementation.
- **Risk if unresolved:** Sensitive health context transmitted or misleading conversion measurement.
- **Decision owner role:** Marketing owner
- **Required reviewers:** Privacy/legal/security
- **Dependencies:** Consent model, event payload exclusions, retention, vendor configuration, P9-07
- **Acceptance criteria:** Approved event/data inventory, consent states and test conversion destination; no PHI or free-text payloads; separate activation.
- **Impacted routes/systems:** Public pages, forms, GA4/Google Ads
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-06 — Clinical/organizational claims

- **Status:** Pending decision
- **Current implementation:** General ABA baseline 18 months–8 years; Academy 2–6/1:2; LSC 8–17; evaluation/no-waitlist/insurer/author claims need approval. Arabic biography uses physician-like wording for clinician.
- **Evidence:** [phase-6c5-final-library-acceptance-2026-10-13.md](phase-6c5-final-library-acceptance-2026-10-13.md)
- **Options:** Owner confirms each claim or supplies approved replacement wording; hold disputed substantive edits.
- **Risk if unresolved:** False eligibility/availability or professional qualifications.
- **Decision owner role:** AIA clinical/organizational leadership
- **Required reviewers:** Clinical/editorial and fluent-language reviewers
- **Dependencies:** Service facts, credentials and program-specific distinctions
- **Acceptance criteria:** Signed claim-by-claim disposition; semantic equivalence in relevant languages; no generalized age range.
- **Impacted routes/systems:** Services, homes, consultation, Library, authors
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-07 — Privacy-policy approval

- **Status:** Pending decision
- **Current implementation:** EN policy retained; ES public policy recovered with same 2025 revision date; legal claims are not verified controls.
- **Evidence:** [phase-7-source-evidence-2026-10-13.json](phase-7-source-evidence-2026-10-13.json)
- **Options:** Approve existing policy against actual operations; or provide legally reviewed EN/ES revisions and defensible dates.
- **Risk if unresolved:** Published HIPAA/COPPA/security/retention/analytics promises differ from operations.
- **Decision owner role:** AIA privacy/policy owner
- **Required reviewers:** Qualified legal/privacy and fluent Spanish reviewers
- **Dependencies:** P9-02/03/04/05 data flows and vendor agreements; trusted-source comparison of the Spanish policy before production. The captured public response is cache-qualified; standard TLS validation failed and the fallback disabled certificate verification. Text parity does not prove authenticated origin fidelity. No trusted replacement is available yet; do not repeat insecure retrieval.
- **Acceptance criteria:** Compare the complete Spanish policy with a certificate-validated public retrieval or owner-supplied authoritative source with documented provenance; record reviewer/date/evidence and resolve differences. Complete legal/privacy section/claim review of both policies, actual collection/storage/sharing evidence, authorized revision date and fluent Spanish acceptance. All remain pending.
- **Impacted routes/systems:** /privacy-policy; /es/privacy-policy
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-08 — Author archive SEO

- **Status:** Pending decision
- **Current implementation:** Self-canonical noindex,follow; sitemap/hreflang exclusions retained.
- **Evidence:** [../src/utils/publication-policy.ts](../src/utils/publication-policy.ts)
- **Options:** Retain policy; or explicitly approve future indexability and translation graph changes.
- **Risk if unresolved:** Unapproved indexing of profile claims or invalid alternate graph.
- **Decision owner role:** Site SEO/content owner
- **Required reviewers:** AIA credentials/editorial reviewer
- **Dependencies:** Profile approval, genuine translation equivalence
- **Acceptance criteria:** Separate approved policy diff with reciprocal eligible hreflang and sitemap tests if changed.
- **Impacted routes/systems:** Nine author archive routes
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-09 — Hosting and deployment

- **Status:** Pending decision
- **Current implementation:** Static output; development Nix shell only; production topology unverified; temporary slash/HTTPS chain deferred.
- **Evidence:** [SESSION_HANDOFF.md](SESSION_HANDOFF.md)
- **Options:** Owner supplies sanitized NixOS/Contabo topology; separately design isolated test host and production artifact delivery.
- **Risk if unresolved:** Redirect loops/downgrades, soft 404s, inconsistent assets or unrecoverable release.
- **Decision owner role:** Hosting/operator owner
- **Required reviewers:** Security/privacy and site owner
- **Dependencies:** TLS termination, canonical host, config/artifact ownership, isolation, rollback/monitoring
- **Acceptance criteria:** Real HTTP slashless/HTTPS/query/nine-redirect/404 tests, asset checks and rollback rehearsal; named operator.
- **Impacted routes/systems:** Contabo/NixOS/nginx; public and preview origins
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

## P9-10 — Production launch authorization

- **Status:** Pending decision
- **Current implementation:** Technical checkpoint accepted; human/integration release gates still open.
- **Evidence:** [SESSION_HANDOFF.md](SESSION_HANDOFF.md)
- **Options:** Hold release; schedule a separately approved window after all prerequisites.
- **Risk if unresolved:** Unreviewed content or unsafe/incomplete integrations reach live users.
- **Decision owner role:** AIA release/site owner
- **Required reviewers:** Clinical, editorial, language, accessibility, privacy and operations
- **Dependencies:** P9-01–09; Phase 8 acceptance; Phase 10 QA
- **Acceptance criteria:** Recorded go/no-go, owners, rollback authority/triggers, verified artifact and signed checklist; explicit deployment/indexing/integration authorization.
- **Impacted routes/systems:** Entire public site and integrations
- **Authorization required:** Explicit owner decision, then a bounded implementation/test scope; live activation/deployment requires separate authorization.
- **Resolution date/evidence:** None; not approved.

