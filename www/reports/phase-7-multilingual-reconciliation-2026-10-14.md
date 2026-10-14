# Phase 7 — Multilingual reconciliation

Completed: 2026-10-14 UTC; public-source observations: 2026-10-13.
Branch: `faithful-astro-migration`; unchanged HEAD: `b5bc95bc2b8e36c58e8b4d8ab4b11391374a7883`.
Status: **Technically accepted for user-controlled checkpoint preparation; human release gates remain open; not committed.**

## Scope, authority and starting state

Read AGENTS.md, MIGRATION_BRIEF.md, AUTONOMOUS-CODEX.md, the living handoff, ratified Phase 6A–6C records, Phase 6C.5 acceptance, Phase 6C.2 translation and 6C.3 metadata reports, and the employee-portal brief. The October 7 migration conversation's working roadmap remains authoritative: Phase 7 multilingual reconciliation, Phase 8 visual/accessibility acceptance, Phase 9 human decisions, Phase 10 final QA/cutover readiness. No renumbering. The subsequent authorized checkpoint preparation updates the living handoff; implementation-stage evidence below retains its historical context.

Initial index and tracked working tree were clean. Exactly five untracked exclusions were present: `merge-plan.md` and the four intermediate route reports listed in the structural inventory below. Only their names were inspected. No contents, hashes or changes to these files; no staging, commit, push, deployment or production integration activation.

## Source method and qualifications

[Source evidence](phase-7-source-evidence-2026-10-13.json) contains 21 bounded public GET observations: nine EN/ES page pairs and three author roots. Robots.txt allowed these routes; requests were spaced at least one second apart. No unpublished previews, authentication, scripts, forms, API mutations or unrestricted crawl. All 21 final responses were HTTP 200; `/es` redirected to `/es/`. Individual requested/final URLs, times, status lines, selected cache headers, SHA-256, metadata, headings, main-body text and links are retained. Cookies and transient proxy addresses are excluded. No redundant full production HTML was added.

Normal TLS retrieval failed certificate-chain validation. The public-only fallback used curl with certificate verification bypassed; this weakens transport assurance and is disclosed, not an application or hosting configuration change. The web reader also failed Spanish privacy/robots; its available English policy view was cached. Most page headers identify October 3 HubSpot prerenders and HIT/MISS caching. Neither a cache MISS nor retrieval time proves current origin freshness. The evidence establishes fidelity to these observed public representations, not independently rendered public-page parity.

## Complete non-Library inventory

Before: 29 non-Library page records (20 EN / 8 ES / 1 AR), of which 28 eligible. After: 30 records (20 EN / 9 ES / 1 AR), of which 29 eligible. The Arabic home record is an unpublished draft, not an Arabic homepage. Three Library-root content records and derived Library/author pages are excluded from this non-Library page count. Existing eight EN–ES non-Library relationships become nine with privacy; no published non-Library EN–AR relationship is fabricated.

Checkpoint inventory clarification (2026-10-14): recomputed from both `git show HEAD` content records and the working collection through `createPublicationManifest`. The population is `collection === pages` excluding **all three** records with `slug === library`; it includes the unpublished `/ar` draft and metadata-only eligible `/employee-portal` (eligible does not mean indexable or functionally complete). It excludes blog articles, author records/archives, generated pagination and utility routes. The final classification matrix therefore covers exactly **30 records = 20 EN + 9 ES + 1 AR draft**, with 29 eligible pages and nine EN–ES pairs.

| Population | Before EN / ES / AR | After EN / ES / AR | Eligible before → after | EN–ES sets before → after |
|---|---|---|---|---|
| Non-Library page records (matrix) | 20 / 8 / 1 | 20 / 9 / 1 | 28 → 29 | 8 → 9 |
| Entire pages collection, including three Library roots | 21 / 9 / 2 | 21 / 10 / 2 | 31 → 32 | 9 → 10 |

The checkpoint request's expected 20/9/1 → 20/10/1 mixes the Spanish Library-root inclusion with English/Arabic Library-root exclusions. Its 9 → 10 pair count describes the entire pages collection. It is not the consistent non-Library population. No page is missing and no route or policy was changed to force these expectations.

Primary final classifications below: 10 substantively equivalent, 9 human decision required, 11 intentional cross-language fallback. These are bounded semantic/operational assessments, not visual acceptance. The ten English-only fallbacks have a secondary **insufficient evidence for fresh body parity** flag: no fresh body retrieval was necessary to establish that the manifest has no translated counterpart. The Arabic draft is also not treated as a verified public translation. Before correction, Spanish privacy was a missing local public-source page and Spanish shared forms/author labels had minor untranslated-interface drift.

### Publication and metadata matrix

Paths in the source column are under `www/`. Canonicals are absolute as shown. Hreflang membership lists actual eligible article/page languages; each bilingual set also emits x-default to English in indexing-enabled mode. No author archive is included in this graph. H1 text is generated output (line-break-only spacing normalized for this table).

