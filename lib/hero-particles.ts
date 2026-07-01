import type { Container, ISourceOptions } from 'tsparticles-engine';

/** Puntos blancos con emisión continua, atraídos al centro (glow magenta). */
export const heroParticlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: {
      value: 100,
      density: { enable: true, value_area: 480 }
    },
    color: { value: '#ffffff' },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: {
        enable: true,
        speed: 0.4,
        minimumValue: 0.05,
        sync: false
      }
    },
    size: {
      value: { min: 1, max: 2.5 }
    },
    links: { enable: false },
    life: {
      count: 0,
      duration: { value: { min: 8, max: 20 } },
      delay: { value: 0 }
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'destroy' },
      attract: {
        enable: true,
        rotate: { x: 600, y: 1200 }
      }
    }
  },
  emitters: {
    autoPlay: true,
    fill: true,
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1
    },
    rate: {
      delay: 0.06,
      quantity: 5
    },
    size: {
      width: 100,
      height: 100,
      mode: 'percent'
    },
    position: {
      x: 50,
      y: 50,
      mode: 'percent'
    },
    particles: {
      color: { value: '#ffffff' },
      opacity: { value: { min: 0.12, max: 0.45 } },
      size: { value: { min: 1, max: 2.5 } },
      move: {
        speed: 0.5,
        outModes: { default: 'destroy' },
        attract: {
          enable: true,
          rotate: { x: 600, y: 1200 }
        }
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
        distance: 600,
        duration: 0.4,
        easing: 'ease-out-quad',
        factor: 3,
        maxSpeed: 40
      }
    }
  },
  detectRetina: true
};

/** Fija el attractor en el centro del canvas (efecto “agujero” hacia el glow). */
export function bindCenterAttractor(container: Container): () => void {
  const update = () => {
    const { width, height } = container.canvas.size;
    container.interactivity.mouse.position = { x: width / 2, y: height / 2 };
    container.interactivity.status = 'pointermove';
  };

  update();
  const interval = window.setInterval(update, 100);
  window.addEventListener('resize', update);

  return () => {
    window.clearInterval(interval);
    window.removeEventListener('resize', update);
  };
}
