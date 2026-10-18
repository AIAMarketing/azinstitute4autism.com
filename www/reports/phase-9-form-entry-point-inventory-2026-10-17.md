# Phase 9 — P9-03 form entry-point inventory and Jotform integration plan

Execution date: **2026-10-17 UTC** (the execution clock had crossed UTC midnight after the October 16 kickoff). Planning and source inventory only. No implementation, form creation, account configuration, submissions, tracking, hosting changes or deployment authorized or performed.

**P9-03 INVENTORY COMPLETE — READY FOR OWNER MAPPING**

This means the repository inventory is complete against the selected signed source and its matching generated output. It does not mean the 27 account forms have been inspected or that their mappings, notifications, fields, accessibility or release are approved.

## 1. Baseline, method and evidence boundaries

- Branch: `faithful-astro-migration`.
- HEAD: `59911eb929579af7bcd6c42de6476128dab62289`; signed Phase 8 checkpoint, parent `8e64d322092b1fa6e0f648ddf26a665c80588198`, message `fix(a11y): reconcile responsive layouts and multilingual UI`.
- Initial tracked tree and index clean. Six pre-existing untracked paths: the five protected exclusions and `.phase8-stage-paths.nul`. None was read, modified, removed or checksummed.
- Read AGENTS.md, MIGRATION_BRIEF.md, AUTONOMOUS-CODEX.md, SESSION_HANDOFF, relevant migration-summary sections, Phase 9 register, nonproduction plan and Phase 8 browser/consolidated records. Their historical findings and decision statuses are unchanged.
- Searched `www/src` for native forms, actions, named/required controls, submit handlers, fetch calls, Jotform/CentralReach destinations, CTAs, contact helpers, navigation and campaign references. Inspected actual components, content and routing utilities.
- Recreated the manifest using the existing `createPublicationManifest`, `createLibraryCatalog`, `createLibraryPaginationPublications`, `createAuthorArchivePublications` and search-publication utilities with current frontmatter. Matched **122 eligible routes** to existing generated HTML. This reused the publication policy rather than introducing a second eligibility rule.
- Explicit read-only verification passed: `node tools/audit-routes.mjs --check --evidence reports/route-reconciliation-2026-10-15-offline-18-21-22-820Z.json`, from `www`. No network or writes. Source fingerprint: `8453ffad597e2f2414343b634997bf204cbdd59fc00c3d8d122babef8a632cb5`; 133 dispositions, 122 generated routes, nine redirects. Its historical production sitemap count is not the indexing-enabled Astro sitemap count.
- No build, browser submission, account login, API token retrieval, live form opening, Sign invitation opening or production crawl was performed. Public vendor documentation alone was retrieved. No patient records, notifications or answers were accessed.
- Application counts remain the signed baseline: 122 routes/canonicals, 108 indexing sitemap URLs, 180 hreflang links/55 routes, 25 translation sets, 74 Library records, search 55/12/7, nine archives/nine redirects. No new claim of browser or human acceptance is made.

Companion artifacts:

- [Complete route-level inventory CSV](phase-9-form-entry-points-2026-10-17.csv): 2,140 rows: 20 native-form instances and 2,120 grouped navigation/contact records representing 2,705 rendered link occurrences. Header/mobile copies with identical route, region, target and label are grouped using `occurrences`. These are not 2,120 independent lead forms. Search and adjacent non-lead workflows are explicitly classified.
- [Owner account worksheet](phase-9-jotform-owner-worksheet-2026-10-17.csv): 27 empty metadata rows; row numbers are worksheet positions, not invented form IDs.

CSV scope includes links to enquiry/service/intake/Tour/insurance/referral routes, external intake, financing/payment/donation/recruitment/event/program destinations and script-generated public phone/email links. Ordinary research citations, unrelated article links and social-profile navigation are not counted as lead forms. Component/source columns identify the content or shared rendering owner; generated archives are identified by their publication utility. The tables below add precise references for the primary implementations.

## 2. Organizational decisions supplied by the user

These facts are **user-confirmed, not independently account-inspected**:

| Item | Confirmed direction | Still unresolved |
|---|---|---|
| Account | Existing Jotform Gold; HIPAA functionality enabled; BAA signed; 27/100 form slots used | Actual definitions, per-form protections, integrations, settings and other usage limits |
| Lead processing | All lead-generating forms use Jotform directly | Exact existing-form IDs, schemas and operational routing |
| Contabo boundary | No sensitive submission proxy and no PHI-bearing webhook | Enforcement and testing of the future integration/configuration |
| Presentation | Iframe preferred; hosted fallback acceptable | Actual embed, language, accessibility and privacy acceptance |
| Notifications | Generic new-lead email; date/time/source only where supported and approved | Actual HIPAA template capabilities, timezone, source safety and recipient controls |
| Advertising | GA4/Ads remain disabled; future event must represent accepted submission | P9-05/P9-07 approval and reliable success signaling |
| Hosting preference | Contabo for static Astro and approved non-PHI APIs; Raspberry Pi fallback | Topology, TLS, operator, failover and deployment verification under P9-09 |

These decisions narrow the earlier provider-selection question; they do not approve implementation or close P9-03. Existing decision-register statuses and the living handoff are deliberately not edited.

## 3. Count definitions and visitor journeys

