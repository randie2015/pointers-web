import { cache } from 'react';
import { DEMO_CONFIGS, getDemoConfig, isDentistDemoSlug, isDemoSlug } from '@/lib/clinic-demo/demo-catalog';
import { resolveDemo } from '@/lib/clinic-demo/resolve';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export {
  DEMO_CONFIGS,
  DEMO_SLUGS,
  DENTIST_SLUGS,
  getDemoConfig,
  getDemoPreset,
  getDemoAppPrefix,
  isDemoSlug,
  isDentistDemoSlug,
  isAestheticDemoSlug,
  AESTHETIC_SLUGS
} from '@/lib/clinic-demo/demo-catalog';

export const getResolvedDemo = cache((slug: string): ResolvedDemo => {
  const config = getDemoConfig(slug);
  if (!config || config.preset !== 'dentist') {
    throw new Error(`Unknown clinic demo slug: ${slug}`);
  }
  return resolveDemo(config);
});

export function getAllResolvedDemos(): ResolvedDemo[] {
  return DEMO_CONFIGS.filter((config) => config.preset === 'dentist').map((config) => resolveDemo(config));
}

export function assertDentistSlug(slug: string): boolean {
  return isDemoSlug(slug) && isDentistDemoSlug(slug);
}
