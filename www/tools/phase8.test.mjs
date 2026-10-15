import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const tokens=Object.fromEntries([...read('styles/variables.css').matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map(m=>[m[1],m[2]]));
const luminance=hex=>hex.slice(1).match(/../g).map(h=>parseInt(h,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
function colorRule(source,selector){const start=source.indexOf(selector);assert.ok(start>=0,selector);const body=source.slice(source.indexOf('{',start)+1,source.indexOf('}',start));const token=body.match(/color:\s*var\((--[\w-]+)\)/)?.[1];assert.ok(tokens[token],selector);return {body,color:tokens[token]};}
function textContrast(color){for(const bg of ['#ffffff',tokens['--color-tint']])assert.ok(ratio(color,bg)>=4.5,`${color} on ${bg}`);}
test('inline prose links remain distinguishable and meet normal-text contrast in resting and interactive states',()=>{const css=read('styles/blog.css');const normal=colorRule(css,'.prose :is(p, li, td) a:not(.content-button) {');textContrast(normal.color);assert.match(normal.body,/text-decoration:\s*underline/);textContrast(colorRule(css,'.prose :is(p, li, td) a:not(.content-button):is(:hover, :focus-visible)').color);});
test('source FAQ answer links meet normal-text contrast and retain non-color identification',()=>{const css=read('components/FAQAccordion.astro');const normal=colorRule(css,'.faq-accordion--source .faq-answer__inner :global(a) {');textContrast(normal.color);assert.match(normal.body,/text-decoration:\s*underline/);textContrast(colorRule(css,'.faq-accordion--source .faq-answer__inner :global(a:focus-visible)').color);});
test('skip and contact/form instructions retain readable link contrast',()=>{
  for(const [file,selector] of [
    ['styles/layout.css','.skip-link, .skip-link:visited'],
    ['styles/forms.css','.form-note a, .service-inquiry-form__footer a'],
    ['components/pages/ContactPage.astro','.contact-page__copy :global(a:not(.content-button))'],
    ['components/ContactForm.astro','.contact-form-card__note :global(a)'],
  ]){const rule=colorRule(read(file),selector);textContrast(rule.color);assert.match(rule.body,/text-decoration:\s*underline/);}
});
test('authored navigation, byline and diagram focus outlines contrast with their light surfaces',()=>{for(const file of ['components/MainNav.astro','components/MobileNav.astro','components/LanguageSwitcher.astro','layouts/BlogPostLayout.astro','styles/blog.css']){const css=read(file);const outlines=[...css.matchAll(/outline:\s*3px solid var\((--[\w-]+)\)/g)];assert.ok(outlines.length,file);for(const [,token]of outlines)for(const bg of ['#ffffff',tokens['--color-tint']])assert.ok(ratio(tokens[token],bg)>=3,file);}});

test('article cards, related links and light-surface navigation retain readable contrast across states', () => {
  for (const [file, selector] of [
    ['styles/components.css', '.text-link, .text-link:visited'],
    ['styles/components.css', '.text-link:hover, .text-link:active'],
    ['styles/typography.css', '.eyebrow {'],
    ['components/MainNav.astro', '.main-nav a:hover'],
    ['components/LanguageSwitcher.astro', '.lang-switcher__menu a[aria-current="page"]'],
    ['components/BlogPostFooter.astro', '.post-pagination a:hover'],
  ]) textContrast(colorRule(read(file), selector).color);
  const card = read('components/BlogCard.astro');
  const token = card.match(/outline: 3px solid var\((--[\w-]+)\)/)?.[1];
  assert.ok(ratio(tokens[token], '#ffffff') >= 3);
});
