export const clinicColors = {
  base: '#F1F1F2',
  neutral: '#BCBABE',
  accent: '#A1D6E2',
  primary: '#1995AD',
  text: '#1E293B',
  textDark: '#0F172A'
} as const;

export const clinicBrand = {
  name: 'Rey Dental',
  doctor: 'Dr. David',
  doctorFullName: 'Dr. David',
  tagline: 'Atención Odontológica Especializada',
  disclaimer:
    'Aviso de Demostración Privada: Entorno interactivo temporal desarrollado por Pointers (pointers.marketing) con fines exclusivos de evaluación técnica para Rey Dental. Plataforma no indexada de acceso restringido. Derechos reservados a sus respectivos titulares.',
  pointersUrl: 'https://pointers.marketing',
  logo: '/rey-dental/logo.webp',
  doctorPhoto: '/rey-dental/doctor.jpg',
  heroVideo: '/rey-dental/hero-video.mp4',
  heroVideoWebm: '/rey-dental/hero-video.webm',
  heroPoster: '/rey-dental/hero-poster.webp'
} as const;

/** Recommended media specs for sharp display without heavy files. */
export const clinicMediaSpecs = {
  heroVideo: {
    format: 'MP4 (H.264) + opcional WebM (VP9) para mejor compresión',
    resolution: '1920×1080 px (Full HD) o 1280×720 px mínimo',
    aspectRatio: '16:9 horizontal',
    duration: '10–20 s en loop',
    maxWeight: '5–8 MB ideal (máx. ~15 MB)',
    notes: 'Sin audio o pista silenciada; loop seamless si es posible'
  },
  doctorPhoto: {
    format: 'WebP o JPG progresivo (PNG si necesitas transparencia)',
    resolution: '1200×1500 px mínimo (proporción 4:5)',
    retina: '2400×3000 px para pantallas 2x',
    maxWeight: '200–400 KB optimizado'
  },
  beforeAfter: {
    format: 'WebP o JPG; ambas imágenes mismo tamaño y encuadre',
    resolution: '1600×800 px mínimo (proporción 2:1)',
    retina: '3200×1600 px para pantallas 2x',
    maxWeight: '150–300 KB cada una'
  },
  logo: {
    format: 'SVG preferido; PNG 512×512 px con fondo transparente',
    notes: 'Vectorial evita pixelado en navbar y footer'
  },
  serviceCard: {
    format: 'WebP o JPG',
    resolution: '960×640 px (proporción 3:2 horizontal)',
    retina: '1200×800 px para pantallas 2x',
    maxWeight: '80–150 KB por imagen'
  }
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
  email: 'recepcion@reydental.pe',
  address: 'C. Rivero 408, segundo piso, oficina 10',
  district: 'Cercado',
  city: 'Arequipa',
  country: 'Perú',
  mapsUrl: 'https://maps.google.com/?q=C.+Rivero+408,+Arequipa,+Peru',
  schedule: {
    weekdays: 'Lunes a Viernes: 9:00 a.m. – 7:00 p.m.',
    saturday: 'Sábado: 9:00 a.m. – 1:00 p.m.',
    sunday: 'Domingo: Cerrado'
  }
} as const;

export const clinicNav = [
  { label: 'Servicios', href: '/rey-dental/servicios' },
  { label: 'Nosotros', href: '/rey-dental/nosotros' },
  { label: 'Contacto', href: '/rey-dental/contacto' }
] as const;

