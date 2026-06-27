import { Suspense } from 'react';
import AdminLoginPage from './page.client';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando…</div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
