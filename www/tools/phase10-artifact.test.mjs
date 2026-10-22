import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { verifyArtifact } from './phase10-artifact-verify.mjs';

async function fixture(mode = 'staging') {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'aia-phase10-artifact-'));
  const pages = mode === 'staging'
    ? [['index.html', 'noindex,nofollow'], ['lp/index.html', 'noindex,nofollow']]
    : [['index.html', 'index,follow']];
  for (const [file, robots] of pages) {
    const target = path.join(root, file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, `<!doctype html><html><head><title>${file}</title><meta name="robots" content="${robots}"><link rel="canonical" href="https://www.azinstitute4autism.com/${file}"></head><body><main><h1>${file}</h1></main></body></html>`);
  }
  await fs.writeFile(path.join(root, 'sitemap.xml'), mode === 'staging' ? '<urlset></urlset>' : '<urlset><url><loc>https://www.azinstitute4autism.com/</loc></url></urlset>');
  return root;
}

test('staging artifact requires noindex, empty sitemap, no hreflang and review index', async () => {
  const result = await verifyArtifact(await fixture('staging'), 'staging');
  assert.equal(result.passed, true);
  assert.equal(result.sitemapUrls, 0);
  assert.equal(result.reviewIndex, true);
});

test('indexing artifact requires sitemap and excludes review index', async () => {
  const result = await verifyArtifact(await fixture('indexing'), 'indexing');
  assert.equal(result.passed, true);
  assert.equal(result.sitemapUrls, 1);
  assert.equal(result.reviewIndex, false);
});

test('staging artifact rejects active native form actions', async () => {
  const root = await fixture('staging');
  await fs.appendFile(path.join(root, 'index.html'), '<form action="https://example.invalid/submit"></form>');
  const result = await verifyArtifact(root, 'staging');
  assert.equal(result.passed, false);
  assert.ok(result.errors.some((error) => error.includes('native form action')));
});

test('artifact rejects live form mode and production API origin', async () => {
  const root = await fixture('staging');
  await fs.appendFile(path.join(root, 'index.html'), '<div data-form-mode="live">https://api.azinstitute4autism.com</div>');
  const result = await verifyArtifact(root, 'staging');
  assert.equal(result.passed, false);
  assert.ok(result.errors.some((error) => error.includes('unsafe artifact signals')));
});

test('artifact digest is deterministic for unchanged files', async () => {
  const root = await fixture('staging');
  const first = await verifyArtifact(root, 'staging');
  const second = await verifyArtifact(root, 'staging');
  assert.equal(first.artifactSha256, second.artifactSha256);
  assert.equal(first.artifactFiles, second.artifactFiles);
});
