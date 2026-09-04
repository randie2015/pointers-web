import { ClinicLogo } from '@/components/clinic-demo/logo';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicFooter({ demo }: { demo: ResolvedDemo }) {
  return (
    <footer data-nav-theme="light" className="border-t border-demo-accent/30 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <ClinicLogo demo={demo} size="lg" />
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-demo-ink/70">
            {demo.brand.tagline} boutique en {demo.contact.city}. Diseño de sonrisas, carillas y estética dental de alta
            precisión.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-demo-ink">Enlaces</p>
          <nav className="mt-3 flex flex-col gap-2">
            <a href={demo.basePath} className="text-sm text-demo-ink/70 hover:text-demo-primary">
              Inicio
            </a>
            {demo.nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-demo-ink/70 hover:text-demo-primary">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold text-demo-ink">Horario</p>
          <ul className="mt-3 space-y-1 text-sm text-demo-ink/70">
            <li>{demo.contact.schedule.weekdays}</li>
            <li>{demo.contact.schedule.saturday}</li>
            <li>{demo.contact.schedule.sunday}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-demo-accent/20 bg-demo-base px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-[11px] leading-relaxed text-demo-ink/60 sm:text-xs">{demo.brand.disclaimer}</p>
        <p className="mx-auto mt-3 max-w-7xl text-[11px] text-demo-ink/50 sm:text-xs">
          © {new Date().getFullYear()} {demo.brand.name}. Demo privada ·{' '}
          <a href={demo.brand.pointersUrl} className="underline hover:text-demo-primary">
            pointers.marketing
          </a>
        </p>
      </div>
    </footer>
  );
}
