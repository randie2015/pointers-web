import { clinicWhatsApp, pointersCloser } from '@/src/data/orthozentData';

export function buildDemoWhatsAppMessage(): string {
  return clinicWhatsApp.defaultMessage;
}

export function buildWhatsAppUrl(): string {
  const message = buildDemoWhatsAppMessage();
  return `https://wa.me/${pointersCloser.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(): string {
  return `tel:${pointersCloser.phone.replace(/\s/g, '')}`;
}
