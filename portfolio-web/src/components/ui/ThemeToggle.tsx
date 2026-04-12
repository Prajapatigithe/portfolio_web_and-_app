import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:scale-105 hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-amber-200 dark:hover:border-violet-500"
    >
      {isDark ? (
        <span className="text-lg" aria-hidden>
          ☀️
        </span>
      ) : (
        <span className="text-lg" aria-hidden>
          🌙
        </span>
      )}
    </button>
  )
}
