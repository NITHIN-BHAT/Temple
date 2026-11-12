import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Megaphone, Landmark, BookOpen, Flower2, Clock, HandHeart, CalendarHeart, Image as ImageIcon, MapPin, Phone, Settings,
  Inbox, Save, LogOut, Download, Loader2, CheckCircle2, AlertCircle, ExternalLink, Menu, X, RotateCcw, Hammer, ScrollText,
} from 'lucide-react';
import { api, tokenStore } from '../../lib/api';
import { useContent } from '../../context/ContentContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import FieldEditor from './FieldEditor';
import Loader from '../../components/ui/Loader';

const SECTIONS = [
  { key: 'announcements', label: 'Announcements', Icon: Megaphone, help: 'Scrolling messages shown on the home page.' },
  { key: 'development', label: 'Taamra Aachchhadana', Icon: Hammer, help: 'Copper roofing development project, budget breakdown, and devotee appeal.' },
  { key: 'annualSeva', label: 'Annual Seva', Icon: HandHeart, help: 'Annual Seva contribution (₹1,025), arrangement and religious significance.' },
  { key: 'history', label: 'History & Milestones', Icon: ScrollText, help: 'Inscriptions recording the First (2006) and Second (2009) Punar Pratishtha.' },
  { key: 'sevas', label: 'Pooja & Seva', Icon: HandHeart, help: 'Seva list, prices and timings. Leave price empty to hide it.' },
  { key: 'timings', label: 'Temple Timings', Icon: Clock, help: 'Darshan sessions (24-hour time), daily schedule and notes.' },
  { key: 'festivals', label: 'Festivals & Events', Icon: CalendarHeart, help: 'Annual festivals and upcoming events (past events hide automatically).' },
  { key: 'gallery', label: 'Gallery', Icon: ImageIcon, help: 'Upload photos. Category creates the gallery filter tabs.' },
  { key: 'deities', label: 'Deities', Icon: Flower2, help: 'Presiding deities (role contains "Presiding") and parivara devatas.' },
  { key: 'about', label: 'About Us', Icon: BookOpen, help: 'Spiritual centre introduction, significance, traditions, architecture.' },
  { key: 'trust', label: 'Temple Trust', Icon: Landmark, help: 'Shree Veer Vittal Mukhyaprana Trust details.' },
  { key: 'temple', label: 'Temple Info', Icon: Landmark, help: 'Name, tagline, welcome message and hero photo.' },
  { key: 'contact', label: 'Contact Info', Icon: Phone, help: 'Trust contact persons, phone numbers, and office details.' },
  { key: 'location', label: 'Location', Icon: MapPin, help: 'Address, map coordinates, directions and nearby places.' },
  { key: 'donation', label: 'Donation & Bank', Icon: HandHeart, help: 'Bank details, UPI ID, and WhatsApp instructions.' },
  { key: 'meta', label: 'Site Settings', Icon: Settings, help: 'Turn off the sample-content notice once all details are confirmed.' },
];

