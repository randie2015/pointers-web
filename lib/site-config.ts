/** Pointers WhatsApp — único número público y de notificación. */
export const WHATSAPP_PHONE = '51904330335';
export const WHATSAPP_DISPLAY = '+51 904 330 335';

const WHATSAPP_MESSAGES = {
  es: 'Hola Pointers, quiero conversar sobre infraestructura comercial y desarrollo para mi marca.',
  en: 'Hi Pointers, I would like to discuss commercial infrastructure and development for my brand.'
} as const;

const SERVICE_MESSAGES = {
  branding: 'Hola, estoy interesado en Brand Architecture & Positioning.',
  'diseno-web': 'Hola, estoy interesado en High-Performance Web & App Development.',
  'estrategia-digital': 'Hola, estoy interesado en Commercial Infrastructure & Funnels.'
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

const PLAN_LABELS = {
  pro: 'Pro',
  premium: 'Premium',
  pointers: 'Pointers'
} as const;

export type ServicePlanKey = keyof typeof PLAN_LABELS;

export function getServicePlanWhatsAppUrl(slug: ServiceWhatsAppSlug, plan: ServicePlanKey) {
  const message = `${SERVICE_MESSAGES[slug]} Me interesa el plan ${PLAN_LABELS[plan]}.`;
  return buildWhatsAppUrl(message);
}

/** @deprecated Use getServiceWhatsAppUrl(slug) */
export const SERVICE_WHATSAPP_URLS = {
  branding: buildWhatsAppUrl(SERVICE_MESSAGES.branding),
  'diseno-web': buildWhatsAppUrl(SERVICE_MESSAGES['diseno-web']),
  'estrategia-digital': buildWhatsAppUrl(SERVICE_MESSAGES['estrategia-digital'])
} as const;

export function getWhatsAppDisplayNumber() {
  return WHATSAPP_DISPLAY;
}

/** Anchor id del bloque de formulario en /contact */
export const CONTACT_FORM_SECTION_ID = 'contact-form';

export function getContactUrl(options?: { service?: ServiceWhatsAppSlug; plan?: ServicePlanKey }) {
  const params = new URLSearchParams();
  if (options?.service) params.set('servicio', options.service);
  if (options?.plan) params.set('plan', options.plan);
  const query = params.toString();
  const base = query ? `/contact?${query}` : '/contact';
  return `${base}#${CONTACT_FORM_SECTION_ID}`;
}

export function getContactEmail() {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@pointers.marketing';
}
