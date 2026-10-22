export type FormMode = 'off' | 'mock' | 'live';
export type LogicalForm = 'general' | 'service' | 'referral';
export type MockFormResult = 'success' | 'failed' | 'unavailable';

export interface FormModeConfig {
  mode: FormMode;
  reason: 'default-off' | 'mock' | 'live-approved' | 'invalid-mode' | 'live-not-approved';
}

export function resolveFormMode(rawMode: string | undefined, liveApproved: string | undefined): FormModeConfig {
  const mode = rawMode?.trim().toLowerCase();
  if (!mode) return { mode: 'off', reason: 'default-off' };
  if (mode === 'mock') return { mode: 'mock', reason: 'mock' };
  if (mode !== 'live') return { mode: 'off', reason: 'invalid-mode' };
  if (liveApproved?.trim().toLowerCase() !== 'true') return { mode: 'off', reason: 'live-not-approved' };
  return { mode: 'live', reason: 'live-approved' };
}

export function formModeForRuntime(config: FormModeConfig): 'off' | 'mock' {
  // A live adapter and approved form IDs do not exist yet. Keep live fail-closed.
  return config.mode === 'mock' ? 'mock' : 'off';
}

export function resolveMockFormResult(rawResult: string | undefined): MockFormResult {
  const result = rawResult?.trim().toLowerCase();
  return result === 'failed' || result === 'unavailable' ? result : 'success';
}

export const formRouteMapping: ReadonlyArray<{
  route: string;
  logicalForm: LogicalForm;
  kind: 'native-instance' | 'landing-journey';
}> = [
  { route: '/contact', logicalForm: 'general', kind: 'native-instance' },
  { route: '/es/contact', logicalForm: 'general', kind: 'native-instance' },
  { route: '/client-consultation', logicalForm: 'service', kind: 'native-instance' },
  { route: '/es/client-consultation', logicalForm: 'service', kind: 'native-instance' },
  { route: '/schedule-consultation', logicalForm: 'service', kind: 'native-instance' },
  { route: '/referrals', logicalForm: 'referral', kind: 'native-instance' },
  { route: '/aba-therapy', logicalForm: 'service', kind: 'native-instance' },
  { route: '/autism-evaluations', logicalForm: 'service', kind: 'native-instance' },
  { route: '/learner-social-club', logicalForm: 'service', kind: 'native-instance' },
  { route: '/lp/aba-therapy', logicalForm: 'service', kind: 'landing-journey' },
  { route: '/lp/aba-insurance', logicalForm: 'service', kind: 'landing-journey' },
  { route: '/lp/aba-ahcccs', logicalForm: 'service', kind: 'landing-journey' },
  { route: '/lp/aba-private-pay', logicalForm: 'service', kind: 'landing-journey' },
  { route: '/lp/early-intervention', logicalForm: 'service', kind: 'landing-journey' },
];

export function logicalFormForRoute(route: string): LogicalForm | undefined {
  return formRouteMapping.find((entry) => entry.route === route)?.logicalForm;
}
