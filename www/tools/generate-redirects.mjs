import fs from 'node:fs/promises';

const redirects = [
  { from: '/aba', to: '/aba-therapy', status: 301, reason: 'Brief alias to preserved mirror URL' },
  { from: '/autismevaluations', to: '/autism-evaluations', status: 301, reason: 'Brief alias to preserved mirror URL' },
  { from: '/learnersocialclub', to: '/learner-social-club', status: 301, reason: 'Brief alias to preserved mirror URL' }
];
await fs.writeFile(new URL('../src/data/redirects.json', import.meta.url), `${JSON.stringify(redirects, null, 2)}\n`);
await fs.writeFile(new URL('../reports/redirect-map.csv', import.meta.url),
  `from,to,status,reason\n${redirects.map((r) => `"${r.from}","${r.to}",${r.status},"${r.reason}"`).join('\n')}\n`);
await fs.writeFile(new URL('../reports/nginx-rewrites.conf', import.meta.url),
  `${redirects.map((r) => `rewrite ^${r.from}$ ${r.to} permanent;`).join('\n')}\n`);
