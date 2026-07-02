'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { NavHoverLink } from '@/components/nav-hover-link';
import { MAIN_ROUTES } from '@/lib/navigation';
import { Menu, X } from 'lucide-react';
import { HeaderLogo } from '@/components/header-logo';
import { MaskUpButton } from '@/components/ui/mask-up-button';

const PREFETCH_ROUTES = ['/', ...MAIN_ROUTES.map((r) => r.href)] as const;

export function Header() {
  const t = useTranslations('nav');
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
    <header className="sticky top-0 z-[100] bg-brand text-white">
      <div className="container-page flex h-[68px] items-center justify-between gap-8 md:h-[76px]">
        <Link href="/" prefetch className="flex shrink-0 items-center text-white" aria-label="Pointers home">
          <HeaderLogo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-1" aria-label="Main">
            {links.map((l) => (
              <NavHoverLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>
          <div className="ml-4 flex items-center gap-3 border-l border-white/20 pl-4">
            <LocaleSwitcher />
            <MaskUpButton href="/contact" label={t('cta')} size="compact" />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            className="text-white"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/15 bg-brand md:hidden">
          <nav className="container-page flex flex-col gap-1 py-6" aria-label="Mobile">
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
                href="/contact"
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
