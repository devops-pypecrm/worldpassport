'use client';
import { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle2, Loader, Clock, CalendarCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import PageHero from '@/components/PageHero';
import { KOCHI_OFFICE_ADDRESS, KOCHI_OFFICE_MAP_URL, KOCHI_OFFICE_MAP_EMBED } from '@/lib/office';

type Status = 'idle' | 'loading' | 'success' | 'error';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'admissions@worldpassport.in', href: 'mailto:admissions@worldpassport.in' },
  { icon: Phone, label: 'Phone', value: '+91 6282 061 368', href: 'tel:+916282061368' },
  { icon: MapPin, label: 'Office', value: KOCHI_OFFICE_ADDRESS, href: KOCHI_OFFICE_MAP_URL },
  { icon: Clock, label: 'Hours', value: 'Monday–Saturday, 9am–7pm IST' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageWrapper>
      <Navbar />

      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Get in touch"
        title="Let's talk about your future"
        lead="Book a free counselling session with our education experts. No commitment and no hidden fees, just honest advice about your options."
      />

      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* Info */}
          <aside className="space-y-6">
            <div>
              <h2 className="heading-md">Contact information</h2>
              <p className="mt-2 text-sm text-ink-muted">Reach a counsellor directly, or send us a message and we&apos;ll call you back.</p>
            </div>
            <ul className="space-y-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy"><Icon size={19} /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-ink hover:text-navy"
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Office location */}
            <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-card">
              <iframe title="World Passport office location, Edappally, Kochi" src={KOCHI_OFFICE_MAP_EMBED}
                className="block h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              <a href={KOCHI_OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-navy hover:bg-cream">
                <span className="flex items-center gap-2"><MapPin size={15} className="text-brand" /> Get directions</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gold-50 p-6">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
                <CalendarCheck size={19} className="text-gold-dark" /> Free counselling session
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Fill out the form for a complimentary 45-minute session with one of our senior counsellors.
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="card p-6 sm:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50"><CheckCircle2 size={32} className="text-gold" /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">Message sent</h3>
                <p className="mt-2 text-ink-muted">Our team will reach out within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-6">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="heading-md">Send us a message</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="field-label">Full name *</label>
                    <input id="c-name" name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma" className="field" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="field-label">Email *</label>
                    <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="priya@email.com" className="field" />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="field-label">Phone</label>
                    <input id="c-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="field" />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="field-label">I&apos;m interested in</label>
                    <select id="c-subject" name="subject" value={form.subject} onChange={handleChange} className="field">
                      <option value="">Select…</option>
                      <option>Overseas Education</option>
                      <option>Skill Development</option>
                      <option>Recruitment</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="c-message" className="field-label">Message *</label>
                  <textarea id="c-message" name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your goals: course, country, intake…" className="field resize-none" />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-brand">Something went wrong. Please try again or email us directly.</p>
                )}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full py-3.5">
                  {status === 'loading' ? <><Loader size={17} className="animate-spin" /> Sending…</> : <><Send size={17} /> Send message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}
