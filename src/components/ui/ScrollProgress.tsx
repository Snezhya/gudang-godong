'use client';
// src/components/ui/ScrollProgress.tsx

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const el  = document.documentElement;
      const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div
      className="scroll-progress"
      style={{ width: `${width}%` }}
    />
  );
}
