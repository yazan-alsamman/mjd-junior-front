import { Link, Navigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import FuturisticPageShell from '../shell/FuturisticPageShell';
import FuturisticTopBar from '../shell/FuturisticTopBar';
import { useAuth } from '../../context/AuthContext';
import { fx } from '../../lib/futureUi';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <FuturisticPageShell>
        <FuturisticTopBar
          start={
            <Link to="/" className={fx.btnGhost}>
              Home
            </Link>
          }
          end={<ThemeToggle />}
        />
        <div className={`${fx.container} ${fx.mainTop} grid min-h-[55vh] place-items-center px-4`}>
          <div className={`${fx.card} flex items-center gap-3 py-4`}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <span className="font-mono text-sm text-zinc-300">Loading secure workspace...</span>
          </div>
        </div>
      </FuturisticPageShell>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
