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
  'relative text-sm font-medium text-[#192031] transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#197876] after:transition-all after:duration-300 hover:text-[#197876] hover:after:w-full';

export function MagrassNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl('appointment');

  return (
    <header className="sticky top-0 z-50 border-b border-[#192031]/10 bg-[#C5A57D]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 md:px-12">
        <Link href={MAGRASS_BASE} className="group flex shrink-0 items-center">
          <MagrassLogo size="nav" className="group-hover:opacity-90" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {clinicNav.map((item) => {
            const active = isMagrassPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLinkClass, active && 'text-[#197876] after:w-full')}
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
            className="!min-h-0 h-9 px-4 py-2 text-xs"
          />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#192031] transition-colors duration-300 hover:text-[#197876] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#192031]/10 bg-[#C5A57D] px-6 py-4 md:px-12 lg:hidden">
          <nav className="flex flex-col gap-2">
            {clinicNav.map((item) => {
              const active = isMagrassPath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-xl px-3 py-3 text-sm font-medium text-[#192031] transition-colors duration-300',
                    active ? 'bg-white/80 text-[#197876]' : 'hover:bg-white/60 hover:text-[#197876]'
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
              className="mt-1 !min-h-0 h-10 text-xs"
            />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
