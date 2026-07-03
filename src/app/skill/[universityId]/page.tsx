'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getUniversityById } from '@/lib/courseData';
import {
  ArrowLeft, ArrowRight, CheckCircle, GraduationCap,
  BookOpen, Globe, Award, Users, Rocket, BadgeCheck, Zap,
  MapPin, Monitor, Building2, Star, Shield, Briefcase,
  Clock, ChevronRight,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function UniversityDetailPage() {
  const { universityId } = useParams();
  const uni = getUniversityById(universityId as string);

  if (!uni) return (
    <PageWrapper bg="/assets/page-bg-skill.jpg">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <Building2 size={48} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">University Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">This university may have been removed or the link is incorrect.</p>
          <Link href="/skill" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white font-semibold text-sm">
            <ArrowLeft size={16} /> Back to Skill Programs
          </Link>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );

  const color = uni.color;

  return (
    <PageWrapper bg="/assets/page-bg-skill.jpg">
      <Navbar />

      {/* HERO */}
      <motion.section initial="hidden" animate="visible" variants={stagger} className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp}>
            <Link href="/skill" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Skill Programs
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden relative min-h-[320px] flex items-end" style={{ background: color }}>
            <motion.div variants={fadeUp}
              className="absolute top-6 left-8 w-24 h-24 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center p-3 shadow-xl border border-white/50 flex-shrink-0">
              <img src={uni.logo} alt={`${uni.shortName} logo`} className="w-full h-full object-contain" />
            </motion.div>
            <div className="absolute top-6 right-8 opacity-[0.08]"><GraduationCap size={180} className="text-white" /></div>

            <div className="relative z-10 p-8 sm:p-12 w-full">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
                <span className="px-4 py-1.5 rounded-full bg-white/25 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">ECTS Certified</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><MapPin size={11} /> {uni.subtitle}</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><BookOpen size={11} /> {uni.programs.length} Programs</span>
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
            {[
              { icon: BookOpen, label: 'Programs', value: `${uni.programs.length} Courses`, c: '#3B82F6' },
              { icon: MapPin, label: 'Location', value: uni.subtitle, c: '#F59E0B' },
              { icon: BadgeCheck, label: 'Accreditation', value: 'ECTS Credits', c: '#8B5CF6' },
              { icon: Rocket, label: 'Placement', value: 'SkillDad', c: '#10B981' },
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

          {/* LEFT CONTENT */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 space-y-6">

            {/* About */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><Building2 size={20} style={{ color }} /> About the University</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <span className="text-gray-900 font-semibold">{uni.name}</span> is an accredited European higher education institution located in {uni.subtitle}. The university offers ECTS-certified professional skill programs designed to equip students with industry-ready competencies recognized across 48+ European countries.
              </p>
              <p className="text-gray-600 leading-relaxed">
                All programs are aligned with the Bologna Process framework and delivered through a combination of expert instruction, hands-on projects, and mentorship. Graduates receive internationally recognized certificates with guaranteed placement support through SkillDad.
              </p>
            </motion.div>

            {/* Why This University */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Star size={20} style={{ color }} /> Why Choose {uni.shortName}?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: BadgeCheck, title: 'ECTS Accredited', desc: 'European Credit Transfer System — recognized in 48+ countries' },
                  { icon: Globe, title: 'Bologna Process', desc: 'Part of the European Higher Education Area standards' },
                  { icon: Award, title: 'Quality Education', desc: 'Rigorous academic standards with industry-aligned curriculum' },
                  { icon: Users, title: 'Expert Faculty', desc: 'Learn from experienced professionals and academic researchers' },
                  { icon: Rocket, title: 'SkillDad Placement', desc: 'Guaranteed access to 500+ global companies after certification' },
                  { icon: Shield, title: 'Recognized Globally', desc: 'Employers worldwide value European university qualifications' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl p-5 bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
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

            {/* Programs Offered */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><BookOpen size={20} style={{ color }} /> Programs Offered</h2>
              <div className="space-y-4">
                {uni.programs.map((prog, i) => (
                  <motion.div key={prog.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="flex flex-col sm:flex-row">
                      {/* Course image */}
                      <div className="relative w-full sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${prog.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${prog.color}80, ${prog.color}40)` }} />
                      </div>
                      {/* Course details */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h4 className="font-bold text-gray-900 text-base">{prog.title}</h4>
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${prog.color}15` }}>
                            <BookOpen size={16} style={{ color: prog.color }} />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1" style={{ background: `${prog.color}10`, color: prog.color }}>
                            <Clock size={9} /> {prog.duration}
                          </span>
                          <span className="text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1" style={{ background: `${prog.color}10`, color: prog.color }}>
                            <Monitor size={9} /> {prog.mode}
                          </span>
                          {prog.tools && (
                            <span className="text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 bg-gray-100 text-gray-600">
                              <Zap size={9} /> {prog.tools}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                          {prog.highlights.slice(0, 3).map((h) => (
                            <div key={h} className="flex items-center gap-1.5">
                              <CheckCircle size={11} style={{ color: prog.color }} className="flex-shrink-0" />
                              <span className="text-gray-600 text-xs">{h}</span>
                            </div>
                          ))}
                        </div>

                        <Link href={`/course/${prog.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                          style={{ color: prog.color }}>
                          View Course Details <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Shield size={20} style={{ color }} /> Eligibility & Requirements</h2>
              <div className="space-y-3">
                {[
                  'Open to all nationalities — no geographic restrictions',
                  'Basic computer literacy and internet access required',
                  'English proficiency (intermediate level or above)',
                  'No prior domain experience needed for most programs',
                  'Minimum age: 18 years',
                  'Commitment to complete coursework and assessments',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle size={16} style={{ color }} className="flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* SIDEBAR */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">

            {/* Enroll card */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg sticky top-24">
              <div className="text-center mb-5">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-lg border border-gray-100 p-2">
                  <img src={uni.logo} alt={`${uni.shortName} logo`} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{uni.shortName}</h3>
                <p className="text-gray-400 text-xs mt-1">{uni.subtitle}</p>
              </div>

              <div className="space-y-2.5 mb-6">
                {[
                  { icon: BookOpen, label: 'Programs', value: `${uni.programs.length} Courses` },
                  { icon: BadgeCheck, label: 'Certificate', value: 'ECTS Credits', vc: 'text-blue-600' },
                  { icon: Rocket, label: 'Placement', value: 'SkillDad', vc: 'text-emerald-600' },
                  { icon: Globe, label: 'Recognition', value: '48+ Countries', vc: 'text-purple-600' },
                  { icon: MapPin, label: 'Location', value: uni.subtitle },
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
              <p className="text-center text-[10px] text-gray-400 mt-3">Limited seats available</p>
            </motion.div>

            {/* Accreditation */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
              <h4 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2"><Award size={16} style={{ color }} /> Accreditation</h4>
              <div className="space-y-3">
                {[
                  { label: 'ECTS Credits', desc: 'European Credit Transfer System' },
                  { label: 'Bologna Process', desc: 'European Higher Education Area' },
                  { label: 'International Recognition', desc: 'Valid in 48+ countries' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <BadgeCheck size={16} style={{ color }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-gray-900 text-sm font-semibold">{item.label}</div>
                      <div className="text-gray-400 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SkillDad Placement */}
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
            <h2 className="font-black text-2xl sm:text-3xl text-white mb-3">Ready to Start Your Journey?</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm">
              Enroll in an ECTS-certified program from {uni.shortName} and launch your global career with SkillDad placement.
            </p>
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
