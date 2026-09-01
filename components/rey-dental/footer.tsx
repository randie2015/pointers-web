import Link from 'next/link';
import { clinicBrand, clinicContact, clinicNav } from '@/src/data/clinicData';

export function ReyDentalFooter() {
  return (
    <footer className="border-t border-rey-neutral/40 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-bold text-rey-ink">{clinicBrand.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
            Clínica odontológica en {clinicContact.city}. Atención especializada, bioseguridad y tecnología de
            vanguardia.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-rey-ink">Enlaces</p>
          <nav className="mt-3 flex flex-col gap-2">
            <Link href="/rey-dental" className="text-sm text-slate-600 hover:text-rey-primary">
              Inicio
            </Link>
            {clinicNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-600 hover:text-rey-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold text-rey-ink">Horario</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>{clinicContact.schedule.weekdays}</li>
            <li>{clinicContact.schedule.saturday}</li>
            <li>{clinicContact.schedule.sunday}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rey-neutral/30 bg-rey-base px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-[11px] leading-relaxed text-slate-500 sm:text-xs">
          {clinicBrand.disclaimer}
        </p>
        <p className="mx-auto mt-3 max-w-7xl text-[11px] text-slate-400 sm:text-xs">
          © {new Date().getFullYear()} {clinicBrand.name}. Demo privada ·{' '}
          <a href={clinicBrand.pointersUrl} className="underline hover:text-rey-primary">
            pointers.marketing
          </a>
        </p>
      </div>
    </footer>
  );
}
