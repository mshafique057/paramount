import { useEffect, useState } from 'react';
import { BUSINESS, HOME, SERVICES, FAQS, BLOG } from '../data.js';
import { Input, Text, TextList, ImageField, ItemList } from './fields.jsx';

const TABS = ['Business', 'Homepage', 'Services', 'FAQs', 'Blog', 'Enquiries'];

// Only the fields the dashboard edits. Routes and icons stay fixed in code.
const pickService = (s) => ({
  slug: s.slug,
  title: s.title,
  short: s.short,
  intro: s.intro,
  detail: s.detail,
  problems: s.problems,
  image: s.image,
  alt: s.alt,
});

export default function Editor({ onLogout }) {
  const [draft, setDraft] = useState(() =>
    structuredClone({
      business: BUSINESS,
      home: HOME,
      services: SERVICES.map(pickService),
      faqs: FAQS,
      blog: BLOG,
    })
  );
  const [tab, setTab] = useState(TABS[0]);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const setBusiness = (key, value) => setDraft((d) => ({ ...d, business: { ...d.business, [key]: value } }));
  const setHome = (path, value) => setDraft((d) => {
    const [section, key] = path;
    return { ...d, home: { ...d.home, [section]: { ...d.home[section], [key]: value } } };
  });

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
      setStatus('Saved. Changes are live. Refresh the public site to see them.');
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
  const h = draft.home.hero;

  return (
    <div className="admin-wrap">
      <header className="admin-top">
        <div><strong>Paramount Locksmiths</strong><span className="admin-muted"> · site admin</span></div>
        <div className="admin-actions">
          {status && <span className="admin-status">{status}</span>}
          {tab !== 'Enquiries' && <button className="admin-btn" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>}
          <button className="admin-btn ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Sections">
        {TABS.map((t) => <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </nav>

      <div className="admin-card">
        {tab === 'Business' && <>
          <h2>Business details</h2>
          <p className="admin-note">Phone, email, address and hours are DUMMY placeholders. Replace them with the owner's real details before launch. Keep the phone and email links matching the displayed values.</p>
          <Input label="Business name" value={b.name} onChange={(v) => setBusiness('name', v)} />
          <Input label="Phone (as displayed)" value={b.phoneDisplay} onChange={(v) => setBusiness('phoneDisplay', v)} />
          <Input label="Phone link (tel:+44...)" value={b.phoneHref} onChange={(v) => setBusiness('phoneHref', v)} />
          <Input label="Email (as displayed)" value={b.email} onChange={(v) => setBusiness('email', v)} />
          <Input label="Email link (mailto:...)" value={b.emailHref} onChange={(v) => setBusiness('emailHref', v)} />
          <Input label="Address" value={b.address} onChange={(v) => setBusiness('address', v)} />
          <Input label="Opening hours" value={b.hours} onChange={(v) => setBusiness('hours', v)} />
          <Input label="Map embed URL (Google Maps > Share > Embed a map)" value={b.mapEmbedUrl} onChange={(v) => setBusiness('mapEmbedUrl', v)} />
        </>}

        {tab === 'Homepage' && <>
          <h2>Hero</h2>
          <Input label="Small line above heading" value={h.eyebrow} onChange={(v) => setHome(['hero', 'eyebrow'], v)} />
          <Input label="Main heading" value={h.headline} onChange={(v) => setHome(['hero', 'headline'], v)} />
          <Input label="Words to highlight in amber (must appear in the heading)" value={h.highlight} onChange={(v) => setHome(['hero', 'highlight'], v)} />
          <Text label="Intro paragraph" value={h.sub} onChange={(v) => setHome(['hero', 'sub'], v)} />
          <Input label="Main button text" value={h.ctaPrimary} onChange={(v) => setHome(['hero', 'ctaPrimary'], v)} />
          <Input label="Second button text" value={h.ctaSecondary} onChange={(v) => setHome(['hero', 'ctaSecondary'], v)} />
          <ImageField label="Hero background image" value={h.image} onChange={(v) => setHome(['hero', 'image'], v)} />
          <TextList label="Scrolling ticker words (one per line)" mode="lines" value={draft.home.ticker} onChange={(v) => setDraft((d) => ({ ...d, home: { ...d.home, ticker: v } }))} />

          <h2>About</h2>
          <Input label="Heading" value={draft.home.about.heading} onChange={(v) => setHome(['about', 'heading'], v)} />
          <TextList label="Paragraphs (separate with a blank line)" mode="paragraphs" rows={6} value={draft.home.about.paragraphs} onChange={(v) => setHome(['about', 'paragraphs'], v)} />

          <h2>How it works</h2>
          <Input label="Heading" value={draft.home.process.heading} onChange={(v) => setHome(['process', 'heading'], v)} />
          <ItemList items={draft.home.process.steps} onChange={(v) => setHome(['process', 'steps'], v)} addLabel="Add step" newItem={{ title: 'New step', desc: '' }} />
        </>}

        {tab === 'Services' && <>
          <h2>Services</h2>
          <p className="admin-note">Keep services residential only. Each service keeps its web address. Edit the wording, images and problems listed for each service.</p>
          {draft.services.map((s, i) => <details className="item-card" key={s.slug} open={i === 0}>
            <summary><strong>{s.title}</strong></summary>
            <Input label="Title" value={s.title} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, title: v } : x)) }))} />
            <Text label="Short description (cards)" value={s.short} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, short: v } : x)) }))} />
            <Text label="Intro" rows={4} value={s.intro} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, intro: v } : x)) }))} />
            <Text label="Detail note" rows={3} value={s.detail} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, detail: v } : x)) }))} />
            <TextList label="When you may need this (one per line)" mode="lines" rows={4} value={s.problems} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, problems: v } : x)) }))} />
            <ImageField label="Image" value={s.image} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, image: v } : x)) }))} />
            <Input label="Image description (alt text)" value={s.alt} onChange={(v) => setDraft((d) => ({ ...d, services: d.services.map((x, j) => (j === i ? { ...x, alt: v } : x)) }))} />
          </details>)}
        </>}

        {tab === 'FAQs' && <>
          <h2>Frequently asked questions</h2>
          {draft.faqs.map((f, i) => <div className="item-card" key={i}>
            <Input label={`Question ${i + 1}`} value={f.q} onChange={(v) => setDraft((d) => ({ ...d, faqs: d.faqs.map((x, j) => (j === i ? { ...x, q: v } : x)) }))} />
            <Text label="Answer" rows={3} value={f.a} onChange={(v) => setDraft((d) => ({ ...d, faqs: d.faqs.map((x, j) => (j === i ? { ...x, a: v } : x)) }))} />
            <div className="item-actions">
              <button type="button" className="link danger" onClick={() => setDraft((d) => ({ ...d, faqs: d.faqs.filter((_, j) => j !== i) }))}>Delete question</button>
            </div>
          </div>)}
          <button className="admin-btn" onClick={() => setDraft((d) => ({ ...d, faqs: [...d.faqs, { q: 'New question', a: '' }] }))}>Add question</button>
        </>}

        {tab === 'Blog' && <>
          <h2>Blog posts</h2>
          <BlogEditor posts={draft.blog} onChange={(v) => setDraft((d) => ({ ...d, blog: v }))} />
        </>}

        {tab === 'Enquiries' && <Enquiries />}
      </div>
    </div>
  );
}

