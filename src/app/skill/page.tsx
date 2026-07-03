'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle, ArrowRight, Globe, Star, Award,
  Briefcase, BookOpen, Building2, GraduationCap,
  Monitor, BarChart3, ShoppingCart, Megaphone,
  Glasses, Home, Stethoscope, Brain, Cpu,
  BadgeCheck, Shield, Users, Rocket, MapPin, Zap,
  ChevronRight,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const iconMap: Record<string, typeof Cpu> = { Cpu, Brain, ShoppingCart, BarChart3, Megaphone, Glasses, Home, Stethoscope, BookOpen };

interface SkillUniversityEntry {
  _id: string; slug: string; name: string; shortName: string; subtitle?: string;
  color: string; flag?: string; logo?: string; bgImage?: string; description?: string;
}
interface SkillCourseEntry {
  _id: string; slug: string; title: string; universityId: string; universityName: string;
  color: string; icon: string; duration?: string; mode?: string; tools?: string | null;
  img?: string; highlights: string[];
}

export default function SkillPage() {
  const [universities, setUniversities] = useState<SkillUniversityEntry[]>([]);
  const [courses, setCourses] = useState<SkillCourseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeUni, setActiveUni] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/skill-universities').then(r => r.json()),
      fetch('/api/admin/skill-courses').then(r => r.json()),
    ]).then(([uniData, courseData]) => {
      const unis: SkillUniversityEntry[] = uniData.skillUniversities || [];
      setUniversities(unis);
      setCourses(courseData.skillCourses || []);
      if (unis.length > 0) setActiveUni(unis[0].slug);
    }).finally(() => setLoading(false));
  }, []);

  const uni = universities.find(u => u.slug === activeUni);
  const uniPrograms = courses.filter(c => c.universityId === activeUni);

  if (loading) return (
    <PageWrapper bg="/assets/page-bg-skill.jpg">
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
      <Footer />
    </PageWrapper>
  );

  return (
    <PageWrapper bg="/assets/page-bg-skill.jpg">
      <Navbar />

      {/* ── HERO — Split layout with image ── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden grid lg:grid-cols-2"
            style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>

            {/* Left content */}
            <div className="relative z-10 px-8 sm:px-12 py-14 flex flex-col justify-center">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="relative">
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30">ECTS Certified</span>
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium">🇪🇺 European Universities</span>
                </div>

                <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] mb-5">
                  Upskill with<br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">European Certified</span><br />
                  Programs
                </h1>
                <p className="text-white/50 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
                  Get professionally certified from accredited European universities.
                  Recognized in 48+ countries. Placement by SkillDad.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Link href="/contact"
                    className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/25 flex items-center gap-2 text-sm hover:scale-105 transition-transform">
                    Get Started <ArrowRight size={16} />
                  </Link>
                  <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3.5 rounded-full font-semibold text-white/70 border border-white/20 hover:bg-white/5 transition-all text-sm">
                    View Courses
                  </button>
                </div>

                <div className="flex gap-6">
                  {[
                    { val: '10+', label: 'Programs' },
                    { val: '48+', label: 'Countries' },
                    { val: '100%', label: 'Placement' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-white font-black text-2xl">{s.val}</div>
                      <div className="text-white/30 text-[10px] uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right image collage */}
            <div className="relative hidden lg:block min-h-[520px]">
              <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=85&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0F172A]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />

              {/* Floating cards */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 size={14} className="text-blue-400" />
                    <span className="text-white text-xs font-bold">{universities.length} Universities</span>
                  </div>
                  <p className="text-white/40 text-[10px]">{universities.map(u => u.shortName).join(' & ')}</p>
                </div>
                <div className="rounded-2xl p-4 bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Rocket size={14} className="text-emerald-400" />
                    <span className="text-white text-xs font-bold">SkillDad</span>
                  </div>
                  <p className="text-white/40 text-[10px]">Placement guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER UNIVERSITIES — Premium cards with bg image & logo ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-8">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 shadow-sm mb-4">
              <Building2 size={14} className="text-blue-500" /> Accredited European Institutions
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-bold text-3xl sm:text-4xl text-gray-900">Our Partner Universities</motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {universities.map((u, i) => (
              <motion.div key={u._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white">
                {/* Plain color header, logo top-left */}
                <div className="relative h-44 overflow-hidden" style={{ background: u.color }}>
                  <div className="absolute top-4 left-4 w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center p-2 shadow-lg border border-white/50">
                    <img src={u.logo} alt={`${u.shortName} logo`} className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{u.flag}</span>
                      <span className="text-white/80 text-xs font-medium">{u.subtitle}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg leading-tight">{u.name}</h3>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-gray-500 text-sm mb-4">{u.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] px-3 py-1 rounded-full font-bold bg-blue-50 text-blue-600 border border-blue-100">ECTS Accredited</span>
                    <span className="text-[10px] px-3 py-1 rounded-full font-bold bg-purple-50 text-purple-600 border border-purple-100">Bologna Process</span>
                    <span className="text-[10px] px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">{courses.filter(c => c.universityId === u.slug).length} Programs</span>
                  </div>
                  <Link href={`/skill/${u.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: u.color }}>
                    View University Details <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EUROPEAN EDUCATION — Visual grid ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)' }}>
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"><Globe size={20} className="text-blue-400" /></div>
                <div>
                  <h2 className="font-bold text-2xl sm:text-3xl text-white">Why European Education?</h2>
                  <p className="text-white/40 text-sm">The gold standard of international higher education</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: BadgeCheck, title: 'ECTS Credits', desc: 'Recognized across 48+ European countries and beyond', color: '#3B82F6' },
                  { icon: Globe, title: 'Bologna Process', desc: 'Part of the European Higher Education Area standards', color: '#A855F7' },
                  { icon: Award, title: 'Global Recognition', desc: 'Employers worldwide value European qualifications', color: '#F59E0B' },
                  { icon: Shield, title: 'Credit Transfer', desc: 'Transfer credits between any European university', color: '#10B981' },
                  { icon: Briefcase, title: 'Career Access', desc: 'Access to European job market post-certification', color: '#EC4899' },
                  { icon: Star, title: 'Quality Assured', desc: 'Rigorous academic standards and accreditation', color: '#EF4444' },
                  { icon: Users, title: 'Global Network', desc: 'Join an international community of professionals', color: '#06B6D4' },
                  { icon: Zap, title: 'Industry-Aligned', desc: 'Curriculum designed with real industry needs', color: '#F97316' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-2xl p-5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: `${item.color}20` }}>
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES — Tabbed with premium cards ── */}
      <section id="programs" className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 text-xs font-bold text-purple-600 mb-4">
              <BookOpen size={14} /> ECTS-Certified Professional Programs
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-900">Skill-Based Courses</h2>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {universities.map((u) => (
              <button key={u._id} onClick={() => setActiveUni(u.slug)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all"
                style={activeUni === u.slug ? {
                  background: `linear-gradient(135deg, ${u.color}, ${u.color}CC)`, color: '#fff',
                  boxShadow: `0 8px 25px ${u.color}35`,
                } : { background: '#F8FAFC', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                <span className="text-base">{u.flag}</span>
                {u.shortName}
              </button>
            ))}
          </div>

          {uni && (
          <div className="rounded-2xl p-4 mb-6 flex items-center gap-4"
            style={{ background: `linear-gradient(135deg, ${uni.color}08, ${uni.color}04)`, border: `1px solid ${uni.color}15` }}>
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 border border-gray-100 shadow-sm">
              <img src={uni.logo} alt={`${uni.shortName} logo`} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{uni.name}</h3>
              <p className="text-gray-400 text-xs flex items-center gap-1"><MapPin size={10} /> {uni.subtitle} · ECTS Accredited</p>
            </div>
          </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uniPrograms.map((prog, i) => {
              const Icon = iconMap[prog.icon] || BookOpen;
              return (
                <motion.div key={prog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-3xl bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                  {/* Course image header */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${prog.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 20%, ${prog.color}CC 100%)` }} />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex gap-2 mb-2">
                            <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm flex items-center gap-1"><Monitor size={9} /> {prog.duration}</span>
                            <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm">{prog.mode}</span>
                          </div>
                          <h4 className="font-bold text-white text-lg leading-tight">{prog.title}</h4>
                        </div>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 flex-shrink-0">
                          <Icon size={20} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course content */}
                  <div className="p-6">
                    <div className="space-y-2 mb-5">
                      {prog.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2.5">
                          <CheckCircle size={14} style={{ color: prog.color }} className="flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{h}</span>
                        </div>
                      ))}
                    </div>

                    {prog.tools && (
                      <div className="rounded-xl p-3.5 flex items-center gap-3 mb-4"
                        style={{ background: `${prog.color}08`, border: `1px solid ${prog.color}15` }}>
                        <Zap size={14} style={{ color: prog.color }} className="flex-shrink-0" />
                        <div>
                          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Tools & Technologies</span>
                          <p className="text-gray-700 text-xs font-medium">{prog.tools}</p>
                        </div>
                      </div>
                    )}

                    <Link href={`/course/${prog.slug}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${prog.color}, ${prog.color}CC)`, boxShadow: `0 4px 15px ${prog.color}30` }}>
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILLDAD PLACEMENT — International premium ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)' }}>
            <div className="p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold mb-6">
                    <Rocket size={14} /> SkillDad Placement Platform
                  </div>
                  <h2 className="font-black text-3xl sm:text-4xl text-white mb-4 leading-tight">
                    Get Certified.<br />
                    <span className="text-emerald-300">Get Placed Globally.</span>
                  </h2>
                  <p className="text-emerald-100/60 mb-8 leading-relaxed">
                    Every student who successfully completes their ECTS-certified course gets exclusive access to
                    placement and internship opportunities through SkillDad — connecting you with companies worldwide.
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: Briefcase, title: 'Internship Facilitation', desc: 'Aligned with your specialization', color: '#34D399' },
                      { icon: Globe, title: 'Global Industry Exposure', desc: 'Work with leading companies worldwide', color: '#60A5FA' },
                      { icon: Users, title: 'Professional Profiling', desc: 'CV, LinkedIn, interview coaching', color: '#C084FC' },
                      { icon: Award, title: 'ECTS + Job Placement', desc: 'European certificate + real-world placement', color: '#FBBF24' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-center gap-3 rounded-xl p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20` }}>
                            <Icon size={16} style={{ color: item.color }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                            <p className="text-emerald-200/50 text-xs">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { val: '100%', label: 'Placement Support' },
                      { val: '500+', label: 'Partner Companies' },
                      { val: '95%', label: 'Success Rate' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl p-5 bg-white/10 border border-white/15 text-center backdrop-blur-sm">
                        <div className="text-white font-black text-2xl">{s.val}</div>
                        <div className="text-emerald-200/50 text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl p-6 bg-white/10 border border-white/15 backdrop-blur-sm">
                    <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2"><Rocket size={18} className="text-emerald-300" /> Your Path</h3>
                    <div className="flex items-center justify-between">
                      {[
                        { icon: BookOpen, label: 'Learn', sub: 'Complete course' },
                        { icon: BadgeCheck, label: 'Certify', sub: 'ECTS certificate' },
                        { icon: Briefcase, label: 'Work', sub: 'Get placed' },
                      ].map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.label} className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="w-12 h-12 rounded-xl bg-emerald-400/20 flex items-center justify-center mx-auto mb-2">
                                <Icon size={20} className="text-emerald-300" />
                              </div>
                              <div className="text-white text-xs font-bold">{step.label}</div>
                              <div className="text-emerald-200/40 text-[10px]">{step.sub}</div>
                            </div>
                            {i < 2 && <ArrowRight size={16} className="text-emerald-400/30 mx-2" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative px-8 sm:px-12 lg:px-16 py-16"
            style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)' }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #818CF8, transparent)' }} />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="flex justify-center gap-2 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">🇪🇺 European ECTS</span>
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">SkillDad Placement</span>
              </div>
              <h2 className="text-white font-black text-3xl sm:text-5xl leading-tight mb-4">
                Ready to Go Global?
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Enroll in an ECTS-certified program from an accredited European university. Get certified. Get placed. Go global.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact"
                  className="px-9 py-4 rounded-full font-bold text-gray-900 bg-white shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                  Apply Now <ArrowRight size={16} />
                </Link>
                <Link href="/overseas"
                  className="px-9 py-4 rounded-full font-semibold text-white/80 border border-white/25 hover:bg-white/10 transition-all flex items-center gap-2">
                  <Globe size={16} /> Explore Overseas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}
