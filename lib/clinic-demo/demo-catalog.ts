import type { DemoConfig } from '@/lib/clinic-demo/types';
import alejandraConfig from '@/demos/alejandracusirramos/config';
import clinicaEnsayoConfig from '@/demos/clinica-ensayo/config';

/** Edge-safe registry (no React cache). Used by middleware + server. */
export const DEMO_CONFIGS: DemoConfig[] = [alejandraConfig, clinicaEnsayoConfig];

const configBySlug = new Map(DEMO_CONFIGS.map((config) => [config.slug, config]));

export const DEMO_SLUGS = DEMO_CONFIGS.map((config) => config.slug);

export function isDemoSlug(slug: string): boolean {
  return configBySlug.has(slug);
}

export function getDemoConfig(slug: string): DemoConfig | undefined {
  return configBySlug.get(slug);
}
