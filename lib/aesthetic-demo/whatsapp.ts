import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

export type AestheticWhatsAppIntent =
  | 'home'
  | 'appointment'
  | 'closing'
  | 'diagnosis360'
  | 'cases'
  | 'evaluateCase'
  | 'specialists'
  | 'location'
  | { type: 'treatment'; name: string }
  | { type: 'specialist'; name: string };

function resolveMessage(demo: ResolvedAestheticDemo, intent: AestheticWhatsAppIntent = 'appointment'): string {
  if (typeof intent === 'object' && intent.type === 'treatment') {
    return demo.whatsapp.treatmentTemplate.replace('{name}', intent.name);
  }

  if (typeof intent === 'object' && intent.type === 'specialist') {
    return demo.whatsapp.specialistTemplate.replace('{name}', intent.name);
  }

  switch (intent) {
    case 'home':
    case 'closing':
      return demo.whatsapp.homeDiagnosis;
    case 'diagnosis360':
      return demo.whatsapp.diagnosis360;
    case 'cases':
      return demo.whatsapp.clinicalCase;
    case 'evaluateCase':
      return demo.whatsapp.evaluateCase;
    case 'specialists':
      return demo.whatsapp.specialists;
    case 'location':
      return demo.whatsapp.location;
    case 'appointment':
    default:
      return demo.whatsapp.appointment;
  }
}

export function buildAestheticWhatsAppUrl(
  demo: ResolvedAestheticDemo,
  intent: AestheticWhatsAppIntent = 'appointment'
): string {
  const message = resolveMessage(demo, intent);
  return `https://wa.me/${demo.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildAestheticPhoneUrl(demo: ResolvedAestheticDemo): string {
  return `tel:${demo.contact.phone}`;
}
