import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicStatsSection({ demo }: { demo: ResolvedDemo }) {
  return (
    <section data-nav-theme="light" className="border-y border-demo-neutral/30 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-8 sm:gap-4 sm:px-6 sm:py-10 md:grid-cols-4 md:gap-6 md:py-12 lg:px-8">
        {demo.home.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-demo-neutral/30 bg-demo-base/50 px-3 py-4 text-center transition hover:border-demo-primary/40 hover:shadow-sm sm:rounded-2xl sm:px-4 sm:py-6"
          >
            <p className="font-display text-lg font-bold text-demo-accent sm:text-xl md:text-2xl">{stat.value}</p>
            <p className="mt-0.5 text-[10px] font-medium leading-snug text-slate-600 sm:mt-1 sm:text-xs md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
