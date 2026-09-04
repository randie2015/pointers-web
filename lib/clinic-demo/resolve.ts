import { DENTIST_MEDIA_PACK } from '@/lib/clinic-demo/media-packs';
import { buildDemoThemeStyle } from '@/lib/clinic-demo/theme';
import type { DemoConfig, ResolvedDemo, ResolvedTreatment } from '@/lib/clinic-demo/types';

const POINTERS_URL = 'https://pointers.marketing';
const DEFAULT_CLOSER = {
  name: 'Diego',
  whatsapp: '51904330335',
  phone: '+51904330335',
  phoneDisplay: '+51 904 330 335'
} as const;

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

const DEFAULT_SERVICE_IMAGES = [
  DENTIST_MEDIA_PACK.services.estetica,
  DENTIST_MEDIA_PACK.services.blanqueamiento,
  DENTIST_MEDIA_PACK.services.rehabilitacion,
  DENTIST_MEDIA_PACK.services.armonizacion
] as const;

function resolveTreatments(config: DemoConfig): ResolvedTreatment[] {
  const icons: ResolvedTreatment['icon'][] = ['whitening', 'whitening', 'implant', 'align'];

  return config.services.slice(0, 4).map((service, index) => {
    const id = slugify(service.title) || `servicio-${index + 1}`;
    return {
      id,
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description ?? service.shortDescription,
      benefits: service.benefits?.length
        ? service.benefits
        : ['Plan personalizado', 'Resultados naturales', 'Atención cercana', 'Protocolo clínico'],
      icon: service.icon ?? icons[index] ?? 'general',
      image: service.image ?? DEFAULT_SERVICE_IMAGES[index],
      imageAlt: service.imageAlt ?? service.title
    };
  });
}

