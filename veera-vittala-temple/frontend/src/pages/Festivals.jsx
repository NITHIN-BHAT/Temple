import { CalendarHeart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import UpcomingEvents from '../components/shared/UpcomingEvents';

export default function Festivals() {
  const { content } = useContent();
  const { festivals, gallery, temple } = content;
  usePageMeta('Festivals & Religious Ceremonies', `Religious ceremonies and devotional activities at ${temple.name}, ${temple.village}.`);
  const imgs = gallery.filter((g) => g.category === 'Festivals' || g.category === 'Heritage');

  return (
    <>
      <PageHero
        eyebrow="Sacred Celebrations"
        title="Festivals & Religious Ceremonies"
        subtitle="Traditional worship, religious ceremonies, annual seva, and community devotional activities."
        crumb="Festivals"
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Mark Your Calendar" title="Upcoming Events" />
          <div className="mt-12"><UpcomingEvents /></div>
        </div>
      </section>

      <section className="section bg-maroon-950">
        <div className="container-x">
          <SectionHeading light eyebrow="Sacred Observances" title="Religious Ceremonies & Annual Seva" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {festivals.annual.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 0.08}>
                <article className="group h-full overflow-hidden rounded-3xl border border-gold-400/25 bg-maroon-900/60 transition hover:border-gold-300/60">
                  <SmartImage src={imgs[i % Math.max(imgs.length, 1)]?.src} alt={f.name} category="Festivals" compact className="aspect-[16/9] transition duration-700 group-hover:scale-105" />
                  <div className="p-6">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-saffron-300">
                      <CalendarHeart className="h-4 w-4" aria-hidden="true" /> {f.month}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold !text-cream-50">{f.name}</h3>
                    <p className="mt-2 text-cream-100/75 leading-relaxed">{f.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="card mx-auto flex max-w-3xl flex-col items-center p-10 text-center">
            <Sparkles className="h-10 w-10 text-saffron-500" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold">Special Timings on Religious Occasions</h2>
            <p className="mt-3 text-ink-700/80 leading-relaxed">
              The temple is associated with traditional worship, religious ceremonies, annual seva, and community devotional activities. Devotees planning special visits or seva participation are encouraged to contact trust members in advance.
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              Contact Trust Members
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
