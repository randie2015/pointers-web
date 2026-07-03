import { NextResponse, type NextRequest } from 'next/server';
import { contactRequestSchema } from '@/lib/contact/schema';
import { buildRequestMetadata } from '@/lib/contact/metadata';
import { sendContactEmail } from '@/lib/contact/email';
import { sendContactWhatsApp } from '@/lib/contact/whatsapp';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const meta = buildRequestMetadata(request, parsed.data.metadata);

  try {
    await sendContactEmail(parsed.data.data, meta);
  } catch (error) {
    console.error('[contact] email failed:', error);
    return NextResponse.json({ error: 'Could not send email notification' }, { status: 502 });
  }

  try {
    await sendContactWhatsApp(parsed.data.data, meta);
  } catch (error) {
    console.error('[contact] whatsapp failed:', error);
    // Email already sent — do not fail the whole request if WhatsApp is misconfigured.
  }

  return NextResponse.json({ ok: true });
}
