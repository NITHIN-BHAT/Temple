import { Sparkles, Flower2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import SectionHeading from '../components/ui/SectionHeading';

export default function Deities() {
  const { content } = useContent();
  usePageMeta('Presiding Deities', `Lord Shree Veer Vittal and Lord Shree Mukhyaprana worshipped at ${content.temple.name}, ${content.temple.village}.`);
  const main = content.deities.filter((d) => /presiding|main/i.test(d.role));
  const others = content.deities.filter((d) => !/presiding|main/i.test(d.role));

  return (
    <>
      <PageHero
        eyebrow="Divine Presence"
        title="Presiding Deities"
        subtitle="The sacred presiding deities, Lord Shree Veer Vittal and Lord Shree Mukhyaprana, worshipped at the shrine."
        crumb="Deities"
      />

      <section className="section">
        <div className="container-x space-y-20">
          {main.map((d, i) => (
            <article id={d.id} key={d.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <div className="relative mx-auto max-w-md">
                  <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-3xl bg-gradient-to-br from-gold-300 to-saffron-500 opacity-60" aria-hidden="true" />
                  <SmartImage src={d.image} alt={d.name} category="Deities" className="relative aspect-[3/4] rounded-t-full rounded-b-3xl border-4 border-cream-50 shadow-soft" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-saffron-700">
                  <Flower2 className="h-3.5 w-3.5" aria-hidden="true" /> {d.role}
                </span>
                <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{d.name}</h2>
                <p className="mt-2 font-kannada text-2xl text-saffron-600">{d.nameKannada}</p>
                <p className="mt-6 text-lg text-ink-700/85 leading-relaxed">{d.description}</p>
                <div className="mt-6 rounded-2xl border-l-4 border-saffron-500 bg-cream-50 p-5 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-saffron-600">
                    <Sparkles className="h-4 w-4" aria-hidden="true" /> Religious Significance
                  </p>
                  <p className="mt-2 text-ink-700/85 leading-relaxed">{d.significance}</p>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section bg-cream-200/60">
          <div className="container-x">
            <SectionHeading eyebrow="Parivara Devatas" title="Other Deities" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((d, i) => (
                <Reveal key={d.id} delay={i * 0.08}>
                  <article id={d.id} className="card h-full scroll-mt-28 overflow-hidden">
                    <SmartImage src={d.image} alt={d.name} category="Deities" compact className="aspect-[4/3]" />
                    <div className="p-6">
                      <p className="font-kannada text-saffron-600">{d.nameKannada}</p>
                      <h3 className="mt-1 text-2xl font-semibold">{d.name}</h3>
                      <p className="mt-2 text-ink-700/80">{d.description}</p>
                      <p className="mt-3 text-sm text-ink-700/70"><span className="font-semibold text-maroon-800">Significance: </span>{d.significance}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
