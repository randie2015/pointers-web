import type { DemoConfig, DemoPreset } from '@/lib/clinic-demo/types';
import clinicaEnsayoConfig from '@/demos/clinica-ensayo/config';
import magrassLagreeConfig from '@/demos/magrass-lagree/config';
import spaEnsayoConfig from '@/demos/spa-ensayo/config';

/** Edge-safe registry (no React cache). Used by middleware + server. */
export const DEMO_CONFIGS: DemoConfig[] = [
  clinicaEnsayoConfig,
  magrassLagreeConfig,
  spaEnsayoConfig
];

const configBySlug = new Map(DEMO_CONFIGS.map((config) => [config.slug, config]));

export const DEMO_SLUGS = DEMO_CONFIGS.map((config) => config.slug);

export const DENTIST_SLUGS = DEMO_CONFIGS.filter((c) => c.preset === 'dentist').map((c) => c.slug);

export const AESTHETIC_SLUGS = DEMO_CONFIGS.filter((c) => c.preset === 'aesthetic').map((c) => c.slug);

export function isDemoSlug(slug: string): boolean {
  return configBySlug.has(slug);
}

export function isDentistDemoSlug(slug: string): boolean {
  return configBySlug.get(slug)?.preset === 'dentist';
}

export function isAestheticDemoSlug(slug: string): boolean {
  return configBySlug.get(slug)?.preset === 'aesthetic';
}

export function getDemoConfig(slug: string): DemoConfig | undefined {
  return configBySlug.get(slug);
}

export function getDemoPreset(slug: string): DemoPreset | undefined {
  return configBySlug.get(slug)?.preset;
}

/** App route prefix for rewrite: clinic-demo | aesthetic-demo */
export function getDemoAppPrefix(slug: string): '/clinic-demo' | '/aesthetic-demo' | undefined {
  const preset = getDemoPreset(slug);
  if (preset === 'dentist') return '/clinic-demo';
  if (preset === 'aesthetic') return '/aesthetic-demo';
  return undefined;
}
