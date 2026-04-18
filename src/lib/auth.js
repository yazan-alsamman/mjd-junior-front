const SESSION_STORAGE_KEY = 'verisigil.auth.session';
const LOCAL_STORAGE_KEY = 'verisigil.auth.session.persistent';

function resolveStorage(isPersistent) {
  return isPersistent ? window.localStorage : window.sessionStorage;
}

function normalizeSession(session) {
  if (!session) return null;

  return {
    accessToken: session.accessToken || session.token || '',
    refreshToken: session.refreshToken || '',
    rememberMe: Boolean(session.rememberMe),
    user: session.user || null,
  };
}

export function persistSession(session) {
  const normalizedSession = normalizeSession(session);

  if (!normalizedSession) return;

  clearSession();

  const storage = resolveStorage(normalizedSession.rememberMe);
  storage.setItem(
    normalizedSession.rememberMe ? LOCAL_STORAGE_KEY : SESSION_STORAGE_KEY,
    JSON.stringify(normalizedSession),
  );
}

export function restoreSession() {
  const persistent = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (persistent) return normalizeSession(JSON.parse(persistent));

  const temporary = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (temporary) return normalizeSession(JSON.parse(temporary));

  return null;
}

export function clearSession() {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
