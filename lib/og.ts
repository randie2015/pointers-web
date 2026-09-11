export const OG_THUMBNAIL_WIDTH = 1200;
export const OG_THUMBNAIL_HEIGHT = 627;

export type OgLocale = 'es' | 'en';

export type OgCopy = {
  category: string;
  studio: string;
  title: string;
  description: string;
  alt: string;
};

export const OG_COPY: Record<OgLocale, OgCopy> = {
  es: {
    category: 'STUDIO',
    studio: 'Pointers',
    title: 'Infraestructura comercial y desarrollo B2B',
    description:
      'Plataformas digitales de alto rendimiento y arquitectura comercial para marcas que no pueden permitirse perder clientes.',
    alt: 'Pointers | Infraestructura comercial y desarrollo B2B'
  },
  en: {
    category: 'STUDIO',
    studio: 'Pointers',
    title: 'Commercial infrastructure and B2B development',
    description:
      'High-performance digital platforms and commercial architecture for brands that cannot afford to lose clients.',
    alt: 'Pointers | Commercial infrastructure and B2B development'
  }
};

export const DEFAULT_OG_COPY = OG_COPY.es;

export function resolveOgLocale(locale: string | undefined): OgLocale {
  return locale === 'en' ? 'en' : 'es';
}
