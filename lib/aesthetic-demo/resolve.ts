import { AESTHETIC_MEDIA_PACK } from '@/lib/clinic-demo/media-packs';
import { buildAestheticThemeStyle } from '@/lib/clinic-demo/theme';
import type { AestheticTreatmentCategory, DemoConfig } from '@/lib/clinic-demo/types';
import type {
  ResolvedAestheticDemo,
  ResolvedAestheticTreatment,
  ResolvedFeaturedTreatment,
  ResolvedSpecialist
} from '@/lib/aesthetic-demo/types';

const POINTERS_URL = 'https://pointers.marketing';
const DEFAULT_CLOSER = {
  whatsapp: '51904330335',
  phone: '+51904330335',
  phoneDisplay: '+51 904 330 335'
} as const;

const DEFAULT_CATEGORIES: Array<{ id: AestheticTreatmentCategory; label: string }> = [
  { id: 'facial', label: 'Facial' },
  { id: 'corporal', label: 'Corporal' },
  { id: 'rejuvenecimiento', label: 'Rejuvenecimiento' }
];

const DEFAULT_SERVICE_IMAGES = [
  AESTHETIC_MEDIA_PACK.treatments.armonizacion,
  AESTHETIC_MEDIA_PACK.treatments.criolipolisis,
  AESTHETIC_MEDIA_PACK.treatments.bioestimuladores,
  AESTHETIC_MEDIA_PACK.treatments.hydrafacial
] as const;

const DEFAULT_CATEGORIES_CYCLE: AestheticTreatmentCategory[] = [
  'facial',
  'corporal',
  'rejuvenecimiento',
  'facial'
];

const DEFAULT_BADGES = ['FACIAL', 'CORPORAL', 'ANTIAGE', 'FACIAL'] as const;

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function defaultExpiresAt() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
}

function resolveTreatmentsFromServices(config: DemoConfig): ResolvedAestheticTreatment[] {
  return config.services.map((service, index) => {
    const id = slugify(service.title) || `tratamiento-${index + 1}`;
    const category = service.category ?? DEFAULT_CATEGORIES_CYCLE[index % 4] ?? 'facial';
    return {
      id,
      anchor: service.anchor ?? id,
      title: service.title,
      description: service.description ?? service.shortDescription,
      expectedResults:
        service.expectedResults ??
        'Resultados naturales y progresivos con seguimiento médico personalizado.',
      category,
      image: service.image ?? DEFAULT_SERVICE_IMAGES[index % DEFAULT_SERVICE_IMAGES.length]
    };
  });
}

function resolveFeatured(
  treatments: ResolvedAestheticTreatment[],
  content: DemoConfig['content']
): ResolvedFeaturedTreatment[] {
  if (content?.featuredTreatments?.length) {
    return content.featuredTreatments.map((item) => ({ ...item }));
  }

  return treatments.slice(0, 4).map((treatment, index) => ({
    id: treatment.id,
    anchor: treatment.anchor,
    badge: DEFAULT_BADGES[index % DEFAULT_BADGES.length],
    title: treatment.title,
    description: treatment.description,
    image: treatment.image ?? DEFAULT_SERVICE_IMAGES[index % DEFAULT_SERVICE_IMAGES.length]
  }));
}

function defaultSpecialists(): ResolvedSpecialist[] {
  return [
    {
      id: 'especialista-1',
      name: 'Dra. Elena Vargas',
      role: 'Directora Médica & Estética Facial',
      specialty: 'Armonización Facial, Toxina Botulínica y Bioestimuladores',
      badge: 'CMP 74829',
      image: AESTHETIC_MEDIA_PACK.specialists.doctora1
    },
    {
      id: 'especialista-2',
      name: 'Dr. Gabriel Torres',
      role: 'Médico Especialista en Contorno Corporal',
      specialty: 'Criolipólisis 360°, Enzimas PB Serum y Lipoescultura No Invasiva',
      badge: 'CMP 81204',
      image: AESTHETIC_MEDIA_PACK.specialists.doctor2
    },
    {
      id: 'especialista-3',
      name: 'Dra. Lucía Mendoza',
      role: 'Dermatología Estética & Láser',
      specialty: 'Protocolos Hydrafacial, Despigmentación y Rejuvenecimiento Cutáneo',
      badge: 'CMP 69315',
      image: AESTHETIC_MEDIA_PACK.specialists.doctora3
    },
    {
      id: 'especialista-4',
      name: 'Dra. Camila Morales',
      role: 'Medicina Regenerativa & Antienvejecimiento',
      specialty: 'Peptonas, Sueroterapia Endovenosa y Nutrición Celular',
      badge: 'CMP 85490',
      image: AESTHETIC_MEDIA_PACK.specialists.doctora4
    }
  ];
}