| Route / locale | Source record | Current SEO title | Current description | Visible H1 | Key | Eligible | Canonical | Hreflang members |
|---|---|---|---|---|---|---|---|---|
| / / en | src/content/pages/en/index.md | Scottsdale ABA Therapy for Children \| Arizona Institute for Autism | Arizona Institute for Autism: center for behavioral health & education services in Scottsdale. We serve children diagnosed with autism and their families. | Behavioral Health & Special Education | index | Yes | https://www.azinstitute4autism.com/ | en, es |
| /aba-therapy / en | src/content/pages/en/aba-therapy.mdx | Integrated ABA Therapy for Autism \| Arizona Institute for Autism | Empower your child for life with one-on-one integrated ABA therapy. Book a free consultation and join our supportive autism community! | Behavioral | aba-therapy | Yes | https://www.azinstitute4autism.com/aba-therapy | en, es |
| /aba-therapy-intake-process / en | src/content/pages/en/aba-therapy-intake-process.mdx | Starting ABA Therapy Step-by-Step Guide \| Arizona Institute for Autism | Discover how to begin ABA therapy at Arizona Institute for Autism. Our simple, supportive intake process guides your child toward growth and success. | Learner Intake Process | aba-therapy-intake-process | Yes | https://www.azinstitute4autism.com/aba-therapy-intake-process | en, es |
| /about / en | src/content/pages/en/about.md | About Us \| Arizona Institute for Autism \| Scottsdale | Arizona Institute for Autism (AIA) is a comprehensive wellness center offering behavioral health, education, and consultation for individuals with Autism. | About AIA | about | Yes | https://www.azinstitute4autism.com/about | None |
| /ar / ar | src/content/pages/ar/index.md | معهد أريزونا للتوحد | صفحة عربية تمهيدية لمعهد أريزونا للتوحد. | Not rendered (draft) | home | No | https://www.azinstitute4autism.com/ar | None |
| /autism-evaluations / en | src/content/pages/en/autism-evaluations.mdx | Accurate Autism Assessment for Children \| Arizona Institute for Autism | Get comprehensive childhood autism evaluations in Scottsdale, AZ. Our expert team provides accurate assessments to support your child's unique development. | Psychological | autism-evaluations | Yes | https://www.azinstitute4autism.com/autism-evaluations | en, es |
| /careers / en | src/content/pages/en/careers.mdx | Join Our Team \| Autism Careers in AZ \| Arizona Institute for Autism | Join our caring team. Arizona Institute for Autism is hiring compassionate professionals dedicated to supporting individuals with autism. Apply online now! | Employment Opportunities | careers | Yes | https://www.azinstitute4autism.com/careers | None |
| /client-consultation / en | src/content/pages/en/client-consultation.md | Client Consultation Form \| Arizona Institute for Autism \| Scottsdale | Schedule your free consultation with a Client Advocate at Arizona Institute for Autism to find out what we can do for your child diagnosed with autism. | Schedule Your Free Consultation | client-consultation | Yes | https://www.azinstitute4autism.com/client-consultation | en, es |
| /client-forms / en | src/content/pages/en/client-forms.mdx | Essential Forms for Autism Support \| Arizona Institute for Autism | Conveniently access and download autism service forms from Arizona Institute for Autism. Get started right away with our simplified intake process. | Client Forms | client-forms | Yes | https://www.azinstitute4autism.com/client-forms | None |
| /contact / en | src/content/pages/en/contact.mdx | Contact AIA \| Arizona Institute for Autism \| Scottsdale | Reach out to learn more about our comprehensive wellness services for children with autism, including behavioral health, education, and consultation. | Contact AIA | contact | Yes | https://www.azinstitute4autism.com/contact | en, es |
| /donate-autism-giveback / en | src/content/pages/en/donate-autism-giveback.mdx | Help Autism Families Thrive \| Donate to Arizona Institute for Autism | Empower families of children with autism. Donate now to help expand therapy, education, research, & community support. Your contribution transforms lives. | Giveback & Donate | donate-autism-giveback | Yes | https://www.azinstitute4autism.com/donate-autism-giveback | None |
| /employee-portal / en | src/content/pages/en/employee-portal.md | AIA Employee Portal \| Arizona Institute for Autism | Information, forms, and resources to help guide employees during their tenure with Arizona Institute for Autism. | Employee Portal | employee-portal | Yes | https://www.azinstitute4autism.com/employee-portal | None |
| /es / es | src/content/pages/es/index.md | Terapia ABA cerca de mí \| Arizona Institute for Autism \| Scottsdale | Arizona Institute for Autism: centro de servicios de salud conductual y educación ubicado en Scottsdale. Atendemos a personas con autismo y a sus familias. | Salud Mental y Educación Especial | index | Yes | https://www.azinstitute4autism.com/es | en, es |
| /es/aba-therapy / es | src/content/pages/es/aba-therapy.mdx | Terapia ABA Integrada para el Autismo \| Arizona Institute for Autism | Empodere a su hijo para la vida con terapia ABA integrada individualizada. ¡Reserva una consulta gratuita y únete a nuestra comunidad de apoyo para el autismo! | Conductual | aba-therapy | Yes | https://www.azinstitute4autism.com/es/aba-therapy | en, es |
| /es/aba-therapy-intake-process / es | src/content/pages/es/aba-therapy-intake-process.mdx | Guía paso a paso para comenzar la terapia ABA \| Arizona Institute for Autism | Descubra cómo comenzar la terapia ABA en el Instituto de Autismo de Arizona. Nuestro proceso de admisión simple y de apoyo guía a su hijo hacia el crecimiento y el éxito. | Proceso de admisión de estudiantes | aba-therapy-intake-process | Yes | https://www.azinstitute4autism.com/es/aba-therapy-intake-process | en, es |
| /es/autism-evaluations / es | src/content/pages/es/autism-evaluations.mdx | Evaluación precisa del autismo para niños \| Arizona Institute for Autism | Obtenga evaluaciones integrales de autismo infantil en Scottsdale, AZ. Nuestro equipo de expertos proporciona evaluaciones precisas para apoyar el desarrollo único de su hijo. | Psicológicos | autism-evaluations | Yes | https://www.azinstitute4autism.com/es/autism-evaluations | en, es |
| /es/client-consultation / es | src/content/pages/es/client-consultation.md | Formulario de Consulta del Cliente \| Arizona Institute for Autism \| Scottsdale | Programa tu consulta gratuita con un Defensor del Cliente en el Instituto de Autismo de Arizona para descubrir qué podemos hacer por tu hijo diagnosticado con autismo. | Programa tu consulta gratuita | client-consultation | Yes | https://www.azinstitute4autism.com/es/client-consultation | en, es |
| /es/contact / es | src/content/pages/es/contact.mdx | Contactar a AIA \| Arizona Institute for Autism \| Scottsdale | Comuníquese con nosotros para obtener más información sobre nuestros servicios integrales de bienestar para niños con autismo, que incluyen salud conductual, educación y consulta. | Contactar a AIA | contact | Yes | https://www.azinstitute4autism.com/es/contact | en, es |
| /es/learner-social-club / es | src/content/pages/es/learner-social-club.mdx | Impulsa el funcionamiento emocional y social con Learner Social Club en AIA | Póngase en contacto con AIA para obtener un pase de prueba gratuito de 1 día y ver cómo el desarrollo social y emocional de su hijo puede beneficiarse de nuestro Learner Social Club de 8 a 17 años. | Sociológico | learner-social-club | Yes | https://www.azinstitute4autism.com/es/learner-social-club | en, es |
| /es/privacy-policy / es | src/content/pages/es/privacy-policy.mdx | Política de privacidad \| Arizona Institute for Autism | Descubra cómo Arizona Institute for Autism protege sus datos. Nuestra política de privacidad detalla la recopilación, el uso y la seguridad de su información. | Política de privacidad | privacy-policy | Yes | https://www.azinstitute4autism.com/es/privacy-policy | en, es |
| /es/services / es | src/content/pages/es/services.mdx | Servicios pediátricos de autismo conductuales, psicológicos y sociológicos | Descubra servicios integrales para el autismo para niños, desde terapia ABA integrativa hasta apoyo educativo y familiar, en el Instituto de Autismo de Arizona. | Servicios ABA y Educativos | services | Yes | https://www.azinstitute4autism.com/es/services | en, es |
| /faqs / en | src/content/pages/en/faqs.mdx | Helpful Autism Diagnosis & Therapy FAQs \| Arizona Institute for Autism | Discover how ABA therapy works at Arizona Institute for Autism. Explore assessments, program design, and prompt fading FAQs to empower your child today. | ABA Therapy Helpline | faqs | Yes | https://www.azinstitute4autism.com/faqs | None |
| /insurance / en | src/content/pages/en/insurance.mdx | Arizona Autism Therapy Insurance Guide \| AZ Institute for Autism | Take the first step to affordable autism care for your child. Verify insurance benefits and coverage quickly and easily with Arizona Institute for Autism. | Insurance Guide | insurance | Yes | https://www.azinstitute4autism.com/insurance | None |
| /learner-social-club / en | src/content/pages/en/learner-social-club.mdx | Boost Emotional and Social Functioning with Learner Social Club at AIA | Contact AIA for a free 1-day trial pass to see how your child's social and emotional development can benefit from our Learner Social Club for ages 8-17. | Sociological | learner-social-club | Yes | https://www.azinstitute4autism.com/learner-social-club | en, es |
| /privacy-policy / en | src/content/pages/en/privacy-policy.mdx | Privacy Policy \| Arizona Institute for Autism | Discover how the Arizona Institute for Autism protects your data. Our Privacy Policy details collection, usage, and security to keep your information safe. | Privacy Policy | privacy-policy | Yes | https://www.azinstitute4autism.com/privacy-policy | en, es |
| /referrals / en | src/content/pages/en/referrals.mdx | Submit Your Autism Referral Online \| Arizona Institute for Autism | Arizona Institute for Autism simplifies autism referrals. Submit online now to connect families with the compassionate autism care specialists of AIA. | Physician & Insurer Referrals | referrals | Yes | https://www.azinstitute4autism.com/referrals | None |
| /schedule-consultation / en | src/content/pages/en/schedule-consultation.mdx | Contact Arizona Institute for Autism for Your Free ASD Consultation | Reach out to discuss autism treatment for your child with AZ Institute for Autism. Early intervention makes a difference; schedule your consultation today! | Reach Out for Your Free Consultation | schedule-consultation | Yes | https://www.azinstitute4autism.com/schedule-consultation | None |
| /services / en | src/content/pages/en/services.mdx | Behavioral, Psychological, and Sociological Pediatric Autism Services | Discover comprehensive autism services for children, from integrative ABA therapy to educational and family support, at the Arizona Institute for Autism. | ABA & Educational Services | services | Yes | https://www.azinstitute4autism.com/services | en, es |
| /team / en | src/content/pages/en/team.md | Meet Our Dedicated Autism Support Team \| Arizona Institute for Autism | Meet the all-star team of compassionate, experienced professionals transforming personalized autism therapy and education at Arizona Institute for Autism. | Meet the Team | team | Yes | https://www.azinstitute4autism.com/team | None |
| /tour / en | src/content/pages/en/tour.md | Tour Arizona's Premier Autism Therapy Center \| Schedule Your AIA Visit | Schedule your tour today and discover why Arizona Institute for Autism is the trusted choice for compassionate autism therapy and supportive care. | Schedule a Guided Tour | tour | Yes | https://www.azinstitute4autism.com/tour | None |

