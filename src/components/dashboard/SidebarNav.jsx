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
    <aside className="hidden w-72 shrink-0 border-r border-white/[0.06] bg-black/35 backdrop-blur-xl xl:block">
      <div className="flex h-full flex-col px-5 py-6">
        <BrandMark to="/" light compact />

        <nav className="mt-8 space-y-1" aria-label="Dashboard sections">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 transition hover:bg-white/[0.06] hover:text-white"
            >
              <item.icon className="h-4 w-4 text-cyan-400/80" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-fuchsia-500/20 bg-fuchsia-950/20 p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300/90">
            Workflow
          </p>
          <p className="mt-2 text-sm font-medium leading-snug text-zinc-300">
            Review detections, manage logo assets, and track violation reports.
          </p>
        </div>
      </div>
    </aside>
  );
}
