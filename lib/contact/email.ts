import { Resend } from 'resend';
import type { ContactFormData } from './schema';
import type { RequestMetadata } from './metadata';
import { formatContactHtml, formatContactPlainText, formatContactSubject } from './format';

const DEFAULT_TO = 'hello@pointers.marketing';
const DEFAULT_BCC = 'hello.pointers.marketing@gmail.com';
const DEFAULT_FROM = 'Pointers <hello@pointers.marketing>';

export async function sendContactEmail(data: ContactFormData, meta: RequestMetadata) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);
  const to = (process.env.CONTACT_EMAIL_TO ?? DEFAULT_TO).split(',').map((s) => s.trim());
  const bcc = (process.env.CONTACT_EMAIL_BCC ?? DEFAULT_BCC).split(',').map((s) => s.trim());
  const from = process.env.CONTACT_EMAIL_FROM ?? DEFAULT_FROM;

  const { error } = await resend.emails.send({
    from,
    to,
    bcc,
    subject: formatContactSubject(data),
    text: formatContactPlainText(data, meta),
    html: formatContactHtml(data, meta)
  });

  if (error) {
    throw new Error(error.message);
  }
}
