import { useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  Code2,
  BriefcaseBusiness,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { contact, projectTypes, budgets } from '../../data/site';
import { supabase } from '../../lib/supabase';
const useWhatsApp =
  import.meta.env.VITE_INQUIRY_CHANNEL !== 'supabase' || !supabase;

export function Contact() {
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error' | 'prepared'
  >('idle');
  const [error, setError] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = [
      'name',
      'email',
      'company',
      'project_type',
      'budget',
      'timeline',
      'message',
    ] as const;
    const payload = Object.fromEntries(
      fields.map(key => [key, String(data.get(key) || '').trim()]),
    );
    if (payload.name.length < 2 || payload.message.length < 20) {
      setError(
        'Please enter your name and at least 20 characters about your project.',
      );
      setStatus('error');
      return;
    }
    if (String(data.get('website') || '')) return;
    if (useWhatsApp) {
      const message = [
        'Hi Ankit, I’d like to discuss a project.',
        '',
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || 'Not specified'}`,
        `Project type: ${payload.project_type}`,
        `Budget: ${payload.budget}`,
        `Timeline: ${payload.timeline}`,
        '',
        'Project brief:',
        payload.message,
      ].join('\n');
      const url = `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
      setWhatsappUrl(url);
      setStatus('prepared');
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!supabase) return;
    setStatus('sending');
    try {
      const { error } = await supabase.rpc('submit_lead', {
        payload,
        website: String(data.get('website') || ''),
      });
      if (error) throw error;
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError(
        'Your inquiry could not be sent. Please try again or contact me by email.',
      );
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <div>
          <div className="availability">
            <span /> LET’S CREATE SOMETHING GREAT
          </div>
          <h2>
            Have an App Idea?
            <br />
            <span>Let’s Build It.</span>
          </h2>
          <p>
            Tell me what you have in mind. We’ll discuss your goals, explore
            what’s possible, and work out the next step.
          </p>
          <a className="contact-email" href={`mailto:${contact.email}`}>
            <Mail size={20} />
            {contact.email}
            <ArrowUpRight size={18} />
          </a>
          <div className="social-links">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <BriefcaseBusiness size={18} />
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer">
              <Code2 size={18} />
              GitHub
            </a>
          </div>
          <div className="contact-note">
            <CheckCircle2 size={18} />
            <span>A conversation first. No commitment required.</span>
          </div>
        </div>
        <form
          className="inquiry-form"
          onSubmit={submit}
          onChange={() => {
            if (status !== 'sending') {
              setStatus('idle');
              setWhatsappUrl('');
            }
          }}
        >
          <h3>
            Tell me about your project <ArrowUpRight size={20} />
          </h3>
          <div className="form-grid">
            <label>
              Your name <span>*</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Alex Johnson"
                required
                minLength={2}
                maxLength={100}
              />
            </label>
            <label>
              Email address <span>*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@company.com"
                required
                maxLength={254}
              />
            </label>
            <label className="full">
              Company name <small>(optional)</small>
              <input
                name="company"
                autoComplete="organization"
                placeholder="Your company or startup"
                maxLength={150}
              />
            </label>
            <label>
              Project type <span>*</span>
              <select name="project_type" required defaultValue="">
                <option value="" disabled>
                  Select project type
                </option>
                {projectTypes.map(v => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Budget range <span>*</span>
              <select name="budget" required defaultValue="">
                <option value="" disabled>
                  Select your budget
                </option>
                {budgets.map(v => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="full">
              Expected timeline <span>*</span>
              <select name="timeline" required defaultValue="">
                <option value="" disabled>
                  When would you like to get started?
                </option>
                {[
                  'As soon as possible',
                  'Within 1 month',
                  '1–3 months',
                  'Flexible / exploring',
                ].map(v => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="full">
              Your project idea <span>*</span>
              <textarea
                name="message"
                rows={4}
                placeholder="What are you building, and how can I help?"
                required
                minLength={20}
                maxLength={5000}
              />
            </label>
            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
          </div>
          <button
            className="button submit-button"
            disabled={status === 'sending'}
          >
            {status === 'sending'
              ? 'Sending your inquiry…'
              : useWhatsApp
                ? 'Continue on WhatsApp'
                : 'Send Project Inquiry'}
            <ArrowUpRight size={18} />
          </button>
          <p className="privacy-note">
            {useWhatsApp
              ? 'Opens WhatsApp with your project details. Review the message and press Send to contact me.'
              : 'Your details are used only to respond to your project inquiry.'}
          </p>
          <div aria-live="polite">
            {status === 'prepared' && (
              <div className="whatsapp-handoff" role="status">
                <p>
                  Your project message is ready. Review it in WhatsApp and press
                  Send. Nothing has been sent yet.
                </p>
                <a
                  className="text-link"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp <ArrowUpRight size={16} />
                </a>
                <p className="handoff-note">
                  If WhatsApp did not open, use the link above. Your form
                  details are still here.
                </p>
              </div>
            )}
            {status === 'success' && (
              <p className="success-message">
                Thanks! Your project inquiry has been received. I’ll reply by
                email.
              </p>
            )}
            {status === 'error' && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
