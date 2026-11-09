import { Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';

const testimonials = [
  {
    text: 'I found my dream program in Germany within minutes. The entire process was straightforward and easy to follow, making it a breeze to get started! From browsing the options to submitting my application, every step was clear and user-friendly, which really helped me feel confident and excited about this new journey.',
    name: 'Sarah',
    role: 'MS Data Science',
  },
  {
    text: 'The platform matched me with universities I never would have found on my own. The transparent requirements made it so easy to prepare my application. I got accepted into my top choice university in the Netherlands!',
    name: 'Rahul Mehta',
    role: 'MBA International Business',
  },
  {
    text: 'As a first-generation study abroad student, I was overwhelmed. This platform broke everything down into simple steps. The real-time matching feature saved me weeks of research.',
    name: 'Priya Sharma',
    role: 'BSc Computer Science',
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading eyebrow="Student stories" title="What our students say" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card relative flex flex-col p-8">
              <Quote size={36} className="text-gold/40" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-navy-900">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-semibold text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-ink-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
