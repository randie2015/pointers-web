const sharp = require('sharp');
const { join } = require('path');

const source =
  'C:/Users/user/.cursor/projects/d-pointers-Pointers-web/assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_4be344b92b176d6186561bdcfbd113b5_images_mossad.png_-3e164df0-624c-4f74-9d19-f57de1cf12da.png';
const output = join(process.cwd(), 'public/brands/mossad.png');

async function fixMossadLogo() {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Remove white/gray halos from the cutout; keep only solid black strokes.
  const fringeThreshold = 140;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const lum = Math.max(r, g, b);

    if (a < 8 || lum > fringeThreshold) {
      data[i + 3] = 0;
      continue;
    }

    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 255;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`Mossad logo fixed -> ${output}`);
}

fixMossadLogo().catch(console.error);
