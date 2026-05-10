'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const lines = (el.innerText || '').split(/\n/);
      el.innerHTML = lines
        .map((line) => {
          const words = line.trim().split(/\s+/).filter(Boolean);
          return words
            .map(
              (w) => `<span class="rv-w"><span class="rv-i">${escape(w)}</span></span>`
            )
            .join(' ');
        })
        .join('<br/>');

      gsap.fromTo(
        el.querySelectorAll('.rv-i'),
        { yPercent: 110, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.04,
          delay,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    },
    { dependencies: [] }
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
