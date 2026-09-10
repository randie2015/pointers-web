export const MAIN_ROUTES = [
  { href: '/servicios', labelKey: 'ecosystem' },
  { href: '/#soluciones', labelKey: 'solutions' },
  { href: '/contact#formulario', labelKey: 'contact' }
] as const;

export const HOME_ANCHORS = [
  { href: '/#soluciones', labelKey: 'solutions' },
  { href: '/#proceso', labelKey: 'process' },
  { href: '/contact#formulario', labelKey: 'talk' },
  { href: '/#faq', labelKey: 'faq' }
] as const;

export type AppRoute = '/' | (typeof MAIN_ROUTES)[number]['href'] | (typeof HOME_ANCHORS)[number]['href'];
