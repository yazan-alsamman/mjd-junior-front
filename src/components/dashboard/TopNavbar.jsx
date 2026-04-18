import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-ink-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 xl:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-ink-500 dark:text-slate-400">
            Secure workspace
          </p>
          <p className="text-sm font-semibold text-ink-900 dark:text-white">
            Brand Protection Dashboard
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-ink-600 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="hidden rounded-xl border border-ink-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900 sm:block">
            <p className="text-xs text-ink-500 dark:text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-ink-900 dark:text-white">{user?.name}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
