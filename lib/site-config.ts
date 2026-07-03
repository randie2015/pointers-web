/** Pointers WhatsApp: +51 908 553 032 */
export const WHATSAPP_PHONE = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '51908553032'
);

const WHATSAPP_MESSAGES = {
  es: 'Hola Pointers, me gustaría obtener más información sobre sus servicios.',
  en: 'Hi Pointers, I would like to get more information about your services.'
} as const;

export const SERVICE_WHATSAPP_URLS = {
  branding:
    'https://wa.me/51908553032?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20Branding%20e%20Identidad%20Visual',
  'diseno-web':
    'https://wa.me/51908553032?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20Dise%C3%B1o%20Web%20y%20Experiencia%20Digital',
  contenido:
    'https://wa.me/51908553032?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20Contenido%20y%20Presencia%20en%20Redes',
  'estrategia-digital':
    'https://wa.me/51908553032?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20Estrategia%20Digital%20y%20Publicidad'
} as const;

export function getWhatsAppUrl(locale: keyof typeof WHATSAPP_MESSAGES) {
  const message = WHATSAPP_MESSAGES[locale] ?? WHATSAPP_MESSAGES.es;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppDisplayNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '+51 908 553 032';
}
