# Phase 6C.4 — Internal-link and related-post reconciliation — 2026-10-13

Implementation review only. Branch `faithful-astro-migration`, starting and final HEAD `a699d467f19fafbfdda5fce1ce6226baa6e5fc3c`. All cumulative Phase 6C work remains unstaged and uncommitted. Phase 6C.5 has not begun.

## Scope, evidence and freshness

The actual collection contains 74 eligible articles: 55 English, 12 Spanish and seven Arabic. Body anchors, destinations, footer relationship types, recommendation order, widget labels, image links and fragments were compared separately against generated HTML. Eligibility comes from the existing publication manifest, including the two accessible syndicated exceptions. No publication policy or independent article inventory was introduced.

The comparison reuses 66 article responses from the October 11 supplemental audit and two later October 11 Phase 6C.2 responses. Six targeted article GETs on October 13 refreshed the Spanish school-readiness, English antecedent/consequence, Spanish/Arabic self-advocacy, play/leisure and behavior-modification evidence. All six returned 200 with HubSpot HIT/prerender dates from October 3. They verify a served public representation, not independently fresh origin content. Public robots files were checked before the bounded requests; no site crawl, forms, searches, analytics or authenticated APIs were used.

New requests also checked the source ABC worksheet and the five disputed external resource destinations. The worksheet is byte-identical to the existing local asset. An initial transport attempt could not validate TLS because the environment lacks a usable CA bundle; read-only public GETs were retried with verification disabled. No credentials or private material were transmitted. Exact request times, statuses, redirects, selected cache headers and body SHA-256 values are in [the evidence JSON](phase-6c4-link-evidence-2026-10-13.json). The immutable October 11 diagnostic audit and all earlier source reports remain unchanged.

## Discrepancy accounting

| Category | At start | Result |
|---|---:|---|
| Original footer findings | 28 | Three English rewrites already had correct membership/titles; their captured order still differed |
| Remaining original footer membership/title/navigation findings | 25 | Corrected |
| Additional order-only comparisons | 8 | Captured source order restored; includes the three rewritten English articles |
| Arabic footer entries referencing superseded guide title | 4 | Current approved Arabic H1 used; relationships preserved |
| Total footer entries changed | 37 | 24 English, nine Spanish, four Arabic |
| Article files with narrow body-link changes | 25 | 17 English, five Spanish, three Arabic |
| Homepage exact-target corrections | 13 | `/index` → `/` (11 English, two Spanish) |
| External suffix corrections | 10 occurrences in six articles | Five known exact URLs restored, including two FAQ anchors |
| Missing CDC contextual links | 2 | English and Spanish evaluation articles |
| Source First/Then self-links | 3 | English/Spanish/Arabic “Stay tuned” equivalents restored |
| New localized Halloween passages | 2 | Spanish/Arabic, explicitly English destination; fluent review pending |
| Image-link fixes | ABC worksheet + play/leisure | Existing assets reused; no dependency or asset additions |
| Generated internal fragments | 4 | All four picky-eating section targets exist exactly once |

After insignificant typographic apostrophe normalization, all remaining source/local body-link differences have an explicit disposition below. This is link reconciliation against the selected evidence, not a new full-body editorial acceptance or a claim that cached origin content is current.

## Complete 74-article matrix

“Retained” means the current working-tree links were inspected and did not require a 6C.4 edit. Exact source and before/after anchor text and targets are preserved in the JSON; source-related ordering is a captured editorial presentation, not a new chronology-based algorithm.

