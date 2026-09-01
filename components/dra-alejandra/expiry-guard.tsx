import type { ReactNode } from 'react';
import { isClinicDemoExpired } from '@/lib/dra-alejandra/expiration';
import { DraAlejandraExpiredView } from '@/components/dra-alejandra/expired-view';

export function DraAlejandraExpiryGuard({ children }: { children: ReactNode }) {
  if (isClinicDemoExpired()) {
    return <DraAlejandraExpiredView />;
  }

  return children;
}
