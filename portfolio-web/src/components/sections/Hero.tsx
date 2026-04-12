import { motion } from 'framer-motion'
import { profile } from '../../data/site'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-indigo-50/80 via-white to-white px-4 py-20 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.2),transparent)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          className="max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 inline-flex rounded-full border border-indigo-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700 shadow-sm dark:border-violet-500/40 dark:bg-slate-900/80 dark:text-violet-300">
            Open to opportunities
          </p>
          <h1 className="bg-gradient-to-br from-slate-900 via-indigo-800 to-violet-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-violet-200 dark:to-fuchsia-300">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-indigo-600 dark:text-violet-400">
            {profile.title}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button href="#contact">Get in touch</Button>
            <Button href="#projects" variant="outline">
              View work
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-400/30 via-violet-400/20 to-fuchsia-400/30 blur-2xl dark:from-violet-500/25 dark:via-fuchsia-500/15 dark:to-indigo-500/25" />
          <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-2xl ring-4 ring-indigo-500/10 dark:border-slate-800 dark:ring-violet-500/20 sm:h-64 sm:w-64">
            <img
              src={profile.image}
              alt={profile.name}
              className="h-full w-full object-cover"
              width={320}
              height={320}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
