import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '../api/authApi';
import { setAccessToken, setUnauthorizedHandler } from '../api/client';
import { clearSession, persistSession, restoreSession } from '../lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const existingSession = restoreSession();

      if (!existingSession?.accessToken) {
        setIsBootstrapping(false);
        return;
      }

      setAccessToken(existingSession.accessToken);

      try {
        const currentUser = await getCurrentUser();

        if (!isMounted) return;

        const hydratedSession = {
          ...existingSession,
          user: currentUser,
        };

        persistSession(hydratedSession);
        setSession(hydratedSession);
      } catch {
        clearSession();
        setAccessToken('');
        if (isMounted) {
          setSession(null);
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession();
      setAccessToken('');
      setSession(null);
    });
  }, []);

  const login = async (credentials) => {
    const authResponse = await loginRequest(credentials);
    persistSession(authResponse);
    setAccessToken(authResponse.accessToken);
    setSession(authResponse);
    return authResponse;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
      setAccessToken('');
      setSession(null);
    }
  };

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      token: session?.accessToken ?? null,
      isAuthenticated: Boolean(session?.accessToken),
      isBootstrapping,
      login,
      logout,
    }),
    [session, isBootstrapping],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
