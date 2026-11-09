'use client';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Briefcase, Users, Star, Building2, ArrowRight, MapPin,
  CheckCircle, Clock, Award, BadgeCheck, ChevronRight,
  Stethoscope, Cpu, UtensilsCrossed, Landmark, GraduationCap,
  HardHat, Globe, TrendingUp, Zap, FileText, Phone,
} from 'lucide-react';

/* ── Sectors (from screenshots) ── */
const sectors = [
  {
    id: 'health', icon: Stethoscope, title: 'Healthcare & Nursing',
    countries: 'Germany, Netherlands, UK', roles: '200+ roles', color: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    desc: 'Qualified nurses, doctors, and paramedics placed in top European hospitals and clinics.',
    skills: ['RN / BSN', 'General Practice', 'ICU / Critical Care', 'Elderly Care'],
    salary: '€32,000–€60,000',
  },
  {
    id: 'eng', icon: Cpu, title: 'Engineering & Technology',
    countries: 'Germany, Sweden, Denmark', roles: '350+ roles', color: '#FF3B3B',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    desc: 'Software, mechanical, and electrical engineers placed at leading European tech firms.',
    skills: ['Software Dev', 'Mechanical Eng', 'Electrical Eng', 'DevOps / Cloud'],
    salary: '€45,000–€80,000',
  },
  {
    id: 'hosp', icon: UtensilsCrossed, title: 'Hospitality & Tourism',
    countries: 'France, Spain, Italy', roles: '180+ roles', color: '#FFB800',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    desc: 'Hotel management, chefs, and tourism professionals placed across Europe\'s top destinations.',
    skills: ['Hotel Management', 'Chef / Culinary', 'Front Desk', 'Event Management'],
    salary: '€28,000–€45,000',
  },
  {
    id: 'fin', icon: Landmark, title: 'Finance & Banking',
    countries: 'Luxembourg, Switzerland, UK', roles: '120+ roles', color: '#00C9B0',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    desc: 'Finance analysts, accountants, and bankers at European financial institutions.',
    skills: ['Financial Analysis', 'Accounting', 'Investment Banking', 'Compliance'],
    salary: '€50,000–€90,000',
  },
  {
    id: 'edu', icon: GraduationCap, title: 'Education & Teaching',
    countries: 'Netherlands, Belgium, Ireland', roles: '90+ roles', color: '#A855F7',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    desc: 'Teachers, lecturers, and education professionals at schools and universities across Europe.',
    skills: ['K-12 Teaching', 'University Lecturer', 'Special Education', 'STEM Teaching'],
    salary: '€30,000–€55,000',
  },
  {
    id: 'const', icon: HardHat, title: 'Construction & Trades',
    countries: 'Germany, Austria, Norway', roles: '250+ roles', color: '#FF6B00',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    desc: 'Skilled tradespeople, civil engineers, and project managers for Europe\'s booming construction sector.',
    skills: ['Civil Engineering', 'Project Management', 'Electricians', 'Plumbers'],
    salary: '€35,000–€65,000',
  },
];

/* ── How It Works (from screenshots) ── */
const steps = [
  {
    num: '01', title: 'Register Your Profile',
    desc: 'Submit your qualifications, experience, and preferred destination country.',
    icon: FileText, color: '#3B82F6',
  },
  {
    num: '02', title: 'Skills Assessment',
    desc: 'We evaluate your profile and match you with suitable European employers.',
    icon: Star, color: '#FF3B3B',
  },
  {
    num: '03', title: 'Interview & Offer',
    desc: 'Connect directly with employers for interviews and receive job offers.',
    icon: Phone, color: '#00C9B0',
  },
  {
    num: '04', title: 'Visa & Relocation',
    desc: 'We assist with work visa applications and pre-departure preparation.',
    icon: Globe, color: '#FFB800',
  },
];

/* ── Services ── */
const services = [
  { icon: Users, title: 'Campus Recruitment', desc: 'Structured campus drives and career fairs connecting Indian talent with top European employers.', color: '#3B82F6' },
  { icon: Building2, title: 'Corporate Hiring', desc: 'Partnered with 200+ European companies seeking skilled Indian professionals for global teams.', color: '#FF3B3B' },
  { icon: Star, title: 'Profile Building', desc: 'Resume reviews, interview coaching, and LinkedIn optimization to land your dream role.', color: '#00C9B0' },
  { icon: Briefcase, title: 'Internship Placement', desc: 'Secured internships in Europe for 2,000+ students, opening doors to full-time opportunities.', color: '#FFB800' },
];

