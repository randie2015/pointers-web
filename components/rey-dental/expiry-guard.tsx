import type { ReactNode } from 'react';
import { isClinicDemoExpired } from '@/lib/rey-dental/expiration';
import { ReyDentalExpiredView } from '@/components/rey-dental/expired-view';

export function ReyDentalExpiryGuard({ children }: { children: ReactNode }) {
  if (isClinicDemoExpired()) {
    return <ReyDentalExpiredView />;
  }

  return children;
}
