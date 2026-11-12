import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SampleNotice from './SampleNotice';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1"><Outlet /></main>
      <Footer />
      <SampleNotice />
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
        className={`fixed bottom-24 right-4 z-40 rounded-full bg-maroon-800 p-3 text-cream-50 shadow-lg transition-all duration-300 hover:bg-maroon-700 sm:bottom-6 sm:right-6 ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
