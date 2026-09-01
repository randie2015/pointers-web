export const MAGRASS_BASE = '/magrass-lagree' as const;

export const clinicBrand = {
  name: 'Magrass LaGreé',
  logoMark: '/magrass-lagree/logo.png',
  subtitle: 'Consultorio Médico',
  tagline: 'Consultorio Médico Estético',
  disclaimer: '© Magrass LaGreé — Consultorio Médico. Todos los derechos reservados.',
  pointersUrl: 'https://pointers.marketing'
} as const;

export const clinicContact = {
  phone: '+51904330335',
  phoneDisplay: '+51 904 330 335',
  whatsapp: '51904330335',
  email: 'contacto@magrasslagree.pe',
  address: 'Arequipa, Perú',
  city: 'Arequipa',
  country: 'Perú',
  mapsUrl: 'https://maps.google.com/?q=Magrass+LaGre%C3%A9+Arequipa,+Peru',
  instagramUrl: 'https://www.instagram.com/',
  schedule: {
    weekdays: 'Lunes a Sábado: Atención previa cita',
    saturday: 'Agenda personalizada según disponibilidad',
    sunday: 'Domingo: Cerrado'
  }
} as const;

export const clinicNav = [
  { label: 'Inicio', href: MAGRASS_BASE },
  { label: 'Tratamientos', href: `${MAGRASS_BASE}/tratamientos` },
  { label: 'Casos Clínicos', href: `${MAGRASS_BASE}/casos-clinicos` },
  { label: 'Especialistas', href: `${MAGRASS_BASE}/especialistas` },
  { label: 'Ubicación', href: `${MAGRASS_BASE}/ubicacion` }
] as const;

export const clinicWhatsApp = {
  homeDiagnosis: 'Hola, deseo agendar un diagnóstico personalizado en Magrass LaGreé.',
  diagnosis360: 'Hola, deseo agendar mi evaluación médica personalizada',
  treatment: (name: string) =>
    `Hola, deseo información y evaluación para el tratamiento de ${name}.`,
  clinicalCase:
    'Hola, vi los casos clínicos en la web y me gustaría evaluar si califico para un procedimiento similar.',
  evaluateCase: 'Hola, deseo evaluar mi caso médico por WhatsApp',
  specialists:
    'Hola, me gustaría agendar una consulta con el equipo de especialistas de Magrass LaGreé.',
  location:
    'Hola, deseo recibir la ubicación exacta y confirmar disponibilidad para asistir a la sede.',
  closing: 'Hola, deseo agendar un diagnóstico personalizado en Magrass LaGreé.',
  appointment: 'Hola, deseo agendar una cita en Magrass LaGreé.'
} as const;

