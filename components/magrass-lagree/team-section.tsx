import { specialists, specialistsPage } from '@/src/data/magrassData';
import { magrassContainer, magrassSection } from '@/lib/magrass-lagree/layout';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { Award, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MagrassTeamSection() {
  const whatsappUrl = buildWhatsAppUrl('specialists');

  return (
    <section className={cn(magrassSection, 'bg-mag-white lg:py-24')}>
      <div className={magrassContainer}>
        <div className="grid gap-5 sm:gap-6 lg:gap-8">
          {specialists.map((specialist, index) => (
            <article
              key={specialist.id}
              className={`grid gap-5 rounded-2xl border border-mag-border p-5 shadow-sm sm:rounded-3xl sm:p-7 md:grid-cols-[auto_1fr] md:gap-6 ${
                index % 2 === 0 ? 'bg-mag-cream/60' : 'bg-mag-white'
              }`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mag-sand/30 text-mag-jade sm:h-16 sm:w-16">
                <Stethoscope className="h-7 w-7" strokeWidth={1.75} />
              </div>

              <div className="min-w-0">
                <h3 className="font-playfair text-xl font-semibold text-balance text-mag-navy sm:text-2xl">
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
