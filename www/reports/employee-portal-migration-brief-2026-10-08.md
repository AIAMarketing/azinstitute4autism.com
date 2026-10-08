# AIA employee portal — migration brief and decision record

**Recorded:** 2026-10-08  
**Project:** HubSpot to Astro migration, branch `faithful-astro-migration`  
**Status:** Requirements clarified; implementation architecture and launch authorization still pending  
**Related milestone:** Phase 9 human-decision gate, with implementation and verification required before cutover

## Purpose

Preserve the existing staff-facing `/employee-portal` experience during the move
from HubSpot to Astro on the AIA Contabo VPS. This is a small internal resource,
**not** an ordinary public marketing page. The owner describes its intended
protection as low-security, but that description is not a determination that the
underlying staff data or linked forms are safe to publish.

The current user-supplied requirements supersede earlier audit uncertainty
about the purpose of this route. They do **not** authorize a new authentication
implementation or relaxation of security/privacy checks.

## Confirmed legacy behavior (owner-supplied)

- The HubSpot employee portal contains **staff contact information** and links
  or access to **day-to-day clinical-operations forms**.
- It has **two shared-password access levels**: general staff and management.
  Preserve the separation and the intended content available to each group.
- The password handling and content are supplied in JavaScript/HTML through
  the HubSpot page's **footer HTML field**.
- The supplied script embeds two independent encrypted HTML streams in a JSON
  script element. The implementation labels them
  `AES-256-CBC+HMAC-SHA256`, with PBKDF2-HMAC-SHA256 (200,000 iterations) used to
  derive separate encryption and MAC keys from the entered passphrase.
- On password submission, the browser tries each stream; a matching MAC is
  checked before decryption. On success, the script replaces the password
  form with the decrypted HTML. Incorrect passwords leave the form visible.
- Decryption happens **entirely in the browser**, without an authenticated
  server-side session. The encrypted data is downloadable with the page and
  can be subjected to **offline password guesses**.

The supplied excerpt shows the encryption/decryption logic and encrypted
payload, but not the decrypted staff/management HTML or every surrounding
page element. The inventory of individual contacts, form destinations,
permissions, and client-side behavior therefore still requires a separate
owner-approved inspection.

**Sensitive material deliberately omitted:** the actual passphrases, encrypted
payload, decrypted HTML, contacts, staff details, and form-specific data are
not included in this document or any proposed Git commit. Do not paste,
log, or commit them. Rotate the shared passphrases before any migration
cutover; supply replacement secrets through an approved private mechanism.

## Current Astro state (repository-verified 2026-10-08)

- `www/src/content/pages/en/employee-portal.md` defines the
  `/employee-portal` page route with metadata only; it has no portal body.
- It is `draft: false` and `noindex: true`.
- Phase 3A deliberately preserves the accessible local route while excluding
  it from the production-policy sitemap. The staging build remains globally
  `noindex,nofollow`.
- The existing migration audit listed employee portal replacement/access as
  a human-decision gate. This brief clarifies the requirements without
  treating the empty Astro route as a completed migration.

References:
- `www/reports/migration-audit-2026-10-06.md`
- `www/reports/migration-summary.md`
- `www/reports/migration-conversation-2026-10-07.txt`
- `www/src/content/pages/en/employee-portal.md`

## Desired migration behavior

1. Preserve the public-facing **route** `/employee-portal`, but do not expose
   internal content to unauthenticated visitors.
2. Preserve **general staff** and **management** content separation.
3. Preserve the practical staff workflow: contact lookup, form links, and
   day-to-day usability, including mobile layout.
4. Maintain the established `noindex` and sitemap-exclusion policy. Do not
   add a translation alternate for this noindex route.
5. Audit each form link, embedded form, external provider, and asset before
   migration. Identify whether any workflow collects, displays, or transmits
   patient data or other sensitive information. Do not assume an internal
   form's data handling is safe merely because the portal is gated.
6. Do not enable third-party advertising or general-purpose analytics tags
   within the protected portal without an approved privacy review.
7. Preserve existing functionality without prematurely creating a user-account
   database, integrating a full identity provider, or changing clinical forms.
   Any such change requires a separate owner decision.

## Authentication/hosting decision — NOT YET RESOLVED

Two approaches are plausible. Do not select one implicitly.

**A. Reproduce the existing browser-side encrypted-content model.**
This offers closer functional compatibility and may remain entirely static,
but it is **obfuscation/access friction rather than robust access control**:
all ciphertext is publicly downloadable and shared passphrases can be tested
offline. It offers no individual account revocation or reliable per-user audit
trail. Use only after explicit owner acceptance of these limitations and
review of all included content.

**B. Protect staff and management resources at the Contabo server/edge.**
For example, separate protected URL/resource areas with nginx or another
server-side access control, while keeping `/employee-portal` as the entry
point. This avoids distributing readable internal content as public HTML and
can separate the two groups, but requires a design for two access levels,
credential distribution/revocation, and hosting operations. A single
undifferentiated HTTP Basic Auth gate is **not by itself** sufficient to enforce
different staff and management permissions.

**Security boundary:** `noindex` and omission from the sitemap are SEO
directives, **not** access controls. If server-side protection is selected,
protected plaintext must not be shipped as publicly retrievable assets in the
Astro `dist/` tree, public Git repository, or an unguarded CDN. Do not embed
passwords in browser JavaScript, frontmatter, static environment variables, or
committed web-server config.

## Decisions to obtain before implementation

- Confirm the exact resources visible to **staff** versus **management**
  without storing them in public migration documentation.
- Classify staff contact details, form links, linked systems, and any clinical
  or patient-related content; decide what is allowed in an externally reachable
  portal.
- Select browser-side compatibility or server-side Contabo protection (and
  whether existing URL/layout behavior should be retained verbatim).
- Decide how replacement credentials will be generated, distributed, rotated,
  and revoked. Avoid reusing the old shared passphrases.
- Approve which portal forms/links are maintained, replaced, removed, or
  re-hosted. Check destination URLs and privacy implications.
- Name the approver for both access-level mapping and launch acceptance.

## Future implementation milestone (separate from Phase 3B)

1. Perform a **read-only inventory** of the existing decrypted staff and
   management views through owner-authorized access; record only non-sensitive
   structure, required features, and form destinations in public reports.
2. Obtain the decisions above. Produce a short design and threat/operational
   tradeoff review before implementing anything.
3. Implement in a scoped, reviewable milestone. Preserve the route and
   publication policy; do not alter other migration page families.
4. Validate the access boundary: unauthenticated users cannot read protected
   content; staff cannot read management-only content; management can access
   its intended resources. Check direct URLs, page assets, and caching.
5. Validate UI and operations: wrong credentials, successful access, refresh,
   mobile layout, keyboard access, link destinations, and form workflows.
6. Check `noindex`, sitemap omission, no hreflang, and absence of unintended
   tracking/PHI leakage. Conduct an authorized privacy/security review.
7. Keep rollback instructions and credential-rotation procedures alongside
   the Contabo cutover checklist. Do not activate until separately approved.

## Scope note

This is **documentation only**. It must not change Phase 3A publication policy,
Phase 3B hreflang implementation, Astro routing, production access, forms,
analytics, or server configuration. It does not claim authentication,
HIPAA compliance, or release readiness.
