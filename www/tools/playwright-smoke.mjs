/** Environment probe only: real staging pages, loopback preview, no external egress. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const moduleName = process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright';
let preview, browser;
let previewError;
const results = {startedAt: new Date().toISOString(), pages: [], blocked: [], status: 'failed'};
const output = await fs.mkdtemp('/tmp/aia-playwright-smoke-');
const stop = signal => { preview?.kill('SIGTERM'); process.exit(signal === 'SIGINT' ? 130 : 143); };
process.once('SIGINT', stop);
process.once('SIGTERM', stop);

try {
  for (const route of ['es/privacy-policy', 'library']) {
    const html = await fs.readFile(path.join(root, 'dist', route, 'index.html'), 'utf8');
    assert.match(html, /name="robots" content="noindex,nofollow"/,
      'Run a normal staging build before the browser probe.');
  }
  const {chromium} = await import(moduleName);
  // Do not add flags to bypass the outer environment's security restrictions.
  browser = await chromium.launch({headless: true});
  results.browser = browser.version();
  const reserve = net.createServer();
  await new Promise((resolve, reject) => {
    reserve.once('error', reject);
    reserve.listen(0, '127.0.0.1', resolve);
  });
  const port = reserve.address().port;
  await new Promise(resolve => reserve.close(resolve));
  const origin = `http://127.0.0.1:${port}`;
  results.origin = origin;
  preview = spawn(process.execPath, [
    'node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port),
  ], {cwd: root, env: {...process.env, ASTRO_TELEMETRY_DISABLED: '1'}, stdio: 'ignore'});
  preview.once('error', error => { previewError = error; });
  const ready = () => new Promise(resolve => {
    const request = http.get(origin + '/es/privacy-policy', response => {
      response.resume(); resolve(response.statusCode === 200);
    });
    request.setTimeout(500, () => request.destroy());
    request.on('error', () => resolve(false));
  });
  let reachable = false;
  for (let i = 0; i < 60; i++) {
    if (previewError) throw previewError;
    if (preview.exitCode !== null) throw Error('Astro preview exited before the probe.');
    if (await ready()) { reachable = true; break; }
    await delay(250);
  }
  assert.ok(reachable, 'Astro loopback preview was not reachable in this execution.');
  const context = await browser.newContext({
    viewport: {width: 1440, height: 900}, deviceScaleFactor: 1,
    serviceWorkers: 'block', acceptDownloads: false,
  });
  assert.equal(typeof context.routeWebSocket, 'function', 'Playwright lacks WebSocket isolation.');
  await context.routeWebSocket('**/*', socket => socket.close());
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (url.origin !== origin || !['GET', 'HEAD'].includes(request.method())) {
      results.blocked.push({origin: url.origin, path: url.pathname, method: request.method()});
      return route.abort();
    }
    return route.continue();
  });
  const page = await context.newPage();
  for (const route of ['/es/privacy-policy', '/library']) {
    const response = await page.goto(origin + route, {waitUntil: 'networkidle', timeout: 15000});
    assert.equal(response.status(), 200);
    assert.equal(new URL(page.url()).origin, origin);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow');
    assert.equal(await page.locator('main h1').count(), 1);
    assert.ok(await page.locator('main h1').isVisible());
    const title = await page.title(), h1 = await page.locator('main h1').innerText();
    assert.ok(title.trim() && h1.trim());
    if (route.startsWith('/es/')) assert.match(h1, /Política/);
    assert.equal(results.blocked.length, 0, 'Unexpected request prevented; inspect evidence before proceeding.');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path: path.join(output, route.startsWith('/es/') ? 'privacy.png' : 'library.png'), fullPage: true});
    results.pages.push({route, title, h1});
  }
  assert.equal(results.blocked.length, 0, 'Unexpected request prevented; inspect evidence before proceeding.');
  results.status = 'passed';
} catch (error) {
  results.error = String(error.message);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (preview && preview.exitCode === null) {
    preview.kill('SIGTERM');
    const exited = new Promise(resolve => preview.once('exit', resolve));
    await Promise.race([exited, delay(3000)]);
    if (preview.exitCode === null) preview.kill('SIGKILL');
  }
  results.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(output, 'result.json'), JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify({...results, output}, null, 2));
}
