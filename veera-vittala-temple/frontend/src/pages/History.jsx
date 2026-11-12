import { Link } from 'react-router-dom';
import { Calendar, Clock, Sparkles, ScrollText, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

export default function History() {
  const { content } = useContent();
  const { history, temple, trust } = content;
  usePageMeta('Temple History – Punar Pratishtha', `Historical milestones and Punar Pratishtha inscriptions of ${temple.name}, ${temple.village}, Honnavar.`);

  return (
    <>
      <PageHero
        eyebrow="Sacred Milestones"
        title="Temple History – Punar Pratishtha"
        subtitle={history.description}
        crumb="History"
      />

      {/* Punar Pratishtha Milestones Section */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Temple Inscriptions"
            title="Punar Pratishtha Milestones"
            subtitle="The temple displays inscriptions recording two important religious ceremonies performed in accordance with traditional Vedic rites."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {history.milestones.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 0.1} className="card relative flex flex-col overflow-hidden border-2 border-gold-300/40 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 to-maroon-800 text-cream-50 shadow-md">
                      <ScrollText className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-saffron-600">Historical Inscription #{idx + 1}</span>
                      <h3 className="font-display text-2xl font-semibold text-maroon-950 sm:text-3xl">{m.title}</h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-gold-200/40 px-3 py-1 font-display text-sm font-semibold text-maroon-900">
                    {m.date.split(' ').slice(-1)[0]}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-cream-100/80 p-5">
                  <p className="font-display text-xl font-semibold text-maroon-900">{m.date} · {m.day}</p>
                  <p className="mt-1 text-sm font-medium text-saffron-700">Hindu Calendar: {m.hinduCalendar}</p>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-cream-300/70 pt-6">
                  <div className="rounded-xl border border-cream-300/80 bg-cream-50 p-3.5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700/70">Samvatsara</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-maroon-900">{m.samvatsara}</dd>
                  </div>
                  <div className="rounded-xl border border-cream-300/80 bg-cream-50 p-3.5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700/70">Auspicious Lagna</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-maroon-900">{m.lagna}</dd>
                  </div>
                  <div className="rounded-xl border border-cream-300/80 bg-cream-50 p-3.5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700/70">Ceremony Time</dt>
                    <dd className="mt-1 flex items-center gap-1.5 font-display text-lg font-semibold text-maroon-900">
                      <Clock className="h-4 w-4 text-saffron-600" aria-hidden="true" />
                      {m.time}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-cream-300/80 bg-cream-50 p-3.5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700/70">Documentation</dt>
                    <dd className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Recorded on Temple Inscription
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 flex-1 text-ink-700/85 leading-relaxed">
                  {m.inscriptionText}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Authentic Inscription Note */}
          <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold-300/50 bg-cream-100 p-6 text-center text-sm text-ink-700/85 shadow-sm">
            <p className="font-medium text-maroon-900">
              <Sparkles className="inline-block h-4 w-4 text-saffron-600 mr-1.5 -mt-0.5" aria-hidden="true" />
              {history.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Trust & Ongoing Traditions */}
      <section className="section bg-maroon-950 text-cream-100">
        <div className="container-x">
          <div className="mx-auto max-w-4xl text-center">
            <Landmark className="mx-auto h-12 w-12 text-gold-300" aria-hidden="true" />
            <Reveal>
              <h2 className="mt-4 font-display text-3xl font-semibold !text-cream-50 sm:text-4xl">
                {trust.name}
              </h2>
            </Reveal>
            <p className="mt-4 text-lg text-cream-100/90 leading-relaxed">
              {trust.description}
            </p>

            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-gold-300/30 bg-maroon-900/60 p-5">
                <p className="font-display text-xl font-semibold text-gold-200">Traditional Worship</p>
                <p className="mt-2 text-sm text-cream-100/80">Conducting regular pooja rituals, daily mangalarati, and religious ceremonies for Lord Veer Vittal and Lord Mukhyaprana.</p>
              </div>
              <div className="rounded-2xl border border-gold-300/30 bg-maroon-900/60 p-5">
                <p className="font-display text-xl font-semibold text-gold-200">Annual Seva</p>
                <p className="mt-2 text-sm text-cream-100/80">Coordinating the annual seva arrangement (₹1,025) under which worship is performed on a designated day every year.</p>
              </div>
              <div className="rounded-2xl border border-gold-300/30 bg-maroon-900/60 p-5">
                <p className="font-display text-xl font-semibold text-gold-200">Development</p>
                <p className="mt-2 text-sm text-cream-100/80">Spearheading temple initiatives such as the Taamra Aachchhadana copper roofing project for the Sandhya Mantapa.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/seva" className="btn-primary">
                Annual Seva Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/development" className="btn-ghost">
                Development Project (Taamra Aachchhadana)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
