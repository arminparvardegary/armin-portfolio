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
import type { Work } from '@/data/works';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioApp() {
  const { theme, toggle, mounted } = useTheme();
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  useEffect(() => {
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

    // First section animates on mount (it's already in viewport on load).
    if (sections[0]) {
      gsap.fromTo(
        sections[0],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.15 }
      );
    }

    // Other sections fade up when scrolled into view.
    const reveals = sections.slice(1).map((sec) =>
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

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      clearTimeout(refresh);
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
