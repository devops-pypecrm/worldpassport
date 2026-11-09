'use client';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { label: 'Programs Listed', desc: 'Bachelor’s, Master’s, MBA and diploma programs to choose from.', value: 100, suffix: '+', color: 'text-gold' },
  { label: 'Partner Universities', desc: 'Accredited institutions we work with directly, with no middlemen.', value: 20, suffix: '+', color: 'text-brand' },
  { label: 'Countries Covered', desc: 'Destinations across Europe, Asia and the Indian Ocean.', value: 15, suffix: '+', color: 'text-navy' },
  { label: 'Student Satisfaction', desc: 'Students who would recommend us to a friend or family member.', value: 95, suffix: '%', color: 'text-emerald-500' },
];

export default function Stats() {
  return (
    <section className="bg-white pb-8 pt-14 sm:pt-16">
      <div className="container-x">
        <h2 className="text-center font-display text-3xl font-semibold text-navy-900 sm:text-[2.4rem]">Our Core Strengths</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className={`font-display text-4xl font-bold sm:text-5xl ${s.color}`}>
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-base font-semibold text-navy-900">{s.label}</p>
              <p className="mx-auto mt-1.5 max-w-[240px] text-sm leading-relaxed text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
