'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Building2, Wallet, Landmark, MapPin, GraduationCap } from 'lucide-react';
import { useDestinations, countWord, universityLabel } from '@/lib/useDestinations';

const collage = [
  { src: '/assets/page-bg-uni.jpg', alt: 'University campus building', icon: Landmark, cls: 'left-[34%] top-0 w-[46%] h-[46%]', badge: '-right-3 -top-3' },
  { src: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=600&q=80&auto=format&fit=crop', alt: 'City in Albania', icon: MapPin, cls: 'left-0 top-[22%] w-[42%] h-[52%]', badge: '-left-3 top-6' },
  { src: '/assets/page-bg-skill.jpg', alt: 'Graduates throwing their caps', icon: GraduationCap, cls: 'left-[46%] top-[52%] w-[44%] h-[46%]', badge: '-left-3 top-4' },
];

// Cards shown before "Show more"
const INITIAL_COUNT = 8;

const tones = ['bg-pastel-pink', 'bg-pastel-peach', 'bg-pastel-sky', 'bg-pastel-lavender', 'bg-pastel-mint'];

export default function Destinations() {
  const { destinations, loading } = useDestinations();
  const count = countWord(destinations.length);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? destinations : destinations.slice(0, INITIAL_COUNT);
  const hiddenCount = destinations.length - INITIAL_COUNT;
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo collage */}
          <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[480px]">
            <div aria-hidden="true" className="absolute left-[8%] top-[10%] h-[70%] w-[70%] rounded-full bg-gold-50" />
            {collage.map((c) => (
              <div key={c.alt} className={`absolute ${c.cls}`}>
                <div className="h-full w-full overflow-hidden rounded-lg shadow-lift">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <span className={`absolute ${c.badge} flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-brand text-white shadow-card`}>
                  <c.icon size={16} />
                </span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-[2.4rem]">
              {loading ? 'Study Destinations' : `${count} ${destinations.length === 1 ? 'Country' : 'Countries'}`}, Endless Possibilities
            </h2>
            <p className="mt-4 text-lg font-medium text-ink">Your campus could be anywhere.</p>
            <p className="mt-3 max-w-lg text-ink-muted">
              Choose from accredited universities in {loading ? 'our partner' : count.toLowerCase()} {destinations.length === 1 ? 'country' : 'countries'} picked for recognised degrees,
              English-taught programs and tuition that families can plan for.
            </p>
            <Link href="/overseas" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-all hover:gap-2">
              Explore Countries <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading && [0, 1, 2, 3].map((i) => <div key={i} aria-hidden="true" className="h-60 animate-pulse rounded-2xl bg-cream" />)}
          {visible.map((d, i) => (
            <Link key={d.id} href={`/overseas?search=${encodeURIComponent(d.name)}`}
              className={`group rounded-2xl ${tones[i % tones.length]} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift`}>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xs font-bold text-navy shadow-card">{d.code}</span>
                {d.tag && <span className="chip bg-white/70 text-ink">{d.tag}</span>}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-navy-900">{d.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{d.tagline}</p>
              <div className="mt-4 space-y-1.5 text-sm text-ink">
                {d.stats.unis && <p className="flex items-center gap-2"><Building2 size={14} className="text-navy" /> {universityLabel(d.stats.unis)}</p>}
                {d.stats.avgCost && <p className="flex items-center gap-2"><Wallet size={14} className="text-navy" /> {d.stats.avgCost}</p>}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Explore <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* Show more / less when there are more than 8 destinations */}
        {!loading && hiddenCount > 0 && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} className="btn-outline">
              {showAll ? 'Show less' : `Show more (${hiddenCount})`}
              <ChevronDown size={16} className={`transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