export const clinicHome = {
  hero: {
    badge: 'Atención Odontológica Especializada',
    title: 'Tu Sonrisa en Manos de Especialistas de Confianza',
    titleAccent: 'Especialistas de Confianza',
    subtitle:
      'Tratamientos personalizados, tecnología de vanguardia y atención sin dolor en un solo lugar.',
    primaryCta: 'Agendar Evaluación por WhatsApp',
    secondaryCta: 'Ver Tratamientos',
    rating: '★★★★★ +10 años de experiencia cuidando sonrisas'
  },
  stats: [
    { value: '+10 años', label: 'de experiencia clínica' },
    { value: '100%', label: 'Atención personalizada' },
    { value: 'Bioseguridad', label: 'protocolos certificados' },
    { value: 'Arequipa', label: 'Ubicación céntrica' }
  ],
  process: {
    title: 'Tu Tratamiento Dental en 3 Simples Pasos',
    subtitle: 'Un recorrido claro, transparente y enfocado en tu bienestar desde la primera visita.',
    steps: [
      {
        step: '01',
        title: 'Consulta de Evaluación',
        description: 'Diagnóstico clínico completo, radiografías digitales y planificación personalizada.'
      },
      {
        step: '02',
        title: 'Plan a tu Medida',
        description: 'Presupuesto transparente, cronograma definido y alternativas sin sorpresas.'
      },
      {
        step: '03',
        title: 'Ejecución y Resultados',
        description: 'Atención con tecnología de alta precisión, confort y seguimiento post-tratamiento.'
      }
    ]
  },
  location: {
    title: 'Visítanos en Nuestra Sede',
    ctaMaps: 'Cómo Llegar',
    ctaReception: 'Escribir a Recepción'
  },
  closingCta: {
    title: '¿Listo para recuperar tu tranquilidad y sonrisa?',
    subtitle: 'Agenda tu evaluación hoy mismo. Respuesta directa por WhatsApp sin formularios.',
    button: 'Contactar a Recepción por WhatsApp'
  },
  beforeAfter: {
    before: '/rey-dental/before-after-before.webp',
    after: '/rey-dental/before-after-after.webp',
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
};

export const clinicTreatments: Treatment[] = [
  {
    id: 'ortodoncia',
    title: 'Ortodoncia y Alineación',
    shortDescription: 'Corrección de mordida y alineación dental con planes personalizados.',
    description:
      'Brackets y alineadores para mejorar función, estética y salud periodontal con seguimiento continuo.',
    benefits: [
      'Evaluación ortodóntica digital',
      'Plan de tratamiento por etapas',
      'Control mensual de avance',
      'Resultados estables y naturales'
    ],
    icon: 'align',
    image: '/rey-dental/services/ortodoncia.webp',
    imageAlt: 'Paciente con brackets durante tratamiento de ortodoncia'
  },
  {
    id: 'implantes',
    title: 'Implantes y Rehabilitación Oral',
    shortDescription: 'Recupera piezas dentales con soluciones fijas y de larga duración.',
    description:
      'Implantes de titanio y rehabilitaciones protésicas para restaurar masticación y confianza.',
    benefits: [
      'Diagnóstico 3D previo',
      'Cirugía guiada de precisión',
      'Prótesis personalizadas',
      'Seguimiento post-operatorio'
    ],
    icon: 'implant'
  },
  {
    id: 'estetica',
    title: 'Estética Dental y Blanqueamiento',
    shortDescription: 'Sonrisas más luminosas con técnicas seguras y resultados naturales.',
    description:
      'Blanqueamiento profesional, carillas y diseño de sonrisa para realzar tu imagen.',
    benefits: [
      'Blanqueamiento clínico controlado',
      'Diseño de sonrisa digital',
      'Materiales de alta estética',
      'Mantenimiento personalizado'
    ],
    icon: 'whitening'
  },
  {
    id: 'integral',
    title: 'Odontología Integral y Prevención',
    shortDescription: 'Cuidado completo para toda la familia con enfoque preventivo.',
    description:
      'Limpiezas, restauraciones, endodoncia y controles periódicos para mantener tu salud oral.',
    benefits: [
      'Chequeos y profilaxis',
      'Restauraciones estéticas',
      'Manejo del dolor sin estrés',
      'Planes familiares flexibles'
    ],
    icon: 'general'
  }
];

export const clinicAbout = {
  hero: {
    title: 'Excelencia clínica con calidez humana',
    subtitle:
      'En Rey Dental combinamos experiencia médica, bioseguridad rigurosa y tecnología moderna para que cada visita sea segura, cómoda y efectiva.'
  },
  values: [
    {
      title: 'Bioseguridad certificada',
      description:
        'Esterilización de instrumental, protocolos de desinfección por área y control de cadena de frío en materiales.'
    },
    {
      title: 'Atención sin estrés',
      description:
        'Comunicación clara, tiempos respetados y técnicas de mínima invasión para una experiencia tranquila.'
    },
    {
      title: 'Tecnología de precisión',
      description:
        'Radiografía digital, planificación 3D y equipos de última generación para diagnósticos confiables.'
    },
    {
      title: 'Trato personalizado',
      description:
        'Cada paciente recibe un plan único, explicado paso a paso, con seguimiento cercano del Dr. David.'
    }
  ],
  doctorBio:
    'El Dr. David lidera Rey Dental con más de una década de experiencia en rehabilitación oral y estética dental. Su enfoque combina precisión clínica, empatía y resultados medibles para pacientes de Arequipa y alrededores.'
} as const;

export const clinicServicesPage = {
  title: 'Tratamientos Odontológicos',
  subtitle: 'Soluciones integrales para cada etapa de tu salud bucal, con atención especializada y seguimiento continuo.'
} as const;

export const clinicContactPage = {
  title: 'Contacto y Ubicación',
  subtitle: 'Estamos en el corazón de Arequipa. Escríbenos o llámanos directamente — sin formularios, respuesta inmediata.',
  callCta: 'Llamar a Recepción',
  whatsappCta: 'Escribir por WhatsApp'
} as const;

export const clinicWhatsApp = {
  default: undefined,
  appointment: 'agendar una evaluación',
  reception: 'contacto y recepción',
  location: 'ubicación y cómo llegar'
} as const;

export const clinicExpiration = {
  expiresAt: '2026-09-05T00:00:00-05:00',
  title: 'Entorno de Demostración Expirado',
  message:
    'Periodo de evaluación finalizado. Contacte a Pointers para reactivar el despliegue oficial.',
  ctaLabel: 'Ir a Pointers',
  ctaUrl: 'https://pointers.marketing'
} as const;
