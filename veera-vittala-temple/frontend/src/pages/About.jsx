import { Link } from 'react-router-dom';
import { Landmark, Flower2, ScrollText, ArrowRight, ShieldCheck, Clock, Hammer } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';

export default function About() {
  const { content } = useContent();
  const { about, gallery, history, trust, temple } = content;
  usePageMeta('About the Temple', `History, significance, Punar Pratishtha milestones, and trust details of ${temple.name} at ${temple.village}, Honnavar.`);
  const archImgs = gallery.filter((g) => g.category === 'Architecture').slice(0, 2);

  return (
    <>
      <PageHero eyebrow="Spiritual Centre" title="About the Temple" subtitle={about.intro} crumb="About" />

      {/* Main Introduction & Significance */}
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow"><Flower2 className="h-4 w-4" aria-hidden="true" /> Divine Abode</span>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Spiritual Centre for Devotees</h2>
            <div className="mt-6 space-y-4 text-lg text-ink-700/85 leading-relaxed">
              <p>{about.intro}</p>
              <p>{about.activities}</p>
            </div>

            <div className="mt-8 rounded-2xl border-l-4 border-saffron-500 bg-cream-100/70 p-6">
              <h3 className="font-display text-2xl font-semibold text-maroon-900">Religious Significance</h3>
              <p className="mt-3 text-ink-700/85 leading-relaxed">{about.significance}</p>
            </div>

            {/* Managing Trust Card */}
            <div className="mt-8 rounded-2xl border border-gold-300/60 bg-cream-50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Landmark className="h-6 w-6 text-saffron-600" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold text-maroon-950">{trust.name}</h3>
              </div>
              <p className="mt-3 text-ink-700/85 leading-relaxed">
                {trust.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-saffron-700">
                <span className="rounded-full bg-saffron-100 px-3 py-1">Religious Activities</span>
                <span className="rounded-full bg-saffron-100 px-3 py-1">Annual Seva</span>
                <span className="rounded-full bg-saffron-100 px-3 py-1">Temple Maintenance</span>
                <span className="rounded-full bg-saffron-100 px-3 py-1">Development Initiatives</span>
              </div>
            </div>
          </div>

          <Reveal className="space-y-6">
            <div className="card p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">At a Glance</h3>
              <dl className="mt-5 divide-y divide-cream-300 text-sm">
                <div className="flex justify-between gap-4 py-3"><dt className="text-ink-700/70">Temple Name</dt><dd className="text-right font-medium text-maroon-900">{temple.name}</dd></div>
                <div className="flex justify-between gap-4 py-3"><dt className="text-ink-700/70">Kannada</dt><dd className="text-right font-kannada font-medium text-maroon-900">{temple.nameKannada}</dd></div>
                {about.facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 py-3"><dt className="text-ink-700/70">{f.label}</dt><dd className="text-right font-medium text-maroon-900">{f.value}</dd></div>
                ))}
                <div className="flex justify-between gap-4 py-3"><dt className="text-ink-700/70">State & PIN</dt><dd className="text-right font-medium text-maroon-900">{temple.state} – {temple.pincode}</dd></div>
              </dl>
            </div>

            <div className="rounded-2xl bg-maroon-950 p-6 text-cream-100 sm:p-8">
              <Hammer className="h-8 w-8 text-gold-300" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl font-semibold !text-cream-50">Taamra Aachchhadana</h3>
              <p className="mt-2 text-sm text-cream-100/85 leading-relaxed">
                The temple has undertaken the copper roofing project for the Sandhya Mantapa with an estimated budget of ₹30,00,000.
              </p>
              <Link to="/development" className="btn-primary mt-5 inline-flex">
                View Project Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Punar Pratishtha Milestones Section */}
      <section id="history" className="section bg-cream-200/60 scroll-mt-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Historical Inscriptions"
            title="Temple History – Punar Pratishtha"
            subtitle={history.description}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {history.milestones.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 0.1} className="card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-800 text-gold-200">
                      <ScrollText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-gold-200/50 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-maroon-900">
                      {m.samvatsara} Samvatsara
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-maroon-950 sm:text-3xl">{m.title}</h3>
                  <p className="mt-2 font-display text-lg font-medium text-saffron-700">{m.date} ({m.day})</p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-cream-100 p-4 text-sm">
                    <div>
                      <dt className="text-xs uppercase text-ink-700/70">Hindu Calendar</dt>
                      <dd className="mt-0.5 font-medium text-maroon-900">{m.hinduCalendar}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase text-ink-700/70">Ceremony Time</dt>
                      <dd className="mt-0.5 flex items-center gap-1 font-medium text-maroon-900">
                        <Clock className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" />
                        {m.time}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase text-ink-700/70">Auspicious Lagna</dt>
                      <dd className="mt-0.5 font-medium text-maroon-900">{m.lagna}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase text-ink-700/70">Record</dt>
                      <dd className="mt-0.5 flex items-center gap-1 font-medium text-emerald-800">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Temple Inscription
                      </dd>
                    </div>
                  </dl>
                </div>
                <p className="mt-5 border-t border-cream-300 pt-4 text-sm text-ink-700/80 leading-relaxed">
                  {m.inscriptionText}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/history" className="btn-outline">
              Explore History Page <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Temple Architecture */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {archImgs.map((g, i) => (
              <Reveal key={i} delay={i * 0.1} className={i === 1 ? 'mt-10' : ''}>
                <SmartImage src={g.src} alt={g.title} category="Architecture" compact className="aspect-[3/4] rounded-2xl shadow-soft" />
              </Reveal>
            ))}
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Architecture" title="Traditional Temple Sanctity" />
            <ul className="mt-8 space-y-5">
              {about.architecture.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 0.06} className="flex gap-4">
                  <span className="mt-1 rounded-lg bg-maroon-800 p-2 text-gold-200 shrink-0"><Landmark className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <p className="font-display text-xl font-semibold text-maroon-900">{a.title}</p>
                    <p className="mt-1 text-ink-700/80 leading-relaxed">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/deities" className="btn-maroon">Meet the Deities <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/development" className="btn-outline">Taamra Aachchhadana Details</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
