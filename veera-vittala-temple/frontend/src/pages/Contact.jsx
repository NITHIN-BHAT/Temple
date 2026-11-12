import { useSearchParams } from 'react-router-dom';
import { Phone, MapPin, Users, MessageCircle, Landmark, Navigation, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { telHref } from '../lib/utils';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/shared/ContactForm';
import MapEmbed, { directionsUrl } from '../components/shared/MapEmbed';

export default function Contact() {
  const { content } = useContent();
  const { contact, location, trust, temple } = content;
  const [params] = useSearchParams();
  usePageMeta('Contact Us', `Contact persons, address, and directions for ${temple.name}, ${temple.village}, Honnavar.`);

  const persons = contact.persons || [
    { name: 'Varadaraj Bhat', phone: '99801 50877', phoneRaw: '+919980150877' },
    { name: 'Narayan Bhat', phone: '95909 39077', phoneRaw: '+919590939077' },
    { name: 'Raghavendra Bhat', phone: '99867 99700', phoneRaw: '+919986799700' },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact the Temple Trust"
        subtitle="For seva bookings, annual seva participation, development contributions or any enquiry, reach the temple trust."
        crumb="Contact"
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1.3fr]">
          <Reveal className="space-y-6">
            {/* Contact Persons Card */}
            <div className="card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-saffron-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-maroon-950 sm:text-3xl">Trust Contact Persons</h2>
              </div>
              <p className="mt-2 text-sm text-ink-700/80">
                Please contact any of the trust members below for enquiries or religious seva arrangements:
              </p>

              <ul className="mt-6 space-y-4">
                {persons.map((p) => (
                  <li key={p.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-cream-300 bg-cream-50 p-4">
                    <div>
                      <p className="font-display text-lg font-semibold text-maroon-900">{p.name}</p>
                      <p className="text-sm text-ink-700/70">Trust Representative</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={telHref(p.phoneRaw || p.phone)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-maroon-800 px-3.5 py-2 text-sm font-semibold text-cream-50 hover:bg-maroon-900"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" /> {p.phone}
                      </a>
                      {p.name.includes('Varadaraj') && (
                        <a
                          href={`https://wa.me/919980150877`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-emerald-600 p-2 text-white hover:bg-emerald-700"
                          title="Message on WhatsApp"
                          aria-label="Message on WhatsApp"
                        >
                          <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Managing Trust Details */}
              <div className="mt-8 rounded-2xl bg-cream-100/70 p-5 border-t border-cream-300">
                <div className="flex items-center gap-2 text-saffron-800 font-semibold text-sm">
                  <Landmark className="h-4 w-4" aria-hidden="true" /> {trust.name}
                </div>
                <p className="mt-2 text-xs text-ink-700/85 leading-relaxed">
                  {trust.description}
                </p>
              </div>

              {/* Address */}
              <div className="mt-6 flex gap-4 pt-4 border-t border-cream-300">
                <span className="h-fit rounded-xl bg-maroon-800 p-2.5 text-gold-200">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-saffron-600">Temple Location</p>
                  <address className="mt-1 text-sm not-italic text-maroon-900 leading-relaxed font-medium">
                    {location.address}
                  </address>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href={directionsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-700 hover:text-maroon-900"
                    >
                      <Navigation className="h-3.5 w-3.5" aria-hidden="true" /> Get Directions
                    </a>
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-700 hover:text-maroon-900"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <MapEmbed className="h-72" />
          </Reveal>

          {/* Enquiry Form */}
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-semibold">Send an Enquiry</h2>
            <p className="mb-6 mt-2 text-ink-700/75">
              Fields marked * are required. Please share your phone number or email so the temple trust can reply to your enquiry.
            </p>
            <ContactForm defaultSubject={params.get('subject') || undefined} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
