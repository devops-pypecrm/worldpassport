'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import AOSInit from '@/components/AOSInit';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Globe, GraduationCap, DollarSign, FileCheck, Plane, BookOpen,
  MapPin, Users, Star, ChevronRight, ArrowRight, CheckCircle,
  Clock, Award, Briefcase, TrendingUp, Building2, BadgeCheck,
  Landmark, FlaskConical, Zap,
} from 'lucide-react';
import Image from 'next/image';

/* ── Country Data ── */
const countries = [
  {
    id: 'al', name: 'Albania', flag: '🇦🇱', color: '#DC2626',
    img: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=700&q=80',
    tagline: 'Affordable European Education Hub',
    tag: 'Most Popular',
    stats: { unis: '5', avgCost: '€2k–5k/yr', acceptance: '80%', intl: '10k+' },
    highlights: ['Affordable tuition & living costs', 'EU-aligned academic standards', 'English-taught programs available', 'Growing international student community'],
    topUnis: [
      { name: 'Canadian Institute of Technology', rank: 'Top Private', field: 'Technology' },
      { name: 'Western Balkans University', rank: 'Accredited', field: 'Business' },
      { name: 'Mediterranean University of Albania', rank: 'Accredited', field: 'Sciences' },
      { name: 'Epoka University', rank: 'Top Ranked', field: 'Engineering' },
      { name: 'Luarasi University', rank: 'Accredited', field: 'Law & Business' },
    ],
    programs: ['BSc Computer Science', 'MBA', 'Engineering', 'Data Science'],
    salary: '€15,000+',
  },
  {
    id: 'my', name: 'Malaysia', flag: '🇲🇾', color: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=700&q=80',
    tagline: 'Asia\'s Education Gateway',
    tag: 'Top Value',
    stats: { unis: '2', avgCost: '$3k–8k/yr', acceptance: '75%', intl: '130k+' },
    highlights: ['World-class maritime education', 'Affordable cost of living', 'Multicultural learning environment', 'Strong industry connections'],
    topUnis: [
      { name: 'ALAM', rank: 'Top Maritime', field: 'Maritime Studies' },
      { name: 'Geomatika University College', rank: 'Accredited', field: 'Technology' },
    ],
    programs: ['Maritime Studies', 'BSc IT', 'Diploma Programs', 'Engineering'],
    salary: '$18,000+',
  },
  {
    id: 'mu', name: 'Mauritius', flag: '🇲🇺', color: '#00C9B0',
    img: 'https://images.unsplash.com/photo-1589979481223-deb893043163?w=700&q=80',
    tagline: 'Island Education Excellence',
    tag: 'Emerging',
    stats: { unis: '3', avgCost: '$4k–10k/yr', acceptance: '78%', intl: '5k+' },
    highlights: ['English-medium instruction', 'International branch campuses', 'Hospitality & business focus', 'Safe & beautiful study environment'],
    topUnis: [
      { name: 'VIT Mauritius', rank: 'Top Branch', field: 'Engineering' },
      { name: 'Aura Institute of Business & Hospitality', rank: 'Accredited', field: 'Hospitality' },
      { name: 'Brighton International Business School', rank: 'Accredited', field: 'Business' },
    ],
    programs: ['BSc Engineering', 'BBA', 'Hospitality Management', 'MBA'],
    salary: '$15,000+',
  },
  {
    id: 'mt', name: 'Malta', flag: '🇲🇹', color: '#FFB800',
    img: 'https://images.unsplash.com/photo-1614094082869-cd4e6b420843?w=700&q=80&auto=format&fit=crop',
    tagline: 'Mediterranean EU Education',
    tag: 'EU Member',
    stats: { unis: '4', avgCost: '€4k–8k/yr', acceptance: '72%', intl: '8k+' },
    highlights: ['EU member state — Schengen access', 'English is official language', 'Strong vocational training', 'Post-study work opportunities'],
    topUnis: [
      { name: 'Global College Malta', rank: 'Accredited', field: 'Business' },
      { name: 'MCAST', rank: 'Top Public', field: 'Vocational' },
      { name: 'IDEA College', rank: 'Accredited', field: 'Creative Arts' },
      { name: 'ECI', rank: 'Accredited', field: 'Technology' },
    ],
    programs: ['BSc IT', 'Diploma Studies', 'Business Management', 'Creative Arts'],
    salary: '€22,000+',
  },
  {
    id: 'me', name: 'Montenegro', flag: '🇲🇪', color: '#A855F7',
    img: 'https://images.unsplash.com/photo-1592486058517-36236c9c37f4?w=700&q=80&auto=format&fit=crop',
    tagline: 'Adriatic Academic Gateway',
    tag: 'Rising Star',
    stats: { unis: '1', avgCost: '€2k–4k/yr', acceptance: '82%', intl: '3k+' },
    highlights: ['Very affordable education', 'Beautiful Adriatic location', 'EU candidate country', 'Growing international programs'],
    topUnis: [
      { name: 'University of Montenegro', rank: 'National Top', field: 'Multi-discipline' },
    ],
    programs: ['BSc Engineering', 'BA Tourism', 'MSc Sciences', 'MBA'],
    salary: '€12,000+',
  },
];

