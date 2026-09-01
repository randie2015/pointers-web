import type { ReactNode } from 'react';
import { isClinicDemoExpired } from '@/lib/orthozent/expiration';
import { OrthozentExpiredView } from '@/components/orthozent/expired-view';

export function OrthozentExpiryGuard({ children }: { children: ReactNode }) {
  if (isClinicDemoExpired()) {
    return <OrthozentExpiredView />;
  }

  return children;
}
