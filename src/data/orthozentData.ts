export const clinicColors = {
  base: '#F8FAFC',
  surface: '#FFFFFF',
  primary: '#0F2137',
  accent: '#0284C7',
  gold: '#D4A373',
  text: '#334155',
  textDark: '#0F2137'
} as const;

export const clinicBrand = {
  name: 'Orthozent',
  doctor: 'Dr. Amatheus Zenteno',
  doctorFullName: 'Dr. Amatheus Zenteno',
  tagline: 'Ortodoncia Especializada y Salud Dental',
  disclaimer:
    'Aviso de Demostración Privada (72 horas): Entorno interactivo temporal desarrollado por Pointers (pointers.marketing) con fines exclusivos de evaluación técnica para Orthozent. Plataforma no indexada en Google y de acceso restringido. Derechos reservados a sus respectivos titulares.',
  pointersUrl: 'https://pointers.marketing',
  logo: '/orthozent/logo.png',
  doctorPhoto: '/orthozent/doctor.jpg',
  heroVideo: '/orthozent/hero-video.mp4',
  heroVideoWebm: '/orthozent/hero-video.webm',
  heroPoster: '/orthozent/hero-poster.webp'
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
  email: 'recepcion@orthozent.pe',
  address: 'Urb. Santa Catalina, N Lote 4 - JLByR',
  district: 'Santa Catalina',
  city: 'Arequipa',
  country: 'Perú',
  mapsUrl: 'https://maps.google.com/?q=Urb.+Santa+Catalina,+N+Lote+4,+Arequipa,+Peru',
  schedule: {
    weekdays: 'Lunes a Viernes: 9:00 a.m. – 7:00 p.m.',
    saturday: 'Sábado: 9:00 a.m. – 1:00 p.m.',
    sunday: 'Domingo: Cerrado'
  }
} as const;

export const clinicNav = [
  { label: 'Servicios', href: '/orthozent/servicios' },
  { label: 'Nosotros', href: '/orthozent/nosotros' },
  { label: 'Contacto', href: '/orthozent/contacto' }
] as const;

export const clinicHome = {
  hero: {
    badge: 'Ortodoncia Especializada',
    title: 'Ortodoncia Especializada y',
    titleAccent: 'Salud Dental en Arequipa',
    subtitle:
      'Tecnología de diagnóstico digital, atención cálida y planes de tratamiento de precisión para transformar tu sonrisa con confianza.',
    primaryCta: 'Agendar Evaluación por WhatsApp',
    secondaryCta: 'Ver Tratamientos',
    rating: '★★★★★ Ortodoncia avanzada con enfoque estético y clínico'
  },
  stats: [
    { value: '+12 años', label: 'de experiencia en ortodoncia' },
    { value: '3D', label: 'diagnóstico digital' },
    { value: '100%', label: 'planes personalizados' },
    { value: 'Arequipa', label: 'atención especializada' }
  ],
  process: {
    title: 'Tu Tratamiento en 3 Pasos',
    subtitle: 'Un proceso claro, moderno y centrado en resultados desde la primera evaluación.',
    steps: [
      {
        step: '01',
        title: 'Evaluación Digital',
        description: 'Escaneo intraoral, radiografías digitales y análisis ortodóntico de alta precisión.'
      },
      {
        step: '02',
        title: 'Plan Personalizado',
        description: 'Propuesta clara con alternativas, tiempos estimados y presupuesto transparente.'
      },
      {
        step: '03',
        title: 'Resultados Garantizados',
        description: 'Seguimiento continuo, ajustes programados y control de evolución en cada etapa.'
      }
    ]
  },
  location: {
    title: 'Visítanos en Orthozent',
    ctaMaps: 'Cómo Llegar',
    ctaReception: 'Escribir a Recepción'
  },
  closingCta: {
    title: '¿Listo para dar el primer paso hacia tu mejor sonrisa?',
    subtitle: 'Agenda tu evaluación hoy. Respuesta directa por WhatsApp, sin formularios.',
    button: 'Contactar a Recepción por WhatsApp'
  },
  beforeAfter: {
    before: '/orthozent/before-after-before.webp',
    after: '/orthozent/before-after-after.webp',
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
    id: 'ortodoncia',
    title: 'Ortodoncia y Alineación',
    shortDescription: 'Brackets estéticos, autoligados y alineadores invisibles para cada etapa.',
    description:
      'Corrección de mordida y alineación dental con sistemas modernos, controles digitales y seguimiento personalizado.',
    benefits: [
      'Brackets estéticos y autoligados',
      'Alineadores transparentes',
      'Planificación digital 3D',
      'Controles de avance programados'
    ],
    icon: 'align',
    image: '/orthozent/services/ortodoncia.webp',
    imageAlt: 'Tratamiento de ortodoncia con brackets estéticos',
    imagePosition: '50% 22%'
  },
  {
    id: 'implantes',
    title: 'Prótesis e Implantes Dentales',
    shortDescription: 'Rehabilitación oral completa con implantes y soluciones All-on-4.',
    description:
      'Recupera función y estética con implantes de titanio, prótesis fijas y protocolos de rehabilitación oral avanzada.',
    benefits: [
      'Diagnóstico tomográfico 3D',
      'Implantes y prótesis fijas',
      'Protocolos All-on-4',
      'Seguimiento postoperatorio'
    ],
    icon: 'implant',
    image: '/orthozent/services/implantes.webp',
    imageAlt: 'Rehabilitación oral con implantes dentales'
  },
  {
    id: 'estetica',
    title: 'Estética Dental y Coronas',
    shortDescription: 'Diseño de sonrisa y coronas de zirconio con acabado natural.',
    description:
      'Mejora la armonía facial y dental con diseño de sonrisa digital, coronas de zirconio y tratamientos estéticos de alta precisión.',
    benefits: [
      'Diseño de sonrisa digital',
      'Coronas de zirconio',
      'Estética funcional y natural',
      'Mock-up previo al tratamiento'
    ],
    icon: 'whitening',
    image: '/orthozent/services/estetica.webp',
    imageAlt: 'Sonrisa estética con coronas de alta calidad'
  },
  {
    id: 'integral',
    title: 'Odontología Integral y Cirugía Oral',
    shortDescription: 'Atención general, prevención y procedimientos de cirugía oral.',
    description:
      'Cuidado bucal completo para toda la familia, con enfoque preventivo y manejo especializado de cirugía oral.',
    benefits: [
      'Chequeos y profilaxis',
      'Restauraciones estéticas',
      'Cirugía oral ambulatoria',
      'Planes de mantenimiento'
    ],
    icon: 'general',
    image: '/orthozent/services/integral.webp',
    imageAlt: 'Atención integral y cirugía oral en clínica dental'
  }
];

