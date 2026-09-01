'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clinicBrand, clinicNav, clinicWhatsApp } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { cn } from '@/lib/utils';

function isReyDentalPath(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.endsWith(href) && href !== '/rey-dental';
}

export function ReyDentalNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(clinicWhatsApp.appointment);

  return (
    <header className="sticky top-0 z-50 border-b border-rey-neutral/30 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:gap-4">
        <Link href="/rey-dental" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rey-primary text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
            R
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-sm font-bold text-rey-ink group-hover:text-rey-primary sm:text-base">
              {clinicBrand.name}
            </p>
            <p className="truncate text-xs text-slate-500 max-[360px]:hidden sm:block">{clinicBrand.doctor}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {clinicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-rey-primary',
                isReyDentalPath(pathname, item.href) ? 'text-rey-primary' : 'text-rey-ink'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <ReyDentalCtaButton href={whatsappUrl} label="Agendar Cita" />
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 rounded-lg p-2 text-rey-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rey-neutral/30 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {clinicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium',
                  isReyDentalPath(pathname, item.href) ? 'bg-rey-accent/30 text-rey-primary' : 'text-rey-ink'
                )}
              >
                {item.label}
              </Link>
            ))}
            <ReyDentalCtaButton href={whatsappUrl} label="Agendar Cita" fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
