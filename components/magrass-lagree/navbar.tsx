'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { clinicNav } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { MagrassLogo } from '@/components/magrass-lagree/logo';

export function MagrassNavbar() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header className="sticky top-0 z-50 border-b border-mag-border/80 bg-mag-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="#inicio" className="min-w-0 shrink">
          <MagrassLogo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {clinicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-mag-navy/85 transition-colors hover:text-mag-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <MagrassCtaButton href={whatsappUrl} label="Agendar Cita" />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-mag-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-mag-border bg-mag-ivory px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {clinicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-mag-navy hover:bg-mag-white"
              >
                {item.label}
              </Link>
            ))}
            <MagrassCtaButton href={whatsappUrl} label="Agendar Cita" fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
