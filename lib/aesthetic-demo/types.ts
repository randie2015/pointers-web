import type { AestheticTreatmentCategory, DemoConfig } from '@/lib/clinic-demo/types';

export type ResolvedAestheticTreatment = {
  id: string;
  anchor: string;
  title: string;
  description: string;
  expectedResults: string;
  category: AestheticTreatmentCategory;
  image?: string;
};

export type ResolvedFeaturedTreatment = {
  id: string;
  anchor: string;
  badge: string;
  title: string;
  description: string;
  image: string;
};

export type ResolvedClinicalCase = {
  id: string;
  title: string;
  approach: string;
  duration: string;
  summary: string;
};

export type ResolvedSpecialist = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  badge: string;
  image: string;
};

export type ResolvedAestheticDemo = {
  slug: string;
  basePath: string;
  preset: 'aesthetic';
  themeStyle: Record<string, string>;
  brand: {
    name: string;
    subtitle: string;
    tagline: string;
    disclaimer: string;
    demoNotice: string;
    pointersUrl: string;
    logo: string;
    logoMark: string;
    heroVideo: string;
    heroPoster: string;
    footerBlurb: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    country: string;
    mapsUrl: string;
    mapsEmbedUrl: string;
    instagramUrl: string;
    schedule: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  nav: Array<{ label: string; href: string }>;
  treatments: ResolvedAestheticTreatment[];
  featuredTreatments: ResolvedFeaturedTreatment[];
  clinicalCases: ResolvedClinicalCase[];
  specialists: ResolvedSpecialist[];
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      trustBadges: string[];
    };
    valuePillars: Array<{ title: string; description: string }>;
    diagnosis360: {
      title: string;
      subtitle: string;
      cta: string;
      steps: string[];
    };
    whyChoose: {
      title: string;
      subtitle: string;
      points: Array<{ title: string; description: string }>;
    };
    locationPreview: { title: string; subtitle: string; cta: string };
    ctaZone: { eyebrow: string; title: string; casesCta: string; whatsappCta: string };
    testimonials: {
      eyebrow: string;
      title: string;
      items: Array<{
        id: string;
        treatment: string;
        quote: string;
        patientName: string;
        patientMeta: string;
      }>;
    };
    closing: { title: string; subtitle: string; cta: string };
    beforeAfter: {
      before: string;
      after: string;
      width: number;
      height: number;
    };
  };
  treatmentsPage: {
    title: string;
    subtitle: string;
    categories: Array<{ id: AestheticTreatmentCategory; label: string }>;
  };
  casesPage: { title: string; subtitle: string; cta: string };
  specialistsPage: { title: string; subtitle: string; cta: string };
  locationPage: {
    title: string;
    subtitle: string;
    ctaMaps: string;
    ctaBook: string;
  };
  whatsapp: {
    appointment: string;
    homeDiagnosis: string;
    diagnosis360: string;
    clinicalCase: string;
    evaluateCase: string;
    specialists: string;
    location: string;
    closing: string;
    treatmentTemplate: string;
    specialistTemplate: string;
  };
  expiration: {
    expiresAt: string;
    title: string;
    message: string;
    ctaLabel: string;
    ctaUrl: string;
  };
};

export type AestheticDemoConfig = DemoConfig & { preset: 'aesthetic' };
