import dynamic from 'next/dynamic';
import { clinicHome } from '@/src/data/clinicData';

const ReyDentalBeforeAfterSlider = dynamic(
  () =>
    import('@/components/rey-dental/before-after-slider').then((module) => ({
      default: module.ReyDentalBeforeAfterSlider
    })),
  {
    loading: () => <div className="mx-auto mt-8 h-48 w-full max-w-4xl animate-pulse rounded-xl bg-rey-neutral/20 sm:mt-10 sm:h-64" />
  }
);

export function ReyDentalProcessSection() {
  const { process } = clinicHome;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-rey-ink sm:text-3xl lg:text-4xl">{process.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:mt-4 sm:text-base">{process.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
          {process.steps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-xl border border-rey-neutral/40 bg-rey-base/40 p-5 transition hover:border-rey-primary/40 sm:rounded-2xl sm:p-6"
            >
              <span className="font-display text-2xl font-bold text-rey-accent sm:text-3xl">{step.step}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-rey-ink sm:mt-3 sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <ReyDentalBeforeAfterSlider />
      </div>
    </section>
  );
}
