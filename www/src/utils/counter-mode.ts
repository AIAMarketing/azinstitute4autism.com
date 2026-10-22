export type CounterMode = 'off' | 'mock' | 'live';

export interface CounterConfig {
  mode: CounterMode;
  apiBase?: string;
  reason: 'default-off' | 'mock' | 'live-approved' | 'invalid-mode' | 'live-not-approved' | 'invalid-api-base';
}

const isHttpsOrigin = (value: string | undefined) => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.host);
  } catch {
    return false;
  }
};

export function resolveCounterConfig(
  rawMode: string | undefined,
  apiBase: string | undefined,
  liveApproved: string | undefined,
): CounterConfig {
  const mode = rawMode?.trim().toLowerCase();
  if (!mode) return { mode: 'off', reason: 'default-off' };
  if (mode === 'mock') return { mode: 'mock', reason: 'mock' };
  if (mode !== 'live') return { mode: 'off', reason: 'invalid-mode' };
  if (liveApproved?.trim().toLowerCase() !== 'true') return { mode: 'off', reason: 'live-not-approved' };
  if (!isHttpsOrigin(apiBase)) return { mode: 'off', reason: 'invalid-api-base' };
  return { mode: 'live', apiBase, reason: 'live-approved' };
}

export function counterModeForRuntime(config: CounterConfig): 'off' | 'mock' {
  // Live behavior is intentionally not implemented by the migration. Keep an
  // approved future setting fail-closed until a separately authorized adapter exists.
  return config.mode === 'mock' ? 'mock' : 'off';
}
