import { createHmac, timingSafeEqual } from 'crypto';
import { SESSION_COOKIE, SESSION_MAX_AGE } from './session-edge';

export { SESSION_COOKIE, SESSION_MAX_AGE };

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? 'pointers-dev-session-secret';
}

function sign(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionToken(username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: username,
      exp: Date.now() + SESSION_MAX_AGE * 1000
    })
  ).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);

  try {
    if (!timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const json = Buffer.from(payload, 'base64url').toString();
    const data = JSON.parse(json) as {
      sub: string;
      exp: number;
    };

    if (!data.sub || data.exp < Date.now()) return null;
    return { username: data.sub };
  } catch {
    return null;
  }
}

export function validateAdminCredentials(username: string, password: string) {
  const adminUser = process.env.ADMIN_USER ?? 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'pointers2026';

  return username === adminUser && password === adminPassword;
}
