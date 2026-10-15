/** Bounded local follow-up. Existing Playwright only; artifacts/profile stay in /tmp. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright');
const output = path.resolve(process.argv[2] || '');
if (!output.startsWith('/tmp/')) throw Error('Provide a fresh /tmp evidence directory');
await fs.mkdir(output);
const origin = 'http://127.0.0.1:4321';
const evidence = {startedAt: new Date().toISOString(), checks: [], blocked: [], productionAttempt: false, screenshots: [], runtimeErrors: []};
const browser = await chromium.launch({headless: true});
evidence.browser = browser.version();
async function guard(context) {
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (url.origin !== origin || !['GET', 'HEAD'].includes(request.method())) {
      evidence.blocked.push({origin: url.origin, path: url.pathname, method: request.method()});
      if (url.hostname === 'api.azinstitute4autism.com') evidence.productionAttempt = true;
      return route.abort();
    }
    return route.continue();
  });
  await context.routeWebSocket('**/*', socket => socket.close());
}
async function context(width = 1440) {
  const c = await browser.newContext({viewport: {width, height: width === 1440 ? 900 : 844}, deviceScaleFactor: 1, serviceWorkers: 'block', acceptDownloads: false});
  await guard(c); return c;
}
async function go(page, route) {
  await page.goto(origin + route, {waitUntil: 'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  assert.equal(evidence.productionAttempt, false, 'Prevented production API attempt; stop');
}
async function test(name, run) {
  console.log(name);
  try { evidence.checks.push({name, status: 'pass', detail: await run()}); }
  catch (error) { evidence.checks.push({name, status: 'fail', error: error.message}); }
  if (evidence.productionAttempt) throw Error('Prevented production API attempt; stop');
}
async function capture(page, file) {
  const missing = await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await Promise.race([
      Promise.all([...document.images].map(img => img.decode().catch(() => {}))),
      new Promise(resolve => setTimeout(resolve, 3000)),
    ]);
    return [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src'));
  });
  assert.deepEqual(missing, [], 'Capture has unloaded images');
  await page.screenshot({path: path.join(output, file), fullPage: true});
  evidence.screenshots.push(file);
}
const geometry = page => page.evaluate(() => ({width: innerWidth, documentWidth: document.documentElement.scrollWidth, dpr: devicePixelRatio, visualScale: visualViewport.scale}));
const headingStyles = page => page.locator('h2.heading-size-h3').evaluateAll(elements => elements.map(e => ({tag: e.tagName, id: e.id, text: e.textContent.trim(), font: getComputedStyle(e).fontSize, line: getComputedStyle(e).lineHeight, marginTop: getComputedStyle(e).marginTop, marginBottom: getComputedStyle(e).marginBottom, rect: {width: e.getBoundingClientRect().width, height: e.getBoundingClientRect().height}})));
if (process.env.PHASE8_ZOOM_ONLY !== '1') {
try {
  for (const width of [320, 390, 768, 1440]) {
    const c = await context(width), p = await c.newPage();
    for (const route of ['/', '/es']) await test(`home reflow ${route} ${width}`, async () => {
      await go(p, route); const g = await geometry(p); assert.equal(g.width, g.documentWidth);
      assert.equal(await p.locator('.director-layout').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length), width <= 760 ? 1 : 2);
      return g;
    });
    await c.close();
  }
  for (const width of [1440, 390]) {
    const c = await context(width), p = await c.newPage();
    p.on('pageerror', () => evidence.runtimeErrors.push({route: new URL(p.url()).pathname, type: 'pageerror'}));
    for (const route of ['/ar/library/aba-school-readiness-guide', '/ar/library', '/ar/library/author/rula-diab']) await test(`Arabic chrome ${route} ${width}`, async () => {
      await go(p, route);
      assert.equal(await p.locator('html').getAttribute('dir'), 'rtl');
      assert.ok(await p.getByRole('button', {name: 'الإعجاب بهذا المقال', exact: true}).count());
      assert.equal(await p.getByRole('button', {name: 'Like this article', exact: true}).count(), 0);
      if (await p.locator('.blog-post-footer').count()) {
        assert.equal(await p.locator('.related-posts h2').innerText(), 'مقالات ذات صلة');
        assert.equal(await p.locator('.post-pagination').getAttribute('aria-label'), 'التنقل بين المقالات');
      }
      const g = await geometry(p); assert.equal(g.width, g.documentWidth);
      const labels = await p.locator('[data-like],.post-pagination,.related-post__image-link').evaluateAll(es => es.map(e => e.getAttribute('aria-label')));
      await capture(p, `${width}-${route.replaceAll('/', '_')}.png`);
      return {labels, ...g};
    });
    for (const route of ['/library/aba-therapy-dtt-net-guide', '/schedule-consultation']) await test(`semantic heading appearance ${route} ${width}`, async () => {
      await go(p, route); const current = await headingStyles(p);
      assert.equal(current.length, route.includes('dtt') ? 3 : 1);
      // Optional before evidence enables exact computed-style/geometry comparison.
      if (process.env.PHASE8_BEFORE) {
        const before = JSON.parse(await fs.readFile(process.env.PHASE8_BEFORE, 'utf8')).find(r => r.route === route && r.width === width);
        for (const h of current) {
          const old = before.headings.find(b => b.id === h.id); assert.ok(old);
          assert.deepEqual({...h, tag: old.tag}, old);
        }
      }
      await capture(p, `${width}-${route.replaceAll('/', '_')}.png`); return current;
    });
    await test(`contact links and keyboard focus ${width}`, async () => {
      await go(p, '/es/contact'); const links = await p.locator('.contact-page__copy a:not(.content-button),.contact-form-card__note a').evaluateAll(es => es.map(e => ({color: getComputedStyle(e).color, underline: getComputedStyle(e).textDecorationLine})));
      assert.ok(links.every(l => l.color === 'rgb(37, 64, 128)' && l.underline === 'underline'));
      await p.keyboard.press('Tab');
      const focus = await p.locator('.skip-link').evaluate(e => ({active: document.activeElement === e, outline: getComputedStyle(e).outline, top: e.getBoundingClientRect().top, left: e.getBoundingClientRect().left}));
      assert.ok(focus.active && focus.top >= 0 && focus.left >= 0); assert.match(focus.outline, /3px/);
      await p.locator('.skip-link').screenshot({path: path.join(output, `skip-focus-${width}.png`)});
      return {links, focus};
    });
    await test(`bounded contrast states ${width}`, async () => {
      await go(p, '/library');
      const readMore = p.locator('.text-link').first();
      const normal = await readMore.evaluate(e => ({color: getComputedStyle(e).color, decoration: getComputedStyle(e).textDecorationLine}));
      assert.equal(normal.color, 'rgb(37, 64, 128)'); assert.equal(normal.decoration, 'underline');
      await readMore.hover();
      assert.equal(await readMore.evaluate(e => getComputedStyle(e).color), 'rgb(14, 17, 51)');
      const author = p.locator('.blog-card .author-byline').first(); await author.focus();
      const focus = await author.evaluate(e => ({outline: getComputedStyle(e).outline, offset: getComputedStyle(e).outlineOffset, rect: {left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right}, parent: {left: e.closest('.card-body').getBoundingClientRect().left, right: e.closest('.card-body').getBoundingClientRect().right}}));
      assert.match(focus.outline, /rgb\(37, 64, 128\) solid 3px/);
      assert.ok(focus.rect.left - 6 > focus.parent.left && focus.rect.right + 6 < focus.parent.right);
      const eyebrow = await p.locator('.eyebrow').first().evaluate(e => getComputedStyle(e).color);
      assert.equal(eyebrow, 'rgb(37, 64, 128)');
      await p.locator('.lang-switcher summary').click();
      const current = p.locator('.lang-switcher__menu a[aria-current="page"]');
      assert.equal(await current.evaluate(e => getComputedStyle(e).color), 'rgb(37, 64, 128)');
      await p.keyboard.press('Escape');
      await go(p, '/ar/library/aba-school-readiness-guide');
      const related = p.locator('.related-post h3 a').first(); await related.hover();
      assert.equal(await related.evaluate(e => getComputedStyle(e).color), 'rgb(14, 17, 51)');
      return {normal, authorFocus: focus, eyebrow, hoverColor: 'rgb(14, 17, 51)'};
    });
    await test(`Arabic diagrams ${width}`, async () => {
      await go(p, '/ar/library/aba-school-readiness-guide'); const regions = p.locator('.article-diagram-scroll'); assert.equal(await regions.count(), 3);
      const rows = [];
      for (let i = 0; i < 3; i++) {
        const region = regions.nth(i); await region.focus();
        const initial = await region.evaluate(e => ({name: e.getAttribute('aria-label'), role: e.getAttribute('role'), width: e.clientWidth, contentWidth: e.scrollWidth, scroll: e.scrollLeft, outline: getComputedStyle(e).outline, imageReady: e.querySelector('img').complete && e.querySelector('img').naturalWidth > 0}));
        for (let j = 0; j < 6; j++) await p.keyboard.press('ArrowLeft');
        await p.waitForTimeout(250); const end = await region.evaluate(e => e.scrollLeft);
        assert.ok(initial.name && initial.imageReady); assert.match(initial.outline, /3px/);
        if (width === 390) assert.notEqual(initial.scroll, end);
        await region.screenshot({path: path.join(output, `diagram-${width}-${i}.png`)});
        rows.push({...initial, end});
      }
      const g = await geometry(p); assert.equal(g.width, g.documentWidth); return rows;
    });
    await c.close();
  }
  // Compare native browser focus boundaries with a minimal modal control fixture.
  for (const width of [1440, 390]) for (const close of ['Escape', 'button']) {
    await test(`native service dialog ${width} ${close}`, async () => {
      const c = await context(width), p = await c.newPage();
      try {
        await go(p, '/aba-therapy'); const brand = p.locator('.brand'); await brand.focus();
        const dialog = p.locator('[data-service-inquiry-drawer]');
        await p.waitForFunction(() => document.querySelector('[data-service-inquiry-drawer]')?.open, {}, {timeout: 14000});
        await p.waitForTimeout(600);
        const entry = await p.evaluate(() => ({tag: document.activeElement.tagName, inside: !!document.activeElement.closest('dialog')})); assert.ok(entry.inside);
        const sequence = [];
        for (const key of ['Tab', 'Shift+Tab']) for (let i = 0; i < 20; i++) {
          await p.keyboard.press(key);
          const step = await dialog.evaluate(e => ({tag: document.activeElement.tagName, id: document.activeElement.id, inside: e.contains(document.activeElement), documentFocus: document.hasFocus()}));
          assert.ok(step.inside || step.tag === 'BODY', 'Background control received focus'); sequence.push({key, ...step});
        }
        await brand.evaluate(e => e.focus());
        assert.equal(await brand.evaluate(e => e === document.activeElement), false, 'Modal background became focusable');
        if (close === 'Escape') await p.keyboard.press('Escape'); else {await dialog.locator('[data-service-inquiry-close]').focus(); await p.keyboard.press('Enter');}
        await p.waitForTimeout(600); assert.equal(await dialog.evaluate(e => e.open), false); assert.equal(await brand.evaluate(e => e === document.activeElement), true);
        return {entry, sequence, restored: true, backgroundInert: true};
      } finally {await c.close();}
    });
  }
  await test('minimal native modal boundary comparison', async () => {
    const c = await context(), p = await c.newPage();
    try {
      await c.route(origin + '/__phase8_native_modal', r => r.fulfill({contentType: 'text/html', body: '<!doctype html><html lang="en"><button id="outside">Outside</button><dialog><button>First</button><input aria-label="Fixture"><button>Last</button></dialog><script>document.querySelector("dialog").showModal()</script></html>'}));
      await go(p, '/__phase8_native_modal'); const sequence = [];
      for (const key of ['Tab', 'Shift+Tab']) for (let i = 0; i < 8; i++) {await p.keyboard.press(key);sequence.push({key,...await p.evaluate(() => ({tag: document.activeElement.tagName, inside: !!document.activeElement.closest('dialog'), documentFocus: document.hasFocus()}))});}
      assert.ok(sequence.every(s => s.inside || s.tag === 'BODY')); return sequence;
    } finally {await c.close();}
  });
} catch (error) {
  evidence.failure = error.message;
} finally {await browser.close();}
} else await browser.close();