export default function RecruitmentPage() {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' });

  return (
    <PageWrapper>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden"
        style={{ background: '#1B2B5A' }}>

        {/* Ambient glows */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ background: 'rgba(220,38,38,0.10)', border: '1px solid rgba(220,38,38,0.30)', color: '#FCA5A5' }}>
              <Briefcase size={14} /> Career & Placement
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-5 leading-tight">
              Launch Your<br />
              <span style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Global Career
              </span>
            </h1>
            <p className="text-white/55 text-lg max-w-lg mb-8 leading-relaxed">
              We connect skilled Indian professionals with 200+ top European employers across 6 sectors and 12 countries. From profile to placement — zero hassle.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { val: '5,000+', label: 'Placed Professionals' },
                { val: '200+', label: 'EU Employers' },
                { val: '98%', label: 'Visa Success' },
              ].map(s => (
                <div key={s.label} className="px-4 py-2 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <span className="font-bold text-white">{s.val}</span>
                  <span className="text-white/40 text-xs ml-1.5">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full font-semibold text-white flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #B91C1C)', boxShadow: '0 4px 25px rgba(220,38,38,0.35)' }}>
                  Register Your Profile <ArrowRight size={16} />
                </motion.button>
              </Link>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('sectors')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 rounded-full font-semibold text-white/80 border border-white/20 hover:border-red-600/40 hover:text-white transition-all">
                Browse Sectors
              </motion.button>
            </div>
          </motion.div>

          {/* Right — floating job cards */}
          <div className="hidden lg:block relative h-[480px]">
            {/* Background ring */}
            <motion.div className="absolute inset-0 rounded-full border border-gray-200 m-16"
              animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />

            {/* Floating role cards */}
            {[
              { title: 'Senior Nurse', loc: 'Berlin, Germany', salary: '€48k', color: '#3B82F6', top: '8%', left: '5%', delay: 0 },
              { title: 'Software Engineer', loc: 'Stockholm, Sweden', salary: '€72k', color: '#FF3B3B', top: '15%', right: '0%', delay: 0.5 },
              { title: 'Hotel Manager', loc: 'Paris, France', salary: '€42k', color: '#FFB800', top: '50%', left: '0%', delay: 1.0 },
              { title: 'Finance Analyst', loc: 'Zurich, Switzerland', salary: '€85k', color: '#00C9B0', bottom: '10%', right: '5%', delay: 0.8 },
              { title: 'Civil Engineer', loc: 'Oslo, Norway', salary: '€60k', color: '#FF6B00', bottom: '18%', left: '8%', delay: 1.4 },
            ].map((card, i) => (
              <motion.div key={card.title}
                className="absolute rounded-2xl px-4 py-3 min-w-[180px]"
                style={{
                  top: card.top, bottom: (card as {bottom?: string}).bottom,
                  left: card.left, right: (card as {right?: string}).right,
                  background: '#fff', border: '1px solid rgb(229,231,235)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{
                  opacity: { delay: card.delay, duration: 0.5 },
                  scale: { delay: card.delay, duration: 0.5 },
                  y: { delay: card.delay, duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: card.color }} />
                  <span className="text-gray-900 text-xs font-semibold">{card.title}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-[11px] mb-1">
                  <MapPin size={9} /> {card.loc}
                </div>
                <div className="text-xs font-bold" style={{ color: card.color }}>{card.salary}/yr</div>
              </motion.div>
            ))}

            {/* Center badge */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex flex-col items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ background: 'radial-gradient(circle at 35% 35%, #7C1D1D, #060b18)', border: '2px solid rgba(220,38,38,0.4)', boxShadow: '0 0 60px rgba(220,38,38,0.25)' }}>
              <Briefcase size={32} style={{ color: '#DC2626' }} />
              <span className="text-white text-[10px] font-bold mt-1">1190+ Roles</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sector Grid ── */}
      <section id="sectors" className="py-24 relative bg-[#F8FAFC]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge badge-blue mb-4">Industries</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Sectors We <span className="text-gradient">Place In</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Click any sector to see roles, skills and salary ranges</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeSector === s.id;
              return (
                <motion.div key={s.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.6 }}
                  onHoverStart={() => setHoveredSector(s.id)}
                  onHoverEnd={() => setHoveredSector(null)}
                  onClick={() => setActiveSector(isActive ? null : s.id)}
                  whileHover={{ y: -8 }}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group"
                  style={{
                    border: `1px solid ${isActive ? s.color + '60' : hoveredSector === s.id ? s.color + '35' : 'rgb(229,231,235)'}`,
                    minHeight: isActive ? 'auto' : 280,
                    boxShadow: isActive ? `0 0 40px ${s.color}15` : 'none',
                  }}>

                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />

                  {/* Background image */}
                  <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${s.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.45 }} />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.40) 50%, rgba(255,255,255,0.65) 100%)` }} />

                  {/* Role count watermark */}
                  <div className="absolute top-4 right-5 font-display font-black text-5xl leading-none select-none pointer-events-none opacity-[0.06]"
                    style={{ color: s.color }}>{s.roles.split('+')[0]}</div>

                  <div className="relative p-7 flex flex-col h-full">
                    {/* Icon + title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}18`, border: `1px solid ${s.color}35` }}>
                        <Icon size={22} style={{ color: s.color }} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-gray-900 leading-tight">{s.title}</h3>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                          <MapPin size={10} /> {s.countries}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}>
                        <Briefcase size={10} className="inline mr-1" />{s.roles}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        {isActive ? 'Click to close' : 'Click for details'} <ChevronRight size={11} />
                      </span>
                    </div>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-gray-200">
                          <div className="mb-3">
                            <div className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Top Roles</div>
                            <div className="flex flex-wrap gap-1.5">
                              {s.skills.map(sk => (
                                <span key={sk} className="text-xs px-2.5 py-1 rounded-full font-medium"
                                  style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}>
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-xl px-3 py-2.5"
                            style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                            <span className="text-gray-500 text-xs">Salary Range</span>
                            <span className="font-bold text-sm" style={{ color: s.color }}>{s.salary}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `inset 0 0 0 1px ${s.color}35` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="badge badge-blue mb-4">Process</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-md mx-auto">Your journey to working abroad in 4 simple steps</p>
          </motion.div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(90deg, rgba(37,99,235,0.4), rgba(220,38,38,0.4), rgba(0,201,176,0.4), rgba(255,184,0,0.4))' }} />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num}
                  initial={{ opacity: 0, y: 40 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-3xl p-7 text-center group cursor-default"
                  style={{ background: '#fff', border: '1px solid rgb(229,231,235)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>

                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />

                  {/* Step number badge */}
                  <motion.div
                    initial={{ scale: 0 }} animate={stepsInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.2, type: 'spring', bounce: 0.5 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 relative"
                    style={{ background: `${step.color}18`, border: `2px solid ${step.color}50`, boxShadow: `0 0 20px ${step.color}20` }}>
                    <span className="font-display font-black text-lg" style={{ color: step.color }}>{step.num}</span>
                  </motion.div>

                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                    <Icon size={18} style={{ color: step.color }} />
                  </div>

                  <h3 className="font-display font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

                  <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `inset 0 0 0 1px ${step.color}35` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 relative bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge badge-blue mb-4">What We Do</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Recruitment <span className="text-gradient">Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl p-7 flex gap-5 cursor-default group"
                  style={{ background: '#fff', border: '1px solid rgb(229,231,235)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                    <Icon size={24} style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color: s.color }}>
                      Learn more <ChevronRight size={12} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="badge badge-blue mb-4">Why GEC</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-5">
                Why Trust Us With<br /><span className="text-gradient">Your Career?</span>
              </h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                We&apos;re not just a job portal. We&apos;re your career partners — from day one to your first day at work in Europe.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Direct employer relationships — no middlemen',
                  'Dedicated placement advisor for every candidate',
                  'Work visa and relocation support included',
                  'Post-placement check-ins for 6 months',
                  'Free resume and interview coaching',
                ].map(pt => (
                  <li key={pt} className="flex items-center gap-2.5 text-gray-600 text-sm">
                    <CheckCircle size={15} className="text-blue-600 flex-shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full font-semibold text-white flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #B91C1C)', boxShadow: '0 4px 25px rgba(220,38,38,0.35)' }}>
                  Talk to a Placement Advisor <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '5,000+', label: 'Placed Professionals', color: '#3B82F6', icon: Users },
                { val: '200+', label: 'EU Partner Employers', color: '#FF3B3B', icon: Building2 },
                { val: '12', label: 'European Countries', color: '#00C9B0', icon: Globe },
                { val: '98%', label: 'Visa Success Rate', color: '#FFB800', icon: BadgeCheck },
                { val: '6', label: 'Industry Sectors', color: '#A855F7', icon: TrendingUp },
                { val: '48h', label: 'Response Time', color: '#FF6B00', icon: Zap },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl p-5 text-center cursor-default"
                    style={{ background: '#fff', border: '1px solid rgb(229,231,235)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <Icon size={20} className="mx-auto mb-2" style={{ color: stat.color }} />
                    <div className="font-display font-bold text-2xl text-gray-900">{stat.val}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative" style={{ background: '#1B2B5A' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.10)' }}>

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)' }}>
              <Globe size={30} style={{ color: '#DC2626' }} />
            </div>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Ready to Work <span style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Abroad?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Submit your profile today and our team will reach out within 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-9 py-4 rounded-full font-semibold text-white flex items-center gap-2 mx-auto sm:mx-0"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #B91C1C)', boxShadow: '0 4px 25px rgba(220,38,38,0.35)' }}>
                  Get Started <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link href="/overseas">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-9 py-4 rounded-full font-semibold text-white/70 border border-white/10 hover:border-red-600/40 hover:text-white transition-all">
                  Explore Study Abroad
                </motion.button>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { icon: BadgeCheck, label: '98% Visa Success' },
                { icon: Users, label: '5,000+ Placed' },
                { icon: Award, label: 'ISO Certified' },
                { icon: Clock, label: '48h Response' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={15} style={{ color: '#DC2626' }} /> {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}
