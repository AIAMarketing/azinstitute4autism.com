/** Bounded generated-HTML rules, not a browser/WCAG conformance audit. No network. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fg from 'fast-glob';
import matter from 'gray-matter';
import {load} from 'cheerio';
import {createPublicationManifest} from '../src/utils/publication-policy.ts';
import {createLibraryCatalog} from '../src/utils/library-catalog.ts';
import {createLibraryPaginationPublications} from '../src/utils/library-pagination.ts';
import {createAuthorArchivePublications} from '../src/utils/author-archives.ts';
import {createLibrarySearchPublication} from '../src/utils/search-publication.ts';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=process.argv[2];
if(!out) throw Error('Provide an explicit output JSON path (prefer /tmp). Build staging first.');
const records=await Promise.all((await fg('src/content/{pages,blog,authors}/**/*.{md,mdx}',{cwd:root})).sort().map(async file=>{const {data,content}=matter(await fs.readFile(path.join(root,file),'utf8'));return {collection:file.split('/')[2],id:file.split('/').slice(3).join('/').replace(/\.mdx?$/,''),data,body:content};}));
const site=JSON.parse(await fs.readFile(path.join(root,'src/data/site.json'))).url;
const content=createPublicationManifest(records.filter(r=>r.collection!=='authors'),site),authors=records.filter(r=>r.collection==='authors');
const catalog=createLibraryCatalog(content,authors),pagination=createLibraryPaginationPublications(catalog,content,site),archives=createAuthorArchivePublications(catalog,authors,[...content,...pagination],site);
const manifest=[...content,...pagination,...archives,createLibrarySearchPublication(site)].filter(p=>p.eligible);
const files=await fg('dist/**/*.html',{cwd:root});
const pages=new Map(await Promise.all(files.map(async file=>{const route='/'+file.replace(/^dist\//,'').replace(/(^|\/)index.html$/,'').replace(/\/$/,'');return [route,load(await fs.readFile(path.join(root,file),'utf8'))];})));
const text=s=>s.replace(/\s+/g,' ').trim();const rows=[];
for(const p of manifest){const $=pages.get(p.route),errors=[],review=[];const check=(ok,rule)=>{if(!ok) errors.push(rule);};
if(!$){rows.push({route:p.route,errors:['missing-route'],review});continue;}
check($('html').attr('lang')===p.entry.data.lang,'language');check($('html').attr('dir')===(p.entry.data.lang==='ar'?'rtl':'ltr'),'direction');
check($('title').length===1&&text($('title').text()).length>0,'title');check($('main h1').length===1&&text($('main h1').text()).length>0,'main-h1');check($('main').length===1,'main-landmark');
check($('link[rel=canonical]').length===1&&$('link[rel=canonical]').attr('href')===p.canonical,'canonical');check($('meta[name=robots]').attr('content')==='noindex,nofollow','staging-robots');check($('link[hreflang]').length===0,'staging-hreflang');
const ids=new Map();$('[id]').each((_,e)=>{const id=$(e).attr('id');ids.set(id,(ids.get(id)||0)+1);});check([...ids.values()].every(n=>n===1),'duplicate-id');
const name=e=>text($(e).attr('aria-label')||($(e).attr('aria-labelledby')||'').split(/\s+/).map(id=>$('[id]').filter((_,el)=>$(el).attr('id')===id).text()).join(' ')||$(e).text()||$(e).find('img').attr('alt')||$(e).attr('title')||'');
$('input:not([type=hidden]),select,textarea').each((_,e)=>{const id=$(e).attr('id');check(Boolean(name(e)||$(e).closest('label').length||(id&&$('label').toArray().some(l=>$(l).attr('for')===id))),'unlabelled-field');});
$('button,summary').each((_,e)=>check(Boolean(name(e)),'unnamed-control'));
$('img').each((_,e)=>check($(e).attr('alt')!==undefined,'missing-alt'));
$('[aria-labelledby],[aria-describedby]').each((_,e)=>{for(const attr of ['aria-labelledby','aria-describedby']) for(const id of ($(e).attr(attr)||'').split(/\s+/).filter(Boolean))check(ids.has(id),'missing-aria-target');});
$('a[href]').each((_,e)=>{const href=$(e).attr('href');if(!href||/^(mailto:|tel:|javascript:)/.test(href))return;const u=new URL(href,site+p.route);if(u.origin!==new URL(site).origin||!u.hash||u.hash.startsWith('#:~:text='))return;const dest=pages.get(u.pathname.replace(/\/$/,'')||'/');if(!dest)return;const id=decodeURIComponent(u.hash.slice(1));check(dest('[id]').toArray().some(el=>dest(el).attr('id')===id),'missing-fragment');});
for(const e of $('img[src],script[src],link[rel=stylesheet][href]').toArray()){const url=$(e).attr('src')||$(e).attr('href');if(url.startsWith('/'))check(await fs.access(path.join(root,'dist',decodeURIComponent(url.split(/[?#]/)[0]))).then(()=>true,()=>false),'missing-essential-asset');}
let prev=0;$('main h1,main h2,main h3,main h4,main h5,main h6').each((_,e)=>{const level=Number(e.tagName.slice(1));if(prev&&level>prev+1)review.push({rule:'heading-level-jump',heading:text($(e).text()),from:prev,to:level});prev=level;});
$('table').each((_,e)=>{if(!$(e).find('th').length)review.push({rule:'table-without-header'});});
const forms=$('form').toArray().map(e=>({action:$(e).attr('action'),method:$(e).attr('method')||'get',disabledSubmit:$(e).find('[type=submit][disabled]').length}));
const diagrams=$('.article-diagram-scroll').toArray().map(e=>({name:$(e).attr('aria-label'),tabindex:$(e).attr('tabindex'),role:$(e).attr('role'),src:$(e).find('img').attr('src'),alt:$(e).find('img').attr('alt')}));
for(const d of diagrams)check(d.name&&d.alt&&d.tabindex==='0'&&d.role==='region','diagram-semantics');
rows.push({route:p.route,locale:p.entry.data.lang,title:text($('title').text()),h1:text($('main h1').text()),errors:[...new Set(errors)],review,forms,diagrams,browser:'Not tested',reviewerAcceptance:'Pending'});
}
const extras=[...pages.keys()].filter(r=>!manifest.some(p=>p.route===r));const unexpected=extras.filter(r=>r!=='/404.html');
const report={ruleSet:'AIA phase8-static-v1 (Cheerio DOM heuristics; not axe or WCAG certification)',generatedAt:new Date().toISOString(),routeCount:rows.length,htmlCount:files.length,utilityRoutes:extras,unexpectedRoutes:unexpected,arabicHomePublished:pages.has('/ar'),failures:rows.filter(r=>r.errors.length).length,reviewFindings:rows.reduce((n,r)=>n+r.review.length,0),rows};
await fs.writeFile(out,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,rows:undefined},null,2));
if(report.failures||unexpected.length||report.arabicHomePublished) process.exitCode=1;
