'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clinicNav } from '@/src/data/orthozentData';
import { buildWhatsAppUrl } from '@/lib/orthozent/whatsapp';
import { OrthozentCtaButton } from '@/components/orthozent/cta-button';
import { OrthozentLogo } from '@/components/orthozent/logo';
import { cn } from '@/lib/utils';

function isOrthozentPath(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.endsWith(href) && href !== '/orthozent';
}

export function OrthozentNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ortho-dark/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:gap-4">
        <Link href="/orthozent" className="group min-w-0">
          <OrthozentLogo variant="light" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {clinicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-ortho-gold',
                isOrthozentPath(pathname, item.href) ? 'text-ortho-gold' : 'text-white/90'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <OrthozentCtaButton href={whatsappUrl} label="Agendar Cita" />
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ortho-dark px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {clinicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium',
                  isOrthozentPath(pathname, item.href)
                    ? 'bg-white/10 text-ortho-gold'
                    : 'text-white/90 hover:bg-white/5'
                )}
              >
                {item.label}
              </Link>
            ))}
            <OrthozentCtaButton href={whatsappUrl} label="Agendar Cita" fullWidth className="mt-1" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
