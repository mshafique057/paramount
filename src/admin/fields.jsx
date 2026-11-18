import { useState } from 'react';

export function Input({ label, value = '', onChange, type = 'text' }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function Text({ label, value = '', onChange, rows = 3 }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

// Lists and paragraphs are edited as plain text and committed on blur.
// This stops the cursor jumping while typing blank lines.
export function TextList({ label, value = [], onChange, mode = 'lines', rows = 5 }) {
  const [local, setLocal] = useState((value || []).join(mode === 'lines' ? '\n' : '\n\n'));

  function commit() {
    const parts =
      mode === 'lines' ? local.split(/\n/) : local.split(/\n\s*\n/);
    onChange(parts.map((s) => s.trim()).filter(Boolean));
  }

  return (
    <label className="field">
      <span>{label}</span>
      <textarea rows={rows} value={local} onChange={(e) => setLocal(e.target.value)} onBlur={commit} />
    </label>
  );
}

export function ImageField({ label, value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  }

  return (
    <div className="field image-field">
      <span>{label}</span>
      {value && <img className="thumb" src={value} alt="" />}
      <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={upload} disabled={busy} />
      {busy && <small className="admin-muted">Uploading…</small>}
      {error && <small className="error">{error}</small>}
      {value && (
        <button type="button" className="link" onClick={() => onChange('')}>
          Remove image
        </button>
      )}
    </div>
  );
}

// Editable list of { title, desc } items with move, delete and add.
export function ItemList({ items, onChange, addLabel, newItem }) {
  const update = (i, key, value) =>
    onChange(items.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="item-list">
      {items.map((item, i) => (
        <div className="item-card" key={i}>
          <Input label={`Title ${i + 1}`} value={item.title} onChange={(v) => update(i, 'title', v)} />
          <Text label="Description" value={item.desc} onChange={(v) => update(i, 'desc', v)} rows={2} />
          <div className="item-actions">
            <button type="button" className="link" onClick={() => move(i, -1)} disabled={i === 0}>Move up</button>
            <button type="button" className="link" onClick={() => move(i, 1)} disabled={i === items.length - 1}>Move down</button>
            <button type="button" className="link danger" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>Delete</button>
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn" onClick={() => onChange([...items, { ...newItem }])}>
        {addLabel}
      </button>
    </div>
  );
}
