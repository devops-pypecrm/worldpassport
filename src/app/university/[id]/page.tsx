'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, CheckCircle2, GraduationCap, BookOpen, Globe, Award,
  BadgeCheck, MapPin, Building2, Star, FileCheck, Plane, ChevronDown, MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface UniversityDetail {
  _id: string; name: string; country: string; city?: string; ranking?: string;
  image?: string; logo?: string; description?: string; color?: string;
  about?: string; programs?: string[]; highlights?: string[];
  stats?: { label: string; value: string }[];
}

const requirements = [
  'High school diploma or equivalent for Bachelor programs',
  'Bachelor degree for Master programs',
  'English proficiency (IELTS/TOEFL or equivalent)',
  'Valid passport and student visa eligibility',
  'Academic transcripts and recommendation letters',
  'Statement of purpose / motivation letter',
];

function Faq({ universityName, country }: { universityName: string; country: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: 'What are the entry requirements?', a: `Entry requirements vary by program. Generally you need a high school diploma (for Bachelor's) or a Bachelor's degree (for Master's), proof of English proficiency and academic transcripts. Our counsellors will guide you through the specific requirements for ${universityName}.` },
    { q: 'Is the degree internationally recognised?', a: `Yes. ${universityName} in ${country} is an accredited institution. Degrees earned here are recognised internationally, and many programs follow the Bologna Process / ECTS framework used across Europe.` },
    { q: 'What is the cost of living?', a: `${country} offers an affordable cost of living compared to Western Europe. Students typically spend €300–€600 a month on accommodation, food and transport. We help you plan your budget before you arrive.` },
    { q: 'Do you help with visa applications?', a: 'Yes. World Passport provides end-to-end visa support, from document preparation to embassy appointment booking, with a 98% visa approval rate across our partner countries.' },
    { q: 'Can I work while studying?', a: `International students in ${country} are generally allowed to work part-time during their studies. The exact hours depend on visa regulations, and we brief you on the rules before departure.` },
  ];

  return (
    <div className="card p-7 sm:p-8">
      <h2 className="flex items-center gap-2 heading-md"><MessageCircle size={20} className="text-gold" /> Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-cream-200 border-y border-cream-200">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-4 text-left">
              <span className="text-sm font-semibold text-ink">{f.q}</span>
              <ChevronDown size={17} className={`flex-shrink-0 text-ink-soft transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="pb-4 text-sm leading-relaxed text-ink-muted">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <Navbar />
      {children}
      <Footer />
    </PageWrapper>
  );
}

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [uni, setUni] = useState<UniversityDetail | null | undefined>(undefined);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then((r) => r.json())
      .then((data) => {
        const list: UniversityDetail[] = data.universities || [];
        setUni(list.find((u) => slugify(u.name) === id) ?? null);
      })
      .catch(() => setUni(null));
  }, [id]);

  if (uni === undefined) return (
    <Shell>
      <div className="flex min-h-[60vh] items-center justify-center bg-cream">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cream-200 border-t-navy" />
      </div>
    </Shell>
  );

  if (!uni) return (
    <Shell>
      <div className="flex min-h-[60vh] items-center justify-center bg-cream px-4">
        <div className="card max-w-md p-12 text-center">
          <Building2 size={44} className="mx-auto text-navy-200" />
          <h2 className="mt-4 heading-md">University not found</h2>
          <p className="mt-2 text-sm text-ink-muted">This university may have been removed or the link is incorrect.</p>
          <Link href="/#universities" className="btn-primary mt-6"><ArrowLeft size={15} /> Back to universities</Link>
        </div>
      </div>
    </Shell>
  );

  const location = uni.city ? `${uni.city}, ${uni.country}` : uni.country;
  const programs = uni.programs ?? [];
  const highlights = uni.highlights ?? [];
  const stats = uni.stats ?? [];

  return (
    <Shell>
      <PageHero
        crumbs={[{ label: 'Universities', href: '/#universities' }, { label: uni.name }]}
        eyebrow={location}
        title={uni.name}
        lead={uni.description}
        aside={
          <div className="card flex items-center gap-5 p-6">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-cream-200 bg-white p-2">
              {uni.logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={uni.logo} alt={`${uni.name} logo`} className="h-full w-full object-contain" />
                : <GraduationCap size={34} className="text-navy" />}
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center gap-2 text-ink"><MapPin size={14} className="text-gold" /> {location}</p>
              {uni.ranking && <p className="flex items-center gap-2 text-ink"><Award size={14} className="text-gold" /> {uni.ranking}</p>}
              <p className="flex items-center gap-2 text-ink"><BadgeCheck size={14} className="text-gold" /> Accredited</p>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Apply now <ArrowRight size={15} /></Link>
          <Link href="/contact" className="btn-outline">Free consultation</Link>
        </div>
      </PageHero>

      {stats.length > 0 && (
        <section className="border-b border-cream-200 bg-white">
          <div className="container-x grid grid-cols-2 gap-px sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-7 text-center">
                <p className="font-display text-2xl font-semibold text-navy">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section bg-cream">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {uni.about && (
              <div className="card p-7 sm:p-8">
                <h2 className="flex items-center gap-2 heading-md"><Building2 size={20} className="text-gold" /> About the university</h2>
                <p className="mt-4 leading-relaxed text-ink-muted">{uni.about}</p>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="card p-7 sm:p-8">
                <h2 className="flex items-center gap-2 heading-md"><Star size={20} className="text-gold" /> Why choose this university?</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 rounded-xl bg-cream/70 p-4 text-sm text-ink">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-gold" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {programs.length > 0 && (
              <div className="card p-7 sm:p-8">
                <h2 className="flex items-center gap-2 heading-md"><BookOpen size={20} className="text-gold" /> Programs offered</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {programs.map((p) => (
                    <li key={p} className="flex items-center gap-3 rounded-xl border border-cream-200 p-4 text-sm font-medium text-ink">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy"><GraduationCap size={16} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="card p-7 sm:p-8">
              <h2 className="flex items-center gap-2 heading-md"><FileCheck size={20} className="text-gold" /> Admission requirements</h2>
              <ul className="mt-6 space-y-3">
                {requirements.map((r) => (
                  <li key={r} className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-gold" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <Faq universityName={uni.name} country={uni.country} />
          </div>

          <aside className="space-y-6">
            <div className="card sticky top-24 p-7">
              <h3 className="font-display text-lg font-semibold text-navy-900">Interested in {uni.name}?</h3>
              <p className="mt-2 text-sm text-ink-muted">A counsellor will check your eligibility and walk you through fees, intakes and scholarships.</p>
              <dl className="mt-5 space-y-2.5 text-sm">
                {[
                  { icon: MapPin, label: 'Location', value: location },
                  { icon: Award, label: 'Ranking', value: uni.ranking || '—' },
                  { icon: Globe, label: 'Recognition', value: 'International' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3 rounded-lg bg-cream/70 px-4 py-3">
                    <dt className="flex items-center gap-2 text-ink-muted"><Icon size={14} /> {label}</dt>
                    <dd className="text-right font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact" className="btn-accent mt-6 w-full py-3.5">Apply now <ArrowRight size={15} /></Link>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft"><Plane size={12} /> Visa &amp; arrival support included</p>
            </div>
          </aside>
        </div>
      </section>

      <CTASection className="pt-16 sm:pt-20" title={`Ready to study at ${uni.name}?`} lead="Book a free consultation. We'll guide you through admission, visa and arrival." />
    </Shell>
  );
}
