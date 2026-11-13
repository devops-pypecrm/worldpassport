'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Handshake, Globe, Headset, FileCheck, BadgeCheck, ArrowRight, Send, Loader, CheckCircle2,
  Wallet, LineChart, ClipboardCheck, UserPlus, GraduationCap, Users, TrendingUp, Mail, Phone,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';

type Status = 'idle' | 'loading' | 'success' | 'error';

const partnerUniversityNames = [
  'Canadian Institute of Technology', 'Western Balkans University', 'Mediterranean University of Albania',
  'Epoka University', 'ALAM', 'Geomatika University College', 'VIT Mauritius',
  'Aura Institute of Business & Hospitality', 'Brighton International Business School',
  'Global College Malta', 'MCAST', 'IDEA College', 'ECI', 'University of Montenegro', 'Luarasi University',
];

const highlights = [
  { lead: '20+', rest: 'partner universities across 15 countries' },
  { lead: 'One application', rest: 'for every course you refer' },
  { lead: 'Course matching', rest: "built around each student's profile" },
  { lead: 'Dedicated manager', rest: 'for your partner account' },
];

const benefits = [
  { icon: Globe, title: 'Full destination network', desc: 'Give your students access to our entire portfolio of partner universities across 15+ countries, through a single relationship.' },
  { icon: Wallet, title: 'Transparent commission', desc: "A clear, published payout structure with no hidden deductions. You always know what you'll earn per placement." },
  { icon: Headset, title: 'Dedicated partner manager', desc: 'A named account manager who knows your pipeline and helps unblock applications quickly.' },
  { icon: LineChart, title: 'Application tracking', desc: "Follow every student's status, from submitted to offer, visa and enrolled, without chasing anyone for updates." },
  { icon: FileCheck, title: 'Application support', desc: 'Our team helps prepare documentation, SOPs and university-specific requirements so applications go in clean.' },
  { icon: BadgeCheck, title: 'Co-branded marketing', desc: 'Joint materials, webinars and event support to help you promote study-abroad options to your audience.' },
];

const steps = [
  { icon: UserPlus, title: 'Apply', desc: 'Tell us about your organisation and the student volume you work with.' },
  { icon: ClipboardCheck, title: 'Get verified', desc: 'We review your application and set up your partner account and agreement.' },
  { icon: Users, title: 'Refer students', desc: 'Submit student profiles and applications through your partner channel.' },
  { icon: TrendingUp, title: 'Track & earn', desc: 'Monitor progress and receive commission on every successful placement.' },
];

export default function PartnerWithUsPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', message: '' });

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
        setForm({ name: '', organization: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <PageWrapper>
      <Navbar />

      <PageHero
        crumbs={[{ label: 'Partner With Us' }]}
        eyebrow="Partner with us"
        title="Place your students at accredited universities abroad"
        lead="Our partner program gives education consultants, agencies and institutions one relationship for course matching, application support and transparent commissions, for every student you refer."
        aside={
          <div className="card p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white"><Handshake size={22} /></span>
            <p className="mt-5 font-display text-xl font-semibold text-navy-900">Ready to work together?</p>
            <p className="mt-1 text-sm text-ink-muted">Send us a short application and our partnerships team will reply within 2 business days.</p>
            <a href="#partner-form" className="btn-outline mt-5 w-full"><Send size={15} /> Apply to partner</a>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a href="#partner-form" className="btn-primary">Become a partner <ArrowRight size={15} /></a>
          <a href="#how-it-works" className="btn-outline">How it works</a>
        </div>
      </PageHero>

      {/* Highlights */}
      <section className="border-b border-cream-200 bg-white">
        <div className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.lead} className="px-2 py-8 sm:px-6">
              <p className="font-display text-xl font-semibold text-navy">{h.lead}</p>
              <p className="mt-1 text-sm text-ink-muted">{h.rest}</p>
            </div>
          ))}
        </div>
      </section>

      {/* University marquee */}
      <section className="bg-white py-12">
        <p className="container-x mb-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Refer students to 20+ universities partnered with World Passport
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee motion-reduce:animate-none">
            {[...partnerUniversityNames, ...partnerUniversityNames].map((name, i) => (
              <span key={i} aria-hidden={i >= partnerUniversityNames.length}
                className="mx-2 flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-cream-200 bg-cream px-5 py-2.5 text-sm font-medium text-ink">
                <GraduationCap size={15} className="text-gold" /> {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading eyebrow="Why partner with us" title="Everything you need to place students" lead="One partnership, a full toolkit: network access, operational support and transparent payouts." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-dark"><Icon size={22} /></span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section scroll-mt-24 bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Simple onboarding" title="How partnering works" lead="From application to your first placement in four steps." />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="card relative p-7">
                  <span className="absolute right-6 top-5 font-display text-4xl font-semibold text-cream-200">{i + 1}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white"><Icon size={22} /></span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Application form */}
      <section id="partner-form" className="scroll-mt-24 bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-3xl border border-cream-200 shadow-lift lg:grid-cols-5">
            <div className="relative flex flex-col justify-between bg-navy p-10 text-white lg:col-span-2 sm:p-12">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[20px] border-gold/15" />
              <div className="relative">
                <p className="eyebrow mb-4 !text-gold-light">Apply now</p>
                <h2 className="font-display text-3xl font-semibold leading-tight">Become a partner</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Tell us a little about your organisation. Our partnerships team usually responds within
                  2 business days with next steps.
                </p>
              </div>
              {/* Partnerships contact */}
              <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-light">Contact our partnerships team</p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="mailto:partners@worldpassport.in" className="flex items-center gap-2.5 text-white/90 hover:text-white">
                      <Mail size={16} className="flex-shrink-0 text-gold-light" /> partners@worldpassport.in
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917428399668" className="flex items-center gap-2.5 text-white/90 hover:text-white">
                      <Phone size={16} className="flex-shrink-0 text-gold-light" /> +91 7428 399 668
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="relative mt-10 space-y-3 text-sm text-white/85">
                {['Free to apply, no setup fees', 'Dedicated partner manager', 'Transparent commission structure'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-gold-light" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 sm:p-12 lg:col-span-3">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50"><CheckCircle2 size={32} className="text-gold" /></span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">Application submitted</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
                    Thank you for your interest. Our partnerships team will review your application and
                    get back to you by email within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="p-name" className="field-label">Your name *</label>
                    <input id="p-name" required name="name" value={form.name} onChange={handleChange} className="field" />
                  </div>
                  <div>
                    <label htmlFor="p-org" className="field-label">Organisation *</label>
                    <input id="p-org" required name="organization" value={form.organization} onChange={handleChange} className="field" />
                  </div>
                  <div>
                    <label htmlFor="p-email" className="field-label">Email *</label>
                    <input id="p-email" required type="email" name="email" value={form.email} onChange={handleChange} className="field" />
                  </div>
                  <div>
                    <label htmlFor="p-phone" className="field-label">Phone</label>
                    <input id="p-phone" name="phone" value={form.phone} onChange={handleChange} className="field" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="p-msg" className="field-label">About your students <span className="font-normal text-ink-soft">(optional)</span></label>
                    <textarea id="p-msg" name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Student volume, destinations of interest…" className="field resize-none" />
                  </div>
                  <button type="submit" disabled={status === 'loading'} className="btn-primary py-3.5 sm:col-span-2">
                    {status === 'loading' ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                    {status === 'loading' ? 'Submitting…' : 'Submit partner application'}
                  </button>
                  {status === 'error' && <p className="text-center text-xs text-brand sm:col-span-2">{errorMsg}</p>}
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