| Population | Count and interpretation |
|---|---|
| Lead-form implementations | **3**: FormShell, ContactForm, ServiceInquiryDrawer |
| Published native enquiry instances | **9**: seven EN, two ES, zero AR |
| Other HTML form implementations | **2**: LibrarySearch and FaqPage search |
| Other published HTML form instances | **11 GET search forms**; not lead collection |
| All HTML forms | 5 implementations, 20 rendered instances |
| Primary health/service lead intents | **6**: general contact, general consultation, ABA, evaluation, Social Club, professional referral |
| Additional organizational enquiry intents | **3**: Tour request, fundraising contact, historical community-event/booth enquiry |
| Total identified AIA enquiry intents | **9**, counting the historical event intent separately; current event availability unverified |
| Clinical intake tracks | **3**, separate from initial leads: ABA, psychological, Social Club |
| Existing Jotform destinations | **6 unique URLs across 7 link occurrences**: five form URLs and one Sign invitation |
| CentralReach | **1 unique URL across 3 link occurrences** |
| Proposed lead-form architecture | **3 logical forms**, preferably three physical forms using approved multilingual support; five physical forms if separate EN/ES copies are necessary |

Commercial insurance, AHCCCS and private pay are current payment-interest branches, not independently implemented forms. They do not justify separate forms without different approved operational requirements. Recruitment, bill payment, financing and donation transactions are additional conversion boundaries, not health-service lead forms. Historical event registration is separately flagged, not declared active.

## 4. Primary route/component/field matrix

Proposed categories are **JF-G** general enquiries, **JF-S** service consultation and **JF-R** professional referral. These are planning labels, not account form names or IDs. Every mapping requires owner inspection; iframe preferred with a hosted fallback.

| ID | Published route / locale | Implementation and source | Purpose | Current fields / required | Mapping |
|---|---|---|---|---|---|
| F-001 | `/contact` EN | `src/components/ContactForm.astro:17–28`; `components/pages/ContactPage.astro:19`; `content/pages/en/contact.mdx` | General contact | G; none required | JF-G |
| F-002 | `/es/contact` ES | Same component with explicit ES locale; `content/pages/es/contact.mdx` | General contact | G localized; none required | JF-G ES |
| F-003 | `/client-consultation` EN | `src/components/FormShell.astro:12–21`; `layouts/PageLayout.astro:15,82` | Consultation | G; none required | JF-S |
| F-004 | `/es/client-consultation` ES | Same layout/component, explicit ES locale | Consultation | G localized; none required | JF-S ES |
| F-005 | `/schedule-consultation` EN | Same FormShell; `content/pages/en/schedule-consultation.mdx` | Alternate consultation entry | G; none required | JF-S |
| F-006 | `/referrals` EN | Same FormShell; `content/pages/en/referrals.mdx:29` links to `#form-title` | Professional referral | G; none required; no professional-specific fields yet | JF-R |
| F-007 | `/aba-therapy` EN | `src/components/ServiceInquiryDrawer.astro:71–168`; `layouts/PageLayout.astro:81` | ABA enquiry | D; first_name, last_name, phone, email required | JF-S / ABA |
| F-008 | `/autism-evaluations` EN | Same drawer, service-specific copy | Evaluation enquiry | D; same four required | JF-S / evaluation, subject to availability approval |
| F-009 | `/learner-social-club` EN | Same drawer, service-specific copy | Social Club enquiry | D; same four required | JF-S / Social Club |

Paths above are relative to `www`. All nine have `method="post" action=""` and disabled submit controls. No destination or API is configured for their submissions. All have a phone fallback. The CSV contains actual field types, options and required flags, not an inferred schema.

**G schema** (`FormShell:15–19`, `ContactForm:22–26`): `name` text; `email` email; `phone` tel; `service` select; `message` textarea. Service options: ABA Therapy, Autism Evaluation, Learner Social Club, Other, with localized ES labels. Options omit explicit values, so their labels become submitted values; a future integration must not rely on translated labels as stable routing codes. The first service option is ABA by default, rather than an explicit blank choice. All five are optional in the present HTML; a nonempty email receives browser type validation on ordinary submission.

**D schema** (`ServiceInquiryDrawer:77–161`): `first_name` text, `last_name` text, `phone` tel and `email` email required; optional `child_first_name` text, `child_last_name` text, `child_birth_date` text with numeric input hint (not a validated date input), `location_interest` select, `service_interest` select, `payment_options` select, `referred_by` select and `comment` textarea.

- Location: Scottsdale, Glendale, Other/None, initially blank.
- Service: behavioral/ABA, psychological/evaluation, sociological/Social Club, Other/None, initially blank even in a service-specific drawer.
- Payment: United Healthcare AHCCCS, BCBS AZ, United Healthcare, Optum, Tricare, Care Credit, Private Pay, Other; initially blank. These labels do not independently establish accepted/in-network coverage.
- Referral source: Facebook, Google, Primary Doctor, Specialist, Client Referral, Community Event, Other; initially blank. It is self-reported information, not verified campaign attribution.

There is no Arabic enquiry form implementation. Arabic articles/archives offer navigation to existing English destinations; `/ar` remains unpublished. Spanish service pages link to `/es/client-consultation` but do not instantiate the English-only drawer. No new localized route is proposed.

## 5. CTA, intake and external-flow mapping

The CSV is the exhaustive route/target/region mapping. This compact table groups repeated implementations without counting a navigation link as another form.

