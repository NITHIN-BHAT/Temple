import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, HandHeart } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { NAV } from './nav';


function Emblem({ className }) {
  return (
    <img
      src="/images/logo.jpeg"
      alt="Shree Veer Vittal Mukhyaprana Temple Logo"
      className={`${className} object-contain rounded-full`}
    />
  );
}


export default function Navbar() {
  const { content } = useContent();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const solid = scrolled || open;
  const linkCls = ({ isActive }) =>
    `relative rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors ${
      isActive ? 'text-gold-200' : 'text-cream-100/85 hover:text-cream-50'
    }`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-maroon-950/90 shadow-lg backdrop-blur-md' : 'bg-gradient-to-b from-black/40 to-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-cream-50 focus:px-4 focus:py-2 focus:text-maroon-900">Skip to content</a>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={`${content.temple.name} – home`}>
          <Emblem className="h-11 w-11 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-semibold text-cream-50 sm:text-xl">{content.temple.shortName}</span>
            <span className="block truncate font-kannada text-[0.72rem] text-gold-200/90">{content.temple.nameKannada}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center xl:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-300" />}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/donate" className="btn-primary ml-3 !px-5 !py-2.5"><HandHeart className="h-4 w-4" aria-hidden="true" /> Donate</Link>
        </nav>

        <button onClick={() => setOpen((o) => !o)} className="rounded-full p-2.5 text-cream-50 hover:bg-white/10 xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'calc(100dvh - 72px)' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-gold-400/20 bg-maroon-950 xl:hidden">
            <ul className="container-x py-4">
              {NAV.map((n, i) => (
                <motion.li key={n.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <NavLink to={n.to} end={n.to === '/'}
                    className={({ isActive }) => `flex items-center justify-between border-b border-white/5 py-4 font-display text-2xl ${isActive ? 'text-gold-200' : 'text-cream-50'}`}>
                    {n.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-6"><Link to="/donate" className="btn-primary w-full"><HandHeart className="h-4 w-4" aria-hidden="true" /> Donate</Link></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
