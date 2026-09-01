import { clinicHome } from '@/src/data/alejandraData';

export function DraAlejandraProcessSection() {
  const { process } = clinicHome;

  return (
    <section data-nav-theme="light" className="bg-ale-ivory py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-ale-ink sm:text-3xl lg:text-4xl">{process.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ale-ink/70 sm:mt-4 sm:text-base">{process.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
          {process.steps.map((step) => (
            <div
              key={step.step}
              className="relative overflow-hidden rounded-2xl border border-ale-gold/35 bg-white p-5 shadow-sm transition hover:border-ale-gold/60 hover:shadow-md sm:rounded-3xl sm:p-6"
            >
              <span className="font-display text-2xl font-semibold text-ale-gold sm:text-3xl">{step.step}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ale-ink sm:mt-3 sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ale-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
