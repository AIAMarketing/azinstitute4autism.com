# P9-03 Jotform integration contract

**Contract ID:** P9-03-JF-2026-10-18 · **Version:** 1.1 · **Date:** 2026-10-18

**Status: documented planning architecture; implementation and activation NOT authorized.**

This is the authoritative P9-03 planning contract for the owner decisions supplied on October 18. It supersedes conflicting *proposals* in the [October 17 inventory](phase-9-form-entry-point-inventory-2026-10-17.md), without rewriting that historical record. It does not supersede project policy, approve clinical/legal content, close the Phase 9 register, or authorize production changes. Future changes require an explicit owner decision, a version/change record and evidence links. Version 1.0 records the original planning instruction; version 1.1 adds the owner-supplied complete roster without changing decisions or approvals; no future commit SHA is invented.

Companions: [source-specific implementation plan](phase-9-jotform-implementation-plan-2026-10-18.md), [verification and approval ledger](phase-9-jotform-verification-checklist-2026-10-18.csv).

## 1. Verified repository and evidence provenance

Branch `faithful-astro-migration`; actual HEAD `59911eb929579af7bcd6c42de6476128dab62289`, matching the reference signed Phase 8 checkpoint. Tracked tree and index clean at start. Nine pre-existing untracked files: the three October 17 inventory artifacts, the five protected exclusions and `.phase8-stage-paths.nul`.

The three local artifacts exist: [inventory report](phase-9-form-entry-point-inventory-2026-10-17.md), [entry CSV](phase-9-form-entry-points-2026-10-17.csv), [account worksheet](phase-9-jotform-owner-worksheet-2026-10-17.csv). The CSV has 2,140 rows including nine enquiry instances and eleven non-lead search instances; the account worksheet has 27 blank metadata rows, not a completed account audit. These files were not part of the inspected checkpoint and remain unchanged.

Current component inspection and the existing publication-manifest utilities confirm the nine published enquiry routes below. Existing generated HTML agrees with their native empty-action POST forms. This is not a new browser or submission test. No account tools, production forms, submissions, patient records, credentials or private configuration were accessed in this documentation task. Official public help documentation was retrieved read-only; that is not account verification.

Evidence classes must remain distinct:

| Class | Source | Permitted conclusion |
|---|---|---|
| Owner decision | October 18 user instruction | Approved planning direction, not implementation authority |
| Owner-confirmed account fact | Same instruction | Gold, HIPAA enablement, signed BAA, 27/100 slots; not independently audited |
| Reported connector observation | User-supplied summary of read-only ChatGPT Jotform inspection on 2026-10-18 | Reported asset IDs/titles/status/labels/counts; no Builder configuration guarantees |
| Repository observation | Current source, local inventory, publication manifest and existing HTML | Actual local route/component behavior |
| Vendor documentation | Official links in section 12 | General capability and cautions, not proof of AIA settings |
| Pending verification | JF and owner gates | No approval or successful test may be inferred |

## 2. Established owner decisions

- AIA uses Jotform Gold with HIPAA enabled and a signed Jotform BAA; 27 of 100 form slots are occupied. Existing clinical/operational workflows must remain intact.
- **All public lead submissions go directly to Jotform.** No Contabo submission proxy, PHI-bearing webhook, completed form-data forwarding or clinical-document transfer to Contabo.
- Prefer iframe presentation, preserving Astro design and locale behavior; use a hosted form fallback where embedding is unsuitable.
- Use three logical forms: **A General Enquiries, B Service Consultations, C Professional Referral Initiation**. Prefer one EN/ES multilingual physical form for each where verified; separate EN/ES copies are a fallback requiring approval.
- Form B uses a future separately authorized working copy of **AIA Lead Generator | plain**, source ID `250727122848156`. The original is reference-only and must not be modified, cloned, disabled, deleted or repurposed during this task. No working copy exists or is authorized by this contract.
- No appointment booking in initial consultation forms. Staff contact the family to arrange follow-up.
- Begin with the generic Jotform notification in section 8, subject to actual settings/recipient/privacy review. Timestamps and campaign labels are deferred.
- GA4, Google Ads, GTM, remarketing, enhanced conversions and user-data collection remain disabled/unapproved.
- Contabo static hosting and approved non-PHI API functions, with Raspberry Pi fallback, remain planning preferences—not verified topology or deployment instructions.

## 3. Account assets and accounting for all 27

