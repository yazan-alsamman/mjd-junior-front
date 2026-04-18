import SidebarNav from '../components/dashboard/SidebarNav';
import TopNavbar from '../components/dashboard/TopNavbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-slate-950">
      <div className="flex min-h-screen">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />
          <main className="flex-1 px-4 py-6 sm:px-6 xl:px-10 xl:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
