'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/magrass-lagree/whatsapp';

export function MagrassWhatsAppFloat() {
  const whatsappUrl = buildWhatsAppUrl('appointment');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
