export const clinicColors = {
  ivory: '#FAF7F5',
  rose: '#E8B4B8',
  cta: '#C97D7D',
  gold: '#C5A059',
  ink: '#2E2A2B',
  surface: '#FFFFFF'
} as const;

export const clinicBrand = {
  name: 'Dra. Alejandra Cusirramos',
  subbrand: 'Smile Maker',
  positioning: 'Especialista en Estética Dental',
  doctor: 'Dra. Alejandra Cusirramos',
  doctorFullName: 'Dra. Alejandra Cusirramos',
  tagline: 'Odontología Estética',
  usp: 'USP Brasil',
  disclaimer:
    'Aviso de Demostración Privada (72 horas): Entorno interactivo temporal desarrollado por Pointers (pointers.marketing) con fines exclusivos de evaluación técnica para la Dra. Alejandra Cusirramos. Plataforma no indexada en Google y de acceso restringido. Derechos reservados a sus respectivos titulares.',
  pointersUrl: 'https://pointers.marketing',
  logo: '/dra-alejandra/logo-mark.svg',
  doctorPhoto: '/dra-alejandra/doctor.jpg',
  heroVideo: '/dra-alejandra/hero-video.mp4',
  heroVideoWebm: '/dra-alejandra/hero-video.webm',
  heroPoster: '/dra-alejandra/hero-poster.webp'
} as const;

export const pointersCloser = {
  name: 'Diego',
  whatsapp: '51904330335',
  phone: '+51904330335',
  phoneDisplay: '+51 904 330 335'
} as const;

export const clinicContact = {
  phone: pointersCloser.phone,
  phoneDisplay: pointersCloser.phoneDisplay,
  email: 'recepcion@draalejandracusirramos.pe',
  address: 'Dental Office - Arequipa',
  district: 'Arequipa',
  city: 'Arequipa',
  country: 'Perú',
  mapsUrl: 'https://maps.google.com/?q=Dental+Office+Arequipa,+Peru',
  schedule: {
    weekdays: 'Lunes a Viernes: 10:00 a.m. – 7:00 p.m.',
    saturday: 'Sábado: Con cita previa',
    sunday: 'Domingo: Cerrado'
  }
} as const;

export const clinicNav = [
  { label: 'Servicios', href: '/alejandracusirramos/servicios' },
  { label: 'Nosotros', href: '/alejandracusirramos/nosotros' },
  { label: 'Contacto', href: '/alejandracusirramos/contacto' }
] as const;

export const clinicHome = {
  hero: {
    badge: 'Especialista en Estética Dental · USP Brasil',
    title: 'Diseño de Sonrisas &',
    titleAccent: 'Estética Dental de Alta Precisión',
    subtitle:
      'Armonización dental personalizada, natural y sin dolor en Arequipa. Formación especializada en la Universidad de São Paulo (USP Brasil).',
    primaryCta: 'Agendar Evaluación por WhatsApp',
    secondaryCta: 'Ver Casos Clínicos',
    ratingStars: '★★★★★',
    ratingText: 'Smile Maker · Boutique Dental Experience'
  },
  stats: [
    { value: 'USP', label: 'formación en Brasil' },
    { value: '100%', label: 'enfoque estético' },
    { value: 'Mock-up', label: 'prueba en boca' },
    { value: 'Arequipa', label: 'consulta privada' }
  ],
  cases: {
    title: 'Transformaciones Reales',
    subtitle: 'Comparación interactiva de casos clínicos en carillas, resina y diseño de sonrisa.'
  },
  process: {
    title: 'Proceso de Transformación en 3 Pasos',
    subtitle: 'Un recorrido boutique, claro y predecible, desde el diagnóstico hasta tu sonrisa definitiva.',
    steps: [
      {
        step: '01',
        title: 'Diagnóstico Fotográfico y Plan Digital',
        description: 'Análisis facial, fotografía clínica y planificación digital para visualizar tu resultado.'
      },
      {
        step: '02',
        title: 'Mock-up / Prueba Estética en Boca',
        description: 'Prueba temporal en boca para validar forma, color y armonía antes del tratamiento final.'
      },
      {
        step: '03',
        title: 'Ejecución y Sonrisa Definitiva',
        description: 'Ejecución precisa con materiales premium y acabados naturales de alta gama.'
      }
    ]
  },
  location: {
    title: 'Consulta Privada en Arequipa',
    ctaMaps: 'Cómo Llegar',
    ctaReception: 'Escribir a Recepción'
  },
  closingCta: {
    title: '¿Lista para diseñar la sonrisa que siempre imaginaste?',
    subtitle: 'Agenda tu evaluación boutique. Respuesta directa por WhatsApp, sin formularios.',
    button: 'Contactar a Recepción por WhatsApp'
  },
  beforeAfter: {
    before: '/dra-alejandra/before-after-before.webp',
    after: '/dra-alejandra/before-after-after.webp',
    width: 1200,
    height: 600
  }
} as const;

