/** Guarded browser interactions; synthetic form fixture intercepts every submission. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const output=path.resolve(process.argv[2]||'');if(!output.startsWith('/tmp/'))throw Error('Provide a fresh /tmp evidence directory.');await fs.mkdir(output);
const browser=await chromium.launch({headless:true}),origin='http://127.0.0.1:4321';
const result={browser:browser.version(),startedAt:new Date().toISOString(),checks:[],blocked:[],productionAttempt:false};
async function context(width=390,js=true){const c=await browser.newContext({viewport:{width,height:width===390?844:900},deviceScaleFactor:1,javaScriptEnabled:js,serviceWorkers:'block',acceptDownloads:false});await c.route('**/*',r=>{const q=r.request(),u=new URL(q.url());if(u.origin!==origin||!['GET','HEAD'].includes(q.method())){result.blocked.push({origin:u.origin,path:u.pathname,method:q.method()});if(u.hostname==='api.azinstitute4autism.com')result.productionAttempt=true;return r.abort();}return r.continue();});await c.routeWebSocket('**/*',s=>s.close());return c;}
async function go(p,route){await p.goto(origin+route,{waitUntil:'networkidle'});assert.equal(result.productionAttempt,false,'Production attempt prevented; stop.');}
async function test(name,fn){console.log(name);try{const detail=await fn();result.checks.push({name,status:detail?.review?'review':'pass',detail});}catch(e){result.checks.push({name,status:'fail',error:String(e.message).slice(0,1300)});}if(result.productionAttempt)throw Error('Production API attempt: stop');}
try{
await test('home director reflows without page overflow', async () => {
  const observations = [];
  for (const width of [320, 390, 768, 1440]) {
    const c = await context(width), p = await c.newPage();
    for (const route of ['/', '/es']) {
      await go(p, route);
      const layout = await p.locator('.director-layout').evaluate(e => ({
        columns: getComputedStyle(e).gridTemplateColumns.split(' ').length,
        pageWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        clipped: [...e.children].some(child => {
          const r = child.getBoundingClientRect();
          return r.left < 0 || r.right > innerWidth;
        }),
      }));
      assert.equal(layout.columns, width <= 760 ? 1 : 2);
      assert.equal(layout.pageWidth, layout.viewport);
      assert.equal(layout.clipped, false);
      await p.locator('.director-section').screenshot({path: `${output}/director-${route === '/' ? 'en' : 'es'}-${width}.png`});
      observations.push({route, width, ...layout});
    }
    await c.close();
  }
  return observations;
});
for(const width of [1440,390]){
 const c=await context(width),p=await c.newPage();p.setDefaultTimeout(6000);
 for(const route of ['/es/contact','/ar/library','/library']){
  await test(`skip link ${route} ${width}`,async()=>{await go(p,route);await p.keyboard.press('Tab');assert.equal(await p.locator('.skip-link').evaluate(e=>e===document.activeElement),true);await p.keyboard.press('Enter');assert.equal(new URL(p.url()).hash,'#main');return await p.evaluate(()=>({focused:document.activeElement.tagName,mainTop:document.getElementById('main').getBoundingClientRect().top}));});
  await test(`language menu ${route} ${width}`,async()=>{await go(p,route);const summary=p.locator('.lang-switcher summary');await summary.focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.lang-switcher details').evaluate(e=>e.open),true);const links=await p.locator('.lang-switcher__menu a').evaluateAll(es=>es.map(e=>({href:e.getAttribute('href'),text:e.textContent})));assert.ok(links.every(e=>e.href!=='/ar'));await p.keyboard.press('Tab');await p.keyboard.press('Escape');assert.equal(await summary.evaluate(e=>document.activeElement===e&& !e.parentElement.open),true);return links;});
  if(width===390)await test(`mobile menu ${route}`,async()=>{await go(p,route);const summary=p.locator('.mobile-nav > summary');await summary.focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.mobile-nav').evaluate(e=>e.open),true);await p.keyboard.press('Tab');assert.equal(await p.locator('.mobile-nav').evaluate(e=>e.contains(document.activeElement)),true);await p.keyboard.press('Escape');assert.equal(await summary.evaluate(e=>e===document.activeElement&&!e.parentElement.open),true);return {outline:await summary.evaluate(e=>getComputedStyle(e).outline)};});
 }
 if(width===1440) await test('desktop submenu keyboard',async()=>{await go(p,'/');const item=p.locator('.header-inner > .main-nav li').filter({has:p.locator('ul.submenu')}).first();const a=item.locator(':scope > a');await a.focus();assert.equal(await item.locator('ul.submenu').isVisible(),true);await p.keyboard.press('Tab');assert.equal(await item.locator('ul.submenu').evaluate(e=>e.contains(document.activeElement)),true);});
 for(const route of ['/library/aba-school-readiness-arizona','/es/library/aba-school-readiness-arizona','/ar/library/aba-school-readiness-guide','/faqs']){
  await test(`FAQ keyboard ${route} ${width}`,async()=>{await go(p,route);const detail=p.locator('main details.faq').first(),summary=detail.locator('summary');const before=await detail.evaluate(e=>e.open);await summary.focus();await p.keyboard.press('Enter');await p.waitForFunction(({before})=>document.querySelector('main details.faq').open===!before,{before});assert.equal(await detail.evaluate(e=>e.open),!before);await p.keyboard.press('Space');await p.waitForFunction(({before})=>document.querySelector('main details.faq').open===before,{before});assert.equal(await detail.evaluate(e=>e.open),before);return {count:await p.locator('main details.faq').count(),focus:await summary.evaluate(e=>e===document.activeElement)};});
 }
 for(const [route,query,locale] of [['/library','meltdowns','en'],['/es/library','refuerzo','es'],['/ar/library','التعزيز','ar']]){
  await test(`search ${locale} ${width}`,async()=>{await go(p,route);const input=p.locator('[data-search-input]');await input.fill(query);await input.press('Enter');await p.locator('.library-search-result').first().waitFor();const count=await p.locator('.library-search-result').count();assert.ok(count>0);assert.ok((await p.locator('.library-search-result').evaluateAll(es=>es.map(e=>e.lang))).every(l=>l===locale));await input.fill('zzzzphase8nomatch');await input.press('Enter');await p.waitForFunction(()=>document.querySelectorAll('.library-search-result').length===0);const status=await p.locator('[data-search-status]').innerText();await p.locator('[data-search-clear]').focus();await p.keyboard.press('Enter');assert.equal(await input.inputValue(),'');return {count,noResults:status,live:await p.locator('[data-search-status]').getAttribute('aria-live')};});
 }
 await test(`Arabic diagram scrolling ${width}`,async()=>{await go(p,'/ar/library/aba-school-readiness-guide');const regions=p.locator('.article-diagram-scroll'),observations=[];assert.equal(await regions.count(),3);for(let i=0;i<3;i++){const r=regions.nth(i);await r.focus();const before=await r.evaluate(e=>({left:e.scrollLeft,width:e.clientWidth,scrollWidth:e.scrollWidth,name:e.getAttribute('aria-label'),outline:getComputedStyle(e).outline}));for(let n=0;n<5;n++)await p.keyboard.press('ArrowLeft');await p.waitForTimeout(250);const after=await r.evaluate(e=>e.scrollLeft);if(width===390){assert.ok(before.scrollWidth>before.width);assert.notEqual(before.left,after);}assert.ok(before.name);await r.screenshot({path:`${output}/diagram-${width}-${i}.png`});observations.push({...before,after});}assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);return observations;});
 await c.close();
}
const c=await context(390),p=await c.newPage();p.setDefaultTimeout(6000);
await test('service drawer delayed opening and keyboard containment',async()=>{await go(p,'/aba-therapy');const prior=p.locator('.brand');await prior.focus();const dialog=p.locator('[data-service-inquiry-drawer]');await p.waitForFunction(()=>document.querySelector('[data-service-inquiry-drawer]')?.open,{},{timeout:14000});await p.waitForTimeout(700);const sequence=[];const start=await p.evaluate(()=>({tag:document.activeElement.tagName,inDialog:!!document.activeElement.closest('dialog')}));assert.ok(start.inDialog);for(let i=0;i<18;i++){await p.keyboard.press('Tab');const state=await dialog.evaluate(e=>({tag:document.activeElement.tagName,inside:e.contains(document.activeElement),html:document.activeElement.outerHTML.slice(0,220)}));sequence.push({tab:i,...state});assert.ok(state.inside||state.tag==='BODY');}await p.keyboard.press('Escape');await p.waitForTimeout(600);assert.equal(await dialog.evaluate(e=>e.open),false);return {start,sequence,restored:await prior.evaluate(e=>e===document.activeElement),review:sequence.some(s=>s.tag==='BODY')?'Native browser focus boundary reached; background controls stayed inert, but visible browser-chrome/AT acceptance remains pending':undefined};});
await test('page six boundaries',async()=>{const rows=[];for(const route of ['/library/page/6','/library/author/rula-diab/page/6']){await go(p,route);const cards=p.locator('article.blog-card');assert.equal(await cards.count(),5);const links=await p.locator('.library-pagination a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));assert.ok(links.some(h=>h.endsWith('/5')));assert.ok(!links.some(h=>h.endsWith('/7')));rows.push({route,cards:5,links});}return rows;});
await test('image link and browser Back',async()=>{await go(p,'/library/play-leisure-skills');const link=p.locator('main a[href$=".png"]').first();const href=await link.getAttribute('href');await link.focus();await p.keyboard.press('Enter');await p.waitForURL(origin+href);await p.goBack({waitUntil:'networkidle'});assert.equal(new URL(p.url()).pathname,'/library/play-leisure-skills');return {href};});
await test('picky eating section fragments',async()=>{await go(p,'/library/picky-eating-autism-parent-guide');const links=await p.locator('main a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));assert.equal(links.length,4);for(const href of links){await p.locator(`main a[href="${href}"]`).click();assert.equal(new URL(p.url()).hash,href);assert.equal(await p.locator(`[id="${href.slice(1)}"]`).count(),1);}return links;});
await test('disabled Spanish form and intercepted submission fixture',async()=>{await go(p,'/es/contact');const form=p.locator('main form').first();const html=await form.evaluate(e=>e.outerHTML);assert.equal(await form.getAttribute('action'),'');assert.equal(await form.locator('[type=submit]').isDisabled(),true);const fixture=await context(390);let prevented=false;await fixture.route(origin+'/__phase8_form_fixture',r=>{if(r.request().method()!=='GET'){prevented=true;return r.abort();}return r.fulfill({contentType:'text/html',body:'<!doctype html><html lang="es"><title>Isolated form fixture</title><body>'+html+'</body></html>'});});const page=await fixture.newPage();await page.goto(origin+'/__phase8_form_fixture');await page.evaluate(()=>HTMLFormElement.prototype.submit.call(document.querySelector('form')));await page.waitForTimeout(500);await fixture.close();assert.equal(prevented,true);return {programmaticPostPrevented:true,meaning:'Disabled submit is not complete form isolation; P9-03 remains pending. No field data supplied.'};});
await c.close();
const nojs=await context(390,false),n=await nojs.newPage();n.setDefaultTimeout(6000);
for(const route of ['/es/contact','/library','/ar/library/aba-school-readiness-guide'])await test(`no-JS keyboard ${route}`,async()=>{await go(n,route);const menu=n.locator('.mobile-nav > summary');await menu.focus();await n.keyboard.press('Enter');assert.equal(await n.locator('.mobile-nav').evaluate(e=>e.open),true);await n.keyboard.press('Enter');const language=n.locator('.lang-switcher summary');await language.focus();await n.keyboard.press('Enter');assert.equal(await n.locator('.lang-switcher__menu').isVisible(),true);if(route.includes('school-readiness')){const d=n.locator('details.faq').first();const before=await d.evaluate(e=>e.open);await d.locator('summary').focus();await n.keyboard.press('Enter');assert.equal(await d.evaluate(e=>e.open),!before);}return {h1:await n.locator('main h1').innerText(),searchNotice:await n.locator('.library-search__noscript').count()};});
await nojs.close();
}finally{result.finishedAt=new Date().toISOString();await fs.writeFile(output+'/results.json',JSON.stringify(result,null,2));await browser.close();console.log(JSON.stringify({checks:result.checks.length,reviews:result.checks.filter(x=>x.status==='review'),failures:result.checks.filter(x=>x.status==='fail'),blocked:result.blocked,productionAttempt:result.productionAttempt},null,2));}

if (result.productionAttempt || result.checks.some(check => check.status === "fail")) process.exitCode = 1;