The user reports that all 27 assets were classified and ENABLED during the October 18 connector inspection, without retrieving submitted answers. Enabled is an observed status at that time, not approval to use the asset.

| Asset | Reference-only form ID | Connector elements | Disposition |
|---|---|---:|---|
| AIA Lead Generator | `250207157108146` | 22 | Promotional/structural comparison only; legacy service/waitlist/age claims not approved |
| AIA Lead Generator &#124; plain | `250727122848156` | 16 | Selected structural source for a future authorized **copy**, never the original live embed |
| AIA Client Consultation Form | `231638510219149` | 16 | Operational reference; not selected source; booking/address/child fields not inherited |
| AIA Event Submission Form | `242248780044153` | 12 | Separate event-calendar request/approval workflow; preserve, do not merge into A |
| Other clinical/operational assets, combined | 23 additional IDs listed below | Not supplied | Preserve all; no proposed initial-lead reuse |
| **Total** | **27 individually listed below** | Not summed as input fields | All reported ENABLED; full configuration unverified |

### Complete owner-supplied asset roster

The owner supplied this complete list as a follow-up to the October 18 read-only connector inspection. IDs and titles are **reported account metadata from that inspection**, not independently re-queried in this reconciliation. The prior report that all 27 were ENABLED is preserved as historical metadata, not current availability or use authorization.

Classifications are the **owner-supplied planning categories**, not verified Jotform administrative fields or proof of operational usage. They may reflect title-based interpretation; no additional usage is inferred here. Parenthetical descriptions in the two generic “Form” entries are preserved exactly as supplied and may be descriptive annotations rather than literal Builder titles. Their exact Builder titles remain subject to verification. In particular, “Unclassified” and “placeholder candidate” do not establish that an asset is unused or safe to delete.

| Reference-only form ID | Supplied classification | Supplied form title |
|---|---|---|
| `232985535203155` | Agreement | AIA Visitor Confidentiality Agreement Form |
| `240620332314138` | Clinical operations | AIA Clinical Manager Daily Line-Up AM Report - Scottsdale |
| `240936470111146` | Billing | AIA Client Late Billing Form |
| `240619052715150` | Clinical operations | AIA Clinical Manager Daily Line-Up PM Report - Scottsdale |
| `231638510219149` | Lead candidate | AIA Client Consultation Form |
| `232905007988161` | Agreement | ABA Intake Agreement Form |
| `232841161148048` | Clinical assessment | AIA Learner Pre-Assessment Form |
| `250727122848156` | Lead candidate | AIA Lead Generator &#124; plain |
| `232908888347170` | Agreement | AIA Learner Social Club Intake Agreement Form |
| `240620858181153` | Administration | AIA Monthly Clinical Administrator Supply Order Report |
| `242248780044153` | Event workflow | AIA Event Submission Form |
| `240620359815153` | Clinical operations | AIA Daily Clinical Administrator Line-Up Report - Scottsdale |
| `253627035160047` | Training | Form (RBT Training Documentation) |
| `241344474497161` | Billing | AIA Claims Billing Daily Line-Up PM Report |
| `250207157108146` | Lead candidate | AIA Lead Generator |
| `250215235488052` | Unclassified | Form (two-element placeholder candidate) |
| `241348621585157` | Billing | AIA Accounts Billing Daily Line-Up PM Report |
| `241088352323149` | Clinical operations | AIA Clinical Client Advocate Supervisor Daily Line-Up PM Report |
| `233248580388162` | Agreement | PSY Intake Agreement Form |
| `233298119061153` | Clinical assessment | AIA Psychological Pre-Assessment Form |
| `241336917832157` | HR operations | AIA Recruiting Daily Line-Up PM Report - Scottsdale |
| `240778894757176` | HR operations | AIA Job Requisition Form |
| `241336553202144` | HR operations | AIA Human Resources Daily Line-Up PM Report |
| `241468586261161` | Administration | AIA Operations Monthly Line-Up PM Report |
| `242029552135148` | Marketing operations | AIA Marketing Monthly Line-Up PM Report |
| `242236946264158` | Administration | AIA Technology Request Form - Scottsdale |
| `240728578023156` | Administration | AIA Maintenance Request Form - Scottsdale |

Validation: **27 rows, 27 unique IDs**. The four previously identified assets are included; the other 23 are now individually listed. The individual roster is no longer outstanding. This fills the metadata inventory gap only: JF-01 through JF-09 and all owner approvals remain pending. The October 17 worksheet and source evidence are preserved unchanged.

