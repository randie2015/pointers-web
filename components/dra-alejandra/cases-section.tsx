import dynamic from 'next/dynamic';
import { clinicHome } from '@/src/data/alejandraData';

const DraAlejandraBeforeAfterSlider = dynamic(
  () =>
    import('@/components/dra-alejandra/before-after-slider').then((module) => ({
      default: module.DraAlejandraBeforeAfterSlider
    })),
  {
    loading: () => (
      <div className="mx-auto mt-8 h-56 w-full max-w-5xl animate-pulse rounded-3xl bg-ale-rose/20 sm:mt-10 sm:h-72" />
    )
  }
);

export function DraAlejandraCasesSection() {
  const { cases } = clinicHome;

  return (
    <section id="casos" className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ale-gold sm:text-xs">
            Antes & Después
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ale-ink sm:text-3xl lg:text-4xl">
            {cases.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ale-ink/70 sm:text-base">{cases.subtitle}</p>
        </div>

        <DraAlejandraBeforeAfterSlider />
      </div>
    </section>
  );
}
