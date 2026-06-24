'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/assets/hero/london-bigben.jpg',
  '/assets/hero/paris-eiffel.jpg',
  '/assets/hero/LONDRA.jpeg',
  '/assets/hero/rome-colosseum.jpg',
  '/assets/hero/dubai-skyline.jpg',
  '/assets/hero/sydney-opera.jpg',
  '/assets/hero/rainy-london.jpeg',
  '/assets/hero/one world tc tower.jpeg',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const q = query.trim();
    if (q) {
      router.push(`/overseas?search=${encodeURIComponent(q)}`);
    } else {
      router.push('/overseas');
    }
  };

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(index);
    setTimeout(() => setTransitioning(false), 700);
  }, [transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % images.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center">

          {images.map((img, i) => (
            <div
              key={img}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: i === current ? 1 : 0,
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 max-w-2xl">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                500+
              </span>
              <span className="text-white/90 text-sm font-medium">
                Partner Universities Worldwide.
              </span>
            </div>

            <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Find Your Perfect<br />University Abroad
            </h1>

            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-lg">
              Guided by your background, matched to your goals
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex items-center bg-white rounded-full overflow-hidden max-w-lg shadow-lg">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your desire subject..."
                className="flex-1 px-5 py-3.5 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
              <button type="submit" className="flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors flex-shrink-0 m-1 rounded-full">
                <Search size={16} />
                Search
              </button>
            </form>
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-6' : 'bg-white/40 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
