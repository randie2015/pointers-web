import type { Engine } from 'tsparticles-engine';
import { loadBasic } from 'tsparticles-basic';
import { loadExternalRepulseInteraction } from 'tsparticles-interaction-external-repulse';

let loaded = false;

/** Minimal tsparticles bundle: base movers + pointer/touch repulse. */
export async function loadHeroParticlesEngine(engine: Engine) {
  if (loaded) return;
  await loadBasic(engine, false);
  await loadExternalRepulseInteraction(engine, false);
  await engine.refresh();
  loaded = true;
}
