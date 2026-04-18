import FutureBackground from '../components/landing/future/FutureBackground';
import SidebarNav from '../components/dashboard/SidebarNav';
import TopNavbar from '../components/dashboard/TopNavbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="dark relative min-h-screen overflow-x-hidden bg-[#030308] text-zinc-100">
      <FutureBackground />
      <div className="relative z-10 flex min-h-screen">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />
          <main className="flex-1 px-4 py-6 sm:px-6 xl:px-10 xl:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