### Fidelity, source and reviewer matrix

For observed routes, the public counterpart is `https://www.azinstitute4autism.com` plus the route; exact response URL and evidence time are in the linked JSON. “Retain” means no body rewrite was justified by this bounded phase, not professional approval. Existing English-only route records and the publication manifest establish fallback eligibility; they do not establish fresh public-body parity.

| Route | Public-source evidence | Final classification | Finding / action | Required reviewer |
|---|---|---|---|---|
| / | 2026-10-13T21:38:06.013953+00:00; JSON route / | Substantively equivalent | Retain approved 18-month–8-year ABA correction over superseded adolescent source wording; English-only HSA/FSA section and historical testimonials are source-specific, not missing invented translations. | Fluent Spanish where applicable; Phase 8 browser/accessibility; AIA clinical/financial claims |
| /aba-therapy | 2026-10-13T21:38:09.094370+00:00; JSON route /aba-therapy | Human decision required | Preserve general ABA 18 months–8 years and separate Academy 2–6 / 1:2 facts; no age-range generalization. | AIA clinical/organizational + fluent Spanish |
| /aba-therapy-intake-process | 2026-10-13T21:38:12.182814+00:00; JSON route /aba-therapy-intake-process | Substantively equivalent | Six source-supported steps retained, with existing local published CTAs; insurance, scheduling and actual form destinations remain owner decisions. | Fluent Spanish where applicable; Phase 8 browser/accessibility; intake/insurance owner |
| /about | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /ar | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | Draft remains unpublished; explicit English-home fallback. No Arabic page or hreflang added. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /autism-evaluations | 2026-10-13T21:38:14.762327+00:00; JSON route /autism-evaluations | Human decision required | Both languages describe evaluations. Actual diagnostic availability is unresolved; do not invent appointments or remove qualifications. | AIA service owner/clinical + fluent Spanish |
| /careers | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /client-consultation | 2026-10-13T21:38:26.116995+00:00; JSON route /client-consultation | Human decision required | Spanish form/instructions corrected; existing no-waitlist/consultation availability claims remain owner review. Empty action/disabled submit unchanged. | AIA intake owner + fluent Spanish + privacy/accessibility |
| /client-forms | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /contact | 2026-10-13T21:38:23.240692+00:00; JSON route /contact | Substantively equivalent | Contact values, address and hours retained; Spanish form and map labels corrected through explicit locale props, no provider change. | Fluent Spanish where applicable; Phase 8 browser/accessibility; contact/operations owner |
| /donate-autism-giveback | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /employee-portal | Employee portal brief 2026-10-08 + local manifest; no protected retrieval | Human decision required | Metadata-only noindex route, not a completed protected portal. No counterpart invented; two access levels and secure workflows remain P9-02. | AIA portal/operations + privacy/security |
| /es | 2026-10-13T21:38:07.365046+00:00; JSON route /es | Substantively equivalent | Retain approved 18-month–8-year ABA correction over superseded adolescent source wording; English-only HSA/FSA section and historical testimonials are source-specific, not missing invented translations. | Fluent Spanish where applicable; Phase 8 browser/accessibility; AIA clinical/financial claims |
| /es/aba-therapy | 2026-10-13T21:38:10.546079+00:00; JSON route /es/aba-therapy | Human decision required | Preserve general ABA 18 months–8 years and separate Academy 2–6 / 1:2 facts; no age-range generalization. | AIA clinical/organizational + fluent Spanish |
| /es/aba-therapy-intake-process | 2026-10-13T21:38:13.478915+00:00; JSON route /es/aba-therapy-intake-process | Substantively equivalent | Six source-supported steps retained, with existing local published CTAs; insurance, scheduling and actual form destinations remain owner decisions. | Fluent Spanish where applicable; Phase 8 browser/accessibility; intake/insurance owner |
| /es/autism-evaluations | 2026-10-13T21:38:16.017480+00:00; JSON route /es/autism-evaluations | Human decision required | Both languages describe evaluations. Actual diagnostic availability is unresolved; do not invent appointments or remove qualifications. | AIA service owner/clinical + fluent Spanish |
| /es/client-consultation | 2026-10-13T21:38:27.620117+00:00; JSON route /es/client-consultation | Human decision required | Spanish form/instructions corrected; existing no-waitlist/consultation availability claims remain owner review. Empty action/disabled submit unchanged. | AIA intake owner + fluent Spanish + privacy/accessibility |
| /es/contact | 2026-10-13T21:38:24.501210+00:00; JSON route /es/contact | Substantively equivalent | Contact values, address and hours retained; Spanish form and map labels corrected through explicit locale props, no provider change. | Fluent Spanish where applicable; Phase 8 browser/accessibility; contact/operations owner |
| /es/learner-social-club | 2026-10-13T21:38:21.763137+00:00; JSON route /es/learner-social-club | Substantively equivalent | Preserve distinct ages 8–17, program schedule and payment wording; do not apply ABA ages to this program. | Fluent Spanish where applicable; Phase 8 browser/accessibility; program/payment owner |
| /es/privacy-policy | 2026-10-13T21:38:04.507373+00:00; JSON route /es/privacy-policy | Human decision required | English retained; Spanish source recovered in full, with localized SEO text and repaired nested heading structure. February 19, 2025 retained. Claims require legal/operational approval. | AIA privacy owner + qualified legal/privacy + fluent Spanish |
| /es/services | 2026-10-13T21:38:19.006310+00:00; JSON route /es/services | Substantively equivalent | Service categories and educational distinctions retained; dated prevalence and operational claims require clinical review, not an unscoped rewrite. | Fluent Spanish where applicable; Phase 8 browser/accessibility; AIA clinical |
| /faqs | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /insurance | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /learner-social-club | 2026-10-13T21:38:20.445397+00:00; JSON route /learner-social-club | Substantively equivalent | Preserve distinct ages 8–17, program schedule and payment wording; do not apply ABA ages to this program. | Fluent Spanish where applicable; Phase 8 browser/accessibility; program/payment owner |
| /privacy-policy | 2026-10-13T21:38:03.188877+00:00; JSON route /privacy-policy | Human decision required | English retained; Spanish source recovered in full, with localized SEO text and repaired nested heading structure. February 19, 2025 retained. Claims require legal/operational approval. | AIA privacy owner + qualified legal/privacy + fluent Spanish |
| /referrals | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /schedule-consultation | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /services | 2026-10-13T21:38:17.575471+00:00; JSON route /services | Substantively equivalent | Service categories and educational distinctions retained; dated prevalence and operational claims require clinical review, not an unscoped rewrite. | Fluent Spanish where applicable; Phase 8 browser/accessibility; AIA clinical |
| /team | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |
| /tour | Local record/manifest + prior migration evidence; no new body retrieval | Intentional cross-language fallback | No eligible explicit localized counterpart. Retain English destination with existing visitor-language fallback notices; no inferred translation. Fresh body parity not independently re-established. | Content owner + appropriate operational/clinical reviewer; fluent review of fallback notices |

