# P9-03 source-specific implementation plan

Date: **2026-10-18** · Plan version **1.2 revision 2026-10-21** · Governing contract: [P9-03-JF-2026-10-18 v1.2](phase-9-jotform-integration-contract-2026-10-18.md).

**Planning only. Do not execute any batch from this document without separate authorization.** Phase 9 establishes decisions and bounded implementation authority. Phase 10 retains final production integration acceptance, rollback and cutover. The user stages, signs and pushes.

## 1. Actual baseline and reconciliation

Verified `faithful-astro-migration`, HEAD `59911eb929579af7bcd6c42de6476128dab62289`, clean tracked tree and empty index. Three October 17 untracked inventory artifacts exist, alongside the five exclusions and `.phase8-stage-paths.nul`. No unexpected implementation change was found. The prior 27-row owner worksheet remains blank; the current supplied connector summary is not silently written into it.

Current source-manifest construction confirmed nine eligible enquiry routes and corresponding existing generated HTML forms. Source files still match Git. No build/browser/submission test was run for this documentation-only task. Counts below are verified route mapping plus the signed checkpoint's accepted publication baseline, not new full-suite results.

| Inventory ID | Route | Source content under `www/src/content/pages` | Owning component under `www/src/components` | Target |
|---|---|---|---|---|
| F-001 | `/contact` | `en/contact.mdx` | `pages/ContactPage.astro` → `ContactForm.astro` | A EN |
| F-002 | `/es/contact` | `es/contact.mdx` | Same | A ES |
| F-003 | `/client-consultation` | `en/client-consultation.md` | `FormShell.astro` via PageLayout | B EN |
| F-004 | `/es/client-consultation` | `es/client-consultation.md` | Same | B ES |
| F-005 | `/schedule-consultation` | `en/schedule-consultation.mdx` | Same | B EN |
| F-006 | `/referrals` | `en/referrals.mdx` | Same; preserve `#form-title` | C EN |
| F-007 | `/aba-therapy` | `en/aba-therapy.mdx` | `ServiceInquiryDrawer.astro` | B EN / ABA |
| F-008 | `/autism-evaluations` | `en/autism-evaluations.mdx` | Same | B EN, availability gate |
| F-009 | `/learner-social-club` | `en/learner-social-club.mdx` | Same | B EN / Social Club |

Nine instances = 7 EN + 2 ES, three implementations. Eleven GET search instances remain separate. No Arabic enquiry form or Spanish referral route is created. EN/ES-capable logical forms do not imply new published routes.

The five imported landing-page journeys—`/lp/aba-therapy`, `/lp/aba-insurance`, `/lp/aba-ahcccs`, `/lp/aba-private-pay` and `/lp/early-intervention`—are accounted for as future Form B destinations. Their inactive consultation panels are not additional native form implementations and do not have Jotform IDs.

### Discrepancies and supersession notes

1. October 17 proposed possible event/fundraising consolidation into general enquiries. October 18 explicitly preserves the Event Submission Form separately; fundraising still needs approval. Tour currently points to consultation/B; A is provisional and requires a deliberate approved CTA disposition.
2. October 17 proposed one chosen contact channel. Current owner field proposal requires adult email for A/B, with B phone undecided. Operations must approve final requirements and contact-preference validation; do not implement the old alternative.
3. The older report allowed date/time/source notification extensions after review. Initial contract now explicitly defers them; use only the exact generic template after notification approval.
4. The older inventory knew no confirmed lead source. The supplied October 18 evidence preserves `250727122848156` as a **historical structural reference only**. The revised owner decision rejects cloning or repurposing it; it is not a validated schema or active embed destination.
5. Three multilingual forms are the new preference, including C capability. Earlier fallback five physical forms assumed C EN-only; a complete EN/ES physical fallback for all three would be six. No new Spanish route is implied or authorized.
6. The follow-up owner-supplied roster now lists all 27 unique IDs in contract section 3. IDs/titles are reported connector metadata; classifications are supplied planning categories, not verified settings or usage. Preserve the historical 27/27 ENABLED report. The October 17 worksheet remains unchanged; field/configuration and usage approvals remain pending.
7. Connector element totals are not field counts; the prompt's plain-form title contains a literal vertical bar. Record the title correctly rather than treating it as an extra table column.
8. Current “Schedule”/“Make an Appointment” headings/CTAs are not functioning booking. No calendar should be inherited. Obtain approved explanatory copy; do not silently change metadata, clinical text or publication identity.
9. Zero *new lead* production IDs/traffic in off/mock is compatible with preserving existing clinical links. A blanket assertion of no Jotform IDs anywhere would be false because `/client-forms` already links to them. Test scoped new integration isolation and preserve existing click-only workflows.

