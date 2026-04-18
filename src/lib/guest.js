const GUEST_TOKEN_KEY = 'verisigil.guest.token';

function generateToken() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getGuestToken() {
  const existingToken = window.localStorage.getItem(GUEST_TOKEN_KEY);

  if (existingToken) {
    return existingToken;
  }

  const newToken = generateToken();
  window.localStorage.setItem(GUEST_TOKEN_KEY, newToken);
  return newToken;
}

export function clearGuestToken() {
  window.localStorage.removeItem(GUEST_TOKEN_KEY);
}
