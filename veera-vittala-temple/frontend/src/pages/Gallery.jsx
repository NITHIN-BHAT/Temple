import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import SmartImage from '../components/ui/SmartImage';
import Lightbox from '../components/ui/Lightbox';

export default function Gallery() {
  const { content } = useContent();
  usePageMeta('Photo Gallery', `Photos of ${content.temple.name}, ${content.temple.village} — architecture, deities and festival celebrations.`);
  const cats = useMemo(() => ['All', ...new Set(content.gallery.map((g) => g.category).filter(Boolean))], [content.gallery]);
  const [cat, setCat] = useState('All');
  const [index, setIndex] = useState(null);
  const list = content.gallery.filter((g) => cat === 'All' || g.category === cat);
  const hasReal = content.gallery.some((g) => g.src);

  return (
    <>
      <PageHero eyebrow="Glimpses" title="Photo Gallery" subtitle="Architecture, deities and festival celebrations at the temple." crumb="Gallery" />
      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery categories">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${cat === c ? 'bg-maroon-800 text-cream-50' : 'bg-cream-50 text-maroon-800 ring-1 ring-cream-300 hover:ring-maroon-800'}`}>{c}</button>
            ))}
          </div>
          {!hasReal && (
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-700/70">
              Official temple photographs will be added soon. The panels below are decorative placeholders, not photos of the temple.
            </p>
          )}
          <motion.ul layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {list.map((g, i) => (
                <motion.li layout key={`${g.title}-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="mb-4 break-inside-avoid">
                  <button onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl text-left" aria-label={`View ${g.title}`}>
                    <SmartImage src={g.src} alt={g.title} category={g.category} compact className={`${['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square'][i % 3]} transition duration-700 group-hover:scale-105`} />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent p-4 opacity-90 transition group-hover:opacity-100">
                      <span className="flex w-full items-center justify-between text-cream-50">
                        <span><span className="block font-display text-xl">{g.title}</span><span className="text-xs uppercase tracking-widest text-gold-200">{g.category}</span></span>
                        <Expand className="h-5 w-5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>
      <Lightbox items={list} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  );
}
