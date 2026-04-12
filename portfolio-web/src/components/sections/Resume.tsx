import { motion } from 'framer-motion'
import { resumeFile } from '../../data/site'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function Resume() {
  return (
    <section
      id="resume"
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
            Resume
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-500 dark:to-fuchsia-500" />
        </motion.div>

        <motion.div
          className="mt-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Card>
            <p className="text-slate-600 dark:text-slate-400">
              You can view or download my latest resume.
            </p>

            <div className="mt-6 flex gap-4">
              {/* View Resume */}
              <Button
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                View Resume
              </Button>

              {/* Download Resume */}
              <Button
                href={resumeFile}
                download="Ankit-Kumar-Resume.pdf"
                className="no-underline"
              >
                Download PDF
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}