## Spanish privacy policy

Source: https://www.azinstitute4autism.com/es/privacy-policy — HTTP 200 observed 2026-10-13T21:38:04 UTC (exact timestamp/header evidence in JSON); source SEO title and description were English. New `src/content/pages/es/privacy-policy.mdx` uses Spanish title/description and displayH1, existing `privacy-policy` translation key, source route and self-canonical. English policy remains unchanged. No current migration-date revision stamp was added.

The published Spanish body contains the same substantive data categories, uses, safeguards, sharing, rights, children, third parties, tracking, changes and contact information as English. English has a separate “Information We Collect” H2; Spanish includes those categories in its introduction and has ten H2s rather than eleven. Preserve this meaningful source structure rather than inventing a heading. Source malformed nesting put the last two sections inside a tracking list; the local MDX restores semantic root headings without changing words. Legal HHS/COPPA/PHI references and the full closing paragraph remain. Existing ContactObfuscation renders the same email and telephone.

**Fidelity check:** generated `.source-page` text equals the captured Spanish policy exactly after whitespace normalization and decoding the two contact fallbacks; ten source and local H2s. Spanish SEO title/description are newly localized, not falsely attributed to published Spanish metadata. Source policy wording includes HIPAA/COPPA, PHI, encryption, storage, retention, marketing, analytics and vendor promises; fidelity does not establish these controls or legal accuracy. P9-07 approval is mandatory. **Provenance release gate:** the public response was cache-qualified; standard TLS certificate validation failed and the fallback disabled certificate verification. Text parity against that captured response does **not** prove authenticated origin fidelity. A trusted-source comparison is required before production, using certificate-validated retrieval or an owner-supplied authoritative export with provenance. No trusted replacement was available during checkpoint preparation and no insecure request was repeated. P9-07 remains pending, including mandatory fluent Spanish and privacy/legal approval of both policies. The captured evidence and policy implementations remain unchanged.

