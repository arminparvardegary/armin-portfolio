'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect } from 'react';
import type { Work } from '@/data/works';

const ease = [0.2, 0.8, 0.2, 1] as const;

const panel: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
  exit: { opacity: 0, y: 16, scale: 0.99, transition: { duration: 0.32, ease } },
};

const list: Variants = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};
const listItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function CaseDetail({ work, onClose }: { work: Work | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div key="case" role="dialog" aria-modal="true">
          <motion.div
            className="case-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            onClick={onClose}
            aria-hidden
          />
          <div className="case">
            <motion.div
              className="case-panel"
              variants={panel}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="case-head">
                <span className="case-num">CASE {work.index}</span>
                <button className="case-close" onClick={onClose} aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="case-title">{work.title}</h2>

              <div className="case-sub">
                <div><span className="label">Client</span><span>{work.client}</span></div>
                <div><span className="label">Role</span><span>{work.role}</span></div>
                <div><span className="label">Year</span><span>{work.year}</span></div>
                <div><span className="label">Duration</span><span>{work.duration}</span></div>
              </div>

              <motion.div className="case-body" variants={list} initial="hidden" animate="show">
                {work.body.map((p, i) => (
                  <motion.p key={i} variants={listItem}>{p}</motion.p>
                ))}
                <motion.ul className="case-tags" variants={list}>
                  {work.tech.map((t) => (
                    <motion.li key={t} variants={listItem}>{t}</motion.li>
                  ))}
                </motion.ul>
                {work.link && (
                  <motion.div variants={listItem}>
                    <a className="case-link" href={work.link} target="_blank" rel="noreferrer">
                      Visit project
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
