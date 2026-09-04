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

/**
 * Pack de medios reutilizable para demos aesthetic Drop & Run.
 * Origen: assets de Magrass LaGreé.
 * NO eliminar `public/magrass-lagree` — se usa como banco por defecto
 * (hero video/poster, before/after, tratamientos, especialistas).
 */
export const AESTHETIC_MEDIA_PACK = {
  root: '/magrass-lagree',
  logo: '/magrass-lagree/logo.png',
  logoMark: '/magrass-lagree/logo.png',
  heroVideo: '/magrass-lagree/hero.mp4',
  heroPoster: '/magrass-lagree/hero-poster.webp',
  beforeAfter: {
    before: '/magrass-lagree/before-after-before.jpg',
    after: '/magrass-lagree/before-after-after.jpg',
    width: 824,
    height: 1024
  },
  treatments: {
    armonizacion: '/magrass-lagree/armonizacion-facial.jpg',
    botox: '/magrass-lagree/botox.jpg',
    hydrafacial: '/magrass-lagree/hydrafacial.jpg',
    criolipolisis: '/magrass-lagree/criolipolisis.jpg',
    peptonas: '/magrass-lagree/peptonas.jpg',
    enzimas: '/magrass-lagree/enzimas.jpg',
    bioestimuladores: '/magrass-lagree/bioestimuladores.jpg',
    peelings: '/magrass-lagree/peelings.jpg',
    iluminacion: '/magrass-lagree/iluminacion.jpg'
  },
  specialists: {
    doctora1: '/magrass-lagree/specialists/doctora-1.jpg',
    doctor2: '/magrass-lagree/specialists/doctor-2.jpg',
    doctora3: '/magrass-lagree/specialists/doctora-3.jpg',
    doctora4: '/magrass-lagree/specialists/doctora-4.jpg'
  }
} as const;
