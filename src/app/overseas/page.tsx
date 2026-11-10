'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Building2, Wallet, Users, BadgeCheck, Briefcase,
  FileCheck, Award, Plane, Star, Zap, Landmark, UserRound,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Features from '@/components/Features';
import CTASection from '@/components/CTASection';
import DestinationSelect from '@/components/DestinationSelect';
import { useDestinations, countWord } from '@/lib/useDestinations';

const advantages = [
  { icon: FileCheck, title: 'Zero hidden fees', desc: 'Complete transparency in pricing. What we quote is what you pay.' },
  { icon: UserRound, title: 'Personal counsellor', desc: 'A dedicated advisor who knows your profile and guides every step.' },
  { icon: Award, title: '98% visa success', desc: 'Near-perfect visa approval rate with expert documentation support.' },
  { icon: Plane, title: 'Arrival support', desc: 'Accommodation, banking and on-ground help ready when you land.' },
];

const timeline = [
  { month: 'Month 1–2', title: 'Profile assessment', desc: 'We evaluate your academics, goals and budget to shortlist the right programs.', icon: Star },
  { month: 'Month 2–3', title: 'Application preparation', desc: 'SOP drafting, document collection, recommendation letters and CV polishing.', icon: FileCheck },
  { month: 'Month 3–4', title: 'Submit applications', desc: 'Applications submitted to your shortlisted universities, with full tracking.', icon: Zap },
  { month: 'Month 4–6', title: 'Receive offers', desc: 'Offer letters arrive and we help you compare them and accept the best one.', icon: Award },
  { month: 'Month 6–7', title: 'Visa & finance', desc: 'Student visa application, scholarship disbursement and tuition deposit.', icon: BadgeCheck },
  { month: 'Month 7–8', title: 'Fly & settle', desc: 'Pre-departure briefing, airport pick-up coordination and on-ground help.', icon: Plane },
];

export default function OverseasPage() {
  return (
    <Suspense>
      <OverseasContent />
    </Suspense>
  );
}

