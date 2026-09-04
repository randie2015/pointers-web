import { defineDemo } from '@/lib/clinic-demo/define-demo';

/**
 * Clon aesthetic de prueba Drop & Run.
 * Inputs mínimos: nombre, 2 HEX, logo, 4 servicios.
 * Media por defecto = pack Magrass (videos + fotos reutilizables).
 */
export default defineDemo({
  slug: 'spa-ensayo',
  preset: 'aesthetic',
  name: 'Spa Ensayo',
  colors: {
    primary: '#1B3A4B',
    accent: '#D4A574'
  },
  logo: '/demo-packs/aesthetic/logo-ensayo.png',
  expiresAt: '2026-10-04T23:59:00-05:00',
  tagline: 'Medicina Estética',
  subbrand: 'Ensayo Aesthetic',
  city: 'Arequipa',
  services: [
    {
      title: 'Armonización Facial',
      shortDescription: 'Perfilado natural con ácido hialurónico y criterio médico.'
    },
    {
      title: 'Criolipólisis Corporal',
      shortDescription: 'Reducción de grasa localizada sin cirugía ni recuperación.'
    },
    {
      title: 'Bioestimulación Dérmica',
      shortDescription: 'Firmeza y luminosidad progresiva con colágeno estimulado.'
    },
    {
      title: 'Hydrafacial Médico',
      shortDescription: 'Limpieza profunda, hidratación intensiva y glow inmediato.'
    }
  ]
});
