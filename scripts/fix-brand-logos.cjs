const sharp = require('sharp');
const { join } = require('path');

const BRANDS_DIR = join(process.cwd(), 'public', 'brands');

async function removeBlackBackground(filename, { threshold = 26, soften = 18, boost = 1 } = {}) {
  const input = join(BRANDS_DIR, filename);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = Math.max(r, g, b);

    if (lum <= threshold) {
      data[i + 3] = 0;
      continue;
    }

    if (boost !== 1) {
      data[i] = Math.min(255, Math.round(r * boost));
      data[i + 1] = Math.min(255, Math.round(g * boost));
      data[i + 2] = Math.min(255, Math.round(b * boost));
    }

    if (lum <= threshold + soften) {
      const t = (lum - threshold) / soften;
      data[i + 3] = Math.round(255 * t);
    } else {
      data[i + 3] = 255;
    }
  }

  const output = input.replace('.png', '-transparent.png');
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`Fixed ${filename} -> ${output} (${info.width}x${info.height})`);
  return output;
}

(async () => {
  const mossad = await removeBlackBackground('mossad.png', { threshold: 24, soften: 20, boost: 1.15 });
  const vezzanti = await removeBlackBackground('vezzanti.png', { threshold: 26, soften: 18, boost: 1.85 });
  console.log('Done:', mossad, vezzanti);
})();
