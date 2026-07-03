'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle, GraduationCap,
  BookOpen, Globe, Award, Users, Rocket, BadgeCheck,
  MapPin, Building2, Star, Shield, Briefcase, Clock,
  FileCheck, DollarSign, Plane, MessageCircle, ChevronDown,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const flagMap: Record<string, string> = {
  albania: '🇦🇱', malaysia: '🇲🇾', mauritius: '🇲🇺', malta: '🇲🇹', montenegro: '🇲🇪',
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface UniversityDetail {
  _id: string; name: string; country: string; city?: string; ranking?: string;
  image?: string; description?: string; color?: string;
  about?: string; programs?: string[]; highlights?: string[];
  stats?: { label: string; value: string }[];
}

function FaqSection({ color, universityName, country }: { color: string; universityName: string; country: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'What are the entry requirements?', a: `Entry requirements vary by program. Generally, you need a high school diploma (for Bachelor\'s) or a Bachelor\'s degree (for Master\'s), English proficiency proof, and academic transcripts. Our advisors will guide you through the specific requirements for ${universityName}.` },
    { q: 'Is the degree internationally recognized?', a: `Yes. ${universityName} in ${country} is an accredited institution. Degrees earned here are recognized internationally, and many programs follow the Bologna Process / ECTS framework used across Europe.` },
    { q: 'What is the cost of living?', a: `${country} offers a very affordable cost of living compared to Western Europe. Students typically spend €300–€600/month on accommodation, food, and transport. Our team helps you plan your budget before you arrive.` },
    { q: 'Do you help with visa applications?', a: 'Absolutely. GEC provides end-to-end visa support — from document preparation to embassy appointment booking. We have a 98% visa approval success rate across all our partner countries.' },
    { q: 'Will I get placement or internship support?', a: 'Yes. GEC connects students with internship and job placement opportunities through our partner network of 500+ companies. We also provide CV building, interview coaching, and LinkedIn optimization.' },
    { q: 'Can I work while studying?', a: `International students in ${country} are generally allowed to work part-time during their studies. The exact hours depend on visa regulations. Our team will brief you on the specific rules before departure.` },
  ];

  return (
    <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
      <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><MessageCircle size={20} style={{ color }} /> Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
              <span className="text-gray-800 text-sm font-semibold pr-4">{faq.q}</span>
              <ChevronDown size={16} className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === i && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [uni, setUni] = useState<UniversityDetail | null | undefined>(undefined);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then(r => r.json())
      .then(data => {
        const list: UniversityDetail[] = data.universities || [];
        const found = list.find(u => slugify(u.name) === id);
        setUni(found ?? null);
      })
      .catch(() => setUni(null));
  }, [id]);

  if (uni === undefined) return (
    <PageWrapper>
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
      <Footer />
    </PageWrapper>
  );

  if (!uni) return (
    <PageWrapper>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <Building2 size={48} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">University Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">This university may have been removed or the link is incorrect.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );

  const color = uni.color || '#3B82F6';
  const flag = flagMap[uni.country.toLowerCase()] ?? '🏫';
  const programs = uni.programs ?? [];
  const highlights = uni.highlights ?? [];
  const stats = uni.stats ?? [];

  return (
    <main className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 30%, #E0F2FE 60%, #F0F9FF 100%)' }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="relative z-10">
      <Navbar />

      {/* HERO */}
      <motion.section initial="hidden" animate="visible" variants={stagger} className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp}>
            <Link href="/#universities" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Universities
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden relative min-h-[320px] flex items-end">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${uni.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${color}30 0%, ${color}EE 100%)` }} />
            <div className="absolute top-6 right-8 opacity-[0.08]"><GraduationCap size={180} className="text-white" /></div>

            <div className="relative z-10 p-8 sm:p-12 w-full">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
                <span className="px-4 py-1.5 rounded-full bg-white/25 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">{flag} {uni.country}</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><MapPin size={11} /> {uni.city}</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><Award size={11} /> {uni.ranking}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight">{uni.name}</motion.h1>
              <motion.p variants={fadeUp} className="text-white/70 text-base sm:text-lg max-w-2xl">{uni.description}</motion.p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS BAR */}
      <section className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <GraduationCap size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm">{s.value}</div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 space-y-6">

            {/* About */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><Building2 size={20} style={{ color }} /> About {uni.name}</h2>
              <p className="text-gray-600 leading-relaxed">{uni.about}</p>
            </motion.div>

            {/* Why This University */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Star size={20} style={{ color }} /> Why Choose This University?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <CheckCircle size={16} style={{ color }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Programs */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><BookOpen size={20} style={{ color }} /> Programs Offered</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {programs.map((p) => (
                  <div key={p} className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                      <GraduationCap size={16} style={{ color }} />
                    </div>
                    <span className="text-gray-800 text-sm font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><FileCheck size={20} style={{ color }} /> Admission Requirements</h2>
              <div className="space-y-3">
                {['High school diploma or equivalent for Bachelor programs', 'Bachelor degree for Master programs', 'English proficiency (IELTS/TOEFL or equivalent)', 'Valid passport and student visa eligibility', 'Academic transcripts and recommendation letters', 'Statement of purpose / motivation letter'].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle size={16} style={{ color }} className="flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <FaqSection color={color} universityName={uni.name} country={uni.country} />
          </motion.div>

          {/* SIDEBAR */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg sticky top-24">
              <div className="text-center mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 10px 25px ${color}35` }}>
                  <GraduationCap size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{uni.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{flag} {uni.city}, {uni.country}</p>
              </div>
              <div className="space-y-2.5 mb-6">
                {[
                  { icon: MapPin, label: 'Location', value: `${uni.city}, ${uni.country}` },
                  { icon: Award, label: 'Ranking', value: uni.ranking },
                  { icon: BadgeCheck, label: 'Status', value: 'Accredited' },
                  { icon: Globe, label: 'Recognition', value: 'International' },
                ].map((item) => { const Icon = item.icon; return (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Icon size={14} /> {item.label}</span>
                    <span className="font-semibold text-sm text-gray-900">{item.value}</span>
                  </div>
                ); })}
              </div>
              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all hover:scale-[1.02] shadow-lg"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 8px 20px ${color}30` }}>
                Apply Now <ArrowRight size={16} />
              </Link>
              <p className="text-center text-[10px] text-gray-400 mt-3">Free consultation available</p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-3xl p-6 border shadow-lg" style={{ background: `linear-gradient(135deg, ${color}08, ${color}04)`, borderColor: `${color}20` }}>
              <Plane size={24} style={{ color }} className="mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-2">GEC Support</h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">From application to arrival — visa support, accommodation help, and on-ground assistance.</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                  <div className="font-black text-lg" style={{ color }}>98%</div>
                  <div className="text-gray-400 text-[9px] uppercase">Visa Success</div>
                </div>
                <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                  <div className="font-black text-lg" style={{ color }}>24/7</div>
                  <div className="text-gray-400 text-[9px] uppercase">Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 text-center shadow-lg" style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}>
            <h2 className="font-black text-2xl sm:text-3xl text-white mb-3">Ready to Study at {uni.name}?</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm">Book a free consultation with our advisors. We'll guide you through admission, visa, and arrival.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="px-8 py-3.5 rounded-full font-bold text-gray-900 bg-white shadow-lg flex items-center gap-2 text-sm hover:scale-105 transition-transform">
                Book Consultation <ArrowRight size={15} />
              </Link>
              <Link href="/overseas" className="px-8 py-3.5 rounded-full font-semibold text-white/80 border border-white/30 hover:bg-white/10 text-sm flex items-center gap-2">
                <Globe size={15} /> Explore All Destinations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
