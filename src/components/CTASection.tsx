import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  lead?: string;
  className?: string;
}

export default function CTASection({
  title = 'Book your free counselling session',
  lead = 'Talk to a counsellor about your goals, your budget and the universities that fit. No commitment, no fees for the first session.',
  className = '',
}: CTASectionProps) {
  return (
    <section className={`bg-white pb-16 sm:pb-20 lg:pb-24 ${className}`}>
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-gold/15" />
          <div aria-hidden="true" className="absolute -bottom-32 right-40 h-64 w-64 rounded-full border-[20px] border-white/5" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow mb-4 !text-gold-light">Admissions open</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xl text-white/70">{lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-gold">Book a session <ArrowRight size={15} /></Link>
                <a href="tel:+919205031277" className="btn-ghost-light"><Phone size={15} /> Call us</a>
              </div>
            </div>
            <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/85">
              {[
                'Personalised university shortlist',
                'Fee, scholarship and budget planning',
                'Application and visa timeline',
                'Answers to all your questions',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={17} className="flex-shrink-0 text-gold-light" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
