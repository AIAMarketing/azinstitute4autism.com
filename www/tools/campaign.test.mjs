import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import matter from 'gray-matter';
import fg from 'fast-glob';
import { landingPages, paymentPaths } from '../src/data/campaign/landingPages.ts';
import { createPublicationManifest, robotsFor } from '../src/utils/publication-policy.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const pages = Object.values(landingPages);
const entries = pages.map(page => ({
  collection: 'pages', id: `en/${page.slug.slice(1)}`,
  data: matter(read(`src/content/pages/en/${page.slug.slice(1)}.md`)).data
}));
const manifest = createPublicationManifest(entries, 'https://www.azinstitute4autism.com');
const html = page => load(read(`dist${page.slug}/index.html`));

test('campaign content IDs cannot replace existing MDX publications', async () => {
  const ids = (await fg('src/content/pages/**/*.{md,mdx}', { cwd: root }))
    .map(file => file.replace(/\.mdx?$/, ''));
  assert.equal(new Set(ids).size, ids.length, 'Duplicate collection ID across Markdown and MDX');
  assert.ok(fs.existsSync(path.join(root, 'dist/aba-therapy/index.html')));
  const main = load(read('dist/aba-therapy/index.html'));
  assert.equal(main('link[rel="canonical"]').attr('href'), 'https://www.azinstitute4autism.com/aba-therapy');
  assert.equal(main('link[hreflang="es"]').length,
    main('meta[name="robots"]').attr('content') === 'index,follow' ? 1 : 0);
});

test('four campaign identities match CMS metadata and retain noindex publication', () => {
  assert.equal(pages.length, 4);
  assert.equal(new Set(pages.map(p => p.slug)).size, 4);
  for (const [i, page] of pages.entries()) {
    const entry = entries[i];
    assert.equal(entry.data.title, page.title);
    assert.equal(entry.data.description, page.description);
    assert.equal(entry.data.displayH1, page.h1);
    assert.equal(entry.data.campaign, page.intent);
    const pub = manifest.find(p => p.route === page.slug);
    assert.ok(pub.eligible);
    assert.equal(pub.sitemapEligible, false);
    assert.deepEqual(pub.translations, []);
    assert.equal(robotsFor(pub, false), 'noindex,nofollow');
    assert.equal(robotsFor(pub, true), 'noindex,follow');
  }
});

test('generated campaign metadata and FAQ content match the imported configuration', () => {
  for (const page of pages) {
    const $ = html(page);
    assert.equal($('h1').length, 1);
    assert.equal($('h1').text(), page.h1);
    assert.equal($('title').text(), page.title);
    assert.equal($('meta[name="description"]').attr('content'), page.description);
    assert.equal($('link[rel="canonical"]').attr('href'), 'https://www.azinstitute4autism.com' + page.slug);
    assert.equal($('html').attr('lang'), 'en');
    assert.equal($('html').attr('dir'), 'ltr');
    assert.equal($('link[hreflang]').length, 0);
    assert.deepEqual($('.faq summary').map((_, el) => $(el).text()).get(), page.faq.map(f => f.question));
    assert.deepEqual($('.faq details p').map((_, el) => $(el).text()).get(), page.faq.map(f => f.answer));
  }
});

test('photos, responsive variants and licensed fonts are self-hosted', () => {
  for (const page of pages) {
    const $ = html(page);
    $('img').each((_, el) => {
      const img = $(el);
      assert.ok(fs.existsSync(path.join(root, 'public', img.attr('src'))));
      for (const item of (img.attr('srcset') || '').split(',').filter(Boolean)) {
        assert.ok(fs.existsSync(path.join(root, 'public', item.trim().split(/\s/)[0])));
      }
      assert.ok(img.attr('width') && img.attr('height'));
    });
  }
  for (const name of ['rubik-400.woff2', 'rubik-700.woff2', 'playfair-display-700.woff2', 'Rubik-OFL.txt', 'Playfair-Display-OFL.txt']) {
    assert.ok(fs.existsSync(path.join(root, 'public/assets/campaign/fonts', name)));
  }
});

test('inactive lead presentation has no native submission surface or live integration runtime', () => {
  for (const page of pages) {
    const $ = html(page);
    assert.equal($('form').length, 0);
    assert.equal($('#lead-form').attr('data-forms-mode'), 'off');
    assert.equal($('#lead-form [name]:not([disabled])').length, 0);
    assert.equal($('#lead-form button').attr('type'), 'button');
    assert.ok($('#lead-form button').is('[disabled]'));
    assert.match($('#campaign-form-status').text(), /not enabled/);
    assert.ok($('#campaign-form-status a[href^="tel:"]').length);
    assert.equal($('iframe').length, 0);
    assert.equal($('script[src]').length, 0);
    assert.doesNotMatch($('script').text(), /gtag|googletagmanager|sessionStorage|fetch\(|utm_|gclid|postMessage/);
  }
});

test('campaign links resolve locally and fragments identify exactly one section', () => {
  for (const page of pages) {
    const $ = html(page);
    $('a[href^="#"]').each((_, el) => {
      const id = $(el).attr('href').slice(1);
      assert.equal($('[id]').filter((_, e) => $(e).attr('id') === id).length, 1);
    });
    $('a[href^="/"]').each((_, el) => {
      const href = $(el).attr('href');
      assert.ok(fs.existsSync(path.join(root, 'dist', href, 'index.html')), href);
    });
  }
  assert.deepEqual(paymentPaths.map(p => p.href).sort(), pages.filter(p => p.intent !== 'general').map(p => p.slug).sort());
});

test('campaign styles do not load on the existing main site', () => {
  const campaignCss = html(pages[0])('link[rel="stylesheet"]').map((_, e) => e.attribs.href).get();
  assert.ok(campaignCss.length);
  for (const route of ['', 'es', 'library']) {
    const $ = load(read(`dist/${route ? route + '/' : ''}index.html`));
    const mainCss = $('link[rel="stylesheet"]').map((_, e) => e.attribs.href).get();
    assert.ok(campaignCss.every(css => !mainCss.includes(css)));
  }
});

test('early-intervention preserves its own publication identity and source sections', () => {
  const $ = load(read('dist/lp/early-intervention/index.html'));
  assert.equal($('h1').text(), 'Early Autism Intervention Makes a Difference');
  assert.equal($('h1').length, 1);
  assert.equal($('main').length, 1);
  assert.equal($('link[rel="canonical"]').attr('href'), 'https://www.azinstitute4autism.com/lp/early-intervention');
  assert.equal($('.qr-landing section').length, 7);
  assert.equal($('.qr-benefit-card').length, 3);
  assert.equal($('.qr-process-step').length, 3);
  assert.equal($('form, input[type="hidden"], script[src]').length, 0);
  assert.equal($('#consultation input').length, 3);
  assert.equal($('#consultation input:disabled').length, 3);
  assert.equal($('#consultation button').attr('type'), 'button');
  assert.ok($('#consultation-unavailable a[href="tel:+14806877099"]').length);
  assert.equal($('img[src^="https:"]').length, 0);
  assert.ok($('.early-header').length);
  assert.equal($('.mobile-cta').length, 0);
});