## Shared forms, map and author presentation

`form-messages.ts` contains reviewed-for-implementation EN/ES copy only; unsupported form locales fail explicitly. PageLayout passes collection language to ContactPage/FormShell, and ContactPage passes it to ContactForm. No runtime URL/browser-language guessing. The two actual Spanish form routes are `/es/contact` and `/es/client-consultation`; no published Arabic page renders these forms. No unused Arabic form translation was invented.

Localized heading defaults/eyebrow, instructions, parent/guardian name, email, telephone, service selection/options, question field, submit label, disabled-submission explanation and telephone fallback notice. Proper program name Learner Social Club is retained. Page-specific headings continue using page content. Map landmark, tile alternatives, zoom titles and marker name use server-provided localized data. Leaflet version/provider, map position, tiles, contact values and behavior are unchanged. Leaflet's own ancillary UI (including popup-close wording) still needs full browser/assistive-technology inspection; no claim of exhaustive third-party localization.

Form `method=post`, empty actions, disabled submit buttons, TODOs and ContactObfuscation remain. No backend/action/analytics/cookie/event was introduced. Disabled buttons alone do not prove complete implicit Enter/no-JavaScript/scripted isolation; P9-03 and the nonproduction plan retain this limitation.

Author archive source review covered EN/ES/AR roots. Existing names, credentials, roles, portraits, full biographies and explicit author graph are retained. Spanish/Arabic archive eyebrows and “All Post”/“Popular Posts” labels are localized; English wording unchanged. Arabic BCBA/LBA text now has LTR `<bdi lang="en">` isolation. Avatar alternatives retain the actual author display name. Visitor language links still use validated author roots without SEO hreflang or fabricated numbered equivalents.

