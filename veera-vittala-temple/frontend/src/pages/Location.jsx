import { Navigation, MapPin, Copy, Check, Route, Phone, Landmark, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { telHref } from '../lib/utils';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import MapEmbed, { directionsUrl } from '../components/shared/MapEmbed';

export default function Location() {
  const { content } = useContent();
  const { location, contact, temple } = content;
  usePageMeta('Location & Directions', `Location, address, and directions for ${temple.name} at Maraballi, Honnavar Taluk, Uttara Kannada.`);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked
    }
  };

  const persons = contact.persons || [
    { name: 'Varadaraj Bhat', phone: '99801 50877' },
    { name: 'Narayan Bhat', phone: '95909 39077' },
    { name: 'Raghavendra Bhat', phone: '99867 99700' },
  ];

  return (
    <>
      <PageHero
        eyebrow="Visit Us"
        title="Location & Directions"
        subtitle="Maraballi, Jalavalli Post, Honnavar Taluk, Uttara Kannada District, Karnataka – 581334, India"
        crumb="Location"
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal><MapEmbed className="h-[440px] lg:h-full" /></Reveal>
          <div className="space-y-6">
            <Reveal className="card p-6 sm:p-8">
              <p className="eyebrow"><MapPin className="h-4 w-4" aria-hidden="true" /> Official Address</p>
              <address className="mt-3 text-lg not-italic font-medium text-maroon-950 leading-relaxed">
                {location.address}
              </address>
              <p className="mt-3 text-sm text-ink-700/70">
                Plus Code: {location.plusCode} · Coordinates: {location.lat.toFixed(5)}° N, {location.lng.toFixed(5)}° E
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={directionsUrl(location)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <Navigation className="h-4 w-4" aria-hidden="true" /> Get Directions
                </a>
                <button onClick={copy} className="btn-outline">
                  {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Address'}
                </button>
              </div>
              <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 hover:text-maroon-900">
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open Verified Location in Google Maps
              </a>
            </Reveal>

            <Reveal delay={0.08} className="card p-6 sm:p-8">
              <p className="eyebrow"><Route className="h-4 w-4" aria-hidden="true" /> How to Reach</p>
              <ol className="mt-4 space-y-3.5">
                {location.directions.map((d, i) => (
                  <li key={i} className="flex gap-3 text-ink-700/85">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon-800 text-sm font-semibold text-cream-50">{i + 1}</span>
                    <span className="pt-0.5 leading-relaxed">{d.text}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Contact Trust for Directions Assistance */}
            <Reveal delay={0.12} className="card p-6">
              <p className="font-display text-lg font-semibold text-maroon-900">Need Help with Directions?</p>
              <p className="mt-1 text-sm text-ink-700/75">Feel free to contact the trust members for route guidance:</p>
              <ul className="mt-4 space-y-2 text-sm">
                {persons.map((p) => (
                  <li key={p.name} className="flex items-center justify-between">
                    <span className="font-medium text-maroon-950">{p.name}</span>
                    <a href={telHref(p.phone)} className="font-semibold text-saffron-700 hover:text-maroon-900">
                      <Phone className="inline-block h-3.5 w-3.5 mr-1" aria-hidden="true" />
                      {p.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Regional Information */}
      <section className="section bg-cream-200/60 !pt-0 sm:!pt-0 lg:!pt-0">
        <div className="container-x pt-16">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">Regional Context</h2>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {location.nearby.map((n, i) => (
              <Reveal as="li" key={n.name} delay={i * 0.05} className="card flex items-center gap-4 p-5">
                <span className="rounded-xl bg-saffron-500/10 p-3 text-saffron-700"><Landmark className="h-5 w-5" aria-hidden="true" /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-maroon-900">{n.name}</p>
                  <p className="text-sm text-ink-700/70">{n.distance}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