| Entry group / source | Current path or behavior | Proposed mapping / open issue |
|---|---|---|
| EN/ES home hero, commitments and financial help; `content/pages/{en,es}/index.md:15–17,41–43,120–123`; HomeHero/HomeServicesIntro/HomeFinancialHelp | Three consultation links per homepage | JF-S in the existing locale; claims about appointments/assessment are not confirmed booking |
| HomeProcess and intake-process content | Six section links per homepage; intake page CTA leads to locale consultation | JF-S first enquiry; later clinical steps remain distinct |
| Services/program pages EN/ES | Consultation CTAs; EN additionally has three drawer instances | JF-S with approved service context; no separate payment form by default |
| Tour/header Tour button/contact Schedule Tour | `/tour` then `/client-consultation`; no scheduling calendar or Tour form | JF-G tour request proposed; preserve existing visitor journey until explicitly approved |
| Referrals CTA | `#form-title` on `/referrals` | JF-R; current generic field labels are not a professional referral contract |
| Library body links, all locales | Existing contact/consultation/service links and phone/email alternatives | JF-S/JF-G destination; source page ID may be recorded only through approved mapping, never full article URL in email |
| Hours-of-ABA article | Local `/client-consultation`; observed public `/lp/early-intervention` | JF-S candidate, but P9-01 owns exact campaign destination; no equivalence assumed |
| Header/MainNav/Footer and visitor-navigation resolver | Contact, services, referrals, client forms, insurance, Tour; locale fallbacks | Preserve valid targets and language notices; shared links are not separate implementations |
| `/client-forms`, `ClientFormSteps.astro` | Three intake tracks; seven Jotform links, three CentralReach links, two psychological handbook PDFs | Preserve pending operational mapping; no initial-lead reuse approved |
| `/donate-autism-giveback` | Fundraiser enquiry by public general email; Amazon wishlist/Giving Fountain donation links | JF-G fundraising request if approved; do not replace payment/donation providers |
| Community Day article | Historical Eventbrite registration and staff event-contact email | JF-G event/booth enquiry candidate; registration replacement/status requires event owner, not an automatic migration |
| `/careers`, `/team` | Indeed jobs links and public HR email | Separate recruitment workflow; do not assume current all-lead direction authorizes HR replacement |
| Shared header | CareCredit provider search and PatientNotebook payment | Financing/billing transactions, not lead forms; preserve separate review boundary |
| ABA pages EN/ES | `https://aiaprep.org/` curriculum reference | Separate Academy project; linked page is not evidence of an inspected lead form |
| `/employee-portal` | Metadata-only route, no native form/authentication | P9-02 protected-workflow decision; no lead mapping |
| Search (S-001–S-011 CSV) | LibrarySearch on ten routes plus FAQ search | Leave GET search separate; user-entered query text can still be sensitive |

Privacy-policy telephone/email links are included as rights/contact boundaries, not automatically mapped to a lead form. Shared social-profile links are outbound navigation, not inspected lead submissions. Educational screener references (e.g. M-CHAT) are informational links, not AIA intake. No downstream external page was opened to infer additional fields or active availability.

### Existing Jotform and CentralReach destinations

All discovered in `www/src/content/pages/en/client-forms.mdx`. The exact public URLs are in source/CSV except the Sign invitation token, deliberately not duplicated. None was requested.

| ID | Source line(s) / occurrences | Destination | Evidence status / reuse |
|---|---|---|---|
| X-01 | 40 / 1 | `https://form.jotform.com/Arizona_Institute/aba-intake-agreement-form` | Repository-linked ABA agreement; inspect schema, ownership and live workflow |
| X-02 | 45,108 / 2 | `https://form.jotform.com/Arizona_Institute/aba-learner-pre-assessment-form` | Shared ABA/LSC pre-assessment URL; confirm reuse is intentional |
| X-03 | 50 / 1 | Jotform Sign document `232958430113048`; invitation segment retained only in original source | Handbook signature, not an assumed reusable lead form; owner must determine invitation scope/expiry |
| X-04 | 71 / 1 | `https://form.jotform.com/Arizona_Institute/psy-intake-agreement-form` | Psychological agreement; metadata inspection required |
| X-05 | 76 / 1 | `https://form.jotform.com/Arizona_Institute/aia-psychological-pre-assessment-fo` | Psychological pre-assessment; metadata inspection required |
| X-06 | 103 / 1 | `https://form.jotform.com/Arizona_Institute/aia-learner-social-club-intake-agre` | LSC agreement; metadata inspection required |
| X-07 | 35,66,98 / 3 | `https://members.centralreach.com/?public=true#forms/form?id=DF3D21C5-3A33-4906-9803-3E4580D32277` | Same client-intake target in all three programs; identify whether this is initial lead collection or post-contact intake |
| X-08/09 | 82–83 | Two local psychological handbook PDFs (ages 2–5 and 6+) | Download/print/sign, no Astro submission; approval of later return channel required |

Six destination URLs do not prove six of the account's 27 form slots: Sign inventory and vanity URLs must be reconciled by the owner. **Zero existing forms are confirmed suitable as initial-lead forms.** Five conventional form URLs and one Sign destination are inspection candidates, primarily for preserving clinical intake. The other account definitions remain unknown. No new numeric form ID is invented.

### Contact/legacy discrepancies requiring owner mapping

`ContactObfuscation.astro:30–59` constructs phone/mailto links in the browser; without JavaScript its original fallback strings remain. Public contact targets discovered include general `(480) 687-7099`, billing `(602) 708-0429`, an older `(480) 707-2195`, general `info@azinstitute4autism.com`, `info@abaclinicaz.com` on schedule-consultation, `hello@azinstitute4autism.com`, and the apparent spelling variant `hello@azinsitute4autism.com` in three Library records. HR and the historical event staff email are separate contacts. The CSV identifies their routes.

The apparent spelling error is source-observed, not live mailbox verification. `managing-aggressive-behavior-outbursts.mdx:40` also displays a literal `www.azinstitute4autism.com/contactus` rather than a working link. Other Library consultation wording links to the homepage first. These are owner-confirmation/possible later correction items; nothing was silently normalized. Contact alternatives must not invite emailing clinical details merely because a form is unavailable.

