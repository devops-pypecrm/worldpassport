'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { motion } from 'framer-motion';
import {
  Handshake, Globe, Users, TrendingUp, Headset, FileCheck,
  BadgeCheck, ArrowRight, Send, Loader, CheckCircle,
  Wallet, LineChart, ClipboardCheck, UserPlus, LogIn,
  GraduationCap, Building, Sparkles, ShieldCheck, Search, Bell,
} from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const partnerUniversityNames = [
  'Canadian Institute of Technology', 'Western Balkans University', 'Mediterranean University of Albania',
  'Epoka University', 'ALAM', 'Geomatika University College', 'VIT Mauritius',
  'Aura Institute of Business & Hospitality', 'Brighton International Business School',
  'Global College Malta', 'MCAST', 'IDEA College', 'ECI', 'University of Montenegro', 'Luarasi University',
];

const highlights = [
  { lead: '20+', rest: 'partner universities across 15 countries' },
  { lead: 'One application', rest: 'for every course you refer' },
  { lead: 'Course matching', rest: 'built around each student’s profile' },
  { lead: 'Dedicated manager', rest: 'for your partner account' },
  { lead: 'Transparent payouts', rest: 'on every successful placement' },
];

/* Abstract dashboard illustration — original, no real screenshots used */
function DashboardMockup() {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-6 rounded-[2rem] opacity-30 blur-2xl" style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }} />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ background: '#F8FAFC', width: 400 }}>
        <div className="flex items-center gap-1.5 px-4 py-3 bg-white border-b border-gray-100">
          <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        </div>
        <div className="flex">
          <div className="w-14 bg-white border-r border-gray-100 py-4 flex flex-col items-center gap-3">
            <div className="w-7 h-7 rounded-lg" style={{ background: 'linear-gradient(135deg,#3B82F6,#6366F1)' }} />
            {[0, 1, 2, 3].map(i => <div key={i} className="w-6 h-1.5 rounded-full bg-gray-100" />)}
          </div>
          <div className="flex-1 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-24 rounded-full bg-gray-200" />
              <Bell size={13} className="text-gray-300" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-100">
              <Search size={12} className="text-gray-300" />
              <div className="h-1.5 w-20 rounded-full bg-gray-100" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl p-3 bg-white border border-gray-100">
                <div className="h-1.5 w-10 rounded-full bg-blue-100 mb-2" />
                <div className="h-3 w-14 rounded-full bg-gray-800" />
              </div>
              <div className="rounded-xl p-3 bg-white border border-gray-100">
                <div className="h-1.5 w-10 rounded-full bg-red-100 mb-2" />
                <div className="h-3 w-14 rounded-full bg-gray-800" />
              </div>
            </div>
            <div className="rounded-xl p-3 bg-white border border-gray-100 space-y-2">
              {[70, 50, 85].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: ['#DBEAFE', '#FEE2E2', '#D1FAE5'][i] }} />
                  <div className="h-1.5 rounded-full bg-gray-100" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Floating secondary card */}
      <div className="absolute -bottom-8 -left-8 rounded-2xl shadow-xl border border-gray-100 bg-white p-4 w-44">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#3B82F6,#6366F1)' }}>
            <GraduationCap size={15} className="text-white" />
          </div>
          <div className="h-1.5 w-16 rounded-full bg-gray-200" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-100 mb-1.5" />
        <div className="h-1.5 w-3/4 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

const benefits = [
  { icon: Globe, title: 'Full Destination Network', desc: 'Give your students access to our entire portfolio of partner universities across 15+ countries, all through a single relationship.', color: '#2563EB' },
  { icon: Wallet, title: 'Transparent Commission', desc: 'Clear, published payout structure with no hidden deductions — you always know exactly what you\'ll earn per placement.', color: '#DC2626' },
  { icon: Headset, title: 'Dedicated Partner Manager', desc: 'A named account manager on our side who knows your pipeline and helps unblock applications fast.', color: '#7C3AED' },
  { icon: LineChart, title: 'Live Application Tracking', desc: 'Follow every student\'s status — submitted, under review, offer, visa, enrolled — without chasing anyone for updates.', color: '#059669' },
  { icon: FileCheck, title: 'Application Support', desc: 'Our team helps prepare documentation, SOPs, and university-specific requirements so your students submit clean applications.', color: '#EA580C' },
  { icon: BadgeCheck, title: 'Co-Branded Marketing', desc: 'Joint marketing materials, webinars, and event support to help you promote study-abroad options to your audience.', color: '#0891B2' },
];

const steps = [
  { icon: UserPlus, title: 'Apply', desc: 'Tell us about your organization and the student volume you work with.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format&fit=crop' },
  { icon: ClipboardCheck, title: 'Get Verified', desc: 'We review your application and set up your partner account and agreement.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop' },
  { icon: Users, title: 'Refer Students', desc: 'Submit student profiles and applications through your dedicated partner channel.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop' },
  { icon: TrendingUp, title: 'Track & Earn', desc: 'Monitor progress in real time and receive commission on every successful placement.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop' },
];

