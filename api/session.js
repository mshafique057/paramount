import { requireAdmin } from '../lib/session.js';

// The admin screen calls this on load to decide whether to show the login form.
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  return res.status(200).json({ ok: true });
}
