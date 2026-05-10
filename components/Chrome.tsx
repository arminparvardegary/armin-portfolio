'use client';

import { TOTAL } from '@/lib/constants';
import { meta } from '@/data/works';
import type { Theme } from '@/lib/useTheme';

export function TopBar({ current, go }: { current: number; go: (i: number) => void }) {
  return (
    <header className="bar top">
      <div className="brand-row">
        <button
          className="logo"
          onClick={() => go(0)}
          aria-label="Back to home"
        >
          Armin
        </button>
        <span className="location" aria-label="Location">
          <span className="location-label">Loc</span>
          {meta.city}
        </span>
      </div>
      <div className="counter">
        <span className="now">{String(current + 1).padStart(2, '0')}</span>
        <span className="sep">—</span>
        <span>{String(TOTAL).padStart(2, '0')}</span>
      </div>
    </header>
  );
}

const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function BottomBar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  return (
    <footer className="bar bottom">
      <div className="hint" aria-hidden>
        <span>Scroll</span>
        <span>·</span>
        <span>↑ ↓</span>
      </div>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </footer>
  );
}

export function Dots({ current, go }: { current: number; go: (i: number) => void }) {
  const labels = ['Index', 'About', 'Stack', 'Work', 'Contact'];
  return (
    <nav className="dots" aria-label="Section navigation">
      {Array.from({ length: TOTAL }).map((_, i) => (
        <button
          key={i}
          className={`dot ${current === i ? 'active' : ''}`}
          onClick={() => go(i)}
          aria-label={`Go to ${labels[i]}`}
        />
      ))}
    </nav>
  );
}