| Route | Body action | Footer action | Evidence basis / qualification |
|---|---|---|---|
| `/ar/library/aba-school-readiness-guide` | Retained | Retained | saved 74-article October 11 audit GET; documented exception |
| `/ar/library/autism-self-advocacy-skills-aba` | Narrow corrections | Current Arabic title | bounded October 13 GET; documented exception |
| `/ar/library/behavior-management-functions-guide` | Retained | Current Arabic title | saved 74-article October 11 audit GET; documented exception |
| `/ar/library/executive-functioning-skills-autism` | Retained | Current Arabic title | saved 74-article October 11 audit GET; documented exception |
| `/ar/library/first-then-cards-autism-transitions` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/ar/library/positive-reinforcement-techniques` | Retained | Current Arabic title | saved 74-article October 11 audit GET; documented exception |
| `/ar/library/proactive-reactive-aba-strategies-guide` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/aac-visual-supports-autism` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/aba-school-readiness-arizona` | Retained | Source reconciliation | saved Phase 6C.2 October 11 GET |
| `/library/aba-school-readiness-guide` | Retained | Source reconciliation | bounded October 13 GET |
| `/library/aba-therapy-benefits` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/aba-therapy-dtt-net-guide` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/aba-therapy-prompting-parenting-benefits` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/aba-therapy-summer-routine-tips` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/aba-toilet-training-child-autism` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/aia-world-autism-community-day-celebration` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/asd-sensory-friendly-recipes-pancakes` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/autism-after-school-meltdowns` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/autism-back-to-school-transition` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/autism-daily-living-skills-challenges` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/autism-evaluation-diagnosis-arizona-parent-guide` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/autism-evaluation-what-to-expect` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | Retained | Source reconciliation | saved Phase 6C.2 October 11 GET |
| `/library/autism-family-self-care-tips` | Narrow corrections | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/autism-friendships-social-play-support` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/autism-self-advocacy-skills-aba` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/autism-social-skills-by-age` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/autism-therapy-rapport-strategies` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/behavior-management-functions-guide` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/behavior-modification-techniques-reinforcement-theory` | Narrow corrections | Retained | bounded October 13 GET; documented exception |
| `/library/communication-social-skills-autistic-children-guide` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/community-highlight-meet-rula-diab` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/critical-thinking-skills` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/does-aba-therapy-replace-school` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/early-signs-autism-by-age` | Narrow corrections | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/emotional-regulation-aba` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/enhancing-generalization-skills` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/executive-functioning-skills-autism` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/first-then-cards-autism-transitions` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/halloween-and-autism` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/heart-full-of-gratitude` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/how-many-hours-aba-child-need` | Retained | Retained | saved 74-article October 11 audit GET; documented exception |
| `/library/individualized-aba-therapy` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/integrated-aba-model-announcement` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/managing-aggressive-behavior-outbursts` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/meet-rula-diab-bcba` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/new-aia-scottsdale-office` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/new-year-2024-autism-holiday-tips` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/new-year-goals-2023` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/november-2022-aia-update` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/parents-guide-to-autism-and-aba` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/picky-eating-autism-parent-guide` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/play-leisure-skills` | Narrow corrections | Source reconciliation | bounded October 13 GET; documented exception |
| `/library/positive-reinforcement-techniques` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/proactive-reactive-aba-strategies-guide` | Narrow corrections | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/reduce-behavior-management` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/repetitive-behavior` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/library/sensory-processing` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/sleep-issues-autistic-children` | Retained | Retained | saved 74-article October 11 audit GET |
| `/library/social-pragmatic-communication-autism` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/library/understanding-autism-support` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/es/library/aba-school-readiness-arizona` | Retained | Source reconciliation | bounded October 13 GET; documented exception |
| `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/autism-evaluation-what-to-expect` | Narrow corrections | Retained | saved 74-article October 11 audit GET |
| `/es/library/autism-family-self-care-tips` | Narrow corrections | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/autism-self-advocacy-skills-aba` | Narrow corrections | Retained | bounded October 13 GET; documented exception |
| `/es/library/emotional-regulation-aba` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/enhancing-generalization-skills` | Narrow corrections | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/executive-functioning-skills-autism` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/first-then-cards-autism-transitions` | Narrow corrections | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/parents-guide-to-autism-and-aba` | Retained | Retained | saved 74-article October 11 audit GET |
| `/es/library/positive-reinforcement-techniques` | Retained | Source reconciliation | saved 74-article October 11 audit GET |
| `/es/library/social-pragmatic-communication-autism` | Retained | Source reconciliation | saved 74-article October 11 audit GET |

## Every changed footer entry

Previous and next remain distinct from recommendations. No source-backed recommendations were generated from dates, tags or keywords. All nine newly migrated article footer records are unchanged from the Phase 6C.4 starting snapshot. Every final footer target resolves to an eligible article in the same locale; none is a duplicate related recommendation or accidental self-recommendation.

For compactness, the table uses destination slugs. Full paths and exact before/after displayed titles are in each evidence record’s `footerBefore` / `footerAfter`. The Arabic title correction deliberately follows the approved 6C.2 replacement rather than reviving the outdated public Arabic publication.

| `blog-footers.json` key | Changed fields | Final previous / next | Final ordered related destinations |
|---|---|---|---|
| `ar/autism-self-advocacy-skills-aba` | previous | aba-school-readiness-guide / executive-functioning-skills-autism | executive-functioning-skills-autism → proactive-reactive-aba-strategies-guide → first-then-cards-autism-transitions |
| `ar/behavior-management-functions-guide` | next, related | — / aba-school-readiness-guide | first-then-cards-autism-transitions → aba-school-readiness-guide → proactive-reactive-aba-strategies-guide |
| `ar/executive-functioning-skills-autism` | related | autism-self-advocacy-skills-aba / proactive-reactive-aba-strategies-guide | proactive-reactive-aba-strategies-guide → aba-school-readiness-guide → first-then-cards-autism-transitions |
| `ar/positive-reinforcement-techniques` | related | proactive-reactive-aba-strategies-guide / first-then-cards-autism-transitions | proactive-reactive-aba-strategies-guide → aba-school-readiness-guide → executive-functioning-skills-autism |
| `en/aac-visual-supports-autism` | related | parents-guide-to-autism-and-aba / autism-friendships-social-play-support | communication-social-skills-autistic-children-guide → parents-guide-to-autism-and-aba → aba-therapy-summer-routine-tips |
| `en/aba-school-readiness-arizona` | related | positive-reinforcement-techniques / autism-fall-break-routine-tips-halloween-thanksgiving | autism-evaluation-what-to-expect → does-aba-therapy-replace-school → emotional-regulation-aba |
| `en/aba-school-readiness-guide` | related | behavior-management-functions-guide / proactive-reactive-aba-strategies-guide | does-aba-therapy-replace-school → behavior-management-functions-guide → proactive-reactive-aba-strategies-guide |
| `en/aba-therapy-dtt-net-guide` | related | sensory-processing / aba-therapy-prompting-parenting-benefits | aba-toilet-training-child-autism → new-year-2024-autism-holiday-tips → autism-therapy-rapport-strategies |
| `en/aba-therapy-prompting-parenting-benefits` | related | aba-therapy-dtt-net-guide / autism-therapy-rapport-strategies | positive-reinforcement-techniques → new-year-2024-autism-holiday-tips → sensory-processing |
| `en/aba-therapy-summer-routine-tips` | related | first-then-cards-autism-transitions / positive-reinforcement-techniques | aba-school-readiness-arizona → aac-visual-supports-autism → autism-daily-living-skills-challenges |
| `en/aia-world-autism-community-day-celebration` | related | new-year-goals-2023 / behavior-modification-techniques-reinforcement-theory | asd-sensory-friendly-recipes-pancakes → new-year-goals-2023 → aba-therapy-dtt-net-guide |
| `en/autism-evaluation-diagnosis-arizona-parent-guide` | related | social-pragmatic-communication-autism / early-signs-autism-by-age | autism-evaluation-what-to-expect → sensory-processing → parents-guide-to-autism-and-aba |
| `en/autism-fall-break-routine-tips-halloween-thanksgiving` | related | aba-school-readiness-arizona / emotional-regulation-aba | aac-visual-supports-autism → halloween-and-autism → autism-social-skills-by-age |
| `en/autism-family-self-care-tips` | next, related | individualized-aba-therapy / autism-self-advocacy-skills-aba | proactive-reactive-aba-strategies-guide → social-pragmatic-communication-autism → aba-therapy-prompting-parenting-benefits |
| `en/autism-friendships-social-play-support` | next, related | aac-visual-supports-autism / autism-daily-living-skills-challenges | play-leisure-skills → aac-visual-supports-autism → autism-social-skills-by-age |
| `en/behavior-management-functions-guide` | next | autism-therapy-rapport-strategies / aba-school-readiness-guide | behavior-modification-techniques-reinforcement-theory → repetitive-behavior → reduce-behavior-management |
| `en/communication-social-skills-autistic-children-guide` | related | autism-evaluation-what-to-expect / parents-guide-to-autism-and-aba | aac-visual-supports-autism → parents-guide-to-autism-and-aba → aba-school-readiness-arizona |
| `en/critical-thinking-skills` | related | november-2022-aia-update / new-year-goals-2023 | managing-aggressive-behavior-outbursts → new-year-2024-autism-holiday-tips → social-pragmatic-communication-autism |
| `en/early-signs-autism-by-age` | related | autism-evaluation-diagnosis-arizona-parent-guide / autism-evaluation-what-to-expect | autism-evaluation-what-to-expect → autism-evaluation-diagnosis-arizona-parent-guide → parents-guide-to-autism-and-aba |
| `en/managing-aggressive-behavior-outbursts` | previous | play-leisure-skills / november-2022-aia-update | critical-thinking-skills → proactive-reactive-aba-strategies-guide → new-year-goals-2023 |
| `en/new-year-goals-2023` | related | critical-thinking-skills / aia-world-autism-community-day-celebration | behavior-management-functions-guide → autism-therapy-rapport-strategies → behavior-modification-techniques-reinforcement-theory |
| `en/november-2022-aia-update` | related | managing-aggressive-behavior-outbursts / critical-thinking-skills | reduce-behavior-management → aba-therapy-benefits → managing-aggressive-behavior-outbursts |
| `en/parents-guide-to-autism-and-aba` | next, related | communication-social-skills-autistic-children-guide / aac-visual-supports-autism | aba-school-readiness-arizona → autism-evaluation-what-to-expect → emotional-regulation-aba |
| `en/play-leisure-skills` | related | reduce-behavior-management / managing-aggressive-behavior-outbursts | autism-friendships-social-play-support → autism-social-skills-by-age → communication-social-skills-autistic-children-guide |
| `en/positive-reinforcement-techniques` | next | aba-therapy-summer-routine-tips / aba-school-readiness-arizona | aba-therapy-prompting-parenting-benefits → aba-therapy-dtt-net-guide → autism-therapy-rapport-strategies |
| `en/proactive-reactive-aba-strategies-guide` | previous, related | aba-school-readiness-guide / individualized-aba-therapy | aba-school-readiness-arizona → aba-therapy-prompting-parenting-benefits → executive-functioning-skills-autism |
| `en/reduce-behavior-management` | next | — / play-leisure-skills | asd-sensory-friendly-recipes-pancakes → new-year-goals-2023 → aba-toilet-training-child-autism |
| `en/social-pragmatic-communication-autism` | related | heart-full-of-gratitude / autism-evaluation-diagnosis-arizona-parent-guide | aac-visual-supports-autism → executive-functioning-skills-autism → autism-evaluation-what-to-expect |
| `es/aba-school-readiness-arizona` | related | — / emotional-regulation-aba | emotional-regulation-aba → autism-evaluation-what-to-expect → social-pragmatic-communication-autism |
| `es/autism-evaluation-diagnosis-arizona-parent-guide` | related | social-pragmatic-communication-autism / autism-family-self-care-tips | autism-evaluation-what-to-expect → parents-guide-to-autism-and-aba → aba-school-readiness-arizona |
| `es/autism-family-self-care-tips` | related | autism-evaluation-diagnosis-arizona-parent-guide / first-then-cards-autism-transitions | parents-guide-to-autism-and-aba → autism-evaluation-what-to-expect → autism-evaluation-diagnosis-arizona-parent-guide |
| `es/emotional-regulation-aba` | previous, related | aba-school-readiness-arizona / social-pragmatic-communication-autism | aba-school-readiness-arizona → autism-evaluation-what-to-expect → social-pragmatic-communication-autism |
| `es/enhancing-generalization-skills` | related | autism-evaluation-what-to-expect / — | autism-evaluation-what-to-expect → parents-guide-to-autism-and-aba → autism-family-self-care-tips |
| `es/executive-functioning-skills-autism` | related | autism-self-advocacy-skills-aba / positive-reinforcement-techniques | positive-reinforcement-techniques → emotional-regulation-aba → autism-family-self-care-tips |
| `es/first-then-cards-autism-transitions` | related | autism-family-self-care-tips / autism-self-advocacy-skills-aba | autism-family-self-care-tips → autism-evaluation-what-to-expect → parents-guide-to-autism-and-aba |
| `es/positive-reinforcement-techniques` | related | executive-functioning-skills-autism / parents-guide-to-autism-and-aba | autism-family-self-care-tips → executive-functioning-skills-autism → autism-evaluation-what-to-expect |
| `es/social-pragmatic-communication-autism` | related | emotional-regulation-aba / autism-evaluation-diagnosis-arizona-parent-guide | aba-school-readiness-arizona → autism-evaluation-what-to-expect → emotional-regulation-aba |

Verified component-specific title examples:

- English school-readiness recommendation labels use **ABA School Readiness for Autistic Children in Arizona**, the source widget’s visible title; they do not substitute its different SEO title.
- Spanish school-readiness labels use **Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA**.
- English antecedent/consequence labels use **Antecedent and Consequence Interventions in ABA: Strategies and Examples**.
- Four Arabic guide references use **التدخلات التمهيدية وتدخلات العواقب في تحليل السلوك التطبيقي: استراتيجيات وأمثلة**. Related thumbnails referencing that article use its accepted current featured asset/description; article frontmatter is unchanged.

## Every changed article and contextual correction

All 25 article frontmatter blocks were compared byte-for-byte with the Phase 6C.4 start and remain unchanged. No publication/modification date, featured-image alt, H1, translation key, canonical, author, or eligibility field changed. The five Phase 6C.2 rewritten files and two English Phase 6C.1 Halloween additions remain byte-identical to their starting snapshots.

| File under `src/content/blog/` | Exact scope |
|---|---|
| `ar/autism-self-advocacy-skills-aba.md` | one localized Halloween paragraph after the break/choice/no examples; English destination identified |
| `ar/first-then-cards-autism-transitions.md` | source “Stay tuned” self-link; no new shop destination |
| `ar/proactive-reactive-aba-strategies-guide.md` | exact Indiana PECS `.html` destination |
| `en/aba-therapy-benefits.mdx` | homepage `/index` → `/` |
| `en/aba-toilet-training-child-autism.mdx` | homepage `/index` → `/` |
| `en/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake.mdx` | homepage `/index` → `/` |
| `en/autism-evaluation-what-to-expect.mdx` | wrap existing CDC anchor wording in source screening link; remove trailing whitespace on touched line |
| `en/autism-family-self-care-tips.md` | homepage `/index` → `/` |
| `en/behavior-modification-techniques-reinforcement-theory.mdx` | homepage `/index` → `/`; exact Indiana ABC `.html` target; link preview to identical full-size worksheet |
| `en/community-highlight-meet-rula-diab.md` | homepage `/index` → `/` |
| `en/early-signs-autism-by-age.mdx` | five CDC `.html` targets, including two FAQ answerHtml links |
| `en/enhancing-generalization-skills.mdx` | homepage `/index` → `/` |
| `en/first-then-cards-autism-transitions.md` | source “Stay tuned” self-link; no new shop destination |
| `en/integrated-aba-model-announcement.mdx` | homepage `/index` → `/` |
| `en/new-aia-scottsdale-office.md` | restore source original-article `.html` URL; runtime reachability rate-limited |
| `en/new-year-2024-autism-holiday-tips.mdx` | homepage `/index` → `/` |
| `en/play-leisure-skills.mdx` | first preview opens correct expanded asset; retain second full-size link; remove two duplicate expansions and two orphan close symbols |
| `en/proactive-reactive-aba-strategies-guide.md` | exact Indiana PECS `.html` destination |
| `en/repetitive-behavior.mdx` | homepage `/index` → `/` |
| `en/understanding-autism-support.mdx` | homepage `/index` → `/`; exact Indiana PECS `.html` destination |
| `es/autism-evaluation-what-to-expect.mdx` | wrap existing CDC anchor wording in source screening link; remove trailing whitespace on touched line |
| `es/autism-family-self-care-tips.md` | homepage `/index` → `/` |
| `es/autism-self-advocacy-skills-aba.md` | one localized Halloween paragraph after the break/choice/no examples; English destination identified |
| `es/enhancing-generalization-skills.mdx` | homepage `/index` → `/` |
| `es/first-then-cards-autism-transitions.md` | source “Stay tuned” self-link; no new shop destination |

## Translation and locale decisions

Only the two self-advocacy counterparts receive new localized prose. The October 13 public Spanish and Arabic bodies still lack the Halloween passage. The new text translates the accepted current English sentence rather than claiming recovery from HubSpot. Both paragraphs occupy the same conceptual position after the examples of requesting a break, choosing, and saying no.

> Nuestra [guía para planificar Halloween (en inglés)](/library/halloween-and-autism) muestra cómo las familias pueden dar cabida a «no», «descanso» y «ya terminé» durante una salida comunitaria.

> يوضّح [دليلنا للتخطيط للهالوين (بالإنجليزية)](/library/halloween-and-autism) كيف يمكن للأسر إتاحة المجال لقول «لا» و«استراحة» و«انتهيت» أثناء نزهة في المجتمع.

Fluent Spanish/Arabic review remains required. No Spanish/Arabic Halloween route was invented, and no existing translation relationship changed. The existing seven Spanish school-readiness English-destination labels and the Arabic guide’s English-destination labels are retained. The two source-supported Spanish in-body corporate homepage links now point directly to `/`, preserving the public English-root destination; this does not change the locale-aware header/footer navigation or invent a translated article relationship.

## External targets, image behavior and fragments

- CDC `autism/hcp/diagnosis/screening` and `autism/signs-symptoms/index`: suffixless requests returned 404; the corresponding `.html` pages returned 200.
- Indiana University PECS and ABC-data article URLs: suffixless requests returned 404; the exact source `.html` pages returned 200. These are bounded exact-target repairs, not a general extension rewrite.
- The Scottsdale original resource returned 429 for both variants (the suffixless variant first redirected to a slash). The source-supported `.html` URL is restored, but current external reachability needs a later ordinary human check. No rate-limit bypass was attempted.
- The ABC worksheet source `/hubfs/abc-data-template-download.png` returned 200 and matched the existing `/assets/images/abc-data-template-download.png`: SHA-256 `d6eb8194cb2e27127fc18f454016c9d56ca6ef8cf271fd4d53dedc1054b6a78c`. The preview now links to this asset; no duplicate download was added.
- Play/leisure uses `/assets/images/play-appearance-infographic.png` and `/assets/images/how-to-support-playtime.png` as full-size native anchor targets. The small previews remain in place. Two formerly hidden HubSpot expansions had become duplicate visible images with stray “×” text in Astro; those fragments are removed. Full-size browsing plus browser Back is the intentional static alternative to a modal lightbox. No script/dependency was introduced. Keyboard/focus and mobile visual acceptance remain pending.
- All four current internal section links in the picky-eating article resolve to unique rendered IDs. No article has duplicate HTML IDs. External text-fragment links in sensory-processing are retained as source references; this phase does not claim remote browser fragment acceptance.

## Intentional differences and unresolved gate

- `/ar/library/aba-school-readiness-guide`: 6C.2 Arabic replacement follows revised English content; superseded public Arabic body links are not restored.
- `/ar/library/autism-self-advocacy-skills-aba`: New localized Halloween passage translates the accepted English passage; absent from public locale capture; English-only destination identified; fluent review required. Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained.
- `/ar/library/behavior-management-functions-guide`: Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained.
- `/ar/library/executive-functioning-skills-autism`: Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained.
- `/ar/library/positive-reinforcement-techniques`: Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained.
- `/library/behavior-modification-techniques-reinforcement-theory`: Source /hubfs/abc-data-template-download.png uses identical self-hosted /assets/images/abc-data-template-download.png (SHA-256 matched).
- `/library/how-many-hours-aba-child-need`: Public /lp/early-intervention remains provisionally /client-consultation; Phase 9 owner gate unresolved.
- `/library/play-leisure-skills`: Two static full-size self-hosted image links replace HubSpot lightboxes; duplicate hidden expansions and orphan close symbols removed.
- `/es/library/aba-school-readiness-arizona`: Retain accepted (en inglés) labels on seven English-target contextual links.
- `/es/library/autism-self-advocacy-skills-aba`: New localized Halloween passage translates the accepted English passage; absent from public locale capture; English-only destination identified; fluent review required.

**Landing-page ownership is unresolved.** The public body of `/library/how-many-hours-aba-child-need` links to `/lp/early-intervention`; local `/client-consultation` is unchanged and remains provisional. These destinations are not declared equivalent. No `/lp/` route, redirect, form backend, or separate landing-pages project was implemented. Explicit owner approval under Phase 9 is required before cutover.

## Validation and publication invariants

Commands ran sequentially from `www`, with `TMPDIR=/tmp` for Nix fixture compatibility.

| Command | Result |
|---|---|
| `npm run check` | 91 files; zero errors, warnings or hints |
| `npm run test:markdown` | 20 passed |
| `npm run test:publication` | 33 passed |
| `npm run test:seo` | 35 passed |
| `npm run test:library` | 44 passed, including four added link/footer tests |
| `npm run test:routes` | 10 passed |
| `npm run build` | Passed; final normal staging output restored |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed; counts below |
| `npm run audit:links` | Zero broken internal links |
| `npm run audit:images` | Zero missing mapped page images |
| `npm run audit:blog` | Zero failures |
| `git diff --check` | Passed after removing inherited trailing whitespace on two edited lines |

Four added Library tests inspect all rendered body links against the real eligible publication manifest, assets and unique fragments, every footer’s locale/destinations/rendered order, representative source relationships, current widget labels, duplicate/self-recommendation prevention, Halloween additions, FAQ external links, image links and the provisional CTA. They do not claim linguistic or clinical approval.

An initial scratch `test:library` and later route-check invocation ran from the repository root and failed before running a suite; both were reissued from `www`. The final source comparison caught two escaped FAQ URL suffixes after the first green run; those were corrected and Markdown, SEO, Library, both builds and all three output audits were rerun. There are no unresolved automated failures. No project source was altered to compensate for the environment.

| Metric | Final |
|---|---:|
| English / Spanish / Arabic Library records and search index records | 55 / 12 / 7 |
| Total Library records | 74 |
| HTML routes / unique canonical targets | 121 / 121 |
| Author archive routes | 9 |
| Indexing-enabled sitemap URLs | 107 |
| Hreflang links / routes carrying hreflang | 174 / 53 |
| Repository redirect definitions | 9 |
| Final staging `noindex,nofollow` pages | 121 |
| Final staging sitemap / hreflang | 0 / 0 |

Each HTML document has exactly one canonical; routes and canonical policy remain unchanged, including syndicated external canonicals. English Library and author page 6 each retain five real cards. In indexing-enabled output Library page 6 is self-canonical/indexable/sitemap-eligible; author page 6 remains self-canonical/noindex,follow/sitemap- and hreflang-excluded. No author hreflang was enabled.

Final offline evidence: `route-reconciliation-2026-10-13-offline-03-01-03-889Z.json`. It was created with:

```sh
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-12-offline-22-12-30-166Z.json
npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-13-offline-03-01-03-889Z.json
```

The schema-2 report reuses all 70 saved production requests and passes its read-only consistency check: 133 dispositions, 121 generated routes and nine redirect definitions. Its 102 `sitemap` observations describe the inherited production sitemap, not the new 107-URL indexing-enabled Astro sitemap. New bounded content/link requests were kept separate from the inherited route observations. The earlier `route-reconciliation-2026-10-13-offline.json` is retained as superseded intermediate evidence from before the final FAQ repairs; use the timestamped report for the final source fingerprint. Historical reconciliation files were not overwritten.

## Browser limitations and manual acceptance

Local Chromium could not start because the sandbox denied socket creation. Remote Playwright could open `about:blank`, but could not connect to loopback static output; the subsequent local request-interception attempt and snapshot failed with a closed transport. Consequently **no local browser, touch, keyboard, responsive, no-JavaScript browser, or screen-reader acceptance is claimed**. Static anchors and fragment semantics passed generated-HTML tests.

Review the following at desktop and approximately 390×844, including keyboard focus and with JavaScript disabled:

1. `/library/aba-school-readiness-arizona`, `/library/aba-school-readiness-guide`, `/library/autism-fall-break-routine-tips-halloween-thanksgiving`, and `/es/library/aba-school-readiness-arizona`: previous/next, exact recommendation labels and order; follow every related card.
2. `/ar/library/behavior-management-functions-guide` and `/ar/library/autism-self-advocacy-skills-aba`: current Arabic antecedent/consequence recommendation/byline destinations, RTL wrapping and keyboard focus.
3. `/es/library/autism-self-advocacy-skills-aba` and `/ar/library/autism-self-advocacy-skills-aba`: localized passage placement, meaning, explicit English destination and one Halloween link each; fluent-language review required.
4. `/library/behavior-modification-techniques-reinforcement-theory`: open the worksheet image; `/library/play-leisure-skills`: open both full-size diagrams and return with Back; confirm there are no duplicate visible expansions or orphan close symbols.
5. `/library/picky-eating-autism-parent-guide`: follow all four in-page section links; `/library/early-signs-autism-by-age`: follow the CDC links both in prose and expanded FAQs.
6. `/library/autism-friendships-social-play-support`, `/library/halloween-and-autism`, `/library/page/6` and `/library/author/rula-diab/page/6`: new-article relationships, final-page cards, previous link, no page 7, and shared locale navigation.
7. `/library/how-many-hours-aba-child-need`: confirm the provisional consultation link remains unchanged; do not treat it as owner approval of `/lp/early-intervention`.
8. Carry forward review of `/ar/library/aba-school-readiness-guide`: all three Phase 6C.3 SVGs, concealed English raster labels, Arabic label legibility, desktop/mobile/RTL readability. This phase did not reopen those assets.

## Scope isolation and remaining work

Phase 6C.4 changes 25 article bodies narrowly, `blog-footers.json`, four Library tests, the migration summary and this accessibility finding. No application component, shared layout, dependency, navigation/search architecture, redirect, publication policy, featured-image alt, date, translation key, author biography/identity, form, API, tracking, or deployment configuration changed. The five 6C.2 rewrites, nine new articles, their assets, the English 6C.1 passages, historical reports, and living handoff remain intact.

Remaining: **Phase 6C.5 — Final Library parity validation and acceptance**, clinical/editorial/organizational approval, fluent Spanish/Arabic review, Arabic diagram visual-language acceptance, real screen-reader testing, the Phase 9 landing-page ownership decision, deferred author archive SEO decisions, and Contabo/nginx slashless routing/HTTPS/redirect/404 validation. No hosting rules were activated.

## Phase-specific file inventory

Existing files changed relative to the Phase 6C.4 starting snapshot:

- `www/src/content/blog/ar/autism-self-advocacy-skills-aba.md`
- `www/src/content/blog/ar/first-then-cards-autism-transitions.md`
- `www/src/content/blog/ar/proactive-reactive-aba-strategies-guide.md`
- `www/src/content/blog/en/aba-therapy-benefits.mdx`
- `www/src/content/blog/en/aba-toilet-training-child-autism.mdx`
- `www/src/content/blog/en/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake.mdx`
- `www/src/content/blog/en/autism-evaluation-what-to-expect.mdx`
- `www/src/content/blog/en/autism-family-self-care-tips.md`
- `www/src/content/blog/en/behavior-modification-techniques-reinforcement-theory.mdx`
- `www/src/content/blog/en/community-highlight-meet-rula-diab.md`
- `www/src/content/blog/en/early-signs-autism-by-age.mdx`
- `www/src/content/blog/en/enhancing-generalization-skills.mdx`
- `www/src/content/blog/en/first-then-cards-autism-transitions.md`
- `www/src/content/blog/en/integrated-aba-model-announcement.mdx`
- `www/src/content/blog/en/new-aia-scottsdale-office.md`
- `www/src/content/blog/en/new-year-2024-autism-holiday-tips.mdx`
- `www/src/content/blog/en/play-leisure-skills.mdx`
- `www/src/content/blog/en/proactive-reactive-aba-strategies-guide.md`
- `www/src/content/blog/en/repetitive-behavior.mdx`
- `www/src/content/blog/en/understanding-autism-support.mdx`
- `www/src/content/blog/es/autism-evaluation-what-to-expect.mdx`
- `www/src/content/blog/es/autism-family-self-care-tips.md`
- `www/src/content/blog/es/autism-self-advocacy-skills-aba.md`
- `www/src/content/blog/es/enhancing-generalization-skills.mdx`
- `www/src/content/blog/es/first-then-cards-autism-transitions.md`
- `www/src/data/blog-footers.json`
- `www/tools/library.test.mjs`
- `www/reports/migration-summary.md`
- `www/reports/accessibility-audit.md`

New Phase 6C.4 files:

- `www/reports/phase-6c4-link-reconciliation-2026-10-13.md` (this report).
- `www/reports/phase-6c4-link-evidence-2026-10-13.json` (compact source/link evidence, no raw HTML or private data).
- `www/reports/route-reconciliation-2026-10-13-offline-03-01-03-889Z.json` (final matching schema-2 evidence).
- `www/reports/route-reconciliation-2026-10-13-offline.json` (superseded intermediate evidence; retained without overwrite).

No assets were added or changed in this phase. Existing images were reused. All protected paths remain untracked and untouched: `merge-plan.md`, `reports/route-reconciliation-2026-10-11-offline.json`, and `reports/route-reconciliation-2026-10-12-offline.json`. The root protected file was not read or checksummed.

## Final cumulative structural diff

The following includes all preserved Phase 6C–6C.3 work as well as this phase. It is not a Phase 6C.4-only diff. The phase-only inventory is above. No unexpected overlapping changes were found; the index is empty.

`git diff --stat`:

```text
 www/reports/accessibility-audit.md                 |  52 +-
 www/reports/blog-content-audit.md                  |   6 +-
 www/reports/migration-summary.md                   | 421 +++++++++++++
 www/reports/page-imagery-audit.md                  |   2 +-
 www/reports/seo-audit.md                           |  35 +-
 .../content/blog/ar/aba-school-readiness-guide.md  |  44 --
 .../blog/ar/autism-self-advocacy-skills-aba.md     |   4 +
 .../blog/ar/behavior-management-functions-guide.md |   2 +
 .../blog/ar/executive-functioning-skills-autism.md |   2 +
 .../blog/ar/first-then-cards-autism-transitions.md |   5 +-
 .../blog/ar/positive-reinforcement-techniques.md   |   2 +
 .../ar/proactive-reactive-aba-strategies-guide.md  |   4 +-
 .../content/blog/en/aac-visual-supports-autism.mdx |   4 +
 .../blog/en/aba-school-readiness-arizona.mdx       | 356 ++++++++---
 .../content/blog/en/aba-school-readiness-guide.md  |  44 --
 www/src/content/blog/en/aba-therapy-benefits.mdx   |   6 +-
 .../content/blog/en/aba-therapy-dtt-net-guide.md   |   2 +
 .../en/aba-therapy-prompting-parenting-benefits.md |   2 +
 .../blog/en/aba-therapy-summer-routine-tips.mdx    |   2 +
 .../blog/en/aba-toilet-training-child-autism.mdx   |   4 +-
 .../aia-world-autism-community-day-celebration.mdx |   2 +
 ...y-friendly-recipe-thanksgiving-pumpkin-cake.mdx |   4 +-
 .../en/asd-sensory-friendly-recipes-pancakes.mdx   |   2 +
 ...m-evaluation-diagnosis-arizona-parent-guide.mdx |   2 +
 .../blog/en/autism-evaluation-what-to-expect.mdx   |   4 +-
 ...l-break-routine-tips-halloween-thanksgiving.mdx | 209 ++-----
 .../blog/en/autism-family-self-care-tips.md        |   4 +-
 .../en/autism-friendships-social-play-support.mdx  |   2 +
 .../blog/en/autism-self-advocacy-skills-aba.md     |   4 +
 .../blog/en/autism-therapy-rapport-strategies.md   |   2 +
 .../blog/en/behavior-management-functions-guide.md |   2 +
 ...odification-techniques-reinforcement-theory.mdx |   8 +-
 ...ation-social-skills-autistic-children-guide.mdx |   3 +
 .../blog/en/community-highlight-meet-rula-diab.md  |   6 +-
 .../content/blog/en/critical-thinking-skills.mdx   |   2 +
 .../content/blog/en/early-signs-autism-by-age.mdx  |  12 +-
 .../content/blog/en/emotional-regulation-aba.mdx   |   2 +
 .../blog/en/enhancing-generalization-skills.mdx    |   4 +-
 .../blog/en/executive-functioning-skills-autism.md |   3 +
 .../blog/en/first-then-cards-autism-transitions.md |   4 +-
 www/src/content/blog/en/heart-full-of-gratitude.md |   2 +
 .../content/blog/en/individualized-aba-therapy.md  |   3 +
 .../blog/en/integrated-aba-model-announcement.mdx  |   4 +-
 .../en/managing-aggressive-behavior-outbursts.mdx  |   2 +
 www/src/content/blog/en/meet-rula-diab-bcba.md     |   2 +
 .../content/blog/en/new-aia-scottsdale-office.md   |   6 +-
 .../blog/en/new-year-2024-autism-holiday-tips.mdx  |   4 +-
 www/src/content/blog/en/new-year-goals-2023.mdx    |   2 +
 .../content/blog/en/november-2022-aia-update.md    |   4 +-
 .../blog/en/parents-guide-to-autism-and-aba.mdx    |   3 +
 www/src/content/blog/en/play-leisure-skills.mdx    |  12 +-
 .../blog/en/positive-reinforcement-techniques.md   |   2 +
 .../en/proactive-reactive-aba-strategies-guide.md  |   4 +-
 .../content/blog/en/reduce-behavior-management.mdx |   2 +
 www/src/content/blog/en/repetitive-behavior.mdx    |   4 +-
 www/src/content/blog/en/sensory-processing.md      |   2 +
 .../en/social-pragmatic-communication-autism.mdx   |   2 +
 .../blog/en/understanding-autism-support.mdx       |   6 +-
 .../blog/es/aba-school-readiness-arizona.mdx       | 606 ++++++++++++++++---
 ...m-evaluation-diagnosis-arizona-parent-guide.mdx |   2 +
 .../blog/es/autism-evaluation-what-to-expect.mdx   |   4 +-
 .../blog/es/autism-family-self-care-tips.md        |   4 +-
 .../blog/es/autism-self-advocacy-skills-aba.md     |   4 +
 .../content/blog/es/emotional-regulation-aba.mdx   |   2 +
 .../blog/es/enhancing-generalization-skills.mdx    |   4 +-
 .../blog/es/executive-functioning-skills-autism.md |   3 +
 .../blog/es/first-then-cards-autism-transitions.md |   4 +-
 .../blog/es/parents-guide-to-autism-and-aba.mdx    |   3 +
 .../blog/es/positive-reinforcement-techniques.md   |   2 +
 .../es/social-pragmatic-communication-autism.mdx   |   2 +
 www/src/data/blog-footers.json                     | 661 ++++++++++++++-------
 www/src/styles/blog.css                            |  17 +
 www/src/utils/library-catalog.ts                   |   5 +-
 www/tools/audit-blog-content.mjs                   |   2 +-
 www/tools/library.test.mjs                         | 326 +++++++++-
 www/tools/markdown.test.mjs                        |   8 +-
 www/tools/seo.test.mjs                             |  28 +-
 77 files changed, 2321 insertions(+), 712 deletions(-)
