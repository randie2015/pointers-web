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

const PLAN_LABELS = {
  pro: 'Pro',
  premium: 'Premium',
  pointers: 'Pointers'
} as const;

export type ServicePlanKey = keyof typeof PLAN_LABELS;

export function getServicePlanWhatsAppUrl(slug: ServiceWhatsAppSlug, plan: ServicePlanKey) {
  const message = `${SERVICE_MESSAGES[slug]}. Me interesa el plan ${PLAN_LABELS[plan]}.`;
  return buildWhatsAppUrl(message);
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

/** Anchor id del bloque de formulario en /contact */
export const CONTACT_FORM_SECTION_ID = 'formulario';

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