`250727122848156` is the selected **source-template ID only**, never an approved production embed ID. Preserve every listed clinical, agreement, billing, event, HR, administrative and other operational workflow; no classification permits modification, repurposing or deletion. This roster contains no submitted answers, patient data, submission metadata or inferred field-level configuration.


The plain form's reported update timestamp is `2026-05-07 22:27:30`, timezone unknown. Element counts include headings/static content/buttons and are **not input-field counts**. Its reported input labels are Full Name, Phone Number, E-mail, Service Interest, Location Interest, Insurance & Payment Options, How Did You Hear About Us?, Child's Name, Child's Date of Birth, Child's Age, Additional Information/Comments. These labels do not establish types, IDs, required flags, defaults, PHI settings or option values.

The operational consultation form includes adult contact/service/payment, child name/age, appointment date/time, address, area, source and comments. None is adopted merely because present. The richer Lead Generator's broad children/teens and service/waitlist claims require current organizational review.

**No production embed ID is assigned for A, B or C.** All four existing IDs above are evidence references only. The source B ID must be rejected as the future B working-copy/live mapping. Account slot availability is not creation permission; three new forms would provisionally mean 30/100, while six separate EN/ES forms would mean 33/100, subject to actual reuse and account-limit verification.

## 4. Proposed semantic field contracts

Names below are domain semantics only, **not Jotform question IDs, uniqueName values, URL-prefill keys or actual schemas**. Operations, clinical and privacy approval remain pending.

| Form | Semantic field | Proposed requirement |
|---|---|---|
| A | adult_name | Required |
| A | adult_email | Required |
| A | adult_phone | Optional |
| A | inquiry_type | Required controlled selection: general; tour only after workflow approval |
| A | preferred_contact | Optional; define valid choices and phone/email consistency |
| A | message | Omit by default; add only with explicit approval |
| A | source_code | Deferred; absent initially |
| B | adult_name | Required |
| B | adult_email | Required |
| B | adult_phone | Operations decision pending; no implied default requirement |
| B | service_interest | Required, approved controlled selection |
| B | payment_category | Optional, approved categories only |
| B | service_area | Optional city/area; not full address |
| B | preferred_contact | Optional; define consistency with available contact fields |
| B | message | Prefer omitted; owner review |
| B | source_code | Deferred; absent initially |
| C | professional_name | Required |
| C | organization | Required |
| C | work_email | Required |
| C | work_phone | Optional |
| C | referral_service | Required, approved controlled selection |
| C | referral_notes | Omit by default |
| C | source_code | Deferred; absent initially |

**A:** General website/contact enquiries; Tour only if approved. Fundraising and other organizational types require explicit additions. Existing event workflow is not included. No child name/DOB, diagnosis, records, address, calendar or unnecessary free text.

**B:** Consultation for ABA, Learner Social Club, approved evaluation availability, and approved commercial/AHCCCS/private-pay branches. Proposed service semantics: `aba`, `learner_social_club`; `autism_evaluation` only after availability review; `other` only if approved. General ABA baseline: **18 months through eight years**. Learner Social Club: separate **private-pay program ages 8–17** per owner direction. Academy-specific ages/ratios are not generalized to either form. No automatic carryover of Tricare, CareCredit, Glendale, waitlist, enrollment or guaranteed-admission claims. Payment/service-area options need current operational approval.

B excludes child name, exact DOB, diagnosis, clinical history, records/uploads and appointment calendar unless separately approved within an appropriate protected workflow. Staff arrange follow-up; no promise of a booked appointment. Existing booking-oriented site headings are an editorial approval item, not permission to silently rewrite metadata or body content.

**C:** New dedicated form only after creation authorization. Initial professional contact, not patient-record transfer. No patient name/DOB, diagnosis narrative, medical document or protected case detail. Detailed referral belongs in a separately approved protected workflow. Existing clinical/CentralReach paths remain unchanged.

Treat submitted contact information and any approved free text as protected unless the privacy owner explicitly determines otherwise. Required-field proposals do not justify exposing values in email. If a visitor chooses phone contact without supplying a phone number, define an approved conditional validation or fallback rather than inventing behavior.

## 5. Reconciled Astro route mapping

Cross-checked against F-001–F-009 in the local CSV, current source and eligible publications. Paths below are relative to `www`.

