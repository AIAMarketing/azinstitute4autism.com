# Google Ads consultation-form conversion: Astro implementation handoff

**Recorded:** 2026-10-08  
**Repository branch:** `faithful-astro-migration`  
**Status:** **Configuration documented only. NOT approved for production installation or activation.**

This document preserves the conversion action configured in the AIA Google Ads
organization account for the future Astro consultation/ABA-therapy landing pages.
It is a handoff to the site-migration and landing-page implementation work, **not**
authorization to install advertising tags. Follow the repository's
`AGENTS.md`/form-implementation constraints. As of this document, existing
migration forms are intentionally static; do not silently wire them to a backend
or add tracking while working on the visual migration.

## Google Ads configuration (verified in account UI)

| Field | Value |
| --- | --- |
| Google Ads customer/account | `515-940-4739` |
| Conversion action | `AIA | Consultation Form Submitted` |
| Goal/category | `Submit lead form` |
| Source | Website, **manual event** |
| Optimization | Primary; account-default goal (alongside Phone call lead) |
| Value | USD $1, fixed nominal reporting value (not actual revenue) |
| Count | One conversion per ad interaction |
| Click-through conversion window | 90 days |
| Engaged-view / view-through windows | 3 days / 1 day |
| Attribution | Data-driven |
| Enhanced conversions | **Not configured; do not enable** |
| Google tag setup | Not installed/verified for this new account |
| Conversion type ID (Google Ads UI reference only) | `7830657062` |

**Identifiers copied from the Google Ads “See event snippet” dialog:**

- **Google Ads destination / tag ID:** `AW-18494479353`
- **Conversion label:** `MzxbCKaw-ZUdEPm37fJE`
- **`send_to` value:** `AW-18494479353/MzxbCKaw-ZUdEPm37fJE`

The event snippet displayed in Google Ads is:

```html
<!-- REFERENCE ONLY. DO NOT DEPLOY WITHOUT PRIVACY APPROVAL. -->
<script>
  gtag('event', 'conversion', {
    'send_to': 'AW-18494479353/MzxbCKaw-ZUdEPm37fJE'
  });
</script>
```

The `AW-` destination ID and conversion label are **not secrets**. Their
publication in source documentation does not imply permission to transmit data
to Google.

## Intended conversion semantics

One conversion represents **one consultation/ABA-therapy inquiry whose form
submission is accepted successfully by the approved API**, not a page visit,
form start, validation attempt, button click, or failed request.

The Google Ads dialog offered `Page load` and `Click` snippet options. The
`Page load` option was used to **retrieve the event syntax**, not as a mandate
to fire on arbitrary page loads. For the Astro/API flow, **prefer triggering
explicitly after the API returns a verified success response**, provided the
privacy review has approved the entire data flow.

Avoid a generic `/thank-you` page-load conversion: direct visits, refreshes,
or failed/subsequently redirected submissions can create false conversions
unless access and deduplication are robustly controlled. If confirmation-page
measurement is selected later, document and test how successful submissions
are authenticated and repeated visits are prevented from counting again.

## Integration requirements — gated, not yet authorized

1. **Privacy/HIPAA and Google Ads policy approval comes first.** Review with
   AIA's responsible privacy/compliance team whether any Google tag may load
   on the relevant pages, including the confirmation page. A health-service URL
   and request metadata can disclose sensitive context even when no form fields
   are sent. Review URL/path/query string, referrer, IP/device information,
   cookies, network requests, automatic collection, consent, and applicable
   Google terms/policies. **No tag loading at all** until that review is
   completed and explicitly approved; a nominally sanitized `gtag` event is
   not itself evidence of HIPAA compliance.
2. **Keep enhanced conversions and customer-data features off.** Do not send
   names, emails, phone numbers, diagnoses, dates of birth, form contents,
   hashed identifiers, `user_data`, or any patient-related values to Google.
   Do not import sensitive customer lists or enable remarketing/health-audience
   personalization. Don't append PII/PHI to redirect URLs, analytics events,
   or advertising parameters.
3. **Do not add the base Google tag globally** to `src/layouts` or shared
   head scripts as part of the ordinary site migration. If approved, provide
   the minimum audited, route-specific implementation with explicit policy
   controls. The Google Ads event requires a correctly initialized Google tag
   (or a separately approved GTM implementation); the event snippet alone
   cannot measure a conversion.
4. **Fire only after confirmed API success.** Use the real form endpoint's
   documented response contract, not a presumed HTTP 200 or a click handler.
   Fail closed on network error, invalid/partial responses, validation failure,
   or spam rejection. Guard against duplicate calls from double-clicks,
   retries, navigation, and refreshes.
5. **Keep the event minimal.** Once explicitly approved and initialized, the
   only required conversion-event field in the recorded snippet is `send_to`.
   Do not add `value`, `currency`, `transaction_id`, URL parameters, or
   custom data without separate measurement/privacy review.
6. **Test safely.** First unit/integration-test form-success logic using a
   mocked `gtag` and synthetic submissions. Test zero events on errors and
   exactly one on verified success; inspect final URLs and outgoing requests.
   Any real Google-network testing is itself tag deployment and requires the
   same privacy approval. Verify the event in Google Ads/Tag diagnostics after
   approval and deployment.
7. **Release gate.** Do not enable the paused campaign until the landing pages
   are production-ready, successful forms are verified end to end, conversion
   measurement is tested and approved, the healthcare/call-asset terms issue is
   resolved, and the advertising-policy review is complete.

### Illustrative invocation — not production-ready code

```ts
// Documentation-only. Run ONLY inside a privacy-approved implementation,
// after the approved API's actual success condition has been verified and
// the approved Google tag is initialized. Add submission-level deduplication.
gtag('event', 'conversion', {
  send_to: 'AW-18494479353/MzxbCKaw-ZUdEPm37fJE',
});
```

Do **not** paste that example into a generic `submit` event handler or a
shared page layout: doing so before the asynchronous API response succeeds
would count attempted or failed inquiries.

## Related campaign and implementation notes

- The Search campaign in Google Ads account `515-940-4739` is intended to
  remain **paused** during the Astro/Contabo migration and privacy audit.
- The other account-default Primary goal is `Phone call lead`, presently an
  `AI-qualified call leads` action with a 60-second qualifying duration and
  `Count = One`. Its Call and Messaging Ads Terms/HIPAA-exclusion question
  is a separate launch blocker.
- The standalone advertising landing pages and associated form API work may
  have their own repository or implementation handoff. Reconcile this document
  with that source before making changes; do not assume the migration repo's
  static forms already implement those endpoints.
- For privacy, keep identifiers limited to the public Ads destination ID and
  conversion label; **no API credentials, patient examples, or submitted lead
  data belong in this documentation**.

## Implementation checklist

- [x] Create the Google Ads manual Website conversion action and record IDs.
- [x] Configure Primary, One, $1, data-driven attribution; enhanced conversions off.
- [ ] Approve the exact third-party tag/data-flow design through AIA privacy review.
- [ ] Confirm form API success contract and documented submission deduplication.
- [ ] Implement a strictly gated, audited event only on verified form success.
- [ ] Verify outgoing network payloads and URLs contain no sensitive information.
- [ ] Complete approved end-to-end tracking tests and inspect Google Ads diagnostics.
- [ ] Confirm Google call-assets terms/HIPAA exclusion and other launch gates.
- [ ] Unpause campaign only after written go-live approval.
