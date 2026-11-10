'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, GraduationCap, CalendarCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useDestinations } from '@/lib/useDestinations';
import { Program, PROGRAM_LEVELS, buildProgramsUrl, fetchPrograms, uniqueValues } from '@/lib/programs';
import SkylineArt from './SkylineArt';

export default function Hero() {
  const router = useRouter();
  const [country, setCountry] = useState('');
  const [level, setLevel] = useState('');
  const [program, setProgram] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const { destinations } = useDestinations();

  // Programs come from the admin panel (Courses collection)
  useEffect(() => {
    fetchPrograms()
      .then(setPrograms)
      .catch(() => setPrograms([]))
      .finally(() => setProgramsLoading(false));
  }, []);

  const programOptions = useMemo(() => uniqueValues(programs.map((p) => p.title)), [programs]);
  const countryOptions = useMemo(
    () => uniqueValues([...destinations.map((d) => d.name), ...programs.map((p) => p.country)]),
    [destinations, programs],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildProgramsUrl({ program, country, level }));
  };

  return (
    <section className="hero-blue">
      <SkylineArt className="absolute bottom-10 left-1/2 w-[1100px] max-w-none -translate-x-1/2 text-white/[0.13] lg:left-[62%]" />

      <div className="container-x relative grid items-center gap-12 pb-24 pt-10 sm:pb-28 lg:grid-cols-[1.15fr_1fr] lg:pb-32 lg:pt-14">
        {/* Copy + course finder */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-4 text-sm font-medium text-white">
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold">20+</span>
            Partner universities worldwide
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.3rem]">
            Your journey to a world-class degree starts here
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            We match your academic background and budget to accredited universities, then handle
            applications, scholarships, visas and arrival, so you can focus on your studies.
          </p>

          <form onSubmit={handleSearch} className="mt-8 grid gap-2.5 rounded-2xl bg-white p-2.5 shadow-lift sm:grid-cols-[1fr_1fr_auto]">
            <label className="sr-only" htmlFor="hero-program">Program</label>
            <select id="hero-program" value={program} onChange={(e) => setProgram(e.target.value)}
              disabled={programsLoading}
              className="field !border-transparent !bg-cream sm:col-span-3">
              <option value="">
                {programsLoading ? 'Loading programs…' : programOptions.length ? 'All programs' : 'All programs (none listed yet)'}
              </option>
              {programOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <label className="sr-only" htmlFor="hero-country">Destination</label>
            <select id="hero-country" value={country} onChange={(e) => setCountry(e.target.value)}
              className="field !border-transparent !bg-cream">
              <option value="">Any destination</option>
              {countryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="sr-only" htmlFor="hero-level">Study level</label>
            <select id="hero-level" value={level} onChange={(e) => setLevel(e.target.value)}
              className="field !border-transparent !bg-cream">
              <option value="">Any study level</option>
              {PROGRAM_LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <button type="submit" className="btn-accent">
              <Search size={16} /> Start Your Journey
            </button>
          </form>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            {['Free first consultation', 'Accredited universities only', 'No hidden fees'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gold-light" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Student portrait in a circle with an orange accent */}
        <div className="relative mx-auto w-full max-w-[460px]">
          <div aria-hidden="true" className="absolute -right-4 top-6 aspect-square w-[88%] rounded-full bg-brand" />
          <div aria-hidden="true" className="absolute -left-6 bottom-10 h-24 w-24 rounded-full border-[10px] border-white/20" />
          <div className="relative aspect-square w-[92%] overflow-hidden rounded-full border-[8px] border-white bg-white shadow-lift">
            <Image
              src="/assets/hero-students.png"
              alt="Graduate holding her degree"
              fill
              priority
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover object-[88%_35%] scale-[1.2] origin-[80%_40%]"
            />
          </div>

          <div className="absolute -left-3 top-10 hidden sm:flex animate-floaty items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-lift">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy"><GraduationCap size={20} /></span>
            <div>
              <p className="text-lg font-bold leading-none text-navy-900">20+</p>
              <p className="text-xs text-ink-muted">Partner universities</p>
            </div>
          </div>
          <div className="absolute -right-2 bottom-6 hidden sm:flex animate-floaty items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-lift [animation-delay:1.5s]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-dark"><CalendarCheck size={20} /></span>
            <div>
              <p className="text-sm font-semibold text-navy-900">Free 1:1 counselling</p>
              <p className="text-xs text-ink-muted">Mon–Sat, 9am–7pm IST</p>
            </div>
          </div>
          <span className="absolute right-6 top-0 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white text-gold shadow-lift">
            <Sparkles size={18} />
          </span>
        </div>
      </div>
    </section>
  );
}
