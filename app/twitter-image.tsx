import { generateOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from '@/lib/og-image';
import { OG_COPY } from '@/lib/og';

export const runtime = 'nodejs';
export const alt = OG_COPY.es.alt;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function TwitterImage() {
  return generateOgImage('es');
}