## 6. Submission and isolation findings

| Finding | Evidence classification | Consequence / later safeguard |
|---|---|---|
| All nine enquiry forms have empty POST actions and disabled submits | Confirmed source and matching generated HTML | An empty action resolves to the current document; it is not an approved receiver or isolation mechanism |
| Helper `src/scripts/forms.ts:1–3` prevents submit events but has no discovered invocation | Confirmed source | Do not claim a wired guard; merely wiring it would still not cover native scripted submission |
| Native `form.submit()` attempted an intercepted POST from a synthetic Spanish fixture | Previously browser-verified, `phase-8-browser-verification-2026-10-15.md:81–85` | The guard prevented transmission; real forms were not submitted. No new mutation test performed |
| Ordinary Enter-key submission on every current form/browser | Requires later controlled testing | Disabled default submit usually inhibits implicit submission; do not generalize this to all controls, browsers or scripting paths |
| Native scripted submission bypasses submit events and constraint checks | Platform behavior; [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit) | Later tests need intercepted native-submit and requestSubmit paths; no live endpoint probes |
| Drawers open after 10 seconds and store dismissal in sessionStorage | Confirmed source, drawer script:173–246 | Closed native dialogs remain unavailable without JS; this storage is not attribution consent or campaign tracking |
| Raw form data could be sent to Astro origin through scripted POST | Confirmed potential; observed only in synthetic fixture | Host behavior/logging unverified; future integration removes obsolete native submission path and denies unintended requests |
| Free-text and child identifiers exist | Confirmed source | Assume sensitive input is possible even when labels are general; minimize initial fields with owner approval |
| Public tel/mailto and external intake links are usable navigation | Confirmed source; external reception unverified | They are not disabled by local form controls; review recipients, legacy targets and clinical-data notices |
| Search uses GET | Confirmed source | Sensitive typed queries may enter URLs/history/access logs. Not a Jotform workflow or a reason to add remote search |
| Production counter fallback and automatic map resources exist | Confirmed source / prior controlled browser evidence | Jotform selection does not resolve P9-04 or external-resource isolation; noindex is not a network boundary |

Future form integration must keep all entered values inside the cross-origin Jotform document, avoid parent-page field mirrors and URL prefills of contact/health information, and retain a clear hosted-form/telephone fallback. Replacing visual markup does not establish complete privacy compliance. A parent submit guard alone is insufficient, and the Jotform frame's own scripts/network require separate review.

## 7. Proposed form architecture and minimum fields

| Option | Benefit | Cost / risk |
|---|---|---|
| A: one shared form | Least schema maintenance | Confuses administrative/professional/service paths; conditional logic can become hard to review |
| B: dedicated forms for every service/payment/locale | Tailored wording and routing | Duplicated fields, translation drift, notification sprawl; nine categories alone do not justify nine forms |
| **C: hybrid — recommended** | Three distinct schemas with service/payment branches where appropriate | Requires approved mapping, conditional rules and language testing |

| Proposed category | Routes/intent | Minimum proposed fields | Owner-dependent additions |
|---|---|---|---|
| **JF-G General enquiry** | Contact EN/ES; Tour, fundraiser and event enquiries where approved | Adult contact name; preferred contact method; one corresponding contact channel; broad enquiry reason | Organization/role for fundraiser/event only if needed; optional message only with justification and protected handling |
| **JF-S Service consultation** | Consultation variants; ABA/evaluation/LSC; campaign entry when approved | Adult contact name; preferred contact method; corresponding phone/email; service selection | Broad service area and payment category if routing needs them; preferred language; no booking guarantee |
| **JF-R Professional referral initiation** | `/referrals` | Referring professional name, organization/role, work contact method/channel, requested service | Authorization/consent statement approved by privacy; patient identification and clinical documents belong in a separately approved secure referral/intake stage |

Propose JF-G and JF-S with reviewed EN/ES versions, JF-R EN matching current publication. Three physical multilingual-capable forms would use at most three additional slots if nothing can be reused (27→30). Separate EN/ES copies for G/S plus EN R would use five (27→32). These are capacity illustrations, not account creation instructions; storage/submission quotas and Sign limits remain unverified. Do not create duplicates or alter active workflows before inspection.

Initial prototype recommendation: **JF-G on a local-only copy of `/contact`**, followed by the ES version. It exercises the shared integration without child fields, a service drawer or a professional clinical handoff. Use an owner-approved test form, isolated recipient roles and synthetic data only after explicit testing authorization.

### Field disposition proposal — no existing field removed

| Existing/proposed data | Classification | Reason / proposed treatment |
|---|---|---|
| Adult contact name and one reachable channel | Required and supported by contact purpose, subject to exact owner approval | Do not require both phone and email by default; current drawers require both, so changing that needs approval |
| First/last name split versus one name | Potentially necessary — owner confirmation | Avoid duplicating both schemas without operational need |
| Preferred method/language | Potentially necessary — owner confirmation | Supports respectful follow-up; translated labels and options need review |
| Service and broad location | Potentially necessary — owner confirmation; privacy review | Useful routing but can disclose health-service interest; never email raw values by default |
| Commercial/AHCCCS/private-pay/unsure category | Potentially necessary — owner confirmation; privacy review | Do not collect policy/member IDs or guarantee benefits; separate forms only for materially different approved requirements |
| Child name and exact DOB | Better deferred to clinical intake | For eligibility triage, consider an approved age band only if necessary; not an automatic replacement |
| Diagnosis, history, treatment detail, attachments | Better deferred to clinical intake | No new initial-lead collection; secure later Jotform workflow requires clinical/privacy approval |
| `message` / `comment` | Privacy review required | Free text is potentially sensitive regardless of prompt; consider omission or constrained reasons, only with owner approval |
| `referred_by` plus campaign fields | Potentially duplicative | Distinguish self-report from acquisition context; retain only needed, separately approved concepts |
| Arbitrary UTM/query/referrer/IP/browser details | Unnecessary for minimum lead purpose; privacy review | No default copying into fields, notifications or event payloads |
| Agreements, signatures, handbook acknowledgement | Separate clinical/operational intake | Existing linked workflows remain intact; not automatically merged into JF-S |

