/**
 * Generates the branded Pointers QR (rounded modules + center dog mark + gray frame).
 * Run: npm run generate:qr
 */
const fs = require('fs');
const path = require('path');
const nodeCanvas = require('canvas');
const { createCanvas, loadImage } = nodeCanvas;
const { JSDOM } = require('jsdom');
const QRCodeStyling = require('qr-code-styling');

const ROOT = path.join(__dirname, '..');
const BRAND_DIR = path.join(ROOT, 'public', 'brand');
const DOG_SVG = path.join(BRAND_DIR, 'dog-mark.svg');
const DOG_PNG = path.join(BRAND_DIR, 'dog-mark.png');
const OUT_PNG = path.join(BRAND_DIR, 'qr-pointers.png');
const OUT_SVG = path.join(BRAND_DIR, 'qr-pointers.svg');

const QR_URL = 'https://www.pointers.marketing';
const QR_SIZE = 2048;
const FRAME_COLOR = '#E8EAED';
const FRAME_RADIUS = 72;
const FRAME_PADDING = 96;

async function svgToPng(svgPath, pngPath, size = 512) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  const img = await loadImage(dataUrl);
  const canvas = createCanvas(size, Math.round((size * img.height) / img.width));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  fs.writeFileSync(pngPath, canvas.toBuffer('image/png'));
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createQrOptions(type) {
  return {
    jsdom: JSDOM,
    nodeCanvas,
    width: type === 'png' ? QR_SIZE : 1024,
    height: type === 'png' ? QR_SIZE : 1024,
    type,
    data: QR_URL,
    margin: 8,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'H'
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.26,
      margin: 14,
      crossOrigin: 'anonymous'
    },
    dotsOptions: {
      type: 'extra-rounded',
      color: '#000000'
    },
    backgroundOptions: {
      color: '#ffffff'
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: '#000000'
    },
    cornersDotOptions: {
      type: 'dot',
      color: '#000000'
    },
    image: DOG_PNG
  };
}

async function addFrame(qrPngBuffer) {
  const qrImage = await loadImage(qrPngBuffer);
  const inner = QR_SIZE;
  const outer = inner + FRAME_PADDING * 2;
  const canvas = createCanvas(outer, outer);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = FRAME_COLOR;
  roundedRect(ctx, 0, 0, outer, outer, FRAME_RADIUS);
  ctx.fill();

  const inset = FRAME_PADDING;
  ctx.fillStyle = '#ffffff';
  roundedRect(ctx, inset, inset, inner, inner, FRAME_RADIUS - 16);
  ctx.fill();

  ctx.drawImage(qrImage, inset, inset, inner, inner);
  return canvas.toBuffer('image/png');
}

async function bufferFromRaw(raw) {
  if (Buffer.isBuffer(raw)) return raw;
  if (raw instanceof ArrayBuffer) return Buffer.from(raw);
  if (typeof raw?.arrayBuffer === 'function') {
    const ab = await raw.arrayBuffer();
    return Buffer.from(ab);
  }
  return Buffer.from(raw);
}

async function main() {
  if (!fs.existsSync(BRAND_DIR)) fs.mkdirSync(BRAND_DIR, { recursive: true });

  await svgToPng(DOG_SVG, DOG_PNG, 640);

  const qr = new QRCodeStyling(createQrOptions('canvas'));
  const qrPng = await bufferFromRaw(await qr.getRawData('png'));
  const framed = await addFrame(qrPng);
  fs.writeFileSync(OUT_PNG, framed);

  const qrSvg = new QRCodeStyling(createQrOptions('svg'));
  const svgRaw = await qrSvg.getRawData('svg');
  const svgBuffer = await bufferFromRaw(svgRaw);
  fs.writeFileSync(OUT_SVG, svgBuffer);

  console.log(`QR generated for ${QR_URL}`);
  console.log(`  PNG: ${OUT_PNG}`);
  console.log(`  SVG: ${OUT_SVG}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
