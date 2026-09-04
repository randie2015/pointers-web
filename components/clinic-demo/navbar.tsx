'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { buildWhatsAppUrl } from '@/lib/clinic-demo/whatsapp';
import { ClinicCtaButton } from '@/components/clinic-demo/cta-button';
import { ClinicLogo } from '@/components/clinic-demo/logo';
import { useDemo } from '@/components/clinic-demo/demo-provider';
import { useNavbarBehavior, type NavSectionTheme } from '@/components/clinic-demo/use-navbar-behavior';
import { cn } from '@/lib/utils';

function isDemoPath(pathname: string, href: string, basePath: string) {
  if (pathname === href) return true;
  return pathname.endsWith(href) && href !== basePath;
}

type NavChrome = {
  bar: string;
  link: string;
  linkActive: string;
  menuBtn: string;
  mobilePanel: string;
  mobileLink: string;
  mobileLinkActive: string;
  logoTheme: 'light' | 'dark';
  ctaVariant: 'primary' | 'light';
};

function getNavChrome(theme: NavSectionTheme, scrolled: boolean, isHome: boolean): NavChrome {
  const glassHero = isHome && !scrolled && theme === 'light';

  if (theme === 'dark') {
    return {
      bar: 'border-demo-accent/30 bg-demo-ink/95 shadow-lg shadow-demo-ink/25',
      link: 'text-white/80 hover:text-demo-soft',
      linkActive: 'text-demo-soft',
      menuBtn: 'text-white hover:bg-white/10',
      mobilePanel: 'border-demo-accent/25 bg-demo-ink/98',
      mobileLink: 'text-white/90 hover:bg-white/10',
      mobileLinkActive: 'bg-white/10 text-demo-soft',
      logoTheme: 'dark',
      ctaVariant: 'light'
    };
  }

  if (theme === 'rose') {
    return {
      bar: glassHero
        ? 'border-demo-accent/30 bg-demo-soft/75 shadow-sm'
        : 'border-demo-accent/45 bg-demo-soft/92 shadow-md shadow-demo-soft/20',
      link: 'text-demo-charcoal hover:text-demo-primary',
      linkActive: 'text-demo-primary-dark',
      menuBtn: 'text-demo-ink hover:bg-demo-ink/5',
      mobilePanel: 'border-demo-accent/35 bg-demo-soft/98',
      mobileLink: 'text-demo-charcoal hover:bg-demo-ink/5',
      mobileLinkActive: 'bg-demo-ink/8 text-demo-primary-dark',
      logoTheme: 'light',
      ctaVariant: 'primary'
    };
  }

  return {
    bar: glassHero
      ? 'border-demo-accent/25 bg-demo-base/72'
      : scrolled
        ? 'border-demo-accent/40 bg-demo-base/95 shadow-sm shadow-demo-ink/5'
        : 'border-demo-accent/35 bg-demo-base/88',
    link: 'text-demo-charcoal hover:text-demo-primary',
    linkActive: 'text-demo-primary-dark',
    menuBtn: 'text-demo-ink hover:bg-demo-ink/5',
    mobilePanel: 'border-demo-accent/30 bg-demo-base/98',
    mobileLink: 'text-demo-charcoal hover:bg-demo-soft/20',
    mobileLinkActive: 'bg-demo-soft/30 text-demo-primary-dark',
    logoTheme: 'light',
    ctaVariant: 'primary'
  };
}

export function ClinicNavbar() {
  const demo = useDemo();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(demo);
  const { visible, scrolled, sectionTheme } = useNavbarBehavior(pathname);

  const isHome = pathname === demo.basePath;
  const chrome = getNavChrome(sectionTheme, scrolled, isHome);
  const showBar = visible || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[transform,background-color,border-color,box-shadow,opacity] duration-500 ease-out',
        chrome.bar,
        showBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 lg:gap-4">
        <Link
          href={demo.basePath}
          className="group flex min-w-0 max-w-[calc(100%-3rem)] shrink items-center sm:max-w-[70%] lg:max-w-none"
        >
          <ClinicLogo demo={demo} theme={chrome.logoTheme} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {demo.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors duration-300',
                isDemoPath(pathname, item.href, demo.basePath) ? chrome.linkActive : chrome.link
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <ClinicCtaButton href={whatsappUrl} label="Agendar Cita" variant={chrome.ctaVariant} />
        </div>

        <button
          type="button"
          className={cn('inline-flex shrink-0 rounded-lg p-2 transition-colors duration-300 lg:hidden', chrome.menuBtn)}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div
          className={cn(
            'max-h-[calc(100dvh-4rem)] overflow-y-auto border-t px-4 py-4 backdrop-blur-xl transition-colors duration-500 lg:hidden',
            chrome.mobilePanel
          )}
        >
          <nav className="flex flex-col gap-2">
            {demo.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-300',
                  isDemoPath(pathname, item.href, demo.basePath) ? chrome.mobileLinkActive : chrome.mobileLink
                )}
              >
                {item.label}
              </Link>
            ))}
            <ClinicCtaButton href={whatsappUrl} label="Agendar Cita" variant={chrome.ctaVariant} fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
