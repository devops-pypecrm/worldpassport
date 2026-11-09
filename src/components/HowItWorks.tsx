import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const steps = [
  { title: 'Free counselling', desc: 'Share your academic background, test scores, budget and preferred countries with a counsellor.' },
  { title: 'Get your shortlist', desc: 'Receive a list of universities and programs that match your profile, with fees and deadlines.' },
  { title: 'Apply with support', desc: 'We prepare and review every document, then submit and track your applications for you.' },
  { title: 'Visa & departure', desc: 'Accept your offer, secure your visa, and get briefed before you fly out to campus.' },
];

export default function HowItWorks() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Your admission journey"
          title="Four clear steps to your offer letter"
          lead="Applying abroad doesn't have to be complicated. You'll always know what happens next."
        />

        <div className="relative mt-16">
        <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-[repeating-linear-gradient(90deg,#C2922F_0_8px,transparent_8px_16px)] lg:block" />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center lg:px-2">
              <span className={`relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white font-display text-xl font-bold text-white shadow-lift ${['bg-gold', 'bg-brand', 'bg-navy', 'bg-emerald-500'][i]}`}>
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
        </div>

        <div className="mt-14 text-center">
          <Link href="/contact" className="btn-primary">
            Start with a free session <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
