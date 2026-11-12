import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import Ornament from '../components/ui/Ornament';

export default function NotFound() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.');
  return (
    <section className="flex min-h-[80vh] items-center bg-temple-dusk pt-24 text-center">
      <div className="container-x">
        <p className="font-display text-8xl font-semibold text-gold-200">404</p>
        <Ornament light className="mx-auto mt-2" />
        <h1 className="mt-4 text-4xl !text-cream-50">This page could not be found</h1>
        <p className="mt-3 text-cream-100/80">The link may be broken or the page may have moved.</p>
        <Link to="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    </section>
  );
}
