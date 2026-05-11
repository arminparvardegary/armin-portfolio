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

      const raw = (el.textContent || '').replace(/ /g, ' ');
      const lines = raw.split(/\n+/);
      const built = lines
        .map((line) => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          const words = trimmed.split(/\s+/).filter(Boolean);
          return words
            .map(
              (w) => `<span class="rv-w"><span class="rv-i">${escape(w)}</span></span>`
            )
            .join(' ');
        })
        .filter(Boolean)
        .join('<br/>');

      if (!built) return;
      el.innerHTML = built;

      const items = el.querySelectorAll<HTMLElement>('.rv-i');
      if (!items.length) return;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      gsap.set(items, { yPercent: 110, rotate: 4 });

      if (inView) {
        gsap.to(items, {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.04,
          delay: delay + 0.25,
        });
      } else {
        gsap.to(items, {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.04,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }
    },
    { dependencies: [] }
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
