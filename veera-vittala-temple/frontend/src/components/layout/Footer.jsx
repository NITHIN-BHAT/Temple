import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Landmark, HeartHandshake } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { fmtTime, telHref } from '../../lib/utils';
import { NAV } from './nav';

export default function Footer() {
  const { content } = useContent();
  const { temple, contact, location, timings, trust } = content;
  const persons = contact.persons || [
    { name: 'Varadaraj Bhat', phone: '99801 50877' },
    { name: 'Narayan Bhat', phone: '95909 39077' },
    { name: 'Raghavendra Bhat', phone: '99867 99700' },
  ];

  return (
    <footer className="relative bg-maroon-950 text-cream-200/80">
      <div className="border-temple" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-semibold text-cream-50">{temple.name}</p>
          <p className="mt-1 font-kannada text-gold-200/90">{temple.nameKannada}</p>
          <p className="mt-3 text-xs uppercase tracking-wider text-saffron-400 font-semibold">{trust.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream-200/70">
            {temple.tagline}. A sacred spiritual centre dedicated to Lord Veer Vittal and Lord Mukhyaprana at Maraballi, Honnavar Taluk.
          </p>
        </div>

        <div>
          <p className="font-display text-lg font-semibold text-gold-200">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold-200">{n.label}</Link></li>)}
            <li><Link to="/donate" className="hover:text-gold-200">Donate</Link></li>
            <li><Link to="/location" className="hover:text-gold-200">Location</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-semibold text-gold-200">Darshan & Pooja</p>
          <ul className="mt-4 space-y-3 text-sm">
            {timings.sessions.map((s) => (
              <li key={s.label} className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron-400" aria-hidden="true" />
                <span><span className="block text-cream-50 font-medium">{s.label}</span>{fmtTime(s.open)} – {fmtTime(s.close)}</span>
              </li>
            ))}
            <li className="pt-2 text-xs text-gold-200/80 leading-relaxed border-t border-white/10">
              Annual Seva arrangement: worship performed on designated day every year.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-semibold text-gold-200">Trust Contacts</p>
          <ul className="mt-4 space-y-2 text-sm">
            {persons.map((p) => (
              <li key={p.name} className="flex items-center justify-between text-xs">
                <span className="text-cream-100">{p.name}</span>
                <a href={telHref(p.phone)} className="font-medium text-gold-300 hover:text-white">
                  <Phone className="inline-block h-3 w-3 mr-1" aria-hidden="true" />
                  {p.phone}
                </a>
              </li>
            ))}
            <li className="flex gap-3 pt-3 border-t border-white/10 text-xs">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-400" aria-hidden="true" />
              <span>{location.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {temple.name}, {temple.village}. Managed by {trust.name}.</p>
          <p>ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು · May all be happy</p>
        </div>
      </div>
    </footer>
  );
}
