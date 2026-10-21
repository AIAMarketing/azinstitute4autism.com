# Phase 9 landing-page integration checkpoint manifest

Date: 2026-10-20 UTC

Starting branch: `faithful-astro-migration`

Starting commit: `537f9864a0a3d0806180cbeca909bf1d03200c6f`

Proposed commit message: `feat(landing): integrate campaign and early intervention pages`

This checkpoint contains the owner-authorized four-page campaign import, the
branded `/lp/early-intervention` migration, the temporary staging-only `/lp`
review index, source assets, tests, final evidence and the living handoff. It
does not activate forms, Jotform, tracking, advertising or production hosting.

## Approved paths (63)

```text
www/package.json
www/public/assets/campaign/fonts/Playfair-Display-OFL.txt
www/public/assets/campaign/fonts/Rubik-OFL.txt
www/public/assets/campaign/fonts/playfair-display-700.woff2
www/public/assets/campaign/fonts/rubik-400.woff2
www/public/assets/campaign/fonts/rubik-700.woff2
www/public/assets/campaign/media/aba/ahcccs/everyday-routine-640.webp
www/public/assets/campaign/media/aba/ahcccs/everyday-routine.webp
www/public/assets/campaign/media/aba/ahcccs/family-support-640.webp
www/public/assets/campaign/media/aba/ahcccs/family-support.webp
www/public/assets/campaign/media/aba/commercial/creative-play-640.webp
www/public/assets/campaign/media/aba/commercial/creative-play.webp
www/public/assets/campaign/media/aba/commercial/insurance-support-640.webp
www/public/assets/campaign/media/aba/commercial/insurance-support.webp
www/public/assets/campaign/media/aba/general/hero-640.webp
www/public/assets/campaign/media/aba/general/hero.webp
www/public/assets/campaign/media/aba/general/shared-reading-640.webp
www/public/assets/campaign/media/aba/general/shared-reading.webp
www/public/assets/campaign/media/aba/private-pay/consultation-640.webp
www/public/assets/campaign/media/aba/private-pay/consultation.webp
www/public/assets/campaign/media/aba/private-pay/plant-care-640.webp
www/public/assets/campaign/media/aba/private-pay/plant-care.webp
www/public/assets/campaign/media/brand/aia-logo.svg
www/public/assets/campaign/media/brand/gear-outline.svg
www/reports/SESSION_HANDOFF.md
www/reports/migration-summary.md
www/reports/phase-9-campaign-integration-evidence-2026-10-20.json
www/reports/phase-9-campaign-page-integration-2026-10-20.md
www/reports/phase-9-early-intervention-source-2026-10-20.json
www/reports/phase-9-landing-page-checkpoint-manifest-2026-10-20.md
www/reports/route-reconciliation-2026-10-20-offline-18-37-43-828Z.json
www/src/components/OrganizationSchema.astro
www/src/components/campaign/ConsultationForm.astro
www/src/components/campaign/EarlyInterventionPage.astro
www/src/components/campaign/EditorialImage.astro
www/src/components/campaign/FAQ.astro
www/src/components/campaign/Footer.astro
www/src/components/campaign/Header.astro
www/src/components/campaign/Hero.astro
www/src/components/campaign/Icon.astro
www/src/components/campaign/LandingPage.astro
www/src/content.config.ts
www/src/content/pages/en/lp/aba-ahcccs.md
www/src/content/pages/en/lp/aba-insurance.md
www/src/content/pages/en/lp/aba-private-pay.md
www/src/content/pages/en/lp/aba-therapy.md
www/src/content/pages/en/lp/early-intervention.md
www/src/data/campaign/landingPages.ts
www/src/layouts/BaseLayout.astro
www/src/layouts/CampaignLayout.astro
www/src/layouts/EarlyInterventionLayout.astro
www/src/pages/[...slug].astro
www/src/pages/lp/[...review].astro
www/src/pages/lp/[campaign].astro
www/src/pages/lp/early-intervention.astro
www/src/styles/campaign.css
www/src/styles/early-intervention.css
www/tools/campaign-browser.mjs
www/tools/campaign.test.mjs
www/tools/early-intervention-browser.mjs
www/tools/library.test.mjs
www/tools/publication.test.mjs
www/tools/seo.test.mjs
```

## Excluded local paths (6)

The four historical reports are protected exclusions. The two October 20 files
are superseded intermediate landing-page reconciliations. All remain local and
untouched outside the checkpoint.

```text
www/reports/route-reconciliation-2026-10-11-offline.json
www/reports/route-reconciliation-2026-10-12-offline.json
www/reports/route-reconciliation-2026-10-13-offline.json
www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json
www/reports/route-reconciliation-2026-10-20-offline.json
www/reports/route-reconciliation-2026-10-20-offline-18-04-39-776Z.json
```

Root `merge-plan.md` is also a protected path. It was absent from the starting
status and was not read, checksummed, changed or staged.

## Checkpoint safeguards

- Stage the approved paths exactly; do not use a blanket add.
- Compare the staged path set with this manifest before committing.
- Keep all lead submission, API, analytics and advertising behavior inactive.
- `/lp` exists only in normal staging output and remains absent from an
  indexing-enabled release build.
- A technical checkpoint does not close clinical, privacy, accessibility,
  organizational or production-release gates.
