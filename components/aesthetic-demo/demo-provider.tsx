'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

const AestheticDemoContext = createContext<ResolvedAestheticDemo | null>(null);

export function AestheticDemoProvider({
  demo,
  children
}: {
  demo: ResolvedAestheticDemo;
  children: ReactNode;
}) {
  return <AestheticDemoContext.Provider value={demo}>{children}</AestheticDemoContext.Provider>;
}

export function useAestheticDemo(): ResolvedAestheticDemo {
  const demo = useContext(AestheticDemoContext);
  if (!demo) {
    throw new Error('useAestheticDemo must be used within AestheticDemoProvider');
  }
  return demo;
}
