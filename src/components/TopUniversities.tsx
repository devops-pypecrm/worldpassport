'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, GraduationCap, ArrowRight, BadgeCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface UniversityEntry {
  _id: string;
  name: string;
  country: string;
  city?: string;
  website?: string;
  ranking?: string;
  image?: string;
  logo?: string;
  description?: string;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const fallbackUniversities: UniversityEntry[] = [
  {
    _id: '1',
    name: 'Canadian Institute of Technology',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Top Private',
    description: 'A recognized European higher education institution in one of Tirana\'s landmark towers, offering Bachelor and Master programs entirely in English.',
  },
  {
    _id: '2',
    name: 'Western Balkans University',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Accredited',
    description: 'Established through Cambridge Clinical Laboratories and American Hospital Group, offering Medicine, Dentistry, and Pharmacy programs in English.',
  },
  {
    _id: '3',
    name: 'Mediterranean University of Albania',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Accredited',
    description: 'A recognized European private institution in the heart of Tirana with a modern Faculty of Medical Sciences campus and state-of-the-art laboratories.',
  },
  {
    _id: '4',
    name: 'Epoka University',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Top Ranked',
    description: 'One of Albania\'s top-ranked universities with a green campus near Tirana International Airport, offering engineering, architecture, and economics programs.',
  },
  {
    _id: '5',
    name: 'ALAM',
    country: 'Malaysia',
    city: 'Melaka',
    ranking: 'Top Maritime',
    description: 'Malaysia\'s premier maritime academy on a 67-acre campus overlooking the Straits of Malacca, training marine engineers and nautical officers.',
  },
  {
    _id: '6',
    name: 'Geomatika University College',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    ranking: 'Accredited',
    description: 'A leading Malaysian institution specializing in geospatial technology, IT, and built environment programs with satellite campuses across the country.',
  },
  {
    _id: '7',
    name: 'VIT Mauritius',
    country: 'Mauritius',
    city: 'Pierrefonds',
    ranking: 'Top Branch',
    description: 'An international campus of India\'s prestigious VIT, situated in the Uniciti International Education Hub with modern facilities and labs.',
  },
  {
    _id: '8',
    name: 'Aura Institute of Business & Hospitality',
    country: 'Mauritius',
    city: 'Port Louis',
    ranking: 'Accredited',
    description: 'A specialized institute delivering premium hospitality, tourism, and business management education in the heart of the Indian Ocean.',
  },
  {
    _id: '9',
    name: 'Brighton International Business School',
    country: 'Mauritius',
    city: 'Quatre Bornes',
    ranking: 'Accredited',
    description: 'An international business school offering UK-aligned business, finance, and management programs with global career pathways.',
  },
  {
    _id: '10',
    name: 'Global College Malta',
    country: 'Malta',
    city: 'Smartcity',
    ranking: 'Accredited',
    description: 'An EU-based college in SmartCity Malta\'s modern business hub with panoramic Mediterranean views and Schengen area access.',
  },
  {
    _id: '11',
    name: 'MCAST',
    country: 'Malta',
    city: 'Paola',
    ranking: 'Top Public',
    description: 'Malta\'s leading public vocational college with a flagship Resource Centre, offering hands-on diploma and degree programs across seven institutes.',
  },
  {
    _id: '12',
    name: 'IDEA College',
    country: 'Malta',
    city: 'Valletta',
    ranking: 'Accredited',
    description: 'A creative and design-focused institution in Malta offering innovative programs in digital arts, media, and creative technologies.',
  },
  {
    _id: '13',
    name: 'ECI',
    country: 'Malta',
    city: 'St. Julian\'s',
    ranking: 'Accredited',
    description: 'A technology-focused institution in Malta providing accredited programs in IT, cybersecurity, and digital transformation.',
  },
  {
    _id: '14',
    name: 'University of Montenegro',
    country: 'Montenegro',
    city: 'Podgorica',
    ranking: 'National Top',
    description: 'Montenegro\'s premier national university with faculties across Podgorica, offering multi-disciplinary programs as an EU candidate country institution.',
  },
];

const PAGE = 8;

export default function TopUniversities() {
  const [universities, setUniversities] = useState<UniversityEntry[]>(fallbackUniversities);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then((r) => r.json())
      .then((data) => {
        const list: UniversityEntry[] = data.universities || [];
        if (list.length > 0) setUniversities(list);
      })
      .catch(() => {});
  }, []);

  const visible = showAll ? universities : universities.slice(0, PAGE);
  const countryCount = new Set(universities.map((u) => u.country)).size;

  return (
    <section id="universities" className="section bg-cream">
      <div className="container-x">
        <SectionHeading
          eyebrow="Partner universities"
          title="Accredited institutions we work with directly"
          lead={`${universities.length} partner universities across ${countryCount} countries, chosen for quality, affordability and international recognition.`}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((u) => (
            <article key={u._id} className="card card-hover flex flex-col p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-cream-200 bg-white p-2">
                  {u.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.logo}
                      alt={`${u.name} logo`}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <GraduationCap size={24} className={`text-navy ${u.logo ? 'hidden' : ''}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold leading-snug text-navy-900 line-clamp-2">{u.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
                    <MapPin size={12} /> {u.city ? `${u.city}, ${u.country}` : u.country}
                  </p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
                {u.description || 'Internationally recognised institution offering accredited degree programs.'}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {u.ranking && <span className="chip bg-gold-50 text-gold-dark">{u.ranking}</span>}
                <span className="chip bg-navy-50 text-navy"><BadgeCheck size={12} /> Accredited</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-cream-200 pt-4">
                <Link href={`/university/${slugify(u.name)}`} className="btn-outline !px-3 !py-2 text-xs">
                  View details
                </Link>
                <Link href="/contact" className="btn-primary !px-3 !py-2 text-xs">
                  Apply <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {universities.length > PAGE && (
            <button onClick={() => setShowAll(!showAll)} className="btn-outline">
              {showAll ? 'Show fewer' : `View all ${universities.length} universities`}
            </button>
          )}
          <Link href="/overseas" className="btn-primary">
            Explore destinations <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
