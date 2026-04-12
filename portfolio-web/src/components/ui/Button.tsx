import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 dark:from-violet-600 dark:to-fuchsia-600 dark:shadow-violet-500/20',
  outline:
    'border-2 border-indigo-500/40 bg-transparent text-indigo-700 hover:border-indigo-500 hover:bg-indigo-50 dark:border-violet-500/50 dark:text-violet-200 dark:hover:bg-slate-800',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50'

type Common = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonLinkProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string
    className?: string
  }

type ButtonNativeProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    href?: undefined
    className?: string
  }

export type ButtonProps = ButtonLinkProps | ButtonNativeProps

function classFor(variant: Variant | undefined, className: string | undefined) {
  return `${base} ${variants[variant ?? 'primary']} ${className ?? ''}`
}

function ButtonLink({
  children,
  variant = 'primary',
  className,
  ...anchor
}: ButtonLinkProps) {
  return (
    <a className={classFor(variant, className)} {...anchor}>
      {children}
    </a>
  )
}

function ButtonNative({
  children,
  variant = 'primary',
  className,
  type = 'button',
  ...button
}: ButtonNativeProps) {
  return (
    <button type={type} className={classFor(variant, className)} {...button}>
      {children}
    </button>
  )
}

export function Button(props: ButtonProps) {
  if ('href' in props && props.href) {
    return <ButtonLink {...(props as ButtonLinkProps)} />
  }
  return <ButtonNative {...(props as ButtonNativeProps)} />
}