Arabic biography **طبيبة سريرية** can imply a physician, whereas English says “clinician.” Public/local Arabic agree, but that is not evidence of physician credentials. Preserve evidence and flag P9-06; no unauthorized professional-claim rewrite. Spanish role/clinical terminology and all newly localized labels need fluent/organizational review. Existing English-only-page and Arabic-home fallback notices remain unchanged and under fluent review; Spanish privacy is now an exact valid destination automatically through the existing resolver.

## Spanish reinforcement tip — supersession of Phase 6C.5 minor finding

Only the tip under “Por qué el refuerzo positivo es importante en el ABA” changed in `src/content/blog/es/positive-reinforcement-techniques.md`. Frontmatter, dates, author, translation key and all other paragraphs are unchanged.

Previous English text:

> ⚙️ **Tip:** Reinforcement is more effective when it feels genuine. Use specific praise like "I love how you put your shoes away!" instead of a generic "Good job!"

New Spanish text:

> ⚙️ **Consejo:** El refuerzo es más eficaz cuando se percibe como sincero. Use elogios específicos como «¡Me encanta cómo guardaste tus zapatos!» en lugar de un «¡Buen trabajo!» genérico.

Meaning/examples/formatting retained; newly translated locally, pending fluent-Spanish and clinical/editorial acceptance. The historical Phase 6C.5 audit is unchanged; its implementation discrepancy is superseded by this note, not its human-review gate.

## Publication and SEO results

| Metric | Before | After |
|---|---:|---:|
| Library records / EN / ES / AR | 74 / 55 / 12 / 7 | 74 / 55 / 12 / 7 |
| Generated HTML / unique canonical targets | 121 / 121 | 122 / 122 |
| Indexing-enabled sitemap URLs | 107 | 108 |
| Hreflang links / participating routes | 174 / 53 | 180 / 55 |
| Validated page/article translation sets / members | 24 / 53 | 25 / 55 |
| Author archive routes | 9 | 9 |
| Redirect definitions | 9 | 9 |
| Search records EN / ES / AR | 55 / 12 / 7 | 55 / 12 / 7 |

One Spanish privacy route explains all increases: two policy pages gain reciprocal EN/ES/x-default, six links total. No article eligibility, syndicated canonical, translation rule or navigation architecture changed. Indexing build has 108 index,follow and 14 noindex,follow pages; all nine author archives remain sitemap/hreflang-excluded. English Library and author page 6 each contain five real cards with no numbered hreflang. Publication-date ordering unchanged. Final staging: 122 noindex,nofollow pages, empty sitemap, zero hreflang.

## Validation and evidence

Suites ran sequentially with `TMPDIR=/tmp` and `ASTRO_TELEMETRY_DISABLED=1` (environment-only). Final results:

| Command from www | Result |
|---|---|
| `npm run check` | 92 files; 0 errors/warnings/hints |
| `npm run test:markdown` | 20 passed |
| `npm run test:publication` | 33 passed |
| `npm run test:seo` | 35 passed |
| `npm run test:library` | 49 passed |
| `npm run test:routes` | 10 passed |
| `npm run build` | 122 routes; passed (also final staging build) |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | 122 routes; passed; counts above inspected |
| `npm run audit:links` | 0 broken internal links |
| `npm run audit:images` | 0 missing mapped page images |
| `npm run audit:blog` | 0 failures |
| `git diff --check` | Passed |

