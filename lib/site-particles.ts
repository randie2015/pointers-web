import type { ISourceOptions } from 'tsparticles-engine';

const MAGENTA = '#BC2656';
const MAGENTA_LIGHT = '#D4366F';
const MAGENTA_DEEP = '#8E1D45';
const MAGENTA_GLOW = '#E85A8A';
const VIOLET = '#5E549D';
const VIOLET_LIGHT = '#7A6FB8';
const VIOLET_DEEP = '#4A4278';

/** Red dispersa de espacio abierto — sin gravedad ni centro de masa. */
const SITE = {
  mobile: 148,
  desktop: 210,
  linkDistance: { mobile: 92, desktop: 112 },
  linkOpacity: { min: 0.1, max: 0.28 },
  particleOpacity: { min: 0.12, max: 0.58 },
  size: { mobile: [1.1, 3.8] as const, desktop: [1.2, 4.4] as const },
  speed: { mobile: [0.55, 1.75] as const, desktop: [0.6, 2] as const }
};

export function createSiteParticlesOptions(isMobile: boolean): ISourceOptions {
  const cfg = SITE;
  const colors = [MAGENTA, MAGENTA_LIGHT, MAGENTA_DEEP, MAGENTA_GLOW, VIOLET, VIOLET_LIGHT, VIOLET_DEEP];

  return {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: {
        value: isMobile ? cfg.mobile : cfg.desktop,
        density: { enable: false }
      },
      color: { value: colors },
      opacity: {
        value: cfg.particleOpacity,
        random: true,
        animation: {
          enable: true,
          speed: 0.7,
          minimumValue: cfg.particleOpacity.min,
          sync: false
        }
      },
      size: {
        value: {
          min: isMobile ? cfg.size.mobile[0] : cfg.size.desktop[0],
          max: isMobile ? cfg.size.mobile[1] : cfg.size.desktop[1]
        },
        random: true,
        animation: {
          enable: true,
          speed: 0.9,
          minimumValue: 0.6,
          sync: false
        }
      },
      links: {
        enable: true,
        color: [MAGENTA, MAGENTA_LIGHT, VIOLET, VIOLET_LIGHT],
        opacity: cfg.linkOpacity,
        distance: isMobile ? cfg.linkDistance.mobile : cfg.linkDistance.desktop,
        width: 0.9
      },
      move: {
        enable: true,
        speed: {
          min: isMobile ? cfg.speed.mobile[0] : cfg.speed.desktop[0],
          max: isMobile ? cfg.speed.mobile[1] : cfg.speed.desktop[1]
        },
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
        attract: { enable: false }
      }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: !isMobile,
          mode: 'repulse',
          parallax: { enable: false, force: 0, smooth: 0 }
        },
        onClick: { enable: true, mode: 'repulse' },
        resize: true
      },
      modes: {
        repulse: {
          distance: isMobile ? 100 : 125,
          duration: 0.75,
          factor: 0.8,
          speed: 0.95,
          maxSpeed: 40,
          easing: 'ease-out-quad'
        }
      }
    }
  };
}
