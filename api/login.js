import crypto from 'node:crypto';
import { makeToken, COOKIE } from '../lib/session.js';

// Compare SHA-256 digests so the comparison takes the same time whatever the input.
function matches(input, expected) {
  const a = crypto.createHash('sha256').update(input).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const password = String(body.password || '');
  const expected = process.env.ADMIN_PASSWORD || '';

  if (!expected || !matches(password, expected)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  res.setHeader(
    'Set-Cookie',
    `${COOKIE}=${makeToken()}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`
  );
  return res.status(200).json({ ok: true });
}
