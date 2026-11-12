import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower2, HeartHandshake, CheckCircle2, MessageCircle, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import TimingsCard from '../components/shared/TimingsCard';

export default function Seva() {
  const { content } = useContent();
  const { annualSeva, sevas, temple } = content;
  usePageMeta('Pooja & Seva – Annual Seva', `Annual Seva arrangement (₹1,025) and religious activities at ${temple.name}, ${temple.village}.`);

  const whatsappMsg = encodeURIComponent(
    `Namaskara, I would like to enrol in the Annual Seva Arrangement (₹1,025) at Shree Veer Vittal Mukhyaprana Temple, Maraballi.\n\nMy details:\n- Full Name:\n- Postal Address:\n- Contact Number:\n- Date of Transfer / UTR Number:`
  );

  return (
    <>
      <PageHero
        eyebrow="Sacred Offerings"
        title="Pooja & Seva"
        subtitle={sevas.intro}
        crumb="Pooja & Seva"
      />

      {/* Dedicated Annual Seva Section */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Special Religious Arrangement"
            title="Annual Seva Arrangement"
            subtitle="The temple invites devotees to participate in its annual religious seva arrangement."
          />

          <Reveal className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border-2 border-gold-400/60 bg-cream-50 shadow-soft">
            <div className="border-temple" aria-hidden="true" />
            <div className="p-8 sm:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-saffron-500/10 px-4 py-1.5 text-sm font-semibold text-saffron-700">
                    <HeartHandshake className="h-4 w-4" aria-hidden="true" /> Featured Sacred Seva
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-bold text-maroon-950 sm:text-4xl">
                    Annual Seva Contribution
                  </h3>
                  <p className="mt-4 text-lg text-ink-700/85 leading-relaxed">
                    {annualSeva.description}
                  </p>
                  <p className="mt-3 text-ink-700/80 leading-relaxed">
                    {annualSeva.significance}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {annualSeva.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-ink-700/85">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link to="/donate" className="btn-primary">
                      Enrol & View Bank Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={`https://wa.me/919980150877?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Enrol via WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-3xl border border-gold-300/60 bg-gradient-to-br from-maroon-900 to-maroon-950 p-8 text-center text-cream-50 shadow-soft sm:p-10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-200">Annual Contribution</span>
                  <span className="mt-2 font-display text-6xl font-bold text-cream-50">{annualSeva.contributionFormatted}</span>
                  <span className="mt-2 text-sm text-cream-200/80">Annual seva arrangement per year</span>
                  <div className="my-6 h-px w-24 bg-gold-400/40" />
                  <p className="text-sm text-cream-100/90 leading-relaxed">
                    Worship is performed on a designated day every year on behalf of the devotee and family.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Supports Temple Worship & Activities
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Traditional Worship & Activities */}
      <section className="section bg-cream-200/50">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Temple Activities"
              title="Traditional Worship & Religious Ceremonies"
              subtitle="The temple is associated with traditional worship, religious ceremonies, annual seva and community devotional activities."
            />

            <div className="mt-10 space-y-6">
              {sevas.items.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08} className="card flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl bg-saffron-500/10 p-3 text-saffron-600">
                          <Flower2 className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-saffron-700">{s.category}</span>
                          <h4 className="font-display text-2xl font-semibold text-maroon-950">{s.name}</h4>
                        </div>
                      </div>
                      {s.price && (
                        <span className="font-display text-3xl font-bold text-maroon-900">
                          {sevas.currency}{s.price}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-ink-700/85 leading-relaxed">{s.description}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-cream-300 pt-4 text-sm text-ink-700/75">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> {s.timing}</span>
                    <Link to={`/contact?subject=${encodeURIComponent(s.name)}`} className="font-semibold text-saffron-700 hover:text-maroon-900">
                      Enquire with Trust →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <TimingsCard />

            <div className="rounded-2xl bg-maroon-950 p-6 text-cream-100 shadow-soft">
              <MessageCircle className="h-7 w-7 text-gold-300" aria-hidden="true" />
              <h4 className="mt-3 font-display text-2xl font-semibold !text-cream-50">Seva Participation</h4>
              <p className="mt-2 text-sm text-cream-100/80 leading-relaxed">
                Devotees interested in enrolling for the Annual Seva or participating in religious ceremonies may contact the temple trust directly.
              </p>
              <div className="mt-6 space-y-2">
                <Link to="/donate" className="btn-primary w-full text-center">
                  Donation & Bank Details
                </Link>
                <Link to="/contact" className="btn-ghost w-full text-center">
                  Contact Trust Members
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
