import { profile } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
      <p>
        © {year} {profile.name}. Built with React & Vite.
      </p>
    </footer>
  )
}
