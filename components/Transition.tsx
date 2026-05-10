'use client';

import { useEffect, useState } from 'react';

export default function Transition() {
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const t = setTimeout(() => setPhase('out'), 80);
    return () => clearTimeout(t);
  }, []);

  return <div className={`page-curtain ${phase}`} aria-hidden />;
}
