import { clinicHome } from '@/src/data/magrassData';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';
import { MagrassCtaButton } from '@/components/magrass-lagree/cta-button';
import { CheckCircle2 } from 'lucide-react';

export function MagrassDiagnosis360Section() {
  const { diagnosis360 } = clinicHome;
  const whatsappUrl = buildWhatsAppUrl('diagnosis360');

  return (
    <section className="bg-mag-navy py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-sand sm:text-xs">
              Método exclusivo
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              {diagnosis360.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
              {diagnosis360.subtitle}
            </p>
            <MagrassCtaButton href={whatsappUrl} label={diagnosis360.cta} variant="accent" className="mt-6" />
          </div>

          <ul className="space-y-4">
            {diagnosis360.steps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mag-sand text-xs font-bold text-mag-navy">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mag-jade" />
                  <p className="text-sm font-medium leading-relaxed text-white/90 sm:text-base">{step}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
