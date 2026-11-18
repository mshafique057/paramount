import { put } from '@vercel/blob';
import { requireAdmin } from '../lib/session.js';

export const config = { api: { bodyParser: false } };

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!requireAdmin(req, res)) return;

  const type = req.headers['content-type'] || '';
  if (!ALLOWED.includes(type)) {
    return res.status(415).json({ error: 'Use JPG, PNG, WebP or SVG' });
  }

  const filename = String(req.query.filename || 'image').replace(/[^a-zA-Z0-9._-]/g, '-');

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BYTES) return res.status(413).json({ error: 'Maximum file size is 5MB' });
    chunks.push(chunk);
  }

  const blob = await put(`site/${Date.now()}-${filename}`, Buffer.concat(chunks), {
    access: 'public',
    contentType: type,
  });

  return res.status(200).json({ url: blob.url });
}
