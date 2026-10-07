import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { load } from 'cheerio';
import { createPublicationManifest, normalizeRoute, publicationFor, renderSitemap, robotsFor, sitemapUrls } from '../src/utils/publication-policy.ts';

const project = fileURLToPath(new URL('../', import.meta.url));
const site = JSON.parse(await readFile(path.join(project, 'src/data/site.json'), 'utf8')).url;
const evidence = JSON.parse(await readFile(path.join(project, 'reports/route-reconciliation-2026-10-07-offline.json'), 'utf8'));
const verifiedExceptions = evidence.routes.filter((row) => row.local && row.production?.http?.robots === 'noindex');
const entry = (data = {}, collection = 'pages', id = 'en/example') => ({ id, collection, data: { slug: 'example', lang: 'en', draft: false, ...data } });

async function readEntries(root) {
  return Promise.all((await fg('src/content/{pages,blog}/**/*.{md,mdx}', { cwd: root })).sort().map(async (file) => {
    const [, , collection, ...parts] = file.split('/');
    return { id: parts.join('/').replace(/\.mdx?$/, ''), collection, data: matter(await readFile(path.join(root, file), 'utf8')).data };
  }));
}

function assertCanonical(html, expected) {
  const $ = load(html);
  const tags = $('head link[rel="canonical"]');
  assert.equal(tags.length, 1, 'Exactly one canonical link is required');
  const href = tags.attr('href');
  assert.ok(/^https?:\/\//.test(href ?? ''), 'Canonical must be an absolute HTTP(S) URL');
  const parsed = new URL(href);
  assert.ok(!parsed.hash && !parsed.username && !parsed.password, 'Invalid canonical components');
  assert.equal(href, expected, 'Canonical must match the publication policy');
}

test('normal published pages self-canonicalize and enter the production sitemap', () => {
  const page = publicationFor(entry(), site);
  assert.equal(page.route, '/example');
  assert.equal(page.canonical, `${site}/example`);
  assert.equal(page.eligible, true);
  assert.deepEqual(sitemapUrls([page], true), [`${site}/example`]);
  assert.equal(robotsFor(page, true), 'index,follow');
});

test('draft/unpublished entries cannot become routes or sitemap entries', () => {
  const page = publicationFor(entry({ draft: true }), site);
  assert.equal(page.eligible, false);
  assert.equal(page.sitemapEligible, false);
  assert.deepEqual(sitemapUrls([page], true), []);
});

test('published noindex pages stay eligible but never enter the sitemap', () => {
  const page = publicationFor(entry({ noindex: true }), site);
  assert.equal(page.eligible, true);
  assert.equal(robotsFor(page, true), 'noindex,follow');
  assert.deepEqual(sitemapUrls([page], true), []);
});

test('external canonicals are preserved and excluded independently of noindex', () => {
  const page = publicationFor(entry({ canonical: 'https://publisher.example/original/' }), site);
  assert.equal(page.noindex, false);
  assert.equal(page.eligible, true);
  assert.equal(page.url, `${site}/example`);
  assert.equal(page.canonical, 'https://publisher.example/original/');
  assert.equal(page.externalCanonical, true);
  assert.deepEqual(sitemapUrls([page], true), []);
});

test('trailing slashes normalize; absent frontmatter canonicals get a self canonical', () => {
  assert.equal(normalizeRoute('/example///'), '/example');
  assert.equal(normalizeRoute('/'), '/');
  assert.equal(publicationFor(entry({ canonical: `${site}/example/` }), site).canonical, `${site}/example`);
  assert.equal(publicationFor(entry({ slug: 'index' }), site).canonical, `${site}/`);
  assert.equal(publicationFor(entry({ slug: 'index', lang: 'es' }), site).canonical, `${site}/es`);
});

test('malformed, unsafe and conflicting local canonicals are rejected', () => {
  for (const canonical of ['', '/example', 'not a URL', 'javascript:alert(1)', 'ftp://example.org/a', 'https://user:secret@example.org/a', `${site}/example#fragment`, `${site}/other`, `${site}/example?tracking=yes`, 'http://www.azinstitute4autism.com/example', 'https://azinstitute4autism.com/example']) {
    assert.throws(() => publicationFor(entry({ canonical }), site), /canonical/i, canonical);
  }
});

test('duplicate canonical targets and duplicate frontmatter keys are rejected', () => {
  const canonical = 'https://publisher.example/original';
  assert.throws(() => createPublicationManifest([entry({ canonical }), entry({ slug: 'second', canonical }, 'pages', 'en/second')], site), /Duplicate canonical/);
  assert.throws(() => matter('---\ncanonical: https://example.org/a\ncanonical: https://example.org/b\n---\n'), /duplicated mapping key/);
});

test('route collisions include cross-collection, locale, trailing-slash and draft cases', () => {
  for (const pair of [
    [entry({ slug: 'library/example' }), entry({}, 'blog')],
    [entry({ slug: 'es/example' }), entry({ lang: 'es' })],
    [entry(), entry({ slug: 'example/', draft: true }, 'pages', 'en/draft')]
  ]) assert.throws(() => createPublicationManifest(pair, site), /Route collision/);
  for (const slug of ['sitemap.xml', 'robots.txt', 'assets/example']) {
    assert.throws(() => publicationFor(entry({ slug }), site), /reserved utility/);
  }
  for (const route of ['//example.org', '/a/../b', '/a/%2E%2E/b', '/a//b', '/a%2fb', '/a?q=1', '/a#id']) {
    assert.throws(() => normalizeRoute(route), /Invalid local route/);
  }
});

test('staging noindex cannot be overridden by page policy', () => {
  for (const data of [{}, { noindex: false }, { noindex: true }, { draft: true }]) {
    assert.equal(robotsFor(publicationFor(entry(data), site), false), 'noindex,nofollow');
  }
  assert.deepEqual(sitemapUrls([publicationFor(entry(), site)], false), []);
});

test('generated-head acceptance checks reject missing, duplicate and invalid canonicals', () => {
  const canonical = `${site}/example`;
  const tag = `<link rel="canonical" href="${canonical}">`;
  assert.doesNotThrow(() => assertCanonical(`<head>${tag}</head>`, canonical));
  for (const tags of ['', tag + tag, '<link rel="canonical" href="/example">', '<link rel="canonical" href="javascript:alert(1)">']) {
    assert.throws(() => assertCanonical(`<head>${tags}</head>`, canonical));
  }
});

const sourceEntries = await readEntries(project);
const actualManifest = createPublicationManifest(sourceEntries, site);

test('the actual Arabic homepage placeholder remains unpublished', () => {
  const arabic = actualManifest.find((page) => page.route === '/ar');
  assert.equal(arabic.entry.data.draft, true);
  assert.equal(arabic.eligible, false);
  assert.ok(!sitemapUrls(actualManifest, true).includes(`${site}/ar`));
});

test('all four verified public noindex exceptions retain their policy', () => {
  assert.deepEqual(verifiedExceptions.map((page) => page.route).sort(), [
    '/employee-portal', '/library/community-highlight-meet-rula-diab',
    '/library/new-aia-scottsdale-office', '/schedule-consultation'
  ]);
  for (const exception of verifiedExceptions) {
    const page = actualManifest.find((candidate) => candidate.route === exception.route);
    assert.equal(page.eligible, true, exception.route);
    assert.equal(page.noindex, true, exception.route);
    assert.equal(page.canonical, exception.production.http.canonical, exception.route);
    assert.equal(page.sitemapEligible, false, exception.route);
  }
});

// Build the actual application in isolation: no network, deployment or writes
// to the real source, environment files or dist. Child processes isolate Vite's
// environment cache so indexing-enabled output cannot leak into staging.
let temporary;
let fixtureManifest;
const artifacts = new Map();
before(async () => {
  temporary = await mkdtemp(path.join(os.tmpdir(), 'aia-publication-test-'));
  await cp(path.join(project, 'src'), path.join(temporary, 'src'), { recursive: true });
  await symlink(path.join(project, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  await writeFile(path.join(temporary, 'package.json'), '{"type":"module"}\n');
  for (const [collection, name, flags] of [
    ['pages', 'publication-draft', 'draft: true'],
    ['blog', 'publication-draft', 'draft: true\ndate: 2026-10-07\nauthor: aia'],
    ['pages', 'publication-normal', 'draft: false'],
    ['pages', 'publication-external', 'draft: false\ncanonical: https://publisher.example/original/']
  ]) {
    await writeFile(path.join(temporary, 'src/content', collection, 'en', `${name}.md`),
      `---\ntitle: Publication regression fixture\nslug: ${name}\nlang: en\n${flags}\n---\nFixture content.\n`);
  }
  fixtureManifest = createPublicationManifest(await readEntries(temporary), site);
  const runner = `import {build} from ${JSON.stringify(pathToFileURL(path.join(project, 'node_modules/astro/dist/index.js')).href)};
await build({root:${JSON.stringify(temporary)},configFile:${JSON.stringify(path.relative(temporary, path.join(project, 'astro.config.mjs')))},logLevel:'silent',vite:{cacheDir:${JSON.stringify(path.join(temporary, '.vite'))}}});`;
  for (const mode of ['staging', 'indexing', 'draft-indexes']) {
    if (mode === 'draft-indexes') {
      for (const file of ['src/content/pages/en/index.md', 'src/content/pages/es/library.md']) {
        const target = path.join(temporary, file);
        await writeFile(target, (await readFile(target, 'utf8')).replace('draft: false', 'draft: true'));
      }
    }
    execFileSync(process.execPath, ['--input-type=module', '-e', runner], {
      cwd: temporary, env: { ...process.env, PUBLIC_ALLOW_INDEXING: mode === 'staging' ? 'false' : 'true' },
      timeout: 60_000, maxBuffer: 2 * 1024 * 1024
    });
    const html = new Map();
    for (const file of await fg('**/*.html', { cwd: path.join(temporary, 'dist') })) {
      const route = '/' + file.replace(/(^|\/)index\.html$/, '').replace(/\/$/, '');
      html.set(route, await readFile(path.join(temporary, 'dist', file), 'utf8'));
    }
    artifacts.set(mode, { html, sitemap: await readFile(path.join(temporary, 'dist/sitemap.xml'), 'utf8'), robots: await readFile(path.join(temporary, 'dist/robots.txt'), 'utf8') });
  }
}, { timeout: 120_000 });

after(async () => {
  if (temporary) await rm(temporary, { recursive: true, force: true });
});

for (const mode of ['staging', 'indexing']) {
  test(`${mode} build: only eligible local routes are generated, including home/Library`, () => {
    assert.deepEqual([...artifacts.get(mode).html.keys()].sort(), fixtureManifest.filter((page) => page.eligible).map((page) => page.route).sort());
    assert.ok(!artifacts.get(mode).html.has('/ar'));
    assert.ok(artifacts.get(mode).html.has('/schedule-consultation'));
  });

  test(`${mode} build: every generated head has exactly one correct canonical and robots tag`, () => {
    for (const page of fixtureManifest.filter((candidate) => candidate.eligible)) {
      const html = artifacts.get(mode).html.get(page.route);
      assertCanonical(html, page.canonical);
      const $ = load(html);
      assert.equal($('meta[name="robots"]').length, 1, page.route);
      assert.equal($('meta[name="robots"]').attr('content'), robotsFor(page, mode === 'indexing'), page.route);
      assert.equal($('a[href="/ar"]').length, 0, 'No navigation links to the unpublished placeholder');
      assert.equal($('link[hreflang]').length, 0, 'Language-alternate policy is outside Phase 3A');
    }
  });

  test(`${mode} build: sitemap exactly matches eligible local indexable self-canonical routes`, () => {
    const { sitemap, html, robots } = artifacts.get(mode);
    assert.equal(sitemap, renderSitemap(fixtureManifest, mode === 'indexing'));
    const $ = load(sitemap, { xml: true });
    const urls = $('loc').map((_, node) => $(node).text()).get();
    assert.equal(new Set(urls).size, urls.length);
    for (const url of urls) {
      assert.equal(new URL(url).origin, site);
      assert.ok(html.has(new URL(url).pathname), url);
    }
    assert.equal(robots.includes(`Sitemap: ${site}/sitemap.xml`), mode === 'indexing');
    assert.ok(!urls.includes(`${site}/ar`));
    for (const exception of verifiedExceptions) assert.ok(!urls.includes(site + exception.route));
    assert.ok(!urls.includes(`${site}/publication-external`));
    if (mode === 'indexing') assert.ok(urls.includes(`${site}/publication-normal`));
  });
}

test('formerly fixed home and Library routes disappear when their entries become drafts', () => {
  const { html, sitemap } = artifacts.get('draft-indexes');
  assert.ok(!html.has('/'));
  assert.ok(!html.has('/es/library'));
  assert.ok(html.has('/es'));
  const $ = load(sitemap, { xml: true });
  const urls = $('loc').map((_, node) => $(node).text()).get();
  assert.ok(!urls.includes(`${site}/`));
  assert.ok(!urls.includes(`${site}/es/library`));
});