The CentralReach boundary needs an explicit answer: if its current step is itself initial lead collection, it must be remapped to satisfy the user-selected Jotform direction; if it is clinical onboarding, its continued role needs separate operational/privacy approval. This report authorizes neither replacement nor new forwarding.

## 8. EN/ES and fallback presentation contract

Jotform documents multilingual forms and translation of confirmation/thank-you content [V4]. Prefer reviewed multilingual G/S forms if the actual HIPAA form supports deterministic initial locale and accessible validation. Separate EN/ES copies are the fallback if this cannot be verified. No automatic translations are accepted as fluent review.

- Pass an explicit page locale to a future component; map only approved form IDs/URLs and language values. Verify the vendor's actual locale parameter before using it; no guessed URL syntax.
- EN Contact→JF-G EN; ES Contact→JF-G ES; EN consultation variants→JF-S EN; ES consultation→JF-S ES; EN service drawers→JF-S EN branch. ES service CTA stays ES. Referrals remain EN unless a separately approved translation is supplied.
- Arabic article visitors currently follow English contact/consultation links, including the Arabic first/then article. Retain clear English-destination notices; do not invent an Arabic form or route.
- Review heading/button/error/help/CAPTCHA/thank-you language, not only labels. Use localized descriptive iframe titles. Ensure language changes do not discard entries without warning.
- Test 320/390/768/1440 widths, 200% zoom, keyboard entry/exit, validation focus, screen-reader announcements, long Spanish strings, conditional height changes and mobile keyboard behavior. Parent CSS cannot fix iframe-internal accessibility.
- Start with a plain iframe plus visible hosted fallback. Jotform's documented iframe publishing option [V3] does not prove its exported helper script is necessary or acceptable. Inspect resize helpers and message handlers before adding them; validate message origin, source window and payload.
- A frame `load` event is neither submission success nor proof that the form is usable. Account for blocked resources, empty/failed frames and network loss. Hosted fallback must remain available without parent JavaScript; actual Jotform no-JS functionality remains unverified.
- Preserve service-drawer focus/close behavior if later embedding there. Cross-origin Escape behavior, nested scrolling and tab boundaries need actual testing; use the full-page/hosted fallback if a drawer fails accessibility.

## 9. Owner inventory checklist for the 27 existing forms

Complete the companion worksheet using **metadata or sanitized configuration only**. No credentials, API tokens, submission exports, real answers, notification messages, private invitation links or clinical records.

For each form provide title, public ID/URL, active/disabled/archive status, purpose, owner role, operational use, field names/labels/types/required flags and protected flags (including hidden fields), language/error-message coverage, conditional logic, notification template structure/tags, recipient roles, subject/reply-to configuration, attachments, timezone, thank-you/redirect settings, integrations/webhooks/widgets/tracking, sensitive-field categories and embedding support/testing. Record whether an approved test copy may be created later and which workflow must not be disrupted.

Public Sign invitations are not automatically safe metadata exports; supply a document ID and explain invitation scope without private access tokens. No patient data is needed to establish whether a field exists.

Review account metadata for remaining submission/storage limits, retention/deletion policy, staff access roles/MFA, monitoring responsibility and available test isolation. User-confirmed Gold/HIPAA/BAA facts need not be re-proved through patient submissions. Account owner then maps each candidate to JF-G/S/R or retained clinical intake; zero matches are assumed now.

## 10. Proposed attribution contract

This is a proposed allowlist, not implemented code or approved notification content.

| Proposed internal value | Meaning | Notification display candidate |
|---|---|---|
| `E-CONTACT-EN`, `E-CONTACT-ES` | Known contact entry | Website |
| `E-CONSULT-EN`, `E-CONSULT-ES`, `E-SCHEDULE-EN` | Consultation destination | Website |
| `E-SERVICE-ABA`, `E-SERVICE-EVAL`, `E-SERVICE-LSC` | Approved service entry | Website (no service label) |
| `E-REFERRAL-EN` | Professional route | Website (no patient/referrer details) |
| `E-TOUR`, `E-GENERAL` | Tour/general organizational request | Website |
| `C001` | Reserved first approved paid-search campaign; not yet assigned | Search campaign, only after privacy approval |
| `C002` | Reserved approved partner campaign; not yet assigned | Partner campaign, only after privacy approval |
| `UNSPECIFIED` | No trustworthy allowed source | Website / source unavailable |

Entry context and service/payment intent can be sensitive even when represented by a code. Keep the detailed internal entry/service fields protected; proposed notification labels deliberately collapse them. Opaque codes are not automatically anonymous or safe.

Recommended first release uses fixed entry context only, with no persistence. A CTA click may carry an approved fixed entry code to the form destination later; absent such an approved mechanism, only the destination route is known. Do not pretend a visit to consultation establishes that it originated on a particular article or homepage.

