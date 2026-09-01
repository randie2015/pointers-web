import { clinicHome } from '@/src/data/magrassData';

export function MagrassProcessSection() {
  const { process } = clinicHome;

  return (
    <section className="bg-mag-ivory py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-playfair text-2xl font-semibold text-mag-navy sm:text-3xl lg:text-4xl">
            {process.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-mag-muted sm:text-base">
            {process.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
          {process.steps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-mag-border bg-mag-white p-5 shadow-sm sm:rounded-3xl sm:p-6"
            >
              <span className="font-playfair text-2xl font-semibold text-mag-gold sm:text-3xl">
                {step.step}
              </span>
              <h3 className="mt-2 font-playfair text-base font-semibold text-mag-navy sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mag-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
