'use client';

import { useEffect, useRef } from 'react';
import { TOTAL, TRANSITION_LOCK_MS } from './constants';

type Options = {
  onChange: (next: number) => void;
  current: () => number;
  blocked: () => boolean;
};

export function useSectionInput({ onChange, current, blocked }: Options) {
  const lockUntil = useRef(0);
  const lastWheel = useRef(0);

  useEffect(() => {
    const advance = (delta: number) => {
      if (blocked()) return;
      const now = performance.now();
      if (now < lockUntil.current) return;
      const next = current() + delta;
      if (next < 0 || next >= TOTAL) return;
      lockUntil.current = now + TRANSITION_LOCK_MS;
      onChange(next);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      const now = performance.now();
      if (now - lastWheel.current < 60) return;
      lastWheel.current = now;
      advance(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          advance(1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          advance(-1);
          break;
        case 'Home':
          if (blocked()) return;
          lockUntil.current = performance.now() + TRANSITION_LOCK_MS;
          onChange(0);
          break;
        case 'End':
          if (blocked()) return;
          lockUntil.current = performance.now() + TRANSITION_LOCK_MS;
          onChange(TOTAL - 1);
          break;
      }
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY == null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) advance(dy > 0 ? 1 : -1);
      touchY = null;
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [blocked, current, onChange]);
}
