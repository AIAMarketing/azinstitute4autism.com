import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ORIGIN, normalizeReference, addDiscovery, classify, reconcile, summarize,
  baselineChanges, parseRobots, robotsAllows, compactJson, isPageRoute
} from './audit-routes.mjs';

test('normalization removes only known tracking parameters and terminal slashes', () => {
  assert.deepEqual(normalizeReference('/aba-therapy/?utm_source=email&hsLang=en&gclid=123#programs'), {
    route: '/aba-therapy', reference: '/aba-therapy#programs'
  });
  assert.equal(normalizeReference(ORIGIN + '/').route, '/');
  assert.equal(normalizeReference('//www.azinstitute4autism.com/es/').route, '/es');
  assert.equal(normalizeReference('https://example.com/aba'), null);
  assert.equal(normalizeReference('mailto:info@example.com'), null);
  assert.equal(normalizeReference('https://user@www.azinstitute4autism.com/'), null);
});

test('semantic queries, repeated values, relative resolution and fragments survive', () => {
  assert.deepEqual(normalizeReference('/search/?term=ABA&type=BLOG_POST&type=SITE_PAGE&utm_medium=email#results'), {
    route: '/search?term=ABA&type=BLOG_POST&type=SITE_PAGE',
    reference: '/search?term=ABA&type=BLOG_POST&type=SITE_PAGE#results'
  });
  assert.equal(normalizeReference('/library?tag=school&sort=date').route, '/library?tag=school&sort=date');
  assert.equal(normalizeReference('/library/a%2Fb').route, '/library/a%2Fb');
  assert.equal(normalizeReference('../about#team', ORIGIN + '/library/article').reference, '/about#team');
  assert.notEqual(normalizeReference('/search?term=ABA').route, normalizeReference('/search?term=autism').route);
});

test('deduplication retains sources and anchors without manufacturing document routes', () => {
  const map = new Map();
  addDiscovery(map, '/aba/?hsLang=en', 'sitemap:/sitemap.xml', '2026-10-06T00:00:00Z');
  addDiscovery(map, '/aba#individual', 'link:/', '2026-10-06T00:01:00Z');
  addDiscovery(map, '/aba/#group', 'link:/', '2026-10-06T00:02:00Z');
  addDiscovery(map, '/aba#group', 'link:/', '2026-10-06T00:03:00Z');
  assert.equal(map.size, 1);
  assert.deepEqual(map.get('/aba').sources, ['link:/', 'sitemap:/sitemap.xml']);
  assert.deepEqual(map.get('/aba').references, ['/aba#group', '/aba#individual']);
  assert.equal(map.get('/aba').discoveredAt, '2026-10-06T00:00:00Z');
  for (const asset of ['/hubfs/assessment.pdf', '/assets/image.webp', '/robots.txt', '/sitemap.xml']) {
    assert.equal(isPageRoute(asset), false);
  }
  assert.equal(isPageRoute('/lp/early-intervention'), true);
});

test('sitemap absence never implies production absence', () => {
  const local = { generated: true };
  assert.equal(classify(local, null), 'local-only-production-unverified');
  assert.equal(classify(local, { sources: ['link:/'], http: { status: 200 } }), 'both-route-present-content-unverified');
  assert.equal(classify(null, { sources: ['sitemap:/sitemap.xml'], http: null }), 'live-discovered-local-missing');
  for (const status of [403, 429, 500, null]) {
    assert.equal(classify(local, { sources: ['target:local'], http: { status } }), 'local-only-production-unverified');
  }
  for (const status of [404, 410]) {
    assert.equal(classify(local, { http: { status } }), 'local-only-production-absent');
  }
});

test('a generated placeholder is not misrepresented as already unpublished', () => {
  const routes = reconcile([{ route: '/ar', generated: true, draft: false, placeholder: true }], [
    { route: '/ar', sources: ['target:local'], http: { status: 404 } }
  ]);
  assert.equal(routes[0].disposition, 'local-placeholder-production-absent');
  assert.equal(routes[0].local.generated, true);
  assert.equal(routes[0].local.draft, false);
  assert.equal(summarize(routes).verifiedAbsent, 1);
  assert.equal(classify({ generated: false, draft: true }, null), 'local-source-not-generated');
});