export function resolveAestheticDemo(config: DemoConfig): ResolvedAestheticDemo {
  if (config.preset !== 'aesthetic') {
    throw new Error(`resolveAestheticDemo expects preset "aesthetic", got "${config.preset}"`);
  }

  const basePath = `/${config.slug}`;
  const content = config.content ?? {};
  const city = config.city ?? 'Arequipa';
  const tagline = config.tagline ?? 'Consultorio Médico Estético';
  const subtitle = config.subbrand ?? 'Consultorio Médico';
  const assets = config.assets ?? {};
  const phone = config.phone ?? DEFAULT_CLOSER.phone;
  const phoneDisplay = config.phoneDisplay ?? DEFAULT_CLOSER.phoneDisplay;
  const whatsapp = config.whatsapp ?? DEFAULT_CLOSER.whatsapp;

  const treatments: ResolvedAestheticTreatment[] = content.treatments?.length
    ? content.treatments.map((t) => ({ ...t }))
    : resolveTreatmentsFromServices(config);

  const featuredTreatments = resolveFeatured(treatments, content);

  const mapsUrl =
    config.mapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(`${config.name} ${city}, Peru`)}`;
  const mapsEmbedUrl =
    config.mapsEmbedUrl ??
    `https://maps.google.com/maps?q=${encodeURIComponent(`${config.name} ${city}, Peru`)}&output=embed`;

  return {
    slug: config.slug,
    basePath,
    preset: 'aesthetic',
    themeStyle: buildAestheticThemeStyle(config.colors.primary, config.colors.accent),
    brand: {
      name: config.name,
      subtitle,
      tagline,
      disclaimer:
        content.disclaimer ?? `© ${config.name} — Consultorio Médico. Todos los derechos reservados.`,
      demoNotice: `Aviso de Demostración Privada (72 horas): Entorno interactivo temporal desarrollado por Pointers (pointers.marketing) con fines exclusivos de evaluación técnica y comercial para ${config.name}. Plataforma no indexada en motores de búsqueda y de acceso restringido. Derechos reservados a sus respectivos titulares.`,
      pointersUrl: POINTERS_URL,
      logo: config.logo || AESTHETIC_MEDIA_PACK.logo,
      logoMark: assets.logoMark ?? config.logo ?? AESTHETIC_MEDIA_PACK.logoMark,
      heroVideo: assets.heroVideo ?? AESTHETIC_MEDIA_PACK.heroVideo,
      heroPoster: assets.heroPoster ?? AESTHETIC_MEDIA_PACK.heroPoster,
      footerBlurb:
        content.footerBlurb ??
        `Consultorio médico estético en ${city}. Resultados naturales con protocolos no invasivos y atención especializada.`
    },
    contact: {
      phone,
      phoneDisplay,
      whatsapp,
      email: config.email ?? `contacto@${config.slug.replace(/-/g, '')}.pe`,
      address: config.address ?? `${city}, Perú`,
      city,
      country: 'Perú',
      mapsUrl,
      mapsEmbedUrl,
      instagramUrl: config.instagramUrl ?? 'https://www.instagram.com/',
      schedule: {
        weekdays: content.schedule?.weekdays ?? 'Lunes a Sábado: Atención previa cita',
        saturday: content.schedule?.saturday ?? 'Agenda personalizada según disponibilidad',
        sunday: content.schedule?.sunday ?? 'Domingo: Cerrado'
      }
    },
    nav: [
      { label: 'Inicio', href: basePath },
      { label: 'Tratamientos', href: `${basePath}/tratamientos` },
      { label: 'Casos Clínicos', href: `${basePath}/casos-clinicos` },
      { label: 'Especialistas', href: `${basePath}/especialistas` },
      { label: 'Ubicación', href: `${basePath}/ubicacion` }
    ],
    treatments,
    featuredTreatments,
    clinicalCases: content.clinicalCases ?? [
      {
        id: 'armonizacion-perfil',
        title: 'Armonización de perfil facial',
        approach: 'Ácido hialurónico + plan de mantenimiento médico',
        duration: '2 sesiones · 4 semanas',
        summary:
          'Mejora de proyección mandibular y equilibrio labial con resultados naturales y seguimiento clínico.'
      },
      {
        id: 'reduccion-localizada',
        title: 'Reducción de adiposidad localizada',
        approach: 'Criolipólisis 360° + enzimas reductoras',
        duration: '3 sesiones · 8 semanas',
        summary:
          'Disminución progresiva de contorno abdominal con protocolo combinado y control médico continuo.'
      },
      {
        id: 'rejuvenecimiento-facial',
        title: 'Rejuvenecimiento y luminosidad',
        approach: 'Hydrafacial médico + bioestimuladores',
        duration: '4 sesiones · 6 semanas',
        summary:
          'Recuperación de textura, hidratación y firmeza con evolución documentada en cada control.'
      }
    ],
    specialists: content.specialists ?? defaultSpecialists(),
    home: {
      hero: {
        badge: content.hero?.badge ?? `Centro Médico Estético en ${city}`,
        title: content.hero?.title ?? 'Medicina Estética de Precisión y Cuidado Integral',
        subtitle:
          content.hero?.subtitle ??
          'Resultados naturales respaldados por rigor médico y tecnología de vanguardia.',
        primaryCta: content.hero?.primaryCta ?? 'Agendar Diagnóstico Personalizado',
        secondaryCta: content.hero?.secondaryCta ?? 'Ver Tratamientos',
        trustBadges: content.hero?.trustBadges ?? ['Tecnología Médica', 'Atención Ética', 'Diagnóstico 360°']
      },
      valuePillars: content.valuePillars ?? [
        {
          title: 'Tecnología Médica',
          description:
            'Aparatología certificada y protocolos no invasivos de última generación para resultados seguros y medibles.'
        },
        {
          title: 'Atención Ética',
          description:
            'Cada recomendación prioriza tu salud, tu bienestar y expectativas realistas con transparencia clínica.'
        },
        {
          title: 'Diagnóstico 360°',
          description:
            'Evaluación integral personalizada que define el plan ideal para tu rostro, cuerpo y estilo de vida.'
        }
      ],
      diagnosis360: {
        title: content.diagnosis360?.title ?? 'Diagnóstico 360°',
        subtitle:
          content.diagnosis360?.subtitle ??
          'Evaluación médica integral para diseñar un plan personalizado que respete tu salud, tu estética y tus objetivos reales.',
        cta: content.diagnosis360?.cta ?? 'Agendar Diagnóstico Personalizado',
        steps: content.diagnosis360?.steps ?? [
          'Escucha activa y análisis clínico de piel o cuerpo',
          'Plan terapéutico con tecnología médica certificada',
          'Seguimiento continuo hasta resultados visibles'
        ]
      },
      whyChoose: {
        title: content.whyChoose?.title ?? `Por qué Elegir ${config.name}`,
        subtitle:
          content.whyChoose?.subtitle ??
          'Medicina estética con rigor clínico, protocolos certificados y un entorno seguro para cada paciente.',
        points: content.whyChoose?.points ?? [
          {
            title: 'Protocolos médicos certificados',
            description: 'Técnicas no invasivas supervisadas por especialistas con criterio clínico y ético.'
          },
          {
            title: 'Seguridad del paciente primero',
            description:
              'Evaluación previa, indicaciones personalizadas y seguimiento en cada etapa del tratamiento.'
          },
          {
            title: 'Resultados naturales y medibles',
            description: 'Planes terapéuticos realistas con evolución documentada y expectativas alineadas.'
          }
        ]
      },
      locationPreview: {
        title: content.locationPreview?.title ?? 'Horarios & Sede',
        subtitle:
          content.locationPreview?.subtitle ??
          `Atención médica personalizada en ${city} con agenda previa.`,
        cta: content.locationPreview?.cta ?? 'Ver ubicación completa'
      },
      ctaZone: {
        eyebrow: content.ctaZone?.eyebrow ?? 'Valoración médica & resultados',
        title:
          content.ctaZone?.title ??
          '¿Quieres comprobar la efectividad de nuestros tratamientos antes de agendar?',
        casesCta: content.ctaZone?.casesCta ?? 'Ver casos clínicos',
        whatsappCta: content.ctaZone?.whatsappCta ?? 'Evaluar mi caso por WhatsApp'
      },
      testimonials: {
        eyebrow: content.testimonials?.eyebrow ?? 'EXPERIENCIAS REALES',
        title:
          content.testimonials?.title ??
          'Resultados que transforman la confianza médica y estética',
        items: content.testimonials?.items ?? [
          {
            id: 'valeria-m',
            treatment: treatments[0]?.title ?? 'Armonización Facial',
            quote:
              'Buscaba un resultado súper natural y cero exagerado. La evaluación previa me dio muchísima seguridad; el perfilado quedó impecable.',
            patientName: 'Valeria M.',
            patientMeta: `Paciente verificada · Sede ${city}`
          },
          {
            id: 'claudia-r',
            treatment: treatments[1]?.title ?? 'Criolipólisis 360°',
            quote:
              'Reduje medidas sin dolor ni tiempo de recuperación. La aparatología médica y el seguimiento del equipo fueron de primer nivel.',
            patientName: 'Claudia R.',
            patientMeta: `Paciente verificada · Sede ${city}`
          },
          {
            id: 'luciana-g',
            treatment: treatments[2]?.title ?? 'Hydrafacial & Bioestimuladores',
            quote:
              'Mi piel recuperó una luminosidad increíble desde la primera sesión. La atención boutique y el trato personalizado marcan toda la diferencia.',
            patientName: 'Luciana G.',
            patientMeta: `Paciente verificada · Sede ${city}`
          }
        ]
      },
      closing: {
        title: content.closing?.title ?? '¿Lista para iniciar tu cambio?',
        subtitle:
          content.closing?.subtitle ??
          'Agenda tu evaluación médica y recibe orientación directa por WhatsApp.',
        cta: content.closing?.cta ?? 'Agendar Diagnóstico Personalizado'
      },
      beforeAfter: {
        before: assets.beforeAfter?.before ?? AESTHETIC_MEDIA_PACK.beforeAfter.before,
        after: assets.beforeAfter?.after ?? AESTHETIC_MEDIA_PACK.beforeAfter.after,
        width: assets.beforeAfter?.width ?? AESTHETIC_MEDIA_PACK.beforeAfter.width,
        height: assets.beforeAfter?.height ?? AESTHETIC_MEDIA_PACK.beforeAfter.height
      }
    },
    treatmentsPage: {
      title: content.treatmentsPage?.title ?? 'Tratamientos Médico-Estéticos',
      subtitle:
        content.treatmentsPage?.subtitle ??
        'Protocolos faciales, corporales y de rejuvenecimiento con enfoque clínico, seguridad y resultados naturales.',
      categories: content.treatmentsPage?.categories ?? DEFAULT_CATEGORIES
    },
    casesPage: {
      title: content.casesPage?.title ?? 'Resultados Clínicos Reales',
      subtitle:
        content.casesPage?.subtitle ??
        'Evolución y transformación documentada bajo seguimiento médico estricto.',
      cta: content.casesPage?.cta ?? 'Evaluar mi caso por WhatsApp'
    },
    specialistsPage: {
      title: content.specialistsPage?.title ?? 'Dirección Médica & Especialistas',
      subtitle:
        content.specialistsPage?.subtitle ??
        'Profesionales dedicados a realzar tu belleza preservando tu salud.',
      cta: content.specialistsPage?.cta ?? 'Hablar con un asesor médico'
    },
    locationPage: {
      title: content.locationPage?.title ?? 'Nuestra Sede',
      subtitle:
        content.locationPage?.subtitle ??
        `Visítanos en ${city} con atención médica personalizada y agenda previa.`,
      ctaMaps: content.locationPage?.ctaMaps ?? 'Ver en Google Maps',
      ctaBook: content.locationPage?.ctaBook ?? 'Solicitar Ubicación y Cita en Sede'
    },
    whatsapp: {
      appointment: `Hola, deseo agendar una cita en ${config.name}.`,
      homeDiagnosis: `Hola, deseo agendar un diagnóstico personalizado en ${config.name}.`,
      diagnosis360: 'Hola, deseo agendar mi evaluación médica personalizada',
      clinicalCase:
        'Hola, vi los casos clínicos en la web y me gustaría evaluar si califico para un procedimiento similar.',
      evaluateCase: 'Hola, deseo evaluar mi caso médico por WhatsApp',
      specialists: `Hola, me gustaría agendar una consulta con el equipo de especialistas de ${config.name}.`,
      location: 'Hola, deseo recibir la ubicación exacta y confirmar disponibilidad para asistir a la sede.',
      closing: `Hola, deseo agendar un diagnóstico personalizado en ${config.name}.`,
      treatmentTemplate: 'Hola, deseo información y evaluación para el tratamiento de {name}.',
      specialistTemplate: `Hola, deseo agendar una consulta con {name} en ${config.name}.`
    },
    expiration: {
      expiresAt: config.expiresAt ?? defaultExpiresAt(),
      title: 'Demostración Privada Expirada',
      message:
        'El periodo de evaluación de 72 horas ha finalizado. Contacte a Pointers para reactivar el despliegue oficial.',
      ctaLabel: 'Ir a Pointers',
      ctaUrl: POINTERS_URL
    }
  };
}