## 2. Source findings and future edit surface

All paths below are relative to repository root. Proposed additions do not exist as part of this task.

| Existing file | Current behavior | Eventual bounded treatment |
|---|---|---|
| `www/src/components/ContactForm.astro` | Lines 17–28: empty POST, disabled submit, five optional contact/service/message controls | Keep card/layout styling; delegate mode-dependent lead UI to reusable integration; remove inactive native submission surface in off mode |
| `www/src/components/FormShell.astro` | Lines 12–21: same POST pattern; outer section and `form-title` | Preserve section/background and referral fragment; pass logical form/locale explicitly |
| `www/src/components/ServiceInquiryDrawer.astro` | Empty POST, child fields, stale options/copy; ten-second modal; dismissal sessionStorage | Preserve verified native dialog unless approved otherwise; replace lead content only after copy/UX decisions; no timed vendor request |
| `www/src/layouts/PageLayout.astro` | `showForm` routes at line 15; EN-only drawers at line 81; FormShell at 82 | Explicit route→A/B/C configuration; retain publication architecture and locale guards |
| `www/src/components/pages/ContactPage.astro` | ContactForm with lang, address and Leaflet/map resources | Pass integration props if needed, preserve map provider/layout; map traffic separately blocked in controlled tests |
| `www/src/utils/form-messages.ts` | EN/ES text only; other locales rejected | Add approved mode/fallback/accessibility copy only; do not invent Arabic messages or remote-form translations |
| `www/src/scripts/forms.ts` | Unused submit-event prevention helper | Do not treat as adequate isolation; future removal/wiring only if justified by selected architecture |
| `www/src/styles/forms.css` | Existing source-faithful form styling | Narrow iframe/fallback styling only where necessary; preserve visual tokens |
| `www/.env.example`; proposed `www/src/env.d.ts` only if needed | Existing environment example; no current `src/env.d.ts` | Document optional mode default-off and type semantics if needed; no actual live IDs or credentials |
| `www/src/content/pages/en/tour.mdx` | CTA to `/client-consultation` | No route edit until Tour A/B decision approved |
| `www/src/content/pages/en/client-forms.mdx` | Clinical, Sign, CentralReach and PDF links | Preserve; not part of lead-form replacement |
| `www/reports/google-ads-consultation-conversion.md` | Accepted-API-success premise | Do not edit in this batch; future separate P9-05 contract must reconcile direct Jotform semantics |

**Proposed additions for authorized Batch C:**

- `www/src/utils/form-integration.ts`: typed logical form (`A/B/C`), locale, mode and deployment-role validation; pure functions suitable for existing Node tests.
- `www/src/data/form-integrations.ts`: explicit route mapping and build-time descriptors; no production descriptor until later approval; semantic service hints are not Jotform field keys.
- `www/src/components/FormIntegration.astro`: mode orchestration, localized off fallback and local mock selection.
- `www/src/components/JotformEmbed.astro`: reviewed iframe/fallback presentation, inactive until approved live descriptor; defer its live behavior to authorized test work if unnecessary for C.
- `www/tools/form-integration.test.mjs`: focused configuration/output tests, not full-copy snapshots.
- `www/tools/phase9-forms-browser.mjs`: guarded local runner using the established Playwright approach; test fixture served from the loopback harness or browser route interception, **not a new public production route**.

Names are proposed and may be refined in an authorized batch. No dependency, database, backend, CMS, hosting configuration or Jotform SDK is needed to prototype off/mock. Do not add API tokens to PUBLIC variables or retrieve secrets. The iframe URL itself is not a substitute for an approved contract.

## 3. Typed configuration and fail-closed behavior

Suggested mode name `PUBLIC_AIA_FORMS_MODE`; exact enum `off | mock | live`, default off. A second build/deployment-role gate must identify approved isolated-test versus approved production context. Its implementation/name needs hosting review; do not infer approval from `PUBLIC_ALLOW_INDEXING`, localhost detection or the presence of a URL.

