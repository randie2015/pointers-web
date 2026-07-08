'use client';

import { Reveal } from '@/components/reveal';
import { ServiceSectionBadge } from '@/components/services/service-section-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { SERVICE_MAGENTA } from '@/lib/service-brand';

type ServiceProblemSolutionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  problemLabel: string;
  problemHeading: string;
  problemTitle?: string;
  problemBody: string;
  solutionLabel: string;
  solutionTitle: string;
  solutionBody: string;
};

export function ServiceProblemSolutionSection({
  eyebrow,
  title,
  subtitle,
  problemLabel,
  problemHeading,
  problemTitle,
  problemBody,
  solutionLabel,
  solutionTitle,
  solutionBody
}: ServiceProblemSolutionProps) {
  const problemHeadline = problemTitle?.trim() ? problemTitle : problemHeading;

  return (
    <section className="relative z-[1] py-14 sm:py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border/60 shadow-sm sm:mt-12 sm:rounded-3xl md:mt-14 md:grid md:grid-cols-2 md:gap-0">
          <Reveal delay={0.05}>
            <article className="flex h-full min-h-[280px] flex-col border-b border-border/60 bg-zinc-50 p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <ServiceSectionBadge label={problemLabel} className="mb-4 !justify-start sm:mb-5" />
              <h3 className="font-display text-xl font-semibold leading-snug text-gray-900 sm:text-2xl md:text-3xl">
                {problemHeadline}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base md:text-lg md:leading-relaxed">
                {problemBody}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article
              className="flex h-full min-h-[280px] flex-col p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: SERVICE_MAGENTA }}
            >
              <ServiceSectionBadge label={solutionLabel} tone="light" className="mb-4 !justify-start sm:mb-5" />
              <h3 className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl md:text-3xl">
                {solutionTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg md:leading-relaxed">
                {solutionBody}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
