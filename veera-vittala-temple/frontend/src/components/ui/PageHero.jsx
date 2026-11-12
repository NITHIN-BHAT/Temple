import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Ornament from './Ornament';

/** Banner at the top of inner pages. */
export default function PageHero({ eyebrow, title, subtitle, crumb }) {
  return (
    <section className="relative overflow-hidden bg-temple-dusk pb-16 pt-32 text-center sm:pb-20 sm:pt-40">
      <div className="kolam-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-100 to-transparent" aria-hidden="true" />
      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {eyebrow && <p className="eyebrow !text-gold-300">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-semibold !text-cream-50 sm:text-6xl">{title}</h1>
          <Ornament light className="mx-auto mt-5" />
          {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-cream-100/85">{subtitle}</p>}
          <nav aria-label="Breadcrumb" className="mt-6 flex items-center justify-center gap-1 text-sm text-cream-200/80">
            <Link to="/" className="hover:text-gold-200">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span aria-current="page" className="text-gold-200">{crumb || title}</span>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
