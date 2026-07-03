'use client';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { label: 'Programs Listed',           value: 10000, suffix: '+' },
  { label: 'Partner Universities',      value: 500,   suffix: '+' },
  { label: 'Countries Covered',         value: 50,    suffix: '+' },
  { label: 'Student Satisfaction Rate', value: 95,    suffix: '%' },
];

export default function Stats() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <div className="font-bold text-3xl sm:text-4xl text-gray-900 mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