test('external canonicals remain live pages; redirects remain redirects', () => {
  assert.equal(classify({ generated: true }, { http: { status: 200, canonical: 'https://publisher.example/original' } }), 'both-route-present-content-unverified');
  assert.equal(classify(null, { http: { status: 301, location: ORIGIN + '/aba-therapy' } }), 'production-redirect-only');
  assert.equal(classify({ generated: true }, { http: { status: 302 } }), 'local-and-production-redirect');
});

test('reconciliation is stable and distinguishes listed, verified and generated counts', () => {
  const local = [{ route: '/a', generated: true }, { route: '/employee-portal', generated: true }];
  const production = [
    { route: '/b', sources: ['sitemap:/sitemap.xml'], http: null },
    { route: '/a', sources: ['sitemap:/sitemap.xml'], http: null },
    { route: '/employee-portal', sources: ['link:/'], http: { status: 200 } }
  ];
  const routes = reconcile(local, production);
  assert.deepEqual(routes, reconcile([...local].reverse(), [...production].reverse()));
  const summary = summarize(routes);
  assert.equal(summary.localGenerated, 2);
  assert.equal(summary.sitemap, 2);
  assert.equal(summary.sitemapLocalOverlap, 1);
  assert.equal(summary.sitemapLocalMissing, 1);
  assert.equal(summary.verifiedLiveNotInSitemap, 1);
  assert.deepEqual(JSON.parse(compactJson({ routes, summary })), { routes, summary });
});

test('baseline changes preserve original observations and never compare unknown values', () => {
  const baseline = { production: [
    { route: '/old', sources: ['sitemap:/sitemap.xml'], http: { status: 200, title: 'Old title', canonical: null } },
    { route: '/not-requested', sources: ['link:/'], http: null }
  ] };
  const before = JSON.stringify(baseline);
  const current = reconcile([], [
    { route: '/old', sources: ['link:/'], http: { status: 200, title: 'New title', canonical: null } },
    { route: '/new', sources: ['sitemap:/sitemap.xml'], http: { status: 200 } }
  ]);
  assert.deepEqual(baselineChanges(baseline, current), {
    sitemapAdded: ['/new'], sitemapRemoved: ['/old'],
    observations: [{ route: '/old', field: 'title', inherited: 'Old title', current: 'New title' }]
  });
  assert.equal(JSON.stringify(baseline), before);
  assert.deepEqual(baselineChanges(baseline, reconcile([], [
    { route: '/old', sources: ['sitemap:/sitemap.xml'], http: { status: 200 } }
  ])).observations, []);
});

test('robots matching handles wildcard queries, precedence, crawl delay and agent groups', () => {
  const policy = parseRobots('User-agent: *\nAllow: /\nDisallow: /private\nAllow: /private/public\nDisallow: /*?*hs_preview=*\nCrawl-delay: 2\nSitemap: ' + ORIGIN + '/sitemap.xml');
  assert.equal(robotsAllows('/private', policy), false);
  assert.equal(robotsAllows('/private/public', policy), true);
  assert.equal(robotsAllows('/about?hs_preview=yes', policy), false);
  assert.equal(robotsAllows('/about', policy), true);
  assert.equal(policy.delay, 2000);
  assert.deepEqual(policy.sitemaps, [ORIGIN + '/sitemap.xml']);
  const specific = parseRobots('User-agent: *\nDisallow: /\nUser-agent: AIA-Route-Audit\nAllow: /\nDisallow: /secret$');
  assert.equal(robotsAllows('/about', specific), true);
  assert.equal(robotsAllows('/secret', specific), false);
  assert.equal(robotsAllows('/secret/more', specific), true);
});
