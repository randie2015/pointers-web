import { formatWhatsAppText } from './format';
import type { ContactFormData } from './schema';
import type { RequestMetadata } from './metadata';

const DEFAULT_NOTIFY_PHONE = '51908553032';

function normalizePhone(value: string) {
  return value.replace(/\D/g, '');
}

async function sendViaCallMeBot(phone: string, text: string) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return false;

  const url = new URL('https://api.callmebot.com/whatsapp.php');
  url.searchParams.set('phone', phone);
  url.searchParams.set('text', text);
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('source', 'web');

  const response = await fetch(url.toString(), { method: 'GET' });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`CallMeBot failed (${response.status}): ${body}`);
  }

  return true;
}

async function sendViaCloudApi(phone: string, text: string) {
  const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return false;

  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phone,
      type: 'text',
      text: { body: text }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`WhatsApp Cloud API failed (${response.status}): ${body}`);
  }

  return true;
}

export async function sendContactWhatsApp(data: ContactFormData, meta: RequestMetadata) {
  const phone = normalizePhone(process.env.WHATSAPP_NOTIFY_TO ?? DEFAULT_NOTIFY_PHONE);
  const text = formatWhatsAppText(data, meta);

  const sentCloud = await sendViaCloudApi(phone, text);
  if (sentCloud) return;

  const sentCallMeBot = await sendViaCallMeBot(phone, text);
  if (sentCallMeBot) return;

  if (!process.env.WHATSAPP_CLOUD_API_TOKEN && !process.env.CALLMEBOT_API_KEY) {
    console.warn(
      '[contact] WhatsApp notification skipped: configure WHATSAPP_CLOUD_API_TOKEN + WHATSAPP_CLOUD_PHONE_NUMBER_ID or CALLMEBOT_API_KEY'
    );
    return;
  }

  throw new Error('WhatsApp notification could not be delivered');
}
