import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { getColors, type ThemeColors, type ThemeName } from '../constants/theme';

const STORAGE_KEY = '@portfolio_theme_mode';

export type ThemeMode = 'system' | ThemeName;

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ThemeName;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  toggleLightDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY).then(stored => {
      if (!mounted || !stored) {
        return;
      }
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setModeState(stored);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const resolvedTheme = useMemo(() => {
    if (mode === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  }, [mode, systemScheme]);

  const colors = useMemo(() => getColors(resolvedTheme), [resolvedTheme]);

  const toggleLightDark = useCallback(() => {
    const next: ThemeName = resolvedTheme === 'dark' ? 'light' : 'dark';
    setMode(next);
  }, [resolvedTheme, setMode]);

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      colors,
      setMode,
      toggleLightDark,
    }),
    [mode, resolvedTheme, colors, setMode, toggleLightDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return ctx;
}
