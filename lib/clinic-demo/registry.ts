import { cache } from 'react';
import { DEMO_CONFIGS, getDemoConfig } from '@/lib/clinic-demo/demo-catalog';
import { resolveDemo } from '@/lib/clinic-demo/resolve';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export { DEMO_CONFIGS, DEMO_SLUGS, getDemoConfig, isDemoSlug } from '@/lib/clinic-demo/demo-catalog';

export const getResolvedDemo = cache((slug: string): ResolvedDemo => {
  const config = getDemoConfig(slug);
  if (!config) {
    throw new Error(`Unknown clinic demo slug: ${slug}`);
  }
  return resolveDemo(config);
});

export function getAllResolvedDemos(): ResolvedDemo[] {
  return DEMO_CONFIGS.map((config) => resolveDemo(config));
}
