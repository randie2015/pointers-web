import dynamic from 'next/dynamic';
import { clinicHome } from '@/src/data/orthozentData';

const OrthozentBeforeAfterSlider = dynamic(
  () =>
    import('@/components/orthozent/before-after-slider').then((module) => ({
      default: module.OrthozentBeforeAfterSlider
    })),
  {
    loading: () => <div className="mx-auto mt-8 h-48 w-full max-w-4xl animate-pulse rounded-xl bg-ortho-neutral/20 sm:mt-10 sm:h-64" />
  }
);

export function OrthozentProcessSection() {
  const { process } = clinicHome;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-ortho-ink sm:text-3xl lg:text-4xl">{process.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:mt-4 sm:text-base">{process.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
          {process.steps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-xl border border-ortho-neutral/40 bg-ortho-base/40 p-5 transition hover:border-ortho-primary/40 sm:rounded-2xl sm:p-6"
            >
              <span className="font-display text-2xl font-bold text-ortho-gold sm:text-3xl">{step.step}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ortho-ink sm:mt-3 sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <OrthozentBeforeAfterSlider />
      </div>
    </section>
  );
}
