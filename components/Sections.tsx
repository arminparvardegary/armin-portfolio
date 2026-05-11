'use client';

import Reveal from './Reveal';
import Marquee from './Marquee';
import useMagnetic from '@/lib/useMagnetic';
import { getLenis } from '@/lib/lenis';
import { works, stack, meta, introImages } from '@/data/works';
import type { Work } from '@/data/works';

const ArrowUp = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const scrollTo = (selector: string) => {
  const lenis = getLenis();
  const target = document.querySelector(selector) as HTMLElement | null;
  if (lenis && target) lenis.scrollTo(target);
  else target?.scrollIntoView({ behavior: 'smooth' });
};

export default function Sections({
  setHoveredWork,
  openWork,
}: {
  setHoveredWork: (i: number | null) => void;
  openWork: (w: Work) => void;
}) {
  const emailRef = useMagnetic<HTMLAnchorElement>(0.2);
  const linkedinRef = useMagnetic<HTMLAnchorElement>(0.4);
  const getInTouchBtn = useMagnetic<HTMLButtonElement>(0.35);
  const cvBtn = useMagnetic<HTMLAnchorElement>(0.35);

  return (
    <div className="content">
      {/* 01 — Contact (now first) */}
      <section className="section" data-index="0">
        <span className="kicker">01 / Contact</span>
        <a
          ref={emailRef}
          href={`mailto:${meta.email}`}
          className="display contact-mail"
        >
          hello@hindra.studio
        </a>
        <a
          ref={linkedinRef}
          href={meta.linkedin}
          target="_blank"
          rel="noreferrer"
          className="contact-secondary"
        >
          LinkedIn ↗
        </a>
      </section>

      {/* 02 — Work */}
      <section
        className="section"
        data-index="1"
        onMouseLeave={() => setHoveredWork(null)}
      >
        <span className="kicker">02 / Selected work</span>
        <Reveal as="h2" className="display">
          {'Selected\nwork.'}
        </Reveal>
        <ul className="works">
          {works.map((w, i) => (
            <li
              key={w.id}
              className="work-row"
              onMouseEnter={() => setHoveredWork(i)}
              onClick={() => openWork(w)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openWork(w);
              }}
            >
              <span className="work-idx">{w.index}</span>
              <span className="work-title">{w.title}</span>
              <span className="work-year">{w.year}</span>
              <span className="work-arrow"><ArrowUp /></span>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 — Stack */}
      <section className="section" data-index="2">
        <span className="kicker">03 / Stack</span>
        <Reveal as="h2" className="display">
          {'Deep.\nBroad.\nMarketing.'}
        </Reveal>
        <div className="stack-cols">
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
        </div>
        <Marquee
          items={['Frontend', 'Design', 'Motion', 'AI', 'Brand', 'Marketing', 'T Shape', 'Istanbul']}
          speed={28}
        />
      </section>

      {/* 04 — About */}
      <section className="section" data-index="3">
        <span className="kicker">04 / About</span>
        <Reveal as="h2" className="display">
          {'Designer.\nEngineer.\nOne mind.'}
        </Reveal>
        <p className="lead">
          {meta.role}. Founder of Hindra Studio.
        </p>
        <div className="about-meta">
          <span className="meta-label">Education</span>
          <span className="meta-value">
            {meta.education.school} · {meta.education.field} · {meta.education.years}
          </span>
        </div>
      </section>

      {/* 05 — Origin (now last, no kicker on purpose) */}
      <section className="section intro-section" data-index="4">
        <div
          className="intro-image intro-img-1"
          style={{ backgroundImage: `url(${introImages[0]})` }}
          aria-hidden
        />
        <div
          className="intro-image intro-img-2"
          style={{ backgroundImage: `url(${introImages[1]})` }}
          aria-hidden
        />
        <div
          className="intro-image intro-img-3"
          style={{ backgroundImage: `url(${introImages[2]})` }}
          aria-hidden
        />
        <div
          className="intro-image intro-img-4"
          style={{ backgroundImage: `url(${introImages[3]})` }}
          aria-hidden
        />

        <Reveal as="h1" className="display name">
          {'ARMIN\nPARVARDEGARY'}
        </Reveal>
        <p className="intro-tagline">the beginning lives at the end.</p>
        <div className="intro-actions">
          <button
            ref={getInTouchBtn}
            className="pill"
            onClick={() => scrollTo('[data-index="0"]')}
          >
            ↑ Get in touch
          </button>
          <a
            ref={cvBtn}
            href="/cv.pdf"
            download="Armin_Parvardegary_CV.pdf"
            className="pill pill-ghost"
          >
            Download CV
            <svg className="cv-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
