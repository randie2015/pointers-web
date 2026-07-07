export const IMAGE_MAX_WIDTH = 1200;
export const IMAGE_COMPRESSION_QUALITY = 0.82;
export const IMAGE_OUTPUT_TYPE = 'image/webp';

export type OptimizeImageOptions = {
  maxWidth?: number;
  quality?: number;
  outputType?: string;
};

function replaceExtension(filename: string, extension: string) {
  const baseName = filename.replace(/\.[^.]+$/, '') || 'cover';
  return `${baseName}.${extension}`;
}

export async function optimizeImageForUpload(
  file: File,
  options: OptimizeImageOptions = {}
) {
  const maxWidth = options.maxWidth ?? IMAGE_MAX_WIDTH;
  const quality = options.quality ?? IMAGE_COMPRESSION_QUALITY;
  const outputType = options.outputType ?? IMAGE_OUTPUT_TYPE;

  if (typeof document === 'undefined') {
    return file;
  }

  if (file.type === 'image/gif' || file.type === 'image/svg+xml') {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    throw new Error('No se pudo preparar el lienzo para optimizar la imagen.');
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, outputType, quality);
  });

  if (!blob) {
    throw new Error('No se pudo comprimir la imagen.');
  }

  const extension = outputType === 'image/webp' ? 'webp' : 'jpg';
  return new File([blob], replaceExtension(file.name, extension), {
    type: outputType,
    lastModified: Date.now()
  });
}
