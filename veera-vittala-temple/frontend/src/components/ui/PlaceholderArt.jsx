import { ImageIcon } from 'lucide-react';

/** Decorative stand-in shown when an image hasn't been added yet. Clearly labelled — never a fake photo. */
const motifs = {
  Architecture: (c) => (
    <g fill="none" stroke={c} strokeWidth="3" opacity=".9">
      <path d="M40 150 L100 95 L160 150" /><path d="M60 130 L100 70 L140 130" />
      <path d="M50 150 V205 M150 150 V205 M75 150 V205 M125 150 V205" />
      <path d="M88 205 V170 a12 12 0 0 1 24 0 V205" /><circle cx="100" cy="60" r="6" fill={c} />
    </g>
  ),
  Deities: (c) => (
    <g fill="none" stroke={c} strokeWidth="3" opacity=".9">
      <path d="M60 205 V120 a40 40 0 0 1 80 0 V205" /><path d="M72 205 V124 a28 28 0 0 1 56 0 V205" />
      <circle cx="100" cy="128" r="9" fill={c} /><path d="M90 200 L92 150 Q100 142 108 150 L110 200Z" fill={c} opacity=".6" />
    </g>
  ),
  Festivals: (c) => (
    <g opacity=".95">
      {[60, 100, 140].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 22} ${180} q22 22 44 0 Z`} fill={c} />
          <ellipse cx={x} cy={160 - i % 2 * 6} rx="7" ry="15" fill="#ffd98a" className="animate-flicker" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
    </g>
  ),
};

export default function PlaceholderArt({ category = 'Architecture', title, className = '', compact = false }) {
  const motif = motifs[category] || motifs.Architecture;
  return (
    <div className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-950 ${className}`}>
      <div className="kolam-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <svg viewBox="0 0 200 240" className="absolute inset-0 m-auto h-3/5 w-3/5" aria-hidden="true">{motif('#d4ad46')}</svg>
      {!compact && (
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[0.7rem] font-medium text-cream-100 backdrop-blur">
          <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" /> Photo coming soon{title ? ` · ${title}` : ''}
        </span>
      )}
    </div>
  );
}
