'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Loader, CheckCircle2, GraduationCap, MessageSquareText } from 'lucide-react';
import { useDestinations } from '@/lib/useDestinations';
import { PROGRAM_LEVELS } from '@/lib/programs';

const DELAY_MS = 10_000;               // open 10s after the page has fully loaded
const SUBMITTED_KEY = 'wp_lead_submitted'; // once a visitor submits, don't interrupt them again

const EMPTY = { name: '', email: '', phone: '', destination: '', level: '', message: '', website: '' };

function alreadySubmitted() {
  try { return localStorage.getItem(SUBMITTED_KEY) === '1'; } catch { return false; }
}

export default function LeadPopup() {
  const pathname = usePathname();
  const hidden = pathname?.startsWith('/admin');
  const { destinations } = useDestinations();

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false); // closed without submitting -> show the small "Enquire now" button
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const firstField = useRef<HTMLInputElement>(null);

  // Timer: 10 seconds after the page has finished loading (once per page load / reload)
  useEffect(() => {
    if (hidden) return;
    if (alreadySubmitted()) { setSubmitted(true); return; }
    let timer: ReturnType<typeof setTimeout>;
    const start = () => { timer = setTimeout(() => setOpen(true), DELAY_MS); };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => { clearTimeout(timer); window.removeEventListener('load', start); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While open: Esc closes, page behind doesn't scroll, focus the first field
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstField.current?.focus(), 250);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    if (status === 'success') { setSubmitted(true); setStatus('idle'); }
    else setDismissed(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page: pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setForm({ ...EMPTY });
      setDismissed(false);
      try { localStorage.setItem(SUBMITTED_KEY, '1'); } catch { /* private mode: ignore */ }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Small button to reopen the form after it was closed */}
      <AnimatePresence>
        {dismissed && !open && !submitted && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-brand-dark"
          >
            <MessageSquareText size={16} /> Enquire now
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={close} aria-hidden="true" />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-popup-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative grid max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lift md:grid-cols-[0.85fr_1.15fr]"
            >
              <button type="button" onClick={close} aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-colors hover:bg-cream">
                <X size={18} />
              </button>

              {/* Side panel */}
              <div className="relative hidden overflow-hidden bg-navy p-8 text-white md:block">
                <div aria-hidden="true" className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border-[18px] border-white/10" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><GraduationCap size={24} className="text-gold-light" /></span>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug">Study abroad with expert guidance</p>
                <ul className="mt-6 space-y-3 text-sm text-white/85">
                  {['Free 1:1 counselling session', 'University & course shortlist', 'Scholarship and visa support'].map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-gold-light" /> {t}</li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="overflow-y-auto p-6 sm:p-8">
                {status === 'success' ? (
                  <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50"><CheckCircle2 size={32} className="text-gold" /></span>
                    <h2 id="lead-popup-title" className="mt-5 font-display text-2xl font-semibold text-navy-900">Thank you!</h2>
                    <p className="mt-2 max-w-xs text-sm text-ink-muted">Your enquiry has been received. One of our counsellors will contact you shortly.</p>
                    <button type="button" onClick={close} className="btn-primary mt-6">Close</button>
                  </div>
                ) : (
                  <>
                    <span className="eyebrow">Free counselling</span>
                    <h2 id="lead-popup-title" className="mt-3 pr-8 font-display text-2xl font-semibold text-navy-900">Planning to study abroad?</h2>
                    <p className="mt-1 text-sm text-ink-muted">Share your details and a counsellor will call you back.</p>

                    <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
                      {/* Honeypot (hidden from people) */}
                      <input type="text" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                      <div className="sm:col-span-2">
                        <label htmlFor="lp-name" className="field-label">Full name *</label>
                        <input ref={firstField} id="lp-name" name="name" required maxLength={100} value={form.name} onChange={onChange} className="field" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="lp-phone" className="field-label">Phone *</label>
                        <input id="lp-phone" name="phone" type="tel" required maxLength={20} value={form.phone} onChange={onChange} className="field" placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label htmlFor="lp-email" className="field-label">Email *</label>
                        <input id="lp-email" name="email" type="email" required maxLength={150} value={form.email} onChange={onChange} className="field" placeholder="you@email.com" />
                      </div>
                      <div>
                        <label htmlFor="lp-dest" className="field-label">Preferred destination</label>
                        <select id="lp-dest" name="destination" value={form.destination} onChange={onChange} className="field">
                          <option value="">Not sure yet</option>
                          {destinations.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="lp-level" className="field-label">Study level</label>
                        <select id="lp-level" name="level" value={form.level} onChange={onChange} className="field">
                          <option value="">Select level</option>
                          {PROGRAM_LEVELS.map((l) => <option key={l}>{l}</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="lp-msg" className="field-label">Message <span className="font-normal text-ink-soft">(optional)</span></label>
                        <textarea id="lp-msg" name="message" rows={2} maxLength={1000} value={form.message} onChange={onChange} className="field resize-none" placeholder="Anything we should know?" />
                      </div>
                      {status === 'error' && <p role="alert" className="text-sm text-brand sm:col-span-2">{error}</p>}
                      <button type="submit" disabled={status === 'loading'} className="btn-accent w-full sm:col-span-2">
                        {status === 'loading' ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                        {status === 'loading' ? 'Sending…' : 'Get free counselling'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
