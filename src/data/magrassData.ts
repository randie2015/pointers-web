export const clinicBrand = {
  name: 'Magrass LaGreé',
  logoMark: '/magrass-lagree/logo.png',
  subtitle: 'Consultorio Médico',
  tagline: 'Consultorio Médico Estético',
  disclaimer: '© Magrass LaGreé — Consultorio Médico. Todos los derechos reservados.',
  pointersUrl: 'https://pointers.marketing'
} as const;

export const clinicContact = {
  phone: '+51994708033',
  phoneDisplay: '+51 994 708 033',
  whatsapp: '51994708033',
  email: 'contacto@magrasslagree.pe',
  address: 'Arequipa, Perú',
  city: 'Arequipa',
  country: 'Perú',
  mapsUrl: 'https://maps.google.com/?q=Magrass+LaGre%C3%A9+Arequipa,+Peru',
  instagramUrl: 'https://www.instagram.com/',
  schedule: {
    weekdays: 'Lunes a Sábado: Con cita previa',
    saturday: 'Atención personalizada por agenda',
    sunday: 'Domingo: Cerrado'
  }
} as const;

export const clinicNav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Tratamientos', href: '#tratamientos' },
  { label: 'Casos Clínicos', href: '#casos' },
  { label: 'Especialistas', href: '#especialistas' },
  { label: 'Ubicación', href: '#ubicacion' }
] as const;

export const clinicHome = {
  hero: {
    badge: 'Centro Médico Estético en Arequipa',
    title: 'Resultados reales y naturales',
    titleAccent: 'sin pasar por quirófano',
    subtitle:
      'Protocolos médicos personalizados con tecnología no invasiva de última generación. Evaluación 360° para potenciar tu belleza y bienestar.',
    primaryCta: 'Agendar Diagnóstico por WhatsApp',
    secondaryCta: 'Ver Tratamientos',
    trustBadges: [
      'Atención Médica Especializada',
      'Tecnología y Aparatología Médica',
      'Resultados Progresivos y Seguros'
    ]
  },
  treatments: {
    title: 'Servicios clave',
    subtitle: 'Protocolos médico-estéticos faciales y corporales con enfoque clínico, seguridad y resultados naturales.'
  },
  process: {
    title: 'Método Diagnóstico 360°',
    subtitle: 'Un recorrido médico claro, seguro y personalizado desde la evaluación hasta el resultado.',
    steps: [
      {
        step: '01',
        title: 'Escucha Activa y Diagnóstico 360°',
        description:
          'Evaluación médica personalizada para entender las necesidades de tu piel o cuerpo.'
      },
      {
        step: '02',
        title: 'Plan y Técnica Combinada',
        description: 'Aplicación de aparatología médica y principios activos certificados.'
      },
      {
        step: '03',
        title: 'Seguimiento y Resultados',
        description: 'Acompañamiento continuo para garantizar cambios visibles y duraderos.'
      }
    ]
  },
  cases: {
    title: 'Casos Clínicos',
    subtitle: 'Casos reales atendidos por nuestro equipo médico.'
  },
  team: {
    title: 'Atención guiada por profesionales de la salud',
    description:
      'En Magrass LaGreé combinamos medicina estética, tecnología avanzada y un ambiente clínico seguro. Cada protocolo es supervisado por especialistas que priorizan tu salud, tu comodidad y resultados progresivos con un trato cercano y personalizado.'
  },
  location: {
    title: 'Ubicación y Sedes',
    ctaMaps: '¿Cómo llegar?',
    ctaBook: 'Agendar en la sede'
  },
  beforeAfter: {
    before: '/magrass-lagree/before-after-before.webp',
    after: '/magrass-lagree/before-after-after.webp',
    width: 1200,
    height: 700
  }
} as const;

export type MagrassTreatment = {
  id: string;
  title: string;
  description: string;
};

export const keyTreatments: MagrassTreatment[] = [
  {
    id: 'criolipolisis',
    title: 'Criolipólisis 360°',
    description:
      'Reducción no invasiva de grasa localizada mediante frío controlado, sin dolor ni tiempo de recuperación.'
  },
  {
    id: 'peptonas',
    title: 'Peptonas & Firmeza de Glúteos',
    description:
      'Estimulación y aumento de masa muscular para tonificar y levantar glúteos combinada con aparatología.'
  },
  {
    id: 'armonizacion',
    title: 'Armonización Facial & Ácido Hialurónico',
    description:
      'Perfilado de labios, mentón y ángulo mandibular respetando la simetría y naturalidad de tu rostro.'
  },
  {
    id: 'botox',
    title: 'Toxina Botulínica (Botox)',
    description:
      'Atenuación y prevención efectiva de líneas de expresión en frente, entrecejo y patas de gallo.'
  },
  {
    id: 'hydrafacial',
    title: 'Limpieza Facial Médica & Hydrafacial',
    description:
      'Desintoxicación profunda, extracción de impurezas, hidratación intensiva y glow inmediato.'
  },
  {
    id: 'pb-serum',
    title: 'Enzimas PB Serum & Reductores',
    description:
      'Tratamiento focalizado para eliminar adiposidad rebelde, flacidez y celulitis con acción tensora.'
  }
];

export const clinicWhatsApp = {
  defaultMessage:
    'Hola, me gustaría agendar un diagnóstico en Magrass LaGreé — Consultorio Médico Estético en Arequipa.'
} as const;
