# Phase 6C.2 Library translation-equivalence audit

**Date:** October 11, 2026  
**Starting checkpoint:** `a699d467f19fafbfdda5fce1ce6226baa6e5fc3c`  
**Scope:** every explicit English–Spanish and English–Arabic Library relationship in the Astro content collection

## Method and evidence limits

The inventory was derived from the content collection's validated `translationKey` values, rather than inferred from titles or URL shapes. Each translated article was compared with its English counterpart for subject, scope, heading sequence, explanations, examples, clinical qualifications, FAQs, tables, images, calls to action, contextual links, and conclusion. The Phase 6C 74-article parity audit supplied the same-language public-versus-local findings for all 74 routes. Phase 6C.2 made five bounded public requests for the materially changed source families; their cache and source details are recorded in `phase-6c2-source-evidence-2026-10-11.json`.

The public responses are HubSpot prerender/cache representations. Their saved `Last-Modified`, `x-hs-prerendered`, cache state, and hashes provide reproducible evidence, but do not prove a newly rendered origin response. Structural similarity was not treated as linguistic approval. No fluent-language reviewer or clinician participated in this implementation pass.

## Complete relationship matrix

| English route | Locale | Translation route | Translation key | Public locale status before 6C.2 | Drift before 6C.2 | Missing or divergent content | Action | Source basis | Completed | Review status | SEO equivalence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/library/aba-school-readiness-arizona` | es | `/es/library/aba-school-readiness-arizona` | `aba-school-readiness-arizona` | Current public rewrite; local was old | **Substantial structural drift** | Current 18-heading guide, nine FAQs, table, two Spanish infographics, metadata, links, access and program qualifications | Full replacement | Current public Spanish plus revised English comparison | Yes | Fluent Spanish; clinical/editorial; AIA program claims | Structurally validated; human acceptance pending |
| `/library/autism-evaluation-diagnosis-arizona-parent-guide` | es | `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | `autism-evaluation-diagnosis-arizona-parent-guide` | Public/local aligned | Substantively equivalent | No material cross-language omission detected; localized phrasing retained | Retain | Public/local parity audit and section/FAQ comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/autism-evaluation-what-to-expect` | es | `/es/library/autism-evaluation-what-to-expect` | `autism-evaluation-what-to-expect` | Public/local aligned | Substantively equivalent | Same major sequence and eight-FAQ scope | Retain | Public/local parity audit and section/FAQ comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/autism-family-self-care-tips` | es | `/es/library/autism-family-self-care-tips` | `autism-family-self-care-tips` | Public/local aligned | Substantively equivalent | No material scope or guidance difference detected | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/autism-self-advocacy-skills-aba` | es | `/es/library/autism-self-advocacy-skills-aba` | `autism-self-advocacy-skills-aba` | Public/local aligned | **Minor translation drift** | Revised English now includes one Halloween contextual sentence/link; subject, guidance, and major structure remain aligned | Retain for later link/editorial batch | Revised English versus current Spanish | No material replacement required | Fluent Spanish review of optional contextual addition | Still substantively valid |
| `/library/emotional-regulation-aba` | es | `/es/library/emotional-regulation-aba` | `emotional-regulation-aba` | Public/local aligned | Substantively equivalent | Same major 14-heading and six-FAQ structure | Retain | Public/local parity audit and section/FAQ comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/enhancing-generalization-skills` | es | `/es/library/enhancing-generalization-skills` | `enhancing-generalization-skills` | Public/local aligned | Substantively equivalent | No material scope difference detected | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/executive-functioning-skills-autism` | es | `/es/library/executive-functioning-skills-autism` | `executive-functioning-skills-autism` | Public/local aligned | Substantively equivalent | Same major nine-heading structure and guidance | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/first-then-cards-autism-transitions` | es | `/es/library/first-then-cards-autism-transitions` | `first-then-cards-autism-transitions` | Public/local aligned | Substantively equivalent | Same six-section instructional scope | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/parents-guide-to-autism-and-aba` | es | `/es/library/parents-guide-to-autism-and-aba` | `parents-guide-to-autism-and-aba` | Public/local aligned | Substantively equivalent | Same ten-section and six-FAQ parent-guide scope | Retain | Public/local parity audit and section/FAQ comparison | Yes | Routine fluent Spanish and clinical review remains | Validated |
| `/library/positive-reinforcement-techniques` | es | `/es/library/positive-reinforcement-techniques` | `positive-reinforcement-techniques` | Public/local aligned | Substantively equivalent | Same major 15-heading reinforcement scope | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Spanish and clinical review remains | Validated |
| `/library/social-pragmatic-communication-autism` | es | `/es/library/social-pragmatic-communication-autism` | `social-pragmatic-communication-autism` | Public/local aligned | Substantively equivalent | Same 14-section and six-FAQ scope | Retain | Public/local parity audit and section/FAQ comparison | Yes | Routine fluent Spanish review remains | Validated |
| `/library/aba-school-readiness-guide` | ar | `/ar/library/aba-school-readiness-guide` | `aba-school-readiness-guide` | Public Arabic is the superseded short school article | **Different article; substantial structural and substantive semantic drift** | New antecedent/consequence subject, 19 substantive headings, ABC explanation, three tables, three images, six FAQs, qualifications, references and conclusion | Full replacement | Revised English article; old public Arabic retained as conflicting historical evidence | Yes | **Fluent Arabic plus clinical/editorial approval required before cutover** | Technically restored; human acceptance pending |
| `/library/autism-self-advocacy-skills-aba` | ar | `/ar/library/autism-self-advocacy-skills-aba` | `autism-self-advocacy-skills-aba` | Public/local aligned | **Minor translation drift** | Revised English now includes one Halloween contextual sentence/link; major subject and guidance remain aligned | Retain for later link/editorial batch | Revised English versus current Arabic | No material replacement required | Fluent Arabic review of optional contextual addition | Still substantively valid |
| `/library/behavior-management-functions-guide` | ar | `/ar/library/behavior-management-functions-guide` | `behavior-management-functions-guide` | Public/local aligned | Substantively equivalent | Same function-of-behavior subject and scope | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Arabic and clinical review remains | Validated |
| `/library/executive-functioning-skills-autism` | ar | `/ar/library/executive-functioning-skills-autism` | `executive-functioning-skills-autism` | Public/local aligned | Substantively equivalent | Same major nine-heading structure | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Arabic review remains | Validated |
| `/library/first-then-cards-autism-transitions` | ar | `/ar/library/first-then-cards-autism-transitions` | `first-then-cards-autism-transitions` | Public/local aligned | Substantively equivalent | Same six-section instructional scope | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Arabic review remains | Validated |
| `/library/positive-reinforcement-techniques` | ar | `/ar/library/positive-reinforcement-techniques` | `positive-reinforcement-techniques` | Public/local aligned | Substantively equivalent | Same major 15-heading reinforcement scope | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Arabic and clinical review remains | Validated |
| `/library/proactive-reactive-aba-strategies-guide` | ar | `/ar/library/proactive-reactive-aba-strategies-guide` | `proactive-reactive-aba-strategies-guide` | Public/local aligned | Substantively equivalent | Same proactive/reactive strategy subject and principal sections | Retain | Public/local parity audit and section comparison | Yes | Routine fluent Arabic and clinical review remains | Validated |

The inventory contains **19 relationships**: 12 English–Spanish and seven English–Arabic. Before implementation, 15 were substantively equivalent, two had minor contextual-link drift, one had substantial structural drift, and one had become a different article with substantial semantic drift. This phase replaced both materially outdated counterparts. The two minor self-advocacy differences remain suitable for the later bounded link/editorial batch because they do not change the articles' principal subject or guidance.

The fall-break article has no explicit Spanish or Arabic counterpart. No translation was created.

## Reconciled Spanish school-readiness article

The current public Spanish article is an idiomatic, source-published counterpart to the revised English guide. Phase 6C.2 transcribed its complete current body, metadata, 18 headings, table, nine FAQs, two Spanish-language infographics, and localized links. English-only destinations are retained only where no validated Spanish article exists and are labeled “en inglés”; no locale-prefixed route was guessed. Its independently observed Spanish publication date remains `2025-09-02`, with the source-supported `updatedDate` of `2026-09-25`.

The content describes Arizona school readiness, ABA's clinical role, educational access, and AIA Preparatory Academy's 2–6 program and 1:2 ratio. Those statements require fluent Spanish plus clinical/editorial and organizational review before cutover, even though the text came from the public Spanish source.

## Reconciled Arabic antecedent/consequence article

The public Arabic route still presents the old short back-to-school article, so it could not serve as the content source for the repurposed English publication. Phase 6C.2 replaced the local Arabic body with a complete Modern Standard Arabic translation of the revised English article while preserving the Arabic URL, author, publication date, and explicit translation key. No migration or English modification date was substituted for an Arabic publication date.

The replacement includes the ABC model, all substantive sections, three semantic tables, six FAQs, all three source images, translated alternatives and explanations, references, conclusion, and same-locale links where validated. Links to English-only material use Arabic anchor text that signals the language change. `<bdi dir="ltr">` isolates principal Latin abbreviations such as ABC, ABA, BCBA, FBA, DRA, DRI, and DRO. Article tables use the shared responsive overflow safeguard at narrow widths.

The three reused source graphics contain English text. Arabic alternatives, tables, and surrounding prose convey their essential meaning, but localized graphics remain an accessibility and visual-translation acceptance item. The translation is migration-produced and has not received fluent Arabic or professional clinical/editorial approval. It is therefore a **pre-cutover translation acceptance blocker**, even though its required structure and publication relationship validate technically.

## Clinical, editorial, and organizational review gates

Reviewers should specifically assess:

- the distinction between general AIA ABA eligibility (18 months through eight years) and AIA Preparatory Academy's described 2–6 program;
- the Academy's stated 1:2 staffing ratio and the statement that it is clinical ABA rather than a school substitute;
- Arizona school-access and educational-responsibility language;
- functional assessment, reinforcement, differential reinforcement, extinction/ignoring, safety, self-injury, aggression, and BCBA-involvement guidance;
- claims about generalization, participation, and expected support outcomes;
- Arabic clinical terminology and naturalness, including the translation of antecedent, consequence, setting event, function, and replacement behavior;
- Spanish school-readiness terminology and all public organizational claims.

Existing translation keys, canonicals, eligibility, sitemap policy, and hreflang relationships were preserved. Technical validation is not a substitute for the reviews above.
