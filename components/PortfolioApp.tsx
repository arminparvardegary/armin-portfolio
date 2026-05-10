'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { BottomBar, Dots, TopBar } from '@/components/Chrome';
import Sections from '@/components/Sections';
import CaseDetail from '@/components/CaseDetail';
import Backdrop from '@/components/Backdrop';
import Grain from '@/components/Grain';
import { useSectionInput } from '@/lib/useSectionInput';
import { useTheme } from '@/lib/useTheme';
import type { Work } from '@/data/works';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function PortfolioApp() {
  const { theme, toggle, mounted } = useTheme();
  const [section, setSection] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const sectionRef = useRef(section);
  sectionRef.current = section;

  const goto = useCallback((i: number) => {
    setSection((prev) => (prev === i ? prev : i));
    setHoveredWork(null);
  }, []);

  useSectionInput({
    onChange: goto,
    current: () => sectionRef.current,
    blocked: () => activeWork !== null,
  });

  return (
    <>
      <Backdrop section={section} />

      <div className="stage">
        <Scene
          section={section}
          hoveredWork={section === 3 ? hoveredWork : null}
          theme={theme}
        />
      </div>

      <Sections
        current={section}
        go={goto}
        setHoveredWork={setHoveredWork}
        openWork={setActiveWork}
      />

      <TopBar current={section} go={goto} />
      <BottomBar theme={theme} mounted={mounted} onToggleTheme={toggle} />
      <Dots current={section} go={goto} />

      <CaseDetail work={activeWork} onClose={() => setActiveWork(null)} />

      <Grain />
    </>
  );
}
