/**
 * Pack de medios reutilizable para demos dentales Drop & Run.
 * Banco por defecto: `public/demo-packs/dentist/media`
 * (logo ensayo, doctor, hero video/poster, before/after, servicios).
 */
export const DENTIST_MEDIA_PACK = {
  root: '/demo-packs/dentist/media',
  logo: '/demo-packs/dentist/logo-ensayo.png',
  logoMark: '/demo-packs/dentist/logo-ensayo.png',
  doctorPhoto: '/demo-packs/dentist/media/doctor.jpg',
  heroVideo: '/demo-packs/dentist/media/hero-video.mp4',
  heroVideoWebm: '/demo-packs/dentist/media/hero-video.webm',
  heroPoster: '/demo-packs/dentist/media/hero-poster.webp',
  beforeAfter: {
    before: '/demo-packs/dentist/media/before-after-before.webp',
    after: '/demo-packs/dentist/media/before-after-after.webp',
    width: 1200,
    height: 600
  },
  services: {
    estetica: '/demo-packs/dentist/media/services/estetica.webp',
    blanqueamiento: '/demo-packs/dentist/media/services/blanqueamiento.jpg',
    rehabilitacion: '/demo-packs/dentist/media/services/rehabilitacion.jpg',
    armonizacion: '/demo-packs/dentist/media/services/armonizacion.jpg',
    implantes: '/demo-packs/dentist/media/services/implantes.webp',
    integral: '/demo-packs/dentist/media/services/integral.webp',
    ortodoncia: '/demo-packs/dentist/media/services/ortodoncia.webp'
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
