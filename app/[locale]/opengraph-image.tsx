import { generateOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from '@/lib/og-image';
import { OG_COPY, resolveOgLocale } from '@/lib/og';

export const runtime = 'nodejs';
export const alt = OG_COPY.es.alt;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function LocaleOpenGraphImage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateOgImage(resolveOgLocale(locale));
}
