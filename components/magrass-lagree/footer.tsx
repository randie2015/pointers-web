import Link from 'next/link';
import { clinicBrand, clinicContact, clinicNav } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassLogo } from '@/components/magrass-lagree/logo';

export function MagrassFooter() {
  const whatsappUrl = buildWhatsAppUrl('appointment');

  return (
    <footer className="border-t border-mag-navy/20 bg-mag-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <MagrassLogo theme="white" size="lg" />
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Consultorio médico estético en Arequipa. Resultados naturales con protocolos no invasivos y atención
            especializada.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-1">
          {clinicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-white/75 transition-colors hover:text-mag-sand">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={whatsappUrl}
            className="font-semibold text-mag-sand hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {clinicContact.phoneDisplay}
          </a>
          <a
            href={clinicContact.instagramUrl}
            className="text-white/75 hover:text-mag-sand"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-white/50">{clinicBrand.disclaimer}</p>
      </div>
    </footer>
  );
}
