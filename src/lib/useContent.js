import { useEffect, useState } from 'react';
import defaults from '../data/defaultContent.js';

// Merge saved content over the defaults so new fields always have a value.
export function mergeContent(saved) {
  if (!saved) return defaults;
  return { ...defaults, ...saved };
}

export function useContent() {
  const [content, setContent] = useState(defaults);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setContent(mergeContent(data));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return { content };
}

// Turn "01632 960 123" into "01632960123" for tel: links.
export function telHref(phone = '') {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