| ID | Published route | Locale | Current owner | Target |
|---|---|---|---|---|
| F-001 | `/contact` | EN | `src/components/ContactForm.astro:17`, via `components/pages/ContactPage.astro:19` | A |
| F-002 | `/es/contact` | ES | Same, explicit locale | A ES |
| F-003 | `/client-consultation` | EN | `src/components/FormShell.astro:12`, `layouts/PageLayout.astro:15,82` | B |
| F-004 | `/es/client-consultation` | ES | Same, explicit locale | B ES |
| F-005 | `/schedule-consultation` | EN | Same FormShell | B |
| F-006 | `/referrals` | EN | Same FormShell; CTA `#form-title` | C |
| F-007 | `/aba-therapy` | EN | `src/components/ServiceInquiryDrawer.astro:71`, `layouts/PageLayout.astro:81` | B / approved ABA context |
| F-008 | `/autism-evaluations` | EN | Same drawer | B only after availability/copy approval |
| F-009 | `/learner-social-club` | EN | Same drawer | B / approved Social Club context |

Three implementations, nine instances: seven EN, two ES, zero AR. Eleven GET search instances are not lead forms and must not be disabled or routed to Jotform. No new Arabic form or translated publication is authorized. Spanish service pages currently use Spanish consultation CTAs, not drawers. Arabic visitors retain established English fallbacks and clear language notices. All three logical forms prefer EN/ES capability, but no Spanish referral page or new route is implied.

Tour's actual CTA currently goes to `/client-consultation` (B destination). A is the provisional proposed Tour mapping, **not a completed route change**. Fundraising awaits owner confirmation. Historical event requests remain separate; do not reinterpret the historical Eventbrite link as the account's Event Submission Form without evidence. `/client-forms` retains existing clinical, agreement, Sign and CentralReach links. The six repository-linked Jotform destinations are not automatically matched to the four named account assets.

`/lp/early-intervention` and the provisional local `/client-consultation` substitution remain P9-01 decisions. Campaign landing pages outside this repository are out of scope. Phone/email legacy-target issues in the inventory remain unresolved; no target is silently replaced.

## 6. Verification gates — all Pending / Unverified

The connector supplied titles, IDs, enabled status, timestamps, labels and limited summaries—not a full Builder audit. Each gate must record the exact source/working-copy ID, reviewer, date, sanitized evidence and disposition. A source-form finding does not automatically pass the corresponding working-copy gate.

| Gate | Required verification | Owner / evidence |
|---|---|---|
| JF-01 | Types, required flags, defaults, exact options, visibility, internal identifiers, field-level PHI | Account owner + operations/privacy; Builder properties, no answers |
| JF-02 | Show/hide, skip, calculations, update-field logic, conditional recipients and submission routing | Account owner; sanitized Conditions settings |
| JF-03 | EN/ES support, complete translation, default/selector, errors, conditional logic, confirmation and embed locale behavior | Account owner + fluent reviewers; Builder plus later authorized runtime tests; never assume `?language=es` |
| JF-04 | Notifications/autoresponders, recipient roles, subject/body/dynamic tags, attachments, reply-to, conditional routes, default IDs/links, cloned production recipients | Account/privacy owner; sanitized settings, no recipient addresses in public reports |
| JF-05 | Native confirmation, redirects, answer echo, all targets, HTTP POST forwarding | Account/privacy owner; Builder; **submission-data POST to Astro/Contabo OFF** |
| JF-06 | Integrations, webhooks, exports, destinations, Google/analytics, protected-data flows | Account/security/privacy owner; actual integration inventory, not cloning assumptions |
| JF-07 | HIPAA/form/field protection, spam, availability, prefill, save/continue, access, retention, limits and duplicates | Account/privacy/security owner; settings and approved operational policy |
| JF-08 | Approved HTTPS origin, hosted/iframe URLs, dimensions/mobile, scripts, referrer, locale and fallback | Account/hosting/accessibility owners; exported code and later authorized runtime evidence |
| JF-09 | Actual EN/ES synthetic submission, notifications, success/failure, redirects and privacy boundary | **Later separately authorized** isolated form/environment; never real patient data |

No JF gate has passed. Read-only Builder review may complete configuration portions of JF-01–08; runtime portions remain pending until explicitly authorized. Generic vendor documentation does not close a gate. The [CSV ledger](phase-9-jotform-verification-checklist-2026-10-18.csv) also tracks owner approvals and the supplied complete roster and its pending configuration/usage verification.

## 7. Future integration-mode contract

