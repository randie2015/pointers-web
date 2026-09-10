export const MAIN_ROUTES = [
  { href: '/servicios', labelKey: 'ecosystem' },
  { href: '/#services', labelKey: 'solutions' },
  { href: '/contact#contact-form', labelKey: 'contact' }
] as const;

export const HOME_ANCHORS = [
  { href: '/#services', labelKey: 'solutions' },
  { href: '/#proceso', labelKey: 'process' },
  { href: '/contact#contact-form', labelKey: 'talk' },
  { href: '/#faq', labelKey: 'faq' }
] as const;

export type AppRoute = '/' | (typeof MAIN_ROUTES)[number]['href'] | (typeof HOME_ANCHORS)[number]['href'];