If campaign mapping is later approved: accept one recognized code from a versioned allowlist or an exact approved UTM tuple, never arbitrary UTM text. Reject repeated/conflicting/malformed/oversized values to `UNSPECIFIED`; do not concatenate them. Discard `utm_term`, click IDs, full referrers and arbitrary URLs by default. Known page context remains independent from campaign classification. Client-supplied attribution is spoofable and must never control authorization or privileged data routing.

- No campaign parameters: **unspecified**, not confidently “direct.” Organic search and referral traffic cannot be inferred reliably without additional approved evidence. Do not inspect or transmit a full referrer merely to fill the label.
- Paid search: only a deliberately assigned allowlisted campaign value; no GA4/Ads activation, click-ID capture or conversion implied.
- Invalid/competing values: generic source; never echo raw input to a template, URL or log.
- Hidden fields remain editable by clients. For email inclusion, require vendor-side constrained values and a fixed validated label mapping. If Jotform cannot enforce that safely, use static generic email wording rather than raw hidden-field interpolation.
- No cookies/sessionStorage for attribution proposed initially. Existing drawer-dismissal storage is unrelated. Any later persistence requires a purpose, duration, consent/privacy review and deletion behavior.
- Review iframe/hosted-link referrer policy and the actual exported embed helper for automatic parent query forwarding. Prefer no-referrer at this boundary, subject to compatibility tests; it does not suppress all vendor-side browser metadata. Never prefill names, health information or free text through URLs.

## 11. Notification capability and approval matrix

Vendor documentation was reviewed on October 17 using public official help pages, without opening any AIA form. Documentation capability is not proof of AIA's current settings.

| Requirement | Public evidence / limitation | Proposed acceptance |
|---|---|---|
| HIPAA notification body | Jotform supports notifications with PHI-marked fields excluded [V1]. Its field guide says fields are protected by default on HIPAA enablement and warns about turning protection off [V2]. Existing settings still need inspection. | Keep contact/child/health/free-text fields protected; explicitly minimalist template plus full synthetic delivered-email review |
| Submission date/time | Generic email guide documents `{DATE}`, `{DATE:Date-US}`, `{DATE:Time-US}` and formatting tags [V5]. | Confirm supported metadata in this HIPAA form and actual received message, not only preview |
| Arizona time | Account timezone and table display are configurable [V6]. That guide alone does not prove the timezone used by every notification tag. | Owner verifies America/Phoenix/Arizona-equivalent setting and actual submission timestamps across midnight and DST-season dates; do not use visitor-supplied date or a DST-observing Mountain timezone |
| Campaign/source label | No verified account-specific safe notification contract | Approved coarse label only after protected-field and tampering tests; do not disable PHI protection merely to make a field appear |
| Recipients | Notification setup supports recipient configuration [V9]; account roles unknown | Approved staff recipient roles, no visitor-controlled recipient/reply-to, no unreviewed forwarding; addresses supplied privately during authorized setup |
| Subject/sender | Current template uninspected | Fixed generic subject/sender; no person, service, campaign detail, answer, form-title interpolation or submission ID |
| Hidden fields/defaults | Hidden does not mean protected; templates may include answer placeholders | Inspect all-field tokens, hidden inputs, IP/browser widgets, reply-to, PDFs, filenames, footers, edit/view links and autoresponders |
| Submission identifiers/links | Unnecessary for the proposed notification | No ID, tokenized edit link, public receipt, attachment or answer-bearing URL; generic authenticated account sign-in instruction |
| Failures/monitoring | Official delivery guide describes troubleshooting [V10]; exact account monitoring capabilities unverified | Staff-owned reconciliation inside Jotform, controlled test failure/bounce handling and coverage when alerts stop; no PHI-bearing monitoring export |

Proposed **generic fallback**, still subject to actual template and privacy approval:

```text
Subject: New AIA website inquiry

A new inquiry has been received.
Sign in to AIA's authorized Jotform account to review the submission.
```

Only after support and privacy are verified, add:

```text
Date: [verified Arizona-local submission date]
Time: [verified Arizona-local submission time]
Source: [approved coarse source label]
```

A precise timestamp plus a campaign category may enable correlation with an individual; neither is automatically non-PHI. If that combination is unsafe or unsupported, omit it. A submission timestamp, email-send time and email-client display time are different concepts and must not be conflated.

AIA's restriction is stricter than optional vendor PDF features: **no submission attachments, even encrypted PDFs**, no answer dumps and no PHI-bearing webhook to Contabo. No separate email-building service should receive the full submission merely to produce a generic notification. Respondent autoresponders need separate approval; do not infer them from staff notification approval. The fallback is generic Jotform-originated notification, or owner review of notification feasibility—not disabling safeguards.

## 12. Successful submission and future conversion signaling

The existing [Ads handoff](google-ads-consultation-conversion.md) remains authoritative: conversion means an accepted inquiry, not a CTA click, iframe load, form open, validation attempt or failure. GA4/Ads stay disabled.

| Approach | Feasibility/evidence | Limitation and disposition |
|---|---|---|
| Jotform internal thank-you/confirmation | Documented [V7]; can keep visitor inside vendor workflow | Recommended initial UX, no advertising event. Do not echo answers or expose edit/download actions by default |
| Static external thank-you redirect | Documented [V8] | A direct visit/refresh/forged URL is not authenticated acceptance. Avoid query identifiers and data forwarding; not sufficient alone for conversion |
| Embedded completion message/event | Requires current vendor-supported contract and actual HIPAA test-form evidence | No stable supported acceptance-event API verified in this assessment. Do not infer success from resize/navigation or invent a postMessage payload |
| Server verification/webhook | Would require new data flow/authorization | PHI-bearing webhooks and submission polling/proxying through Contabo contradict the chosen boundary; not proposed |
| Vendor analytics integration | Technical availability is not approval | Remains P9-05/P9-07; do not turn it on as an embedding shortcut |

