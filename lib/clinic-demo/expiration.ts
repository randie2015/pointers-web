import type { ResolvedDemo } from '@/lib/clinic-demo/types';

export function isClinicDemoExpired(demo: ResolvedDemo, now: Date = new Date()): boolean {
  return now.getTime() >= new Date(demo.expiration.expiresAt).getTime();
}
