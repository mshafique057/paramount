import { BUSINESS, HOME, SERVICES, FAQS, BLOG } from '../data.js';

// Fields the admin dashboard is allowed to change for each service.
const SERVICE_FIELDS = ['title', 'short', 'intro', 'detail', 'problems', 'image', 'alt'];

// Applies content saved in the database over the defaults in data.js.
// Runs once before the React app renders, so components always read the saved values.
export function applyContent(saved) {
  if (!saved || typeof saved !== 'object') return;

  if (saved.business) Object.assign(BUSINESS, saved.business);
  if (saved.home) Object.assign(HOME, saved.home);

  if (Array.isArray(saved.services)) {
    for (const item of saved.services) {
      const service = SERVICES.find((s) => s.slug === item.slug);
      if (!service) continue;
      for (const key of SERVICE_FIELDS) {
        if (item[key] !== undefined) service[key] = item[key];
      }
    }
  }

  if (Array.isArray(saved.faqs)) FAQS.splice(0, FAQS.length, ...saved.faqs);
  if (Array.isArray(saved.blog)) BLOG.splice(0, BLOG.length, ...saved.blog);
}

export async function loadContent() {
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 3000));
  const request = fetch('/api/content')
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
  applyContent(await Promise.race([request, timeout]));
}
