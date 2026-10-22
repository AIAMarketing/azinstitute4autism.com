# Phase 10 — Local Release and Artifact Rehearsal

Date: 2026-10-22 UTC
Status: Local-only rehearsal; no host, DNS, TLS, nginx, Cloudflare or Contabo access.

## Build artifacts

The normal staging build produced **128 HTML routes**. The final static inspection confirmed every HTML page carries `noindex,nofollow`, the sitemap has zero URLs and no hreflang links are emitted. The temporary `/lp` review index is present only in this staging artifact.

The indexing-enabled build produced **127 HTML routes**, **109 sitemap URLs** and **180 hreflang links**. `/lp` is absent from this artifact. The 74 Library articles, 55/12/7 search inventories, nine author archives and nine redirects remain unchanged.

`tools/phase10-artifact-verify.mjs` passed both modes. Final staging artifact result: 128 HTML routes, 0 sitemap URLs, 0 hreflang links, 409 files, SHA-256 `7ce4341f430a0a49ccc9f074219553c5d9967659c6cf1392042b99335d5009d9`. The indexing artifact passed with 127 HTML routes, 109 sitemap URLs, 180 hreflang links, no `/lp` review index and no active native lead actions; its previously recorded digest is `7ed57ab8089f3fa77c482e3ff229cd3179c470df2a3a1c4cb94c0c76ed02034c`.

The artifact verifier rejects non-search native form actions, active Jotform/tracking scripts, live form mode, production API origins and credential-like strings. It does not claim that static validation replaces deployment or privacy approval.

## Static-serving rehearsal

No `nginx` executable is available in the current environment, so no nginx configuration was installed or tested. `tools/phase10-release-rehearsal.mjs` used an isolated loopback Node static server and passed:

- staging artifact verification;
- root and locale routes;
- slashless and trailing-slash file resolution;
- query-string preservation;
- SVG MIME type;
- robots and empty staging sitemap;
- real 404 handling;
- atomic `current` symlink switch; and
- rollback to the prior release.

The rehearsal reported `productionContact: false`. Its temporary release root was outside the repository.

## Deployment assumptions still requiring verification

The Contabo/NixOS operating system, service user, nginx topology, TLS termination, canonical host, DNS/Cloudflare ownership, release permissions, backups, monitoring and rollback operator remain unknown. The existing P9-09 plan remains the source of the sanitized questionnaire and versioned release-directory proposal. No production rewrite, redirect, cache or security-header configuration was installed.

## Required future host rehearsal

An owner-approved staging host must serve a verified indexing artifact through the intended server, then exercise HTTPS, canonical host, redirects, query strings, static assets, 404s, cache behavior, robots/sitemap, counter/form environment gates and rollback. Staging remains nonproduction and must not be treated as access control solely because it is noindex.
