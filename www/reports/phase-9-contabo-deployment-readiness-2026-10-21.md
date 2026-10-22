# Phase 9 P9-09 — Contabo Deployment Readiness and Rollback Plan

Date: 2026-10-21
Status: Planning only; no VPS, DNS, Cloudflare, nginx or TLS system was contacted or changed.

## Proposed topology

The preferred target is a static Astro artifact served by an owner-controlled Contabo VPS, with the existing non-PHI API kept separate. Jotform would receive protected lead submissions directly after independent approval. The Raspberry Pi 4B remains a fallback. HubSpot remains the current public host until Phase 10 authorization.

This is a proposal, not a verified description of the production machine. The owner must supply sanitized facts for the VPS operating system/NixOS generation, deployment user and permissions, nginx or equivalent service, TLS termination, Cloudflare/DNS ownership, current API boundary, backup location, monitoring, and rollback authority. No secrets, private keys or credentials are required for this planning report.

## Artifact and release layout

Build in a clean, locked toolchain and publish an immutable artifact such as:

```text
/srv/aia/releases/<git-sha>/dist/
/srv/aia/current -> /srv/aia/releases/<git-sha>/dist
/srv/aia/shared/          # only reviewed non-secret shared files
```

Upload to a temporary release directory, verify the manifest and hashes, apply ownership/permissions, then atomically switch `current`. Keep at least the last known-good release and record the build SHA, Node/npm versions, lockfile hash and environment mode. Never put `.env` secrets in the static artifact.

## Cutover and rollback

1. Build and audit locally in normal staging mode, then separately build the approved indexing-enabled artifact.
2. Verify route, asset, robots, sitemap, redirect and 404 manifests before upload.
3. Upload the immutable release without changing DNS.
4. Run loopback or host-local checks through the intended web server.
5. During an approved window, atomically switch the symlink and verify HTTPS, canonical host, slashless routes, query preservation, static assets, real 404s and redirect targets.
6. If health checks fail, stop traffic changes and atomically point `current` back to the prior release. Preserve logs and manifests for review; do not hot-edit the failed artifact.

Rollback triggers include unexpected 5xx responses, wrong host/canonical behavior, missing assets, a non-empty staging sitemap, indexing headers on a staging artifact, redirect loops, unapproved form/API/counter traffic, or inability to reproduce the release manifest.

## Required server behavior

- HTTPS and canonical `www.azinstitute4autism.com` behavior must be verified by the hosting owner.
- Slashless public URLs, query strings and fragments must remain intact.
- Static assets need long-lived immutable caching only when their names are content/version safe; HTML should use short revalidation appropriate to the cutover plan.
- Staging must retain `noindex,nofollow`, an empty sitemap and no hreflang. `noindex` is not access control; access restriction must be separately configured if needed.
- Production requires the approved sitemap/robots policy and real 404 handling.
- The temporary `/lp` review index must be excluded from the intended production artifact or explicitly owner-approved before a release.

## Integration isolation

`PUBLIC_COUNTERS_MODE=off` and `PUBLIC_AIA_FORMS_MODE=off` are the safe staging defaults. A live counter adapter, Jotform IDs, analytics, advertising and conversion events require separate approvals and environment gates. Jotform answers must not traverse Contabo; the existing API may handle only approved non-PHI operations. No arbitrary query strings, referrers or form answers may enter logs or tracking.

## Local rehearsal

The installed environment did not expose an `nginx` executable, so no nginx service or configuration was touched. The normal Astro artifact was built successfully and inspected locally; the guarded loopback Chromium run recorded zero production attempts. A future rehearsal may use an isolated temporary nginx prefix or a loopback static server, provided it cannot affect active services or reach production systems.

## Phase 10 acceptance checklist

- Owner supplies and reviews sanitized topology/configuration facts.
- Reproducible build and artifact manifest are archived.
- HTTPS, canonical host, redirects, 404s, query handling and assets pass from the intended server.
- Staging/indexing modes are proven separate.
- Counter/form modes and third-party requests are verified in the target environment.
- Backups, release retention, monitoring and rollback operator are named.
- Real accessibility, language, clinical, privacy and legal approvals are recorded.
- A release owner authorizes go/no-go and rollback authority.

P9-09 remains pending. This report does not authorize deployment or infrastructure changes.
