import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-5.5rem)] flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-6 text-white md:p-10">{children}</main>
    </div>
  );
}
