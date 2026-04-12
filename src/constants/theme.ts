export type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  primaryMuted: string;
  text: string;
  textSecondary: string;
  border: string;
  tabBar: string;
  tabBarBorder: string;
  accent: string;
  success: string;
};

const light: ThemeColors = {
  background: '#F4F6FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  primary: '#2563EB',
  primaryMuted: '#93C5FD',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  accent: '#7C3AED',
  success: '#059669',
};

const dark: ThemeColors = {
  background: '#0B1220',
  surface: '#151F32',
  surfaceElevated: '#1E293B',
  primary: '#3B82F6',
  primaryMuted: '#1D4ED8',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#273449',
  tabBar: '#111827',
  tabBarBorder: '#1F2937',
  accent: '#A78BFA',
  success: '#34D399',
};

export function getColors(theme: ThemeName): ThemeColors {
  return theme === 'dark' ? dark : light;
}
