import { useState } from 'react';
import { assetUrl } from '../../lib/api';
import PlaceholderArt from './PlaceholderArt';

/** <img> with lazy loading, fade-in and a labelled placeholder if missing or broken. */
export default function SmartImage({ src, alt, category, className = '', imgClassName = '', compact }) {
  const [state, setState] = useState(src ? 'loading' : 'error');
  if (!src || state === 'error') return <PlaceholderArt category={category} title={alt} className={className} compact={compact} />;
  return (
    <div className={`relative overflow-hidden bg-maroon-900/10 ${className}`}>
      {state === 'loading' && <div className="absolute inset-0 animate-pulse bg-cream-300/60" aria-hidden="true" />}
      <img
        src={assetUrl(src)} alt={alt} loading="lazy" decoding="async"
        onLoad={() => setState('ok')} onError={() => setState('error')}
        className={`h-full w-full object-cover transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
}
