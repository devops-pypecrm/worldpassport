import Link from 'next/link';
import {
  Star, ChevronRight, BookOpen, FileCheck, Award, Plane, Globe, GraduationCap, Handshake, Search, MapPin,
} from 'lucide-react';

const rows = [
  {
    title: 'For Students',
    desc: 'A counselling experience built around your goals, so you land at the university that is right for you.',
    bg: 'bg-pastel-pink',
    blob: 'bg-[#F2CDD0]',
    img: '/assets/about.png',
    imgPos: 'object-[50%_60%]',
    href: '/contact',
    icons: [Search, BookOpen],
    offerings: [
      { icon: BookOpen, title: 'Course & university selection', desc: 'A shortlist that fits your grades, goals and budget, from 20+ accredited partner universities.' },
      { icon: FileCheck, title: 'Application support', desc: 'SOP, recommendation letters, CV and transcripts, prepared and reviewed before you submit.' },
      { icon: Award, title: 'Scholarship guidance', desc: 'We find the scholarships and fee waivers you qualify for and help you apply on time.' },
    ],
  },
  {
    title: 'Visa, Travel & Beyond',
    desc: 'From your visa interview to your first week on campus, we make sure nothing is left to chance.',
    bg: 'bg-pastel-sky',
    blob: 'bg-[#C9D3EA]',
    img: '/assets/flight.png',
    imgPos: 'object-[60%_45%]',
    href: '/overseas',
    icons: [Plane, MapPin],
    offerings: [
      { icon: Plane, title: 'Student visa assistance', desc: 'Document checklists, financial proofs and appointment booking, handled step by step.' },
      { icon: Globe, title: 'Pre-departure briefing', desc: 'Accommodation, banking, travel and what to expect in your first weeks.' },
      { icon: GraduationCap, title: 'Support until graduation', desc: 'Your counsellor stays in touch after you arrive, through to your degree.' },
    ],
  },
  {
    title: 'For Partners',
    desc: 'Consultants, agencies and institutions: place your students with our partner universities through one relationship.',
    bg: 'bg-pastel-peach',
    blob: 'bg-[#EAD9B8]',
    img: '/assets/contact.png',
    imgPos: 'object-[75%_60%]',
    href: '/b2b',
    icons: [Handshake, Star],
    offerings: [
      { icon: Handshake, title: 'Dedicated partner manager', desc: 'A named contact who knows your pipeline and unblocks applications fast.' },
      { icon: FileCheck, title: 'Transparent commission', desc: 'A clear payout structure on every successful placement.' },
      { icon: Globe, title: 'Full destination network', desc: 'Access to every partner university across 15+ countries.' },
    ],
  },
];

export default function Features() {
  return (
    <section>
      <div className="bg-white pb-6 pt-16 text-center sm:pt-20">
        <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-[2.4rem]">Our Services &amp; Offerings</h2>
        <p className="mx-auto mt-3 max-w-xl px-4 text-ink-muted">One counsellor, one plan, and a clear next step at every stage of your admission.</p>
      </div>

      {rows.map((row, i) => {
        const flip = i % 2 === 1;
        const [IconA, IconB] = row.icons;
        return (
          <div key={row.title} className={row.bg}>
            <div className={`container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20`}>
              <div className={flip ? 'lg:order-2' : ''}>
                <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{row.title}</h3>
                <p className="mt-3 max-w-lg text-ink-muted">{row.desc}</p>
                <p className="mt-7 text-sm font-semibold text-navy-900">Offerings</p>
                <ul className="mt-4 space-y-4">
                  {row.offerings.map((o) => (
                    <li key={o.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-card">
                        <Star size={14} className="fill-gold text-gold" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{o.title}</span>
                        <span className="block text-sm text-ink-muted">{o.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={row.href} className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2 transition-all">
                  See More <ChevronRight size={16} />
                </Link>
              </div>

              <div className={`relative mx-auto w-full max-w-[380px] ${flip ? 'lg:order-1' : ''}`}>
                <div aria-hidden="true" className={`absolute inset-[6%] rounded-full ${row.blob}`} />
                <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white bg-white shadow-lift">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.img} alt="" className={`h-full w-full object-cover ${row.imgPos}`} loading="lazy" />
                </div>
                <span className="absolute right-2 top-10 flex h-12 w-12 animate-floaty items-center justify-center rounded-full bg-white text-navy shadow-lift">
                  <IconA size={20} />
                </span>
                <span className="absolute bottom-10 left-0 flex h-12 w-12 animate-floaty items-center justify-center rounded-full bg-white text-gold-dark shadow-lift [animation-delay:1.2s]">
                  <IconB size={20} />
                </span>
                <span aria-hidden="true" className="absolute -left-2 top-1/3 text-xl text-white">✦</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
