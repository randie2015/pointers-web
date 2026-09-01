import { clinicBrand, clinicContact, clinicNav } from '@/src/data/alejandraData';
import { DraAlejandraLogo } from '@/components/dra-alejandra/logo';

export function DraAlejandraFooter() {
  return (
    <footer className="border-t border-ale-gold/30 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <DraAlejandraLogo size="lg" />
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ale-ink/70">
            {clinicBrand.tagline} boutique en {clinicContact.city}. Diseño de sonrisas, carillas y estética dental de
            alta precisión.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ale-ink">Enlaces</p>
          <nav className="mt-3 flex flex-col gap-2">
            <a href="/alejandracusirramos" className="text-sm text-ale-ink/70 hover:text-ale-cta">
              Inicio
            </a>
            {clinicNav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-ale-ink/70 hover:text-ale-cta">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold text-ale-ink">Horario</p>
          <ul className="mt-3 space-y-1 text-sm text-ale-ink/70">
            <li>{clinicContact.schedule.weekdays}</li>
            <li>{clinicContact.schedule.saturday}</li>
            <li>{clinicContact.schedule.sunday}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ale-gold/20 bg-ale-ivory px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-[11px] leading-relaxed text-ale-ink/60 sm:text-xs">{clinicBrand.disclaimer}</p>
        <p className="mx-auto mt-3 max-w-7xl text-[11px] text-ale-ink/50 sm:text-xs">
          © {new Date().getFullYear()} {clinicBrand.name}. Demo privada ·{' '}
          <a href={clinicBrand.pointersUrl} className="underline hover:text-ale-cta">
            pointers.marketing
          </a>
        </p>
      </div>
    </footer>
  );
}
