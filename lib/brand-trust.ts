export type BrandLogo = {
  name: string;
  src: string;
};

/** Logos del carrusel — fuente única para home, servicios y nosotros */
export const BRAND_TRUST_LOGOS: BrandLogo[] = [
  { name: 'Carrara', src: '/brands/carrara.png' },
  { name: 'Mossad', src: '/brands/mossad-v2.png' },
  { name: 'Prime Labs', src: '/brands/prime-labs.png' }
];

/** 8 items (2 ciclos idénticos) para loop seamless x: 0% → -50% */
export function getBrandTrustCarouselLogos(): BrandLogo[] {
  return [...BRAND_TRUST_LOGOS, ...BRAND_TRUST_LOGOS];
}
