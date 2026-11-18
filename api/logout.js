import { COOKIE } from '../lib/session.js';

export default async function handler(req, res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
  return res.status(200).json({ ok: true });
}
