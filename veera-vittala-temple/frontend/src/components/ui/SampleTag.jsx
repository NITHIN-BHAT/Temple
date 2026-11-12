import { Info } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

/** Shows a small "To be confirmed" tag when data is marked sample: true. Hidden once showSampleNotice is false. */
export default function SampleTag({ show = true, label = 'To be confirmed', className = '' }) {
  const { content } = useContent();
  if (!show || !content.meta?.showSampleNotice) return null;
  return (
    <span className={`sample-tag ${className}`} title="Sample content – to be confirmed by the temple">
      <Info className="h-3 w-3" aria-hidden="true" /> {label}
    </span>
  );
}