export default function AdminDashboard() {
  usePageMeta('Admin Dashboard', 'Manage temple website content.');
  const { content, setContent, backendOnline, status } = useContent();
  const [params] = useSearchParams();
  const offline = params.get('offline') === '1' || !backendOnline;
  const nav = useNavigate();
  const [active, setActive] = useState('announcements');
  const [draft, setDraft] = useState(content);
  const [state, setState] = useState({ type: 'idle', msg: '' });
  const [authed, setAuthed] = useState(offline ? true : null);
  const [messages, setMessages] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setDraft(content); }, [content]);

  // Verify the session when the backend is available
  useEffect(() => {
    if (status === 'loading') return;
    if (offline) { setAuthed(true); return; }
    if (!tokenStore.get()) { nav('/admin', { replace: true }); return; }
    api('/api/auth/me', { auth: true }).then(() => setAuthed(true)).catch(() => { tokenStore.clear(); nav('/admin', { replace: true }); });
  }, [status, offline, nav]);

  useEffect(() => {
    if (active !== 'messages' || offline) return;
    setMessages(null);
    api('/api/messages', { auth: true }).then(setMessages).catch((e) => setMessages({ error: e.message }));
  }, [active, offline]);

  const dirty = useMemo(() => JSON.stringify(draft[active]) !== JSON.stringify(content[active]), [draft, content, active]);
  const section = SECTIONS.find((s) => s.key === active);

  const save = async () => {
    setState({ type: 'saving', msg: '' });
    try {
      if (!offline) await api(`/api/content/${active}`, { method: 'PUT', body: draft[active], auth: true });
      setContent((c) => ({ ...c, [active]: draft[active] }));
      setState({ type: 'ok', msg: offline ? 'Saved in this browser session. Download the JSON to keep the changes.' : 'Saved — the website is updated.' });
    } catch (e) {
      if (e.status === 401) { tokenStore.clear(); nav('/admin'); return; }
      setState({ type: 'error', msg: e.message });
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify({ ...draft }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'templeData.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const logout = () => { tokenStore.clear(); nav('/admin'); };

  if (authed === null) return <Loader label="Checking session…" />;

  const navItems = [...SECTIONS, ...(offline ? [] : [{ key: 'messages', label: 'Enquiries', Icon: Inbox }])];

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-30 border-b border-cream-300 bg-maroon-950 text-cream-50">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen((o) => !o)} className="rounded-lg p-2 hover:bg-white/10 lg:hidden" aria-label="Toggle sections menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            <p className="font-display text-xl font-semibold">Temple Admin</p>
            {offline && <span className="hidden rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-semibold text-saffron-300 sm:inline">Offline editing</span>}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm hover:bg-white/10 sm:inline-flex"><ExternalLink className="h-4 w-4" /> View site</Link>
            <button onClick={download} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm hover:bg-white/10" title="Download all content as templeData.json"><Download className="h-4 w-4" /> <span className="hidden sm:inline">Export JSON</span></button>
            {!offline && <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm hover:bg-white/10"><LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span></button>}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${menuOpen ? 'block' : 'hidden'} fixed inset-x-0 top-16 z-20 max-h-[calc(100vh-4rem)] overflow-y-auto border-r border-cream-300 bg-cream-50 p-3 shadow-lg lg:sticky lg:block lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0 lg:shadow-none`}>
          <nav aria-label="Admin sections" className="space-y-1">
            {navItems.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => { setActive(key); setState({ type: 'idle' }); setMenuOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${active === key ? 'bg-maroon-800 text-cream-50' : 'text-ink-700 hover:bg-cream-200'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" /> {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-4 pb-32 sm:p-8 sm:pb-32">
          {active === 'messages' ? (
            <Messages data={messages} />
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-semibold sm:text-4xl">{section.label}</h1>
                <p className="mt-1 text-ink-700/70">{section.help}</p>
              </div>
              <div className="card p-4 sm:p-6">
                <FieldEditor value={draft[active]} canUpload={!offline} onChange={(v) => { setDraft((d) => ({ ...d, [active]: v })); setState({ type: 'idle' }); }} />
              </div>
            </>
          )}
        </main>
      </div>

      {active !== 'messages' && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cream-300 bg-cream-50/95 backdrop-blur lg:left-64">
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="min-h-[1.5rem] text-sm" aria-live="polite">
              {state.type === 'ok' && <span className="inline-flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" />{state.msg}</span>}
              {state.type === 'error' && <span className="inline-flex items-center gap-2 text-maroon-700"><AlertCircle className="h-4 w-4" />{state.msg}</span>}
              {state.type === 'idle' && dirty && <span className="text-saffron-600">You have unsaved changes.</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setDraft((d) => ({ ...d, [active]: content[active] })); setState({ type: 'idle' }); }} disabled={!dirty} className="btn-outline !py-2.5"><RotateCcw className="h-4 w-4" /> Discard</button>
              <button onClick={save} disabled={!dirty || state.type === 'saving'} className="btn-primary !py-2.5">
                {state.type === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Messages({ data }) {
  if (!data) return <Loader label="Loading enquiries…" />;
  if (data.error) return <p className="card p-6 text-maroon-700">{data.error}</p>;
  return (
    <>
      <h1 className="text-3xl font-semibold sm:text-4xl">Enquiries</h1>
      <p className="mt-1 text-ink-700/70">Messages sent through the website contact form (newest first).</p>
      {data.length === 0 ? <p className="card mt-6 p-10 text-center text-ink-700/70">No enquiries yet.</p> : (
        <ul className="mt-6 space-y-4">
          {data.map((m) => (
            <li key={m.id} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-maroon-900">{m.name} <span className="ml-2 rounded-full bg-cream-200 px-2 py-0.5 text-xs font-medium text-ink-700">{m.subject}</span></p>
                <time className="text-xs text-ink-700/60">{new Date(m.createdAt).toLocaleString('en-IN')}</time>
              </div>
              <p className="mt-1 text-sm text-ink-700/70">{[m.phone, m.email].filter(Boolean).join(' · ')}</p>
              <p className="mt-3 whitespace-pre-wrap text-ink-700">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
