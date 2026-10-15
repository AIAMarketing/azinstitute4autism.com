/** Optional HOST-TERMINAL runner. Requires an existing Playwright installation/browser.
 * No dependency installation, live-source navigation or production requests.
 * First run audit-phase8.mjs against final staging output to obtain the route manifest.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const [inventoryFile, outputDirectory] = process.argv.slice(2);
if (!inventoryFile || !outputDirectory) throw Error('Usage: node tools/phase8-browser.mjs /tmp/static.json /tmp/new-evidence-dir');
const inventory = JSON.parse(await fs.readFile(inventoryFile, 'utf8'));
if (inventory.failures || inventory.arabicHomePublished || inventory.routeCount !== 122) throw Error('Resolve static inventory failures first.');
const output = path.resolve(outputDirectory);
if (!output.startsWith('/tmp/')) throw Error('Keep browser artifacts in a new /tmp directory, outside the repository.');
await fs.mkdir(output); // Refuse to overwrite a prior evidence directory.
const moduleName = process.env.PLAYWRIGHT_MODULE ? pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright';
const {chromium} = await import(moduleName); // No npx/install and no project dependency change.
const manual = process.env.PHASE8_MANUAL === '1';
const browser = await chromium.launch({headless: !manual});
const origin = 'http://127.0.0.1:4321';
const evidence = {startedAt: new Date().toISOString(), browser: browser.version(), origin, dpr: 1, screenshots: [], smoke: [], keyboardObservations: [], noJS: [], blocked: [], runtimeErrors: [], consoleErrors: [], productionAttempt: false, reviewerAcceptance: 'Pending'};
const candidates = ['/', '/es', '/services', '/es/services', '/aba-therapy', '/es/aba-therapy', '/autism-evaluations', '/es/autism-evaluations', '/learner-social-club', '/es/learner-social-club', '/aba-therapy-intake-process', '/es/aba-therapy-intake-process', '/contact', '/es/contact', '/client-consultation', '/es/client-consultation', '/referrals', '/privacy-policy', '/es/privacy-policy', '/team', '/about', '/faqs', '/library', '/es/library', '/ar/library', '/library/page/6', '/library/author/rula-diab/page/6', '/search', '/library/aba-school-readiness-arizona', '/library/aba-school-readiness-guide', '/library/autism-fall-break-routine-tips-halloween-thanksgiving', '/library/play-leisure-skills', '/library/picky-eating-autism-parent-guide', '/es/library/aba-school-readiness-arizona', '/es/library/autism-evaluation-what-to-expect', '/es/library/positive-reinforcement-techniques', '/es/library/autism-self-advocacy-skills-aba', '/ar/library/aba-school-readiness-guide', '/ar/library/first-then-cards-autism-transitions', '/ar/library/positive-reinforcement-techniques', '/library/author/rula-diab', '/es/library/author/rula-diab', '/ar/library/author/rula-diab', '/client-forms', '/employee-portal', '/careers', '/insurance', '/donate-autism-giveback', '/tour', '/schedule-consultation'];
const routes = new Set(inventory.rows.map(r=>r.route));
if (candidates.some(r=>!routes.has(r))) { await browser.close(); throw Error('Representative route is absent from actual manifest.'); }
const safePath = url => {const u=new URL(url); return {origin:u.origin,path:u.pathname};};
async function context(javaScriptEnabled=true, width=1440) {
  const c=await browser.newContext({javaScriptEnabled, viewport:{width,height:width===390?844:900},deviceScaleFactor:1, serviceWorkers:'block',acceptDownloads:false});
  await c.route('**/*',async route=>{
    const request=route.request(), u=new URL(request.url());
    if(u.origin!==origin || !['GET','HEAD'].includes(request.method())) {
      evidence.blocked.push({...safePath(request.url()),method:request.method()});
      if(u.hostname==='api.azinstitute4autism.com') evidence.productionAttempt=true;
      return route.abort();
    }
    return route.continue();
  });
  // Block WebSockets as well; require a Playwright version supporting this API.
  if(typeof c.routeWebSocket!=='function'){await c.close();throw Error('Existing Playwright must support routeWebSocket for fail-closed test isolation.');}
  await c.routeWebSocket('**/*',ws=>ws.close());
  return c;
}
async function inspect(page, route) {
  await page.goto(origin+route,{waitUntil:'networkidle',timeout:15000});
  await page.evaluate(()=>document.fonts.ready);
  if(evidence.productionAttempt) throw Error('Production API attempt prevented: stop and review P9-04.');
  return page.evaluate(()=>({url:location.pathname,title:document.title,h1:document.querySelector('main h1')?.textContent?.trim(),lang:document.documentElement.lang,dir:document.documentElement.dir,robots:document.querySelector('meta[name=robots]')?.getAttribute('content'),pageOverflow:document.documentElement.scrollWidth>innerWidth,clippedCandidates:[...document.querySelectorAll('main img,main table,header,footer')].filter(e=>{const r=e.getBoundingClientRect();return r.left<-.5||r.right>innerWidth+.5;}).map(e=>e.tagName),imagesMissing:[...document.images].filter(e=>e.loading!=='lazy'&&(!e.complete||!e.naturalWidth)).length}));
}
try {
  const probe=await context();const page=await probe.newPage();
  const first=await inspect(page,'/es/privacy-policy');
  if(!first.h1?.includes('Política')||first.robots!=='noindex,nofollow')throw Error('Actual staging-page probe failed.');
  await page.screenshot({path:path.join(output,'transport-probe.png'),fullPage:true});
  await inspect(page,'/'); // Subsequent navigation must work before suite starts.
  await probe.close();
  for (const width of [1440,390]) {
    const c=await context(true,width),p=await c.newPage();
    // Store only error category, not arbitrary console payloads/URLs or request bodies.
    p.on('pageerror',()=>evidence.runtimeErrors.push({route:safePath(p.url()).path,type:'pageerror'}));
    p.on('console',message=>{if(message.type()==='error') evidence.consoleErrors.push({route:safePath(p.url()).path,type:message.text().includes('net::ERR_FAILED')?'blocked-resource-error':'other-console-error'});});
    for(const route of width===1440?[...routes]:candidates){
      console.log(`${width}px ${route}`);
      const result=await inspect(p,route);Object.assign(result,{route,width});evidence.smoke.push(result);
      if(candidates.includes(route)){
        // Walk the full document to trigger lazy images; auto-opening drawers are separately reviewed.
        await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,30));}scrollTo({top:0,behavior:'instant'});});
        // Hidden carousel/lazy images may never resolve decode(). Bound readiness
        // and record failures instead of hanging the entire route suite.
        result.captureImages = await p.evaluate(async()=>{
          for(const img of document.images) img.loading='eager';
          await Promise.race([
            Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),
            new Promise(resolve=>setTimeout(resolve,3000)),
          ]);
          return [...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src'));
        });
        if(evidence.productionAttempt) throw Error('Production API attempt prevented: stop and review P9-04.');
        const file=`${width}-${route.replace(/[^a-z0-9-]/gi,'_')||'home'}.png`;
        await p.screenshot({path:path.join(output,file),fullPage:true});evidence.screenshots.push({route,width,file,fullPage:true,visualAcceptance:'Pending'});
        if(['/es/contact','/ar/library/author/rula-diab','/library'].includes(route)){
          const sequence=[];for(let i=0;i<12;i++){if(evidence.productionAttempt) throw Error('Production API attempt prevented: stop and review P9-04.');await p.keyboard.press('Tab');sequence.push(await p.evaluate(()=>({tag:document.activeElement.tagName,role:document.activeElement.getAttribute('role'),name:document.activeElement.getAttribute('aria-label')||document.activeElement.textContent?.trim().slice(0,80),outline:getComputedStyle(document.activeElement).outlineStyle})));}
          evidence.keyboardObservations.push({route,width,sequence,acceptance:'Manual review required'});
        }
      }
    }
    await c.close();
  }
  const c=await context(false,390),p=await c.newPage();
  for(const route of candidates)evidence.noJS.push({route,...await inspect(p,route),acceptance:'Content presence only; manual interaction pending'});
  await c.close();
  if(manual){
    // Review in these guarded contexts, never an ordinary unguarded browser tab.
    for(const [width,js] of [[1440,true],[390,true],[390,false]]){
      const review=await context(js,width),page=await review.newPage();
      await inspect(page,'/es/contact');
      console.log(`Manual review: ${width}px, JavaScript ${js}. Use loopback routes only; no form submission. Resume Inspector when done.`);
      await page.pause();
      if(evidence.productionAttempt) throw Error('Production API attempt prevented: stop and review P9-04.');
      await review.close();
    }
  }
} catch(error) {
  evidence.failure=String(error.message).replace(/https?:\/\/[^\s)]+/g,'[URL omitted]');process.exitCode=1;
} finally {
  evidence.finishedAt=new Date().toISOString();await fs.writeFile(path.join(output,'results.json'),JSON.stringify(evidence,null,2)+'\n');await browser.close();
}
