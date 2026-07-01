'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

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
          {/* Logo + newsletter */}
          <div className="lg:col-span-5">
            <Image
              src="/logo-brand.svg"
              alt="Pointers"
              width={160}
              height={36}
              className="h-8 w-auto md:h-9"
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

          {/* Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <p className="mb-4 text-sm font-semibold text-gray-900">{t('links')}</p>
            <nav className="flex flex-col gap-2.5">
              <Link href="/#servicios" prefetch className={linkClass}>
                {anchors('services')}
              </Link>
              <Link href="/#proceso" prefetch className={linkClass}>
                {anchors('process')}
              </Link>
              <Link href="/#por-que" prefetch className={linkClass}>
                {anchors('why')}
              </Link>
              <Link href="/#faq" prefetch className={linkClass}>
                {anchors('faq')}
              </Link>
            </nav>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-gray-900">{t('pages')}</p>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" prefetch className={linkClass}>
                {nav('about')}
              </Link>
              <Link href="/servicios" prefetch className={linkClass}>
                {nav('services')}
              </Link>
              <Link href="/contact" prefetch className={linkClass}>
                {nav('contact')}
              </Link>
              <Link href="/blog" prefetch className={linkClass}>
                {nav('blog')}
              </Link>
            </nav>
          </div>

          {/* Socials */}
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

        <div className="mt-14 flex flex-col gap-2 border-t border-gray-300/50 pt-8 text-sm text-gray-700 md:flex-row md:items-center md:justify-between">
          <p>{t('designedBy')}</p>
          <div className="flex items-center gap-4">
            <a
              href="/admin/login"
              className="text-xs text-gray-400 transition hover:text-brand"
              aria-label="Acceso administración"
            >
              Admin
            </a>
            <p className="text-gray-600">
              © {year} Pointers. {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