export default function B2BPortalPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', message: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/partner/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', organization: '', email: '', phone: '', message: '', password: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all text-sm';

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF3FA 100%)' }}>
      <AOSInit />
      <Navbar />

      {/* ── HERO ── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden px-8 sm:px-12 lg:px-16 py-16 sm:py-20"
            style={{ background: 'linear-gradient(135deg, #0B1120 0%, #16213E 45%, #1E1B4B 100%)' }}>
            {/* Decorative layers */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
            <div className="absolute top-[-20%] right-[-10%] w-[32rem] h-[32rem] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />
            <div className="absolute bottom-[-25%] left-[-10%] w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #DC2626, transparent 70%)' }} />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-7">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold backdrop-blur-sm">
                    <Sparkles size={13} /> B2B Partner Program
                  </span>
                  <Link href="/b2b/login"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/70 hover:text-white text-xs font-semibold transition-all">
                    <LogIn size={13} /> Partner Login
                  </Link>
                </motion.div>
                <motion.h1 variants={fadeUp} className="text-white font-black text-4xl sm:text-5xl leading-[1.1] mb-5 tracking-tight">
                  Your one-stop platform for<br />international student placements
                </motion.h1>
                <motion.p variants={fadeUp} className="text-white/60 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
                  World Passport's partner program gives consultants, agencies, and institutions a single
                  relationship for course matching, application support, and transparent commissions — for
                  every student you refer.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                  <a href="#partner-form"
                    className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-blue-500 to-red-500 shadow-xl shadow-blue-900/30 flex items-center gap-2 text-sm hover:scale-105 transition-transform">
                    Become a Partner <ArrowRight size={16} />
                  </a>
                  <a href="#how-it-works"
                    className="px-8 py-3.5 rounded-full font-semibold text-white/70 border border-white/20 hover:bg-white/5 transition-all text-sm">
                    How It Works
                  </a>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                <DashboardMockup />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHT STRIP ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-10">
            Supporting your student placements end to end
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
            {highlights.map((h) => (
              <div key={h.lead}>
                <span className="font-bold text-gray-900">{h.lead}</span>{' '}
                <span className="text-gray-500 text-sm">{h.rest}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED NETWORK — auto-scrolling carousel ── */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
            Refer students into 20+ universities partnered with World Passport
          </p>
        </div>
        <div className="relative bg-white border-y border-gray-100 py-6 overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex w-max" style={{ animation: 'wp-marquee 32s linear infinite' }}>
            {[...partnerUniversityNames, ...partnerUniversityNames].map((name, i) => (
              <span key={i} className="flex items-center gap-2 mx-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-sm font-semibold whitespace-nowrap flex-shrink-0">
                <GraduationCap size={14} className="text-blue-500 flex-shrink-0" /> {name}
              </span>
            ))}
          </div>
          <style>{`@keyframes wp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 shadow-sm mb-4">
              <Building size={14} className="text-blue-500" /> Why Partner With Us
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-bold text-3xl sm:text-4xl text-gray-900 mb-3">
              Everything You Need To Place Students
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-lg mx-auto">
              One partnership, a full toolkit — network access, operational support, and transparent payouts.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl p-7 bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/70 transition-all duration-500 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: b.color }} />
                  <div className="absolute top-6 right-7 font-black text-3xl opacity-[0.06] select-none" style={{ color: b.color }}>0{i + 1}</div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${b.color}12` }}>
                    <Icon size={22} style={{ color: b.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS — photo cards ── */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 shadow-sm mb-4">
              <ShieldCheck size={13} className="text-blue-500" /> Simple Onboarding
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-2">How Partnering Works</h2>
            <p className="text-gray-500 text-sm">From application to your first placement in four steps</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/70 transition-all duration-500 bg-white">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${s.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,17,32,0.15) 0%, rgba(11,17,32,0.75) 100%)' }} />
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-blue-600 font-black text-xs shadow-sm">
                      {i + 1}
                    </span>
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #2563EB, #6366F1)' }}>
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 text-base mb-1.5">{s.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARTNER APPLICATION FORM ── */}
      <section id="partner-form" className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/60">

            {/* Left panel */}
            <div className="lg:col-span-2 relative p-10 sm:p-12 flex flex-col justify-between"
              style={{ background: 'linear-gradient(160deg, #1E293B 0%, #0B1120 100%)' }}>
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '26px 26px' }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/80 mb-6">
                  <Handshake size={14} /> Apply Now
                </span>
                <h2 className="font-bold text-3xl text-white mb-3 leading-tight">Become a Partner</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Tell us a bit about your organization. Our partnerships team typically responds within
                  2 business days with next steps.
                </p>
              </div>
              <div className="relative z-10 space-y-3 mt-10">
                {['Free to apply, no setup fees', 'Dedicated partner manager', 'Transparent commission structure'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel — form */}
            <div className="lg:col-span-3 bg-white p-8 sm:p-12">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Application Submitted</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Your partner account has been created and is pending review. We&apos;ll email you once it&apos;s
                    approved, and you&apos;ll be able to log in from the button above.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                  <input required name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name" className={inputClass} />
                  <input required name="organization" value={form.organization} onChange={handleChange}
                    placeholder="Organization name" className={inputClass} />
                  <input required type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Email address" className={inputClass} />
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Phone number" className={inputClass} />
                  <input required type="password" name="password" value={form.password} onChange={handleChange}
                    placeholder="Choose a password (min. 8 characters)" minLength={8} className={`${inputClass} sm:col-span-2`} />
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your student volume and destination interests (optional)..."
                    rows={4} className={`${inputClass} sm:col-span-2 resize-none`} />
                  <button type="submit" disabled={status === 'loading'}
                    className="sm:col-span-2 flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all hover:scale-[1.01] shadow-lg disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #DC2626)' }}>
                    {status === 'loading' ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                    {status === 'loading' ? 'Submitting...' : 'Submit Partner Application'}
                  </button>
                  {status === 'error' && (
                    <p className="sm:col-span-2 text-red-500 text-xs text-center">{errorMsg}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
