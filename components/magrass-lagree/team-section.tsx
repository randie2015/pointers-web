import { clinicHome } from '@/src/data/magrassData';
import { HeartPulse, ShieldCheck, Users } from 'lucide-react';

const highlights = [
  { icon: Users, title: 'Trato personalizado', text: 'Cada plan se adapta a tus objetivos y historial clínico.' },
  { icon: ShieldCheck, title: 'Seguridad médica', text: 'Protocolos supervisados en un entorno clínico controlado.' },
  { icon: HeartPulse, title: 'Resultados progresivos', text: 'Cambios visibles, naturales y sostenibles en el tiempo.' }
] as const;

export function MagrassTeamSection() {
  const { team } = clinicHome;

  return (
    <section id="especialistas" className="scroll-mt-20 bg-mag-ivory py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-gold sm:text-xs">
              Equipo médico
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-mag-navy sm:text-3xl lg:text-4xl">
              {team.title}
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-mag-muted sm:text-base lg:text-lg">
              {team.description}
            </p>
          </div>

          <div className="grid gap-4">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-mag-border bg-mag-white p-5 shadow-sm sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mag-gold/15 text-mag-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-playfair text-base font-semibold text-mag-navy sm:text-lg">{title}</h3>
                  <p className="mt-1 text-sm text-mag-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