Logical descriptor semantics: logical form key; supported locale set; reviewed accessible title; approved hosted and frame URLs; approved origin; environment role; evidence/version reference. These are application semantics, not guessed Jotform uniqueName/field identifiers. Keep original source IDs in evidence only; never use them as default URLs. Fail an explicit invalid live build rather than rendering a broken or fallback original form.

| Case | Required result |
|---|---|
| Missing, empty or unknown mode | Off/no active lead submission; report invalid config safely where appropriate |
| Off with a stray live URL | Ignore/reject without emitting URL/ID, frame, helper, preload, cookie or vendor request |
| Mock | Harness-served synthetic document only; no live configuration required or included; no external submission traffic |
| Live without approved deployment role, logical mapping, locale, exact HTTPS origin/URL or evidence | Build rejection; never silently substitute another form/locale |
| Live A, B or C configured with existing source `250727122848156` | Reject; an approved ID from a separately created blank form is required |
| Unsupported locale | No invented translation; localized approved route fallback where available, otherwise fail configuration safely |
| Approved isolated-test live configuration | Explicit test-only mapping and recipient controls; no production fallback; separate D authorization |
| Approved production live configuration | E/F authorization, correct reviewed artifact and mapping; no inference from indexing-enabled build |

For off mode prefer non-form fallback markup without editable lead controls or an enclosing native form. Removing the form surface prevents the specific `form.submit()` bypass; disabling a button or catching `submit` alone does not. Test the actual resulting DOM, not just a handler string. Do not claim protection against arbitrary malicious script execution.

Mock fixtures must be synthetic and inert to external requests, including Enter and native submission paths; Playwright aborts unapproved requests before transmission. Fixture URLs/assets must not appear in the production route manifest. Live descriptors must not leak into off/mock emitted bundles through shared imports—scan generated HTML, scripts and preload hints.

Parent component preserves approved page design, explanatory text, iframe title, hosted fallback and responsive width/height. Cross-origin child labels/errors must be verified in Jotform; Astro locale and CSS do not localize/fix them. No guessed `?language=es`, hidden-field mapping, completion event or helper script. Loading/error UI must not claim it can inspect the child DOM. A frame load is not proof of availability or accepted submission.

Drawer decision is a prerequisite for replacing its live content: retain timer only if approved and incapable of loading vendor resources without the approved trigger; otherwise use an explicitly approved open/load interaction or full-page fallback. Preserve Escape/initial focus/restoration and test cross-origin focus boundaries. No wholesale dialog replacement.

## 4. Builder review and blank-form creation prerequisites

Use [JF-01–09 and owner gates](phase-9-jotform-verification-checklist-2026-10-18.csv). All start Pending/Unverified. Verify the blank-form Builder settings in A/B before any synthetic test; no existing form is a source for inheritance. Runtime portions of JF-03/08 remain open until D.

Before any creation, approve an account process that creates exactly three disabled blank forms, prevents public access and live notifications, and records the new IDs only after the account owner confirms the forms are isolated. Configure minimum fields, PHI protection, generic notifications, confirmation behavior and no-forwarding settings explicitly. Do not copy/import fields, settings or submissions from existing forms. If safe isolation cannot be established, stop before creation.

Review all default/hidden fields, protected flags, conditional routing, reply-to, subjects, attachments, staff recipients, autoresponders, integrations, webhooks, exports, save/continue, limits, duplicates and access/retention. Inspect actual thank-you behavior and ensure answer echo and HTTP POST forwarding to Astro/Contabo are off. Generic notification setup itself requires authorized Jotform mutation; no “test email” to inherited recipients before review.

The owner separately reports that the existing `AIA Lead Generator | plain` form has had field PHI protection enabled, automatic email-template updates disabled, autoresponder content revised to exclude submitted PHI, Spanish autoresponder behavior checked, delivery tested and its generated PDF attachment removed. Treat this as owner-reported remediation only. It does not audit historical recipients, access, retention, other legacy forms or HIPAA compliance, and it does not make that form a source for A/B/C. No submissions or historical emails are to be retrieved in this planning document.

## 5. Independently authorizable batches

### Batch A — Final form specifications

