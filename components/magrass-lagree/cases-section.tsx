import dynamic from 'next/dynamic';
import { clinicHome } from '@/src/data/magrassData';

const MagrassBeforeAfterSlider = dynamic(
  () =>
    import('@/components/magrass-lagree/before-after-slider').then((m) => ({
      default: m.MagrassBeforeAfterSlider
    })),
  {
    loading: () => (
      <div className="mx-auto mt-8 h-56 w-full max-w-5xl animate-pulse rounded-3xl bg-mag-border sm:mt-10 sm:h-72" />
    )
  }
);

export function MagrassCasesSection() {
  const { cases } = clinicHome;

  return (
    <section id="casos" className="scroll-mt-20 bg-mag-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mag-gold sm:text-xs">
            Antes & Después
          </p>
          <h2 className="mt-2 font-playfair text-2xl font-semibold text-mag-navy sm:text-3xl lg:text-4xl">
            {cases.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-mag-muted sm:text-base">
            {cases.subtitle}
          </p>
        </div>
        <MagrassBeforeAfterSlider />
      </div>
    </section>
  );
}
