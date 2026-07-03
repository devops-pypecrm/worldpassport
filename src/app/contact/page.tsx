'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import AOSInit from '@/components/AOSInit';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, Loader, MessageCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

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

  const inputClass =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all text-sm';

  return (
    <PageWrapper>
      <AOSInit />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden bg-[#060C1F] -mt-20 pt-20">

        {/* Background image */}
        <img
          src="/assets/contact.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#060C1F]/55 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,12,31,0.80) 85%, #060C1F 100%)' }} />
        {/* Blue glow */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-600/12 blur-3xl pointer-events-none" />
        {/* Red glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        {/* Animated arcs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          {[
            { d: 'M 0 300 Q 400 100 900 280', color: '#2563EB', delay: 0 },
            { d: 'M 200 450 Q 700 150 1200 350', color: '#DC2626', delay: 0.8 },
          ].map((p, i) => (
            <motion.path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="1.5"
              strokeDasharray="6 8" opacity={0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.18 }}
              transition={{ delay: p.delay, duration: 2.5, ease: 'easeInOut' }} />
          ))}
        </svg>

        {/* Hero text */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 pb-14 pt-36">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <MessageCircle size={13} className="text-blue-400" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">Get in Touch</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-5 leading-tight">
              Let&apos;s Talk About Your{' '}
              <span className="text-gradient">Future</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Book a free counselling session with our education experts. No commitment, no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="relative py-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg relative z-10">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* ── Contact Info ── */}
            <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
              <div>
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Contact Information</h2>
                <p className="text-gray-500 text-sm">Our counsellors are available Mon–Sat, 9am–7pm IST</p>
              </div>

              {[
                { icon: Mail,   label: 'Email',  value: 'rajithaworldpassport@gmail.com' },
                { icon: Phone,  label: 'Phone',  value: '+91 92921 73857' },
                { icon: MapPin, label: 'Office', value: 'St George Forane Church Building, Palarivattam-Edappally Road, Ponekkara, Edappally, Kochi, Ernakulam, Kerala 682024' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-100">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5 uppercase tracking-wider">{label}</div>
                    <div className="text-gray-800 text-sm font-medium">{value}</div>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-5 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-blue-700 font-medium mb-2">Free Counselling Session</div>
                <p className="text-blue-600 text-sm">
                  Fill out the form for a complimentary 45-minute session with one of our senior counsellors.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { val: '10,000+', label: 'Students Helped', color: '#2563EB' },
                  { val: '98%',     label: 'Visa Approval',   color: '#DC2626' },
                  { val: '100+',    label: 'Universities',     color: '#2563EB' },
                  { val: '12',      label: 'Countries',        color: '#DC2626' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center bg-gray-50 border border-gray-100">
                    <div className="font-bold text-lg" style={{ color: s.color }}>{s.val}</div>
                    <div className="text-gray-500 text-[10px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Form ── */}
            <div className="lg:col-span-3" data-aos="fade-left">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-blue-100 rounded-3xl shadow-sm p-10 text-center"
                >
                  <CheckCircle size={56} className="text-blue-600 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Our team will reach out within 24 hours. We&apos;re excited to help you!</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold text-white transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-500 text-xs mb-1.5 block font-medium uppercase tracking-wider">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1.5 block font-medium uppercase tracking-wider">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="priya@email.com" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-500 text-xs mb-1.5 block font-medium uppercase tracking-wider">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1.5 block font-medium uppercase tracking-wider">Interest</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
                        <option value="">Select...</option>
                        <option>Overseas Education</option>
                        <option>Skill Development</option>
                        <option>Recruitment</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs mb-1.5 block font-medium uppercase tracking-wider">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your goals..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#DC2626] hover:opacity-95 shadow-lg disabled:opacity-60 transition-all"
                  >
                    {status === 'loading'
                      ? <><Loader size={18} className="animate-spin" /> Sending...</>
                      : <><Send size={18} /> Send Message</>}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}