export const clinicAbout = {
  hero: {
    title: 'Especialistas en ortodoncia con visión estética',
    subtitle:
      'En Orthozent unimos tecnología digital, precisión clínica y trato humano para ofrecer tratamientos odontológicos de alto nivel en Arequipa.'
  },
  values: [
    {
      title: 'Diagnóstico digital',
      description: 'Escaneo 3D, radiografía digital y planificación asistida por software para decisiones precisas.'
    },
    {
      title: 'Atención cálida',
      description: 'Comunicación clara en cada etapa, tiempos respetados y acompañamiento cercano al paciente.'
    },
    {
      title: 'Ortodoncia avanzada',
      description: 'Sistemas modernos de alineación y corrección de mordida con enfoque funcional y estético.'
    },
    {
      title: 'Resultados medibles',
      description: 'Seguimiento por controles programados y evaluación continua del progreso clínico.'
    }
  ],
  doctorBio:
    'El Dr. Amatheus Zenteno lidera Orthozent con enfoque en ortodoncia avanzada, rehabilitación oral y estética dental. Combina diagnóstico digital, precisión clínica y trato humano para resultados medibles en Arequipa.'
} as const;

export const clinicServicesPage = {
  title: 'Tratamientos Especializados',
  subtitle: 'Soluciones integrales en ortodoncia, implantes, estética y odontología general con enfoque en precisión y resultados.'
} as const;

export const clinicContactPage = {
  title: 'Contacto y Ubicación',
  subtitle: 'Estamos en Arequipa para atenderte. Escríbenos o llámanos directamente — sin formularios, respuesta inmediata.',
  callCta: 'Llamar a Recepción',
  whatsappCta: 'Escribir por WhatsApp'
} as const;

export const clinicWhatsApp = {
  defaultMessage:
    'Hola Diego, estuve revisando la demo de la web para Orthozent y me gustaría coordinar los detalles finales.'
} as const;

export const clinicExpiration = {
  expiresAt: '2026-09-04T13:09:00-05:00',
  title: 'Demostración Privada Expirada',
  message:
    'El periodo de evaluación de 72 horas ha finalizado. Contacte a Pointers para reactivar el despliegue oficial.',
  ctaLabel: 'Ir a Pointers',
  ctaUrl: 'https://pointers.marketing'
} as const;
