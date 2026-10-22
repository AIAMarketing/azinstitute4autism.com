# Phase 9 landing-page release-readiness review

Date: 2026-10-21 UTC
Baseline: `f98576f3aef734303c47c85f20c8c3bbd5830639`
Status: **Owner approval pending; no production activation authorized**

## Scope

This bounded review covers the five landing pages and the staging-only `/lp`
review index. It preserves routes, source-specific designs, publication policy,
privacy safeguards and inactive submission behavior. No Jotform form, API,
webhook, analytics tag, advertising tag or deployment configuration was changed.
The six protected/superseded local reconciliation files were not read or
modified.

## Corrected presentation copy

The following corrections are implemented because the prior wording contradicted
the inactive state or contained an obvious typographical error:

| File | Before | After |
|---|---|---|
| `src/components/campaign/Hero.astro:29` | “Forms are available anytime.” | “Online forms are not enabled yet; call AIA at [phone].” The phone text is now a `tel:` link. |
| `src/components/campaign/ConsultationForm.astro:57` | “By submitting this form, you are asking AIA to contact you about services.” | “Online submissions are not enabled yet. Please call AIA at [phone] to discuss services. Review AIA's privacy policy.” |
| `src/components/campaign/EarlyInterventionPage.astro:6` | “Evidense-Based ABA Therapy” | “Evidence-Based ABA Therapy” |
| `src/components/campaign/EarlyInterventionPage.astro:10,29-30,73,109-111` | Request-oriented copy despite disabled controls | Telephone-first copy: call AIA, see contact details, and call with questions; the inactive panel explicitly says online requests are not enabled. |

The Early Intervention layout and section structure remain unchanged. Its three
disabled controls, disabled button, non-form group and telephone fallback remain
in place. The four campaign pages retain their existing CTAs and inactive panel
visual design while the explanatory text now accurately describes availability.

## Inactive-form safety

The existing focused tests continue to establish that all five pages have no
`form` element, no enabled named controls, no live iframe or runtime script, and
no tracking or submission call. The new assertions additionally verify:

- no campaign hero says forms are available anytime;
- each campaign panel uses telephone fallback wording and retains its privacy link;
- Early Intervention has no “Send a short request” or source typo and exposes
  direct telephone CTAs;
- all five routes retain their canonical URLs and publication policies;
- the `/lp` reviewer index remains staging-only;
- campaign styles stay out of ordinary site pages; and
- the approved AHCCCS, commercial-insurance and HSA/FSA guardrail wording is
  present for review rather than silently broadened.

The Jotform source-template ID `250727122848156` remains documentation-only and
does not occur as a live embed destination. No native POST, Jotform URL,
Contabo submission, webhook, attribution parameter, GA4 event or Google Ads tag
was introduced.

## Clinical and operational claim review

These are findings and proposed owner-review language, not additional published
corrections.

