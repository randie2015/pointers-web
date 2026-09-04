import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function buildWhatsAppUrl(demo: ResolvedDemo): string {
  return `https://wa.me/${demo.closer.whatsapp}?text=${encodeURIComponent(demo.whatsappMessage)}`;
}

export function buildPhoneUrl(demo: ResolvedDemo): string {
  return `tel:${demo.closer.phone.replace(/\s/g, '')}`;
}