Suggested semantic setting: `PUBLIC_AIA_FORMS_MODE`, exact values `off`, `mock`, `live`; typed build-time configuration, default **off**. Missing/invalid values must fail closed; explicit invalid live configuration should fail the build with a non-sensitive error. Do not infer mode from a URL, hostname, indexing setting or original source ID.

| Mode | Required behavior |
|---|---|
| off | No active lead form/empty POST action, live iframe, Jotform preconnect/helper/network request, or analytics. Render approved localized contact fallback; no native-submit bypass on inactive lead UI |
| mock | Synthetic local-only fixture, no external endpoint or real data; safe guarded Playwright use; no Jotform ID required |
| live | Separate owner/deployment approval; exact approved IDs/HTTPS origins/URLs and build/deploy gate; no automatic original-form fallback. Distinguish authorized isolated test form from authorized production form |

Off/mock output must not contain **new lead embed IDs/URLs or the B source-template ID** in HTML, scripts, preload hints or client bundles. Existing clinical/Sign links intentionally remain in the site; they already contain production destinations. Preserving them conflicts with a blanket “no production ID anywhere” assertion, so this contract's new-embed restriction is scoped to the new lead integration. Existing user-initiated clinical navigation is not permission for automatic loading or test submissions. Do not claim the whole site has zero vendor destinations.

A separately approved isolated test can exercise live integration capability with **test-only mappings** and controlled notifications. Normal staging defaults off and cannot inherit production mappings. `PUBLIC_ALLOW_INDEXING` is independent and provides no privacy isolation. Forms modes do not change the separate likes/views API policy or existing map resource behavior; guarded tests still block those endpoints.

Reusable iframe requirements: exact approved HTTPS origin and URL, localized accessible title, responsive width and tested height, visible hosted fallback, loading/error explanation, mobile scroll, keyboard/focus support and minimal permissions. No arbitrary queries, unreviewed helper scripts, guessed language keys or untrusted cross-origin events. Frame `load` is not success. CSP/referrer policy require review; a parent policy does not control all resources inside the cross-origin document. Do not introduce a Contabo CORS proxy.

The existing ten-second drawer timer must not cause Jotform loading without explicit UX/privacy approval. Retention of auto-opening, explicit open and click-to-load are pending options. No wholesale dialog redesign is authorized. If embedding cannot satisfy usability/accessibility/privacy, use the approved hosted fallback.

Answers must not enter Astro handlers, Contabo endpoints, unreviewed webhooks, redirect URLs, analytics, Google tags or application/server logs. No arbitrary UTM/referrer/query/visitor text forwarding. Source codes, persistence and campaign mappings are deferred. Static-host access logs still require review for inbound query strings even when answers stay in Jotform.

## 8. Initial notification contract

Proposed exact initial template (activation still pending JF-04 and privacy approval):

```text
Subject: New AIA form submission

A new form submission has been received.
Sign in to AIA's authorized Jotform account to review it.
```

No dynamic answer tags, PDFs or other submission attachments, respondent reply-to, patient/family names, submitted email/phone, clinical data, submission ID, individual submission/edit link, unreviewed CC/BCC or automatic forwarding of responses. Do not disable PHI protection to expose a field. Check sender, headers, footer, hidden/default fields and all-field tokens as well as visible body. Arizona-local date/time and source/campaign labels are **deferred**, not optional additions for the implementer. No respondent autoresponder is authorized by this generic staff notification.

Jotform's [HIPAA email guidance](https://www.jotform.com/help/504-how-to-use-notification-and-autoresponder-emails-in-hipaa-accounts/) describes excluding protected fields; its [field-protection guidance](https://www.jotform.com/help/518-How-to-set-PHI-fields-on-your-forms/) requires proper field classification. These do not prove a current template is safe. Inspect the actual copy, approved recipient roles and delivered synthetic message later. Never create a Contabo webhook receiving full answers to generate a generic email.

## 9. Working-copy safety and success measurement

No working-copy creation or original mutation is authorized now. A later permitted copy must first be isolated from public access and live notifications/automations using an account-owner-approved process. If immediate isolation cannot be established safely, stop rather than creating an exposed copy. Verify settings before opening/filling it; do not test inherited recipients to discover where mail goes.

