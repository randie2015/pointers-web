import { clinicWhatsApp, pointersCloser } from '@/src/data/alejandraData';

export function buildDemoWhatsAppMessage(): string {
  return clinicWhatsApp.defaultMessage;
}

export function buildWhatsAppUrl(): string {
  return `https://wa.me/${pointersCloser.whatsapp}?text=${encodeURIComponent(buildDemoWhatsAppMessage())}`;
}

export function buildPhoneUrl(): string {
  return `tel:${pointersCloser.phone.replace(/\s/g, '')}`;
}
