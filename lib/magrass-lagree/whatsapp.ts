import { clinicContact, clinicWhatsApp } from '@/src/data/magrassData';

export type WhatsAppIntent =
  | 'home'
  | 'appointment'
  | 'closing'
  | 'diagnosis360'
  | 'cases'
  | 'specialists'
  | 'location'
  | { type: 'treatment'; name: string };

function resolveMessage(intent: WhatsAppIntent = 'appointment'): string {
  if (typeof intent === 'object' && intent.type === 'treatment') {
    return clinicWhatsApp.treatment(intent.name);
  }

  switch (intent) {
    case 'home':
    case 'closing':
      return clinicWhatsApp.homeDiagnosis;
    case 'diagnosis360':
      return clinicWhatsApp.diagnosis360;
    case 'cases':
      return clinicWhatsApp.clinicalCase;
    case 'specialists':
      return clinicWhatsApp.specialists;
    case 'location':
      return clinicWhatsApp.location;
    case 'appointment':
    default:
      return clinicWhatsApp.appointment;
  }
}

export function buildWhatsAppUrl(intent: WhatsAppIntent = 'appointment'): string {
  const message = resolveMessage(intent);
  return `https://wa.me/${clinicContact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(): string {
  return `tel:${clinicContact.phone}`;
}