function OverseasContent() {
  const { destinations, loading } = useDestinations();
  const [activeId, setActiveId] = useState('');
  // Re-run whenever ?search= changes (e.g. picking a country from the navbar while already on this page)
  const search = useSearchParams().get('search') || '';

  useEffect(() => {
    if (destinations.length === 0) return;
    const q = search.toLowerCase();
    if (!q) {
      // Default to the first destination in the admin-defined order
      setActiveId((cur) => (destinations.some((d) => d.id === cur) ? cur : destinations[0].id));
      return;
    }
    const match = destinations.find((c) =>
      c.name.toLowerCase().includes(q) ||
      c.programs.some((p) => p.toLowerCase().includes(q)) ||
      c.topUnis.some((u) => u.name.toLowerCase().includes(q) || u.field.toLowerCase().includes(q)),
    );
    setActiveId(match ? match.id : destinations[0].id);
    setTimeout(() => document.getElementById('country-explorer')?.scrollIntoView({ behavior: 'smooth' }), 400);
  }, [search, destinations]);

  const active = destinations.find((c) => c.id === activeId);
  const countryCount = loading ? 'Several' : countWord(destinations.length);

  return (
    <PageWrapper>
      <Navbar />

      <PageHero
        crumbs={[{ label: 'Study Abroad' }]}
        eyebrow="Study abroad"
        title="Where will you study next?"
        lead={`${countryCount} countries, 15+ accredited universities and one trusted guide. We handle everything from your application to your arrival on campus.`}
        aside={
          <div className="card grid grid-cols-3 divide-x divide-cream-200 p-2 text-center">
            {[
              { val: '10,000+', label: 'Students placed' },
              { val: '98%', label: 'Visa approval' },
              { val: loading ? '—' : String(destinations.length), label: 'Countries' },
            ].map((s) => (
              <div key={s.label} className="px-2 py-5">
                <p className="font-display text-2xl font-semibold text-navy sm:text-3xl">{s.val}</p>
                <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Start your application <ArrowRight size={15} /></Link>
          <a href="#country-explorer" className="btn-outline">Browse destinations</a>
        </div>
      </PageHero>

      {/* Country explorer */}
      <section id="country-explorer" className="section scroll-mt-24 bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Compare destinations" title="Explore countries and universities" />

          {/* Destination dropdown (full width of the three cards below) */}
          {destinations.length > 0 && (
            <DestinationSelect destinations={destinations} value={activeId} onChange={setActiveId} />
          )}

          {loading && (
            <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.2fr_1fr]" aria-hidden="true">
              {[0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-cream" />)}
            </div>
          )}
          {!loading && !active && (
            <p className="mt-10 text-center text-ink-muted">Destinations will be listed here soon.</p>
          )}
          {active && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.2fr_1fr]"
            >
              {/* Overview */}
              <div className="flex flex-col rounded-2xl bg-navy p-7 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-light/50 font-display text-sm font-bold text-gold-light">
                    {active.code}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{active.name}</h3>
                    <p className="text-sm text-white/65">{active.tagline}</p>
                  </div>
                </div>
                <span className="chip mt-5 w-fit bg-gold text-white">{active.tag}</span>
                <dl className="mt-auto grid grid-cols-2 gap-3 pt-8">
                  {[
                    { label: 'Universities', value: active.stats.unis, icon: Building2 },
                    { label: 'Avg. tuition', value: active.stats.avgCost, icon: Wallet },
                    { label: 'Acceptance', value: active.stats.acceptance, icon: CheckCircle2 },
                    { label: 'Intl. students', value: active.stats.intl, icon: Users },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl bg-white/[0.07] p-3">
                      <dt className="flex items-center gap-1.5 text-[11px] text-white/60"><Icon size={12} /> {label}</dt>
                      <dd className="mt-1 text-sm font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Universities */}
              <div className="card p-7">
                <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
                  <Landmark size={18} className="text-gold" /> Partner universities
                </h4>
                <ul className="mt-5 space-y-2.5">
                  {active.topUnis.map((u, i) => (
                    <li key={u.name} className="flex items-center justify-between gap-3 rounded-xl border border-cream-200 bg-cream/60 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-navy ring-1 ring-cream-200">{i + 1}</span>
                        <div>
                          <p className="text-sm font-semibold text-ink">{u.name}</p>
                          <p className="text-xs text-ink-muted">{u.field}</p>
                        </div>
                      </div>
                      <span className="chip flex-shrink-0 bg-gold-50 text-gold-dark">{u.rank}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-ink-muted"><Briefcase size={14} /> Avg. graduate salary</span>
                  <span className="font-semibold text-navy">{active.salary}</span>
                </div>
              </div>

              {/* Why here */}
              <div className="card p-7">
                <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
                  <Star size={18} className="text-gold" /> Why study here?
                </h4>
                <ul className="mt-5 space-y-3">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-gold" /> {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-soft">Popular programs</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.programs.map((p) => (
                    <span key={p} className="chip bg-navy-50 text-navy">{p}</span>
                  ))}
                </div>
                <Link href="/contact" className="btn-accent mt-6 w-full">Apply to {active.name} <ArrowRight size={15} /></Link>
              </div>
            </motion.div>
          </AnimatePresence>
          )}
        </div>
      </section>

      {/* Advantages */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading eyebrow="Our advantage" title="Why students choose World Passport" lead="End-to-end support from your first enquiry to your graduation day." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white"><Icon size={22} /></span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Application timeline" title="Your 8-month journey" lead="From your first consultation to landing on campus, we walk every step with you." />
          <ol className="mx-auto mt-14 max-w-3xl">
            {timeline.map((step, i) => {
              const Icon = step.icon;
              const last = i === timeline.length - 1;
              return (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {!last && <span aria-hidden="true" className="absolute left-6 top-14 bottom-0 w-px bg-gold/40" />}
                  <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white ring-4 ring-gold-50">
                    <Icon size={20} />
                  </span>
                  <div className="card flex-1 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-navy-900">{step.title}</h3>
                      <span className="chip bg-gold-50 text-gold-dark">{step.month}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <Features />
      <CTASection className="pt-16 sm:pt-20 lg:pt-24" title="Ready to study abroad?" lead="Book your free 30-minute consultation. Our counsellors will map out your full journey, with no commitment required." />
      <Footer />
    </PageWrapper>
  );
}