If a supported message is approved later, validate exact origin, source window, schema and form identity; reject unexpected values without logging answer-bearing payloads. No visitor identifier/submission ID should reach ads, URLs or Astro logs. An origin-checked message is not automatically server-authenticated acceptance; document its actual guarantees and replay/duplicate behavior before approving measurement.

Jotform documents unique-field duplicate controls [V11], but using contact identifiers to block repeat enquiries can exclude siblings or legitimate later requests. Owner must define duplicate rules separately from ad-event deduplication. Test double click, retry after timeout, Back/refresh, incomplete/cancelled forms, validation failures, blocked resources, offline state, quotas and closed forms on an authorized test form. Do not label failed or uncertain requests accepted; give truthful next steps without clinical information in error logs.

**Critical setting:** Jotform offers redirect-with-HTTP-POST of submission data [V12]. It must remain OFF for any Astro/Contabo return URL. A harmless-looking thank-you redirect can otherwise defeat the direct-to-Jotform boundary. Also exclude field interpolation in redirect query strings and automatic data-bearing action buttons.

## 13. Hosting and privacy dependencies

Proposed path: visitor loads static Astro from approved Contabo host → visitor opens/loads approved Jotform iframe or hosted form → submission goes directly to Jotform → authorized staff review inside Jotform; staff receive only approved generic notifications. Raspberry Pi is an unverified fallback preference, not configured failover.

- P9-09 must approve exact HTTPS form/CDN origins and CSP `frame-src`; do not use a broad wildcard from guessed vendor domains. Inspect the owner-supplied embed for any required parent `script-src`/`connect-src` additions. The account may use different HIPAA endpoints; do not infer them from public vanity links.
- Ordinary cross-origin iframe navigation does not require a Contabo CORS proxy. Parent code cannot read the child DOM; parent CSP does not govern every resource inside the cross-origin form. Test the frame's requests/cookies separately. Do not relax CORS to extract submitted answers.
- Consider parent `form-action 'none'` once obsolete native enquiry forms are replaced, with careful scope so approved search is preserved; review server denial of unexpected POSTs. These are future policy choices, not current settings. A blanket directive would also affect GET forms.
- Review Referrer-Policy on frame/fallback, HTTPS-only resources, iframe permissions and any sandbox restrictions against actual vendor behavior. Do not grant broad top navigation or disable protections simply to make a redirect work.
- Embeds may initiate vendor/CDN/cookie requests before submission or user interaction. Decide automatic loading versus an accessible click-to-load placeholder with privacy owner. Lazy loading alone is not consent.
- Contabo, Cloudflare and fallback-host access logs can contain client IP and inbound query strings even without submission bodies. Approve log minimization, retention and redaction; sanitizing browser attribution after navigation does not erase earlier server logs.
- Hosted previews must not load production form IDs by default. Use an approved test form with controlled notifications/integrations, explicit endpoint allowlist and synthetic data; stop unexpected production API or advertising attempts. Existing likes/views isolation remains P9-04.
- Do not put form answers in parent state, session storage, app telemetry, exception reports, URLs, referrers, conversion payloads or webhooks. Keep APIs non-PHI; namespaced “non-PHI” code labels alone do not establish that classification.
- Rollback includes both the static artifact and approved Jotform configuration/version; rolling back Astro alone does not undo vendor edits. Preserve operational form ownership and avoid reactivating obsolete empty-action forms as a fallback. Agree a safe telephone/hosted workflow.
- Phase 10 must test Contabo and any proposed Raspberry Pi fallback for TLS, CSP/referrer behavior, routes, real errors, asset delivery, logs, external outages and rollback. No DNS/TLS/nginx/Cloudflare changes are included here.

## 14. Bounded future implementation batches

Every batch requires separate authorization; this plan authorizes none.

| Batch | Prerequisites / owners | Proposed files or systems | Tests and stopping point |
|---|---|---|---|
| 1. Mapping and approval | Owner completes 27-form metadata worksheet; intake/privacy approve schemas, languages, source handling, recipient roles; P9-01 campaign boundary | Jotform metadata and proposed form contract/report only initially | Map F/X IDs to approved account forms, flag active workflows and unknowns; stop before creating/editing forms |
| 2. Local-only prototype | Explicit test-form creation/use and synthetic submission authorization; privacy/security endpoint approval | Future reusable Astro embed wrapper, `/contact` prototype, guarded browser tests; approved test Jotform | EN/ES, responsive/zoom, keyboard/screen reader, frame/fallback, blocked vendor/error state, observed egress and no Contabo payload; stop before production form use |
| 3. Remaining integrations | Prototype accepted; each form/locale/service availability approved | FormShell, ContactForm, ServiceInquiryDrawer, PageLayout, locale content and targeted tests as necessary | Nine route instances, no old empty-action path, no duplicate IDs/forms, page design, referral flow, JS-disabled alternatives, publication invariants; stop with reviewable nonproduction changes |
| 4. Source and notifications | Allowlist and notification privacy approval; actual HIPAA capability verified | Approved Jotform templates/settings and narrowly scoped source mapping | Synthetic delivered email inspection for all fields/headers/links/attachments, Arizona clock, tampered/unknown codes, failure monitoring; stop before live recipient/workflow activation |
| 5. Measurement | Separate P9-05/P9-07 approval and supported acceptance-signal contract | Only approved event adapter/vendor configuration | Local mocks first; success-only, consent, duplicate/replay/failure checks, no identifiers/health context; no automatic tag installation or production events |
| 6. Production acceptance | P9-09 verified hosting/rollback; all release owners and pending human reviews | Phase 10 release checklist and separately authorized systems | Approved synthetic operational tests, outage/rollback and go/no-go; explicit activation authorization remains required |

