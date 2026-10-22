# Phase 10 — Guarded Browser Regression

Date: 2026-10-22 UTC
Browser: Chromium 151.0.7922.75 via Playwright 1.61.0
Transport: loopback-only Astro preview; service workers blocked; WebSockets closed; all non-loopback and non-GET/HEAD requests intercepted before transmission.

## All-route smoke

`tools/phase10-browser-regression.mjs` opened **128 of 128** generated staging routes. All returned HTTP 200, had a title, one canonical, staging `noindex,nofollow`, no page errors and no horizontal overflow failure. No production/API/Jotform/Google/HubSpot attempt was observed.

Six full-page screenshots were captured outside the repository under `/tmp/aia-phase10-browser-sxY6Bg` for representative English, Spanish, Arabic, Tour and campaign routes. They are temporary evidence, not checkpoint artifacts.

The only console errors were four blocked Leaflet resource errors on `/contact` and `/es/contact`; the guard recorded the corresponding four `unpkg.com` GET attempts. They were blocked before transmission. No OpenStreetMap request followed because Leaflet did not load.

## Responsive matrix

`tools/phase10-responsive.mjs` exercised **22 representative routes × 5 widths = 110 checks** at 320, 390, 768, 1024 and 1440px. All checks passed, including one main H1 per route, Arabic `lang="ar"`/`dir="rtl"`, and document width not exceeding the viewport. Ten selected 320/1440 screenshots were written under `/tmp/aia-phase10-responsive-h1o5Kt`.

The pass includes the five campaign pages, English/Spanish home and contact routes, consultation/referral routes, Arabic article presentation, Library pagination, search, privacy, Tour and representative service pages.

The responsive run initially exposed two reproducible defects. The final run passed after:

- constraining the mobile `PageHero` heading width; and
- changing the Library grid's first track to `minmax(0, 1fr)`.

## Existing interaction and accessibility evidence

The prior guarded Phase 9/8 interaction run remains **41 checks, zero failures**. The prior no-JavaScript browser evidence covers 50 routes. This session did not claim a new real screen-reader session. Native dialog/browser-chrome focus behavior remains a manual assistive-technology review item.

Automated checks cover keyboard-visible focus and interaction paths already encoded in the repository suites, Tour fallback/controls, localized forms in off/mock presentation, Arabic direction and diagrams, and reduced-motion CSS. These are not human WCAG or clinical-language sign-offs.

## Network result

Attempted blocked requests: four Leaflet CSS/JS GETs. Successfully transmitted production requests: **zero**. Production API, Jotform, Contabo form, advertising, analytics, authentication and WebSocket interactions: **zero**.

## Outstanding browser review

Real screen-reader testing, authorized visual acceptance, non-Chromium compatibility and fluent Spanish/Arabic review remain pending. The cache-qualified source captures for Tour and Spanish privacy do not establish current-origin parity.
