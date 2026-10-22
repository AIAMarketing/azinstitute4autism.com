import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyArtifact } from './phase10-artifact-verify.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const rehearsalRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'aia-release-rehearsal-'));
const releases = path.join(rehearsalRoot, 'releases');
await fs.mkdir(releases, { recursive: true });
const releaseA = path.join(releases, 'release-a');
const releaseB = path.join(releases, 'release-b');
await fs.cp(dist, releaseA, { recursive: true });
await fs.cp(dist, releaseB, { recursive: true });
await fs.writeFile(path.join(releaseA, '__release-marker.txt'), 'release-a\n');
await fs.writeFile(path.join(releaseB, '__release-marker.txt'), 'release-b\n');
const current = path.join(rehearsalRoot, 'current');
await fs.symlink(releaseA, current);

const contentTypes = { '.html': 'text/html', '.xml': 'application/xml', '.txt': 'text/plain', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname);
    const clean = pathname.replace(/^\/+/, '');
    const candidates = [clean, clean.endsWith('/') ? `${clean}index.html` : `${clean}/index.html`, clean === '' ? 'index.html' : null].filter(Boolean);
    let target;
    for (const candidate of candidates) {
      const candidatePath = path.resolve(current, candidate);
      if (candidatePath.startsWith(path.resolve(current)) && await fs.stat(candidatePath).then((stat) => stat.isFile()).catch(() => false)) { target = candidatePath; break; }
    }
    if (!target) { response.writeHead(404, { 'content-type': 'text/plain' }); response.end('Not found'); return; }
    const body = await fs.readFile(target);
    response.writeHead(200, { 'content-type': contentTypes[path.extname(target)] ?? 'application/octet-stream', 'cache-control': path.extname(target) === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable' });
    response.end(body);
  } catch { response.writeHead(400); response.end('Bad request'); }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const request = (pathname) => new Promise((resolve, reject) => {
  const req = http.get(origin + pathname, (res) => { const chunks = []; res.on('data', (chunk) => chunks.push(chunk)); res.on('end', () => resolve({ status: res.statusCode, type: res.headers['content-type'], cache: res.headers['cache-control'], body: Buffer.concat(chunks).toString('utf8') })); });
  req.on('error', reject);
});
const checks = [];
const check = async (name, fn) => { await fn(); checks.push(name); };
await check('staging artifact verifier', async () => assert.equal((await verifyArtifact(releaseA, 'staging')).passed, true));
await check('root route', async () => assert.equal((await request('/')).status, 200));
await check('locale route', async () => assert.equal((await request('/es')).status, 200));
await check('slashless and trailing-slash routes', async () => { assert.equal((await request('/library')).status, 200); assert.equal((await request('/library/')).status, 200); });
await check('query strings preserved by static serving', async () => assert.equal((await request('/search?term=aba&lang=es')).status, 200));
await check('asset MIME type', async () => assert.match((await request('/assets/images/favicon.svg')).type, /image\/svg/));
await check('robots and empty staging sitemap', async () => { const robots = await request('/robots.txt'); const sitemap = await request('/sitemap.xml'); assert.equal(robots.status, 200); assert.equal((sitemap.body.match(/<url>/g) ?? []).length, 0); });
await check('real 404', async () => assert.equal((await request('/does-not-exist')).status, 404));
await check('atomic release switch', async () => { await fs.rename(current, `${current}.old`); await fs.symlink(releaseB, current); assert.match((await request('/__release-marker.txt')).body, /release-b/); });
await check('rollback restores prior release', async () => { await fs.unlink(current); await fs.symlink(releaseA, current); assert.match((await request('/__release-marker.txt')).body, /release-a/); });
await new Promise((resolve) => server.close(resolve));
console.log(JSON.stringify({ status: 'passed', origin, rehearsalRoot, checks, productionContact: false }, null, 2));
