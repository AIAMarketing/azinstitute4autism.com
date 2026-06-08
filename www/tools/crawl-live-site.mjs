import fs from 'node:fs/promises';

const start = 'https://www.azinstitute4autism.com';
const output = new URL('../reports/live-crawl.json', import.meta.url);
try {
  const response = await fetch(start, { redirect: 'follow' });
  const result = { url: start, status: response.status, checkedAt: new Date().toISOString() };
  await fs.writeFile(output, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Live site returned ${response.status}.`);
} catch (error) {
  await fs.writeFile(output, `${JSON.stringify({ url: start, error: String(error) }, null, 2)}\n`);
  console.error(`Live crawl unavailable: ${error.message}`);
  process.exitCode = 1;
}
