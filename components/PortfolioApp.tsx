'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Transition from '@/components/Transition';
import { BottomBar, Dots, TopBar } from '@/components/Chrome';
import Sections from '@/components/Sections';
import CaseDetail from '@/components/CaseDetail';
import Backdrop from '@/components/Backdrop';
import Grain from '@/components/Grain';
import { useTheme } from '@/lib/useTheme';
import { getLenis } from '@/lib/lenis';
import { TOTAL } from '@/lib/constants';
import type { Work } from '@/data/works';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioApp() {
  const { theme, toggle, mounted } = useTheme();
  // Inverted scroll: user lands at the bottom (Contact section).
  const [activeSection, setActiveSection] = useState(TOTAL - 1);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  useEffect(() => {
    // STAGE 1: jump to the bottom so the inverted wheel has room to move.
    const jumpToBottom = () => {
      const lenis = getLenis();
      const maxY = document.body.scrollHeight - window.innerHeight;
      if (lenis) lenis.scrollTo(maxY, { immediate: true });
      else window.scrollTo(0, maxY);
    };
    requestAnimationFrame(() => requestAnimationFrame(jumpToBottom));

    // STAGE 2: set up scroll-driven section state + section/parallax tweens.
    const sections = gsap.utils.toArray<HTMLElement>('.section');
    const triggers = sections.map((sec, i) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: ({ isActive }) => {
          if (isActive) setActiveSection(i);
        },
      })
    );

    // Last section animates on mount (it's in initial viewport after jumpToBottom).
    if (sections[sections.length - 1]) {
      gsap.fromTo(
        sections[sections.length - 1],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.2 }
      );
    }

    // Other sections fade up when scrolled into view (works in both scroll directions).
    const reveals = sections.slice(0, -1).map((sec) =>
      gsap.fromTo(
        sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    );

    const introImages = gsap.utils.toArray<HTMLElement>('.intro-image');
    const introTrigger = document.querySelector<HTMLElement>('.intro-section');
    const parallaxTweens = introImages.map((img, i) =>
      gsap.to(img, {
        yPercent: -28 - (i % 4) * 10,
        rotate: `+=${(i % 2 === 0 ? -1 : 1) * 3}`,
        ease: 'none',
        scrollTrigger: {
          trigger: introTrigger || sections[0],
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    );

    const refresh = setTimeout(() => {
      ScrollTrigger.refresh();
      jumpToBottom();
    }, 250);

    // Invert keyboard: arrow-down / pgdn / space scroll the page UP (toward beginning).
    const onKey = (e: KeyboardEvent) => {
      const lenis = getLenis();
      if (!lenis) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      const vh = window.innerHeight;
      const here = (lenis as unknown as { scroll: number }).scroll ?? window.scrollY;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        lenis.scrollTo(here - vh * 0.85, { duration: 1.0 });
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        lenis.scrollTo(here + vh * 0.85, { duration: 1.0 });
      } else if (e.key === 'Home') {
        e.preventDefault();
        lenis.scrollTo(document.body.scrollHeight, { duration: 1.0 });
      } else if (e.key === 'End') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.0 });
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(refresh);
      window.removeEventListener('keydown', onKey);
      triggers.forEach((t) => t.kill());
      reveals.forEach((tween) => tween.scrollTrigger?.kill());
      parallaxTweens.forEach((tween) => tween.scrollTrigger?.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <Backdrop section={activeSection} />

      <div className="stage">
        <Scene
          section={activeSection}
          hoveredWork={activeSection === 3 ? hoveredWork : null}
          theme={theme}
        />
      </div>

      <Sections setHoveredWork={setHoveredWork} openWork={setActiveWork} />

      <TopBar current={activeSection} />
      <BottomBar theme={theme} mounted={mounted} onToggleTheme={toggle} />
      <Dots current={activeSection} />

      <CaseDetail work={activeWork} onClose={() => setActiveWork(null)} />

      <Cursor />
      <Transition />
      <Grain />
    </SmoothScroll>
  );
}
