export const SERVICE_SLUGS = [
  'branding',
  'diseno-web',
  'contenido',
  'estrategia-digital'
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const SERVICE_VARIANTS = ['branding', 'web', 'content', 'ads'] as const;

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function serviceSlugToVariant(slug: ServiceSlug): (typeof SERVICE_VARIANTS)[number] {
  const map: Record<ServiceSlug, (typeof SERVICE_VARIANTS)[number]> = {
    branding: 'branding',
    'diseno-web': 'web',
    contenido: 'content',
    'estrategia-digital': 'ads'
  };
  return map[slug];
}
