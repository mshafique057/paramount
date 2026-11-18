import crypto from 'node:crypto';

export const COOKIE = 'pl_admin';
const EIGHT_HOURS = 8 * 60 * 60 * 1000;

function sign(value) {
  return crypto
    .createHmac('sha256', process.env.SESSION_SECRET || '')
    .update(value)
    .digest('hex');
}

// Token format: "<expiresAt>.<hmac>". Stateless, so no session table is needed.
export function makeToken() {
  const expires = String(Date.now() + EIGHT_HOURS);
  return `${expires}.${sign(expires)}`;
}

export function isValid(token) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature) return false;
  if (Date.now() > Number(expires)) return false;

  const a = Buffer.from(signature);
  const b = Buffer.from(sign(expires));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function getCookie(req, name) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

export function requireAdmin(req, res) {
  if (isValid(getCookie(req, COOKIE))) return true;
  res.status(401).json({ error: 'Not signed in' });
  return false;
}