export type Treatment = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  icon: 'align' | 'implant' | 'whitening' | 'general';
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export const clinicTreatments: Treatment[] = [
  {
    id: 'diseno-sonrisa',
    title: 'Diseño de Sonrisa & Carillas',
    shortDescription: 'Estratificación en resina y carillas cerámicas sin desgaste excesivo.',
    description:
      'Diseño personalizado de sonrisa con carillas de resina y cerámica, priorizando naturalidad, proporción facial y mínima intervención dental.',
    benefits: [
      'Diseño digital previo',
      'Carillas de resina y cerámica',
      'Mínimo desgaste dental',
      'Resultados naturales y armónicos'
    ],
    icon: 'whitening',
    image: '/dra-alejandra/services/estetica.webp',
    imageAlt: 'Diseño de sonrisa con carillas estéticas de alta precisión'
  },
  {
    id: 'blanqueamiento',
    title: 'Blanqueamiento Dental Boutique',
    shortDescription: 'Protocolos de alta luminosidad sin sensibilidad.',
    description:
      'Blanqueamiento profesional con protocolos boutique para lograr luminosidad superior con confort y control clínico.',
    benefits: [
      'Alta luminosidad controlada',
      'Protocolos anti-sensibilidad',
      'Resultados inmediatos',
      'Mantenimiento personalizado'
    ],
    icon: 'whitening',
    image: '/dra-alejandra/services/blanqueamiento.jpg',
    imageAlt: 'Blanqueamiento dental boutique con protocolo clínico de alta luminosidad'
  },
  {
    id: 'rehabilitacion',
    title: 'Rehabilitación Oral Estética',
    shortDescription: 'Coronas libres de metal y restauraciones invisibles.',
    description:
      'Rehabilitaciones estéticas con coronas libres de metal, restauraciones discretas y acabados de alta gama.',
    benefits: [
      'Coronas libres de metal',
      'Restauraciones invisibles',
      'Función y estética integradas',
      'Materiales premium'
    ],
    icon: 'implant',
    image: '/dra-alejandra/services/rehabilitacion.jpg',
    imageAlt: 'Modelos dentales y planificación de rehabilitación estética de alta precisión'
  },
  {
    id: 'armonizacion',
    title: 'Armonización de la Sonrisa & Alineación',
    shortDescription: 'Estética gingival y alineación dental para una sonrisa equilibrada.',
    description:
      'Armonización completa de la sonrisa con enfoque en contorno gingival, proporción dental y alineación estética.',
    benefits: [
      'Estética gingival',
      'Alineación dental estética',
      'Proporción y simetría facial',
      'Plan integral personalizado'
    ],
    icon: 'align',
    image: '/dra-alejandra/services/armonizacion.jpg',
    imageAlt: 'Alineador transparente para armonización y alineación dental estética'
  }
];

export const clinicAbout = {
  hero: {
    title: 'Estética dental boutique con precisión clínica',
    subtitle:
      'La Dra. Alejandra Cusirramos combina formación en USP Brasil, sensibilidad estética y tecnología digital para crear sonrisas naturales y sofisticadas.'
  },
  values: [
    {
      title: 'Formación USP Brasil',
      description: 'Especialización en estética dental con estándares internacionales de precisión y naturalidad.'
    },
    {
      title: 'Experiencia boutique',
      description: 'Atención personalizada en consulta privada, con tiempos respetados y acompañamiento cercano.'
    },
    {
      title: 'Diseño digital',
      description: 'Planificación fotográfica y mock-up en boca para previsualizar resultados antes de iniciar.'
    },
    {
      title: 'Resultados naturales',
      description: 'Enfoque en armonía facial, proporción y acabados premium que lucen auténticos.'
    }
  ],
  doctorBio:
    'La Dra. Alejandra Cusirramos es especialista en estética dental con formación en la Universidad de São Paulo (USP Brasil). Lidera Smile Maker con un enfoque boutique en diseño de sonrisas, carillas y rehabilitación estética en Arequipa.'
} as const;

export const clinicServicesPage = {
  title: 'Servicios Estrella',
  subtitle: 'Tratamientos de alta gama en diseño de sonrisa, estética y rehabilitación con enfoque boutique.'
} as const;

export const clinicContactPage = {
  title: 'Contacto y Ubicación',
  subtitle: 'Consulta privada en Arequipa. Escríbenos directamente — respuesta inmediata por WhatsApp.',
  callCta: 'Llamar a Recepción',
  whatsappCta: 'Escribir por WhatsApp'
} as const;

export const clinicWhatsApp = {
  defaultMessage:
    'Hola Diego, estuve revisando la demo de la web para la Dra. Alejandra Cusirramos y me gustaría coordinar los detalles finales de la plataforma.'
} as const;

export const clinicExpiration = {
  expiresAt: '2026-09-04T13:30:00-05:00',
  title: 'Demostración Privada Expirada',
  message:
    'El periodo de evaluación de 72 horas ha finalizado. Contacte a Pointers para reactivar el despliegue oficial.',
  ctaLabel: 'Ir a Pointers',
  ctaUrl: 'https://pointers.marketing'
} as const;