// Native tab zoom, not CSS zoom, pinch emulation or a viewport-only approximation.
// This temporary extension has no network code. Website service workers remain blocked.
if (typeof chromium.launchPersistentContext === 'function' && !evidence.productionAttempt) {
  await test('native browser zoom 200%', async () => {
    const extension = path.join(output, 'zoom-extension'); await fs.mkdir(extension);
    await fs.writeFile(path.join(extension, 'manifest.json'), JSON.stringify({manifest_version: 3, name: 'Local Phase 8 Zoom Probe', version: '1.0', permissions: ['tabs'], background: {service_worker: 'worker.js'}}));
    await fs.writeFile(path.join(extension, 'worker.js'), 'chrome.runtime.onInstalled.addListener(() => {});');
    const c = await chromium.launchPersistentContext(path.join(output, 'temporary-browser-profile'), {headless: true, viewport: null, serviceWorkers: 'block', acceptDownloads: false, args: ['--window-size=1440,1000', `--disable-extensions-except=${extension}`, `--load-extension=${extension}`]});
    try {
      await guard(c); const worker = c.serviceWorkers()[0] || await c.waitForEvent('serviceworker', {timeout: 10000}); const p = await c.newPage(); const rows = [];
      for (const route of ['/', '/es', '/es/contact', '/es/client-consultation', '/ar/library/aba-school-readiness-guide', '/library', '/schedule-consultation']) {
        await go(p, route);
        const factor = await worker.evaluate(async () => {const tab = (await chrome.tabs.query({})).find(t => t.url?.startsWith('http://127.0.0.1:4321')); await chrome.tabs.setZoom(tab.id, 2); return chrome.tabs.getZoom(tab.id);});
        await p.waitForTimeout(200); const g = await geometry(p); assert.equal(factor, 2); assert.equal(g.dpr, 2); assert.equal(g.width, 720); assert.equal(g.documentWidth, 720);
        // Playwright fullPage clips to CSS dimensions at native tab zoom. Capture
        // the actual viewport through CDP instead, with documented overlap.
        await p.evaluate(async () => {
          for (const img of document.images) img.loading = 'eager';
          await Promise.race([Promise.all([...document.images].map(img => img.decode().catch(() => {}))), new Promise(r => setTimeout(r, 3000))]);
        });
        const client = await c.newCDPSession(p), frames = [];
        const dimensions = await p.evaluate(() => ({height: innerHeight, total: document.documentElement.scrollHeight}));
        const step = Math.floor(dimensions.height * .8);
        for (let top = 0, index = 0; top < dimensions.total; top += step, index++) {
          await p.evaluate(top => scrollTo({top, behavior: 'instant'}), top);
          await p.waitForTimeout(80);
          const file = `zoom200-${route.replaceAll('/', '_')}-${index}.png`;
          const shot = await client.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false});
          await fs.writeFile(path.join(output, file), Buffer.from(shot.data, 'base64'));
          frames.push({file, scrollY: await p.evaluate(() => scrollY)});
          evidence.screenshots.push(file);
          if (frames.at(-1).scrollY + dimensions.height >= dimensions.total) break;
        }
        await client.detach(); rows.push({route, zoom: factor, ...g, ...dimensions, overlap: '20%', frames});
      }
      return rows;
    } finally {await c.close();}
  });
} else evidence.checks.push({name: 'native browser zoom 200%', status: 'not-run', reason: 'No persistent-context API on supplied browser module'});
evidence.finishedAt = new Date().toISOString();
await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify({checks: evidence.checks.length, failures: evidence.checks.filter(c => c.status !== 'pass'), productionAttempt: evidence.productionAttempt}, null, 2));
if (evidence.failure || evidence.productionAttempt || evidence.checks.some(c => c.status === 'fail')) process.exitCode = 1;
