import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

/** Thin banner reminding visitors that some details are placeholders. Turn off: meta.showSampleNotice = false */
export default function SampleNotice() {
  const { content } = useContent();
  const [hidden, setHidden] = useState(() => { try { return sessionStorage.getItem('sampleNoticeHidden') === '1'; } catch { return false; } });
  if (!content.meta?.showSampleNotice || hidden) return null;
  const close = () => { setHidden(true); try { sessionStorage.setItem('sampleNoticeHidden', '1'); } catch { /* ignore */ } };
  return (
    <div role="note" className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-gold-400/40 bg-cream-50/95 p-3.5 pr-10 text-sm text-ink-700 shadow-soft backdrop-blur sm:bottom-5">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" aria-hidden="true" />
      <p>{content.meta.sampleNoticeText}</p>
      <button onClick={close} className="absolute right-2 top-2 rounded-full p-1.5 text-ink-700/60 hover:bg-cream-200" aria-label="Dismiss notice"><X className="h-4 w-4" /></button>
    </div>
  );
}
