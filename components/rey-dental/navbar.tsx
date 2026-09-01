'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clinicBrand, clinicNav, clinicWhatsApp } from '@/src/data/clinicData';
import { buildWhatsAppUrl } from '@/lib/rey-dental/whatsapp';
import { ReyDentalCtaButton } from '@/components/rey-dental/cta-button';
import { cn } from '@/lib/utils';

export function ReyDentalNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(clinicWhatsApp.appointment);

  return (
    <header className="sticky top-0 z-50 border-b border-rey-neutral/30 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/rey-dental" className="group flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rey-primary text-lg font-bold text-white">
            R
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-bold text-rey-ink group-hover:text-rey-primary">{clinicBrand.name}</p>
            <p className="text-xs text-slate-500">{clinicBrand.doctor}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {clinicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-rey-primary',
                pathname === item.href ? 'text-rey-primary' : 'text-rey-ink'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ReyDentalCtaButton href={whatsappUrl} label="Agendar Cita" />
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-rey-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-rey-neutral/30 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {clinicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium',
                  pathname === item.href ? 'bg-rey-accent/30 text-rey-primary' : 'text-rey-ink'
                )}
              >
                {item.label}
              </Link>
            ))}
            <ReyDentalCtaButton href={whatsappUrl} label="Agendar Cita" className="w-full" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
