import { specialists, specialistsPage } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { Award, Stethoscope } from 'lucide-react';

export function MagrassTeamSection() {
  const whatsappUrl = buildWhatsAppUrl('specialists');

  return (
    <section className="bg-mag-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:gap-8">
          {specialists.map((specialist, index) => (
            <article
              key={specialist.id}
              className={`grid gap-6 rounded-2xl border border-mag-border p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:grid-cols-[auto_1fr] ${
                index % 2 === 0 ? 'bg-mag-cream/60' : 'bg-mag-white'
              }`}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-mag-sand/30 text-mag-jade">
                <Stethoscope className="h-7 w-7" strokeWidth={1.75} />
              </div>

              <div>
                <h3 className="font-playfair text-xl font-semibold text-mag-navy sm:text-2xl">
                  {specialist.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-mag-jade">{specialist.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-mag-muted">{specialist.focus}</p>

                <ul className="mt-4 space-y-2">
                  {specialist.credentials.map((credential) => (
                    <li key={credential} className="flex items-start gap-2 text-sm text-mag-muted">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-mag-sand" />
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <MagrassCtaButton href={whatsappUrl} label={specialistsPage.cta} />
        </div>
      </div>
    </section>
  );
}
