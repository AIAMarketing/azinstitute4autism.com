import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'astro';
import { load } from 'cheerio';

const project = fileURLToPath(new URL('../', import.meta.url));
const url = 'https://example.org:8443/path?q=1:2#details';
const literalContent = [
  'Therapy ratios: 1:1 and 1:2; school ratio: 1:10.',
  'Note: ordinary punctuation. Opportunities:Plan breaks.',
  'Hours: 4:00 PM – 6:00 PM. Horario: 4:00 p. m. – 6:00 p. m.',
  `A URL: ${url}`,
  `[Visit](${url})`,
  '`1:1 1:2 4:00 :example`',
  '```text\n:::container\n::leaf\n:inline\n1:1 1:2 4:00\n```',
  '[Jump to ratios](#stable-ratios)'
].join('\n\n');

const contentCases = [
  ['service-en', 'pages', 'en/aba-therapy'],
  ['service-es', 'pages', 'es/aba-therapy'],
  ['club-en', 'pages', 'en/learner-social-club'],
  ['club-es', 'pages', 'es/learner-social-club'],
  ['school-en', 'blog', 'en/aba-school-readiness-arizona'],
  ['school-es', 'blog', 'es/aba-school-readiness-arizona'],
  ['faq-en', 'pages', 'en/faqs']
];
// Render real content at its manifest URL: FAQ components now resolve publication
// policy from Astro.url. Synthetic aliases such as /school-en are not published.
const contentRoute = (collection, id) => {
  const [lang, ...slug] = id.split('/');
  return [...(lang === 'en' ? [] : [lang]), ...(collection === 'blog' ? ['library'] : []), ...slug].join('/');
};
let fixtureRoot;
const rendered = new Map();

before(async () => {
  fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'aia-markdown-test-'));
  // Keep real components, content collections and layouts inside Astro's root.
  // Exclude production routes so fixtures can never enter the production build.
  await cp(path.join(project, 'src'), path.join(fixtureRoot, 'src'), {
    recursive: true,
    filter: (source) => source !== path.join(project, 'src/pages')
  });
  const pages = path.join(fixtureRoot, 'src/pages');
  await mkdir(pages);
  await symlink(path.join(project, 'node_modules'), path.join(fixtureRoot, 'node_modules'), 'dir');
  await writeFile(path.join(fixtureRoot, 'package.json'), '{"type":"module"}\n');
  await writeFile(path.join(pages, 'markdown.md'), [
    '---\ntitle: Markdown regression fixture\n---',
    '## ABA Therapy 1:1 and 1:2 {#stable-ratios}',
    literalContent
  ].join('\n\n'));
  await writeFile(path.join(pages, 'mdx.mdx'), [
    '---\ntitle: MDX regression fixture\n---',
    // The installed MDX parser rejects {#id}; explicit HTML IDs are supported.
    '<h2 id="stable-ratios">ABA Therapy 1:1 and 1:2</h2>',
    literalContent,
    '<span data-mdx="true">Embedded MDX: 1:2</span>'
  ].join('\n\n'));
  for (const [, collection, id] of contentCases) {
    const file = path.join(pages, `${contentRoute(collection, id)}.astro`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, `---
import { getEntry, render } from 'astro:content';
const entry = await getEntry('${collection}', '${id}');
if (!entry) throw new Error('Missing regression content: ${id}');
const { Content } = await render(entry);
---
<main><Content /></main>
`);
  }

  const originalCwd = process.cwd();
  try {
    // Astro's prerender fallback resolves against cwd; keep all output temporary.
    process.chdir(fixtureRoot);
    await build({
      root: pathToFileURL(`${fixtureRoot}${path.sep}`),
      configFile: path.relative(fixtureRoot, path.join(project, 'astro.config.mjs')),
      logLevel: 'silent',
      vite: { cacheDir: path.join(fixtureRoot, '.vite') }
    });
  } finally {
    process.chdir(originalCwd);
  }
  for (const [name, route] of [['markdown', 'markdown'], ['mdx', 'mdx'], ...contentCases.map(([name, collection, id]) => [name, contentRoute(collection, id)])]) {
    rendered.set(name, load(await readFile(path.join(fixtureRoot, 'dist', route, 'index.html'), 'utf8')));
  }
}, { timeout: 120_000 });