| Area | Current implementation/evidence | Status and required owner action |
|---|---|---|
| ABA eligibility | The four campaign records state 18 months through 8 years and an autism diagnosis requirement (`src/data/campaign/landingPages.ts:37,66-115`). | Pending AIA clinical/organizational confirmation against the accepted organization-wide baseline and each program's actual availability. |
| Evaluation interest | General FAQ currently says an autism diagnosis is required and that AIA offers examination/evaluation services but does not provide diagnoses (`landingPages.ts:102-106`). | Proposed replacement for approval: “An autism diagnosis is required before ABA therapy services can begin. AIA can discuss evaluation options and help families navigate referrals to qualified outside providers. Direct in-clinic diagnostic evaluation availability is not currently established; AIA can discuss potential future treatment services.” Do not publish this substantive change without clinical/organizational approval. |
| Commercial insurance | The commercial FAQ identifies Blue Cross Blue Shield of Arizona PPO plans subject to policy verification and says other commercial plans require inquiry (`landingPages.ts:156-168`). | Pending operations review against the current approved insurer list. No coverage claim was broadened. |
| AHCCCS | The campaign repeatedly identifies UnitedHealthcare Community Plan as the only currently accepted AHCCCS plan (`landingPages.ts:90-91,189-231`). | Retained as the specific approved distinction, subject to current operational confirmation. Do not generalize to other AHCCCS plans. |
| HSA/FSA | Private-pay copy says AIA accepts HSA/FSA cards for ABA program fees and directs families to their account administrator (`landingPages.ts:270-294`). | Pending organizational, financial and privacy/legal review. This is not a tax, qualified-expense or reimbursement determination. |
| Locations | Campaign pages identify the Scottsdale clinic and address through the shared consultation component. | Pending operational confirmation of current public location and service availability. |
| Outcomes and timing | Copy avoids guarantees and says coverage, authorization and timing require verification; no appointment booking was added. | Retain pending clinical/operations review. No response-time commitment or start-date promise is made. |
| Early Intervention | The page describes possible early support, ABA and school-readiness discussions and explicitly says it is not a diagnosis or promise of outcomes. | Pending clinical/editorial review of age, program and referral wording. Telephone-first correction is complete. |

## Decision impacts

- **P9-01:** Presentation ownership is implemented for the five routes. The
  Library CTA's provisional `/client-consultation` destination remains a separate
  ownership/equivalence decision; no redirect was activated.
- **P9-03:** Form ownership remains Jotform by contract, but no integration was
  implemented. Future work requires the JF-01 through JF-09 checks and an
  authorized working-copy/test-form batch.
- **P9-05:** Analytics, GA4, Google Ads and conversion measurement remain disabled.
- **P9-06:** Eligibility, evaluation, insurer, HSA/FSA, program and outcome claims
  remain subject to AIA clinical/organizational approval.
- **P9-07:** Privacy/legal review remains required for the policies, disabled
  contact presentation, eventual Jotform configuration and data flows.

## Validation

From `www`, after the corrections:

| Check | Result |
|---|---:|
| Astro check | 0 errors, warnings or hints |
| Markdown | 20 passing |
| Publication | 33 passing |
| SEO | 35 passing |
| Library | 53 passing |
| Routes | 10 passing |
| Phase 8 regression | 5 passing |
| Campaign and landing-page tests | 11 passing |
| Total recorded tests | 167 passing |
| Normal build | Passed |
| Indexing-enabled build | Passed |
| Link/image/blog audits | 0 failures |
| Offline route reconciliation | Passed against `reports/route-reconciliation-2026-10-21-offline.json`; 70 historical production requests reused and no new requests made |
| `git diff --check` | Passed |

The normal build remains the final build. It has 128 `noindex,nofollow` pages,
including staging-only `/lp`, an empty sitemap and zero hreflang. The
indexing-enabled build has 127 HTML/canonical routes, 109 sitemap URLs, 180
hreflang links across 55 routes, 74 Library records, nine author archives and
nine redirects. No production request or form submission was made.

No new accessibility defect was identified by static or existing guarded browser
coverage. Real screen-reader, fluent-language, clinical, financial, privacy/legal,
cross-browser and organizational acceptance remain pending.

The route reconciliation was regenerated because these source corrections changed
the application fingerprint; the prior October 20 evidence was preserved. The
explicit offline consistency check passed with 138 recorded route dispositions,
128 local generated pages, 9 local redirects and no network or write activity.

## Suggested next batch

Prepare an owner-approved evaluation/insurer/HSA-FSA copy decision package and
complete the remaining Jotform Builder verification gates. A later implementation
batch may update approved copy and build a local `off`/`mock` form integration;
it must not create a live form or activate measurement until P9-03, P9-05 and
P9-07 approvals are recorded. Phase 10 remains responsible for production
acceptance, deployment, rollback and launch authorization.

No files were staged or committed during this review.
