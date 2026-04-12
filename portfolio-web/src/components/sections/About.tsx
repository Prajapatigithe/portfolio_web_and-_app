import { motion } from 'framer-motion'
import { about } from '../../data/site'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-slate-200/70 bg-white px-4 py-20 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            About
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-500 dark:to-fuchsia-500" />
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
