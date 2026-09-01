import { clinicBrand, pointersCloser } from '@/src/data/clinicData';

export function buildDemoWhatsAppMessage(topic?: string): string {
  const base = `Hola ${pointersCloser.name}, estuve revisando la demo de la web para ${clinicBrand.name} y me gustaría coordinar los detalles finales.`;

  if (!topic) return base;

  return `${base} Me interesa conversar sobre: ${topic}.`;
}

export function buildWhatsAppUrl(topic?: string): string {
  const message = buildDemoWhatsAppMessage(topic);
  return `https://wa.me/${pointersCloser.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(): string {
  return `tel:${pointersCloser.phone.replace(/\s/g, '')}`;
}
