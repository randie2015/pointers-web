import Link from 'next/link';
import { clinicBrand, clinicContact, clinicNav } from '@/src/data/magrassData';
import { magrassContainer } from '@/lib/magrass-lagree/layout';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassLogo } from '@/components/magrass-lagree/logo';
import { cn } from '@/lib/utils';

export function MagrassFooter() {
  const whatsappUrl = buildWhatsAppUrl('appointment');

  return (
    <footer className="border-t border-mag-navy/20 bg-mag-navy text-white">
      <div
        className={cn(
          magrassContainer,
          'grid gap-8 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:items-start lg:gap-10'
        )}
      >
        <div className="min-w-0">
          <MagrassLogo theme="white" size="lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Consultorio médico estético en Arequipa. Resultados naturales con protocolos no invasivos y atención
            especializada.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-1">
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

      <div className={cn('border-t border-white/10 py-5', magrassContainer)}>
        <p className="text-center text-xs leading-relaxed text-white/50">{clinicBrand.disclaimer}</p>
      </div>
    </footer>
  );
}
