import { defineDemo } from '@/lib/clinic-demo/define-demo';
import { DENTIST_MEDIA_PACK } from '@/lib/clinic-demo/media-packs';

/** Migración Drop & Run de la demo Alejandra (contenido completo preservado). */
export default defineDemo({
  slug: 'alejandracusirramos',
  preset: 'dentist',
  name: 'Dra. Alejandra Cusirramos',
  colors: {
    primary: '#C97D7D',
    accent: '#C5A059'
  },
  logo: '/demo-packs/dentist/logo-alejandra.png',
  expiresAt: '2026-09-18T23:59:00-05:00',
  tagline: 'Odontología Estética',
  subbrand: 'Smile Maker',
  positioning: 'Especialista en Estética Dental',
  doctor: 'Dra. Alejandra Cusirramos',
  usp: 'USP Brasil',
  city: 'Arequipa',
  address: 'Dental Office - Arequipa',
  email: 'recepcion@draalejandracusirramos.pe',
  mapsUrl: 'https://maps.google.com/?q=Dental+Office+Arequipa,+Peru',
  assets: {
    doctorPhoto: DENTIST_MEDIA_PACK.doctorPhoto,
    heroVideo: DENTIST_MEDIA_PACK.heroVideo,
    heroVideoWebm: DENTIST_MEDIA_PACK.heroVideoWebm,
    heroPoster: DENTIST_MEDIA_PACK.heroPoster,
    beforeAfter: { ...DENTIST_MEDIA_PACK.beforeAfter }
  },
  services: [
    {
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
      image: DENTIST_MEDIA_PACK.services.estetica,
      imageAlt: 'Diseño de sonrisa con carillas estéticas de alta precisión'
    },
    {
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
      image: DENTIST_MEDIA_PACK.services.blanqueamiento,
      imageAlt: 'Blanqueamiento dental boutique con protocolo clínico de alta luminosidad'
    },
    {
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
      image: DENTIST_MEDIA_PACK.services.rehabilitacion,
      imageAlt: 'Modelos dentales y planificación de rehabilitación estética de alta precisión'
    },
    {
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
      image: DENTIST_MEDIA_PACK.services.armonizacion,
      imageAlt: 'Alineador transparente para armonización y alineación dental estética'
    }
  ],
  content: {
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
    about: {
      heroTitle: 'Estética dental boutique con precisión clínica',
      heroSubtitle:
        'La Dra. Alejandra Cusirramos combina formación en USP Brasil, sensibilidad estética y tecnología digital para crear sonrisas naturales y sofisticadas.',
      doctorBio:
        'La Dra. Alejandra Cusirramos es especialista en estética dental con formación en la Universidad de São Paulo (USP Brasil). Lidera Smile Maker con un enfoque boutique en diseño de sonrisas, carillas y rehabilitación estética en Arequipa.',
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
      ]
    },
    servicesPage: {
      title: 'Servicios Estrella',
      subtitle: 'Tratamientos de alta gama en diseño de sonrisa, estética y rehabilitación con enfoque boutique.'
    },
    contactPage: {
      title: 'Contacto y Ubicación',
      subtitle: 'Consulta privada en Arequipa. Escríbenos directamente — respuesta inmediata por WhatsApp.',
      callCta: 'Llamar a Recepción',
      whatsappCta: 'Escribir por WhatsApp'
    },
    whatsappMessage:
      'Hola Diego, estuve revisando la demo de la web para la Dra. Alejandra Cusirramos y me gustaría coordinar los detalles finales de la plataforma.'
  }
});
