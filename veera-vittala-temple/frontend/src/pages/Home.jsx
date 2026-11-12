import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Navigation, Flower2, Megaphone, Sparkles, Landmark, Hammer, ScrollText, HeartHandshake } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import TempleIllustration from '../components/art/TempleIllustration';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import { directionsUrl } from '../components/shared/MapEmbed';
import { assetUrl } from '../lib/api';

function Hero() {
  const { content } = useContent();
  const { temple } = content;
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-maroon-950" aria-label="Welcome">
      <motion.div style={{ y }} className="absolute inset-0">
        {temple.heroImage
          ? <img src={assetUrl(temple.heroImage)} alt={temple.name} className="h-full w-full object-cover" />
          : <TempleIllustration className="h-full w-full" />}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/60 via-maroon-950/20 to-maroon-950/80" aria-hidden="true" />
      {/* rising embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="ember absolute bottom-10 h-1.5 w-1.5 rounded-full bg-gold-200/80 blur-[1px]"
            style={{ left: `${(i * 37) % 100}%`, animationDuration: `${7 + (i % 5)}s`, animationDelay: `${(i * 0.9) % 7}s` }} />
        ))}
      </div>

      <motion.div style={{ opacity: fade }} className="container-x relative z-10 pb-36 pt-32 text-center sm:pb-28">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
          className="font-kannada text-lg text-gold-200 sm:text-2xl">{temple.nameKannada}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-5xl text-5xl font-semibold !leading-[1.02] !text-cream-50 sm:text-7xl lg:text-8xl">
          Shree Veer Vittal <span className="gold-text italic">Mukhyaprana</span> Temple
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cream-200/90">
          <MapPin className="h-4 w-4 text-saffron-400" aria-hidden="true" /> {temple.village}, {temple.post} · Honnavar Taluk
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-6 max-w-3xl text-lg text-cream-100/90 sm:text-xl leading-relaxed">{temple.welcome}</motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/about" className="btn-primary w-full sm:w-auto">About Temple <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link to="/development" className="btn-secondary w-full sm:w-auto">Taamra Aachchhadana Project</Link>
          <Link to="/location" className="btn-ghost w-full sm:w-auto"><Navigation className="h-4 w-4" aria-hidden="true" /> View Location</Link>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block" aria-hidden="true">
        <div className="flex h-10 w-6 justify-center rounded-full border border-cream-200/40 pt-2"><span className="h-2 w-1 animate-bounce rounded-full bg-gold-200" /></div>
      </div>
    </section>
  );
}

function QuickInfo() {
  const { content } = useContent();
  const items = [
    { Icon: Flower2, title: 'Presiding Deities', body: 'Lord Veer Vittal & Lord Mukhyaprana', to: '/deities' },
    { Icon: HeartHandshake, title: 'Annual Seva', body: '₹1,025 · Annual worship arrangement', to: '/seva' },
    { Icon: Hammer, title: 'Development', body: 'Taamra Aachchhadana (₹30 Lakhs)', to: '/development' },
    { Icon: MapPin, title: 'Location', body: `${content.temple.village}, Honnavar Taluk`, to: '/location' },
  ];
  return (
    <section className="relative z-20 -mt-16" aria-label="Quick information">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-2xl border border-gold-300/40 bg-cream-50 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, body, to }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <Link to={to} className="group flex h-full items-start gap-4 border-b border-cream-300/70 p-6 transition hover:bg-cream-100 sm:border-r lg:border-b-0">
                <span className="rounded-xl bg-maroon-800 p-3 text-gold-200 transition group-hover:bg-saffron-500 group-hover:text-white"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-saffron-600">{title}</span>
                  <span className="mt-1 block font-medium text-maroon-900">{body}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Announcements() {
  const { content } = useContent();
  const list = content.announcements?.filter((a) => a.text) || [];
  if (!list.length) return null;
  const doubled = [...list, ...list, ...list, ...list];
  return (
    <div className="mt-12 overflow-hidden border-y border-gold-300/40 bg-maroon-900 py-3 text-cream-100" role="region" aria-label="Announcements">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
        {doubled.map((a, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[0.95rem]" aria-hidden={i >= list.length}>
            <Megaphone className="h-4 w-4 text-saffron-400" aria-hidden="true" /> {a.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function AboutTeaser() {
  const { content } = useContent();
  const { about, gallery } = content;
  const img = gallery.find((g) => g.category === 'Architecture');
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-gold-400/50" aria-hidden="true" />
          <SmartImage src={img?.src} alt={img?.title || 'Temple'} category="Architecture" className="relative aspect-[4/5] rounded-[2rem] shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]" />
          <div className="absolute -top-6 right-4 rounded-2xl bg-maroon-900 px-6 py-4 text-cream-50 shadow-soft sm:right-8">
            <p className="font-display text-2xl font-semibold text-gold-200">Spiritual Centre</p>
            <p className="text-xs uppercase tracking-widest text-cream-200/80">Maraballi · Honnavar</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading align="left" eyebrow="About the Temple" title="Dedicated to Lord Veer Vittal & Lord Mukhyaprana" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-ink-700/85 leading-relaxed">{about.intro}</p>
            <p className="mt-4 text-ink-700/80 leading-relaxed">{about.activities}</p>
            <p className="mt-4 text-ink-700/80 leading-relaxed">{about.significance}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {about.facts.slice(0, 4).map((f) => (
                <div key={f.label} className="rounded-xl border border-cream-300 bg-cream-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-saffron-600">{f.label}</p>
                  <p className="mt-1 font-medium text-maroon-900">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-maroon">About Temple Details <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/history" className="btn-outline">History & Milestones <ScrollText className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HistoryMilestonesTeaser() {
  const { content } = useContent();
  const { history } = content;
  return (
    <section className="section bg-cream-200/50">
      <div className="container-x">
        <SectionHeading
          eyebrow="Temple Inscriptions"
          title="Punar Pratishtha Milestones"
          subtitle="The temple displays inscriptions recording two important religious ceremonies performed in accordance with traditional Vedic rites."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {history.milestones.map((m, idx) => (
            <Reveal key={m.title} delay={idx * 0.1} className="card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-800 text-gold-200">
                    <ScrollText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-saffron-800">
                    {m.samvatsara} Samvatsara
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-maroon-950 sm:text-3xl">{m.title}</h3>
                <p className="mt-2 font-display text-lg font-medium text-saffron-700">{m.date} ({m.day})</p>
                <dl className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-cream-100/70 p-3 text-sm">
                  <div><span className="text-xs uppercase text-ink-700/70">Calendar:</span> <span className="font-medium text-maroon-900">{m.hinduCalendar}</span></div>
                  <div><span className="text-xs uppercase text-ink-700/70">Time:</span> <span className="font-medium text-maroon-900">{m.time} ({m.lagna})</span></div>
                </dl>
              </div>
              <p className="mt-5 text-sm text-ink-700/80 leading-relaxed border-t border-cream-300 pt-4">
                {m.inscriptionText}
              </p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/history" className="btn-outline">
            View Complete History & Inscriptions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DevelopmentTeaser() {
  const { content } = useContent();
  const { development } = content;
  return (
    <section className="section bg-maroon-950 text-cream-100">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-200">
              <Hammer className="h-3.5 w-3.5" aria-hidden="true" /> Sacred Project
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold !text-cream-50 sm:text-5xl">
              Taamra Aachchhadana
            </h2>
            <p className="mt-2 text-xl text-gold-200 font-display">
              Copper Roofing Project for the Sandhya Mantapa
            </p>
            <p className="mt-6 text-lg text-cream-100/85 leading-relaxed">
              {development.description}
            </p>

            <blockquote className="mt-6 border-l-2 border-gold-400/60 pl-5 font-serif text-base italic text-cream-100/90 leading-relaxed">
              "{development.appeal}"
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/development" className="btn-primary">
                View Project & Contribute <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/donate" className="btn-ghost">
                Donation Details
              </Link>
            </div>
          </div>

          <Reveal className="card !bg-maroon-900/80 !border-gold-400/30 p-6 sm:p-8 text-cream-100">
            <h3 className="font-display text-2xl font-semibold !text-cream-50">Project Budget Summary</h3>
            <p className="mt-1 text-sm text-gold-200">Sandhya Mantapa Rooftop Cladding</p>
            <dl className="mt-6 space-y-4 divide-y divide-white/10">
              {development.items.map((it) => (
                <div key={it.category} className="flex justify-between gap-4 pt-3 first:pt-0">
                  <dt className="text-sm text-cream-200/80">{it.category}</dt>
                  <dd className="font-display font-semibold text-gold-200">{it.amountFormatted}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 pt-4 border-t-2 border-gold-400/40">
                <dt className="font-display text-lg font-semibold text-cream-50">Total Estimated Cost</dt>
                <dd className="font-display text-2xl font-bold text-gold-300">{development.totalCostFormatted}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DeitiesPreview() {
  const { content } = useContent();
  return (
    <section className="section relative overflow-hidden bg-cream-100">
      <div className="container-x relative">
        <SectionHeading eyebrow="Divine Presence" title="The Presiding Deities" subtitle="Lord Shree Veer Vittal and Lord Shree Mukhyaprana bless devotees together in this sacred shrine." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {content.deities.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1}>
              <Link to={`/deities#${d.id}`} className="group relative block overflow-hidden rounded-3xl border border-gold-400/30 bg-maroon-950">
                <SmartImage src={d.image} alt={d.name} category="Deities" compact className="aspect-[4/5] sm:aspect-[4/3] transition duration-700 group-hover:scale-105 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/50 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-kannada text-gold-200">{d.nameKannada}</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">{d.name}</p>
                  <p className="mt-2 line-clamp-3 text-cream-100/85 leading-relaxed">{d.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-saffron-300 transition group-hover:gap-3">Read significance <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SevaTeaser() {
  const { content } = useContent();
  const { annualSeva } = content;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Sacred Offerings" title="Annual Seva Arrangement" subtitle="The temple invites devotees to participate in its annual religious seva arrangement." />
        <Reveal className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-gold-300/60 bg-cream-50 p-8 sm:p-10 shadow-soft">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-saffron-700">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" /> Annual Religious Seva
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold text-maroon-950">Participation in Annual Worship</h3>
              <p className="mt-4 text-ink-700/85 leading-relaxed">
                {annualSeva.description}
              </p>
              <p className="mt-3 text-sm text-ink-700/80 leading-relaxed">
                {annualSeva.significance}
              </p>
              <div className="mt-6">
                <Link to="/seva" className="btn-primary">
                  Learn More & Enrol <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-maroon-900 to-maroon-950 p-8 text-center text-cream-50">
              <span className="text-xs uppercase tracking-widest text-gold-200">Annual Contribution</span>
              <span className="mt-2 font-display text-5xl font-bold text-cream-50">{annualSeva.contributionFormatted}</span>
              <span className="mt-2 text-xs text-cream-200/80">Per family / year</span>
              <span className="mt-4 text-xs text-gold-200/90 leading-tight">Worship performed on a designated day every year</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const { content } = useContent();
  const imgs = content.gallery.slice(0, 5);
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <SectionHeading eyebrow="Glimpses" title="Photo Gallery" />
        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4">
          {imgs.map((g, i) => (
            <Reveal key={i} delay={i * 0.05} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <Link to="/gallery" className="group block h-full overflow-hidden rounded-2xl" aria-label={`Open gallery: ${g.title}`}>
                <SmartImage src={g.src} alt={g.title} category={g.category} compact={i !== 0} className="h-full transition duration-700 group-hover:scale-105" />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/gallery" className="btn-outline">Open gallery <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}

function VisitCta() {
  const { content } = useContent();
  return (
    <section className="section relative overflow-hidden bg-temple-dusk">
      <div className="kolam-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-x relative text-center">
        <Landmark className="mx-auto h-12 w-12 text-gold-200" aria-hidden="true" />
        <Reveal><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold !text-cream-50 sm:text-5xl">Plan your visit to {content.temple.village}</h2></Reveal>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cream-100/85">{content.location.address}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={directionsUrl(content.location)} target="_blank" rel="noopener noreferrer" className="btn-primary"><Navigation className="h-4 w-4" aria-hidden="true" /> Get Directions</a>
          <Link to="/contact" className="btn-ghost">Contact the Temple Trust</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta('', 'Shree Veer Vittal Mukhyaprana Temple at Maraballi, Honnavar Taluk, Uttara Kannada — worship, history, annual seva, Taamra Aachchhadana copper roofing project, and directions.');
  return (
    <>
      <Hero />
      <QuickInfo />
      <Announcements />
      <AboutTeaser />
      <HistoryMilestonesTeaser />
      <DevelopmentTeaser />
      <DeitiesPreview />
      <SevaTeaser />
      <GalleryPreview />
      <VisitCta />
    </>
  );
}
