export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? 'pointers-dev-session-secret';
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

export async function verifySessionTokenEdge(token: string | undefined | null) {
  if (!token) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expected = Array.from(new Uint8Array(sigBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  if (expected !== signature) return null;

  try {
    const data = JSON.parse(decodeBase64Url(payload)) as {
      sub: string;
      exp: number;
    };

    if (!data.sub || data.exp < Date.now()) return null;
    return { username: data.sub };
  } catch {
    return null;
  }
}
