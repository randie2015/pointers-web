import { cache } from 'react';
import {
  AESTHETIC_SLUGS,
  DEMO_CONFIGS,
  getDemoConfig,
  isAestheticDemoSlug
} from '@/lib/clinic-demo/demo-catalog';
import { resolveAestheticDemo } from '@/lib/aesthetic-demo/resolve';
import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

export { AESTHETIC_SLUGS, isAestheticDemoSlug };

export const getResolvedAestheticDemo = cache((slug: string): ResolvedAestheticDemo => {
  const config = getDemoConfig(slug);
  if (!config || config.preset !== 'aesthetic') {
    throw new Error(`Unknown aesthetic demo slug: ${slug}`);
  }
  return resolveAestheticDemo(config);
});

export function getAllResolvedAestheticDemos(): ResolvedAestheticDemo[] {
  return DEMO_CONFIGS.filter((config) => config.preset === 'aesthetic').map((config) =>
    resolveAestheticDemo(config)
  );
}