export function resolveDemo(config: DemoConfig): ResolvedDemo {
  const basePath = `/${config.slug}`;
  const content = config.content ?? {};
  const city = config.city ?? 'Arequipa';
  const doctor = config.doctor ?? config.name;
  const tagline = config.tagline ?? 'Odontología Estética';
  const subbrand = config.subbrand ?? 'Smile Studio';
  const positioning = config.positioning ?? 'Especialista en Estética Dental';
  const usp = config.usp ?? 'Atención boutique';
  const assets = config.assets ?? {};
  const closer = {
    name: DEFAULT_CLOSER.name,
    whatsapp: config.whatsapp ?? DEFAULT_CLOSER.whatsapp,
    phone: config.phone ?? DEFAULT_CLOSER.phone,
    phoneDisplay: config.phoneDisplay ?? DEFAULT_CLOSER.phoneDisplay
  };

  return {
    slug: config.slug,
    basePath,
    preset: config.preset,
    themeStyle: buildDemoThemeStyle(config.colors.primary, config.colors.accent),
    brand: {
      name: config.name,
      subbrand,
      positioning,
      doctor,
      doctorFullName: doctor,
      tagline,
      usp,
      disclaimer:
        content.disclaimer ??
        `Aviso de Demostración Privada (72 horas): Entorno interactivo temporal desarrollado por Pointers (pointers.marketing) con fines exclusivos de evaluación técnica para ${config.name}. Plataforma no indexada en Google y de acceso restringido. Derechos reservados a sus respectivos titulares.`,
      pointersUrl: POINTERS_URL,
      logo: config.logo || DENTIST_MEDIA_PACK.logo,
      logoMark: config.logo || DENTIST_MEDIA_PACK.logoMark,
      doctorPhoto: assets.doctorPhoto ?? DENTIST_MEDIA_PACK.doctorPhoto,
      heroVideo: assets.heroVideo ?? DENTIST_MEDIA_PACK.heroVideo,
      heroVideoWebm: assets.heroVideoWebm ?? DENTIST_MEDIA_PACK.heroVideoWebm,
      heroPoster: assets.heroPoster ?? DENTIST_MEDIA_PACK.heroPoster
    },
    contact: {
      phone: closer.phone,
      phoneDisplay: closer.phoneDisplay,
      email: config.email ?? `contacto@${config.slug.replace(/-/g, '')}.pe`,
      address: config.address ?? `Consultorio · ${city}`,
      city,
      mapsUrl: config.mapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(`${city}, Peru`)}`,
      schedule: {
        weekdays: 'Lunes a Viernes: 10:00 a.m. – 7:00 p.m.',
        saturday: 'Sábado: Con cita previa',
        sunday: 'Domingo: Cerrado'
      }
    },
    closer,
    nav: [
      { label: 'Servicios', href: `${basePath}/servicios` },
      { label: 'Nosotros', href: `${basePath}/nosotros` },
      { label: 'Contacto', href: `${basePath}/contacto` }
    ],
    treatments: resolveTreatments(config),
    home: {
      hero: {
        badge: content.hero?.badge ?? `${positioning} · ${usp}`,
        title: content.hero?.title ?? 'Diseño de Sonrisas &',
        titleAccent: content.hero?.titleAccent ?? 'Estética Dental de Alta Precisión',
        subtitle:
          content.hero?.subtitle ??
          `Atención odontológica boutique en ${city}. Resultados naturales, planificación clara y acompañamiento cercano.`,
        primaryCta: content.hero?.primaryCta ?? 'Agendar Evaluación por WhatsApp',
        secondaryCta: content.hero?.secondaryCta ?? 'Ver Casos Clínicos',
        ratingStars: content.hero?.ratingStars ?? '★★★★★',
        ratingText: content.hero?.ratingText ?? `${subbrand} · Boutique Dental Experience`
      },
      stats: content.stats ?? [
        { value: '4', label: 'servicios estrella' },
        { value: '100%', label: 'enfoque estético' },
        { value: 'Mock-up', label: 'prueba en boca' },
        { value: city, label: 'consulta privada' }
      ],
      cases: {
        title: content.cases?.title ?? 'Transformaciones Reales',
        subtitle:
          content.cases?.subtitle ??
          'Comparación interactiva de casos clínicos en carillas, resina y diseño de sonrisa.'
      },
      process: {
        title: content.process?.title ?? 'Proceso de Transformación en 3 Pasos',
        subtitle:
          content.process?.subtitle ??
          'Un recorrido boutique, claro y predecible, desde el diagnóstico hasta tu sonrisa definitiva.',
        steps: content.process?.steps ?? [
          {
            step: '01',
            title: 'Diagnóstico y Plan',
            description: 'Evaluación clínica y planificación para visualizar tu resultado.'
          },
          {
            step: '02',
            title: 'Prueba Estética',
            description: 'Validamos forma, color y armonía antes del tratamiento final.'
          },
          {
            step: '03',
            title: 'Resultado Definitivo',
            description: 'Ejecución precisa con acabados naturales de alta gama.'
          }
        ]
      },
      location: {
        title: content.location?.title ?? `Consulta Privada en ${city}`,
        ctaMaps: content.location?.ctaMaps ?? 'Cómo Llegar',
        ctaReception: content.location?.ctaReception ?? 'Escribir a Recepción'
      },
      closingCta: {
        title: content.closingCta?.title ?? '¿Lista para diseñar la sonrisa que siempre imaginaste?',
        subtitle:
          content.closingCta?.subtitle ??
          'Agenda tu evaluación boutique. Respuesta directa por WhatsApp, sin formularios.',
        button: content.closingCta?.button ?? 'Contactar a Recepción por WhatsApp'
      },
      beforeAfter: {
        before: assets.beforeAfter?.before ?? DENTIST_MEDIA_PACK.beforeAfter.before,
        after: assets.beforeAfter?.after ?? DENTIST_MEDIA_PACK.beforeAfter.after,
        width: assets.beforeAfter?.width ?? DENTIST_MEDIA_PACK.beforeAfter.width,
        height: assets.beforeAfter?.height ?? DENTIST_MEDIA_PACK.beforeAfter.height
      }
    },
    about: {
      hero: {
        title: content.about?.heroTitle ?? 'Estética dental boutique con precisión clínica',
        subtitle:
          content.about?.heroSubtitle ??
          `${doctor} combina sensibilidad estética y tecnología digital para crear sonrisas naturales y sofisticadas.`
      },
      values: content.about?.values ?? [
        {
          title: 'Precisión clínica',
          description: 'Protocolos claros y materiales premium para resultados predecibles.'
        },
        {
          title: 'Experiencia boutique',
          description: 'Atención personalizada, con tiempos respetados y acompañamiento cercano.'
        },
        {
          title: 'Diseño digital',
          description: 'Planificación previa para previsualizar resultados antes de iniciar.'
        },
        {
          title: 'Resultados naturales',
          description: 'Enfoque en armonía facial, proporción y acabados que lucen auténticos.'
        }
      ],
      doctorBio:
        content.about?.doctorBio ??
        `${doctor} lidera ${config.name} con un enfoque boutique en diseño de sonrisas y estética dental en ${city}.`
    },
    servicesPage: {
      title: content.servicesPage?.title ?? 'Servicios Estrella',
      subtitle:
        content.servicesPage?.subtitle ??
        'Tratamientos de alta gama en diseño de sonrisa, estética y rehabilitación con enfoque boutique.'
    },
    contactPage: {
      title: content.contactPage?.title ?? 'Contacto y Ubicación',
      subtitle:
        content.contactPage?.subtitle ??
        `Consulta privada en ${city}. Escríbenos directamente — respuesta inmediata por WhatsApp.`,
      callCta: content.contactPage?.callCta ?? 'Llamar a Recepción',
      whatsappCta: content.contactPage?.whatsappCta ?? 'Escribir por WhatsApp'
    },
    whatsappMessage:
      content.whatsappMessage ??
      `Hola Diego, estuve revisando la demo de la web para ${config.name} y me gustaría coordinar los detalles finales de la plataforma.`,
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
