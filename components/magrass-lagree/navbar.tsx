'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { clinicNav, MAGRASS_BASE } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassLogo } from '@/components/magrass-lagree/logo';
import { cn } from '@/lib/utils';

function isMagrassPath(pathname: string, href: string) {
  if (href === MAGRASS_BASE) {
    return pathname === MAGRASS_BASE || pathname === `${MAGRASS_BASE}/`;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinkClass =
  'relative text-sm font-medium text-[#1C2331] transition-colors duration-300 after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:origin-center after:rounded-full after:bg-[#C5A880] after:transition-all after:duration-300 hover:text-[#C5A880] hover:after:w-full';

export function MagrassNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const whatsappUrl = buildWhatsAppUrl('appointment');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 isolate w-full border-b bg-white transition-[border-color,box-shadow] duration-300 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]',
        scrolled ? 'border-gray-200 shadow-md shadow-[#1C2331]/8' : 'border-gray-100 shadow-sm'
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 lg:px-8',
          scrolled ? 'h-16' : 'h-20'
        )}
      >
        <Link href={MAGRASS_BASE} className="group flex shrink-0 items-center">
          <MagrassLogo size="nav" className="transition-opacity duration-300 group-hover:opacity-90" />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-7">
          {clinicNav.map((item) => {
            const active = isMagrassPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLinkClass, active && 'text-[#C5A880] after:w-full')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <MagrassCtaButton
            href={whatsappUrl}
            label="Agendar Cita"
            variant="nav"
            className="!min-h-0 h-9 bg-[#1C2331] px-4 py-2 text-xs text-white hover:bg-[#1C2331]/90"
          />
        </div>

        <button
          type="button"
          className="rounded-lg p-2.5 text-[#1C2331] transition-colors duration-300 hover:text-[#C5A880] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-gray-100 bg-white px-4 py-4 sm:px-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {clinicNav.map((item) => {
              const active = isMagrassPath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'relative rounded-xl px-3 py-3 text-sm font-medium text-[#1C2331] transition-colors duration-300 after:absolute after:bottom-2 after:left-3 after:h-0.5 after:w-0 after:origin-center after:rounded-full after:bg-[#C5A880] after:transition-all after:duration-300',
                    active
                      ? 'bg-gray-50 text-[#C5A880] after:w-8'
                      : 'hover:bg-gray-50 hover:text-[#C5A880] hover:after:w-8'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <MagrassCtaButton
              href={whatsappUrl}
              label="Agendar Cita"
              variant="nav"
              fullWidth
              className="mt-2 !min-h-0 h-10 bg-[#1C2331] text-xs text-white hover:bg-[#1C2331]/90"
            />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
