import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fg from 'fast-glob';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const moduleName = process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright';
const executablePath = process.env.CHROMIUM_EXECUTABLE;
const output = await fs.mkdtemp('/tmp/aia-phase10-browser-');
const result = { startedAt: new Date().toISOString(), routeCount: 0, opened: 0, failures: [], pageErrors: [], consoleErrors: [], blocked: [], productionAttempts: [], screenshots: [], status: 'failed' };
let browser;
let preview;

function routeFromHtml(file) {
  const relative = path.relative(path.join(root, 'dist'), file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.endsWith('/index.html') ? relative.slice(0, -'/index.html'.length) : relative.replace(/\.html$/, '')}`;
}

function isProductionLike(url) {
  return /(?:api\.azinstitute4autism\.com|jotform|google-analytics|googletagmanager|doubleclick|googleadservices|hubspot)/i.test(url.hostname + url.pathname);
}

const reserve = net.createServer();
await new Promise((resolve, reject) => { reserve.once('error', reject); reserve.listen(0, '127.0.0.1', resolve); });
const port = reserve.address().port;
await new Promise((resolve) => reserve.close(resolve));
const origin = `http://127.0.0.1:${port}`;

try {
  const htmlFiles = (await fg('**/*.html', { cwd: path.join(root, 'dist'), absolute: true })).sort();
  const routes = htmlFiles.map(routeFromHtml);
  result.routeCount = routes.length;
  const { chromium } = await import(moduleName);
  browser = await chromium.launch(executablePath ? { headless: true, executablePath } : { headless: true });
  result.browser = browser.version();
  preview = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, stdio: 'ignore'
  });
  const reachable = async () => new Promise((resolve) => {
    const request = http.get(origin + '/', (response) => { response.resume(); resolve(response.statusCode === 200); });
    request.setTimeout(500, () => request.destroy());
    request.on('error', () => resolve(false));
  });
  for (let attempt = 0; attempt < 60 && !(await reachable()); attempt++) await delay(250);
  assert.equal(await reachable(), true, 'Astro preview was not reachable');
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block', acceptDownloads: false });
  assert.equal(typeof context.routeWebSocket, 'function', 'Playwright lacks WebSocket isolation');
  await context.routeWebSocket('**/*', (socket) => socket.close());
  await context.route('**/*', (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin || !['GET', 'HEAD'].includes(request.method())) {
      const attempt = { origin: url.origin, path: url.pathname, method: request.method() };
      result.blocked.push(attempt);
      if (isProductionLike(url)) result.productionAttempts.push(attempt);
      return route.abort();
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => result.pageErrors.push({ route: page.url(), message: String(error.message) }));
  page.on('console', (message) => { if (message.type() === 'error') result.consoleErrors.push({ route: page.url(), message: message.text() }); });
  const screenshotRoutes = new Set(['/', '/es', '/contact', '/ar/library/aba-school-readiness-guide', '/tour', '/lp/aba-therapy']);
  for (const route of routes) {
    try {
      const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
      assert.equal(response?.status(), 200);
      assert.equal(new URL(page.url()).origin, origin);
      assert.ok((await page.title()).trim(), 'missing title');
      assert.equal(await page.locator('link[rel="canonical"]').count(), 1, 'canonical count');
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow', 'staging robots');
      const nonSearchForms = await page.locator('main form').evaluateAll((forms) => forms.filter((form) => {
        const action = form.getAttribute('action');
        return action && action !== '/search';
      }).length);
      assert.equal(nonSearchForms, 0, 'non-search form found');
      const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
      if (overflow.scrollWidth > overflow.clientWidth + 1) result.failures.push({ route, issue: 'page-level horizontal overflow', overflow });
      if (screenshotRoutes.has(route)) {
        const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-') || 'root';
        const screenshot = path.join(output, `${name}.png`);
        await page.screenshot({ path: screenshot, fullPage: true });
        result.screenshots.push({ route, path: screenshot });
      }
      result.opened++;
    } catch (error) {
      result.failures.push({ route, issue: String(error.message) });
    }
  }
  result.status = result.failures.length || result.productionAttempts.length ? 'failed' : 'passed';
} catch (error) {
  result.error = String(error.message);
} finally {
  await browser?.close();
  if (preview && preview.exitCode === null) {
    preview.kill('SIGTERM');
    await Promise.race([new Promise((resolve) => preview.once('exit', resolve)), delay(3000)]);
    if (preview.exitCode === null) preview.kill('SIGKILL');
  }
  result.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(output, 'result.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ ...result, output }, null, 2));
  if (result.status !== 'passed') process.exitCode = 1;
}
