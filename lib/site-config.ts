/** Pointers WhatsApp: +51 908 553 032 */
export const WHATSAPP_PHONE = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '51908553032'
);

const WHATSAPP_MESSAGES = {
  es: 'Hola Pointers, me gustaría obtener más información sobre sus servicios.',
  en: 'Hi Pointers, I would like to get more information about your services.'
} as const;

const SERVICE_MESSAGES = {
  branding: 'Hola, estoy interesado en sus servicios de Branding e Identidad Visual',
  'diseno-web': 'Hola, estoy interesado en sus servicios de Diseño Web y Experiencia Digital',
  contenido: 'Hola, estoy interesado en sus servicios de Contenido y Presencia en Redes',
  'estrategia-digital': 'Hola, estoy interesado en sus servicios de Estrategia Digital y Publicidad'
} as const;

export type ServiceWhatsAppSlug = keyof typeof SERVICE_MESSAGES;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppUrl(locale: keyof typeof WHATSAPP_MESSAGES) {
  const message = WHATSAPP_MESSAGES[locale] ?? WHATSAPP_MESSAGES.es;
  return buildWhatsAppUrl(message);
}

export function getServiceWhatsAppUrl(slug: ServiceWhatsAppSlug) {
  return buildWhatsAppUrl(SERVICE_MESSAGES[slug]);
}

/** @deprecated Use getServiceWhatsAppUrl(slug) */
export const SERVICE_WHATSAPP_URLS = {
  branding: buildWhatsAppUrl(SERVICE_MESSAGES.branding),
  'diseno-web': buildWhatsAppUrl(SERVICE_MESSAGES['diseno-web']),
  contenido: buildWhatsAppUrl(SERVICE_MESSAGES.contenido),
  'estrategia-digital': buildWhatsAppUrl(SERVICE_MESSAGES['estrategia-digital'])
} as const;

export function getWhatsAppDisplayNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '+51 908 553 032';
}
