import { clinicContact, clinicWhatsApp } from '@/src/data/magrassData';

export function buildWhatsAppUrl(): string {
  return `https://wa.me/${clinicContact.whatsapp}?text=${encodeURIComponent(clinicWhatsApp.defaultMessage)}`;
}

export function buildPhoneUrl(): string {
  return `tel:${clinicContact.phone}`;
}
