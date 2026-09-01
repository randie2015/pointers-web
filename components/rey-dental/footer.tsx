import Link from 'next/link';
import { clinicBrand, clinicContact, clinicNav } from '@/src/data/clinicData';

export function ReyDentalFooter() {
  return (
    <footer className="border-t border-rey-neutral/40 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6 md:py-16">
        <div>
          <p className="font-display text-lg font-bold text-rey-ink">{clinicBrand.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
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

      <div className="border-t border-rey-neutral/30 bg-rey-base px-4 py-6 md:px-6">
        <p className="mx-auto max-w-6xl text-xs leading-relaxed text-slate-500">{clinicBrand.disclaimer}</p>
        <p className="mx-auto mt-3 max-w-6xl text-xs text-slate-400">
          © {new Date().getFullYear()} {clinicBrand.name}. Demo privada ·{' '}
          <a href={clinicBrand.pointersUrl} className="underline hover:text-rey-primary">
            pointers.marketing
          </a>
        </p>
      </div>
    </footer>
  );
}
