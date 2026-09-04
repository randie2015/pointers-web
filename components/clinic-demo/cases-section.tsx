import dynamic from 'next/dynamic';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

const ClinicBeforeAfterSlider = dynamic(
  () =>
    import('@/components/clinic-demo/before-after-slider').then((module) => ({
      default: module.ClinicBeforeAfterSlider
    })),
  {
    loading: () => (
      <div className="mx-auto mt-8 h-56 w-full max-w-5xl animate-pulse rounded-3xl bg-demo-soft/20 sm:mt-10 sm:h-72" />
    )
  }
);

export function ClinicCasesSection({ demo }: { demo: ResolvedDemo }) {
  const { cases } = demo.home;

  return (
    <section id="casos" data-nav-theme="light" className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-demo-accent sm:text-xs">
            Antes & Después
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-demo-charcoal sm:text-3xl lg:text-4xl">
            {cases.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-slate-700 sm:text-base">{cases.subtitle}</p>
        </div>

        <ClinicBeforeAfterSlider demo={demo} />
      </div>
    </section>
  );
}
