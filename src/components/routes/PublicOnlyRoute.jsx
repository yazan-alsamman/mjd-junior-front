import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-50 text-ink-700">
        <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          Preparing verification gateway...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
