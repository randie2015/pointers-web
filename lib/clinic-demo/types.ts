export type DemoPreset = 'dentist' | 'aesthetic';

export type DemoServiceIcon = 'align' | 'implant' | 'whitening' | 'general';

export type AestheticTreatmentCategory = 'facial' | 'corporal' | 'rejuvenecimiento';

export type DemoServiceInput = {
  title: string;
  shortDescription: string;
  description?: string;
  benefits?: string[];
  icon?: DemoServiceIcon;
  image?: string;
  imageAlt?: string;
  /** Aesthetic: facial | corporal | rejuvenecimiento */
  category?: AestheticTreatmentCategory;
  badge?: string;
  expectedResults?: string;
  anchor?: string;
};

export type DemoColors = {
  primary: string;
  accent: string;
};

export type DemoConfig = {
  slug: string;
  preset: DemoPreset;
  name: string;
  colors: DemoColors;
  logo: string;
  services: DemoServiceInput[];
  /** ISO datetime; defaults to +7 days from resolve time if omitted */
  expiresAt?: string;
  tagline?: string;
  subbrand?: string;
  positioning?: string;
  doctor?: string;
  usp?: string;
  city?: string;
  address?: string;
  email?: string;
  mapsUrl?: string;
  mapsEmbedUrl?: string;
  phone?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  instagramUrl?: string;
  assets?: {
    doctorPhoto?: string;
    heroVideo?: string;
    heroVideoWebm?: string;
    heroPoster?: string;
    logoMark?: string;
    beforeAfter?: {
      before: string;
      after: string;
      width?: number;
      height?: number;
    };
  };
  content?: {
    hero?: {
      badge?: string;
      title?: string;
      titleAccent?: string;
      subtitle?: string;
      primaryCta?: string;
      secondaryCta?: string;
      ratingStars?: string;
      ratingText?: string;
      trustBadges?: string[];
    };
    stats?: Array<{ value: string; label: string }>;
    cases?: { title?: string; subtitle?: string };
    process?: {
      title?: string;
      subtitle?: string;
      steps?: Array<{ step: string; title: string; description: string }>;
    };
    location?: { title?: string; ctaMaps?: string; ctaReception?: string };
    closingCta?: { title?: string; subtitle?: string; button?: string };
    about?: {
      heroTitle?: string;
      heroSubtitle?: string;
      doctorBio?: string;
      values?: Array<{ title: string; description: string }>;
    };
    servicesPage?: { title?: string; subtitle?: string };
    contactPage?: {
      title?: string;
      subtitle?: string;
      callCta?: string;
      whatsappCta?: string;
    };
    whatsappMessage?: string;
    disclaimer?: string;
    /** Aesthetic home / pages */
    valuePillars?: Array<{ title: string; description: string }>;
    diagnosis360?: {
      title?: string;
      subtitle?: string;
      cta?: string;
      steps?: string[];
    };
    whyChoose?: {
      title?: string;
      subtitle?: string;
      points?: Array<{ title: string; description: string }>;
    };
    locationPreview?: { title?: string; subtitle?: string; cta?: string };
    ctaZone?: { eyebrow?: string; title?: string; casesCta?: string; whatsappCta?: string };
    testimonials?: {
      eyebrow?: string;
      title?: string;
      items?: Array<{
        id: string;
        treatment: string;
        quote: string;
        patientName: string;
        patientMeta: string;
      }>;
    };
    closing?: { title?: string; subtitle?: string; cta?: string };
    treatmentsPage?: {
      title?: string;
      subtitle?: string;
      categories?: Array<{ id: AestheticTreatmentCategory; label: string }>;
    };
    /** Full aesthetic treatment catalog (optional; defaults from services) */
    treatments?: Array<{
      id: string;
      anchor: string;
      title: string;
      description: string;
      expectedResults: string;
      category: AestheticTreatmentCategory;
      image?: string;
    }>;
    featuredTreatments?: Array<{
      id: string;
      anchor: string;
      badge: string;
      title: string;
      description: string;
      image: string;
    }>;
    clinicalCases?: Array<{
      id: string;
      title: string;
      approach: string;
      duration: string;
      summary: string;
    }>;
    casesPage?: { title?: string; subtitle?: string; cta?: string };
    specialists?: Array<{
      id: string;
      name: string;
      role: string;
      specialty: string;
      badge: string;
      image: string;
    }>;
    specialistsPage?: { title?: string; subtitle?: string; cta?: string };
    locationPage?: {
      title?: string;
      subtitle?: string;
      ctaMaps?: string;
      ctaBook?: string;
    };
    schedule?: {
      weekdays?: string;
      saturday?: string;
      sunday?: string;
    };
    footerBlurb?: string;
  };
};

export type ResolvedTreatment = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  icon: DemoServiceIcon;
  image?: string;
  imageAlt?: string;
};

export type ResolvedDemo = {
  slug: string;
  basePath: string;
  preset: DemoPreset;
  themeStyle: Record<string, string>;
  brand: {
    name: string;
    subbrand: string;
    positioning: string;
    doctor: string;
    doctorFullName: string;
    tagline: string;
    usp: string;
    disclaimer: string;
    pointersUrl: string;
    logo: string;
    logoMark: string;
    doctorPhoto: string;
    heroVideo: string;
    heroVideoWebm?: string;
    heroPoster: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    city: string;
    mapsUrl: string;
    schedule: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  closer: {
    name: string;
    whatsapp: string;
    phone: string;
    phoneDisplay: string;
  };
  nav: Array<{ label: string; href: string }>;
  treatments: ResolvedTreatment[];
  home: {
    hero: {
      badge: string;
      title: string;
      titleAccent: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      ratingStars: string;
      ratingText: string;
    };
    stats: Array<{ value: string; label: string }>;
    cases: { title: string; subtitle: string };
    process: {
      title: string;
      subtitle: string;
      steps: Array<{ step: string; title: string; description: string }>;
    };
    location: { title: string; ctaMaps: string; ctaReception: string };
    closingCta: { title: string; subtitle: string; button: string };
    beforeAfter: {
      before: string;
      after: string;
      width: number;
      height: number;
    };
  };
  about: {
    hero: { title: string; subtitle: string };
    values: Array<{ title: string; description: string }>;
    doctorBio: string;
  };
  servicesPage: { title: string; subtitle: string };
  contactPage: {
    title: string;
    subtitle: string;
    callCta: string;
    whatsappCta: string;
  };
  whatsappMessage: string;
  expiration: {
    expiresAt: string;
    title: string;
    message: string;
    ctaLabel: string;
    ctaUrl: string;
  };
};