Four focused Library regression tests cover Spanish privacy sections/SEO/navigation, actual form locale/disabled state, localized author labels and bidi/archive SEO, and the Spanish tip's meaning/publication identity. Publication counts explicitly include the new privacy pair. Initial failures were stale expectations: 24 rather than 25 translation sets and English-only notices in two existing SEO form assertions; updated to correct locale-aware expectations. No safety assertion removed. Initial unused callback hints were fixed. Scratch commands invoked from the repository root lacked the www package/module context; rerun from www without application workarounds. npm reports an inherited http-proxy configuration deprecation warning, not a failed test.

Offline generation command: `npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-13-offline-06-21-20-316Z.json`. New schema-2 artifact: [route-reconciliation-2026-10-14-offline.json](route-reconciliation-2026-10-14-offline.json). Explicit read-only check: `npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-14-offline.json` passed. Source fingerprint: `59753ffefd162f9110e05acea73e20147a7fc8286af132ea7b8e1748de180901`. It reuses 70 historical production requests and covers 133 route dispositions, 122 generated local routes and nine redirects. Its 102 saved production-sitemap URLs are historical evidence, distinct from the current 108 indexing-enabled local URLs. No fresh production route crawl or overwrite.

Browser capability probe opened about:blank; the subsequent Playwright code to restrict requests and open localhost failed with “Transport closed.” Local preview was stopped. No successful site browser/visual/keyboard/no-JavaScript/touch/screen-reader test is claimed. Generated HTML and semantic text verification are the completed checks; actual full-page desktop/mobile and fluent review remain Phase 8/stakeholder acceptance.

## Planning handoff and release gates

[Nonproduction verification plan](phase-7-nonproduction-verification-plan-2026-10-14.md) compares localhost, isolated local nginx and restricted hosted preview; records third-party request triggers, build procedure, owner/authorization requirements and reviewer fields. Node >=22.12.0 is the package requirement; Nix supplies Node 24. README's obsolete Node 20.19/22 wording is corrected, with no dependency changes.

Before hosted preview, implement and prove separately authorized fail-closed API isolation: current likes/views defaults to production outside localhost, including empty configuration; credentialed stats and like writes must not reach production. Noindex does not disable integrations. Map network requests and user-initiated external links are separately inventoried.

[Phase 9 decision register](phase-9-decision-register-2026-10-14.md) defines P9-01 landing ownership, P9-02 employee portal, P9-03 forms/API, P9-04 counters, P9-05 analytics/ads, P9-06 clinical/organizational claims, P9-07 privacy policy, P9-08 author SEO, P9-09 hosting/deployment and P9-10 launch authorization. Every status is Pending decision, with owner roles, reviewers, options, dependencies, acceptance criteria and explicit implementation/live-activation authorization requirements. No individuals or approvals invented.

Open gates: clinical/organizational claims and credentials; fluent Spanish/Arabic (including Phase 6C articles/diagrams); legal/privacy policy controls; browser/keyboard/no-JS/RTL/real screen reader; landing-page ownership; author SEO; forms/privacy/consent/analytics/ads; Contabo/NixOS/nginx/TLS/redirect/404/rollback verification; final organizational release approval. The provisional hours-article /client-consultation CTA remains unchanged and not equivalent by approval to /lp/early-intervention. Phase 7 implementation does not complete Phase 8, resolve Phase 9 or authorize Phase 10 cutover.

## Focused manual checklist

- Compare `/es/privacy-policy` with the dated Spanish evidence and `/privacy-policy`: full ten-section text, February 2025 date, links/contact decoding, language switching, mobile layout; privacy/legal review of every actual operational promise.
- EN/ES Contact and consultation: field labels, options, notices, keyboard/focus and safe intercepted Enter/no-JS behavior; no real personal data. Check map labels, zoom/popup behavior and provider outage.
- EN/ES/AR author roots: headings, portrait alternative, actual credentials, Arabic bidi and biography meaning; root-only cross-language destinations.
- Spanish reinforcement article: complete translated tip and examples, unchanged surrounding guidance.
- Sample English-only page fallbacks, Spanish privacy footer link, Arabic-home fallback, Library page 6 and author page 6 at 1440px/390px. Carry forward three Arabic diagram and real screen-reader acceptance.

## Author and shared-interface coverage

| Locale / archive root | Existing record | Identity / relationship | Fidelity and action | Reviewer |
|---|---|---|---|---|
| EN `/library/author/rula-diab` | `src/content/authors/en/rula-diab.md` | Rula Diab; Clinical Director, M.Ed, BCBA, LBA; key rula-diab | Public/source biography retained; English interface unchanged | AIA credentials/clinical |
| ES `/es/library/author/rula-diab` | `src/content/authors/es/rula-diab.md` | Rula Diab; Directora Clínica, M.Ed, BCBA, LBA; key rula-diab | Public/source biography retained; localized archive headings | Fluent Spanish + AIA |
| AR `/ar/library/author/rula-diab` | `src/content/authors/ar/rula-diab.md` | رولا دياب; clinical director / education master's / BCBA / LBA; key rula-diab | Biography retained with physician-like-term review flag; headings localized and credentials isolated | Fluent Arabic + AIA credential/clinical owner |

