# Phase 9 — Four campaign pages and branded early-intervention page integrated

Date: 2026-10-20 UTC. Status: **implemented locally; release and integration activation not authorized**.

## Scope and authority

The owner authorized importing the four pages from `../aia-aba-landing-pages` while retaining their own design. Main repository: `faithful-astro-migration`, starting commit `537f9864a0a3d0806180cbeca909bf1d03200c6f`; no tracked changes or staged paths at start. The four previously excluded route reports were the only untracked files. Source repository was clean at commit `ee5b297c4c7758bdb6fdbf3f93c8273b20a92c50` and remains unchanged.

This is bounded P9-01 presentation integration, not wholesale authorization of the source project's deployment/API/advertising plans. The newer [P9-03 contract](phase-9-jotform-integration-contract-2026-10-18.md) still controls lead ownership: direct Jotform submission, no Contabo proxy, and no tracking activation. No decision-register status or living handoff was advanced. Clinical, language, privacy, accessibility and Phase 10 release approvals remain open.

## Routes and editing locations

| Campaign | Preserved route | CMS record |
|---|---|---|
| General ABA | `/lp/aba-therapy` | `src/content/pages/en/lp/aba-therapy.md` |
| Commercial insurance | `/lp/aba-insurance` | `src/content/pages/en/lp/aba-insurance.md` |
| AHCCCS / UHC Community Plan | `/lp/aba-ahcccs` | `src/content/pages/en/lp/aba-ahcccs.md` |
| Private pay | `/lp/aba-private-pay` | `src/content/pages/en/lp/aba-private-pay.md` |
| Existing branded early intervention | `/lp/early-intervention` | `src/content/pages/en/lp/early-intervention.md` |

Paths in this report are relative to `www` unless stated otherwise. Page copy, media assignments, FAQ answers, CTA wording and section data remain in `src/data/campaign/landingPages.ts`. Metadata fields are represented in the content collection; route generation fails if title, description, H1, route, English locale or noindex status drifts from the typed source configuration. No new translation relationship is inferred.

`src/pages/lp/[campaign].astro` renders these manifest-backed records through `src/layouts/CampaignLayout.astro` and `src/components/campaign/`. The main catch-all excludes campaign records. Separate route entrypoints prevent the campaign's global stylesheet from being included on ordinary website pages. The original website header/footer and campaign header/footer remain distinct. No new dependency or framework upgrade was needed.

All canonicals use `https://www.azinstitute4autism.com`. Original titles, descriptions, H1s and source `noindex,follow` policy are preserved in indexing-enabled builds. Staging uses `noindex,nofollow`. Shared `Seo.astro` also supplies consistent Open Graph/Twitter metadata. The unchanged existing organization JSON-LD was extracted into `components/OrganizationSchema.astro` for both layouts; this adds the site's established entity to the imported pages without changing the main site's entity or presentation. No article or FAQ structured-data entity was invented for these noindex campaign pages.

