import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const moduleName = process.env.PLAYWRIGHT_MODULE ? pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright';
const routes = ['/', '/es', '/contact', '/es/contact', '/client-consultation', '/es/client-consultation', '/referrals', '/aba-therapy', '/autism-evaluations', '/learner-social-club', '/library', '/library/page/6', '/ar/library/aba-school-readiness-guide', '/search', '/tour', '/privacy-policy', '/es/privacy-policy', '/lp/aba-therapy', '/lp/aba-insurance', '/lp/aba-ahcccs', '/lp/aba-private-pay', '/lp/early-intervention'];
const widths = [320, 390, 768, 1024, 1440];
const selected = new Set(['/', '/es', '/tour', '/ar/library/aba-school-readiness-guide', '/lp/aba-therapy']);
const output = await fs.mkdtemp('/tmp/aia-phase10-responsive-');
const evidence = { startedAt: new Date().toISOString(), routes: routes.length, widths, checks: 0, failures: [], blocked: [], productionAttempts: [], screenshots: [], status: 'failed' };
let browser; let preview;
const reserve = net.createServer();
await new Promise((resolve, reject) => { reserve.once('error', reject); reserve.listen(0, '127.0.0.1', resolve); });
const port = reserve.address().port; await new Promise((resolve) => reserve.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const production = (url) => /(?:api\.azinstitute4autism\.com|jotform|google-analytics|googletagmanager|doubleclick|hubspot)/i.test(url.hostname + url.pathname);
try {
  const { chromium } = await import(moduleName);
  browser = await chromium.launch(process.env.CHROMIUM_EXECUTABLE ? { headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE } : { headless: true });
  preview = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port)], { cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, stdio: 'ignore' });
  const reachable = () => new Promise((resolve) => { const request = http.get(origin + '/', (response) => { response.resume(); resolve(response.statusCode === 200); }); request.setTimeout(500, () => request.destroy()); request.on('error', () => resolve(false)); });
  for (let i = 0; i < 60 && !(await reachable()); i++) await delay(250);
  assert.equal(await reachable(), true);
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 900 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    await context.routeWebSocket('**/*', (socket) => socket.close());
    await context.route('**/*', (route) => { const request = route.request(); const url = new URL(request.url()); if (url.origin !== origin || !['GET', 'HEAD'].includes(request.method())) { const item = { origin: url.origin, path: url.pathname, method: request.method() }; evidence.blocked.push(item); if (production(url)) evidence.productionAttempts.push(item); return route.abort(); } return route.continue(); });
    const page = await context.newPage();
    for (const route of routes) {
      evidence.checks++;
      try {
        const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
        assert.equal(response?.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(100);
        const result = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, lang: document.documentElement.lang, dir: document.documentElement.dir, h1: document.querySelectorAll('main h1').length }));
        assert.equal(result.width, width);
        assert.ok(result.scrollWidth <= width + 1, `overflow ${result.scrollWidth}`);
        assert.equal(result.h1, 1, 'one main H1');
        if (route === '/ar/library/aba-school-readiness-guide') { assert.equal(result.lang, 'ar'); assert.equal(result.dir, 'rtl'); }
        if (selected.has(route) && (width === 320 || width === 1440)) { const file = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${width}.png`; await page.screenshot({ path: path.join(output, file), fullPage: true }); evidence.screenshots.push({ route, width, file }); }
      } catch (error) { evidence.failures.push({ route, width, error: String(error.message) }); }
    }
    await context.close();
  }
  evidence.status = evidence.failures.length || evidence.productionAttempts.length ? 'failed' : 'passed';
} catch (error) { evidence.error = String(error.message); }
finally {
  await browser?.close();
  if (preview && preview.exitCode === null) { preview.kill('SIGTERM'); await Promise.race([new Promise((resolve) => preview.once('exit', resolve)), delay(3000)]); if (preview.exitCode === null) preview.kill('SIGKILL'); }
  evidence.finishedAt = new Date().toISOString(); await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(evidence, null, 2) + '\n'); console.log(JSON.stringify({ ...evidence, output }, null, 2)); if (evidence.status !== 'passed') process.exitCode = 1;
}
