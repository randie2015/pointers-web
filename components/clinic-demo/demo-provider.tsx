'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

const DemoContext = createContext<ResolvedDemo | null>(null);

export function DemoProvider({ demo, children }: { demo: ResolvedDemo; children: ReactNode }) {
  return <DemoContext.Provider value={demo}>{children}</DemoContext.Provider>;
}

export function useDemo(): ResolvedDemo {
  const demo = useContext(DemoContext);
  if (!demo) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return demo;
}
