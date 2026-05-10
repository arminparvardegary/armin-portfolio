'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest('a, button, [data-cursor]');

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.current?.classList.add('is-hover');
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        ring.current?.classList.remove('is-hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
