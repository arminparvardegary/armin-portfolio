'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { works, stack, meta } from '@/data/works';
import type { Work } from '@/data/works';

const ArrowUp = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.18 } },
  exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

const item: Variants = {
  hidden: { y: 16, opacity: 0, filter: 'blur(6px)' },
  show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { y: -12, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.32, ease: [0.55, 0, 0.6, 1] } },
};

const rowItem: Variants = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { y: -10, opacity: 0, transition: { duration: 0.3 } },
};

export default function Sections({
  current,
  go,
  setHoveredWork,
  openWork,
}: {
  current: number;
  go: (i: number) => void;
  setHoveredWork: (i: number | null) => void;
  openWork: (w: Work) => void;
}) {
  return (
    <div className="content">
      <AnimatePresence mode="popLayout" initial={false}>
        {current === 0 && (
          <motion.section
            key="intro"
            className="section"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.h1
              variants={item}
              className="display name"
            >
              ARMIN<br />PARVARDEGARY
            </motion.h1>
            <motion.button variants={item} className="pill" onClick={() => go(3)}>
              Portfolio
            </motion.button>
          </motion.section>
        )}

        {current === 1 && (
          <motion.section
            key="about"
            className="section"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.span variants={item} className="kicker">01 / About</motion.span>
            <motion.h2 variants={item} className="display">
              Designer<span className="accent">.</span><br />
              Engineer<span className="accent">.</span><br />
              <em>One mind.</em>
            </motion.h2>
            <motion.p variants={item} className="lead">
              {meta.role}. Founder of Hindra Studio.
            </motion.p>
            <motion.div variants={item} className="about-meta">
              <span className="meta-label">Education</span>
              <span className="meta-value">
                {meta.education.school} · {meta.education.field} · {meta.education.years}
              </span>
            </motion.div>
          </motion.section>
        )}

        {current === 2 && (
          <motion.section
            key="stack"
            className="section"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.span variants={item} className="kicker">02 / Stack</motion.span>
            <motion.h2 variants={item} className="display">
              Deep<span className="accent">.</span><br />
              Broad<span className="accent">.</span><br />
              <em>Marketing.</em>
            </motion.h2>
            <motion.div variants={item} className="stack-cols">
              <div className="stack-col">
                <span className="stack-label">Deep</span>
                <ul className="stack-list">
                  {stack.deep.map((s) => (<li key={s}>{s}</li>))}
                </ul>
              </div>
              <div className="stack-col">
                <span className="stack-label">Broad</span>
                <ul className="stack-list">
                  {stack.broad.map((s) => (<li key={s}>{s}</li>))}
                </ul>
              </div>
              <div className="stack-col">
                <span className="stack-label">Marketing</span>
                <ul className="stack-list">
                  {stack.marketing.map((s) => (<li key={s}>{s}</li>))}
                </ul>
              </div>
            </motion.div>
          </motion.section>
        )}

        {current === 3 && (
          <motion.section
            key="work"
            className="section"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseLeave={() => setHoveredWork(null)}
          >
            <motion.span variants={item} className="kicker">03 / Selected work</motion.span>

            <motion.ul className="works" variants={container}>
              {works.map((w, i) => (
                <motion.li
                  key={w.id}
                  className="work-row"
                  variants={rowItem}
                  onMouseEnter={() => setHoveredWork(i)}
                  onClick={() => openWork(w)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openWork(w); }}
                >
                  <span className="work-idx">{w.index}</span>
                  <span className="work-title">{w.title}</span>
                  <span className="work-year">{w.year}</span>
                  <span className="work-arrow"><ArrowUp /></span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {current === 4 && (
          <motion.section
            key="contact"
            className="section"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.span variants={item} className="kicker">04 / Contact</motion.span>
            <motion.a
              variants={item}
              href={`mailto:${meta.email}`}
              className="display contact-mail"
            >
              hello<span className="accent">@</span>hindra.studio
            </motion.a>
            <motion.a
              variants={item}
              href={meta.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-secondary"
            >
              LinkedIn ↗
            </motion.a>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