/* ── Program Levels ── */
const programLevels = [
  {
    level: "Bachelor's", duration: '3–4 years', cost: '€8k–20k/yr',
    intake: 'Sep / Feb', color: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    perks: ['Foundation degree', 'Wide subject choice', 'Exchange programs'],
  },
  {
    level: "Master's", duration: '1–2 years', cost: '€10k–25k/yr',
    intake: 'Sep / Feb', color: '#FF3B3B',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    perks: ['Specialised expertise', 'High ROI', 'Industry connections'],
  },
  {
    level: 'PhD', duration: '3–4 years', cost: 'Often funded',
    intake: 'Rolling', color: '#00C9B0',
    img: 'https://images.unsplash.com/photo-1532094349884-543559373509?w=600&q=80',
    perks: ['Research stipend', 'Global recognition', 'Academic career path'],
  },
  {
    level: 'MBA', duration: '1–2 years', cost: '€15k–40k/yr',
    intake: 'Sep', color: '#FFB800',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    perks: ['Leadership skills', 'Global network', 'C-suite career'],
  },
];

/* ── Scholarships ── */
const scholarships = [
  { name: 'Erasmus+ Grant', country: '🇪🇺', amount: '€800–1,200/month', coverage: 75, color: '#3B82F6', type: 'EU Program' },
  { name: 'Albania Merit Scholarship', country: '🇦🇱', amount: 'Up to 50% tuition', coverage: 50, color: '#DC2626', type: 'University' },
  { name: 'Malta Government Scholarship', country: '🇲🇹', amount: '€2,000/yr', coverage: 40, color: '#FFB800', type: 'Government' },
  { name: 'Malaysia International Scholarship', country: '🇲🇾', amount: 'Full tuition', coverage: 85, color: '#00C9B0', type: 'Government' },
];

/* ── Services ── */
const services = [
  { icon: BookOpen, title: 'Program Selection', desc: 'AI-matched program recommendations from 100+ partner universities tailored to your profile.', color: '#3B82F6' },
  { icon: FileCheck, title: 'Application Support', desc: 'End-to-end application: SOP, LOR, CV, transcripts — all expertly crafted and reviewed.', color: '#FF3B3B' },
  { icon: DollarSign, title: 'Scholarship Guidance', desc: 'We identify scholarships worth thousands of euros and guide you through every application.', color: '#00C9B0' },
  { icon: Plane, title: 'Visa Assistance', desc: 'Step-by-step student visa support with our near-100% approval success rate.', color: '#FFB800' },
  { icon: Globe, title: 'Pre-Departure Briefing', desc: 'Cultural orientation, housing, banking, SIM cards — everything ready before you fly.', color: '#A855F7' },
  { icon: GraduationCap, title: 'Post-Arrival Support', desc: 'On-ground assistance and alumni network access from arrival to graduation.', color: '#FF6B00' },
];

/* ── Timeline ── */
const timeline = [
  { month: 'Month 1–2', title: 'Profile Assessment', desc: 'We evaluate your academics, goals, and budget to shortlist ideal programs.', icon: Star, color: '#3B82F6' },
  { month: 'Month 2–3', title: 'Application Prep', desc: 'SOP drafting, document collection, LOR coordination, CV polishing.', icon: FileCheck, color: '#FF3B3B' },
  { month: 'Month 3–4', title: 'Submit Applications', desc: 'Applications submitted to 5–8 universities with full tracking.', icon: Zap, color: '#00C9B0' },
  { month: 'Month 4–6', title: 'Receive Offers', desc: 'Offer letters arrive — we help you compare and accept the best one.', icon: Award, color: '#FFB800' },
  { month: 'Month 6–7', title: 'Visa & Finance', desc: 'Student visa application, scholarship disbursement, tuition deposit.', icon: BadgeCheck, color: '#A855F7' },
  { month: 'Month 7–8', title: 'Fly & Settle', desc: 'Pre-departure briefing, airport pick-up coordination, on-ground help.', icon: Plane, color: '#FF6B00' },
];

