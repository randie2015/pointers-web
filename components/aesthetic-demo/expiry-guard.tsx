import type { ReactNode } from 'react';
import { isAestheticDemoExpired } from '@/lib/aesthetic-demo/expiration';
import { AestheticExpiredView } from '@/components/aesthetic-demo/expired-view';
import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

export function AestheticExpiryGuard({
  demo,
  children
}: {
  demo: ResolvedAestheticDemo;
  children: ReactNode;
}) {
  if (isAestheticDemoExpired(demo)) {
    return <AestheticExpiredView demo={demo} />;
  }

  return children;
}
