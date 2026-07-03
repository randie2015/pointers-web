/**
 * Regenerates favicon assets with exact brand background #BC2656.
 * Run: npm run generate:favicons
 */
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const ROOT = path.join(__dirname, '..');
const SOURCE_SVG = path.join(ROOT, 'public', 'brand', 'favicon-source.svg');
const PUBLIC = path.join(ROOT, 'public');
const BRAND_HEX = '#BC2656';
const BRAND_RGB = { r: 188, g: 38, b: 86 };

const OUTPUTS = [
  { file: 'icon-512.png', size: 512 },
  { file: 'icon-192.png', size: 192 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon.png', size: 32 }
];

async function renderSvgToPng(svgPath, outPath, size) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  const img = await loadImage(dataUrl);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, size, size);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
}

function writeFaviconIco(png32Path, icoPath) {
  const pngBuffer = fs.readFileSync(png32Path);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  fs.writeFileSync(icoPath, Buffer.concat([header, entry, pngBuffer]));
}

async function verifyBrandColor(pngPath) {
  const img = await loadImage(pngPath);
  const canvas = createCanvas(1, 1);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 24, 24, 1, 1, 0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return {
    r,
    g,
    b,
    hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
    ok: r === BRAND_RGB.r && g === BRAND_RGB.g && b === BRAND_RGB.b
  };
}

async function main() {
  for (const { file, size } of OUTPUTS) {
    await renderSvgToPng(SOURCE_SVG, path.join(PUBLIC, file), size);
    console.log(`  ${file} (${size}x${size})`);
  }

  writeFaviconIco(path.join(PUBLIC, 'icon.png'), path.join(PUBLIC, 'favicon.ico'));
  console.log('  favicon.ico (32x32)');

  const sample = await verifyBrandColor(path.join(PUBLIC, 'icon-512.png'));
  console.log(`\nBackground pixel: ${sample.hex} — ${sample.ok ? 'OK' : 'MISMATCH'}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
