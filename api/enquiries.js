import { sql } from '@vercel/postgres';
import { requireAdmin } from '../lib/session.js';

// Admin-only list of contact form enquiries, newest first.
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!requireAdmin(req, res)) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        postcode TEXT,
        service TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
    const { rows } = await sql`SELECT id, name, contact, postcode, service, message, created_at FROM enquiries ORDER BY created_at DESC LIMIT 200`;
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
