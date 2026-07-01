export const MAIN_ROUTES = [
  { href: '/nosotros', labelKey: 'about' },
  { href: '/servicios', labelKey: 'services' },
  { href: '/contact', labelKey: 'contact' },
  { href: '/blog', labelKey: 'blog' }
] as const;

export const HOME_ANCHORS = [
  { href: '/#proceso', labelKey: 'process' },
  { href: '/#por-que', labelKey: 'why' },
  { href: '/#hablemos', labelKey: 'talk' },
  { href: '/#faq', labelKey: 'faq' }
] as const;

export type AppRoute = '/' | (typeof MAIN_ROUTES)[number]['href'];
