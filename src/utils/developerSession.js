const SESSION_KEY = 'gis-developer-session';
const SESSION_HOURS = 8;
const DOCS_ACCESS_EMAIL = 'developer@gis247.net';
const DOCS_ACCESS_PASSWORD = 'change-me-before-deploy';

export function getDeveloperSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session?.expiresAt || Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function createDeveloperSession(email) {
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const session = { email, expiresAt, signedInAt: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearDeveloperSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function validateDeveloperCredentials(email, password) {
  const expectedEmail = DOCS_ACCESS_EMAIL.trim().toLowerCase();
  const expectedPassword = DOCS_ACCESS_PASSWORD;

  if (!expectedPassword) {
    return { ok: false, error: 'Portal access is not configured yet. Contact your GIS administrator.' };
  }

  if (email.trim().toLowerCase() !== expectedEmail || password !== expectedPassword) {
    return { ok: false, error: 'Invalid email or password.' };
  }

  return { ok: true };
}