The owner subsequently explicitly authorized migration of the live [early-intervention page](https://www.azinstitute4autism.com/lp/early-intervention) as a fifth, separate page. It is not replaced by or redirected to the four campaign imports. Its dedicated `EarlyInterventionLayout.astro`, `EarlyInterventionPage.astro`, `early-intervention.css` and explicit route preserve the compact logo-only header, branded navy/gold styling, source typography, seven sections, imagery and compact footer. Source-authored page CSS is adapted independently; HubSpot's generated theme/wrapper code and scripts are not imported. Existing provisional Library consultation links remain unchanged; changing their destination is a separate editorial/ownership decision.

The source was retrieved through normal TLS validation on October 20 with HTTP 200 and a HubSpot cache HIT (last-modified October 3). Metadata, section text, hierarchy, CSS provenance and image hashes are preserved in [source evidence](phase-9-early-intervention-source-2026-10-20.json). Both existing local photos are byte-identical to the bounded public original-image retrievals. No canonical or robots meta was present in the captured source: the migration supplies the self-canonical source URL through the accepted publication architecture and retains ordinary indexing eligibility when indexing is enabled. This legitimately adds one sitemap URL; the four imported campaign pages remain noindex. No origin-freshness claim is made.

The source typo “Evidense-Based” is retained for editorial review. The source native POST to the Contabo API, hidden attribution field and thank-you destination are deliberately omitted. The panel uses three disabled contact controls in a non-form group, a disabled type-button and an explicit telephone fallback. There is no new submission path. The source nested main landmarks become one meaningful main. The local source comparison fixture disables source scripts and form submission before browser navigation. All public claims and P9-03/P9-05/P9-07 approvals remain open.

## Preserved design and assets

- Eight presentation components: Header, Footer, Hero, Icon, EditorialImage, FAQ, LandingPage and ConsultationForm.
- Original colors, typography, page order, responsive breakpoints, image crops, decorative SVGs, native FAQ disclosures, phone links and mobile CTA treatment.
- `src/styles/campaign.css` matches the source CSS after only font-path namespacing and changing `form > .form-note` to `#lead-form > .form-note` to preserve spacing on the inactive container.
- Twenty-three byte-identical assets/licenses under `public/assets/campaign/`: sixteen WebP files (eight photos and their 640px variants), two SVGs, three WOFF2 fonts and two OFL licenses. Source data matches exactly after media-path namespacing. Hashes are recorded in the companion evidence JSON.
- Source media records describe generated/fictional people and scenes. These do not establish actual AIA facilities, clients, staff or outcomes. Source approval history does not close outstanding licensing, clinical or organizational release review.

Source `PROJECT_SPEC.md`, campaign/content/verification/conversion/build documents and actual source were inspected. Existing research was not repeated: this is a faithful import, not a research-driven campaign or copy rewrite. Source hashes and commits preserve provenance without importing secrets, environment files, advertising CSVs, caches or source build outputs.

## Intentional integration differences

1. Main-site links now use same-origin paths, rather than sending local preview visitors to production.
2. Canonicals no longer depend on the preview origin or a source-project environment override.
3. The imported source API handler, optional Google loader, conversion component, success-storage helper and arbitrary query/attribution forwarding were **not imported**. No `/api/lead` or `/thank-you` route was added. Existing source deployment/CRM plans conflict with the newer Jotform contract and are not activated by this import.
4. The visual consultation panel retains its fields, labels and design as an inactive preview. It contains no native form or submit mechanism: controls are disabled, the action button is a disabled `type="button"`, and a visible phone fallback explains that online requests are not enabled. Thus Enter/native `form.submit()` cannot submit these imported panels. Existing main-site forms are unchanged and retain their previously documented P9-03 limitations.
5. The inactive notice and phone-hours text explicitly identify the current disabled state. The source's remaining marketing copy is retained; references to online requests are not a claim that submission has been activated. Enabling a real Jotform experience requires a separately approved batch and final copy/field/language review.
6. No runtime mode toggle or live form descriptor was added. The campaign pages do not become active merely because `PUBLIC_LEAD_API_URL`, Google variables or a Jotform URL exist in an environment.

The five new panels are not five new active forms. The earlier nine native enquiry instances remain unchanged; future mapping of these campaign journeys to logical Form B, attribution and success measurement requires owner approval under P9-01/P9-03/P9-05/P9-07.

## Regression corrections during integration

An initial record filename collided with the main ABA MDX collection ID even though its slug differed. The publication regression suite detected the missing main-page translation output. All campaign records were moved into `en/lp/`; a new test rejects duplicate MD/MDX IDs and checks `/aba-therapy` remains published. The final build has both pages and the original translation graph.

The SEO suite also exposed the requirement for one existing MedicalOrganization entity on every route. Extracting the existing schema into a shared nonvisual component resolved this without weakening the assertion or altering its values. Final suites pass.

An initial temporary source-reference build invoked from the wrong working directory hit a cross-filesystem rename error. Rebuilding from the isolated `/tmp` fixture succeeded. Its accidental root build scratch directory was moved outside the repository. No source repository configuration was changed and no TLS/signing/sandbox workaround was used.

## Verification

All commands ran from `www`, with `TMPDIR=/tmp` for fixture tests/builds.

| Validation | Result |
|---|---|
| `npm run check` | Zero errors, warnings or hints after browser-runner typing cleanup |
| `npm run test:markdown` | 20 passing |
| `npm run test:publication` | 33 passing |
| `npm run test:seo` | 35 passing |
| `npm run test:library` | 53 passing |
| `npm run test:routes` | 10 passing |
| `node --test tools/phase8.test.mjs` | 5 passing |
| `npm run test:campaign` | 8 passing; also checked indexing-enabled output |
| **Total regression tests** | **164 passing** |
| Normal and `PUBLIC_ALLOW_INDEXING=true npm run build` | Both succeed; normal staging restored last |
| `npm run audit:links` | 0 broken internal links |
| `npm run audit:images` | 0 missing mapped images |
| `npm run audit:blog` | 0 failures |
| Explicit offline reconciliation check | Pass; no fresh crawl |
| `git diff --check` | Pass |

The new campaign tests cover duplicate content identities, publication/metadata parity, source FAQs, local media/fonts/licenses, inactive submission semantics, valid links/fragments and CSS isolation. The existing Library test's total route expectation changed from 122 to 127; all Library-specific assertions remain intact.

### Guarded browser comparison

Playwright 1.63.0 from the existing neighboring project's installation, Chromium 151.0.7922.75, Node 24.18.0. No dependency was installed or upgraded. Loopback-only static servers served the current staging build, a clean source-project build without environment files/secrets, and the saved main-site baseline.

The reusable `tools/campaign-browser.mjs` checks all four campaign routes at **320, 390, 768 and 1440px**, device scale factor 1. It compares visible source text, section bounding boxes, backgrounds, heading/body fonts and image dimensions/loading. The intentionally inactive consultation region is excluded from exact source geometry comparison; it is captured and tested for disabled controls and accessible fallback. FAQ keyboard Enter/focus, consultation anchors, all four no-JavaScript pages, and absence of arbitrary payer-link query forwarding are verified. Main-site `/`, `/es`, `/library` and `/aba-therapy` are compared at 390/1440px for unchanged stylesheet URLs, title, body font, H1 size and document width.

Coverage: **24 grouped checks** (16 campaign viewport comparisons + 8 main-site checks), **32 full-page captures** (16 source + 16 imported), **four no-JavaScript campaign routes**. Additional link/query and request assertions are not counted as unique routes. This is eight distinct destination routes, not 24 unique pages. No 200%/400% zoom or real screen-reader session was newly performed in this import.

Before navigation, the harness blocks service workers, WebSockets, non-GET/HEAD requests and every non-loopback origin. No production API, Jotform, advertising, authentication or form submission was attempted/transmitted in the successful pass. No synthetic submissions were necessary. External maps are click-only links on these pages, not automatically loaded widgets.

Screenshots remain under `/tmp`; paths and SHA-256 hashes are retained in the companion JSON. Full desktop General ABA and mobile AHCCCS captures were visually inspected against the source; automated geometry checks are not human stakeholder or comprehensive assistive-technology acceptance. The first comparison used DOM `textContent`, which exposed harmless inter-element compression whitespace; it was corrected to compare rendered `innerText`, while metadata/FAQ content assertions remain exact. Failed development checks were not presented as acceptance evidence.

Reproduction after a normal build:

```bash
npm run test:campaign
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
CHROMIUM_EXECUTABLE=/absolute/path/to/chromium \
CAMPAIGN_REFERENCE_DIST=/tmp/clean-source-build/dist \
CAMPAIGN_BASELINE_DIST=/tmp/saved-main-site-build \
npm run verify:campaign
```

Reference/baseline variables are optional; without them the runner validates the imported pages but does not claim source comparison. Build the reference from an isolated copy of source `src`, `public`, package/config and existing dependencies, with no `.env` or secrets copied. Start the build in the fixture's working directory. Never enable source forms or tracking for comparison.

## Final publication baseline

| Metric | Before | After |
|---|---:|---:|
| HTML routes / unique canonicals | 122 / 122 | 127 / 127 |
| Indexing-enabled sitemap URLs | 108 | 109 |
| Hreflang links / routes | 180 / 55 | 180 / 55 |
| Established translation sets | 25 | 25 |
| Library records | 74 | 74 |
| Search records EN / ES / AR | 55 / 12 / 7 | 55 / 12 / 7 |
| Author archives | 9 | 9 |
| Redirect definitions | 9 | 9 |
| Library visible/schema FAQs / articles | 182 / 30 | 182 / 30 |
| Normal staging noindex,nofollow pages | 122 | 127 |
| Normal staging sitemap / hreflang | 0 / 0 | 0 / 0 |

There remain 72 BlogPosting entities for 74 Library records because accepted syndicated canonical exceptions are unchanged. Campaign FAQs are visible native disclosures; no new FAQPage schema is emitted for their noindex pages.

The preserved four-page intermediate [offline route reconciliation](route-reconciliation-2026-10-20-offline.json) reuses the explicit October 15 badge-final artifact and its 70 historical requests. Schema 2, 137 dispositions, 126 local generated routes, nine redirect definitions. Explicit `--check --evidence reports/route-reconciliation-2026-10-20-offline.json` passed against the four-page staging artifact. The reconciliation's historical source-sitemap count of 102 is not the final local indexing-enabled sitemap count of 109. Historical requests do not establish current production page content or hosting behavior.

## Remaining review and stopping point

- Review imported visual design, inactive lead UI and source claim qualifications; real screen-reader and non-Chromium acceptance remain pending.
- Approve campaign-to-Jotform field/locale mapping, phone fallback wording, notifications and secure isolated testing before activating submissions.
- Keep all pending P9-03 JF gates, P9-05/P9-07 measurement/privacy gates and clinical/organizational review. No legacy API/CRM instructions are adopted as current authority.
- The fifth-page migration is authorized and complete; no redirect, campaign equivalence, submission activation or change to existing Library CTAs was inferred.
- Production hosting, deployment, activation, rollback and final launch remain Phase 10 actions requiring explicit authorization.

No commits, staging, pushes, source-repository modifications, deployment or production integrations occurred. Protected exclusions were neither read nor changed. Bulky browser artifacts and temporary build fixtures are outside Git. See [sanitized source, asset, browser and validation evidence](phase-9-campaign-integration-evidence-2026-10-20.json).

## Fifth-page follow-up verification

The dedicated guarded `tools/early-intervention-browser.mjs` compares captured-source headings, H1 computed font and hero widths at 320/390/768/1440px; checks loaded images, no horizontal overflow, canonical staging protections, inactive controls and consultation anchors; and checks JavaScript-disabled output at 390/1440px. It blocks all nonlocal requests, non-GET/HEAD methods, service workers and WebSockets. This pass adds six grouped checks on **one** destination route, not six unique routes. Ten captures comprise four sanitized-source captures, four imported JavaScript captures and two imported no-JavaScript captures. Desktop/mobile full-page captures were visually inspected; no real screen-reader or stakeholder acceptance is claimed. The phone notice intentionally changes form-panel height. Source footer wrappers and source runtime behavior are not reproduced.

Reproduce after a normal build with `PLAYWRIGHT_MODULE`, `CHROMIUM_EXECUTABLE` and optional `EARLY_REFERENCE_DIR` pointing to a sanitized script-free capture, then `node tools/early-intervention-browser.mjs`. Do not point the reference at a live service or enable its POST form. Evidence hashes and the final reconciliation path are recorded in the companion integration JSON. The 32 four-page captures and ten fifth-page captures describe different passes and should not be reported as 42 unique routes.

Final five-page reconciliation: [route-reconciliation-2026-10-20-offline-18-04-39-776Z.json](route-reconciliation-2026-10-20-offline-18-04-39-776Z.json), schema 2, 137 dispositions / 127 local routes / nine redirect definitions / 70 reused historical requests. Explicit read-only check passed after restoring the final normal build. Earlier evidence is preserved. Final fifth-page Chromium evidence: `/tmp/aia-early-browser-i07rXk/evidence.json`; screenshot hashes are copied into the companion JSON. There were zero blocked/attempted external requests or browser runtime errors in this pass. The scoped reference server was stopped.

The Library suite initially retained its pre-restoration 108-sitemap assertion; updating that one expected count to 109 reflects the authorized fifth page, without changing publication rules. The rerun passed all 53 Library tests. The final 164-test total includes the new eighth campaign/early-intervention test. No protected file was inspected, checksummed or changed.

## Subsequent owner request — temporary `/lp` review index

Added a staging-only five-link utility, modeled on `https://astro.web3app.dev/`, in `src/pages/lp/[...review].astro`. The index is labeled testing-only, uses no scripts or external resources, and has `noindex,nofollow`. It is not added to content publications, sitemap, hreflang or main-site navigation. `PUBLIC_ALLOW_INDEXING=true` omits the route entirely. Normal staging now contains 128 HTML routes; indexing-enabled output remains 127 with 109 sitemap URLs. This supersedes only the earlier normal-staging route count. Build-mode gating is not authentication; production release must use its approved release artifact.

The Library suite checks all five links and the build-mode exclusion. Chromium 151 checks at 320/1440px confirmed no overflow, visible focus and successful local destinations. Temporary captures/evidence: `/tmp/aia-campaign-browser-HdWNvy/`. No form, tracking or production behavior changed.

Review-index final evidence: [offline reconciliation](route-reconciliation-2026-10-20-offline-18-37-43-828Z.json), 138 dispositions / 128 local routes, 70 reused historical requests. Explicit read-only consistency check passes. All 53 Library tests pass in the two-mode fixture build, including the new review-index assertions. Earlier route reports remain unchanged.