All roots remain self-canonical and eligible visitor destinations but noindex,follow, sitemap-excluded and hreflang-excluded in indexing-enabled builds. Source titles/descriptions/H1s and full observed main bodies for these three roots are in the evidence JSON. Author source files are unchanged. Nine derived archive routes remain; no new author relationship was created.

Shared-header/footer/mobile/skip/language disclosure labels, explicit English fallbacks, Library search/pagination/card labels already use the publication locale. Reviewed existing resolver and generated regression tests; no architectural or content rewrite. Non-Library Arabic requests continue to receive only published eligible English fallbacks, never guessed Arabic pages. Spanish privacy footer/navigation now resolves directly to the recovered Spanish route. These existing operational translations still require fluent review.

## Historical implementation-stage changed-file inventory and Git state

The following status and diff are captured after all Phase 7 documentation. New files are intentionally unstaged; the five pre-existing exclusions remain untouched. No SESSION_HANDOFF, ContactObfuscation, publication-policy, navigation resolver, dependencies, hosting or integration source was changed.

Modified implementation: `ContactForm.astro`, `FormShell.astro`, `ContactPage.astro`, `PageLayout.astro` (explicit locale propagation and shared copy); `AuthorArchive.astro` (headings/credential bidi); Spanish reinforcement Markdown (one tip only). New implementation: `form-messages.ts` and Spanish privacy MDX. Tests: publication graph counts, SEO locale-aware notices, four Library regression cases. Documentation: README toolchain correction, accessibility/SEO current findings, migration summary, and the new reports below. No images or dependencies were added.

`git status --short --untracked-files=all`:

```text
 M www/README.md
 M www/reports/accessibility-audit.md
 M www/reports/migration-summary.md
 M www/reports/seo-audit.md
 M www/src/components/ContactForm.astro
 M www/src/components/FormShell.astro
 M www/src/components/pages/AuthorArchive.astro
 M www/src/components/pages/ContactPage.astro
 M www/src/content/blog/es/positive-reinforcement-techniques.md
 M www/src/layouts/PageLayout.astro
 M www/tools/library.test.mjs
 M www/tools/publication.test.mjs
 M www/tools/seo.test.mjs
?? merge-plan.md
?? www/reports/phase-7-multilingual-reconciliation-2026-10-14.md
?? www/reports/phase-7-nonproduction-verification-plan-2026-10-14.md
?? www/reports/phase-7-source-evidence-2026-10-13.json
?? www/reports/phase-9-decision-register-2026-10-14.md
?? www/reports/route-reconciliation-2026-10-11-offline.json
?? www/reports/route-reconciliation-2026-10-12-offline.json
?? www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json
?? www/reports/route-reconciliation-2026-10-13-offline.json
?? www/reports/route-reconciliation-2026-10-14-offline.json
?? www/src/content/pages/es/privacy-policy.mdx
?? www/src/utils/form-messages.ts
```

`git diff --stat --no-renames` (tracked changes only; new files above are additional):

```text
 www/README.md                                      |  2 +-
 www/reports/accessibility-audit.md                 | 30 ++++++++-
 www/reports/migration-summary.md                   | 69 +++++++++++++++++++++
 www/reports/seo-audit.md                           | 14 +++++
 www/src/components/ContactForm.astro               | 21 ++++---
 www/src/components/FormShell.astro                 | 21 ++++---
 www/src/components/pages/AuthorArchive.astro       | 14 ++---
 www/src/components/pages/ContactPage.astro         | 18 +++---
 .../blog/es/positive-reinforcement-techniques.md   |  2 +-
 www/src/layouts/PageLayout.astro                   |  4 +-
 www/tools/library.test.mjs                         | 72 ++++++++++++++++++++--
 www/tools/publication.test.mjs                     |  9 +--
 www/tools/seo.test.mjs                             |  4 +-
 13 files changed, 233 insertions(+), 47 deletions(-)
```

Final inventory: 13 modified tracked files, seven new Phase 7 files, five pre-existing excluded untracked paths; zero staged files. The seven new files are the policy MDX, form-copy helper, three Phase 7 reports (reconciliation, source evidence, verification plan), Phase 9 decision register and new offline reconciliation. All five excluded files remain in place and untracked.

## Checkpoint preparation — 2026-10-14

The user authorized technical checkpoint preparation and a living-handoff update, not production publication. The locale-population clarification and trusted-source privacy gate above supersede ambiguous inventory/provenance interpretations without modifying source evidence or either policy. See [exact checkpoint manifest](phase-7-checkpoint-manifest-2026-10-14.md) for the current inventory and validation results; the implementation-stage Git snapshot above remains historical. Git staging/signing/pushing remain the user's responsibility.
