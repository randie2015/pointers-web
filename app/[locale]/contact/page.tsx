'use client';

import { Suspense } from 'react';
import { ContactPageContent } from '@/components/contact/contact-page-content';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ContactPageContent />
      </Suspense>
    </div>
  );
}
