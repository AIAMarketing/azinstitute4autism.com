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
const output = await fs.mkdtemp('/tmp/aia-early-browser-');
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

try {
 const origin=await serve(path.join(root,'dist'));
 const reference=process.env.EARLY_REFERENCE_DIR ? await serve(process.env.EARLY_REFERENCE_DIR) : null;
 const allowed=new Set([origin,reference].filter(Boolean));
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE});
 evidence.browser=browser.version();
 for (const javaScriptEnabled of [true,false]) {
  const ctx=await browser.newContext({javaScriptEnabled,serviceWorkers:'block',deviceScaleFactor:1});
  await ctx.routeWebSocket('**/*',s=>s.close());
  await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(!allowed.has(u.origin)||!['GET','HEAD'].includes(r.request().method())){evidence.blocked.push({origin:u.origin,path:u.pathname,method:r.request().method()});return r.abort();}return r.continue();});
  const page=await ctx.newPage();page.on('pageerror',e=>evidence.errors.push(e.message));
  for(const width of javaScriptEnabled?[320,390,768,1440]:[390,1440]) {
   await page.setViewportSize({width,height:900});
   let source;
   async function design(){return page.evaluate(()=>({headings:[...document.querySelectorAll('.qr-landing h1,.qr-landing h2,.qr-landing h3')].map(e=>e.textContent),heroWidth:document.querySelector('.qr-hero').getBoundingClientRect().width,font:getComputedStyle(document.querySelector('h1')).font,images:[...document.images].map(i=>({alt:i.alt,loaded:i.complete&&i.naturalWidth>0})),overflow:document.documentElement.scrollWidth>innerWidth}));}
   async function visit(url){await page.goto(url,{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});}
   async function shot(label){const file=`${label}-${width}-${javaScriptEnabled?'js':'nojs'}.png`;const data=await page.screenshot({path:path.join(output,file),fullPage:true});evidence.screenshots.push({file,sha256:createHash('sha256').update(data).digest('hex')});}
   if(reference&&javaScriptEnabled){await visit(reference+'/');source=await design();await shot('source');}
   await visit(origin+'/lp/early-intervention');const actual=await design();
   assert.equal(actual.overflow,false);assert.ok(actual.images.every(i=>i.loaded));
   if(source){assert.deepEqual(actual.headings,source.headings);assert.equal(actual.heroWidth,source.heroWidth);assert.equal(actual.font,source.font);}
   assert.equal(await page.locator('form').count(),0);
   assert.equal(await page.locator('#consultation input:enabled').count(),0);
   assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,nofollow');
   await page.locator('.qr-hero-actions a[href="#consultation"]').click();
   assert.equal(new URL(page.url()).hash,'#consultation');
   await page.evaluate(()=>scrollTo(0,0));await shot('import');
   evidence.checks.push({width,javaScriptEnabled,sourceCompared:!!source,status:'passed',...actual});
  }
  await ctx.close();
 }
 assert.deepEqual(evidence.blocked,[]);assert.deepEqual(evidence.errors,[]);evidence.status='passed';
} catch(error){evidence.status='failed';evidence.error=String(error);process.exitCode=1;}
finally {if(browser)await browser.close();for(const s of servers)await new Promise(r=>s.close(r));await fs.writeFile(path.join(output,'evidence.json'),JSON.stringify(evidence,null,2));console.log(output,evidence.status,evidence.error);}
