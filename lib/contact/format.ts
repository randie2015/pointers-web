import type { ContactFormData } from './schema';
import type { RequestMetadata } from './metadata';

function metadataLines(meta: RequestMetadata) {
  return [
    `Fecha: ${meta.submittedAt}`,
    meta.locale ? `Idioma: ${meta.locale}` : null,
    meta.source ? `Origen: ${meta.source}` : null,
    meta.pageUrl ? `Página: ${meta.pageUrl}` : null,
    meta.referrer ? `Referrer: ${meta.referrer}` : null,
    meta.ip ? `IP: ${meta.ip}` : null,
    meta.country ? `País: ${meta.country}` : null,
    meta.city ? `Ciudad: ${meta.city}` : null,
    meta.userAgent ? `User-Agent: ${meta.userAgent}` : null,
    meta.acceptLanguage ? `Accept-Language: ${meta.acceptLanguage}` : null
  ].filter(Boolean) as string[];
}

export function formatContactSubject(data: ContactFormData) {
  return `Nuevo lead: ${data.name} (${data.company}) — pointers.marketing`;
}

export function formatContactPlainText(data: ContactFormData, meta: RequestMetadata) {
  const lines = [
    'Nuevo mensaje desde el formulario de calificación',
    '',
    '--- Datos del cliente ---',
    `Nombre: ${data.name}`,
    `Empresa: ${data.company}`,
    `Servicio: ${data.service}`,
    `Presupuesto: ${data.budget}`,
    '',
    'Mensaje:',
    data.message,
    '',
    '--- Metadata ---',
    ...metadataLines(meta)
  ];

  return lines.join('\n');
}

export function formatContactHtml(data: ContactFormData, meta: RequestMetadata) {
  const escape = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const metaRows = metadataLines(meta)
    .map((line) => {
      const [label, ...rest] = line.split(': ');
      return `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escape(label)}</td><td style="padding:4px 0">${escape(rest.join(': '))}</td></tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;color:#111;line-height:1.5">
  <h2 style="color:#BC2656;margin:0 0 16px">Nuevo lead — pointers.marketing</h2>
  <table style="border-collapse:collapse;margin-bottom:24px">
    <tr><td style="padding:4px 12px 4px 0;color:#666">Nombre</td><td style="padding:4px 0"><strong>${escape(data.name)}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Empresa</td><td style="padding:4px 0">${escape(data.company)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Servicio</td><td style="padding:4px 0">${escape(data.service)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Presupuesto</td><td style="padding:4px 0">${escape(data.budget)}</td></tr>
  </table>
  <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#666">Mensaje</h3>
  <p style="margin:0 0 24px;white-space:pre-wrap;background:#f8f8f8;padding:16px;border-radius:8px">${escape(data.message)}</p>
  <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#666">Metadata</h3>
  <table style="border-collapse:collapse;font-size:13px">${metaRows}</table>
</body>
</html>`;
}

export function formatWhatsAppText(data: ContactFormData, meta: RequestMetadata) {
  const lines = [
    '📩 *Nuevo lead — Pointers*',
    '',
    `*Nombre:* ${data.name}`,
    `*Empresa:* ${data.company}`,
    `*Servicio:* ${data.service}`,
    `*Presupuesto:* ${data.budget}`,
    '',
    `*Mensaje:*`,
    data.message,
    '',
    '--- Metadata ---',
    ...metadataLines(meta)
  ];

  return lines.join('\n');
}