function BlogEditor({ posts, onChange }) {
  const update = (i, key, value) => onChange(posts.map((post, idx) => (idx === i ? { ...post, [key]: value } : post)));
  const remove = (i) => onChange(posts.filter((_, idx) => idx !== i));
  const add = () => onChange([...posts, {
    slug: `new-post-${Date.now()}`,
    title: 'New post',
    date: new Date().toISOString().slice(0, 10),
    excerpt: '',
    image: '',
    body: [''],
  }]);

  return <>
    {posts.map((post, i) => <div className="item-card" key={`${post.slug}-${i}`}>
      <Input label="Title" value={post.title} onChange={(v) => update(i, 'title', v)} />
      <div className="two-up">
        <Input label="URL slug (lowercase, dashes)" value={post.slug} onChange={(v) => update(i, 'slug', v)} />
        <Input label="Date" type="date" value={post.date} onChange={(v) => update(i, 'date', v)} />
      </div>
      <Text label="Short summary" value={post.excerpt} onChange={(v) => update(i, 'excerpt', v)} />
      <TextList label="Body (separate paragraphs with a blank line)" mode="paragraphs" rows={8} value={post.body} onChange={(v) => update(i, 'body', v)} />
      <ImageField label="Post image (optional)" value={post.image} onChange={(v) => update(i, 'image', v)} />
      <button className="admin-btn ghost danger" onClick={() => remove(i)}>Delete post</button>
    </div>)}
    <button className="admin-btn" onClick={add}>Add blog post</button>
  </>;
}

function Enquiries() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/enquiries')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Could not load enquiries'))))
      .then(setRows)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!rows) return <p className="admin-muted">Loading enquiries…</p>;
  if (rows.length === 0) return <p className="admin-muted">No enquiries yet.</p>;

  return <>
    <h2>Enquiries ({rows.length})</h2>
    {rows.map((r) => <div className="item-card" key={r.id}>
      <strong>{r.name}</strong>
      <span className="admin-muted">{new Date(r.created_at).toLocaleString('en-GB')}</span>
      <span>Contact: {r.contact}</span>
      {r.postcode && <span>Postcode: {r.postcode}</span>}
      {r.service && <span>Service: {r.service}</span>}
      <p style={{ whiteSpace: 'pre-wrap', margin: '8px 0 0' }}>{r.message}</p>
    </div>)}
  </>;
}
