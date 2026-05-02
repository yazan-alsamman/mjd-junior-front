import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

function forceDarkMode() {
  const root = document.documentElement;

  root.classList.add('dark');
  root.dataset.theme = 'dark';
  window.localStorage.setItem('theme', 'dark');
  window.localStorage.setItem('app-theme', 'dark');
}

export function ThemeProvider({ children }) {
  const [theme] = useState('dark');

  useEffect(() => {
    forceDarkMode();
  }, []);

  const toggleTheme = () => {
    forceDarkMode();
  };

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: true,
      toggleTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
