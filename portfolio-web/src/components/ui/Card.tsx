import type { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ children, className = '', ...rest }: Props) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-violet-500/40 dark:hover:shadow-violet-950/40 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
