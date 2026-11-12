import { Info, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { fmtTime } from '../lib/utils';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import TimingsCard from '../components/shared/TimingsCard';

export default function Timings() {
  const { content } = useContent();
  const { timings, temple } = content;
  usePageMeta('Temple Timings', `Daily darshan and pooja timings at ${temple.name}, ${temple.village}, Honnavar.`);

  return (
    <>
      <PageHero
        eyebrow="Darshan & Pooja"
        title="Temple Timings"
        subtitle="Morning and evening darshan sessions, pooja schedule, and seva timings."
        crumb="Timings"
      />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[380px_1fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <TimingsCard />
            <div className="card p-6">
              <p className="flex items-center gap-2 font-display text-xl font-semibold text-maroon-900">
                <Info className="h-5 w-5 text-saffron-500" aria-hidden="true" /> Please Note
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-700/80 leading-relaxed">
                {timings.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
              <div className="mt-6 pt-4 border-t border-cream-300">
                <Link to="/contact" className="btn-primary w-full text-center text-sm !py-2.5">
                  Contact Trust for Timings
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-4xl font-semibold">Daily Schedule</h2>
            </div>
            <ol className="relative mt-10 border-l-2 border-gold-300/60">
              {timings.schedule.map((s, i) => (
                <Reveal as="li" key={`${s.time}-${i}`} delay={i * 0.04} className="relative mb-6 ml-8">
                  <span className="absolute -left-[41px] top-4 h-4 w-4 rounded-full border-2 border-gold-400 bg-saffron-500" aria-hidden="true" />
                  <div className="card flex items-center gap-5 p-4 sm:p-5">
                    <time className="w-28 shrink-0 whitespace-nowrap font-display text-2xl font-semibold text-maroon-800">{fmtTime(s.time)}</time>
                    <p className="text-lg text-ink-700/90">{s.title}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