```

`git status --short`:

```text
 M www/reports/accessibility-audit.md
 M www/reports/blog-content-audit.md
 M www/reports/migration-summary.md
 M www/reports/page-imagery-audit.md
 M www/reports/seo-audit.md
 D www/src/content/blog/ar/aba-school-readiness-guide.md
 M www/src/content/blog/ar/autism-self-advocacy-skills-aba.md
 M www/src/content/blog/ar/behavior-management-functions-guide.md
 M www/src/content/blog/ar/executive-functioning-skills-autism.md
 M www/src/content/blog/ar/first-then-cards-autism-transitions.md
 M www/src/content/blog/ar/positive-reinforcement-techniques.md
 M www/src/content/blog/ar/proactive-reactive-aba-strategies-guide.md
 M www/src/content/blog/en/aac-visual-supports-autism.mdx
 M www/src/content/blog/en/aba-school-readiness-arizona.mdx
 D www/src/content/blog/en/aba-school-readiness-guide.md
 M www/src/content/blog/en/aba-therapy-benefits.mdx
 M www/src/content/blog/en/aba-therapy-dtt-net-guide.md
 M www/src/content/blog/en/aba-therapy-prompting-parenting-benefits.md
 M www/src/content/blog/en/aba-therapy-summer-routine-tips.mdx
 M www/src/content/blog/en/aba-toilet-training-child-autism.mdx
 M www/src/content/blog/en/aia-world-autism-community-day-celebration.mdx
 M www/src/content/blog/en/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake.mdx
 M www/src/content/blog/en/asd-sensory-friendly-recipes-pancakes.mdx
 M www/src/content/blog/en/autism-evaluation-diagnosis-arizona-parent-guide.mdx
 M www/src/content/blog/en/autism-evaluation-what-to-expect.mdx
 M www/src/content/blog/en/autism-fall-break-routine-tips-halloween-thanksgiving.mdx
 M www/src/content/blog/en/autism-family-self-care-tips.md
 M www/src/content/blog/en/autism-friendships-social-play-support.mdx
 M www/src/content/blog/en/autism-self-advocacy-skills-aba.md
 M www/src/content/blog/en/autism-therapy-rapport-strategies.md
 M www/src/content/blog/en/behavior-management-functions-guide.md
 M www/src/content/blog/en/behavior-modification-techniques-reinforcement-theory.mdx
 M www/src/content/blog/en/communication-social-skills-autistic-children-guide.mdx
 M www/src/content/blog/en/community-highlight-meet-rula-diab.md
 M www/src/content/blog/en/critical-thinking-skills.mdx
 M www/src/content/blog/en/early-signs-autism-by-age.mdx
 M www/src/content/blog/en/emotional-regulation-aba.mdx
 M www/src/content/blog/en/enhancing-generalization-skills.mdx
 M www/src/content/blog/en/executive-functioning-skills-autism.md
 M www/src/content/blog/en/first-then-cards-autism-transitions.md
 M www/src/content/blog/en/heart-full-of-gratitude.md
 M www/src/content/blog/en/individualized-aba-therapy.md
 M www/src/content/blog/en/integrated-aba-model-announcement.mdx
 M www/src/content/blog/en/managing-aggressive-behavior-outbursts.mdx
 M www/src/content/blog/en/meet-rula-diab-bcba.md
 M www/src/content/blog/en/new-aia-scottsdale-office.md
 M www/src/content/blog/en/new-year-2024-autism-holiday-tips.mdx
 M www/src/content/blog/en/new-year-goals-2023.mdx
 M www/src/content/blog/en/november-2022-aia-update.md
 M www/src/content/blog/en/parents-guide-to-autism-and-aba.mdx
 M www/src/content/blog/en/play-leisure-skills.mdx
 M www/src/content/blog/en/positive-reinforcement-techniques.md
 M www/src/content/blog/en/proactive-reactive-aba-strategies-guide.md
 M www/src/content/blog/en/reduce-behavior-management.mdx
 M www/src/content/blog/en/repetitive-behavior.mdx
 M www/src/content/blog/en/sensory-processing.md
 M www/src/content/blog/en/social-pragmatic-communication-autism.mdx
 M www/src/content/blog/en/understanding-autism-support.mdx
 M www/src/content/blog/es/aba-school-readiness-arizona.mdx
 M www/src/content/blog/es/autism-evaluation-diagnosis-arizona-parent-guide.mdx
 M www/src/content/blog/es/autism-evaluation-what-to-expect.mdx
 M www/src/content/blog/es/autism-family-self-care-tips.md
 M www/src/content/blog/es/autism-self-advocacy-skills-aba.md
 M www/src/content/blog/es/emotional-regulation-aba.mdx
 M www/src/content/blog/es/enhancing-generalization-skills.mdx
 M www/src/content/blog/es/executive-functioning-skills-autism.md
 M www/src/content/blog/es/first-then-cards-autism-transitions.md
 M www/src/content/blog/es/parents-guide-to-autism-and-aba.mdx
 M www/src/content/blog/es/positive-reinforcement-techniques.md
 M www/src/content/blog/es/social-pragmatic-communication-autism.mdx
 M www/src/data/blog-footers.json
 M www/src/styles/blog.css
 M www/src/utils/library-catalog.ts
 M www/tools/audit-blog-content.mjs
 M www/tools/library.test.mjs
 M www/tools/markdown.test.mjs
 M www/tools/seo.test.mjs
