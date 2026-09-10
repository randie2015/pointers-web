export const SERVICE_SLUGS = [
  'diseno-web',
  'estrategia-digital',
  'branding'
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const SERVICE_VARIANTS = ['web', 'ads', 'branding'] as const;

export const LEGACY_SERVICE_SLUGS = ['contenido'] as const;

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function isLegacyServiceSlug(value: string): value is (typeof LEGACY_SERVICE_SLUGS)[number] {
  return (LEGACY_SERVICE_SLUGS as readonly string[]).includes(value);
}

export function serviceSlugToVariant(slug: ServiceSlug): (typeof SERVICE_VARIANTS)[number] {
  const map: Record<ServiceSlug, (typeof SERVICE_VARIANTS)[number]> = {
    'diseno-web': 'web',
    'estrategia-digital': 'ads',
    branding: 'branding'
  };
  return map[slug];
}