- **Objective:** close configuration knowledge gaps and secure owner decisions, not change forms.
- **Authorization:** explicit read-only Builder/metadata review scope. No credentials or submissions requested; owner may provide sanitized screenshots/exports. Use the complete roster in contract section 3; verify uncertain generic titles and relevant configuration without retrieving answers or assuming operational usage.
- **Owners/dependencies:** account owner, operations, clinical, privacy, EN/ES reviewers; JF-01–08 configuration portions, OA-01–05; P9-01 Tour/campaign boundaries where relevant.
- **Outputs:** versioned semantic field map, approved options/required flags, notification contract, eligibility/form decision, blank-form creation procedure, language/embed uncertainties. Update only separately authorized evidence/ledger files.
- **Acceptance:** distinguish static elements from fields; every proposed field mapped or explicitly pending; no guessed internal IDs or locale behavior. Required callback/contact expectations approved.
- **Stop:** before any form creation/editing, tests generating notifications, or production mapping.

### Batch B — Create three blank Jotform forms

- **Objective:** create exactly three purpose-built disabled forms from blank forms: A General Enquiries, B Service Consultations and C Professional Referral Initiation.
- **Authorization:** explicit Jotform mutation permission naming the three forms, account owner, reviewers, environment, isolation steps, proposed settings and stopping conditions. The historical `250727122848156` form is not a source and must not be cloned or repurposed.
- **Prerequisites:** Batch A field decisions; account/privacy owner available; approved test recipient roles; blank-form creation confirmed; no production form is edited.
- **Systems:** new Jotform forms and sanitized provenance documents only. Preserve all 27 existing assets, including clinical, agreement, event and operational workflows.
- **Acceptance:** record actual new IDs, blank-form provenance, protected fields, generic notification, no booking/child identifiers, no PHI forwarding, no Google integration, and no inherited recipients/conditions/attachments/redirects. JF-01–08 are verified for each new form.
- **Stop:** new forms remain disabled and unembedded; no synthetic submissions unless Batch D is separately authorized.

### Batch C — Local-only Astro off/mock integration

- **Objective:** implement typed mode boundary and source-faithful inactive/mock presentation on existing routes.
- **Authorization:** explicit repository implementation scope; **no Jotform account mutation or external form requests**. Can begin independently of B after minimal fallback/form/UX decisions; no fabricated schema may substitute for A.
- **Files:** proposed files in section 2; bounded edits to ContactForm/FormShell/PageLayout/drawer, form-messages and styles; environment example/types only if needed. Preserve ContactObfuscation, search, map provider, content metadata and publication policies.
- **Suggested first code slice:** configuration + `/contact` and `/es/contact` off/mock with inert fallback, then remaining seven instances in a separately reviewed continuation. Report partial coverage honestly until all nine are protected. First slice must not claim a whole-site form-isolation guarantee.
- **Acceptance:** off no POST surface or vendor hints; local mock; EN/ES fallback; invalid configuration tests; guarded Chromium checks and existing regression suites. No live IDs in emitted new lead integration.
- **Stop:** reviewable unstaged local changes and evidence; no hosted preview, live descriptors or account use.

### Batch D — Isolated synthetic Jotform integration and accessibility

- **Objective:** verify JF-09 and runtime JF-03/08 with actual approved isolated form(s).
- **Authorization:** separately approve test form IDs, origins, environment, synthetic input set, notification recipient roles, permitted methods/network destinations and test window. This is not covered by GET-only prior browser authorization.
- **Prerequisites:** Three blank forms created and their configuration review recorded in B; C mode guards; operations/privacy/language settings approved. Use loopback preview, exact test-only allowlist; production counters/maps/Google/unrelated resources blocked.
- **Acceptance:** actual EN/ES submit/error/cancel/retry behavior; delivered generic emails and headers inspected in a controlled workflow; no answers/identifiers/attachments; no Contabo forwarding; iframe/fallback, keyboard, real screen reader where available, 200%/400% zoom, slow/offline/block scenarios. Use no real patient data; retain only sanitized results.
- **Stop:** test-form evidence and remaining gates; no production IDs or deployment.

### Batch E — Approved production mapping and staged-site integration

