'use client';

const steps = [
  {
    num: 1,
    title: 'Create Your Profile',
    desc: 'Add your academic background, language scores, budget, and preferred destinations. This helps us understand your journey and match you with the right opportunities.',
  },
  {
    num: 2,
    title: 'Get Matched Instantly',
    desc: 'Our algorithm analyzes your profile and matches you with universities and programs that fit your qualifications and goals.',
  },
  {
    num: 3,
    title: 'Explore Requirements',
    desc: 'See exactly what each university needs — documents, tests, deadlines — all in one place with full transparency.',
  },
  {
    num: 4,
    title: 'Apply With Confidence',
    desc: 'Submit your applications directly through our platform with guided support at every step of the process.',
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Finding and applying to universities abroad doesn&apos;t have to be complicated. Our
            platform guides you step-by-step, making sure you always know what to do next.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[480px]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=85&auto=format&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-1 flex-1 bg-orange-100 rounded-full" />
                </div>
                <div className="pb-2">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">
                    Step {step.num}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-lg mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
