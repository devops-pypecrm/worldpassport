'use client';
import { MessageSquare, Search, BookOpen, Trophy, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Share Your Goals',
    desc: 'Tell us your educational aspirations, budget, and preferences. Our counsellors listen carefully to every detail.',
    color: '#2563EB',
    img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=85&auto=format&fit=crop',
    imgPosition: 'center top',
    tag: 'Step 1',
  },
  {
    icon: Search,
    title: 'Discover Programs',
    desc: 'We match you with the best-fit programs from 20+ partner universities across 15+ countries.',
    color: '#DC2626',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=85&auto=format&fit=crop',
    imgPosition: 'center center',
    tag: 'Step 2',
  },
  {
    icon: BookOpen,
    title: 'Begin Your Studies',
    desc: 'Complete paperwork, visas, and enrollment with full support from our dedicated expert team.',
    color: '#2563EB',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=85&auto=format&fit=crop',
    imgPosition: 'center center',
    tag: 'Step 3',
  },
  {
    icon: Trophy,
    title: 'Achieve Success',
    desc: 'Graduate with global credentials. We support you every step — from inquiry to graduation.',
    color: '#DC2626',
    img: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&q=85&auto=format&fit=crop',
    imgPosition: 'center top',
    tag: 'Step 4',
  },
];

export default function Process() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F8FAFF]">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="badge badge-blue mb-4">Your Journey</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            4 Steps to Your <span className="text-gradient">Global Future</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
            We&apos;ve guided 10,000+ students through every phase of international education
          </p>

          {/* Step indicators */}
          <div className="flex items-center justify-center max-w-xs mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: i % 2 === 0 ? '#2563EB' : '#DC2626',
                    boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(37,99,235,0.40)' : 'rgba(220,38,38,0.40)'}`,
                  }}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #2563EB, #DC2626)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={i * 80}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ minHeight: 260 }}
              >
                {/* Colored top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] z-10"
                  style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}80)` }}
                />

                <div className="flex h-full">

                  {/* LEFT: Content panel */}
                  <div className="flex flex-col justify-between p-7 flex-1 relative z-10 min-w-0">

                    {/* Tag + Icon row */}
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase"
                        style={{
                          background: `${step.color}12`,
                          color: step.color,
                          border: `1px solid ${step.color}30`,
                        }}
                      >
                        {step.tag}
                      </span>
                      {/* Large watermark number */}
                      <span
                        className="font-display font-black text-7xl leading-none select-none pointer-events-none opacity-[0.07]"
                        style={{ color: step.color }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: step.color === '#2563EB' ? '#EFF6FF' : '#FEF2F2',
                        border: `1px solid ${step.color === '#2563EB' ? '#BFDBFE' : '#FECACA'}`,
                      }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {step.desc}
                      </p>
                      <div
                        className="flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                        style={{ color: step.color }}
                      >
                        Learn more <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Image panel — clear, no white overlay */}
                  <div className="relative w-44 flex-shrink-0 overflow-hidden">
                    {/* Full image */}
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${step.img}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: step.imgPosition,
                      }}
                    />
                    {/* Only a very subtle left edge blend — no white wash */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to right, rgba(255,255,255,0.55) 0%, transparent 30%)',
                      }}
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
