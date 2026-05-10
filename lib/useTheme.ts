'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  // Always start with the SSR default to avoid hydration mismatch.
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Sync from the DOM attribute (set by the inline script before paint).
  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme') as Theme | null;
    if (attr === 'light' || attr === 'dark') setTheme(attr);
    setMounted(true);
  }, []);

  // Reflect theme changes back to DOM and localStorage.
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme, mounted]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle, mounted };
}