- **Objective:** prepare reviewed production lead descriptors and page integration without activating them.
- **Authorization:** separate approval of exact IDs, origins, locales, recipients, privacy/security/operations decisions and static artifact scope. “Staged-site” means a proposed release artifact unless a hosted preview is separately authorized; it never means permission to use Git staging.
- **Prerequisites:** A–D evidence, OA-01–05 and OA-07, JF settings stable, Tour/evaluation/payment decisions resolved. P9-04 preview isolation remains separate.
- **Files/systems:** approved typed mapping, reviewed components/messages, tests and configuration documentation; no nginx/DNS/API changes. Isolated-test and production IDs must be explicitly distinguished.
- **Acceptance:** all nine instances mapped, controlled comparison with approved forms, production-mode artifact inspected without browser egress, normal staging still off; no original-form fallback or publication changes.
- **Stop:** release-candidate review. No live submissions, notification activation, deployment or indexing activation.

### Batch F — Phase 10 production acceptance, release and rollback

- **Authorization:** explicit Phase 10 go/no-go, operator, environment, form activation, approved synthetic operational test and rollback window. Not authorized by this plan.
- **Prerequisites:** pending human accessibility/visual/language/clinical/privacy reviews, P9-01/03/04/07/09/10 dispositions, hosting validation and release authority. Measurement can remain off.
- **Acceptance:** correct HTTPS/CSP/referrer/log boundaries, actual approved integrations, failure monitoring, reproducible artifact, route/SEO policies, safe rollback of both Astro and Jotform configuration, named responder. Raspberry Pi fallback requires its own verified parity/security plan.
- **Stop:** only the explicitly approved operational scope; no automatic ads activation or campaign changes.

### Batch G — Separate conversion measurement under P9-05

- **Authorization:** explicit P9-05/P9-07 approval of vendor data flows, consent, event semantics and tests. Independent of form planning; not required to launch an approved untracked enquiry flow.
- **Prerequisites:** supported evidence of accepted Jotform submission and duplicate handling; no invented cross-origin event. Existing Ads IDs are documentation only.
- **Acceptance:** local mocks first, no CTA/open/load/failed-submit conversions, no answer/identifier leakage; any vendor-network test separately authorized.
- **Stop:** measurement review before tag installation/activation. No GA4/GTM/Ads/remarketing/enhanced-conversion code in Batches A–F by implication.

## 7. Future test matrix and validation procedure

These are specifications for later tests, not test results or executable code added now.

| Test ID | Required assertion | Where / authorization |
|---|---|---|
| FT-01 | Missing/empty/invalid mode defaults safely; explicit invalid live config rejected | Pure config tests, C |
| FT-02 | No native lead form or active POST in off; Enter/native submit/requestSubmit cannot use an inactive lead surface | Rendered DOM + guarded browser, C; do not merely assert disabled button |
| FT-03 | Off/mock new integration emits no source/live ID, iframe URL, helper/preconnect or external request | HTML/bundle scan + network ledger, C; existing clinical links scoped separately |
| FT-04 | Exact nine route mappings and EN/ES behavior, no invented AR/C-ES publication | Existing manifest/content tests, C/E |
| FT-05 | Mock local-only, no external endpoints, realistic synthetic errors and completion without tracking | Loopback harness, C |
| FT-06 | 320/390/768/1440, actual 200%/400% zoom, text/reflow, named iframe/fallback, long labels | Guarded Chromium; record browser/device/zoom method, C/D |
| FT-07 | Keyboard, focus entry/restoration, Escape, scrolling, drawer timer does not load vendor resources | C/D; UX decision required |
| FT-08 | Missing/invalid ID/locale, iframe blocked/unavailable/slow, offline, JS-disabled fallback | C/D; no guessed language parameter |
| FT-09 | Screen-reader names/errors/confirmation and EN/ES review | D + human reviewers; remains Pending if unavailable |
| FT-10 | Actual approved synthetic success/failure, email privacy/headers, no identifiers/attachments/POST forwarding | D only, JF-09; protected data never used |
| FT-11 | No production Jotform, Contabo form POST, Google/GA4 or counter traffic outside explicitly approved test endpoints | C/D guarded request ledger; attempted versus transmitted distinguished |
| FT-12 | No booking, child identifiers, unapproved service/payment/location/claim inheritance in approved form copy | A/B schema/copy review; D rendered confirmation |
| FT-13 | No conversion on click/load/start/failure/thank-you replay/untrusted message | G only; supported success contract required |
| FT-14 | Clinical/Sign/CentralReach paths, search and publication invariants unchanged | Existing link/publication suites, C/E |

Existing test/tooling hooks: `www/tools/publication.test.mjs`, `seo.test.mjs`, `library.test.mjs`, `phase8.test.mjs`, `playwright-smoke.mjs` and Phase 8 guarded runners. Extend focused tests; do not duplicate 122 complete page snapshots. Do not put a mock fixture in the published collection or add a production route just to test it.

