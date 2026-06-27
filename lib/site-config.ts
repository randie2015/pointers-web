const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '51999999999';

const WHATSAPP_MESSAGES = {
  es: 'Hola Pointers, me gustaría obtener más información sobre sus servicios.',
  en: 'Hi Pointers, I would like to get more information about your services.'
} as const;

export function getWhatsAppUrl(locale: keyof typeof WHATSAPP_MESSAGES) {
  const message = WHATSAPP_MESSAGES[locale] ?? WHATSAPP_MESSAGES.es;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
