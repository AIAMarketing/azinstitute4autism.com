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
  await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
  await page.waitForTimeout(100);
  await page.screenshot({path: path.join(output, file), fullPage: true});
  evidence.screenshots.push(file);
}
const geometry = page => page.evaluate(() => ({width: innerWidth, documentWidth: document.documentElement.scrollWidth, dpr: devicePixelRatio, visualScale: visualViewport.scale}));

const routesOpened=new Set();
const open=async(p,r)=>{await go(p,r);routesOpened.add(r.split('#')[0]);};
try {
for(const width of [320,390,768,1440]) {
 const c=await context(width),p=await c.newPage();p.on('pageerror',e=>evidence.runtimeErrors.push(e.message));
 for(const route of ['/','/es']) await test(`home ${route} ${width}`,async()=>{
  await open(p,route);const h=p.locator('.hsa-fsa-section');assert.equal(await h.count(),1);
  assert.match(await h.locator('img').getAttribute('src'),route==='/es'?/accepted-es.png$/:/accepted.png$/);
  if(route==='/es'){assert.match(await h.locator('img').getAttribute('alt'),/APROBADO/);const siblings=await h.evaluate(e=>[e.previousElementSibling.textContent,e.nextElementSibling.textContent]);assert.match(siblings[0],/ESA/);assert.match(siblings[1],/Necesita ayuda/);}
  assert.equal((await geometry(p)).documentWidth,width);await capture(p,`home-${route==='/'?'en':'es'}-${width}.png`);return geometry(p);
 });
 await test(`privacy fragment ${width}`,async()=>{
  await open(p,'/es/privacy-policy#información-que-recopilamos');const t=p.locator('#información-que-recopilamos');assert.equal(await p.locator('.source-page h2').count(),11);
  assert.equal(await t.evaluate(e=>e.nextElementSibling.nextElementSibling.children.length),4);assert.ok(await t.evaluate(e=>e.getBoundingClientRect().top>=-1&&e.getBoundingClientRect().bottom<innerHeight));assert.equal((await geometry(p)).documentWidth,width);await capture(p,`privacy-${width}.png`);return {h2:11,fragment:true,position:await t.evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom}))};
 });
 await test(`carousel controls keyboard ${width}`,async()=>{
  await open(p,'/tour');await p.locator('[data-image-carousel][data-enhanced]').waitFor();const next=p.locator('[data-next]'),prev=p.locator('[data-previous]');
  const state=async i=>{assert.equal(await p.locator('[data-slide]:visible').count(),1);assert.equal(await p.locator('[data-thumbnail][aria-pressed=true]').count(),1);assert.ok(await p.locator('[data-slide]').nth(i).isVisible());assert.equal(await p.locator('[data-thumbnail]').nth(i).getAttribute('aria-pressed'),'true');};
  await state(0);await prev.click();await state(8);await next.click();await state(0);
  await next.focus();await p.keyboard.press('Enter');await state(1);assert.ok(await next.evaluate(e=>e===document.activeElement));
  await p.keyboard.press('Space');await state(2);await p.keyboard.press('ArrowRight');await state(3);await p.keyboard.press('ArrowLeft');await state(2);
  await p.locator('[data-thumbnail]').nth(8).focus();await p.keyboard.press('Space');await state(8);assert.match(await p.locator('[data-carousel-status]').textContent(),/Photo 9 of 9: Art Gallery/);
  const focus=await p.locator('[data-thumbnail]').nth(8).evaluate(e=>({outline:getComputedStyle(e).outlineWidth,color:getComputedStyle(e).outlineColor}));assert.equal(focus.outline,'3px');assert.ok(await p.locator('[data-carousel-status]').evaluate(e=>e.getBoundingClientRect().width<=1));
  await prev.focus();await p.keyboard.press('Tab');assert.ok(await next.evaluate(e=>e===document.activeElement));await p.keyboard.press('Shift+Tab');assert.ok(await prev.evaluate(e=>e===document.activeElement));await p.keyboard.press('Tab');await p.keyboard.press('Tab');assert.ok(await p.locator('[data-thumbnail]').first().evaluate(e=>e===document.activeElement));await p.keyboard.press('Enter');await state(0);
  assert.equal((await geometry(p)).documentWidth,width);const image=await p.locator('[data-slide]:visible img').evaluate(e=>({width:e.clientWidth,height:e.clientHeight,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight}));assert.ok(Math.abs(image.width/image.height-image.naturalWidth/image.naturalHeight)<.02);
  await capture(p,`tour-${width}.png`);
  await p.getByRole('link',{name:'Schedule a Tour Today',exact:true}).click();
  await p.waitForURL('**/client-consultation');
  assert.equal(new URL(p.url()).pathname,'/client-consultation');
  routesOpened.add('/client-consultation');
  return {focus,image,wrap:true,caption:true,keyboard:'Tab Shift+Tab Enter Space ArrowLeft ArrowRight'};
 });await c.close();
 const n=await browser.newContext({viewport:{width,height:844},javaScriptEnabled:false,serviceWorkers:'block',acceptDownloads:false});await guard(n);
 await test(`Tour no-JS ${width}`,async()=>{const p=await n.newPage();await open(p,'/tour');assert.equal(await p.locator('[data-slide]:visible').count(),9);assert.equal(await p.locator('[data-carousel-controls]:visible').count(),0);assert.equal((await geometry(p)).documentWidth,width);await capture(p,`tour-nojs-${width}.png`);return {photos:9,controlsHidden:true};});await n.close();
}
}finally{await browser.close();}
evidence.routesOpened=[...routesOpened];
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
      for (const route of ['/tour','/es/privacy-policy']) {
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
