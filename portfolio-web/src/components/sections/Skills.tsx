import { motion } from 'framer-motion'
import { skills } from '../../data/site'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

// ✅ Add links here
const skillLinks: Record<string, string> = {
  'React Native': 'https://reactnative.dev',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  TypeScript: 'https://www.typescriptlang.org',
  Redux: 'https://redux.js.org',
  APIs: 'https://developer.mozilla.org/en-US/docs/Web/API',
  Firebase: 'https://firebase.google.com',
}

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-b border-slate-200/70 bg-slate-50/80 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Skills
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-500 dark:to-fuchsia-500" />
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Technologies and tools I use to ship reliable mobile products.
          </p>
        </motion.div>

        <motion.ul
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {skills.map((skill) => (
            <motion.li
              key={skill}
              variants={item}
              className="group rounded-2xl border border-slate-200/90 bg-white px-5 py-4 font-medium text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-violet-500/60"
            >
              <a
                href={skillLinks[skill] || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-80 transition group-hover:scale-125 dark:from-violet-400 dark:to-fuchsia-400" />
                {skill}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}