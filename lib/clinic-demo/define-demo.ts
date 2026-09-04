import type { DemoConfig } from '@/lib/clinic-demo/types';

export function defineDemo(config: DemoConfig): DemoConfig {
  if (!config.slug?.trim()) {
    throw new Error('Demo config requires a slug');
  }
  if (!config.name?.trim()) {
    throw new Error(`Demo "${config.slug}" requires a name`);
  }
  if (!config.logo?.trim()) {
    throw new Error(`Demo "${config.slug}" requires a logo path`);
  }
  if (!config.colors?.primary || !config.colors?.accent) {
    throw new Error(`Demo "${config.slug}" requires colors.primary and colors.accent`);
  }
  if (!Array.isArray(config.services) || config.services.length < 1) {
    throw new Error(`Demo "${config.slug}" requires at least one service`);
  }

  return config;
}
