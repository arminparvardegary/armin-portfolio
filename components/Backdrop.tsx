'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { sectionImages } from '@/data/works';

export default function Backdrop({ section }: { section: number }) {
  const url = sectionImages[section] ?? sectionImages[0];

  return (
    <div className="backdrop" aria-hidden>
      <AnimatePresence mode="sync">
        <motion.div
          key={section}
          className="backdrop-img"
          style={{ backgroundImage: `url(${url})` }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </AnimatePresence>
      <div className="backdrop-vignette" />
    </div>
  );
}
