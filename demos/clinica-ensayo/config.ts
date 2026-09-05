import { defineDemo } from '@/lib/clinic-demo/define-demo';

/**
 * Clon dental de prueba Drop & Run.
 * Inputs mínimos: nombre, 2 HEX, logo, 4 servicios.
 * Media por defecto = DENTIST_MEDIA_PACK (videos + fotos reutilizables).
 */
export default defineDemo({
  slug: 'clinica-ensayo',
  preset: 'dentist',
  name: 'Clínica Ensayo',
  colors: {
    primary: '#0F766E',
    accent: '#D4A373'
  },
  logo: '/demo-packs/dentist/logo-ensayo.png',
  expiresAt: '2026-10-04T23:59:00-05:00',
  tagline: 'Odontología Integral',
  subbrand: 'Ensayo Dental',
  city: 'Arequipa',
  services: [
    {
      title: 'Ortodoncia Invisible',
      shortDescription: 'Alineadores claros con seguimiento digital mensual.'
    },
    {
      title: 'Blanqueamiento Profesional',
      shortDescription: 'Luminosidad controlada en una sola sesión clínica.'
    },
    {
      title: 'Implantes Dentales',
      shortDescription: 'Reposición fija con planificación 3D y carga segura.'
    },
    {
      title: 'Estética con Carillas',
      shortDescription: 'Diseño de sonrisa natural con mínima intervención.'
    }
  ]
});
