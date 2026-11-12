import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Loader2, AlertCircle, ServerOff } from 'lucide-react';
import { api, tokenStore } from '../../lib/api';
import { useContent } from '../../context/ContentContext';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function AdminLogin() {
  usePageMeta('Admin Login', 'Temple administrators sign in.');
  const { backendOnline, status } = useContent();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const { token } = await api('/api/auth/login', { method: 'POST', body: form });
      tokenStore.set(token);
      nav('/admin/dashboard');
    } catch (e2) {
      setErr(e2.status === 401 ? 'Incorrect username or password.' : e2.message);
    } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-temple-dusk p-4">
      <div className="w-full max-w-md rounded-3xl bg-cream-50 p-8 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon-800 text-gold-200"><Lock className="h-6 w-6" aria-hidden="true" /></div>
        <h1 className="mt-4 text-center text-3xl font-semibold">Temple Admin</h1>
        <p className="mt-1 text-center text-sm text-ink-700/70">Authorised temple administrators only</p>

        {status !== 'loading' && !backendOnline && (
          <div className="mt-6 flex gap-3 rounded-xl bg-saffron-300/20 p-4 text-sm text-ink-700">
            <ServerOff className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden="true" />
            <div>
              <p>The admin server is not reachable, so sign-in is unavailable.</p>
              <p className="mt-1">You can still <Link to="/admin/dashboard?offline=1" className="font-semibold text-maroon-800 underline">edit content offline</Link> and download the updated <code>templeData.json</code>.</p>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label htmlFor="u" className="label">Username</label><input id="u" className="input" autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></div>
          <div><label htmlFor="p" className="label">Password</label><input id="p" type="password" className="input" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
          {err && <p role="alert" className="flex items-center gap-2 rounded-xl bg-maroon-50 p-3 text-sm text-maroon-700"><AlertCircle className="h-4 w-4" aria-hidden="true" />{err}</p>}
          <button className="btn-maroon w-full" disabled={busy || !backendOnline}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />} Sign in</button>
        </form>
        <Link to="/" className="mt-6 block text-center text-sm text-ink-700/70 hover:text-maroon-800">← Back to website</Link>
      </div>
    </div>
  );
}
