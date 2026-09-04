import Link from 'next/link';
import { aestheticContainer } from '@/lib/aesthetic-demo/layout';
import { buildAestheticWhatsAppUrl } from '@/lib/aesthetic-demo/whatsapp';
import { AestheticLogo } from '@/components/aesthetic-demo/logo';
import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';
import { cn } from '@/lib/utils';

export function AestheticFooter({ demo }: { demo: ResolvedAestheticDemo }) {
  const whatsappUrl = buildAestheticWhatsAppUrl(demo, 'appointment');

  return (
    <footer className="border-t border-demo-primary/20 bg-demo-primary text-white">
      <div
        className={cn(
          aestheticContainer,
          'grid gap-8 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:items-start lg:gap-10'
        )}
      >
        <div className="min-w-0">
          <AestheticLogo demo={demo} theme="white" size="lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{demo.brand.footerBlurb}</p>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-1">
          {demo.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-white/75 transition-colors hover:text-demo-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={whatsappUrl}
            className="font-semibold text-demo-accent hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {demo.contact.phoneDisplay}
          </a>
          <a
            href={demo.contact.instagramUrl}
            className="text-white/75 hover:text-demo-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className={cn('border-t border-white/10 py-5', aestheticContainer)}>
        <p className="text-center text-xs leading-relaxed text-white/50">{demo.brand.disclaimer}</p>
      </div>

      <div className="border-t border-white/10 bg-demo-dark/10 py-4 px-6">
        <div className="mx-auto max-w-4xl text-center text-xs text-gray-500">
          <p className="leading-relaxed">{demo.brand.demoNotice}</p>
          <p className="mt-3 text-gray-600">
            © 2026 {demo.brand.name}. Demo privada · pointers.marketing
          </p>
        </div>
      </div>
    </footer>
  );
}
