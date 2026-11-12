import { CalendarDays, Clock } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { fmtDate, fmtTime, upcomingEvents } from '../../lib/utils';
import Reveal from '../ui/Reveal';
import SampleTag from '../ui/SampleTag';

export default function UpcomingEvents({ limit, compact = false }) {
  const { content } = useContent();
  const list = upcomingEvents(content.festivals.upcoming).slice(0, limit || undefined);
  if (!list.length) {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <CalendarDays className="h-10 w-10 text-gold-500" aria-hidden="true" />
        <p className="mt-3 font-display text-2xl text-maroon-900">No upcoming events announced</p>
        <p className="mt-1 text-ink-700/70">Please check back soon or contact the temple office.</p>
      </div>
    );
  }
  return (
    <ul className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
      {list.map((e, i) => {
        const d = fmtDate(e.date);
        return (
          <Reveal as="li" key={`${e.title}-${e.date}`} delay={i * 0.06} className="card group flex gap-5 p-5 transition hover:-translate-y-1 hover:shadow-glow">
            <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-maroon-800 to-maroon-950 py-2 text-cream-50">
              <span className="font-display text-3xl font-semibold leading-none">{d.day}</span>
              <span className="mt-1 text-xs uppercase tracking-widest text-gold-200">{d.month}</span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold text-maroon-900">{e.title}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-ink-700/70">
                <span>{d.weekday}, {d.year}</span>
                {e.time && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{fmtTime(e.time)}</span>}
              </p>
              {e.description && <p className="mt-2 text-[0.95rem] text-ink-700/85">{e.description}</p>}
              <SampleTag show={content.festivals.sample} label="Date to be confirmed" className="mt-2" />
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
