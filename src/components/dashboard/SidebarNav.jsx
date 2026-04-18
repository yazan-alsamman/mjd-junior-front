import {
  Bell,
  FolderUp,
  LayoutDashboard,
  ScanSearch,
  Settings2,
} from 'lucide-react';
import BrandMark from '../brand/BrandMark';

const navItems = [
  { label: 'Overview', href: '#overview', icon: LayoutDashboard },
  { label: 'Recent Analyses', href: '#recent-analyses', icon: ScanSearch },
  { label: 'Logo Uploads', href: '#logo-uploads', icon: FolderUp },
  { label: 'Violations', href: '#violations', icon: Bell },
  { label: 'Settings', href: '#settings', icon: Settings2 },
];

export default function SidebarNav() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-ink-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 xl:block">
      <div className="flex h-full flex-col px-5 py-6">
        <BrandMark to="/" />

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-brand-100 bg-brand-50/70 p-4 dark:border-brand-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
            Integration
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">
            Dashboard is ready for backend-powered stats, uploads, and violation reports.
          </p>
        </div>
      </div>
    </aside>
  );
}