after(async () => {
  if (fixtureRoot) await rm(fixtureRoot, { recursive: true, force: true });
});

for (const format of ['markdown', 'mdx']) {
  test(`${format}: literal ratios survive prose and headings`, () => {
    const $ = rendered.get(format);
    assert.equal($('h2').text(), 'ABA Therapy 1:1 and 1:2');
    assert.ok($('p').text().includes('Therapy ratios: 1:1 and 1:2; school ratio: 1:10.'));
  });

  test(`${format}: ordinary colons and adjacent words remain literal`, () => {
    assert.ok(rendered.get(format)('p').text().includes('Note: ordinary punctuation. Opportunities:Plan breaks.'));
  });

  test(`${format}: English and Spanish times retain their minutes`, () => {
    const text = rendered.get(format)('p').text();
    assert.ok(text.includes('4:00 PM – 6:00 PM'));
    assert.ok(text.includes('4:00 p. m. – 6:00 p. m.'));
  });

  test(`${format}: URL scheme, port, query and fragment survive`, () => {
    const $ = rendered.get(format);
    assert.ok($('p').text().includes(`A URL: ${url}`));
    assert.equal($('a').filter((_, a) => $(a).text() === 'Visit').attr('href'), url);
  });

  test(`${format}: inline and fenced code remain literal`, () => {
    const $ = rendered.get(format);
    assert.ok($('code').toArray().some((node) => $(node).text() === '1:1 1:2 4:00 :example'));
    assert.equal($('pre code').text().trim(), ':::container\n::leaf\n:inline\n1:1 1:2 4:00');
  });

  test(`${format}: explicit heading IDs and fragment links stay intact`, () => {
    const $ = rendered.get(format);
    assert.equal($('h2').attr('id'), 'stable-ratios');
    assert.equal($('#stable-ratios').length, 1);
    assert.equal($('a[href="#stable-ratios"]').length, 1);
    assert.ok(!$('h2').text().includes('{#'));
  });
}

test('MDX embedded markup uses the same literal-text behavior', () => {
  assert.equal(rendered.get('mdx')('[data-mdx="true"]').text(), 'Embedded MDX: 1:2');
});

for (const lang of ['en', 'es']) {
  test(`${lang}: actual ABA service headings and prose retain both ratios`, () => {
    const $ = rendered.get(`service-${lang}`);
    for (const ratio of ['1:1', '1:2']) {
      assert.ok($('h4').text().includes(ratio));
      assert.equal(($('main').text().match(new RegExp(`${ratio}(?!\\d)`, 'g')) ?? []).length, 2);
    }
  });

  test(`${lang}: actual social-club hours retain all four minute suffixes`, () => {
    const text = rendered.get(`club-${lang}`)('main').text();
    assert.equal((text.match(/4:00/g) ?? []).length, 2);
    assert.equal((text.match(/6:00/g) ?? []).length, 2);
    const hours = lang === 'en' ? '4:00 PM – 6:00 PM' : '4:00 p. m. – 6:00 p. m.';
    assert.equal(text.split(hours).length - 1, 2);
  });

  test(`${lang}: actual school-readiness prose and table ratios survive`, () => {
    const $ = rendered.get(`school-${lang}`);
    assert.equal(($('main').text().match(/1:1(?!\d)/g) ?? []).length, lang === 'en' ? 3 : 1);
    assert.equal(($('main').text().match(/1:10/g) ?? []).length, lang === 'en' ? 1 : 2);
    assert.ok($('table').text().includes('1:10'));
  });
}

test('actual FAQ prose retains the word after an adjacent colon', () => {
  assert.ok(rendered.get('faq-en')('main').text().includes('Opportunities:Plan breaks'));
});
