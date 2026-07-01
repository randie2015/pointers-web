'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HOME_ANCHORS, MAIN_ROUTES } from '@/lib/navigation';

const TEAL = '#39B8AD';

const linkClass =
  'text-sm text-gray-800 transition-colors hover:text-[#39B8AD]';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const anchors = useTranslations('anchors');
  const year = new Date().getFullYear();

  const social = [
    { key: 'instagram', href: '#' },
    { key: 'facebook', href: '#' },
    { key: 'linkedin', href: '#' },
    { key: 'twitter', href: '#' }
  ] as const;

  return (
    <footer className="mt-20 bg-gradient-to-b from-transparent to-[#BC2656]/20 text-gray-800">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Image
              src="/logo-vertical-dark.png"
              alt="Pointers"
              width={1000}
              height={540}
              className="h-20 w-auto md:h-24"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-700">{t('newsletter')}</p>

            <form
              className="mt-4 flex max-w-md items-center rounded-lg bg-white p-1 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="w-full flex-1 border-none bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-105"
                style={{ backgroundColor: TEAL }}
              >
                {t('subscribe')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="mb-4 text-sm font-semibold text-gray-900">{t('links')}</p>
            <nav className="flex flex-col gap-2.5">
              {HOME_ANCHORS.map((item) => (
                <Link key={item.href} href={item.href} prefetch className={linkClass}>
                  {anchors(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-gray-900">{t('pages')}</p>
            <nav className="flex flex-col gap-2.5">
              {MAIN_ROUTES.map((item) => (
                <Link key={item.href} href={item.href} prefetch className={linkClass}>
                  {nav(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-gray-900">{t('socials')}</p>
            <nav className="flex flex-col gap-2.5">
              {social.map((s) => (
                <a key={s.key} href={s.href} className={linkClass}>
                  {t(`social.${s.key}`)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-300/50 pt-8 text-sm text-gray-600">
          <p>
            © {year} Pointers. {t('rights')} · {t('designedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
