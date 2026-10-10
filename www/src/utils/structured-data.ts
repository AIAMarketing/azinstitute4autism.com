import type { CollectionEntry } from 'astro:content';
import { load } from 'cheerio';
import type { Publication } from './publication-policy';
import { socialImageUrl } from './seo.ts';
import { createAuthorResolver } from './authors.ts';

/** JSON embedded in HTML must not be able to close its script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function blogPostingSchema(
  entry: CollectionEntry<'blog'>,
  publication: Publication,
  authors: CollectionEntry<'authors'>[],
  site: string
) {
  // Reuse record eligibility, independent of staging's global robots override.
  // Syndicated records must not acquire an invented original author/publisher.
  if (!publication.sitemapEligible) return undefined;
  const data = entry.data;
  const author = createAuthorResolver(authors)(data.lang, data.author);
  const image = socialImageUrl(data.featuredImage, site);
  // Current content records establish calendar days, not publication times.
  const datePublished = data.date.toISOString().slice(0, 10);
  const dateModified = data.updatedDate?.toISOString().slice(0, 10);
  if (dateModified && dateModified < datePublished) {
    throw new Error(`Article modification precedes publication: ${entry.id}`);
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${publication.canonical}#article`,
    url: publication.canonical,
    mainEntityOfPage: publication.canonical,
    headline: data.title,
    ...(data.description?.trim() ? { description: data.description } : {}),
    inLanguage: data.lang,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    ...(image ? { image } : {}),
    author: { '@type': 'Person', name: author.name }
  };
}

export interface FAQItem {
  question: string;
  answer: string;
  answerHtml?: string;
}

function htmlText(html: string): string {
  const $ = load(html, {}, false);
  $('script, style, template, [hidden], [aria-hidden="true"]').remove();
  $('br').replaceWith(' ');
  $('p, div, li, h1, h2, h3, h4, h5, h6, ul, ol, blockquote').append(' ');
  return $.root().text().replace(/\s+/g, ' ').trim();
}

/** Match FAQAccordion's runtime grouping of direct H3s and following siblings. */
export function faqItemsFromSourceHtml(html: string): FAQItem[] {
  const $ = load(html, {}, false);
  const items: FAQItem[] = [];
  let question: string | undefined;
  let answerHtml = '';
  const finish = () => {
    if (question !== undefined) items.push({ question, answer: htmlText(answerHtml), answerHtml });
  };
  for (const node of $.root().contents().toArray()) {
    if (node.type === 'tag' && node.name === 'h3') {
      finish();
      question = $(node).text().trim();
      answerHtml = '';
    } else if (question !== undefined) {
      answerHtml += $.html(node);
    }
  }
  finish();
  return items;
}

export function faqPageSchema(items: FAQItem[], publication: Publication) {
  if (!publication.sitemapEligible || !items.length) return undefined;
  const questions = new Set<string>();
  const mainEntity = items.map((item) => {
    const name = item.question.replace(/\s+/g, ' ').trim();
    // The visible answer is authoritative; the legacy plain-text copy can drift.
    const text = htmlText(item.answerHtml || `<p>${item.answer}</p>`);
    if (!name || !text) throw new Error(`Empty FAQ question/answer: ${publication.route}`);
    const key = name.toLowerCase();
    if (questions.has(key)) throw new Error(`Duplicate FAQ question: ${publication.route}: ${name}`);
    questions.add(key);
    return { '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } };
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${publication.canonical}#faq`,
    mainEntity
  };
}
