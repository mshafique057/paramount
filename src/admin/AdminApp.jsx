import { useEffect, useState } from 'react';
import Login from './Login.jsx';
import Editor from './Editor.jsx';

// The admin screen is not linked from the public site. Search engines are told not to index it.
export default function AdminApp() {
  const [state, setState] = useState('checking'); // checking | out | in

  useEffect(() => {
    document.title = 'Site admin';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';

    fetch('/api/session')
      .then((res) => setState(res.ok ? 'in' : 'out'))
      .catch(() => setState('out'));
  }, []);

  if (state === 'checking') {
    return <div className="admin-wrap"><p className="admin-muted">Checking sign-in…</p></div>;
  }
  if (state === 'out') {
    return <Login onSuccess={() => setState('in')} />;
  }
  return <Editor onLogout={() => setState('out')} />;
}
