/** Guarded loopback-only campaign verification. Optional source build for visual comparison.
 * PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node tools/campaign-browser.mjs
 * CAMPAIGN_REFERENCE_DIST=/tmp/reference/dist CAMPAIGN_BASELINE_DIST=/tmp/baseline ...
 * Screenshots and evidence remain outside the repository. No submission tests.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const output = await fs.mkdtemp('/tmp/aia-campaign-browser-');
const evidence = { date: new Date().toISOString(), output, status: 'pending', error: '', browser: '', checks: [], blocked: [], screenshots: [], errors: [] };
const servers = [];
let browser;
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json' };
async function serve(directory) {
 const base=path.resolve(directory);
 const server=http.createServer(async (req,res)=>{
  try {
   assert.ok(['GET','HEAD'].includes(req.method));
   let file=path.resolve(base,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
   assert.ok(file.startsWith(base+'/') || file===base);
   if((await fs.stat(file)).isDirectory()) file=path.join(file,'index.html');
   res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');res.end(await fs.readFile(file));
  } catch {res.statusCode=404;res.end('Not found');}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));servers.push(server);
 return `http://127.0.0.1:${server.address().port}`;
}
const routes=['/lp/aba-therapy','/lp/aba-insurance','/lp/aba-ahcccs','/lp/aba-private-pay'];
try {
 const origin=await serve(path.join(root,'dist'));
 const reference=process.env.CAMPAIGN_REFERENCE_DIST ? await serve(process.env.CAMPAIGN_REFERENCE_DIST) : null;
 const baseline=process.env.CAMPAIGN_BASELINE_DIST ? await serve(process.env.CAMPAIGN_BASELINE_DIST) : null;
 const allowed=new Set([origin,reference,baseline].filter(Boolean));
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE ? {executablePath:process.env.CHROMIUM_EXECUTABLE}: {})});
 evidence.browser=browser.version();
 async function context(javaScriptEnabled=true) {
  const ctx=await browser.newContext({javaScriptEnabled,serviceWorkers:'block',acceptDownloads:false,deviceScaleFactor:1});
  await ctx.routeWebSocket('**/*',socket=>socket.close());
  await ctx.route('**/*',route=>{
   const r=route.request(),u=new URL(r.url());
   if(!allowed.has(u.origin) || !['GET','HEAD'].includes(r.method())) {evidence.blocked.push({origin:u.origin,path:u.pathname,method:r.method()});return route.abort();}
   return route.continue();
  });
  return ctx;
 }
 const ctx=await context();const page=await ctx.newPage();
 page.on('pageerror',err=>evidence.errors.push(err.message));
 async function visit(base,route,width) {
  await page.setViewportSize({width,height:900});
  const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.evaluate(async()=>{
   await document.fonts.ready;
   document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager');
   await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
  });
 }
 async function capture(label,route,width) {
  const filename=`${label}-${route.replaceAll('/','_')}-${width}.png`;
  const buffer=await page.screenshot({path:path.join(output,filename),fullPage:true});
  evidence.screenshots.push({file:filename,sha256:createHash('sha256').update(buffer).digest('hex')});
 }
 async function design() {return page.evaluate(()=>({
  title:document.title,h1:document.querySelector('h1').textContent,
  sections:[...document.querySelectorAll('main > section:not(.consultation)')].map(el=>{
   const r=el.getBoundingClientRect(),s=getComputedStyle(el);
   return {text:el.innerText.replace(/\s+/g,' ').trim(),x:r.x,y:r.y,width:r.width,height:r.height,background:s.backgroundColor};
  }),
  headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,
  bodyFont:getComputedStyle(document.body).fontFamily,
  overflow:document.documentElement.scrollWidth>innerWidth,
  images:[...document.images].map(i=>({alt:i.alt,width:i.naturalWidth,loaded:i.complete&&i.naturalWidth>0}))
 }));}
 for(const width of [320,390,768,1440]) for(const route of routes) {
  let source;
  if(reference){await visit(reference,route,width);source=await design();await capture('source',route,width);}
  await visit(origin,route,width);const result=await design();
  assert.equal(result.overflow,false,route+' overflow');assert.ok(result.images.every(i=>i.loaded));
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,nofollow');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.azinstitute4autism.com'+route);
  assert.equal(await page.locator('form').count(),0);assert.equal(await page.locator('#lead-form [name]:enabled').count(),0);
  assert.equal(await page.locator('#lead-form button').isDisabled(),true);
  if(source) {
   assert.deepEqual(result.sections,source.sections,'Source content, section geometry and backgrounds');
   assert.equal(result.title,source.title);assert.equal(result.h1,source.h1);
   assert.equal(result.headingFont,source.headingFont);assert.equal(result.bodyFont,source.bodyFont);
   assert.deepEqual(result.images,source.images);
  }
  await capture('integrated',route,width);
  const faq=page.locator('.faq details').first();await faq.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await faq.getAttribute('open'),'');
  const focus=await faq.locator('summary').evaluate(el=>getComputedStyle(el).outlineStyle);assert.notEqual(focus,'none');
  await faq.locator('summary').press('Enter');
  await page.locator('.hero__actions a').first().click();assert.equal(new URL(page.url()).hash,'#consultation');
  evidence.checks.push({route,width,sourceParity:!!source,overflow:false,assets:true,faqKeyboard:true,cta:true,forms:'off'});
 }
 // Source payer links are retained; arbitrary attribution parameters are not forwarded.
 await visit(origin,routes[0]+'?utm_term=synthetic&gclid=synthetic',390);
 for(const a of await page.locator('[data-payment-intent]').all())assert.ok(!(await a.getAttribute('href')).includes('?'));
 const nojs=await context(false);const np=await nojs.newPage();
 for(const route of routes){await np.goto(origin+route);assert.ok(await np.locator('h1').isVisible());assert.equal(await np.locator('form').count(),0);assert.ok(await np.locator('#campaign-form-status').isVisible());await np.locator('.faq summary').first().click();assert.equal(await np.locator('.faq details').first().getAttribute('open'),'');}
 evidence.noJavaScriptRoutes=routes;await nojs.close();
 // Existing site's style sheets and geometry must not inherit the campaign CSS.
 if(baseline) for(const route of ['/','/es','/library','/aba-therapy']) for(const width of [390,1440]) {
  const snapshots=[];
  for(const base of [baseline,origin]) {
   await visit(base,route,width);
   snapshots.push(await page.evaluate(()=>({title:document.title,css:[...document.querySelectorAll('link[rel="stylesheet"]')].map(l=>new URL(l.href).pathname),font:getComputedStyle(document.body).fontFamily,h1:getComputedStyle(document.querySelector('h1')).fontSize,width:document.documentElement.scrollWidth})));
  }
  assert.deepEqual(snapshots[0],snapshots[1]);evidence.checks.push({route,width,mainSiteUnchanged:true});
 }
 assert.deepEqual(evidence.blocked,[],'Unexpected request attempt');assert.deepEqual(evidence.errors,[]);
 evidence.status='passed';await ctx.close();
} catch(error){evidence.status='failed';evidence.error=String(error.stack);process.exitCode=1;}
finally{await browser?.close();await Promise.all(servers.map(s=>new Promise(resolve=>s.close(resolve))));await fs.writeFile(path.join(output,'evidence.json'),JSON.stringify(evidence,null,2)+'\n');console.log(JSON.stringify({status:evidence.status,error:evidence.error,checks:evidence.checks.length,screenshots:evidence.screenshots.length,output},null,2));}
