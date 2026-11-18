import { useEffect, useState } from 'react';
import { mergeContent } from '../lib/useContent.js';
import { Input, Text, TextList, ImageField, ItemList } from './fields.jsx';

const TABS = ['Business', 'Hero', 'Services', 'About & process', 'Areas', 'Blog'];

export default function Editor({ onLogout }) {
  const [draft, setDraft] = useState(null);
  const [tab, setTab] = useState(TABS[0]);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setDraft(structuredClone(mergeContent(data))))
      .catch(() => setDraft(structuredClone(mergeContent(null))));
  }, []);

  if (!draft) {
    return <div className="admin-wrap"><p className="admin-muted">Loading content…</p></div>;
  }

  const setSection = (section, key, value) =>
    setDraft((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));

  const setTop = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  async function save() {
    setSaving(true);
    setStatus('Saving…');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (res.status === 401) throw new Error('You have been signed out. Sign in again and retry.');
      if (!res.ok) throw new Error('Save failed. Please try again.');
      setStatus('Saved. Changes are live on the site.');
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await fetch('/api/logout', { method: 'POST' });
    onLogout();
  }

  const b = draft.business;
  const h = draft.hero;
  const s = draft.services;
  const a = draft.about;
  const p = draft.process;
  const ar = draft.areas;

  return (
    <div className="admin-wrap">
      <header className="admin-top">
        <div>
          <strong>Paramount Locksmiths</strong>
          <span className="admin-muted"> · site admin</span>
        </div>
        <div className="admin-actions">
          {status && <span className="admin-status">{status}</span>}
          <button className="admin-btn" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button className="admin-btn ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Sections">
        {TABS.map((t) => (
          <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>

      <div className="admin-card">
        {tab === 'Business' && (
          <>
            <h2>Business details</h2>
            <p className="admin-note">
              The phone, email, address and hours are placeholders. Replace them with the owner's real details before going live.
            </p>
            <Input label="Business name" value={b.name} onChange={(v) => setSection('business', 'name', v)} />
            <Input label="Tagline" value={b.tagline} onChange={(v) => setSection('business', 'tagline', v)} />
            <Input label="Phone" value={b.phone} onChange={(v) => setSection('business', 'phone', v)} />
            <Input label="Email" value={b.email} onChange={(v) => setSection('business', 'email', v)} />
            <Input label="Address" value={b.address} onChange={(v) => setSection('business', 'address', v)} />
            <Input label="Opening hours" value={b.hours} onChange={(v) => setSection('business', 'hours', v)} />
            <Input
              label="Map embed URL (from Google Maps, Share > Embed a map)"
              value={b.mapEmbedUrl}
              onChange={(v) => setSection('business', 'mapEmbedUrl', v)}
            />
          </>
        )}

        {tab === 'Hero' && (
          <>
            <h2>Homepage hero</h2>
            <Input label="Small line above heading" value={h.eyebrow} onChange={(v) => setSection('hero', 'eyebrow', v)} />
            <Input label="Main heading" value={h.headline} onChange={(v) => setSection('hero', 'headline', v)} />
            <Input
              label="Words to highlight in yellow (must appear in the heading)"
              value={h.highlight}
              onChange={(v) => setSection('hero', 'highlight', v)}
            />
            <Text label="Intro paragraph" value={h.sub} onChange={(v) => setSection('hero', 'sub', v)} />
            <Input label="Main button text" value={h.ctaPrimary} onChange={(v) => setSection('hero', 'ctaPrimary', v)} />
            <Input label="Second button text" value={h.ctaSecondary} onChange={(v) => setSection('hero', 'ctaSecondary', v)} />
            <ImageField label="Hero background image" value={h.image} onChange={(v) => setSection('hero', 'image', v)} />
            <TextList
              label="Scrolling ticker words (one per line)"
              mode="lines"
              value={draft.marquee}
              onChange={(v) => setTop('marquee', v)}
            />
          </>
        )}

        {tab === 'Services' && (
          <>
            <h2>Services</h2>
            <p className="admin-note">Keep services residential only. Remove anything the owner does not offer.</p>
            <Input label="Section heading" value={s.heading} onChange={(v) => setSection('services', 'heading', v)} />
            <Text label="Section intro" value={s.intro} onChange={(v) => setSection('services', 'intro', v)} />
            <ItemList
              items={s.items}
              onChange={(v) => setSection('services', 'items', v)}
              addLabel="Add service"
              newItem={{ title: 'New service', desc: '' }}
            />
          </>
        )}

        {tab === 'About & process' && (
          <>
            <h2>About</h2>
            <Input label="Small line above heading" value={a.eyebrow} onChange={(v) => setSection('about', 'eyebrow', v)} />
            <Input label="Heading" value={a.heading} onChange={(v) => setSection('about', 'heading', v)} />
            <TextList
              label="Paragraphs (separate with a blank line)"
              mode="paragraphs"
              rows={8}
              value={a.paragraphs}
              onChange={(v) => setSection('about', 'paragraphs', v)}
            />
            <ImageField label="About image (optional)" value={a.image} onChange={(v) => setSection('about', 'image', v)} />

            <h2>How it works</h2>
            <Input label="Heading" value={p.heading} onChange={(v) => setSection('process', 'heading', v)} />
            <ItemList
              items={p.steps}
              onChange={(v) => setSection('process', 'steps', v)}
              addLabel="Add step"
              newItem={{ title: 'New step', desc: '' }}
            />
          </>
        )}

        {tab === 'Areas' && (
          <>
            <h2>Areas covered</h2>
            <p className="admin-note">Only list areas the owner actually covers.</p>
            <Input label="Heading" value={ar.heading} onChange={(v) => setSection('areas', 'heading', v)} />
            <Text label="Intro" value={ar.intro} onChange={(v) => setSection('areas', 'intro', v)} />
            <TextList
              label="Areas (one per line)"
              mode="lines"
              rows={8}
              value={ar.towns}
              onChange={(v) => setSection('areas', 'towns', v)}
            />
          </>
        )}

        {tab === 'Blog' && (
          <>
            <h2>Blog posts</h2>
            <BlogEditor
              posts={draft.blog}
              onChange={(v) => setTop('blog', v)}
            />
          </>
        )}
      </div>
    </div>
  );
}

function BlogEditor({ posts, onChange }) {
  const update = (i, key, value) =>
    onChange(posts.map((post, idx) => (idx === i ? { ...post, [key]: value } : post)));

  const remove = (i) => onChange(posts.filter((_, idx) => idx !== i));

  const add = () =>
    onChange([
      ...posts,
      {
        slug: `new-post-${Date.now()}`,
        title: 'New post',
        date: new Date().toISOString().slice(0, 10),
        excerpt: '',
        image: '',
        body: [''],
      },
    ]);

  return (
    <>
      {posts.map((post, i) => (
        <div className="item-card" key={`${post.slug}-${i}`}>
          <Input label="Title" value={post.title} onChange={(v) => update(i, 'title', v)} />
          <div className="two-up">
            <Input label="URL slug (lowercase, dashes)" value={post.slug} onChange={(v) => update(i, 'slug', v)} />
            <Input label="Date" type="date" value={post.date} onChange={(v) => update(i, 'date', v)} />
          </div>
          <Text label="Short summary" value={post.excerpt} onChange={(v) => update(i, 'excerpt', v)} />
          <TextList
            label="Body (separate paragraphs with a blank line)"
            mode="paragraphs"
            rows={8}
            value={post.body}
            onChange={(v) => update(i, 'body', v)}
          />
          <ImageField label="Post image (optional)" value={post.image} onChange={(v) => update(i, 'image', v)} />
          <button className="admin-btn ghost danger" onClick={() => remove(i)}>Delete post</button>
        </div>
      ))}
      <button className="admin-btn" onClick={add}>Add blog post</button>
    </>
  );
}
