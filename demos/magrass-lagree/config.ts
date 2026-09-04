import { defineDemo } from '@/lib/clinic-demo/define-demo';
import { AESTHETIC_MEDIA_PACK } from '@/lib/clinic-demo/media-packs';

/** Migración Drop & Run de Magrass LaGreé (contenido completo preservado). */
export default defineDemo({
  slug: 'magrass-lagree',
  preset: 'aesthetic',
  name: 'Magrass LaGreé',
  colors: {
    primary: '#192031',
    accent: '#C5A57D'
  },
  logo: '/demo-packs/aesthetic/logo-magrass.png',
  expiresAt: '2027-12-31T23:59:00-05:00',
  tagline: 'Consultorio Médico Estético',
  subbrand: 'Consultorio Médico',
  city: 'Arequipa',
  address: 'Arequipa, Perú',
  email: 'contacto@magrasslagree.pe',
  mapsUrl: 'https://maps.google.com/?q=Magrass+LaGre%C3%A9+Arequipa,+Peru',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Magrass+LaGre%C3%A9+Arequipa,+Peru&output=embed',
  assets: {
    logoMark: '/demo-packs/aesthetic/logo-magrass.png',
    heroVideo: AESTHETIC_MEDIA_PACK.heroVideo,
    heroPoster: AESTHETIC_MEDIA_PACK.heroPoster,
    beforeAfter: { ...AESTHETIC_MEDIA_PACK.beforeAfter }
  },
  services: [
    {
      title: 'Armonización Facial & Ácido Hialurónico',
      shortDescription: 'Perfilado natural de labios, mentón y ángulo mandibular con simetría clínica.',
      category: 'facial',
      badge: 'FACIAL',
      anchor: 'armonizacion-facial',
      image: AESTHETIC_MEDIA_PACK.treatments.armonizacion,
      expectedResults: 'Contorno definido, volumen equilibrado y armonía visible desde la primera sesión.'
    },
    {
      title: 'Criolipólisis 360°',
      shortDescription: 'Reducción no invasiva de grasa localizada con frío controlado y sin recuperación.',
      category: 'corporal',
      badge: 'CORPORAL',
      anchor: 'criolipolisis',
      image: AESTHETIC_MEDIA_PACK.treatments.criolipolisis,
      expectedResults: 'Reducción progresiva de adiposidad localizada y silueta más armónica.'
    },
    {
      title: 'Bioestimuladores de Colágeno',
      shortDescription: 'Rejuvenecimiento progresivo con firmeza, luminosidad y calidad dérmica mejorada.',
      category: 'rejuvenecimiento',
      badge: 'ANTIAGE',
      anchor: 'bioestimuladores',
      image: AESTHETIC_MEDIA_PACK.treatments.bioestimuladores,
      expectedResults: 'Piel más tersa, luminosa y rejuvenecida con resultados progresivos y duraderos.'
    },
    {
      title: 'Limpieza Médica & Hydrafacial',
      shortDescription: 'Desintoxicación profunda, hidratación intensiva y glow inmediato con enfoque clínico.',
      category: 'facial',
      badge: 'FACIAL',
      anchor: 'hydrafacial',
      image: AESTHETIC_MEDIA_PACK.treatments.hydrafacial,
      expectedResults: 'Piel luminosa, poros refinados e hidratación visible desde la primera visita.'
    }
  ],
  content: {
    disclaimer: '© Magrass LaGreé — Consultorio Médico. Todos los derechos reservados.',
    footerBlurb:
      'Consultorio médico estético en Arequipa. Resultados naturales con protocolos no invasivos y atención especializada.',
    schedule: {
      weekdays: 'Lunes a Sábado: Atención previa cita',
      saturday: 'Agenda personalizada según disponibilidad',
      sunday: 'Domingo: Cerrado'
    },
    hero: {
      badge: 'Centro Médico Estético en Arequipa',
      title: 'Medicina Estética de Precisión y Cuidado Integral',
      subtitle: 'Resultados naturales respaldados por rigor médico y tecnología de vanguardia.',
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
      title: 'Horarios & Sede',
      subtitle: 'Atención médica personalizada en Arequipa con agenda previa.',
      cta: 'Ver ubicación completa'
    },
    ctaZone: {
      eyebrow: 'Valoración médica & resultados',
      title: '¿Quieres comprobar la efectividad de nuestros tratamientos antes de agendar?',
      casesCta: 'Ver casos clínicos',
      whatsappCta: 'Evaluar mi caso por WhatsApp'
    },
    testimonials: {
      eyebrow: 'EXPERIENCIAS REALES',
      title: 'Resultados que transforman la confianza médica y estética',
      items: [
        {
          id: 'valeria-m',
          treatment: 'Armonización Facial & Labios',
          quote:
            'Buscaba un resultado súper natural y cero exagerado. La evaluación previa me dio muchísima seguridad; el perfilado de labios quedó impecable.',
          patientName: 'Valeria M.',
          patientMeta: 'Paciente verificada · Sede Arequipa'
        },
        {
          id: 'claudia-r',
          treatment: 'Criolipólisis 360°',
          quote:
            'Reduje medidas en la zona abdominal sin dolor ni tiempo de recuperación. La aparatología médica y el seguimiento del equipo fueron de primer nivel.',
          patientName: 'Claudia R.',
          patientMeta: 'Paciente verificada · Sede Arequipa'
        },
        {
          id: 'luciana-g',
          treatment: 'Hydrafacial & Bioestimuladores',
          quote:
            'Mi piel recuperó una luminosidad increíble desde la primera sesión. La atención boutique y el trato personalizado marcan toda la diferencia.',
          patientName: 'Luciana G.',
          patientMeta: 'Paciente verificada · Sede Arequipa'
        }
      ]
    },
    closing: {
      title: '¿Lista para iniciar tu cambio?',
      subtitle: 'Agenda tu evaluación médica y recibe orientación directa por WhatsApp.',
      cta: 'Agendar Diagnóstico Personalizado'
    },
    treatmentsPage: {
      title: 'Tratamientos Médico-Estéticos',
      subtitle:
        'Protocolos faciales, corporales y de rejuvenecimiento con enfoque clínico, seguridad y resultados naturales.'
    },
    featuredTreatments: [
      {
        id: 'armonizacion',
        anchor: 'armonizacion-facial',
        badge: 'FACIAL',
        title: 'Armonización Facial & Ácido Hialurónico',
        description: 'Perfilado natural de labios, mentón y ángulo mandibular con simetría clínica.',
        image: AESTHETIC_MEDIA_PACK.treatments.armonizacion
      },
      {
        id: 'criolipolisis',
        anchor: 'criolipolisis',
        badge: 'CORPORAL',
        title: 'Criolipólisis 360°',
        description: 'Reducción no invasiva de grasa localizada con frío controlado y sin recuperación.',
        image: AESTHETIC_MEDIA_PACK.treatments.criolipolisis
      },
      {
        id: 'bioestimuladores',
        anchor: 'bioestimuladores',
        badge: 'ANTIAGE',
        title: 'Bioestimuladores de Colágeno',
        description: 'Rejuvenecimiento progresivo con firmeza, luminosidad y calidad dérmica mejorada.',
        image: AESTHETIC_MEDIA_PACK.treatments.bioestimuladores
      },
      {
        id: 'hydrafacial',
        anchor: 'hydrafacial',
        badge: 'FACIAL',
        title: 'Limpieza Médica & Hydrafacial',
        description: 'Desintoxicación profunda, hidratación intensiva y glow inmediato con enfoque clínico.',
        image: AESTHETIC_MEDIA_PACK.treatments.hydrafacial
      },
      {
        id: 'peptonas',
        anchor: 'peptonas',
        badge: 'CORPORAL',
        title: 'Peptonas & Firmeza de Glúteos',
        description: 'Tonificación y levantamiento glúteo con estimulación muscular y aparatología médica.',
        image: AESTHETIC_MEDIA_PACK.treatments.peptonas
      },
      {
        id: 'enzimas',
        anchor: 'enzimas',
        badge: 'CORPORAL',
        title: 'Enzimas PB Serum & Reductores',
        description: 'Tratamiento focalizado para adiposidad rebelde, flacidez y celulitis con acción tensora.',
        image: AESTHETIC_MEDIA_PACK.treatments.enzimas
      }
    ],
    treatments: [
      {
        id: 'armonizacion',
        anchor: 'armonizacion-facial',
        category: 'facial',
        title: 'Armonización Facial & Ácido Hialurónico',
        description:
          'Perfilado de labios, mentón y ángulo mandibular respetando simetría y naturalidad facial.',
        expectedResults: 'Contorno definido, volumen equilibrado y armonía visible desde la primera sesión.',
        image: AESTHETIC_MEDIA_PACK.treatments.armonizacion
      },
      {
        id: 'botox',
        anchor: 'botox',
        category: 'facial',
        title: 'Toxina Botulínica (Botox)',
        description:
          'Atenuación y prevención de líneas de expresión en frente, entrecejo y patas de gallo.',
        expectedResults: 'Expresión más descansada, piel lisa y prevención del envejecimiento dinámico.',
        image: AESTHETIC_MEDIA_PACK.treatments.botox
      },
      {
        id: 'hydrafacial',
        anchor: 'hydrafacial',
        category: 'facial',
        title: 'Limpieza Facial Médica & Hydrafacial',
        description:
          'Desintoxicación profunda, extracción de impurezas e hidratación intensiva con glow inmediato.',
        expectedResults: 'Piel luminosa, poros refinados e hidratación visible desde la primera visita.',
        image: AESTHETIC_MEDIA_PACK.treatments.hydrafacial
      },
      {
        id: 'criolipolisis',
        anchor: 'criolipolisis',
        category: 'corporal',
        title: 'Criolipólisis 360°',
        description:
          'Reducción no invasiva de grasa localizada mediante frío controlado, sin dolor ni recuperación.',
        expectedResults: 'Reducción progresiva de adiposidad localizada y silueta más armónica.',
        image: AESTHETIC_MEDIA_PACK.treatments.criolipolisis
      },
      {
        id: 'peptonas',
        anchor: 'peptonas',
        category: 'corporal',
        title: 'Peptonas & Firmeza de Glúteos',
        description:
          'Estimulación muscular para tonificar y levantar glúteos combinada con aparatología médica.',
        expectedResults: 'Mayor firmeza, tono muscular mejorado y contorno glúteo más definido.',
        image: AESTHETIC_MEDIA_PACK.treatments.peptonas
      },
      {
        id: 'pb-serum',
        anchor: 'enzimas',
        category: 'corporal',
        title: 'Enzimas PB Serum & Reductores',
        description:
          'Tratamiento focalizado para adiposidad rebelde, flacidez y celulitis con acción tensora.',
        expectedResults: 'Piel más firme, textura uniforme y reducción visible de volumen localizado.',
        image: AESTHETIC_MEDIA_PACK.treatments.enzimas
      },
      {
        id: 'bioestimuladores',
        anchor: 'bioestimuladores',
        category: 'rejuvenecimiento',
        title: 'Bioestimuladores de Colágeno',
        description:
          'Estimulación dérmica profunda para recuperar firmeza, elasticidad y calidad de la piel.',
        expectedResults: 'Piel más tersa, luminosa y rejuvenecida con resultados progresivos y duraderos.',
        image: AESTHETIC_MEDIA_PACK.treatments.bioestimuladores
      },
      {
        id: 'peelings',
        anchor: 'peelings',
        category: 'rejuvenecimiento',
        title: 'Peelings Médicos & Dermapen',
        description:
          'Renovación celular controlada para mejorar textura, manchas y signos tempranos de envejecimiento.',
        expectedResults: 'Tono más uniforme, textura refinada y aspecto renovado en pocas sesiones.',
        image: AESTHETIC_MEDIA_PACK.treatments.peelings
      },
      {
        id: 'iluminacion',
        anchor: 'iluminacion',
        category: 'rejuvenecimiento',
        title: 'Iluminación & Uniformidad de Tono (Glow / Manchas)',
        description:
          'Protocolos médicos para recuperar luminosidad, vitalidad y homogeneidad del cutis.',
        expectedResults: 'Rostro más radiante, manchas atenuadas y piel con glow saludable.',
        image: AESTHETIC_MEDIA_PACK.treatments.iluminacion
      }
    ],
    clinicalCases: [
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
    casesPage: {
      title: 'Resultados Clínicos Reales',
      subtitle: 'Evolución y transformación documentada bajo seguimiento médico estricto.',
      cta: 'Evaluar mi caso por WhatsApp'
    },
    specialists: [
      {
        id: 'elena-vargas',
        name: 'Dra. Elena Vargas',
        role: 'Directora Médica & Estética Facial',
        specialty: 'Armonización Facial, Toxina Botulínica y Bioestimuladores',
        badge: 'CMP 74829',
        image: AESTHETIC_MEDIA_PACK.specialists.doctora1
      },
      {
        id: 'gabriel-torres',
        name: 'Dr. Gabriel Torres',
        role: 'Médico Especialista en Contorno Corporal',
        specialty: 'Criolipólisis 360°, Enzimas PB Serum y Lipoescultura No Invasiva',
        badge: 'CMP 81204',
        image: AESTHETIC_MEDIA_PACK.specialists.doctor2
      },
      {
        id: 'lucia-mendoza',
        name: 'Dra. Lucía Mendoza',
        role: 'Dermatología Estética & Láser',
        specialty: 'Protocolos Hydrafacial, Despigmentación y Rejuvenecimiento Cutáneo',
        badge: 'CMP 69315',
        image: AESTHETIC_MEDIA_PACK.specialists.doctora3
      },
      {
        id: 'camila-morales',
        name: 'Dra. Camila Morales',
        role: 'Medicina Regenerativa & Antienvejecimiento',
        specialty: 'Peptonas, Sueroterapia Endovenosa y Nutrición Celular',
        badge: 'CMP 85490',
        image: AESTHETIC_MEDIA_PACK.specialists.doctora4
      }
    ],
    specialistsPage: {
      title: 'Dirección Médica & Especialistas',
      subtitle: 'Profesionales dedicados a realzar tu belleza preservando tu salud.',
      cta: 'Hablar con un asesor médico'
    },
    locationPage: {
      title: 'Nuestra Sede',
      subtitle: 'Visítanos en Arequipa con atención médica personalizada y agenda previa.',
      ctaMaps: 'Ver en Google Maps',
      ctaBook: 'Solicitar Ubicación y Cita en Sede'
    }
  }
});
