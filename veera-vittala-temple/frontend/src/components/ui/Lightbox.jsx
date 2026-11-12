import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from './SmartImage';

export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined;
  const go = useCallback((d) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, go, onClose]);

  const item = open ? items[index] : null;
  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog" aria-modal="true" aria-label={item.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        >
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-cream-50 hover:bg-white/20" aria-label="Close gallery">
            <X className="h-6 w-6" />
          </button>
          {items.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream-50 hover:bg-white/20 sm:left-6" aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
              <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream-50 hover:bg-white/20 sm:right-6" aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
            </>
          )}
          <motion.figure key={index} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
            className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <SmartImage src={item.src} alt={item.title} category={item.category} className="aspect-[4/3] w-full rounded-xl" imgClassName="!object-contain bg-black" />
            <figcaption className="mt-4 flex items-center justify-between text-cream-100">
              <span className="font-display text-xl">{item.title}</span>
              <span className="text-sm text-cream-200/70">{index + 1} / {items.length}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
