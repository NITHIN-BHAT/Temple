import Reveal from './Reveal';
import Ornament from './Ornament';

export default function SectionHeading({ eyebrow, title, subtitle, light = false, align = 'center', className = '' }) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-gold-300' : ''}`}>{eyebrow}</p>}
      <h2 className={`mt-3 text-4xl font-semibold sm:text-5xl ${light ? '!text-cream-50' : ''}`}>{title}</h2>
      <Ornament light={light} className={`mt-4 ${center ? 'mx-auto' : ''}`} />
      {subtitle && <p className={`mt-4 text-lg ${light ? 'text-cream-200/85' : 'text-ink-700/80'}`}>{subtitle}</p>}
    </Reveal>
  );
}
