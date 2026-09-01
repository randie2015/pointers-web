import { clinicExpiration } from '@/src/data/clinicData';

export function isClinicDemoExpired(now: Date = new Date()): boolean {
  return now.getTime() >= new Date(clinicExpiration.expiresAt).getTime();
}
