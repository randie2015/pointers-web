import type { Container, ISourceOptions } from 'tsparticles-engine';

const MAGENTA = '#BC2656';

/** Fluid particles drawn inward to a magenta void at center. */
export const heroParticlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: 72,
      density: { enable: true, value_area: 520 }
    },
    color: { value: ['#ffffff', MAGENTA, '#2a2a2a'] },
    opacity: {
      value: { min: 0.08, max: 0.42 },
      animation: {
        enable: true,
        speed: 0.6,
        minimumValue: 0.06,
        sync: false
      }
    },
    size: {
      value: { min: 1, max: 3.2 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.8,
        sync: false
      }
    },
    links: { enable: false },
    move: {
      enable: true,
      speed: { min: 0.4, max: 1.6 },
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
      attract: {
        enable: true,
        rotate: { x: 800, y: 1600 }
      }
    }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'attract',
        parallax: { enable: false, force: 0, smooth: 0 }
      },
      resize: true
    },
    modes: {
      attract: {
        distance: 480,
        duration: 0.35,
        easing: 'ease-out-quad',
        factor: 4.5,
        maxSpeed: 55
      }
    }
  }
};

export function bindCenterAttractor(container: Container): () => void {
  const update = () => {
    const { width, height } = container.canvas.size;
    container.interactivity.mouse.position = { x: width / 2, y: height / 2 };
    container.interactivity.status = 'pointermove';
  };

  update();
  const interval = window.setInterval(update, 50);
  window.addEventListener('resize', update);

  return () => {
    window.clearInterval(interval);
    window.removeEventListener('resize', update);
  };
}
