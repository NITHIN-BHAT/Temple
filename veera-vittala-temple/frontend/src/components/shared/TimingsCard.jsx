import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { fmtTime, openStatus } from '../../lib/utils';
import SampleTag from '../ui/SampleTag';

export function OpenBadge({ className = '' }) {
  const { content } = useContent();
  const [st, setSt] = useState(() => openStatus(content.timings.sessions, content.timings.timezone));
  useEffect(() => {
    setSt(openStatus(content.timings.sessions, content.timings.timezone));
    const id = setInterval(() => setSt(openStatus(content.timings.sessions, content.timings.timezone)), 60000);
    return () => clearInterval(id);
  }, [content.timings]);
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${st.open ? 'bg-emerald-500/15 text-emerald-700' : 'bg-maroon-600/10 text-maroon-700'} ${className}`}>
      <span className={`relative flex h-2.5 w-2.5`}>
        {st.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${st.open ? 'bg-emerald-500' : 'bg-maroon-600'}`} />
      </span>
      {st.label}
    </span>
  );
}

export default function TimingsCard({ className = '' }) {
  const { content } = useContent();
  const { sessions } = content.timings;
  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold">Darshan Timings</h3>
        <SampleTag show={content.timings.sample} />
      </div>
      <OpenBadge className="mt-4" />
      <ul className="mt-6 space-y-4">
        {sessions.map((s, i) => {
          const Icon = i === 0 ? Sun : Moon;
          return (
            <li key={s.label} className="flex items-center gap-4 rounded-xl bg-cream-100 p-4">
              <span className="rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 p-3 text-white"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <p className="font-semibold text-maroon-900">{s.label}</p>
                <p className="text-ink-700/80">{fmtTime(s.open)} – {fmtTime(s.close)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
