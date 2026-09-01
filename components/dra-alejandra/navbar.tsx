'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clinicNav } from '@/src/data/alejandraData';
import { buildWhatsAppUrl } from '@/lib/dra-alejandra/whatsapp';
import { DraAlejandraCtaButton } from '@/components/dra-alejandra/cta-button';
import { DraAlejandraLogo } from '@/components/dra-alejandra/logo';
import { cn } from '@/lib/utils';

function isDraAlejandraPath(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.endsWith(href) && href !== '/alejandracusirramos';
}

export function DraAlejandraNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header className="sticky top-0 z-50 border-b border-ale-gold/40 bg-ale-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:gap-4">
        <Link href="/alejandracusirramos" className="group min-w-0">
          <DraAlejandraLogo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {clinicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors hover:text-ale-cta',
                isDraAlejandraPath(pathname, item.href) ? 'text-ale-cta' : 'text-ale-ink/80'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <DraAlejandraCtaButton href={whatsappUrl} label="Agendar Cita" />
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 rounded-lg p-2 text-ale-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ale-gold/30 bg-ale-ivory px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {clinicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-3 py-3 text-sm font-medium',
                  isDraAlejandraPath(pathname, item.href)
                    ? 'bg-ale-rose/30 text-ale-cta'
                    : 'text-ale-ink hover:bg-ale-rose/15'
                )}
              >
                {item.label}
              </Link>
            ))}
            <DraAlejandraCtaButton href={whatsappUrl} label="Agendar Cita" fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