/* ── Demand bar ── */
function ScholarshipBar({ name, amount, coverage, color, country, type, index }: {
  name: string; amount: string; coverage: number; color: string;
  country: string; type: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12 }}
      className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm"
      style={{ border: '1px solid rgb(229,231,235)' }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-lg">{country}</span>
            <span className="text-gray-900 font-semibold text-sm">{name}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${color}18`, color }}>{type}</span>
        </div>
        <div className="text-right">
          <div className="text-gray-900 font-bold text-sm">{amount}</div>
          <div className="text-gray-400 text-xs">coverage</div>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgb(243,244,246)' }}>
        <motion.div className="h-full rounded-full"
          initial={{ width: 0 }} animate={inView ? { width: `${coverage}%` } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.9, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
      </div>
      <div className="flex justify-between mt-1.5 text-xs text-gray-400">
        <span>0%</span><span style={{ color }}>{coverage}% covered</span>
      </div>
    </motion.div>
  );
}

export default function OverseasPage() {
  const [activeCountry, setActiveCountry] = useState('al');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get('search') || '').toLowerCase();
    if (q) {
      const match = countries.find(c =>
        c.name.toLowerCase().includes(q) ||
        c.programs.some(p => p.toLowerCase().includes(q)) ||
        c.topUnis.some(u => u.name.toLowerCase().includes(q) || u.field.toLowerCase().includes(q))
      );
      if (match) setActiveCountry(match.id);
      setTimeout(() => {
        document.getElementById('country-explorer')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const active = countries.find(c => c.id === activeCountry)!;

  return (
    <PageWrapper bg="/assets/page-bg-uni.jpg">

      <AOSInit />
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=85&auto=format&fit=crop')",
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
              <div className="flex items-center gap-2 mb-5 text-sm">
                <MapPin size={13} className="text-blue-400" />
                <span className="text-white/60">India</span>
                <span className="text-blue-400">→</span>
                <span className="text-white font-semibold">Europe</span>
              </div>

              <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
                Where Will You<br />Study Next?
              </h1>
              <p className="text-white/70 text-base sm:text-lg mb-8 max-w-lg">
                5 countries. 15+ universities. 1 trusted guide.
                We handle everything from application to arrival.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/contact"
                  className="px-7 py-3 rounded-full font-semibold text-gray-900 bg-white shadow-lg flex items-center gap-2 text-sm hover:scale-105 transition-transform">
                  Start Your Journey <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => document.getElementById('country-explorer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-7 py-3 rounded-full font-semibold text-white/80 border border-white/25 hover:bg-white/10 transition-all text-sm">
                  Browse Destinations
                </button>
              </div>

              <div className="flex flex-wrap gap-5">
                {[
                  { val: '10,000+', label: 'Students Placed' },
                  { val: '98%', label: 'Visa Approval' },
                  { val: '5', label: 'Countries' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-white font-bold text-lg">{s.val}</div>
                    <div className="text-white/40 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Country Explorer ── */}
      <section id="country-explorer" className="py-8 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/60">

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {countries.map(c => (
              <button key={c.id}
                onClick={() => setActiveCountry(c.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: activeCountry === c.id ? c.color : '#fff',
                  color: activeCountry === c.id ? '#fff' : 'rgb(75,85,99)',
                  border: `1px solid ${activeCountry === c.id ? c.color : 'rgb(229,231,235)'}`,
                  boxShadow: activeCountry === c.id ? `0 4px 16px ${c.color}40` : 'none',
                }}>
                <span className="text-sm">{c.flag}</span> {c.name}
                {c.tag && activeCountry === c.id && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{c.tag}</span>
                )}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCountry}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-5 gap-5">

              {/* Left — image + stats (2 cols) */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[280px]"
                style={{ border: `1px solid ${active.color}30` }}>
                <img src={active.img} alt={active.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.70) 100%)' }} />

                <div className="relative p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{active.flag}</span>
                      <div>
                        <h3 className="font-bold text-xl text-white leading-tight">{active.name}</h3>
                        <p className="text-white/60 text-xs">{active.tagline}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                      style={{ background: `${active.color}30`, color: 'white', border: `1px solid ${active.color}50` }}>
                      {active.tag}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {[
                      { label: 'Universities', value: active.stats.unis, icon: Building2 },
                      { label: 'Avg. Cost', value: active.stats.avgCost, icon: DollarSign },
                      { label: 'Acceptance', value: active.stats.acceptance, icon: CheckCircle },
                      { label: 'Intl Students', value: active.stats.intl, icon: Users },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-lg p-2 flex items-center gap-2"
                        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                        <Icon size={12} className="text-white flex-shrink-0" />
                        <div>
                          <div className="text-white font-bold text-xs">{value}</div>
                          <div className="text-white/50 text-[10px]">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center — top universities (2 cols) */}
              <div className="lg:col-span-2 rounded-2xl p-5 bg-white border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <Landmark size={14} style={{ color: active.color }} /> Top Universities
                </h4>
                <div className="space-y-2">
                  {active.topUnis.map((uni, i) => (
                    <div key={uni.name}
                      className="flex items-center justify-between rounded-lg px-3 py-2"
                      style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                          style={{ background: `${active.color}15`, color: active.color }}>{i + 1}</div>
                        <div>
                          <div className="text-gray-900 text-xs font-semibold">{uni.name}</div>
                          <div className="text-gray-400 text-[10px]">{uni.field}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: `${active.color}10`, color: active.color }}>{uni.rank}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg p-2 flex items-center justify-between"
                  style={{ background: `${active.color}08`, border: `1px solid ${active.color}15` }}>
                  <span className="text-gray-500 text-xs flex items-center gap-1.5"><Briefcase size={12} /> Avg. Salary</span>
                  <span className="font-bold text-sm" style={{ color: active.color }}>{active.salary}</span>
                </div>
              </div>

              {/* Right — highlights + programs (1 col) */}
              <div className="lg:col-span-1 rounded-2xl p-5 bg-white border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <Star size={14} style={{ color: active.color }} /> Why Here?
                </h4>
                <ul className="space-y-2">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                      <CheckCircle size={11} className="mt-0.5 flex-shrink-0" style={{ color: active.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {active.programs.map(p => (
                    <span key={p} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${active.color}10`, color: active.color }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Why Study With Us ── */}
      <section className="py-16 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
          <div className="text-center mb-10">
            <span className="badge badge-blue mb-4">Our Advantage</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-3">
              Why Students <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">End-to-end support from first inquiry to successful graduation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: FileCheck, title: 'Zero Hidden Fees', desc: 'Complete transparency in pricing — what we quote is what you pay.', color: '#3B82F6' },
              { icon: Users, title: 'Personal Counsellor', desc: 'A dedicated advisor who knows your profile and guides every step.', color: '#DC2626' },
              { icon: Award, title: '98% Visa Success', desc: 'Near-perfect visa approval rate with our expert documentation support.', color: '#00C9B0' },
              { icon: Plane, title: 'Arrival Support', desc: 'Airport pickup, accommodation, banking — everything ready when you land.', color: '#FFB800' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Application Timeline ── */}
      <section className="py-16 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="badge badge-blue mb-4">Process</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Your <span className="text-gradient">8-Month Journey</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">From initial consultation to landing in Europe — we walk every step with you</p>
          </motion.div>

          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0.05) 100%)' }} />

            <div className="space-y-6">
              {timeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.title}
                    initial={{ opacity: 0, x: -30 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="relative flex gap-6 group">

                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }} animate={timelineInView ? { scale: 1 } : {}}
                        transition={{ delay: i * 0.12 + 0.2, type: 'spring', bounce: 0.4 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: `${step.color}18`, border: `1px solid ${step.color}35`, boxShadow: `0 0 15px ${step.color}10` }}>
                        <Icon size={22} style={{ color: step.color }} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-2xl p-5 group-hover:border-gray-300 transition-all"
                      style={{ background: '#fff', border: '1px solid rgb(229,231,235)' }}>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-display font-bold text-gray-900">{step.title}</h3>
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ml-2"
                          style={{ background: `${step.color}10`, color: step.color }}>
                          {step.month}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge badge-blue mb-4">Support</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Everything You <span className="text-gradient">Need</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">End-to-end support so you can focus on your future, not the paperwork</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isHov = hoveredService === s.title;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  onHoverStart={() => setHoveredService(s.title)}
                  onHoverEnd={() => setHoveredService(null)}
                  whileHover={{ y: -8 }}
                  className="relative rounded-3xl p-7 cursor-default transition-all"
                  style={{
                    background: '#fff',
                    border: `1px solid ${isHov ? s.color + '40' : 'rgb(229,231,235)'}`,
                    boxShadow: isHov ? '0 8px 30px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, opacity: isHov ? 1 : 0 }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, boxShadow: isHov ? `0 0 20px ${s.color}20` : 'none' }}>
                    <Icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: s.color }}>
                    Learn more <ChevronRight size={12} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative" style={{ background: 'linear-gradient(to bottom right, #0F172A, #1E293B)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 0 80px rgba(37,99,235,0.08)' }}>

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)' }}>
              <Plane size={30} style={{ color: '#3B82F6' }} />
            </div>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Ready to Study in <span className="text-gradient">Europe?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Book your free 30-minute consultation. Our advisors will map out your full journey — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-9 py-4 rounded-full font-semibold text-gray-900 bg-white shadow-lg"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  Book Free Consultation
                </motion.button>
              </Link>
              <Link href="/recruitment">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-9 py-4 rounded-full font-semibold text-white/70 border border-white/10 hover:border-primary/40 hover:text-white transition-all">
                  Explore Recruitment
                </motion.button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { icon: BadgeCheck, label: '98% Visa Success' },
                { icon: Users, label: '10,000+ Students' },
                { icon: Award, label: 'ISO Certified' },
                { icon: Globe, label: '6 Countries' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={15} className="text-primary" /> {label}
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


