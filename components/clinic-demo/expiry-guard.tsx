import type { ReactNode } from 'react';
import { isClinicDemoExpired } from '@/lib/clinic-demo/expiration';
import { ClinicExpiredView } from '@/components/clinic-demo/expired-view';
import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function ClinicExpiryGuard({ demo, children }: { demo: ResolvedDemo; children: ReactNode }) {
  if (isClinicDemoExpired(demo)) {
    return <ClinicExpiredView demo={demo} />;
  }

  return children;
}