The official [cloning guide](https://www.jotform.com/help/27-how-to-clone-an-existing-form-from-your-account/) warns that email settings, including recipients, and several workflow/thank-you settings are copied. It also describes encryption-related changes and differing treatment of integrations/payment connections. This is a reason to audit the actual copy, not a guarantee of AIA's exact copy behavior or HIPAA configuration. Never copy submissions. Capacity and “Clone of” naming do not establish a safe development environment.

The [Ads handoff](google-ads-consultation-conversion.md) documents account `515-940-4739` and tag `AW-18494479353`, reference-only. Its prior approved-API response premise needs a separate P9-05 redesign for direct Jotform submission. The accepted-submission principle remains; no counting CTA clicks, frame loads, opens, starts, failed attempts, arbitrary thank-you visits or untrusted postMessage events. Cross-origin iframe visibility is not a verified acceptance signal. No success-event name or payload is invented.

No Google Ads/GA4/GTM, enhanced conversions, remarketing, tracking scripts, customer data or real-network measurement tests. P9-05/P9-07 remain open. [Thank-you settings](https://www.jotform.com/help/211-setting-up-the-thank-you-page/) and [POST forwarding](https://www.jotform.com/help/213-send-submission-data-via-post-method-and-thank-you-settings/) must be reviewed: a redirect must not export answers to Astro/Contabo. Production remains Phase 10.

## 10. Owner approval ledger

All implementation approvals below are **Pending**. Organizational selection of Jotform/three forms is already recorded; it does not resolve these gates.

| ID | Owner role | Approval/evidence required |
|---|---|---|
| OA-01 | Intake/operations | Minimum fields, required flags/contact preference consistency, follow-up/callback expectations, Tour/fundraising scope |
| OA-02 | Clinical leadership | Eligibility, service/evaluation availability, private-pay Social Club distinction, referral boundary and approved claims |
| OA-03 | Jotform account owner | JF-01–08, safe copy process and actual new IDs/configuration; original preservation |
| OA-04 | English/Spanish reviewer | Labels, errors, instructions, confirmations and locale switching; no automatic translation approval |
| OA-05 | Privacy/legal/security | Protected fields, generic email/headers/recipients, embeds/referrers, vendor flows, access/retention and tracking boundaries |
| OA-06 | Marketing | Deferred attribution categories and redesigned successful-submission semantics |
| OA-07 | Hosting owner | Static/API separation, compile/deploy gates, CSP/referrer/log policy, preview isolation and fallback topology |
| OA-08 | Release owner | Phase 10 integration activation, go/no-go, artifact/vendor rollback and deployment |

Preserve real screen-reader, authorized visual, non-Chromium, fluent Arabic/Spanish, clinical and privacy-policy acceptance, including trusted Spanish-policy source comparison. No signed technical checkpoint closes these gates. P9-01 campaign ownership, P9-02 portal, P9-04 counters, P9-08 author SEO and other Phase 9 decisions remain outside form implementation authority.

## 11. Acceptance and restrictions

Future tests must cover off-mode native/Enter/scripted submission safety and zero integration traffic; local mock behavior at 320/390/768/1440px, actual 200%/400% zoom, keyboard/focus, errors/offline/slow iframe, invalid locale/configuration, EN/ES consistency, drawer Escape and real screen-reader review where available. JF-09 synthetic submissions need a separately approved isolated form and notification recipients. Test failure, success, redirects, field protection and no Contabo/Google answer flow. No real patient data.

This task created documents only. No forms created/copied/edited, no connector account access, no submissions or network mutation, no integrations/notifications/analytics configured, no production systems changed, and no staging/commit/deployment. Protected files and old staging aid are untouched. Historical inventories, acceptance records, SESSION_HANDOFF and decision register remain unchanged.

## 12. Supporting documentation and change record

In addition to the specific references above, official guidance reviewed on October 18: [email settings](https://www.jotform.com/help/30-explanation-of-email-notification-and-autoresponder-settings/), [multilingual forms](https://www.jotform.com/help/298-How-to-Make-Your-Forms-Multilingual/) and [embed choices](https://www.jotform.com/help/67-Which-Form-Embed-Code-Should-I-Use/). Capabilities do not verify account-specific language URLs, callback behavior or approval.

Version 1.0, 2026-10-18: records the owner's three-form/direct-Jotform/no-booking/generic-notification direction and supplied connector evidence; reconciles nine local instances; adds pending verification and authorization gates. Any successor must identify changed decisions, approver/date/evidence and affected implementation batches. Until separately authorized, stop at documentation.

Version 1.1, 2026-10-18: adds the complete owner-supplied 27-ID roster and distinguishes reported metadata from planning classifications. Removes superseded missing-roster statements. Architecture, source-template restrictions, implementation authority and pending approval statuses are unchanged. No Jotform access or mutation occurred during this reconciliation.
