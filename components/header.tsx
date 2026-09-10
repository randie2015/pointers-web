'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { NavHoverLink } from '@/components/nav-hover-link';
import { MAIN_ROUTES } from '@/lib/navigation';
import { Menu, X } from 'lucide-react';
import { HeaderLogo } from '@/components/header-logo';
import { MaskUpButton } from '@/components/ui/mask-up-button';
import { getWhatsAppUrl } from '@/lib/site-config';

const PREFETCH_ROUTES = ['/', '/servicios', '/contact', '/nosotros'] as const;

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as 'es' | 'en';
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = MAIN_ROUTES.map((route) => ({
    href: route.href,
    label: t(route.labelKey)
  }));

  useEffect(() => {
    PREFETCH_ROUTES.forEach((href) => router.prefetch(href));
  }, [router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[100] text-white">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full z-0 h-14 w-[min(42rem,80%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BC2656] opacity-10 blur-[100px]"
        />

        <div className="relative z-10 bg-[#090A0F]/50 backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          <div className="container-page relative flex h-[68px] items-center justify-between gap-8 md:h-[76px]">
            <Link href="/" prefetch className="touch-press flex shrink-0 items-center text-white active:opacity-90" aria-label="Pointers home">
              <HeaderLogo priority />
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <nav className="flex items-center gap-1" aria-label="Main">
                {links.map((l) => (
                  <NavHoverLink key={l.href} href={l.href} label={l.label} />
                ))}
              </nav>
              <div className="ml-4 flex items-center gap-3 border-l border-white/10 pl-4">
                <LocaleSwitcher />
                <MaskUpButton href={getWhatsAppUrl(locale)} label={t('cta')} size="compact" />
              </div>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <LocaleSwitcher />
              <button
                type="button"
                className="touch-press rounded-xl p-2 text-white active:bg-white/10"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="relative z-10 overflow-hidden border-b border-white/5 bg-[#090A0F]/60 backdrop-blur-2xl md:hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-28 w-[75%] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[#BC2656] opacity-15 blur-[80px]"
          />
          <nav className="container-page relative flex flex-col gap-1 py-6 text-slate-200" aria-label="Mobile">
            {links.map((l) => (
              <NavHoverLink
                key={l.href}
                href={l.href}
                label={l.label}
                onClick={() => setOpen(false)}
                className="text-base"
              />
            ))}
            <div className="mt-3">
              <MaskUpButton
                href={getWhatsAppUrl(locale)}
                label={t('cta')}
                size="compact"
                onClick={() => setOpen(false)}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
