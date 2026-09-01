import type { Metadata } from 'next';
import { MagrassPageHero } from '@/components/magrass-lagree/page-hero';
import { MagrassTeamSection } from '@/components/magrass-lagree/team-section';
import { MagrassClosingCtaSection } from '@/components/magrass-lagree/closing-cta-section';
import { specialistsPage } from '@/src/data/magrassData';

export const metadata: Metadata = {
  title: `Especialistas | Magrass LaGreé`,
  description: specialistsPage.subtitle
};

export default function MagrassSpecialistsPage() {
  return (
    <>
      <MagrassPageHero
        eyebrow="Equipo médico"
        title={specialistsPage.title}
        subtitle={specialistsPage.subtitle}
        tone="cream"
      />
      <MagrassTeamSection />
      <MagrassClosingCtaSection />
    </>
  );
}
