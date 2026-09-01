'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clinicNav } from '@/src/data/alejandraData';
import { buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';
import { DraAlejandraLogo } from '@/components/dra-alejandra/logo';
import { useNavbarBehavior, type NavSectionTheme } from '@/components/dra-alejandra/use-navbar-behavior';
import { cn } from '@/lib/utils';

function isDraAlejandraPath(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.endsWith(href) && href !== '/alejandracusirramos';
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
      bar: 'border-ale-gold/30 bg-ale-ink/95 shadow-lg shadow-ale-ink/25',
      link: 'text-white/80 hover:text-ale-rose',
      linkActive: 'text-ale-rose',
      menuBtn: 'text-white hover:bg-white/10',
      mobilePanel: 'border-ale-gold/25 bg-ale-ink/98',
      mobileLink: 'text-white/90 hover:bg-white/10',
      mobileLinkActive: 'bg-white/10 text-ale-rose',
      logoTheme: 'dark',
      ctaVariant: 'light'
    };
  }

  if (theme === 'rose') {
    return {
      bar: glassHero
        ? 'border-ale-gold/30 bg-ale-rose/75 shadow-sm'
        : 'border-ale-gold/45 bg-ale-rose/92 shadow-md shadow-ale-rose/20',
      link: 'text-ale-charcoal hover:text-ale-cta',
      linkActive: 'text-ale-cta-dark',
      menuBtn: 'text-ale-ink hover:bg-ale-ink/5',
      mobilePanel: 'border-ale-gold/35 bg-ale-rose/98',
      mobileLink: 'text-ale-charcoal hover:bg-ale-ink/5',
      mobileLinkActive: 'bg-ale-ink/8 text-ale-cta-dark',
      logoTheme: 'light',
      ctaVariant: 'primary'
    };
  }

  return {
    bar: glassHero
      ? 'border-ale-gold/25 bg-ale-ivory/72'
      : scrolled
        ? 'border-ale-gold/40 bg-ale-ivory/95 shadow-sm shadow-ale-ink/5'
        : 'border-ale-gold/35 bg-ale-ivory/88',
    link: 'text-ale-charcoal hover:text-ale-cta',
    linkActive: 'text-ale-cta-dark',
    menuBtn: 'text-ale-ink hover:bg-ale-ink/5',
    mobilePanel: 'border-ale-gold/30 bg-ale-ivory/98',
    mobileLink: 'text-ale-charcoal hover:bg-ale-rose/20',
    mobileLinkActive: 'bg-ale-rose/30 text-ale-cta-dark',
    logoTheme: 'light',
    ctaVariant: 'primary'
  };
}

export function DraAlejandraNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();
  const { visible, scrolled, sectionTheme } = useNavbarBehavior(pathname);

  const isHome = pathname === '/alejandracusirramos';
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
        <Link href="/alejandracusirramos" className="group flex min-w-0 max-w-[calc(100%-3rem)] shrink items-center sm:max-w-[70%] lg:max-w-none">
          <DraAlejandraLogo theme={chrome.logoTheme} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {clinicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors duration-300',
                isDraAlejandraPath(pathname, item.href) ? chrome.linkActive : chrome.link
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <DraAlejandraCtaButton href={whatsappUrl} label="Agendar Cita" variant={chrome.ctaVariant} />
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
            {clinicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-300',
                  isDraAlejandraPath(pathname, item.href) ? chrome.mobileLinkActive : chrome.mobileLink
                )}
              >
                {item.label}
              </Link>
            ))}
            <DraAlejandraCtaButton href={whatsappUrl} label="Agendar Cita" variant={chrome.ctaVariant} fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
