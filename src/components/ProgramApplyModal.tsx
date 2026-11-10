'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Loader, CheckCircle2, BookOpen } from 'lucide-react';
import type { Program } from '@/lib/programs';

const EMPTY = { name: '', email: '', phone: '', message: '', website: '' };

/** "Apply now" form for a program card. Program details are pre-filled from the selected card. */
export default function ProgramApplyModal({ program, onClose }: { program: Program | null; onClose: () => void }) {
  const pathname = usePathname();
  const [form, setForm] = useState({ ...EMPTY });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const firstField = useRef<HTMLInputElement>(null);

  // Reset whenever a different program is opened
  useEffect(() => {
    if (!program) return;
    setForm({ ...EMPTY });
    setStatus('idle');
    setError('');
  }, [program]);

  // While open: Esc closes, page behind doesn't scroll, focus the first field
  useEffect(() => {
    if (!program) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstField.current?.focus(), 250);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; clearTimeout(t); };
  }, [program, onClose]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'Program application',
          programId: program._id,
          // Also sent for completeness; the server re-reads these from the database
          program: program.title, university: program.university, destination: program.country, level: program.level,
          page: pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setForm({ ...EMPTY });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const details = program
    ? [
        { label: 'Program / Course', value: program.title, wide: true },
        { label: 'University', value: program.university, wide: true },
        { label: 'Destination', value: program.country },
        { label: 'Study level', value: program.level },
        { label: 'Duration', value: program.duration || '' },
        { label: 'Tuition fee', value: program.tuitionFee || '' },
        { label: 'Intake', value: program.intake || '' },
      ].filter((d) => d.value)
    : [];

  return (
    <AnimatePresence>
      {program && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="apply-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-lift"
          >
            <button type="button" onClick={onClose} aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-colors hover:bg-cream">
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center px-8 py-14 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50"><CheckCircle2 size={32} className="text-gold" /></span>
                <h2 id="apply-title" className="mt-5 font-display text-2xl font-semibold text-navy-900">Application received</h2>
                <p className="mt-2 max-w-sm text-sm text-ink-muted">
                  Thanks for applying to <span className="font-semibold text-ink">{program.title}</span>. A counsellor will contact you shortly with the next steps.
                </p>
                <button type="button" onClick={onClose} className="btn-primary mt-6">Close</button>
              </div>
            ) : (
              <>
                {/* Selected program header */}
                <div className="bg-navy px-6 pb-6 pt-7 text-white sm:px-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><BookOpen size={20} className="text-gold-light" /></span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-light">Apply now</p>
                  <h2 id="apply-title" className="mt-1 pr-8 font-display text-2xl font-semibold leading-snug">{program.title}</h2>
                  <p className="mt-1 text-sm text-white/70">{program.university} · {program.country}</p>
                </div>

                <form onSubmit={submit} className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                  {/* Honeypot (hidden from people) */}
                  <input type="text" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                  <p className="text-sm font-semibold text-navy-900 sm:col-span-2">Program details</p>
                  {details.map((d) => (
                    <div key={d.label} className={d.wide ? 'sm:col-span-2' : ''}>
                      <label className="field-label">{d.label}</label>
                      <input value={d.value} readOnly tabIndex={-1} className="field cursor-default !bg-cream text-ink-muted" />
                    </div>
                  ))}

                  <p className="mt-2 text-sm font-semibold text-navy-900 sm:col-span-2">Your details</p>
                  <div className="sm:col-span-2">
                    <label htmlFor="ap-name" className="field-label">Full name *</label>
                    <input ref={firstField} id="ap-name" name="name" required maxLength={100} value={form.name} onChange={onChange} className="field" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="ap-phone" className="field-label">Phone *</label>
                    <input id="ap-phone" name="phone" type="tel" required maxLength={20} value={form.phone} onChange={onChange} className="field" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label htmlFor="ap-email" className="field-label">Email *</label>
                    <input id="ap-email" name="email" type="email" required maxLength={150} value={form.email} onChange={onChange} className="field" placeholder="you@email.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ap-msg" className="field-label">Message <span className="font-normal text-ink-soft">(optional)</span></label>
                    <textarea id="ap-msg" name="message" rows={3} maxLength={1000} value={form.message} onChange={onChange} className="field resize-none"
                      placeholder="Your current qualification, preferred intake, questions…" />
                  </div>
                  {status === 'error' && <p role="alert" className="text-sm text-brand sm:col-span-2">{error}</p>}
                  <button type="submit" disabled={status === 'loading'} className="btn-accent w-full sm:col-span-2">
                    {status === 'loading' ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                    {status === 'loading' ? 'Submitting…' : 'Submit application'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
