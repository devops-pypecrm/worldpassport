'use client';
import { useEffect, useState } from 'react';
import { GraduationCap, MapPin, ExternalLink, Award } from 'lucide-react';

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

/* Fallback static names for the marquee scroll */
const fallbackMarquee = [
  'University of Oxford', 'University of Cambridge', 'Sorbonne University', 'TU Munich',
  'University of Amsterdam', 'ETH Zurich', 'KU Leuven', 'University of Edinburgh',
  'Bocconi University', 'IE Business School', 'Leiden University', 'Uppsala University',
];

/* Country flag emoji lookup */
const flagMap: Record<string, string> = {
  germany: '🇩🇪', netherlands: '🇳🇱', france: '🇫🇷', sweden: '🇸🇪', spain: '🇪🇸',
  poland: '🇵🇱', italy: '🇮🇹', 'united kingdom': '🇬🇧', uk: '🇬🇧', switzerland: '🇨🇭',
  austria: '🇦🇹', belgium: '🇧🇪', ireland: '🇮🇪', portugal: '🇵🇹', denmark: '🇩🇰',
  norway: '🇳🇴', finland: '🇫🇮', czech: '🇨🇿', hungary: '🇭🇺', usa: '🇺🇸', canada: '🇨🇦',
  australia: '🇦🇺', india: '🇮🇳', japan: '🇯🇵', china: '🇨🇳',
};

function getFlag(country: string) {
  return flagMap[country.toLowerCase()] ?? '🏫';
}

/* Gradient palette for cards without images */
const gradients = [
  'from-violet-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
];

export default function Universities() {
  const [universities, setUniversities] = useState<UniversityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then(r => r.json())
      .then(data => setUniversities(data.universities || []))
      .catch(() => setUniversities([]))
      .finally(() => setLoading(false));
  }, []);

  /* Decide marquee names: prefer live DB names, fallback to static */
  const marqueeNames = universities.length > 0 ? universities.map(u => u.name) : fallbackMarquee;

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="universities">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="badge badge-red mb-4">Our Network</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Partner <span className="text-gradient">Universities</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {universities.length > 0
              ? `${universities.length} universities across multiple countries — curated by our advisors`
              : 'Across 15+ countries — no gatekeeping, no hidden fees'}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-300" />
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-300" />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* University Cards Grid */}
        {!loading && universities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
            {universities.map((u, i) => (
              <div key={u._id}
                data-aos="zoom-in"
                data-aos-delay={i * 50}
                className="group rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white cursor-default"
              >
                {/* Image / Gradient header */}
                <div className="relative h-44 overflow-hidden">
                  {u.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.image}
                      alt={u.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                      <GraduationCap size={44} className="text-white/50" />
                    </div>
                  )}
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Flag + country */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <span className="text-lg">{getFlag(u.country)}</span>
                    <span className="text-white text-xs font-semibold drop-shadow">
                      {u.country}{u.city ? `, ${u.city}` : ''}
                    </span>
                  </div>

                  {/* Ranking badge */}
                  {u.ranking && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/50 border border-white/30 backdrop-blur-sm">
                      <Award size={9} className="text-yellow-300" />
                      {u.ranking}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5 line-clamp-2 leading-snug group-hover:text-violet-700 transition-colors">
                    {u.name}
                  </h3>

                  {u.description && (
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">{u.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <MapPin size={10} />
                      <span>{u.country}</span>
                    </div>
                    {u.website && (
                      <a href={u.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-violet-500 hover:text-violet-700 font-medium transition-colors">
                        Visit <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state (no DB universities) */}
        {!loading && universities.length === 0 && (
          <div className="text-center py-12 mb-14 text-gray-400">
            <GraduationCap size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Universities will appear here once added by the admin.</p>
          </div>
        )}

        {/* Marquee strip */}
        <div data-aos="fade-up" className="relative overflow-hidden py-3">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...marqueeNames, ...marqueeNames].map((name, i) => (
              <div key={i}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium flex-shrink-0 hover:border-violet-300 hover:text-violet-600 transition-all cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
