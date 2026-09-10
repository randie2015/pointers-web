'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { HOME_ANCHORS, MAIN_ROUTES } from '@/lib/navigation';
import { getContactEmail, getWhatsAppDisplayNumber, getWhatsAppUrl } from '@/lib/site-config';
import { useLocale } from 'next-intl';

const SOCIAL_ICON_SIZE = 36;

const linkClass =
  'text-sm text-slate-400 transition-all duration-200 hover:text-[#BC2656] active:scale-95 active:text-[#BC2656]';

const social = [
  {
    key: 'facebook',
    href: 'https://www.facebook.com/PointersMarketing',
    icon: '/social/facebook.png',
    label: 'Facebook'
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/pointers.marketing',
    icon: '/social/instagram.png',
    label: 'Instagram'
  },
  {
    key: 'x',
    href: 'https://x.com/pointersmkt',
    icon: '/social/x.svg',
    label: 'X'
  }
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const anchors = useTranslations('anchors');
  const locale = useLocale() as 'es' | 'en';
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-gradient-to-b from-transparent to-[#BC2656]/10 text-slate-300">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link href="/" prefetch className="inline-flex items-center" aria-label="Pointers home">
              <img
                src="/brand/logo-horizontal.svg"
                alt="Pointers"
                width={576}
                height={103}
                className="h-10 w-auto md:h-12"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">{t('newsletter')}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-press inline-flex items-center rounded-full bg-[#BC2656] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#BC2656]/25 transition hover:brightness-110"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${getContactEmail()}`}
                className="touch-press inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-[#BC2656]/40 hover:text-white"
              >
                {getContactEmail()}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="mb-4 text-sm font-semibold text-slate-100">{t('links')}</p>
            <nav className="flex flex-col gap-2.5">
              {HOME_ANCHORS.map((item) => (
                <Link key={item.href} href={item.href} prefetch className={linkClass}>
                  {item.labelKey === 'solutions' ? nav('solutions') : anchors(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-slate-100">{t('pages')}</p>
            <nav className="flex flex-col gap-2.5">
              {MAIN_ROUTES.map((item) => (
                <Link key={item.href} href={item.href} prefetch className={linkClass}>
                  {nav(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-slate-100">{t('socials')}</p>
            <nav className="flex items-center gap-4" aria-label={t('socials')}>
              {social.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="touch-press inline-flex opacity-80 transition-opacity hover:opacity-100 active:scale-95"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={SOCIAL_ICON_SIZE}
                    height={SOCIAL_ICON_SIZE}
                    className="h-9 w-9 object-contain brightness-0 invert"
                  />
                </a>
              ))}
            </nav>
            <p className="mt-4 text-xs text-slate-500">{getWhatsAppDisplayNumber()}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-8 text-sm text-slate-500">
          <p>
            © {year} Pointers. {t('rights')} · {t('designedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
