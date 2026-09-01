'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  'relative text-sm font-medium text-mag-navy transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-mag-jade after:transition-all after:duration-300 hover:text-mag-jade hover:after:w-full';

export function MagrassNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl('appointment');

  return (
    <header className="sticky top-0 z-50 border-b border-mag-navy/10 bg-mag-sand/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 lg:gap-4">
        <Link href={MAGRASS_BASE} className="group min-w-0 shrink">
          <MagrassLogo size="nav" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {clinicNav.map((item) => {
            const active = isMagrassPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  navLinkClass,
                  active && 'text-mag-jade after:w-full'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <MagrassCtaButton href={whatsappUrl} label="Agendar Cita" variant="nav" />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-mag-navy transition-colors duration-300 hover:text-mag-jade lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-mag-navy/10 bg-mag-sand px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {clinicNav.map((item) => {
              const active = isMagrassPath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-xl px-3 py-3 text-sm font-medium text-mag-navy transition-colors duration-300',
                    active ? 'bg-mag-white/80 text-mag-jade' : 'hover:bg-mag-white/60 hover:text-mag-jade'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <MagrassCtaButton href={whatsappUrl} label="Agendar Cita" variant="nav" fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
