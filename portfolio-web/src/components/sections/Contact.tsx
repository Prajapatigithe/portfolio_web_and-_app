import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { contact } from '../../data/site'
import { Card } from '../ui/Card'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formRef.current) return

    emailjs
      .sendForm(
        'service_4bv8jy5',    
        'template_j4owak5',    
        formRef.current,
        {
          publicKey: '3YTnzKopcKieF2xb9', 
        }
      )
      .then(() => {
        setStatus('sent')
        formRef.current?.reset()
        setTimeout(() => setStatus('idle'), 4000)
      })
      .catch((error) => {
        console.log('EmailJS Error:', error) 
        setStatus('error')
      })
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Contact
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-500 dark:to-fuchsia-500" />
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Reach out for collaborations, freelance work, or full-time roles.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Direct links
              </h3>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                <li>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Email
                  </span>
                  <br />
                  <a
                    className="text-indigo-600 hover:text-indigo-800 dark:text-violet-400"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Phone
                  </span>
                  <br />
                  <a
                    className="text-indigo-600 hover:text-indigo-800 dark:text-violet-400"
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    LinkedIn
                  </span>
                  <br />
                  <a
                    className="text-indigo-600 hover:text-indigo-800 dark:text-violet-400"
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    GitHub
                  </span>
                  <br />
                  <a
                    className="text-indigo-600 hover:text-indigo-800 dark:text-violet-400"
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Repositories
                  </a>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Send a message
              </h3>

              <form ref={formRef} className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl border px-4 py-2.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-white sm:w-auto"
                >
                  Send message
                </button>

                {status === 'sent' && (
                  <p className="text-sm text-emerald-600">
                    ✅ Message sent successfully!
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-sm text-red-600">
                    ❌ Failed to send message. Try again.
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}