## 15. Owner decisions still needed

| Priority | Question / evidence | Responsible role |
|---|---|---|
| 1 | Map the 27 definitions; identify existing lead forms versus clinical intake/Sign and protect active workflows | Jotform account and intake owner |
| 1 | Approve G/S/R minimum fields, required contact channel, payment routing and initial referral boundary | Intake/clinical and privacy owners |
| 1 | Confirm evaluation availability, service locations, waitlist/admission wording and payer categories before forms promise service | AIA operations/clinical leadership |
| 1 | Supply sanitized HIPAA notification configuration, PHI flags and account timezone; determine whether generic-only is necessary | Jotform owner/privacy reviewer |
| 2 | Confirm CentralReach's role and repeated ABA/LSC pre-assessment use; identify Sign invitation safety | Intake owner/security reviewer |
| 2 | Verify EN/ES definitions/error states and preferred-contact routing; Arabic remains explicit English fallback | Fluent reviewers/intake |
| 2 | Approve coarse source labels, fixed mapping, persistence policy and whether timestamps are appropriate in email | Privacy/marketing owners |
| 2 | Confirm public email/phone aliases and historical event status; correct only with approved evidence later | Organizational/content owner |
| 2 | Approve campaign `/lp/early-intervention` journey and ownership | P9-01 campaign/site owner |
| 2 | Approve test form, test recipients, expected vendor domains, log policy and rollback responsibilities | Account owner/security/P9-09 operator |
| Deferred | Define supported accepted-submission event and measurement approval | P9-05 marketing/privacy; no tracking now |

Do not ask for already-confirmed Gold/HIPAA/BAA/capacity facts again. Do not request submissions to resolve any of these questions. Form quotas alone do not establish throughput/storage/operational capacity.

## 16. Remaining gates and documentation validation

P9-01 campaign ownership; P9-04 counters/isolation; P9-05 measurement; P9-06 clinical, financial and organizational claims; P9-07 policies, actual data practices and trusted Spanish policy source; P9-09 hosting; P9-10 launch remain open. P9-02 portal and P9-08 author policy are unchanged. The selected Jotform direction is recorded here without declaring P9-03 fully resolved or changing register statuses.

Fluent EN/ES form wording, Arabic fallback clarity, clinical referral/intake review, HIPAA configuration/privacy/legal acceptance, real screen-reader and authorized desktop/mobile/non-Chromium review remain required. Account HIPAA enablement/BAA and successful technical tests do not supply these approvals. Phase 10 retains production integration acceptance, rollback and cutover authority.

Validation for this documentation-only task: current source manifest and 122 generated routes inspected; nine POST and eleven GET form instances accounted for; all native enquiry schemas matched; sanitized CSV unique IDs and required columns checked; 27-row blank account worksheet checked; explicit offline consistency check passed; `git diff --check` and final index/status inspection performed. No implementation tests/build were rerun because application bytes were unchanged. Only this report and two CSVs are newly created. No historical report, living handoff or decision register is edited.

## Vendor references and limits

Official documentation consulted on **2026-10-17 UTC**, not account inspection. No public help example or support response is treated as proof of AIA configuration, compliance or a guaranteed acceptance-event API. Summaries below support the bounded proposals above.

- **V1:** [HIPAA notification/autoresponder behavior](https://www.jotform.com/help/504-how-to-use-notification-and-autoresponder-emails-in-hipaa-accounts/) — protected fields excluded from email; no blanket claim that every email is safe.
- **V2:** [PHI field settings](https://www.jotform.com/help/518-how-to-set-phi-fields-on-your-forms/) — protection defaults and per-field review.
- **V3:** [Iframe publishing](https://www.jotform.com/help/148-getting-the-form-iframe-code/) — supported publishing method, not AIA accessibility certification.
- **V4:** [Multilingual forms](https://www.jotform.com/help/298-how-to-make-your-forms-multilingual/) — language capability; actual translations and locale selection still unverified.
- **V5:** [Email submission-date tags](https://www.jotform.com/help/68-how-to-add-a-date-to-an-email-notification/) — generic date/time formatting capability.
- **V6:** [Submission date format and account timezone](https://www.jotform.com/help/346-how-to-change-submission-date-to-a-different-format-and-timezone/) — table/account setting; does not independently establish delivered-email timezone.
- **V7:** [Thank-you options](https://www.jotform.com/help/211-setting-up-the-thank-you-page/) — confirmation, optional actions and data presentation need explicit configuration review.
- **V8:** [External redirect after submission](https://www.jotform.com/help/38-redirecting-users-to-a-different-page/) — user navigation capability, not an authenticated conversion receipt.
- **V9:** [Notification configuration](https://www.jotform.com/help/25-setting-up-email-notifications/) — owner must inspect actual recipients and template settings.
- **V10:** [Notification delivery troubleshooting](https://www.jotform.com/help/364-why-am-i-not-receiving-email-notifications/) — no inferred operational monitoring SLA.
- **V11:** [Unique-field limits](https://www.jotform.com/help/223-how-to-set-form-limits-based-on-a-unique-field/) — duplicate controls require a workflow-specific policy.
- **V12:** [Redirecting submission data with HTTP POST](https://www.jotform.com/help/213-send-submission-data-via-post-method-and-thank-you-settings/) — capability explicitly excluded from the proposed Contabo boundary.
