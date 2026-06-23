'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'I found my dream program in Germany within minutes. The entire process was straightforward and easy to follow, making it a breeze to get started! From browsing the options to submitting my application, every step was clear and user-friendly, which really helped me feel confident and excited about this new journey.',
    name: 'Sarah, Beginner',
    role: 'MS Data Science',
    rating: 5,
    highlights: ['within minutes', 'every step was clear and user-friendly'],
  },
  {
    text: 'The platform matched me with universities I never would have found on my own. The transparent requirements made it so easy to prepare my application. I got accepted into my top choice university in the Netherlands!',
    name: 'Rahul Mehta',
    role: 'MBA International Business',
    rating: 5,
    highlights: ['transparent requirements', 'top choice university'],
  },
  {
    text: 'As a first-generation study abroad student, I was overwhelmed. This platform broke everything down into simple steps. The real-time matching feature saved me weeks of research.',
    name: 'Priya Sharma',
    role: 'BSc Computer Science',
    rating: 5,
    highlights: ['simple steps', 'real-time matching'],
  },
];

function highlightText(text: string, highlights: string[]) {
  let result = text;
  highlights.forEach((h) => {
    result = result.replace(
      h,
      `<span class="underline decoration-orange-400 decoration-2 underline-offset-2 font-medium">${h}</span>`
    );
  });
  return result;
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
        <h2 className="text-center font-bold text-3xl sm:text-4xl text-gray-900 mb-12">
          What our students say
        </h2>

        <div className="relative bg-white/90 rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <Quote size={32} className="text-orange-200 mb-6" />

          <p
            className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: highlightText(t.text, t.highlights) }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <span className="text-xs text-gray-400 mr-1">Trustpilot</span>
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-emerald-500 text-emerald-500" />
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'bg-orange-500 w-6' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
