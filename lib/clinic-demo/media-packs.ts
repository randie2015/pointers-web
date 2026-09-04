/**
 * Pack de medios reutilizable para demos dentales Drop & Run.
 * Origen: assets de Dra. Alejandra Cusirramos.
 * NO eliminar `public/dra-alejandra` — se usa como banco por defecto
 * (logo, doctor, hero video/poster, before/after, servicios).
 */
export const DENTIST_MEDIA_PACK = {
  root: '/dra-alejandra',
  logo: '/dra-alejandra/logo-ae.png',
  logoMark: '/dra-alejandra/logo-ae.png',
  doctorPhoto: '/dra-alejandra/doctor.jpg',
  heroVideo: '/dra-alejandra/hero-video.mp4',
  heroVideoWebm: '/dra-alejandra/hero-video.webm',
  heroPoster: '/dra-alejandra/hero-poster.webp',
  beforeAfter: {
    before: '/dra-alejandra/before-after-before.webp',
    after: '/dra-alejandra/before-after-after.webp',
    width: 1200,
    height: 600
  },
  services: {
    estetica: '/dra-alejandra/services/estetica.webp',
    blanqueamiento: '/dra-alejandra/services/blanqueamiento.jpg',
    rehabilitacion: '/dra-alejandra/services/rehabilitacion.jpg',
    armonizacion: '/dra-alejandra/services/armonizacion.jpg',
    implantes: '/dra-alejandra/services/implantes.webp',
    integral: '/dra-alejandra/services/integral.webp',
    ortodoncia: '/dra-alejandra/services/ortodoncia.webp'
  }
} as const;
