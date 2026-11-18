import { sql } from '@vercel/postgres';

const LIMITS = { name: 100, contact: 150, postcode: 12, service: 120, message: 2000 };

async function ensureTable() {
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
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

  // Honeypot: real visitors leave this hidden field empty. Bots often fill it in.
  if (body.website) return res.status(200).json({ ok: true });

  const clean = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    clean[key] = String(body[key] || '').trim().slice(0, max);
  }

  if (clean.name.length < 2 || clean.contact.length < 5 || clean.message.length < 10) {
    return res.status(400).json({ error: 'Please check the required fields.' });
  }

  try {
    await ensureTable();
    await sql`
      INSERT INTO enquiries (name, contact, postcode, service, message)
      VALUES (${clean.name}, ${clean.contact}, ${clean.postcode}, ${clean.service}, ${clean.message})`;
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'We could not save your enquiry. Please try again later.' });
  }
}
