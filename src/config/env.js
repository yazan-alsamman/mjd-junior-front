function toBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).toLowerCase() === 'true';
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  useMockApi: toBoolean(import.meta.env.VITE_USE_MOCK_API, true),
  apiTimeoutMs: toNumber(import.meta.env.VITE_API_TIMEOUT_MS, 20000),
};
