import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

export default function TopNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-black/45 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 xl:px-10">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Secure workspace
          </p>
          <p className="text-sm font-semibold text-white">Brand protection dashboard</p>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 sm:block">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Signed in as</p>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r from-indigo-600/90 to-fuchsia-600/90 px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgba(168,85,247,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
