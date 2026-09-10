import type { ISourceOptions } from 'tsparticles-engine';

const NODE = '#E2E8F0';
const LINK = '#94A3B8';
const ACCENT = '#BC2656';

const SITE = {
  mobile: 42,
  desktop: 68,
  linkDistance: { mobile: 108, desktop: 132 },
  linkOpacity: { min: 0.04, max: 0.12 },
  particleOpacity: { min: 0.08, max: 0.28 },
  size: { mobile: [0.6, 1.6] as const, desktop: [0.7, 1.8] as const },
  speed: { mobile: [0.12, 0.38] as const, desktop: [0.14, 0.42] as const }
};

export function createSiteParticlesOptions(isMobile: boolean): ISourceOptions {
  const cfg = SITE;

  return {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: { value: 'transparent' } },
    fpsLimit: 45,
    detectRetina: true,
    particles: {
      number: {
        value: isMobile ? cfg.mobile : cfg.desktop,
        density: { enable: false }
      },
      color: { value: [NODE, ACCENT] },
      opacity: {
        value: cfg.particleOpacity,
        random: true,
        animation: {
          enable: true,
          speed: 0.25,
          minimumValue: cfg.particleOpacity.min,
          sync: false
        }
      },
      size: {
        value: {
          min: isMobile ? cfg.size.mobile[0] : cfg.size.desktop[0],
          max: isMobile ? cfg.size.mobile[1] : cfg.size.desktop[1]
        },
        random: true
      },
      links: {
        enable: true,
        color: LINK,
        opacity: cfg.linkOpacity,
        distance: isMobile ? cfg.linkDistance.mobile : cfg.linkDistance.desktop,
        width: 0.6
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
        onClick: { enable: false, mode: 'repulse' },
        resize: true
      },
      modes: {
        repulse: {
          distance: isMobile ? 70 : 90,
          duration: 0.4,
          factor: 0.45,
          speed: 0.55,
          maxSpeed: 18,
          easing: 'ease-out-quad'
        }
      }
    }
  };
}
