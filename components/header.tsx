'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { NavHoverLink } from '@/components/nav-hover-link';
import { MAIN_ROUTES } from '@/lib/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
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
    <header className="sticky top-0 z-[100] bg-brand text-brand-foreground shadow-md shadow-brand/20">
      <div className="container-page flex h-16 md:h-[72px] items-center justify-between gap-6">
        <Link href="/" prefetch className="flex shrink-0 items-center gap-2" aria-label="Pointers home">
          <Image
            src="/logo.svg"
            alt="Pointers"
            width={140}
            height={32}
            className="h-7 w-auto brightness-0 invert md:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavHoverLink key={l.href} href={l.href} label={l.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <MaskUpButton href="/contact" label={t('cta')} size="compact" />
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
