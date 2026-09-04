import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

export function isAestheticDemoExpired(demo: ResolvedAestheticDemo, now: Date = new Date()): boolean {
  return now.getTime() >= new Date(demo.expiration.expiresAt).getTime();
}
