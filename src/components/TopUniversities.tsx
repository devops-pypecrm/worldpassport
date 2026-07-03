'use client';
import { useEffect, useState } from 'react';
import { MapPin, ExternalLink, Trophy, GraduationCap, Globe, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface UniversityEntry {
  _id: string;
  name: string;
  country: string;
  city?: string;
  website?: string;
  ranking?: string;
  image?: string;
  description?: string;
}

const flagMap: Record<string, string> = {
  albania: '🇦🇱', malaysia: '🇲🇾', mauritius: '🇲🇺', malta: '🇲🇹', montenegro: '🇲🇪',
  germany: '🇩🇪', france: '🇫🇷', 'united kingdom': '🇬🇧', usa: '🇺🇸', italy: '🇮🇹',
};
function getFlag(country: string) { return flagMap[country.toLowerCase()] ?? '🏫'; }
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
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80&auto=format&fit=crop',
    description: 'A recognized European higher education institution in one of Tirana\'s landmark towers, offering Bachelor and Master programs entirely in English.',
  },
  {
    _id: '2',
    name: 'Western Balkans University',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf18c8db0e?w=600&q=80&auto=format&fit=crop',
    description: 'Established through Cambridge Clinical Laboratories and American Hospital Group, offering Medicine, Dentistry, and Pharmacy programs in English.',
  },
  {
    _id: '3',
    name: 'Mediterranean University of Albania',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop',
    description: 'A recognized European private institution in the heart of Tirana with a modern Faculty of Medical Sciences campus and state-of-the-art laboratories.',
  },
  {
    _id: '4',
    name: 'Epoka University',
    country: 'Albania',
    city: 'Tirana',
    ranking: 'Top Ranked',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&q=80&auto=format&fit=crop',
    description: 'One of Albania\'s top-ranked universities with a green campus near Tirana International Airport, offering engineering, architecture, and economics programs.',
  },
  {
    _id: '5',
    name: 'ALAM',
    country: 'Malaysia',
    city: 'Melaka',
    ranking: 'Top Maritime',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1f?w=600&q=80&auto=format&fit=crop',
    description: 'Malaysia\'s premier maritime academy on a 67-acre campus overlooking the Straits of Malacca, training marine engineers and nautical officers.',
  },
  {
    _id: '6',
    name: 'Geomatika University College',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80&auto=format&fit=crop',
    description: 'A leading Malaysian institution specializing in geospatial technology, IT, and built environment programs with satellite campuses across the country.',
  },
  {
    _id: '7',
    name: 'VIT Mauritius',
    country: 'Mauritius',
    city: 'Pierrefonds',
    ranking: 'Top Branch',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80&auto=format&fit=crop',
    description: 'An international campus of India\'s prestigious VIT, situated in the Uniciti International Education Hub with modern facilities and labs.',
  },
  {
    _id: '8',
    name: 'Aura Institute of Business & Hospitality',
    country: 'Mauritius',
    city: 'Port Louis',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&auto=format&fit=crop',
    description: 'A specialized institute delivering premium hospitality, tourism, and business management education in the heart of the Indian Ocean.',
  },
  {
    _id: '9',
    name: 'Brighton International Business School',
    country: 'Mauritius',
    city: 'Quatre Bornes',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop',
    description: 'An international business school offering UK-aligned business, finance, and management programs with global career pathways.',
  },
  {
    _id: '10',
    name: 'Global College Malta',
    country: 'Malta',
    city: 'Smartcity',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1614094082869-cd4e6b420843?w=600&q=80&auto=format&fit=crop',
    description: 'An EU-based college in SmartCity Malta\'s modern business hub with panoramic Mediterranean views and Schengen area access.',
  },
  {
    _id: '11',
    name: 'MCAST',
    country: 'Malta',
    city: 'Paola',
    ranking: 'Top Public',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2022_-_MCAST_Square.jpg/800px-2022_-_MCAST_Square.jpg',
    description: 'Malta\'s leading public vocational college with a flagship Resource Centre, offering hands-on diploma and degree programs across seven institutes.',
  },
  {
    _id: '12',
    name: 'IDEA College',
    country: 'Malta',
    city: 'Valletta',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80&auto=format&fit=crop',
    description: 'A creative and design-focused institution in Malta offering innovative programs in digital arts, media, and creative technologies.',
  },
  {
    _id: '13',
    name: 'ECI',
    country: 'Malta',
    city: 'St. Julian\'s',
    ranking: 'Accredited',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&auto=format&fit=crop',
    description: 'A technology-focused institution in Malta providing accredited programs in IT, cybersecurity, and digital transformation.',
  },
  {
    _id: '14',
    name: 'University of Montenegro',
    country: 'Montenegro',
    city: 'Podgorica',
    ranking: 'National Top',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Podgorica_Law_School%281%29.jpg/800px-Podgorica_Law_School%281%29.jpg',
    description: 'Montenegro\'s premier national university with faculties across Podgorica, offering multi-disciplinary programs as an EU candidate country institution.',
  },
];

export default function TopUniversities() {
  const [universities, setUniversities] = useState<UniversityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then((r) => r.json())
      .then((data) => {
        const list = data.universities || [];
        setUniversities(list.length > 0 ? list : fallbackUniversities);
      })
      .catch(() => setUniversities(fallbackUniversities))
      .finally(() => setLoading(false));
  }, []);

  const displayList = loading ? fallbackUniversities.slice(0, 8) : universities;
  const [showAll, setShowAll] = useState(false);
  const visibleList = showAll ? displayList : displayList.slice(0, 8);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-blue-100/40 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-blue-100/50 shadow-lg relative z-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-600 shadow-sm mb-4">
            <Trophy size={14} /> Our Partner Network
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-2">
            Our Partner Universities
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">{displayList.length} partner universities across 5 countries — curated for quality, affordability, and global recognition</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {visibleList.map((u) => (
            <div
              key={u._id}
              className="rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="relative h-44 overflow-hidden">
                {u.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={u.image}
                    alt={u.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                    <GraduationCap size={40} className="text-white/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {u.ranking && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-orange-600">
                    <Trophy size={11} />
                    {u.ranking}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="text-sm">{getFlag(u.country)}</span>
                  <span className="text-white text-xs font-medium drop-shadow">
                    {u.city ? `${u.city}, ${u.country}` : u.country}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {u.name}
                </h3>
                {u.description ? (
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{u.description}</p>
                ) : (
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">Internationally recognized institution offering world-class education programs.</p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
                    <GraduationCap size={8} /> Accredited
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                    <Globe size={8} /> International
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/university/${slugify(u.name)}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Apply Now <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {displayList.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {showAll ? 'Show Less' : `View All ${displayList.length} Universities`}
            </button>
          )}
          <Link
            href="/overseas"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-md shadow-orange-200"
          >
            <Globe size={16} />
            Explore All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
