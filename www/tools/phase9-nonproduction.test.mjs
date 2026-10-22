import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  counterModeForRuntime,
  resolveCounterConfig,
} from '../src/utils/counter-mode.ts';
import {
  formModeForRuntime,
  formRouteMapping,
  logicalFormForRoute,
  resolveFormMode,
  resolveMockFormResult,
} from '../src/utils/form-integration.ts';

test('counter configuration defaults off and requires explicit approval', () => {
  assert.deepEqual(resolveCounterConfig(undefined, undefined, undefined), { mode: 'off', reason: 'default-off' });
  assert.equal(resolveCounterConfig('invalid', 'https://api.example.test', 'true').mode, 'off');
  assert.equal(resolveCounterConfig('live', 'https://api.example.test', 'false').mode, 'off');
  assert.equal(resolveCounterConfig('live', 'https://api.example.test', 'true').mode, 'live');
  assert.equal(resolveCounterConfig('live', 'http://api.example.test', 'true').mode, 'off');
  assert.equal(counterModeForRuntime(resolveCounterConfig('live', 'https://api.example.test', 'true')), 'off');
  assert.equal(resolveCounterConfig('mock', undefined, undefined).mode, 'mock');
});

test('form configuration defaults off and live remains fail-closed', () => {
  assert.deepEqual(resolveFormMode(undefined, undefined), { mode: 'off', reason: 'default-off' });
  assert.equal(resolveFormMode('invalid', undefined).mode, 'off');
  assert.equal(resolveFormMode('live', 'false').mode, 'off');
  assert.equal(resolveFormMode('live', 'true').mode, 'live');
  assert.equal(formModeForRuntime(resolveFormMode('live', 'true')), 'off');
  assert.equal(resolveFormMode('mock', undefined).mode, 'mock');
  assert.equal(resolveMockFormResult(undefined), 'success');
  assert.equal(resolveMockFormResult('failed'), 'failed');
  assert.equal(resolveMockFormResult('unavailable'), 'unavailable');
  assert.equal(resolveMockFormResult('anything-else'), 'success');
});

test('form mapping covers nine native instances and five landing journeys', () => {
  assert.equal(formRouteMapping.filter((entry) => entry.kind === 'native-instance').length, 9);
  assert.equal(formRouteMapping.filter((entry) => entry.kind === 'landing-journey').length, 5);
  assert.equal(logicalFormForRoute('/contact'), 'general');
  assert.equal(logicalFormForRoute('/es/client-consultation'), 'service');
  assert.equal(logicalFormForRoute('/referrals'), 'referral');
  assert.equal(logicalFormForRoute('/lp/early-intervention'), 'service');
  assert.equal(logicalFormForRoute('/ar/contact'), undefined);
});

test('inactive source has no native form or live vendor destination', () => {
  const sources = [
    'src/components/ContactForm.astro',
    'src/components/FormShell.astro',
    'src/components/ServiceInquiryDrawer.astro',
  ].map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  assert.doesNotMatch(sources, /<form\b/);
  assert.doesNotMatch(sources, /250727122848156/);
  assert.doesNotMatch(sources, /jotform\.com/i);
  assert.match(sources, /data-form-mode/);
});

test('counter source has no implicit production fallback or credentialed fetch', () => {
  const source = fs.readFileSync('src/components/LikeViewCounter.astro', 'utf8');
  assert.doesNotMatch(source, /api\.azinstitute4autism\.com/);
  assert.doesNotMatch(source, /credentials:\s*['"]include/);
  assert.doesNotMatch(source, /method:\s*['"](?:POST|DELETE)/);
  assert.match(source, /data-counter-mode/);
});
