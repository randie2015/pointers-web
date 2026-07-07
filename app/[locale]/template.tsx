'use client';

import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';

export default function LocaleTemplate({ children }: { children: ReactNode }) {
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'es';

  return <div key={locale}>{children}</div>;
}
