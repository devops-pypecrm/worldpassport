'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCourseBySlug } from '@/lib/courseData';
import {
  ArrowLeft, ArrowRight, Clock, Monitor, Wrench, CheckCircle, GraduationCap,
  BookOpen, Globe, Award, Users, Rocket, BadgeCheck, Zap, Target,
  TrendingUp, Shield, Star, FileCheck, Briefcase, MessageCircle, ChevronDown,
  MapPin, Calendar, Layers,
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug as string);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!course) return (
    <PageWrapper bg="/assets/page-bg-skill.jpg">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">This course may have been removed or the link is incorrect.</p>
          <Link href="/skill" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white font-semibold text-sm">
            <ArrowLeft size={16} /> Back to All Courses
          </Link>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );

  const color = course.color;
  const toolsList = course.tools ? course.tools.split(',').map(t => t.trim()) : [];

  const faqs = [
    { q: 'What certificate will I receive?', a: `You will receive an ECTS-accredited certificate from ${course.universityName}, recognized across 48+ European countries and globally by employers.` },
    { q: 'Is this course fully online?', a: `This course is delivered ${course.mode.toLowerCase()}. You can learn from anywhere with a stable internet connection and access materials 24/7.` },
    { q: 'What are the prerequisites?', a: 'No prior experience is required for most programs. Basic computer literacy and English proficiency are recommended.' },
    { q: 'Will I get placement support?', a: 'Yes! Upon successful completion, SkillDad provides dedicated placement and internship facilitation — including CV building, interview coaching, and job matching with 500+ partner companies.' },
    { q: 'How long does the course take?', a: `This program runs for ${course.duration}. You can study at your own pace with flexible deadlines and live instructor support sessions.` },
  ];

  return (
    <PageWrapper bg="/assets/page-bg-skill.jpg">
      <Navbar />

      {/* HERO — dark with course image */}
      <motion.section initial="hidden" animate="visible" variants={stagger} className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp}>
            <Link href="/skill" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to courses
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden relative min-h-[300px] flex items-end">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${course.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${color}50 0%, ${color}EE 100%)` }} />
            <div className="absolute top-6 right-8 opacity-[0.08]"><GraduationCap size={150} className="text-white" /></div>

            <div className="relative z-10 p-8 sm:p-12 w-full">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
                <span className="px-4 py-1.5 rounded-full bg-white/25 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">🇪🇺 ECTS Certified</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><Clock size={11} /> {course.duration}</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><Monitor size={11} /> {course.mode}</span>
                <span className="px-4 py-1.5 rounded-full bg-emerald-400/25 text-emerald-100 text-xs font-medium border border-emerald-400/30 flex items-center gap-1.5"><Rocket size={11} /> SkillDad Placement</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight">{course.title}</motion.h1>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1.5"><GraduationCap size={15} /> {course.universityName}</span>
                <span className="flex items-center gap-1.5"><MapPin size={15} /> {course.universitySubtitle}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS BAR */}
      <section className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Clock, label: 'Duration', value: course.duration, c: '#F59E0B' },
              { icon: Monitor, label: 'Delivery', value: course.mode, c: '#3B82F6' },
              { icon: BadgeCheck, label: 'Certificate', value: 'ECTS Credits', c: '#8B5CF6' },
              { icon: Rocket, label: 'Placement', value: 'Guaranteed', c: '#10B981' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.c}15` }}>
                    <Icon size={18} style={{ color: s.c }} />
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-sm">{s.value}</div>
                    <div className="text-gray-400 text-[10px] uppercase tracking-wider">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 space-y-6">

            {/* Overview */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><Layers size={20} style={{ color }} /> Course Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                This {course.duration} program from <span className="text-gray-900 font-semibold">{course.universityName}</span> is designed to equip you with industry-ready skills through theoretical knowledge and practical application. Upon completion, you receive an internationally recognized ECTS certificate valid across 48+ European countries.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The program is delivered {course.mode.toLowerCase()} with live instructor sessions, hands-on projects, and mentorship. SkillDad provides dedicated placement support to ensure your career growth after certification.
              </p>
            </motion.div>

            {/* What You Will Learn */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><BookOpen size={20} style={{ color }} /> What You Will Learn</h2>
              <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-3">
                {course.highlights.map((h, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}15` }}>
                      <CheckCircle size={14} style={{ color }} />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{h}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Tools */}
            {toolsList.length > 0 && (
              <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Zap size={20} style={{ color }} /> Tools & Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {toolsList.map((t) => (
                    <div key={t} className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <Wrench size={15} style={{ color }} />
                      <span className="text-gray-800 text-sm font-semibold">{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Learning Outcomes */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Target size={20} style={{ color }} /> Learning Outcomes</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, title: 'Industry-Ready Skills', desc: 'Master practical skills demanded by top employers worldwide' },
                  { icon: Globe, title: 'Global Recognition', desc: 'ECTS certificate recognized across 48+ countries' },
                  { icon: Briefcase, title: 'Portfolio Projects', desc: 'Build real-world projects to showcase to employers' },
                  { icon: Users, title: 'Professional Network', desc: 'Connect with peers and industry mentors globally' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl p-5 bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Career Opportunities */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Briefcase size={20} style={{ color }} /> Career Opportunities</h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Award, title: 'European ECTS', desc: 'Recognized in 48+ countries' },
                  { icon: Rocket, title: 'SkillDad Placement', desc: '500+ partner companies' },
                  { icon: Star, title: '95% Success Rate', desc: 'Students placed after completion' },
                ].map((item) => { const Icon = item.icon; return (
                  <div key={item.title} className="text-center p-5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${color}15` }}><Icon size={20} style={{ color }} /></div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                ); })}
              </div>
              <div className="rounded-2xl p-5 bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Potential career roles:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Industry Professional', 'Freelance Consultant', 'Team Lead', 'Project Manager', 'Domain Specialist', 'Startup Founder'].map(role => (
                    <span key={role} className="text-xs px-3 py-1.5 rounded-full bg-white text-gray-600 border border-gray-200 font-medium">{role}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Eligibility */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><FileCheck size={20} style={{ color }} /> Eligibility</h2>
              <div className="space-y-3">
                {['Open to all nationalities — no geographic restrictions', 'Basic computer literacy and internet access', 'English proficiency (intermediate level or above)', 'No prior domain experience needed', 'Minimum age: 18 years', 'Commitment to complete coursework'].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle size={16} style={{ color }} className="flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
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
          </motion.div>

          {/* SIDEBAR */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">

            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg sticky top-24">
              <div className="text-center mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 10px 25px ${color}35` }}>
                  <GraduationCap size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Enroll Today</h3>
                <p className="text-gray-400 text-xs mt-1">Start your career transformation</p>
              </div>
              <div className="space-y-2.5 mb-6">
                {[
                  { icon: Clock, label: 'Duration', value: course.duration },
                  { icon: Monitor, label: 'Mode', value: course.mode },
                  { icon: BadgeCheck, label: 'Certificate', value: 'ECTS Credits', vc: 'text-blue-600' },
                  { icon: Rocket, label: 'Placement', value: 'SkillDad', vc: 'text-emerald-600' },
                  { icon: Globe, label: 'Recognition', value: '48+ Countries', vc: 'text-purple-600' },
                  { icon: Calendar, label: 'Start', value: 'Flexible' },
                ].map((item) => { const Icon = item.icon; return (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Icon size={14} /> {item.label}</span>
                    <span className={`font-semibold text-sm ${item.vc || 'text-gray-900'}`}>{item.value}</span>
                  </div>
                ); })}
              </div>
              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all hover:scale-[1.02] shadow-lg"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 8px 20px ${color}30` }}>
                Enroll Now <ArrowRight size={16} />
              </Link>
              <p className="text-center text-[10px] text-gray-400 mt-3">Limited seats · No hidden fees</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
              <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><GraduationCap size={16} style={{ color }} /> Offered By</h4>
              <p className="text-gray-800 text-sm font-semibold">{course.universityName}</p>
              <p className="text-gray-400 text-xs mt-1 mb-3">Accredited European Higher Education Institution</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold border border-blue-100">🇪🇺 ECTS</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 font-bold border border-purple-100">Bologna Process</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-100">Accredited</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-3xl p-6 border shadow-lg" style={{ background: `linear-gradient(135deg, ${color}08, ${color}04)`, borderColor: `${color}20` }}>
              <Rocket size={24} style={{ color }} className="mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-2">SkillDad Placement</h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">Complete your course and get guaranteed placement access with 500+ companies worldwide.</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                  <div className="font-black text-lg" style={{ color }}>500+</div>
                  <div className="text-gray-400 text-[9px] uppercase">Companies</div>
                </div>
                <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                  <div className="font-black text-lg" style={{ color }}>95%</div>
                  <div className="text-gray-400 text-[9px] uppercase">Success</div>
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
            <h2 className="font-black text-2xl sm:text-3xl text-white mb-3">Ready to Transform Your Career?</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm">Join thousands who earned European ECTS certifications and launched global careers through SkillDad.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="px-8 py-3.5 rounded-full font-bold text-gray-900 bg-white shadow-lg flex items-center gap-2 text-sm hover:scale-105 transition-transform">
                Apply Now <ArrowRight size={15} />
              </Link>
              <Link href="/skill" className="px-8 py-3.5 rounded-full font-semibold text-white/80 border border-white/30 hover:bg-white/10 text-sm flex items-center gap-2">
                <BookOpen size={15} /> Browse All Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}
