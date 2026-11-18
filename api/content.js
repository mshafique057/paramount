import { sql } from '@vercel/postgres';
import { requireAdmin } from '../lib/session.js';

// One row holds the whole site content as JSON. Simple to edit, simple to back up.
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id INT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      await ensureTable();
      const { rows } = await sql`SELECT data FROM site_content WHERE id = 1`;
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(rows[0]?.data ?? null);
    }

    if (req.method === 'PUT') {
      if (!requireAdmin(req, res)) return;

      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid content' });
      }

      await ensureTable();
      await sql`
        INSERT INTO site_content (id, data, updated_at)
        VALUES (1, ${JSON.stringify(data)}::jsonb, now())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