?? merge-plan.md
?? www/public/assets/images/aba-hours-recommendation-delivery.webp
?? www/public/assets/images/aba-therapy-replace-school.webp
?? www/public/assets/images/aba-therapy-vs-school.webp
?? www/public/assets/images/aba-to-group-transition.webp
?? www/public/assets/images/abc-worksheet.webp
?? www/public/assets/images/after-school-routine-chart.webp
?? www/public/assets/images/antecedent-behavior-consequence.webp
?? www/public/assets/images/antecedent-behavior-consequence_ar.svg
?? www/public/assets/images/antecedent-consequence.webp
?? www/public/assets/images/autism-after-school-meltdowns_HERO.webp
?? www/public/assets/images/autism-food-symptom-observations.webp
?? www/public/assets/images/autism-social-skills-by-age_hero-1.webp
?? www/public/assets/images/back-to-school.webp
?? www/public/assets/images/bedtime-sensory-comfort.webp
?? www/public/assets/images/collaborative-play.webp
?? www/public/assets/images/daily-living-challenges-autism.webp
?? www/public/assets/images/divided-meal-plate-food-introduction-400.jpg
?? www/public/assets/images/first-then-visual-support-after-school.webp
?? www/public/assets/images/food-chaining-example.webp
?? www/public/assets/images/food-preferences-characteristics-infographic.webp
?? www/public/assets/images/halloween-and-autism_hero2.webp
?? www/public/assets/images/halloween-and-autism_simple-visual-schedule.webp
?? www/public/assets/images/halloween-porch-candy-teal-pumpking-bookmarks.webp
?? www/public/assets/images/last-straw-vs-whole-story.webp
?? www/public/assets/images/learning-skill-generalization.webp
?? www/public/assets/images/masking-school-decompressing-home-dyptich.webp
?? www/public/assets/images/morning-routine-schedule.webp
?? www/public/assets/images/one-to-one-to-group-progression.webp
?? www/public/assets/images/one-to-one-to-group-progression_es.webp
?? www/public/assets/images/parent-pediatric-support-team-meeting.webp
?? www/public/assets/images/picky-eating-autism-parent-guide.webp
?? www/public/assets/images/prompt-fading-therapist-help-600.jpg
?? www/public/assets/images/recommended-hours-aba-therapy.webp
?? www/public/assets/images/reduce-environmental-distractions.webp
?? www/public/assets/images/reduce-environmental-distractions_ar.svg
?? www/public/assets/images/reinforcement-replacement-behavior.webp
?? www/public/assets/images/reinforcement-replacement-behavior_ar.svg
?? www/public/assets/images/school-readiness-planning.webp
?? www/public/assets/images/school-readiness-supports-infographic.webp
?? www/public/assets/images/school-readiness-supports-infographic_es.webp
?? www/public/assets/images/sleep-diary.webp
?? www/public/assets/images/sleep-issues-autism-bedtime-routines.webp
?? www/public/assets/images/social-demands-change-as-child-grows.webp
?? www/public/assets/images/support-tools-transition-help.webp
?? www/reports/phase-6c-article-parity-audit-2026-10-11.md
?? www/reports/phase-6c-source-evidence-2026-10-11.json
?? www/reports/phase-6c2-source-evidence-2026-10-11.json
?? www/reports/phase-6c2-translation-equivalence-2026-10-11.md
?? www/reports/phase-6c3-metadata-reconciliation-2026-10-12.md
?? www/reports/phase-6c3-source-evidence-2026-10-12.json
?? www/reports/phase-6c4-link-evidence-2026-10-13.json
?? www/reports/phase-6c4-link-reconciliation-2026-10-13.md
?? www/reports/route-reconciliation-2026-10-11-offline-04-58-33-208Z.json
?? www/reports/route-reconciliation-2026-10-11-offline-20-48-03-927Z.json
?? www/reports/route-reconciliation-2026-10-11-offline.json
?? www/reports/route-reconciliation-2026-10-12-offline-22-12-30-166Z.json
?? www/reports/route-reconciliation-2026-10-12-offline.json
?? www/reports/route-reconciliation-2026-10-13-offline-03-01-03-889Z.json
?? www/reports/route-reconciliation-2026-10-13-offline.json
?? www/src/content/blog/ar/aba-school-readiness-guide.mdx
?? www/src/content/blog/en/aba-school-readiness-guide.mdx
?? www/src/content/blog/en/autism-after-school-meltdowns.mdx
?? www/src/content/blog/en/autism-back-to-school-transition.mdx
?? www/src/content/blog/en/autism-daily-living-skills-challenges.mdx
?? www/src/content/blog/en/autism-social-skills-by-age.mdx
?? www/src/content/blog/en/does-aba-therapy-replace-school.mdx
?? www/src/content/blog/en/halloween-and-autism.mdx
?? www/src/content/blog/en/how-many-hours-aba-child-need.mdx
?? www/src/content/blog/en/picky-eating-autism-parent-guide.mdx
?? www/src/content/blog/en/sleep-issues-autistic-children.mdx
```