After an authorized implementation batch, run sequentially from `www`:

```sh
npm run check
npm run test:markdown
npm run test:publication
npm run test:seo
npm run test:library
npm run test:routes
node --test tools/phase8.test.mjs
# Run the approved new form tests and guarded browser runner once implemented.
npm run build
PUBLIC_ALLOW_INDEXING=true npm run build
npm run audit:links
npm run audit:images
npm run audit:blog
npm run build
```

Use `TMPDIR=/tmp` for affected fixtures where needed. No network submissions during normal builds/tests. Keep mode off except explicit mock tests; indexing-enabled build is not live-mode approval. Expected unchanged: 122 routes/canonicals, 108 indexing sitemap URLs, 180 hreflang links/55 routes, 25 translation sets, 74 Library articles, search 55/12/7, nine archives/nine redirects, 182 FAQs across 30 articles. Final staging 122 `noindex,nofollow`, empty sitemap/no hreflang. Existing Phase 8 counts (156 tests) are history, not future totals to force.

Source changes require a newly named offline reconciliation using explicit final Phase 8 evidence `reports/route-reconciliation-2026-10-15-offline-18-21-22-820Z.json`, preserving all history and excluded files. Verify the actual new artifact explicitly with `--check --evidence`; no unrestricted crawl. Documentation alone does not require a new reconciliation. Finish `git diff --check`, source/status/index review; no staging/commit by Codex.

## 8. Remaining approvals, evidence and next action

First recommended authorized batch: **Batch A**, final blank-form specifications and owner field approval, using the now-complete owner-supplied 27-asset roster as historical context only. First safe **code** batch is C's off/mock contact slice after its explicit authorization; it can avoid external account changes while B is pending, but cannot invent Jotform settings.

Owner ledger OA-01–08 and JF-01–09 are all Pending/Unverified in the companion CSV. Pending facts include actual new-form question IDs/types/defaults/options, PHI flags, conditional routing, real translations/locale URLs, email recipients/templates, integrations/webhooks/exports, thank-you/POST behavior, security/retention/access, blank-form isolation and supported success signaling. No new production embed ID exists. Final field approval and creation of A/B/C are pending. Tour/event/fundraising separation must be retained.

Any approval record must identify approver role, date, exact form/environment/version, sanitized evidence and scope. An account label ENABLED, a BAA, a successful static build or a generic vendor help article cannot close these gates. Keep the real screen-reader, authorized visual/non-Chromium, fluent-language, clinical, financial and policy/source-provenance requirements from SESSION_HANDOFF.

## 9. Documentation-only validation record

Preflight branch/HEAD/index checked; three October 17 artifacts present; their contents preserved. Reconciled nine F IDs against current source manifest and generated form instances; seven EN/two ES, no AR, eleven search forms excluded. All 27 reported assets are now individually listed in contract section 3 with 27 unique IDs; metadata provenance and supplied planning classifications are distinguished from unverified Builder settings and operational usage. All reference IDs labeled source-only; no production mapping created. No Builder gate marked verified.

Validation passed: local Markdown links, balanced code fences and whitespace; 18 unique checklist gates all Pending/Unverified (INV-01 retains configuration/usage verification, while roster receipt is recorded in its evidence) with blank approval dates; unchanged hashes for the three permitted October 17 inventory artifacts; unchanged tracked files; empty index; and `git diff --check`. Protected exclusions were not hashed or read. This task creates only the two October 18 Markdown documents and sanitized checklist CSV. No account mutation, form creation, submission/network POST, tracking, hosting change, build or deployment is performed. No historical document or living handoff is advanced. Protected exclusions and prior staging aid are neither read nor changed.

Roster reconciliation, version 1.1: only the October 18 contract, plan and checklist were updated. The individual inventory gap is closed by owner-supplied metadata; no JF or owner approval is closed and no implementation batch is executed.

Decision revision, version 1.2, 2026-10-21: the owner superseded the working-copy proposal with three new blank Jotform forms. Batch A now finalizes specifications, Batch B creates the three disabled forms only after explicit mutation authorization, and later batches retain off/mock/live safeguards. The 27-form legacy roster and all existing workflows remain historical/operationally independent. No source components, tests, Jotform forms or production systems were changed.
