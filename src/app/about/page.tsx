'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';
import { KOCHI_OFFICE_ADDRESS, KOCHI_OFFICE_MAP_URL, KOCHI_OFFICE_MAP_EMBED } from '@/lib/office';
import {
  Heart, Shield, Globe, Clock, CheckCircle2, Award, MapPin, Building2, UserRound,
  GraduationCap, Handshake, Target, ArrowUpRight,
} from 'lucide-react';

const values = [
  { icon: Heart, title: 'Listen first', desc: "Every student's story is different. We listen before we advise. No one-size-fits-all plans." },
  { icon: Globe, title: 'Global network', desc: '20+ partner universities across 15+ countries give you real choice of programs and budgets.' },
  { icon: Shield, title: 'Zero hidden fees', desc: 'What we quote is what you pay. Every cost is explained before you commit to anything.' },
  { icon: Clock, title: 'Lifetime support', desc: 'From your first enquiry to graduation and beyond, your counsellor stays your point of contact.' },
];

const milestones = [
  { val: '2015', label: 'Year founded' },
  { val: '10,000+', label: 'Students guided' },
  { val: '20+', label: 'Partner universities' },
  { val: '15+', label: 'Countries covered' },
];

const awards = [
  { title: 'Most Trusted Education Agency', year: '2023', body: 'Education Today Awards' },
  { title: 'Best Overseas Counselling Service', year: '2022', body: 'Times Education' },
  { title: 'ISO 9001:2015 Certified', year: '2021', body: 'International Standards' },
  { title: 'Top 10 Education Consultants', year: '2020', body: 'India Education Summit' },
];

const offices: { city: string; country: string; type: string; address: string; mapUrl?: string; mapEmbed?: string }[] = [
  { city: 'Noida, Delhi NCR', country: 'India', type: 'Headquarters', address: 'A-18, S1, Second Floor, Sector-59, Noida, UP-201301' },
  { city: 'Kochi, Kerala', country: 'India', type: 'Regional Office', address: KOCHI_OFFICE_ADDRESS, mapUrl: KOCHI_OFFICE_MAP_URL, mapEmbed: KOCHI_OFFICE_MAP_EMBED },
  { city: 'Dubai', country: 'UAE', type: 'International Office', address: 'Office No 502, Al Fattan Plaza, Al Garhoud, Dubai, UAE' },
];

// "Global Opportunities. Stronger Partnerships." section
const audiences = [
  {
    icon: GraduationCap,
    title: 'For Students',
    paras: [
      'We offer more than university placements. We provide access to diverse international study destinations, personalised guidance, transparent admission processes and continuous support throughout the journey, from choosing the right programme to preparing for an international future.',
    ],
  },
  {
    icon: Handshake,
    title: 'For B2B Partners',
    paras: [
      'We go beyond traditional recruitment partnerships by offering a collaborative growth ecosystem. Our partners gain access to a wider university network, multiple study destinations, structured application coordination, dedicated operational support and transparent commercial arrangements.',
      'We empower education consultants and recruitment agencies to expand their offerings, strengthen their student services and grow their business without having to build an extensive international university network independently.',
    ],
  },
];

// Leaders hidden from the About page (records are kept in the database / admin panel)
const HIDDEN_LEADERS = ['edwin c benny'];

interface Leader { _id?: string; name: string; role: string; bio?: string; image?: string }

const fallbackLeaders: Leader[] = [
  { name: 'Edwin C Benny', role: 'CEO', image: '/assets/team/edwin.jpeg', bio: "Visionary leader driving World Passport's mission to make international education accessible to every student." },
  { name: 'Mujeeb T', role: 'Director', image: '/assets/team/mujeeb-t.jpg', bio: "Guiding strategic direction and partnerships to expand World Passport's global education network." },
];

function LeaderPhoto({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-navy-50 text-navy-200">
        <UserRound size={72} aria-label={name} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-center" onError={() => setFailed(true)} />
  );
}

