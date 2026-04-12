import { motion } from 'framer-motion'
import { projects } from '../../data/site'
import { Card } from '../ui/Card'

export function Projects() {
  return (
    <section
      id="projects"
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
            Projects
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-500 dark:to-fuchsia-500" />
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            </code>
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card className="flex h-full flex-col">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-800 dark:bg-violet-950/80 dark:text-violet-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:gap-3 hover:text-indigo-800 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  View on GitHub
                  <span aria-hidden>→</span>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
