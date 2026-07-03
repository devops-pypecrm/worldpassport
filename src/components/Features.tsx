'use client';
import { Globe, Users, ClipboardCheck, Send } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Global University Database',
    desc: 'Explore institutions across 50+ countries with detailed profiles, rankings, and program info.',
    gradient: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-200/50',
    iconBg: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Real-Time Matching',
    desc: 'Update your profile and instantly see universities that match your qualifications and goals.',
    gradient: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-200/50',
    iconBg: 'bg-purple-500',
  },
  {
    icon: ClipboardCheck,
    title: 'Transparent Requirements',
    desc: "Know exactly what's needed — documents, tests, deadlines — all in one place before you apply.",
    gradient: 'from-orange-500 to-amber-400',
    shadow: 'shadow-orange-200/50',
    iconBg: 'bg-orange-500',
  },
  {
    icon: Send,
    title: 'Direct Applications',
    desc: 'Submit documents and fees directly to institutions through our streamlined platform.',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-200/50',
    iconBg: 'bg-emerald-500',
  },
];

export default function Features() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-3">
            Features
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to find, compare, and apply to your dream university abroad
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative rounded-2xl p-6 bg-white border border-gray-100 hover:shadow-xl ${f.shadow} hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.gradient}`} />

                <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>

                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${f.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
