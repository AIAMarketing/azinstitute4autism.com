import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

export const redirects = Object.freeze([
  { from: '/aba', to: '/aba-therapy', status: 301, reason: 'Brief legacy alias to preserved URL' },
  { from: '/autismevaluations', to: '/autism-evaluations', status: 301, reason: 'Brief legacy alias to preserved URL' },
  { from: '/learnersocialclub', to: '/learner-social-club', status: 301, reason: 'Brief legacy alias to preserved URL' },
  { from: '/library/page/1', to: '/library', status: 301, reason: 'Library first-page alias' },
  { from: '/es/library/page/1', to: '/es/library', status: 301, reason: 'Spanish Library first-page alias' },
  { from: '/ar/library/page/1', to: '/ar/library', status: 301, reason: 'Arabic Library first-page alias' },
  { from: '/library/author/rula-diab/page/1', to: '/library/author/rula-diab', status: 301, reason: 'Author first-page alias' },
  { from: '/es/library/author/rula-diab/page/1', to: '/es/library/author/rula-diab', status: 301, reason: 'Spanish author first-page alias' },
  { from: '/ar/library/author/rula-diab/page/1', to: '/ar/library/author/rula-diab', status: 301, reason: 'Arabic author first-page alias' }
]);

function normalizedPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[?#\\\s]/u.test(value)) {
    throw new Error(`Invalid redirect path: ${value}`);
  }
  const trimmed = value.replace(/\/+$/, '') || '/';
  let segments;
  try {
    segments = trimmed.slice(1).split('/').map((segment) => decodeURIComponent(segment));
  } catch {
    throw new Error(`Invalid redirect path: ${value}`);
  }
  if (trimmed !== '/' && segments.some((segment) => !segment || ['.', '..'].includes(segment) || /[/\\?#\s]/u.test(segment))) {
    throw new Error(`Invalid redirect path: ${value}`);
  }
  const normalized = '/' + segments.map((segment) => encodeURIComponent(segment)).join('/');
  if (normalized !== value) throw new Error(`Redirect path is not normalized: ${value}`);
  return normalized;
}

/** Validate structural rules, plus generated-route targets when supplied. */
export function validateRedirects(records, generatedRoutes) {
  if (!Array.isArray(records)) throw new Error('Redirect definitions must be an array.');
  const sources = new Map();
  for (const [index, record] of records.entries()) {
    if (!record || typeof record !== 'object') throw new Error(`Invalid redirect definition at index ${index}.`);
    const from = normalizedPath(record.from);
    const to = normalizedPath(record.to);
    if (record.status !== 301) throw new Error(`Redirect must use HTTP 301: ${from}`);
    if (typeof record.reason !== 'string' || !record.reason.trim()) throw new Error(`Redirect reason is required: ${from}`);
    if (from === to) throw new Error(`Self-redirect is not allowed: ${from}`);
    if (sources.has(from)) throw new Error(`Duplicate redirect source: ${from}`);
    const locale = from.match(/^\/(es|ar)(?:\/|$)/)?.[1] ?? 'en';
    const destinationLocale = to.match(/^\/(es|ar)(?:\/|$)/)?.[1] ?? 'en';
    if (locale !== destinationLocale) throw new Error(`Redirect changes locale: ${from} -> ${to}`);
    sources.set(from, record);
  }
  for (const { from, to } of records) {
    if (sources.has(to)) throw new Error(`Redirect chain or cycle is not allowed: ${from} -> ${to}`);
  }
  if (generatedRoutes !== undefined) {
    const routes = new Set([...generatedRoutes].map(normalizedPath));
    for (const { from, to } of records) {
      if (routes.has(from)) throw new Error(`Redirect source collides with generated HTML: ${from}`);
      if (!routes.has(to)) throw new Error(`Redirect target is not a generated route: ${from} -> ${to}`);
    }
  }
  return records;
}

const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const regex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function redirectArtifacts(records = redirects) {
  validateRedirects(records);
  return {
    json: `${JSON.stringify(records, null, 2)}\n`,
    csv: `from,to,status,reason\n${records.map((record) =>
      `${csv(record.from)},${csv(record.to)},${record.status},${csv(record.reason)}`).join('\n')}\n`,
    nginx: `${records.map(({ from, to }) => `rewrite ^${regex(from)}$ ${to} permanent;`).join('\n')}\n`
  };
}

export async function generateRedirectArtifacts(records = redirects) {
  const artifacts = redirectArtifacts(records);
  await Promise.all([
    fs.writeFile(path.join(ROOT, 'src/data/redirects.json'), artifacts.json),
    fs.writeFile(path.join(ROOT, 'reports/redirect-map.csv'), artifacts.csv),
    fs.writeFile(path.join(ROOT, 'reports/nginx-rewrites.conf'), artifacts.nginx)
  ]);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  generateRedirectArtifacts().catch((error) => {
    console.error(`Redirect generation failed: ${error.message}`);
    process.exitCode = 1;
  });
}