export const clinicHome = {
  hero: {
    badge: 'Centro Médico Estético en Arequipa',
    title: 'Medicina Estética de Precisión y Cuidado Integral',
    subtitle:
      'Resultados naturales respaldados por rigor médico y tecnología de vanguardia.',
    primaryCta: 'Agendar Diagnóstico Personalizado',
    secondaryCta: 'Ver Tratamientos',
    trustBadges: ['Tecnología Médica', 'Atención Ética', 'Diagnóstico 360°']
  },
  valuePillars: [
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
  closing: {
    title: '¿Lista para iniciar tu cambio?',
    subtitle: 'Agenda tu evaluación médica y recibe orientación directa por WhatsApp.',
    cta: 'Agendar Diagnóstico Personalizado'
  },
  diagnosis360: {
    title: 'Diagnóstico 360°',
    subtitle:
      'Evaluación médica integral para diseñar un plan personalizado que respete tu salud, tu estética y tus objetivos reales.',
    cta: 'Agendar Diagnóstico Personalizado',
    steps: [
      'Escucha activa y análisis clínico de piel o cuerpo',
      'Plan terapéutico con tecnología médica certificada',
      'Seguimiento continuo hasta resultados visibles'
    ]
  },
  beforeAfter: {
    before: '/magrass-lagree/before-after-before.webp',
    after: '/magrass-lagree/before-after-after.webp',
    width: 1200,
    height: 700
  },
  featuredTreatments: [
    {
      id: 'armonizacion',
      anchor: 'armonizacion-facial',
      badge: 'FACIAL',
      title: 'Armonización Facial & Ácido Hialurónico',
      description: 'Perfilado natural de labios, mentón y ángulo mandibular con simetría clínica.',
      image: '/magrass-lagree/armonizacion-facial.jpg'
    },
    {
      id: 'criolipolisis',
      anchor: 'criolipolisis',
      badge: 'CORPORAL',
      title: 'Criolipólisis 360°',
      description: 'Reducción no invasiva de grasa localizada con frío controlado y sin recuperación.',
      image: '/magrass-lagree/criolipolisis.jpg'
    },
    {
      id: 'bioestimuladores',
      anchor: 'bioestimuladores',
      badge: 'ANTIAGE',
      title: 'Bioestimuladores de Colágeno',
      description: 'Rejuvenecimiento progresivo con firmeza, luminosidad y calidad dérmica mejorada.',
      image: '/magrass-lagree/bioestimuladores.jpg'
    },
    {
      id: 'hydrafacial',
      anchor: 'hydrafacial',
      badge: 'FACIAL',
      title: 'Limpieza Médica & Hydrafacial',
      description: 'Desintoxicación profunda, hidratación intensiva y glow inmediato con enfoque clínico.',
      image: '/magrass-lagree/hero-poster.webp'
    },
    {
      id: 'peptonas',
      anchor: 'peptonas',
      badge: 'CORPORAL',
      title: 'Peptonas & Firmeza de Glúteos',
      description: 'Tonificación y levantamiento glúteo con estimulación muscular y aparatología médica.',
      image: '/magrass-lagree/before-after-after.webp'
    },
    {
      id: 'enzimas',
      anchor: 'enzimas',
      badge: 'CORPORAL',
      title: 'Enzimas PB Serum & Reductores',
      description: 'Tratamiento focalizado para adiposidad rebelde, flacidez y celulitis con acción tensora.',
      image: '/magrass-lagree/before-after-before.webp'
    }
  ] satisfies readonly FeaturedTreatment[],
  whyChoose: {
    title: 'Por qué Elegir Magrass LaGreé',
    subtitle:
      'Medicina estética con rigor clínico, protocolos certificados y un entorno seguro para cada paciente.',
    points: [
      {
        title: 'Protocolos médicos certificados',
        description: 'Técnicas no invasivas supervisadas por especialistas con criterio clínico y ético.'
      },
      {
        title: 'Seguridad del paciente primero',
        description: 'Evaluación previa, indicaciones personalizadas y seguimiento en cada etapa del tratamiento.'
      },
      {
        title: 'Resultados naturales y medibles',
        description: 'Planes terapéuticos realistas con evolución documentada y expectativas alineadas.'
      }
    ]
  },
  locationPreview: {
    title: 'Horarios & Sede',
    subtitle: 'Atención médica personalizada en Arequipa con agenda previa.',
    cta: 'Ver ubicación completa'
  },
  ctaZone: {
    eyebrow: 'Valoración médica & resultados',
    title: '¿Quieres comprobar la efectividad de nuestros tratamientos antes de agendar?',
    casesCta: 'Ver casos clínicos',
    whatsappCta: 'Evaluar mi caso por WhatsApp'
  }
} as const;

export const treatmentsPage = {
  title: 'Tratamientos Médico-Estéticos',
  subtitle:
    'Protocolos faciales, corporales y de rejuvenecimiento con enfoque clínico, seguridad y resultados naturales.',
  categories: [
    { id: 'facial', label: 'Facial' },
    { id: 'corporal', label: 'Corporal' },
    { id: 'rejuvenecimiento', label: 'Rejuvenecimiento' }
  ] as const
} as const;

export type TreatmentCategory = (typeof treatmentsPage.categories)[number]['id'];

export type MagrassTreatment = {
  id: string;
  anchor: string;
  title: string;
  description: string;
  expectedResults: string;
  category: TreatmentCategory;
};

export type FeaturedTreatment = {
  id: string;
  anchor: string;
  badge: string;
  title: string;
  description: string;
  image: string;
};

export const keyTreatments: MagrassTreatment[] = [
  {
    id: 'armonizacion',
    anchor: 'armonizacion-facial',
    category: 'facial',
    title: 'Armonización Facial & Ácido Hialurónico',
    description:
      'Perfilado de labios, mentón y ángulo mandibular respetando simetría y naturalidad facial.',
    expectedResults: 'Contorno definido, volumen equilibrado y armonía visible desde la primera sesión.'
  },
  {
    id: 'botox',
    anchor: 'botox',
    category: 'facial',
    title: 'Toxina Botulínica (Botox)',
    description:
      'Atenuación y prevención de líneas de expresión en frente, entrecejo y patas de gallo.',
    expectedResults: 'Expresión más descansada, piel lisa y prevención del envejecimiento dinámico.'
  },
  {
    id: 'hydrafacial',
    anchor: 'hydrafacial',
    category: 'facial',
    title: 'Limpieza Facial Médica & Hydrafacial',
    description:
      'Desintoxicación profunda, extracción de impurezas e hidratación intensiva con glow inmediato.',
    expectedResults: 'Piel luminosa, poros refinados e hidratación visible desde la primera visita.'
  },
  {
    id: 'criolipolisis',
    anchor: 'criolipolisis',
    category: 'corporal',
    title: 'Criolipólisis 360°',
    description:
      'Reducción no invasiva de grasa localizada mediante frío controlado, sin dolor ni recuperación.',
    expectedResults: 'Reducción progresiva de adiposidad localizada y silueta más armónica.'
  },
  {
    id: 'peptonas',
    anchor: 'peptonas',
    category: 'corporal',
    title: 'Peptonas & Firmeza de Glúteos',
    description:
      'Estimulación muscular para tonificar y levantar glúteos combinada con aparatología médica.',
    expectedResults: 'Mayor firmeza, tono muscular mejorado y contorno glúteo más definido.'
  },
  {
    id: 'pb-serum',
    anchor: 'enzimas',
    category: 'corporal',
    title: 'Enzimas PB Serum & Reductores',
    description:
      'Tratamiento focalizado para adiposidad rebelde, flacidez y celulitis con acción tensora.',
    expectedResults: 'Piel más firme, textura uniforme y reducción visible de volumen localizado.'
  },
  {
    id: 'bioestimuladores',
    anchor: 'bioestimuladores',
    category: 'rejuvenecimiento',
    title: 'Bioestimuladores de Colágeno',
    description:
      'Estimulación dérmica profunda para recuperar firmeza, elasticidad y calidad de la piel.',
    expectedResults: 'Piel más tersa, luminosa y rejuvenecida con resultados progresivos y duraderos.'
  },
  {
    id: 'peelings',
    anchor: 'peelings',
    category: 'rejuvenecimiento',
    title: 'Peelings Médicos & Dermapen',
    description:
      'Renovación celular controlada para mejorar textura, manchas y signos tempranos de envejecimiento.',
    expectedResults: 'Tono más uniforme, textura refinada y aspecto renovado en pocas sesiones.'
  },
  {
    id: 'iluminacion',
    anchor: 'iluminacion',
    category: 'rejuvenecimiento',
    title: 'Iluminación & Uniformidad de Tono',
    description:
      'Protocolos médicos para recuperar luminosidad, vitalidad y homogeneidad del cutis.',
    expectedResults: 'Rostro más radiante, manchas atenuadas y piel con glow saludable.'
  }
];

export type ClinicalCase = {
  id: string;
  title: string;
  approach: string;
  duration: string;
  summary: string;
};

export const clinicalCases: ClinicalCase[] = [
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
];

export const casesPage = {
  title: 'Resultados Clínicos Reales',
  subtitle: 'Evolución y transformación documentada bajo seguimiento médico estricto.',
  cta: 'Evaluar mi caso por WhatsApp'
} as const;

export type Specialist = {
  id: string;
  name: string;
  role: string;
  credentials: string[];
  focus: string;
};

export const specialists: Specialist[] = [
  {
    id: 'direccion',
    name: 'Dirección Médica Magrass LaGreé',
    role: 'Medicina Estética & Protocolos Integrales',
    credentials: [
      'Supervisión clínica de tratamientos faciales y corporales',
      'Protocolos no invasivos con tecnología médica certificada',
      'Enfoque en seguridad, ética y resultados naturales'
    ],
    focus:
      'Liderazgo médico enfocado en diagnóstico personalizado, combinación de técnicas y seguimiento riguroso de cada paciente.'
  },
  {
    id: 'estetica-facial',
    name: 'Especialista en Estética Facial',
    role: 'Armonización, Toxina Botulínica & Rejuvenecimiento',
    credentials: [
      'Evaluación facial 360° y diseño de plan terapéutico',
      'Manejo de ácido hialurónico y toxina botulínica',
      'Protocolos de limpieza médica e hidratación profunda'
    ],
    focus:
      'Realzar la belleza natural respetando proporciones faciales y expectativas individuales de cada paciente.'
  },
  {
    id: 'estetica-corporal',
    name: 'Especialista en Estética Corporal',
    role: 'Contorno, Firmeza & Reducción Localizada',
    credentials: [
      'Criolipólisis y aparatología médica corporal',
      'Protocolos con peptonas y enzimas reductoras',
      'Seguimiento de evolución y ajuste de plan clínico'
    ],
    focus:
      'Tratamientos corporales personalizados con objetivos medibles, enfoque en bienestar y resultados progresivos.'
  }
];

export const specialistsPage = {
  title: 'Dirección Médica & Especialistas',
  subtitle: 'Profesionales dedicados a realzar tu belleza preservando tu salud.',
  cta: 'Hablar con un asesor médico'
} as const;

export const locationPage = {
  title: 'Nuestra Sede',
  subtitle: 'Visítanos en Arequipa con atención médica personalizada y agenda previa.',
  ctaMaps: 'Ver en Google Maps',
  ctaBook: 'Solicitar Ubicación y Cita en Sede'
} as const;