export default function AboutPage() {
  const [leaders, setLeaders] = useState<Leader[]>(fallbackLeaders);

  useEffect(() => {
    fetch('/api/admin/leaders')
      .then((r) => r.json())
      .then((d) => { if (d.leaders?.length) setLeaders(d.leaders); })
      .catch(() => {});
  }, []);

  const visibleLeaders = leaders.filter((l) => !HIDDEN_LEADERS.includes(l.name.trim().toLowerCase()));

  return (
    <PageWrapper>
      <Navbar />

      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About World Passport"
        title="Helping Indian students reach the world's classrooms since 2015"
        lead="We started with one belief: no student should have to give up on an international degree because the process felt too confusing, too costly or too risky. More than 10,000 students later, that belief still guides everything we do."
        aside={
          <div className="grid grid-cols-2 gap-4">
            {milestones.map((m) => (
              <div key={m.label} className="card p-6 text-center">
                <p className="font-display text-3xl font-semibold text-navy">{m.val}</p>
                <p className="mt-1 text-xs text-ink-muted">{m.label}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* Mission */}
      <section className="section bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading align="left" eyebrow="Our mission" title="Why we exist" />
            <div className="mt-6 space-y-4 text-ink-muted leading-relaxed">
              <p>
                When we started, thousands of capable Indian students were giving up on studying abroad.
                Not because they weren&apos;t qualified, but because the process felt opaque, expensive
                and risky.
              </p>
              <p>
                World Passport was built to change that. By partnering directly with 20+ universities
                across 15+ countries, we removed the middlemen, eliminated hidden fees and created a
                transparent pathway that any family can trust.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Direct university partnerships',
                'Transparent fees from day one',
                'Counsellors who studied abroad',
                'Support from enquiry to graduation',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-ink">
                  <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-gold" /> {pt}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative rounded-3xl bg-navy p-10 text-white sm:p-12">
            <span aria-hidden="true" className="absolute -top-6 left-10 font-display text-[120px] leading-none text-gold">&ldquo;</span>
            <blockquote className="relative font-display text-2xl leading-snug sm:text-[1.7rem]">
              A good counsellor doesn&apos;t just get you an offer letter. They make sure it&apos;s the
              right university, at a cost your family can plan for, with a clear path after graduation.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6 text-sm text-white/70">
              <Award size={20} className="text-gold-light" />
              Recognised as India&apos;s Most Trusted Education Counselling Agency, 2023
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Global opportunities / value proposition */}
      <section className="section relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gold/10" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <SectionHeading align="left" light eyebrow="What we offer" title="Global Opportunities. Stronger Partnerships." />
            <p className="leading-relaxed text-white/75 lg:pb-1">
              At World Passport, we bridge the gap between global education opportunities and the people who aspire to access them.
              Our value lies in combining international university relationships, multi-destination expertise and a coordinated
              admission support system to make overseas education more accessible, efficient and rewarding.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {audiences.map((a) => {
              const Icon = a.icon;
              return (
                <article key={a.title} className="rounded-3xl bg-white p-8 text-ink shadow-lift sm:p-10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-dark">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{a.title}</h3>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">
                    {a.paras.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-white/15 bg-white/5 p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold text-white">
              <Target size={22} />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold">Our Commitment</h3>
              <p className="mt-2 leading-relaxed text-white/75">
                To create a connected global education ecosystem where students find the right opportunities, partners unlock new
                growth potential and universities connect with the right talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-dark">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Leadership" title="The people behind World Passport" />
          <div className={`mx-auto mt-14 grid gap-8 ${visibleLeaders.length === 1 ? 'max-w-md' : 'max-w-4xl sm:grid-cols-2'}`}>
            {visibleLeaders.map((l) => (
              <article key={l._id ?? l.name} className="card overflow-hidden">
                <div className="relative aspect-square bg-navy-50">
                  <LeaderPhoto src={l.image} name={l.name} />
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">{l.role}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-navy-900">{l.name}</h3>
                  {l.bio && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{l.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Recognition"
            title="Trusted by students and the industry"
            lead="Our work has been recognised by education bodies across India."
          />
          <ol className="relative space-y-4 border-l-2 border-gold/30 pl-8">
            {awards.map((a) => (
              <li key={a.title} className="card relative flex items-center justify-between gap-4 p-5">
                <span aria-hidden="true" className="absolute -left-[41px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-4 border-cream bg-gold" />
                <div>
                  <p className="font-semibold text-ink">{a.title}</p>
                  <p className="text-xs text-ink-muted">{a.body}</p>
                </div>
                <span className="font-display text-lg font-semibold text-navy">{a.year}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Offices */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Visit us" title="Our offices" lead="Meet a counsellor in person at any of our offices, or book an online session." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {offices.map((o) => (
              <div key={o.city} className="card p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                    <Building2 size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{o.city}</h3>
                    <p className="text-xs text-ink-muted">{o.country}</p>
                  </div>
                </div>
                <span className="chip mt-5 bg-gold-50 text-gold-dark">{o.type}</span>
                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0 text-ink-soft" /> {o.address}
                </p>
                {o.mapEmbed && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-cream-200">
                    <iframe title={`World Passport office location, ${o.city}`} src={o.mapEmbed}
                      className="block h-44 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                  </div>
                )}
                {o.mapUrl && (
                  <a href={o.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                    Get directions <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to begin your journey?" lead="Join 10,000+ students who trusted World Passport to guide them to the right university. Your first session is free." />
      <Footer />
    </PageWrapper>
  );
}
