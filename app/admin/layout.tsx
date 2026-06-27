import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AdminShell } from '@/components/admin/admin-shell';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Admin | Pointers',
  robots: { index: false, follow: false }
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen font-sans text-white antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
