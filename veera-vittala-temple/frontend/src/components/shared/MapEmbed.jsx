import { useState } from 'react';
import { useContent } from '../../context/ContentContext';

export function directionsUrl(loc) {
  return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
}

export default function MapEmbed({ className = '' }) {
  const { content } = useContent();
  const { lat, lng } = content.location;
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gold-300/40 bg-cream-200 shadow-soft ${className}`}>
      {!loaded && <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-700/60">Loading map…</div>}
      <iframe
        title={`Map showing ${content.temple.name}`}
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        className="relative h-full min-h-[320px] w-full"
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
