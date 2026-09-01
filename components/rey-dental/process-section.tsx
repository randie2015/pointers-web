import { clinicHome } from '@/src/data/clinicData';
import { ReyDentalBeforeAfterSlider } from '@/components/rey-dental/before-after-slider';

export function ReyDentalProcessSection() {
  const { process } = clinicHome;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-rey-ink md:text-4xl">{process.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">{process.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {process.steps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-rey-neutral/40 bg-rey-base/40 p-6 transition hover:border-rey-primary/40"
            >
              <span className="font-display text-3xl font-bold text-rey-accent">{step.step}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-rey-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <ReyDentalBeforeAfterSlider />
      </div>
    </section>
  );
}
